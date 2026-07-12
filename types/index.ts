export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  role: string;
  link?: string;
  caseStudySlug?: string;
  color: string;
  /** Full-anatomy treatment in Work; false renders as a compact row */
  featured?: boolean;
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  caption?: string;
  /** Thumbnail aspect ratio; defaults to "wide" (16/10) */
  aspect?: "wide" | "portrait" | "square" | "landscape" | "web" | "tall" | "mobile";
}

export interface CaseStudyNarrativeSection {
  heading: string;
  body: string;
  images?: CaseStudyImage[];
}

export interface CaseStudy {
  id: string;
  project: string;
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: Metric[];
  tags: string[];
  duration: string;
  team: string;
  images?: CaseStudyImage[];
  /** Long-form treatment for flagship studies; falls back to challenge/approach/outcome when absent */
  narrative?: CaseStudyNarrativeSection[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Principle {
  number: string;
  title: string;
  description: string;
  evidence: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
