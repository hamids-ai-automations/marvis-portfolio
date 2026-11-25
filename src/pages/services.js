/**
 * Service index and detail pages.
 */

import { PRIMARY_CTA, SITE, waLink } from '../lib/config.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { BASE_SCRIPT, renderPage } from '../lib/layout.js';
import {
  breadcrumbSchema,
  buildSeo,
  faqSchema,
  normalizePath,
  serviceSchema,
} from '../lib/seo.js';
import {
  breadcrumbs,
  button,
  ctaBand,
  faqList,
  featureGrid,
  pageHeader,
  pillList,
  processSteps,
  projectCard,
  sectionHeader,
  serviceCard,
} from '../templates/components.js';

/**
 * @param {ReturnType<import('../lib/model.js').buildSiteModel>} model
 */
export function renderServicesIndex(model) {
  const seo = buildSeo({
    title: 'Services — AI Automation & MCP Engineering',
    description:
      'Six ways to work together: AI automation, AI agent development, MCP servers, Python tooling, GoHighLevel automation, and marketing technology engineering.',
    path: '/services/',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services/' },
      ]),
    ],
  });

  const body = `${breadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
  ])}
    ${pageHeader({
      eyebrow: 'Services',
      heading: 'Work that ends with an operable system, not a deck',
      lede: 'Every engagement produces a repository, a runbook, and a measurable definition of done. Scope expands only when the first build proves itself.',
      actions: `${button(PRIMARY_CTA.href, 'Discuss your project', { external: true })}${button('/projects/', 'See the code', { variant: 'ghost' })}`,
    })}

    <section class="section">
      <div class="shell">
        <div class="grid grid--3">
          ${model.services.map((s, i) => serviceCard(s, `0${i + 1}`)).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="shell">
        ${sectionHeader({
          eyebrow: 'Common ground',
          heading: 'What every engagement includes',
          body: 'The specifics change per project. These do not.',
        })}
        ${featureGrid(
          [
            {
              title: 'A written contract before code',
              body: 'Inputs, outputs, failure semantics, and who owns the credentials — agreed before implementation starts.',
            },
            {
              title: 'Read-only first',
              body: 'Audits and early deployments cannot write. Write access is added per workflow, with previews where the risk lives.',
            },
            {
              title: 'Tested against real data',
              body: 'Fixtures come from the actual files and APIs involved, including the malformed cases that break naive scripts.',
            },
            {
              title: 'Handover, not dependency',
              body: 'Repository, runbook, and a recorded walkthrough. You are not buying a retainer by accident.',
            },
          ],
          'feature-grid feature-grid--2',
        )}
      </div>
    </section>

    ${ctaBand({
      heading: 'Not sure which of these fits?',
      body: 'Describe the process and the tools involved. I will tell you which service applies — or that none of them do.',
      message: 'Hi Muhammad, I need help figuring out which service fits my problem.',
    })}`;

  return {
    path: '/services/',
    seo,
    html: renderPage({ seo, body, pageClass: 'page-services', activePath: '/services/', scripts: BASE_SCRIPT }),
    priority: 0.9,
    changefreq: 'monthly',
  };
}

/**
 * @param {object} service
 * @param {ReturnType<import('../lib/model.js').buildSiteModel>} model
 */
export function renderServiceDetail(service, model) {
  const path = normalizePath(service.path);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: service.nav, path },
  ];

  const seo = buildSeo({
    title: service.metaTitle,
    description: service.metaDescription,
    path,
    jsonLd: [
      breadcrumbSchema(crumbs),
      serviceSchema({
        title: service.nav,
        serviceType: service.serviceType,
        description: service.metaDescription,
        path,
      }),
      faqSchema(service.faqs),
    ].filter(Boolean),
  });

  const related = service.projects ?? [];

  const body = `${breadcrumbs(crumbs)}
    <article class="service">
      ${pageHeader({
        eyebrow: `${service.eyebrow} · ${service.serviceType}`,
        heading: escapeHtml(service.title),
        lede: service.lede,
        actions: `${button(waLink(service.cta.message), 'Discuss this on WhatsApp', { external: true })}${button('/projects/', 'Relevant repositories', { variant: 'ghost' })}`,
      })}

      <section class="section">
        <div class="shell prose-block">
          ${service.intro.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n          ')}
        </div>
      </section>

      <section class="section section--alt">
        <div class="shell">
          ${sectionHeader({ eyebrow: 'The problem', heading: 'What usually goes wrong' })}
          ${featureGrid(service.problems, 'feature-grid feature-grid--3')}
        </div>
      </section>

      <section class="section">
        <div class="shell">
          ${sectionHeader({ eyebrow: 'Deliverables', heading: 'What you actually receive' })}
          ${featureGrid(service.deliverables, 'feature-grid feature-grid--2')}
        </div>
      </section>

      <section class="section section--alt">
        <div class="shell cta-inline">
          <div>
            <p class="cta-inline__kicker">Not sure this is the right fit?</p>
            <p class="cta-inline__text">Describe the manual step that costs the most time. A two-line message is enough to get a straight answer on scope, or on what to fix first.</p>
          </div>
          ${button(waLink(service.cta.message), 'Ask on WhatsApp', { external: true })}
        </div>
      </section>

      <section class="section">
        <div class="shell">
          ${sectionHeader({ eyebrow: 'Process', heading: 'Five steps, in this order' })}
          ${processSteps(service.process)}
        </div>
      </section>

      <section class="section section--alt">
        <div class="shell split">
          <div>
            ${sectionHeader({ eyebrow: 'Stack', heading: 'Built with' })}
            ${pillList(service.stack)}
          </div>
          <div>
            ${sectionHeader({ eyebrow: 'Proof', heading: 'Open-source evidence' })}
            ${
              related.length
                ? `<ul class="link-list">${related
                    .map((p) => {
                      // Curated repositories get a local case study; the rest link straight to GitHub.
                      const href = p.hasDetail ? `/projects/${p.slug}/` : p.repoUrl;
                      const external = p.hasDetail ? '' : ' target="_blank" rel="noopener"';
                      return `<li><a href="${escapeAttr(href)}"${external}>${escapeHtml(p.title)}</a><span>${escapeHtml(p.tagline)}</span></li>`;
                    })
                    .join('')}</ul>`
                : `<p class="muted">Related repositories are listed on the <a href="/projects/">projects page</a>.</p>`
            }
          </div>
        </div>
      </section>

      <section class="section">
        <div class="shell faq-section">
          ${sectionHeader({ eyebrow: 'FAQ', heading: 'Questions I get asked' })}
          ${faqList(service.faqs)}
        </div>
      </section>

      <section class="section section--alt">
        <div class="shell">
          <div class="section-head-row">
            ${sectionHeader({ eyebrow: 'Other services', heading: 'Related capability' })}
            <a class="text-link" href="/services/">All services →</a>
          </div>
          <div class="grid grid--3">
            ${model.services
              .filter((s) => s.slug !== service.slug)
              .slice(0, 3)
              .map((s) => serviceCard(s, ''))
              .join('\n            ')}
          </div>
        </div>
      </section>

      ${ctaBand({
        heading: service.cta.heading,
        body: service.cta.body,
        message: service.cta.message,
        note: `Direct line · ${SITE.whatsapp.display}`,
      })}
    </article>`;

  return {
    path,
    seo,
    html: renderPage({ seo, body, pageClass: 'page-service', activePath: '/services/', scripts: BASE_SCRIPT }),
    priority: 0.8,
    changefreq: 'monthly',
  };
}
