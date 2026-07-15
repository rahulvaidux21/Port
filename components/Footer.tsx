"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, Mail, FileText, Palette } from "lucide-react";
import { socialLinks, footerCopy, hero } from "@/lib/data";
import { useRevealOnScroll } from "@/lib/motion";

// Lucide has no Behance mark; Palette stands in as the closest semantic fit
// (creative portfolio) so every icon in the project comes from one library.
function SocialIcon({ icon }: { icon: "linkedin" | "behance" | "mail" | "file" }) {
  if (icon === "linkedin") return <Linkedin className="w-4 h-4" />;
  if (icon === "mail") return <Mail className="w-4 h-4" />;
  if (icon === "file") return <FileText className="w-4 h-4" />;
  return <Palette className="w-4 h-4" />;
}

export function Footer() {
  const reduced = useReducedMotion();
  const reveal = useRevealOnScroll(reduced);

  return (
    <footer className="relative border-t border-editor-border/60">
      <motion.div key={reveal.key} {...reveal.props}>
        <div className="pt-12 text-center">
          <p className="font-sans text-lg font-bold text-text-primary">{hero.name}</p>
          <p className="mt-1 font-sans text-sm text-text-secondary">{footerCopy.line}</p>
        </div>

        <div className="flex justify-center gap-6 pt-6 pb-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.icon === "linkedin" || link.icon === "behance" ? "_blank" : undefined}
              rel="noopener noreferrer"
              download={link.icon === "file" ? true : undefined}
              className="group relative font-sans text-[14px] text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 transition-colors flex items-center justify-center h-6 px-1"
            >
              <span className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
                {`{${link.label}}`}
              </span>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <SocialIcon icon={link.icon} />
              </span>
            </a>
          ))}
        </div>

        <p className="text-center pt-6 pb-2 font-mono text-xs text-text-muted">{footerCopy.copyright}</p>
        <p className="text-center pb-12 font-mono text-xs text-text-muted">
          Built with Claude Code · Vercel does the rest.
        </p>
      </motion.div>
    </footer>
  );
}
