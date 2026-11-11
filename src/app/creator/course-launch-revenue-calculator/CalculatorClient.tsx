'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp } from "lucide-react"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString()

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [listSize, setListSize] = useState(8000)
  const [conversion, setConversion] = useState(2.5)
  const [price, setPrice] = useState(299)
  const [refundPct, setRefundPct] = useState(5)
  const [platformPct, setPlatformPct] = useState(5)
  const [affiliatePct, setAffiliatePct] = useState(0)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.listSize !== undefined) setListSize(s.listSize as any)
    if (s.conversion !== undefined) setConversion(s.conversion as any)
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.refundPct !== undefined) setRefundPct(s.refundPct as any)
    if (s.platformPct !== undefined) setPlatformPct(s.platformPct as any)
    if (s.affiliatePct !== undefined) setAffiliatePct(s.affiliatePct as any)
  })


  const r = useMemo(() => {
    const buyers = listSize * (conversion / 100)
    const gross = buyers * price
    const refunds = gross * (refundPct / 100)
    const keptSales = gross - refunds
    const platform = keptSales * (platformPct / 100)
    const processing = keptSales * 0.029 + (buyers * (1 - refundPct / 100)) * 0.30
    const affiliate = keptSales * (affiliatePct / 100)
    const net = keptSales - platform - processing - affiliate
    return { buyers, gross, refunds, platform, processing, affiliate, net, perSubscriber: listSize > 0 ? net / listSize : 0, perBuyer: buyers > 0 ? net / buyers : 0 }
  }, [listSize, conversion, price, refundPct, platformPct, affiliatePct])

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b text-[#1F2937]"><Calculator className="h-5 w-5 text-[#064E3B]" /> Launch Inputs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Email list / launch audience size</label>
            <Input type="number" value={listSize === 0 ? '' : listSize} onChange={(e) => setListSize(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[Math.min(listSize, 100000)]} max={100000} step={100} onValueChange={(val: unknown) => setListSize(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Course price ($)</label>
            <Input type="number" value={price === 0 ? '' : price} onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">List-to-buyer conversion rate</label><span className="font-mono font-bold">{conversion}%</span></div>
          <Slider value={[conversion]} max={10} step={0.1} onValueChange={(val: unknown) => setConversion(Array.isArray(val) ? Number(val[0]) : Number(val))} />
          <p className="text-xs text-neutral-500">Warm-list launches typically convert 1–3%; a proven offer to a hot list can reach 4–6%. Webinar funnels convert on attendees, not the whole list — adjust the audience number accordingly.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Refund rate (%)</label>
            <Input type="number" step="0.5" value={refundPct === 0 ? '' : refundPct} onChange={(e) => setRefundPct(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Platform fee (%)</label>
            <Input type="number" step="0.5" value={platformPct === 0 ? '' : platformPct} onChange={(e) => setPlatformPct(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" />
            <p className="text-xs text-neutral-500">0% on your own Stripe setup, ~5–10% on hosted course platforms (plan-dependent).</p></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Affiliate share of net sales (%)</label>
            <Input type="number" step="1" value={affiliatePct === 0 ? '' : affiliatePct} onChange={(e) => setAffiliatePct(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" />
            <p className="text-xs text-neutral-500">Share of revenue paid to partners, e.g. 30% commission on 50% of sales = enter 15.</p></div>
        </div>
      </div>
      <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
        <div className="bg-[#064E3B] text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Net Launch Revenue</h3>
          <div className="text-5xl font-black font-mono">{fmt(r.net)}</div>
          <p className="text-white/70 text-sm mt-2 font-mono">{Math.round(r.buyers).toLocaleString()} buyers · {fmt(r.gross)} gross</p>
          <div className="space-y-3 mt-8 pt-6 border-t border-white/20 font-mono text-sm">
            <div className="flex justify-between"><span className="text-white/70">Refunds</span><span>−{fmt(r.refunds)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">Platform fee</span><span>−{fmt(r.platform)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">Card processing (2.9% + $0.30)</span><span>−{fmt(r.processing)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">Affiliate payouts</span><span>−{fmt(r.affiliate)}</span></div>
            <div className="flex justify-between border-t border-white/20 pt-3"><span className="text-white/70">Revenue per subscriber</span><span className="font-bold">${r.perSubscriber.toFixed(2)}</span></div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-6 text-sm text-neutral-600">
          <strong className="text-[#1F2937]">Formula:</strong> <span className="font-mono">Net = (List × Conversion % × Price) − Refunds − Platform % − Processing − Affiliates</span>. Revenue per subscriber is the metric to optimise — it is what lets you outbid competitors for audience growth.
        </div>
      <ToolActionsBar slug="course-launch-revenue-calculator" isPro={isPro} inputs={{ listSize, conversion, price, refundPct, platformPct, affiliatePct }} />
    </div>
    </div>
  </>)
}
