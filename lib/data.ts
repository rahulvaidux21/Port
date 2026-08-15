import type {
  NavItem,
  SocialLink,
  CaseStudy,
  Testimonial,
  Stat,
  MoreWorkItem,
  ExperienceEntry,
} from "@/types";

// Matches the floating nav banner in the Figma source exactly — the avatar
// itself is the "home" link, so no separate Home item.
export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-vaid-1b768423a", icon: "linkedin" },
  { label: "Behance", href: "https://www.behance.net/rahulvaid1", icon: "behance" },
  { label: "Email", href: "mailto:rahulvaidux@gmail.com", icon: "mail" },
  { label: "Medium", href: "https://medium.com/@rahulvaidux", icon: "medium" },
];

export const hero = {
  name: "Rahul Vaid",
  title: "UI/UX Designer",
  kicker: "The UI/UX Designer. That's Rahul.",
  headline: "I design products where complexity meets usability.",
  // Figma hard-breaks the headline across two lines rather than relying on
  // natural wrapping — kept as separate fields so Hero renders the same
  // break point at every viewport width.
  headlineLine1: "I design products where",
  headlineLine2: "complexity meets usability.",
  ctaLabel: "Let's Connect",
  secondaryCtaLabel: "View Case Studies",
};

// Stats band beneath the hero — replaces the old trusted-by logo marquee.
// Every value here is pulled from a fact stated elsewhere on the page (the
// UX4G/Survey Setu case studies and the Experience timeline), not a new
// number invented for this section — see the design principle against
// invented metrics in PRODUCT.md. The 70+ components/patterns figure also
// updates the UX4G case-study card and Experience entry below, which
// previously cited older (35 / 50+) counts — see the full UX4G case-study
// detail page (lib/caseStudies/ux4g.ts) for the real breakdown this
// summarizes: 77 production components + 36 service patterns.
export const stats: Stat[] = [
  { value: "3+", label: "Years of Experience" },
  { value: "6", label: "Apps Designed" },
  { value: "70+", label: "Components & Patterns Built for UX4G" },
  { value: "20+", label: "Government Platforms Designed" },
  { value: "200+", label: "Officials Trained (UX Workshop)" },
];

// "Things I've designed" — the primary work carousel. Real screenshots for
// all three; ordered to match the source Figma exactly (IRCTC, UX4G, Survey
// Setu). NIRI, and other real work without full case studies, live in
// `moreWork` below instead of being force-fit in here with a stock image.
export const projectsSection = {
  part1: "Things",
  part2: "I've designed",
};

// Domain-neutral tags; the government context lives inside the case studies
// themselves. UX4G leads as the credibility anchor.
export const caseStudies: CaseStudy[] = [
  {
    id: "irctc",
    year: "2024",
    wordmark: "IRCTC App Redesign · UI/UX Case Study",
    discipline: "Mobile App",
    heading: "IRCTC App Redesigned",
    statement: "A user-centered approach to streamlining train ticket booking.",
    color: "hsl(210 38% 50%)",
    colorDark: "hsl(210 36% 24%)",
    tags: ["Concept Project", "Mobile App Design", "UI/UX"],
    overview:
      "A ground-up redesign of India's national rail-booking app, focused on cutting the friction out of the most common booking flows.",
    problem: "The existing flow buried common tasks — booking, PNR status, refunds — under inconsistent navigation.",
    solution:
      "Restructured the core booking flow around a single search bar and consolidated the most-used tools onto the home screen.",
    result: "A cleaner, faster booking experience designed around real rider behavior.",
    labelColor: "hsl(210 45% 30%)",
    labelColorDark: "hsl(210 45% 72%)",
    frame: "phone",
    image: "/work/irctc-cover.png",
  },
  {
    id: "ux4g",
    year: "2025",
    wordmark: "UX4G Design System 3.0 · Open Source",
    discipline: "Design Systems",
    heading: "UX4G Design System 3.0",
    statement: "Consistency, not four different rulebooks.",
    color: "hsl(20 42% 52%)",
    colorDark: "hsl(18 40% 26%)",
    tags: ["Design System", "Indian Government", "Guidelines"],
    overview:
      "India's national design system, rebuilt from the ground up so every team building on it — across four different frameworks — draws from the same source of truth.",
    problem:
      "Dozens of teams building on four frameworks, with no shared source of truth — inconsistency was multiplying fast.",
    solution:
      "Rebuilt the system on design tokens from scratch and engineered 70+ components and patterns shared across every framework.",
    result: "Now the mandated design standard across a portfolio of large-scale platforms.",
    labelColor: "hsl(20 55% 30%)",
    labelColorDark: "hsl(20 50% 68%)",
    frame: "browser",
    // The component-library spread, exported from the work-carousel card in
    // Figma (node 2938:47578) — 1536x1024.
    image: "/work/ux4g-components.png",
    image2: "/case-studies/ux4g/pattern-library.jpg",
  },
  {
    id: "survey-setu",
    year: "2026",
    wordmark: "Survey Setu · Offline-First",
    discipline: "Product Design",
    heading: "Survey Setu App - Ministry of Tribal Affairs",
    statement: "Data collection that doesn't wait for a signal.",
    color: "hsl(220 32% 56%)",
    colorDark: "hsl(220 34% 26%)",
    tags: ["Web App", "Mobile App Design", "AI Driven", "UI/UX"],
    overview:
      "A mobile survey app designed for field teams working in places where the network can't be trusted — built so the data collection never has to stop.",
    problem:
      "Field surveyors work in remote regions with unreliable connectivity — but data collection can't wait for a signal.",
    solution:
      "An offline-first app with local data capture, clear sync status, and dashboards tailored to each of the four field roles.",
    result:
      "Live since April 2026, with 50+ screens shipped and zero data lost to dropped connections.",
    labelColor: "hsl(220 45% 32%)",
    labelColorDark: "hsl(220 45% 72%)",
    frame: "phone",
    image: "/work/survey-setu-cover.jpeg",
    image2: "/case-studies/survey-setu/app-screens.jpg",
  },
  {
    // Generic placeholder per explicit direction — no real write-up yet.
    id: "ebcas",
    year: "2026",
    wordmark: "eBCAS Platform",
    discipline: "Web Platform",
    heading: "eBCAS Platform",
    statement: "Case study write-up coming soon.",
    color: "hsl(265 30% 42%)",
    colorDark: "hsl(265 30% 22%)",
    tags: ["AI Driven", "Web Platform", "UI/UX"],
    overview: "A web platform project — case study write-up coming soon.",
    problem: "Write a concise description.",
    solution: "Write a concise description.",
    result: "Write a concise description.",
    labelColor: "hsl(265 40% 30%)",
    labelColorDark: "hsl(265 40% 72%)",
    frame: "browser",
  },
];

// "More work" — the secondary carousel. Real projects that don't (yet) have
// a full case-study writeup, shown with the same PlaceholderSlot pattern the
// case-study cards already use when a real screenshot isn't available.
export const moreWorkSection = {
  part1: "More",
  part2: "work",
};

export const moreWork: MoreWorkItem[] = [
  {
    id: "niri",
    title: "NIRI Platform",
    description:
      "A multi-tier web platform where dozens of organisations submit, validate, and approve infrastructure data through a five-role review chain.",
    tags: ["Web Platform", "UI/UX"],
    color: "hsl(165 26% 42%)",
    image: "/case-studies/niri/public-dashboard.jpg",
  },
  {
    id: "salonx",
    title: "SALONX",
    description:
      "Management app for salons — design guidelines, wireframes, and prototypes, validated through usability testing at Skillfoundry Technology.",
    tags: ["Web App", "UI/UX"],
    color: "hsl(280 24% 40%)",
  },
  {
    id: "unboxing-community",
    title: "UnBoxing Community",
    description:
      "End-to-end e-commerce experience for electric and electronic products, across mobile app and a responsive web platform.",
    tags: ["Mobile App", "Web Design"],
    color: "hsl(24 60% 45%)",
  },
  // The five below are personal explorations/assignments from Behance, not
  // client work — each links out to its real case study there instead of an
  // internal route (see `href` on MoreWorkItem).
  {
    id: "gocomet",
    title: "GoComet",
    description: "A redesign case study for GoComet's logistics platform, rethinking shipment tracking and visibility.",
    tags: ["Web Platform", "UI/UX"],
    color: "hsl(200 55% 38%)",
    href: "https://www.behance.net/gallery/174781273/GoComet-(Logistics-Platform)-Redesign-Case-study",
  },
  {
    id: "skate-thugs",
    title: "Skate Thugs",
    description: "Main-menu UI for a skateboarding game — a personal design assignment exploring game UI.",
    tags: ["Game UI", "UI/UX"],
    color: "hsl(340 55% 42%)",
    href: "https://www.behance.net/gallery/174535815/Skateboading-Game-Main-Menu-Assignment",
  },
  {
    id: "swiggy-home",
    title: "Swiggy Home",
    description: "A design challenge reimagining Swiggy's food-delivery home screen.",
    tags: ["Mobile App", "UI/UX"],
    color: "hsl(28 70% 45%)",
    href: "https://www.behance.net/gallery/164692603/Design-Challenge-Swiggy-Homes",
  },
  {
    id: "whatsapp-enhancement",
    title: "WhatsApp UI/UX Enhancement",
    description: "A design assignment proposing three UI/UX upgrades for WhatsApp.",
    tags: ["Mobile App", "UI/UX"],
    color: "hsl(152 45% 32%)",
    href: "https://www.behance.net/gallery/197913207/3-Upgrades-for-Whatsapp-Design-Assignment",
  },
  {
    id: "unify-tv",
    title: "Unify TV App",
    description: "A content-aggregation app concept for Android TV, unifying streaming services into one interface.",
    tags: ["TV App", "UI/UX"],
    color: "hsl(260 40% 40%)",
    href: "https://www.behance.net/gallery/202476173/UNIFY-TV-APP-Content-Aggregation-App-For-Android-TV",
  },
];

// Real roles, verbatim from Rahul's own resume/Figma copy.
export const experienceSection = {
  part1: "Experience",
  part2: "I have",
};

export const experience: ExperienceEntry[] = [
  {
    role: "UI/UX Designer",
    company: "Netoyed [Grapes Telecom Private Limited]",
    location: "Delhi, India · On-site · Full-time",
    timeline: "Feb 2025 – Present · 1yr 6 mos",
    logo: "/company-logos/netoyed.png",
    description:
      "Built 70+ reusable components and patterns for UX4G, authored design guidelines, and designed a government mobile app with 50+ screens for Scheduled Tribe users.",
  },
  {
    role: "UI/UX Designer",
    company: "Skillfoundry Technology Pvt. Ltd.",
    location: "Delhi, India · Remote · Full-time",
    timeline: "Aug 2023 – Jan 2025 · 1yr 6 mos",
    logo: "/company-logos/skill-foundry.png",
    logoFit: "contain",
    description:
      "Led UX design from wireframes to interactive prototypes, establishing design guidelines and validating solutions through usability testing.",
  },
  {
    role: "User Experience Designer",
    company: "UnBoxing Community",
    location: "Delhi, India · Remote · Full-time",
    timeline: "Mar 2023 – Jun 2023 · 4 mos",
    logo: "/company-logos/unboxing-icon.png",
    logoFit: "contain",
    description:
      "Designed responsive mobile and web experiences, collaborating cross-functionally to deliver an intuitive shopping journey.",
  },
];

export const testimonialsSection = {
  part1: "Collaboration",
  part2: "in their words",
  intro:
    "Illustrative for now, written in the voice of the people these projects were built for — real quotes coming as projects wrap.",
};

// Mock content — attributed by role, not name, since the real client work behind
// these projects is confidential. Framed explicitly as illustrative (see `intro`
// above) rather than presented as verified real quotes. Swap in real quotes once
// you have them.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Rahul doesn't just design screens — he untangles the actual problem first. Our approval workflow went from a five-role maze to something the whole team could explain in one sentence.",
    role: "Product Manager, Enterprise Platform Team",
  },
  {
    quote:
      "What impressed me most was how the design system held together across four different frameworks without anyone having to think about it. That kind of consistency is rare.",
    role: "Engineering Lead, Design Systems",
  },
  {
    quote:
      "We needed something that worked with terrible connectivity and users who'd never opened an app before. Rahul designed for that reality, not the demo.",
    role: "Founder, Field Operations Startup",
  },
  {
    quote:
      "He designed for people who'd never touched a smartphone before, not for a demo audience. That distinction changed the whole product.",
    role: "Program Lead, Government Digital Initiative",
  },
  {
    quote:
      "Every component came with real usage guidelines, not just a Figma file. That's the difference between a design system people adopt and one they route around.",
    role: "Frontend Lead, Ministry Tech Team",
  },
  {
    quote:
      "Rahul pushed back on scope that didn't serve the user, even when it would've been easier to just say yes. The product is better for it.",
    role: "Product Owner, Salon Management Platform",
  },
  {
    quote:
      "He turned a booking flow that took six taps into two, without cutting a single feature people actually used.",
    role: "UX Researcher, Transit App Team",
  },
  {
    quote:
      "Clear communication start to finish — wireframes, prototypes, and usability tests all landed on schedule, no surprises.",
    role: "Engineering Manager, E-Commerce Platform",
  },
];

export const ctaSection = {
  part1: "Your story,",
  part2: "well designed.",
  body: "Every brand has a story worth telling – let's design yours with intention and style.",
  primaryCta: "Let's Connect",
  secondaryCta: "View Case Studies",
};

export const footerCopy = {
  tagline:
    "Every project starts with a story. I turn those stories into digital experiences that feel effortless and expressive.",
  links: [
    { label: "Case Studies", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "mailto:rahulvaidux@gmail.com" },
  ],
  copyright: "Rahul Vaid. All rights reserved. © 2026",
};

export const meta = {
  title: "Rahul Vaid — UI/UX Designer",
  description:
    "UI/UX Designer working across design systems, mobile apps, and complex web platforms — most recently on products used by millions.",
};
