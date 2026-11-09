'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'

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


export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [market, setMarket] = useState(500000); const [ratio, setRatio] = useState(100); const [ratePct, setRatePct] = useState(1.25); const [exemption, setExemption] = useState(50000)
  const m = useMemo(() => { const assessed = market * ratio/100; const taxable = Math.max(assessed - exemption, 0); const tax = taxable * ratePct/100; return { assessed, taxable, tax, mills: ratePct * 10 } }, [market, ratio, ratePct, exemption])
  return (<><Shell inputs={<>
    <div className="grid grid-cols-2 gap-4"><Num label="Market Value of Home" value={market} set={setMarket} /><Num label="Exemptions (e.g. homestead)" value={exemption} set={setExemption} /></div>
    <Slide label="Assessment Ratio (% of market value assessed)" value={ratio} set={setRatio} min={10} max={100} step={1} /><Slide label="Effective Tax Rate" value={ratePct} set={setRatePct} min={0} max={5} step={0.01} />
    <p className="text-sm text-muted-foreground">Mill rate conversion: {ratePct}% equals <span className="font-mono font-bold">{m.mills.toFixed(1)} mills</span> (1 mill = $1 tax per $1,000 of taxable value). If your bill states mills, divide mills by 10 to get the % rate.</p>
  </>}>
    <Result label="Estimated Annual Property Tax" value={fmt(m.tax)} sub={`Monthly escrow: ${fmt(m.tax/12)}. Tax is an operating cost of owning — it never disappears when the mortgage does.`} />
    <Breakdown title="Assessment Breakdown"><Row label="Assessed value" value={fmt(m.assessed)} /><Row label="Minus exemptions" value={'−' + fmt(exemption)} /><Row label="Taxable value" value={fmt(m.taxable)} bold /><Row label="Effective rate" value={pct(ratePct)} /><Row label="Monthly escrow" value={fmt(m.tax/12)} /></Breakdown>
  </Shell><ToolActionsBar slug="property-tax-assessor-calculator" isPro={isPro} inputs={{ market, ratio, ratePct, exemption }} /></>)
}
