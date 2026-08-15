import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BentoGrid } from "@/components/case-study/ux4g/BentoGrid";
import { BenchmarkWall, CompetitiveAnalysisSheet } from "@/components/case-study/ux4g/BenchmarkWall";
import {
  Shell,
  TitleBlock,
  ChipGroup,
  TeamAndCollaboration,
  ChallengeBand,
  ImpactBand,
  DesignTimeline,
  AuditSection,
  WhyNobodyUsedIt,
  HowWeRebuiltIt,
  SectionHeading,
  ServiceResearch,
  GatheringInsights,
  SolutionDivider,
  FoundationsOpener,
  PartOpener,
  PatternModel,
  Figure,
  BigStats,
  ContentBlockView,
  Prose,
  ThankYou,
} from "@/components/case-study/ux4g/sections";
import { MoreCases } from "@/components/case-study/MoreCases";
import { caseStudyDetails } from "@/lib/caseStudies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(caseStudyDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = caseStudyDetails[slug];
  if (!detail) return {};
  return { title: detail.metaTitle, description: detail.metaDescription };
}

/* The page follows the Figma frame "Case study - UX4G design system 3.0
   Light" (node 2944:48094) top to bottom, section for section. The frame
   ends on the Thank you block — there is no closing impact/reflection
   chapter in it, so there is none here either. MoreCases stays because it
   is site chrome, like the Navbar and Footer, rather than case-study
   content the frame owns. */
export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = caseStudyDetails[slug];

  if (!detail) {
    notFound();
  }

  return (
    <div className="relative overflow-x-clip bg-paper">
      <Navbar />
      {/* Note: the Figma MCP reports `"opsz" 14` on every text node, but
          Figma lays the text out at DM Sans's default optical size — forcing
          the axis here made every string ~6% wider than the frame (measured:
          "Service patterns" hugs 231 in Figma, 244 at opsz 14, 230 at the
          default). So the axis is deliberately not set. */}
      <main>
        {/* The frame opens on the bento collage, not a conventional hero.
            Every top-level section in the frame is separated by exactly
            100px, and the first one sits 100px below the artboard top —
            that constant is the page's whole vertical rhythm. */}
        <Shell className="pb-section pt-section">
          <BentoGrid />
        </Shell>

        <TitleBlock />

        {/* §3 — the three chip groups are one section, 48px apart. */}
        <Shell className="flex flex-col gap-block pb-section">
          <ChipGroup title="My Role & Responsibilities" chips={detail.roleChips} />
          <ChipGroup title="Timeline" chips={detail.timelineChips} />
          <ChipGroup title="Platforms" chips={detail.platformChips} withIcons />
        </Shell>

        {/* Every section pads its own bottom, including the ones before a
            full-bleed band. Dropping it on the theory that "the background
            change is the separator" was wrong: the band separates the two
            regions, but the previous section's content then lands flush on a
            hard colour edge with nothing under it.

            The mirror of that holds too: a section that *follows* a band needs
            its own `pt-section`. The band's `py-section` pads the inside of
            the band, not the outside — without a top pad the next heading
            starts on the colour edge. */}
        <Shell className="pb-section">
          <TeamAndCollaboration
            bullets={detail.teamAndCollaboration.bullets}
            roles={detail.teamAndCollaboration.roles}
          />
        </Shell>

        {/* Two separate bands in the frame: the problem on its own dark
            field, the payoff back on paper. */}
        <ChallengeBand items={detail.challenge} />

        <div className="pb-section pt-section">
          <ImpactBand items={detail.impactTeaser} />
        </div>

        <Shell className="pb-section">
          <DesignTimeline />
        </Shell>

        <AuditSection />

        {/* The 2.0 scoreboard — the same story in numbers, a real team, and
            four live apps that all look like different systems. */}
        <div className="pb-section pt-section">
          <WhyNobodyUsedIt />
        </div>

        <HowWeRebuiltIt />

        {/* Benchmarking → the competitive analysis that came out of it. Two
            separate sections, so they're two groups a full section gap apart:
            48px binds a heading to the exhibit under it, 96px separates the
            pairs. Run flat at 48px they read as one four-part list. */}
        <Shell className="flex flex-col gap-section pb-section pt-section">
          <div className="flex flex-col gap-block">
            <SectionHeading eyebrow="First off" title="We Benchmarked" accent="18 design systems" />
            <BenchmarkWall />
          </div>
          <div className="flex flex-col gap-block">
            <SectionHeading eyebrow="Then started with" title="Competitive" accent="analysis" />
            <CompetitiveAnalysisSheet />
          </div>
        </Shell>

        {/* Its own band, on the panel tint — the catalogue analysis is a
            chapter of the research in its own right, not a tail on the
            benchmarking. Still before the solution: Parts 1-4 are what we
            built, this is how we knew what to build. */}
        <ServiceResearch block={detail.serviceResearch} />

        <div className="pb-section pt-section">
          <GatheringInsights />
        </div>

        {/* Outline behind, solid blue offset in front — one layered mark,
            set to the same 1120 column as the collage it tucks behind. */}
        <Shell>
          <SolutionDivider />
        </Shell>

        {/* ── Part 1 · New Foundations ─────────────────────────── */}
        {/* No top padding from `md` — the collage butts against the divider so
            it can occlude it. That switch has to sit on the same breakpoint as
            the collage itself (`md:block` in FoundationsOpener); left at `lg`
            it pushed the opener down through the whole md–lg range and the
            headline stopped tucking. Below `md` there is no collage, so the
            opener takes the normal section gap instead.

            Blocks are a full section apart, not 48px: at 48 the gap between
            two "Introducing – " chapters equalled the gap *inside* one, so
            four separate topics read as a single run of text. */}
        <Shell className="flex flex-col gap-section pb-section pt-section md:pt-0">
          <FoundationsOpener />
          {detail.foundations.map((block) => (
            <ContentBlockView key={block.title} block={block} />
          ))}
        </Shell>

        {/* ── Part 2 · The component library ───────────────────── */}
        {/* One Shell, same rhythm as Part 1: opener and its stat row are one
            unit at 48px, then each block a full section apart.

            The frame put a green "The Library / Built brand new design
            components library" band between the stats and the blocks. It's
            gone — the chapter opener directly above it already says "The
            component library", so the band restated the heading and split the
            chapter in two for nothing. */}
        <Shell className="flex flex-col gap-section pb-section">
          <div className="flex flex-col gap-block">
            <PartOpener content={detail.components.opener} />
            <BigStats stats={detail.components.stats} />
          </div>
          {detail.components.blocks.map((block) => (
            <ContentBlockView key={block.title} block={block} />
          ))}
        </Shell>

        {/* ── Part 3 · Service Patterns ────────────────────────── */}
        <Shell className="flex flex-col gap-block pb-section">
          <PartOpener content={detail.patterns.opener} />
          <Prose>{detail.patterns.intro}</Prose>
          <BigStats stats={detail.patterns.stats} />
          <PatternModel contrast={detail.patterns.contrast} groups={detail.patterns.groups} />
          <Figure {...detail.patterns.image} frame />
        </Shell>

        {/* ── Part 4 · How teams get it ────────────────────────── */}
        <Shell className="flex flex-col gap-block pb-section">
          <PartOpener content={detail.rollout.opener} />
          <ContentBlockView
            prefix=""
            block={{
              title: "",
              lead: detail.rollout.lead,
              bullets: detail.rollout.bullets,
              images: [detail.rollout.image],
            }}
          />
        </Shell>

        <Shell className="pb-section">
          <MoreCases currentSlug={slug} />
        </Shell>

        <ThankYou email="rahulvaidux@gmail.com" />
      </main>
      <Footer />
    </div>
  );
}
