"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { experience, experienceSection } from "@/lib/data";
import { useRevealOnScroll } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Experience() {
  const reduced = useReducedMotion();
  const headerReveal = useRevealOnScroll(reduced);

  return (
    <section id="experience" className="relative mx-auto max-w-[1032px] scroll-mt-24 px-9 py-20 md:px-8 md:py-28">
      <motion.div key={headerReveal.key} {...headerReveal.props} className="mx-auto mb-16 text-center">
        <h2 className="font-display text-3xl font-medium tracking-[-2px] text-text-secondary md:text-[48px]">
          {experienceSection.part1}{" "}
          <span className="font-instrument-serif text-3xl italic md:text-[48px]">{experienceSection.part2}</span>
        </h2>
      </motion.div>

      <div className="relative overflow-hidden rounded-lg border border-hairline/[0.08] bg-paper p-8 md:p-12">
        {/* Diffuse blue glow blobs — decorative, matches the source Figma's
            card background exactly. */}
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-[320px] w-[480px] rotate-[37deg] bg-accent-glow opacity-[0.58] blur-[38px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-[320px] w-[380px] rotate-[37deg] bg-accent-glow opacity-[0.58] blur-[38px]"
          aria-hidden="true"
        />

        <div className="relative flex flex-col">
          {experience.map((entry, i) => (
            <div key={entry.company}>
              {i > 0 && (
                <div className="my-8 flex items-center justify-center" aria-hidden="true">
                  <div className="h-px w-full max-w-[886px] bg-hairline/[0.16]" />
                </div>
              )}
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-1 items-start gap-5">
                  <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-lg border border-hairline/[0.08] bg-paper">
                    <Image
                      src={entry.logo}
                      alt={`${entry.company} logo`}
                      fill
                      sizes="60px"
                      className={cn("rounded-lg", entry.logoFit === "contain" ? "object-contain" : "object-cover")}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-sans text-sm font-bold text-text-primary">{entry.role}</p>
                    <p className="font-sans text-xs font-medium text-text-secondary">{entry.company}</p>
                    <p className="font-sans text-xs font-medium text-text-secondary">{entry.location}</p>
                  </div>
                </div>
                <p className="font-sans text-xs font-medium text-text-secondary md:pl-8">{entry.timeline}</p>
              </div>
              <p className="mt-4 pl-0 font-sans text-sm leading-relaxed text-text-secondary md:pl-20">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
