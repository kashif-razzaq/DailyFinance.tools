import { BarChart3 } from "lucide-react"

export interface TaxBar {
  label: string
  value: number
  highlight?: boolean
}

export interface TaxBarGroup {
  heading: string
  bars: TaxBar[]
}

/**
 * Branded, hand-built comparison chart (no chart library, no external
 * images) rendered from the same reviewed state dataset as the page text.
 * Used on location pages, state/city guides and sales-tax pages so every
 * location page carries the same crafted visual with a DailyFinance.tools
 * attribution line.
 */
export function TaxCompareChart({ title, groups }: { title: string; groups: TaxBarGroup[] }) {
  return (
    <figure className="rounded-3xl border border-border/60 bg-card p-6 md:p-7">
      <figcaption className="mb-5 flex items-center gap-2 text-base font-extrabold tracking-tight text-foreground">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BarChart3 className="h-4.5 w-4.5" />
        </span>
        {title}
      </figcaption>
      <div className="space-y-6">
        {groups.map((g) => {
          const max = Math.max(...g.bars.map((b) => b.value), 0.1)
          return (
            <div key={g.heading}>
              <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">{g.heading}</p>
              <div className="space-y-2">
                {g.bars.map((b) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <span className="w-32 shrink-0 truncate text-sm text-muted-foreground sm:w-44">{b.label}</span>
                    <span className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        className={`block h-full rounded-full ${b.highlight ? "bg-gradient-to-r from-[#064E3B] to-[#0B7A5C]" : "bg-zinc-300 dark:bg-zinc-600"}`}
                        style={{ width: `${Math.max(2, (b.value / max) * 100)}%` }}
                      />
                    </span>
                    <span className={`w-14 shrink-0 text-right text-sm font-bold ${b.highlight ? "text-primary" : "text-foreground"}`}>
                      {b.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <p className="mt-5 border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
        Chart: DailyFinance.tools · Rates are reviewed averages from our state tax dataset — your exact local rate may differ.
      </p>
    </figure>
  )
}
