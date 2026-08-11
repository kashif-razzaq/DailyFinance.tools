'use client'

import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useCrossBorderFXStore } from '@/store/cross-border-fx.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, Lock, Share2, Globe, TrendingDown, ArrowRightLeft, DollarSign } from "lucide-react"
import { ExportEngine } from "@/components/shared/ExportEngine"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ShareCalculatorModal } from "@/components/shared/ShareCalculatorModal"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

const CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'INR']

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useCrossBorderFXStore()
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
          if (state.invoiceAmount !== undefined) store.setInvoiceAmount(state.invoiceAmount)
          if (state.sourceCurrency !== undefined) store.setSourceCurrency(state.sourceCurrency)
          if (state.targetCurrency !== undefined) store.setTargetCurrency(state.targetCurrency)
          if (state.midMarketRate !== undefined) store.setMidMarketRate(state.midMarketRate)
          if (state.annualInvoices !== undefined) store.setAnnualInvoices(state.annualInvoices)
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
        calculator_slug: 'cross-border-fx-impact-calculator',
        category: 'Freelance & Business',
        saved_name: `FX Impact: ${store.sourceCurrency} to ${store.targetCurrency}`,
        input_state: {
          invoiceAmount: store.invoiceAmount,
          sourceCurrency: store.sourceCurrency,
          targetCurrency: store.targetCurrency,
          midMarketRate: store.midMarketRate,
          annualInvoices: store.annualInvoices
        },
        core_metric: Math.round(metrics.annualSavingsWiseVsPaypal)
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
    "Invoice Amount": `${store.invoiceAmount} ${store.sourceCurrency}`,
    "Conversion": `${store.sourceCurrency} to ${store.targetCurrency}`,
    "Mid Market Rate": `${currency} ${store.midMarketRate}`,
    "True Value": `${currency} ${Math.round(metrics.trueValue)}`,
    "Wise Net Payout": Math.round(metrics.wiseNetPayout),
    "Stripe Net Payout": Math.round(metrics.stripeNetPayout),
    "PayPal Net Payout": Math.round(metrics.paypalNetPayout),
    "Annual Savings (Wise vs PayPal)": `${currency} ${Math.round(metrics.annualSavingsWiseVsPaypal)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/tools/cross-border-fx-impact-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/tools/cross-border-fx-impact-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative pb-24 md:pb-0">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-12 xl:col-span-4 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-10">
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Globe className="h-5 w-5 text-muted-foreground" />
            Invoice Details
          </h2>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Invoice Amount (Client's Currency)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input 
                type="number" 
                value={store.invoiceAmount || ''}
                onChange={(e) => store.setInvoiceAmount(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Client Pays In</label>
              <select 
                value={store.sourceCurrency}
                onChange={(e) => store.setSourceCurrency(e.target.value)}
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-muted/50 text-sm"
              >
                {CURRENCIES.map(c => <option key={`source-${c}`} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">You Receive</label>
              <select 
                value={store.targetCurrency}
                onChange={(e) => store.setTargetCurrency(e.target.value)}
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-muted/50 text-sm"
              >
                {CURRENCIES.map(c => <option key={`target-${c}`} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/50">
            <label className="text-sm font-semibold text-foreground">Current Mid-Market Exchange Rate</label>
            <p className="text-xs text-muted-foreground mb-2">Check Google for "1 {store.sourceCurrency} to {store.targetCurrency}" and enter it here.</p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">1 {store.sourceCurrency} =</span>
              <Input 
                type="number" 
                step="0.0001"
                value={store.midMarketRate || ''}
                onChange={(e) => store.setMidMarketRate(Number(e.target.value))}
                className="bg-muted/50 flex-1"
              />
              <span className="text-sm font-medium">{store.targetCurrency}</span>
            </div>
          </div>
          
          <div className="space-y-3 pt-4 border-t border-border/50">
            <label className="text-sm font-semibold text-foreground">Similar Invoices Per Year</label>
            <Input 
              type="number" 
              value={store.annualInvoices || ''}
              onChange={(e) => store.setAnnualInvoices(Number(e.target.value))}
              className="bg-muted/50"
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Comparative Results */}
      <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-6">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-emerald-50 text-emerald-600 border border-emerald-200 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <span className="font-semibold text-sm">Saved to Scenario Vault!</span>
          </div>
        )}

        <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-8 pb-4 border-b">
            <div>
              <h3 className="text-lg font-bold">The True Value of Your Invoice</h3>
              <p className="text-sm text-muted-foreground">Before any platform fees or FX spread markups.</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black">{Math.round(metrics.trueValue).toLocaleString()}</span>
              <span className="text-sm ml-1 font-semibold text-muted-foreground">{store.targetCurrency}</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Wise */}
            <div className="border-2 border-emerald-500 bg-emerald-50/30 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase">Winner</div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">Wise</h4>
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1">You Receive</p>
                <p className="text-2xl font-bold text-emerald-700">{Math.round(metrics.wiseNetPayout).toLocaleString()} <span className="text-xs">{store.targetCurrency}</span></p>
              </div>
              <div className="space-y-2 text-xs border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee Drag</span>
                  <span className="font-semibold text-emerald-700">{metrics.wiseDragPct.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">FX Markup</span>
                  <span className="font-semibold text-emerald-700">0.00%</span>
                </div>
              </div>
            </div>

            {/* Stripe */}
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-4">Stripe</h4>
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1">You Receive</p>
                <p className="text-2xl font-bold text-foreground">{Math.round(metrics.stripeNetPayout).toLocaleString()} <span className="text-xs">{store.targetCurrency}</span></p>
              </div>
              <div className="space-y-2 text-xs border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee Drag</span>
                  <span className="font-semibold text-amber-600">{metrics.stripeDragPct.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">FX Markup</span>
                  <span className="font-semibold text-amber-600">~1.00%</span>
                </div>
              </div>
            </div>

            {/* PayPal */}
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-4">PayPal</h4>
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1">You Receive</p>
                <p className="text-2xl font-bold text-foreground">{Math.round(metrics.paypalNetPayout).toLocaleString()} <span className="text-xs">{store.targetCurrency}</span></p>
              </div>
              <div className="space-y-2 text-xs border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee Drag</span>
                  <span className="font-semibold text-red-600">{metrics.paypalDragPct.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">FX Markup</span>
                  <span className="font-semibold text-red-600">~3.50%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-emerald-600 text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-lg">Annual Savings with Wise</h4>
              <p className="text-emerald-100 text-sm">Compared to using PayPal for {store.annualInvoices} invoices a year.</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black">+{Math.round(metrics.annualSavingsWiseVsPaypal).toLocaleString()}</span>
              <span className="text-sm ml-1 text-emerald-100">{store.targetCurrency} / yr</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-card border rounded-2xl p-6 flex flex-col sm:flex-row gap-3 mt-auto">
          <Button onClick={handleSave} disabled={isSaving} className="flex-1 justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white" size="lg">
            <Save className="h-4 w-4" /> Save to Dashboard
            {!isPro && <Lock className="h-4 w-4 text-white/70 ml-auto" />}
          </Button>
          <div className="flex-1 flex gap-3">
            <div className="flex-1">
              <ExportEngine 
                data={exportData} 
                filename="FXImpact" 
                isPro={isPro}
                onRequirePro={() => setShowProModal(true)}
              />
            </div>
            <div className="flex-1">
            <ShareCalculatorModal url={shareUrl} slug="cross-border-fx-impact-calculator" isPro={isPro}>
              <Button variant="outline" className="w-full flex gap-2 justify-center">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </ShareCalculatorModal>
            </div>
          </div>
        </div>
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
