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
// (see globals.css's z-index scale). Triggering a reveal as soon as a
// section merely peeks into view would make its fade-in run WHILE it's
// still sliding into its stuck position, fighting with the scroll motion.
// Waiting until it's substantially in view (well after it's settled at
// top: 0) keeps every section's reveal as smooth as the first one.
const VIEWPORT = { once: true, margin: "-30% 0px -30% 0px" } as const;

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
