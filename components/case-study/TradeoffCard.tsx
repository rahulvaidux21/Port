import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TradeoffItem } from "@/types";

function Option({ text, chosen }: { text: string; chosen: boolean }) {
  return (
    <div className={cn("relative flex-1 rounded-xl border p-4", chosen ? "border-accent" : "border-editor-border")}>
      {chosen && (
        <span className="absolute -right-2.5 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      )}
      <p className="font-sans text-base leading-relaxed text-text-secondary">{text}</p>
    </div>
  );
}

/** Two-column Option A / Option B comparison with a chosen-side checkmark —
    built from the existing pill-badge and editor-border divider, not a new
    visual language. "both" (a variant kept both options) marks both sides. */
export function TradeoffCard({ item }: { item: TradeoffItem }) {
  return (
    <div className="rounded-2xl border border-editor-border bg-surface p-6">
      <h3 className="mb-4 font-sans text-lg font-bold text-text-primary">{item.title}</h3>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Option text={item.optionA} chosen={item.chosen === "a" || item.chosen === "both"} />
        <Option text={item.optionB} chosen={item.chosen === "b" || item.chosen === "both"} />
      </div>
      <p className="mt-4 border-t border-editor-border pt-4 font-sans text-base italic leading-relaxed text-text-muted">
        {item.rationale}
      </p>
    </div>
  );
}
