/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useTikTokFundStore } from '@/store/tiktok-creator-fund.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Smartphone, Eye, DollarSign, Clock, CheckCircle2, AlertTriangle, TrendingUp, Sparkles } from "lucide-react"
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
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#059669' },
  warningText: { fontSize: 12, color: '#dc2626', marginTop: 10, fontStyle: 'italic' }
});

const TikTokReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>TikTok Creator Rewards Estimate</Text>
      <Text style={pdfStyles.subtitle}>Projected Ad Revenue</Text>

      {!data.isEligible && (
        <Text style={pdfStyles.warningText}>{data.eligibilityMessage}</Text>
      )}

      <View style={{ marginTop: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Monthly Views:</Text><Text style={pdfStyles.value}>{data.monthlyViews.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Qualified View Rate:</Text><Text style={pdfStyles.value}>{data.qualifiedViewPercentage}%</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Qualified Views:</Text><Text style={pdfStyles.value}>{Math.round(data.qualifiedViews).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Estimated RPM:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.rpm.toFixed(2)}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Estimated Monthly Earnings:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{Math.round(data.estimatedMonthlyEarnings).toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Estimated Annual Earnings:</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.estimatedAnnualEarnings).toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Earnings Per Video:</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.earningsPerVideo).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useTikTokFundStore()
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
          if (state.monthlyViews !== undefined) store.setMonthlyViews(state.monthlyViews as number)
          if (state.qualifiedViewPercentage !== undefined) store.setQualifiedViewPercentage(state.qualifiedViewPercentage as number)
          if (state.rpm !== undefined) store.setRpm(state.rpm as number)
          if (state.videosPerMonth !== undefined) store.setVideosPerMonth(state.videosPerMonth as number)
          if (state.avgVideoLength) store.setAvgVideoLength(state.avgVideoLength as any)
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
        calculator_slug: 'tiktok-creator-fund-calculator',
        category: 'Creator Economy',
        saved_name: `TikTok: ${currencySymbol}${Math.round(metrics.estimatedMonthlyEarnings)}/mo`,
        input_state: {
          monthlyViews: store.monthlyViews,
          qualifiedViewPercentage: store.qualifiedViewPercentage,
          rpm: store.rpm,
          videosPerMonth: store.videosPerMonth,
          avgVideoLength: store.avgVideoLength
        },
        core_metric: Math.round(metrics.estimatedMonthlyEarnings)
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
    "Monthly Views": store.monthlyViews,
    "Qualified View Rate": `${store.qualifiedViewPercentage}%`,
    "Qualified Views": Math.round(metrics.qualifiedViews),
    "RPM": `${currencySymbol}${store.rpm}`,
    "Monthly Earnings": `${currencySymbol}${Math.round(metrics.estimatedMonthlyEarnings)}`,
    "Annual Earnings": `${currencySymbol}${Math.round(metrics.estimatedAnnualEarnings)}`,
    "Earnings Per Video": `${currencySymbol}${Math.round(metrics.earningsPerVideo)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/creator/tiktok-creator-fund-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/creator/tiktok-creator-fund-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full space-y-10">

        {/* Core TikTok Metrics */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Smartphone className="h-5 w-5 text-muted-foreground" />
            TikTok Channel Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Total Monthly Views</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Eye className="h-4 w-4" /></span>
                <Input
                  type="number"
                  value={store.monthlyViews === 0 ? '' : store.monthlyViews}
                  onChange={(e) => store.setMonthlyViews(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  placeholder="e.g. 5000000"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Estimated RPM (Per 1k Views)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.05"
                  value={store.rpm === 0 ? '' : store.rpm}
                  onChange={(e) => store.setRpm(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Creator Rewards Program Qualifications */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Sparkles className="h-5 w-5 text-muted-foreground" />
            Creator Rewards Qualifications
          </h2>

          {!metrics.isEligible && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium leading-relaxed">{metrics.eligibilityMessage}</p>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <label className="text-sm font-semibold text-foreground">Average Video Length</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'short', label: '< 30 Seconds' },
                { id: 'medium', label: '30 - 59 Seconds' },
                { id: 'long', label: 'Over 1 Minute (Eligible)' }
              ].map((len) => (
                <div
                  key={len.id}
                  onClick={() => store.setAvgVideoLength(len.id as any)}
                  className={`p-3 text-center rounded-xl border cursor-pointer transition-all ${
                    store.avgVideoLength === len.id
                      ? 'border-primary bg-primary/5 ring-1 ring-primary font-bold'
                      : 'border-border/60 hover:border-primary/50 text-muted-foreground'
                  }`}
                >
                  <span className="text-sm">{len.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Qualified View Percentage (%)</label>
                <p className="text-xs text-muted-foreground mt-1">Only views longer than 5s count toward earnings.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.qualifiedViewPercentage}%</span>
            </div>
            <Slider
              value={[store.qualifiedViewPercentage]}
              max={100} min={5} step={1}
              onValueChange={(val: any) => store.setQualifiedViewPercentage(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-border/50">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
               <Clock className="h-4 w-4" /> Videos Uploaded Per Month
            </label>
            <Input
              type="number"
              value={store.videosPerMonth === 0 ? '' : store.videosPerMonth}
              onChange={(e) => store.setVideosPerMonth(e.target.value === '' ? 0 : Number(e.target.value))}
              className="text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60 sm:w-1/2"
            />
          </div>

        </div>

      </div>

      {/* RIGHT COLUMN: Results & Conversion Sticky Panel */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20">

        {/* Success Toast */}
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-blue-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        {/* The Result Card */}
        <div className={`text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-colors duration-500 ${metrics.isEligible ? 'bg-[#000000] border border-neutral-800' : 'bg-neutral-600'}`}>
          {metrics.isEligible && (
            <div className="absolute right-0 top-0 w-64 h-64 bg-[#00f2fe]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          )}

          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
             Estimated Monthly Earnings
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">
              {metrics.isEligible ? `${currencySymbol}${Math.round(metrics.estimatedMonthlyEarnings).toLocaleString()}` : `${currencySymbol}0`}
            </span>
            <span className="text-lg font-medium text-primary-foreground/60 ml-1">/ mo</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div>
              <p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Annual Projection</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.estimatedAnnualEarnings).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Per Video Avg.</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.earningsPerVideo).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Performance Breakdown
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Total Raw Views</span>
              <span className="font-medium">{store.monthlyViews.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border/50 text-indigo-600 dark:text-indigo-400">
              <span>Qualified Views (&gt; 5s watch time)</span>
              <span className="font-bold">{Math.round(metrics.qualifiedViews).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Monetization RPM</span>
              <span className="font-medium">{currencySymbol}{store.rpm}</span>
            </div>

            <div className="bg-muted/50 p-4 rounded-xl mt-4">
               <p className="text-xs text-muted-foreground leading-relaxed">
                 <strong className="text-foreground">Formula:</strong> (Qualified Views / 1000) × RPM = Monthly Earnings. Note that the old "Creator Fund" has been replaced by the "Creator Rewards Program," requiring videos over 1 minute long.
               </p>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="tiktok-creator-fund-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="TikTok_Earnings_Estimate"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<TikTokReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
