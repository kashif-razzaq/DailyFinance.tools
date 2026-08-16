/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useRentalStore } from '@/store/rental-cash-flow.store'
import { Input } from "@/components/ui/input"
import { Home, DollarSign, Percent, TrendingUp, Key, Activity, CheckCircle2 } from "lucide-react"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useRentalStore()
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
          const state = data.input_state as any
          if (state.purchasePrice !== undefined) store.setPurchasePrice(state.purchasePrice)
          if (state.downPaymentPercent !== undefined) store.setDownPaymentPercent(state.downPaymentPercent)
          if (state.monthlyRent !== undefined) store.setMonthlyRent(state.monthlyRent)
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
        calculator_slug: 'rental-cash-flow-calculator',
        category: 'Real Estate',
        saved_name: `Rental: ${currencySymbol}${Math.round(metrics.monthlyCashFlow)}/mo`,
        input_state: { purchasePrice: store.purchasePrice, downPaymentPercent: store.downPaymentPercent, monthlyRent: store.monthlyRent },
        core_metric: Math.round(metrics.monthlyCashFlow)
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
    "Initial Cash Needed": `${currencySymbol}${Math.round(metrics.totalInitialInvestment)}`,
    "Monthly Rent": `${currencySymbol}${store.monthlyRent}`,
    "Monthly Expenses": `${currencySymbol}${Math.round(metrics.totalMonthlyExpenses)}`,
    "Monthly Cash Flow": `${currencySymbol}${Math.round(metrics.monthlyCashFlow)}`,
    "Cash on Cash Return": `${metrics.cashOnCashReturn.toFixed(2)}%`,
    "Cap Rate": `${metrics.capRate.toFixed(2)}%`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId ? `${baseUrl}/real-estate/rental-cash-flow-calculator?savedId=${savedScenarioId}` : `${baseUrl}/real-estate/rental-cash-flow-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 flex flex-col space-y-8">
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
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b"><DollarSign className="h-5 w-5 text-muted-foreground" /> Income & Expenses</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-semibold">Monthly Rent</label>
              <Input type="number" value={store.monthlyRent || ''} onChange={(e) => store.setMonthlyRent(Number(e.target.value))} className="font-medium bg-muted/50"/>
            </div>
            <div className="space-y-2"><label className="text-sm font-semibold">Annual Prop Taxes</label>
              <Input type="number" value={store.propertyTaxesAnnual || ''} onChange={(e) => store.setPropertyTaxesAnnual(Number(e.target.value))} className="font-medium bg-muted/50"/>
            </div>
            <div className="space-y-2"><label className="text-sm font-semibold">Vacancy Rate (%)</label>
              <Input type="number" value={store.vacancyRate || ''} onChange={(e) => store.setVacancyRate(Number(e.target.value))} className="font-medium bg-muted/50"/>
            </div>
            <div className="space-y-2"><label className="text-sm font-semibold">Maintenance (%)</label>
              <Input type="number" value={store.maintenanceRate || ''} onChange={(e) => store.setMaintenanceRate(Number(e.target.value))} className="font-medium bg-muted/50"/>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20">
        <div className="bg-[#1e293b] text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">Monthly Cash Flow</h3>
          <div className="flex items-baseline gap-1">
            <span className={`text-5xl font-black ${metrics.monthlyCashFlow < 0 ? 'text-red-400' : 'text-emerald-400'}`}>{metrics.monthlyCashFlow < 0 ? '-' : ''}{currencySymbol}{Math.abs(Math.round(metrics.monthlyCashFlow)).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
            <div><p className="text-[10px] text-white/70 uppercase font-bold mb-1">Cash on Cash ROI</p><p className="text-xl font-bold">{metrics.cashOnCashReturn.toFixed(2)}%</p></div>
            <div><p className="text-[10px] text-white/70 uppercase font-bold mb-1">Cap Rate</p><p className="text-xl font-bold">{metrics.capRate.toFixed(2)}%</p></div>
          </div>
        </div>
        <CalculatorActions slug="rental-cash-flow-calculator" onSave={handleSave} isSaving={isSaving} isPro={isPro} exportData={exportData} exportFilename="Rental_Analysis" onRequirePro={() => setShowProModal(true)} shareUrl={shareUrl} />
      </div>
      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
