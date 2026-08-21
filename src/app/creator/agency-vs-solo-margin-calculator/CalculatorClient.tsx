/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useAgencyStore } from '@/store/agency-vs-solo.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Briefcase, User, Clock, DollarSign, Target, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, marginBottom: 20, color: '#4b5563' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottom: '1 solid #e5e7eb' },
  label: { fontSize: 12, color: '#374151' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 20, backgroundColor: '#f3f4f6', paddingHorizontal: 10, borderRadius: 4 },
  highlightLabel: { fontSize: 14, fontWeight: 'bold' },
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#7c3aed' },
});

const AgencyReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Creator Arbitrage & Hiring Analysis</Text>
      <Text style={pdfStyles.subtitle}>Agency vs Solo Cost Comparison</Text>

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Your Hourly Rate:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.currentHourlyRate}/hr</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Contractor Hourly Rate:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.contractorHourlyRate}/hr</Text></View>
      </View>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Cost Per Video</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Cost to Do It Yourself:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.soloCostPerVideo}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Cost to Outsource (inc. management):</Text><Text style={pdfStyles.value}>{currencySymbol}{data.delegatedCostPerVideo}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Time Saved Per Video:</Text>
        <Text style={pdfStyles.highlightValue}>{data.timeSavedPerVideo} Hours</Text>
      </View>

      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Arbitrage Value (Monthly):</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{data.monthlyArbitrageProfit}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useAgencyStore()
  const metrics = store.getDerivedMetrics()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'

  const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.currentHourlyRate !== undefined) store.setCurrentHourlyRate(state.currentHourlyRate as number)
          if (state.hoursPerVideo !== undefined) store.setHoursPerVideo(state.hoursPerVideo as number)
          if (state.videosPerMonth !== undefined) store.setVideosPerMonth(state.videosPerMonth as number)
          if (state.contractorHourlyRate !== undefined) store.setContractorHourlyRate(state.contractorHourlyRate as number)
          if (state.contractorHoursPerVideo !== undefined) store.setContractorHoursPerVideo(state.contractorHoursPerVideo as number)
          if (state.managementHoursPerVideo !== undefined) store.setManagementHoursPerVideo(state.managementHoursPerVideo as number)
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
        calculator_slug: 'agency-vs-solo-margin-calculator',
        category: 'Creator Economy',
        saved_name: `Hiring ROI: ${metrics.monthlyTimeSaved}hrs Saved`,
        input_state: {
          currentHourlyRate: store.currentHourlyRate,
          hoursPerVideo: store.hoursPerVideo,
          videosPerMonth: store.videosPerMonth,
          contractorHourlyRate: store.contractorHourlyRate,
          contractorHoursPerVideo: store.contractorHoursPerVideo,
          managementHoursPerVideo: store.managementHoursPerVideo
        },
        core_metric: metrics.monthlyTimeSaved
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

  const exportData = [{
    "Your Rate": `${currencySymbol}${store.currentHourlyRate}/hr`,
    "Contractor Rate": `${currencySymbol}${store.contractorHourlyRate}/hr`,
    "Solo Cost": `${currencySymbol}${metrics.soloCostPerVideo}`,
    "Outsource Cost": `${currencySymbol}${metrics.delegatedCostPerVideo}`,
    "Hours Saved/Mo": metrics.monthlyTimeSaved,
    "Arbitrage Profit": `${currencySymbol}${metrics.monthlyArbitrageProfit}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/creator/agency-vs-solo-margin-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/creator/agency-vs-solo-margin-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <User className="h-5 w-5 text-muted-foreground" />
            Your Time (Solo)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Your Effective Hourly Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.currentHourlyRate === 0 ? '' : store.currentHourlyRate}
                  onChange={(e) => store.setCurrentHourlyRate(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-xs text-muted-foreground">What is an hour of your time worth?</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Hours Spent Per Video</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Clock className="h-4 w-4" /></span>
                <Input
                  type="number"
                  value={store.hoursPerVideo === 0 ? '' : store.hoursPerVideo}
                  onChange={(e) => store.setHoursPerVideo(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            Outsourcing (Agency/Freelancer)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Contractor Hourly Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.contractorHourlyRate === 0 ? '' : store.contractorHourlyRate}
                  onChange={(e) => store.setContractorHourlyRate(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Contractor Hours Per Video</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Clock className="h-4 w-4" /></span>
                <Input
                  type="number"
                  value={store.contractorHoursPerVideo === 0 ? '' : store.contractorHoursPerVideo}
                  onChange={(e) => store.setContractorHoursPerVideo(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Your Management Time (Revisions/Briefing)</label>
                <p className="text-xs text-muted-foreground mt-1">How many hours will you spend managing them?</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.managementHoursPerVideo} hrs</span>
            </div>
            <Slider
              value={[store.managementHoursPerVideo]}
              max={10} step={0.5}
              onValueChange={(val: any) => store.setManagementHoursPerVideo(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-border/50">
            <label className="text-sm font-semibold text-foreground">Videos Produced Per Month</label>
            <Input
              type="number"
              value={store.videosPerMonth === 0 ? '' : store.videosPerMonth}
              onChange={(e) => store.setVideosPerMonth(e.target.value === '' ? 0 : Number(e.target.value))}
              className="text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60 sm:w-1/2"
            />
          </div>

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20">

        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-blue-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        <div className="bg-violet-600 dark:bg-violet-700 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
             Hours Saved Per Month
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{metrics.monthlyTimeSaved}</span>
            <span className="text-lg font-medium text-white/80 ml-1">hrs</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Time Saved / Video</p>
              <p className="text-2xl font-bold">{metrics.timeSavedPerVideo} hrs</p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Financial Arbitrage / Mo</p>
              <p className={`text-2xl font-bold ${metrics.monthlyArbitrageProfit < 0 ? 'text-red-300' : 'text-blue-300'}`}>
                {metrics.monthlyArbitrageProfit > 0 ? '+' : ''}{currencySymbol}{Math.round(metrics.monthlyArbitrageProfit).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Cost Analysis (Per Video)</h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">True Cost (Doing it Yourself)</span>
              <span className="font-medium text-slate-500 line-through">{currencySymbol}{metrics.soloCostPerVideo.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border/50 text-violet-600 dark:text-violet-400">
              <span>Cost (Outsourcing + Management)</span>
              <span className="font-bold">{currencySymbol}{metrics.delegatedCostPerVideo.toLocaleString()}</span>
            </div>

            {metrics.financialROI < 0 && (
              <div className="bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 p-3 rounded-lg mt-4 text-xs leading-relaxed flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <p>Warning: It is currently cheaper to do this yourself. Your effective hourly rate is not high enough to justify outsourcing this task at this contractor rate.</p>
              </div>
            )}

            {metrics.financialROI > 0 && (
              <div className="bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 p-3 rounded-lg mt-4 text-xs leading-relaxed flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                <p>Positive Arbitrage: By outsourcing, you are effectively "buying" your time back at a discount. Use those {metrics.monthlyTimeSaved} saved hours to generate more than {currencySymbol}{Math.round(metrics.monthlyArbitrageProfit)} elsewhere.</p>
              </div>
            )}
          </div>
        </div>

        <CalculatorActions
          slug="agency-vs-solo-margin-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Hiring_ROI_Analysis"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<AgencyReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
