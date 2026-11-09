/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
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
function marginalRate(taxable: number, brackets: Bracket[]) { for (const b of brackets) if (taxable <= b.upTo) return b.rate; return 0.37 }

// Typical effective state income-tax rates at middle incomes — a planning estimate, not the statutory top rate.
const STATES: { name: string; rate: number }[] = [
  { name: 'No state income tax (TX, FL, WA…)', rate: 0 }, { name: 'Arizona', rate: 2.5 }, { name: 'Colorado', rate: 4.4 },
  { name: 'Illinois', rate: 4.95 }, { name: 'Georgia', rate: 5.4 }, { name: 'North Carolina', rate: 4.25 },
  { name: 'Virginia', rate: 5.0 }, { name: 'Massachusetts', rate: 5.0 }, { name: 'New Jersey', rate: 6.0 },
  { name: 'New York', rate: 6.0 }, { name: 'Oregon', rate: 8.0 }, { name: 'California', rate: 9.3 },
]

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [income, setIncome] = useState(95000)
  const [status, setStatus] = useState<'single' | 'mfj'>('single')
  const [stateIdx, setStateIdx] = useState(11) // California default shows the full picture
  const [customState, setCustomState] = useState(false)
  const [customPct, setCustomPct] = useState(5)

  const r = useMemo(() => {
    const taxable = Math.max(0, income - STD_DED[status])
    const federal = bracketTax(taxable, BRACKETS[status])
    const ss = Math.min(income, 184500) * 0.062
    const medicare = income * 0.0145 + Math.max(0, income - (status === 'mfj' ? 250000 : 200000)) * 0.009
    const stateRate = customState ? customPct : STATES[stateIdx].rate
    const state = income * (stateRate / 100)
    const total = federal + ss + medicare + state
    return { taxable, federal, ss, medicare, state, stateRate, total, net: income - total, combinedEff: income > 0 ? (total / income) * 100 : 0, fedEff: income > 0 ? (federal / income) * 100 : 0, marginal: marginalRate(taxable, BRACKETS[status]) * 100 }
  }, [income, status, stateIdx, customState, customPct])

  const chart = [{ name: 'Your income', 'Take-home': Math.round(r.net), 'Federal': Math.round(r.federal), 'State': Math.round(r.state), 'FICA': Math.round(r.ss + r.medicare) }]

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Gross Annual Income" value={income} onChange={setIncome} />
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2"><label className="text-sm font-semibold">Filing Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as 'single' | 'mfj')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
            <option value="single">Single</option><option value="mfj">Married Filing Jointly</option>
          </select></div>
        <div className="space-y-2"><label className="text-sm font-semibold">State (effective-rate estimate)</label>
          <select value={customState ? 'custom' : String(stateIdx)} onChange={(e) => { if (e.target.value === 'custom') setCustomState(true); else { setCustomState(false); setStateIdx(Number(e.target.value)) } }} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
            {STATES.map((s, i) => <option key={s.name} value={i}>{s.name} — {s.rate}%</option>)}
            <option value="custom">Custom rate…</option>
          </select></div>
      </div>
      {customState && (<div className="space-y-2"><label className="text-sm font-semibold">Custom State Rate (%)</label>
        <Input type="number" step="0.1" value={customPct === 0 ? '' : customPct} onChange={(e) => setCustomPct(num(e.target.value))} className="font-mono" /></div>)}
      <p className="text-xs text-muted-foreground">State figures use typical effective rates for planning. Estimate only, using projected 2026 federal brackets — verify with the IRS and your state revenue department.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Total Tax Burden">
        <div className="text-4xl font-black font-mono">{fmt(r.total)}</div>
        <p className="text-white/80 mt-2 text-sm">combined effective rate {r.combinedEff.toFixed(1)}% — you keep {fmt(r.net)}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Federal (eff. {r.fedEff.toFixed(1)}%)</p><p className="font-mono text-xl font-bold">{fmt(r.federal)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">State ({r.stateRate}%)</p><p className="font-mono text-xl font-bold">{fmt(r.state)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Social Security</p><p className="font-mono text-xl font-bold">{fmt(r.ss)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Medicare</p><p className="font-mono text-xl font-bold">{fmt(r.medicare)}</p></div>
        </div>
        <p className="text-white/70 text-xs mt-5">Your federal marginal bracket is {r.marginal.toFixed(0)}% — that rate applies only to the top slice of your income, not to all of it.</p>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Income Split: Tax vs Take-Home</h4>
        <ResponsiveContainer width="100%" height={130}><BarChart data={chart} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><YAxis type="category" dataKey="name" width={80} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Legend />
          <Bar dataKey="Take-home" stackId="a" fill="#064E3B" /><Bar dataKey="Federal" stackId="a" fill="#D97706" /><Bar dataKey="State" stackId="a" fill="#9333EA" /><Bar dataKey="FICA" stackId="a" fill="#2563EB" /></BarChart></ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-3">Differentiator: most calculators show federal tax only — this one stacks federal + state + FICA so you see the true all-in burden.</p>
      </div>
    </div>
  </div><ToolActionsBar slug="income-tax-calculator" isPro={isPro} inputs={{ income, status, stateIdx, customState, customPct }} /></>)
}
