"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  HeartPulse,
  Zap,
  Landmark,
  Briefcase,
  Scale,
  Plane,
  Building2,
  Baby,
  HandCoins,
  Bus,
  IdCard,
  Sprout,
  Cpu,
  ChevronDown,
} from "lucide-react";
import { EXPO_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ServiceCategory } from "@/types";

/** No Figma reference for this block — it's new, not transcribed from the
    frame — so icons are ordinary lucide-react, matching how the rest of
    the site's chrome (carousel arrows, the case-study link spinner) picks
    icons, rather than the hand-drawn inline SVGs the frame-matched parts
    of this page use. Keyed by the data's own `icon` field, same pattern
    as `PLATFORM_ICONS` above. */
const CATEGORY_ICONS: Record<string, typeof GraduationCap> = {
  education: GraduationCap,
  health: HeartPulse,
  utilities: Zap,
  finance: Landmark,
  jobs: Briefcase,
  justice: Scale,
  travel: Plane,
  business: Building2,
  family: Baby,
  pension: HandCoins,
  transport: Bus,
  citizenship: IdCard,
  agriculture: Sprout,
  science: Cpu,
};

/** How many of the 14 categories show before "Show all" — six is enough
    to prove the shape of the list without the section running longer
    than the stats and journeys around it. */
const COLLAPSED_COUNT = 6;

function CategoryRow({ category }: { category: ServiceCategory }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const Icon = CATEGORY_ICONS[category.icon];

  return (
    <li className="overflow-hidden rounded-card bg-paper">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cs-violet/10 text-cs-violet sm:h-10 sm:w-10">
          {Icon && <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.75} aria-hidden />}
        </span>
        {/* No truncation: a long name (e.g. "Electricity, water and local
            services") wrapping to two lines on a narrow screen reads fine —
            cutting it off with an ellipsis right where the category name
            stops being legible does not. */}
        <span className="min-w-0 flex-1">
          <span className="block font-sans text-sm font-semibold leading-snug text-cs-ink sm:text-base">
            {category.name}
          </span>
          <span className="block font-sans text-xs text-cs-body sm:text-sm">
            {category.subCategories.length} sub-categories
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end">
          <span className="font-sans text-base font-bold tabular-nums text-cs-violet sm:text-xl">
            {category.totalServices}
          </span>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-wide text-cs-body sm:text-[11px]">
            Services
          </span>
        </span>
        <ChevronDown
          className={cn("h-5 w-5 shrink-0 text-cs-body transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EXPO_OUT }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 border-t border-cs-violet/10 px-5 pb-4 pt-3">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-cs-body">
                Sub-categories
              </span>
              <ul className="flex flex-col divide-y divide-cs-violet/10">
                {category.subCategories.map((sub) => (
                  <li key={sub.name} className="flex items-center justify-between gap-4 py-2">
                    <span className="font-sans text-sm text-cs-ink">{sub.name}</span>
                    <span className="shrink-0 font-sans text-sm font-medium tabular-nums text-cs-body">
                      {sub.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** The 14-category coverage list under the catalogue stats — collapsed to
    the first six with a "Show all" toggle, each category individually
    expandable to its own sub-categories. Adapted from the interactive
    coverage map on a teammate's write-up of the same joint UX4G research,
    restyled to this page's own card language (bg-paper on the section's
    cs-panel, cs-violet accents) rather than reproducing that page's dark,
    bordered-card look. */
export function CategoryBreakdown({ categories }: { categories: ServiceCategory[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? categories : categories.slice(0, COLLAPSED_COUNT);

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {visible.map((category) => (
          <CategoryRow key={category.name} category={category} />
        ))}
      </ul>
      {categories.length > COLLAPSED_COUNT && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          className="self-center rounded-lg border border-cs-violet/30 px-4 py-2.5 font-sans text-sm font-medium text-cs-violet transition-colors hover:border-cs-violet/60 hover:bg-cs-violet/[0.06]"
        >
          {showAll ? "Show fewer categories" : `Show all ${categories.length} categories`}
        </button>
      )}
    </div>
  );
}
