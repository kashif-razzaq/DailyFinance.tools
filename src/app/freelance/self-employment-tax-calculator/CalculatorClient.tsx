/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { SaveToast } from "@/components/shared/SaveToast"

import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Briefcase, Home, Calculator, Target, Info } from "lucide-react"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { unwrapSaveResult } from '@/lib/save-result'
import { openLoginModal } from '@/lib/auth-modal'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

// 2026 Schedule SE figures (verified: SSA Contribution and Benefit Base;
// IRS Topic No. 560, Additional Medicare Tax):
// Social Security wage base $184,500; SS 12.4%, Medicare 2.9%,
// Additional Medicare 0.9% above $200,000 (single) / $250,000 (MFJ).
// All money math is done in integer cents to avoid float rounding errors.
const SS_WAGE_BASE_CENTS = 18450000
const ADDITIONAL_MEDICARE_THRESHOLD_CENTS = { single: 20000000, mfj: 25000000 } as const

const fmt = (cents: number) => (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'

  const [netEarnings, setNetEarnings] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'mfj'>('single')
  const [homeOfficeDeduction, setHomeOfficeDeduction] = useState(0)
  const [marginalRate, setMarginalRate] = useState(22)

  const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastVariant, setToastVariant] = useState<'success' | 'error'>('success')
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.netEarnings !== undefined) setNetEarnings(state.netEarnings as any)
          if (state.filingStatus === 'single' || state.filingStatus === 'mfj') setFilingStatus(state.filingStatus)
          if (state.homeOfficeDeduction !== undefined) setHomeOfficeDeduction(state.homeOfficeDeduction as any)
          if (state.marginalRate !== undefined) setMarginalRate(state.marginalRate as any)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  // --- Schedule SE calculation (2026), all in integer cents ---
  const netEarningsCents = Math.round(netEarnings * 100)
  const homeOfficeCents = Math.round(homeOfficeDeduction * 100)
  // Home-office deduction reduces net earnings BEFORE the SE-tax calculation.
  const adjustedNetCents = Math.max(0, netEarningsCents - homeOfficeCents)
  // Net earnings for SE tax = 92.35% of adjusted net earnings (Schedule SE).
  const seBaseCents = Math.round(adjustedNetCents * 0.9235)
  // Social Security: 12.4% on the base up to the 2026 wage base of $184,500.
  const ssCents = Math.round(Math.min(seBaseCents, SS_WAGE_BASE_CENTS) * 0.124)
  // Medicare: 2.9% on the full base, no cap.
  const medicareCents = Math.round(seBaseCents * 0.029)
  // Additional Medicare: 0.9% on the base above the filing-status threshold.
  const additionalThresholdCents = ADDITIONAL_MEDICARE_THRESHOLD_CENTS[filingStatus]
  const additionalCents = Math.round(Math.max(0, seBaseCents - additionalThresholdCents) * 0.009)
  const totalSeTaxCents = ssCents + medicareCents + additionalCents
  // Deduction for one-half of SE tax (reduces income tax, not SE tax itself).
  const halfSeTaxCents = Math.round(totalSeTaxCents / 2)
  const incomeTaxSavingCents = Math.round(halfSeTaxCents * marginalRate / 100)
  const effectiveRate = netEarningsCents > 0 ? (totalSeTaxCents / netEarningsCents) * 100 : 0
  const netAfterSeTaxCents = netEarningsCents - totalSeTaxCents
  const ssCapped = seBaseCents > SS_WAGE_BASE_CENTS

  const handleSave = async () => {
    
    setIsSaving(true)
    try {
      const savedResult = unwrapSaveResult(await saveCalculatorAction({
        calculator_slug: 'self-employment-tax-calculator',
        category: 'Freelance & Business',
        saved_name: `SE Tax: ${currencySymbol}${Math.round(totalSeTaxCents / 100).toLocaleString()}`,
        input_state: {
          netEarnings,
          filingStatus,
          homeOfficeDeduction,
          marginalRate
        },
        core_metric: Math.round(totalSeTaxCents / 100)
      }))
      if (savedResult?.id) {
        setSavedScenarioId(savedResult.id)
      }
      setToastVariant('success')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
    } catch (error) {
      console.error(error)
      if (error instanceof Error && error.message.includes('Free accounts can save')) { setShowProModal(true); return }
      if (error instanceof Error && error.message.includes('Unauthorized')) { openLoginModal(() => { void handleSave() }); return }
      setToastVariant('error')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
    } finally {
      setIsSaving(false)
    }
  }

  const exportData = [{
    "Net Earnings": `${currency} ${netEarnings}`,
    "Filing Status": filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
    "Home-Office Deduction": `${currency} ${homeOfficeDeduction}`,
    "SE Tax Base (92.35%)": `${currency} ${fmt(seBaseCents)}`,
    "Social Security Tax (12.4%)": `${currency} ${fmt(ssCents)}`,
    "Medicare Tax (2.9%)": `${currency} ${fmt(medicareCents)}`,
    "Additional Medicare Tax (0.9%)": `${currency} ${fmt(additionalCents)}`,
    "Total SE Tax": `${currency} ${fmt(totalSeTaxCents)}`,
    "Effective SE Tax Rate %": effectiveRate.toFixed(2),
    "One-Half SE Tax Deduction": `${currency} ${fmt(halfSeTaxCents)}`,
    "Income-Tax Saving at Marginal Rate": `${currency} ${fmt(incomeTaxSavingCents)}`,
    "Net Earnings After SE Tax": `${currency} ${fmt(netAfterSeTaxCents)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/freelance/self-employment-tax-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/freelance/self-employment-tax-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-6 xl:col-span-5 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-10">
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            Your Earnings
          </h2>
          
          <div className="space-y-4">
            <label className="text-sm font-semibold text-foreground">Net Earnings from Self-Employment (Annual)</label>
            <p className="text-xs text-muted-foreground">Your Schedule C net profit — gross revenue minus all deductible business expenses.</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-xl">{currencySymbol}</span>
              <Input 
                type="number" 
                value={netEarnings === 0 ? '' : netEarnings}
                onChange={(e) => setNetEarnings(e.target.value === '' ? 0 : Number(e.target.value))}
                className="pl-9 h-14 text-2xl font-bold bg-muted/50 focus:bg-background transition-colors border-border/60 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground block">Filing Status</label>
            <p className="text-xs text-muted-foreground">Sets the threshold for the 0.9% Additional Medicare Tax.</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={filingStatus === 'single' ? 'default' : 'outline'} 
                className={filingStatus === 'single' ? 'bg-primary hover:bg-primary/90' : ''}
                onClick={() => setFilingStatus('single')}
              >
                Single
              </Button>
              <Button 
                variant={filingStatus === 'mfj' ? 'default' : 'outline'} 
                className={filingStatus === 'mfj' ? 'bg-primary hover:bg-primary/90' : ''}
                onClick={() => setFilingStatus('mfj')}
              >
                Married Filing Jointly
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Home className="h-5 w-5 text-muted-foreground" />
            Home-Office Deduction
          </h2>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground flex justify-between">
              <span>Home-Office Deduction (Annual)</span>
              <span className="text-muted-foreground text-xs font-normal">Optional</span>
            </label>
            <p className="text-xs text-muted-foreground">Your home-office deduction (simplified or actual expenses) reduces your net earnings before self-employment tax is calculated. Leave at 0 if you don&apos;t claim one.</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input 
                type="number" 
                value={homeOfficeDeduction === 0 ? '' : homeOfficeDeduction}
                onChange={(e) => setHomeOfficeDeduction(e.target.value === '' ? 0 : Number(e.target.value))}
                className="pl-7 bg-muted/50"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Calculator className="h-5 w-5 text-muted-foreground" />
            Tax Bracket Check
          </h2>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Marginal Income Tax Rate</label>
            <p className="text-xs text-muted-foreground">Used only to estimate the income-tax saving from the one-half of SE tax deduction.</p>
            <div className="relative">
              <Input 
                type="number" 
                value={marginalRate === 0 ? '' : marginalRate}
                onChange={(e) => setMarginalRate(e.target.value === '' ? 0 : Number(e.target.value))}
                className="bg-muted/50 pr-8 text-right"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">%</span>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6">
        
        <SaveToast show={showToast} variant={toastVariant} onClose={() => setShowToast(false)} />

        {/* SE Tax Breakdown */}
        <div className="bg-card border shadow-sm rounded-2xl p-0 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-primary"></div>
          
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-foreground">
              <span className="bg-primary/10 text-foreground/80 p-2 rounded-lg">
                <Target className="h-5 w-5" />
              </span>
              Self-Employment Tax Breakdown
            </h3>

            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60">
                <span className="text-muted-foreground">Net Earnings from Self-Employment</span>
                <span className="font-semibold text-foreground">{currencySymbol}{fmt(netEarningsCents)}</span>
              </div>

              {homeOfficeCents > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60 text-emerald-600/80">
                  <span>Less: Home-Office Deduction</span>
                  <span>-{currencySymbol}{fmt(homeOfficeCents)}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60">
                <span className="text-muted-foreground">Adjusted Net Earnings</span>
                <span className="font-semibold text-foreground">{currencySymbol}{fmt(adjustedNetCents)}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60">
                <span className="text-muted-foreground">SE Tax Base (92.35%)</span>
                <span className="font-semibold text-foreground">{currencySymbol}{fmt(seBaseCents)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60 text-red-600/80">
                <span>Social Security (12.4%{ssCapped ? ' — wage base reached' : ''})</span>
                <span>-{currencySymbol}{fmt(ssCents)}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60 text-red-600/80">
                <span>Medicare (2.9%)</span>
                <span>-{currencySymbol}{fmt(medicareCents)}</span>
              </div>

              {additionalCents > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60 text-red-600/80">
                  <span>Additional Medicare (0.9% above {currencySymbol}{fmt(additionalThresholdCents)})</span>
                  <span>-{currencySymbol}{fmt(additionalCents)}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-4 font-sans border-b-2 border-border/80">
                <span className="font-bold text-foreground">Total Self-Employment Tax</span>
                <span className="font-bold text-lg">{currencySymbol}{fmt(totalSeTaxCents)}</span>
              </div>
            </div>

            <div className="mt-8 bg-primary/5 rounded-2xl p-6 border border-primary/20 shadow-sm text-foreground/80">
              <h4 className="text-xs uppercase tracking-wider font-bold text-foreground/80/60 mb-2">Total Self-Employment Tax</h4>
              <div className="flex items-baseline gap-2 text-foreground/80">
                <span className="text-5xl font-black tracking-tighter">{currencySymbol}{fmt(totalSeTaxCents)}</span>
                <span className="text-sm font-semibold opacity-70">/ year</span>
              </div>
              <div className="mt-4 flex justify-between items-center text-sm font-medium">
                <span className="opacity-70">Effective SE tax rate on net earnings:</span>
                <span className="px-3 py-1 bg-muted rounded-full text-foreground">{effectiveRate.toFixed(2)}%</span>
              </div>
              <div className="mt-3 flex justify-between items-center text-sm font-medium">
                <span className="opacity-70">Net earnings after SE tax:</span>
                <span className="font-bold text-foreground">{currencySymbol}{fmt(netAfterSeTaxCents)}</span>
              </div>
            </div>

            <div className="mt-6 bg-muted/30 rounded-xl p-5 border border-border/50">
              <h4 className="font-bold mb-2 flex items-center gap-2 text-sm"><Info className="h-4 w-4 text-muted-foreground" /> Deduction for One-Half of SE Tax</h4>
              <div className="flex justify-between items-center text-sm py-1">
                <span className="text-muted-foreground">One-half of SE tax (deductible)</span>
                <span className="font-bold">{currencySymbol}{fmt(halfSeTaxCents)}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-1">
                <span className="text-muted-foreground">Est. income-tax saving at {marginalRate}%</span>
                <span className="font-bold text-emerald-700">{currencySymbol}{fmt(incomeTaxSavingCents)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                You may deduct one-half of your SE tax from your income when figuring your federal income tax. This deduction reduces your income tax — it does not reduce the SE tax itself.
              </p>
            </div>

            <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
              2026 figures: Social Security wage base {currencySymbol}184,500 · Additional Medicare threshold {currencySymbol}200,000 (single) / {currencySymbol}250,000 (married filing jointly). Estimates only, not tax advice.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
                <CalculatorActions
              slug="self-employment-tax-calculator"
              onSave={handleSave}
              isSaving={isSaving}
              isPro={isPro}
              exportData={exportData}
              exportFilename="SelfEmploymentTax"
              onRequirePro={() => setShowProModal(true)}
              shareUrl={shareUrl}
            />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
