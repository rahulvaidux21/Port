import type { CSSProperties } from "react";
import type { InsightItem } from "@/types";

interface InsightCardProps {
  item: InsightItem;
  index: number;
  accentColor: string;
  accentColorDark: string;
}

/** Numbered takeaway tile — reuses the DetailBlock mono-label convention
    from ProjectBrowser, indexed instead of named. */
export function InsightCard({ item, index, accentColor, accentColorDark }: InsightCardProps) {
  return (
    <div className="rounded-2xl border border-editor-border bg-surface p-6">
      <span
        className="mb-3 block font-mono text-2xl font-bold"
        style={{ "--l": accentColor, "--ld": accentColorDark } as CSSProperties}
      >
        <span className="text-[var(--l)] dark:text-[var(--ld)]">{String(index + 1).padStart(2, "0")}</span>
      </span>
      <h3 className="mb-2 font-sans text-lg font-bold leading-snug text-text-primary">{item.title}</h3>
      <p className="font-sans text-base leading-relaxed text-text-secondary">{item.text}</p>
    </div>
  );
}
