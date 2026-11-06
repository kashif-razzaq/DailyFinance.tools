'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { CheckCircle2, AlertTriangle } from "lucide-react"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [dailySales, setDailySales] = useState(20)
  const [leadTime, setLeadTime] = useState(14)
  const [safetyDays, setSafetyDays] = useState(7)
  const [currentStock, setCurrentStock] = useState(500)
  const [coverDays, setCoverDays] = useState(30)

  const demandDuringLead = dailySales * leadTime
  const safetyStock = dailySales * safetyDays
  const rop = demandDuringLead + safetyStock
  const daysLeft = dailySales > 0 ? currentStock / dailySales : 0
  const daysUntilRop = dailySales > 0 ? Math.max(0, (currentStock - rop) / dailySales) : 0
  const suggestedOrder = Math.max(0, Math.ceil(dailySales * coverDays + rop - currentStock))
  const urgent = currentStock <= rop

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Demand & Lead Time</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">Average Daily Unit Sales</label><Input type="number" value={dailySales === 0 ? '' : dailySales} onChange={(e) => setDailySales(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Current Stock on Hand (units)</label><Input type="number" value={currentStock === 0 ? '' : currentStock} onChange={(e) => setCurrentStock(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Supplier Lead Time</label><span className="font-mono font-bold">{leadTime} days</span></div>
          <Slider value={[leadTime]} min={1} max={90} step={1} onValueChange={(v: any) => setLeadTime(Array.isArray(v) ? v[0] : v)} />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Safety Stock Cover</label><span className="font-mono font-bold">{safetyDays} days</span></div>
          <Slider value={[safetyDays]} min={0} max={30} step={1} onValueChange={(v: any) => setSafetyDays(Array.isArray(v) ? v[0] : v)} />
          <p className="text-xs text-muted-foreground">Safety days protect you against demand spikes and late deliveries. Volatile products and unreliable suppliers need more.</p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Days of Cover per Order</label><span className="font-mono font-bold">{coverDays} days</span></div>
          <Slider value={[coverDays]} min={7} max={90} step={1} onValueChange={(v: any) => setCoverDays(Array.isArray(v) ? v[0] : v)} />
        </div>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">Reorder Point</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{Math.ceil(rop).toLocaleString()} <span className="text-xl">units</span></div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Demand During Lead Time</p><p className="text-xl font-bold font-mono">{Math.ceil(demandDuringLead).toLocaleString()}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Safety Stock</p><p className="text-xl font-bold font-mono">{Math.ceil(safetyStock).toLocaleString()}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Stock Runs Out In</p><p className="text-xl font-bold font-mono">{daysLeft.toFixed(1)} days</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Suggested Order Qty</p><p className="text-xl font-bold font-mono">{suggestedOrder.toLocaleString()}</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10">
            {urgent ? <AlertTriangle className="h-5 w-5 shrink-0" /> : <CheckCircle2 className="h-5 w-5 shrink-0" />}
            <span>{urgent ? 'Order now. Your stock is already at or below the reorder point — every day of delay eats your safety cover.' : 'You have about ' + daysUntilRop.toFixed(0) + ' days before you hit the reorder point. Put the order date in your calendar now, not when stock looks low.'}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
