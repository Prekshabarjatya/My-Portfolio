import { stats } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { GlyphChip } from "@/components/GlyphChip";

// Four tiles for four stats: a wide one, two singles, a wide one.
const TILE_STYLES = [
  "col-span-2 bg-blush",
  "bg-sage",
  "bg-lilac",
  "col-span-2 bg-ink text-on-ink",
];

export function About() {
  return (
    <section id="about" className="section-y px-4 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="t-display max-w-[22ch]">
            I turn language models into
            <GlyphChip glyph="asterisk" tint="blush" />
            dependable,
            <GlyphChip glyph="sparkle" tint="sage" />
            production-ready tools.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          <Reveal delay={0.1} className="t-body space-y-6 text-muted-foreground lg:col-span-5 lg:pr-10">
            <p>
              I&apos;m <span className="font-medium text-foreground">Preksha Barjatya</span>, a
              B.Tech CSE (AI &amp; ML) student at Acropolis Institute of Technology and
              Research, Indore (affiliated to RGPV Bhopal), graduating in 2027.
            </p>
            <p>
              I build{" "}
              <span className="font-medium text-foreground">
                Retrieval-Augmented Generation (RAG)
              </span>{" "}
              applications, <span className="font-medium text-foreground">FastAPI</span>-based
              AI solutions, data pipelines, and SQL-driven analytics systems, turning
              language models into dependable, production-ready tools.
            </p>
            <p>
              Currently interning as an{" "}
              <span className="font-medium text-foreground">AI Engineer</span> at Santerra
              Hygiene Pvt. Ltd., building agentic automation workflows, after previously
              working as a Data Analyst Intern at Think AI Corporation.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="grid grid-cols-2 gap-3 lg:col-span-7">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`r-panel flex min-h-40 flex-col justify-between p-6 md:p-8 ${TILE_STYLES[i]}`}
              >
                <p
                  className={`t-small ${
                    i === 3 ? "text-on-ink-muted" : "text-muted-foreground"
                  }`}
                >
                  {stat.label}
                </p>
                <p className="t-title mt-8">
                  {stat.value}{" "}
                  <span
                    className={`t-small font-normal ${
                      i === 3 ? "text-on-ink-muted" : "text-muted-foreground"
                    }`}
                  >
                    ({stat.sub})
                  </span>
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
