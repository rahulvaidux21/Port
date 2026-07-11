"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { projects, caseStudies } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { EXPO_OUT, fadeUp } from "@/lib/motion";

function ProjectMockup({ id, color }: { id: string; color: string }) {
  const configs: Record<string, React.ReactNode> = {
    // Survey Setu: mobile-first field survey app with a supervisor dashboard behind it
    "survey-setu": (
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <rect width="480" height="320" rx="12" fill="hsl(34 30% 96%)" />
        {/* Phone frame */}
        <rect x="160" y="20" width="160" height="280" rx="24" fill="hsl(20 12% 11%)" />
        <rect x="168" y="32" width="144" height="256" rx="16" fill="hsl(220 60% 16%)" />
        {/* Progress bar */}
        <rect x="176" y="40" width="128" height="4" rx="2" fill="hsl(220 40% 30%)" />
        <rect x="176" y="40" width="84" height="4" rx="2" fill={color} />
        {/* Question heading */}
        <rect x="176" y="56" width="128" height="14" rx="3" fill="hsl(34 30% 96%)" opacity="0.9" />
        <rect x="176" y="76" width="80" height="8" rx="2" fill="hsl(34 30% 96%)" opacity="0.4" />
        {/* Survey answer rows */}
        {[96, 124, 152, 180, 208].map((y, i) => (
          <g key={y}>
            <rect x="176" y={y} width="128" height="22" rx="6" fill="hsl(220 55% 24%)" />
            <circle cx="188" cy={y + 11} r="5" fill={i === 1 ? color : "hsl(220 55% 24%)"} stroke="hsl(220 45% 45%)" strokeWidth="1.5" />
            <rect x="198" y={y + 8} width={82 - i * 7} height="5" rx="2" fill="hsl(34 30% 96%)" opacity="0.7" />
          </g>
        ))}
        {/* Submit button */}
        <rect x="176" y="244" width="128" height="24" rx="12" fill={color} />
        <rect x="216" y="253" width="48" height="6" rx="3" fill="hsl(34 30% 98%)" opacity="0.9" />
        {/* Dashboard hints behind the phone */}
        <g opacity="0.35">
          <rect x="20" y="60" width="120" height="80" rx="10" fill="hsl(34 30% 99%)" />
          <rect x="30" y="72" width="60" height="8" rx="2" fill="hsl(220 60% 40%)" opacity="0.6" />
          {[0.5, 0.8, 0.35, 0.65].map((h, i) => (
            <rect key={i} x={32 + i * 26} y={128 - h * 40} width="14" height={h * 40} rx="2" fill="hsl(220 60% 40%)" opacity={i === 1 ? "0.8" : "0.35"} />
          ))}
          <rect x="20" y="152" width="120" height="60" rx="10" fill="hsl(34 30% 99%)" />
          {[164, 178, 192].map((y) => (
            <rect key={y} x="30" y={y} width="100" height="6" rx="2" fill="hsl(220 20% 80%)" />
          ))}
        </g>
        <g opacity="0.35">
          <rect x="340" y="60" width="120" height="152" rx="10" fill="hsl(34 30% 99%)" />
          <rect x="350" y="72" width="70" height="8" rx="2" fill="hsl(220 60% 40%)" opacity="0.6" />
          {[92, 112, 132, 152, 172].map((y, i) => (
            <g key={y}>
              <rect x="350" y={y} width="8" height="8" rx="2" fill="hsl(220 60% 40%)" opacity={i < 3 ? "0.7" : "0.25"} />
              <rect x="364" y={y + 1} width={82 - i * 6} height="5" rx="2" fill="hsl(220 20% 80%)" />
            </g>
          ))}
        </g>
      </svg>
    ),
    // UX4G Design System: a components board — swatches, buttons, inputs, tiles
    ux4g: (
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <rect width="480" height="320" rx="12" fill="hsl(34 40% 97%)" />
        {/* Board header */}
        <rect x="24" y="24" width="140" height="14" rx="4" fill="hsl(20 12% 15%)" />
        <rect x="24" y="46" width="90" height="8" rx="3" fill="hsl(20 8% 60%)" />
        {/* Color swatch row */}
        {[
          ["hsl(15 65% 45%)", 1], ["hsl(15 60% 58%)", 1], ["hsl(15 60% 88%)", 1],
          ["hsl(20 12% 15%)", 1], ["hsl(30 15% 87%)", 1],
        ].map(([fill], i) => (
          <rect key={i} x={24 + i * 40} y="70" width="32" height="32" rx="8" fill={fill as string} />
        ))}
        {/* Buttons */}
        <rect x="24" y="122" width="96" height="30" rx="15" fill={color} />
        <rect x="52" y="133" width="40" height="7" rx="3" fill="hsl(34 30% 98%)" />
        <rect x="130" y="122" width="96" height="30" rx="15" fill="none" stroke="hsl(30 15% 80%)" strokeWidth="1.5" />
        <rect x="158" y="133" width="40" height="7" rx="3" fill="hsl(20 12% 25%)" />
        {/* Input */}
        <rect x="24" y="166" width="202" height="30" rx="8" fill="hsl(30 18% 93%)" stroke="hsl(30 15% 85%)" strokeWidth="1" />
        <rect x="36" y="177" width="80" height="7" rx="3" fill="hsl(20 8% 62%)" />
        {/* Toggle + checkbox */}
        <rect x="24" y="210" width="44" height="24" rx="12" fill={color} />
        <circle cx="56" cy="222" r="9" fill="hsl(34 30% 99%)" />
        <rect x="80" y="212" width="20" height="20" rx="6" fill={color} />
        <path d="M85 222 l4 4 l7 -8" stroke="hsl(34 30% 98%)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Component tiles column */}
        {[24, 122, 220].map((y, i) => (
          <g key={y}>
            <rect x="260" y={y} width="196" height="84" rx="10" fill="hsl(34 30% 99%)" stroke="hsl(30 15% 87%)" strokeWidth="1" />
            <circle cx="282" cy={y + 24} r="8" fill={color} opacity={0.25 + i * 0.25} />
            <rect x="298" y={y + 18} width="90" height="9" rx="3" fill="hsl(20 12% 20%)" />
            <rect x="272" y={y + 42} width="168" height="6" rx="2" fill="hsl(30 12% 82%)" />
            <rect x="272" y={y + 56} width="130" height="6" rx="2" fill="hsl(30 12% 82%)" />
          </g>
        ))}
        {/* Type specimen */}
        <rect x="24" y="252" width="60" height="40" rx="6" fill="hsl(20 12% 15%)" />
        <rect x="96" y="258" width="110" height="10" rx="3" fill="hsl(20 12% 25%)" />
        <rect x="96" y="276" width="80" height="7" rx="3" fill="hsl(20 8% 60%)" />
      </svg>
    ),
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

export function Work() {
  const rm = useReducedMotion();
  const [openStory, setOpenStory] = useState<string | null>(null);

  const toggleStory = (id: string) =>
    setOpenStory((prev) => (prev === id ? null : id));

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
          {projects.map((project, i) => {
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

                    <h3 className="text-display-sm font-bold mb-2">{project.title}</h3>
                    <p className="text-base text-muted-foreground mb-3 font-medium">
                      {project.subtitle}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground mb-6">
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 sm:divide-x sm:divide-border">
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
                      aria-hidden={!storyOpen}
                      className={`grid transition-[grid-template-rows] duration-500 ease-expo-out motion-reduce:transition-none ${
                        storyOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-8 space-y-6">
                          <p className="text-lg font-semibold text-balance max-w-2xl">
                            {study.title}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                                Challenge
                              </h4>
                              <p className="text-sm leading-relaxed text-foreground">
                                {study.challenge}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                                Approach
                              </h4>
                              <p className="text-sm leading-relaxed text-foreground">
                                {study.approach}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                                Outcome
                              </h4>
                              <p className="text-sm leading-relaxed text-foreground">
                                {study.outcome}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {study.duration} · {study.team}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
