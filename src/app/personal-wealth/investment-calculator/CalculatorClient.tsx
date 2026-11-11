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
function NumInput({ label, value, onChange, hint, min, max }: { label: string; value: number; onChange: (n: number) => void; hint?: string; min?: number; max?: number }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <Input type="number" value={value === 0 ? '' : value} min={min} max={max} onChange={(e) => onChange(num(e.target.value))} className="font-mono" />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

// Formula (monthly compounding, net of fees):
//  Monthly rate m = (annualReturn% - fees%) / 100 / 12. Months N = years x 12.
//  Ending balance = P x (1+m)^N + PMT x [((1+m)^N - 1) / m]   (second term = PMT x N when m = 0).
//  Fee cost = ending balance calculated at 0% fees (m uses return alone) minus the net ending balance.
//  Real (inflation-adjusted) balance = nominal ending balance / (1 + inflation)^years.
//  Taxes, dividends timing and market volatility are not modelled — returns are a smooth assumption.
function fvMonthly(principal: number, monthly: number, annualNetPct: number, years: number) {
  const months = Math.max(0, Math.round(years * 12))
  const m = annualNetPct / 100 / 12
  if (months === 0) return principal
  if (m === 0) return principal + monthly * months
  const growth = Math.pow(1 + m, months)
  return principal * growth + monthly * ((growth - 1) / m)
}
function balanceAtYear(principal: number, monthly: number, annualNetPct: number, year: number) {
  return fvMonthly(principal, monthly, annualNetPct, year)
}

const SCENARIOS = [
  { name: 'Conservative', rate: 5 },
  { name: 'Base', rate: 8 },
  { name: 'Aggressive', rate: 11 },
] as const

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [initial, setInitial] = useState(10000)
  const [monthly, setMonthly] = useState(500)
  const [years, setYears] = useState(20)
  const [ret, setRet] = useState(8)
  const [fees, setFees] = useState(0.5)
  const [inflation, setInflation] = useState(3)
  const [scenario, setScenario] = useState<string>('Base')

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.initial !== undefined) setInitial(s.initial as any)
    if (s.monthly !== undefined) setMonthly(s.monthly as any)
    if (s.years !== undefined) setYears(s.years as any)
    if (s.ret !== undefined) setRet(s.ret as any)
    if (s.fees !== undefined) setFees(s.fees as any)
    if (s.inflation !== undefined) setInflation(s.inflation as any)
    if (s.scenario !== undefined) setScenario(s.scenario as any)
  })


  const pickScenario = (name: string, rate: number) => { setScenario(name); setRet(rate) }

  const calc = useMemo(() => {
    const y = Math.max(0, years)
    const netPct = ret - fees
    const ending = fvMonthly(initial, monthly, netPct, y)
    const endingNoFees = fvMonthly(initial, monthly, ret, y)
    const totalContributions = initial + monthly * 12 * y
    const totalGrowth = ending - totalContributions
    const feeCost = Math.max(0, endingNoFees - ending)
    const realEnding = y > 0 ? ending / Math.pow(1 + inflation / 100, y) : ending
    const rows: { year: number; balance: number; noFees: number; contributions: number }[] = []
    const series: { year: number; net: number; noFees: number }[] = []
    for (let yr = 0; yr <= Math.floor(y); yr++) {
      const bal = balanceAtYear(initial, monthly, netPct, yr)
      const nf = balanceAtYear(initial, monthly, ret, yr)
      const contrib = initial + monthly * 12 * yr
      rows.push({ year: yr, balance: bal, noFees: nf, contributions: contrib })
      series.push({ year: yr, net: Math.round(bal), noFees: Math.round(nf) })
    }
    // Scenario comparison at the same inputs (net of the same fees)
    const scenarioRows = SCENARIOS.map((s) => {
      const end = fvMonthly(initial, monthly, s.rate - fees, y)
      return { name: s.name, rate: s.rate, ending: end, growth: end - totalContributions }
    })
    return { ending, endingNoFees, totalContributions, totalGrowth, feeCost, realEnding, rows, series, scenarioRows }
  }, [initial, monthly, years, ret, fees, inflation])

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div>
        <label className="text-sm font-semibold block mb-3">Return Scenario</label>
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((s) => (
            <button key={s.name} type="button" onClick={() => pickScenario(s.name, s.rate)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${scenario === s.name && ret === s.rate ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-card hover:border-[#064E3B]'}`}>{s.name} {s.rate}%</button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">Picking a scenario sets the return slider — you can still adjust the slider freely afterwards.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MoneyInput label="Initial Investment" value={initial} onChange={setInitial} />
        <MoneyInput label="Monthly Contribution" value={monthly} onChange={setMonthly} />
      </div>
      <NumInput label="Years to Grow" value={years} onChange={(v) => setYears(Math.min(60, Math.max(0, v)))} min={0} max={60} hint="Up to 60 years." />
      <PctSlider label="Expected Annual Return" value={ret} onChange={(v) => { setRet(v) }} min={0} max={15} step={0.25} />
      <PctSlider label="Annual Fees (Expense Ratio)" value={fees} onChange={setFees} min={0} max={3} step={0.05} />
      <PctSlider label="Inflation (for real, inflation-adjusted result)" value={inflation} onChange={setInflation} min={0} max={8} step={0.1} />
      {ret - fees < 0 && <p className="text-sm text-red-600 font-semibold">Warning: fees ({fees}%) exceed the expected return ({ret}%), so the portfolio shrinks in nominal terms before contributions.</p>}
      {years === 0 && <p className="text-sm text-amber-700 font-semibold">Set at least 1 year to see growth, fee drag and the year-by-year table.</p>}
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Projected Ending Balance">
        <div className="text-4xl font-black font-mono">{fmt(calc.ending)}</div>
        <p className="text-white/80 mt-2 text-sm">after {years} years at {ret}% return minus {fees}% fees ({(ret - fees).toFixed(2)}% net)</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Contributions</p><p className="font-mono text-xl font-bold">{fmt(calc.totalContributions)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Growth</p><p className="font-mono text-xl font-bold">{fmt(calc.totalGrowth)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Real Balance (after {inflation}% inflation)</p><p className="font-mono text-xl font-bold">{fmt(calc.realEnding)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Balance With 0% Fees</p><p className="font-mono text-xl font-bold">{fmt(calc.endingNoFees)}</p></div>
        </div>
      </ResultCard>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-2xl p-6">
        <h4 className="font-bold text-amber-900 dark:text-amber-200">Fees cost you {fmt(calc.feeCost)} over {years} years</h4>
        <p className="text-sm text-amber-800 dark:text-amber-300 mt-2 leading-relaxed">At a {fees}% annual expense ratio, the same investments would have reached {fmt(calc.endingNoFees)} with no fees at all. That {fmt2(calc.feeCost)} gap is not just the fees paid — it is the fees plus all the growth those fees would have earned. In today&apos;s money your ending balance is worth {fmt(calc.realEnding)} after {inflation}% inflation.</p>
      </div>

      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Scenario Comparison (same inputs, net of {fees}% fees)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left"><th className="py-2 pr-2 font-semibold">Scenario</th><th className="py-2 pr-2 font-semibold text-right">Return</th><th className="py-2 font-semibold text-right">Ending Balance</th></tr></thead>
            <tbody className="font-mono">
              {calc.scenarioRows.map((s) => (<tr key={s.name} className={`border-b last:border-0 ${ret === s.rate ? 'font-bold' : ''}`}><td className="py-2 pr-2 font-sans">{s.name}{ret === s.rate ? ' ← selected' : ''}</td><td className="py-2 pr-2 text-right">{s.rate}%</td><td className="py-2 text-right">{fmt(s.ending)}</td></tr>))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Growth: Net of Fees vs No Fees</h4>
        <ResponsiveContainer width="100%" height={220}><LineChart data={calc.series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt2(Number(v))} /><Legend /><Line type="monotone" dataKey="net" stroke="#064E3B" strokeWidth={2} dot={false} name="Net of fees" /><Line type="monotone" dataKey="noFees" stroke="#D97706" strokeWidth={2} dot={false} name="0% fees" /></LineChart></ResponsiveContainer></div>

      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Year-by-Year Breakdown</h4>
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left"><th className="py-2 pr-2 font-semibold">Year</th><th className="py-2 pr-2 font-semibold text-right">Contributed</th><th className="py-2 pr-2 font-semibold text-right">Balance (net)</th><th className="py-2 font-semibold text-right">Growth</th></tr></thead>
            <tbody className="font-mono">
              {calc.rows.map((r) => (<tr key={r.year} className="border-b last:border-0"><td className="py-2 pr-2 font-sans font-semibold">{r.year}</td><td className="py-2 pr-2 text-right">{fmt(r.contributions)}</td><td className="py-2 pr-2 text-right">{fmt(r.balance)}</td><td className="py-2 text-right">{fmt(r.balance - r.contributions)}</td></tr>))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Past performance does not guarantee future results. This projection assumes a smooth return every month and is educational only, not investment advice.</p>
      </div>
    </div></div><ToolActionsBar slug="investment-calculator" isPro={isPro} inputs={{ initial, monthly, years, ret, fees, inflation, scenario }} /></>)
}
