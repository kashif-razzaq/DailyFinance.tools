/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
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
function PctSlider({ label, value, onChange, min = 0, max = 40, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}
type Mode = 'fixed' | 'percent' | 'minimum'
// Month-by-month card simulation. Minimum payment uses the common issuer formula:
// interest + 1% of balance, with a $25 floor. Percent mode pays pct% of balance, also floored at $25.
function simulate(balance: number, aprPct: number, mode: Mode, fixedPayment: number, pct: number) {
  const mr = aprPct / 100 / 12
  let bal = balance, months = 0, interest = 0
  const series: { month: number; balance: number }[] = [{ month: 0, balance: Math.round(bal) }]
  while (bal > 0 && months < 1200) {
    const i = bal * mr; interest += i
    let pay: number
    if (mode === 'fixed') pay = fixedPayment
    else if (mode === 'percent') pay = Math.max(bal * pct / 100, 25)
    else pay = Math.max(i + bal * 0.01, 25)
    pay = Math.min(pay, bal + i)
    if (pay <= i && bal + i - pay >= bal) { return { months, interest, cleared: false, series } }
    bal = bal + i - pay; months++
    if (months % 12 === 0 || bal <= 0) series.push({ month: months, balance: Math.round(Math.max(0, bal)) })
  }
  return { months, interest, cleared: bal <= 0, series }
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [balance, setBalance] = useState(5800)
  const [apr, setApr] = useState(24.99)
  const [mode, setMode] = useState<Mode>('minimum')
  const [fixedPayment, setFixedPayment] = useState(200)
  const [pct, setPct] = useState(3)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.balance !== undefined) setBalance(s.balance as any)
    if (s.apr !== undefined) setApr(s.apr as any)
    if (s.mode !== undefined) setMode(s.mode as any)
    if (s.fixedPayment !== undefined) setFixedPayment(s.fixedPayment as any)
    if (s.pct !== undefined) setPct(s.pct as any)
  })


  const current = useMemo(() => simulate(balance, apr, mode, fixedPayment, pct), [balance, apr, mode, fixedPayment, pct])
  const cmpFixed = useMemo(() => simulate(balance, apr, 'fixed', fixedPayment, pct), [balance, apr, fixedPayment, pct])
  const cmpPercent = useMemo(() => simulate(balance, apr, 'percent', fixedPayment, pct), [balance, apr, fixedPayment, pct])
  const cmpMinimum = useMemo(() => simulate(balance, apr, 'minimum', fixedPayment, pct), [balance, apr, fixedPayment, pct])
  const firstInterest = balance * apr / 100 / 12
  const tooLow = mode === 'fixed' && fixedPayment <= firstInterest && balance > 0
  const dateStr = (m: number) => { const d = new Date(); d.setMonth(d.getMonth() + m); return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  const rows = [
    { key: 'minimum' as Mode, label: 'Minimum payment only', r: cmpMinimum },
    { key: 'percent' as Mode, label: `Pay ${pct}% of balance`, r: cmpPercent },
    { key: 'fixed' as Mode, label: `Fixed ${fmt(fixedPayment)}/month`, r: cmpFixed },
  ]

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MoneyInput label="Card Balance" value={balance} onChange={setBalance} />
        <div className="space-y-2"><label className="text-sm font-semibold">First Month's Interest</label>
          <p className="font-mono font-bold text-lg pt-2">{fmt(firstInterest)}<span className="text-sm text-muted-foreground font-normal"> / month</span></p></div>
      </div>
      <PctSlider label="Card APR" value={apr} onChange={setApr} min={0} max={40} step={0.1} />
      <div className="space-y-3"><label className="text-sm font-semibold">How Will You Pay?</label>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setMode('minimum')} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${mode === 'minimum' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>Minimum payment</button>
          <button onClick={() => setMode('percent')} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${mode === 'percent' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>% of balance</button>
          <button onClick={() => setMode('fixed')} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${mode === 'fixed' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>Fixed amount</button>
        </div></div>
      {mode === 'fixed' && <MoneyInput label="Fixed Monthly Payment" value={fixedPayment} onChange={setFixedPayment} hint="A fixed payment is the fastest route — it does not shrink as the balance falls." />}
      {mode === 'percent' && <PctSlider label="Percent of Balance Paid Monthly" value={pct} onChange={setPct} min={1} max={20} step={0.5} />}
      {mode === 'minimum' && <p className="text-sm text-muted-foreground">Issuer minimums are typically interest + 1% of the balance (with a $25 floor). Because the payment shrinks with the balance, minimum-only payoff takes the longest and costs the most — see the comparison.</p>}
      {tooLow && <p className="text-sm text-red-600 font-semibold">Warning: {fmt(fixedPayment)} does not cover the first month's interest ({fmt(firstInterest)}), so the balance grows instead of shrinking.</p>}
      <div className="bg-card border rounded-2xl p-5"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Balance Over Time — Selected Mode</h4>
        <ResponsiveContainer width="100%" height={200}><LineChart data={current.series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Line type="monotone" dataKey="balance" stroke="#064E3B" strokeWidth={2} dot={false} name="Balance" /></LineChart></ResponsiveContainer></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Your Payoff — Selected Mode">
        <div className="text-4xl font-black font-mono">{current.cleared ? dateStr(current.months) : 'Never'}</div>
        <p className="text-white/80 mt-2 text-sm">{current.cleared ? `debt-free after ${current.months} months` : 'this payment never clears the balance'}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Interest</p><p className="font-mono text-xl font-bold">{fmt(current.interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Paid</p><p className="font-mono text-xl font-bold">{fmt(balance + current.interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Payoff Time</p><p className="font-mono text-xl font-bold">{current.cleared ? `${Math.floor(current.months / 12)}y ${current.months % 12}m` : '—'}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest vs Balance</p><p className="font-mono text-xl font-bold">{balance > 0 ? Math.round(current.interest / balance * 100) : 0}%</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6 overflow-x-auto"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">All Three Modes Compared</h4>
        <table className="w-full text-sm"><thead><tr className="text-left text-muted-foreground border-b"><th className="py-2 pr-3 font-semibold">Mode</th><th className="py-2 pr-3 font-semibold text-right">Time</th><th className="py-2 font-semibold text-right">Interest</th></tr></thead>
          <tbody>{rows.map((row) => (<tr key={row.key} className={`border-b last:border-0 ${mode === row.key ? 'font-bold text-[#064E3B]' : ''}`}><td className="py-2 pr-3">{row.label}</td><td className="py-2 pr-3 font-mono text-right">{row.r.cleared ? row.r.months + ' mo' : 'Never'}</td><td className="py-2 font-mono text-right">{fmt(row.r.interest)}</td></tr>))}</tbody></table>
        <p className="text-xs text-muted-foreground mt-3">For a full multi-card payoff plan with extra payments, use the Credit Card Payoff Calculator in Personal Wealth or the Debt Payoff Calculator.</p></div>
    <ToolActionsBar slug="credit-card-calculator" isPro={isPro} inputs={{ balance, apr, mode, fixedPayment, pct }} />
    </div></div></>)
}
