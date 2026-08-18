/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useLoanRunwayStore } from '@/store/business-loan-runway.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Building, DollarSign, Activity, Percent, Calendar, AlertTriangle, TrendingUp, TrendingDown, CheckCircle2 } from "lucide-react"
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
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#10b981' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});

const RunwayReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Business Loan & Runway Report</Text>
      <Text style={pdfStyles.subtitle}>Cash Flow Impact Analysis</Text>

      <Text style={pdfStyles.sectionTitle}>Loan Details</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Loan Amount:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.loanAmount.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Interest Rate:</Text><Text style={pdfStyles.value}>{data.loanInterestRate}% APR</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Term Length:</Text><Text style={pdfStyles.value}>{data.loanTermMonths} months</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Monthly Payment:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.monthlyLoanPayment.toFixed(2)}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Interest to be Paid:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.totalInterestPaid.toFixed(2)}</Text></View>
      </View>

      <Text style={pdfStyles.sectionTitle}>Runway Analysis</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Current Runway (Pre-Loan):</Text><Text style={pdfStyles.value}>{data.runwayMonthsBeforeLoan === 999 ? 'Profitable (Infinite)' : `${data.runwayMonthsBeforeLoan.toFixed(1)} months`}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>New Runway (Post-Loan):</Text><Text style={pdfStyles.value}>{data.runwayMonthsAfterLoan === 999 ? 'Profitable (Infinite)' : `${data.runwayMonthsAfterLoan.toFixed(1)} months`}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Runway Extended By:</Text>
        <Text style={pdfStyles.highlightValue}>{data.runwayExtendedBy > 0 ? `${data.runwayExtendedBy.toFixed(1)} months` : 'N/A'}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useLoanRunwayStore()
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
          if (state.cashOnHand !== undefined) store.setCashOnHand(state.cashOnHand as number)
          if (state.monthlyRevenue !== undefined) store.setMonthlyRevenue(state.monthlyRevenue as number)
          if (state.monthlyExpenses !== undefined) store.setMonthlyExpenses(state.monthlyExpenses as number)
          if (state.loanAmount !== undefined) store.setLoanAmount(state.loanAmount as number)
          if (state.loanInterestRate !== undefined) store.setLoanInterestRate(state.loanInterestRate as number)
          if (state.loanTermMonths !== undefined) store.setLoanTermMonths(state.loanTermMonths as number)
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
        calculator_slug: 'business-loan-runway-calculator',
        category: 'E-Commerce',
        saved_name: `Loan: ${currencySymbol}${store.loanAmount.toLocaleString()}`,
        input_state: {
          cashOnHand: store.cashOnHand,
          monthlyRevenue: store.monthlyRevenue,
          monthlyExpenses: store.monthlyExpenses,
          loanAmount: store.loanAmount,
          loanInterestRate: store.loanInterestRate,
          loanTermMonths: store.loanTermMonths
        },
        core_metric: metrics.runwayMonthsAfterLoan === 999 ? 0 : Math.round(metrics.runwayMonthsAfterLoan)
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
    "Loan Amount": `${currencySymbol}${store.loanAmount}`,
    "Monthly Payment": `${currencySymbol}${metrics.monthlyLoanPayment.toFixed(2)}`,
    "Total Interest": `${currencySymbol}${metrics.totalInterestPaid.toFixed(2)}`,
    "Old Runway": metrics.runwayMonthsBeforeLoan === 999 ? 'Infinite' : `${metrics.runwayMonthsBeforeLoan.toFixed(1)} mo`,
    "New Runway": metrics.runwayMonthsAfterLoan === 999 ? 'Infinite' : `${metrics.runwayMonthsAfterLoan.toFixed(1)} mo`
  }]

  // Generate cash depletion chart data
  const chartData = []
  if (metrics.runwayMonthsBeforeLoan !== 999) {
    let currentCash = store.cashOnHand
    let newCash = store.cashOnHand + store.loanAmount
    for (let i = 0; i <= Math.min(24, Math.ceil(Math.max(metrics.runwayMonthsBeforeLoan, metrics.runwayMonthsAfterLoan))); i++) {
      chartData.push({
        name: `Mo ${i}`,
        "No Loan": Math.max(0, Math.round(currentCash)),
        "With Loan": Math.max(0, Math.round(newCash))
      })
      currentCash -= metrics.monthlyBurnRate
      newCash -= metrics.newMonthlyBurnRate
    }
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/business-loan-runway-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/business-loan-runway-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Activity className="h-5 w-5 text-muted-foreground" />
            Current Financials
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Cash on Hand</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="1000"
                  value={store.cashOnHand === 0 ? '' : store.cashOnHand}
                  onChange={(e) => store.setCashOnHand(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Monthly Revenue</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="1000"
                  value={store.monthlyRevenue === 0 ? '' : store.monthlyRevenue}
                  onChange={(e) => store.setMonthlyRevenue(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Monthly Expenses</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="1000"
                  value={store.monthlyExpenses === 0 ? '' : store.monthlyExpenses}
                  onChange={(e) => store.setMonthlyExpenses(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 font-medium bg-muted/50"
                />
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl flex items-center justify-between ${metrics.monthlyBurnRate > 0 ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'}`}>
            <span className="text-sm font-medium">Current Monthly {metrics.monthlyBurnRate > 0 ? 'Burn Rate' : 'Profit'}:</span>
            <span className="font-bold text-lg">
              {metrics.monthlyBurnRate > 0 ? `-${currencySymbol}` : `+${currencySymbol}`}{Math.abs(metrics.monthlyBurnRate).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Building className="h-5 w-5 text-muted-foreground" />
            Loan Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="5000"
                  value={store.loanAmount === 0 ? '' : store.loanAmount}
                  onChange={(e) => store.setLoanAmount(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Annual Interest Rate (%)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Percent className="h-4 w-4" /></span>
                <Input
                  type="number" step="0.5"
                  value={store.loanInterestRate === 0 ? '' : store.loanInterestRate}
                  onChange={(e) => store.setLoanInterestRate(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-semibold">Loan Term Length (Months)</label>
                <p className="text-xs text-muted-foreground mt-1">Shorter term = higher payment, less total interest.</p>
              </div>
              <span className="text-lg font-bold text-foreground">{store.loanTermMonths} mo</span>
            </div>
            <Slider
              value={[store.loanTermMonths]}
              max={120} min={6} step={6}
              onValueChange={(val: any) => store.setLoanTermMonths(Array.isArray(val) ? val[0] : val)}
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
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        <div className={`${metrics.runwayMonthsBeforeLoan !== 999 ? 'bg-emerald-600 dark:bg-emerald-700' : 'bg-slate-800'} text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-colors duration-500`}>
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Runway Extended By
          </h3>

          {metrics.runwayMonthsBeforeLoan === 999 ? (
            <div className="relative z-10">
              <span className="text-3xl font-black tracking-tighter">Business is Profitable</span>
              <p className="text-sm mt-2 text-slate-300">Runway is theoretically infinite. The loan acts as growth capital, not survival cash.</p>
            </div>
          ) : (
            <div className="flex items-baseline gap-1 relative z-10">
              <span className="text-5xl font-black tracking-tighter">+{metrics.runwayExtendedBy.toFixed(1)}</span>
              <span className="text-xl font-medium text-white/80 ml-1">Months</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/20 relative z-10">
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Old Runway</p>
              <p className="text-2xl font-bold">{metrics.runwayMonthsBeforeLoan === 999 ? '∞' : `${metrics.runwayMonthsBeforeLoan.toFixed(1)} mo`}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">New Runway</p>
              <p className="text-2xl font-bold">{metrics.runwayMonthsAfterLoan === 999 ? '∞' : `${metrics.runwayMonthsAfterLoan.toFixed(1)} mo`}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Loan Servicing Costs</h4>

          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Monthly Loan Payment</span>
              <span className="font-bold text-red-500">-{currencySymbol}{metrics.monthlyLoanPayment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Total Interest Paid</span>
              <span className="font-bold">-{currencySymbol}{metrics.totalInterestPaid.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">New Monthly Burn Rate</span>
              <span className={`font-bold ${metrics.newMonthlyBurnRate > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                {metrics.newMonthlyBurnRate > 0 ? `-${currencySymbol}` : `+${currencySymbol}`}{Math.abs(metrics.newMonthlyBurnRate).toLocaleString()}
              </span>
            </div>
          </div>

          {metrics.runwayMonthsBeforeLoan !== 999 && chartData.length > 0 && (
            <div className="h-[200px] w-full mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-2">Cash Depletion Timeline</p>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWithLoan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNoLoan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                  <XAxis dataKey="name" tick={{fontSize: 10}} />
                  <YAxis tickFormatter={(val) => `${currencySymbol}${val/1000}k`} tick={{fontSize: 10}} />
                  <Tooltip
                    formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, undefined]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="No Loan" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorNoLoan)" />
                  <Area type="monotone" dataKey="With Loan" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorWithLoan)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

        </div>

        <CalculatorActions
          slug="business-loan-runway-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Loan_Runway_Analysis"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<RunwayReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
