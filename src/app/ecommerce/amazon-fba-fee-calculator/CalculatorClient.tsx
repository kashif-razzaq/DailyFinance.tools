'use client'
import React, { useState } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useCurrencySymbol } from '@/lib/currency'

const fmt = (n: number, sym: string) => sym + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmt0 = (n: number, sym: string) => sym + Math.round(n).toLocaleString('en-US')

const REFERRAL: Record<string, number> = { 'Home & Kitchen (15%)': 15, 'Health & Personal Care (15%)': 15, 'Beauty (15%)': 15, 'Grocery (8–15%)': 12, 'Electronics (8%)': 8, 'Clothing & Accessories (17%)': 17, 'Toys & Games (17%)': 17, 'Office Products (15%)': 15, 'Pet Supplies (15%)': 15, 'Baby Products (8–15%)': 12 }
const FBA_FEE: Record<string, number> = { 'Small standard (≤4 oz) — $3.22': 3.22, 'Small standard (12–16 oz) — $4.10': 4.10, 'Large standard (≤1 lb) — $5.10': 5.10, 'Large standard (2 lb) — $6.20': 6.20, 'Large standard (3 lb) — $7.10': 7.10, 'Large bulky (5 lb) — $9.50': 9.50, 'Large bulky (10 lb) — $13.50': 13.50 }

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(39.99)
  const [cogs, setCogs] = useState(11)
  const [category, setCategory] = useState('Home & Kitchen (15%)')
  const [tier, setTier] = useState('Large standard (≤1 lb) — $5.10')
  const [storage, setStorage] = useState(0.45)
  const [inbound, setInbound] = useState(0.80)
  const [units, setUnits] = useState(500)

  const referralFee = price * (REFERRAL[category] / 100)
  const fbaFee = FBA_FEE[tier]
  const totalFees = referralFee + fbaFee + storage + inbound
  const profit = price - cogs - totalFees
  const margin = price > 0 ? profit / price : 0
  const monthly = profit * units

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Product & Fees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">Selling Price</label><Input type="number" step="0.01" value={price === 0 ? '' : price} onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Landed Product Cost (COGS)</label><Input type="number" step="0.01" value={cogs === 0 ? '' : cogs} onChange={(e) => setCogs(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Amazon Category (referral fee)</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
              {Object.keys(REFERRAL).map((k) => <option key={k} value={k}>{k}</option>)}
            </select></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Size Tier (FBA fulfilment fee, approx.)</label>
            <select value={tier} onChange={(e) => setTier(e.target.value)} className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
              {Object.keys(FBA_FEE).map((k) => <option key={k} value={k}>{k}</option>)}
            </select></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Storage Cost per Unit (monthly avg)</label><Input type="number" step="0.01" value={storage === 0 ? '' : storage} onChange={(e) => setStorage(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Inbound Shipping per Unit</label><Input type="number" step="0.01" value={inbound === 0 ? '' : inbound} onChange={(e) => setInbound(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Units Sold per Month</label><Input type="number" value={units === 0 ? '' : units} onChange={(e) => setUnits(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <p className="text-xs text-muted-foreground">Referral and fulfilment fees are approximate 2026 US rates for planning. Always confirm your exact fees in Seller Central — size tier is set by Amazon from your package dimensions and weight.</p>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">Profit per Unit</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{fmt(profit, sym)}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Referral Fee</p><p className="text-xl font-bold font-mono">{fmt(referralFee, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">FBA Fulfilment Fee</p><p className="text-xl font-bold font-mono">{fmt(fbaFee, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Total Amazon Fees / Unit</p><p className="text-xl font-bold font-mono">{fmt(totalFees, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Net Margin</p><p className="text-xl font-bold font-mono">{(margin * 100).toFixed(1)}%</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Monthly Profit</p><p className="text-xl font-bold font-mono">{fmt0(monthly, sym)}</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10">
            {profit > 0 ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
            <span>{profit <= 0 ? 'Amazon keeps more than you do on this product. Renegotiate COGS, shrink the package into a cheaper tier, or raise the price before ordering inventory.' : margin < 0.15 ? 'Profitable but thin — under 15% net margin leaves little room for PPC. Check your break-even ACoS in the guide below.' : 'A workable FBA margin. Protect it by watching storage age and tier creep as packaging changes.'}</span>
          </p>
        </div>
      </div>
    </div>
  <ToolActionsBar slug="amazon-fba-fee-calculator" isPro={isPro} inputs={{ price, cogs, category, tier, storage, inbound, units }} /></>)
}
