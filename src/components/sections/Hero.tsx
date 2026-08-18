"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { headline, heroLede, heroRail } from "@/content/about";
import { ease } from "@/lib/motion";

/**
 * Entrance timings, in seconds. Kept deliberately tight: the lede is the
 * largest element on the page, so a leisurely fade here is measured directly
 * as a worse LCP. The sequence should read as choreography, not as latency.
 */
const T = { eyebrow: 0.08, line: 0.16, lede: 0.42, cta: 0.52, index: 0.6, rail: 0.72 };

export function Hero() {
  const reduced = useReducedMotion();

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease, delay },
        };

  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-48" aria-labelledby="intro-heading">
      <div className="shell">
          <motion.p
          {...fade(T.eyebrow)}
          className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1"
        >
          <span className="text-ink">{site.name}</span>
          <span aria-hidden="true" className="hidden h-px w-6 bg-line-strong sm:block" />
          <span>{site.role}</span>
          <span aria-hidden="true" className="hidden h-px w-6 bg-line-strong sm:block" />
          <span>
            {site.location} · {site.availability}
          </span>
        </motion.p>

        {/* Full-bleed masthead: the display type is never boxed into a column,
            so each line breaks exactly where it is written to. */}
        <h1
          id="intro-heading"
          className="display mt-8 text-[clamp(2.125rem,0.5rem+6.9vw,5.25rem)]"
        >
          {headline.lines.map((line, i) => (
            <MaskReveal key={line} immediate delay={T.line + i * 0.07}>
              {line}
            </MaskReveal>
          ))}
          <MaskReveal immediate delay={T.line + headline.lines.length * 0.07}>
            <span className="display-serif text-ember">{headline.emphasis}</span>
          </MaskReveal>
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-12">
          {/* ---------------------------------------------------------- lede */}
          <div className="lg:col-span-7">
            <motion.p {...fade(T.lede)} className="prose-lede max-w-[42rem]">
              {heroLede}
            </motion.p>

            <motion.div
              {...fade(T.cta)}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3.5 text-sm tracking-[-0.01em] text-paper transition-colors duration-300 hover:bg-transparent hover:text-ink"
                >
                  Selected work
                  <svg
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    className="size-3 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M6 1.5v9" strokeLinecap="square" />
                    <path d="M2.2 6.8 6 10.5l3.8-3.7" strokeLinecap="square" />
                  </svg>
                </a>
              </Magnetic>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline transition-colors hover:text-ink"
                >
                  GitHub
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline transition-colors hover:text-ink"
                >
                  LinkedIn
                </a>
                <Link href="/resume/" className="link-underline transition-colors hover:text-ink">
                  Résumé
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline transition-colors hover:text-ink"
                >
                  Email
                </a>
              </div>
            </motion.div>
          </div>

          {/* ------------------------------------------------- project index */}
          <motion.div {...fade(T.index)} className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow">Built in 2026</p>
            <ul className="mt-5 border-t border-line">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}/`}
                    className="group flex items-baseline gap-4 border-b border-line py-4 transition-colors duration-300 hover:bg-paper-sunk"
                  >
                    <span className="font-mono text-[0.6875rem] text-muted">{p.index}</span>
                    <span className="flex-1">
                      <span className="block text-[0.9375rem] tracking-[-0.012em] text-ink">
                        {p.name}
                      </span>
                      <span className="mt-1 block font-mono text-[0.6875rem] leading-relaxed text-muted">
                        {p.kicker}
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      className="arrow arrow-ne size-3 shrink-0 self-center text-muted transition-colors group-hover:text-ember"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    >
                      <path d="M2.5 9.5 9.5 2.5" strokeLinecap="square" />
                      <path d="M4.2 2.5H9.5V7.8" strokeLinecap="square" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ------------------------------------------------------------ rail */}
      <motion.div {...fade(T.rail)} className="mt-24 border-y border-line sm:mt-32">
        <div className="shell">
          <dl className="grid grid-cols-2 divide-line font-mono text-[0.6875rem] sm:grid-cols-4 sm:divide-x">
            {heroRail.map(([label, value], i) => (
              <div key={label} className={`py-5 ${i % 2 === 1 ? "pl-5 sm:pl-6" : "pr-5"} sm:px-6 sm:first:pl-0`}>
                <dt className="uppercase tracking-[0.16em] text-muted">{label}</dt>
                <dd className="mt-2 text-[0.8125rem] tracking-[-0.01em] text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
