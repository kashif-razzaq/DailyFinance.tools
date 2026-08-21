'use client'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import React, { useState, useEffect } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { useEstimatedTaxesStore, US_STATES } from '@/store/estimated-taxes.store'
import { Input } from "@/components/ui/input"
import { CheckCircle2, ChevronDown, Activity, DollarSign, ArrowRight, ShieldCheck } from "lucide-react"
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, marginBottom: 10, color: '#4b5563' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottom: '1 solid #e5e7eb' },
  label: { fontSize: 12, color: '#374151' },
  value: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 20, backgroundColor: '#f3f4f6', paddingHorizontal: 10, borderRadius: 4 },
  highlightLabel: { fontSize: 14, fontWeight: 'bold' },
  highlightValue: { fontSize: 16, fontWeight: 'bold', color: '#059669' }
});

const TaxReportPDF = ({ data, currencySymbol }: { data: any, currencySymbol: string }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Quarterly Estimated Taxes Report</Text>
      <Text style={pdfStyles.subtitle}>IRS 1099 Freelancer Tax Estimation</Text>
      <View style={{ marginTop: 20 }}>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Total Income:</Text><Text style={pdfStyles.value}>{currencySymbol}{data.totalIncome.toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Self-Employment Tax:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.totalSETax).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Federal Income Tax:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.federalIncomeTax).toLocaleString()}</Text></View>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>State Income Tax:</Text><Text style={pdfStyles.value}>{currencySymbol}{Math.round(data.stateIncomeTax).toLocaleString()}</Text></View>
      </View>
      <View style={pdfStyles.highlightRow}>
        <Text style={pdfStyles.highlightLabel}>Total Quarterly Payment Due:</Text>
        <Text style={pdfStyles.highlightValue}>{currencySymbol}{Math.round(data.quarterlyFederalPayment + data.quarterlyStatePayment).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
)

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useEstimatedTaxesStore()
  const metrics = store.getDerivedMetrics()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'
  
  const [showProModal, setShowProModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)
  
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlSavedId = urlParams.get('savedId')
    if (urlSavedId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.w2Income !== undefined) store.setW2Income(state.w2Income as number)
          if (state.freelanceIncome !== undefined) store.setFreelanceIncome(state.freelanceIncome as number)
          if (state.businessDeductions !== undefined) store.setBusinessDeductions(state.businessDeductions as number)
          if (state.filingStatus !== undefined) store.setFilingStatus(state.filingStatus as string)
          if (state.stateName !== undefined) store.setStateName(state.stateName as string)
          if (state.federalWithheld !== undefined) store.setFederalWithheld(state.federalWithheld as number)
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
        calculator_slug: 'freelance/quarterly-estimated-tax-calculator',
        category: 'Freelance & Business',
        saved_name: `Estimated Taxes: ${currencySymbol}${(metrics.quarterlyFederalPayment + metrics.quarterlyStatePayment).toLocaleString()}/qtr`,
        input_state: {
          w2Income: store.w2Income,
          freelanceIncome: store.freelanceIncome,
          businessDeductions: store.businessDeductions,
          filingStatus: store.filingStatus,
          stateName: store.stateName,
          federalWithheld: store.federalWithheld
        },
        core_metric: Math.round(metrics.quarterlyFederalPayment + metrics.quarterlyStatePayment)
      })
      if (savedResult?.id) setSavedScenarioId(savedResult.id)
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
    "Filing Status": store.filingStatus,
    "State": store.stateName,
    "W-2 Income": store.w2Income,
    "1099 Income": store.freelanceIncome,
    "Business Deductions": store.businessDeductions,
    "Federal Tax Liability": Math.round(metrics.federalIncomeTax + metrics.totalSETax),
    "State Tax Liability": Math.round(metrics.stateIncomeTax),
    "Quarterly Federal Payment": Math.round(metrics.quarterlyFederalPayment),
    "Quarterly State Payment": Math.round(metrics.quarterlyStatePayment)
  }]

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dailyfinance.tools'
  const shareUrl = savedScenarioId 
    ? `${baseUrl}/freelance/quarterly-estimated-tax-calculator?savedId=${savedScenarioId}`
    : `${baseUrl}/freelance/quarterly-estimated-tax-calculator`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start relative">
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">
        
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Your details</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Tax filing status</label>
              <div className="relative">
                <select 
                  value={store.filingStatus}
                  onChange={(e) => store.setFilingStatus(e.target.value)}
                  className="w-full appearance-none h-10 px-4 rounded-md border border-border/60 bg-muted/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium transition-colors"
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                  <option value="head">Head of Household</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">State of Residence</label>
              <div className="relative">
                <select 
                  value={store.stateName}
                  onChange={(e) => store.setStateName(e.target.value)}
                  className="w-full appearance-none h-10 px-4 rounded-md border border-border/60 bg-muted/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium transition-colors"
                >
                  {US_STATES.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-sm font-semibold text-foreground">Employment income (W-2)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.w2Income === 0 ? '' : store.w2Income}
                  onChange={(e) => store.setW2Income(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 h-10 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Freelance / business / 1099 income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.freelanceIncome === 0 ? '' : store.freelanceIncome}
                  onChange={(e) => store.setFreelanceIncome(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 h-10 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Business deductions</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.businessDeductions === 0 ? '' : store.businessDeductions}
                  onChange={(e) => store.setBusinessDeductions(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="pl-7 h-10 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)} 
                className="text-primary font-semibold text-sm flex items-center gap-1.5 hover:text-primary/80 transition-colors py-2"
              >
                Add advanced info
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`grid transition-all duration-300 ease-in-out ${showAdvanced ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="p-5 bg-muted/30 border border-border/50 rounded-xl space-y-4">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground">Federal taxes already withheld (W-2)</label>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0">If you have W-2 income, enter what your employer has withheld to avoid overestimating your quarterly payment.</p>
                      <div className="relative pt-2">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 mt-1 text-muted-foreground font-semibold">{currencySymbol}</span>
                        <Input 
                          type="number" 
                          value={store.federalWithheld === 0 ? '' : store.federalWithheld}
                          onChange={(e) => store.setFederalWithheld(e.target.value === '' ? 0 : Number(e.target.value))}
                          className="pl-7 h-10 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-blue-50 text-blue-600 border border-blue-200 p-4 rounded-xl shadow-xl flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        {/* Top Summary Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm relative">
          <div className="p-6 flex justify-between items-center gap-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Do you need to pay quarterly taxes?</h3>
              {metrics.quarterlyFederalPayment + metrics.quarterlyStatePayment > 0 ? (
                <span className="text-2xl font-black text-blue-600 tracking-tight">Yes</span>
              ) : (
                <span className="text-2xl font-black text-muted-foreground tracking-tight">No</span>
              )}
            </div>
            
            <div className="flex gap-6 w-auto">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Federal</p>
                <p className="text-lg font-bold text-foreground">{currencySymbol}{Math.round(metrics.quarterlyFederalPayment).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">State</p>
                <p className="text-lg font-bold text-foreground">{currencySymbol}{Math.round(metrics.quarterlyStatePayment).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Breakdown Receipt */}
        <div className="bg-card border border-border shadow-sm rounded-2xl p-6">
          <h3 className="font-bold text-base text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-blue-600" />
            Full Tax Breakdown
          </h3>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-foreground">Total Income (1099 + W-2)</span>
              <span className="font-bold">{currencySymbol}{metrics.totalIncome.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center py-1 text-muted-foreground">
              <span>Business deductions</span>
              <span className="font-bold text-foreground">-{currencySymbol}{store.businessDeductions.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-1 text-muted-foreground">
              <span>SE Tax Deduction</span>
              <span className="text-red-500/90 font-medium">-${Math.round(metrics.deductibleSETax).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-t border-border/60 my-1">
              <span className="font-bold text-foreground font-sans">Adjusted gross income (AGI)</span>
              <span className="font-bold">{currencySymbol}{Math.round(metrics.agi).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-1 text-muted-foreground">
              <span>Standard deduction</span>
              <span className="text-blue-500/90 font-medium">-${Math.round(metrics.standardDeduction).toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center py-1 text-muted-foreground">
              <span>QBI deduction</span>
              <span className="text-blue-500/90 font-medium">-${Math.round(metrics.qbiDeduction).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-t border-border/60 my-1">
              <span className="font-bold text-foreground font-sans">Taxable income</span>
              <span className="font-bold">{currencySymbol}{Math.round(metrics.federalTaxableIncome).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-1 text-muted-foreground">
              <span>SE Tax Liability</span>
              <span className="text-foreground font-medium">{currencySymbol}{Math.round(metrics.totalSETax).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-1 text-muted-foreground">
              <span>Federal Tax Liability</span>
              <span className="text-foreground font-medium">{currencySymbol}{Math.round(metrics.federalIncomeTax).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-1 text-muted-foreground">
              <span>State Tax Liability</span>
              <span className="text-foreground font-medium">{currencySymbol}{Math.round(metrics.stateIncomeTax).toLocaleString()}</span>
            </div>

            {store.federalWithheld > 0 && (
              <div className="flex justify-between items-center py-2 text-muted-foreground border-b border-dashed border-border/60 pb-3 mb-3 mt-1">
                <span>Federal taxes withheld</span>
                <span className="text-blue-500 font-medium">-${store.federalWithheld.toLocaleString()}</span>
              </div>
            )}
            
            {store.federalWithheld === 0 && (
              <div className="border-b border-dashed border-border/60 pb-3 mb-3 mt-1"></div>
            )}

            <div className="flex justify-between items-center py-1">
              <span className="font-bold text-foreground font-sans">Total estimated federal tax</span>
              <span className="font-bold text-base text-foreground">{currencySymbol}{Math.round(metrics.estimatedFederalBill).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-bold text-foreground font-sans">Total estimated state tax</span>
              <span className="font-bold text-base text-foreground">{currencySymbol}{Math.round(metrics.estimatedStateBill).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <CalculatorActions
          slug="quarterly-estimated-tax-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="1099Taxes"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
          pdfDocument={<TaxReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
