"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { caseStudies, projectsSection } from "@/lib/data";
import { caseStudyDetails } from "@/lib/caseStudies";
import { useRevealOnScroll } from "@/lib/motion";
import { useInfiniteCarousel } from "@/lib/useInfiniteCarousel";
import { EDGE_LEFT, EDGE_MASK_LEFT, EDGE_MASK_RIGHT, EDGE_RIGHT } from "@/lib/gridEdge";
import { LinkPending } from "@/components/LinkPending";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types";

/** The card the section should be showing whenever someone arrives at
    #work. It leads the array, but autoplay moves on every 4s, so by the
    time a visitor clicks "Work" the carousel is wherever it drifted to —
    the initial slide alone doesn't hold it there. Found by id rather than
    hardcoded to 0 so reordering the array can't silently break it. */
const LEAD_STUDY_ID = "ux4g";

function ProjectCard({ study }: { study: CaseStudy }) {
  const hasDetail = Boolean(caseStudyDetails[study.id]);

  const content = (
    <div className="group relative h-[450px] w-full sm:w-[85vw] sm:max-w-[748px] overflow-hidden rounded-lg border border-hairline/[0.04]">
      {study.image ? (
        <Image
          src={study.image}
          alt={`${study.heading} preview`}
          fill
          sizes="(min-width: 768px) 748px, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: study.color }} aria-hidden="true" />
      )}

      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-paper via-paper/[0.78] via-35% to-transparent to-[82%] p-6">
        <div className="flex flex-wrap items-center justify-end gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[8px] bg-black/[0.64] px-3 py-2 font-sans text-sm text-[#f6f3f0] backdrop-blur-[8px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-xl font-semibold text-text-primary">{study.heading}</h3>
          <p className="font-sans text-base text-text-secondary">{study.overview}</p>
          <span className="mt-1 inline-flex w-fit items-center gap-2 font-display text-base font-semibold text-text-primary">
            View Case study
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </span>
          </span>
        </div>
      </div>

      {/* Inside the card, so the thing the user pressed is the thing that
          responds. Only for cards that actually leave the page — the
          fallback href is this same section, which resolves instantly. */}
      {hasDetail && <LinkPending />}
    </div>
  );

  return (
    <Link href={hasDetail ? `/case-studies/${study.id}` : "/#work"} className="block">
      {content}
    </Link>
  );
}

export function ProjectsCarousel() {
  const reduced = useReducedMotion();
  const headerReveal = useRevealOnScroll(reduced);
  const { swiperRef, activeIndex, initialSlide, handleSwiper, handleSlideChange, goToReal, prev, next, repeatItems } =
    useInfiniteCarousel(caseStudies.length);
  const virtualStudies = repeatItems(caseStudies);

  /* Snap back to the lead card whenever someone navigates to #work — a nav
     click, a deep link, or the back button. SmoothScroll dispatches
     `hashchange` by hand on every in-page anchor click, including when the
     hash hasn't changed, so clicking "Work" a second time re-snaps rather
     than doing nothing. */
  useEffect(() => {
    const lead = caseStudies.findIndex((s) => s.id === LEAD_STUDY_ID);
    if (lead < 0) return;

    const snap = () => {
      if (window.location.hash === "#work") goToReal(lead);
    };
    snap();
    window.addEventListener("hashchange", snap);
    return () => window.removeEventListener("hashchange", snap);
  }, [goToReal]);

  return (
    /* Full-width wrapper purely so the edge masks below can be positioned
       with GridFrame's own `50%`-based formula. Inside the capped section
       that percentage saturates and the masks miss the line. */
    <div className="relative">
    <section id="work" className="relative mx-auto max-w-[1032px] scroll-mt-24 overflow-hidden px-9 py-20 md:px-8 md:py-28">
      <motion.div key={headerReveal.key} {...headerReveal.props} className="mx-auto mb-16 text-center">
        <h2 className="font-display text-3xl font-medium tracking-[-2px] text-text-secondary md:text-[48px]">
          {projectsSection.part1}{" "}
          <span className="font-instrument-serif text-3xl italic md:text-[48px]">{projectsSection.part2}</span>
        </h2>
      </motion.div>

      {/* The gradient fades are scoped to just this viewport's height (not
          the buttons/dots below). Horizontally, the outer `-mx` cancels the
          section's own padding so the fades reach all the way to the true
          vertical grid line instead of stopping at the padded content edge
          — the inner `px` restores that padding for the actual carousel
          content so the Swiper/buttons don't shift. */}
      <div className="relative -mx-9 md:-mx-8">
        <div className="relative px-9 md:px-8">
          <Swiper
            modules={[Autoplay]}
            onSwiper={handleSwiper}
            onSlideChange={handleSlideChange}
            centeredSlides
            initialSlide={initialSlide}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{ 640: { slidesPerView: "auto", spaceBetween: 24 } }}
            speed={600}
            autoplay={reduced ? false : { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            // Mobile keeps Swiper's own default clip (`overflow: hidden`) so
            // only the active card is ever visible — no peek, no sliver in
            // the gap between the true edge and the grid line that the
            // edge-fade (which starts AT the line, not before it) can't
            // reach. `sm:` and up restores `!overflow-visible` for the
            // peek-and-dissolve design, where that's the intended effect.
            className="sm:!overflow-visible"
          >
            {virtualStudies.map((study) => (
              <SwiperSlide
                key={study._key}
                className="sm:!w-auto opacity-40 blur-[1px] transition-all duration-500 [&.swiper-slide-active]:opacity-100 [&.swiper-slide-active]:blur-0"
              >
                <ProjectCard study={study} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            onClick={() => prev()}
            aria-label="Previous project"
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-accent-border bg-accent text-accent-foreground shadow-lg transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => next()}
            aria-label="Next project"
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-accent-border bg-accent text-accent-foreground shadow-lg transition-opacity hover:opacity-90"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* Color fade + a blur that intensifies toward the true edge (via
            mask-image), so peeking cards genuinely dissolve into the
            background as they approach the grid line, not just darken. */}
        <div
          className={`pointer-events-none absolute inset-y-0 z-[5] w-24 bg-gradient-to-r from-paper to-transparent backdrop-blur-md sm:w-40 ${EDGE_LEFT}`}
          style={{ maskImage: "linear-gradient(to right, black, transparent)", WebkitMaskImage: "linear-gradient(to right, black, transparent)" }}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute inset-y-0 z-[5] w-24 bg-gradient-to-l from-paper to-transparent backdrop-blur-md sm:w-40 ${EDGE_RIGHT}`}
          style={{ maskImage: "linear-gradient(to left, black, transparent)", WebkitMaskImage: "linear-gradient(to left, black, transparent)" }}
          aria-hidden="true"
        />

      </div>

      <div className="relative z-10 mt-6 flex items-center justify-center gap-1.5">
        {caseStudies.map((study, i) => (
          <button
            key={study.id}
            type="button"
            onClick={() => goToReal(i)}
            aria-label={`Go to ${study.heading}`}
            className={cn("h-2 w-2 transition-opacity", i === activeIndex ? "bg-white opacity-100" : "bg-white opacity-40")}
          />
        ))}
      </div>
    </section>

      {/* Nothing may render outside the vertical grid lines. The fades above
          start AT each line and dissolve inward, so they never covered the
          strip beyond it — and from `sm` up the Swiper is
          `!overflow-visible`, so peeking cards sat right there, fully
          opaque. Above the cards, below the lines' own `z-10`, so the lines
          still draw over them. */}
      <div className={`pointer-events-none absolute inset-y-0 z-[6] bg-paper ${EDGE_MASK_LEFT}`} aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-y-0 z-[6] bg-paper ${EDGE_MASK_RIGHT}`} aria-hidden="true" />
    </div>
  );
}
