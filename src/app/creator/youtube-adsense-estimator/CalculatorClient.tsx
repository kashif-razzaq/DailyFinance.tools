/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useYouTubeAdsenseStore } from '@/store/youtube-adsense.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Video, DollarSign, Activity, Percent, Eye, TrendingUp, CheckCircle2 } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Simple PDF template for AdSense Report
const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, marginBottom: 20, color: '#4b5563' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottom: '1 solid #e5e7eb' },
  label: { fontSize: 12, color: '#374151' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 20, backgroundColor: '#f3f4f6', paddingHorizontal: 10, borderRadius: 4 },
  highlightLabel: { fontSize: 14, fontWeight: 'bold' },
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#059669' }
});

const AdSenseReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>YouTube AdSense Estimate</Text>
      <Text style={pdfStyles.subtitle}>Projected Revenue Report</Text>
      <View style={{ marginTop: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Monthly Long-Form Views:</Text><Text style={pdfStyles.value}>{data.monthlyViews.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Average RPM:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.rpm.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Monthly Shorts Views:</Text><Text style={pdfStyles.value}>{data.shortsViews.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Long-Form Est. Revenue:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.longFormRevenue).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Shorts Est. Revenue:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.shortsRevenue).toLocaleString()}</Text></View>
      </View>
      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Total Estimated Monthly Revenue:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{Math.round(data.totalMonthlyRevenue).toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Projected Annual Revenue:</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.totalAnnualRevenue).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useYouTubeAdsenseStore()
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
          if (state.monthlyViews !== undefined) store.setMonthlyViews(state.monthlyViews as number)
          if (state.rpm !== undefined) store.setRpm(state.rpm as number)
          if (state.retentionRate !== undefined) store.setRetentionRate(state.retentionRate as number)
          if (state.videosPerMonth !== undefined) store.setVideosPerMonth(state.videosPerMonth as number)
          if (state.shortsViews !== undefined) store.setShortsViews(state.shortsViews as number)
          if (state.shortsRpm !== undefined) store.setShortsRpm(state.shortsRpm as number)
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
        calculator_slug: 'youtube-adsense-estimator',
        category: 'Creator Economy',
        saved_name: `YouTube Estimate: ${currencySymbol}${Math.round(metrics.totalMonthlyRevenue)}/mo`,
        input_state: {
          monthlyViews: store.monthlyViews,
          rpm: store.rpm,
          retentionRate: store.retentionRate,
          videosPerMonth: store.videosPerMonth,
          shortsViews: store.shortsViews,
          shortsRpm: store.shortsRpm
        },
        core_metric: Math.round(metrics.totalMonthlyRevenue)
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
    "Monthly Long-Form Views": store.monthlyViews,
    "Average RPM": `${currency} ${store.rpm}`,
    "Monthly Shorts Views": store.shortsViews,
    "Estimated Long-Form Revenue": `${currency} ${Math.round(metrics.longFormRevenue)}`,
    "Estimated Shorts Revenue": `${currency} ${Math.round(metrics.shortsRevenue)}`,
    "Total Monthly Revenue": `${currency} ${Math.round(metrics.totalMonthlyRevenue)}`,
    "Annual Projection": `${currency} ${Math.round(metrics.totalAnnualRevenue)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/creator/youtube-adsense-estimator?savedId=${savedScenarioId}`
    : `${baseUrl}/creator/youtube-adsense-estimator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full space-y-10">

        {/* Long-Form Video Metrics */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Video className="h-5 w-5 text-muted-foreground" />
            Views to Money Calculator (Long-Form)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Monthly Views</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Eye className="h-4 w-4" /></span>
                <Input
                  type="number"
                  value={store.monthlyViews === 0 ? '' : store.monthlyViews}
                  onChange={(e) => store.setMonthlyViews(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Average RPM (Revenue Per 1k Views)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.1"
                  value={store.rpm === 0 ? '' : store.rpm}
                  onChange={(e) => store.setRpm(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">RPM varies by niche (Gaming ~$2, Finance ~$15+).</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Audience Retention Rate</label>
                <p className="text-xs text-muted-foreground mt-1">Higher retention allows for more mid-roll ads, boosting effective RPM.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.retentionRate}%</span>
            </div>
            <Slider
              value={[store.retentionRate]}
              max={100} min={10} step={1}
              onValueChange={(val: any) => store.setRetentionRate(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          <div className="space-y-3 pt-2">
              <label className="text-sm font-semibold text-foreground">Videos Published Per Month</label>
              <Input
                type="number"
                value={store.videosPerMonth === 0 ? '' : store.videosPerMonth}
                onChange={(e) => store.setVideosPerMonth(e.target.value === '' ? 0 : Number(e.target.value))}
                className="text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
              />
            </div>
        </div>

        {/* YouTube Shorts Metrics */}
        <div className="space-y-6 pb-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            YouTube Shorts Metrics
          </h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Monthly Shorts Views</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Eye className="h-4 w-4" /></span>
                <Input
                  type="number"
                  value={store.shortsViews === 0 ? '' : store.shortsViews}
                  onChange={(e) => store.setShortsViews(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Shorts RPM</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.01"
                  value={store.shortsRpm === 0 ? '' : store.shortsRpm}
                  onChange={(e) => store.setShortsRpm(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Shorts RPM typically ranges from $0.05 to $0.20.</p>
            </div>
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
        <div className="bg-[#FF0000] text-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(255,0,0,0.5)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <Video className="w-4 h-4" /> Estimated Monthly Revenue
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-6xl font-black tracking-tighter drop-shadow-sm">{currencySymbol}{Math.round(metrics.totalMonthlyRevenue).toLocaleString()}</span>
            <span className="text-xl font-medium text-white/90">/ mo</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider mb-1">Annual Projection</p>
              <p className="text-2xl font-bold drop-shadow-sm">{currencySymbol}{Math.round(metrics.totalAnnualRevenue).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider mb-1">Daily Average</p>
              <p className="text-2xl font-bold drop-shadow-sm">{currencySymbol}{Math.round(metrics.dailyAverage).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Breakdown Chart */}
        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Revenue Breakdown</h4>

          <div className="space-y-4">
            <div className="w-full h-4 rounded-full flex overflow-hidden bg-muted">
              <div style={{width: `${(metrics.longFormRevenue / (metrics.totalMonthlyRevenue || 1)) * 100}%`}} className="bg-[#FF0000] transition-all duration-500 ease-out" />
              <div style={{width: `${(metrics.shortsRevenue / (metrics.totalMonthlyRevenue || 1)) * 100}%`}} className="bg-[#282828] transition-all duration-500 ease-out" />
            </div>
            
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF0000]"></div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-medium">Long-Form</span>
                  <span className="font-bold text-foreground">{currencySymbol}{Math.round(metrics.longFormRevenue).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#282828]"></div>
                <div className="flex flex-col text-right">
                  <span className="text-muted-foreground text-xs font-medium">Shorts</span>
                  <span className="font-bold text-foreground">{currencySymbol}{Math.round(metrics.shortsRevenue).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border/50">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Key Metrics</h4>
            <div className="flex justify-between items-center text-sm py-2">
              <span className="text-muted-foreground">Est. Monetized Playbacks:</span>
              <span className="font-bold">{Math.round(metrics.estimatedPlaybacks).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm py-2">
              <span className="text-muted-foreground">Avg. Views per Video:</span>
              <span className="font-bold">{Math.round(metrics.viewsPerVideo).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="youtube-adsense-estimator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="YouTube_AdSense_Estimate"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<AdSenseReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
