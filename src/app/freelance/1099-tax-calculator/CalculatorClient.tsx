/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
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
function PctSlider({ label, value, onChange, max = 13 }: { label: string; value: number; onChange: (n: number) => void; max?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={0} max={max} step={0.1} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

type Bracket = { upTo: number; rate: number }
const BRACKETS: Record<string, Bracket[]> = {
  single: [{ upTo: 11925, rate: 0.10 }, { upTo: 48475, rate: 0.12 }, { upTo: 103350, rate: 0.22 }, { upTo: 197300, rate: 0.24 }, { upTo: 250525, rate: 0.32 }, { upTo: 626350, rate: 0.35 }, { upTo: Infinity, rate: 0.37 }],
  mfj: [{ upTo: 23850, rate: 0.10 }, { upTo: 96950, rate: 0.12 }, { upTo: 206700, rate: 0.22 }, { upTo: 394600, rate: 0.24 }, { upTo: 501050, rate: 0.32 }, { upTo: 751600, rate: 0.35 }, { upTo: Infinity, rate: 0.37 }],
}
const STD_DED: Record<string, number> = { single: 16100, mfj: 32200 }
function bracketTax(taxable: number, brackets: Bracket[]) { let tax = 0, prev = 0; for (const b of brackets) { if (taxable <= prev) break; const amt = Math.min(taxable, b.upTo) - prev; if (amt > 0) tax += amt * b.rate; prev = b.upTo } return tax }

const QUARTERS = [
  { n: 'Q1', due: 'Apr 15', period: 'Jan 1 – Mar 31' }, { n: 'Q2', due: 'Jun 15', period: 'Apr 1 – May 31' },
  { n: 'Q3', due: 'Sep 15', period: 'Jun 1 – Aug 31' }, { n: 'Q4', due: 'Jan 15', period: 'Sep 1 – Dec 31' },
]

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [income, setIncome] = useState(95000)
  const [expenses, setExpenses] = useState(12000)
  const [w2, setW2] = useState(0)
  const [status, setStatus] = useState<'single' | 'mfj'>('single')
  const [statePct, setStatePct] = useState(5)

  const r = useMemo(() => {
    const net = Math.max(0, income - expenses)
    // Self-employment tax: 15.3% applied to 92.35% of net SE income (the employer-equivalent share is excluded).
    // Social Security part stops at the wage base, reduced by any W-2 wages.
    const seBase = net * 0.9235
    const ssRoom = Math.max(0, 184500 - w2)
    const seTax = Math.min(seBase, ssRoom) * 0.124 + seBase * 0.029 + Math.max(0, seBase - (status === 'mfj' ? 250000 : 200000)) * 0.009
    const halfSe = seTax / 2 // deductible half of SE tax
    // Federal income tax: household income minus standard deduction and the half-SE adjustment
    const taxable = Math.max(0, net + w2 - halfSe - STD_DED[status])
    const federalTotal = bracketTax(taxable, BRACKETS[status])
    // Attribute the share of federal tax caused by the 1099 income (vs the W-2-only return)
    const federal1099 = Math.max(0, federalTotal - bracketTax(Math.max(0, w2 - STD_DED[status]), BRACKETS[status]))
    const state = net * (statePct / 100)
    const total = seTax + federal1099 + state
    return { net, seBase, seTax, halfSe, federal1099, state, total, takeHome: net - total, quarterly: total / 4, effRate: net > 0 ? (total / net) * 100 : 0, setAside: net > 0 ? Math.ceil((total / net) * 100) : 0 }
  }, [income, expenses, w2, status, statePct])

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <MoneyInput label="1099 Income (gross)" value={income} onChange={setIncome} />
        <MoneyInput label="Business Expenses" value={expenses} onChange={setExpenses} hint="Expenses reduce both income tax and SE tax — track every one." />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <MoneyInput label="Other W-2 Wages (if any)" value={w2} onChange={setW2} hint="W-2 wages use up part of the Social Security wage base." />
        <div className="space-y-2"><label className="text-sm font-semibold">Filing Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as 'single' | 'mfj')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
            <option value="single">Single</option><option value="mfj">Married Filing Jointly</option>
          </select></div>
      </div>
      <PctSlider label="State Tax (flat estimate)" value={statePct} onChange={setStatePct} />
      <p className="text-xs text-muted-foreground">Estimate only, using projected 2026 federal brackets — verify with the IRS. The 20% QBI deduction (if you qualify) can lower the income-tax part further.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Total 1099 Tax (Estimated)">
        <div className="text-4xl font-black font-mono">{fmt(r.total)}</div>
        <p className="text-white/80 mt-2 text-sm">on {fmt(r.net)} net self-employment income — take-home {fmt(r.takeHome)}, effective rate {r.effRate.toFixed(1)}%</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Self-Employment Tax</p><p className="font-mono text-xl font-bold">{fmt(r.seTax)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Federal Income Tax</p><p className="font-mono text-xl font-bold">{fmt(r.federal1099)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">State Tax</p><p className="font-mono text-xl font-bold">{fmt(r.state)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Set Aside Per $ Earned</p><p className="font-mono text-xl font-bold">{r.setAside}%</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Quarterly Estimated Payments</h4>
        <div className="grid grid-cols-2 gap-3">
          {QUARTERS.map((q) => (<div key={q.n} className="border rounded-xl p-4"><p className="text-xs font-bold text-muted-foreground uppercase">{q.n} · due {q.due}</p><p className="font-mono font-bold text-lg mt-1">{fmt(r.quarterly)}</p><p className="text-xs text-muted-foreground">{q.period}</p></div>))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Differentiator: SE tax is calculated on 92.35% of net earnings with the deductible half credited back, then split into the four real IRS payment deadlines (Q4 is due the following January).</p>
      </div>
    </div>
  </div>
      <ToolActionsBar slug="1099-tax-calculator" isPro={isPro} inputs={{ income, expenses, w2, status, statePct }} />
    </>)
}
