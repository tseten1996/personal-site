"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Maximum pull in pixels. Kept small — this should be felt, not seen. */
  strength?: number;
};

/**
 * Pulls its child a few pixels toward the cursor. Disabled entirely for
 * reduced motion and for coarse pointers, where it would do nothing useful.
 */
export function Magnetic({ children, className, strength = 6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  if (reduced) return <span className={className}>{children}</span>;

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-strength, Math.min(strength, (dx / rect.width) * strength * 2)));
    y.set(Math.max(-strength, Math.min(strength, (dy / rect.height) * strength * 2)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.span>
  );
}
