"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { trustedLogos } from "@/lib/data";
import { EDGE_LEFT, EDGE_RIGHT, MASK_LEFT_WIDTH, MASK_RIGHT_WIDTH } from "@/lib/gridEdge";
import { cn } from "@/lib/utils";

/** Marquee strip of real ministries, agencies, and companies Rahul has
    designed for — see the Experience section for the underlying work.
    Static, evenly-spaced row under reduced motion instead of ticking. */
export function TrustedByMarquee() {
  const reduced = useReducedMotion();

  return (
    <section aria-label="Organizations I've designed for" className="relative bg-paper py-12 md:py-16">
      <div className="relative mx-auto h-12 max-w-[1032px] overflow-hidden px-6 md:px-8 lg:h-[60px]">
        <div
          className={cn(
            "flex w-max items-center gap-20",
            !reduced && "animate-ticker"
          )}
        >
          {[0, 1].map((repeat) => (
            <div key={repeat} className="flex items-center gap-20" aria-hidden={repeat === 1}>
              {trustedLogos.map((logo) => (
                <div key={logo.name} className="flex h-12 shrink-0 items-center justify-center lg:h-[60px]">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="h-auto max-h-9 w-auto object-contain opacity-60 grayscale transition-opacity duration-300 hover:opacity-100 hover:grayscale-0 lg:max-h-[60px]"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={`pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-paper to-transparent ${EDGE_LEFT}`} aria-hidden="true" />
        <div className={`pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-l from-paper to-transparent ${EDGE_RIGHT}`} aria-hidden="true" />
        {/* This container's own `overflow-hidden` clips the sliding logos
            at ITS edge, which is the true viewport edge on mobile/tablet
            (no floor on `mx-auto max-w-[1032px]`) — the fades above start
            AT the grid line and only dissolve inward from there, so they
            never cover the sliver *before* the line, where a logo can still
            be fully visible mid-slide. This solid block does. */}
        <div className={`pointer-events-none absolute inset-y-0 left-0 z-[6] bg-paper ${MASK_LEFT_WIDTH}`} aria-hidden="true" />
        <div className={`pointer-events-none absolute inset-y-0 right-0 z-[6] bg-paper ${MASK_RIGHT_WIDTH}`} aria-hidden="true" />
      </div>
    </section>
  );
}
