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
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</p>{children}</div>)
}

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
// Standard amortising payment: M = P * r(1+r)^n / ((1+r)^n - 1)
function piPayment(principal: number, ratePct: number, months: number) {
  const r = ratePct / 100 / 12, n = months
  if (principal <= 0 || n <= 0) return 0
  if (r === 0) return principal / n
  const f = Math.pow(1 + r, n)
  return principal * r * f / (f - 1)
}
// Month-by-month simulation of a fixed monthly schedule; the last payment
// is the exact remaining balance, so interest totals are exact.
function simulateMonthly(balance: number, ratePct: number, payment: number) {
  let bal = balance, months = 0, interest = 0, last = 0; const yearly = new Map<number, number>()
  const mr = ratePct / 100 / 12
  while (bal > 0.005 && months < 1200) { const i = bal * mr; interest += i; const pay = Math.min(payment, bal + i); bal = bal + i - pay; months++; last = pay; if (months % 12 === 0 || bal <= 0) yearly.set(Math.ceil(months / 12), Math.round(Math.max(0, bal))) }
  return { months, interest, yearly, last }
}
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [balance, setBalance] = useState(300000); const [rate, setRate] = useState(6.5)
  const [yearsLeft, setYearsLeft] = useState(27); const [monthsLeft, setMonthsLeft] = useState(0)
  const [lump, setLump] = useState(50000); const [fee, setFee] = useState(250)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.balance !== undefined) setBalance(s.balance as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.yearsLeft !== undefined) setYearsLeft(s.yearsLeft as any)
    if (s.monthsLeft !== undefined) setMonthsLeft(s.monthsLeft as any)
    if (s.lump !== undefined) setLump(s.lump as any)
    if (s.fee !== undefined) setFee(s.fee as any)
  })

  const months = useMemo(() => Math.max(1, Math.round(yearsLeft * 12 + monthsLeft)), [yearsLeft, monthsLeft])
  const lumpClamped = useMemo(() => Math.max(0, Math.min(lump, balance)), [lump, balance])
  const newBalance = useMemo(() => balance - lumpClamped, [balance, lumpClamped])
  const oldPayment = useMemo(() => piPayment(balance, rate, months), [balance, rate, months])
  const newPayment = useMemo(() => piPayment(newBalance, rate, months), [newBalance, rate, months])
  const drop = useMemo(() => Math.max(0, oldPayment - newPayment), [oldPayment, newPayment])
  const base = useMemo(() => simulateMonthly(balance, rate, oldPayment), [balance, rate, oldPayment])
  const recast = useMemo(() => simulateMonthly(newBalance, rate, newPayment), [newBalance, rate, newPayment])
  const keep = useMemo(() => simulateMonthly(newBalance, rate, oldPayment), [newBalance, rate, oldPayment])
  const interestSaved = Math.max(0, base.interest - recast.interest)
  const netSaved = Math.max(0, interestSaved - fee)
  const keepSaved = Math.max(0, base.interest - keep.interest)
  const feePayback = drop > 0 ? fee / drop : Infinity
  const chart = useMemo(() => {
    const years = Math.max(base.yearly.size, recast.yearly.size, keep.yearly.size); const rows: any[] = [{ year: 0, 'Do nothing': balance, 'Recast': newBalance, 'Keep old payment': newBalance }]
    for (let y = 1; y <= years; y++) rows.push({ year: y, 'Do nothing': base.yearly.get(y) ?? 0, 'Recast': recast.yearly.get(y) ?? 0, 'Keep old payment': keep.yearly.get(y) ?? 0 })
    return rows
  }, [base, recast, keep, balance, newBalance])
  const dateStrMonths = (m: number) => { const d = new Date(); d.setMonth(d.getMonth() + m); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  const yrsMos = (m: number) => `${Math.floor(m / 12)} yrs ${m % 12} mos`
  const pctLower = oldPayment > 0 ? (drop / oldPayment * 100) : 0
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Current Loan Balance" value={balance} onChange={setBalance} /><MoneyInput label="Lump Sum Toward Principal" value={lump} onChange={setLump} hint="Typically $5,000–$10,000 minimum, set by your servicer." /></div>
      <PctSlider label="Interest Rate" value={rate} onChange={setRate} min={0} max={15} step={0.125} />
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2"><label className="text-sm font-semibold">Years Left on the Loan</label>
          <Input type="number" value={yearsLeft === 0 ? '' : yearsLeft} onChange={(e) => setYearsLeft(num(e.target.value))} className="font-mono" /></div>
        <div className="space-y-2"><label className="text-sm font-semibold">Plus Months</label>
          <Input type="number" value={monthsLeft === 0 ? '' : monthsLeft} onChange={(e) => setMonthsLeft(num(e.target.value))} className="font-mono" /></div>
      </div>
      <MoneyInput label="Recast Fee" value={fee} onChange={setFee} hint="Usually $150–$500; $250 is the most common figure." />
      <p className="text-sm text-muted-foreground">Your monthly principal &amp; interest payment is <strong className="font-mono">{fmt(oldPayment)}/mo</strong>. After a <strong className="font-mono">{fmt(lumpClamped)}</strong> lump sum, the balance is <strong className="font-mono">{fmt(newBalance)}</strong>. Figures are principal &amp; interest only; tax, insurance, HOA and PMI are not included and do not change with a recast.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="New Monthly Payment After Recast">
        <div className="text-4xl font-black font-mono">{fmt(newPayment)}</div>
        <p className="text-white/80 mt-2 text-sm">Down {fmt(drop)} a month ({pctLower.toFixed(1)}% lower) from {fmt(oldPayment)} — same rate, same payoff date ({dateStrMonths(months)})</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest Saved</p><p className="font-mono text-xl font-bold">{fmt(interestSaved)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Net After Fee</p><p className="font-mono text-xl font-bold">{fmt(netSaved)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Fee Pays Back In</p><p className="font-mono text-xl font-bold">{feePayback === Infinity ? '—' : feePayback < 1 ? 'Under 1 mo' : `${feePayback.toFixed(1)} mos`}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Keep Old Payment</p><p className="font-mono text-xl font-bold">{yrsMos(keep.months)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Balance: Three Paths for the Same Lump Sum</p>
        <ResponsiveContainer width="100%" height={220}><LineChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Legend /><Line type="monotone" dataKey="Do nothing" stroke="#9CA3AF" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="Recast" stroke="#064E3B" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="Keep old payment" stroke="#B45309" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div>
      <div className="bg-card border rounded-2xl p-6">
        <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Recast, Prepay or Do Nothing</p>
        <div className="overflow-x-auto"><table className="w-full text-sm">
          <thead><tr className="text-left text-muted-foreground"><th className="py-2 pr-2 font-semibold">Option</th><th className="py-2 pr-2 font-semibold text-right">Payment</th><th className="py-2 pr-2 font-semibold text-right">Paid off</th><th className="py-2 font-semibold text-right">Interest</th></tr></thead>
          <tbody>
            <tr className="border-t"><td className="py-2 pr-2">Do nothing</td><td className="py-2 pr-2 text-right font-mono">{fmt(oldPayment)}</td><td className="py-2 pr-2 text-right">{yrsMos(base.months)}</td><td className="py-2 text-right font-mono">{fmt(base.interest)}</td></tr>
            <tr className="border-t"><td className="py-2 pr-2 font-semibold">Recast</td><td className="py-2 pr-2 text-right font-mono">{fmt(newPayment)}</td><td className="py-2 pr-2 text-right">{yrsMos(recast.months)}</td><td className="py-2 text-right font-mono">{fmt(recast.interest)}</td></tr>
            <tr className="border-t"><td className="py-2 pr-2">Lump sum, keep payment</td><td className="py-2 pr-2 text-right font-mono">{fmt(oldPayment)}</td><td className="py-2 pr-2 text-right">{yrsMos(keep.months)}</td><td className="py-2 text-right font-mono">{fmt(keep.interest)}</td></tr>
          </tbody></table></div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-4">Keeping the old payment saves <strong className="text-foreground font-mono">{fmt(keepSaved)}</strong> and clears the loan in {dateStrMonths(keep.months)} — {Math.max(0, base.months - keep.months)} months early. A recast buys a smaller bill; keeping the payment buys a shorter loan.</p>
      </div>
      <div className="bg-card border rounded-2xl p-6 text-sm text-muted-foreground leading-relaxed">Recasting is not a right: your servicer decides, and most offer it only on conventional loans — FHA, VA and USDA loans are generally ineligible. Ask for the minimum lump sum, the fee and the new payment in writing before you send the money, and check the next statement to confirm the lump sum went to principal.</div>
    <ToolActionsBar slug="mortgage-recast-calculator" isPro={isPro} inputs={{ balance, rate, yearsLeft, monthsLeft, lump, fee }} />
    </div></div></>)
}
