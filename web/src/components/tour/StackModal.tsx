"use client";

import { skillCategories } from "@/data/portfolio";

export function StackModal({
  targetId,
  onClose,
}: {
  targetId: string | null;
  onClose: () => void;
}) {
  if (!targetId) return null;
  const category = skillCategories.find((c) => `#${c.id}` === targetId);
  if (!category) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl transition-transform"
        style={{ animation: "modal-pop 0.35s var(--spring)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Highlighted by the tour agent
        </p>
        <h3 className="mt-1 font-display text-2xl">{category.title}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {category.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border px-3 py-1 text-sm"
            >
              {item}
            </span>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-foreground py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02] active:scale-95"
        >
          Close
        </button>
      </div>
      <style jsx>{`
        @keyframes modal-pop {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
