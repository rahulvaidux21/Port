"use client";

import { motion, useReducedMotion } from "framer-motion";
import { closingCta, socialLinks } from "@/lib/data";
import { useRevealOnScroll } from "@/lib/motion";

export function ClosingCta() {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);
  const email = socialLinks.find((link) => link.icon === "mail")?.href ?? "#";

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-20 md:py-28">
      <motion.div key={reveal.key} {...reveal.props} className="mx-auto flex max-w-xl flex-col items-center text-center">
        <h2 className="mb-5 font-sans text-3xl font-bold text-text-primary md:text-4xl">{closingCta.headline}</h2>
        <p className="mb-8 font-sans text-base text-text-secondary md:text-lg">{closingCta.body}</p>

        <a
          href={email}
          className="inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3 font-sans text-sm font-medium text-paper transition-opacity hover:opacity-85"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {closingCta.ctaLabel}
        </a>

        <p className="mt-4 font-sans text-xs text-text-muted">{closingCta.secondary}</p>
      </motion.div>
    </section>
  );
}
