/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
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

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
// Savings simulation: balance grows at the annual return / 12, plus the monthly contribution, until the goal is hit.
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(425000); const [pct, setPct] = useState(20)
  const [saved, setSaved] = useState(15000); const [monthly, setMonthly] = useState(600); const [ret, setRet] = useState(3)
  const c = useMemo(() => {
    const goal = price * pct / 100
    let bal = saved, months = 0, contributed = 0
    const series: { month: number; balance: number }[] = [{ month: 0, balance: Math.round(bal) }]
    const mr = ret / 100 / 12
    while (bal < goal && months < 600) { bal = bal * (1 + mr) + monthly; contributed += monthly; months++; if (months % 6 === 0 || bal >= goal) series.push({ month: months, balance: Math.round(Math.min(bal, goal * 1.02)) }) }
    const reached = bal >= goal
    const date = new Date(); date.setMonth(date.getMonth() + months)
    return { goal, months, reached, contributed, growth: Math.max(0, Math.min(bal, goal) - saved - contributed), series, date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  }, [price, pct, saved, monthly, ret])
  const tiers = [3.5, 5, 10, 20].map(p => ({ p, amt: price * p / 100 }))
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Target Home Price" value={price} onChange={setPrice} />
      <PctSlider label="Down Payment Target" value={pct} onChange={setPct} min={0} max={50} step={0.5} />
      {pct < 20 && <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3"><strong>PMI note:</strong> under 20% down, lenders add private mortgage insurance — roughly 0.3–1.5% of the loan per year ({fmt((price - c.goal) * 0.005 / 12)}/mo at a typical 0.5%) — until you reach 20% equity. Reaching 20% avoids it entirely.</p>}
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Already Saved" value={saved} onChange={setSaved} /><MoneyInput label="Monthly Contribution" value={monthly} onChange={setMonthly} /></div>
      <PctSlider label="Savings Return (per year)" value={ret} onChange={setRet} min={0} max={8} step={0.25} />
      <div className="bg-card border rounded-2xl p-5"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Down Payment at Common Levels</h4>
        <div className="grid grid-cols-4 gap-3 text-center">{tiers.map(t => (<button key={t.p} onClick={() => setPct(t.p)} className={`rounded-xl border py-3 ${Math.abs(pct - t.p) < 0.01 ? 'border-[#064E3B] bg-[#064E3B]/5' : 'border-neutral-200 hover:border-[#064E3B]'}`}><div className="text-xs font-bold text-muted-foreground">{t.p}%</div><div className="font-mono font-bold text-sm">{fmt(t.amt)}</div></button>))}</div></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="You Reach Your Down Payment">
        <div className="text-4xl font-black font-mono">{c.reached ? c.date : '50+ years'}</div>
        <p className="text-white/80 mt-2 text-sm">{c.months} months to save {fmt(c.goal)} ({pct}% of {fmt(price)})</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Goal Amount</p><p className="font-mono text-xl font-bold">{fmt(c.goal)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Still To Save</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, c.goal - saved))}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">You Contribute</p><p className="font-mono text-xl font-bold">{fmt(c.contributed)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Growth Adds</p><p className="font-mono text-xl font-bold">{fmt(c.growth)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Savings Growth to Goal</h4>
        <ResponsiveContainer width="100%" height={200}><AreaChart data={c.series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Area type="monotone" dataKey="balance" stroke="#064E3B" fill="#064E3B" fillOpacity={0.15} strokeWidth={2} name="Savings balance" /></AreaChart></ResponsiveContainer></div>
    </div></div><ToolActionsBar slug="down-payment-calculator" isPro={isPro} inputs={{ price, pct, saved, monthly, ret }} /></>)
}
