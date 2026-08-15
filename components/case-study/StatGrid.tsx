import { cn } from "@/lib/utils";
import type { Stat } from "@/types";

/** Big-number + label grid — the same value/label typography as the
    landing page's Stats band, reused here for team headcounts and
    component/pattern counts instead of a new visual language. */
export function StatGrid({ stats, columns = 4 }: { stats: Stat[]; columns?: 2 | 3 | 4 }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-8",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-3",
        columns === 4 && "sm:grid-cols-4"
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2">
          <p className="font-display text-4xl font-semibold tracking-[-1px] text-text-primary md:text-5xl">{stat.value}</p>
          <p className="font-sans text-sm text-text-secondary">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
