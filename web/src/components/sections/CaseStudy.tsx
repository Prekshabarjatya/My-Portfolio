"use client";

import { useState } from "react";
import { ArrowSquareOut, GithubLogo, Article, CaretDown } from "@phosphor-icons/react";
import { caseStudy } from "@/data/caseStudy";
import { Reveal } from "@/components/Reveal";

// Pills on the charcoal panel.
const pill =
  "transition-spring t-small inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium";
const pillGhost = `${pill} bg-white/10 hover:bg-on-ink hover:text-ink`;
const pillSolid = `${pill} bg-on-ink text-ink hover:bg-accent-on-ink`;

// Inner surface on the charcoal panel.
const tile = "r-inner bg-white/[0.06] p-5";

export function CaseStudy() {
  const cs = caseStudy;
  const [open, setOpen] = useState(false);

  return (
    <section id="case-study" className="section-y px-4 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="r-panel bg-ink p-6 text-on-ink md:p-12">
          <h2 className="t-display max-w-[20ch]">{cs.title}</h2>
          <p className="t-body mt-8 max-w-[58ch] text-on-ink-muted">{cs.intro}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            <a href={cs.links.live} target="_blank" rel="noopener noreferrer" className={pillSolid}>
              <ArrowSquareOut size={16} weight="bold" /> Live demo
            </a>
            <a href={cs.links.github} target="_blank" rel="noopener noreferrer" className={pillGhost}>
              <GithubLogo size={16} weight="bold" /> Code
            </a>
            <a href={cs.links.writeup} target="_blank" rel="noopener noreferrer" className={pillGhost}>
              <Article size={16} weight="bold" /> Full write-up
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="case-study-details"
              className={pillGhost}
            >
              {open ? "Hide the case study" : "Read the case study"}
              <CaretDown
                size={14}
                weight="bold"
                className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* The numbers stay visible: huge value, tiny caption. */}
          <dl className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {cs.stats.map((s) => (
              <div key={s.label} className={`${tile} flex min-h-44 flex-col justify-between`}>
                <dd className="t-display">{s.value}</dd>
                <dt className="t-small mt-6 text-on-ink-muted">{s.label}</dt>
              </div>
            ))}
          </dl>

          <div
            id="case-study-details"
            className="grid transition-all duration-500 ease-out"
            style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
            aria-hidden={!open}
            inert={!open}
          >
            <div className="overflow-hidden">
              {/* Pipeline */}
              <div className="mt-16">
                <h3 className="t-title">How it works</h3>
                <p className="t-body mt-2 max-w-xl text-on-ink-muted">
                  Seven steps run along a fixed graph. Two of them wait for a person to approve.
                </p>
                <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {cs.pipeline.map((step, i) => (
                    <li key={step.name} className={`${tile} flex flex-col justify-between gap-6`}>
                      <div>
                        <span className="t-small text-on-ink-muted">
                          ({String(i + 1).padStart(2, "0")})
                        </span>
                        <p className="t-body mt-2 font-medium">{step.name}</p>
                        <p className="t-small mt-1 text-on-ink-muted">{step.note}</p>
                      </div>
                      {step.gate && (
                        <span className="chip self-start bg-accent-on-ink text-ink">
                          You approve this
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Decisions */}
              <div className="mt-16">
                <h3 className="t-title">Decisions that shaped it</h3>
                <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {cs.decisions.map((d) => (
                    <div key={d.title} className={tile}>
                      <p className="t-body font-medium">{d.title}</p>
                      <p className="t-small mt-2 text-on-ink-muted">{d.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Findings */}
              <div className="mt-16">
                <h3 className="t-title">What live runs taught me</h3>
                <p className="t-body mt-2 max-w-xl text-on-ink-muted">
                  Real runs against Groq, OpenAlex and Crossref turned up problems that tests
                  with fake data could not.
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {cs.findings.map((f) => (
                    <div key={f.problem} className={tile}>
                      <p className="t-body font-medium">{f.problem}</p>
                      <p className="t-small mt-3 text-on-ink-muted">
                        <span className="text-on-ink">Seen:</span> {f.evidence}
                      </p>
                      <p className="t-small mt-2 text-on-ink-muted">
                        <span className="text-accent-on-ink">Fix:</span> {f.fix}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Limits */}
              <div className="mt-16 grid gap-3 lg:grid-cols-2">
                <div className={tile}>
                  <h3 className="t-title">What I did not measure</h3>
                  <ul className="t-small mt-4 space-y-3 text-on-ink-muted">
                    {cs.notMeasured.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
                <div className={tile}>
                  <h3 className="t-title">{cs.lostInTheMiddle.title}</h3>
                  <div className="t-small mt-4 space-y-3 text-on-ink-muted">
                    {cs.lostInTheMiddle.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    <p className="text-on-ink">{cs.lostInTheMiddle.experiment}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
