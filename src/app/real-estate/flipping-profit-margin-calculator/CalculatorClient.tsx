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
  const [arv, setArv] = useState(400000); const [purchase, setPurchase] = useState(230000); const [rehab, setRehab] = useState(50000); const [months, setMonths] = useState(6); const [holdingMo, setHoldingMo] = useState(1200); const [sellPct, setSellPct] = useState(8)
  const m = useMemo(() => { const maxOffer = arv * 0.70 - rehab; const holding = months * holdingMo; const selling = arv * sellPct/100; const buying = purchase * 0.02; const totalIn = purchase + rehab + holding + buying; const profit = arv - totalIn - selling; return { maxOffer, holding, selling, buying, totalIn, profit, roi: totalIn > 0 ? profit/totalIn*100 : 0, margin: arv > 0 ? profit/arv*100 : 0 } }, [arv, purchase, rehab, months, holdingMo, sellPct])
  return (<><Shell inputs={<>
    <div className="grid grid-cols-2 gap-4"><Num label="After Repair Value (ARV)" value={arv} set={setArv} /><Num label="Your Purchase Price" value={purchase} set={setPurchase} /></div>
    <div className="grid grid-cols-2 gap-4"><Num label="Rehab Budget" value={rehab} set={setRehab} /><Num label="Selling Costs (% of ARV)" value={sellPct} set={setSellPct} prefix="" step={0.5} /></div>
    <Slide label="Hold Period (months)" value={months} set={setMonths} min={1} max={24} step={1} suffix=" mos" /><Num label="Holding Costs / mo (loan, tax, insurance, utilities)" value={holdingMo} set={setHoldingMo} />
    <div className={`p-4 rounded-xl border font-mono text-sm ${purchase <= m.maxOffer ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>{purchase <= m.maxOffer ? `✓ Your price is at or under the 70% rule maximum of ${fmt(m.maxOffer)}.` : `✗ Your price is ${fmt(purchase - m.maxOffer)} OVER the 70% rule maximum of ${fmt(m.maxOffer)}.`}</div>
  </>}>
    <Result label="Projected Flip Profit" value={fmt(m.profit)} sub={`ROI ${pct(m.roi)} on ${fmt(m.totalIn)} total invested. Profit margin ${pct(m.margin)} of ARV.`} />
    <Breakdown title="Flip Breakdown"><Row label="70% rule max offer (ARV×70% − rehab)" value={fmt(m.maxOffer)} bold /><Row label="Buying closing costs (2%)" value={fmt(m.buying)} /><Row label="Holding costs" value={fmt(m.holding)} /><Row label="Selling costs" value={fmt(m.selling)} /><Row label="Total cash in" value={fmt(m.totalIn)} /><Row label="ROI" value={pct(m.roi)} bold /></Breakdown>
  </Shell><ToolActionsBar slug="flipping-profit-margin-calculator" isPro={isPro} inputs={{ arv, purchase, rehab, months, holdingMo, sellPct }} /></>)
}
