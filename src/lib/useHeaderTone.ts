"use client";

import { useEffect, useState } from "react";

/**
 * Reports whether a dark (`data-tone="inv"`) band currently sits behind the
 * fixed header, so the navigation can invert instead of floating as a pale
 * smudge over a charcoal section. Sampled on scroll inside a rAF, and only
 * ever writes state when the answer actually changes.
 */
export function useHeaderTone(probeY = 18) {
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    let frame = 0;
    let last = false;

    const sample = () => {
      frame = 0;
      const x = window.innerWidth / 2;
      const hit = document
        .elementsFromPoint(x, probeY)
        .some((el) => el instanceof HTMLElement && el.dataset.tone === "inv");
      if (hit !== last) {
        last = hit;
        setOverDark(hit);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [probeY]);

  return overDark;
}
