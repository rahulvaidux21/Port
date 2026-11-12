"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPO_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────────────
   Survey Setu motion kit. Every piece follows the same three rules:

   1. Before hydration (and with JS off) everything renders in its final,
      readable state — no opacity:0 baked into the server HTML.
   2. Under prefers-reduced-motion nothing moves; content is simply there.
   3. Only transform and opacity animate, so nothing triggers layout.

   Never put a motion component on an element that also carries a
   Tailwind transform class (rotate-*, translate-*): Framer and GSAP write
   `transform` inline and would silently override it. Wrap instead.
   ──────────────────────────────────────────────────────────────────── */

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** True once hydrated and the reader hasn't asked for reduced motion. */
function useMotionOK() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  return mounted && !reduced;
}

/* ── Reveal ────────────────────────────────────────────────────────── */
type Tag = "div" | "li" | "span";

/** Fades (and optionally slides, scales or tilts) its content in the
    first time it scrolls into view. Stagger siblings with `delay`. */
export function Reveal({
  children,
  className,
  style,
  role,
  as = "div",
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  rotate = 0,
  duration = 0.7,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  role?: string;
  as?: Tag;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  duration?: number;
}) {
  const ok = useMotionOK();
  if (!ok) {
    const Plain = as;
    return (
      <Plain className={className} style={style} role={role}>
        {children}
      </Plain>
    );
  }
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      style={style}
      role={role}
      initial={{ opacity: 0, y, x, scale, rotate }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration, ease: EXPO_OUT, delay }}
    >
      {children}
    </M>
  );
}

/* ── Scroll-scrubbed headline ──────────────────────────────────────── */

/** The two-tone headline ("plain **ink** plain"), word by word: each word
    starts faint and reaches its own colour as the headline scrolls up the
    screen — muted words stay muted, ink words land at full strength. A
    `tail` (the script bubble) rides with the last word, never wrapping
    onto a line of its own. */
export function ScrubText({
  text,
  tone = "paper",
  tail,
}: {
  text: string;
  tone?: "paper" | "ink";
  tail?: ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (reduced || !el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-w]"),
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 58%", scrub: 0.5 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <span ref={ref}>
      {parts.map((part, p) => {
        const ink = part.startsWith("**");
        const body = ink ? part.slice(2, -2) : part;
        const cls = ink
          ? tone === "ink"
            ? "text-white"
            : "text-text-primary"
          : tone === "ink"
            ? "text-white/60"
            : "text-sv-mute";
        const tokens = body.split(/(\s+)/);
        const lastWord =
          p === parts.length - 1 ? tokens.map((t) => /\S/.test(t)).lastIndexOf(true) : -1;
        return tokens.map((t, i) => {
          if (!/\S/.test(t)) return t;
          if (tail && i === lastWord) {
            return (
              <span key={`${p}-${i}`} data-w className="whitespace-nowrap">
                <span className={cls}>{t}</span>
                {tail}
              </span>
            );
          }
          return (
            <span key={`${p}-${i}`} data-w className={cls}>
              {t}
            </span>
          );
        });
      })}
    </span>
  );
}

/* ── Parallax ──────────────────────────────────────────────────────── */

/** Drifts its content against the scroll: `speed` px down at the start of
    its pass through the viewport, `speed` px up at the end. Negative
    speeds drift the other way. Slow layers behind, fast layers in front. */
export function Parallax({
  children,
  className,
  speed = 40,
  as = "div",
}: {
  children?: ReactNode;
  className?: string;
  speed?: number;
  as?: Tag;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const ok = useMotionOK();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const M = motion[as] as typeof motion.div;
  return (
    <M ref={ref} className={className} style={ok ? { y } : undefined}>
      {children}
    </M>
  );
}

/* ── Count-up ──────────────────────────────────────────────────────── */

/** "40+ lakh" counts 0 → 40 then keeps its suffix. Values without a
    leading number (or zero) render as-is. */
export function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const ok = useMotionOK();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!ok || !inView || target === 0) return;
    const controls = animate(0, target, {
      duration,
      ease: EXPO_OUT,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [ok, inView, target, duration]);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref} className="tabular-nums">
      {ok && target !== 0 ? n : target}
      {suffix}
    </span>
  );
}

/* ── Day bar (Process) ─────────────────────────────────────────────── */

/** `given` segments, the first `used` filled — they fill one by one the
    first time the bar is seen. */
export function DayBar({ given, used }: { given: number; used: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const ok = useMotionOK();
  return (
    <div
      ref={ref}
      aria-hidden
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${given}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: given }, (_, i) => (
        <span
          key={i}
          className="relative h-3 overflow-hidden rounded-full bg-sv-band ring-1 ring-inset ring-hairline/10 md:h-4"
        >
          {i < used && (
            <motion.span
              className="absolute inset-0 origin-left rounded-full bg-sv-forest"
              initial={false}
              animate={ok ? { scaleX: inView ? 1 : 0 } : undefined}
              transition={{ duration: 0.35, ease: EXPO_OUT, delay: ok ? 0.15 + i * 0.12 : 0 }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

/* ── Signal bars (The Context) ─────────────────────────────────────── */

/** Four signal bars that drop out tallest-first, then "No signal". The
    resting state is the dropped one, so a static page tells the same story. */
export function SignalBars() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const ok = useMotionOK();
  const bars = [0.35, 0.55, 0.78, 1];
  return (
    <span ref={ref} aria-hidden className="inline-flex items-end gap-1.5">
      <span className="inline-flex h-7 items-end gap-1">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-text-primary"
            style={{ height: `${h * 100}%`, opacity: ok ? undefined : 0.18 }}
            initial={ok ? { opacity: 1 } : false}
            animate={ok ? { opacity: inView ? 0.18 : 1 } : undefined}
            transition={{ duration: 0.4, delay: 0.5 + (bars.length - 1 - i) * 0.28 }}
          />
        ))}
      </span>
      <motion.span
        className="text-xs font-medium uppercase tracking-[0.06em] text-sv-problem dark:text-[#f0968f]"
        initial={ok ? { opacity: 0, x: -6 } : false}
        animate={ok ? { opacity: inView ? 1 : 0, x: inView ? 0 : -6 } : undefined}
        transition={{ duration: 0.4, delay: 1.7 }}
      >
        No signal
      </motion.span>
    </span>
  );
}

/* ── Script cycle (Accessibility) ──────────────────────────────────── */
const SCRIPTS = [
  { g: "अ", n: "Hindi" },
  { g: "অ", n: "Bengali" },
  { g: "ଓ", n: "Odia" },
  { g: "த", n: "Tamil" },
  { g: "తె", n: "Telugu" },
  { g: "ಕ", n: "Kannada" },
  { g: "ગુ", n: "Gujarati" },
  { g: "ਪੰ", n: "Punjabi" },
  { g: "മ", n: "Malayalam" },
  { g: "म", n: "Marathi" },
];

/** One script at a time, cycling while on screen. */
export function ScriptCycle() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const ok = useMotionOK();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!ok || !inView) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % SCRIPTS.length), 1600);
    return () => window.clearInterval(id);
  }, [ok, inView]);

  const s = SCRIPTS[i];
  return (
    <span ref={ref} aria-hidden className="inline-flex items-center gap-3">
      <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-sv-forest text-xl font-semibold text-white">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={s.g}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.45, ease: EXPO_OUT }}
          >
            {s.g}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-xs uppercase tracking-[0.06em] text-sv-mute">{s.n}</span>
    </span>
  );
}

/* ── Reading progress + chapter rail ───────────────────────────────── */

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-left bg-sv-forest"
      style={{ scaleX }}
    />
  );
}

/** A floating table of contents on wide screens. Each chapter is a wrapper
    around a run of sections; the one crossing the middle of the screen is
    current. Links are plain #anchors, which SmoothScroll hands to Lenis. */
export function ChapterRail({ chapters }: { chapters: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const c of chapters) {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav
      aria-label="Case study chapters"
      className={cn(
        "fixed left-5 top-1/2 z-[90] hidden -translate-y-1/2 transition-opacity duration-500 min-[1400px]:block",
        active ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <ol className="flex flex-col gap-0.5 rounded-[18px] bg-sv-card/85 p-1.5 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.35)] ring-1 ring-hairline/10 backdrop-blur-md">
        {chapters.map((c, i) => {
          const on = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-xs font-medium transition-colors duration-300",
                  on
                    ? "bg-text-primary text-paper"
                    : "text-text-secondary hover:bg-sv-band hover:text-text-primary"
                )}
              >
                <span className="tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                {c.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
