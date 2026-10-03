# Product

## Register

brand

## Platform

web

## Users

Two audiences read this site evenly, and neither is treated as primary: **hiring managers and recruiters** evaluating Rahul for a UI/UX role, and **freelance clients or startup founders** deciding whether to bring him onto a project. The former reads the Experience section for a real, recent work history; the latter reads the case studies and the closing "Your story, well designed." CTA band. Both arrive with the same underlying question — has this person actually shipped real, hard design work, or is this portfolio marketing filler?

## Product Purpose

A personal portfolio for Rahul Vaid, UI/UX Designer. It exists to prove design competence through three real, evidence-backed case studies (a national design system spanning four frameworks, an offline-first field-survey app, and a five-role approval-workflow platform) rather than through claims alone. Success isn't gated behind one funnel: a visitor reaching out by email, or simply finishing the case studies and Experience section with a clear sense of how Rahul works, are both treated as valid outcomes — there's no single hard-gated conversion path.

## Positioning

"I design products where complexity meets usability" — the site's job is to make that claim self-evident by showing the untangling itself: a four-framework design system reduced to one shared source of truth, a five-role approval maze reduced to a sentence anyone can explain, a survey tool that keeps working when the network doesn't.

## Conversion & proof

- Primary and secondary CTA: contact via email ("Let's Connect," in both the Hero and the closing CtaBand) runs alongside case-study browsing as equally valid parallel paths — no single hard-gated funnel.
- The line a visitor remembers after 10 seconds: *"I design products where complexity meets usability."*
- Belief ladder: sees a named, specific case study with a real outcome (not a vague claim) → checks the Experience timeline to confirm the work history is real and recent → trusts enough to reach out.
- Proof on hand: three real case studies with named results (UX4G Design System 3.0 — now the mandated standard across a portfolio of platforms; Survey Setu — designed in 8 days against a 15-day deadline, live with 40+ lakh tribal records captured; NIRI Platform — a five-role approval chain reduced to one explainable path), plus a resume-sourced Experience section. A compact Stats band beneath the Hero (3+ years, 35+ components shipped, 50+ screens delivered, 8 organizations designed for) surfaces those same facts as numbers instead of a logo marquee — every value there traces back to something already stated elsewhere on the page, not a new claim. The Testimonials section is explicitly marked in the codebase and on-page (via its intro copy) as illustrative, written in the voice of the people these projects were built for — not yet real, attributed quotes — and should stay flagged as such (or be swapped for real quotes) rather than presented as verified proof.

## Brand Personality

The site is a direct implementation of Rahul's own Figma file ("Portfolio Landing Page_Final" — see DESIGN.md). Its personality is **dark-first and confident, with one deliberate color moment**: a near-black canvas, warm off-white type, and a vivid `#0055fe` blue used specifically for CTAs, active carousel states, and glow accents behind key cards — not scattered everywhere, but not hidden either. It stays **grounded and evidence-first** (real project screenshots, real resume copy in Experience, real trusted-by logos; testimonials are explicitly labeled illustrative rather than passed off as verified) and **precise about structure**: a page-wide vertical grid-line system (see DESIGN.md's `gridSystem`) keeps every section's content edge, every carousel's edge-fade, and every divider's tick mark aligned to the same formula at every viewport width — pixel-exactness against the source Figma is treated as a real requirement, not a nice-to-have. Dark is the default theme; a light mode exists via the Navbar's toggle and is treated as a first-class alternate state, not an afterthought.

## Anti-references

Not confirmed with the user — no specific anti-references have been discussed. What the current build visibly avoids, by observation rather than by stated rule: generic SaaS hero-metric templates, gradient *text* flourishes (background/glow gradients are used deliberately, e.g. the accent-glow blur blobs behind Experience/CTA cards and the carousel edge-fades — the avoided thing is rainbow/gradient-filled *type*), invented statistics, and a sterile all-business tone. Treat this as inferred, not settled; revisit if the site's direction changes.

## Design Principles

- **Real evidence over invented metrics.** Every claim in a case study and the Experience timeline traces to something true; testimonials are explicitly flagged as illustrative rather than passed off as verified quotes.
- **Motion always has a reduced-motion answer.** Every animated component (Framer Motion reveals, GSAP SplitText, Lenis smooth scroll, the Hero's mouse-parallax effect, the Swiper-based carousels) checks for `prefers-reduced-motion` and ships a static, still-complete fallback — motion is a layer on top of a working page, never a requirement for it.
- **One deliberate accent color, used with intent.** The `#0055fe` blue is reserved for primary actions, active/selected states, and a small number of glow accents — it's not the dominant color of the page, but it's not merely a focus-ring afterthought either.
- **Dark by default, light as a real second state.** The site ships with a working light/dark toggle (Navbar, persisted via localStorage) rather than a single fixed theme — both palettes are defined and maintained in `app/globals.css`, not just one with the other bolted on.
- **Pixel fidelity to the source Figma is a hard requirement, not a rough target.** Where the design has a specific, checkable value (grid-line position, a divider's exact color/size, a marquee's gap, a card's alignment relative to another section), match it exactly and verify with real measurement — not an approximation that "looks close enough" in a screenshot.
- **Two icon sources, each for a reason.** UI icons (arrows, menu, sun/moon, etc.) come from `lucide-react` for consistent weight/style; social and brand icons (LinkedIn, Behance, Gmail, Medium) are dedicated SVG files instead, since those need to reproduce an exact real-world logo rather than a generic glyph.

## Accessibility & Inclusion

Not formally confirmed to a specific WCAG level. What's implemented and observable: `prefers-reduced-motion` is honored throughout with static fallbacks (not just disabled animation, but genuinely complete alternate states — carousel autoplay stops, the Hero's mouse-parallax effect never attaches its listeners, GSAP's headline SplitText reveal and the CSS ticker marquees are skipped entirely); focus-visible outlines are defined globally; interactive controls carry `aria-label`/`aria-expanded`/`aria-pressed` where relevant (the mobile menu toggle, the theme toggle, every carousel's prev/next arrows and dot pagination); the mobile nav closes on outside click and `Escape`. Color contrast has not been formally audited against WCAG AA/AAA.
