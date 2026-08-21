/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useInventoryStore } from '@/store/inventory-reorder.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Box, Truck, ShieldAlert, Activity, CheckCircle2, PackageSearch, TrendingUp } from "lucide-react"
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

const ReorderReportPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Inventory Reorder Point (ROP) Report</Text>
      <Text style={pdfStyles.subtitle}>Stock Out Prevention Analysis</Text>

      <Text style={pdfStyles.sectionTitle}>Demand & Lead Time</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Average Daily Sales:</Text><Text style={pdfStyles.value}>{data.averageDailySales} units</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Standard Lead Time:</Text><Text style={pdfStyles.value}>{data.leadTimeDays} days</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Lead Time Demand:</Text><Text style={pdfStyles.value}>{Math.round(data.leadTimeDemand)} units</Text></View>
      </View>

      <Text style={pdfStyles.sectionTitle}>Safety Stock</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Max Daily Sales (Peak):</Text><Text style={pdfStyles.value}>{data.maxDailySales} units</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Max Lead Time (Delay):</Text><Text style={pdfStyles.value}>{data.maxLeadTimeDays} days</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Safety Stock Units:</Text><Text style={pdfStyles.value}>{Math.round(data.safetyStockUnits)} units</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Reorder Point (ROP):</Text>
        <Text style={pdfStyles.highlightValue}>{Math.round(data.reorderPoint)} units</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Days of Inventory at Reorder:</Text>
        <Text style={pdfStyles.value}>{Math.round(data.daysOfInventoryAtReorder)} days</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useInventoryStore()
  const metrics = store.getDerivedMetrics()
  const { currency } = useGlobalSettingsStore()

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
          if (state.averageDailySales !== undefined) store.setAverageDailySales(state.averageDailySales as number)
          if (state.leadTimeDays !== undefined) store.setLeadTimeDays(state.leadTimeDays as number)
          if (state.safetyStockDays !== undefined) store.setSafetyStockDays(state.safetyStockDays as number)
          if (state.maxLeadTimeDays !== undefined) store.setMaxLeadTimeDays(state.maxLeadTimeDays as number)
          if (state.maxDailySales !== undefined) store.setMaxDailySales(state.maxDailySales as number)
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
        calculator_slug: 'inventory-reorder-point-calculator',
        category: 'E-Commerce',
        saved_name: `ROP: ${Math.round(metrics.reorderPoint)} units`,
        input_state: {
          averageDailySales: store.averageDailySales,
          leadTimeDays: store.leadTimeDays,
          safetyStockDays: store.safetyStockDays,
          maxLeadTimeDays: store.maxLeadTimeDays,
          maxDailySales: store.maxDailySales
        },
        core_metric: Math.round(metrics.reorderPoint)
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
    "Avg Daily Sales": store.averageDailySales,
    "Lead Time (Days)": store.leadTimeDays,
    "Lead Time Demand": Math.round(metrics.leadTimeDemand),
    "Safety Stock": Math.round(metrics.safetyStockUnits),
    "Reorder Point": Math.round(metrics.reorderPoint),
    "Buffer Days": Math.round(metrics.daysOfInventoryAtReorder)
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/ecommerce/inventory-reorder-point-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/ecommerce/inventory-reorder-point-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Activity className="h-5 w-5 text-muted-foreground" />
            Standard Baseline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Average Daily Sales</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Box className="h-4 w-4" /></span>
                <Input
                  type="number" step="1"
                  value={store.averageDailySales === 0 ? '' : store.averageDailySales}
                  onChange={(e) => store.setAverageDailySales(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">Units sold on a normal day.</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Supplier Lead Time (Days)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Truck className="h-4 w-4" /></span>
                <Input
                  type="number" step="1"
                  value={store.leadTimeDays === 0 ? '' : store.leadTimeDays}
                  onChange={(e) => store.setLeadTimeDays(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">From PO submission to warehouse arrival.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
            Worst-Case Scenario (Safety Stock)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Max Daily Sales (Peak)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><TrendingUp className="h-4 w-4 text-amber-500" /></span>
                <Input
                  type="number" step="1"
                  value={store.maxDailySales === 0 ? '' : store.maxDailySales}
                  onChange={(e) => store.setMaxDailySales(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-amber-50/30 border-amber-200 focus:border-amber-400"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">Units sold during BFCM or viral spike.</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Max Lead Time (Delay)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><ShieldAlert className="h-4 w-4 text-amber-500" /></span>
                <Input
                  type="number" step="1"
                  value={store.maxLeadTimeDays === 0 ? '' : store.maxLeadTimeDays}
                  onChange={(e) => store.setMaxLeadTimeDays(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-amber-50/30 border-amber-200 focus:border-amber-400"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">Worst customs hold or supplier delay.</p>
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

        <div className="bg-amber-500 dark:bg-amber-600 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <PackageSearch className="h-4 w-4" /> Reorder Point (ROP)
          </h3>

          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{Math.round(metrics.reorderPoint).toLocaleString()}</span>
            <span className="text-xl font-medium text-white/80">units</span>
          </div>

          <p className="text-sm font-medium mt-2 text-amber-50">
            Submit a new PO when your warehouse stock drops to this number.
          </p>

          <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
            <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Days of Inventory at Reorder</p>
            <p className="text-2xl font-bold">
              {Math.round(metrics.daysOfInventoryAtReorder)} Days
            </p>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Stock Breakdown</h4>

          <div className="space-y-4">
            <div className="w-full h-4 rounded-full flex overflow-hidden">
              <div style={{width: `${(metrics.leadTimeDemand / metrics.reorderPoint) * 100}%`}} className="bg-blue-500 transition-all duration-300" />
              <div style={{width: `${(metrics.safetyStockUnits / metrics.reorderPoint) * 100}%`}} className="bg-amber-500 transition-all duration-300" />
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-muted-foreground font-medium">Lead Time Demand</span>
                </div>
                <div className="font-bold">{Math.round(metrics.leadTimeDemand).toLocaleString()}</div>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-amber-600 dark:text-amber-500 font-bold">Safety Stock</span>
                </div>
                <div className="font-bold text-amber-600 dark:text-amber-500">{Math.round(metrics.safetyStockUnits).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="inventory-reorder-point-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Inventory_Reorder_Point"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<ReorderReportPDF data={{...store, ...metrics}} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
