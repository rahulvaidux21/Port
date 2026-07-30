import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { Section } from "@/components/case-study/Section";
import { MediaPanel } from "@/components/case-study/MediaPanel";
import { InsightCard } from "@/components/case-study/InsightCard";
import { StatCard } from "@/components/case-study/StatCard";
import { TradeoffCard } from "@/components/case-study/TradeoffCard";
import { IconLabelList } from "@/components/case-study/IconLabelList";
import { NextCaseStudy } from "@/components/case-study/NextCaseStudy";
import { caseStudies } from "@/lib/data";
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

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = caseStudyDetails[slug];
  const study = caseStudies.find((s) => s.id === slug);

  if (!detail || !study) {
    notFound();
  }

  const nextStudy = caseStudies.find((s) => s.id === detail.nextCaseStudySlug);
  const accent = { accentColor: study.labelColor, accentColorDark: study.labelColorDark };
  const labelStyle = { "--l": study.labelColor, "--ld": study.labelColorDark } as CSSProperties;

  return (
    <>
      <Navbar />
      <main>
        <CaseStudyHero detail={detail} study={study} />

        <div className="mx-auto max-w-[1140px] px-6 md:px-8">
          <div className="flex flex-wrap gap-x-10 gap-y-4 border-b border-editor-border pb-10">
            {detail.snapshot.map((row) => (
              <div key={row.label}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">{row.label}</p>
                <p className="mt-1 font-sans text-base text-text-primary">{row.value}</p>
              </div>
            ))}
          </div>
        </div>

        <Section index="01" title="Problem" {...accent}>
          <div className="flex flex-col gap-4">
            {detail.problem.paragraphs.map((p, i) => (
              <p key={i} className="font-sans text-base leading-relaxed text-text-secondary">
                {p}
              </p>
            ))}
          </div>
        </Section>

        <Section index="02" title="Goals & Constraints" {...accent} wide>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="max-w-[520px]">
              <p className="mb-4 font-sans text-base leading-relaxed text-text-secondary">{detail.goals.intro}</p>
              <ul className="flex flex-col gap-3">
                {detail.goals.items.map((item) => (
                  <li key={item} className="flex gap-2.5 font-sans text-base leading-relaxed text-text-secondary">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <IconLabelList items={detail.constraints} />
          </div>
        </Section>

        <Section index="03" title="Research" {...accent} wide>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <div className="flex max-w-[560px] flex-col gap-4">
              {detail.research.paragraphs.map((p, i) => (
                <p key={i} className="font-sans text-base leading-relaxed text-text-secondary">
                  {p}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              {detail.research.media.map((m) => (
                <MediaPanel key={m.src} media={m} />
              ))}
            </div>
          </div>
        </Section>

        <Section index="04" title="Key Insights" {...accent} wide>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {detail.insights.map((item, i) => (
              <InsightCard key={item.title} item={item} index={i} {...accent} />
            ))}
          </div>
        </Section>

        <Section index="05" title="Opportunity" {...accent}>
          <blockquote className="rounded-2xl border border-editor-border bg-surface p-8">
            <p className="font-serif text-xl italic leading-snug text-text-primary md:text-2xl">“{detail.opportunity}”</p>
          </blockquote>
        </Section>

        <Section index="06" title="Design Principles" {...accent} wide>
          <IconLabelList items={detail.principles} columns={3} />
        </Section>

        <Section index="07" title="Process" {...accent} wide>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
            <div className="flex max-w-[560px] flex-col gap-4">
              {detail.process.paragraphs.map((p, i) => (
                <p key={i} className="font-sans text-base leading-relaxed text-text-secondary">
                  {p}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-6 sm:flex-row md:flex-col">
              {detail.process.media.map((m) => (
                <MediaPanel key={m.src} media={m} className="sm:flex-1" />
              ))}
            </div>
          </div>
        </Section>

        <Section index="08" title="User Flow" {...accent} wide>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {detail.userFlow.map((flow) => (
              <div key={flow.audience} className="rounded-2xl border border-editor-border bg-surface p-6">
                <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                  {flow.audience} flow
                </p>
                <ol className="flex flex-col gap-2.5">
                  {flow.steps.map((step, i) => (
                    <li key={step} className="flex items-baseline gap-2 font-sans text-base leading-relaxed text-text-secondary">
                      <span className="font-mono text-xs text-text-muted">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Section>

        <Section index="09" title="Final Design" {...accent} wide>
          <p className="mb-6 max-w-[720px] font-sans text-base leading-relaxed text-text-secondary">{detail.finalDesign.intro}</p>
          <ul className="mb-10 grid max-w-[900px] grid-cols-1 gap-3 sm:grid-cols-2">
            {detail.finalDesign.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-2.5 rounded-xl border border-editor-border bg-surface p-4 font-sans text-base leading-relaxed text-text-secondary"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {detail.finalDesign.media.map((m) => (
              <MediaPanel key={m.src} media={m} />
            ))}
          </div>
        </Section>

        <Section index="10" title="Design Decisions" {...accent}>
          <div className="flex flex-col gap-6">
            {detail.decisions.map((d) => (
              <div key={d.label}>
                <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest" style={labelStyle}>
                  <span className="text-[var(--l)] dark:text-[var(--ld)]">{d.label}</span>
                </p>
                <p className="font-sans text-base leading-relaxed text-text-secondary">{d.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section index="11" title="Trade-offs" {...accent} wide>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {detail.tradeoffs.map((t) => (
              <TradeoffCard key={t.title} item={t} />
            ))}
          </div>
        </Section>

        <Section index="12" title="Collaboration" {...accent}>
          <div className="flex flex-col gap-4">
            {detail.collaboration.paragraphs.map((p, i) => (
              <p key={i} className="font-sans text-base leading-relaxed text-text-secondary">
                {p}
              </p>
            ))}
          </div>
        </Section>

        <Section index="13" title="Challenges" {...accent} wide>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {detail.challenges.map((c) => (
              <div key={c.title} className="rounded-2xl border border-editor-border bg-surface p-6">
                <h3 className="mb-2 font-sans text-lg font-bold text-text-primary">{c.title}</h3>
                <p className="font-sans text-base leading-relaxed text-text-secondary">{c.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section index="14" title="Results" {...accent} wide>
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {detail.results.stats.map((s) => (
              <StatCard key={s.label} stat={s} {...accent} />
            ))}
          </div>
          <div className="mb-8 flex max-w-[720px] flex-col gap-4">
            {detail.results.paragraphs.map((p, i) => (
              <p key={i} className="font-sans text-base leading-relaxed text-text-secondary">
                {p}
              </p>
            ))}
          </div>

          {detail.featuredTestimonial && (
            <blockquote className="mb-8 max-w-[720px] border-l-2 border-accent py-1 pl-6">
              <p className="font-serif text-xl italic leading-snug text-text-primary">
                “{detail.featuredTestimonial.quote}”
              </p>
              <footer className="mt-3 font-mono text-xs uppercase tracking-widest text-text-muted">
                {detail.featuredTestimonial.role}
              </footer>
            </blockquote>
          )}

          <p className="max-w-[720px] font-sans text-sm text-text-muted">
            <span className="font-semibold text-text-secondary">Tools — </span>
            {detail.tools}
          </p>
        </Section>

        <Section index="15" title="Reflection" {...accent} wide>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {detail.reflection.items.map((item, i) => (
              <div key={i} className="rounded-2xl border border-editor-border bg-surface p-6">
                <p className="font-sans text-base leading-relaxed text-text-secondary">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        {nextStudy && <NextCaseStudy next={nextStudy} />}
      </main>
      <Footer />
    </>
  );
}
