"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { HoverNameLetters } from "./HoverNameLetters";

export function Footer() {
  return (
    <footer className="px-4 pb-28 pt-6 md:px-6">
      <div className="mx-auto mb-8 max-w-[1400px]">
        <HoverNameLetters />
      </div>
      <div className="t-small mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-muted-foreground md:flex-row">
        <p>(2026) Preksha Barjatya. All rights reserved.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="transition-spring chip hover:bg-foreground hover:text-background"
        >
          Back to top
          <ArrowUp size={14} weight="bold" />
        </button>
      </div>
    </footer>
  );
}
