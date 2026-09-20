"use client";

import { ArrowClockwise, CircleNotch, Moon } from "@phosphor-icons/react";
import type { ServerState } from "@/hooks/useAgentTour";

export function WakeStatus({
  state,
  elapsed,
  pendingQuery,
  onRetry,
}: {
  state: ServerState;
  elapsed: number;
  pendingQuery: string | null;
  onRetry: () => void;
}) {
  if (state === "waking") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-4 rounded-xl border border-border bg-card p-4"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
            <CircleNotch size={20} weight="bold" className="animate-spin" />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug sm:text-lg lg:text-[26px]">
              Waking up the AI agent…
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground sm:text-base lg:text-[22px]">
              It runs on a free server that naps when nobody&apos;s around. The
              first wake-up usually takes 30–60 seconds. After that it&apos;s
              instant.
            </p>
          </div>
        </div>

        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-border"
          aria-hidden="true"
        >
          <div
            className="h-full w-1/3 rounded-full bg-accent"
            style={{ animation: "wake-slide 1.4s ease-in-out infinite" }}
          />
        </div>

        <p className="mt-2 flex flex-wrap items-center justify-between gap-x-3 text-[12px] text-muted-foreground sm:text-sm lg:text-[20px]">
          <span>{elapsed}s elapsed</span>
          {pendingQuery && (
            <span className="min-w-0 truncate">
              Your question will send automatically
            </span>
          )}
        </p>

        <style jsx>{`
          @keyframes wake-slide {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(300%);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            div :global(.animate-spin) {
              animation-duration: 3s;
            }
          }
        `}</style>
      </div>
    );
  }

  if (state === "unreachable") {
    return (
      <div
        role="alert"
        className="mt-4 rounded-xl border border-border bg-card p-4"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
            <Moon size={20} weight="bold" />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug sm:text-lg lg:text-[26px]">
              The agent is still asleep
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground sm:text-base lg:text-[22px]">
              It didn&apos;t respond in time. This can happen when the free
              server is under load. Give it another try.
            </p>
          </div>
        </div>
        <button
          onClick={onRetry}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[14px] font-medium text-background transition-transform active:scale-95 sm:text-base lg:text-[22px]"
        >
          <ArrowClockwise size={16} weight="bold" />
          Try again
        </button>
      </div>
    );
  }

  return null;
}
