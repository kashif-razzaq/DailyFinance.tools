'use client'

import React, { useState, useEffect } from 'react'
import { Calculator, Clock, Target, TrendingDown, DollarSign, CheckCircle2, TrendingUp, Percent, FileText } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useBillableHoursStore } from '@/store/billable-hours.store'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { useRouter, useSearchParams } from 'next/navigation'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function CalculatorClient({ isPro }: { isPro: boolean }) {
  const store = useBillableHoursStore()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'
  const [mounted, setMounted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showProModal, setShowProModal] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const urlSavedId = searchParams.get('saved_id')
    if (urlSavedId && !savedScenarioId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.hourlyRate !== undefined) store.setHourlyRate(state.hourlyRate as number)
          if (state.billableHours !== undefined) store.setBillableHours(state.billableHours as number)
          if (state.totalHoursWorked !== undefined) store.setTotalHoursWorked(state.totalHoursWorked as number)
          if (state.discount !== undefined) store.setDiscount(state.discount as number)
          if (state.expenses !== undefined) store.setExpenses(state.expenses as number)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [searchParams])

  const metrics = store.getDerivedMetrics()

  const handleSave = async () => {
    if (!isPro) {
      setShowProModal(true)
      return
    }
    
    setIsSaving(true)
    try {
      const savedResult = await saveCalculatorAction({
        id: savedScenarioId || undefined,
        calculator_slug: 'freelance/billable-hours-calculator',
        category: 'Business & Freelance',
        saved_name: `Billable Run: ${currencySymbol}${Math.round(metrics.totalBillableAmount)}`,
        input_state: {
          hourlyRate: store.hourlyRate,
          billableHours: store.billableHours,
          totalHoursWorked: store.totalHoursWorked,
          discount: store.discount,
          expenses: store.expenses
        },
        core_metric: metrics.totalBillableAmount,
        is_public: false
      })

      if (!savedScenarioId && savedResult && savedResult.id) {
        setSavedScenarioId(savedResult.id)
        router.replace(`?saved_id=${savedResult.id}`, { scroll: false })
      }
      
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        window.location.href = '/login?redirect=/freelance/billable-hours-calculator'
      } else {
        console.error('Error saving:', error)
      }
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams()
      params.set('rate', store.hourlyRate.toString())
      params.set('billable', store.billableHours.toString())
      params.set('total', store.totalHoursWorked.toString())
      setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`)
    }
  }, [store])

  const exportData = [{
    'Hourly Rate': store.hourlyRate,
    'Billable Hours': store.billableHours,
    'Total Hours Worked': store.totalHoursWorked,
    'Discount': store.discount,
    'Expenses': store.expenses,
    'Total Billable Amount': metrics.totalBillableAmount,
    'Effective Hourly Rate': metrics.effectiveHourlyRate,
    'Utilization Rate': metrics.utilizationRate.toFixed(1) + '%',
    'Lost Revenue Value': metrics.lostRevenue
  }]

  const formatCurrency = (val: number) => `${currencySymbol}${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

  if (!mounted) return null

  // Generate simple chart data to show billable vs unbillable value
  const chartData = [
    { name: 'Billable Value', value: store.billableHours * store.hourlyRate, fill: '#059669' },
    { name: 'Unbillable Value (Loss)', value: metrics.lostRevenue, fill: '#ef4444' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start relative">
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-5 flex flex-col space-y-8 bg-card border shadow-sm rounded-2xl p-6 md:p-8">
        
        <div className="relative">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Time Details
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                Agreed Hourly Rate
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.hourlyRate === 0 ? '' : store.hourlyRate}
                  onChange={(e) => store.setHourlyRate(Number(e.target.value))}
                  className="pl-7 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Total Billable Hours
              </label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.billableHours === 0 ? '' : store.billableHours}
                  onChange={(e) => store.setBillableHours(Number(e.target.value))}
                  className="h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  step="0.1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Hours strictly spent on client work you can charge for.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Total Hours Worked (Including Admin)
              </label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.totalHoursWorked === 0 ? '' : store.totalHoursWorked}
                  onChange={(e) => store.setTotalHoursWorked(Number(e.target.value))}
                  className="h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  step="0.1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Used to calculate your Utilization & Effective Rates.</p>
            </div>
          </div>
        </div>

        <div className="relative pt-2">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Adjustments
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Discounts (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.discount === 0 ? '' : store.discount}
                  onChange={(e) => store.setDiscount(Number(e.target.value))}
                  className="pl-7 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60 text-red-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Reimbursable Expenses</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.expenses === 0 ? '' : store.expenses}
                  onChange={(e) => store.setExpenses(Number(e.target.value))}
                  className="pl-7 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60 text-emerald-600"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-emerald-50 text-emerald-600 border border-emerald-200 p-4 rounded-xl shadow-xl flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Invoice Amount</h3>
              <div className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-3">
                {formatCurrency(metrics.totalBillableAmount)}
              </div>
              <p className="text-sm text-muted-foreground">
                Base ({formatCurrency(store.billableHours * store.hourlyRate)}) - Discounts ({formatCurrency(store.discount)}) + Expenses ({formatCurrency(store.expenses)})
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${metrics.utilizationRate >= 70 ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'}`}>
              Utilization: {metrics.utilizationRate.toFixed(1)}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-background border border-border/60">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Effective Hourly Rate</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(metrics.effectiveHourlyRate)}<span className="text-sm text-muted-foreground font-normal">/hr</span></p>
            </div>
            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-900/50 text-red-600 dark:text-red-400">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><TrendingDown className="w-3 h-3"/> Unbilled Value Loss</p>
              <p className="text-2xl font-bold">{formatCurrency(metrics.lostRevenue)}</p>
            </div>
          </div>

          <div className="bg-muted/20 border border-border/60 rounded-2xl p-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Metric Explanations</h4>
            
            <div className="space-y-4">
              <div>
                <strong className="text-sm text-foreground block mb-1">Utilization Rate</strong>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The percentage of your total working hours that you actually billed for. A healthy agency or freelance target is 70% to 80% (leaving room for admin, sales, and breaks).
                </p>
              </div>
              <div>
                <strong className="text-sm text-foreground block mb-1">Effective Hourly Rate</strong>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The amount you actually earned per hour of your life spent working. If you spent 10 hours doing admin tasks, your true hourly pay drops significantly.
                </p>
              </div>
            </div>
          </div>

        </div>
        
        <CalculatorActions
          slug="billable-hours-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Billable_Hours_Report"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
