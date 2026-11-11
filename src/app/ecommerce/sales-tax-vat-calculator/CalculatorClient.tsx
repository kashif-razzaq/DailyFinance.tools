'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Receipt } from "lucide-react"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

const fmt = (n: number) => curSym() + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// Approximate 2026 statewide base sales tax rates (%). Local (county/city) taxes add on top in most states.
const STATE_RATES: Record<string, number> = {
  Alabama: 4.0, Alaska: 0.0, Arizona: 5.6, Arkansas: 6.5, California: 7.25, Colorado: 2.9, Connecticut: 6.35, Delaware: 0.0, Florida: 6.0, Georgia: 4.0, Hawaii: 4.0, Idaho: 6.0, Illinois: 6.25, Indiana: 7.0, Iowa: 6.0, Kansas: 6.5, Kentucky: 6.0, Louisiana: 4.45, Maine: 5.5, Maryland: 6.0, Massachusetts: 6.25, Michigan: 6.0, Minnesota: 6.88, Mississippi: 7.0, Missouri: 4.23, Montana: 0.0, Nebraska: 5.5, Nevada: 6.85, 'New Hampshire': 0.0, 'New Jersey': 6.63, 'New Mexico': 4.88, 'New York': 4.0, 'North Carolina': 4.75, 'North Dakota': 5.0, Ohio: 5.75, Oklahoma: 4.5, Oregon: 0.0, Pennsylvania: 6.0, 'Rhode Island': 7.0, 'South Carolina': 6.0, 'South Dakota': 4.5, Tennessee: 7.0, Texas: 6.25, Utah: 5.95, Vermont: 6.0, Virginia: 5.3, Washington: 6.5, 'West Virginia': 6.0, Wisconsin: 5.0, Wyoming: 4.0, 'District of Columbia': 6.0,
}
const VAT_RATES: Record<string, number> = { 'UK — 20% standard': 20, 'UK — 5% reduced': 5, 'Germany — 19%': 19, 'France — 20%': 20, 'Ireland — 23%': 23, 'Netherlands — 21%': 21, 'Spain — 21%': 21, 'Italy — 22%': 22, 'Canada GST — 5%': 5, 'Australia GST — 10%': 10, 'UAE VAT — 5%': 5 }

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [system, setSystem] = useState<'us' | 'vat'>('us')
  const [mode, setMode] = useState<'add' | 'extract'>('add')
  const [amount, setAmount] = useState(100)
  const [state, setState] = useState('California')
  const [vatPreset, setVatPreset] = useState('UK — 20% standard')
  const [localAdd, setLocalAdd] = useState(1.5)
  const [customVat, setCustomVat] = useState(20)
  const [useCustomVat, setUseCustomVat] = useState(false)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.system !== undefined) setSystem(s.system as any)
    if (s.mode !== undefined) setMode(s.mode as any)
    if (s.amount !== undefined) setAmount(s.amount as any)
    if (s.state !== undefined) setState(s.state as any)
    if (s.vatPreset !== undefined) setVatPreset(s.vatPreset as any)
    if (s.localAdd !== undefined) setLocalAdd(s.localAdd as any)
    if (s.customVat !== undefined) setCustomVat(s.customVat as any)
    if (s.useCustomVat !== undefined) setUseCustomVat(s.useCustomVat as any)
  })


  const rate = system === 'us' ? (STATE_RATES[state] + localAdd) : (useCustomVat ? customVat : VAT_RATES[vatPreset])
  const tax = mode === 'add' ? amount * (rate / 100) : amount - amount / (1 + rate / 100)
  const net = mode === 'add' ? amount : amount - tax
  const gross = mode === 'add' ? amount + tax : amount

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Tax Setup</h2>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setSystem('us')} className={(system === 'us' ? 'bg-[#064E3B] text-white ' : 'bg-muted/50 ') + 'rounded-xl px-4 py-3 text-sm font-bold transition-colors'}>US Sales Tax</button>
          <button onClick={() => setSystem('vat')} className={(system === 'vat' ? 'bg-[#064E3B] text-white ' : 'bg-muted/50 ') + 'rounded-xl px-4 py-3 text-sm font-bold transition-colors'}>VAT (UK / EU / Global)</button>
          <button onClick={() => setMode('add')} className={(mode === 'add' ? 'bg-[#064E3B] text-white ' : 'bg-muted/50 ') + 'rounded-xl px-4 py-3 text-sm font-bold transition-colors'}>Add Tax to a Net Price</button>
          <button onClick={() => setMode('extract')} className={(mode === 'extract' ? 'bg-[#064E3B] text-white ' : 'bg-muted/50 ') + 'rounded-xl px-4 py-3 text-sm font-bold transition-colors'}>Extract Tax from a Gross Price</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">{mode === 'add' ? 'Net Amount (before tax)' : 'Gross Amount (tax included)'}</label><Input type="number" step="0.01" value={amount === 0 ? '' : amount} onChange={(e) => setAmount(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          {system === 'us' ? (
            <div className="space-y-2"><label className="text-sm font-semibold">State (base statewide rate)</label>
              <select value={state} onChange={(e) => setState(e.target.value)} className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
                {Object.keys(STATE_RATES).map((k) => <option key={k} value={k}>{k} — {STATE_RATES[k].toFixed(2)}%</option>)}
              </select></div>
          ) : (
            <div className="space-y-2"><label className="text-sm font-semibold">VAT Preset</label>
              <select value={vatPreset} onChange={(e) => { setVatPreset(e.target.value); setUseCustomVat(false) }} className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
                {Object.keys(VAT_RATES).map((k) => <option key={k} value={k}>{k}</option>)}
              </select></div>
          )}
        </div>
        {system === 'us' ? (
          <div className="space-y-3">
            <div className="flex justify-between"><label className="text-sm font-semibold">Local (county / city) Tax Add-On</label><span className="font-mono font-bold">+{localAdd.toFixed(2)}%</span></div>
            <Slider value={[localAdd]} min={0} max={5} step={0.25} onValueChange={(v: any) => setLocalAdd(Array.isArray(v) ? v[0] : v)} />
            <p className="text-xs text-muted-foreground">Most US buyers pay state + local combined. Chicago, for example, totals 10.25% even though the Illinois base is 6.25%. Five states (AK, DE, MT, NH, OR) have no statewide sales tax — local taxes can still apply in Alaska.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between"><label className="text-sm font-semibold">Or Use a Custom VAT Rate</label><span className="font-mono font-bold">{customVat}%</span></div>
            <Slider value={[customVat]} min={0} max={30} step={0.5} onValueChange={(v: any) => { setCustomVat(Array.isArray(v) ? v[0] : v); setUseCustomVat(true) }} />
          </div>
        )}
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">{system === 'us' ? 'Sales Tax' : 'VAT'} Amount</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{fmt(tax)}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Combined Rate</p><p className="text-xl font-bold font-mono">{rate.toFixed(2)}%</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Net (before tax)</p><p className="text-xl font-bold font-mono">{fmt(net)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Gross (tax included)</p><p className="text-xl font-bold font-mono">{fmt(gross)}</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10"><Receipt className="h-5 w-5 shrink-0" /><span>{mode === 'add' ? 'Add mode: tax is charged on top of the net price — the US checkout model.' : 'Extract mode: the tax inside a tax-inclusive price — the VAT shelf-price model. Never calculate it as gross × rate; divide by (1 + rate) first.'}</span></p>
        </div>
      </div>
    </div>
  <ToolActionsBar slug="sales-tax-vat-calculator" isPro={isPro} inputs={{ system, mode, amount, state, vatPreset, localAdd, customVat, useCustomVat }} /></>)
}
