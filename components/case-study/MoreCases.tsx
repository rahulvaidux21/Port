"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRevealOnScroll } from "@/lib/motion";
import { caseStudies } from "@/lib/data";
import { caseStudyDetails } from "@/lib/caseStudies";
import type { CaseStudy } from "@/types";

function Card({ study }: { study: CaseStudy }) {
  const hasDetail = Boolean(caseStudyDetails[study.id]);
  const href = hasDetail ? `/case-studies/${study.id}` : "/#work";

  return (
    // `sm:flex-1`, not `flex-1`: the row is a flex *column* on mobile, where
    // flex-basis:0% resolves against the height and collapsed the card to 2px
    // — its absolutely-positioned caption then spilled out over the section
    // below. Basis only belongs here once `sm:flex-row` makes it a width.
    <Link href={href} className="group relative block h-[450px] overflow-hidden rounded-card border border-hairline/[0.04] sm:flex-1">
      {study.image ? (
        <Image
          src={study.image}
          alt={`${study.heading} preview`}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: study.color }} aria-hidden="true" />
      )}
      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-paper via-paper/[0.48] via-35% to-transparent to-[51%] p-6">
        <div className="flex flex-wrap items-center justify-end gap-2">
          {study.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-paper/[0.16] px-3 py-2 font-sans text-sm text-text-primary backdrop-blur-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-sans text-xl font-semibold text-text-primary">{study.heading}</h3>
          <p className="font-sans text-base leading-relaxed text-text-secondary">{study.overview}</p>
        </div>
      </div>
    </Link>
  );
}

/** Two other case studies, same tag-pill + gradient-overlay card language as
    the landing page's ProjectCard — the reference's own "More Cases"
    section. */
export function MoreCases({ currentSlug }: { currentSlug: string }) {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);
  const others = caseStudies.filter((s) => s.id !== currentSlug).slice(0, 2);

  if (others.length === 0) return null;

  return (
    <motion.div key={reveal.key} {...reveal.props}>
      <h2 className="mb-8 font-sans text-4xl font-medium tracking-[-1px] text-text-primary md:text-[48px]">
        More <span className="font-instrument-serif italic">Cases</span>
      </h2>
      <div className="flex flex-col gap-4 sm:flex-row">
        {others.map((study) => (
          <Card key={study.id} study={study} />
        ))}
      </div>
    </motion.div>
  );
}
