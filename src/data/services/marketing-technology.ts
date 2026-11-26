import type { Service } from "@/lib/types";

export const service: Service = {
  slug: "marketing-technology",
  name: "Marketing Technology Engineering",
  shortName: "Marketing Technology",
  group: "Marketing & CRM Automation",
  icon: "chart",
  order: 8,
  seoTitle: "Marketing Technology Engineering Services — Muhammad Hamid",
  metaDescription:
    "Server-side conversion tracking, attribution routing, PPC waste detection and technical SEO automation — built as engineering, measured against your own data.",
  eyebrow: "Marketing Technology & Measurement Engineering",
  h1: "Measurement infrastructure instead of marketing guesswork",
  intro:
    "Ad platforms are optimistic, analytics is lossy, and when the two disagree, budget decisions fall to whichever dashboard the person in the room trusts. Eight years in growth taught me the real bottleneck: the numbers are wrong, and nobody can prove it. The fix is engineering — event contracts, server-side collection, attribution logic that survives iOS, and audits that end in a list of concrete changes. My background is digital marketing leadership and my day-to-day is automation engineering, so I build the pipeline and know which questions it has to answer.",
  benefits: [
    {
      title: "Conversion numbers you can defend",
      body: "Client-side tags lose events to blockers, consent and browser policy. Server-side collection with a deduplicated event contract gives you a number you can reconcile.",
    },
    {
      title: "Attribution that credits the right channel",
      body: "Lead-source capture, UTM normalisation and WhatsApp or offline conversions routed into the CRM instead of dying in a spreadsheet.",
    },
    {
      title: "Waste written as a change list",
      body: "Waste detection on search terms, placements and audiences, with the output written as a change list rather than a dashboard nobody opens.",
    },
    {
      title: "Reports people act on",
      body: "A small number of decision-grade reports, automated, with definitions written down — so the monthly review is about decisions rather than whose spreadsheet is right.",
    },
    {
      title: "Platform numbers reconciled with CRM reality",
      body: "Event coverage, duplication and consent handling audited, with ad platform, analytics and CRM numbers reconciled. The gaps tell you where to work.",
    },
  ],
  useCases: [
    {
      title: "Growth teams whose numbers get challenged",
      body: "Conversion tracking, server-side tagging and attribution the finance team and the ad platforms can both live with — instrumented, not asserted.",
    },
    {
      title: "Agencies proving ROI to retained clients",
      body: "Reporting pipelines that reconcile platform data with CRM reality, so the monthly review is about decisions rather than whose spreadsheet is right.",
    },
    {
      title: "E-commerce teams leaking spend",
      body: "Waste audits and long-tail analysis on Google and Meta accounts, with the tracking fixes that make the next audit trustworthy.",
    },
    {
      title: "Tracking that survives consent and iOS",
      body: "Event collection redesigned for the privacy-hardened browser: server-side collection with deduplication and privacy controls, so the numbers hold as client-side tags degrade.",
    },
    {
      title: "Search visibility beyond the rank report",
      body: "Technical SEO and AI-search visibility audited programmatically from Search Console data, producing fix lists instead of screenshots.",
    },
  ],
  process: [
    {
      title: "Reconcile",
      body: "Platform numbers against analytics against CRM. The gaps tell you where to work.",
    },
    {
      title: "Design events",
      body: "A small, named event contract with owners and meanings.",
    },
    {
      title: "Implement",
      body: "Server-side collection, dedupe keys, consent handling and QA in debug mode.",
    },
    {
      title: "Verify",
      body: "End-to-end test purchases and form submissions traced from click to CRM record.",
    },
    {
      title: "Automate reporting",
      body: "Scheduled reports that update themselves and flag anomalies.",
    },
  ],
  integrations: [
    "GA4",
    "Google Tag Manager (server-side)",
    "Meta Conversions API",
    "Google Ads",
    "Search Console",
    "BigQuery",
    "GoHighLevel CRM",
    "WhatsApp & offline conversions",
  ],
  technologies: [
    "Python",
    "GA4 Measurement Protocol",
    "Server-side GTM",
    "Google Ads API",
    "Search Console API",
    "BigQuery",
    "Pydantic",
    "GitHub Actions",
  ],
  faqs: [
    {
      question: "Is this a marketing retainer or a build engagement?",
      answer:
        "Primarily a build engagement: I implement the measurement layer and the automation, then hand it over. Ongoing retainers exist for teams that want continuous iteration.",
    },
    {
      question: "Do you run ad campaigns?",
      answer:
        "No. Campaign management stays with your team or your agency; I build the measurement and automation around the campaigns. That separation is deliberate — the person reporting the numbers should not be the person whose spend those numbers are judging. Where a growth question is useful context for the design, it is part of the work.",
    },
    {
      question: "Will this work with our existing stack?",
      answer:
        "The implementations are stack-agnostic at the edges: GA4, GTM, Meta, Google Ads, Search Console and any CRM with an API. Nothing requires you to migrate platforms.",
    },
    {
      question: "Why do the ad platform and our analytics disagree?",
      answer:
        "Different counting rules and different vantage points. Platforms claim view-throughs and model conversions; analytics misses events blocked client-side; consent cuts both ways. The work is making the gap measurable and stable — a reconciled number both sides can live with, and a written reason for the residual difference.",
    },
    {
      question: "What does the measurement audit produce?",
      answer:
        "Findings on event coverage, duplication and consent handling, plus a platform-versus-analytics-versus-CRM reconciliation. The output is a list of concrete fixes with owners, not a deck of charts.",
    },
    {
      question: "Is SEO part of this?",
      answer:
        "Technical SEO is, as engineering: programmatic audits of Search Console data and search-visibility checks that output fix lists. The measurement layer is what makes any content or campaign work judgeable afterwards.",
    },
    {
      question: "How do we start?",
      answer:
        "Send the platform numbers and your analytics export on WhatsApp. The gap is usually diagnosable in one pass, and the fix list follows from there.",
    },
  ],
  relatedProjects: ["conversionbridge", "ppc-waste-detector", "meta-lead-quality-analyzer", "ai-search-visibility-auditor", "geo-visibility-lab"],
  relatedArticles: ["server-side-conversion-tracking"],
  ctaHeading: "Do your numbers reconcile?",
  ctaBody:
    "Send the platform numbers and your analytics export on WhatsApp. The gap is usually diagnosable in one pass — then the fix list follows.",
};
