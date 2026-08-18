/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useShopifyMarginStore } from '@/store/shopify-margin.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ShoppingBag, Truck, CreditCard, DollarSign, PieChart, CheckCircle2, TrendingUp, Settings } from "lucide-react"
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
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#10b981' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});

const ShopifyReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Shopify Margin & COGS Report</Text>
      <Text style={pdfStyles.subtitle}>Per Order Unit Economics</Text>

      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Retail Price:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.retailPrice.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>COGS:</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.cogs.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Seller Shipping Burden:</Text><Text style={pdfStyles.value}>-{currencySymbol}{(data.customerPaysShipping ? 0 : data.shippingCostToCustomer).toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Shopify Payment Fee:</Text><Text style={pdfStyles.value}>-{currencySymbol}{data.paymentProcessingFee.toFixed(2)}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Net Profit Per Order:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{data.grossProfitPerOrder.toFixed(2)} ({data.grossMarginPercent.toFixed(1)}%)</Text>
      </View>

      <Text style={pdfStyles.sectionTitle}>Monthly Overhead</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Shopify Plan:</Text><Text style={pdfStyles.value}>{data.shopifyPlan.toUpperCase()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>App Subscriptions:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.customAppFees}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Break-Even Orders Required:</Text><Text style={pdfStyles.value}>{Math.ceil(data.breakEvenMonthlyOrders)} orders/mo</Text></View>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useShopifyMarginStore()
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
          if (state.shippingCostToCustomer !== undefined) store.setShippingCostToCustomer(state.shippingCostToCustomer as number)
          if (state.customerPaysShipping !== undefined) store.setCustomerPaysShipping(state.customerPaysShipping as boolean)
          if (state.shopifyPlan !== undefined) store.setShopifyPlan(state.shopifyPlan as any)
          if (state.percentInternational !== undefined) store.setPercentInternational(state.percentInternational as number)
          if (state.customAppFees !== undefined) store.setCustomAppFees(state.customAppFees as number)
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
        calculator_slug: 'shopify-margin-calculator',
        category: 'E-Commerce',
        saved_name: `Shopify Margin: ${metrics.grossMarginPercent.toFixed(1)}%`,
        input_state: {
          retailPrice: store.retailPrice,
          cogs: store.cogs,
          shippingCostToCustomer: store.shippingCostToCustomer,
          customerPaysShipping: store.customerPaysShipping,
          shopifyPlan: store.shopifyPlan,
          percentInternational: store.percentInternational,
          customAppFees: store.customAppFees
        },
        core_metric: metrics.grossMarginPercent
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
    "Shopify Fee": `${currencySymbol}${metrics.paymentProcessingFee.toFixed(2)}`,
    "Net Profit/Order": `${currencySymbol}${metrics.grossProfitPerOrder.toFixed(2)}`,
    "Gross Margin": `${metrics.grossMarginPercent.toFixed(1)}%`,
    "Break-Even Orders": Math.ceil(metrics.breakEvenMonthlyOrders)
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/shopify-margin-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/shopify-margin-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            Product Economics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Retail Sale Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="0.5"
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
                  type="number" step="0.5"
                  value={store.cogs === 0 ? '' : store.cogs}
                  onChange={(e) => store.setCogs(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Truck className="h-4 w-4" /> Shipping & Fulfillment Cost
                </label>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Customer Pays?</span>
                <Switch
                  checked={store.customerPaysShipping}
                  onCheckedChange={store.setCustomerPaysShipping}
                />
              </div>
            </div>
            <div className="relative w-1/2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number" step="0.5"
                value={store.shippingCostToCustomer === 0 ? '' : store.shippingCostToCustomer}
                onChange={(e) => store.setShippingCostToCustomer(e.target.value === '' ? 0 : Number(e.target.value))}
                className={`pl-7 text-lg font-medium transition-colors ${store.customerPaysShipping ? 'bg-muted opacity-50' : 'bg-muted/50 border-border/60'}`}
              />
            </div>
            {store.customerPaysShipping && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Shipping is paid by customer. It does not reduce your margin (but increases processing fee slightly).</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            Shopify Plan & Fees
          </h2>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-foreground">Active Shopify Plan</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'basic', label: 'Basic ($39)' },
                { id: 'shopify', label: 'Shopify ($105)' },
                { id: 'advanced', label: 'Advanced ($399)' }
              ].map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => store.setShopifyPlan(plan.id as any)}
                  className={`p-3 text-center rounded-xl border cursor-pointer transition-all ${
                    store.shopifyPlan === plan.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold'
                      : 'border-border/60 hover:border-emerald-500/50 text-muted-foreground'
                  }`}
                >
                  <span className="text-sm">{plan.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Intl. Transactions (%)</label>
              <Input
                type="number"
                value={store.percentInternational === 0 ? '' : store.percentInternational}
                onChange={(e) => store.setPercentInternational(e.target.value === '' ? 0 : Number(e.target.value))}
                className="text-lg font-medium bg-muted/50"
              />
              <p className="text-[10px] text-muted-foreground">Adds cross-border fee.</p>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2"><Settings className="h-4 w-4"/> Monthly App Fees</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.customAppFees === 0 ? '' : store.customAppFees}
                  onChange={(e) => store.setCustomAppFees(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20">

        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-emerald-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        {/* The Result Card */}
        <div className="bg-emerald-600 dark:bg-emerald-700 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            Net Profit Per Order
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{currencySymbol}{metrics.grossProfitPerOrder.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Gross Margin</p>
              <p className={`text-2xl font-bold ${metrics.grossMarginPercent < 40 ? 'text-red-300' : 'text-emerald-100'}`}>
                {metrics.grossMarginPercent.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Total Cost / Order</p>
              <p className="text-2xl font-bold">{currencySymbol}{metrics.totalCostPerOrder.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Cost Breakdown (Per Order)
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Product COGS</span>
              <span className="font-medium">-{currencySymbol}{store.cogs.toFixed(2)}</span>
            </div>
            {!store.customerPaysShipping && (
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground">Shipping Burden</span>
                <span className="font-medium text-amber-600 dark:text-amber-500">-{currencySymbol}{store.shippingCostToCustomer.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Shopify Payment Fee</span>
              <span className="font-medium text-rose-500">-{currencySymbol}{metrics.paymentProcessingFee.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Monthly Break-Even</h4>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Based on your {store.shopifyPlan} plan and app subscriptions, you must sell this many items just to cover software costs:
            </p>
            <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
              <span className="font-medium">Required Monthly Orders:</span>
              <span className="font-bold text-lg">{Math.ceil(metrics.breakEvenMonthlyOrders)}</span>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="shopify-margin-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Shopify_Margin_Analysis"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<ShopifyReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
