import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CategoryBreakdown } from "@/components/case-study/ux4g/CategoryBreakdown";
import { JourneyExplorer } from "@/components/case-study/ux4g/JourneyExplorer";
import type {
  BigStat,
  ContentBlock,
  MediaItem,
  PartOpenerContent,
  PatternGroup,
  ResearchBlock,
  ServiceJourney,
  ReleaseBlock,
  TeamRole,
  TradeOffBlock,
} from "@/types";

/* ────────────────────────────────────────────────────────────────────
   Type scale, lifted from the Figma frame "Case study - UX4G design
   system 3.0 Light" (node 2944:48094). The frame is authored on a 1440
   canvas with a 1320 content column, so each size below is written as a
   clamp() whose *maximum is the frame's own px value*, reached at a 1440
   viewport, and which steps down to a readable size on a phone. At
   desktop the page therefore measures the same as the frame; below that
   it degrades instead of forcing a horizontal scrollbar.

   Colour: the frame is authored light-only. The page keeps Figma's exact
   light palette and falls back to the site's own paper/surface/text
   tokens (and blue accent) in dark, rather than inventing a purple dark
   theme.
   ─────────────────────────────────────────────────────────────────── */

/** Figma → web scale. The frame is a 1440 presentation board set at poster
    sizes (32px body, 38px lead, 48px heads, 98px numerals). Rendered 1:1 in
    a browser that reads ~1.8x too large, so the ramp below is compressed to
    web norms — display type compresses hardest, body least. Each clamp still
    reaches its maximum at a 1440 viewport; only the maximum changed.

    Figma → here:  64→48  38→22  48→34  98→56  98→60  32→18  26→16  252→132

    64 → 48px — the page title and the "Everyone had…" statement heading. */
const DISPLAY_XL =
  "text-[clamp(1.75rem,3.333vw,3rem)] font-semibold leading-[1.15] tracking-[-1.2px]";
/** 38 → 22px — the hero subtitle (node 2944:48157). */
const TITLE_LEAD = "text-[clamp(1.125rem,1.528vw,1.375rem)] leading-[1.5]";
/** 48px — every section heading. Deliberately carries no leading: the frame
    sets a different line box on each one (48px on The Challenge and The
    Impact, 64px on Design Timeline, `normal`/62px on the chip-row titles),
    so each call site states its own. Tracking is 0 throughout. */
const DISPLAY = "text-[clamp(1.5rem,2.361vw,2.125rem)] font-semibold";
/** The heading line box. Figma's `normal` is 1.29; 1.2 reads better once the
    type is at web size. */
const LEADING_AUTO = "leading-[1.2]";
/** 98 → 56px — the Part N chapter titles. */
const PART_TITLE = "text-[clamp(2rem,3.889vw,3.5rem)] font-bold leading-[1.1]";
/** 38 → 26px — the "Introducing — …" block headings. */
const BLOCK_TITLE = "text-[clamp(1.25rem,1.806vw,1.625rem)] font-semibold leading-[1.25]";
/** 54 → 40px — the Impact card values. */
const STAT = "text-[clamp(1.75rem,2.778vw,2.5rem)] font-semibold leading-[1.15]";
/** 24 → 20px */
const LEAD = "text-[clamp(1rem,1.389vw,1.25rem)] leading-[1.5]";
/** 20 → 16px — pills and secondary copy. */
const BODY = "text-[clamp(0.9375rem,1.111vw,1rem)] leading-[1.6]";
/** 32 → 18px — running prose, bullets and captions. */
const PROSE_TEXT = "text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.6]";
/** 98 → 60px — the big stat numerals. */
const STAT_NUM = "text-[clamp(2rem,4.167vw,3.75rem)] font-bold leading-[1.15]";
/** 26 → 16px — the role/timeline/platform chips. */
const CHIP = "text-[clamp(0.875rem,1.111vw,1rem)] font-medium";

/** Running prose fills the 1120 column, the way the Figma frame sets it.

    This was a 68ch measure — the textbook readable line length. On the page
    it did not hold up: 68ch renders at 841px inside a 1120 column, so every
    paragraph stopped a quarter of the way short of the full-width plate
    directly beneath it, and the ragged right edge read as a mistake rather
    than as a measure. The column itself is the cap now — at 18px it works
    out to roughly 90 characters, which is long but even, and it matches the
    frame. This constant is the single knob: put a `max-w-[NNch]` back here
    and every running paragraph, bullet list and lead on the page follows. */
export const PROSE = "max-w-none";

/* ── Inline emphasis ──────────────────────────────────────────────────
   Several strings in the frame bold a phrase mid-sentence. Rather than
   splitting every one of those into three fields, copy carries `**bold**`
   and is rendered through here. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-text-primary">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/** Standard body paragraph — the one place running text is styled. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn(PROSE_TEXT, PROSE, "font-sans text-text-secondary", className)}>{children}</p>;
}

/** Handwritten chapter eyebrow — Caveat, straight from the frame. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-caveat text-[clamp(1.25rem,2.222vw,2rem)] leading-none", className)}>
      {children}
    </p>
  );
}

/** The frame's column is 1320; this renders it at 1120 — a standard content
    width, and the single biggest lever on page length, since every
    full-width plate's height scales linearly with it. The max-width carries
    the gutters on top, so the content itself measures exactly 1120. */
export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1168px] px-6 md:max-w-[1184px] md:px-8", className)}>
      {children}
    </div>
  );
}

/* ── 2 · Title, subtitle and the hero device shot ─────────────────── */
/** Node 2944:48154 — 1320×1130, a flex column with a 48px gap. The text
    block carries 24px of its own top padding and a 24px internal gap; the
    plate is a flat 1320×831. The 100px above it is the frame's constant
    section gap. */
export function TitleBlock() {
  return (
    <Shell className="pb-section">
      <div className="flex flex-col gap-4 pt-4">
        <h1 className={cn(DISPLAY_XL, "font-sans text-cs-ink")}>
          Rebuilding India&apos;s National Design System
        </h1>
        <p className={cn(TITLE_LEAD, "font-sans text-cs-body")}>
          Transforming a static UI library into{" "}
          <span className="font-medium text-cs-violet-deep">
            a scalable, token-driven design system
          </span>{" "}
          for government digital services.
        </p>
      </div>
      <Image
        src="/case-studies/ux4g/hero-laptop.png"
        alt="The UX4G 3.0 documentation site shown on a laptop"
        width={1320}
        height={831}
        priority
        sizes="(min-width: 1360px) 1320px, 100vw"
        className="mt-block h-auto w-full"
      />
    </Shell>
  );
}

/* ── 2 · Chip rows: role, timeline, platforms ─────────────────────── */
/** The Platforms row is the only one that carries icons — the frame uses
    Iconify's streamline-plump:web-remix, entypo:mobile and
    material-icon-theme:figma at 24px. They're inlined rather than fetched
    so the chips render with no extra request and inherit currentColor. */
const PLATFORM_ICONS: Record<string, ReactNode> = {
  Web: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6 shrink-0">
      <circle cx="12" cy="12" r="9.6" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="4" ry="9.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.6 9h18.8M2.6 15h18.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Mobile: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6 shrink-0">
      <rect x="5" y="1.5" width="14" height="21" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 19h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" aria-hidden className="size-6 shrink-0">
      <path d="M9 3h3v6H9a3 3 0 0 1 0-6Z" fill="#f24e1e" />
      <path d="M12 3h3a3 3 0 0 1 0 6h-3V3Z" fill="#ff7262" />
      <path d="M15 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" fill="#1abcfe" />
      <path d="M9 9h3v6H9a3 3 0 0 1 0-6Z" fill="#a259ff" />
      <path d="M9 15h3v3a3 3 0 1 1-3-3Z" fill="#0acf83" />
    </svg>
  ),
};

/** Node 2944:48160/48183/48194 — a 48px title in a 62px box, then the chip
    rows starting 96px down from the group's top (a 34px gap). Chips are
    72px tall: 24px side padding, 19px top and bottom around a 34px label
    box, 16px radius, 24px between chips in both directions. Icons are 24px
    and sit 8px before the label. */
export function ChipGroup({
  title,
  chips,
  withIcons,
}: {
  title: string;
  chips: string[];
  withIcons?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h2 className={cn(DISPLAY, LEADING_AUTO, "font-sans text-cs-ink")}>
        {title}
      </h2>
      <ul className="flex flex-wrap items-center gap-3 md:gap-4">
        {chips.map((chip) => (
          <li
            key={chip}
            className={cn(
              CHIP,
              // 26px label in a 34px box (1.3077), 24px / 19px padding on a
              // 16px radius, with the frame's own 0 2px 5px shadow. The
              // shadow is dropped in dark, where a black shadow on a
              // near-black surface only muddies the edge.
              // rounded-[16px], not rounded-2xl — this project's 2xl token
              // is 24px, and the frame's chip radius is 16.
              "flex items-center gap-2 rounded-chip bg-cs-chip px-4 py-3 font-sans leading-[1.3077] text-cs-ink shadow-[0px_2px_5px_rgba(0,0,0,0.1)] dark:shadow-none md:px-4 md:py-3"
            )}
          >
            {withIcons && PLATFORM_ICONS[chip]}
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── 4 · Team and collaboration ───────────────────────────────────── */
/** Node 2944:48208 — 1320×708. Two columns: prose at 590 wide and the role
    panel at 664, separated by 52px (44.697% / 3.939% / 50.303% of the
    column). The heading is 48px in a 48px box with the list 16px below it;
    the list itself is 32px type on a 60px line box. The panel is #f8f6ff
    with 24px padding and a 24px radius, holding three 204px rows 24px
    apart — each a 48/48 numeral over a 38/60 label, with a 300×204 white
    plate pushed to the far edge. */
export function TeamAndCollaboration({
  bullets,
  roles,
}: {
  bullets: string[];
  roles: TeamRole[];
}) {
  return (
    <div className="flex flex-col gap-block md:flex-row md:items-stretch md:gap-[3.939%]">
      <div className="flex flex-col gap-element md:w-[44.697%] md:shrink-0">
        <h2 className={cn(DISPLAY, "leading-[1]", "font-sans text-cs-ink")}>
          Team And Collaboration
        </h2>
        {/* Set at the panel's own label size, not the page's running-prose
            size. The frame runs this description at 32px against a 48px
            heading — two thirds of it — and fills the column with it. Web
            rescaling pulled prose down to 16px while the plates stayed near
            their Figma size, so the same block came out half the weight of
            the "Designers" labels sitting opposite it and read as an
            afterthought. TITLE_LEAD is exactly what those labels use, which
            puts both columns on one voice.

            `flex-1` + `justify-around` from `md` is the other half: three
            statements against three team rows, distributed down the column
            instead of stacked at the top over 360px of dead space. Below
            `md` the two stack, there is nothing to align to, and the list
            keeps its normal rhythm. */}
        <ul
          className={cn(
            TITLE_LEAD,
            "list-disc space-y-3 pl-6 font-sans text-cs-body marker:text-cs-body dark:marker:text-text-muted",
            "md:flex md:flex-1 md:flex-col md:justify-around md:space-y-0"
          )}
        >
          {bullets.map((b, i) => (
            <li key={i}>
              <RichText text={b} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 rounded-card bg-cs-panel p-5 md:w-[50.303%]">
        {roles.map((role) => (
          <div key={role.label} className="flex flex-1 items-center justify-between gap-4 md:gap-6">
            <div className="flex flex-col gap-2">
              <span
                className={cn(DISPLAY, "leading-[1]", "font-sans text-cs-ink")}
              >
                {role.value}
              </span>
              <span className={cn(TITLE_LEAD, "font-sans text-cs-body")}>
                {role.label}
              </span>
            </div>
            {/* The frame's own 300x204 plate, not a square. These were
                squares while they held a placeholder — a lone face doesn't
                read in a wide slot — but the photos that landed are group
                shots, two and four people wide, and a square crop cuts
                people out of them. Still sized by width, not `h-full`: a
                height taken from a content-driven row makes the ratio
                whatever the prose column happens to be. `overflow-hidden`
                earns its keep too — the exports carry the frame's own 20px
                corner baked in on the panel's light fill, and clipping to
                the card radius takes those pixels off, so the corners don't
                show pale in dark. */}
            <div className="aspect-[300/204] w-28 shrink-0 overflow-hidden rounded-card bg-paper sm:w-40 md:w-[48%] md:max-w-[300px]">
              <Image
                src={role.photo.src}
                alt={role.photo.alt}
                width={role.photo.width}
                height={role.photo.height}
                sizes="(min-width: 768px) 300px, 160px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 4 · The Challenge — full-bleed dark band ─────────────────────── */
/** Figma runs this as its own 1440-wide band on #281d23, with the pills
    set nowrap so they size to their text and wrap as a row. Below `md`
    nowrap would overflow the viewport, so the pills wrap internally
    there and only hold single-line from `md` up. */
export function ChallengeBand({ items }: { items: string[] }) {
  return (
    <section className="bg-cs-plum py-section">
      <Shell className="flex flex-col gap-block">
        <h2 className={cn(DISPLAY, "leading-[1]", "font-sans text-white")}>The Challenge</h2>
        <ul className="flex flex-wrap gap-3 md:gap-4">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-chip border border-cs-red-border bg-cs-red-surface px-4 py-3"
            >
              <p
                className={cn(
                  BODY,
                  "font-sans font-semibold text-cs-red-ink xl:whitespace-nowrap"
                )}
              >
                {item}
              </p>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

/* ── 5 · The Impact — the same shape on paper, in green ───────────── */
export function ImpactBand({
  items,
}: {
  items: { lead: string; value: string; caption: string }[];
}) {
  return (
    <Shell className="flex flex-col gap-6">
      <h2 className={cn(DISPLAY, "leading-[1]", "font-sans text-cs-ink")}>The Impact</h2>
      {/* The frame's top row is 388 + 511 + 372 with 24px gaps — 1319 of the
          1320 column. It only fits at the frame's own text metrics, which is
          why the opsz axis is left at its default (see the page component). */}
      <ul className="flex flex-wrap gap-4 md:gap-6">
        {items.map((item) => (
          <li
            key={item.value}
            className="flex flex-col justify-center rounded-chip border border-cs-green-surface bg-cs-green-surface p-4"
          >
            <div className="flex flex-col gap-2 xl:whitespace-nowrap">
              <p className={cn(BODY, "font-sans font-medium text-cs-body")}>
                {item.lead}
              </p>
              <p className={cn(STAT, "font-sans text-cs-green")}>{item.value}</p>
              <p className="font-sans text-sm font-semibold leading-snug text-cs-green">
                {item.caption}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

/* ── 6 · Design timeline (the Gantt board) ────────────────────────── */
const TIMELINE_MONTHS = [
  "Dec 2025",
  // TYPO (frame): reads "Jan 2025" in a Dec 2025 → Jun 2026 timeline.
  "Jan 2026",
  "Feb 2026",
  "Mar 2026",
  "Apr 2026",
  "May 2026",
  "June 2026",
];

/** Left/top/width are the frame's own px values on its 1243×412 board
    (node 2944:48299). `color` is a token name, not a hex, so the bars can
    drop to deep tints in dark rather than glowing at full saturation. */
const TIMELINE_TASKS: { label: string; left: number; top: number; width: number; color: string }[] =
  [
    { label: "Research Phase", left: 0, top: 53, width: 85, color: "--cs-tl-yellow" },
    {
      label: "Competitive analysis, Define the problems & goals Phase",
      left: 0.5,
      top: 166,
      width: 193,
      color: "--cs-tl-cyan",
    },
    {
      label: "Presenting the research insights to stakeholders",
      left: 84.5,
      top: 285,
      width: 109,
      color: "--cs-tl-teal",
    },
    {
      // TYPO (frame): "Sementics" → "Semantics".
      label: "Design language system (Semantics, variables)",
      left: 193.5,
      top: 75,
      width: 192,
      color: "--cs-tl-yellow",
    },
    { label: "Designing 35 Core components", left: 237.5, top: 205, width: 291, color: "--cs-tl-orange" },
    {
      label: "Testing & refine the design based on user feedback",
      left: 386.5,
      top: 302,
      width: 280,
      color: "--cs-tl-cyan",
    },
    {
      label: "Designing additional components and patterns and end-to-end user journey flows",
      left: 578.5,
      top: 98,
      width: 471,
      color: "--cs-tl-teal",
    },
    {
      label: "Testing & refine the design based on user feedback",
      left: 856.5,
      top: 195,
      width: 302,
      color: "--cs-tl-cyan",
    },
    // TYPO (frame): "30th jun 2026" → "30th Jun 2026".
    { label: "Published on 30th Jun 2026", left: 1157.5, top: 308, width: 85, color: "--cs-tl-teal" },
  ];

/** Figma authors the board at a fixed 1243×412. Positions are converted to
    percentages of that width so it scales to whatever the column is instead
    of forcing a horizontal scrollbar on desktop; below md it keeps a
    minimum width and scrolls, since the labels stop being legible before
    that. */
/** The frame's board is 412px tall; it renders at 300 here, so the task
    tops scale with it. */
const BOARD_SCALE = 300 / 412;
const BOARD_W = 1243;
const pct = (n: number) => `${(n / BOARD_W) * 100}%`;

export function DesignTimeline() {
  return (
    <div className="flex flex-col gap-block">
      <div className="flex flex-col gap-2">
        <h2 className={cn(DISPLAY, "leading-[1.3333]", "font-sans text-cs-ink")}>
          Design Timeline
        </h2>
        <p className="font-sans text-lg leading-8 text-cs-body">
          Our achievement in the journey depicted in numbers
        </p>
      </div>

      {/* The board keeps a 1040 minimum at every width and scrolls instead of
          compressing — dropping the minimum at `md` squeezed the pillars and
          bars to unreadable widths on tablet. At >=1180 the 1120 column
          exceeds the minimum, so no scrollbar appears. */}
      <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
        <div className="relative h-[300px] w-full min-w-[1040px]">
          {TIMELINE_MONTHS.map((month, i) => (
            // Figma gives each label a 170px box, which on the last column
            // would push 6.8% past the board's right edge and reintroduce a
            // scrollbar. The labels are short, so they size to their text.
            // The column carries the pillar's 85/1243 width itself. Putting
            // that percentage on the pillar instead resolved it against this
            // auto-width absolute box — i.e. against the month label, about
            // 63px — so the pillar rendered ~4px wide instead of ~71.
            <div
              key={month}
              className="absolute top-0"
              style={{ left: pct(i * 193), width: pct(85) }}
            >
              <p className="whitespace-nowrap font-sans text-sm leading-[18px] text-cs-body">
                {month}
              </p>
              <div className="mt-3 h-[270px] w-full rounded-sm bg-cs-tl-pillar" />
            </div>
          ))}
          {TIMELINE_TASKS.map((task, i) => (
            <div
              key={i}
              className="absolute flex items-center overflow-hidden rounded-lg p-2"
              style={{
                left: pct(task.left),
                top: task.top * BOARD_SCALE,
                width: pct(task.width),
                backgroundColor: `rgb(var(${task.color}))`,
              }}
            >
              <p className="w-full font-sans text-xs font-semibold leading-tight text-cs-tl-label">
                {task.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 7 · The audit — seven annotated exhibits of UX4G 2.0 ─────────── */
/** Each exhibit is a 2.0 screenshot with callout boxes, arrows and an
    annotation, composed in Figma. They're exported whole at 2x because the
    arrows point at specific pixels of the screenshot — splitting the text
    out would break the composition. The annotation text rides along as the
    alt attribute so the finding is still available to screen readers and
    to anyone the images fail for. */
const AUDIT_EXHIBITS: { src: string; height: number; alt: string }[] = [
  {
    // Re-exported from node 3020:32424 — the frame replaced this exhibit
    // (the other six kept their nodes and heights).
    src: "/case-studies/ux4g/audit/1.png",
    height: 909,
    alt: "The UX4G 2.0 component library, annotated — the starting point for the audit.",
  },
  {
    src: "/case-studies/ux4g/audit/2.jpg",
    height: 806,
    alt: "Built on Bootstrap. The whole foundation was Bootstrap's, so UX4G inherited another framework's decisions — its structure, assumptions and limits — rather than making its own. Duplicating Bootstrap gave people no reason to stay: if it's Bootstrap underneath, teams reasonably picked whichever framework they already knew.",
  },
  {
    src: "/case-studies/ux4g/audit/3.jpg",
    height: 653,
    alt: "34 components, and nothing above them. Only the smallest building blocks existed. Nothing showed how those parts came together into a real screen or a real service.",
  },
  {
    src: "/case-studies/ux4g/audit/4.jpg",
    height: 653,
    alt: "Variables, but only half the idea. Colour, spacing and elevation were defined as raw values with no layer naming what each value was for, so the system was locked to one theme with no way to reskin it.",
  },
  {
    src: "/case-studies/ux4g/audit/5.jpg",
    height: 653,
    alt: "Borrowed from everywhere. Components were pulled in from different design systems, so nothing quite matched anything else — and their properties were basic and dated, which is why teams detached them and edited freely.",
  },
  {
    src: "/case-studies/ux4g/audit/6.jpg",
    height: 653,
    alt: "Components didn't reliably work. Behaviour was inconsistent enough that teams couldn't just trust them.",
  },
  {
    src: "/case-studies/ux4g/audit/7.jpg",
    height: 653,
    alt: "Naming was inconsistent. Layers and components weren't named to any convention, so opening the file told you very little about what you were looking at.",
  },
];

export function AuditSection() {
  return (
    // Same warm near-black as the Challenge band above it — the frame runs
    // one colour across both, not #09090b.
    <section className="bg-cs-plum py-section">
      <Shell className="flex flex-col gap-block">
        <div className="flex flex-col gap-4">
          <Eyebrow className="text-cs-red">Problems in the</Eyebrow>
          <h2 className={cn(DISPLAY, LEADING_AUTO, "font-sans text-white")}>UX4G 2.0 design system</h2>
        </div>
        {/* Square corners and a flat 24px between exhibits, both straight from
            the frame — these are annotated screenshots, not cards, and the
            radius token would have rounded them and stepped the gap to 20 on
            a phone. */}
        <div className="flex flex-col gap-6">
          {AUDIT_EXHIBITS.map((ex) => (
            <Image
              key={ex.src}
              src={ex.src}
              alt={ex.alt}
              width={1320}
              height={ex.height}
              sizes="(min-width: 1360px) 1320px, 100vw"
              className="h-auto w-full"
            />
          ))}
        </div>
      </Shell>
    </section>
  );
}

/* ── 8 · Chapter opener: "Part N" + big title beside one plate ────── */
export function PartOpener({ content }: { content: PartOpenerContent }) {
  const { part, title, image, tint } = content;
  return (
    // The tinted field runs square — it's a full-width plate the chapter sits
    // on, and rounding it made it read as a card floating in the chapter
    // rather than as the chapter's own ground. The kit shot inside keeps its
    // own radius.
    <div className="grid grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="flex flex-col justify-center gap-4 bg-paper py-8 md:py-12 md:pr-8">
        <Eyebrow className="text-cs-violet">{part}</Eyebrow>
        <p className={cn(PART_TITLE, "font-sans text-text-primary")}>{title}</p>
      </div>
      {/* Node 3022:32451 — the kit shot is now wider than its own cell and
          fills it left to right, so the tint shows only as a band above and
          below the plate. Those two bands are baked into the export at the
          same #4a2bc3 the cell is painted, so the seam is invisible and the
          tint carries on out to the cell's edges at any width. Hence no
          padding and no radius on the tinted variant — either one would put
          a visible edge back. Parts 3 and 4 sit on paper and keep the
          frame's padding. */}
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden",
          !tint && "p-6 md:p-[3vw]"
        )}
        style={tint ? { backgroundColor: tint } : undefined}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 660px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

/* ── 9 · Big-number stat rows ─────────────────────────────────────── */
/** Node 3022:32453 — one row, `justify-between`, each card hugging its own
    text and centring the numeral over the caption. The numeral is 98px Bold
    #4a2bc2 in a 128px box; the caption is 32px Regular #535353 on a 60px
    box. `labelWidth` is the frame's own measure on the one caption it wraps
    ("components (Including patterns)" is held to 291 of the 1320 column). */
export function BigStats({ stats }: { stats: BigStat[] }) {
  return (
    <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center">
          <p className={cn(STAT_NUM, "font-sans text-cs-violet")}>
            {s.value}
          </p>
          <p
            className={cn(PROSE_TEXT, "font-sans text-cs-body")}
            style={s.labelWidth ? { width: s.labelWidth } : undefined}
          >
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── 10 · The "Introducing — …" content block ─────────────────────── */
/** Every block in Parts 1–4 is the same shape: a heading, running copy,
    an optional bullet list, one or more plates, then optional copy or
    bullets below. One component covers all of them. */
export function ContentBlockView({
  block,
  prefix = "Introducing – ",
}: {
  block: ContentBlock;
  prefix?: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      {block.title && (
        <h3 className={cn(BLOCK_TITLE, "font-sans text-text-primary")}>
          {block.noPrefix ? "" : prefix}
          {block.title}
        </h3>
      )}
      {block.lead?.map((p, i) => (
        <p key={i} className={cn(PROSE_TEXT, PROSE, "font-sans text-text-secondary")}>
          <RichText text={p} />
        </p>
      ))}
      {block.bullets && <BlockBullets items={block.bullets} />}
      {block.images?.map((img) =>
        img.bleed ? (
          <BleedFigure key={img.src} {...img} bleed={img.bleed} />
        ) : (
          <Figure key={img.src} {...img} frame />
        )
      )}
      {block.outro?.map((p, i) => (
        <p key={i} className={cn(PROSE_TEXT, PROSE, "font-sans text-text-secondary")}>
          <RichText text={p} />
        </p>
      ))}
      {block.outroBullets && <BlockBullets items={block.outroBullets} />}
    </div>
  );
}

function BlockBullets({ items }: { items: string[] }) {
  return (
    <ul
      className={cn(
        PROSE_TEXT,
        PROSE,
        "list-disc space-y-2 pl-6 font-sans text-text-secondary marker:text-text-muted"
      )}
    >
      {items.map((b, i) => (
        <li key={i}>
          <RichText text={b} />
        </li>
      ))}
    </ul>
  );
}

/** Full-bleed figure. `frame` wraps the plate in the pale rounded card the
    frame draws around every Part 1–4 screenshot; without it the image runs
    bare, the way the photographic plates do. */
/** Plates taller than this at the 1120 column render at reduced width,
    centred, rather than eating a full screen of scroll. Only the portrait
    specimen plates (the type sheets, the survey grid) trip it; the wide
    component shots are already under it. */
const PLATE_MAX_H = 640;

/** A plate that leaves the content column. Node 2944:49403: the frame took
    the type-styles sheet out of the 1320 column to the full 1440 artboard
    and squared its corners, so it stops reading as a card sitting on the
    page and starts reading as a band the page runs through. The band takes
    the viewport; the sheet inside still sets to the content column, the way
    the frame keeps its 1320 image inside the 1440 field. The page wrapper
    carries `overflow-x-clip`, so `w-screen` costs no horizontal scroll. */
function BleedFigure({ src, alt, width, height, bleed }: MediaItem & { bleed: string }) {
  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 py-10 md:py-12"
      style={{ backgroundColor: bleed }}
    >
      <Shell>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1180px) 1120px, 100vw"
          className="h-auto w-full"
        />
      </Shell>
    </div>
  );
}

export function Figure({
  src,
  alt,
  width,
  height,
  className,
  frame,
}: MediaItem & { className?: string; frame?: boolean }) {
  // Height the plate would take at the full 1120 column.
  const naturalH = (1120 / width) * height;
  const capped = naturalH > PLATE_MAX_H;
  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(min-width: 1180px) 1120px, 100vw"
      className={cn(
        "h-auto w-full",
        capped && "mx-auto max-h-[640px] w-auto",
        frame ? "rounded-plate" : "rounded-card",
        className
      )}
    />
  );
  if (!frame) return img;
  return (
    <div className="overflow-hidden rounded-card border border-hairline/[0.10] bg-white dark:border-hairline/[0.14] dark:bg-surface">
      {img}
    </div>
  );
}

/* ── 11 · "Why did nobody use it?" — the 2.0 scoreboard ───────────── */
function BaselineCard({
  value,
  label,
  description,
  tone = "dark",
}: {
  value: string;
  label: string;
  description?: string;
  tone?: "dark" | "alert";
}) {
  return (
    <div
      className={cn(
        // 304px tall on a 24px radius with 32px of padding, exactly as the
        // frame draws it. min-height is a floor, not the height — the card is
        // a grid item and stretches to its row.
        "flex min-h-[180px] flex-col justify-between gap-8 overflow-hidden rounded-card p-6 md:min-h-[304px] md:p-8",
        tone === "alert" ? "bg-cs-red-fill" : "bg-cs-slate"
      )}
    >
      <p
        className={cn(
          "font-sans text-[clamp(2.25rem,4.44vw,4rem)] font-bold leading-none",
          tone === "alert" ? "text-white" : "text-white/70"
        )}
      >
        {value}
      </p>
      <div className="flex flex-col gap-2">
        {description && (
          <p
            className={cn(
              "font-sans text-[clamp(0.95rem,1.39vw,1.25rem)] font-bold leading-snug",
              tone === "alert" ? "text-white" : "text-white/70"
            )}
          >
            {description}
          </p>
        )}
        <p
          className={cn(
            "font-sans text-[clamp(1rem,1.67vw,1.5rem)] font-bold leading-snug",
            tone === "alert" ? "text-white" : "text-white/70"
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export function WhyNobodyUsedIt() {
  return (
    <Shell className="flex flex-col gap-block">
      <h2 className={cn(DISPLAY_XL, "text-center font-sans text-cs-ink")}>
        Everyone had the design system{" "}
        <span className="text-cs-red">Why did nobody use it? </span>
        An outcome of a library, not a system.
      </h2>

      {/* Six cards on a 3x2 grid, the frame's composition scaled down. The
          middle column's top card is the photograph, so the top row reads
          34 / a real team / 1 platform and the bottom row 1 / 0 / 0.

          Every card is a direct grid item rather than three columns of two,
          which is what keeps the rows level. As nested flex columns each
          column split its own height independently, so the taller copy in the
          Semantic Tokens card pushed its own boundary up and the middle
          column's seam sat ~17px off the other two. Two 1fr rows give the
          whole board one shared seam and six identical cards. */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:grid-rows-2">
        <BaselineCard value="34" label="COMPONENTS" />
        <div className="relative flex min-h-[280px] items-center overflow-hidden rounded-card">
          <Image
            src="/case-studies/ux4g/dept-team.jpg"
            alt="A government department product team at work"
            fill
            sizes="(min-width: 1024px) 434px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative flex flex-col gap-4 p-6 md:p-8">
            <p className="font-sans text-[clamp(1.25rem,2.22vw,2rem)] font-bold leading-tight text-white">
              A department product team
            </p>
            <p className="font-sans text-[clamp(0.9rem,1.39vw,1.25rem)] leading-relaxed text-white">
              Building a scheme portal on a three-month deadline. Told to use UX4G. Detached the
              components in week two.
            </p>
          </div>
        </div>
        <BaselineCard value="1" label="Platform (Web)" />
        <BaselineCard value="1" label="Theme" />
        <BaselineCard
          value="0"
          description="Only introduced Primitive tokens, which are just values"
          label="Semantic Tokens"
          tone="alert"
        />
        <BaselineCard value="0" label="Service Patterns" />
      </div>

      {/* "Lastly" — the consequence, shown rather than argued: four live
          government apps that all look like different systems. */}
      <div className="flex flex-col items-center gap-8 overflow-hidden rounded-card bg-cs-slate px-6 pt-10 md:px-8 md:pt-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-sans text-[clamp(1.5rem,2.78vw,2.5rem)] font-medium text-white">
            Lastly
          </p>
          <p className="font-sans text-[clamp(1.5rem,2.78vw,2.5rem)] font-bold text-white/70">
            Everything still looks <em className="font-bold italic">different</em>
          </p>
        </div>
        <Image
          src="/case-studies/ux4g/lastly-phones.png"
          alt="Four live government apps — UMANG, DigiLocker, mAadhaar and IRCTC Rail Connect — each with a different visual language"
          width={1320}
          height={465}
          sizes="(min-width: 1360px) 1258px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </Shell>
  );
}

/* ── 12 · "How we rebuilt it" — HMW + the three phase cards ───────── */
export function HowWeRebuiltIt() {
  const phases = [
    {
      n: "01",
      text: "Benchmarking, research and talking to the teams using 2.0",
      offset: "md:mt-0",
    },
    // A grid item's percentage margin resolves against its grid area, which
    // is one 370px column — so the 114 and 46px steps are written as
    // fractions of 370 and stay true as the board scales.
    { n: "02", text: "Foundations, tokens and the component library", offset: "md:mt-[30.811%]" },
    { n: "03", text: "Service patterns, documentation and rollout", offset: "md:mt-[12.432%]" },
  ];
  return (
    <section className="bg-gradient-to-b from-cs-green-wash to-paper to-[19.292%] py-section">
      <Shell className="flex flex-col gap-element">
        <Eyebrow className="text-cs-green-ink">Let&apos;s talk about</Eyebrow>
        <h2 className={cn(DISPLAY, LEADING_AUTO, "font-sans text-text-primary")}>How we rebuilt it</h2>
        <p className={cn(LEAD, "font-sans text-text-secondary")}>
          How might we turn a{" "}
          <span className="text-cs-red dark:text-cs-red">library of parts</span> into a{" "}
          <span className="text-cs-green-ink">
            system entire government services
          </span>{" "}
          can be built on,
        </p>

        {/* The photo and the cards are one unit — the cards overlap its
            bottom edge, so they can't be separated by the Shell's flex gap.
            Figma leaves the photo unscrimmed; the cards are solid white with
            a heavy shadow and carry themselves against it. */}
        <div className="mt-4">
          <div className="overflow-hidden rounded-card">
            <Image
              src="/case-studies/ux4g/rebuilt-hero.jpg"
              alt="Government service teams building with the UX4G design system"
              width={1320}
              height={814}
              sizes="(min-width: 1360px) 1320px, 100vw"
              className="h-auto w-full"
            />
          </div>

          {/* On the 1320px board the row spans x 75 → 1245 (1170 wide, 30px
              gutters) and the first card's top sits 286px above the photo's
              bottom. All three are percentages of the column so the overlap
              tracks the photo as it scales — the photo's height is a fixed
              ratio of that same width. Below `lg` the cards drop back under
              the photo, where three 230px cards over a photo would not read. */}
          <div className="relative mx-auto grid grid-cols-1 gap-6 md:-mt-[21.667%] md:w-[88.636%] md:grid-cols-3 md:items-start md:gap-x-[2.564%]">
            {phases.map((p) => (
              <div
                key={p.n}
                className={cn(
                  // text-justify is the frame's own setting on this card, and
                  // it's what makes the copy break where Figma breaks it.
                  // 32px of padding on a 370px card — as a percentage, so the
                  // measure inside stays 306px in frame units.
                  // The card is a step above the page in dark, not `bg-paper`:
                  // the gradient has already resolved to paper by the time the
                  // cards land on it, and the frame's black shadow is invisible
                  // against a near-black page — so a paper card had no edge at
                  // all and dissolved into the background.
                  "flex flex-col justify-between gap-8 rounded-chip bg-paper p-5 text-justify shadow-[0px_4px_41px_0px_rgba(0,0,0,0.15)] dark:bg-surface md:gap-20 md:p-[8.649%]",
                  p.offset
                )}
                style={{ containerType: "inline-size" }}
              >
                {/* At `lg` the type is sized in cqw against the card — 64 / 24
                    / 16px on the frame's 306px measure. cqw resolves against
                    the query container's *content* box, so these are
                    fractions of 306, not of the 370px card. */}
                <div className="flex flex-col gap-4 md:gap-[5.229cqw]">
                  <p className="font-sans text-[clamp(2.25rem,4.44vw,4rem)] font-bold leading-[1.3] text-cs-green-ink md:text-[20.915cqw]">
                    {p.n}
                  </p>
                  <p className="font-sans text-[clamp(1.05rem,1.67vw,1.5rem)] font-medium leading-[1.3] text-cs-ink md:text-[7.843cqw]">
                    {p.text}
                  </p>
                </div>
                <p className="font-sans text-base font-medium leading-[1.3] text-cs-ink dark:text-text-secondary md:text-[5.229cqw]">
                  Rahul Vaid
                </p>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* ── 13 · Section heading: handwritten eyebrow + two-tone title ───── */
export function SectionHeading({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow className="text-cs-body">{eyebrow}</Eyebrow>
      <h2 className={cn(DISPLAY, LEADING_AUTO, "font-sans text-text-primary")}>
        {title}
        {accent && <span className="text-cs-violet"> {accent}</span>}
      </h2>
    </div>
  );
}


/* ── 13b · What the catalogue turned out to contain ───────────────── */
/** Built for a first scan. The argument is one sentence — ~12,000 services
    are really ten shapes, and the same few steps recur inside them, so a
    step gets solved once instead of ten times — and everything here exists
    to carry it at a glance: four counts, the ten names, five bars.

    Two earlier versions were too slow. A journeys x steps dot matrix showed
    the data and left the reader to find the finding; the version after it
    said the finding but buried it under ten description cards, five journey
    lists and four paragraphs. Names alone carry the ten (they are verbs the
    reader already knows), and a count plus a bar carries each step. */
const JOURNEY_STEPS: { id: string; label: string }[] = [
  { id: "aadhaar", label: "Aadhaar authentication" },
  { id: "upload", label: "Document upload" },
  { id: "status", label: "Status tracking" },
  { id: "payment", label: "Payment" },
  { id: "booking", label: "Slot booking" },
];

export function JourneyModel({ journeys }: { journeys: ServiceJourney[] }) {
  const total = journeys.length;
  return (
    <div className="flex flex-col gap-8">
      {/* The ten, now selectable — click one to see its definition and
          example services, in JourneyExplorer (a client component; this
          function stays plain since the bars below it need no state). */}
      <JourneyExplorer journeys={journeys} />

      {/* One line per recurring step: label, bar, count. */}
      <div className="flex flex-col gap-3">
        <h3 className={cn(BODY, "font-sans font-semibold text-cs-ink")}>
          And five steps keep coming back
        </h3>
        <ul className="flex flex-col gap-2">
          {JOURNEY_STEPS.map((step) => {
            const n = journeys.filter((j) => j.steps.includes(step.id)).length;
            return (
              <li
                key={step.id}
                className="flex items-center gap-3 rounded-chip bg-paper px-4 py-2.5 sm:gap-5"
              >
                <span className={cn(BODY, "flex-1 font-sans text-cs-ink")}>{step.label}</span>
                <span
                  className="hidden h-1.5 w-28 shrink-0 overflow-hidden rounded-full bg-cs-violet/15 sm:block"
                  aria-hidden
                >
                  <span
                    className="block h-full rounded-full bg-cs-violet"
                    style={{ width: `${(n / total) * 100}%` }}
                  />
                </span>
                <span className="shrink-0 font-sans text-sm font-semibold tabular-nums text-cs-violet">
                  {n} of {total}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** The catalogue analysis. Its own band so it reads as a chapter of the
    research rather than a tail on the benchmarking. */
export function ServiceResearch({ block }: { block: ResearchBlock }) {
  return (
    <section className="bg-cs-panel py-section">
      <Shell className="flex flex-col gap-8">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} accent={block.accent} />
        {block.lead.map((p, i) => (
          <p key={i} className={cn(PROSE_TEXT, PROSE, "font-sans text-text-secondary")}>
            <RichText text={p} />
          </p>
        ))}
        <BigStats stats={block.stats} />
        <p className="font-sans text-sm text-cs-body">{block.note}</p>
        <CategoryBreakdown categories={block.categories} />
        <JourneyModel journeys={block.journeys} />
        {block.outro.map((p, i) => (
          <p key={i} className={cn(PROSE_TEXT, PROSE, "font-sans text-text-secondary")}>
            <RichText text={p} />
          </p>
        ))}
      </Shell>
    </section>
  );
}


/* ── 17b · Part 3's answer, shown as before and after ─────────────── */
/** The job here is to read as a solution. Two earlier attempts didn't:
    a component -> pattern -> journey ladder (too abstract — it defined a
    term instead of showing a result) and a bar chart of the nine groups
    (which borrowed the research band's own visual language, so it scanned
    as a second findings section).

    Before/after is the plainest device for "we fixed this", so that carries
    the explanation, and the groups drop to plain chips — coverage, stated
    once, without pretending to be analysis. */
export function PatternModel({
  contrast,
  groups,
}: {
  contrast: { before: string; after: string };
  groups: PatternGroup[];
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-card border border-cs-red-border bg-cs-red-surface p-5">
          <span className="font-sans text-sm font-semibold uppercase tracking-wide text-cs-red-ink">
            Before
          </span>
          <p className={cn(BODY, "font-sans text-cs-ink")}>{contrast.before}</p>
        </div>
        <div className="flex flex-col gap-2 rounded-card border border-cs-green-surface bg-cs-green-surface p-5">
          <span className="font-sans text-sm font-semibold uppercase tracking-wide text-cs-green">
            After
          </span>
          <p className={cn(BODY, "font-sans text-cs-ink")}>{contrast.after}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className={cn(BODY, "font-sans font-semibold text-cs-ink")}>
          What the 36 cover
        </h3>
        {/* The count spells out its unit. As a bare number next to a group
            name it read as a rank or an index, not "how many patterns". */}
        <ul className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <li
              key={g.name}
              className="flex items-baseline gap-2 rounded-chip bg-cs-panel px-3 py-1.5"
            >
              <span className={cn(BODY, "font-sans text-cs-ink")}>{g.name}</span>
              <span className="font-sans text-sm font-semibold text-cs-violet">
                <span className="tabular-nums">{g.count}</span>{" "}
                {g.count === 1 ? "pattern" : "patterns"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── 14 · "Gathering insights" — the survey and its charts ────────── */
export function GatheringInsights() {
  return (
    <Shell className="flex flex-col gap-element">
      <Eyebrow className="text-cs-body">Gathering insights</Eyebrow>
      <h2 className={cn(DISPLAY, LEADING_AUTO, "font-sans text-text-primary")}>
        What the last version actually felt like to use
      </h2>
      <p className={cn(LEAD, "font-sans text-text-secondary")}>
        A six-minute survey to 79 people across NeGD, DIC, state IT departments and vendor teams. 47
        replied
      </p>
      {/* Two lockups, both transparent PNGs, so the pill's own background
          shows through rather than the logo carrying a baked white plate.
          The filenames describe the *wordmark's* colour, not the theme it
          belongs to: the dark-grey mark is the one that reads on the light
          surface, and the white mark is the one that reads on the dark. */}
      <div className="w-fit rounded-full border border-cs-body/30 bg-paper p-5 dark:border-hairline/[0.16] dark:bg-surface">
        <Image
          src="/company-logos/Logo_Google forms dark.png"
          alt="Google Forms"
          width={220}
          height={40}
          className="h-8 w-auto dark:hidden md:h-[38px]"
        />
        <Image
          src="/company-logos/Logo_Google forms light.png"
          alt="Google Forms"
          width={330}
          height={60}
          className="hidden h-8 w-auto dark:block md:h-[38px]"
        />
      </div>
      <div className="mt-4 overflow-hidden rounded-card bg-cs-slate p-4 md:p-[1.4vw]">
        {/* 1262 tall — the same PLATE_MAX_H cap the Figure plates get. */}
        <Image
          src="/case-studies/ux4g/survey-graphs.jpg"
          alt="Survey results — 16 charts covering framework use, blockers, and most-requested components"
          width={1320}
          height={1262}
          sizes="(min-width: 1180px) 1120px, 100vw"
          className="mx-auto h-auto max-h-[640px] w-auto rounded-plate"
        />
      </div>
    </Shell>
  );
}

/* ── 15 · Giant act divider — two layers of one word ──────────────── */
/** "The Solution" is set twice and stacked: a ghosted outline behind, and
    the solid blue in front stepped down and slightly right, so the two
    read as one offset-printed mark rather than two separate headings. Both
    bleed past the column on each side — that overflow is the effect, not a
    mistake. Font size is set on the wrapper (for the outline, which sets
    the wrapper's own em) so its offsets stay proportional at every width;
    the solid layer gets its own smaller size directly, everything else
    below is expressed in `cqw` — the same container-relative unit the rest
    of this file uses for pixel offsets — so the two differently-sized
    layers stay comparable. */
/** Outline is node 2962:55070 (parent 2962:55069, misleadingly named
    "Outline-the struggle heading" — a stale label from whatever divider it
    was duplicated from, not an error in which node this is; the text
    content and position confirm it's this one). Solid is 2944:48979
    (parent 2944:48978), a sibling of the Part 1 collage (2944:48980,
    "Container") inside "Solution section" (2944:48977) — both re-pulled
    from the current frame after the recent edit.

    The two layers are NOT the same size any more: outline is still 252px,
    solid is now 218px (0.865x) — both DM Sans ExtraBold, `opsz 14` fixed
    explicitly (the frame pins it; leaving it unset lets the browser
    auto-resolve a different optical size at this display scale, which is
    what made the solid layer's letterforms — 'e' most visibly — drift from
    the frame). Tracking: outline -2.3577px/252 = -0.00936em (unchanged).
    Solid -2.16px/218 = -0.0099em.

    Position, all measured from the outline's own top and expressed in the
    18.34cqw the outline is sized in (1px of Figma's 252-canvas = 18.34/252
    = 0.07278cqw): solid sits 163px (11.86cqw) below the outline's top: not
    reproducible in one shared `em` any more since the two layers differ in
    size. The Part 1 collage's top sits a further 195px down from the
    solid's own top, i.e. 358px (1.42em, in the wrapper's own em) below the
    outline's top — that's where `md:h-*` below crops the block, letting
    the solid layer's lower third run on into the collage as the frame
    does. Below `md` there's no collage to tuck behind, so the box takes
    the full uncropped stack instead: 163px + the solid's own 218×1.302
    line box, both in outline-em, = 1.77em. */
export function SolutionDivider() {
  const word = "absolute inset-x-0 whitespace-nowrap text-center font-sans font-extrabold";
  // Kept out of `word` and reapplied on both p's individually, after every
  // other class: tailwind-merge treats a `text-[size]` override (the solid
  // layer's smaller size) as conflicting with a `leading-*` set earlier in
  // the string and drops it, silently falling back to the browser's normal
  // line-height — which is what was making the solid layer's own line box
  // taller than Figma's and pushing more of it into the collage below.
  const leading = "leading-[1.302]";
  const opsz14 = { fontVariationSettings: '"opsz" 14' } as const;
  return (
    <div style={{ containerType: "inline-size" }}>
      <div className="relative h-[1.77em] text-[18.34cqw] md:h-[1.42em]">
        <p
          className={cn(word, "top-0 text-transparent tracking-[-0.00936em]", leading)}
          // The frame draws this at 8% opacity, not a fixed grey. 8% of the
          // foreground resolves to #ebebeb on white — which is why a
          // hardcoded grey looked right in light and blew out in dark.
          style={{ WebkitTextStroke: "1.5px rgb(var(--color-hairline) / 0.08)", ...opsz14 }}
        >
          The Solution
        </p>
        <p
          className={cn(word, "top-[11.86cqw] text-[15.87cqw] tracking-[-0.0099em] text-cs-purple", leading)}
          style={opsz14}
        >
          The Solution
        </p>
      </div>
    </div>
  );
}

/* ── 16 · Part 1's opener — a 2×2 collage under a purple panel ────── */
/** The frame builds this as four 660-wide cells (Part 1 title, India Gate,
    the flag, and a quote) with one rounded purple panel laid across the
    bottom half, notched so the flag photo shows through its top-left. The
    notch is a boolean subtract in Figma; here the panel is simply drawn
    behind the two lower cells, which reads the same and keeps the copy as
    live text.

    The panel, the quote and the divider's word above them were all the
    frame's blue and are all now its #4a2bc3 purple. The panel is the one
    that can't read a token — it ships as an exported path, so its fill
    lives in panel.svg and is theme-agnostic, exactly as it was in blue. */
export function FoundationsOpener() {
  const quote =
    "2.0 had components but nothing underneath them. No colour system, no type scale, no spacing rules, no grid. We built the layer everything else stands on, first.";
  return (
    <>
      {/* Below lg the collage can't hold — the blue panel's notch is cut for
          a 1320-wide board — so it degrades to a plain stack. */}
      <div className="relative flex flex-col gap-6 bg-paper md:hidden">
        <div className="flex flex-col gap-4">
          <Eyebrow className="text-cs-violet">Part 1</Eyebrow>
          <p className="font-sans text-[2.5rem] font-bold leading-[1.306] text-cs-ink">
            New Foundations
          </p>
        </div>
        <Image
          src="/case-studies/ux4g/part1/india-gate.png"
          alt="India Gate at sunrise, under the UX4G wordmark"
          width={660}
          height={628}
          className="h-auto w-full"
        />
        <Image
          src="/case-studies/ux4g/part1/flag.png"
          alt="The Ashoka Chakra on the Indian national flag"
          width={660}
          height={774}
          className="h-auto w-full"
        />
        <div className="rounded-card bg-cs-purple p-6">
          <p className="font-sans text-lg font-medium leading-relaxed text-white">{quote}</p>
          <p className="mt-6 font-sans text-3xl font-medium text-white">Redefined System</p>
        </div>
      </div>

      {/* Node 2944:48980 — a 1320×1402 board of four quadrants (660×628 top,
          660×774 bottom) with one blue shape laid over the lower half. That
          shape is a Figma boolean subtract: a 1180×679 rounded rectangle
          with a notched hole cut through it, so the flag photo on the left
          and the white quote panel on the right show *through* the blue
          rather than sitting inside it. The hole's outline is too irregular
          for border-radius, so the shape ships as the exported path itself
          and is laid over the quadrants. */}
      <div
        // bg-paper matters: the divider's solid word runs on underneath this
        // block, and the top-right photo hides it on that side. Without an
        // opaque fill the left half stayed transparent and the blue showed
        // straight through, breaking the "heading tucks behind" effect.
        className="relative hidden aspect-[1320/1402] w-full bg-paper md:block"
        style={{ containerType: "inline-size" }}
      >
        {/* Q1 — title, on paper */}
        {/* Sized from the shared scale, not cqw — as cqw this ran 83px while
            Parts 2-4 set their titles at 56, so Part 1 read a whole size
            larger than every other chapter opener. */}
        <div className="absolute left-[2.121%] top-[7.454%] flex w-[45.833%] flex-col gap-4">
          <Eyebrow className="text-cs-violet">Part 1</Eyebrow>
          <p className={cn(PART_TITLE, "font-sans text-cs-ink")}>New Foundations</p>
        </div>

        {/* Q2 — India Gate, top right */}
        <Image
          src="/case-studies/ux4g/part1/india-gate.png"
          alt="India Gate at sunrise, under the UX4G wordmark"
          width={660}
          height={628}
          sizes="660px"
          className="absolute left-1/2 top-0 h-[44.793%] w-1/2 object-cover"
        />

        {/* Q3 — the flag, bottom left */}
        <Image
          src="/case-studies/ux4g/part1/flag.png"
          alt="The Ashoka Chakra on the Indian national flag"
          width={660}
          height={774}
          sizes="660px"
          className="absolute bottom-0 left-0 h-[55.207%] w-1/2 object-cover"
        />

        {/* Q4 — the quote panel is plain white; the blue frames it. */}
        <div className="absolute bottom-0 left-1/2 h-[55.207%] w-1/2 bg-white dark:bg-surface" />

        {/* The blue shape, hole and all. */}
        <img
          src="/case-studies/ux4g/part1/panel.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-[5.303%] top-[48.146%] h-[48.431%] w-[89.394%]"
        />

        {/* Quote — 40px mark, 16px gap, 32px Medium #0030f6 on a 60px box. */}
        <div className="absolute left-[52.121%] top-[53.017%] flex w-[37.045%] flex-col gap-[1.212cqw]">
          <img
            src="/case-studies/ux4g/part1/sparkle.svg"
            alt=""
            aria-hidden
            className="h-[3.03cqw] w-[3.03cqw]"
          />
          <p className="font-sans text-[2.424cqw] font-medium leading-[1.875] text-cs-purple">
            {quote}
          </p>
        </div>

        {/* 72px Medium white, sitting on the blue. */}
        <p className="absolute left-[10.379%] top-[85.257%] font-sans text-[5.455cqw] font-medium leading-[1.306] text-white">
          Redefined System
        </p>
      </div>
    </>
  );
}

/* ── 17b · Where it stands — the shipped states ───────────────────── */
/** Two states and two links, set as running text rather than cards. The
    Trade-offs grid follows immediately after, and two card grids back to
    back read as one long grid — so this section stays quiet on purpose and
    lets the one after it carry the weight.

    No timeline either, for the same reason the Trade-offs has none: the
    research chapter already spends the page's timeline budget on the Gantt,
    and a second horizontal progression this late reads as a repeat. The
    pills carry the sequence instead. */
const RELEASE_PILL: Record<string, string> = {
  done: "bg-cs-green-surface text-cs-green",
  /** Solid, because this is the one that says where the system is now. */
  live: "bg-cs-violet text-white",
};

/** No top pad: Part 4 above already carries its own `pb-section`, and both
    sit on paper with no band between them, so one section gap is the whole
    separation. Adding one here doubled it to 192. */
export function ReleaseStatus({ block }: { block: ReleaseBlock }) {
  return (
    <Shell className="flex flex-col gap-block pb-section">
      <div className="flex flex-col gap-4">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} accent={block.accent} />
        <Prose>{block.lead}</Prose>
      </div>

      <ol className="flex flex-col gap-8">
        {block.states.map((st) => (
          <li key={st.title} className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "rounded-chip px-3 py-1 font-sans text-sm font-semibold",
                  RELEASE_PILL[st.tone]
                )}
              >
                {st.status}
              </span>
              <h3 className={cn(BLOCK_TITLE, "font-sans text-text-primary")}>{st.title}</h3>
            </div>
            {st.body.map((p, i) => (
              <p key={i} className={cn(PROSE_TEXT, PROSE, "font-sans text-text-secondary")}>
                <RichText text={p} />
              </p>
            ))}
          </li>
        ))}
      </ol>

      {/* The two places a reader can go and check the claim for themselves.
          Both open in a new tab — losing the case study to an outbound click
          is the one thing this section must not do.

          Buttons, not bordered captions. These were a two-line stack — a
          grey note over the label — which is the shape of a definition
          list, not of something you click: the whole block read as more
          running text with a rule round it. One line, the site's own button
          geometry (rounded-lg, px-4 py-3, 16px medium — same as the hero's
          pair), and the first one solid: the live system is the single
          thing this section wants the reader to go and see, and the Figma
          file is the alternative. The note it used to show is not lost —
          it carries the accessible name, so "ux4g.gov.in" still announces
          as "The live system". */}
      <div className="flex flex-wrap gap-3">
        {block.links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${l.note} — ${l.label}`}
            title={l.note}
            className={cn(
              // `border` on both, transparent on the solid one: without it
              // the outlined button is 2px taller and the pair sits off by
              // a pixel at every size.
              "group inline-flex items-center gap-1 rounded-lg border px-4 py-3 font-sans text-base font-medium transition-colors",
              i === 0
                // `text-paper`, not `text-white`: dark re-points --cs-violet
                // at a light tint, so white on it is a 1.7:1 wash. Paper is
                // the page ground — white in light, near-black in dark —
                // which is legible against the fill in both.
                ? "border-transparent bg-cs-violet text-paper hover:bg-cs-violet-deep"
                : "border-cs-violet/30 text-cs-violet hover:border-cs-violet/60 hover:bg-cs-violet/[0.06]"
            )}
          >
            {l.label}
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        ))}
      </div>
    </Shell>
  );
}

/* ── 18 · Trade-offs — the closing chapter ────────────────────────── */
/** Sits after Part 4 because every one of these stories resolves *after*
    the build is described: #2 ends with 3.0 being resumed, #4 with the Beta
    shipping. Read before the solution they would spoil outcomes the reader
    has not met yet. It takes the panel tint for the same reason
    ServiceResearch does — it is a change of register, from "what we built"
    to "how we decided", and the tint is how this page marks those.

    There is deliberately no timeline here. A decision spine pinned to
    Jan → Jun was the obvious second visual, but it would have borrowed
    DesignTimeline's own language four sections later and scanned as a
    second Gantt — the same trap PatternModel's bar-chart draft fell into.
    The question at the head of each card carries the visual load instead:
    four questions, each with its answer already coloured in.

    The two supporting decisions in the source doc (one experience across
    four technologies, standardise the foundation not the whole experience)
    are not cards. Nothing was given up in either, so as cards they would
    have made the four real ones look smaller — and both are already said
    on the page, in the Challenge band, the Impact teaser, Part 2 and the
    semantic-tokens block in Part 1. */

/** The violet half of each headline — the answer we went with. Same
    `**…**` convention as RichText, but the emphasis has to be a colour
    here rather than a weight: the headline is already semibold, so bolding
    a span inside it would not read as anything. */
function QuestionText({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-cs-violet">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function TradeOffs({ block }: { block: TradeOffBlock }) {
  return (
    <section className="bg-cs-panel py-section">
      <Shell className="flex flex-col gap-block">
        <div className="flex flex-col gap-4">
          <SectionHeading eyebrow={block.eyebrow} title={block.title} accent={block.accent} />
          <Prose>{block.lead}</Prose>
          <p className="font-sans text-sm text-cs-body">{block.note}</p>
        </div>

        {/* An ordered list, not a grid of divs: the cards are numbered and
            the order is the project's own chronology, so the numbering is
            content rather than decoration.

            The three parts of a card — question, body, takeaway — are three
            grid rows the two cards in a row *share*, via `subgrid`. Each
            part is a different length in every card (Q2 and Q3 run to an
            extra line, two of the four close on a shipped date and two do
            not), and the previous `mt-auto` bottom-aligned the takeaway
            instead: the rule above it then landed at a different height in
            each card, and the pair read as two unrelated boxes. Sharing the
            rows pins all three boundaries — the body starts level, and the
            rule sits at one height across the row — and the slack from a
            shorter body falls as whitespace above the rule rather than
            shifting it. Below `md` there is one card per row and nothing to
            align to, so the card stays a plain flex column. */}
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {block.items.map((t, i) => (
            <li
              key={t.question}
              className="flex flex-col gap-5 rounded-card border border-hairline/[0.10] bg-white p-6 dark:border-hairline/[0.14] dark:bg-surface md:row-span-3 md:grid md:grid-rows-subgrid md:p-8"
            >
              <div className="flex flex-col gap-3">
                <span className="font-sans text-sm font-semibold tabular-nums text-cs-violet">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={cn(BLOCK_TITLE, "font-sans text-text-primary")}>
                  <QuestionText text={t.question} />
                </h3>
              </div>

              {/* The copy stack sets its own tighter gap. At the card's own
                  20px the paragraphs read as separate blocks rather than
                  one argument. No PROSE cap either — the card is already
                  half a column wide, so the 68ch measure never bites. */}
              <div className="flex flex-col gap-3">
                {t.body.map((p, j) => (
                  <p key={j} className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>
                    <RichText text={p} />
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-2 border-t border-cs-violet/20 pt-5">
                <p className={cn(BODY, "font-sans font-medium text-cs-ink")}>{t.takeaway}</p>
                {t.result && (
                  <p className={cn(BODY, "font-sans font-semibold text-cs-violet")}>{t.result}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}

/* ── 17 · Closing thank-you ───────────────────────────────────────── */
export function ThankYou() {
  return (
    <Shell className="flex flex-col items-center gap-element pb-section text-center">
      <p className="font-sans text-[clamp(2.5rem,7.778vw,7rem)] font-extrabold leading-none tracking-[-1.2px] text-cs-blue">
        Thank you
      </p>
      <p className="font-sans text-[clamp(1rem,1.528vw,1.375rem)] font-medium text-text-primary opacity-80">
        Feel free to share your feedback :)
      </p>
    </Shell>
  );
}
