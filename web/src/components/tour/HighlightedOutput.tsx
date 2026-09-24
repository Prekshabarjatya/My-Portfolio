"use client";

export function HighlightedOutput({
  text,
  isPitching,
}: {
  text: string;
  isPitching: boolean;
}) {
  if (!text && !isPitching) return null;

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-[#2a2a2a] bg-[#0a0a0a]">
      {/* Terminal chrome bar */}
      <div className="flex items-center gap-1.5 border-b border-[#2a2a2a] bg-[#141414] px-3.5 py-2.5 sm:px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
        <span className="ml-2 truncate font-mono text-[13px] text-[#8a8a8a] sm:text-xs lg:text-base">
          terminal_output
        </span>
      </div>

      {/* Console body */}
      <div className="p-4 font-mono text-[14px] leading-relaxed text-[#d4d4d4] sm:p-5 sm:text-lg lg:text-[26px]">
        <span className="text-accent">$ </span>
        {text}
        {isPitching && (
          <span
            className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] align-middle"
            style={{
              background: "var(--accent)",
              animation: "caret-blink 1s steps(1) infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}
