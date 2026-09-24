import { Asterisk } from "@phosphor-icons/react/dist/ssr";

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

// The one marquee on the page. Small type, glyph separators, so it stays
// quiet under the giant name.
export function StackMarquee() {
  return (
    <div
      className="t-small mx-4 flex h-14 items-center overflow-hidden rounded-full border border-border md:mx-6"
      aria-label="Technologies used"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {[...ITEMS, ...ITEMS].map((item, i) => (
              <span key={`${copy}-${item}-${i}`} className="flex items-center">
                <span className="px-5 font-medium">{item}</span>
                <Asterisk size={14} weight="bold" className="text-accent" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
