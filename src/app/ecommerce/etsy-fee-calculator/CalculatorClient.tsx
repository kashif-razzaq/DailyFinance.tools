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
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

// Published Etsy fee schedule (US shop): listing $0.20/item; transaction 6.5% of (price + shipping charged);
// Etsy Payments processing 3% + $0.25; regulatory operating fee varies by country (1.1% shown for the US);
// Offsite Ads 12% (15% for shops over $10k/yr) only when a sale is attributed to an ad.
const LISTING = 0.20, TRANSACTION = 0.065, PROCESSING_PCT = 0.03, PROCESSING_FLAT = 0.25

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [price, setPrice] = useState(45)
  const [shippingCharged, setShippingCharged] = useState(5)
  const [itemCost, setItemCost] = useState(14)
  const [shippingCost, setShippingCost] = useState(6.5)
  const [regPct, setRegPct] = useState(1.1)
  const [offsiteAds, setOffsiteAds] = useState(false)
  const [targetMargin, setTargetMargin] = useState(30)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.shippingCharged !== undefined) setShippingCharged(s.shippingCharged as any)
    if (s.itemCost !== undefined) setItemCost(s.itemCost as any)
    if (s.shippingCost !== undefined) setShippingCost(s.shippingCost as any)
    if (s.regPct !== undefined) setRegPct(s.regPct as any)
    if (s.offsiteAds !== undefined) setOffsiteAds(s.offsiteAds as any)
    if (s.targetMargin !== undefined) setTargetMargin(s.targetMargin as any)
  })


  const r = useMemo(() => {
    const revenue = price + shippingCharged
    const listing = LISTING
    const transaction = revenue * TRANSACTION
    const processing = revenue * PROCESSING_PCT + PROCESSING_FLAT
    const regulatory = revenue * (regPct / 100)
    const ads = offsiteAds ? revenue * 0.12 : 0
    const totalFees = listing + transaction + processing + regulatory + ads
    const net = revenue - totalFees - itemCost - shippingCost
    const margin = revenue > 0 ? (net / revenue) * 100 : 0
    const feePct = revenue > 0 ? (totalFees / revenue) * 100 : 0
    // Reverse solver: price needed so net margin = targetMargin% of revenue.
    // net = (P+S)(1 − pctFees − adv) − flats − costs = m(P+S)  →  P+S = (flats + costs) / (1 − pctFees − ads − m); P = that − S
    const pctFees = TRANSACTION + PROCESSING_PCT + regPct / 100 + (offsiteAds ? 0.12 : 0)
    const denom = 1 - pctFees - targetMargin / 100
    const needed = denom > 0 ? (LISTING + PROCESSING_FLAT + itemCost + shippingCost) / denom - shippingCharged : 0
    return { revenue, listing, transaction, processing, regulatory, ads, totalFees, net, margin, feePct, needed }
  }, [price, shippingCharged, itemCost, shippingCost, regPct, offsiteAds, targetMargin])

  const feeRow = (label: string, rate: string, amount: number) => (
    <div className="flex justify-between text-sm py-1.5 border-b border-dashed last:border-0"><span className="text-muted-foreground">{label} <span className="text-xs">({rate})</span></span><span className="font-mono font-semibold">−{fmt(amount)}</span></div>
  )

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <MoneyInput label="Item Price" value={price} onChange={setPrice} />
        <MoneyInput label="Shipping Charged to Buyer" value={shippingCharged} onChange={setShippingCharged} hint="Etsy charges percentage fees on price + shipping combined." />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <MoneyInput label="Item Cost (materials, making)" value={itemCost} onChange={setItemCost} />
        <MoneyInput label="Your Shipping Cost" value={shippingCost} onChange={setShippingCost} />
      </div>
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Regulatory Operating Fee</label><span className="font-mono font-bold">{regPct}%</span></div>
        <Slider value={[regPct]} min={0} max={2.5} step={0.05} onValueChange={(v: any) => setRegPct(Array.isArray(v) ? v[0] : v)} />
        <p className="text-xs text-muted-foreground">Varies by seller country — adjust to your statement. Fees per Etsy's published schedule; check your Etsy payment account for your exact rates.</p></div>
      <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={offsiteAds} onChange={(e) => setOffsiteAds(e.target.checked)} className="h-4 w-4 accent-[#064E3B]" />
        <span className="text-sm font-semibold">Sale came through Offsite Ads (12%)</span></label>
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Target Margin for Price Solver</label><span className="font-mono font-bold">{targetMargin}%</span></div>
        <Slider value={[targetMargin]} min={0} max={70} step={1} onValueChange={(v: any) => setTargetMargin(Array.isArray(v) ? v[0] : v)} /></div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Your Net Profit per Sale">
        <div className="text-4xl font-black font-mono">{fmt(r.net)}</div>
        <p className="text-white/80 mt-2 text-sm">margin {r.margin.toFixed(1)}% · Etsy takes {fmt(r.totalFees)} ({r.feePct.toFixed(1)}% of the {fmt(r.revenue)} the buyer pays)</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Revenue</p><p className="font-mono text-xl font-bold">{fmt(r.revenue)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Fees</p><p className="font-mono text-xl font-bold">{fmt(r.totalFees)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Every Fee, Itemised</h4>
        {feeRow('Listing fee', 'flat per item', r.listing)}
        {feeRow('Transaction fee', '6.5%', r.transaction)}
        {feeRow('Payment processing', '3% + $0.25', r.processing)}
        {feeRow('Regulatory fee', regPct + '%', r.regulatory)}
        {offsiteAds && feeRow('Offsite Ads', '12%', r.ads)}
        {feeRow('Item cost', 'your cost', itemCost)}
        {feeRow('Shipping cost', 'your cost', shippingCost)}
      </div>
      <div className="bg-[#064E3B]/5 border border-[#064E3B]/20 rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-[#064E3B] dark:text-emerald-400 mb-2">Price Solver</h4>
        <p className="text-sm text-muted-foreground">To keep a <strong className="text-foreground">{targetMargin}% margin</strong> after all Etsy fees and your costs, price this item at <strong className="text-foreground font-mono text-base">{fmt(Math.max(0, r.needed))}</strong> (with {fmt(shippingCharged)} shipping).</p>
        <p className="text-xs text-muted-foreground mt-2">Differentiator: a reverse price solver — enter the margin you want and get the listing price that survives Etsy's full fee stack.</p>
      </div>
    </div>
  </div><ToolActionsBar slug="etsy-fee-calculator" isPro={isPro} inputs={{ price, shippingCharged, itemCost, shippingCost, regPct, offsiteAds, targetMargin }} /></>)
}
