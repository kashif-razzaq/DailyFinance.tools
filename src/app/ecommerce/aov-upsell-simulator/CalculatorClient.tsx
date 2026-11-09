'use client'
import React, { useState } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { TrendingUp } from "lucide-react"
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useCurrencySymbol } from '@/lib/currency'

const fmt = (n: number, sym: string) => sym + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmt0 = (n: number, sym: string) => sym + Math.round(n).toLocaleString('en-US')

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [orders, setOrders] = useState(2000)
  const [aov, setAov] = useState(55)
  const [bumpPrice, setBumpPrice] = useState(19)
  const [takeRate, setTakeRate] = useState(25)
  const [bumpMargin, setBumpMargin] = useState(70)

  const bumpRevenuePerOrder = bumpPrice * (takeRate / 100)
  const newAov = aov + bumpRevenuePerOrder
  const extraRevenue = orders * bumpRevenuePerOrder
  const extraProfit = extraRevenue * (bumpMargin / 100)
  const revenueNow = orders * aov

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Store & Order Bump</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">Orders per Month</label><Input type="number" value={orders === 0 ? '' : orders} onChange={(e) => setOrders(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Current Average Order Value (AOV)</label><Input type="number" value={aov === 0 ? '' : aov} onChange={(e) => setAov(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Order Bump Price</label><Input type="number" value={bumpPrice === 0 ? '' : bumpPrice} onChange={(e) => setBumpPrice(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Bump Take Rate (share of buyers who add it)</label><span className="font-mono font-bold">{takeRate}%</span></div>
          <Slider value={[takeRate]} min={1} max={60} step={1} onValueChange={(v: any) => setTakeRate(Array.isArray(v) ? v[0] : v)} />
          <p className="text-xs text-muted-foreground">Well-priced bumps priced at 30–40% of the main product typically convert at 20–35%.</p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Bump Gross Margin</label><span className="font-mono font-bold">{bumpMargin}%</span></div>
          <Slider value={[bumpMargin]} min={10} max={100} step={1} onValueChange={(v: any) => setBumpMargin(Array.isArray(v) ? v[0] : v)} />
        </div>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">New Average Order Value</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{fmt(newAov, sym)}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">AOV Increase</p><p className="text-xl font-bold font-mono">+{aov > 0 ? ((bumpRevenuePerOrder / aov) * 100).toFixed(1) : '0'}%</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Extra Revenue / Month</p><p className="text-xl font-bold font-mono">{fmt0(extraRevenue, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Extra Profit / Month</p><p className="text-xl font-bold font-mono">{fmt0(extraProfit, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Extra Profit / Year</p><p className="text-xl font-bold font-mono">{fmt0(extraProfit * 12, sym)}</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10"><TrendingUp className="h-5 w-5 shrink-0" /><span>This revenue costs no extra ad spend — the buyer was already checking out (current monthly revenue {fmt0(revenueNow, sym)}). That is why a bump is usually the highest-ROI change a store can ship this week.</span></p>
        </div>
      </div>
    </div>
  <ToolActionsBar slug="aov-upsell-simulator" isPro={isPro} inputs={{ orders, aov, bumpPrice, takeRate, bumpMargin }} /></>)
}
