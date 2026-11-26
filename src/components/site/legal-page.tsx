import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Section } from "@/components/site/section";
import { CTASection } from "@/components/site/whatsapp-cta";
import { buildMetadata } from "@/lib/seo";

interface LegalPageProps {
  page: {
    slug: "privacy" | "terms";
    title: string;
    seoTitle: string;
    metaDescription: string;
    updated: string;
    intro: string;
    sections: { heading: string; body: string[] }[];
  };
}

export function buildLegalMetadata(page: LegalPageProps["page"]): Metadata {
  return buildMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `/${page.slug}/`,
  });
}

export function LegalPageView({ page }: LegalPageProps) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: page.title },
            ]}
          />
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated{" "}
            <time dateTime={page.updated}>{page.updated}</time>
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {page.intro}
          </p>
        </div>
      </section>

      <Section inner={false} className="border-t-0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex flex-col gap-8">
            {page.sections.map((section) => (
              <article key={section.heading}>
                <h2 className="mb-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mb-3 text-sm leading-relaxed text-foreground/80 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        eyebrow="Contact"
        heading="Questions about this page?"
        body="They go to the same WhatsApp number as everything else."
        primaryLabel="Message on WhatsApp"
        primaryMessage={`Hi Hamid — a question about the ${page.title.toLowerCase()} page.`}
        secondaryHref="/"
        secondaryLabel="Back to home"
        note="This site has no email, no forms and no other contact channel."
      />
    </>
  );
}
