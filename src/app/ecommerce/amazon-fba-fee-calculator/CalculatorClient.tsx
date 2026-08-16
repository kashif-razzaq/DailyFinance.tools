/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useFBAStore } from '@/store/amazon-fba-fee.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ShoppingCart, Truck, Package, Box, DollarSign, PieChart, CheckCircle2, AlertTriangle } from "lucide-react"
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
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#f59e0b' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});

const FBAReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Amazon FBA Fee Analysis</Text>
      <Text style={pdfStyles.subtitle}>Per Unit Profitability Breakdown</Text>

      <Text style={pdfStyles.sectionTitle}>Product Costs</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Retail Price:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.retailPrice.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Manufacturing Cost:</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.manufacturingCost.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Inbound Shipping:</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.inboundShippingCost.toFixed(2)}</Text></View>
      </View>

      <Text style={pdfStyles.sectionTitle}>Amazon FBA Deductions</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Referral Fee (15-17%):</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.referralFee.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>FBA Fulfillment Fee:</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.fulfillmentFee.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Storage Fee ({data.storageMonths} months):</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.storageFee.toFixed(2)}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Net Profit Per Unit:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{data.netProfit.toFixed(2)}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Gross Margin:</Text>
        <Text style={pdfStyles.value}>{data.marginPercent.toFixed(1)}%</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Return on Investment (ROI):</Text>
        <Text style={pdfStyles.value}>{data.roiPercent.toFixed(1)}%</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useFBAStore()
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
          if (state.manufacturingCost !== undefined) store.setManufacturingCost(state.manufacturingCost as number)
          if (state.inboundShippingCost !== undefined) store.setInboundShippingCost(state.inboundShippingCost as number)
          if (state.itemWeightLbs !== undefined) store.setItemWeightLbs(state.itemWeightLbs as number)
          if (state.isApparel !== undefined) store.setIsApparel(state.isApparel as boolean)
          if (state.isDangerousGoods !== undefined) store.setIsDangerousGoods(state.isDangerousGoods as boolean)
          if (state.storageMonths !== undefined) store.setStorageMonths(state.storageMonths as number)
          if (state.tier !== undefined) store.setTier(state.tier as any)
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
        calculator_slug: 'amazon-fba-fee-calculator',
        category: 'E-Commerce',
        saved_name: `FBA Profit: ${currencySymbol}${metrics.netProfit.toFixed(2)}/unit`,
        input_state: {
          retailPrice: store.retailPrice,
          manufacturingCost: store.manufacturingCost,
          inboundShippingCost: store.inboundShippingCost,
          itemWeightLbs: store.itemWeightLbs,
          isApparel: store.isApparel,
          isDangerousGoods: store.isDangerousGoods,
          storageMonths: store.storageMonths,
          tier: store.tier
        },
        core_metric: metrics.netProfit
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
    "Retail Price": `${currencySymbol}${store.retailPrice.toFixed(2)}`,
    "Total FBA Fees": `${currencySymbol}${metrics.totalFBAFees.toFixed(2)}`,
    "Manufacturing & Shipping": `${currencySymbol}${(store.manufacturingCost + store.inboundShippingCost).toFixed(2)}`,
    "Net Profit": `${currencySymbol}${metrics.netProfit.toFixed(2)}`,
    "Margin %": `${metrics.marginPercent.toFixed(1)}%`,
    "ROI %": `${metrics.roiPercent.toFixed(1)}%`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/amazon-fba-fee-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/amazon-fba-fee-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            Pricing & Sourcing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Retail Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="1"
                  value={store.retailPrice === 0 ? '' : store.retailPrice}
                  onChange={(e) => store.setRetailPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Manufacturing Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.5"
                  value={store.manufacturingCost === 0 ? '' : store.manufacturingCost}
                  onChange={(e) => store.setManufacturingCost(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Inbound Shipping / Unit</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.5"
                  value={store.inboundShippingCost === 0 ? '' : store.inboundShippingCost}
                  onChange={(e) => store.setInboundShippingCost(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Package className="h-5 w-5 text-muted-foreground" />
            FBA Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-foreground">Size Tier</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'small_standard', label: 'Small Standard' },
                  { id: 'large_standard', label: 'Large Standard' },
                  { id: 'large_bulky', label: 'Large Bulky' }
                ].map((t) => (
                  <div
                    key={t.id}
                    onClick={() => store.setTier(t.id as any)}
                    className={`p-2 text-center rounded-lg border cursor-pointer transition-all ${
                      store.tier === t.id
                        ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-bold'
                        : 'border-border/60 hover:border-amber-500/50 text-muted-foreground'
                    }`}
                  >
                    <span className="text-sm">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Item Weight (lbs)</label>
                <Input
                  type="number" step="0.5"
                  value={store.itemWeightLbs === 0 ? '' : store.itemWeightLbs}
                  onChange={(e) => store.setItemWeightLbs(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="font-medium bg-muted/50"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                <span className="text-sm font-medium">Is Apparel/Clothing?</span>
                <Switch checked={store.isApparel} onCheckedChange={store.setIsApparel} />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                <span className="text-sm font-medium">Dangerous Goods (Hazmat)?</span>
                <Switch checked={store.isDangerousGoods} onCheckedChange={store.setIsDangerousGoods} />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Estimated Storage Time (Months)</label>
                <p className="text-xs text-muted-foreground mt-1">How long the item sits in an Amazon warehouse before selling.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.storageMonths} mo</span>
            </div>
            <Slider
              value={[store.storageMonths]}
              max={12} step={1}
              onValueChange={(val: any) => store.setStorageMonths(Array.isArray(val) ? val[0] : val)}
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

        <div className="bg-amber-600 dark:bg-amber-700 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            Net Profit Per Unit
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{currencySymbol}{metrics.netProfit.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Gross Margin</p>
              <p className={`text-2xl font-bold ${metrics.marginPercent < 25 ? 'text-red-300' : 'text-emerald-300'}`}>
                {metrics.marginPercent.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">ROI</p>
              <p className="text-2xl font-bold">{metrics.roiPercent.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Amazon FBA Fee Breakdown
          </h4>

          <div className="space-y-4">
            <div className="w-full h-4 rounded-full flex overflow-hidden">
              <div style={{width: `${(metrics.referralFee / store.retailPrice) * 100}%`}} className="bg-orange-500 transition-all duration-300" />
              <div style={{width: `${(metrics.fulfillmentFee / store.retailPrice) * 100}%`}} className="bg-amber-500 transition-all duration-300" />
              <div style={{width: `${(metrics.storageFee / store.retailPrice) * 100}%`}} className="bg-yellow-400 transition-all duration-300" />
              <div style={{width: `${((store.manufacturingCost + store.inboundShippingCost) / store.retailPrice) * 100}%`}} className="bg-slate-400 dark:bg-slate-600 transition-all duration-300" />
              <div style={{width: `${(metrics.netProfit / store.retailPrice) * 100}%`}} className="bg-emerald-500 transition-all duration-300" />
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-muted-foreground font-medium">Referral Fee (Amazon Cut)</span>
                </div>
                <div className="font-bold text-orange-600 dark:text-orange-500">-{currencySymbol}{metrics.referralFee.toFixed(2)}</div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-muted-foreground font-medium">Fulfillment Fee (Pick & Pack)</span>
                </div>
                <div className="font-bold text-amber-600 dark:text-amber-500">-{currencySymbol}{metrics.fulfillmentFee.toFixed(2)}</div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="text-muted-foreground font-medium">Storage Fee ({store.storageMonths} mo)</span>
                </div>
                <div className="font-bold text-yellow-600 dark:text-yellow-500">-{currencySymbol}{metrics.storageFee.toFixed(2)}</div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                  <span className="text-muted-foreground font-medium">COGS & Freight</span>
                </div>
                <div className="font-bold">-{currencySymbol}{(store.manufacturingCost + store.inboundShippingCost).toFixed(2)}</div>
              </div>
            </div>

            {metrics.marginPercent < 20 && (
              <div className="bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 p-3 rounded-lg mt-2 text-xs leading-relaxed flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <p>Warning: Your margin is very low. After PPC advertising costs (ACOS), this product is highly likely to lose money.</p>
              </div>
            )}
          </div>
        </div>

        <CalculatorActions
          slug="amazon-fba-fee-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="FBA_Profitability_Analysis"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<FBAReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
