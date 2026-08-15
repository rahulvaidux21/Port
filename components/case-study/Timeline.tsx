import type { TimelineStep } from "@/types";

/** A plain date + phase + description list — replaces the source Figma's
    colorful custom Gantt chart, which doesn't fit the site's dark,
    typographic visual language. Same information, told as a simple
    sequence instead of an infographic. */
export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step) => (
        <li key={step.date} className="flex gap-6 border-t border-hairline/[0.08] py-5 first:border-t-0 first:pt-0">
          <span className="w-24 shrink-0 font-sans text-sm text-text-muted">{step.date}</span>
          <div>
            <p className="font-sans text-base font-semibold text-text-primary">{step.phase}</p>
            <p className="mt-1 font-sans text-base leading-relaxed text-text-secondary">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
