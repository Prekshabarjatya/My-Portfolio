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
      className="rounded-xl border-l-4 bg-accent/10 p-5"
      style={{ borderColor: "var(--accent)" }}
    >
      <p className="mb-2 flex items-center gap-2 text-[22px] font-semibold uppercase tracking-wider text-accent">
        <Sparkle size={20} weight="bold" /> Highlighted by the tour agent
      </p>
      <p className="text-[28px] leading-relaxed">
        {text}
        {isPitching && (
          <span
            className="ml-0.5 inline-block h-7 w-[3px] align-middle"
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
