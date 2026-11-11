import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* Device frames shared by the section components and the personas scene.
   No hooks, so they render on the server or inside client components. */

export type Shot = { src: string; alt: string };

/** A real screen in a phone bezel. Screens are 780×1688 (2× of 390×844). */
export function Phone({
  src,
  alt,
  className,
  priority,
  sizes = "300px",
  children,
}: Shot & { className?: string; priority?: boolean; sizes?: string; children?: ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-[15%/7%] bg-[#0c0c0d] p-[3.4%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/10",
        className
      )}
    >
      <div className="relative">
        <div className="overflow-hidden rounded-[12%/5.6%] bg-white">
          <Image
            src={src}
            alt={alt}
            width={780}
            height={1688}
            sizes={sizes}
            priority={priority}
            className="h-auto w-full"
          />
        </div>
        {/* Overlay in screen coordinates (left/top % of the screen), outside
            the clip so a pin near the edge isn't cut in half. */}
        {children && <div className="absolute inset-0">{children}</div>}
      </div>
    </div>
  );
}

/** A low-fidelity draft, framed flat — a sheet of paper, not a device, so
    it never reads as a shipped screen. */
export function Sheet({
  src,
  alt,
  className,
  sizes = "240px",
}: Shot & { className?: string; sizes?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[14px] bg-white ring-1 ring-black/10", className)}>
      <Image
        src={src}
        alt={alt}
        width={780}
        height={1688}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}

/** A portal screen in a minimal browser chrome. */
export function Browser({
  src,
  alt,
  width = 2000,
  height,
  label,
  className,
  sizes = "(min-width: 1184px) 1000px, 92vw",
}: Shot & { width?: number; height: number; label: string; className?: string; sizes?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/10 md:rounded-[16px]",
        className
      )}
    >
      <div className="flex h-7 items-center gap-1.5 bg-[#ececec] px-3 md:h-9 md:px-4">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57] md:h-2.5 md:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e] md:h-2.5 md:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-[#28c840] md:h-2.5 md:w-2.5" />
        <span className="mx-auto truncate rounded-md bg-white px-3 py-0.5 text-[10px] text-[#595959] md:text-xs">
          {label}
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}
