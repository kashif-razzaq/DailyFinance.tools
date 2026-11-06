'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp } from "lucide-react"

const fmt = (n: number) => '$' + Math.round(n).toLocaleString()
const NICHE_CPM: Record<string, number> = {
  'Finance & B2B': 50, 'Business & Marketing': 40, 'Technology': 35, 'Education': 30,
  'Health & Fitness': 28, 'Beauty & Fashion': 25, 'Gaming': 20, 'Lifestyle & Vlog': 22, 'Entertainment': 18,
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  void isPro
  const [avgViews, setAvgViews] = useState(80000)
  const [engagement, setEngagement] = useState(4.5)
  const [niche, setNiche] = useState('Finance & B2B')
  const [deliverables, setDeliverables] = useState(1)
  const [usagePct, setUsagePct] = useState(30)
  const [exclusivityPct, setExclusivityPct] = useState(0)

  const r = useMemo(() => {
    const cpm = NICHE_CPM[niche]
    const base = (avgViews / 1000) * cpm
    const engagementFactor = 1 + (engagement - 3) * 0.08
    const adjusted = base * Math.max(0.6, engagementFactor)
    const withRights = adjusted * (1 + usagePct / 100) * (1 + exclusivityPct / 100)
    const total = withRights * deliverables
    return { base, adjusted, perDeliverable: withRights, total, low: total * 0.8, high: total * 1.3, cpm }
  }, [avgViews, engagement, niche, deliverables, usagePct, exclusivityPct])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b text-[#1F2937]"><Calculator className="h-5 w-5 text-[#064E3B]" /> Audience & Deal Inputs</h2>
        <div className="space-y-3">
          <label className="text-sm font-semibold">Niche (sets the sponsorship CPM brands actually pay)</label>
          <select value={niche} onChange={(e) => setNiche(e.target.value)} className="w-full h-10 rounded-lg border border-neutral-300 px-3 text-sm bg-white">
            {Object.entries(NICHE_CPM).map(([n, c]) => <option key={n} value={n}>{n} — ≈ ${c} CPM</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold">Average views per video / post</label>
            <Input type="number" value={avgViews === 0 ? '' : avgViews} onChange={(e) => setAvgViews(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[Math.min(avgViews, 2000000)]} max={2000000} step={1000} onValueChange={(val: unknown) => setAvgViews(Array.isArray(val) ? Number(val[0]) : Number(val))} />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold">Engagement rate (%)</label>
            <Input type="number" step="0.1" value={engagement === 0 ? '' : engagement} onChange={(e) => setEngagement(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[engagement]} max={15} step={0.1} onValueChange={(val: unknown) => setEngagement(Array.isArray(val) ? Number(val[0]) : Number(val))} />
            <p className="text-xs text-neutral-500">Benchmark is ~3%. Each point above it adds ~8% to the rate; below it discounts.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Deliverables</label>
            <Input type="number" value={deliverables === 0 ? '' : deliverables} onChange={(e) => setDeliverables(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Usage rights uplift (%)</label>
            <Input type="number" value={usagePct === 0 ? '' : usagePct} onChange={(e) => setUsagePct(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <p className="text-xs text-neutral-500">Brand re-using your content in ads: typically +20–50%.</p></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Exclusivity uplift (%)</label>
            <Input type="number" value={exclusivityPct === 0 ? '' : exclusivityPct} onChange={(e) => setExclusivityPct(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <p className="text-xs text-neutral-500">Blocking competitor deals: typically +25–100%.</p></div>
        </div>
      </div>
      <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
        <div className="bg-[#064E3B] text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Recommended Deal Price</h3>
          <div className="text-5xl font-black font-mono">{fmt(r.total)}</div>
          <p className="text-white/70 text-sm mt-2 font-mono">Negotiate in the range {fmt(r.low)} – {fmt(r.high)}</p>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 font-mono">
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Per deliverable</p><p className="text-xl font-bold">{fmt(r.perDeliverable)}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Base (views × CPM)</p><p className="text-xl font-bold">{fmt(r.base)}</p></div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-6 text-sm text-neutral-600">
          <strong className="text-[#1F2937]">Formula:</strong> <span className="font-mono">Price = (Avg Views ÷ 1,000) × Niche CPM × Engagement Factor × (1 + Usage %) × (1 + Exclusivity %) × Deliverables</span>. Quote the mid-point, keep the low end as your walk-away floor.
        </div>
      </div>
    </div>
  )
}
