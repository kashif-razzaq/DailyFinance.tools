/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { Plus, Trash2 } from 'lucide-react'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}
interface Debt { name: string; balance: number; apr: number; min: number }
interface SimResult { months: number; interest: number; cleared: boolean; order: { name: string; month: number }[]; series: { month: number; balance: number }[] }
// Multi-debt simulation: every debt accrues interest monthly; minimums are paid on all debts,
// then the remaining budget is thrown at one target — highest APR (avalanche) or smallest
// balance (snowball) — rolling freed minimums into the next target as debts clear.
function simulate(debts: Debt[], budget: number, strategy: 'avalanche' | 'snowball'): SimResult {
  const state = debts.map((d) => ({ ...d, bal: d.balance, payoffMonth: 0 }))
  let months = 0, interest = 0
  const series: { month: number; balance: number }[] = [{ month: 0, balance: Math.round(state.reduce((s, d) => s + d.bal, 0)) }]
  const totalMin = state.reduce((s, d) => s + d.min, 0)
  const monthlyBudget = Math.max(budget, totalMin)
  while (state.some((d) => d.bal > 0) && months < 600) {
    months++
    // 1. Accrue interest.
    state.forEach((d) => { if (d.bal > 0) { const i = d.bal * d.apr / 100 / 12; interest += i; d.bal += i } })
    let remaining = monthlyBudget
    // 2. Pay minimums on every open debt.
    state.forEach((d) => { if (d.bal > 0) { const p = Math.min(d.min, d.bal, remaining); d.bal -= p; remaining -= p } })
    // 3. Throw the rest at the target debt(s), in strategy order.
    const targets = state.filter((d) => d.bal > 0).sort((a, b) => strategy === 'avalanche' ? b.apr - a.apr : a.bal - b.bal)
    for (const t of targets) { if (remaining <= 0) break; const p = Math.min(t.bal, remaining); t.bal -= p; remaining -= p }
    // 4. Record payoff months.
    state.forEach((d) => { if (d.bal <= 0 && d.payoffMonth === 0 && d.balance > 0) d.payoffMonth = months })
    if (months % 6 === 0 || !state.some((d) => d.bal > 0)) series.push({ month: months, balance: Math.round(state.reduce((s, d) => s + Math.max(0, d.bal), 0)) })
  }
  const cleared = state.every((d) => d.bal <= 0)
  const order = state.filter((d) => d.payoffMonth > 0).sort((a, b) => a.payoffMonth - b.payoffMonth).map((d) => ({ name: d.name, month: d.payoffMonth }))
  return { months, interest, cleared, order, series }
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [debts, setDebts] = useState<Debt[]>([
    { name: 'Credit Card', balance: 5800, apr: 24.99, min: 145 },
    { name: 'Store Card', balance: 2100, apr: 29.99, min: 60 },
    { name: 'Personal Loan', balance: 7500, apr: 11.5, min: 165 },
  ])
  const [budget, setBudget] = useState(700)
  const totalBalance = debts.reduce((s, d) => s + d.balance, 0)
  const totalMin = debts.reduce((s, d) => s + d.min, 0)
  const avalanche = useMemo(() => simulate(debts, budget, 'avalanche'), [debts, budget])
  const snowball = useMemo(() => simulate(debts, budget, 'snowball'), [debts, budget])
  const [view, setView] = useState<'avalanche' | 'snowball'>('avalanche')

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.debts !== undefined) setDebts(s.debts as any)
    if (s.budget !== undefined) setBudget(s.budget as any)
    if (s.view !== undefined) setView(s.view as any)
  })

  const shown = view === 'avalanche' ? avalanche : snowball
  const winner = avalanche.interest <= snowball.interest ? 'avalanche' : 'snowball'
  const saving = Math.abs(avalanche.interest - snowball.interest)
  const dateStr = (m: number) => { const d = new Date(); d.setMonth(d.getMonth() + m); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  const merged = useMemo(() => {
    const map = new Map<number, any>()
    avalanche.series.forEach((p) => map.set(p.month, { month: p.month, Avalanche: p.balance }))
    snowball.series.forEach((p) => { const row = map.get(p.month) || { month: p.month }; row.Snowball = p.balance; map.set(p.month, row) })
    return [...map.values()].sort((a, b) => a.month - b.month)
  }, [avalanche, snowball])
  const update = (i: number, patch: Partial<Debt>) => setDebts((ds) => ds.map((d, j) => j === i ? { ...d, ...patch } : d))
  const stuck = debts.some((d) => d.balance > 0 && d.min <= d.balance * d.apr / 100 / 12)

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 space-y-6">
      <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Your Debts</h4>
          <button onClick={() => setDebts((ds) => [...ds, { name: 'New Debt', balance: 1000, apr: 15, min: 35 }])} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#064E3B] border border-[#064E3B]/40 rounded-full px-3 py-1.5 hover:bg-[#064E3B] hover:text-white transition-colors"><Plus className="h-4 w-4" /> Add debt</button></div>
        {debts.map((d, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-end border border-neutral-200 rounded-xl p-3">
            <div className="col-span-6 sm:col-span-3 space-y-1"><label className="text-xs font-semibold text-muted-foreground">Name</label><Input value={d.name} onChange={(e) => update(i, { name: e.target.value })} className="h-9" /></div>
            <div className="col-span-6 sm:col-span-3 space-y-1"><label className="text-xs font-semibold text-muted-foreground">Balance $</label><Input type="number" value={d.balance === 0 ? '' : d.balance} onChange={(e) => update(i, { balance: num(e.target.value) })} className="h-9 font-mono" /></div>
            <div className="col-span-4 sm:col-span-2 space-y-1"><label className="text-xs font-semibold text-muted-foreground">APR %</label><Input type="number" value={d.apr === 0 ? '' : d.apr} onChange={(e) => update(i, { apr: num(e.target.value) })} className="h-9 font-mono" /></div>
            <div className="col-span-5 sm:col-span-3 space-y-1"><label className="text-xs font-semibold text-muted-foreground">Min Payment $</label><Input type="number" value={d.min === 0 ? '' : d.min} onChange={(e) => update(i, { min: num(e.target.value) })} className="h-9 font-mono" /></div>
            <div className="col-span-3 sm:col-span-1 flex justify-end"><button onClick={() => setDebts((ds) => ds.filter((_, j) => j !== i))} disabled={debts.length <= 1} className="p-2 text-neutral-400 hover:text-red-600 disabled:opacity-30" aria-label="Remove debt"><Trash2 className="h-4 w-4" /></button></div>
          </div>))}
        <div className="space-y-2 pt-2"><label className="text-sm font-semibold">Total Monthly Debt Budget</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{sym}</span>
          <Input type="number" value={budget === 0 ? '' : budget} onChange={(e) => setBudget(num(e.target.value))} className="pl-7 font-mono" /></div>
          <p className="text-xs text-muted-foreground">Your minimums total {fmt(totalMin)}/mo. Any budget above that becomes extra payments aimed at one debt at a time.{budget < totalMin && <span className="text-red-600 font-semibold"> Budget is below your minimums — the plan uses minimums only.</span>}</p></div>
        {stuck && <p className="text-sm text-red-600 font-semibold">Warning: at least one debt's minimum does not cover its monthly interest, so it never clears on minimums alone — raise the budget so extra payments reach it.</p>}
      </div>
      <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Total Balance: Avalanche vs Snowball</h4>
        <ResponsiveContainer width="100%" height={210}><LineChart data={merged}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Legend /><Line type="monotone" dataKey="Avalanche" stroke="#064E3B" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="Snowball" stroke="#D97706" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Avalanche vs Snowball">
        <div className="space-y-4">
          <div className="flex items-center justify-between"><div><p className="font-bold">Avalanche <span className="text-white/60 text-xs font-semibold">highest APR first</span></p><p className="text-white/80 text-sm">{avalanche.cleared ? `Debt-free ${dateStr(avalanche.months)} · ${avalanche.months} months` : 'Not cleared in 50 yrs'}</p></div><p className="font-mono text-lg font-bold">{fmt(avalanche.interest)} <span className="text-xs text-white/60">interest</span></p></div>
          <div className="flex items-center justify-between border-t border-white/15 pt-4"><div><p className="font-bold">Snowball <span className="text-white/60 text-xs font-semibold">smallest balance first</span></p><p className="text-white/80 text-sm">{snowball.cleared ? `Debt-free ${dateStr(snowball.months)} · ${snowball.months} months` : 'Not cleared in 50 yrs'}</p></div><p className="font-mono text-lg font-bold">{fmt(snowball.interest)} <span className="text-xs text-white/60">interest</span></p></div>
        </div>
        <p className="text-white/85 text-sm mt-5 pt-5 border-t border-white/20">The <strong>{winner}</strong> method saves <strong>{fmt(saving)}</strong> in interest on {fmt(totalBalance)} of debt. Avalanche wins on maths; snowball wins on early motivation — the best plan is the one you finish.</p>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Payoff Order</h4>
          <div className="flex gap-1.5">
            <button onClick={() => setView('avalanche')} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${view === 'avalanche' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300'}`}>Avalanche</button>
            <button onClick={() => setView('snowball')} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${view === 'snowball' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300'}`}>Snowball</button>
          </div></div>
        <ol className="space-y-3">{shown.order.map((o, i) => (<li key={i} className="flex items-center justify-between text-sm"><span className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-[#064E3B]/10 text-[#064E3B] font-bold text-xs flex items-center justify-center">{i + 1}</span>{o.name}</span><span className="font-mono font-semibold">{dateStr(o.month)} <span className="text-muted-foreground font-normal">(mo {o.month})</span></span></li>))}
          {shown.order.length === 0 && <li className="text-sm text-muted-foreground">Nothing clears within 50 years at this budget.</li>}</ol>
      </div>
    </div></div><ToolActionsBar slug="debt-payoff-calculator" isPro={isPro} inputs={{ debts, budget, view }} /></>)
}
