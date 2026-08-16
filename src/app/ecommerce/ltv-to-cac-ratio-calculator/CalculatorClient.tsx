/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useLTVCACStore } from '@/store/ltv-to-cac.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ShoppingCart, Percent, DollarSign, Activity, AlertTriangle, CheckCircle2, TrendingUp, Compass } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'

const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, marginBottom: 20, color: '#4b5563' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottom: '1 solid #e5e7eb' },
  label: { fontSize: 12, color: '#374151' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 20, backgroundColor: '#f3f4f6', paddingHorizontal: 10, borderRadius: 4 },
  highlightLabel: { fontSize: 14, fontWeight: 'bold' },
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#8b5cf6' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});

const LTVCACReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>LTV:CAC Ratio Analysis</Text>
      <Text style={pdfStyles.subtitle}>Ecommerce Unit Economics</Text>

      <Text style={pdfStyles.sectionTitle}>Inputs</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Average Order Value:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.averageOrderValue.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Gross Margin:</Text><Text style={pdfStyles.value}>{data.grossMarginPercent}%</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Customer Acquisition Cost:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.customerAcquisitionCost.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Avg Purchases/Year:</Text><Text style={pdfStyles.value}>{data.averagePurchasesPerYear}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Avg Lifespan (Years):</Text><Text style={pdfStyles.value}>{data.averageLifespanYears}</Text></View>
      </View>

      <Text style={pdfStyles.sectionTitle}>Results</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Lifetime Revenue:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.lifetimeRevenue).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Customer Lifetime Value (Gross Profit):</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.lifetimeValue).toLocaleString()}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>LTV to CAC Ratio:</Text>
        <Text style={pdfStyles.highlightValue}>{data.ltvToCacRatio.toFixed(2)}:1 ({data.ratioStatus})</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Payback Period (Purchases):</Text>
        <Text style={pdfStyles.value}>{data.paybackPurchases.toFixed(1)} purchases to break even</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useLTVCACStore()
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
          if (state.averageOrderValue !== undefined) store.setAverageOrderValue(state.averageOrderValue as number)
          if (state.grossMarginPercent !== undefined) store.setGrossMarginPercent(state.grossMarginPercent as number)
          if (state.averagePurchasesPerYear !== undefined) store.setAveragePurchasesPerYear(state.averagePurchasesPerYear as number)
          if (state.averageLifespanYears !== undefined) store.setAverageLifespanYears(state.averageLifespanYears as number)
          if (state.customerAcquisitionCost !== undefined) store.setCustomerAcquisitionCost(state.customerAcquisitionCost as number)
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
        calculator_slug: 'ltv-to-cac-ratio-calculator',
        category: 'E-Commerce',
        saved_name: `LTV:CAC ${metrics.ltvToCacRatio.toFixed(1)}x`,
        input_state: {
          averageOrderValue: store.averageOrderValue,
          grossMarginPercent: store.grossMarginPercent,
          averagePurchasesPerYear: store.averagePurchasesPerYear,
          averageLifespanYears: store.averageLifespanYears,
          customerAcquisitionCost: store.customerAcquisitionCost
        },
        core_metric: metrics.ltvToCacRatio
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
    "AOV": `${currencySymbol}${store.averageOrderValue}`,
    "CAC": `${currencySymbol}${store.customerAcquisitionCost}`,
    "Lifetime Value": `${currencySymbol}${Math.round(metrics.lifetimeValue)}`,
    "LTV:CAC Ratio": `${metrics.ltvToCacRatio.toFixed(2)}:1`,
    "Health Status": metrics.ratioStatus
  }]

  const chartData = [
    { name: 'CAC', Value: store.customerAcquisitionCost, color: '#ef4444' },
    { name: 'LTV', Value: Math.round(metrics.lifetimeValue), color: '#10b981' }
  ]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/ltv-to-cac-ratio-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/ltv-to-cac-ratio-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            Unit Economics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Average Order Value</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="1"
                  value={store.averageOrderValue === 0 ? '' : store.averageOrderValue}
                  onChange={(e) => store.setAverageOrderValue(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Gross Margin (%)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Percent className="h-4 w-4" /></span>
                <Input
                  type="number" step="1"
                  value={store.grossMarginPercent === 0 ? '' : store.grossMarginPercent}
                  onChange={(e) => store.setGrossMarginPercent(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 font-medium bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">CAC</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="1"
                  value={store.customerAcquisitionCost === 0 ? '' : store.customerAcquisitionCost}
                  onChange={(e) => store.setCustomerAcquisitionCost(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">Cost to acquire customer.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            Lifetime Behavior
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Average Purchases Per Year</label>
                <p className="text-xs text-muted-foreground mt-1">How often does a customer buy in 12 months?</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.averagePurchasesPerYear}x</span>
            </div>
            <Slider
              value={[store.averagePurchasesPerYear]}
              max={12} step={0.5}
              onValueChange={(val: any) => store.setAveragePurchasesPerYear(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Average Lifespan (Years)</label>
                <p className="text-xs text-muted-foreground mt-1">How many years do they remain an active customer?</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.averageLifespanYears} yrs</span>
            </div>
            <Slider
              value={[store.averageLifespanYears]}
              max={10} step={0.5}
              onValueChange={(val: any) => store.setAverageLifespanYears(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20">

        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-emerald-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved!</span>
          </div>
        )}

        <div className={`${metrics.isHealthy ? 'bg-violet-600 dark:bg-violet-700' : 'bg-red-600 dark:bg-red-700'} text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-colors duration-500`}>
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <Compass className="h-4 w-4" /> LTV to CAC Ratio
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{metrics.ltvToCacRatio.toFixed(2)}:1</span>
          </div>
          <p className="text-sm font-medium mt-2 text-white/90 relative z-10">
            Status: <strong>{metrics.ratioStatus}</strong>
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Customer LTV (Profit)</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.lifetimeValue).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Payback Period</p>
              <p className="text-2xl font-bold">{metrics.paybackPurchases.toFixed(1)} purchases</p>
            </div>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">LTV vs CAC Comparison</h4>

          <div className="h-[200px] w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tickFormatter={(val) => `${currencySymbol}${val}`} tick={{fontSize: 12}} />
                <Tooltip
                  formatter={(value: any, name: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, name]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                />
                <Bar dataKey="Value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {!metrics.isHealthy && (
            <div className="bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 p-3 rounded-lg mt-2 text-xs leading-relaxed flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <p>Warning: Your LTV is dangerously close to your CAC. You are either breaking even or losing money on every customer you acquire. Increase your AOV or cut ad spend immediately.</p>
            </div>
          )}

          {metrics.isHealthy && metrics.ltvToCacRatio > 6 && (
            <div className="bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500 p-3 rounded-lg mt-2 text-xs leading-relaxed flex items-start gap-2">
              <Activity className="h-4 w-4 shrink-0 mt-0.5" />
              <p>Note: Your ratio is incredibly high. While profitable, this usually means you are severely under-spending on marketing. You should scale your ad budget to acquire market share faster.</p>
            </div>
          )}
        </div>

        <CalculatorActions
          slug="ltv-to-cac-ratio-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="LTV_CAC_Analysis"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<LTVCACReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
