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
      className="group relative overflow-hidden py-2"
    >
      <p className="t-body text-muted-foreground transition-transform duration-300 group-hover:translate-x-2 group-hover:text-foreground">
        {name}
      </p>
      <div
        ref={iconRef}
        className="pointer-events-none absolute h-12 w-12 opacity-0 transition-opacity duration-300 group-hover:opacity-50"
        style={{ left: 0, top: 0 }}
      >
        <TechIcon name={name} />
      </div>
    </div>
  );
}

// A quiet accordion that lives inside its project panel, so it inherits the
// panel's tint instead of adding another box.
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
    <div className="divide-y divide-foreground/15 border-y border-foreground/15">
      {categories.map(([category, items]) => {
        const isOpen = openCategory === category;
        return (
          <div key={category}>
            <button
              onClick={() => setOpenCategory(isOpen ? null : category)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="t-body font-medium">
                {category}{" "}
                <span className="t-small font-normal text-muted-foreground">
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
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="pb-4">
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
  );
}
