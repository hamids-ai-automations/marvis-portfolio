import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, GitFork, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ServiceIcon } from "@/components/site/service-icon";
import type { Article, Project, Service } from "@/lib/types";
import { cn } from "@/lib/utils";

/* ------------------------------ Service card ------------------------------ */

export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "group relative h-full overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <CardHeader className="gap-0 px-5 pb-0">
        <div className="flex items-center justify-between">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ServiceIcon icon={service.icon} className="size-5" />
          </span>
          <ArrowUpRight
            className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
        <h3 className="pt-2 font-display text-lg font-semibold leading-snug tracking-tight">
          <Link
            href={`/services/${service.slug}/`}
            className="transition-colors hover:text-primary"
          >
            {service.name}
          </Link>
        </h3>
      </CardHeader>
      <CardContent className="px-5 pt-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {service.metaDescription.length > 150
            ? `${service.metaDescription.slice(0, 147)}…`
            : service.metaDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.technologies.slice(0, 3).map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="text-[11px] font-normal"
            >
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------ Project card ------------------------------ */

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "group h-full overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
        className
      )}
    >
      <CardHeader className="gap-0 px-5 pb-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-wider text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-primary/80"
                />
                {project.language}
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="size-3" aria-hidden="true" />
                {project.stars}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <GitFork className="size-3" aria-hidden="true" />
                open source
              </span>
            </p>
            <h3 className="truncate font-mono text-base font-semibold tracking-tight">
              <Link
                href={`/projects/${project.slug}/`}
                className="transition-colors hover:text-primary"
              >
                {project.name}
              </Link>
            </h3>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} repository on GitHub`}
            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
          >
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="px-5 pt-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.topics.slice(0, 4).map((topic) => (
            <Badge
              key={topic}
              variant="outline"
              className="text-[11px] font-normal text-muted-foreground"
            >
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------ Article card ------------------------------ */

export function ArticleCard({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "group h-full border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
        className
      )}
    >
      <CardHeader className="gap-0 px-5 pb-0">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <Badge
            variant="secondary"
            className="rounded-sm px-1.5 py-0 text-[10px] font-medium text-primary"
          >
            {article.tag}
          </Badge>
          <time dateTime={article.date}>
            {new Date(`${article.date}T00:00:00Z`).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" aria-hidden="true" />
            {article.readingMinutes} min
          </span>
        </p>
        <h3 className="pt-2 font-display text-lg font-semibold leading-snug tracking-tight">
          <Link
            href={`/articles/${article.slug}/`}
            className="transition-colors group-hover:text-primary"
          >
            {article.title}
          </Link>
        </h3>
      </CardHeader>
      <CardContent className="px-5 pt-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Read article
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </p>
      </CardContent>
    </Card>
  );
}
