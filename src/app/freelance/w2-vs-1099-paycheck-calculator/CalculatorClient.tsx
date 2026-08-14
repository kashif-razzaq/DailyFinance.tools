'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Banknote, Building, Briefcase, Calculator } from "lucide-react"
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export default function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [w2Salary, setW2Salary] = useState(100000)
  const [w2Benefits, setW2Benefits] = useState(15000)
  const [contractorHourly, setContractorHourly] = useState(75)
  const [hoursPerWeek, setHoursPerWeek] = useState(40)
  const [weeksPerYear, setWeeksPerYear] = useState(48)
  const [businessExpenses, setBusinessExpenses] = useState(10000)
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(20)

  const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)

  const [results, setResults] = useState({
    w2Gross: 0,
    w2Fica: 0,
    w2IncomeTax: 0,
    w2Net: 0,
    w2TotalValue: 0,
    
    cGross: 0,
    cExpenses: 0,
    cNetBusiness: 0,
    cSeTax: 0,
    cIncomeTax: 0,
    cNetTakeHome: 0,

    premiumNeeded: 0,
    equivalentHourly: 0
  })

  useEffect(() => {
    // Load saved scenario if savedId is in URL
    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.w2Salary !== undefined) setW2Salary(state.w2Salary as any)
          if (state.w2Benefits !== undefined) setW2Benefits(state.w2Benefits as any)
          if (state.contractorHourly !== undefined) setContractorHourly(state.contractorHourly as any)
          if (state.hoursPerWeek !== undefined) setHoursPerWeek(state.hoursPerWeek as any)
          if (state.weeksPerYear !== undefined) setWeeksPerYear(state.weeksPerYear as any)
          if (state.businessExpenses !== undefined) setBusinessExpenses(state.businessExpenses as any)
          if (state.effectiveTaxRate !== undefined) setEffectiveTaxRate(state.effectiveTaxRate as any)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  useEffect(() => {
    const safeW2Salary = w2Salary || 0
    const safeW2Benefits = w2Benefits || 0
    const safeContractorHourly = contractorHourly || 0
    const safeHoursPerWeek = hoursPerWeek || 0
    const safeWeeksPerYear = weeksPerYear || 0
    const safeBusinessExpenses = businessExpenses || 0
    const safeEffectiveTaxRate = effectiveTaxRate || 0

    const wFica = safeW2Salary * 0.0765
    const wTax = safeW2Salary * (safeEffectiveTaxRate / 100)
    const wNet = safeW2Salary - wFica - wTax
    const wTotalValue = wNet + safeW2Benefits

    const cGross = safeContractorHourly * safeHoursPerWeek * safeWeeksPerYear
    const cNetBusiness = cGross - safeBusinessExpenses
    
    const cSeTax = Math.max(0, cNetBusiness * 0.9235 * 0.153)
    const qbi = Math.max(0, (cNetBusiness - (cSeTax / 2)) * 0.2)
    const cTaxable = Math.max(0, cNetBusiness - (cSeTax / 2) - qbi)
    
    const cTax = cTaxable * (safeEffectiveTaxRate / 100)
    const cNetTakeHome = cNetBusiness - cSeTax - cTax

    const targetNet = wTotalValue
    let equivalentGross = targetNet * 1.35 + safeBusinessExpenses 
    let equivalentHourly = (safeHoursPerWeek * safeWeeksPerYear) > 0 ? equivalentGross / (safeHoursPerWeek * safeWeeksPerYear) : 0

    setResults({
      w2Gross: safeW2Salary,
      w2Fica: wFica,
      w2IncomeTax: wTax,
      w2Net: wNet,
      w2TotalValue: wTotalValue,
      cGross,
      cExpenses: safeBusinessExpenses,
      cNetBusiness,
      cSeTax,
      cIncomeTax: cTax,
      cNetTakeHome,
      premiumNeeded: safeW2Salary > 0 ? ((cGross / safeW2Salary) - 1) * 100 : 0,
      equivalentHourly
    })
  }, [w2Salary, w2Benefits, contractorHourly, hoursPerWeek, weeksPerYear, businessExpenses, effectiveTaxRate])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }

  const handleNumChange = (setter: any) => (e: any) => {
    const val = parseFloat(e.target.value)
    setter(isNaN(val) ? 0 : val)
  }

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    
    setIsSaving(true)
    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'w2-vs-1099-paycheck-calculator',
        category: 'Freelance',
        saved_name: `Comparison: 1099 Net ${formatCurrency(results.cNetTakeHome)}`,
        input_state: {
          w2Salary,
          w2Benefits,
          contractorHourly,
          hoursPerWeek,
          weeksPerYear,
          businessExpenses,
          effectiveTaxRate
        },
        core_metric: results.cNetTakeHome
      })
      if (savedResult?.id) {
        setSavedScenarioId(savedResult.id)
      }
    } catch (error) {
      console.error(error)
      alert("Failed to save. Ensure you are logged in properly.")
    } finally {
      setIsSaving(false)
    }
  }

  const exportData = [{
    "W-2 Gross Salary": formatCurrency(results.w2Gross),
    "W-2 Net Take-Home": formatCurrency(results.w2Net),
    "W-2 Total Value (w/ benefits)": formatCurrency(results.w2TotalValue),
    "1099 Gross Income": formatCurrency(results.cGross),
    "1099 Business Expenses": formatCurrency(results.cExpenses),
    "1099 Net Take-Home": formatCurrency(results.cNetTakeHome),
    "1099 Equivalent Hourly Required": formatCurrency(results.equivalentHourly)
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/freelance/w2-vs-1099-paycheck-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/freelance/w2-vs-1099-paycheck-calculator`

  return (
    <div className="w-full space-y-8">
      <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold flex items-center mb-6">
          <Banknote className="w-5 h-5 text-primary mr-2" />
          The True Take-Home Comparison
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-muted/50 border border-border">
            <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
              <Building className="w-4 h-4 mr-2" />
              W-2 Employee Value
            </div>
            <div className="text-4xl font-black tracking-tight text-foreground">
              {formatCurrency(results.w2TotalValue)}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Includes {formatCurrency(results.w2Net)} net cash + {formatCurrency(w2Benefits || 0)} benefits
            </div>
          </div>

          <div className="p-6 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 relative overflow-hidden">
            <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-1 flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              1099 Contractor Net Cash
            </div>
            <div className="text-4xl font-black text-emerald-900 dark:text-emerald-300 tracking-tight">
              {formatCurrency(results.cNetTakeHome)}
            </div>
            <div className="text-sm text-emerald-700/80 dark:text-emerald-400/80 mt-2">
              After {formatCurrency(results.cSeTax)} SE Tax & Expenses
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
        <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full space-y-10">
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
              <Calculator className="h-5 w-5 text-muted-foreground" />
              Salary & Rate Inputs
            </h2>

            <div>
              <label className="flex justify-between text-sm font-medium mb-2">
                <span>W-2 Annual Salary</span>
                <span className="text-primary font-mono">{formatCurrency(w2Salary || 0)}</span>
              </label>
              <Slider
                value={[w2Salary || 0]}
                onValueChange={(val: any) => setW2Salary(Array.isArray(val) ? val[0] : val)}
                min={40000}
                max={300000}
                step={1000}
                className="py-2"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium mb-2">
                <span>Value of W-2 Benefits (Health, 401k)</span>
                <span className="text-primary font-mono">{formatCurrency(w2Benefits || 0)}</span>
              </label>
              <Slider
                value={[w2Benefits || 0]}
                onValueChange={(val: any) => setW2Benefits(Array.isArray(val) ? val[0] : val)}
                min={0}
                max={40000}
                step={500}
                className="py-2"
              />
            </div>

            <div className="border-t border-border/60 my-6"></div>

            <div>
              <label className="flex justify-between text-sm font-medium mb-2">
                <span>1099 Hourly Rate</span>
                <span className="text-primary font-mono">{formatCurrency(contractorHourly || 0)}/hr</span>
              </label>
              <Slider
                value={[contractorHourly || 0]}
                onValueChange={(val: any) => setContractorHourly(Array.isArray(val) ? val[0] : val)}
                min={20}
                max={300}
                step={5}
                className="py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Billable Hours / Wk</label>
                <Input 
                  type="number" 
                  value={hoursPerWeek === 0 ? '' : hoursPerWeek} 
                  onChange={handleNumChange(setHoursPerWeek)}
                  className="font-mono bg-muted/50 focus:bg-background"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Weeks / Yr</label>
                <Input 
                  type="number" 
                  value={weeksPerYear === 0 ? '' : weeksPerYear} 
                  onChange={handleNumChange(setWeeksPerYear)}
                  className="font-mono bg-muted/50 focus:bg-background"
                />
              </div>
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium mb-2 mt-4">
                <span>Annual Business Expenses (1099)</span>
                <span className="text-primary font-mono">{formatCurrency(businessExpenses || 0)}</span>
              </label>
              <Slider
                value={[businessExpenses || 0]}
                onValueChange={(val: any) => setBusinessExpenses(Array.isArray(val) ? val[0] : val)}
                min={0}
                max={50000}
                step={1000}
                className="py-2"
              />
            </div>
            
            <div>
              <label className="flex justify-between text-sm font-medium mb-2">
                <span>Effective Income Tax Rate (Fed + State)</span>
                <span className="text-primary font-mono">{effectiveTaxRate || 0}%</span>
              </label>
              <Slider
                value={[effectiveTaxRate || 0]}
                onValueChange={(val: any) => setEffectiveTaxRate(Array.isArray(val) ? val[0] : val)}
                min={0}
                max={45}
                step={1}
                className="py-2"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold mb-6">Tax & Deduction Breakdown</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">W-2 Breakdown</h4>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border/60">
                    <span className="text-muted-foreground">Gross Salary</span>
                    <span className="text-foreground font-medium">{formatCurrency(results.w2Gross)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/60 text-red-600 dark:text-red-400">
                    <span>FICA Tax (7.65%)</span>
                    <span>-{formatCurrency(results.w2Fica)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/60 text-red-600 dark:text-red-400">
                    <span>Income Tax</span>
                    <span>-{formatCurrency(results.w2IncomeTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 bg-muted/50 px-3 rounded-lg font-bold">
                    <span className="text-foreground font-sans">Net Cash Take-Home</span>
                    <span className="text-foreground">{formatCurrency(results.w2Net)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">1099 Breakdown</h4>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border/60">
                    <span className="text-muted-foreground">Gross 1099 Income</span>
                    <span className="text-foreground font-medium">{formatCurrency(results.cGross)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/60 text-amber-600 dark:text-amber-500">
                    <span>Business Expenses</span>
                    <span>-{formatCurrency(results.cExpenses)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/60 text-red-600 dark:text-red-400">
                    <span>Self-Employment Tax (15.3%)</span>
                    <span>-{formatCurrency(results.cSeTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/60 text-red-600 dark:text-red-400">
                    <span>Income Tax (After QBI)</span>
                    <span>-{formatCurrency(results.cIncomeTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 bg-emerald-50/50 dark:bg-emerald-950/20 px-3 rounded-lg font-bold">
                    <span className="text-emerald-900 dark:text-emerald-400 font-sans">Net Cash Take-Home</span>
                    <span className="text-emerald-700 dark:text-emerald-500">{formatCurrency(results.cNetTakeHome)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-200 dark:border-amber-900">
             <h3 className="text-md font-bold text-amber-900 dark:text-amber-500 mb-2">The "Rule of Thumb" Check</h3>
             <p className="text-amber-800 dark:text-amber-200/80 text-sm mb-4">
               To exactly match the financial value of the <strong className="font-mono">{formatCurrency(results.w2Gross)}</strong> W-2 job, you generally need to charge around <strong className="font-mono text-lg">{formatCurrency(results.equivalentHourly)}/hr</strong> as a 1099 contractor.
             </p>
             <p className="text-amber-800/80 dark:text-amber-200/60 text-xs">
               *This is a simplified estimate utilizing a 20% Qualified Business Income (QBI) deduction assumption.
             </p>
          </div>
          
          <CalculatorActions 
            slug="w2-vs-1099-paycheck-calculator"
            onSave={handleSave}
            isSaving={isSaving}
            isPro={isPro}
            exportData={exportData}
            exportFilename="w2-vs-1099.csv"
            onRequirePro={() => setShowProModal(true)}
            shareUrl={shareUrl}
          />
        </div>
      </div>
      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
