/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { CheckCircle2, Calendar, Calculator, Clock } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'

  const [annualSalary, setAnnualSalary] = useState(75000)
  const [daysWorkedInPeriod, setDaysWorkedInPeriod] = useState(7)
  const [totalDaysInPeriod, setTotalDaysInPeriod] = useState(10) // Bi-weekly usually 10 working days

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
          if (state.annualSalary !== undefined) setAnnualSalary(state.annualSalary as number)
          if (state.daysWorkedInPeriod !== undefined) setDaysWorkedInPeriod(state.daysWorkedInPeriod as number)
          if (state.totalDaysInPeriod !== undefined) setTotalDaysInPeriod(state.totalDaysInPeriod as number)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  // Math Logic
  // Standard full-time work year is 260 working days (52 weeks * 5 days)
  const dailyRate = annualSalary / 260;
  const standardPeriodPay = dailyRate * totalDaysInPeriod;
  const proratedGrossPay = dailyRate * daysWorkedInPeriod;

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    setIsSaving(true)

    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'employment/prorated-salary-calculator',
        category: 'Employment & Salary',
        saved_name: `Prorated Check on ${currencySymbol}${annualSalary}`,
        input_state: {
          annualSalary,
          daysWorkedInPeriod,
          totalDaysInPeriod
        },
        core_metric: Math.round(proratedGrossPay)
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
    "Annual Salary": `${currencySymbol}${annualSalary}`,
    "Daily Rate": `${currencySymbol}${dailyRate.toFixed(2)}`,
    "Standard Period Pay": `${currencySymbol}${Math.round(standardPeriodPay)}`,
    "Days Worked": daysWorkedInPeriod,
    "Prorated Gross Pay": `${currencySymbol}${Math.round(proratedGrossPay)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/employment/prorated-salary-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/employment/prorated-salary-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      <div className="lg:col-span-4 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-8">
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Calculator className="h-5 w-5 text-muted-foreground" />
            Salary Details
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Annual Gross Salary</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number"
                value={annualSalary === 0 ? '' : annualSalary}
                onChange={(e) => setAnnualSalary(Number(e.target.value))}
                className="pl-7 text-lg font-medium"
              />
            </div>
            <p className="text-xs text-muted-foreground">Standard 260 working days per year.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            Pay Period Rules
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Total Working Days in Period</label>
            <Input
              type="number"
              value={totalDaysInPeriod === 0 ? '' : totalDaysInPeriod}
              onChange={(e) => setTotalDaysInPeriod(Number(e.target.value))}
              className="text-lg font-medium"
            />
            <p className="text-xs text-muted-foreground">Usually 10 days for bi-weekly, or ~22 for monthly.</p>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Actual Days Worked</label>
            <Input
              type="number"
              value={daysWorkedInPeriod === 0 ? '' : daysWorkedInPeriod}
              onChange={(e) => setDaysWorkedInPeriod(Number(e.target.value))}
              className="text-lg font-medium"
            />
            <p className="text-xs text-muted-foreground">How many days did you actually work before starting/leaving?</p>
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
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Prorated Gross Paycheck</h3>
            <p className="text-5xl md:text-6xl font-extrabold text-blue-600">{currencySymbol}{Math.round(proratedGrossPay).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-4 font-medium">For {daysWorkedInPeriod} days worked out of {totalDaysInPeriod}.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-muted/50 p-5 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground font-semibold mb-1">Standard Daily Rate</p>
              <p className="text-2xl font-bold text-foreground">{currencySymbol}{dailyRate.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 p-5 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground font-semibold mb-1">Standard Period Pay (Full)</p>
              <p className="text-2xl font-bold text-foreground">{currencySymbol}{Math.round(standardPeriodPay).toLocaleString()}</p>
            </div>
          </div>

        </div>

        <CalculatorActions
          slug="employment/prorated-salary-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Prorated_Salary_Calculation"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
