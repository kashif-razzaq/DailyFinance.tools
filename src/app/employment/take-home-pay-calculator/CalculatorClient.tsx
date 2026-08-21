/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { usePlatformFeeStore } from '@/store/platform-fee-visualizer.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { DollarSign, Globe, ShoppingCart, PieChart, CheckCircle2, Wallet, Briefcase, Video } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type Profession = 'w2' | 'freelancer' | 'creator'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = usePlatformFeeStore()
  const metrics = store.getDerivedMetrics()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'

  const [profession, setProfession] = useState<Profession>('w2')

  // W2 State
  const [w2Salary, setW2Salary] = useState(75000)
  const [w2StateTaxRate, setW2StateTaxRate] = useState(5)
  const [w2FedTaxRate, setW2FedTaxRate] = useState(12)
  
  // 1099 Freelancer State
  const [freelanceRevenue, setFreelanceRevenue] = useState(100000)
  const [freelanceExpenses, setFreelanceExpenses] = useState(15000)
  const [freelanceIncomeTaxRate, setFreelanceIncomeTaxRate] = useState(12)

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
          if (state.monthlyRevenue !== undefined) {
            setProfession('creator')
            store.setMonthlyRevenue(state.monthlyRevenue as number)
          }
          if (state.avgTransactionSize !== undefined) store.setAvgTransactionSize(state.avgTransactionSize as number)
          if (state.percentInternational !== undefined) store.setPercentInternational(state.percentInternational as number)
          
          if (state.profession) setProfession(state.profession as Profession)
          if (state.w2Salary) setW2Salary(state.w2Salary as number)
          if (state.freelanceRevenue) setFreelanceRevenue(state.freelanceRevenue as number)

          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  // Derived calculations for W2
  const w2FicaTax = w2Salary * 0.0765 // Social Security (6.2%) + Medicare (1.45%)
  const w2StateTax = w2Salary * (w2StateTaxRate / 100)
  const w2FedTax = w2Salary * (w2FedTaxRate / 100)
  const w2TotalTaxes = w2FicaTax + w2StateTax + w2FedTax
  const w2TakeHome = w2Salary - w2TotalTaxes

  // Derived calculations for 1099
  const netBusinessIncome = freelanceRevenue - freelanceExpenses
  const selfEmploymentTax = netBusinessIncome * 0.153
  const halfSETaxDeduction = selfEmploymentTax / 2
  const taxableIncome = Math.max(0, netBusinessIncome - halfSETaxDeduction)
  const freelanceIncomeTax = taxableIncome * (freelanceIncomeTaxRate / 100)
  const freelanceTakeHome = netBusinessIncome - selfEmploymentTax - freelanceIncomeTax

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    setIsSaving(true)

    let coreMetric = 0
    let savedName = ""
    
    if (profession === 'creator') {
      coreMetric = Math.round(metrics.platforms[0].netRevenue)
      savedName = `Creator Fees on ${currencySymbol}${store.monthlyRevenue}`
    } else if (profession === 'w2') {
      coreMetric = Math.round(w2TakeHome)
      savedName = `W-2 Take Home on ${currencySymbol}${w2Salary}`
    } else {
      coreMetric = Math.round(freelanceTakeHome)
      savedName = `1099 Take Home on ${currencySymbol}${freelanceRevenue}`
    }

    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'employment/take-home-pay-calculator',
        category: 'Employment & Salary',
        saved_name: savedName,
        input_state: {
          profession,
          monthlyRevenue: store.monthlyRevenue,
          avgTransactionSize: store.avgTransactionSize,
          percentInternational: store.percentInternational,
          w2Salary,
          freelanceRevenue
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

  // Formatting Export Data based on Profession
  let exportData: any = []
  if (profession === 'creator') {
    exportData = metrics.platforms.map(p => ({
      "Platform": p.name,
      "Gross Revenue": `${currencySymbol}${store.monthlyRevenue}`,
      "Total Fees": `${currencySymbol}${Math.round(p.totalFees)}`,
      "Net Take Home": `${currencySymbol}${Math.round(p.netRevenue)}`,
      "Effective Fee %": `${p.effectiveFeeRate.toFixed(1)}%`
    }))
  } else if (profession === 'w2') {
    exportData = [{
      "Gross Salary": `${currencySymbol}${w2Salary}`,
      "FICA Tax": `${currencySymbol}${Math.round(w2FicaTax)}`,
      "State Tax": `${currencySymbol}${Math.round(w2StateTax)}`,
      "Federal Tax": `${currencySymbol}${Math.round(w2FedTax)}`,
      "Net Take Home": `${currencySymbol}${Math.round(w2TakeHome)}`
    }]
  } else {
    exportData = [{
      "Gross Revenue": `${currencySymbol}${freelanceRevenue}`,
      "Business Expenses": `${currencySymbol}${freelanceExpenses}`,
      "Self Employment Tax": `${currencySymbol}${Math.round(selfEmploymentTax)}`,
      "Income Tax": `${currencySymbol}${Math.round(freelanceIncomeTax)}`,
      "Net Take Home": `${currencySymbol}${Math.round(freelanceTakeHome)}`
    }]
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/employment/take-home-pay-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/employment/take-home-pay-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-4 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-8">

        {/* Profession Selector */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            Worker Type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: 'w2', label: 'W-2 Employee', icon: Wallet },
              { id: 'freelancer', label: '1099 Freelancer', icon: Briefcase },
              { id: 'creator', label: 'Digital Creator', icon: Video }
            ].map((p) => (
              <div
                key={p.id}
                onClick={() => setProfession(p.id as Profession)}
                className={`p-3 text-center rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                  profession === p.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 font-bold'
                    : 'border-border/60 hover:border-blue-500/50 text-muted-foreground'
                }`}
              >
                <p.icon className="h-5 w-5 mb-1" />
                <span className="text-xs leading-none">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Inputs based on profession */}
        {profession === 'w2' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Annual Gross Salary</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={w2Salary === 0 ? '' : w2Salary}
                  onChange={(e) => setW2Salary(Number(e.target.value))}
                  className="pl-7 text-lg font-medium"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Estimated Fed Tax Rate (%)</label>
              <Input
                type="number"
                value={w2FedTaxRate === 0 ? '' : w2FedTaxRate}
                onChange={(e) => setW2FedTaxRate(Number(e.target.value))}
                className="text-lg font-medium"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Estimated State Tax Rate (%)</label>
              <Input
                type="number"
                value={w2StateTaxRate === 0 ? '' : w2StateTaxRate}
                onChange={(e) => setW2StateTaxRate(Number(e.target.value))}
                className="text-lg font-medium"
              />
            </div>
          </div>
        )}

        {profession === 'freelancer' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Annual Gross Revenue (1099)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={freelanceRevenue === 0 ? '' : freelanceRevenue}
                  onChange={(e) => setFreelanceRevenue(Number(e.target.value))}
                  className="pl-7 text-lg font-medium"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Business Expenses (Write-offs)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={freelanceExpenses === 0 ? '' : freelanceExpenses}
                  onChange={(e) => setFreelanceExpenses(Number(e.target.value))}
                  className="pl-7 text-lg font-medium"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Effective Income Tax Rate (%)</label>
              <Input
                type="number"
                value={freelanceIncomeTaxRate === 0 ? '' : freelanceIncomeTaxRate}
                onChange={(e) => setFreelanceIncomeTaxRate(Number(e.target.value))}
                className="text-lg font-medium"
              />
            </div>
          </div>
        )}

        {profession === 'creator' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Gross Monthly Revenue</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.monthlyRevenue === 0 ? '' : store.monthlyRevenue}
                  onChange={(e) => store.setMonthlyRevenue(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Avg. Transaction Size</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="1"
                  value={store.avgTransactionSize === 0 ? '' : store.avgTransactionSize}
                  onChange={(e) => store.setAvgTransactionSize(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium"
                />
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-border/50">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold">International Customers</label>
                  <p className="text-xs text-muted-foreground mt-1">Non-US cards trigger higher processing fees.</p>
                </div>
                <span className="text-lg font-bold text-foreground">{store.percentInternational}%</span>
              </div>
              <Slider
                value={[store.percentInternational]}
                max={100} step={5}
                onValueChange={(val: any) => store.setPercentInternational(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>
          </div>
        )}

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-8 space-y-6 lg:sticky lg:top-8 relative z-20">

        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-blue-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        {/* Dynamic Display based on Profession */}
        <div className="bg-card border shadow-sm rounded-2xl overflow-hidden">
          
          {profession === 'creator' && (
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="py-4 px-6 font-bold text-sm text-muted-foreground uppercase tracking-wider">Platform</th>
                    <th className="py-4 px-6 font-bold text-sm text-muted-foreground uppercase tracking-wider">Net Take-Home</th>
                    <th className="py-4 px-6 font-bold text-sm text-muted-foreground uppercase tracking-wider">Total Fees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {metrics.platforms.map((p, idx) => (
                    <tr key={p.name} className={`hover:bg-muted/30 transition-colors ${idx === 0 ? 'bg-blue-50/50 dark:bg-blue-950/10' : ''}`}>
                      <td className="py-4 px-6 font-semibold flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: p.color}}></div>
                        {p.name}
                      </td>
                      <td className="py-4 px-6 font-bold text-blue-600 dark:text-blue-400">
                        {currencySymbol}{Math.round(p.netRevenue).toLocaleString()}
                      </td>
                      <td className="py-4 px-6 font-medium text-red-500">
                        {currencySymbol}{Math.round(p.totalFees).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {profession === 'w2' && (
            <div className="p-6 md:p-10 space-y-8">
              <div className="text-center">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Estimated Take Home Pay</h3>
                <p className="text-5xl md:text-6xl font-extrabold text-blue-600">{currencySymbol}{Math.round(w2TakeHome).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-4 font-medium">After {currencySymbol}{Math.round(w2TotalTaxes).toLocaleString()} in taxes</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Fed Taxes</p>
                  <p className="text-xl font-bold text-red-500">-{currencySymbol}{Math.round(w2FedTax).toLocaleString()}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">State Taxes</p>
                  <p className="text-xl font-bold text-red-500">-{currencySymbol}{Math.round(w2StateTax).toLocaleString()}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">FICA (SS & Medicare)</p>
                  <p className="text-xl font-bold text-red-500">-{currencySymbol}{Math.round(w2FicaTax).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {profession === 'freelancer' && (
            <div className="p-6 md:p-10 space-y-8">
              <div className="text-center">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Estimated Take Home Pay</h3>
                <p className="text-5xl md:text-6xl font-extrabold text-blue-600">{currencySymbol}{Math.round(freelanceTakeHome).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-4 font-medium">After deductions and {currencySymbol}{Math.round(selfEmploymentTax + freelanceIncomeTax).toLocaleString()} in taxes</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Net Business Income</p>
                  <p className="text-xl font-bold text-foreground">{currencySymbol}{Math.round(netBusinessIncome).toLocaleString()}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Self-Employment Tax</p>
                  <p className="text-xl font-bold text-red-500">-{currencySymbol}{Math.round(selfEmploymentTax).toLocaleString()}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Income Tax</p>
                  <p className="text-xl font-bold text-red-500">-{currencySymbol}{Math.round(freelanceIncomeTax).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        <CalculatorActions
          slug="employment/take-home-pay-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Take_Home_Pay_Calculator_Export"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
