'use client'
import React, { useState } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
import { useCurrencySymbol } from '@/lib/currency'

const fmt = (n: number, sym: string) => sym + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmt0 = (n: number, sym: string) => sym + Math.round(n).toLocaleString('en-US')

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [aov, setAov] = useState(70)
  const [freq, setFreq] = useState(3)
  const [lifespan, setLifespan] = useState(3)
  const [margin, setMargin] = useState(60)
  const [cac, setCac] = useState(45)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.aov !== undefined) setAov(s.aov as any)
    if (s.freq !== undefined) setFreq(s.freq as any)
    if (s.lifespan !== undefined) setLifespan(s.lifespan as any)
    if (s.margin !== undefined) setMargin(s.margin as any)
    if (s.cac !== undefined) setCac(s.cac as any)
  })


  const revenueLtv = aov * freq * lifespan
  const ltv = revenueLtv * (margin / 100)
  const ratio = cac > 0 ? ltv / cac : 0
  const monthlyProfitPerCustomer = (aov * freq * (margin / 100)) / 12
  const paybackMonths = monthlyProfitPerCustomer > 0 ? cac / monthlyProfitPerCustomer : 0
  const band = ratio < 1 ? 'Losing money' : ratio < 3 ? 'Fragile' : ratio <= 5 ? 'Healthy' : 'Possibly underspending'

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Customer Value & Acquisition Cost</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">Average Order Value (AOV)</label><Input type="number" value={aov === 0 ? '' : aov} onChange={(e) => setAov(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Orders per Customer per Year</label><Input type="number" step="0.1" value={freq === 0 ? '' : freq} onChange={(e) => setFreq(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Customer Lifespan (years)</label><Input type="number" step="0.1" value={lifespan === 0 ? '' : lifespan} onChange={(e) => setLifespan(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Customer Acquisition Cost (CAC)</label><Input type="number" value={cac === 0 ? '' : cac} onChange={(e) => setCac(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Gross Margin</label><span className="font-mono font-bold">{margin}%</span></div>
          <Slider value={[margin]} min={5} max={95} step={1} onValueChange={(v: any) => setMargin(Array.isArray(v) ? v[0] : v)} />
          <p className="text-xs text-muted-foreground">LTV must be calculated on gross profit, not revenue. A revenue-based LTV overstates what a customer is worth by the size of your margin.</p>
        </div>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">LTV : CAC Ratio</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{ratio.toFixed(2)} : 1</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Gross-Profit LTV</p><p className="text-xl font-bold font-mono">{fmt0(ltv, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Revenue LTV (for reference)</p><p className="text-xl font-bold font-mono">{fmt0(revenueLtv, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">CAC Payback Period</p><p className="text-xl font-bold font-mono">{paybackMonths.toFixed(1)} months</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Verdict</p><p className="text-xl font-bold">{band}</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10">
            {ratio >= 3 ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
            <span>{ratio < 1 ? 'You pay more to acquire a customer than they will ever return in gross profit. Stop scaling paid acquisition until retention or margin improves.' : ratio < 3 ? 'The model works but has no slack. A CAC rise or a churn rise breaks it — fix retention before increasing spend.' : ratio <= 5 ? 'The healthy zone: each customer returns 3–5x their acquisition cost in gross profit. Scale carefully and watch payback time.' : 'A very high ratio can mean you are underspending on growth. Test higher CAC channels — you have room to buy market share.'}</span>
          </p>
        </div>
      </div>
    </div>
  <ToolActionsBar slug="ltv-to-cac-ratio-calculator" isPro={isPro} inputs={{ aov, freq, lifespan, margin, cac }} /></>)
}
