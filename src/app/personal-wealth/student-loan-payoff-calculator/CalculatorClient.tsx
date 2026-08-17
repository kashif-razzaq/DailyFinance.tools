/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { CalculatorActions } from '@/components/calculator/CalculatorActions'
import { ProUpgradeModal } from '@/components/shared/ProUpgradeModal'
import { useStudentLoanPayoffStore } from '@/store/student_loan_payoff.store'
import { Target, DollarSign, Activity } from 'lucide-react'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const dummyIsPro = isPro;
  const store = useStudentLoanPayoffStore()
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

  const P = store.loanBalance;
  const r = store.interestRate / 100 / 12;
  const n = store.loanTermYears * 12;

  let standardPayment = 0;
  if (r > 0) {
      standardPayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else {
      standardPayment = P / n;
  }
  const newPayment = standardPayment + store.extraMonthlyPayment;

  let balance = P;
  let monthsStandard = 0;
  let interestStandard = 0;
  while (balance > 0 && monthsStandard < 1000) {
      const interest = balance * r;
      interestStandard += interest;
      balance -= (standardPayment - interest);
      monthsStandard++;
  }

  balance = P;
  let monthsNew = 0;
  let interestNew = 0;
  while (balance > 0 && monthsNew < 1000) {
      const interest = balance * r;
      interestNew += interest;
      balance -= (newPayment - interest);
      monthsNew++;
  }

  const monthsSaved = Math.max(0, monthsStandard - monthsNew);
  const interestSaved = Math.max(0, interestStandard - interestNew);


  const metrics = {
    standardPayment, newPayment, monthsSaved, interestSaved
  };

  const exportData = [{
    ...store,
    ...metrics
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/personal-wealth/student-loan-payoff-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/personal-wealth/student-loan-payoff-calculator`

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
            <label className="text-sm font-semibold text-foreground">Loan Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.loanBalance === 0 ? '' : store.loanBalance}
                onChange={(e) => store.setLoanBalance(Number(e.target.value))}
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
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Loan Term (Years)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.loanTermYears === 0 ? '' : store.loanTermYears}
                onChange={(e) => store.setLoanTermYears(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Extra Monthly Payment</label>
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
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Standard Monthly Payment</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.standardPayment).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">New Monthly Payment (with extra)</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.newPayment).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Months Saved</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.monthsSaved).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Interest Saved</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.interestSaved).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="student-loan-payoff-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="student-loan-payoff-calculator"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
