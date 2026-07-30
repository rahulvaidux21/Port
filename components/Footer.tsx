"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { socialLinks, footerCopy, hero } from "@/lib/data";
import { SocialIcon } from "@/components/SocialIcon";
import { useRevealOnScroll } from "@/lib/motion";

export function Footer() {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);

  return (
    <footer className="relative overflow-hidden bg-paper pb-20 pt-16 md:pb-40 md:pt-20">
      <div
        className="pointer-events-none absolute bottom-[-125px] left-1/2 h-[150px] w-[1368px] max-w-[95vw] -translate-x-1/2 rounded-t-full bg-gradient-to-r from-accent to-accent-glow blur-[38px]"
        aria-hidden="true"
      />

      {/* `px-9 md:px-8` lives here, directly on the `mx-auto max-w-[1032px]`
          box, matching CtaBand's structure exactly (one layer, padding and
          centering on the same element) — not split across an outer
          `<footer>` padding plus this box, which is what caused it to
          misalign from every other section at desktop: `mx-auto` on a
          max-width box re-centers to the same absolute position regardless
          of an ancestor's padding, so padding the wrong element there did
          nothing once this box's max-width constraint became active. */}
      <motion.div
        key={reveal.key}
        {...reveal.props}
        className="relative mx-auto flex max-w-[1032px] flex-col gap-16 px-9 md:gap-[120px] md:px-8"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col items-start gap-8">
            <div className="h-12 w-16 overflow-hidden rounded-lg border border-hairline/[0.08] p-px">
              <Image
                src="/avatar-crop.jpg"
                alt={hero.name}
                width={64}
                height={48}
                className="h-full w-full rounded-[11px] object-cover object-top"
              />
            </div>
            <p className="max-w-[332px] font-sans text-sm text-text-primary/[0.64]">{footerCopy.tagline}</p>
            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.icon === "linkedin" || link.icon === "behance" || link.icon === "medium" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline/[0.08] bg-paper transition-colors hover:border-hairline/[0.16]"
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end md:justify-self-end">
            <p className="font-sans text-xs uppercase tracking-widest text-text-primary/[0.88]">Links</p>
            <div className="flex flex-col items-start gap-4 md:items-end">
              {footerCopy.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm text-text-primary/[0.64] transition-colors hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="h-px w-full bg-hairline/[0.16]" aria-hidden="true" />
          <p className="text-center font-sans text-sm text-text-primary/[0.64]">{footerCopy.copyright}</p>
        </div>
      </motion.div>
    </footer>
  );
}
