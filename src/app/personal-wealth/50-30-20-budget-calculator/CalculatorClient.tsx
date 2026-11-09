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

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [income, setIncome] = useState(5000)
  const [needs, setNeeds] = useState(2900)
  const [wants, setWants] = useState(1500)
  const [savings, setSavings] = useState(600)

  // Formula: target bucket = income x rule % (Needs 50%, Wants 30%, Savings 20%)
  const r = useMemo(() => {
    const safeIncome = Math.max(0, income)
    const buckets = [
      { name: 'Needs', targetPct: 50, actual: Math.max(0, needs), color: '#064E3B', saveBucket: false },
      { name: 'Wants', targetPct: 30, actual: Math.max(0, wants), color: '#D97706', saveBucket: false },
      { name: 'Savings', targetPct: 20, actual: Math.max(0, savings), color: '#2563EB', saveBucket: true },
    ].map((b) => {
      const target = safeIncome * b.targetPct / 100
      const actualPct = safeIncome > 0 ? b.actual / safeIncome * 100 : 0
      const diff = b.actual - target
      const diffPts = actualPct - b.targetPct
      const good = b.saveBucket ? diff >= 0 : diff <= 0
      return { ...b, target, actualPct, diff, diffPts, good }
    })
    const chart = buckets.map((b) => ({ name: b.name, Target: Math.round(b.target), Actual: Math.round(b.actual) }))
    const totalActual = buckets.reduce((s, b) => s + b.actual, 0)
    // Verdict: lead with the bucket furthest from its target in percentage points
    const worst = [...buckets].sort((a, b) => Math.abs(b.diffPts) - Math.abs(a.diffPts))[0]
    let verdict = 'Enter your after-tax income to see your 50/30/20 split.'
    if (safeIncome > 0 && worst) {
      if (Math.abs(worst.diffPts) < 1) verdict = 'Your budget is almost exactly on the 50/30/20 rule — well balanced.'
      else if (worst.saveBucket) verdict = worst.diffPts < 0 ? `Your savings are ${Math.abs(worst.diffPts).toFixed(0)} points under the 20% target — add ${fmt(Math.abs(worst.diff))}/month to hit it.` : `Your savings are ${worst.diffPts.toFixed(0)} points above the 20% target — ahead of the rule.`
      else verdict = worst.diffPts > 0 ? `Your ${worst.name.toLowerCase()} are ${worst.diffPts.toFixed(0)} points over the ${worst.targetPct}% target (${fmt(worst.diff)}/month too much).` : `Your ${worst.name.toLowerCase()} are ${Math.abs(worst.diffPts).toFixed(0)} points under the ${worst.targetPct}% target — inside the rule.`
    }
    return { buckets, chart, totalActual, verdict }
  }, [income, needs, wants, savings])

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Monthly After-Tax Income" value={income} onChange={setIncome} hint="Your take-home pay — the amount the 50/30/20 rule is applied to." />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <MoneyInput label="Actual Needs / Month" value={needs} onChange={setNeeds} hint="Rent, bills, groceries, transport, minimum payments." />
        <MoneyInput label="Actual Wants / Month" value={wants} onChange={setWants} hint="Eating out, streaming, holidays, shopping." />
        <MoneyInput label="Actual Savings / Month" value={savings} onChange={setSavings} hint="Investing, extra debt payments, emergency fund." />
      </div>
      {income > 0 && r.totalActual > income && <p className="text-sm text-red-600 font-semibold">Your needs + wants + savings ({fmt(r.totalActual)}) exceed your income ({fmt(income)}) by {fmt(r.totalActual - income)}.</p>}
      <div className="space-y-5">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Target vs Actual</h4>
        {r.buckets.map((b) => (
          <div key={b.name} className="space-y-2">
            <div className="flex justify-between text-sm"><span className="font-semibold">{b.name} — target {b.targetPct}% ({fmt(b.target)})</span><span className="font-mono">{fmt(b.actual)} · {b.actualPct.toFixed(1)}%</span></div>
            <div className="relative h-4 bg-neutral-100 rounded-full overflow-hidden"><div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.min(100, b.targetPct)}%`, backgroundColor: '#D1D5DB' }} /><div className="absolute inset-y-0 left-0 rounded-full opacity-90" style={{ width: `${Math.min(100, b.actualPct)}%`, backgroundColor: b.color }} /></div>
            <p className="text-xs text-muted-foreground">Grey bar = target share, coloured bar = your actual share.</p>
          </div>
        ))}
      </div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Your 50/30/20 Targets">
        <div className="text-4xl font-black font-mono">{fmt(r.buckets[0]?.target ?? 0)}</div>
        <p className="text-white/80 mt-2 text-sm">per month for needs, from {fmt(income)} take-home pay</p>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          {r.buckets.map((b) => (<div key={b.name}><p className="text-white/60 text-xs uppercase font-bold">{b.name} {b.targetPct}%</p><p className="font-mono text-lg font-bold">{fmt(b.target)}</p><span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-bold ${b.good ? 'bg-emerald-400/30 text-emerald-100' : 'bg-red-400/30 text-red-100'}`}>{b.saveBucket ? (b.diff >= 0 ? `${fmt(b.diff)} above` : `${fmt(Math.abs(b.diff))} under`) : (b.diff <= 0 ? `${fmt(Math.abs(b.diff))} under` : `${fmt(b.diff)} over`)}</span></div>))}
        </div>
        <p className="mt-6 pt-4 border-t border-white/20 text-sm text-white/90 font-medium">{r.verdict} {isPro ? '' : ''}</p>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Target vs Actual ($)</h4>
        <ResponsiveContainer width="100%" height={220}><BarChart data={r.chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt2(Number(v))} /><Legend /><Bar dataKey="Target" fill="#9CA3AF" radius={[4, 4, 0, 0]} /><Bar dataKey="Actual" fill="#064E3B" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
    </div></div><ToolActionsBar slug="50-30-20-budget-calculator" isPro={isPro} inputs={{ income, needs, wants, savings }} /></>)
}
