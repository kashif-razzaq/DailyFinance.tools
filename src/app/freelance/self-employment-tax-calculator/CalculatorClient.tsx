'use client'

import React, { useState, useEffect } from 'react'
import { Calculator, DollarSign, PieChart, Briefcase, Receipt, CalendarClock, Target, Percent, HelpCircle, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFreelanceTaxStore } from '@/store/se-tax.store'
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { useRouter, useSearchParams } from 'next/navigation'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro }: { isPro: boolean }) {
  const store = useFreelanceTaxStore()
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
          if (state.grossIncome !== undefined) store.setGrossIncome(state.grossIncome as number)
          if (state.businessExpenses !== undefined) store.setBusinessExpenses(state.businessExpenses as number)
          if (state.taxYear !== undefined) store.setTaxYear(state.taxYear as number)
          if (state.filingStatus !== undefined) store.setFilingStatus(state.filingStatus as any)
          if (state.stateTaxRate !== undefined) store.setStateTaxRate(state.stateTaxRate as number)
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
        calculator_slug: 'freelance/self-employment-tax-calculator',
        category: 'Taxes & Accounting',
        saved_name: `1099 Taxes: ${currencySymbol}${Math.round(metrics.totalEstimatedTax)} Owed`,
        input_state: {
          grossIncome: store.grossIncome,
          businessExpenses: store.businessExpenses,
          taxYear: store.taxYear,
          filingStatus: store.filingStatus,
          stateTaxRate: store.stateTaxRate
        },
        core_metric: metrics.totalEstimatedTax,
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
        window.location.href = '/login?redirect=/freelance/self-employment-tax-calculator'
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
      params.set('income', store.grossIncome.toString())
      params.set('expenses', store.businessExpenses.toString())
      params.set('state', store.stateTaxRate.toString())
      setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`)
    }
  }, [store])

  const exportData = [{
    'Gross 1099 Income': store.grossIncome,
    'Business Expenses': store.businessExpenses,
    'Net Business Profit': metrics.netProfit,
    'SE Tax Total': metrics.seTax,
    'Income Tax Estimate': metrics.estimatedFederalIncomeTax + metrics.estimatedStateIncomeTax,
    'Total Estimated Tax Liability': metrics.totalEstimatedTax,
    'Net Spendable Income': metrics.takeHomePay
  }]

  const formatCurrency = (val: number) => `${currencySymbol}${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

  if (!mounted) return null

  const pieData = [
    { name: 'Take-Home Pay', value: metrics.takeHomePay, color: '#059669' },
    { name: 'SE Tax', value: metrics.seTax, color: '#D97706' },
    { name: 'Fed Tax', value: metrics.estimatedFederalIncomeTax, color: '#2563EB' },
    { name: 'State Tax', value: metrics.estimatedStateIncomeTax, color: '#9333EA' },
  ].filter(d => d.value > 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start relative">
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-5 flex flex-col space-y-8 bg-card border shadow-sm rounded-2xl p-6 md:p-8">
        
        <div className="relative">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              1099 Income & Expenses
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Total 1099 Gross Income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.grossIncome === 0 ? '' : store.grossIncome}
                  onChange={(e) => store.setGrossIncome(Number(e.target.value))}
                  className="pl-7 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-xs text-muted-foreground">Total revenue before any expenses or taxes.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex justify-between">
                <span>Business Deductions</span>
                <span className="text-primary text-xs font-normal cursor-help" title="Schedule C Write-offs">What's this?</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.businessExpenses === 0 ? '' : store.businessExpenses}
                  onChange={(e) => store.setBusinessExpenses(Number(e.target.value))}
                  className="pl-7 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60 text-red-600 dark:text-red-400"
                />
              </div>
              <p className="text-xs text-muted-foreground">Software, home office, mileage, supplies, etc.</p>
            </div>
          </div>
        </div>

        <div className="relative pt-2">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              Tax Profile
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground block">Filing Status</label>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={store.filingStatus === 'Single' ? 'default' : 'outline'} 
                  className={store.filingStatus === 'Single' ? 'bg-primary hover:bg-primary/90' : ''}
                  onClick={() => store.setFilingStatus('Single')}
                >
                  Single
                </Button>
                <Button 
                  variant={store.filingStatus === 'Married Filing Jointly' ? 'default' : 'outline'} 
                  className={store.filingStatus === 'Married Filing Jointly' ? 'bg-primary hover:bg-primary/90' : ''}
                  onClick={() => store.setFilingStatus('Married Filing Jointly')}
                >
                  Married Jointly
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Estimated State Tax Rate</label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.stateTaxRate === 0 ? '' : store.stateTaxRate}
                  onChange={(e) => store.setStateTaxRate(Number(e.target.value))}
                  className="pr-10 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">%</span>
              </div>
              <p className="text-xs text-muted-foreground">Enter 0 if you live in a tax-free state (e.g. TX, FL, NV).</p>
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Estimated Taxes</h3>
              <div className="text-4xl md:text-5xl font-black text-red-500 tracking-tight mb-3">
                {formatCurrency(metrics.totalEstimatedTax)}
              </div>
              <p className="text-sm text-muted-foreground">
                Your effective tax rate is <strong>{metrics.effectiveTaxRate.toFixed(1)}%</strong> of your net profit.
              </p>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-bold border bg-blue-500/10 text-blue-600 border-blue-500/20">
              {store.taxYear} Tax Year
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-background border border-border/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10"><DollarSign className="w-12 h-12 text-emerald-500"/></div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 relative z-10">Take-Home Pay</p>
              <p className="text-2xl font-bold text-emerald-600 relative z-10">{formatCurrency(metrics.takeHomePay)}</p>
            </div>
            <div className="p-4 rounded-2xl bg-primary border border-primary text-primary-foreground shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-20"><CalendarClock className="w-12 h-12"/></div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground/80 mb-1 relative z-10">Quarterly Payment</p>
              <p className="text-2xl font-bold relative z-10">{formatCurrency(metrics.quarterlyPayment)}</p>
            </div>
          </div>

          <div className="bg-muted/20 border border-border/60 rounded-2xl p-6 mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Tax Breakdown</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm font-medium text-foreground flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#D97706]"></div>
                  Self-Employment Tax (15.3%)
                </span>
                <span className="font-semibold text-foreground">{formatCurrency(metrics.seTax)}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm font-medium text-foreground flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#2563EB]"></div>
                  Est. Federal Income Tax
                </span>
                <span className="font-semibold text-foreground">{formatCurrency(metrics.estimatedFederalIncomeTax)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#9333EA]"></div>
                  Est. State Income Tax
                </span>
                <span className="font-semibold text-foreground">{formatCurrency(metrics.estimatedStateIncomeTax)}</span>
              </div>
            </div>
          </div>

          {metrics.netProfit > 0 && (
            <div className="mb-8 pt-4">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Income Distribution</h4>
              </div>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="45%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
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
                      formatter={(value) => <span className="text-neutral-600 font-medium ml-1">{value}</span>}
                      wrapperStyle={{ paddingTop: '20px' }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 text-sm text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p>
              This is an <strong>estimate</strong> designed for 1099 independent contractors and sole proprietors. It uses the 2024 standard deduction and simplified progressive brackets. Always consult a certified CPA before filing your official IRS tax returns or making actual quarterly estimated payments.
            </p>
          </div>
        </div>
        
        <CalculatorActions
          slug="self-employment-tax-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="1099_Tax_Estimate"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
