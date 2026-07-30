"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wires Lenis's eased scroll into GSAP's ticker so ScrollTrigger stays in
 * sync with it (the standard Lenis+GSAP pairing). Renders nothing — native
 * scroll is what's actually observable, this just changes its feel.
 * Skipped entirely under prefers-reduced-motion: native scroll takes over
 * and every ScrollTrigger reveal in this codebase already has a static
 * fallback, so nothing breaks by not smoothing the scroll itself.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return null;
}
