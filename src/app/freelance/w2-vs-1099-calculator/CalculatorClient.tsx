'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Banknote, Building, Briefcase, Calculator, ArrowRightLeft, Target, TrendingUp, HelpCircle, CheckCircle2 } from "lucide-react"
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { useW2vs1099Store } from '@/store/w2-vs-1099.store'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useW2vs1099Store()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'
  const [mounted, setMounted] = useState(false)
  const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)
  const [shareUrl, setShareUrl] = useState("")
  
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const urlSavedId = searchParams.get('saved_id')
    if (urlSavedId && !savedScenarioId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.w2SalaryOrHourly !== undefined) store.setW2SalaryOrHourly(state.w2SalaryOrHourly as number)
          if (state.w2InputType !== undefined) store.setW2InputType(state.w2InputType as 'Annual' | 'Hourly')
          if (state.w2BenefitsValue !== undefined) store.setW2BenefitsValue(state.w2BenefitsValue as number)
          if (state.contractorRate !== undefined) store.setContractorRate(state.contractorRate as number)
          if (state.contractorInputType !== undefined) store.setContractorInputType(state.contractorInputType as 'Annual' | 'Hourly')
          if (state.hoursPerWeek !== undefined) store.setHoursPerWeek(state.hoursPerWeek as number)
          if (state.weeksPerYear !== undefined) store.setWeeksPerYear(state.weeksPerYear as number)
          if (state.businessExpenses !== undefined) store.setBusinessExpenses(state.businessExpenses as number)
          if (state.effectiveTaxRate !== undefined) store.setEffectiveTaxRate(state.effectiveTaxRate as number)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [searchParams])

  const metrics = store.getDerivedMetrics()

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    setIsSaving(true)
    try {
      const savedResult = await saveCalculatorAction({
        id: savedScenarioId || undefined,
        calculator_slug: 'freelance/w2-vs-1099-calculator',
        category: 'Freelance',
        saved_name: `1099 Equivalent: ${currencySymbol}${Math.round(metrics.equivalent1099Hourly)}/hr`,
        input_state: {
          w2SalaryOrHourly: store.w2SalaryOrHourly,
          w2InputType: store.w2InputType,
          w2BenefitsValue: store.w2BenefitsValue,
          contractorRate: store.contractorRate,
          contractorInputType: store.contractorInputType,
          hoursPerWeek: store.hoursPerWeek,
          weeksPerYear: store.weeksPerYear,
          businessExpenses: store.businessExpenses,
          effectiveTaxRate: store.effectiveTaxRate
        },
        core_metric: metrics.equivalent1099Hourly,
        is_public: false
      })
      if (!savedScenarioId && savedResult?.id) {
        setSavedScenarioId(savedResult.id)
        router.replace(`?saved_id=${savedResult.id}`, { scroll: false })
      }
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error: any) {
      if (error.message === 'Unauthorized') window.location.href = '/login?redirect=/freelance/w2-vs-1099-calculator'
      else console.error('Error saving:', error)
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams()
      params.set('w2', store.w2SalaryOrHourly.toString())
      params.set('1099', store.contractorRate.toString())
      setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`)
    }
  }, [store])

  const formatCurrency = (val: number) => `${currencySymbol}${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

  const exportData = [{
    'W2 Annual Gross': metrics.w2AnnualGross,
    'W2 Take Home Pay': metrics.w2Net,
    '1099 Annual Gross': metrics.cAnnualGross,
    '1099 Net Business Income': metrics.cNetBusiness,
    '1099 Net Take Home Pay': metrics.cNetTakeHome,
    'Equivalent 1099 Hourly': metrics.equivalent1099Hourly,
    'Equivalent 1099 Annual': metrics.equivalent1099Annual,
    'Equivalent W2 Hourly': metrics.equivalentW2Hourly,
    'Equivalent W2 Annual': metrics.equivalentW2Annual
  }]

  if (!mounted) return null

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 items-start relative">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="xl:col-span-5 flex flex-col space-y-6">
        
        {/* W2 Inputs */}
        <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-600" />
              W-2 Employee Details
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground flex justify-between">
                <span>Income Type</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant={store.w2InputType === 'Annual' ? 'default' : 'outline'} className={store.w2InputType === 'Annual' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''} onClick={() => store.setW2InputType('Annual')}>Annual Salary</Button>
                <Button variant={store.w2InputType === 'Hourly' ? 'default' : 'outline'} className={store.w2InputType === 'Hourly' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''} onClick={() => store.setW2InputType('Hourly')}>Hourly Rate</Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">W-2 {store.w2InputType}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input type="number" value={store.w2SalaryOrHourly || ''} onChange={(e) => store.setW2SalaryOrHourly(Number(e.target.value))} className="pl-7 h-11 bg-muted/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                Value of W-2 Benefits (Annual)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input type="number" value={store.w2BenefitsValue || ''} onChange={(e) => store.setW2BenefitsValue(Number(e.target.value))} className="pl-7 h-11 bg-muted/50" />
              </div>
              <p className="text-xs text-muted-foreground">Est. value of 401k match, health insurance subsidies, PTO.</p>
            </div>
          </div>
        </div>

        {/* 1099 Inputs */}
        <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-emerald-600" />
              1099 Contractor Details
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground flex justify-between">
                <span>Contractor Rate Type</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant={store.contractorInputType === 'Hourly' ? 'default' : 'outline'} className={store.contractorInputType === 'Hourly' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''} onClick={() => store.setContractorInputType('Hourly')}>Hourly Rate</Button>
                <Button variant={store.contractorInputType === 'Annual' ? 'default' : 'outline'} className={store.contractorInputType === 'Annual' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''} onClick={() => store.setContractorInputType('Annual')}>Annual Gross</Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">1099 {store.contractorInputType}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input type="number" value={store.contractorRate || ''} onChange={(e) => store.setContractorRate(Number(e.target.value))} className="pl-7 h-11 bg-muted/50" />
              </div>
            </div>

            {store.contractorInputType === 'Hourly' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Billable Hrs / Wk</label>
                  <Input type="number" value={store.hoursPerWeek || ''} onChange={(e) => store.setHoursPerWeek(Number(e.target.value))} className="h-11 bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Working Wks / Yr</label>
                  <Input type="number" value={store.weeksPerYear || ''} onChange={(e) => store.setWeeksPerYear(Number(e.target.value))} className="h-11 bg-muted/50" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Annual Business Expenses</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input type="number" value={store.businessExpenses || ''} onChange={(e) => store.setBusinessExpenses(Number(e.target.value))} className="pl-7 h-11 bg-muted/50" />
              </div>
              <p className="text-xs text-muted-foreground">Self-funded health insurance, software, home office, etc.</p>
            </div>
            
            <div className="space-y-2 pt-4 border-t border-border/50">
              <label className="text-sm font-semibold text-foreground">Effective Income Tax Rate</label>
              <div className="relative">
                <Input type="number" value={store.effectiveTaxRate || ''} onChange={(e) => store.setEffectiveTaxRate(Number(e.target.value))} className="pr-10 h-11 bg-muted/50" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">%</span>
              </div>
              <p className="text-xs text-muted-foreground">Your estimated combined federal and state income tax rate (excluding SE tax).</p>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="xl:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-emerald-50 text-emerald-600 border border-emerald-200 p-4 rounded-xl shadow-xl flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        <div className="flex-1 space-y-8">
          
          {/* Conversion Focus UI */}
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4"/> Conversion Equivalents
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {/* To Match W2 */}
              <div className="flex flex-col">
                <p className="text-slate-400 text-sm mb-1">To match this W-2, your 1099 rate must be:</p>
                <div className="text-4xl font-black text-emerald-400 tracking-tight mb-1">
                  {formatCurrency(metrics.equivalent1099Hourly)}<span className="text-xl text-emerald-400/60 font-medium">/hr</span>
                </div>
                <p className="text-sm text-slate-500 font-medium">Or {formatCurrency(metrics.equivalent1099Annual)}/year gross</p>
              </div>

              {/* To Match 1099 */}
              <div className="flex flex-col">
                <p className="text-slate-400 text-sm mb-1">To match this 1099, your W-2 offer must be:</p>
                <div className="text-4xl font-black text-blue-400 tracking-tight mb-1">
                  {formatCurrency(metrics.equivalentW2Hourly)}<span className="text-xl text-blue-400/60 font-medium">/hr</span>
                </div>
                <p className="text-sm text-slate-500 font-medium">Or {formatCurrency(metrics.equivalentW2Annual)}/year salary</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b pb-2">
            <Target className="w-5 h-5 text-muted-foreground"/> Take-Home Pay Comparison
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* W-2 Breakdown */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 dark:bg-blue-950/10 dark:border-blue-900/30">
              <div className="flex items-center gap-2 mb-4 text-blue-800 dark:text-blue-300">
                <Building className="w-5 h-5"/>
                <h4 className="font-bold">W-2 Breakdown</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gross Salary</span>
                  <span className="font-medium">{formatCurrency(metrics.w2AnnualGross)}</span>
                </div>
                <div className="flex justify-between text-sm text-red-500/80">
                  <span>FICA (7.65%)</span>
                  <span>-{formatCurrency(metrics.w2Fica)}</span>
                </div>
                <div className="flex justify-between text-sm text-red-500/80">
                  <span>Income Tax</span>
                  <span>-{formatCurrency(metrics.w2IncomeTax)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-blue-200 dark:border-blue-800">
                  <span className="text-blue-900 dark:text-blue-100">Net Cash</span>
                  <span className="text-blue-600 dark:text-blue-400">{formatCurrency(metrics.w2Net)}</span>
                </div>
                <div className="flex justify-between text-xs pt-2 text-muted-foreground">
                  <span>+ Benefits Value</span>
                  <span>{formatCurrency(store.w2BenefitsValue)}</span>
                </div>
                <div className="flex justify-between text-sm font-black pt-1">
                  <span className="text-blue-900 dark:text-blue-100">Total Value</span>
                  <span className="text-blue-600 dark:text-blue-400">{formatCurrency(metrics.w2TotalValue)}</span>
                </div>
              </div>
            </div>

            {/* 1099 Breakdown */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 dark:bg-emerald-950/10 dark:border-emerald-900/30">
              <div className="flex items-center gap-2 mb-4 text-emerald-800 dark:text-emerald-300">
                <Briefcase className="w-5 h-5"/>
                <h4 className="font-bold">1099 Breakdown</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gross Revenue</span>
                  <span className="font-medium">{formatCurrency(metrics.cAnnualGross)}</span>
                </div>
                <div className="flex justify-between text-sm text-red-500/80">
                  <span>Expenses</span>
                  <span>-{formatCurrency(store.businessExpenses)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-900 dark:text-emerald-100 font-medium">Net Profit</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">{formatCurrency(metrics.cNetBusiness)}</span>
                </div>
                <div className="flex justify-between text-sm text-red-500/80">
                  <span>SE Tax (15.3%)</span>
                  <span>-{formatCurrency(metrics.cSeTax)}</span>
                </div>
                <div className="flex justify-between text-sm text-red-500/80">
                  <span>Income Tax (Est)</span>
                  <span>-{formatCurrency(metrics.cIncomeTax)}</span>
                </div>
                <div className="flex justify-between text-base font-black pt-2 border-t border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-900 dark:text-emerald-100">True Take-Home</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{formatCurrency(metrics.cNetTakeHome)}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        <CalculatorActions
          slug="w2-vs-1099-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="W2_vs_1099_Analysis"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
