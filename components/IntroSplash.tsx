"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hero } from "@/lib/data";

const SPLASH_DURATION = 2200;

export function IntroSplash() {
  const [visible, setVisible] = useState(true);
  const [skip, setSkip] = useState(false);
  const mountedAt = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSkip(true);
      return;
    }

    mountedAt.current = Date.now();
    const timer = setTimeout(() => setVisible(false), SPLASH_DURATION);

    // Background/hidden tabs throttle or fully pause setTimeout, which can
    // leave this full-screen overlay stuck blocking every click on the site
    // indefinitely if the tab isn't visible during the intro (e.g. opened in
    // a background tab, or the user alt-tabs away). Catch up the instant the
    // tab is visible again, on top of the normal timer.
    function handleVisibilityChange() {
      if (document.visibilityState === "visible" && Date.now() - mountedAt.current >= SPLASH_DURATION) {
        setVisible(false);
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (skip) return null;

  const chars = hero.name.split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#000000" }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.6 }}
          onClick={() => setVisible(false)}
        >
          <div className="flex font-sans text-[10vw] font-black leading-none text-white md:text-[7vw]">
            {chars.map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
