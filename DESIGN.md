---
version: alpha
name: Rahul Vaid Portfolio
description: A warm, paper-and-plastic "stationery" design system for a UI/UX designer's portfolio — evidence-first case studies over marketing gloss.
colors:
  paper:
    light: "#faf8f5"
    dark: "#18181a"
  surface:
    light: "#ffffff"
    dark: "#262624"
  textPrimary:
    light: "#1c1917"
    dark: "#f5f5f4"
  textSecondary:
    light: "#57534e"
    dark: "#b4b0aa"
  textMuted:
    light: "#78716c"
    dark: "#a8a29e"
  editorBorder:
    light: "#e7e5e4"
    dark: "#3a3936"
  accent:
    light: "#d97706"
    dark: "#f0b94d"
  badge:
    light: "#1c1917"
    dark: "#2a2419"
  bandBg:
    light: "#f1ebe4"
    dark: "#211f1a"
  bandBorder:
    light: "#c7bca8"
    dark: "#3d382c"
typography:
  sans:
    family: "Geist Sans (var(--font-geist-sans))"
    role: "All UI text — headings, body, labels, buttons"
  mono:
    family: "Geist Mono (var(--font-geist-mono))"
    role: "Metadata, timestamps, small uppercase-tracked labels, ruler ticks"
  serif:
    family: "Piazzolla (var(--font-piazzolla))"
    role: "Case-study statement headlines only — the one deliberate accent pairing against the sans/mono system"
    weights: [500, 600]
    styles: [normal, italic]
rounded:
  pill: "9999px"
  card: "1rem"
  cardLg: "1.5rem"
  section: "2rem"
  flat: "0px"
spacing:
  sectionY: "5rem (py-20, py-28 on md+)"
  pageX: "1.5rem (px-6, px-8 on md+)"
  contentMax: "1140px"
  sectionIntroMax: "42rem (max-w-2xl)"
  navMax: "1400px"
components:
  button:
    shape: pill
    fill: text-primary bg / paper text
  chip:
    shape: pill
    border: editor-border
  card:
    shape: rounded-2xl or rounded-[2rem]
    border: editor-border
    elevation: shadow-lg or flat
---

# Design System — Rahul Vaid Portfolio

## Overview

This is a personal portfolio built as a warm, tactile "stationery" object rather than a glossy SaaS landing page: dot-grid textures, ruler-tick measurements, a lanyard ID badge, and a pendant lamp used as the dark-mode toggle all share one physical-object visual language. The palette is a muted cream-paper base with a single warm amber accent — deliberately desaturated so the three case-study accent colors (terracotta, muted blue, sage) can carry their own identity without competing for attention. The emotional target is *grounded confidence*: the design should read as evidence-first and quietly playful, never as marketing gloss or invented flash.

## Colors

**Paper** (`--color-paper`) is the page background — off-white cream in light mode, near-black in dark mode — layered with a faint two-axis line-grid (`--grid-line`) to read as graph/engineering paper rather than a flat void.

**Surface** (`--color-surface`) is pure white (light) / warm charcoal (dark), used for cards sitting on top of paper: testimonial cards, the mobile nav dropdown, tooltips.

**Text** uses a three-step scale — `text-primary` for headings and high-emphasis copy, `text-secondary` for body copy, `text-muted` for captions/timestamps/labels — each with its own light/dark value rather than a single color at different opacities.

**Accent** (`--color-accent`, amber `#d97706` light / warmer gold `#f0b94d` dark) is used sparingly: the speech-bubble border, focus rings, selection color, and detail-label colors inside case studies (each case study also gets its own muted HSL accent pair — `color`/`colorDark` — for its visual panel, kept desaturated so it sits inside the paper palette rather than reading as a bright marketing gradient).

**Purpose-built surface tokens** exist for two recurring "object" components rather than reusing generic surface colors: `--color-badge` (the ID badge's plastic, brass-trimmed in dark mode) and `--color-band-bg`/`--color-band-border` (the cream "printed strip" bands — the value-chips marquee and the Experience frame). Both get genuinely different values per theme, not just an inverted lightness — dark mode is a designed second state.

Gradients are avoided as decoration: the case-study visual panels use a solid brand color, not a gradient; the speech-bubble border is a solid accent stroke, not a moving gradient ring.

## Typography

Two-family system with one deliberate third-family accent:

- **Geist Sans** carries everything — hero headline, section headings, body copy, buttons, nav. Headings are bold, sized on a fluid scale (`text-3xl` → `sm:text-4xl` → `md:text-5xl` for the hero `h1`; `text-3xl md:text-4xl` for section `h2`s).
- **Geist Mono** is reserved for metadata: case-study wordmarks and discipline labels, detail-block labels ("Problem" / "Solution" / "Result"), ruler-tick numerals, footer copyright/credit lines — always small (9–13px), uppercase, wide letter-spacing.
- **Piazzolla** (serif, italic) is used in exactly one place: the case-study statement headline inside each project card. It's a single-purpose contrast accent against the sans/mono system, not a site-wide type change — introducing it more broadly would dilute the pairing's impact.

## Layout

Content is capped at three widths depending on purpose: `max-w-[1400px]` for the nav bar, `max-w-2xl` for centered section intros (speech bubble + heading + one-line description), and `max-w-[1140px]` for main section content (project cards, the Experience frame). Page padding is `px-6` (mobile) stepping to `px-8` at `md`. Sections use a generous, consistent vertical rhythm — `py-20` stepping to `py-28` at `md` — so the page reads as a slow, single-column scroll rather than a dense dashboard.

Hero and value-chips share the first viewport height deliberately (`min-h-[calc(100svh-92px)]`) so the "what I bring" strip is visible without scrolling.

## Elevation & Depth

Depth is mostly conveyed through borders and layering, not heavy shadow — most cards sit flat with a 1px `editor-border` rather than a drop shadow. Shadow is reserved for objects that are meant to feel physically present: `shadow-lg` on the stacked, sticky-scrolling project cards (which visually overlap as you scroll, reinforcing a "stack of papers" metaphor via z-index rather than shadow depth); `shadow-2xl` on the device-frame mockups inside case studies (phone/browser chrome resting on the colored panel); `shadow-inner` on the ID badge's fabric loop for a stitched, tactile dent. Flat sections (the value-chips band) intentionally skip both radius and shadow to read as a printed strip, not a floating card.

## Shapes

Two shape families coexist on purpose: **pills** (`rounded-full`) for anything clickable or chip-like — nav links, buttons, tags, the marquee chips — and **soft-rounded rectangles** for containers, on an escalating scale: `rounded-xl` (photo panels, browser-frame chrome), `rounded-2xl` (badge holder, testimonial cards, mobile dropdown), `rounded-[1.75rem]` (phone-frame device mockups), `rounded-[2rem]` (project cards, the Experience frame — the largest radius, reserved for the biggest "resting object" containers). The one deliberate flat exception is the value-chips band (`rounded-none`), styled like a printed strip rather than a card.

## Components

- **Buttons**: pill-shaped, solid `text-primary`-on-`paper` fill, a small leading status dot (pulsing) on the two "Let's Connect" CTAs.
- **Chips / marquee strip**: pill chips inside a flat cream band, auto-scrolling (`animate-marquee`, duplicated content for a seamless loop), with a static wrapped fallback under reduced motion.
- **Speech bubble**: a small pill callout with a solid accent-color border — no gradient, no tail — used as a recurring "kicker" above section headings.
- **ID badge**: a physical lanyard object — strap, stitched loop, badge holder with diagonal glare — that drops in from above the frame on load (tangled, then straightens, then idles with a gentle sway), positioned beside the logo in the nav and re-centered on mobile.
- **Lamp toggle**: the dark-mode switch is a pendant-lamp photo; hovering sways it gently, and switching to dark mode "turns it on" — a warm glow anchored at the shade's open bottom edge, plus a filter-based bulb-brightening effect.
- **Project cards**: sticky-stacked case-study cards, each split into a content half (metadata row, serif statement headline, description, compact problem/solution/result) and a solid-color visual half (device-frame mockup(s) — phone chrome for mobile apps, browser chrome for web platforms — with a small dot-cluster accent at the card's outer corners).
- **Testimonial cards**: same auto-scrolling marquee treatment as the value chips, for visual consistency between the two "strip" components.
- **Experience frame**: a thick bordered cream frame with a dot-grid texture and ruler-tick rulers along the top/left edges, floating with a slow bob animation, containing stacked experience entries.
- **Footer social icons**: bracket-text (`{LinkedIn}`) that swaps to a lucide icon on hover.

## Do's and Don'ts

**Do**
- Keep every case-study claim traceable to something real; if content is illustrative (like the current testimonials), say so rather than presenting it as verified.
- Pair every animation with a `prefers-reduced-motion` fallback that's a complete alternate layout, not just "animation off."
- Keep all icons on `lucide-react` — no hand-drawn SVG paths, no second icon package, even for marks Lucide doesn't have natively (pick the closest semantic icon instead).
- Give dark mode its own designed values for purpose-built surfaces (the ID badge, the cream bands) instead of just inverting lightness.
- Reuse the existing "stationery" motifs (dot-grid, ruler ticks, marquee strips) when a new section needs texture, rather than inventing a new decorative language per section.

**Don't**
- Don't add gradients as decoration (gradient text, moving gradient borders, gradient panel fills) — the system deliberately uses solid colors.
- Don't introduce a second display/serif font — Piazzolla's role is intentionally narrow (case-study statement headlines only); broader use would blunt the contrast.
- Don't invent metrics, quotes, or outcomes for case studies. If real data isn't available yet, mark content as illustrative in a code comment, as the testimonials already are.
- Don't add a floating/bordered container around the top nav — it was deliberately removed in favor of an inline, borderless bar.
- Don't reach for heavy drop shadows as a default; shadow is reserved for objects meant to feel physically "resting" on the page (device frames, stacked cards), not general-purpose card elevation.
