import { Asterisk, Sparkle, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const GLYPHS = { asterisk: Asterisk, sparkle: Sparkle, arrow: ArrowUpRight };

// A round glyph sitting inline in a headline, sized to the surrounding type.
// This is the page's one recurring mark (the uwwa idea): same shape, same
// icon family, only the tint changes.
export function GlyphChip({
  glyph = "asterisk",
  tint = "blush",
}: {
  glyph?: keyof typeof GLYPHS;
  tint?: "blush" | "sage" | "lilac" | "ink";
}) {
  const Glyph = GLYPHS[glyph];
  const tints = {
    blush: "bg-blush text-accent",
    sage: "bg-sage text-foreground",
    lilac: "bg-lilac text-foreground",
    ink: "bg-ink text-accent-on-ink",
  };
  return (
    <span
      aria-hidden="true"
      className={`mx-[0.12em] inline-flex h-[0.78em] w-[0.78em] translate-y-[0.06em] items-center justify-center rounded-full align-baseline ${tints[tint]}`}
    >
      <Glyph size="0.46em" weight="bold" className={glyph === "asterisk" ? "mark-turn" : ""} />
    </span>
  );
}
