"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MoonStars, SunDim, List, X } from "@phosphor-icons/react";
import { useTheme } from "@/components/ThemeProvider";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <a href="#" className="font-display text-xl font-semibold">
            P.
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-spring group relative text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                {link.label}
                <span className="transition-spring absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="transition-spring flex h-9 w-9 items-center justify-center rounded-full hover:scale-110 hover:bg-card active:scale-90"
              aria-label="Toggle theme"
            >
              {isDark ? <SunDim size={18} weight="bold" /> : <MoonStars size={18} weight="bold" />}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-4 text-2xl uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
