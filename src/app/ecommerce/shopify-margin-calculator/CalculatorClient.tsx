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
  const [price, setPrice] = useState(60)
  const [cogs, setCogs] = useState(22)
  const [shipCharged, setShipCharged] = useState(0)
  const [shipCost, setShipCost] = useState(6)
  const [other, setOther] = useState(2)
  const [orders, setOrders] = useState(300)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.cogs !== undefined) setCogs(s.cogs as any)
    if (s.shipCharged !== undefined) setShipCharged(s.shipCharged as any)
    if (s.shipCost !== undefined) setShipCost(s.shipCost as any)
    if (s.other !== undefined) setOther(s.other as any)
    if (s.orders !== undefined) setOrders(s.orders as any)
  })


  const charged = price + shipCharged
  const payFee = charged * 0.029 + 0.30
  const profit = price + shipCharged - cogs - shipCost - payFee - other
  const margin = charged > 0 ? profit / charged : 0
  const monthly = profit * orders

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Order Economics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">Selling Price</label><Input type="number" value={price === 0 ? '' : price} onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Product Cost (COGS)</label><Input type="number" value={cogs === 0 ? '' : cogs} onChange={(e) => setCogs(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Shipping Charged to Customer</label><Input type="number" value={shipCharged === 0 ? '' : shipCharged} onChange={(e) => setShipCharged(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Your Shipping Cost</label><Input type="number" value={shipCost === 0 ? '' : shipCost} onChange={(e) => setShipCost(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Other Cost per Order (apps, packaging)</label><Input type="number" value={other === 0 ? '' : other} onChange={(e) => setOther(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Orders per Month</label><Input type="number" value={orders === 0 ? '' : orders} onChange={(e) => setOrders(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <p className="text-xs text-muted-foreground">Shopify Payments fee is applied automatically at 2.9% + $0.30 on the total charged to the customer (price + shipping charged). Plan rates vary — Advanced plans pay less, third-party gateways pay more.</p>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">True Profit per Order</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{fmt(profit, sym)}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">True Margin</p><p className="text-xl font-bold font-mono">{(margin * 100).toFixed(1)}%</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Shopify Payments Fee</p><p className="text-xl font-bold font-mono">{fmt(payFee, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Monthly Profit</p><p className="text-xl font-bold font-mono">{fmt0(monthly, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Gross Margin (price − COGS)</p><p className="text-xl font-bold font-mono">{price > 0 ? (((price - cogs) / price) * 100).toFixed(1) + '%' : '—'}</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10">
            {profit > 0 ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
            <span>{profit <= 0 ? 'This product loses money on every order once payment fees and shipping are included — reprice or cut costs before spending on ads.' : margin < 0.2 ? 'Profitable, but under a 20% true margin there is almost no room left for ad spend. Your break-even ROAS is above ' + (margin > 0 ? (1 / margin).toFixed(1) : '—') + 'x.' : 'Healthy true margin. You have room to fund ads, discounts and growth from profit.'}</span>
          </p>
        </div>
      <ToolActionsBar slug="shopify-margin-calculator" isPro={isPro} inputs={{ price, cogs, shipCharged, shipCost, other, orders }} />
    </div>
    </div>
  </>)
}
