'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SavedCalculator } from "@/types/database"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts'
import Link from "next/link"
import { Lightbulb, Scale, Wallet, Compass, History, Share2 } from "lucide-react"
import {
  navigationCategories,
  SCENARIO_SLUG_ALIASES,
} from "@/config/navigation"

/**
 * Cross-data analytics computed from the user's REAL saved scenarios.
 * Every number on this page is derived from saved_calculators rows —
 * no sample or projected data is shown.
 */

function hubNameOf(calc: SavedCalculator): string {
  const slug = SCENARIO_SLUG_ALIASES[calc.calculator_slug] ?? calc.calculator_slug
  const cat = navigationCategories.find((c) => c.calculators.some((x) => x.slug === slug))
  return cat?.name ?? 'Other'
}

function toolTitleOf(calc: SavedCalculator): string {
  const slug = SCENARIO_SLUG_ALIASES[calc.calculator_slug] ?? calc.calculator_slug
  for (const cat of navigationCategories) {
    const hit = cat.calculators.find((x) => x.slug === slug)
    if (hit) return hit.title.replace(/ Calculator$/, '')
  }
  return calc.calculator_slug.replace(/-/g, ' ')
}

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const tooltipStyle = {
  borderRadius: '12px',
  border: 'none',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
} as const

export function AnalyticsCharts({ calculators }: { calculators: SavedCalculator[] }) {
  const hubData = (() => {
    const counts = new Map<string, number>()
    for (const c of calculators) counts.set(hubNameOf(c), (counts.get(hubNameOf(c)) ?? 0) + 1)
    return [...counts.entries()]
      .map(([name, scenarios]) => ({ name, scenarios }))
      .sort((a, b) => b.scenarios - a.scenarios)
  })()

  const activityData = (() => {
    const weeks: { label: string; updates: number }[] = []
    const now = new Date()
    for (let w = 11; w >= 0; w--) {
      const start = new Date(now)
      start.setDate(now.getDate() - (w + 1) * 7)
      const end = new Date(now)
      end.setDate(now.getDate() - w * 7)
      const updates = calculators.filter((c) => {
        const d = new Date(c.last_updated)
        return d > start && d <= end
      }).length
      weeks.push({
        label: start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        updates,
      })
    }
    return weeks
  })()

  const toolData = (() => {
    const counts = new Map<string, number>()
    for (const c of calculators) counts.set(toolTitleOf(c), (counts.get(toolTitleOf(c)) ?? 0) + 1)
    return [...counts.entries()]
      .map(([name, scenarios]) => ({ name, scenarios }))
      .sort((a, b) => b.scenarios - a.scenarios)
      .slice(0, 6)
  })()

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Scenarios by hub</CardTitle>
          <CardDescription>Where your saved planning lives, hub by hub.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hubData} margin={{ top: 10, right: 10, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} interval={0} angle={-18} textAnchor="end" height={52} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} allowDecimals={false} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={tooltipStyle} />
                <Bar dataKey="scenarios" name="Scenarios" fill="#064E3B" radius={[4, 4, 0, 0]} barSize={38} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Vault activity — last 12 weeks</CardTitle>
          <CardDescription>Scenarios created or updated, week by week.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUpdates" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} interval={2} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="updates" name="Updates" stroke="#D97706" strokeWidth={2.5} fillOpacity={1} fill="url(#colorUpdates)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm lg:col-span-2">
        <CardHeader>
          <CardTitle>Your most-used tools</CardTitle>
          <CardDescription>Ranked by how many scenarios you have saved in each.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={toolData} layout="vertical" margin={{ top: 0, right: 16, left: 24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#374151' }} width={170} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={tooltipStyle} />
                <Bar dataKey="scenarios" name="Scenarios" fill="#10b981" radius={[0, 4, 4, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface Insight {
  icon: typeof Wallet
  title: string
  body: string
}

function sumRecord(v: unknown): number | null {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return null
  const nums = Object.values(v as Record<string, unknown>).filter(
    (x): x is number => typeof x === 'number' && Number.isFinite(x),
  )
  return nums.length ? nums.reduce((a, b) => a + b, 0) : null
}

function buildInsights(calculators: SavedCalculator[]): Insight[] {
  const insights: Insight[] = []

  // Net worth snapshot — from the user's latest Net Worth Tracker scenario.
  const nw = calculators
    .filter((c) => c.calculator_slug === 'net-worth-tracker')
    .sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime())[0]
  if (nw) {
    const assets = sumRecord(nw.input_state?.assets)
    const liabs = sumRecord(nw.input_state?.liabs)
    if (assets !== null && liabs !== null) {
      insights.push({
        icon: Wallet,
        title: `Net worth snapshot: ${money(assets - liabs)}`,
        body: `From your latest Net Worth Tracker scenario — ${money(assets)} in assets against ${money(liabs)} in liabilities. Reopen it whenever your balances change.`,
      })
    }
  }

  // Hub composition.
  if (calculators.length >= 3) {
    const counts = new Map<string, number>()
    for (const c of calculators) counts.set(hubNameOf(c), (counts.get(hubNameOf(c)) ?? 0) + 1)
    const [topHub, topCount] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]
    const share = Math.round((topCount / calculators.length) * 100)
    insights.push({
      icon: Compass,
      title: `${share}% of your vault is ${topHub}`,
      body:
        counts.size < navigationCategories.length
          ? `Your planning concentrates in ${topHub}. Hubs you have not saved in yet: ${navigationCategories.filter((c) => !counts.has(c.name)).slice(0, 3).map((c) => c.name).join(', ')}.`
          : `Your planning is spread across every hub, led by ${topHub}.`,
    })
  }

  // Compare-ready tools.
  const byTool = new Map<string, number>()
  for (const c of calculators) {
    const slug = SCENARIO_SLUG_ALIASES[c.calculator_slug] ?? c.calculator_slug
    byTool.set(slug, (byTool.get(slug) ?? 0) + 1)
  }
  const multi = [...byTool.entries()].filter(([, n]) => n >= 2)
  if (multi.length > 0) {
    insights.push({
      icon: Scale,
      title: `${multi.length} tool${multi.length === 1 ? ' has' : 's have'} multiple scenarios`,
      body: 'Tick “Compare” on two or three scenarios of the same tool in your Vault to see them side by side and spot the better plan.',
    })
  }

  // Stale scenarios.
  const stale = calculators.filter(
    (c) => Date.now() - new Date(c.last_updated).getTime() > 30 * 24 * 3600 * 1000,
  )
  if (stale.length > 0) {
    insights.push({
      icon: History,
      title: `${stale.length} scenario${stale.length === 1 ? ' has' : 's have'} not been updated in 30+ days`,
      body: 'Rates and balances drift. Reopening a stale scenario and re-saving it keeps your analytics honest.',
    })
  }

  // Shared scenarios.
  const shared = calculators.filter((c) => c.is_public).length
  if (shared > 0) {
    insights.push({
      icon: Share2,
      title: `${shared} shared scenario${shared === 1 ? '' : 's'}`,
      body: 'Shared scenarios can be opened by anyone with the link. Private ones stay visible only to you.',
    })
  }

  return insights
}

export function InsightsPanel({ calculators }: { calculators: SavedCalculator[] }) {
  const insights = buildInsights(calculators)
  if (insights.length === 0) return null
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" /> Insights from your Vault
        </CardTitle>
        <CardDescription>
          Computed on the spot from your saved scenarios — no AI service, no data leaves your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {insights.map((ins) => (
          <div key={ins.title} className="rounded-2xl border bg-muted/30 p-4">
            <p className="flex items-center gap-2 font-bold">
              <ins.icon className="h-4.5 w-4.5 text-[#064E3B]" /> {ins.title}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{ins.body}</p>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed p-4">
          <p className="font-bold">Want the full picture?</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Every calculator you save sharpens these insights.{' '}
            <Link href="/tools" className="font-semibold text-[#064E3B] underline">
              Browse the tools
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
