'use client'
import React, { useState } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { TrendingUp } from "lucide-react"
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
import { useCurrencySymbol } from '@/lib/currency'

const fmt0 = (n: number, sym: string) => sym + Math.round(n).toLocaleString('en-US')

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [customers, setCustomers] = useState(1000)
  const [arpu, setArpu] = useState(49)
  const [churn, setChurn] = useState(6)
  const [reducedChurn, setReducedChurn] = useState(4)
  const [adds, setAdds] = useState(80)
  const [months, setMonths] = useState(12)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.customers !== undefined) setCustomers(s.customers as any)
    if (s.arpu !== undefined) setArpu(s.arpu as any)
    if (s.churn !== undefined) setChurn(s.churn as any)
    if (s.reducedChurn !== undefined) setReducedChurn(s.reducedChurn as any)
    if (s.adds !== undefined) setAdds(s.adds as any)
    if (s.months !== undefined) setMonths(s.months as any)
  })


  const project = (churnPct: number) => {
    let c = customers
    let cumulative = 0
    for (let m = 0; m < months; m++) {
      cumulative += c * arpu
      c = c * (1 - churnPct / 100) + adds
    }
    return { endCustomers: c, endMrr: c * arpu, cumulative }
  }
  const now = project(churn)
  const better = project(reducedChurn)
  const mrrDiff = better.endMrr - now.endMrr
  const cumDiff = better.cumulative - now.cumulative

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Subscription Base</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">Current Subscribers</label><Input type="number" value={customers === 0 ? '' : customers} onChange={(e) => setCustomers(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Average Revenue per User / Month (ARPU)</label><Input type="number" value={arpu === 0 ? '' : arpu} onChange={(e) => setArpu(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">New Subscribers Added / Month</label><Input type="number" value={adds === 0 ? '' : adds} onChange={(e) => setAdds(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Current Monthly Churn</label><span className="font-mono font-bold">{churn}%</span></div>
          <Slider value={[churn]} min={0.5} max={20} step={0.5} onValueChange={(v: any) => setChurn(Array.isArray(v) ? v[0] : v)} />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Target Monthly Churn (after retention work)</label><span className="font-mono font-bold">{reducedChurn}%</span></div>
          <Slider value={[reducedChurn]} min={0.5} max={20} step={0.5} onValueChange={(v: any) => setReducedChurn(Array.isArray(v) ? v[0] : v)} />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Projection Period</label><span className="font-mono font-bold">{months} months</span></div>
          <Slider value={[months]} min={3} max={36} step={1} onValueChange={(v: any) => setMonths(Array.isArray(v) ? v[0] : v)} />
        </div>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">Extra MRR from Cutting Churn to {reducedChurn}%</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{fmt0(mrrDiff, sym)}<span className="text-xl">/mo</span></div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">MRR at {churn}% Churn</p><p className="text-xl font-bold font-mono">{fmt0(now.endMrr, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">MRR at {reducedChurn}% Churn</p><p className="text-xl font-bold font-mono">{fmt0(better.endMrr, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Extra Revenue over {months} Months</p><p className="text-xl font-bold font-mono">{fmt0(cumDiff, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Subscribers Kept</p><p className="text-xl font-bold font-mono">{Math.round(better.endCustomers - now.endCustomers).toLocaleString()}</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10"><TrendingUp className="h-5 w-5 shrink-0" /><span>Churn compounds. A small monthly reduction is worth more every month that passes, because every saved subscriber keeps paying — and keeps being saved again.</span></p>
        </div>
      <ToolActionsBar slug="subscription-churn-impact-simulator" isPro={isPro} inputs={{ customers, arpu, churn, reducedChurn, adds, months }} />
    </div>
    </div>
  </>)
}
