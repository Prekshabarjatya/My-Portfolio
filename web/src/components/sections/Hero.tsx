"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { OpeningScene } from "./OpeningScene";

// The opening is a small choose-your-path scene: a dark sky with an orbiting
// particle ring, a serif headline, and four ways into the work. The scene is
// always dark, whatever theme the rest of the page is in. It is the one
// deliberate theme switch on the page.

type Path = {
  title: string;
  note: string;
  href?: string;
  action?: "tour";
};

const PATHS: Path[] = [
  {
    title: "Show me what you've built.",
    note: "Three projects, from resume scoring to cited research papers.",
    href: "#projects",
  },
  {
    title: "How do you keep it honest?",
    note: "A case study on checking citations in code, not by the model.",
    href: "#case-study",
  },
  {
    title: "Can I just ask you?",
    note: "A live LangGraph agent gives the tour.",
    action: "tour",
  },
  {
    title: "Where have you worked?",
    note: "Two internships, one in AI and one in data.",
    href: "#experience",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } },
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function IstClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">IST {time || "--:--:--"}</span>;
}

function PathRow({ path }: { path: Path }) {
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="transition-spring mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60 group-hover:bg-accent-on-ink"
      />
      <span className="min-w-0 flex-1">
        <span className="transition-spring block text-[1.0625rem] font-medium group-hover:text-accent-on-ink">
          {path.title}
        </span>
        <span className="mt-0.5 block text-sm text-white/60">{path.note}</span>
      </span>
      <ArrowUpRight
        size={18}
        weight="bold"
        aria-hidden="true"
        className="transition-spring mt-1 shrink-0 text-white/60 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
      />
    </>
  );

  const cls =
    "transition-spring group flex w-full items-start gap-4 rounded-2xl px-2 py-2.5 text-left hover:bg-white/[0.06]";

  if (path.action === "tour") {
    return (
      <button
        type="button"
        className={cls}
        onClick={() => window.dispatchEvent(new CustomEvent("open-tour-guide"))}
      >
        {inner}
      </button>
    );
  }
  return (
    <a href={path.href} className={cls}>
      {inner}
    </a>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-[100dvh] overflow-hidden rounded-b-[2rem] bg-[#08080a] text-[#f2f2ef]"
    >
      {/* Faint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <OpeningScene />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex min-h-[100dvh] w-full max-w-4xl flex-col items-center justify-center px-6 pb-44 pt-24 text-center md:pb-28"
      >
        <motion.p variants={item} className="t-small text-white/60">
          Preksha Barjatya (AI engineer, Indore)
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-5 font-serif text-[clamp(2.5rem,7vw,4.75rem)] font-bold leading-[1.02] tracking-tight"
        >
          Curious by default.
          <em className="block pb-1 font-medium italic text-accent-on-ink">
            Careful by design.
          </em>
        </motion.h1>

        <motion.p variants={item} className="t-small mt-5 max-w-xs text-white/60">
          Choose where to start. Everything is one scroll away.
        </motion.p>

        <motion.ul variants={list} className="relative mt-8 w-full max-w-md">
          {/* Dotted trail linking the four paths */}
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[11px] top-8 border-l border-dotted border-white/25"
          />
          {PATHS.map((path) => (
            <motion.li key={path.title} variants={item}>
              <PathRow path={path} />
            </motion.li>
          ))}
        </motion.ul>

        <motion.a
          variants={item}
          href="#about"
          className="transition-spring t-small mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-white/80 hover:bg-white/[0.08] hover:text-white"
        >
          Let me look around
          <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
        </motion.a>
      </motion.div>

      <p className="t-small pointer-events-none absolute inset-x-0 bottom-24 px-6 text-center font-serif italic text-white/50">
        Every path leads back to the work.
      </p>
      <p className="t-small absolute bottom-6 left-6 hidden text-white/50 md:block">
        <IstClock />
      </p>
    </section>
  );
}
