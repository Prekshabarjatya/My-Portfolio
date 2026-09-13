"""LangGraph state machine for the Live Interactive Website Tour Guide.

route_recruiter -> (scroll_projects | highlight_stack) -> evaluate_pitch
  -> (terminal_output | back to route_recruiter)  -> END

Each node updates `active_node` / `ui_action` / `ui_target_element` so the
FastAPI WebSocket layer (main.py) can forward a UI instruction to the
Next.js frontend after every node finishes.
"""

import os
from typing import Literal, TypedDict

from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, START, END

from portfolio_data import (
    CANDIDATE_SUMMARY,
    find_best_project,
    find_best_skill_category,
)

GROQ_MODEL = os.environ.get("GROQ_MODEL", "openai/gpt-oss-120b")
MAX_LOOPS = 2


class AgentState(TypedDict, total=False):
    recruiter_query: str
    active_node: str
    ui_action: str
    ui_target_element: str
    pitch_context: list
    route_decision: str
    loop_count: int
    final_pitch: str


def _llm():
    return ChatGroq(model=GROQ_MODEL, temperature=0.2)


def route_recruiter(state: AgentState) -> AgentState:
    query = state["recruiter_query"]
    loop_count = state.get("loop_count", 0)

    prompt = (
        "You are the router for a recruiter visiting an AI engineer's portfolio. "
        "Classify the recruiter's request into exactly one label:\n"
        "- PROJECTS: they want to see real-world applications, production impact, "
        "system/agent architecture, or a specific built project.\n"
        "- STACK: they want to see the engineering toolset / infrastructure / "
        "technologies used (backend, cloud, AI/ML libraries, data tools).\n"
        "- UNCLEAR: the request is too vague to classify confidently.\n\n"
        f'Recruiter request: "{query}"\n\n'
        "Reply with exactly one word: PROJECTS, STACK, or UNCLEAR."
    )

    try:
        result = _llm().invoke(prompt).content.strip().upper()
    except Exception:
        result = "PROJECTS"

    if "STACK" in result:
        decision = "stack"
    elif "UNCLEAR" in result and loop_count < MAX_LOOPS:
        decision = "unclear"
    else:
        decision = "projects"

    return {
        "active_node": "route_recruiter",
        "ui_action": "idle",
        "ui_target_element": "",
        "route_decision": decision,
        "loop_count": loop_count + (1 if decision == "unclear" else 0),
    }


def route_after_router(state: AgentState) -> Literal["scroll_projects", "highlight_stack", "route_recruiter"]:
    decision = state.get("route_decision", "projects")
    if decision == "stack":
        return "highlight_stack"
    if decision == "unclear":
        return "route_recruiter"
    return "scroll_projects"


def scroll_projects(state: AgentState) -> AgentState:
    project = find_best_project(state["recruiter_query"])
    context = list(state.get("pitch_context", []))
    context.append(
        f"PROJECT — {project['title']}: {project['summary']} "
        f"Architecture: {project['architecture_notes']} "
        f"Stack: {', '.join(project['tags'])}."
    )
    return {
        "active_node": "scroll_projects",
        "ui_action": "scroll_to",
        "ui_target_element": project["target_element"],
        "pitch_context": context,
    }


def highlight_stack(state: AgentState) -> AgentState:
    category = find_best_skill_category(state["recruiter_query"])
    context = list(state.get("pitch_context", []))
    context.append(
        f"STACK — {category['title']}: {', '.join(category['items'])}."
    )
    return {
        "active_node": "highlight_stack",
        "ui_action": "open_modal",
        "ui_target_element": category["target_element"],
        "pitch_context": context,
    }


def evaluate_pitch(state: AgentState) -> AgentState:
    return {"active_node": "evaluate_pitch", "ui_action": "idle", "ui_target_element": ""}


def route_after_evaluate(state: AgentState) -> Literal["terminal_output", "route_recruiter"]:
    context = state.get("pitch_context", [])
    loop_count = state.get("loop_count", 0)
    if len(context) >= 2 or loop_count >= MAX_LOOPS:
        return "terminal_output"
    return "route_recruiter"


def build_pitch_prompt(state: AgentState) -> str:
    context = "\n".join(state.get("pitch_context", []))
    return (
        "You are pitching an AI engineer, Preksha Barjatya, to a recruiter based on "
        "what they just explored on her portfolio. Write a tight, confident 3-4 "
        "sentence pitch in second person to the recruiter, grounded ONLY in the facts "
        "below. No fluff, no generic buzzwords, be specific about the architecture.\n\n"
        f"Candidate summary: {CANDIDATE_SUMMARY}\n\n"
        f"What the recruiter just explored:\n{context}\n\n"
        f'Original recruiter request: "{state["recruiter_query"]}"'
    )


def terminal_output(state: AgentState) -> AgentState:
    # The actual LLM call is streamed token-by-token directly over the
    # WebSocket in main.py (using build_pitch_prompt), so this node only
    # marks the state transition for the React Flow visualizer.
    return {
        "active_node": "terminal_output",
        "ui_action": "stream_pitch",
        "ui_target_element": "",
    }


def build_graph():
    workflow = StateGraph(AgentState)

    workflow.add_node("route_recruiter", route_recruiter)
    workflow.add_node("scroll_projects", scroll_projects)
    workflow.add_node("highlight_stack", highlight_stack)
    workflow.add_node("evaluate_pitch", evaluate_pitch)
    workflow.add_node("terminal_output", terminal_output)

    workflow.add_edge(START, "route_recruiter")
    workflow.add_conditional_edges(
        "route_recruiter",
        route_after_router,
        {
            "scroll_projects": "scroll_projects",
            "highlight_stack": "highlight_stack",
            "route_recruiter": "route_recruiter",
        },
    )
    workflow.add_edge("scroll_projects", "evaluate_pitch")
    workflow.add_edge("highlight_stack", "evaluate_pitch")
    workflow.add_conditional_edges(
        "evaluate_pitch",
        route_after_evaluate,
        {
            "terminal_output": "terminal_output",
            "route_recruiter": "route_recruiter",
        },
    )
    workflow.add_edge("terminal_output", END)

    return workflow.compile()
