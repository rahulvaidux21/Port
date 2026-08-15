import type { CaseStudyDetail } from "@/types";
import { ux4g } from "@/lib/caseStudies/ux4g";

// Only slugs with a fully written detail page live here — Survey Setu and
// eBCAS keep their landing-page summary cards but don't get a "View case
// study" link until their content files exist, per "no invented content".
export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  ux4g,
};
