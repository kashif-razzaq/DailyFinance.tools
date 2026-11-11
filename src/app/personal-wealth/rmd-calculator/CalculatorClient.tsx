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

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

// IRS Uniform Lifetime Table (2022+, Treas. Reg. §1.401(a)(9)-9) — distribution period by age.
// Ages below 72 are not in the table; age 120+ uses 2.0.
const UNIFORM_LIFETIME_TABLE: Record<number, number> = {
  72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1, 80: 20.2,
  81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4, 88: 13.7, 89: 12.9, 90: 12.2,
  91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9, 96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4,
  101: 6.0, 102: 5.6, 103: 5.2, 104: 4.9, 105: 4.6, 106: 4.3, 107: 4.1, 108: 3.9, 109: 3.7, 110: 3.5,
  111: 3.4, 112: 3.3, 113: 3.1, 114: 3.0, 115: 2.9, 116: 2.8, 117: 2.7, 118: 2.5, 119: 2.3, 120: 2.0,
}
function divisorForAge(age: number): number {
  if (age >= 120) return 2.0
  return UNIFORM_LIFETIME_TABLE[age] ?? 27.4
}

// Formula: RMD for a year = prior December 31 balance / Uniform Lifetime Table divisor for that age.
// 10-year projection: each year the RMD is calculated on the starting (prior Dec 31) balance,
//  then the projected year-end balance = starting balance x (1 + return) - RMD.
//  Ages before 73 have no RMD under SECURE 2.0, so their RMD is $0 and the balance simply grows.

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [age, setAge] = useState(73)
  const [balance, setBalance] = useState(500000)
  const [ret, setRet] = useState(5)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.age !== undefined) setAge(s.age as any)
    if (s.balance !== undefined) setBalance(s.balance as any)
    if (s.ret !== undefined) setRet(s.ret as any)
  })


  const calc = useMemo(() => {
    const startAge = Math.min(100, Math.max(60, age || 60))
    const divisor = divisorForAge(startAge)
    const required = startAge >= 73
    const rmdNow = required && divisor > 0 ? balance / divisor : 0
    const pctNow = balance > 0 ? (rmdNow / balance) * 100 : 0
    type Row = { age: number; divisor: number | null; rmd: number; pct: number; startBalance: number; endBalance: number }
    const rows: Row[] = []
    let bal = balance
    let totalRmd = 0
    for (let i = 0; i < 10; i++) {
      const a = startAge + i
      const d = a >= 73 ? divisorForAge(a) : null
      const rmd = d ? bal / d : 0
      const pct = bal > 0 ? (rmd / bal) * 100 : 0
      const end = Math.max(0, bal * (1 + ret / 100) - rmd)
      rows.push({ age: a, divisor: d, rmd, pct, startBalance: bal, endBalance: end })
      totalRmd += rmd
      bal = end
    }
    return { startAge, divisor, required, rmdNow, pctNow, rows, totalRmd, endBalance: bal }
  }, [age, balance, ret])

  const chartData = calc.rows.map((r) => ({ name: String(r.age), rmd: Math.round(r.rmd), balance: Math.round(r.endBalance) }))

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <NumInput label="Your Age This Year" value={age} onChange={(v) => setAge(Math.min(100, Math.max(60, v)))} min={60} max={100} hint="RMDs currently begin at age 73. You can model ages 60–100; the full IRS table in the code runs to 120+." />
      <MoneyInput label="Account Balance (Prior December 31)" value={balance} onChange={setBalance} hint="The IRS uses your balance on December 31 of the previous year — not today's balance." />
      <PctSlider label="Expected Annual Return" value={ret} onChange={setRet} min={0} max={12} step={0.25} />
      {!calc.required && <p className="text-sm text-amber-700 font-semibold">No RMD is required yet at age {calc.startAge} — required minimum distributions begin at age 73 (75 from 2033 for younger cohorts) under SECURE 2.0. The projection below shows $0 RMDs until age 73, then your first required amounts.</p>}
      {balance === 0 && <p className="text-sm text-red-600 font-semibold">Enter a prior December 31 balance to calculate an RMD.</p>}
      <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
        <strong className="text-foreground">How it works:</strong> RMD = prior December 31 balance ÷ the IRS Uniform Lifetime Table divisor for your age. At age {calc.startAge} the divisor is {calc.required ? calc.divisor : '— (not yet required)'}.
        <span className="block mt-2"><strong className="text-foreground">Note:</strong> the RMD age is 73 (75 from 2033) under SECURE 2.0; this is an estimate only. It assumes the Uniform Lifetime Table applies — a spouse more than 10 years younger who is your sole beneficiary uses a different table, and inherited IRAs, Roth IRAs (no lifetime RMDs for the owner), still-working exceptions and QCDs are not modelled. Penalties for missing an RMD are severe, so confirm your figure with your custodian or a tax adviser.</span>
      </div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={calc.required ? 'Your Required Minimum Distribution' : 'No RMD Required Yet'}>
        <div className="text-4xl font-black font-mono">{fmt(calc.rmdNow)}</div>
        <p className="text-white/80 mt-2 text-sm">{calc.required ? `to withdraw this year at age ${calc.startAge}` : `at age ${calc.startAge} — first RMD arrives at 73`}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">IRS Divisor (age {calc.startAge})</p><p className="font-mono text-xl font-bold">{calc.required ? calc.divisor : '—'}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">RMD as % of Balance</p><p className="font-mono text-xl font-bold">{calc.pctNow.toFixed(2)}%</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total RMDs, Next 10 Years</p><p className="font-mono text-xl font-bold">{fmt(calc.totalRmd)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Projected Balance in 10 Years</p><p className="font-mono text-xl font-bold">{fmt(calc.endBalance)}</p></div>
        </div>
      </ResultCard>

      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">10-Year RMD Projection</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left"><th className="py-2 pr-2 font-semibold">Age</th><th className="py-2 pr-2 font-semibold text-right">Divisor</th><th className="py-2 pr-2 font-semibold text-right">RMD</th><th className="py-2 pr-2 font-semibold text-right">% of Bal.</th><th className="py-2 font-semibold text-right">Year-End Balance</th></tr></thead>
            <tbody className="font-mono">
              {calc.rows.map((r) => (<tr key={r.age} className="border-b last:border-0"><td className="py-2 pr-2 font-sans font-semibold">{r.age}</td><td className="py-2 pr-2 text-right">{r.divisor ?? '—'}</td><td className="py-2 pr-2 text-right">{fmt(r.rmd)}</td><td className="py-2 pr-2 text-right">{r.pct.toFixed(1)}%</td><td className="py-2 text-right">{fmt(r.endBalance)}</td></tr>))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">Each year&apos;s RMD is calculated on that year&apos;s starting balance (the prior December 31 balance), then the balance grows by {ret}% and the RMD is withdrawn to give the year-end balance. Total RMDs over the 10 years: <span className="font-mono font-bold text-foreground">{fmt2(calc.totalRmd)}</span>. As the divisor shrinks with age, the RMD rises as a share of the balance even when the dollar amount falls.</p>
      </div>

      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Annual RMD by Age</h4>
        <ResponsiveContainer width="100%" height={200}><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" label={{ value: 'Age', position: 'insideBottom', offset: -2 }} /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Bar dataKey="rmd" fill="#064E3B" name="RMD" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
    <ToolActionsBar slug="rmd-calculator" isPro={isPro} inputs={{ age, balance, ret }} />
    </div></div></>)
}
