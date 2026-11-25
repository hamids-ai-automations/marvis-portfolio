/**
 * Privacy and Terms pages.
 *
 * These exist because the previous site published /privacy and /terms, and
 * because a WhatsApp-only contact channel deserves a plain-language statement of
 * what happens to a message once it is sent.
 */

import { SITE, waLink } from '../lib/config.js';
import { escapeHtml } from '../lib/html.js';
import { BASE_SCRIPT, renderPage } from '../lib/layout.js';
import { breadcrumbSchema, buildSeo } from '../lib/seo.js';
import { breadcrumbs, pageHeader, sectionHeader } from '../templates/components.js';

const UPDATED = '2026-11-25';

/**
 * @param {{title: string, description: string, path: string, crumb: string, sections: Array<{heading: string, paragraphs?: string[], bullets?: string[]}>, intro: string}} config
 */
function renderLegalPage({ title, description, path, crumb, intro, sections }) {
  const seo = buildSeo({
    title,
    description,
    path,
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: crumb, path },
      ]),
    ],
  });

  const body = `${breadcrumbs([
    { name: 'Home', path: '/' },
    { name: crumb, path },
  ])}
    ${pageHeader({
      eyebrow: 'Legal',
      heading: escapeHtml(title),
      lede: intro,
      meta: `<span>Last updated <time datetime="${UPDATED}">${UPDATED}</time></span>`,
    })}

    <section class="section">
      <div class="shell split split--prose">
        <div>${sectionHeader({ eyebrow: 'Detail', heading: 'The short version' })}</div>
        <div class="prose-block">
          ${sections
            .map(
              (section) => `<h2>${escapeHtml(section.heading)}</h2>
          ${(section.paragraphs ?? []).map((p) => `<p>${escapeHtml(p)}</p>`).join('\n          ')}
          ${
            section.bullets
              ? `<ul>${section.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`
              : ''
          }`,
            )
            .join('\n          ')}
          <p>Questions about this page go to the same WhatsApp number used everywhere else on the site:
            <a href="${escapeHtml(waLink('Hi Muhammad, I have a question about your site policies.'))}" target="_blank" rel="noopener">${escapeHtml(SITE.whatsapp.display)}</a>.
          </p>
        </div>
      </div>
    </section>`;

  return { path, html: renderPage({ seo, body, pageClass: 'page-legal', activePath: path, scripts: BASE_SCRIPT }) };
}

/**
 * @param {unknown} _model
 */
export function renderPrivacy(_model) {
  return renderLegalPage({
    title: 'Privacy Policy',
    description:
      'What this site collects (almost nothing), how WhatsApp messages are handled, and which third parties are involved.',
    path: '/privacy/',
    crumb: 'Privacy',
    intro: 'This site is a static portfolio. It does not use advertising trackers, marketing pixels, or analytics that profile you.',
    sections: [
      {
        heading: 'What this site collects',
        paragraphs: [
          'There are no accounts, sign-in forms, contact forms, or cookies set by this site. No analytics script is loaded, so no visitor-level behaviour is recorded here.',
          'The hosting provider (Firebase Hosting, operated by Google) keeps standard server logs such as IP address, user agent, and requested URL for security and abuse prevention. Those logs are governed by Google’s privacy terms.',
        ],
      },
      {
        heading: 'WhatsApp is the only contact channel',
        paragraphs: [
          'Every call to action opens WhatsApp with a pre-filled message. Nothing is transmitted until you press send inside WhatsApp.',
          'Once you send a message, it is processed by WhatsApp under its own privacy policy. The message content, your profile name, and your number are stored in the WhatsApp thread so the conversation can continue.',
        ],
      },
      {
        heading: 'How messages are used',
        bullets: [
          'To reply to your enquiry and scope the work you asked about.',
          'To keep a record of what was agreed, for as long as the project or the relationship requires.',
          'Nothing else. Messages are not sold, published, or added to a mailing list.',
        ],
      },
      {
        heading: 'Third parties',
        paragraphs: [
          'The site is served by Firebase Hosting and links out to GitHub. Following an outbound link takes you to a service with its own policies, which this site does not control.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'You can ask for a copy of the messages you sent, or ask for them to be deleted, by writing to the same WhatsApp number. Requests are handled within a reasonable period, except where records must be kept for legal or accounting reasons.',
        ],
      },
    ],
  });
}

/**
 * @param {unknown} _model
 */
export function renderTerms(_model) {
  return renderLegalPage({
    title: 'Terms of Use',
    description:
      'The basis on which this portfolio is published: content ownership, no warranty, and how project engagements are agreed.',
    path: '/terms/',
    crumb: 'Terms',
    intro: 'This site is published for information. Reading it does not create a client relationship, and no engagement starts until scope and terms are agreed in writing.',
    sections: [
      {
        heading: 'Content and ownership',
        paragraphs: [
          'Text, code samples, and design on this site belong to Muhammad Hamid unless stated otherwise. Open-source repositories linked from here carry their own licences, which govern reuse.',
          'You may quote short excerpts with attribution and a link. Republishing whole pages, or reusing the design as a template, is not permitted.',
        ],
      },
      {
        heading: 'No warranty',
        paragraphs: [
          'Technical write-ups describe how systems behaved at the time of writing. APIs, platforms, and pricing change; nothing here is a guarantee of a particular outcome.',
          'Any figures quoted from public repositories (commit counts, contribution totals, repository counts) are generated automatically and may lag behind GitHub by a few hours.',
        ],
      },
      {
        heading: 'Project engagements',
        bullets: [
          'Scope, deliverables, timeline, and price are agreed per project before work starts.',
          'Work described on the service pages is representative, not an offer of a fixed package.',
          'Client systems are accessed only with the credentials and permissions the client provides.',
        ],
      },
      {
        heading: 'Liability',
        paragraphs: [
          'The site is provided as is. To the extent permitted by law, no liability is accepted for decisions taken solely on the basis of its content.',
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: [
          'These terms are governed by the laws of Pakistan. Disputes are handled in the courts of Lahore, unless the engagement contract says otherwise.',
        ],
      },
    ],
  });
}
