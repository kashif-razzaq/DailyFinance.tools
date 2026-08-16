/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useChurnStore } from '@/store/subscription-churn-impact.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Activity, Target, RefreshCw, Users, DollarSign, TrendingUp, CheckCircle2 } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, marginBottom: 20, color: '#4b5563' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottom: '1 solid #e5e7eb' },
  label: { fontSize: 12, color: '#374151' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 20, backgroundColor: '#f3f4f6', paddingHorizontal: 10, borderRadius: 4 },
  highlightLabel: { fontSize: 14, fontWeight: 'bold' },
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#db2777' },
});

const ChurnReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Subscription Churn Impact</Text>
      <Text style={pdfStyles.subtitle}>12-Month Revenue Projection</Text>

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Current Churn Rate:</Text><Text style={pdfStyles.value}>{data.currentChurnRate}%</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Target Churn Rate:</Text><Text style={pdfStyles.value}>{data.targetChurnRate}%</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>New Subs/Month:</Text><Text style={pdfStyles.value}>{data.newSubscribersPerMonth}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>12-Month Extra Revenue (Delta):</Text>
        <Text style={pdfStyles.highlightValue}>+{currencySymbol}{Math.round(data.twelveMonthRevenueDelta).toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Current LTV:</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.currentLTV).toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Target LTV:</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.targetLTV).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useChurnStore()
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
          if (state.currentSubscribers !== undefined) store.setCurrentSubscribers(state.currentSubscribers as number)
          if (state.averageSubscriptionPrice !== undefined) store.setAverageSubscriptionPrice(state.averageSubscriptionPrice as number)
          if (state.newSubscribersPerMonth !== undefined) store.setNewSubscribersPerMonth(state.newSubscribersPerMonth as number)
          if (state.currentChurnRate !== undefined) store.setCurrentChurnRate(state.currentChurnRate as number)
          if (state.targetChurnRate !== undefined) store.setTargetChurnRate(state.targetChurnRate as number)
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
        calculator_slug: 'subscription-churn-impact-simulator',
        category: 'E-Commerce',
        saved_name: `Churn Impact: +${currencySymbol}${Math.round(metrics.twelveMonthRevenueDelta)}`,
        input_state: {
          currentSubscribers: store.currentSubscribers,
          averageSubscriptionPrice: store.averageSubscriptionPrice,
          newSubscribersPerMonth: store.newSubscribersPerMonth,
          currentChurnRate: store.currentChurnRate,
          targetChurnRate: store.targetChurnRate
        },
        core_metric: Math.round(metrics.twelveMonthRevenueDelta)
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
    "Current LTV": `${currencySymbol}${Math.round(metrics.currentLTV)}`,
    "Target LTV": `${currencySymbol}${Math.round(metrics.targetLTV)}`,
    "Current Month 12 MRR": `${currencySymbol}${Math.round(metrics.currentMRRAtMonth12)}`,
    "Target Month 12 MRR": `${currencySymbol}${Math.round(metrics.targetMRRAtMonth12)}`,
    "12-Month Revenue Lift": `${currencySymbol}${Math.round(metrics.twelveMonthRevenueDelta)}`
  }]

  const chartData = metrics.projectedCurrentMRR.map((mrr, index) => ({
    name: `Month ${index + 1}`,
    "Current Trajectory": Math.round(mrr),
    "Target Trajectory": Math.round(metrics.projectedTargetMRR[index])
  }))

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/subscription-churn-impact-simulator?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/subscription-churn-impact-simulator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Users className="h-5 w-5 text-muted-foreground" />
            Baseline Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Current Subscribers</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Users className="h-4 w-4" /></span>
                <Input
                  type="number"
                  value={store.currentSubscribers === 0 ? '' : store.currentSubscribers}
                  onChange={(e) => store.setCurrentSubscribers(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Average Subscription Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="1"
                  value={store.averageSubscriptionPrice === 0 ? '' : store.averageSubscriptionPrice}
                  onChange={(e) => store.setAverageSubscriptionPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/50">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
               <TrendingUp className="h-4 w-4" /> New Subscribers Added Per Month
            </label>
            <div className="relative w-full sm:w-1/2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">+</span>
              <Input
                type="number"
                value={store.newSubscribersPerMonth === 0 ? '' : store.newSubscribersPerMonth}
                onChange={(e) => store.setNewSubscribersPerMonth(e.target.value === '' ? 0 : Number(e.target.value))}
                className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <RefreshCw className="h-5 w-5 text-muted-foreground" />
            Churn Impact Simulator
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold text-foreground">Current Monthly Churn Rate (%)</label>
                <p className="text-[10px] text-muted-foreground mt-1">Percentage of users who cancel each month.</p>
              </div>
              <span className="text-lg font-bold text-red-500">{store.currentChurnRate}%</span>
            </div>
            <Slider
              value={[store.currentChurnRate]}
              max={25} step={0.5}
              onValueChange={(val: any) => store.setCurrentChurnRate(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold text-foreground">Target Monthly Churn Rate (%)</label>
                <p className="text-[10px] text-muted-foreground mt-1">Simulate reducing churn via annual plans or better retention.</p>
              </div>
              <span className="text-lg font-bold text-emerald-500">{store.targetChurnRate}%</span>
            </div>
            <Slider
              value={[store.targetChurnRate]}
              max={25} step={0.5}
              onValueChange={(val: any) => store.setTargetChurnRate(Array.isArray(val) ? val[0] : val)}
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

        <div className="bg-pink-600 dark:bg-pink-700 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <Activity className="h-4 w-4" /> 12-Month Revenue Lift
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">+{currencySymbol}{Math.round(metrics.twelveMonthRevenueDelta).toLocaleString()}</span>
          </div>
          <p className="text-xs text-white/80 mt-2 font-medium relative z-10">
            Extra revenue generated in Year 1 simply by reducing churn.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Current LTV</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.currentLTV)}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Target LTV</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.targetLTV)}</p>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">MRR Trajectory (12 Months)</h4>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#db2777" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#db2777" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tickFormatter={(val) => `${currencySymbol}${val}`} tick={{fontSize: 12}} />
                <Tooltip
                  formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, undefined]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="Current Trajectory" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorCurrent)" />
                <Area type="monotone" dataKey="Target Trajectory" stroke="#db2777" strokeWidth={3} fillOpacity={1} fill="url(#colorTarget)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-1">M12 Current MRR</p>
              <p className="font-bold text-slate-500">{currencySymbol}{Math.round(metrics.currentMRRAtMonth12).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">M12 Target MRR</p>
              <p className="font-bold text-pink-600 dark:text-pink-500">{currencySymbol}{Math.round(metrics.targetMRRAtMonth12).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="subscription-churn-impact-simulator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Subscription_Churn_Impact"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<ChurnReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
