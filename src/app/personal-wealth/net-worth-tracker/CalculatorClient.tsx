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
  const [assets, setAssets] = useState({ home: 350000, bank: 25000, investments: 90000, vehicles: 28000, other: 5000 })
  const [liabs, setLiabs] = useState({ mortgage: 265000, auto: 14000, student: 18000, cards: 4500, other: 0 })

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.assets !== undefined) setAssets(s.assets as any)
    if (s.liabs !== undefined) setLiabs(s.liabs as any)
  })

  const setA = (k: keyof typeof assets, v: number) => setAssets(p => ({ ...p, [k]: v }))
  const setL = (k: keyof typeof liabs, v: number) => setLiabs(p => ({ ...p, [k]: v }))
  const totalA = Object.values(assets).reduce((a, b) => a + b, 0), totalL = Object.values(liabs).reduce((a, b) => a + b, 0)
  const nw = totalA - totalL
  const chart = [{ name: 'Home equity', v: assets.home - liabs.mortgage }, { name: 'Investments', v: assets.investments }, { name: 'Cash', v: assets.bank }, { name: 'Vehicles (net)', v: assets.vehicles - liabs.auto }, { name: 'Other debts', v: -(liabs.student + liabs.cards + liabs.other) }]
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
      <div className="space-y-4"><h3 className="font-bold border-b pb-2">Assets — what you own</h3>
        <div className="grid grid-cols-2 gap-6"><MoneyInput label="Home Value" value={assets.home} onChange={(v) => setA('home', v)} /><MoneyInput label="Bank & Cash" value={assets.bank} onChange={(v) => setA('bank', v)} /><MoneyInput label="Investments & Retirement" value={assets.investments} onChange={(v) => setA('investments', v)} /><MoneyInput label="Vehicles (resale value)" value={assets.vehicles} onChange={(v) => setA('vehicles', v)} /><MoneyInput label="Other Assets" value={assets.other} onChange={(v) => setA('other', v)} /></div></div>
      <div className="space-y-4"><h3 className="font-bold border-b pb-2">Liabilities — what you owe</h3>
        <div className="grid grid-cols-2 gap-6"><MoneyInput label="Mortgage Balance" value={liabs.mortgage} onChange={(v) => setL('mortgage', v)} /><MoneyInput label="Auto Loan" value={liabs.auto} onChange={(v) => setL('auto', v)} /><MoneyInput label="Student Loans" value={liabs.student} onChange={(v) => setL('student', v)} /><MoneyInput label="Credit Cards" value={liabs.cards} onChange={(v) => setL('cards', v)} /><MoneyInput label="Other Debts" value={liabs.other} onChange={(v) => setL('other', v)} /></div></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Your Net Worth">
        <div className="text-5xl font-black font-mono">{fmt(nw)}</div>
        <p className="text-white/80 mt-3 text-sm">{nw >= 0 ? 'Positive net worth: your assets exceed everything you owe.' : 'Negative net worth is common early in a career — the trend over time matters more than today\'s number.'}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Assets</p><p className="font-mono text-xl font-bold">{fmt(totalA)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Liabilities</p><p className="font-mono text-xl font-bold">{fmt(totalL)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Debt-to-Asset Ratio</p><p className="font-mono text-xl font-bold">{totalA > 0 ? Math.round(totalL / totalA * 100) : 0}%</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Liquid Net Worth (no home/vehicles)</p><p className="font-mono text-xl font-bold">{fmt(assets.bank + assets.investments - liabs.cards - liabs.student - liabs.other - liabs.auto)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Where Your Net Worth Lives</h4>
        <ResponsiveContainer width="100%" height={210}><BarChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-20} height={50} /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Bar dataKey="v" fill="#064E3B" name="Value" /></BarChart></ResponsiveContainer></div>
    <ToolActionsBar slug="net-worth-tracker" isPro={isPro} inputs={{ assets, liabs }} />
    </div></div></>)
}
