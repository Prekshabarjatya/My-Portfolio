"use client";

import { useRef, useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { TechIcon } from "@/components/TechIcon";

function TechRow({ name }: { name: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const row = rowRef.current;
    const icon = iconRef.current;
    if (!row || !icon) return;
    const rect = row.getBoundingClientRect();
    icon.style.left = e.clientX - rect.left - 24 + "px";
    icon.style.top = e.clientY - rect.top - 24 + "px";
  }

  return (
    <div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden border-b border-border px-1 py-3 last:border-b-0"
    >
      <p className="text-lg font-medium transition-transform duration-300 group-hover:translate-x-2">
        {name}
      </p>
      <div
        ref={iconRef}
        className="pointer-events-none absolute h-12 w-12 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
        style={{ left: 0, top: 0 }}
      >
        <TechIcon name={name} />
      </div>
    </div>
  );
}

const CATEGORY_ACCENTS: Record<string, string> = {
  Languages: "hsl(350, 65%, 50%)",
  "AI/ML": "hsl(280, 35%, 48%)",
  Backend: "hsl(150, 40%, 38%)",
  "Cloud & DevOps": "hsl(28, 75%, 48%)",
  "Data & BI": "hsl(200, 45%, 42%)",
};

export function ProjectTechStack({
  techStack,
}: {
  techStack: Record<string, readonly string[]>;
}) {
  const categories = Object.entries(techStack);
  const [openCategory, setOpenCategory] = useState<string | null>(
    categories[0]?.[0] ?? null
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-1.5">
      <p className="px-4 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Tech Stack Overview
      </p>
      <div className="flex flex-col gap-1.5 p-1.5">
        {categories.map(([category, items]) => {
          const isOpen = openCategory === category;
          const accent = CATEGORY_ACCENTS[category] ?? "var(--accent)";
          return (
            <div
              key={category}
              className="overflow-hidden rounded-xl bg-background"
              style={{ borderLeft: `4px solid ${accent}` }}
            >
              <button
                onClick={() => setOpenCategory(isOpen ? null : category)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="flex items-center gap-2 font-semibold">
                  {category}
                  <span className="text-xs font-normal text-muted-foreground">
                    ({items.length})
                  </span>
                </span>
                <CaretRight
                  size={14}
                  weight="bold"
                  className="text-muted-foreground transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                />
              </button>
              <div
                className="grid transition-all duration-300 ease-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-2">
                    {items.map((item) => (
                      <TechRow key={item} name={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
