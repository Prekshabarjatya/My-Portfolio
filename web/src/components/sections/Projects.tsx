import Image from "next/image";
import { projects } from "@/data/portfolio";
import { contact } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="text-sm font-medium tracking-wider text-muted-foreground">
            04.
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-6xl">Selected Work</h2>
        </div>

        <div className="flex flex-col gap-24">
          {projects.map((project, i) => (
            <div
              key={project.id}
              id={project.id}
              className={`grid items-center gap-12 rounded-2xl p-2 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {project.number}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mb-4 font-serif text-3xl md:text-4xl">
                  {project.title}
                </h3>
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
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-transform hover:translate-x-1"
                  style={{ transitionTimingFunction: "var(--spring)" }}
                >
                  View Project →
                </a>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-card transition-transform hover:scale-[0.98]">
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
          ))}
        </div>
      </div>
    </section>
  );
}
