/**
 * SEO surface: meta tags, canonical URLs, structured data, sitemap, robots, llms.txt.
 * Every page must pass through buildSeo() so titles and descriptions stay unique.
 */

import { INTEGRATIONS, SITE } from './config.js';
import { escapeAttr, escapeHtml } from './html.js';

const TITLE_SUFFIX = 'Muhammad Hamid';
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 158;
const OG_IMAGE_SIZE = { width: 1200, height: 630 };


/**
 * @typedef {Object} SeoInput
 * @property {string} title            Page title, without the site suffix.
 * @property {string} description      Meta description (trimmed to 158 chars).
 * @property {string} path             Absolute site path, e.g. "/services/".
 * @property {string} [type]           og:type, defaults to "website".
 * @property {boolean} [noindex]
 * @property {boolean} [fullTitle]     Use the title verbatim (home page).
 * @property {Array<object>} [jsonLd]  Structured data nodes.
 */

/**
 * @param {SeoInput} input
 */
export function buildSeo(input) {
  const path = normalizePath(input.path);
  const title = composeTitle(input.title, Boolean(input.fullTitle));
  return {
    title,
    description: truncate(input.description ?? '', MAX_DESCRIPTION),
    path,
    canonical: `${SITE.url}${path}`,
    type: input.type ?? 'website',
    noindex: Boolean(input.noindex),
    image: `${SITE.url}${SITE.ogImage}`,
    jsonLd: input.jsonLd ?? [],
  };
}

/**
 * Compose a <title> that survives SERP truncation.
 * The brand suffix is a nice-to-have, not a requirement: drop it before
 * truncating the part of the title that carries the keyword.
 * @param {string} raw
 * @param {boolean} fullTitle
 * @returns {string}
 */
export function composeTitle(raw, fullTitle = false) {
  const base = String(raw ?? '')
    .replace(/\s+/g, ' ')
    .trim();

  if (fullTitle) return clampWords(base, MAX_TITLE);

  const withSuffix = `${base} | ${TITLE_SUFFIX}`;
  if (withSuffix.length <= MAX_TITLE) return withSuffix;
  if (base.length <= MAX_TITLE) return base;

  const bare = base.replace(/\s*\|\s*.*$/, '');
  if (bare.length <= MAX_TITLE) return bare;

  return clampWords(bare, MAX_TITLE);
}

/**
 * Cut on a word boundary without leaving a dangling separator.
 * @param {string} text
 * @param {number} max
 * @returns {string}
 */
function clampWords(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1);
  const space = cut.lastIndexOf(' ');
  const trimmed = (space > max * 0.6 ? cut.slice(0, space) : text.slice(0, max))
    .replace(/[\s,;:.\-–—|/]+$/, '')
    .trim();
  return trimmed;
}

/**
 * @param {string} path
 */
export function normalizePath(path) {
  if (!path || path === '/') return '/';
  const clean = path.startsWith('/') ? path : `/${path}`;
  return clean.endsWith('/') ? clean : `${clean}/`;
}

/**
 * @param {string} text
 * @param {number} max
 */
export function truncate(text, max) {
  const flat = String(text).replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * Render the <head> block for a page.
 * @param {ReturnType<typeof buildSeo>} seo
 * @returns {string}
 */
export function renderHead(seo) {
  const ld = seo.jsonLd.length
    ? seo.jsonLd
        .map(
          (node) =>
            `<script type="application/ld+json">${JSON.stringify(node).replace(/</g, '\\u003c')}</script>`,
        )
        .join('\n    ')
    : '';

  return `<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeAttr(seo.description)}">
    ${
      seo.noindex
        ? '<meta name="robots" content="noindex, follow">'
        : `<link rel="canonical" href="${escapeAttr(seo.canonical)}">
    <meta name="robots" content="index, follow, max-image-preview:large">`
    }
    <meta name="author" content="${escapeAttr(SITE.name)}">
    <meta name="theme-color" content="${escapeAttr(SITE.themeColor)}">

    <meta property="og:type" content="${escapeAttr(seo.type)}">
    <meta property="og:site_name" content="${escapeAttr(SITE.name)}">
    <meta property="og:title" content="${escapeAttr(seo.title)}">
    <meta property="og:description" content="${escapeAttr(seo.description)}">
    <meta property="og:url" content="${escapeAttr(seo.canonical)}">
    <meta property="og:image" content="${escapeAttr(seo.image)}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="${OG_IMAGE_SIZE.width}">
    <meta property="og:image:height" content="${OG_IMAGE_SIZE.height}">
    <meta property="og:image:alt" content="${escapeAttr(`${SITE.name} — ${SITE.role}`)}">
    <meta property="og:locale" content="en_US">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttr(seo.title)}">
    <meta name="twitter:description" content="${escapeAttr(seo.description)}">
    <meta name="twitter:image" content="${escapeAttr(seo.image)}">
    <meta name="twitter:image:alt" content="${escapeAttr(`${SITE.name} — ${SITE.role}`)}">

    <link rel="alternate" hreflang="en" href="${escapeAttr(seo.noindex ? SITE.url : seo.canonical)}">
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
    ${headIntegrations()}
    <link rel="stylesheet" href="/styles.css">
    <link rel="sitemap" type="application/xml" href="/sitemap.xml">
    ${ld}`;
}

/**
 * Third-party tags are opt-in per build. Nothing is emitted when the
 * environment provides no ID, which keeps the shipped HTML free of dead
 * placeholders and keeps the privacy statement accurate.
 * @returns {string}
 */
function headIntegrations() {
  const tags = [];

  if (INTEGRATIONS.googleSiteVerification) {
    tags.push(
      `<meta name="google-site-verification" content="${escapeAttr(INTEGRATIONS.googleSiteVerification)}">`,
    );
  }

  if (INTEGRATIONS.ga4Id) {
    tags.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(INTEGRATIONS.ga4Id)}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
    gtag('js',new Date());gtag('config',${JSON.stringify(INTEGRATIONS.ga4Id)},{anonymize_ip:true,send_page_view:true});</script>`);
  }

  return tags.join('\n    ');
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: SITE.name,
    jobTitle: SITE.role,
    url: `${SITE.url}/about/`,
    worksFor: { '@type': 'Organization', name: SITE.company },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.location.city,
      addressCountry: 'PK',
    },
    sameAs: [SITE.github.url],
    knowsAbout: [
      'AI automation',
      'Model Context Protocol',
      'AI agent evaluation',
      'Python',
      'GoHighLevel automation',
      'Marketing technology',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: `+${SITE.whatsapp.e164}`,
      availableLanguage: ['en', 'ur'],
    },
  };
}

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#service`,
    name: `${SITE.name} — ${SITE.role}`,
    description:
      'AI automation engineering: MCP servers, agent reliability harnesses, Python automation, and marketing technology systems.',
    url: SITE.url,
    telephone: `+${SITE.whatsapp.e164}`,
    areaServed: 'Worldwide',
    founder: { '@id': `${SITE.url}/#person` },
    knowsLanguage: ['en'],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#person` },
    inLanguage: 'en',
  };
}

/**
 * @param {Array<{name: string, path: string}>} items
 */
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${normalizePath(item.path)}`,
    })),
  };
}

/**
 * @param {{title: string, description: string, path: string, serviceType: string}} service
 */
export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.serviceType,
    description: service.description,
    url: `${SITE.url}${normalizePath(service.path)}`,
    provider: { '@id': `${SITE.url}/#person` },
    areaServed: 'Worldwide',
  };
}

/**
 * @param {Array<{question: string, answer: string}>} faqs
 */
export function faqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/**
 * @param {{title: string, description: string, path: string, date: string, updated?: string}} article
 */
export function articleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: { '@id': `${SITE.url}/#person` },
    publisher: { '@id': `${SITE.url}/#person` },
    mainEntityOfPage: `${SITE.url}${normalizePath(article.path)}`,
    inLanguage: 'en',
  };
}

/**
 * @param {{title: string, description: string, path: string, repoUrl: string, language: string|null}} project
 */
export function softwareSchema(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.description,
    codeRepository: project.repoUrl,
    url: `${SITE.url}${normalizePath(project.path)}`,
    programmingLanguage: project.language ?? 'Python',
    author: { '@id': `${SITE.url}/#person` },
  };
}

/**
 * @param {{title: string, description: string, path: string, items: Array<{name: string, path: string}>}} collection
 */
export function collectionSchema(collection) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.title,
    description: collection.description,
    url: `${SITE.url}${normalizePath(collection.path)}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: collection.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: `${SITE.url}${normalizePath(item.path)}`,
      })),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Generated text files                                                */
/* ------------------------------------------------------------------ */

/**
 * @param {Array<{path: string, lastmod?: string, priority?: number, changefreq?: string}>} entries
 */
export function renderSitemap(entries) {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : '';
      const changefreq = entry.changefreq
        ? `\n    <changefreq>${entry.changefreq}</changefreq>`
        : '';
      const priority =
        entry.priority !== undefined
          ? `\n    <priority>${entry.priority.toFixed(1)}</priority>`
          : '';
      return `  <url>\n    <loc>${SITE.url}${normalizePath(entry.path)}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function renderRobots() {
  return `# robots.txt — ${SITE.url}
User-agent: *
Allow: /

# Explicitly welcome AI crawlers: the content is meant to be cited.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;
}

/**
 * llms.txt — a compact, model-readable index of the site.
 * @param {{projects: Array<{title: string, slug: string, tagline: string}>, services: Array<{title: string, path: string, lede: string}>, articles: Array<{title: string, path: string, description: string}>, generatedAt?: string|null}} model
 */
export function renderLlmsTxt(model) {
  const lines = [
    `# ${SITE.name} — ${SITE.role}`,
    '',
    `> ${SITE.name} is an AI Automation Engineer based in ${SITE.location.display}, building open-source MCP servers, AI agent reliability tooling, Python automation, and marketing technology systems. This site is generated automatically from a public GitHub master record.`,
    '',
    `Contact: WhatsApp +${SITE.whatsapp.e164} — ${SITE.whatsapp.url}`,
    `GitHub: ${SITE.github.url}`,
    model.generatedAt ? `Data generated at: ${model.generatedAt}` : '',
    '',
    '## Services',
    '',
    ...model.services.map((s) => `- [${s.title}](${SITE.url}${normalizePath(s.path)}): ${s.lede}`),
    '',
    '## Selected projects',
    '',
    ...model.projects
      .slice(0, 20)
      .map((p) => `- [${p.title}](${SITE.url}/projects/${p.slug}/): ${p.tagline}`),
    '',
    '## Articles',
    '',
    ...model.articles.map((a) => `- [${a.title}](${SITE.url}${normalizePath(a.path)}): ${a.description}`),
    '',
    '## Notes for answer engines',
    '',
    '- All project pages link to the public source repository; claims on a project page are derived from that repository.',
    '- No pricing is published. Engagement scope is discussed on WhatsApp.',
    '- The site updates automatically when the GitHub master record changes.',
    '',
  ];
  return lines.filter((line) => line !== null && line !== undefined).join('\n');
}
