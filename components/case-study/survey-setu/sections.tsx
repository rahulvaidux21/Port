import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import { ArrowRight, ArrowUpRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Shell } from "@/components/case-study/ux4g/sections";
import { Wordmark } from "./Wordmark";
import { Browser, Phone, type Shot } from "./frames";
import { CountUp, DayBar, Parallax, Reveal, ScrubText } from "./motion";
import {
  CompareSlider,
  PinnedPhone,
  RoleSwitcher,
  WireframeTrack,
  type Pinned,
} from "./interactive";

export { Browser, Phone, type Shot };

/* ────────────────────────────────────────────────────────────────────
   Survey Setu — an editorial case-study layout.

   The grammar, section by section, follows a long-scroll product story:
   warm-grey "paper" bands and near-black "ink" bands; a two-tone section
   label with the wordmark at its right over a dashed rule; headlines that
   mix ink words with muted ones (mark ink words with **double stars**);
   an outlined oval caption pill; dashed-grid number cells; giant one-word
   screen showcases with the device overlapping the word.

   Every colour reads from the --sv-* ramp in globals.css. Phone and
   browser frames wrap real exports from the MoTA Survey App Figma file
   (public/case-studies/survey-setu) — hi-fi screens, plus the
   low-fidelity drafts from its Playground page (wf-*.jpg). The brand mark
   is the सर्वे सेतु wordmark only (./Wordmark). Photography is still
   pending — `PhotoSlot` holds each slot at its final aspect ratio.
   ──────────────────────────────────────────────────────────────────── */

// The product's own typeface, for the Typography & Colours specimen only.
const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export type Tone = "paper" | "ink";

/* ── Type ramp ─────────────────────────────────────────────────────── */
const DISPLAY = "text-[clamp(2rem,4.6vw,3.75rem)] font-medium leading-[1.1] tracking-[-0.025em]";
const GIANT = "font-medium uppercase leading-[0.82] tracking-[-0.045em]";
const SMALL = "text-[13px] leading-[1.55] md:text-sm";
const DASHED = "border-dashed border-hairline/15";

const DOTS: CSSProperties = {
  backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
  backgroundSize: "20px 20px",
};
const GRID_LINES: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgb(255 255 255 / 0.055) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.055) 1px, transparent 1px)",
  backgroundSize: "112px 112px",
};

/* ── Primitives ────────────────────────────────────────────────────── */

/** A full-bleed band. Paper bands follow the theme; ink bands stay dark. */
export function Band({
  tone = "paper",
  className,
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        tone === "ink" ? "bg-sv-ink-band text-white" : "bg-sv-band text-text-primary",
        className
      )}
    >
      {children}
    </section>
  );
}

/** Splits "plain **ink** plain" into muted and full-strength runs. A
    `tail` (the script bubble) is glued to the last word so it never wraps
    onto a line of its own. Muted runs hold at least 4.5:1 on their band. */
export function Mixed({
  text,
  tone = "paper",
  tail,
}: {
  text: string;
  tone?: Tone;
  tail?: ReactNode;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const ink = part.startsWith("**");
        const body = ink ? part.slice(2, -2) : part;
        const cls = ink
          ? tone === "ink"
            ? "text-white"
            : "text-text-primary"
          : tone === "ink"
            ? "text-white/60"
            : "text-sv-mute";
        if (tail && i === parts.length - 1) {
          const cut = body.trimEnd().lastIndexOf(" ") + 1;
          return (
            <span key={i} className={cls}>
              {body.slice(0, cut)}
              <span className="whitespace-nowrap">
                {body.slice(cut).trimEnd()}
                {tail}
              </span>
            </span>
          );
        }
        return (
          <span key={i} className={cls}>
            {body}
          </span>
        );
      })}
    </>
  );
}

/** "THE CONTEXT" — first word muted, rest ink, wordmark at the right,
    dashed rule below. */
export function SectionLabel({
  muted,
  strong,
  tone = "paper",
}: {
  muted: string;
  strong: string;
  tone?: Tone;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-dashed pb-3",
        tone === "ink" ? "border-white/15" : "border-hairline/15"
      )}
    >
      <p className={cn(SMALL, "uppercase tracking-[0.04em]")}>
        <span className={tone === "ink" ? "text-white/60" : "text-sv-mute"}>{muted} </span>
        <span className={tone === "ink" ? "text-white" : "text-text-primary"}>{strong}</span>
      </p>
      <Wordmark
        className={cn("h-4 w-auto", tone === "ink" ? "text-white/40" : "text-sv-mute")}
        title=""
      />
    </div>
  );
}

/** A script glyph in a disc with a fading tail — the inline marker that
    ends most headlines, one of the 21 scripts the app speaks. The
    Accessibility section says so in words. */
export function ScriptBubble({
  glyph,
  label,
  tone = "paper",
}: {
  glyph: string;
  label: string;
  tone?: Tone;
}) {
  return (
    <span
      className="relative ml-3 inline-flex translate-y-[-0.12em] items-center align-middle"
      aria-label={label}
      role="img"
      title={label}
    >
      <span
        aria-hidden
        className={cn(
          "absolute -left-5 h-[0.55em] w-10 rounded-full",
          tone === "ink"
            ? "bg-gradient-to-r from-transparent to-white/15"
            : "bg-gradient-to-r from-transparent to-hairline/10"
        )}
      />
      <span
        aria-hidden
        className={cn(
          "relative grid h-[0.95em] w-[0.95em] place-items-center rounded-full text-[0.42em] font-semibold leading-none shadow-[0_4px_14px_rgba(0,0,0,0.12)]",
          tone === "ink"
            ? "bg-white/10 text-white ring-1 ring-white/15"
            : "bg-sv-card text-sv-green ring-1 ring-hairline/10"
        )}
      >
        {glyph}
      </span>
    </span>
  );
}

/** The outlined oval caption that sits opposite every headline. */
export function CaptionPill({
  children,
  tone = "paper",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        SMALL,
        "max-w-[360px] rounded-[999px] border px-9 py-6 text-center md:text-[15px]",
        tone === "ink" ? "border-white/15 text-white/75" : "border-hairline/10 text-text-secondary",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Headline on one side, caption pill offset to the other — the opening
    beat of most sections. */
export function HeadlineBlock({
  headline,
  bubble,
  caption,
  side = "left",
  tone = "paper",
}: {
  headline: string;
  bubble?: { glyph: string; label: string };
  caption?: ReactNode;
  side?: "left" | "right";
  tone?: Tone;
}) {
  const head = (
    <h2 className={cn(DISPLAY, "max-w-[680px]")}>
      <ScrubText
        text={headline}
        tone={tone}
        tail={bubble && <ScriptBubble {...bubble} tone={tone} />}
      />
    </h2>
  );
  const pill = caption ? (
    <Reveal delay={0.15} y={16} scale={0.96}>
      <CaptionPill tone={tone}>{caption}</CaptionPill>
    </Reveal>
  ) : null;
  return side === "left" ? (
    <div className="flex flex-col gap-10 md:gap-6">
      <div className="md:pl-[6%]">{head}</div>
      {pill && <div className="flex md:justify-end md:pr-[6%]">{pill}</div>}
    </div>
  ) : (
    <div className="flex flex-col gap-10 md:gap-16">
      <div className="flex md:justify-end">
        <div className="md:w-1/2">{head}</div>
      </div>
      {pill && <div className="flex md:pl-[6%]">{pill}</div>}
    </div>
  );
}

/** Holds a pending photograph at its final aspect ratio. */
export function PhotoSlot({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "placeholder-slot relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-card bg-sv-card p-6 text-center",
        className
      )}
    >
      <ImageIcon className="h-6 w-6 text-sv-mute" strokeWidth={1.5} />
      <p className="text-sm font-medium text-text-primary">{label}</p>
      <p className="max-w-[300px] text-xs leading-relaxed text-text-muted">{hint}</p>
      {children}
    </div>
  );
}

/** A white card that frames a phone, as in the paired image rows. */
export function PhoneCard({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-end justify-center overflow-hidden rounded-card bg-sv-card px-6 pt-10",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-hairline/[0.08]"
        style={DOTS}
      />
      <Reveal y={90} className="relative -mb-[18%] w-[min(64%,280px)]">
        <Phone src={src} alt={alt} className="rotate-[-4deg]" />
      </Reveal>
    </div>
  );
}

/** The wordmark on a solid tile — the app-icon stand-in. */
function MarkTile({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "green" | "white";
}) {
  return (
    <span
      className={cn(
        "grid place-items-center rounded-[12px]",
        tone === "ink" && "bg-[#0c0c0d] text-white",
        tone === "green" && "bg-sv-forest text-white",
        tone === "white" && "bg-white text-sv-forest ring-1 ring-black/5",
        className
      )}
    >
      <Wordmark className="w-[74%]" title="" />
    </span>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────── */
export function Hero({
  leftLabel,
  rightLabel,
  back,
  front,
  phone,
}: {
  leftLabel: string;
  rightLabel: string;
  back: string;
  front: string;
  phone: Shot;
}) {
  return (
    <Band className="pt-6 md:pt-8">
      <Shell>
        <div className="flex items-center justify-between gap-4 text-sm font-medium md:text-base">
          <span>{leftLabel}</span>
          <span className="text-right">{rightLabel}</span>
        </div>
        <div className="relative mt-6 md:mt-10">
          {/* Intro motion is CSS (globals.css, .sv-intro-*), so it plays at
              first paint with no flash and needs no JavaScript. */}
          <p
            aria-hidden
            className={cn(
              GIANT,
              "sv-intro-l whitespace-nowrap text-center text-[clamp(2.6rem,11.6vw,9.4rem)] text-sv-mute/45"
            )}
          >
            {back}
          </p>
          <div className="sv-intro-up relative z-10 mx-auto -mt-[clamp(1.4rem,6vw,4.75rem)] h-[clamp(300px,52vw,560px)] w-[clamp(200px,29vw,330px)] overflow-hidden">
            <Phone src={phone.src} alt={phone.alt} priority sizes="330px" />
          </div>
          {/* Script discs flanking the phone — two of the 21 languages,
              drifting at different speeds as the page scrolls. */}
          <Parallax
            as="span"
            speed={-70}
            className="absolute left-[8%] top-[42%] z-0 hidden h-[clamp(96px,13vw,168px)] w-[clamp(96px,13vw,168px)] place-items-center rounded-full bg-sv-card shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] sm:grid md:left-[16%]"
          >
            <span
              aria-hidden
              className="sv-intro-pop grid h-[78%] w-[78%] place-items-center rounded-full bg-sv-forest text-[clamp(2rem,4.4vw,3.6rem)] font-semibold text-white"
            >
              हिं
            </span>
          </Parallax>
          <Parallax
            as="span"
            speed={-130}
            className="absolute right-[8%] top-[64%] z-20 hidden h-[clamp(88px,12vw,156px)] w-[clamp(88px,12vw,156px)] place-items-center rounded-full bg-sv-card shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] sm:grid md:right-[16%]"
          >
            <span
              aria-hidden
              className="sv-intro-pop grid h-[78%] w-[78%] place-items-center rounded-full bg-[#0c0c0d] text-[clamp(1.8rem,4vw,3.3rem)] font-semibold text-white"
              style={{ animationDelay: "0.85s" }}
            >
              ଓ
            </span>
          </Parallax>
        </div>
      </Shell>
      <p
        className={cn(
          GIANT,
          "sv-intro-r relative z-20 -mt-[clamp(1.5rem,5vw,4rem)] whitespace-nowrap pb-[0.06em] text-center text-[clamp(3.6rem,17vw,13.5rem)]"
        )}
      >
        {front}
      </p>
    </Band>
  );
}

/* ── Overview (the TL;DR) ──────────────────────────────────────────── */
export function ProjectTitle({
  quote,
  about,
  meta,
  features,
}: {
  quote: string;
  about: string;
  meta: { label: string; value: string }[];
  features: string[];
}) {
  return (
    <Band className="py-section">
      <Shell className="flex flex-col gap-block">
        <SectionLabel muted="Project" strong="Overview" />
        <h1 className="text-[clamp(2.1rem,5.2vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.035em]">
          <ScrubText text={quote} />
        </h1>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
          <dl className="order-2 grid grid-cols-1 content-start gap-x-6 gap-y-5 sm:grid-cols-2 md:order-1 md:max-w-[480px]">
            {meta.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.06} y={16} className="flex flex-col gap-1">
                <dt className="text-xs uppercase tracking-[0.04em] text-sv-mute">{m.label}</dt>
                <dd className="text-sm font-medium leading-snug text-text-primary">{m.value}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal className="order-1 flex flex-col gap-4 md:order-2">
            <p className="text-sm font-medium">About the project</p>
            <p className="text-[clamp(1.1rem,1.8vw,1.45rem)] leading-[1.5] tracking-[-0.01em]">
              <Mixed text={about} />
            </p>
          </Reveal>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium">Key product features</p>
          <ul className="flex flex-wrap gap-y-2">
            {features.map((f, i) => (
              <Reveal
                as="li"
                key={f}
                delay={i * 0.05}
                y={10}
                x={-8}
                className={cn(
                  "-ml-px rounded-full border px-5 py-2 text-[13px] md:text-sm",
                  i === 0
                    ? "z-10 border-transparent bg-text-primary text-paper"
                    : "border-hairline/10 bg-sv-card/60 text-text-secondary"
                )}
              >
                {f}
              </Reveal>
            ))}
          </ul>
        </div>
      </Shell>
    </Band>
  );
}

/* ── Branding style — the सर्वे सेतु wordmark ─────────────────────── */
export function BrandingStyle({ note }: { note: string }) {
  return (
    <Band className="pb-section">
      <Shell className="flex flex-col gap-block">
        <div className="flex flex-col gap-4">
          <SectionLabel muted="Branding" strong="Style" />
          <p className={cn(SMALL, "max-w-[560px] text-text-secondary")}>{note}</p>
        </div>
        <div className="flex flex-col gap-3">
          <Reveal y={40} className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
            <div className="flex flex-wrap items-center justify-center gap-6 rounded-card bg-sv-card px-6 py-12 md:justify-between md:px-12 md:py-20">
              <div className="flex items-center gap-4 md:gap-6">
                <MarkTile
                  tone="green"
                  className="h-24 w-24 rounded-[22px] md:h-32 md:w-32 md:rounded-[28px]"
                />
                <MarkTile
                  tone="white"
                  className="h-24 w-24 rounded-[22px] md:h-32 md:w-32 md:rounded-[28px]"
                />
              </div>
              <div className="flex items-end gap-3">
                <MarkTile tone="ink" className="h-14 w-14 md:h-[72px] md:w-[72px]" />
                <MarkTile tone="green" className="h-12 w-12 md:h-14 md:w-14" />
                <MarkTile tone="ink" className="h-10 w-10 md:h-12 md:w-12" />
                <MarkTile tone="green" className="h-8 w-8 md:h-9 md:w-9" />
              </div>
            </div>
            <div className="flex items-center justify-center rounded-card bg-sv-card p-8">
              <div className="flex gap-3 rounded-[20px] bg-sv-band p-3">
                <MarkTile className="h-16 w-16 md:h-20 md:w-20" />
                <span
                  className={cn(
                    notoSans.className,
                    "grid h-16 w-16 place-items-center rounded-[12px] bg-sv-card text-2xl text-sv-mute md:h-20 md:w-20"
                  )}
                >
                  Aa
                </span>
                <span
                  className={cn(
                    notoSans.className,
                    "grid h-16 w-16 place-items-center rounded-[12px] bg-sv-card text-2xl text-sv-mute md:h-20 md:w-20"
                  )}
                >
                  अ
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal y={40} delay={0.1} className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_2fr]">
            <PhotoSlot
              className="aspect-[4/5] md:aspect-auto"
              label="Field photograph"
              hint="Pending — a surveyor in a tribal village, phone in hand, with the wordmark set large behind them."
            />
            {/* The lockup plate stays white in both themes — the wordmark is drawn for it. */}
            <div className="flex min-h-[260px] flex-col items-center justify-center gap-6 rounded-card bg-white px-6 py-14 md:flex-row md:gap-10 md:py-24">
              <Wordmark
                className="h-auto w-[200px] text-[#057724] md:w-[260px]"
                title="सर्वे सेतु — Survey Setu wordmark"
              />
              <div className="flex flex-col items-center gap-1 md:items-start">
                <p className="text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-none tracking-[-0.03em] text-[#222223]">
                  Survey Setu
                </p>
                <p className="text-sm text-[#595959]">
                  Ministry of Tribal Affairs · Government of India
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Shell>
    </Band>
  );
}

/* ── Dashed number grid ────────────────────────────────────────────── */
export type Cell = { title?: string; body: string; art?: ReactNode } | "logo" | null;

/** A dashed grid of numbered cells. `null` cells are deliberate gaps (the
    checkerboard in The Context); "logo" places the wordmark. Numbers count
    only the filled cells. Gaps collapse below md. */
export function NumberGrid({ cells, cols = 4 }: { cells: Cell[]; cols?: 3 | 4 }) {
  let n = 0;
  return (
    <div
      className={cn(
        "grid grid-cols-1 border-l border-t sm:grid-cols-2",
        DASHED,
        cols === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
      )}
    >
      {cells.map((cell, i) => {
        const base = cn("border-b border-r", DASHED);
        if (cell === null)
          return <div key={i} aria-hidden className={cn(base, "hidden md:block")} />;
        if (cell === "logo")
          return (
            <div
              key={i}
              aria-hidden
              className={cn(base, "hidden min-h-[220px] place-items-center md:grid")}
            >
              <MarkTile tone="green" className="h-24 w-24 rounded-[22px]" />
            </div>
          );
        n += 1;
        // The cell's dashed border stays put; only its content rises in,
        // staggered in reading order so a checkerboard fills diagonally.
        return (
          <div
            key={i}
            className={cn(base, "flex min-h-[200px] flex-col p-5 md:min-h-[260px] md:p-6")}
          >
            <Reveal
              delay={(i % 8) * 0.07}
              y={24}
              className="flex flex-1 flex-col justify-between gap-10"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden
                  className="text-[clamp(2.5rem,4vw,3.25rem)] font-light leading-none text-sv-mute/50"
                >
                  {String(n).padStart(2, "0")}
                </span>
                {cell.art}
              </div>
              <div className="flex flex-col gap-1.5">
                {cell.title && (
                  <p className="text-lg font-medium leading-tight tracking-[-0.01em] md:text-xl">
                    {cell.title}
                  </p>
                )}
                <p className={cn(SMALL, "max-w-[280px]")}>
                  <Mixed text={cell.body} />
                </p>
              </div>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}

/** Section scaffold for the paper bands: label → headline → body. */
export function PaperSection({
  label,
  headline,
  bubble,
  caption,
  side,
  children,
  className,
  id,
}: {
  label: [string, string];
  headline: string;
  bubble?: { glyph: string; label: string };
  caption?: ReactNode;
  side?: "left" | "right";
  children?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <Band id={id} className={cn("pb-section", className)}>
      <Shell className="flex flex-col gap-section">
        <div className="flex flex-col gap-block">
          <SectionLabel muted={label[0]} strong={label[1]} />
          <HeadlineBlock headline={headline} bubble={bubble} caption={caption} side={side} />
        </div>
      </Shell>
      {children && <Shell className="mt-section flex flex-col gap-3">{children}</Shell>}
    </Band>
  );
}

/* ── The problem + design goals (ink) ──────────────────────────────── */
const GOAL_FILLS = [
  "bg-sv-sun text-[#0c0c0d]",
  "bg-sv-saffron text-[#0c0c0d]",
  "bg-sv-navy text-white",
  "bg-[#057724] text-white",
];

function GoalDoodle({ variant }: { variant: number }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 160"
      className="pointer-events-none absolute bottom-0 right-0 h-[62%] w-auto opacity-80"
    >
      {variant === 0 && (
        <>
          <path {...common} d="M30 160 C 40 110, 20 90, 40 70 S 120 60, 150 40 S 200 30, 210 20" />
          <path {...common} d="M150 70 l8 16 18 3 -13 12 3 18 -16 -9 -16 9 3 -18 -13 -12 18 -3 z" />
          <circle {...common} cx="110" cy="28" r="6" />
        </>
      )}
      {variant === 1 && (
        <>
          <rect
            {...common}
            x="40"
            y="70"
            width="38"
            height="38"
            rx="8"
            transform="rotate(-30 59 89)"
          />
          <rect
            {...common}
            x="130"
            y="20"
            width="38"
            height="38"
            rx="8"
            transform="rotate(-30 149 39)"
          />
          <path {...common} d="M70 82 L 140 42" />
          <path {...common} d="M10 160 C 60 150, 120 120, 210 130" />
        </>
      )}
      {variant === 2 && (
        <>
          <path {...common} d="M20 170 C 30 120, 10 70, 60 60 S 160 60, 210 40" />
          <rect
            {...common}
            x="100"
            y="88"
            width="56"
            height="52"
            rx="10"
            transform="rotate(4 128 114)"
          />
          <path {...common} d="M150 22 l4 9 9 2 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -2 z" />
        </>
      )}
      {variant === 3 && (
        <>
          <circle {...common} cx="160" cy="150" r="90" />
          <circle {...common} cx="160" cy="150" r="58" />
          <circle {...common} cx="120" cy="34" r="12" />
          <circle {...common} cx="120" cy="34" r="4" />
        </>
      )}
    </svg>
  );
}

export function DesignGoals({
  label,
  headline,
  caption,
  hmw,
  story,
  goals,
}: {
  label: [string, string];
  headline: string;
  caption: ReactNode;
  hmw: { who: string; text: string }[];
  /** Optional set piece between the questions and the goals. */
  story?: ReactNode;
  goals: { title: string; icon: ReactNode }[];
}) {
  return (
    <Band tone="ink" className="py-section">
      <Shell className="flex flex-col gap-section">
        <div className="flex flex-col gap-block">
          <SectionLabel muted={label[0]} strong={label[1]} tone="ink" />
          <HeadlineBlock
            headline={headline}
            caption={caption}
            side="right"
            tone="ink"
            bubble={{ glyph: "বা", label: "Bengali script" }}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {hmw.map((h, i) => (
            <Reveal
              key={h.who}
              delay={i * 0.12}
              y={36}
              className="flex flex-col gap-4 rounded-card border border-white/15 p-6 md:p-8"
            >
              <p className="text-xs uppercase tracking-[0.06em] text-white/60">
                How might we — {h.who}
              </p>
              <p className="text-[clamp(1.2rem,2vw,1.6rem)] font-medium leading-[1.3] tracking-[-0.01em] text-white">
                {h.text}
              </p>
            </Reveal>
          ))}
        </div>
        {story}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:pb-[9%]">
          {goals.map((g, i) => (
            // The outer div owns the staggered offset; the card inside
            // fans out of a tilted stack, so the two transforms never clash.
            <div key={g.title} className={cn(i >= 2 && "md:translate-y-[38%]")}>
              <Reveal
                delay={i * 0.1}
                y={110}
                rotate={(i - 1.5) * 7}
                scale={0.92}
                duration={0.9}
                className={cn(
                  "relative flex aspect-[1/0.92] flex-col overflow-hidden rounded-[24px] p-5 md:rounded-[28px]",
                  GOAL_FILLS[i % 4]
                )}
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className="whitespace-nowrap">
                    Design goal {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-current opacity-20" />
                </div>
                <p className="relative z-10 mt-3 text-[clamp(1.2rem,1.8vw,1.5rem)] font-medium leading-[1.2] tracking-[-0.015em]">
                  {g.title}
                </p>
                <GoalDoodle variant={i % 4} />
                <span className="relative z-10 mt-auto grid h-10 w-10 place-items-center rounded-[10px] bg-[#0c0c0d] text-white">
                  {g.icon}
                </span>
              </Reveal>
            </div>
          ))}
        </div>
      </Shell>
    </Band>
  );
}

/* ── Photo with chat-style overlays ────────────────────────────────── */
export function OverlayPhoto({
  label,
  hint,
  bubbles,
}: {
  label: string;
  hint: string;
  bubbles: { chip: string; tone: "green" | "saffron"; text: string }[];
}) {
  return (
    <Band className="py-3">
      <div className="mx-auto w-full max-w-[1400px] px-3">
        <PhotoSlot
          label={label}
          hint={hint}
          className="aspect-[4/5] rounded-plate sm:aspect-[16/9] md:aspect-[16/8.5]"
        >
          <MarkTile
            tone="green"
            className="absolute left-5 top-5 h-14 w-14 rounded-full md:left-10 md:top-10 md:h-20 md:w-20"
          />
          {bubbles.map((b, i) => (
            <Reveal
              key={b.text}
              delay={0.25 + i * 0.35}
              y={18}
              scale={0.9}
              className={cn(
                "absolute hidden max-w-[260px] flex-col gap-2 rounded-[20px] bg-white p-4 text-left shadow-[0_20px_40px_-16px_rgba(0,0,0,0.3)] sm:flex",
                i === 0
                  ? "right-[10%] top-[14%] rounded-bl-[6px]"
                  : "bottom-[12%] left-[12%] rounded-br-[6px]"
              )}
            >
              <span
                className={cn(
                  "w-fit rounded-full px-2.5 py-1 text-[11px] font-medium",
                  b.tone === "green" ? "bg-[#DCFAD8] text-[#057724]" : "bg-[#FCE9D4] text-[#8a4a0a]"
                )}
              >
                {b.chip}
              </span>
              <span className="text-[13px] leading-snug text-[#212121]">{b.text}</span>
            </Reveal>
          ))}
        </PhotoSlot>
      </div>
    </Band>
  );
}

/* ── Desk research ─────────────────────────────────────────────────── */
export function ResearchTable({
  rows,
}: {
  rows: { source: string; looked: string; led: string }[];
}) {
  return (
    <div
      className={cn("border-l border-t", DASHED)}
      role="table"
      aria-label="Desk research — sources and what they led to"
    >
      <div
        role="row"
        className={cn("hidden grid-cols-[1fr_1.4fr_1.4fr] border-b border-r md:grid", DASHED)}
      >
        {["Source", "What I looked for", "What it led to"].map((h) => (
          <span
            key={h}
            role="columnheader"
            className="px-6 py-3 text-xs uppercase tracking-[0.04em] text-sv-mute"
          >
            {h}
          </span>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={r.source} role="row" className={cn("border-b border-r", DASHED)}>
          <Reveal
            delay={i * 0.08}
            y={20}
            className="grid grid-cols-1 gap-3 p-5 md:grid-cols-[1fr_1.4fr_1.4fr] md:gap-0 md:p-0"
          >
            <div role="cell" className="flex items-baseline gap-3 md:px-6 md:py-6">
              <span aria-hidden className="text-sm text-sv-mute">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] font-medium leading-snug md:text-base">{r.source}</span>
            </div>
            <p role="cell" className={cn(SMALL, "text-text-secondary md:px-6 md:py-6")}>
              <span className="text-sv-mute md:hidden">Looked for: </span>
              {r.looked}
            </p>
            <p role="cell" className={cn(SMALL, "text-text-primary md:px-6 md:py-6")}>
              <span className="text-sv-mute md:hidden">Led to: </span>
              <Mixed text={r.led} />
            </p>
          </Reveal>
        </div>
      ))}
    </div>
  );
}

/* ── Process ───────────────────────────────────────────────────────── */
export function Process({
  given,
  used,
  steps,
}: {
  given: number;
  used: number;
  steps: { title: string; time?: string; body: string }[];
}) {
  return (
    <>
      <Reveal className="flex flex-col gap-3 rounded-card bg-sv-card p-6 md:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-sm font-medium">Design timeline</p>
          <p className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">
              <CountUp value={`${used} days`} duration={1.2} />
            </span>{" "}
            used of {given}
          </p>
        </div>
        <DayBar given={given} used={used} />
      </Reveal>
      <ol
        className={cn("grid grid-cols-1 border-l border-t sm:grid-cols-2 md:grid-cols-3", DASHED)}
      >
        {steps.map((s, i) => (
          <li
            key={s.title}
            className={cn("flex min-h-[200px] flex-col border-b border-r p-5 md:p-6", DASHED)}
          >
            <Reveal delay={i * 0.08} y={24} className="flex flex-1 flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <span
                  aria-hidden
                  className="text-[clamp(2rem,3vw,2.6rem)] font-light leading-none text-sv-mute/50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.time && (
                  <span className="rounded-full bg-sv-card px-3 py-1 text-xs text-text-secondary">
                    {s.time}
                  </span>
                )}
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <p className="text-lg font-medium leading-tight tracking-[-0.01em]">{s.title}</p>
                <p className={cn(SMALL, "text-text-secondary")}>{s.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </>
  );
}

/* ── User flows ────────────────────────────────────────────────────── */
/** Steps light up one after another, left to right, like a path walked. */
export function FlowRows({
  rows,
}: {
  rows: { title: string; sub: string; steps: { label: string; note?: string; key?: boolean }[] }[];
}) {
  return (
    <>
      {rows.map((row) => (
        <Reveal
          key={row.title}
          y={32}
          className="flex flex-col gap-5 rounded-card bg-sv-card p-6 md:p-8"
        >
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium tracking-[-0.01em]">{row.title}</p>
            <p className="text-[13px] text-text-muted md:text-sm">{row.sub}</p>
          </div>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {row.steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.label}
                delay={0.2 + i * 0.1}
                x={-14}
                y={0}
                scale={0.94}
                className="flex items-center gap-2"
              >
                <span
                  className={cn(
                    "flex flex-col rounded-[14px] px-4 py-2.5",
                    s.key ? "bg-sv-forest text-white" : "bg-sv-band text-text-primary"
                  )}
                >
                  <span className="text-[13px] font-medium leading-tight md:text-sm">
                    {s.label}
                  </span>
                  {s.note && (
                    <span
                      className={cn(
                        "text-[11px] leading-tight md:text-xs",
                        s.key ? "text-white/80" : "text-text-muted"
                      )}
                    >
                      {s.note}
                    </span>
                  )}
                </span>
                {i < row.steps.length - 1 && (
                  <ArrowRight aria-hidden className="h-3.5 w-3.5 shrink-0 text-sv-mute" />
                )}
              </Reveal>
            ))}
          </ol>
        </Reveal>
      ))}
    </>
  );
}

/* ── Wireframes (ink) ──────────────────────────────────────────────── */
export function Wireframes({
  headline,
  caption,
  frames,
  footnote,
}: {
  headline: string;
  caption: ReactNode;
  frames: (Shot & { label: string })[];
  footnote: string;
}) {
  return (
    <Band tone="ink" className="py-section">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={GRID_LINES} />
      <Shell className="relative flex flex-col gap-section">
        <div className="flex flex-col gap-block">
          <SectionLabel muted="Low-fidelity" strong="Wireframes" tone="ink" />
          <HeadlineBlock
            headline={headline}
            caption={caption}
            tone="ink"
            bubble={{ glyph: "ગુ", label: "Gujarati script" }}
          />
        </div>
      </Shell>
      {/* Pinned and walked sideways by scroll on wide screens; a native
          sideways-scrolling row elsewhere. The page itself never scrolls
          sideways either way. */}
      <WireframeTrack frames={frames} />
      <Shell className="relative mt-block">
        <p className="max-w-[620px] text-sm leading-[1.6] text-white/60">{footnote}</p>
      </Shell>
    </Band>
  );
}

/** Wireframe beside the shipped screen, with what changed and why. */
export function BeforeAfter({
  pairs,
}: {
  pairs: { title: string; before: Shot; after: Shot; body: string; why: string }[];
}) {
  return (
    <ul className="flex flex-col gap-3">
      {pairs.map((p, i) => (
        <Reveal
          as="li"
          key={p.title}
          y={48}
          className="grid grid-cols-1 gap-8 rounded-card bg-sv-card p-6 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12 md:p-10"
        >
          <div className="mx-auto w-full max-w-[300px]">
            <CompareSlider before={p.before} after={p.after} title={p.title} />
          </div>
          <div className="flex flex-col gap-4">
            <span aria-hidden className="text-sm text-sv-mute">
              Change {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[clamp(1.4rem,2.2vw,1.85rem)] font-medium leading-[1.15] tracking-[-0.015em]">
              {p.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-text-secondary">{p.body}</p>
            <p className="border-t border-hairline/10 pt-4 text-[15px] leading-[1.6] text-text-secondary">
              <span className="font-medium text-text-primary">Why: </span>
              {p.why}
            </p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/* ── Typography & colours (ink) ────────────────────────────────────── */
export function TypeAndColour({
  note,
  swatches,
}: {
  note: string;
  swatches: { hex: string; name: string; ring?: boolean; dark?: boolean }[][];
}) {
  let n = 0;
  return (
    <Band tone="ink" className="py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_60%,transparent)]"
        style={GRID_LINES}
      />
      <Shell className={cn("relative flex flex-col gap-block", notoSans.className)}>
        <div className="flex flex-col gap-4">
          <SectionLabel muted="Design system ·" strong="Type and colour" tone="ink" />
          <p className="max-w-[560px] text-sm leading-[1.6] text-white/70">{note}</p>
        </div>
        <p
          aria-hidden
          className={cn(
            GIANT,
            "whitespace-nowrap text-[clamp(3.6rem,17vw,13.5rem)] tracking-[-0.03em]"
          )}
        >
          <Parallax
            as="span"
            speed={-50}
            className="inline-block text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.85)]"
          >
            Noto
          </Parallax>
          <Parallax as="span" speed={30} className="inline-block">
            &nbsp;Sans
          </Parallax>
        </p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <Reveal
            scale={0.85}
            y={0}
            duration={1}
            className="relative grid min-h-[200px] place-items-center md:place-items-start"
          >
            <div
              aria-hidden
              className="absolute left-0 top-0 h-56 w-56 rounded-full text-white/20 [mask-image:radial-gradient(circle,black_30%,transparent_70%)]"
              style={DOTS}
            />
            <span className="relative text-[clamp(6rem,14vw,10rem)] font-medium leading-none md:pl-8 md:pt-6">
              Aa
            </span>
          </Reveal>
          <dl className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-4 gap-y-8 text-white md:grid-cols-[88px_minmax(0,1fr)] md:gap-x-6">
            <dt className="pt-1 text-sm text-white/60">Overview</dt>
            <dd className="flex min-w-0 flex-col gap-2 break-all text-[clamp(1.05rem,1.6vw,1.35rem)] font-medium leading-snug">
              <span>ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
              <span>abcdefghijklmnopqrstuvwxyz</span>
              <span>अ आ इ ई उ ऊ ए ऐ ओ औ क ख ग घ</span>
            </dd>
            <dt className="pt-1 text-sm text-white/60">Weights</dt>
            <dd className="flex flex-col gap-1.5 text-[clamp(1.05rem,1.6vw,1.35rem)]">
              {(["font-normal", "font-medium", "font-semibold", "font-bold"] as const).map(
                (w, i) => (
                  <Reveal as="span" key={w} delay={i * 0.1} x={-12} y={0} className={w}>
                    {["Regular", "Medium", "SemiBold", "Bold"][i]}
                  </Reveal>
                )
              )}
            </dd>
          </dl>
        </div>
        <div className="flex flex-col items-center gap-4 pt-block md:gap-6">
          {swatches.map((row, r) => (
            <ul key={r} className="flex flex-wrap justify-center gap-4 md:gap-6">
              {row.map((s) => (
                <Reveal
                  as="li"
                  key={s.hex + s.name}
                  delay={n++ * 0.07}
                  y={0}
                  scale={0.6}
                  className="grid h-[clamp(108px,15vw,200px)] w-[clamp(108px,15vw,200px)] place-items-center rounded-full border"
                  style={{ borderColor: s.ring ? "rgb(255 255 255 / 0.55)" : `${s.hex}99` }}
                >
                  <span
                    className="grid h-[68%] w-[68%] place-items-center rounded-full text-center"
                    style={{
                      backgroundColor: s.ring ? "transparent" : s.hex,
                      border: s.ring ? "1px solid rgb(255 255 255 / 0.55)" : undefined,
                      color: s.dark ? "#0c0c0d" : "#ffffff",
                    }}
                  >
                    <span className="flex flex-col gap-0.5 text-[10px] font-medium md:text-xs">
                      <span>{s.hex.toUpperCase()}</span>
                      <span className="opacity-80">{s.name}</span>
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          ))}
        </div>
      </Shell>
    </Band>
  );
}

/* ── One-word screen showcases (ink) ───────────────────────────────── */
type Annotation = { title: string; body: string };

/** The giant word drifts slowly against the scroll while the phone rides
    faster in front of it — two layers, so the device floats over the word. */
export function PhoneShowcase({
  word,
  wordAt = "top",
  phone,
  left,
  right,
}: {
  word: string;
  wordAt?: "top" | "bottom";
  phone: Shot;
  left: Pinned[];
  right: Pinned[];
}) {
  const giant = (
    <p
      aria-hidden
      className={cn(
        GIANT,
        "relative whitespace-nowrap text-center text-[clamp(3.4rem,15.5vw,12.75rem)] text-white",
        wordAt === "top" ? "z-0" : "z-0 -mt-[clamp(4rem,14vw,11rem)]"
      )}
    >
      <Parallax as="span" speed={wordAt === "top" ? 60 : -60} className="inline-block">
        {word}
      </Parallax>
    </p>
  );
  return (
    <Band tone="ink" className="pb-section pt-section">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={GRID_LINES} />
      <div className="relative">
        {wordAt === "top" && giant}
        <Shell
          className={cn(
            "relative z-10 grid grid-cols-1 items-stretch gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8",
            wordAt === "top" && "-mt-[clamp(2.5rem,8.6vw,7rem)]"
          )}
        >
          <PinnedPhone phone={phone} left={left} right={right} />
        </Shell>
        {wordAt === "bottom" && giant}
      </div>
    </Band>
  );
}

export function BrowserShowcase({
  word,
  screen,
  notes,
  inset,
}: {
  word: string;
  screen: { src: string; alt: string; height: number; label: string };
  notes: Annotation[];
  inset?: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <Band tone="ink" className="pb-section pt-section">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={GRID_LINES} />
      <p
        aria-hidden
        className={cn(
          GIANT,
          "relative whitespace-nowrap text-center text-[clamp(3.4rem,15.5vw,12.75rem)] text-white"
        )}
      >
        <Parallax as="span" speed={60} className="inline-block">
          {word}
        </Parallax>
      </p>
      <Shell className="relative z-10 -mt-[clamp(2rem,7vw,6rem)] flex flex-col gap-block">
        <Reveal y={60} className="relative">
          <Browser src={screen.src} alt={screen.alt} height={screen.height} label={screen.label} />
          {inset && (
            // The inset rides faster than the screen behind it.
            <Parallax
              speed={-50}
              className="absolute -bottom-[8%] right-[-2%] hidden w-[44%] overflow-hidden rounded-[12px] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-black/10 md:block"
            >
              <Image
                src={inset.src}
                alt={inset.alt}
                width={inset.width}
                height={inset.height}
                sizes="480px"
                className="h-auto w-full"
              />
            </Parallax>
          )}
        </Reveal>
        <ul
          className={cn(
            "grid grid-cols-1 gap-8 sm:grid-cols-2",
            notes.length > 3 ? "md:grid-cols-4" : "md:grid-cols-3",
            inset && "md:mt-[4%]"
          )}
        >
          {notes.map((a, i) => (
            <Reveal
              as="li"
              key={a.title}
              delay={i * 0.1}
              y={20}
              className="flex flex-col gap-1.5 border-t border-white/10 pt-4"
            >
              <span className="text-[15px] font-semibold text-white">{a.title}</span>
              <span className="text-sm leading-[1.55] text-white/65">{a.body}</span>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </Band>
  );
}

/** One portal, three logins: a role switcher over a single browser, then
    the traits every role's dashboard shares. */
export function RoleDashboards({
  items,
  shared,
}: {
  items: {
    role: string;
    scope: string;
    credit: "me" | "shared";
    screen: Shot & { height: number };
  }[];
  shared: Annotation[];
}) {
  return (
    <>
      <Reveal y={50}>
        <RoleSwitcher items={items} />
      </Reveal>
      <ul className={cn("mt-block grid grid-cols-1 border-l border-t md:grid-cols-3", DASHED)}>
        {shared.map((a, i) => (
          <li key={a.title} className={cn("border-b border-r", DASHED)}>
            <Reveal delay={0.1 + i * 0.1} y={18} className="flex flex-col gap-1.5 p-5 md:p-6">
              <span className="text-[15px] font-medium">{a.title}</span>
              <span className={cn(SMALL, "text-text-secondary")}>{a.body}</span>
            </Reveal>
          </li>
        ))}
      </ul>
    </>
  );
}

/** A headline beat on ink, between showcases. */
export function InkStatement({
  label,
  headline,
  caption,
  bubble,
}: {
  label?: [string, string];
  headline: string;
  caption: ReactNode;
  bubble?: { glyph: string; label: string };
}) {
  return (
    <Band tone="ink" className="pt-section">
      <Shell className="flex flex-col gap-block">
        {label && <SectionLabel muted={label[0]} strong={label[1]} tone="ink" />}
        <HeadlineBlock
          headline={headline}
          caption={caption}
          side="right"
          tone="ink"
          bubble={bubble}
        />
      </Shell>
    </Band>
  );
}

/* ── Outcome ───────────────────────────────────────────────────────── */
export function Impact({
  title,
  body,
  metrics,
}: {
  title: string;
  body: string;
  metrics: { value: string; label: string }[];
}) {
  return (
    <Band className="py-section">
      <Shell className="flex flex-col gap-block">
        <SectionLabel muted="The" strong="Outcome" />
        <Reveal
          y={60}
          className="grid grid-cols-1 gap-3 rounded-[28px] bg-[#0c0c0d] p-3 text-white md:ml-[30%] md:grid-cols-2 md:rounded-[32px]"
        >
          <div className="flex min-h-[220px] flex-col justify-between gap-10 p-4 md:p-5">
            <div className="flex flex-col gap-3">
              <h3 className="text-[clamp(1.6rem,2.6vw,2.1rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                {title}
              </h3>
              <p className="max-w-[340px] text-sm leading-[1.55] text-white/70">{body}</p>
            </div>
            <Wordmark className="h-12 w-auto self-start text-white" />
          </div>
          <ul className="flex flex-col gap-2 rounded-[20px] bg-white p-2 md:rounded-[24px]">
            {metrics.map((m, i) => (
              <Reveal
                as="li"
                key={m.label}
                delay={0.2 + i * 0.08}
                x={24}
                y={0}
                className="flex flex-col gap-0.5 rounded-[14px] bg-[#f6f6f6] px-5 py-4"
              >
                <span className="text-[clamp(1.25rem,1.8vw,1.5rem)] font-medium tracking-[-0.01em] text-[#0c0c0d]">
                  <CountUp value={m.value} />
                </span>
                <span className="text-[13px] text-[#595959]">{m.label}</span>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </Shell>
    </Band>
  );
}

/* ── Reflection ────────────────────────────────────────────────────── */
export function NextChapter({
  headline,
  bubble,
  items,
}: {
  headline: string;
  bubble?: { glyph: string; label: string };
  items: [Annotation, Annotation, Annotation];
}) {
  const col = (a: Annotation, i: number) => (
    <Reveal delay={0.1 + i * 0.12} y={24} className="flex max-w-[300px] flex-col gap-2">
      <p className="text-xl font-medium tracking-[-0.01em]">{a.title}</p>
      <p className="text-sm leading-[1.6] text-text-secondary">{a.body}</p>
    </Reveal>
  );
  return (
    <Band className="pb-section">
      <Shell className="flex flex-col gap-block">
        <SectionLabel muted="Looking" strong="Back" />
        <h2 className={cn(DISPLAY, "mx-auto max-w-[760px] py-block text-center")}>
          <ScrubText text={headline} tail={bubble && <ScriptBubble {...bubble} />} />
        </h2>
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-8">
          <div className="md:pl-[10%]">{col(items[0], 0)}</div>
          <Reveal
            scale={0.8}
            y={0}
            duration={1.1}
            className="relative order-first mx-auto grid h-[clamp(240px,34vw,420px)] w-[clamp(240px,34vw,420px)] place-items-center md:order-none md:mt-20"
          >
            {/* The dotted halo turns very slowly — CSS only, off under reduced motion. */}
            <div
              aria-hidden
              className="absolute -inset-[30%] text-hairline/[0.14] [mask-image:radial-gradient(circle,black_25%,transparent_68%)] motion-safe:animate-[spin_120s_linear_infinite]"
              style={DOTS}
            />
            <div className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-b from-sv-card to-sv-band shadow-[inset_0_2px_0_rgba(255,255,255,0.7),0_40px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-hairline/10">
              <div className="grid h-[72%] w-[72%] place-items-center rounded-full bg-white ring-1 ring-black/5">
                <Wordmark className="w-[64%] text-[#057724]" title="" />
              </div>
            </div>
          </Reveal>
          <div className="flex md:justify-end md:pr-[10%]">{col(items[1], 1)}</div>
          <div className="flex justify-center md:col-span-3">{col(items[2], 2)}</div>
        </div>
      </Shell>
    </Band>
  );
}

/* ── Thanks ────────────────────────────────────────────────────────── */
export function Thanks({ linkedin, phone, body }: { linkedin: string; phone: Shot; body: string }) {
  return (
    <Band className="pt-block">
      <Shell className="relative flex min-h-[clamp(480px,52vw,640px)] flex-col">
        <div className="flex items-center justify-between">
          <MarkTile className="h-12 w-12 rounded-full" />
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sv-card px-5 py-3 text-sm font-medium transition-colors hover:bg-text-primary hover:text-paper"
          >
            Find me on LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <p className="relative z-10 mt-12 text-[clamp(2.4rem,7.6vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em]">
          <span className="text-text-primary">Thanks for </span>
          <span className="text-sv-mute">scrolling.</span>
          <br />
          <span className="text-sv-mute">Let&apos;s connect.</span>
        </p>
        <Reveal className="relative z-10 mt-auto flex flex-col gap-3 pb-10 pt-16">
          <p className="max-w-[300px] text-[clamp(1.2rem,2vw,1.6rem)] font-medium uppercase leading-[1.15]">
            Want the longer version?
          </p>
          <p className="max-w-[340px] text-sm leading-[1.6] text-text-secondary">{body}</p>
        </Reveal>
        <Parallax
          speed={-60}
          className="pointer-events-none absolute -bottom-[34%] right-[2%] hidden w-[min(30%,320px)] md:block"
        >
          <Phone src={phone.src} alt={phone.alt} sizes="460px" className="rotate-[28deg]" />
        </Parallax>
      </Shell>
    </Band>
  );
}
