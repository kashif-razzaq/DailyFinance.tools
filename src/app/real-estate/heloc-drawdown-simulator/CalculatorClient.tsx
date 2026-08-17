/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { CalculatorActions } from '@/components/calculator/CalculatorActions'
import { ProUpgradeModal } from '@/components/shared/ProUpgradeModal'
import { useHelocDrawdownStore } from '@/store/heloc_drawdown.store'
import { Target, DollarSign, Activity } from 'lucide-react'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const dummyIsPro = isPro;
  const store = useHelocDrawdownStore()
  const [showProModal, setShowProModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)

  const handleSave = async () => {
    setIsSaving(true)
    setTimeout(() => {
      setSavedScenarioId('sim_' + Math.random().toString(36).substr(2, 9))
      setIsSaving(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }, 1000)
  }

  // Calculations

  const availableCredit = store.creditLimit - store.amountDrawn;
  const monthlyInterestOnly = store.amountDrawn * (store.interestRate / 100 / 12);
  const annualInterest = monthlyInterestOnly * 12;

  const r = store.interestRate / 100 / 12;
  const n = 20 * 12;
  const fullyAmortized = r > 0 ? store.amountDrawn * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : store.amountDrawn / n;


  const metrics = {
    availableCredit, monthlyInterestOnly, annualInterest, fullyAmortized
  };

  const exportData = [{
    ...store,
    ...metrics
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/real-estate/heloc-drawdown-simulator?savedId=${savedScenarioId}`
    : `${baseUrl}/real-estate/heloc-drawdown-simulator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      {showToast && (
        <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-emerald-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
          <span className="font-semibold text-sm">Saved to Scenario Vault!</span>
        </div>
      )}

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-12 xl:col-span-4 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Target className="h-5 w-5 text-muted-foreground" />
            Parameters
          </h2>


          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">HELOC Credit Limit</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.creditLimit === 0 ? '' : store.creditLimit}
                onChange={(e) => store.setCreditLimit(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Amount Drawn</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.amountDrawn === 0 ? '' : store.amountDrawn}
                onChange={(e) => store.setAmountDrawn(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Interest Rate (%)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.interestRate === 0 ? '' : store.interestRate}
                onChange={(e) => store.setInterestRate(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-6">
        <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2"><Activity className="h-5 w-5 text-primary"/> Results Analysis</h3>
              <p className="text-sm text-muted-foreground">Based on your provided parameters.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Available Credit Remaining</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.availableCredit).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Monthly Interest-Only Payment</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.monthlyInterestOnly).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Annual Interest Cost</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.annualInterest).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Estimated Fully Amortized Payment (20yr)</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.fullyAmortized).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="heloc-drawdown-simulator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="heloc-drawdown-simulator"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
