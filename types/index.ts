export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "behance" | "mail" | "file" | "medium";
}

/** A single number+label pair in the Stats band below the hero — every
    value here must trace back to something already stated as fact
    elsewhere (a case study result, an Experience timeline span, a real
    count), never a new, unsubstantiated claim. */
export interface Stat {
  value: string;
  label: string;
}

/** A lighter-weight project card for the secondary "More work" carousel —
    same shape as CaseStudy's display fields, without requiring a full
    case-study detail page. */
export interface MoreWorkItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  image?: string;
  href?: string;
}

/** A single role in the Experience timeline. */
export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  timeline: string;
  logo: string;
  logoFit?: "cover" | "contain";
  description: string;
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

export interface Testimonial {
  quote: string;
  role: string;
}

/** ---- Case study detail page (app/case-studies/[slug]) ---- */

export interface MetaRow {
  label: string;
  value: string;
}

/** Icon name keyed against the small lucide registry in IconLabelList. */
export interface IconLabelItem {
  icon: "Clock" | "TrendingUp" | "Users" | "Layers" | "ShieldCheck" | "Globe2" | "SlidersHorizontal" | "Accessibility" | "Landmark" | "RefreshCw" | "BookOpen";
  text: string;
}

export interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface InsightItem {
  title: string;
  text: string;
}

export interface StatItem {
  before: string;
  after: string;
  label: string;
}

export interface TradeoffItem {
  title: string;
  optionA: string;
  optionB: string;
  chosen: "a" | "b" | "both";
  rationale: string;
}

export interface FlowItem {
  audience: string;
  steps: string[];
}

export interface CaseStudyDetail {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    wordmark: string;
    discipline: string;
    heading: string;
    statement: string;
    intro: string;
    metaRows: MetaRow[];
    image: MediaItem;
  };
  snapshot: MetaRow[];
  problem: { paragraphs: string[] };
  goals: { intro: string; items: string[] };
  constraints: IconLabelItem[];
  research: { paragraphs: string[]; media: MediaItem[] };
  insights: InsightItem[];
  opportunity: string;
  principles: IconLabelItem[];
  process: { paragraphs: string[]; media: MediaItem[] };
  userFlow: FlowItem[];
  finalDesign: { intro: string; bullets: string[]; media: MediaItem[] };
  decisions: { label: string; text: string }[];
  tradeoffs: TradeoffItem[];
  collaboration: { paragraphs: string[] };
  challenges: { title: string; text: string }[];
  results: { stats: StatItem[]; paragraphs: string[] };
  /** A real testimonial reused from the site-wide list, when it's specifically about this project. Keep the same illustrative framing as the source. */
  featuredTestimonial?: { quote: string; role: string };
  tools: string;
  reflection: { items: string[] };
  nextCaseStudySlug: string;
}
