/**
 * About and contact pages.
 */

import { ABOUT } from '../content/site.js';
import { PRIMARY_CTA, SITE, waLink } from '../lib/config.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { BASE_SCRIPT, renderPage } from '../lib/layout.js';
import { breadcrumbSchema, buildSeo, personSchema } from '../lib/seo.js';
import {
  breadcrumbs,
  briefForm,
  button,
  ctaBand,
  featureGrid,
  pageHeader,
  pillList,
  sectionHeader,
  statStrip,
} from '../templates/components.js';

/**
 * @param {ReturnType<import('../lib/model.js').buildSiteModel>} model
 */
export function renderAbout(model) {
  const seo = buildSeo({
    title: ABOUT.metaTitle,
    fullTitle: true,
    description: ABOUT.metaDescription,
    path: '/about/',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about/' },
      ]),
      personSchema(),
    ],
  });

  const stats = [
    { label: 'Years in digital', value: '8+' },
    { label: 'Public repositories', value: `${model.stats.projects}` },
    { label: 'Contributions this year', value: `${model.stats.contributionsLastYear}` },
    { label: 'Technologies in use', value: `${model.techStack.length}+` },
  ];

  const body = `${breadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about/' },
  ])}
    ${pageHeader({
      eyebrow: ABOUT.eyebrow,
      heading: escapeHtml(ABOUT.headline),
      lede: ABOUT.standfirst,
      actions: `${button(PRIMARY_CTA.href, 'Work with me', { external: true })}${button(SITE.github.url, 'GitHub', { variant: 'ghost', external: true })}`,
    })}

    <section class="section">
      <div class="shell">${statStrip(stats)}</div>
    </section>

    ${ABOUT.sections
      .map(
        (section) => `<section class="section">
      <div class="shell split split--prose">
        <div>${sectionHeader({ eyebrow: 'About', heading: section.heading })}</div>
        <div class="prose-block">
          ${section.body.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n          ')}
        </div>
      </div>
    </section>`,
      )
      .join('\n\n    ')}

    <section class="section section--alt">
      <div class="shell">
        ${sectionHeader({ eyebrow: 'Path', heading: 'How the two halves connect' })}
        <ol class="timeline">
          ${ABOUT.timeline
            .map(
              (item) => `<li class="timeline__item">
            <span class="timeline__period">${escapeHtml(item.period)}</span>
            <div class="timeline__content">
              <h3 class="timeline__title">${escapeHtml(item.title)}</h3>
              <p class="timeline__body">${escapeHtml(item.body)}</p>
            </div>
          </li>`,
            )
            .join('\n          ')}
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        ${sectionHeader({ eyebrow: 'Tooling', heading: 'What I actually use' })}
        <div class="grid grid--2">
          ${ABOUT.stackGroups
            .map(
              (group) => `<article class="stack-group">
            <h3 class="stack-group__title">${escapeHtml(group.title)}</h3>
            ${pillList(group.items)}
          </article>`,
            )
            .join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="shell">
        ${sectionHeader({ eyebrow: 'Details', heading: 'The practical bits' })}
        ${featureGrid(
          [
            { title: 'Based in', body: ABOUT.contactNote },
            { title: 'Working languages', body: 'English and Urdu. All documentation, code comments, and handover material are written in English.' },
            { title: 'Availability', body: 'One or two concurrent engagements, depending on scope. Larger builds are scheduled rather than started immediately.' },
            { title: 'Contact', body: `WhatsApp ${SITE.whatsapp.display} or the project brief on /contact/. No scheduling link, no funnel.` },
          ],
          'feature-grid feature-grid--2',
        )}
      </div>
    </section>

    ${ctaBand({
      heading: 'Tell me what is breaking',
      body: 'A paragraph describing the system and the failure is enough to start. You will get a direct answer about whether I can help.',
      message: 'Hi Muhammad, I read your about page and want to discuss a project.',
      note: ABOUT.contactNote,
    })}`;

  return {
    path: '/about/',
    seo,
    html: renderPage({ seo, body, pageClass: 'page-about', activePath: '/about/', scripts: BASE_SCRIPT }),
    priority: 0.7,
    changefreq: 'monthly',
  };
}

/**
 * @param {ReturnType<import('../lib/model.js').buildSiteModel>} model
 */
export function renderContact(model) {
  const seo = buildSeo({
    title: 'Contact — brief in, WhatsApp out',
    description: `Send a two-minute project brief or message Muhammad Hamid on WhatsApp ${SITE.whatsapp.display}. Scope, timeline and the first honest answer, usually within one working day.`,
    path: '/contact/',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact/' },
      ]),
    ],
  });

  const body = `${breadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact/' },
  ])}
    ${pageHeader({
      eyebrow: 'Contact',
      heading: 'Tell me what should run itself',
      lede: 'Use the brief below or open WhatsApp directly. Either path reaches the same inbox — the brief just saves a round of questions, because it opens WhatsApp with your answers already written out.',
      actions: `${button(waLink('Hi Muhammad, I want to discuss an automation project.'), `WhatsApp ${SITE.whatsapp.display}`, { external: true })}${button(SITE.github.url, 'GitHub', { variant: 'ghost', external: true })}`,
    })}

    <section class="section">
      <div class="shell split">
        <div>
          ${sectionHeader({ eyebrow: 'What to send', heading: 'Three sentences is enough' })}
          <ol class="numbered-list">
            <li><strong>The system</strong> — which tools are involved and who uses them.</li>
            <li><strong>The work</strong> — the manual step that costs the most time, or the failure that keeps recurring.</li>
            <li><strong>The constraint</strong> — timeline, budget band, or compliance requirement that shapes the answer.</li>
          </ol>
          <p class="muted">Screenshots and sample files help but are not required for a first reply.</p>
        </div>
        <div class="contact-card">
          <h2 class="contact-card__title">Direct line</h2>
          <a class="contact-card__link" href="${escapeAttr(SITE.whatsapp.url)}" target="_blank" rel="noopener">${escapeHtml(SITE.whatsapp.display)}</a>
          <dl class="contact-card__meta">
            <div><dt>Response time</dt><dd>Within one working day</dd></div>
            <div><dt>Time zone</dt><dd>Pakistan Standard Time (UTC+5)</dd></div>
            <div><dt>Location</dt><dd>${escapeHtml(SITE.location.display)}</dd></div>
            <div><dt>Remote work</dt><dd>Europe, Middle East, North America</dd></div>
          </dl>
        </div>
      </div>
    </section>

    <section class="section" id="brief">
      <div class="shell split split--wide">
        <div>
          ${briefForm()}
        </div>
        <aside class="contact-aside">
          <h2 class="contact-aside__title">Or skip the form</h2>
          <p class="contact-aside__body">The WhatsApp button in the header always works, and it is the fastest route if you already know what you need.</p>
          <ul class="contact-aside__list">
            <li><strong>Reply window</strong> — within one working day, Pakistan Standard Time (UTC+5).</li>
            <li><strong>First call</strong> — 20 minutes, no deck, no pitch. Scope or no scope.</li>
            <li><strong>What I need</strong> — the tools involved, the manual step that hurts, and any deadline.</li>
            <li><strong>What comes back</strong> — a written scope with steps, timeline and a fixed price, or a straight no.</li>
          </ul>
          <a class="btn btn--ghost" href="${escapeAttr(waLink('Hi Muhammad, I want to discuss an automation project.'))}" target="_blank" rel="noopener">Open WhatsApp instead</a>
        </aside>
      </div>
    </section>

    <section class="section section--alt">
      <div class="shell">
        ${sectionHeader({ eyebrow: 'Scope', heading: 'What I will and will not take on' })}
        ${featureGrid(
          [
            { title: 'Yes — automation builds', body: 'MCP servers, agent implementations, Python tooling, measurement infrastructure. Fixed scope, defined done.' },
            { title: 'Yes — audits', body: 'A short paid audit of an existing pipeline or agent, with a written list of what is broken and what it costs.' },
            { title: 'Sometimes — retainer support', body: 'Only after a build has shipped and runs in production. Not as a substitute for documentation.' },
            { title: 'No — open-ended retainers', body: 'If the scope cannot be described in a paragraph, it is not ready to start.' },
          ],
          'feature-grid feature-grid--2',
        )}
      </div>
    </section>

    <section class="section">
      <div class="shell">
        ${sectionHeader({ eyebrow: 'Elsewhere', heading: 'Public work' })}
        <ul class="link-list">
          <li><a href="${escapeAttr(SITE.github.url)}" target="_blank" rel="noopener">GitHub — ${escapeHtml(SITE.github.user)}</a><span>${model.stats.projects} public repositories outside forks.</span></li>
          <li><a href="/projects/">Projects</a><span>Curated breakdowns of the most substantial repositories.</span></li>
          <li><a href="/articles/">Articles</a><span>Technical notes on MCP, agent evaluation, and measurement.</span></li>
        </ul>
      </div>
    </section>

    ${ctaBand({
      heading: 'Open WhatsApp and start typing',
      body: 'No agenda required. If it turns out I am not the right person, I will say so and point you elsewhere.',
      message: 'Hi Muhammad, I want to discuss an automation project.',
    })}`;

  return {
    path: '/contact/',
    seo,
    html: renderPage({ seo, body, pageClass: 'page-contact', activePath: '/contact/', scripts: BASE_SCRIPT }),
    priority: 0.8,
    changefreq: 'monthly',
  };
}
