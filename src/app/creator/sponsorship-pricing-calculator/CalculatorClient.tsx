/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useSponsorshipPricingStore } from '@/store/sponsorship-pricing.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Users, TrendingUp, Briefcase, Camera, CheckCircle2, PieChart, Lock, Shield, Award, Calendar } from "lucide-react"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Simple PDF template for Sponsorship Rate Report
const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, marginBottom: 20, color: '#4b5563' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottom: '1 solid #e5e7eb' },
  label: { fontSize: 12, color: '#374151' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 20, backgroundColor: '#f3f4f6', paddingHorizontal: 10, borderRadius: 4 },
  highlightLabel: { fontSize: 14, fontWeight: 'bold' },
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#059669' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});

const SponsorshipReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Sponsorship Pricing Report</Text>
      <Text style={pdfStyles.subtitle}>Data-Driven Rate Card Calculation</Text>

      <Text style={pdfStyles.sectionTitle}>Input Parameters</Text>
      <View style={{ marginBottom: 10 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Platform:</Text><Text style={pdfStyles.value}>{data.platform.toUpperCase()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Audience Size:</Text><Text style={pdfStyles.value}>{data.audienceSize.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Engagement Rate:</Text><Text style={pdfStyles.value}>{data.engagementRate}%</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Niche:</Text><Text style={pdfStyles.value}>{data.niche.toUpperCase()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Deliverable:</Text><Text style={pdfStyles.value}>{data.deliverableType.toUpperCase()}</Text></View>
      </View>

      <Text style={pdfStyles.sectionTitle}>Pricing Breakdown</Text>
      <View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Base Rate (CPM based):</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.baseRate).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Engagement Premium:</Text><Text style={pdfStyles.value}>+{currencySymbol}{Math.round(data.engagementPremium).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Usage Rights ({data.usageRights}mo):</Text><Text style={pdfStyles.value}>+{currencySymbol}{Math.round(data.usageRightsFee).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Exclusivity ({data.exclusivity}mo):</Text><Text style={pdfStyles.value}>+{currencySymbol}{Math.round(data.exclusivityFee).toLocaleString()}</Text></View>
      </View>

      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Recommended Rate:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{Math.round(data.recommendedRate).toLocaleString()}</Text>
      </View>
      <View style={pdfStyles.row}>
        <Text style={pdfStyles.label}>Negotiation Range:</Text>
        <Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.negotiationRange[0]).toLocaleString()} - {currencySymbol}{Math.round(data.negotiationRange[1]).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useSponsorshipPricingStore()
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
          if (state.platform) store.setPlatform(state.platform as any)
          if (state.audienceSize !== undefined) store.setAudienceSize(state.audienceSize as number)
          if (state.engagementRate !== undefined) store.setEngagementRate(state.engagementRate as number)
          if (state.niche) store.setNiche(state.niche as any)
          if (state.deliverableType) store.setDeliverableType(state.deliverableType as any)
          if (state.usageRights !== undefined) store.setUsageRights(state.usageRights as number)
          if (state.exclusivity !== undefined) store.setExclusivity(state.exclusivity as number)
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
        calculator_slug: 'sponsorship-pricing-calculator',
        category: 'Creator Economy',
        saved_name: `${store.platform} Sponsor: ${currencySymbol}${Math.round(metrics.recommendedRate)}`,
        input_state: {
          platform: store.platform,
          audienceSize: store.audienceSize,
          engagementRate: store.engagementRate,
          niche: store.niche,
          deliverableType: store.deliverableType,
          usageRights: store.usageRights,
          exclusivity: store.exclusivity
        },
        core_metric: Math.round(metrics.recommendedRate)
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
    "Platform": store.platform,
    "Audience Size": store.audienceSize,
    "Engagement Rate": `${store.engagementRate}%`,
    "Niche": store.niche,
    "Deliverable Type": store.deliverableType,
    "Base Rate": `${currencySymbol}${Math.round(metrics.baseRate)}`,
    "Usage Rights Fee": `${currencySymbol}${Math.round(metrics.usageRightsFee)}`,
    "Exclusivity Fee": `${currencySymbol}${Math.round(metrics.exclusivityFee)}`,
    "Recommended Rate": `${currencySymbol}${Math.round(metrics.recommendedRate)}`
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId
    ? `${baseUrl}/creator/sponsorship-pricing-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/creator/sponsorship-pricing-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full space-y-10">

        {/* Core Metrics */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Camera className="h-5 w-5 text-muted-foreground" />
            Core Audience Metrics
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'youtube', label: 'YouTube' },
              { id: 'instagram', label: 'Instagram' },
              { id: 'tiktok', label: 'TikTok' },
              { id: 'newsletter', label: 'Newsletter' },
              { id: 'podcast', label: 'Podcast' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => store.setPlatform(p.id as any)}
                className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${
                  store.platform === p.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-transparent text-muted-foreground hover:bg-muted/50 border-border/60'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Average Audience Size</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><Users className="h-4 w-4" /></span>
                <Input
                  type="number"
                  value={store.audienceSize === 0 ? '' : store.audienceSize}
                  onChange={(e) => store.setAudienceSize(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  placeholder="e.g. 50000"
                />
              </div>
              <p className="text-xs text-muted-foreground">Subscribers, avg views, or opens.</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Avg. Engagement Rate (%)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold"><TrendingUp className="h-4 w-4" /></span>
                <Input
                  type="number" step="0.1"
                  value={store.engagementRate === 0 ? '' : store.engagementRate}
                  onChange={(e) => store.setEngagementRate(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-9 text-lg font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-xs text-muted-foreground">Likes/comments vs total views.</p>
            </div>
          </div>
        </div>

        {/* Campaign Specifics */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            Campaign Specifics
          </h2>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Content Niche</label>
            <div className="flex flex-wrap gap-2">
              {['finance', 'tech', 'education', 'lifestyle', 'gaming', 'other'].map((n) => (
                <button
                  key={n}
                  onClick={() => store.setNiche(n as any)}
                  className={`py-1.5 px-3 text-xs font-medium rounded-full border capitalize transition-all ${
                    store.niche === n
                      ? 'bg-accent text-white border-accent'
                      : 'bg-transparent text-muted-foreground hover:bg-muted border-border/60'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <label className="text-sm font-semibold text-foreground">Deliverable Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'dedicated', label: 'Dedicated', desc: 'Full content about sponsor' },
                { id: 'integrated', label: 'Integrated', desc: '60-90s mid-roll read' },
                { id: 'shoutout', label: 'Shoutout', desc: '15-30s quick mention' }
              ].map((d) => (
                <div
                  key={d.id}
                  onClick={() => store.setDeliverableType(d.id as any)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    store.deliverableType === d.id
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border/60 hover:border-primary/50'
                  }`}
                >
                  <p className="text-sm font-bold capitalize">{d.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rights & Licensing */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b">
            <Shield className="h-5 w-5 text-muted-foreground" />
            Licensing & Rights (Premium add-ons)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold">Usage Rights (Months)</label>
                  <p className="text-xs text-muted-foreground mt-1">Brand runs content as Paid Ads.</p>
                </div>
                <span className="text-lg font-bold text-foreground">{store.usageRights} mo</span>
              </div>
              <Slider
                value={[store.usageRights]}
                max={12} step={1}
                onValueChange={(val: any) => store.setUsageRights(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold">Exclusivity (Months)</label>
                  <p className="text-xs text-muted-foreground mt-1">You can't work with competitors.</p>
                </div>
                <span className="text-lg font-bold text-foreground">{store.exclusivity} mo</span>
              </div>
              <Slider
                value={[store.exclusivity]}
                max={12} step={1}
                onValueChange={(val: any) => store.setExclusivity(Array.isArray(val) ? val[0] : val)}
                className="py-2"
              />
            </div>
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
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10 flex items-center gap-2">
            <Award className="h-4 w-4" /> Recommended Rate
          </h3>

          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-5xl font-black tracking-tighter">{currencySymbol}{Math.round(metrics.recommendedRate).toLocaleString()}</span>
          </div>

          <div className="mt-6 pt-6 border-t border-primary-foreground/20 relative z-10">
            <p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Negotiation Range (Floor to Premium)</p>
            <p className="text-xl font-medium">
              {currencySymbol}{Math.round(metrics.negotiationRange[0]).toLocaleString()} - {currencySymbol}{Math.round(metrics.negotiationRange[1]).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-card border shadow-sm rounded-2xl p-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Price Breakdown
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Base Rate (CPM)</span>
              <span className="font-medium">{currencySymbol}{Math.round(metrics.baseRate).toLocaleString()}</span>
            </div>

            {(metrics.nicheMultiplier !== 1 || metrics.deliverableMultiplier !== 1) && (
              <div className="flex justify-between items-center py-2 border-b border-border/50 text-emerald-600 dark:text-emerald-400">
                <span>Content/Niche Multiplier</span>
                <span>x {(metrics.nicheMultiplier * metrics.deliverableMultiplier).toFixed(2)}</span>
              </div>
            )}

            {metrics.engagementPremium > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-border/50 text-indigo-600 dark:text-indigo-400">
                <span>High Engagement Premium</span>
                <span>+{currencySymbol}{Math.round(metrics.engagementPremium).toLocaleString()}</span>
              </div>
            )}

            {metrics.usageRightsFee > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-border/50 text-amber-600 dark:text-amber-500">
                <span>Usage Rights ({store.usageRights}mo)</span>
                <span>+{currencySymbol}{Math.round(metrics.usageRightsFee).toLocaleString()}</span>
              </div>
            )}

            {metrics.exclusivityFee > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-border/50 text-rose-600 dark:text-rose-500">
                <span>Exclusivity ({store.exclusivity}mo)</span>
                <span>+{currencySymbol}{Math.round(metrics.exclusivityFee).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <CalculatorActions
          slug="sponsorship-pricing-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="Sponsorship_Rate_Estimate"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<SponsorshipReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

    </div>
  )
}
