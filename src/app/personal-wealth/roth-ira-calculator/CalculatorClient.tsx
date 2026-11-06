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

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [currentAge, setCurrentAge] = useState(35)
  const [retireAge, setRetireAge] = useState(65)
  const [balance, setBalance] = useState(20000)
  const [annual, setAnnual] = useState(7500)
  const [ret, setRet] = useState(7)
  const [taxRate, setTaxRate] = useState(15)

  const limit = currentAge >= 50 ? 8600 : 7500
  const effectiveAnnual = Math.min(Math.max(0, annual), limit)
  const overLimit = annual > limit

  // Formula (annual compounding): each year B = B x (1 + r) + annual contribution.
  // Taxable comparison: identical after-tax contributions and growth, then earnings
  // (final value - starting balance - total contributions) are taxed once at the tax rate at the end.
  const r = useMemo(() => {
    const years = Math.max(0, Math.floor(retireAge - currentAge))
    let roth = Math.max(0, balance)
    let taxableGross = Math.max(0, balance)
    const series: { age: number; roth: number; taxable: number }[] = []
    const push = (age: number) => {
      const contribSoFar = Math.max(0, balance) + effectiveAnnual * Math.max(0, age - currentAge)
      const growthSoFar = Math.max(0, taxableGross - contribSoFar)
      series.push({ age, roth: Math.round(roth), taxable: Math.round(taxableGross - growthSoFar * taxRate / 100) })
    }
    push(currentAge)
    for (let y = 1; y <= years; y++) {
      roth = roth * (1 + ret / 100) + effectiveAnnual
      taxableGross = taxableGross * (1 + ret / 100) + effectiveAnnual
      push(currentAge + y)
    }
    const totalContributions = effectiveAnnual * years
    const growth = Math.max(0, roth - Math.max(0, balance) - totalContributions)
    const taxDue = growth * taxRate / 100
    const taxableNet = taxableGross - taxDue
    return { years, finalRoth: roth, totalContributions, growth, taxDue, taxableNet, advantage: roth - taxableNet, series }
  }, [currentAge, retireAge, balance, effectiveAnnual, ret, taxRate])

  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2"><label className="text-sm font-semibold">Current Age</label><Input type="number" value={currentAge === 0 ? '' : currentAge} onChange={(e) => setCurrentAge(num(e.target.value))} className="font-mono" /></div>
        <div className="space-y-2"><label className="text-sm font-semibold">Retirement Age</label><Input type="number" value={retireAge === 0 ? '' : retireAge} onChange={(e) => setRetireAge(num(e.target.value))} className="font-mono" /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MoneyInput label="Current Roth IRA Balance" value={balance} onChange={setBalance} />
        <MoneyInput label="Annual Contribution" value={annual} onChange={setAnnual} hint={`2026 limits: $7,500 under 50 / $8,600 age 50+. Your limit at age ${currentAge || '—'} is ${fmt(limit)} — verify current limits with the IRS.`} />
      </div>
      {overLimit && <p className="text-sm text-amber-600 font-semibold">Your contribution exceeds the {fmt(limit)} limit for your age, so the projection uses {fmt(limit)}/year (the clamped limit).</p>}
      {retireAge <= currentAge && <p className="text-sm text-red-600 font-semibold">Retirement age must be after your current age to project growth.</p>}
      <PctSlider label="Annual Return" value={ret} onChange={setRet} min={0} max={12} step={0.1} />
      <PctSlider label="Tax Rate on Taxable Account Earnings" value={taxRate} onChange={setTaxRate} min={0} max={40} step={1} />
      <p className="text-xs text-muted-foreground">Comparison assumption: the taxable brokerage account receives identical after-tax contributions and earns the same return; its earnings are taxed once, at the rate above, at retirement.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Tax-Free Roth IRA Value at Retirement">
        <div className="text-4xl font-black font-mono">{fmt(r.finalRoth)}</div>
        <p className="text-white/80 mt-2 text-sm">at age {retireAge} — yours to withdraw tax-free {isPro ? '' : ''}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Contributions</p><p className="font-mono text-xl font-bold">{fmt(balance + r.totalContributions)}</p><p className="text-white/60 text-xs">incl. starting balance</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Growth</p><p className="font-mono text-xl font-bold">{fmt(r.growth)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Taxable Account (after tax)</p><p className="font-mono text-xl font-bold">{fmt(r.taxableNet)}</p><p className="text-white/60 text-xs">{fmt(r.taxDue)} tax on earnings</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Roth Advantage</p><p className="font-mono text-xl font-bold">{fmt(r.advantage)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Roth vs Taxable by Age</h4>
        <ResponsiveContainer width="100%" height={220}><LineChart data={r.series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="age" /><YAxis tickFormatter={(v: number) => '$' + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt2(Number(v))} /><Legend /><Line type="monotone" dataKey="roth" stroke="#064E3B" strokeWidth={2} dot={false} name="Roth IRA" /><Line type="monotone" dataKey="taxable" stroke="#D97706" strokeWidth={2} dot={false} name="Taxable (after tax)" /></LineChart></ResponsiveContainer></div>
    </div></div>)
}
