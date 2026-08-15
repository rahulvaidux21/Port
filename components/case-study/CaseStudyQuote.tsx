import { Quote } from "lucide-react";

/** Instrument Serif italic pull-quote with a small decorative quote mark —
    the reference's own blockquote treatment (no accent border, no card). */
export function CaseStudyQuote({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <blockquote className="relative pt-11">
      <Quote className="absolute right-0 top-0 h-8 w-8 text-accent" strokeWidth={1.5} aria-hidden="true" />
      <p className="max-w-[900px] font-instrument-serif text-2xl italic leading-snug text-text-primary md:text-[28px]">
        “{quote}”
      </p>
      {attribution && (
        <footer className="mt-3 font-sans text-xs uppercase tracking-widest text-text-muted">{attribution}</footer>
      )}
    </blockquote>
  );
}
