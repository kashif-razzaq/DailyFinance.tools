/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const fmt2 = (n: number) => curSym() + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
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

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
const FREQ: Record<string, number> = { annually: 1, quarterly: 4, monthly: 12, daily: 365 }
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [principal, setPrincipal] = useState(10000); const [monthly, setMonthly] = useState(200)
  const [rate, setRate] = useState(7); const [years, setYears] = useState(15)
  const [freqKey, setFreqKey] = useState('monthly')
  const r = useMemo(() => {
    // Formula: Compound FV = P(1+r/n)^(nt) + contributions compounded monthly; Simple: I = P·r·t with interest kept separate (never earns interest)
    const rr = rate / 100
    const n = FREQ[freqKey] ?? 12
    const totalMonths = Math.max(0, Math.round(years * 12))
    // Effective monthly rate implied by the chosen compounding frequency (0 when r = 0)
    const effMonthly = rr === 0 ? 0 : Math.pow(1 + rr / n, n / 12) - 1
    let compoundBal = principal
    let simplePrincipal = principal
    let simpleInterest = 0
    const chart: { year: number; compound: number; simple: number }[] = [{ year: 0, compound: Math.round(principal), simple: Math.round(principal) }]
    for (let m = 1; m <= totalMonths; m++) {
      compoundBal = compoundBal * (1 + effMonthly) + monthly
      // Simple: interest accrues on deposited principal only, never on past interest
      simpleInterest += simplePrincipal * (rr / 12)
      simplePrincipal += monthly
      if (m % 12 === 0) chart.push({ year: m / 12, compound: Math.round(compoundBal), simple: Math.round(simplePrincipal + simpleInterest) })
    }
    const contributed = principal + monthly * totalMonths
    const compoundTotal = compoundBal
    const simpleTotal = simplePrincipal + simpleInterest
    return { compoundTotal, simpleTotal, contributed, compoundInterest: compoundTotal - contributed, simpleInterestTotal: simpleTotal - contributed, diff: compoundTotal - simpleTotal, chart }
  }, [principal, monthly, rate, years, freqKey])
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"><MoneyInput label="Principal (Starting Amount)" value={principal} onChange={setPrincipal} /><MoneyInput label="Monthly Contribution" value={monthly} onChange={setMonthly} /></div>
      <PctSlider label="Annual Interest Rate" value={rate} onChange={setRate} min={0} max={20} step={0.1} />
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Years</label><span className="font-mono font-bold">{years} yrs</span></div><Slider value={[years]} min={1} max={40} step={1} onValueChange={(v: any) => setYears(Array.isArray(v) ? v[0] : v)} /></div>
      <div className="space-y-2"><label className="text-sm font-semibold">Compounding Frequency (compound side)</label>
        <select value={freqKey} onChange={(e) => setFreqKey(e.target.value)} className="w-full h-10 rounded-lg border border-neutral-300 px-3 text-sm bg-white font-mono">
          <option value="annually">Annually (1×/year)</option><option value="quarterly">Quarterly (4×/year)</option><option value="monthly">Monthly (12×/year)</option><option value="daily">Daily (365×/year)</option>
        </select>
        <p className="text-xs text-muted-foreground">Simple interest never compounds — that gap is exactly what the comparison below measures.</p></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`Compound vs Simple After ${years} Years`}>
        <p className="text-white/60 text-xs uppercase font-bold">Compound Total</p>
        <div className="text-5xl font-black font-mono">{fmt(r.compoundTotal)}</div>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Simple Total</p><p className="font-mono text-xl font-bold">{fmt(r.simpleTotal)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">You Contributed</p><p className="font-mono text-xl font-bold">{fmt(r.contributed)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Compound Interest</p><p className="font-mono text-xl font-bold">{fmt(r.compoundInterest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Simple Interest</p><p className="font-mono text-xl font-bold">{fmt(r.simpleInterestTotal)}</p></div>
        </div>
        <div className="mt-6 bg-white/15 border border-white/25 rounded-xl px-4 py-3"><p className="text-sm font-semibold">Compounding advantage: <span className="font-mono font-black">{fmt(r.diff)}</span> extra — interest earning interest is the whole difference.</p></div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Growth by Year — Compound vs Simple</h4>
        <ResponsiveContainer width="100%" height={210}><AreaChart data={r.chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Area type="monotone" dataKey="compound" stroke="#064E3B" fill="#064E3B" fillOpacity={0.18} name="Compound" /><Area type="monotone" dataKey="simple" stroke="#D97706" fill="#D97706" fillOpacity={0.12} name="Simple" /></AreaChart></ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-3">The lines start together and diverge — slowly at first, then dramatically. Time is what makes compounding win.</p>
      </div>
    </div></div><ToolActionsBar slug="interest-calculator" isPro={isPro} inputs={{ principal, monthly, rate, years, freqKey }} /></>)
}
