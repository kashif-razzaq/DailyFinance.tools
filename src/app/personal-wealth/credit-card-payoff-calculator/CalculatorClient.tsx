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
function fixedPayoff(balance: number, apr: number, payment: number) {
  let bal = balance, months = 0, interest = 0; const mr = apr / 100 / 12; const series = [{ month: 0, balance: Math.round(bal) }]
  while (bal > 0 && months < 600) { const i = bal * mr; interest += i; bal = bal + i - payment; months++; if (months % 6 === 0 || bal <= 0) series.push({ month: months, balance: Math.round(Math.max(0, bal)) }) }
  return { months, interest, cleared: bal <= 0, series }
}
function minimumPayoff(balance: number, apr: number) {
  let bal = balance, months = 0, interest = 0; const mr = apr / 100 / 12
  while (bal > 0 && months < 600) { const i = bal * mr; interest += i; const minPay = Math.max(25, i + bal * 0.01); bal = bal + i - Math.min(minPay, bal + i); months++ }
  return { months, interest, cleared: bal <= 0 }
}
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [balance, setBalance] = useState(6500); const [apr, setApr] = useState(24.99); const [payment, setPayment] = useState(250)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.balance !== undefined) setBalance(s.balance as any)
    if (s.apr !== undefined) setApr(s.apr as any)
    if (s.payment !== undefined) setPayment(s.payment as any)
  })

  const fixed = useMemo(() => fixedPayoff(balance, apr, payment), [balance, apr, payment])
  const min = useMemo(() => minimumPayoff(balance, apr), [balance, apr])
  const tooLow = payment <= balance * apr / 100 / 12
  const dateStr = (m: number) => { const d = new Date(); d.setMonth(d.getMonth() + m); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Card Balance" value={balance} onChange={setBalance} /><MoneyInput label="Fixed Monthly Payment You Can Make" value={payment} onChange={setPayment} /></div>
      <PctSlider label="Card APR" value={apr} onChange={setApr} min={0} max={36} step={0.25} />
      {tooLow && <p className="text-sm text-red-600 font-semibold">This payment ({fmt(payment)}) does not cover the monthly interest ({fmt(balance * apr / 100 / 12)}). The balance will grow — increase the payment above the interest charge.</p>}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-900 text-sm"><strong>The minimum-payment trap:</strong> paying only the issuer minimum (modelled as interest + 1% of balance, floor $25) takes <strong>{min.cleared ? Math.round(min.months / 12 * 10) / 10 + ' years' : 'over 50 years'}</strong> and costs <strong className="font-mono">{fmt(min.interest)}</strong> in interest on this balance. A fixed payment freezes the amount that was the first month's minimum and attacks principal every month after.</div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Debt-Free With a Fixed Payment">
        <div className="text-4xl font-black font-mono">{fixed.cleared ? dateStr(fixed.months) : '—'}</div>
        <p className="text-white/80 mt-2 text-sm">{fixed.months} months at {fmt(payment)}/month</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest (fixed payment)</p><p className="font-mono text-xl font-bold">{fmt(fixed.interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest (minimums only)</p><p className="font-mono text-xl font-bold">{fmt(min.interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">You Save</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, min.interest - fixed.interest))}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Paid</p><p className="font-mono text-xl font-bold">{fmt(balance + fixed.interest)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Balance Decline — Fixed Payment</h4>
        <ResponsiveContainer width="100%" height={200}><LineChart data={fixed.series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Line type="monotone" dataKey="balance" stroke="#064E3B" strokeWidth={2} dot={false} name="Balance" /></LineChart></ResponsiveContainer></div>
    <ToolActionsBar slug="credit-card-payoff-calculator" isPro={isPro} inputs={{ balance, apr, payment }} />
    </div></div></>)
}
