---
name: Rahul Vaid — Portfolio
description: Product/UI/UX designer portfolio. Precise, ambitious, grounded, warm.
colors:
  ember: "#BD4D28"
  ember-light: "#D47454"
  ember-muted: "#FAEEEB"
  ink: "#1F1B19"
  archive-warm: "#FAF8F4"
  parchment: "#F4F0EC"
  cloud: "#FDFDFC"
  stone: "#F0EDEA"
  graphite: "#796D67"
  linen: "#E3DED9"
  coal: "#141211"
  chalk: "#F7F4F3"
  charcoal: "#1C1A18"
  shadow-surface: "#232120"
  ash: "#333130"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 8rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
    fontVariation: "'opsz' 96, 'wdth' 100"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  full: "9999px"
spacing:
  xs: "0.375rem"
  sm: "0.75rem"
  md: "1.5rem"
  lg: "2rem"
  section: "clamp(4rem, 10vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.archive-warm}"
    rounded: "{rounded.full}"
    padding: "0.875rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.archive-warm}"
    rounded: "{rounded.full}"
    padding: "0.875rem 1.5rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0.875rem 1.5rem"
  button-outline-hover:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0.875rem 1.5rem"
  chip:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.full}"
    padding: "0.375rem 0.875rem"
  chip-hover:
    backgroundColor: "{colors.ember-muted}"
    textColor: "{colors.ember}"
    rounded: "{rounded.full}"
    padding: "0.375rem 0.875rem"
  card:
    backgroundColor: "{colors.cloud}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "2rem"
  input:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.875rem 1rem"
  input-focus:
    backgroundColor: "{colors.cloud}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.875rem 1rem"
---

# Design System: Rahul Vaid — Portfolio

## 1. Overview

**Creative North Star: "The Design Review Table"**

This system is built around one physical image: sitting across from a thoughtful product designer during a design review. The table is clear. The work is on it. Every element in this portfolio exists because it helps the person across from you understand the thinking faster, not because it looks impressive. The visual language is the designer's handwriting: precise enough to be trusted, warm enough to be invited back.

The system rejects two failure modes with equal force. The first is the Dribbble gallery: beautiful screens stripped of context, device frames stacked in hero sections, metrics nowhere in sight. The second is the jargon audit: Double Diamond diagrams, empathy map screenshots, affinity cluster photos — process artifacts substituted for process evidence. Neither belongs at this table.

What belongs: clear hierarchy, warm neutrals, one purposeful accent, generous spacing that slows the eye just long enough to read, and case study content that leads with what changed because of the work. The tone is that of someone who has shipped at national scale and doesn't need to announce it.

**Key Characteristics:**
- Single variable-weight typeface, extreme weight contrast as the sole hierarchy driver
- Warm off-white ground with tonal layering instead of shadows
- One accent color (Ember) used sparingly as a signal, never as decoration
- Asymmetric left-aligned layouts — not centered stacks
- Motion is response, not choreography: state transitions only, expo-out easing throughout
- Accessibility is structural, not cosmetic: WCAG 2.1 AA in both themes

## 2. Colors: The Ember Palette

A warm monochromatic ground with a single committed accent. Ember appears on ≤10% of any given screen; its rarity is what gives it authority.

### Primary
- **Ember** (`#BD4D28` / `hsl(15 65% 45%)`): The sole accent. Section labels, CTA buttons, logo mark, active nav states, metric highlights in case studies, progress indicators. Used at full saturation only on text and small fills. Never as a large background wash.
- **Pale Ember** (`#FAEEEB` / `hsl(15 60% 95%)`): The accent's resting surface. Metric cards in case studies, chip hover state, tag backgrounds on hover. Always paired with an Ember text element nearby.
- **Ember Light** (`#D47454` / `hsl(15 60% 58%)`): Dark-mode variant of Ember. Slightly warmer and lighter to maintain contrast on the coal background.

### Neutral
- **Archive Warm** (`#FAF8F4` / `hsl(34 40% 97%)`): Page background in light mode. The deliberate warmth prevents clinical sterility without introducing color. Not white.
- **Cloud** (`#FDFDFC` / `hsl(34 30% 99%)`): Card and elevated surface background. Distinguishable from Archive Warm only through adjacency; the tonal difference is felt, not named.
- **Parchment** (`#F4F0EC` / `hsl(34 25% 94%)`): Secondary surface. Section backgrounds (`bg-muted/40`) for process and contact sections to create rhythm without borders.
- **Stone** (`#F0EDEA` / `hsl(30 18% 93%)`): Muted fills, tag backgrounds, input resting state.
- **Graphite** (`#796D67` / `hsl(20 8% 44%)`): Secondary text, captions, metadata, placeholder text in inputs.
- **Linen** (`#E3DED9` / `hsl(30 15% 87%)`): All borders and dividers. The system uses horizontal rules (`border-t`) extensively as section structure; Linen at this lightness creates rhythm without weight.
- **Ink** (`#1F1B19` / `hsl(20 12% 11%)`): Primary text and primary button fill. The warm undertone (H=20) keeps it from reading as cold black.

### Dark Mode Equivalents
- **Coal** (`#141211`): Page background. Warm-tinted dark, not neutral gray.
- **Charcoal** (`#1C1A18`): Card background.
- **Shadow Surface** (`#232120`): Elevated dark surface.
- **Ash** (`#333130`): Dark borders.
- **Chalk** (`#F7F4F3`): Primary text on dark.

### Named Rules
**The Ember Signal Rule.** Ember is never used as a background wash on any surface larger than a chip or badge. It is a signal color: it marks the thing worth looking at. A section where everything is Ember is a section where nothing is.

**The Warm Neutral Rule.** No token in this system is a pure gray. Every neutral is tinted toward H=20–34 (warm orange-brown). The visual difference from pure gray is imperceptible in isolation and immediately apparent in comparison. Never substitute `#f5f5f5` or `#111111` for the system tokens.

## 3. Typography

**Display / Body Font:** Bricolage Grotesque Variable (`opsz`, `wdth` axes), system-ui fallback.

**Character:** A single-family system. Bricolage Grotesque is not a neutral sans — it has structure and slight quirk in its display weights that reads as considered, not generic. The extreme weight contrast between the 800-weight display headings and 400-weight body creates hierarchy through mass alone, without needing a second typeface. At optical size 96 (display), letterforms tighten and gain authority. This is the system's primary expressive tool.

### Hierarchy
- **Display** (weight 800, `clamp(3.5rem, 9vw, 8rem)`, lh 0.95, ls -0.04em, opsz 96): Hero heading only. One per page. Tracking is deeply negative so letterforms compress into a single visual unit. Never used for section headings.
- **Headline** (weight 700, `clamp(1.75rem, 3.5vw, 3rem)`, lh 1.1, ls -0.025em): Section titles and case study titles. The primary reading-level heading.
- **Title** (weight 700, `clamp(1.25rem, 2.5vw, 2rem)`, lh 1.2, ls -0.02em): Project titles, accordion headings, resume role names.
- **Body** (weight 400, `1rem`, lh 1.625): All running copy. Max line length 65–75ch enforced via `max-w-prose`. Weight 400 only; never bold body copy except for inline `font-semibold` on named items.
- **Label** (weight 600, `0.75rem`, ls 0.1em, UPPERCASE): Section identifiers, field labels, metadata categories. The all-caps tracking pattern is reserved for labels only — never applied to headings or body text.

### Named Rules
**The Single Family Rule.** One typeface. Hierarchy comes from weight and scale contrast (ratio ≥1.25 between steps), not from pairing. Adding a second family breaks the system. The temptation to add a monospace for "technical credibility" is explicitly rejected — the brief calls out monospace-as-costume as an anti-pattern.

**The Label Ceiling Rule.** All-caps with wide tracking (`tracking-widest`) is used only for Labels (0.75rem). Never apply it to headings, subheadings, or any text above 0.875rem. Above that size, tracked uppercase reads as decorative, not informational.

## 4. Elevation

This system is **flat by default with tonal layering**. There are no drop shadows in the component library. Depth is conveyed through background color steps: Archive Warm → Stone → Parchment (descending contrast) and Cloud → Archive Warm (ascending lightness on hover). The border (`Linen`, 1px solid) is the primary surface boundary.

The single exception: Framer Motion's `whileHover: { scale: 1.01 }` on project mockup panels creates perceived lift through transform rather than shadow. This is a motion cue, not an elevation token.

In dark mode, the same principle applies. Coal → Charcoal → Shadow Surface provide the tonal steps.

### Named Rules
**The No-Shadow Rule.** No `box-shadow` on any component except `:focus-visible` outlines. If a surface needs to feel elevated, use a lighter background token and a Linen border. Shadows belong to productivity tools; this is a portfolio.

**The Flat-at-Rest Rule.** Components do not have hover shadows. Hover states use background tint shifts (`Stone` → `Archive Warm` on chips, opacity changes on buttons) and color transitions (`text-muted-foreground` → `text-foreground`). Motion-based lift (scale transform on project cards) is the highest elevation signal in the system.

## 5. Components

Components are calm, intentional, and dependable. They express quiet confidence through clear hierarchy, generous spacing, and restrained motion. Interactions are responsive but never flashy.

### Component Inventory

#### Page components — built (12 total)

| Component | File | Type | Notes |
|---|---|---|---|
| Navbar | `components/Navbar.tsx` | Global | Sticky, scroll-aware, mobile overlay, IntersectionObserver active-state |
| ThemeToggle | `components/ThemeToggle.tsx` | Global | SSR-safe mounted guard, next-themes |
| Hero | `components/sections/Hero.tsx` | Section | Display heading, stat bar 2×2→4-col, fade-up animations |
| About | `components/sections/About.tsx` | Section | 12-col grid (collapses to 1 on mobile), portrait placeholder |
| Skills | `components/sections/Skills.tsx` | Section | Pill chips, infinite CSS ticker strip |
| Projects | `components/sections/Projects.tsx` | Section | Inline SVG mockups keyed by `project.id`, alternating RTL at lg+ |
| CaseStudies | `components/sections/CaseStudies.tsx` | Section | AnimatePresence accordion, metrics 1→3 col |
| DesignProcess | `components/sections/DesignProcess.tsx` | Section | 5-step tab, key-animated detail panel |
| Testimonials | `components/sections/Testimonials.tsx` | Section | Directional slide carousel, AnimatePresence mode="wait" |
| Resume | `components/sections/Resume.tsx` | Section | Timeline: `grid-cols-[3.5rem_1fr]` mobile, `sm:grid-cols-12` desktop |
| Contact | `components/sections/Contact.tsx` | Section | Client-validated form, `setTimeout` placeholder for backend |
| Footer | `components/sections/Footer.tsx` | Section | 2→12 col grid, brand + link groups |

#### Reusable primitives — inline only, not yet extracted (2 needed)

These patterns are repeated verbatim across multiple components. They should be extracted into standalone files before the codebase grows further.

| Component | Used in | Priority |
|---|---|---|
| `SectionLabel` | All 10 section files (duplicated pattern) | High — extract before adding new sections |
| `AnimatedSection` | All 10 section files (duplicated Framer variants) | Medium — reduces motion boilerplate |

#### Required but not yet implemented (1)

| Requirement | Where needed | Source |
|---|---|---|
| `useReducedMotion` | Every animated component | PRODUCT.md Accessibility, AGENTS.md Always rules |

### Buttons
Buttons are pill-shaped (full radius). There are two variants and no others.

- **Shape:** Fully rounded (`border-radius: 9999px`). No exception.
- **Primary:** Ink fill (`#1F1B19`) with Archive Warm text. Padding `0.875rem 1.5rem`. This is the "Let's talk" and "View my work" button. The dark pill on a warm background is the highest-contrast CTA element in the system.
- **Primary Hover:** `opacity: 0.85` transition (200ms). No color shift, no scale. The button doesn't move.
- **Outline:** Transparent with Linen border (`1px solid`), Ink text. Same padding. Hover: Stone background fill transition.
- **No tertiary, no icon-only, no ghost variants.** The system has two buttons; every other action is handled with text links.
- **Text links:** `font-semibold`, color `ink`, hover `ember`. Paired with an `ArrowUpRight` icon (14px, 1.5 stroke) that translates `+0.5px -0.5px` on hover. No underline by default.

### Chips and Tags
Used for project tags, skill labels, and filter indicators.

- **Style:** Stone fill, Linen border, Graphite text, full radius, `0.375rem 0.875rem` padding, `0.75rem 600` font.
- **Hover:** Pale Ember background, Linen border shifts to `ember/50`, Graphite text shifts to Ember. Transition 150ms.
- **Active/selected:** Same as hover state; no additional visual treatment needed given the small size.

### Cards and Containers
Cards use tonal differentiation from the page background, not shadows.

- **Corner Style:** `0.75rem` radius for standard cards; `1rem` for larger feature containers; `1.5rem` for the contact form; `2rem` reserved for the hero area's largest elements.
- **Background:** Cloud (`#FDFDFC`) on Archive Warm page background. On Parchment section backgrounds, cards use Cloud for the same visual separation.
- **Border:** Linen, 1px solid, always present on card components.
- **Shadow:** None. See Elevation.
- **Internal Padding:** `2rem` standard; `2.5rem` on larger cards (case study metrics, contact form). Never less than `1.5rem`.
- **Nesting:** Never nest a card inside a card. If a surface inside a card needs differentiation, use a Stone background (`hsl(30 18% 93%)`) without a border.

### Inputs and Fields
- **Style:** Stone background at rest, Linen border, `0.75rem` radius, `0.875rem 1rem` padding, Graphite placeholder text.
- **Focus:** Border shifts to Ember, background lifts to Cloud. `outline: none` — the border shift IS the focus indicator (sufficient contrast for WCAG 2.1 AA given Ember's saturation).
- **Error:** Border shifts to `red-500/60`. Error text appears below the field at `0.75rem`, red-500. The field itself does not change background.
- **Disabled:** `opacity: 0.5`, `cursor: not-allowed`. No other change.
- **Select element:** Identical to input. Inherits browser arrow; no custom dropdown.

### Navigation
- **Style:** Transparent at page top; gains `background: archive-warm/90` with `backdrop-filter: blur(12px)` and a Linen bottom border after 24px scroll. Transition: `background` 300ms.
- **Nav items (desktop):** Pill-shaped (`border-radius: 9999px`), `0.875rem 0.875rem` padding, `0.875rem 500` Bricolage Grotesque, Graphite default, Ink hover, Stone background on hover, Stone background + Ink text when active section.
- **Logo mark:** 32px filled circle in Ember, white "RV" initials at `0.75rem 700`. Never changes color; always Ember.
- **Mobile:** Full-screen overlay, Archive Warm background, slide-in at `y: -8 → 0`, 200ms. Nav items as large `text-xl 500` links with a faint number suffix at right. "Let's talk" pill CTA at bottom.

### Section Labels (Signature Component)
The repeating section header pattern is distinctive and worth documenting.

- **Structure:** `<span>` with Ember text, `0.75rem 600` weight, `tracking-widest` (`0.1em`), UPPERCASE. Followed by a horizontal rule (`<div class="flex-1 h-px">` in Linen) stretching to the edge.
- **Placement:** `margin-bottom: 3rem` before section content. Left-aligned always.
- **Never:** Use this pattern inside a card, nested inside another section label, or with any color other than Ember.
- **Purpose:** Creates consistent rhythm across sections while giving the reader a fast-scan anchor. The label identifies the section; the horizontal rule tells the eye where the content begins.

## 6. Responsive Design

The portfolio must work correctly at every screen size. Responsiveness is a baseline requirement, not a feature — it reflects directly on Rahul's credibility as a designer.

### Breakpoints

| Name | Value | Typical target |
|------|-------|----------------|
| `sm` | 640px | Large phones (landscape) |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |

All layouts are mobile-first. The base (no prefix) style is the mobile layout; breakpoint prefixes progressively enhance it.

### Layout shifts by breakpoint

**Navigation**
- Mobile (`< md`): full-screen overlay menu. Hamburger toggle. Nav links hidden.
- Desktop (`≥ md`): horizontal pill nav inline with logo and CTA.

**Hero**
- Mobile: single column, display heading at `clamp(2.5rem, 10vw, 5rem)` so it fits without overflow. Stat bar wraps to 2×2 grid.
- Desktop: same column but display heading scales to `clamp(3.5rem, 9vw, 8rem)`.

**Content sections (About, Projects, CaseStudies, Resume)**
- Mobile: single column, full-width. No asymmetric grid — grids collapse to stacked blocks.
- Tablet (`≥ md`): 2-column where appropriate (e.g. skills categories side by side).
- Desktop (`≥ lg`): full asymmetric grid (7/5 or 8/4 of 12 columns).

**Projects**
- Mobile: mockup stacks above text. `[direction:rtl]` reversal is disabled on mobile (always LTR stack).
- Desktop: alternating side-by-side layout with RTL reversal on even items.

**Case Studies accordion, Design Process tabs**
- Mobile: full-width, metrics wrap to single column, step tabs scroll horizontally if needed.
- Desktop: 3-column metric grid, tab panel side by side with detail content.

**Contact form**
- Mobile: single column, full-width inputs.
- Desktop: form and social links in a 2-column split.

**Footer**
- Mobile: link groups stack vertically.
- Desktop: horizontal link grid.

### Typography at mobile

Display heading must never overflow its container. Always test the largest heading (`text-display-xl`) at 375px viewport width. If it wraps awkwardly, reduce via `clamp()` min value — never use `overflow: hidden` or `text-overflow: ellipsis` on headings.

### Touch targets

All interactive elements (buttons, nav items, accordion triggers, carousel arrows) must have a minimum touch target of 44×44px on mobile, per WCAG 2.1 SC 2.5.5.

### Horizontal scroll

No element may cause horizontal scroll on any viewport width. Images and mockup containers must be `max-width: 100%`. Tables and wide content scroll inside their own `overflow-x: auto` wrapper.

### Named Rule

**The Mobile-First Rule.** Write the base (unprefixed) Tailwind class for mobile. Add `md:`, `lg:`, `xl:` prefixes to progressively enhance. Never write desktop-first styles and undo them at small sizes. If a section looks correct on desktop but broken on mobile, the implementation is wrong.

## 7. Do's and Don'ts

### Do:
- **Do** use Ember on ≤10% of any given screen. On pages with multiple sections, Ember appears primarily on section labels, the logo, and one CTA. Everywhere else is neutral.
- **Do** lead every case study with an outcome metric before process explanation. The structure is: result → constraint → decision → how it shipped.
- **Do** use `clamp()` for all heading sizes. Never hard-code pixel values for display type.
- **Do** apply `text-wrap: balance` to all headings and `text-wrap: pretty` to all body paragraphs above two lines.
- **Do** use horizontal rules (`border-t border-border`) as the primary section divider. Borders are cheaper than whitespace and more legible as structure.
- **Do** left-align all layouts. Use asymmetric grid splits (7/5 or 8/4 of 12 columns) rather than centered stacks or symmetrical halves.
- **Do** use `useReducedMotion` from Framer Motion on every animated component. The portfolio's WCAG commitment extends to motion.
- **Do** keep all focus states visible and on-brand: `outline: 2px solid #BD4D28, outline-offset: 2px` on interactive elements. Focus states are non-negotiable and must not be suppressed.
- **Do** validate color contrast in both light and dark themes before shipping any new color pairing. Ember on Cloud and Ember on Coal must both pass WCAG AA (≥4.5:1 for text).

### Don't:
- **Don't** add a second typeface. Monospace for "technical credibility" is explicitly an anti-pattern from PRODUCT.md. Bricolage Grotesque at different weights is the full typographic system.
- **Don't** use device frames (MacBook, iPhone bezels) around project screenshots or mockups. They make actual UI impossible to evaluate. Frameless screenshots on a tonal background only.
- **Don't** use `border-left` greater than 1px as a decorative colored stripe on cards, callouts, or list items. Rewrite with a full border, background tint, or a numbered/icon prefix.
- **Don't** apply `background-clip: text` with a gradient. Emphasis is weight and size contrast. Ember as a solid color on a heading is permitted; gradient text is not.
- **Don't** use glassmorphism or backdrop-blur on decorative surfaces. Blur is used on the sticky navbar only, where it serves a structural function (scroll state communication).
- **Don't** wrap case study content in bullet lists of jargon: "Conducted user interviews," "Created affinity map," "Facilitated ideation workshop." Every process step must be followed by what it revealed and how that changed the design decision.
- **Don't** use a centered-stack layout for any section. Every layout is left-aligned or uses an explicit asymmetric grid. A centered hero with centered cards below it is the generic portfolio template this system rejects.
- **Don't** use Ember as a hover state on large backgrounds or section fills. It is a signal on small surfaces (labels, buttons, logos, chips). On large surfaces, hover is Stone or Parchment.
- **Don't** add box-shadows. If a surface needs to feel elevated, use a lighter background token and a Linen border. See the No-Shadow Rule.
- **Don't** use all-caps tracking above 0.875rem text size. The Label pattern is for labels. Applying it to headings reads as decoration, not information.
- **Don't** write copy in the "we craft experiences" agency register. The portfolio voice is first-person, evidence-based, and specific. "I redesigned the onboarding flow and day-7 retention improved 65%" not "Crafting delightful user journeys that drive engagement."
