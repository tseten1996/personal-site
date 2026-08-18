"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { repos, exploring } from "@/content/building";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";

/**
 * Repository row with a hover preview. The preview shows metadata this site
 * already knows — it deliberately does not fetch or fake live GitHub stats.
 */
function RepoRow({ repo }: { repo: (typeof repos)[number] }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const label = (
    <>
      <span className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[0.9375rem] tracking-[-0.012em] text-ink">{repo.name}</span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
          {repo.visibility === "private" ? "private" : repo.language}
        </span>
      </span>
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
        {repo.updated}
      </span>
    </>
  );

  return (
    <li
      className="relative border-b border-line"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {repo.href ? (
        <a
          href={repo.href}
          target="_blank"
          rel="noreferrer noopener"
          className="group flex items-baseline gap-4 py-5 transition-colors duration-300 hover:text-ember"
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          {label}
        </a>
      ) : (
        <div className="flex items-baseline gap-4 py-5">{label}</div>
      )}

      <AnimatePresence>
        {hovered && !reduced ? (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, y: 6, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.99 }}
            transition={{ duration: 0.28, ease }}
            className="pointer-events-none absolute left-0 top-full z-20 hidden w-[24rem] border border-line-strong bg-paper p-5 shadow-[0_18px_50px_-24px_rgba(20,19,15,0.45)] lg:block"
          >
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ember">
              {repo.visibility === "private" ? "Private repository" : "github.com"}
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed tracking-[-0.01em] text-ink">
              {repo.description}
            </p>
            <p className="prose-body mt-3 text-[0.8125rem]">{repo.note}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Always-visible on touch and narrow screens, where hover does not exist. */}
      <p className="prose-body -mt-1 max-w-2xl pb-5 text-[0.875rem] lg:hidden">{repo.description}</p>
    </li>
  );
}

export function Building() {
  return (
    <section id="building" aria-labelledby="building-heading" className="scroll-mt-20 py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="04"
          headingId="building-heading"
          label="Currently"
          title={
            <>
              What is actually{" "}
              <span className="display-serif">open on my machine.</span>
            </>
          }
          intro="Three repositories, all active this year. Snapshots taken in August 2026 — not live counters."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ul className="border-t border-line">
              {repos.map((repo) => (
                <RepoRow key={repo.name} repo={repo} />
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <ArrowLink href={site.github} external>
                All repositories
              </ArrowLink>
              {repos
                .filter((r) => r.caseStudy)
                .slice(0, 1)
                .map((r) => (
                  <Link
                    key={r.caseStudy}
                    href={`/work/${r.caseStudy}/`}
                    className="link-underline text-sm text-muted transition-colors hover:text-ink"
                  >
                    Read the Wander case study
                  </Link>
                ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
              Currently exploring
            </h3>
            <ul className="mt-5 space-y-5">
              {exploring.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="mt-[0.45rem] font-mono text-[0.6875rem] text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="prose-body text-[0.9375rem]">{item}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
