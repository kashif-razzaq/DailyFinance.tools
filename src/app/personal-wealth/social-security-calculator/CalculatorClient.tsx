/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const fmt2 = (n: number) => curSym() + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
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
function NumInput({ label, value, onChange, hint, min, max }: { label: string; value: number; onChange: (n: number) => void; hint?: string; min?: number; max?: number }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <Input type="number" value={value === 0 ? '' : value} min={min} max={max} onChange={(e) => onChange(num(e.target.value))} className="font-mono" />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

// Formula (simplified PIA estimate, 2024 bend points):
//  Effective average earnings adjust for short careers: if yearsWorked < 35, the missing years count as $0,
//    so effectiveAnnual = annualEarnings * min(yearsWorked, 35) / 35.
//  AIME = effectiveAnnual / 12.
//  PIA = 90% x first $1,174 of AIME + 32% x AIME between $1,174 and $7,078 + 15% x AIME above $7,078.
//  Claiming adjustments (full retirement age 67): age 62 -> x0.70, age 67 -> x1.00, age 70 -> x1.24.
//  Lifetime total to age 85 = monthly benefit x 12 x (85 - claiming age).
//  Break-even age between an early factor fE starting at age aE and a later factor fL starting at aL:
//    solve fE*(X - aE) = fL*(X - aL)  =>  X = (fL*aL - fE*aE) / (fL - fE).
function piaFromAime(aime: number) {
  const first = Math.min(aime, 1174) * 0.90
  const second = Math.max(0, Math.min(aime, 7078) - 1174) * 0.32
  const third = Math.max(0, aime - 7078) * 0.15
  return first + second + third
}
function breakEven(fE: number, aE: number, fL: number, aL: number) {
  if (fL <= fE) return 0
  return (fL * aL - fE * aE) / (fL - fE)
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [earnings, setEarnings] = useState(70000)
  const [yearsWorked, setYearsWorked] = useState(35)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.earnings !== undefined) setEarnings(s.earnings as any)
    if (s.yearsWorked !== undefined) setYearsWorked(s.yearsWorked as any)
  })


  const calc = useMemo(() => {
    const cappedYears = Math.min(35, Math.max(0, yearsWorked))
    const effectiveAnnual = cappedYears >= 35 ? earnings : earnings * cappedYears / 35
    const aime = effectiveAnnual / 12
    const pia = piaFromAime(aime)
    const rows = [
      { age: 62, factor: 0.70, label: 'Claim at 62' },
      { age: 67, factor: 1.00, label: 'Claim at 67 (full)' },
      { age: 70, factor: 1.24, label: 'Claim at 70' },
    ].map((r) => {
      const monthly = pia * r.factor
      const annual = monthly * 12
      const yearsTo85 = Math.max(0, 85 - r.age)
      const lifetime = annual * yearsTo85
      return { ...r, monthly, annual, yearsTo85, lifetime }
    })
    const be67vs62 = breakEven(0.70, 62, 1.00, 67)
    const be70vs62 = breakEven(0.70, 62, 1.24, 70)
    const be70vs67 = breakEven(1.00, 67, 1.24, 70)
    return { cappedYears, effectiveAnnual, aime, pia, rows, be67vs62, be70vs62, be70vs67 }
  }, [earnings, yearsWorked])

  const chartData = calc.rows.map((r) => ({ name: 'Age ' + r.age, monthly: Math.round(r.monthly) }))

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Average Annual Earnings" value={earnings} onChange={setEarnings} hint="Your average indexed earnings across your best 35 years of work, before tax." />
      <NumInput label="Years Worked" value={yearsWorked} onChange={(v) => setYearsWorked(Math.min(50, Math.max(0, v)))} min={0} max={50} hint="Capped at 35 for the averaging calculation: Social Security averages your best 35 years, and years below 35 count as $0 — which lowers the estimate below." />
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-muted/50 rounded-xl p-4"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Retirement Age</p><p className="font-mono font-bold text-2xl mt-1">67</p><p className="text-xs text-muted-foreground mt-1">Fixed for people born in 1960 or later.</p></div>
        <div className="bg-muted/50 rounded-xl p-4"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Estimated AIME</p><p className="font-mono font-bold text-2xl mt-1">{fmt(calc.aime)}<span className="text-sm font-normal text-muted-foreground">/mo</span></p><p className="text-xs text-muted-foreground mt-1">Average Indexed Monthly Earnings used in the formula.</p></div>
      </div>
      {yearsWorked < 35 && <p className="text-sm text-amber-700 font-semibold">With {calc.cappedYears} years worked, {35 - calc.cappedYears} zero years are averaged in, so the effective average falls to {fmt(calc.effectiveAnnual)}/year. Each additional working year replaces a zero and raises the benefit.</p>}
      {earnings === 0 && <p className="text-sm text-red-600 font-semibold">Enter your average earnings to see a benefit estimate.</p>}
      <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Simplified estimate — please read:</strong> this calculator uses a simplified estimate using 2024 bend points; it is not affiliated with the SSA — verify at ssa.gov. It ignores wage indexing detail, cost-of-living adjustments after claiming, spousal and survivor benefits, taxation of benefits, and the earnings test. Your official estimate is on your Social Security statement at ssa.gov.
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed">
        <p><strong className="text-foreground">How the estimate works:</strong> 90% of the first {fmt(1174)} of AIME, plus 32% of AIME between {fmt(1174)} and {fmt(7078)}, plus 15% of any AIME above {fmt(7078)} gives your Primary Insurance Amount (PIA) of <span className="font-mono font-bold text-foreground">{fmt(calc.pia)}/month</span> at full retirement age. Claiming early or late scales it by the factors shown.</p>
      </div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Estimated Monthly Benefit">
        <div className="text-4xl font-black font-mono">{fmt(calc.rows[1].monthly)}</div>
        <p className="text-white/80 mt-2 text-sm">per month at full retirement age 67 (your PIA)</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">At 62 (×0.70)</p><p className="font-mono text-xl font-bold">{fmt(calc.rows[0].monthly)}/mo</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">At 70 (×1.24)</p><p className="font-mono text-xl font-bold">{fmt(calc.rows[2].monthly)}/mo</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Cost of Claiming at 62</p><p className="font-mono text-xl font-bold">−{fmt(calc.rows[1].monthly - calc.rows[0].monthly)}/mo</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Gain for Waiting to 70</p><p className="font-mono text-xl font-bold">+{fmt(calc.rows[2].monthly - calc.rows[1].monthly)}/mo</p></div>
        </div>
      </ResultCard>

      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">62 vs 67 vs 70 — Monthly &amp; Lifetime to Age 85</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left"><th className="py-2 pr-2 font-semibold">Claim</th><th className="py-2 pr-2 font-semibold text-right">Monthly</th><th className="py-2 pr-2 font-semibold text-right">Annual</th><th className="py-2 font-semibold text-right">Lifetime to 85</th></tr></thead>
            <tbody className="font-mono">
              {calc.rows.map((r) => (<tr key={r.age} className="border-b last:border-0"><td className="py-2 pr-2 font-sans font-semibold">Age {r.age}</td><td className="py-2 pr-2 text-right">{fmt(r.monthly)}</td><td className="py-2 pr-2 text-right">{fmt(r.annual)}</td><td className="py-2 text-right font-bold">{fmt(r.lifetime)}</td></tr>))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">Lifetime totals assume you live to 85 and receive {calc.rows[0].yearsTo85} years of payments from 62, {calc.rows[1].yearsTo85} years from 67, or {calc.rows[2].yearsTo85} years from 70 — with no cost-of-living adjustments. Living longer favours delaying; a shorter life favours claiming early.</p>
        <div className="mt-4 space-y-2 text-sm">
          <p><strong>Break-even, 67 vs 62:</strong> waiting to 67 overtakes claiming at 62 at about <span className="font-mono font-bold">age {calc.be67vs62.toFixed(1)} (~78–79)</span>.</p>
          <p><strong>Break-even, 70 vs 62:</strong> waiting to 70 overtakes claiming at 62 at about <span className="font-mono font-bold">age {calc.be70vs62.toFixed(1)} (~80–81)</span>.</p>
          <p><strong>Break-even, 70 vs 67:</strong> waiting to 70 overtakes claiming at 67 at about <span className="font-mono font-bold">age {calc.be70vs67.toFixed(1)} (~82–83)</span>.</p>
          <p className="text-xs text-muted-foreground">Break-evens are solved from the claiming multipliers alone and ignore COLA, taxes and investment returns on early payments — use them as a guide, not a rule. Total at 85 for the 70 option: {fmt2(calc.rows[2].lifetime)}.</p>
        </div>
      </div>

      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Monthly Benefit by Claiming Age</h4>
        <ResponsiveContainer width="100%" height={200}><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Bar dataKey="monthly" name="Monthly benefit" radius={[6, 6, 0, 0]}>{chartData.map((_, i) => (<Cell key={i} fill={i === 1 ? '#064E3B' : i === 2 ? '#059669' : '#D97706'} />))}</Bar></BarChart></ResponsiveContainer></div>
    <ToolActionsBar slug="social-security-calculator" isPro={isPro} inputs={{ earnings, yearsWorked }} />
    </div></div></>)
}
