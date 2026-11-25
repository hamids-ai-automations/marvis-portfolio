/**
 * Home page.
 */

import { HOME } from '../content/site.js';
import { PRIMARY_CTA, SITE, waLink } from '../lib/config.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { BASE_SCRIPT, renderPage } from '../lib/layout.js';
import { buildProjects } from '../lib/normalize.js';
import {
  buildSeo,
  collectionSchema,
  faqSchema,
  normalizePath,
  personSchema,
  professionalServiceSchema,
  websiteSchema,
} from '../lib/seo.js';
import {
  articleCard,
  button,
  ctaBand,
  faqList,
  projectCard,
  sectionHeader,
  serviceCard,
} from '../templates/components.js';

const HOME_FAQS = [
  {
    question: 'What kind of automation work do you take on?',
    answer:
      'MCP servers that expose business systems to AI clients, AI agents with evaluation harnesses, Python tooling for operational work, and measurement infrastructure for marketing teams.',
  },
  {
    question: 'Do you work with clients outside Pakistan?',
    answer:
      'Yes. Most engagements are remote across Europe, the Middle East, and North America, coordinated over WhatsApp and a shared repository.',
  },
  {
    question: 'How do engagements usually start?',
    answer:
      'With a short audit: what the process is, where the time goes, and what is worth automating. That produces a scoped first build rather than an open-ended retainer.',
  },
];

/**
 * @param {ReturnType<import('../lib/model.js').buildSiteModel>} model
 */
export function renderHome(model) {
  const stats = [
    { label: 'Published repositories', value: `${model.stats.projects}`, note: 'public, excluding forks' },
    { label: 'Technologies in use', value: `${model.stats.languages || model.techStack.length}`, note: 'languages and platforms' },
    { label: 'Contributions this year', value: `${model.stats.contributionsLastYear}`, note: 'commits and pull requests' },
    { label: 'Merged pull requests', value: `${model.stats.mergedPrs || 0}`, note: 'across public projects' },
  ].filter((s) => s.value && s.value !== '0');

  const seo = buildSeo({
    title: HOME.seoTitle,
    fullTitle: true,
    description: HOME.standfirst,
    path: '/',
    jsonLd: [
      personSchema(),
      professionalServiceSchema(),
      websiteSchema(),
      faqSchema(HOME_FAQS),
      collectionSchema({
        title: 'Services',
        description: 'AI automation, agent development, MCP servers, Python tooling, GoHighLevel automation, and marketing technology.',
        path: '/services/',
        items: model.services.map((s) => ({ name: s.nav, path: s.path })),
      }),
    ].filter(Boolean),
  });

  const body = `<section class="hero">
      <div class="shell hero__inner">
        <p class="eyebrow">${escapeHtml(HOME.eyebrow)}</p>
        <h1 class="hero__title">${escapeHtml(HOME.headline)}</h1>
        <p class="hero__lede">${escapeHtml(HOME.standfirst)}</p>
        <div class="hero__actions">
          ${button(waLink('Hi Muhammad, I found your portfolio and want to discuss an automation project.'), 'Discuss on WhatsApp', { external: true })}
          ${button('/projects/', 'See the work', { variant: 'ghost' })}
        </div>
        <ul class="hero__proof">
          ${stats
            .map(
              (stat) => `<li class="hero__proof-item">
            <span class="hero__proof-value">${escapeHtml(stat.value)}</span>
            <span class="hero__proof-label">${escapeHtml(stat.label)}</span>
          </li>`,
            )
            .join('\n          ')}
        </ul>
      </div>
    </section>

    <section class="section" id="services">
      <div class="shell">
        ${sectionHeader(HOME.sections.capabilities)}
        <div class="grid grid--3">
          ${model.services.map((service, i) => serviceCard(service, `0${i + 1}`)).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section section--alt" id="work">
      <div class="shell">
        <div class="section-head-row">
          ${sectionHeader(HOME.sections.work)}
          <a class="text-link" href="${escapeAttr(HOME.sections.work.cta.href)}">${escapeHtml(HOME.sections.work.cta.label)} →</a>
        </div>
        <div class="grid grid--3">
          ${model.featuredProjects.slice(0, 6).map((p) => projectCard(p)).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        ${sectionHeader(HOME.sections.principles)}
        <ol class="principles">
          ${HOME.sections.principles.items
            .map(
              (item) => `<li class="principle">
            <span class="principle__number">${escapeHtml(item.number)}</span>
            <div>
              <h3 class="principle__title">${escapeHtml(item.title)}</h3>
              <p class="principle__body">${escapeHtml(item.body)}</p>
            </div>
          </li>`,
            )
            .join('\n          ')}
        </ol>
      </div>
    </section>

    <section class="section section--alt">
      <div class="shell stack-section">
        <div>
          ${sectionHeader(HOME.sections.stack)}
        </div>
        <ul class="stack-bars">
          ${model.techStack
            .slice(0, 8)
            .map(
              (tech) => `<li class="stack-bar">
            <div class="stack-bar__head">
              <span class="stack-bar__name">${escapeHtml(tech.name)}</span>
              <span class="stack-bar__value">${tech.percentage.toFixed(1)}%</span>
            </div>
            <div class="stack-bar__track"><span class="stack-bar__fill" style="width:${Math.min(100, tech.percentage).toFixed(1)}%"></span></div>
            <p class="stack-bar__note">${tech.repositoryCount} repositories</p>
          </li>`,
            )
            .join('\n          ')}
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <div class="section-head-row">
          ${sectionHeader({ eyebrow: 'Writing', heading: 'Notes from the build', body: 'Technical write-ups on MCP, agent evaluation, and measurement — the parts that are hard to get right.' })}
          <a class="text-link" href="/articles/">All articles →</a>
        </div>
        <div class="grid grid--2">
          ${model.articles.slice(0, 2).map((a) => articleCard(a)).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="shell faq-section">
        ${sectionHeader({ eyebrow: 'Questions', heading: 'Before you message me' })}
        ${faqList(HOME_FAQS)}
      </div>
    </section>

    ${ctaBand({
      heading: HOME.sections.contact.heading,
      body: HOME.sections.contact.body,
      message: 'Hi Muhammad, I found your portfolio and want to discuss an automation project.',
      note: HOME.sections.contact.note,
    })}`;

  return {
    path: '/',
    seo,
    html: renderPage({ seo, body, activePath: '/', scripts: BASE_SCRIPT }),
    priority: 1.0,
    changefreq: 'weekly',
  };
}
