'use client'

import React, { useMemo, useState } from 'react'
import { useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
import { ProGuard } from '@/components/calculator/ProGuard'
import { MoneyInput, PctSlider, NumSlider, ResultCard, Stat, fmt } from '@/components/calculator/ProInputs'

/**
 * Business Valuation Calculator (Pro).
 *
 * Two independent methods, side by side: the market method (SDE multiplied
 * by an industry multiple range — how small businesses actually change
 * hands) and an income method (a 5-year discounted cash flow with a
 * terminal value). Where the two disagree, the gap itself is information.
 */
const INDUSTRIES: { name: string; low: number; high: number }[] = [
  { name: 'Professional services', low: 2.5, high: 3.5 },
  { name: 'E-commerce / online retail', low: 2.5, high: 4.0 },
  { name: 'SaaS / software', low: 3.5, high: 5.5 },
  { name: 'Retail / food & beverage', low: 1.5, high: 2.5 },
  { name: 'Manufacturing', low: 3.0, high: 4.5 },
  { name: 'Health & fitness', low: 2.0, high: 3.0 },
  { name: 'Construction & trades', low: 2.0, high: 3.0 },
]

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  useCurrencySymbol()
  const [revenue, setRevenue] = useState(850000)
  const [sde, setSde] = useState(210000)
  const [industry, setIndustry] = useState(0)
  const [multipleLow, setMultipleLow] = useState(2.5)
  const [multipleHigh, setMultipleHigh] = useState(3.5)
  const [growth, setGrowth] = useState(8)
  const [discount, setDiscount] = useState(20)
  const [terminalGrowth, setTerminalGrowth] = useState(2.5)
  const [years, setYears] = useState(5)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.revenue !== undefined) setRevenue(s.revenue as any)
    if (s.sde !== undefined) setSde(s.sde as any)
    if (s.industry !== undefined) setIndustry(s.industry as any)
    if (s.multipleLow !== undefined) setMultipleLow(s.multipleLow as any)
    if (s.multipleHigh !== undefined) setMultipleHigh(s.multipleHigh as any)
    if (s.growth !== undefined) setGrowth(s.growth as any)
    if (s.discount !== undefined) setDiscount(s.discount as any)
    if (s.terminalGrowth !== undefined) setTerminalGrowth(s.terminalGrowth as any)
    if (s.years !== undefined) setYears(s.years as any)
  })


  const pickIndustry = (idx: number) => {
    setIndustry(idx)
    setMultipleLow(INDUSTRIES[idx].low)
    setMultipleHigh(INDUSTRIES[idx].high)
  }

  const r = useMemo(() => {
    const rangeLow = sde * multipleLow
    const rangeHigh = sde * multipleHigh
    const mid = sde * ((multipleLow + multipleHigh) / 2)

    // DCF: project SDE forward, discount back, add a Gordon-growth terminal value.
    const d = discount / 100
    const g = growth / 100
    const tg = terminalGrowth / 100
    let pv = 0
    let lastCf = sde
    const rows: { year: number; cf: number; pv: number }[] = []
    for (let y = 1; y <= years; y++) {
      const cf = sde * Math.pow(1 + g, y)
      lastCf = cf
      const pvCf = cf / Math.pow(1 + d, y)
      pv += pvCf
      rows.push({ year: y, cf, pv: pvCf })
    }
    const terminal = d > tg ? (lastCf * (1 + tg)) / (d - tg) : 0
    const pvTerminal = terminal / Math.pow(1 + d, years)
    const dcf = pv + pvTerminal

    return { rangeLow, rangeHigh, mid, dcf, rows, terminal, pvTerminal, sdeMargin: revenue > 0 ? (sde / revenue) * 100 : 0 }
  }, [revenue, sde, multipleLow, multipleHigh, growth, discount, terminalGrowth, years])

  const calculator = (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-6">
        <MoneyInput label="Annual revenue" value={revenue} onChange={setRevenue} />
        <MoneyInput
          label="Seller's discretionary earnings (SDE)"
          value={sde}
          onChange={setSde}
          hint="Net profit + owner's salary, benefits, and one-off expenses added back. The number buyers actually price."
        />
        <div className="space-y-2">
          <label className="text-sm font-semibold">Industry (sets the typical multiple range)</label>
          <select
            value={industry}
            onChange={(e) => pickIndustry(Number(e.target.value))}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-medium"
          >
            {INDUSTRIES.map((ind, i) => (
              <option key={ind.name} value={i}>
                {ind.name} — {ind.low}× to {ind.high}× SDE
              </option>
            ))}
          </select>
        </div>
        <PctSlider label="Multiple — low end" value={multipleLow} onChange={setMultipleLow} min={0.5} max={8} step={0.25} />
        <PctSlider label="Multiple — high end" value={multipleHigh} onChange={setMultipleHigh} min={0.5} max={10} step={0.25} />
        <PctSlider label="Expected annual growth" value={growth} onChange={setGrowth} min={-5} max={30} step={0.5} />
        <PctSlider label="Discount rate (risk)" value={discount} onChange={setDiscount} min={8} max={40} step={0.5} />
        <PctSlider label="Terminal growth" value={terminalGrowth} onChange={setTerminalGrowth} min={0} max={5} step={0.25} />
        <NumSlider label="Projection period" value={years} onChange={setYears} min={3} max={10} suffix=" yrs" />
      </div>

      <div className="space-y-6">
        <ResultCard title="Valuation — two methods">
          <div className="grid grid-cols-2 gap-6">
            <Stat label="Market value (midpoint)" value={fmt(r.mid)} sub={`${fmt(r.rangeLow)} – ${fmt(r.rangeHigh)} at ${multipleLow}×–${multipleHigh}× SDE`} />
            <Stat label="DCF value" value={fmt(r.dcf)} sub={`includes terminal value of ${fmt(r.terminal)}`} />
            <Stat label="SDE margin" value={`${r.sdeMargin.toFixed(1)}%`} sub="of revenue — buyers compare this first" />
            <Stat label="Implied revenue multiple" value={`${revenue > 0 ? (r.mid / revenue).toFixed(2) : '0'}×`} sub="at the market midpoint" />
          </div>
          <p className="mt-6 border-t border-white/15 pt-4 text-sm font-light leading-relaxed text-white/85">
            Small businesses are priced on the market method: what a buyer will pay for the earnings, given the
            risk that they depend on the owner. A DCF runs higher when it treats all of SDE as transferable cash
            flow — treat it as the ceiling that assumes a smooth handover, and the multiple range as the price
            the market is likely to actually pay.
          </p>
        </ResultCard>

        <div className="rounded-2xl border bg-card p-5">
          <p className="mb-3 text-sm font-bold">DCF build-up, year by year</p>
          <div className="divide-y">
            {r.rows.map((row) => (
              <div key={row.year} className="flex items-center justify-between py-2 text-sm">
                <span className="font-light text-muted-foreground">Year {row.year} earnings</span>
                <span className="font-mono font-semibold">{fmt(row.cf)}</span>
                <span className="font-mono text-muted-foreground">worth {fmt(row.pv)} today</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2 text-sm">
              <span className="font-light text-muted-foreground">Terminal value (after year {years})</span>
              <span className="font-mono font-semibold">{fmt(r.terminal)}</span>
              <span className="font-mono text-muted-foreground">worth {fmt(r.pvTerminal)} today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <ProGuard
        isPro={isPro}
        toolTitle="Business Valuation Calculator"
        features={[
          'Market method: SDE multiples for seven industries',
          'Full DCF with terminal value, year-by-year build-up',
          'Both values side by side — and why they differ',
          'SDE margin and implied revenue multiple buyers check first',
        ]}
      >
        {calculator}
      </ProGuard>
      <ToolActionsBar
        slug="business-valuation-calculator"
        isPro={isPro}
        inputs={{ revenue, sde, industry, multipleLow, multipleHigh, growth, discount, terminalGrowth, years }}
      />
    </>
  )
}
