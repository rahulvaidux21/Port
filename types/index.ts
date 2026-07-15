export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "behance" | "mail" | "file";
}

export interface CaseStudy {
  id: string;
  year: string;
  wordmark: string;
  /** Right-aligned discipline label in the card's metadata row, e.g. "Design Systems". */
  discipline: string;
  heading: string;
  /** Short, punchy statement headline (serif) — paraphrased from problem/result, not new claims. */
  statement: string;
  color: string;
  colorDark: string;
  tags: string[];
  overview: string;
  problem: string;
  solution: string;
  result: string;
  /** Darker variants of color/colorDark, sized for use as text (WCAG AA against bg-surface). */
  labelColor: string;
  labelColorDark: string;
  /** Which device chrome the screenshot(s) render inside. */
  frame: "phone" | "browser";
  /** Optional real screenshot/mockup — falls back to the placeholder panel when absent. */
  image?: string;
  /** Optional second real screenshot, shown overlapping the first. */
  image2?: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  dates: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  quote: string;
  role: string;
}
