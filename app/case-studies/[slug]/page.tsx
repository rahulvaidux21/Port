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
  GatheringInsights,
  SolutionDivider,
  FoundationsOpener,
  PartOpener,
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
        <Shell className="pt-12 md:pt-[72px]">
          <BentoGrid />
        </Shell>

        <TitleBlock />

        {/* §3 — the three chip groups are one section, 48px apart. */}
        <Shell className="flex flex-col gap-10 pt-16 md:gap-8 md:pt-[72px]">
          <ChipGroup title="My Role & Responsibilities" chips={detail.roleChips} />
          <ChipGroup title="Timeline" chips={detail.timelineChips} />
          <ChipGroup title="Platforms" chips={detail.platformChips} withIcons />
        </Shell>

        {/* §4 — its own section, so the frame's 100px gap applies. */}
        <Shell className="pt-16 md:pt-[72px]">
          <TeamAndCollaboration
            bullets={detail.teamAndCollaboration.bullets}
            roles={detail.teamAndCollaboration.roles}
          />
        </Shell>

        {/* Two separate bands in the frame: the problem on its own dark
            field, the payoff back on paper. */}
        <div className="mt-16 md:mt-[72px]">
          <ChallengeBand items={detail.challenge} />
        </div>

        <div className="py-16 md:py-[72px]">
          <ImpactBand items={detail.impactTeaser} />
        </div>

        <Shell>
          <DesignTimeline />
        </Shell>

        <div className="mt-16 md:mt-[72px]">
          <AuditSection />
        </div>

        {/* The 2.0 scoreboard — the same story in numbers, a real team, and
            four live apps that all look like different systems. */}
        <div className="py-16 md:py-[72px]">
          <WhyNobodyUsedIt />
        </div>

        <HowWeRebuiltIt />

        {/* Benchmarking → the competitive analysis that came out of it. */}
        <Shell className="flex flex-col gap-16 py-16 md:gap-12 md:py-[72px]">
          <SectionHeading eyebrow="First off" title="We Benchmarked" accent="18 design systems" />
          <BenchmarkWall />
          <SectionHeading eyebrow="Then started with" title="Competitive" accent="analysis" />
          <CompetitiveAnalysisSheet />
        </Shell>

        <div className="pb-16 md:pb-[72px]">
          <GatheringInsights />
        </div>

        {/* Outline behind, solid blue offset in front — one layered mark,
            set to the same 1120 column as the collage it tucks behind. */}
        <Shell>
          <SolutionDivider />
        </Shell>

        {/* ── Part 1 · New Foundations ─────────────────────────── */}
        {/* No top padding at `lg` — the collage butts against the divider so
            it can occlude it. Below `lg` that occlusion doesn't apply, so the
            opener takes the normal section gap instead of sitting flush
            against the headline. */}
        <Shell className="flex flex-col gap-16 pb-16 pt-16 md:gap-12 md:pb-[72px] lg:pt-0">
          <FoundationsOpener />
          {detail.foundations.map((block) => (
            <ContentBlockView key={block.title} block={block} />
          ))}
        </Shell>

        {/* ── Part 2 · The component library ───────────────────── */}
        <Shell className="flex flex-col gap-16 pb-16 md:gap-12 md:pb-[72px]">
          <PartOpener content={detail.components.opener} />
          <BigStats stats={detail.components.stats} />
        </Shell>

        {/* The library band runs full-bleed on #002d01 with 60px of padding;
            both lines are set at 64px, the eyebrow in Caveat. */}
        <section className="bg-cs-green-deep py-10 md:py-[44px]">
          <Shell className="flex flex-col gap-4">
            <p className="font-caveat text-[clamp(1.25rem,2.222vw,2rem)] leading-none text-white">
              The Library
            </p>
            <h2 className="font-sans text-[clamp(1.5rem,2.361vw,2.125rem)] font-semibold leading-[1.2] text-white">
              Built brand new design components library
            </h2>
          </Shell>
        </section>

        <Shell className="flex flex-col gap-16 py-16 md:gap-12 md:py-[72px]">
          {detail.components.blocks.map((block) => (
            <ContentBlockView key={block.title} block={block} />
          ))}
        </Shell>

        {/* ── Part 3 · Service Patterns ────────────────────────── */}
        <Shell className="flex flex-col gap-16 pb-16 md:gap-12 md:pb-[72px]">
          <PartOpener content={detail.patterns.opener} />
          <Prose>{detail.patterns.intro}</Prose>
          <BigStats stats={detail.patterns.stats} />
          {detail.patterns.blocks.map((block) => (
            <ContentBlockView key={block.title} block={block} />
          ))}
        </Shell>

        {/* ── Part 4 · How teams get it ────────────────────────── */}
        <Shell className="flex flex-col gap-16 pb-16 md:gap-12 md:pb-[72px]">
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

        <Shell className="pb-16 md:pb-[72px]">
          <MoreCases currentSlug={slug} />
        </Shell>

        <ThankYou email="rahulvaidux@gmail.com" />
      </main>
      <Footer />
    </div>
  );
}
