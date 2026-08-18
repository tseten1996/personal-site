import type { Transition, Variants } from "motion/react";

/** Single easing curve across the site, matched to --ease in globals.css. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const smooth: Transition = { duration: 0.7, ease };

/** Fade-and-rise used by <Reveal>. */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/** Line mask: text slides up from behind a clipped edge. */
export const maskVariants: Variants = {
  hidden: { y: "108%" },
  visible: { y: "0%" },
};

export const viewportOnce = { once: true, amount: 0.25 } as const;
