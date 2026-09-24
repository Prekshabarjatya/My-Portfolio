"use client";

import { useRef } from "react";
import { TechIcon } from "@/components/TechIcon";

const NAME = "Preksha".split("");
// One letter, one real piece of her stack. A playful reveal, not a claim that
// the letter stands for the tool.
const TECH_FOR_LETTER = ["Python", "LangChain", "LangGraph", "RAG", "FastAPI", "Docker", "AWS"];

export function HoverNameLetters() {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  function handleMouseMove(e: React.MouseEvent<HTMLSpanElement>, i: number) {
    const icon = iconRefs.current[i];
    if (!icon) return;
    const rect = e.currentTarget.getBoundingClientRect();
    icon.style.left = `${e.clientX - rect.left - 24}px`;
    icon.style.top = `${e.clientY - rect.top - 24}px`;
  }

  return (
    <h1 className="t-hero flex w-full items-center justify-between font-display font-medium uppercase text-foreground select-none">
      {NAME.map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="group relative inline-block cursor-default overflow-hidden px-[0.03em] py-[0.08em] transition-colors duration-300 hover:text-accent"
          onMouseMove={(e) => handleMouseMove(e, i)}
        >
          {letter}
          <div
            ref={(el) => {
              iconRefs.current[i] = el;
            }}
            className="pointer-events-none absolute h-12 w-12 opacity-0 transition-opacity duration-300 group-hover:opacity-90 md:h-16 md:w-16"
            style={{ left: 0, top: 0 }}
          >
            <TechIcon name={TECH_FOR_LETTER[i]} />
          </div>
        </span>
      ))}
      <span className="sr-only">Preksha Barjatya</span>
    </h1>
  );
}
