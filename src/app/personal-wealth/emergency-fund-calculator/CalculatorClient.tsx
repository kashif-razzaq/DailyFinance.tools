/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-location-assign-relative-destination */
'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  CheckCircle2, AlertTriangle, Target, Shield, ShieldCheck, TrendingUp
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useEmergencyFundStore, calculateEmergencyFundMetrics } from '@/store/emergency-fund.store'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Simple PDF template styles
const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, marginBottom: 10, color: '#4b5563' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottom: '1 solid #e5e7eb' },
  label: { fontSize: 12, color: '#374151' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 20, backgroundColor: '#f3f4f6', paddingHorizontal: 10, borderRadius: 4 },
  highlightLabel: { fontSize: 14, fontWeight: 'bold' },
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#059669' }
});

// PDF Report Component
const EmergencyFundReportPDF = ({ store, metrics, currencySymbol }: { store: any, metrics: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Emergency Fund Report</Text>
      <Text style={pdfStyles.subtitle}>Target and Protection Profile</Text>
      <View style={{ marginTop: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Monthly Essential Expenses:</Text><Text style={pdfStyles.value}>{currencySymbol}{store.monthlyExpenses.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Current Emergency Fund:</Text><Text style={pdfStyles.value}>{currencySymbol}{store.currentFund.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Risk Profile Score:</Text><Text style={pdfStyles.value}>{metrics.riskScore} / 10</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Recommended Months Coverage:</Text><Text style={pdfStyles.value}>{metrics.recommendedMonths} months</Text></View>
      </View>
      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Target Emergency Fund:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{metrics.recommendedAmount.toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Remaining to Save:</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{metrics.remainingAmount.toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
)

function CalculatorClientContent({ isPro = false }: { isPro?: boolean }) {
  const store = useEmergencyFundStore()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'
  
  const searchParams = useSearchParams()
  const savedId = searchParams?.get('savedId')

  const [mounted, setMounted] = useState(false)
  const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)
  
  useEffect(() => {
    setMounted(true)
    
    // Safely load saved scenario if savedId is detected by Next.js router
    if (savedId) {
      getSharedCalculatorAction(savedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state as any
          
          // Numbers
          if (state.monthlyExpenses !== undefined) store.setMonthlyExpenses(Number(state.monthlyExpenses))
          if (state.currentFund !== undefined) store.setCurrentFund(Number(state.currentFund))
          if (state.monthlySaving !== undefined) store.setMonthlySaving(Number(state.monthlySaving))
          if (state.interestRate !== undefined) store.setInterestRate(Number(state.interestRate))
          
          // Literal Union Types
          if (state.comfortLevel !== undefined) store.setComfortLevel(Number(state.comfortLevel) as any)
          if (state.employmentType !== undefined) store.setEmploymentType(String(state.employmentType) as any)
          if (state.jobSecurity !== undefined) store.setJobSecurity(String(state.jobSecurity) as any)
          if (state.incomeStability !== undefined) store.setIncomeStability(String(state.incomeStability) as any)
          
          // Booleans
          if (state.hasDependents !== undefined) store.setHasDependents(Boolean(state.hasDependents))
          if (state.hasHealthCosts !== undefined) store.setHasHealthCosts(Boolean(state.hasHealthCosts))
          if (state.hasIncomeProtection !== undefined) store.setHasIncomeProtection(Boolean(state.hasIncomeProtection))
          
          setSavedScenarioId(savedId)
        }
      }).catch(console.error)
    }
  }, [savedId])

  if (!mounted) return null

  const metrics = calculateEmergencyFundMetrics(store)

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    
    setIsSaving(true)
    try {
      const savedResult = await saveCalculatorAction({
        // 🔴 CHANGE THIS LINE: add 'personal-wealth/' in front of the slug
        calculator_slug: 'personal-wealth/emergency-fund-calculator',
        category: 'Personal Wealth',
        saved_name: `Emergency Fund: ${currencySymbol}${metrics.recommendedAmount.toLocaleString()}`,
        input_state: {
          monthlyExpenses: store.monthlyExpenses,
          currentFund: store.currentFund,
          // ... (keep the rest of your state properties here)
        },
        core_metric: metrics.recommendedAmount
      })
      if (savedResult?.id) {
        setSavedScenarioId(savedResult.id)
      }
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error) {
      console.error(error)
      alert("Failed to save. Ensure you are logged in properly.")
    } finally {
      setIsSaving(false)
    }
  }

  // Formatting helpers
  const formatCurrency = (val: number) => `${currencySymbol}${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  const formatTime = (months: number) => {
      if (months === 0) return 'Goal reached!'
      if (months === Infinity) return 'N/A'
      if (months < 1) return '< 1 mo'
      const yrs = Math.floor(months / 12)
      const mos = Math.ceil(months % 12)
      if (yrs === 0) return `${mos} mos`
      if (mos === 0) return `${yrs} yr`
      return `${yrs} yr, ${mos} mos`
  }

  // Pre-configured Export & Share data
  const exportData = [{
    "Monthly Expenses": `${currencySymbol} ${store.monthlyExpenses}`,
    "Current Fund": `${currencySymbol} ${store.currentFund}`,
    "Monthly Savings Contribution": `${currencySymbol} ${store.monthlySaving}`,
    "Risk Level Score": metrics.riskScore,
    "Recommended Target": `${currencySymbol} ${metrics.recommendedAmount}`,
    "Remaining Needed": `${currencySymbol} ${metrics.remainingAmount}`,
    "Time to Target (Months)": metrics.monthsToTarget === Infinity ? "N/A" : metrics.monthsToTarget.toFixed(1)
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/personal-wealth/emergency-fund-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/personal-wealth/emergency-fund-calculator`

  const OptionButton = ({ active, onClick, label, value }: { active: boolean, onClick: () => void, label: string, value?: string }) => (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
        active 
        ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20 ring-offset-1' 
        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <span className="block text-center">{label}</span>
      {value && <span className="block text-center text-[10px] opacity-70 font-normal mt-0.5">{value}</span>}
    </button>
  )

  const CheckboxRow = ({ checked, onChange, label }: { checked: boolean, onChange: (v: boolean) => void, label: string }) => (
    <label className="flex items-center gap-3 py-2.5 cursor-pointer group">
      <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all ${checked ? 'bg-primary border-primary text-primary-foreground scale-105' : 'border-border/80 bg-background group-hover:border-primary/40'}`}>
        {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  )

  const progressPercent = metrics.recommendedAmount > 0 ? Math.min(100, (store.currentFund / metrics.recommendedAmount) * 100) : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">
        
        {/* Section 1: Your Situation */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Your Situation
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Essential Monthly Expenses</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.monthlyExpenses || ''}
                  onChange={(e) => store.setMonthlyExpenses(Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Current Emergency Fund</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                  <Input 
                    type="number" 
                    value={store.currentFund === 0 ? '' : store.currentFund}
                    onChange={(e) => store.setCurrentFund(e.target.value === '' ? 0 : Number(e.target.value))}
                    className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Monthly Savings</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                  <Input 
                    type="number" 
                    value={store.monthlySaving === 0 ? '' : store.monthlySaving}
                    onChange={(e) => store.setMonthlySaving(e.target.value === '' ? 0 : Number(e.target.value))}
                    className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Interest on Savings (APY)</label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.interestRate === 0 ? '' : store.interestRate}
                  onChange={(e) => store.setInterestRate(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pr-14 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">% / yr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Risk Assessment */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Target className="h-5 w-5 text-primary" />
            Risk Assessment
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Employment Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <OptionButton active={store.employmentType === 'full-time'} onClick={() => store.setEmploymentType('full-time')} label="Full-time" />
                <OptionButton active={store.employmentType === 'part-time'} onClick={() => store.setEmploymentType('part-time')} label="Part-time" />
                <OptionButton active={store.employmentType === 'contract'} onClick={() => store.setEmploymentType('contract')} label="Contract" />
                <OptionButton active={store.employmentType === 'freelance'} onClick={() => store.setEmploymentType('freelance')} label="Freelance" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Job Security</label>
              <div className="grid grid-cols-3 gap-2">
                <OptionButton active={store.jobSecurity === 'high'} onClick={() => store.setJobSecurity('high')} label="High" />
                <OptionButton active={store.jobSecurity === 'medium'} onClick={() => store.setJobSecurity('medium')} label="Medium" />
                <OptionButton active={store.jobSecurity === 'low'} onClick={() => store.setJobSecurity('low')} label="Low" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Income Stability</label>
              <div className="grid grid-cols-3 gap-2">
                <OptionButton active={store.incomeStability === 'stable'} onClick={() => store.setIncomeStability('stable')} label="Stable" />
                <OptionButton active={store.incomeStability === 'seasonal'} onClick={() => store.setIncomeStability('seasonal')} label="Seasonal" />
                <OptionButton active={store.incomeStability === 'variable'} onClick={() => store.setIncomeStability('variable')} label="Variable" />
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-border/40">
              <CheckboxRow checked={store.hasDependents} onChange={store.setHasDependents} label="I have dependents" />
              <CheckboxRow checked={store.hasHealthCosts} onChange={store.setHasHealthCosts} label="Ongoing health costs" />
              <CheckboxRow checked={store.hasIncomeProtection} onChange={store.setHasIncomeProtection} label="I have income protection / insurance" />
            </div>
          </div>
        </div>

        {/* Section 3: Comfort Level */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <TrendingUp className="h-5 w-5 text-primary" />
            Your Comfort Level
          </h2>
          
          <div className="grid grid-cols-4 gap-2">
            <OptionButton active={store.comfortLevel === 3} onClick={() => store.setComfortLevel(3)} label="3 mo" value="Lean" />
            <OptionButton active={store.comfortLevel === 6} onClick={() => store.setComfortLevel(6)} label="6 mo" value="Standard" />
            <OptionButton active={store.comfortLevel === 9} onClick={() => store.setComfortLevel(9)} label="9 mo" value="Cautious" />
            <OptionButton active={store.comfortLevel === 12} onClick={() => store.setComfortLevel(12)} label="12 mo" value="Maximum" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            How many months of expenses would you feel comfortable holding? We compare your choice to what your risk profile suggests.
          </p>
        </div>

      </div>

      {/* RIGHT COLUMN: Results & Actions */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20 h-max">
        
        {/* Success Toast Popup */}
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-emerald-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        {/* The Result Card */}
        <div className="bg-white dark:bg-zinc-950 border rounded-3xl p-1 shadow-xl relative overflow-hidden">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-[22px] p-6 lg:p-8 flex flex-col gap-6">
            
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Recommended Emergency Fund
              </h3>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${metrics.riskScore >= 4 ? 'bg-red-500/10 text-red-600 border-red-500/20' : metrics.riskScore >= 2 ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'}`}>
                {metrics.riskLevelLabel}
              </div>
            </div>
            
            {/* Hero Amount */}
            <div className="space-y-2 bg-white dark:bg-zinc-900 border shadow-sm rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Target Amount</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl lg:text-6xl font-black tracking-tighter text-foreground">{formatCurrency(metrics.recommendedAmount)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong className="text-foreground">{metrics.recommendedMonths} months</strong> of {formatCurrency(store.monthlyExpenses)} expenses · Risk score: <strong>{metrics.riskScore}</strong>
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-4 flex flex-col items-start justify-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Current Coverage</p>
                <p className="text-xl lg:text-2xl font-black text-foreground">{metrics.currentCoverageMonths.toFixed(1)} <span className="text-sm font-medium text-muted-foreground">mos</span></p>
              </div>
              <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-4 flex flex-col items-start justify-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Remaining</p>
                <p className="text-xl lg:text-2xl font-black text-foreground">{formatCurrency(metrics.remainingAmount)}</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-4 flex flex-col items-start justify-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Time to Goal</p>
                <p className="text-xl lg:text-2xl font-black text-foreground">{formatTime(metrics.monthsToTarget)}</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-4 flex flex-col items-start justify-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Progress</p>
                <p className="text-xl lg:text-2xl font-black text-foreground">{progressPercent.toFixed(0)}%</p>
              </div>
            </div>

            {/* Comfort Level Warning */}
            {store.comfortLevel !== metrics.recommendedMonths && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm flex gap-3">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                <p>
                  You chose <strong>{store.comfortLevel} months</strong> ({formatCurrency(metrics.comfortAmount)}), but your profile points to <strong>{metrics.recommendedMonths} months</strong>. 
                  {store.comfortLevel > metrics.recommendedMonths ? " You may be holding excess cash that could be invested." : " Consider a deeper buffer for your risk level."}
                </p>
              </div>
            )}

          </div>
        </div>

        {/* Reach Target Faster / Growth Chart */}
        {metrics.remainingAmount > 0 && (
          <div className="bg-card border shadow-sm rounded-3xl p-6 lg:p-8">
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Reach Your Target Faster
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-2xl border border-border/40">
                <p className="text-xs text-muted-foreground font-semibold mb-1">In 12 months</p>
                <p className="text-xl font-black text-foreground">{formatCurrency(Math.round(metrics.twelveMonthTarget))}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </div>
              <div className="p-4 bg-muted/30 rounded-2xl border border-border/40">
                <p className="text-xs text-muted-foreground font-semibold mb-1">In 6 months</p>
                <p className="text-xl font-black text-foreground">{formatCurrency(Math.round(metrics.sixMonthTarget))}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 pt-6 border-t border-border/40">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Savings Progress</p>
                <p className="text-sm font-bold text-primary">{progressPercent.toFixed(0)}%</p>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-1000 ease-out rounded-full" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-semibold text-muted-foreground mt-2">
                <span>{formatCurrency(0)}</span>
                <span>{formatCurrency(Math.round(metrics.recommendedAmount / 2))}</span>
                <span>{formatCurrency(metrics.recommendedAmount)}</span>
              </div>
            </div>

            {/* Chart */}
            <div className="mt-6 pt-6 border-t border-border/40">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Path to Your Target</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Balance projection over time</p>
              </div>
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metrics.chartData} margin={{ top: 10, right: 5, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.02}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="label" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 11 }}
                      dy={8}
                      interval={3}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 11 }}
                      tickFormatter={(value) => `${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(Number(value)), 'Balance']}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: 13, fontWeight: 600 }}
                    />
                    <ReferenceLine 
                      y={metrics.recommendedAmount} 
                      stroke="#10b981" 
                      strokeDasharray="6 4" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#10b981" 
                      strokeWidth={2.5}
                      fill="url(#balanceGradient)"
                      dot={false}
                      activeDot={{ r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-emerald-500 rounded-full"></div>
                  <span>Your balance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 border-t-2 border-dashed border-emerald-500"></div>
                  <span>Target ({formatCurrency(metrics.recommendedAmount)})</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Save/Export/Share Actions */}
        <CalculatorActions
          slug="emergency-fund-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="EmergencyFundPlan"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<EmergencyFundReportPDF store={store} metrics={metrics} currencySymbol={currencySymbol} />}
        />

        {/* Disclaimer */}
        <div className="px-2">
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            Results are illustrative and based on fixed interest rates with no new contributions or withdrawals beyond what you entered. Your real emergency fund should be reviewed as your circumstances change.
          </p>
        </div>
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}

export function CalculatorClient(props: { isPro?: boolean }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CalculatorClientContent {...props} />
    </Suspense>
  )
}