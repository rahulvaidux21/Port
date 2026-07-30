---
version: beta
name: Rahul Vaid Portfolio
description: A dark-first, blue-accented portfolio design system — a faithful implementation of Rahul's own Figma design ("Portfolio Landing Page_Final", file "MoTA-Survey-App", page "Dump"), built with his real content, photo, and work history, and kept in sync with that Figma file as it evolves.
colors:
  light:
    paper: "#ffffff"
    surface: "#f5f6f7"
    textPrimary: "#0b0c0e"
    textSecondary: "#4b4f57"
    textMuted: "#7a7f87"
    editorBorder: "#e3e4e7"
    hairline: "#0b0c0e (used only with an opacity modifier — /8, /16, /32)"
  dark:
    paper: "#0b0c0e"
    surface: "#17181b"
    textPrimary: "#f6f3f0"
    textSecondary: "#c2c2c2"
    textMuted: "#7e7e7e"
    editorBorder: "#24262b (case-study template only, see Note below)"
    hairline: "#f6f3f0 (used only with an opacity modifier — /8, /16, /32)"
    default: true
  accent:
    default: "#0055fe"
    border: "#3578ff"
    glow: "#032d81 (dark) / #d1e0ff (light)"
    foreground: "#ffffff"
    role: "The site's one deliberate color moment — CTA buttons, active carousel arrows, testimonial card border/shadow, and the diffuse glow blobs behind the Experience and CTA cards. Pulled exactly from the source Figma."
  gridTick: "#cecece — the small square marks at every grid-line/divider intersection (see Grid system below); a distinct, slightly gray value, not pure white."
  note: "editor-border is a separate token from hairline. The case-study detail template (app/case-studies/[slug]) still relies on editor-border at full opacity and is NOT part of the Figma-synced landing page — hairline exists so landing-page components can match Figma's translucent off-white dividers without changing the case-study template's borders. Dark is the default theme (an anti-flash inline script in layout.tsx adds the `dark` class before paint unless localStorage says \"light\"); the Navbar's sun/moon toggle switches between the two and persists the choice."
typography:
  sans:
    family: "DM Sans (Google Fonts, free)"
    role: "Every heading and body element site-wide — one family, not a display/body pair."
    weights: [400, 500, 700]
  mono:
    family: "Geist Mono (var(--font-geist-mono))"
    role: "Small uppercase-tracked labels/captions only."
  serif:
    family: "Piazzolla (var(--font-piazzolla))"
    role: "Case-study detail template's statement headline/pull-quotes only — outside the landing-page rebuild's scope."
  instrumentSerif:
    family: "Instrument Serif italic (var(--font-instrument-serif))"
    role: "The exact accent typeface from the Figma source — one italic word inside every landing-page section heading (\"Things *I've designed*\", \"Experience *I have*\", \"Collaboration *in their words*\", \"Your story, *well designed.*\")."
rounded:
  pill: "9999px"
  card: "0.75rem (rounded-xl) — matches the Figma source's 12px card radius"
  section: "2rem"
spacing:
  sectionY: "5rem (py-20, py-28 on md+)"
  contentMax: "1032px — the shared centered content width every section's padding and the vertical grid lines are both derived from (see Grid system)"
  navMax: "574px — the floating pill nav"
gridSystem:
  lineFormula: "left/right-[max(FLOOR, calc(50% - 516px))] — 516 = 1032/2, so this is exactly a centered 1032px box's edge once the viewport is wide enough, falling back to a flat FLOOR (20px mobile, 32px md+) below that. One continuous formula, not discrete breakpoints, so lines and every section's own content edge stay in sync at every width, not just at breakpoints."
  tick: "5px (arbitrary CSS length) square, #cecece, at every grid-line/divider intersection, snapped in JS to the nearest device-pixel-exact size and position (see components/GridFrame.tsx) — plain CSS alone can't guarantee a small square renders as an exact square under a fractional devicePixelRatio (e.g. 1.25, common on 125%-scaled Windows displays)."
  hardClip: "GridFrame's outer wrapper uses overflow-x-clip as a backstop so nothing can ever visually render past the lines, regardless of any individual component's own positioning math."
  contentInset: "Section content sits inset from the grid line itself, not flush against it, at every breakpoint — an intentional ~12–16px gap so text/interactive content never touches the line. The one deliberate exception is decorative full-bleed elements (carousel edge-fade gradients, Hero's background wordmark ticker) which are meant to dissolve into/touch the line, using a shared EDGE_LEFT/EDGE_RIGHT + solid-mask pair (lib/gridEdge.ts) rather than the section's own padding."
motionStack:
  framerMotion: "Section/card reveal-on-scroll (useRevealOnScroll)."
  gsapSplitText: "Hero headline — splits into words, masks, and drops in on load."
  heroParallax: "Vanilla-JS mouse-move parallax + tilt on the Hero's 3 stacked portrait cards (components/Hero.tsx) — no library. Each card lerps toward the cursor's normalized position inside a single requestAnimationFrame loop, each with its own lerp factor and max offset/tilt (front card fastest and largest, back card slowest and smallest), so the stack drifts like a staggered group instead of one rigid unit. Transform order is translate3d() then rotate() — reversed, rotation pivots around the image's original center while already translated, causing a lopsided swinging-arc distortion. Fully skipped under prefers-reduced-motion."
  cssTicker: "Hero's giant background name-wordmark — a slow, continuous horizontal marquee (CSS animation, not scroll-linked)."
  lenis: "Global smooth-scroll, ticked through GSAP's ticker (see components/SmoothScroll.tsx). Entirely skipped under prefers-reduced-motion — native scroll takes over."
  infiniteCarousel: "ProjectsCarousel, MoreWork, and TestimonialsCarousel — each a Swiper instance driven by a shared lib/useInfiniteCarousel.ts hook, not Swiper's own `loop` mode (confirmed unreliable — corrupts slide position under centeredSlides + few real slides). The hook repeats the real slide list 6x and silently recenters once a swipe crosses into the outer repeats, so it scrolls forever (2,3,4,1,2,3,4,1,...) with no visible seam. ProjectsCarousel additionally switches to a true single-card view below the sm breakpoint (native Swiper clipping restored, no peek of neighboring cards) rather than the desktop/tablet peek-and-dissolve design."
components:
  button:
    shape: "rounded-lg (8px), not pill — matches the Figma source"
    fill: "solid bg-accent / text-accent-foreground with a colored glow shadow for primary actions; translucent bordered outline for secondary"
  card:
    shape: rounded-xl
    border: "hairline/16 (landing page) or editor-border (case-study template)"
    glow: "Experience and CTA cards carry three blurred accent-glow blobs behind their content, matching the Figma source exactly"
  gridFrame:
    file: "components/GridFrame.tsx"
    role: "Wraps Navbar + <main> + Footer with the two full-height vertical guide lines and exports GridDivider (horizontal section-boundary line + corner tick marks) — see gridSystem above."
---

# Design System — Rahul Vaid Portfolio

## Overview

The landing page is a direct implementation of Rahul's own Figma file (frame "Portfolio Landing Page_Final", file "MoTA-Survey-App", page "Dump") — pulled section-by-section via the Figma MCP `get_design_context` tool, not eyeballed from screenshots, and re-synced from that same file as Rahul continues editing it (most recently: a new divider between the nav and Hero, and corrected tick-mark color/size). The trusted-by logo marquee that originally sat below the Hero has since been replaced with the Stats band (see Page structure below) — a deliberate divergence from the current Figma frame, at the user's direction. Real content throughout:

- **Real project screenshots** for the three featured case studies (IRCTC App Redesign, UX4G Design System 3.0, Survey Setu App), plus real company/ministry logos in the Experience timeline.
- **Real resume copy** in the Experience section (Netoyed, Skillfoundry, UnBoxing Community) — reused verbatim from Rahul's own Figma copy.
- **No fabricated testimonial identities** — quotes are attributed by role, not name, and the section intro says outright that they're illustrative until real quotes are collected.
- **No Services/pricing section** — the source Figma frame doesn't have one; it goes straight from the Stats band into the work carousels.

The case-study detail template (`app/case-studies/[slug]`) is **not** part of this Figma-sync scope — it keeps its own layout, `editor-border` token, and Piazzolla accent untouched.

## Page structure (top to bottom)

1. **Navbar** — floating pill, avatar-as-home-link, Work/Experience/Testimonials, theme toggle, solid blue Contact button. Sticky, `top-4`.
2. **New nav→Hero divider** — a `GridDivider` 24px below the nav's actual visual bottom edge (not its reserved layout space — the nav's `sticky top-4` offset means those two are 16px apart, which the spacer compensates for). Added to match the latest Figma update; wasn't present in the original rebuild.
3. **Hero** — ticker wordmark background, 3-photo fanned print-stack portrait with mouse-move parallax/tilt, headline, CTA. Vertical spacing is deliberately compressed so the CTA sits above the fold at realistic viewport heights (a laptop browser with toolbar chrome, not just a tall phone screen), not just on generously tall screens.
4. **Stats** — a compact 4-number band (`lib/data.ts`'s `stats`) replacing the old trusted-by logo marquee. Every value traces to a fact already stated elsewhere on the page (a case-study result, the Experience timeline's span, the real organization count) — never a number invented just for this section, per the "real evidence over invented metrics" principle in PRODUCT.md.
5. **ProjectsCarousel** ("Things I've designed") — the 3 primary case studies with real screenshots + the eBCAS placeholder card. Single-card view on mobile, peek-and-dissolve on tablet/desktop.
6. **MoreWork** ("More work") — NIRI (real screenshot), SALONX and UnBoxing Community (color-block fallback), plus 5 Behance-sourced explorations linking out to their real case studies there.
7. **Experience** ("Experience I have") — glow-card timeline, 3 real roles.
8. **TestimonialsCarousel** ("Collaboration in their words") — glow-bordered active card, 8 role-attributed illustrative quotes.
9. **CtaBand** ("Your story, well designed.") — glow card, Let's Connect / View Case Studies.
10. **Footer** — avatar, tagline, real social icons (LinkedIn/Behance/Gmail/Medium), Links column, copyright, bottom glow bar. Structured as a single `mx-auto max-w-[1032px]` box with padding on that same element (matching every other section, including CtaBand) — an earlier two-layer version (padding on the outer `<footer>`, a separately-centered inner box) silently canceled that padding out at desktop widths.

`GridFrame`/`GridDivider` wrap the whole `<main>` (plus Navbar and Footer) with edge-to-edge vertical guide lines and horizontal section dividers with corner tick marks — see `gridSystem` above for the exact formula and why it needs JS-level pixel snapping, not just CSS.

## Do's and Don'ts

**Do**
- Keep every claim on the page traceable to something real — case-study results, experience copy, and trusted-by logos are all sourced from Rahul's actual work, not invented.
- Pair every animation with a `prefers-reduced-motion` fallback that's a complete alternate state, not just "animation off."
- Use `hairline` (not `editor-border`) for any new landing-page divider/border that should match the Figma source's translucent off-white lines.
- Re-check the live Figma file before making layout/spacing changes to synced components — it's actively edited, and past assumptions about it (e.g. "the ticker clips at the grid line, not the viewport edge") have turned out stale or simply wrong more than once.
- When two elements are supposed to align (e.g. a card's edge and the vertical grid line), verify with real `getBoundingClientRect()` measurements at multiple viewport widths, not a single screenshot — several past bugs in this codebase only showed up between breakpoints or at specific device-pixel ratios.

**Don't**
- Don't touch the case-study detail template's layout, `editor-border` usage, or Piazzolla accent as a side effect of landing-page work.
- Don't reintroduce fabricated testimonial names/photos — role-attributed, explicitly-flagged-as-illustrative quotes are the source of truth until real ones exist.
- Don't add a Services/pricing section back in — the source Figma design doesn't have one.
- Don't rely on Swiper's own `loop` mode for any carousel — use the shared `useInfiniteCarousel` hook; native loop mode has confirmed slide-position corruption in this setup.
- Don't add horizontal padding to a section's outer wrapper expecting it to move a separately `mx-auto`-centered inner box — at desktop widths the centering math cancels the outer padding out completely (see the Footer entry above). Pad the centered box directly.
