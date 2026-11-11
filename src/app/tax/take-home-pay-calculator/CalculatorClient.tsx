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
const fmtC = (n: number) => curSym() + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function PctSlider({ label, value, onChange, min = 0, max = 30, step = 0.5, hint }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number; hint?: string }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} />{hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
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
const PERIODS: Record<string, number> = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 }

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [gross, setGross] = useState(90000)
  const [freq, setFreq] = useState<keyof typeof PERIODS>('biweekly')
  const [status, setStatus] = useState<'single' | 'mfj'>('single')
  const [k401Pct, setK401Pct] = useState(6)
  const [hsa, setHsa] = useState(1200)
  const [healthPerCheck, setHealthPerCheck] = useState(85)
  const [statePct, setStatePct] = useState(5)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.gross !== undefined) setGross(s.gross as any)
    if (s.freq !== undefined) setFreq(s.freq as any)
    if (s.status !== undefined) setStatus(s.status as any)
    if (s.k401Pct !== undefined) setK401Pct(s.k401Pct as any)
    if (s.hsa !== undefined) setHsa(s.hsa as any)
    if (s.healthPerCheck !== undefined) setHealthPerCheck(s.healthPerCheck as any)
    if (s.statePct !== undefined) setStatePct(s.statePct as any)
  })


  const r = useMemo(() => {
    const periods = PERIODS[freq]
    const k401 = gross * (k401Pct / 100)
    const health = healthPerCheck * periods
    // Waterfall: gross − pre-tax deductions = taxable wages; taxes then come out of taxable wages.
    const taxableWages = Math.max(0, gross - k401 - hsa - health)
    const federal = bracketTax(Math.max(0, taxableWages - STD_DED[status]), BRACKETS[status])
    const ss = Math.min(taxableWages, 184500) * 0.062
    const medicare = taxableWages * 0.0145 + Math.max(0, taxableWages - (status === 'mfj' ? 250000 : 200000)) * 0.009
    const state = taxableWages * (statePct / 100)
    const totalTax = federal + ss + medicare + state
    const net = gross - k401 - hsa - health - totalTax
    // Tax saved by pre-tax deductions: compare federal+FICA with no deductions
    const noDedFederal = bracketTax(Math.max(0, gross - STD_DED[status]), BRACKETS[status])
    const noDedFica = Math.min(gross, 184500) * 0.062 + gross * 0.0145
    const taxSaved = Math.max(0, (noDedFederal + noDedFica) - (federal + ss + medicare))
    return { periods, k401, health, taxableWages, federal, ss, medicare, state, totalTax, net, taxSaved, netPerCheck: net / periods, grossPerCheck: gross / periods }
  }, [gross, freq, status, k401Pct, hsa, healthPerCheck, statePct])

  const waterfall = [
    { step: 'Gross pay', amount: Math.round(gross), color: '#1F2937' },
    { step: '401(k)', amount: Math.round(gross - r.k401), color: '#6B7280' },
    { step: 'HSA + health', amount: Math.round(gross - r.k401 - hsa - r.health), color: '#6B7280' },
    { step: 'After federal', amount: Math.round(gross - r.k401 - hsa - r.health - r.federal), color: '#D97706' },
    { step: 'After FICA', amount: Math.round(gross - r.k401 - hsa - r.health - r.federal - r.ss - r.medicare), color: '#2563EB' },
    { step: 'Net (after state)', amount: Math.round(r.net), color: '#064E3B' },
  ]

  const line = (label: string, annual: number) => (
    <div className="flex justify-between text-sm py-1.5 border-b border-dashed last:border-0"><span className="text-muted-foreground">{label}</span><span className="font-mono font-semibold">−{fmt(annual)} <span className="text-muted-foreground font-normal">({fmtC(annual / r.periods)}/check)</span></span></div>
  )

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <MoneyInput label="Gross Annual Salary" value={gross} onChange={setGross} />
        <div className="space-y-2"><label className="text-sm font-semibold">Pay Frequency</label>
          <select value={freq} onChange={(e) => setFreq(e.target.value as keyof typeof PERIODS)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
            <option value="weekly">Weekly</option><option value="biweekly">Bi-weekly</option><option value="semimonthly">Semi-monthly</option><option value="monthly">Monthly</option>
          </select></div>
      </div>
      <div className="space-y-2"><label className="text-sm font-semibold">Filing Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value as 'single' | 'mfj')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
          <option value="single">Single</option><option value="mfj">Married Filing Jointly</option>
        </select></div>
      <PctSlider label="401(k) Contribution" value={k401Pct} onChange={setK401Pct} hint="Pre-tax: every 1% contributed also cuts your federal tax and FICA bill." />
      <div className="grid grid-cols-2 gap-6">
        <MoneyInput label="HSA Contributions / Year" value={hsa} onChange={setHsa} />
        <MoneyInput label="Health Premium / Paycheck" value={healthPerCheck} onChange={setHealthPerCheck} />
      </div>
      <PctSlider label="State Tax (flat estimate)" value={statePct} onChange={setStatePct} max={13} step={0.1} />
      <p className="text-xs text-muted-foreground">Estimate only, using projected 2026 federal brackets — verify with the IRS.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Net Take-Home Pay">
        <div className="text-4xl font-black font-mono">{fmtC(r.netPerCheck)}</div>
        <p className="text-white/80 mt-2 text-sm">per paycheck · {fmt(r.net)} per year from {fmtC(r.grossPerCheck)} gross per check</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Tax / Year</p><p className="font-mono text-xl font-bold">{fmt(r.totalTax)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Tax Saved by Pre-Tax</p><p className="font-mono text-xl font-bold">{fmt(r.taxSaved)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Deduction Detail (annual)</h4>
        {line('401(k) contribution', r.k401)}
        {line('HSA', hsa)}
        {line('Health premiums', r.health)}
        {line('Federal income tax', r.federal)}
        {line('Social Security + Medicare', r.ss + r.medicare)}
        {line('State tax', r.state)}
      </div>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">The Waterfall: Gross to Net</h4>
        <ResponsiveContainer width="100%" height={230}><BarChart data={waterfall}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="step" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={50} /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} />
          <Bar dataKey="amount" name="Remaining pay">{waterfall.map((w) => <Cell key={w.step} fill={w.color} />)}</Bar></BarChart></ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2">Differentiator: watch each deduction shrink your pay step by step — and see exactly how much tax your pre-tax contributions save you.</p>
      </div>
    <ToolActionsBar slug="take-home-pay-calculator" isPro={isPro} inputs={{ gross, freq, status, k401Pct, hsa, healthPerCheck, statePct }} />
    </div>
  </div></>)
}
