"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { Project } from "@/content/projects";

type Props = {
  trace: Project["trace"];
  tone?: "ink" | "inv";
  title: string;
  /** Depth of the step headings — 4 under a project name, 3 under a section. */
  headingLevel?: 3 | 4;
};

/**
 * The site's signature interaction: the architecture diagram stays anchored
 * while the narrative scrolls past it, and the connecting line fills to the
 * step you are reading. Below `lg` it degrades to a plain annotated list —
 * the same information, no stickiness, no scroll maths.
 */
export function SystemTrace({ trace, tone = "ink", title, headingLevel = 4 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.75"],
  });

  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(trace.length - 1, Math.max(0, Math.floor(v * trace.length)));
    setActive(next);
  });

  const H = `h${headingLevel}` as "h3" | "h4";
  const inv = tone === "inv";
  const c = {
    line: inv ? "bg-inv-line" : "bg-line",
    lineStrong: inv ? "bg-inv-line-strong" : "bg-line-strong",
    border: inv ? "border-inv-line" : "border-line",
    fg: inv ? "text-inv-fg" : "text-ink",
    muted: inv ? "text-inv-muted" : "text-muted",
    ember: inv ? "bg-inv-ember" : "bg-ember",
    emberText: inv ? "text-inv-ember" : "text-ember",
  };

  return (
    <div ref={ref} className="grid grid-cols-1 gap-x-12 lg:grid-cols-12">
      {/* ------------------------------------------------ narrative column */}
      <ol className="order-2 lg:col-span-6 lg:col-start-7">
        {trace.map((step, i) => {
          const isActive = !reduced && i === active;
          return (
            <li
              key={step.id}
              className={`border-t ${c.border} py-8 first:border-t-0 first:pt-0 lg:min-h-[62vh] lg:flex lg:flex-col lg:justify-center lg:border-t-0 lg:py-0`}
            >
              <div
                className={`transition-opacity duration-700 lg:transition-[opacity,transform] ${
                  reduced ? "" : isActive ? "lg:opacity-100" : "lg:opacity-45"
                }`}
              >
                <p className="flex items-center gap-3">
                  <span className={`font-mono text-[0.6875rem] ${isActive ? c.emberText : c.muted}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className={`h-px w-6 ${c.lineStrong}`} />
                  <span className={`font-mono text-[0.6875rem] uppercase tracking-[0.16em] ${c.muted}`}>
                    {step.meta}
                  </span>
                </p>
                <H className={`display mt-4 text-[clamp(1.5rem,1.1rem+1.5vw,2.25rem)] ${c.fg}`}>
                  {step.label}
                </H>
                <p className={`prose-body mt-4 max-w-md ${inv ? "text-inv-muted" : ""}`}>
                  {step.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* -------------------------------------------------- diagram column */}
      <div className="order-1 mb-12 lg:col-span-5 lg:mb-0 lg:h-screen lg:sticky lg:top-0 lg:flex lg:items-center">
        <figure
          className={`w-full border ${c.border} ${
            inv ? "trace-inv bg-inv-surface" : "trace-light bg-paper-sunk"
          } p-7 sm:p-9`}
        >
          <figcaption
            className={`flex items-baseline justify-between gap-4 border-b pb-4 ${c.border}`}
          >
            <span className={`eyebrow ${inv ? "text-inv-muted" : ""}`}>{title} — request path</span>
            <span className={`font-mono text-[0.6875rem] ${c.muted}`}>
              {String(reduced ? trace.length : active + 1).padStart(2, "0")}
              <span className={inv ? "text-inv-line-strong" : "text-line-strong"}> / </span>
              {String(trace.length).padStart(2, "0")}
            </span>
          </figcaption>

          <div className="relative mt-7 pl-8">
            {/* Spine + the segment that fills as you read. */}
            <span aria-hidden="true" className={`absolute bottom-3 left-[7px] top-3 w-px ${c.line}`} />
            <motion.span
              aria-hidden="true"
              style={reduced ? { scaleY: 1 } : { scaleY: fill }}
              className={`absolute bottom-3 left-[7px] top-3 w-px origin-top ${c.ember}`}
            />

            <ul className="space-y-6">
              {trace.map((step, i) => {
                const reached = reduced || i <= active;
                return (
                  <li key={step.id} className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-8 top-[0.55rem] size-[15px] rounded-full border transition-colors duration-500 ${
                        reached
                          ? `${inv ? "border-inv-ember" : "border-ember"} ${c.ember}`
                          : `${c.border} ${inv ? "bg-inv-bg" : "bg-paper"}`
                      }`}
                      style={reached ? { boxShadow: "0 0 0 4px var(--trace-surface)" } : undefined}
                    />
                    <div
                      className={`border-l-2 pl-4 transition-colors duration-500 ${
                        reached
                          ? inv
                            ? "border-inv-ember"
                            : "border-ember"
                          : inv
                            ? "border-inv-line"
                            : "border-line"
                      }`}
                    >
                      <p
                        className={`text-[1.0625rem] tracking-[-0.014em] transition-colors duration-500 ${
                          reached ? c.fg : c.muted
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className={`font-mono text-[0.6875rem] ${c.muted}`}>{step.meta}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </figure>
      </div>
    </div>
  );
}
