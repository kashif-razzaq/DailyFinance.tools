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
  const [age, setAge] = useState(30); const [retireAge, setRetireAge] = useState(65)
  const [invested, setInvested] = useState(50000); const [spending, setSpending] = useState(50000)
  const [ret, setRet] = useState(7); const [monthly, setMonthly] = useState(500)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.age !== undefined) setAge(s.age as any)
    if (s.retireAge !== undefined) setRetireAge(s.retireAge as any)
    if (s.invested !== undefined) setInvested(s.invested as any)
    if (s.spending !== undefined) setSpending(s.spending as any)
    if (s.ret !== undefined) setRet(s.ret as any)
    if (s.monthly !== undefined) setMonthly(s.monthly as any)
  })

  const r = useMemo(() => {
    const years = Math.max(0, retireAge - age)
    const fire = spending * 25
    const coast = years > 0 ? fire / Math.pow(1 + ret / 100, years) : fire
    const projectedNoContrib = invested * Math.pow(1 + ret / 100, years)
    // months of contributions needed to reach coast number from current invested
    let bal = invested, months = 0; const mr = ret / 100 / 12
    while (bal < coast && months < 1200) { bal = bal * (1 + mr) + monthly; months++ }
    const chart = Array.from({ length: years + 1 }, (_, y) => ({ year: age + y, value: Math.round(invested * Math.pow(1 + ret / 100, y)) }))
    return { years, fire, coast, projectedNoContrib, months, chart, reached: invested >= coast }
  }, [age, retireAge, invested, spending, ret, monthly])
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Already Invested" value={invested} onChange={setInvested} hint="Across 401(k), IRA and brokerage accounts." />
      <MoneyInput label="Annual Spending in Retirement" value={spending} onChange={setSpending} hint="Your FIRE number is 25 times this amount." /></div>
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Current Age</label><span className="font-mono font-bold">{age}</span></div><Slider value={[age]} min={18} max={70} step={1} onValueChange={(v: any) => setAge(Array.isArray(v) ? v[0] : v)} /></div>
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Retirement Age</label><span className="font-mono font-bold">{retireAge}</span></div><Slider value={[retireAge]} min={40} max={80} step={1} onValueChange={(v: any) => setRetireAge(Array.isArray(v) ? v[0] : v)} /></div>
      <PctSlider label="Expected Annual Return" value={ret} onChange={setRet} min={1} max={12} step={0.25} />
      <MoneyInput label="Monthly Contribution (to find your Coast date)" value={monthly} onChange={setMonthly} />
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Your Coast FIRE Number">
        <div className="text-5xl font-black font-mono">{fmt(r.coast)}</div>
        <p className="text-white/80 mt-3 text-sm">Invest this much by age {age} and, with no further contributions, compounding should grow it to your full FIRE number of <span className="font-mono font-bold">{fmt(r.fire)}</span> by age {retireAge}.</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Full FIRE Number</p><p className="font-mono text-xl font-bold">{fmt(r.fire)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Gap to Coast</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, r.coast - invested))}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Invested Today Grows To</p><p className="font-mono text-xl font-bold">{fmt(r.projectedNoContrib)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Status</p><p className="text-xl font-bold">{r.reached ? 'Already Coasting' : `Coast in ~${Math.ceil(r.months / 12)} yrs at ${fmt(monthly)}/mo`}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Growth With No Further Contributions</h4>
        <ResponsiveContainer width="100%" height={220}><AreaChart data={r.chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Area type="monotone" dataKey="value" stroke="#064E3B" fill="#064E3B" fillOpacity={0.15} name="Portfolio" /></AreaChart></ResponsiveContainer></div>
    <ToolActionsBar slug="coast-fire-calculator" isPro={isPro} inputs={{ age, retireAge, invested, spending, ret, monthly }} />
    </div></div></>)
}
