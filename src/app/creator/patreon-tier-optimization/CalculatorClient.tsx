/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { usePatreonStore } from '@/store/patreon-tier-optimization.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Users, Filter, DollarSign, Activity, Settings, CheckCircle2, TrendingUp, AlertCircle, RefreshCw, BarChart } from "lucide-react"
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
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#e11d48' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});

const PatreonReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Patreon Earnings Optimization</Text>
      <Text style={pdfStyles.subtitle}>Revenue & Churn Analysis</Text>

      <View style={{ marginTop: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Gross Monthly Revenue:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.grossMonthlyRevenue).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Patreon Platform Fee ({data.platformFee}):</Text><Text style={pdfStyles.value}>-{currencySymbol}{Math.round(data.patreonFeeAmount).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Payment Processing Fee:</Text><Text style={pdfStyles.value}>-{currencySymbol}{Math.round(data.processingFeeAmount).toLocaleString()}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Net Monthly Revenue (Take-home):</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{Math.round(data.netMonthlyRevenue).toLocaleString()}</Text>
      </View>

      <Text style={pdfStyles.sectionTitle}>Churn Analysis</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Blended Churn Rate:</Text><Text style={pdfStyles.value}>{data.blendedChurnRate.toFixed(1)}%</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Monthly Revenue Lost to Churn:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.monthlyChurnedRevenue).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>ARPU (Avg Revenue Per User):</Text><Text style={pdfStyles.value}>{currencySymbol}{data.averageRevenuePerUser.toFixed(2)}</Text></View>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = usePatreonStore()
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
          if (state.totalAudience !== undefined) store.setTotalAudience(state.totalAudience as number)
          if (state.conversionRate !== undefined) store.setConversionRate(state.conversionRate as number)
          if (state.platformFee) store.setPlatformFee(state.platformFee as any)
          if (state.tiers) {
            const tiers = state.tiers as any[]
            tiers.forEach(t => store.updateTier(t.id, t))
          }
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
        calculator_slug: 'patreon-tier-optimization',
        category: 'Creator Economy',
        saved_name: `Patreon Net: ${currencySymbol}${Math.round(metrics.netMonthlyRevenue)}/mo`,
        input_state: {
          totalAudience: store.totalAudience,
          conversionRate: store.conversionRate,
          platformFee: store.platformFee,
          tiers: store.tiers
        },
        core_metric: Math.round(metrics.netMonthlyRevenue)
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
    "Gross Monthly Revenue": `${currencySymbol}${Math.round(metrics.grossMonthlyRevenue)}`,
    "Net Monthly Revenue": `${currencySymbol}${Math.round(metrics.netMonthlyRevenue)}`,
    "Blended Churn Rate": `${metrics.blendedChurnRate.toFixed(1)}%`,
    "Monthly Churned Revenue": `${currencySymbol}${Math.round(metrics.monthlyChurnedRevenue)}`,
    "ARPU": `${currencySymbol}${metrics.averageRevenuePerUser.toFixed(2)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/creator/patreon-tier-optimization?savedId=${savedScenarioId}`
    : `${baseUrl}/creator/patreon-tier-optimization`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-8">

        {/* Funnel & Audience */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Filter className="h-5 w-5 text-muted-foreground" />
            Audience Funnel
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Total Free Audience</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Users className="h-4 w-4" /></span>
                <Input
                  type="number"
                  value={store.totalAudience === 0 ? '' : store.totalAudience}
                  onChange={(e) => store.setTotalAudience(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  placeholder="e.g. 100000"
                />
              </div>
              <p className="text-xs text-muted-foreground">YouTube, Insta, Email list total.</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Target Conversion Rate (%)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><TrendingUp className="h-4 w-4" /></span>
                <Input
                  type="number" step="0.1"
                  value={store.conversionRate === 0 ? '' : store.conversionRate}
                  onChange={(e) => store.setConversionRate(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-xs text-muted-foreground">Average is 1-3% of core audience.</p>
            </div>
          </div>
        </div>

        {/* Tier Configuration */}
        <div className="space-y-4 flex-1">
          <div className="flex justify-between items-center pb-2 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              Tier Configuration
            </h2>
          </div>

          <div className="space-y-4">
            {store.tiers.map((tier, idx) => (
              <div key={tier.id} className="p-4 bg-muted/30 border border-border/50 rounded-xl space-y-4">
                <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 flex items-center justify-center text-xs">{idx + 1}</div>
                  Tier {idx + 1} Setup
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">{currencySymbol}</span>
                      <Input
                        type="number"
                        value={tier.price === 0 ? '' : tier.price}
                        onChange={(e) => store.updateTier(tier.id, { price: Number(e.target.value) })}
                        className="pl-6 h-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground">Subscribers</label>
                    <Input
                      type="number"
                      value={tier.subscribers === 0 ? '' : tier.subscribers}
                      onChange={(e) => store.updateTier(tier.id, { subscribers: Number(e.target.value) })}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground">Churn Rate (%)</label>
                    <Input
                      type="number"
                      value={tier.churnRate === 0 ? '' : tier.churnRate}
                      onChange={(e) => store.updateTier(tier.id, { churnRate: Number(e.target.value) })}
                      className="h-9"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Fees */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-foreground">Patreon Platform Plan</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'lite', label: 'Lite (5%)' },
              { id: 'pro', label: 'Pro (8%)' },
              { id: 'premium', label: 'Premium (12%)' }
            ].map((plan) => (
              <div
                key={plan.id}
                onClick={() => store.setPlatformFee(plan.id as any)}
                className={`p-3 text-center rounded-xl border cursor-pointer transition-all ${
                  store.platformFee === plan.id
                    ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 font-bold'
                    : 'border-border/60 hover:border-rose-500/50 text-muted-foreground'
                }`}
              >
                <span className="text-sm">{plan.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results & Conversion Sticky Panel */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 relative z-20">

        {/* Success Toast */}
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-emerald-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        {/* The Result Card */}
        <div className="bg-rose-600 dark:bg-rose-700 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            Net Monthly Revenue (Take-Home)
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{currencySymbol}{Math.round(metrics.netMonthlyRevenue).toLocaleString()}</span>
            <span className="text-lg font-medium text-white/80 ml-1">/ mo</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Gross Revenue</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.grossMonthlyRevenue).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">ARPU</p>
              <p className="text-2xl font-bold">{currencySymbol}{metrics.averageRevenuePerUser.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Churn & Health Breakdown */}
        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Subscription Health
          </h4>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground text-sm">Blended Churn Rate</span>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-sm ${metrics.blendedChurnRate > 10 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {metrics.blendedChurnRate.toFixed(1)}%
                </span>
                {metrics.blendedChurnRate > 10 && <AlertCircle className="h-4 w-4 text-red-500" />}
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground text-sm">Monthly Churned Revenue</span>
              <span className="font-bold text-red-500 text-sm">-{currencySymbol}{Math.round(metrics.monthlyChurnedRevenue).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground text-sm">Target vs Actual Subs</span>
              <span className="font-medium text-sm">
                {metrics.actualSubscribers.toLocaleString()} / {Math.round(metrics.projectedSubscribers).toLocaleString()}
              </span>
            </div>

            {metrics.conversionGap > 0 && (
              <div className="bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500 p-3 rounded-lg mt-2 text-xs leading-relaxed">
                You are missing out on <strong>{Math.round(metrics.conversionGap).toLocaleString()}</strong> subscribers based on your target conversion rate. Optimize your top-of-funnel calls to action.
              </div>
            )}
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Platform Fees
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Patreon Plan Fee ({store.platformFee})</span>
              <span>-{currencySymbol}{Math.round(metrics.patreonFeeAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Payment Processing (~{store.paymentProcessingFee}%)</span>
              <span>-{currencySymbol}{Math.round(metrics.processingFeeAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="patreon-tier-optimization"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Patreon_Tier_Optimization"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<PatreonReportPDF data={{...store, ...metrics, platformFee: store.platformFee}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
