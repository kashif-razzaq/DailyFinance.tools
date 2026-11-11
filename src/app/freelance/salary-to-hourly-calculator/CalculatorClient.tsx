/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const fmtC = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function AmountInput({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
    <Input type="number" step="0.01" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div></div>)
}
function NumSlider({ label, value, onChange, min, max, step = 1, display }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; step?: number; display: string }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{display}</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [mode, setMode] = useState<'salary' | 'hourly'>('salary')
  const [amount, setAmount] = useState(80000)
  const [hoursPerWeek, setHoursPerWeek] = useState(40)
  const [weeksPerYear, setWeeksPerYear] = useState(52)
  const [unpaidWeeks, setUnpaidWeeks] = useState(0)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.mode !== undefined) setMode(s.mode as any)
    if (s.amount !== undefined) setAmount(s.amount as any)
    if (s.hoursPerWeek !== undefined) setHoursPerWeek(s.hoursPerWeek as any)
    if (s.weeksPerYear !== undefined) setWeeksPerYear(s.weeksPerYear as any)
    if (s.unpaidWeeks !== undefined) setUnpaidWeeks(s.unpaidWeeks as any)
  })


  const r = useMemo(() => {
    const paidHours = Math.max(1, hoursPerWeek * weeksPerYear)
    const workedWeeks = Math.max(1, weeksPerYear - unpaidWeeks)
    const workedHours = Math.max(1, hoursPerWeek * workedWeeks)
    // Two-way conversion: normalise to annual salary first, then split both ways.
    const annual = mode === 'salary' ? amount : amount * paidHours
    const hourlyPaid = annual / paidHours // rate spread over paid hours
    const hourlyTrue = annual / workedHours // rate per hour actually worked (unpaid leave raises it)
    const equivalentHourlyForSalary = hourlyPaid
    return { annual, hourlyPaid, hourlyTrue, workedHours, paidHours, weekly: annual / weeksPerYear, monthly: annual / 12 }
  }, [mode, amount, hoursPerWeek, weeksPerYear, unpaidWeeks])

  const compare = [35, 40, 45, 50].map((h) => ({ h, hourly: r.annual / (h * weeksPerYear) }))

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="space-y-2"><label className="text-sm font-semibold">Convert</label>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => { setMode('salary'); setAmount(80000) }} className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${mode === 'salary' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>Salary → Hourly</button>
          <button onClick={() => { setMode('hourly'); setAmount(38) }} className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${mode === 'hourly' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>Hourly → Salary</button>
        </div></div>
      <AmountInput label={mode === 'salary' ? 'Annual Salary' : 'Hourly Rate'} value={amount} onChange={setAmount} />
      <NumSlider label="Hours per Week" value={hoursPerWeek} onChange={setHoursPerWeek} min={1} max={80} display={`${hoursPerWeek} hrs`} />
      <NumSlider label="Weeks per Year (paid)" value={weeksPerYear} onChange={setWeeksPerYear} min={1} max={52} display={`${weeksPerYear} wks`} />
      <NumSlider label="Unpaid Weeks Off" value={unpaidWeeks} onChange={setUnpaidWeeks} min={0} max={12} display={`${unpaidWeeks} wks`} />
      <p className="text-xs text-muted-foreground">Paid PTO does not change your true rate — unpaid leave does. Contractors: unpaid weeks are the weeks you work without pay covering them, so your rate per worked hour must be higher.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={mode === 'salary' ? 'Equivalent Hourly Rate' : 'Equivalent Annual Salary'}>
        <div className="text-4xl font-black font-mono">{mode === 'salary' ? fmtC(r.hourlyPaid) + '/hr' : fmt(r.annual)}</div>
        <p className="text-white/80 mt-2 text-sm">{fmt(r.annual)}/yr · {fmt(r.monthly)}/mo · {fmt(r.weekly)}/wk at {hoursPerWeek} hrs/week</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">True Rate / Worked Hour</p><p className="font-mono text-xl font-bold">{fmtC(r.hourlyTrue)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Hours Actually Worked</p><p className="font-mono text-xl font-bold">{r.workedHours.toLocaleString()}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Same Salary, Different Work Weeks</h4>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted-foreground border-b"><th className="py-2 font-semibold">Schedule</th><th className="py-2 font-semibold text-right">Hourly Equivalent</th></tr></thead>
          <tbody>{compare.map((c) => (<tr key={c.h} className={`border-b last:border-0 ${c.h === hoursPerWeek ? 'font-bold text-[#064E3B] dark:text-emerald-400' : ''}`}><td className="py-2.5">{c.h} hrs/week</td><td className="py-2.5 text-right font-mono">{fmtC(c.hourly)}</td></tr>))}</tbody>
        </table>
        <p className="text-xs text-muted-foreground mt-3">Differentiator: a $80k salary at 50 hrs/week is really a $30.77/hr job. Comparing offers on hourly terms exposes the hours hidden inside a salary.</p>
      </div>
    </div>
  </div>
      <ToolActionsBar slug="salary-to-hourly-calculator" isPro={isPro} inputs={{ mode, amount, hoursPerWeek, weeksPerYear, unpaidWeeks }} />
    </>)
}
