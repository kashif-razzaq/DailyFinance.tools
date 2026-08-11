/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-location-assign-relative-destination */
'use client'

import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useHourlyRateStore } from '@/store/hourly-rate.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Target, Save, Lock, ArrowRight, ShieldCheck, Download, Percent, Clock, CheckCircle2, Loader2, Share2, Code, ThumbsUp, ThumbsDown, Copy, X } from "lucide-react"
import { ResponsiveContainer, Tooltip, Legend } from 'recharts'
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

const RateReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Freelance Rate Report</Text>
      <Text style={pdfStyles.subtitle}>Minimum Acceptable Rate (MAR) Calculation</Text>
      <View style={{ marginTop: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Target Net Income:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.targetAnnualIncome.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Annual Expenses:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.annualBusinessExpenses.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Est. Taxes:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.taxAmount).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Billable Hours:</Text><Text style={pdfStyles.value}>{Math.round(data.billableHours)} hrs</Text></View>
      </View>
      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Minimum Acceptable Rate (MAR):</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{Math.round(data.hourlyRateMAR)} / hr</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Suggested Day Rate:</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.dailyRate).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useHourlyRateStore()
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
    // Load feedback stats
    getFeedbackAction('hourly-rate-reverse-engineer-calculator').then(res => {
      setHelpfulCount(res.upvotes - res.downvotes)
    }).catch(console.error)

    // Load saved scenario if savedId is in URL
    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.targetAnnualIncome !== undefined) store.setTargetAnnualIncome(state.targetAnnualIncome)
          if (state.annualBusinessExpenses !== undefined) store.setAnnualBusinessExpenses(state.annualBusinessExpenses)
          if (state.taxRate !== undefined) store.setTaxRate(state.taxRate)
          if (state.weeksOff !== undefined) store.setWeeksOff(state.weeksOff)
          if (state.weeklyHours !== undefined) store.setWeeklyHours(state.weeklyHours)
          if (state.billableUtilization !== undefined) store.setBillableUtilization(state.billableUtilization)
          if (state.profitBuffer !== undefined) store.setProfitBuffer(state.profitBuffer)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [])

  const handleVote = async (type: 'up' | 'down') => {
    if (userVote === type) return // already voted this
    
    // Optimistic UI update
    if (userVote) {
      // Swapping vote
      setHelpfulCount(prev => type === 'up' ? prev + 2 : prev - 2)
    } else {
      // First vote
      setHelpfulCount(prev => type === 'up' ? prev + 1 : prev - 1)
    }
    setUserVote(type)

    // Push to DB
    try {
      await voteFeedbackAction('hourly-rate-reverse-engineer-calculator', type)
    } catch (error) {
      console.error("Failed to record vote", error)
    }
  }

  // Handlers for exporting and saving
  const handleSave = async () => {
    if (!isPro) return setShowProModal(true)
    
    setIsSaving(true)
    try {
      const savedResult = await saveCalculatorAction({
        calculator_slug: 'hourly-rate-reverse-engineer-calculator',
        category: 'Freelance & Business',
        saved_name: `Rate Plan: ${currencySymbol}${Math.round(metrics.hourlyRateMAR)}/hr`,
        input_state: {
          targetAnnualIncome: store.targetAnnualIncome,
          annualBusinessExpenses: store.annualBusinessExpenses,
          taxRate: store.taxRate,
          weeksOff: store.weeksOff,
          weeklyHours: store.weeklyHours,
          billableUtilization: store.billableUtilization,
          profitBuffer: store.profitBuffer
        },
        core_metric: Math.round(metrics.hourlyRateMAR)
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

  // Replaced PieChart with Horizontal Stacked Bar data inline

  const exportData = [{
    "Target Net Income": `${currency} ${store.targetAnnualIncome}`,
    "Annual Expenses": `${currency} ${store.annualBusinessExpenses}`,
    "Estimated Taxes": `${currency} ${Math.round(metrics.taxAmount)}`,
    "Profit Buffer": `${currency} ${Math.round(metrics.profitAmount)}`,
    "Total Gross Revenue Needed": `${currency} ${Math.round(metrics.grossWithProfit)}`,
    "Total Billable Hours": Math.round(metrics.billableHours),
    "Calculated Hourly Rate (MAR)": `${currency} ${Math.round(metrics.hourlyRateMAR)}`,
    "Calculated Day Rate": `${currency} ${Math.round(metrics.dailyRate)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/tools/hourly-rate-reverse-engineer-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/tools/hourly-rate-reverse-engineer-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative pb-24 md:pb-0">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full space-y-10">
        
        {/* Core Financials */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Target className="h-5 w-5 text-muted-foreground" />
            Core Financials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Target Net Income (Take-Home)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.targetAnnualIncome === 0 ? '' : store.targetAnnualIncome}
                  onChange={(e) => store.setTargetAnnualIncome(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Annual Business Overhead</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.annualBusinessExpenses === 0 ? '' : store.annualBusinessExpenses}
                  onChange={(e) => store.setAnnualBusinessExpenses(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Taxes & Margins */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Percent className="h-5 w-5 text-muted-foreground" />
            Taxes & Margins
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold">Estimated Tax Rate</label>
                  <p className="text-xs text-muted-foreground mt-1">Self-employment + Income Tax.</p>
                </div>
                <span className="text-lg font-bold text-foreground">{store.taxRate}%</span>
              </div>
              <Slider 
                value={[store.taxRate]} 
                max={60} step={1}
                onValueChange={(val: any) => store.setTaxRate(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold">Profit Buffer</label>
                  <p className="text-xs text-muted-foreground mt-1">Reinvestment and safety net.</p>
                </div>
                <span className="text-lg font-bold text-foreground">{store.profitBuffer}%</span>
              </div>
              <Slider 
                value={[store.profitBuffer]} 
                max={50} step={1}
                onValueChange={(val: any) => store.setProfitBuffer(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>
          </div>
        </div>

        {/* Time Utilization */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Time & Utilization
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-semibold">Weeks Off per Year</label>
                <span className="text-sm font-bold text-foreground">{store.weeksOff} wks</span>
              </div>
              <Slider 
                value={[store.weeksOff]} 
                max={52} step={1}
                onValueChange={(val: any) => store.setWeeksOff(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-semibold">Weekly Working Hours</label>
                <span className="text-sm font-bold text-foreground">{store.weeklyHours} hrs</span>
              </div>
              <Slider 
                value={[store.weeklyHours]} 
                min={10} max={80} step={1}
                onValueChange={(val: any) => store.setWeeklyHours(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold block">Billable Utilization Rate</label>
                <span className="text-xs text-muted-foreground">Percentage of work hours actually billed to clients.</span>
              </div>
              <span className="text-3xl font-black text-foreground">{store.billableUtilization}%</span>
            </div>
            <Slider 
              value={[store.billableUtilization]} 
              min={10} max={100} step={1}
              onValueChange={(val: any) => store.setBillableUtilization(Array.isArray(val) ? val[0] : val)}
              className="py-3"
            />
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results & Conversion Sticky Panel */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20">
        
        {/* Success Toast Popup - Slide in from bottom right */}
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-emerald-50 text-emerald-600 border border-emerald-200 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        {/* The Result Card */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">
            Minimum Acceptable Rate (MAR)
          </h3>
          
          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-6xl font-black tracking-tighter">{currencySymbol}{Math.round(metrics.hourlyRateMAR)}</span>
            <span className="text-xl font-medium text-primary-foreground/80">/ hr</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div>
              <p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Day Rate</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.dailyRate).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Monthly Retainer</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.monthlyRetainer).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Breakdown Chart */}
        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Gross Revenue Breakdown</h4>
          
          <div className="space-y-4">
            <div className="w-full h-4 rounded-full flex overflow-hidden">
              <div style={{width: `${(store.targetAnnualIncome / (metrics.grossWithProfit || 1)) * 100}%`}} className="bg-emerald-600 transition-all duration-300" />
              <div style={{width: `${(metrics.taxAmount / (metrics.grossWithProfit || 1)) * 100}%`}} className="bg-red-500 transition-all duration-300" />
              <div style={{width: `${(store.annualBusinessExpenses / (metrics.grossWithProfit || 1)) * 100}%`}} className="bg-amber-500 transition-all duration-300" />
              <div style={{width: `${(metrics.profitAmount / (metrics.grossWithProfit || 1)) * 100}%`}} className="bg-indigo-500 transition-all duration-300" />
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                  <span className="text-muted-foreground font-medium text-xs">Net Income</span>
                </div>
                <div className="font-bold">{currencySymbol}{Math.round(store.targetAnnualIncome || 0).toLocaleString()}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-muted-foreground font-medium text-xs">Taxes</span>
                </div>
                <div className="font-bold">{currencySymbol}{Math.round(metrics.taxAmount || 0).toLocaleString()}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-muted-foreground font-medium text-xs">Expenses</span>
                </div>
                <div className="font-bold">{currencySymbol}{Math.round(store.annualBusinessExpenses || 0).toLocaleString()}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span className="text-muted-foreground font-medium text-xs">Profit Buffer</span>
                </div>
                <div className="font-bold">{currencySymbol}{Math.round(metrics.profitAmount || 0).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Save Actions (Hidden on mobile via app-like sticky bar) */}
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
                  filename="HourlyRate" 
                  pdfDocument={<RateReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />} 
                  isPro={isPro}
                  onRequirePro={() => setShowProModal(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Share, Embed, and Feedback Widgets */}
        <div className="hidden md:flex bg-card border rounded-2xl p-4 items-center justify-between shadow-sm">
          <div className="flex gap-2">
            <div className="flex-1">
            <ShareCalculatorModal url={shareUrl} slug="hourly-rate-reverse-engineer-calculator" isPro={isPro}>
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
            <Button variant="ghost" size="icon" onClick={() => handleVote('up')} className={`h-8 w-8 rounded-full transition-colors ${userVote === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50'}`}>
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleVote('down')} className={`h-8 w-8 rounded-full transition-colors ${userVote === 'down' ? 'text-red-600 bg-red-50' : 'text-muted-foreground hover:text-red-600 hover:bg-red-50'}`}>
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
          <ShareCalculatorModal url={shareUrl} slug="hourly-rate-reverse-engineer-calculator" isPro={isPro}>
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
          
          {/* Mobile Export Popup */}
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
                filename="HourlyRate" 
                pdfDocument={<RateReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />} 
                isPro={isPro}
                onRequirePro={() => {
                  setShowMobileExport(false)
                  setShowProModal(true)
                }}
              />
            </div>
          )}
        </div>
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
