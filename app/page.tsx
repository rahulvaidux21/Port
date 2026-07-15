import { IntroSplash } from "@/components/IntroSplash";
import { Navbar } from "@/components/Navbar";
import { FloatingNav } from "@/components/FloatingNav";
import { Hero } from "@/components/Hero";
import { ValueChips } from "@/components/ValueChips";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { Experience } from "@/components/Experience";
import { Testimonials } from "@/components/Testimonials";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <IntroSplash />
      <Navbar />
      <FloatingNav />
      <main>
        {/* Hero + value chips share the first viewport so the chips sit
            above the fold — the hero centres in the remaining space and the
            marquee band pins to the bottom of the screen. */}
        <div className="flex min-h-[calc(100svh-92px)] flex-col">
          <Hero />
          <ValueChips />
        </div>
        <ProjectBrowser />
        <Experience />
        <Testimonials />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
