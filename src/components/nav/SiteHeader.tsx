"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { navItems, sectionIds, site } from "@/content/site";
import { useActiveSection } from "@/lib/useActiveSection";
import { useHeaderTone } from "@/lib/useHeaderTone";
import { ease } from "@/lib/motion";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const overDark = useHeaderTone();
  const reduced = useReducedMotion();

  // Tokens for the two states the header can be in. Keeping them in one place
  // is what stops the inverted state from drifting out of sync.
  const t = overDark
    ? {
        bar: "border-inv-line bg-inv-bg/85 supports-[backdrop-filter]:bg-inv-bg/70",
        fg: "text-inv-fg",
        muted: "text-inv-muted",
        hover: "hover:text-inv-fg",
        rule: "bg-inv-line-strong",
        accent: "bg-inv-ember",
        button: "border-inv-line-strong text-inv-fg hover:border-inv-fg hover:bg-inv-fg hover:text-inv-bg",
      }
    : {
        bar: "border-line bg-paper/80 supports-[backdrop-filter]:bg-paper/70",
        fg: "text-ink",
        muted: "text-muted",
        hover: "hover:text-ink",
        rule: "bg-line-strong",
        accent: "bg-ember",
        button: "border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-paper",
      };

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Lock the page while the mobile panel is open, and close it on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[80] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color,color] duration-500 ${
          scrolled ? `${t.bar} backdrop-blur-md` : "border-transparent bg-transparent"
        }`}
      >
        <div className="shell">
          <div
            className={`flex items-center justify-between transition-[height] duration-500 ${
              scrolled ? "h-14" : "h-20"
            }`}
          >
            <Link
              href="/"
              className="group flex shrink-0 items-baseline gap-2.5"
              aria-label={`${site.name} — home`}
            >
              <span className={`whitespace-nowrap font-mono text-[0.8125rem] tracking-[-0.02em] transition-colors duration-500 ${t.fg}`}>
                {site.name}
              </span>
              <span
                aria-hidden="true"
                className={`hidden whitespace-nowrap font-mono text-[0.6875rem] tracking-[0.14em] transition-colors duration-500 lg:inline ${t.muted}`}
              >
                / {site.role}
              </span>
            </Link>

            <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = active === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative px-3 py-2 text-[0.8125rem] tracking-[-0.01em] transition-colors duration-300 ${
                      isActive ? t.fg : `${t.muted} ${t.hover}`
                    }`}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-indicator"
                        className={`absolute inset-x-3 -bottom-px h-px ${t.accent}`}
                        transition={reduced ? { duration: 0 } : { duration: 0.45, ease }}
                      />
                    ) : null}
                  </a>
                );
              })}

              <span aria-hidden="true" className={`mx-3 h-4 w-px ${t.rule}`} />

              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className={`px-2 py-2 text-[0.8125rem] transition-colors duration-300 ${t.muted} ${t.hover}`}
              >
                GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className={`px-2 py-2 text-[0.8125rem] transition-colors duration-300 ${t.muted} ${t.hover}`}
              >
                LinkedIn
              </a>
              <Link
                href="/resume/"
                className={`ml-2 border px-3.5 py-1.5 text-[0.8125rem] transition-colors duration-300 ${t.button}`}
              >
                Résumé
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className={`-mr-2 flex items-center gap-2 p-2 text-[0.8125rem] transition-colors duration-500 md:hidden ${t.fg}`}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span aria-hidden="true" className="flex h-3 w-4 flex-col justify-between">
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span className={`h-px w-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Reading progress — a single hairline, only once you have started. */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={`h-px origin-left transition-opacity duration-500 ${t.accent} ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="fixed inset-0 z-40 bg-paper pt-20 md:hidden"
          >
            <nav aria-label="Sections" className="shell flex h-full flex-col">
              <ul className="mt-6 flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease, delay: 0.04 * i }}
                    className="border-b border-line"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="display text-[2rem]">{item.label}</span>
                      <span className="font-mono text-[0.6875rem] text-muted">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 py-8 text-sm text-muted">
                <a href={site.github} target="_blank" rel="noreferrer noopener" className="link-underline">
                  GitHub
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer noopener" className="link-underline">
                  LinkedIn
                </a>
                <Link href="/resume/" onClick={() => setOpen(false)} className="link-underline">
                  Résumé
                </Link>
                <a href={`mailto:${site.email}`} className="link-underline">
                  Email
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
