"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SpeechBubble } from "@/components/SpeechBubble";
import { experience, experienceSection, education } from "@/lib/data";
import { useRevealOnScroll } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ExperienceEntry } from "@/types";

function RulerTicks({ orientation }: { orientation: "top" | "left" }) {
  const marks = Array.from({ length: orientation === "top" ? 16 : 12 }, (_, i) => (i * 37) % 100);

  if (orientation === "top") {
    return (
      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-7 items-end justify-between px-8 pb-1 font-mono text-[9px] sm:flex"
        style={{ color: "var(--color-band-tick)" }}
      >
        {marks.map((n, i) => (
          <span key={i}>{n}</span>
        ))}
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-0 hidden w-7 flex-col items-center justify-between py-8 font-mono text-[9px] sm:flex"
      style={{ color: "var(--color-band-tick)" }}
    >
      {marks.map((n, i) => (
        <span key={i}>{n}</span>
      ))}
    </div>
  );
}

function ExperienceCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);

  return (
    <motion.div
      key={reveal.key}
      {...reveal.props}
      transition={{ ...reveal.props.transition, delay: reduced ? 0 : index * 0.1 }}
      className="rounded-2xl border border-editor-border bg-surface p-6 shadow-xl md:p-8"
    >
      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-sans text-lg font-bold text-text-primary">
          {entry.role} <span className="font-normal text-text-secondary">— {entry.org}</span>
        </h3>
        <span className="whitespace-nowrap font-mono text-xs text-text-muted">{entry.dates}</span>
      </div>
      <p className="mb-4 max-w-[70ch] font-sans text-sm leading-relaxed text-text-secondary">{entry.description}</p>
      <div className="flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-stone-100 dark:bg-stone-800 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Experience() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-24 px-6 py-20 md:py-28">
      <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
        <SpeechBubble className="mb-6">{experienceSection.speechBubble}</SpeechBubble>
        <h2 className="font-sans text-3xl font-bold text-text-primary md:text-4xl">{experienceSection.headline}</h2>
      </div>

      {/* Thick beige frame around a self-contained cream + dot-grid interior — the whole frame floats gently. */}
      <div
        className={cn(
          "relative mx-auto max-w-[1140px] overflow-hidden rounded-[2rem] border-[14px] p-8 transition-colors duration-300",
          !reduced && "animate-float"
        )}
        style={{
          backgroundColor: "var(--color-band-bg)",
          borderColor: "var(--color-band-border)",
          backgroundImage: "radial-gradient(circle, var(--color-band-dot) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "-1px -1px",
        }}
      >
        <RulerTicks orientation="top" />
        <RulerTicks orientation="left" />

        <div className="relative flex flex-col gap-6">
          {experience.map((entry, i) => (
            <ExperienceCard key={`${entry.org}-${entry.dates}`} entry={entry} index={i} />
          ))}
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-[1140px] text-center font-sans text-xs text-text-muted">{education}</p>
    </section>
  );
}
