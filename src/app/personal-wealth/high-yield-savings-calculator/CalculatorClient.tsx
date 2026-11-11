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

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

// Formula: monthly compounding — Balance(m+1) = Balance(m) × (1 + APY/12) + MonthlyContribution
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [deposit, setDeposit] = useState(10000)
  const [monthly, setMonthly] = useState(300)
  const [years, setYears] = useState(5)
  const [hysaApy, setHysaApy] = useState(4.5)
  const [regularApy, setRegularApy] = useState(0.4)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.deposit !== undefined) setDeposit(s.deposit as any)
    if (s.monthly !== undefined) setMonthly(s.monthly as any)
    if (s.years !== undefined) setYears(s.years as any)
    if (s.hysaApy !== undefined) setHysaApy(s.hysaApy as any)
    if (s.regularApy !== undefined) setRegularApy(s.regularApy as any)
  })


  const calc = useMemo(() => {
    const safeYears = Math.max(0, Math.min(50, years || 0))
    const months = Math.round(safeYears * 12)
    const calcSeries = (apy: number) => {
      const r = apy / 100 / 12
      let bal = deposit || 0
      const yearly: { year: number; balance: number }[] = [{ year: 0, balance: Math.round(bal) }]
      for (let m = 1; m <= months; m++) {
        bal = bal * (1 + r) + (monthly || 0)
        if (m % 12 === 0) yearly.push({ year: m / 12, balance: Math.round(bal) })
      }
      return { ending: bal, yearly }
    }
    const hysa = calcSeries(hysaApy)
    const regular = calcSeries(regularApy)
    const totalContributed = (deposit || 0) + (monthly || 0) * months
    const hysaInterest = hysa.ending - totalContributed
    const regularInterest = regular.ending - totalContributed
    const extra = hysa.ending - regular.ending
    const chart = hysa.yearly.map((row, i) => ({
      year: row.year,
      hysa: row.balance,
      regular: regular.yearly[i]?.balance ?? Math.round(regular.ending),
      gap: row.balance - (regular.yearly[i]?.balance ?? 0),
    }))
    const table = chart.filter((r) => r.year > 0)
    return { hysa, regular, totalContributed, hysaInterest, regularInterest, extra, chart, table }
  }, [deposit, monthly, years, hysaApy, regularApy])

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MoneyInput label="Initial Deposit" value={deposit} onChange={setDeposit} hint="Amount you open the account with." />
        <MoneyInput label="Monthly Contribution" value={monthly} onChange={setMonthly} hint="Added at the end of each month." />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold">Years to Save</label>
        <Input type="number" value={years === 0 ? '' : years} onChange={(e) => setYears(num(e.target.value))} className="font-mono" min={0} max={50} />
        <p className="text-xs text-muted-foreground">Up to 50 years. Results update live.</p>
      </div>
      <PctSlider label="High-Yield APY" value={hysaApy} onChange={setHysaApy} min={0} max={10} step={0.05} />
      <PctSlider label="Regular Bank APY" value={regularApy} onChange={setRegularApy} min={0} max={5} step={0.05} />
      <p className="text-xs text-muted-foreground">Both accounts use monthly compounding with the same deposit and monthly contribution — only the APY differs, so the gap is pure rate advantage. {isPro ? '' : ''}</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="High-Yield Savings Result">
        <div className="text-4xl font-black font-mono">{fmt(calc.hysa.ending)}</div>
        <p className="text-white/80 mt-2 text-sm">HYSA ending balance after {years || 0} years at {hysaApy}% APY</p>
        <div className="mt-4 bg-white/10 rounded-xl p-4">
          <p className="text-white/60 text-xs uppercase font-bold">Extra Interest vs Regular Bank</p>
          <p className="font-mono text-2xl font-bold text-emerald-300">+{fmt(calc.extra)}</p>
          <p className="text-white/70 text-xs mt-1">That is the cost of leaving money in a {regularApy}% account.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Regular Ending Balance</p><p className="font-mono text-xl font-bold">{fmt(calc.regular.ending)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Contributed</p><p className="font-mono text-xl font-bold">{fmt(calc.totalContributed)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">HYSA Interest Earned</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, calc.hysaInterest))}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Regular Interest</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, calc.regularInterest))}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Growth: HYSA vs Regular</h4>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={calc.chart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -2 }} />
            <YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} width={55} />
            <Tooltip formatter={(v: any) => fmt(Number(v))} />
            <Legend />
            <Line type="monotone" dataKey="hysa" stroke="#064E3B" strokeWidth={2.5} dot={false} name="HYSA" />
            <Line type="monotone" dataKey="regular" stroke="#D97706" strokeWidth={2} dot={false} name="Regular bank" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card border rounded-2xl p-6 overflow-x-auto">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Year-by-Year Comparison</h4>
        {calc.table.length === 0 ? <p className="text-sm text-muted-foreground">Enter at least 1 year to see the table.</p> : (
          <table className="w-full text-sm">
            <thead><tr className="text-left border-b"><th className="py-2 pr-2">Year</th><th className="py-2 pr-2">HYSA</th><th className="py-2 pr-2">Regular</th><th className="py-2">Gap</th></tr></thead>
            <tbody>{calc.table.map((r) => (<tr key={r.year} className="border-b last:border-0"><td className="py-2 pr-2 font-mono">{r.year}</td><td className="py-2 pr-2 font-mono">{fmt(r.hysa)}</td><td className="py-2 pr-2 font-mono">{fmt(r.regular)}</td><td className="py-2 font-mono font-bold text-emerald-700">+{fmt(r.gap)}</td></tr>))}</tbody>
          </table>
        )}
      </div>
    </div>
  </div><ToolActionsBar slug="high-yield-savings-calculator" isPro={isPro} inputs={{ deposit, monthly, years, hysaApy, regularApy }} /></>)
}
