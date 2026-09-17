import { stats } from "@/data/portfolio";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export function About() {
  return (
    <section
      id="about"
      className="sticky top-0 z-[1] bg-background px-6 py-32 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.18)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="mb-12 font-display text-4xl md:text-5xl">About Me</h2>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal delay={0.1} className="space-y-6 text-muted-foreground">
            <p className="text-xl">
              I&apos;m <span className="font-medium text-foreground">Preksha Barjatya</span>, a
              B.Tech CSE (AI &amp; ML) student at Acropolis Institute of Technology and
              Research, Indore (affiliated to RGPV Bhopal), graduating in 2027.
            </p>
            <p className="text-lg">
              I build{" "}
              <span className="font-medium text-foreground">
                Retrieval-Augmented Generation (RAG)
              </span>{" "}
              applications, <span className="font-medium text-foreground">FastAPI</span>-based
              AI solutions, data pipelines, and SQL-driven analytics systems, turning
              language models into dependable, production-ready tools.
            </p>
            <p className="text-lg">
              Currently interning as an{" "}
              <span className="font-medium text-foreground">AI Engineer</span> at Santerra
              Hygiene Pvt. Ltd., building agentic automation workflows, after previously
              working as a Data Analyst Intern at Think AI Corporation.
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <RevealItem key={stat.label}>
                <div className="transition-spring paper-card rounded-lg p-6 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-accent active:scale-95">
                  <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="font-display text-2xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.sub}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
