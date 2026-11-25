/**
 * Site model: merges the GitHub master record with curated copy and
 * resolves the relationships between projects, services, and articles.
 */

import { buildProjects, buildStats, buildTechStack } from './normalize.js';
import { getOverride, PROJECT_OVERRIDES } from '../content/project-overrides.js';
import { SERVICES } from '../content/services.js';
import { ARTICLES } from '../content/articles.js';

/**
 * Projects with detail pages. Anything not curated stays on the index and
 * links out to GitHub — thin auto-generated pages help nobody.
 */
export function buildSiteModel(db) {
  const raw = buildProjects(db);
  const stats = buildStats(db, raw);

  const projects = raw.map((project) => enrichProject(project));
  const detailProjects = projects.filter((p) => p.hasDetail);

  const serviceSlugs = new Set(SERVICES.map((s) => s.slug));
  const services = SERVICES.map((service) => ({
    ...service,
    projects: (service.proofSlugs ?? [])
      .map((slug) => projects.find((p) => p.slug === slug))
      .filter(Boolean),
  }));

  const articles = ARTICLES.map((article) => ({
    ...article,
    relatedProjectData: article.relatedProject
      ? projects.find((p) => p.slug === article.relatedProject) ?? null
      : null,
    relatedServiceData: article.relatedService
      ? SERVICES.find((s) => s.slug === article.relatedService) ?? null
      : null,
  }));

  return {
    projects,
    detailProjects,
    featuredProjects: orderFeatured(projects),
    services,
    articles,
    stats,
    techStack: buildTechStack(db, 12),
    serviceSlugs,
    generatedAt: stats.generatedAt,
    profile: db?.profile ?? {},
  };
}

/**
 * @param {object} project raw normalized project
 */
function enrichProject(project) {
  const override = getOverride(project.slug);
  const service = override?.service ?? null;
  return {
    ...project,
    tagline: override?.tagline ?? project.tagline,
    summary: override?.summary ?? project.summary,
    problem: override?.problem ?? null,
    approach: override?.approach ?? [],
    capabilities: override?.capabilities ?? [],
    service,
    serviceTitle: service ? SERVICES.find((s) => s.slug === service)?.nav ?? null : null,
    featured: override?.featured ?? project.featured,
    hasDetail: Boolean(override),
    language: override?.language ?? project.language,
  };
}

/**
 * Featured first, then most recently pushed.
 * @param {Array<object>} projects
 */
function orderFeatured(projects) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return [...featured, ...rest];
}

/**
 * Projects grouped by category label for the index page.
 * @param {Array<object>} projects
 */
export function groupByCategory(projects) {
  const groups = new Map();
  for (const project of projects) {
    const key = project.categoryLabel || 'Projects';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(project);
  }
  return [...groups.entries()]
    .map(([label, items]) => ({ label, items }))
    .sort((a, b) => b.items.length - a.items.length);
}

/** Curated project count, used for honest copy on the index page. */
export const CURATED_COUNT = Object.keys(PROJECT_OVERRIDES).length;
