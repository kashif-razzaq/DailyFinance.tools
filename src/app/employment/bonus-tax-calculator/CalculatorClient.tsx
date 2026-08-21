/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { CheckCircle2, DollarSign, Calculator, Percent } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'

  const [grossBonus, setGrossBonus] = useState(10000)
  const [stateTaxRate, setStateTaxRate] = useState(5)
  // IRS standard supplemental withholding is 22% for bonuses under $1 million
  const [federalSupplementalRate, setFederalSupplementalRate] = useState(22)

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
          if (state.grossBonus !== undefined) setGrossBonus(state.grossBonus as number)
          if (state.stateTaxRate !== undefined) setStateTaxRate(state.stateTaxRate as number)
          if (state.federalSupplementalRate !== undefined) setFederalSupplementalRate(state.federalSupplementalRate as number)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  // Math Logic
  const federalTax = grossBonus * (federalSupplementalRate / 100);
  const stateTax = grossBonus * (stateTaxRate / 100);
  const ficaTax = grossBonus * 0.0765; // 6.2% SS + 1.45% Medicare

  const totalTaxes = federalTax + stateTax + ficaTax;
  const netBonus = grossBonus - totalTaxes;

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    setIsSaving(true)

    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'employment/bonus-tax-calculator',
        category: 'Employment & Salary',
        saved_name: `Bonus Tax on ${currencySymbol}${grossBonus}`,
        input_state: {
          grossBonus,
          stateTaxRate,
          federalSupplementalRate
        },
        core_metric: Math.round(netBonus)
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
    "Gross Bonus": `${currencySymbol}${grossBonus}`,
    "Federal Tax (22%)": `${currencySymbol}${Math.round(federalTax)}`,
    "State Tax": `${currencySymbol}${Math.round(stateTax)}`,
    "FICA Tax (7.65%)": `${currencySymbol}${Math.round(ficaTax)}`,
    "Total Tax Withheld": `${currencySymbol}${Math.round(totalTaxes)}`,
    "Net Take Home Bonus": `${currencySymbol}${Math.round(netBonus)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/employment/bonus-tax-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/employment/bonus-tax-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      <div className="lg:col-span-4 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-8">
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            Bonus Details
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Gross Bonus Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number"
                value={grossBonus === 0 ? '' : grossBonus}
                onChange={(e) => setGrossBonus(Number(e.target.value))}
                className="pl-7 text-lg font-medium"
              />
            </div>
            <p className="text-xs text-muted-foreground">The pre-tax bonus your company awarded.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Percent className="h-5 w-5 text-muted-foreground" />
            Tax Withholding Rates
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Federal Supplemental Rate (%)</label>
            <Input
              type="number"
              value={federalSupplementalRate === 0 ? '' : federalSupplementalRate}
              onChange={(e) => setFederalSupplementalRate(Number(e.target.value))}
              className="text-lg font-medium"
            />
            <p className="text-xs text-muted-foreground">IRS mandates a flat 22% for bonuses under $1M.</p>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">State Tax Rate (%)</label>
            <Input
              type="number"
              value={stateTaxRate === 0 ? '' : stateTaxRate}
              onChange={(e) => setStateTaxRate(Number(e.target.value))}
              className="text-lg font-medium"
            />
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
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Net Bonus Check</h3>
            <p className="text-5xl md:text-6xl font-extrabold text-blue-600">{currencySymbol}{Math.round(netBonus).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-4 font-medium">After {currencySymbol}{Math.round(totalTaxes).toLocaleString()} in withheld taxes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-xl border border-red-100 dark:border-red-900 text-center">
              <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-1">Federal Tax (22%)</p>
              <p className="text-xl font-bold text-red-700 dark:text-red-500">-{currencySymbol}{Math.round(federalTax).toLocaleString()}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-xl border border-red-100 dark:border-red-900 text-center">
              <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-1">State Tax</p>
              <p className="text-xl font-bold text-red-700 dark:text-red-500">-{currencySymbol}{Math.round(stateTax).toLocaleString()}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-xl border border-red-100 dark:border-red-900 text-center">
              <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-1">FICA (7.65%)</p>
              <p className="text-xl font-bold text-red-700 dark:text-red-500">-{currencySymbol}{Math.round(ficaTax).toLocaleString()}</p>
            </div>
          </div>

        </div>

        <CalculatorActions
          slug="employment/bonus-tax-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Bonus_Tax_Calculation"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
