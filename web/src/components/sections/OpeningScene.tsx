"use client";

import { useEffect, useRef } from "react";

// The opening scene's backdrop: a faint starfield and a ring of particles that
// starts scattered, gathers into an orbit, and drifts away from the pointer.
// Canvas only, no React state, so it never re-renders the tree. It pauses when
// scrolled out of view and draws one still frame under prefers-reduced-motion.

const RING_COUNT = 560;
const STAR_COUNT = 240;
const LINK_SUBSET = 70; // ring particles that may draw constellation lines
const LINK_DISTANCE = 84;
const GATHER_SECONDS = 2.6;

const WHITE = "245, 245, 242";
const ROSE = "246, 116, 138"; // matches --accent-on-ink

type Particle = {
  angle: number;
  speed: number;
  radius: number; // 1 = on the ring
  size: number;
  alpha: number;
  rose: boolean;
  startX: number;
  startY: number;
  delay: number;
  ox: number;
  oy: number;
  x: number;
  y: number;
};

type Star = { x: number; y: number; size: number; alpha: number; phase: number };

function gauss() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
}

const ease = (p: number) => 1 - Math.pow(1 - p, 3);

// Soft round sprite, so glowing particles are one drawImage instead of a gradient.
function makeSprite(rgb: string) {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${rgb}, 1)`);
  grad.addColorStop(0.25, `rgba(${rgb}, 0.55)`);
  grad.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

export function OpeningScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const spriteWhite = makeSprite(WHITE);
    const spriteRose = makeSprite(ROSE);

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let ringRX = 0;
    let ringRY = 0;
    let particles: Particle[] = [];
    let stars: Star[] = [];
    const pointer = { x: -9999, y: -9999 };
    let raf = 0;
    let running = false;
    let start = 0;
    let last = 0;

    function build() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
      // Big enough that the text block sits inside the orbit. On a portrait
      // screen the orbit becomes a tall oval that hugs the screen edges, so
      // particles stay out from behind the text.
      const portrait = h > w * 1.1;
      ringRX = portrait ? w * 0.54 : Math.min(w * 0.46, h * 0.52);
      ringRY = portrait ? h * 0.44 : ringRX * 0.94;

      particles = Array.from({ length: RING_COUNT }, () => {
        const size = Math.random() < 0.12 ? 2.2 + Math.random() * 2.2 : 0.7 + Math.random() * 1.4;
        return {
          angle: Math.random() * Math.PI * 2,
          speed: (0.012 + Math.random() * 0.03) * (Math.random() < 0.5 ? 1 : 0.6),
          radius: 1 + gauss() * 0.075,
          size,
          alpha: 0.25 + Math.random() * 0.6,
          rose: Math.random() < 0.06,
          startX: Math.random() * w,
          startY: Math.random() * h,
          delay: Math.random() * 1.1,
          ox: 0,
          oy: 0,
          x: 0,
          y: 0,
        };
      });

      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 0.4 + Math.random() * 1.1,
        alpha: 0.12 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function frame(now: number) {
      if (!start) start = now;
      const t = (now - start) / 1000;
      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      draw(reduce ? 999 : t, dt);
    }

    function draw(t: number, dt: number) {
      ctx!.clearRect(0, 0, w, h);

      // Starfield
      for (const s of stars) {
        const twinkle = 0.7 + 0.3 * Math.sin(t * 0.9 + s.phase);
        ctx!.fillStyle = `rgba(${WHITE}, ${s.alpha * twinkle})`;
        ctx!.fillRect(s.x, s.y, s.size, s.size);
      }

      // Ring
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed * dt;
        const homeX = cx + Math.cos(p.angle) * ringRX * p.radius;
        const homeY = cy + Math.sin(p.angle) * ringRY * p.radius;

        const progress = Math.min(Math.max((t - p.delay) / GATHER_SECONDS, 0), 1);
        const e = ease(progress);
        const baseX = p.startX + (homeX - p.startX) * e;
        const baseY = p.startY + (homeY - p.startY) * e;

        // Drift away from the pointer, then spring back.
        const dx = baseX - pointer.x;
        const dy = baseY - pointer.y;
        const dist = Math.hypot(dx, dy);
        let tx = 0;
        let ty = 0;
        if (dist < 130 && dist > 0.1) {
          const push = (1 - dist / 130) * 46;
          tx = (dx / dist) * push;
          ty = (dy / dist) * push;
        }
        p.ox += (tx - p.ox) * 0.09;
        p.oy += (ty - p.oy) * 0.09;
        p.x = baseX + p.ox;
        p.y = baseY + p.oy;

        const a = p.alpha * e;
        if (a <= 0.01) continue;
        if (p.size > 2) {
          const d = p.size * 5;
          ctx!.globalAlpha = a * 0.9;
          ctx!.drawImage(p.rose ? spriteRose : spriteWhite, p.x - d / 2, p.y - d / 2, d, d);
        } else {
          ctx!.globalAlpha = 1;
          ctx!.fillStyle = `rgba(${p.rose ? ROSE : WHITE}, ${a})`;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;

      // Faint constellation lines between neighbours in a small subset.
      if (t > GATHER_SECONDS) {
        ctx!.lineWidth = 0.6;
        for (let i = 0; i < LINK_SUBSET; i++) {
          const a = particles[i];
          for (let j = i + 1; j < LINK_SUBSET; j++) {
            const b = particles[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < LINK_DISTANCE) {
              ctx!.strokeStyle = `rgba(${WHITE}, ${(1 - d / LINK_DISTANCE) * 0.16})`;
              ctx!.beginPath();
              ctx!.moveTo(a.x, a.y);
              ctx!.lineTo(b.x, b.y);
              ctx!.stroke();
            }
          }
        }
      }
    }

    function loop(now: number) {
      frame(now);
      raf = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    }

    function stopLoop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }
    function onLeave() {
      pointer.x = pointer.y = -9999;
    }

    build();
    if (reduce) draw(999, 0);
    else startLoop();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startLoop();
      else stopLoop();
    });
    observer.observe(canvas);

    const resize = new ResizeObserver(() => {
      build();
      if (reduce) draw(999, 0);
    });
    resize.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      stopLoop();
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
