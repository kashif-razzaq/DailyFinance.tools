'use client'

import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useSCorpOptimizerStore } from '@/store/scorp-optimizer.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Save, Lock, Share2, Building2, Calculator, ArrowRight, CheckCircle2, AlertTriangle, TrendingDown } from "lucide-react"
import { ExportEngine } from "@/components/shared/ExportEngine"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ShareCalculatorModal } from "@/components/shared/ShareCalculatorModal"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useSCorpOptimizerStore()
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
          if (state.netBusinessIncome !== undefined) store.setNetBusinessIncome(state.netBusinessIncome)
          if (state.salaryRatio !== undefined) store.setSalaryRatio(state.salaryRatio)
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
        calculator_slug: 's-corp-salary-dividend-calculator',
        category: 'Freelance & Business',
        saved_name: `S-Corp Savings: ${currencySymbol}${Math.round(metrics.annualTaxSavings)}`,
        input_state: {
          netBusinessIncome: store.netBusinessIncome,
          salaryRatio: store.salaryRatio
        },
        core_metric: Math.round(metrics.annualTaxSavings)
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
    "Net Business Income": `${currency} ${store.netBusinessIncome}`,
    "Reasonable Salary %": `${store.salaryRatio}%`,
    "W-2 Salary Amount": `${currency} ${Math.round(metrics.sCorpW2Salary)}`,
    "Owner Distribution": `${currency} ${Math.round(metrics.sCorpDistribution)}`,
    "Sole Prop SE Tax": `${currency} ${Math.round(metrics.solePropSelfEmploymentTax)}`,
    "S-Corp FICA + FUTA Tax": `${currency} ${Math.round(metrics.totalSCorpPayrollTaxes)}`,
    "Gross FICA Savings": `${currency} ${Math.round(metrics.annualTaxSavings)}`,
    "Worth It?": metrics.isWorthIt ? "Yes" : "No"
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/tools/s-corp-salary-dividend-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/tools/s-corp-salary-dividend-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative pb-24 md:pb-0">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-12 xl:col-span-5 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-10">
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            Business Income
          </h2>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Annual Net Business Profit</label>
            <p className="text-xs text-muted-foreground">Your total revenue minus all business expenses, before taxes.</p>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-lg">{currencySymbol}</span>
              <Input 
                type="number" 
                value={store.netBusinessIncome || ''}
                onChange={(e) => store.setNetBusinessIncome(Number(e.target.value))}
                className="pl-8 bg-muted/50 text-2xl font-black h-14"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Calculator className="h-5 w-5 text-muted-foreground" />
            S-Corp Profit Split
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">"Reasonable Salary" Ratio (W-2)</label>
                <p className="text-xs text-muted-foreground mt-1">Rule of thumb is 40% to 60% of net income.</p>
              </div>
              <span className="text-xl font-bold text-foreground">{store.salaryRatio}%</span>
            </div>
            
            <Slider 
              value={[store.salaryRatio]} 
              min={10} max={100} step={1}
              onValueChange={(val: any) => store.setSalaryRatio(Array.isArray(val) ? val[0] : val)}
              className="py-4"
            />
          </div>
          
          {/* Split Visualization */}
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
            <div className="flex w-full h-3 rounded-full overflow-hidden mb-3">
              <div style={{ width: `${store.salaryRatio}%` }} className="bg-amber-500 h-full"></div>
              <div style={{ width: `${100 - store.salaryRatio}%` }} className="bg-emerald-500 h-full"></div>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <div className="text-amber-700">W-2 Salary: ${Math.round(metrics.sCorpW2Salary).toLocaleString()}</div>
              <div className="text-emerald-700">Distribution: ${Math.round(metrics.sCorpDistribution).toLocaleString()}</div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Comparative Results */}
      <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-emerald-50 text-emerald-600 border border-emerald-200 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Saved to Scenario Vault!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Default LLC Card */}
          <div className="bg-card border shadow-sm rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Default LLC (Sole Prop)</h3>
            
            <div className="space-y-4 font-mono text-sm border-b pb-4 mb-4">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Self-Employment Tax Rate</span>
                <span>15.3%</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Subject to SE Tax</span>
                <span>{currencySymbol}{Math.round(store.netBusinessIncome * 0.9235).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-wider">Total Payroll Taxes</p>
            <p className="text-3xl font-black text-foreground">{currencySymbol}{Math.round(metrics.solePropSelfEmploymentTax).toLocaleString()}</p>
          </div>

          {/* S-Corp Card */}
          <div className="bg-amber-50/50 border-2 border-amber-200 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase shadow-sm">Optimized</div>
            
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-800 mb-4">S-Corp Election</h3>
            
            <div className="space-y-4 font-mono text-sm border-b border-amber-200/50 pb-4 mb-4 text-amber-900/80">
              <div className="flex justify-between items-center">
                <span>FICA Tax (on salary only)</span>
                <span>{currencySymbol}{Math.round(metrics.sCorpFicaTax).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Unemployment Tax (Est.)</span>
                <span>{currencySymbol}{Math.round(metrics.sCorpUnemploymentTax).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-amber-800 mb-1 uppercase font-bold tracking-wider">Total Payroll Taxes</p>
            <p className="text-3xl font-black text-amber-700">{currencySymbol}{Math.round(metrics.totalSCorpPayrollTaxes).toLocaleString()}</p>
          </div>

        </div>

        {/* Savings Banner */}
        <div className={`mt-2 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border relative overflow-hidden ${
          metrics.isWorthIt ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-100 border-slate-300 text-slate-800'
        }`}>
          {metrics.isWorthIt && (
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          )}
          
          <div>
            <h4 className="font-bold text-xl mb-1 flex items-center gap-2">
              {metrics.isWorthIt ? <TrendingDown className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
              Gross FICA Savings
            </h4>
            <p className={`text-sm ${metrics.isWorthIt ? 'text-emerald-100' : 'text-slate-500'}`}>
              Savings on payroll taxes by electing S-Corp status.
            </p>
          </div>
          <div className="text-right">
            <span className="text-5xl font-black">{currencySymbol}{Math.round(metrics.annualTaxSavings).toLocaleString()}</span>
            <span className={`text-sm ml-1 ${metrics.isWorthIt ? 'text-emerald-100' : 'text-slate-500'}`}>/ year</span>
          </div>
        </div>

        {/* Advisory Warning */}
        <div className="bg-blue-50 text-blue-900 p-4 rounded-xl text-sm border border-blue-100 mt-2">
          <strong>Hidden Costs Advisory:</strong> Running an S-Corp typically costs <strong>$1,500 to $2,500/year</strong> in extra CPA fees, corporate tax return (Form 1120-S) preparation, and payroll software (like Gusto). 
          {metrics.isWorthIt ? (
            <span className="block mt-2 text-emerald-700 font-bold">✓ Since your gross savings (${Math.round(metrics.annualTaxSavings).toLocaleString()}) exceed these admin costs, an S-Corp election is likely highly profitable for you.</span>
          ) : (
            <span className="block mt-2 text-red-600 font-bold">✗ Since your gross savings (${Math.round(metrics.annualTaxSavings).toLocaleString()}) are lower than typical admin costs, an S-Corp election will likely LOSE you money. Stick to an LLC/Sole Prop.</span>
          )}
        </div>

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
                filename="SCorpOptimizer" 
                isPro={isPro}
                onRequirePro={() => setShowProModal(true)}
              />
            </div>
            <div className="flex-1">
            <ShareCalculatorModal url={shareUrl} slug="s-corp-salary-dividend-calculator" isPro={isPro}>
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
