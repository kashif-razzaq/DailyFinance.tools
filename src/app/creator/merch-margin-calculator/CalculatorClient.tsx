'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp } from "lucide-react"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + n.toLocaleString(undefined, { maximumFractionDigits: 0 })
const fmt2 = (n: number) => curSym() + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [price, setPrice] = useState(35)
  const [baseCost, setBaseCost] = useState(13)
  const [printCost, setPrintCost] = useState(4)
  const [platformPct, setPlatformPct] = useState(0)
  const [txnPct, setTxnPct] = useState(2.9)
  const [txnFixed, setTxnFixed] = useState(0.3)
  const [shipCharged, setShipCharged] = useState(4.99)
  const [shipCost, setShipCost] = useState(4.5)
  const [units, setUnits] = useState(300)
  const [returnPct, setReturnPct] = useState(2)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.baseCost !== undefined) setBaseCost(s.baseCost as any)
    if (s.printCost !== undefined) setPrintCost(s.printCost as any)
    if (s.platformPct !== undefined) setPlatformPct(s.platformPct as any)
    if (s.txnPct !== undefined) setTxnPct(s.txnPct as any)
    if (s.txnFixed !== undefined) setTxnFixed(s.txnFixed as any)
    if (s.shipCharged !== undefined) setShipCharged(s.shipCharged as any)
    if (s.shipCost !== undefined) setShipCost(s.shipCost as any)
    if (s.units !== undefined) setUnits(s.units as any)
    if (s.returnPct !== undefined) setReturnPct(s.returnPct as any)
  })


  const r = useMemo(() => {
    const platform = price * (platformPct / 100)
    const txn = price * (txnPct / 100) + txnFixed
    const shipNet = shipCharged - shipCost
    const profitPerUnit = price - baseCost - printCost - platform - txn + shipNet
    const adjustedProfit = profitPerUnit * (1 - returnPct / 100) - (profitPerUnit > 0 ? 0 : 0)
    const margin = price > 0 ? (profitPerUnit / price) * 100 : 0
    return { platform, txn, shipNet, profitPerUnit, adjustedProfit, margin, monthly: adjustedProfit * units, markup: (baseCost + printCost) > 0 ? ((price - baseCost - printCost) / (baseCost + printCost)) * 100 : 0 }
  }, [price, baseCost, printCost, platformPct, txnPct, txnFixed, shipCharged, shipCost, units, returnPct])

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b text-[#1F2937]"><Calculator className="h-5 w-5 text-[#064E3B]" /> Product Inputs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Selling price ($)</label>
            <Input type="number" step="0.5" value={price === 0 ? '' : price} onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Base product cost ($)</label>
            <Input type="number" step="0.5" value={baseCost === 0 ? '' : baseCost} onChange={(e) => setBaseCost(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" />
            <p className="text-xs text-neutral-500">Blank + fulfilment base from your print-on-demand provider.</p></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Print / embroidery cost ($)</label>
            <Input type="number" step="0.5" value={printCost === 0 ? '' : printCost} onChange={(e) => setPrintCost(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Platform / marketplace fee (%)</label>
            <Input type="number" step="0.5" value={platformPct === 0 ? '' : platformPct} onChange={(e) => setPlatformPct(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" />
            <p className="text-xs text-neutral-500">0% on your own store; add marketplace % where relevant.</p></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Payment fee (%)</label>
            <Input type="number" step="0.1" value={txnPct === 0 ? '' : txnPct} onChange={(e) => setTxnPct(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Payment fixed fee ($)</label>
            <Input type="number" step="0.05" value={txnFixed === 0 ? '' : txnFixed} onChange={(e) => setTxnFixed(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Shipping charged to customer ($)</label>
            <Input type="number" step="0.25" value={shipCharged === 0 ? '' : shipCharged} onChange={(e) => setShipCharged(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Your shipping cost ($)</label>
            <Input type="number" step="0.25" value={shipCost === 0 ? '' : shipCost} onChange={(e) => setShipCost(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Units sold per month</label>
            <Input type="number" value={units === 0 ? '' : units} onChange={(e) => setUnits(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[Math.min(units, 5000)]} max={5000} step={10} onValueChange={(val: unknown) => setUnits(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Returns / reprints (%)</label>
            <Input type="number" step="0.5" value={returnPct === 0 ? '' : returnPct} onChange={(e) => setReturnPct(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
      </div>
      <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
        <div className="bg-[#064E3B] text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Profit Per Unit</h3>
          <div className="text-5xl font-black font-mono">{fmt2(r.profitPerUnit)}</div>
          <p className="text-white/70 text-sm mt-2 font-mono">Margin {r.margin.toFixed(1)}% · Markup {r.markup.toFixed(0)}%</p>
          <div className="space-y-3 mt-8 pt-6 border-t border-white/20 font-mono text-sm">
            <div className="flex justify-between"><span className="text-white/70">Platform fee / unit</span><span>−{fmt2(r.platform)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">Payment fee / unit</span><span>−{fmt2(r.txn)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">Shipping net / unit</span><span>{r.shipNet >= 0 ? '+' : '−'}{fmt2(Math.abs(r.shipNet))}</span></div>
            <div className="flex justify-between border-t border-white/20 pt-3"><span className="text-white/70">Monthly profit (after returns)</span><span className="font-bold">{fmt(r.monthly)}</span></div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-6 text-sm text-neutral-600">
          <strong className="text-[#1F2937]">Formula:</strong> <span className="font-mono">Profit = Price − Base − Print − Platform % − Payment Fees + (Shipping Charged − Shipping Cost)</span>. Margin and markup are not the same number: margin divides by price, markup divides by cost.
        </div>
      <ToolActionsBar slug="merch-margin-calculator" isPro={isPro} inputs={{ price, baseCost, printCost, platformPct, txnPct, txnFixed, shipCharged, shipCost, units, returnPct }} />
    </div>
    </div>
  </>)
}
