"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/Reveal";
import { HoverNameLetters } from "./HoverNameLetters";

const TAGLINES = [
  "AI Engineer · RAG & Agentic Workflows",
  "Building with LangChain, LangGraph & FastAPI",
  "Turning LLMs into reliable, shippable products",
];

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [swap, setSwap] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxBoxRef = useRef<HTMLDivElement>(null);

  function cycleTagline(dir: number) {
    setSwap(true);
    window.setTimeout(() => {
      setTaglineIndex(
        (prev) => (prev + dir + TAGLINES.length) % TAGLINES.length
      );
      setSwap(false);
    }, 280);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${py * -16}deg) rotateY(${
      px * 16
    }deg) scale(1.02)`;
  }

  function handleMouseLeave() {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  // Scroll parallax: the whole hero box drifts slower than the page, so the
  // section reads as layered depth as you scroll past it.
  useEffect(() => {
    let ticking = false;

    function apply() {
      ticking = false;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;

      const y = window.scrollY;
      if (parallaxBoxRef.current) {
        parallaxBoxRef.current.style.transform = `translateY(${y * 0.35}px)`;
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(apply);
      }
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-6 pb-20 pt-28 md:pt-16"
    >
      <div
        ref={parallaxBoxRef}
        className="mx-auto grid w-full max-w-[1400px] items-center gap-16 lg:grid-cols-2 lg:gap-24"
      >
        <Reveal className="text-center">
          <div className="mb-4 inline-block w-full text-left">
            <HoverNameLetters />
            <p className="-mt-1 pr-1 text-right font-display text-[clamp(1.75rem,7vw,7rem)] leading-none text-muted-foreground md:-mt-2 md:pr-2">
              Barjatya
            </p>
          </div>

          <p className="mb-7 font-display text-3xl leading-[1.15] tracking-tight md:text-4xl">
            Building <span className="italic pb-1 inline-block">intelligent</span> applications.
          </p>

          <div className="mb-6 inline-flex items-center gap-3">
            <button
              onClick={() => cycleTagline(-1)}
              className="transition-spring flex h-9 w-9 items-center justify-center rounded-full border border-border hover:scale-110 hover:bg-foreground hover:text-background active:scale-90"
              aria-label="Previous tagline"
            >
              <CaretLeft size={14} weight="bold" />
            </button>
            <p
              className="min-w-60 text-left text-base font-semibold text-muted-foreground transition-all duration-300"
              style={{
                opacity: swap ? 0 : 1,
                transform: swap ? "translateY(10px)" : "translateY(0)",
              }}
            >
              {TAGLINES[taglineIndex]}
            </p>
            <button
              onClick={() => cycleTagline(1)}
              className="transition-spring flex h-9 w-9 items-center justify-center rounded-full border border-border hover:scale-110 hover:bg-foreground hover:text-background active:scale-90"
              aria-label="Next tagline"
            >
              <CaretRight size={14} weight="bold" />
            </button>
          </div>

          <div className="mb-8 flex justify-center gap-12">
            <div>
              <p className="mb-1.5 text-base text-muted-foreground">Based in</p>
              <p className="text-lg font-medium">Indore, India</p>
            </div>
            <div>
              <p className="mb-1.5 text-base text-muted-foreground">Status</p>
              <p className="flex items-center gap-2 text-lg font-medium">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Open to work
              </p>
            </div>
          </div>

          <a
            href="#projects"
            className="transition-spring inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-base font-medium text-background hover:scale-105 active:scale-95"
          >
            See my work
            <ArrowRight size={16} weight="bold" />
          </a>
        </Reveal>

        <Reveal
          delay={0.15}
          y={28}
          className="relative mx-auto w-full max-w-sm [perspective:800px]"
        >
          {/* Lanyard clip */}
          <div
            aria-hidden="true"
            className="absolute -top-5 left-1/2 z-10 h-8 w-16 -translate-x-1/2 rounded-t-xl border border-b-0 border-border bg-card"
          />

          <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div
              ref={tiltRef}
              className="dotted-grid relative overflow-hidden rounded-2xl border border-border shadow-2xl transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                transitionTimingFunction: "var(--spring-soft)",
                background: "var(--card)",
              }}
            >
              {/* Grommet hole */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-3 z-10 h-4 w-4 -translate-x-1/2 rounded-full border border-border bg-background"
              />

              {/* Badge header */}
              <div className="bg-foreground px-5 pb-3 pt-9 text-center text-background">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
                  All Access
                </p>
                <p className="mt-1 font-display text-xl uppercase tracking-wide">AI Engineer</p>
                <p className="mt-0.5 text-sm opacity-70">Indore, India</p>
              </div>

              {/* ID photo */}
              <div className="aspect-[4/5] overflow-hidden border-y border-border">
                <Image
                  src="/preksha-illustration.jpg"
                  alt="Illustrated portrait of Preksha Barjatya wearing round sunglasses"
                  width={736}
                  height={920}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "center 30%" }}
                  priority
                />
              </div>

              {/* Badge footer */}
              <div className="p-5">
                <p className="font-display text-xl">Preksha Barjatya</p>
                <p className="mt-0.5 text-base text-muted-foreground">
                  B.Tech CSE (AI &amp; ML) · 2023-27
                </p>
                <div className="mt-4 flex items-end gap-[3px]" aria-hidden="true">
                  {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1].map((h, i) => (
                    <span
                      key={i}
                      className="w-[2.5px] bg-foreground/70"
                      style={{ height: `${h * 5 + 6}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
