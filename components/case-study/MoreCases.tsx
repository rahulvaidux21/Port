import { MoreWork } from "@/components/MoreWork";

/** The landing page's "More work" carousel, verbatim, retitled "More Cases"
    for the case-study pages. Every card links out to Behance, so nothing
    here needs to know which case study is currently open. */
export function MoreCases() {
  return <MoreWork part1="More" part2="Cases" />;
}
