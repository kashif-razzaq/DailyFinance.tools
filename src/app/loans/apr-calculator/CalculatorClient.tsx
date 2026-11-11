/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function PctSlider({ label, value, onChange, min = 0, max = 36, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
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
// Amortizing payment at the NOMINAL rate: M = P * r(1+r)^n / ((1+r)^n - 1).
function monthlyPayment(principal: number, ratePct: number, months: number) {
  const r = ratePct / 100 / 12
  if (months <= 0 || principal <= 0) return 0
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return principal * r * f / (f - 1)
}
// True APR: the rate i (bisection) at which the present value of the actual payments equals
// the amount the borrower really receives — loan amount minus upfront fees. APR = i * 12 * 100.
function trueApr(payment: number, months: number, netReceived: number) {
  if (payment <= 0 || months <= 0 || netReceived <= 0) return 0
  if (payment * months <= netReceived) return 0
  let lo = 0, hi = 0.05
  for (let k = 0; k < 80; k++) {
    const mid = (lo + hi) / 2
    const pv = mid === 0 ? payment * months : payment * (1 - Math.pow(1 + mid, -months)) / mid
    if (pv > netReceived) lo = mid; else hi = mid
  }
  return ((lo + hi) / 2) * 12 * 100
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [amount, setAmount] = useState(20000)
  const [rate, setRate] = useState(9)
  const [fees, setFees] = useState(800)
  const [months, setMonths] = useState(60)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.amount !== undefined) setAmount(s.amount as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.fees !== undefined) setFees(s.fees as any)
    if (s.months !== undefined) setMonths(s.months as any)
  })


  const payment = useMemo(() => monthlyPayment(amount, rate, months), [amount, rate, months])
  const netReceived = Math.max(0, amount - fees)
  const apr = useMemo(() => trueApr(payment, months, netReceived), [payment, months, netReceived])
  const totalPaid = payment * months
  const totalInterest = totalPaid - amount
  const totalCost = totalInterest + fees
  const gap = apr - rate
  const chartData = [
    { name: 'Nominal Rate', value: Number(rate.toFixed(2)) },
    { name: 'True APR', value: Number(apr.toFixed(2)) },
  ]

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MoneyInput label="Loan Amount" value={amount} onChange={setAmount} />
        <MoneyInput label="Upfront Fees" value={fees} onChange={setFees} hint="Origination, application, broker and closing fees deducted from (or added to) the loan." />
      </div>
      <PctSlider label="Nominal Interest Rate" value={rate} onChange={setRate} min={0} max={36} step={0.1} />
      <NumSlider label="Term (months)" value={months} onChange={setMonths} min={6} max={360} suffix=" mo" />
      <div className="rounded-xl bg-neutral-50 border p-4 text-sm text-neutral-600">
        The nominal rate prices the payments, but the fees shrink what you actually receive to <strong className="text-[#1F2937]">{fmt(netReceived)}</strong>. APR re-prices those same payments against the smaller amount received — which is why APR is always higher than the rate when fees exist, and why US lenders must disclose it.
      </div>
      <div className="bg-card border rounded-2xl p-5"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Nominal Rate vs True APR</h4>
        <ResponsiveContainer width="100%" height={180}><BarChart data={chartData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" tickFormatter={(v: number) => v + '%'} /><YAxis type="category" dataKey="name" width={95} /><Tooltip formatter={(v: any) => Number(v).toFixed(2) + '%'} /><Bar dataKey="value" radius={[0, 6, 6, 0]}>{chartData.map((_, i) => (<Cell key={i} fill={i === 0 ? '#9CA3AF' : '#064E3B'} />))}</Bar></BarChart></ResponsiveContainer></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="True APR (Including Fees)">
        <div className="text-4xl font-black font-mono">{apr.toFixed(2)}%</div>
        <p className="text-white/80 mt-2 text-sm">vs {rate.toFixed(2)}% nominal — fees add {gap.toFixed(2)} points</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Monthly Payment</p><p className="font-mono text-xl font-bold">{fmt(payment)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">You Actually Receive</p><p className="font-mono text-xl font-bold">{fmt(netReceived)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Interest</p><p className="font-mono text-xl font-bold">{fmt(totalInterest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Cost (int. + fees)</p><p className="font-mono text-xl font-bold">{fmt(totalCost)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">How to Use This When Comparing Loans</h4>
        <ul className="space-y-3 text-sm text-neutral-600 list-disc pl-5">
          <li>Two loans with the same rate can have very different APRs — the one with lower fees is cheaper.</li>
          <li>Fees hurt most on short terms: the same {fmt(fees)} fee spread over {months} months adds {gap.toFixed(2)} points here; on a 12-month loan it would add several times more.</li>
          <li>For mortgages, APR also folds in points and many closing costs; for credit cards, APR usually excludes fees — read what is included.</li>
        </ul></div>
    <ToolActionsBar slug="apr-calculator" isPro={isPro} inputs={{ amount, rate, fees, months }} />
    </div></div></>)
}
