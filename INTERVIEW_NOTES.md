# Interview Notes — Live Interactive Website Tour Guide

Prep notes for talking through this project in an interview. Written the
same way as the resume-intelligence-platform notes: what it actually does,
why it's built the way it is, what actually broke while building it, and
straight answers to the questions an interviewer is likely to ask.

## One-line pitch

A LangGraph agent, served over FastAPI WebSockets and powered by Groq, that
reads a visitor's free-text question and drives the portfolio site itself —
scrolling to the right project, opening the right skill category, or
answering a personal question — while a React Flow panel shows its actual
reasoning path lighting up node by node, live.

## What it demonstrates

- Designing and running a real multi-branch LangGraph state machine (not a
  single prompt-in/text-out chatbot).
- A backend that drives a frontend UI in real time over a WebSocket, not
  just returning text.
- Streaming LLM output token-by-token to the client.
- Grounding LLM output in a real knowledge base instead of letting it
  free-associate — and catching/fixing a case where it didn't.

## Architecture

```
recruiter query
      │
      ▼
route_recruiter (LLM classifies intent: PROJECTS / STACK / PERSONAL / UNCLEAR)
      │
      ├─ PROJECTS  → scroll_projects   (keyword match → best project, scroll_to)
      ├─ STACK     → highlight_stack   (keyword match → best skill category, open_modal)
      ├─ PERSONAL  → answer_personal   (keyword match → 1-2 KB topics)
      └─ UNCLEAR   → loops back to route_recruiter (capped at 2 loops)
      │
      ▼
evaluate_pitch (deterministic: enough grounded context yet? len>=2 or loop cap hit)
      │
      ├─ not enough → loops back to route_recruiter for more context
      └─ enough     → terminal_output
                            │
                            ▼
                 stream a grounded answer token-by-token from Groq
```

Every node is a plain Python function returning a partial state update
(`active_node`, `ui_action`, `ui_target_element`, `pitch_context`,
`thought`). `main.py` streams each node's update over the WebSocket as it
happens (`graph.astream(...)`), with a small `asyncio.sleep(0.55)` between
steps — without it the whole graph resolves in well under a second on
Groq and the frontend's reasoning trace just flashes by unreadably. The
delay is purely a UX choice, not a technical necessity.

The final answer is **not** generated inside the LangGraph node. `terminal_output`
only marks the state transition; the actual completion call happens directly
in `main.py` using the raw `groq` SDK with `stream=True`, so tokens can be
forwarded to the frontend as they arrive. Two different Groq clients are used
deliberately: `langchain_groq.ChatGroq` inside the graph (fits LangGraph's
node interface cleanly), and the raw `groq.Groq` SDK for the final streaming
call (needed direct control over the stream, which the LangChain wrapper
doesn't expose as conveniently for this pattern).

## Why keyword matching *and* an LLM, not just one

`route_recruiter` (top-level intent) is LLM-classified — free-text intent is
exactly what LLMs are good at, and the four categories are simple enough
that a small/fast model classifies reliably. But picking the *specific*
project or skill category within a branch (`find_best_project`,
`find_best_skill_category`, `find_best_personal_topics`) is a plain Python
keyword-overlap scorer, not another LLM call. Two reasons: it's
deterministic (same query always finds the same project — important when
the frontend needs a real DOM id to scroll to), and it's free/instant next
to another network round-trip. The LLM's job is understanding *what kind*
of question this is; a dumb scorer's job is finding *which specific fact*
answers it.

## Grounding — the most interesting bug

`evaluate_pitch` requires at least 2 grounded context items before writing
the final answer (or gives up after 2 loops). Early on this worked fine for
project/stack questions but produced a genuinely bad answer for a personal
one: **"Why did she choose AI as a career?"** got routed to `answer_personal`
correctly, but the keyword list for the `why_ai` topic only matched exact
phrases like `"why did you choose ai"` — the actual query said **"she"**,
not "you", so nothing matched, and the code's fallback silently picked an
unrelated topic (hobbies). The LLM, told to ground its answer only in what
it was given, still had to *answer the question that was asked*, and ended
up stretching an unrelated fact into something that sounded plausible but
wasn't true ("designing AI tools lets me bring the stories I enjoy reading
into tangible experiences" — not something anyone actually said).

That's a textbook silent-grounding-failure: no error, no exception, a
perfectly fluent answer — just built on the wrong facts. Fix was two-part:
broaden the keyword matching to shorter, more general fragments
(`"choose ai"`, `"chose ai"` instead of one long exact phrase), and replace
the narrow single-topic fallback with a deliberately generic one
(`strongest_skills` + `values` — safe under almost any personal question)
instead of guessing a specific, possibly-wrong one. Verified by testing the
matcher directly against a batch of rephrased queries before trusting it
again, not just eyeballing one output.

## Other real bugs hit while building this (good debugging stories)

- **Tailwind `dark:` variant silently ignoring the in-app theme toggle.**
  `ThemeProvider` toggles a `.dark` class on `<html>` via JS, but Tailwind
  v4's `dark:` utilities compile against `prefers-color-scheme` by default,
  not a class. Any `dark:*` utility was actually responding to the OS theme,
  not the site's own toggle — invisible until testing on a machine whose OS
  was in dark mode while the site's toggle said light. Fixed with
  `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css`.
- **Inline style beating a Tailwind `hover:` class.** A button had
  `style={{color: 'var(--accent)'}}` and a `hover:text-white` class — the
  inline style always wins over a class regardless of `:hover`, so on hover
  the text stayed the same rose color as the now-rose background: invisible
  text. Moved the base color to a Tailwind class too so hover could
  actually override it through normal cascade order.
- **`npm run build` corrupting a live `npm run dev`'s cache.** Running a
  production build against the same `.next` directory a dev server was
  actively using left the dev server serving stale/broken chunks
  indefinitely, surviving even a hard reload. Fix was killing dev, clearing
  `.next`, restarting — now I stop dev before building, always.
- **Backend running without `--reload`.** Early on, Python edits to
  `graph.py`/`main.py` silently didn't apply because uvicorn was started
  without `--reload` — the running process still had the old code in
  memory. No error, just old behavior persisting; easy to mistake for the
  fix not working.
- **Port collision with an unrelated project.** `localhost:8000` was
  sometimes occupied by a *different* local project
  (`resume-intelligence-platform`, which happens to also expose `/health`),
  so a "working" health check wasn't proof this backend was actually the
  one running. Learned to check the process list, not just the HTTP
  response, when something "should" be running but behaves oddly.

## Trade-offs / known limitations (be upfront about these)

- **Keyword scoring is dumb by design.** It has no semantic understanding —
  a query with none of the right words falls back to a default rather than
  "understanding" intent the way the LLM router does. That's an intentional
  boundary (deterministic + free) but it's a real limitation, not a hidden one.
- **The loop-back can waste a full extra round-trip.** If `route_recruiter`
  classifies the same query the same way twice (likely, since it's the same
  input), the second pass through `answer_personal`/`scroll_projects` often
  finds the *same* fact again rather than genuinely new information. It
  still self-corrects into a valid 2-fact answer, just not always
  efficiently — a smarter version would track what's already been found and
  actively seek something different on a loop-back, not just re-run the
  same lookup.
- **Render free tier sleeps after ~15 min idle.** Solved with a GitHub
  Actions workflow pinging `/health` every 10 minutes rather than paying
  for an always-on instance — a legitimate trade-off for a portfolio
  project, would not be the answer for anything with real traffic/SLA.
- **No conversation memory.** Each query is a fresh graph run; the agent
  doesn't know what you asked five seconds ago. A deliberate scope cut, not
  an oversight — the portfolio use case is single-shot questions, not a
  multi-turn chat.

## Likely interview questions

**"Why LangGraph instead of just a prompt with function calling?"**
Because the *routing decision itself* needed to be inspectable and driveable
from the frontend — the whole point of the feature is showing the graph
light up node by node. A single function-calling prompt gives you an opaque
tool call, not a state machine with named nodes and explicit edges you can
render and reason about. LangGraph made the "show your work" requirement a
natural fit instead of something bolted on.

**"How do you prevent hallucination?"**
The LLM never answers from its own knowledge — every final answer is built
from a `pitch_context` list of facts assembled by earlier deterministic
nodes, and the prompt explicitly says "grounded ONLY in the facts below."
The real failure mode isn't the LLM inventing things outright; it's the
*retrieval* step handing it the wrong facts, which is exactly what the
why-AI bug above was. Grounding is only as good as what gets retrieved.

**"What would you change with more time?"**
Replace the flat keyword-overlap matcher with real embeddings/vector
search for topic retrieval — it would fix the exact-phrase brittleness at
the root instead of me manually widening keyword lists every time a new
phrasing breaks it. I'd also give the loop-back path memory of what it
already tried, so a second pass actively looks for a *different* fact
instead of risking finding the same one again.

**"How does this scale?"**
It doesn't need to, for what it is — a single-visitor conversational feature
on a portfolio site, not a production service. If it needed to: the keyword
scoring is O(topics × keywords) per query, trivial at this size; the real
cost is Groq API latency and Render's free-tier cold starts, which is why
the keep-warm workflow exists. The interesting scaling question would
actually be knowledge-base size — flat keyword lists stop working long
before a vector index would.
