"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Dark is the default theme here (unlike the previous system) — the
// anti-flash script in layout.tsx adds `dark` unless localStorage says
// "light", so this hook's initial state mirrors that same default.
export function useTheme() {
  const [isDark, setIsDark] = useState(true);
  const mounted = useRef(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    mounted.current = true;
  }, []);

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
