/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const fmt2 = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 2 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
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

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [principal, setPrincipal] = useState(10000); const [rate, setRate] = useState(6)
  const [years, setYears] = useState(5); const [months, setMonths] = useState(0)
  const [showCompound, setShowCompound] = useState(true)
  const r = useMemo(() => {
    // Formula: Simple interest I = P × r × t, Total A = P(1 + r·t) where t = years + months/12
    const t = years + months / 12
    const rr = rate / 100
    const interest = principal * rr * t
    const total = principal + interest
    // Compound comparison: A = P(1 + r/12)^(12t) — monthly compounding at the same nominal rate
    const compoundTotal = rr === 0 || t === 0 ? principal : principal * Math.pow(1 + rr / 12, 12 * t)
    const compoundInterest = compoundTotal - principal
    const fullYears = Math.ceil(t)
    const table = Array.from({ length: fullYears + 1 }, (_, y) => {
      const tt = Math.min(y, t)
      const accrued = principal * rr * tt
      return { year: y, label: y === 0 ? 'Start' : `Year ${y}${y > t ? '' : ''}`, accrued, balance: principal + accrued }
    }).filter(row => row.year <= Math.ceil(t))
    // For a partial final period add an exact-end row when months > 0
    return { t, interest, total, compoundTotal, compoundInterest, gap: compoundTotal - total, table }
  }, [principal, rate, years, months])
  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Principal (P)" value={principal} onChange={setPrincipal} hint="The loan amount or deposit you start with." />
      <PctSlider label="Interest Rate per Year (r)" value={rate} onChange={setRate} min={0} max={25} step={0.1} />
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Time — Years (t)</label><span className="font-mono font-bold">{years} yrs</span></div><Slider value={[years]} min={0} max={30} step={1} onValueChange={(v: any) => setYears(Array.isArray(v) ? v[0] : v)} /></div>
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Time — Extra Months</label><span className="font-mono font-bold">{months} mo</span></div><Slider value={[months]} min={0} max={11} step={1} onValueChange={(v: any) => setMonths(Array.isArray(v) ? v[0] : v)} /></div>
      <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm">I = P × r × t = {fmt(principal)} × {rate}% × {r.t.toFixed(2)} yrs = <strong>{fmt(r.interest)}</strong></div>
      <div className="flex items-center justify-between gap-4 border rounded-xl p-4">
        <div><p className="text-sm font-semibold">Compare vs compound interest</p><p className="text-xs text-muted-foreground">See what monthly compounding at the same rate would give instead.</p></div>
        <button onClick={() => setShowCompound(!showCompound)} className={`px-4 py-2 rounded-lg border text-sm font-semibold shrink-0 ${showCompound ? 'bg-[#064E3B] text-white' : 'bg-card'}`}>{showCompound ? 'On' : 'Off'}</button>
      </div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Simple Interest Result">
        <div className="text-5xl font-black font-mono">{fmt(r.total)}</div>
        <p className="text-white/80 mt-2 text-sm">total amount A = P(1 + rt) after {r.t.toFixed(2)} years</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest Earned (I)</p><p className="font-mono text-xl font-bold">{fmt(r.interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Principal</p><p className="font-mono text-xl font-bold">{fmt(principal)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest per Year</p><p className="font-mono text-xl font-bold">{fmt(principal * rate / 100)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest per Month</p><p className="font-mono text-xl font-bold">{fmt2(principal * rate / 100 / 12)}</p></div>
        </div>
      </ResultCard>
      {showCompound && (<div className="bg-card border-2 border-[#D97706]/50 rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Same Rate, Compounded Monthly</h4>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex justify-between border-b py-2"><span>Compound total</span><span className="font-bold">{fmt(r.compoundTotal)}</span></div>
          <div className="flex justify-between border-b py-2"><span>Compound interest</span><span>{fmt(r.compoundInterest)}</span></div>
          <div className="flex justify-between py-2"><span>Simple interest</span><span>{fmt(r.interest)}</span></div>
        </div>
        <div className="mt-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3"><p className="text-sm font-semibold">The compounding gap: <span className="font-mono font-black">{fmt(r.gap)}</span> — simple interest pays the same amount every year; compound interest accelerates.</p></div>
      </div>)}
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Per-Year Accrual</h4>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="py-2 pr-2 font-semibold">Year</th><th className="py-2 pr-2 font-semibold text-right">Interest Accrued</th><th className="py-2 font-semibold text-right">Balance</th></tr></thead>
        <tbody className="font-mono">{r.table.map(row => (<tr key={row.year} className="border-b last:border-0"><td className="py-2 pr-2">{row.label}</td><td className="py-2 pr-2 text-right">{fmt(row.accrued)}</td><td className="py-2 text-right font-bold">{fmt(row.balance)}</td></tr>))}</tbody></table></div>
        <p className="text-xs text-muted-foreground mt-3">Simple interest grows in a straight line — exactly {fmt(principal * rate / 100)} added every year, never more.</p>
      </div>
    </div></div>)
}
