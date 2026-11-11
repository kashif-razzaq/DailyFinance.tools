/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const fmt2 = (n: number) => curSym() + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function PctSlider({ label, value, onChange, min = 0, max = 20, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [deposit, setDeposit] = useState(20000); const [hysaApy, setHysaApy] = useState(4.2); const [cdApy, setCdApy] = useState(4.75)
  const [term, setTerm] = useState(3); const [freq, setFreq] = useState(12); const [taxRate, setTaxRate] = useState(22)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.deposit !== undefined) setDeposit(s.deposit as any)
    if (s.hysaApy !== undefined) setHysaApy(s.hysaApy as any)
    if (s.cdApy !== undefined) setCdApy(s.cdApy as any)
    if (s.term !== undefined) setTerm(s.term as any)
    if (s.freq !== undefined) setFreq(s.freq as any)
    if (s.taxRate !== undefined) setTaxRate(s.taxRate as any)
  })

  const fv = (apy: number) => deposit * Math.pow(1 + apy / 100 / freq, freq * term)
  const h = fv(hysaApy), c = fv(cdApy)
  const chart = [{ name: 'HYSA', earnings: Math.round(h - deposit) }, { name: 'CD', earnings: Math.round(c - deposit) }, { name: 'Regular savings (0.5%)', earnings: Math.round(fv(0.5) - deposit) }]
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Deposit Amount" value={deposit} onChange={setDeposit} />
      <PctSlider label="High-Yield Savings APY" value={hysaApy} onChange={setHysaApy} min={0} max={8} step={0.05} />
      <PctSlider label="CD APY (locked for the term)" value={cdApy} onChange={setCdApy} min={0} max={8} step={0.05} />
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Term / Horizon (years)</label><span className="font-mono font-bold">{term} yrs</span></div><Slider value={[term]} min={1} max={10} step={1} onValueChange={(v: any) => setTerm(Array.isArray(v) ? v[0] : v)} /></div>
      <div className="space-y-2"><label className="text-sm font-semibold">Compounding Frequency</label><div className="flex gap-2">{[{ l: 'Annually', v: 1 }, { l: 'Monthly', v: 12 }, { l: 'Daily', v: 365 }].map(o => (<button key={o.v} onClick={() => setFreq(o.v)} className={`px-4 py-2 rounded-lg border text-sm font-semibold ${freq === o.v ? 'bg-[#064E3B] text-white' : 'bg-card'}`}>{o.l}</button>))}</div></div>
      <PctSlider label="Marginal Tax Rate (interest is taxed yearly)" value={taxRate} onChange={setTaxRate} min={0} max={37} step={1} />
      <p className="text-xs text-muted-foreground">HYSA rates are variable — banks can cut them at any time. A CD locks its rate but usually charges an early-withdrawal penalty (often 3–12 months of interest). Both are FDIC-insured up to $250,000 per depositor, per bank.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`After ${term} Years`}>
        <div className="space-y-4">
          <div><p className="text-white/60 text-xs uppercase font-bold">In a CD at {cdApy}%</p><p className="font-mono text-3xl font-black">{fmt(c)}</p><p className="text-white/70 text-sm font-mono">earns {fmt(c - deposit)} before tax · {fmt((c - deposit) * (1 - taxRate / 100))} after tax</p></div>
          <div className="pt-4 border-t border-white/20"><p className="text-white/60 text-xs uppercase font-bold">In an HYSA at {hysaApy}%</p><p className="font-mono text-3xl font-black">{fmt(h)}</p><p className="text-white/70 text-sm font-mono">earns {fmt(h - deposit)} before tax · {fmt((h - deposit) * (1 - taxRate / 100))} after tax</p></div>
          <p className="text-white/80 text-sm">{c >= h ? 'The CD wins on these rates — if you are sure you will not need the money early.' : 'The HYSA wins on these rates and keeps your money fully accessible.'} Versus a regular 0.5% savings account ({fmt(fv(0.5))}), the better option earns you an extra <span className="font-mono font-bold">{fmt(Math.max(h, c) - fv(0.5))}</span>.</p>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Interest Earned Compared</h4>
        <ResponsiveContainer width="100%" height={200}><BarChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Bar dataKey="earnings" fill="#064E3B" name="Interest earned" /></BarChart></ResponsiveContainer></div>
    <ToolActionsBar slug="high-yield-savings-cd-calculator" isPro={isPro} inputs={{ deposit, hysaApy, cdApy, term, freq, taxRate }} />
    </div></div></>)
}
