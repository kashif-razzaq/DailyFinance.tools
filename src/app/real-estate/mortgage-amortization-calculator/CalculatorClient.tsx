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
  const [price, setPrice] = useState(450000); const [down, setDown] = useState(90000); const [rate, setRate] = useState(6.85); const [term, setTerm] = useState(30); const [taxRate, setTaxRate] = useState(1.1); const [ins, setIns] = useState(1800); const [hoa, setHoa] = useState(0); const [extra, setExtra] = useState(200)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.down !== undefined) setDown(s.down as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.term !== undefined) setTerm(s.term as any)
    if (s.taxRate !== undefined) setTaxRate(s.taxRate as any)
    if (s.ins !== undefined) setIns(s.ins as any)
    if (s.hoa !== undefined) setHoa(s.hoa as any)
    if (s.extra !== undefined) setExtra(s.extra as any)
  })

  const m = useMemo(() => { const loan = Math.max(price - down, 0); const r = rate/100/12; const n = term * 12; const pi = loan > 0 ? (r > 0 ? loan * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1) : loan/n) : 0; const taxM = price * taxRate/100 / 12; const insM = ins/12; const downPctVal = price > 0 ? down/price*100 : 0; const pmi = downPctVal < 20 ? loan * 0.005 / 12 : 0; const total = pi + taxM + insM + pmi + hoa
    const sim = (extraPay: number) => { let bal = loan; let interest = 0; let months = 0; const yearly: {year:number; principal:number; interest:number; balance:number}[] = []; let yp = 0; let yi = 0; while (bal > 0.01 && months < 600) { const i = bal * r; const p = Math.min(pi + extraPay - i, bal); bal -= p; interest += i; yp += p; yi += i; months++; if (months % 12 === 0 || bal <= 0.01) { yearly.push({ year: Math.ceil(months/12), principal: yp, interest: yi, balance: Math.max(bal, 0) }); yp = 0; yi = 0 } } return { interest, months, yearly } }
    const base = sim(0); const withExtra = sim(extra); return { loan, pi, taxM, insM, pmi, total, base, withExtra, saved: base.interest - withExtra.interest, monthsSaved: base.months - withExtra.months, downPctVal } }, [price, down, rate, term, taxRate, ins, hoa, extra])
  return (<><Shell inputs={<>
    <div className="grid grid-cols-2 gap-4"><Num label="Home Price" value={price} set={setPrice} /><Num label="Down Payment" value={down} set={setDown} /></div>
    <Slide label="Interest Rate" value={rate} set={setRate} min={0} max={15} step={0.05} /><Slide label="Loan Term (years)" value={term} set={setTerm} min={5} max={30} step={1} suffix=" yrs" />
    <div className="grid grid-cols-2 gap-4"><Num label="Property Tax Rate (% of price / yr)" value={taxRate} set={setTaxRate} prefix="" step={0.05} /><Num label="Home Insurance / year" value={ins} set={setIns} /></div>
    <div className="grid grid-cols-2 gap-4"><Num label="HOA / mo" value={hoa} set={setHoa} /><Num label="Extra Payment / mo" value={extra} set={setExtra} /></div>
    <div className="overflow-x-auto border rounded-xl"><table className="w-full text-sm"><thead><tr className="bg-neutral-50 text-left"><th className="p-3">Year</th><th className="p-3">Principal</th><th className="p-3">Interest</th><th className="p-3">Balance</th></tr></thead><tbody>{m.base.yearly.map(y => (<tr key={y.year} className="border-t font-mono"><td className="p-3">{y.year}</td><td className="p-3">{fmt(y.principal)}</td><td className="p-3">{fmt(y.interest)}</td><td className="p-3">{fmt(y.balance)}</td></tr>))}</tbody></table></div>
    <p className="text-xs text-muted-foreground">Yearly amortization summary (base loan, no extra payments). Early years are interest-heavy — that is normal amortization, not a lender trick.</p>
  </>}>
    <Result label="Total Monthly Payment (PITI)" value={fmt(m.total)} sub={`Loan ${fmt(m.loan)} at ${rate}% for ${term} years. Principal & interest alone: ${fmt(m.pi)}.`} />
    <Breakdown title="Payment Breakdown (Monthly)"><Row label="Principal & interest" value={fmt(m.pi)} /><Row label="Property tax" value={fmt(m.taxM)} /><Row label="Home insurance" value={fmt(m.insM)} /><Row label="PMI (down < 20%)" value={fmt(m.pmi)} /><Row label="HOA" value={fmt(hoa)} /><Row label="Total interest over loan" value={fmt(m.base.interest)} bold /><Row label={`Interest with +${fmt(extra)}/mo extra`} value={fmt(m.withExtra.interest)} /><Row label="Interest saved by extra payments" value={fmt(m.saved)} bold /><Row label="Time saved" value={`${Math.floor(m.monthsSaved/12)} yrs ${m.monthsSaved%12} mos`} /></Breakdown>
  <ToolActionsBar slug="mortgage-amortization-calculator" isPro={isPro} inputs={{ price, down, rate, term, taxRate, ins, hoa, extra }} /></Shell></>)
}
