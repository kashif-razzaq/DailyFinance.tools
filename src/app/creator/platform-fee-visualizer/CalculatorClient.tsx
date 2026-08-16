/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { usePlatformFeeStore } from '@/store/platform-fee-visualizer.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { DollarSign, Globe, ShoppingCart, PieChart, CheckCircle2, TrendingDown } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, marginBottom: 20, color: '#4b5563' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottom: '1 solid #e5e7eb' },
  label: { fontSize: 12, color: '#374151' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 20, backgroundColor: '#f3f4f6', paddingHorizontal: 10, borderRadius: 4 },
  highlightLabel: { fontSize: 14, fontWeight: 'bold' },
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#6366f1' },
});

const PlatformFeeReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Creator Platform Fee Comparison</Text>
      <Text style={pdfStyles.subtitle}>Revenue Analysis based on {currencySymbol}{data.monthlyRevenue}/mo</Text>

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Average Transaction Size:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.avgTransactionSize}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>International Transactions:</Text><Text style={pdfStyles.value}>{data.percentInternational}%</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Est. Monthly Transactions:</Text><Text style={pdfStyles.value}>{Math.round(data.transactionCount)}</Text></View>
      </View>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Net Revenue by Platform</Text>
      {data.platforms.map((p: any) => (
        <View key={p.name} style={pdfStyles.row}>
          <Text style={pdfStyles.label}>{p.name} ({p.effectiveFeeRate.toFixed(1)}% eff. fee):</Text>
          <Text style={pdfStyles.value}>{currencySymbol}{Math.round(p.netRevenue).toLocaleString()}</Text>
        </View>
      ))}

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Highest Payout Platform:</Text>
        <Text style={pdfStyles.highlightValue}>{data.platforms[0].name} ({currencySymbol}{Math.round(data.platforms[0].netRevenue).toLocaleString()})</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = usePlatformFeeStore()
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
          if (state.monthlyRevenue !== undefined) store.setMonthlyRevenue(state.monthlyRevenue as number)
          if (state.avgTransactionSize !== undefined) store.setAvgTransactionSize(state.avgTransactionSize as number)
          if (state.percentInternational !== undefined) store.setPercentInternational(state.percentInternational as number)
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
        calculator_slug: 'platform-fee-visualizer',
        category: 'Creator Economy',
        saved_name: `Fees on ${currencySymbol}${store.monthlyRevenue}`,
        input_state: {
          monthlyRevenue: store.monthlyRevenue,
          avgTransactionSize: store.avgTransactionSize,
          percentInternational: store.percentInternational
        },
        core_metric: Math.round(metrics.platforms[0].netRevenue)
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

  const exportData = metrics.platforms.map(p => ({
    "Platform": p.name,
    "Gross Revenue": `${currencySymbol}${store.monthlyRevenue}`,
    "Total Fees": `${currencySymbol}${Math.round(p.totalFees)}`,
    "Net Revenue": `${currencySymbol}${Math.round(p.netRevenue)}`,
    "Effective Fee %": `${p.effectiveFeeRate.toFixed(1)}%`
  }))

  const chartData = metrics.platforms.map(p => ({
    name: p.name,
    "Net Revenue": Math.round(p.netRevenue),
    "Total Fees": Math.round(p.totalFees),
    color: p.color
  }))

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/creator/platform-fee-visualizer?savedId=${savedScenarioId}`
    : `${baseUrl}/creator/platform-fee-visualizer`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-4 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            Revenue Profile
          </h2>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Gross Monthly Revenue</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number"
                value={store.monthlyRevenue === 0 ? '' : store.monthlyRevenue}
                onChange={(e) => store.setMonthlyRevenue(e.target.value === '' ? 0 : Number(e.target.value))}
                className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
              />
            </div>
            <p className="text-xs text-muted-foreground">Total money pledged/spent by fans.</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Avg. Transaction Size</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number" step="1"
                value={store.avgTransactionSize === 0 ? '' : store.avgTransactionSize}
                onChange={(e) => store.setAvgTransactionSize(e.target.value === '' ? 0 : Number(e.target.value))}
                className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
              />
            </div>
            <p className="text-xs text-muted-foreground">Very important: Small transactions ($1-$3) get crushed by $0.30 fixed processing fees.</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">International Customers</label>
                <p className="text-xs text-muted-foreground mt-1">Non-US cards trigger higher processing + currency conversion fees.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.percentInternational}%</span>
            </div>
            <Slider
              value={[store.percentInternational]}
              max={100} step={5}
              onValueChange={(val: any) => store.setPercentInternational(Array.isArray(val) ? val[0] : val)}
              className="py-2"
            />
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
          <p className="text-sm text-indigo-800 dark:text-indigo-300 font-medium">
            <ShoppingCart className="h-4 w-4 inline mr-1 mb-0.5" />
            Estimated Transactions: <strong className="text-xl ml-1">{Math.round(metrics.transactionCount)}</strong>
          </p>
        </div>

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-8 space-y-6 lg:sticky lg:top-8 relative z-20">

        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-primary/5 text-emerald-600 border border-primary/20 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 slide-in-from-bottom-8 fade-in duration-300 ease-out">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        {/* Visualizer Chart */}
        <div className="bg-card border shadow-sm rounded-2xl p-6 md:p-8">
          <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-indigo-500" /> Platform Fee Visualizer
          </h4>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} horizontal={false} />
                <XAxis type="number" tickFormatter={(val) => `${currencySymbol}${val}`} />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip
                  formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, undefined]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="Net Revenue" stackId="a" fill="#10b981" radius={[0, 0, 0, 4]} />
                <Bar dataKey="Total Fees" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card border shadow-sm rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-4 px-6 font-bold text-sm text-muted-foreground uppercase tracking-wider">Platform</th>
                  <th className="py-4 px-6 font-bold text-sm text-muted-foreground uppercase tracking-wider">Net Take-Home</th>
                  <th className="py-4 px-6 font-bold text-sm text-muted-foreground uppercase tracking-wider">Total Fees</th>
                  <th className="py-4 px-6 font-bold text-sm text-muted-foreground uppercase tracking-wider">Eff. Fee Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {metrics.platforms.map((p, idx) => (
                  <tr key={p.name} className={`hover:bg-muted/30 transition-colors ${idx === 0 ? 'bg-emerald-50/50 dark:bg-emerald-950/10' : ''}`}>
                    <td className="py-4 px-6 font-semibold flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: p.color}}></div>
                      {p.name}
                    </td>
                    <td className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400">
                      {currencySymbol}{Math.round(p.netRevenue).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 font-medium text-red-500">
                      {currencySymbol}{Math.round(p.totalFees).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {p.effectiveFeeRate.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <CalculatorActions
          slug="platform-fee-visualizer"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Platform_Fee_Comparison"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<PlatformFeeReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
