import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import type { USState } from "@/data/locations/us-states"

/**
 * The one state card used on every state index (/locations, /guides/states).
 * Mobile-first: full-width rows with a clear header, three labelled stats
 * and a call-to-action footer — no dense single-line text.
 */
export function StateCard({ state: s, href, cta }: { state: USState; href: string; cta: string }) {
  const incomeLabel = s.incomeTax === "none" ? "None on wages" : s.incomeTax === "flat" ? "Flat rate" : "Progressive"
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#064E3B] to-[#0B7A5C] opacity-70" />
      <span className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MapPin className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-lg font-extrabold tracking-tight text-foreground group-hover:text-primary">
            {s.name}
          </span>
          <span className="block text-xs text-muted-foreground">
            Capital: {s.capital} · Largest: {s.largestCity}
          </span>
        </span>
        <span className="ml-auto shrink-0 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-extrabold tracking-wider text-muted-foreground">
          {s.abbr}
        </span>
      </span>

      <span className="mt-4 space-y-2 border-t border-border/50 pt-4 text-sm">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-muted-foreground">Sales tax · avg combined</span>
          <span className="font-bold text-foreground">
            {s.salesTaxAvgCombined === 0 ? "None" : `${s.salesTaxAvgCombined}%`}
          </span>
        </span>
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-muted-foreground">Property tax · avg effective</span>
          <span className="font-bold text-foreground">{s.propertyTaxAvg}%</span>
        </span>
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-muted-foreground">Income tax</span>
          {s.incomeTax === "none" ? (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{incomeLabel}</span>
          ) : (
            <span className="font-bold text-foreground">{incomeLabel}</span>
          )}
        </span>
      </span>

      <span className="mt-4 flex items-center gap-1.5 text-sm font-bold text-primary">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
