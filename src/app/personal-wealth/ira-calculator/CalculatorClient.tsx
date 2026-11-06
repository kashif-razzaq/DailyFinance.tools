/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const fmt2 = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
const num = (v: string) => (v === '' ? 0 : Number(v) || 0)
function MoneyInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
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
function NumInput({ label, value, onChange, hint, min, max }: { label: string; value: number; onChange: (n: number) => void; hint?: string; min?: number; max?: number }) {
  return (<div className="space-y-2"><label className="text-sm font-semibold">{label}</label>
    <Input type="number" value={value === 0 ? '' : value} min={min} max={max} onChange={(e) => onChange(num(e.target.value))} className="font-mono" />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>)
}

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'

// Formula (equal out-of-pocket comparison):
//  Years n = retirementAge - currentAge, growth factor per year = (1 + r).
//  Annuity factor for end-of-year contributions: A(t) = ((1+r)^t - 1) / r  (or t when r = 0).
//  Traditional (gross basis): pre-tax FV(t) = B*(1+r)^t + G*A(t); after-tax = pre-tax FV * (1 - taxRet).
//  Roth (same out-of-pocket cost): only G*(1 - taxNow) and B*(1 - taxNow) are funded after paying tax today,
//    so after-tax FV(t) = (1 - taxNow) * [B*(1+r)^t + G*A(t)] — tax-free at withdrawal.
//  Hence Roth wins exactly when taxRet > taxNow, Traditional wins when taxRet < taxNow, and they tie when equal.
function annuityFactor(r: number, t: number) {
  if (t <= 0) return 0
  if (r === 0) return t
  return (Math.pow(1 + r, t) - 1) / r
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  void isPro
  const [currentAge, setCurrentAge] = useState(35)
  const [retirementAge, setRetirementAge] = useState(65)
  const [balance, setBalance] = useState(50000)
  const [contribution, setContribution] = useState(7000)
  const [ret, setRet] = useState(7)
  const [taxNow, setTaxNow] = useState(22)
  const [taxRet, setTaxRet] = useState(22)

  const calc = useMemo(() => {
    const n = Math.max(0, retirementAge - currentAge)
    const r = ret / 100
    const tn = Math.min(100, Math.max(0, taxNow)) / 100
    const tr = Math.min(100, Math.max(0, taxRet)) / 100
    const series: { age: number; traditional: number; roth: number }[] = []
    for (let t = 0; t <= n; t++) {
      const gross = balance * Math.pow(1 + r, t) + contribution * annuityFactor(r, t)
      series.push({ age: currentAge + t, traditional: Math.round(gross * (1 - tr)), roth: Math.round(gross * (1 - tn)) })
    }
    const grossFinal = balance * Math.pow(1 + r, n) + contribution * annuityFactor(r, n)
    const tradAfterTax = grossFinal * (1 - tr)
    const rothAfterTax = grossFinal * (1 - tn)
    const tradTaxPaid = grossFinal * tr
    const rothTaxPaidToday = (balance + contribution * Math.max(0, n)) * tn
    const margin = Math.abs(tradAfterTax - rothAfterTax)
    const winner = Math.abs(tradAfterTax - rothAfterTax) < 0.5 ? 'Tie' : tradAfterTax > rothAfterTax ? 'Traditional IRA' : 'Roth IRA'
    return { n, series, grossFinal, tradAfterTax, rothAfterTax, tradTaxPaid, rothTaxPaidToday, margin, winner }
  }, [currentAge, retirementAge, balance, contribution, ret, taxNow, taxRet])

  const invalidAges = retirementAge <= currentAge

  return (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <NumInput label="Current Age" value={currentAge} onChange={(v) => setCurrentAge(Math.min(100, Math.max(0, v)))} min={0} max={100} />
        <NumInput label="Retirement Age" value={retirementAge} onChange={(v) => setRetirementAge(Math.min(110, Math.max(0, v)))} min={0} max={110} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MoneyInput label="Current Balance (gross)" value={balance} onChange={setBalance} hint="Treated as a gross, pre-tax amount in both accounts for a fair comparison — see the assumption below." />
        <MoneyInput label="Annual Contribution (gross)" value={contribution} onChange={setContribution} hint="The gross amount you can set aside each year, before any tax on a Roth contribution." />
      </div>
      <PctSlider label="Expected Annual Return" value={ret} onChange={setRet} min={0} max={15} step={0.25} />
      <PctSlider label="Current Marginal Tax Rate" value={taxNow} onChange={setTaxNow} min={0} max={50} step={1} />
      <PctSlider label="Expected Tax Rate in Retirement" value={taxRet} onChange={setTaxRet} min={0} max={50} step={1} />
      {invalidAges && <p className="text-sm text-red-600 font-semibold">Retirement age must be after your current age — increase the retirement age to see a projection.</p>}
      <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Assumption — equal out-of-pocket cost:</strong> the Traditional IRA receives the full gross amount and is taxed at your retirement rate on withdrawal. The Roth IRA pays tax today, so only the gross amount × (1 − today&apos;s tax rate) is actually invested, then grows and is withdrawn tax-free. Your current balance is compared on the same gross basis. Employer plans, contribution limits, penalties and state tax are not modelled.
      </div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title="After-Tax Value at Retirement">
        <div className="text-3xl md:text-4xl font-black font-mono">{calc.winner === 'Tie' ? 'Dead heat' : calc.winner + ' wins'}</div>
        <p className="text-white/80 mt-2 text-sm">by {fmt(calc.margin)} after tax at age {retirementAge} ({calc.n} years of growth)</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">Traditional (after tax)</p><p className="font-mono text-xl font-bold">{fmt(calc.tradAfterTax)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Roth (after tax)</p><p className="font-mono text-xl font-bold">{fmt(calc.rothAfterTax)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Pre-Tax Pot (gross)</p><p className="font-mono text-xl font-bold">{fmt(calc.grossFinal)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Winner Margin</p><p className="font-mono text-xl font-bold">{fmt(calc.margin)}</p></div>
        </div>
      </ResultCard>

      <div className="bg-card border rounded-2xl p-6">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">After-Tax Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left"><th className="py-2 pr-2 font-semibold"></th><th className="py-2 pr-2 font-semibold text-right">Traditional</th><th className="py-2 font-semibold text-right">Roth</th></tr></thead>
            <tbody className="font-mono">
              <tr className="border-b"><td className="py-2 pr-2 font-sans">Value before retirement tax</td><td className="py-2 pr-2 text-right">{fmt(calc.grossFinal)}</td><td className="py-2 text-right">{fmt(calc.rothAfterTax)}</td></tr>
              <tr className="border-b"><td className="py-2 pr-2 font-sans">Tax paid</td><td className="py-2 pr-2 text-right">{fmt(calc.tradTaxPaid)} at withdrawal</td><td className="py-2 text-right">{fmt(calc.rothTaxPaidToday)} today</td></tr>
              <tr><td className="py-2 pr-2 font-sans font-semibold">You keep (after tax)</td><td className="py-2 pr-2 text-right font-bold">{fmt(calc.tradAfterTax)}</td><td className="py-2 text-right font-bold">{fmt(calc.rothAfterTax)}</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed"><strong className="text-foreground">Break-even note:</strong> on an equal out-of-pocket basis the two accounts break even when your retirement tax rate equals today&apos;s rate ({taxNow}%). Roth wins when your retirement rate is <em>higher</em> than today&apos;s; Traditional wins when it is <em>lower</em>. At your inputs ({taxNow}% now vs {taxRet}% in retirement) the result above follows that rule exactly — try moving either rate to flip the winner.</p>
      </div>

      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">After-Tax Value by Age</h4>
        <ResponsiveContainer width="100%" height={220}><LineChart data={calc.series}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="age" /><YAxis tickFormatter={(v: number) => '$' + Math.round(v / 1000) + 'k'} /><Tooltip formatter={(v: any) => fmt2(Number(v))} /><Legend /><Line type="monotone" dataKey="traditional" stroke="#D97706" strokeWidth={2} dot={false} name="Traditional (after tax)" /><Line type="monotone" dataKey="roth" stroke="#064E3B" strokeWidth={2} dot={false} name="Roth (after tax)" /></LineChart></ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-3">Both lines start from the same gross balance; the gap between them is purely the tax-rate difference. {fmt2(calc.rothAfterTax)} is the Roth line&apos;s endpoint.</p>
      </div>
    </div></div>)
}
