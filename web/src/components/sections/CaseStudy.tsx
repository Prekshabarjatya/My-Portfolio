"use client";

import { useState } from "react";
import {
  ArrowSquareOut,
  GithubLogo,
  Article,
  UserCheck,
  CaretDown,
} from "@phosphor-icons/react";
import { caseStudy } from "@/data/caseStudy";
import { Reveal } from "@/components/Reveal";

const linkClass =
  "transition-spring inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[15px] font-medium hover:scale-105 hover:bg-foreground hover:text-background active:scale-95";

export function CaseStudy() {
  const cs = caseStudy;
  const [open, setOpen] = useState(false);

  return (
    <section
      id="case-study"
      className="relative -mt-8 rounded-t-[2.5rem] bg-background px-5 py-14 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.18)] md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-wider text-muted-foreground">
            {cs.eyebrow}
          </p>
          <h2 className="font-display text-3xl leading-tight md:text-5xl">{cs.title}</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {cs.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={cs.links.live} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <ArrowSquareOut size={16} weight="bold" /> Live demo
            </a>
            <a href={cs.links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <GithubLogo size={16} weight="bold" /> Code
            </a>
            <a href={cs.links.writeup} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Article size={16} weight="bold" /> Full write-up
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="case-study-details"
            className="transition-spring mt-8 flex w-full items-center justify-between rounded-xl border border-border bg-card px-5 py-4 text-left font-medium hover:border-foreground active:scale-[0.99]"
          >
            <span>{open ? "Hide the case study" : "Read the case study"}</span>
            <CaretDown
              size={18}
              weight="bold"
              className={`flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </Reveal>

        <div
          id="case-study-details"
          className="grid transition-all duration-500 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
          aria-hidden={!open}
          inert={!open}
        >
          <div className="overflow-hidden">
        {/* Numbers */}
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {cs.stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 md:p-5">
              <p className="font-display text-2xl md:text-3xl">{s.value}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground md:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Pipeline */}
        <div className="mt-16">
          <h3 className="font-display text-2xl md:text-3xl">How it works</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Seven steps run along a fixed graph. Two of them wait for a person to approve.
          </p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cs.pipeline.map((step, i) => (
              <li
                key={step.name}
                className="relative rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-[12px] font-semibold text-background">
                    {i + 1}
                  </span>
                  <p className="font-medium">{step.name}</p>
                </div>
                <p className="mt-2 text-[14px] leading-snug text-muted-foreground">{step.note}</p>
                {step.gate && (
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[12px] font-medium text-accent">
                    <UserCheck size={14} weight="bold" /> You approve this
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Decisions */}
        <div className="mt-16">
          <h3 className="font-display text-2xl md:text-3xl">Decisions that shaped it</h3>
          <div className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
            {cs.decisions.map((d) => (
              <div key={d.title} className="rounded-xl border border-border p-5">
                <p className="font-medium">{d.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{d.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Findings */}
        <div className="mt-16">
          <h3 className="font-display text-2xl md:text-3xl">What live runs taught me</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Real runs against Groq, OpenAlex and Crossref turned up problems that tests with
            fake data could not.
          </p>
          <div className="mt-6 divide-y divide-border rounded-xl border border-border">
            {cs.findings.map((f) => (
              <div key={f.problem} className="grid gap-2 p-5 md:grid-cols-[1fr_1.4fr_1.4fr] md:gap-6">
                <p className="font-medium">{f.problem}</p>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  <span className="mr-1.5 text-[12px] font-semibold uppercase tracking-wider text-foreground/60">
                    Seen
                  </span>
                  {f.evidence}
                </p>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  <span className="mr-1.5 text-[12px] font-semibold uppercase tracking-wider text-accent">
                    Fix
                  </span>
                  {f.fix}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Not measured + lost in the middle */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-2xl bg-foreground p-6 text-background md:p-8">
            <h3 className="font-display text-2xl">What I did not measure</h3>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed opacity-90">
              {cs.notMeasured.map((n) => (
                <li key={n} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-background/70" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border p-6 md:p-8">
            <h3 className="font-display text-2xl">{cs.lostInTheMiddle.title}</h3>
            {cs.lostInTheMiddle.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <p className="mt-4 rounded-lg bg-card p-4 text-[15px] leading-relaxed">
              {cs.lostInTheMiddle.experiment}
            </p>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
