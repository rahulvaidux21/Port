"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, ChevronsLeftRight, CloudOff, Cloud, Save, Send } from "lucide-react";
import { EXPO_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Browser, Phone, Sheet, type Shot } from "./frames";
import { Parallax, Reveal } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────────────
   Survey Setu — the interactive set pieces. Same rules as motion.tsx:
   readable before hydration, still under reduced motion, transform and
   opacity only. Every control here works with a mouse, a finger and a
   keyboard.
   ──────────────────────────────────────────────────────────────────── */

function useMotionOK() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduced = useReducedMotion();
  return mounted && !reduced;
}

/* ── 1 · Wireframe ↔ final compare slider ──────────────────────────── */

/** The wireframe under the shipped screen, split by a handle you drag (or
    move with the arrow keys). The first time it's seen, the handle sweeps
    once to show that it moves. */
export function CompareSlider({
  before,
  after,
  title,
}: {
  before: Shot;
  after: Shot;
  title: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const touched = useRef(false);
  const sweep = useRef<ReturnType<typeof animate> | null>(null);
  const inView = useInView(frame, { once: true, margin: "-25% 0px" });
  const ok = useMotionOK();

  useEffect(() => {
    if (!ok || !inView || touched.current) return;
    sweep.current = animate(50, [50, 24, 76, 50], {
      duration: 2.2,
      ease: "easeInOut",
      delay: 0.4,
      onUpdate: (v: number) => setPos(v),
    });
    return () => sweep.current?.stop();
  }, [ok, inView]);

  const take = () => {
    touched.current = true;
    sweep.current?.stop();
  };

  const fromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 20 : 5;
    const next =
      e.key === "ArrowLeft"
        ? pos - step
        : e.key === "ArrowRight"
          ? pos + step
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 100
              : null;
    if (next === null) return;
    e.preventDefault();
    take();
    setPos(Math.min(100, Math.max(0, next)));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between text-xs uppercase tracking-[0.04em]">
        <span className="text-sv-mute">← Wireframe</span>
        <span className="text-sv-forest dark:text-sv-green">Final →</span>
      </div>
      <div className="rounded-[15%/7%] bg-[#0c0c0d] p-[3.4%] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
        <div
          ref={frame}
          className="relative cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[12%/5.6%] bg-white"
          onPointerDown={(e) => {
            take();
            e.currentTarget.setPointerCapture(e.pointerId);
            fromPointer(e);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e);
          }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            width={780}
            height={1688}
            sizes="320px"
            className="pointer-events-none h-auto w-full"
            draggable={false}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          >
            <Image
              src={after.src}
              alt={after.alt}
              width={780}
              height={1688}
              sizes="320px"
              className="h-auto w-full"
              draggable={false}
            />
          </div>
          {/* Handle — the focusable slider itself. */}
          <div
            role="slider"
            tabIndex={0}
            aria-label={`${title}: drag to compare the wireframe with the final screen`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(100 - pos)}% final screen showing`}
            onKeyDown={onKey}
            className="group absolute inset-y-0 w-0 outline-none"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
            <span className="absolute left-0 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0c0c0d] shadow-[0_6px_20px_rgba(0,0,0,0.3)] ring-1 ring-black/10 transition-transform group-focus-visible:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-accent">
              <ChevronsLeftRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 2 · Dashboard role switcher ───────────────────────────────────── */
type Role = {
  role: string;
  scope: string;
  credit: "me" | "shared";
  screen: Shot & { height: number };
};

/** One browser, three logins. Switching role swaps the screen in place,
    so the reader sees the layout hold still while the scope changes. */
export function RoleSwitcher({ items }: { items: Role[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[active];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div
          role="tablist"
          aria-label="Portal role"
          onKeyDown={onKey}
          className="grid w-full grid-cols-3 gap-1 rounded-full bg-sv-card p-1 ring-1 ring-hairline/10 md:inline-flex md:w-auto"
        >
          {items.map((d, i) => (
            <button
              key={d.role}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`role-tab-${i}`}
              aria-selected={i === active}
              aria-controls="role-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "relative rounded-full px-2 py-2 text-center text-[13px] font-medium leading-tight transition-colors duration-300 md:px-4 md:text-sm",
                i === active ? "text-paper" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {i === active && (
                <motion.span
                  layoutId="role-pill"
                  className="absolute inset-0 rounded-full bg-text-primary"
                  transition={{ duration: 0.45, ease: EXPO_OUT }}
                />
              )}
              <span className="relative">{d.role}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-text-secondary" aria-live="polite">
          <span className="font-medium text-text-primary">{current.role}: </span>
          {current.scope}{" "}
          <span
            className={cn(
              "ml-1 inline-block rounded-full px-2.5 py-0.5 align-middle text-[11px] font-medium",
              current.credit === "me"
                ? "bg-sv-forest text-white"
                : "bg-sv-card text-text-secondary ring-1 ring-hairline/10"
            )}
          >
            {current.credit === "me" ? "Designed by me" : "With a second designer"}
          </span>
        </p>
      </div>
      <div
        id="role-panel"
        role="tabpanel"
        aria-labelledby={`role-tab-${active}`}
        className="relative mx-auto w-full max-w-[980px]"
      >
        {/* All three stay mounted in one grid cell, so switching never
            reflows the page and every screen is already loaded. */}
        <div className="grid">
          {items.map((d, i) => (
            <motion.div
              key={d.role}
              className="[grid-area:1/1]"
              initial={false}
              animate={{
                opacity: i === active ? 1 : 0,
                scale: i === active ? 1 : 0.985,
                y: i === active ? 0 : 12,
              }}
              transition={{ duration: 0.5, ease: EXPO_OUT }}
              aria-hidden={i !== active}
            >
              <Browser
                src={d.screen.src}
                alt={d.screen.alt}
                height={d.screen.height}
                label={`Survey Setu · ${d.role}`}
                sizes="(min-width: 1024px) 980px, 92vw"
                className="shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 3 · Phone with numbered pins ──────────────────────────────────── */
export type Pinned = { title: string; body: string; pin: [number, number] };

/** Annotations either side of a phone, each tied to a numbered pin on the
    screen. Hovering a note or a pin (or focusing a pin) lights both. */
export function PinnedPhone({
  phone,
  left,
  right,
}: {
  phone: Shot;
  left: Pinned[];
  right: Pinned[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const all = [...left, ...right];
  const note = (a: Pinned, i: number, align: "left" | "right") => (
    <Reveal
      as="li"
      key={a.title}
      delay={0.15 + (i % 2) * 0.12}
      x={align === "left" ? -24 : 24}
      y={0}
      className={cn(
        "grid max-w-[340px] grid-cols-[auto_1fr] gap-x-4 gap-y-1 transition-opacity duration-300 md:grid-cols-[auto_110px_1fr]",
        active !== null && active !== i && "opacity-40"
      )}
    >
      <span
        onMouseEnter={() => setActive(i)}
        onMouseLeave={() => setActive(null)}
        className={cn(
          "row-span-2 grid h-6 w-6 place-items-center rounded-full text-xs font-semibold transition-colors duration-300 md:row-span-1",
          active === i ? "bg-sv-forest text-white" : "bg-white/10 text-white/80"
        )}
      >
        {i + 1}
      </span>
      <span
        onMouseEnter={() => setActive(i)}
        onMouseLeave={() => setActive(null)}
        className="text-sm font-semibold text-white md:text-[15px]"
      >
        {a.title}
      </span>
      <span
        onMouseEnter={() => setActive(i)}
        onMouseLeave={() => setActive(null)}
        className="col-start-2 text-sm leading-[1.5] text-white/65 md:col-start-auto md:text-[15px]"
      >
        {a.body}
      </span>
    </Reveal>
  );

  return (
    <>
      <div className="order-2 md:order-1 md:py-16">
        <ul className="flex flex-col gap-8 md:justify-around">
          {left.map((a, i) => note(a, i, "left"))}
        </ul>
      </div>
      <Parallax speed={-40} className="order-1 mx-auto w-[clamp(220px,28vw,340px)] md:order-2">
        <Phone src={phone.src} alt={phone.alt} sizes="340px">
          {all.map((a, i) => (
            <button
              key={a.title}
              type="button"
              aria-label={`${i + 1}. ${a.title} — ${a.body}`}
              aria-pressed={active === i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive((v) => (v === i ? null : i))}
              className="group absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center outline-none"
              style={{ left: `${a.pin[0]}%`, top: `${a.pin[1]}%` }}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 rounded-full bg-sv-forest/40",
                  active === null && "motion-safe:animate-ping"
                )}
                style={{ animationDelay: `${i * 0.35}s`, animationDuration: "2.4s" }}
              />
              <span
                className={cn(
                  "relative grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.35)] ring-2 transition-transform duration-300 group-focus-visible:ring-accent",
                  active === i
                    ? "scale-125 bg-sv-forest text-white ring-white"
                    : "bg-[#0c0c0d] text-white ring-white/90"
                )}
              >
                {i + 1}
              </span>
            </button>
          ))}
        </Phone>
      </Parallax>
      <div className="order-3 md:py-16">
        <ul className="flex flex-col gap-8 md:items-end md:justify-around">
          {right.map((a, i) => note(a, left.length + i, "right"))}
        </ul>
      </div>
    </>
  );
}

/* ── 4 · Wireframe strip, scrolled sideways by scrolling down ──────── */
const TRACK_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/** On wide screens the strip pins and vertical scroll walks it sideways,
    frame by frame. Everywhere else it's a native sideways-scrolling row. */
export function WireframeTrack({ frames }: { frames: (Shot & { label: string })[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(TRACK_QUERY, () => {
      const pin = el.querySelector<HTMLElement>("[data-track-pin]");
      const ol = el.querySelector<HTMLElement>("ol");
      if (!pin || !ol) return;
      const distance = () => Math.max(0, ol.scrollWidth - ol.clientWidth);
      if (distance() < 40) return;
      gsap.set(ol, { overflowX: "visible" });
      gsap.to(ol, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "center center",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="relative mt-section">
      <div data-track-pin className="py-6">
        <ol
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-color:rgb(255_255_255/0.25)_transparent] md:gap-6 md:px-[max(2rem,calc((100vw-1120px)/2))]"
          tabIndex={0}
          aria-label="Wireframes, in flow order — scroll sideways"
        >
          {frames.map((f, i) => (
            <Reveal
              as="li"
              key={f.src}
              delay={i * 0.07}
              x={60}
              y={0}
              className="flex w-[190px] shrink-0 snap-start flex-col gap-3 md:w-[230px]"
            >
              <Sheet src={f.src} alt={f.alt} sizes="230px" />
              <p className="flex gap-2 text-sm">
                <span className="text-white/50">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-white/85">{f.label}</span>
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ── 5 · Offline → online, at the door ─────────────────────────────── */
type Tone = "green" | "red" | "amber";
export type StoryStep = { chip: string; tone: Tone; section: number; status: string; note: string };

const TONES: Record<Tone, { chip: string; dot: string }> = {
  green: { chip: "bg-[#DCFAD8] text-[#057724]", dot: "bg-[#34A853]" },
  red: { chip: "bg-[#FDE2E1] text-[#B3261D]", dot: "bg-[#B3261D]" },
  amber: { chip: "bg-[#FCE9D4] text-[#8a4a0a]", dot: "bg-[#B77224]" },
};
const STEP_ICONS = [Cloud, CloudOff, Save, Send, Check];

/** A household form living through a patchy signal, step by step. It
    plays on its own while on screen; any step can be picked by hand. The
    resting state (no motion, no JS) is the finished one, with every step
    listed, so the story reads without playing. */
export function OfflineStory({
  title,
  body,
  steps,
}: {
  title: string;
  body: string;
  steps: StoryStep[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const ok = useMotionOK();
  const [i, setI] = useState(steps.length - 1);
  const [held, setHeld] = useState(false);
  const started = useRef(false);

  // Start from the first step the first time it can play.
  useEffect(() => {
    if (ok && inView && !started.current) {
      started.current = true;
      setI(0);
    }
  }, [ok, inView]);

  useEffect(() => {
    if (!ok || !inView || held) return;
    const id = window.setTimeout(
      () => setI((v) => (v + 1) % steps.length),
      i === steps.length - 1 ? 3200 : 1900
    );
    return () => window.clearTimeout(id);
  }, [ok, inView, held, i, steps.length]);

  const pick = useCallback((k: number) => {
    setHeld(true);
    setI(k);
  }, []);

  const s = steps[i];
  const tone = TONES[s.tone];

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-8 rounded-card border border-white/15 p-6 md:grid-cols-[1fr_1.15fr] md:gap-12 md:p-10"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.06em] text-white/60">At the door</p>
          <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-[1.15] tracking-[-0.015em] text-white">
            {title}
          </h3>
          <p className="text-sm leading-[1.6] text-white/65">{body}</p>
        </div>
        <ol className="flex flex-col gap-1">
          {steps.map((st, k) => {
            const Icon = STEP_ICONS[k % STEP_ICONS.length];
            const on = k === i;
            return (
              <li key={st.chip}>
                <button
                  type="button"
                  onClick={() => pick(k)}
                  aria-current={on ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-left text-sm transition-colors duration-300",
                    on
                      ? "bg-white/10 text-white"
                      : ok
                        ? "text-white/50 hover:text-white/80"
                        : "text-white/80"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="font-medium">{st.chip}</span>
                  <span className="hidden text-white/50 sm:inline">— {st.note}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* The phone's-eye view of the current step — fixed light colours,
          like the app itself. */}
      <div aria-live="polite" className="flex items-center justify-center">
        <div className="w-full max-w-[360px] rounded-[28px] bg-white p-5 text-[#212121] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">PVTG Household Survey</span>
            <motion.span
              key={s.chip}
              initial={ok ? { opacity: 0, y: -6, scale: 0.9 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: EXPO_OUT }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                tone.chip
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", tone.dot)} />
              {s.chip}
            </motion.span>
          </div>
          <p className="mt-1 text-xs text-[#595959]">Household HH-014 · Banjara Tanda</p>
          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-[#595959]">Progress</span>
            <span className="tabular-nums text-[#212121]">{s.section}/11 sections</span>
          </div>
          <div className="mt-2 grid grid-cols-11 gap-1" aria-hidden>
            {Array.from({ length: 11 }, (_, k) => (
              <span key={k} className="h-1.5 overflow-hidden rounded-full bg-[#ececec]">
                <motion.span
                  className="block h-full origin-left rounded-full bg-[#057724]"
                  initial={false}
                  animate={{ scaleX: k < s.section ? 1 : 0 }}
                  transition={{
                    duration: 0.35,
                    ease: EXPO_OUT,
                    delay: ok ? Math.max(0, k - (s.section - 3)) * 0.05 : 0,
                  }}
                />
              </span>
            ))}
          </div>
          <motion.div
            key={s.status}
            initial={ok ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EXPO_OUT }}
            className="mt-5 rounded-[16px] bg-[#f6f6f6] px-4 py-3"
          >
            <p className="text-sm font-medium">{s.status}</p>
            <p className="mt-0.5 text-xs leading-[1.5] text-[#595959]">{s.note}</p>
          </motion.div>
          <div className="mt-5 flex items-center justify-between text-[11px] text-[#595959]">
            <span>
              Step {i + 1} of {steps.length}
            </span>
            {held && ok && (
              <button
                type="button"
                onClick={() => setHeld(false)}
                className="font-medium text-[#057724] hover:underline"
              >
                Play again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 6 · The client's approved form, in a window you can scroll ────── */

/** The full approved form — a sharp, full-length capture of the client's
    HTML link — inside a browser window the reader scrolls themselves. While
    it's on screen and untouched, it drifts slowly downward to show there's
    more; any wheel, touch, drag or key hands control to the reader.
    `data-lenis-prevent` lets the wheel scroll the window, not the page. */
export function FormWindow({
  src,
  alt,
  width,
  height,
  url,
  label,
}: Shot & { width: number; height: number; url: string; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { margin: "-20% 0px" });
  const ok = useMotionOK();
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || !ok || !inView || touched) return;
    let raf = 0;
    let last = 0;
    let acc = el.scrollTop;
    const tick = (t: number) => {
      if (last) {
        acc = Math.min(acc + ((t - last) / 1000) * 38, el.scrollHeight - el.clientHeight);
        el.scrollTop = acc;
      }
      last = t;
      if (acc < el.scrollHeight - el.clientHeight) raf = requestAnimationFrame(tick);
    };
    const start = window.setTimeout(() => (raf = requestAnimationFrame(tick)), 1200);
    return () => {
      window.clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [ok, inView, touched]);

  const take = () => setTouched(true);

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] ring-1 ring-black/10 md:rounded-[16px]">
        <div className="flex h-9 items-center gap-1.5 bg-[#ececec] px-3 md:h-10 md:px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="mx-auto truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-[#595959] md:text-xs">
            {label}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium text-[#0b3478] hover:bg-white sm:inline-flex"
          >
            Open live form
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div
          ref={box}
          data-lenis-prevent
          tabIndex={0}
          role="region"
          aria-label="The approved survey form — scroll inside to read all of it"
          onWheel={take}
          onTouchStart={take}
          onPointerDown={take}
          onKeyDown={take}
          className="h-[min(72vh,760px)] overflow-y-auto overscroll-contain [scrollbar-color:rgb(0_0_0/0.25)_transparent] focus-visible:outline-2 focus-visible:-outline-offset-2"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 1184px) 1120px, 96vw"
            className="h-auto w-full"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-sv-mute">
        <span>Scroll inside the window to read the whole form.</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-text-secondary hover:text-text-primary sm:hidden"
        >
          Open live form
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
