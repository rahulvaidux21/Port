/**
 * Positions an element flush with the true vertical grid line, from INSIDE
 * a `max-w-[1032px] mx-auto` section (i.e. relative to that section's own
 * box, which is the nearest positioned ancestor for things like carousel
 * edge-fades and the marquee's edge-fades — not the true viewport).
 *
 * `left-0` on such an element is only correct at desktop widths, where the
 * section's own centering margin already coincides with the grid line
 * (confirmed: section edge ≈ line position within scrollbar rounding). On
 * mobile/tablet the section collapses to full-width (its own edge is x=0)
 * while the line stays at a fixed 24px/32px floor — so `left-0` overshoots
 * the line by exactly that floor.
 *
 * Derivation: let X = 50vw - 516 (516 = 1032/2, so X is how far the grid
 * line's desktop formula sits from center). The line's true position is
 * `max(floor, X)`; the section's own edge offset is `max(0, X)`. The value
 * needed here is the difference between them, which simplifies to
 * `max(0, floor - max(0, X))` — 24/32px on mobile, 0 at desktop, and a
 * smooth transition through the narrow band in between.
 */
export const EDGE_LEFT =
  "left-[max(0px,20px_-_max(0px,calc(50vw_-_516px)))] md:left-[max(0px,32px_-_max(0px,calc(50vw_-_516px)))]";
export const EDGE_RIGHT =
  "right-[max(0px,20px_-_max(0px,calc(50vw_-_516px)))] md:right-[max(0px,32px_-_max(0px,calc(50vw_-_516px)))]";

/**
 * A solid (non-gradient) opaque width spanning from a section's true edge
 * (x=0, where `w-screen`/full-bleed content like the Hero ticker or the
 * TrustedByMarquee logo track is actually clipped) up to the true grid
 * line. Needed alongside `EDGE_LEFT`/`EDGE_RIGHT`'s gradient fade, not
 * instead of it: that fade starts AT the line and dissolves further
 * *inward* — it was never meant to cover the sliver *before* the line, and
 * doesn't, so full-bleed content sitting in that sliver (unlike carousel
 * cards, which never reach it) stays visibly unmasked. This width is
 * exactly that sliver's size — 0 at desktop (edge already ≈ the line), the
 * 20/32px floor on mobile/tablet — so a plain `bg-paper` block of this
 * width at `left-0`/`right-0` fully hides it, then the existing gradient
 * fade continues the dissolve from the line inward.
 */
export const MASK_LEFT_WIDTH = "w-[max(20px,calc(50%_-_516px))] md:w-[max(32px,calc(50%_-_516px))]";
export const MASK_RIGHT_WIDTH = MASK_LEFT_WIDTH;
