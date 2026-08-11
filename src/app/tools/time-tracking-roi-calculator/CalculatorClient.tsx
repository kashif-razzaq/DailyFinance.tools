'use client'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"

import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useTimeTrackingROIStore } from '@/store/time-tracking-roi.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Save, Lock, Share2, Clock, CheckCircle2, TrendingUp, DollarSign } from "lucide-react"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useTimeTrackingROIStore()
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
          if (state.weeklyUnbilledScopeCreep !== undefined) store.setWeeklyUnbilledScopeCreep(state.weeklyUnbilledScopeCreep)
          if (state.weeklyAdminTimeTracking !== undefined) store.setWeeklyAdminTimeTracking(state.weeklyAdminTimeTracking)
          if (state.hourlyRate !== undefined) store.setHourlyRate(state.hourlyRate)
          if (state.softwareCostPerMonth !== undefined) store.setSoftwareCostPerMonth(state.softwareCostPerMonth)
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
        calculator_slug: 'time-tracking-roi-calculator',
        category: 'Freelance & Business',
        saved_name: `Time Tracking ROI: ${Math.round(metrics.roiMultiplier)}x`,
        input_state: {
          weeklyUnbilledScopeCreep: store.weeklyUnbilledScopeCreep,
          weeklyAdminTimeTracking: store.weeklyAdminTimeTracking,
          hourlyRate: store.hourlyRate,
          softwareCostPerMonth: store.softwareCostPerMonth
        },
        core_metric: Math.round(metrics.netROI)
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
    "Target Hourly Rate": `${currency} ${store.hourlyRate}`,
    "Weekly Unbilled Scope Creep (Hrs)": store.weeklyUnbilledScopeCreep,
    "Weekly Manual Admin (Hrs)": store.weeklyAdminTimeTracking,
    "Annual Lost Revenue": `${currency} ${Math.round(metrics.annualLostRevenue)}`,
    "Annual Admin Cost": `${currency} ${Math.round(metrics.annualAdminCost)}`,
    "Annual Software Cost": `${currency} ${Math.round(metrics.annualSoftwareCost)}`,
    "Net ROI": Math.round(metrics.netROI),
    "ROI Multiplier": `${metrics.roiMultiplier.toFixed(1)}x`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/tools/time-tracking-roi-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/tools/time-tracking-roi-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-12 xl:col-span-5 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-10">
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Time Leaks
          </h2>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Target Hourly Rate</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input 
                type="number" 
                value={store.hourlyRate || ''}
                onChange={(e) => store.setHourlyRate(Number(e.target.value))}
                className="pl-7 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold text-foreground/80">Weekly Unbilled Scope Creep</label>
                <p className="text-xs text-muted-foreground">Hours spent on "quick favors" and extra client requests.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.weeklyUnbilledScopeCreep} hrs</span>
            </div>
            <Slider 
              value={[store.weeklyUnbilledScopeCreep]} 
              max={20} step={1}
              onValueChange={(val: any) => store.setWeeklyUnbilledScopeCreep(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold text-foreground/80">Weekly Manual Admin</label>
                <p className="text-xs text-muted-foreground">Hours spent tracking time in spreadsheets and building invoices.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.weeklyAdminTimeTracking} hrs</span>
            </div>
            <Slider 
              value={[store.weeklyAdminTimeTracking]} 
              max={10} step={1}
              onValueChange={(val: any) => store.setWeeklyAdminTimeTracking(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            Software Cost
          </h2>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Time Tracking Software (Monthly)</label>
            <p className="text-xs text-muted-foreground">E.g., Harvest, Toggl, or QuickBooks.</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input 
                type="number" 
                value={store.softwareCostPerMonth || ''}
                onChange={(e) => store.setSoftwareCostPerMonth(Number(e.target.value))}
                className="pl-7 bg-muted/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-emerald-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Saved to Scenario Vault!</span>
          </div>
        )}

        <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8">
          
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <h3 className="text-xl font-bold">Annual Financial Impact</h3>
          </div>

          {/* Loss Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 shadow-sm text-foreground/80">
              <h4 className="text-xs uppercase tracking-wider font-bold text-red-800 mb-1">Lost Revenue</h4>
              <p className="text-3xl font-black text-red-700">{currencySymbol}{Math.round(metrics.annualLostRevenue).toLocaleString()}</p>
              <p className="text-xs text-red-900/60 mt-1">From unbilled scope creep.</p>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 shadow-sm text-foreground/80">
              <h4 className="text-xs uppercase tracking-wider font-bold text-foreground/80 mb-1">Admin Cost</h4>
              <p className="text-3xl font-black text-foreground/80">{currencySymbol}{Math.round(metrics.annualAdminCost).toLocaleString()}</p>
              <p className="text-xs text-foreground/80/60 mt-1">From manual invoicing & spreadsheets.</p>
            </div>
          </div>

          <div className="bg-slate-100 rounded-xl p-5 mb-8 flex justify-between items-center border border-primary/20">
            <div>
              <h4 className="font-bold text-foreground/80">Software Cost</h4>
              <p className="text-sm text-muted-foreground">Annual investment in automation.</p>
            </div>
            <span className="text-2xl font-black text-foreground/80">-${Math.round(metrics.annualSoftwareCost).toLocaleString()}</span>
          </div>

          {/* Net ROI Hero */}
          <div className="bg-primary text-primary-foreground rounded-xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div>
              <h4 className="font-bold text-xl mb-1 text-primary-foreground">Net Profit Recovered</h4>
              <p className="text-sm text-primary-foreground/80">Value generated by strictly tracking time.</p>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <span className="text-5xl font-black text-emerald-300">{currencySymbol}{Math.round(metrics.netROI).toLocaleString()}
              </span>
              {metrics.roiMultiplier > 1 && (
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold mt-2">
                  {metrics.roiMultiplier.toFixed(1)}x ROI
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Action Buttons */}
                <CalculatorActions
              slug="time-tracking-roi-calculator"
              onSave={handleSave}
              isSaving={isSaving}
              isPro={isPro}
              exportData={exportData}
              exportFilename="TimeTrackingROI"
              onRequirePro={() => setShowProModal(true)}
              shareUrl={shareUrl}
            />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
