"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderSlotProps {
  label: string;
  className?: string;
  rotate?: number;
  icon?: ReactNode;
}

export function PlaceholderSlot({ label, className, rotate = 0, icon }: PlaceholderSlotProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "placeholder-slot group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-stone-300 bg-stone-50 shadow-md transition-colors duration-200 hover:border-accent hover:bg-white dark:border-stone-600 dark:bg-stone-800 dark:hover:bg-stone-700",
        className
      )}
      style={{ rotate }}
      whileHover={reduced ? undefined : { scale: 1.06, rotate: 0, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
    >
      <div className="text-stone-400 transition-colors duration-200 group-hover:text-accent">
        {icon ?? <ImageIcon className="h-5 w-5" strokeWidth={1.5} />}
      </div>
      <span className="px-2 text-center font-sans text-[10px] uppercase tracking-widest text-stone-400 transition-colors duration-200 group-hover:text-stone-600">
        {label}
      </span>
    </motion.div>
  );
}
