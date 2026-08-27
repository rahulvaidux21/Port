"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { moreWork, moreWorkSection } from "@/lib/data";
import { useRevealOnScroll } from "@/lib/motion";
import { useInfiniteCarousel } from "@/lib/useInfiniteCarousel";
import { EDGE_LEFT, EDGE_RIGHT } from "@/lib/gridEdge";
import { cn } from "@/lib/utils";
import type { MoreWorkItem } from "@/types";

// Smaller, portrait-leaning cards — intentionally less prominent than the
// primary "Things I've designed" carousel, matching the source Figma. Width
// comes from Swiper's own slidesPerView (see below), not a fixed class here.
function MoreWorkCard({ item }: { item: MoreWorkItem }) {
  // Behance explorations carry an absolute URL; the IRCTC card points at its
  // internal case-study route instead.
  const isInternal = item.href?.startsWith("/") ?? false;
  const content = (
    // Locked to the 405x448 ratio of the Figma card exports so the artwork
    // fits exactly at any slide width instead of being cropped by a fixed
    // height ("zoomed" edges cut off).
    <div className="group relative aspect-[405/448] w-full overflow-hidden rounded-lg border border-hairline/[0.08]">
      {item.image ? (
        <Image src={item.image} alt={`${item.title} preview`} fill sizes="405px" className="object-cover object-top" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: item.color }} aria-hidden="true">
          <span className="font-display text-5xl font-bold text-white/20">{item.title.slice(0, 1)}</span>
        </div>
      )}

      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-paper via-paper/70 via-35% to-transparent to-51% p-4">
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              // Figma chip spec: black @ 64% + background blur, 8px radius,
              // near-white text — fixed colors (not theme tokens) since the
              // chip always sits on top of the card artwork.
              className="rounded-[8px] bg-black/[0.64] px-3 py-2 font-sans text-sm leading-4 text-[#F6F3F0] backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-lg font-semibold text-text-primary">{item.title}</h3>
          {/* Fixed three-line zone (matching the Figma cards) so the title
              row sits at the same height on every card regardless of how
              many lines the description wraps to. */}
          <p className="min-h-[60px] font-sans text-sm text-text-secondary line-clamp-3">{item.description}</p>
          {item.href && (
            <span className="mt-1 inline-flex w-fit items-center gap-1.5 font-sans text-sm font-semibold text-text-primary">
              {isInternal ? "View Case study" : "View on Behance"}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (!item.href) return content;
  return isInternal ? (
    <Link href={item.href} className="block">
      {content}
    </Link>
  ) : (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  );
}

// The heading is overridable so the case-study pages can reuse the entire
// section verbatim under a "More Cases" title (see case-study/MoreCases).
export function MoreWork({
  part1 = moreWorkSection.part1,
  part2 = moreWorkSection.part2,
}: {
  part1?: string;
  part2?: string;
} = {}) {
  const reduced = useReducedMotion();
  const headerReveal = useRevealOnScroll(reduced);
  const { swiperRef, activeIndex, initialSlide, handleSwiper, handleSlideChange, goToReal, prev, next, repeatItems } =
    useInfiniteCarousel(moreWork.length);
  const virtualItems = repeatItems(moreWork);

  return (
    <section className="relative mx-auto max-w-[1032px] scroll-mt-24 overflow-hidden px-6 py-20 md:px-8 md:pb-10 md:pt-28">
      <motion.div key={headerReveal.key} {...headerReveal.props} className="mx-auto mb-16 px-3 text-center md:px-0">
        <h2 className="font-display text-3xl font-medium tracking-[-2px] text-text-secondary md:text-[48px]">
          {part1} <span className="font-instrument-serif text-3xl italic md:text-[48px]">{part2}</span>
        </h2>
      </motion.div>

      <div className="relative -mx-6 md:-mx-8">
        <div className="relative px-6 md:px-8">
          <Swiper
            modules={[Autoplay]}
            onSwiper={handleSwiper}
            onSlideChange={handleSlideChange}
            centeredSlides
            initialSlide={initialSlide}
            slidesPerView={1.2}
            spaceBetween={16}
            // Long speed + near-zero delay + linear easing chains each hop
            // straight into the next with no pause or ease-out blip, so it
            // reads as one continuous drift — like Hero's background
            // wordmark ticker — while manual speed (600ms) still applies to
            // arrow/dot clicks.
            speed={4000}
            breakpoints={{
              640: { slidesPerView: 2.1, spaceBetween: 24 },
              1024: { slidesPerView: 2.6, spaceBetween: 24 },
            }}
            autoplay={reduced ? false : { delay: 1, disableOnInteraction: false, pauseOnMouseEnter: true }}
            style={{ "--swiper-wrapper-transition-timing-function": "linear" } as React.CSSProperties}
          >
            {virtualItems.map((item) => (
              <SwiperSlide
                key={item._key}
                className="opacity-40 blur-[1px] transition-all duration-500 [&.swiper-slide-active]:opacity-100 [&.swiper-slide-active]:blur-0"
              >
                <MoreWorkCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            onClick={() => prev(600)}
            aria-label="Previous project"
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-accent-border bg-accent text-accent-foreground shadow-lg transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => next(600)}
            aria-label="Next project"
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-accent-border bg-accent text-accent-foreground shadow-lg transition-opacity hover:opacity-90"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div
          className={`pointer-events-none absolute inset-y-0 z-[5] w-20 bg-gradient-to-r from-paper to-transparent backdrop-blur-md sm:w-32 ${EDGE_LEFT}`}
          style={{ maskImage: "linear-gradient(to right, black, transparent)", WebkitMaskImage: "linear-gradient(to right, black, transparent)" }}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute inset-y-0 z-[5] w-20 bg-gradient-to-l from-paper to-transparent backdrop-blur-md sm:w-32 ${EDGE_RIGHT}`}
          style={{ maskImage: "linear-gradient(to left, black, transparent)", WebkitMaskImage: "linear-gradient(to left, black, transparent)" }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-center gap-1.5">
        {moreWork.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goToReal(i, 600)}
            aria-label={`Go to ${item.title}`}
            className={cn("h-2 w-2 transition-opacity", i === activeIndex ? "bg-white opacity-100" : "bg-white opacity-40")}
          />
        ))}
      </div>
    </section>
  );
}
