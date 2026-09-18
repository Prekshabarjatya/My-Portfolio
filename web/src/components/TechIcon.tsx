// Real brand icons for actual named tools/libraries.
const BRAND_ICON_SRC: Record<string, string> = {
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  FastAPI: "https://cdn.simpleicons.org/fastapi/009688",
  LangChain: "https://cdn.simpleicons.org/langchain/1C3C3C",
  Pydantic: "https://cdn.simpleicons.org/pydantic/E92063",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  Pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
};

// Everything else here is a concept, not a single branded product, so it
// gets a generic glyph instead of a fabricated logo.
function ConceptGlyph({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "LangGraph":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <line x1="6" y1="6" x2="12" y2="18" />
          <line x1="18" y1="6" x2="12" y2="18" />
          <line x1="6" y1="6" x2="18" y2="6" />
        </svg>
      );
    case "Agentic AI":
      return (
        <svg {...common}>
          <rect x="5" y="9" width="14" height="10" rx="2" />
          <circle cx="9" cy="14" r="1" fill="currentColor" />
          <circle cx="15" cy="14" r="1" fill="currentColor" />
          <line x1="12" y1="9" x2="12" y2="5" />
          <circle cx="12" cy="4" r="1" />
        </svg>
      );
    case "Tool Calling":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.1-3.1a6 6 0 0 1-7.6 7.6l-6.9 6.9a2 2 0 0 1-2.8-2.8l6.9-6.9a6 6 0 0 1 7.6-7.6l-3.3 3.3Z" />
        </svg>
      );
    case "RAG":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "LLM":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 1 1 16.1-3.8Z" />
        </svg>
      );
    case "Automation":
      return (
        <svg {...common}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
        </svg>
      );
    case "Vector Search":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case "Groq API":
      return (
        <svg {...common}>
          <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

export function TechIcon({ name }: { name: string }) {
  const src = BRAND_ICON_SRC[name];
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" className="h-full w-full object-contain" />;
  }
  return <ConceptGlyph name={name} />;
}
