import type { CaseStudyDetail } from "@/types";
import { ux4g } from "@/lib/caseStudies/ux4g";

// Only slugs with a fully written, data-driven detail page live here — this
// shape is bespoke to UX4G's own Figma-frame structure (Part 1-4, etc.), not
// a generic case-study schema.
export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  ux4g,
};

// Every slug that resolves to a real page under /case-studies/[slug],
// whether driven by `caseStudyDetails` above or a bespoke route — eBCAS's
// article-style page doesn't fit the UX4G-shaped schema, so it's its own
// route rather than being forced into `CaseStudyDetail`, and Survey Setu's
// page is a "still being written" empty state rather than a real write-up
// (per "no invented content", there's nothing to write yet). Cards check
// this, not `caseStudyDetails`, to decide whether "View case study" links
// out.
export const caseStudySlugsWithDetail = new Set(["ux4g", "ebcas", "survey-setu"]);
