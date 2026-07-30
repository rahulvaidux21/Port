"use client";

import { motion, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/data";
import { useRevealOnScroll } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Replaces the old trusted-by logo marquee — a compact row of real,
    already-substantiated numbers (see the comment on `stats` in lib/data.ts)
    rather than a new claim invented for this section. 5 items don't divide
    evenly into 2 mobile columns, so the last one spans both and centers
    itself alone on its own row rather than leaving a lopsided gap. */
export function Stats() {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);

  return (
    <section aria-label="Track record" className="relative bg-paper py-12 md:py-16">
      <motion.div
        key={reveal.key}
        {...reveal.props}
        className="relative mx-auto grid max-w-[1032px] grid-cols-2 gap-x-4 gap-y-8 px-9 md:grid-cols-5 md:gap-x-4 md:px-8"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col items-center gap-2 text-center",
              i === stats.length - 1 && stats.length % 2 === 1 && "col-span-2 md:col-span-1"
            )}
          >
            <p className="font-display text-4xl font-semibold tracking-[-1px] text-text-primary md:text-5xl">
              {stat.value}
            </p>
            <p className="max-w-[160px] font-mono text-xs uppercase tracking-widest text-text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
