"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { hero, navItems, socialLinks } from "@/lib/data";
import { useTheme } from "@/lib/useTheme";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isDark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const email = socialLinks.find((link) => link.icon === "mail")?.href ?? "#";

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
    <div className="sticky top-4 z-[100] flex justify-center px-9 md:px-8">
      <nav className="flex w-full max-w-[574px] items-center justify-between gap-2 rounded-lg border border-hairline/[0.08] bg-hairline/[0.08] p-[9px] shadow-lg backdrop-blur-md lg:h-[66px]">
        <Link href="/" className="h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-hairline/[0.08] p-px">
          <Image
            src="/avatar-crop.jpg"
            alt={hero.name}
            width={64}
            height={48}
            className="h-full w-full rounded-[11px] object-cover object-top"
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-3 font-sans text-sm uppercase tracking-wide text-text-primary/[0.88] transition-colors hover:text-text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle light / dark theme"
            aria-pressed={isDark}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline/[0.08] bg-hairline/[0.04] text-text-secondary transition-colors hover:text-text-primary"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href={email}
            className="hidden items-center rounded-lg border border-accent-border bg-accent px-3 py-2 font-sans text-sm font-medium uppercase leading-4 tracking-wide text-accent-foreground shadow-[0_5px_30px_5px_rgba(0,85,254,0.32)] transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Contact
          </a>

          <div className="relative lg:hidden" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border border-hairline/[0.08] text-text-secondary transition-colors hover:text-text-primary",
                menuOpen && "text-text-primary"
              )}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 flex w-48 flex-col gap-1 rounded-2xl border border-hairline/[0.08] bg-paper p-2 shadow-lg">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-2 text-center font-sans text-sm text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={email}
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 rounded-xl bg-accent px-4 py-2 text-center font-sans text-sm font-medium text-accent-foreground"
                >
                  Contact
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
