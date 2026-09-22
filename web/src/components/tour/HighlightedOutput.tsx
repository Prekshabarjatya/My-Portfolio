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
    <div className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] shadow-inner">
      {/* Terminal chrome bar */}
      <div className="flex items-center gap-1.5 border-b border-[#2a2a2a] bg-[#141414] px-3.5 py-2.5 sm:px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 truncate font-mono text-[11px] text-[#7a7a7a] sm:text-xs lg:text-base">
          terminal_output
        </span>
      </div>

      {/* Console body */}
      <div className="p-4 font-mono text-[14px] leading-relaxed text-[#d4d4d4] sm:p-5 sm:text-lg lg:text-[26px]">
        <span className="text-[#22c55e]">$ </span>
        {text}
        {isPitching && (
          <span
            className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] align-middle"
            style={{
              background: "#22c55e",
              animation: "caret-blink 1s steps(1) infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}
