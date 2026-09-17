import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { experience } from "@/data/portfolio";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="sticky top-0 z-[3] bg-card px-6 py-32 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.18)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="mb-16 font-display text-4xl md:text-5xl">Experience</h2>
        </Reveal>

        <RevealGroup className="flex flex-col gap-8">
          {experience.map((item) => (
            <RevealItem key={item.role}>
              <div className="transition-spring-soft dotted-grid rounded-lg border border-border bg-background p-8 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl">
                <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-2xl">{item.role}</h3>
                    <p className="mt-1 text-muted-foreground">{item.company}</p>
                  </div>
                  <span className="whitespace-nowrap font-mono text-sm text-muted-foreground">
                    {item.date}
                  </span>
                </div>
                <ul className="flex flex-col gap-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle
                        size={18}
                        weight="fill"
                        className="mt-0.5 flex-shrink-0 text-accent"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
