import { certification } from "@/data/portfolio";

export function ResumeCerts() {
  return (
    <section id="resume" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <span className="text-sm font-medium tracking-wider text-muted-foreground">
              06.
            </span>
            <h2 className="mt-2 mb-6 font-serif text-4xl md:text-5xl">
              Resume &amp;
              <br />
              <span className="italic">Certifications</span>
            </h2>
            <p className="mb-8 text-muted-foreground">
              Download my resume to learn more about my education, skills, and
              experience.
            </p>
            <a
              href="/Preksha_Barjatya_Resume.docx"
              download
              className="inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95"
              style={{ transitionTimingFunction: "var(--spring)" }}
            >
              ⬇ Download Resume
            </a>
          </div>

          <div>
            <p className="mb-6 text-sm uppercase tracking-wider text-muted-foreground">
              Training &amp; Certifications
            </p>
            <div className="rounded-lg bg-foreground p-6 text-background transition-transform hover:-translate-y-1 hover:translate-x-1">
              <div className="flex items-start gap-4">
                <span className="text-xl">🎖</span>
                <div className="flex-1">
                  <p className="font-medium">{certification.title}</p>
                  <p className="mt-1 text-sm opacity-70">{certification.org}</p>
                </div>
                <span className="whitespace-nowrap text-sm opacity-70">
                  {certification.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
