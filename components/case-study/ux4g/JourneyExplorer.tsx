"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EXPO_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ServiceJourney } from "@/types";

/** The ten journey chips, made selectable — click one to see its full
    definition and real services that are instances of it. Adapted from
    the equivalent selector on a teammate's write-up of the same joint
    UX4G research (see CategoryBreakdown's own note on that source),
    restyled to this page's card language rather than reproducing that
    page's look.

    A separate client component from `JourneyModel` (which stays a plain
    server-rendered function in sections.tsx) because this one needs
    state — the "five steps keep coming back" bars underneath it don't,
    and there's no reason to pull that static half into client JS too. */
export function JourneyExplorer({ journeys }: { journeys: ServiceJourney[] }) {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const active = journeys[selected];

  return (
    <div className="flex flex-col gap-3">
      <h3 className={cn("text-[clamp(0.9375rem,1.111vw,1rem)] leading-[1.6]", "font-sans font-semibold text-cs-ink")}>
        Every service is one of ten journeys
      </h3>
      <ul className="flex flex-wrap gap-2">
        {journeys.map((j, i) => {
          const isSelected = i === selected;
          return (
            <li key={j.name}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={isSelected}
                className={cn(
                  "rounded-chip px-3 py-1.5 font-sans text-[clamp(0.9375rem,1.111vw,1rem)] font-medium transition-colors",
                  isSelected ? "bg-cs-violet text-paper" : "bg-paper text-cs-ink hover:bg-cs-violet/10"
                )}
              >
                {j.name}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="overflow-hidden rounded-card bg-paper">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.name}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EXPO_OUT }}
            className="flex flex-col gap-4 p-5"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-sans text-sm font-semibold uppercase tracking-wide text-cs-violet">
                {active.name}
              </span>
              <p className="font-sans text-sm leading-relaxed text-cs-ink">{active.definition}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-cs-body">
                Example services
              </span>
              <ul className="flex flex-wrap gap-2">
                {active.exampleServices.map((service) => (
                  <li
                    key={service}
                    className="rounded-chip bg-cs-panel px-3 py-1.5 font-sans text-sm text-cs-ink"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
