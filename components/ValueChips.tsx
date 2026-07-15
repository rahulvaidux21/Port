"use client";

import { useReducedMotion } from "framer-motion";
import { valueChips } from "@/lib/data";
import { cn } from "@/lib/utils";

function Chip({ label }: { label: string }) {
  return (
    <span className="mx-2 inline-flex shrink-0 items-center rounded-full border border-editor-border bg-paper px-4 py-2 font-sans text-sm text-text-secondary">
      {label}
    </span>
  );
}

export function ValueChips() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section aria-label="What I bring" className="pb-8 pt-2">
        <div
          className="rounded-none border px-6 py-4 transition-colors duration-300"
          style={{ backgroundColor: "var(--color-band-bg)", borderColor: "var(--color-band-border)" }}
        >
          <div className="flex flex-wrap justify-center gap-y-2">
            {valueChips.map((chip) => (
              <Chip key={chip} label={chip} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="What I bring" className="pb-8 pt-2">
      <div
        className="overflow-hidden rounded-none border py-4 transition-colors duration-300"
        style={{ backgroundColor: "var(--color-band-bg)", borderColor: "var(--color-band-border)" }}
      >
        <div className="relative overflow-hidden">
          <div className={cn("flex w-max animate-marquee")} style={{ willChange: "transform" }}>
            {[...valueChips, ...valueChips].map((chip, i) => (
              <Chip key={`${chip}-${i}`} label={chip} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
