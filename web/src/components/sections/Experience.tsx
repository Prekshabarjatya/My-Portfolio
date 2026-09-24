import { experience } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { GlyphChip } from "@/components/GlyphChip";

const TONES = ["bg-sage", "bg-lilac"];

export function Experience() {
  return (
    <section id="experience" className="section-y px-4 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="t-display mb-12 md:mb-16">
            Experience
            <GlyphChip glyph="arrow" tint="lilac" />
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3">
          {experience.map((item, i) => (
            <Reveal
              key={item.role}
              className={`r-panel grid gap-10 p-6 md:p-10 lg:grid-cols-12 ${TONES[i % TONES.length]}`}
            >
              <div className="flex flex-col justify-between gap-10 lg:col-span-5">
                <span className="chip self-start">({item.date})</span>
                <div>
                  <p className="t-title">{item.role}</p>
                  <p className="t-body mt-2 text-muted-foreground">{item.company}</p>
                </div>
              </div>

              <ol className="space-y-4 lg:col-span-7">
                {item.bullets.map((bullet, n) => (
                  <li
                    key={bullet}
                    className="r-inner grid gap-2 bg-background/60 p-5 sm:grid-cols-[3rem_1fr] sm:gap-4"
                  >
                    <span className="t-small text-muted-foreground">
                      ({String(n + 1).padStart(2, "0")})
                    </span>
                    <p className="t-body">{bullet}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
