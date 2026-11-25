/**
 * Reusable UI blocks. Templates compose these; nothing here decides page structure.
 */

import { PRIMARY_CTA, SITE, waLink } from '../lib/config.js';
import { cx, escapeAttr, escapeHtml, formatDate, isoDate } from '../lib/html.js';

/**
 * @param {{eyebrow?: string, heading: string, body?: string, align?: string}} options
 */
export function sectionHeader({ eyebrow, heading, body, align = 'start' }) {
  return `<div class="section-head section-head--${escapeAttr(align)}">
        ${eyebrow ? `<p class="eyebrow">${escapeHtml(eyebrow)}</p>` : ''}
        <h2 class="section-head__title">${escapeHtml(heading)}</h2>
        ${body ? `<p class="section-head__body">${escapeHtml(body)}</p>` : ''}
      </div>`;
}

/**
 * @param {{eyebrow?: string, heading: string, lede?: string, actions?: string, meta?: string}} options
 */
export function pageHeader({ eyebrow, heading, lede, actions = '', meta = '' }) {
  return `<header class="page-header">
      <div class="shell">
        ${eyebrow ? `<p class="eyebrow">${escapeHtml(eyebrow)}</p>` : ''}
        <h1 class="page-header__title">${heading}</h1>
        ${lede ? `<p class="page-header__lede">${escapeHtml(lede)}</p>` : ''}
        ${meta ? `<div class="page-header__meta">${meta}</div>` : ''}
        ${actions ? `<div class="page-header__actions">${actions}</div>` : ''}
      </div>
    </header>`;
}

/**
 * @param {Array<{name: string, path: string}>} items
 */
export function breadcrumbs(items) {
  const links = items
    .map((item, index) => {
      const isLast = index === items.length - 1;
      if (isLast) {
        return `<li aria-current="page">${escapeHtml(item.name)}</li>`;
      }
      return `<li><a href="${escapeAttr(item.path)}">${escapeHtml(item.name)}</a></li>`;
    })
    .join('');
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><div class="shell"><ol>${links}</ol></div></nav>`;
}

/**
 * @param {{title: string, lede: string, path: string, index: string, meta?: string[]}} service
 */
export function serviceCard(service, index) {
  const meta = (service.meta ?? [])
    .map((m) => `<span>${escapeHtml(m)}</span>`)
    .join('');
  return `<a class="card card--service" href="${escapeAttr(service.path)}">
        <div class="card__top">
          <span class="card__index">${escapeHtml(index)}</span>
        </div>
        <h3 class="card__title">${escapeHtml(service.nav)}</h3>
        <p class="card__body">${escapeHtml(service.cardBody ?? service.lede)}</p>
        ${meta ? `<div class="card__meta">${meta}</div>` : ''}
        <span class="card__arrow" aria-hidden="true">→</span>
      </a>`;
}

/**
 * @param {object} project
 * @param {{compact?: boolean}} [options]
 */
export function projectCard(project, options = {}) {
  const inner = `<div class="card__top">
          <span class="tag">${escapeHtml(project.categoryLabel ?? 'Project')}</span>
          ${project.language ? `<span class="card__lang">${escapeHtml(project.language)}</span>` : ''}
        </div>
        <h3 class="card__title">${escapeHtml(project.title)}</h3>
        <p class="card__body">${escapeHtml(project.tagline)}</p>
        <div class="card__meta">
          ${project.serviceTitle ? `<span>${escapeHtml(project.serviceTitle)}</span>` : ''}
          ${project.pushedAt ? `<span>Updated ${escapeHtml(formatDate(project.pushedAt))}</span>` : ''}
        </div>
        <span class="card__arrow" aria-hidden="true">→</span>`;

  if (project.hasDetail) {
    return `<a class="card card--project" href="/projects/${escapeAttr(project.slug)}/">${inner}</a>`;
  }
  return `<a class="card card--project card--external" href="${escapeAttr(project.repoUrl)}" target="_blank" rel="noopener">${inner}</a>`;
}

/**
 * @param {object} article
 */
export function articleCard(article) {
  return `<a class="card card--article" href="${escapeAttr(article.path)}">
        <div class="card__top">
          <time class="card__date" datetime="${escapeAttr(isoDate(article.date))}">${escapeHtml(formatDate(article.date))}</time>
        </div>
        <h3 class="card__title">${escapeHtml(article.title)}</h3>
        <p class="card__body">${escapeHtml(article.description)}</p>
        <div class="card__meta">${(article.tags ?? []).map((t) => `<span>${escapeHtml(t)}</span>`).join('')}</div>
        <span class="card__arrow" aria-hidden="true">→</span>
      </a>`;
}

/**
 * @param {Array<{label: string, value: string, note?: string}>} stats
 */
export function statStrip(stats) {
  return `<dl class="stat-strip">
        ${stats
          .map(
            (stat) => `<div class="stat">
          <dt>${escapeHtml(stat.label)}</dt>
          <dd>${escapeHtml(stat.value)}</dd>
          ${stat.note ? `<p class="stat__note">${escapeHtml(stat.note)}</p>` : ''}
        </div>`,
          )
          .join('\n        ')}
      </dl>`;
}

/**
 * @param {Array<{question: string, answer: string}>} faqs
 */
export function faqList(faqs, id = 'faq') {
  return `<div class="faq" id="${escapeAttr(id)}">
        ${faqs
          .map(
            (faq) => `<details class="faq__item">
          <summary class="faq__question">${escapeHtml(faq.question)}</summary>
          <div class="faq__answer"><p>${escapeHtml(faq.answer)}</p></div>
        </details>`,
          )
          .join('\n        ')}
      </div>`;
}

/**
 * @param {{heading: string, body: string, message?: string, label?: string, note?: string}} options
 */
export function ctaBand({ heading, body, message, label, note }) {
  const href = message ? waLink(message) : PRIMARY_CTA.href;
  return `<section class="cta-band">
      <div class="shell cta-band__inner">
        <div class="cta-band__copy">
          <h2 class="cta-band__title">${escapeHtml(heading)}</h2>
          <p class="cta-band__body">${escapeHtml(body)}</p>
        </div>
        <div class="cta-band__actions">
          <a class="btn btn--primary btn--lg" href="${escapeAttr(href)}" target="_blank" rel="noopener">
            <span aria-hidden="true">💬</span> ${escapeHtml(label ?? 'Message me on WhatsApp')}
          </a>
          <p class="cta-band__note">${escapeHtml(note ?? SITE.whatsapp.display)}</p>
        </div>
      </div>
    </section>`;
}

/**
 * @param {string[]} items
 * @param {string} [className]
 */
export function pillList(items, className = 'pill-list') {
  if (!items?.length) return '';
  return `<ul class="${escapeAttr(className)}">${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('')}</ul>`;
}

/**
 * @param {Array<{title: string, body: string}>} items
 */
export function featureGrid(items, className = 'feature-grid') {
  return `<div class="${escapeAttr(className)}">
        ${items
          .map(
            (item) => `<article class="feature">
          <h3 class="feature__title">${escapeHtml(item.title)}</h3>
          <p class="feature__body">${escapeHtml(item.body)}</p>
        </article>`,
          )
          .join('\n        ')}
      </div>`;
}

/**
 * @param {Array<{step: string, title: string, body: string}>} steps
 */
export function processSteps(steps) {
  return `<ol class="process">
        ${steps
          .map(
            (step) => `<li class="process__item">
          <span class="process__step">${escapeHtml(step.step)}</span>
          <div class="process__content">
            <h3 class="process__title">${escapeHtml(step.title)}</h3>
            <p class="process__body">${escapeHtml(step.body)}</p>
          </div>
        </li>`,
          )
          .join('\n        ')}
      </ol>`;
}

/**
 * @param {string} href
 * @param {string} label
 * @param {{variant?: string, external?: boolean}} [options]
 */
export function button(href, label, options = {}) {
  const variant = options.variant ?? 'primary';
  const external = options.external ? ' target="_blank" rel="noopener"' : '';
  return `<a class="${cx('btn', `btn--${variant}`)}" href="${escapeAttr(href)}"${external}>${escapeHtml(label)}</a>`;
}

/**
 * Simple two-column definition block for project metadata.
 * @param {Array<[string, string]>} rows
 */
export function metaList(rows) {
  const filtered = rows.filter(([, value]) => value);
  if (!filtered.length) return '';
  return `<dl class="meta-list">${filtered
    .map(
      ([label, value]) =>
        `<div class="meta-list__row"><dt>${escapeHtml(label)}</dt><dd>${value}</dd></div>`,
    )
    .join('')}</dl>`;
}
