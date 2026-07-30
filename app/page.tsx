import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustedByMarquee } from "@/components/TrustedByMarquee";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { MoreWork } from "@/components/MoreWork";
import { Experience } from "@/components/Experience";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GridFrame, GridDivider } from "@/components/GridFrame";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <GridFrame>
        <Navbar />
        {/* New divider between the nav and Hero, 24px below the nav's
            visual bottom edge. Navbar's wrapper is `sticky top-4` (16px) —
            sticky reserves layout space at its unstuck position but paints
            itself 16px lower, so this sibling's flow position starts 16px
            above where the nav visually ends. `h-[40px]` (24 + that 16)
            compensates so the divider line lands exactly 24px below what's
            actually on screen, not 24px below the reserved flow position. */}
        <div className="flex h-[40px] items-end">
          <GridDivider />
        </div>
        <main>
          <Hero />
          <GridDivider />
          <TrustedByMarquee />
          <GridDivider />
          <ProjectsCarousel />
          <GridDivider />
          <MoreWork />
          <GridDivider />
          <Experience />
          <GridDivider />
          <TestimonialsCarousel />
          <GridDivider />
          <CtaBand />
        </main>
        <GridDivider />
        <Footer />
      </GridFrame>
    </>
  );
}
