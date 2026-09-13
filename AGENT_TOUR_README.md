# Live Interactive Website Tour Guide

A LangGraph agent (served over FastAPI + WebSockets, powered by Groq) that reads a
recruiter's intent and drives this portfolio's UI in real time — scrolling to the
right project, popping open the right skill stack, and streaming a live custom
pitch, while a React Flow panel shows the agent's reasoning path light up node by
node.

```
backend/   FastAPI + LangGraph + Groq — the agent itself
web/       Next.js + React Flow — the portfolio site + tour-guide UI
```

The state machine (`backend/graph.py`) matches the architecture exactly:

```
route_recruiter -> (scroll_projects | highlight_stack) -> evaluate_pitch
  -> (terminal_output | back to route_recruiter, if context is too thin)
```

All project/skill data is real (from Preksha's resume) — see `backend/portfolio_data.py`
and `web/src/data/portfolio.ts`. Both files must stay in sync: the ids in
`portfolio_data.py`'s `target_element` fields must exist as DOM ids in the Next.js
components for the scroll/highlight bridge to work.

## 1. Get a free Groq API key

Sign up at https://console.groq.com/keys (free) and copy a key. **Do not paste it
into chat with an AI assistant** — put it directly in the file below.

```bash
cd backend
cp .env.example .env
# edit .env and paste your key into GROQ_API_KEY=
```

Without a key, the graph still runs and the UI still scrolls/highlights correctly
(there's a keyword-based fallback), but the router can't truly understand intent
and the terminal panel shows a placeholder instead of a real streamed pitch.

## 2. Run locally

Two terminals:

```bash
# Terminal 1 — backend (needs Python deps: fastapi, uvicorn, langgraph, langchain-groq, groq, python-dotenv)
cd backend
uvicorn main:app --reload --port 8000
```

```bash
# Terminal 2 — frontend
cd web
cp .env.local.example .env.local   # NEXT_PUBLIC_AGENT_WS_URL=ws://localhost:8000/agent-tour
npm run dev
```

Open http://localhost:3000, click **"Ask the AI tour guide"** bottom-right, and try:
- "Show me his production-ready AI architecture work" → scrolls to a project
- "What does her infrastructure stack look like?" → opens a skill-stack modal

## 3. Deploy

### Backend → Render
1. Push this repo to GitHub (see note below — this machine has no git credentials
   configured yet, so `git push` must be run from your own Terminal once).
2. On https://render.com, **New → Blueprint**, connect the repo. Render will find
   `render.yaml` at the repo root and configure the `backend/` service automatically.
3. In the service's **Environment** tab, set `GROQ_API_KEY` (Render won't accept it
   from the blueprint file — that's intentional, it's a secret).
4. Deploy. Note the resulting URL, e.g. `https://preksha-portfolio-tour-agent.onrender.com`
   — the WebSocket URL is the same host with `wss://` and path `/agent-tour`.

### Frontend → Vercel
1. On https://vercel.com, **New Project**, import the same repo, set **Root
   Directory** to `web`.
2. Add an environment variable: `NEXT_PUBLIC_AGENT_WS_URL` =
   `wss://<your-render-service>.onrender.com/agent-tour`.
3. Deploy.
4. Back on Render, update `ALLOWED_ORIGINS` to your Vercel URL (e.g.
   `https://your-portfolio.vercel.app`) so the backend's CORS allows it, then
   redeploy the backend.

### A note on the free tiers
Render's free web services spin down after inactivity — the agent's first request
after a while may take 30-60s to "wake up" the backend. That's normal, not a bug.
