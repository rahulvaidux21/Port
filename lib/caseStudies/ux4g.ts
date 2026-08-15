import type { CaseStudyDetail } from "@/types";

/* Transcribed section by section from the Figma frame "Case study - UX4G
   design system 3.0 Light" (file ZnWg8fVtftEhC0IcK21l1e, node 2944:48094),
   top to bottom. Every string below is the frame's own copy.

   Four obvious typos in the frame are corrected here rather than shipped —
   each is flagged with a TYPO comment so the change is visible and easy to
   revert if it turns out to be deliberate. Nothing else is edited, and no
   metric, quote or outcome is invented: where the frame still holds
   placeholder copy it is marked PLACEHOLDER and carried through as-is. */
export const ux4g: CaseStudyDetail = {
  slug: "ux4g",
  metaTitle: "Rebuilding India's National Design System — Rahul Vaid",
  metaDescription:
    "34 static snippets to 70+ production-ready components across 4 frameworks — the design system behind government services for a billion citizens.",
  hero: {
    wordmark: "UX4G Design System 3.0 · NeGD / DIC · Digital India",
    heading: "Rebuilding India's National Design System",
    subtitleLead: "Transforming a static UI library into",
    subtitleAccent: "a scalable, token-driven design system",
    tags: ["Design System", "Indian Government", "Guidelines"],
    image: {
      src: "/case-studies/ux4g/hero-laptop.png",
      alt: "The UX4G 3.0 documentation site shown on a laptop",
      width: 1320,
      height: 831,
    },
  },
  roleChips: [
    "Co-owner",
    "Designer",
    "Design strategy",
    "User research",
    "Competitive analysis",
    "Visual design",
    "Documentation",
    "Usability testing",
    "Design–code parity",
  ],
  timelineChips: ["Dec 2025 – Jun 2026", "Phase 1 shipped March 31 2026", "Phase 2 shipped June 2026"],
  platformChips: ["Web", "Mobile", "Figma"],
  teamAndCollaboration: {
    // TYPO (frame): "sementic" → "semantic"; "became became" → "became";
    // "for scalable design system" → "for a scalable design system".
    bullets: [
      "Designed setting up **semantic tokens** that became the building blocks for a scalable design system.",
      "Built a **scalable, cohesive and reusable design system** supporting multiple products and business units.",
      // TYPO (frame): sentence opened lowercase.
      "Worked closely with **engineering teams** to understand technical constraints.",
    ],
    roles: [
      { value: "2", label: "Designers" },
      { value: "1", label: "Product manager" },
      { value: "5", label: "Developers" },
    ],
  },
  // The frame lists "Lacked service patterns." twice as adjacent pills.
  // Deduplicated here — a repeated pill reads as a bug on a live page.
  challenge: [
    "Version 2.0 operated strictly as a static library",
    "It lacked design tokens",
    "npm packages was not available",
    "34 atomic components as copy-paste Bootstrap 5 HTML snippets",
    "Lacked service patterns.",
    "Modern engineering teams utilizing React, Angular, or Flutter were locked out, forcing them to bypass the national standard entirely.",
  ],
  impactTeaser: [
    { lead: "Increased from 34 static snippets to", value: "70+", caption: "production-ready components" },
    {
      lead: "Expanded from HTML-only to",
      value: "4 frameworks",
      caption: "native React, Angular, Web Components, and Flutter support.",
    },
    { lead: "Introduced", value: "36+ Patterns", caption: "documented user journeys." },
    { lead: "Integrated native", value: "WCAG 2.1 AA", caption: "compliance" },
  ],
  timeline: [
    { date: "Dec 2025", phase: "Kickoff", description: "Mandate: make 3.0 worth adopting." },
    { date: "Jan 2026", phase: "Benchmarking", description: "18 design systems studied, 16 scored against ~28 criteria." },
    { date: "Feb 2026", phase: "Listening", description: "A six-minute survey to 79 people across NeGD, DIC, state IT departments, and vendor teams — 47 replied." },
    { date: "Mar 2026", phase: "Foundations", description: "Tokens, type, grid, spacing, dark mode — the layer everything else stands on." },
    { date: "Apr 2026", phase: "Components", description: "60+ components, designed and built in parity, across four frameworks." },
    { date: "May 2026", phase: "Patterns", description: "36 service patterns across nine journey families." },
    { date: "Jun 2026", phase: "Rollout", description: "Docs, packages, Figma library. Phase 1 shipped 31 March 2026; Phase 2 shipped June 2026." },
  ],

  /* ── Part 1 · New Foundations ─────────────────────────────────────── */
  foundations: [
    {
      title: "Design tokens",
      lead: [
        "Every colour, size, space and radius in 3.0 is a named variable, not a number typed into a file. Components read the variable; the variable is what we change.",
        "Accessibility starts at the palette. If a colour pair can't pass, it doesn't ship.",
      ],
      bullets: [
        "Every text-on-surface pair in the system is checked against WCAG 2.1 AA before it becomes a token.",
        "Focus, error, disabled and selected states are defined at the foundation layer, so no component invents its own.",
      ],
      images: [
        {
          src: "/case-studies/ux4g/part1/tokens.png",
          alt: "The 3.0 primitive colour ramps beside the semantic colour styles defined as Figma variables",
          width: 1320,
          height: 433,
        },
      ],
      outro: [
        "→ Primitive tokens hold the raw values. Semantic tokens say what they're for — “background”, not “purple 500”. → Change one token and it updates everywhere, in Figma and in code.",
      ],
    },
    {
      title: "Dark mode",
      lead: ["Dark mode ships as a second mode on the same tokens, not a second stylesheet."],
      images: [
        {
          src: "/case-studies/ux4g/part1/darkmode.png",
          alt: "The DigiLocker login screen rendered from the same components in light and dark mode",
          width: 1320,
          height: 551,
        },
      ],
    },
    {
      title: "Typography",
      // Set as a plain heading in the frame, without the "Introducing" prefix.
      noPrefix: true,
      lead: [
        "Noto Sans is the primary typeface in UX4G Design System. It offers high legibility, modern proportions, and supports multiple Indian languages, making it suitable for both display and body text across web and mobile interfaces.",
      ],
      images: [
        {
          src: "/case-studies/ux4g/part1/typography.png",
          alt: "The Noto Sans specimen — display and body cuts, weights, and the 25 Indian languages supported",
          width: 1320,
          height: 1206,
        },
        {
          src: "/case-studies/ux4g/part1/typestyles.png",
          alt: "The type styles collection in Figma variables — 110 styles across base, tablet, and mobile",
          width: 1320,
          height: 992,
        },
      ],
    },
    {
      title: "Spacing and breakpoints",
      lead: [
        "Three standard **columns grids (12, 8 & 4 column)**, **4 breakpoints**, one spacing scale built on a **4px unit**.",
      ],
      images: [
        {
          src: "/case-studies/ux4g/part1/spacing.png",
          alt: "The responsive and spacing variable collections — breakpoints, column counts, gutters, and the 4px spacing scale",
          width: 1320,
          height: 551,
        },
      ],
      outroBullets: [
        "Every component ships with its responsive behaviour defined, not left to the build team.",
        // TYPO (frame): "respondants" → "respondents".
        "**34 of 47 survey respondents** named \"no responsive breakpoints or grid\" as a blocker — the top answer in the survey.",
      ],
    },
  ],

  /* ── Part 2 · The component library ───────────────────────────────── */
  components: {
    opener: {
      part: "Part 2",
      title: "The component library",
      tint: "#4a2bc3",
      image: {
        src: "/case-studies/ux4g/part2/kit.png",
        alt: "The UX4G Design System 3.0 Beta kit published on the Figma community",
        width: 646,
        height: 535,
      },
    },
    // Node 3022:32453 — the frame replaced the earlier 2×2 board with one
    // row of four, and shortened every caption. The first caption is the
    // only one that wraps; the frame holds it to 291 of the 1320 column.
    stats: [
      { value: "60+", label: "components (Including patterns)" },
      { value: "36", label: "Service patterns" },
      { value: "4", label: "Frameworks" },
      { value: "npm", label: "package" },
    ],
    blocks: [
      {
        title: "bigger and modern components library",
        // PLACEHOLDER (frame): this line is still a note-to-self, not copy.
        lead: ["write about 3.0 design system components"],
        images: [
          {
            src: "/case-studies/ux4g/part2/library.png",
            alt: "A spread of 3.0 components — navigation, buttons, inputs, avatars, date and time pickers, cards, and toggles",
            width: 1320,
            height: 692,
          },
        ],
      },
      {
        title: "one component, four platforms",
        lead: [
          "The biggest reason teams walked away from 2.0 was that they couldn't install it. 3.0 is a package.",
        ],
        bullets: [
          "npm install for React, Angular and Web Components. A Flutter package for mobile.",
          "31 of 47 asked for an npm package and 28 for framework packages.",
        ],
        images: [
          {
            src: "/case-studies/ux4g/part2/platforms.png",
            alt: "The Build with UX4G developer pages — install steps and framework tabs for React, Angular, Web Components, and Flutter",
            width: 1320,
            height: 692,
          },
        ],
      },
      {
        title: "components built for Indian services",
        lead: ["Every Indian team was building the most India-critical UI themselves, differently, every time."],
        bullets: [
          "Aadhaar, PAN and OTP as first-class components with their own validation rules.",
          "30 of 47 had hand-built an Aadhaar / PAN / OTP input. 27 had built their own file upload.",
        ],
        images: [
          {
            src: "/case-studies/ux4g/part2/indian-services.png",
            alt: "The Aadhaar number, OTP, and PAN input components with their masking and validation states",
            width: 1320,
            height: 692,
          },
        ],
      },
      {
        title: "accessibility inside the component",
        lead: [
          "2.0 offered an accessibility toolbar/widget you switched on. 3.0 puts the behaviour inside the component instead.",
        ],
        bullets: [
          "Every component page documents how it behaves with a keyboard and a screen reader.",
          "24 of 47 teams had to fix issues before their GIGW sign-off. Only 6 passed first time.",
        ],
        images: [
          {
            // The frame reuses the developer-pages plate on this block.
            src: "/case-studies/ux4g/part2/accessibility.png",
            alt: "Component documentation pages showing keyboard and screen-reader behaviour alongside the install steps",
            width: 1320,
            height: 692,
          },
        ],
      },
      {
        title: "mobile, properly",
        lead: ["2.0 was a desktop web kit. Every team building for Android or Flutter was on their own."],
        bullets: [
          "Mobile variants of every component, plus mobile-specific patterns - bottom sheets, app bars, tab bars.",
          "A Flutter package so mobile teams use the same system, not a lookalike.",
          "All 47 build for web, 21 for Android, 14 for Flutter. 31 said 2.0 had no mobile versions.",
        ],
        images: [
          {
            src: "/case-studies/ux4g/part2/mobile.png",
            alt: "Mobile components and patterns — app bars, steppers, alerts, bottom sheets, and a mobile footer",
            width: 1320,
            height: 692,
          },
        ],
      },
    ],
  },

  /* ── Part 3 · Service Patterns ────────────────────────────────────── */
  patterns: {
    opener: {
      part: "Part 3",
      title: "Service Patterns",
      image: {
        src: "/case-studies/ux4g/part3/opener.png",
        alt: "The nine service pattern groups — identity and access, consent, application, status, payments, search, dashboards, notifications, and feedback",
        width: 660,
        height: 628,
      },
    },
    intro:
      "The part that changes what UX4G is. Components let you build a screen. Patterns let you build a service - 36 of them, across the nine journeys every government service is made of.",
    stats: [
      { value: "9", label: "Groups" },
      { value: "12", label: "Patterns in one apply journey" },
      { value: "36", label: "0 → 36 Patterns" },
    ],
    blocks: [
      {
        title: "one level above components",
        lead: [
          "A component is a single part - a field, a button, a card. A pattern puts several of them together to solve one whole thing a citizen is trying to do: sign in, give consent, upload a document, track an application.",
        ],
        bullets: [
          "Nine groups: identity and access (8) · consent and declaration (3) · application and submission (6) · status and tracking (3) · payments (1) · search and discovery (3) · dashboards and my applications (3) · notifications (5) · feedback and communication (4). → Built in the order the survey said was hardest — multi-step applications (32 of 47), document upload and verification (29), identity and authentication (28).",
          "Teams stop re-deciding how a flow should work and start from one that has already been decided.",
        ],
        images: [
          {
            src: "/case-studies/ux4g/part3/patterns.png",
            alt: "Pattern screens in sequence — profile completion, rating, conditional guidance, an applications dashboard, and an application form",
            width: 1320,
            height: 692,
          },
        ],
      },
    ],
  },

  /* ── Part 4 · How teams get it ────────────────────────────────────── */
  rollout: {
    opener: {
      part: "Part 4",
      title: "How teams get it",
      image: {
        src: "/case-studies/ux4g/part4/opener.png",
        alt: "The two entry points on the docs site — I'm a Designer and I'm a Developer",
        width: 660,
        height: 628,
      },
    },
    lead: [
      "npm packages per framework, a CDN link for teams who need one, a Figma library, and a ZIP for teams behind a locked-down network",
      "Rebuilt around three things a person actually does:",
    ],
    bullets: [
      "**Discover:** see all 60+ components at a glance and find the one you need.",
      "**Learn**: anatomy, properties, do's and don'ts, accessibility notes, when not to use it.",
      "**Use:** copy the exact snippet for your framework, or open it in the sandbox.",
    ],
    image: {
      src: "/case-studies/ux4g/part4/docs.png",
      alt: "The component documentation — the form elements index, a button's anatomy and sizing specs, and its install snippet",
      width: 1320,
      height: 692,
    },
  },
};
