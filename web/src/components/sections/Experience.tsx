import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="text-sm font-medium tracking-wider text-muted-foreground">
            03.
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-6xl">Experience</h2>
        </div>

        <div className="flex flex-col gap-8">
          {experience.map((item) => (
            <div
              key={item.role}
              className="rounded-lg border border-border bg-card p-8 transition-all hover:-translate-y-1.5 hover:border-accent hover:shadow-xl"
              style={{ transitionTimingFunction: "var(--spring-soft)" }}
            >
              <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-serif text-2xl">{item.role}</h3>
                  <p className="mt-1 text-muted-foreground">{item.company}</p>
                </div>
                <span className="whitespace-nowrap text-sm text-muted-foreground">
                  {item.date}
                </span>
              </div>
              <ul className="flex flex-col gap-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="relative pl-5 text-muted-foreground">
                    <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
