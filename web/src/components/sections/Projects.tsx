"use client";

import { useState } from "react";
import Image from "next/image";
import { GithubLogo, ArrowSquareOut, Wrench } from "@phosphor-icons/react";
import { projects } from "@/data/portfolio";
import { ProjectLinkButton } from "./ProjectLinkButton";
import { ProjectTechStack } from "./ProjectTechStack";
import { Reveal } from "@/components/Reveal";
import { GlyphChip } from "@/components/GlyphChip";

const TONES = ["bg-blush", "bg-sage", "bg-lilac"];

type Project = (typeof projects)[number];

function Shots({ project, tall }: { project: Project; tall?: boolean }) {
  const images = [project.image, "image2" in project ? project.image2 : ""].filter(
    Boolean
  ) as string[];
  return (
    <div className={`grid gap-3 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
      {images.map((src, n) => (
        <Image
          key={src}
          src={src}
          alt={`${project.title} screenshot ${n + 1}`}
          width={1200}
          height={900}
          className={`r-inner w-full bg-background/60 object-cover object-top ${
            images.length > 1 ? "aspect-[3/4]" : tall ? "aspect-[4/5]" : "aspect-[4/3]"
          }`}
          unoptimized
        />
      ))}
    </div>
  );
}

function Details({
  project,
  isOpen,
  onToggle,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        <p className="t-body mt-6 max-w-[60ch] text-muted-foreground">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.liveUrl && (
          <ProjectLinkButton solid label="Live Site" icon={ArrowSquareOut} href={project.liveUrl} />
        )}
        <ProjectLinkButton label="GitHub" icon={GithubLogo} href={project.github} />
        <ProjectLinkButton label="Tech Stack" icon={Wrench} expanded={isOpen} onClick={onToggle} />
      </div>
    </div>
  );
}

export function Projects() {
  const [openTechStack, setOpenTechStack] = useState<string | null>(null);

  return (
    <section id="projects" className="section-y px-4 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="t-display mb-12 md:mb-16">
            Selected
            <GlyphChip glyph="sparkle" tint="blush" />
            Work
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3">
          {projects.map((project, i) => {
            const isOpen = openTechStack === project.id;
            const toggle = () => setOpenTechStack(isOpen ? null : project.id);
            const layout = i % 3;

            return (
              <Reveal
                key={project.id}
                id={project.id}
                className={`r-panel p-5 md:p-8 ${TONES[i % TONES.length]}`}
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="t-display max-w-[14ch]">{project.title}</h3>
                  <span className="chip shrink-0">({String(i + 1).padStart(2, "0")})</span>
                </div>

                {/* Three compositions: image right, images below, image left. */}
                {layout === 0 && (
                  <div className="mt-10 grid gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <Details project={project} isOpen={isOpen} onToggle={toggle} />
                    </div>
                    <div className="lg:col-span-7">
                      <Shots project={project} />
                    </div>
                  </div>
                )}
                {layout === 1 && (
                  <div className="mt-10 grid gap-6">
                    <div className="max-w-3xl">
                      <Details project={project} isOpen={isOpen} onToggle={toggle} />
                    </div>
                    <Shots project={project} />
                  </div>
                )}
                {layout === 2 && (
                  <div className="mt-10 grid gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-7 lg:order-1">
                      <Shots project={project} />
                    </div>
                    <div className="lg:order-2 lg:col-span-5">
                      <Details project={project} isOpen={isOpen} onToggle={toggle} />
                    </div>
                  </div>
                )}

                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="pt-8">
                      <ProjectTechStack techStack={project.techStack} />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
