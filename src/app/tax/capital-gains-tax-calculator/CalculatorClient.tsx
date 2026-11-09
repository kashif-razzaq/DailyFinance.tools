/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

type Bracket = { upTo: number; rate: number }
const BRACKETS: Record<string, Bracket[]> = {
  single: [{ upTo: 11925, rate: 0.10 }, { upTo: 48475, rate: 0.12 }, { upTo: 103350, rate: 0.22 }, { upTo: 197300, rate: 0.24 }, { upTo: 250525, rate: 0.32 }, { upTo: 626350, rate: 0.35 }, { upTo: Infinity, rate: 0.37 }],
  mfj: [{ upTo: 23850, rate: 0.10 }, { upTo: 96950, rate: 0.12 }, { upTo: 206700, rate: 0.22 }, { upTo: 394600, rate: 0.24 }, { upTo: 501050, rate: 0.32 }, { upTo: 751600, rate: 0.35 }, { upTo: Infinity, rate: 0.37 }],
}
const STD_DED: Record<string, number> = { single: 16100, mfj: 32200 }
// 2026 long-term capital gains thresholds (taxable income): 0% rate up to T0, 20% above T20, 15% between.
const CG: Record<string, { t0: number; t20: number; niit: number }> = {
  single: { t0: 49450, t20: 545500, niit: 200000 },
  mfj: { t0: 98900, t20: 613700, niit: 250000 },
}
function bracketTax(taxable: number, brackets: Bracket[]) { let tax = 0, prev = 0; for (const b of brackets) { if (taxable <= prev) break; const amt = Math.min(taxable, b.upTo) - prev; if (amt > 0) tax += amt * b.rate; prev = b.upTo } return tax }

function longTermTax(taxableOther: number, gain: number, status: 'single' | 'mfj') {
  const { t0, t20, niit } = CG[status]
  const total = taxableOther + gain
  // The gain stacks on top of other income: slice it against the 0% and 20% thresholds.
  const at0 = Math.max(0, Math.min(total, t0) - taxableOther)
  const at20 = Math.max(0, total - Math.max(taxableOther, t20))
  const at15 = Math.max(0, gain - at0 - at20)
  const tax = at15 * 0.15 + at20 * 0.20
  const magi = taxableOther + STD_DED[status] + gain // rough MAGI rebuild for the NIIT check
  const niitTax = Math.min(gain, Math.max(0, magi - niit)) * 0.038
  return { tax: tax + niitTax, at0, at15, at20, niitTax }
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [cost, setCost] = useState(40000)
  const [sale, setSale] = useState(75000)
  const [months, setMonths] = useState(18)
  const [otherIncome, setOtherIncome] = useState(90000)
  const [status, setStatus] = useState<'single' | 'mfj'>('single')

  const r = useMemo(() => {
    const gain = sale - cost
    const taxableOther = Math.max(0, otherIncome - STD_DED[status])
    if (gain <= 0) return { gain, loss: true, lt: null as null | ReturnType<typeof longTermTax>, stTax: 0, chosen: 0, isLong: months > 12, effRate: 0 }
    const isLong = months > 12
    const lt = longTermTax(taxableOther, gain, status)
    // Short-term: gain taxed as ordinary income — incremental tax over the no-sale return
    const stTax = bracketTax(taxableOther + gain, BRACKETS[status]) - bracketTax(taxableOther, BRACKETS[status])
    const chosen = isLong ? lt.tax : stTax
    return { gain, loss: false, lt, stTax, chosen, isLong, effRate: gain > 0 ? (chosen / gain) * 100 : 0 }
  }, [cost, sale, months, otherIncome, status])

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <MoneyInput label="Purchase Price (Cost Basis)" value={cost} onChange={setCost} />
        <MoneyInput label="Sale Price" value={sale} onChange={setSale} />
      </div>
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Holding Period</label><span className="font-mono font-bold">{months} months — {months > 12 ? 'long-term' : 'short-term'}</span></div>
        <Slider value={[months]} min={1} max={36} step={1} onValueChange={(v: any) => setMonths(Array.isArray(v) ? v[0] : v)} />
        <p className="text-xs text-muted-foreground">More than 12 months = long-term (preferential 0/15/20% rates). One year or less = short-term (ordinary income rates).</p></div>
      <MoneyInput label="Other Taxable Income (salary etc.)" value={otherIncome} onChange={setOtherIncome} hint="Your other income decides which capital gains bracket the gain lands in." />
      <div className="space-y-2"><label className="text-sm font-semibold">Filing Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value as 'single' | 'mfj')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
          <option value="single">Single</option><option value="mfj">Married Filing Jointly</option>
        </select></div>
      <p className="text-xs text-muted-foreground">Federal estimate using projected 2026 thresholds; state tax extra where it applies — verify with the IRS.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`Federal Capital Gains Tax (${r.isLong ? 'Long-Term' : 'Short-Term'})`}>
        {r.loss ? (<><div className="text-4xl font-black font-mono">$0</div><p className="text-white/80 mt-2 text-sm">This is a capital loss of {fmt(Math.abs(r.gain))} — losses can offset other gains, plus up to $3,000/yr against ordinary income, with the rest carried forward.</p></>) : (<>
          <div className="text-4xl font-black font-mono">{fmt(r.chosen)}</div>
          <p className="text-white/80 mt-2 text-sm">on a gain of {fmt(r.gain)} — effective rate {r.effRate.toFixed(1)}%, net proceeds {fmt(sale - r.chosen)}</p>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
            <div><p className="text-white/60 text-xs uppercase font-bold">If Short-Term</p><p className="font-mono text-xl font-bold">{fmt(r.stTax)}</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">If Long-Term</p><p className="font-mono text-xl font-bold">{fmt(r.lt ? r.lt.tax : 0)}</p></div>
          </div></>)}
      </ResultCard>
      {!r.loss && r.lt && (
        <div className="bg-card border rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">How the Gain Is Taxed (Long-Term View)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1.5 border-b border-dashed"><span>Taxed at 0%</span><span className="font-mono font-semibold">{fmt(r.lt.at0)}</span></div>
            <div className="flex justify-between py-1.5 border-b border-dashed"><span>Taxed at 15%</span><span className="font-mono font-semibold">{fmt(r.lt.at15)}</span></div>
            <div className="flex justify-between py-1.5 border-b border-dashed"><span>Taxed at 20%</span><span className="font-mono font-semibold">{fmt(r.lt.at20)}</span></div>
            <div className="flex justify-between py-1.5"><span>NIIT (3.8% surtax)</span><span className="font-mono font-semibold">{fmt(r.lt.niitTax)}</span></div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Differentiator: side-by-side short vs long-term tax on the same sale. {r.isLong ? `Selling as short-term would have cost ${fmt(Math.max(0, r.stTax - r.chosen))} more.` : `Holding past 12 months would save about ${fmt(Math.max(0, r.stTax - r.lt.tax))} on this gain.`}</p>
        </div>
      )}
    </div>
  </div><ToolActionsBar slug="capital-gains-tax-calculator" isPro={isPro} inputs={{ cost, sale, months, otherIncome, status }} /></>)
}
