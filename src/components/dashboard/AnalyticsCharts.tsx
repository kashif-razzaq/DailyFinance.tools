'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SavedCalculator } from "@/types/database"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import Link from "next/link"
import {
  Wallet, Landmark, CalendarClock, Percent, Flame, PiggyBank, Umbrella,
  TrendingUp, Info,
} from "lucide-react"
import { buildFinancialPicture, type FinancialPicture, type MoneyLine } from "@/lib/financial-picture"
import { getToolUrl } from "@/config/navigation"

/**
 * Cross-Data Analytics — the money inside the user's saved scenarios,
 * combined into one financial picture. Every figure comes from
 * buildFinancialPicture (latest scenario per tool, Net-Worth-Tracker
 * precedence, single income source); nothing here counts clicks,
 * visits or activity.
 */

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
const money2 = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n)
const axisMoney = (v: number) => (Math.abs(v) >= 1000 ? `$${Math.round(v / 1000)}k` : `$${v}`)

const tooltipStyle = {
  borderRadius: '12px',
  border: 'none',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
} as const

function LinesList({ lines, tone }: { lines: MoneyLine[]; tone: 'asset' | 'debt' }) {
  if (!lines.length) return <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
  return (
    <ul className="divide-y">
      {[...lines].sort((a, b) => b.value - a.value).map((l) => (
        <li key={l.label + l.source} className="flex items-baseline justify-between gap-3 py-2">
          <span className="min-w-0">
            <span className="block truncate font-semibold">{l.label}</span>
            <span className="block text-xs text-muted-foreground">
              {l.source}
              {l.apr != null && tone === 'debt' ? ` · ${l.apr}% APR` : ''}
              {l.monthlyPayment != null && tone === 'debt' ? ` · ${money(l.monthlyPayment)}/mo` : ''}
            </span>
          </span>
          <span className="font-mono font-bold">{money(l.value)}</span>
        </li>
      ))}
    </ul>
  )
}

function UnlockCard() {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Your financial picture builds itself from saves</CardTitle>
        <CardDescription>
          Cross-Data Analytics reads the numbers inside your saved scenarios — no typing anything twice.
          Save any of these and this page starts combining them:
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-3">
        {[
          { slug: 'net-worth-tracker', title: 'Net Worth Tracker', text: 'Your full balance sheet — assets and liabilities in one scenario.' },
          { slug: 'personal-loan-calculator', title: 'Any loan or card tool', text: 'Balances, rates and payments roll up into totals, weighted APR and payoff cost.' },
          { slug: 'budget-calculator', title: 'Budget Calculator', text: 'Income and spending become your combined cash-flow view and savings rate.' },
        ].map((c) => (
          <Link key={c.slug} href={getToolUrl(c.slug)} className="rounded-2xl border p-4 transition-colors hover:bg-muted/40">
            <p className="font-bold">{c.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

export function CrossDataAnalytics({ calculators }: { calculators: SavedCalculator[] }) {
  const pic: FinancialPicture = buildFinancialPicture(calculators)
  const hasMoney = pic.assets.length > 0 || pic.debts.length > 0 || pic.cashFlow != null

  if (!hasMoney) return <UnlockCard />

  const debtChart = [...pic.debts]
    .sort((a, b) => b.value - a.value)
    .map((d) => ({ name: d.label, balance: Math.round(d.value) }))

  const flowChart = pic.cashFlow
    ? [
        { name: 'Income', amount: Math.round(pic.cashFlow.income), fill: '#064E3B' },
        ...pic.cashFlow.outgo.map((o) => ({ name: o.label, amount: Math.round(o.value), fill: '#94a3b8' })),
        { name: 'Savings', amount: Math.round(pic.cashFlow.savings), fill: '#D97706' },
      ]
    : []

  const dtiBand =
    pic.dti == null ? null : pic.dti < 20 ? 'Comfortable' : pic.dti <= 36 ? 'Manageable' : 'High — worth a plan'

  return (
    <div className="space-y-6">
      {/* ── KPI row ─────────────────────────────────────────── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-gradient-to-br from-primary to-emerald-800 p-6 text-primary-foreground shadow-sm">
          <div className="mb-4 flex items-center gap-3 text-emerald-100">
            <Wallet className="h-5 w-5" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Net position</h3>
          </div>
          <p className="font-mono text-4xl font-bold">{money(pic.netPosition)}</p>
          <p className="mt-1 text-xs text-emerald-100">
            {money(pic.totalAssets)} assets − {money(pic.totalDebts)} debts
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3 text-muted-foreground">
            <Landmark className="h-5 w-5" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Total debts</h3>
          </div>
          <p className="font-mono text-4xl font-bold">{money(pic.totalDebts)}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Across {pic.debts.length} saved balance{pic.debts.length === 1 ? '' : 's'}
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3 text-muted-foreground">
            <CalendarClock className="h-5 w-5" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Debt payments</h3>
          </div>
          <p className="font-mono text-4xl font-bold">
            {pic.monthlyDebtPayments != null ? `${money(pic.monthlyDebtPayments)}` : '—'}
            {pic.monthlyDebtPayments != null && <span className="text-base font-semibold text-muted-foreground">/mo</span>}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {pic.totalInterestCost != null
              ? `${money(pic.totalInterestCost)} of interest still to pay on these terms`
              : 'Save a loan scenario to see the payment total'}
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3 text-muted-foreground">
            <Percent className="h-5 w-5" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              {pic.dti != null ? 'Debt-to-income' : 'Weighted APR'}
            </h3>
          </div>
          <p className="font-mono text-4xl font-bold">
            {pic.dti != null ? `${pic.dti.toFixed(0)}%` : pic.weightedApr != null ? `${pic.weightedApr.toFixed(1)}%` : '—'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {pic.dti != null
              ? `${dtiBand} · payments vs income from your ${pic.incomeSource}`
              : pic.weightedApr != null
                ? 'Balance-weighted across your saved debts'
                : 'Save an income or loan scenario to unlock'}
          </p>
        </div>
      </div>

      {/* ── Highest-APR callout ─────────────────────────────── */}
      {pic.highestAprDebt && pic.highestAprDebt.apr != null && pic.highestAprDebt.apr >= 15 && (
        <div className="flex flex-col gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 sm:flex-row sm:items-center">
          <Flame className="h-6 w-6 shrink-0 text-amber-600" />
          <p className="text-sm leading-relaxed">
            <strong>Most expensive debt: {pic.highestAprDebt.label} at {pic.highestAprDebt.apr}% APR</strong>{' '}
            ({money(pic.highestAprDebt.value)}). In an avalanche plan this is the first target — every extra
            dollar here removes the costliest interest you carry.{' '}
            <Link href={getToolUrl('debt-avalanche-vs-snowball-calculator')} className="font-semibold text-[#064E3B] underline">
              Model it
            </Link>
          </p>
        </div>
      )}

      {/* ── Balance sheet + debt chart ──────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Balance sheet</CardTitle>
            <CardDescription>
              {pic.basis === 'net-worth'
                ? 'From your Net Worth Tracker scenario — your balance sheet of record.'
                : 'Combined from your latest scenario in each tool.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <p className="text-sm font-bold text-emerald-700">Assets · {money(pic.totalAssets)}</p>
              </div>
              <LinesList lines={pic.assets} tone="asset" />
            </div>
            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <p className="text-sm font-bold text-red-600">Debts · {money(pic.totalDebts)}</p>
              </div>
              <LinesList lines={pic.debts} tone="debt" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Debts by balance</CardTitle>
            <CardDescription>What you owe, biggest first — from your saved scenarios.</CardDescription>
          </CardHeader>
          <CardContent>
            {debtChart.length ? (
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={debtChart} layout="vertical" margin={{ top: 0, right: 16, left: 16, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={axisMoney} />
                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#374151' }} width={130} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={tooltipStyle} formatter={(v) => [money2(Number(v)), 'Balance']} />
                    <Bar dataKey="balance" name="Balance" fill="#dc2626" radius={[0, 4, 4, 0]} barSize={22} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No debt scenarios saved yet — save any loan or card calculation and it lands here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Cash flow ───────────────────────────────────────── */}
      {pic.cashFlow && (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Monthly cash flow</CardTitle>
            <CardDescription>
              From your {pic.cashFlow.source} — income against where it goes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="h-[280px] w-full lg:col-span-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={flowChart} margin={{ top: 10, right: 10, left: -8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} interval={0} angle={-16} textAnchor="end" height={50} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={axisMoney} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={tooltipStyle} formatter={(v) => [money2(Number(v)), 'Per month']} />
                    <Bar dataKey="amount" name="Per month" radius={[4, 4, 0, 0]} barSize={34} fill="#064E3B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4 lg:col-span-2">
                <div className="rounded-2xl border bg-muted/30 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <PiggyBank className="h-4 w-4 text-[#064E3B]" /> Savings rate {pic.cashFlow.savingsRate.toFixed(0)}%
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {money(pic.cashFlow.savings)} of {money(pic.cashFlow.income)} monthly income is marked for saving.
                  </p>
                </div>
                <div className="rounded-2xl border bg-muted/30 p-4">
                  <p className="text-sm font-bold">Unallocated: {money(pic.cashFlow.leftover)}/mo</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {pic.cashFlow.leftover >= 0
                      ? 'Income left after the spending and saving in this scenario — room for extra debt payments or investing.'
                      : 'This scenario spends more than it earns — the categories above show where.'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Snapshot strip ──────────────────────────────────── */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="border p-5 shadow-sm">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Umbrella className="h-4 w-4" /> Emergency cover
          </p>
          {pic.emergency ? (
            <>
              <p className="mt-2 font-mono text-3xl font-bold">{pic.emergency.monthsCovered.toFixed(1)} months</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {money(pic.emergency.saved)} saved against {money(pic.emergency.monthlyExpenses)}/mo of essential spending.
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Save an Emergency Fund scenario to see your months of cover.
            </p>
          )}
        </Card>
        <Card className="border p-5 shadow-sm">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="h-4 w-4" /> Saving & investing
          </p>
          {pic.monthlyInvesting != null ? (
            <>
              <p className="mt-2 font-mono text-3xl font-bold">{money(pic.monthlyInvesting)}/mo</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Combined monthly contributions across your saved savings, investment and retirement plans.
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Save an investment or retirement scenario to total your monthly contributions.
            </p>
          )}
        </Card>
        <Card className="border p-5 shadow-sm">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Percent className="h-4 w-4" /> Cost of debt
          </p>
          {pic.weightedApr != null || pic.totalInterestCost != null ? (
            <>
              <p className="mt-2 font-mono text-3xl font-bold">
                {pic.totalInterestCost != null ? money(pic.totalInterestCost) : '—'}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Interest still to pay on your saved terms
                {pic.weightedApr != null ? ` · weighted APR ${pic.weightedApr.toFixed(1)}%` : ''}.
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Save a loan with its rate and term to price the interest you still owe.
            </p>
          )}
        </Card>
      </div>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Built from your latest scenario in each of {pic.toolsUsed} tool{pic.toolsUsed === 1 ? '' : 's'}.
        Where a payment is not saved directly it is estimated with the standard amortization formula on your
        saved balance, rate and term — the same maths the calculators run. Reopen and re-save a scenario to
        refresh its numbers here.
      </p>
    </div>
  )
}
