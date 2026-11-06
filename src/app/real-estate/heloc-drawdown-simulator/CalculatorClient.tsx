'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
export const fmt2 = (n: number) => '$' + n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
export const pct = (n: number) => (isFinite(n) ? n.toFixed(2) : '0.00') + '%'

export function Num({ label, value, set, min=0, step=1, prefix='$' }: { label: string; value: number; set: (n:number)=>void; min?: number; step?: number; prefix?: string }) {
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
  const [value, setValue] = useState(600000); const [balance, setBalance] = useState(300000); const [maxLtv, setMaxLtv] = useState(85); const [draw, setDraw] = useState(100000); const [rate, setRate] = useState(8.5); const [repayYears, setRepayYears] = useState(20)
  const m = useMemo(() => { const available = Math.max(value * maxLtv/100 - balance, 0); const d = Math.min(draw, available || draw); const io = d * rate/100 / 12; const r = rate/100/12; const n = repayYears * 12; const amort = r > 0 ? d * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1) : d/n; const totalInterestRepay = amort * n - d; return { available, d, io, amort, totalInterestRepay, ltvAfter: value > 0 ? (balance + d)/value*100 : 0 } }, [value, balance, maxLtv, draw, rate, repayYears])
  return (<Shell inputs={<>
    <div className="grid grid-cols-2 gap-4"><Num label="Home Value" value={value} set={setValue} /><Num label="Current Mortgage Balance" value={balance} set={setBalance} /></div>
    <Slide label="Max Combined LTV Allowed" value={maxLtv} set={setMaxLtv} min={60} max={90} step={1} /><Num label="Amount You Plan to Draw" value={draw} set={setDraw} />
    <Slide label="HELOC Rate (variable)" value={rate} set={setRate} min={0} max={18} step={0.05} /><Slide label="Repayment Term After Draw Period" value={repayYears} set={setRepayYears} min={5} max={30} step={1} suffix=" yrs" />
    {draw > m.available && <p className="text-sm text-red-600 font-medium">Draw exceeds available credit of {fmt(m.available)} — results use the available maximum.</p>}
  </>}>
    <Result label="Interest-Only Payment (Draw Period)" value={fmt(m.io)} sub={`On a ${fmt(m.d)} draw at ${rate}%. This payment covers interest only — the balance does not fall.`} />
    <Breakdown title="HELOC Breakdown"><Row label="Available credit" value={fmt(m.available)} bold /><Row label="Combined LTV after draw" value={pct(m.ltvAfter)} /><Row label="Interest-only payment / mo" value={fmt(m.io)} /><Row label="Repayment-phase payment / mo" value={fmt(m.amort)} bold /><Row label="Total interest in repayment phase" value={fmt(m.totalInterestRepay)} /></Breakdown>
    <p className="text-xs text-muted-foreground">HELOC rates are variable and tied to the prime rate. Model +2% before drawing — the repayment-phase jump is where borrowers get caught.</p>
  </Shell>)
}
