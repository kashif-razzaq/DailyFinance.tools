'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp } from "lucide-react"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString()

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [freeSubs, setFreeSubs] = useState(5000)
  const [growthPct, setGrowthPct] = useState(8)
  const [conversion, setConversion] = useState(5)
  const [price, setPrice] = useState(8)
  const [churnPct, setChurnPct] = useState(3)
  const [months, setMonths] = useState(12)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.freeSubs !== undefined) setFreeSubs(s.freeSubs as any)
    if (s.growthPct !== undefined) setGrowthPct(s.growthPct as any)
    if (s.conversion !== undefined) setConversion(s.conversion as any)
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.churnPct !== undefined) setChurnPct(s.churnPct as any)
    if (s.months !== undefined) setMonths(s.months as any)
  })


  const r = useMemo(() => {
    let free = freeSubs
    let paid = freeSubs * (conversion / 100)
    let cumulativeGross = 0
    let cumulativeNet = 0
    const rows: { month: number; free: number; paid: number; mrrNet: number }[] = []
    for (let m = 1; m <= months; m++) {
      free = free * (1 + growthPct / 100)
      const targetPaid = free * (conversion / 100)
      paid = paid * (1 - churnPct / 100) + Math.max(0, targetPaid - paid * (1 - churnPct / 100))
      if (paid > targetPaid) paid = targetPaid
      const mrrGross = paid * price
      // Fees, verified November 2026: 10% Substack + Stripe 2.9% + $0.30 per payment + 0.7%
      // Stripe Billing on recurring payments (the old 0.5% legacy rate expired 30 June 2025).
      const fees = mrrGross * 0.10 + mrrGross * 0.029 + mrrGross * 0.007 + paid * 0.30
      const mrrNet = mrrGross - fees
      cumulativeGross += mrrGross
      cumulativeNet += mrrNet
      rows.push({ month: m, free, paid, mrrNet })
    }
    const final = rows[rows.length - 1] || { free: freeSubs, paid: 0, mrrNet: 0 }
    const startPaid = freeSubs * (conversion / 100)
    const startFees = startPaid * price * 0.136 + startPaid * 0.30
    return { endFree: final.free, endPaid: final.paid, endMrrNet: final.mrrNet, endArrNet: final.mrrNet * 12, cumulativeGross, cumulativeNet, startMrrNet: startPaid * price - startFees, rows }
  }, [freeSubs, growthPct, conversion, price, churnPct, months])

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b text-[#1F2937]"><Calculator className="h-5 w-5 text-[#064E3B]" /> Newsletter Inputs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Free subscribers today</label>
            <Input type="number" value={freeSubs === 0 ? '' : freeSubs} onChange={(e) => setFreeSubs(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[Math.min(freeSubs, 200000)]} max={200000} step={100} onValueChange={(val: unknown) => setFreeSubs(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Paid price ($/month)</label>
            <Input type="number" step="0.5" value={price === 0 ? '' : price} onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <p className="text-xs text-neutral-500">Annual plans pay ~10 months upfront — this model uses the monthly equivalent.</p></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Free-list growth / month</label><span className="font-mono font-bold">{growthPct}%</span></div>
            <Slider value={[growthPct]} max={30} step={0.5} onValueChange={(val: unknown) => setGrowthPct(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
          <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Free → paid conversion</label><span className="font-mono font-bold">{conversion}%</span></div>
            <Slider value={[conversion]} max={15} step={0.25} onValueChange={(val: unknown) => setConversion(Array.isArray(val) ? Number(val[0]) : Number(val))} />
            <p className="text-xs text-neutral-500">Typical Substack conversion is 3–10% of the free list.</p></div>
          <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Monthly paid churn</label><span className="font-mono font-bold">{churnPct}%</span></div>
            <Slider value={[churnPct]} max={12} step={0.25} onValueChange={(val: unknown) => setChurnPct(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
          <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Projection horizon</label><span className="font-mono font-bold">{months} months</span></div>
            <Slider value={[months]} min={3} max={36} step={1} onValueChange={(val: unknown) => setMonths(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
        </div>
      </div>
      <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
        <div className="bg-[#064E3B] text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Net MRR at Month {months}</h3>
          <div className="text-5xl font-black font-mono">{fmt(r.endMrrNet)}</div>
          <p className="text-white/70 text-sm mt-2 font-mono">from {fmt(r.startMrrNet)} today · ARR run-rate {fmt(r.endArrNet)}</p>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 font-mono">
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Free subs (end)</p><p className="text-xl font-bold">{Math.round(r.endFree).toLocaleString()}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Paid subs (end)</p><p className="text-xl font-bold">{Math.round(r.endPaid).toLocaleString()}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Cumulative net</p><p className="text-xl font-bold">{fmt(r.cumulativeNet)}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Cumulative gross</p><p className="text-xl font-bold">{fmt(r.cumulativeGross)}</p></div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-6 text-sm text-neutral-600">
          <strong className="text-[#1F2937]">Formula (per month):</strong> <span className="font-mono">Paid = Free × Conversion % (after churn) · Net MRR = Paid × Price − 10% Substack − (2.9% + $0.30) Stripe − 0.7% Stripe Billing</span>. Fees verified November 2026. Churn is the silent killer — at 5% monthly churn you must replace a twentieth of your paid base every month just to stand still.
        </div>
      <ToolActionsBar slug="substack-growth-predictor-simulator" isPro={isPro} inputs={{ freeSubs, growthPct, conversion, price, churnPct, months }} />
    </div>
    </div>
  </>)
}
