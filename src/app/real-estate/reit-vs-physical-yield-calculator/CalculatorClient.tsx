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
  const [capital, setCapital] = useState(100000); const [years, setYears] = useState(20); const [divYield, setDivYield] = useState(4); const [reitAppr, setReitAppr] = useState(5); const [downPct, setDownPct] = useState(25); const [rentMo, setRentMo] = useState(3400); const [propAppr, setPropAppr] = useState(4); const [mortRate, setMortRate] = useState(6); const [expPct, setExpPct] = useState(35)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.capital !== undefined) setCapital(s.capital as any)
    if (s.years !== undefined) setYears(s.years as any)
    if (s.divYield !== undefined) setDivYield(s.divYield as any)
    if (s.reitAppr !== undefined) setReitAppr(s.reitAppr as any)
    if (s.downPct !== undefined) setDownPct(s.downPct as any)
    if (s.rentMo !== undefined) setRentMo(s.rentMo as any)
    if (s.propAppr !== undefined) setPropAppr(s.propAppr as any)
    if (s.mortRate !== undefined) setMortRate(s.mortRate as any)
    if (s.expPct !== undefined) setExpPct(s.expPct as any)
  })

  const m = useMemo(() => { const reitFinal = capital * Math.pow(1 + (divYield + reitAppr)/100, years)
    const price = downPct > 0 ? capital / (downPct/100) : 0; const loan = price - capital; const r = mortRate/100/12; const n = 360; const pi = loan > 0 && r > 0 ? loan * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1) : 0
    let bal = loan; let cumCF = 0; for (let mo = 0; mo < years * 12 && bal > 0; mo++) { const i = bal * r; bal -= Math.min(pi - i, bal); const rentY = rentMo * Math.pow(1.02, Math.floor(mo/12)); const exp = rentY * expPct/100; const taxIns = price * 0.015 / 12; cumCF += rentY - exp - taxIns - pi }
    const valueEnd = price * Math.pow(1 + propAppr/100, years); const equity = valueEnd - Math.max(bal, 0); const physFinal = equity + cumCF; return { reitFinal, price, loan, pi, equity, cumCF, physFinal, bal } }, [capital, years, divYield, reitAppr, downPct, rentMo, propAppr, mortRate, expPct])
  return (<><Shell inputs={<>
    <div className="grid grid-cols-2 gap-4"><Num label="Capital to Invest" value={capital} set={setCapital} /><Num label="Time Horizon (years)" value={years} set={setYears} prefix="" /></div>
    <h3 className="font-bold">REIT Assumptions</h3><Slide label="Dividend Yield (reinvested)" value={divYield} set={setDivYield} min={0} max={10} step={0.1} /><Slide label="REIT Appreciation / yr" value={reitAppr} set={setReitAppr} min={0} max={12} step={0.1} />
    <h3 className="font-bold">Physical Rental Assumptions</h3><Slide label="Down Payment (your capital = this % of price)" value={downPct} set={setDownPct} min={10} max={100} step={1} /><div className="grid grid-cols-2 gap-4"><Num label="Monthly Rent" value={rentMo} set={setRentMo} /><Num label="Mortgage Rate %" value={mortRate} set={setMortRate} prefix="" step={0.05} /></div>
    <Slide label="Property Appreciation / yr" value={propAppr} set={setPropAppr} min={0} max={10} step={0.1} /><Slide label="Operating Expenses (% of rent, excl. tax/insurance)" value={expPct} set={setExpPct} min={10} max={60} step={1} />
    <p className="text-sm text-muted-foreground">Physical model: your capital is the down payment, rent grows 2%/yr, tax + insurance estimated at 1.5% of price/yr, cash flow is accumulated (not reinvested). REIT dividends are reinvested and taxed annually in a taxable account — ignored here; note it in your own planning.</p>
  </>}>
    <Result label={m.physFinal >= m.reitFinal ? 'Winner on These Assumptions: Physical Rental' : 'Winner on These Assumptions: REIT'} value={fmt(Math.max(m.physFinal, m.reitFinal))} sub={`REIT ends at ${fmt(m.reitFinal)} vs physical at ${fmt(m.physFinal)} (equity ${fmt(m.equity)} + cumulative cash flow ${fmt(m.cumCF)}) over ${years} years.`} />
    <Breakdown title="Comparison Breakdown"><Row label="REIT final value" value={fmt(m.reitFinal)} bold /><Row label="Property price bought with your down payment" value={fmt(m.price)} /><Row label="Mortgage payment (P&I)" value={fmt(m.pi)} /><Row label="End equity (value − loan balance)" value={fmt(m.equity)} /><Row label="Cumulative cash flow collected" value={fmt(m.cumCF)} /><Row label="Physical final position" value={fmt(m.physFinal)} bold /></Breakdown>
    <p className="text-xs text-muted-foreground">Leverage is why physical can win: you control a {fmt(m.price)} asset with {fmt(capital)}. It is also why it can lose — vacancy, repairs and your time are real costs no REIT charges you.</p>
  </Shell><ToolActionsBar slug="reit-vs-physical-yield-calculator" isPro={isPro} inputs={{ capital, years, divYield, reitAppr, downPct, rentMo, propAppr, mortRate, expPct }} /></>)
}
