import { Medal } from "@phosphor-icons/react/dist/ssr";
import { certifications } from "@/data/portfolio";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

// Real brand mark for a recognizable issuer; anything else falls back to a
// generic medal glyph rather than a fabricated logo.
const ORG_LOGO: Record<string, string> = {
  Oracle: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
};

export function ResumeCerts() {
  return (
    <section
      id="certifications"
      className="relative -mt-8 rounded-t-[2.5rem] bg-background px-6 py-20 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.18)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 font-display text-4xl md:text-5xl">
              <span className="italic pb-1 inline-block">Certifications</span>
            </h2>
          </div>

          <div>
            <p className="mb-6 text-sm uppercase tracking-wider text-muted-foreground">
              Training &amp; Certifications
            </p>
            <RevealGroup className="flex flex-col gap-6">
              {certifications.map((cert) => {
                const logo = ORG_LOGO[cert.org];
                return (
                  <RevealItem key={cert.title}>
                    <div className="transition-spring rounded-lg bg-foreground p-6 text-background hover:-translate-y-1 hover:translate-x-1">
                      <div className="flex items-start gap-4">
                        {logo ? (
                          <span className="mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-background">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={logo} alt="" className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <Medal size={22} weight="bold" className="mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{cert.title}</p>
                          <p className="mt-1 text-base opacity-70">{cert.org}</p>
                          {"credentialId" in cert && (
                            <p className="mt-2 font-mono text-xs opacity-50">
                              Issued {cert.issued} · Expires {cert.expires} · ID {cert.credentialId}
                            </p>
                          )}
                        </div>
                        <span className="whitespace-nowrap text-base opacity-70">
                          {cert.status}
                        </span>
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
