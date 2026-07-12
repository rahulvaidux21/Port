"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";
import { experience } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

export function Resume() {
  const rm = useReducedMotion();

  return (
    <section
      id="experience"
      className="section-padding py-section border-t border-border"
      aria-label="Resume and experience"
    >
      <div className="content-grid">
        <SectionLabel
          label="Experience"
          trailing={
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors shrink-0 min-h-11 -my-3"
            >
              <Download size={12} aria-hidden="true" />
              Download PDF
            </a>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Heading */}
          <motion.div className="lg:col-span-4 space-y-6" {...fadeUp(rm)}>
            <h2 className="text-display-md font-bold text-balance">
              Where I&apos;ve worked
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              3+ years from early-stage products to India&apos;s national design system,
              working with founders, engineers, and senior government stakeholders.
            </p>

            {/* Education */}
            <div className="mt-8 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Education
              </p>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  BA (Hons), History
                </p>
                <p className="text-sm text-muted-foreground">
                  University of Delhi
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">2011 to 2014</p>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Certifications
              </p>
              {[
                "Interaction Design Foundation: User Research, HCI, UI Design Patterns, Mobile UX (2024 to 2025)",
                "Udemy: UI/UX Design Essentials, Figma & Adobe XD (2022)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-1.5" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>

            {/* Speaking */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Speaking
              </p>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-1.5" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">
                  UX sensitization workshop for 70+ officials, NeGD / MeitY, IT Bhawan Shimla, 2026
                </p>
              </div>
            </div>
          </motion.div>

          {/* Timeline: the rail lives in its own column so dot and line
              self-align at every breakpoint */}
          <motion.div
            className="lg:col-span-8"
            variants={staggerContainer(rm)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
          >
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                variants={staggerItem(rm)}
                className="grid grid-cols-[1rem_1fr] gap-x-4 sm:gap-x-6"
              >
                {/* Rail */}
                <div className="flex flex-col items-center" aria-hidden="true">
                  <div className="w-4 h-4 rounded-full border-2 border-accent bg-background shrink-0 mt-1" />
                  {i < experience.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className={i < experience.length - 1 ? "pb-10" : ""}>
                  <p className="text-xs text-muted-foreground font-medium tabular-nums mb-2">
                    {exp.period}
                  </p>
                  <div className="mb-3">
                    {/* Company inside the heading so screen-reader nav doesn't
                        hear three identical "UI/UX Designer" headings */}
                    <h3 className="text-base">
                      <span className="block font-bold text-foreground">{exp.role}</span>
                      <span className="block text-sm text-accent font-semibold">
                        {exp.company}
                      </span>
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-foreground">
                        <ArrowUpRight
                          size={13}
                          className="text-accent mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
