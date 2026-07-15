"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { IdBadge } from "@/components/IdBadge";
import { TableLamp } from "@/components/TableLamp";
import { hero, floatingNavItems } from "@/lib/data";
import { useTheme } from "@/lib/useTheme";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isDark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <nav className="relative z-[100]">
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-6 pb-3 pt-6 md:px-8">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="Rahul Vaid logo" width={30} height={30} className="rounded-full" />
          <Link
            href="/"
            className="font-sans text-[13px] font-medium tracking-wide text-stone-700 transition-colors hover:text-stone-900 dark:text-stone-300 dark:hover:text-white"
          >
            {hero.name}
          </Link>
        </div>

        {/* Lanyard badge — strap starts at the very top edge, hanging in from
            outside the frame. Sits right after the logo + name on desktop,
            slides to the horizontal center on smaller screens. */}
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 lg:left-[176px] lg:translate-x-0">
          <IdBadge size="sm" className="xl:hidden" />
          <IdBadge size="lg" className="hidden xl:block" />
        </div>

        <div className="flex items-center gap-1">
          <div className="group relative flex items-center justify-center">
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle light / dark theme"
              aria-pressed={isDark}
              className="lamp-toggle relative flex items-center justify-center rounded-full p-1"
            >
              {/* Lamp switched on (dark mode): the shade's open bottom edge
                  sits ~57% down the image — both glows are anchored there
                  (top edge, not centred) so light reads as spilling out from
                  under the shade rather than glowing from within it. */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute left-1/2 top-[54%] h-8 w-9 -translate-x-1/2 rounded-full blur-[2px] transition-opacity duration-500",
                  isDark ? "opacity-100" : "opacity-0"
                )}
                style={{
                  background:
                    "radial-gradient(circle, rgba(253,230,138,0.95) 0%, rgba(253,224,138,0.45) 45%, transparent 75%)",
                }}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute left-1/2 top-[58%] h-7 w-9 -translate-x-1/2 transition-opacity duration-700",
                  isDark ? "opacity-80" : "opacity-0"
                )}
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(253,224,138,0.55) 0%, rgba(253,224,138,0.15) 55%, transparent 85%)",
                  clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0% 100%)",
                }}
              />
              <TableLamp size={40} priority className="lamp-img relative" />
            </button>

            <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="relative inline-flex flex-col items-center">
                <span
                  aria-hidden="true"
                  className="-mb-1 h-2 w-2 rotate-45 border-l border-t border-editor-border bg-surface"
                />
                <span className="whitespace-nowrap rounded-full border border-editor-border bg-surface px-3 py-1 font-sans text-[11px] text-text-secondary shadow-sm">
                  {isDark ? "Switch to light mode" : "Switch to dark mode"}
                </span>
              </span>
            </div>
          </div>

          <div className="relative lg:hidden" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="flex items-center justify-center rounded-full p-2 text-text-primary transition-transform hover:scale-110"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 flex w-44 flex-col gap-1 rounded-2xl border border-editor-border bg-surface p-2 shadow-lg">
                {floatingNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-2 text-center font-sans text-sm text-text-secondary transition-colors hover:bg-stone-100 hover:text-text-primary dark:hover:bg-stone-800"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
