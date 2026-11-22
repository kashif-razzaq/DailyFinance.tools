import { BadgeCheck } from "lucide-react"
import { CONTENT_REVIEWED_DISPLAY } from "@/lib/schema"

/**
 * One-line formula-verification stamp, shown under the reviewer badge in
 * the ToolLayout header on every tool page. The date derives from
 * CONTENT_REVIEWED in src/lib/schema.ts — the same source as the
 * /methodology audit stamp — so the next review round updates every stamp
 * by changing one date.
 *
 * Complements, not duplicates, the "How this calculator was checked" note
 * at the bottom of ToolLayout: that note explains the review process; this
 * is the at-a-glance badge a reader (or an AdSense reviewer) sees first.
 */
export function VerifiedLine() {
  return (
    <p className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
      <BadgeCheck className="h-4 w-4 shrink-0 text-[#064E3B] dark:text-emerald-400" aria-hidden="true" />
      <span>
        <strong className="font-semibold text-foreground">Formula verified</strong> · Last reviewed:{" "}
        {CONTENT_REVIEWED_DISPLAY}
      </span>
    </p>
  )
}
