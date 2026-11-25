/**
 * Project index and detail pages.
 * Only curated projects get detail pages; the rest link to their repository.
 */

import { PRIMARY_CTA, SITE, waLink } from '../lib/config.js';
import { escapeAttr, escapeHtml, formatDate, isoDate } from '../lib/html.js';
import { BASE_SCRIPT, renderPage } from '../lib/layout.js';
import { groupByCategory } from '../lib/model.js';
import { buildProjects } from '../lib/normalize.js';
import {
  breadcrumbSchema,
  buildSeo,
  collectionSchema,
  normalizePath,
  softwareSchema,
} from '../lib/seo.js';
import {
  breadcrumbs,
  button,
  ctaBand,
  featureGrid,
  metaList,
  pageHeader,
  pillList,
  projectCard,
  sectionHeader,
} from '../templates/components.js';

/**
 * @param {ReturnType<import('../lib/model.js').buildSiteModel>} model
 */
export function renderProjectsIndex(model) {
  const groups = groupByCategory(model.projects);
  const curated = model.detailProjects;

  const seo = buildSeo({
    title: 'Projects — open-source AI automation and MCP servers',
    description:
      'Public repositories behind the work: MCP servers for Shopify, ServiceNow and Google services, Gemini agent reliability tooling, GoHighLevel automation, and marketing analytics.',
    path: '/projects/',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects/' },
      ]),
      collectionSchema({
        title: 'Projects',
        description: 'Open-source AI automation, MCP servers, and tooling.',
        path: '/projects/',
        items: curated.map((p) => ({ name: p.title, path: `/projects/${p.slug}/` })),
      }),
    ],
  });

  const body = `${breadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects/' },
  ])}
    ${pageHeader({
      eyebrow: 'Projects',
      heading: 'Everything here is public',
      lede: `${model.stats.projects} repositories outside forks, ${model.stats.languages || model.techStack.length} languages. The curated set below has a written breakdown; the full index links straight to GitHub.`,
      actions: `${button(SITE.github.url, 'GitHub profile', { variant: 'ghost', external: true })}${button(PRIMARY_CTA.href, 'Discuss a build', { external: true })}`,
    })}

    <section class="section">
      <div class="shell">
        ${sectionHeader({ eyebrow: 'Curated', heading: 'Projects with a written breakdown', body: 'Each page covers the problem, the approach, and what the code actually does.' })}
        <div class="grid grid--3">
          ${curated.map((p) => projectCard(p)).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="shell">
        ${sectionHeader({ eyebrow: 'Full index', heading: 'All public repositories', body: 'Grouped by discipline. Entries without a detail page link directly to the source.' })}
        <div class="table-wrap">
          <table class="repo-table">
            <thead>
              <tr><th scope="col">Repository</th><th scope="col">Description</th><th scope="col">Language</th><th scope="col">Updated</th></tr>
            </thead>
            <tbody>
              ${model.projects
                .map(
                  (p) => `<tr>
                <td><a href="${escapeAttr(p.hasDetail ? `/projects/${p.slug}/` : p.repoUrl)}"${
                  p.hasDetail ? '' : ' target="_blank" rel="noopener"'
                }>${escapeHtml(p.title)}</a></td>
                <td class="repo-table__desc">${escapeHtml(truncate(p.tagline, 110))}</td>
                <td>${escapeHtml(p.language ?? '—')}</td>
                <td><time datetime="${escapeAttr(isoDate(p.pushedAt))}">${escapeHtml(formatDate(p.pushedAt) || '—')}</time></td>
              </tr>`,
                )
                .join('\n              ')}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        ${sectionHeader({ eyebrow: 'Disciplines', heading: 'Where the work concentrates' })}
        ${pillList(
          groups.map((g) => `${g.label} (${g.items.length})`),
          'pill-list pill-list--wide',
        )}
      </div>
    </section>

    ${ctaBand({
      heading: 'Want something similar for your system?',
      body: 'The same patterns — typed tool surfaces, honest pagination, evaluation harnesses — apply to most business systems.',
      message: 'Hi Muhammad, I saw your projects and want to discuss something similar.',
    })}`;

  return {
    path: '/projects/',
    seo,
    html: renderPage({ seo, body, pageClass: 'page-projects', activePath: '/projects/', scripts: BASE_SCRIPT }),
    priority: 0.9,
    changefreq: 'weekly',
  };
}

/**
 * @param {object} project
 * @param {ReturnType<import('../lib/model.js').buildSiteModel>} model
 */
export function renderProjectDetail(project, model) {
  const path = `/projects/${project.slug}/`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects/' },
    { name: project.title, path },
  ];

  const seo = buildSeo({
    title: `${project.title} — ${project.serviceTitle ?? 'open-source project'}`,
    description: project.summary ?? project.tagline,
    path,
    type: 'article',
    jsonLd: [
      breadcrumbSchema(crumbs),
      softwareSchema({
        title: project.title,
        description: project.summary ?? project.tagline,
        path,
        repoUrl: project.repoUrl,
        language: project.language,
      }),
    ],
  });

  const service = model.services.find((s) => s.slug === project.service);
  const related = model.projects
    .filter((p) => p.slug !== project.slug && p.category === project.category && p.hasDetail)
    .slice(0, 3);

  const meta = metaList([
    ['Repository', `<a href="${escapeAttr(project.repoUrl)}" target="_blank" rel="noopener">${escapeHtml(repoLabel(project.repoUrl))}</a>`],
    ['Language', project.language ? escapeHtml(project.language) : ''],
    ['Discipline', escapeHtml(project.categoryLabel)],
    ['Last updated', project.pushedAt ? `<time datetime="${escapeAttr(isoDate(project.pushedAt))}">${escapeHtml(formatDate(project.pushedAt))}</time>` : ''],
    ['Live demo', project.demoUrl ? `<a href="${escapeAttr(project.demoUrl)}" target="_blank" rel="noopener">Open</a>` : ''],
    ['Related service', service ? `<a href="${escapeAttr(service.path)}">${escapeHtml(service.nav)}</a>` : ''],
  ]);

  const body = `${breadcrumbs(crumbs)}
    <article class="project">
      ${pageHeader({
        eyebrow: project.categoryLabel,
        heading: escapeHtml(project.title),
        lede: project.summary ?? project.tagline,
        actions: `${button(project.repoUrl, 'View source', { external: true })}${
          service ? button(service.path, service.nav, { variant: 'ghost' }) : ''
        }`,
        meta,
      })}

      ${
        project.problem
          ? `<section class="section">
        <div class="shell prose-block">
          ${sectionHeader({ eyebrow: 'The problem', heading: 'Why this exists' })}
          <p>${escapeHtml(project.problem)}</p>
        </div>
      </section>`
          : ''
      }

      ${
        project.approach?.length
          ? `<section class="section section--alt">
        <div class="shell">
          ${sectionHeader({ eyebrow: 'Approach', heading: 'How it is built' })}
          <ol class="approach">${project.approach
            .map(
              (step) => `<li><p>${escapeHtml(step)}</p></li>`,
            )
            .join('')}</ol>
        </div>
      </section>`
          : ''
      }

      ${
        project.capabilities?.length
          ? `<section class="section">
        <div class="shell">
          ${sectionHeader({ eyebrow: 'Capabilities', heading: 'What it does' })}
          ${featureGrid(
            project.capabilities.map((c, i) => ({ title: `0${i + 1}`, body: c })),
            'feature-grid feature-grid--2 feature-grid--plain',
          )}
        </div>
      </section>`
          : ''
      }

      ${
        project.summary && !project.problem
          ? `<section class="section"><div class="shell prose-block"><p>${escapeHtml(project.summary)}</p></div></section>`
          : ''
      }

      <section class="section section--alt">
        <div class="shell">
          ${sectionHeader({ eyebrow: 'Stack', heading: 'Technologies' })}
          ${pillList(
            Array.from(new Set([project.language, ...(project.topics ?? [])].filter(Boolean))).slice(0, 12),
          )}
        </div>
      </section>

      ${
        related.length
          ? `<section class="section">
        <div class="shell">
          <div class="section-head-row">
            ${sectionHeader({ eyebrow: 'Related', heading: 'Similar projects' })}
            <a class="text-link" href="/projects/">All projects →</a>
          </div>
          <div class="grid grid--3">
            ${related.map((p) => projectCard(p)).join('\n            ')}
          </div>
        </div>
      </section>`
          : ''
      }

      ${ctaBand({
        heading: 'Need this pattern in your own stack?',
        body: 'Most of these start as one narrow tool surface. Describe the system and the job it needs to do.',
        message: `Hi Muhammad, I saw ${project.title} and want to discuss a similar build.`,
      })}
    </article>`;

  return {
    path,
    seo,
    html: renderPage({ seo, body, pageClass: 'page-project', activePath: '/projects/', scripts: BASE_SCRIPT }),
    priority: 0.7,
    changefreq: 'monthly',
  };
}

/**
 * @param {string} url
 */
function repoLabel(url) {
  const match = String(url ?? '').match(/github\.com\/([^/]+)\/([^/?#]+)/i);
  return match ? `${match[1]}/${match[2]}` : url;
}

/**
 * @param {string} text
 * @param {number} max
 */
function truncate(text, max) {
  const flat = String(text ?? '').replace(/\s+/g, ' ').trim();
  return flat.length <= max ? flat : `${flat.slice(0, max - 1).trimEnd()}…`;
}
