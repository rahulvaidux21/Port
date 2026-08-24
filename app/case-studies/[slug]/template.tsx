"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EXPO_OUT } from "@/lib/motion";

/**
 * Next remounts `template.tsx` on every navigation into this segment (unlike
 * `layout.tsx`), so this runs once per case-study visit — the entrance the
 * click-through was missing. `loading.tsx` covers the wait; this covers the
 * arrival, easing the real content in instead of letting it pop in the
 * instant the RSC payload lands.
 *
 * Same SSR-safe gate as `useRevealOnScroll`: Framer bakes `initial` into the
 * server-rendered HTML, so a naive opacity:0 start ships invisible content
 * to a hard reload or a client with slow/blocked JS. Pre-mount renders
 * children as-is; the animation only plays once React has actually taken
 * over.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EXPO_OUT }}
    >
      {children}
    </motion.div>
  );
}
