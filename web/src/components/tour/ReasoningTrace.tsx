"use client";

import { useEffect, useRef } from "react";
import {
  Compass,
  FolderOpen,
  Wrench,
  ChatCircle,
  CheckCircle,
  Sparkle,
  type Icon,
} from "@phosphor-icons/react";
import type { NodeEvent } from "@/hooks/useAgentTour";

const STEP_META: Record<string, { icon: Icon; label: string }> = {
  route_recruiter: { icon: Compass, label: "Reading your intent" },
  scroll_projects: { icon: FolderOpen, label: "Finding the right project" },
  highlight_stack: { icon: Wrench, label: "Finding the right skills" },
  answer_personal: { icon: ChatCircle, label: "Checking what she'd say" },
  evaluate_pitch: { icon: CheckCircle, label: "Checking if that's enough" },
  terminal_output: { icon: Sparkle, label: "Writing the pitch" },
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
      <p className="rounded-[1.25rem] border border-dashed border-border p-3 text-center text-[14px] text-muted-foreground sm:p-4 sm:text-lg lg:text-[28px]">
        Ask something and watch the agent think, step by step.
      </p>
    );
  }

  return (
    <div className="max-h-[260px] space-y-0 overflow-y-auto rounded-[1.25rem] border border-border bg-card p-3 sm:max-h-[420px] sm:p-4">
      {steps.map((step, i) => {
        const meta = STEP_META[step.node] ?? { icon: Sparkle, label: step.node };
        const StepIcon = meta.icon;
        const isLast = i === steps.length - 1;
        const isActive = step.node === activeNode && isLast;
        return (
          <div
            key={step.id}
            className="flex gap-3 pb-4 last:pb-0 sm:gap-4"
            style={{
              animation: "trace-in 0.35s var(--spring-soft, ease) both",
            }}
          >
            <div className="flex flex-col items-center">
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                  isActive ? "bg-accent text-accent-foreground" : "bg-background text-muted-foreground"
                }`}
                style={{
                  border: "1px solid var(--border)",
                  animation: isActive ? "trace-pulse 1.2s ease-in-out infinite" : "none",
                }}
              >
                <StepIcon size={18} weight="bold" />
              </span>
              {!isLast && <span className="mt-1 h-full w-px flex-1 bg-border" />}
            </div>
            <div className="min-w-0 pb-1">
              <p className="text-[14px] font-semibold leading-snug sm:text-lg lg:text-[28px]">
                ({i + 1}) {meta.label}
              </p>
              {step.thought && (
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground sm:text-base lg:text-[28px]">
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
            outline: 2px solid var(--accent); outline-offset: 0;
          }
          50% {
            outline: 2px solid transparent; outline-offset: 5px;
          }
        }
      `}</style>
    </div>
  );
}
