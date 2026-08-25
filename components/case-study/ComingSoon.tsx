"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
import { socialLinks } from "@/lib/data";

/** Custom vector for the "still being written" empty state — a clipboard
    mid-survey (two questions answered, one still being sketched) with a
    pencil actively at work and a signal glyph fading toward a solid dot,
    a quiet nod to Survey Setu's offline-first premise. Built as one
    hand-placed SVG rather than a stock "under construction" icon so it
    says something specific about the app it's standing in for. */
function BuildingItIllustration({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 280 240" className="h-full w-full" aria-hidden="true">
      {/* Clipboard body */}
      <rect
        x="66"
        y="34"
        width="140"
        height="188"
        rx="14"
        className="fill-surface stroke-text-primary/70"
        strokeWidth="3"
      />
      <rect x="112" y="22" width="48" height="20" rx="8" className="fill-text-primary/70" />

      {/* Question 1 — answered */}
      <rect x="86" y="76" width="18" height="18" rx="5" className="stroke-text-muted" strokeWidth="2.5" fill="none" />
      <path
        d="M90.5 85.5l4 4 8-9"
        className="stroke-accent"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="116" y1="85" x2="188" y2="85" className="stroke-text-muted/60" strokeWidth="3" strokeLinecap="round" />

      {/* Question 2 — answered */}
      <rect x="86" y="114" width="18" height="18" rx="5" className="stroke-text-muted" strokeWidth="2.5" fill="none" />
      <path
        d="M90.5 123.5l4 4 8-9"
        className="stroke-accent"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="116" y1="123" x2="178" y2="123" className="stroke-text-muted/60" strokeWidth="3" strokeLinecap="round" />

      {/* Question 3 — mid-answer, the one being written right now */}
      <rect x="86" y="152" width="18" height="18" rx="5" className="stroke-text-muted" strokeWidth="2.5" fill="none" />
      <line
        x1="116"
        y1="161"
        x2="152"
        y2="161"
        className="stroke-text-muted/60"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />

      {/* Pencil, tip at the unfinished line */}
      <motion.g
        animate={animate ? { rotate: [0, -3, 0], x: [0, -1.5, 0], y: [0, 1, 0] } : undefined}
        transition={animate ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" } : undefined}
        style={{ transformOrigin: "160px 160px" }}
      >
        <rect
          x="152"
          y="128"
          width="16"
          height="66"
          rx="4"
          transform="rotate(38 160 161)"
          className="fill-paper stroke-text-primary/70"
          strokeWidth="2.5"
        />
        <path
          d="M148.5 172.5l-9 15.5 17.5-6.5z"
          className="fill-accent stroke-accent"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Sparkle — the pencil is actively moving */}
      <motion.g
        className="fill-accent"
        animate={animate ? { opacity: [0.25, 1, 0.25], scale: [0.85, 1.05, 0.85] } : { opacity: 0.8 }}
        transition={animate ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : undefined}
        style={{ transformOrigin: "218px 118px" }}
      >
        <path d="M218 106l3.4 8.6 8.6 3.4-8.6 3.4-3.4 8.6-3.4-8.6-8.6-3.4 8.6-3.4z" />
      </motion.g>

      {/* Signal glyph — arcs fading toward a solid dot, offline-first */}
      <g transform="translate(196 178)">
        <circle cx="0" cy="18" r="4.5" className="fill-accent" />
        <path
          d="M-12 6a17 17 0 0 1 24 0"
          className="stroke-text-primary/70"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M-21 -3a29 29 0 0 1 42 0"
          className="stroke-text-muted/40"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 7"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function ComingSoon({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  const reduced = useReducedMotion();
  const email = socialLinks.find((link) => link.icon === "mail")?.href ?? "#";

  return (
    // `BackToWork`, rendered just above this on every page that uses it,
    // already owns the navbar's own clearance — this only needs a small
    // secondary gap under it, not a second full pt-section.
    <div className="relative mx-auto flex w-full max-w-[560px] flex-col items-center px-6 pb-section pt-8 text-center">
      <div className="relative mb-10 h-[220px] w-[260px]">
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent-glow opacity-[0.55] blur-[46px]"
          aria-hidden="true"
        />
        <BuildingItIllustration animate={!reduced} />
      </div>

      <p className="font-sans text-sm font-medium uppercase tracking-[0.08em] text-text-muted">{eyebrow}</p>
      <h1 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.5px] text-text-primary">
        {title}
      </h1>
      <p className="mt-4 max-w-[46ch] font-sans text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.6] text-text-secondary">
        {body}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 rounded-lg border border-accent-border bg-accent px-5 py-3 font-sans text-sm font-medium text-accent-foreground shadow-[0_5px_30px_5px_rgba(0,85,254,0.32)] transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back to Work
        </Link>
        <a
          href={email}
          className="inline-flex items-center gap-2 rounded-lg border border-hairline/[0.16] px-5 py-3 font-sans text-sm font-medium text-text-primary transition-colors hover:bg-surface"
        >
          <Mail className="h-4 w-4" strokeWidth={2} />
          Ask me about it
        </a>
      </div>
    </div>
  );
}
