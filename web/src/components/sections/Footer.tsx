"use client";

import { ArrowUp } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2026 Preksha Barjatya. All rights reserved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="transition-spring flex items-center gap-2 text-sm text-muted-foreground hover:-translate-y-1 hover:text-foreground active:scale-95"
        >
          Back to top
          <ArrowUp size={14} weight="bold" />
        </button>
      </div>
    </footer>
  );
}
