/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
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
// HUD Mortgagee Letter 2023-05 annual MIP grid (Handbook 4000.1, Appendix 1.0).
// The base-loan threshold tracks the national conforming loan limit: 832750 for 2026.
const CONFORMING_2026 = 832750
const FHA_FLOOR_2026 = 541287
const FHA_CEILING_2026 = 1249125
function mipLookup(termYears: number, baseLoan: number, ltvPct: number): { rate: number; years: number } {
  const above = baseLoan > CONFORMING_2026
  if (termYears > 15) {
    if (!above) {
      if (ltvPct <= 90) return { rate: 0.50, years: 11 }
      if (ltvPct <= 95) return { rate: 0.50, years: termYears }
      return { rate: 0.55, years: termYears }
    }
    if (ltvPct <= 90) return { rate: 0.70, years: 11 }
    if (ltvPct <= 95) return { rate: 0.70, years: termYears }
    return { rate: 0.75, years: termYears }
  }
  if (!above) {
    if (ltvPct <= 90) return { rate: 0.15, years: 11 }
    return { rate: 0.40, years: termYears }
  }
  if (ltvPct <= 78) return { rate: 0.15, years: 11 }
  if (ltvPct <= 90) return { rate: 0.40, years: 11 }
  return { rate: 0.65, years: termYears }
}
// HUD method: each year's annual MIP = rate x the average outstanding balance
// for that year, split into 12 monthly instalments. Monthly MIP therefore falls
// slightly each year as the balance amortises. Computed from the full schedule.
function mipSchedule(totalLoan: number, ratePct: number, termYears: number, mipRatePct: number, durationYears: number) {
  const r = ratePct / 100 / 12, n = termYears * 12
  const pmt = piPayment(totalLoan, ratePct, termYears)
  let bal = totalLoan
  const yearEnd: number[] = []
  for (let m = 1; m <= n; m++) {
    bal = Math.max(0, bal - (pmt - bal * r))
    if (m % 12 === 0) yearEnd.push(bal)
  }
  const yrs = Math.min(durationYears, termYears)
  let total = 0, year1Monthly = 0
  for (let y = 0; y < yrs; y++) {
    const start = y === 0 ? totalLoan : yearEnd[y - 1]
    const annual = (start + yearEnd[y]) / 2 * mipRatePct / 100
    total += annual
    if (y === 0) year1Monthly = annual / 12
  }
  return { monthlyYear1: cents(year1Monthly), total: cents(total) }
}
const COLORS = ['#064E3B', '#D97706', '#2563EB', '#7C3AED', '#DC2626']
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(350000); const [downPct, setDownPct] = useState(3.5)
  const [rate, setRate] = useState(6.5); const [term, setTerm] = useState(30)
  const [financeUfmip, setFinanceUfmip] = useState(true)
  const [taxYear, setTaxYear] = useState(3850); const [insYear, setInsYear] = useState(1750)
  const [hoa, setHoa] = useState(0)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.downPct !== undefined) setDownPct(s.downPct as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.term !== undefined) setTerm(s.term as any)
    if (s.financeUfmip !== undefined) setFinanceUfmip(s.financeUfmip as any)
    if (s.taxYear !== undefined) setTaxYear(s.taxYear as any)
    if (s.insYear !== undefined) setInsYear(s.insYear as any)
    if (s.hoa !== undefined) setHoa(s.hoa as any)
  })

  const c = useMemo(() => {
    const down = cents(price * downPct / 100)
    const baseLoan = cents(Math.max(0, price - down))
    const ltv = price > 0 ? baseLoan / price * 100 : 0
    const ufmip = cents(baseLoan * 0.0175)
    const totalLoan = cents(financeUfmip ? baseLoan + ufmip : baseLoan)
    const pi = cents(piPayment(totalLoan, rate, term))
    const mip = mipLookup(term, baseLoan, ltv)
    const mipYears = Math.min(mip.years, term)
    const mipLife = mipYears >= term
    const mipCalc = mipSchedule(totalLoan, rate, term, mip.rate, mipYears)
    const tax = cents(taxYear / 12), ins = cents(insYear / 12)
    const total = cents(pi + mipCalc.monthlyYear1 + tax + ins + hoa)
    const totalInterest = cents(pi * term * 12 - totalLoan)
    const payoff = new Date(); payoff.setMonth(payoff.getMonth() + term * 12)
    const overCeiling = baseLoan > FHA_CEILING_2026
    const aboveFloor = baseLoan > FHA_FLOOR_2026
    const parts = [
      { name: 'Principal & Interest', value: Math.round(pi) },
      ...(mipCalc.monthlyYear1 > 0 ? [{ name: 'Monthly MIP', value: Math.round(mipCalc.monthlyYear1) }] : []),
      { name: 'Property Tax', value: Math.round(tax) },
      { name: 'Home Insurance', value: Math.round(ins) },
      ...(hoa > 0 ? [{ name: 'HOA Dues', value: Math.round(hoa) }] : []),
    ]
    return { down, baseLoan, ltv, ufmip, totalLoan, pi, mip, mipYears, mipLife, mipMonthly: mipCalc.monthlyYear1, totalMip: mipCalc.total, tax, ins, total, totalInterest, overCeiling, aboveFloor, parts, payoff: payoff.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  }, [price, downPct, rate, term, financeUfmip, taxYear, insYear, hoa])
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Home Price" value={price} onChange={setPrice} /><MoneyInput label="Down Payment" value={Math.round(price * downPct / 100)} onChange={(n) => setDownPct(price > 0 ? Math.min(100, Math.max(0, n / price * 100)) : 0)} hint="FHA minimum is 3.5% with credit 580 or higher; 10% with credit 500–579." /></div>
      <PctSlider label="Down Payment" value={Math.round(downPct * 10) / 10} onChange={setDownPct} min={0} max={50} step={0.5} />
      {downPct < 3.5 && <p className="text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">Below the 3.5% FHA minimum. FHA requires at least 3.5% down with credit 580 or higher, and 10% down with credit 500–579.</p>}
      <PctSlider label="Interest Rate" value={rate} onChange={setRate} min={0} max={15} step={0.125} />
      <div className="space-y-2"><label className="text-sm font-semibold">Loan Term</label>
        <div className="flex gap-2">{[30, 20, 15, 10].map(y => (<button key={y} onClick={() => setTerm(y)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${term === y ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>{y} yr</button>))}</div>
        <p className="text-xs text-muted-foreground">Terms of 15 years or less pay much lower annual MIP (0.15%–0.65%) than terms over 15 years (0.50%–0.75%).</p></div>
      <div className="space-y-2"><label className="text-sm font-semibold">Upfront MIP (1.75% of the base loan)</label>
        <div className="flex gap-2">
          <button onClick={() => setFinanceUfmip(true)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${financeUfmip ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>Finance it into the loan</button>
          <button onClick={() => setFinanceUfmip(false)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${!financeUfmip ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>Pay cash at closing</button>
        </div>
        <p className="text-xs text-muted-foreground">{financeUfmip ? 'The upfront premium is added to the loan balance, so you pay interest on it.' : 'The upfront premium is due at closing and is not added to the loan balance.'}</p></div>
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Property Tax (per year)" value={taxYear} onChange={setTaxYear} hint="Roughly 1.1% of the price in many states." /><MoneyInput label="Home Insurance (per year)" value={insYear} onChange={setInsYear} /></div>
      <MoneyInput label="HOA Dues (per month)" value={hoa} onChange={setHoa} />
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Total Monthly Payment (PITI + MIP)">
        <div className="text-4xl font-black font-mono">{fmt(c.total)}</div>
        <p className="text-white/80 mt-2 text-sm">on a {fmt(c.totalLoan)} loan after {fmt(c.down)} down</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Principal & Interest</p><p className="font-mono text-xl font-bold">{fmt(c.pi)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Monthly MIP (year 1)</p><p className="font-mono text-xl font-bold">{fmt(c.mipMonthly)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Interest</p><p className="font-mono text-xl font-bold">{fmt(c.totalInterest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Loan Paid Off</p><p className="font-mono text-xl font-bold">{c.payoff}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6 space-y-4"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Mortgage insurance (MIP)</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Base loan</span><span className="font-mono font-semibold">{fmt(c.baseLoan)}</span></div>
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Upfront MIP (1.75% of base loan)</span><span className="font-mono font-semibold">{fmt(c.ufmip)}{financeUfmip ? ' — financed' : ' — cash at closing'}</span></div>
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Total loan amount</span><span className="font-mono font-semibold">{fmt(c.totalLoan)}</span></div>
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Annual MIP rate</span><span className="font-mono font-semibold">{c.mip.rate.toFixed(2)}% per year</span></div>
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">MIP duration</span><span className="font-mono font-semibold">{c.mipLife ? 'Life of the loan' : `${c.mipYears} years`}</span></div>
          <div className="flex justify-between py-1"><span className="text-neutral-500">Total MIP over the loan</span><span className="font-mono font-semibold">{fmt(c.totalMip)}</span></div>
        </div>
        <p className="text-xs text-muted-foreground">Rate from HUD Mortgagee Letter 2023-05: {term > 15 ? 'term over 15 years' : 'term of 15 years or less'}, LTV {c.ltv.toFixed(1)}%, base loan {c.baseLoan > CONFORMING_2026 ? 'above' : 'at or below'} the 2026 conforming limit of {fmt(CONFORMING_2026)}. {c.mipLife ? 'Annual MIP runs for the life of the loan because the down payment is under 10% — it only ends after 11 years with 10% or more down.' : 'Annual MIP ends after 11 years because the down payment is 10% or more.'} Monthly MIP is the year-1 figure, recalculated each year on the average outstanding balance, so it falls as the balance drops.</p>
      </div>
      <div className={`rounded-2xl border p-6 ${c.overCeiling ? 'bg-red-50 border-red-200' : c.aboveFloor ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">2026 FHA loan-limit check</h4>
        {c.overCeiling
          ? <p className="text-sm font-semibold text-red-800">Above the 2026 FHA ceiling — FHA will not insure a base loan over {fmt(FHA_CEILING_2026)} on a one-unit home, even in the highest-cost counties.</p>
          : c.aboveFloor
            ? <p className="text-sm font-semibold text-amber-800">Above the {fmt(FHA_FLOOR_2026)} floor — insurable only in counties with a higher limit, up to the {fmt(FHA_CEILING_2026)} ceiling. Check your county&apos;s limit before relying on this loan.</p>
            : <p className="text-sm font-semibold text-emerald-800">Within the {fmt(FHA_FLOOR_2026)} floor — this base loan is insurable in every county in the country.</p>}
        <p className="text-xs text-muted-foreground mt-2">The limit applies to the base loan (before financed upfront MIP), not the home price. County limits for 2026 run from the {fmt(FHA_FLOOR_2026)} floor to the {fmt(FHA_CEILING_2026)} ceiling.</p>
      </div>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Payment Breakdown</h4>
        <ResponsiveContainer width="100%" height={230}><PieChart><Pie data={c.parts} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>{c.parts.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip formatter={(v: any) => fmt(Number(v)) + '/mo'} /><Legend /></PieChart></ResponsiveContainer>
        <div className="mt-2 space-y-1">{c.parts.map(p => (<div key={p.name} className="flex justify-between text-sm py-1 border-b border-neutral-100 last:border-0"><span className="text-neutral-500">{p.name}</span><span className="font-mono font-semibold">{fmt(p.value)}/mo</span></div>))}</div>
      </div>
    <ToolActionsBar slug="fha-loan-calculator" isPro={isPro} inputs={{ price, downPct, rate, term, financeUfmip, taxYear, insYear, hoa }} />
    </div></div></>)
}
