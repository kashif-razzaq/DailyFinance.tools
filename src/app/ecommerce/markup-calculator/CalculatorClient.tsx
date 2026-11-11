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
function MoneyInput({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" step="0.01" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

// Conversion identities: margin = markup / (1 + markup); markup = margin / (1 − margin)
const CONVERSIONS = [10, 20, 25, 33.3, 50, 75, 100, 150, 200, 300].map((mu) => ({ markup: mu, margin: (mu / (100 + mu)) * 100 }))

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [mode, setMode] = useState<'markup' | 'margin'>('markup')
  const [cost, setCost] = useState(30)
  const [pctVal, setPctVal] = useState(66.7)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.mode !== undefined) setMode(s.mode as any)
    if (s.cost !== undefined) setCost(s.cost as any)
    if (s.pctVal !== undefined) setPctVal(s.pctVal as any)
  })


  const r = useMemo(() => {
    // Markup mode: price = cost x (1 + markup). Margin mode: price = cost / (1 − margin).
    const price = mode === 'markup' ? cost * (1 + pctVal / 100) : pctVal >= 100 ? 0 : cost / (1 - pctVal / 100)
    const profit = price - cost
    const markup = cost > 0 ? (profit / cost) * 100 : 0
    const margin = price > 0 ? (profit / price) * 100 : 0
    return { price, profit, markup, margin }
  }, [mode, cost, pctVal])

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="space-y-2"><label className="text-sm font-semibold">Start From</label>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => { setMode('markup'); setPctVal(66.7) }} className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${mode === 'markup' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>A Markup %</button>
          <button onClick={() => { setMode('margin'); setPctVal(40) }} className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${mode === 'margin' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>A Target Margin %</button>
        </div></div>
      <MoneyInput label="Cost per Unit" value={cost} onChange={setCost} />
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{mode === 'markup' ? 'Markup %' : 'Target Margin %'}</label><span className="font-mono font-bold">{pctVal}%</span></div>
        <Slider value={[pctVal]} min={1} max={mode === 'markup' ? 400 : 95} step={0.1} onValueChange={(v: any) => setPctVal(Array.isArray(v) ? v[0] : v)} />
        <p className="text-xs text-muted-foreground">Markup is measured on cost; margin is measured on price. A 100% markup is only a 50% margin — confusing them is the classic pricing error.</p></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Selling Price">
        <div className="text-4xl font-black font-mono">{fmt(r.price)}</div>
        <p className="text-white/80 mt-2 text-sm">{fmt(r.profit)} gross profit per unit</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Markup</p><p className="font-mono text-xl font-bold">{r.markup.toFixed(1)}%</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Margin</p><p className="font-mono text-xl font-bold">{r.margin.toFixed(1)}%</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Markup ↔ Margin Converter Table</h4>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted-foreground border-b"><th className="py-2 font-semibold">If markup is…</th><th className="py-2 font-semibold text-right">Margin is…</th><th className="py-2 font-semibold text-right">$30 cost sells for</th></tr></thead>
          <tbody>{CONVERSIONS.map((c) => (<tr key={c.markup} className="border-b last:border-0"><td className="py-2 font-mono">{c.markup}%</td><td className="py-2 text-right font-mono font-semibold">{c.margin.toFixed(1)}%</td><td className="py-2 text-right font-mono">{fmt(30 * (1 + c.markup / 100))}</td></tr>))}</tbody>
        </table>
        <p className="text-xs text-muted-foreground mt-3">Differentiator: the full conversion table — pin it next to your pricing spreadsheet. Margin can never reach 100%; markup has no ceiling.</p>
      </div>
    <ToolActionsBar slug="markup-calculator" isPro={isPro} inputs={{ mode, cost, pctVal }} />
    </div>
  </div></>)
}
