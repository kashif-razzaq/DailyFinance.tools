'use client'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"

import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useFreelanceTaxDeductionsStore } from '@/store/freelance-tax-deductions.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Save, Lock, Share2, Home, Receipt, Calculator, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useFreelanceTaxDeductionsStore()
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
          if (state.homeStatus !== undefined) store.setHomeStatus(state.homeStatus)
          if (state.officeSpace !== undefined) store.setOfficeSpace(state.officeSpace)
          if (state.totalHomeSpace !== undefined) store.setTotalHomeSpace(state.totalHomeSpace)
          if (state.monthlyRentMortgage !== undefined) store.setMonthlyRentMortgage(state.monthlyRentMortgage)
          if (state.annualUtilitiesInsurance !== undefined) store.setAnnualUtilitiesInsurance(state.annualUtilitiesInsurance)
          if (state.directRepairs !== undefined) store.setDirectRepairs(state.directRepairs)
          if (state.netBusinessIncome !== undefined) store.setNetBusinessIncome(state.netBusinessIncome)
          if (state.combinedTaxBracket !== undefined) store.setCombinedTaxBracket(state.combinedTaxBracket)
          if (state.homeValue !== undefined) store.setHomeValue(state.homeValue)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    
    setIsSaving(true)
    try {
      const optimalSavings = metrics.optimalMethod === 'Simplified' ? metrics.simplifiedTaxSavings : metrics.actualTaxSavings
      const optimalDeduction = metrics.optimalMethod === 'Simplified' ? metrics.simplifiedDeduction : metrics.actualDeduction

      const savedResult = await saveCalculatorAction({
        calculator_slug: 'freelance-tax-deductions-calculator',
        category: 'Freelance & Business',
        saved_name: `Est Savings: ${currencySymbol}${Math.round(optimalSavings)}`,
        input_state: {
          homeStatus: store.homeStatus,
          officeSpace: store.officeSpace,
          totalHomeSpace: store.totalHomeSpace,
          monthlyRentMortgage: store.monthlyRentMortgage,
          annualUtilitiesInsurance: store.annualUtilitiesInsurance,
          directRepairs: store.directRepairs,
          netBusinessIncome: store.netBusinessIncome,
          combinedTaxBracket: store.combinedTaxBracket,
          homeValue: store.homeValue
        },
        core_metric: Math.round(optimalDeduction)
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
    "Home Status": store.homeStatus,
    "Office Space SqFt": store.officeSpace,
    "Business Use %": metrics.businessUsePct.toFixed(1) + '%',
    "Simplified Deduction Limit": store.officeSpace > 300 ? "Capped at 300 sqft" : "No Cap",
    "Simplified Deduction Total": Math.round(metrics.simplifiedDeduction),
    "Actual Expense Deduction Total": `${currency} ${Math.round(metrics.actualDeduction)}`,
    "Optimal Method Recommended": metrics.optimalMethod
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/tools/freelance-tax-deductions-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/tools/freelance-tax-deductions-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-6 xl:col-span-5 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-10">
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Home className="h-5 w-5 text-muted-foreground" />
            Home Office Details
          </h2>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground block">Living Status</label>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={store.homeStatus === 'Renter' ? 'default' : 'outline'} 
                className={store.homeStatus === 'Renter' ? 'bg-primary hover:bg-primary/90' : ''}
                onClick={() => store.setHomeStatus('Renter')}
              >
                Renter
              </Button>
              <Button 
                variant={store.homeStatus === 'Homeowner' ? 'default' : 'outline'} 
                className={store.homeStatus === 'Homeowner' ? 'bg-primary hover:bg-primary/90' : ''}
                onClick={() => store.setHomeStatus('Homeowner')}
              >
                Homeowner
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Office Size</label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.officeSpace || ''}
                  onChange={(e) => store.setOfficeSpace(Number(e.target.value))}
                  className="bg-muted/50 text-right pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">sq ft</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Total Home Size</label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.totalHomeSpace || ''}
                  onChange={(e) => store.setTotalHomeSpace(Number(e.target.value))}
                  className="bg-muted/50 text-right pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">sq ft</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground font-semibold px-2">
            <span>Business Use %:</span>
            <span className="text-primary">{metrics.businessUsePct.toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Receipt className="h-5 w-5 text-muted-foreground" />
            Home Expenses
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Monthly {store.homeStatus === 'Renter' ? 'Rent' : 'Mortgage'}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.monthlyRentMortgage || ''}
                  onChange={(e) => store.setMonthlyRentMortgage(Number(e.target.value))}
                  className="pl-7 bg-muted/50"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Annual Utilities</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.annualUtilitiesInsurance || ''}
                  onChange={(e) => store.setAnnualUtilitiesInsurance(Number(e.target.value))}
                  className="pl-7 bg-muted/50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Direct Office Repairs (Annual)</label>
            <p className="text-xs text-muted-foreground">Repairs made entirely within the home office itself (e.g. painting the office).</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input 
                type="number" 
                value={store.directRepairs || ''}
                onChange={(e) => store.setDirectRepairs(Number(e.target.value))}
                className="pl-7 bg-muted/50"
              />
            </div>
          </div>

          {store.homeStatus === 'Homeowner' && (
            <div className="space-y-3 pt-4 border-t border-border/50">
              <label className="text-sm font-semibold text-foreground flex justify-between">
                <span>Total Home Value</span>
                <span className="text-primary text-xs font-normal">For Depreciation calc</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.homeValue || ''}
                  onChange={(e) => store.setHomeValue(Number(e.target.value))}
                  className="pl-7 bg-muted/50"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Calculator className="h-5 w-5 text-muted-foreground" />
            Tax Bracket Check
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Net Biz Income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.netBusinessIncome || ''}
                  onChange={(e) => store.setNetBusinessIncome(Number(e.target.value))}
                  className="pl-7 bg-muted/50"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Tax Bracket</label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.combinedTaxBracket || ''}
                  onChange={(e) => store.setCombinedTaxBracket(Number(e.target.value))}
                  className="bg-muted/50 pr-8 text-right"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Comparative Results */}
      <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-emerald-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Saved to Scenario Vault!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Simplified Method */}
          <div className={`rounded-xl p-6 border-2 transition-all duration-300 relative ${metrics.optimalMethod === 'Simplified' ? 'border-emerald-500 bg-emerald-50/50 shadow-md scale-100' : 'border-border bg-card scale-95 opacity-80'}`}>
            {metrics.optimalMethod === 'Simplified' && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase shadow-sm tracking-wider">
                Recommended
              </div>
            )}
            
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">Simplified Method</h3>
            <p className="text-xs text-muted-foreground mb-6">IRS capped at $5/sq ft max 300 sq ft.</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-muted-foreground">Total Write-Off</span>
                <span className="text-2xl font-black">{currencySymbol}{Math.round(metrics.simplifiedDeduction).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-emerald-700/80">Est. Tax Savings</span>
                <span className="text-lg font-bold text-emerald-700">{currencySymbol}{Math.round(metrics.simplifiedTaxSavings).toLocaleString()}</span>
              </div>
            </div>

            <ul className="text-xs space-y-2 text-muted-foreground">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0"/> No complicated Form 8829 needed</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0"/> No depreciation recapture on home sale</li>
              {store.officeSpace > 300 && (
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-primary shrink-0"/> Limited: Cap reached at 300 sq ft.</li>
              )}
            </ul>
          </div>

          {/* Actual Expenses Method */}
          <div className={`rounded-xl p-6 border-2 transition-all duration-300 relative ${metrics.optimalMethod === 'Actual Expenses' ? 'border-emerald-500 bg-emerald-50/50 shadow-md scale-100' : 'border-border bg-card scale-95 opacity-80'}`}>
             {metrics.optimalMethod === 'Actual Expenses' && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase shadow-sm tracking-wider">
                Recommended
              </div>
            )}
            <h3 className="font-bold text-lg mb-1">Actual Expenses</h3>
            <p className="text-xs text-muted-foreground mb-6">Form 8829 Based on {metrics.businessUsePct.toFixed(1)}% usage.</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-muted-foreground">Total Write-Off</span>
                <span className="text-2xl font-black">{currencySymbol}{Math.round(metrics.actualDeduction).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-emerald-700/80">Est. Tax Savings</span>
                <span className="text-lg font-bold text-emerald-700">{currencySymbol}{Math.round(metrics.actualTaxSavings).toLocaleString()}</span>
              </div>
            </div>

            <ul className="text-xs space-y-2 text-muted-foreground">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0"/> Higher deduction ceiling</li>
              {store.homeStatus === 'Homeowner' ? (
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-primary shrink-0"/> Triggers deprecation recapture on sale</li>
              ) : (
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0"/> Includes rent payments</li>
              )}
              <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-primary shrink-0"/> Requires keeping all expense receipts</li>
            </ul>
          </div>

        </div>

        {store.homeStatus === 'Homeowner' && metrics.optimalMethod === 'Actual Expenses' && (
          <div className="bg-primary/5 text-foreground/80 border border-primary/20 rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> Depreciation Warning</h4>
            <p className="text-sm leading-relaxed">
              While the Actual Expenses method yields a higher deduction today, it includes <strong>{currencySymbol}{Math.round(metrics.depreciationAmount).toLocaleString()}</strong> in mandatory depreciation. When you eventually sell this home, the IRS will tax this accumulated depreciation as "recapture" at up to 25%. Ensure the current tax savings justify the future tax liability.
            </p>
          </div>
        )}
        
        {store.homeStatus === 'Homeowner' && metrics.optimalMethod === 'Simplified' && (
          <div className="bg-primary/5 text-foreground/80 border rounded-xl p-5">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-foreground/80">Why we recommend Simplified</h4>
            <p className="text-sm leading-relaxed">
              Even though Actual Expenses might show a slightly higher write-off, the Simplified method avoids the headache of <strong>depreciation recapture</strong> when you sell your home. For small differences in deductions, the Simplified method is universally safer for homeowners.
            </p>
          </div>
        )}

        {/* Action Buttons */}
                <CalculatorActions
              slug="freelance-tax-deductions-calculator"
              onSave={handleSave}
              isSaving={isSaving}
              isPro={isPro}
              exportData={exportData}
              exportFilename="TaxDeduction"
              onRequirePro={() => setShowProModal(true)}
              shareUrl={shareUrl}
            />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
