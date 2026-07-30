# Product

## Register

brand

## Platform

web

## Users

Two audiences read this site evenly, and neither is treated as primary: **hiring managers and recruiters** evaluating Rahul for a UI/UX role, and **freelance clients or startup founders** deciding whether to bring him onto a project. The former reads the About Me / My Journey section and downloads the resume; the latter reads the case studies and the closing "Got a mess? Let's untangle it" pitch. Both arrive with the same underlying question — has this person actually shipped real, hard design work, or is this portfolio marketing filler?

## Product Purpose

A personal portfolio for Rahul Vaid, UI/UX Designer. It exists to prove design competence through three real, evidence-backed case studies (a national design system spanning four frameworks, an offline-first field-survey app, and a five-role approval-workflow platform) rather than through claims alone. Success isn't gated behind one funnel: a visitor reaching out by email, downloading the resume, or simply finishing the case studies with a clear sense of how Rahul works are all treated as valid outcomes — the site runs all three in parallel instead of forcing a single conversion path.

## Positioning

"I design products where complexity meets usability" — the site's job is to make that claim self-evident by showing the untangling itself: a four-framework design system reduced to one shared source of truth, a five-role approval maze reduced to a sentence anyone can explain, a survey tool that keeps working when the network doesn't.

## Conversion & proof

- Primary and secondary CTA: contact via email ("Let's Connect," in the Hero and the closing section) runs alongside resume download and case-study browsing as equally valid parallel paths — confirmed as "all three" rather than a single hard-gated funnel.
- The line a visitor remembers after 10 seconds: *"I design products where complexity meets usability."*
- Belief ladder: sees a named, specific case study with a real outcome (not a vague claim) → checks the About Me / My Journey timeline and resume to confirm the work history is real and recent → trusts enough to reach out or download the CV.
- Proof on hand: three real case studies with named results (UX4G Design System 3.0 — now the mandated standard across a portfolio of platforms; Survey Setu — live since April 2026, 50+ screens, zero data lost; NIRI Platform — a five-role approval chain reduced to one explainable path), plus a resume-sourced Experience section. The Testimonials section is explicitly marked in the codebase as illustrative, written in the voice of the people these projects were built for — not yet real, attributed quotes — and should stay flagged as such (or be swapped for real quotes) rather than presented as verified proof.

## Brand Personality

As of the 2026 redesign (a close visual/motion clone of a reference Webflow developer portfolio, heynesh.com — see DESIGN.md), the personality shifted from tactile/paper-like to **editorial and monochrome-first**: a warm beige canvas, near-black type, and exactly one quiet accent color used only for focus states — no bright brand color, no gradients. It stays **grounded and evidence-first** (a code comment in `lib/data.ts` explicitly instructs "no invented history"; the About Me / My Journey timeline and hero stats are sourced from Rahul's real resume/education, not invented to match the reference template's rhythm) and **warm without losing precision** (the casual "Got a mess? Let's untangle it" CTA carries over unchanged). The previous "tactile paper-and-plastic stationery" language — dot-grid textures, ruler ticks, the lanyard ID badge, the pendant-lamp dark-mode toggle — was retired along with the light/dark toggle itself, since the reference has no dark mode.

## Anti-references

Not confirmed with the user — no specific anti-references have been discussed. What the current build visibly avoids, by observation rather than by stated rule: generic SaaS hero-metric templates, gradient-text flourishes, invented statistics, and a sterile all-business tone. Treat this as inferred, not settled; revisit if the site's direction changes.

## Design Principles

- **Real evidence over invented metrics.** Every claim in a case study, the hero stats, and the About Me / My Journey timeline traces to something true; testimonials are explicitly flagged as illustrative rather than passed off as verified quotes.
- **Motion always has a reduced-motion answer.** Every animated component (Framer Motion reveals, GSAP ScrollTrigger/SplitText, Lenis smooth scroll, the Swiper testimonials carousel) checks for `prefers-reduced-motion` and ships a static, still-complete fallback — motion is a layer on top of a working page, never a requirement for it.
- **Monochrome-first, one quiet accent.** No bright brand color and no gradients — a single warm-clay accent is used only for focus rings and small hover details, never as a primary UI color.
- **Single theme, deliberately.** The reference template this redesign clones has no dark mode, so this site doesn't either — the light/dark toggle was removed rather than half-maintained against a palette that was never designed for it.
- **One icon system.** Every icon in the project comes from `lucide-react`; no hand-drawn SVG paths or second icon library, so visual weight and style stay consistent everywhere an icon appears.

## Accessibility & Inclusion

Not formally confirmed to a specific WCAG level. What's implemented and observable: `prefers-reduced-motion` is honored throughout with static fallbacks (not just disabled animation, but genuinely complete alternate states — e.g. the testimonials carousel falls back to Swiper's native grab cursor with no custom cursor-follower or GSAP `quickTo`); focus-visible outlines are defined globally; interactive controls carry `aria-label`/`aria-expanded` where relevant (the mobile menu, the About Me / My Journey "Read more" toggles); the mobile nav closes on outside click and `Escape`. Color contrast has not been formally audited against WCAG AA/AAA.
