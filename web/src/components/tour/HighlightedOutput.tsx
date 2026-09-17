"use client";

import { Sparkle } from "@phosphor-icons/react";

export function HighlightedOutput({
  text,
  isPitching,
}: {
  text: string;
  isPitching: boolean;
}) {
  if (!text && !isPitching) return null;

  return (
    <div
      className="rounded-xl border-l-4 bg-accent/10 p-4"
      style={{ borderColor: "var(--accent)" }}
    >
      <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
        <Sparkle size={12} weight="bold" /> Highlighted by the tour agent
      </p>
      <p className="text-sm leading-relaxed">
        {text}
        {isPitching && (
          <span
            className="ml-0.5 inline-block h-4 w-[2px] align-middle"
            style={{
              background: "var(--accent)",
              animation: "caret-blink 1s steps(1) infinite",
            }}
          />
        )}
      </p>
    </div>
  );
}
