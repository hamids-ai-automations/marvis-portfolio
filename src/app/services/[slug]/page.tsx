import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ArticleCard, ProjectCard } from "@/components/site/cards";
import { Faq } from "@/components/site/faq";
import { JsonLd, faqSchema, serviceSchema } from "@/components/site/json-ld";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { ServiceIcon } from "@/components/site/service-icon";
import { WhatsAppButton } from "@/components/site/whatsapp-cta";
import { getArticle } from "@/data/articles";
import { getProject } from "@/data/projects";
import { SERVICES, getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const projects = service.relatedProjects
    .map((p) => getProject(p))
    .filter((p) => p !== undefined);
  const articles = service.relatedArticles
    .map((a) => getArticle(a))
    .filter((a) => a !== undefined);
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6);

  return (
    <>
      {/* ---------------------------------- Hero ---------------------------------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div aria-hidden="true" className="absolute inset-0 bg-glow" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services/" },
              { name: service.shortName },
            ]}
          />
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ServiceIcon icon={service.icon} className="size-6" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {service.eyebrow}
            </p>
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.9rem]">
            {service.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {service.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton
              label="Discuss this service"
              size="lg"
              message={`Hi Hamid — I read your ${service.name} page and want to discuss a project.`}
            />
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/projects/">
                See the evidence
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------- Benefits -------------------------------- */}
      {service.benefits.length > 0 && (
        <Section
          eyebrow="Why it matters"
          heading="What you actually get"
          lead="The properties that separate a production system from a demo."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-border/70 bg-card p-6 transition-colors hover:border-primary/40">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="size-3.5 text-primary" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {benefit.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ------------------------------- Use cases -------------------------------- */}
      {service.useCases.length > 0 && (
        <Section
          eyebrow="Use cases"
          heading="Where this earns its keep"
          lead="Typical engagements, described by the problem they remove."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {service.useCases.map((useCase, i) => (
              <Reveal key={useCase.title} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-border/70 bg-muted/30 p-6">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {useCase.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* -------------------------------- Process --------------------------------- */}
      {service.process.length > 0 && (
        <Section
          eyebrow="How it runs"
          heading="The delivery spine"
          lead="Incremental, reversible, and auditable at every step."
        >
          <ol className="grid gap-4 md:grid-cols-2">
            {service.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <li className="flex h-full gap-4 rounded-xl border border-border/70 bg-card p-6">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Section>
      )}

      {/* --------------------------- Stack and integrations ------------------------ */}
      {(service.integrations.length > 0 || service.technologies.length > 0) && (
        <Section
          eyebrow="Toolchain"
          heading="Integrations and technologies"
          lead="Chosen for durability rather than novelty."
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-border/70 bg-card p-6">
              <h3 className="mb-4 font-display text-base font-semibold">
                Systems it connects to
              </h3>
              <ul className="flex flex-wrap gap-2">
                {service.integrations.map((integration) => (
                  <li
                    key={integration}
                    className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground/80"
                  >
                    {integration}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border/70 bg-card p-6">
              <h3 className="mb-4 font-display text-base font-semibold">
                Built with
              </h3>
              <ul className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      )}

      {/* -------------------------------- Evidence -------------------------------- */}
      {projects.length > 0 && (
        <Section
          eyebrow="Evidence"
          heading="Public repositories, not claims"
          lead="Every project below is open source. Read the code before you write to me."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
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
              All documented projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Section>
      )}

      {/* ------------------------------- Related reading --------------------------- */}
      {articles.length > 0 && (
        <Section
          eyebrow="Further reading"
          heading="Related technical writing"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.05}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ---------------------------------- FAQ ---------------------------------- */}
      {service.faqs.length > 0 && (
        <Section eyebrow="FAQ" heading="Questions worth answering">
          <Faq faqs={service.faqs} heading="About this service" />
        </Section>
      )}

      {/* ---------------------------------- CTA ---------------------------------- */}
      <section className="border-t border-border/60 bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Contact
          </p>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
            {service.ctaHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {service.ctaBody}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton
              label="Discuss on WhatsApp"
              size="lg"
              message={`Hi Hamid — about ${service.name}:`}
            />
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/contact/">
                <MessageCircle className="size-4" aria-hidden="true" />
                Use the project brief
              </Link>
            </Button>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            Prefer to look first?{" "}
            <a
              href="https://github.com/hamids-ai-automations"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-medium text-primary hover:underline"
            >
              Audit the repositories
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>

      {/* ------------------------------- Related services -------------------------- */}
      <Section eyebrow="Adjacent" heading="Related services">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link
                href={`/services/${s.slug}/`}
                className="group flex h-full items-center justify-between gap-3 rounded-xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ServiceIcon icon={s.icon} className="size-4" />
                  </span>
                  <span className="text-sm font-semibold">{s.name}</span>
                </div>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.metaDescription,
          slug: service.slug,
        })}
      />
      {service.faqs.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}
    </>
  );
}
