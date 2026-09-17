"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  /** Distance the content travels in from, in pixels. */
  y?: number;
};

// Sections are position: sticky and slide over one another as you scroll
// (see globals.css's z-index scale). A symmetric center-band margin here
// is a trap: content near the top of a section that's already stuck at
// top: 0 (e.g. its heading) can sit permanently above that band and
// never reveal. Only shrinking from the bottom delays the trigger a
// little (content must be within the top 80% of the viewport, not just
// barely peeking in) without ever excluding content pinned at the top.
const VIEWPORT = { once: true, margin: "0px 0px -20% 0px" } as const;

export function Reveal({ children, delay = 0, className, id, y = 20 }: RevealProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** Delay between each direct child's reveal, in seconds. */
  stagger?: number;
};

export function RevealGroup({ children, className, stagger = 0.08 }: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 16 }: Omit<RevealProps, "delay">) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
