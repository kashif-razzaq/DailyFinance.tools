'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

export const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
export const fmt2 = (n: number) => curSym() + n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
export const pct = (n: number) => (isFinite(n) ? n.toFixed(2) : '0.00') + '%'

export function Num({ label, value, set, min=0, step=1, prefix=curSym() }: { label: string; value: number; set: (n:number)=>void; min?: number; step?: number; prefix?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{prefix}</span><Input type="number" min={min} step={step} value={value===0?'':value} onChange={e=>set(e.target.value===''?0:Number(e.target.value))} className="pl-7 font-mono" /></div></div>)
}
export function Slide({ label, value, set, min, max, step=0.1, suffix='%' }: { label: string; value: number; set:(n:number)=>void; min:number; max:number; step?:number; suffix?:string }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}{suffix}</span></div><Slider value={[value]} min={min} max={max} step={step} onValueChange={(v:any)=>set(Array.isArray(v)?v[0]:v)} /></div>)
}
export function Shell({ inputs, children }: { inputs: React.ReactNode; children: React.ReactNode }) {
  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">{inputs}</div><div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">{children}</div></div>)
}
export function Result({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-8 shadow-xl relative overflow-hidden"><div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" /><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 relative">{label}</h3><div className="text-5xl font-black font-mono tracking-tight relative">{value}</div>{sub && <p className="mt-3 text-white/80 text-sm relative">{sub}</p>}</div>)
}
export function Row({ label, value, bold=false }: { label: string; value: string; bold?: boolean }) {
  return (<div className="flex justify-between py-2 border-b border-neutral-100 last:border-0"><span className="text-sm text-neutral-500">{label}</span><span className={`font-mono text-sm ${bold?'font-bold text-[#064E3B]':'font-semibold'}`}>{value}</span></div>)
}
export function Breakdown({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-card border shadow-sm rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">{title}</h4>{children}</div>)
}


const DEFAULTS = [
  { name: 'Roof', cost: 12000, life: 25 }, { name: 'HVAC / Furnace', cost: 8000, life: 15 }, { name: 'Water Heater', cost: 1500, life: 10 },
  { name: 'Appliances', cost: 4000, life: 12 }, { name: 'Exterior Paint', cost: 5000, life: 7 }, { name: 'Flooring', cost: 6000, life: 15 },
  { name: 'Plumbing', cost: 3000, life: 25 }, { name: 'Driveway / Concrete', cost: 4500, life: 20 },
]
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [items, setItems] = useState(DEFAULTS); const [units, setUnits] = useState(1)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.items !== undefined) setItems(s.items as any)
    if (s.units !== undefined) setUnits(s.units as any)
  })

  const setItem = (i: number, key: 'cost'|'life', v: number) => setItems(prev => prev.map((x, idx) => idx === i ? { ...x, [key]: v } : x))
  const annual = items.reduce((s, x) => s + (x.life > 0 ? x.cost / x.life : 0), 0); const monthly = annual / 12 * units; const totalCost = items.reduce((s, x) => s + x.cost, 0)
  return (<><Shell inputs={<>
    <Num label="Number of Units / Properties" value={units} set={setUnits} prefix="" />
    <div className="space-y-3">{items.map((x, i) => (<div key={x.name} className="grid grid-cols-3 gap-3 items-center border-b border-neutral-100 pb-3"><span className="text-sm font-semibold">{x.name}</span><div><label className="text-[11px] text-muted-foreground">Replace cost $</label><Input type="number" value={x.cost} onChange={e => setItem(i, 'cost', Number(e.target.value))} className="font-mono" /></div><div><label className="text-[11px] text-muted-foreground">Lifespan (yrs)</label><Input type="number" value={x.life} onChange={e => setItem(i, 'life', Number(e.target.value))} className="font-mono" /></div></div>))}</div>
    <p className="text-sm text-muted-foreground">Rule: monthly reserve per item = replacement cost ÷ (lifespan × 12). A roof does not send a warning letter — the reserve is what turns a $12,000 emergency into a planned expense.</p>
  </>}>
    <Result label="Monthly CapEx Reserve Needed" value={fmt(monthly)} sub={`Per property: ${fmt(annual/12)}/mo, ${fmt(annual)}/yr. Skipping this reserve is the #1 way rental cash flow gets overstated.`} />
    <Breakdown title="Reserve Breakdown">{items.map(x => (<Row key={x.name} label={`${x.name} (${x.life} yrs)`} value={fmt(x.life > 0 ? x.cost/x.life/12 * units : 0) + ' / mo'} />))}<Row label="Total replacement exposure" value={fmt(totalCost * units)} bold /><Row label="Annual reserve" value={fmt(annual * units)} bold /></Breakdown>
  </Shell><ToolActionsBar slug="capex-reserve-planner" isPro={isPro} inputs={{ items, units }} /></>)
}
