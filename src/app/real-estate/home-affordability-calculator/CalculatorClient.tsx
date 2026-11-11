/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
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

// 28/36 rule: housing (PITI) <= 28% of gross monthly income; PITI + other debts <= 36%.
// Max PITI is solved in closed form because tax scales with price, and price = loan + down payment:
//   PITI = loan*f + (loan+down)*t/1200 + ins/12 + HOA, where f is the annuity factor per $1 borrowed.
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [income, setIncome] = useState(95000); const [debts, setDebts] = useState(450)
  const [down, setDown] = useState(60000); const [rate, setRate] = useState(6.75); const [term, setTerm] = useState(30)
  const [taxPct, setTaxPct] = useState(1.1); const [insYear, setInsYear] = useState(1800); const [hoa, setHoa] = useState(0)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.income !== undefined) setIncome(s.income as any)
    if (s.debts !== undefined) setDebts(s.debts as any)
    if (s.down !== undefined) setDown(s.down as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.term !== undefined) setTerm(s.term as any)
    if (s.taxPct !== undefined) setTaxPct(s.taxPct as any)
    if (s.insYear !== undefined) setInsYear(s.insYear as any)
    if (s.hoa !== undefined) setHoa(s.hoa as any)
  })

  const c = useMemo(() => {
    const mi = income / 12
    const frontCap = 0.28 * mi                      // max PITI under the 28% front-end rule
    const backCap = 0.36 * mi - debts               // max PITI under the 36% back-end rule after existing debts
    const maxPITI = Math.max(0, Math.min(frontCap, backCap))
    const binding = frontCap <= backCap ? 'front-end (28% housing rule)' : 'back-end (36% total-debt rule)'
    const r = rate / 100 / 12, n = term * 12
    const f = r === 0 ? 1 / n : (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) // P&I per $1 of loan
    const t = taxPct / 100 / 12                       // monthly tax per $1 of price
    const denom = f + t
    const loan = denom > 0 ? Math.max(0, (maxPITI - down * t - insYear / 12 - hoa) / denom) : 0
    const price = loan + down
    const pi = loan * f, tax = price * t, ins = insYear / 12
    const piti = pi + tax + ins + hoa
    const dti = mi > 0 ? (piti + debts) / mi * 100 : 0
    const ltv = price > 0 ? loan / price * 100 : 0
    return { mi, frontCap, backCap, maxPITI, binding, loan, price, pi, tax, ins, piti, dti, ltv }
  }, [income, debts, down, rate, term, taxPct, insYear, hoa])
  const bar = (label: string, pctOfIncome: number, cap: number) => (
    <div><div className="flex justify-between text-sm mb-1"><span className="text-neutral-500">{label}</span><span className="font-mono font-semibold">{pctOfIncome.toFixed(1)}% of income (cap {cap}%)</span></div>
    <div className="h-3 rounded-full bg-neutral-100 overflow-hidden"><div className={`h-full rounded-full ${pctOfIncome <= cap ? 'bg-[#064E3B]' : 'bg-red-500'}`} style={{ width: Math.min(100, pctOfIncome / 50 * 100) + '%' }} /></div></div>)
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Gross Annual Income" value={income} onChange={setIncome} hint="Before tax, all borrowers combined." /><MoneyInput label="Monthly Debts" value={debts} onChange={setDebts} hint="Car loans, cards, student loans — minimum payments." /></div>
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Down Payment Saved" value={down} onChange={setDown} /><MoneyInput label="Home Insurance (per year)" value={insYear} onChange={setInsYear} /></div>
      <PctSlider label="Mortgage Interest Rate" value={rate} onChange={setRate} min={0} max={15} step={0.125} />
      <PctSlider label="Property Tax Rate (of price / yr)" value={taxPct} onChange={setTaxPct} min={0} max={3} step={0.05} />
      <div className="grid grid-cols-2 gap-6"><div className="space-y-2"><label className="text-sm font-semibold">Loan Term</label>
        <div className="flex gap-2">{[30, 20, 15].map(y => (<button key={y} onClick={() => setTerm(y)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${term === y ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>{y} yr</button>))}</div></div>
        <MoneyInput label="HOA Dues (per month)" value={hoa} onChange={setHoa} /></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Maximum Home Price (28/36 Rule)">
        <div className="text-4xl font-black font-mono">{fmt(c.price)}</div>
        <p className="text-white/80 mt-2 text-sm">with a {fmt(c.loan)} loan — limited by the {c.binding}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Monthly Payment (PITI+HOA)</p><p className="font-mono text-xl font-bold">{fmt(c.piti)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Back-End DTI</p><p className="font-mono text-xl font-bold">{c.dti.toFixed(1)}%</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">28% Housing Cap</p><p className="font-mono text-xl font-bold">{fmt(c.frontCap)}/mo</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">36% Cap After Debts</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, c.backCap))}/mo</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6 space-y-5"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">The Lender&apos;s View — Your Ratios at This Price</h4>
        {bar('Housing ratio (front-end)', c.mi > 0 ? c.piti / c.mi * 100 : 0, 28)}
        {bar('Total debt ratio (back-end)', c.dti, 36)}
        <div className="pt-2 space-y-1 text-sm">
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Principal &amp; interest</span><span className="font-mono font-semibold">{fmt(c.pi)}/mo</span></div>
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Property tax</span><span className="font-mono font-semibold">{fmt(c.tax)}/mo</span></div>
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Insurance</span><span className="font-mono font-semibold">{fmt(c.ins)}/mo</span></div>
          <div className="flex justify-between py-1"><span className="text-neutral-500">Loan-to-value</span><span className="font-mono font-semibold">{c.ltv.toFixed(0)}%{c.ltv > 80 ? ' (PMI likely)' : ''}</span></div>
        </div>
        <p className="text-xs text-muted-foreground">Many lenders stretch to 43–50% back-end DTI for well-qualified borrowers; the 28/36 view is the conservative, budget-safe line.</p>
      </div>
    <ToolActionsBar slug="home-affordability-calculator" isPro={isPro} inputs={{ income, debts, down, rate, term, taxPct, insYear, hoa }} />
    </div></div></>)
}
