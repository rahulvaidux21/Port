"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/data";
import { cn } from "@/lib/utils";

interface IdBadgeProps {
  size?: "lg" | "sm";
  className?: string;
}

export function IdBadge({ size = "lg", className }: IdBadgeProps) {
  const reduced = useReducedMotion();
  const isLg = size === "lg";

  const strapHeight = isLg ? 190 : 130;
  const holderWidth = isLg ? 190 : 130;
  const photoHeight = isLg ? 190 : 130;

  // SSR-safe: `initial` bakes into the server HTML as an inline style, so a
  // naive opacity:0 initial would ship the badge invisible to anyone whose JS
  // is slow, blocked, or absent. Render already-settled until mounted, then
  // remount (via key) so the entrance spring still plays for capable clients.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const animate = mounted && !reduced;
  // Hold the badge off-frame until the intro splash (~2.2s) has cleared, so
  // the drop actually plays in view rather than behind the overlay.
  const dropDelay = 2.3;

  return (
    // Drop: the whole lanyard falls in from above the frame.
    <motion.div
      key={mounted ? "revealed" : "pre-mount"}
      className={cn("flex flex-col items-center", className)}
      initial={animate ? { y: -380, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={
        animate
          ? {
              y: { type: "spring", stiffness: 220, damping: 15, mass: 1.05, delay: dropDelay },
              opacity: { duration: 0.25, delay: dropDelay },
            }
          : undefined
      }
    >
      {/* Tangle → straighten: the band lands twisted and swings itself out,
          the pendulum arc damping down to vertical. */}
      <motion.div
        className="flex flex-col items-center"
        style={{ transformOrigin: "top center" }}
        initial={animate ? { rotate: -15, skewX: 7 } : false}
        animate={animate ? { rotate: [-15, 12, -8, 5, -2.5, 0], skewX: [7, -5, 3, -1.5, 0] } : { rotate: 0, skewX: 0 }}
        transition={
          animate
            ? {
                rotate: { duration: 1.9, ease: "easeOut", times: [0, 0.28, 0.5, 0.72, 0.88, 1], delay: dropDelay },
                skewX: { duration: 1.6, ease: "easeOut", delay: dropDelay },
              }
            : undefined
        }
      >
      {/* Idle: continues hanging with a gentle sway once settled. */}
      <motion.div
        className="flex flex-col items-center"
        style={{ transformOrigin: "top center" }}
        animate={animate ? { rotate: [-2.5, 2.5, -2.5] } : { rotate: 0 }}
        transition={
          animate ? { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: dropDelay + 2.0 } : undefined
        }
      >
      {/* Lanyard strap — soft fabric ribbon, straight, fading out at the top
          as if it continues up beyond the frame rather than starting there */}
      <div
        className="relative w-[13px] rounded-full shadow-sm"
        style={{
          height: strapHeight,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.1), transparent 40%, transparent 60%, rgba(0,0,0,0.25)), #0c0a09",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 100%)",
        }}
      >
        <span
          className="absolute left-1/2 top-1/2 whitespace-nowrap font-mono font-medium text-white select-none"
          style={{
            fontSize: 8,
            opacity: 0.55,
            transform: "translate(-50%, -50%) rotate(-90deg)",
            letterSpacing: "0.1em",
          }}
        >
          rahulvaid.me
        </span>
      </div>

      {/* Fabric loop where the strap tucks into the badge — no hardware, just stitching */}
      <div
        className="relative z-[1] -mt-1 h-2 w-5 rounded-full bg-stone-950 shadow-inner"
        style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)" }}
      />

      {/* Badge holder */}
      <div
        className="relative -mt-1 overflow-hidden rounded-2xl"
        style={{
          width: holderWidth,
          backgroundColor: "var(--color-badge)",
          borderTop: "1.5px solid var(--color-badge-border-top)",
          borderLeft: "1px solid var(--color-badge-border-left)",
          borderRight: "1px solid var(--color-badge-border-right)",
          borderBottom: "2px solid var(--color-badge-border-bottom)",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Diagonal glare */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 15%, transparent 40%, transparent 85%, rgba(255,255,255,0.03) 100%)",
          }}
        />

        <div className={cn("relative flex flex-col items-center", isLg ? "gap-2.5 p-2.5" : "gap-2 p-2")}>
          {/* Rectangular photo panel */}
          <div
            className="relative w-full overflow-hidden rounded-xl bg-stone-200"
            style={{ height: photoHeight }}
          >
            <Image
              src="/headshot.jpg"
              alt={hero.name}
              fill
              sizes={`${holderWidth}px`}
              className="rounded-xl object-cover"
              priority
            />
          </div>

          {/* Name + title */}
          <div className="flex flex-col items-center pb-1 text-center">
            <span className={cn("font-sans font-bold text-white", isLg ? "text-base" : "text-sm")}>
              {hero.name}
            </span>
            <span
              className={cn(
                "mt-0.5 font-sans uppercase tracking-widest text-stone-400",
                isLg ? "text-[10px]" : "text-[8px]"
              )}
            >
              {hero.title}
            </span>
            <span
              className={cn(
                "mt-1 font-sans italic text-stone-500",
                isLg ? "text-[10px]" : "text-[8px]"
              )}
            >
              Designing for scale
            </span>
          </div>
        </div>
      </div>
      </motion.div>
      </motion.div>
    </motion.div>
  );
}
