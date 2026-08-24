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
    // The frame now sets a photo of each group beside its count, and reads
    // 4 developers, not 5.
    roles: [
      {
        value: "2",
        label: "Designers",
        photo: {
          src: "/case-studies/ux4g/team/designers.png",
          alt: "The two designers on UX4G 3.0",
          width: 600,
          height: 408,
        },
      },
      {
        value: "1",
        label: "Product manager",
        photo: {
          src: "/case-studies/ux4g/team/product-manager.png",
          alt: "The product manager on UX4G 3.0",
          width: 600,
          height: 408,
        },
      },
      {
        value: "4",
        label: "Developers",
        photo: {
          src: "/case-studies/ux4g/team/developers.png",
          alt: "The four developers on UX4G 3.0",
          width: 600,
          height: 408,
        },
      },
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

  /* ── The service-catalogue analysis ───────────────────────────────────
     Sits with the benchmarking, not in the solution: this is how we found
     out what to build, and Parts 1–4 are what we built. Figures are the
     project's own — roughly 12,000 services, 14 categories, 72
     sub-categories, 10 journey types. Written in "we" because the mapping
     was joint work with the other designer on the system.

     `categories` below carries the same 14/72/12,000 split down to each
     category's own sub-categories — the level of detail the top-line
     stats summarise but don't show. */
  serviceResearch: {
    eyebrow: "Then we read the catalogue",
    title: "12,000 services,",
    accent: "10 shapes",
    lead: [
      "Benchmarking showed us what other design systems ship. It couldn't tell us what an Indian government service actually asks a citizen to do — so we read the whole catalogue.",
    ],
    note: "Read by hand from service catalogues, VLE onboarding kits and state e-District documentation — the portals block automated access.",
    stats: [
      { value: "12,000", label: "services read", labelWidth: "180px" },
      { value: "14", label: "top-level categories" },
      { value: "72", label: "sub-categories" },
      { value: "10", label: "journey types" },
    ],
    // The 14 categories behind the stats above, and the sub-categories
    // each one splits into. Same joint mapping as the stats — figures are
    // the project's own, not re-derived or rounded further here.
    categories: [
      {
        name: "Education and learning",
        icon: "education",
        totalServices: "1,329",
        subCategories: [
          { name: "Schools and school education", count: "~400 services" },
          { name: "Universities and higher education", count: "289 services" },
          { name: "Education and training grants", count: "308 services" },
          { name: "Apprenticeships and training", count: "48 services" },
        ],
      },
      {
        name: "Health and wellness",
        icon: "health",
        totalServices: "600",
        subCategories: [
          { name: "Healthcare services (CGHS, Ayushman)", count: "~200 services" },
          { name: "Clinical establishment registration", count: "~150 services" },
          { name: "Medicines and pharmacy", count: "~100 services" },
          { name: "Mental health and disability", count: "~80 services" },
          { name: "Medical practitioner registry", count: "~70 services" },
        ],
      },
      {
        name: "Electricity, water and local services",
        icon: "utilities",
        totalServices: "~400",
        subCategories: [
          { name: "Electricity connections and billing", count: "~200 services" },
          { name: "Water and sanitation", count: "~100 services" },
          { name: "Local municipal services", count: "~100 services" },
        ],
      },
      {
        name: "Money and taxes",
        icon: "finance",
        totalServices: "~500",
        subCategories: [
          { name: "Income tax filing", count: "~80 services" },
          { name: "GST registration and returns", count: "~60 services" },
          { name: "Banking and financial services", count: "~100 services" },
          { name: "Customs and excise", count: "~80 services" },
          { name: "Loans and credit", count: "~100 services" },
          { name: "Insurance (non-CSC)", count: "~80 services" },
        ],
      },
      {
        name: "Jobs",
        icon: "jobs",
        totalServices: "1,272",
        subCategories: [
          { name: "Career information", count: "~200 services" },
          { name: "Employees (EPF, ESI, labour welfare)", count: "~300 services" },
          { name: "Employers (eMigrate, EPFO)", count: "29 services" },
          { name: "Employment exchanges and jobs", count: "148 services" },
          { name: "Retirement (pension, gratuity)", count: "~200 services" },
          { name: "Working conditions and safety", count: "~100 services" },
        ],
      },
      {
        name: "Justice, law and grievances",
        icon: "justice",
        totalServices: "~350",
        subCategories: [
          { name: "Courts and legal aid", count: "~100 services" },
          { name: "Police and FIR", count: "~80 services" },
          { name: "Consumer protection", count: "~60 services" },
          { name: "RTI", count: "~40 services" },
          { name: "Grievance redressal (CPGRAMS)", count: "~70 services" },
        ],
      },
      {
        name: "Travel and tourism",
        icon: "travel",
        totalServices: "~200",
        subCategories: [
          { name: "Booking (rail, air, bus, hotel)", count: "~80 services" },
          { name: "Tourist visa and e-visa", count: "~40 services" },
          { name: "Tourism registration (guides, agents)", count: "~80 services" },
        ],
      },
      {
        name: "Business and self-employed",
        icon: "business",
        totalServices: "4,083",
        subCategories: [
          { name: "Setting up (company registration, MSME)", count: "~600 services" },
          { name: "Licences, trademarks and copyright", count: "~800 services" },
          { name: "Imports and exports", count: "~400 services" },
          { name: "Employee management (EPFO, ESIC)", count: "~500 services" },
          { name: "Sales of goods and services (GST)", count: "~400 services" },
          { name: "Closing down", count: "~100 services" },
          { name: "Waste and environmental impact", count: "~200 services" },
        ],
      },
      {
        name: "Births, deaths, marriages and child care",
        icon: "family",
        totalServices: "~400",
        subCategories: [
          { name: "Birth and death certificates", count: "~150 services" },
          { name: "Marriage registration", count: "~80 services" },
          { name: "Adoption", count: "~30 services" },
          { name: "Child welfare schemes", count: "~100 services" },
          { name: "Anganwadi and ICDS services", count: "~40 services" },
        ],
      },
      {
        name: "Pension and benefits",
        icon: "pension",
        totalServices: "1,638",
        subCategories: [
          { name: "Benefits, grants and subsidies", count: "143 services" },
          { name: "Families (widow, destitute support)", count: "~300 services" },
          { name: "Persons with disabilities", count: "~200 services" },
          { name: "Senior citizens", count: "~150 services" },
          { name: "Students (scholarship)", count: "~400 services" },
          { name: "Migrants, refugees and visitors", count: "~100 services" },
        ],
      },
      {
        name: "Transport and infrastructure",
        icon: "transport",
        totalServices: "900",
        subCategories: [
          { name: "Roads and road transport (DL, RC)", count: "~300 services" },
          { name: "Railways", count: "~100 services" },
          { name: "Aviation", count: "~80 services" },
          { name: "Maritime", count: "~100 services" },
          { name: "Public transport and private vehicles", count: "~200 services" },
          { name: "Infrastructure and registration", count: "~120 services" },
        ],
      },
      {
        name: "Citizenship, visas and passports",
        icon: "citizenship",
        totalServices: "92",
        subCategories: [
          { name: "Citizenship and living in India", count: "43 services" },
          { name: "Passports", count: "~20 services" },
          { name: "Living and travel abroad", count: "~20 services" },
          { name: "Visas", count: "~9 services" },
        ],
      },
      {
        name: "Agriculture, rural and environment",
        icon: "agriculture",
        totalServices: "1,769",
        subCategories: [
          { name: "Farming (soil, seeds, inputs, advisory)", count: "~600 services" },
          { name: "Land and water resources", count: "~300 services" },
          { name: "Fishing", count: "~150 services" },
          { name: "Rural services (MGNREGA, PM-KISAN)", count: "~300 services" },
          { name: "Environmental management", count: "~150 services" },
          { name: "Wildlife and biodiversity", count: "~70 services" },
          { name: "Weather and climate", count: "~70 services" },
        ],
      },
      {
        name: "Science, IT and communications",
        icon: "science",
        totalServices: "~300",
        subCategories: [
          { name: "Telecom and broadband (TRAI, DoT)", count: "~80 services" },
          { name: "Postal services (India Post)", count: "~60 services" },
          { name: "Digital services (DigiLocker, Aadhaar)", count: "~60 services" },
          { name: "Research and scientific grants", count: "~50 services" },
          { name: "Spectrum and licensing (G2B)", count: "~50 services" },
        ],
      },
    ],
    // Each journey's steps are the recurring ones it contains. The matrix
    // is what carries the finding: the same handful of steps keeps coming
    // back, which is exactly why patterns are possible at all.
    journeys: [
      {
        name: "Apply",
        summary: "Asks for a certificate or registration, then waits on a decision",
        steps: ["aadhaar", "upload", "status"],
        definition:
          "Citizen applies for a government-issued credential, certificate, or registration. Requires official review. Outcome is delayed.",
        exampleServices: [
          "Passport",
          "PAN card",
          "e-District certificates",
          "Driving licence",
          "FSSAI",
          "GeM registration",
          "Udyam MSME",
          "RTI filing",
          "Tourist visa",
        ],
      },
      {
        name: "Pay",
        summary: "Settles a bill or a fee",
        steps: ["payment"],
        definition:
          "Citizen settles an existing obligation — a utility bill, recharge, tax payment, or fee. The biller account already exists. No new relationship is created.",
        exampleServices: [
          "Electricity",
          "Water / gas bills",
          "Mobile recharge",
          "DTH recharge",
          "Insurance premium renewal",
          "ITR payment",
          "FASTag recharge",
          "Vehicle tax",
        ],
      },
      {
        name: "Enrol",
        summary: "Signs up for a scheme or programme",
        steps: ["aadhaar"],
        definition:
          "Citizen registers to receive ongoing government benefits — pension, insurance coverage, or welfare entitlements. A new long-term relationship with the state is created.",
        exampleServices: [
          "PM Kisan Samman Nidhi",
          "PM Shram Yogi Maandhan",
          "Ayushman Bharat",
          "E-Shram",
          "PMFBY crop insurance",
          "NPS pension",
          "Jan Dhan account",
          "MGNREGA registration",
        ],
      },
      {
        name: "Verify",
        summary: "Proves an identity or an eligibility",
        steps: ["aadhaar"],
        definition:
          "Citizen is biometrically authenticated in real time against their Aadhaar record. The output is a certified digital proof or an instant transaction confirmation.",
        exampleServices: [
          "Jeevan Pramaan (life certificate)",
          "Aadhaar enrolment",
          "Aadhaar biometric update",
          "eSign document signing",
          "e-KYC for service activation",
        ],
      },
      {
        name: "Update",
        summary: "Corrects something already on record",
        steps: ["aadhaar", "upload", "status"],
        definition:
          "Citizen corrects or amends an existing government record. No new entitlement is created — only existing data changes.",
        exampleServices: [
          "Aadhaar name / address / DOB correction",
          "Aadhaar mobile update",
          "Aadhaar biometric update",
          "Voter ID correction",
          "Ration card modification",
        ],
      },
      {
        name: "Transact",
        summary: "Exchanges something of value with a department",
        steps: ["aadhaar", "payment"],
        definition:
          "A VLE conducts a regulated financial or insurance transaction on behalf of a citizen. The VLE must hold a specific certification. The citizen's own biometric authorises the transaction.",
        exampleServices: [
          "DigiPay cash withdrawal",
          "AePS cash deposit",
          "AePS balance enquiry",
          "Life insurance policy issuance",
          "Motor / health insurance",
          "NPS contribution",
          "Banking BC account opening",
        ],
      },
      {
        name: "Consult",
        summary: "Books time with someone who can advise",
        steps: ["booking"],
        definition:
          "Citizen receives a professional advisory session via video — medical, legal, or agricultural. No documents submitted, no approval needed. Output is advice, a prescription, or a referral.",
        exampleServices: [
          "Tele-medicine",
          "Tele-Law consultation",
          "Agri tele-consultation",
          "JIVA Ayurveda",
          "Specialist referral booking",
        ],
      },
      {
        name: "Access",
        summary: "Looks something up, or pulls a document back out",
        steps: ["aadhaar"],
        definition:
          "Citizen books or purchases a transactional service, or retrieves information from a government system. No government approval needed. Confirmation or result is instant.",
        exampleServices: [
          "Train / bus / flight / hotel booking",
          "NIOS / NIELIT course registration",
          "Grameen eStore order",
          "Darshan booking",
          "e-Courts case status",
          "Bhulekh land records",
          "Exam results",
          "EPF balance check",
        ],
      },
      {
        name: "Lodge",
        summary: "Raises a complaint and follows it",
        steps: ["upload", "status"],
        definition:
          "Citizen reports a problem, rights violation, or service failure and expects the government to take action. Unlike Apply, there is no credential being sought — the outcome is resolution or escalation.",
        exampleServices: [
          "CPGRAMS public grievance",
          "Consumer complaint (NCDRC)",
          "Online FIR / e-FIR",
          "RTI application",
          "Election complaint",
          "RERA housing complaint",
          "Labour dispute",
          "Corruption complaint (Lokayukta)",
        ],
      },
      {
        name: "Assess",
        summary: "Sits a test or an inspection",
        steps: ["upload", "status", "booking"],
        definition:
          "Citizen applies online but a government official must physically visit, examine, or conduct a test before the outcome can be generated. The outcome is created by the official, not the system.",
        exampleServices: [
          "Disability certificate (UDID)",
          "Driving licence test slot",
          "Vehicle fitness certificate (PUC)",
          "Food safety inspection (FSSAI)",
          "Factory inspection",
          "Building plan approval",
          "Soil testing",
        ],
      },
    ],
    outro: [
      "That repetition is the whole argument for patterns: if a step is the same shape in six different journeys, it gets solved once, not six times.",
    ],
  },

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
        // Node 2944:49403 — the frame took this plate out to the full 1440
        // artboard and squared its corners, so it runs as a purple band the
        // page passes through rather than as a card in the column.
        {
          src: "/case-studies/ux4g/part1/typestyles.png",
          alt: "The type styles collection in Figma variables — 110 styles across base, tablet, and mobile",
          width: 1477,
          height: 1081,
          bleed: "#4a2bc3",
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
      // Node 3022:32451 — a 660x628 cell filled edge to edge by the kit
      // shot, with the purple showing only as a band above and below it.
      image: {
        src: "/case-studies/ux4g/part2/kit.png",
        alt: "The UX4G Design System 3.0 Beta kit published on the Figma community",
        width: 1320,
        height: 1256,
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

  /* ── Part 3 · Service Patterns ────────────────────────────────────
     This has to read as the answer, not more analysis. Two earlier versions
     failed at exactly that: both opened by restating the problem ("a handful
     of steps kept turning up"), and the second drew its groups as the same
     bar chart the research band uses — so it looked like a second findings
     section. It now opens on the thing that was built, and the before/after
     does the explaining. */
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
      "We built 36 patterns. A pattern is a finished piece of a service — not a button, but a whole step, with every screen it needs, every branch it can take and every way it can fail. Teams now assemble a service from these instead of designing each flow from scratch.",
    stats: [
      { value: "36", label: "patterns built" },
      { value: "9", label: "groups they fall into" },
      { value: "12", label: "patterns in one apply journey" },
    ],
    // Deliberately general. An earlier version built this around the Aadhaar
    // sign-in, which made the whole section read as being about one pattern.
    contrast: {
      before: "Every service was drawn from scratch. The same steps — signing in, uploading proof, paying, tracking a request — ended up looking and behaving differently in each one.",
      after: "Each of those steps now exists once, finished and documented. A team picks the patterns its journey needs and puts the service together from them.",
    },
    groups: [
      { name: "Identity and access", count: 8 },
      { name: "Application and submission", count: 6 },
      { name: "Notifications", count: 5 },
      { name: "Feedback and communication", count: 4 },
      { name: "Consent and declaration", count: 3 },
      { name: "Status and tracking", count: 3 },
      { name: "Search and discovery", count: 3 },
      { name: "Dashboards and my applications", count: 3 },
      { name: "Payments", count: 1 },
    ],
    image: {
      src: "/case-studies/ux4g/part3/patterns.png",
      alt: "Pattern screens in sequence — profile completion, rating, conditional guidance, an applications dashboard, and an application form",
      width: 1320,
      height: 692,
    },
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

  /* ── Where it stands · the shipped states ─────────────────────────── */
  /* The page described building a national design system for its whole
     length and never said the thing is public and usable today. This is
     that missing paragraph, and it belongs after Part 4 — "how teams get
     it" raises the question "is it actually out?", and trade-off 04 later
     closes on the Beta shipping, so the reader needs to have met the
     release before that line can land as a callback.

     Shipped states only. The roadmap — versioned stable release, the
     contribution and showcase mechanism — is real but unbuilt, and a
     portfolio section that mixes done with planned makes the reader
     discount both. */
  release: {
    eyebrow: "Shipped, not finished",
    title: "Where it",
    accent: "stands today",
    lead: "UX4G 3.0 is not a proposal or a prototype. The Beta is public, and government teams can build on it today.",
    states: [
      {
        status: "Shipped",
        tone: "done",
        title: "Internally, first",
        body: [
          "It went to product teams inside NeGD before it went anywhere else — so the kit and the framework packages were stress-tested against real work while the documentation, the website and everything around them were still being built.",
        ],
      },
      {
        status: "Live now",
        tone: "live",
        title: "Public Beta",
        body: [
          "The full system — foundations, components and patterns — is public at **ux4g.gov.in**, for designers and developers both.",
          "Documentation lives in three places: the Figma library, the main site, and a Storybook. The Storybook exists specifically so that implementation through agentic AI produces consistent, standard output rather than improvised variations — the system decides what gets built, and AI is left to help build it.",
          "The Beta stays open for input from other government service teams and from the wider community before anything is called final.",
        ],
      },
    ],
    links: [
      { label: "ux4g.gov.in", note: "The live system", href: "https://ux4g.gov.in" },
      {
        label: "UX4G Design System 3.0 Beta",
        note: "Figma community file",
        href: "https://www.figma.com/community/file/1654976809099378421/ux4g-design-system-3-0-beta",
      },
    ],
  },

  /* ── The closing chapter · Trade-offs ─────────────────────────────── */
  /* Four decision stories, not a list of UI debates. Each headline is the
     question as it was actually faced, and the `**…**` span inside it is the
     answer we went with — the section note tells the reader that is what the
     violet means. Bodies are held to roughly 50 words: this is the last thing
     on the page, and it has to be read at a glance to be read at all.
     The parallel design system in #2 and the Figma-kit-by-AI question in #3
     are deliberately unattributed — naming a role would make the story about
     a person, and the point is that team feedback and real usage settled
     both, not seniority. */
  tradeoffs: {
    eyebrow: "Every yes cost a no",
    title: "The decisions behind",
    accent: "the system",
    lead: "Building a national design system meant balancing speed, evidence, quality and scale. These four calls shaped it most.",
    note: "The violet half of each question is the answer we went with.",
    items: [
      {
        question: "Build fast, or **build the right foundation**?",
        body: [
          "The first phase was three months, and it wasn't only components — research, benchmarking, understanding how teams build services, the foundations, and approvals from NeGD and leadership all sat inside it. We invested in the foundation first rather than rushing out a large component count.",
        ],
        takeaway: "Speed mattered, but building the wrong system faster wouldn't have helped anyone.",
        result: "Phase 1 shipped on 31 March 2026.",
      },
      {
        question: "Follow an existing solution, or **understand what teams actually need**?",
        body: [
          "Midway, another design system was introduced for project teams — a documentation site and AI-generated components, but no Figma kit and no research into what teams needed or built with. Instead of arguing ours was better, we let teams use both and listened. The feedback favoured UX4G 3.0, and the work resumed.",
        ],
        takeaway: "When opinions conflict, real usage is better evidence than hierarchy.",
      },
      {
        question: "AI can create components quickly. **Can it create the right system?**",
        body: [
          "When building the Figma kit through AI came up, I pushed back — not because AI can't generate UI, but because a design system has to reflect real usage. Without knowing what teams use, which components they need, which frameworks they build on, and where today's experiences fail, a library is a large collection without a purpose.",
        ],
        takeaway: "AI can accelerate production. It can't replace understanding.",
      },
      {
        question: "**More resources**, or lower quality?",
        body: [
          "When the project resumed the deadline held, but the scope grew: the remaining components, service patterns, full journeys, four frameworks, Storybook documentation and Theme Craft before the June Beta. Instead of asking the same team to work faster, we added people — and my role shifted to helping them build within the system.",
        ],
        takeaway: "When scope grows, adding people is more sustainable than simply adding pressure.",
        result: "UX4G 3.0 Beta shipped in June 2026.",
      },
    ],
  },
};
