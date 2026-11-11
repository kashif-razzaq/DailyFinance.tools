'use client'
import React, { useState } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
import { useCurrencySymbol } from '@/lib/currency'

const fmt = (n: number, sym: string) => sym + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmt0 = (n: number, sym: string) => sym + Math.round(n).toLocaleString('en-US')

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [adSpend, setAdSpend] = useState(5000)
  const [otherSpend, setOtherSpend] = useState(1500)
  const [newCustomers, setNewCustomers] = useState(400)
  const [paidCustomers, setPaidCustomers] = useState(250)
  const [aov, setAov] = useState(65)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.adSpend !== undefined) setAdSpend(s.adSpend as any)
    if (s.otherSpend !== undefined) setOtherSpend(s.otherSpend as any)
    if (s.newCustomers !== undefined) setNewCustomers(s.newCustomers as any)
    if (s.paidCustomers !== undefined) setPaidCustomers(s.paidCustomers as any)
    if (s.aov !== undefined) setAov(s.aov as any)
  })


  const totalSpend = adSpend + otherSpend
  const blendedCac = newCustomers > 0 ? totalSpend / newCustomers : 0
  const paidCac = paidCustomers > 0 ? adSpend / paidCustomers : 0
  const organicCustomers = Math.max(0, newCustomers - paidCustomers)
  const cacToAov = aov > 0 ? blendedCac / aov : 0

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Spend & New Customers (one period)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">Paid Ad Spend</label><Input type="number" value={adSpend === 0 ? '' : adSpend} onChange={(e) => setAdSpend(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Other Acquisition Spend (content, tools, team)</label><Input type="number" value={otherSpend === 0 ? '' : otherSpend} onChange={(e) => setOtherSpend(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Total New Customers</label><Input type="number" value={newCustomers === 0 ? '' : newCustomers} onChange={(e) => setNewCustomers(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">New Customers from Paid Ads</label><Input type="number" value={paidCustomers === 0 ? '' : paidCustomers} onChange={(e) => setPaidCustomers(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Average First Order Value (AOV)</label><Input type="number" value={aov === 0 ? '' : aov} onChange={(e) => setAov(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <p className="text-xs text-muted-foreground">Use the same period (e.g. one month) for every input. Blended CAC includes every acquisition cost; Paid CAC isolates your ad channels.</p>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">Blended CAC</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{fmt(blendedCac, sym)}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Paid CAC</p><p className="text-xl font-bold font-mono">{fmt(paidCac, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Total Spend</p><p className="text-xl font-bold font-mono">{fmt0(totalSpend, sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Non-Paid Customers</p><p className="text-xl font-bold font-mono">{organicCustomers.toLocaleString()}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">CAC as % of First Order</p><p className="text-xl font-bold font-mono">{(cacToAov * 100).toFixed(0)}%</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10">
            {blendedCac < aov ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
            <span>{blendedCac >= aov ? 'Your CAC is at or above the first order value. You only profit if repeat purchases reliably arrive — check your LTV:CAC ratio before scaling spend.' : 'CAC sits below first order value. Whether that is good depends on margin: compare CAC with gross profit per order, not revenue, before scaling.'}</span>
          </p>
        </div>
      <ToolActionsBar slug="customer-acquisition-cost-calculator" isPro={isPro} inputs={{ adSpend, otherSpend, newCustomers, paidCustomers, aov }} />
    </div>
    </div>
  </>)
}
