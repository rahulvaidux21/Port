import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/case-study/MoreCases";
import { BackToWork } from "@/components/case-study/BackToWork";
import { socialLinks } from "@/lib/data";
import { Shell, Prose, ChallengeBand, ImpactBand } from "@/components/case-study/ux4g/sections";
import {
  TitleBlock,
  BrandSpan,
  ChipGroup,
  Statement,
  Section,
  SectionHeading,
  PanelBand,
  QAList,
  Takeaway,
  TranslationMatrix,
  CustodyChain,
  DeadlineBar,
  ProcessSteps,
  PartOpener,
  FeatureBlock,
  PortalBlock,
  Placeholder,
  PhoneShot,
  Plate,
  BigStats,
  StatusList,
  ReflectionCards,
  ThankYou,
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

/* Survey Setu follows the UX4G case study's structure and system section
   for section (see the comment block at the top of
   survey-setu/sections.tsx): title + hero plate → chip rows → the dark
   Challenge band → the Impact teaser → the problem framing → research on
   a panel band → "Part 1 / Part 2" openers with "Introducing – …" blocks →
   where it stands → reflections on a panel band → More Cases → Thank you.
   The Challenge and Impact bands are UX4G's own components, so problem-red
   and payoff-green read identically across both case studies.

   Every number comes straight from Rahul's curated brief: the 15-day
   deadline closed in 8, 40+ lakh records, live 3 months after sign-off,
   five roles (three owned, one collaborated, one that never touches the
   app). Dashed `Placeholder` slots mark real screens still to be exported;
   each one's hint says exactly what goes there. */
export default function SurveySetuCaseStudyPage() {
  const linkedin = socialLinks.find((link) => link.icon === "linkedin")?.href ?? "#";

  return (
    <div className="relative overflow-x-clip bg-paper">
      <Navbar />

      <main>
        <BackToWork />

        <TitleBlock
          title="Designing a national data pipeline for 4 million tribal households"
          subtitle={
            <>
              Survey Setu for the Ministry of Tribal Affairs —{" "}
              <BrandSpan>an offline-first mobile app, end to end, plus the State Officer and Ministry Admin portals</BrandSpan>{" "}
              that turn doorstep visits into national policy data.
            </>
          }
          image={SHOTS.appScreens}
        />

        <Shell className="flex flex-col gap-block pb-section">
          <ChipGroup
            title="My Role & Responsibilities"
            chips={["Lead Product Designer", "Discovery", "Systems architecture", "Flows & wireframes", "Handoff"]}
          />
          <ChipGroup title="Timeline" chips={["15-day deadline", "Closed in 8 days", "Live 3 months after sign-off"]} />
          <ChipGroup title="Platforms" chips={["Mobile", "Web"]} withIcons />
          <ChipGroup
            title="Worked With"
            chips={["Ministry of Tribal Affairs", "NeGD", "Business analysts", "Engineers", "Solution architects", "A second designer, from day 3"]}
          />
        </Shell>

        <ChallengeBand
          items={[
            "One day of surveyor training",
            "Low device literacy",
            "No connectivity across remote tribal regions",
            "No PRD, no user flows, no admin UI",
            "A question set already locked by the Ministry",
            "DPDP Act consent at every doorstep",
            "A 15-day design deadline",
          ]}
        />

        <div className="pb-section pt-section">
          <ImpactBand
            items={[
              { lead: "Design closed in", value: "8 days", caption: "against a 15-day deadline" },
              { lead: "Approved by MoTA with", value: "0 rework loops", caption: "at Ministry sign-off" },
              { lead: "Captured", value: "40+ lakh", caption: "authenticated tribal records" },
            ]}
          />
        </div>

        {/* ── The problem framing ─────────────────────────────── */}
        <Statement
          before="Everyone assumes the hard part of a national survey is designing a good form."
          turn="It isn't."
        />

        <Section
          eyebrow="The real question"
          title="15 days, no brief,"
          accent="4 million lives"
        >
          <Prose>
            <>
              How do you make four million household visits trustworthy when the people collecting the
              data have{" "}
              <strong className="font-semibold text-text-primary">
                one day of training, low device literacy, and no internet
              </strong>
              ? What I was handed: a 15-day deadline, one approved HTML form, and a 40-page technical
              architecture document. No PRD, no user flows, no admin UI. The design didn&apos;t exist yet.
            </>
          </Prose>
        </Section>

        <Section
          eyebrow="Day zero"
          title="De-briefing"
          accent="the void"
          lead="Instead of opening Figma and guessing, I ran one intensive alignment call with BAs, engineers, solution architects and NeGD stakeholders."
        >
          <QAList
            items={[
              { q: "Is there a BRD?", a: "No." },
              { q: "Then what is there?", a: "A core architecture document — encryption, RBAC, offline sync engines." },
              { q: "Is the form locked?", a: "Yes. An HTML question set already **signed off by the Ministry**." },
            ]}
          />
          <Takeaway>
            I wasn&apos;t there to redesign the questions. I was there to design{" "}
            <span className="text-ss-green">the system of trust around them</span>.
          </Takeaway>
        </Section>

        {/* ── Research, on the panel band ─────────────────────── */}
        <PanelBand>
          <Shell className="flex flex-col gap-block">
            <div className="flex flex-col gap-4">
              <SectionHeading eyebrow="Before drawing a screen" title="Translating code specs into" accent="UX realities" />
              <Prose>
                An architecture document is not a design. Every backend clause carries a human
                consequence — so I mapped each one to what it would demand of the person holding the
                phone.
              </Prose>
            </div>
            <TranslationMatrix
              rows={[
                {
                  clause: "Offline-first sync engine",
                  spec: "Delta sync and conflict resolution",
                  consequence: "Surveyors must always know what's **on the device versus what's synced**. Offline is the default working mode — never a silent failure.",
                },
                {
                  clause: "DPDP Act compliance",
                  spec: "Purpose-based consent",
                  consequence: "Consent becomes a **scripted, readable moment read aloud at the doorstep** — not a developer's checkbox.",
                },
                {
                  clause: "Geo-fencing & tamper evidence",
                  spec: "GPS metadata and boundary tagging",
                  consequence: "Out-of-boundary visits are **flagged at the doorstep**, with clear guidance on what to do — not discovered weeks later in review.",
                },
                {
                  clause: "LGD village routing",
                  spec: "Local Government Directory mapping",
                  consequence: "The home screen opens to an **actionable route and task list**, never a blank form.",
                },
                {
                  clause: "Supervisory rejection loops",
                  spec: "Approve / reject gateway",
                  consequence: "A rejection pinpoints the **exact faulty field and reason**, correctable in place — so a surveyor doesn't make a second 40-km trip.",
                },
              ]}
            />
            <Placeholder
              label="Architecture-to-UX matrix · working board"
              hint="Pending — the original FigJam/Figma board where the 40-page architecture document was decoded clause by clause."
            />
          </Shell>
        </PanelBand>

        <Section
          className="pt-section"
          eyebrow="Who it's really for"
          title="The form is one node in a much"
          accent="longer chain"
          lead="A survey response travels from a remote doorstep to a national policy decision. Every hand-off is a place where trust can break — so I designed across all five roles in that chain, not just the form."
        >
          <CustodyChain
            start="Doorstep"
            end="National policy decision"
            roles={[
              { role: "Respondent", duty: "Tribal households who never touch the app, but depend entirely on its accuracy.", ownership: "context" },
              { role: "Field Surveyor", duty: "Low literacy, offline, high-stakes gathering — owned end to end.", ownership: "owned" },
              { role: "District Officer", duty: "Covers regional gaps between the field and the state.", ownership: "collaborated" },
              { role: "State Officer", duty: "Verifies, approves or rejects regional entries.", ownership: "owned" },
              { role: "Ministry Admin", duty: "Configures surveys and manages role-based access across tenants.", ownership: "owned" },
            ]}
          />
          <Placeholder
            label="End-to-end service blueprint"
            hint="Pending — the five-role flow from doorstep capture through district, state and ministry review, with the sync and rejection loops marked."
          />
        </Section>

        <Section
          eyebrow="How it got done"
          title="Compressing 15 days"
          accent="into 8"
          lead="The deadline was already tight. The process was built to remove every step that didn't move the work toward build-ready screens."
        >
          <DeadlineBar given={15} used={8} />
          <ProcessSteps
            steps={[
              { title: "Decode & translate", time: "0.5 days", body: "Turned the architecture document into an architecture-to-UX matrix — the table above." },
              { title: "Desk research", time: "0.5 days", body: "Studied how offline-first field tools fail: lost drafts, invisible sync, unexplained rejections." },
              { title: "AI-assisted wireframing", body: "Rapid first-pass layouts, generated to be critiqued by stakeholders — not to be shipped." },
              { title: "One review gate", body: "A single cross-functional session to lock alignment, instead of rolling sign-offs." },
              { title: "Straight to high fidelity", body: "Skipped mid-fi and delivered build-ready screens directly to engineering." },
              { title: "Asked for help on day 3", body: "Requested a second designer for the parallel portal tracks, while I kept Mobile, Admin and State." },
            ]}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Placeholder label="AI-assisted first pass" hint="Pending — a first-pass wireframe as it went into the review gate." />
            <Placeholder label="Build-ready high fidelity" hint="Pending — the same screen as it was handed to engineering." />
          </div>
        </Section>

        {/* ── Part 1 · The field app ──────────────────────────── */}
        <Shell className="flex flex-col gap-section pb-section">
          <PartOpener
            part="Part 1"
            title="The field app"
            lead="Built for a surveyor with one day of training, no signal, and a household waiting at the door."
            visual={
              <Placeholder
                label="Field app · key screens"
                hint="Pending — a collage of the surveyor journey: route list, consent, household form, sync queue."
              />
            }
          />
          <FeatureBlock
            title="Sync state you can see"
            lead={[
              "Placed exactly where surveyors already look, with five unambiguous states — so nobody leaves a village unsure whether their day's work exists anywhere but their phone.",
            ]}
            chips={["On device", "Queued", "Syncing", "Synced", "Failed"]}
            visual={<Placeholder ratio="phone" label="Sync states" hint="Pending — the sync queue showing all five states." />}
          />
          <FeatureBlock
            flip
            title="Forms that survive interruption"
            lead={[
              "Every household form is broken into short sections that save as they go. A dropped call, a dead battery, or a household that asks you to come back later never costs a partial record.",
              "Location is captured once, at the door, and locked — **GPS coordinates can't be edited later**, which is what makes the record tamper-evident.",
            ]}
            visual={<PhoneShot {...SHOTS.geoTagging} />}
          />
          <FeatureBlock
            title="Consent read aloud, not ticked"
            lead={[
              "DPDP Act consent is a scripted, readable moment the surveyor reads to the household — the purpose of every data point in plain words — not a checkbox buried in a flow.",
            ]}
            visual={<Placeholder ratio="phone" label="Doorstep consent" hint="Pending — the scripted consent screen." />}
          />
          <FeatureBlock
            flip
            title="Rejections that close the loop"
            lead={[
              "When a State Officer rejects an entry, the surveyor sees **what** is wrong and **where** — the exact field and reason — and fixes it in place, without a second 40-km trip.",
            ]}
            visual={<Placeholder ratio="phone" label="Field-level rejection" hint="Pending — a flagged form with the faulty field highlighted." />}
          />
          <FeatureBlock
            title="Usable with zero training"
            lead={[
              "One action per screen, plain language, and no icon that needs explaining. The app assumes the one-day training didn't stick — and starts by asking which language to speak, in each language's own script.",
            ]}
            visual={<PhoneShot {...SHOTS.language} />}
          />
        </Shell>

        {/* ── Part 2 · The portals ────────────────────────────── */}
        <Shell className="flex flex-col gap-section pb-section">
          <PartOpener
            part="Part 2"
            title="The portals"
            lead="Where doorstep data is verified, approved, and turned into something a ministry can act on."
            visual={<Plate {...SHOTS.adminDashboard} />}
          />
          <PortalBlock
            title="State Officer review"
            lead={[
              "Every submitted household for a state, filterable down to district, block, village and tribe — with approve and reject built around the same field-level reasons the surveyor sees.",
            ]}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Plate {...SHOTS.stateForms} caption="Submitted forms, filterable to the village." />
              <Placeholder label="Approve / reject with reason" hint="Pending — the review screen where a rejection is tied to a specific field." />
            </div>
          </PortalBlock>
          <PortalBlock
            title="Ministry Admin control"
            lead={[
              "National oversight across states, districts and surveyors, plus the configuration layer: creating surveys, onboarding officers with pre-mapped LGD codes, and managing role-based access across tenants.",
            ]}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Placeholder label="Survey configuration" hint="Pending — setting up a new survey and its roles." />
              <Placeholder label="Officer onboarding · bulk LGD upload" hint="Pending — the bulk upload flow for state and district officers." />
            </div>
          </PortalBlock>
        </Shell>

        {/* ── Where it stands ─────────────────────────────────── */}
        <Section
          eyebrow="Where it landed"
          title="Scale and"
          accent="real-world impact"
        >
          <BigStats
            stats={[
              { value: "8", label: "days, of a 15-day deadline" },
              { value: "0", label: "rework loops at approval" },
              { value: "3 mo", label: "sign-off to production" },
              { value: "40L+", label: "authenticated records" },
            ]}
          />
          <StatusList
            states={[
              {
                status: "Live",
                tone: "live",
                title: "In production across tribal regions",
                body: "Live three months after sign-off, with **40+ lakh authenticated tribal records** captured so far.",
              },
              {
                status: "Approved",
                tone: "done",
                title: "Cleared by MoTA in one pass",
                body: "Approved by the Ministry of Tribal Affairs with zero rework loops — the single review gate held.",
              },
              {
                status: "Extensible",
                tone: "done",
                title: "Built to outlive one survey",
                body: "Multi-tenant by design — other ministries can run their own surveys on the same roles, sync engine and review loops without a redesign.",
              },
            ]}
          />
        </Section>

        {/* ── Reflections, on the panel band ──────────────────── */}
        <PanelBand>
          <Shell className="flex flex-col gap-block">
            <SectionHeading eyebrow="Looking back" title="What I'd do" accent="differently" />
            <ReflectionCards
              items={[
                {
                  title: "Trade a day of polish for **a day in the field**",
                  body: "I'd give up a day of high-fidelity refinement to watch real enumerators work a village. Everything I knew about them was second-hand.",
                  takeaway: "Field access beats a cleaner handoff file.",
                },
                {
                  title: "Test with **end users** before handoff",
                  body: "Stakeholder review was rigorous, but direct usability testing with surveyors was constrained by the timeline.",
                  takeaway: "It's the gap I'd close first.",
                },
                {
                  title: "Push harder on **the ethics of oversight**",
                  body: "Tracking surveyor activity makes data trustworthy — it also edges toward surveillance.",
                  takeaway: "Where oversight should stop deserved more time than it got.",
                },
              ]}
            />
          </Shell>
        </PanelBand>

        <Shell className="flex flex-col gap-block pb-section pt-section">
          <SectionHeading eyebrow="Want the longer version?" title="Let's" accent="talk it through" />
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

        <ThankYou />
      </main>

      <Footer />
    </div>
  );
}
