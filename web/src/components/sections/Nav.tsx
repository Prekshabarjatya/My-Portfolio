"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  House,
  User,
  Wrench,
  Briefcase,
  FolderOpen,
  Article,
  MoonStars,
  SunDim,
} from "@phosphor-icons/react";
import { useTheme } from "@/components/ThemeProvider";

const ITEMS = [
  { id: "hero", href: "#", label: "Home", Icon: House },
  { id: "about", href: "#about", label: "About", Icon: User },
  { id: "skills", href: "#skills", label: "Skills", Icon: Wrench },
  { id: "experience", href: "#experience", label: "Experience", Icon: Briefcase },
  { id: "projects", href: "#projects", label: "Projects", Icon: FolderOpen },
  { id: "case-study", href: "#case-study", label: "Case Study", Icon: Article },
];

export function Nav() {
  const { isDark, toggleTheme } = useTheme();
  const [active, setActive] = useState("hero");

  // Highlight the section that crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top bar: two small pills, nothing else. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-4 md:px-6">
        <a
          href="#"
          className="chip pointer-events-auto bg-background/85 py-2.5 font-medium backdrop-blur"
        >
          Preksha<span className="text-accent">*</span>
        </a>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="transition-spring flex h-10 w-10 items-center justify-center rounded-full bg-background/85 backdrop-blur hover:bg-foreground hover:text-background"
            aria-label="Toggle theme"
          >
            {isDark ? <SunDim size={18} weight="bold" /> : <MoonStars size={18} weight="bold" />}
          </button>
          <a
            href="#contact"
            className="transition-spring t-small rounded-full bg-foreground px-5 py-2.5 font-medium text-background hover:bg-accent hover:text-accent-foreground"
          >
            Contact
          </a>
        </div>
      </header>

      {/* Bottom dock. The active pill slides between items. */}
      <nav
        aria-label="Sections"
        className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-background/85 p-1.5 backdrop-blur"
      >
        {ITEMS.map(({ id, href, label, Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={href}
              aria-label={label}
              aria-current={isActive ? "true" : undefined}
              className={`transition-spring t-small relative flex items-center gap-2 rounded-full px-3 py-2.5 font-medium lg:px-4 ${
                isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="dock-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <Icon size={18} weight="bold" className="relative" />
              <span className="relative hidden lg:inline">{label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
