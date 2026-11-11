/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
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
function PctSlider({ label, value, onChange, min = 0, max = 30, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function NumSlider({ label, value, onChange, min, max, step = 1, suffix = '' }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; step?: number; suffix?: string }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}{suffix}</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

// Standard amortizing-loan payment: M = P * r(1+r)^n / ((1+r)^n - 1), r = monthly rate, n = months.
function monthlyPayment(principal: number, ratePct: number, months: number) {
  const r = ratePct / 100 / 12
  if (months <= 0) return 0
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return principal * r * f / (f - 1)
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [amount, setAmount] = useState(25000)
  const [rate, setRate] = useState(7.5)
  const [years, setYears] = useState(5)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.amount !== undefined) setAmount(s.amount as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.years !== undefined) setYears(s.years as any)
  })

  const months = Math.round(years * 12)
  const payment = useMemo(() => monthlyPayment(amount, rate, months), [amount, rate, months])

  // Month-by-month simulation, rolled up into yearly summary rows + a yearly balance series.
  const { yearly, series, totalInterest } = useMemo(() => {
    const mr = rate / 100 / 12
    let bal = amount, interest = 0
    const rows: { year: number; principal: number; interest: number; balance: number }[] = []
    const pts: { year: number; balance: number }[] = [{ year: 0, balance: Math.round(amount) }]
    let yPrin = 0, yInt = 0
    for (let m = 1; m <= months; m++) {
      const i = bal * mr; interest += i; yInt += i
      const prin = Math.min(payment - i, bal); yPrin += prin
      bal = Math.max(0, bal - prin)
      if (m % 12 === 0 || m === months) { const yr = Math.ceil(m / 12); rows.push({ year: yr, principal: yPrin, interest: yInt, balance: bal }); pts.push({ year: yr, balance: Math.round(bal) }); yPrin = 0; yInt = 0 }
    }
    return { yearly: rows, series: pts, totalInterest: interest }
  }, [amount, rate, months, payment])

  const payoffDate = useMemo(() => { const d = new Date(); d.setMonth(d.getMonth() + months); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }, [months])
  const tooLow = payment <= amount * rate / 100 / 12 && amount > 0

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 space-y-6">
      <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MoneyInput label="Loan Amount" value={amount} onChange={setAmount} hint="The amount you borrow, before interest." />
          <div className="space-y-2"><label className="text-sm font-semibold">Loan Term (years)</label>
            <Input type="number" value={years === 0 ? '' : years} onChange={(e) => setYears(num(e.target.value))} className="font-mono" /></div>
        </div>
        <PctSlider label="Interest Rate (APR)" value={rate} onChange={setRate} min={0} max={30} step={0.1} />
        <NumSlider label="Term (years)" value={years} onChange={setYears} min={1} max={30} suffix=" yrs" />
        {tooLow && <p className="text-sm text-red-600 font-semibold">Warning: the payment does not cover monthly interest, so this loan would never amortize.</p>}
      </div>
      <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8 overflow-x-auto">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Yearly Amortization Summary</h4>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted-foreground border-b"><th className="py-2 pr-3 font-semibold">Year</th><th className="py-2 pr-3 font-semibold text-right">Principal</th><th className="py-2 pr-3 font-semibold text-right">Interest</th><th className="py-2 font-semibold text-right">Ending Balance</th></tr></thead>
          <tbody>{yearly.map((r) => (<tr key={r.year} className="border-b last:border-0"><td className="py-2 pr-3 font-mono">{r.year}</td><td className="py-2 pr-3 font-mono text-right">{fmt(r.principal)}</td><td className="py-2 pr-3 font-mono text-right">{fmt(r.interest)}</td><td className="py-2 font-mono text-right">{fmt(r.balance)}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Your Loan Payment">
        <div className="text-4xl font-black font-mono">{fmt(payment)}<span className="text-lg text-white/70">/mo</span></div>
        <p className="text-white/80 mt-2 text-sm">{months} monthly payments · debt-free {payoffDate}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Interest</p><p className="font-mono text-xl font-bold">{fmt(totalInterest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Cost</p><p className="font-mono text-xl font-bold">{fmt(amount + totalInterest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Payoff Date</p><p className="font-mono text-xl font-bold">{payoffDate}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest Share</p><p className="font-mono text-xl font-bold">{amount + totalInterest > 0 ? Math.round(totalInterest / (amount + totalInterest) * 100) : 0}%</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Balance Over Time</h4>
        <ResponsiveContainer width="100%" height={200}><AreaChart data={series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" tickFormatter={(v: number) => 'Yr ' + v} /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} labelFormatter={(v: any) => 'Year ' + v} /><Area type="monotone" dataKey="balance" stroke="#064E3B" fill="#064E3B" fillOpacity={0.15} strokeWidth={2} name="Balance" /></AreaChart></ResponsiveContainer></div>
    </div></div><ToolActionsBar slug="loan-calculator" isPro={isPro} inputs={{ amount, rate, years }} /></>)
}
