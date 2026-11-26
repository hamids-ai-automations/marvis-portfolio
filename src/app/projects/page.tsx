import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/site/cards";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { CTASection } from "@/components/site/whatsapp-cta";
import { FEATURED_PROJECTS, PROJECTS } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Open-Source Projects — MCP Servers, AI Agents, GHL Tooling | Muhammad Hamid",
  description:
    "19 documented open-source projects by Muhammad Hamid: production MCP servers, Gemini agent tooling, GoHighLevel engines and marketing technology engineering.",
  path: "/projects/",
});

const FEATURED_SLUGS = new Set(FEATURED_PROJECTS.map((p) => p.slug));
const REST = PROJECTS.filter((p) => !FEATURED_SLUGS.has(p.slug));

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Projects
          </p>
          <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Repositories, not case studies
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Everything below is public. Read the code, check the commit
            history, decide for yourself. Each project page restates only
            what the repository can prove.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a href={SITE.github.url} target="_blank" rel="noopener noreferrer">
                <Github className="size-4" aria-hidden="true" />
                {SITE.github.publicRepos} public repositories on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Featured"
        heading="The projects that define the practice"
        lead="MCP control planes, agent reliability tooling, and contract-first GoHighLevel engineering."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.04}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="The wider catalogue"
        heading="Every documented repository"
        lead="Smaller tools, experiments and labs — each solving a specific operational problem."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REST.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.03}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="GitHub portfolio"
        heading="The profile is the source of truth"
      >
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 sm:p-10">
            <div aria-hidden="true" className="absolute inset-0 bg-glow opacity-60" />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground">
                  <Star className="size-4 text-primary" aria-hidden="true" />
                  hamids-ai-automations
                </p>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  &quot;AI Automation Engineer building open-source agentic
                  systems: MCP servers, eval harnesses, Python automation and
                  API integrations.&quot;
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["python", "typescript", "mcp", "ai-agents", "llm"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border/80 px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Button asChild className="shrink-0 rounded-full">
                <a href={SITE.github.url} target="_blank" rel="noopener noreferrer">
                  View profile
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
        <p className="mt-6 text-sm text-muted-foreground">
          Project pages on this site cover the 19 repositories with the
          deepest documentation. The remaining repos — experiments, mirrors
          and client-adjacent work — live on{" "}
          <Link href={SITE.github.url} className="text-primary hover:underline">
            the GitHub profile
          </Link>
          .
        </p>
      </Section>

      <CTASection
        eyebrow="Contact"
        heading="Want something like this built?"
        body="Every project above started as a process that hurt. Tell me yours."
        primaryLabel="Discuss on WhatsApp"
        primaryMessage="Hi Hamid — I browsed your projects and want something similar."
        secondaryHref="/services/"
        secondaryLabel="Browse services"
      />
    </>
  );
}
