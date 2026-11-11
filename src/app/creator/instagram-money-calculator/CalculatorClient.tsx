/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function NumInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="font-mono" />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

// Estimated sponsored-post rate per 1,000 followers, by niche (US/UK brand deals, mid-range).
// Advertisers pay for buyers, not followers: finance/business audiences monetise far above entertainment.
const NICHES: { name: string; per1k: number }[] = [
  { name: 'Finance & Investing', per1k: 38 }, { name: 'Business & Marketing', per1k: 32 },
  { name: 'Beauty', per1k: 26 }, { name: 'Fitness & Health', per1k: 24 }, { name: 'Tech & Gadgets', per1k: 24 },
  { name: 'Fashion', per1k: 20 }, { name: 'Travel', per1k: 21 }, { name: 'Food', per1k: 19 },
  { name: 'Gaming', per1k: 10 }, { name: 'Comedy & Entertainment', per1k: 12 },
]
// Content format multipliers vs a feed post
const FORMAT = { post: 1, reel: 1.15, story: 0.35 }

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [followers, setFollowers] = useState(85000)
  const [engagement, setEngagement] = useState(3.2)
  const [nicheIdx, setNicheIdx] = useState(2)
  const [posts, setPosts] = useState(4)
  const [reels, setReels] = useState(6)
  const [stories, setStories] = useState(10)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.followers !== undefined) setFollowers(s.followers as any)
    if (s.engagement !== undefined) setEngagement(s.engagement as any)
    if (s.nicheIdx !== undefined) setNicheIdx(s.nicheIdx as any)
    if (s.posts !== undefined) setPosts(s.posts as any)
    if (s.reels !== undefined) setReels(s.reels as any)
    if (s.stories !== undefined) setStories(s.stories as any)
  })


  const r = useMemo(() => {
    const niche = NICHES[nicheIdx]
    // Engagement factor: brands discount low-engagement accounts and pay a premium over ~3%.
    const factor = Math.min(2, Math.max(0.4, engagement / 3))
    const perPost = (followers / 1000) * niche.per1k * factor
    const perReel = perPost * FORMAT.reel
    const perStory = perPost * FORMAT.story
    const monthly = perPost * posts + perReel * reels + perStory * stories
    // Ranges: negotiations typically land 70%–140% of the midpoint depending on exclusivity, usage rights and term.
    return { perPost, perReel, perStory, monthly, low: monthly * 0.7, high: monthly * 1.4, factor, per1kEff: niche.per1k * factor }
  }, [followers, engagement, nicheIdx, posts, reels, stories])

  const monthRow = (label: string, count: number, rate: number) => (
    <div className="flex justify-between text-sm py-1.5 border-b border-dashed last:border-0"><span className="text-muted-foreground">{label} × {count}/mo</span><span className="font-mono font-semibold">{fmt(rate)} each · {fmt(rate * count)}</span></div>
  )

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <NumInput label="Followers" value={followers} onChange={setFollowers} />
        <div className="space-y-2"><label className="text-sm font-semibold">Niche</label>
          <select value={nicheIdx} onChange={(e) => setNicheIdx(Number(e.target.value))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
            {NICHES.map((n, i) => <option key={n.name} value={i}>{n.name} (${n.per1k}/1k followers)</option>)}
          </select></div>
      </div>
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Average Engagement Rate</label><span className="font-mono font-bold">{engagement}%</span></div>
        <Slider value={[engagement]} min={0.2} max={12} step={0.1} onValueChange={(v: any) => setEngagement(Array.isArray(v) ? v[0] : v)} />
        <p className="text-xs text-muted-foreground">(Likes + comments) ÷ followers. Under 1% is heavily discounted by brands; above 5% commands a premium.</p></div>
      <div className="grid grid-cols-3 gap-4">
        <NumInput label="Sponsored Posts / mo" value={posts} onChange={setPosts} />
        <NumInput label="Sponsored Reels / mo" value={reels} onChange={setReels} />
        <NumInput label="Story Sets / mo" value={stories} onChange={setStories} />
      </div>
      <p className="text-xs text-muted-foreground">Estimates based on commonly reported US/UK brand-deal rates. Actual deals vary with audience country, exclusivity, usage rights and contract length.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Estimated Monthly Sponsorship Income">
        <div className="text-4xl font-black font-mono">{fmt(r.low)} – {fmt(r.high)}</div>
        <p className="text-white/80 mt-2 text-sm">midpoint {fmt(r.monthly)}/month · {fmt(r.monthly * 12)}/year at the midpoint</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Per Sponsored Post</p><p className="font-mono text-xl font-bold">{fmt(r.perPost)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Per Reel</p><p className="font-mono text-xl font-bold">{fmt(r.perReel)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Per Story Set</p><p className="font-mono text-xl font-bold">{fmt(r.perStory)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Your Rate / 1k Followers</p><p className="font-mono text-xl font-bold">${r.per1kEff.toFixed(0)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Monthly Mix</h4>
        {monthRow('Feed posts', posts, r.perPost)}
        {monthRow('Reels', reels, r.perReel)}
        {monthRow('Story sets', stories, r.perStory)}
        <p className="text-xs text-muted-foreground mt-3">Differentiator: earnings are priced per format and per niche — a finance account at 85k followers can out-earn an entertainment account three times its size, because brands pay for purchasing power, not headcount.</p>
      </div>
    <ToolActionsBar slug="instagram-money-calculator" isPro={isPro} inputs={{ followers, engagement, nicheIdx, posts, reels, stories }} />
    </div>
  </div></>)
}
