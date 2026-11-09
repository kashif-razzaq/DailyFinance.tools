'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp } from "lucide-react"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString()
const fmt2 = (n: number) => curSym() + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [clicks, setClicks] = useState(12000)
  const [conversion, setConversion] = useState(3)
  const [commission, setCommission] = useState(45)
  const [spend, setSpend] = useState(800)

  const r = useMemo(() => {
    const sales = clicks * (conversion / 100)
    const revenue = sales * commission
    const profit = revenue - spend
    return { sales, revenue, profit, epc: clicks > 0 ? revenue / clicks : 0, roi: spend > 0 ? (profit / spend) * 100 : 0, costPerSale: sales > 0 ? spend / sales : 0, breakEvenClicks: 0 }
  }, [clicks, conversion, commission, spend])

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b text-[#1F2937]"><Calculator className="h-5 w-5 text-[#064E3B]" /> Affiliate Funnel Inputs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Affiliate link clicks</label>
            <Input type="number" value={clicks === 0 ? '' : clicks} onChange={(e) => setClicks(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[Math.min(clicks, 200000)]} max={200000} step={100} onValueChange={(val: unknown) => setClicks(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Average commission per sale ($)</label>
            <Input type="number" step="0.5" value={commission === 0 ? '' : commission} onChange={(e) => setCommission(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Click-to-sale conversion rate</label><span className="font-mono font-bold">{conversion}%</span></div>
          <Slider value={[conversion]} max={15} step={0.1} onValueChange={(val: unknown) => setConversion(Array.isArray(val) ? Number(val[0]) : Number(val))} />
          <p className="text-xs text-neutral-500">Warm review/comparison traffic converts at 2–6%; cold social traffic is often under 1%. Use your network dashboard&apos;s click-to-order rate, not the merchant&apos;s landing-page rate.</p>
        </div>
        <div className="space-y-3"><label className="text-sm font-semibold">Total cost to get those clicks ($)</label>
          <Input type="number" value={spend === 0 ? '' : spend} onChange={(e) => setSpend(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
          <p className="text-xs text-neutral-500">Ads, content production, tools, or your valued production time. Organic creators often enter $0 — ROI is then shown against revenue only.</p></div>
      </div>
      <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
        <div className="bg-[#064E3B] text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Earnings Per Click (EPC)</h3>
          <div className="text-5xl font-black font-mono">{fmt2(r.epc)}</div>
          <p className="text-white/70 text-sm mt-2 font-mono">{Math.round(r.sales).toLocaleString()} sales · {fmt(r.revenue)} commission revenue</p>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 font-mono">
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Profit after costs</p><p className="text-xl font-bold">{fmt(r.profit)}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">ROI on spend</p><p className="text-xl font-bold">{spend > 0 ? r.roi.toFixed(0) + '%' : '—'}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Cost per sale</p><p className="text-xl font-bold">{fmt2(r.costPerSale)}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Revenue / 1,000 clicks</p><p className="text-xl font-bold">{fmt(r.epc * 1000)}</p></div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-6 text-sm text-neutral-600">
          <strong className="text-[#1F2937]">Formula:</strong> <span className="font-mono">Sales = Clicks × Conversion % · Revenue = Sales × Commission · EPC = Revenue ÷ Clicks · ROI = (Revenue − Cost) ÷ Cost</span>. EPC is the only honest way to compare two affiliate programs: a $100 commission at 0.5% conversion loses to a $30 commission at 4%.
        </div>
      </div>
    </div>
  <ToolActionsBar slug="affiliate-link-roi-calculator" isPro={isPro} inputs={{ clicks, conversion, commission, spend }} /></>)
}
