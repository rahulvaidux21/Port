"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SpeechBubble } from "@/components/SpeechBubble";
import { hero, socialLinks } from "@/lib/data";
import { useRevealOnScroll } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);
  const email = socialLinks.find((link) => link.icon === "mail")?.href ?? "#";

  return (
    // The lanyard badge hangs from the navbar into this space, so the top
    // padding clears it on narrow screens (badge is centred there); on desktop
    // it hangs at the left, so the centred content clears it naturally.
    <section
      id="hero"
      className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center px-6 pb-10 pt-[300px] text-center sm:pt-[280px] md:px-8 lg:pb-12 lg:pt-16"
    >
      <motion.div
        key={reveal.key}
        {...reveal.props}
        className="flex w-full max-w-2xl flex-col items-center text-center"
      >
        <SpeechBubble className="mb-6">{hero.speechBubble}</SpeechBubble>

        <h1 className="font-sans text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl md:text-5xl">
          {hero.headline}
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-sans text-lg text-text-secondary md:text-xl">{hero.subline}</p>

        <a
          href={email}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3 font-sans text-sm font-medium text-paper transition-opacity hover:opacity-85"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {hero.ctaLabel}
        </a>
      </motion.div>
    </section>
  );
}
