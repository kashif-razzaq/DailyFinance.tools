'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp } from "lucide-react"

const fmt = (n: number) => '$' + Math.round(n).toLocaleString()

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  void isPro
  const [revenue, setRevenue] = useState(12000)
  const [editorCost, setEditorCost] = useState(2500)
  const [otherTeamCost, setOtherTeamCost] = useState(800)
  const [soloOverhead, setSoloOverhead] = useState(400)
  const [agencyOverhead, setAgencyOverhead] = useState(900)
  const [soloHours, setSoloHours] = useState(120)
  const [agencyHours, setAgencyHours] = useState(45)
  const [capacityGain, setCapacityGain] = useState(40)

  const r = useMemo(() => {
    const soloProfit = revenue - soloOverhead
    const agencyProfit = revenue - editorCost - otherTeamCost - agencyOverhead
    const scaledRevenue = revenue * (1 + capacityGain / 100)
    const scaledAgencyProfit = scaledRevenue - editorCost - otherTeamCost - agencyOverhead
    return {
      soloProfit, agencyProfit,
      soloMargin: revenue > 0 ? (soloProfit / revenue) * 100 : 0,
      agencyMargin: revenue > 0 ? (agencyProfit / revenue) * 100 : 0,
      soloHourly: soloHours > 0 ? soloProfit / soloHours : 0,
      agencyHourly: agencyHours > 0 ? agencyProfit / agencyHours : 0,
      hoursFreed: soloHours - agencyHours,
      scaledRevenue, scaledAgencyProfit,
      verdict: agencyHours > 0 && soloHours > 0 && (agencyProfit / agencyHours) > (soloProfit / soloHours),
    }
  }, [revenue, editorCost, otherTeamCost, soloOverhead, agencyOverhead, soloHours, agencyHours, capacityGain])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b text-[#1F2937]"><Calculator className="h-5 w-5 text-[#064E3B]" /> Business Inputs (Monthly)</h2>
        <div className="space-y-3"><label className="text-sm font-semibold">Creator revenue per month ($)</label>
          <Input type="number" value={revenue === 0 ? '' : revenue} onChange={(e) => setRevenue(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
          <Slider value={[Math.min(revenue, 100000)]} max={100000} step={250} onValueChange={(val: unknown) => setRevenue(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Editor cost / month ($)</label>
            <Input type="number" value={editorCost === 0 ? '' : editorCost} onChange={(e) => setEditorCost(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Other team costs / month ($)</label>
            <Input type="number" value={otherTeamCost === 0 ? '' : otherTeamCost} onChange={(e) => setOtherTeamCost(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" />
            <p className="text-xs text-neutral-500">Thumbnail designer, script help, VA, manager commission.</p></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Solo overhead / month ($)</label>
            <Input type="number" value={soloOverhead === 0 ? '' : soloOverhead} onChange={(e) => setSoloOverhead(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Agency-mode overhead / month ($)</label>
            <Input type="number" value={agencyOverhead === 0 ? '' : agencyOverhead} onChange={(e) => setAgencyOverhead(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" />
            <p className="text-xs text-neutral-500">Project tools, storage, review software, extra subscriptions.</p></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Your hours / month — solo</label>
            <Input type="number" value={soloHours === 0 ? '' : soloHours} onChange={(e) => setSoloHours(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Your hours / month — with a team</label>
            <Input type="number" value={agencyHours === 0 ? '' : agencyHours} onChange={(e) => setAgencyHours(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Extra output from freed time (%)</label><span className="font-mono font-bold">+{capacityGain}%</span></div>
          <Slider value={[capacityGain]} max={150} step={5} onValueChange={(val: unknown) => setCapacityGain(Array.isArray(val) ? Number(val[0]) : Number(val))} />
          <p className="text-xs text-neutral-500">If freed hours become more videos, sponsorships or a second channel, how much does revenue grow? This is where hiring usually pays for itself.</p>
        </div>
      </div>
      <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
        <div className="bg-[#064E3B] text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> The Honest Comparison</h3>
          <div className="text-2xl font-black leading-snug">{r.verdict ? 'With a team, you earn more per hour you work' : 'Solo still wins per hour — hire for growth, not margin'}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 font-mono">
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Solo profit</p><p className="text-xl font-bold">{fmt(r.soloProfit)}</p><p className="text-xs text-white/60">{r.soloMargin.toFixed(1)}% margin · ${r.soloHourly.toFixed(0)}/your hr</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Team profit (same output)</p><p className="text-xl font-bold">{fmt(r.agencyProfit)}</p><p className="text-xs text-white/60">{r.agencyMargin.toFixed(1)}% margin · ${r.agencyHourly.toFixed(0)}/your hr</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Hours freed / month</p><p className="text-xl font-bold">{r.hoursFreed}</p></div>
            <div><p className="text-[10px] uppercase font-bold text-white/60 mb-1">Team profit if output grows</p><p className="text-xl font-bold">{fmt(r.scaledAgencyProfit)}</p><p className="text-xs text-white/60">on {fmt(r.scaledRevenue)} revenue</p></div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-6 text-sm text-neutral-600">
          <strong className="text-[#1F2937]">Formula:</strong> <span className="font-mono">Solo Profit = Revenue − Solo Overhead · Team Profit = Revenue − Editor − Team − Agency Overhead · Compare profit ÷ YOUR hours, not margin % alone</span>. Hiring almost always lowers margin % — the question is whether it raises profit per hour of your own time and total capacity.
        </div>
      </div>
    </div>
  )
}
