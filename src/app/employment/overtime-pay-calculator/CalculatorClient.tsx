/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { CheckCircle2, Clock, Calculator, AlertTriangle } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'

  const [hourlyRate, setHourlyRate] = useState(25)
  const [regularHours, setRegularHours] = useState(40)
  const [overtimeHours, setOvertimeHours] = useState(10)
  const [doubleTimeHours, setDoubleTimeHours] = useState(0)

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
          if (state.hourlyRate !== undefined) setHourlyRate(state.hourlyRate as number)
          if (state.regularHours !== undefined) setRegularHours(state.regularHours as number)
          if (state.overtimeHours !== undefined) setOvertimeHours(state.overtimeHours as number)
          if (state.doubleTimeHours !== undefined) setDoubleTimeHours(state.doubleTimeHours as number)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  // Math Logic
  const regularPay = hourlyRate * regularHours;
  
  const overtimeRate = hourlyRate * 1.5;
  const overtimePay = overtimeRate * overtimeHours;
  
  const doubleTimeRate = hourlyRate * 2;
  const doubleTimePay = doubleTimeRate * doubleTimeHours;

  const totalGrossPay = regularPay + overtimePay + doubleTimePay;

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    setIsSaving(true)

    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'employment/overtime-pay-calculator',
        category: 'Employment & Salary',
        saved_name: `Overtime on ${currencySymbol}${hourlyRate}/hr`,
        input_state: {
          hourlyRate,
          regularHours,
          overtimeHours,
          doubleTimeHours
        },
        core_metric: Math.round(totalGrossPay)
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
    "Hourly Rate": `${currencySymbol}${hourlyRate}`,
    "Regular Hours": regularHours,
    "Regular Pay": `${currencySymbol}${Math.round(regularPay)}`,
    "Overtime Hours": overtimeHours,
    "Overtime Rate (1.5x)": `${currencySymbol}${overtimeRate.toFixed(2)}`,
    "Overtime Pay": `${currencySymbol}${Math.round(overtimePay)}`,
    "Double Time Hours": doubleTimeHours,
    "Double Time Pay": `${currencySymbol}${Math.round(doubleTimePay)}`,
    "Total Gross Pay": `${currencySymbol}${Math.round(totalGrossPay)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/employment/overtime-pay-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/employment/overtime-pay-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      <div className="lg:col-span-4 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-8">
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Calculator className="h-5 w-5 text-muted-foreground" />
            Base Pay
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Standard Hourly Rate</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number"
                value={hourlyRate === 0 ? '' : hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="pl-7 text-lg font-medium"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Regular Hours Worked</label>
            <Input
              type="number"
              value={regularHours === 0 ? '' : regularHours}
              onChange={(e) => setRegularHours(Number(e.target.value))}
              className="text-lg font-medium"
            />
            <p className="text-xs text-muted-foreground">Usually capped at 40 before overtime kicks in.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Premium Hours
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Time-and-a-Half Hours (1.5x)</label>
            <Input
              type="number"
              value={overtimeHours === 0 ? '' : overtimeHours}
              onChange={(e) => setOvertimeHours(Number(e.target.value))}
              className="text-lg font-medium"
            />
            <p className="text-xs text-muted-foreground">Any hours worked over 40 in a week.</p>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Double-Time Hours (2.0x)</label>
            <Input
              type="number"
              value={doubleTimeHours === 0 ? '' : doubleTimeHours}
              onChange={(e) => setDoubleTimeHours(Number(e.target.value))}
              className="text-lg font-medium"
            />
            <p className="text-xs text-muted-foreground">Applies in certain states (like CA) for extreme hours or holidays.</p>
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
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Total Gross Pay</h3>
            <p className="text-5xl md:text-6xl font-extrabold text-blue-600">{currencySymbol}{Math.round(totalGrossPay).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-4 font-medium">For {Number(regularHours) + Number(overtimeHours) + Number(doubleTimeHours)} total hours worked.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
            <div className="bg-muted/50 p-4 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground font-semibold mb-1">Regular Pay</p>
              <p className="text-xl font-bold text-foreground">{currencySymbol}{Math.round(regularPay).toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900 text-center">
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">Overtime Pay (1.5x)</p>
              <p className="text-xl font-bold text-blue-700 dark:text-blue-500">{currencySymbol}{Math.round(overtimePay).toLocaleString()}</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900 text-center">
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">Double Time (2x)</p>
              <p className="text-xl font-bold text-indigo-700 dark:text-indigo-500">{currencySymbol}{Math.round(doubleTimePay).toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl mt-4">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Gross Pay Note:</strong> This calculates your gross earnings before taxes. To see your true take-home pay, use our <a href="/employment/take-home-pay-calculator" className="underline font-bold text-blue-600">Take Home Pay Calculator</a>.
            </p>
          </div>

        </div>

        <CalculatorActions
          slug="employment/overtime-pay-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Overtime_Pay_Calculation"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
