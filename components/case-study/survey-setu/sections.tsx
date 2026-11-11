import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ImageIcon, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Shell, Eyebrow, RichText } from "@/components/case-study/ux4g/sections";
import type { MediaItem } from "@/types";

/* ────────────────────────────────────────────────────────────────────
   Survey Setu follows the UX4G case study's system, not eBCAS's neutral
   variant of it:

   · Type — UX4G's clamp() ramp, copied value for value below (ux4g/
     sections.tsx keeps its constants private). Same roles too: DISPLAY_XL
     for the title and the one statement heading, DISPLAY for section
     heads, PART_TITLE for "Part N" chapter titles, BLOCK_TITLE for every
     "Introducing – …" block and card head, PROSE_TEXT for running copy.
   · Section grammar — a Caveat eyebrow over a DISPLAY head whose last
     phrase carries the brand colour; full-bleed bands for changes of
     register (dark Challenge band, panel-tint research and reflection
     bands); "Part N" openers followed by "Introducing – …" blocks a full
     `gap-section` apart, with each head bound to its exhibit at
     `gap-block`.
   · Colour — the product's own brand step as the case study's accent
     (--ss-green, the MoTA green, in the slot UX4G gives --cs-violet), and
     the shared semantic pair for problem and payoff (--cs-red pills on the
     Challenge band, --cs-green on Impact), so red/green mean the same thing
     in both case studies.

   Where a real screen hasn't been exported yet, `Placeholder` holds its
   slot at the right aspect ratio, dashed so "pending" reads at a glance —
   the same convention as eBCAS's ImagePlaceholder. ─────────────────── */

const DISPLAY_XL = "text-[clamp(1.75rem,3.333vw,3rem)] font-semibold leading-[1.15] tracking-[-1.2px]";
const TITLE_LEAD = "text-[clamp(1.125rem,1.528vw,1.375rem)] leading-[1.5]";
const DISPLAY = "text-[clamp(1.5rem,2.361vw,2.125rem)] font-semibold";
const LEADING_AUTO = "leading-[1.2]";
const PART_TITLE = "text-[clamp(2rem,3.889vw,3.5rem)] font-bold leading-[1.1]";
const BLOCK_TITLE = "text-[clamp(1.25rem,1.806vw,1.625rem)] font-semibold leading-[1.25]";
const LEAD = "text-[clamp(1rem,1.389vw,1.25rem)] leading-[1.5]";
const BODY = "text-[clamp(0.9375rem,1.111vw,1rem)] leading-[1.6]";
const PROSE_TEXT = "text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.6]";
const STAT_NUM = "text-[clamp(2rem,4.167vw,3.75rem)] font-bold leading-[1.15]";
const CHIP = "text-[clamp(0.875rem,1.111vw,1rem)] font-medium";

/** UX4G's white-in-light / surface-in-dark card, used for every card and
    framed plate on the page. */
const CARD =
  "rounded-card border border-hairline/[0.10] bg-white dark:border-hairline/[0.14] dark:bg-surface";

/** `**…**` → brand colour instead of weight, for headings that are
    already semibold (UX4G's QuestionText, in green). */
function Accented({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-ss-green">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ── Title block ──────────────────────────────────────────────────── */
/** UX4G's TitleBlock: title, lead, then the hero plate a `block` below,
    all one section. `pt-6` because BackToWork above owns the navbar
    clearance. */
export function TitleBlock({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: ReactNode;
  image: MediaItem;
}) {
  return (
    <Shell className="pb-section">
      <div className="flex flex-col gap-4 pt-6">
        <h1 className={cn(DISPLAY_XL, "font-sans text-text-primary")}>{title}</h1>
        <p className={cn(TITLE_LEAD, "font-sans text-text-secondary")}>{subtitle}</p>
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority
        sizes="(min-width: 1180px) 1120px, 100vw"
        className="mt-block h-auto w-full rounded-card"
      />
    </Shell>
  );
}

/** Brand-coloured `**…**` inside the hero subtitle — UX4G's
    `font-medium text-cs-violet-deep` span, in green. */
export function BrandSpan({ children }: { children: ReactNode }) {
  return <span className="font-medium text-ss-green-deep">{children}</span>;
}

/* ── Chip rows ────────────────────────────────────────────────────── */
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
};

/** UX4G's ChipGroup geometry exactly, on the green chip tint. */
export function ChipGroup({ title, chips, withIcons }: { title: string; chips: string[]; withIcons?: boolean }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h2 className={cn(DISPLAY, LEADING_AUTO, "font-sans text-text-primary")}>{title}</h2>
      <ul className="flex flex-wrap items-center gap-3 md:gap-4">
        {chips.map((chip) => (
          <li
            key={chip}
            className={cn(
              CHIP,
              "flex items-center gap-2 rounded-chip bg-ss-chip px-4 py-3 font-sans leading-[1.3077] text-text-primary shadow-[0px_2px_5px_rgba(0,0,0,0.1)] dark:shadow-none"
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

/* ── Headings ─────────────────────────────────────────────────────── */
/** UX4G's SectionHeading: Caveat eyebrow, DISPLAY head, the last phrase in
    the brand colour. */
export function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow className="text-text-muted">{eyebrow}</Eyebrow>
      <h2 className={cn(DISPLAY, LEADING_AUTO, "font-sans text-text-primary")}>
        {title}
        {accent && <span className="text-ss-green"> {accent}</span>}
      </h2>
    </div>
  );
}

/** One section on paper: heading (+ lead) bound to its exhibits at
    `gap-block`, padded at the bottom like every UX4G section. */
export function Section({
  eyebrow,
  title,
  accent,
  lead,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Shell className={cn("flex flex-col gap-block pb-section", className)}>
      <div className="flex flex-col gap-4">
        <SectionHeading eyebrow={eyebrow} title={title} accent={accent} />
        {lead && <p className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>{lead}</p>}
      </div>
      {children}
    </Shell>
  );
}

/** A change of register, on the panel tint — UX4G's ServiceResearch /
    TradeOffs band. Pads its own inside; the caller pads the outside. */
export function PanelBand({ children }: { children: ReactNode }) {
  return <section className="bg-ss-panel py-section">{children}</section>;
}

/** UX4G's "Everyone had the design system — Why did nobody use it?"
    statement: DISPLAY_XL, centred, the turn of the sentence in red. */
export function Statement({ before, turn }: { before: string; turn: string }) {
  return (
    <Shell className="pb-section">
      <h2 className={cn(DISPLAY_XL, "mx-auto max-w-[920px] text-center font-sans text-text-primary")}>
        {before} <span className="text-cs-red">{turn}</span>
      </h2>
    </Shell>
  );
}

/* ── Imagery ──────────────────────────────────────────────────────── */
type Ratio = "wide" | "phone" | "square";
const RATIO: Record<Ratio, string> = {
  wide: "aspect-[16/10] w-full",
  square: "aspect-square w-full",
  phone: "aspect-[390/844] w-[min(100%,280px)]",
};

/** A real screen that hasn't been exported yet. Held at the aspect ratio
    the real plate will take, so dropping the image in later doesn't move
    the page. */
export function Placeholder({ label, hint, ratio = "wide" }: { label: string; hint?: string; ratio?: Ratio }) {
  const Icon = ratio === "phone" ? Smartphone : ImageIcon;
  return (
    <figure className={cn("flex flex-col gap-3", ratio === "phone" && "items-center")}>
      <div
        className={cn(
          RATIO[ratio],
          "flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-ss-green/40 bg-ss-panel px-6 text-center"
        )}
      >
        <Icon className="h-6 w-6 text-ss-green" strokeWidth={1.5} aria-hidden="true" />
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-ss-green">{label}</span>
      </div>
      {hint && (
        <figcaption className={cn(BODY, "font-sans text-text-muted", ratio === "phone" && "max-w-[280px] text-center")}>
          {hint}
        </figcaption>
      )}
    </figure>
  );
}

/** One portrait phone export, held at native width so it's never upscaled. */
export function PhoneShot({ src, alt, width, height }: MediaItem) {
  return (
    <div className="flex justify-center">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="280px"
        className="h-auto max-h-[600px] w-auto max-w-[min(100%,280px)] rounded-[18px] border border-hairline/[0.10] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
      />
    </div>
  );
}

/** A wide screenshot in UX4G's framed-plate treatment. */
export function Plate({ src, alt, width, height, caption }: MediaItem) {
  return (
    <figure className="flex flex-col gap-3">
      <div className={cn(CARD, "overflow-hidden")}>
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1180px) 1120px, 100vw" className="h-auto w-full" />
      </div>
      {caption && <figcaption className={cn(BODY, "font-sans text-text-muted")}>{caption}</figcaption>}
    </figure>
  );
}

/* ── Part openers and feature blocks ──────────────────────────────── */
/** UX4G's PartOpener: Caveat "Part N" over a PART_TITLE on the left, the
    chapter's plate on the right. */
export function PartOpener({ part, title, lead, visual }: { part: string; title: string; lead?: string; visual: ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
      <div className="flex flex-col justify-center gap-4">
        <Eyebrow className="text-ss-green">{part}</Eyebrow>
        <p className={cn(PART_TITLE, "font-sans text-text-primary")}>{title}</p>
        {lead && <p className={cn(LEAD, "font-sans text-text-secondary")}>{lead}</p>}
      </div>
      {visual}
    </div>
  );
}

/** UX4G's "Introducing – …" ContentBlock — same heading, prose and bullet
    treatment — set beside a portrait phone plate instead of under a
    full-width one, since every Part 1 exhibit is a phone screen. `flip`
    alternates the side so a run of them doesn't read as one long column. */
export function FeatureBlock({
  title,
  lead,
  bullets,
  chips,
  visual,
  flip,
}: {
  title: string;
  lead: string[];
  bullets?: string[];
  chips?: string[];
  visual: ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-block md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-12">
      <div className={cn("flex flex-col gap-6", flip && "md:order-2")}>
        <h3 className={cn(BLOCK_TITLE, "font-sans text-text-primary")}>Introducing – {title}</h3>
        {lead.map((p, i) => (
          <p key={i} className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>
            <RichText text={p} />
          </p>
        ))}
        {bullets && (
          <ul className={cn(PROSE_TEXT, "list-disc space-y-2 pl-6 font-sans text-text-secondary marker:text-text-muted")}>
            {bullets.map((b, i) => (
              <li key={i}>
                <RichText text={b} />
              </li>
            ))}
          </ul>
        )}
        {chips && (
          <ul className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c} className={cn(BODY, "rounded-chip bg-ss-chip px-3 py-1.5 font-sans font-medium text-text-primary")}>
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={cn(flip && "md:order-1")}>{visual}</div>
    </div>
  );
}

/** Part 2's blocks — the same "Introducing – …" head and prose, over a
    full-width row of plates (portal screens are wide). */
export function PortalBlock({ title, lead, children }: { title: string; lead: string[]; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className={cn(BLOCK_TITLE, "font-sans text-text-primary")}>Introducing – {title}</h3>
      {lead.map((p, i) => (
        <p key={i} className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>
          <RichText text={p} />
        </p>
      ))}
      {children}
    </div>
  );
}

/* ── Day zero ─────────────────────────────────────────────────────── */
export function QAList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <dl className="flex flex-col divide-y divide-hairline/[0.08] border-y border-hairline/[0.08]">
      {items.map((item) => (
        <div key={item.q} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
          <dt className={cn(PROSE_TEXT, "font-sans font-medium text-text-primary")}>{item.q}</dt>
          <dd className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>
            <RichText text={item.a} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The conclusion line under a section — UX4G's TradeOffs takeaway: a
    brand-tinted rule, then the line itself. */
export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-ss-green/25 pt-5">
      <p className={cn(LEAD, "font-sans font-medium text-text-primary")}>{children}</p>
    </div>
  );
}

/* ── Systems thinking ─────────────────────────────────────────────── */
export interface Translation {
  clause: string;
  spec: string;
  consequence: string;
}

/** Architecture clause → human consequence. A real table from `md` up;
    below that each row stacks into a card with the arrow turned down. */
export function TranslationMatrix({ rows }: { rows: Translation[] }) {
  const label = "font-sans text-xs font-semibold uppercase tracking-[0.08em] text-text-muted";
  return (
    <div className={cn(CARD, "p-5 md:p-8")}>
      <table className="hidden w-full border-collapse text-left md:table">
        <thead>
          <tr className="border-b border-hairline/[0.16]">
            <th className={cn(label, "w-[40%] pb-4 pr-8")}>In the architecture doc</th>
            <th className={cn(label, "pb-4")}>What it means at the doorstep</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.clause} className={cn("align-top", i < rows.length - 1 && "border-b border-hairline/[0.08]")}>
              <td className="py-6 pr-8">
                <p className={cn(BLOCK_TITLE, "font-sans text-text-primary")}>{r.clause}</p>
                <p className={cn(BODY, "mt-1 font-sans text-text-muted")}>{r.spec}</p>
              </td>
              <td className="py-6">
                <div className="flex gap-4">
                  <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-ss-green" strokeWidth={2} aria-hidden="true" />
                  <p className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>
                    <RichText text={r.consequence} />
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="flex flex-col divide-y divide-hairline/[0.08] md:hidden">
        {rows.map((r) => (
          <li key={r.clause} className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0">
            <div>
              <p className={cn(BLOCK_TITLE, "font-sans text-text-primary")}>{r.clause}</p>
              <p className={cn(BODY, "mt-1 font-sans text-text-muted")}>{r.spec}</p>
            </div>
            <ArrowDown className="h-4 w-4 text-ss-green" strokeWidth={2} aria-hidden="true" />
            <p className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>
              <RichText text={r.consequence} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Chain of custody ─────────────────────────────────────────────── */
export interface CustodyRole {
  role: string;
  duty: string;
  ownership: "owned" | "collaborated" | "context";
}

const OWNERSHIP: Record<CustodyRole["ownership"], { label: string; className: string }> = {
  owned: { label: "I designed", className: "bg-ss-green text-paper" },
  collaborated: { label: "With a second designer", className: "bg-ss-chip text-text-primary" },
  context: { label: "Never touches the app", className: "border border-dashed border-hairline/[0.32] text-text-muted" },
};

/** Doorstep → national policy, as one ordered chain. Five columns from
    `lg`, a vertical list below. */
export function CustodyChain({ roles, start, end }: { roles: CustodyRole[]; start: string; end: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow className="text-text-muted">{start}</Eyebrow>
      <ol className="grid grid-cols-1 gap-3 lg:grid-cols-5">
        {roles.map((r, i) => {
          const tag = OWNERSHIP[r.ownership];
          return (
            <li
              key={r.role}
              className={cn(
                CARD,
                "flex flex-col gap-3 p-5",
                r.ownership === "owned" && "border-ss-green/40 dark:border-ss-green/40",
                r.ownership === "context" && "border-dashed bg-transparent dark:bg-transparent"
              )}
            >
              <span className="font-sans text-sm font-semibold tabular-nums text-ss-green">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={cn(BLOCK_TITLE, "font-sans text-text-primary")}>{r.role}</p>
              <p className={cn(BODY, "flex-1 font-sans text-text-secondary")}>{r.duty}</p>
              <span className={cn("self-start rounded-chip px-3 py-1 font-sans text-sm font-semibold", tag.className)}>
                {tag.label}
              </span>
            </li>
          );
        })}
      </ol>
      <Eyebrow className="text-text-muted lg:text-right">{end}</Eyebrow>
    </div>
  );
}

/* ── Process ──────────────────────────────────────────────────────── */
/** 15 days against 8, drawn to scale — this page's answer to UX4G's
    DesignTimeline board. Only two phases have a stated duration, so it's
    one honest bar rather than an invented Gantt. */
export function DeadlineBar({ given, used }: { given: number; used: number }) {
  return (
    <div className="flex flex-col gap-3" role="img" aria-label={`Closed in ${used} of ${given} days`}>
      <div className="relative h-12 overflow-hidden rounded-chip bg-ss-chip">
        <div className="absolute inset-y-0 left-0 flex items-center rounded-chip bg-ss-green px-4" style={{ width: `${(used / given) * 100}%` }}>
          <span className={cn(BODY, "font-sans font-semibold text-paper")}>{used} days used</span>
        </div>
        <span className={cn(BODY, "absolute inset-y-0 right-4 flex items-center font-sans text-text-secondary")}>
          {given - used} days returned
        </span>
      </div>
      <div className="flex justify-between font-sans text-sm text-text-muted">
        <span>Day 0</span>
        <span>Deadline · day {given}</span>
      </div>
    </div>
  );
}

export interface ProcessStep {
  title: string;
  time?: string;
  body: string;
}

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-col gap-2 border-t border-ss-green/25 pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-sans text-sm font-semibold tabular-nums text-ss-green">{String(i + 1).padStart(2, "0")}</span>
            {s.time && <span className="font-sans text-sm font-medium text-text-muted">{s.time}</span>}
          </div>
          <p className={cn(BLOCK_TITLE, "font-sans text-text-primary")}>{s.title}</p>
          <p className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Where it stands ──────────────────────────────────────────────── */
/** UX4G's BigStats, numerals in the brand colour. */
export function BigStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center">
          <p className={cn(STAT_NUM, "font-sans text-ss-green")}>{s.value}</p>
          <p className={cn(PROSE_TEXT, "font-sans text-text-muted")}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

const STATUS_PILL = {
  live: "bg-ss-green text-paper",
  done: "bg-cs-green-surface text-cs-green",
} as const;

/** UX4G's ReleaseStatus list: a status pill beside a BLOCK_TITLE, prose
    under it. */
export function StatusList({ states }: { states: { status: string; tone: keyof typeof STATUS_PILL; title: string; body: string }[] }) {
  return (
    <ol className="flex flex-col gap-8">
      {states.map((st) => (
        <li key={st.title} className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn("rounded-chip px-3 py-1 font-sans text-sm font-semibold", STATUS_PILL[st.tone])}>{st.status}</span>
            <h3 className={cn(BLOCK_TITLE, "font-sans text-text-primary")}>{st.title}</h3>
          </div>
          <p className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>
            <RichText text={st.body} />
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ── Reflections ──────────────────────────────────────────────────── */
/** UX4G's TradeOffs card grid: numeral, BLOCK_TITLE head with the answer
    in the brand colour, body, and a takeaway under a tinted rule. Three-up
    from `lg` on a shared subgrid so the rules line up across the row. */
export function ReflectionCards({ items }: { items: { title: string; body: string; takeaway: string }[] }) {
  return (
    <ol className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
      {items.map((r, i) => (
        <li key={r.title} className={cn(CARD, "flex flex-col gap-5 p-6 md:p-8 lg:row-span-3 lg:grid lg:grid-rows-subgrid")}>
          <div className="flex flex-col gap-3">
            <span className="font-sans text-sm font-semibold tabular-nums text-ss-green">{String(i + 1).padStart(2, "0")}</span>
            <h3 className={cn(BLOCK_TITLE, "font-sans text-text-primary")}>
              <Accented text={r.title} />
            </h3>
          </div>
          <p className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>{r.body}</p>
          <div className="border-t border-ss-green/25 pt-5">
            <p className={cn(BODY, "font-sans font-medium text-text-primary")}>{r.takeaway}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── Closing ──────────────────────────────────────────────────────── */
/** UX4G's ThankYou, in the case study's own brand colour. */
export function ThankYou() {
  return (
    <Shell className="flex flex-col items-center gap-element pb-section text-center">
      <p className="font-sans text-[clamp(2.5rem,7.778vw,7rem)] font-extrabold leading-none tracking-[-1.2px] text-ss-green">
        Thank you
      </p>
      <p className="font-sans text-[clamp(1rem,1.528vw,1.375rem)] font-medium text-text-primary opacity-80">
        Feel free to share your feedback :)
      </p>
    </Shell>
  );
}
