/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [invested, setInvested] = useState(10000)
  const [returned, setReturned] = useState(14500)
  const [years, setYears] = useState(3)

  const r = useMemo(() => {
    const profit = returned - invested
    // ROI = (return − invested) / invested × 100
    const roi = invested > 0 ? (profit / invested) * 100 : 0
    // Annualised ROI (CAGR) = (final / initial)^(1/years) − 1
    const annualised = invested > 0 && returned > 0 && years > 0 ? (Math.pow(returned / invested, 1 / years) - 1) * 100 : 0
    // Doubling time at the annualised rate: ln(2) / ln(1 + r)
    const doubling = annualised > 0 ? Math.log(2) / Math.log(1 + annualised / 100) : Infinity
    const series: { year: number; value: number }[] = []
    const wholeYears = Math.max(1, Math.round(years))
    for (let y = 0; y <= wholeYears; y++) series.push({ year: y, value: Math.round(invested * Math.pow(1 + annualised / 100, y)) })
    return { profit, roi, annualised, doubling, series }
  }, [invested, returned, years])

  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Amount Invested" value={invested} onChange={setInvested} hint="Total cost: ad spend, stock, a project budget, equipment — everything in." />
      <MoneyInput label="Amount Returned" value={returned} onChange={setReturned} hint="Final value or total revenue the investment produced." />
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Investment Period</label><span className="font-mono font-bold">{years} years</span></div>
        <Slider value={[years]} min={0.25} max={30} step={0.25} onValueChange={(v: any) => setYears(Array.isArray(v) ? v[0] : v)} />
        <p className="text-xs text-muted-foreground">Period matters: 45% ROI in 3 months is stellar; the same 45% over 10 years is poor. Annualised ROI makes offers comparable.</p></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Return on Investment">
        <div className="text-4xl font-black font-mono">{r.roi.toFixed(1)}%</div>
        <p className="text-white/80 mt-2 text-sm">{r.profit >= 0 ? 'profit' : 'loss'} of {fmt(Math.abs(r.profit))} on {fmt(invested)} invested</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Annualised ROI</p><p className="font-mono text-xl font-bold">{r.annualised.toFixed(1)}%/yr</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Doubling Time</p><p className="font-mono text-xl font-bold">{isFinite(r.doubling) ? r.doubling.toFixed(1) + ' yrs' : 'Never'}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Back per $1</p><p className="font-mono text-xl font-bold">${invested > 0 ? (returned / invested).toFixed(2) : '0.00'}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Net Profit</p><p className="font-mono text-xl font-bold">{fmt(r.profit)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Growth Path at the Annualised Rate</h4>
        <ResponsiveContainer width="100%" height={200}><LineChart data={r.series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" tickFormatter={(v: number) => 'Yr ' + v} /><YAxis tickFormatter={(v: number) => '$' + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Line type="monotone" dataKey="value" stroke="#064E3B" strokeWidth={2} dot={false} name="Value" /></LineChart></ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2">Differentiator: annualised ROI + doubling time, so a 3-month campaign and a 5-year property deal can finally be compared like-for-like.</p>
      </div>
    </div>
  </div>)
}
