"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRevealOnScroll } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  index: string;
  title: string;
  id?: string;
  accentColor: string;
  accentColorDark: string;
  /** Skip the `proseMax` (720px) cap for sections with grids/media that need the full column width. */
  wide?: boolean;
  children: ReactNode;
  className?: string;
}

/** Left-aligned, mono-indexed section rhythm for the long-form case-study
    scroll — see DESIGN.md "Case Study Detail Page". Distinct from the home
    page's centered SpeechBubble + h2 kicker, which doesn't suit ~15
    back-to-back sections. */
export function Section({ index, title, id, accentColor, accentColorDark, wide, children, className }: SectionProps) {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);

  return (
    <motion.section
      id={id}
      key={reveal.key}
      {...reveal.props}
      className={cn("mx-auto max-w-[1140px] scroll-mt-24 px-6 py-12 md:px-8 md:py-16", className)}
    >
      <div className="mb-10 flex items-baseline gap-4 border-b border-editor-border pb-5">
        <span
          className="font-mono text-sm font-semibold uppercase tracking-widest"
          style={{ "--l": accentColor, "--ld": accentColorDark } as CSSProperties}
        >
          <span className="text-[var(--l)] dark:text-[var(--ld)]">{index}</span>
        </span>
        <h2 className="font-display text-3xl font-semibold text-text-primary md:text-4xl">{title}</h2>
      </div>
      <div className={wide ? undefined : "max-w-[720px]"}>{children}</div>
    </motion.section>
  );
}
