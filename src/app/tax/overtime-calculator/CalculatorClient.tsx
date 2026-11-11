/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmtC = (n: number) => curSym() + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" step="0.01" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function HourSlider({ label, value, onChange, max = 60 }: { label: string; value: number; onChange: (n: number) => void; max?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value} hrs</span></div>
    <Slider value={[value]} min={0} max={max} step={0.5} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [rate, setRate] = useState(25)
  const [regHours, setRegHours] = useState(40)
  const [otHours, setOtHours] = useState(8)
  const [dtHours, setDtHours] = useState(0)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.regHours !== undefined) setRegHours(s.regHours as any)
    if (s.otHours !== undefined) setOtHours(s.otHours as any)
    if (s.dtHours !== undefined) setDtHours(s.dtHours as any)
  })


  const r = useMemo(() => {
    // Regular pay = rate x regular hours; OT pays 1.5x; double time pays 2x.
    // The "premium" is the extra above straight time: 0.5x for OT hours, 1x for double-time hours.
    const regPay = rate * regHours
    const otPay = rate * 1.5 * otHours
    const dtPay = rate * 2 * dtHours
    const premium = rate * 0.5 * otHours + rate * 1 * dtHours
    const weekly = regPay + otPay + dtPay
    const totalHours = regHours + otHours + dtHours
    return { regPay, otPay, dtPay, premium, weekly, monthly: weekly * 52 / 12, annual: weekly * 52, blended: totalHours > 0 ? weekly / totalHours : 0, otShare: weekly > 0 ? ((otPay + dtPay) / weekly) * 100 : 0 }
  }, [rate, regHours, otHours, dtHours])

  const chart = [{ name: 'Weekly pay', 'Regular': Math.round(r.regPay), 'Overtime (1.5x)': Math.round(r.otPay), 'Double time (2x)': Math.round(r.dtPay) }]

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Hourly Rate" value={rate} onChange={setRate} hint="Your standard (straight-time) hourly wage." />
      <HourSlider label="Regular Hours per Week" value={regHours} onChange={setRegHours} />
      <HourSlider label="Overtime Hours per Week (1.5x)" value={otHours} onChange={setOtHours} max={40} />
      <HourSlider label="Double-Time Hours per Week (2x)" value={dtHours} onChange={setDtHours} max={30} />
      <p className="text-xs text-muted-foreground">US federal law (FLSA) requires 1.5x for hours over 40/week for most non-exempt workers; some states and employers add daily overtime or double time. Gross estimate before tax.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Weekly Gross Pay">
        <div className="text-4xl font-black font-mono">{fmtC(r.weekly)}</div>
        <p className="text-white/80 mt-2 text-sm">{fmt(r.monthly)}/month · {fmt(r.annual)}/year if this schedule holds</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">OT Premium Alone</p><p className="font-mono text-xl font-bold">{fmtC(r.premium)}<span className="text-sm font-normal">/wk</span></p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Blended Rate</p><p className="font-mono text-xl font-bold">{fmtC(r.blended)}<span className="text-sm font-normal">/hr</span></p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Regular Pay</p><p className="font-mono text-xl font-bold">{fmtC(r.regPay)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">OT + DT Pay</p><p className="font-mono text-xl font-bold">{fmtC(r.otPay + r.dtPay)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">What Makes Up the Week</h4>
        <ResponsiveContainer width="100%" height={120}><BarChart data={chart} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" tickFormatter={(v: number) => sym + v} /><YAxis type="category" dataKey="name" width={75} /><Tooltip formatter={(v: any) => fmtC(Number(v))} /><Legend />
          <Bar dataKey="Regular" stackId="a" fill="#1F2937" /><Bar dataKey="Overtime (1.5x)" stackId="a" fill="#D97706" /><Bar dataKey="Double time (2x)" stackId="a" fill="#064E3B" /></BarChart></ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-3">Differentiator: overtime is {r.otShare.toFixed(0)}% of this paycheck, and {fmt(r.premium * 52)}/year of it is pure premium — the extra half/double above straight time.</p>
      </div>
    </div>
  </div><ToolActionsBar slug="overtime-calculator" isPro={isPro} inputs={{ rate, regHours, otHours, dtHours }} /></>)
}
