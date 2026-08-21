/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertTriangle, Receipt, Calculator, PieChart, Activity } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'

  const [grossPaycheck, setGrossPaycheck] = useState(4000)
  
  // Pre-tax deductions
  const [traditional401kPercent, setTraditional401kPercent] = useState(5)
  const [healthInsurancePremium, setHealthInsurancePremium] = useState(150)
  const [hsaContribution, setHsaContribution] = useState(50)

  // Taxes
  const [federalTaxRate, setFederalTaxRate] = useState(12)
  const [stateTaxRate, setStateTaxRate] = useState(5)

  // Post-tax deductions
  const [roth401kPercent, setRoth401kPercent] = useState(0)
  const [otherPostTax, setOtherPostTax] = useState(0)

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
          if (state.grossPaycheck !== undefined) setGrossPaycheck(state.grossPaycheck as number)
          if (state.traditional401kPercent !== undefined) setTraditional401kPercent(state.traditional401kPercent as number)
          if (state.healthInsurancePremium !== undefined) setHealthInsurancePremium(state.healthInsurancePremium as number)
          if (state.hsaContribution !== undefined) setHsaContribution(state.hsaContribution as number)
          if (state.federalTaxRate !== undefined) setFederalTaxRate(state.federalTaxRate as number)
          if (state.stateTaxRate !== undefined) setStateTaxRate(state.stateTaxRate as number)
          if (state.roth401kPercent !== undefined) setRoth401kPercent(state.roth401kPercent as number)
          if (state.otherPostTax !== undefined) setOtherPostTax(state.otherPostTax as number)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  // Math Logic for Deductions
  const traditional401kAmount = grossPaycheck * (traditional401kPercent / 100);
  const totalPreTaxDeductions = traditional401kAmount + healthInsurancePremium + hsaContribution;

  // FICA (Social Security + Medicare) is usually calculated before 401k deductions, but after Health/HSA (Section 125 rules)
  // For simplicity in this general estimator, FICA is applied to (Gross - Medical)
  const ficaSubjectable = Math.max(0, grossPaycheck - healthInsurancePremium - hsaContribution);
  const ficaTax = ficaSubjectable * 0.0765;

  // Federal and State income tax are calculated on fully taxable income (Gross - Pre-Tax Deductions)
  const taxableIncome = Math.max(0, grossPaycheck - totalPreTaxDeductions);
  const federalTaxAmount = taxableIncome * (federalTaxRate / 100);
  const stateTaxAmount = taxableIncome * (stateTaxRate / 100);
  
  const totalTaxes = ficaTax + federalTaxAmount + stateTaxAmount;

  // Post-tax deductions
  const roth401kAmount = grossPaycheck * (roth401kPercent / 100); // Usually based on gross, but deducted post-tax
  const totalPostTaxDeductions = roth401kAmount + otherPostTax;

  const netPaycheck = grossPaycheck - totalPreTaxDeductions - totalTaxes - totalPostTaxDeductions;

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    setIsSaving(true)

    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'employment/employee-deduction-calculator',
        category: 'Employment & Salary',
        saved_name: `Paycheck Analysis on ${currencySymbol}${grossPaycheck}`,
        input_state: {
          grossPaycheck,
          traditional401kPercent,
          healthInsurancePremium,
          hsaContribution,
          federalTaxRate,
          stateTaxRate,
          roth401kPercent,
          otherPostTax
        },
        core_metric: Math.round(netPaycheck)
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
    "Gross Paycheck": `${currencySymbol}${grossPaycheck}`,
    "401k Pre-Tax": `${currencySymbol}${Math.round(traditional401kAmount)}`,
    "Health Insurance": `${currencySymbol}${Math.round(healthInsurancePremium)}`,
    "HSA Contribution": `${currencySymbol}${Math.round(hsaContribution)}`,
    "Taxable Income": `${currencySymbol}${Math.round(taxableIncome)}`,
    "FICA Taxes": `${currencySymbol}${Math.round(ficaTax)}`,
    "Federal Tax": `${currencySymbol}${Math.round(federalTaxAmount)}`,
    "State Tax": `${currencySymbol}${Math.round(stateTaxAmount)}`,
    "Roth 401k (Post-Tax)": `${currencySymbol}${Math.round(roth401kAmount)}`,
    "Other Post-Tax": `${currencySymbol}${Math.round(otherPostTax)}`,
    "Net Take Home": `${currencySymbol}${Math.round(netPaycheck)}`
  }]

  const chartData = [
    { name: 'Pre-Tax Deductions', amount: Math.round(totalPreTaxDeductions), fill: '#6366f1' },
    { name: 'Total Taxes', amount: Math.round(totalTaxes), fill: '#ef4444' },
    { name: 'Post-Tax Deductions', amount: Math.round(totalPostTaxDeductions), fill: '#f59e0b' },
    { name: 'Net Paycheck', amount: Math.round(netPaycheck), fill: '#3b82f6' },
  ]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/employment/employee-deduction-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/employment/employee-deduction-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      <div className="lg:col-span-4 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-8">
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Receipt className="h-5 w-5 text-muted-foreground" />
            Gross Earnings
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Gross Paycheck Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number"
                value={grossPaycheck === 0 ? '' : grossPaycheck}
                onChange={(e) => setGrossPaycheck(Number(e.target.value))}
                className="pl-7 text-lg font-medium"
              />
            </div>
            <p className="text-xs text-muted-foreground">Your pay before any taxes or deductions.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Activity className="h-5 w-5 text-muted-foreground" />
            Pre-Tax Deductions
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Traditional 401(k) (%)</label>
            <Input
              type="number"
              value={traditional401kPercent === 0 ? '' : traditional401kPercent}
              onChange={(e) => setTraditional401kPercent(Number(e.target.value))}
              className="text-lg font-medium"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Health Insurance Premium</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number"
                value={healthInsurancePremium === 0 ? '' : healthInsurancePremium}
                onChange={(e) => setHealthInsurancePremium(Number(e.target.value))}
                className="pl-7 text-lg font-medium"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">HSA / FSA Contribution</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number"
                value={hsaContribution === 0 ? '' : hsaContribution}
                onChange={(e) => setHsaContribution(Number(e.target.value))}
                className="pl-7 text-lg font-medium"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Calculator className="h-5 w-5 text-muted-foreground" />
            Estimated Taxes
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Fed Tax Withholding (%)</label>
            <Input
              type="number"
              value={federalTaxRate === 0 ? '' : federalTaxRate}
              onChange={(e) => setFederalTaxRate(Number(e.target.value))}
              className="text-lg font-medium"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">State Tax Withholding (%)</label>
            <Input
              type="number"
              value={stateTaxRate === 0 ? '' : stateTaxRate}
              onChange={(e) => setStateTaxRate(Number(e.target.value))}
              className="text-lg font-medium"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <PieChart className="h-5 w-5 text-muted-foreground" />
            Post-Tax Deductions
          </h2>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Roth 401(k) (%)</label>
            <Input
              type="number"
              value={roth401kPercent === 0 ? '' : roth401kPercent}
              onChange={(e) => setRoth401kPercent(Number(e.target.value))}
              className="text-lg font-medium"
            />
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

        <div className="bg-card border shadow-sm rounded-2xl overflow-hidden p-6 md:p-8 space-y-8">
          
          <div className="text-center animate-in fade-in">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Net Paycheck</h3>
            <p className="text-5xl md:text-6xl font-extrabold text-blue-600">{currencySymbol}{Math.round(netPaycheck).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-4 font-medium">After {currencySymbol}{Math.round(totalPreTaxDeductions + totalTaxes + totalPostTaxDeductions).toLocaleString()} in total deductions.</p>
          </div>

          <div className="h-[250px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} horizontal={false} />
                <XAxis type="number" tickFormatter={(val) => `${currencySymbol}${val}`} />
                <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12}} />
                <Tooltip
                  formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, undefined]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="amount" fill="#8884d8" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
            <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900 text-center">
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">Pre-Tax Total</p>
              <p className="text-xl font-bold text-indigo-700 dark:text-indigo-500">-{currencySymbol}{Math.round(totalPreTaxDeductions).toLocaleString()}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-xl border border-red-100 dark:border-red-900 text-center">
              <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-1">Total Taxes</p>
              <p className="text-xl font-bold text-red-700 dark:text-red-500">-{currencySymbol}{Math.round(totalTaxes).toLocaleString()}</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900 text-center">
              <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-1">Post-Tax Total</p>
              <p className="text-xl font-bold text-amber-700 dark:text-amber-500">-{currencySymbol}{Math.round(totalPostTaxDeductions).toLocaleString()}</p>
            </div>
          </div>

        </div>

        <CalculatorActions
          slug="employment/employee-deduction-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Paycheck_Deduction_Analysis"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
