import type { LegalPage } from "@/lib/types";

/**
 * Privacy and Terms content, migrated from the previous site's
 * src/pages/legal.js (published /privacy/ and /terms/).
 *
 * These exist because a WhatsApp-only contact channel deserves a
 * plain-language statement of what happens to a message once it is sent.
 */

export const PRIVACY: LegalPage = {
  slug: "privacy",
  title: "Privacy Policy",
  seoTitle: "Privacy Policy: What This Site Collects (Almost Nothing)",
  metaDescription:
    "What this static portfolio site collects (almost nothing), how WhatsApp messages are handled and used, and which third parties are involved.",
  updated: "2026-11-25",
  intro:
    "This site is a static portfolio. It does not use advertising trackers, marketing pixels, or analytics that profile you.",
  sections: [
    {
      heading: "What this site collects",
      body: [
        "There are no accounts, sign-in forms, contact forms, or cookies set by this site. No analytics script is loaded, so no visitor-level behaviour is recorded here.",
        "The hosting provider (Firebase Hosting, operated by Google) keeps standard server logs such as IP address, user agent, and requested URL for security and abuse prevention. Those logs are governed by Google’s privacy terms.",
      ],
    },
    {
      heading: "WhatsApp is the only contact channel",
      body: [
        "Every call to action opens WhatsApp with a pre-filled message. Nothing is transmitted until you press send inside WhatsApp.",
        "Once you send a message, it is processed by WhatsApp under its own privacy policy. The message content, your profile name, and your number are stored in the WhatsApp thread so the conversation can continue.",
      ],
    },
    {
      heading: "How messages are used",
      body: [
        "To reply to your enquiry and scope the work you asked about.",
        "To keep a record of what was agreed, for as long as the project or the relationship requires.",
        "Nothing else. Messages are not sold, published, or added to a mailing list.",
      ],
    },
    {
      heading: "Third parties",
      body: [
        "The site is served by Firebase Hosting and links out to GitHub. Following an outbound link takes you to a service with its own policies, which this site does not control.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "You can ask for a copy of the messages you sent, or ask for them to be deleted, by writing to the same WhatsApp number. Requests are handled within a reasonable period, except where records must be kept for legal or accounting reasons.",
      ],
    },
    {
      heading: "Questions",
      body: [
        "Questions about this page go to the same WhatsApp number used everywhere else on the site: +92 316 7417135.",
      ],
    },
  ],
};

export const TERMS: LegalPage = {
  slug: "terms",
  title: "Terms of Use",
  seoTitle: "Terms of Use: Content Ownership, No Warranty, Engagements",
  metaDescription:
    "The basis on which this portfolio is published: content ownership, no warranty, how project engagements are agreed, and governing law in Pakistan.",
  updated: "2026-11-25",
  intro:
    "This site is published for information. Reading it does not create a client relationship, and no engagement starts until scope and terms are agreed in writing.",
  sections: [
    {
      heading: "Content and ownership",
      body: [
        "Text, code samples, and design on this site belong to Muhammad Hamid unless stated otherwise. Open-source repositories linked from here carry their own licences, which govern reuse.",
        "You may quote short excerpts with attribution and a link. Republishing whole pages, or reusing the design as a template, is not permitted.",
      ],
    },
    {
      heading: "No warranty",
      body: [
        "Technical write-ups describe how systems behaved at the time of writing. APIs, platforms, and pricing change; nothing here is a guarantee of a particular outcome.",
        "Any figures quoted from public repositories (commit counts, contribution totals, repository counts) are generated automatically and may lag behind GitHub by a few hours.",
      ],
    },
    {
      heading: "Project engagements",
      body: [
        "Scope, deliverables, timeline, and price are agreed per project before work starts.",
        "Work described on the service pages is representative, not an offer of a fixed package.",
        "Client systems are accessed only with the credentials and permissions the client provides.",
      ],
    },
    {
      heading: "Liability",
      body: [
        "The site is provided as is. To the extent permitted by law, no liability is accepted for decisions taken solely on the basis of its content.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of Pakistan. Disputes are handled in the courts of Lahore, unless the engagement contract says otherwise.",
      ],
    },
    {
      heading: "Questions",
      body: [
        "Questions about this page go to the same WhatsApp number used everywhere else on the site: +92 316 7417135.",
      ],
    },
  ],
};
