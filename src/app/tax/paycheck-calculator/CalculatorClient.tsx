/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
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
function PctSlider({ label, value, onChange, min = 0, max = 15, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
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
const SS_WAGE_BASE = 184500 // 2026 Social Security wage base (projected)
function bracketTax(taxable: number, brackets: Bracket[]) {
  let tax = 0, prev = 0
  for (const b of brackets) { if (taxable <= prev) break; const amt = Math.min(taxable, b.upTo) - prev; if (amt > 0) tax += amt * b.rate; prev = b.upTo }
  return tax
}
const FREQ: Record<string, { label: string; periods: number }> = {
  weekly: { label: 'Weekly', periods: 52 }, biweekly: { label: 'Bi-weekly', periods: 26 },
  semimonthly: { label: 'Semi-monthly', periods: 24 }, monthly: { label: 'Monthly', periods: 12 },
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [salary, setSalary] = useState(78000)
  const [freq, setFreq] = useState<keyof typeof FREQ>('biweekly')
  const [status, setStatus] = useState<'single' | 'mfj'>('single')
  const [statePct, setStatePct] = useState(5)
  const [retirement, setRetirement] = useState(3120) // annual pre-tax 401(k) etc.

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.salary !== undefined) setSalary(s.salary as any)
    if (s.freq !== undefined) setFreq(s.freq as any)
    if (s.status !== undefined) setStatus(s.status as any)
    if (s.statePct !== undefined) setStatePct(s.statePct as any)
    if (s.retirement !== undefined) setRetirement(s.retirement as any)
  })


  const r = useMemo(() => {
    const periods = FREQ[freq].periods
    const taxableWages = Math.max(0, salary - retirement)
    // Federal income tax on wages after pre-tax deductions and the standard deduction
    const federal = bracketTax(Math.max(0, taxableWages - STD_DED[status]), BRACKETS[status])
    // FICA: Social Security 6.2% up to the wage base + Medicare 1.45% (+0.9% over $200k/$250k)
    const ss = Math.min(taxableWages, SS_WAGE_BASE) * 0.062
    const medicare = taxableWages * 0.0145 + Math.max(0, taxableWages - (status === 'mfj' ? 250000 : 200000)) * 0.009
    const state = salary * (statePct / 100)
    const totalTax = federal + ss + medicare + state
    const netAnnual = salary - totalTax - retirement
    const per = (annual: number) => annual / periods
    return {
      periods, federal, ss, medicare, state, totalTax, netAnnual,
      grossP: per(salary), fedP: per(federal), ssP: per(ss), medP: per(medicare), stateP: per(state), retP: per(retirement), netP: per(netAnnual),
      takeHomePct: salary > 0 ? (netAnnual / salary) * 100 : 0,
    }
  }, [salary, freq, status, statePct, retirement])

  const pie = [
    { name: 'Take-home', value: Math.max(0, Math.round(r.netAnnual)), color: '#064E3B' },
    { name: 'Federal tax', value: Math.round(r.federal), color: '#D97706' },
    { name: 'FICA', value: Math.round(r.ss + r.medicare), color: '#2563EB' },
    { name: 'State tax', value: Math.round(r.state), color: '#9333EA' },
    { name: 'Retirement', value: Math.round(retirement), color: '#6B7280' },
  ].filter((d) => d.value > 0)

  const stubRow = (label: string, per: number, annual: number, neg = true) => (
    <div className="flex justify-between text-sm py-1.5 border-b border-dashed last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-semibold">{neg ? '−' : ''}{fmtC(per)} <span className="text-muted-foreground font-normal">/ {fmt(annual)}</span></span>
    </div>
  )

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Gross Annual Salary" value={salary} onChange={setSalary} />
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2"><label className="text-sm font-semibold">Pay Frequency</label>
          <select value={freq} onChange={(e) => setFreq(e.target.value as keyof typeof FREQ)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
            {Object.entries(FREQ).map(([v, f]) => <option key={v} value={v}>{f.label} ({f.periods}/yr)</option>)}
          </select></div>
        <div className="space-y-2"><label className="text-sm font-semibold">Filing Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as 'single' | 'mfj')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
            <option value="single">Single</option><option value="mfj">Married Filing Jointly</option>
          </select></div>
      </div>
      <PctSlider label="State Income Tax (flat estimate)" value={statePct} onChange={setStatePct} min={0} max={13} step={0.1} />
      <MoneyInput label="Pre-Tax Deductions per Year (401k, HSA…)" value={retirement} onChange={setRetirement} hint="Pre-tax deductions lower your federal taxable wages before tax is worked out." />
      <p className="text-xs text-muted-foreground">Estimate only, using projected 2026 federal brackets and FICA rates — verify with the IRS / your payroll provider.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`Net Paycheck (${FREQ[freq].label})`}>
        <div className="text-4xl font-black font-mono">{fmtC(r.netP)}</div>
        <p className="text-white/80 mt-2 text-sm">{fmt(r.netAnnual)} take-home per year — {r.takeHomePct.toFixed(1)}% of your gross pay</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Gross / Check</p><p className="font-mono text-xl font-bold">{fmtC(r.grossP)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Tax / Year</p><p className="font-mono text-xl font-bold">{fmt(r.totalTax)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Pay Stub Breakdown <span className="normal-case font-normal">(per check / per year)</span></h4>
        {stubRow('Gross pay', r.grossP, salary, false)}
        {stubRow('Federal income tax', r.fedP, r.federal)}
        {stubRow('Social Security (6.2%)', r.ssP, r.ss)}
        {stubRow('Medicare (1.45%)', r.medP, r.medicare)}
        {stubRow('State income tax', r.stateP, r.state)}
        {stubRow('Pre-tax deductions', r.retP, retirement)}
        <div className="flex justify-between text-sm pt-3 font-bold"><span>Net pay</span><span className="font-mono">{fmtC(r.netP)} / {fmt(r.netAnnual)}</span></div>
      </div>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Where Each Paycheck Goes</h4>
        <ResponsiveContainer width="100%" height={190}><PieChart><Pie data={pie} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>{pie.map((d) => <Cell key={d.name} fill={d.color} />)}</Pie><Tooltip formatter={(v: any) => fmt(Number(v))} /></PieChart></ResponsiveContainer>
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">{pie.map((d) => <span key={d.name} className="text-xs flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />{d.name}</span>)}</div>
      </div>
    <ToolActionsBar slug="paycheck-calculator" isPro={isPro} inputs={{ salary, freq, status, statePct, retirement }} />
    </div>
  </div></>)
}
