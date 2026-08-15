'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Car, Calculator, FileText, Banknote, ShieldCheck } from "lucide-react"
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const [monthlyLease, setMonthlyLease] = useState(600)
  const [downPayment, setDownPayment] = useState(3600)
  const [leaseTermMonths, setLeaseTermMonths] = useState(36)
  
  const [businessMiles, setBusinessMiles] = useState(12000)
  const [personalMiles, setPersonalMiles] = useState(3000)
  
  const [annualGas, setAnnualGas] = useState(1800)
  const [annualInsurance, setAnnualInsurance] = useState(1200)
  const [annualRepairs, setAnnualRepairs] = useState(500)
  
  const [taxBracket, setTaxBracket] = useState(24)

  const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)

  const [results, setResults] = useState({
    businessUsePercent: 0,
    totalMiles: 0,
    
    annualLeaseCost: 0,
    amortizedDownPayment: 0,
    totalActualExpenses: 0,
    actualDeduction: 0,
    
    standardMileageDeduction: 0,
    
    bestDeduction: 0,
    bestMethod: '',
    estimatedTaxSavings: 0
  })

  useEffect(() => {
    // Load saved scenario if savedId is in URL
    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.monthlyLease !== undefined) setMonthlyLease(state.monthlyLease as any)
          if (state.downPayment !== undefined) setDownPayment(state.downPayment as any)
          if (state.leaseTermMonths !== undefined) setLeaseTermMonths(state.leaseTermMonths as any)
          if (state.businessMiles !== undefined) setBusinessMiles(state.businessMiles as any)
          if (state.personalMiles !== undefined) setPersonalMiles(state.personalMiles as any)
          if (state.annualGas !== undefined) setAnnualGas(state.annualGas as any)
          if (state.annualInsurance !== undefined) setAnnualInsurance(state.annualInsurance as any)
          if (state.annualRepairs !== undefined) setAnnualRepairs(state.annualRepairs as any)
          if (state.taxBracket !== undefined) setTaxBracket(state.taxBracket as any)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  useEffect(() => {
    const safeMonthlyLease = monthlyLease || 0
    const safeDownPayment = downPayment || 0
    const safeLeaseTermMonths = leaseTermMonths || 0
    const safeBusinessMiles = businessMiles || 0
    const safePersonalMiles = personalMiles || 0
    const safeAnnualGas = annualGas || 0
    const safeAnnualInsurance = annualInsurance || 0
    const safeAnnualRepairs = annualRepairs || 0
    const safeTaxBracket = taxBracket || 0

    const totalMiles = safeBusinessMiles + safePersonalMiles
    const businessUsePercent = totalMiles > 0 ? (safeBusinessMiles / totalMiles) : 0

    const IRS_RATE_2024 = 0.67
    const standardMileageDeduction = safeBusinessMiles * IRS_RATE_2024

    const annualLeaseCost = safeMonthlyLease * 12
    const amortizedDownPayment = safeLeaseTermMonths > 0 ? safeDownPayment / (safeLeaseTermMonths / 12) : 0
    const totalActualExpenses = annualLeaseCost + amortizedDownPayment + safeAnnualGas + safeAnnualInsurance + safeAnnualRepairs
    
    const actualDeduction = totalActualExpenses * businessUsePercent

    const isActualBetter = actualDeduction > standardMileageDeduction
    const bestDeduction = isActualBetter ? actualDeduction : standardMileageDeduction
    const bestMethod = isActualBetter ? 'Actual Expenses Method' : 'Standard Mileage Method'
    
    const estimatedTaxSavings = bestDeduction * (safeTaxBracket / 100)

    setResults({
      businessUsePercent: businessUsePercent * 100,
      totalMiles,
      annualLeaseCost,
      amortizedDownPayment,
      totalActualExpenses,
      actualDeduction,
      standardMileageDeduction,
      bestDeduction,
      bestMethod,
      estimatedTaxSavings
    })
  }, [monthlyLease, downPayment, leaseTermMonths, businessMiles, personalMiles, annualGas, annualInsurance, annualRepairs, taxBracket])

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
        calculator_slug: 'auto-lease-write-off-calculator',
        category: 'Freelance',
        saved_name: `Lease Deduct: ${formatCurrency(results.bestDeduction)}`,
        input_state: {
          monthlyLease,
          downPayment,
          leaseTermMonths,
          businessMiles,
          personalMiles,
          annualGas,
          annualInsurance,
          annualRepairs,
          taxBracket
        },
        core_metric: results.bestDeduction
      })
      if (savedResult?.id) {
        setSavedScenarioId(savedResult.id)
      }
    } catch (error) {
      console.error(error)
      alert("Failed to save.")
    } finally {
      setIsSaving(false)
    }
  }

  const exportData = [{
    "Monthly Lease": formatCurrency(monthlyLease || 0),
    "Business Use Percentage": `${results.businessUsePercent.toFixed(1)}%`,
    "Actual Expenses Deduction": formatCurrency(results.actualDeduction),
    "Standard Mileage Deduction": formatCurrency(results.standardMileageDeduction),
    "Optimal Method": results.bestMethod,
    "Est. Tax Savings": formatCurrency(results.estimatedTaxSavings)
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/freelance/auto-lease-write-off-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/freelance/auto-lease-write-off-calculator`

  return (
    <div className="w-full space-y-8">
      <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold flex items-center mb-6">
          <Car className="w-5 h-5 text-primary mr-2" />
          Estimated Lease Write-Off Savings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-emerald-50/50 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/50">
            <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-1 flex items-center">
              <Banknote className="w-4 h-4 mr-2" />
              Estimated Annual Tax Savings
            </div>
            <div className="text-4xl font-black text-emerald-900 dark:text-emerald-300 tracking-tight">
              {formatCurrency(results.estimatedTaxSavings)}
            </div>
            <div className="text-sm text-emerald-700/80 dark:text-emerald-400/80 mt-2">
              Based on your {taxBracket || 0}% tax bracket
            </div>
          </div>

          <div className="p-6 rounded-xl bg-muted/50 border border-border relative overflow-hidden">
            <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Optimal Deduction Method
            </div>
            <div className="text-2xl font-black text-foreground tracking-tight mt-2">
              {results.bestMethod}
            </div>
            <div className="text-sm text-muted-foreground mt-2 font-mono">
              Total Deduction: {formatCurrency(results.bestDeduction)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
        <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full space-y-10">
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
              <Calculator className="h-5 w-5 text-muted-foreground" />
              Lease & Usage Details
            </h2>

            <div className="space-y-4">
              <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">Annual Mileage</h4>
              <div>
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>Business Miles</span>
                  <span className="text-primary font-mono">{results.businessUsePercent.toFixed(1)}% Use</span>
                </label>
                <div className="relative mb-3">
                   <Input 
                    type="number" 
                    value={businessMiles === 0 ? '' : businessMiles} 
                    onChange={handleNumChange(setBusinessMiles)}
                    className="font-mono bg-muted/50 focus:bg-background transition-colors border-border/60"
                  />
                </div>
              </div>
              <div>
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>Personal / Commuting Miles</span>
                </label>
                <div className="relative">
                  <Input 
                    type="number" 
                    value={personalMiles === 0 ? '' : personalMiles} 
                    onChange={handleNumChange(setPersonalMiles)}
                    className="font-mono bg-muted/50 focus:bg-background transition-colors border-border/60"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 my-6"></div>

            <div className="space-y-6">
              <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">Lease Financials</h4>
              
              <div>
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>Monthly Lease Payment</span>
                  <span className="text-primary font-mono">{formatCurrency(monthlyLease || 0)}/mo</span>
                </label>
                <Slider
                  value={[monthlyLease || 0]}
                  onValueChange={(val: any) => setMonthlyLease(Array.isArray(val) ? val[0] : val)}
                  min={100}
                  max={2500}
                  step={25}
                  className="py-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Down Payment</label>
                  <Input 
                    type="number" 
                    value={downPayment === 0 ? '' : downPayment} 
                    onChange={handleNumChange(setDownPayment)}
                    className="font-mono bg-muted/50 focus:bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Lease Term (Mo)</label>
                  <Input 
                    type="number" 
                    value={leaseTermMonths === 0 ? '' : leaseTermMonths} 
                    onChange={handleNumChange(setLeaseTermMonths)}
                    className="font-mono bg-muted/50 focus:bg-background"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 my-6"></div>

            <div className="space-y-6">
              <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">Annual Operating Costs</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Gas / Charging</label>
                  <Input 
                    type="number" 
                    value={annualGas === 0 ? '' : annualGas} 
                    onChange={handleNumChange(setAnnualGas)}
                    className="font-mono bg-muted/50 focus:bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Insurance</label>
                  <Input 
                    type="number" 
                    value={annualInsurance === 0 ? '' : annualInsurance} 
                    onChange={handleNumChange(setAnnualInsurance)}
                    className="font-mono bg-muted/50 focus:bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Repairs & Maint.</label>
                  <Input 
                    type="number" 
                    value={annualRepairs === 0 ? '' : annualRepairs} 
                    onChange={handleNumChange(setAnnualRepairs)}
                    className="font-mono bg-muted/50 focus:bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Marginal Tax %</label>
                  <Input 
                    type="number" 
                    value={taxBracket === 0 ? '' : taxBracket} 
                    onChange={handleNumChange(setTaxBracket)}
                    className="font-mono bg-muted/50 focus:bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold mb-6">Method Comparison</h3>
            
            <div className="space-y-8">
              <div className={`p-4 rounded-xl border-2 ${results.bestMethod === 'Actual Expenses Method' ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'}`}>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex justify-between">
                  <span>Actual Expenses Method</span>
                  {results.bestMethod === 'Actual Expenses Method' && <span className="text-primary bg-primary/10 px-2 py-0.5 rounded text-xs">Winner</span>}
                </h4>
                <div className="space-y-2 font-mono text-sm mb-4">
                  <div className="flex justify-between items-center py-1 text-muted-foreground">
                    <span>Total Lease Payments</span>
                    <span>{formatCurrency(results.annualLeaseCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 text-muted-foreground">
                    <span>Amortized Down Payment</span>
                    <span>{formatCurrency(results.amortizedDownPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 text-muted-foreground">
                    <span>Gas, Insurance, Repairs</span>
                    <span>{formatCurrency((annualGas||0) + (annualInsurance||0) + (annualRepairs||0))}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-border mt-2 pt-2">
                    <span className="text-foreground">Total Vehicle Costs</span>
                    <span className="text-foreground">{formatCurrency(results.totalActualExpenses)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 text-amber-600 font-bold">
                    <span>x Business Use %</span>
                    <span>{results.businessUsePercent.toFixed(1)}%</span>
                  </div>
                </div>
                <div className={`flex justify-between items-center py-3 px-4 rounded-lg font-bold ${results.bestMethod === 'Actual Expenses Method' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <span className="font-sans">Calculated Deduction</span>
                  <span>{formatCurrency(results.actualDeduction)}</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border-2 ${results.bestMethod === 'Standard Mileage Method' ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'}`}>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex justify-between">
                  <span>Standard Mileage Method</span>
                  {results.bestMethod === 'Standard Mileage Method' && <span className="text-primary bg-primary/10 px-2 py-0.5 rounded text-xs">Winner</span>}
                </h4>
                <div className="space-y-2 font-mono text-sm mb-4">
                  <div className="flex justify-between items-center py-1 text-muted-foreground">
                    <span>Total Business Miles</span>
                    <span>{(businessMiles||0).toLocaleString()} miles</span>
                  </div>
                  <div className="flex justify-between items-center py-1 text-muted-foreground">
                    <span>IRS Standard Rate (2024)</span>
                    <span>$0.67 / mile</span>
                  </div>
                </div>
                <div className={`flex justify-between items-center py-3 px-4 rounded-lg font-bold ${results.bestMethod === 'Standard Mileage Method' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <span className="font-sans">Calculated Deduction</span>
                  <span>{formatCurrency(results.standardMileageDeduction)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-200 dark:border-amber-900">
             <h3 className="text-md font-bold text-amber-900 dark:text-amber-500 mb-2 flex items-center">
               <FileText className="w-5 h-5 mr-2" />
               The "Inclusion Amount" Rule
             </h3>
             <p className="text-amber-800 dark:text-amber-200/80 text-sm mb-0">
               If you lease a "luxury" vehicle (as classified by IRS limits), you may have to reduce your Actual Expenses deduction by an <strong>Inclusion Amount</strong>. This is designed to equalize the deduction limits applied to people who <em>buy</em> luxury vehicles. Always consult a CPA to verify inclusion amounts for your specific vehicle.
             </p>
          </div>
          
          <CalculatorActions 
            slug="auto-lease-write-off-calculator"
            onSave={handleSave}
            isSaving={isSaving}
            isPro={isPro}
            exportData={exportData}
            exportFilename="auto-lease-write-off.csv"
            onRequirePro={() => setShowProModal(true)}
            shareUrl={shareUrl}
          />
        </div>
      </div>
      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}

