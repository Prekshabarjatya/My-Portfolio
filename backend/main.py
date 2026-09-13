import os

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq

from graph import build_graph, build_pitch_prompt

app = FastAPI(title="Preksha Barjatya — Portfolio Tour Guide Agent")

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
                        }
                    )

            # Stream the final pitch token-by-token straight from Groq so the
            # frontend terminal panel can show a live "typing" effect.
            await websocket.send_json({"type": "pitch_start"})

            if groq_client is None:
                await websocket.send_json(
                    {
                        "type": "pitch_chunk",
                        "chunk": (
                            "[No GROQ_API_KEY configured on the backend — set one in "
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
                    for chunk in stream:
                        delta = chunk.choices[0].delta.content
                        if delta:
                            await websocket.send_json({"type": "pitch_chunk", "chunk": delta})
                except Exception as exc:
                    await websocket.send_json(
                        {"type": "pitch_chunk", "chunk": f"[Groq API error: {exc}]"}
                    )

            await websocket.send_json({"type": "pitch_end"})

    except WebSocketDisconnect:
        pass
