import type { Metadata } from "next";

import { ServiceCard } from "@/components/site/cards";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { CTASection } from "@/components/site/whatsapp-cta";
import { SERVICES, SERVICE_GROUPS } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Automation Services — MCP, Agents, Gemini, GoHighLevel | Muhammad Hamid",
  description:
    "Ten engineering services: AI automation, AI agents, Gemini development, LLM apps, MCP servers, GoHighLevel automation, marketing tech and Python security.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Services
          </p>
          <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Engineering services, from model to production system
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every service below follows the same spine: typed pipelines, a
            model step wrapped in contracts, guardrails before write-backs,
            and an evaluation loop that catches regressions before users do.
          </p>
        </div>
      </section>

      {SERVICE_GROUPS.map((group) => (
        <Section
          key={group}
          eyebrow={group}
          heading={
            group === "AI & Agent Development"
              ? "Build the intelligent layer"
              : group === "Marketing & CRM Automation"
                ? "Automate the revenue stack"
                : "Make it survive production"
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((s) => s.group === group).map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.05}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Section>
      ))}

      <CTASection
        eyebrow="Contact"
        heading="Discuss your automation project"
        body="Every engagement starts with an honest audit — including the parts that should be deleted instead of automated."
        primaryLabel="Start on WhatsApp"
        primaryMessage="Hi Hamid — I want to discuss which service fits my project."
        secondaryHref="/projects/"
        secondaryLabel="See the evidence first"
      />
    </>
  );
}
