# AGENTS.md

Mandatory operating rules for any AI agent working in this repository.

## Before any design or build work

Before designing or building any screen, always:

1. Read `PRODUCT.md` (product vision — audiences, purpose, brand personality, design principles)
2. Read `DESIGN.md` (design vision — color tokens, typography, elevation, components, rules)
3. Read `ai/INDEX.md` (execution vision — role, job, and workflow registry)
4. Open the role, jobs, and workflow files in `ai/` that are relevant to the current brief

If any of the above files are missing or appear stale for the brief, write the missing context first, show it in chat, and wait for approval before proceeding. Do not substitute memory or inference for missing context files.

## Gates

Before building or changing any screen, follow these gates in order. **STOP for approval at each one. Never skip a gate.**

### Gate 1 — Context-setup

Read `ai/INDEX.md`, `PRODUCT.md`, and `DESIGN.md`. Cross-reference against the brief:

- Are the audiences, purpose, and principles current and applicable?
- Are the design tokens, components, and patterns sufficient for what this screen needs?
- Are the relevant role, job, and workflow files present in `ai/`?

If any file is missing, outdated, or insufficient for the brief: draft the addition or update, show it in chat, and wait for approval. **Do not proceed to Gate 2 until context is complete and approved.**

### Gate 2 — Design-system

Identify every color, token, component, and pattern the screen will use. Check each one against `DESIGN.md`.

If anything required is not already documented in `DESIGN.md`: do NOT invent it inline in the component code. Propose the addition in chat — show the exact `DESIGN.md` change (new token, component spec, or pattern rule) and wait for approval. Build only after the system is updated.

**If you are unsure whether a token or component exists, treat it as missing and run Gate 1 before Gate 2.**

### Gate 3 — Screen execution

Build the screen using only:
- Tokens, components, and patterns from `DESIGN.md`
- Workflow and context from the relevant `ai/` files

Before marking done, verify all three of the following:
- **Responsive**: test at 375px (mobile), 768px (tablet), and 1280px (desktop). No horizontal overflow, no broken layouts, no clipped text at any size.
- **Theme**: verify the screen in both light and dark mode.
- **Accessibility**: keyboard navigation works, focus states are visible, touch targets are ≥ 44×44px on mobile.

Show the result in chat and wait for review. Do not call the screen finished until approval is given.

## Always

- Use only semantic color tokens from `DESIGN.md` — never raw hex, RGB, or Tailwind color utilities (e.g. `text-red-500`, `bg-blue-200`)
- Use `clamp()` for all heading font sizes
- Apply `text-wrap: balance` to all headings and `text-wrap: pretty` to all body paragraphs longer than two lines
- Use horizontal rules (`border-t border-border`) as the primary section divider
- Left-align all layouts; use asymmetric grid splits (7/5 or 8/4 of 12 columns)
- Apply `useReducedMotion` from Framer Motion on every animated component
- Keep all focus states visible and on-brand: `outline: 2px solid hsl(var(--accent))`, `outline-offset: 2px`
- Validate color contrast in both light and dark themes before marking any screen complete
- Lead every case study with an outcome metric before any process explanation
- Write copy in first-person, evidence-based, and specific — never agency-register ("we craft experiences")
- Write all styles mobile-first: base (unprefixed) class targets mobile, `md:` / `lg:` / `xl:` progressively enhance
- Ensure every interactive element has a minimum 44×44px touch target on mobile
- Test at 375px, 768px, and 1280px before marking any screen complete — no horizontal overflow at any size

## Never

- Never add a second typeface. Bricolage Grotesque at different weights is the full typographic system
- Never use device frames (MacBook, iPhone bezels) around project screenshots or mockups
- Never use `border-left` greater than 1px as a decorative colored stripe on cards, callouts, or list items
- Never use `background-clip: text` with a gradient. Ember as a solid color on a heading is permitted; gradient text is not
- Never use glassmorphism or backdrop-blur on decorative surfaces (sticky navbar only, for scroll-state communication)
- Never use a centered-stack layout for any section
- Never use Ember as a hover state on large backgrounds or section fills
- Never add `box-shadow` to any component except `:focus-visible` outlines
- Never use all-caps tracking on text above `0.875rem`
- Never wrap case study process steps in bullet lists of jargon without stating what was revealed and how it changed a decision
- Never build a screen, component, or pattern that isn't fully specified in `DESIGN.md` without first completing Gate 2
- Never skip a gate, even for small changes. Small changes compound into system drift
- Never write desktop-first styles and undo them at small sizes — mobile-first only
- Never let any element cause horizontal scroll at any viewport width
- Never use fixed pixel widths on containers that could overflow on mobile (`max-w-*` or `w-full` instead)
- Never mark a screen complete without testing at 375px mobile width
