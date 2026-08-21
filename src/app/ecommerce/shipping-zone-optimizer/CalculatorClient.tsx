/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useShippingZoneStore } from '@/store/shipping-zone-optimizer.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Truck, Map, DollarSign, Activity, AlertTriangle, CheckCircle2, TrendingDown } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

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
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});

const ShippingReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Shipping Zone Optimization</Text>
      <Text style={pdfStyles.subtitle}>Flat Rate vs True Cost Analysis</Text>

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Monthly Order Volume:</Text><Text style={pdfStyles.value}>{data.monthlyOrderVolume}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Flat Rate Charged:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.flatRateChargeToCustomer.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Shipping Revenue:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.shippingRevenue).toLocaleString()}</Text></View>
      </View>

      <Text style={pdfStyles.sectionTitle}>Cost Breakdown</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Local/Regional (Zones 1-4) Cost:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.shippingCostZone1to4).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Cross-Country (Zones 5-8) Cost:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.shippingCostZone5to8).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Monthly Shipping Cost:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.totalShippingCost).toLocaleString()}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Net Shipping Profit (Loss):</Text>
        <Text style={pdfStyles.highlightValue}>{data.netShippingProfit < 0 ? '-' : ''}{currencySymbol}{Math.abs(Math.round(data.netShippingProfit)).toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Blended Cost Per Order:</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{data.blendedShippingCostPerOrder.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useShippingZoneStore()
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
          if (state.averageItemWeight !== undefined) store.setAverageItemWeight(state.averageItemWeight as number)
          if (state.monthlyOrderVolume !== undefined) store.setMonthlyOrderVolume(state.monthlyOrderVolume as number)
          if (state.percentZone1to4 !== undefined) store.setPercentZone1to4(state.percentZone1to4 as number)
          if (state.flatRateChargeToCustomer !== undefined) store.setFlatRateChargeToCustomer(state.flatRateChargeToCustomer as number)
          if (state.avgCostZone1to4 !== undefined) store.setAvgCostZone1to4(state.avgCostZone1to4 as number)
          if (state.avgCostZone5to8 !== undefined) store.setAvgCostZone5to8(state.avgCostZone5to8 as number)
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
        calculator_slug: 'shipping-zone-optimizer',
        category: 'E-Commerce',
        saved_name: `Shipping Profit: ${currencySymbol}${Math.round(metrics.netShippingProfit)}/mo`,
        input_state: {
          averageItemWeight: store.averageItemWeight,
          monthlyOrderVolume: store.monthlyOrderVolume,
          percentZone1to4: store.percentZone1to4,
          flatRateChargeToCustomer: store.flatRateChargeToCustomer,
          avgCostZone1to4: store.avgCostZone1to4,
          avgCostZone5to8: store.avgCostZone5to8
        },
        core_metric: Math.round(metrics.netShippingProfit)
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
    "Flat Rate Charged": `${currencySymbol}${store.flatRateChargeToCustomer}`,
    "Blended True Cost": `${currencySymbol}${metrics.blendedShippingCostPerOrder.toFixed(2)}`,
    "Shipping Revenue": `${currencySymbol}${Math.round(metrics.shippingRevenue)}`,
    "Shipping Cost": `${currencySymbol}${Math.round(metrics.totalShippingCost)}`,
    "Net Shipping Profit": `${currencySymbol}${Math.round(metrics.netShippingProfit)}`
  }]

  const chartData = [
    { name: 'Zones 1-4 (Local/Regional)', value: metrics.shippingCostZone1to4, color: '#3b82f6' },
    { name: 'Zones 5-8 (Cross-Country)', value: metrics.shippingCostZone5to8, color: '#f59e0b' }
  ]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/shipping-zone-optimizer?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/shipping-zone-optimizer`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            Pricing & Volume
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Monthly Order Volume</label>
              <Input
                type="number" step="1"
                value={store.monthlyOrderVolume === 0 ? '' : store.monthlyOrderVolume}
                onChange={(e) => store.setMonthlyOrderVolume(e.target.value === '' ? 0 : Number(e.target.value))}
                className="font-medium bg-muted/50"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Flat Rate Charged to Customer</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.5"
                  value={store.flatRateChargeToCustomer === 0 ? '' : store.flatRateChargeToCustomer}
                  onChange={(e) => store.setFlatRateChargeToCustomer(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Map className="h-5 w-5 text-muted-foreground" />
            Zone Distribution & Carrier Costs
          </h2>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Local vs Cross-Country Orders</label>
                <p className="text-[10px] text-muted-foreground mt-1">What % of orders go to nearby states (Zones 1-4)?</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-blue-500 w-16 text-right">Z1-4: {store.percentZone1to4}%</span>
              <Slider
                value={[store.percentZone1to4]}
                max={100} step={5}
                onValueChange={(val: any) => store.setPercentZone1to4(Array.isArray(val) ? val[0] : val)}
                className="py-2 flex-1"
              />
              <span className="text-xs font-bold text-amber-500 w-16">Z5-8: {metrics.percentZone5to8}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border/50">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-blue-600 dark:text-blue-400">Avg. Carrier Cost (Zones 1-4)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.5"
                  value={store.avgCostZone1to4 === 0 ? '' : store.avgCostZone1to4}
                  onChange={(e) => store.setAvgCostZone1to4(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-blue-50 dark:bg-blue-900/20"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-amber-600 dark:text-amber-500">Avg. Carrier Cost (Zones 5-8)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.5"
                  value={store.avgCostZone5to8 === 0 ? '' : store.avgCostZone5to8}
                  onChange={(e) => store.setAvgCostZone5to8(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-amber-50 dark:bg-amber-900/20"
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

        <div className={`${metrics.netShippingProfit >= 0 ? 'bg-blue-600 dark:bg-blue-700' : 'bg-red-600 dark:bg-red-700'} text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-colors duration-500`}>
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <Truck className="h-4 w-4" /> Net Shipping Profit/Loss
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">
              {metrics.netShippingProfit < 0 ? '-' : ''}{currencySymbol}{Math.abs(Math.round(metrics.netShippingProfit)).toLocaleString()}
            </span>
            <span className="text-lg font-medium text-white/80 ml-1">/ mo</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Blended Cost / Order</p>
              <p className="text-2xl font-bold">{currencySymbol}{metrics.blendedShippingCostPerOrder.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Customer Pays</p>
              <p className="text-2xl font-bold">{currencySymbol}{store.flatRateChargeToCustomer.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Total Monthly Cost Breakdown</h4>

          <div className="h-[200px] w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, 'Cost']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-muted-foreground font-medium">Zones 1-4 (Local)</span>
              </div>
              <div className="font-bold">{currencySymbol}{Math.round(metrics.shippingCostZone1to4).toLocaleString()}</div>
            </div>
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-muted-foreground font-medium">Zones 5-8 (Cross-Country)</span>
              </div>
              <div className="font-bold">{currencySymbol}{Math.round(metrics.shippingCostZone5to8).toLocaleString()}</div>
            </div>
          </div>

          {metrics.netShippingProfit < 0 && (
            <div className="bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 p-3 rounded-lg mt-4 text-xs leading-relaxed flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <p>You are actively losing money on shipping. Your flat rate does not cover your blended true cost. Consider increasing your flat rate or offering dynamic calculated rates.</p>
            </div>
          )}
        </div>

        <CalculatorActions
          slug="shipping-zone-optimizer"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Shipping_Zone_Optimization"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<ShippingReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
