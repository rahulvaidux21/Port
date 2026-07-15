import type { NavItem, SocialLink, CaseStudy, ExperienceEntry, Testimonial } from "@/types";

export const floatingNavItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-vaid-1b768423a", icon: "linkedin" },
  { label: "Behance", href: "https://www.behance.net/rahulvaid1", icon: "behance" },
  { label: "Email", href: "mailto:rahulvaidux@gmail.com", icon: "mail" },
  { label: "CV", href: "/resume.pdf", icon: "file" },
];

export const hero = {
  name: "Rahul Vaid",
  title: "UI/UX Designer",
  speechBubble: "Hi, I'm Rahul Vaid",
  headline: "I design products where complexity meets usability.",
  subline:
    "UI/UX Designer working across design systems, mobile apps, and complex web platforms — most recently on products used by millions.",
  ctaLabel: "Let's Connect",
};

export const valueChips: string[] = [
  "Senior level quality",
  "Fast execution",
  "System thinking",
  "Clear process",
  "On-brand, every time",
  "Smooth handoff",
  "Design systems",
  "Built for scale",
  "Accessibility first",
  "AI-assisted workflow",
  "Research-backed",
  "Ships on time",
];

export const projectsSection = {
  speechBubble: "Take a Look at My Portfolio",
  headline: "Projects",
  intro:
    "Three products, three different kinds of hard. A design system, an app that works with no internet, and a platform that untangles a five-step approval maze.",
};

// Domain-neutral: tagged by discipline, not by ministry — the government context
// lives inside the case studies themselves, not on the landing page.
// Colors are deliberately muted/desaturated to sit alongside the paper/cream
// palette used everywhere else, rather than reading as bright marketing gradients.
// UX4G leads as the credibility anchor; images are added once real assets are provided.
export const caseStudies: CaseStudy[] = [
  {
    id: "ux4g",
    year: "2025",
    wordmark: "UX4G Design System 3.0 · Open Source",
    discipline: "Design Systems",
    heading: "UX4G Design System 3.0",
    statement: "Consistency, not four different rulebooks.",
    color: "hsl(20 42% 52%)",
    colorDark: "hsl(18 40% 26%)",
    tags: ["Design System", "Design Tokens", "Open Source"],
    overview:
      "India's national design system, rebuilt from the ground up so every team building on it — across four different frameworks — draws from the same source of truth.",
    problem:
      "Dozens of teams building on four frameworks, with no shared source of truth — inconsistency was multiplying fast.",
    solution:
      "Rebuilt the system on design tokens from scratch and engineered 35 core components shared across every framework.",
    result: "Now the mandated design standard across a portfolio of large-scale platforms.",
    labelColor: "hsl(20 55% 30%)",
    labelColorDark: "hsl(20 50% 68%)",
    frame: "browser",
    image: "/case-studies/ux4g/thumbnail.jpg",
    image2: "/case-studies/ux4g/pattern-library.jpg",
  },
  {
    id: "survey-setu",
    year: "2026",
    wordmark: "Survey Setu · Offline-First",
    discipline: "Product Design",
    heading: "Survey Setu",
    statement: "Data collection that doesn't wait for a signal.",
    color: "hsl(220 32% 56%)",
    colorDark: "hsl(220 34% 26%)",
    tags: ["Mobile App", "Offline-First", "Field Ops"],
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
    image: "/case-studies/survey-setu/app-screens.jpg",
    image2: "/case-studies/survey-setu/geo-tagging.jpg",
  },
  {
    id: "niri",
    year: "2025",
    wordmark: "NIRI Platform · Multi-Role Approval",
    discipline: "Service Design",
    heading: "NIRI Platform",
    statement: "A five-role maze, explained in one sentence.",
    color: "hsl(165 26% 42%)",
    colorDark: "hsl(165 28% 22%)",
    tags: ["Web Platform", "Complex Workflows", "Multi-Role Approval"],
    overview:
      "A multi-tier web platform where dozens of organisations submit, validate, and approve infrastructure data through a five-role review chain.",
    problem: "A five-role approval chain that nobody on the team could explain in one sentence.",
    solution:
      "Mapped the full workflow and redesigned it around role-specific views that show only what each step needs.",
    result: "The five-role maze became a path the whole team can explain in one sentence.",
    labelColor: "hsl(165 40% 26%)",
    labelColorDark: "hsl(165 40% 62%)",
    frame: "browser",
    image: "/case-studies/niri/public-dashboard.jpg",
  },
];

export const experienceSection = {
  speechBubble: "Where I've Worked",
  headline: "Experience",
};

// Pulled directly from Rahul's resume (Dec 2024 onward through Mar 2023) — no invented history.
export const experience: ExperienceEntry[] = [
  {
    role: "UI/UX Designer",
    org: "Netoyed (Grapes Telecom Pvt. Ltd.)",
    dates: "Dec 2024 – Present",
    description:
      "Designing products at national scale — a multi-framework design system, an offline-first mobile app, and complex approval-driven web platforms. Research through to developer handoff.",
    tags: ["Design Systems", "Product Design", "Mobile", "Enterprise Web"],
  },
  {
    role: "UI/UX Designer",
    org: "Skillfoundry Technology Pvt. Ltd.",
    dates: "Aug 2023 – Nov 2024",
    description:
      "Led end-to-end design of SalonX, a B2C salon management app — research, journey mapping, and usability testing across 3 personas, delivering 40+ high-fidelity screens and a cross-platform design system for structured developer handoff.",
    tags: ["Product Design", "Design Systems", "User Research"],
  },
  {
    role: "UI/UX Designer",
    org: "Unboxing Community",
    dates: "Mar 2023 – Jun 2023",
    description:
      "Designed a responsive e-commerce web platform — user flows, wireframes, and high-fidelity prototypes focused on intuitive navigation and mobile-first accessibility, partnering with marketing and engineering teams.",
    tags: ["Web Design", "Prototyping", "Mobile-First"],
  },
];

export const education =
  "Interaction Design Foundation — Certificate Courses, 2024–2025 · BA (Hons) History, University of Delhi, 2014";

export const testimonialsSection = {
  speechBubble: "Before the Real Thing",
  headline: "What Collaborators Would Say",
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
];

export const closingCta = {
  headline: "Got a mess? Let's untangle it.",
  body: "Open to freelance projects, full-time roles, and interesting conversations — any industry. If you're building something that has to work for a lot of people, I'd like to hear about it.",
  ctaLabel: "Let's Connect",
  secondary: "Based in India · Available for remote work",
};

export const footerCopy = {
  line: "Let's connect. I'm always up for a chat.",
  copyright: "© 2026 Rahul Vaid",
};

export const meta = {
  title: "Rahul Vaid — UI/UX Designer",
  description:
    "UI/UX Designer working across design systems, mobile apps, and complex web platforms — most recently on products used by millions.",
};
