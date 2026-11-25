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

/**
 * Architecture figure used on the home page and every service page.
 * Drawn inline: no image request, no layout shift, inherits theme colours.
 * @param {{caption?: string, compact?: boolean}} [options]
 */
export function automationDiagram({ caption, compact = false } = {}) {
  const stages = [
    { title: 'Signals', body: 'Forms, inbox, CRM events, Sheets, webhooks' },
    { title: 'Normalise', body: 'Typed schema, dedupe, enrichment' },
    { title: 'Reason', body: 'LLM step with retrieved context' },
    { title: 'Guardrails', body: 'Schema validation, retries, human approval' },
    { title: 'Systems of record', body: 'CRM, ATS, Sheets, ticketing, notifications' },
  ];

  const width = 720;
  const boxW = 128;
  const gap = 16;
  const boxH = 86;
  const y = 28;

  const boxes = stages
    .map((stage, i) => {
      const x = 4 + i * (boxW + gap);
      return `<g class="diagram__node">
        <rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="10"></rect>
        <text x="${x + boxW / 2}" y="${y + 26}" class="diagram__title">${escapeHtml(stage.title)}</text>
        ${wrapSvgText(stage.body, x + boxW / 2, y + 47, 17)}
      </g>${
        i < stages.length - 1
          ? `<path class="diagram__arrow" d="M${x + boxW + 1} ${y + boxH / 2} h14" marker-end="url(#arrowhead)"></path>`
          : ''
      }`;
    })
    .join('\n        ');

  return `<figure class="diagram${compact ? ' diagram--compact' : ''}">
      <svg viewBox="0 0 ${width} 148" role="img" aria-labelledby="diagram-title diagram-desc" preserveAspectRatio="xMidYMid meet">
        <title id="diagram-title">Automation reference architecture</title>
        <desc id="diagram-desc">Signals are captured from forms, inbox and CRM events, normalised into a typed schema, reasoned over by a language model, checked against guardrails and write-backs, then written into systems of record.</desc>
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 z" fill="currentColor"></path>
          </marker>
        </defs>
        ${boxes}
        <path class="diagram__loop" d="M${4 + 4 * (boxW + gap) + boxW / 2} ${y + boxH + 6} v18 q0 8 -8 8 h-${4 * (boxW + gap) + boxW - boxW / 2} q-8 0 -8 -8 v-14" marker-end="url(#arrowhead)"></path>
        <text x="${width / 2}" y="140" class="diagram__loop-label">feedback loop: evaluations and failed runs feed the next iteration</text>
      </svg>
      ${
        caption
          ? `<figcaption class="diagram__caption">${escapeHtml(caption)}</figcaption>`
          : ''
      }
    </figure>`;
}

/**
 * @param {string} text
 * @param {number} x
 * @param {number} y
 * @param {number} maxChars
 * @returns {string}
 */
function wrapSvgText(text, x, y, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > maxChars) {
      lines.push(line.trim());
      line = word;
    } else {
      line = `${line} ${word}`;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines
    .slice(0, 3)
    .map(
      (content, i) =>
        `<text x="${x}" y="${y + i * 13}" class="diagram__body">${escapeHtml(content)}</text>`,
    )
    .join('');
}

/**
 * Qualification form. It deliberately posts nowhere: the visitor reviews the
 * generated brief in WhatsApp and sends it there, so no third-party form
 * processor and no stored personal data are required.
 * @param {{heading?: string, intro?: string}} [options]
 */
export function briefForm({ heading, intro } = {}) {
  return `<form class="brief-form" data-brief-form data-wa-number="${escapeAttr(SITE.whatsapp.e164)}" novalidate>
      <div class="brief-form__head">
        <h2 class="brief-form__title">${escapeHtml(heading ?? 'Send a project brief')}</h2>
        <p class="brief-form__intro">${escapeHtml(
          intro ??
            'Fill this in and the button opens WhatsApp with the brief already written out. Nothing is submitted to a server from this page.',
        )}</p>
      </div>
      <div class="brief-form__grid">
        <label class="field">
          <span class="field__label">Name</span>
          <input class="field__input" type="text" name="name" autocomplete="name" required>
        </label>
        <label class="field">
          <span class="field__label">Company <span class="field__hint">optional</span></span>
          <input class="field__input" type="text" name="company" autocomplete="organization">
        </label>
        <label class="field">
          <span class="field__label">Email</span>
          <input class="field__input" type="email" name="email" autocomplete="email" required>
        </label>
        <label class="field">
          <span class="field__label">Timeline</span>
          <select class="field__input" name="timeline">
            <option value="This month">This month</option>
            <option value="Next 4-6 weeks">Next 4-6 weeks</option>
            <option value="Next quarter">Next quarter</option>
            <option value="Just exploring">Just exploring</option>
          </select>
        </label>
        <label class="field">
          <span class="field__label">Budget band <span class="field__hint">optional</span></span>
          <select class="field__input" name="budget">
            <option value="Not decided">Not decided</option>
            <option value="Under $1k">Under $1k</option>
            <option value="$1k - $3k">$1k - $3k</option>
            <option value="$3k - $8k">$3k - $8k</option>
            <option value="$8k+">$8k+</option>
          </select>
        </label>
        <label class="field field--wide">
          <span class="field__label">What should the automation do?</span>
          <textarea class="field__input" name="brief" rows="4" required placeholder="Example: new leads in a Facebook form should be enriched, scored and routed to the right closer within two minutes."></textarea>
        </label>
      </div>
      <div class="brief-form__actions">
        <button class="btn btn--primary btn--lg" type="submit">
          <span aria-hidden="true">💬</span> Open WhatsApp with this brief
        </button>
        <p class="brief-form__note">Prefer plain chat? Use the WhatsApp button in the header.</p>
      </div>
      <p class="brief-form__status" data-brief-status role="status" hidden></p>
    </form>`;
}

/**
 * Honest capability statement block: what is proven, and how.
 * @param {{proven: string[], unproven: string[]}} groups
 */
export function evidencePanels(groups) {
  const panel = (title, items, tone) => `<div class="evidence evidence--${tone}">
        <h3 class="evidence__title">${escapeHtml(title)}</h3>
        <ul class="evidence__list">${items
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join('')}</ul>
      </div>`;
  return `<div class="evidence-grid">
        ${panel('Verified today', groups.proven, 'proven')}
        ${panel('Not claimed', groups.unproven, 'open')}
      </div>`;
}
