'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp } from "lucide-react"

const fmt = (n: number) => '$' + n.toLocaleString(undefined, { maximumFractionDigits: 0 })
const fmt2 = (n: number) => '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  void isPro
  const [patrons, setPatrons] = useState(350)
  const [pledge, setPledge] = useState(8)
  const [planPct, setPlanPct] = useState(8)
  const [processingPct] = useState(2.9)
  const [perTxn, setPerTxn] = useState(0.3)
  const [payoutPct, setPayoutPct] = useState(1)

  const r = useMemo(() => {
    const gross = patrons * pledge
    const platform = gross * (planPct / 100)
    const processing = gross * (processingPct / 100) + patrons * perTxn
    const afterFees = gross - platform - processing
    const payout = afterFees * (payoutPct / 100)
    const net = afterFees - payout
    return { gross, platform, processing, payout, net, perPatron: patrons > 0 ? net / patrons : 0, yearly: net * 12, keptPct: gross > 0 ? (net / gross) * 100 : 0 }
  }, [patrons, pledge, planPct, processingPct, perTxn, payoutPct])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b text-[#1F2937]"><Calculator className="h-5 w-5 text-[#064E3B]" /> Membership Inputs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Paying patrons</label>
            <Input type="number" value={patrons === 0 ? '' : patrons} onChange={(e) => setPatrons(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[Math.min(patrons, 10000)]} max={10000} step={10} onValueChange={(val: unknown) => setPatrons(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Average pledge / tier price ($/month)</label>
            <Input type="number" step="0.5" value={pledge === 0 ? '' : pledge} onChange={(e) => setPledge(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[pledge]} max={100} step={0.5} onValueChange={(val: unknown) => setPledge(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold">Patreon plan (platform fee)</label>
          <div className="flex flex-wrap gap-2">
            {[5, 8, 12].map(p => (
              <button key={p} onClick={() => setPlanPct(p)} className={`px-4 py-2 rounded-xl text-sm font-semibold border ${planPct === p ? 'bg-[#064E3B] text-white border-[#064E3B]' : 'bg-white border-neutral-200'}`}>{p === 5 ? 'Lite 5%' : p === 8 ? 'Pro 8%' : 'Premium 12%'}</button>
            ))}
          </div>
          <p className="text-xs text-neutral-500">Payment processing is modelled at 2.9% + $0.30 per successful pledge (lower the per-transaction fee to $0.15 for micro-pledges under $3). Currency conversion adds ~2.5% on non-USD pledges where it applies.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Processing fee per pledge ($)</label>
            <Input type="number" step="0.01" value={perTxn === 0 ? '' : perTxn} onChange={(e) => setPerTxn(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Payout fee (%)</label>
            <Input type="number" step="0.1" value={payoutPct === 0 ? '' : payoutPct} onChange={(e) => setPayoutPct(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" /></div>
        </div>
      </div>
      <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
        <div className="bg-[#064E3B] text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> You Actually Keep (Monthly)</h3>
          <div className="text-5xl font-black font-mono">{fmt(r.net)}</div>
          <p className="text-white/70 text-sm mt-2 font-mono">{r.keptPct.toFixed(1)}% of {fmt(r.gross)} gross · {fmt(r.yearly)} / year</p>
          <div className="space-y-3 mt-8 pt-6 border-t border-white/20 font-mono text-sm">
            <div className="flex justify-between"><span className="text-white/70">Gross pledges</span><span>{fmt(r.gross)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">Patreon platform fee</span><span>−{fmt(r.platform)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">Payment processing</span><span>−{fmt(r.processing)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">Payout fee</span><span>−{fmt(r.payout)}</span></div>
            <div className="flex justify-between border-t border-white/20 pt-3"><span className="text-white/70">Net per patron</span><span className="font-bold">{fmt2(r.perPatron)}</span></div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-6 text-sm text-neutral-600">
          <strong className="text-[#1F2937]">Formula:</strong> <span className="font-mono">Net = Patrons × Pledge − Platform % − (Processing % + per-pledge fee) − Payout %</span>. Small tiers are hit hardest: the fixed per-pledge fee makes a $2 tier lose far more, proportionally, than a $10 tier.
        </div>
      </div>
    </div>
  )
}
