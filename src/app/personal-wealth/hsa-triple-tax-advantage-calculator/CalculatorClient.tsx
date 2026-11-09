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
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [contrib, setContrib] = useState(4400); const [balance, setBalance] = useState(5000)
  const [years, setYears] = useState(20); const [ret, setRet] = useState(7); const [bracket, setBracket] = useState(22)
  const LIMIT_NOTE = '2026 IRS limits used here: $4,400 self-only / $8,750 family, plus $1,000 catch-up at 55+. Limits change — check IRS.gov for the current year.'
  const r = useMemo(() => {
    const rate = ret / 100
    const fv = balance * Math.pow(1 + rate, years) + (rate > 0 ? contrib * ((Math.pow(1 + rate, years) - 1) / rate) : contrib * years)
    const paidIn = balance + contrib * years
    const growth = fv - paidIn
    const contribTaxSaved = contrib * years * bracket / 100
    const growthTaxSaved = growth * bracket / 100
    const ficaSaved = contrib * years * 0.0765
    const chart = Array.from({ length: years + 1 }, (_, y) => ({ year: y, value: Math.round(balance * Math.pow(1 + rate, y) + (rate > 0 ? contrib * ((Math.pow(1 + rate, y) - 1) / rate) : 0)) }))
    return { fv, paidIn, growth, totalSaved: contribTaxSaved + growthTaxSaved + ficaSaved, contribTaxSaved, growthTaxSaved, ficaSaved, chart }
  }, [contrib, balance, years, ret, bracket])
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Current HSA Balance" value={balance} onChange={setBalance} /><MoneyInput label="Annual Contribution" value={contrib} onChange={setContrib} hint={LIMIT_NOTE} /></div>
      <PctSlider label="Marginal Tax Bracket" value={bracket} onChange={setBracket} min={0} max={37} step={1} />
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Years Invested</label><span className="font-mono font-bold">{years} yrs</span></div><Slider value={[years]} min={1} max={40} step={1} onValueChange={(v: any) => setYears(Array.isArray(v) ? v[0] : v)} /></div>
      <PctSlider label="Expected Annual Return" value={ret} onChange={setRet} min={1} max={12} step={0.25} />
      <p className="text-xs text-muted-foreground">Requires a qualifying high-deductible health plan (HDHP). After 65, non-medical withdrawals are taxed like a Traditional IRA — the triple advantage applies to medical spending, which averages very large in retirement.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`Projected HSA Value in ${years} Years`}>
        <div className="text-5xl font-black font-mono">{fmt(r.fv)}</div>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Tax Saved (Est.)</p><p className="font-mono text-xl font-bold">{fmt(r.totalSaved)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Investment Growth</p><p className="font-mono text-xl font-bold">{fmt(r.growth)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Tax Saved on Contributions</p><p className="font-mono text-sm font-bold">{fmt(r.contribTaxSaved)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">FICA Saved (Payroll) + Growth Tax</p><p className="font-mono text-sm font-bold">{fmt(r.ficaSaved + r.growthTaxSaved)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">HSA Growth</h4>
        <ResponsiveContainer width="100%" height={200}><AreaChart data={r.chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Area type="monotone" dataKey="value" stroke="#064E3B" fill="#064E3B" fillOpacity={0.15} name="HSA balance" /></AreaChart></ResponsiveContainer></div>
    </div></div><ToolActionsBar slug="hsa-triple-tax-advantage-calculator" isPro={isPro} inputs={{ contrib, balance, years, ret, bracket }} /></>)
}
