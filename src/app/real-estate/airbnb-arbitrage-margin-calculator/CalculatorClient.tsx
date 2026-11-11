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
  const [mode, setMode] = useState<'arbitrage'|'owned'>('arbitrage'); const [adr, setAdr] = useState(150); const [occ, setOcc] = useState(70); const [housing, setHousing] = useState(1800); const [utilities, setUtilities] = useState(250); const [supplies, setSupplies] = useState(120); const [cleanFee, setCleanFee] = useState(75); const [stay, setStay] = useState(3); const [platform, setPlatform] = useState(3)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.mode !== undefined) setMode(s.mode as any)
    if (s.adr !== undefined) setAdr(s.adr as any)
    if (s.occ !== undefined) setOcc(s.occ as any)
    if (s.housing !== undefined) setHousing(s.housing as any)
    if (s.utilities !== undefined) setUtilities(s.utilities as any)
    if (s.supplies !== undefined) setSupplies(s.supplies as any)
    if (s.cleanFee !== undefined) setCleanFee(s.cleanFee as any)
    if (s.stay !== undefined) setStay(s.stay as any)
    if (s.platform !== undefined) setPlatform(s.platform as any)
  })

  const m = useMemo(() => { const nights = 30 * occ/100; const gross = adr * nights; const turnovers = stay > 0 ? nights / stay : 0; const cleaning = turnovers * cleanFee; const plat = gross * platform/100; const profit = gross - plat - cleaning - housing - utilities - supplies; return { nights, gross, turnovers, cleaning, plat, profit, margin: gross > 0 ? profit / gross * 100 : 0, revpar: adr * occ/100 } }, [adr, occ, housing, utilities, supplies, cleanFee, stay, platform])
  return (<><Shell inputs={<>
    <div className="flex gap-2">{(['arbitrage','owned'] as const).map(x => (<button key={x} onClick={() => setMode(x)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${mode===x?'bg-[#064E3B] text-white':'bg-white'}`}>{x === 'arbitrage' ? 'Arbitrage (I rent the unit)' : 'Owned (I own the unit)'}</button>))}</div>
    <p className="text-sm text-muted-foreground">{mode === 'arbitrage' ? 'Housing cost below = your monthly lease rent to the landlord. Written landlord consent is essential — see mistakes section.' : 'Housing cost below = your monthly PITI + HOA on the owned property.'}</p>
    <div className="grid grid-cols-2 gap-4"><Num label="Average Daily Rate (ADR)" value={adr} set={setAdr} /><Num label={mode==='arbitrage' ? 'Monthly Rent to Landlord' : 'Monthly PITI + HOA'} value={housing} set={setHousing} /></div>
    <Slide label="Occupancy Rate" value={occ} set={setOcc} min={10} max={100} step={1} /><Slide label="Platform Fee" value={platform} set={setPlatform} min={0} max={20} step={0.5} />
    <div className="grid grid-cols-2 gap-4"><Num label="Utilities / mo" value={utilities} set={setUtilities} /><Num label="Supplies & Restock / mo" value={supplies} set={setSupplies} /></div>
    <div className="grid grid-cols-2 gap-4"><Num label="Cleaning Cost per Turnover" value={cleanFee} set={setCleanFee} /><Num label="Average Stay (nights)" value={stay} set={setStay} prefix="" /></div>
  </>}>
    <Result label="Monthly Profit" value={fmt(m.profit)} sub={`Net margin ${pct(m.margin)} on ${fmt(m.gross)} gross. RevPAR is ${fmt2(m.revpar)}.`} />
    <Breakdown title="Monthly P&L"><Row label="Booked nights" value={m.nights.toFixed(1)} /><Row label="Gross revenue" value={fmt(m.gross)} /><Row label="Platform fees" value={'−' + fmt(m.plat)} /><Row label={`Cleaning (${m.turnovers.toFixed(1)} turnovers)`} value={'−' + fmt(m.cleaning)} /><Row label="Housing cost" value={'−' + fmt(housing)} /><Row label="Net margin" value={pct(m.margin)} bold /></Breakdown>
    <p className="text-xs text-muted-foreground">Cleaning fees charged to guests can offset cleaning cost — this model conservatively treats cleaning as a pure cost. Add your actual cleaning-fee income to profit if you charge one.</p>
  </Shell><ToolActionsBar slug="airbnb-arbitrage-margin-calculator" isPro={isPro} inputs={{ mode, adr, occ, housing, utilities, supplies, cleanFee, stay, platform }} /></>)
}
