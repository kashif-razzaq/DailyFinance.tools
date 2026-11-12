/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" step="0.01" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function PctSlider({ label, value, onChange, max, step = 0.05, hint }: { label: string; value: number; onChange: (n: number) => void; max: number; step?: number; hint?: string }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={0} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} />{hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

// eBay final value fee, verified November 2026: most categories 13.6% of the total amount of the sale
// (price + shipping + tax basis) up to $7,500, then 2.35% on the portion above, plus a per-order fee
// ($0.30 on orders up to $10, $0.40 above). Some categories differ — the % is editable.
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(120)
  const [shippingCharged, setShippingCharged] = useState(0)
  const [itemCost, setItemCost] = useState(55)
  const [shippingCost, setShippingCost] = useState(9)
  const [fvfPct, setFvfPct] = useState(13.6)
  const [perOrder, setPerOrder] = useState(0.40)
  const [promotedPct, setPromotedPct] = useState(0)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.shippingCharged !== undefined) setShippingCharged(s.shippingCharged as any)
    if (s.itemCost !== undefined) setItemCost(s.itemCost as any)
    if (s.shippingCost !== undefined) setShippingCost(s.shippingCost as any)
    if (s.fvfPct !== undefined) setFvfPct(s.fvfPct as any)
    if (s.perOrder !== undefined) setPerOrder(s.perOrder as any)
    if (s.promotedPct !== undefined) setPromotedPct(s.promotedPct as any)
  })


  const r = useMemo(() => {
    const total = price + shippingCharged
    // Fees are charged on the total amount of the sale; promoted listings add an ad-rate % on the same base.
    const fvf = total * (fvfPct / 100) + perOrder
    const promoted = total * (promotedPct / 100)
    const fees = fvf + promoted
    const payout = total - fees
    const profit = payout - itemCost - shippingCost
    const margin = total > 0 ? (profit / total) * 100 : 0
    // Break-even price: solve total − fees = costs → P(1 − pct) = costs + flat − S(1 − pct)... using total base:
    // profit = 0 → (P+S)(1 − pctTotal) − perOrder − costs = 0 → P = (perOrder + costs) / (1 − pctTotal) − S
    const pctTotal = fvfPct / 100 + promotedPct / 100
    const breakeven = pctTotal < 1 ? (perOrder + itemCost + shippingCost) / (1 - pctTotal) - shippingCharged : 0
    return { total, fvf, promoted, fees, payout, profit, margin, breakeven, feeSharePct: total > 0 ? (fees / total) * 100 : 0 }
  }, [price, shippingCharged, itemCost, shippingCost, fvfPct, perOrder, promotedPct])

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <MoneyInput label="Sale Price" value={price} onChange={setPrice} />
        <MoneyInput label="Shipping Charged to Buyer" value={shippingCharged} onChange={setShippingCharged} hint="eBay charges the final value fee on price + shipping." />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <MoneyInput label="Item Cost" value={itemCost} onChange={setItemCost} />
        <MoneyInput label="Your Shipping Cost" value={shippingCost} onChange={setShippingCost} />
      </div>
      <PctSlider label="Final Value Fee %" value={fvfPct} onChange={setFvfPct} max={16} hint="13.6% covers most categories for sellers without a store discount (2.35% on the portion above $7,500). Exceptions: Books/Movies/Music 15.3%, trading cards 13.25%, guitars & basses 6.7%, athletic shoes $150+ 8% with no per-order fee." />
      <div className="space-y-2"><label className="text-sm font-semibold">Per-Order Fee</label>
        <select value={perOrder} onChange={(e) => setPerOrder(Number(e.target.value))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
          <option value={0.3}>$0.30 (orders of $10 or less)</option><option value={0.4}>$0.40 (orders over $10)</option>
        </select></div>
      <PctSlider label="Promoted Listings Ad Rate" value={promotedPct} onChange={setPromotedPct} max={20} step={0.1} hint="Only charged when the sale is attributed to your promoted listing. Watch how fast it eats margin." />
      <p className="text-xs text-muted-foreground">Rates per eBay's published fee schedule for most categories, verified November 2026 — verify your category's exact rate in Seller Hub.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Net Profit per Sale">
        <div className="text-4xl font-black font-mono">{fmt(r.profit)}</div>
        <p className="text-white/80 mt-2 text-sm">payout {fmt(r.payout)} after {fmt(r.fees)} in fees ({r.feeSharePct.toFixed(1)}% of the sale) — margin {r.margin.toFixed(1)}%</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Final Value Fee</p><p className="font-mono text-xl font-bold">{fmt(r.fvf)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Promoted Fee</p><p className="font-mono text-xl font-bold">{fmt(r.promoted)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-[#064E3B]/5 border border-[#064E3B]/20 rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-[#064E3B] dark:text-emerald-400 mb-2">Break-Even Price</h4>
        <p className="text-sm text-muted-foreground">Below <strong className="text-foreground font-mono text-base">{fmt(Math.max(0, r.breakeven))}</strong> this listing loses money after fees and costs{promotedPct > 0 ? ` — including the ${promotedPct}% promoted rate` : ''}. Every $1 of promoted rate adds roughly {fmt(r.total * 0.01)} per sale in fees at the current price.</p>
        <p className="text-xs text-muted-foreground mt-2">Differentiator: a live break-even solver that includes the promoted-listings rate, so you can see the exact ad rate at which a listing stops being worth promoting.</p>
      </div>
    <ToolActionsBar slug="ebay-fee-calculator" isPro={isPro} inputs={{ price, shippingCharged, itemCost, shippingCost, fvfPct, perOrder, promotedPct }} />
    </div>
  </div></>)
}
