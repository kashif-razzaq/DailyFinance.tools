/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"

import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useIrregularIncomeStore } from '@/store/irregular-income.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Save, Lock, Download, CheckCircle2, Share2, ShieldAlert, Activity, Target, AlertTriangle } from "lucide-react"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useIrregularIncomeStore()
  const metrics = store.getDerivedMetrics()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'
  
    const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)
  
  // Local state for income history inputs (last 6 months)
  const [incomeInput, setIncomeInput] = useState<string>(store.incomeHistory.join(', '))

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.essentialLiving !== undefined) store.setEssentialLiving(state.essentialLiving)
          if (state.bizOverhead !== undefined) store.setBizOverhead(state.bizOverhead)
          if (state.incomeHistory !== undefined) {
            store.setIncomeHistory(state.incomeHistory)
            setIncomeInput(state.incomeHistory.join(', '))
          }
          if (state.topClientShare !== undefined) store.setTopClientShare(state.topClientShare)
          if (state.avgDSO !== undefined) store.setAvgDSO(state.avgDSO)
          if (state.currentBuffer !== undefined) store.setCurrentBuffer(state.currentBuffer)
          if (state.targetMonthsToBuild !== undefined) store.setTargetMonthsToBuild(state.targetMonthsToBuild)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncomeInput(e.target.value)
    // Parse comma separated values
    const vals = e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n))
    if (vals.length > 0) {
      store.setIncomeHistory(vals)
    }
  }

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    
    setIsSaving(true)
    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'irregular-income-buffer-calculator',
        category: 'Freelance & Business',
        saved_name: `Buffer Target: ${currencySymbol}${Math.round(metrics.finalRecommendedBuffer)}`,
        input_state: {
          essentialLiving: store.essentialLiving,
          bizOverhead: store.bizOverhead,
          incomeHistory: store.incomeHistory,
          topClientShare: store.topClientShare,
          avgDSO: store.avgDSO,
          currentBuffer: store.currentBuffer,
          targetMonthsToBuild: store.targetMonthsToBuild
        },
        core_metric: Math.round(metrics.finalRecommendedBuffer)
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
    "Mean Monthly Income": `${currency} ${Math.round(metrics.meanIncome)}`,
    "Baseline Monthly Expense": `${currency} ${store.essentialLiving + store.bizOverhead}`,
    "Volatility Category": metrics.volatilityCategory,
    "Required Buffer Months": metrics.bufferMonthsRequired,
    "Target Buffer Amount": `${currency} ${Math.round(metrics.finalRecommendedBuffer)}`,
    "Current Savings": `${currency} ${store.currentBuffer}`,
    "Buffer Gap": `${currency} ${Math.round(metrics.bufferGap)}`,
    "Monthly Savings Target": `${currency} ${Math.round(metrics.monthlySavingsTarget)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/tools/irregular-income-buffer-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/tools/irregular-income-buffer-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-10">
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Activity className="h-5 w-5 text-muted-foreground" />
            Income Volatility & Expenses
          </h2>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Past Monthly Net Income (Last 3-6 months)</label>
            <p className="text-xs text-muted-foreground">Separate months with commas (e.g. 5000, 3200, 7500)</p>
            <Input 
              type="text" 
              value={incomeInput}
              onChange={handleIncomeChange}
              className="text-lg font-medium bg-muted/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Essential Living Costs</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.essentialLiving || ''}
                  onChange={(e) => store.setEssentialLiving(Number(e.target.value))}
                  className="pl-7 bg-muted/50"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Business Overhead</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.bizOverhead || ''}
                  onChange={(e) => store.setBizOverhead(Number(e.target.value))}
                  className="pl-7 bg-muted/50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <ShieldAlert className="h-5 w-5 text-muted-foreground" />
            Risk Factors & Current Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold">Top Client Concentration</label>
                  <p className="text-xs text-muted-foreground">% of revenue from biggest client.</p>
                </div>
                <span className="text-lg font-bold text-foreground">{store.topClientShare}%</span>
              </div>
              <Slider 
                value={[store.topClientShare]} 
                max={100} step={1}
                onValueChange={(val: any) => store.setTopClientShare(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold">Average Invoice Delay</label>
                  <p className="text-xs text-muted-foreground">Days Sales Outstanding (DSO)</p>
                </div>
                <span className="text-lg font-bold text-foreground">{store.avgDSO} days</span>
              </div>
              <Slider 
                value={[store.avgDSO]} 
                max={120} step={15}
                onValueChange={(val: any) => store.setAvgDSO(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Current Cash Buffer</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.currentBuffer || ''}
                  onChange={(e) => store.setCurrentBuffer(Number(e.target.value))}
                  className="pl-7 bg-muted/50"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Target Build Time</label>
              <select 
                value={store.targetMonthsToBuild}
                onChange={(e) => store.setTargetMonthsToBuild(Number(e.target.value))}
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-muted/50 text-sm"
              >
                <option value={3}>3 Months</option>
                <option value={6}>6 Months</option>
                <option value={12}>12 Months</option>
                <option value={18}>18 Months</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-emerald-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Saved to Scenario Vault!</span>
          </div>
        )}

        <div className="bg-card border shadow-sm rounded-2xl p-0 overflow-hidden relative">
          <div className={`absolute top-0 left-0 w-full h-1 ${metrics.bufferGap === 0 ? 'bg-emerald-500' : 'bg-primary'}`}></div>
          
          <div className="p-6 md:p-8">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
              Recommended Target Buffer
            </h3>
            
            <div className="flex items-baseline gap-2 text-foreground mb-6">
              <span className="text-5xl font-black tracking-tighter">{currencySymbol}{Math.round(metrics.finalRecommendedBuffer).toLocaleString()}</span>
              <span className="text-lg font-semibold opacity-70">({metrics.bufferMonthsRequired.toFixed(1)} mos)</span>
            </div>

            {metrics.meanIncome < metrics.baselineExpense && (
              <div className="bg-primary/5 text-foreground/80 p-4 rounded-2xl flex gap-2 items-start text-sm mb-6 border border-primary/20 shadow-sm">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <p><strong>Warning:</strong> Your average monthly income (${Math.round(metrics.meanIncome)}) is lower than your baseline expenses (${Math.round(metrics.baselineExpense)}). Focus on increasing rates before building a buffer.</p>
              </div>
            )}

            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60">
                <span className="text-muted-foreground">Baseline Monthly Burn</span>
                <span className="font-semibold">{currencySymbol}{Math.round(metrics.baselineExpense).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60">
                <span className="text-muted-foreground">Income Volatility Class</span>
                <span className={`font-semibold ${metrics.volatilityCategory === 'High' ? 'text-red-500' : metrics.volatilityCategory === 'Medium' ? 'text-primary' : 'text-emerald-500'}`}>
                  {metrics.volatilityCategory} ({Math.round(metrics.volatilityIndex * 100)}%)
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60 text-emerald-600/80">
                <span>Current Savings</span>
                <span>{currencySymbol}{Math.round(store.currentBuffer).toLocaleString()}</span>
              </div>
            </div>

            {metrics.bufferGap > 0 ? (
              <div className="mt-8 bg-primary/5 rounded-2xl p-6 border border-primary/20 shadow-sm text-foreground/80">
                <h4 className="text-xs uppercase tracking-wider font-bold text-foreground/80/60 mb-2">Buffer Gap Remaining</h4>
                <div className="flex items-baseline gap-2 text-foreground/80 mb-2">
                  <span className="text-3xl font-black tracking-tighter">{currencySymbol}{Math.round(metrics.bufferGap).toLocaleString()}</span>
                </div>
                <p className="text-sm font-medium text-foreground/80/70">
                  Save <strong>{currencySymbol}{Math.round(metrics.monthlySavingsTarget).toLocaleString()} / month</strong> for the next {store.targetMonthsToBuild} months to hit your target.
                </p>
              </div>
            ) : (
              <div className="mt-8 bg-primary/5 rounded-2xl p-6 border border-primary/20 shadow-sm text-foreground/80">
                <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-800/60 mb-2">Goal Achieved</h4>
                <div className="flex items-baseline gap-2 text-emerald-900 mb-2">
                  <span className="text-2xl font-black tracking-tighter">Fully Funded!</span>
                </div>
                <p className="text-sm font-medium text-emerald-900/70">
                  Your current buffer of ${store.currentBuffer.toLocaleString()} exceeds your target. Consider investing excess cash into growth assets.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
                <CalculatorActions
              slug="irregular-income-buffer-calculator"
              onSave={handleSave}
              isSaving={isSaving}
              isPro={isPro}
              exportData={exportData}
              exportFilename="IncomeBuffer"
              onRequirePro={() => setShowProModal(true)}
              shareUrl={shareUrl}
            />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
