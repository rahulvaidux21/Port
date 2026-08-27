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
  ReleaseStatus,
  TradeOffs,
  ThankYou,
} from "@/components/case-study/ux4g/sections";
import { MoreCases } from "@/components/case-study/MoreCases";
import { BackToWork } from "@/components/case-study/BackToWork";
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
        <BackToWork />

        {/* The frame opens on the bento collage, not a conventional hero.
            Every top-level section in the frame is separated by exactly
            100px; `BackToWork` above now owns that 100px of navbar
            clearance, so this only needs a small secondary gap under it. */}
        <Shell className="pb-section pt-6">
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
        {/* Parts 1 and 2's rhythm: the chapter head is one unit at 48px, and
            the body a full section below it. Not 96px between all five —
            these aren't five chapters, they're one argument, and the intro
            and its counts belong to the opener that introduces them. */}
        <Shell className="flex flex-col gap-section pb-section">
          <div className="flex flex-col gap-block">
            <PartOpener content={detail.patterns.opener} />
            <Prose>{detail.patterns.intro}</Prose>
            <BigStats stats={detail.patterns.stats} />
          </div>
          <div className="flex flex-col gap-block">
            <PatternModel contrast={detail.patterns.contrast} groups={detail.patterns.groups} />
            <Figure {...detail.patterns.image} frame />
          </div>
        </Shell>

        {/* ── Part 4 · How teams get it ────────────────────────── */}
        {/* 48px, not 96: the chapter head binds to its own body, the same as
            Parts 2 and 3 do. This ran at the section gap on the theory that
            two children need no inner rhythm, but that made Part 4 the one
            chapter whose heading floated free of the copy under it — the
            body text was always identical, it was this gap that read wrong. */}
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

        {/* ── Where it stands ──────────────────────────────────── */}
        {/* Straight after Part 4: that chapter says how a team gets the
            system, and the obvious next question — is it actually out? —
            went unanswered on the whole page until this. Before the
            Trade-offs, not after, so the outcome lands before the
            reflection on it, and so trade-off 04's closing "Beta shipped in
            June 2026" reads as a callback rather than a first mention. */}
        <ReleaseStatus block={detail.release} />

        {/* ── The closing chapter · Trade-offs ─────────────────── */}
        {/* Last, and after Part 4 on purpose. Each of these four stories
            resolves *after* the build — the evidence one ends with 3.0
            being resumed, the scope one with the Beta shipping — so read
            any earlier they would spoil outcomes the reader has not met.
            It is also the only chapter about judgement rather than craft,
            which makes it the right thing to leave a reader holding.

            On the panel tint, like ServiceResearch: the page marks a change
            of register with a band, and this is the change from "what we
            built" to "how we decided". */}
        <TradeOffs block={detail.tradeoffs} />

        {/* MoreCases is the landing page's More Work carousel and brings its
            own max-width container and vertical padding, so no Shell here. */}
        <MoreCases />

        <ThankYou />
      </main>
      <Footer />
    </div>
  );
}
