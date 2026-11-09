/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { curSym, useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'

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

const FREQS = [
  { key: 'annually', label: 'Annually', n: 1 },
  { key: 'semiannually', label: 'Semiannually', n: 2 },
  { key: 'quarterly', label: 'Quarterly', n: 4 },
  { key: 'monthly', label: 'Monthly', n: 12 },
  { key: 'daily', label: 'Daily', n: 365 },
] as const
export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const sym = useCurrencySymbol()
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward')
  const [rateInput, setRateInput] = useState(5)
  const [freqKey, setFreqKey] = useState<string>('daily')
  const [deposit, setDeposit] = useState(10000); const [years, setYears] = useState(5)
  const r = useMemo(() => {
    // Formula: APY = (1 + r/n)^n − 1  ·  Reverse: APR = n × ((1 + APY)^(1/n) − 1)
    const n = FREQS.find(f => f.key === freqKey)?.n ?? 365
    const input = rateInput / 100
    let apr = 0, apy = 0
    if (mode === 'forward') { apr = input; apy = Math.pow(1 + apr / n, n) - 1 }
    else { apy = input; apr = input <= -1 ? 0 : n * (Math.pow(1 + apy, 1 / n) - 1) }
    const fv = deposit * Math.pow(1 + apy, years)
    const earned = fv - deposit
    const noInterestGap = deposit * apy * years
    // Frequency table always anchored on the nominal APR so frequencies are comparable
    const table = FREQS.map(f => {
      const a = Math.pow(1 + apr / f.n, f.n) - 1
      const val = deposit * Math.pow(1 + a, years)
      return { ...f, apy: a, value: val, earned: val - deposit, isCurrent: f.key === freqKey }
    })
    return { n, apr, apy, fv, earned, simpleEarned: noInterestGap, table }
  }, [mode, rateInput, freqKey, deposit, years])
  const pct = (v: number) => (v * 100).toFixed(3).replace(/0+$/, '').replace(/\.$/, '.00') + '%'
  const pct4 = (v: number) => (v * 100).toFixed(4) + '%'
  return (<><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 bg-card border shadow-sm rounded-2xl p-6 md:p-8 space-y-6">
      <div className="space-y-2"><label className="text-sm font-semibold">Conversion Mode</label>
        <div className="flex gap-2">
          <button onClick={() => setMode('forward')} className={`px-4 py-2 rounded-lg border text-sm font-semibold ${mode === 'forward' ? 'bg-[#064E3B] text-white' : 'bg-card'}`}>APR → APY</button>
          <button onClick={() => setMode('reverse')} className={`px-4 py-2 rounded-lg border text-sm font-semibold ${mode === 'reverse' ? 'bg-[#064E3B] text-white' : 'bg-card'}`}>APY → APR</button>
        </div>
        <p className="text-xs text-muted-foreground">{mode === 'forward' ? 'Enter the stated (nominal) rate a bank advertises and see the true yield after compounding.' : 'Enter a quoted APY and back out the nominal APR behind it — handy for comparing against loans quoted in APR.'}</p></div>
      <PctSlider label={mode === 'forward' ? 'Nominal Rate (APR)' : 'Annual Percentage Yield (APY)'} value={rateInput} onChange={setRateInput} min={0} max={15} step={0.05} />
      <div className="space-y-2"><label className="text-sm font-semibold">Compounding Frequency</label>
        <select value={freqKey} onChange={(e) => setFreqKey(e.target.value)} className="w-full h-10 rounded-lg border border-neutral-300 px-3 text-sm bg-white font-mono">
          {FREQS.map(f => (<option key={f.key} value={f.key}>{f.label} ({f.n}×/year)</option>))}
        </select></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"><MoneyInput label="Deposit Amount" value={deposit} onChange={setDeposit} hint="Used to show real dollar growth at this yield." />
        <div className="space-y-3"><div className="flex justify-between"><label className="text-sm font-semibold">Years Held</label><span className="font-mono font-bold">{years} yrs</span></div><Slider value={[years]} min={1} max={30} step={1} onValueChange={(v: any) => setYears(Array.isArray(v) ? v[0] : v)} /></div></div>
      <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm">{mode === 'forward' ? <>APY = (1 + r/n)<sup>n</sup> − 1 = (1 + {(r.apr * 100).toFixed(2)}%/{r.n})<sup>{r.n}</sup> − 1 = <strong>{pct4(r.apy)}</strong></> : <>APR = n × ((1 + APY)<sup>1/n</sup> − 1) = <strong>{pct4(r.apr)}</strong></>}</div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <ResultCard title={mode === 'forward' ? 'True Yield (APY)' : 'Nominal Rate (APR)'}>
        <div className="text-5xl font-black font-mono">{mode === 'forward' ? pct(r.apy) : pct(r.apr)}</div>
        <p className="text-white/80 mt-2 text-sm">{mode === 'forward' ? `from a ${(r.apr * 100).toFixed(2)}% APR compounded ${freqKey}` : `behind a ${(r.apy * 100).toFixed(2)}% APY compounded ${freqKey}`}</p>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-sm">
          <div><p className="text-white/60 text-xs uppercase font-bold">APR (Nominal)</p><p className="font-mono text-xl font-bold">{pct(r.apr)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">APY (Effective)</p><p className="font-mono text-xl font-bold">{pct(r.apy)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">{fmt(deposit)} Becomes</p><p className="font-mono text-xl font-bold">{fmt(r.fv)}</p></div>
          <div><p className="text-white/60 text-xs uppercase font-bold">Interest in {years} Yrs</p><p className="font-mono text-xl font-bold">{fmt(r.earned)}</p></div>
        </div>
        <p className="text-white/80 mt-4 text-sm">Compounding adds {fmt(Math.max(0, r.earned - r.simpleEarned))} beyond simple interest on the same deposit over {years} years.</p>
      </ResultCard>
      <div className="bg-card border rounded-2xl p-6"><h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Same Rate, Every Frequency</h4>
        <p className="text-xs text-muted-foreground mb-4">The same {(r.apr * 100).toFixed(2)}% nominal rate — what banks don&apos;t show you side by side. Highlighted row = your selected frequency.</p>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="py-2 pr-2 font-semibold">Frequency</th><th className="py-2 pr-2 font-semibold text-right">APY</th><th className="py-2 font-semibold text-right">Value ({years} yrs)</th></tr></thead>
        <tbody className="font-mono">{r.table.map(row => (<tr key={row.key} className={`border-b last:border-0 ${row.isCurrent ? 'bg-emerald-50 dark:bg-emerald-950/30 font-bold' : ''}`}><td className="py-2 pr-2">{row.label} <span className="text-muted-foreground">×{row.n}</span></td><td className="py-2 pr-2 text-right">{pct(row.apy)}</td><td className="py-2 text-right">{fmt(row.value)}</td></tr>))}</tbody></table></div>
        <p className="text-xs text-muted-foreground mt-3">More frequent compounding always wins, but the gap shrinks fast — daily vs monthly is pennies on most deposits. Compare APYs, not APRs, when shopping accounts.</p>
      </div>
    </div></div><ToolActionsBar slug="apy-calculator" isPro={isPro} inputs={{ mode, rateInput, freqKey, deposit, years }} /></>)
}
