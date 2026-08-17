/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-location-assign-relative-destination */
'use client'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"

import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useHourlyRateStore } from '@/store/hourly-rate.store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Target, Save, Lock, ArrowRight, ShieldCheck, Download, Percent, Clock, CheckCircle2, Loader2, Share2, Code, ThumbsUp, ThumbsDown, Copy, X, Plus, ChevronDown, ChevronUp, Monitor, Wifi, Megaphone, Scale, Home, Computer } from "lucide-react"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
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
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Expenses:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.totalExpenses.toLocaleString()}</Text></View>
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
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)

  useEffect(() => {
    // Load saved scenario if savedId is in URL
    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.targetAnnualIncome !== undefined) store.setTargetAnnualIncome(state.targetAnnualIncome as any)
          if (state.annualBusinessExpenses !== undefined) store.setAnnualBusinessExpenses(state.annualBusinessExpenses as any)
          if (state.isAdvancedExpenses !== undefined) store.setIsAdvancedExpenses(state.isAdvancedExpenses as any)
          if (state.softwareExpenses !== undefined) store.setSoftwareExpenses(state.softwareExpenses as any)
          if (state.hardwareExpenses !== undefined) store.setHardwareExpenses(state.hardwareExpenses as any)
          if (state.internetExpenses !== undefined) store.setInternetExpenses(state.internetExpenses as any)
          if (state.marketingExpenses !== undefined) store.setMarketingExpenses(state.marketingExpenses as any)
          if (state.legalExpenses !== undefined) store.setLegalExpenses(state.legalExpenses as any)
          if (state.officeExpenses !== undefined) store.setOfficeExpenses(state.officeExpenses as any)
          if (state.taxRate !== undefined) store.setTaxRate(state.taxRate as any)
          if (state.weeksOff !== undefined) store.setWeeksOff(state.weeksOff as any)
          if (state.weeklyHours !== undefined) store.setWeeklyHours(state.weeklyHours as any)
          if (state.billableUtilization !== undefined) store.setBillableUtilization(state.billableUtilization as any)
          if (state.profitBuffer !== undefined) store.setProfitBuffer(state.profitBuffer as any)
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
        calculator_slug: 'freelance/freelance-hourly-rate-calculator',
        category: 'Freelance & Business',
        saved_name: `Rate Plan: ${currencySymbol}${Math.round(metrics.hourlyRateMAR)}/hr`,
        input_state: {
          targetAnnualIncome: store.targetAnnualIncome,
          annualBusinessExpenses: store.annualBusinessExpenses,
          isAdvancedExpenses: store.isAdvancedExpenses,
          softwareExpenses: store.softwareExpenses,
          hardwareExpenses: store.hardwareExpenses,
          internetExpenses: store.internetExpenses,
          marketingExpenses: store.marketingExpenses,
          legalExpenses: store.legalExpenses,
          officeExpenses: store.officeExpenses,
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

  const exportData = [{
    "Target Net Income": `${currency} ${store.targetAnnualIncome}`,
    "Total Expenses": `${currency} ${metrics.totalExpenses}`,
    "Estimated Taxes": `${currency} ${Math.round(metrics.taxAmount)}`,
    "Profit Buffer": `${currency} ${Math.round(metrics.profitAmount)}`,
    "Total Gross Revenue Needed": `${currency} ${Math.round(metrics.grossWithProfit)}`,
    "Total Billable Hours": Math.round(metrics.billableHours),
    "Calculated Hourly Rate (MAR)": `${currency} ${Math.round(metrics.hourlyRateMAR)}`,
    "Calculated Day Rate": `${currency} ${Math.round(metrics.dailyRate)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/freelance/freelance-hourly-rate-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/freelance/freelance-hourly-rate-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">
        
        {/* Income & Expenses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Target Income & Expenses
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">Advanced Options</span>
              <Switch 
                checked={store.isAdvancedExpenses} 
                onCheckedChange={store.setIsAdvancedExpenses} 
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Target Annual Net Income (Take-Home)</label>
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

            {/* Expenses Block */}
            {!store.isAdvancedExpenses ? (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-semibold text-foreground">Total Annual Business Expenses</label>
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
            ) : (
              <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
                <label className="text-sm font-semibold text-foreground block border-b pb-2">Detailed Annual Expenses</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><Monitor className="h-3.5 w-3.5"/> Software / Subscriptions</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">{currencySymbol}</span>
                      <Input type="number" value={store.softwareExpenses || ''} onChange={(e) => store.setSoftwareExpenses(Number(e.target.value))} className="pl-7" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><Computer className="h-3.5 w-3.5"/> Hardware / Equipment</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">{currencySymbol}</span>
                      <Input type="number" value={store.hardwareExpenses || ''} onChange={(e) => store.setHardwareExpenses(Number(e.target.value))} className="pl-7" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><Wifi className="h-3.5 w-3.5"/> Internet & Phone</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">{currencySymbol}</span>
                      <Input type="number" value={store.internetExpenses || ''} onChange={(e) => store.setInternetExpenses(Number(e.target.value))} className="pl-7" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><Megaphone className="h-3.5 w-3.5"/> Marketing / Ads</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">{currencySymbol}</span>
                      <Input type="number" value={store.marketingExpenses || ''} onChange={(e) => store.setMarketingExpenses(Number(e.target.value))} className="pl-7" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><Scale className="h-3.5 w-3.5"/> Legal & Accounting</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">{currencySymbol}</span>
                      <Input type="number" value={store.legalExpenses || ''} onChange={(e) => store.setLegalExpenses(Number(e.target.value))} className="pl-7" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><Home className="h-3.5 w-3.5"/> Office / Co-working</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">{currencySymbol}</span>
                      <Input type="number" value={store.officeExpenses || ''} onChange={(e) => store.setOfficeExpenses(Number(e.target.value))} className="pl-7" />
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 text-primary text-sm font-semibold p-3 rounded-lg flex justify-between items-center mt-2">
                  <span>Total Calculated Expenses:</span>
                  <span className="text-lg">{currencySymbol}{metrics.totalExpenses.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Time Utilization */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Clock className="h-5 w-5 text-primary" />
            Time & Utilization
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-semibold">Weeks Off (Vacation/Sick)</label>
                <span className="text-sm font-bold text-primary">{store.weeksOff} wks</span>
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
                <span className="text-sm font-bold text-primary">{store.weeklyHours} hrs</span>
              </div>
              <Slider 
                value={[store.weeklyHours]} 
                min={10} max={80} step={1}
                onValueChange={(val: any) => store.setWeeklyHours(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 bg-muted/30 p-4 rounded-xl border border-border/50">
            <div className="flex justify-between items-start">
              <div>
                <label className="text-sm font-semibold block">Billable Utilization Rate</label>
                <span className="text-xs text-muted-foreground block max-w-[250px] mt-1">Percentage of your time spent on actual client work vs admin/marketing.</span>
              </div>
              <span className="text-3xl font-black text-foreground bg-background px-3 py-1 rounded-lg border">{store.billableUtilization}%</span>
            </div>
            <Slider 
              value={[store.billableUtilization]} 
              min={10} max={100} step={1}
              onValueChange={(val: any) => store.setBillableUtilization(Array.isArray(val) ? val[0] : val)}
              className="py-3"
            />
            <div className="flex justify-between text-xs font-semibold text-muted-foreground pt-1">
              <span>{Math.round(metrics.billableHours)} Billable Hrs/yr</span>
              <span>{Math.round(metrics.totalHoursWorked - metrics.billableHours)} Unpaid Hrs/yr</span>
            </div>
          </div>
        </div>
        
        {/* Taxes & Margins */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Percent className="h-5 w-5 text-primary" />
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
                  <p className="text-xs text-muted-foreground mt-1">For reinvestment and safety.</p>
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

      </div>

      {/* RIGHT COLUMN: Results & Conversion Sticky Panel */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20 h-max">
        
        {/* Success Toast Popup */}
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-emerald-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        {/* The Result Card */}
        <div className="bg-white dark:bg-zinc-950 border rounded-3xl p-1 shadow-xl relative overflow-hidden">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-[22px] p-6 lg:p-8 flex flex-col gap-6">
            
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Your Freelance Rates
              </h3>
            </div>
            
            <div className="space-y-2 bg-white dark:bg-zinc-900 border shadow-sm rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Target Hourly Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl lg:text-6xl font-black tracking-tighter text-foreground">{currencySymbol}{Math.round(metrics.hourlyRateMAR)}</span>
                <span className="text-xl font-medium text-muted-foreground">/ hr</span>
              </div>
              <p className="text-sm text-emerald-600 font-semibold mt-2">Premium Rate (20% Markup): {currencySymbol}{Math.round(metrics.hourlyRateMAR * 1.2)}/hr</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-4 flex flex-col items-start justify-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Suggested Day Rate</p>
                <p className="text-xl lg:text-2xl font-black text-foreground">{currencySymbol}{Math.round(metrics.dailyRate).toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-4 flex flex-col items-start justify-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Monthly Target</p>
                <p className="text-xl lg:text-2xl font-black text-foreground">{currencySymbol}{Math.round(metrics.monthlyRetainer).toLocaleString()}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Impact Factors / Breakdown Chart */}
        <div className="bg-card border shadow-sm rounded-3xl p-6 lg:p-8">
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            Your Impact Factors
          </h4>
          
          <div className="space-y-5">
            <ImpactFactorItem 
              label="Net Take-Home" 
              value={store.targetAnnualIncome} 
              total={metrics.grossWithProfit} 
              colorClass="bg-emerald-500" 
              currencySymbol={currencySymbol} 
            />
            <ImpactFactorItem 
              label="Income & SE Taxes" 
              value={metrics.taxAmount} 
              total={metrics.grossWithProfit} 
              colorClass="bg-red-500" 
              currencySymbol={currencySymbol} 
            />
            <ImpactFactorItem 
              label="Business Expenses" 
              value={metrics.totalExpenses} 
              total={metrics.grossWithProfit} 
              colorClass="bg-primary" 
              currencySymbol={currencySymbol} 
            />
            <ImpactFactorItem 
              label="Profit Buffer" 
              value={metrics.profitAmount} 
              total={metrics.grossWithProfit} 
              colorClass="bg-indigo-500" 
              currencySymbol={currencySymbol} 
            />
          </div>
          
          <div className="mt-8 pt-6 border-t flex justify-between items-center text-sm font-semibold">
            <span className="text-muted-foreground">Required Gross Revenue</span>
            <span className="text-xl">{currencySymbol}{Math.round(metrics.grossWithProfit).toLocaleString()}</span>
          </div>
        </div>

        <CalculatorActions
          slug="freelance-hourly-rate-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="FreelanceHourlyRate"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<RateReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}

function PieChartIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  )
}

function ImpactFactorItem({ label, value, total, colorClass, currencySymbol }: { label: string, value: number, total: number, colorClass: string, currencySymbol: string }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-end text-sm">
        <span className="font-semibold text-foreground flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
          {label}
        </span>
        <div className="flex items-center gap-3">
          <span className="font-bold">{currencySymbol}{Math.round(value).toLocaleString()}</span>
          <span className="text-muted-foreground text-xs font-semibold w-8 text-right">{Math.round(percentage)}%</span>
        </div>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}
