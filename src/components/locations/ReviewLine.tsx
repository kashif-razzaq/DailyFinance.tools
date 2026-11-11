import Link from "next/link"

/**
 * The standard review line for location content (standards: named reviewer
 * + review date visible on every YMYL page). Tool pages carry the full
 * author card in ToolLayout and guides carry their own reviewed-by line;
 * this gives the 200+ location pages the same trust furniture.
 */
export function ReviewLine({ compact = false, scope = "location" }: { compact?: boolean; scope?: "location" | "general" }) {
  return (
    <p className={`${compact ? "mt-5 border-t border-border/40 pt-4" : "mt-10"} text-xs leading-relaxed text-muted-foreground`}>
      Reviewed by <strong className="font-semibold text-foreground">Tahir Shehzad, ACMA</strong> ·{" "}
      {scope === "location" ? "State tax data reviewed November 2026 against official sources" : "Content reviewed November 2026 against primary sources"} — see our{" "}
      <Link href="/methodology" className="font-semibold text-primary hover:underline">Methodology</Link> and{" "}
      <Link href="/editorial-policy" className="font-semibold text-primary hover:underline">Editorial Policy</Link>.
      Figures are educational estimates, not tax or financial advice.
    </p>
  )
}
