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


export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(450000); const [downPct, setDownPct] = useState(5); const [rate, setRate] = useState(6.5); const [tax, setTax] = useState(5400); const [ins, setIns] = useState(1800); const [rentOther, setRentOther] = useState(1800); const [ownRent, setOwnRent] = useState(1600); const [marketRent, setMarketRent] = useState(2100); const [utilities, setUtilities] = useState(150)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.downPct !== undefined) setDownPct(s.downPct as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.tax !== undefined) setTax(s.tax as any)
    if (s.ins !== undefined) setIns(s.ins as any)
    if (s.rentOther !== undefined) setRentOther(s.rentOther as any)
    if (s.ownRent !== undefined) setOwnRent(s.ownRent as any)
    if (s.marketRent !== undefined) setMarketRent(s.marketRent as any)
    if (s.utilities !== undefined) setUtilities(s.utilities as any)
  })

  const m = useMemo(() => { const loan = price * (1 - downPct/100); const r = rate/100/12; const n = 360; const pi = r > 0 ? loan * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1) : loan/n; const piti = pi + tax/12 + ins/12; const eff = piti + utilities - rentOther; const cash = price * downPct/100 + price * 0.02; const grossIfMoved = rentOther + ownRent; const cfMoved = grossIfMoved - piti - utilities; const roi = cash > 0 ? (cfMoved * 12) / cash * 100 : 0; return { loan, pi, piti, eff, cash, cfMoved, roi, saving: marketRent - eff } }, [price, downPct, rate, tax, ins, rentOther, ownRent, marketRent, utilities])
  return (<><Shell inputs={<>
    <Num label="Purchase Price" value={price} set={setPrice} /><Slide label="Down Payment" value={downPct} set={setDownPct} min={0} max={40} step={0.5} />
    <Slide label="Mortgage Rate" value={rate} set={setRate} min={0} max={15} step={0.05} /><div className="grid grid-cols-2 gap-4"><Num label="Property Tax / year" value={tax} set={setTax} /><Num label="Insurance / year" value={ins} set={setIns} /></div>
    <div className="grid grid-cols-2 gap-4"><Num label="Rent from Other Units / mo" value={rentOther} set={setRentOther} /><Num label="Market Rent for Your Unit" value={ownRent} set={setOwnRent} /></div>
    <div className="grid grid-cols-2 gap-4"><Num label="Rent You'd Pay Elsewhere / mo" value={marketRent} set={setMarketRent} /><Num label="Utilities You Cover / mo" value={utilities} set={setUtilities} /></div>
  </>}>
    <Result label="Your Effective Housing Cost / Month" value={fmt(m.eff)} sub={m.eff <= 0 ? 'Your tenants cover your entire housing cost — you live for free or better.' : `Versus ${fmt(marketRent)} renting elsewhere, you save ${fmt(m.saving)} every month.`} />
    <Breakdown title="House Hack Breakdown"><Row label="Loan amount" value={fmt(m.loan)} /><Row label="Principal & interest" value={fmt(m.pi)} /><Row label="Full PITI payment" value={fmt(m.piti)} /><Row label="Minus rent from other units" value={'−' + fmt(rentOther)} /><Row label="Cash invested (down + 2% closing)" value={fmt(m.cash)} /><Row label="Cash flow if you move out later" value={fmt(m.cfMoved) + ' / mo'} /><Row label="Cash-on-cash ROI after move-out" value={pct(m.roi)} bold /></Breakdown>
    <p className="text-xs text-muted-foreground">Assumes a 30-year fixed mortgage. Add vacancy and maintenance reserves for a conservative view — see the guide below.</p>
  <ToolActionsBar slug="house-hacking-roi-calculator" isPro={isPro} inputs={{ price, downPct, rate, tax, ins, rentOther, ownRent, marketRent, utilities }} /></Shell></>)
}
