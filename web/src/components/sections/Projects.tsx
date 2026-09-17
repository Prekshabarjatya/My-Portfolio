"use client";

import { useState } from "react";
import Image from "next/image";
import { GithubLogo, ArrowSquareOut, Wrench } from "@phosphor-icons/react";
import { projects } from "@/data/portfolio";
import { ProjectLinkButton } from "./ProjectLinkButton";
import { ProjectTechStack } from "./ProjectTechStack";
import { Reveal } from "@/components/Reveal";

function ProjectMeta({
  project,
  isTechStackOpen,
  onToggleTechStack,
}: {
  project: (typeof projects)[number];
  isTechStackOpen: boolean;
  onToggleTechStack: () => void;
}) {
  return (
    <>
      <h3 className="mb-4 font-display text-3xl md:text-4xl">{project.title}</h3>
      <p className="mb-6 text-muted-foreground">{project.description}</p>
      <div className="mb-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-3 py-1 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <ProjectLinkButton label="GitHub" icon={GithubLogo} href={project.github} />
        {project.liveUrl && (
          <ProjectLinkButton label="Live Site" icon={ArrowSquareOut} href={project.liveUrl} />
        )}
        <ProjectLinkButton
          label="Tech Stack"
          icon={Wrench}
          expanded={isTechStackOpen}
          onClick={onToggleTechStack}
        />
      </div>
    </>
  );
}

export function Projects() {
  const [openTechStack, setOpenTechStack] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="relative -mt-8 rounded-t-[2.5rem] bg-background px-6 py-20 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.18)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="mb-16 font-display text-4xl md:text-5xl">Selected Work</h2>
        </Reveal>

        <div className="flex flex-col gap-24">
          {projects.map((project, i) => {
            const isTechStackOpen = openTechStack === project.id;
            const toggle = () =>
              setOpenTechStack(isTechStackOpen ? null : project.id);

            return (
              <Reveal key={project.id} id={project.id} className="rounded-2xl p-2">
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <ProjectMeta
                      project={project}
                      isTechStackOpen={isTechStackOpen}
                      onToggleTechStack={toggle}
                    />
                  </div>
                  <div className="transition-spring corner-brackets aspect-[4/3] overflow-hidden rounded-lg bg-card hover:scale-[0.98]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                </div>

                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isTechStackOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="mt-8">
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
