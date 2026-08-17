/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { CalculatorActions } from '@/components/calculator/CalculatorActions'
import { ProUpgradeModal } from '@/components/shared/ProUpgradeModal'
import { useDebtAvalancheVsSnowballStore } from '@/store/debt_avalanche_vs_snowball.store'
import { Target, DollarSign, Activity } from 'lucide-react'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const dummyIsPro = isPro;
  const store = useDebtAvalancheVsSnowballStore()
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

  // Avalanche Calculation (highest interest first)
  let balanceAvalanche1 = store.debt1Balance;
  let balanceAvalanche2 = store.debt2Balance;
  let monthsAvalanche = 0;
  let interestAvalanche = 0;
  const paymentA1 = store.debt1MinPayment;
  const paymentA2 = store.debt2MinPayment;
  const extraPmt = store.extraMonthlyPayment;

  while ((balanceAvalanche1 > 0 || balanceAvalanche2 > 0) && monthsAvalanche < 600) {
      let r1 = store.debt1Rate / 100 / 12;
      let r2 = store.debt2Rate / 100 / 12;

      let int1 = balanceAvalanche1 * r1;
      let int2 = balanceAvalanche2 * r2;
      interestAvalanche += (int1 + int2);

      let extraLeft = extraPmt;

      // Pay mins
      let pmt1 = Math.min(balanceAvalanche1 + int1, paymentA1);
      balanceAvalanche1 -= (pmt1 - int1);

      let pmt2 = Math.min(balanceAvalanche2 + int2, paymentA2);
      balanceAvalanche2 -= (pmt2 - int2);

      // Allocate extra to highest rate
      if (store.debt1Rate > store.debt2Rate) {
          let to1 = Math.min(balanceAvalanche1, extraLeft);
          balanceAvalanche1 -= to1;
          extraLeft -= to1;
          let to2 = Math.min(balanceAvalanche2, extraLeft);
          balanceAvalanche2 -= to2;
      } else {
          let to2 = Math.min(balanceAvalanche2, extraLeft);
          balanceAvalanche2 -= to2;
          extraLeft -= to2;
          let to1 = Math.min(balanceAvalanche1, extraLeft);
          balanceAvalanche1 -= to1;
      }
      monthsAvalanche++;
  }

  // Snowball Calculation (lowest balance first)
  let balanceSnowball1 = store.debt1Balance;
  let balanceSnowball2 = store.debt2Balance;
  let monthsSnowball = 0;
  let interestSnowball = 0;

  while ((balanceSnowball1 > 0 || balanceSnowball2 > 0) && monthsSnowball < 600) {
      let r1 = store.debt1Rate / 100 / 12;
      let r2 = store.debt2Rate / 100 / 12;

      let int1 = balanceSnowball1 * r1;
      let int2 = balanceSnowball2 * r2;
      interestSnowball += (int1 + int2);

      let extraLeft = extraPmt;

      let pmt1 = Math.min(balanceSnowball1 + int1, paymentA1);
      balanceSnowball1 -= (pmt1 - int1);

      let pmt2 = Math.min(balanceSnowball2 + int2, paymentA2);
      balanceSnowball2 -= (pmt2 - int2);

      // Target lowest remaining balance
      let target1 = balanceSnowball1;
      let target2 = balanceSnowball2;

      if ((target1 <= target2 && target1 > 0) || target2 === 0) {
          let to1 = Math.min(balanceSnowball1, extraLeft);
          balanceSnowball1 -= to1;
          extraLeft -= to1;
          let to2 = Math.min(balanceSnowball2, extraLeft);
          balanceSnowball2 -= to2;
      } else {
          let to2 = Math.min(balanceSnowball2, extraLeft);
          balanceSnowball2 -= to2;
          extraLeft -= to2;
          let to1 = Math.min(balanceSnowball1, extraLeft);
          balanceSnowball1 -= to1;
      }
      monthsSnowball++;
  }

  const avalancheTotalInterest = interestAvalanche;
  const avalancheMonths = monthsAvalanche;
  const snowballTotalInterest = interestSnowball;
  const snowballMonths = monthsSnowball;


  const metrics = {
    avalancheTotalInterest, avalancheMonths, snowballTotalInterest, snowballMonths
  };

  const exportData = [{
    ...store,
    ...metrics
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/personal-wealth/debt-avalanche-vs-snowball-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/personal-wealth/debt-avalanche-vs-snowball-calculator`

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
            <label className="text-sm font-semibold text-foreground">Debt 1 Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.debt1Balance === 0 ? '' : store.debt1Balance}
                onChange={(e) => store.setDebt1Balance(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Debt 1 Interest Rate (%)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.debt1Rate === 0 ? '' : store.debt1Rate}
                onChange={(e) => store.setDebt1Rate(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Debt 1 Minimum Payment</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.debt1MinPayment === 0 ? '' : store.debt1MinPayment}
                onChange={(e) => store.setDebt1MinPayment(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Debt 2 Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.debt2Balance === 0 ? '' : store.debt2Balance}
                onChange={(e) => store.setDebt2Balance(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Debt 2 Interest Rate (%)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.debt2Rate === 0 ? '' : store.debt2Rate}
                onChange={(e) => store.setDebt2Rate(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Debt 2 Minimum Payment</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.debt2MinPayment === 0 ? '' : store.debt2MinPayment}
                onChange={(e) => store.setDebt2MinPayment(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Extra Monthly Payment Towards Debt</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.extraMonthlyPayment === 0 ? '' : store.extraMonthlyPayment}
                onChange={(e) => store.setExtraMonthlyPayment(Number(e.target.value))}
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
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Avalanche Total Interest</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.avalancheTotalInterest).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Avalanche Months to Payoff</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.avalancheMonths).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Snowball Total Interest</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.snowballTotalInterest).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Snowball Months to Payoff</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.snowballMonths).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="debt-avalanche-vs-snowball-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="debt-avalanche-vs-snowball-calculator"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
