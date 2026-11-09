/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
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
// Amortizing payment: M = P * r(1+r)^n / ((1+r)^n - 1).
function monthlyPayment(principal: number, ratePct: number, months: number) {
  const r = ratePct / 100 / 12
  if (months <= 0 || principal <= 0) return 0
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return principal * r * f / (f - 1)
}
// Solve the monthly rate whose payment stream has present value = net proceeds (bisection). APR = i * 12.
function effectiveApr(payment: number, months: number, netProceeds: number) {
  if (payment <= 0 || months <= 0 || netProceeds <= 0) return 0
  if (payment * months <= netProceeds) return 0
  let lo = 0, hi = 0.05
  for (let k = 0; k < 80; k++) {
    const mid = (lo + hi) / 2
    const pv = mid === 0 ? payment * months : payment * (1 - Math.pow(1 + mid, -months)) / mid
    if (pv > netProceeds) lo = mid; else hi = mid
  }
  return ((lo + hi) / 2) * 12 * 100
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [amount, setAmount] = useState(15000)
  const [rate, setRate] = useState(11.5)
  const [months, setMonths] = useState(36)
  const [feePct, setFeePct] = useState(5)

  // Origination fee is deducted from the proceeds, but interest is charged on the FULL amount.
  const fee = amount * feePct / 100
  const netProceeds = amount - fee
  const payment = useMemo(() => monthlyPayment(amount, rate, months), [amount, rate, months])
  const totalPaid = payment * months
  const totalInterest = totalPaid - amount
  const trueCost = totalInterest + fee
  const apr = useMemo(() => effectiveApr(payment, months, netProceeds), [payment, months, netProceeds])
  // Comparison: same loan with no fee.
  const noFeePayment = useMemo(() => monthlyPayment(amount, rate, months), [amount, rate, months])
  const noFeeInterest = noFeePayment * months - amount
  const series = useMemo(() => {
    const mr = rate / 100 / 12; let bal = amount; const pts: { month: number; balance: number }[] = [{ month: 0, balance: Math.round(bal) }]
    for (let m = 1; m <= months; m++) { const i = bal * mr; bal = Math.max(0, bal + i - payment); if (m % 6 === 0 || m === months) pts.push({ month: m, balance: Math.round(bal) }) }
    return pts
  }, [amount, rate, months, payment])

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Loan Amount" value={amount} onChange={setAmount} hint="The headline amount — interest is charged on all of it, even the fee portion." />
      <PctSlider label="Interest Rate (APR before fees)" value={rate} onChange={setRate} min={0} max={36} step={0.1} />
      <NumSlider label="Term (months)" value={months} onChange={setMonths} min={6} max={84} suffix=" mo" />
      <PctSlider label="Origination Fee" value={feePct} onChange={setFeePct} min={0} max={12} step={0.25} />
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
        <strong>Fee impact:</strong> the lender keeps {fmt(fee)} up front, so you receive <strong>{fmt(netProceeds)}</strong> but repay interest on the full {fmt(amount)}. That lifts your true APR from {rate.toFixed(1)}% to about <strong>{apr.toFixed(2)}%</strong>.
      </div>
      <div className="bg-card border rounded-2xl p-5"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Balance Over Time</h4>
        <ResponsiveContainer width="100%" height={180}><LineChart data={series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Line type="monotone" dataKey="balance" stroke="#064E3B" strokeWidth={2} dot={false} name="Balance" /></LineChart></ResponsiveContainer></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="True Monthly Payment">
        <div className="text-4xl font-black font-mono">{fmt(payment)}<span className="text-lg text-white/70">/mo</span></div>
        <p className="text-white/80 mt-2 text-sm">{months} payments of {fmt(payment)}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">You Receive</p><p className="font-mono text-xl font-bold">{fmt(netProceeds)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Origination Fee</p><p className="font-mono text-xl font-bold">{fmt(fee)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Interest</p><p className="font-mono text-xl font-bold">{fmt(totalInterest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Cost (int. + fee)</p><p className="font-mono text-xl font-bold">{fmt(trueCost)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Effective APR</p><p className="font-mono text-xl font-bold">{apr.toFixed(2)}%</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Repaid</p><p className="font-mono text-xl font-bold">{fmt(totalPaid)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">What the Fee Really Costs</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span>Interest without any fee</span><span className="font-mono font-bold">{fmt(noFeeInterest)}</span></div>
          <div className="flex justify-between"><span>Interest + this fee</span><span className="font-mono font-bold">{fmt(trueCost)}</span></div>
          <div className="flex justify-between border-t pt-3"><span className="font-semibold">Extra cost of the fee</span><span className="font-mono font-bold text-[#B45309]">{fmt(fee)}</span></div>
          <p className="text-xs text-muted-foreground">Tip: a lender quoting a low rate with a high origination fee can cost more than a slightly higher rate with no fee. Compare effective APRs, not headline rates.</p>
        </div></div>
    </div></div><ToolActionsBar slug="personal-loan-calculator" isPro={isPro} inputs={{ amount, rate, months, feePct }} /></>)
}
