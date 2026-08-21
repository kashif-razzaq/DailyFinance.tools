/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useCourseLaunchStore } from '@/store/course-launch-revenue.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Users, MailOpen, MousePointerClick, ShoppingCart, DollarSign, CheckCircle2, RefreshCcw, TrendingUp, Filter } from "lucide-react"
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
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#2563eb' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});

const CourseReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Course Launch Revenue Projection</Text>
      <Text style={pdfStyles.subtitle}>Email Funnel Analysis</Text>

      <Text style={pdfStyles.sectionTitle}>The Funnel</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Email Subscribers:</Text><Text style={pdfStyles.value}>{data.emailListSize.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Opens ({data.openRate}%):</Text><Text style={pdfStyles.value}>{Math.round(data.totalOpens).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Clicks ({data.clickThroughRate}%):</Text><Text style={pdfStyles.value}>{Math.round(data.totalClicks).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Gross Sales ({data.salesConversionRate}% of clicks):</Text><Text style={pdfStyles.value}>{data.grossSales.toLocaleString()} sales</Text></View>
      </View>

      <Text style={pdfStyles.sectionTitle}>Financials</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Course Price:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.coursePrice}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Gross Revenue:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.grossRevenue.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Projected Refunds ({data.refundRate}%):</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.refundCost.toLocaleString()}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Net Launch Revenue:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{data.netRevenue.toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Earnings Per Subscriber (EPS):</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{data.earningsPerSubscriber.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useCourseLaunchStore()
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
          if (state.emailListSize !== undefined) store.setEmailListSize(state.emailListSize as number)
          if (state.openRate !== undefined) store.setOpenRate(state.openRate as number)
          if (state.clickThroughRate !== undefined) store.setClickThroughRate(state.clickThroughRate as number)
          if (state.salesConversionRate !== undefined) store.setSalesConversionRate(state.salesConversionRate as number)
          if (state.coursePrice !== undefined) store.setCoursePrice(state.coursePrice as number)
          if (state.refundRate !== undefined) store.setRefundRate(state.refundRate as number)
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
        calculator_slug: 'course-launch-revenue-calculator',
        category: 'Creator Economy',
        saved_name: `Launch: ${currencySymbol}${Math.round(metrics.netRevenue)}`,
        input_state: {
          emailListSize: store.emailListSize,
          openRate: store.openRate,
          clickThroughRate: store.clickThroughRate,
          salesConversionRate: store.salesConversionRate,
          coursePrice: store.coursePrice,
          refundRate: store.refundRate
        },
        core_metric: Math.round(metrics.netRevenue)
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
    "List Size": store.emailListSize,
    "Course Price": `${currencySymbol}${store.coursePrice}`,
    "Total Sales": metrics.grossSales,
    "Gross Revenue": `${currencySymbol}${metrics.grossRevenue}`,
    "Net Revenue": `${currencySymbol}${metrics.netRevenue}`,
    "Earnings Per Sub": `${currencySymbol}${metrics.earningsPerSubscriber.toFixed(2)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/creator/course-launch-revenue-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/creator/course-launch-revenue-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Users className="h-5 w-5 text-muted-foreground" />
            Launch Audience
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Email List Size</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Users className="h-4 w-4" /></span>
                <Input
                  type="number"
                  value={store.emailListSize === 0 ? '' : store.emailListSize}
                  onChange={(e) => store.setEmailListSize(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Course Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.coursePrice === 0 ? '' : store.coursePrice}
                  onChange={(e) => store.setCoursePrice(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            Funnel Conversion Rates
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold flex items-center gap-2"><MailOpen className="h-4 w-4 text-blue-500" /> Open Rate (%)</label>
                <p className="text-xs text-muted-foreground mt-1">Industry avg: 25-35%</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.openRate}%</span>
            </div>
            <Slider
              value={[store.openRate]}
              max={100} step={1}
              onValueChange={(val: any) => store.setOpenRate(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold flex items-center gap-2"><MousePointerClick className="h-4 w-4 text-blue-500" /> Click-Through Rate (CTR %)</label>
                <p className="text-xs text-muted-foreground mt-1">% of people who open the email and click the link.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.clickThroughRate}%</span>
            </div>
            <Slider
              value={[store.clickThroughRate]}
              max={30} step={0.5}
              onValueChange={(val: any) => store.setClickThroughRate(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold flex items-center gap-2"><ShoppingCart className="h-4 w-4 text-blue-500" /> Sales Conversion Rate (%)</label>
                <p className="text-xs text-muted-foreground mt-1">% of people who land on the sales page and buy.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.salesConversionRate}%</span>
            </div>
            <Slider
              value={[store.salesConversionRate]}
              max={10} step={0.1}
              onValueChange={(val: any) => store.setSalesConversionRate(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-border/50 pt-6">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold flex items-center gap-2"><RefreshCcw className="h-4 w-4 text-red-500" /> Refund Rate (%)</label>
                <p className="text-xs text-muted-foreground mt-1">Standard money-back guarantee loss.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.refundRate}%</span>
            </div>
            <Slider
              value={[store.refundRate]}
              max={30} step={1}
              onValueChange={(val: any) => store.setRefundRate(Array.isArray(val) ? val[0] : val)}
              className="py-2"
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

        {/* The Result Card */}
        <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            Net Launch Revenue
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{currencySymbol}{Math.round(metrics.netRevenue).toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Total Sales</p>
              <p className="text-2xl font-bold">{metrics.grossSales.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Earnings Per Sub (EPS)</p>
              <p className="text-2xl font-bold">{currencySymbol}{metrics.earningsPerSubscriber.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Funnel Breakdown */}
        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <Filter className="h-4 w-4" /> Funnel Drop-off
          </h4>

          <div className="space-y-4">
            <div className="relative pt-2">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="font-medium text-foreground">Total List</span>
                <span className="font-bold">{store.emailListSize.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-slate-300 dark:bg-slate-700 w-full" />
              </div>
            </div>

            <div className="relative pt-2">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="font-medium text-blue-600 dark:text-blue-400">Emails Opened</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{Math.round(metrics.totalOpens).toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{width: `${store.openRate}%`}} />
              </div>
            </div>

            <div className="relative pt-2">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="font-medium text-indigo-600 dark:text-indigo-400">Link Clicks</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{Math.round(metrics.totalClicks).toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{width: `${(store.openRate / 100) * store.clickThroughRate}%`}} />
              </div>
            </div>

            <div className="relative pt-2">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="font-medium text-blue-600 dark:text-blue-400">Total Sales</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{metrics.grossSales.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{width: `${(store.openRate / 100) * (store.clickThroughRate / 100) * store.salesConversionRate}%`}} />
              </div>
            </div>
          </div>

          {metrics.refundCost > 0 && (
            <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center text-sm text-red-500">
              <span>Projected Refunds</span>
              <span className="font-bold">-{currencySymbol}{Math.round(metrics.refundCost).toLocaleString()}</span>
            </div>
          )}
        </div>

        <CalculatorActions
          slug="course-launch-revenue-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Course_Launch_Projection"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<CourseReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
