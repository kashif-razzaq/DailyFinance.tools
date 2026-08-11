'use client'

import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useClientLTVStore } from '@/store/client-ltv.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Save, Lock, Share2, Users, Target, Activity, AlertTriangle, CheckCircle2 } from "lucide-react"
import { ExportEngine } from "@/components/shared/ExportEngine"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ShareCalculatorModal } from "@/components/shared/ShareCalculatorModal"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useClientLTVStore()
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
          if (state.monthlyRetainer !== undefined) store.setMonthlyRetainer(state.monthlyRetainer)
          if (state.monthlyChurnPct !== undefined) store.setMonthlyChurnPct(state.monthlyChurnPct)
          if (state.grossMarginPct !== undefined) store.setGrossMarginPct(state.grossMarginPct)
          if (state.expansionPct !== undefined) store.setExpansionPct(state.expansionPct)
          if (state.targetLtvCacRatio !== undefined) store.setTargetLtvCacRatio(state.targetLtvCacRatio)
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
        calculator_slug: 'client-ltv-calculator',
        category: 'Freelance & Business',
        saved_name: `Target CAC: ${currencySymbol}${Math.round(metrics.targetMaxCAC)}`,
        input_state: {
          monthlyRetainer: store.monthlyRetainer,
          monthlyChurnPct: store.monthlyChurnPct,
          grossMarginPct: store.grossMarginPct,
          expansionPct: store.expansionPct,
          targetLtvCacRatio: store.targetLtvCacRatio
        },
        core_metric: Math.round(metrics.targetMaxCAC)
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
    "Monthly Retainer": `${currency} ${store.monthlyRetainer}`,
    "Monthly Churn Rate": `${currency} ${`${store.monthlyChurnPct}%`}`,
    "Gross Margin": `${store.grossMarginPct}%`,
    "Target Ratio": `${store.targetLtvCacRatio}:1`,
    "Est. Lifespan (Months)": Math.round(metrics.clientLifespanMonths),
    "Gross LTV": `${currency} ${Math.round(metrics.grossLTV)}`,
    "Net Profit LTV": `${currency} ${Math.round(metrics.netLTV)}`,
    "Max Target CAC": `${currency} ${Math.round(metrics.targetMaxCAC)}`,
    "Payback Period (Months)": metrics.paybackPeriod.toFixed(1)
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/tools/client-ltv-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/tools/client-ltv-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative pb-24 md:pb-0">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-6 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-10">
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Users className="h-5 w-5 text-muted-foreground" />
            Client Retention Mechanics
          </h2>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Average Monthly Retainer ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input 
                type="number" 
                value={store.monthlyRetainer || ''}
                onChange={(e) => store.setMonthlyRetainer(Number(e.target.value))}
                className="pl-7 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Monthly Churn Rate</label>
                <p className="text-xs text-muted-foreground">% of active clients lost per month.</p>
              </div>
              <span className="text-lg font-bold text-red-600">{store.monthlyChurnPct}%</span>
            </div>
            <Slider 
              value={[store.monthlyChurnPct]} 
              max={25} step={0.5}
              onValueChange={(val: any) => store.setMonthlyChurnPct(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
            <p className="text-xs font-semibold text-right text-muted-foreground border-t pt-2">
              Implied Lifespan: <span className="text-foreground">{Math.round(metrics.clientLifespanMonths)} months</span>
            </p>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Gross Margin</label>
                <p className="text-xs text-muted-foreground">Profit after direct delivery costs.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.grossMarginPct}%</span>
            </div>
            <Slider 
              value={[store.grossMarginPct]} 
              min={20} max={100} step={5}
              onValueChange={(val: any) => store.setGrossMarginPct(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Target className="h-5 w-5 text-muted-foreground" />
            Growth Assumptions
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Contract Expansion / Upsells</label>
                <p className="text-xs text-muted-foreground">Annual growth rate of a retained client.</p>
              </div>
              <span className="text-lg font-bold text-emerald-600">+{store.expansionPct}%</span>
            </div>
            <Slider 
              value={[store.expansionPct]} 
              max={50} step={5}
              onValueChange={(val: any) => store.setExpansionPct(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-border/50">
            <label className="text-sm font-semibold text-foreground block">Target LTV : CAC Ratio</label>
            <p className="text-xs text-muted-foreground mb-3">How many dollars of profit you want for every dollar spent on marketing.</p>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={store.targetLtvCacRatio === 3 ? 'default' : 'outline'} 
                className={store.targetLtvCacRatio === 3 ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                onClick={() => store.setTargetLtvCacRatio(3)}
              >
                3:1 (Minimum)
              </Button>
              <Button 
                variant={store.targetLtvCacRatio === 4 ? 'default' : 'outline'} 
                className={store.targetLtvCacRatio === 4 ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                onClick={() => store.setTargetLtvCacRatio(4)}
              >
                4:1 (Healthy)
              </Button>
              <Button 
                variant={store.targetLtvCacRatio === 5 ? 'default' : 'outline'} 
                className={store.targetLtvCacRatio === 5 ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                onClick={() => store.setTargetLtvCacRatio(5)}
              >
                5:1 (Aggressive)
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results Dashboard */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-emerald-50 text-emerald-600 border border-emerald-200 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Saved to Scenario Vault!</span>
          </div>
        )}

        {/* Primary Target Card */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[300px]">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <h3 className="text-sm font-bold text-primary-foreground/70 uppercase tracking-widest mb-4 relative z-10 text-center">
            Max Acquisition Budget (CAC)
          </h3>
          
          <div className="flex items-center justify-center gap-1 relative z-10 mb-8">
            <span className="text-6xl md:text-7xl font-black tracking-tighter">{currencySymbol}{Math.round(metrics.targetMaxCAC).toLocaleString()}</span>
          </div>

          <p className="text-center text-sm font-medium text-primary-foreground/80 relative z-10 px-4">
            Do not spend more than this to acquire a single client if you want to maintain a {store.targetLtvCacRatio}:1 ROI ratio.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border shadow-sm rounded-xl p-5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-2">Net Profit LTV</h4>
            <p className="text-3xl font-black text-foreground">{currencySymbol}{Math.round(metrics.netLTV).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-2 border-t pt-2">Gross Rev: ${Math.round(metrics.grossLTV).toLocaleString()}</p>
          </div>
          
          <div className="bg-card border shadow-sm rounded-xl p-5 relative overflow-hidden">
            <h4 className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-2">Payback Period</h4>
            <p className="text-3xl font-black text-foreground">{metrics.paybackPeriod.toFixed(1)} <span className="text-lg font-medium text-muted-foreground">mos</span></p>
            
            <div className={`mt-2 border-t pt-2 text-xs font-bold ${
              metrics.healthRating === 'Strong' ? 'text-emerald-600' :
              metrics.healthRating === 'Fair' ? 'text-amber-600' : 'text-red-600'
            }`}>
              {metrics.healthRating === 'Strong' ? 'Excellent Cashflow' :
               metrics.healthRating === 'Fair' ? 'Average Cashflow' : 'Cashflow Warning'}
            </div>
          </div>
        </div>

        {metrics.healthRating === 'Critical' && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl flex gap-3 items-start border border-red-100">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium"><strong>High Churn Alert:</strong> With {store.monthlyChurnPct}% of clients leaving every month, your retention is too low to sustain paid acquisition. Focus entirely on product delivery and client success before spending money on marketing.</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-card border rounded-2xl p-6 flex flex-col sm:flex-row gap-3 mt-auto shadow-sm">
          <Button onClick={handleSave} disabled={isSaving} className="flex-1 justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white" size="lg">
            <Save className="h-4 w-4" /> Save to Dashboard
            {!isPro && <Lock className="h-4 w-4 text-white/70 ml-auto" />}
          </Button>
          <div className="flex-1 flex gap-3">
            <div className="flex-1">
              <ExportEngine 
                data={exportData} 
                filename="ClientLTV" 
                isPro={isPro}
                onRequirePro={() => setShowProModal(true)}
              />
            </div>
            <div className="flex-1">
            <ShareCalculatorModal url={shareUrl} slug="client-ltv-calculator" isPro={isPro}>
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
