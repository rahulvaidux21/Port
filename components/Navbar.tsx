"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const rm = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    navItems.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Overlay focus management: move focus in, trap Tab, close on Escape,
  // return focus to the toggle on close (WCAG 2.4.3)
  useEffect(() => {
    if (!mobileOpen) return;

    const menu = menuRef.current;
    menu?.querySelector<HTMLElement>("a, button")?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menu) return;
      // The header (logo, theme toggle, X) stays visible above the overlay,
      // so the trap must cycle through it too — visible elements only
      const header = headerRef.current;
      const focusables = [
        ...(header?.querySelectorAll<HTMLElement>("a, button") ?? []),
        ...menu.querySelectorAll<HTMLElement>("a, button"),
      ].filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/60"
            : "bg-transparent"
        )}
      >
        <div className="content-grid section-padding">
          <nav
            className="flex items-center justify-between h-16"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Rahul Vaid, back to top"
            >
              <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold tracking-tight">
                RV
              </span>
              <span className="font-semibold text-sm hidden sm:block tracking-tight">
                Rahul Vaid
              </span>
            </a>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(href);
                    }}
                    className={cn(
                      "px-3.5 py-2 rounded-full text-sm font-medium transition-colors duration-150",
                      activeSection === href
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity"
              >
                Let&apos;s talk
              </a>
              <button
                ref={toggleRef}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-11 h-11 -mr-1.5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: rm ? 1 : 0, y: rm ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: rm ? 1 : 0, y: rm ? 0 : -8 }}
            transition={{ duration: rm ? 0 : 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-background pt-16"
          >
            <div ref={menuRef} className="section-padding py-8 flex flex-col gap-2">
              {navItems.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  initial={{ opacity: rm ? 1 : 0, x: rm ? 0 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rm ? 0 : i * 0.05, duration: rm ? 0 : 0.25, ease: "easeOut" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  className="flex items-center justify-between py-4 border-b border-border text-xl font-medium text-foreground hover:text-accent transition-colors"
                >
                  <span>{label}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: rm ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rm ? 0 : 0.3 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="mt-6 w-full py-4 rounded-full bg-foreground text-background text-center text-sm font-medium"
              >
                Let&apos;s talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
