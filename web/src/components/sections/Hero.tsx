"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const pinRef = useRef<HTMLDivElement>(null);

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

  // Scroll parallax: the whole hero box drifts slower than the page, and the
  // rose location pin drifts at its own (faster) rate + a slight swing, so
  // the section reads as layered depth as you scroll past it.
  useEffect(() => {
    let ticking = false;

    function apply() {
      ticking = false;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // Only animate while the hero is anywhere near the viewport.
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;

      const y = window.scrollY;
      if (parallaxBoxRef.current) {
        // Content drifts noticeably slower than the page — the core parallax.
        parallaxBoxRef.current.style.transform = `translateY(${y * 0.35}px)`;
      }
      if (pinRef.current) {
        // The pin lags almost entirely behind the scroll, like a distant
        // background layer — it barely moves while everything else does.
        pinRef.current.style.transform = `translateY(${y * 0.85}px) rotate(${
          y * 0.04
        }deg)`;
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
      className="relative flex min-h-screen items-center overflow-hidden bg-white px-6 pt-20 dark:bg-background"
    >
      {/* Rose location pin — its own parallax layer */}
      <div
        ref={pinRef}
        className="pointer-events-none absolute right-[8%] top-36 z-10 hidden select-none md:block lg:right-[6%]"
        aria-hidden="true"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C7.58 2 4 5.58 4 10c0 5.25 6.5 11.34 7.16 11.94a1.2 1.2 0 0 0 1.68 0C13.5 21.34 20 15.25 20 10c0-4.42-3.58-8-8-8Z"
            fill="hsl(350, 70%, 55%)"
          />
          <circle cx="12" cy="10" r="3.2" fill="white" />
        </svg>
      </div>

      <div
        ref={parallaxBoxRef}
        className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2"
      >
        <div className="text-center lg:text-left">
          <p className="mb-4 text-lg font-semibold">
            Hi, I&apos;m <span className="text-accent">Preksha</span>{" "}
            <span className="inline-block">👋</span>
          </p>

          <h1 className="mb-7 text-4xl leading-tight tracking-tight md:text-5xl lg:text-[3.25rem]">
            I build <span className="font-extrabold">intelligent systems</span>{" "}
            that actually work.
          </h1>

          <div className="mb-6 inline-flex items-center gap-3">
            <button
              onClick={() => cycleTagline(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-transform hover:scale-110 hover:bg-foreground hover:text-background active:scale-90"
              style={{ transitionTimingFunction: "var(--spring)" }}
              aria-label="Previous tagline"
            >
              ‹
            </button>
            <p
              className="min-w-60 text-left text-sm font-semibold text-muted-foreground transition-all duration-300"
              style={{
                opacity: swap ? 0 : 1,
                transform: swap ? "translateY(10px)" : "translateY(0)",
              }}
            >
              {TAGLINES[taglineIndex]}
            </p>
            <button
              onClick={() => cycleTagline(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-transform hover:scale-110 hover:bg-foreground hover:text-background active:scale-90"
              style={{ transitionTimingFunction: "var(--spring)" }}
              aria-label="Next tagline"
            >
              ›
            </button>
          </div>

          <div className="mb-8 flex justify-center gap-12 lg:justify-start">
            <div>
              <p className="mb-1.5 text-sm text-muted-foreground">Based in</p>
              <p className="font-medium">Indore, India</p>
            </div>
            <div>
              <p className="mb-1.5 text-sm text-muted-foreground">Status</p>
              <p className="flex items-center gap-2 font-medium">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Open to work
              </p>
            </div>
          </div>

          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95"
            style={{ transitionTimingFunction: "var(--spring)" }}
          >
            See my work →
          </a>
        </div>

        <div
          className="relative [perspective:800px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={tiltRef}
            className="aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-2xl transition-transform duration-500"
            style={{
              background: "hsl(30, 20%, 97%)",
              transformStyle: "preserve-3d",
              transitionTimingFunction: "var(--spring-soft)",
            }}
          >
            <Image
              src="/preksha-illustration.jpg"
              alt="Illustrated portrait of Preksha Barjatya wearing round sunglasses"
              width={736}
              height={736}
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 30%" }}
              priority
            />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-background p-4 shadow-lg">
            <p className="text-sm text-muted-foreground">B.Tech CSE (AI &amp; ML)</p>
            <p className="font-serif text-2xl">2023–27</p>
          </div>
        </div>
      </div>
    </section>
  );
}
