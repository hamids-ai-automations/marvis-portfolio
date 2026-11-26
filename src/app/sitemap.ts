import type { MetadataRoute } from "next";

import { ARTICLES } from "@/data/articles";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, changeFrequency: "weekly", priority: 1, lastModified: now },
    { url: `${SITE.url}/services/`, changeFrequency: "monthly", priority: 0.9, lastModified: now },
    { url: `${SITE.url}/projects/`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE.url}/articles/`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE.url}/about/`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${SITE.url}/contact/`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${SITE.url}/privacy/`, changeFrequency: "yearly", priority: 0.2, lastModified: now },
    { url: `${SITE.url}/terms/`, changeFrequency: "yearly", priority: 0.2, lastModified: now },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE.url}/services/${service.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE.url}/projects/${project.slug}/`,
    lastModified: new Date(`${project.updated}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${SITE.url}/articles/${article.slug}/`,
    lastModified: new Date(`${article.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...projectPages, ...articlePages];
}
