"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRevealOnScroll } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  /** Small uppercase label above the title — used for the "Part 1" /
      "Part 2" chapter markers in the richer UX4G case study, matching the
      mono-uppercase eyebrow treatment already used elsewhere on the site. */
  eyebrow?: string;
  id?: string;
  children: ReactNode;
  className?: string;
}

/** Plain heading-label + content block — the case-study template's actual
    unit of rhythm per the Figma "Case study page template" reference (a
    generic template frame, not project-specific): a "Heading 5" (28px
    medium, no index number, no border, no card) followed directly by
    prose/lists, spaced apart with padding alone. */
export function Section({ title, eyebrow, id, children, className }: SectionProps) {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);

  return (
    <motion.section id={id} key={reveal.key} {...reveal.props} className={cn("pt-[34px] first:pt-0", className)}>
      {eyebrow && <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">{eyebrow}</p>}
      <h2 className="mb-3 font-sans text-2xl font-medium tracking-[-0.5px] text-text-primary md:text-[28px]">{title}</h2>
      {children}
    </motion.section>
  );
}
