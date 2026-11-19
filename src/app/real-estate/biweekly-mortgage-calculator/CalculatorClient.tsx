/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
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
// Standard amortising payment: M = P * r(1+r)^n / ((1+r)^n - 1)
function piPayment(principal: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12, n = years * 12
  if (principal <= 0) return 0
  if (r === 0) return principal / n
  const f = Math.pow(1 + r, n)
  return principal * r * f / (f - 1)
}
// Month-by-month simulation of the standard monthly schedule
function simulateMonthly(balance: number, ratePct: number, payment: number) {
  let bal = balance, months = 0, interest = 0; const yearly = new Map<number, number>()
  const mr = ratePct / 100 / 12
  while (bal > 0 && months < 1200) { const i = bal * mr; interest += i; bal = bal + i - payment; months++; if (months % 12 === 0 || bal <= 0) yearly.set(Math.ceil(months / 12), Math.round(Math.max(0, bal))) }
  return { months, interest, yearly }
}
// Biweekly simulation: half the monthly payment every 14 days, interest at annual rate / 26 per period.
// 26 half-payments a year = 13 full monthly payments, so the loan clears early.
function simulateBiweekly(balance: number, ratePct: number, payment: number) {
  let bal = balance, periods = 0, interest = 0; const yearly = new Map<number, number>()
  const pr = ratePct / 100 / 26
  while (bal > 0 && periods < 2600) { const i = bal * pr; interest += i; bal = bal + i - payment; periods++; if (periods % 26 === 0 || bal <= 0) yearly.set(Math.ceil(periods / 26), Math.round(Math.max(0, bal))) }
  return { periods, interest, yearly }
}
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [loan, setLoan] = useState(300000); const [rate, setRate] = useState(6.5); const [term, setTerm] = useState(30)
  const [extra, setExtra] = useState(0)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.loan !== undefined) setLoan(s.loan as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.term !== undefined) setTerm(s.term as any)
    if (s.extra !== undefined) setExtra(s.extra as any)
  })

  const payment = useMemo(() => piPayment(loan, rate, term), [loan, rate, term])
  const biweeklyPay = useMemo(() => payment / 2 + extra, [payment, extra])
  const base = useMemo(() => simulateMonthly(loan, rate, payment), [loan, rate, payment])
  const fast = useMemo(() => simulateBiweekly(loan, rate, biweeklyPay), [loan, rate, biweeklyPay])
  const chart = useMemo(() => {
    const years = Math.max(base.yearly.size, fast.yearly.size); const rows: any[] = [{ year: 0, Monthly: loan, Biweekly: loan }]
    for (let y = 1; y <= years; y++) rows.push({ year: y, Monthly: base.yearly.get(y) ?? 0, Biweekly: fast.yearly.get(y) ?? 0 })
    return rows
  }, [base, fast, loan])
  const dateStrMonths = (m: number) => { const d = new Date(); d.setMonth(d.getMonth() + m); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  const dateStrPeriods = (p: number) => { const d = new Date(); d.setDate(d.getDate() + p * 14); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  const fastMonths = Math.round(fast.periods * 12 / 26)
  const savedMonths = Math.max(0, base.months - fastMonths)
  const yrsMos = (m: number) => `${Math.floor(m / 12)} yrs ${m % 12} mos`
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Loan Balance" value={loan} onChange={setLoan} /><MoneyInput label="Extra Principal (per biweekly payment)" value={extra} onChange={setExtra} hint="Optional — extra goes 100% to principal." /></div>
      <PctSlider label="Interest Rate" value={rate} onChange={setRate} min={0} max={15} step={0.125} />
      <div className="space-y-2"><label className="text-sm font-semibold">Remaining Loan Term</label>
        <div className="flex gap-2">{[30, 20, 15].map(y => (<button key={y} onClick={() => setTerm(y)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${term === y ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>{y} yr</button>))}</div></div>
      <p className="text-sm text-muted-foreground">Your monthly principal &amp; interest payment is <strong className="font-mono">{fmt(payment)}/mo</strong>. Biweekly means paying <strong className="font-mono">{fmt(biweeklyPay)}</strong> every two weeks — 26 half-payments a year, or 13 monthly payments instead of 12. Figures are principal &amp; interest only; tax, insurance, HOA and PMI are not included.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Mortgage-Free Date — Biweekly Plan">
        <div className="text-4xl font-black font-mono">{dateStrPeriods(fast.periods)}</div>
        <p className="text-white/80 mt-2 text-sm">{yrsMos(fastMonths)} instead of {yrsMos(base.months)} (monthly payoff {dateStrMonths(base.months)})</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest Saved</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, base.interest - fast.interest))}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Time Saved</p><p className="font-mono text-xl font-bold">{yrsMos(savedMonths)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest (monthly)</p><p className="font-mono text-xl font-bold">{fmt(base.interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest (biweekly)</p><p className="font-mono text-xl font-bold">{fmt(fast.interest)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Balance: Monthly vs Biweekly</h4>
        <ResponsiveContainer width="100%" height={220}><LineChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Legend /><Line type="monotone" dataKey="Monthly" stroke="#9CA3AF" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="Biweekly" stroke="#064E3B" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div>
      <div className="bg-card border rounded-2xl p-6 text-sm text-muted-foreground leading-relaxed">Before you enroll in a servicer&apos;s biweekly program, ask whether half-payments are applied the day they arrive. Some servicers hold them until a full payment accumulates, which wipes out the benefit — and third-party programs charge fees for the same schedule you can copy free by adding one-twelfth of your payment to each monthly payment as extra principal.</div>
    <ToolActionsBar slug="biweekly-mortgage-calculator" isPro={isPro} inputs={{ loan, rate, term, extra }} />
    </div></div></>)
}
