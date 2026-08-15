'use client'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"

import React, { useState, useEffect } from 'react'
import { useNomadCOLStore } from '@/store/nomad-col.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Save, Lock, Share2, MapPin, Plane, CheckCircle2, TrendingUp, PlaneTakeoff, ShieldCheck } from "lucide-react"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { useGlobalSettingsStore, formatCurrency } from '@/store/global-settings.store'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useNomadCOLStore()
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
          if (state.currentMonthlyExpenses !== undefined) store.setCurrentMonthlyExpenses(state.currentMonthlyExpenses as any)
          if (state.targetColReductionPct !== undefined) store.setTargetColReductionPct(state.targetColReductionPct as any)
          if (state.relocationCost !== undefined) store.setRelocationCost(state.relocationCost as any)
          if (state.currentSavings !== undefined) store.setCurrentSavings(state.currentSavings as any)
          if (state.monthlyIncome !== undefined) store.setMonthlyIncome(state.monthlyIncome as any)
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
        calculator_slug: 'nomad-cost-of-living-calculator',
        category: 'Freelance & Business',
        saved_name: `Runway Ext: +${metrics.runwayExtension.toFixed(1)} mos`,
        input_state: {
          currentMonthlyExpenses: store.currentMonthlyExpenses,
          targetColReductionPct: store.targetColReductionPct,
          relocationCost: store.relocationCost,
          currentSavings: store.currentSavings,
          monthlyIncome: store.monthlyIncome
        },
        core_metric: Math.round(metrics.runwayExtension) // Storing extension months as core metric
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
    "Current Expenses": `${currency} ${store.currentMonthlyExpenses}`,
    "Target COL Reduction": `${currency} ${`${store.targetColReductionPct}%`}`,
    "Relocation Cost": `${currency} ${store.relocationCost}`,
    "Current Savings": `${currency} ${store.currentSavings}`,
    "New Monthly Expenses": `${currency} ${Math.round(metrics.newMonthlyExpenses)}`,
    "Monthly Savings": `${currency} ${Math.round(metrics.monthlySavings)}`,
    "Payback Period (Months)": metrics.paybackMonths.toFixed(1),
    "Runway Extension (Months)": metrics.runwayExtension.toFixed(1),
    "New Monthly Profit": `${currency} ${Math.round(metrics.newMonthlyProfit)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/freelance/nomad-cost-of-living-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/freelance/nomad-cost-of-living-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-12 xl:col-span-5 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-10">
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            Current Situation
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Current Monthly Expenses</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.currentMonthlyExpenses || ''}
                  onChange={(e) => store.setCurrentMonthlyExpenses(Number(e.target.value))}
                  className="pl-7 bg-muted/50 text-lg font-bold"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Current Liquid Savings</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.currentSavings || ''}
                  onChange={(e) => store.setCurrentSavings(Number(e.target.value))}
                  className="pl-7 bg-muted/50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-sm font-semibold text-foreground">Average Monthly Income (After Taxes)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input 
                type="number" 
                value={store.monthlyIncome || ''}
                onChange={(e) => store.setMonthlyIncome(Number(e.target.value))}
                className="pl-7 bg-muted/50"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Plane className="h-5 w-5 text-muted-foreground" />
            Relocation Target
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Target Cost of Living Reduction</label>
                <p className="text-xs text-muted-foreground mt-1">E.g. Moving to a city that is 50% cheaper.</p>
              </div>
              <span className="text-xl font-bold text-emerald-600">-{store.targetColReductionPct}%</span>
            </div>
            
            <Slider 
              value={[store.targetColReductionPct]} 
              min={10} max={90} step={5}
              onValueChange={(val: any) => store.setTargetColReductionPct(Array.isArray(val) ? val[0] : val)}
              className="py-4"
            />
          </div>
          
          <div className="space-y-3 pt-2">
            <label className="text-sm font-semibold text-foreground">Est. Relocation Cost</label>
            <p className="text-xs text-muted-foreground">Flights, visas, deposits, and moving fees.</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input 
                type="number" 
                value={store.relocationCost || ''}
                onChange={(e) => store.setRelocationCost(Number(e.target.value))}
                className="pl-7 bg-muted/50"
              />
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results Dashboard */}
      <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-emerald-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Saved to Scenario Vault!</span>
          </div>
        )}

        {/* Hero Runway Card */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-4 relative z-10 text-primary-foreground/70">
            <ShieldCheck className="h-5 w-5" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Runway Extension</h3>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl font-black">+{metrics.runwayExtension.toFixed(1)}</span>
                <span className="text-xl font-medium opacity-80">Months</span>
              </div>
              <p className="text-sm font-medium text-primary-foreground/80">
                Added to your financial safety net.
              </p>
            </div>
            
            <div className="bg-black/20 rounded-xl p-4 text-sm font-mono backdrop-blur-sm border border-white/10">
              <div className="flex justify-between gap-6 mb-2">
                <span className="opacity-70">Current Runway</span>
                <span className="font-bold">{metrics.currentRunwayMonths.toFixed(1)} mos</span>
              </div>
              <div className="flex justify-between gap-6 text-emerald-300">
                <span className="opacity-70">New Runway</span>
                <span className="font-bold">{metrics.newRunwayMonths.toFixed(1)} mos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-card border shadow-sm rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <PlaneTakeoff className="h-4 w-4 text-emerald-600" />
              <h4 className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Relocation ROI</h4>
            </div>
            
            <div className="space-y-4 mb-4 font-mono text-sm">
              <div className="flex justify-between border-b pb-2 border-dashed">
                <span className="text-muted-foreground">Monthly Savings</span>
                <span className="font-bold text-emerald-600">+${Math.round(metrics.monthlySavings).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-dashed">
                <span className="text-muted-foreground">Move Cost</span>
                <span className="font-bold">-${Math.round(store.relocationCost).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-wider">Payback Period</p>
            <p className="text-3xl font-black text-foreground">{metrics.paybackMonths.toFixed(1)} <span className="text-base font-medium text-muted-foreground">months</span></p>
          </div>

          <div className="bg-card border shadow-sm rounded-xl p-6">
             <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <h4 className="text-xs uppercase tracking-wider font-bold text-muted-foreground">New Profit Margin</h4>
            </div>
            
            <div className="space-y-4 mb-4 font-mono text-sm">
              <div className="flex justify-between border-b pb-2 border-dashed">
                <span className="text-muted-foreground">Monthly Income</span>
                <span className="font-bold">{currencySymbol}{Math.round(store.monthlyIncome).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-dashed">
                <span className="text-muted-foreground">New Expenses</span>
                <span className="font-bold text-emerald-600">-${Math.round(metrics.newMonthlyExpenses).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-wider">New Monthly Profit</p>
            <p className="text-3xl font-black text-foreground">{currencySymbol}{Math.round(metrics.newMonthlyProfit).toLocaleString()}
            </p>
          </div>

        </div>

        {/* Action Buttons */}
                <CalculatorActions
              slug="nomad-cost-of-living-calculator"
              onSave={handleSave}
              isSaving={isSaving}
              isPro={isPro}
              exportData={exportData}
              exportFilename="NomadGeoArbitrage"
              onRequirePro={() => setShowProModal(true)}
              shareUrl={shareUrl}
            />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
