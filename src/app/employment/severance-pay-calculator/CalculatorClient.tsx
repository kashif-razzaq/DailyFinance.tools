/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { CheckCircle2, Wallet, Briefcase, FileText } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'

  const [weeklyPay, setWeeklyPay] = useState(1500)
  const [yearsOfService, setYearsOfService] = useState(5)
  const [weeksPerYearOffered, setWeeksPerYearOffered] = useState(2)
  const [unusedPtoDays, setUnusedPtoDays] = useState(10)
  const [flatTaxRate, setFlatTaxRate] = useState(22)

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
          if (state.weeklyPay !== undefined) setWeeklyPay(state.weeklyPay as number)
          if (state.yearsOfService !== undefined) setYearsOfService(state.yearsOfService as number)
          if (state.weeksPerYearOffered !== undefined) setWeeksPerYearOffered(state.weeksPerYearOffered as number)
          if (state.unusedPtoDays !== undefined) setUnusedPtoDays(state.unusedPtoDays as number)
          if (state.flatTaxRate !== undefined) setFlatTaxRate(state.flatTaxRate as number)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  // Math Logic
  const baseSeverance = weeklyPay * weeksPerYearOffered * yearsOfService;
  const dailyPay = weeklyPay / 5;
  const ptoPayout = unusedPtoDays * dailyPay;
  const totalGrossSeverance = baseSeverance + ptoPayout;
  
  // Tax logic (severance is supplemental wages, usually taxed flat 22% federal + FICA + State)
  // We'll simplify to a flat percentage input for all taxes combined to make it easy for users,
  // or default to 22% + 7.65% FICA = roughly 30%.
  const totalTaxes = totalGrossSeverance * (flatTaxRate / 100);
  const netSeverance = totalGrossSeverance - totalTaxes;

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    setIsSaving(true)

    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'employment/severance-pay-calculator',
        category: 'Employment & Salary',
        saved_name: `Severance Analysis on ${currencySymbol}${totalGrossSeverance}`,
        input_state: {
          weeklyPay,
          yearsOfService,
          weeksPerYearOffered,
          unusedPtoDays,
          flatTaxRate
        },
        core_metric: Math.round(netSeverance)
      })
      if (savedResult?.id) setSavedScenarioId(savedResult.id)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error) {
      console.error(error)
      alert("Failed to save. Ensure you are logged in properly.")
    } finally {
      setIsSaving(false)
    }
  }

  const exportData = [{
    "Weekly Pay": `${currencySymbol}${weeklyPay}`,
    "Years of Service": yearsOfService,
    "Weeks per Year Offered": weeksPerYearOffered,
    "Base Severance": `${currencySymbol}${Math.round(baseSeverance)}`,
    "Unused PTO Payout": `${currencySymbol}${Math.round(ptoPayout)}`,
    "Gross Severance": `${currencySymbol}${Math.round(totalGrossSeverance)}`,
    "Estimated Taxes": `${currencySymbol}${Math.round(totalTaxes)}`,
    "Net Severance Pay": `${currencySymbol}${Math.round(netSeverance)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/employment/severance-pay-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/employment/severance-pay-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      <div className="lg:col-span-4 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-8">
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            Severance Terms
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Weekly Base Pay</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number"
                value={weeklyPay === 0 ? '' : weeklyPay}
                onChange={(e) => setWeeklyPay(Number(e.target.value))}
                className="pl-7 text-lg font-medium"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Years of Service</label>
            <Input
              type="number"
              value={yearsOfService === 0 ? '' : yearsOfService}
              onChange={(e) => setYearsOfService(Number(e.target.value))}
              className="text-lg font-medium"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Weeks of Pay per Year</label>
            <Input
              type="number"
              value={weeksPerYearOffered === 0 ? '' : weeksPerYearOffered}
              onChange={(e) => setWeeksPerYearOffered(Number(e.target.value))}
              className="text-lg font-medium"
            />
            <p className="text-xs text-muted-foreground">Usually 1-2 weeks of pay for every year worked.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Additional Compensation
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Unused PTO Days</label>
            <Input
              type="number"
              value={unusedPtoDays === 0 ? '' : unusedPtoDays}
              onChange={(e) => setUnusedPtoDays(Number(e.target.value))}
              className="text-lg font-medium"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Est. Total Tax Rate (%)</label>
            <Input
              type="number"
              value={flatTaxRate === 0 ? '' : flatTaxRate}
              onChange={(e) => setFlatTaxRate(Number(e.target.value))}
              className="text-lg font-medium"
            />
            <p className="text-xs text-muted-foreground">Severance is heavily taxed as supplemental income (Often 22% Fed + State + FICA).</p>
          </div>
        </div>

      </div>

      <div className="lg:col-span-8 space-y-6 lg:sticky lg:top-8 relative z-20">
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-blue-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved!</span>
          </div>
        )}

        <div className="bg-card border shadow-sm rounded-2xl overflow-hidden p-6 md:p-8 space-y-8">
          
          <div className="text-center animate-in fade-in">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Net Severance Pay</h3>
            <p className="text-5xl md:text-6xl font-extrabold text-blue-600">{currencySymbol}{Math.round(netSeverance).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-4 font-medium">After {currencySymbol}{Math.round(totalTaxes).toLocaleString()} in estimated taxes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-muted/50 p-5 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground font-semibold mb-1">Base Severance</p>
              <p className="text-2xl font-bold text-foreground">{currencySymbol}{Math.round(baseSeverance).toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 p-5 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground font-semibold mb-1">Unused PTO Payout</p>
              <p className="text-2xl font-bold text-foreground">{currencySymbol}{Math.round(ptoPayout).toLocaleString()}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <div className="flex justify-between items-center py-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 px-4 rounded-xl">
              <span className="font-semibold text-red-800 dark:text-red-300">Estimated Tax Withheld</span>
              <span className="font-bold text-xl text-red-600 dark:text-red-400">-{currencySymbol}{Math.round(totalTaxes).toLocaleString()}</span>
            </div>
          </div>

        </div>

        <CalculatorActions
          slug="employment/severance-pay-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Severance_Package_Calculation"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
