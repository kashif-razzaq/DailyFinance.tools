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

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [amount, setAmount] = useState(10000); const [rate, setRate] = useState(3); const [years, setYears] = useState(20)
  const r = useMemo(() => {
    const power = amount / Math.pow(1 + rate / 100, years)
    const futureCost = amount * Math.pow(1 + rate / 100, years)
    const chart = Array.from({ length: years + 1 }, (_, y) => ({ year: y, power: Math.round(amount / Math.pow(1 + rate / 100, y)), at2: Math.round(amount / Math.pow(1.02, y)), at5: Math.round(amount / Math.pow(1.05, y)) }))
    return { power, futureCost, lost: amount - power, chart }
  }, [amount, rate, years])
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Amount of Money Today" value={amount} onChange={setAmount} hint="Savings sitting in cash, or the price of something you plan to buy later." />
      <PctSlider label="Annual Inflation Rate" value={rate} onChange={setRate} min={0} max={12} step={0.25} />
      <p className="text-xs text-muted-foreground">For context: US inflation averaged roughly 3% over very long periods, about 2.5–3% in the decade before 2021, spiked above 9% in mid-2022, and the Federal Reserve targets 2%. Your personal inflation rate (housing, healthcare, tuition) may be higher.</p>
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Years Ahead</label><span className="font-mono font-bold">{years} yrs</span></div><Slider value={[years]} min={1} max={40} step={1} onValueChange={(v: any) => setYears(Array.isArray(v) ? v[0] : v)} /></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`Purchasing Power in ${years} Years`}>
        <div className="text-5xl font-black font-mono">{fmt(r.power)}</div>
        <p className="text-white/80 mt-3 text-sm">Cash of {fmt(amount)} kept under the mattress buys only this much in today's terms. It silently loses <span className="font-mono font-bold">{fmt(r.lost)}</span> ({amount > 0 ? Math.round(r.lost / amount * 100) : 0}%) of its power.</p>
        <div className="mt-6 pt-6 border-t border-white/20 text-sm"><p className="text-white/60 text-xs uppercase font-bold">Something Costing {fmt(amount)} Today Will Cost</p><p className="font-mono text-2xl font-bold">{fmt(r.futureCost)}</p></div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Purchasing Power at 2%, Your Rate, and 5%</h4>
        <ResponsiveContainer width="100%" height={210}><LineChart data={r.chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Line type="monotone" dataKey="power" stroke="#064E3B" strokeWidth={2} name="Your rate" dot={false} /><Line type="monotone" dataKey="at2" stroke="#94a3b8" name="2%" dot={false} /><Line type="monotone" dataKey="at5" stroke="#dc2626" name="5%" dot={false} /></LineChart></ResponsiveContainer></div>
    </div></div><ToolActionsBar slug="inflation-purchasing-power-calculator" isPro={isPro} inputs={{ amount, rate, years }} /></>)
}
