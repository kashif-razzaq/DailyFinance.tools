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

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
function piPayment(principal: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12, n = years * 12
  if (principal <= 0) return 0
  if (r === 0) return principal / n
  const f = Math.pow(1 + r, n)
  return principal * r * f / (f - 1)
}
// Net-cost comparison, year by year.
// Renting: cumulative rent (rising annually) + renter's insurance — none of it comes back.
// Buying: down payment + buying costs + all PITI/maintenance paid, minus what you recover at sale
// (sale price after appreciation, less selling costs, less the remaining loan balance).
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [years, setYears] = useState(7); const [rent, setRent] = useState(1800); const [rentGrowth, setRentGrowth] = useState(3); const [rentIns, setRentIns] = useState(15)
  const [price, setPrice] = useState(425000); const [downPct, setDownPct] = useState(20); const [rate, setRate] = useState(6.75)
  const [taxPct, setTaxPct] = useState(1.1); const [insYear, setInsYear] = useState(1800); const [maintPct, setMaintPct] = useState(1); const [appr, setAppr] = useState(3)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.years !== undefined) setYears(s.years as any)
    if (s.rent !== undefined) setRent(s.rent as any)
    if (s.rentGrowth !== undefined) setRentGrowth(s.rentGrowth as any)
    if (s.rentIns !== undefined) setRentIns(s.rentIns as any)
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.downPct !== undefined) setDownPct(s.downPct as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.taxPct !== undefined) setTaxPct(s.taxPct as any)
    if (s.insYear !== undefined) setInsYear(s.insYear as any)
    if (s.maintPct !== undefined) setMaintPct(s.maintPct as any)
    if (s.appr !== undefined) setAppr(s.appr as any)
  })

  const c = useMemo(() => {
    const down = price * downPct / 100, loan = price - down
    const pi = piPayment(loan, rate, 30), mr = rate / 100 / 12
    const buyClosing = price * 0.02, sellPct = 0.06
    const monthlyBuy = pi + price * taxPct / 100 / 12 + insYear / 12 + price * maintPct / 100 / 12
    let bal = loan, rentCum = 0, buyPaid = down + buyClosing
    const rows: { year: number; Renting: number; Buying: number }[] = [{ year: 0, Renting: 0, Buying: Math.round(down + buyClosing) }]
    let breakEvenYear: number | null = null, finalBuy = 0, finalRent = 0, equityAtEnd = 0
    for (let y = 1; y <= years; y++) {
      rentCum += (rent * Math.pow(1 + rentGrowth / 100, y - 1) + rentIns) * 12
      for (let m = 0; m < 12; m++) { const i = bal * mr; bal = Math.max(0, bal + i - pi) }
      buyPaid += monthlyBuy * 12
      const salePrice = price * Math.pow(1 + appr / 100, y)
      const proceeds = salePrice * (1 - sellPct) - bal // cash back after selling costs and clearing the loan
      const buyNet = buyPaid - proceeds
      rows.push({ year: y, Renting: Math.round(rentCum), Buying: Math.round(buyNet) })
      if (breakEvenYear === null && buyNet < rentCum) breakEvenYear = y
      if (y === years) { finalBuy = buyNet; finalRent = rentCum; equityAtEnd = salePrice - bal }
    }
    return { rows, breakEvenYear, finalBuy, finalRent, diff: finalRent - finalBuy, equityAtEnd, monthlyBuy, down }
  }, [years, rent, rentGrowth, rentIns, price, downPct, rate, taxPct, insYear, maintPct, appr])
  const buyingWins = c.diff > 0
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">How Long Will You Stay?</label><span className="font-mono font-bold">{years} years</span></div>
        <Slider value={[years]} min={1} max={15} step={1} onValueChange={(v: any) => setYears(Array.isArray(v) ? v[0] : v)} /></div>
      <h3 className="font-bold text-lg">Renting</h3>
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Monthly Rent" value={rent} onChange={setRent} /><MoneyInput label="Renter's Insurance (per month)" value={rentIns} onChange={setRentIns} /></div>
      <PctSlider label="Annual Rent Increase" value={rentGrowth} onChange={setRentGrowth} min={0} max={10} step={0.25} />
      <h3 className="font-bold text-lg pt-2">Buying</h3>
      <div className="grid grid-cols-2 gap-6"><MoneyInput label="Home Price" value={price} onChange={setPrice} /><MoneyInput label="Home Insurance (per year)" value={insYear} onChange={setInsYear} /></div>
      <PctSlider label="Down Payment" value={downPct} onChange={setDownPct} min={0} max={50} step={1} />
      <PctSlider label="Mortgage Rate (30-yr)" value={rate} onChange={setRate} min={0} max={15} step={0.125} />
      <div className="grid grid-cols-2 gap-6"><PctSlider label="Property Tax (% of price/yr)" value={taxPct} onChange={setTaxPct} min={0} max={3} step={0.05} /><PctSlider label="Maintenance (% of price/yr)" value={maintPct} onChange={setMaintPct} min={0} max={3} step={0.1} /></div>
      <PctSlider label="Home Appreciation (per year)" value={appr} onChange={setAppr} min={-2} max={10} step={0.25} />
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={`Verdict After ${years} Years`}>
        <div className="text-4xl font-black">{buyingWins ? 'Buying wins' : 'Renting wins'}</div>
        <p className="text-white/80 mt-2 text-sm">by {fmt(Math.abs(c.diff))} in net cost over {years} years</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Net Cost of Renting</p><p className="font-mono text-xl font-bold">{fmt(c.finalRent)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Net Cost of Buying</p><p className="font-mono text-xl font-bold">{fmt(c.finalBuy)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Buying Breaks Even</p><p className="font-mono text-xl font-bold">{c.breakEvenYear ? 'Year ' + c.breakEvenYear : 'Not in horizon'}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Equity Built by Sale</p><p className="font-mono text-xl font-bold">{fmt(c.equityAtEnd)}</p></div>
        </div></ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Cumulative Net Cost by Year</h4>
        <ResponsiveContainer width="100%" height={220}><LineChart data={c.rows}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt(Number(v))} /><Legend /><Line type="monotone" dataKey="Renting" stroke="#D97706" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="Buying" stroke="#064E3B" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-3">Buying assumes 2% purchase closing costs, 6% selling costs, and excludes opportunity cost on the down payment — a fuller model narrows buying&apos;s edge slightly.</p></div>
    </div></div><ToolActionsBar slug="rent-vs-buy-calculator" isPro={isPro} inputs={{ years, rent, rentGrowth, rentIns, price, downPct, rate, taxPct, insYear, maintPct, appr }} /></>)
}
