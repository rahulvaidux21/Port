"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { fadeUpAnimate } from "@/lib/motion";

export function Hero() {
  const rm = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pt-24 pb-20 section-padding overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background accent shape */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0 h-full w-full opacity-[0.06] dark:opacity-[0.04]"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="480" cy="160" r="360" fill="hsl(var(--accent))" />
          <circle cx="200" cy="600" r="240" fill="hsl(var(--accent))" />
        </svg>
      </div>

      <div className="content-grid relative z-10">
        <div className="max-w-6xl">
          {/* Kicker */}
          <motion.p
            {...fadeUpAnimate(rm, 0.1)}
            className="text-xs text-accent font-semibold tracking-widest uppercase mb-8"
          >
            Product & UI/UX Designer
          </motion.p>

          {/* Main heading */}
          <motion.h1
            className="text-display-xl font-extrabold leading-none tracking-tighter text-balance mb-6"
            {...fadeUpAnimate(rm, 0.2)}
          >
            Rahul Vaid
          </motion.h1>

          {/* Subheading */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 mb-10"
            {...fadeUpAnimate(rm, 0.35)}
          >
            <p className="text-display-md font-light text-muted-foreground max-w-xl leading-tight tracking-tight">
              I design digital products at national scale.
            </p>
            <div className="hidden sm:block w-px h-14 bg-border shrink-0" />
            <div className="text-sm text-muted-foreground space-y-1 shrink-0">
              <p className="font-medium text-foreground">
                UX4G, India&apos;s national design system
              </p>
              <p>Gov-tech · Design systems · Mobile</p>
              <p>India · Remote</p>
            </div>
          </motion.div>

          {/* CTA row */}
          <motion.div className="flex items-center gap-4" {...fadeUpAnimate(rm, 0.5)}>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-medium text-sm hover:opacity-85 transition-opacity"
            >
              View my work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator — hidden on mobile to avoid overlap */}
        <motion.div
          className="hidden sm:flex absolute bottom-0 right-0 items-center gap-3 text-xs text-muted-foreground"
          initial={{ opacity: rm ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: rm ? 0 : 1.2, duration: rm ? 0 : 0.6 }}
        >
          <span className="tracking-widest uppercase font-medium">Scroll</span>
          <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
