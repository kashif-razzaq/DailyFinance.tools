'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp } from "lucide-react"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString()
const NICHE_RPM: Record<string, number> = {
  'Finance & Investing': 15, 'Business & Marketing': 12, 'Technology & Software': 8,
  'Education & How-To': 7, 'Health & Fitness': 6, 'Travel': 5, 'Gaming': 3,
  'Vlogging & Lifestyle': 3, 'Entertainment & Comedy': 2.5, 'Music': 1.5,
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  void isPro
  const [views, setViews] = useState(250000)
  const [niche, setNiche] = useState('Finance & Investing')
  const [rpm, setRpm] = useState(15)
  const [format, setFormat] = useState<'long' | 'shorts'>('long')
  const [videosPerMonth, setVideosPerMonth] = useState(12)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.views !== undefined) setViews(s.views as any)
    if (s.niche !== undefined) setNiche(s.niche as any)
    if (s.rpm !== undefined) setRpm(s.rpm as any)
    if (s.format !== undefined) setFormat(s.format as any)
    if (s.videosPerMonth !== undefined) setVideosPerMonth(s.videosPerMonth as any)
  })


  const effectiveRpm = format === 'shorts' ? Math.min(rpm, 0.12) : rpm
  const r = useMemo(() => {
    const monthly = (views / 1000) * effectiveRpm
    return { monthly, yearly: monthly * 12, daily: monthly / 30, perVideo: videosPerMonth > 0 ? monthly / videosPerMonth : 0, perThousand: effectiveRpm }
  }, [views, effectiveRpm, videosPerMonth])

  const pickNiche = (n: string) => { setNiche(n); if (format === 'long') setRpm(NICHE_RPM[n]) }

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b text-[#1F2937]"><Calculator className="h-5 w-5 text-[#064E3B]" /> Channel Inputs</h2>
        <div className="space-y-3">
          <label className="text-sm font-semibold">Content format</label>
          <div className="flex gap-2">
            <button onClick={() => setFormat('long')} className={`px-4 py-2 rounded-xl text-sm font-semibold border ${format === 'long' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-white border-neutral-200'}`}>Long-form (55% share)</button>
            <button onClick={() => setFormat('shorts')} className={`px-4 py-2 rounded-xl text-sm font-semibold border ${format === 'shorts' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-white border-neutral-200'}`}>Shorts (45% pool)</button>
          </div>
          <p className="text-xs text-neutral-500">{format === 'shorts' ? 'Shorts RPM is typically $0.03–$0.12 per 1,000 views — the RPM field is capped at $0.12 in Shorts mode.' : 'Long-form RPM is what you keep per 1,000 views after YouTube\u2019s 45% share.'}</p>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold">Niche (sets a realistic default RPM)</label>
          <select value={niche} onChange={(e) => pickNiche(e.target.value)} className="w-full h-10 rounded-lg border border-neutral-300 px-3 text-sm bg-white">
            {Object.keys(NICHE_RPM).map(n => <option key={n} value={n}>{n} — long-form RPM ≈ ${NICHE_RPM[n]}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold">Monthly views</label>
            <Input type="number" value={views === 0 ? '' : views} onChange={(e) => setViews(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[Math.min(views, 5000000)]} max={5000000} step={5000} onValueChange={(val: unknown) => setViews(Array.isArray(val) ? Number(val[0]) : Number(val))} />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold">Your RPM ($ per 1,000 views)</label>
            <Input type="number" step="0.01" value={rpm === 0 ? '' : rpm} onChange={(e) => setRpm(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[Math.min(rpm, 40)]} max={40} step={0.1} onValueChange={(val: unknown) => setRpm(Array.isArray(val) ? Number(val[0]) : Number(val))} />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold">Videos published per month</label>
          <Input type="number" value={videosPerMonth === 0 ? '' : videosPerMonth} onChange={(e) => setVideosPerMonth(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
        </div>
      </div>
      <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
        <div className="bg-[#064E3B] text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Estimated Monthly Earnings</h3>
          <div className="text-5xl font-black font-mono">{fmt(r.monthly)}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 font-mono">
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Per year</p><p className="text-xl font-bold">{fmt(r.yearly)}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Per day</p><p className="text-xl font-bold">{fmt(r.daily)}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Per video</p><p className="text-xl font-bold">{fmt(r.perVideo)}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Effective RPM</p><p className="text-xl font-bold">${effectiveRpm.toFixed(2)}</p></div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-6 text-sm text-neutral-600">
          <strong className="text-[#1F2937]">Formula:</strong> <span className="font-mono">Earnings = (Views ÷ 1,000) × RPM</span>. RPM already includes YouTube&apos;s cut — never multiply raw CPM by views without applying the 55% long-form (or 45% Shorts pool) creator share first.
        </div>
      </div>
    </div>
  <ToolActionsBar slug="youtube-adsense-estimator" isPro={isPro} inputs={{ views, niche, rpm, format, videosPerMonth }} /></>)
}
