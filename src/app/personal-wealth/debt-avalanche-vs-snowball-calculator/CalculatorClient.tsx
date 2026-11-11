/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

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

type Debt = { name: string; balance: number; apr: number; min: number }
function simulate(debts: Debt[], extra: number, order: 'avalanche' | 'snowball') {
  const ds = debts.map(d => ({ ...d })).filter(d => d.balance > 0)
  let months = 0, totalInterest = 0
  const orderOf: string[] = []
  while (ds.some(d => d.balance > 0) && months < 600) {
    months++
    for (const d of ds) { if (d.balance > 0) { const i = d.balance * d.apr / 100 / 12; d.balance += i; totalInterest += i } }
    let pool = extra
    for (const d of ds) { if (d.balance > 0) { const p = Math.min(d.min, d.balance); d.balance -= p } }
    const targets = [...ds].filter(d => d.balance > 0).sort((a, b) => order === 'avalanche' ? b.apr - a.apr : a.balance - b.balance)
    for (const t of targets) { if (pool <= 0) break; const live = ds.find(d => d.name === t.name)!; const p = Math.min(pool, live.balance); live.balance -= p; pool -= p
      if (live.balance <= 0.01 && !orderOf.includes(live.name)) orderOf.push(live.name) }
    for (const d of ds) if (d.balance <= 0.01 && d.balance > -1 && !orderOf.includes(d.name)) orderOf.push(d.name)
  }
  return { months, totalInterest, orderOf, cleared: !ds.some(d => d.balance > 0.01) }
}
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [debts, setDebts] = useState<Debt[]>([
    { name: 'Credit Card', balance: 6500, apr: 24.99, min: 150 },
    { name: 'Store Card', balance: 2200, apr: 29.99, min: 65 },
    { name: 'Personal Loan', balance: 9000, apr: 11.5, min: 210 }])
  const [extra, setExtra] = useState(200)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.debts !== undefined) setDebts(s.debts as any)
    if (s.extra !== undefined) setExtra(s.extra as any)
  })

  const upd = (i: number, k: keyof Debt, v: any) => setDebts(prev => prev.map((d, j) => j === i ? { ...d, [k]: v } : d))
  const av = useMemo(() => simulate(debts, extra, 'avalanche'), [debts, extra])
  const sn = useMemo(() => simulate(debts, extra, 'snowball'), [debts, extra])
  const totalMin = debts.reduce((s, d) => s + d.min, 0)
  const dateStr = (m: number) => { const d = new Date(); d.setMonth(d.getMonth() + m); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  return (<><div className="space-y-8">
    <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
      {debts.map((d, i) => (<div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b last:border-0 last:pb-0">
        <div className="space-y-2"><label className="text-sm font-semibold">Debt {i + 1} Name</label><Input value={d.name} onChange={(e) => upd(i, 'name', e.target.value)} /></div>
        <MoneyInput label="Balance" value={d.balance} onChange={(v) => upd(i, 'balance', v)} />
        <div className="space-y-2"><label className="text-sm font-semibold">APR %</label><Input type="number" value={d.apr} onChange={(e) => upd(i, 'apr', num(e.target.value))} className="font-mono" /></div>
        <MoneyInput label="Minimum Payment / mo" value={d.min} onChange={(v) => upd(i, 'min', v)} /></div>))}
      <MoneyInput label="Extra Money Available Each Month (on top of all minimums)" value={extra} onChange={setExtra} hint={`Total monthly debt budget: ${fmt(totalMin + extra)}`} />
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {[{ label: 'Debt Avalanche (highest APR first)', r: av, color: 'bg-[#064E3B]' }, { label: 'Debt Snowball (smallest balance first)', r: sn, color: 'bg-slate-800' }].map(({ label, r, color }) => (
        <div key={label} className={`${color} text-white rounded-2xl p-6 md:p-8 shadow-xl`}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{label}</h3>
          <div className="text-4xl font-black font-mono">{fmt(r.totalInterest)}</div><p className="text-white/70 text-sm">total interest paid</p>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
            <div><p className="text-white/60 text-xs uppercase font-bold">Debt-Free Date</p><p className="font-bold text-lg">{r.cleared ? dateStr(r.months) : 'Not within 50 yrs'}</p><p className="text-white/70 font-mono">{r.months} months</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Payoff Order</p><p className="font-bold">{r.orderOf.join(' → ') || '—'}</p></div>
          </div></div>))}
    </div>
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-900"><strong>The verdict:</strong> Avalanche saves you <span className="font-mono font-bold">{fmt(Math.max(0, sn.totalInterest - av.totalInterest))}</span> in interest versus Snowball with these debts{av.months !== sn.months ? ` and clears the debt ${Math.abs(av.months - sn.months)} month(s) ${av.months < sn.months ? 'sooner' : 'later'}` : ''}. Snowball still wins for many people because the early small wins keep them going — the best method is the one you will actually finish.</div>
  </div><ToolActionsBar slug="debt-avalanche-vs-snowball-calculator" isPro={isPro} inputs={{ debts, extra }} /></>)
}
