import { stats } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="text-sm font-medium tracking-wider text-muted-foreground">
            01.
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-6xl">About Me</h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-6 text-muted-foreground">
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
              AI solutions, data pipelines, and SQL-driven analytics systems — turning
              language models into dependable, production-ready tools.
            </p>
            <p className="text-lg">
              Currently interning as an{" "}
              <span className="font-medium text-foreground">AI Engineer</span> at Santerra
              Hygiene Pvt. Ltd., building agentic automation workflows, after previously
              working as a Data Analyst Intern at Think AI Corporation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-card p-6 transition-transform hover:-translate-y-1.5 hover:scale-[1.02] hover:border-accent active:scale-95"
                style={{ transitionTimingFunction: "var(--spring)" }}
              >
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <p className="font-serif text-2xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
