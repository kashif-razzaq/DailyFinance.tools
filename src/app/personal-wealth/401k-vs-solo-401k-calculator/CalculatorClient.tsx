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
  const [age, setAge] = useState(35); const [retireAge, setRetireAge] = useState(65)
  const [balance, setBalance] = useState(40000); const [comp, setComp] = useState(120000)
  const [employee, setEmployee] = useState(15000); const [matchPct, setMatchPct] = useState(4)
  const [profitShare, setProfitShare] = useState(15000); const [ret, setRet] = useState(7)
  const EMP_LIMIT = 24500, COMBINED_LIMIT = 72000, CATCHUP = 7500
  const empCapped = Math.min(employee, EMP_LIMIT + (age >= 50 ? CATCHUP : 0))
  const r = useMemo(() => {
    const years = Math.max(0, retireAge - age), rate = ret / 100
    const w2Annual = empCapped + comp * matchPct / 100
    const soloEmployer = Math.min(profitShare, COMBINED_LIMIT - empCapped)
    const soloAnnual = empCapped + Math.max(0, soloEmployer)
    const proj = (annual: number) => balance * Math.pow(1 + rate, years) + (rate > 0 ? annual * ((Math.pow(1 + rate, years) - 1) / rate) : annual * years)
    const chart = Array.from({ length: years + 1 }, (_, y) => ({ age: age + y, w2: Math.round(balance * Math.pow(1 + rate, y) + (rate > 0 ? w2Annual * ((Math.pow(1 + rate, y) - 1) / rate) : 0)), solo: Math.round(balance * Math.pow(1 + rate, y) + (rate > 0 ? soloAnnual * ((Math.pow(1 + rate, y) - 1) / rate) : 0)) }))
    return { years, w2Annual, soloAnnual, w2: proj(w2Annual), solo: proj(soloAnnual), chart, soloEmployer }
  }, [age, retireAge, balance, comp, empCapped, matchPct, profitShare, ret])
  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Current 401(k) Balance" value={balance} onChange={setBalance} /><MoneyInput label="Annual Salary / Self-Employment Compensation" value={comp} onChange={setComp} /></div>
      <MoneyInput label="Your Annual Employee Contribution" value={employee} onChange={setEmployee} hint={`2026 employee limit: $24,500${age >= 50 ? ' + $7,500 catch-up (age 50+) = $32,000' : ''}. Combined employee + employer limit: $72,000 (2026 figures — check IRS.gov for current limits).`} />
      <PctSlider label="Employer Match (% of salary, W-2 scenario)" value={matchPct} onChange={setMatchPct} min={0} max={10} step={0.5} />
      <MoneyInput label="Solo 401(k) Employer Profit-Sharing Contribution" value={profitShare} onChange={setProfitShare} hint="As your own employer you can add profit-sharing on top of the employee contribution, up to the combined limit." />
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Current Age</label><span className="font-mono font-bold">{age}</span></div><Slider value={[age]} min={20} max={70} step={1} onValueChange={(v: any) => setAge(Array.isArray(v) ? v[0] : v)} /></div>
        <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Retirement Age</label><span className="font-mono font-bold">{retireAge}</span></div><Slider value={[retireAge]} min={45} max={80} step={1} onValueChange={(v: any) => setRetireAge(Array.isArray(v) ? v[0] : v)} /></div></div>
      <PctSlider label="Expected Annual Return" value={ret} onChange={setRet} min={1} max={12} step={0.25} />
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`Projected Balance at ${retireAge}`}>
        <div className="space-y-4">
          <div><p className="text-white/60 text-xs uppercase font-bold">W-2 401(k) — {fmt(r.w2Annual)}/yr in</p><p className="font-mono text-3xl font-black">{fmt(r.w2)}</p></div>
          <div className="pt-4 border-t border-white/20"><p className="text-white/60 text-xs uppercase font-bold">Solo 401(k) — {fmt(r.soloAnnual)}/yr in</p><p className="font-mono text-3xl font-black">{fmt(r.solo)}</p></div>
          <p className="text-white/80 text-sm">Solo advantage in this scenario: <span className="font-mono font-bold">{fmt(r.solo - r.w2)}</span>. The Solo employer contribution applied is {fmt(r.soloEmployer)} after the combined-limit cap.</p>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Growth Comparison</h4>
        <ResponsiveContainer width="100%" height={220}><AreaChart data={r.chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="age" /><YAxis tickFormatter={(v: number) => '$' + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Area type="monotone" dataKey="w2" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.15} name="W-2 401(k)" /><Area type="monotone" dataKey="solo" stroke="#064E3B" fill="#064E3B" fillOpacity={0.2} name="Solo 401(k)" /></AreaChart></ResponsiveContainer></div>
    </div></div>)
}
