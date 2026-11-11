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
function PctSlider({ label, value, onChange, min = 0, max = 20, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
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
const TERMS = [36, 48, 60, 72]

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [price, setPrice] = useState(35000)
  const [tradeIn, setTradeIn] = useState(6000)
  const [taxPct, setTaxPct] = useState(7)
  const [down, setDown] = useState(4000)
  const [rate, setRate] = useState(7.9)
  const [term, setTerm] = useState(60)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.tradeIn !== undefined) setTradeIn(s.tradeIn as any)
    if (s.taxPct !== undefined) setTaxPct(s.taxPct as any)
    if (s.down !== undefined) setDown(s.down as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.term !== undefined) setTerm(s.term as any)
  })


  // Amount financed = price - trade-in + sales tax on the taxable amount (price - trade-in in most states) - down payment.
  const taxable = Math.max(0, price - tradeIn)
  const tax = taxable * taxPct / 100
  const financed = Math.max(0, price - tradeIn + tax - down)
  const payment = useMemo(() => monthlyPayment(financed, rate, term), [financed, rate, term])
  const totalInterest = payment * term - financed
  // Total cost of the loan = everything you hand over: down payment + trade-in value + all monthly payments.
  const totalCost = down + tradeIn + payment * term
  const termCompare = useMemo(() => TERMS.map((t) => { const p = monthlyPayment(financed, rate, t); return { term: t, payment: p, interest: p * t - financed } }), [financed, rate])
  const chartData = termCompare.map((t) => ({ name: t.term + ' mo', Interest: Math.round(t.interest), Principal: Math.round(financed) }))

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MoneyInput label="Vehicle Price" value={price} onChange={setPrice} />
        <MoneyInput label="Trade-In Value" value={tradeIn} onChange={setTradeIn} hint="Reduces the taxable amount in most states." />
        <MoneyInput label="Down Payment" value={down} onChange={setDown} />
        <div className="space-y-2"><label className="text-sm font-semibold">Sales Tax ({fmt(tax)})</label>
          <div className="pt-2"><PctSlider label="" value={taxPct} onChange={setTaxPct} min={0} max={13} step={0.25} /></div></div>
      </div>
      <PctSlider label="Interest Rate (APR)" value={rate} onChange={setRate} min={0} max={20} step={0.1} />
      <div className="space-y-3"><label className="text-sm font-semibold">Loan Term</label>
        <div className="flex flex-wrap gap-2">{TERMS.map((t) => (<button key={t} onClick={() => setTerm(t)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${term === t ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>{t} months</button>))}
          <button onClick={() => setTerm(84)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${term === 84 ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>84 months</button></div>
        <p className="text-xs text-muted-foreground">Longer terms cut the payment but add thousands in interest — compare below.</p></div>
      <div className="bg-card border rounded-2xl p-5"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Principal vs Interest by Term</h4>
        <ResponsiveContainer width="100%" height={190}><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Bar dataKey="Principal" stackId="a" fill="#064E3B" /><Bar dataKey="Interest" stackId="a" fill="#D97706">{chartData.map((_, i) => (<Cell key={i} fill={termCompare[i].term === term ? '#B45309' : '#D97706'} />))}</Bar></BarChart></ResponsiveContainer></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`Car Payment — ${term} Months`}>
        <div className="text-4xl font-black font-mono">{fmt(payment)}<span className="text-lg text-white/70">/mo</span></div>
        <p className="text-white/80 mt-2 text-sm">on {fmt(financed)} financed</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Amount Financed</p><p className="font-mono text-xl font-bold">{fmt(financed)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Sales Tax</p><p className="font-mono text-xl font-bold">{fmt(tax)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Interest</p><p className="font-mono text-xl font-bold">{fmt(totalInterest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Cost of Loan</p><p className="font-mono text-xl font-bold">{fmt(totalCost)}</p></div>
        </div>
        <p className="text-white/60 text-xs mt-4">Total cost = down payment + trade-in + every monthly payment. It excludes insurance, fuel and maintenance.</p>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6 overflow-x-auto"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Term Comparison</h4>
        <table className="w-full text-sm"><thead><tr className="text-left text-muted-foreground border-b"><th className="py-2 pr-3 font-semibold">Term</th><th className="py-2 pr-3 font-semibold text-right">Payment</th><th className="py-2 font-semibold text-right">Interest</th></tr></thead>
          <tbody>{termCompare.map((t) => (<tr key={t.term} className={`border-b last:border-0 ${t.term === term ? 'font-bold text-[#064E3B]' : ''}`}><td className="py-2 pr-3 font-mono">{t.term} mo</td><td className="py-2 pr-3 font-mono text-right">{fmt(t.payment)}</td><td className="py-2 font-mono text-right">{fmt(t.interest)}</td></tr>))}</tbody></table></div>
    </div></div><ToolActionsBar slug="auto-loan-calculator" isPro={isPro} inputs={{ price, tradeIn, taxPct, down, rate, term }} /></>)
}
