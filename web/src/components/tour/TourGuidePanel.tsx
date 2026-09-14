"use client";

import { useEffect, useState } from "react";
import { useAgentTour } from "@/hooks/useAgentTour";
import { AgentGraphFlow } from "./AgentGraphFlow";
import { ReasoningTrace } from "./ReasoningTrace";
import { HighlightedOutput } from "./HighlightedOutput";
import { StackModal } from "./StackModal";

const EXAMPLE_PROMPTS = [
  "Show me her production-ready AI architecture work",
  "What does her infrastructure stack look like?",
  "What are her hobbies and long-term goals?",
];

export function TourGuidePanel() {
  const {
    status,
    activeNode,
    visitedNodes,
    lastEvent,
    steps,
    pitchText,
    isPitching,
    errorMessage,
    sendQuery,
  } = useAgentTour();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [modalTarget, setModalTarget] = useState<string | null>(null);

  // The "Website Bridge": react to each node event by actually driving the DOM.
  useEffect(() => {
    if (!lastEvent) return;

    if (lastEvent.action === "scroll_to" && lastEvent.target) {
      const el = document.querySelector(lastEvent.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("highlight-pulse-ring");
        window.setTimeout(() => el.classList.remove("highlight-pulse-ring"), 2400);
      }
    }

    if (lastEvent.action === "open_modal" && lastEvent.target) {
      setModalTarget(lastEvent.target);
    }
  }, [lastEvent]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    sendQuery(trimmed);
  }

  return (
    <>
      <StackModal targetId={modalTarget} onClose={() => setModalTarget(null)} />

      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-sm font-medium text-background shadow-xl transition-transform hover:scale-105 active:scale-95"
        style={{ transitionTimingFunction: "var(--spring)" }}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            status === "open" ? "bg-green-400" : "bg-amber-400"
          }`}
        />
        {open ? "Close tour guide" : "Ask the AI tour guide"}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-24 right-6 z-[90] max-h-[85vh] w-[min(440px,calc(100vw-3rem))] origin-bottom-right overflow-y-auto rounded-2xl border border-border bg-background p-4 shadow-2xl transition-all ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0"
        }`}
        style={{ transitionTimingFunction: "var(--spring-soft)", transitionDuration: "0.35s" }}
      >
        <p className="font-serif text-xl">Live Tour Guide</p>
        <p className="mt-1 text-xs text-muted-foreground">
          A LangGraph agent (running on Groq) reads your intent and drives this
          page for you — every reasoning step below is real, not scripted.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Show me her production-ready AI work"
            className="flex-1 rounded-full border border-border bg-card px-4 py-2 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-90"
            style={{ transitionTimingFunction: "var(--spring)" }}
          >
            Ask
          </button>
        </form>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => {
                setQuery(p);
                sendQuery(p);
              }}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-transform hover:scale-105 hover:text-foreground active:scale-95"
              style={{ transitionTimingFunction: "var(--spring)" }}
            >
              {p}
            </button>
          ))}
        </div>

        {errorMessage && (
          <p className="mt-3 rounded-lg bg-red-500/10 p-2 text-xs text-red-500">
            {errorMessage}
          </p>
        )}

        <div className="mt-4">
          <AgentGraphFlow activeNode={activeNode} visitedNodes={visitedNodes} />
        </div>

        <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Live reasoning
        </p>
        <ReasoningTrace steps={steps} activeNode={activeNode} />

        <div className="mt-3">
          <HighlightedOutput text={pitchText} isPitching={isPitching} />
        </div>
      </div>
    </>
  );
}
