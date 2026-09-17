"use client";

import type { Icon } from "@phosphor-icons/react";
import { CaretRight } from "@phosphor-icons/react";

type Props = {
  label: string;
  icon: Icon;
  onClick?: () => void;
  href?: string;
  expanded?: boolean;
};

export function ProjectLinkButton({ label, icon: ItemIcon, onClick, href, expanded }: Props) {
  const className =
    "transition-spring group flex items-center gap-2 rounded-full bg-foreground py-2 pl-2 pr-4 text-xs font-medium uppercase tracking-[0.1em] text-background hover:scale-105 active:scale-95";

  const content = (
    <>
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-background text-foreground">
        <ItemIcon size={13} weight="bold" />
      </span>
      {label}
      {onClick && (
        <CaretRight
          size={11}
          weight="bold"
          className="transition-spring"
          style={{ transform: expanded ? "rotate(90deg)" : "none" }}
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
