"use client";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  trailing?: React.ReactNode;
  className?: string;
}

export function SectionLabel({ label, trailing, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-12", className)}>
      <span className="text-xs text-accent font-semibold tracking-widest uppercase shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-border" />
      {trailing}
    </div>
  );
}
