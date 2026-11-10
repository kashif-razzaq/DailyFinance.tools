/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useMemo, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts'
import { Plus, Trash2 } from 'lucide-react'
import { useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { ProGuard } from '@/components/calculator/ProGuard'
import { MoneyInput, PctSlider, ResultCard, Stat, fmt } from '@/components/calculator/ProInputs'

/**
 * IRR & NPV Analyzer (Pro).
 *
 * Enter an initial investment and a series of annual cash flows; the tool
 * computes NPV at your discount rate, the IRR (bisection on NPV), simple
 * payback (with the fractional year) and the profitability index.
 */
function npvAt(rate: number, flows: number[]) {
  return flows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate, t), 0)
}

function irrOf(flows: number[]): number | null {
  let lo = -0.95
  let hi = 10
  let flo = npvAt(lo, flows)
  let fhi = npvAt(hi, flows)
  if (Number.isNaN(flo) || Number.isNaN(fhi) || flo * fhi > 0) return null
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2
    const fm = npvAt(mid, flows)
    if (flo * fm <= 0) {
      hi = mid
      fhi = fm
    } else {
      lo = mid
      flo = fm
    }
  }
  return ((lo + hi) / 2) * 100
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  useCurrencySymbol()
  const [initial, setInitial] = useState(50000)
  const [discount, setDiscount] = useState(10)
  const [flows, setFlows] = useState<number[]>([8000, 12000, 15000, 18000, 22000])

  const setFlow = (idx: number, value: number) => setFlows((prev) => prev.map((f, i) => (i === idx ? value : f)))
  const addFlow = () => setFlows((prev) => (prev.length >= 15 ? prev : [...prev, 0]))
  const removeFlow = (idx: number) => setFlows((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== idx)))

  const r = useMemo(() => {
    const all = [-Math.abs(initial), ...flows]
    const npv = npvAt(discount / 100, all)
    const irr = irrOf(all)
    const pvInflows = all.reduce((sum, cf, t) => (t > 0 ? sum + cf / Math.pow(1 + discount / 100, t) : sum), 0)
    let cumulative = -Math.abs(initial)
    let payback: number | null = null
    for (let t = 0; t < flows.length; t++) {
      const prev = cumulative
      cumulative += flows[t]
      if (payback === null && cumulative >= 0 && flows[t] > 0) {
        payback = t + -prev / flows[t]
      }
    }
    if (cumulative < 0) payback = null
    const chart = all.map((cf, t) => ({ year: t === 0 ? 'Now' : `Yr ${t}`, cf }))
    return {
      npv,
      irr,
      payback,
      pi: initial > 0 ? pvInflows / Math.abs(initial) : 0,
      totalIn: flows.reduce((a, b) => a + b, 0),
      chart,
    }
  }, [initial, discount, flows])

  const verdict =
    r.irr === null
      ? 'No meaningful IRR exists for this cash-flow pattern (the flows never repay the investment at any rate). Judge it on NPV alone.'
      : r.npv > 0
        ? `Creates value: at a ${discount}% required return the project is worth ${fmt(r.npv)} more than it costs, and its IRR of ${r.irr.toFixed(2)}% clears your hurdle with room to spare.`
        : `Destroys value at a ${discount}% required return despite an IRR of ${r.irr.toFixed(2)}%. The return is real but below your hurdle — the price or the cash flows need to change, not the spreadsheet.`

  const calculator = (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-6">
        <MoneyInput label="Initial investment (year 0)" value={initial} onChange={setInitial} />
        <PctSlider label="Discount rate (your required return)" value={discount} onChange={setDiscount} min={0} max={30} step={0.25} />
        <div className="space-y-3">
          <p className="text-sm font-semibold">Annual cash flows</p>
          {flows.map((flow, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-14 shrink-0 text-xs font-bold uppercase tracking-wide text-muted-foreground">Year {i + 1}</span>
              <div className="flex-1">
                <MoneyInput label="" value={flow} onChange={(v) => setFlow(i, v)} />
              </div>
              <button
                type="button"
                onClick={() => removeFlow(i)}
                disabled={flows.length <= 1}
                aria-label={`Remove year ${i + 1}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-30"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFlow}
            disabled={flows.length >= 15}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-sm font-bold transition-colors hover:border-[#064E3B] hover:text-[#064E3B] disabled:opacity-40"
          >
            <Plus className="h-4 w-4" /> Add a year
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <ResultCard title="Investment analysis">
          <div className="grid grid-cols-2 gap-6">
            <Stat label="Net present value" value={fmt(r.npv)} sub={`at a ${discount}% discount rate`} />
            <Stat label="Internal rate of return" value={r.irr === null ? '—' : `${r.irr.toFixed(2)}%`} sub="the rate where NPV is exactly zero" />
            <Stat
              label="Payback period"
              value={r.payback === null ? 'Never' : `${r.payback.toFixed(2)} yrs`}
              sub={`${fmt(r.totalIn)} total cash returned`}
            />
            <Stat label="Profitability index" value={r.pi.toFixed(2)} sub="present value returned per unit invested" />
          </div>
          <p className="mt-6 border-t border-white/15 pt-4 text-sm font-light leading-relaxed text-white/85">{verdict}</p>
        </ResultCard>

        <div className="rounded-2xl border bg-card p-5">
          <p className="mb-3 text-sm font-bold">Cash flow by year</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={r.chart} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `${Math.round(v / 1000)}k`} width={45} />
                <Tooltip formatter={(value: any) => fmt(Number(value))} />
                <Bar dataKey="cf" name="Cash flow" radius={[4, 4, 0, 0]}>
                  {r.chart.map((entry, i) => (
                    <Cell key={i} fill={entry.cf < 0 ? '#B45309' : '#064E3B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs font-light text-muted-foreground">
            NPV is the decision number; IRR is the communication number. When they disagree, believe the NPV.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <ProGuard
        isPro={isPro}
        toolTitle="IRR & NPV Analyzer"
        features={[
          'NPV, IRR, payback and profitability index together',
          'Up to 15 years of custom cash flows',
          'A verdict that explains when IRR and NPV disagree',
          'Cash-flow chart with the investment year marked',
        ]}
      >
        {calculator}
      </ProGuard>
      <ToolActionsBar slug="irr-npv-analyzer" isPro={isPro} inputs={{ initial, discount, flows: flows.join(', ') }} />
    </>
  )
}
