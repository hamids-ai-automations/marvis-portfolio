/**
 * Transforms the raw GitHub master record into the site's view model.
 *
 * Rules enforced here:
 *  - Forks never become portfolio projects.
 *  - The profile-README repository never becomes a project.
 *  - A repository with no description and no README is skipped.
 *  - Homepages that point back at this site are dropped (no circular demos).
 */

/** @typedef {'mcp'|'agents'|'marketing'|'ghl'|'python'|'web'|'data'} CategoryId */

export const CATEGORIES = [
  {
    id: 'mcp',
    label: 'MCP & Integrations',
    blurb: 'Model Context Protocol servers and tool surfaces that let agents act on real systems.',
  },
  {
    id: 'agents',
    label: 'AI Agent Engineering',
    blurb: 'Agent harnesses, evaluation suites, and reliability tooling for production LLM systems.',
  },
  {
    id: 'marketing',
    label: 'Marketing Technology',
    blurb: 'Measurement, SEO, and paid-media automation for teams that need provable numbers.',
  },
  {
    id: 'ghl',
    label: 'GoHighLevel Automation',
    blurb: 'Contract-first tooling for HighLevel CRM: observability, DevOps, and safe automation.',
  },
  {
    id: 'python',
    label: 'Python Tooling',
    blurb: 'Focused command-line utilities with testable, dependency-light internals.',
  },
  {
    id: 'web',
    label: 'Web & Product',
    blurb: 'Shipped web products, marketing sites, and browser extensions.',
  },
  {
    id: 'data',
    label: 'Data & Infrastructure',
    blurb: 'Metadata pipelines and the systems that keep this portfolio self-updating.',
  },
];

const REPO_EXCLUDE = new Set([
  'hamids-ai-automations', // profile README repository, not a project
]);

/** Values that would create a circular "demo" link back to this site. */
const SELF_HOSTS = new Set(['marvis.web.app', 'www.marvis.web.app']);

/** Known initialisms that must keep their casing when a slug becomes a title. */
const ACRONYMS = new Map([
  ['ai', 'AI'],
  ['mcp', 'MCP'],
  ['api', 'API'],
  ['seo', 'SEO'],
  ['ppc', 'PPC'],
  ['ghl', 'GHL'],
  ['crm', 'CRM'],
  ['ga4', 'GA4'],
  ['gbp', 'GBP'],
  ['geo', 'GEO'],
  ['sarif', 'SARIF'],
  ['cli', 'CLI'],
  ['ui', 'UI'],
  ['os', 'OS'],
  ['js', 'JS'],
  ['php', 'PHP'],
  ['capi', 'CAPI'],
  ['utm', 'UTM'],
  ['mmm', 'MMM'],
  ['llm', 'LLM'],
  ['llms', 'LLMs'],
  ['sdk', 'SDK'],
  ['pk', 'PK'],
]);

/**
 * @param {string} input
 * @returns {string} kebab-case slug
 */
export function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Convert a repository slug into a human title, preserving known acronyms.
 * @param {string} slug
 * @returns {string}
 */
export function titleize(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => ACRONYMS.get(word) ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Normalise a GitHub homepage value into a usable demo URL, or null.
 * @param {string|null|undefined} homepage
 * @returns {string|null}
 */
export function normalizeDemoUrl(homepage, repoUrl) {
  if (!homepage || typeof homepage !== 'string') return null;
  const trimmed = homepage.trim();
  if (!trimmed) return null;
  let url;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(url.protocol)) return null;
  if (SELF_HOSTS.has(url.hostname)) return null; // circular link to this portfolio
  // A homepage that just points back at the repository (or its owner page) is not a demo.
  if (repoUrl) {
    const stripTrailing = (value) => String(value).replace(/\/+$/, '').toLowerCase();
    const repo = stripTrailing(repoUrl);
    const candidate = stripTrailing(url.href);
    if (candidate === repo || candidate === `${repo}.git`) return null;
  }
  if (/^https?:\/\/(www\.)?github\.com\/[^/]+\/?$/i.test(url.href)) return null;
  return url.href;
}

/**
 * Assign a category from the repository name, topics, and language.
 * Deterministic: the first matching rule wins.
 * @param {object} repo
 * @returns {CategoryId}
 */
export function classifyRepo(repo) {
  const name = String(repo.name ?? '').toLowerCase();
  const topics = (repo.topics ?? []).map((t) => String(t).toLowerCase());
  const haystack = `${name} ${topics.join(' ')}`;

  if (/mcp/.test(name) || topics.includes('mcp')) return 'mcp';
  if (/highlevel|gohighlevel|^ghl-|leadflow/.test(name)) return 'ghl';
  if (/gemini-agent|agent-|ai-agent|-agent\b|testing-lab|reliability/.test(haystack)) return 'agents';
  if (
    /seo-|ppc-|geo-|conversion|whatsapp-|meta-lead|searchpulse|ecommerce-seo|visibilit|marketing/.test(
      name,
    )
  ) {
    return 'marketing';
  }
  if (/master-record|portfolio-meta|index|dataset/.test(name)) return 'data';
  if (/(\.web\.app|website|downloader|restock|starter-kit)/.test(haystack)) return 'web';
  if (['HTML', 'Astro', 'JavaScript', 'TypeScript', 'PHP'].includes(repo.language)) return 'web';
  return 'python';
}

/**
 * Extract verifiable numeric facts stated in the repository description,
 * e.g. "61 MCP tools" or "44 tools".
 * @param {object} repo
 * @returns {{ tools: number|null }}
 */
export function extractMetrics(repo) {
  const description = String(repo.description ?? '');
  const match = description.match(/(\d+)\s+(?:MCP\s+)?tools\b/i);
  return { tools: match ? Number.parseInt(match[1], 10) : null };
}

/**
 * Trim a README excerpt down to a short, single-paragraph summary.
 * @param {object|null|undefined} readme
 * @param {number} [maxChars]
 * @returns {string}
 */
export function readmeSummary(readme, maxChars = 260) {
  const excerpt = readme?.excerpt;
  if (!excerpt) return '';
  const body = excerpt
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/[*_`>|]/g, '')
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 60 && !/^badge|^table of contents/i.test(p));

  const text = body[0] ?? '';
  if (!text) return '';
  if (text.length <= maxChars) return text;
  const cut = text.slice(0, maxChars);
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('.'));
  return `${lastStop > 120 ? cut.slice(0, lastStop + 1) : cut.trimEnd()}.`;
}

/**
 * Slugs that receive hand-written copy from src/content/project-overrides.js.
 * Declared here so the generator knows which pages can be fully curated.
 */
export const CURATED_SLUGS = [
  'shopify-growth-mcp',
  'servicenow-ultimate-mcp',
  'google-services-mcp',
  'gemini-agent-reliability-kit',
  'gemini-agent-automation-toolkit',
  'ghl-automation-engine',
  'ghl-devops-toolkit',
  'leadflow-sentinel',
  'firebase-ai-starter-kit',
  'ai-agent-testing-lab',
];

/** Homepage ordering of featured work. */
export const FEATURED_ORDER = [
  'shopify-growth-mcp',
  'ghl-automation-engine',
  'gemini-agent-reliability-kit',
  'google-services-mcp',
  'servicenow-ultimate-mcp',
  'leadflow-sentinel',
];

/**
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} title
 * @property {string} tagline
 * @property {CategoryId} category
 * @property {string} categoryLabel
 * @property {string} repoUrl
 * @property {string|null} demoUrl
 * @property {string|null} language
 * @property {number} stars
 * @property {string[]} topics
 * @property {string|null} pushedAt
 * @property {string} summary
 * @property {boolean} featured
 */

/**
 * Build the ordered project list for the site.
 * @param {any} db
 * @returns {Project[]}
 */
export function buildProjects(db) {
  const repos = Array.isArray(db?.repositories) ? db.repositories : [];
  const projects = [];
  const seenSlugs = new Set();

  for (const repo of repos) {
    if (!repo || repo.fork || repo.archived) continue;
    if (REPO_EXCLUDE.has(repo.name)) continue;

    const slug = slugify(repo.name);
    if (!slug || seenSlugs.has(slug)) continue;

    const summary = readmeSummary(repo.readme);
    const description = (repo.description ?? '').trim();
    if (!description && !summary) continue;

    seenSlugs.add(slug);
    const category = classifyRepo(repo);
    const categoryMeta = CATEGORIES.find((c) => c.id === category);

    projects.push({
      slug,
      title: titleize(slug),
      tagline: description || summary,
      category,
      categoryLabel: categoryMeta?.label ?? 'Projects',
      repoUrl: repo.url ?? `${db?.profile?.profile_url ?? ''}/${repo.name}`,
      demoUrl: normalizeDemoUrl(repo.homepage, repo.url),
      language: repo.language ?? null,
      stars: Number(repo.stars ?? 0),
      topics: Array.isArray(repo.topics) ? repo.topics.slice(0, 8) : [],
      pushedAt: repo.pushed_at ?? repo.last_commit_at ?? null,
      summary,
      featured: FEATURED_ORDER.includes(slug),
    });
  }

  return projects.sort((a, b) => {
    const ai = FEATURED_ORDER.indexOf(a.slug);
    const bi = FEATURED_ORDER.indexOf(b.slug);
    if (ai !== -1 || bi !== -1) {
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }
    const aTime = a.pushedAt ? Date.parse(a.pushedAt) : 0;
    const bTime = b.pushedAt ? Date.parse(b.pushedAt) : 0;
    if (bTime !== aTime) return bTime - aTime;
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * Aggregate the headline numbers shown on the home page.
 * Every number is derived from the master record — nothing is hard-coded.
 * @param {any} db
 * @param {Project[]} projects
 */
export function buildStats(db, projects) {
  const summary = db?.contribution_summary ?? {};
  const totalTools = (db?.repositories ?? []).reduce((sum, repo) => {
    const { tools } = extractMetrics(repo);
    return tools && tools > 100 ? sum : sum + (tools ?? 0); // ignore implausible parses
  }, 0);

  return {
    projects: projects.length,
    repositoriesTracked: (db?.repositories ?? []).length,
    mergedPrs: Number(summary.pull_requests_merged ?? 0),
    contributionsLastYear: Number(summary.contributions_last_year ?? 0),
    commitsLastYear: Number(summary.commits_last_year ?? 0),
    mcpTools: totalTools,
    languages: new Set(projects.map((p) => p.language).filter(Boolean)).size,
    generatedAt: db?.metadata?.generated_at ?? null,
  };
}

/**
 * Top technologies, ignoring pure file-type languages.
 * @param {any} db
 * @param {number} [limit]
 */
export function buildTechStack(db, limit = 10) {
  const IGNORE = new Set(['HTML', 'CSS', 'Shell', 'Dockerfile', 'Procfile', 'Jupyter Notebook', 'Makefile']);
  const stack = Array.isArray(db?.technology_stack) ? db.technology_stack : [];
  return stack
    .filter((t) => t && t.name && !IGNORE.has(t.name))
    .slice(0, limit)
    .map((t) => ({
      name: t.name,
      category: t.category ?? 'language',
      percentage: Number(t.percentage ?? 0),
      repositoryCount: Number(t.repository_count ?? 0),
    }));
}
