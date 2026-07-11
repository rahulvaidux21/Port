// Shared Framer Motion variants and reduced-motion helpers.
// Call useReducedMotion() in each component, then pass the result to these helpers.

export const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

type RM = boolean | null;

/** Scroll-triggered fade-up. Spread onto a motion element: {...fadeUp(rm)}. */
export function fadeUp(rm: RM, delay = 0) {
  return {
    initial: { opacity: rm ? 1 : 0, y: rm ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const, margin: "-10%" as const },
    transition: { duration: rm ? 0 : 0.65, ease: EXPO_OUT, delay: rm ? 0 : delay },
  };
}

/** Hero entrance (animate, not whileInView). Spread onto a motion element. */
export function fadeUpAnimate(rm: RM, delay = 0) {
  return {
    initial: { opacity: rm ? 1 : 0, y: rm ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: rm ? 0 : 0.7, ease: EXPO_OUT, delay: rm ? 0 : delay },
  };
}

/** Stagger container variants. Use with initial="hidden" whileInView="show". */
export function staggerContainer(rm: RM) {
  return {
    hidden: {},
    show: rm ? {} : { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
}

/** Stagger child variants. Pair with staggerContainer on the parent. */
export function staggerItem(rm: RM) {
  return {
    hidden: rm ? {} : { opacity: 0, y: 24 },
    show: rm
      ? {}
      : { opacity: 1, y: 0, transition: { duration: 0.65, ease: EXPO_OUT } },
  };
}
