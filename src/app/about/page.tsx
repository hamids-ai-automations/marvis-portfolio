import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { CTASection } from "@/components/site/whatsapp-cta";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About Muhammad Hamid — from growth marketing to AI automation",
  description:
    "8+ years leading digital growth, now building AI automations: MCP servers, agent evaluation harnesses and Python tooling. Based in Lahore, working worldwide.",
  path: "/about/",
});

const SECTIONS = [
  {
    heading: "The shift",
    body: [
      "As a digital marketing lead I owned pipelines, tracking, and reporting across paid search, paid social, and lifecycle automation. The recurring failure was never creative or strategy — it was instrumentation. Conversions that did not fire, CRM records that disagreed with ad platforms, reports assembled by hand every Monday.",
      "Fixing those problems properly meant writing software. What started as scripts became APIs, then services, then agents once language models made unstructured operational work tractable. The transition from marketing leadership to AI automation engineering was not a career change so much as following the work to where it actually lived.",
    ],
  },
  {
    heading: "What I build now",
    body: [
      "Today the work is concentrated in three areas: Model Context Protocol servers that let AI clients operate real business systems safely, agent implementations that come with evaluation harnesses instead of promises, and Python automation that replaces manual operational labour.",
      "The marketing background is not incidental. It means I know which questions a reporting pipeline actually has to answer, which metrics people act on, and why a technically correct dashboard often gets ignored.",
    ],
  },
  {
    heading: "How I work with clients",
    body: [
      "Engagements start with an audit, not a proposal template. I map the current process, measure where the time goes, and tell you which parts are worth automating — including the parts that should be deleted instead.",
      "Builds are incremental and reversible. Read-only first, dry runs by default, write access added deliberately. You own the repository and the credentials at handover, with a runbook and a recorded walkthrough.",
      "I work directly with the person who owns the problem. No account managers, no discovery phase that bills for a document you already know the contents of.",
    ],
  },
];

const STACK_GROUPS = [
  {
    title: "AI and agents",
    items: [
      "Gemini",
      "OpenAI-compatible APIs",
      "Model Context Protocol",
      "Function calling",
      "Structured output",
      "Evaluation harnesses",
    ],
  },
  {
    title: "Languages and runtime",
    items: ["Python 3.12", "TypeScript", "Node.js", "Pydantic v2", "httpx", "Playwright"],
  },
  {
    title: "Platforms and infrastructure",
    items: ["Firebase", "Google Cloud", "Cloudflare Workers", "GitHub Actions", "Docker", "BigQuery"],
  },
  {
    title: "Marketing systems",
    items: ["GoHighLevel", "GA4", "Google Tag Manager", "Meta CAPI", "Google Ads API", "Search Console API"],
  },
];

const TIMELINE = [
  {
    period: "2024 — present",
    title: "AI automation engineering",
    body: "Building MCP servers, agent tooling, and evaluation harnesses as open source. Client work spans CRM automation, measurement infrastructure, and agent reliability.",
  },
  {
    period: "2021 — 2024",
    title: "Digital marketing leadership",
    body: "Owned growth programmes end to end: paid acquisition, lifecycle automation, tracking architecture, and the reporting that leadership actually used.",
  },
  {
    period: "2017 — 2021",
    title: "Performance marketing and analytics",
    body: "Hands-on campaign management, technical SEO, and the first automations built to stop rebuilding the same reports every week.",
  },
];

export default function AboutPage() {
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@id": `${SITE.url}/#person` },
    url: `${SITE.url}/about/`,
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            About
          </p>
          <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Eight years in growth, now building the engineering underneath it.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I spent most of my career on the marketing side of the dashboard,
            and kept running into the same wall: the systems producing the
            numbers were held together with scripts nobody owned.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" />
            {SITE.location} — working with teams across Europe, the Middle
            East, and North America.
          </p>
        </div>
      </section>

      <Section inner={false} className="border-t-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-10">
              {SECTIONS.map((section, i) => (
                <Reveal key={section.heading} delay={i * 0.05}>
                  <article>
                    <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">
                      {section.heading}
                    </h2>
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="mb-4 text-base leading-relaxed text-foreground/80"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </article>
                </Reveal>
              ))}
            </div>

            <aside className="flex flex-col gap-8">
              <Reveal>
                <div className="rounded-xl border border-border/70 bg-card p-6">
                  <h2 className="mb-4 font-display text-base font-semibold">
                    Timeline
                  </h2>
                  <ol className="flex flex-col gap-5">
                    {TIMELINE.map((item) => (
                      <li key={item.period} className="relative pl-5">
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-1.5 size-2 rounded-full bg-primary"
                        />
                        <p className="font-mono text-xs text-primary">
                          {item.period}
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-xl border border-border/70 bg-card p-6">
                  <h2 className="mb-4 font-display text-base font-semibold">
                    Explore the work
                  </h2>
                  <ul className="flex flex-col gap-2 text-sm">
                    <li>
                      <Link href="/projects/" className="text-primary hover:underline">
                        19 documented open-source projects →
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/" className="text-primary hover:underline">
                        10 engineering services →
                      </Link>
                    </li>
                    <li>
                      <Link href="/articles/" className="text-primary hover:underline">
                        Technical articles →
                      </Link>
                    </li>
                    <li>
                      <a
                        href={SITE.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        GitHub profile →
                      </a>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </Section>

      <Section eyebrow="Tooling" heading="What the work is built with">
        <div className="grid gap-4 sm:grid-cols-2">
          {STACK_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-border/70 bg-card p-6">
                <h3 className="mb-3 font-display text-base font-semibold">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="font-mono text-xs font-normal"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Contact"
        heading="Discuss your automation project"
        body="Tell me which process hurts the most. You get an honest assessment of what is worth automating — including the parts that are cheaper to delete."
        primaryLabel="Hire Muhammad Hamid"
        primaryMessage="Hi Hamid — I read your about page and want to discuss a project."
        secondaryHref="/contact/"
        secondaryLabel="Use the project brief"
      />

      <JsonLd data={profileSchema} />
    </>
  );
}
