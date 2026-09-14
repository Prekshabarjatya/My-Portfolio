"use client";

type Props = {
  label: string;
  onClick?: () => void;
  href?: string;
  expanded?: boolean;
};

export function ProjectLinkButton({ label, onClick, href, expanded }: Props) {
  const className =
    "group flex items-center justify-between gap-3 rounded-md border border-accent px-4 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-accent transition-all duration-300 hover:bg-accent hover:text-white active:scale-95";
  const style = {
    transitionTimingFunction: "var(--spring)",
  };

  const chevron = (
    <span
      className="transition-transform duration-300 group-hover:translate-x-1"
      style={{ transform: expanded ? "rotate(90deg)" : "none" }}
    >
      ›
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {label}
        {chevron}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} style={style}>
      {label}
      {chevron}
    </button>
  );
}
