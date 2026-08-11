'use client'

import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useProjectFlatFeeStore } from '@/store/project-flat-fee.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Save, Lock, Share2, Calculator, Copy, CheckCircle2, FileText, AlertCircle } from "lucide-react"
import { ExportEngine } from "@/components/shared/ExportEngine"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ShareCalculatorModal } from "@/components/shared/ShareCalculatorModal"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useProjectFlatFeeStore()
  const metrics = store.getDerivedMetrics()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'
  
    const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showCopyToast, setShowCopyToast] = useState(false)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.estimatedHours !== undefined) store.setEstimatedHours(state.estimatedHours)
          if (state.targetHourlyRate !== undefined) store.setTargetHourlyRate(state.targetHourlyRate)
          if (state.commBufferPct !== undefined) store.setCommBufferPct(state.commBufferPct)
          if (state.riskLevel !== undefined) store.setRiskLevel(state.riskLevel)
          if (state.clientROI !== undefined) store.setClientROI(state.clientROI)
          if (state.roiSharePct !== undefined) store.setRoiSharePct(state.roiSharePct)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    
    setIsSaving(true)
    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'project-flat-fee-quoter',
        category: 'Freelance & Business',
        saved_name: `Quote: ${currencySymbol}${Math.round(metrics.flatFeeQuote)}`,
        input_state: {
          estimatedHours: store.estimatedHours,
          targetHourlyRate: store.targetHourlyRate,
          commBufferPct: store.commBufferPct,
          riskLevel: store.riskLevel,
          clientROI: store.clientROI,
          roiSharePct: store.roiSharePct
        },
        core_metric: Math.round(metrics.flatFeeQuote)
      })
      if (savedResult?.id) {
        setSavedScenarioId(savedResult.id)
      }
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error) {
      console.error(error)
      alert("Failed to save.")
    } finally {
      setIsSaving(false)
    }
  }

  const copyClause = () => {
    const text = `This proposal includes 2 rounds of standard revisions. Additional out-of-scope requests or major deviations from the project brief will be quoted separately or billed at our standard overage rate of ${currencySymbol}${Math.round(metrics.extraRevisionFee)} per revision block.`
    navigator.clipboard.writeText(text)
    setShowCopyToast(true)
    setTimeout(() => setShowCopyToast(false), 2000)
  }

  const exportData = [{
    "Estimated Base Hours": store.estimatedHours,
    "Target Hourly Rate": `${currency} ${store.targetHourlyRate}`,
    "Risk Level": store.riskLevel,
    "Client ROI Estimate": `${currency} ${store.clientROI}`,
    "Cost Plus Floor": `${currency} ${Math.round(metrics.costPlusFloor)}`,
    "ROI Price Anchor": `${currency} ${Math.round(metrics.roiPriceAnchor)}`,
    "Final Flat Fee Quote": `${currency} ${Math.round(metrics.flatFeeQuote)}`,
    "Effective Hourly Earned": `${currency} ${Math.round(metrics.effectiveHourlyRate)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/tools/project-flat-fee-quoter?savedId=${savedScenarioId}`
    : `${baseUrl}/tools/project-flat-fee-quoter`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative pb-24 md:pb-0">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-6 xl:col-span-5 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-10">
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Calculator className="h-5 w-5 text-muted-foreground" />
            Base Cost Estimation
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Estimated Direct Hours</label>
              <Input 
                type="number" 
                value={store.estimatedHours || ''}
                onChange={(e) => store.setEstimatedHours(Number(e.target.value))}
                className="bg-muted/50"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Base Hourly Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.targetHourlyRate || ''}
                  onChange={(e) => store.setTargetHourlyRate(Number(e.target.value))}
                  className="pl-7 bg-muted/50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Comm & Admin Buffer</label>
                <p className="text-xs text-muted-foreground">Unbillable PM time.</p>
              </div>
              <span className="text-lg font-bold text-foreground">+{store.commBufferPct}%</span>
            </div>
            <Slider 
              value={[store.commBufferPct]} 
              max={50} step={5}
              onValueChange={(val: any) => store.setCommBufferPct(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-border/50">
            <label className="text-sm font-semibold text-foreground block">Scope Risk Multiplier</label>
            <p className="text-xs text-muted-foreground mb-3">Buffer for vague requirements, legacy code, or difficult stakeholders.</p>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={store.riskLevel === 'Low' ? 'default' : 'outline'} 
                className={store.riskLevel === 'Low' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                onClick={() => store.setRiskLevel('Low')}
              >
                Low
              </Button>
              <Button 
                variant={store.riskLevel === 'Medium' ? 'default' : 'outline'} 
                className={store.riskLevel === 'Medium' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                onClick={() => store.setRiskLevel('Medium')}
              >
                Medium
              </Button>
              <Button 
                variant={store.riskLevel === 'High' ? 'default' : 'outline'} 
                className={store.riskLevel === 'High' ? 'bg-red-600 hover:bg-red-700' : ''}
                onClick={() => store.setRiskLevel('High')}
              >
                High
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Value-Based Pricing
          </h2>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Client's Estimated ROI / Value</label>
            <p className="text-xs text-muted-foreground">How much extra revenue or cost savings will this project generate for them annually?</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input 
                type="number" 
                value={store.clientROI === 0 ? '' : store.clientROI}
                onChange={(e) => store.setClientROI(e.target.value === '' ? 0 : Number(e.target.value))}
                className="pl-7 bg-muted/50 text-lg font-bold"
              />
            </div>
          </div>

          {store.clientROI > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold">Your ROI Share Percentage</label>
                  <p className="text-xs text-muted-foreground">Standard is 10% to 15%.</p>
                </div>
                <span className="text-lg font-bold text-foreground">{store.roiSharePct}%</span>
              </div>
              <Slider 
                value={[store.roiSharePct]} 
                max={30} step={1}
                onValueChange={(val: any) => store.setRoiSharePct(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Contract Proposal Summary */}
      <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-emerald-50 text-emerald-600 border border-emerald-200 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Saved to Scenario Vault!</span>
          </div>
        )}

        {/* Contract Summary Sheet */}
        <div className="bg-[#fafafa] border border-gray-200 shadow-lg rounded-xl overflow-hidden font-serif">
          
          <div className="bg-[#1f2937] p-8 text-white">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Project Proposal</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black">{currencySymbol}{Math.round(metrics.flatFeeQuote).toLocaleString()}</span>
              <span className="text-xl text-gray-400">Total Fixed Fee</span>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              
              <div>
                <h4 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Pricing Breakdown & Rationale</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-xs text-gray-500 font-sans uppercase font-bold tracking-wider mb-1">Cost-Plus Floor</p>
                    <p className="text-xl font-bold">{currencySymbol}{Math.round(metrics.costPlusFloor).toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Absolute minimum viable price to cover labor + risk.</p>
                  </div>
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-xs text-gray-500 font-sans uppercase font-bold tracking-wider mb-1">Value Anchor</p>
                    <p className="text-xl font-bold">{currencySymbol}{Math.round(metrics.roiPriceAnchor).toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Based on capturing {store.roiSharePct}% of $ {store.clientROI.toLocaleString()} expected ROI.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Your True Metrics</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg p-4 flex flex-col justify-center items-center">
                    <span className="text-sm font-semibold mb-1">Effective Hourly Rate</span>
                    <span className="text-3xl font-black">{currencySymbol}{Math.round(metrics.effectiveHourlyRate)}/hr</span>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Buffer</span>
                    <p className="text-lg font-bold text-gray-700">{metrics.totalHoursBuffered.toFixed(1)} hrs allocated</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  Scope Protection Clause
                </h4>
                <div className="bg-gray-100 rounded-lg p-4 relative font-sans text-sm text-gray-700 leading-relaxed group">
                  <p>
                    This proposal includes 2 rounds of standard revisions. Additional out-of-scope requests or major deviations from the project brief will be quoted separately or billed at our standard overage rate of <strong>{currencySymbol}{Math.round(metrics.extraRevisionFee)} per revision block</strong>.
                  </p>
                  <Button 
                    onClick={copyClause}
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white"
                  >
                    {showCopyToast ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center font-sans border border-gray-200">
                <div>
                  <p className="text-sm font-bold text-gray-800">50% Deposit Invoice:</p>
                  <p className="text-xs text-gray-500">Required to commence work</p>
                </div>
                <span className="text-2xl font-black">{currencySymbol}{Math.round(metrics.depositAmount).toLocaleString()}</span>
              </div>

            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-card border rounded-2xl p-6 flex flex-col sm:flex-row gap-3 mt-auto shadow-sm">
          <Button onClick={handleSave} disabled={isSaving} className="flex-1 justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white" size="lg">
            <Save className="h-4 w-4" /> Save to Dashboard
            {!isPro && <Lock className="h-4 w-4 text-white/70 ml-auto" />}
          </Button>
          <div className="flex-1 flex gap-3">
            <div className="flex-1">
              <ExportEngine 
                data={exportData} 
                filename="FlatFeeQuote" 
                isPro={isPro}
                onRequirePro={() => setShowProModal(true)}
              />
            </div>
            <div className="flex-1">
            <ShareCalculatorModal url={shareUrl} slug="project-flat-fee-quoter" isPro={isPro}>
              <Button variant="outline" className="w-full flex gap-2 justify-center">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </ShareCalculatorModal>
            </div>
          </div>
        </div>
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
