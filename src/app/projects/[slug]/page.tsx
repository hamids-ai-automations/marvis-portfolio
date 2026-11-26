import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Calendar, Github, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ProjectCard } from "@/components/site/cards";
import { JsonLd, softwareSchema } from "@/components/site/json-ld";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { WhatsAppButton } from "@/components/site/whatsapp-cta";
import { getProject, PROJECTS } from "@/data/projects";
import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} — ${project.tagline.replace(/\.$/, "")} | Muhammad Hamid`;
  return buildMetadata({
    title: title.length > 65 ? `${project.name} | Muhammad Hamid` : title,
    description:
      project.description.length > 160
        ? `${project.description.slice(0, 157)}…`
        : project.description,
    path: `/projects/${project.slug}/`,
    ogType: "article",
    publishedTime: project.updated,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const service = getService(project.service);
  const related = PROJECTS.filter(
    (p) => p.service === project.service && p.slug !== project.slug
  ).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Projects", href: "/projects/" },
              { name: project.name },
            ]}
          />
          <p className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 uppercase tracking-wider">
              <span aria-hidden="true" className="size-2 rounded-full bg-primary/80" />
              {project.language}
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5" aria-hidden="true" />
              {project.stars} {project.stars === 1 ? "star" : "stars"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" aria-hidden="true" />
              Updated {project.updated}
            </span>
            {service && (
              <span>
                Service:{" "}
                <Link
                  href={`/services/${service.slug}/`}
                  className="font-medium text-primary hover:underline"
                >
                  {service.name}
                </Link>
              </span>
            )}
          </p>
          <h1 className="max-w-4xl font-mono text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-3xl font-display text-lg font-medium leading-snug text-foreground/90 sm:text-xl">
            {project.tagline}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" aria-hidden="true" />
                Open the repository
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <WhatsAppButton
              label="Ask about this project"
              variant="outline"
              size="lg"
              message={`Hi Hamid — I was reading your ${project.name} repository and want to discuss something similar.`}
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.topics.map((topic) => (
              <Badge
                key={topic}
                variant="outline"
                className="font-mono text-[11px] font-normal text-muted-foreground"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="The problem" heading="What this solves">
        <p className="max-w-3xl text-base leading-relaxed text-foreground/80">
          {project.problem}
        </p>
      </Section>

      {project.approach.length > 0 && (
        <Section eyebrow="Approach" heading="How it is built">
          <ol className="flex max-w-3xl flex-col gap-4">
            {project.approach.map((step, i) => (
              <Reveal key={step.slice(0, 40)} delay={i * 0.05}>
                <li className="flex gap-4 rounded-xl border border-border/70 bg-card p-5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                    {step}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Section>
      )}

      {project.capabilities.length > 0 && (
        <Section eyebrow="Capabilities" heading="What it ships with">
          <ul className="grid max-w-4xl gap-3 sm:grid-cols-2">
            {project.capabilities.map((capability) => (
              <li
                key={capability}
                className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/30 p-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                />
                <span className="text-sm leading-relaxed text-foreground/85">
                  {capability}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section
        eyebrow="Read the code"
        heading="The repository is the documentation"
      >
        <div className="rounded-xl border border-border/70 bg-card p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <Button asChild variant="outline" className="mt-4 rounded-full">
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" aria-hidden="true" />
              github.com/hamids-ai-automations/{project.name}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </Section>

      {related.length > 0 && (
        <Section eyebrow="Adjacent" heading="Related projects">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/projects/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              All projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Section>
      )}

      <section className="border-t border-border/60 bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Contact
          </p>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
            Want this applied to your stack?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            This repository is public for a reason. If a version of it would
            solve your version of the problem, the fastest route is WhatsApp.
          </p>
          <div className="mt-8">
            <WhatsAppButton
              label="Discuss on WhatsApp"
              size="lg"
              message={`Hi Hamid — about building something like ${project.name} for my systems.`}
            />
          </div>
        </div>
      </section>

      <JsonLd
        data={softwareSchema({
          name: project.name,
          description: project.description,
          slug: project.slug,
          programmingLanguage: project.language,
          url: project.url,
        })}
      />
    </>
  );
}
