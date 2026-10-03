import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/case-study/MoreCases";
import { BackToWork } from "@/components/case-study/BackToWork";
import { socialLinks } from "@/lib/data";
import {
  Shell,
  Hero,
  ChipGroup,
  BigStats,
  SectionHeading,
  Prose,
} from "@/components/case-study/ebcas/sections";
import {
  Chapter,
  Shot,
  PhonePair,
  PullQuote,
  Takeaway,
  QAList,
  TranslationMatrix,
  CustodyChain,
  DeadlineBar,
  ProcessSteps,
  DecisionGrid,
  Reflections,
} from "@/components/case-study/survey-setu/sections";

export const metadata: Metadata = {
  title: "Survey Setu — A national data pipeline for 4 million tribal households — Rahul Vaid",
  description:
    "Designing the Ministry of Tribal Affairs' offline-first survey platform end to end — mobile app, State Officer and Ministry Admin portals — from a 40-page architecture document to production in 8 days of design against a 15-day deadline.",
};

const SHOTS = {
  appScreens: {
    src: "/case-studies/survey-setu/app-screens.jpg",
    alt: "Survey Setu mobile app — splash screen and surveyor home showing online status, current survey, and completed, reviewed, draft and flagged form counts",
    width: 1600,
    height: 935,
  },
  language: {
    src: "/case-studies/survey-setu/language-selection.jpg",
    alt: "Language picker offering 21 Indian languages as large, script-labelled buttons",
    width: 390,
    height: 844,
  },
  geoTagging: {
    src: "/case-studies/survey-setu/geo-tagging.jpg",
    alt: "Household survey step one of eleven — location and geo-tagging with a map pin, recapture button, and an auto-saving indicator",
    width: 271,
    height: 830,
  },
  stateForms: {
    src: "/case-studies/survey-setu/submitted-forms.jpg",
    alt: "State Officer portal — submitted forms for the PVTG Household Survey, filterable by district, block, village, tribe and date",
    width: 1400,
    height: 1180,
  },
  adminDashboard: {
    src: "/case-studies/survey-setu/admin-dashboard.jpg",
    alt: "Ministry Admin dashboard — active surveys, state, district and surveyor counts, quick actions for onboarding officers, and survey-wise progress",
    width: 1400,
    height: 1181,
  },
};

/* Survey Setu arrived as a curated, eight-section written case study
   (Rahul's own brief), so — like eBCAS — it gets its own route and is
   built from ebcas/sections.tsx plus a handful of survey-specific shapes
   in survey-setu/sections.tsx, rather than force-fit into UX4G's schema.

   Every number here comes straight from that brief: the 15-day deadline
   closed in 8, 40+ lakh records, live 3 months after sign-off, five roles
   (three owned, one collaborated, one that never touches the app). The
   screenshots are the real production screens already in
   public/case-studies/survey-setu. */
export default function SurveySetuCaseStudyPage() {
  const linkedin = socialLinks.find((link) => link.icon === "linkedin")?.href ?? "#";

  return (
    <div className="relative overflow-x-clip bg-paper">
      <Navbar />

      <main>
        <BackToWork />

        <Hero
          heading="Survey Setu: designing a national data pipeline for 4 million tribal households"
          subtitle={
            <>
              The Ministry of Tribal Affairs needed every tribal household in India surveyed — by field
              workers with a day of training, on low-end phones, in villages with no signal. I designed
              the system that makes those visits trustworthy:{" "}
              <span className="font-medium text-text-primary">
                the Survey Setu mobile app end to end, plus the State Officer and Ministry Admin portals
              </span>
              .
            </>
          }
        />

        <Shell className="flex flex-col gap-block pb-section">
          <ChipGroup
            title="My Role"
            chips={["Lead Product Designer", "Discovery", "Systems architecture", "Flows & wireframes", "Handoff"]}
          />
          <ChipGroup title="Client" chips={["Ministry of Tribal Affairs", "NeGD", "Unified Digital Survey Platform"]} />
          <ChipGroup
            title="Scope"
            chips={["Mobile app (end to end)", "State Officer portal", "Ministry Admin portal"]}
          />
        </Shell>

        <Shell className="pb-section">
          <BigStats
            stats={[
              { value: "8", label: "days, against a 15-day deadline" },
              { value: "40L+", label: "tribal records processed" },
              { value: "5", label: "roles in the chain" },
              { value: "3", label: "surfaces I owned" },
            ]}
          />
        </Shell>

        <Shell className="pb-section">
          <Shot {...SHOTS.appScreens} priority />
        </Shell>

        {/* 01 — The hook */}
        <Chapter index="01 · The brief" title="15 days, no brief, 4 million lives">
          <PullQuote>
            Everyone assumes the hard part of a national survey is designing a good form. It isn&apos;t.
          </PullQuote>
          <Prose>
            The real question was how to make four million household visits trustworthy when the people
            collecting the data have{" "}
            <strong className="font-semibold text-text-primary">
              one day of training, low device literacy, and no internet
            </strong>{" "}
            across remote tribal regions.
          </Prose>
          <Prose>
            What I was handed: a 15-day deadline, one approved HTML form, and a 40-page technical
            architecture document. No PRD, no user flows, no admin UI. The design didn&apos;t exist yet.
          </Prose>
        </Chapter>

        {/* 02 — Day zero */}
        <Chapter
          index="02 · Day zero"
          title="De-briefing the void"
          lead="Instead of opening Figma and guessing, I ran one intensive alignment call with BAs, engineers, solution architects and NeGD stakeholders."
        >
          <QAList
            items={[
              { q: "Is there a BRD?", a: "No." },
              {
                q: "Then what is there?",
                a: "A core architecture document — encryption, RBAC, offline sync engines.",
              },
              {
                q: "Is the form locked?",
                a: "Yes. An HTML question set already **signed off by the Ministry**.",
              },
            ]}
          />
          <Takeaway>
            I wasn&apos;t there to redesign the questions. I was there to design the system of trust
            around them.
          </Takeaway>
        </Chapter>

        {/* 03 — Systems thinking */}
        <Chapter
          index="03 · Systems thinking"
          title="Translating code specs into UX realities"
          lead="An architecture document is not a design. Every backend clause carries a human consequence — so before drawing a screen, I mapped each one to what it would demand of the person holding the phone."
        >
          <TranslationMatrix
            rows={[
              {
                clause: "Offline-first sync engine",
                spec: "Delta sync and conflict resolution",
                consequence:
                  "Surveyors must always know what's **on the device versus what's synced**. Offline is the default working mode — never a silent failure.",
              },
              {
                clause: "DPDP Act compliance",
                spec: "Purpose-based consent",
                consequence:
                  "Consent becomes a **scripted, readable moment read aloud at the doorstep** — not a developer's checkbox.",
              },
              {
                clause: "Geo-fencing & tamper evidence",
                spec: "GPS metadata and boundary tagging",
                consequence:
                  "Out-of-boundary visits are **flagged at the doorstep**, with clear guidance on what to do — not discovered weeks later in review.",
              },
              {
                clause: "LGD village routing",
                spec: "Local Government Directory mapping",
                consequence:
                  "The home screen opens to an **actionable route and task list**, never a blank form.",
              },
              {
                clause: "Supervisory rejection loops",
                spec: "Approve / reject gateway",
                consequence:
                  "A rejection pinpoints the **exact faulty field and reason**, correctable in place — so a surveyor doesn't make a second 40-km trip.",
              },
            ]}
          />
        </Chapter>

        {/* 04 — Chain of custody */}
        <Chapter
          index="04 · Chain of custody"
          title="The form is one node in a much longer chain"
          lead="A survey response travels from a remote doorstep to a national policy decision. Every hand-off along the way is a place where trust can break — so I designed across all five roles in that chain, not just the form."
        >
          <CustodyChain
            start="Doorstep"
            end="National policy decision"
            roles={[
              {
                role: "Respondent",
                duty: "Tribal households who never touch the app, but depend entirely on its accuracy.",
                ownership: "context",
              },
              {
                role: "Field Surveyor",
                duty: "Low literacy, offline, high-stakes gathering — owned end to end.",
                ownership: "owned",
              },
              {
                role: "District Officer",
                duty: "Covers regional gaps between the field and the state.",
                ownership: "collaborated",
              },
              {
                role: "State Officer",
                duty: "Verifies, approves or rejects regional entries.",
                ownership: "owned",
              },
              {
                role: "Ministry Admin",
                duty: "Configures surveys and manages role-based access across tenants.",
                ownership: "owned",
              },
            ]}
          />
          <div className="grid grid-cols-1 gap-block md:grid-cols-2 md:gap-6">
            <Shot
              {...SHOTS.stateForms}
              caption="State Officer — every submitted household, filterable down to district, block, village and tribe."
            />
            <Shot
              {...SHOTS.adminDashboard}
              caption="Ministry Admin — national oversight across states, districts and surveyors, with officer onboarding one click away."
            />
          </div>
        </Chapter>

        {/* 05 — Process */}
        <Chapter
          index="05 · Process"
          title="Compressing 15 days into 8"
          lead="The deadline was already tight. The process was built to remove every step that didn't move the work toward build-ready screens."
        >
          <DeadlineBar given={15} used={8} />
          <ProcessSteps
            steps={[
              {
                title: "Decode & translate",
                time: "0.5 days",
                body: "Turned the architecture document into an architecture-to-UX matrix — the table above.",
              },
              {
                title: "Desk research",
                time: "0.5 days",
                body: "Studied how offline-first field tools fail: lost drafts, invisible sync, unexplained rejections.",
              },
              {
                title: "AI-assisted wireframing",
                body: "Rapid first-pass layouts, generated to be critiqued by stakeholders — not to be shipped.",
              },
              {
                title: "One review gate",
                body: "A single cross-functional session to lock alignment, instead of rolling sign-offs.",
              },
              {
                title: "Straight to high fidelity",
                body: "Skipped mid-fi and delivered build-ready screens directly to engineering.",
              },
              {
                title: "Asked for help on day 3",
                body: "Requested a second designer for the parallel portal tracks, while I kept Mobile, Admin and State.",
              },
            ]}
          />
        </Chapter>

        {/* 06 — Decisions */}
        <Chapter
          index="06 · Design decisions"
          title="Four decisions that carried the most weight"
        >
          <DecisionGrid
            items={[
              {
                title: "Sync state you can see",
                body: "Placed exactly where surveyors already look, with five unambiguous states — so nobody leaves a village unsure whether their day's work exists anywhere but their phone.",
                chips: ["On device", "Queued", "Syncing", "Synced", "Failed"],
              },
              {
                title: "Forms that survive interruption",
                body: "Every step saves as it goes. A dropped call, a dead battery or a household that asks you to come back later never costs a partial record.",
              },
              {
                title: "Rejections that close the loop",
                body: "Field-level feedback tells the surveyor **what** is wrong and **where**, so it's fixed in place — not on a second trip.",
              },
              {
                title: "Usable with zero training",
                body: "One action per screen, plain language, and no icon that needs explaining. The app assumes the one-day training didn't stick.",
              },
            ]}
          />
          <PhonePair
            shots={[SHOTS.language, SHOTS.geoTagging]}
            caption="Language comes first, in each language's own script. Every household form is broken into short sections that auto-save — location is captured once, at the door, and locked."
          />
        </Chapter>

        {/* 07 — Impact */}
        <Chapter index="07 · Impact" title="Scale and real-world impact">
          <BigStats
            stats={[
              { value: "8", label: "days to close a 15-day deadline" },
              { value: "0", label: "rework loops at MoTA approval" },
              { value: "3 mo", label: "from sign-off to production" },
              { value: "40L+", label: "authenticated tribal records" },
            ]}
          />
          <Takeaway label="Built to outlive one survey">
            The platform is multi-tenant by design — other ministries can run their own surveys on the
            same roles, sync engine and review loops without a redesign.
          </Takeaway>
        </Chapter>

        {/* 08 — Reflections */}
        <Chapter index="08 · Reflections" title="What I'd do differently">
          <Reflections
            items={[
              {
                title: "Trade a day of polish for a day in the field",
                body: "I'd give up a day of high-fidelity refinement to watch real enumerators work a village. Everything I knew about them was second-hand.",
              },
              {
                title: "Test with end users before handoff",
                body: "Stakeholder review was rigorous, but direct usability testing with surveyors before handoff was constrained by the timeline. It's the gap I'd close first.",
              },
              {
                title: "Push harder on the ethics of oversight",
                body: "Tracking surveyor activity makes data trustworthy — it also edges toward surveillance. I'd interrogate where administrative oversight should stop more deeply than the timeline allowed.",
              },
            ]}
          />
        </Chapter>

        <Shell className="flex flex-col gap-block pb-section">
          <SectionHeading>Want the longer version?</SectionHeading>
          <Prose>
            <>
              The parts that don&apos;t fit in a write-up — the architecture matrix in full, the review
              session, the trade-offs we argued about — I&apos;m happy to walk through.{" "}
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary underline decoration-hairline/40 underline-offset-4 hover:decoration-text-primary"
              >
                Find me on LinkedIn
              </a>
              .
            </>
          </Prose>
        </Shell>

        <MoreCases />
      </main>

      <Footer />
    </div>
  );
}
