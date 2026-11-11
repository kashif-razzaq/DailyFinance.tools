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

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
function amort(balance: number, ratePct: number, payment: number) {
  let bal = balance, months = 0, interest = 0; const series: { month: number; balance: number }[] = [{ month: 0, balance: Math.round(bal) }]
  const mr = ratePct / 100 / 12
  while (bal > 0 && months < 600) { const i = bal * mr; interest += i; bal = bal + i - payment; months++; if (months % 12 === 0 || bal <= 0) series.push({ month: months, balance: Math.round(Math.max(0, bal)) }) }
  return { months, interest, cleared: bal <= 0, series }
}
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [balance, setBalance] = useState(37000); const [rate, setRate] = useState(6.5)
  const [payment, setPayment] = useState(400); const [extra, setExtra] = useState(100)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.balance !== undefined) setBalance(s.balance as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.payment !== undefined) setPayment(s.payment as any)
    if (s.extra !== undefined) setExtra(s.extra as any)
  })

  const base = useMemo(() => amort(balance, rate, payment), [balance, rate, payment])
  const withExtra = useMemo(() => amort(balance, rate, payment + extra), [balance, rate, payment, extra])
  const tooLow = payment <= balance * rate / 100 / 12
  const dateStr = (m: number) => { const d = new Date(); d.setMonth(d.getMonth() + m); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Student Loan Balance" value={balance} onChange={setBalance} hint="The US average federal borrower owes roughly $37,000." /><MoneyInput label="Monthly Payment" value={payment} onChange={setPayment} /></div>
      <PctSlider label="Interest Rate (APR)" value={rate} onChange={setRate} min={0} max={15} step={0.1} />
      <MoneyInput label="Extra Payment Each Month" value={extra} onChange={setExtra} />
      {tooLow && <p className="text-sm text-red-600 font-semibold">Warning: this payment does not cover monthly interest ({fmt(balance * rate / 100 / 12)}/mo), so the balance grows instead of shrinking.</p>}
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Payoff With Extra Payments">
        <div className="text-4xl font-black font-mono">{withExtra.cleared ? dateStr(withExtra.months) : '50+ years'}</div>
        <p className="text-white/80 mt-2 text-sm">debt-free date paying {fmt(payment + extra)}/month</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest (with extra)</p><p className="font-mono text-xl font-bold">{fmt(withExtra.interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest (no extra)</p><p className="font-mono text-xl font-bold">{fmt(base.interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest Saved</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, base.interest - withExtra.interest))}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Time Saved</p><p className="font-mono text-xl font-bold">{Math.max(0, base.months - withExtra.months)} months</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Balance Over Time (with extra)</h4>
        <ResponsiveContainer width="100%" height={200}><LineChart data={withExtra.series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Line type="monotone" dataKey="balance" stroke="#064E3B" strokeWidth={2} dot={false} name="Balance" /></LineChart></ResponsiveContainer></div>
    </div></div><ToolActionsBar slug="student-loan-payoff-calculator" isPro={isPro} inputs={{ balance, rate, payment, extra }} /></>)
}
