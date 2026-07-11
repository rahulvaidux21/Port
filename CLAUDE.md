# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build (also runs TypeScript check + ESLint)
npm run lint     # ESLint only
npm run format   # Prettier (auto-fixes)
```

There are no tests. `npm run build` is the authoritative correctness check — it runs `tsc` and `eslint` as part of the Next.js build pipeline. Run it after any non-trivial change.

## Architecture

Single-page portfolio. One route (`app/page.tsx`) composes all sections in order. No dynamic routes, no API routes, no database.

### Data flow

All content lives in `lib/data.ts` as typed arrays exported by name. Sections import directly from there — no context, no state management, no fetching. **To change any portfolio content (projects, experience, testimonials, etc.), edit only `lib/data.ts`.** The types for every exported array are in `types/index.ts`.

### Section pattern

Every section in `components/sections/` follows the same shape:

```tsx
"use client";                          // all sections are client components (Framer Motion)
import { motion } from "framer-motion";
import { relevantData } from "@/lib/data";

export function SectionName() {
  return (
    <section id="anchor" className="section-padding py-section border-t border-border">
      <div className="content-grid">
        {/* section label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-xs text-accent font-semibold tracking-widest uppercase">Label</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        {/* content */}
      </div>
    </section>
  );
}
```

The `id` on the `<section>` is the scroll target. Nav links use `href: "#anchor"` and the Navbar's `IntersectionObserver` watches these ids for active-state tracking.

### Styling system

Tailwind v3 with a CSS-variable color system. All colors are semantic tokens — never use raw color values (e.g. `text-red-500`), use token classes (`text-accent`, `text-muted-foreground`, `bg-card`, `border-border`).

**Token definitions** are in `app/globals.css` as HSL channel variables (e.g. `--accent: 15 65% 45%`). Tailwind reads them via `hsl(var(--token))` in `tailwind.config.ts`. Dark mode values live under `.dark {}` in the same file — `next-themes` toggles this class on `<html>`.

**Layout utilities** (defined in `globals.css`, not in the config):
- `section-padding` — responsive horizontal padding (`px-6` → `px-24`)
- `content-grid` — `max-w-7xl mx-auto` centering wrapper
- `py-section` — fluid vertical padding via `clamp()`

**Type scale**: four fluid display sizes (`text-display-xl/lg/md/sm`) are defined in `tailwind.config.ts` using `clamp()`. Use these for headings, not `text-4xl` etc.

**Animation**: the standard easing is `ease-expo-out` (`cubic-bezier(0.16,1,0.3,1)`). Framer Motion variants should use this as the `ease` array. The `motion.div` with `whileInView` + `viewport={{ once: true, margin: "-10%" }}` is the standard scroll-animation pattern used across all sections.

### Font

Bricolage Grotesque variable font, loaded via `next/font/google` in `app/layout.tsx`. It exposes `--font-bricolage` as a CSS variable. The Tailwind `font-sans` stack resolves to this variable. No other font is used.

### Theme toggle

`components/ThemeToggle.tsx` uses `next-themes`. The component is SSR-safe via a `mounted` guard — the button renders an empty placeholder until hydration to avoid a flash. `ThemeProvider` is in `app/layout.tsx` with `attribute="class"` (applies `.dark` to `<html>`).

### Project mockups

`components/sections/Projects.tsx` contains inline SVG mockups for each project, keyed by `project.id`. When adding a new project to `lib/data.ts`, add a matching SVG branch in the `configs` object inside `ProjectMockup`. The SVG uses the project's `color` prop for accent fills.

### Contact form

The form in `components/sections/Contact.tsx` is frontend-only. The `handleSubmit` function contains a `setTimeout` placeholder where the actual submission logic goes. To wire up a backend, replace that block with a `fetch` to Formspree, Netlify Forms, or a custom endpoint. The form has client-side validation and a `success` / `error` display state already built.

### Adding a new section

1. Create `components/sections/NewSection.tsx` following the section pattern above
2. Add the export to `app/page.tsx`
3. If it needs a nav link, add to `navItems` in `lib/data.ts`
4. If it needs new content types, add interfaces to `types/index.ts` and data to `lib/data.ts`

### Netlify deployment

Build command: `npm run build` — Publish directory: `.next` — No environment variables required. The site is fully static (`○` in the build output).
