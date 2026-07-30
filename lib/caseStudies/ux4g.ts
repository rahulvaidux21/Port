import type { CaseStudyDetail } from "@/types";

// Sourced directly from the UX4G 3.0 case-study brief provided by Rahul —
// no invented metrics, quotes, or outcomes (see DESIGN.md / PRODUCT.md "no invented history").
export const ux4g: CaseStudyDetail = {
  slug: "ux4g",
  metaTitle: "UX4G Design System 3.0 — Rahul Vaid",
  metaDescription:
    "Rebuilding India's national design system from a static UI library into a Level-3, token-driven, multi-platform design system for government services.",
  hero: {
    wordmark: "UX4G Design System 3.0 · NeGD / DIC · Digital India",
    discipline: "Design Systems",
    heading: "UX4G Design System 3.0",
    statement: "Consistency, not four different rulebooks.",
    intro:
      "I led the research, strategy, and design of UX4G 3.0 — evolving India's national design system from a “Level 1” library of static HTML/CSS assets into a token-driven, multi-framework system with 77 production-ready components and 36 government service patterns, built to WCAG 2.1 AA.",
    metaRows: [
      { label: "Role", value: "Design System Designer & Co-owner (one of two designers owning the system)" },
      {
        label: "Timeline",
        value: "Phased delivery, 2025–26 — Phase 1 shipped 31 Mar 2026; Phase 2 design by 31 May, development by 30 Jun 2026",
      },
      {
        label: "Team",
        value: "2 design system designers · framework engineers (React, Angular, Web Components, Flutter) · NeGD/DIC review teams",
      },
      {
        label: "Responsibilities",
        value:
          "Design system research & competitive analysis · maturity framework & leadership strategy deck · component and pattern design in Figma · design tokens & variable modes · design–code parity audits · documentation",
      },
    ],
    image: { src: "/case-studies/ux4g/thumbnail.jpg", alt: "UX4G Design System 3.0 Figma community kit card", width: 1710, height: 786 },
  },
  snapshot: [
    { label: "Project", value: "UX4G Design System 3.0 — ux4g.gov.in" },
    { label: "Industry", value: "Government / Digital Public Services (India)" },
    { label: "Platform", value: "Web (React, Angular, Web Components, HTML/CSS) + Mobile (Flutter) + Figma" },
    { label: "Client", value: "NeGD / DIC — Digital India" },
    { label: "Timeline", value: "3-month initial mandate, expanded into two phases through Jun 2026" },
    { label: "Status", value: "Phase 1 live · Phase 2 in delivery" },
  ],
  problem: {
    paragraphs: [
      "Every ministry and department building digital services for India was solving the same UI problems from scratch. UX4G 2.0 existed to fix this — but it was a library, not a system: a set of static HTML/Bootstrap 5 snippets with roughly 34 atomic components. There were no design tokens, no npm packages, no service patterns, and documentation gaps throughout. Teams on modern stacks (React, Angular, Flutter) couldn't adopt it natively, so they didn't.",
      "Citizens experienced the consequences: government services that looked and behaved differently on every portal, accessibility treated as a post-launch checklist rather than built-in behavior, and critical journeys — applying for a scheme, tracking a grievance, making a payment — reinvented, inconsistently, by every team.",
      "Our own audit put it bluntly: UX4G operated as a Level 1 design system — visual consistency only — while the systems it aspired to stand beside (GOV.UK, USWDS, IBM Carbon) had tokens, governance, and comprehensive pattern libraries.",
    ],
  },
  goals: {
    intro: "The goal was a maturity jump, not a facelift: move UX4G from Level 1 (The Library) to Level 3 (The Playbook).",
    items: [
      "Token-driven architecture — centralized style control, theming, and light/dark modes",
      "Native framework support — installable packages for React, Angular, Web Components, and Flutter",
      "Component depth at global parity — grow from 34 atomic components to 43+, the government-system average",
      "Service patterns — documented end-to-end government journeys (identity, consent, applications, payments, grievances)",
      "Accessibility by design — WCAG 2.1 AA behavior built into components, not checked afterwards",
      "Documentation as a product — a portal where designers and developers can Discover → Learn → Use",
    ],
  },
  constraints: [
    { icon: "Clock", text: "3-month initial mandate for research, foundations, and core components" },
    { icon: "TrendingUp", text: "Mid-project scope expansion — docs, Storybook, patterns, and npm packages added later" },
    { icon: "Users", text: "Two designers owned the entire design surface" },
    { icon: "Layers", text: "Legacy Bootstrap 5 foundation with existing adopters needing a v1 → v3 migration path" },
    { icon: "ShieldCheck", text: "WCAG 2.1 AA, bilingual support, pending VAPT / STQC certification gates" },
    { icon: "Globe2", text: "India-scale diversity — every literacy level, language, and device class" },
  ],
  research: {
    paragraphs: [
      "We ran two research tracks in parallel: looking outward at the global ecosystem, and looking inward at our own system's health.",
      "Competitive analysis of 16 design systems. I benchmarked government systems (GOV.UK, USWDS, Singapore SGDS, NL Design System, Designers Italia) and industry leaders (Material 3, Fluent, Apple HIG, IBM Carbon, Atlassian, Shopify Polaris, Adobe Spectrum, Ant Design, Spotify, Airbnb, Uber Base) across ~28 criteria — component count, Figma kit, documentation access, accessibility, npm availability, and per-framework support.",
      "A three-level maturity framework. To make the findings legible to leadership, I distilled the landscape into a framework: Level 1 — The Library (visual consistency), Level 2 — The Engine (tokens + native framework components), Level 3 — The Playbook (documented end-to-end journeys aligned to policy, compliance, and accessibility). Every system in the analysis was placed on this scale — including our own.",
      "Internal audit. In parallel we audited UX4G itself: the Figma component inventory, design tokens, the documentation site's IA, and real project usage to find missing components and inconsistencies.",
    ],
    media: [
      {
        src: "/case-studies/ux4g/benchmark-matrix.jpg",
        alt: "Capability matrix comparing UX4G against global design systems across Foundation, Technical, and Strategic capabilities",
        caption: "The maturity capability matrix — UX4G placed honestly at Level 1, next to GOV.UK and Atlassian at Level 3",
        width: 1400,
        height: 2023,
      },
    ],
  },
  insights: [
    {
      title: "Tokens are the brain",
      text: "The single biggest gap between UX4G and every mature system was design tokens — without them there is no theming, no dark mode, no centralized control at scale.",
    },
    {
      title: "No native packages, no adoption",
      text: "69% of benchmarked competitors offered native React support. UX4G offered copy-paste HTML. Modern government teams were locked out by default.",
    },
    {
      title: "Component count wasn't the real gap — patterns were",
      text: "UX4G's 34 components vs. the 43+ average was a ~20% deficit; but what actually separates Level 3 systems is documented service journeys, not more atoms.",
    },
    {
      title: "Accessibility was a checklist, not a behavior",
      text: "Mature systems build a11y into component behavior; UX4G verified it after the fact.",
    },
    {
      title: "Government leaders win with content and patterns",
      text: "GOV.UK's edge isn't visual — it's the Service Manual, content-first thinking, and rigorously researched patterns.",
    },
  ],
  opportunity:
    "How might we evolve UX4G from a library of parts into a playbook for entire government services — giving every Indian ministry tokens, native components, and pre-validated citizen journeys — without breaking the teams already using it?",
  principles: [
    { icon: "SlidersHorizontal", text: "Token-first — every color, space, and type decision flows from a variable, so themes and modes are a switch, not a rebuild" },
    { icon: "Accessibility", text: "Accessible by default — WCAG 2.1 AA behavior lives inside the component, not in a compliance document" },
    { icon: "Landmark", text: "India-first — Aadhaar input, PAN input, OTP flows, bilingual text, and the Map of India are first-class citizens" },
    { icon: "RefreshCw", text: "Parity across platforms — Figma, React, Angular, Web Components, and Flutter must tell the same truth; drift is a bug" },
    { icon: "BookOpen", text: "Documentation is the product — a component isn't done until a stranger can discover it, learn it, and use it" },
  ],
  process: {
    paragraphs: [
      "With the maturity framework as our map, we planned the jump in layers. Component taxonomy: we reorganized the library into families — Form Elements (15), Data Display (13), Feedback (9), Navigation (9), Layout, and India-specific (6) — and mapped every 2.0 component and gap into it, producing the master build list.",
      "Pattern inventory: we inventoried government service journeys into 9 pattern families — Identity & Access, Consent & Declaration, Application & Submission, Status & Tracking, Payments, Search & Discovery, Dashboards, Notifications, and Feedback & Communication — then pruned ruthlessly to land on 36 real patterns.",
      "Documentation IA: we restructured the portal's information architecture into Get Started, Foundations, Components, and Patterns — 950+ tracked pages and states. We also evaluated and migrated the entire icon library from Lucide to Material icons for coverage and consistency, updating Figma, code, and documentation together.",
    ],
    media: [
      {
        src: "/case-studies/ux4g/theme-craft.jpg",
        alt: "Theme Craft tool showing primary and accent color token scales",
        caption: "Theme Craft — the token-driven color and typography editor",
        width: 634,
        height: 798,
      },
      {
        src: "/case-studies/ux4g/typography-tokens.jpg",
        alt: "Typography token table showing display styles, weights, sizes, and line heights",
        caption: "Type-scale tokens, documented style-by-style",
        width: 1264,
        height: 810,
      },
    ],
  },
  userFlow: [
    { audience: "Designer", steps: ["Open Figma kit", "Pull tokens & styles", "Assemble from components", "Apply a service pattern", "Hand off with parity guaranteed"] },
    { audience: "Developer", steps: ["Discover the component", "Learn anatomy & accessibility", "Use — copy snippet or npm install"] },
    { audience: "Citizen", steps: ["Find scheme", "Check eligibility", "Authenticate (Aadhaar / OTP)", "Consent", "Apply, save-and-resume", "Pay", "Track status", "Raise & track grievance"] },
  ],
  finalDesign: {
    intro: "UX4G 3.0 shipped as a complete, layered system:",
    bullets: [
      "77 production-ready components across React, Angular, and Web Components (+ Flutter for mobile), WCAG 2.1 AA compliant",
      "Figma design kit — 79 components with full variants, states, and auto-layout, mirrored 1:1 with code",
      "Design tokens & variable modes — light ↔ dark theme switching on a single variable swap",
      "36 government service patterns spanning identity, consent, applications, payments, tracking, and grievance journeys",
      "India-specific components — Aadhaar Input, PAN Card Input, OTP Input, Captcha, Accessibility Bar, Map of India, bilingual (English/Hindi) support",
      "The documentation portal — Discover → Learn → Use, with foundations, per-framework installation, sandbox, Storybook, and a v1 → v3 migration guide",
    ],
    media: [
      {
        src: "/case-studies/ux4g/docs-portal.jpg",
        alt: "UX4G documentation portal quick start guide with CDN, React, and Angular setup paths",
        caption: "The documentation portal — Quick Start guide",
        width: 1600,
        height: 837,
      },
      {
        src: "/case-studies/ux4g/pattern-library.jpg",
        alt: "Government service pattern screens — application journey tracker, service status table, Aadhaar OTP, eligibility score, scheme search",
        caption: "Government service patterns — application journey, eligibility, OTP, dashboards",
        width: 1600,
        height: 800,
      },
    ],
  },
  decisions: [
    {
      label: "Tokens before components",
      text: "We rebuilt foundations first so every component inherited theme-ability — this is what made dark mode a one-variable switch instead of a redesign.",
    },
    {
      label: "Same skeleton for every component page",
      text: "One learnable page anatomy across 77 components lowers the cost of adopting the next component to near zero.",
    },
    {
      label: "India-specific components as first-class citizens",
      text: "Aadhaar, PAN, and OTP inputs aren't examples in docs — they're built, tested components, because every Indian service needs them.",
    },
    {
      label: "Patterns encode the unhappy paths",
      text: "Government journeys fail in specific ways, so the status tracker pattern ships with rejection-with-next-action and delay-with-revised-date states designed in.",
    },
    {
      label: "Figma ↔ code naming parity",
      text: "Components carry the same name in kit and code so handoff needs no translation layer.",
    },
  ],
  tradeoffs: [
    {
      title: "Toggle behavior",
      optionA: "A custom, novel toggle interaction — design's original proposal",
      optionB: "The standard, widely-recognized toggle pattern — engineering's counter-proposal in the audit",
      chosen: "b",
      rationale: "The system's job is familiarity, not novelty.",
    },
    {
      title: "Footer typography density",
      optionA: "12px “compact” variant for link-dense government footers",
      optionB: "A larger default sized for general readability guidance",
      chosen: "both",
      rationale: "12px stayed as an explicit compact variant, with the default meeting readability guidance — a variant, not a violation.",
    },
    {
      title: "Navbar parity",
      optionA: "Layout flexibility departments actually need",
      optionB: "Strict pixel-parity across every implementation",
      chosen: "a",
      rationale: "We documented the flexibility instead of forcing sameness.",
    },
    {
      title: "Field hover states",
      optionA: "Subtle, quiet hover states",
      optionB: "Louder, more “obvious” hover states flagged in audit",
      chosen: "a",
      rationale: "In dense government forms, loud hovers create noise — subtlety won, deliberately.",
    },
    {
      title: "Scope vs. schedule",
      optionA: "~35 components fully designed and developed (Phase 1)",
      optionB: "77 components rushed and half-done",
      chosen: "a",
      rationale: "When the mandate grew, we protected quality by phasing rather than diluting it.",
    },
  ],
  collaboration: {
    paragraphs: [
      "The system was co-owned by two designers, working in a tight loop with framework engineering teams and government review bodies: Design (2) → component & pattern design, tokens, docs → Engineering (React / Angular / Web Components / Flutter teams) → parity audit loop (designer logs an observation → engineer responds → status: fixed / deferred / won't-fix with rationale) → NeGD/DIC teams (alpha testing & feedback) → Leadership (maturity deck, phase gates).",
      "The audit log became our collaboration contract: disagreements were written down, argued in comments, and closed with a decision — which is why design–code drift stayed low across four platforms.",
    ],
  },
  challenges: [
    {
      title: "The scope doubled mid-flight",
      text: "A 3-month engagement for research + foundations + core components grew to include full documentation, Storybook, service patterns, and npm packages for four frameworks. We absorbed it by re-phasing rather than diluting quality.",
    },
    {
      title: "AI-assisted documentation hit its ceiling",
      text: "Generated docs couldn't produce complete, accurate component documentation — 47 of 79 component docs required manual intervention. Humans wrote the truth; AI drafted the scaffolding.",
    },
    {
      title: "Four-platform parity is a moving target",
      text: "Every fix in one framework had to be verified in three others; the audit log tracked per-framework status per component to keep drift honest.",
    },
    {
      title: "Designing for the hardest constraints in the world",
      text: "Every choice had to survive low-end devices, two languages, assistive tech, and users interacting with government for the first time digitally.",
    },
  ],
  results: {
    stats: [
      { before: "34", after: "77", label: "Production components" },
      { before: "1", after: "4", label: "Supported frameworks" },
      { before: "0", after: "36", label: "Government service patterns" },
      { before: "Level 1", after: "Level 2→3", label: "Maturity trajectory" },
    ],
    paragraphs: [
      "Phase 1 delivered on deadline — ~35 core components fully designed and developed by 31 March 2026. 77 production-ready components now live on ux4g.gov.in across React, Angular, and Web Components — up from 34 static snippets.",
      "From zero to full token architecture — theming and light/dark modes across the system. 36 government service patterns designed and documented for Phase 2 delivery. WCAG 2.1 AA compliance built into component behavior, with bilingual (English/Hindi) support.",
      "On the framework used to benchmark 16 global systems, UX4G moved from Level 1 (Library) onto the Level 2→3 path — tokens and native packages shipped, service patterns in delivery — the tier occupied by GOV.UK, USWDS, and Atlassian.",
    ],
  },
  // Reused verbatim from the site-wide testimonials list (Testimonials.tsx) —
  // it's the one that's specifically about this project. Same illustrative
  // framing as the source (see testimonialsSection.intro) applies here too.
  featuredTestimonial: {
    quote:
      "What impressed me most was how the design system held together across four different frameworks without anyone having to think about it. That kind of consistency is rare.",
    role: "Engineering Lead, Design Systems",
  },
  tools: "Figma for design, tokens, and the component kit · shipped in code across React, Angular, Web Components, and Flutter.",
  reflection: {
    items: [
      "A framework beats a feature list. Leadership didn't fund “more components” — they funded a maturity jump they could see on a map.",
      "Parity is a process, not a milestone. The audit loop — written observations, written responses, written decisions — did more for quality than any review meeting.",
      "Losing arguments is part of system design. Some design positions (custom toggle, louder hovers) lost to good engineering counter-arguments. The system is better for it.",
      "Docs are where systems live or die. The moment we treated documentation as a designed product with its own IA and page anatomy, adoption stopped being a persuasion problem.",
    ],
  },
  nextCaseStudySlug: "survey-setu",
};
