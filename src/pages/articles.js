/**
 * Article index and detail pages. Bodies are Markdown from content/articles.js.
 */

import { PRIMARY_CTA, SITE, waLink } from '../lib/config.js';
import { escapeAttr, escapeHtml, formatDate, isoDate } from '../lib/html.js';
import { BASE_SCRIPT, renderPage } from '../lib/layout.js';
import { extractHeadings, readingTime, renderMarkdown } from '../lib/markdown.js';
import {
  articleSchema,
  breadcrumbSchema,
  buildSeo,
  collectionSchema,
  normalizePath,
} from '../lib/seo.js';
import {
  articleCard,
  breadcrumbs,
  button,
  ctaBand,
  pageHeader,
  sectionHeader,
} from '../templates/components.js';

/**
 * @param {ReturnType<import('../lib/model.js').buildSiteModel>} model
 */
export function renderArticlesIndex(model) {
  const seo = buildSeo({
    title: 'Articles — notes on MCP, agents, and measurement',
    description:
      'Technical write-ups from building MCP servers, evaluating AI agents, and fixing marketing measurement: the specific failure modes and the checks that catch them.',
    path: '/articles/',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Articles', path: '/articles/' },
      ]),
      collectionSchema({
        title: 'Articles',
        description: 'Technical notes on AI automation, MCP, and measurement.',
        path: '/articles/',
        items: model.articles.map((a) => ({ name: a.title, path: a.path })),
      }),
    ],
  });

  const body = `${breadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/articles/' },
  ])}
    ${pageHeader({
      eyebrow: 'Articles',
      heading: 'What breaks, and what to check',
      lede: 'Short technical pieces drawn from the repositories: the failure modes that do not show up in demos.',
      actions: `${button('/projects/', 'See the code', { variant: 'ghost' })}${button(PRIMARY_CTA.href, 'Discuss a build', { external: true })}`,
    })}

    <section class="section">
      <div class="shell">
        <div class="grid grid--2">
          ${model.articles.map((a) => articleCard(a)).join('\n          ')}
        </div>
      </div>
    </section>

    ${ctaBand({
      heading: 'Have a failure mode worth writing about?',
      body: 'If your automation is failing in an interesting way, I am usually willing to look at it.',
      message: 'Hi Muhammad, I read your articles and have a problem worth discussing.',
    })}`;

  return {
    path: '/articles/',
    seo,
    html: renderPage({ seo, body, pageClass: 'page-articles', activePath: '/articles/', scripts: BASE_SCRIPT }),
    priority: 0.8,
    changefreq: 'weekly',
  };
}

/**
 * @param {object} article
 */
export function renderArticleDetail(article) {
  const path = normalizePath(article.path);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/articles/' },
    { name: article.title, path },
  ];

  const seo = buildSeo({
    title: article.title,
    fullTitle: true,
    description: article.description,
    path,
    type: 'article',
    jsonLd: [
      breadcrumbSchema(crumbs),
      articleSchema({
        title: article.title,
        description: article.description,
        path,
        date: article.date,
        updated: article.updated,
      }),
    ],
  });

  const html = renderMarkdown(article.body);
  const headings = extractHeadings(article.body).filter((h) => Number(h.level) === 2);
  const minutes = readingTime(article.body);
  const project = article.relatedProjectData;
  const service = article.relatedServiceData;

  const toc = headings.length
    ? `<aside class="article-toc" aria-label="On this page">
        <p class="article-toc__title">On this page</p>
        <ol>${headings
          .map((h) => `<li><a href="#${escapeAttr(h.id)}">${escapeHtml(h.text)}</a></li>`)
          .join('')}</ol>
      </aside>`
    : '';

  const body = `${breadcrumbs(crumbs)}
    <article class="article">
      <header class="article__header">
        <div class="shell shell--narrow">
          <p class="eyebrow">${escapeHtml((article.tags ?? [])[0] ?? 'Article')}</p>
          <h1 class="article__title">${escapeHtml(article.title)}</h1>
          <p class="article__lede">${escapeHtml(article.description)}</p>
          <div class="article__byline">
            <span>Muhammad Hamid</span>
            <span aria-hidden="true">·</span>
            <time datetime="${escapeAttr(isoDate(article.date))}">${escapeHtml(formatDate(article.date))}</time>
            <span aria-hidden="true">·</span>
            <span>${minutes} min read</span>
          </div>
        </div>
      </header>

      <div class="shell shell--narrow article__layout">
        ${toc}
        <div class="prose">
          ${html}
        </div>
      </div>

      ${
        project || service
          ? `<section class="section section--alt">
        <div class="shell shell--narrow">
          ${sectionHeader({ eyebrow: 'Related', heading: 'See it in the code' })}
          <ul class="link-list">
            ${
              project
                ? `<li><a href="/projects/${escapeAttr(project.slug)}/">${escapeHtml(project.title)}</a><span>${escapeHtml(project.tagline)}</span></li>`
                : ''
            }
            ${
              service
                ? `<li><a href="${escapeAttr(service.path)}">${escapeHtml(service.nav)}</a><span>${escapeHtml(service.cardBody ?? service.lede)}</span></li>`
                : ''
            }
          </ul>
        </div>
      </section>`
          : ''
      }

      <section class="section">
        <div class="shell shell--narrow article__footer">
          <p class="muted">Written by Muhammad Hamid, AI Automation Engineer in ${escapeHtml(SITE.location.display)}.</p>
          <div class="hero__actions">
            ${button(waLink('Hi Muhammad, I read your article and want to discuss it.'), 'Message on WhatsApp', { external: true })}
            ${button('/articles/', 'More articles', { variant: 'ghost' })}
          </div>
        </div>
      </section>
    </article>`;

  return {
    path,
    seo,
    html: renderPage({ seo, body, pageClass: 'page-article', activePath: '/articles/', scripts: BASE_SCRIPT }),
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: isoDate(article.date),
  };
}
