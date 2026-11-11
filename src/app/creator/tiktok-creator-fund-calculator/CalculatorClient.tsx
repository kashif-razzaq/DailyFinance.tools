'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp, AlertTriangle } from "lucide-react"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + n.toLocaleString(undefined, { maximumFractionDigits: 0 })

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [views, setViews] = useState(1000000)
  const [qualifiedPct, setQualifiedPct] = useState(70)
  const [rpm, setRpm] = useState(0.7)
  const [videos, setVideos] = useState(20)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.views !== undefined) setViews(s.views as any)
    if (s.qualifiedPct !== undefined) setQualifiedPct(s.qualifiedPct as any)
    if (s.rpm !== undefined) setRpm(s.rpm as any)
    if (s.videos !== undefined) setVideos(s.videos as any)
  })


  const r = useMemo(() => {
    const qualified = views * (qualifiedPct / 100)
    const rewards = (qualified / 1000) * rpm
    const oldFund = (views / 1000) * 0.03
    return { qualified, rewards, oldFund, multiple: oldFund > 0 ? rewards / oldFund : 0, perVideo: videos > 0 ? rewards / videos : 0, monthlyIfSustained: rewards }
  }, [views, qualifiedPct, rpm, videos])

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p><strong>The TikTok Creator Fund ended in December 2023</strong> (US, UK, France, Germany). This calculator uses its replacement — the <strong>Creator Rewards Program</strong> — which pays roughly $0.40–$1.00 per 1,000 <em>qualified</em> views on original videos longer than 1 minute.</p>
        </div>
        <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b text-[#1F2937]"><Calculator className="h-5 w-5 text-[#064E3B]" /> Creator Rewards Inputs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Total views in the period</label>
            <Input type="number" value={views === 0 ? '' : views} onChange={(e) => setViews(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[Math.min(views, 20000000)]} max={20000000} step={10000} onValueChange={(val: unknown) => setViews(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Videos posted in the period</label>
            <Input type="number" value={videos === 0 ? '' : videos} onChange={(e) => setVideos(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Qualified views share (%)</label><span className="font-mono font-bold">{qualifiedPct}%</span></div>
          <Slider value={[qualifiedPct]} max={100} step={1} onValueChange={(val: unknown) => setQualifiedPct(Array.isArray(val) ? Number(val[0]) : Number(val))} />
          <p className="text-xs text-neutral-500">Only views on eligible videos count: original content over 1 minute, watched on the For You feed, at least 1,000 views on the video, not duets/stitches/photo mode. Most creators see 50–85% of views qualify.</p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Rewards RPM ($ per 1,000 qualified views)</label><span className="font-mono font-bold">${rpm.toFixed(2)}</span></div>
          <Slider value={[rpm]} min={0.4} max={1} step={0.05} onValueChange={(val: unknown) => setRpm(Array.isArray(val) ? Number(val[0]) : Number(val))} />
          <p className="text-xs text-neutral-500">TikTok does not publish a fixed rate. Reported Creator Rewards RPM clusters around $0.40–$1.00 depending on niche, region, watch time and search value.</p>
        </div>
      </div>
      <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
        <div className="bg-[#064E3B] text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Creator Rewards Earnings</h3>
          <div className="text-5xl font-black font-mono">{fmt(r.rewards)}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 font-mono">
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Qualified views</p><p className="text-xl font-bold">{Math.round(r.qualified).toLocaleString()}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Per video</p><p className="text-xl font-bold">{fmt(r.perVideo)}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Old Fund (for contrast)</p><p className="text-xl font-bold">{fmt(r.oldFund)}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Rewards multiple</p><p className="text-xl font-bold">{r.multiple.toFixed(1)}×</p></div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-6 text-sm text-neutral-600">
          <strong className="text-[#1F2937]">Formula:</strong> <span className="font-mono">Earnings = (Total Views × Qualified %) ÷ 1,000 × Rewards RPM</span>. Eligibility also requires 10,000+ followers and 100,000 views in the last 30 days, and an account in good standing in an eligible country.
        </div>
      <ToolActionsBar slug="tiktok-creator-fund-calculator" isPro={isPro} inputs={{ views, qualifiedPct, rpm, videos }} />
    </div>
    </div>
  </>)
}
