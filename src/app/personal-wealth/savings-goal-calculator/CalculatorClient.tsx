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

const PRESETS = [
  { label: 'House deposit $50k', amount: 50000 },
  { label: 'Car $25k', amount: 25000 },
  { label: 'Vacation $5k', amount: 5000 },
  { label: 'Emergency fund $15k', amount: 15000 },
  { label: 'Wedding $30k', amount: 30000 },
]

// Formula Mode A: PMT = (FV − PV(1+i)^n) × i / ((1+i)^n − 1), i = APY/12, n = years×12; if i=0, PMT = (FV−PV)/n
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [mode, setMode] = useState<'monthly' | 'time'>('monthly')
  const [goal, setGoal] = useState(50000)
  const [current, setCurrent] = useState(5000)
  const [apy, setApy] = useState(4.5)
  const [targetYears, setTargetYears] = useState(5)
  const [monthlyAmount, setMonthlyAmount] = useState(500)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.mode !== undefined) setMode(s.mode as any)
    if (s.goal !== undefined) setGoal(s.goal as any)
    if (s.current !== undefined) setCurrent(s.current as any)
    if (s.apy !== undefined) setApy(s.apy as any)
    if (s.targetYears !== undefined) setTargetYears(s.targetYears as any)
    if (s.monthlyAmount !== undefined) setMonthlyAmount(s.monthlyAmount as any)
  })


  const calc = useMemo(() => {
    const i = apy / 100 / 12
    const n = Math.max(1, Math.round((targetYears || 0) * 12))
    let pmt = 0
    if (goal <= current) pmt = 0
    else if (i === 0) pmt = (goal - current) / n
    else {
      const factor = Math.pow(1 + i, n)
      pmt = (goal - current * factor) * i / (factor - 1)
      if (pmt < 0) pmt = 0
    }

    // Mode B simulation, cap 600 months
    let bal = current || 0
    let monthsToGoal = goal <= current ? 0 : -1
    const effectiveMonthly = mode === 'monthly' ? pmt : monthlyAmount
    // Simulate for chart using the relevant monthly amount
    const simMonthly = mode === 'monthly' ? pmt : monthlyAmount
    let simBal = current || 0
    const series: { month: number; balance: number; goal: number }[] = [{ month: 0, balance: Math.round(simBal), goal }]
    let simMonths = 0
    if (goal <= current) {
      monthsToGoal = 0
    } else {
      let b = current || 0
      for (let m = 1; m <= 600; m++) {
        b = b * (1 + i) + (monthlyAmount || 0)
        if (b >= goal) { monthsToGoal = m; bal = b; break }
        bal = b
      }
    }
    // Chart series: simulate up to goal or target horizon
    const horizon = mode === 'monthly' ? n : (monthsToGoal > 0 ? monthsToGoal : 600)
    const cappedHorizon = Math.min(600, Math.max(1, horizon))
    simBal = current || 0
    simMonths = 0
    // Rebuild yearly-ish points (every 12 months + final)
    for (let m = 1; m <= cappedHorizon; m++) {
      simBal = simBal * (1 + i) + simMonthly
      simMonths = m
      if (m % 12 === 0 || m === cappedHorizon || simBal >= goal) {
        series.push({ month: m, balance: Math.round(Math.min(simBal, Math.max(goal * 1.05, simBal))), goal })
        if (simBal >= goal && mode === 'time') break
      }
    }
    const neverReaches = mode === 'time' && goal > current && monthsToGoal === -1
    const warnNever = neverReaches && apy === 0 && monthlyAmount === 0
    const progressPct = goal > 0 ? Math.min(100, Math.max(0, (current / goal) * 100)) : 0
    return { pmt, monthsToGoal, neverReaches, warnNever, series, progressPct, effectiveMonthly: simMonthly }
  }, [goal, current, apy, targetYears, monthlyAmount, mode])

  const yearsMonthsLabel = calc.monthsToGoal >= 0 ? `${Math.floor(calc.monthsToGoal / 12)}y ${calc.monthsToGoal % 12}m (${calc.monthsToGoal} months)` : 'Not within 50 years'

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div>
        <label className="text-sm font-semibold block mb-2">What do you want to calculate?</label>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setMode('monthly')} className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${mode === 'monthly' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background'}`}>Monthly amount needed</button>
          <button type="button" onClick={() => setMode('time')} className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${mode === 'time' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background'}`}>Time to goal</button>
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold block mb-2">Goal presets</label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.label} type="button" onClick={() => setGoal(p.amount)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${goal === p.amount ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:bg-muted'}`}>{p.label}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MoneyInput label="Savings Goal Amount" value={goal} onChange={setGoal} />
        <MoneyInput label="Current Savings" value={current} onChange={setCurrent} />
      </div>
      <PctSlider label="Annual Return / APY" value={apy} onChange={setApy} min={0} max={12} step={0.1} />
      {mode === 'monthly' ? (
        <div className="space-y-2">
          <label className="text-sm font-semibold">Target Time (Years)</label>
          <Input type="number" value={targetYears === 0 ? '' : targetYears} onChange={(e) => setTargetYears(num(e.target.value))} className="font-mono" min={0} max={50} />
          <p className="text-xs text-muted-foreground">How long until you need the money?</p>
        </div>
      ) : (
        <MoneyInput label="Monthly Amount You Can Save" value={monthlyAmount} onChange={setMonthlyAmount} hint="We simulate month by month until you hit the goal (max 50 years)." />
      )}
      {calc.warnNever && <p className="text-sm text-red-600 font-semibold">Warning: with $0/month and 0% APY you can never reach this goal — increase the monthly amount or add a return.</p>}
      {mode === 'time' && calc.neverReaches && !calc.warnNever && <p className="text-sm text-amber-600 font-semibold">At this pace the goal is not reached within 50 years (600 months). Try a higher monthly amount or APY.</p>}
      {goal <= current && <p className="text-sm text-emerald-700 font-semibold">You have already reached this goal with your current savings.</p>}
    </div>
    <div className="lg:col-span-5 space-y-6">
      {mode === 'monthly' ? (
        <ResultCard title="Monthly Amount Needed">
          <div className="text-4xl font-black font-mono">{fmt(calc.pmt)}<span className="text-lg font-bold">/mo</span></div>
          <p className="text-white/80 mt-2 text-sm">to reach {fmt(goal)} in {targetYears || 0} years from {fmt(current)} at {apy}% APY</p>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
            <div><p className="text-white/60 text-xs uppercase font-bold">Goal</p><p className="font-mono text-xl font-bold">{fmt(goal)}</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Already Saved</p><p className="font-mono text-xl font-bold">{fmt(current)} ({calc.progressPct.toFixed(0)}%)</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Still Needed</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, goal - current))}</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Total You Will Save</p><p className="font-mono text-xl font-bold">{fmt(calc.pmt * Math.max(1, Math.round((targetYears || 0) * 12)))}</p></div>
          </div>
        </ResultCard>
      ) : (
        <ResultCard title="Time to Goal">
          <div className="text-4xl font-black font-mono">{calc.monthsToGoal >= 0 ? yearsMonthsLabel : '50+ years'}</div>
          <p className="text-white/80 mt-2 text-sm">saving {fmt(monthlyAmount)}/month at {apy}% APY toward {fmt(goal)}</p>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
            <div><p className="text-white/60 text-xs uppercase font-bold">Goal</p><p className="font-mono text-xl font-bold">{fmt(goal)}</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Already Saved</p><p className="font-mono text-xl font-bold">{fmt(current)} ({calc.progressPct.toFixed(0)}%)</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Monthly Saving</p><p className="font-mono text-xl font-bold">{fmt(monthlyAmount)}</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Progress</p><p className="font-mono text-xl font-bold">{calc.progressPct.toFixed(1)}%</p></div>
          </div>
        </ResultCard>
      )}
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Progress Toward Goal</h4>
        <div className="w-full bg-muted rounded-full h-3 mb-4 overflow-hidden"><div className="bg-[#064E3B] h-3 rounded-full" style={{ width: `${calc.progressPct}%` }} /></div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={calc.series}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -2 }} />
            <YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} width={55} />
            <Tooltip formatter={(v: any) => fmt(Number(v))} />
            <Legend />
            <Line type="monotone" dataKey="balance" stroke="#064E3B" strokeWidth={2.5} dot={false} name="Balance" />
            <Line type="monotone" dataKey="goal" stroke="#D97706" strokeWidth={2} strokeDasharray="6 4" dot={false} name="Goal" />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2">{isPro ? 'Pro view: ' : ''}Chart simulates monthly growth at {apy}% APY with {fmt(calc.effectiveMonthly)}/month contributions.</p>
      </div>
    </div>
  </div><ToolActionsBar slug="savings-goal-calculator" isPro={isPro} inputs={{ mode, goal, current, apy, targetYears, monthlyAmount }} /></>)
}
