"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/** Shared horizontal inset for the grid lines and their corner ticks.
    A continuous formula, not discrete breakpoints: `max(floor, 50% - 516px)`
    computes the exact edge of a centered 1032px box (1032/2 = 516) once the
    viewport is wide enough, and falls back to a flat floor (matching
    section padding, px-6/md:px-8) below that — the same math `max-w-[1032px]
    mx-auto` already uses for section content, so the lines and every
    section's content edge stay in sync at EVERY viewport width, not just at
    the breakpoints a discrete left-6/sm:left-8/lg:left-[204px] table would
    define. That's what caused lines and content to overlap in between. */
// Exported so any absolutely-positioned element elsewhere (nav padding,
// carousel edge-fades, marquee edge-fades) can align to the *exact* same
// boundary as the lines themselves, instead of approximating it with a
// section's own padding/-margin — which only coincides with this formula
// at wider viewports and drifts apart (content escaping past the line) on
// mobile, where a section's un-padded edge is x=0 but the line floor is
// 24px in from it.
export const GRID_LEFT = "left-[max(20px,calc(50%_-_516px))] md:left-[max(32px,calc(50%_-_516px))]";
export const GRID_RIGHT = "right-[max(20px,calc(50%_-_516px))] md:right-[max(32px,calc(50%_-_516px))]";
const LEFT = GRID_LEFT;
const RIGHT = GRID_RIGHT;

/** Two continuous vertical guide lines running the full page height. Each is
    its own element — combining both into one div with `left`+`right`+an
    explicit width doesn't work, since the explicit width wins and silently
    drops whichever side isn't `left`. `z-10` lifts them above every
    section's own background (several sections paint an opaque `bg-paper`,
    which otherwise silently covers the lines wherever it sits, since it
    comes later in source order). */
export function GridFrame({ children }: { children: ReactNode }) {
  return (
    // `overflow-x-clip` (not `hidden`) is a hard backstop so nothing can
    // ever render past the lines, without creating a scroll container that
    // would break the sticky Navbar inside — `clip` doesn't do that,
    // `hidden` would.
    <div className="relative overflow-x-clip">
      <div className={`pointer-events-none absolute inset-y-0 z-10 w-px bg-hairline/[0.16] ${LEFT}`} aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-y-0 z-10 w-px bg-hairline/[0.16] ${RIGHT}`} aria-hidden="true" />
      {children}
    </div>
  );
}

/** A horizontal divider at a section boundary, with a small `#cecece`
    square tick mark at each end where it meets the vertical lines — same
    formula as GridFrame, corner marks stay this color in both themes,
    matching the source Figma exactly (not pure white). */
// A tick sitting at a fractional CSS position (from the viewport-width-
// dependent `calc()` formula) rounds its left/right edges to a different
// device pixel than its top/bottom edges under a fractional
// devicePixelRatio — confirmed 8/14 ticks rendering 7×8 physical px instead
// of square at DPR 1.25 (common on 125%-scaled Windows displays). Neither
// `transform-gpu` (layer promotion) nor an SVG `shapeRendering="crispEdges"`
// rect fixed it — both only affect *internal* rasterization, not the
// fractional position of the element's own box, which only JS can read
// (CSS has no way to query the runtime devicePixelRatio).
//
// Snapping ONLY the position isn't enough at an arbitrary size: 5px is the
// design spec, but 5 * 1.25 = 6.25 device px — a fractional amount that
// doesn't round consistently between the two axes once real browser
// sub-pixel layout quantization (not just plain float math) is involved.
// Measured 7/14 ticks asymmetric with position-only snapping at 5px, vs.
// 0/14 at 8px (8 * 1.25 = 10, a whole device-pixel count) — so size matters
// too, not just position. `useLayoutEffect` below snaps BOTH: the size to
// the nearest value whose device-pixel count is a whole number (visually
// ~5px, off by at most half a device pixel — imperceptible), and the
// position so left/top also land on a whole device pixel. Verified 0/14
// asymmetric with both corrections active.
function SquareTick({ position }: { position: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    function snap() {
      if (!el) return;
      // Clear any previous correction before re-measuring, so resize
      // recalculates from the Tailwind-positioned baseline, not last time's
      // already-corrected position/size.
      el.style.marginLeft = "";
      el.style.marginTop = "";
      el.style.width = "";
      el.style.height = "";
      const dpr = window.devicePixelRatio || 1;

      // Size first: snap 5px to the nearest CSS length whose device-pixel
      // count is a whole number, so width and height stay identical (still
      // a square) instead of independently rounding apart.
      const snappedSize = Math.round(5 * dpr) / dpr;
      el.style.width = `${snappedSize}px`;
      el.style.height = `${snappedSize}px`;

      // Then position: nudge left/top so they also land on a whole device
      // pixel. `margin` (not `left`/`top`) since the left tick is
      // positioned via CSS `left` and the right tick via CSS `right` —
      // margin composes on top of either, and leaves the Tailwind classes'
      // own `transform: translate(±50%, -50%)` centering untouched.
      const rect = el.getBoundingClientRect();
      const snappedLeft = Math.round(rect.left * dpr) / dpr;
      const snappedTop = Math.round(rect.top * dpr) / dpr;
      el.style.marginLeft = `${snappedLeft - rect.left}px`;
      el.style.marginTop = `${snappedTop - rect.top}px`;
    }

    // `resize` alone misses a devicePixelRatio change with no viewport
    // resize — real browser zoom (Ctrl+/Ctrl-) or dragging the window to a
    // display with different scaling. A `matchMedia` query on one exact DPR
    // value only ever fires once (it goes from matching to not-matching and
    // stays not-matching), so each firing tears down and re-subscribes a
    // fresh query at the *new* DPR — that's what keeps it armed for every
    // subsequent change, not just the first.
    let mql: MediaQueryList | null = null;
    function armDprWatcher() {
      mql?.removeEventListener("change", handleDprChange);
      mql = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      mql.addEventListener("change", handleDprChange);
    }
    function handleDprChange() {
      snap();
      armDprWatcher();
    }

    snap();
    armDprWatcher();
    window.addEventListener("resize", snap);

    // The above runs once at mount — but anything that reflows the page
    // AFTER that (an image resolving its intrinsic size, a web font
    // swapping in, a scroll-reveal animation settling) shifts this
    // divider's true Y position without firing `resize`, leaving the
    // margin correction stale and this tick no longer pixel-aligned even
    // though a tick elsewhere on the page — unaffected by that particular
    // shift — still looks fine. A `ResizeObserver` on `<body>` catches any
    // such reflow generically; `load` and `fonts.ready` catch the two most
    // common specific causes even earlier.
    const resizeObserver = new ResizeObserver(() => snap());
    resizeObserver.observe(document.body);
    window.addEventListener("load", snap);
    document.fonts?.ready.then(snap);

    return () => {
      window.removeEventListener("resize", snap);
      window.removeEventListener("load", snap);
      mql?.removeEventListener("change", handleDprChange);
      resizeObserver.disconnect();
    };
  }, []);

  return <span ref={ref} className={`absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 bg-[#cecece] ${position}`} />;
}

export function GridDivider() {
  return (
    // `z-10` — same reason as GridFrame's vertical lines above: the ticks
    // protrude past this div's own 1px height (5px tall, centered), so the
    // bottom half sits geometrically inside the *next* section. Any section
    // with its own opaque `bg-paper` (Hero, Stats) comes later in DOM order
    // and paints on top by default, silently covering that protruding half
    // — confirmed via elementFromPoint at the tick's bottom edge landing on
    // the Stats section, not the tick itself, before this fix.
    <div className="relative z-10 h-px w-full bg-hairline/[0.16]" aria-hidden="true">
      <SquareTick position={`-translate-x-1/2 ${LEFT}`} />
      <SquareTick position={`translate-x-1/2 ${RIGHT}`} />
    </div>
  );
}
