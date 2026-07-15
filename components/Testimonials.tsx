"use client";

import { useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { SpeechBubble } from "@/components/SpeechBubble";
import { testimonials, testimonialsSection } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="mx-3 flex w-[340px] shrink-0 flex-col rounded-2xl border border-editor-border bg-surface p-7 sm:w-[380px]">
      <Quote className="mb-4 h-6 w-6 text-accent" strokeWidth={1.5} />
      <p className="mb-6 flex-1 font-sans text-sm leading-relaxed text-text-secondary">“{item.quote}”</p>
      <p className="font-mono text-xs tracking-wider text-text-muted">{item.role}</p>
    </div>
  );
}

export function Testimonials() {
  const reduced = useReducedMotion();

  return (
    <section id="testimonials" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center px-6 text-center">
        <SpeechBubble className="mb-6">{testimonialsSection.speechBubble}</SpeechBubble>
        <h2 className="font-sans text-3xl font-bold text-text-primary md:text-4xl">
          {testimonialsSection.headline}
        </h2>
        <p className="mt-4 font-sans text-sm text-text-secondary md:text-base">{testimonialsSection.intro}</p>
      </div>

      {reduced ? (
        <div className="mx-auto flex max-w-[1140px] flex-wrap justify-center gap-6 px-6">
          {testimonials.map((item) => (
            <TestimonialCard key={item.role} item={item} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="relative overflow-hidden">
            <div className={cn("flex w-max animate-marquee")} style={{ willChange: "transform" }}>
              {[...testimonials, ...testimonials].map((item, i) => (
                <TestimonialCard key={`${item.role}-${i}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
