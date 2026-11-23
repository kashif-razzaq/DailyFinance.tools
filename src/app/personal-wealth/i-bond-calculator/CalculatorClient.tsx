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
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</p>{children}</div>)
}

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
// Treasury composite rate (31 CFR 359.14): fixed + 2 x semiannual inflation
// + fixed x semiannual inflation, rounded to the nearest 0.01% — the published
// rate. The composite never goes below zero, even in deflation.
function compositeRate(fixedPct: number, inflationPct: number) {
  const f = fixedPct / 100, i = inflationPct / 100
  const raw = f + 2 * i + f * i
  return Math.max(0, Math.round(raw * 10000) / 10000)
}
// Semiannual compounding: each 6-month period adds value x composite / 2.
// The first period uses the current inflation rate; later periods use the
// assumed future inflation rate. Redeeming before 5 years forfeits the last
// 3 months of interest: half of the final period's interest.
function simulateBond(amount: number, fixedPct: number, inflFirstPct: number, inflLaterPct: number, years: number) {
  let bal = amount
  const yearly = new Map<number, number>()
  const redeemable = new Map<number, number>()
  const periods = Math.max(0, Math.round(years * 2))
  for (let p = 0; p < periods; p++) {
    const c = compositeRate(fixedPct, p === 0 ? inflFirstPct : inflLaterPct)
    const startBal = bal
    bal = bal * (1 + c / 2)
    if ((p + 1) % 2 === 0) {
      const y = (p + 1) / 2
      yearly.set(y, Math.round(bal))
      const penalty = y < 5 ? startBal * c / 4 : 0
      redeemable.set(y, Math.round(bal - penalty))
    }
  }
  return { final: bal, yearly, redeemable }
}
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [amount, setAmount] = useState(10000)
  const [fixedRate, setFixedRate] = useState(1.4)
  const [inflationRate, setInflationRate] = useState(2.04)
  const [futureInflation, setFutureInflation] = useState(2.04)
  const [years, setYears] = useState(5)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.amount !== undefined) setAmount(s.amount as any)
    if (s.fixedRate !== undefined) setFixedRate(s.fixedRate as any)
    if (s.inflationRate !== undefined) setInflationRate(s.inflationRate as any)
    if (s.futureInflation !== undefined) setFutureInflation(s.futureInflation as any)
    if (s.years !== undefined) setYears(s.years as any)
  })

  const firstComposite = useMemo(() => compositeRate(fixedRate, inflationRate), [fixedRate, inflationRate])
  const laterComposite = useMemo(() => compositeRate(fixedRate, futureInflation), [fixedRate, futureInflation])
  const sim = useMemo(() => simulateBond(amount, fixedRate, inflationRate, futureInflation, years), [amount, fixedRate, inflationRate, futureInflation, years])
  const interest = sim.final - amount
  const redeemable = sim.redeemable.get(years) ?? Math.round(sim.final)
  const penalty = Math.max(0, Math.round(sim.final) - redeemable)
  const effectiveAnnual = amount > 0 && years > 0 ? (Math.pow(sim.final / amount, 1 / years) - 1) * 100 : 0
  const chart = useMemo(() => {
    const rows: any[] = [{ year: 0, 'Bond value': amount, 'Cash-in value': amount }]
    for (let y = 1; y <= years; y++) rows.push({ year: y, 'Bond value': sim.yearly.get(y) ?? 0, 'Cash-in value': sim.redeemable.get(y) ?? 0 })
    return rows
  }, [sim, amount, years])
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <MoneyInput label="Purchase Amount" value={amount} onChange={setAmount} hint="$25 minimum. Electronic purchases are capped at $10,000 per person per calendar year." />
      <PctSlider label="Fixed Rate" value={fixedRate} onChange={setFixedRate} min={0} max={4} step={0.05} />
      <p className="-mt-3 text-xs text-muted-foreground">Locked for the life of the bond. Current: 1.40% for bonds issued November 1, 2026 to April 30, 2027 — the highest since 2006.</p>
      <PctSlider label="Semiannual Inflation Rate (first 6 months)" value={inflationRate} onChange={setInflationRate} min={-1} max={6} step={0.01} />
      <p className="-mt-3 text-xs text-muted-foreground">Set from the CPI-U every May 1 and November 1. Current: 2.04% for six months.</p>
      <PctSlider label="Assumed Future Inflation Rate (after 6 months)" value={futureInflation} onChange={setFutureInflation} min={-1} max={6} step={0.01} />
      <p className="-mt-3 text-xs text-muted-foreground">Applied from the second 6-month period onward. An assumption, not a forecast — Treasury announces the real rate every May 1 and November 1.</p>
      <div className="space-y-2"><label className="text-sm font-semibold">Holding Period</label>
        <div className="flex gap-2">{[1, 5, 10, 30].map(y => (<button key={y} onClick={() => setYears(y)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${years === y ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'border-neutral-300 hover:border-[#064E3B]'}`}>{y} yr</button>))}</div>
        <p className="text-xs text-muted-foreground">I bonds cannot be redeemed at all in the first 12 months, and redeeming before 5 years forfeits the last 3 months of interest. They stop earning interest at 30 years.</p></div>
      <p className="text-sm text-muted-foreground">Your composite rate for the first six months is <strong className="font-mono">{(firstComposite * 100).toFixed(2)}%</strong>{laterComposite !== firstComposite && <>; later periods use <strong className="font-mono">{(laterComposite * 100).toFixed(2)}%</strong> under your inflation assumption</>}. Interest compounds semiannually: every six months the interest earned is added to the balance, and the next period earns interest on the new, larger balance.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`Bond Value — After ${years} ${years === 1 ? 'Year' : 'Years'}`}>
        <div className="text-4xl font-black font-mono">{fmt(sim.final)}</div>
        <p className="text-white/80 mt-2 text-sm">On a {fmt(amount)} purchase at a {(firstComposite * 100).toFixed(2)}% composite rate — {fmt(interest)} of interest, {effectiveAnnual.toFixed(2)}% effective annual return</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest Earned</p><p className="font-mono text-xl font-bold">{fmt(interest)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Cash-In Value</p><p className="font-mono text-xl font-bold">{fmt(redeemable)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Composite Rate</p><p className="font-mono text-xl font-bold">{(firstComposite * 100).toFixed(2)}%</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">{years < 5 ? '3-Month Penalty' : 'Penalty'}</p><p className="font-mono text-xl font-bold">{years < 5 ? fmt(penalty) : '$0'}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Bond Value vs Cash-In Value</p>
        <ResponsiveContainer width="100%" height={220}><LineChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Legend /><Line type="monotone" dataKey="Bond value" stroke="#064E3B" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="Cash-in value" stroke="#9CA3AF" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-3">Cash-in value is the bond value minus the 3-month interest penalty for redeeming before 5 years. The two lines meet at year 5, when the penalty disappears.</p></div>
      <div className="bg-card border rounded-2xl p-6 text-sm text-muted-foreground leading-relaxed">I bond interest is exempt from state and local income tax, and federal tax is deferred until you cash in — or excluded entirely if the bond pays for qualified higher-education expenses. Rates in this calculator default to TreasuryDirect&apos;s November 1, 2026 announcement; verify the current rate on TreasuryDirect before you buy, because new rates are set every May 1 and November 1.</div>
    <ToolActionsBar slug="i-bond-calculator" isPro={isPro} inputs={{ amount, fixedRate, inflationRate, futureInflation, years }} />
    </div></div></>)
}
