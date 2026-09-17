"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Code,
  BracketsCurly,
  HardDrives,
  CloudArrowUp,
  ChartBar,
  Sparkle,
} from "@phosphor-icons/react";
import { skillCategories } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";

const CATEGORY_ICONS: Record<string, typeof Code> = {
  "skill-programming": Code,
  "skill-python-concepts": BracketsCurly,
  "skill-backend": HardDrives,
  "skill-cloud-devops": CloudArrowUp,
  "skill-data-bi": ChartBar,
  "skill-ai-ml": Sparkle,
};

export function Skills() {
  const [activeId, setActiveId] = useState<string>(skillCategories[0].id);
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  return (
    <section
      id="skills"
      className="sticky top-0 z-[2] bg-background px-6 py-32 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.18)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl">Skills Console</h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            The core skills behind an AI engineer, building up from
            programming fundamentals to the AI/ML work that defines the role.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="corner-brackets grid overflow-hidden rounded-2xl border border-border md:grid-cols-[260px_1fr]"
        >
          {/* Sidebar tab list */}
          <div className="flex flex-row overflow-x-auto border-b border-border bg-card md:flex-col md:overflow-visible md:border-b-0 md:border-r">
            {skillCategories.map((category) => {
              const Icon = CATEGORY_ICONS[category.id] ?? Code;
              const isActive = category.id === activeId;
              const isCore = "core" in category && category.core;
              return (
                <button
                  key={category.id}
                  id={category.id}
                  onClick={() => setActiveId(category.id)}
                  className={`transition-spring-soft flex shrink-0 items-center gap-3 border-b border-border px-5 py-4 text-left text-base font-medium last:border-b-0 md:shrink md:w-full ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-background hover:text-foreground"
                  }`}
                >
                  <Icon size={18} weight="bold" />
                  <span className="whitespace-nowrap">{category.title}</span>
                  {isCore && (
                    <span
                      className={`ml-auto hidden rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider md:inline ${
                        isActive ? "bg-background text-foreground" : "bg-accent text-accent-foreground"
                      }`}
                    >
                      Core
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div className="dotted-grid min-h-[420px] overflow-hidden bg-background p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-6 text-xs uppercase tracking-wider text-muted-foreground">
                  {active.title} · {active.items.length} skills
                </p>
                <div className="flex flex-wrap gap-3">
                  {active.items.map((item) => (
                    <span
                      key={item}
                      className="transition-spring rounded-full border border-border bg-card px-5 py-2.5 text-base hover:-translate-y-1 hover:scale-105 hover:border-foreground hover:bg-foreground hover:text-background active:scale-95"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
