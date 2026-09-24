import Image from "next/image";
import { ArrowRight, Asterisk } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { HoverNameLetters } from "./HoverNameLetters";

// One dominant thing: the name, overlapping the portrait panel. Everything
// else is small so the scale contrast does the work.
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col px-4 pb-4 pt-20 md:px-6"
    >
      <div className="mx-auto grid w-full max-w-[1400px] content-start md:flex-1 gap-4 md:grid-cols-12 md:content-normal">
        <Reveal
          eager
          className="flex flex-col justify-between gap-5 md:col-span-4 md:gap-10 md:pb-28"
        >
          <span className="chip self-start bg-card">
            <Asterisk
              size={16}
              weight="bold"
              className="mark-turn text-accent"
              aria-hidden="true"
            />
            Open to work
          </span>

          <div>
            <p className="t-body max-w-sm text-muted-foreground">
              AI engineer building RAG applications and LangGraph agents. Currently
              interning at Santerra Hygiene.
            </p>
            <a
              href="#projects"
              className="transition-spring t-small mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 font-medium text-background hover:bg-accent hover:text-accent-foreground"
            >
              See my work
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </Reveal>

        <Reveal eager delay={0.1} className="md:col-span-8">
          <div className="r-panel relative h-[34dvh] min-h-[240px] overflow-hidden bg-blush md:h-full">
            <Image
              src="/preksha-illustration.jpg"
              alt="Illustrated portrait of Preksha Barjatya wearing round sunglasses"
              fill
              priority
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-contain object-right p-4 mix-blend-multiply [filter:contrast(1.25)_brightness(1.08)] md:pr-16 dark:mix-blend-screen dark:[filter:invert(1)_contrast(1.25)]"
            />
            <span className="chip absolute left-4 top-4 md:left-6 md:top-6">
              Barjatya (Indore, India)
            </span>
            <span className="chip absolute right-4 top-4 hidden sm:inline-flex md:right-6 md:top-6">
              (B.Tech CSE, 2027)
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal
        eager
        delay={0.2}
        className="relative z-10 mx-auto -mt-8 w-full max-w-[1400px] md:-mt-24"
      >
        <HoverNameLetters />
      </Reveal>
    </section>
  );
}
