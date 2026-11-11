/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'

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

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [mode, setMode] = useState<'rate' | 'years'>('rate')
  const [rate, setRate] = useState(8)
  const [amount, setAmount] = useState(10000)
  const [targetYears, setTargetYears] = useState(9)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.mode !== undefined) setMode(s.mode as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.amount !== undefined) setAmount(s.amount as any)
    if (s.targetYears !== undefined) setTargetYears(s.targetYears as any)
  })


  // Formula: Rule of 72 estimate = 72 / r. Exact = ln(2) / ln(1 + r)
  // Reverse: required return estimate = 72 / years. Exact = 2^(1/years) - 1
  const r = useMemo(() => {
    const ruleYears = rate > 0 ? 72 / rate : Infinity
    const exactYears = rate > 0 ? Math.log(2) / Math.log(1 + rate / 100) : Infinity
    const errYears = isFinite(ruleYears) && isFinite(exactYears) && exactYears > 0 ? (ruleYears - exactYears) / exactYears * 100 : 0
    const reqRule = targetYears > 0 ? 72 / targetYears : 0
    const reqExact = targetYears > 0 ? (Math.pow(2, 1 / targetYears) - 1) * 100 : 0
    const errReq = reqExact > 0 ? (reqRule - reqExact) / reqExact * 100 : 0
    const table = [2, 4, 6, 8, 10, 12, 15].map((rt) => ({ rate: rt, rule: 72 / rt, exact: Math.log(2) / Math.log(1 + rt / 100) }))
    return { ruleYears, exactYears, errYears, reqRule, reqExact, errReq, table }
  }, [rate, targetYears])

  const yrs = (n: number) => isFinite(n) ? n.toFixed(2) + ' yrs' : '—'

  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode('rate')} className={`px-4 py-2 rounded-full text-sm font-bold ${mode === 'rate' ? 'bg-[#064E3B] text-white' : 'bg-neutral-100'}`}>I know the return</button>
        <button type="button" onClick={() => setMode('years')} className={`px-4 py-2 rounded-full text-sm font-bold ${mode === 'years' ? 'bg-[#064E3B] text-white' : 'bg-neutral-100'}`}>I know the years</button>
      </div>
      {mode === 'rate' ? (<>
        <PctSlider label="Annual Return" value={rate} onChange={setRate} min={0.1} max={30} step={0.1} />
        <MoneyInput label="Starting Amount (optional)" value={amount} onChange={setAmount} hint="Used to show the value after 1, 2 and 3 doublings." />
        {rate <= 0 && <p className="text-sm text-red-600 font-semibold">Enter a return above 0% — money never doubles at a 0% return.</p>}
      </>) : (<>
        <div className="space-y-2"><label className="text-sm font-semibold">Target Years to Double</label><Input type="number" value={targetYears === 0 ? '' : targetYears} onChange={(e) => setTargetYears(num(e.target.value))} className="font-mono" /></div>
        <MoneyInput label="Starting Amount (optional)" value={amount} onChange={setAmount} />
        {targetYears <= 0 && <p className="text-sm text-red-600 font-semibold">Enter a target above 0 years.</p>}
      </>)}
      <div className="bg-card border rounded-2xl p-4 overflow-x-auto">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Doubling Table — Common Rates</h4>
        <table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="py-2">Return</th><th>Rule of 72</th><th>Exact</th></tr></thead>
          <tbody>{r.table.map((t) => (<tr key={t.rate} className={`border-b last:border-0 ${t.rate === Math.round(rate) ? 'font-bold' : ''}`}><td className="py-2 font-mono">{t.rate}%</td><td className="font-mono">{t.rule.toFixed(2)} yrs</td><td className="font-mono">{t.exact.toFixed(2)} yrs</td></tr>))}</tbody></table>
      </div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      {mode === 'rate' ? (
        <ResultCard title="Years to Double">
          <div className="text-4xl font-black font-mono">{yrs(r.ruleYears)}</div>
          <p className="text-white/80 mt-2 text-sm">Rule of 72 estimate at {rate}% a year</p>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
            <div><p className="text-white/60 text-xs uppercase font-bold">Rule of 72</p><p className="font-mono text-xl font-bold">{yrs(r.ruleYears)}</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Exact (log)</p><p className="font-mono text-xl font-bold">{yrs(r.exactYears)}</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Estimate Error</p><p className="font-mono text-xl font-bold">{isFinite(r.exactYears) ? r.errYears.toFixed(2) + '%' : '—'}</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Return</p><p className="font-mono text-xl font-bold">{rate}%</p></div>
          </div>
          {amount > 0 && (<div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
            <div><p className="text-white/60 text-xs uppercase font-bold">After 1× double</p><p className="font-mono font-bold">{fmt(amount * 2)}</p><p className="text-white/60 text-xs">{yrs(r.exactYears)}</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">After 2×</p><p className="font-mono font-bold">{fmt(amount * 4)}</p><p className="text-white/60 text-xs">{isFinite(r.exactYears) ? (r.exactYears * 2).toFixed(1) + ' yrs' : '—'}</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">After 3×</p><p className="font-mono font-bold">{fmt(amount * 8)}</p><p className="text-white/60 text-xs">{isFinite(r.exactYears) ? (r.exactYears * 3).toFixed(1) + ' yrs' : '—'}</p></div>
          </div>)}
        </ResultCard>
      ) : (
        <ResultCard title="Required Return to Double">
          <div className="text-4xl font-black font-mono">{r.reqRule.toFixed(2)}%</div>
          <p className="text-white/80 mt-2 text-sm">Rule of 72 estimate to double in {targetYears} years</p>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
            <div><p className="text-white/60 text-xs uppercase font-bold">Rule of 72</p><p className="font-mono text-xl font-bold">{r.reqRule.toFixed(2)}%</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Exact</p><p className="font-mono text-xl font-bold">{r.reqExact.toFixed(2)}%</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Estimate Error</p><p className="font-mono text-xl font-bold">{r.errReq.toFixed(2)}%</p></div>
            <div><p className="text-white/60 text-xs uppercase font-bold">Target</p><p className="font-mono text-xl font-bold">{targetYears} yrs</p></div>
          </div>
          {amount > 0 && <p className="mt-6 pt-4 border-t border-white/20 text-sm text-white/90">{fmt(amount)} becomes {fmt(amount * 2)} in {targetYears} years at that return. {isPro ? '' : ''}</p>}
        </ResultCard>
      )}
      <div className="bg-card border rounded-2xl p-6 text-sm text-muted-foreground leading-relaxed"><strong className="text-foreground">Why two answers?</strong> The Rule of 72 is a mental shortcut — very accurate near 8%, slightly optimistic at low rates and slightly pessimistic at high ones. The exact figure uses ln(2) / ln(1 + r), so you can see the shortcut&apos;s error for yourself.</div>
    <ToolActionsBar slug="rule-of-72-calculator" isPro={isPro} inputs={{ mode, rate, amount, targetYears }} />
    </div></div></>)
}
