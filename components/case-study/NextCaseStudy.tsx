"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRevealOnScroll } from "@/lib/motion";
import { caseStudyDetails } from "@/lib/caseStudies";
import type { CaseStudy } from "@/types";

/** Condensed teaser reusing the project-card's wordmark + serif statement
    language. Falls back to the project list instead of a dead link when the
    next case study doesn't have a detail page built yet. */
export function NextCaseStudy({ next }: { next: CaseStudy }) {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);
  const hasDetail = Boolean(caseStudyDetails[next.id]);
  const href = hasDetail ? `/case-studies/${next.id}` : "/#work";

  return (
    <motion.div key={reveal.key} {...reveal.props} className="mx-auto max-w-[1140px] px-6 pb-20 md:px-8 md:pb-28">
      <Link
        href={href}
        className="group flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[2rem] border border-editor-border bg-surface p-8 transition-colors hover:border-accent sm:flex-row sm:items-center md:p-10"
      >
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-text-muted">Next up</p>
          <h3 className="font-serif text-2xl italic text-text-primary sm:text-3xl">{next.statement}</h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-text-secondary">{next.wordmark}</p>
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-editor-border text-text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
          <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
        </span>
      </Link>
    </motion.div>
  );
}
