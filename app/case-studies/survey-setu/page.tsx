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
  Inputs,
  PaperSection,
  NumberGrid,
  PhoneCard,
  ContextScene,
  Plate,
  DesignGoals,
  OverlayPhoto,
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
} from "@/components/case-study/survey-setu/sections";
import { PersonaStory } from "@/components/case-study/survey-setu/PersonaStory";
import { Cine } from "@/components/case-study/survey-setu/cinematic";
import { OfflineStory } from "@/components/case-study/survey-setu/interactive";
import {
  ChapterRail,
  ReadingProgress,
  ScriptCycle,
  SignalBars,
} from "@/components/case-study/survey-setu/motion";

export const metadata: Metadata = {
  title:
    "Survey Setu — Field survey app and officer portals for the Ministry of Tribal Affairs — Rahul Vaid",
  description:
    "I designed the Android app field surveyors use to record 4 million tribal households — offline, in 21 languages — and the web portals officers use to onboard and track them. 8 days of design against a 15-day deadline.",
};

/* Survey Setu — an editorial long-scroll case study.

   Story order, in six acts: Setup (overview, context, what I was handed)
   → Problem (how-might-we, offline story, goals) → Process (timeline,
   desk research, the personas it produced) → Design (user flows,
   wireframes, what changed after feedback, the brand that feedback asked
   for) → Solution (field app, portals, accessibility and language) →
   Outcome (results, reflection).

   Ownership, as Rahul describes it: the whole surveyor app, the Admin and
   the State Officer portals are his; a second designer, from day 3,
   designed the District Officer flow and the login screens. There is no
   Supervisor role in the final product — the District Officer acts as the
   surveyors' supervisor. "40+ lakh" counts households.

   Screens are 2× exports from the MoTA Survey App Figma file —
   "✒️Hi-Fidelity Design" for finals, "Playground" for wireframes (wf-*).
   All names and numbers in the screens are dummy data. Device mockups
   and scenes come from the file's "Real Mockups" section (mock-*.webp,
   scene-*.jpg). Every section is wrapped in <Cine>, which scrubs its own
   entrance and exit (components/case-study/survey-setu/cinematic.tsx). */

const ASSETS = "/case-studies/survey-setu";
const APP = {
  splash: {
    src: `${ASSETS}/app-splash.jpg`,
    alt: "Survey Setu splash screen — the सर्वे सेतु wordmark on Ministry green",
  },
  language: {
    src: `${ASSETS}/app-language.jpg`,
    alt: "Language picker — 21 Indian languages as large buttons, each written in its own script, English selected",
  },
  home: {
    src: `${ASSETS}/app-home.jpg`,
    alt: "Surveyor home — You're Online badge, the current survey, and counts of completed, reviewed, draft and flagged forms",
  },
  flagged: {
    src: `${ASSETS}/app-flagged.jpg`,
    alt: "Survey forms filtered to Flagged — each household card shows the family head, village and surveyor, with a Flagged label",
  },
  geo: {
    src: `${ASSETS}/app-geo.jpg`,
    alt: "Survey section 1 of 11 — location and geo-tagging with a map pin, a Recapture Location button and an auto-saving indicator",
  },
  consent: {
    src: `${ASSETS}/app-consent.jpg`,
    alt: "Survey section 11 of 11 — the consent declaration in full, with the head of family's name, date and signature",
  },
};
const WF = {
  role: {
    src: `${ASSETS}/wf-role.jpg`,
    alt: "Wireframe — Select your role: Field Surveyor, Supervisor or Auditor",
  },
  mission: {
    src: `${ASSETS}/wf-mission.jpg`,
    alt: "Wireframe — My Mission dashboard in purple, with overall progress and a list of assigned villages",
  },
  areas: {
    src: `${ASSETS}/wf-areas.jpg`,
    alt: "Wireframe — Area assignments: each village with households surveyed and a Start New Survey button",
  },
  consent: {
    src: `${ASSETS}/wf-consent.jpg`,
    alt: "Wireframe — Data consent as step 1 of 5, with audio consent or a digital signature",
  },
  geo: {
    src: `${ASSETS}/wf-geo.jpg`,
    alt: "Wireframe — Location and geo-tagging as step 2 of 5, with captured coordinates and Recapture Location",
  },
  scheme: {
    src: `${ASSETS}/wf-scheme.jpg`,
    alt: "Wireframe — Scheme mapping: welfare schemes the household is enrolled in, with a tip on local terms",
  },
  review: {
    src: `${ASSETS}/wf-review.jpg`,
    alt: "Wireframe — Review survey: every section summarised with edit links before submitting",
  },
  saved: {
    src: `${ASSETS}/wf-saved.jpg`,
    alt: "Wireframe — Survey saved, with an offline-mode note that it will send when back online",
  },
};

const PORTAL = {
  admin: {
    src: `${ASSETS}/portal-admin-dash.jpg`,
    alt: "Ministry Admin dashboard — summary cards for surveys, state officers, district officers and surveyors, quick actions, and survey-wise progress",
    height: 1686,
  },
  state: {
    src: `${ASSETS}/portal-so-dash.jpg`,
    alt: "State Officer dashboard for Rajasthan — district officer and surveyor counts, quick actions, and survey-wise progress",
    height: 1685,
  },
  district: {
    src: `${ASSETS}/portal-do-dash.jpg`,
    alt: "District Officer dashboard — active surveys, surveyors with 85% currently in the field, quick actions to add surveyors, and survey-wise progress",
    height: 1685,
  },
};

/* Straight phone mockups from Figma's "Real Mockups" section. */
const MOCK = {
  language: { src: `${ASSETS}/mock-language.webp`, alt: APP.language.alt },
  home: { src: `${ASSETS}/mock-home.webp`, alt: APP.home.alt },
  select: {
    src: `${ASSETS}/mock-select.webp`,
    alt: "Select survey — a searchable list of surveys",
  },
  family: { src: `${ASSETS}/mock-family.webp`, alt: "Head of family details, section 2 of 11" },
  geo: { src: `${ASSETS}/mock-geo.webp`, alt: APP.geo.alt },
  consent: {
    src: `${ASSETS}/mock-consent.webp`,
    alt: "Survey section 11 of 11 — the consent declaration in full, with an “I have read and understood” checkbox",
  },
  submitted: {
    src: `${ASSETS}/mock-submitted.webp`,
    alt: "Form submitted successfully, with a summary",
  },
  forms: {
    src: `${ASSETS}/mock-forms.webp`,
    alt: "Survey forms list — each household card labelled Completed, Reviewed, Draft or Flagged in words, not just colour",
  },
};

/* Photographed device scenes from the same section. */
const SCENE = {
  village: {
    src: `${ASSETS}/scene-village.jpg`,
    alt: "A hand holding a phone with the Survey Setu home screen, in a tribal village street at dusk",
    width: 1600,
    height: 1067,
  },
  hand: {
    src: `${ASSETS}/scene-hand.jpg`,
    alt: "A hand holding a phone open at the household survey — head of family details, section 2 of 11",
    width: 1194,
    height: 1696,
  },
  realme: {
    src: `${ASSETS}/scene-realme.jpg`,
    alt: "A phone showing the language picker with 21 Indian languages, each in its own script",
    width: 1452,
    height: 1414,
  },
  nokia: {
    src: `${ASSETS}/scene-nokia.jpg`,
    alt: "Two phones side by side — the सर्वे सेतु splash screen and the surveyor home screen",
    width: 1126,
    height: 1226,
  },
  wooden: {
    src: `${ASSETS}/scene-wooden.jpg`,
    alt: "Wooden mannequin hands holding a phone at the location and geo-tagging section",
    width: 1514,
    height: 1491,
  },
  macbook: {
    src: `${ASSETS}/scene-macbook.jpg`,
    alt: "Two laptops — the front one open at the Ministry Admin dashboard",
    width: 1600,
    height: 1200,
  },
  ipad: {
    src: `${ASSETS}/scene-ipad.jpg`,
    alt: "A hand holding a tablet showing an officer dashboard with quick actions and survey-wise progress",
    width: 1361,
    height: 1443,
  },
  dell: {
    src: `${ASSETS}/scene-dell.jpg`,
    alt: "A laptop showing the submitted-forms table, filterable by district, block, village and tribe",
    width: 1600,
    height: 749,
  },
  zenbook: {
    src: `${ASSETS}/scene-zenbook.jpg`,
    alt: "A laptop showing the State Officer dashboard",
    width: 1600,
    height: 916,
  },
};

/* The story in six acts — each a wrapper around a run of sections, so the
   chapter rail can tell which act is on screen and jump between them. */
const CHAPTERS = [
  { id: "setup", label: "Setup" },
  { id: "problem", label: "Problem" },
  { id: "process", label: "Process" },
  { id: "design", label: "Design" },
  { id: "solution", label: "Solution" },
  { id: "outcome", label: "Outcome" },
];

export default function SurveySetuPage() {
  const linkedin = socialLinks.find((link) => link.icon === "linkedin")?.href ?? "#";

  return (
    <div className="relative overflow-x-clip bg-sv-band">
      <ReadingProgress />
      <Navbar />
      <ChapterRail chapters={CHAPTERS} />

      <main>
        <Band>
          <BackToWork />
        </Band>

        {/* 1 · Hero */}
        <Cine preset="hero">
          <Hero
            leftLabel="Field survey app + officer portals"
            rightLabel="Ministry of Tribal Affairs"
            back="Survey"
            front="Setu"
            device={{
              src: `${ASSETS}/hero-splash.webp`,
              alt: "Survey Setu splash screen on a phone — the सर्वे सेतु wordmark and “Survey Setu” on Ministry green, with the Ministry of Tribal Affairs emblem",
              width: 975,
              height: 2000,
            }}
          />
        </Cine>

        {/* Act · Setup */}
        <div id="setup">
          {/* 2 · Overview — the TL;DR */}
          <Cine preset="rise">
            <ProjectTitle
              quote="I designed the **offline, 21-language field app** that recorded **4 million tribal households** — and the **officer portals** that run it."
              about="The Ministry of Tribal Affairs' survey platform for **Particularly Vulnerable Tribal Groups.** Surveyors go door to door, often offline, filling an **11-section household form** on Android. District, state and ministry officers **onboard them and track progress** on the web."
              meta={[
                { label: "My role", value: "Lead Product Designer" },
                {
                  label: "What I designed",
                  value: "Surveyor app; Admin and State Officer portals",
                },
                {
                  label: "Team",
                  value:
                    "Me + a second designer (from day 3), analysts, engineers, architects, the Ministry",
                },
                { label: "Timeline", value: "8 days, against a 15-day deadline" },
                { label: "Platforms", value: "Android · Web" },
                {
                  label: "Outcome",
                  value: "No rework · live in 3 months · 40+ lakh households",
                },
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
          </Cine>

          {/* 3 · Context & constraints */}
          <Cine preset="iris">
            <PaperSection
              label={["The", "Context"]}
              headline="**One day of training,** no signal, and an 11-section form at every door"
              bubble={{ glyph: "हिं", label: "Hindi script" }}
              caption="Field surveyors work in remote tribal villages, often hours from a network."
            >
              <ContextScene
                image={SCENE.village}
                caption="The app's real workplace: a household doorway in a tribal village, often hours from the nearest network."
                stats={[
                  {
                    value: "1 day",
                    label: "of training",
                    body: "Many surveyors are new to smartphones, let alone a survey app.",
                  },
                  {
                    value: "0 bars",
                    label: "of signal, for days",
                    body: "The app has to work fully offline, door after door.",
                    art: <SignalBars />,
                  },
                  {
                    value: "40 km",
                    label: "to go back",
                    body: "A lost or rejected form means another trip to the same door.",
                  },
                  {
                    value: "11 sections",
                    label: "at every door",
                    body: "Every question already approved by the Ministry, consent included.",
                  },
                ]}
              />
            </PaperSection>
          </Cine>

          {/* 4 · What I was handed — the inputs, before any design */}
          <Cine preset="tilt">
            <PaperSection
              label={["What I was", "Handed"]}
              headline="Two inputs, **and no brief**"
              bubble={{ glyph: "ਪੰ", label: "Punjabi script" }}
              caption="Everything the design had to start from."
              side="right"
            >
              <Inputs
                form={{
                  src: `${ASSETS}/client-html-form.jpg`,
                  alt: "The client's approved HTML survey form, PVTG Government Scheme Verification, with all 8 sections open: demographic and family details, health and nutrition, employment and social security, agriculture, energy, food security, disability, then the declaration and consent",
                  width: 2000,
                  height: 9397,
                  url: "https://gov-scheme-scout.lovable.app/",
                  label: "gov-scheme-scout.lovable.app",
                }}
                items={[
                  {
                    kind: "From the client",
                    title: "The approved survey form",
                    body: "An HTML link with 8 sections and a declaration. The Ministry had already signed off every question, so the questions couldn't change.",
                  },
                  {
                    kind: "From the technical team",
                    title: "A 40-page technical document",
                    body: "Roles, offline rules, consent and location requirements — and the source of the four personas.",
                  },
                  {
                    kind: "Not provided",
                    title: "No brief, no flows, no portal designs",
                    body: "No PRD, no user flows and no admin screens. All of it was designed from the two inputs above.",
                    missing: true,
                  },
                ]}
              />
            </PaperSection>
          </Cine>
        </div>

        {/* Act · Problem */}
        <div id="problem">
          {/* 5 · The problem, as user problems */}
          <Cine preset="curtain">
            <DesignGoals
              label={["The", "Problem"]}
              headline="What happens when a doorstep visit **gets lost**"
              caption="If a form is lost, or sent back without a clear reason, the surveyor has to travel back — sometimes 40 km."
              chain={{
                title: "The cost of one lost visit",
                steps: [
                  {
                    title: "A form is lost",
                    body: "The app closes or the battery dies, and half a household's answers are gone.",
                  },
                  {
                    title: "Or it comes back",
                    body: "Rejected, with no word on which answer was wrong.",
                  },
                  {
                    title: "40 km back",
                    body: "The surveyor returns to the same door to fix it.",
                  },
                  {
                    title: "The household waits",
                    body: "Asked the same questions again, and its record arrives late.",
                  },
                ],
              }}
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
              story={
                <OfflineStory
                  title="The signal comes and goes. The form doesn't."
                  body="One household visit, as the app is designed to handle it. Every section saves on the phone, so losing the network never costs the surveyor their work."
                  steps={[
                    {
                      chip: "You're Online",
                      tone: "green",
                      section: 1,
                      status: "New household form",
                      note: "The surveyor starts at the door",
                    },
                    {
                      chip: "No signal",
                      tone: "red",
                      section: 3,
                      status: "Still working offline",
                      note: "Each section saves on the phone",
                    },
                    {
                      chip: "Draft saved",
                      tone: "amber",
                      section: 5,
                      status: "Interrupted at the door",
                      note: "The draft waits on the home screen",
                    },
                    {
                      chip: "Back online",
                      tone: "green",
                      section: 11,
                      status: "Finished, then sent",
                      note: "The saved form goes when the network returns",
                    },
                    {
                      chip: "Submitted",
                      tone: "green",
                      section: 11,
                      status: "Counted as completed",
                      note: "It moves from Drafts to Completed",
                    },
                  ]}
                />
              }
              goals={[
                {
                  title: "Never lose a form, even with no signal.",
                  icon: <Save className="h-5 w-5" />,
                },
                {
                  title: "Show at a glance what's done, drafted and flagged.",
                  icon: <LayoutList className="h-5 w-5" />,
                },
                {
                  title: "Ask for consent in words a household understands.",
                  icon: <FileSignature className="h-5 w-5" />,
                },
                {
                  title: "Give every officer one place to add and track their team.",
                  icon: <UsersRound className="h-5 w-5" />,
                },
              ]}
            />
          </Cine>
          <Cine preset="expand">
            <OverlayPhoto
              image={SCENE.hand}
              bubbles={[
                {
                  chip: "Auto-saving",
                  tone: "green",
                  text: "Location and geo-tagging · section 1 of 11",
                },
                {
                  chip: "Location captured",
                  tone: "saffron",
                  text: "Confirm only when you're at the household.",
                },
              ]}
            />
          </Cine>
        </div>

        {/* Act · Process */}
        <div id="process">
          {/* 6 · Process */}
          <Cine preset="slide">
            <PaperSection
              className="pt-section"
              label={["The", "Process"]}
              headline="15 days given, **8 days used**"
              bubble={{ glyph: "ଓ", label: "Odia script" }}
              caption="Every step that didn't move the work toward build-ready screens was cut."
            >
              <Process
                given={15}
                used={8}
                steps={[
                  {
                    title: "Decode the inputs",
                    time: "½ day",
                    body: "Turned the 40-page technical document and the approved HTML form into a list of what each rule and question means for the person using the screen.",
                  },
                  {
                    title: "Desk research",
                    time: "½ day",
                    body: "The sources below — the inputs, videos, similar platforms, search.",
                  },
                  {
                    title: "Wireframes",
                    body: "Low-fidelity drafts of the whole surveyor flow and the first officer dashboards, with an AI-assisted first pass.",
                  },
                  {
                    title: "Peer review",
                    body: "Walked the internal design team through the flows and folded in their feedback.",
                  },
                  {
                    title: "Stakeholder review",
                    body: "Stakeholders were aligned with the direction; they asked for branding and minor UI changes.",
                  },
                  {
                    title: "High fidelity",
                    body: "Build-ready screens for the app and the portals. A second designer joined on day 3 to take the District Officer flow and the login screens.",
                  },
                ]}
              />
            </PaperSection>
          </Cine>

          {/* 7 · Desk research */}
          <Cine preset="wipe">
            <PaperSection
              label={["Desk", "Research"]}
              headline="**What I studied** before drawing a screen"
              bubble={{ glyph: "த", label: "Tamil script" }}
              caption="Research was desk-based and took half a day — five sources, each tied to a decision."
              side="right"
            >
              <ResearchTable
                rows={[
                  {
                    source: "The approved HTML survey form",
                    looked:
                      "Every question, section and required field the Ministry had already signed off.",
                    led: "**The app's 11 short sections,** built around the approved questions — the questions themselves didn't change.",
                  },
                  {
                    source: "The 40-page technical document",
                    looked:
                      "Who the users are, what each role can do, and the rules the system must follow: offline use, consent, location.",
                    led: "**The four personas** and the role chain that follow.",
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
          </Cine>

          {/* 8 · Who I designed for */}
          <Cine preset="rise">
            <PaperSection
              still
              label={["Who I", "Designed for"]}
              headline="Four people use Survey Setu, **each one level above the last**"
              bubble={{ glyph: "ಕ", label: "Kannada script" }}
              caption="The personas came from the 40-page technical document, which defined every role and what it can do."
            >
              <PersonaStory
                people={[
                  {
                    role: "Field Surveyor",
                    scope: "1 village",
                    platform: "Android app",
                    credit: "me",
                    goal: "Finish each household form correctly, in one visit.",
                    context:
                      "Door to door in remote villages, often offline, after one day of training.",
                    pain: "Losing a half-filled form, or having to go back to fix one.",
                    does: "Picks a survey, fills 11 short sections, takes consent, submits.",
                    device: { kind: "phone", ...MOCK.home },
                  },
                  {
                    role: "District Officer",
                    scope: "1 district",
                    aka: "Also the surveyors' supervisor",
                    platform: "Web portal",
                    credit: "shared",
                    goal: "Keep the district's surveyors working and on target.",
                    context: "Manages the surveyors working across the blocks of one district.",
                    pain: "Not knowing who is in the field, or how far a survey has got.",
                    does: "Adds surveyors one at a time or in bulk, and tracks progress.",
                    device: { kind: "browser", ...PORTAL.district },
                  },
                  {
                    role: "State Officer",
                    scope: "1 state",
                    platform: "Web portal",
                    credit: "me",
                    goal: "See how every district in the state is doing.",
                    context: "Oversees the district officers of one state.",
                    pain: "Spotting a district that's falling behind before it's too late.",
                    does: "Adds district officers and checks submitted forms by district, block and village.",
                    device: { kind: "browser", ...PORTAL.state },
                  },
                  {
                    role: "Ministry Admin",
                    scope: "All of India",
                    platform: "Web portal",
                    credit: "me",
                    goal: "Run national surveys with the right people in every state.",
                    context:
                      "Ministry of Tribal Affairs, across 28 states and 8 union territories.",
                    pain: "Setting up officers state by state, by hand.",
                    does: "Creates surveys, adds state and district officers (also in bulk), tracks national progress.",
                    device: { kind: "browser", ...PORTAL.admin },
                  },
                ]}
                nodes={[
                  { role: "Ministry Admin", sub: "Creates surveys" },
                  { role: "State Officer", sub: "One state" },
                  { role: "District Officer", sub: "One district" },
                  { role: "Field Surveyor", sub: "Assigned villages" },
                  { role: "Household", sub: "Never uses the app" },
                ]}
                down="Each level adds the level below it and assigns them a region, using official location codes."
                up="Completed forms and progress flow back up, so each level sees only its own area."
                note="The households being surveyed never touch the app — but every screen exists to record them accurately."
              />
            </PaperSection>
          </Cine>
        </div>

        {/* Act · Design */}
        <div id="design">
          {/* 9 · User flows */}
          <Cine preset="rise">
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
                    device: "phone",
                    steps: [
                      { label: "Choose language", note: "21 options", screen: MOCK.language.src },
                      { label: "Log in", note: "Mobile number + OTP", icon: "login" },
                      { label: "Home", note: "Form counts", screen: MOCK.home.src },
                      { label: "Pick a survey", screen: MOCK.select.src },
                      {
                        label: "Sections 1–10",
                        note: "Household questions, auto-saved",
                        key: true,
                        screen: MOCK.family.src,
                      },
                      { label: "Section 11", note: "Consent", key: true, screen: MOCK.consent.src },
                      { label: "Submit", note: "Or keep as draft", screen: MOCK.submitted.src },
                    ],
                  },
                  {
                    title: "Officers · Web portal",
                    sub: "Admin, State Officer and District Officer share one navigation; what's inside is scoped to their region.",
                    device: "browser",
                    steps: [
                      { label: "Log in", icon: "login" },
                      {
                        label: "Dashboard",
                        note: "Summary + quick actions",
                        key: true,
                        screen: PORTAL.admin.src,
                      },
                      {
                        label: "Surveys",
                        note: "Overview, submitted forms",
                        screen: `${ASSETS}/portal-so-forms.jpg`,
                      },
                      {
                        label: "Users",
                        note: "Add one, or bulk upload",
                        key: true,
                        screen: `${ASSETS}/portal-so-create-do.jpg`,
                      },
                      { label: "Analytics", icon: "analytics" },
                      { label: "Settings", icon: "settings" },
                    ],
                  },
                ]}
              />
            </PaperSection>
          </Cine>

          {/* 10 · Wireframes → feedback → final */}
          <Cine preset="rise">
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
          </Cine>
          <Cine preset="flip">
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
          </Cine>

          {/* 11 · Branding */}
          <Cine preset="pop">
            <BrandingStyle
              note="I designed the wordmark: सर्वे सेतु (“Survey Bridge”) set in two weights, in the Ministry's green. It appears on the splash screen, in the app and across the portals."
              photo={SCENE.nokia}
            />
          </Cine>

          {/* 12 · Branding: type and colour, from the MoTA design system */}
          <Cine preset="spin">
            <TypeAndColour
              note="From the MoTA design system: Noto Sans, from a type family with versions for Indian scripts, and the Ministry's green as the primary colour, with separate colours for success, warning and danger."
              swatches={[
                [
                  { hex: "#057724", name: "Primary" },
                  { hex: "#222223", name: "Secondary", ring: true },
                  { hex: "#FFFFFF", name: "Neutral 0", dark: true },
                  { hex: "#727272", name: "Text hint" },
                ],
                [
                  { hex: "#3C9718", name: "Success" },
                  { hex: "#B77224", name: "Warning" },
                  { hex: "#B7131A", name: "Danger" },
                ],
              ]}
            />
          </Cine>
        </div>

        {/* Act · Solution */}
        <div id="solution">
          {/* 13 · Design decisions — field app */}
          <Cine preset="rise">
            <InkStatement
              label={["Design decisions ·", "Field app"]}
              headline="Every screen answers **one question for the surveyor**"
              caption="What am I doing, is it saved, and what's next?"
              bubble={{ glyph: "বা", label: "Bengali script" }}
            />
          </Cine>
          <Cine preset="stand">
            <PhoneShowcase
              word="Home"
              phone={MOCK.home}
              left={[
                {
                  title: "Online status",
                  body: "“You're Online” at the top, so surveyors know when their forms can be sent.",
                  pin: [46, 9],
                },
                {
                  title: "Current survey",
                  body: "Shown first, with a switch — most surveyors work on one survey at a time.",
                  pin: [94, 36],
                },
              ]}
              right={[
                {
                  title: "Form counts",
                  body: "Completed, reviewed, draft and flagged: the four things a surveyor acts on.",
                  pin: [50, 62],
                },
                {
                  title: "One main button",
                  body: "Start a new form. Nothing else competes for attention.",
                  pin: [93, 94],
                },
              ]}
            />
          </Cine>
          <Cine preset="stand">
            <PhoneShowcase
              word="Location"
              wordAt="bottom"
              phone={MOCK.geo}
              left={[
                {
                  title: "Place first",
                  body: "The household is pinned before any question, so every form is tied to a place.",
                  pin: [62, 45],
                },
                {
                  title: "Auto-saving",
                  body: "Shown on every section, so closing the app never feels risky.",
                  pin: [66, 23],
                },
              ]}
              right={[
                {
                  title: "Recapture",
                  body: "One tap to try again when the GPS signal is weak.",
                  pin: [93, 61],
                },
                {
                  title: "Section progress",
                  body: "“1/11 sections” and a bar, so the surveyor always knows how far is left.",
                  pin: [14, 19],
                },
              ]}
            />
          </Cine>
          <Cine preset="stand">
            <PhoneShowcase
              word="Consent"
              phone={MOCK.consent}
              left={[
                {
                  title: "Plain declaration",
                  body: "What's collected and why, in full, before anyone signs.",
                  pin: [96, 48],
                },
                {
                  title: "The law, in words",
                  body: "India's data-protection law, explained without legal language.",
                  pin: [96, 64],
                },
              ]}
              right={[
                {
                  title: "Read and agreed",
                  body: "A checkbox confirms the household has heard and understood the declaration.",
                  pin: [7, 93],
                },
                { title: "Last section", body: "Nothing submits without it.", pin: [63, 18] },
              ]}
            />
          </Cine>

          {/* 14 · Design decisions — portals */}
          <Cine preset="tilt">
            <PaperSection
              className="pt-section"
              label={["Design decisions ·", "Portals"]}
              headline="One portal, **three levels of scope**"
              bubble={{ glyph: "ગુ", label: "Gujarati script" }}
              caption="Admin, State Officer and District Officer share the same layout. Each sees only their own region and the people below them."
            >
              <RoleDashboards
                hero={SCENE.macbook}
                items={[
                  {
                    role: "Ministry Admin",
                    scope:
                      "All of India: surveys, state officers, district officers and surveyors across 28 states and 8 UTs.",
                    credit: "me",
                    screen: PORTAL.admin,
                  },
                  {
                    role: "State Officer",
                    scope:
                      "One state: its district officers and surveyors, with the same progress table.",
                    credit: "me",
                    screen: PORTAL.state,
                  },
                  {
                    role: "District Officer",
                    scope: "One district: its surveyors, and how many are in the field right now.",
                    credit: "shared",
                    screen: PORTAL.district,
                  },
                ]}
                shared={[
                  {
                    title: "Summary first",
                    body: "Counts at the top answer “how are we doing?” before anything else.",
                  },
                  {
                    title: "Quick actions",
                    body: "Each role's most common job — adding the level below — is one click from the dashboard.",
                  },
                  {
                    title: "Same progress table",
                    body: "Total, submitted and pending forms per survey, so every level reads progress the same way.",
                  },
                ]}
              />
            </PaperSection>
          </Cine>
          <Cine preset="swing">
            <BrowserShowcase
              word="Onboard"
              screen={{
                src: `${ASSETS}/portal-so-create-do.jpg`,
                alt: "State Officer portal — Create New District Officer: personal details, then Assign Region with state and district",
                height: 1685,
                label: "Survey Setu · State Officer",
              }}
              inset={{
                src: `${ASSETS}/portal-bulk-upload.jpg`,
                alt: "Bulk upload dialog — a CSV template, a drop zone, and how-to steps for adding many officers at once",
                width: 1740,
                height: 1030,
              }}
              notes={[
                {
                  title: "Assign a region",
                  body: "Every new officer is given their area at creation, using the government's official location codes.",
                },
                {
                  title: "One or many",
                  body: "Add a single officer with a short form, or upload a CSV for hundreds.",
                },
                {
                  title: "Same pattern at every level",
                  body: "Admin adds state officers, states add district officers, districts add surveyors.",
                },
              ]}
            />
          </Cine>

          {/* 15 · Accessibility & language */}
          <Cine preset="pop">
            <PaperSection
              className="pt-section"
              label={["Accessibility", "& Language"]}
              headline="Built for **21 languages** and first-time smartphone users"
              bubble={{ glyph: "हिं", label: "Hindi script" }}
              caption="The round glyph beside each headline on this page is one of the scripts the app speaks."
            >
              <NumberGrid
                cells={[
                  {
                    title: "21 languages",
                    body: "Chosen on the very first screen, **each written in its own script.**",
                    art: <ScriptCycle />,
                  },
                  {
                    title: "Plain words",
                    body: "No technical terms in the app; **consent written for a household,** not a lawyer.",
                  },
                  {
                    title: "Large targets",
                    body: "**Big buttons and one main action** per screen.",
                  },
                  {
                    title: "Status in words",
                    body: "Every status has a label, **not just a colour:** Completed, Draft, Flagged.",
                  },
                ]}
              />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div data-cine-media>
                  <Plate
                    {...SCENE.realme}
                    className="aspect-[1/1.02]"
                    sizes="(min-width: 768px) 560px, 92vw"
                  />
                </div>
                <PhoneCard {...MOCK.forms} className="aspect-[1/1.02]" />
              </div>
            </PaperSection>
          </Cine>
        </div>

        {/* Act · Outcome */}
        <div id="outcome">
          {/* 16 · Outcome */}
          <Cine preset="lift">
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
              devices={[SCENE.zenbook, SCENE.dell, SCENE.ipad]}
            />
          </Cine>

          {/* 17 · Reflection */}
          <Cine preset="rise">
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
          </Cine>
        </div>

        <Band className="pt-section">
          <MoreCases />
        </Band>

        {/* 18 · Thanks */}
        <Cine preset="stand">
          <Thanks
            linkedin={linkedin}
            scene={SCENE.wooden}
            body="The full document breakdown, the review sessions, and the trade-offs we argued about — happy to walk through them."
          />
        </Cine>
      </main>

      <Footer />
    </div>
  );
}
