"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useReducedMotion } from "framer-motion";
import { hero, socialLinks } from "@/lib/data";
import { MASK_LEFT_WIDTH, MASK_RIGHT_WIDTH } from "@/lib/gridEdge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(SplitText);

// The 3 photo layers fan out at these angles, back to front — matches the
// source Figma's stacked-print-photo treatment exactly.
const STACK_ROTATIONS = [1.64, 2.34, 2.89];

// Parallax tuning per layer, index-aligned with STACK_ROTATIONS (back to
// front — the last entry is the topmost card, zIndex 2). The front card
// gets the largest lerp factor (reacts fastest, "leads") and the largest
// offset; back cards lag further behind and travel less — that gap between
// factors is what reads as staggered, canon-style motion instead of the
// whole stack moving as one rigid unit.
const PARALLAX_LERP = [0.035, 0.06, 0.1];
const PARALLAX_MAX_OFFSET = [16, 22, 30];
// Cursor-driven tilt, added on top of each layer's fixed fan angle — without
// this, the cards visually lean the same static clockwise direction no
// matter which side the cursor is on. Negative nx (cursor left) subtracts
// from the angle, so the card rotates counter-clockwise past its resting
// tilt; positive nx adds to it, tilting further clockwise.
const PARALLAX_MAX_TILT_DEG = [3, 4.5, 6.5];

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const imageLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();
  const wordmark = hero.name.toUpperCase();
  const email = socialLinks.find((link) => link.icon === "mail")?.href ?? "#";

  // SplitText headline reveal — words drop in with a stagger. Skipped
  // entirely under reduced motion, where the heading is just static text.
  useEffect(() => {
    if (reduced || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(headlineRef.current, { type: "words", mask: "words" });
      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.06,
        delay: 0.5,
      });
    });

    return () => ctx.revert();
  }, [reduced]);

  // Mouse-move parallax on the stacked portrait cards — each layer chases
  // the cursor at its own lerp speed (see PARALLAX_LERP/PARALLAX_MAX_OFFSET
  // above) instead of moving in lockstep, so the stack drifts like a
  // follow-the-leader group rather than one rigid card. Plain refs + a
  // single rAF loop, not React state: this needs to run every frame while
  // the mouse moves, and routing that through re-renders would be both
  // slower and pointless — nothing here affects what React needs to render.
  useEffect(() => {
    if (reduced) return;
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;
    // Narrowed to a plain non-null local so the closures below (handled by
    // hoisted function declarations, which TS doesn't narrow the same way
    // as inline arrow functions) don't need their own null checks.
    const section: HTMLElement = sectionEl;

    const targets = imageLayerRefs.current.map(() => ({ x: 0, y: 0, r: 0 }));
    const current = imageLayerRefs.current.map(() => ({ x: 0, y: 0, r: 0 }));
    let rafId = 0;
    let animating = false;

    function applyTransform(i: number) {
      const el = imageLayerRefs.current[i];
      if (!el) return;
      const deg = STACK_ROTATIONS[i];
      // Preserves the static fan-stack rotation/stagger this layer already
      // has, adding the parallax offset/tilt on top rather than replacing it.
      // `translate3d(...) rotate(...)` — NOT the other order. CSS applies
      // the rightmost function first in local space, so `rotate()
      // translate3d()` would translate first and only then rotate around
      // the image's *original* center, making the box swing/arc around an
      // off-center pivot as the offset grows (one corner sweeps far, the
      // opposite corner barely moves). Rotating first keeps it a clean spin
      // around the image's own center; translating the already-rotated
      // shape after is a uniform shift with no added distortion.
      const staticX = i * 2;
      const staticY = i * -2;
      el.style.transform = `translate3d(${staticX + current[i].x}px, ${staticY + current[i].y}px, 0) rotate(${deg + current[i].r}deg)`;
    }

    function tick() {
      let stillMoving = false;
      for (let i = 0; i < current.length; i++) {
        const c = current[i];
        const t = targets[i];
        c.x += (t.x - c.x) * PARALLAX_LERP[i];
        c.y += (t.y - c.y) * PARALLAX_LERP[i];
        c.r += (t.r - c.r) * PARALLAX_LERP[i];
        if (Math.abs(t.x - c.x) > 0.01 || Math.abs(t.y - c.y) > 0.01 || Math.abs(t.r - c.r) > 0.01) stillMoving = true;
        applyTransform(i);
      }
      if (stillMoving) {
        rafId = requestAnimationFrame(tick);
      } else {
        animating = false;
      }
    }

    function ensureLoopRunning() {
      if (!animating) {
        animating = true;
        rafId = requestAnimationFrame(tick);
      }
    }

    function handleMouseMove(event: MouseEvent) {
      const rect = section.getBoundingClientRect();
      // Normalized -1..1 relative to the section's own center, clamped so a
      // cursor near the section's edge doesn't overshoot past each layer's
      // max offset.
      const nx = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
      for (let i = 0; i < targets.length; i++) {
        targets[i].x = nx * PARALLAX_MAX_OFFSET[i];
        targets[i].y = ny * PARALLAX_MAX_OFFSET[i];
        targets[i].r = nx * PARALLAX_MAX_TILT_DEG[i];
      }
      ensureLoopRunning();
    }

    function handleMouseLeave() {
      for (const t of targets) {
        t.x = 0;
        t.y = 0;
        t.r = 0;
      }
      ensureLoopRunning();
    }

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden bg-paper">
      <div className="relative mx-auto max-w-[1032px] scroll-mt-20 overflow-hidden px-9 pb-8 pt-8 text-center sm:pb-10 sm:pt-10 md:px-8 md:pb-12 md:pt-12">
        {/* Fades the ticker toward the background starting at the grid
            line, dissolving further inward — this div's own overflow-hidden
            clips the wordmark, but only at this wrapper's own edge, which
            is the true viewport edge on mobile/tablet (no floor on
            `mx-auto max-w-[1032px]`), not the grid line itself. The solid
            masks below cover that gap; this gradient continues the
            dissolve from the line onward. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 bg-gradient-to-r from-paper to-transparent sm:w-24" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 bg-gradient-to-l from-paper to-transparent sm:w-24" aria-hidden="true" />
        {/* Solid cover for the sliver between the true edge and the grid
            line, where the gradient above isn't fully opaque yet — without
            this, the ticker text is still faintly visible right at (and
            slightly past) the line. */}
        <div className={`pointer-events-none absolute inset-y-0 left-0 z-[6] bg-paper ${MASK_LEFT_WIDTH}`} aria-hidden="true" />
        <div className={`pointer-events-none absolute inset-y-0 right-0 z-[6] bg-paper ${MASK_RIGHT_WIDTH}`} aria-hidden="true" />

        {/* Ticker and photo stack share one box so the wordmark's vertical
            center lines up with the portrait's, not a fixed offset from the
            section top. */}
        <div className="relative mx-auto flex h-[300px] w-[225px] items-center justify-center sm:h-[400px] sm:w-[300px]">
          {/* Giant repeated name wordmark behind the portrait — decorative
              backdrop, not content (aria-hidden). Static under reduced
              motion instead of ticking. Escapes this box's own small width
              via 100vw; the section wrapper above clips it at the grid line
              instead of the true viewport edge. */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 w-screen -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <div
              className={cn(
                "flex w-max items-center gap-20 whitespace-nowrap font-display text-[6rem] font-medium leading-none tracking-[-4px] sm:text-[9rem] md:text-[124px]",
                !reduced && "animate-ticker"
              )}
              style={{ color: "rgb(82 82 82)", animationDuration: "48s" }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>{hero.name}®</span>
              ))}
            </div>
          </div>

          {/* Stacked, slightly fanned portrait prints — static fan/rotation
              from the source Figma, with a mouse-move parallax drift added
              on top (see the effect above) rather than replacing it. */}
          {STACK_ROTATIONS.map((deg, i) => (
            <div
              key={deg}
              ref={(el) => {
                imageLayerRefs.current[i] = el;
              }}
              className="absolute inset-0 overflow-hidden rounded-[12px] border border-hairline/[0.08] shadow-2xl"
              style={{ transform: `translate(${i * 2}px, ${i * -2}px) rotate(${deg}deg)`, zIndex: i }}
            >
              <Image
                src="/hero-portrait.jpg"
                alt={hero.name}
                fill
                sizes="(min-width: 640px) 300px, 225px"
                className="object-cover"
                priority={i === STACK_ROTATIONS.length - 1}
              />
            </div>
          ))}
        </div>

        <h1
          ref={headlineRef}
          className="relative mx-auto mt-10 max-w-3xl font-display text-3xl font-medium leading-[1.15] tracking-[-2px] text-text-secondary sm:text-4xl md:text-[54px] md:leading-[1.2]"
        >
          <span className="block">{hero.headlineLine1}</span>
          <span className="block">{hero.headlineLine2}</span>
        </h1>

        <div className="relative mt-12 flex flex-wrap items-center justify-center gap-2">
          <a
            href={email}
            className="rounded-lg border border-accent-border bg-accent px-4 py-3 font-sans text-base font-medium text-accent-foreground shadow-[0_5px_30px_5px_rgba(0,85,254,0.32)] transition-opacity hover:opacity-90"
          >
            {hero.ctaLabel}
          </a>
          <a
            href="#work"
            className="rounded-lg border border-hairline/[0.16] bg-hairline/[0.08] px-4 py-3 font-sans text-base font-medium text-text-primary shadow-[0_5px_30px_5px_rgba(255,255,255,0.1)] backdrop-blur-md transition-colors hover:bg-hairline/[0.16]"
          >
            {hero.secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
