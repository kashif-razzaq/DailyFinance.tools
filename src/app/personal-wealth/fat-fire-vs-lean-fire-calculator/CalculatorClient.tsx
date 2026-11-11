/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

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

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [lean, setLean] = useState(3000); const [fat, setFat] = useState(10000)
  const [saved, setSaved] = useState(80000); const [monthlySave, setMonthlySave] = useState(1500); const [ret, setRet] = useState(7)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.lean !== undefined) setLean(s.lean as any)
    if (s.fat !== undefined) setFat(s.fat as any)
    if (s.saved !== undefined) setSaved(s.saved as any)
    if (s.monthlySave !== undefined) setMonthlySave(s.monthlySave as any)
    if (s.ret !== undefined) setRet(s.ret as any)
  })

  const yearsTo = (target: number) => { let bal = saved, m = 0; const mr = ret / 100 / 12; while (bal < target && m < 1200) { bal = bal * (1 + mr) + monthlySave; m++ } return m / 12 }
  const leanTarget = lean * 12 * 25, fatTarget = fat * 12 * 25
  const incomeProxy = monthlySave * 4
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Lean FIRE Monthly Spending" value={lean} onChange={setLean} hint="A lean, essentials-first retirement month." /><MoneyInput label="Fat FIRE Monthly Spending" value={fat} onChange={setFat} hint="A generous retirement month: travel, dining, upgrades." /></div>
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Invested Today" value={saved} onChange={setSaved} /><MoneyInput label="Monthly Saving" value={monthlySave} onChange={setMonthlySave} /></div>
      <PctSlider label="Expected Annual Return" value={ret} onChange={setRet} min={1} max={12} step={0.25} />
      <p className="text-xs text-muted-foreground">FIRE numbers use the 25× rule (the inverse of the 4% guideline): annual spending × 25. The 4% guideline is a planning heuristic from US historical data, not a guarantee.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      {[{ label: 'Lean FIRE', target: leanTarget, yrs: yearsTo(leanTarget), monthly: lean, color: 'bg-slate-800' }, { label: 'Fat FIRE', target: fatTarget, yrs: yearsTo(fatTarget), monthly: fat, color: 'bg-[#064E3B]' }].map(x => (
        <div key={x.label} className={`${x.color} text-white rounded-2xl p-6 md:p-8 shadow-xl`}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">{x.label} — {fmt(x.monthly)}/month</h3>
          <div className="text-4xl font-black font-mono">{fmt(x.target)}</div>
          <p className="text-white/80 text-sm mt-2">Your FIRE number for this lifestyle. At {fmt(monthlySave)}/month of saving you reach it in about <strong className="font-mono">{x.yrs >= 100 ? '100+' : x.yrs.toFixed(1)} years</strong>.</p>
        </div>))}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-900 text-sm">The gap between the two lifestyles is <strong className="font-mono">{fmt(fatTarget - leanTarget)}</strong> and about <strong>{(yearsTo(fatTarget) - yearsTo(leanTarget)).toFixed(1)} extra years</strong> of saving. Most people land between the two — Barista FIRE and Coast FIRE (also on this site) exist for exactly that middle ground. Assumed monthly income for savings-rate context: saving {fmt(monthlySave)} is the lever, whichever number you choose.</div>
    <ToolActionsBar slug="fat-fire-vs-lean-fire-calculator" isPro={isPro} inputs={{ lean, fat, saved, monthlySave, ret }} />
    </div></div></>)
}
