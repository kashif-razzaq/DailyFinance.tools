/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

// Equity = home value − all mortgage balances. Borrowable equity at a CLTV cap = value × cap − balances.
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [value, setValue] = useState(450000); const [first, setFirst] = useState(285000); const [second, setSecond] = useState(0)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.value !== undefined) setValue(s.value as any)
    if (s.first !== undefined) setFirst(s.first as any)
    if (s.second !== undefined) setSecond(s.second as any)
  })

  const c = useMemo(() => {
    const debt = first + second
    const equity = value - debt
    const equityPct = value > 0 ? equity / value * 100 : 0
    const ltv = value > 0 ? debt / value * 100 : 0
    const caps = [80, 85, 90].map(cap => ({ cap, available: Math.max(0, value * cap / 100 - debt) }))
    return { debt, equity, equityPct, ltv, caps, avail80: caps[0].available, avail85: caps[1].available }
  }, [value, first, second])
  const debtPct = value > 0 ? Math.min(100, c.debt / value * 100) : 0
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Current Home Value" value={value} onChange={setValue} hint="Use a recent appraisal, agent estimate or a cautious online valuation." />
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="First Mortgage Balance" value={first} onChange={setFirst} /><MoneyInput label="Second Mortgage / HELOC Balance" value={second} onChange={setSecond} hint="Leave at $0 if you only have one loan." /></div>
      <div className="bg-card border rounded-2xl p-5"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Your Equity, Visualised</h4>
        <div className="flex h-10 rounded-xl overflow-hidden w-full">
          <div className="bg-[#064E3B] flex items-center justify-center text-white text-xs font-bold" style={{ width: Math.max(0, 100 - debtPct) + '%' }}>{c.equityPct > 12 ? 'Equity ' + c.equityPct.toFixed(0) + '%' : ''}</div>
          <div className="bg-amber-500 flex items-center justify-center text-white text-xs font-bold" style={{ width: debtPct + '%' }}>{debtPct > 12 ? 'Debt ' + debtPct.toFixed(0) + '%' : ''}</div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2"><span>Equity {fmt(Math.max(0, c.equity))}</span><span>Mortgage debt {fmt(c.debt)}</span></div></div>
      {c.equity < 0 && <p className="text-sm text-red-600 font-semibold">These figures put you underwater — the balances exceed the home&apos;s value. Borrowing against equity is not available in that position.</p>}
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Your Home Equity">
        <div className="text-4xl font-black font-mono">{fmt(c.equity)}</div>
        <p className="text-white/80 mt-2 text-sm">{c.equityPct.toFixed(1)}% of your home&apos;s value is yours (LTV {c.ltv.toFixed(1)}%)</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Borrowable at 80% CLTV</p><p className="font-mono text-xl font-bold">{fmt(c.avail80)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Borrowable at 85% CLTV</p><p className="font-mono text-xl font-bold">{fmt(c.avail85)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Mortgage Debt</p><p className="font-mono text-xl font-bold">{fmt(c.debt)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Home Value</p><p className="font-mono text-xl font-bold">{fmt(value)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Available Equity by Lender Cap (CLTV)</h4>
        {c.caps.map(x => (<div key={x.cap} className="flex justify-between py-2 border-b border-neutral-100 last:border-0 text-sm"><span className="text-neutral-500">{x.cap}% combined loan-to-value{x.cap === 80 ? ' (most common HELOC cap)' : x.cap === 85 ? ' (common for strong credit)' : ' (select lenders)'}</span><span className="font-mono font-semibold">{fmt(x.available)}</span></div>))}
        <p className="text-xs text-muted-foreground mt-3">Lenders cap total borrowing — first mortgage plus any new loan or HELOC — at a combined loan-to-value ratio. The amount above is the room left under each cap.</p></div>
    </div></div><ToolActionsBar slug="home-equity-calculator" isPro={isPro} inputs={{ value, first, second }} /></>)
}
