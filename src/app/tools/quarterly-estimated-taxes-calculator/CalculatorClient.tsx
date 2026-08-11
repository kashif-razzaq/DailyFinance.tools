'use client'

import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useEstimatedTaxesStore } from '@/store/estimated-taxes.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Target, Save, Lock, CheckCircle2, Loader2, Share2, Download, Percent, Briefcase, Info, ThumbsUp, ThumbsDown, X } from "lucide-react"
import { ExportEngine } from "@/components/shared/ExportEngine"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { getFeedbackAction, voteFeedbackAction } from '@/actions/feedback.actions'
import { ShareCalculatorModal } from "@/components/shared/ShareCalculatorModal"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

// Simple PDF template
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
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

const TaxReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Quarterly Estimated Taxes Report</Text>
      <Text style={pdfStyles.subtitle}>IRS 1099 Freelancer Tax Estimation</Text>
      <View style={{ marginTop: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Net Freelance Income:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.netIncome.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Self-Employment Tax:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.totalSETax).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Federal Income Tax:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.federalIncomeTax).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>State Income Tax:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.stateIncomeTax).toLocaleString()}</Text></View>
      </View>
      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Total Quarterly Payment Due:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{Math.round(data.quarterlyPayment).toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Total Annual Tax Liability:</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.totalAnnualTax).toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Effective Tax Rate:</Text>
        <Text style={pdfStyles.value}>{data.effectiveTaxRate.toFixed(1)}%</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useEstimatedTaxesStore()
  const metrics = store.getDerivedMetrics()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'
  
    const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [helpfulCount, setHelpfulCount] = useState(0)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)
  const [showMobileExport, setShowMobileExport] = useState(false)

  useEffect(() => {
    getFeedbackAction('quarterly-estimated-taxes-calculator').then(res => {
      setHelpfulCount(res.upvotes - res.downvotes)
    }).catch(console.error)

    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.netIncome !== undefined) store.setNetIncome(state.netIncome)
          if (state.stateTaxRate !== undefined) store.setStateTaxRate(state.stateTaxRate)
          if (state.claimsQBI !== undefined) store.setClaimsQBI(state.claimsQBI)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  const handleVote = async (type: 'up' | 'down') => {
    if (userVote === type) return 
    
    if (userVote) {
      setHelpfulCount(prev => type === 'up' ? prev + 2 : prev - 2)
    } else {
      setHelpfulCount(prev => type === 'up' ? prev + 1 : prev - 1)
    }
    setUserVote(type)

    try {
      await voteFeedbackAction('quarterly-estimated-taxes-calculator', type)
    } catch (error) {
      console.error("Failed to record vote", error)
    }
  }

  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    
    setIsSaving(true)
    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'quarterly-estimated-taxes-calculator',
        category: 'Freelance & Business',
        saved_name: `Q-Taxes on ${currencySymbol}${store.netIncome.toLocaleString()}`,
        input_state: {
          netIncome: store.netIncome,
          stateTaxRate: store.stateTaxRate,
          claimsQBI: store.claimsQBI
        },
        core_metric: Math.round(metrics.quarterlyPayment)
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

  const exportData = [{
    "Net Income": `${currency} ${store.netIncome}`,
    "Self-Employment Tax": `${currency} ${Math.round(metrics.totalSETax)}`,
    "Federal Income Tax": `${currency} ${Math.round(metrics.federalIncomeTax)}`,
    "State Income Tax": `${currency} ${Math.round(metrics.stateIncomeTax)}`,
    "Total Annual Tax": `${currency} ${Math.round(metrics.totalAnnualTax)}`,
    "Quarterly Payment": `${currency} ${Math.round(metrics.quarterlyPayment)}`,
    "Effective Tax Rate %": metrics.effectiveTaxRate.toFixed(1)
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/tools/quarterly-estimated-taxes-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/tools/quarterly-estimated-taxes-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative pb-24 md:pb-0">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col space-y-10">
        
        {/* Core Financials */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            Income & Business
          </h2>
          <div className="space-y-4">
            <label className="text-sm font-semibold text-foreground">Estimated Net Freelance Income</label>
            <p className="text-xs text-muted-foreground mb-2">Your gross revenue minus all deductible business expenses.</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-xl">{currencySymbol}</span>
              <Input 
                type="number" 
                value={store.netIncome === 0 ? '' : store.netIncome}
                onChange={(e) => store.setNetIncome(e.target.value === '' ? 0 : Number(e.target.value))}
                className="pl-9 h-14 text-2xl font-bold bg-muted/50 focus:bg-background transition-colors border-border/60 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Taxes & Deductions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Percent className="h-5 w-5 text-muted-foreground" />
            Taxes & Deductions
          </h2>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold">State Income Tax Rate</label>
                  <p className="text-xs text-muted-foreground mt-1">Average state income tax rate for your location.</p>
                </div>
                <span className="text-xl font-bold text-foreground">{store.stateTaxRate.toFixed(1)}%</span>
              </div>
              <Slider 
                value={[store.stateTaxRate]} 
                max={15} step={0.1}
                onValueChange={(val: any) => store.setStateTaxRate(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>

            <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl border border-border/50">
              <div className="pr-4">
                <label className="text-sm font-bold flex items-center gap-2">
                  Claim QBI Deduction
                  <Info className="h-4 w-4 text-muted-foreground" />
                </label>
                <p className="text-xs text-muted-foreground mt-1">Most freelancers qualify to deduct 20% of their Qualified Business Income.</p>
              </div>
              <Switch 
                checked={store.claimsQBI} 
                onCheckedChange={store.setClaimsQBI} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Results & Conversion Sticky Panel */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-emerald-50 text-emerald-600 border border-emerald-200 p-4 rounded-xl shadow-lg flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        {/* Tax Breakdown Receipt */}
        <div className="bg-card border shadow-sm rounded-2xl p-0 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
          
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-foreground">
              <span className="bg-amber-100 text-amber-700 p-2 rounded-lg">
                <Target className="h-5 w-5" />
              </span>
              Estimated Tax Ledger
            </h3>

            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60">
                <span className="text-muted-foreground">Net Freelance Income</span>
                <span className="font-semibold text-foreground">{currencySymbol}{store.netIncome.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60 text-red-600/80">
                <span>Self-Employment Tax (15.3%)</span>
                <span>-${Math.round(metrics.totalSETax).toLocaleString()}</span>
              </div>

              {store.claimsQBI && (
                <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60 text-emerald-600/80">
                  <span>QBI Deduction (20%)</span>
                  <span>+${Math.round(metrics.qbiDeduction).toLocaleString()} (deducted from taxable base)</span>
                </div>
              )}

              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60 text-red-600/80">
                <span>Federal Income Tax</span>
                <span>-${Math.round(metrics.federalIncomeTax).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-dashed border-border/60 text-red-600/80">
                <span>State Income Tax ({store.stateTaxRate}%)</span>
                <span>-${Math.round(metrics.stateIncomeTax).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-4 font-sans border-b-2 border-border/80">
                <span className="font-bold text-foreground">Total Annual Tax Liability</span>
                <span className="font-bold text-lg">{currencySymbol}{Math.round(metrics.totalAnnualTax).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 bg-amber-50 rounded-xl p-6 border border-amber-100">
              <h4 className="text-xs uppercase tracking-wider font-bold text-amber-800/60 mb-2">Quarterly Payment Due</h4>
              <div className="flex items-baseline gap-2 text-amber-900">
                <span className="text-5xl font-black tracking-tighter">{currencySymbol}{Math.round(metrics.quarterlyPayment).toLocaleString()}</span>
                <span className="text-sm font-semibold opacity-70">/ quarter</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center text-sm font-medium">
              <span className="text-muted-foreground">Effective Tax Rate:</span>
              <span className="px-3 py-1 bg-muted rounded-full text-foreground">{metrics.effectiveTaxRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Desktop Save Actions */}
        <div className="hidden md:block bg-card border rounded-2xl p-6">
          <div className="space-y-3">
            <Button onClick={handleSave} disabled={isSaving} className="w-full justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white border-none transition-all active:scale-95" size="lg">
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save to Dashboard
              {!isPro && <Lock className="h-4 w-4 text-white/70 ml-auto" />}
            </Button>
            
            <div className="flex gap-3">
              <div className="flex-1 pointer-events-auto">
                <ExportEngine 
                  data={exportData} 
                  filename="QuarterlyTaxes" 
                  pdfDocument={<TaxReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />} 
                  isPro={isPro}
                  onRequirePro={() => setShowProModal(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Share & Feedback */}
        <div className="hidden md:flex bg-card border rounded-2xl p-4 items-center justify-between shadow-sm">
          <div className="flex gap-2">
            <div className="flex-1">
            <ShareCalculatorModal url={shareUrl} slug="quarterly-estimated-taxes-calculator" isPro={isPro}>
              <div className="w-full flex gap-2 justify-center">
                <Share2 className="h-4 w-4 mr-2" /> Share & Embed
              </div>
            </ShareCalculatorModal>
            </div>
          </div>
          <div className="flex items-center gap-2 border-l border-border/50 pl-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
              {helpfulCount} Helpful?
            </span>
            <Button variant="ghost" size="icon" onClick={() => handleVote('up')} className={`h-8 w-8 rounded-full ${userVote === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50'}`}>
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleVote('down')} className={`h-8 w-8 rounded-full ${userVote === 'down' ? 'text-red-600 bg-red-50' : 'text-muted-foreground hover:text-red-600 hover:bg-red-50'}`}>
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY ACTION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-background/90 backdrop-blur-xl border-t p-3 z-50 flex gap-2 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-safe">
        <div className="flex-1 flex">
          <Button onClick={handleSave} disabled={isSaving} className="w-full flex gap-1.5 h-10 rounded-xl font-semibold text-[13px] bg-amber-600 hover:bg-amber-700 text-white border-none active:scale-95 transition-transform px-2">
            {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" /> : <Save className="h-3.5 w-3.5 shrink-0" />} 
            <span className="truncate">Save</span>
            {!isPro && <Lock className="h-3 w-3 opacity-70 shrink-0" />}
          </Button>
        </div>
        <div className="flex-1 flex [&>button]:w-full [&>button]:flex-1">
          <ShareCalculatorModal url={shareUrl} slug="quarterly-estimated-taxes-calculator" isPro={isPro}>
            <div className="w-full flex gap-1.5 h-10 rounded-xl font-semibold text-[13px] border border-input bg-secondary text-secondary-foreground items-center justify-center cursor-pointer hover:bg-secondary/80 transition-colors px-2">
              <Share2 className="h-3.5 w-3.5 shrink-0" /> 
              <span className="truncate">Share</span>
            </div>
          </ShareCalculatorModal>
        </div>
        <div className="flex-1 flex relative">
          <Button variant="secondary" onClick={() => setShowMobileExport(!showMobileExport)} className="w-full flex gap-1.5 h-10 rounded-xl font-semibold text-[13px] border px-2">
            <Download className="h-3.5 w-3.5 shrink-0" /> 
            <span className="truncate">Export</span>
            {!isPro && <Lock className="h-3 w-3 opacity-70 shrink-0" />}
          </Button>
          {showMobileExport && (
            <div className="absolute bottom-[calc(100%+12px)] right-0 w-[280px] bg-background border shadow-2xl rounded-2xl p-4 animate-in slide-in-from-bottom-2 fade-in duration-200">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-sm">Export Data</span>
                <button onClick={() => setShowMobileExport(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ExportEngine 
                data={exportData} 
                filename="QuarterlyTaxes" 
                pdfDocument={<TaxReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />} 
                isPro={isPro}
                onRequirePro={() => { setShowMobileExport(false); setShowProModal(true) }}
              />
            </div>
          )}
        </div>
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
