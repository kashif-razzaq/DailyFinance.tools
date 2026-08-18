/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useCACStore } from '@/store/customer-acquisition-cost.store'
import { Input } from "@/components/ui/input"
import { Users, DollarSign, Activity, Settings, Briefcase, CheckCircle2, Megaphone, PieChart } from "lucide-react"
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
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#8b5cf6' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});

const CACReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Customer Acquisition Cost (CAC) Report</Text>
      <Text style={pdfStyles.subtitle}>Paid vs Blended Acquisition</Text>

      <Text style={pdfStyles.sectionTitle}>Marketing Expenses</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Ad Spend:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.totalAdSpend.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Agency/Contractor Fees:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.totalAgencyFees.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Software Costs:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.totalSoftwareCosts.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Marketing Cost:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.totalMarketingCost.toLocaleString()}</Text></View>
      </View>

      <Text style={pdfStyles.sectionTitle}>Customer Acquisition</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Paid Customers Acquired:</Text><Text style={pdfStyles.value}>{data.totalNewCustomers.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Organic Customers Acquired:</Text><Text style={pdfStyles.value}>{data.totalOrganicCustomers.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Customers:</Text><Text style={pdfStyles.value}>{(data.totalNewCustomers + data.totalOrganicCustomers).toLocaleString()}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Paid CAC (Ad Efficiency):</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{data.paidCAC.toFixed(2)}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Blended CAC (Business Efficiency):</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{data.blendedCAC.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useCACStore()
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
          if (state.totalAdSpend !== undefined) store.setTotalAdSpend(state.totalAdSpend as number)
          if (state.totalAgencyFees !== undefined) store.setTotalAgencyFees(state.totalAgencyFees as number)
          if (state.totalSoftwareCosts !== undefined) store.setTotalSoftwareCosts(state.totalSoftwareCosts as number)
          if (state.totalNewCustomers !== undefined) store.setTotalNewCustomers(state.totalNewCustomers as number)
          if (state.totalOrganicCustomers !== undefined) store.setTotalOrganicCustomers(state.totalOrganicCustomers as number)
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
        calculator_slug: 'customer-acquisition-cost-calculator',
        category: 'E-Commerce',
        saved_name: `CAC Analysis: Blended ${currencySymbol}${metrics.blendedCAC.toFixed(2)}`,
        input_state: {
          totalAdSpend: store.totalAdSpend,
          totalAgencyFees: store.totalAgencyFees,
          totalSoftwareCosts: store.totalSoftwareCosts,
          totalNewCustomers: store.totalNewCustomers,
          totalOrganicCustomers: store.totalOrganicCustomers
        },
        core_metric: metrics.blendedCAC
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
    "Total Ad Spend": `${currencySymbol}${store.totalAdSpend}`,
    "Total Marketing Cost": `${currencySymbol}${metrics.totalMarketingCost}`,
    "Paid Customers": store.totalNewCustomers,
    "Organic Customers": store.totalOrganicCustomers,
    "Paid CAC": `${currencySymbol}${metrics.paidCAC.toFixed(2)}`,
    "Blended CAC": `${currencySymbol}${metrics.blendedCAC.toFixed(2)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/customer-acquisition-cost-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/customer-acquisition-cost-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            Marketing Expenses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Total Ad Spend</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input
                  type="number" step="100"
                  value={store.totalAdSpend === 0 ? '' : store.totalAdSpend}
                  onChange={(e) => store.setTotalAdSpend(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">Direct ad spend on Meta/Google.</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Agency & Contractor Fees</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Briefcase className="h-4 w-4" /></span>
                <Input
                  type="number" step="100"
                  value={store.totalAgencyFees === 0 ? '' : store.totalAgencyFees}
                  onChange={(e) => store.setTotalAgencyFees(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">What you pay people to run the ads or make creative.</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/50">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
               <Settings className="h-4 w-4" /> Software Costs (CRM, Attribution)
            </label>
            <div className="relative w-full sm:w-1/2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
              <Input
                type="number" step="10"
                value={store.totalSoftwareCosts === 0 ? '' : store.totalSoftwareCosts}
                onChange={(e) => store.setTotalSoftwareCosts(e.target.value === '' ? 0 : Number(e.target.value))}
                className="pl-7 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Users className="h-5 w-5 text-muted-foreground" />
            Customer Acquisition
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Paid Customers</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Megaphone className="h-4 w-4" /></span>
                <Input
                  type="number" step="1"
                  value={store.totalNewCustomers === 0 ? '' : store.totalNewCustomers}
                  onChange={(e) => store.setTotalNewCustomers(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">Customers attributed directly to ad spend.</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Organic Customers</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Users className="h-4 w-4" /></span>
                <Input
                  type="number" step="1"
                  value={store.totalOrganicCustomers === 0 ? '' : store.totalOrganicCustomers}
                  onChange={(e) => store.setTotalOrganicCustomers(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">SEO, direct traffic, referrals, word of mouth.</p>
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

        <div className="bg-violet-600 dark:bg-violet-700 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <Activity className="h-4 w-4" /> Blended CAC (True Cost)
          </h3>

          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{currencySymbol}{metrics.blendedCAC.toFixed(2)}</span>
          </div>

          <p className="text-sm font-medium mt-2 text-violet-100 relative z-10">
            The overall cost to acquire a customer when factoring in all marketing expenses and all acquired customers.
          </p>

          <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
            <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Paid CAC (Ad Efficiency)</p>
            <p className="text-2xl font-bold">
              {currencySymbol}{metrics.paidCAC.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Traffic Breakdown</h4>

          <div className="space-y-4">
            <div className="w-full h-4 rounded-full flex overflow-hidden">
              <div style={{width: `${100 - metrics.organicRatio}%`}} className="bg-rose-500 transition-all duration-300" />
              <div style={{width: `${metrics.organicRatio}%`}} className="bg-emerald-500 transition-all duration-300" />
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <span className="text-muted-foreground font-medium">Paid Acquisition</span>
                </div>
                <div className="font-bold">{(100 - metrics.organicRatio).toFixed(1)}%</div>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Organic Acquisition</span>
                </div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400">{metrics.organicRatio.toFixed(1)}%</div>
              </div>
            </div>

            {metrics.organicRatio > 40 && (
              <div className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 p-3 rounded-lg mt-2 text-xs leading-relaxed">
                <CheckCircle2 className="inline h-3 w-3 mr-1 mb-0.5" />
                Strong organic foundation. Your high organic ratio allows you to push Paid CAC higher and scale aggressively while remaining profitable.
              </div>
            )}
          </div>
        </div>

        <CalculatorActions
          slug="customer-acquisition-cost-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="CAC_Analysis"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<CACReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
