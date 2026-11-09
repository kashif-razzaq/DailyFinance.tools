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
  const [buy, setBuy] = useState(180000); const [rehab, setRehab] = useState(60000); const [holding, setHolding] = useState(8000); const [arv, setArv] = useState(320000); const [ltv, setLtv] = useState(75); const [rate, setRate] = useState(7); const [refiCosts, setRefiCosts] = useState(5000); const [rent, setRent] = useState(2250); const [expenses, setExpenses] = useState(600)
  const m = useMemo(() => { const total = buy + rehab + holding; const loan = arv * ltv/100; const left = total + refiCosts - loan; const r = rate/100/12; const n = 360; const pi = loan > 0 && r > 0 ? loan * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1) : 0; const cf = rent - pi - expenses; const coc = left > 0 ? cf * 12 / left * 100 : Infinity; return { total, loan, left, pi, cf, coc, equity: arv - loan } }, [buy, rehab, holding, arv, ltv, rate, refiCosts, rent, expenses])
  return (<><Shell inputs={<>
    <div className="grid grid-cols-2 gap-4"><Num label="Purchase Price" value={buy} set={setBuy} /><Num label="Rehab Budget" value={rehab} set={setRehab} /></div>
    <div className="grid grid-cols-2 gap-4"><Num label="Holding + Buying Costs" value={holding} set={setHolding} /><Num label="After Repair Value (ARV)" value={arv} set={setArv} /></div>
    <Slide label="Refinance LTV" value={ltv} set={setLtv} min={50} max={85} step={1} /><Slide label="Refinance Rate" value={rate} set={setRate} min={0} max={15} step={0.05} />
    <div className="grid grid-cols-2 gap-4"><Num label="Refinance Closing Costs" value={refiCosts} set={setRefiCosts} /><Num label="Monthly Rent After Refi" value={rent} set={setRent} /></div>
    <Num label="Monthly Expenses excl. Mortgage (tax, insurance, vacancy, management)" value={expenses} set={setExpenses} />
  </>}>
    <Result label="Cash Left in the Deal" value={fmt(m.left)} sub={m.left <= 0 ? 'Perfect BRRRR: the refinance returns all your cash (or more) — your return is effectively infinite.' : 'Cash still trapped in the deal after refinancing. A higher ARV or lower rehab is the lever.'} />
    <Breakdown title="BRRRR Breakdown"><Row label="Total project cost" value={fmt(m.total)} /><Row label="Refinance loan (LTV × ARV)" value={fmt(m.loan)} /><Row label="Equity after refinance" value={fmt(m.equity)} /><Row label="New mortgage payment (P&I)" value={fmt(m.pi)} /><Row label="Monthly cash flow after refi" value={fmt(m.cf)} /><Row label="Cash-on-cash return" value={isFinite(m.coc) ? pct(m.coc) : 'Infinite — $0 left in deal'} bold /></Breakdown>
  </Shell><ToolActionsBar slug="brrrr-strategy-analyzer" isPro={isPro} inputs={{ buy, rehab, holding, arv, ltv, rate, refiCosts, rent, expenses }} /></>)
}
