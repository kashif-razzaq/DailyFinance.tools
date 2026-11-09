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

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
// Standard amortising payment: M = P * r(1+r)^n / ((1+r)^n - 1)
function piPayment(principal: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12, n = years * 12
  if (principal <= 0) return 0
  if (r === 0) return principal / n
  const f = Math.pow(1 + r, n)
  return principal * r * f / (f - 1)
}
// Total interest remaining on a loan from today: simulate month by month (capped at 600 months)
function remainingInterest(balance: number, ratePct: number, payment: number) {
  let bal = balance, interest = 0, months = 0; const mr = ratePct / 100 / 12
  while (bal > 0 && months < 600) { const i = bal * mr; interest += i; bal = bal + i - payment; months++ }
  return { interest, months }
}
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [balance, setBalance] = useState(320000); const [curRate, setCurRate] = useState(7.5); const [yearsLeft, setYearsLeft] = useState(27)
  const [newRate, setNewRate] = useState(6.0); const [newTerm, setNewTerm] = useState(30); const [costs, setCosts] = useState(6000)
  const c = useMemo(() => {
    const curPay = piPayment(balance, curRate, yearsLeft)
    const newPay = piPayment(balance, newRate, newTerm)
    const saving = curPay - newPay
    const breakEven = saving > 0 ? Math.ceil(costs / saving) : Infinity // break-even month = closing costs / monthly saving
    const cur = remainingInterest(balance, curRate, curPay)
    const nw = remainingInterest(balance, newRate, newPay)
    const lifetimeSaving = cur.interest - (nw.interest + costs)
    // Cumulative net saving line: starts at -closing costs, gains the monthly saving each month
    const series: { month: number; net: number }[] = []
    const horizon = Math.min(120, Math.max(24, isFinite(breakEven) ? breakEven * 2 : 24))
    for (let m = 0; m <= horizon; m += Math.max(1, Math.floor(horizon / 40))) series.push({ month: m, net: Math.round(-costs + saving * m) })
    return { curPay, newPay, saving, breakEven, curInterest: cur.interest, newInterest: nw.interest, lifetimeSaving, series }
  }, [balance, curRate, yearsLeft, newRate, newTerm, costs])
  const verdict = c.saving <= 0 ? 'The new loan has a higher monthly payment — refinancing only makes sense to shorten the term or drop PMI.' : c.lifetimeSaving > 0 ? `Refinancing pays off: you break even in month ${c.breakEven} and save over the life of the loan.` : 'The monthly saving is real, but the restarted term costs more interest overall than it saves — check a shorter new term.'
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <h3 className="font-bold text-lg">Your current loan</h3>
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Remaining Balance" value={balance} onChange={setBalance} /><MoneyInput label="Years Remaining" value={yearsLeft} onChange={(n) => setYearsLeft(Math.min(40, Math.max(1, n)))} /></div>
      <PctSlider label="Current Interest Rate" value={curRate} onChange={setCurRate} min={0} max={15} step={0.125} />
      <h3 className="font-bold text-lg pt-2">The refinance offer</h3>
      <PctSlider label="New Interest Rate" value={newRate} onChange={setNewRate} min={0} max={15} step={0.125} />
      <div className="grid grid-cols-2 gap-6"><div className="space-y-2"><label className="text-sm font-semibold">New Loan Term</label>
        <div className="flex gap-2">{[30, 20, 15].map(y => (<button key={y} onClick={() => setNewTerm(y)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${newTerm === y ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>{y} yr</button>))}</div></div>
        <MoneyInput label="Closing Costs" value={costs} onChange={setCosts} hint="Typically 2–5% of the loan amount." /></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Monthly Saving">
        <div className="text-4xl font-black font-mono">{c.saving > 0 ? fmt(c.saving) + '/mo' : fmt(c.saving) + '/mo'}</div>
        <p className="text-white/80 mt-2 text-sm">{fmt(c.curPay)}/mo now → {fmt(c.newPay)}/mo after refinancing</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Break-Even</p><p className="font-mono text-xl font-bold">{isFinite(c.breakEven) ? 'Month ' + c.breakEven : 'Never'}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Lifetime Saving</p><p className="font-mono text-xl font-bold">{fmt(c.lifetimeSaving)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest Left (current)</p><p className="font-mono text-xl font-bold">{fmt(c.curInterest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest (new + costs)</p><p className="font-mono text-xl font-bold">{fmt(c.newInterest + costs)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Cumulative Net Saving — Where It Crosses Zero Is Break-Even</h4>
        <ResponsiveContainer width="100%" height={200}><LineChart data={c.series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><ReferenceLine y={0} stroke="#9CA3AF" /><Line type="monotone" dataKey="net" stroke="#064E3B" strokeWidth={2} dot={false} name="Net saving" /></LineChart></ResponsiveContainer>
        <p className="text-sm text-muted-foreground mt-3">{verdict}</p></div>
    </div></div><ToolActionsBar slug="refinance-calculator" isPro={isPro} inputs={{ balance, curRate, yearsLeft, newRate, newTerm, costs }} /></>)
}
