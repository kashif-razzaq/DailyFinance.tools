'use client'
import React, { useState } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
import { useCurrencySymbol } from '@/lib/currency'

const fmt = (n: number, sym: string) => sym + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmt0 = (n: number, sym: string) => sym + Math.round(n).toLocaleString('en-US')

const REFERRAL: Record<string, number> = { 'Home & Kitchen (15%)': 15, 'Health & Personal Care (8–15%)': 15, 'Beauty (8–15%)': 15, 'Grocery (8–15%)': 15, 'Electronics (8%)': 8, 'Clothing & Accessories (5–17%)': 17, 'Toys & Games (15%)': 15, 'Office Products (15%)': 15, 'Pet Supplies (15%)': 15, 'Baby Products (8–15%)': 15 }
// 2026 US referral fees, verified November 2026 (frozen since Jan 2024). Tiered
// categories charge ONE rate on the WHOLE price (not marginal): Clothing 5% ≤$15 /
// 10% $15–$20 / 17% above $20; Baby, Beauty, Health & Personal Care 8% ≤$10 / 15%
// above; Grocery 8% ≤$15 / 15% above. Toys & Games is a flat 15%.
function referralPct(category: string, price: number): number {
  if (category.startsWith('Clothing')) return price <= 15 ? 5 : price <= 20 ? 10 : 17
  if (category.startsWith('Baby') || category.startsWith('Beauty') || category.startsWith('Health')) return price <= 10 ? 8 : 15
  if (category.startsWith('Grocery')) return price <= 15 ? 8 : 15
  return REFERRAL[category] ?? 15
}
// Saved scenarios store the category label; labels changed when tiers were added,
// so match by category name so older saves still resolve to the current label.
function normalizeCategory(stored: string): string {
  const name = stored.split(' (')[0]
  return Object.keys(REFERRAL).find((k) => k.split(' (')[0] === name) ?? 'Home & Kitchen (15%)'
}
// 2026 US FBA fulfilment fees, verified November 2026 (non-peak base rates effective 15 Jan 2026, before
// the surcharge). Each tier is [under $10, $10–$50, over $50] by selling price; bulky tiers have only two
// bands (under $10 / $10 and up), so the over-$50 figure repeats the middle band. Small standard 12–16 oz
// uses the 14–16 oz row (top of the span); bulky fees add $0.38/lb above 1 lb to the tier base.
const FBA_FEE: Record<string, [number, number, number]> = { 'Small standard (≤4 oz) — $2.49–$3.68': [2.49, 3.42, 3.68], 'Small standard (12–16 oz) — $2.95–$4.22': [2.95, 3.96, 4.22], 'Large standard (≤1 lb) — $3.78–$4.86': [3.78, 4.60, 4.86], 'Large standard (2 lb) — $5.00–$6.08': [5.00, 5.82, 6.08], 'Large standard (3 lb) — $5.85–$6.93': [5.85, 6.67, 6.93], 'Large bulky (5 lb) — $10.10–$10.87': [10.10, 10.87, 10.87], 'Large bulky (10 lb) — $12.00–$12.77': [12.00, 12.77, 12.77] }
// 3.5% fuel & logistics surcharge on every FBA fulfilment fee since 17 April 2026.
const FUEL_SURCHARGE = 0.035

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(39.99)
  const [cogs, setCogs] = useState(11)
  const [category, setCategory] = useState('Home & Kitchen (15%)')
  const [tier, setTier] = useState('Large standard (≤1 lb) — $3.78–$4.86')
  const [storage, setStorage] = useState(0.45)
  const [inbound, setInbound] = useState(0.80)
  const [units, setUnits] = useState(500)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.cogs !== undefined) setCogs(s.cogs as any)
    if (s.category !== undefined) setCategory(normalizeCategory(s.category as string))
    if (s.tier !== undefined) setTier(s.tier as any)
    if (s.storage !== undefined) setStorage(s.storage as any)
    if (s.inbound !== undefined) setInbound(s.inbound as any)
    if (s.units !== undefined) setUnits(s.units as any)
  })


  // $0.30 minimum referral fee per item on most categories (Grocery has none).
  const referralFee = Math.max(price * (referralPct(category, price) / 100), category.startsWith('Grocery') ? 0 : 0.30)
  // Saved scenarios store the tier label; match by tier name so saves made before a fee update still resolve.
  const tierBands = Object.entries(FBA_FEE).find(([k]) => k === tier || k.startsWith(tier.split(' — ')[0] + ' —'))?.[1] ?? FBA_FEE['Large standard (≤1 lb) — $3.78–$4.86']
  const bandIdx = price < 10 ? 0 : price <= 50 ? 1 : 2
  const fbaFee = tierBands[bandIdx] * (1 + FUEL_SURCHARGE)
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
          <div className="space-y-2"><label className="text-sm font-semibold">Size Tier (FBA fulfilment fee by price band)</label>
            <select value={tier} onChange={(e) => setTier(e.target.value)} className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
              {Object.keys(FBA_FEE).map((k) => <option key={k} value={k}>{k}</option>)}
            </select></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Storage Cost per Unit (monthly avg)</label><Input type="number" step="0.01" value={storage === 0 ? '' : storage} onChange={(e) => setStorage(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Inbound Shipping per Unit</label><Input type="number" step="0.01" value={inbound === 0 ? '' : inbound} onChange={(e) => setInbound(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Units Sold per Month</label><Input type="number" value={units === 0 ? '' : units} onChange={(e) => setUnits(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <p className="text-xs text-muted-foreground">Fulfilment fees are 2026 US non-peak rates, verified November 2026: the fee depends on your selling price (under $10 / $10–$50 / over $50 — the tier label shows the range) and the figure shown includes the 3.5% fuel &amp; logistics surcharge. Holiday peak rates (15 Oct 2026 – 14 Jan 2027) run higher. Always confirm your exact fees in Seller Central — size tier is set by Amazon from your package dimensions and weight.</p>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">Profit per Unit</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{fmt(profit, sym)}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Referral Fee</p><p className="text-xl font-bold font-mono">{fmt(referralFee, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">FBA Fulfilment Fee (incl. 3.5% surcharge)</p><p className="text-xl font-bold font-mono">{fmt(fbaFee, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Total Amazon Fees / Unit</p><p className="text-xl font-bold font-mono">{fmt(totalFees, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Net Margin</p><p className="text-xl font-bold font-mono">{(margin * 100).toFixed(1)}%</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Monthly Profit</p><p className="text-xl font-bold font-mono">{fmt0(monthly, sym)}</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10">
            {profit > 0 ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
            <span>{profit <= 0 ? 'Amazon keeps more than you do on this product. Renegotiate COGS, shrink the package into a cheaper tier, or raise the price before ordering inventory.' : margin < 0.15 ? 'Profitable but thin — under 15% net margin leaves little room for PPC. Check your break-even ACoS in the guide below.' : 'A workable FBA margin. Protect it by watching storage age and tier creep as packaging changes.'}</span>
          </p>
        </div>
      <ToolActionsBar slug="amazon-fba-fee-calculator" isPro={isPro} inputs={{ price, cogs, category, tier, storage, inbound, units }} />
    </div>
    </div>
  </>)
}
