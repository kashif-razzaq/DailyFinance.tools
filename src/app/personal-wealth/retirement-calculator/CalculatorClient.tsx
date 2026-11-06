/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const fmt2 = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
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

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [currentAge, setCurrentAge] = useState(35)
  const [retireAge, setRetireAge] = useState(65)
  const [savings, setSavings] = useState(50000)
  const [monthly, setMonthly] = useState(500)
  const [ret, setRet] = useState(7)
  const [spending, setSpending] = useState(40000)
  const [life, setLife] = useState(90)

  // Formula: balance compounds monthly: B = B x (1 + r/12) + monthly contribution, each month to retirement.
  // Target (simple drawdown) = annual spending x years in retirement. 4%-rule target = spending x 25.
  // Extra monthly saving to close a shortfall: PMT = FV x r / ((1 + r)^n - 1), or FV / n when r = 0.
  const r = useMemo(() => {
    const yearsToRet = Math.max(0, retireAge - currentAge)
    const months = Math.round(yearsToRet * 12)
    const mr = ret / 100 / 12
    let bal = Math.max(0, savings)
    const series: { age: number; balance: number }[] = [{ age: currentAge, balance: Math.round(bal) }]
    for (let y = 1; y <= Math.floor(yearsToRet); y++) {
      for (let m = 0; m < 12; m++) bal = bal * (1 + mr) + Math.max(0, monthly)
      series.push({ age: currentAge + y, balance: Math.round(bal) })
    }
    // Partial final year if retirement age is not a whole number of years away (kept simple: months already handled above)
    const projected = bal
    const yearsInRet = Math.max(0, life - retireAge)
    const target = Math.max(0, spending) * yearsInRet
    const target25 = Math.max(0, spending) * 25
    const shortfall = Math.max(0, target - projected)
    const onTrack = projected >= target
    const sustainableMonthly = yearsInRet > 0 ? projected / (yearsInRet * 12) : 0
    let extraMonthly = 0
    if (shortfall > 0) {
      if (months <= 0) extraMonthly = shortfall // no time left: the whole gap would be needed now
      else if (mr === 0) extraMonthly = shortfall / months
      else extraMonthly = shortfall * mr / (Math.pow(1 + mr, months) - 1)
    }
    return { yearsToRet, series, projected, yearsInRet, target, target25, shortfall, onTrack, sustainableMonthly, extraMonthly }
  }, [currentAge, retireAge, savings, monthly, ret, spending, life])

  const invalid = retireAge <= currentAge || life <= retireAge

  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2"><label className="text-sm font-semibold">Current Age</label><Input type="number" value={currentAge === 0 ? '' : currentAge} onChange={(e) => setCurrentAge(num(e.target.value))} className="font-mono" /></div>
        <div className="space-y-2"><label className="text-sm font-semibold">Retirement Age</label><Input type="number" value={retireAge === 0 ? '' : retireAge} onChange={(e) => setRetireAge(num(e.target.value))} className="font-mono" /></div>
        <div className="space-y-2"><label className="text-sm font-semibold">Life Expectancy</label><Input type="number" value={life === 0 ? '' : life} onChange={(e) => setLife(num(e.target.value))} className="font-mono" /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MoneyInput label="Current Savings" value={savings} onChange={setSavings} />
        <MoneyInput label="Monthly Contribution" value={monthly} onChange={setMonthly} />
      </div>
      <MoneyInput label="Annual Spending in Retirement" value={spending} onChange={setSpending} hint="What you expect to spend per year once retired, in today's dollars." />
      <PctSlider label="Annual Return" value={ret} onChange={setRet} min={0} max={12} step={0.1} />
      {invalid && <p className="text-sm text-red-600 font-semibold">Check your ages: retirement age must be after your current age, and life expectancy after retirement age.</p>}
      <p className="text-xs text-muted-foreground">Assumption: the simple-drawdown target spreads your nest egg evenly over retirement with no growth after retirement. The 25× (4% rule) figure is shown alongside for comparison.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Projected Nest Egg at Retirement">
        <div className="text-4xl font-black font-mono">{fmt(r.projected)}</div>
        <p className="text-white/80 mt-2 text-sm">at age {retireAge}, in {r.yearsToRet} years {isPro ? '' : ''}</p>
        <p className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-bold ${r.onTrack ? 'bg-emerald-400/30 text-emerald-100' : 'bg-red-400/30 text-red-100'}`}>{r.onTrack ? '✓ On track vs your drawdown target' : `Shortfall of ${fmt(r.shortfall)}`}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Target (spending × {r.yearsInRet} yrs)</p><p className="font-mono text-xl font-bold">{fmt(r.target)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Target (25× / 4% rule)</p><p className="font-mono text-xl font-bold">{fmt(r.target25)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Sustainable Income / Mo</p><p className="font-mono text-xl font-bold">{fmt(r.sustainableMonthly)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Extra Saving Needed / Mo</p><p className="font-mono text-xl font-bold">{r.shortfall > 0 ? fmt(r.extraMonthly) : '$0'}</p></div>
        </div>
        <p className="mt-6 pt-4 border-t border-white/20 text-sm text-white/90">Income replacement: your nest egg supports about {fmt(r.sustainableMonthly)}/month for {r.yearsInRet} years of retirement, versus the {fmt(spending / 12)}/month your spending target implies.</p>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Balance by Age</h4>
        <ResponsiveContainer width="100%" height={220}><AreaChart data={r.series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="age" /><YAxis tickFormatter={(v: number) => '$' + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt2(Number(v))} /><Area type="monotone" dataKey="balance" stroke="#064E3B" fill="#064E3B" fillOpacity={0.25} name="Balance" /></AreaChart></ResponsiveContainer></div>
    </div></div>)
}
