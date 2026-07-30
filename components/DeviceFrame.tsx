import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface FrameProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}

/** Phone chrome for mobile-app screenshots — tall aspect, pill notch. */
export function PhoneFrame({ src, alt, className, style, priority }: FrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] overflow-hidden rounded-[1.75rem] border-[5px] border-stone-900 bg-stone-900 shadow-2xl",
        className
      )}
      style={style}
    >
      <span className="absolute left-1/2 top-1.5 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-stone-900" />
      <Image src={src} alt={alt} fill sizes="220px" className="object-cover" priority={priority} />
    </div>
  );
}

/** Browser chrome for web-platform / dashboard screenshots — wide aspect, traffic-light bar. */
export function BrowserFrame({ src, alt, className, style, priority }: FrameProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl", className)}
      style={style}
    >
      <div className="flex h-6 items-center gap-1.5 bg-stone-100 px-3">
        <span className="h-2 w-2 rounded-full bg-stone-300" />
        <span className="h-2 w-2 rounded-full bg-stone-300" />
        <span className="h-2 w-2 rounded-full bg-stone-300" />
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes="480px" className="object-cover object-top" priority={priority} />
      </div>
    </div>
  );
}
