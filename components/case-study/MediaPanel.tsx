import Image from "next/image";
import { cn } from "@/lib/utils";
import type { MediaItem } from "@/types";

interface MediaPanelProps {
  media: MediaItem;
  className?: string;
  priority?: boolean;
}

/** A real screenshot framed in the standard bordered card shape — the same
    rounded-2xl / editor-border / shadow-lg rule used everywhere else,
    applied to standalone research/process imagery instead of device chrome. */
export function MediaPanel({ media, className, priority }: MediaPanelProps) {
  return (
    <figure className={cn("mx-auto w-full", className)}>
      <div className="overflow-hidden rounded-2xl border border-editor-border bg-surface shadow-lg">
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes="(min-width: 768px) 720px, 100vw"
          className="h-auto w-full"
          priority={priority}
        />
      </div>
      {media.caption && (
        <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-text-muted">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}
