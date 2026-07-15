"use client";

import { useEffect, useState } from "react";

export const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * SSR-safe scroll reveal. Framer Motion bakes `initial` into the
 * server-rendered HTML as an inline style, so a naive opacity:0 initial
 * ships invisible content to anyone whose JS is slow, blocked, or absent
 * (crawlers included). Before mount, this renders with `initial={false}`
 * (no animation, content visible as-is) so the pre-hydration and no-JS
 * states are always visible; once mounted, a key change forces a fresh
 * instance so the real reveal animation still plays for capable clients.
 */
export function useRevealOnScroll(reduced: boolean | null, y = 32) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return { key: "pre-mount", props: { initial: false as const } };
  }

  return {
    key: "revealed",
    props: {
      initial: { opacity: 0, y: reduced ? 0 : y },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-10% 0px" },
      transition: { duration: 0.7, ease: EXPO_OUT },
    },
  };
}
