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
  /** Play on mount instead of waiting to scroll into view. For the hero, which
   *  can sit below the trigger line on a phone and would never reveal. */
  eager?: boolean;
};

// Only shrink the trigger zone from the bottom: content must be within the top
// 80% of the viewport, not just barely peeking in. A symmetric margin would
// permanently exclude content pinned near the top of the page.
const VIEWPORT = { once: true, margin: "0px 0px -20% 0px" } as const;

export function Reveal({ children, delay = 0, className, id, y = 20, eager }: RevealProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      {...(eager
        ? { animate: "show" }
        : { whileInView: "show", viewport: VIEWPORT })}
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
