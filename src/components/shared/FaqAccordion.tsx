import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FaqItem {
  question: string
  answer: string
}

/**
 * The one FAQ accordion used across the whole site — tool pages, guides,
 * hubs, state/city pages, sidebars and pricing — so the design (and the
 * chevron affordance) is identical everywhere. Native <details> keeps it
 * server-rendered and JS-free; the chevron sits in a filled circular chip
 * so it is clearly visible in light and dark mode, and the chip rotates
 * when the item is open.
 *
 * Variants:
 * - default: rows inside a bordered card (main content columns)
 * - bare:    divided rows with no card (for use inside an existing panel)
 * - compact: smaller rows for sidebars (the parent provides the card)
 */
export function FaqAccordion({
  items,
  variant = "default",
  className,
}: {
  items: FaqItem[]
  variant?: "default" | "bare" | "compact"
  className?: string
}) {
  if (!items.length) return null
  const compact = variant === "compact"
  return (
    <div
      className={cn(
        "divide-y divide-border/60",
        variant === "default" && "rounded-3xl border border-border/60 bg-card px-6",
        className,
      )}
    >
      {items.map((f) => (
        <details key={f.question} className={cn("group", compact ? "py-3.5 first:pt-1 last:pb-0" : "py-5 first:pt-6 last:pb-6")}>
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-3 font-semibold text-foreground [&::-webkit-details-marker]:hidden",
              compact ? "text-sm" : "text-base",
            )}
          >
            <span>{f.question}</span>
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200 group-open:rotate-180",
                compact ? "h-6 w-6" : "h-7 w-7",
              )}
            >
              <ChevronDown className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={2.5} />
            </span>
          </summary>
          <p className={cn("leading-relaxed text-muted-foreground", compact ? "mt-2 text-sm" : "mt-3")}>{f.answer}</p>
        </details>
      ))}
    </div>
  )
}
