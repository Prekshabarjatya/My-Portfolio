import { EnvelopeSimple, GithubLogo, LinkedinLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { contact } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="sticky top-0 z-[6] bg-card px-6 py-20 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.18)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="mb-16 font-display text-4xl md:text-5xl">
            Let&apos;s work
            <br />
            <span className="italic pb-1 inline-block">together</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-8 text-lg text-muted-foreground">
              I&apos;m actively looking for opportunities to grow as an AI engineer. If
              you have a role or project in mind, let&apos;s connect.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="transition-spring inline-flex items-center gap-3 font-display text-xl hover:translate-x-2 md:text-2xl"
            >
              {contact.email}
              <ArrowRight size={20} weight="bold" />
            </a>
            <p className="mt-4 text-muted-foreground">{contact.phone}</p>
            <p className="text-muted-foreground">{contact.address}</p>
          </div>

          <div className="flex flex-col justify-end">
            <p className="mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Connect
            </p>
            <div className="flex gap-4">
              <a
                href={`mailto:${contact.email}`}
                className="transition-spring flex h-12 w-12 items-center justify-center rounded-full border border-border hover:-translate-y-1 hover:scale-110 hover:rotate-[-6deg] hover:bg-foreground hover:text-background active:scale-90"
                aria-label="Email"
              >
                <EnvelopeSimple size={20} weight="bold" />
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-spring flex h-12 w-12 items-center justify-center rounded-full border border-border hover:-translate-y-1 hover:scale-110 hover:rotate-[-6deg] hover:bg-foreground hover:text-background active:scale-90"
                aria-label="GitHub"
              >
                <GithubLogo size={20} weight="bold" />
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-spring flex h-12 w-12 items-center justify-center rounded-full border border-border hover:-translate-y-1 hover:scale-110 hover:rotate-[-6deg] hover:bg-foreground hover:text-background active:scale-90"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={20} weight="bold" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
