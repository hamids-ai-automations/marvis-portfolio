import Link from "next/link";
import { Github, MessageCircle } from "lucide-react";

import { SERVICES } from "@/data/services";
import { SITE, whatsappLink } from "@/lib/site";

const EXPLORE_LINKS = [
  { label: "Projects", href: "/projects/" },
  { label: "Articles", href: "/articles/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/70 bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Home">
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground"
            >
              MH
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-sm font-semibold">
                {SITE.name}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                {SITE.role}
              </span>
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            MCP servers, evaluated AI agents and Python automation that runs
            against production business systems.
          </p>
          <p className="text-xs text-muted-foreground">{SITE.location}</p>
        </div>

        <nav aria-label="Footer services">
          <p className="pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Services
          </p>
          <ul className="flex flex-col gap-1.5">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="text-sm text-foreground/75 transition-colors hover:text-primary"
                >
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer explore">
          <p className="pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Explore
          </p>
          <ul className="flex flex-col gap-1.5">
            {EXPLORE_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-foreground/75 transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/sitemap.xml"
                className="text-sm text-foreground/75 transition-colors hover:text-primary"
              >
                Sitemap
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Contact
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {SITE.whatsapp.display}
          </a>
          <p className="text-xs text-muted-foreground">{SITE.replyNote}</p>
          <a
            href={SITE.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm text-foreground/75 transition-colors hover:text-primary"
          >
            <Github className="size-4" aria-hidden="true" />
            {SITE.github.user}
          </a>
          <p className="text-xs text-muted-foreground">
            {SITE.github.publicRepos} public repositories
          </p>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>
            Marvis Portfolio · Static export · Deployed on Firebase Hosting
          </p>
        </div>
      </div>
    </footer>
  );
}
