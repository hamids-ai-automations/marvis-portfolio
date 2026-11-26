import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  eyebrow?: string;
  heading?: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  inner?: boolean;
}

/** Consistent page section: eyebrow, H2, lead paragraph, content. */
export function Section({
  eyebrow,
  heading,
  lead,
  children,
  className,
  inner = true,
  ...props
}: SectionProps) {
  return (
    <section className={cn("border-t border-border/60 py-14 sm:py-20", className)} {...props}>
      <div className={cn(inner && "mx-auto max-w-6xl px-4 sm:px-6")}>
        {(eyebrow || heading || lead) && (
          <div className="mb-8 max-w-3xl sm:mb-10">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {heading}
              </h2>
            )}
            {lead && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {lead}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
