"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ctaSection, socialLinks } from "@/lib/data";
import { useRevealOnScroll } from "@/lib/motion";

export function CtaBand() {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);
  const email = socialLinks.find((link) => link.icon === "mail")?.href ?? "#";

  return (
    <section className="relative mx-auto max-w-[1032px] px-9 py-8 md:px-8">
      <motion.div
        key={reveal.key}
        {...reveal.props}
        className="relative flex items-center justify-center overflow-hidden rounded-lg border border-hairline/[0.08] bg-paper px-8 py-16 text-center md:px-12"
      >
        <div
          className="pointer-events-none absolute -left-24 top-1/4 h-[320px] w-[480px] rotate-[37deg] bg-accent-glow opacity-[0.58] blur-[38px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-1/4 h-[320px] w-[380px] rotate-[37deg] bg-accent-glow opacity-[0.58] blur-[38px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 -top-32 h-[470px] w-[560px] rotate-[37deg] bg-accent-glow opacity-[0.58] blur-[38px]"
          aria-hidden="true"
        />

        <div className="relative flex max-w-[680px] flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-5">
            <h2 className="font-display text-3xl font-medium tracking-[-2px] text-text-secondary md:text-[48px]">
              {ctaSection.part1}{" "}
              <span className="font-instrument-serif text-3xl italic md:text-[48px]">{ctaSection.part2}</span>
            </h2>
            <p className="max-w-[332px] font-sans text-base text-text-primary/[0.64]">{ctaSection.body}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href={email}
              className="rounded-lg border border-accent-border bg-accent px-4 py-3 font-sans text-base font-medium text-accent-foreground shadow-[0_5px_30px_5px_rgba(0,85,254,0.32)] transition-opacity hover:opacity-90"
            >
              {ctaSection.primaryCta}
            </a>
            <a
              href="#work"
              className="rounded-lg border border-hairline/[0.16] bg-hairline/[0.08] px-4 py-3 font-sans text-base font-medium text-text-primary shadow-[0_5px_30px_5px_rgba(255,255,255,0.1)] backdrop-blur-md transition-colors hover:bg-hairline/[0.16]"
            >
              {ctaSection.secondaryCta}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
