/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useMemo, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useCurrencySymbol, curSym } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { ProGuard } from '@/components/calculator/ProGuard'
import { ResultCard, Stat, fmt, num } from '@/components/calculator/ProInputs'

/**
 * Portfolio Rebalancer (Pro).
 *
 * Enter each holding's current value and the percentage it should be, and
 * the tool computes the exact buy/sell orders that restore the target
 * allocation — the trade list, not just the percentages.
 */
type Holding = { name: string; value: number; target: number }

const COLORS = ['#064E3B', '#D97706', '#3B82F6', '#10B981', '#6366F1', '#F59E0B']

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  useCurrencySymbol()
  const [holdings, setHoldings] = useState<Holding[]>([
    { name: 'US stocks', value: 48000, target: 60 },
    { name: 'International stocks', value: 18000, target: 20 },
    { name: 'Bonds', value: 24000, target: 15 },
    { name: 'Cash', value: 10000, target: 5 },
  ])

  const update = (idx: number, patch: Partial<Holding>) =>
    setHoldings((prev) => prev.map((h, i) => (i === idx ? { ...h, ...patch } : h)))
  const add = () => setHoldings((prev) => (prev.length >= 8 ? prev : [...prev, { name: `Holding ${prev.length + 1}`, value: 0, target: 0 }]))
  const remove = (idx: number) => setHoldings((prev) => (prev.length <= 2 ? prev : prev.filter((_, i) => i !== idx)))

  const r = useMemo(() => {
    const total = holdings.reduce((a, h) => a + h.value, 0)
    const targetSum = holdings.reduce((a, h) => a + h.target, 0)
    const rows = holdings.map((h) => {
      const targetValue = (total * h.target) / 100
      return {
        ...h,
        currentPct: total > 0 ? (h.value / total) * 100 : 0,
        targetValue,
        move: targetValue - h.value,
      }
    })
    const turnover = rows.reduce((a, row) => a + Math.abs(row.move), 0) / 2
    const maxDrift = rows.reduce((a, row) => Math.max(a, Math.abs(row.currentPct - row.target)), 0)
    return { total, targetSum, rows, turnover, maxDrift }
  }, [holdings])

  const calculator = (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-4">
        <p className="text-sm font-light text-muted-foreground">
          Your holdings today, and the share of the portfolio each one <em>should</em> be. Targets should add up
          to 100%.
        </p>
        {holdings.map((h, i) => (
          <div key={i} className="rounded-2xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
              <Input
                value={h.name}
                onChange={(e) => update(i, { name: e.target.value })}
                className="h-9 flex-1 font-semibold"
                aria-label="Holding name"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                disabled={holdings.length <= 2}
                aria-label={`Remove ${h.name}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-30"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Current value</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">{curSym()}</span>
                  <Input
                    type="number"
                    value={h.value === 0 ? '' : h.value}
                    onChange={(e) => update(i, { value: num(e.target.value) })}
                    className="pl-7 font-mono"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Target %</label>
                <div className="relative">
                  <Input
                    type="number"
                    value={h.target === 0 ? '' : h.target}
                    onChange={(e) => update(i, { target: num(e.target.value) })}
                    className="pr-7 font-mono"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={add}
            disabled={holdings.length >= 8}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-sm font-bold transition-colors hover:border-[#064E3B] hover:text-[#064E3B] disabled:opacity-40"
          >
            <Plus className="h-4 w-4" /> Add holding
          </button>
          <p className={`text-sm font-bold ${Math.round(r.targetSum) === 100 ? 'text-[#064E3B]' : 'text-destructive'}`}>
            Targets total {r.targetSum}%
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <ResultCard title="Rebalance plan">
          <div className="grid grid-cols-2 gap-6">
            <Stat label="Portfolio value" value={fmt(r.total)} />
            <Stat label="Largest drift" value={`${r.maxDrift.toFixed(1)} pts`} sub="biggest gap between actual and target" />
            <Stat label="Trading needed" value={fmt(r.turnover)} sub="total buys (sells fund them)" />
            <Stat label="Trades" value={String(r.rows.filter((row) => Math.abs(row.move) >= 1).length)} sub="holdings that need an order" />
          </div>
          <p className="mt-6 border-t border-white/15 pt-4 text-sm font-light leading-relaxed text-white/85">
            {r.maxDrift < 2
              ? 'This portfolio is essentially on target — drifting less than 2 points rarely justifies the trades, spreads and taxes of rebalancing.'
              : 'Execute the sells first, then the buys with the proceeds: the plan is self-funding and needs no new cash.'}
          </p>
        </ResultCard>

        <div className="rounded-2xl border bg-card p-5">
          <p className="mb-3 text-sm font-bold">The trade list</p>
          <div className="divide-y">
            {r.rows.map((row, i) => (
              <div key={i} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="truncate font-semibold">{row.name}</span>
                  <span className="shrink-0 font-light text-muted-foreground">
                    {row.currentPct.toFixed(1)}% → {row.target}%
                  </span>
                </span>
                {Math.abs(row.move) < 1 ? (
                  <span className="shrink-0 font-mono font-semibold text-muted-foreground">Hold</span>
                ) : row.move > 0 ? (
                  <span className="shrink-0 font-mono font-extrabold text-[#064E3B]">Buy {fmt(row.move)}</span>
                ) : (
                  <span className="shrink-0 font-mono font-extrabold text-[#B45309]">Sell {fmt(-row.move)}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={r.rows} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {r.rows.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any, name: any) => [fmt(Number(value)), name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs font-light text-muted-foreground">Current allocation, before the trades</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <ProGuard
        isPro={isPro}
        toolTitle="Portfolio Rebalancer"
        features={[
          'The exact buy/sell trade list, not just percentages',
          'Drift measurement per holding against your target',
          'Self-funding plan: sells pay for the buys',
          'Up to eight holdings with a live allocation chart',
        ]}
      >
        {calculator}
      </ProGuard>
      <ToolActionsBar
        slug="portfolio-rebalancer"
        isPro={isPro}
        inputs={{ holdings: holdings.map((h) => `${h.name}: ${h.value} @ ${h.target}%`).join('; ') }}
      />
    </>
  )
}
