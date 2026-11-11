'use client'
import React, { useState } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
import { useCurrencySymbol } from '@/lib/currency'

const fmt = (n: number, sym: string) => sym + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmt0 = (n: number, sym: string) => sym + Math.round(n).toLocaleString('en-US')

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(100)
  const [cost, setCost] = useState(55)
  const [units, setUnits] = useState(1000)
  const [discount, setDiscount] = useState(30)
  const [uplift, setUplift] = useState(50)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.cost !== undefined) setCost(s.cost as any)
    if (s.units !== undefined) setUnits(s.units as any)
    if (s.discount !== undefined) setDiscount(s.discount as any)
    if (s.uplift !== undefined) setUplift(s.uplift as any)
  })


  const profitBefore = (price - cost) * units
  const salePrice = price * (1 - discount / 100)
  const profitPerUnitAfter = salePrice - cost
  const unitsNeeded = profitPerUnitAfter > 0 ? profitBefore / profitPerUnitAfter : Infinity
  const upliftNeeded = profitPerUnitAfter > 0 ? (unitsNeeded / units - 1) * 100 : Infinity
  const profitAtUplift = profitPerUnitAfter * units * (1 + uplift / 100)
  const works = profitPerUnitAfter > 0 && uplift >= upliftNeeded

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Normal Trading vs Sale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">Regular Selling Price</label><Input type="number" value={price === 0 ? '' : price} onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Total Cost per Unit (COGS + fees + shipping)</label><Input type="number" value={cost === 0 ? '' : cost} onChange={(e) => setCost(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Units Sold in a Normal Period</label><Input type="number" value={units === 0 ? '' : units} onChange={(e) => setUnits(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Planned Discount</label><span className="font-mono font-bold">{discount}% off</span></div>
          <Slider value={[discount]} min={5} max={80} step={1} onValueChange={(v: any) => setDiscount(Array.isArray(v) ? v[0] : v)} />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Expected Volume Uplift During Sale</label><span className="font-mono font-bold">+{uplift}%</span></div>
          <Slider value={[uplift]} min={0} max={300} step={5} onValueChange={(v: any) => setUplift(Array.isArray(v) ? v[0] : v)} />
        </div>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">Volume Uplift Needed Just to Match Normal Profit</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{isFinite(upliftNeeded) ? '+' + upliftNeeded.toFixed(0) + '%' : 'Impossible'}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Sale Price</p><p className="text-xl font-bold font-mono">{fmt(salePrice, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Profit / Unit on Sale</p><p className="text-xl font-bold font-mono">{fmt(profitPerUnitAfter, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Normal Period Profit</p><p className="text-xl font-bold font-mono">{fmt0(profitBefore, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Profit at Your Expected Uplift</p><p className="text-xl font-bold font-mono">{fmt0(profitAtUplift, sym)}</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10">
            {works ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
            <span>{profitPerUnitAfter <= 0 ? 'At this discount you lose money on every unit — more volume only loses money faster. Reduce the discount below ' + (price > 0 ? (((price - cost) / price) * 100).toFixed(0) : '0') + '% (your margin) or do not run this offer.' : works ? 'Your expected uplift clears the break-even volume. The sale should beat a normal period on profit, before extra ad spend.' : 'Your expected uplift is not enough. Revenue will look great while profit falls — the classic Black Friday trap.'}</span>
          </p>
        </div>
      <ToolActionsBar slug="black-friday-discount-roi-calculator" isPro={isPro} inputs={{ price, cost, units, discount, uplift }} />
    </div>
    </div>
  </>)
}
