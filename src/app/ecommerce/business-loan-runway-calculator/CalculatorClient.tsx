'use client'
import React, { useState } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
import { useCurrencySymbol } from '@/lib/currency'

const fmt = (n: number, sym: string) => sym + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmt0 = (n: number, sym: string) => sym + Math.round(n).toLocaleString('en-US')

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [loan, setLoan] = useState(100000)
  const [apr, setApr] = useState(9)
  const [term, setTerm] = useState(36)
  const [cash, setCash] = useState(150000)
  const [burn, setBurn] = useState(18000)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.loan !== undefined) setLoan(s.loan as any)
    if (s.apr !== undefined) setApr(s.apr as any)
    if (s.term !== undefined) setTerm(s.term as any)
    if (s.cash !== undefined) setCash(s.cash as any)
    if (s.burn !== undefined) setBurn(s.burn as any)
  })


  const r = apr / 100 / 12
  const payment = loan > 0 ? (r > 0 ? (loan * r) / (1 - Math.pow(1 + r, -term)) : loan / Math.max(term, 1)) : 0
  const totalInterest = payment * term - loan
  const runwayNow = burn > 0 ? cash / burn : 0
  const newBurn = burn + payment
  const runwayWithLoan = newBurn > 0 ? (cash + loan) / newBurn : 0
  const extraMonths = runwayWithLoan - runwayNow

  return (<>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold pb-2 border-b">Loan Terms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="text-sm font-semibold">Loan Amount</label><Input type="number" value={loan === 0 ? '' : loan} onChange={(e) => setLoan(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Cash in Bank Today</label><Input type="number" value={cash === 0 ? '' : cash} onChange={(e) => setCash(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Net Monthly Burn (spend − revenue)</label><Input type="number" value={burn === 0 ? '' : burn} onChange={(e) => setBurn(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono" /></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Interest Rate (APR)</label><span className="font-mono font-bold">{apr}%</span></div>
          <Slider value={[apr]} min={0} max={25} step={0.25} onValueChange={(v: any) => setApr(Array.isArray(v) ? v[0] : v)} />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between"><label className="text-sm font-semibold">Loan Term</label><span className="font-mono font-bold">{term} months</span></div>
          <Slider value={[term]} min={6} max={84} step={6} onValueChange={(v: any) => setTerm(Array.isArray(v) ? v[0] : v)} />
          <p className="text-xs text-muted-foreground">Net burn is what actually leaves the bank each month after revenue. If you are profitable, set burn to 0 and use this tool for payment cost only.</p>
        </div>
      </div>
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#064E3B] text-primary-foreground rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <h3 className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2 relative z-10">Monthly Loan Payment</h3>
          <div className="text-5xl font-black tracking-tight font-mono relative z-10">{fmt(payment, sym)}</div>
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-primary-foreground/20 relative z-10">
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Total Interest Paid</p><p className="text-xl font-bold font-mono">{fmt0(Math.max(totalInterest, 0), sym)}</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Runway Today (no loan)</p><p className="text-xl font-bold font-mono">{runwayNow.toFixed(1)} months</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Runway With Loan</p><p className="text-xl font-bold font-mono">{runwayWithLoan.toFixed(1)} months</p></div>
            <div><p className="text-[10px] text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Net Runway Gained</p><p className="text-xl font-bold font-mono">{extraMonths >= 0 ? '+' : ''}{extraMonths.toFixed(1)} months</p></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/90 relative z-10">
            {extraMonths > 1 ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
            <span>{extraMonths <= 0 ? 'This loan barely extends — or even shortens — your runway, because the payment eats the cash it adds. A loan only helps if it buys time to reach revenue, a raise, or profitability.' : extraMonths <= 3 ? 'The loan buys a little time at a real interest cost. Only take it with a concrete milestone it funds.' : 'The loan meaningfully extends runway. The question is no longer maths — it is whether the extra months get used to fix the burn.'}</span>
          </p>
        </div>
      <ToolActionsBar slug="business-loan-runway-calculator" isPro={isPro} inputs={{ loan, apr, term, cash, burn }} />
    </div>
    </div>
  </>)
}
