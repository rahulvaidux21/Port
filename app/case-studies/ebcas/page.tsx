import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/case-study/MoreCases";
import { socialLinks } from "@/lib/data";
import {
  Shell,
  Hero,
  ChipGroup,
  BigStats,
  Module,
  SectionHeading,
  Prose,
} from "@/components/case-study/ebcas/sections";

export const metadata: Metadata = {
  title: "eBCAS 2.0 — Airport Entry Permit, Manpower & Training — Rahul Vaid",
  description:
    "Designing three of eBCAS 2.0's five modules — Airport Entry Permit, Manpower, and Training — for a national civil aviation security regulator, as part of a four-designer, no-engineer build.",
};

/* eBCAS 2.0 arrived as a written case study, not a Figma frame, and it's
   scoped to Rahul's own three modules within a five-module team effort —
   so it gets its own route rather than being force-fit into the
   UX4G-shaped `CaseStudyDetail` schema (see lib/caseStudies/index.ts).
   It still follows UX4G's layout system exactly — same Shell width,
   same clamp() type scale, same --sp-section/--sp-block spacing rhythm
   (see components/case-study/ebcas/sections.tsx) — just off the site's
   neutral palette instead of UX4G's cs-* brand tokens, since this case
   study isn't part of that brand.

   Every "outcome" here is a design/build-scope fact, not an invented
   usage number — the platform has no backend and no real users yet, and
   the source material was explicit that fabricating a time-saved or
   adoption metric would be dishonest. */
export default function EbcasCaseStudyPage() {
  const linkedin = socialLinks.find((link) => link.icon === "linkedin")?.href ?? "#";

  return (
    <div className="relative overflow-x-clip bg-paper">
      <Navbar />

      <main>
        <Hero
          heading="Three of eBCAS 2.0's five modules, built for a regulator with no room for ambiguity"
          subtitle={
            <>
              eBCAS 2.0 is the compliance platform a national civil aviation security regulator will
              run with every airline, airport operator and ground handler in India — permits, staffing
              and training, replacing processes that were manual, paper-adjacent and impossible to
              audit. I designed three of its five modules:{" "}
              <span className="font-medium text-text-primary">Airport Entry Permit, Manpower, and
              Training</span>
              .
            </>
          }
        />

        <Shell className="flex flex-col gap-block pb-section">
          <ChipGroup title="My Role" chips={["UI/UX Designer"]} />
          <ChipGroup
            title="Team"
            chips={["4 designers, 0 engineers", "Led by Shashank Agarwal", "6 weeks to pitch"]}
          />
          <ChipGroup
            title="Modules I Owned"
            chips={["Airport Entry Permit", "Manpower", "Training"]}
          />
        </Shell>

        <Shell className="pb-section">
          <BigStats
            stats={[
              { value: "3", label: "modules owned" },
              { value: "89", label: "screens across them" },
              { value: "169+", label: "airports, national scope" },
              { value: "5", label: "governance gaps self-caught" },
            ]}
          />
        </Shell>

        <Shell className="pb-section">
          <Prose>
            <>
              eBCAS 2.0 spans five modules, split across a four-designer team in six weeks with no
              engineers, led by <strong className="font-semibold text-text-primary">Shashank
              Agarwal</strong>. I owned three of them end to end — Airport Entry Permit, Manpower, and
              Training — covering permit issuance, workforce deployment, and training accreditation
              under BCAS&apos;s national security mandate.
            </>
          </Prose>
        </Shell>

        <Module
          index="Module 01"
          title="Airport Entry Permit"
          subtitle="The credential that gets a person past a security gate — reissued, revoked, or escalated on a documented, national approval chain."
          stats={[
            { value: "47", label: "screens" },
            { value: "8", label: "role surfaces" },
            { value: "10+", label: "permit wizards" },
            { value: "169+", label: "airports" },
          ]}
          image={{
            label: "AEP application & approval chain",
            hint: "Pending — the RD validation / AEP Committee review screen, or the category application wizard.",
          }}
          problem={{
            title: "The problem",
            lead: [
              "AEP replaces a fragmented, hardware-driven, paper-adjacent permit process running across 169+ airports — fingerprint biometrics with no software-driven policy behind them, no centralized stop-list enforcement, and no reason-coded trail for exceptions.",
              "The ambiguity wasn't only historical. Mid-build, a decision record had to resolve who the terminal approver actually is — the screens already built still encoded a stale multi-tier DG/RD flow against the real authority model, where the Regional Director is terminal for every category, including exceptions and the stop list.",
            ],
          }}
          solution={{
            title: "The solution",
            lead: [
              "A full approval chain: applicant submits → entity signatory attests with a digital signature → RD validates duplicates, SP-validity and zone → RD initiates a background check → the check routes to an AEP Committee (RD + Airport Operator CSO + CASO) for recommendation → RD records final approval → card print and issue with OTP and live-face handover.",
              "Built as 47 screens across 8 role surfaces — individual, regulated entity, RD, DG, HQ, airport operator, government department, AEP committee — with 10+ category-specific application wizards, a two-tier exception workflow (regional at RD, escalated at DG), a national multi-tier stop list with DG override and e-signature, and a full card lifecycle state machine (Active → Parked → Deactivated → Withdrawn → Surrendered → Lost/Stolen → Expired → Blacklisted) with non-deletable audit history. CISF gate verification carries a reason-coded manual override.",
            ],
          }}
          outcome={{
            title: "Outcome",
            lead: [
              "There's no backend and no real users yet, so there's no adoption or time-saved number to cite honestly. What there is: 47 screens, 8 personas, national scope — and a self-audit on 24 July 2026 that surfaced 5 governance gaps, including orphaned screens, a stale authority document, an RD/Committee inconsistency, and an unenforced training-transfer gate.",
            ],
          }}
          outcomeNote="One number deliberately left out of this case study: the DG cockpit's “AEP Processing SLA Compliance” KPI. The project's own audit log flags it as a hardcoded, unsourced literal — real enough to look like data, not real enough to cite as one."
        />

        <Module
          index="Module 02"
          title="Manpower"
          subtitle="Turning a deployment count nobody could evidence into a signed, three-tier approval with a canonical dashboard."
          stats={[
            { value: "12", label: "screens built" },
            { value: "11", label: "wired into routing" },
            { value: "3", label: "approval tiers" },
            { value: "1", label: "role bug fixed" },
          ]}
          image={{
            label: "Manpower approval chain & HQ dashboard",
            hint: "Pending — the canonical HQ manpower dashboard, or the DG's Approved Strength Return screen.",
          }}
          problem={{
            title: "The problem",
            lead: [
              "There was no single case record per airport for tracking a strength request end to end. Deployment versus sanctioned strength had no evidentiary record — attendance capture didn't exist in the prototype at all until late July. A role-conflation bug let one HQ screen let the HQ Director sign off as DG. And several orphaned screens modeled competing versions of the same approval gate.",
            ],
          }}
          solution={{
            title: "The solution",
            lead: [
              "A three-iteration approval chain: Airport Operator survey/resurvey → Regional Director and Local Security Committee review with a digitally-signed Minutes of Meeting → BCAS HQ's 6-step meeting workspace → DG signs the immutable Approved Strength Return — landing on one canonical HQ dashboard. Draft (HQ) and approve (DG) screens for deployment norms and attendance thresholds are now split, which is the direct fix for the role-conflation bug.",
              "New geotagged, geofenced, camera-forced attendance check-in covers CISF gate staff, feeding an operator-side workbench with compliance banding (green ≥90%, amber ≥80%, red below). A separate offline-sanction-entry step reconciles the DG-signed figure against the real MHA/State Chief Secretary sanction.",
            ],
          }}
          outcome={{
            title: "Outcome",
            lead: [
              "Same caveat as AEP — no usage metrics, no backend. The honest number: 11 of the 12 built screens are actually wired into routing (one discarded, one superseded by a later screen) — a real scope-cleanup figure, not an invented one.",
            ],
          }}
        />

        <Module
          index="Module 03"
          title="Training"
          subtitle="An accreditation-to-certification pipeline where a lapsed cert can't silently block someone's permit."
          stats={[
            { value: "~30", label: "screens" },
            { value: "4", label: "role surfaces" },
            { value: "3-tier", label: "appeal path" },
            { value: "6", label: "eLMS modules" },
          ]}
          image={{
            label: "Training accreditation & certificate flow",
            hint: "Pending — the ASTI accreditation workspace, or the entity's training compliance rollup dashboard.",
          }}
          problem={{
            title: "The problem",
            lead: [
              "There was no accreditation workflow for training institutes with tracked timers and KPIs. Regulated entities had no single view of workforce training compliance — they had to check each sub-screen by hand, risking a missed auto-show-cause notice or a lapsed certification silently blocking someone's AEP. Certification revocation was otherwise irreversible, with no appeal path, and certificates weren't portable or verifiable across employer transfers.",
            ],
          }}
          solution={{
            title: "The solution",
            lead: [
              "Around 30 screens across four surfaces. ASTI Lead: accreditation apply/observations/periodic verification, instructor/batch/exam management, and the show-cause/appeal flow. Regulated Entity: a training rollup dashboard, nomination with DSC attestation and fee cap, certificate tracking with automatic DigiLocker authenticity checks, and a 3-tier appeal process (DDG → DG → MoCA Secretary) with a 30-day SLA.",
              "DG/Training Division: an SLA dispatch desk, question bank, exam calendar, and revocation management. Plus a 6-module eLMS course gated at ≥70% before the practical exam. Certificate issuance itself enforces hard gates: practical pass plus CBT ≥70%, ASTI countersignature, and a DigiLocker push with retry.",
            ],
          }}
          outcome={{
            title: "Outcome",
            lead: [
              "Worth flagging plainly: the DG Training dashboard's 8 KPI tiles are all hardcoded literals with no real data layer behind them — one tile even renders a ₹4.2L “unreconciled payments” figure in a success/green accent. That's a genuine bug the audit caught, and it belongs here as evidence of the audit's rigor, not as a shipped metric.",
            ],
          }}
        />

        <Shell className="flex flex-col gap-block pb-section">
          <SectionHeading>What this actually is</SectionHeading>
          <Prose>
            Every outcome above is a build or design-scope metric — screens, personas, roles, gaps
            caught before they shipped — not a usage, adoption or time-saved number. eBCAS 2.0 has no
            backend and no real users yet, so there&apos;s nothing honest to cite there. If this case
            study needs a headline result, it&apos;s this: three real authority ambiguities resolved
            before they reached build, one role-conflation vulnerability eliminated, and one visibility
            gap closed that risked silently blocking someone&apos;s AEP — a more defensible story for a
            compliance platform than an invented &ldquo;X% faster&rdquo; claim would be.
          </Prose>
          <Prose>
            <>
              If you want the parts that don&apos;t fit in a write-up — the constraints, the arguments,
              the things that nearly didn&apos;t work — I&apos;m happy to walk through it.{" "}
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

        <Shell className="pb-section">
          <MoreCases currentSlug="ebcas" />
        </Shell>
      </main>

      <Footer />
    </div>
  );
}
