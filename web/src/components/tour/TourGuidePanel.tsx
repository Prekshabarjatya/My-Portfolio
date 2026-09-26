"use client";

import { useEffect, useState } from "react";
import { ChatCircleDots, X } from "@phosphor-icons/react";
import { useAgentTour } from "@/hooks/useAgentTour";
import { AgentGraphFlow } from "./AgentGraphFlow";
import { ReasoningTrace } from "./ReasoningTrace";
import { HighlightedOutput } from "./HighlightedOutput";
import { StackModal } from "./StackModal";
import { WakeStatus } from "./WakeStatus";

// The questions HR and recruiters ask most often in screening calls.
const EXAMPLE_PROMPTS = [
  "Tell me about her",
  "Why should we hire her?",
  "What are her key skills?",
  "Walk me through her projects",
  "What's her tech stack?",
  "What are her career goals?",
  "What are her hobbies and interests?",
];

export function TourGuidePanel() {
  const {
    status,
    serverState,
    wakeElapsed,
    activeNode,
    visitedNodes,
    lastEvent,
    steps,
    pitchText,
    isPitching,
    errorMessage,
    sendQuery,
    wakeServer,
  } = useAgentTour();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [modalTarget, setModalTarget] = useState<string | null>(null);

  // The backend sleeps when idle. Start waking it as soon as the page loads so
  // it is usually ready by the time a visitor opens the guide.
  useEffect(() => {
    wakeServer().catch(() => {});
  }, [wakeServer]);

  // The opening scene asks the guide to open with a window event.
  useEffect(() => {
    const openGuide = () => setOpen(true);
    window.addEventListener("open-tour-guide", openGuide);
    return () => window.removeEventListener("open-tour-guide", openGuide);
  }, []);

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

  function ask(text: string) {
    if (serverState !== "ready") setPendingQuery(text);
    sendQuery(text).finally(() => setPendingQuery(null));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    ask(trimmed);
  }

  const waking = serverState === "waking";
  const dotClass =
    status === "open"
      ? "bg-accent"
      : waking
        ? "animate-pulse bg-muted-foreground"
        : "bg-muted-foreground";
  const statusLabel =
    serverState === "ready"
      ? "Agent online"
      : waking
        ? "Waking up…"
        : serverState === "unreachable"
          ? "Asleep"
          : "Connecting…";

  return (
    <>
      <StackModal targetId={modalTarget} onClose={() => setModalTarget(null)} />

      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="tour-guide-panel"
        className={`fixed bottom-24 right-4 z-[90] items-center gap-2 rounded-full bg-foreground px-4 py-3 text-[13px] font-medium text-background transition-transform hover:scale-105 active:scale-95 sm:right-6 lg:bottom-6 sm:px-5 sm:py-3.5 sm:text-sm ${
          open ? "hidden sm:flex" : "flex"
        }`}
        style={{ transitionTimingFunction: "var(--spring)" }}
      >
        <ChatCircleDots size={16} weight="bold" />
        {open
          ? "Close tour guide"
          : waking
            ? "Waking AI guide…"
            : "Ask the AI tour guide"}
        <span className={`h-2 w-2 rounded-full ${dotClass}`} aria-hidden="true" />
      </button>

      {/* Panel: bottom sheet on phones, floating card from sm up */}
      <div
        id="tour-guide-panel"
        role="dialog"
        aria-label="Live tour guide"
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 z-[90] max-h-[90dvh] overflow-y-auto overscroll-contain rounded-t-[1.5rem] border border-border bg-background sm:rounded-[2rem] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all sm:inset-x-auto sm:bottom-40 sm:right-6 sm:max-h-[78vh] lg:bottom-24 lg:max-h-[85vh] sm:w-[min(760px,calc(100vw-3rem))] sm:origin-bottom-right sm:sm:p-6 ${
          open
            ? "translate-y-0 opacity-100 sm:scale-100"
            : "pointer-events-none translate-y-full opacity-0 sm:translate-y-0 sm:scale-90"
        }`}
        style={{ transitionTimingFunction: "var(--spring-soft)", transitionDuration: "0.35s" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-2xl sm:text-3xl">Live Tour Guide</p>
            <p className="mt-1 inline-flex items-center gap-2 text-[12px] text-muted-foreground sm:text-sm">
              <span className={`h-2 w-2 rounded-full ${dotClass}`} aria-hidden="true" />
              {statusLabel}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close tour guide"
            className="-mr-1 -mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <p className="mt-2 text-[14px] leading-snug text-muted-foreground sm:text-lg lg:text-[28px]">
          A LangGraph agent (running on Groq) reads your question and drives
          this page to the answer. Every reasoning step below is real, not
          scripted.
        </p>

        <WakeStatus
          state={serverState}
          elapsed={wakeElapsed}
          pendingQuery={pendingQuery}
          onRetry={() => wakeServer().catch(() => {})}
        />

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2 sm:mt-5 sm:gap-3">
          {/* 16px on phones stops iOS Safari zooming the page on focus */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything, e.g. Why should we hire her?"
            enterKeyHint="send"
            className="min-w-0 flex-1 rounded-full border border-border bg-card placeholder:text-muted-foreground px-4 py-2.5 text-base outline-none focus:border-accent sm:px-5 sm:py-3 lg:text-[28px]"
          />
          <button
            type="submit"
            className="flex-shrink-0 rounded-full bg-foreground px-5 py-2.5 text-base font-medium text-background transition-transform hover:scale-105 active:scale-90 sm:px-6 sm:py-3 lg:text-[28px]"
            style={{ transitionTimingFunction: "var(--spring)" }}
          >
            Ask
          </button>
        </form>

        <div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5">
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => {
                setQuery(p);
                ask(p);
              }}
              className="rounded-full border border-border px-3 py-1.5 text-left text-[12px] leading-snug text-muted-foreground transition-transform hover:scale-105 hover:text-foreground active:scale-95 sm:px-4 sm:py-2 sm:text-sm lg:text-[24px]"
              style={{ transitionTimingFunction: "var(--spring)" }}
            >
              {p}
            </button>
          ))}
        </div>

        {errorMessage && serverState !== "unreachable" && (
          <p className="mt-3 border-l-2 border-accent p-3 text-[14px] text-accent sm:text-lg lg:text-[28px]">
            {errorMessage}
          </p>
        )}

        <div className="mt-4">
          <AgentGraphFlow activeNode={activeNode} visitedNodes={visitedNodes} />
        </div>

        <p className="mb-3 mt-5 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-sm lg:text-[24px]">
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
