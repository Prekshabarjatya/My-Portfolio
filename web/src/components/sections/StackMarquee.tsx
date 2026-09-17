const ITEMS = [
  "Python",
  "FastAPI",
  "LangChain",
  "LangGraph",
  "RAG",
  "Groq API",
  "Docker",
  "Kubernetes",
  "AWS",
  "Pandas",
];

// The one marquee on the page (Section 9.F): shows the breadth of her stack
// at a glance as a bold banner strip right after the hero, before the reader
// scrolls into the detailed sections below.
export function StackMarquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="flex h-24 items-center overflow-hidden border-y border-border bg-foreground">
      <div className="marquee-track flex w-max items-center gap-8">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-8">
            {track.map((item, i) => (
              <span
                key={`${copy}-${item}-${i}`}
                className="font-display text-xl uppercase tracking-tight text-background/70 md:text-3xl"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
