/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => curSym() + Math.round(n).toLocaleString('en-US')
const fmt2 = (n: number) => curSym() + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{curSym()}</span>
    <Input type="number" value={value === 0 ? '' : value} onChange={(e) => onChange(num(e.target.value))} className="pl-7 font-mono" /></div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}
function PctSlider({ label, value, onChange, min = 0, max = 20, step = 0.1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (<div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">{label}</label><span className="font-mono font-bold">{value}%</span></div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v: any) => onChange(Array.isArray(v) ? v[0] : v)} /></div>)
}
function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-8 shadow-xl"><h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{title}</h3>{children}</div>)
}

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

// Formula: FV = PV(1+r)^t + PMT × [((1+r)^t − 1)/r]  (× (1+r) if annuity due); r = periodic rate, t = total periods. If r=0: FV = PV + PMT×t
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [pv, setPv] = useState(10000)
  const [pmtInput, setPmtInput] = useState(500)
  const [frequency, setFrequency] = useState<'monthly' | 'annual'>('monthly')
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(10)
  const [annuityType, setAnnuityType] = useState<'ordinary' | 'due'>('ordinary')
  const [inflation, setInflation] = useState(3)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.pv !== undefined) setPv(s.pv as any)
    if (s.pmtInput !== undefined) setPmtInput(s.pmtInput as any)
    if (s.frequency !== undefined) setFrequency(s.frequency as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.years !== undefined) setYears(s.years as any)
    if (s.annuityType !== undefined) setAnnuityType(s.annuityType as any)
    if (s.inflation !== undefined) setInflation(s.inflation as any)
  })


  const calc = useMemo(() => {
    const periodsPerYear = frequency === 'monthly' ? 12 : 1
    const safeYears = Math.max(0, Math.min(50, years || 0))
    const n = Math.round(safeYears * periodsPerYear)
    const r = rate / 100 / periodsPerYear
    let lumpFV = 0
    let paymentsFV = 0
    if (r === 0) {
      lumpFV = pv || 0
      paymentsFV = (pmtInput || 0) * n
    } else {
      const factor = Math.pow(1 + r, n)
      lumpFV = (pv || 0) * factor
      paymentsFV = (pmtInput || 0) * ((factor - 1) / r)
      if (annuityType === 'due') paymentsFV = paymentsFV * (1 + r)
    }
    const fv = lumpFV + paymentsFV
    const totalPayments = (pmtInput || 0) * n
    const totalContributed = (pv || 0) + totalPayments
    const interest = fv - totalContributed
    const lumpGrowth = lumpFV - (pv || 0)
    const paymentsGrowth = paymentsFV - totalPayments
    const pvOfResult = safeYears === 0 ? fv : fv / Math.pow(1 + inflation / 100, safeYears)

    // Year-by-year table: recompute at each year-end
    const table: { year: number; fv: number; contributed: number; interest: number }[] = []
    for (let y = 1; y <= safeYears; y++) {
      const ny = y * periodsPerYear
      let l = 0; let p = 0
      if (r === 0) { l = pv || 0; p = (pmtInput || 0) * ny } else {
        const f = Math.pow(1 + r, ny)
        l = (pv || 0) * f
        p = (pmtInput || 0) * ((f - 1) / r)
        if (annuityType === 'due') p = p * (1 + r)
      }
      const total = l + p
      const contrib = (pv || 0) + (pmtInput || 0) * ny
      table.push({ year: y, fv: Math.round(total), contributed: Math.round(contrib), interest: Math.round(total - contrib) })
    }
    const chart = [{ year: 0, fv: Math.round(pv || 0) }, ...table.map((t) => ({ year: t.year, fv: t.fv }))]
    return { fv, lumpFV, paymentsFV, totalPayments, totalContributed, interest, lumpGrowth, paymentsGrowth, pvOfResult, table, chart, n, r }
  }, [pv, pmtInput, frequency, rate, years, annuityType, inflation])

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MoneyInput label="Present Value (Lump Sum)" value={pv} onChange={setPv} hint="Amount invested today." />
        <MoneyInput label="Periodic Payment" value={pmtInput} onChange={setPmtInput} hint={frequency === 'monthly' ? 'Paid every month.' : 'Paid every year.'} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Payment Frequency</label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value as 'monthly' | 'annual')} className="w-full border rounded-md px-3 py-2 bg-background font-mono text-sm">
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Years</label>
          <Input type="number" value={years === 0 ? '' : years} onChange={(e) => setYears(num(e.target.value))} className="font-mono" min={0} max={50} />
        </div>
      </div>
      <PctSlider label="Annual Rate of Return" value={rate} onChange={setRate} min={0} max={20} step={0.1} />
      <div>
        <label className="text-sm font-semibold block mb-2">Annuity Type</label>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setAnnuityType('ordinary')} className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${annuityType === 'ordinary' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background'}`}>Ordinary annuity — end of period</button>
          <button type="button" onClick={() => setAnnuityType('due')} className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${annuityType === 'due' ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-background'}`}>Annuity due — beginning</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Annuity due earns one extra period of interest on every payment.</p>
      </div>
      <PctSlider label="Inflation / Discount Rate (for today's-money value)" value={inflation} onChange={setInflation} min={0} max={10} step={0.1} />
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="Future Value">
        <div className="text-4xl font-black font-mono">{fmt(calc.fv)}</div>
        <p className="text-white/80 mt-2 text-sm">in {years || 0} years at {rate}% with {frequency} payments ({annuityType === 'due' ? 'annuity due' : 'ordinary annuity'})</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Lump-Sum Growth</p><p className="font-mono text-xl font-bold">{fmt(calc.lumpFV)}</p><p className="text-white/60 text-xs">incl. {fmt(Math.max(0, calc.lumpGrowth))} growth</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Payments Growth</p><p className="font-mono text-xl font-bold">{fmt(calc.paymentsFV)}</p><p className="text-white/60 text-xs">incl. {fmt(Math.max(0, calc.paymentsGrowth))} growth</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Interest Earned</p><p className="font-mono text-xl font-bold">{fmt(Math.max(0, calc.interest))}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Total Contributed</p><p className="font-mono text-xl font-bold">{fmt(calc.totalContributed)}</p></div>
        </div>
        <div className="mt-4 bg-white/10 rounded-xl p-4">
          <p className="text-white/60 text-xs uppercase font-bold">Worth in Today&apos;s Money</p>
          <p className="font-mono text-2xl font-bold">{fmt(calc.pvOfResult)}</p>
          <p className="text-white/70 text-xs mt-1">Present value of the result discounted at {inflation}% inflation — what {fmt(calc.fv)} in {years || 0} years buys in today&apos;s dollars.</p>
        </div>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Growth Over Time</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={calc.chart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(v: number) => sym + Math.round(v / 1000) + 'k'} width={55} />
            <Tooltip formatter={(v: any) => fmt(Number(v))} />
            <Line type="monotone" dataKey="fv" stroke="#064E3B" strokeWidth={2.5} dot={false} name="Future value" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card border rounded-2xl p-6 overflow-x-auto">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Year-by-Year Breakdown</h4>
        {calc.table.length === 0 ? <p className="text-sm text-muted-foreground">Enter at least 1 year.</p> : (
          <table className="w-full text-sm">
            <thead><tr className="text-left border-b"><th className="py-2 pr-2">Year</th><th className="py-2 pr-2">Value</th><th className="py-2 pr-2">Contributed</th><th className="py-2">Interest</th></tr></thead>
            <tbody>{calc.table.map((r) => (<tr key={r.year} className="border-b last:border-0"><td className="py-2 pr-2 font-mono">{r.year}</td><td className="py-2 pr-2 font-mono font-bold">{fmt(r.fv)}</td><td className="py-2 pr-2 font-mono">{fmt(r.contributed)}</td><td className="py-2 font-mono text-emerald-700">{fmt(r.interest)}</td></tr>))}</tbody>
          </table>
        )}
        <p className="text-xs text-muted-foreground mt-3">{isPro ? '' : ''}Breakdown splits the result into lump-sum growth ({fmt(calc.lumpGrowth)}), payments growth ({fmt(calc.paymentsGrowth)}) and principal you put in.</p>
      </div>
    </div>
  </div><ToolActionsBar slug="future-value-calculator" isPro={isPro} inputs={{ pv, pmtInput, frequency, rate, years, annuityType, inflation }} /></>)
}
