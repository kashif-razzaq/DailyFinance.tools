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
  const [price, setPrice] = useState(325000); const [downPct, setDownPct] = useState(25); const [rate, setRate] = useState(7); const [rent, setRent] = useState(2950); const [tax, setTax] = useState(3900); const [ins, setIns] = useState(1500); const [vac, setVac] = useState(5); const [maint, setMaint] = useState(5); const [mgmt, setMgmt] = useState(8); const [hoa, setHoa] = useState(0); const [other, setOther] = useState(100)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.downPct !== undefined) setDownPct(s.downPct as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.rent !== undefined) setRent(s.rent as any)
    if (s.tax !== undefined) setTax(s.tax as any)
    if (s.ins !== undefined) setIns(s.ins as any)
    if (s.vac !== undefined) setVac(s.vac as any)
    if (s.maint !== undefined) setMaint(s.maint as any)
    if (s.mgmt !== undefined) setMgmt(s.mgmt as any)
    if (s.hoa !== undefined) setHoa(s.hoa as any)
    if (s.other !== undefined) setOther(s.other as any)
  })

  const m = useMemo(() => { const loan = price * (1 - downPct/100); const r = rate/100/12; const n = 360; const pi = r > 0 ? loan * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1) : loan/n; const vacC = rent * vac/100; const maintC = rent * maint/100; const mgmtC = rent * mgmt/100; const cf = rent - pi - tax/12 - ins/12 - vacC - maintC - mgmtC - hoa - other; const noi = (rent - vacC - maintC - mgmtC - hoa - other) * 12 - tax - ins; const cap = price > 0 ? noi / price * 100 : 0; const cash = price * downPct/100 + price * 0.02; const coc = cash > 0 ? cf * 12 / cash * 100 : 0; return { loan, pi, cf, noi, cap, cash, coc, vacC, maintC, mgmtC } }, [price, downPct, rate, rent, tax, ins, vac, maint, mgmt, hoa, other])
  return (<><Shell inputs={<>
    <div className="grid grid-cols-2 gap-4"><Num label="Purchase Price" value={price} set={setPrice} /><Num label="Monthly Rent" value={rent} set={setRent} /></div>
    <Slide label="Down Payment" value={downPct} set={setDownPct} min={0} max={60} step={1} /><Slide label="Mortgage Rate" value={rate} set={setRate} min={0} max={15} step={0.05} />
    <div className="grid grid-cols-2 gap-4"><Num label="Property Tax / year" value={tax} set={setTax} /><Num label="Insurance / year" value={ins} set={setIns} /></div>
    <Slide label="Vacancy Reserve" value={vac} set={setVac} min={0} max={20} step={0.5} /><Slide label="Maintenance Reserve (% of rent)" value={maint} set={setMaint} min={0} max={20} step={0.5} /><Slide label="Management Fee (% of rent)" value={mgmt} set={setMgmt} min={0} max={15} step={0.5} />
    <div className="grid grid-cols-2 gap-4"><Num label="HOA / mo" value={hoa} set={setHoa} /><Num label="Other Costs / mo" value={other} set={setOther} /></div>
  </>}>
    <Result label="Monthly Cash Flow" value={fmt(m.cf)} sub={m.cf >= 200 ? 'Healthy by the $200-per-door benchmark many investors target.' : m.cf >= 0 ? 'Positive, but thin — stress-test rent and rate before you buy.' : 'Negative cash flow: this deal needs a lower price, higher rent, or more down.'} />
    <Breakdown title="Rental Breakdown (Monthly)"><Row label="Principal & interest" value={fmt(m.pi)} /><Row label="Vacancy reserve" value={fmt(m.vacC)} /><Row label="Maintenance reserve" value={fmt(m.maintC)} /><Row label="Management" value={fmt(m.mgmtC)} /><Row label="Annual NOI" value={fmt(m.noi)} /><Row label="Cap rate" value={pct(m.cap)} bold /><Row label="Cash invested" value={fmt(m.cash)} /><Row label="Cash-on-cash return" value={pct(m.coc)} bold /></Breakdown>
  <ToolActionsBar slug="rental-cash-flow-calculator" isPro={isPro} inputs={{ price, downPct, rate, rent, tax, ins, vac, maint, mgmt, hoa, other }} /></Shell></>)
}
