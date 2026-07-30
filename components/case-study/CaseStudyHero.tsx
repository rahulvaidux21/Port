"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BrowserFrame } from "@/components/DeviceFrame";
import { useRevealOnScroll } from "@/lib/motion";
import type { CaseStudy, CaseStudyDetail } from "@/types";

interface CaseStudyHeroProps {
  detail: CaseStudyDetail;
  study: CaseStudy;
}

export function CaseStudyHero({ detail, study }: CaseStudyHeroProps) {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);

  return (
    <header className="px-6 pb-16 pt-8 md:px-8 md:pt-10">
      <motion.div key={reveal.key} {...reveal.props} className="mx-auto max-w-[1140px]">
        <Link
          href="/#work"
          className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Back to Work
        </Link>

        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-mono text-[11px] uppercase tracking-widest text-stone-400">{detail.hero.wordmark}</p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">{detail.hero.discipline}</p>
        </div>

        <h1 className="mb-6 max-w-[22ch] font-serif text-3xl italic leading-[1.1] text-text-primary sm:text-4xl md:text-5xl">
          {detail.hero.statement}
        </h1>

        <p className="mb-10 max-w-[720px] font-sans text-base leading-relaxed text-text-secondary md:text-lg">
          {detail.hero.intro}
        </p>

        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {detail.hero.metaRows.map((row) => (
            <div key={row.label} className="rounded-xl border border-editor-border bg-surface p-5">
              <p
                className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest"
                style={{ "--l": study.labelColor, "--ld": study.labelColorDark } as CSSProperties}
              >
                <span className="text-[var(--l)] dark:text-[var(--ld)]">{row.label}</span>
              </p>
              <p className="font-sans text-base leading-relaxed text-text-primary">{row.value}</p>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[2rem] p-8 md:p-14" style={{ backgroundColor: study.color }}>
          <BrowserFrame
            src={detail.hero.image.src}
            alt={detail.hero.image.alt}
            className="mx-auto w-full max-w-[900px]"
            priority
          />
        </div>
      </motion.div>
    </header>
  );
}
