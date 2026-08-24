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

    /* Anchor links are NOT smoothed by default — Lenis's `anchors` option
       is off unless you ask for it, and globals.css has to set
       `scroll-behavior: auto` for Lenis to work at all, which disables the
       browser's own smoothing too. So `#work` and `#experience` were
       landing as raw instant jumps while every other kind of scroll on the
       page was eased. This hands them to Lenis.

       Written out rather than passing `anchors: true` so the URL still
       updates (deep links, the back button) and so `hashchange` fires for
       the components that listen for it.

       No offset is passed: Lenis subtracts the target's own
       `scroll-margin-top` already, and the sections set 96px / 80px there
       to clear the sticky nav. Passing it again applied it twice and the
       scroll stopped 96px above where it should. */
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest?.("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href?.startsWith("#")) return;

      const id = href.slice(1);
      // `href="#"` means the top of the page; anything else has to resolve
      // to a real element or the browser is left with a dead link.
      const target = id ? document.getElementById(id) : null;
      if (id && !target) return;

      event.preventDefault();

      lenis.scrollTo(target ?? 0);

      /* pushState rather than assigning location.hash, which would trigger
         the native jump this handler exists to replace. pushState doesn't
         fire `hashchange` on its own, so it's dispatched by hand — and
         unconditionally, so clicking "Work" while already at #work still
         notifies listeners (the carousel snaps back to the lead card). */
      if (window.location.hash !== href) {
        window.history.pushState(null, "", href);
      }
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return null;
}
