/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useAOVStore } from '@/store/aov-upsell.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ShoppingCart, TrendingUp, Zap, Percent, CheckCircle2, DollarSign } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, marginBottom: 20, color: '#4b5563' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottom: '1 solid #e5e7eb' },
  label: { fontSize: 12, color: '#374151' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 20, backgroundColor: '#f3f4f6', paddingHorizontal: 10, borderRadius: 4 },
  highlightLabel: { fontSize: 14, fontWeight: 'bold' },
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#0ea5e9' },
});

const AOVReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>AOV Upsell Profit Simulator</Text>
      <Text style={pdfStyles.subtitle}>Post-Purchase Offer ROI</Text>

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Base AOV:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.currentAOV.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Upsell Price:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.upsellPrice.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Upsell Take Rate:</Text><Text style={pdfStyles.value}>{data.upsellTakeRate}%</Text></View>
      </View>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Profitability Lift</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Current Monthly Profit:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.currentProfit).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Extra Profit from Upsell:</Text><Text style={pdfStyles.value}>+{currencySymbol}{Math.round(data.upsellProfit).toLocaleString()}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>New Blended AOV:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{data.newAOV.toFixed(2)}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Overall Profit Lift:</Text>
        <Text style={pdfStyles.value}>+{data.profitLiftPercent.toFixed(1)}%</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useAOVStore()
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
          if (state.currentAOV !== undefined) store.setCurrentAOV(state.currentAOV as number)
          if (state.monthlyOrders !== undefined) store.setMonthlyOrders(state.monthlyOrders as number)
          if (state.grossMarginPercent !== undefined) store.setGrossMarginPercent(state.grossMarginPercent as number)
          if (state.upsellTakeRate !== undefined) store.setUpsellTakeRate(state.upsellTakeRate as number)
          if (state.upsellPrice !== undefined) store.setUpsellPrice(state.upsellPrice as number)
          if (state.upsellMarginPercent !== undefined) store.setUpsellMarginPercent(state.upsellMarginPercent as number)
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
        calculator_slug: 'aov-upsell-simulator',
        category: 'E-Commerce',
        saved_name: `AOV Lift: +${metrics.profitLiftPercent.toFixed(1)}%`,
        input_state: {
          currentAOV: store.currentAOV,
          monthlyOrders: store.monthlyOrders,
          grossMarginPercent: store.grossMarginPercent,
          upsellTakeRate: store.upsellTakeRate,
          upsellPrice: store.upsellPrice,
          upsellMarginPercent: store.upsellMarginPercent
        },
        core_metric: Math.round(metrics.profitLiftPercent)
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
    "Current AOV": `${currencySymbol}${store.currentAOV}`,
    "Upsell Take Rate": `${store.upsellTakeRate}%`,
    "New AOV": `${currencySymbol}${metrics.newAOV.toFixed(2)}`,
    "Extra Monthly Profit": `${currencySymbol}${Math.round(metrics.upsellProfit)}`,
    "Profit Lift": `+${metrics.profitLiftPercent.toFixed(1)}%`
  }]

  const chartData = [
    {
      name: 'Before Upsell',
      "Base Profit": Math.round(metrics.currentProfit),
      "Upsell Profit": 0
    },
    {
      name: 'After Upsell',
      "Base Profit": Math.round(metrics.currentProfit),
      "Upsell Profit": Math.round(metrics.upsellProfit)
    }
  ]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/aov-upsell-simulator?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/aov-upsell-simulator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            Current Store Baseline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Current AOV</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.currentAOV === 0 ? '' : store.currentAOV}
                  onChange={(e) => store.setCurrentAOV(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Monthly Orders</label>
              <Input
                type="number"
                value={store.monthlyOrders === 0 ? '' : store.monthlyOrders}
                onChange={(e) => store.setMonthlyOrders(e.target.value === '' ? 0 : Number(e.target.value))}
                className="font-medium bg-muted/50"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Base Gross Margin (%)</label>
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
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Zap className="h-5 w-5 text-muted-foreground" />
            Post-Purchase Upsell Config
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Upsell Product Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.upsellPrice === 0 ? '' : store.upsellPrice}
                  onChange={(e) => store.setUpsellPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Upsell Margin (%)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Percent className="h-4 w-4" /></span>
                <Input
                  type="number" step="1"
                  value={store.upsellMarginPercent === 0 ? '' : store.upsellMarginPercent}
                  onChange={(e) => store.setUpsellMarginPercent(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">Digital goods have near 100% margins.</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold text-foreground">Take Rate (Conversion %)</label>
                <p className="text-[10px] text-muted-foreground mt-1">What % of buyers add the upsell to their cart?</p>
              </div>
              <span className="text-lg font-bold text-sky-500">{store.upsellTakeRate}%</span>
            </div>
            <Slider
              value={[store.upsellTakeRate]}
              max={50} step={1}
              onValueChange={(val: any) => store.setUpsellTakeRate(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
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

        <div className="bg-sky-500 dark:bg-sky-600 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Total Profit Lift
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">+{metrics.profitLiftPercent.toFixed(1)}%</span>
          </div>

          <p className="text-sm font-medium mt-2 text-sky-50 relative z-10">
            +{currencySymbol}{Math.round(metrics.upsellProfit).toLocaleString()} extra monthly profit without spending more on ads.
          </p>

          <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
            <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">New Blended AOV</p>
            <p className="text-2xl font-bold">
              {currencySymbol}{metrics.newAOV.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Profit Comparison</h4>

          <div className="h-[200px] w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tickFormatter={(val) => `${currencySymbol}${val}`} tick={{fontSize: 12}} />
                <Tooltip
                  formatter={(value: any, name: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, name]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="Base Profit" stackId="a" fill="#94a3b8" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Upsell Profit" stackId="a" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <CalculatorActions
          slug="aov-upsell-simulator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="AOV_Upsell_Analysis"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<AOVReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
