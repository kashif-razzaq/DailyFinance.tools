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
  const [orders, setOrders] = useState(800)
  const [flatCharge, setFlatCharge] = useState(5.99)
  const [freeThreshold, setFreeThreshold] = useState(0)
  const [localCost, setLocalCost] = useState(5.50)
  const [regionalCost, setRegionalCost] = useState(8.50)
  const [nationalCost, setNationalCost] = useState(13.50)
  const [localPct, setLocalPct] = useState(25)
  const [regionalPct, setRegionalPct] = useState(45)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.orders !== undefined) setOrders(s.orders as any)
    if (s.flatCharge !== undefined) setFlatCharge(s.flatCharge as any)
    if (s.freeThreshold !== undefined) setFreeThreshold(s.freeThreshold as any)
    if (s.localCost !== undefined) setLocalCost(s.localCost as any)
    if (s.regionalCost !== undefined) setRegionalCost(s.regionalCost as any)
    if (s.nationalCost !== undefined) setNationalCost(s.nationalCost as any)
    if (s.localPct !== undefined) setLocalPct(s.localPct as any)
    if (s.regionalPct !== undefined) setRegionalPct(s.regionalPct as any)
  })


  const nationalPct = Math.max(0, 100 - localPct - regionalPct)
  const avgCarrier = (localCost * localPct + regionalCost * regionalPct + nationalCost * nationalPct) / 100
  const flatNet = flatCharge - avgCarrier
  const calcNet = 0 // pass-through: customer pays actual carrier cost
  const monthlyFlat = flatNet * orders
  const highestZoneLoss = flatCharge - nationalCost

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Zone Costs & Order Mix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">Orders per Month</label><Input type="number" value={orders === 0 ? '' : orders} onChange={(e) => setOrders(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Flat Shipping Charged to Customer</label><Input type="number" step="0.01" value={flatCharge === 0 ? '' : flatCharge} onChange={(e) => setFlatCharge(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Avg Carrier Cost — Local Zone</label><Input type="number" step="0.01" value={localCost === 0 ? '' : localCost} onChange={(e) => setLocalCost(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Avg Carrier Cost — Regional Zone</label><Input type="number" step="0.01" value={regionalCost === 0 ? '' : regionalCost} onChange={(e) => setRegionalCost(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Avg Carrier Cost — National / Farthest Zone</label><Input type="number" step="0.01" value={nationalCost === 0 ? '' : nationalCost} onChange={(e) => setNationalCost(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Free-Shipping Threshold (0 = no free shipping)</label><Input type="number" value={freeThreshold === 0 ? '' : freeThreshold} onChange={(e) => setFreeThreshold(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Share of Orders — Local Zone</label><span className="font-mono font-bold">{localPct}%</span></div>
          <Slider value={[localPct]} min={0} max={90} step={1} onValueChange={(v: any) => setLocalPct(Array.isArray(v) ? v[0] : v)} />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Share of Orders — Regional Zone</label><span className="font-mono font-bold">{regionalPct}%</span></div>
          <Slider value={[regionalPct]} min={0} max={90} step={1} onValueChange={(v: any) => setRegionalPct(Array.isArray(v) ? v[0] : v)} />
          <p className="text-xs text-muted-foreground">National share is the remainder: currently {nationalPct}% of orders. Weight matters through carrier pricing — enter the average cost you actually pay per zone at your typical parcel weight.</p>
        </div>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">Flat-Rate Result per Order</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{fmt(flatNet, sym)}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Avg Carrier Cost (weighted)</p><p className="text-xl font-bold font-mono">{fmt(avgCarrier, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Calculated (Pass-Through) Net</p><p className="text-xl font-bold font-mono">{fmt(calcNet, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Flat-Rate Result / Month</p><p className="text-xl font-bold font-mono">{fmt0(monthlyFlat, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Loss on a Farthest-Zone Order</p><p className="text-xl font-bold font-mono">{fmt(highestZoneLoss, sym)}</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10">
            {flatNet >= 0 ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
            <span>{flatNet >= 0 ? 'Your flat rate covers your weighted carrier cost. Keep monitoring the zone mix — a shift toward national orders can flip this quietly.' : 'Your flat rate loses money on the average order. Raise the flat rate toward the weighted cost, add a far-zone surcharge, or use a free-shipping threshold (' + (freeThreshold > 0 ? 'currently ' + sym + freeThreshold : 'not set') + ') high enough that margin absorbs shipping.'}</span>
          </p>
        </div>
      </div>
    </div>
  <ToolActionsBar slug="shipping-zone-optimizer" isPro={isPro} inputs={{ orders, flatCharge, freeThreshold, localCost, regionalCost, nationalCost, localPct, regionalPct }} /></>)
}
