/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const fmtC = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function AmountInput({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div></div>)
}
function NumSlider({ label, value, onChange, min, max, step = 1, suffix = '' }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; step?: number; suffix?: string }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}{suffix}</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

type Bracket = { upTo: number; rate: number }
const BRACKETS_SINGLE: Bracket[] = [{ upTo: 11925, rate: 0.10 }, { upTo: 48475, rate: 0.12 }, { upTo: 103350, rate: 0.22 }, { upTo: 197300, rate: 0.24 }, { upTo: 250525, rate: 0.32 }, { upTo: 626350, rate: 0.35 }, { upTo: Infinity, rate: 0.37 }]
function bracketTax(taxable: number) { let tax = 0, prev = 0; for (const b of BRACKETS_SINGLE) { if (taxable <= prev) break; const amt = Math.min(taxable, b.upTo) - prev; if (amt > 0) tax += amt * b.rate; prev = b.upTo } return tax }

type Period = 'hourly' | 'weekly' | 'monthly' | 'annual'
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [amount, setAmount] = useState(75000)
  const [period, setPeriod] = useState<Period>('annual')
  const [hoursPerWeek, setHoursPerWeek] = useState(40)
  const [weeksPerYear, setWeeksPerYear] = useState(52)

  const r = useMemo(() => {
    const hoursPerYear = Math.max(1, hoursPerWeek * weeksPerYear)
    // Normalise any input period to an annual salary, then derive every other period from it.
    const annual = period === 'annual' ? amount : period === 'monthly' ? amount * 12 : period === 'weekly' ? amount * weeksPerYear : amount * hoursPerYear
    const hourly = annual / hoursPerYear
    const weekly = annual / Math.max(1, weeksPerYear)
    const monthly = annual / 12
    // After-tax estimate: single filer, standard deduction, federal brackets + FICA 7.65%
    const federal = bracketTax(Math.max(0, annual - 16100))
    const fica = Math.min(annual, 184500) * 0.062 + annual * 0.0145 + Math.max(0, annual - 200000) * 0.009
    const net = annual - federal - fica
    return { annual, hourly, weekly, monthly, daily: weekly / 5, biweekly: annual / 26, federal, fica, net, netMonthly: net / 12, effRate: annual > 0 ? ((federal + fica) / annual) * 100 : 0 }
  }, [amount, period, hoursPerWeek, weeksPerYear])

  const rows: { label: string; gross: string; net: string }[] = [
    { label: 'Hourly', gross: fmtC(r.hourly), net: fmtC(r.hourly * (1 - r.effRate / 100)) },
    { label: 'Daily (8h)', gross: fmtC(r.hourly * 8), net: fmtC(r.hourly * 8 * (1 - r.effRate / 100)) },
    { label: 'Weekly', gross: fmt(r.weekly), net: fmt(r.weekly * (1 - r.effRate / 100)) },
    { label: 'Bi-weekly', gross: fmt(r.biweekly), net: fmt(r.biweekly * (1 - r.effRate / 100)) },
    { label: 'Monthly', gross: fmt(r.monthly), net: fmt(r.netMonthly) },
    { label: 'Annual', gross: fmt(r.annual), net: fmt(r.net) },
  ]

  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <AmountInput label="Pay Amount" value={amount} onChange={setAmount} />
        <div className="space-y-2"><label className="text-sm font-semibold">Paid Per</label>
          <select value={period} onChange={(e) => setPeriod(e.target.value as Period)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
            <option value="hourly">Hour</option><option value="weekly">Week</option><option value="monthly">Month</option><option value="annual">Year</option>
          </select></div>
      </div>
      <NumSlider label="Hours Worked per Week" value={hoursPerWeek} onChange={setHoursPerWeek} min={1} max={80} suffix=" hrs" />
      <NumSlider label="Weeks Worked per Year" value={weeksPerYear} onChange={setWeeksPerYear} min={1} max={52} suffix=" wks" />
      <p className="text-xs text-muted-foreground">Differentiator: enter pay in ANY period and get the full conversion matrix — including estimated after-tax figures using projected 2026 federal brackets + FICA for a single filer. Estimate only — verify with the IRS.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Annual Salary">
        <div className="text-4xl font-black font-mono">{fmt(r.annual)}</div>
        <p className="text-white/80 mt-2 text-sm">= {fmtC(r.hourly)}/hour · estimated take-home {fmt(r.net)}/yr ({r.effRate.toFixed(1)}% total tax)</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Federal Tax</p><p className="font-mono text-xl font-bold">{fmt(r.federal)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">FICA</p><p className="font-mono text-xl font-bold">{fmt(r.fica)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Full Conversion Matrix</h4>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted-foreground border-b"><th className="py-2 font-semibold">Period</th><th className="py-2 font-semibold text-right">Gross</th><th className="py-2 font-semibold text-right">After Tax (est.)</th></tr></thead>
          <tbody>{rows.map((row) => (<tr key={row.label} className="border-b last:border-0"><td className="py-2.5 font-medium">{row.label}</td><td className="py-2.5 text-right font-mono">{row.gross}</td><td className="py-2.5 text-right font-mono text-[#064E3B] dark:text-emerald-400 font-semibold">{row.net}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  </div>)
}
