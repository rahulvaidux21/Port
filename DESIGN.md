---
version: beta
name: Rahul Vaid Portfolio
description: A dark-first, blue-accented portfolio design system — a faithful implementation of Rahul's own Figma design ("Portfolio Landing Page_Final"), built with his real content, photo, and work history.
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
  accent:
    default: "#0055fe"
    border: "#3578ff"
    glow: "#032d81 (dark) / #d1e0ff (light)"
    foreground: "#ffffff"
    role: "The site's one deliberate color moment — CTA buttons, active carousel arrows, testimonial card border/shadow, and the diffuse glow blobs behind the Experience and CTA cards. Pulled exactly from the source Figma, not an original choice this time."
  note: "editor-border is a separate token from hairline. The case-study detail template (app/case-studies/[slug]) still relies on editor-border at full opacity and was NOT touched by the Figma rebuild — hairline exists so the new landing-page components can match Figma's translucent off-white dividers without changing the case-study template's borders."
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
    role: "Case-study detail template's statement headline/pull-quotes only — untouched by this rebuild."
  instrumentSerif:
    family: "Instrument Serif italic (var(--font-instrument-serif))"
    role: "The exact accent typeface from the Figma source — one italic word inside every landing-page section heading (\"Things *I've designed*\", \"Experience *I have*\", \"Collaboration *in their words*\", \"Your story, *well designed.*\")."
rounded:
  pill: "9999px"
  card: "0.75rem (rounded-xl) — matches the Figma source's 12px card radius"
  section: "2rem"
spacing:
  sectionY: "5rem (py-20, py-28 on md+)"
  pageX: "1.5rem (px-6, px-8 on md+)"
  contentMax: "1400px (landing page) — wider than the previous 1140px, matching the Figma frame's 1440px canvas"
  navMax: "720px — the floating pill nav"
motionStack:
  framerMotion: "Section/card reveal-on-scroll (useRevealOnScroll)."
  gsapSplitText: "Hero headline — splits into words, masks, and drops in on load."
  cssTicker: "Hero's giant background name-wordmark, and the TrustedByMarquee logo strip — slow, continuous horizontal marquees (CSS animation, not scroll-linked)."
  lenis: "Global smooth-scroll, ticked through GSAP's ticker (see components/SmoothScroll.tsx). Entirely skipped under prefers-reduced-motion — native scroll takes over."
  swiper: "ProjectsCarousel, MoreWork, and TestimonialsCarousel — each a Swiper instance with prev/next arrow buttons + dot pagination."
components:
  button:
    shape: "rounded-lg (8px), not pill — matches the Figma source"
    fill: "solid bg-accent / text-accent-foreground with a colored glow shadow for primary actions; translucent bordered outline for secondary"
  card:
    shape: rounded-xl
    border: "hairline/16 (landing page) or editor-border (case-study template)"
    glow: "Experience and CTA cards carry three blurred accent-glow blobs behind their content, matching the Figma source exactly"
---

# Design System — Rahul Vaid Portfolio

## Overview

The landing page is a direct implementation of Rahul's own Figma file (frame "Portfolio Landing Page_Final", file "MoTA-Survey-App", page "Dump") — pulled section-by-section via the Figma MCP `get_design_context` tool, not eyeballed from screenshots. Real content throughout:

- **Real project screenshots** for the three featured case studies (IRCTC App Redesign, UX4G Design System 3.0, Survey Setu App), plus real company/ministry logos in the trusted-by marquee and Experience timeline.
- **Real resume copy** in the Experience section (Netoyed, Skillfoundry, UnBoxing Community) — reused verbatim from Rahul's own Figma copy.
- **No fabricated testimonial identities** — the Figma source's testimonial cards used Aluro-template stock photos and fictional names (Elise K., Daniel M., Lila R.); those were replaced with the site's existing real, role-attributed illustrative quotes inside the same card visual design.
- **No Services/pricing section** — the source Figma frame doesn't have one; it goes straight from the trusted-by marquee into the work carousels.

The case-study detail template (`app/case-studies/[slug]`) was **not** part of this rebuild's scope — it keeps its own layout, `editor-border` token, and Piazzolla accent untouched.

## Page structure (top to bottom)

1. **Navbar** — floating pill, avatar-as-home-link, Work/Experience/Testimonials, theme toggle, solid blue Contact button.
2. **Hero** — ticker wordmark background, 3-photo fanned print-stack portrait, headline below.
3. **TrustedByMarquee** — real ministry/company logos, grayscale, ticking marquee.
4. **ProjectsCarousel** ("Things I've designed") — the 3 primary case studies with real screenshots.
5. **MoreWork** ("More work") — NIRI Platform (real screenshot), SALONX and UnBoxing Community (color-block fallback, no screenshot available yet).
6. **Experience** ("Experience I have") — glow-card timeline, 3 real roles.
7. **TestimonialsCarousel** ("Collaboration in their words") — glow-bordered active card, real illustrative quotes.
8. **CtaBand** ("Your story, well designed.") — glow card, Let's Connect / View Case Studies.
9. **Footer** — avatar, tagline, real social icons (LinkedIn/Behance/Gmail/Medium), Links column, copyright, bottom glow bar.

`GridFrame`/`GridDivider` wrap the whole `<main>` with edge-to-edge vertical guide lines and horizontal section dividers (small square tick marks), matching the Figma source's own grid overlay.

## Do's and Don'ts

**Do**
- Keep every claim on the page traceable to something real — case-study results, experience copy, and trusted-by logos are all sourced from Rahul's actual work, not invented.
- Pair every animation with a `prefers-reduced-motion` fallback that's a complete alternate state, not just "animation off."
- Use `hairline` (not `editor-border`) for any new landing-page divider/border that should match the Figma source's translucent off-white lines.

**Don't**
- Don't touch the case-study detail template's layout, `editor-border` usage, or Piazzolla accent as a side effect of landing-page work.
- Don't reintroduce the fictional Aluro-template testimonial names/photos — the real, role-attributed quotes are the source of truth.
- Don't add a Services/pricing section back in — the source Figma design doesn't have one.
