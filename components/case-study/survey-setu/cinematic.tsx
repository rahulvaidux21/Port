"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────────────
   Cinematic section transitions. Wrap a section in <Cine preset="…">
   and mark its layers with data attributes; the preset scrubs an
   entrance and an exit for each layer as the section crosses the
   viewport (GSAP ScrollTrigger, already synced to Lenis).

     [data-cine-head]   label + headline       clip-reveal in, drift up and fade out
     [data-cine-media]  the hero visual        the preset's signature move
     [data-cine-inner]  an image inside media  zooms inside its frame
     [data-cine-item]   repeated cards         staggered, per preset
     [data-cine-line]   connector lines        draw left → right
     [data-cine-word]   giant display words    per preset
     [data-cine-body]   the section body       rises in (only where safe)

   Entrances never animate opacity on head/media, and exits never
   animate y/scale — exits use yPercent and opacity — so the two scrub
   tweens on one element never fight over a property.

   Rules: nothing moves under prefers-reduced-motion (the page is
   simply laid out); phones get the same choreography at about half the
   amplitude; and no preset transforms an ancestor of a pinned scene
   (the personas zoom-out, the wireframe strip), because a transformed
   ancestor would break position: fixed.
   ──────────────────────────────────────────────────────────────────── */

export type CinePreset =
  | "hero" // exit: the phone zooms, turns and falls away; the words split
  | "rise" // body rises out of a mask
  | "iris" // media opens from a small rounded window to full, image settles
  | "tilt" // media stands up from a laid-back lid
  | "curtain" // the whole band unrolls from a rounded card
  | "expand" // media grows from a card to full-bleed
  | "slide" // items slide in from alternating sides
  | "wipe" // items are wiped in left to right
  | "flip" // items swing in like pages
  | "pop" // items spring up from small
  | "spin" // items spin in
  | "stand" // phone stands up from flat, giant word settles
  | "swing" // media swings in from the side in 3D
  | "lift"; // media and items lift from below

type Vars = gsap.TweenVars;

export function Cine({
  preset,
  children,
  className,
}: {
  preset: CinePreset;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(
      {
        ok: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const { ok, desktop } = context.conditions as { ok: boolean; desktop: boolean };
        if (!ok) return;
        const k = desktop ? 1 : 0.55; // amplitude
        const all = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
        const head = all("[data-cine-head]");
        const media = all("[data-cine-media]");
        const inner = all("[data-cine-media] [data-cine-inner]");
        const items = all("[data-cine-item]");
        const lines = all("[data-cine-line]");
        const words = all("[data-cine-word]");
        const body = all("[data-cine-body]");

        const scrub = (start = "top 92%", end = "top 35%", trigger: Element = el) => ({
          trigger,
          start,
          end,
          scrub: 0.8,
        });
        const enter = (t: Element[], from: Vars, to: Vars, st = scrub(), stagger?: number) => {
          if (!t.length) return;
          gsap.fromTo(t, from, { ...to, ease: "none", stagger, scrollTrigger: st });
        };
        const exit = (t: Element[], to: Vars, start = "bottom 55%") => {
          if (!t.length) return;
          gsap.to(t, {
            ...to,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: el, start, end: "bottom top", scrub: 0.8 },
          });
        };
        const P = 1400; // perspective for 3D moves

        /* ── Every section: the headline is revealed out of a mask and
           drifts away on exit; connector lines draw themselves. ── */
        if (preset !== "hero") {
          enter(
            head,
            { clipPath: "inset(0% 0% 100% 0%)", y: 70 * k },
            { clipPath: "inset(0% 0% 0% 0%)", y: 0 },
            scrub("top 95%", "top 45%")
          );
          exit(head, { yPercent: -35, opacity: 0.12 });
          enter(
            lines,
            { scaleX: 0, transformOrigin: "0% 50%" },
            { scaleX: 1 },
            scrub("top 75%", "bottom 70%")
          );
        }

        switch (preset) {
          case "hero": {
            const t = { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 };
            if (media.length)
              gsap.to(media, {
                scale: 1 + 0.55 * k,
                rotate: -14 * k,
                rotateY: 32 * k,
                yPercent: 38,
                opacity: 0,
                transformPerspective: P,
                ease: "power1.in",
                scrollTrigger: t,
              });
            words.forEach((w) =>
              gsap.to(w, {
                xPercent: w.dataset.cineWord === "l" ? -60 : 60,
                opacity: 0,
                ease: "power1.in",
                scrollTrigger: t,
              })
            );
            if (items.length)
              gsap.to(items, {
                scale: 0.2,
                opacity: 0,
                stagger: 0.1,
                ease: "power1.in",
                scrollTrigger: t,
              });
            break;
          }
          case "rise":
            enter(
              body,
              { y: 140 * k, clipPath: "inset(12% 0% 0% 0% round 32px)" },
              { y: 0, clipPath: "inset(0% 0% 0% 0% round 0px)" }
            );
            enter(items, { y: 120 * k, scale: 0.94 }, { y: 0, scale: 1 }, scrub(), 0.15);
            break;
          case "iris":
            enter(
              media,
              { clipPath: "inset(22% 26% 22% 26% round 80px)" },
              { clipPath: "inset(0% 0% 0% 0% round 28px)" },
              scrub("top 95%", "top 20%")
            );
            enter(inner, { scale: 1.4 }, { scale: 1 }, scrub("top 95%", "top 20%"));
            enter(
              items,
              { y: 180 * k, rotateX: -55, transformPerspective: P, transformOrigin: "50% 0%" },
              { y: 0, rotateX: 0 },
              scrub("top 70%", "top 10%"),
              0.2
            );
            exit(media, { yPercent: -8, opacity: 0.35 }, "bottom 40%");
            break;
          case "tilt":
            enter(
              media,
              {
                rotateX: 42,
                y: 180 * k,
                scale: 0.84,
                transformPerspective: P,
                transformOrigin: "50% 100%",
              },
              { rotateX: 0, y: 0, scale: 1 },
              scrub("top 95%", "top 25%")
            );
            enter(
              items,
              { y: 140 * k, rotate: (i: number) => (i % 2 ? 3 : -3) },
              { y: 0, rotate: 0 },
              scrub("top 60%", "top 0%"),
              0.2
            );
            exit(media, { yPercent: -6, opacity: 0.3 }, "bottom 35%");
            break;
          case "curtain":
            enter(
              [el],
              { clipPath: "inset(14% 6% 0% 6% round 64px)" },
              { clipPath: "inset(0% 0% 0% 0% round 0px)" },
              scrub("top bottom", "top 15%")
            );
            enter(
              items,
              { y: 160 * k, scale: 0.9 },
              { y: 0, scale: 1 },
              scrub("top 60%", "top 5%"),
              0.15
            );
            exit([el], { opacity: 0.55 }, "bottom 35%");
            break;
          case "expand":
            enter(
              media,
              { scale: 0.7, clipPath: "inset(0% 0% 0% 0% round 120px)" },
              { scale: 1, clipPath: "inset(0% 0% 0% 0% round 28px)" },
              scrub("top bottom", "top 15%")
            );
            enter(inner, { scale: 1.3 }, { scale: 1 }, scrub("top bottom", "top 15%"));
            exit(media, { yPercent: -10, opacity: 0.4 }, "bottom 45%");
            break;
          case "slide":
            enter(
              items,
              {
                x: (i: number) => (i % 2 ? 1 : -1) * 260 * k,
                rotate: (i: number) => (i % 2 ? 4 : -4),
              },
              { x: 0, rotate: 0 },
              scrub("top 85%", "top 15%"),
              0.12
            );
            enter(body, { y: 100 * k }, { y: 0 });
            break;
          case "wipe":
            enter(
              items,
              { clipPath: "inset(0% 100% 0% 0%)", x: -60 * k },
              { clipPath: "inset(0% 0% 0% 0%)", x: 0 },
              scrub("top 85%", "top 20%"),
              0.15
            );
            break;
          case "flip":
            enter(
              items,
              { rotateY: -62, y: 100 * k, transformPerspective: P, transformOrigin: "0% 50%" },
              { rotateY: 0, y: 0 },
              scrub("top 90%", "bottom 85%"),
              0.25
            );
            break;
          case "pop":
            enter(
              items,
              { scale: 0.3, y: 140 * k, rotate: (i: number) => (i % 2 ? 14 : -14) },
              { scale: 1, y: 0, rotate: 0 },
              scrub("top 85%", "top 25%"),
              0.08
            );
            enter(
              media,
              { scale: 0.8, y: 160 * k },
              { scale: 1, y: 0 },
              scrub("top 70%", "top 5%")
            );
            exit(media, { yPercent: -8, opacity: 0.4 }, "bottom 40%");
            break;
          case "spin":
            enter(
              items,
              { rotate: -200, scale: 0.15 },
              { rotate: 0, scale: 1 },
              scrub("top 70%", "top 0%"),
              0.08
            );
            enter(
              words,
              { scale: 1.6, xPercent: -10 },
              { scale: 1, xPercent: 0 },
              scrub("top 95%", "top 30%")
            );
            break;
          case "stand":
            enter(
              media,
              {
                rotateX: 72,
                scale: 0.68,
                y: 240 * k,
                transformPerspective: 1200,
                transformOrigin: "50% 100%",
              },
              { rotateX: 0, scale: 1, y: 0 },
              scrub("top 95%", "top 25%")
            );
            enter(words, { scale: 1.45 }, { scale: 1 }, scrub("top 95%", "top 30%"));
            exit(media, { yPercent: -12, opacity: 0.25 }, "bottom 40%");
            exit(words, { opacity: 0.15 }, "bottom 50%");
            break;
          case "swing":
            enter(
              media,
              {
                xPercent: 45 * k,
                rotateY: -32,
                transformPerspective: P,
                transformOrigin: "100% 50%",
              },
              { xPercent: 0, rotateY: 0 },
              scrub("top 95%", "top 20%")
            );
            enter(words, { xPercent: -30 }, { xPercent: 0 }, scrub("top 95%", "top 30%"));
            exit(media, { yPercent: -8, opacity: 0.35 }, "bottom 40%");
            break;
          case "lift":
            enter(
              media,
              { y: 220 * k, scale: 0.86 },
              { y: 0, scale: 1 },
              scrub("top 85%", "top 10%"),
              0.15
            );
            enter(items, { y: 120 * k }, { y: 0 }, scrub("top 85%", "top 20%"), 0.1);
            break;
        }
      }
    );
    return () => mm.revert();
  }, [preset]);

  return (
    <div ref={ref} className={cn("relative", className)} data-cine={preset}>
      {children}
    </div>
  );
}
