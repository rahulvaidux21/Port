import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import type { StatItem } from "@/types";

interface StatCardProps {
  stat: StatItem;
  accentColor: string;
  accentColorDark: string;
}

/** Before -> after metric tile for the Results section — same bordered
    card shape as everything else, no gauge/chart styling introduced. */
export function StatCard({ stat, accentColor, accentColorDark }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-editor-border bg-surface p-6 text-center">
      <div className="flex flex-wrap items-center justify-center gap-2 font-sans text-2xl font-bold text-text-muted sm:text-3xl">
        <span>{stat.before}</span>
        <ArrowRight className="h-5 w-5 shrink-0" strokeWidth={2} />
        <span style={{ "--l": accentColor, "--ld": accentColorDark } as CSSProperties}>
          <span className="text-[var(--l)] dark:text-[var(--ld)]">{stat.after}</span>
        </span>
      </div>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-text-muted">{stat.label}</p>
    </div>
  );
}
