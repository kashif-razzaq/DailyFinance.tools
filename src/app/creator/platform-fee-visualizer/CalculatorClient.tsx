'use client'
import React, { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp } from "lucide-react"

const fmt = (n: number) => '$' + n.toLocaleString(undefined, { maximumFractionDigits: 0 })

type Platform = { name: string; note: string; fee: (gross: number, txns: number) => number }
const PLATFORMS: Platform[] = [
  { name: 'YouTube (long-form)', note: '45% of ad revenue to YouTube; you keep 55%', fee: (g) => g * 0.45 },
  { name: 'YouTube Shorts', note: '45% creator pool share — modelled as 55% total deductions on pool revenue', fee: (g) => g * 0.55 },
  { name: 'Patreon Pro', note: '8% platform + 2.9% + $0.30 per pledge', fee: (g, t) => g * 0.08 + g * 0.029 + t * 0.30 },
  { name: 'Substack', note: '10% + Stripe 2.9% + $0.30 per paid subscription', fee: (g, t) => g * 0.10 + g * 0.029 + t * 0.30 },
  { name: 'Twitch (Partner, 50/50 sub)', note: '50% of subscription revenue to Twitch', fee: (g) => g * 0.50 },
  { name: 'Gumroad', note: '10% flat per sale', fee: (g) => g * 0.10 },
  { name: 'Etsy (sale + shipping)', note: '6.5% transaction + 3% + $0.25 payment + $0.20 listing (approx.)', fee: (g, t) => g * 0.065 + g * 0.03 + t * 0.45 },
  { name: 'Only Stripe (your own site)', note: '2.9% + $0.30 per charge — the benchmark every platform must beat on value', fee: (g, t) => g * 0.029 + t * 0.30 },
]

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  void isPro
  const [gross, setGross] = useState(5000)
  const [txns, setTxns] = useState(250)

  const rows = useMemo(() => PLATFORMS.map(p => {
    const fee = Math.min(p.fee(gross, txns), gross)
    return { ...p, fee, net: gross - fee, pct: gross > 0 ? (fee / gross) * 100 : 0 }
  }).sort((a, b) => b.net - a.net), [gross, txns])
  const best = rows[0]

  return (
    <div className="space-y-8">
      <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b text-[#1F2937] mb-6"><Calculator className="h-5 w-5 text-[#064E3B]" /> Your Gross Revenue</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3"><label className="text-sm font-semibold">Gross revenue to compare ($)</label>
            <Input type="number" value={gross === 0 ? '' : gross} onChange={(e) => setGross(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <Slider value={[Math.min(gross, 100000)]} max={100000} step={100} onValueChange={(val: unknown) => setGross(Array.isArray(val) ? Number(val[0]) : Number(val))} /></div>
          <div className="space-y-3"><label className="text-sm font-semibold">Number of transactions / pledges / subs</label>
            <Input type="number" value={txns === 0 ? '' : txns} onChange={(e) => setTxns(e.target.value === '' ? 0 : Number(e.target.value))} className="font-mono text-lg" />
            <p className="text-xs text-neutral-500">Fixed per-transaction fees ($0.30 etc.) punish small tickets — that is why transaction count matters as much as the headline percentage.</p></div>
        </div>
      </div>
      <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8">
        <h3 className="font-bold text-[#1F2937] flex items-center gap-2 mb-1"><TrendingUp className="h-5 w-5 text-[#064E3B]" /> What you keep on each platform</h3>
        <p className="text-sm text-neutral-500 mb-6">Best net: <strong className="text-[#064E3B]">{best ? best.name : ''}</strong>{best ? <> — <span className="font-mono">{fmt(best.net)}</span> kept of <span className="font-mono">{fmt(gross)}</span></> : null}</p>
        <div className="space-y-5">
          {rows.map(row => (
            <div key={row.name}>
              <div className="flex flex-wrap justify-between gap-2 text-sm mb-1">
                <span className="font-semibold text-[#1F2937]">{row.name} <span className="font-normal text-neutral-500">— {row.note}</span></span>
                <span className="font-mono">keep <strong>{fmt(row.net)}</strong> · fees {fmt(row.fee)} ({row.pct.toFixed(1)}%)</span>
              </div>
              <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden"><div className="h-full bg-[#064E3B] transition-all duration-300" style={{ width: `${gross > 0 ? Math.max(0, (row.net / gross) * 100) : 0}%` }} /></div>
            </div>
          ))}
        </div>
        <p className="text-xs text-neutral-500 mt-6">Models are simplified headline-fee comparisons for planning. Marketplaces bundle discovery, hosting and trust into their cut; your own site keeps the most but you pay for traffic, support and chargebacks yourself. Always confirm current fee schedules before a platform decision.</p>
      </div>
    </div>
  )
}
