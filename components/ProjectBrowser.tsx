"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { caseStudies, projectsSection } from "@/lib/data";
import { PlaceholderSlot } from "@/components/PlaceholderSlot";
import { SpeechBubble } from "@/components/SpeechBubble";
import { useRevealOnScroll } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types";

/** Small dot-cluster accent at a card's outer corner — the same dot motif
    used in the Experience frame, tying the "stationery" system together. */
function CornerDots({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 z-20 h-10 w-16",
        side === "left" ? "left-0 rounded-tl-[2rem]" : "right-0 rounded-tr-[2rem]"
      )}
      style={{
        backgroundImage: "radial-gradient(circle, var(--color-band-dot) 1.5px, transparent 1.5px)",
        backgroundSize: "10px 10px",
        backgroundPosition: side === "left" ? "10px 10px" : "calc(100% - 10px) 10px",
        maskImage: `radial-gradient(circle at ${side === "left" ? "0% 0%" : "100% 0%"}, black 0%, black 45%, transparent 75%)`,
        WebkitMaskImage: `radial-gradient(circle at ${side === "left" ? "0% 0%" : "100% 0%"}, black 0%, black 45%, transparent 75%)`,
      }}
    />
  );
}

/** Phone chrome for mobile-app screenshots — tall aspect, pill notch. */
function PhoneFrame({
  src,
  alt,
  className,
  style,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] overflow-hidden rounded-[1.75rem] border-[5px] border-stone-900 bg-stone-900 shadow-2xl",
        className
      )}
      style={style}
    >
      <span className="absolute left-1/2 top-1.5 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-stone-900" />
      <Image src={src} alt={alt} fill sizes="220px" className="object-cover" priority={priority} />
    </div>
  );
}

/** Browser chrome for web-platform / dashboard screenshots — wide aspect, traffic-light bar. */
function BrowserFrame({
  src,
  alt,
  className,
  style,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl", className)}
      style={style}
    >
      <div className="flex h-6 items-center gap-1.5 bg-stone-100 px-3">
        <span className="h-2 w-2 rounded-full bg-stone-300" />
        <span className="h-2 w-2 rounded-full bg-stone-300" />
        <span className="h-2 w-2 rounded-full bg-stone-300" />
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes="480px" className="object-cover object-top" priority={priority} />
      </div>
    </div>
  );
}

function CaseStudyVisual({ study }: { study: CaseStudy }) {
  const Frame = study.frame === "phone" ? PhoneFrame : BrowserFrame;
  const primaryClass = study.frame === "phone" ? "w-[52%] max-w-[210px]" : "w-[78%] max-w-[420px]";
  const secondaryClass = study.frame === "phone" ? "w-[42%] max-w-[170px]" : "w-[62%] max-w-[330px]";

  return (
    <div
      className="relative flex min-h-[420px] items-center justify-center overflow-hidden p-8 md:min-h-[560px]"
      style={{ backgroundColor: study.color }}
    >
      <span className="absolute left-6 top-6 z-10 font-mono text-xs text-white/70">{study.year}</span>

      {study.image ? (
        <div className="relative flex w-full items-center justify-center">
          {study.image2 ? (
            <>
              <Frame
                src={study.image2}
                alt={`${study.heading} — secondary screen`}
                className={secondaryClass}
                style={{
                  transform: study.frame === "phone" ? "rotate(4deg) translate(38%, 10%)" : "rotate(2deg) translate(6%, 24%)",
                }}
              />
              <Frame
                src={study.image}
                alt={`${study.heading} preview`}
                className={cn(primaryClass, "relative z-10")}
                style={{ transform: study.frame === "phone" ? "rotate(-3deg) translate(-18%, -6%)" : "rotate(-2deg) translate(-4%, -10%)" }}
                priority
              />
            </>
          ) : (
            <Frame src={study.image} alt={`${study.heading} preview`} className={primaryClass} priority />
          )}
        </div>
      ) : (
        <PlaceholderSlot
          label="Project visuals"
          className="h-[75%] w-[75%] max-w-[260px] rounded-2xl border-white/40 bg-white/20"
          icon={<ImageIcon className="h-6 w-6 text-white/80" strokeWidth={1.5} />}
        />
      )}
    </div>
  );
}

function DetailBlock({
  label,
  text,
  labelColor,
  labelColorDark,
}: {
  label: string;
  text: string;
  labelColor: string;
  labelColorDark: string;
}) {
  return (
    <div className="mb-3">
      <p
        className="mb-1 font-mono text-[9px] font-semibold uppercase tracking-widest"
        style={{ "--label-light": labelColor, "--label-dark": labelColorDark } as CSSProperties}
      >
        <span className="text-[var(--label-light)] dark:text-[var(--label-dark)]">{label}</span>
      </p>
      <p className="font-sans text-[13px] leading-relaxed text-stone-600 dark:text-stone-300">{text}</p>
    </div>
  );
}

function CaseStudyContent({ study }: { study: CaseStudy }) {
  return (
    <div className="relative flex flex-col justify-center p-8 md:p-10">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-stone-400">{study.wordmark}</p>
        <p className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-text-secondary">
          {study.discipline}
        </p>
      </div>

      <h2 className="mb-4 font-serif text-[26px] italic leading-[1.15] text-text-primary sm:text-[30px] md:text-[32px]">
        {study.statement}
      </h2>

      <p className="mb-7 max-w-[46ch] font-sans text-sm leading-relaxed text-stone-600 dark:text-stone-300">
        {study.overview}
      </p>

      <div className="border-t border-editor-border pt-5">
        <DetailBlock label="Problem" text={study.problem} labelColor={study.labelColor} labelColorDark={study.labelColorDark} />
        <DetailBlock label="Solution" text={study.solution} labelColor={study.labelColor} labelColorDark={study.labelColorDark} />
        <DetailBlock label="Result" text={study.result} labelColor={study.labelColor} labelColorDark={study.labelColorDark} />
      </div>
    </div>
  );
}

function StackedCard({ study, index }: { study: CaseStudy; index: number }) {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced, 60);

  return (
    <div className="sticky mb-8" style={{ top: `${24 + index * 26}px`, zIndex: index + 1 }}>
      <motion.div
        key={reveal.key}
        {...reveal.props}
        className="relative grid overflow-hidden rounded-[2rem] border border-editor-border bg-surface shadow-lg md:grid-cols-2"
      >
        <CornerDots side="left" />
        <CornerDots side="right" />
        <CaseStudyContent study={study} />
        <CaseStudyVisual study={study} />
      </motion.div>
    </div>
  );
}

export function ProjectBrowser() {
  const reduced = useReducedMotion();
  const headerReveal = useRevealOnScroll(reduced);

  return (
    <section id="work" className="relative scroll-mt-24 px-6 py-20 md:py-28">
      <motion.div key={headerReveal.key} {...headerReveal.props} className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
        <SpeechBubble className="mb-6">{projectsSection.speechBubble}</SpeechBubble>
        <h2 className="font-sans text-3xl font-bold text-text-primary md:text-4xl">{projectsSection.headline}</h2>
        <p className="mt-4 font-sans text-sm text-text-secondary md:text-base">{projectsSection.intro}</p>
      </motion.div>

      <div className="mx-auto max-w-[1140px]">
        {caseStudies.map((study, i) => (
          <StackedCard key={study.id} study={study} index={i} />
        ))}
      </div>
    </section>
  );
}
