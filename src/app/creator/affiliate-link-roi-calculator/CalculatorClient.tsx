/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useAffiliateStore } from '@/store/affiliate-link-roi.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Link2, MousePointerClick, ShoppingCart, DollarSign, Percent, TrendingUp, CheckCircle2 } from "lucide-react"
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
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#3b82f6' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});

const AffiliateReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Affiliate Link ROI Projection</Text>
      <Text style={pdfStyles.subtitle}>Funnel & Commission Analysis</Text>

      <Text style={pdfStyles.sectionTitle}>Funnel Metrics</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Monthly Traffic:</Text><Text style={pdfStyles.value}>{data.monthlyTraffic.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Click-Through Rate:</Text><Text style={pdfStyles.value}>{data.clickThroughRate}%</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Monthly Clicks:</Text><Text style={pdfStyles.value}>{Math.round(data.monthlyClicks).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Conversion Rate:</Text><Text style={pdfStyles.value}>{data.conversionRate}%</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Monthly Sales:</Text><Text style={pdfStyles.value}>{Math.round(data.monthlyConversions).toLocaleString()}</Text></View>
      </View>

      <Text style={pdfStyles.sectionTitle}>Financials</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Average Order Value:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.averageOrderValue}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Commission Rate:</Text><Text style={pdfStyles.value}>{data.commissionRate}%</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Earnings Per Click (EPC):</Text><Text style={pdfStyles.value}>{currencySymbol}{data.earningsPerClick.toFixed(2)}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Monthly Commission:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{Math.round(data.monthlyCommission).toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Annual Projection:</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.annualCommission).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useAffiliateStore()
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
          if (state.monthlyTraffic !== undefined) store.setMonthlyTraffic(state.monthlyTraffic as number)
          if (state.clickThroughRate !== undefined) store.setClickThroughRate(state.clickThroughRate as number)
          if (state.conversionRate !== undefined) store.setConversionRate(state.conversionRate as number)
          if (state.averageOrderValue !== undefined) store.setAverageOrderValue(state.averageOrderValue as number)
          if (state.commissionRate !== undefined) store.setCommissionRate(state.commissionRate as number)
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
        calculator_slug: 'affiliate-link-roi-calculator',
        category: 'Creator Economy',
        saved_name: `Affiliate: ${currencySymbol}${Math.round(metrics.monthlyCommission)}/mo`,
        input_state: {
          monthlyTraffic: store.monthlyTraffic,
          clickThroughRate: store.clickThroughRate,
          conversionRate: store.conversionRate,
          averageOrderValue: store.averageOrderValue,
          commissionRate: store.commissionRate
        },
        core_metric: Math.round(metrics.monthlyCommission)
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
    "Traffic": store.monthlyTraffic,
    "EPC": `${currencySymbol}${metrics.earningsPerClick.toFixed(2)}`,
    "Monthly Sales": Math.round(metrics.monthlyConversions),
    "Monthly Commission": `${currencySymbol}${Math.round(metrics.monthlyCommission)}`,
    "Annual Commission": `${currencySymbol}${Math.round(metrics.annualCommission)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/creator/affiliate-link-roi-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/creator/affiliate-link-roi-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Link2 className="h-5 w-5 text-muted-foreground" />
            Traffic & Funnel
          </h2>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-foreground">Monthly Traffic (Views/Visitors)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                <TrendingUp className="h-4 w-4" />
              </span>
              <Input
                type="number"
                value={store.monthlyTraffic === 0 ? '' : store.monthlyTraffic}
                onChange={(e) => store.setMonthlyTraffic(e.target.value === '' ? 0 : Number(e.target.value))}
                className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold">Click-Through Rate</label>
                  <p className="text-[10px] text-muted-foreground mt-1">% who click the link</p>
                </div>
                <span className="text-lg font-bold text-foreground">{store.clickThroughRate}%</span>
              </div>
              <Slider
                value={[store.clickThroughRate]}
                max={20} step={0.5}
                onValueChange={(val: any) => store.setClickThroughRate(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold">Conversion Rate</label>
                  <p className="text-[10px] text-muted-foreground mt-1">% of clicks that buy</p>
                </div>
                <span className="text-lg font-bold text-foreground">{store.conversionRate}%</span>
              </div>
              <Slider
                value={[store.conversionRate]}
                max={15} step={0.1}
                onValueChange={(val: any) => store.setConversionRate(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            Offer Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Average Order Value (AOV)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.averageOrderValue === 0 ? '' : store.averageOrderValue}
                  onChange={(e) => store.setAverageOrderValue(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Commission Rate (%)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Percent className="h-4 w-4" /></span>
                <Input
                  type="number" step="1"
                  value={store.commissionRate === 0 ? '' : store.commissionRate}
                  onChange={(e) => store.setCommissionRate(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>
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

        <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10">
            Monthly Commission
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{currencySymbol}{Math.round(metrics.monthlyCommission).toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Annual Commission</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.annualCommission).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Earnings Per Click (EPC)</p>
              <p className="text-2xl font-bold">{currencySymbol}{metrics.earningsPerClick.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Funnel Metrics</h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Total Clicks Sent</span>
              <span className="font-medium">{Math.round(metrics.monthlyClicks).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Sales Generated</span>
              <span className="font-medium">{Math.round(metrics.monthlyConversions).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50 text-blue-600 dark:text-blue-400">
              <span>Gross Sales Volume</span>
              <span className="font-bold">{currencySymbol}{Math.round(metrics.grossSalesGenerated).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Earnings Per Visitor (EPV)</span>
              <span className="font-medium">{currencySymbol}{metrics.earningsPerVisitor.toFixed(3)}</span>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="affiliate-link-roi-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Affiliate_ROI_Projection"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<AffiliateReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
