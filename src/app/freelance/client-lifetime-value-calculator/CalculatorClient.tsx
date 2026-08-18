'use client'

import React, { useState, useEffect } from 'react'
import { Calculator, ShoppingBag, RefreshCcw, CalendarClock, Percent, Target, HeartPulse, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useClientLTVStore } from '@/store/client-ltv.store'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { saveCalculatorAction, getSharedCalculatorAction } from '@/actions/calculator.actions'
import { useRouter, useSearchParams } from 'next/navigation'
import { CalculatorActions } from "@/components/calculator/CalculatorActions"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"

export function CalculatorClient({ isPro }: { isPro: boolean }) {
  const store = useClientLTVStore()
  const { currency } = useGlobalSettingsStore()
  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'
  const [mounted, setMounted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showProModal, setShowProModal] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [savedScenarioId, setSavedScenarioId] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const urlSavedId = searchParams.get('saved_id')
    if (urlSavedId && !savedScenarioId) {
      getSharedCalculatorAction(urlSavedId).then(data => {
        if (data && data.input_state) {
          const state = data.input_state
          if (state.averagePurchaseValue !== undefined) store.setAveragePurchaseValue(state.averagePurchaseValue as number)
          if (state.purchaseFrequency !== undefined) store.setPurchaseFrequency(state.purchaseFrequency as number)
          if (state.customerLifespan !== undefined) store.setCustomerLifespan(state.customerLifespan as number)
          if (state.grossMarginPct !== undefined) store.setGrossMarginPct(state.grossMarginPct as number)
          if (state.targetCacRatio !== undefined) store.setTargetCacRatio(state.targetCacRatio as number)
          setSavedScenarioId(urlSavedId)
        }
      }).catch(console.error)
    }
  }, [searchParams])

  const metrics = store.getDerivedMetrics()

  const handleSave = async () => {
    if (!isPro) {
      setShowProModal(true)
      return
    }
    
    setIsSaving(true)
    try {
      const savedResult = await saveCalculatorAction({
        id: savedScenarioId || undefined,
        calculator_slug: 'freelance/client-lifetime-value-calculator',
        category: 'Freelance & Business',
        saved_name: `CLV: ${currencySymbol}${Math.round(metrics.profitAdjustedCLV)}`,
        input_state: {
          averagePurchaseValue: store.averagePurchaseValue,
          purchaseFrequency: store.purchaseFrequency,
          customerLifespan: store.customerLifespan,
          grossMarginPct: store.grossMarginPct,
          targetCacRatio: store.targetCacRatio
        },
        core_metric: metrics.profitAdjustedCLV,
        is_public: false
      })

      if (!savedScenarioId && savedResult && savedResult.id) {
        setSavedScenarioId(savedResult.id)
        router.replace(`?saved_id=${savedResult.id}`, { scroll: false })
      }
      
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        window.location.href = '/login?redirect=/freelance/client-lifetime-value-calculator'
      } else {
        console.error('Error saving:', error)
      }
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams()
      params.set('apv', store.averagePurchaseValue.toString())
      params.set('pf', store.purchaseFrequency.toString())
      params.set('lt', store.customerLifespan.toString())
      params.set('gm', store.grossMarginPct.toString())
      setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`)
    }
  }, [store])

  const exportData = [{
    'Average Purchase Value': store.averagePurchaseValue,
    'Purchase Frequency / Year': store.purchaseFrequency,
    'Customer Lifespan (Years)': store.customerLifespan,
    'Gross Margin %': store.grossMarginPct,
    'Basic CLV': metrics.basicCLV,
    'Profit-Adjusted CLV': metrics.profitAdjustedCLV,
    'Max Target CAC': metrics.maxCAC
  }]

  const formatCurrency = (val: number) => `${currencySymbol}${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

  if (!mounted) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start relative">
      {/* LEFT COLUMN: Inputs */}
      <div className="lg:col-span-5 flex flex-col space-y-8 bg-card border shadow-sm rounded-2xl p-6 md:p-8">
        
        <div className="relative">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Customer Data
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                Average Purchase Value (APV)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{currencySymbol}</span>
                <Input 
                  type="number" 
                  value={store.averagePurchaseValue || ''}
                  onChange={(e) => store.setAveragePurchaseValue(Number(e.target.value))}
                  className="pl-7 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-xs text-muted-foreground">Total revenue ÷ total number of purchases</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 text-muted-foreground" />
                Purchase Frequency (per year)
              </label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.purchaseFrequency || ''}
                  onChange={(e) => store.setPurchaseFrequency(Number(e.target.value))}
                  className="h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
              </div>
              <p className="text-xs text-muted-foreground">Purchases ÷ unique customers (annually)</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-muted-foreground" />
                Customer Lifespan (Years)
              </label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.customerLifespan || ''}
                  onChange={(e) => store.setCustomerLifespan(Number(e.target.value))}
                  className="h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                  step="0.1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Average time a customer continues buying</p>
            </div>
          </div>
        </div>

        <div className="relative pt-2">
          <div className="flex items-center justify-between pb-2 border-b mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Percent className="h-5 w-5 text-primary" />
              Profitability & Margins
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Gross Profit Margin</label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.grossMarginPct || ''}
                  onChange={(e) => store.setGrossMarginPct(Number(e.target.value))}
                  className="pr-10 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">%</span>
              </div>
              <p className="text-xs text-muted-foreground">Revenue left after subtracting cost of goods sold (COGS)</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Target CLV:CAC Ratio</label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={store.targetCacRatio || ''}
                  onChange={(e) => store.setTargetCacRatio(Number(e.target.value))}
                  className="pr-10 h-11 text-base font-medium bg-muted/50 focus:bg-background transition-colors border-border/60"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">: 1</span>
              </div>
              <p className="text-xs text-muted-foreground">Standard healthy ratio is 3:1 (LTV is 3x Acquisition Cost)</p>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Results */}
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col h-full space-y-10">
        
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-emerald-50 text-emerald-600 border border-emerald-200 p-4 rounded-xl shadow-xl flex items-center gap-3 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold text-sm">Successfully saved to Scenario Vault!</span>
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Profit-Adjusted CLV</h3>
              <div className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-3">
                {formatCurrency(metrics.profitAdjustedCLV)}
              </div>
              <p className="text-sm text-muted-foreground">
                Total <strong>profit</strong> expected per customer over {store.customerLifespan} years.
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${metrics.healthRating === 'Critical' ? 'bg-red-500/10 text-red-600 border-red-500/20' : metrics.healthRating === 'At Risk' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'}`}>
              Health: {metrics.healthRating}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-background border border-border/60">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Basic CLV (Revenue)</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(metrics.basicCLV)}</p>
            </div>
            <div className="p-4 rounded-2xl bg-background border border-border/60">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Annual Value (Rev)</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(metrics.customerValue)}</p>
            </div>
            <div className="p-4 rounded-2xl bg-primary border border-primary text-primary-foreground shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-20"><Target className="w-8 h-8"/></div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground/80 mb-1 relative z-10">Max Target CAC</p>
              <p className="text-xl font-bold relative z-10">{formatCurrency(metrics.maxCAC)}</p>
            </div>
          </div>

          <div className="mb-8 border-t border-border/50 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cumulative Value Over Time</h4>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Revenue vs Profit</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748B', fontSize: 12 }}
                    dy={10}
                    tickFormatter={(val) => `Year ${val}`}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748B', fontSize: 12 }}
                    tickFormatter={(value) => `${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                  />
                  <Tooltip 
                    formatter={(value, name) => [formatCurrency(Number(value)), name === 'cumulativeProfit' ? 'Profit' : 'Revenue']}
                    labelFormatter={(label) => `Year ${label}`}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cumulativeRevenue" 
                    stroke="#94A3B8" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRev)"
                    activeDot={{ r: 4, fill: '#94A3B8', strokeWidth: 0 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cumulativeProfit" 
                    stroke="#059669" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorProfit)"
                    activeDot={{ r: 6, fill: '#059669', strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <CalculatorActions
          slug="client-lifetime-value-calculator"
          onSave={handleSave}
          isSaving={isSaving}
          isPro={isPro}
          exportData={exportData}
          exportFilename="CustomerLifetimeValue"
          onRequirePro={() => setShowProModal(true)}
          shareUrl={shareUrl}
        />
      </div>

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
