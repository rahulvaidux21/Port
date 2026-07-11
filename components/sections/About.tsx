"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { skills } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { EXPO_OUT, staggerContainer, staggerItem } from "@/lib/motion";

export function About() {
  const rm = useReducedMotion();

  return (
    <section
      id="about"
      className="section-padding py-section border-t border-border bg-surface"
      aria-label="About"
    >
      <div className="content-grid">
        <SectionLabel label="About" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Text column */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={staggerContainer(rm)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
          >
            <motion.h2
              className="text-display-md font-bold text-balance"
              variants={staggerItem(rm)}
            >
              At national scale, design is a structure problem, not a decoration problem.
            </motion.h2>

            <motion.div
              className="space-y-4 text-[1.0625rem] leading-relaxed text-muted-foreground max-w-prose"
              variants={staggerContainer(rm)}
            >
              <motion.p variants={staggerItem(rm)}>
                I work on UX4G, India&apos;s national design system under NeGD and MeitY. The
                platforms it underpins reach crores of citizens, which changes the weight of every
                decision: an unclear label or an inaccessible pattern isn&apos;t a papercut, it
                excludes people by the million.
              </motion.p>
              <motion.p variants={staggerItem(rm)}>
                I came to design from a history degree at the University of Delhi, and it shows in
                how I work: context and evidence first, opinions second. I trained through the
                Interaction Design Foundation and 3+ years of shipped work across e-commerce, B2C
                mobile, and government platforms.
              </motion.p>
              <motion.p variants={staggerItem(rm)}>
                Most of my time goes into design systems, multi-persona dashboards, and
                accessibility standards (WCAG 2.1, GIGW). The common thread is making complex
                services feel simple for the person on the other end.
              </motion.p>
            </motion.div>

            {/* Compact skills */}
            <motion.div variants={staggerItem(rm)} className="pt-4 space-y-3">
              {skills.map(({ category, items }) => (
                <div
                  key={category}
                  className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-x-4 gap-y-1 border-t border-border pt-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-0.5">
                    {category}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {items.join(" · ")}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={staggerItem(rm)} className="flex flex-wrap gap-3 pt-2">
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors group"
              >
                View full resume
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </a>
              <span className="text-border" aria-hidden="true">·</span>
              <a
                href="https://www.linkedin.com/in/rahul-vaid-1b768423a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                LinkedIn
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </a>
              <span className="text-border" aria-hidden="true">·</span>
              <a
                href="https://www.behance.net/rahulvaid1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                Behance
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>

          {/* Visual column */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-4"
            initial={{ opacity: rm ? 1 : 0, y: rm ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: rm ? 0 : 0.7, ease: EXPO_OUT, delay: rm ? 0 : 0.2 }}
          >
            {/* Abstract portrait placeholder — swap for a real photo before launch */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              <svg
                viewBox="0 0 400 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                aria-hidden="true"
              >
                <rect width="400" height="500" fill="hsl(var(--muted))" />
                <ellipse cx="200" cy="180" rx="90" ry="90" fill="hsl(var(--accent) / 0.15)" />
                <ellipse cx="200" cy="180" rx="60" ry="60" fill="hsl(var(--accent) / 0.25)" />
                <ellipse cx="200" cy="360" rx="140" ry="100" fill="hsl(var(--accent) / 0.1)" />
                <line x1="0" y1="250" x2="400" y2="250" stroke="hsl(var(--accent) / 0.2)" strokeWidth="1" />
                <line x1="200" y1="0" x2="200" y2="500" stroke="hsl(var(--accent) / 0.2)" strokeWidth="1" />
                <circle cx="120" cy="80" r="8" fill="hsl(var(--accent) / 0.4)" />
                <circle cx="320" cy="400" r="12" fill="hsl(var(--accent) / 0.3)" />
                <text
                  x="200"
                  y="470"
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="sans-serif"
                  fill="hsl(var(--accent) / 0.5)"
                  letterSpacing="3"
                  fontWeight="600"
                >
                  RAHUL VAID
                </text>
              </svg>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Based in", value: "India · Remote" },
                { label: "Education", value: "BA (Hons), DU" },
                { label: "Focus", value: "Gov-tech · Systems" },
                { label: "Experience", value: "3+ years" },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-3 rounded-xl bg-card border border-border/60">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
