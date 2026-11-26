import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

/** Renders article markdown with site typography and internal Link routing. */
export function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-none text-base leading-relaxed text-foreground/90",
        "[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight sm:[&_h2]:text-[1.7rem]",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight",
        "[&_p]:mb-4 [&_p]:text-foreground/80",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_a]:font-medium [&_a]:text-primary [&_a]:underline decoration-primary/40 underline-offset-4 hover:[&_a]:decoration-primary",
        "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6",
        "[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_li]:mb-2 [&_li]:text-foreground/80",
        "[&_li>p]:mb-0",
        "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-primary-foreground dark:[&_code]:text-primary-foreground/90",
        "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/70 [&_pre]:p-4 sm:[&_pre]:p-5",
        "[&_pre_code]:bg-transparent [&_pre_code]:px-0 [&_pre_code]:py-0 [&_pre_code]:text-sm [&_pre_code]:leading-relaxed [&_pre_code]:text-foreground/90",
        "[&_hr]:my-10 [&_hr]:border-border/70",
        "[&_table]:my-6 [&_table]:w-full [&_table]:text-sm",
        "[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold",
        "[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2",
        "[&_img]:my-6 [&_img]:rounded-xl [&_img]:border [&_img]:border-border",
        className
      )}
    >
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            const external = href?.startsWith("http");
            if (external) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              );
            }
            return <Link href={href ?? "/"}>{children}</Link>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
