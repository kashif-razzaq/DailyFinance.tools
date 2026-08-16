/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useBRRRRStore } from '@/store/brrrr-strategy.store'
import { Input } from "@/components/ui/input"
import { Home, Hammer, Building, DollarSign } from "lucide-react"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useBRRRRStore()
  const metrics = store.getDerivedMetrics()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'

  const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const s = data.input_state
          if (s.purchasePrice) store.setPurchasePrice(s.purchasePrice)
          if (s.rehabCost) store.setRehabCost(s.rehabCost)
          if (s.arv) store.setArv(s.arv)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    setIsSaving(true)
    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'brrrr-strategy-analyzer',
        category: 'Real Estate',
        saved_name: `BRRRR: Capital Left ${currencySymbol}${Math.round(metrics.capitalLeftInDeal)}`,
        input_state: { purchasePrice: store.purchasePrice, downPaymentPercent: store.downPaymentPercent, rehabCost: store.rehabCost, arv: store.arv, refinanceLtvPercent: store.refinanceLtvPercent, monthlyRent: store.monthlyRent },
        core_metric: Math.round(metrics.capitalLeftInDeal)
      })
      if (savedResult?.id) setSavedScenarioId(savedResult.id)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const exportData = [{
    "Purchase Price": `${currencySymbol}${store.purchasePrice}`,
    "Rehab Cost": `${currencySymbol}${store.rehabCost}`,
    "ARV": `${currencySymbol}${store.arv}`,
    "Capital Left In Deal": `${currencySymbol}${Math.round(metrics.capitalLeftInDeal)}`
  }]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 flex flex-col space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b"><Hammer className="h-5 w-5 text-muted-foreground" /> Buy & Rehab</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-semibold">Purchase Price</label>
              <Input type="number" value={store.purchasePrice || ''} onChange={(e) => store.setPurchasePrice(Number(e.target.value))} className="bg-muted/50"/>
            </div>
            <div className="space-y-2"><label className="text-sm font-semibold">Down Payment (%)</label>
              <Input type="number" value={store.downPaymentPercent || ''} onChange={(e) => store.setDownPaymentPercent(Number(e.target.value))} className="bg-muted/50"/>
            </div>
            <div className="space-y-2"><label className="text-sm font-semibold">Rehab Cost</label>
              <Input type="number" value={store.rehabCost || ''} onChange={(e) => store.setRehabCost(Number(e.target.value))} className="bg-muted/50"/>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b"><Building className="h-5 w-5 text-muted-foreground" /> Refinance & Rent</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-semibold">ARV (After Repair Val)</label>
              <Input type="number" value={store.arv || ''} onChange={(e) => store.setArv(Number(e.target.value))} className="bg-muted/50"/>
            </div>
            <div className="space-y-2"><label className="text-sm font-semibold">Refi LTV (%)</label>
              <Input type="number" value={store.refinanceLtvPercent || ''} onChange={(e) => store.setRefinanceLtvPercent(Number(e.target.value))} className="bg-muted/50"/>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 z-20">
        <div className="bg-[#4338ca] text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">Capital Left In Deal</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black">{currencySymbol}{Math.round(metrics.capitalLeftInDeal).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
            <div><p className="text-[10px] text-white/70 uppercase font-bold mb-1">Initial Cash Invested</p><p className="text-xl font-bold">{currencySymbol}{Math.round(metrics.initialCashInvested).toLocaleString()}</p></div>
            <div><p className="text-[10px] text-white/70 uppercase font-bold mb-1">Cash Pulled Out</p><p className="text-xl font-bold text-emerald-400">+{currencySymbol}{Math.round(metrics.cashPulledOut).toLocaleString()}</p></div>
          </div>
        </div>
        <CalculatorActions slug="brrrr-strategy-analyzer" onSave={handleSave} isSaving={isSaving} isPro={isPro} exportData={exportData} exportFilename="BRRRR_Analysis" onRequirePro={() => setShowProModal(true)} shareUrl={""} />
      </div>
      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
