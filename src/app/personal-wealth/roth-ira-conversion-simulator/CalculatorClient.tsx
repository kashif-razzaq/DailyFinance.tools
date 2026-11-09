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
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [balance, setBalance] = useState(200000); const [convert, setConvert] = useState(50000)
  const [nowRate, setNowRate] = useState(22); const [futureRate, setFutureRate] = useState(24)
  const [years, setYears] = useState(20); const [ret, setRet] = useState(7)
  const r = useMemo(() => {
    const g = Math.pow(1 + ret / 100, years)
    const taxNow = convert * nowRate / 100
    const rothFuture = convert * g
    const tradFutureAfterTax = convert * g * (1 - futureRate / 100)
    const keepTradTotal = balance * g * (1 - futureRate / 100)
    const convertTotal = (balance - convert) * g * (1 - futureRate / 100) + rothFuture
    return { taxNow, rothFuture, tradFutureAfterTax, netBenefitOnConverted: rothFuture - taxNow * g - tradFutureAfterTax, keepTradTotal, convertTotal }
  }, [balance, convert, nowRate, futureRate, years, ret])
  const chart = [{ name: 'Converted $ grows to', Roth: Math.round(r.rothFuture), Traditional: Math.round(r.tradFutureAfterTax) }]
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Traditional IRA / 401(k) Balance" value={balance} onChange={setBalance} /><MoneyInput label="Amount to Convert to Roth" value={convert} onChange={setConvert} /></div>
      <PctSlider label="Your Tax Rate Today" value={nowRate} onChange={setNowRate} min={0} max={40} step={1} />
      <PctSlider label="Expected Tax Rate in Retirement" value={futureRate} onChange={setFutureRate} min={0} max={40} step={1} />
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Years Until You Spend This Money</label><span className="font-mono font-bold">{years} yrs</span></div><Slider value={[years]} min={1} max={40} step={1} onValueChange={(v: any) => setYears(Array.isArray(v) ? v[0] : v)} /></div>
      <PctSlider label="Expected Annual Return" value={ret} onChange={setRet} min={1} max={12} step={0.25} />
      <p className="text-xs text-muted-foreground">Model assumes the conversion tax is paid from outside cash (the strongest case for converting). Paying the tax from the IRA itself reduces the benefit — see the guide below.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Conversion Result">
        <div className="text-5xl font-black font-mono">{fmt(r.convertTotal - r.keepTradTotal)}</div>
        <p className="text-white/80 mt-2 text-sm">{r.convertTotal >= r.keepTradTotal ? 'estimated net benefit of converting, across the whole balance' : 'estimated cost of converting versus keeping the money Traditional at these tax rates'}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Tax Due Now</p><p className="font-mono text-xl font-bold">{fmt(r.taxNow)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Converted $ Becomes (Tax-Free)</p><p className="font-mono text-xl font-bold">{fmt(r.rothFuture)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Same $ Kept Traditional (After Tax)</p><p className="font-mono text-xl font-bold">{fmt(r.tradFutureAfterTax)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Break-Even Logic</p><p className="font-bold">{futureRate > nowRate ? 'Future rate is higher — conversion favoured' : futureRate < nowRate ? 'Future rate is lower — conversion is an uphill bet' : 'Rates are equal — benefit comes only from paying tax with outside money'}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Converted Amount: Roth vs Traditional</h4>
        <ResponsiveContainer width="100%" height={200}><BarChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Bar dataKey="Roth" fill="#064E3B" /><Bar dataKey="Traditional" fill="#94a3b8" /></BarChart></ResponsiveContainer></div>
    </div></div><ToolActionsBar slug="roth-ira-conversion-simulator" isPro={isPro} inputs={{ balance, convert, nowRate, futureRate, years, ret }} /></>)
}
