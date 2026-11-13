'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import {
  Search, FolderGit2, Calculator, ArrowRight, Crown, Scale, X, Clock3,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScenarioCard } from '@/components/dashboard/ScenarioCard'
import { ProUpgradeModal } from '@/components/shared/ProUpgradeModal'
import {
  navigationCategories,
  SCENARIO_SLUG_ALIASES,
  getScenarioUrl,
  type Category,
} from '@/config/navigation'
import type { SavedCalculator } from '@/types/database'

// Mirrors FREE_VAULT_LIMIT in src/actions/calculator.actions.ts (server-side
// enforcement is the source of truth; this is only for the usage meter).
const FREE_LIMIT = 3

interface HubGroup {
  category: Category | null
  items: SavedCalculator[]
}

function pageSlugOf(calc: SavedCalculator): string {
  return SCENARIO_SLUG_ALIASES[calc.calculator_slug] ?? calc.calculator_slug
}

function categoryOf(calc: SavedCalculator): Category | null {
  const slug = pageSlugOf(calc)
  return navigationCategories.find((c) => c.calculators.some((x) => x.slug === slug)) ?? null
}

function toolTitleOf(calc: SavedCalculator): string {
  const cat = categoryOf(calc)
  const hit = cat?.calculators.find((x) => x.slug === pageSlugOf(calc))
  return hit?.title ?? calc.calculator_slug.replace(/-/g, ' ')
}

function fieldLabel(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/^./, (c) => c.toUpperCase())
}

function fieldValue(v: unknown): string {
  if (v === null || v === undefined) return '—'
  if (typeof v === 'number') return v.toLocaleString('en-US', { maximumFractionDigits: 2 })
  if (typeof v === 'boolean') return v ? 'Yes' : 'No'
  if (Array.isArray(v)) return `${v.length} item${v.length === 1 ? '' : 's'}`
  if (typeof v === 'object') return `${Object.keys(v as object).length} values`
  return String(v)
}

export function VaultBrowser({
  calculators,
  isPro,
}: {
  calculators: SavedCalculator[]
  isPro: boolean
}) {
  const [query, setQuery] = useState('')
  const [hubFilter, setHubFilter] = useState<string>('all')
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [showCompare, setShowCompare] = useState(false)
  const [showProModal, setShowProModal] = useState(false)

  const groups = useMemo<HubGroup[]>(() => {
    const byHub = new Map<string, HubGroup>()
    for (const calc of calculators) {
      const cat = categoryOf(calc)
      const key = cat?.slug ?? 'other'
      if (!byHub.has(key)) byHub.set(key, { category: cat, items: [] })
      byHub.get(key)!.items.push(calc)
    }
    const ordered: HubGroup[] = []
    for (const cat of navigationCategories) {
      const g = byHub.get(cat.slug)
      if (g) {
        ordered.push(g)
        byHub.delete(cat.slug)
      }
    }
    for (const g of byHub.values()) ordered.push(g)
    return ordered
  }, [calculators])

  const comparableTools = useMemo(() => {
    const counts = new Map<string, number>()
    for (const c of calculators) counts.set(pageSlugOf(c), (counts.get(pageSlugOf(c)) ?? 0) + 1)
    return new Set([...counts.entries()].filter(([, n]) => n >= 2).map(([slug]) => slug))
  }, [calculators])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return calculators.filter((c) => {
      if (hubFilter !== 'all' && (categoryOf(c)?.slug ?? 'other') !== hubFilter) return false
      if (!q) return true
      return (
        c.saved_name.toLowerCase().includes(q) ||
        toolTitleOf(c).toLowerCase().includes(q) ||
        c.calculator_slug.replace(/-/g, ' ').includes(q)
      )
    })
  }, [calculators, query, hubFilter])

  const visibleGroups = useMemo(
    () =>
      groups
        .map((g) => ({ ...g, items: g.items.filter((c) => visible.includes(c)) }))
        .filter((g) => g.items.length > 0),
    [groups, visible],
  )

  const lastActivity = calculators.length
    ? new Date(Math.max(...calculators.map((c) => new Date(c.last_updated).getTime())))
    : null
  const jumpBackIn = calculators.length
    ? [...calculators].sort(
        (a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime(),
      )[0]
    : null

  const toggleCompare = (calc: SavedCalculator) => {
    setCompareIds((prev) => {
      if (prev.includes(calc.id)) return prev.filter((id) => id !== calc.id)
      const key = pageSlugOf(calc)
      const sameTool = prev.filter(
        (id) => pageSlugOf(calculators.find((c) => c.id === id)!) === key,
      )
      return [...sameTool, calc.id].slice(-3)
    })
  }

  const compareCalcs = compareIds
    .map((id) => calculators.find((c) => c.id === id))
    .filter((c): c is SavedCalculator => !!c)

  const compareKeys = useMemo(() => {
    const keys: string[] = []
    for (const c of compareCalcs) {
      for (const k of Object.keys(c.input_state ?? {})) {
        if (!keys.includes(k)) keys.push(k)
      }
    }
    return keys
  }, [compareCalcs])

  const openCompare = () => {
    if (compareCalcs.length < 2) return
    if (!isPro) {
      setShowProModal(true)
      return
    }
    setShowCompare(true)
  }

  return (
    <div className="space-y-10">
      {/* ── Overview strip ─────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Saved scenarios</p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight">
            {calculators.length}
            {!isPro && <span className="text-base font-semibold text-muted-foreground"> / {FREE_LIMIT} free</span>}
          </p>
          {!isPro && (
            <>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[#064E3B]"
                  style={{ width: `${Math.min(100, (calculators.length / FREE_LIMIT) * 100)}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {calculators.length >= FREE_LIMIT ? (
                  <>
                    Vault full on Free —{' '}
                    <Link href="/pricing" className="font-semibold text-[#064E3B] underline">
                      Go Pro for unlimited saves
                    </Link>
                  </>
                ) : (
                  `${FREE_LIMIT - calculators.length} free save${FREE_LIMIT - calculators.length === 1 ? '' : 's'} left`
                )}
              </p>
            </>
          )}
          {isPro && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#064E3B]">
              <Crown className="h-3.5 w-3.5" /> Pro — unlimited saves
            </p>
          )}
        </Card>
        <Card className="p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Hubs in use</p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight">{groups.length}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {groups.map((g) => g.category?.name ?? 'Other').join(' · ') || 'None yet'}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Last activity</p>
          <p className="mt-1 flex items-center gap-2 text-lg font-bold tracking-tight">
            <Clock3 className="h-5 w-5 text-muted-foreground" />
            {lastActivity ? formatDistanceToNow(lastActivity, { addSuffix: true }) : '—'}
          </p>
          {jumpBackIn && (
            <Link
              href={`${getScenarioUrl(jumpBackIn.calculator_slug)}?savedId=${jumpBackIn.id}`}
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#064E3B] underline"
            >
              Jump back into {toolTitleOf(jumpBackIn)} <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </Card>
      </div>

      {/* ── Search + hub filter ────────────────────────────────────── */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your scenarios…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setHubFilter('all')}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
              hubFilter === 'all' ? 'bg-[#064E3B] text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            All hubs
          </button>
          {groups.map((g) => {
            const slug = g.category?.slug ?? 'other'
            return (
              <button
                key={slug}
                onClick={() => setHubFilter(slug)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  hubFilter === slug ? 'bg-[#064E3B] text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {g.category?.name ?? 'Other'} · {g.items.length}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Hub sections ───────────────────────────────────────────── */}
      {visibleGroups.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold">No scenarios match</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different search or hub filter.</p>
        </div>
      ) : (
        visibleGroups.map((group) => {
          const HubIcon = group.category?.icon ?? FolderGit2
          return (
            <section key={group.category?.slug ?? 'other'} className="space-y-5">
              <div className="flex items-center gap-3 border-b pb-2">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 ${group.category?.colorClass ?? ''}`}>
                  <HubIcon className="h-4.5 w-4.5 text-primary" />
                </span>
                <h2 className="text-xl font-semibold tracking-tight">
                  {group.category?.name ?? 'Other tools'}
                </h2>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">
                  {group.items.length}
                </span>
                <span className="ml-auto hidden text-xs text-muted-foreground sm:block">
                  {group.category?.description}
                </span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.items.map((calc) => (
                  <ScenarioCard
                    key={calc.id}
                    calc={calc}
                    isPro={isPro}
                    selectable
                    selected={compareIds.includes(calc.id)}
                    onToggleSelect={() => toggleCompare(calc)}
                  />
                ))}
                {group.category && (
                  <Card className="group flex min-h-[250px] cursor-pointer flex-col items-center justify-center border-dashed bg-transparent p-6 text-center transition-colors hover:bg-muted/50">
                    <div className="mb-4 rounded-full bg-muted p-4 transition-transform group-hover:scale-110">
                      <Calculator className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      New {group.category.name} Scenario
                    </h3>
                    <p className="mb-4 text-xs text-muted-foreground">
                      Open the {group.category.name} hub and save a new run.
                    </p>
                    <Link href={`/${group.category.slug}`}>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Browse hub
                      </Button>
                    </Link>
                  </Card>
                )}
              </div>
            </section>
          )
        })
      )}

      {/* ── Compare tray ───────────────────────────────────────────── */}
      {compareIds.length > 0 && (
        <div className="fixed inset-x-4 bottom-20 z-40 flex items-center gap-3 rounded-2xl bg-[#064E3B] px-4 py-3 text-white shadow-2xl md:inset-x-auto md:right-8 md:bottom-8 md:w-auto">
          <Scale className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">
            {compareIds.length} selected
            {compareCalcs.length > 0 && (
              <span className="block text-xs font-normal text-white/70">
                {toolTitleOf(compareCalcs[0])}
                {compareIds.length < 2 && !comparableTools.has(pageSlugOf(compareCalcs[0]))
                  ? ' — only one saved scenario; save another run of this tool to compare'
                  : !isPro
                    ? ' · Pro feature'
                    : ''}
              </span>
            )}
          </p>
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full font-bold"
            disabled={compareIds.length < 2}
            onClick={openCompare}
          >
            Compare
          </Button>
          <button
            onClick={() => setCompareIds([])}
            className="rounded-full p-1.5 hover:bg-white/15"
            aria-label="Clear selection"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ── Compare dialog ─────────────────────────────────────────── */}
      {showCompare && compareCalcs.length >= 2 && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-t-3xl bg-card p-5 shadow-2xl sm:rounded-3xl md:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">
                  Comparing {toolTitleOf(compareCalcs[0])}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Same tool, side by side. Rows that differ are highlighted.
                </p>
              </div>
              <button onClick={() => setShowCompare(false)} className="rounded-full p-2 hover:bg-muted" aria-label="Close comparison">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border-b p-3 text-left font-semibold text-muted-foreground">Field</th>
                    {compareCalcs.map((c) => (
                      <th key={c.id} className="border-b p-3 text-left">
                        <span className="block font-bold">{c.saved_name}</span>
                        <span className="block text-xs font-normal text-muted-foreground">
                          Updated {formatDistanceToNow(new Date(c.last_updated), { addSuffix: true })}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareCalcs.some((c) => c.core_metric !== null && c.core_metric !== undefined) && (
                    <tr className="bg-primary/5">
                      <td className="border-b p-3 font-semibold">Core metric</td>
                      {compareCalcs.map((c) => (
                        <td key={c.id} className="border-b p-3 font-mono font-bold">
                          {c.core_metric !== null && c.core_metric !== undefined
                            ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c.core_metric)
                            : '—'}
                        </td>
                      ))}
                    </tr>
                  )}
                  {compareKeys.map((key) => {
                    const values = compareCalcs.map((c) => fieldValue(c.input_state?.[key]))
                    const differs = new Set(values).size > 1
                    return (
                      <tr key={key} className={differs ? 'bg-amber-500/5' : undefined}>
                        <td className={`border-b p-3 ${differs ? 'font-bold' : 'font-medium text-muted-foreground'}`}>
                          {fieldLabel(key)}
                        </td>
                        {compareCalcs.map((c, i) => (
                          <td key={c.id} className={`border-b p-3 font-mono ${differs ? 'font-semibold' : ''}`}>
                            {values[i]}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {compareCalcs.map((c) => (
                <Link key={c.id} href={`${getScenarioUrl(c.calculator_slug)}?savedId=${c.id}`}>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Open “{c.saved_name}” <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  )
}
