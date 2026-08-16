/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useHouseHackingStore } from '@/store/house-hacking-roi.store'
import { Input } from "@/components/ui/input"
import { Home, DollarSign, Percent, TrendingUp, Key, Activity, CheckCircle2 } from "lucide-react"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useHouseHackingStore()
  const metrics = store.getDerivedMetrics()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'

  const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.purchasePrice !== undefined) store.setPurchasePrice(state.purchasePrice as number)
          if (state.downPaymentPercent !== undefined) store.setDownPaymentPercent(state.downPaymentPercent as number)
          if (state.rentalIncomeMonthly !== undefined) store.setRentalIncomeMonthly(state.rentalIncomeMonthly as number)
          if (state.currentRent !== undefined) store.setCurrentRent(state.currentRent as number)
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
        calculator_slug: 'house-hacking-roi-calculator',
        category: 'Real Estate',
        saved_name: `House Hack: ${currencySymbol}${Math.round(metrics.effectiveMonthlyCost)}/mo`,
        input_state: { purchasePrice: store.purchasePrice, downPaymentPercent: store.downPaymentPercent, rentalIncomeMonthly: store.rentalIncomeMonthly, currentRent: store.currentRent },
        core_metric: Math.round(metrics.effectiveMonthlyCost)
      })
      if (savedResult?.id) setSavedScenarioId(savedResult.id)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error) {
      console.error(error)
      alert("Failed to save.")
    } finally {
      setIsSaving(false)
    }
  }

  const exportData = [{
    "Purchase Price": `${currencySymbol}${store.purchasePrice}`,
    "Down Payment": `${currencySymbol}${Math.round(metrics.downPaymentAmount)}`,
    "Total PITI": `${currencySymbol}${Math.round(metrics.totalMonthlyPITI)}`,
    "Gross Rent": `${currencySymbol}${store.rentalIncomeMonthly}`,
    "Effective Cost": `${currencySymbol}${Math.round(metrics.effectiveMonthlyCost)}`,
    "Monthly Savings": `${currencySymbol}${Math.round(metrics.monthlySavingsVsRenting)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId ? `${baseUrl}/real-estate/house-hacking-roi-calculator?savedId=${savedScenarioId}` : `${baseUrl}/real-estate/house-hacking-roi-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b"><Home className="h-5 w-5 text-muted-foreground" /> Property & Loan</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-semibold">Purchase Price</label>
              <Input type="number" value={store.purchasePrice || ''} onChange={(e) => store.setPurchasePrice(Number(e.target.value))} className="font-medium bg-muted/50"/>
            </div>
            <div className="space-y-2"><label className="text-sm font-semibold">Down Payment (%)</label>
              <Input type="number" value={store.downPaymentPercent || ''} onChange={(e) => store.setDownPaymentPercent(Number(e.target.value))} className="font-medium bg-muted/50"/>
            </div>
            <div className="space-y-2"><label className="text-sm font-semibold">Interest Rate (%)</label>
              <Input type="number" value={store.interestRate || ''} onChange={(e) => store.setInterestRate(Number(e.target.value))} className="font-medium bg-muted/50"/>
            </div>
            <div className="space-y-2"><label className="text-sm font-semibold">Annual Prop Tax</label>
              <Input type="number" value={store.propertyTaxesAnnual || ''} onChange={(e) => store.setPropertyTaxesAnnual(Number(e.target.value))} className="font-medium bg-muted/50"/>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b"><DollarSign className="h-5 w-5 text-muted-foreground" /> Income & Comparison</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-semibold text-emerald-600">Tenant Rent Income</label>
              <Input type="number" value={store.rentalIncomeMonthly || ''} onChange={(e) => store.setRentalIncomeMonthly(Number(e.target.value))} className="font-medium bg-emerald-50 dark:bg-emerald-900/20"/>
            </div>
            <div className="space-y-2"><label className="text-sm font-semibold text-rose-600">Your Current Rent</label>
              <Input type="number" value={store.currentRent || ''} onChange={(e) => store.setCurrentRent(Number(e.target.value))} className="font-medium bg-rose-50 dark:bg-rose-900/20"/>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20">
        <div className="bg-[#0f172a] text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">Effective Monthly Cost</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black">{currencySymbol}{Math.round(metrics.effectiveMonthlyCost).toLocaleString()}</span><span className="text-xl">/mo</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
            <div><p className="text-[10px] text-white/70 uppercase font-bold mb-1">Total PITI</p><p className="text-xl font-bold text-rose-400">{currencySymbol}{Math.round(metrics.totalMonthlyPITI).toLocaleString()}</p></div>
            <div><p className="text-[10px] text-white/70 uppercase font-bold mb-1">Rent Offset</p><p className="text-xl font-bold text-emerald-400">-{currencySymbol}{Math.round(store.rentalIncomeMonthly).toLocaleString()}</p></div>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-4">Financial Arbitrage</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Current Rent</span><span className="font-medium text-rose-500">{currencySymbol}{store.currentRent}</span></div>
            <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">New Housing Cost</span><span className="font-medium text-emerald-500">{currencySymbol}{Math.round(metrics.effectiveMonthlyCost)}</span></div>
            <div className="flex justify-between py-2 font-bold text-emerald-600 dark:text-emerald-400"><span>Monthly Savings</span><span>{metrics.monthlySavingsVsRenting > 0 ? '+' : ''}{currencySymbol}{Math.round(metrics.monthlySavingsVsRenting)}</span></div>
          </div>
        </div>

        <CalculatorActions slug="house-hacking-roi-calculator" onSave={handleSave} isSaving={isSaving} isPro={isPro} exportData={exportData} exportFilename="House_Hack_Analysis" onRequirePro={() => setShowProModal(true)} shareUrl={shareUrl} />
      </div>
      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
