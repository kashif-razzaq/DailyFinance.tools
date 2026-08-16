/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useBFCMStore } from '@/store/black-friday-discount-roi.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tag, TrendingUp, DollarSign, Target, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, marginBottom: 20, color: '#4b5563' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottom: '1 solid #e5e7eb' },
  label: { fontSize: 12, color: '#374151' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 20, backgroundColor: '#f3f4f6', paddingHorizontal: 10, borderRadius: 4 },
  highlightLabel: { fontSize: 14, fontWeight: 'bold' },
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#ef4444' },
});

const BFCMReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>BFCM Promo ROI Analysis</Text>
      <Text style={pdfStyles.subtitle}>Discount Volume vs Profit Lift</Text>

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Promo Discount:</Text><Text style={pdfStyles.value}>{data.discountPercent}% OFF</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Volume Multiplier:</Text><Text style={pdfStyles.value}>{data.expectedVolumeMultiplier}x Sales</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Extra Daily Ad Spend:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.adSpendIncrease}</Text></View>
      </View>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Daily Comparison</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Normal Daily Revenue:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.normalDailyRevenue).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Promo Daily Revenue:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.promoDailyRevenue).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Normal Daily Profit:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.normalDailyProfit).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Promo Daily Profit:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.promoDailyProfit).toLocaleString()}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>True Profit Lift (After Ads):</Text>
        <Text style={pdfStyles.highlightValue}>{data.profitLift > 0 ? '+' : ''}{currencySymbol}{Math.round(data.profitLift).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useBFCMStore()
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
          if (state.baseRetailPrice !== undefined) store.setBaseRetailPrice(state.baseRetailPrice as number)
          if (state.cogs !== undefined) store.setCogs(state.cogs as number)
          if (state.normalDailyVolume !== undefined) store.setNormalDailyVolume(state.normalDailyVolume as number)
          if (state.discountPercent !== undefined) store.setDiscountPercent(state.discountPercent as number)
          if (state.expectedVolumeMultiplier !== undefined) store.setExpectedVolumeMultiplier(state.expectedVolumeMultiplier as number)
          if (state.adSpendIncrease !== undefined) store.setAdSpendIncrease(state.adSpendIncrease as number)
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
        calculator_slug: 'black-friday-discount-roi-calculator',
        category: 'E-Commerce',
        saved_name: `BFCM: ${store.discountPercent}% Off`,
        input_state: {
          baseRetailPrice: store.baseRetailPrice,
          cogs: store.cogs,
          normalDailyVolume: store.normalDailyVolume,
          discountPercent: store.discountPercent,
          expectedVolumeMultiplier: store.expectedVolumeMultiplier,
          adSpendIncrease: store.adSpendIncrease
        },
        core_metric: Math.round(metrics.profitLift)
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
    "Discount": `${store.discountPercent}%`,
    "Volume Multiplier": `${store.expectedVolumeMultiplier}x`,
    "Revenue Lift": `${currencySymbol}${Math.round(metrics.revenueLift)}`,
    "Profit Lift": `${currencySymbol}${Math.round(metrics.profitLift)}`,
    "Profitable?": metrics.isProfitablePromo ? "Yes" : "No"
  }]

  const chartData = [
    { name: 'Normal Day', Profit: Math.round(metrics.normalDailyProfit) },
    { name: 'Promo Day', Profit: Math.round(metrics.promoDailyProfit) }
  ]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/black-friday-discount-roi-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/black-friday-discount-roi-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            Normal Unit Economics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Base Retail Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.baseRetailPrice === 0 ? '' : store.baseRetailPrice}
                  onChange={(e) => store.setBaseRetailPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">COGS (Per Unit)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.cogs === 0 ? '' : store.cogs}
                  onChange={(e) => store.setCogs(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Normal Daily Sales</label>
              <Input
                type="number"
                value={store.normalDailyVolume === 0 ? '' : store.normalDailyVolume}
                onChange={(e) => store.setNormalDailyVolume(e.target.value === '' ? 0 : Number(e.target.value))}
                className="font-medium bg-muted/50"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Tag className="h-5 w-5 text-muted-foreground" />
            Promo Variables
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold text-foreground">Discount Percentage</label>
                <p className="text-[10px] text-muted-foreground mt-1">Promo Sale Price: {currencySymbol}{metrics.promoRetailPrice.toFixed(2)}</p>
              </div>
              <span className="text-lg font-bold text-red-500">{store.discountPercent}% OFF</span>
            </div>
            <Slider
              value={[store.discountPercent]}
              max={80} step={5}
              onValueChange={(val: any) => store.setDiscountPercent(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold text-foreground">Expected Volume Multiplier</label>
                <p className="text-[10px] text-muted-foreground mt-1">If normal is 50, 3x means 150 daily sales.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.expectedVolumeMultiplier}x</span>
            </div>
            <Slider
              value={[store.expectedVolumeMultiplier]}
              max={10} step={0.5}
              onValueChange={(val: any) => store.setExpectedVolumeMultiplier(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-border/50">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
               <TrendingUp className="h-4 w-4" /> Extra Daily Ad Spend for Promo
            </label>
            <div className="relative w-full sm:w-1/2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number"
                value={store.adSpendIncrease === 0 ? '' : store.adSpendIncrease}
                onChange={(e) => store.setAdSpendIncrease(e.target.value === '' ? 0 : Number(e.target.value))}
                className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
              />
            </div>
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

        <div className={`${metrics.isProfitablePromo ? 'bg-red-600 dark:bg-red-700' : 'bg-slate-800'} text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-colors duration-500`}>
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <Target className="h-4 w-4" /> Daily Profit Lift
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">
              {metrics.profitLift > 0 ? '+' : ''}{currencySymbol}{Math.round(metrics.profitLift).toLocaleString()}
            </span>
          </div>
          <p className="text-sm font-medium mt-2 text-white/80 relative z-10">
            Extra profit generated compared to a normal day.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Promo Daily Revenue</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.promoDailyRevenue).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Gross Margin Crush</p>
              <p className="text-xl font-bold text-red-200">-{metrics.marginContraction.toFixed(1)}%</p>
            </div>
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
                  formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, 'Daily Profit']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                />
                <Bar dataKey="Profit" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#94a3b8' : (metrics.isProfitablePromo ? '#ef4444' : '#64748b')} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {!metrics.isProfitablePromo && (
            <div className="bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <p>Warning: This promotion loses money. The increase in volume is not high enough to offset the margin compression and additional ad spend.</p>
            </div>
          )}
        </div>

        <CalculatorActions
          slug="black-friday-discount-roi-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="BFCM_Promo_ROI"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<BFCMReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
