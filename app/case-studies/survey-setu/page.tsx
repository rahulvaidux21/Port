import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ComingSoon } from "@/components/case-study/ComingSoon";
import { BackToWork } from "@/components/case-study/BackToWork";
import { Shell } from "@/components/case-study/ux4g/sections";

export const metadata: Metadata = {
  title: "Survey Setu App — Case study coming soon — Rahul Vaid",
  description: "The Survey Setu case study is still being written — check back soon.",
};

/* No write-up yet for real (unlike eBCAS, which just needed its own route
   — this one genuinely has nothing behind it beyond the landing-page
   summary card in lib/data.ts). Rather than let the card link nowhere,
   it gets a real empty state instead of falling back to `/#work`. */
export default function SurveySetuComingSoonPage() {
  return (
    <div className="relative overflow-x-clip bg-paper">
      <Navbar />
      <main>
        <BackToWork />

        <Shell>
          <ComingSoon
            eyebrow="Survey Setu · Ministry of Tribal Affairs"
            title="The write-up is still on the clipboard."
            body="Survey Setu has been live since April 2026 — the case study just hasn't caught up yet. I'm putting the full write-up together now. Check back soon, or reach out if you want the highlights sooner."
          />
        </Shell>
      </main>
      <Footer />
    </div>
  );
}
