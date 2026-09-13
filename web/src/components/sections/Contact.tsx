import { contact } from "@/data/portfolio";

export function Contact() {
  return (
    <section id="contact" className="bg-card px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="text-sm font-medium tracking-wider text-muted-foreground">
            05.
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-6xl lg:text-7xl">
            Let&apos;s work
            <br />
            <span className="italic">together</span>
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-8 text-lg text-muted-foreground">
              I&apos;m actively looking for opportunities to grow as an AI engineer. If
              you have a role or project in mind, let&apos;s connect!
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-3 font-serif text-xl transition-transform hover:translate-x-2 md:text-2xl"
              style={{ transitionTimingFunction: "var(--spring)" }}
            >
              {contact.email} →
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-lg transition-transform hover:-translate-y-1 hover:scale-110 hover:rotate-[-6deg] hover:bg-foreground hover:text-background active:scale-90"
                style={{ transitionTimingFunction: "var(--spring)" }}
                aria-label="Email"
              >
                ✉
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-lg transition-transform hover:-translate-y-1 hover:scale-110 hover:rotate-[-6deg] hover:bg-foreground hover:text-background active:scale-90"
                style={{ transitionTimingFunction: "var(--spring)" }}
                aria-label="GitHub"
              >
                GH
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-lg transition-transform hover:-translate-y-1 hover:scale-110 hover:rotate-[-6deg] hover:bg-foreground hover:text-background active:scale-90"
                style={{ transitionTimingFunction: "var(--spring)" }}
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
