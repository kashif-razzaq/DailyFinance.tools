/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const fmtC = (n: number) => curSym() + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function NumInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <Input type="number" step="0.01" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="font-mono" />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

// Typical advertiser CPM ranges by niche (US-heavy audiences). Creators receive 55% of ad revenue,
// so RPM ≈ CPM x 0.55 before accounting for non-monetised views, Premium and memberships.
const NICHES: { name: string; cpm: number }[] = [
  { name: 'Finance & Investing', cpm: 42 }, { name: 'Business & SaaS', cpm: 36 }, { name: 'Tech Reviews', cpm: 26 },
  { name: 'Education', cpm: 20 }, { name: 'Health & Fitness', cpm: 18 }, { name: 'Gaming', cpm: 11 },
  { name: 'Entertainment', cpm: 9 }, { name: 'Vlogs & Lifestyle', cpm: 8 }, { name: 'Music', cpm: 7 },
]

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [mode, setMode] = useState<'cpm' | 'rpm'>('cpm')
  const [rate, setRate] = useState(25)
  const [viewsPerDay, setViewsPerDay] = useState(8500)
  const [nicheIdx, setNicheIdx] = useState(2)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.mode !== undefined) setMode(s.mode as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.viewsPerDay !== undefined) setViewsPerDay(s.viewsPerDay as any)
    if (s.nicheIdx !== undefined) setNicheIdx(s.nicheIdx as any)
  })


  const r = useMemo(() => {
    // CPM mode: advertiser pays CPM per 1,000 monetised views; creator share is 55% → RPM = CPM x 0.55 (approx).
    // RPM mode: revenue = views/1000 x RPM directly; implied CPM = RPM / 0.55.
    const rpm = mode === 'cpm' ? rate * 0.55 : rate
    const cpm = mode === 'cpm' ? rate : rate / 0.55
    const daily = (viewsPerDay / 1000) * rpm
    return { rpm, cpm, daily, monthly: daily * 30, yearly: daily * 365, perVideo10k: rpm * 10 }
  }, [mode, rate, viewsPerDay])

  const nicheChart = NICHES.map((n) => ({ name: n.name, cpm: n.cpm, active: NICHES[nicheIdx].name === n.name }))

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="space-y-2"><label className="text-sm font-semibold">I Know My</label>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => { setMode('cpm'); setRate(25) }} className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${mode === 'cpm' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>CPM (advertiser rate)</button>
          <button onClick={() => { setMode('rpm'); setRate(8) }} className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${mode === 'rpm' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>RPM (my actual rate)</button>
        </div></div>
      <NumInput label={mode === 'cpm' ? 'CPM ($ per 1,000 ad views)' : 'RPM ($ per 1,000 total views)'} value={rate} onChange={setRate} hint={mode === 'cpm' ? 'CPM is what advertisers pay; you keep 55%.' : 'RPM is in YouTube Studio — it already includes your 55% share and all views.'} />
      <div className="space-y-2"><label className="text-sm font-semibold">Or Pick a Niche Preset</label>
        <div className="flex flex-wrap gap-2">
          {NICHES.map((n, i) => (<button key={n.name} onClick={() => { setNicheIdx(i); setMode('cpm'); setRate(n.cpm) }} className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${nicheIdx === i && mode === 'cpm' && rate === n.cpm ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background hover:border-[#064E3B]'}`}>{n.name} · ${n.cpm}</button>))}
        </div></div>
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Views per Day</label><span className="font-mono font-bold">{viewsPerDay.toLocaleString()}</span></div>
        <Slider value={[viewsPerDay]} min={100} max={500000} step={100} onValueChange={(v: any) => setViewsPerDay(Array.isArray(v) ? v[0] : v)} /></div>
      <p className="text-xs text-muted-foreground">CPM varies heavily with audience country, season (Q4 pays most) and video length. RPM is the honest number — use it when you have it.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Estimated Ad Revenue">
        <div className="text-4xl font-black font-mono">{fmt(r.monthly)}<span className="text-lg font-bold">/mo</span></div>
        <p className="text-white/80 mt-2 text-sm">{fmt(r.daily)}/day · {fmt(r.yearly)}/year at {viewsPerDay.toLocaleString()} views/day</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Your RPM</p><p className="font-mono text-xl font-bold">{fmtC(r.rpm)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Implied CPM</p><p className="font-mono text-xl font-bold">{fmtC(r.cpm)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Per 10k Views</p><p className="font-mono text-xl font-bold">{fmt(r.perVideo10k)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Creator Share</p><p className="font-mono text-xl font-bold">55%</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">CPM by Niche (Advertiser Rate)</h4>
        <ResponsiveContainer width="100%" height={230}><BarChart data={nicheChart} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" tickFormatter={(v: number) => sym + v} /><YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} /><Tooltip formatter={(v: any) => sym + Number(v) + ' CPM'} />
          <Bar dataKey="cpm" name="CPM">{nicheChart.map((n) => <Cell key={n.name} fill={n.active ? '#064E3B' : '#9CA3AF'} />)}</Bar></BarChart></ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2">Differentiator: converts CPM ↔ RPM properly through the 55% revenue share instead of treating them as the same number — the mistake most CPM calculators make.</p>
      </div>
    <ToolActionsBar slug="youtube-cpm-calculator" isPro={isPro} inputs={{ mode, rate, viewsPerDay, nicheIdx }} />
    </div>
  </div></>)
}
