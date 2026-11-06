/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const fmt2 = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
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

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [principal, setPrincipal] = useState(10000); const [monthly, setMonthly] = useState(300)
  const [rate, setRate] = useState(8); const [years, setYears] = useState(25); const [freq, setFreq] = useState(12)
  const r = useMemo(() => {
    const n = freq, rr = rate / 100
    const fvLump = principal * Math.pow(1 + rr / n, n * years)
    const fvContrib = rr > 0 ? monthly * ((Math.pow(1 + rr / 12, 12 * years) - 1) / (rr / 12)) : monthly * 12 * years
    const fv = fvLump + fvContrib
    const contributed = principal + monthly * 12 * years
    const chart = Array.from({ length: years + 1 }, (_, y) => ({ year: y, balance: Math.round(principal * Math.pow(1 + rr / n, n * y) + (rr > 0 ? monthly * ((Math.pow(1 + rr / 12, 12 * y) - 1) / (rr / 12)) : 0)), paidIn: Math.round(principal + monthly * 12 * y) }))
    const table = chart.filter((_, i) => i % 5 === 0 || i === years)
    return { fv, contributed, interest: fv - contributed, chart, table }
  }, [principal, monthly, rate, years, freq])
  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Starting Amount" value={principal} onChange={setPrincipal} /><MoneyInput label="Monthly Contribution" value={monthly} onChange={setMonthly} /></div>
      <PctSlider label="Annual Interest / Return Rate" value={rate} onChange={setRate} min={0} max={15} step={0.25} />
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Years to Grow</label><span className="font-mono font-bold">{years} yrs</span></div><Slider value={[years]} min={1} max={50} step={1} onValueChange={(v: any) => setYears(Array.isArray(v) ? v[0] : v)} /></div>
      <div className="space-y-2"><label className="text-sm font-semibold">Compounding Frequency (for the starting amount)</label>
        <div className="flex gap-2">{[{ l: 'Annually', v: 1 }, { l: 'Monthly', v: 12 }, { l: 'Daily', v: 365 }].map(o => (<button key={o.v} onClick={() => setFreq(o.v)} className={`px-4 py-2 rounded-lg border text-sm font-semibold ${freq === o.v ? 'bg-[#064E3B] text-white' : 'bg-card'}`}>{o.l}</button>))}</div>
        <p className="text-xs text-muted-foreground">Monthly contributions are modelled monthly. More frequent compounding helps, but rate, time and contributions matter far more.</p></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`Value After ${years} Years`}>
        <div className="text-5xl font-black font-mono">{fmt(r.fv)}</div>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">You Paid In</p><p className="font-mono text-xl font-bold">{fmt(r.contributed)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest Earned</p><p className="font-mono text-xl font-bold">{fmt(r.interest)}</p></div>
        </div>
        <p className="text-white/80 mt-4 text-sm">Interest is {r.contributed > 0 ? Math.round(r.interest / r.fv * 100) : 0}% of the final value — that share is compounding doing the heavy lifting.</p>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Balance vs Money Paid In</h4>
        <ResponsiveContainer width="100%" height={210}><AreaChart data={r.chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => '$' + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Area type="monotone" dataKey="balance" stroke="#064E3B" fill="#064E3B" fillOpacity={0.18} name="Balance" /><Area type="monotone" dataKey="paidIn" stroke="#D97706" fill="#D97706" fillOpacity={0.1} name="Paid in" /></AreaChart></ResponsiveContainer>
        <div className="mt-4 space-y-1 font-mono text-sm">{r.table.map(t => (<div key={t.year} className="flex justify-between border-b last:border-0 py-1"><span>Year {t.year}</span><span>{fmt(t.balance)}</span></div>))}</div></div>
    </div></div>)
}
