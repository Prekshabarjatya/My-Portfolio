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
      className="relative -mt-8 rounded-t-[2.5rem] bg-background px-5 py-14 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.18)] md:px-6 md:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-10 md:mb-16">
          <h2 className="font-display text-4xl md:text-5xl">Skills Console</h2>
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            The core skills behind an AI engineer, building up from
            programming fundamentals to the AI/ML work that defines the role.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="corner-brackets grid grid-cols-1 overflow-hidden rounded-2xl border border-border md:grid-cols-[260px_1fr]"
        >
          {/* Category tabs: wrapping pills on phones so every category is visible
              without hidden horizontal scrolling; a vertical sidebar from md up. */}
          <div className="flex min-w-0 flex-row flex-wrap gap-2 border-b border-border bg-card p-3 md:flex-col md:flex-nowrap md:gap-0 md:border-b-0 md:border-r md:p-0">
            {skillCategories.map((category) => {
              const Icon = CATEGORY_ICONS[category.id] ?? Code;
              const isActive = category.id === activeId;
              const isCore = "core" in category && category.core;
              return (
                <button
                  key={category.id}
                  id={category.id}
                  onClick={() => setActiveId(category.id)}
                  aria-pressed={isActive}
                  className={`transition-spring-soft flex items-center gap-2 rounded-full border border-border px-3.5 py-2.5 text-left text-[14px] font-medium md:w-full md:gap-3 md:rounded-none md:border-0 md:border-b md:px-5 md:py-4 md:text-base md:last:border-b-0 ${
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-background text-muted-foreground hover:text-foreground md:bg-transparent md:hover:bg-background"
                  }`}
                >
                  <Icon size={16} weight="bold" className="shrink-0" />
                  <span>{category.title}</span>
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
          <div className="dotted-grid min-h-[200px] min-w-0 overflow-hidden bg-background p-5 md:min-h-[420px] md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground md:mb-6">
                  {active.title} · {active.items.length} skills
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {active.items.map((item) => (
                    <span
                      key={item}
                      className="transition-spring rounded-full border border-border bg-card px-4 py-2 text-[15px] hover:-translate-y-1 md:px-5 md:py-2.5 md:text-base hover:scale-105 hover:border-foreground hover:bg-foreground hover:text-background active:scale-95"
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
