/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useTargetROASStore } from '@/store/target-roas.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { DollarSign, Percent, TrendingUp, Target, Activity, AlertTriangle, CheckCircle2 } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

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

const ROASReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Break-Even & Target ROAS Analysis</Text>
      <Text style={pdfStyles.subtitle}>Ecommerce Profitability Projection</Text>

      <Text style={pdfStyles.sectionTitle}>Product Economics</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Retail Price:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.retailPrice.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>COGS:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.cogs.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Gross Profit:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.grossProfit.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Gross Margin:</Text><Text style={pdfStyles.value}>{data.grossMarginPercent.toFixed(1)}%</Text></View>
      </View>

      <Text style={pdfStyles.sectionTitle}>Break-Even Metrics (0% Net Profit)</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Break-Even CPA (Max Ad Spend):</Text><Text style={pdfStyles.value}>{currencySymbol}{data.breakEvenCPA.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Break-Even ROAS:</Text><Text style={pdfStyles.value}>{data.breakEvenROAS.toFixed(2)}x</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Target ROAS ({data.targetProfitMargin}% Net Profit):</Text>
        <Text style={pdfStyles.highlightValue}>{data.targetROAS > 0 ? `${data.targetROAS.toFixed(2)}x` : 'Unattainable'}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Target CPA (Allowable Ad Spend):</Text>
        <Text style={pdfStyles.value}>{data.targetCPA > 0 ? `${currencySymbol}${data.targetCPA.toFixed(2)}` : 'Unattainable'}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useTargetROASStore()
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
          if (state.retailPrice !== undefined) store.setRetailPrice(state.retailPrice as number)
          if (state.cogs !== undefined) store.setCogs(state.cogs as number)
          if (state.targetProfitMargin !== undefined) store.setTargetProfitMargin(state.targetProfitMargin as number)
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
        calculator_slug: 'target-roas-break-even-calculator',
        category: 'E-Commerce',
        saved_name: `ROAS Target: ${metrics.targetROAS > 0 ? metrics.targetROAS.toFixed(2) + 'x' : 'N/A'}`,
        input_state: {
          retailPrice: store.retailPrice,
          cogs: store.cogs,
          targetProfitMargin: store.targetProfitMargin
        },
        core_metric: metrics.targetROAS > 0 ? metrics.targetROAS : 0
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
    "Retail Price": `${currencySymbol}${store.retailPrice}`,
    "COGS": `${currencySymbol}${store.cogs}`,
    "Gross Margin": `${metrics.grossMarginPercent.toFixed(1)}%`,
    "Target Net Margin": `${store.targetProfitMargin}%`,
    "Break-Even CPA": `${currencySymbol}${metrics.breakEvenCPA.toFixed(2)}`,
    "Break-Even ROAS": `${metrics.breakEvenROAS.toFixed(2)}x`,
    "Target CPA": metrics.targetCPA > 0 ? `${currencySymbol}${metrics.targetCPA.toFixed(2)}` : 'Unattainable',
    "Target ROAS": metrics.targetROAS > 0 ? `${metrics.targetROAS.toFixed(2)}x` : 'Unattainable'
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/target-roas-break-even-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/target-roas-break-even-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            Product Economics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Retail Sale Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="1"
                  value={store.retailPrice === 0 ? '' : store.retailPrice}
                  onChange={(e) => store.setRetailPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Cost of Goods Sold (COGS)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="1"
                  value={store.cogs === 0 ? '' : store.cogs}
                  onChange={(e) => store.setCogs(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-xs text-muted-foreground">Product cost + shipping + packaging.</p>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-xl flex items-center justify-between">
            <span className="text-sm font-medium">Current Gross Margin:</span>
            <span className={`font-bold text-lg ${metrics.grossMarginPercent < 40 ? 'text-red-500' : 'text-blue-500'}`}>
              {metrics.grossMarginPercent.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Target className="h-5 w-5 text-muted-foreground" />
            Profitability Goals
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Target Net Profit Margin (%)</label>
                <p className="text-xs text-muted-foreground mt-1">What % of the retail price do you want to keep after ad spend?</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.targetProfitMargin}%</span>
            </div>
            <Slider
              value={[store.targetProfitMargin]}
              max={60} step={1}
              onValueChange={(val: any) => store.setTargetProfitMargin(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          {metrics.targetCPA <= 0 && (
            <div className="bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 p-4 rounded-xl text-sm flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <p>Your target net margin is too high given your current COGS. You must either lower your net margin expectations, lower your COGS, or raise your retail price.</p>
            </div>
          )}
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

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <Target className="h-4 w-4" /> Target ROAS
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">
              {metrics.targetROAS > 0 ? `${metrics.targetROAS.toFixed(2)}x` : 'N/A'}
            </span>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
            <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Target CPA (Max Ad Spend)</p>
            <p className="text-2xl font-bold">
              {metrics.targetCPA > 0 ? `${currencySymbol}${metrics.targetCPA.toFixed(2)}` : 'N/A'}
            </p>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4" /> Break-Even Metrics
          </h4>

          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground text-xs leading-relaxed">
              If your ads hit these numbers, you make $0 profit, but you acquire a customer for free.
            </p>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground font-medium">Break-Even ROAS</span>
              <span className="font-bold text-lg">{metrics.breakEvenROAS.toFixed(2)}x</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground font-medium">Break-Even CPA</span>
              <span className="font-bold text-lg">{currencySymbol}{metrics.breakEvenCPA.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="target-roas-break-even-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Target_ROAS_Break_Even"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<ROASReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
