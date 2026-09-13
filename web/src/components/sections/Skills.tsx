import { skillCategories } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="bg-card px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="text-sm font-medium tracking-wider text-muted-foreground">
            02.
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-6xl">Skills</h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-x-12">
          {skillCategories.map((category) => (
            <div key={category.id} id={category.id} className="rounded-lg">
              <p className="mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                {category.title}
              </p>
              <div className="flex flex-wrap gap-3">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm transition-transform hover:-translate-y-1 hover:scale-105 hover:border-foreground hover:bg-foreground hover:text-background active:scale-95"
                    style={{ transitionTimingFunction: "var(--spring)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
