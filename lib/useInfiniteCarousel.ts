"use client";

import { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

/**
 * True infinite carousel (1,2,3,4,1,2,3,4,... forever, either direction),
 * built manually instead of Swiper's native `loop`.
 *
 * Why: `loop` + `centeredSlides` + a handful of real slides is a confirmed,
 * reproducible bug in this Swiper/React setup — the "next" slide's position
 * calculation gets corrupted (it renders further from center than "prev"
 * instead of the same distance on the opposite side), regardless of
 * `slidesPerView` (auto or numeric), `loopAdditionalSlides` (tried up to
 * 10), or `initialSlide`. Verified via direct DOM position measurement each
 * time, not just visually.
 *
 * Instead: repeat the real items several times into one long list and
 * silently jump (0-speed, no callback) back to an equivalent middle
 * position whenever the user nears either physical end — invisible to the
 * user, and avoids Swiper's loop math entirely.
 */
const REPEATS = 6;
const START_REPEAT = 2;

export function useInfiniteCarousel(realCount: number) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const initialSlide = realCount * START_REPEAT;

  const handleSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
  }, []);

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const virtualIndex = swiper.activeIndex;
      const real = ((virtualIndex % realCount) + realCount) % realCount;
      setActiveIndex(real);

      const repeatIndex = Math.floor(virtualIndex / realCount);
      if (repeatIndex <= 0) {
        swiper.slideTo(virtualIndex + realCount * (REPEATS - 2), 0, false);
      } else if (repeatIndex >= REPEATS - 1) {
        swiper.slideTo(virtualIndex - realCount * (REPEATS - 2), 0, false);
      }
    },
    [realCount]
  );

  // `speed` lets a caller override the configured transition duration for
  // one manual jump — needed by carousels whose default `speed` is tuned
  // long for a continuous autoplay glide (MoreWork), so a manual click
  // still snaps at a normal pace instead of taking the full glide duration.
  const goToReal = useCallback(
    (realIndex: number, speed?: number) => {
      const swiper = swiperRef.current;
      if (!swiper) return;
      const currentRepeat = Math.floor(swiper.activeIndex / realCount);
      swiper.slideTo(currentRepeat * realCount + realIndex, speed);
    },
    [realCount]
  );

  const prev = useCallback((speed?: number) => swiperRef.current?.slidePrev(speed), []);
  const next = useCallback((speed?: number) => swiperRef.current?.slideNext(speed), []);

  /** Repeats `items` REPEATS times, each entry carrying a unique `_key`
      (since the same real item now appears multiple times in the list). */
  function repeatItems<T>(items: T[]): (T & { _key: string })[] {
    return Array.from({ length: REPEATS }, (_, repeat) =>
      items.map((item, i) => ({ ...item, _key: `${repeat}-${i}` }))
    ).flat();
  }

  return { swiperRef, activeIndex, initialSlide, handleSwiper, handleSlideChange, goToReal, prev, next, repeatItems };
}
