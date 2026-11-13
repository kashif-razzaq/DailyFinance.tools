/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useMemo, useState } from 'react'
import { searchEntries } from '@/lib/tool-search'
import {
  navigationCategories,
  getToolUrl,
  type CalculatorItem,
  type Category,
} from '@/config/navigation'

/**
 * useMyTools — the homepage retention engine, shared by the mobile and
 * desktop homepages. Favourites + recents live in localStorage
 * ('df-my-tools') so both layouts read the same on-device state, and all
 * tool picks resolve against the live navigation data (a renamed tool can
 * never produce a dead link).
 */
export type ToolWithCategory = { tool: CalculatorItem; category: Category }

const MY_TOOLS_KEY = 'df-my-tools'
const MAX_RECENTS = 6

type MyTools = { favourites: string[]; recents: string[] }

function loadMyTools(): MyTools {
  try {
    const raw = window.localStorage.getItem(MY_TOOLS_KEY)
    if (!raw) return { favourites: [], recents: [] }
    const parsed = JSON.parse(raw) as Partial<MyTools>
    return {
      favourites: Array.isArray(parsed.favourites) ? parsed.favourites.filter((s) => typeof s === 'string') : [],
      recents: Array.isArray(parsed.recents) ? parsed.recents.filter((s) => typeof s === 'string') : [],
    }
  } catch {
    return { favourites: [], recents: [] }
  }
}

function saveMyTools(tools: MyTools) {
  try {
    window.localStorage.setItem(MY_TOOLS_KEY, JSON.stringify(tools))
  } catch {
    // Private mode / storage full: retention features degrade silently.
  }
}

// Popular picks: slug candidates in priority order, resolved against the real
// navigation data so a renamed tool never produces a dead link.
const POPULAR_PICKS: string[][] = [
  ['mortgage-calculator', 'mortgage-payment-calculator', 'mortgage-amortization-calculator'],
  ['compound-interest-calculator', 'compound-interest-scaler-calculator'],
  ['loan-calculator'],
  ['paycheck-calculator'],
  ['salary-calculator'],
  ['savings-calculator'],
  ['roi-calculator'],
  ['credit-card-payoff-calculator', 'credit-card-calculator'],
]

const QUICK_CHIPS: { label: string; candidates: string[] }[] = [
  { label: 'Mortgage', candidates: POPULAR_PICKS[0] },
  { label: 'Paycheck', candidates: ['paycheck-calculator'] },
  { label: 'Loan payoff', candidates: ['debt-payoff-calculator', 'loan-calculator'] },
  { label: 'Tax', candidates: ['tax-calculator', 'income-tax-calculator'] },
  { label: 'ROI', candidates: ['roi-calculator'] },
  { label: 'Savings', candidates: ['savings-calculator'] },
]

export function useMyTools() {
  const [mounted, setMounted] = useState(false)
  const [favourites, setFavourites] = useState<string[]>([])
  const [recents, setRecents] = useState<string[]>([])

  const allTools = useMemo<ToolWithCategory[]>(
    () => navigationCategories.flatMap((category) => category.calculators.map((tool) => ({ tool, category }))),
    []
  )
  const toolBySlug = useMemo(() => {
    const map = new Map<string, ToolWithCategory>()
    for (const entry of allTools) map.set(entry.tool.slug, entry)
    return map
  }, [allTools])

  const resolve = (candidates: string[]): ToolWithCategory | undefined => {
    for (const slug of candidates) {
      const hit = toolBySlug.get(slug)
      if (hit) return hit
    }
    return undefined
  }

  const popularTools = useMemo(
    () => POPULAR_PICKS.map((candidates) => resolve(candidates)).filter(Boolean) as ToolWithCategory[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toolBySlug]
  )

  const quickChips = useMemo(
    () =>
      QUICK_CHIPS.map((chip) => {
        const hit = resolve(chip.candidates)
        return hit ? { label: chip.label, href: getToolUrl(hit.tool.slug), slug: hit.tool.slug } : null
      }).filter(Boolean) as { label: string; href: string; slug: string }[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toolBySlug]
  )

  useEffect(() => {
    const stored = loadMyTools()
    setFavourites(stored.favourites)
    setRecents(stored.recents)
    setMounted(true)
  }, [])

  const recordRecent = (slug: string) => {
    setRecents((prev) => {
      const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX_RECENTS)
      saveMyTools({ favourites, recents: next })
      return next
    })
  }

  const toggleFavourite = (slug: string) => {
    setFavourites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev]
      saveMyTools({ favourites: next, recents })
      return next
    })
  }

  const favouriteTools = favourites.map((slug) => toolBySlug.get(slug)).filter(Boolean) as ToolWithCategory[]
  const recentTools = recents.map((slug) => toolBySlug.get(slug)).filter(Boolean) as ToolWithCategory[]
  const hasYourTools = favouriteTools.length > 0 || recentTools.length > 0

  // Live search — delegates to the shared matcher in src/lib/tool-search
  // (same rules as the /tools?q= route). CalculatorItem has no keywords
  // field, so the slug's words act as aliases: "mortgage-amortization-
  // calculator" matches "amortization" even where the title does not say it.
  const searchTools = (query: string, limit = 8): ToolWithCategory[] =>
    searchEntries(
      query,
      allTools,
      ({ tool, category }) => ({
        title: tool.title,
        keywords: tool.slug.split('-'),
        categoryName: category.name,
        description: tool.description,
      }),
      limit
    )

  return {
    mounted,
    favourites,
    recents,
    toggleFavourite,
    recordRecent,
    allTools,
    toolBySlug,
    popularTools,
    quickChips,
    favouriteTools,
    recentTools,
    hasYourTools,
    searchTools,
  }
}
