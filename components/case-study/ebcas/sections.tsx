import type { ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Shell, Prose, RichText, ContentBlockView } from "@/components/case-study/ux4g/sections";
import type { ContentBlock } from "@/types";

/* ────────────────────────────────────────────────────────────────────
   Same type scale and spacing rhythm as the UX4G case study (see the
   comment block at the top of ux4g/sections.tsx) — this case study has
   no Figma frame of its own, so rather than inventing a second scale it
   borrows UX4G's clamp() values and `--sp-*` tokens (gap-section,
   pb-section, gap-block, gap-element) directly. What it does NOT borrow
   is UX4G's brand palette (cs-ink, cs-violet, cs-chip, font-caveat) —
   those are that case study's own Figma-sourced identity, so this one
   uses the site's neutral text-primary/secondary/muted and accent
   tokens instead. Shell, Prose, RichText and ContentBlockView are
   imported directly since they're already palette-neutral. ─────────── */

const DISPLAY_XL = "text-[clamp(1.75rem,3.333vw,3rem)] font-semibold leading-[1.15] tracking-[-1.2px]";
const TITLE_LEAD = "text-[clamp(1.125rem,1.528vw,1.375rem)] leading-[1.5]";
const DISPLAY = "text-[clamp(1.5rem,2.361vw,2.125rem)] font-semibold";
const LEADING_AUTO = "leading-[1.2]";
const PART_TITLE = "text-[clamp(2rem,3.889vw,3.5rem)] font-bold leading-[1.1]";
const LEAD = "text-[clamp(1rem,1.389vw,1.25rem)] leading-[1.5]";
const STAT_NUM = "text-[clamp(2rem,4.167vw,3.75rem)] font-bold leading-[1.15]";
const PROSE_TEXT = "text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.6]";
const CHIP = "text-[clamp(0.875rem,1.111vw,1rem)] font-medium";

export { Shell };

export function Hero({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle: ReactNode;
}) {
  return (
    <Shell className="pb-section">
      <div className="flex flex-col gap-4 pt-4">
        <h1 className={cn(DISPLAY_XL, "font-sans text-text-primary")}>{heading}</h1>
        <p className={cn(TITLE_LEAD, "font-sans text-text-secondary")}>{subtitle}</p>
      </div>
    </Shell>
  );
}

/** Role / team / modules — the same chip-row language as UX4G's
    role/timeline/platform rows (ChipGroup), just off the site's neutral
    tokens instead of the cs-chip/cs-ink brand pair. */
export function ChipGroup({ title, chips }: { title: string; chips: string[] }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h2 className={cn(DISPLAY, LEADING_AUTO, "font-sans text-text-primary")}>{title}</h2>
      <ul className="flex flex-wrap items-center gap-3 md:gap-4">
        {chips.map((chip) => (
          <li
            key={chip}
            className={cn(
              CHIP,
              "flex items-center gap-2 rounded-chip border border-hairline/[0.08] bg-surface px-4 py-3 font-sans leading-[1.3077] text-text-primary shadow-[0px_2px_5px_rgba(0,0,0,0.1)] dark:shadow-none md:px-4 md:py-3"
            )}
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface Stat {
  value: string;
  label: string;
}

/** Same numeral scale and layout as UX4G's BigStats (98→60px numeral over
    a 32→18px caption, row on `sm` and up), off `accent`/`text-muted`
    instead of `cs-violet`/`cs-body`. */
export function BigStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center">
          <p className={cn(STAT_NUM, "font-sans text-accent")}>{s.value}</p>
          <p className={cn(PROSE_TEXT, "font-sans text-text-muted")}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/** A real screenshot slot the module owner hasn't dropped in yet. Same
    frame language as UX4G's `Figure` (rounded-card, border-hairline,
    bg-surface) so a placeholder sits in the page the same way a real
    plate eventually will — dashed rather than solid is the one
    deliberate difference, so "pending" reads at a glance. */
export function ImagePlaceholder({ label, hint }: { label: string; hint: string }) {
  return (
    <figure>
      <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-card border border-dashed border-hairline/[0.35] bg-surface px-8 text-center">
        <ImageIcon className="h-6 w-6 text-text-muted" strokeWidth={1.5} />
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">{label}</span>
      </div>
      <figcaption className={cn(PROSE_TEXT, "mt-3 font-sans text-text-muted")}>{hint}</figcaption>
    </figure>
  );
}

/** Chapter opener for one module — same PART_TITLE scale and two-column
    composition as UX4G's PartOpener (index label beside the title, plate
    on the other side), with an ImagePlaceholder standing in for the real
    kit shot PartOpener would otherwise take as a prop. */
export function ModuleOpener({
  index,
  title,
  subtitle,
  image,
}: {
  index: string;
  title: string;
  subtitle: string;
  image: { label: string; hint: string };
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-6 overflow-hidden md:grid-cols-2 md:gap-10">
      <div className="flex flex-col justify-center gap-4">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-accent">{index}</p>
        <p className={cn(PART_TITLE, "font-sans text-text-primary")}>{title}</p>
        <p className={cn(LEAD, "font-sans text-text-secondary")}>{subtitle}</p>
      </div>
      <ImagePlaceholder label={image.label} hint={image.hint} />
    </div>
  );
}

/** One module's Problem / Solution / Outcome, each rendered through
    UX4G's own `ContentBlockView` (so the heading size, prose measure and
    bullet treatment are byte-identical) and spaced a full `gap-section`
    apart — the same rhythm UX4G uses between its "Introducing – …"
    blocks within one Part, not the tighter `gap-block`. */
export function Module({
  index,
  title,
  subtitle,
  stats,
  problem,
  solution,
  outcome,
  outcomeNote,
  image,
}: {
  index: string;
  title: string;
  subtitle: string;
  stats: Stat[];
  problem: ContentBlock;
  solution: ContentBlock;
  outcome: ContentBlock;
  outcomeNote?: string;
  image: { label: string; hint: string };
}) {
  return (
    <Shell className="flex flex-col gap-section pb-section">
      <ModuleOpener index={index} title={title} subtitle={subtitle} image={image} />
      <BigStats stats={stats} />
      <ContentBlockView block={{ ...problem, noPrefix: true }} />
      <ContentBlockView block={{ ...solution, noPrefix: true }} />
      <ContentBlockView block={{ ...outcome, noPrefix: true }} />
      {outcomeNote && (
        <p
          className={cn(
            PROSE_TEXT,
            "rounded-card border border-dashed border-hairline/[0.2] bg-surface px-6 py-5 font-sans text-text-muted"
          )}
        >
          <RichText text={outcomeNote} />
        </p>
      )}
    </Shell>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className={cn(DISPLAY, LEADING_AUTO, "font-sans text-text-primary")}>{children}</h2>;
}

export { Prose };
