import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { JsonLd, breadcrumbSchema } from "@/components/site/json-ld";
import type { BreadcrumbItem } from "@/lib/types";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground sm:text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight
                  className="size-3.5 text-muted-foreground/60"
                  aria-hidden="true"
                />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "font-medium text-foreground" : undefined}
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd
        data={breadcrumbSchema(
          items.map((item) => ({
            name: item.name,
            href: item.href ? `https://marvis.web.app${item.href}` : undefined,
          }))
        )}
      />
    </nav>
  );
}
