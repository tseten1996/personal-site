"use client";

import { motion, useReducedMotion } from "motion/react";
import { ease, viewportOnce } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  /** Seconds. Used to stagger siblings without a parent orchestrator. */
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "p" | "span";
};

/**
 * Fade-and-rise on first entry into the viewport. With reduced motion the
 * element simply renders in place — there is no state in which content is
 * hidden from a user who cannot see the animation.
 */
export function Reveal({ children, delay = 0, y = 16, className, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </Tag>
  );
}
