/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
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
// Amortizing payment: M = P * r(1+r)^n / ((1+r)^n - 1).
function monthlyPayment(principal: number, ratePct: number, months: number) {
  const r = ratePct / 100 / 12
  if (months <= 0 || principal <= 0) return 0
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return principal * r * f / (f - 1)
}
function simulateFixed(balance: number, ratePct: number, payment: number) {
  const mr = ratePct / 100 / 12
  let bal = balance, months = 0, interest = 0
  const series: { month: number; balance: number }[] = [{ month: 0, balance: Math.round(bal) }]
  while (bal > 0 && months < 600) { const i = bal * mr; interest += i; bal = Math.max(0, bal + i - payment); months++; if (months % 6 === 0 || bal <= 0) series.push({ month: months, balance: Math.round(bal) }) }
  return { months, interest, cleared: bal <= 0, series }
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [balance, setBalance] = useState(16400)
  const [currentApr, setCurrentApr] = useState(23.5)
  const [currentPayment, setCurrentPayment] = useState(520)
  const [newRate, setNewRate] = useState(11.9)
  const [newTerm, setNewTerm] = useState(48)
  const [feePct, setFeePct] = useState(4)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.balance !== undefined) setBalance(s.balance as any)
    if (s.currentApr !== undefined) setCurrentApr(s.currentApr as any)
    if (s.currentPayment !== undefined) setCurrentPayment(s.currentPayment as any)
    if (s.newRate !== undefined) setNewRate(s.newRate as any)
    if (s.newTerm !== undefined) setNewTerm(s.newTerm as any)
    if (s.feePct !== undefined) setFeePct(s.feePct as any)
  })


  // Current path: keep paying the current combined payment against the balances at their average APR.
  const current = useMemo(() => simulateFixed(balance, currentApr, currentPayment), [balance, currentApr, currentPayment])
  // New loan: principal covers the debts PLUS the origination fee (fees are usually rolled into the loan).
  const fee = balance * feePct / 100
  const newPrincipal = balance + fee
  const newPayment = useMemo(() => monthlyPayment(newPrincipal, newRate, newTerm), [newPrincipal, newRate, newTerm])
  const newInterest = newPayment * newTerm - newPrincipal
  const newTotalCost = newInterest + fee
  const currentTotalCost = current.interest
  const interestSaved = currentTotalCost - newTotalCost
  const paymentDiff = currentPayment - newPayment
  const termStretch = current.cleared && newTerm > current.months
  const merged = useMemo(() => {
    const map = new Map<number, any>()
    current.series.forEach((p) => map.set(p.month, { month: p.month, Current: p.balance }))
    const mr = newRate / 100 / 12; let bal = newPrincipal; const pts: { month: number; balance: number }[] = [{ month: 0, balance: Math.round(bal) }]
    for (let m = 1; m <= newTerm; m++) { const i = bal * mr; bal = Math.max(0, bal + i - newPayment); if (m % 6 === 0 || m === newTerm) pts.push({ month: m, balance: Math.round(bal) }) }
    pts.forEach((p) => { const row = map.get(p.month) || { month: p.month }; row.Consolidated = p.balance; map.set(p.month, row) })
    return [...map.values()].sort((a, b) => a.month - b.month)
  }, [current, newPrincipal, newRate, newTerm, newPayment])
  const dateStr = (m: number) => { const d = new Date(); d.setMonth(d.getMonth() + m); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  const tooLow = currentPayment <= balance * currentApr / 100 / 12 && balance > 0

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 space-y-6">
      <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Your Current Debts (Combined)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MoneyInput label="Total Balance Owed" value={balance} onChange={setBalance} hint="All cards and loans you would roll into the new loan." />
          <MoneyInput label="Current Combined Monthly Payment" value={currentPayment} onChange={setCurrentPayment} hint="The sum of the payments you make today." />
        </div>
        <PctSlider label="Average APR of Current Debts" value={currentApr} onChange={setCurrentApr} min={0} max={36} step={0.1} />
        {tooLow && <p className="text-sm text-red-600 font-semibold">Warning: the current payment does not cover monthly interest ({fmt(balance * currentApr / 100 / 12)}/mo) — on the current path the debts never clear.</p>}
      </div>
      <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">The Consolidation Loan Offer</h4>
        <PctSlider label="New Loan Rate (APR)" value={newRate} onChange={setNewRate} min={0} max={36} step={0.1} />
        <NumSlider label="New Loan Term (months)" value={newTerm} onChange={setNewTerm} min={12} max={84} suffix=" mo" />
        <PctSlider label="Origination / Balance-Transfer Fee" value={feePct} onChange={setFeePct} min={0} max={10} step={0.25} />
        {termStretch && interestSaved < 0 && <p className="text-sm text-red-600 font-semibold">Interest warning: the new term ({newTerm} months) stretches well beyond your current payoff ({current.months} months). The payment falls, but you pay {fmt(-interestSaved)} MORE in interest and fees overall.</p>}
        {termStretch && interestSaved >= 0 && <p className="text-sm text-amber-600 font-semibold">Note: the new term is longer than your current payoff timeline — consolidating still saves interest here, but paying the new loan at your old payment would save far more.</p>}
      </div>
      <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Balance: Current Path vs Consolidated</h4>
        <ResponsiveContainer width="100%" height={210}><LineChart data={merged}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Legend /><Line type="monotone" dataKey="Current" stroke="#D97706" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="Consolidated" stroke="#064E3B" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Consolidation Verdict">
        <div className="text-4xl font-black font-mono">{interestSaved >= 0 ? 'Saves ' + fmt(interestSaved) : 'Costs ' + fmt(-interestSaved)}</div>
        <p className="text-white/80 mt-2 text-sm">{interestSaved >= 0 ? 'in interest and fees versus staying on your current path' : 'extra in interest and fees versus staying on your current path'}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">New Payment</p><p className="font-mono text-xl font-bold">{fmt(newPayment)}/mo</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Payment Change</p><p className="font-mono text-xl font-bold">{paymentDiff >= 0 ? '−' : '+'}{fmt(Math.abs(paymentDiff))}/mo</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Current Interest</p><p className="font-mono text-xl font-bold">{current.cleared ? fmt(currentTotalCost) : 'Never clears'}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">New Interest + Fee</p><p className="font-mono text-xl font-bold">{fmt(newTotalCost)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Current Payoff</p><p className="font-mono text-xl font-bold">{current.cleared ? dateStr(current.months) : '—'}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">New Payoff</p><p className="font-mono text-xl font-bold">{dateStr(newTerm)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Read This Before You Sign</h4>
        <ul className="space-y-3 text-sm text-neutral-600 list-disc pl-5">
          <li>A lower payment is not the same as a cheaper loan — total interest is the number that matters.</li>
          <li>Consolidating cards into an installment loan only works if the cards stay at zero; re-spending the freed limits doubles the problem.</li>
          <li>The {fmt(fee)} fee is rolled into the new loan, so you pay interest on the fee itself.</li>
          <li>If your current path clears sooner, paying the consolidation loan on the shorter schedule usually beats both options.</li>
        </ul></div>
    </div></div><ToolActionsBar slug="debt-consolidation-calculator" isPro={isPro} inputs={{ balance, currentApr, currentPayment, newRate, newTerm, feePct }} /></>)
}
