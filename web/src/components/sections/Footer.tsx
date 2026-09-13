"use client";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2026 Preksha Barjatya. All rights reserved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-transform hover:-translate-y-1 hover:text-foreground active:scale-95"
          style={{ transitionTimingFunction: "var(--spring)" }}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
