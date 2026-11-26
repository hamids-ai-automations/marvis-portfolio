import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArticleCard, ProjectCard, ServiceCard } from "@/components/site/cards";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { WhatsAppButton } from "@/components/site/whatsapp-cta";
import { SERVICES, SERVICE_GROUPS } from "@/data/services";
import { ARTICLES } from "@/data/articles";
import { FEATURED_PROJECTS } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Muhammad Hamid — AI Automation Engineer | MCP, Agents, Gemini",
  description:
    "Open-source MCP servers, evaluated AI agents, Gemini apps and GoHighLevel automation for production business systems. By Muhammad Hamid. WhatsApp +92 316 7417135.",
  path: "/",
});

const HERO_BADGES = [
  "MCP servers",
  "AI agents",
  "Gemini",
  "GoHighLevel",
  "Python",
];

const STATS = [
  { value: `${SITE.github.publicRepos}`, label: "public repositories" },
  { value: "19", label: "documented open-source projects" },
  { value: "14", label: "in-depth technical articles" },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Fail loudly, never silently",
    body: "A pipeline that reports success on partial data is more dangerous than one that crashes. Explicit failure states, typed errors, and structured logs are not optional extras.",
  },
  {
    number: "02",
    title: "Measure before trusting",
    body: "Agents and automations ship with an evaluation suite. If I cannot demonstrate that a change did not regress behaviour, the change does not ship.",
  },
  {
    number: "03",
    title: "Read-only until proven",
    body: "Audits and first deployments run without write access. Writes are added per workflow, with previews and approval gates where the risk actually lives.",
  },
  {
    number: "04",
    title: "Hand over something operable",
    body: "You get the repository, the runbook, and a recorded walkthrough. The goal is a system your team can run without me on retainer.",
  },
];

export default function HomePage() {
  const featured = FEATURED_PROJECTS.slice(0, 6);
  const latestArticles = ARTICLES.slice(0, 3);

  return (
    <>
      {/* ---------------------------------- Hero ---------------------------------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
        <div aria-hidden="true" className="absolute inset-0 bg-glow" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              AI Automation Engineer · Lahore, Pakistan
            </p>
            <h1 className="max-w-4xl font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              I build the automation layer between{" "}
              <span className="text-gradient">AI models</span> and{" "}
              <span className="text-gradient">real business systems</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Open-source MCP servers, evaluated AI agents, and Python tooling
              that runs against production data. Eight years in growth
              marketing taught me what breaks; the last two have been spent
              building the infrastructure that stops it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                label="Start on WhatsApp"
                size="lg"
                message="Hi Hamid — I found your portfolio and want to discuss an automation project."
              />
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/projects/">
                  See the work
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {HERO_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-border/80 bg-background/60 px-3 py-1 font-mono text-xs text-foreground/70 backdrop-blur"
                >
                  {badge}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/60 sm:grid-cols-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 bg-background/80 px-6 py-5 backdrop-blur"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl font-bold text-primary">
                    {stat.value}
                  </dd>
                  <dd className="text-sm text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------- Services -------------------------------- */}
      <Section
        eyebrow="What I do"
        heading="Ten ways I get involved"
        lead="Most engagements start with one of these and expand as the system around it becomes visible."
        id="services"
      >
        <div className="flex flex-col gap-10">
          {SERVICE_GROUPS.map((group, gi) => (
            <Reveal key={group} delay={gi * 0.05}>
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {group}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {SERVICES.filter((s) => s.group === group).map((service) => (
                    <ServiceCard key={service.slug} service={service} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/services/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Explore all services in detail
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      {/* ------------------------------ Selected work ----------------------------- */}
      <Section
        eyebrow="Selected work"
        heading="Repositories, not case studies"
        lead="Everything below is public. Read the code, check the commit history, decide for yourself."
        id="work"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/projects/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            All 19 documented projects
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      {/* ------------------------------ GitHub strip ------------------------------ */}
      <section className="border-t border-border/60 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 sm:p-10">
              <div aria-hidden="true" className="absolute inset-0 bg-glow opacity-70" />
              <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  >
                    <Github className="size-6" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                      The GitHub profile is the portfolio
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Every project on this site links to public code you can
                      audit today: MCP servers, agent evaluation harnesses,
                      GoHighLevel tooling and marketing technology engineering.
                    </p>
                  </div>
                </div>
                <Button asChild variant="outline" className="shrink-0 rounded-full">
                  <a
                    href={SITE.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="size-4" aria-hidden="true" />
                    hamids-ai-automations
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ How I work ------------------------------- */}
      <Section
        eyebrow="How I work"
        heading="Four rules that shape every build"
        lead="These are not slogans; they are the reason the work survives its second week in production."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.number} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-border/70 bg-card p-6 transition-colors hover:border-primary/40">
                <p className="font-mono text-sm font-semibold text-primary">
                  {principle.number}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------- Latest writing --------------------------- */}
      <Section
        eyebrow="AI insights"
        heading="Latest technical writing"
        lead="Practical guides on MCP servers, Gemini development, GoHighLevel automation and agent reliability."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.05}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/articles/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            All articles
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      {/* ---------------------------------- CTA ---------------------------------- */}
      <section className="relative overflow-hidden border-t border-border/60 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Contact
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
              One channel, and it is WhatsApp
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              WhatsApp is the fastest route. The{" "}
              <Link
                href="/contact/"
                className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                project brief on the contact page
              </Link>{" "}
              takes two minutes and opens WhatsApp with your answers already
              written out.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton
                label="Discuss on WhatsApp"
                size="lg"
                message="Hi Hamid — I want to discuss a project."
              />
              <Button asChild variant="ghost" size="lg" className="rounded-full">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {SITE.whatsapp.display}
                </a>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">{SITE.replyNote}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
