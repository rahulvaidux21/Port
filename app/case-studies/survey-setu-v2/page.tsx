import type { Metadata } from "next";
import { FileSignature, LayoutList, Save, UsersRound } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MoreCases } from "@/components/case-study/MoreCases";
import { BackToWork } from "@/components/case-study/BackToWork";
import { socialLinks } from "@/lib/data";
import {
  Band,
  Hero,
  ProjectTitle,
  BrandingStyle,
  PaperSection,
  NumberGrid,
  PhoneCard,
  PhotoSlot,
  DesignGoals,
  OverlayPhoto,
  Personas,
  RoleChain,
  ResearchTable,
  Process,
  FlowRows,
  Wireframes,
  BeforeAfter,
  TypeAndColour,
  InkStatement,
  PhoneShowcase,
  RoleDashboards,
  BrowserShowcase,
  Impact,
  NextChapter,
  Thanks,
} from "@/components/case-study/survey-setu/v2/sections";

export const metadata: Metadata = {
  title: "Survey Setu — Field survey app and officer portals for the Ministry of Tribal Affairs — Rahul Vaid",
  description:
    "I designed the Android app field surveyors use to record 4 million tribal households — offline, in 21 languages — and the web portals officers use to onboard and track them. 8 days of design against a 15-day deadline.",
};

/* Survey Setu, v2 — the editorial long-scroll layout, built alongside the
   original page (/case-studies/survey-setu) so the two can be compared.

   Story order: overview → context → the problem (as user problems, with
   How-might-we framing) → who I designed for → desk research → process →
   user flows → wireframes and what changed → design decisions (field app,
   then portals) → accessibility and language → design system → outcome →
   reflection.

   Ownership, as Rahul describes it: the whole surveyor app, the Admin and
   the State Officer portals are his; a second designer, from day 3,
   designed the District Officer flow and the login screens. There is no
   Supervisor role in the final product — the District Officer acts as the
   surveyors' supervisor. "40+ lakh" counts households.

   Screens are 2× exports from the MoTA Survey App Figma file —
   "✒️Hi-Fidelity Design" for finals, "Playground" for wireframes (wf-*).
   All names and numbers in the screens are dummy data. Photography is
   pending — PhotoSlot marks each slot. */

const V2 = "/case-studies/survey-setu/v2";
const APP = {
  splash: { src: `${V2}/app-splash.jpg`, alt: "Survey Setu splash screen — the सर्वे सेतु wordmark on Ministry green" },
  language: { src: `${V2}/app-language.jpg`, alt: "Language picker — 21 Indian languages as large buttons, each written in its own script, English selected" },
  home: { src: `${V2}/app-home.jpg`, alt: "Surveyor home — You're Online badge, the current survey, and counts of completed, reviewed, draft and flagged forms" },
  flagged: { src: `${V2}/app-flagged.jpg`, alt: "Survey forms filtered to Flagged — each household card shows the family head, village and surveyor, with a Flagged label" },
  geo: { src: `${V2}/app-geo.jpg`, alt: "Survey section 1 of 11 — location and geo-tagging with a map pin, a Recapture Location button and an auto-saving indicator" },
  consent: { src: `${V2}/app-consent.jpg`, alt: "Survey section 11 of 11 — the consent declaration in full, with the head of family's name, date and signature" },
};
const WF = {
  role: { src: `${V2}/wf-role.jpg`, alt: "Wireframe — Select your role: Field Surveyor, Supervisor or Auditor" },
  mission: { src: `${V2}/wf-mission.jpg`, alt: "Wireframe — My Mission dashboard in purple, with overall progress and a list of assigned villages" },
  areas: { src: `${V2}/wf-areas.jpg`, alt: "Wireframe — Area assignments: each village with households surveyed and a Start New Survey button" },
  consent: { src: `${V2}/wf-consent.jpg`, alt: "Wireframe — Data consent as step 1 of 5, with audio consent or a digital signature" },
  geo: { src: `${V2}/wf-geo.jpg`, alt: "Wireframe — Location and geo-tagging as step 2 of 5, with captured coordinates and Recapture Location" },
  scheme: { src: `${V2}/wf-scheme.jpg`, alt: "Wireframe — Scheme mapping: welfare schemes the household is enrolled in, with a tip on local terms" },
  review: { src: `${V2}/wf-review.jpg`, alt: "Wireframe — Review survey: every section summarised with edit links before submitting" },
  saved: { src: `${V2}/wf-saved.jpg`, alt: "Wireframe — Survey saved, with an offline-mode note that it will send when back online" },
};

export default function SurveySetuV2Page() {
  const linkedin = socialLinks.find((link) => link.icon === "linkedin")?.href ?? "#";

  return (
    <div className="relative overflow-x-clip bg-sv-band">
      <Navbar />

      <main>
        <Band>
          <BackToWork />
        </Band>

        {/* 1 · Hero */}
        <Hero leftLabel="Field survey app + officer portals" rightLabel="Ministry of Tribal Affairs" back="Survey" front="Setu" phone={APP.home} />

        {/* 2 · Overview — the TL;DR */}
        <ProjectTitle
          quote="I designed the app **field surveyors use to record 4 million tribal households** — offline, in 21 languages — and the portals **officers use to onboard and track them.**"
          about="Survey Setu is the Ministry of Tribal Affairs' survey platform for **Particularly Vulnerable Tribal Groups.** Field surveyors go door to door, often with no network, and fill an **11-section household form** on an Android phone. Officers at district, state and ministry level add those surveyors and **follow progress from a web portal.**"
          meta={[
            { label: "My role", value: "Lead Product Designer" },
            { label: "What I designed", value: "The whole surveyor app, plus the Admin and State Officer portals" },
            { label: "Team", value: "Me, a second designer from day 3, business analysts, engineers, solution architects, and the Ministry" },
            { label: "Timeline", value: "8 days of design, against a 15-day deadline" },
            { label: "Platforms", value: "Android app · Web portal" },
            { label: "Outcome", value: "Signed off with no rework; live 3 months later; 40+ lakh households recorded" },
          ]}
          features={[
            "Works offline",
            "Auto-save",
            "21 languages",
            "Geo-tagging",
            "Consent at the door",
            "Flagged forms",
            "Role-based portals",
            "Bulk onboarding",
          ]}
        />

        {/* 3 · Branding */}
        <BrandingStyle note="I designed the wordmark: सर्वे सेतु (“Survey Bridge”) set in two weights, in the Ministry's green. It appears on the splash screen, in the app and across the portals." />

        {/* 4 · Context & constraints */}
        <PaperSection
          label={["The", "Context"]}
          headline="**One day of training,** no signal, and an 11-section form at every door"
          bubble={{ glyph: "हिं", label: "Hindi script" }}
          caption="Field surveyors work in remote tribal villages, often hours from a network."
        >
          <NumberGrid
            cells={[
              null,
              { body: "**Surveyors get one day of training** — and many aren't used to smartphones." },
              null,
              { body: "**No signal for days** in remote areas, so the app has to work fully offline." },
              { body: "**No brief, no user flows, no portal designs** — only a 40-page technical document." },
              null,
              { body: "**The questions were fixed.** The Ministry had already approved them, including a consent declaration under India's data-protection law." },
              null,
            ]}
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <PhoneCard {...APP.language} className="aspect-[1/1.02]" />
            <PhotoSlot className="aspect-[1/1.02]" label="At the doorstep" hint="Pending — a surveyor and a household head reading the screen together." />
          </div>
        </PaperSection>

        {/* 5 · The problem, as user problems */}
        <DesignGoals
          label={["The", "Problem"]}
          headline="What happens when a doorstep visit **gets lost**"
          caption="If a form is lost, or sent back without a clear reason, the surveyor has to travel back — sometimes 40 km."
          hmw={[
            {
              who: "surveyors",
              text: "How might we help someone with one day of training fill an 11-section household form correctly, at the door, in their language — even with no signal?",
            },
            {
              who: "officers",
              text: "How might officers at three levels add their teams and follow survey progress without learning three different tools?",
            },
          ]}
          goals={[
            { title: "Never lose a form, even with no signal.", icon: <Save className="h-5 w-5" /> },
            { title: "Show at a glance what's done, drafted and flagged.", icon: <LayoutList className="h-5 w-5" /> },
            { title: "Ask for consent in words a household understands.", icon: <FileSignature className="h-5 w-5" /> },
            { title: "Give every officer one place to add and track their team.", icon: <UsersRound className="h-5 w-5" /> },
          ]}
        />
        <OverlayPhoto
          label="Survey in progress"
          hint="Pending — a surveyor recording a household, phone in hand, mid-conversation."
          bubbles={[
            { chip: "Auto-saving", tone: "green", text: "Location and geo-tagging · section 1 of 11" },
            { chip: "Location captured", tone: "saffron", text: "Confirm only when you're at the household." },
          ]}
        />

        {/* 6 · Who I designed for */}
        <PaperSection
          className="pt-section"
          label={["Who I", "Designed for"]}
          headline="Four people use Survey Setu, **each one level above the last**"
          bubble={{ glyph: "ಕ", label: "Kannada script" }}
          caption="The personas came from the 40-page technical document, which defined every role and what it can do."
        >
          <Personas
            people={[
              {
                role: "Field Surveyor",
                platform: "Android app",
                credit: "me",
                goal: "Finish each household form correctly, in one visit.",
                context: "Door to door in remote villages, often offline, after one day of training.",
                pain: "Losing a half-filled form, or having to go back to fix one.",
                does: "Picks a survey, fills 11 short sections, takes consent, submits.",
              },
              {
                role: "District Officer",
                aka: "Also the surveyors' supervisor",
                platform: "Web portal",
                credit: "shared",
                goal: "Keep the district's surveyors working and on target.",
                context: "Manages the surveyors working across the blocks of one district.",
                pain: "Not knowing who is in the field, or how far a survey has got.",
                does: "Adds surveyors one at a time or in bulk, and tracks progress.",
              },
              {
                role: "State Officer",
                platform: "Web portal",
                credit: "me",
                goal: "See how every district in the state is doing.",
                context: "Oversees the district officers of one state.",
                pain: "Spotting a district that's falling behind before it's too late.",
                does: "Adds district officers and checks submitted forms by district, block and village.",
              },
              {
                role: "Ministry Admin",
                platform: "Web portal",
                credit: "me",
                goal: "Run national surveys with the right people in every state.",
                context: "Ministry of Tribal Affairs, across 28 states and 8 union territories.",
                pain: "Setting up officers state by state, by hand.",
                does: "Creates surveys, adds state and district officers (also in bulk), tracks national progress.",
              },
            ]}
            note="The households being surveyed never touch the app — but every screen exists to record them accurately."
          />
          <RoleChain
            nodes={[
              { role: "Ministry Admin", sub: "Creates surveys" },
              { role: "State Officer", sub: "One state" },
              { role: "District Officer", sub: "One district" },
              { role: "Field Surveyor", sub: "Assigned villages" },
              { role: "Household", sub: "Never uses the app" },
            ]}
            down="Each level adds the level below it and assigns them a region, using official location codes."
            up="Completed forms and progress flow back up, so each level sees only its own area."
          />
        </PaperSection>

        {/* 7 · Desk research */}
        <PaperSection
          label={["Desk", "Research"]}
          headline="**What I studied** before drawing a screen"
          bubble={{ glyph: "த", label: "Tamil script" }}
          caption="Research was desk-based and took half a day — four sources, each tied to a decision."
          side="right"
        >
          <ResearchTable
            rows={[
              {
                source: "The 40-page technical document",
                looked: "Who the users are, what each role can do, and the rules the system must follow: offline use, consent, location.",
                led: "**The four personas** and the role chain above.",
              },
              {
                source: "Videos of field survey apps in use",
                looked: "How surveyors move through long forms while talking to a household.",
                led: "**Short sections that save as you go,** with progress always visible.",
              },
              {
                source: "Workflows of similar platforms",
                looked: "How dashboards for different officer levels are organised.",
                led: "**One portal layout for every officer,** scoped to their region.",
              },
              {
                source: "Web search",
                looked: "Patterns for consent and for apps used in many languages.",
                led: "**Language chosen on the first screen,** and consent written in plain words.",
              },
            ]}
          />
        </PaperSection>

        {/* 8 · Process */}
        <PaperSection
          label={["The", "Process"]}
          headline="15 days given, **8 days used**"
          bubble={{ glyph: "ଓ", label: "Odia script" }}
          caption="Every step that didn't move the work toward build-ready screens was cut."
        >
          <Process
            given={15}
            used={8}
            steps={[
              { title: "Decode the document", time: "½ day", body: "Turned the 40-page technical document into a list of what each rule means for the person using the screen." },
              { title: "Desk research", time: "½ day", body: "The four sources above — videos, similar platforms, search." },
              { title: "Wireframes", body: "Low-fidelity drafts of the whole surveyor flow and the first officer dashboards, with an AI-assisted first pass." },
              { title: "Peer review", body: "Walked the internal design team through the flows and folded in their feedback." },
              { title: "Stakeholder review", body: "Stakeholders were aligned with the direction; they asked for branding and minor UI changes." },
              { title: "High fidelity", body: "Build-ready screens for the app and the portals. A second designer joined on day 3 to take the District Officer flow and the login screens." },
            ]}
          />
        </PaperSection>

        {/* 9 · User flows */}
        <PaperSection
          label={["User", "Flows"]}
          headline="Two flows: **one for the field,** one for the office"
          bubble={{ glyph: "म", label: "Marathi script" }}
          caption="The surveyor's path is linear and short. The officer's portal is the same five sections for every role."
          side="right"
        >
          <FlowRows
            rows={[
              {
                title: "Field Surveyor · Android app",
                sub: "From opening the app to a submitted household form.",
                steps: [
                  { label: "Choose language", note: "21 options" },
                  { label: "Log in", note: "Mobile number + OTP" },
                  { label: "Home", note: "Form counts" },
                  { label: "Pick a survey" },
                  { label: "Sections 1–10", note: "Household questions, auto-saved", key: true },
                  { label: "Section 11", note: "Consent", key: true },
                  { label: "Submit", note: "Or keep as draft" },
                ],
              },
              {
                title: "Officers · Web portal",
                sub: "Admin, State Officer and District Officer share one navigation; what's inside is scoped to their region.",
                steps: [
                  { label: "Log in" },
                  { label: "Dashboard", note: "Summary + quick actions", key: true },
                  { label: "Surveys", note: "Overview, submitted forms" },
                  { label: "Users", note: "Add one, or bulk upload", key: true },
                  { label: "Analytics" },
                  { label: "Settings" },
                ],
              },
            ]}
          />
        </PaperSection>

        {/* 10 · Wireframes → feedback → final */}
        <Wireframes
          headline="**Low-fidelity first,** reviewed twice before any polish"
          caption="Peer review with the internal team, then the stakeholders. Both were happy with the direction."
          frames={[
            { ...WF.role, label: "Select role" },
            { ...WF.mission, label: "My mission" },
            { ...WF.areas, label: "Area assignments" },
            { ...WF.consent, label: "Data consent" },
            { ...WF.geo, label: "Location" },
            { ...WF.scheme, label: "Scheme mapping" },
            { ...WF.review, label: "Review" },
            { ...WF.saved, label: "Saved offline" },
          ]}
          footnote="Drafts from the Playground page of the Figma file. The purple is a placeholder theme, not a brand colour — the feedback was about branding and small UI details, not the flow."
        />
        <PaperSection
          className="pt-section"
          label={["Wireframe to", "Final"]}
          headline="What changed **after feedback**"
          bubble={{ glyph: "తె", label: "Telugu script" }}
          caption="Few changes — but each one is visible in the final screens."
        >
          <BeforeAfter
            pairs={[
              {
                title: "Consent moved from the first step to the last",
                before: WF.consent,
                after: APP.consent,
                body: "The draft asked for consent before any question (step 1 of 5). In the final form it's section 11 of 11, followed only by submit.",
                why: "It's the common pattern for long forms, and the client asked for consent at the end.",
              },
              {
                title: "A purple draft became the Ministry's green",
                before: WF.mission,
                after: APP.home,
                body: "The stakeholders' main feedback was branding. The final screens use the Ministry's green, the सर्वे सेतु wordmark, and form counts in place of the village list.",
                why: "Branding was the main thing stakeholders asked for: the app had to carry the Ministry's own identity.",
              },
              {
                title: "Five draft steps became eleven short sections",
                before: WF.geo,
                after: APP.geo,
                body: "Location was step 2 of 5 in the draft. Once the Ministry's full question set went in, it became section 1 of 11 — each section short, with auto-save shown on screen.",
                why: "Short sections are easier to pick up again after an interruption at the door.",
              },
              {
                title: "The role picker was dropped",
                before: WF.role,
                after: APP.language,
                body: "The draft opened by asking whether you're a surveyor, supervisor or auditor. The final app opens by asking which language to use.",
                why: "Roles are assigned by the officer who adds you, so the app never needs to ask. Supervising moved to the District Officer.",
              },
            ]}
          />
        </PaperSection>

        {/* 11 · Design decisions — field app */}
        <InkStatement
          label={["Design decisions ·", "Field app"]}
          headline="Every screen answers **one question for the surveyor**"
          caption="What am I doing, is it saved, and what's next?"
          bubble={{ glyph: "বা", label: "Bengali script" }}
        />
        <PhoneShowcase
          word="Home"
          phone={APP.home}
          left={[
            { title: "Online status", body: "“You're Online” at the top, so surveyors know when their forms can be sent." },
            { title: "Current survey", body: "Shown first, with a switch — most surveyors work on one survey at a time." },
          ]}
          right={[
            { title: "Form counts", body: "Completed, reviewed, draft and flagged: the four things a surveyor acts on." },
            { title: "One main button", body: "Start a new form. Nothing else competes for attention." },
          ]}
        />
        <PhoneShowcase
          word="Location"
          wordAt="bottom"
          phone={APP.geo}
          left={[
            { title: "Place first", body: "The household is pinned before any question, so every form is tied to a place." },
            { title: "Auto-saving", body: "Shown on every section, so closing the app never feels risky." },
          ]}
          right={[
            { title: "Recapture", body: "One tap to try again when the GPS signal is weak." },
            { title: "Clear instruction", body: "A note reminds the surveyor to be at the household before confirming." },
          ]}
        />
        <PhoneShowcase
          word="Consent"
          phone={APP.consent}
          left={[
            { title: "Plain declaration", body: "What's collected and why, in full, before anyone signs." },
            { title: "The law, in words", body: "India's data-protection law, explained without legal language." },
          ]}
          right={[
            { title: "Signed at the door", body: "The head of family's name, date and signature, captured in place." },
            { title: "Last section", body: "Nothing submits without it." },
          ]}
        />

        {/* 12 · Design decisions — portals */}
        <PaperSection
          className="pt-section"
          label={["Design decisions ·", "Portals"]}
          headline="One portal, **three levels of scope**"
          bubble={{ glyph: "ગુ", label: "Gujarati script" }}
          caption="Admin, State Officer and District Officer share the same layout. Each sees only their own region and the people below them."
        >
          <RoleDashboards
            items={[
              {
                role: "Ministry Admin",
                scope: "All of India: surveys, state officers, district officers and surveyors across 28 states and 8 UTs.",
                credit: "me",
                screen: { src: `${V2}/portal-admin-dash.jpg`, alt: "Ministry Admin dashboard — summary cards for surveys, state officers, district officers and surveyors, quick actions, and survey-wise progress", height: 1686 },
              },
              {
                role: "State Officer",
                scope: "One state: its district officers and surveyors, with the same progress table.",
                credit: "me",
                screen: { src: `${V2}/portal-so-dash.jpg`, alt: "State Officer dashboard for Rajasthan — district officer and surveyor counts, quick actions, and survey-wise progress", height: 1685 },
              },
              {
                role: "District Officer",
                scope: "One district: its surveyors, and how many are in the field right now.",
                credit: "shared",
                screen: { src: `${V2}/portal-do-dash.jpg`, alt: "District Officer dashboard — active surveys, surveyors with 85% currently in the field, quick actions to add surveyors, and survey-wise progress", height: 1685 },
              },
            ]}
            shared={[
              { title: "Summary first", body: "Counts at the top answer “how are we doing?” before anything else." },
              { title: "Quick actions", body: "Each role's most common job — adding the level below — is one click from the dashboard." },
              { title: "Same progress table", body: "Total, submitted and pending forms per survey, so every level reads progress the same way." },
            ]}
          />
        </PaperSection>
        <BrowserShowcase
          word="Onboard"
          screen={{
            src: `${V2}/portal-so-create-do.jpg`,
            alt: "State Officer portal — Create New District Officer: personal details, then Assign Region with state and district",
            height: 1685,
            label: "Survey Setu · State Officer",
          }}
          inset={{
            src: `${V2}/portal-bulk-upload.jpg`,
            alt: "Bulk upload dialog — a CSV template, a drop zone, and how-to steps for adding many officers at once",
            width: 1740,
            height: 1030,
          }}
          notes={[
            { title: "Assign a region", body: "Every new officer is given their area at creation, using the government's official location codes." },
            { title: "One or many", body: "Add a single officer with a short form, or upload a CSV for hundreds." },
            { title: "Same pattern at every level", body: "Admin adds state officers, states add district officers, districts add surveyors." },
          ]}
        />

        {/* 13 · Accessibility & language */}
        <PaperSection
          className="pt-section"
          label={["Accessibility", "& Language"]}
          headline="Built for **21 languages** and first-time smartphone users"
          bubble={{ glyph: "हिं", label: "Hindi script" }}
          caption="The round glyph beside each headline on this page is one of the scripts the app speaks."
        >
          <NumberGrid
            cells={[
              { title: "21 languages", body: "Chosen on the very first screen, **each written in its own script.**" },
              { title: "Plain words", body: "No technical terms in the app; **consent written for a household,** not a lawyer." },
              { title: "Large targets", body: "**Big buttons and one main action** per screen." },
              { title: "Status in words", body: "Every status has a label, **not just a colour:** Completed, Draft, Flagged." },
            ]}
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <PhoneCard {...APP.language} className="aspect-[1/1.02]" />
            <PhoneCard {...APP.flagged} className="aspect-[1/1.02]" />
          </div>
        </PaperSection>

        {/* 14 · Design system */}
        <TypeAndColour
          note="From the MoTA design system: Noto Sans, from a type family with versions for Indian scripts, and the Ministry's green as the primary colour, with separate colours for success, warning and danger."
          swatches={[
            [
              { hex: "#222223", name: "Secondary", ring: true },
              { hex: "#FFFFFF", name: "Neutral 0", dark: true },
              { hex: "#727272", name: "Text hint" },
            ],
            [
              { hex: "#057724", name: "Primary" },
              { hex: "#3C9718", name: "Success" },
              { hex: "#B77224", name: "Warning" },
              { hex: "#B7131A", name: "Danger" },
            ],
          ]}
        />

        {/* 15 · Outcome */}
        <Impact
          title="Signed off first time, live three months later"
          body="Stakeholders signed off without a rework round. Engineering built from the high-fidelity screens, and the app went live three months after sign-off."
          metrics={[
            { value: "8 days", label: "Of design, against a 15-day deadline" },
            { value: "0 rework rounds", label: "At Ministry sign-off" },
            { value: "3 months", label: "From sign-off to live" },
            { value: "40+ lakh", label: "Households recorded (4 million+)" },
            { value: "21 languages", label: "Available in the app" },
          ]}
        />

        {/* 16 · Reflection */}
        <NextChapter
          headline="What I'd **do differently** next time"
          bubble={{ glyph: "ಕ", label: "Kannada script" }}
          items={[
            {
              title: "Spend a day in the field",
              body: "Everything I knew about surveyors came from documents and videos. I'd trade a day of polish to watch them work a village.",
            },
            {
              title: "Test with surveyors",
              body: "Peer and stakeholder reviews were thorough, but the timeline left no room to test with real surveyors. It's the gap I'd close first.",
            },
            {
              title: "Oversight vs. surveillance",
              body: "Showing who is in the field makes the data reliable — it can also feel like surveillance. Where that line sits deserved more time.",
            },
          ]}
        />

        <Band className="pt-section">
          <MoreCases />
        </Band>

        {/* 17 · Thanks */}
        <Thanks
          linkedin={linkedin}
          phone={APP.splash}
          body="The full document breakdown, the review sessions, and the trade-offs we argued about — happy to walk through them."
        />
      </main>

      <Footer />
    </div>
  );
}
