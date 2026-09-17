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
// at a glance as a transition strip right after the hero, before the reader
// scrolls into the detailed sections below.
export function StackMarquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-y border-border bg-foreground py-3">
      <div className="marquee-track flex w-max gap-10">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-10">
            {track.map((item, i) => (
              <span
                key={`${copy}-${item}-${i}`}
                className="font-mono text-sm uppercase tracking-widest text-background/70"
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
