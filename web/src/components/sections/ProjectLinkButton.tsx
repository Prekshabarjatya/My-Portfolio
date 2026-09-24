"use client";

import type { Icon } from "@phosphor-icons/react";
import { CaretRight } from "@phosphor-icons/react";

type Props = {
  label: string;
  icon: Icon;
  onClick?: () => void;
  href?: string;
  expanded?: boolean;
  /** The one primary action in a group is filled. */
  solid?: boolean;
};

// Interactive controls are always full pills.
export function ProjectLinkButton({
  label,
  icon: ItemIcon,
  onClick,
  href,
  expanded,
  solid,
}: Props) {
  const className = `transition-spring t-small inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium ${
    solid
      ? "bg-foreground text-background hover:bg-accent hover:text-accent-foreground"
      : "bg-background/70 hover:bg-foreground hover:text-background"
  }`;

  const content = (
    <>
      <ItemIcon size={16} weight="bold" />
      {label}
      {onClick && (
        <CaretRight
          size={12}
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
    <button type="button" onClick={onClick} aria-expanded={expanded} className={className}>
      {content}
    </button>
  );
}
