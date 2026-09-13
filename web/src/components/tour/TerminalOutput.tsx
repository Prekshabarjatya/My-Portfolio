"use client";

export function TerminalOutput({
  text,
  isPitching,
}: {
  text: string;
  isPitching: boolean;
}) {
  if (!text && !isPitching) return null;

  return (
    <div className="rounded-xl border border-border bg-[#0a0a0a] p-4 font-mono text-[13px] leading-relaxed text-[#d4d4d4]">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-[11px] text-[#7a7a7a]">terminal_output</span>
      </div>
      <p className={isPitching ? "terminal-caret" : ""}>
        <span className="text-[#22c55e]">$ </span>
        {text}
      </p>
    </div>
  );
}
