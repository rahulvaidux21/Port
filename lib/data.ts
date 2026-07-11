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
      "Engineered 35 core components from scratch for the design system that underpins Digital India platforms, reducing component detachment across ministry-level design teams. Currently authoring usage documentation and patterns.",
    tags: ["Design Systems", "Documentation", "WCAG 2.1"],
    year: "2025",
    role: "UI/UX Designer",
    caseStudySlug: "ux4g",
    color: "hsl(15 65% 45%)",
  },
  {
    id: "survey-setu",
    number: "02",
    title: "Survey Setu",
    subtitle: "Field survey platform for the Ministry of Tribal Affairs",
    description:
      "Designed end-to-end as the sole designer: 50+ mobile screens and multi-persona web dashboards for a live government platform serving India's 10+ crore Scheduled Tribe population. Launched April 2026.",
    tags: ["Gov-tech", "Mobile-First Design", "Multi-Persona Dashboards"],
    year: "2026",
    role: "Sole Designer",
    caseStudySlug: "survey-setu",
    color: "hsl(220 60% 40%)",
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
    title: "Rebuilding the components behind India's national UI standard",
    challenge:
      "Ministry-level design teams were detaching components from the national design system, which breaks consistency and accessibility at exactly the scale where it matters most. The 3.0 release needed core components robust and flexible enough that teams would stop working around them.",
    approach:
      "I engineered 35 core components from scratch, designing each against real ministry use cases rather than idealized examples. Alongside the components, I am authoring usage documentation and building patterns from the library so teams know not just what a component is, but when and why to reach for it.",
    outcome:
      "Component detachment across ministry design teams is reducing as 3.0 adoption grows. I also presented the system's user-centered and WCAG accessibility principles to 70+ government officials at a NeGD/MeitY sensitization workshop in Shimla.",
    metrics: [
      { value: "35", label: "Core components built from scratch" },
      { value: "10Cr+", label: "Users on platforms UX4G underpins" },
      { value: "70+", label: "Officials trained on UX & accessibility" },
    ],
    tags: ["Design Systems", "Documentation", "WCAG 2.1"],
    duration: "2025 – ongoing",
    team: "UX4G team, NeGD / MeitY",
  },
  {
    id: "survey-setu",
    project: "Survey Setu",
    title: "One platform, four very different users, 10+ crore citizens",
    challenge:
      "The Ministry of Tribal Affairs needed a survey platform covering India's 10+ crore Scheduled Tribe population. Four distinct roles (Admin, Nodal Officer, District Officer, Supervisor) with very different workflows and digital fluency had to work from the same system, and field data collection had to hold up on mobile in low-connectivity conditions.",
    approach:
      "As the sole designer, I mapped each persona's workflow separately before designing a screen, then built the mobile collection flows first so the field reality constrained the dashboards, not the other way around. Every pattern follows UX4G and WCAG 2.1 standards, and each dashboard shows a role exactly what it needs to act on and nothing else.",
    outcome:
      "The platform launched in April 2026 under the Ministry of Tribal Affairs with 50+ mobile screens and role-specific web dashboards live in production, designed end-to-end by one designer working with government stakeholders and engineers in agile sprints.",
    metrics: [
      { value: "10Cr+", label: "Citizens the platform serves" },
      { value: "50+", label: "Mobile screens designed" },
      { value: "4", label: "Distinct user personas" },
    ],
    tags: ["Gov-tech", "Mobile-First", "Accessibility"],
    duration: "Dec 2024 – Apr 2026",
    team: "Sole designer, with NeGD stakeholders and engineering",
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
      "Design is complete across all four modules: application, approval, payment, card collection with live face match, renewal, and loss reporting. The project is now in progress, with the development team onboarding for implementation.",
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
      { value: "100%", label: "Strings ID'd for multilingual i18n" },
    ],
    tags: ["Mobile UX", "Consumer App", "Design Language"],
    duration: "2026",
    team: "BharatNow product team, UX4G engagement",
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
      "35 core components engineered for UX4G 3.0 now underpin how ministry teams across Digital India build, with documentation that explains when and why, not just what.",
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
      "Engineered 35 core components from scratch for UX4G Design System 3.0",
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
