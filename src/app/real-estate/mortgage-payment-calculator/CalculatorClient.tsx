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

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
// Monthly principal & interest: M = P * r(1+r)^n / ((1+r)^n - 1), r = annual rate / 12, n = months
function piPayment(principal: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12, n = years * 12
  if (principal <= 0) return 0
  if (r === 0) return principal / n
  const f = Math.pow(1 + r, n)
  return principal * r * f / (f - 1)
}
const COLORS = ['#064E3B', '#D97706', '#2563EB', '#7C3AED', '#DC2626']
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(425000); const [downPct, setDownPct] = useState(20)
  const [rate, setRate] = useState(6.75); const [term, setTerm] = useState(30)
  const [taxYear, setTaxYear] = useState(4675); const [insYear, setInsYear] = useState(1800)
  const [hoa, setHoa] = useState(0); const [pmiRate, setPmiRate] = useState(0.5)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.downPct !== undefined) setDownPct(s.downPct as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.term !== undefined) setTerm(s.term as any)
    if (s.taxYear !== undefined) setTaxYear(s.taxYear as any)
    if (s.insYear !== undefined) setInsYear(s.insYear as any)
    if (s.hoa !== undefined) setHoa(s.hoa as any)
    if (s.pmiRate !== undefined) setPmiRate(s.pmiRate as any)
  })

  const c = useMemo(() => {
    const down = price * downPct / 100
    const loan = Math.max(0, price - down)
    const pi = piPayment(loan, rate, term)
    const tax = taxYear / 12, ins = insYear / 12
    // PMI is charged when the down payment is under 20% of the price
    const pmi = downPct < 20 ? loan * pmiRate / 100 / 12 : 0
    const total = pi + tax + ins + hoa + pmi
    const totalInterest = pi * term * 12 - loan
    const totalCost = down + pi * term * 12 + taxYear * term + insYear * term + hoa * term * 12
    const payoff = new Date(); payoff.setMonth(payoff.getMonth() + term * 12)
    const parts = [
      { name: 'Principal & Interest', value: Math.round(pi) },
      { name: 'Property Tax', value: Math.round(tax) },
      { name: 'Home Insurance', value: Math.round(ins) },
      ...(hoa > 0 ? [{ name: 'HOA Dues', value: Math.round(hoa) }] : []),
      ...(pmi > 0 ? [{ name: 'PMI', value: Math.round(pmi) }] : []),
    ]
    return { down, loan, pi, tax, ins, pmi, total, totalInterest, totalCost, parts, payoff: payoff.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  }, [price, downPct, rate, term, taxYear, insYear, hoa, pmiRate])
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Home Price" value={price} onChange={setPrice} /><MoneyInput label="Down Payment ($)" value={Math.round(price * downPct / 100)} onChange={(n) => setDownPct(price > 0 ? Math.min(100, Math.max(0, n / price * 100)) : 0)} /></div>
      <PctSlider label="Down Payment" value={Math.round(downPct * 10) / 10} onChange={setDownPct} min={0} max={50} step={0.5} />
      <PctSlider label="Interest Rate" value={rate} onChange={setRate} min={0} max={15} step={0.125} />
      <div className="space-y-2"><label className="text-sm font-semibold">Loan Term</label>
        <div className="flex gap-2">{[30, 20, 15, 10].map(y => (<button key={y} onClick={() => setTerm(y)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${term === y ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>{y} yr</button>))}</div></div>
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Property Tax (per year)" value={taxYear} onChange={setTaxYear} hint="Roughly 1.1% of the price in many states." /><MoneyInput label="Home Insurance (per year)" value={insYear} onChange={setInsYear} /></div>
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="HOA Dues (per month)" value={hoa} onChange={setHoa} />
        {downPct < 20 && <div className="space-y-3"><PctSlider label="PMI Rate (per year)" value={pmiRate} onChange={setPmiRate} min={0.1} max={2} step={0.05} /><p className="text-xs text-muted-foreground">PMI applies because your down payment is under 20%.</p></div>}</div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Total Monthly Payment (PITI)">
        <div className="text-4xl font-black font-mono">{fmt(c.total)}</div>
        <p className="text-white/80 mt-2 text-sm">on a {fmt(c.loan)} loan after {fmt(c.down)} down</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Principal & Interest</p><p className="font-mono text-xl font-bold">{fmt(c.pi)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Tax + Insurance</p><p className="font-mono text-xl font-bold">{fmt(c.tax + c.ins)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Interest</p><p className="font-mono text-xl font-bold">{fmt(c.totalInterest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Loan Paid Off</p><p className="font-mono text-xl font-bold">{c.payoff}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Payment Breakdown</h4>
        <ResponsiveContainer width="100%" height={230}><PieChart><Pie data={c.parts} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>{c.parts.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip formatter={(v: any) => fmt(Number(v)) + '/mo'} /><Legend /></PieChart></ResponsiveContainer>
        <div className="mt-2 space-y-1">{c.parts.map(p => (<div key={p.name} className="flex justify-between text-sm py-1 border-b border-neutral-100 last:border-0"><span className="text-neutral-500">{p.name}</span><span className="font-mono font-semibold">{fmt(p.value)}/mo</span></div>))}</div>
      </div>
    </div></div><ToolActionsBar slug="mortgage-payment-calculator" isPro={isPro} inputs={{ price, downPct, rate, term, taxYear, insYear, hoa, pmiRate }} /></>)
}
