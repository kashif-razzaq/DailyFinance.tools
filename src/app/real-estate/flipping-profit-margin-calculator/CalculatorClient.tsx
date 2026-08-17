/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { CalculatorActions } from '@/components/calculator/CalculatorActions'
import { ProUpgradeModal } from '@/components/shared/ProUpgradeModal'
import { useFlippingProfitMarginStore } from '@/store/flipping_profit_margin.store'
import { Target, DollarSign, Activity } from 'lucide-react'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const dummyIsPro = isPro;
  const store = useFlippingProfitMarginStore()
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

  const maxAllowableOffer = (store.arv * 0.70) - store.repairCosts;
  const totalProjectCost = store.purchasePrice + store.repairCosts + store.holdingCosts + store.sellingCosts;
  const netProfit = store.arv - totalProjectCost;
  const roi = totalProjectCost > 0 ? (netProfit / totalProjectCost) * 100 : 0;


  const metrics = {
    maxAllowableOffer, totalProjectCost, netProfit, roi
  };

  const exportData = [{
    ...store,
    ...metrics
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/real-estate/flipping-profit-margin-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/real-estate/flipping-profit-margin-calculator`

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
            <label className="text-sm font-semibold text-foreground">After Repair Value (ARV)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.arv === 0 ? '' : store.arv}
                onChange={(e) => store.setArv(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Estimated Repair Costs</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.repairCosts === 0 ? '' : store.repairCosts}
                onChange={(e) => store.setRepairCosts(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Purchase Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.purchasePrice === 0 ? '' : store.purchasePrice}
                onChange={(e) => store.setPurchasePrice(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Holding Costs (Total)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.holdingCosts === 0 ? '' : store.holdingCosts}
                onChange={(e) => store.setHoldingCosts(Number(e.target.value))}
                className="pl-9 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Selling Costs (Commissions, closing)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><DollarSign className="w-4 h-4"/></span>
              <Input
                type="number"
                value={store.sellingCosts === 0 ? '' : store.sellingCosts}
                onChange={(e) => store.setSellingCosts(Number(e.target.value))}
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
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Max Allowable Offer (70% Rule)</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.maxAllowableOffer).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Total Project Cost</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.totalProjectCost).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Estimated Net Profit</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.netProfit).toLocaleString()}
              </p>
            </div>
            <div className="border bg-card rounded-xl p-5">
              <h4 className="font-bold text-foreground mb-2 text-sm text-muted-foreground">Return on Investment (%)</h4>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(metrics.roi).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="flipping-profit-margin-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="flipping-profit-margin-calculator"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
