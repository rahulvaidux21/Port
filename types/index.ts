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

export interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface TimelineStep {
  date: string;
  phase: string;
  description: string;
}

/** One "Introducing — X" block: a heading, some running copy, an optional
    bullet list, one or more plates, and an optional closing line. Every
    Part 1–4 block in the Figma frame is this same shape, which is why they
    all render through one component. Copy strings accept `**bold**`. */
export interface ContentBlock {
  title: string;
  /** The frame sets most block headings as "Introducing – X"; a few are
      just the bare noun. */
  noPrefix?: boolean;
  /** Paragraphs above the bullets. */
  lead?: string[];
  bullets?: string[];
  images?: MediaItem[];
  /** Paragraphs below the plate. */
  outro?: string[];
  /** Bullets that sit below the plate rather than above it. */
  outroBullets?: string[];
}

/** One of the ten structural journeys every government service turns out
    to be, and which of the recurring steps it contains. `steps` holds the
    ids from `JOURNEY_STEPS` — the matrix is the whole point, so the data is
    stored as the intersection rather than as prose. */
export interface ServiceJourney {
  name: string;
  /** What the citizen is doing — one line, shown under the name. */
  summary: string;
  steps: string[];
}

/** A research block that sits with the benchmarking, not in the solution. */
export interface ResearchBlock {
  eyebrow: string;
  title: string;
  accent: string;
  lead: string[];
  /** Method, kept to one small line under the counts rather than a
      paragraph — it earns its place as evidence, not as narration. */
  note: string;
  stats: BigStat[];
  journeys: ServiceJourney[];
  outro: string[];
}

/** A big-number stat. `labelWidth` pins the caption's measure where the
    frame gives it one, so it wraps on the same word. */
export interface BigStat extends Stat {
  labelWidth?: string;
}

/** A pattern group and how many patterns sit in it. */
export interface PatternGroup {
  name: string;
  count: number;
}

/** A chapter opener — "Part N" + a display title beside one plate. */
export interface PartOpenerContent {
  part: string;
  title: string;
  image: MediaItem;
  /** Part 2's plate sits on a purple field; Parts 3 and 4 sit on paper. */
  tint?: string;
}

export interface CaseStudyDetail {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    wordmark: string;
    heading: string;
    subtitleLead: string;
    subtitleAccent: string;
    tags: string[];
    image: MediaItem;
  };
  /** The three chip rows under the hero — role, timeline, platforms. */
  roleChips: string[];
  timelineChips: string[];
  platformChips: string[];
  teamAndCollaboration: {
    bullets: string[];
    roles: Stat[];
  };
  /** "The Challenge" pills on the dark band. */
  challenge: string[];
  /** "The Impact" cards — the payoff stated once, early. */
  impactTeaser: { lead: string; value: string; caption: string }[];
  timeline: TimelineStep[];
  /** The service-catalogue analysis, shown with the benchmarking. */
  serviceResearch: ResearchBlock;
  /** Part 1 · New Foundations. */
  foundations: ContentBlock[];
  /** Part 2 · The component library. */
  components: {
    opener: PartOpenerContent;
    stats: BigStat[];
    blocks: ContentBlock[];
  };
  /** Part 3 · Service Patterns. Carried as a ladder and a group breakdown
      rather than prose — the shape of the answer is the answer. */
  patterns: {
    opener: PartOpenerContent;
    intro: string;
    stats: BigStat[];
    /** The one-line before/after that makes this a solution, not a finding. */
    contrast: { before: string; after: string };
    groups: PatternGroup[];
    image: MediaItem;
  };
  /** Part 4 · How teams get it. */
  rollout: {
    opener: PartOpenerContent;
    lead: string[];
    bullets: string[];
    image: MediaItem;
  };
}

