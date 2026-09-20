"""LangGraph state machine for the Live Interactive Website Tour Guide.

route_recruiter -> (scroll_projects | highlight_stack | answer_personal)
  -> evaluate_pitch -> (terminal_output | back to route_recruiter)  -> END

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
    find_best_personal_topics,
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
    thought: str


def _llm():
    return ChatGroq(model=GROQ_MODEL, temperature=0.2)


def route_recruiter(state: AgentState) -> AgentState:
    query = state["recruiter_query"]
    loop_count = state.get("loop_count", 0)

    prompt = (
        "You are the router for a recruiter (or anyone) visiting an AI engineer's "
        "portfolio. Classify the visitor's request into exactly one label:\n"
        "- PROJECTS: they want to see real-world applications, production impact, "
        "system/agent architecture, or a specific built project.\n"
        "- STACK: they want to see the engineering toolset / infrastructure / "
        "technologies used (backend, cloud, AI/ML libraries, data tools).\n"
        "- PERSONAL: they're asking about her as a person, hobbies, interests, "
        "strongest skills/qualities, short-term or long-term goals, why AI, values, "
        "personality, or general \"tell me about her\" questions.\n"
        "- UNCLEAR: the request is too vague to classify confidently.\n\n"
        f'Visitor request: "{query}"\n\n'
        "Reply with exactly one word: PROJECTS, STACK, PERSONAL, or UNCLEAR."
    )

    try:
        result = _llm().invoke(prompt).content.strip().upper()
    except Exception:
        result = "PROJECTS"

    if "PERSONAL" in result:
        decision = "personal"
        thought = f'Read "{query}", this is a personal question about her as a person, not the tech. Routing to answer_personal.'
    elif "STACK" in result:
        decision = "stack"
        thought = f'Read "{query}", this is asking about the engineering stack, not a specific project. Routing to highlight_stack.'
    elif "UNCLEAR" in result and loop_count < MAX_LOOPS:
        decision = "unclear"
        thought = f'Read "{query}", intent isn\'t clear enough to route confidently yet. Looping back to re-evaluate.'
    else:
        decision = "projects"
        thought = f'Read "{query}", this is asking about real work / architecture. Routing to scroll_projects.'

    return {
        "active_node": "route_recruiter",
        "ui_action": "idle",
        "ui_target_element": "",
        "route_decision": decision,
        "loop_count": loop_count + (1 if decision == "unclear" else 0),
        "thought": thought,
    }


def route_after_router(
    state: AgentState,
) -> Literal["scroll_projects", "highlight_stack", "answer_personal", "route_recruiter"]:
    decision = state.get("route_decision", "projects")
    if decision == "stack":
        return "highlight_stack"
    if decision == "personal":
        return "answer_personal"
    if decision == "unclear":
        return "route_recruiter"
    return "scroll_projects"


def scroll_projects(state: AgentState) -> AgentState:
    project = find_best_project(state["recruiter_query"])
    context = list(state.get("pitch_context", []))
    context.append(
        f"PROJECT: {project['title']}: {project['summary']} "
        f"Architecture: {project['architecture_notes']} "
        f"Stack: {', '.join(project['tags'])}."
    )
    return {
        "active_node": "scroll_projects",
        "ui_action": "scroll_to",
        "ui_target_element": project["target_element"],
        "pitch_context": context,
        "thought": f"Best match: \"{project['title']}\" ({', '.join(project['tags'])}). Scrolling the page there now.",
    }


def highlight_stack(state: AgentState) -> AgentState:
    category = find_best_skill_category(state["recruiter_query"])
    context = list(state.get("pitch_context", []))
    context.append(
        f"STACK: {category['title']}: {', '.join(category['items'])}."
    )
    return {
        "active_node": "highlight_stack",
        "ui_action": "open_modal",
        "ui_target_element": category["target_element"],
        "pitch_context": context,
        "thought": f"Best match: \"{category['title']}\", {', '.join(category['items'])}. Opening that on screen now.",
    }


def answer_personal(state: AgentState) -> AgentState:
    topics = find_best_personal_topics(state["recruiter_query"])
    context = list(state.get("pitch_context", []))
    for topic in topics:
        context.append(f"PERSONAL: {topic['title']}: {topic['content']}")
    titles = ", ".join(f'"{t["title"]}"' for t in topics)
    return {
        "active_node": "answer_personal",
        "ui_action": "idle",
        "ui_target_element": "",
        "pitch_context": context,
        "thought": f"Found the relevant knowledge-base topic(s): {titles}.",
    }


def evaluate_pitch(state: AgentState) -> AgentState:
    context = state.get("pitch_context", [])
    loop_count = state.get("loop_count", 0)
    enough = len(context) >= 2 or loop_count >= MAX_LOOPS
    if enough:
        thought = f"Gathered {len(context)} grounded data point(s), that's enough to write a confident pitch."
    else:
        thought = f"Only {len(context)} data point so far, going back to gather more before writing the pitch."
    return {
        "active_node": "evaluate_pitch",
        "ui_action": "idle",
        "ui_target_element": "",
        "thought": thought,
    }


def route_after_evaluate(state: AgentState) -> Literal["terminal_output", "route_recruiter"]:
    context = state.get("pitch_context", [])
    loop_count = state.get("loop_count", 0)
    if len(context) >= 2 or loop_count >= MAX_LOOPS:
        return "terminal_output"
    return "route_recruiter"


def build_pitch_prompt(state: AgentState) -> str:
    context = "\n".join(state.get("pitch_context", []))
    return (
        "You are answering a visitor's question about Preksha Barjatya on her "
        "portfolio. Write the way a sensible person would reply in a chat: plain, "
        "direct and specific. Always use THIRD PERSON: refer to her as \"she\", "
        "\"her\" or \"Preksha\", never \"I\", \"me\", \"my\", \"you\" or \"your\". "
        "Use ONLY the facts below and do not invent anything.\n\n"
        "Style rules:\n"
        "- 2 to 4 short sentences of plain prose. No lists, headings, bold, "
        "emojis or quotation marks around phrases.\n"
        "- Never use em dashes or en dashes. Use commas or full stops instead. "
        "Avoid semicolons and colons.\n"
        "- Do not open by repeating the question or with praise. Do not end by "
        "offering more help or summing up.\n"
        "- Avoid these words and patterns: passionate, leverage, cutting-edge, "
        "robust, seamless, delve, testament, showcase, dynamic, innovative, "
        "\"not just X but Y\", \"whether it's X or Y\".\n"
        "- Prefer concrete details (project names, tools, numbers) over "
        "adjectives. If the facts are personal, sound relaxed, not like a pitch.\n\n"
        f"Candidate summary: {CANDIDATE_SUMMARY}\n\n"
        f"What was just found for this question:\n{context}\n\n"
        f'Original visitor request: "{state["recruiter_query"]}"'
    )


def terminal_output(state: AgentState) -> AgentState:
    # The actual LLM call is streamed token-by-token directly over the
    # WebSocket in main.py (using build_pitch_prompt), so this node only
    # marks the state transition for the React Flow visualizer.
    return {
        "active_node": "terminal_output",
        "ui_action": "stream_pitch",
        "ui_target_element": "",
        "thought": "Writing a pitch grounded only in what was just found, streaming it now.",
    }


def build_graph():
    workflow = StateGraph(AgentState)

    workflow.add_node("route_recruiter", route_recruiter)
    workflow.add_node("scroll_projects", scroll_projects)
    workflow.add_node("highlight_stack", highlight_stack)
    workflow.add_node("answer_personal", answer_personal)
    workflow.add_node("evaluate_pitch", evaluate_pitch)
    workflow.add_node("terminal_output", terminal_output)

    workflow.add_edge(START, "route_recruiter")
    workflow.add_conditional_edges(
        "route_recruiter",
        route_after_router,
        {
            "scroll_projects": "scroll_projects",
            "highlight_stack": "highlight_stack",
            "answer_personal": "answer_personal",
            "route_recruiter": "route_recruiter",
        },
    )
    workflow.add_edge("scroll_projects", "evaluate_pitch")
    workflow.add_edge("highlight_stack", "evaluate_pitch")
    workflow.add_edge("answer_personal", "evaluate_pitch")
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
