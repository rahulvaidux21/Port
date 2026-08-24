"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials, testimonialsSection } from "@/lib/data";
import { useRevealOnScroll } from "@/lib/motion";
import { useInfiniteCarousel } from "@/lib/useInfiniteCarousel";
import { EDGE_LEFT, EDGE_MASK_LEFT, EDGE_MASK_RIGHT, EDGE_RIGHT } from "@/lib/gridEdge";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel() {
  const reduced = useReducedMotion();
  const headerReveal = useRevealOnScroll(reduced);
  const { swiperRef, activeIndex, initialSlide, handleSwiper, handleSlideChange, goToReal, prev, next, repeatItems } =
    useInfiniteCarousel(testimonials.length);
  const virtualTestimonials = repeatItems(testimonials);

  return (
    /* Full-width wrapper so the edge masks resolve `50%` against the same
       box the grid lines do — see EDGE_MASK_LEFT. */
    <div className="relative">
    <section id="testimonials" className="relative mx-auto max-w-[1032px] scroll-mt-20 overflow-hidden px-6 py-20 md:px-8 md:py-28">
      <motion.div key={headerReveal.key} {...headerReveal.props} className="mx-auto mb-6 max-w-2xl px-3 text-center md:px-0">
        <h2 className="font-display text-3xl font-medium tracking-[-2px] text-text-secondary md:text-[48px]">
          {testimonialsSection.part1}{" "}
          <span className="font-instrument-serif text-3xl italic md:text-[48px]">{testimonialsSection.part2}</span>
        </h2>
        <p className="mt-4 font-sans text-base text-text-muted">{testimonialsSection.intro}</p>
      </motion.div>

      <div className="relative -mx-6 py-10 md:-mx-8">
        <div className="relative px-6 md:px-8">
          <Swiper
            modules={[Autoplay]}
            onSwiper={handleSwiper}
            onSlideChange={handleSlideChange}
            centeredSlides
            initialSlide={initialSlide}
            slidesPerView="auto"
            spaceBetween={24}
            speed={600}
            autoplay={reduced ? false : { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            className="!overflow-visible"
          >
            {virtualTestimonials.map((testimonial) => (
              <SwiperSlide
                key={testimonial._key}
                className="!w-[332px] opacity-40 blur-[1px] transition-all duration-500 [&.swiper-slide-active]:opacity-100 [&.swiper-slide-active]:blur-0"
              >
                <div className="relative flex h-[360px] flex-col justify-between overflow-hidden rounded-lg border border-hairline/[0.08] bg-hairline/[0.04] p-6 [.swiper-slide-active_&]:border-accent-border [.swiper-slide-active_&]:shadow-[0_5px_30px_5px_rgba(3,45,129,0.5)]">
                  <p className="font-sans text-base leading-6 text-text-primary/[0.88]">“{testimonial.quote}”</p>
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="font-sans text-sm text-text-primary/[0.88]">{testimonial.role.split(",")[0]}</p>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-text-primary/[0.64]">
                        {testimonial.role.split(",").slice(1).join(",").trim() || "Client"}
                      </p>
                    </div>
                    <Quote className="h-10 w-10 shrink-0 text-accent-border opacity-55" strokeWidth={1.5} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            onClick={() => prev()}
            aria-label="Previous testimonial"
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-accent-border bg-accent text-accent-foreground shadow-lg transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => next()}
            aria-label="Next testimonial"
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-accent-border bg-accent text-accent-foreground shadow-lg transition-opacity hover:opacity-90"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

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

      <div className="flex items-center justify-center gap-1.5">
        {testimonials.map((testimonial, i) => (
          <button
            key={testimonial.role}
            type="button"
            onClick={() => goToReal(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={cn("h-2 w-2 transition-opacity", i === activeIndex ? "bg-white opacity-100" : "bg-white opacity-40")}
          />
        ))}
      </div>
    </section>

      {/* Same masks as the Work carousel. This Swiper is
          `!overflow-visible` at every width, not just from `sm`. */}
      <div className={`pointer-events-none absolute inset-y-0 z-[6] bg-paper ${EDGE_MASK_LEFT}`} aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-y-0 z-[6] bg-paper ${EDGE_MASK_RIGHT}`} aria-hidden="true" />
    </div>
  );
}
