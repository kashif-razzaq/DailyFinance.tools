/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useSubstackStore } from '@/store/substack-growth-predictor.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Users, TrendingUp, DollarSign, PenTool, RefreshCw, Calendar, CheckCircle2 } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#ff6719' },
});

const SubstackReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Substack 12-Month Growth Projection</Text>
      <Text style={pdfStyles.subtitle}>Revenue & Subscriber Forecast</Text>

      <View style={{ marginTop: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Starting Free Subscribers:</Text><Text style={pdfStyles.value}>{data.currentFreeSubscribers.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>MoM Growth Rate:</Text><Text style={pdfStyles.value}>{data.monthlyGrowthRate}%</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Free-to-Paid Conversion:</Text><Text style={pdfStyles.value}>{data.freeToPaidConversionRate}%</Text></View>
      </View>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>End of Year 1 Projections</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Free Subscribers:</Text><Text style={pdfStyles.value}>{data.yearOneTotalSubscribers.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Paid Subscribers:</Text><Text style={pdfStyles.value}>{data.yearOnePaidSubscribers.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Month 12 MRR (Net):</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.months[11].totalNetRevenue).toLocaleString()}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Total Year 1 Net Revenue:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{Math.round(data.yearOneRevenue).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useSubstackStore()
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
          if (state.currentFreeSubscribers !== undefined) store.setCurrentFreeSubscribers(state.currentFreeSubscribers as number)
          if (state.monthlyGrowthRate !== undefined) store.setMonthlyGrowthRate(state.monthlyGrowthRate as number)
          if (state.freeToPaidConversionRate !== undefined) store.setFreeToPaidConversionRate(state.freeToPaidConversionRate as number)
          if (state.monthlySubscriptionPrice !== undefined) store.setMonthlySubscriptionPrice(state.monthlySubscriptionPrice as number)
          if (state.annualSubscriptionPrice !== undefined) store.setAnnualSubscriptionPrice(state.annualSubscriptionPrice as number)
          if (state.percentChoosingAnnual !== undefined) store.setPercentChoosingAnnual(state.percentChoosingAnnual as number)
          if (state.monthlyChurnRate !== undefined) store.setMonthlyChurnRate(state.monthlyChurnRate as number)
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
        calculator_slug: 'substack-growth-predictor',
        category: 'Creator Economy',
        saved_name: `Substack: ${currencySymbol}${Math.round(metrics.yearOneRevenue)} Y1`,
        input_state: {
          currentFreeSubscribers: store.currentFreeSubscribers,
          monthlyGrowthRate: store.monthlyGrowthRate,
          freeToPaidConversionRate: store.freeToPaidConversionRate,
          monthlySubscriptionPrice: store.monthlySubscriptionPrice,
          annualSubscriptionPrice: store.annualSubscriptionPrice,
          percentChoosingAnnual: store.percentChoosingAnnual,
          monthlyChurnRate: store.monthlyChurnRate
        },
        core_metric: Math.round(metrics.yearOneRevenue)
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

  const exportData = metrics.months.map(m => ({
    "Month": `Month ${m.month}`,
    "Free Subs": m.freeSubscribers,
    "Paid Subs": m.paidSubscribers,
    "Net MRR": `${currencySymbol}${Math.round(m.totalNetRevenue)}`
  }))

  const chartData = metrics.months.map(m => ({
    name: `M${m.month}`,
    "Net MRR": Math.round(m.totalNetRevenue),
    "Paid Subs": m.paidSubscribers
  }))

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/creator/substack-growth-predictor-simulator?savedId=${savedScenarioId}`
    : `${baseUrl}/creator/substack-growth-predictor-simulator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Users className="h-5 w-5 text-muted-foreground" />
            Audience & Growth
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Current Free Subscribers</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><PenTool className="h-4 w-4" /></span>
                <Input
                  type="number"
                  value={store.currentFreeSubscribers === 0 ? '' : store.currentFreeSubscribers}
                  onChange={(e) => store.setCurrentFreeSubscribers(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">MoM Growth Rate (%)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><TrendingUp className="h-4 w-4" /></span>
                <Input
                  type="number" step="0.1"
                  value={store.monthlyGrowthRate === 0 ? '' : store.monthlyGrowthRate}
                  onChange={(e) => store.setMonthlyGrowthRate(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Free-to-Paid Conversion Rate (%)</label>
                <p className="text-xs text-muted-foreground mt-1">Average Substack conversion is 4-10%.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.freeToPaidConversionRate}%</span>
            </div>
            <Slider
              value={[store.freeToPaidConversionRate]}
              max={20} step={0.5}
              onValueChange={(val: any) => store.setFreeToPaidConversionRate(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            Pricing & Churn
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Monthly Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.monthlySubscriptionPrice === 0 ? '' : store.monthlySubscriptionPrice}
                  onChange={(e) => store.setMonthlySubscriptionPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Annual Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number"
                  value={store.annualSubscriptionPrice === 0 ? '' : store.annualSubscriptionPrice}
                  onChange={(e) => store.setAnnualSubscriptionPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold text-foreground">Annual Plan Uptake</label>
                </div>
                <span className="text-sm font-bold text-foreground">{store.percentChoosingAnnual}%</span>
              </div>
              <Slider
                value={[store.percentChoosingAnnual]}
                max={100} step={5}
                onValueChange={(val: any) => store.setPercentChoosingAnnual(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold text-foreground flex items-center gap-1"><RefreshCw className="h-3 w-3" /> Monthly Churn</label>
                </div>
                <span className="text-sm font-bold text-foreground">{store.monthlyChurnRate}%</span>
              </div>
              <Slider
                value={[store.monthlyChurnRate]}
                max={20} step={0.5}
                onValueChange={(val: any) => store.setMonthlyChurnRate(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
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

        <div className="bg-[#ff6719] text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Year 1 Net Revenue
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{currencySymbol}{Math.round(metrics.yearOneRevenue).toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">M12 Paid Subs</p>
              <p className="text-2xl font-bold">{metrics.yearOnePaidSubscribers.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">M12 Net MRR</p>
              <p className="text-2xl font-bold">{currencySymbol}{Math.round(metrics.months[11].totalNetRevenue).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">12-Month MRR Trajectory</h4>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6719" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff6719" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tickFormatter={(val) => `${currencySymbol}${val}`} tick={{fontSize: 12}} />
                <Tooltip
                  formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, 'Net MRR']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="Net MRR" stroke="#ff6719" strokeWidth={3} fillOpacity={1} fill="url(#colorMrr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-center text-muted-foreground mt-4">
            Assumes Substack's 10% fee + 3% Stripe processing fee.
          </div>
        </div>

        <CalculatorActions
          slug="substack-growth-predictor"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Substack_Growth_Projection"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<SubstackReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
