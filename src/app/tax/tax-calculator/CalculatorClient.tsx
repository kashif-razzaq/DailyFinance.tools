/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const pct = (n: number) => (n * 100).toFixed(1) + '%'
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

// 2026 federal ordinary brackets (projected thresholds). Each bracket taxes only the slice of income inside it.
type Bracket = { upTo: number; rate: number }
const BRACKETS: Record<string, Bracket[]> = {
  single: [
    { upTo: 11925, rate: 0.10 }, { upTo: 48475, rate: 0.12 }, { upTo: 103350, rate: 0.22 },
    { upTo: 197300, rate: 0.24 }, { upTo: 250525, rate: 0.32 }, { upTo: 626350, rate: 0.35 }, { upTo: Infinity, rate: 0.37 },
  ],
  mfj: [
    { upTo: 23850, rate: 0.10 }, { upTo: 96950, rate: 0.12 }, { upTo: 206700, rate: 0.22 },
    { upTo: 394600, rate: 0.24 }, { upTo: 501050, rate: 0.32 }, { upTo: 751600, rate: 0.35 }, { upTo: Infinity, rate: 0.37 },
  ],
}
const STD_DED: Record<string, number> = { single: 16100, mfj: 32200 }
// Tax = sum over brackets of (income slice in bracket x bracket rate)
function bracketTax(taxable: number, brackets: Bracket[]) {
  let tax = 0, prev = 0
  const rows: { rate: number; amount: number; tax: number; from: number; to: number }[] = []
  for (const b of brackets) {
    if (taxable <= prev) break
    const amt = Math.min(taxable, b.upTo) - prev
    if (amt > 0) { tax += amt * b.rate; rows.push({ rate: b.rate, amount: amt, tax: amt * b.rate, from: prev, to: Math.min(taxable, b.upTo) }) }
    prev = b.upTo
  }
  return { tax, rows }
}
function marginalRate(taxable: number, brackets: Bracket[]) {
  for (const b of brackets) if (taxable <= b.upTo) return b.rate
  return 0.37
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [income, setIncome] = useState(85000)
  const [status, setStatus] = useState<'single' | 'mfj'>('single')
  const [useItemized, setUseItemized] = useState(false)
  const [itemized, setItemized] = useState(18000)
  const [credits, setCredits] = useState(0)
  const [withheld, setWithheld] = useState(11000)

  const r = useMemo(() => {
    const deduction = useItemized ? Math.max(itemized, 0) : STD_DED[status]
    const taxable = Math.max(0, income - deduction)
    const { tax, rows } = bracketTax(taxable, BRACKETS[status])
    const afterCredits = Math.max(0, tax - credits)
    const balance = afterCredits - withheld // positive = owed, negative = refund
    return {
      deduction, taxable, rows, tax, afterCredits, balance,
      effective: income > 0 ? afterCredits / income : 0,
      marginal: marginalRate(taxable, BRACKETS[status]),
      afterTax: income - afterCredits,
    }
  }, [income, status, useItemized, itemized, credits, withheld])

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Gross Annual Income" value={income} onChange={setIncome} hint="Wages, salary and other ordinary income before deductions." />
      <div className="space-y-2"><label className="text-sm font-semibold">Filing Status</label>
        <div className="grid grid-cols-2 gap-2">
          {([['single', 'Single'], ['mfj', 'Married Filing Jointly']] as const).map(([v, l]) => (
            <button key={v} onClick={() => setStatus(v)} className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${status === v ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>{l}</button>
          ))}
        </div></div>
      <div className="space-y-2"><label className="text-sm font-semibold">Deduction</label>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setUseItemized(false)} className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${!useItemized ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>Standard ({fmt(STD_DED[status])})</button>
          <button onClick={() => setUseItemized(true)} className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${useItemized ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>Itemised</button>
        </div>
        {useItemized && <MoneyInput label="Itemised Deductions" value={itemized} onChange={setItemized} hint={itemized < STD_DED[status] ? `Below the standard deduction — the standard ${fmt(STD_DED[status])} would save you more.` : 'Mortgage interest, SALT (capped), charitable gifts and similar.'} />}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <MoneyInput label="Tax Credits" value={credits} onChange={setCredits} hint="Child tax credit, education credits etc. Credits cut tax dollar-for-dollar." />
        <MoneyInput label="Federal Tax Already Withheld" value={withheld} onChange={setWithheld} hint="From your pay slips / W-2 box 2 — used to estimate refund or amount owed." />
      </div>
      <p className="text-xs text-muted-foreground">Estimate only, using projected 2026 federal brackets — verify with the IRS before filing.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Estimated Federal Tax">
        <div className="text-4xl font-black font-mono">{fmt(r.afterCredits)}</div>
        <p className="text-white/80 mt-2 text-sm">on {fmt(r.taxable)} of taxable income — you keep {fmt(r.afterTax)}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Effective Rate</p><p className="font-mono text-xl font-bold">{pct(r.effective)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Marginal Rate</p><p className="font-mono text-xl font-bold">{pct(r.marginal)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Deduction Used</p><p className="font-mono text-xl font-bold">{fmt(r.deduction)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">{r.balance >= 0 ? 'You Owe (est.)' : 'Refund (est.)'}</p><p className="font-mono text-xl font-bold">{fmt(Math.abs(r.balance))}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Bracket-by-Bracket Breakdown</h4>
        {r.rows.length === 0 && <p className="text-sm text-muted-foreground">No taxable income — no federal income tax.</p>}
        <div className="space-y-2">
          {r.rows.map((row) => (
            <div key={row.rate} className="flex items-center gap-3 text-sm">
              <span className="font-mono font-bold w-12 shrink-0">{pct(row.rate)}</span>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden"><div className="h-full bg-[#064E3B] rounded-full" style={{ width: `${r.tax > 0 ? Math.max(3, (row.tax / r.tax) * 100) : 0}%` }} /></div>
              <span className="text-muted-foreground w-28 text-right hidden sm:block">{fmt(row.from)}–{row.to === Infinity ? '∞' : fmt(row.to)}</span>
              <span className="font-mono font-semibold w-20 text-right">{fmt(row.tax)}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Differentiator: this is the real marginal system — only the dollars inside each bracket are taxed at that bracket's rate, so a pay rise never makes you worse off.</p>
      </div>
    </div>
  </div><ToolActionsBar slug="tax-calculator" isPro={isPro} inputs={{ income, status, useItemized, itemized, credits, withheld }} /></>)
}
