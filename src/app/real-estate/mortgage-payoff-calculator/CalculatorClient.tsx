/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
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
// Standard amortising payment: M = P * r(1+r)^n / ((1+r)^n - 1)
function piPayment(principal: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12, n = years * 12
  if (principal <= 0) return 0
  if (r === 0) return principal / n
  const f = Math.pow(1 + r, n)
  return principal * r * f / (f - 1)
}
// Month-by-month simulation; extra monthly payment and an optional one-off lump sum go straight to principal
function simulate(balance: number, ratePct: number, payment: number, extra: number, lump: number) {
  let bal = balance, months = 0, interest = 0; const yearly = new Map<number, number>()
  const mr = ratePct / 100 / 12
  if (lump > 0) bal = Math.max(0, bal - lump)
  while (bal > 0 && months < 600) { const i = bal * mr; interest += i; bal = bal + i - payment - extra; months++; if (months % 12 === 0 || bal <= 0) yearly.set(Math.ceil(months / 12), Math.round(Math.max(0, bal))) }
  return { months, interest, yearly }
}
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [loan, setLoan] = useState(340000); const [rate, setRate] = useState(6.5); const [term, setTerm] = useState(30)
  const [extra, setExtra] = useState(200); const [lump, setLump] = useState(0)
  const payment = useMemo(() => piPayment(loan, rate, term), [loan, rate, term])
  const base = useMemo(() => simulate(loan, rate, payment, 0, 0), [loan, rate, payment])
  const fast = useMemo(() => simulate(loan, rate, payment, extra, lump), [loan, rate, payment, extra, lump])
  const chart = useMemo(() => {
    const years = Math.max(base.yearly.size, fast.yearly.size); const rows: any[] = [{ year: 0, Baseline: loan, Accelerated: Math.max(0, loan - lump) }]
    for (let y = 1; y <= years; y++) rows.push({ year: y, Baseline: base.yearly.get(y) ?? 0, Accelerated: fast.yearly.get(y) ?? 0 })
    return rows
  }, [base, fast, loan, lump])
  const dateStr = (m: number) => { const d = new Date(); d.setMonth(d.getMonth() + m); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  const yrs = (m: number) => (m / 12).toFixed(1) + ' yrs'
  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Loan Amount" value={loan} onChange={setLoan} /><MoneyInput label="Extra Payment (per month)" value={extra} onChange={setExtra} hint="Extra goes 100% to principal." /></div>
      <PctSlider label="Interest Rate" value={rate} onChange={setRate} min={0} max={15} step={0.125} />
      <div className="space-y-2"><label className="text-sm font-semibold">Original Loan Term</label>
        <div className="flex gap-2">{[30, 20, 15].map(y => (<button key={y} onClick={() => setTerm(y)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${term === y ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>{y} yr</button>))}</div></div>
      <MoneyInput label="One-Off Lump Sum (optional)" value={lump} onChange={setLump} hint="A single extra payment made now, e.g. from a bonus or tax refund." />
      <p className="text-sm text-muted-foreground">Your contractual payment on this loan is <strong className="font-mono">{fmt(payment)}/mo</strong> (principal &amp; interest).</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Mortgage-Free Date With Extra Payments">
        <div className="text-4xl font-black font-mono">{dateStr(fast.months)}</div>
        <p className="text-white/80 mt-2 text-sm">{yrs(fast.months)} instead of {yrs(base.months)} (baseline payoff {dateStr(base.months)})</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest Saved</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, base.interest - fast.interest))}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Time Saved</p><p className="font-mono text-xl font-bold">{Math.max(0, base.months - fast.months)} months</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest (baseline)</p><p className="font-mono text-xl font-bold">{fmt(base.interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest (accelerated)</p><p className="font-mono text-xl font-bold">{fmt(fast.interest)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Balance: Baseline vs Accelerated</h4>
        <ResponsiveContainer width="100%" height={220}><LineChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => '$' + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Legend /><Line type="monotone" dataKey="Baseline" stroke="#9CA3AF" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="Accelerated" stroke="#064E3B" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div>
    </div></div>)
}
