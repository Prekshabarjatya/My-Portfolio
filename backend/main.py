import asyncio
import os
import re

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq

from graph import build_graph, build_pitch_prompt

_TRAILING = re.compile(r"[\s—–]*$")
_DASH = re.compile(r"\s*[—–]\s*")
_QUOTES = str.maketrans(
    {
        "‘": "'", "’": "'", "“": '"', "”": '"', "…": "...",
        "‐": "-", "‑": "-", " ": " ", " ": " ",
    }
)


def _plain(text: str) -> str:
    """Replace em/en dashes with commas and curly punctuation with plain ASCII."""
    return _DASH.sub(", ", text).translate(_QUOTES)


app = FastAPI(title="Preksha Barjatya, Portfolio Tour Guide Agent")

ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "ALLOWED_ORIGINS", "http://localhost:3000"
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_MODEL = os.environ.get("GROQ_MODEL", "openai/gpt-oss-120b")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
graph = build_graph()


@app.get("/health")
async def health():
    return {"status": "ok", "model": GROQ_MODEL}


@app.websocket("/agent-tour")
async def run_agent_tour(websocket: WebSocket):
    await websocket.accept()
    groq_client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

    try:
        while True:
            payload = await websocket.receive_json()
            query = (payload.get("query") or "").strip()
            if not query:
                await websocket.send_json({"type": "error", "message": "Empty query."})
                continue

            state = {
                "recruiter_query": query,
                "pitch_context": [],
                "loop_count": 0,
            }

            final_state = state
            async for event in graph.astream(state, {"recursion_limit": 25}):
                for node_name, node_output in event.items():
                    final_state = {**final_state, **node_output}
                    await websocket.send_json(
                        {
                            "type": "node_update",
                            "node": node_name,
                            "action": node_output.get("ui_action", "idle"),
                            "target": node_output.get("ui_target_element", ""),
                            "context": node_output.get("pitch_context"),
                            "thought": node_output.get("thought", ""),
                        }
                    )
                    # Small pacing delay so each reasoning step is actually
                    # perceptible on screen instead of flashing by instantly.
                    await asyncio.sleep(0.55)

            # Stream the final pitch token-by-token straight from Groq so the
            # frontend terminal panel can show a live "typing" effect.
            await websocket.send_json({"type": "pitch_start"})

            if groq_client is None:
                await websocket.send_json(
                    {
                        "type": "pitch_chunk",
                        "chunk": (
                            "[No GROQ_API_KEY configured on the backend, set one in "
                            "backend/.env to hear the agent's real pitch. The graph "
                            "routing above is live and unaffected.]"
                        ),
                    }
                )
            else:
                prompt = build_pitch_prompt(final_state)
                try:
                    stream = groq_client.chat.completions.create(
                        model=GROQ_MODEL,
                        messages=[{"role": "user", "content": prompt}],
                        temperature=0.2,
                        stream=True,
                    )
                    # Backstop for the prompt rules: never let em/en dashes or
                    # curly punctuation reach the visitor. Trailing spaces and
                    # dashes are held back so a dash split across chunks is
                    # still caught.
                    pending = ""
                    for chunk in stream:
                        delta = chunk.choices[0].delta.content
                        if not delta:
                            continue
                        pending += delta
                        hold = _TRAILING.search(pending).start()
                        safe, pending = pending[:hold], pending[hold:]
                        if safe:
                            await websocket.send_json(
                                {"type": "pitch_chunk", "chunk": _plain(safe)}
                            )
                    if pending:
                        await websocket.send_json(
                            {"type": "pitch_chunk", "chunk": _plain(pending)}
                        )
                except Exception as exc:
                    await websocket.send_json(
                        {"type": "pitch_chunk", "chunk": f"[Groq API error: {exc}]"}
                    )

            await websocket.send_json({"type": "pitch_end"})

    except WebSocketDisconnect:
        pass
