import { Clock, TrendingUp, Users, Layers, ShieldCheck, Globe2, SlidersHorizontal, Accessibility, Landmark, RefreshCw, BookOpen } from "lucide-react";
import type { IconLabelItem } from "@/types";

// Restricted registry — every icon in the project comes from lucide-react
// (DESIGN.md "One icon system"), keyed by name so content data stays plain data.
const iconMap = {
  Clock,
  TrendingUp,
  Users,
  Layers,
  ShieldCheck,
  Globe2,
  SlidersHorizontal,
  Accessibility,
  Landmark,
  RefreshCw,
  BookOpen,
} as const;

interface IconLabelListProps {
  items: IconLabelItem[];
  columns?: 2 | 3;
}

/** Icon + mono-caption row — formalizes the pattern already used ad hoc for
    experience tags, reused for Constraints / Principles / Collaboration. */
export function IconLabelList({ items, columns = 2 }: IconLabelListProps) {
  return (
    <ul className={`grid grid-cols-1 gap-4 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {items.map((item, i) => {
        const Icon = iconMap[item.icon];
        return (
          <li key={i} className="flex items-start gap-3 rounded-xl border border-editor-border bg-surface p-4">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <span className="font-sans text-base leading-relaxed text-text-secondary">{item.text}</span>
          </li>
        );
      })}
    </ul>
  );
}
