import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Muhammad Hamid",
  description:
    "The requested page does not exist on marvis.web.app. Return to the homepage or explore AI automation services and projects.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative mx-auto w-full max-w-2xl px-4 py-20 text-center sm:px-6">
        <p className="font-mono text-sm text-primary">404 — page not found</p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          This URL does not exist — and it says so honestly.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The link is broken, retired, or mistyped. Nothing redirected you
          somewhere vague, because that wastes your time.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="rounded-full">
            <Link href="/">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/sitemap.xml">
              <Compass className="size-4" aria-hidden="true" />
              Check the sitemap
            </Link>
          </Button>
        </div>
        <div className="mt-10 border-t border-border/70 pt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Popular destinations
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
