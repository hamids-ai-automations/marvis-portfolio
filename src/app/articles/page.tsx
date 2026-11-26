import type { Metadata } from "next";

import { ArticleCard } from "@/components/site/cards";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { CTASection } from "@/components/site/whatsapp-cta";
import { ARTICLES } from "@/data/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Insights — Articles on MCP, Gemini, Agents & GHL | Muhammad Hamid",
  description:
    "Engineering articles by Muhammad Hamid: MCP server development, Gemini automation, AI agent evaluation, GoHighLevel workflows and marketing technology.",
  path: "/articles/",
});

export default function ArticlesPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            AI insights
          </p>
          <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Technical writing from the build floor
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Guides, post-mortems and engineering notes on MCP servers, Gemini
            development, agent reliability and GoHighLevel automation. No
            listicles, no hype — what is here is what worked.
          </p>
        </div>
      </section>

      <Section eyebrow="Latest" heading="Most recent">
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <ArticleCard article={featured} className="lg:col-span-2" />
          </Reveal>
          {rest.slice(0, 1).map((article) => (
            <Reveal key={article.slug} delay={0.05}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Archive" heading="Every article">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(1).map((article, i) => (
            <Reveal key={article.slug} delay={Math.min(i, 6) * 0.03}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Contact"
        heading="Reading is free. Building is the next step."
        body="If one of these articles describes your problem, the fastest next step is a WhatsApp message."
        primaryLabel="Discuss on WhatsApp"
        primaryMessage="Hi Hamid — I read one of your articles and want to discuss applying it."
        secondaryHref="/services/"
        secondaryLabel="Browse services"
      />
    </>
  );
}
