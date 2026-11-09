'use client'
import React, { useState } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useCurrencySymbol } from '@/lib/currency'

const fmt = (n: number, sym: string) => sym + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(80)
  const [cogs, setCogs] = useState(28)
  const [ship, setShip] = useState(7)
  const [other, setOther] = useState(5)
  const [currentRoas, setCurrentRoas] = useState(3)

  const grossProfit = price - cogs - ship - other
  const margin = price > 0 ? grossProfit / price : 0
  const beRoas = margin > 0 ? 1 / margin : 0
  const adCostPerOrder = currentRoas > 0 ? price / currentRoas : 0
  const netPerOrder = grossProfit - adCostPerOrder
  const profitable = margin > 0 && currentRoas >= beRoas

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Per-Order Economics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">Selling Price</label><Input type="number" value={price === 0 ? '' : price} onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Product Cost (COGS)</label><Input type="number" value={cogs === 0 ? '' : cogs} onChange={(e) => setCogs(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Shipping Cost per Order</label><Input type="number" value={ship === 0 ? '' : ship} onChange={(e) => setShip(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Other Cost per Order (fees, packaging)</label><Input type="number" value={other === 0 ? '' : other} onChange={(e) => setOther(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Your Current ROAS</label><span className="font-mono font-bold">{currentRoas.toFixed(1)}x</span></div>
          <Slider value={[currentRoas]} min={0.5} max={10} step={0.1} onValueChange={(v: any) => setCurrentRoas(Array.isArray(v) ? v[0] : v)} />
          <p className="text-xs text-muted-foreground">Slide your live campaign ROAS to see whether each order actually makes money.</p>
        </div>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">Break-Even ROAS</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{beRoas > 0 ? beRoas.toFixed(2) + 'x' : '—'}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Gross Margin</p><p className="text-xl font-bold font-mono">{(margin * 100).toFixed(1)}%</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Max Allowable CPA</p><p className="text-xl font-bold font-mono">{fmt(Math.max(grossProfit, 0), sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Ad Cost / Order</p><p className="text-xl font-bold font-mono">{fmt(adCostPerOrder, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Net Profit / Order</p><p className="text-xl font-bold font-mono">{fmt(netPerOrder, sym)}</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10">
            {profitable ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
            <span>{margin <= 0 ? 'Your costs exceed your price — no ROAS can save this product until margin is fixed.' : profitable ? 'Your current ROAS is above break-even. Every order is profitable before overheads.' : 'Your current ROAS is below break-even. You are paying for revenue and losing money on every order.'}</span>
          </p>
        </div>
      </div>
    </div>
  <ToolActionsBar slug="target-roas-break-even-calculator" isPro={isPro} inputs={{ price, cogs, ship, other, currentRoas }} /></>)
}
