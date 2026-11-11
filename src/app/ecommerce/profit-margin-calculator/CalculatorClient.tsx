/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" step="0.01" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

function marginVerdict(margin: number) {
  if (margin < 0) return { label: 'Losing money', note: 'Price is below cost — every sale loses money before fees and overheads.', color: '#DC2626' }
  if (margin < 10) return { label: 'Very thin', note: 'Under 10% gross margin leaves almost nothing for platform fees, ads and overheads.', color: '#D97706' }
  if (margin < 25) return { label: 'Tight but workable', note: 'Typical for competitive retail. Watch fees and ad spend closely.', color: '#D97706' }
  if (margin < 50) return { label: 'Healthy', note: 'A solid gross margin for most e-commerce and retail products.', color: '#064E3B' }
  return { label: 'Premium', note: 'Above 50% is premium territory — common in digital goods, beauty and branded products.', color: '#064E3B' }
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [mode, setMode] = useState<'margin' | 'price'>('margin')
  const [cost, setCost] = useState(24)
  const [price, setPrice] = useState(49.99)
  const [targetMargin, setTargetMargin] = useState(40)
  const [units, setUnits] = useState(100)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.mode !== undefined) setMode(s.mode as any)
    if (s.cost !== undefined) setCost(s.cost as any)
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.targetMargin !== undefined) setTargetMargin(s.targetMargin as any)
    if (s.units !== undefined) setUnits(s.units as any)
  })


  const r = useMemo(() => {
    // Margin = (price − cost) / price; Markup = (price − cost) / cost. They are NOT the same number.
    // Reverse mode: price = cost / (1 − target margin).
    const p = mode === 'price' ? (targetMargin >= 100 ? 0 : cost / (1 - targetMargin / 100)) : price
    const profit = p - cost
    const margin = p > 0 ? (profit / p) * 100 : 0
    const markup = cost > 0 ? (profit / cost) * 100 : 0
    return { p, profit, margin, markup, totalProfit: profit * units, revenue: p * units }
  }, [mode, cost, price, targetMargin, units])

  const v = marginVerdict(r.margin)

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="space-y-2"><label className="text-sm font-semibold">Mode</label>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setMode('margin')} className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${mode === 'margin' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>Cost + Price → Margin</button>
          <button onClick={() => setMode('price')} className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${mode === 'price' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>Target Margin → Price</button>
        </div></div>
      <MoneyInput label="Cost per Unit" value={cost} onChange={setCost} hint="Everything it costs to make/buy one unit, including packaging and inbound shipping." />
      {mode === 'margin'
        ? <MoneyInput label="Selling Price" value={price} onChange={setPrice} />
        : (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Target Gross Margin</label><span className="font-mono font-bold">{targetMargin}%</span></div>
            <Slider value={[targetMargin]} min={1} max={90} step={1} onValueChange={(val: any) => setTargetMargin(Array.isArray(val) ? val[0] : val)} />
            <p className="text-xs text-muted-foreground">Price = cost ÷ (1 − margin). A 50% margin means doubling the cost — not adding 50%.</p></div>)}
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Units Sold</label><span className="font-mono font-bold">{units.toLocaleString()}</span></div>
        <Slider value={[units]} min={1} max={5000} step={10} onValueChange={(val: any) => setUnits(Array.isArray(val) ? val[0] : val)} /></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Gross Profit Margin">
        <div className="text-4xl font-black font-mono">{r.margin.toFixed(1)}%</div>
        <p className="text-white/80 mt-2 text-sm">{fmt(r.profit)} profit on a {fmt(r.p)} price (markup {r.markup.toFixed(1)}%)</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Selling Price</p><p className="font-mono text-xl font-bold">{fmt(r.p)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Profit / Unit</p><p className="font-mono text-xl font-bold">{fmt(r.profit)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Revenue ({units.toLocaleString()} units)</p><p className="font-mono text-xl font-bold">{fmt(r.revenue)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Profit</p><p className="font-mono text-xl font-bold">{fmt(r.totalProfit)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Margin Health Check</h4>
        <div className="h-3 bg-muted rounded-full overflow-hidden flex">
          <div className="h-full bg-red-500" style={{ width: '10%' }} /><div className="h-full bg-amber-500" style={{ width: '15%' }} />
          <div className="h-full bg-yellow-400" style={{ width: '25%' }} /><div className="h-full bg-[#064E3B]" style={{ width: '50%' }} />
        </div>
        <div className="relative h-5"><div className="absolute -translate-x-1/2 text-sm font-bold" style={{ left: `${Math.min(100, Math.max(0, r.margin))}%` }}>▲</div></div>
        <p className="text-sm"><span className="font-bold" style={{ color: v.color }}>{v.label}.</span> <span className="text-muted-foreground">{v.note}</span></p>
        <p className="text-xs text-muted-foreground mt-3">Differentiator: reverse pricing mode plus a health verdict — most margin calculators never tell you whether the number is actually good enough to survive fees and ads.</p>
      </div>
    </div>
  </div><ToolActionsBar slug="profit-margin-calculator" isPro={isPro} inputs={{ mode, cost, price, targetMargin, units }} /></>)
}
