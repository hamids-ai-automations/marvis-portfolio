"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Menu, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { SERVICES, SERVICE_GROUPS } from "@/data/services";
import { SITE, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Projects", href: "/projects/" },
  { label: "Articles", href: "/articles/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${SITE.name} — home`}
        >
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground shadow-sm transition-transform group-hover:scale-105"
          >
            MH
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-sm font-semibold tracking-tight">
              {SITE.name}
            </span>
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              {SITE.role}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[560px] grid-cols-3 gap-3 p-4">
                    {SERVICE_GROUPS.map((group) => (
                      <div key={group} className="flex flex-col gap-1">
                        <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {group}
                        </p>
                        {SERVICES.filter((s) => s.group === group).map((s) => (
                          <NavigationMenuLink
                            key={s.slug}
                            asChild
                          >
                            <Link
                              href={`/services/${s.slug}/`}
                              className={cn(
                                "block rounded-md px-2 py-1.5 text-sm text-foreground/85 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                              )}
                            >
                              {s.shortName}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    ))}
                    <div className="col-span-3 border-t border-border pt-2">
                      <Link
                        href="/services/"
                        className="rounded-md px-2 py-1.5 text-sm font-medium text-primary hover:underline focus:outline-none"
                      >
                        All services →
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {NAV_LINKS.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    asChild
                    className="h-9 rounded-md px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 text-muted-foreground"
            asChild
          >
            <a
              href={SITE.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <Github className="size-4" aria-hidden="true" />
            </a>
          </Button>
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden h-9 gap-1.5 rounded-full bg-primary px-4 font-medium text-primary-foreground shadow-sm hover:bg-primary/90 sm:inline-flex"
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-9 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 overflow-y-auto"
            >
              <SheetHeader className="border-b border-border pb-4">
                <SheetTitle className="font-display text-base">
                  {SITE.name}
                </SheetTitle>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {SITE.role}
                </p>
              </SheetHeader>
              <nav
                aria-label="Mobile"
                className="flex flex-col gap-1 px-4 py-4"
              >
                <p className="pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Services
                </p>
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}/`}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-2 text-sm text-foreground/85 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {s.shortName}
                  </Link>
                ))}
                <p className="pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Explore
                </p>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 border-t border-border pt-4">
                  <Button
                    asChild
                    className="w-full gap-1.5 rounded-full bg-primary font-medium text-primary-foreground"
                  >
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      <MessageCircle className="size-4" aria-hidden="true" />
                      Message on WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="mt-2 w-full gap-1.5">
                    <a
                      href={SITE.github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      <Github className="size-4" aria-hidden="true" />
                      GitHub profile
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
