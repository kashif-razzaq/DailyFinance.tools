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
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [starting, setStarting] = useState(5000); const [monthly, setMonthly] = useState(300)
  const [apy, setApy] = useState(4.5); const [years, setYears] = useState(10)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.starting !== undefined) setStarting(s.starting as any)
    if (s.monthly !== undefined) setMonthly(s.monthly as any)
    if (s.apy !== undefined) setApy(s.apy as any)
    if (s.years !== undefined) setYears(s.years as any)
  })

  const r = useMemo(() => {
    // Formula: FV via monthly compounding — each month balance = balance * (1 + APY/12) + monthly contribution
    const mr = apy / 100 / 12
    const totalMonths = Math.max(0, Math.round(years * 12))
    let balance = starting
    let interestTotal = 0
    const rows: { year: number; deposits: number; interest: number; balance: number; contributions: number; interestCum: number }[] = [
      { year: 0, deposits: starting, interest: 0, balance: starting, contributions: starting, interestCum: 0 },
    ]
    for (let m = 1; m <= totalMonths; m++) {
      const interestThisMonth = balance * mr
      interestTotal += interestThisMonth
      balance = balance + interestThisMonth + monthly
      if (m % 12 === 0) {
        const yr = m / 12
        const contributions = starting + monthly * m
        rows.push({ year: yr, deposits: contributions, interest: interestTotal, balance, contributions, interestCum: interestTotal })
      }
    }
    // Handle partial final year if years is not whole via slider step 1 it is whole, but guard anyway
    const totalContributions = starting + monthly * totalMonths
    const totalInterest = balance - totalContributions
    return { fv: balance, totalContributions, totalInterest: Math.max(0, totalInterest), rows }
  }, [starting, monthly, apy, years])
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"><MoneyInput label="Starting Balance" value={starting} onChange={setStarting} hint="What you already have saved today." /><MoneyInput label="Monthly Contribution" value={monthly} onChange={setMonthly} hint="Added at the end of each month." /></div>
      <PctSlider label="APY (Annual Percentage Yield)" value={apy} onChange={setApy} min={0} max={10} step={0.05} />
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Years to Save</label><span className="font-mono font-bold">{years} yrs</span></div><Slider value={[years]} min={1} max={40} step={1} onValueChange={(v: any) => setYears(Array.isArray(v) ? v[0] : v)} /></div>
      <p className="text-xs text-muted-foreground">Modelled with monthly compounding at APY ÷ 12. APY already reflects compounding, so this matches how high-yield savings accounts actually credit interest.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`Future Balance After ${years} Years`}>
        <div className="text-5xl font-black font-mono">{fmt(r.fv)}</div>
        <p className="text-white/80 mt-2 text-sm">from {fmt(r.totalContributions)} you put in</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Contributions</p><p className="font-mono text-xl font-bold">{fmt(r.totalContributions)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Interest</p><p className="font-mono text-xl font-bold">{fmt(r.totalInterest)}</p></div>
        </div>
        <p className="text-white/80 mt-4 text-sm">Interest is {r.fv > 0 ? Math.round((r.totalInterest / r.fv) * 100) : 0}% of the final balance — free growth on top of your deposits.</p>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Contributions vs Interest (stacked)</h4>
        <ResponsiveContainer width="100%" height={210}><AreaChart data={r.rows}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Area type="monotone" dataKey="contributions" stackId="1" stroke="#064E3B" fill="#064E3B" fillOpacity={0.85} name="Contributions" /><Area type="monotone" dataKey="interestCum" stackId="1" stroke="#D97706" fill="#D97706" fillOpacity={0.7} name="Interest" /></AreaChart></ResponsiveContainer>
      </div>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Year-by-Year Breakdown</h4>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="py-2 pr-2 font-semibold">Year</th><th className="py-2 pr-2 font-semibold text-right">Deposits</th><th className="py-2 pr-2 font-semibold text-right">Interest</th><th className="py-2 font-semibold text-right">Balance</th></tr></thead>
        <tbody className="font-mono">{r.rows.filter(row => row.year > 0).map(row => (<tr key={row.year} className="border-b last:border-0"><td className="py-2 pr-2">{row.year}</td><td className="py-2 pr-2 text-right">{fmt(row.deposits)}</td><td className="py-2 pr-2 text-right">{fmt(row.interest)}</td><td className="py-2 text-right font-bold">{fmt(row.balance)}</td></tr>))}</tbody></table></div>
        <p className="text-xs text-muted-foreground mt-3">Deposits = starting balance + all monthly contributions to date. Interest = cumulative interest earned.</p>
      </div>
    </div></div><ToolActionsBar slug="savings-calculator" isPro={isPro} inputs={{ starting, monthly, apy, years }} /></>)
}
