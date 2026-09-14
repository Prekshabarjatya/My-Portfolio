"use client";

import { useEffect, useRef } from "react";
import type { NodeEvent } from "@/hooks/useAgentTour";

const STEP_META: Record<string, { icon: string; label: string }> = {
  route_recruiter: { icon: "🧭", label: "Reading your intent" },
  scroll_projects: { icon: "📂", label: "Finding the right project" },
  highlight_stack: { icon: "🧰", label: "Finding the right skills" },
  answer_personal: { icon: "💬", label: "Checking what she'd say" },
  evaluate_pitch: { icon: "✅", label: "Checking if that's enough" },
  terminal_output: { icon: "✨", label: "Writing the pitch" },
};

export function ReasoningTrace({
  steps,
  activeNode,
}: {
  steps: NodeEvent[];
  activeNode: string | null;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [steps.length]);

  if (steps.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
        Ask something and watch the agent think, step by step.
      </p>
    );
  }

  return (
    <div className="max-h-48 space-y-0 overflow-y-auto rounded-xl border border-border bg-card p-3">
      {steps.map((step, i) => {
        const meta = STEP_META[step.node] ?? { icon: "•", label: step.node };
        const isLast = i === steps.length - 1;
        const isActive = step.node === activeNode && isLast;
        return (
          <div
            key={step.id}
            className="flex gap-3 pb-3 last:pb-0"
            style={{
              animation: "trace-in 0.35s var(--spring-soft, ease) both",
            }}
          >
            <div className="flex flex-col items-center">
              <span
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs ${
                  isActive ? "bg-accent text-white" : "bg-background"
                }`}
                style={{
                  border: "1px solid var(--border)",
                  animation: isActive ? "trace-pulse 1.2s ease-in-out infinite" : "none",
                }}
              >
                {meta.icon}
              </span>
              {!isLast && <span className="mt-1 h-full w-px flex-1 bg-border" />}
            </div>
            <div className="min-w-0 pb-1">
              <p className="text-xs font-semibold">
                Step {i + 1} · {meta.label}
              </p>
              {step.thought && (
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {step.thought}
                </p>
              )}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
      <style jsx>{`
        @keyframes trace-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes trace-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 hsla(350, 60%, 55%, 0.5);
          }
          50% {
            box-shadow: 0 0 0 5px hsla(350, 60%, 55%, 0);
          }
        }
      `}</style>
    </div>
  );
}
