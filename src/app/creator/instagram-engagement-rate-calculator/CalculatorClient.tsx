/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function NumInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="font-mono" />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

// Typical average engagement rates by account size (likes+comments basis, widely reported industry benchmarks).
// Engagement falls as accounts grow — a fair grade must compare you with your own tier.
const TIERS = [
  { name: 'Nano (1k–10k)', max: 10000, avg: 4.8 },
  { name: 'Micro (10k–100k)', max: 100000, avg: 3.5 },
  { name: 'Mid (100k–500k)', max: 500000, avg: 2.4 },
  { name: 'Macro (500k–1M)', max: 1000000, avg: 1.9 },
  { name: 'Mega (1M+)', max: Infinity, avg: 1.5 },
]
function grade(er: number, avg: number) {
  const ratio = avg > 0 ? er / avg : 0
  if (ratio >= 1.5) return { label: 'Exceptional', note: 'Top-decile for your tier — brands will pay a premium for this audience.', color: '#064E3B' }
  if (ratio >= 1.1) return { label: 'Above average', note: 'Beating your tier benchmark. Quote rates with confidence.', color: '#064E3B' }
  if (ratio >= 0.8) return { label: 'Average', note: 'In line with your tier. Saves and shares are the fastest lever from here.', color: '#D97706' }
  if (ratio >= 0.45) return { label: 'Below average', note: 'Underperforming your tier — check posting consistency, hooks and audience fit.', color: '#D97706' }
  return { label: 'Low', note: 'Well below tier average. Often a sign of inactive/bought followers or content drift.', color: '#DC2626' }
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [followers, setFollowers] = useState(42000)
  const [likes, setLikes] = useState(1150)
  const [comments, setComments] = useState(86)
  const [shares, setShares] = useState(140)
  const [saves, setSaves] = useState(210)
  const [reach, setReach] = useState(18000)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.followers !== undefined) setFollowers(s.followers as any)
    if (s.likes !== undefined) setLikes(s.likes as any)
    if (s.comments !== undefined) setComments(s.comments as any)
    if (s.shares !== undefined) setShares(s.shares as any)
    if (s.saves !== undefined) setSaves(s.saves as any)
    if (s.reach !== undefined) setReach(s.reach as any)
  })


  const r = useMemo(() => {
    // Engagement rate = total interactions ÷ followers × 100 (per post, using your averages)
    const core = likes + comments // classic ER (likes + comments)
    const full = likes + comments + shares + saves // full ER incl. high-intent actions
    const erCore = followers > 0 ? (core / followers) * 100 : 0
    const erFull = followers > 0 ? (full / followers) * 100 : 0
    const erReach = reach > 0 ? (full / reach) * 100 : 0
    const tier = TIERS.find((t) => followers <= t.max) || TIERS[TIERS.length - 1]
    return { core, full, erCore, erFull, erReach, tier, g: grade(erFull, tier.avg) }
  }, [followers, likes, comments, shares, saves, reach])

  const chart = [
    { name: 'Your full ER', value: Number(r.erFull.toFixed(2)), color: '#064E3B' },
    { name: `${r.tier.name} average`, value: r.tier.avg, color: '#9CA3AF' },
    { name: 'Your likes+comments ER', value: Number(r.erCore.toFixed(2)), color: '#D97706' },
  ]

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <NumInput label="Followers" value={followers} onChange={setFollowers} />
      <div className="grid grid-cols-2 gap-6">
        <NumInput label="Average Likes per Post" value={likes} onChange={setLikes} />
        <NumInput label="Average Comments per Post" value={comments} onChange={setComments} />
        <NumInput label="Average Shares per Post" value={shares} onChange={setShares} hint="Shares and saves signal high intent — brands increasingly ask for them." />
        <NumInput label="Average Saves per Post" value={saves} onChange={setSaves} />
      </div>
      <NumInput label="Average Reach per Post (optional)" value={reach} onChange={setReach} hint="From Instagram Insights. ER by reach is usually much higher — it excludes followers who never saw the post." />
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Engagement Rate (Full)">
        <div className="text-4xl font-black font-mono">{r.erFull.toFixed(2)}%</div>
        <p className="text-white/80 mt-2 text-sm">{r.full.toLocaleString()} interactions per post · likes+comments only: {r.erCore.toFixed(2)}%</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Your Tier</p><p className="font-mono text-lg font-bold">{r.tier.name}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Tier Average</p><p className="font-mono text-xl font-bold">{r.tier.avg}%</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">ER by Reach</p><p className="font-mono text-xl font-bold">{r.erReach > 0 ? r.erReach.toFixed(2) + '%' : '—'}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Grade</p><p className="font-mono text-xl font-bold">{r.g.label}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">You vs Your Tier</h4>
        <ResponsiveContainer width="100%" height={170}><BarChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={55} /><YAxis tickFormatter={(v: number) => v + '%'} /><Tooltip formatter={(v: any) => Number(v).toFixed(2) + '%'} />
          <Bar dataKey="value" name="Engagement rate">{chart.map((c) => <Cell key={c.name} fill={c.color} />)}</Bar></BarChart></ResponsiveContainer>
        <p className="text-sm mt-3"><span className="font-bold" style={{ color: r.g.color }}>{r.g.label}.</span> <span className="text-muted-foreground">{r.g.note}</span></p>
        <p className="text-xs text-muted-foreground mt-2">Differentiator: you are graded against your own follower tier — a 2% ER is weak for a nano account but strong for a mega account, and honest tools should say so.</p>
      </div>
    </div>
  </div><ToolActionsBar slug="instagram-engagement-rate-calculator" isPro={isPro} inputs={{ followers, likes, comments, shares, saves, reach }} /></>)
}
