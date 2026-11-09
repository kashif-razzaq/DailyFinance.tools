/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function PctSlider({ label, value, onChange, min = 0, max = 15, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function NumSlider({ label, value, onChange, min, max, suffix = '' }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; suffix?: string }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}{suffix}</span></div>
    <Slider value={[value]} min={min} max={max} step={1} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}
// Amortizing payment: M = P * r(1+r)^n / ((1+r)^n - 1).
function monthlyPayment(principal: number, ratePct: number, months: number) {
  const r = ratePct / 100 / 12
  if (months <= 0 || principal <= 0) return 0
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return principal * r * f / (f - 1)
}
function simulate(balance: number, ratePct: number, payment: number) {
  const mr = ratePct / 100 / 12
  let bal = balance, months = 0, interest = 0
  const series: { month: number; balance: number }[] = [{ month: 0, balance: Math.round(bal) }]
  while (bal > 0 && months < 600) { const i = bal * mr; interest += i; bal = Math.max(0, bal + i - payment); months++; if (months % 12 === 0 || bal <= 0) series.push({ month: months, balance: Math.round(bal) }) }
  return { months, interest, cleared: bal <= 0, series }
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [balance, setBalance] = useState(37000)
  const [rate, setRate] = useState(5.5)
  const [mode, setMode] = useState<'term' | 'payment'>('term')
  const [termYears, setTermYears] = useState(10)
  const [paymentInput, setPaymentInput] = useState(400)

  const termPayment = useMemo(() => monthlyPayment(balance, rate, termYears * 12), [balance, rate, termYears])
  const payment = mode === 'term' ? termPayment : paymentInput
  const plan = useMemo(() => simulate(balance, rate, payment), [balance, rate, payment])
  // Comparison plans: standard 10-year vs extended 20-year repayment.
  const standard = useMemo(() => { const p = monthlyPayment(balance, rate, 120); const s = simulate(balance, rate, p); return { payment: p, months: s.months, interest: s.interest, series: s.series } }, [balance, rate])
  const extended = useMemo(() => { const p = monthlyPayment(balance, rate, 240); const s = simulate(balance, rate, p); return { payment: p, months: s.months, interest: s.interest, series: s.series } }, [balance, rate])
  const merged = useMemo(() => {
    const map = new Map<number, any>()
    standard.series.forEach((p) => map.set(p.month, { month: p.month, Standard: p.balance }))
    extended.series.forEach((p) => { const row = map.get(p.month) || { month: p.month }; row.Extended = p.balance; map.set(p.month, row) })
    return [...map.values()].sort((a, b) => a.month - b.month)
  }, [standard, extended])
  const firstInterest = balance * rate / 100 / 12
  const tooLow = payment <= firstInterest && balance > 0
  const dateStr = (m: number) => { const d = new Date(); d.setMonth(d.getMonth() + m); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Student Loan Balance" value={balance} onChange={setBalance} hint="Total across all loans, or enter them one at a time with the same rate." />
      <PctSlider label="Interest Rate (APR)" value={rate} onChange={setRate} min={0} max={15} step={0.1} />
      <div className="space-y-3"><label className="text-sm font-semibold">Plan By</label>
        <div className="flex gap-2">
          <button onClick={() => setMode('term')} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${mode === 'term' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>Repayment Term</button>
          <button onClick={() => setMode('payment')} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${mode === 'payment' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>Monthly Payment</button>
        </div></div>
      {mode === 'term'
        ? <NumSlider label="Repayment Term (years)" value={termYears} onChange={setTermYears} min={1} max={30} suffix=" yrs" />
        : <MoneyInput label="Monthly Payment" value={paymentInput} onChange={setPaymentInput} hint="We calculate how long payoff takes at this payment." />}
      {tooLow && <p className="text-sm text-red-600 font-semibold">Warning: this payment does not cover monthly interest ({fmt(firstInterest)}/mo), so the balance grows instead of shrinking.</p>}
      <div className="bg-card border rounded-2xl p-5"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Standard (10 yr) vs Extended (20 yr) Balance</h4>
        <ResponsiveContainer width="100%" height={200}><LineChart data={merged}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Legend /><Line type="monotone" dataKey="Standard" stroke="#064E3B" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="Extended" stroke="#D97706" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Your Student Loan Plan">
        <div className="text-4xl font-black font-mono">{fmt(payment)}<span className="text-lg text-white/70">/mo</span></div>
        <p className="text-white/80 mt-2 text-sm">{plan.cleared ? `debt-free ${dateStr(plan.months)} after ${plan.months} payments` : 'does not pay off within 50 years at this payment'}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Interest</p><p className="font-mono text-xl font-bold">{fmt(plan.interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Cost</p><p className="font-mono text-xl font-bold">{fmt(balance + plan.interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Payoff Time</p><p className="font-mono text-xl font-bold">{plan.cleared ? `${Math.floor(plan.months / 12)}y ${plan.months % 12}m` : '50+ yrs'}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Payoff Date</p><p className="font-mono text-xl font-bold">{plan.cleared ? dateStr(plan.months) : '—'}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6 overflow-x-auto"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Standard vs Extended Repayment</h4>
        <table className="w-full text-sm"><thead><tr className="text-left text-muted-foreground border-b"><th className="py-2 pr-3 font-semibold">Plan</th><th className="py-2 pr-3 font-semibold text-right">Payment</th><th className="py-2 font-semibold text-right">Interest</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="py-2 pr-3">Standard — 10 years</td><td className="py-2 pr-3 font-mono text-right">{fmt(standard.payment)}</td><td className="py-2 font-mono text-right">{fmt(standard.interest)}</td></tr>
            <tr><td className="py-2 pr-3">Extended — 20 years</td><td className="py-2 pr-3 font-mono text-right">{fmt(extended.payment)}</td><td className="py-2 font-mono text-right">{fmt(extended.interest)}</td></tr>
          </tbody></table>
        <p className="text-xs text-muted-foreground mt-3">Stretching from 10 to 20 years cuts the payment by {fmt(standard.payment - extended.payment)}/mo but adds {fmt(extended.interest - standard.interest)} in interest. For a payoff-focused plan with extra payments, see the Student Loan Payoff Calculator in Personal Wealth.</p></div>
    </div></div><ToolActionsBar slug="student-loan-calculator" isPro={isPro} inputs={{ balance, rate, mode, termYears, paymentInput }} /></>)
}
