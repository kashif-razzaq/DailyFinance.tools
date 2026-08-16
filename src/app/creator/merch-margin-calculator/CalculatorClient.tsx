/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useMerchStore } from '@/store/merch-margin.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Box, ShoppingCart, Truck, CreditCard, DollarSign, PieChart, CheckCircle2, TrendingUp } from "lucide-react"
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
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#10b981' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});

const MerchReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Merch Profit Margin Analysis</Text>
      <Text style={pdfStyles.subtitle}>Per Item Breakdown</Text>

      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Retail Price:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.retailPrice.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Base Item Cost:</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.baseCost.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Print/Production Cost:</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.printCost.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Shipping Cost:</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.shippingCost.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Packaging Cost:</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.packagingCost.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Platform Fee ({data.platformFeePercent}%):</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.platformFeeAmount.toFixed(2)}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Net Profit Per Item:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{data.profitPerItem.toFixed(2)} ({data.grossMarginPercent.toFixed(1)}%)</Text>
      </View>

      <Text style={pdfStyles.sectionTitle}>Monthly Projection ({data.monthlyVolume} units)</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Gross Monthly Revenue:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.monthlyRevenue.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total COGS & Fees:</Text><Text style={pdfStyles.value}>{currencySymbol}{(data.monthlyRevenue - data.monthlyProfit).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Net Monthly Profit:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.monthlyProfit.toLocaleString()}</Text></View>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useMerchStore()
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
          if (state.baseCost !== undefined) store.setBaseCost(state.baseCost as number)
          if (state.printCost !== undefined) store.setPrintCost(state.printCost as number)
          if (state.shippingCost !== undefined) store.setShippingCost(state.shippingCost as number)
          if (state.packagingCost !== undefined) store.setPackagingCost(state.packagingCost as number)
          if (state.retailPrice !== undefined) store.setRetailPrice(state.retailPrice as number)
          if (state.monthlyVolume !== undefined) store.setMonthlyVolume(state.monthlyVolume as number)
          if (state.platformFeePercent !== undefined) store.setPlatformFeePercent(state.platformFeePercent as number)
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
        calculator_slug: 'merch-margin-calculator',
        category: 'Creator Economy',
        saved_name: `Merch Profit: ${currencySymbol}${Math.round(metrics.monthlyProfit)}/mo`,
        input_state: {
          baseCost: store.baseCost,
          printCost: store.printCost,
          shippingCost: store.shippingCost,
          packagingCost: store.packagingCost,
          retailPrice: store.retailPrice,
          monthlyVolume: store.monthlyVolume,
          platformFeePercent: store.platformFeePercent
        },
        core_metric: Math.round(metrics.monthlyProfit)
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
    "Total Cost": `${currencySymbol}${metrics.totalCostPerItem.toFixed(2)}`,
    "Profit Per Item": `${currencySymbol}${metrics.profitPerItem.toFixed(2)}`,
    "Margin %": `${metrics.grossMarginPercent.toFixed(1)}%`,
    "Monthly Revenue": `${currencySymbol}${metrics.monthlyRevenue}`,
    "Monthly Profit": `${currencySymbol}${metrics.monthlyProfit}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/creator/merch-margin-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/creator/merch-margin-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Box className="h-5 w-5 text-muted-foreground" />
            Cost of Goods Sold (COGS)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Base Item Cost (Blank)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.5"
                  value={store.baseCost === 0 ? '' : store.baseCost}
                  onChange={(e) => store.setBaseCost(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Print/Production Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.5"
                  value={store.printCost === 0 ? '' : store.printCost}
                  onChange={(e) => store.setPrintCost(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Shipping Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Truck className="h-4 w-4" /></span>
                <Input
                  type="number" step="0.5"
                  value={store.shippingCost === 0 ? '' : store.shippingCost}
                  onChange={(e) => store.setShippingCost(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Packaging & Inserts</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.1"
                  value={store.packagingCost === 0 ? '' : store.packagingCost}
                  onChange={(e) => store.setPackagingCost(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            Pricing & Volume
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
              <label className="text-sm font-semibold text-foreground">Platform/Processing Fee (%)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><CreditCard className="h-4 w-4" /></span>
                <Input
                  type="number" step="0.1"
                  value={store.platformFeePercent === 0 ? '' : store.platformFeePercent}
                  onChange={(e) => store.setPlatformFeePercent(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Estimated Monthly Sales Volume</label>
                <p className="text-xs text-muted-foreground mt-1">Number of items sold per month.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.monthlyVolume} units</span>
            </div>
            <Slider
              value={[store.monthlyVolume]}
              max={1000} step={10}
              onValueChange={(val: any) => store.setMonthlyVolume(Array.isArray(val) ? val[0] : val)}
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

        {/* The Result Card */}
        <div className="bg-[#1F2937] text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            Net Profit Per Item
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{currencySymbol}{metrics.profitPerItem.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/10 relative z-10">
            <div>
              <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider mb-1">Gross Margin</p>
              <p className={`text-2xl font-bold ${metrics.grossMarginPercent < 30 ? 'text-red-400' : 'text-emerald-400'}`}>
                {metrics.grossMarginPercent.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider mb-1">Est. Monthly Profit</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.monthlyProfit).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Breakdown Chart */}
        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Cost Breakdown (Per Item)
          </h4>

          <div className="space-y-4">
            <div className="w-full h-4 rounded-full flex overflow-hidden">
              <div style={{width: `${(metrics.cogs / store.retailPrice) * 100}%`}} className="bg-slate-400 dark:bg-slate-600 transition-all duration-300" />
              <div style={{width: `${(metrics.platformFeeAmount / store.retailPrice) * 100}%`}} className="bg-rose-500 transition-all duration-300" />
              <div style={{width: `${(metrics.profitPerItem / store.retailPrice) * 100}%`}} className="bg-emerald-500 transition-all duration-300" />
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                  <span className="text-muted-foreground font-medium">COGS (Base, Print, Ship)</span>
                </div>
                <div className="font-bold">{currencySymbol}{metrics.cogs.toFixed(2)}</div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <span className="text-muted-foreground font-medium">Platform & Card Fees</span>
                </div>
                <div className="font-bold">{currencySymbol}{metrics.platformFeeAmount.toFixed(2)}</div>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Net Profit</span>
                </div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400">{currencySymbol}{metrics.profitPerItem.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="merch-margin-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Merch_Margin_Analysis"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<MerchReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
