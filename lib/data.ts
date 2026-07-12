import type { Project, CaseStudy, Skill, Principle, Experience, NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Approach", href: "#approach" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    id: "ux4g",
    number: "01",
    title: "UX4G Design System 3.0",
    subtitle: "India's national UI standard, under NeGD and MeitY",
    description:
      "Rebuilt the national design system from a Bootstrap-tied component library into a token-driven engine shipped natively to four frameworks. Grew the library from 34 to 58 components plus a 36-pattern library, and it's now mandated as the government standard.",
    tags: ["Design Systems", "Design Tokens", "WCAG 2.1"],
    year: "2025",
    role: "Product Owner",
    caseStudySlug: "ux4g",
    color: "hsl(15 65% 45%)",
    featured: true,
  },
  {
    id: "survey-setu",
    number: "02",
    title: "Survey Setu",
    subtitle: "Field survey platform for the Ministry of Tribal Affairs",
    description:
      "Designed end-to-end as the sole designer: 50+ mobile screens and multi-persona web dashboards for a live government platform reaching 40+ lakh citizens across India's Scheduled Tribe population. Launched April 2026.",
    tags: ["Gov-tech", "Mobile-First Design", "Multi-Persona Dashboards"],
    year: "2026",
    role: "Sole Designer",
    caseStudySlug: "survey-setu",
    color: "hsl(220 60% 40%)",
    featured: true,
  },
  {
    id: "niri",
    number: "03",
    title: "NIRI Portal",
    subtitle: "Infrastructure readiness monitoring for MoSPI",
    description:
      "A unified platform for the Ministry of Statistics and Programme Implementation to collect, validate, approve, visualize, and rank infrastructure readiness data across India's States, UTs, and Ministries.",
    tags: ["Gov-tech", "Dashboards", "Multi-Tier Workflows"],
    year: "2025",
    role: "UI/UX Designer",
    caseStudySlug: "niri",
    color: "hsl(172 45% 32%)",
    featured: true,
  },
  {
    id: "ebcas",
    number: "04",
    title: "eBCAS 2.0",
    subtitle: "Airport entry permit ecosystem for the Bureau of Civil Aviation Security",
    description:
      "Digitizing the full lifecycle of airport entry permits: 13 permit types, multi-agency approval chains, Aadhaar e-KYC and biometric verification, mapped role by role into type-aware application flows across 4 modules.",
    tags: ["Gov-tech", "Complex Workflows", "Identity & Security"],
    year: "2026",
    role: "UI/UX Designer",
    caseStudySlug: "ebcas",
    color: "hsl(248 40% 48%)",
  },
  {
    id: "bharatnow",
    number: "05",
    title: "BharatNow",
    subtitle: "Citizen news and government updates, in short form",
    description:
      "A mobile-first citizen app for news by topic, ministry, and scheme, built on UX4G Design System 3.0. Designed the discovery surface end-to-end: text, voice, and tag search with an i18n-ready string system.",
    tags: ["Mobile UX", "Consumer App", "Design Language"],
    year: "2026",
    role: "UI/UX Designer",
    caseStudySlug: "bharatnow",
    color: "hsl(32 75% 42%)",
  },
  {
    id: "salonx",
    number: "06",
    title: "SalonX",
    subtitle: "B2C salon management app, from research to handoff",
    description:
      "Led end-to-end design of a salon management mobile app: user research, journey mapping, and usability testing across 3 personas, delivered as 40+ high-fidelity screens with a cross-platform design system.",
    tags: ["Mobile UX", "User Research", "Design System"],
    year: "2024",
    role: "UI/UX Designer",
    caseStudySlug: "salonx",
    color: "hsl(285 40% 42%)",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "ux4g",
    project: "UX4G Design System 3.0",
    title: "UX4G didn't have a design problem. It had a scale problem.",
    challenge:
      "Version 2.0 looked like a design system, but it was tied to Bootstrap and too rigid to evolve. It looked like a system and worked like a style guide: every ministry team that needed something the library didn't have just rebuilt it from scratch, so platforms drifted apart and small fixes never made it back into the product.",
    approach:
      "As Product Owner, I ran the research and proposal, then rebuilt the foundation on design tokens: a single source of truth shared between Figma and code, so a change defined once propagates everywhere instead of being redone by hand. I benchmarked UX4G against 16 leading government and industry systems, set adoption over completeness as the operating rule for a one-person, four-framework scope, and built the core components and patterns myself, working with the engineering team to ship native packages for React, Angular, Flutter, and Web.",
    outcome:
      "The library grew from 34 to 58 components plus a 36-pattern library, shipped as installable packages across all four frameworks, and 3.0 is now mandated as the standard for government platforms by NeGD leadership. I've since been running hands-on enablement sessions so government design teams build with it directly.",
    metrics: [
      { value: "58", label: "Components shipped (up from 34 in v2.0)" },
      { value: "36", label: "Reusable patterns in the library" },
    ],
    tags: ["Design Systems", "Design Tokens", "WCAG 2.1"],
    duration: "2025 – Jul 2026",
    team: "Product Owner; devops and engineering for framework packages",
    narrative: [
      {
        heading: "Setting the scene",
        body: "UX4G 2.0 had colours, type, icons, and 34 components, and it looked like a design system. But it worked like a style guide: every new UI need turned into the same debate, 'if it's not in the library, we rebuild it.' Teams hacked around it or shipped inconsistent UX, and delivery slowed. To ground the rebuild in evidence rather than opinion, I benchmarked UX4G against 16 leading government and industry systems, including GOV.UK, USWDS, Material 3, and Carbon. The verdict: aligned in goal, but a full tier behind on technical foundation.",
        images: [
          {
            src: "/case-studies/ux4g/benchmark-matrix.jpg",
            alt: "Capability comparison matrix scoring UX4G and NL Design System against Developers Italia and major design systems including GOV.UK, USWDS, Adobe, and Atlassian across foundation, technical, and strategic maturity tiers",
            caption: "The benchmark that grounded the rebuild: UX4G scored against 16 government and industry design systems.",
            aspect: "portrait",
          },
        ],
      },
      {
        heading: "Speed versus foundation",
        body: "There was real pressure to deliver 3.0 as a complete ecosystem in about three months: the Figma kit, foundations, components, patterns, docs, Storybook, framework packages, and testing, all at once. An earlier internal proposal took that path and generated a large component library and documentation fast, but the result had no shared Figma source of truth, no semantic tokens, and components that weren't grounded in real government use cases. A design system isn't a collection of components, it's infrastructure, and infrastructure without validated foundations gets harder to maintain with every team that builds on it. With the UX4G design team, I recommended a phased roadmap instead: foundations, tokens, and core components first, validated with real product teams, before expanding into patterns, documentation, and framework packages.",
      },
      {
        heading: "Validating with evidence, not opinions",
        body: "Rather than debate which approach was right, we put both in front of real government product teams and asked for implementation feedback. It consistently favoured the token-driven foundation: easier to build on, easier to trust. That evidence mattered, because leadership wanted the full ecosystem production-ready on an aggressive schedule, and I had to make the case for slowing down. Shipping every layer at once risked inconsistent components, breaking changes, technical debt, and lower adoption once teams hit the rough edges. Those were difficult conversations, arguing for more time on foundations when the pressure was to show a complete system fast, but the validation data made the case, and it set UX4G 3.0 on a stronger long-term direction.",
      },
      {
        heading: "Foundations",
        body: "I rebuilt the system on design tokens, a single source of truth shared between Figma and code, so a colour or spacing change defined once propagates everywhere instead of being redone by hand per team. On top of that, variable modes flip light and dark theming on a single click, updating every dependent component. This token foundation is what made consistent theming across four frameworks straightforward, the single biggest technical leap from 2.0. I used it to make good defaults the default: consistent theming instead of per-screen guesswork, and English/Hindi support built in from the start for a citizen-facing product.",
        images: [
          {
            src: "/case-studies/ux4g/typography-tokens.jpg",
            alt: "UX4G display type specification table showing token names, font sizes, weights, and line heights across five display scale steps",
            caption: "Every type step defined as a token, shared between Figma and code.",
            aspect: "wide",
          },
          {
            src: "/case-studies/ux4g/theme-craft.jpg",
            alt: "UX4G Theme Craft plugin interface for customizing primary and accent colour palettes with live AA contrast indicators",
            caption: "The Theme Craft plugin: live theme customization built on the token foundation.",
            aspect: "portrait",
          },
        ],
      },
      {
        heading: "Accessibility as a foundation decision",
        body: "Accessibility was a foundation-phase decision, not a final checklist. I defined and reviewed the semantic colour token system against minimum contrast requirements before it became the base every component built on, so fixing contrast once at the token level carried consistency through the whole system instead of being redone screen by screen. Before 3.0 shipped, we ran a design review and accessibility audit: component states, colour contrast, and interaction consistency, checked against WCAG guidance and cross-referenced with the same benchmark systems I'd studied earlier. When engineering had questions about how a component should behave in a given state, I worked with them to clarify the intended interaction. What I didn't own was implementation: the actual keyboard handling and screen-reader wiring were engineering's work, not mine, and I'd rather be precise about that than claim more.",
      },
      {
        heading: "Scaling patterns with AI, not guesswork",
        body: "Once the core components were solid, the harder problem was patterns: recurring situations like action hierarchy, destructive actions, feedback states, and forms, where 'there's no single correct answer' was causing constant inconsistency and debate. I introduced a method to generate design patterns from the core components using Claude, then trained the design team to apply it themselves. Pattern creation went from slow, manual, one-designer work to a repeatable workflow the whole team could run, and the library now covers 36 patterns.",
        images: [
          {
            src: "/case-studies/ux4g/pattern-library.jpg",
            alt: "UX4G pattern library board showing application status timelines, data tables, OTP verification, date pickers, and confirmation states",
            caption: "A sample of the 36-pattern library, spanning sign-in, payments, and feedback states.",
            aspect: "landscape",
          },
        ],
      },
      {
        heading: "From Figma to production",
        body: "The Figma library is the source of truth. From it, components are built into native packages for React, Angular, Flutter, and Web, published to npm, and documented in the portal, so teams adopt instead of rebuild. We leaned on AI-assisted code generation to move faster. My role at handoff was staying close to implementation: aligning naming conventions between design and code, clearing developer questions, and keeping the two in parity as the packages came together.",
        images: [
          {
            src: "/case-studies/ux4g/docs-portal.jpg",
            alt: "UX4G developer documentation portal quick-start page showing CDN, React, and Angular installation paths",
            caption: "The docs portal: discover a component, learn its rules, copy the exact snippet.",
            aspect: "landscape",
          },
        ],
      },
      {
        heading: "Documentation and adoption",
        body: "Good documentation isn't enough on its own, nobody reads it cover to cover. Adoption had to be built in, not hoped for. With 3.0 now live and mandated as the standard for government platforms by NeGD leadership, I've been running hands-on enablement sessions so government designers build with it directly, because a mandate only sticks when the people using it are set up to succeed.",
      },
      {
        heading: "Early adoption",
        body: "UX4G 3.0 has gone live and been introduced to multiple government product teams, with NeGD leadership directing teams to adopt it for future platforms. Adoption has only just begun, so I'm not going to dress up early numbers as long-term proof. What's verified right now: a production-ready, token-driven system with native support across four frameworks, real documentation and implementation guidance, and early validation from the product teams who tested it against the alternative. The real measure of this work will be sustained adoption over the next year, consistency across products, and less duplicated design effort as more government services move onto it.",
      },
      {
        heading: "What I took from this",
        body: "A design system's hardest problem isn't design, it's adoption. The work that moved the needle wasn't prettier components. It was the tokens, the packages, and the AI-assisted patterns that made it cheaper to use UX4G than to reinvent it. Get that right, and consistency stops being something you police, it becomes the default.",
      },
    ],
  },
  {
    id: "survey-setu",
    project: "Survey Setu",
    title: "One platform, four very different users, 40+ lakh citizens",
    challenge:
      "The Ministry of Tribal Affairs needed a survey platform reaching 40+ lakh citizens across India's Scheduled Tribe population. Four distinct roles (Admin, State Officer, District Officer, Surveyor) with very different workflows and digital fluency had to work from the same system, and field data collection had to hold up on mobile in low-connectivity conditions.",
    approach:
      "As the sole designer, I mapped each role's workflow separately before designing a screen, then built the mobile collection flows first so the field reality constrained the dashboards, not the other way around. Every pattern follows UX4G and WCAG 2.1 standards, and each dashboard shows a role exactly what it needs to act on and nothing else.",
    outcome:
      "Live in production since April 2026. Every role, from Admin to field Surveyor, works from one system designed to hold up on low-end devices and patchy connectivity, delivered end-to-end by a single designer.",
    metrics: [
      { value: "Live", label: "In production since April 2026" },
      { value: "40L+", label: "Citizens the platform serves (4M+)" },
      { value: "4", label: "Distinct user personas, one system" },
    ],
    tags: ["Gov-tech", "Mobile-First", "Accessibility"],
    duration: "Dec 2024 – Apr 2026",
    team: "Sole designer, with NeGD stakeholders and engineering",
    images: [
      {
        src: "/case-studies/survey-setu/app-screens.jpg",
        alt: "Survey Setu app splash screen and dashboard for the Ministry of Tribal Affairs, showing the PVTG Household Survey with completed, reviewed, draft, and flagged counts",
        caption: "The Survey Setu app: Ministry of Tribal Affairs branding, real-time survey completion stats.",
        aspect: "landscape",
      },
    ],
    narrative: [
      {
        heading: "Setting the scene",
        body: "MoTA runs survey operations across some of India's most remote and infrastructure-constrained tribal regions, work that feeds directly into welfare delivery and policy decisions. The ministry's existing tools couldn't meet the government's own requirements: DPDP Act data protection, MeitY-mandated cloud hosting, and the ability to work fully offline in areas with no signal. NeGD proposed a sovereign national survey platform to replace them, and I was brought on as the sole designer for both the field mobile app and the ministry-facing web portal.",
      },
      {
        heading: "Four roles, one field reality",
        body: "The platform serves four distinct roles: Admin, State Officer, District Officer, and Surveyor, each responsible for a different stage of the same survey. Rather than start with screens, I mapped each role's actual workflow first: an Admin configuring and publishing a survey, a State or District Officer assigning territory and reviewing submissions, a Surveyor executing it door to door. The dashboards look different because the jobs are different. A Surveyor never sees an approval queue, and an Officer never sees a raw household form.",
        images: [
          {
            src: "/case-studies/survey-setu/admin-dashboard.jpg",
            alt: "Survey Setu Admin dashboard showing active surveys, state and district officer counts, surveyor activity across 778 districts, and survey-wise progress for PVTG Household Survey and other schemes",
            caption: "The Admin dashboard: system-wide oversight across every survey and every officer, at a glance.",
            aspect: "web",
          },
        ],
      },
      {
        heading: "Designing for the worst connection, not the best",
        body: "Surveyors work in areas with patchy or no connectivity, and the platform has to work fully offline: consent, household details, and scheme evidence all captured and stored locally, then synced once a connection returns. I built the mobile collection flow first, before touching a single dashboard, so the field reality constrained the design instead of an idealised always-online flow. That meant the interface has to be honest about state at every step, what's saved locally, what's synced, what's still pending. The surveyor's home screen surfaces that directly: completed, reviewed, drafts, and flagged counts, so nothing sits invisible on a device waiting for signal.",
      },
      {
        heading: "Assigning territory without overlap",
        body: "Every survey is assigned by government-standard LGD (Local Government Directory) codes, down to the village or area level, so two surveyors never cover the same household. That assignment logic had to surface clearly in the officer-facing flows and stay unambiguous on the surveyor's device, since an unclear boundary in the field means wasted travel in terrain that isn't easy to double back through. On the surveyor's screen, location capture is deliberately final: GPS coordinates are logged automatically at the household and can't be edited afterward, so the record can't drift from where the visit actually happened.",
        images: [
          {
            src: "/case-studies/survey-setu/geo-tagging.jpg",
            alt: "Survey Setu mobile app Location and Geo Tagging screen showing a map pin at a household location, PVTG tribe and habitation name fields, and a note that GPS coordinates cannot be edited after capture",
            caption: "Location and geo-tagging: the first of eleven sections in a household survey, and the one that can't be redone.",
            aspect: "tall",
          },
        ],
      },
      {
        heading: "Verification without wasted re-visits",
        body: "Once a surveyor's data syncs, it enters a review queue: an officer checks it and either approves it or sends it back with a reason. I designed the rejection path to carry enough context that a surveyor doesn't have to re-visit a household blind, the flagged state and why travels back with the data, not just a rejection notice. That loop, submit, review, correct, is the difference between a form that gets filled once and one that gets filled twice.",
        images: [
          {
            src: "/case-studies/survey-setu/submitted-forms.jpg",
            alt: "Survey Setu State Officer submitted forms review screen for the PVTG Household Survey, showing a filterable table of submissions by district, block, village, and tribe",
            caption: "The officer's review queue: every submission filterable by district, block, village, and tribe.",
            aspect: "web",
          },
        ],
      },
      {
        heading: "Designing for an 80-year age range",
        body: "MoTA's surveys, particularly for PVTG (Particularly Vulnerable Tribal Group) communities, reach respondents across a huge range of age and digital literacy. WCAG 2.1 and GIGW 3.0 accessibility weren't optional line items, they were baseline requirements for a citizen-facing government platform. Every pattern in Survey Setu follows the same UX4G and WCAG 2.1 standards I use across my government work: low-literacy-friendly language, clear visual hierarchy, and interfaces that hold up when a surveyor is reading a form aloud to someone who has never used a smartphone. Language is part of that: the app supports 22 scheduled languages, chosen up front, before a single question is asked.",
        images: [
          {
            src: "/case-studies/survey-setu/language-selection.jpg",
            alt: "Survey Setu mobile app language selection screen showing 22 scheduled Indian languages including English, Hindi, Bengali, Telugu, Marathi, Tamil, and Urdu",
            caption: "Language selection is the first screen a surveyor sees, not a settings menu buried three taps deep.",
            aspect: "mobile",
          },
        ],
      },
      {
        heading: "What I took from this",
        body: "I didn't design the backend, the offline-sync engine, or the security model behind Survey Setu, that's solution architecture, not UI design, and I want to be precise about the line between the two. But understanding those constraints, why the app has to work with zero signal, why territory can't overlap, why a rejected form needs a reason attached, is what let me design an interface that fits the system instead of fighting it. The best government UX work I've done has come from reading the architecture document, not skipping it.",
      },
    ],
  },
  {
    id: "niri",
    project: "NIRI Portal",
    title: "Making a five-role federal approval chain feel like one workflow",
    challenge:
      "Infrastructure readiness data from every State, UT, and Ministry reached MoSPI through manual, error-prone processes with no shared view of what was pending where. The platform had to carry data through a five-role chain, from Nodal Officer entry to MoSPI approval, without losing accuracy, auditability, or time.",
    approach:
      "I designed the platform around the approval chain itself: role-specific dashboards that surface pendencies first, data-entry forms built for accuracy with validation and version control, and send-back loops where every rejection carries mandatory feedback so corrections converge instead of cycling.",
    outcome:
      "Delivered and live. The platform now carries data collection, validation, multi-tier approval, scoring, and dashboards that rank infrastructure readiness across India's States and UTs, giving MoSPI real-time visibility it never had on paper.",
    metrics: [
      { value: "5", label: "User roles in one approval workflow" },
      { value: "36", label: "States and UTs reporting through it" },
      { value: "4", label: "Infrastructure categories tracked & ranked" },
    ],
    tags: ["Gov-tech", "Dashboards", "Data Workflows"],
    duration: "2025",
    team: "MoSPI stakeholders, UX4G engagement",
    images: [
      {
        src: "/case-studies/niri/public-dashboard.jpg",
        alt: "MoSPI public dashboard showing project KPIs, sector-wise distribution, physical progress, and state-wise rankings",
        caption: "The live public dashboard: KPI cards, sector distribution, and state-wise project rankings.",
        aspect: "portrait",
      },
    ],
  },
  {
    id: "ebcas",
    project: "eBCAS 2.0",
    title: "Thirteen permit types, one application flow that adapts",
    challenge:
      "Airport entry permits in India span 13 distinct types, from permanent airside staff to diplomatic couriers to 4-hour visitor tickets, each with its own approval path, background check rules, zone restrictions, and issuing authority. The Bureau of Civil Aviation Security needed the entire ecosystem digital, without flattening those differences into one generic form.",
    approach:
      "I mapped user journeys role by role: individual applicants, entity signatories, airport operators, committees, regional directors, and BCAS headquarters. The application flow is type-aware; the fieldset, zone matrix, validity ceiling, and approval routing all adapt to the permit type selected, with Aadhaar e-KYC, facial liveness capture, and digital signatures built into the flow rather than bolted on.",
    outcome:
      "All four modules are specced to build-ready depth: application, approval, payment, card collection with live face match, renewal, and loss reporting. Development is starting, with the engineering team onboarding against the completed designs.",
    metrics: [
      { value: "13", label: "Permit types in one adaptive flow" },
      { value: "7", label: "User roles with distinct journeys" },
      { value: "4", label: "Modules designed end-to-end" },
    ],
    tags: ["Gov-tech", "Complex Workflows", "Identity & Security"],
    duration: "2026 – ongoing",
    team: "BCAS stakeholders, cross-functional team",
  },
  {
    id: "bharatnow",
    project: "BharatNow",
    title: "A discovery surface that is never a blank slate",
    challenge:
      "Government updates reach citizens scattered across portals, press releases, and social feeds. BharatNow packages news by topic, ministry, and scheme into a short-form mobile app, and its search had to serve both citizens who know what they want and those who open the tab with no query at all.",
    approach:
      "I designed the search module end-to-end on UX4G Design System 3.0: three entry modes (text with live suggestions, voice with auto-submit, and one-tap trending tags), and a default state that works as an active discovery surface with trending, market pulse, and spotlight zones. Every string carries an i18n-ready ID for multilingual handoff, and every section follows one visual grammar to keep the surface calm.",
    outcome:
      "A complete 7-screen module specification, from search entry through topic detail, with component specs, motion, accessibility behavior, and content strings documented to developer-handoff depth.",
    metrics: [
      { value: "3", label: "Search entry modes: text, voice, tag" },
      { value: "7", label: "Screens specified to handoff depth" },
    ],
    tags: ["Mobile UX", "Consumer App", "Design Language"],
    duration: "2026",
    team: "BharatNow product team, UX4G engagement",
    images: [
      {
        src: "/case-studies/bharatnow/app-icons.png",
        alt: "BharatNow app icon explorations in three color treatments",
        caption: "App icon explorations for the BharatNow identity.",
        aspect: "square",
      },
    ],
  },
  {
    id: "salonx",
    project: "SalonX",
    title: "Research-first design for a habit-driven consumer product",
    challenge:
      "An early-stage B2C salon management product needed its entire experience defined: who the users actually were, where their pain points sat, and how a booking flow should feel across very different customer types.",
    approach:
      "I ran user research, journey mapping, and usability testing to define 3 personas and locate their pain points before committing to UI. Then I delivered 40+ high-fidelity Figma screens and built a cross-platform design system for mobile and web to keep handoff structured against technical constraints.",
    outcome:
      "A complete, developer-ready product design with a shared system across platforms, built in agile sprints directly with the founders and engineers so interaction decisions stayed aligned with the product roadmap and technical feasibility.",
    metrics: [
      { value: "40+", label: "High-fidelity screens delivered" },
      { value: "3", label: "Personas from primary research" },
      { value: "2", label: "Platforms on one design system" },
    ],
    tags: ["Mobile UX", "User Research", "Design System"],
    duration: "Aug 2023 – Nov 2024",
    team: "Founders, engineers, agile sprints",
  },
];

export const skills: Skill[] = [
  {
    category: "Design",
    items: [
      "UI/UX Design",
      "Interaction Design",
      "Information Architecture",
      "Design Systems",
      "Wireframing & Prototyping",
      "Mobile-First & Responsive",
      "Visual Design",
      "UX Writing",
    ],
  },
  {
    category: "Research",
    items: [
      "User Research",
      "Usability Testing",
      "User Interviews",
      "Journey Mapping",
      "Personas",
      "Competitive Analysis",
      "Heuristic Evaluation",
    ],
  },
  {
    category: "Standards",
    items: ["WCAG 2.1", "GIGW", "DBIM Guidelines", "Government Accessibility Standards"],
  },
  {
    category: "Tools",
    items: ["Figma", "FigJam", "Adobe XD", "Miro", "Axure", "Jira", "Notion", "Zeplin", "AI-assisted design"],
  },
];

export const principles: Principle[] = [
  {
    number: "01",
    title: "Understand before assuming",
    description:
      "Every project starts with the people in it: interviews, journey maps, and the workflows users actually run, not the ones the brief assumes.",
    evidence:
      "Survey Setu's four government roles each got their own workflow mapping before any screen was designed. The dashboards look different because the jobs are different.",
  },
  {
    number: "02",
    title: "Name the problem precisely",
    description:
      "Vague problems produce vague solutions. I write the problem down specifically enough that it can be proven wrong.",
    evidence:
      "UX4G's issue wasn't 'inconsistency', it was component detachment: teams working around components that didn't fit their cases. Naming that changed what 3.0 had to be.",
  },
  {
    number: "03",
    title: "Design the system, not the screen",
    description:
      "Screens are outputs. The reusable model underneath, components, patterns, and documentation, is the actual design work.",
    evidence:
      "UX4G 3.0 grew from 34 to 58 components plus a 36-pattern library, now underpinning how ministry teams across Digital India build, with documentation that explains when and why, not just what.",
  },
  {
    number: "04",
    title: "Accessibility is structural",
    description:
      "WCAG isn't a checklist at the end. At national scale, an inaccessible pattern excludes millions, so standards are built into components from the start.",
    evidence:
      "I presented user-centered design and WCAG standards to 70+ government officials at a NeGD/MeitY workshop in Shimla, because the system only works if the people using it believe in it.",
  },
];

export const experience: Experience[] = [
  {
    company: "Netoyed (Grapes Telecom Pvt. Ltd.)",
    role: "UI/UX Designer",
    period: "Dec 2024 – Present",
    description:
      "Assigned to UX4G, India's national design system under NeGD and MeitY, designing government platforms that serve 10+ crore users.",
    highlights: [
      "Designed Survey Setu end-to-end as sole designer: 50+ mobile screens and 4-persona dashboards, launched April 2026",
      "Served as Product Owner for UX4G Design System 3.0, growing the library from 34 to 58 components plus a 36-pattern library, now mandated as the government standard",
      "Designed platform interfaces for the Election Commission of India, MoJSE, and NITI (MoSPI)",
      "Presented UX and WCAG accessibility standards to 70+ officials at a NeGD/MeitY workshop",
    ],
  },
  {
    company: "Skillfoundry Technology Pvt. Ltd.",
    role: "UI/UX Designer",
    period: "Aug 2023 – Nov 2024",
    description:
      "Led end-to-end design of SalonX, a B2C salon management mobile app, from primary research through developer handoff.",
    highlights: [
      "Defined 3 personas through user research, journey mapping, and usability testing",
      "Delivered 40+ high-fidelity Figma screens across the product",
      "Built a cross-platform design system for mobile and web, enabling structured handoff",
    ],
  },
  {
    company: "Unboxing Community",
    role: "UI/UX Designer",
    period: "Mar 2023 – Jun 2023",
    description:
      "Designed a responsive e-commerce web platform with a focus on intuitive navigation and mobile-first accessibility.",
    highlights: [
      "Created user flows, wireframes, and high-fidelity prototypes across devices",
      "Aligned design with brand identity, business goals, and technical feasibility alongside marketing and development",
    ],
  },
];
