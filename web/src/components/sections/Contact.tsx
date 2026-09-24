import { ArrowUpRight, EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { contact } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { GlyphChip } from "@/components/GlyphChip";

// The accent gets one full panel on the page: the ask.
const pill =
  "transition-spring t-small inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium";

export function Contact() {
  return (
    <section id="contact" className="px-4 pb-6 pt-4 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="r-panel flex min-h-[80dvh] flex-col justify-between gap-16 bg-accent p-6 text-accent-foreground md:p-12">
          <h2 className="t-display max-w-[14ch]">
            Let&apos;s work
            <GlyphChip glyph="arrow" tint="ink" />
            together
          </h2>

          <div className="grid gap-10 lg:grid-cols-12">
            <p className="t-body max-w-[42ch] opacity-90 lg:col-span-5">
              I&apos;m actively looking for opportunities to grow as an AI engineer. If you
              have a role or project in mind, let&apos;s connect.
            </p>

            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${contact.email}`}
                  className={`${pill} min-w-0 break-all bg-background text-foreground hover:bg-ink hover:text-on-ink`}
                >
                  <EnvelopeSimple size={16} weight="bold" className="shrink-0" />
                  {contact.email}
                </a>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pill} bg-accent-foreground/15 hover:bg-background hover:text-foreground`}
                >
                  <GithubLogo size={16} weight="bold" /> GitHub
                  <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pill} bg-accent-foreground/15 hover:bg-background hover:text-foreground`}
                >
                  <LinkedinLogo size={16} weight="bold" /> LinkedIn
                  <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                </a>
              </div>

              <p className="t-small mt-8 opacity-90">
                {contact.phone} ({contact.address})
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
