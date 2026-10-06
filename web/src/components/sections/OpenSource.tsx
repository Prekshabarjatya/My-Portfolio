"use client";

import Image from "next/image";
import { GithubLogo, ArrowSquareOut, Article } from "@phosphor-icons/react";
import { openSource } from "@/data/portfolio";
import { ProjectLinkButton } from "./ProjectLinkButton";
import { Reveal } from "@/components/Reveal";
import { GlyphChip } from "@/components/GlyphChip";

const ICONS = { live: ArrowSquareOut, github: GithubLogo, article: Article };

// Hackathon and open-source builds: the event, what shipped, and the write-up.
export function OpenSource() {
  return (
    <section id="open-source" className="section-y px-4 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="t-display mb-12 md:mb-16">
            Hackathons
            <GlyphChip glyph="arrow" tint="sage" />
            &amp; Open Source
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3">
          {openSource.map((item) => (
            <Reveal key={item.id} id={item.id} className="r-panel bg-sage p-5 md:p-8">
              <span className="chip">{item.event}</span>
              <h3 className="t-display mt-6">
                {item.title} <span className="text-muted-foreground">{item.titleNative}</span>
              </h3>

              <div className="mt-10 grid gap-6 lg:grid-cols-12">
                <div className="flex flex-col justify-between gap-8 lg:col-span-5">
                  <div>
                    <p className="t-body max-w-[60ch] font-medium">{item.tagline}</p>
                    <p className="t-body mt-4 max-w-[60ch] text-muted-foreground">{item.description}</p>
                    <ul className="t-body mt-6 max-w-[60ch] list-disc space-y-2 pl-5 text-muted-foreground">
                      {item.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li key={tag} className="chip">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.links.map((link, n) => (
                      <ProjectLinkButton
                        key={link.href}
                        solid={n === 0}
                        label={link.label}
                        icon={ICONS[link.kind]}
                        href={link.href}
                      />
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <Image
                    src={item.image}
                    alt={`${item.title} banner: the app over a photo of Kanch Mandir, Indore`}
                    width={1600}
                    height={836}
                    className="r-inner aspect-[1200/627] w-full bg-background/60 object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
