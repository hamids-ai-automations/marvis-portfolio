import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ArticleCard } from "@/components/site/cards";
import { JsonLd, articleSchema } from "@/components/site/json-ld";
import { Markdown } from "@/components/site/markdown";
import { Section } from "@/components/site/section";
import { WhatsAppButton } from "@/components/site/whatsapp-cta";
import { ARTICLES, getArticle } from "@/data/articles";
import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.seoTitle,
    description: article.metaDescription,
    path: `/articles/${article.slug}/`,
    ogType: "article",
    publishedTime: article.date,
  });
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = article.relatedArticles
    .map((a) => getArticle(a))
    .filter((a) => a !== undefined)
    .slice(0, 2);
  const services = article.relatedServices
    .map((s) => getService(s))
    .filter((s) => s !== undefined);
  const next = ARTICLES.find((a) => a.slug !== article.slug) ?? ARTICLES[0];

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-border/60">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Articles", href: "/articles/" },
                { name: article.title.slice(0, 60) },
              ]}
            />
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <Badge
                variant="secondary"
                className="rounded-sm px-2 py-0.5 text-[11px] font-medium text-primary"
              >
                {article.tag}
              </Badge>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden="true" />
                {article.readingMinutes} min read
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold leading-[1.2] tracking-tight sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {article.excerpt}
            </p>
            <p className="mt-6 flex items-center gap-3 text-sm">
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-display text-xs font-bold text-primary"
              >
                MH
              </span>
              <span className="text-muted-foreground">
                By{" "}
                <Link href="/about/" className="font-medium text-foreground hover:text-primary">
                  Muhammad Hamid
                </Link>{" "}
                — AI Automation Engineer
              </span>
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <Markdown content={article.content} />

          {services.length > 0 && (
            <div className="mt-12 rounded-xl border border-primary/30 bg-primary/5 p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                Need this built for you?
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}/`}
                      className="rounded-full border border-primary/30 bg-background px-3 py-1 text-sm font-medium text-primary hover:bg-primary/10"
                    >
                      {s.name} →
                    </Link>
                  ))}
                </div>
                <WhatsAppButton
                  label="Discuss on WhatsApp"
                  message={`Hi Hamid — I read "${article.title}" and want to discuss applying it.`}
                />
              </div>
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <Section eyebrow="Further reading" heading="Related articles">
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
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
      )}

      <Section eyebrow="Next" heading="Keep reading">
        <ArticleCard article={next} />
      </Section>

      <JsonLd
        data={articleSchema({
          headline: article.title,
          description: article.metaDescription,
          slug: article.slug,
          date: article.date,
          keywords: [article.tag, "AI automation", "Muhammad Hamid"],
        })}
      />
    </>
  );
}
