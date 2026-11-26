import type { Metadata } from "next";
import { Clock, Github, MapPin, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BriefBuilder } from "@/components/site/brief-builder";
import { JsonLd } from "@/components/site/json-ld";
import { Section } from "@/components/site/section";
import { buildMetadata } from "@/lib/seo";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Muhammad Hamid — AI Automation Engineer on WhatsApp",
  description:
    "Contact Muhammad Hamid on WhatsApp (+92 316 7417135) for AI automation, MCP servers, AI agents, Gemini or GoHighLevel development. Replies within one day.",
  path: "/contact/",
});

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE.url}/contact/`,
  mainEntity: { "@id": `${SITE.url}/#person` },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Contact
          </p>
          <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            One channel, and it is WhatsApp
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            No contact forms, no email chains, no scheduling links. WhatsApp is
            the fastest route to a real answer about your automation problem.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2 rounded-full bg-primary font-medium text-primary-foreground hover:bg-primary/90"
            >
              <a
                href={whatsappLink(
                  "Hi Hamid — I want to discuss an automation project."
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Start on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a
                href={SITE.github.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" aria-hidden="true" />
                Review the code first
              </a>
            </Button>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            <li className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/70 p-4 backdrop-blur">
              <MessageCircle className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">{SITE.whatsapp.display}</p>
                <p className="text-xs text-muted-foreground">
                  The only contact channel
                </p>
              </div>
            </li>
            <li className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/70 p-4 backdrop-blur">
              <Clock className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">One working day</p>
                <p className="text-xs text-muted-foreground">
                  Typical reply time
                </p>
              </div>
            </li>
            <li className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/70 p-4 backdrop-blur">
              <MapPin className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Lahore, Pakistan</p>
                <p className="text-xs text-muted-foreground">UTC+5 · worldwide work</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <Section
        eyebrow="Project brief"
        heading="Skip the small talk"
        lead="Answer three questions and the first message you send will already be a usable brief."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <BriefBuilder />

          <aside className="flex flex-col gap-4">
            <div className="rounded-xl border border-border/70 bg-card p-6">
              <h2 className="mb-3 font-display text-base font-semibold">
                What happens next
              </h2>
              <ol className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                <li>
                  <span className="font-semibold text-foreground">1.</span> You
                  send the brief. Expect a reply within one working day,
                  Pakistan time.
                </li>
                <li>
                  <span className="font-semibold text-foreground">2.</span> If
                  it looks like a fit, the next step is a short call or a
                  written scope — your choice.
                </li>
                <li>
                  <span className="font-semibold text-foreground">3.</span> The
                  first deliverable is usually a read-only audit, not an
                  invoice.
                </li>
              </ol>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <h2 className="mb-2 font-display text-base font-semibold">
                Not sure what you need?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Describe the process in plain words — the tooling, the manual
                steps, what breaks. Matching it to a service is my problem,
                not yours.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <JsonLd data={CONTACT_SCHEMA} />
    </>
  );
}
