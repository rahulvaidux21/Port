"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  const mounted = useRef(false);

  // Sync initial state from the DOM (set synchronously by the anti-flash script in <head>).
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    mounted.current = true;
  }, []);

  // Apply the theme as a side effect of state, not inside the setState updater —
  // keeps the updater pure and avoids double-invocation surprises under Strict Mode.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    if (mounted.current) {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return { isDark, toggle };
}
