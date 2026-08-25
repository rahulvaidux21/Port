import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Shell } from "@/components/case-study/ux4g/sections";

/** The first thing on every case-study page — owns the floating Navbar's
    clearance itself (`pt-section`), so the page directly below it only
    needs a small secondary gap, not a second full section of top padding.
    Every case-study route pairs this with a reduced top pad on its own
    hero/content (see app/case-studies/*.tsx). */
export function BackToWork() {
  return (
    <Shell className="pt-section">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 font-sans text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Back to Work
      </Link>
    </Shell>
  );
}
