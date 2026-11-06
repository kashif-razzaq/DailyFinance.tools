/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function PctSlider({ label, value, onChange, min = 0, max = 30, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
function piPayment(principal: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12, n = years * 12
  if (principal <= 0) return 0
  if (r === 0) return principal / n
  const f = Math.pow(1 + r, n)
  return principal * r * f / (f - 1)
}
const COLORS = ['#064E3B', '#D97706', '#2563EB', '#7C3AED', '#DC2626', '#0891B2']
// NOI = effective gross income − operating expenses (never includes debt service).
// Cap rate = NOI / value · GRM = value / gross scheduled rent · Cash-on-cash = (NOI − debt service) / cash invested.
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [value, setValue] = useState(350000); const [rent, setRent] = useState(2200); const [other, setOther] = useState(0)
  const [vacancy, setVacancy] = useState(5); const [taxYear, setTaxYear] = useState(4200); const [insYear, setInsYear] = useState(1500)
  const [maintPct, setMaintPct] = useState(5); const [mgmtPct, setMgmtPct] = useState(8); const [hoaMo, setHoaMo] = useState(0); const [otherExp, setOtherExp] = useState(0)
  const [downPct, setDownPct] = useState(25); const [finRate, setFinRate] = useState(7); const [finTerm, setFinTerm] = useState(30); const [closing, setClosing] = useState(7000)
  const c = useMemo(() => {
    const grossScheduled = rent * 12 + other * 12
    const vacancyLoss = grossScheduled * vacancy / 100
    const egi = grossScheduled - vacancyLoss
    const expenses = [
      { name: 'Property tax', value: taxYear },
      { name: 'Insurance', value: insYear },
      { name: 'Maintenance', value: grossScheduled * maintPct / 100 },
      { name: 'Management', value: egi * mgmtPct / 100 },
      { name: 'HOA', value: hoaMo * 12 },
      { name: 'Other', value: otherExp },
    ].filter(e => e.value > 0)
    const totalExp = expenses.reduce((s, e) => s + e.value, 0)
    const noi = egi - totalExp
    const capRate = value > 0 ? noi / value * 100 : 0
    const grm = grossScheduled > 0 ? value / grossScheduled : 0
    const loan = value * (1 - downPct / 100)
    const debtService = piPayment(loan, finRate, finTerm) * 12
    const cashFlow = noi - debtService
    const cashIn = value * downPct / 100 + closing
    const coc = cashIn > 0 ? cashFlow / cashIn * 100 : 0
    return { grossScheduled, vacancyLoss, egi, expenses, totalExp, noi, capRate, grm, debtService, cashFlow, cashIn, coc }
  }, [value, rent, other, vacancy, taxYear, insYear, maintPct, mgmtPct, hoaMo, otherExp, downPct, finRate, finTerm, closing])
  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Property Value / Price" value={value} onChange={setValue} /><MoneyInput label="Monthly Rent" value={rent} onChange={setRent} /></div>
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Other Income (per month)" value={other} onChange={setOther} hint="Parking, laundry, storage." /><MoneyInput label="Property Tax (per year)" value={taxYear} onChange={setTaxYear} /></div>
      <PctSlider label="Vacancy Rate" value={vacancy} onChange={setVacancy} min={0} max={25} step={0.5} />
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Insurance (per year)" value={insYear} onChange={setInsYear} /><MoneyInput label="HOA (per month)" value={hoaMo} onChange={setHoaMo} /></div>
      <div className="grid grid-cols-2 gap-6"><PctSlider label="Maintenance (% of rent)" value={maintPct} onChange={setMaintPct} min={0} max={20} step={0.5} /><PctSlider label="Management (% of income)" value={mgmtPct} onChange={setMgmtPct} min={0} max={15} step={0.5} /></div>
      <MoneyInput label="Other Expenses (per year)" value={otherExp} onChange={setOtherExp} />
      <h3 className="font-bold text-lg pt-2">Financing (for cash-on-cash)</h3>
      <PctSlider label="Down Payment" value={downPct} onChange={setDownPct} min={0} max={100} step={1} />
      <div className="grid grid-cols-2 gap-6"><PctSlider label="Loan Rate" value={finRate} onChange={setFinRate} min={0} max={15} step={0.125} /><MoneyInput label="Closing Costs" value={closing} onChange={setClosing} /></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Capitalization Rate">
        <div className="text-4xl font-black font-mono">{c.capRate.toFixed(2)}%</div>
        <p className="text-white/80 mt-2 text-sm">NOI of {fmt(c.noi)}/yr on a {fmt(value)} property</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Net Operating Income</p><p className="font-mono text-xl font-bold">{fmt(c.noi)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Cash-on-Cash Return</p><p className="font-mono text-xl font-bold">{c.coc.toFixed(1)}%</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Gross Rent Multiplier</p><p className="font-mono text-xl font-bold">{c.grm.toFixed(1)}x</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Annual Cash Flow</p><p className="font-mono text-xl font-bold">{fmt(c.cashFlow)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Income &amp; Expense Breakdown (per year)</h4>
        <div className="text-sm space-y-1">
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Gross scheduled income</span><span className="font-mono font-semibold">{fmt(c.grossScheduled)}</span></div>
          <div className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">Vacancy loss</span><span className="font-mono font-semibold">−{fmt(c.vacancyLoss)}</span></div>
          {c.expenses.map(e => (<div key={e.name} className="flex justify-between py-1 border-b border-neutral-100"><span className="text-neutral-500">{e.name}</span><span className="font-mono font-semibold">−{fmt(e.value)}</span></div>))}
          <div className="flex justify-between py-1"><span className="font-semibold">NOI</span><span className="font-mono font-bold text-[#064E3B]">{fmt(c.noi)}</span></div>
        </div>
        {c.expenses.length > 0 && <ResponsiveContainer width="100%" height={200}><PieChart><Pie data={c.expenses} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2}>{c.expenses.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip formatter={(v: any) => fmt(Number(v)) + '/yr'} /><Legend /></PieChart></ResponsiveContainer>}
      </div>
    </div></div>)
}
