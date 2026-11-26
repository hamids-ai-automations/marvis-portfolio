import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  label?: string;
  message?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

export function WhatsAppButton({
  label = "Message on WhatsApp",
  message,
  size = "default",
  variant = "default",
  className,
}: WhatsAppButtonProps) {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn(
        "gap-2 rounded-full font-medium",
        variant === "default" &&
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        variant === "outline" && "border-primary/40 text-primary hover:bg-primary/5",
        className
      )}
    >
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (opens WhatsApp)`}
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}

interface CTASectionProps {
  eyebrow?: string;
  heading: string;
  body: string;
  primaryLabel?: string;
  primaryMessage?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  note?: string;
}

/** Full-width conversion section used at the bottom of landing pages. */
export function CTASection({
  eyebrow = "Contact",
  heading,
  body,
  primaryLabel,
  primaryMessage,
  secondaryHref = "/projects/",
  secondaryLabel = "See the work",
  note,
}: CTASectionProps) {
  return (
    <section className="border-t border-border/60 bg-muted/30 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppButton
            label={primaryLabel}
            message={primaryMessage}
            size="lg"
          />
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href={secondaryHref}>
              {secondaryLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          {note ?? SITE.replyNote}
        </p>
      </div>
    </section>
  );
}
