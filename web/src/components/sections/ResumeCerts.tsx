import { certifications } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { GlyphChip } from "@/components/GlyphChip";

// Real brand mark for a recognizable issuer. Anything else shows no logo
// rather than a fabricated one.
const ORG_LOGO: Record<string, string> = {
  Oracle: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
};

// Two certifications, two cells: a wide one and a narrow one.
const CELL = ["lg:col-span-7 bg-blush", "lg:col-span-5 bg-sage"];

export function ResumeCerts() {
  return (
    <section id="certifications" className="section-y px-4 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="t-display mb-12 md:mb-16">
            Certifications
            <GlyphChip glyph="asterisk" tint="sage" />
          </h2>
        </Reveal>

        <div className="grid gap-3 lg:grid-cols-12">
          {certifications.map((cert, i) => {
            const logo = ORG_LOGO[cert.org];
            return (
              <Reveal
                key={cert.title}
                delay={i * 0.08}
                className={`r-panel flex min-h-72 flex-col justify-between gap-12 p-6 md:p-8 ${CELL[i % CELL.length]}`}
              >
                <div className="flex items-start justify-between gap-4">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logo} alt={cert.org} className="h-6 w-28 object-contain object-left" />
                  ) : (
                    <span className="t-small max-w-[28ch] text-muted-foreground">{cert.org}</span>
                  )}
                  <span className="chip shrink-0">({cert.status})</span>
                </div>

                <div>
                  <p className="t-title max-w-[22ch]">{cert.title}</p>
                  {"credentialId" in cert && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      <li className="chip">Issued {cert.issued}</li>
                      <li className="chip">Expires {cert.expires}</li>
                      <li className="chip">ID {cert.credentialId}</li>
                    </ul>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
