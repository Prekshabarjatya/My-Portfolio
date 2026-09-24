import { skillCategories } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";

// Six categories, six panels, no empty cells. Widths follow content:
// 4+8 / 4+8 / 6+6. AI/ML is the core category, so it gets the dark panel.
const PANEL: Record<string, { span: string; tone: string }> = {
  "skill-programming": { span: "md:col-span-4", tone: "bg-sage" },
  "skill-python-concepts": { span: "md:col-span-8", tone: "bg-blush" },
  "skill-backend": { span: "md:col-span-4", tone: "bg-lilac" },
  "skill-ai-ml": { span: "md:col-span-8", tone: "bg-ink text-on-ink" },
  "skill-cloud-devops": { span: "md:col-span-6", tone: "bg-blush" },
  "skill-data-bi": { span: "md:col-span-6", tone: "bg-sage" },
};

export function Skills() {
  return (
    <section id="skills" className="section-y px-4 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
          <h2 className="t-display md:col-span-7">Skills</h2>
          <p className="t-body text-muted-foreground md:col-span-5 md:self-end">
            The core skills behind an AI engineer, building up from programming
            fundamentals to the AI/ML work that defines the role.
          </p>
        </Reveal>

        <div className="grid gap-3 md:grid-cols-12">
          {skillCategories.map((category, i) => {
            const isCore = "core" in category && category.core;
            const { span, tone } = PANEL[category.id] ?? {
              span: "md:col-span-6",
              tone: "bg-sage",
            };
            return (
              <Reveal
                key={category.id}
                id={category.id}
                delay={(i % 2) * 0.08}
                className={`r-panel flex flex-col justify-between gap-10 p-6 md:p-8 ${span} ${tone}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="t-title">{category.title}</p>
                  <span
                    className={`chip shrink-0 ${
                      isCore ? "bg-accent-on-ink text-ink" : ""
                    }`}
                  >
                    {isCore ? "Core" : `(${category.items.length})`}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className={`transition-spring t-small cursor-default rounded-full px-4 py-2 ${
                        isCore
                          ? "bg-white/10 hover:bg-on-ink hover:text-ink"
                          : "bg-background/70 hover:bg-foreground hover:text-background"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
