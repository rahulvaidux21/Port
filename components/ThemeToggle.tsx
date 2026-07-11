"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span
        className={cn("w-11 h-11 inline-block", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "w-11 h-11 rounded-full flex items-center justify-center",
        "text-muted-foreground hover:text-foreground",
        "transition-colors duration-200",
        className
      )}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <Sun size={16} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Moon size={16} strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
