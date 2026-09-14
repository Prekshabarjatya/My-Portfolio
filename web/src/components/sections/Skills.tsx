import { skillCategories } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="bg-white px-6 py-32 dark:bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="text-sm font-medium tracking-wider text-muted-foreground">
            02.
          </span>
          <h2 className="mt-2 font-serif text-4xl md:text-6xl">Skills</h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            The core skills behind an AI engineer — building up from
            programming fundamentals to the AI/ML work that defines the role.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-x-12">
          {skillCategories.map((category, i) => {
            const isCore = "core" in category && category.core;
            return (
              <div
                key={category.id}
                id={category.id}
                className={`rounded-xl p-5 transition-colors ${
                  isCore
                    ? "border-2 border-accent bg-accent/5"
                    : "border border-transparent"
                }`}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground">
                    {category.title}
                  </p>
                  {isCore && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      Core
                    </span>
                  )}
                </div>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
