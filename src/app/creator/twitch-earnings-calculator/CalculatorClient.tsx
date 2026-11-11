/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmtR = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function NumInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <Input type="number" step="0.01" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="font-mono" />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

// Twitch sub prices (US): Tier 1 $4.99, Tier 2 $9.99, Tier 3 $24.99. Standard split is 50/50;
// Plus Programme partners earn 70/30 on net sub revenue — hence the share slider.
// Bits pay the streamer exactly $0.01 per bit cheered.
const TIER_PRICE = { t1: 4.99, t2: 9.99, t3: 24.99 }

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [t1, setT1] = useState(320)
  const [t2, setT2] = useState(45)
  const [t3, setT3] = useState(12)
  const [sharePct, setSharePct] = useState(50)
  const [bits, setBits] = useState(25000)
  const [ads, setAds] = useState(180)
  const [donations, setDonations] = useState(120)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.t1 !== undefined) setT1(s.t1 as any)
    if (s.t2 !== undefined) setT2(s.t2 as any)
    if (s.t3 !== undefined) setT3(s.t3 as any)
    if (s.sharePct !== undefined) setSharePct(s.sharePct as any)
    if (s.bits !== undefined) setBits(s.bits as any)
    if (s.ads !== undefined) setAds(s.ads as any)
    if (s.donations !== undefined) setDonations(s.donations as any)
  })


  const r = useMemo(() => {
    const grossSubs = t1 * TIER_PRICE.t1 + t2 * TIER_PRICE.t2 + t3 * TIER_PRICE.t3
    const subIncome = grossSubs * (sharePct / 100)
    const bitsIncome = bits * 0.01
    const total = subIncome + bitsIncome + ads + donations
    const subs = t1 + t2 + t3
    return { grossSubs, subIncome, bitsIncome, total, subs, perSub: subs > 0 ? subIncome / subs : 0 }
  }, [t1, t2, t3, sharePct, bits, ads, donations])

  const row = (label: string, detail: string, amount: number) => (
    <div className="flex justify-between text-sm py-1.5 border-b border-dashed last:border-0"><span className="text-muted-foreground">{label} <span className="text-xs">({detail})</span></span><span className="font-mono font-semibold">{fmt(amount)}</span></div>
  )

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <NumInput label="Tier 1 Subs ($4.99)" value={t1} onChange={setT1} />
        <NumInput label="Tier 2 Subs ($9.99)" value={t2} onChange={setT2} />
        <NumInput label="Tier 3 Subs ($24.99)" value={t3} onChange={setT3} />
      </div>
      <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Your Sub Revenue Share</label><span className="font-mono font-bold">{sharePct}%</span></div>
        <Slider value={[sharePct]} min={50} max={70} step={5} onValueChange={(v: any) => setSharePct(Array.isArray(v) ? v[0] : v)} />
        <p className="text-xs text-muted-foreground">50% is the standard Affiliate/Partner split. Plus Programme streamers earn 60–70% once they qualify.</p></div>
      <div className="grid grid-cols-3 gap-4">
        <NumInput label="Bits Cheered / Month" value={bits} onChange={setBits} hint="1 bit = $0.01 to you." />
        <NumInput label="Ad Revenue / Month" value={ads} onChange={setAds} hint="From your Twitch dashboard." />
        <NumInput label="Donations & Sponsorships" value={donations} onChange={setDonations} hint="Tips are 100% yours minus payment fees." />
      </div>
      <p className="text-xs text-muted-foreground">Estimates before income tax. Prime subs count as Tier 1. Regional pricing means some Tier 1 subs pay out less than the US price implies.</p>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Estimated Monthly Earnings">
        <div className="text-4xl font-black font-mono">{fmtR(r.total)}</div>
        <p className="text-white/80 mt-2 text-sm">{fmtR(r.total * 12)}/year · {r.subs.toLocaleString()} total subs</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Sub Income</p><p className="font-mono text-xl font-bold">{fmt(r.subIncome)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Per Sub (blended)</p><p className="font-mono text-xl font-bold">{fmt(r.perSub)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Bits Income</p><p className="font-mono text-xl font-bold">{fmt(r.bitsIncome)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Ads + Donations</p><p className="font-mono text-xl font-bold">{fmt(ads + donations)}</p></div>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Income by Stream</h4>
        {row('Subscriptions', `${r.subs.toLocaleString()} subs, ${sharePct}% of ${fmt(r.grossSubs)} gross`, r.subIncome)}
        {row('Bits', `${bits.toLocaleString()} bits × $0.01`, r.bitsIncome)}
        {row('Ads', 'your dashboard figure', ads)}
        {row('Donations & sponsors', 'paid to you directly', donations)}
        <p className="text-xs text-muted-foreground mt-3">Differentiator: models the real tier mix and your actual revenue share — one Tier 3 sub is worth five Tier 1s gross, and the 50% vs 70% split is the single biggest lever on this page.</p>
      </div>
    </div>
  </div><ToolActionsBar slug="twitch-earnings-calculator" isPro={isPro} inputs={{ t1, t2, t3, sharePct, bits, ads, donations }} /></>)
}
