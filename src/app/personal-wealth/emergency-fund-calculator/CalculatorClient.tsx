/* eslint-disable @next/next/no-location-assign-relative-destination */
'use client'

import React, { useState, useEffect } from 'react'
import { 
  Calculator, CheckCircle2, AlertTriangle, HelpCircle, Save, TrendingUp, DollarSign, Wallet, AlertCircle, Shield, Briefcase, Activity, CalendarClock, Target
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useEmergencyFundStore, calculateEmergencyFundMetrics, ComfortLevel, EmploymentType, IncomeStability, JobSecurity } from '@/store/emergency-fund.store'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro }: { isPro: boolean }) {
  const store = useEmergencyFundStore()
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
          if (state.monthlyExpenses !== undefined) store.setMonthlyExpenses(state.monthlyExpenses as any)
          if (state.currentFund !== undefined) store.setCurrentFund(state.currentFund as any)
          if (state.monthlySaving !== undefined) store.setMonthlySaving(state.monthlySaving as any)
          if (state.interestRate !== undefined) store.setInterestRate(state.interestRate as any)
          if (state.comfortLevel !== undefined) store.setComfortLevel(state.comfortLevel as any)
          if (state.employmentType !== undefined) store.setEmploymentType(state.employmentType as any)
          if (state.jobSecurity !== undefined) store.setJobSecurity(state.jobSecurity as any)
          if (state.incomeStability !== undefined) store.setIncomeStability(state.incomeStability as any)
          if (state.hasDependents !== undefined) store.setHasDependents(state.hasDependents as any)
          if (state.hasHealthCosts !== undefined) store.setHasHealthCosts(state.hasHealthCosts as any)
          if (state.hasIncomeProtection !== undefined) store.setHasIncomeProtection(state.hasIncomeProtection as any)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [searchParams])

  const metrics = calculateEmergencyFundMetrics(store)

  const handleSave = async () => {
    if (!isPro) {
      setShowProModal(true)
      return
    }
    
    setIsSaving(true)
    try {
      const savedResult = await saveCalculatorAction({
        id: savedScenarioId || undefined,
        calculator_slug: 'personal-wealth/emergency-fund-calculator',
        category: 'Personal Wealth',
        saved_name: `Emergency Fund: ${metrics.recommendedMonths}mo Target`,
        input_state: {
          monthlyExpenses: store.monthlyExpenses,
          currentFund: store.currentFund,
          monthlySaving: store.monthlySaving,
          interestRate: store.interestRate,
          comfortLevel: store.comfortLevel,
          employmentType: store.employmentType,
          jobSecurity: store.jobSecurity,
          incomeStability: store.incomeStability,
          hasDependents: store.hasDependents,
          hasHealthCosts: store.hasHealthCosts,
          hasIncomeProtection: store.hasIncomeProtection
        },
        core_metric: metrics.recommendedAmount,
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
        window.location.href = '/login?redirect=/personal-wealth/emergency-fund-calculator'
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
      params.set('expenses', store.monthlyExpenses.toString())
      params.set('fund', store.currentFund.toString())
      params.set('saving', store.monthlySaving.toString())
      params.set('risk', metrics.riskScore.toString())
      setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`)
    }
  }, [store, metrics.riskScore])

  const exportData = [{
    'Monthly Expenses': store.monthlyExpenses,
    'Current Savings': store.currentFund,
    'Target Months': store.comfortLevel,
    'Monthly Contribution': store.monthlySaving,
    'Target Fund Amount': metrics.recommendedAmount,
    'Current Shortfall': metrics.remainingAmount,
    'Months Until Goal': metrics.monthsToTarget
  }]

  const formatCurrency = (val: number) => `${currencySymbol}${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

  if (!mounted) return null

  // Format time to goal beautifully
  const formatTime = (months: number) => {
      if (months === 0) return 'Goal reached'
      if (months === Infinity) return 'Never (increase savings)'
      if (months < 1) return '< 1 month'
      const yrs = Math.floor(months / 12)
      const mos = Math.ceil(months % 12)
      if (yrs === 0) return `${mos} mo`
      if (mos === 0) return `${yrs} yr`
      return `${yrs} yr, ${mos} mo`
  }

  const OptionButton = ({ 
    active, onClick, label, value 
  }: { 
    active: boolean, onClick: () => void, label: string, value?: string 
  }) => (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
        active 
        ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20 ring-offset-1' 
        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <span className="block text-center">{label}</span>
      {value && <span className="block text-center text-xs opacity-70 font-normal mt-0.5">{value}</span>}
    </button>
  )

  const CheckboxRow = ({ checked, onChange, label }: { checked: boolean, onChange: (v: boolean) => void, label: string }) => (
    <label className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${checked ? 'bg-primary border-primary text-primary-foreground' : 'border-input bg-background'}`}>
        {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-5 flex flex-col space-y-8 bg-card border shadow-sm rounded-2xl p-6 md:p-8">
        
        {/* Step 1: Your situation */}
        <div className="relative">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Your situation
            </h2>
          </div>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Essential monthly expenses</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.monthlyExpenses || ''}
                  onChange={(e) => store.setMonthlyExpenses(Number(e.target.value))}
                  className="pl-7 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Current savings</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                  <Input 
                    type="number" 
                    value={store.currentFund === 0 ? '' : store.currentFund}
                    onChange={(e) => store.setCurrentFund(e.target.value === '' ? 0 : Number(e.target.value))}
                    className="pl-7 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Monthly saving</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                  <Input 
                    type="number" 
                    value={store.monthlySaving === 0 ? '' : store.monthlySaving}
                    onChange={(e) => store.setMonthlySaving(e.target.value === '' ? 0 : Number(e.target.value))}
                    className="pl-7 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Interest on savings</label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.interestRate === 0 ? '' : store.interestRate}
                  onChange={(e) => store.setInterestRate(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pr-10 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">% / yr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Risk Assessment */}
        <div className="relative pt-6">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Risk assessment
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Employment Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <OptionButton active={store.employmentType === 'full-time'} onClick={() => store.setEmploymentType('full-time')} label="Full-time" />
                <OptionButton active={store.employmentType === 'part-time'} onClick={() => store.setEmploymentType('part-time')} label="Part-time" />
                <OptionButton active={store.employmentType === 'contract'} onClick={() => store.setEmploymentType('contract')} label="Contract" />
                <OptionButton active={store.employmentType === 'freelance'} onClick={() => store.setEmploymentType('freelance')} label="Freelance" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Job Security</label>
              <div className="grid grid-cols-3 gap-2">
                <OptionButton active={store.jobSecurity === 'high'} onClick={() => store.setJobSecurity('high')} label="High" />
                <OptionButton active={store.jobSecurity === 'medium'} onClick={() => store.setJobSecurity('medium')} label="Medium" />
                <OptionButton active={store.jobSecurity === 'low'} onClick={() => store.setJobSecurity('low')} label="Low" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Income Stability</label>
              <div className="grid grid-cols-3 gap-2">
                <OptionButton active={store.incomeStability === 'stable'} onClick={() => store.setIncomeStability('stable')} label="Stable" />
                <OptionButton active={store.incomeStability === 'seasonal'} onClick={() => store.setIncomeStability('seasonal')} label="Seasonal" />
                <OptionButton active={store.incomeStability === 'variable'} onClick={() => store.setIncomeStability('variable')} label="Variable" />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <CheckboxRow checked={store.hasDependents} onChange={store.setHasDependents} label="I have dependents" />
              <CheckboxRow checked={store.hasHealthCosts} onChange={store.setHasHealthCosts} label="Ongoing health costs" />
              <CheckboxRow checked={store.hasIncomeProtection} onChange={store.setHasIncomeProtection} label="I have income protection / insurance" />
            </div>
          </div>
        </div>

        {/* Step 3: Comfort Level */}
        <div className="relative pt-6">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Your comfort level
            </h2>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            <OptionButton active={store.comfortLevel === 3} onClick={() => store.setComfortLevel(3)} label="3mo" value="Lean" />
            <OptionButton active={store.comfortLevel === 6} onClick={() => store.setComfortLevel(6)} label="6mo" value="Standard" />
            <OptionButton active={store.comfortLevel === 9} onClick={() => store.setComfortLevel(9)} label="9mo" value="Cautious" />
            <OptionButton active={store.comfortLevel === 12} onClick={() => store.setComfortLevel(12)} label="12mo" value="Maximum" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            What you would feel comfortable holding. We compare it to what your risk profile suggests.
          </p>
        </div>

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-blue-50 text-blue-600 border border-blue-200 p-4 rounded-xl shadow-xl flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        <div className="flex-1">
          {/* Recommended Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Recommended Emergency Fund</h3>
              <div className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-3">
                {formatCurrency(metrics.recommendedAmount)}
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{metrics.recommendedMonths} months</strong> of your {formatCurrency(store.monthlyExpenses)} essential expenses, sized to your risk score of <strong>{metrics.riskScore}</strong>.
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${metrics.riskScore >= 4 ? 'bg-red-500/10 text-red-600 border-red-500/20' : metrics.riskScore >= 2 ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 'bg-blue-500/10 text-blue-600 border-blue-500/20'}`}>
              {metrics.riskLevelLabel}
            </div>
          </div>

          {/* Comfort Level Warning/Note */}
          {store.comfortLevel !== metrics.recommendedMonths && (
            <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <p>
                You chose <strong>{store.comfortLevel} months</strong> ({formatCurrency(metrics.comfortAmount)}), but your profile points to <strong>{metrics.recommendedMonths} months</strong>. 
                {store.comfortLevel > metrics.recommendedMonths ? " You might be holding too much cash that could be invested." : " Your situation suggests a deeper buffer than you picked."}
              </p>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-background border border-border/60">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Current Coverage</p>
              <p className="text-xl font-bold text-foreground">{metrics.currentCoverageMonths.toFixed(1)} mo</p>
            </div>
            <div className="p-4 rounded-2xl bg-background border border-border/60">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Remaining</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(metrics.remainingAmount)}</p>
            </div>
            <div className="p-4 rounded-2xl bg-background border border-border/60">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Time to Goal</p>
              <p className="text-xl font-bold text-foreground">{formatTime(metrics.monthsToTarget)}</p>
            </div>
            <div className="p-4 rounded-2xl bg-background border border-border/60">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Risk Level</p>
              <p className={`text-xl font-bold ${metrics.riskScore >= 4 ? 'text-red-500' : metrics.riskScore >= 2 ? 'text-amber-500' : 'text-blue-500'}`}>
                {metrics.riskLevelLabel}
              </p>
            </div>
          </div>

          {/* Reach Target Faster */}
          {metrics.remainingAmount > 0 && (
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" /> Reach your target faster
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-border/60 bg-muted/20">
                  <p className="text-sm text-muted-foreground mb-1">In 12 months</p>
                  <p className="text-lg font-bold text-foreground">{formatCurrency(Math.round(metrics.twelveMonthTarget))}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                </div>
                <div className="p-4 rounded-2xl border border-border/60 bg-muted/20">
                  <p className="text-sm text-muted-foreground mb-1">In 6 months</p>
                  <p className="text-lg font-bold text-foreground">{formatCurrency(Math.round(metrics.sixMonthTarget))}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                </div>
              </div>
            </div>
          )}

          {/* Chart */}
          {metrics.remainingAmount > 0 && (
            <div className="mb-8 border-t border-border/50 pt-8 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Path to your target</h4>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Balance projection</p>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metrics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="label" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748B', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748B', fontSize: 12 }}
                      tickFormatter={(value) => `${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(Number(value)), 'Balance']}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    />
                    <ReferenceLine 
                      y={metrics.recommendedAmount} 
                      stroke="#3b82f6" 
                      strokeDasharray="4 4" 
                      label={{ position: 'insideTopRight', value: 'Recommended', fill: '#3b82f6', fontSize: 12, dy: -10 }} 
                    />
                    {store.comfortLevel !== metrics.recommendedMonths && (
                      <ReferenceLine 
                        y={metrics.comfortAmount} 
                        stroke="#F59E0B" 
                        strokeDasharray="4 4" 
                        label={{ position: 'insideTopRight', value: 'Your choice', fill: '#F59E0B', fontSize: 12, dy: -10 }} 
                      />
                    )}
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#059669" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorBalance)"
                      activeDot={{ r: 6, fill: '#059669', strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Milestones */}
          {metrics.remainingAmount > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Milestones to your target</h4>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-out" 
                  style={{ width: `${Math.min(100, (store.currentFund / metrics.recommendedAmount) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground mt-2">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Results are illustrative and based on fixed interest rates with no new contributions or withdrawals beyond what you entered. Your real emergency fund should be reviewed as your circumstances change.
            </p>
          </div>
        </div>
        
        <CalculatorActions
          slug="emergency-fund-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="EmergencyFundTarget"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
