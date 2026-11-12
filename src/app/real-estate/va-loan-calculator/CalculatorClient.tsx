/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
// Integer-cents maths: round to cents at each money step, display whole dollars
const cents = (n: number) => Math.round(n * 100) / 100
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
function ToggleRow({ label, options, value, onChange, hint }: { label: string; options: { label: string; value: boolean }[]; value: boolean; onChange: (v: boolean) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="flex gap-2 flex-wrap">{options.map(o => (<button key={o.label} onClick={() => onChange(o.value)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${value === o.value ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>{o.label}</button>))}</div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
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
// VA funding fee schedule (VA.gov, effective April 7, 2023): percentage of the
// BASE LOAN amount. First use: 2.15% (<5% down), 1.5% (5-10%), 1.25% (10%+).
// Subsequent use: 3.3% (<5% down), then the same 1.5% / 1.25%. Exempt: 0%.
function feeRatePct(downPct: number, firstUse: boolean, exempt: boolean) {
  if (exempt) return 0
  if (downPct >= 10) return 1.25
  if (downPct >= 5) return 1.5
  return firstUse ? 2.15 : 3.3
}
const COLORS = ['#064E3B', '#D97706', '#2563EB', '#7C3AED', '#DC2626']
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(375000); const [downPct, setDownPct] = useState(0)
  const [rate, setRate] = useState(6.5); const [term, setTerm] = useState(30)
  const [firstUse, setFirstUse] = useState(true); const [exempt, setExempt] = useState(false)
  const [financeFee, setFinanceFee] = useState(true)
  const [taxYear, setTaxYear] = useState(4125); const [insYear, setInsYear] = useState(1875)
  const [hoa, setHoa] = useState(0)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.downPct !== undefined) setDownPct(s.downPct as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.term !== undefined) setTerm(s.term as any)
    if (s.firstUse !== undefined) setFirstUse(s.firstUse as any)
    if (s.exempt !== undefined) setExempt(s.exempt as any)
    if (s.financeFee !== undefined) setFinanceFee(s.financeFee as any)
    if (s.taxYear !== undefined) setTaxYear(s.taxYear as any)
    if (s.insYear !== undefined) setInsYear(s.insYear as any)
    if (s.hoa !== undefined) setHoa(s.hoa as any)
  })

  const c = useMemo(() => {
    const down = cents(price * downPct / 100)
    const baseLoan = cents(Math.max(0, price - down))
    const ratePct = feeRatePct(downPct, firstUse, exempt)
    const fee = cents(baseLoan * ratePct / 100)
    const totalLoan = cents(financeFee ? baseLoan + fee : baseLoan)
    const pi = cents(piPayment(totalLoan, rate, term))
    const piCashFee = cents(piPayment(baseLoan, rate, term))
    const tax = cents(taxYear / 12), ins = cents(insYear / 12)
    const total = cents(pi + tax + ins + hoa)
    const totalInterest = cents(pi * term * 12 - totalLoan)
    // Cost of financing the fee: P&I on the financed fee over the term, minus the fee itself
    const financeCost = cents((pi - piCashFee) * term * 12 - fee)
    const feeMonthly = cents(pi - piCashFee)
    const payoff = new Date(); payoff.setMonth(payoff.getMonth() + term * 12)
    const parts = [
      { name: 'Principal & Interest', value: Math.round(pi) },
      { name: 'Property Tax', value: Math.round(tax) },
      { name: 'Home Insurance', value: Math.round(ins) },
      ...(hoa > 0 ? [{ name: 'HOA Dues', value: Math.round(hoa) }] : []),
    ]
    const tierLabel = downPct >= 10 ? '10% or more down' : downPct >= 5 ? '5% to 10% down' : 'less than 5% down'
    return { down, baseLoan, ratePct, fee, totalLoan, pi, piCashFee, tax, ins, total, totalInterest, financeCost, feeMonthly, parts, tierLabel, payoff: payoff.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  }, [price, downPct, rate, term, firstUse, exempt, financeFee, taxYear, insYear, hoa])
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Home Price" value={price} onChange={setPrice} /><MoneyInput label="Down Payment" value={Math.round(price * downPct / 100)} onChange={(n) => setDownPct(price > 0 ? Math.min(100, Math.max(0, n / price * 100)) : 0)} /></div>
      <PctSlider label="Down Payment" value={Math.round(downPct * 10) / 10} onChange={setDownPct} min={0} max={50} step={0.5} />
      <p className="text-xs text-muted-foreground -mt-3">{exempt ? 'Exempt — no funding fee.' : `Funding fee tier: ${c.tierLabel} — ${c.ratePct}% of the loan (${firstUse ? 'first use' : 'subsequent use'}).`}</p>
      <PctSlider label="Interest Rate" value={rate} onChange={setRate} min={0} max={15} step={0.125} />
      <div className="space-y-2"><label className="text-sm font-semibold">Loan Term</label>
        <div className="flex gap-2">{[30, 20, 15, 10].map(y => (<button key={y} onClick={() => setTerm(y)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${term === y ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>{y} yr</button>))}</div></div>
      <ToggleRow label="Have you used a VA loan before?" options={[{ label: 'First use', value: true }, { label: 'Subsequent use', value: false }]} value={firstUse} onChange={setFirstUse} hint="Subsequent use raises the fee to 3.3% only when the down payment is under 5%." />
      <ToggleRow label="Funding fee exemption" options={[{ label: 'Not exempt', value: false }, { label: 'Exempt — disability / Purple Heart / DIC', value: true }]} value={exempt} onChange={setExempt} hint="Exempt if you receive VA compensation for a service-connected disability, received a Purple Heart on active duty, or receive DIC as a surviving spouse." />
      {c.fee > 0 && <ToggleRow label="How will you pay the funding fee?" options={[{ label: 'Finance it into the loan', value: true }, { label: 'Pay cash at closing', value: false }]} value={financeFee} onChange={setFinanceFee} hint="Financing adds the fee to your loan balance, so you pay interest on it for the whole term." />}
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Property Tax (per year)" value={taxYear} onChange={setTaxYear} hint="Roughly 1.1% of the price in many states." /><MoneyInput label="Home Insurance (per year)" value={insYear} onChange={setInsYear} /></div>
      <MoneyInput label="HOA Dues (per month)" value={hoa} onChange={setHoa} />
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Total Monthly Payment (PITI — no PMI)">
        <div className="text-4xl font-black font-mono">{fmt(c.total)}</div>
        <p className="text-white/80 mt-2 text-sm">on a {fmt(c.totalLoan)} loan after {fmt(c.down)} down</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Principal & Interest</p><p className="font-mono text-xl font-bold">{fmt(c.pi)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Funding Fee ({c.ratePct}%)</p><p className="font-mono text-xl font-bold">{fmt(c.fee)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Interest</p><p className="font-mono text-xl font-bold">{fmt(c.totalInterest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Loan Paid Off</p><p className="font-mono text-xl font-bold">{c.payoff}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Funding Fee Breakdown</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Base loan (price minus down payment)</span><span className="font-mono font-semibold">{fmt(c.baseLoan)}</span></div>
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Funding fee rate ({c.tierLabel}, {firstUse ? 'first use' : 'subsequent use'})</span><span className="font-mono font-semibold">{c.ratePct}%</span></div>
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Funding fee (one-time, on the base loan)</span><span className="font-mono font-semibold">{fmt(c.fee)}</span></div>
          <div className="flex justify-between py-1"><span className="text-neutral-500">Total loan{financeFee && c.fee > 0 ? ' (fee financed)' : ' (fee paid in cash)'}</span><span className="font-mono font-semibold">{fmt(c.totalLoan)}</span></div>
        </div>
        {c.fee > 0 && financeFee && <p className="text-sm mt-4 pt-4 border-t border-neutral-100">The financed fee adds <span className="font-mono font-semibold">{fmt(c.feeMonthly)}/mo</span> to principal and interest. Over {term} years that costs <span className="font-mono font-semibold">{fmt(c.financeCost)}</span> extra versus paying the fee in cash.</p>}
        {c.fee > 0 && !financeFee && <p className="text-sm mt-4 pt-4 border-t border-neutral-100">Paying the fee in cash keeps it out of the loan. Financing it instead would cost <span className="font-mono font-semibold">{fmt(c.financeCost)}</span> extra in interest over {term} years.</p>}
        {c.fee === 0 && <p className="text-sm mt-4 pt-4 border-t border-neutral-100">No funding fee on this loan — the exemption saves the full fee, and there is nothing to finance.</p>}
      </div>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Payment Breakdown</h4>
        <ResponsiveContainer width="100%" height={230}><PieChart><Pie data={c.parts} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>{c.parts.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip formatter={(v: any) => fmt(Number(v)) + '/mo'} /><Legend /></PieChart></ResponsiveContainer>
        <div className="mt-2 space-y-1">{c.parts.map(p => (<div key={p.name} className="flex justify-between text-sm py-1 border-b border-neutral-100 last:border-0"><span className="text-neutral-500">{p.name}</span><span className="font-mono font-semibold">{fmt(p.value)}/mo</span></div>))}</div>
        <p className="text-sm mt-4 pt-4 border-t border-neutral-100">No PMI — VA loans never charge private mortgage insurance. The one-time funding fee replaces it.</p>
      </div>
    <ToolActionsBar slug="va-loan-calculator" isPro={isPro} inputs={{ price, downPct, rate, term, firstUse, exempt, financeFee, taxYear, insYear, hoa }} />
    </div></div></>)
}
