"use client";

import { motion, useReducedMotion } from "framer-motion";
import { principles } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

export function Principles() {
  const rm = useReducedMotion();

  return (
    // The `dark` class scopes the dark token set to this section: a full-bleed
    // ink band in light mode. bg-surface (not bg-background) keeps it one tonal
    // step above the page when the whole site is already dark.
    <section
      id="approach"
      className="dark bg-surface text-foreground section-padding py-section border-t border-border"
      aria-label="How I work"
    >
      <div className="content-grid">
        <SectionLabel label="How I work" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div className="lg:col-span-4" {...fadeUp(rm)}>
            <h2 className="text-display-md font-bold text-balance">
              Four working principles, each earned on a real project
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Not a diagram. These are the defaults I reach for when a project
              gets ambiguous, and the evidence for why they hold.
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            variants={staggerContainer(rm)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
          >
            {principles.map((p) => (
              <motion.div
                key={p.number}
                variants={staggerItem(rm)}
                className="grid grid-cols-[3rem_1fr] gap-x-4 sm:gap-x-6 py-8 border-t border-border first:border-t-0 first:pt-0 last:pb-0"
              >
                <span
                  className="text-2xl font-extrabold text-accent leading-none pt-0.5"
                  aria-hidden="true"
                >
                  {p.number}
                </span>
                <div>
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-3 max-w-prose">
                    {p.description}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground max-w-prose">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-2">
                      In practice
                    </span>
                    {p.evidence}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
