"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Browser, Phone, type Shot } from "./frames";
import { Reveal } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────────────
   Who I designed for — told as a zoom-out, from one doorstep to all of
   India. On a wide screen with motion allowed, the section pins and each
   scroll step widens the frame by one level: a village, a district, a
   state, the country. Three layers move at different speeds for depth:

     back   — the scope word ("1 village") and concentric scope rings
     middle — the persona card
     front  — the device that persona works on

   Everywhere else (phones, tablets, reduced motion, before hydration,
   no JS) it renders as the plain card grid, so nothing is ever hidden
   behind an animation.
   ──────────────────────────────────────────────────────────────────── */

export type Persona = {
  role: string;
  aka?: string;
  platform: string;
  credit: "me" | "shared";
  goal: string;
  context: string;
  pain: string;
  does: string;
  /** The scope this persona works at — the scene's background word. */
  scope: string;
  device: Shot & { kind: "phone" | "browser"; height?: number };
};

type Node = { role: string; sub: string };

const SCENE_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const SMALL = "text-[13px] leading-[1.55] md:text-sm";

/** Ring radii in a 1000-unit viewBox, innermost (the household) first.
    Ring k+1 is the scope of persona k. */
const RINGS = [7, 74, 165, 292, 478];
/** Scale that makes ring k+1 about 80% of the plate's height. */
const scaleFor = (k: number) => 360 / RINGS[k + 1];

export function PersonaStory({
  people,
  nodes,
  down,
  up,
  note,
}: {
  people: Persona[];
  nodes: Node[];
  down: string;
  up: string;
  note: string;
}) {
  const [scene, setScene] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(SCENE_QUERY);
    const sync = () => setScene(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <>
      {scene ? <Scene people={people} /> : <PersonaGrid people={people} />}
      <p className={cn(SMALL, "pt-2 text-text-muted")}>{note}</p>
      <RoleChain nodes={nodes} down={down} up={up} />
    </>
  );
}

/* ── The pinned scene ──────────────────────────────────────────────── */
function Scene({ people }: { people: Persona[] }) {
  const root = useRef<HTMLDivElement>(null);
  const n = people.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const words = q("[data-word]");
      const cards = q("[data-card]");
      const devices = q("[data-device]");
      const dots = q("[data-dot]");
      const counter = q("[data-counter]")[0] as HTMLElement | undefined;

      gsap.set(words.slice(1), { autoAlpha: 0, yPercent: 40 });
      gsap.set(cards.slice(1), { autoAlpha: 0, y: 70 });
      gsap.set(devices.slice(1), { autoAlpha: 0, y: 180, rotate: 4 });
      gsap.set(q("[data-rings]"), { scale: scaleFor(0) });

      let current = -1;
      const mark = (i: number) => {
        if (i === current) return;
        current = i;
        dots.forEach((d, k) => d.toggleAttribute("data-on", k <= i));
        if (counter) counter.textContent = String(i + 1).padStart(2, "0");
      };
      mark(0);

      // One unit of timeline per persona; each hand-off takes 0.6 of the
      // unit, so every persona holds still for a beat before the next.
      const total = n - 0.4;
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: q("[data-pin]")[0],
          start: "top top",
          end: () => `+=${window.innerHeight * (n - 0.6)}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => mark(Math.min(n - 1, Math.floor(tl.time() + 0.4))),
      });

      // Continuous drift across the whole scene — back slow, front fast.
      tl.fromTo(q("[data-layer='back']"), { y: 40 }, { y: -40, ease: "none", duration: total }, 0);
      tl.fromTo(q("[data-layer='front']"), { y: 70 }, { y: -70, ease: "none", duration: total }, 0);
      tl.fromTo(
        q("[data-progress]"),
        { scaleX: 1 / n },
        { scaleX: 1, ease: "none", duration: total - 0.6 },
        0.3
      );

      for (let k = 0; k < n - 1; k++) {
        const at = k + 0.3;
        tl.to(q("[data-rings]"), { scale: scaleFor(k + 1), duration: 0.6 }, at)
          .to(words[k], { autoAlpha: 0, yPercent: -40, duration: 0.45 }, at)
          .to(words[k + 1], { autoAlpha: 1, yPercent: 0, duration: 0.45 }, at + 0.15)
          .to(cards[k], { autoAlpha: 0, y: -60, duration: 0.4 }, at)
          .to(cards[k + 1], { autoAlpha: 1, y: 0, duration: 0.45 }, at + 0.15)
          .to(devices[k], { autoAlpha: 0, y: -160, rotate: -4, duration: 0.45 }, at)
          .to(devices[k + 1], { autoAlpha: 1, y: 0, rotate: 0, duration: 0.5 }, at + 0.1);
      }
      tl.set({}, {}, total);
    }, el);
    return () => ctx.revert();
  }, [n]);

  return (
    // `root` is the node React owns; GSAP wraps `[data-pin]` in a spacer
    // inside it, so React never loses track of its own children.
    <div ref={root}>
      <div data-pin className="relative h-[100svh]">
        <div className="absolute inset-x-0 bottom-4 top-20 overflow-hidden rounded-plate bg-sv-card ring-1 ring-hairline/10">
          {/* Back layer — scope rings and the scope word. */}
          <div data-layer="back" aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid place-items-center">
              <svg
                data-rings
                viewBox="0 0 1000 1000"
                className="h-[100vmin] w-[100vmin] text-hairline will-change-transform"
              >
                {RINGS.slice(1)
                  .reverse()
                  .map((r) => (
                    <circle
                      key={r}
                      cx="500"
                      cy="500"
                      r={r}
                      fill="currentColor"
                      fillOpacity={0.035}
                      stroke="currentColor"
                      strokeOpacity={0.28}
                      strokeDasharray="3 7"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                <circle cx="500" cy="500" r={RINGS[0]} className="fill-sv-forest" />
              </svg>
            </div>
            {people.map((p) => (
              <p
                key={p.scope}
                data-word
                className="absolute inset-x-0 top-[7%] whitespace-nowrap text-center text-[clamp(4rem,10vw,9.5rem)] font-medium uppercase leading-none tracking-[-0.045em] text-text-primary/[0.07]"
              >
                {p.scope}
              </p>
            ))}
          </div>

          {/* Middle layer — the persona card. */}
          <div className="absolute inset-0 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-10 px-10 xl:px-14">
            <div className="relative h-[min(470px,62vh)]">
              {people.map((p, i) => (
                <article
                  key={p.role}
                  data-card
                  className="absolute inset-0 flex flex-col justify-center"
                  aria-label={p.role}
                >
                  <SceneCard p={p} index={i} n={n} />
                </article>
              ))}
            </div>

            {/* Front layer — the device. */}
            <div data-layer="front" className="relative h-full">
              {people.map((p) => (
                <div key={p.role} data-device className="absolute inset-0 grid place-items-center">
                  {p.device.kind === "phone" ? (
                    <Phone
                      src={p.device.src}
                      alt={p.device.alt}
                      sizes="260px"
                      className="w-[min(25vh,250px)] rotate-[-5deg]"
                    />
                  ) : (
                    <Browser
                      src={p.device.src}
                      alt={p.device.alt}
                      height={p.device.height ?? 1685}
                      label={`Survey Setu · ${p.role}`}
                      sizes="560px"
                      className="w-full max-w-[560px] rotate-[2deg] md:rounded-[12px]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress — the zoom-out, one dot per persona. */}
          <div className="absolute inset-x-10 bottom-6 flex flex-col gap-3 xl:inset-x-14">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-[0.06em] text-sv-mute">Zooming out · scroll</span>
              <span className="tabular-nums text-text-secondary">
                <span data-counter>01</span> / {String(n).padStart(2, "0")}
              </span>
            </div>
            <div className="relative h-px bg-hairline/15">
              <span data-progress className="absolute inset-0 origin-left bg-sv-forest" />
            </div>
            <ol className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
              {people.map((p) => (
                <li
                  key={p.role}
                  data-dot
                  className="group flex items-center gap-2 text-xs text-sv-mute transition-colors duration-300 data-[on]:text-text-primary"
                >
                  <span className="h-2 w-2 rounded-full bg-hairline/20 transition-colors duration-300 group-data-[on]:bg-sv-forest" />
                  {p.role}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneCard({ p, index, n }: { p: Persona; index: number; n: number }) {
  return (
    <div className="flex flex-col gap-5 rounded-card bg-sv-band/90 p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] ring-1 ring-hairline/10 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm tabular-nums text-sv-mute">
          {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-hairline/10 px-3 py-1 text-xs text-text-secondary">
          {p.platform}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-[clamp(1.8rem,2.8vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.025em]">
          {p.role}
        </h3>
        {p.aka && <p className="text-sm text-sv-mute">{p.aka}</p>}
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        {facts(p).map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1 border-t border-hairline/10 pt-3">
            <dt className="text-xs uppercase tracking-[0.04em] text-sv-mute">{k}</dt>
            <dd className="text-[13px] leading-[1.5] text-text-secondary xl:text-sm">{v}</dd>
          </div>
        ))}
      </dl>
      <Credit credit={p.credit} />
    </div>
  );
}

/* ── The static grid (phones, reduced motion, no JS) ───────────────── */
function PersonaGrid({ people }: { people: Persona[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {people.map((p, i) => (
        <Reveal
          as="li"
          key={p.role}
          delay={i * 0.08}
          className="flex flex-col gap-6 rounded-card bg-sv-card p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <span aria-hidden className="text-sm text-sv-mute">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="rounded-full border border-hairline/10 px-3 py-1 text-xs text-text-secondary">
              {p.platform}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[clamp(1.3rem,1.8vw,1.55rem)] font-medium leading-tight tracking-[-0.015em]">
              {p.role}
            </h3>
            <p className="text-[13px] text-sv-mute">{p.aka ?? p.scope}</p>
          </div>
          <dl className="flex flex-col gap-4">
            {facts(p).map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 border-t border-hairline/10 pt-3">
                <dt className="text-xs uppercase tracking-[0.04em] text-sv-mute">{k}</dt>
                <dd className="text-[13px] leading-[1.55] text-text-secondary md:text-sm">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-auto">
            <Credit credit={p.credit} />
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

const facts = (p: Persona) =>
  [
    ["Goal", p.goal],
    ["Context", p.context],
    ["Pain point", p.pain],
    ["In Survey Setu", p.does],
  ] as const;

function Credit({ credit }: { credit: Persona["credit"] }) {
  return (
    <p
      className={cn(
        "w-fit rounded-full px-3 py-1 text-xs font-medium",
        credit === "me"
          ? "bg-sv-forest text-white"
          : "bg-sv-card text-text-secondary ring-1 ring-hairline/10"
      )}
    >
      {credit === "me" ? "Designed by me" : "Designed with a second designer"}
    </p>
  );
}

/* ── Who adds whom ─────────────────────────────────────────────────── */
function RoleChain({ nodes, down, up }: { nodes: Node[]; down: string; up: string }) {
  return (
    <Reveal className="flex flex-col gap-5 rounded-card bg-sv-card p-6 md:p-8">
      <p className="text-sm font-medium">How the roles connect</p>
      <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {nodes.map((node, i) => (
          <li
            key={node.role}
            className="flex flex-col items-stretch gap-2 md:flex-1 md:flex-row md:items-center"
          >
            <Reveal
              delay={0.1 + i * 0.1}
              x={-12}
              y={0}
              className={cn(
                "flex flex-1 flex-col gap-0.5 rounded-[16px] px-4 py-3",
                i === nodes.length - 1 ? "border border-dashed border-hairline/25" : "bg-sv-band"
              )}
            >
              <span className="text-[15px] font-medium leading-tight">{node.role}</span>
              <span className="text-xs text-text-muted">{node.sub}</span>
            </Reveal>
            {i < nodes.length - 1 && (
              <ArrowRight
                aria-hidden
                className="mx-auto h-4 w-4 shrink-0 rotate-90 text-sv-mute md:rotate-0"
              />
            )}
          </li>
        ))}
      </ol>
      <div className="grid grid-cols-1 gap-2 border-t border-hairline/10 pt-4 text-[13px] leading-[1.55] text-text-secondary md:grid-cols-2 md:text-sm">
        <p>
          <span className="font-medium text-text-primary">Down the chain → </span>
          {down}
        </p>
        <p>
          <span className="font-medium text-text-primary">Back up ← </span>
          {up}
        </p>
      </div>
    </Reveal>
  );
}
