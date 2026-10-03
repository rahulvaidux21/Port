import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Shell, RichText } from "@/components/case-study/ux4g/sections";
import type { MediaItem } from "@/types";

/* ────────────────────────────────────────────────────────────────────
   Survey Setu arrived as a written, eight-section case study (the source
   brief), not a Figma frame — so like eBCAS it borrows UX4G's clamp()
   type scale and `--sp-*` rhythm verbatim and stays on the site's neutral
   text/surface/accent tokens. Hero, ChipGroup, BigStats, SectionHeading
   and Prose come from ebcas/sections.tsx unchanged; what lives here are
   the shapes this story needs that eBCAS didn't: a numbered chapter
   opener, the architecture→UX translation matrix, the five-role chain of
   custody, and the 15→8 day process strip. ─────────────────────────── */

const DISPLAY = "text-[clamp(1.5rem,2.361vw,2.125rem)] font-semibold leading-[1.2]";
const LEAD = "text-[clamp(1rem,1.389vw,1.25rem)] leading-[1.5]";
const PROSE_TEXT = "text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.6]";
const CARD_TITLE = "text-[clamp(1.0625rem,1.389vw,1.25rem)] font-semibold leading-[1.3]";
const LABEL = "font-sans text-xs font-semibold uppercase tracking-[0.08em]";
const CARD = "rounded-card border border-hairline/[0.08] bg-surface dark:border-hairline/[0.12]";

/** Numbered chapter opener — the accent index label eBCAS uses for its
    modules, over the same DISPLAY heading as SectionHeading, with an
    optional lead paragraph. Every chapter below starts with one. */
export function Chapter({
  index,
  title,
  lead,
  children,
  className,
}: {
  index: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Shell className={cn("flex flex-col gap-block pb-section", className)}>
      <div className="flex flex-col gap-4">
        <p className={cn(LABEL, "text-accent")}>{index}</p>
        <h2 className={cn(DISPLAY, "font-sans text-text-primary")}>{title}</h2>
        {lead && <p className={cn(LEAD, "font-sans text-text-secondary")}>{lead}</p>}
      </div>
      {children}
    </Shell>
  );
}

/** A real screenshot in the same pale rounded frame UX4G's `Figure` uses.
    `contain` caps portrait phone shots so a 271px-wide export doesn't get
    upscaled into a blurry full-column plate. */
export function Shot({
  src,
  alt,
  width,
  height,
  caption,
  className,
  priority,
}: MediaItem & { className?: string; priority?: boolean }) {
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div className="overflow-hidden rounded-card border border-hairline/[0.10] bg-white dark:border-hairline/[0.14] dark:bg-surface">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 1180px) 1120px, 100vw"
          className="h-auto w-full"
        />
      </div>
      {caption && <figcaption className={cn(PROSE_TEXT, "font-sans text-text-muted")}>{caption}</figcaption>}
    </figure>
  );
}

/** Two portrait phone screens side by side on a tinted plate. The exports
    have different aspect ratios (390×844 vs 271×830), so they're matched
    on height rather than width — equal widths left one a third taller. */
export function PhonePair({ shots, caption }: { shots: MediaItem[]; caption?: string }) {
  return (
    <figure className="flex flex-col gap-3">
      <div className={cn(CARD, "flex items-start justify-center gap-4 px-4 py-8 sm:gap-8 md:py-12")}>
        {shots.map((s) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={s.width}
            height={s.height}
            sizes="(min-width: 768px) 280px, 45vw"
            className="h-[clamp(300px,52vw,560px)] w-auto max-w-[46%] rounded-[18px] object-contain border border-hairline/[0.10] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          />
        ))}
      </div>
      {caption && <figcaption className={cn(PROSE_TEXT, "font-sans text-text-muted")}>{caption}</figcaption>}
    </figure>
  );
}

/** Pull-quote with no card — Instrument Serif italic, the site's accent
    face, hung off a single accent rule. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-accent pl-6 md:pl-8">
      <p className="font-instrument-serif text-[clamp(1.5rem,2.5vw,2.25rem)] italic leading-[1.25] text-text-primary">
        {children}
      </p>
    </blockquote>
  );
}

/** The takeaway line under a chapter — a quiet bordered note, the same
    shape as eBCAS's outcomeNote but solid-bordered since it's a
    conclusion, not a caveat. */
export function Takeaway({ label = "Takeaway", children }: { label?: string; children: ReactNode }) {
  return (
    <div className={cn(CARD, "flex flex-col gap-2 px-6 py-5 md:px-8 md:py-6")}>
      <p className={cn(LABEL, "text-accent")}>{label}</p>
      <p className={cn(LEAD, "font-sans text-text-primary")}>{children}</p>
    </div>
  );
}

/** Day Zero — the alignment call, as the literal question-and-answer
    exchange it was. */
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

export interface Translation {
  clause: string;
  spec: string;
  consequence: string;
}

/** Architecture clause → human consequence. A real table from `md` up
    (it's a genuine two-column comparison, and reads best as one); below
    that each row stacks into a card with the arrow turned downward. */
export function TranslationMatrix({ rows }: { rows: Translation[] }) {
  return (
    <div>
      <table className="hidden w-full border-collapse text-left md:table">
        <thead>
          <tr className="border-b border-hairline/[0.16]">
            <th className={cn(LABEL, "w-[42%] pb-4 pr-8 text-text-muted")}>In the architecture doc</th>
            <th className={cn(LABEL, "pb-4 text-text-muted")}>What it means at the doorstep</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.clause} className="border-b border-hairline/[0.08] align-top">
              <td className="py-6 pr-8">
                <p className={cn(CARD_TITLE, "font-sans text-text-primary")}>{r.clause}</p>
                <p className={cn(PROSE_TEXT, "mt-1 font-sans text-text-muted")}>{r.spec}</p>
              </td>
              <td className="py-6">
                <div className="flex gap-4">
                  <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
                  <p className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>
                    <RichText text={r.consequence} />
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="flex flex-col gap-4 md:hidden">
        {rows.map((r) => (
          <li key={r.clause} className={cn(CARD, "flex flex-col gap-3 p-5")}>
            <div>
              <p className={cn(CARD_TITLE, "font-sans text-text-primary")}>{r.clause}</p>
              <p className={cn(PROSE_TEXT, "mt-1 font-sans text-text-muted")}>{r.spec}</p>
            </div>
            <ArrowDown className="h-4 w-4 text-accent" strokeWidth={2} aria-hidden="true" />
            <p className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>
              <RichText text={r.consequence} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface CustodyRole {
  role: string;
  duty: string;
  ownership: "owned" | "collaborated" | "context";
}

const OWNERSHIP: Record<CustodyRole["ownership"], { label: string; className: string }> = {
  owned: { label: "I designed", className: "bg-accent text-accent-foreground" },
  collaborated: { label: "With a second designer", className: "border border-hairline/[0.24] text-text-primary" },
  context: { label: "Never touches the app", className: "border border-dashed border-hairline/[0.32] text-text-muted" },
};

/** Doorstep → national policy, as one ordered chain. Horizontal from
    `lg` (five equal columns joined by arrows), a vertical list below. */
export function CustodyChain({ roles, start, end }: { roles: CustodyRole[]; start: string; end: string }) {
  return (
    <div className="flex flex-col gap-4">
      <p className={cn(LABEL, "text-text-muted")}>{start}</p>
      <ol className="grid grid-cols-1 gap-3 lg:grid-cols-5 lg:gap-3">
        {roles.map((r, i) => {
          const tag = OWNERSHIP[r.ownership];
          return (
            <li
              key={r.role}
              className={cn(
                CARD,
                "relative flex flex-col gap-3 p-5",
                r.ownership === "owned" && "border-accent/40 dark:border-accent/50",
                r.ownership === "context" && "border-dashed bg-transparent dark:bg-transparent"
              )}
            >
              <span className="font-sans text-sm font-semibold tabular-nums text-text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={cn(CARD_TITLE, "font-sans text-text-primary")}>{r.role}</p>
              <p className="flex-1 font-sans text-[15px] leading-[1.55] text-text-secondary">{r.duty}</p>
              <span className={cn("self-start rounded-full px-2.5 py-1 font-sans text-xs font-medium", tag.className)}>
                {tag.label}
              </span>
            </li>
          );
        })}
      </ol>
      <p className={cn(LABEL, "text-text-muted lg:text-right")}>{end}</p>
    </div>
  );
}

/** 15 days against 8, drawn to scale — the one number this case study
    leads with, shown rather than stated. */
export function DeadlineBar({ given, used }: { given: number; used: number }) {
  const pct = (used / given) * 100;
  return (
    <div className="flex flex-col gap-3" role="img" aria-label={`Closed in ${used} of ${given} days`}>
      <div className="relative h-10 overflow-hidden rounded-chip border border-hairline/[0.12] bg-surface">
        <div className="absolute inset-y-0 left-0 flex items-center rounded-chip bg-accent px-4" style={{ width: `${pct}%` }}>
          <span className="font-sans text-sm font-semibold text-accent-foreground">{used} days used</span>
        </div>
        <span className="absolute inset-y-0 right-4 flex items-center font-sans text-sm text-text-muted">
          {given - used} days returned
        </span>
      </div>
      <div className="flex justify-between font-sans text-xs text-text-muted">
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
        <li key={s.title} className="flex flex-col gap-2 border-t border-hairline/[0.16] pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-sans text-sm font-semibold tabular-nums text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            {s.time && <span className="font-sans text-xs font-medium text-text-muted">{s.time}</span>}
          </div>
          <p className={cn(CARD_TITLE, "font-sans text-text-primary")}>{s.title}</p>
          <p className="font-sans text-[15px] leading-[1.6] text-text-secondary">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** One design decision: the call, why it mattered, optional chips. */
export function DecisionGrid({ items }: { items: { title: string; body: string; chips?: string[] }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((d) => (
        <div key={d.title} className={cn(CARD, "flex flex-col gap-3 p-6 md:p-8")}>
          <p className={cn(CARD_TITLE, "font-sans text-text-primary")}>{d.title}</p>
          <p className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>
            <RichText text={d.body} />
          </p>
          {d.chips && (
            <ul className="mt-1 flex flex-wrap gap-2">
              {d.chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-hairline/[0.16] px-2.5 py-1 font-sans text-xs font-medium text-text-primary"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/** Numbered reflection list — plain, no cards, so it reads as candour
    rather than as another feature grid. */
export function Reflections({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="flex flex-col divide-y divide-hairline/[0.08] border-y border-hairline/[0.08]">
      {items.map((r, i) => (
        <li key={r.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4 py-6 md:grid-cols-[3rem_minmax(0,1fr)]">
          <span className="font-sans text-sm font-semibold tabular-nums text-text-muted">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-1">
            <p className={cn(CARD_TITLE, "font-sans text-text-primary")}>{r.title}</p>
            <p className={cn(PROSE_TEXT, "font-sans text-text-secondary")}>{r.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
