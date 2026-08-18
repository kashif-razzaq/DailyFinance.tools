'use client'

import React, { useState, useEffect } from 'react'
import { Map, Calculator, ArrowRightLeft, DollarSign, Home, Coffee, Train, HeartPulse, CreditCard, CheckCircle2, TrendingUp, TrendingDown, Target } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { useCostOfLivingStore } from '@/store/cost-of-living.store'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useRouter, useSearchParams } from 'next/navigation'
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useCostOfLivingStore()
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
          if (state.currentSalary !== undefined) store.setCurrentSalary(state.currentSalary as number)
          if (state.currentCityIndex !== undefined) store.setCurrentCityIndex(state.currentCityIndex as number)
          if (state.newCityIndex !== undefined) store.setNewCityIndex(state.newCityIndex as number)
          if (state.housingExp !== undefined) store.setHousingExp(state.housingExp as number)
          if (state.foodExp !== undefined) store.setFoodExp(state.foodExp as number)
          if (state.transportExp !== undefined) store.setTransportExp(state.transportExp as number)
          if (state.healthcareExp !== undefined) store.setHealthcareExp(state.healthcareExp as number)
          if (state.taxesMiscExp !== undefined) store.setTaxesMiscExp(state.taxesMiscExp as number)
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
        calculator_slug: 'freelance/digital-nomad-cost-of-living-calculator',
        category: 'Personal Finance',
        saved_name: `COL Compare: Target ${currencySymbol}${Math.round(metrics.requiredSalary)}`,
        input_state: {
          currentSalary: store.currentSalary,
          currentCityIndex: store.currentCityIndex,
          newCityIndex: store.newCityIndex,
          housingExp: store.housingExp,
          foodExp: store.foodExp,
          transportExp: store.transportExp,
          healthcareExp: store.healthcareExp,
          taxesMiscExp: store.taxesMiscExp
        },
        core_metric: metrics.requiredSalary,
        is_public: false
      })
      if (!savedScenarioId && savedResult?.id) {
        setSavedScenarioId(savedResult.id)
        router.replace(`?saved_id=${savedResult.id}`, { scroll: false })
      }
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error: any) {
      if (error.message === 'Unauthorized') window.location.href = '/login?redirect=/freelance/digital-nomad-cost-of-living-calculator'
      else console.error('Error saving:', error)
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams()
      params.set('salary', store.currentSalary.toString())
      params.set('c1', store.currentCityIndex.toString())
      params.set('c2', store.newCityIndex.toString())
      setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`)
    }
  }, [store])

  const formatCurrency = (val: number) => `${currencySymbol}${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

  const exportData = [{
    'Current Salary': store.currentSalary,
    'Current City Index': store.currentCityIndex,
    'New City Index': store.newCityIndex,
    'Required Salary to Maintain Lifestyle': metrics.requiredSalary,
    'Salary Difference': metrics.salaryDiff,
    'Total Personal Expenses': metrics.totalPersonalCost
  }]

  if (!mounted) return null

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 items-start relative">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="xl:col-span-5 flex flex-col space-y-6">
        
        {/* City Comparison */}
        <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Map className="h-5 w-5 text-blue-600" />
              Salary & City Comparison
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Current Annual Salary</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input type="number" value={store.currentSalary || ''} onChange={(e) => store.setCurrentSalary(Number(e.target.value))} className="pl-7 h-11 bg-muted/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Current City COL Index</label>
                <Input type="number" value={store.currentCityIndex || ''} onChange={(e) => store.setCurrentCityIndex(Number(e.target.value))} className="h-11 bg-muted/50" />
                <p className="text-[10px] text-muted-foreground">Often defaults to 100 as baseline.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground text-blue-600">New City COL Index</label>
                <Input type="number" value={store.newCityIndex || ''} onChange={(e) => store.setNewCityIndex(Number(e.target.value))} className="h-11 bg-blue-50/50 border-blue-200" />
                <p className="text-[10px] text-muted-foreground">E.g., 145 = 45% more expensive.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Expenses */}
        <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-600" />
              Personal Expense Estimator
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-2"><Home className="w-3 h-3"/> Housing (Rent/Mortgage)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">{currencySymbol}</span>
                <Input type="number" value={store.housingExp || ''} onChange={(e) => store.setHousingExp(Number(e.target.value))} className="pl-6 h-9 text-sm bg-muted/50" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-2"><Coffee className="w-3 h-3"/> Food & Groceries</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">{currencySymbol}</span>
                <Input type="number" value={store.foodExp || ''} onChange={(e) => store.setFoodExp(Number(e.target.value))} className="pl-6 h-9 text-sm bg-muted/50" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-2"><Train className="w-3 h-3"/> Transportation</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">{currencySymbol}</span>
                <Input type="number" value={store.transportExp || ''} onChange={(e) => store.setTransportExp(Number(e.target.value))} className="pl-6 h-9 text-sm bg-muted/50" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-2"><HeartPulse className="w-3 h-3"/> Healthcare</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">{currencySymbol}</span>
                <Input type="number" value={store.healthcareExp || ''} onChange={(e) => store.setHealthcareExp(Number(e.target.value))} className="pl-6 h-9 text-sm bg-muted/50" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-2"><CreditCard className="w-3 h-3"/> Taxes & Miscellaneous</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">{currencySymbol}</span>
                <Input type="number" value={store.taxesMiscExp || ''} onChange={(e) => store.setTaxesMiscExp(Number(e.target.value))} className="pl-6 h-9 text-sm bg-muted/50" />
              </div>
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
          
          {/* Salary Comparison UI */}
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Target className="w-4 h-4"/> Salary Needed In New City
            </h3>
            
            <div className="flex flex-col mb-6 relative z-10">
              <div className="text-5xl md:text-6xl font-black text-white tracking-tight mb-2">
                {formatCurrency(metrics.requiredSalary)}
              </div>
              <p className="text-sm text-slate-400 font-medium">To maintain your exact current standard of living.</p>
            </div>

            <div className="flex items-center gap-4 relative z-10">
              <div className={`px-4 py-2 rounded-xl text-sm font-bold border flex items-center gap-2 ${metrics.salaryDiff >= 0 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                {metrics.salaryDiff >= 0 ? <TrendingUp className="w-4 h-4"/> : <TrendingDown className="w-4 h-4"/>}
                {metrics.salaryDiff >= 0 ? '+' : ''}{formatCurrency(metrics.salaryDiff)} ({metrics.salaryDiffPct > 0 ? '+' : ''}{metrics.salaryDiffPct.toFixed(1)}%)
              </div>
            </div>
          </div>

          {/* Expense Breakdown UI */}
          <div className="pt-4">
            <h3 className="text-lg font-bold text-foreground flex items-center justify-between border-b pb-2 mb-6">
              <span className="flex items-center gap-2"><ArrowRightLeft className="w-5 h-5 text-muted-foreground"/> Personal Cost of Living Estimate</span>
              <span className="text-xl font-black text-emerald-600">{formatCurrency(metrics.totalPersonalCost)}</span>
            </h3>

            {metrics.totalPersonalCost > 0 ? (
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
                    <Pie
                      data={metrics.expenseBreakdown}
                      cx="50%"
                      cy="45%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {metrics.expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={20} 
                      iconType="circle" 
                      formatter={(value) => <span className="text-neutral-600 font-medium ml-1 text-xs">{value}</span>}
                      wrapperStyle={{ paddingTop: '20px' }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full flex items-center justify-center bg-muted/20 border border-dashed rounded-2xl">
                <p className="text-muted-foreground text-sm">Enter personal expenses to see breakdown.</p>
              </div>
            )}
          </div>
          
        </div>
        
        <CalculatorActions
          slug="cost-of-living-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Cost_Of_Living_Analysis"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
