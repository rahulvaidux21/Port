"use client";

import { ArrowUp } from "lucide-react";

const year = new Date().getFullYear();

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-vaid-1b768423a" },
  { label: "Behance", href: "https://www.behance.net/rahulvaid1" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="section-padding border-t border-border" aria-label="Footer">
      <div className="content-grid">
        <div className="py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold">
              RV
            </span>
            <div>
              <p className="font-semibold text-sm leading-tight">Rahul Vaid</p>
              <a
                href="mailto:rahulvaidux@gmail.com"
                className="text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                rahulvaidux@gmail.com
              </a>
            </div>
          </div>

          {/* Social */}
          <ul className="flex items-center gap-6" role="list">
            {SOCIAL.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-3 inline-block"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group self-start sm:self-auto min-h-11"
            aria-label="Back to top"
          >
            <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-foreground group-hover:bg-muted transition-colors">
              <ArrowUp size={14} aria-hidden="true" />
            </span>
            Back to top
          </button>
        </div>

        <div className="border-t border-border py-6">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Rahul Vaid. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
