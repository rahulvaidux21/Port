"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Minus, X } from "lucide-react";
import { projects, caseStudies } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { EXPO_OUT, fadeUp } from "@/lib/motion";
import type { CaseStudy, CaseStudyImage } from "@/types";

// Projects with a real photo thumbnail instead of an illustrated SVG mockup.
// object-contain + a fixed backdrop matching the source image's own
// background, since these don't restyle for the site's light/dark toggle.
const REAL_THUMBNAILS: Record<string, { src: string; alt: string; bg: string }> = {
  ux4g: {
    src: "/case-studies/ux4g/thumbnail.jpg",
    alt: "UX4G Design System 3.0 listed on Figma Community: 462 likes, 9.8k users, with a UI kit preview panel",
    bg: "hsl(20 12% 8%)",
  },
  "survey-setu": {
    src: "/case-studies/survey-setu/app-screens.jpg",
    alt: "Survey Setu app splash screen and dashboard for the Ministry of Tribal Affairs, showing the PVTG Household Survey with completed, reviewed, draft, and flagged counts",
    bg: "rgb(247 255 242)",
  },
};

function ProjectMockup({ id, color }: { id: string; color: string }) {
  const realThumbnail = REAL_THUMBNAILS[id];
  if (realThumbnail) {
    return (
      <div
        className="relative w-full aspect-[3/2] rounded-xl overflow-hidden border border-border/60"
        style={{ backgroundColor: realThumbnail.bg }}
      >
        <Image
          src={realThumbnail.src}
          alt={realThumbnail.alt}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-contain"
        />
      </div>
    );
  }

  const configs: Record<string, React.ReactNode> = {
    // SalonX: consumer booking web/mobile experience
    salonx: (
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <rect width="480" height="320" rx="12" fill="hsl(285 20% 97%)" />
        {/* Top nav */}
        <rect width="480" height="52" rx="0" fill="hsl(34 30% 99%)" />
        <rect x="16" y="18" width="60" height="16" rx="4" fill={color} opacity="0.85" />
        {[140, 200, 260, 320].map((x) => (
          <rect key={x} x={x} y={22} width={40} height={8} rx="2" fill="hsl(285 10% 75%)" />
        ))}
        <rect x="420" y="14" width="44" height="24" rx="12" fill={color} opacity="0.9" />
        {/* Service card */}
        <rect x="16" y="68" width="200" height="130" rx="10" fill="hsl(34 30% 99%)" />
        <rect x="24" y="78" width="80" height="10" rx="3" fill={color} opacity="0.75" />
        <rect x="24" y="96" width="160" height="6" rx="2" fill="hsl(285 12% 85%)" />
        <rect x="24" y="108" width="140" height="6" rx="2" fill="hsl(285 12% 85%)" />
        <rect x="24" y="120" width="150" height="6" rx="2" fill="hsl(285 12% 85%)" />
        <rect x="24" y="148" width="56" height="28" rx="14" fill={color} opacity="0.85" />
        <rect x="88" y="148" width="72" height="28" rx="14" fill="hsl(285 12% 90%)" />
        {/* Booking slots card */}
        <rect x="224" y="68" width="240" height="130" rx="10" fill="hsl(34 30% 99%)" />
        <rect x="232" y="78" width="100" height="10" rx="3" fill="hsl(20 12% 15%)" />
        {[96, 116, 136, 156, 176].map((y, i) => (
          <g key={y}>
            <rect x="232" y={y} width="8" height="8" rx="4" fill={color} opacity={i < 2 ? "0.85" : "0.3"} />
            <rect x="244" y={y + 1} width={90 - i * 5} height="5" rx="1.5" fill="hsl(285 12% 85%)" />
            <rect x="392" y={y} width="56" height="8" rx="4" fill={i === 0 ? color : "hsl(285 12% 90%)"} opacity={i === 0 ? "0.5" : "1"} />
          </g>
        ))}
        {/* Stylist cards */}
        {[16, 164, 312].map((x, i) => (
          <g key={x}>
            <rect x={x} y={212} width={144} height={88} rx="10" fill="hsl(34 30% 99%)" />
            <circle cx={x + 24} cy={236} r="12" fill={color} opacity={0.3 + i * 0.2} />
            <rect x={x + 44} y={228} width={70} height={8} rx="2" fill="hsl(20 12% 20%)" />
            <rect x={x + 44} y={242} width={50} height={6} rx="2" fill="hsl(285 10% 70%)" />
            <rect x={x + 12} y={264} width={120} height={22} rx="11" fill="hsl(285 12% 92%)" />
            <rect x={x + 44} y={272} width={56} height={6} rx="3" fill={color} opacity="0.7" />
          </g>
        ))}
      </svg>
    ),
    // NIRI: ranking dashboard — KPIs, state ranking bars, approval pendency list
    niri: (
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <rect width="480" height="320" rx="12" fill="hsl(34 40% 97%)" />
        {/* Header */}
        <rect x="24" y="20" width="150" height="13" rx="4" fill="hsl(20 12% 15%)" />
        <rect x="24" y="41" width="90" height="7" rx="3" fill="hsl(20 8% 60%)" />
        <rect x="392" y="20" width="64" height="26" rx="13" fill={color} opacity="0.9" />
        {/* KPI tiles */}
        {[24, 132, 240].map((x, i) => (
          <g key={x}>
            <rect x={x} y="62" width="96" height="52" rx="9" fill="hsl(34 30% 99%)" stroke="hsl(30 15% 88%)" strokeWidth="1" />
            <rect x={x + 10} y={72} width={44} height={13} rx="3" fill={i === 0 ? color : "hsl(20 12% 20%)"} />
            <rect x={x + 10} y={94} width={64} height={6} rx="2" fill="hsl(20 8% 65%)" />
          </g>
        ))}
        {/* Ranking bars */}
        <rect x="24" y="132" width="120" height="10" rx="3" fill="hsl(20 12% 20%)" />
        {[0.92, 0.78, 0.66, 0.55, 0.42, 0.3].map((w, i) => (
          <g key={i}>
            <rect x="24" y={154 + i * 24} width="18" height="14" rx="7" fill={color} opacity={1 - i * 0.13} />
            <rect x="50" y={157 + i * 24} width={w * 240} height="8" rx="4" fill={color} opacity={0.85 - i * 0.11} />
            <rect x={50 + w * 240 + 8} y={156 + i * 24} width="26" height="9" rx="3" fill="hsl(30 12% 82%)" />
          </g>
        ))}
        {/* Pendency panel */}
        <rect x="352" y="132" width="104" height="164" rx="10" fill="hsl(34 30% 99%)" stroke="hsl(30 15% 88%)" strokeWidth="1" />
        <rect x="362" y="144" width="70" height="9" rx="3" fill="hsl(20 12% 20%)" />
        {[164, 190, 216, 242, 268].map((y, i) => (
          <g key={y}>
            <circle cx="370" cy={y + 4} r="5" fill={color} opacity={i < 2 ? "0.9" : "0.3"} />
            <rect x="382" y={y} width={62 - i * 5} height="5" rx="2" fill="hsl(30 12% 78%)" />
            <rect x="382" y={y + 9} width="40" height="4" rx="2" fill="hsl(30 12% 87%)" />
          </g>
        ))}
      </svg>
    ),
    // eBCAS: permit card + multi-stage approval pipeline
    ebcas: (
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <rect width="480" height="320" rx="12" fill="hsl(34 40% 97%)" />
        {/* Permit card */}
        <rect x="28" y="60" width="200" height="128" rx="12" fill="hsl(34 30% 99%)" stroke="hsl(30 15% 85%)" strokeWidth="1" />
        <rect x="28" y="60" width="200" height="26" rx="12" fill={color} opacity="0.9" />
        <rect x="28" y="74" width="200" height="12" fill={color} opacity="0.9" />
        <rect x="40" y="68" width="80" height="9" rx="3" fill="hsl(34 30% 98%)" opacity="0.95" />
        {/* Photo box */}
        <rect x="40" y="98" width="52" height="62" rx="6" fill="hsl(30 18% 90%)" />
        <circle cx="66" cy="118" r="10" fill="hsl(30 12% 75%)" />
        <path d="M48 152 q18 -16 36 0" fill="hsl(30 12% 75%)" />
        {/* Card lines */}
        <rect x="102" y="100" width="90" height="8" rx="3" fill="hsl(20 12% 25%)" />
        <rect x="102" y="115" width="70" height="6" rx="2" fill="hsl(20 8% 62%)" />
        <rect x="102" y="128" width="80" height="6" rx="2" fill="hsl(20 8% 62%)" />
        {/* Zone chips */}
        {[102, 126, 150].map((x) => (
          <rect key={x} x={x} y="142" width="20" height="12" rx="6" fill={color} opacity="0.25" />
        ))}
        {/* QR */}
        <g>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={196 + c * 7}
                y={130 + r * 7}
                width="5"
                height="5"
                fill="hsl(20 12% 25%)"
                opacity={(r + c) % 2 === 0 ? "1" : "0.35"}
              />
            ))
          )}
        </g>
        {/* Card meta below */}
        <rect x="28" y="204" width="128" height="8" rx="3" fill="hsl(20 8% 60%)" />
        <rect x="28" y="220" width="96" height="8" rx="3" fill="hsl(30 12% 80%)" />
        {/* Approval pipeline */}
        <line x1="292" y1="52" x2="292" y2="268" stroke="hsl(30 15% 85%)" strokeWidth="2" />
        {[
          { y: 52, done: true },
          { y: 96, done: true },
          { y: 140, done: true },
          { y: 184, done: false },
          { y: 228, done: false },
          { y: 268, done: false },
        ].map(({ y, done }, i) => (
          <g key={y}>
            <circle cx="292" cy={y} r="9" fill={done ? color : "hsl(34 30% 99%)"} stroke={done ? color : "hsl(30 15% 80%)"} strokeWidth="2" />
            {done && <path d={`M288 ${y} l3 3 l5 -6`} stroke="hsl(34 30% 98%)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
            <rect x="314" y={y - 10} width={110 - i * 6} height="8" rx="3" fill="hsl(20 12% 25%)" opacity={done ? "1" : "0.45"} />
            <rect x="314" y={y + 3} width="70" height="6" rx="2" fill="hsl(30 12% 80%)" />
          </g>
        ))}
      </svg>
    ),
    // BharatNow: mobile discovery surface — search, trending, grid, spotlight
    bharatnow: (
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <rect width="480" height="320" rx="12" fill="hsl(34 30% 96%)" />
        {/* Phone frame */}
        <rect x="160" y="20" width="160" height="280" rx="24" fill="hsl(20 12% 11%)" />
        <rect x="168" y="32" width="144" height="256" rx="16" fill="hsl(34 40% 97%)" />
        {/* Search bar */}
        <rect x="176" y="42" width="128" height="22" rx="11" fill="hsl(30 18% 92%)" />
        <circle cx="189" cy="53" r="5" stroke="hsl(20 8% 55%)" strokeWidth="1.5" fill="none" />
        <circle cx="295" cy="53" r="6" fill={color} opacity="0.9" />
        {/* Trending chips */}
        {[176, 216, 256].map((x, i) => (
          <rect key={x} x={x} y="74" width={i === 1 ? 36 : 32} height="14" rx="7" fill={color} opacity={0.18 + i * 0.06} />
        ))}
        {/* 2x2 market grid */}
        {[
          [176, 98], [242, 98], [176, 148], [242, 148],
        ].map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="62" height="44" rx="8" fill="hsl(34 30% 99%)" stroke="hsl(30 15% 88%)" strokeWidth="1" />
            <rect x={x + 8} y={y + 8} width="30" height="8" rx="3" fill={i === 0 ? color : "hsl(20 12% 25%)"} />
            <rect x={x + 8} y={y + 24} width="46" height="5" rx="2" fill="hsl(30 12% 80%)" />
          </g>
        ))}
        {/* Spotlight card with play */}
        <rect x="176" y="202" width="128" height="58" rx="10" fill={color} opacity="0.9" />
        <circle cx="204" cy="231" r="13" fill="hsl(34 30% 98%)" opacity="0.95" />
        <path d="M200 224 l12 7 l-12 7 z" fill={color} />
        <rect x="226" y="218" width="66" height="8" rx="3" fill="hsl(34 30% 98%)" opacity="0.95" />
        <rect x="226" y="232" width="48" height="6" rx="2" fill="hsl(34 30% 98%)" opacity="0.6" />
        {/* Bottom nav */}
        <rect x="168" y="266" width="144" height="22" rx="0" fill="hsl(34 30% 99%)" />
        {[192, 226, 260, 292].map((x, i) => (
          <circle key={x} cx={x} cy="277" r="4" fill={i === 1 ? color : "hsl(30 12% 75%)"} />
        ))}
        {/* Side panels */}
        <rect x="20" y="60" width="120" height="200" rx="18" fill={color} opacity="0.08" />
        <rect x="340" y="60" width="120" height="200" rx="18" fill={color} opacity="0.08" />
      </svg>
    ),
  };

  return (
    <div
      className="w-full aspect-[3/2] rounded-xl overflow-hidden border border-border/60 bg-surface"
      style={{ background: `hsl(from ${color} h s l / 0.04)` }}
    >
      {configs[id] || (
        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
          Project Preview
        </div>
      )}
    </div>
  );
}

// Static class lookup since Tailwind can't resolve a dynamic `sm:grid-cols-${n}`
const METRIC_GRID: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

const GALLERY_ASPECT: Record<string, { frame: string; width: string }> = {
  wide: { frame: "aspect-[16/10]", width: "w-[85%] sm:w-[55%] lg:w-[42%]" },
  portrait: { frame: "aspect-[3/4]", width: "w-[60%] sm:w-[38%] lg:w-[28%]" },
  square: { frame: "aspect-square", width: "w-[70%] sm:w-[45%] lg:w-[34%]" },
  landscape: { frame: "aspect-[16/9]", width: "w-[90%] sm:w-[65%] lg:w-[52%]" },
  web: { frame: "aspect-[6/5]", width: "w-[85%] sm:w-[58%] lg:w-[46%]" },
  // Full mobile viewport (~9:19.5, e.g. a splash or form screen)
  mobile: { frame: "aspect-[9/19.5]", width: "w-[46%] sm:w-[28%] lg:w-[20%]" },
  // Taller than a single viewport (a scrolling multi-section form)
  tall: { frame: "aspect-[8/25]", width: "w-[50%] sm:w-[30%] lg:w-[22%]" },
};

function StoryGallery({
  images,
  project,
  onSelect,
}: {
  images: CaseStudyImage[];
  project: string;
  onSelect: (img: CaseStudyImage) => void;
}) {
  return (
    <div
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
      aria-label={`${project} design images`}
    >
      {images.map((img) => {
        const { frame, width } = GALLERY_ASPECT[img.aspect ?? "wide"];
        return (
          <button
            key={img.src}
            type="button"
            onClick={() => onSelect(img)}
            className={`snap-start shrink-0 ${width} text-left group/img`}
            aria-label={`View larger: ${img.alt}`}
          >
            <span className={`relative block ${frame} rounded-xl overflow-hidden border border-border bg-surface`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 85vw"
                className="object-cover object-top transition-transform duration-500 ease-expo-out group-hover/img:scale-[1.02] motion-reduce:transition-none"
              />
            </span>
            {img.caption && (
              <span className="mt-2 block text-xs text-muted-foreground">{img.caption}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Renders a case study's expanded content. Long-form narrative sections
 * (see DESIGN.md "Case Study Narrative") take over when present; every
 * other study falls back to the three-box Challenge/Approach/Outcome grid.
 */
function CaseStudyBody({
  study,
  onSelectImage,
}: {
  study: CaseStudy;
  onSelectImage: (img: CaseStudyImage) => void;
}) {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-balance max-w-2xl">{study.title}</h4>

      {study.images && study.images.length > 0 && (
        <StoryGallery images={study.images} project={study.project} onSelect={onSelectImage} />
      )}

      {study.narrative ? (
        <div className="space-y-8">
          {study.narrative.map((section) => (
            <div
              key={section.heading}
              className="border-t border-border pt-6 first:border-t-0 first:pt-0"
            >
              <h5 className="text-base font-bold text-foreground mb-2 text-balance">
                {section.heading}
              </h5>
              <p className="text-sm leading-relaxed text-foreground text-pretty max-w-prose">
                {section.body}
              </p>
              {section.images && section.images.length > 0 && (
                <div className="mt-5">
                  <StoryGallery
                    images={section.images}
                    project={study.project}
                    onSelect={onSelectImage}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Challenge
            </h5>
            <p className="text-sm leading-relaxed text-foreground text-pretty">{study.challenge}</p>
          </div>
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Approach
            </h5>
            <p className="text-sm leading-relaxed text-foreground text-pretty">{study.approach}</p>
          </div>
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Outcome
            </h5>
            <p className="text-sm leading-relaxed text-foreground text-pretty">{study.outcome}</p>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {study.duration} · {study.team}
      </p>
    </div>
  );
}

export function Work() {
  const rm = useReducedMotion();
  const [openStory, setOpenStory] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<CaseStudyImage | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  const toggleStory = (id: string) =>
    setOpenStory((prev) => (prev === id ? null : id));

  // Native <dialog> gives us focus trap, Escape handling, and backdrop for free
  useEffect(() => {
    const dialog = dialogRef.current;
    if (lightbox && dialog && !dialog.open) dialog.showModal();
  }, [lightbox]);

  return (
    <section
      id="work"
      className="section-padding py-section border-t border-border"
      aria-label="Selected work"
    >
      <div className="content-grid">
        <SectionLabel
          label="Selected work"
          trailing={
            <span className="text-xs text-muted-foreground shrink-0">
              {projects.length} projects
            </span>
          }
        />

        <motion.h2
          className="text-display-md font-bold mb-16 max-w-2xl text-balance"
          {...fadeUp(rm)}
        >
          Government platforms, design systems, and consumer products
        </motion.h2>

        <div className="space-y-20 lg:space-y-28">
          {featured.map((project, i) => {
            const study = caseStudies.find((cs) => cs.id === project.caseStudySlug);
            const storyOpen = openStory === project.id;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: rm ? 1 : 0, y: rm ? 0 : 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: rm ? 0 : 0.7, ease: EXPO_OUT, delay: rm ? 0 : 0.05 }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    i % 2 === 1 ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  {/* Mockup */}
                  <div className={`lg:col-span-7 ${i % 2 === 1 ? "[direction:ltr]" : ""}`}>
                    <motion.div
                      whileHover={rm ? undefined : { scale: 1.01 }}
                      transition={{ duration: rm ? 0 : 0.4, ease: EXPO_OUT }}
                    >
                      <ProjectMockup id={project.id} color={project.color} />
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? "[direction:ltr]" : ""}`}>
                    <div className="flex items-baseline justify-between gap-4 mb-4">
                      <span
                        className="text-5xl font-extrabold leading-none text-accent/20 select-none"
                        aria-hidden="true"
                      >
                        {project.number}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {project.year} · {project.role}
                      </p>
                    </div>

                    <h3 className="text-display-sm font-bold mb-2 text-balance">{project.title}</h3>
                    <p className="text-base text-muted-foreground mb-3 font-medium">
                      {project.subtitle}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground mb-6 text-pretty">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs font-medium border border-border bg-muted/50 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {study && (
                  <div className="mt-10 border-t border-border pt-8">
                    {/* Impact metrics: always visible, never behind a click */}
                    <div
                      className={`grid grid-cols-1 ${METRIC_GRID[study.metrics.length] ?? "sm:grid-cols-3"} gap-y-6 sm:divide-x sm:divide-border`}
                    >
                      {study.metrics.map((m) => (
                        <div key={m.label} className="sm:px-6 first:sm:pl-0 last:sm:pr-0">
                          <p className="text-3xl lg:text-4xl font-bold text-accent mb-1">
                            {m.value}
                          </p>
                          <p className="text-xs text-muted-foreground leading-snug">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Expandable narrative */}
                    <button
                      onClick={() => toggleStory(project.id)}
                      aria-expanded={storyOpen}
                      aria-controls={`story-${project.id}`}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors group min-h-11"
                    >
                      <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-accent group-hover:text-accent transition-colors">
                        {storyOpen ? <Minus size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
                      </span>
                      {storyOpen ? "Close the full story" : "Read the full story"}
                    </button>

                    <div
                      id={`story-${project.id}`}
                      inert={!storyOpen}
                      className={`grid transition-[grid-template-rows] duration-500 ease-expo-out motion-reduce:transition-none ${
                        storyOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-8">
                          <CaseStudyBody study={study} onSelectImage={setLightbox} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* Compact rows: present without the scroll cost */}
        {more.length > 0 && (
          <div className="mt-24">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              More work
            </h3>
            {more.map((project) => {
              const study = caseStudies.find((cs) => cs.id === project.caseStudySlug);
              const storyOpen = openStory === project.id;

              return (
                <article key={project.id} className="border-t border-border">
                  <button
                    type="button"
                    onClick={() => toggleStory(project.id)}
                    aria-expanded={storyOpen}
                    aria-controls={`story-${project.id}`}
                    className="w-full py-6 grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 text-left group min-h-11"
                  >
                    <span
                      className="text-2xl font-extrabold leading-none text-accent/25 select-none"
                      aria-hidden="true"
                    >
                      {project.number}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base sm:text-lg font-bold text-foreground group-hover:text-accent transition-colors text-balance">
                        {project.title}
                      </span>
                      <span className="block text-sm text-muted-foreground truncate">
                        {project.subtitle}
                      </span>
                    </span>
                    <span className="flex items-center gap-4 shrink-0">
                      <span className="hidden sm:block text-xs text-muted-foreground">
                        {project.year} · {project.role}
                      </span>
                      <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-accent group-hover:text-accent transition-colors">
                        {storyOpen ? <Minus size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
                      </span>
                    </span>
                  </button>

                  <div
                    id={`story-${project.id}`}
                    inert={!storyOpen}
                    className={`grid transition-[grid-template-rows] duration-500 ease-expo-out motion-reduce:transition-none ${
                      storyOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-8 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                          <div className="lg:col-span-5">
                            <ProjectMockup id={project.id} color={project.color} />
                          </div>
                          <div className="lg:col-span-7 space-y-4">
                            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-1 rounded-full text-xs font-medium border border-border bg-muted/50 text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            {study && (
                              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                                {study.metrics.map((m) => (
                                  <div key={m.label}>
                                    <p className="text-2xl font-bold text-accent">{m.value}</p>
                                    <p className="text-xs text-muted-foreground">{m.label}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {study && <CaseStudyBody study={study} onSelectImage={setLightbox} />}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
            <div className="border-t border-border" />
          </div>
        )}
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        onClose={() => setLightbox(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
        className="m-auto w-[min(92vw,64rem)] rounded-2xl border border-border bg-card p-0 backdrop:bg-foreground/70"
        aria-label="Design image viewer"
      >
        {lightbox && (
          <figure>
            <div className="relative w-full h-[70vh] bg-surface">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                sizes="92vw"
                className="object-contain"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-5 py-4 border-t border-border">
              <span className="text-sm text-foreground">
                {lightbox.caption ?? lightbox.alt}
              </span>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="shrink-0 w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="Close image viewer"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}
