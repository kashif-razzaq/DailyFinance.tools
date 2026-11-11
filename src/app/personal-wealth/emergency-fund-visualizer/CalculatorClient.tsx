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

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [rent, setRent] = useState(1500); const [food, setFood] = useState(600); const [transport, setTransport] = useState(350)
  const [insurance, setInsurance] = useState(300); const [other, setOther] = useState(450)
  const [saved, setSaved] = useState(5000); const [monthlySave, setMonthlySave] = useState(400); const [months, setMonths] = useState(6)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.rent !== undefined) setRent(s.rent as any)
    if (s.food !== undefined) setFood(s.food as any)
    if (s.transport !== undefined) setTransport(s.transport as any)
    if (s.insurance !== undefined) setInsurance(s.insurance as any)
    if (s.other !== undefined) setOther(s.other as any)
    if (s.saved !== undefined) setSaved(s.saved as any)
    if (s.monthlySave !== undefined) setMonthlySave(s.monthlySave as any)
    if (s.months !== undefined) setMonths(s.months as any)
  })

  const monthly = rent + food + transport + insurance + other
  const r = useMemo(() => {
    const target = monthly * months
    const gap = Math.max(0, target - saved)
    const eta = monthlySave > 0 ? Math.ceil(gap / monthlySave) : 0
    const tiers = [1, 3, 6, 9, 12].map(m => ({ label: m + ' mo', amount: monthly * m, current: m === months }))
    return { target, gap, eta, tiers, covered: saved > 0 && monthly > 0 ? (saved / monthly).toFixed(1) : '0' }
  }, [monthly, months, saved, monthlySave])
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <p className="text-sm text-muted-foreground">Enter essential monthly spending only — the bills that continue if your income stops. Discretionary spending does not belong in an emergency fund target.</p>
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Rent / Mortgage" value={rent} onChange={setRent} /><MoneyInput label="Food & Groceries" value={food} onChange={setFood} />
      <MoneyInput label="Transport" value={transport} onChange={setTransport} /><MoneyInput label="Insurance & Minimum Debt Payments" value={insurance} onChange={setInsurance} />
      <MoneyInput label="Utilities & Other Essentials" value={other} onChange={setOther} /></div>
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Months of Cover (risk level)</label><span className="font-mono font-bold">{months} months</span></div>
      <Slider value={[months]} min={1} max={12} step={1} onValueChange={(v: any) => setMonths(Array.isArray(v) ? v[0] : v)} />
      <p className="text-xs text-muted-foreground">3 months: dual income, stable job. 6 months: single income or variable work. 9–12 months: freelancer, single earner with dependants, or one-industry risk.</p></div>
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Already Saved" value={saved} onChange={setSaved} /><MoneyInput label="Monthly Saving Towards the Fund" value={monthlySave} onChange={setMonthlySave} /></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Your Emergency Fund Target">
        <div className="text-5xl font-black font-mono">{fmt(r.target)}</div>
        <p className="text-white/80 mt-3 text-sm">{months} months of essential spending at <span className="font-mono font-bold">{fmt(monthly)}/month</span>.</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Still to Save</p><p className="font-mono text-xl font-bold">{fmt(r.gap)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Months Covered Today</p><p className="font-mono text-xl font-bold">{r.covered}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Fully Funded In</p><p className="font-mono text-xl font-bold">{r.gap === 0 ? 'Done' : r.eta + ' months'}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">At Saving Rate</p><p className="font-mono text-xl font-bold">{fmt(monthlySave)}/mo</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Target by Months of Cover</h4>
        <ResponsiveContainer width="100%" height={200}><BarChart data={r.tiers}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="label" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Bar dataKey="amount" name="Target">{r.tiers.map((t, i) => (<Cell key={i} fill={t.current ? '#064E3B' : '#cbd5e1'} />))}</Bar></BarChart></ResponsiveContainer></div>
    </div></div><ToolActionsBar slug="emergency-fund-visualizer" isPro={isPro} inputs={{ rent, food, transport, insurance, other, saved, monthlySave, months }} /></>)
}
