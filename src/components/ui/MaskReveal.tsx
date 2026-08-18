"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Play immediately (hero) rather than waiting for the viewport. */
  immediate?: boolean;
};

/**
 * A single line of display type sliding up from behind a clipped edge.
 *
 * The observer is attached to the *wrapper*, never the moving child: the child
 * starts translated fully outside the wrapper's `overflow: hidden` box, so an
 * observer on it would report zero intersection forever and the line would
 * never reveal. Watching the wrapper keeps the trigger honest.
 */
export function MaskReveal({ children, delay = 0, className, immediate = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={`block ${className ?? ""}`}>
        <span className="block">{children}</span>
      </span>
    );
  }

  const show = immediate || inView;

  return (
    <span ref={ref} className={`block overflow-hidden pb-[0.14em] ${className ?? ""}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%" }}
        animate={{ y: show ? "0%" : "110%" }}
        transition={{ duration: 0.85, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
