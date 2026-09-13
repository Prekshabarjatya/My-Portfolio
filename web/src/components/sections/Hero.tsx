"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const TAGLINES = [
  "AI Engineer · RAG & Agentic Workflows",
  "Building with LangChain, LangGraph & FastAPI",
  "Turning LLMs into reliable, shippable products",
];

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [swap, setSwap] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="hero"
      className="flex min-h-screen items-center px-6 pt-20"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2">
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
