/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useSalesTaxStore } from '@/store/sales-tax-vat.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, Globe, DollarSign, Receipt, Percent, CheckCircle2 } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useSalesTaxStore()
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
          if (state.retailPrice !== undefined) store.setRetailPrice(state.retailPrice as number)
          if (state.taxRatePercent !== undefined) store.setTaxRatePercent(state.taxRatePercent as number)
          if (state.pricingModel !== undefined) store.setPricingModel(state.pricingModel as any)
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
        calculator_slug: 'sales-tax-vat-calculator',
        category: 'E-Commerce',
        saved_name: `Tax Config: ${store.taxRatePercent}% ${store.pricingModel}`,
        input_state: {
          retailPrice: store.retailPrice,
          taxRatePercent: store.taxRatePercent,
          pricingModel: store.pricingModel
        },
        core_metric: Math.round(metrics.taxAmount)
      })
      if (savedResult?.id) {
        setSavedScenarioId(savedResult.id)
      }
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
    "Base Price": `${currencySymbol}${metrics.priceWithoutTax.toFixed(2)}`,
    "Tax Rate": `${store.taxRatePercent}%`,
    "Tax Amount": `${currencySymbol}${metrics.taxAmount.toFixed(2)}`,
    "Final Price": `${currencySymbol}${metrics.finalPriceToCustomer.toFixed(2)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/sales-tax-vat-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/sales-tax-vat-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Globe className="h-5 w-5 text-muted-foreground" />
            Tax Configuration
          </h2>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-foreground">Pricing Model (Geography)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => store.setPricingModel('exclusive')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  store.pricingModel === 'exclusive'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold'
                    : 'border-border/60 hover:border-indigo-500/50 text-muted-foreground'
                }`}
              >
                <p className="text-sm font-bold">Tax Exclusive (USA)</p>
                <p className="text-xs mt-1 font-normal opacity-80">Tax is added ON TOP of the price at checkout.</p>
              </div>
              <div
                onClick={() => store.setPricingModel('inclusive')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  store.pricingModel === 'inclusive'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold'
                    : 'border-border/60 hover:border-indigo-500/50 text-muted-foreground'
                }`}
              >
                <p className="text-sm font-bold">Tax Inclusive (EU/UK/AUS)</p>
                <p className="text-xs mt-1 font-normal opacity-80">Tax is already baked INTO the displayed price.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Input Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="1"
                  value={store.retailPrice === 0 ? '' : store.retailPrice}
                  onChange={(e) => store.setRetailPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Tax Rate (%)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Percent className="h-4 w-4" /></span>
                <Input
                  type="number" step="0.5"
                  value={store.taxRatePercent === 0 ? '' : store.taxRatePercent}
                  onChange={(e) => store.setTaxRatePercent(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 font-medium bg-muted/50"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20">

        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-blue-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        <div className="bg-indigo-600 dark:bg-indigo-700 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <Receipt className="h-4 w-4" /> Tax Amount To Remit
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{currencySymbol}{metrics.taxAmount.toFixed(2)}</span>
          </div>
          <p className="text-sm font-medium mt-2 text-indigo-100 relative z-10">
            You must hold this money to pay the government.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Base Price (Your Rev)</p>
              <p className="text-2xl font-bold">{currencySymbol}{metrics.priceWithoutTax.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Final Price (Customer)</p>
              <p className="text-2xl font-bold">{currencySymbol}{metrics.finalPriceToCustomer.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="sales-tax-vat-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Sales_Tax_VAT_Calculation"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
