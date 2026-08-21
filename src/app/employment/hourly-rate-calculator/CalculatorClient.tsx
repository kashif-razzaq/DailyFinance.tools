/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { Calculator, Clock, Calendar, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'

  const [calcMode, setCalcMode] = useState<'salaryToHourly' | 'hourlyToSalary'>('salaryToHourly')
  
  // Inputs
  const [annualSalary, setAnnualSalary] = useState(60000)
  const [hourlyWage, setHourlyWage] = useState(30)
  const [hoursPerWeek, setHoursPerWeek] = useState(40)
  const [weeksPerYear, setWeeksPerYear] = useState(52)

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
          if (state.calcMode) setCalcMode(state.calcMode as any)
          if (state.annualSalary !== undefined) setAnnualSalary(state.annualSalary as number)
          if (state.hourlyWage !== undefined) setHourlyWage(state.hourlyWage as number)
          if (state.hoursPerWeek !== undefined) setHoursPerWeek(state.hoursPerWeek as number)
          if (state.weeksPerYear !== undefined) setWeeksPerYear(state.weeksPerYear as number)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  // Derived metrics
  let derivedSalary = 0;
  let derivedHourly = 0;
  
  if (calcMode === 'salaryToHourly') {
    derivedSalary = annualSalary;
    derivedHourly = annualSalary / (hoursPerWeek * weeksPerYear);
  } else {
    derivedHourly = hourlyWage;
    derivedSalary = hourlyWage * hoursPerWeek * weeksPerYear;
  }

  const monthlyWage = derivedSalary / 12;
  const weeklyWage = derivedSalary / weeksPerYear;
  const dailyWage = weeklyWage / (hoursPerWeek / 8); // Assuming standard 8-hour days for presentation

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    setIsSaving(true)

    const coreMetric = Math.round(derivedSalary)
    const savedName = calcMode === 'salaryToHourly' 
      ? `Salary to Hourly: ${currencySymbol}${annualSalary}` 
      : `Hourly to Salary: ${currencySymbol}${hourlyWage}/hr`

    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'employment/hourly-rate-calculator',
        category: 'Employment & Salary',
        saved_name: savedName,
        input_state: {
          calcMode,
          annualSalary,
          hourlyWage,
          hoursPerWeek,
          weeksPerYear
        },
        core_metric: coreMetric
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
    "Calculation Mode": calcMode === 'salaryToHourly' ? "Salary to Hourly" : "Hourly to Salary",
    "Annual Salary": `${currencySymbol}${Math.round(derivedSalary)}`,
    "Monthly Wage": `${currencySymbol}${Math.round(monthlyWage)}`,
    "Weekly Wage": `${currencySymbol}${Math.round(weeklyWage)}`,
    "Daily Wage": `${currencySymbol}${Math.round(dailyWage)}`,
    "Hourly Rate": `${currencySymbol}${derivedHourly.toFixed(2)}`,
    "Hours Per Week": hoursPerWeek,
    "Weeks Worked Per Year": weeksPerYear
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/employment/hourly-rate-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/employment/hourly-rate-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      <div className="lg:col-span-4 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-8">
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Calculator className="h-5 w-5 text-muted-foreground" />
            Conversion Mode
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div
              onClick={() => setCalcMode('salaryToHourly')}
              className={`p-3 text-center rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                calcMode === 'salaryToHourly'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 font-bold'
                  : 'border-border/60 hover:border-blue-500/50 text-muted-foreground'
              }`}
            >
              <span className="text-xs leading-none">Salary to Hourly</span>
            </div>
            <div
              onClick={() => setCalcMode('hourlyToSalary')}
              className={`p-3 text-center rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                calcMode === 'hourlyToSalary'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 font-bold'
                  : 'border-border/60 hover:border-blue-500/50 text-muted-foreground'
              }`}
            >
              <span className="text-xs leading-none">Hourly to Salary</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {calcMode === 'salaryToHourly' ? (
            <div className="space-y-3 animate-in fade-in">
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
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in">
              <label className="text-sm font-semibold text-foreground">Hourly Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={hourlyWage === 0 ? '' : hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="pl-7 text-lg font-medium"
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" /> Hours Worked per Week
            </label>
            <Input
              type="number"
              value={hoursPerWeek === 0 ? '' : hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="text-lg font-medium"
            />
            <p className="text-xs text-muted-foreground">Standard full-time is 40 hours.</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Weeks Worked per Year
            </label>
            <Input
              type="number"
              value={weeksPerYear === 0 ? '' : weeksPerYear}
              onChange={(e) => setWeeksPerYear(Number(e.target.value))}
              className="text-lg font-medium"
            />
            <p className="text-xs text-muted-foreground">Standard year is 52 weeks (including paid time off).</p>
          </div>
        </div>

      </div>

      <div className="lg:col-span-8 space-y-6 lg:sticky lg:top-8 relative z-20">
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-blue-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        <div className="bg-card border shadow-sm rounded-2xl overflow-hidden p-6 md:p-10 space-y-8">
          
          {calcMode === 'salaryToHourly' ? (
            <div className="text-center animate-in fade-in">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Equivalent Hourly Rate</h3>
              <p className="text-5xl md:text-6xl font-extrabold text-blue-600">{currencySymbol}{derivedHourly.toFixed(2)}<span className="text-2xl text-muted-foreground">/hr</span></p>
              <p className="text-sm text-muted-foreground mt-4 font-medium">Based on {hoursPerWeek} hours/week for {weeksPerYear} weeks.</p>
            </div>
          ) : (
            <div className="text-center animate-in fade-in">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Equivalent Annual Salary</h3>
              <p className="text-5xl md:text-6xl font-extrabold text-blue-600">{currencySymbol}{Math.round(derivedSalary).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-4 font-medium">Based on {currencySymbol}{hourlyWage}/hr at {hoursPerWeek} hours/week.</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-muted/50 p-4 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground font-semibold mb-1">Yearly</p>
              <p className="text-lg font-bold text-foreground">{currencySymbol}{Math.round(derivedSalary).toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground font-semibold mb-1">Monthly</p>
              <p className="text-lg font-bold text-foreground">{currencySymbol}{Math.round(monthlyWage).toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground font-semibold mb-1">Weekly</p>
              <p className="text-lg font-bold text-foreground">{currencySymbol}{Math.round(weeklyWage).toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground font-semibold mb-1">Daily</p>
              <p className="text-lg font-bold text-foreground">{currencySymbol}{Math.round(dailyWage).toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Gross Earnings:</strong> This calculator displays gross income before taxes. To see your true net income after FICA and state taxes, use our <a href="/employment/take-home-pay-calculator" className="underline font-bold text-blue-600">Take Home Pay Calculator</a>.
            </p>
          </div>

        </div>

        <CalculatorActions
          slug="employment/hourly-rate-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Hourly_Rate_Calculator_Export"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
