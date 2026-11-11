import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { USState } from "@/data/locations/us-states"

/**
 * The one state card used on every state index (/locations, /guides/states).
 * Clean and airy: name + abbr pill, one capital line, a single three-stat
 * strip, and the CTA — no gradient bar, no icon tile, no stacked rows.
 */
export function StateCard({ state: s, href, cta }: { state: USState; href: string; cta: string }) {
  const incomeLabel = s.incomeTax === "none" ? "None" : s.incomeTax === "flat" ? "Flat" : "Progressive"
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-3xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-[#064E3B]/40 hover:shadow-lg"
    >
      <span className="flex items-start justify-between gap-3">
        <span className="min-w-0">
          <span className="block truncate text-lg font-extrabold tracking-tight text-foreground transition-colors group-hover:text-[#064E3B]">
            {s.name}
          </span>
          <span className="mt-0.5 block text-[13px] text-muted-foreground">Capital: {s.capital}</span>
        </span>
        <span className="shrink-0 rounded-full bg-[#064E3B]/10 px-2.5 py-1 text-[11px] font-extrabold tracking-wider text-[#064E3B] dark:text-emerald-400">
          {s.abbr}
        </span>
      </span>

      <span className="mt-4 grid grid-cols-3 divide-x divide-border/60 rounded-2xl bg-muted/40 py-3 text-center">
        <span>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Sales tax</span>
          <span className="mt-1 block text-sm font-extrabold text-foreground">
            {s.salesTaxAvgCombined === 0 ? "None" : `${s.salesTaxAvgCombined}%`}
          </span>
        </span>
        <span>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Property</span>
          <span className="mt-1 block text-sm font-extrabold text-foreground">{s.propertyTaxAvg}%</span>
        </span>
        <span>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Income tax</span>
          <span className="mt-1 block text-sm font-extrabold text-foreground">{incomeLabel}</span>
        </span>
      </span>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#064E3B] dark:text-emerald-400">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
