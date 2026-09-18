"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TechIcon } from "@/components/TechIcon";

const NAME = "Preksha".split("");
// One letter, one real piece of her stack — purely a playful reveal, not a
// claim that the letter stands for the tool.
const TECH_FOR_LETTER = ["Python", "LangChain", "LangGraph", "RAG", "FastAPI", "Docker", "AWS"];

export function HoverNameLetters() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <h1 className="flex font-display text-7xl leading-none tracking-tight text-accent md:text-8xl">
      {NAME.map((letter, i) => (
        <span
          key={i}
          className="relative inline-block cursor-default"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
        >
          {letter}
          <AnimatePresence>
            {hovered === i && (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.75 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.75 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute -top-3 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full border border-border bg-card p-2.5 text-foreground shadow-xl md:h-16 md:w-16 md:p-3"
              >
                <TechIcon name={TECH_FOR_LETTER[i]} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      ))}
    </h1>
  );
}
