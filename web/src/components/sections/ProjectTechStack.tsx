"use client";

import { useRef, useState } from "react";
import { CaretRight } from "@phosphor-icons/react";

// Real brand icons for actual named tools/libraries.
const BRAND_ICON_SRC: Record<string, string> = {
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  FastAPI: "https://cdn.simpleicons.org/fastapi/009688",
  LangChain: "https://cdn.simpleicons.org/langchain/1C3C3C",
  Pydantic: "https://cdn.simpleicons.org/pydantic/E92063",
};

// Everything else here is a concept, not a single branded product, so it
// gets a generic glyph instead of a fabricated logo.
function ConceptGlyph({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "LangGraph":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <line x1="6" y1="6" x2="12" y2="18" />
          <line x1="18" y1="6" x2="12" y2="18" />
          <line x1="6" y1="6" x2="18" y2="6" />
        </svg>
      );
    case "Agentic AI":
      return (
        <svg {...common}>
          <rect x="5" y="9" width="14" height="10" rx="2" />
          <circle cx="9" cy="14" r="1" fill="currentColor" />
          <circle cx="15" cy="14" r="1" fill="currentColor" />
          <line x1="12" y1="9" x2="12" y2="5" />
          <circle cx="12" cy="4" r="1" />
        </svg>
      );
    case "Tool Calling":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.1-3.1a6 6 0 0 1-7.6 7.6l-6.9 6.9a2 2 0 0 1-2.8-2.8l6.9-6.9a6 6 0 0 1 7.6-7.6l-3.3 3.3Z" />
        </svg>
      );
    case "RAG":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "LLM":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 1 1 16.1-3.8Z" />
        </svg>
      );
    case "Automation":
      return (
        <svg {...common}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
        </svg>
      );
    case "Vector Search":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

function TechIcon({ name }: { name: string }) {
  const src = BRAND_ICON_SRC[name];
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" className="h-full w-full object-contain" />;
  }
  return <ConceptGlyph name={name} />;
}

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
