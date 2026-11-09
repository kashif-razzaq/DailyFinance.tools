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
function PctSlider({ label, value, onChange, min = 0, max = 20, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

// Typical buyer closing-cost estimates, itemised. Percentages are of the loan or price as noted;
// prepaids (insurance, tax escrow, per-diem interest) are real cash-to-close but are not lender fees.
function estimates(price: number, loan: number, taxPct: number, insYear: number, rate: number) {
  const taxYear = price * taxPct / 100
  return [
    { label: 'Loan origination fee', basis: '0.5% of loan', amount: loan * 0.005 },
    { label: 'Application & processing', basis: 'flat', amount: 500 },
    { label: 'Appraisal', basis: 'flat', amount: 450 },
    { label: 'Credit report & flood cert', basis: 'flat', amount: 85 },
    { label: 'Title search & settlement', basis: 'flat', amount: 1200 },
    { label: "Owner's + lender's title insurance", basis: '0.5% of price', amount: price * 0.005 },
    { label: 'Recording & transfer charges', basis: 'flat', amount: 275 },
    { label: 'Prepaid interest (15 days)', basis: 'per-diem on loan', amount: loan * rate / 100 / 365 * 15 },
    { label: 'Home insurance prepaid (12 mo)', basis: 'prepaid', amount: insYear },
    { label: 'Insurance escrow reserve (2 mo)', basis: 'escrow', amount: insYear / 12 * 2 },
    { label: 'Property tax escrow (3 mo)', basis: 'escrow', amount: taxYear / 12 * 3 },
  ]
}
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(425000); const [downPct, setDownPct] = useState(20)
  const [taxPct, setTaxPct] = useState(1.1); const [insYear, setInsYear] = useState(1800); const [rate, setRate] = useState(6.75)
  const loan = Math.max(0, price - price * downPct / 100)
  const defaults = useMemo(() => estimates(price, loan, taxPct, insYear, rate), [price, loan, taxPct, insYear, rate])
  const [overrides, setOverrides] = useState<Record<number, number>>({})
  const items = defaults.map((d, i) => ({ ...d, amount: overrides[i] !== undefined ? overrides[i] : Math.round(d.amount) }))
  const total = items.reduce((s, i) => s + i.amount, 0)
  const down = price * downPct / 100
  const cashToClose = down + total
  const pctOfPrice = price > 0 ? total / price * 100 : 0
  const rangePos = Math.min(100, Math.max(0, (pctOfPrice - 1) / (6 - 1) * 100)) // typical buyer range is roughly 2–5% of price
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Home Price" value={price} onChange={setPrice} /><MoneyInput label="Home Insurance (per year)" value={insYear} onChange={setInsYear} /></div>
      <PctSlider label="Down Payment" value={downPct} onChange={setDownPct} min={0} max={50} step={1} />
      <div className="grid grid-cols-2 gap-6"><PctSlider label="Property Tax (% of price/yr)" value={taxPct} onChange={setTaxPct} min={0} max={3} step={0.05} /><PctSlider label="Mortgage Rate (prepaid interest)" value={rate} onChange={setRate} min={0} max={15} step={0.125} /></div>
      <div><div className="flex items-center justify-between mb-3"><h3 className="font-bold">Itemised closing costs — tap any figure to edit</h3>
        <button onClick={() => setOverrides({})} className="text-xs font-semibold text-[#064E3B] underline">Reset estimates</button></div>
        <div className="divide-y divide-neutral-100 border rounded-xl overflow-hidden">{items.map((it, i) => (
          <div key={it.label} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <div><div className="text-sm font-medium">{it.label}</div><div className="text-xs text-muted-foreground">{it.basis}</div></div>
            <div className="relative w-32 shrink-0"><span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold">{sym}</span>
              <Input type="number" value={it.amount === 0 ? '' : it.amount} onChange={(e) => setOverrides(o => ({ ...o, [i]: num(e.target.value) }))} className="pl-6 font-mono h-9 text-right" /></div>
          </div>))}</div>
        <p className="text-xs text-muted-foreground mt-3">Estimates are typical US buyer figures; your lender&apos;s Loan Estimate is the binding document. Seller costs (agent commission etc.) are usually paid from sale proceeds.</p></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Cash to Close">
        <div className="text-4xl font-black font-mono">{fmt(cashToClose)}</div>
        <p className="text-white/80 mt-2 text-sm">down payment {fmt(down)} + closing costs {fmt(total)}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Closing Costs</p><p className="font-mono text-xl font-bold">{fmt(total)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">As % of Price</p><p className="font-mono text-xl font-bold">{pctOfPrice.toFixed(1)}%</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Loan Amount</p><p className="font-mono text-xl font-bold">{fmt(loan)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Down Payment</p><p className="font-mono text-xl font-bold">{fmt(down)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">How You Compare — Typical Range 2–5% of Price</h4>
        <div className="relative h-4 rounded-full bg-gradient-to-r from-emerald-200 via-amber-200 to-red-200"><div className="absolute -top-1 w-6 h-6 rounded-full bg-[#064E3B] border-4 border-white shadow" style={{ left: `calc(${rangePos}% - 12px)` }} /></div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2"><span>1%</span><span>Your estimate: {pctOfPrice.toFixed(1)}%</span><span>6%+</span></div>
        <p className="text-sm text-muted-foreground mt-4">{pctOfPrice < 2 ? 'Below the typical range — double-check nothing is missing, especially prepaid taxes and insurance.' : pctOfPrice <= 5 ? 'Inside the typical 2–5% band for US buyers.' : 'Above the typical band — the biggest levers are origination and title insurance; both are negotiable or shoppable in many states.'}</p></div>
    </div></div><ToolActionsBar slug="closing-cost-calculator" isPro={isPro} inputs={{ price, downPct, taxPct, insYear, rate, overrides }} /></>)
}
