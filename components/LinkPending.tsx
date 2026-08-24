"use client";

import { useLinkStatus } from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The pending state for a card that navigates to a case study.
 *
 * Case-study pages are heavy (a full frame of plates), and without this the
 * click produced nothing at all: the App Router keeps the *current* page on
 * screen while it fetches the next route, so the card just sat there looking
 * unclicked until the whole page swapped. `loading.tsx` covers the far side
 * of that gap; this covers the near side, on the thing the user actually
 * pressed.
 *
 * Must be rendered inside the `<Link>` it belongs to — `useLinkStatus` reads
 * the nearest Link ancestor, and returns a permanently-false `pending`
 * anywhere else. The parent needs `position: relative`.
 */
export function LinkPending({ label = "Opening case study" }: { label?: string }) {
  const { pending } = useLinkStatus();

  return (
    <div
      // Always mounted and faded, not mounted on `pending` — an element that
      // appears at the same moment it animates has no starting frame to
      // transition from, so it would pop instead of fade.
      className={cn(
        "pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-paper/70 backdrop-blur-[2px] transition-opacity duration-200",
        pending ? "opacity-100" : "opacity-0"
      )}
      aria-hidden={!pending}
    >
      <span className="flex items-center gap-2.5 rounded-full border border-hairline/[0.08] bg-paper px-4 py-2.5 font-sans text-sm font-medium text-text-primary shadow-lg">
        <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden />
        {label}
      </span>
    </div>
  );
}
