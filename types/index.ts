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
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  caption?: string;
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
