/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Calculator,
  ChevronRight,
  Clock,
  Crown,
  MapPin,
  Search,
  ShieldCheck,
  Smartphone,
  Star,
  X,
  Zap,
} from 'lucide-react'
import {
  navigationCategories,
  getToolUrl,
  type CalculatorItem,
  type Category,
} from '@/config/navigation'
import { GUIDES } from '@/data/guides'

/**
 * Mobile-only homepage (rendered below the md breakpoint by src/app/page.tsx).
 * App-style layout: search-first hero, popular tools, localStorage-powered
 * favourites + recents ("Your tools"), category list, Pro banner, guides
 * strip, trust row and an add-to-home-screen tip. The desktop homepage is a
 * separate tree and is untouched by this component.
 */

type ToolWithCategory = { tool: CalculatorItem; category: Category }

const MY_TOOLS_KEY = 'df-my-tools'
const A2HS_KEY = 'df-a2hs-dismissed'
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

export function MobileHome() {
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [favourites, setFavourites] = useState<string[]>([])
  const [recents, setRecents] = useState<string[]>([])
  const [showA2hs, setShowA2hs] = useState(false)

  // Flatten every tool once, keeping its category for labels and icon colours.
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

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allTools
      .filter(
        ({ tool, category }) =>
          tool.title.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          category.name.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query, allTools])

  useEffect(() => {
    const stored = loadMyTools()
    setFavourites(stored.favourites)
    setRecents(stored.recents)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    let dismissed = false
    try {
      dismissed = window.localStorage.getItem(A2HS_KEY) === '1'
    } catch {
      dismissed = false
    }
    setShowA2hs(!standalone && !dismissed)
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

  const dismissA2hs = () => {
    setShowA2hs(false)
    try {
      window.localStorage.setItem(A2HS_KEY, '1')
    } catch {
      // Ignore: the card simply returns next visit.
    }
  }

  const favouriteTools = favourites.map((slug) => toolBySlug.get(slug)).filter(Boolean) as ToolWithCategory[]
  const recentTools = recents.map((slug) => toolBySlug.get(slug)).filter(Boolean) as ToolWithCategory[]
  const hasYourTools = favouriteTools.length > 0 || recentTools.length > 0

  const renderToolRow = (entry: ToolWithCategory, opts?: { showStar?: boolean }) => {
    const { tool, category } = entry
    const Icon = tool.icon || Calculator
    const isFav = favourites.includes(tool.slug)
    return (
      <div
        key={tool.slug}
        className="relative flex items-center gap-3 rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm transition-transform active:scale-[0.98]"
      >
        <Link
          href={getToolUrl(tool.slug)}
          onClick={() => recordRecent(tool.slug)}
          aria-label={tool.title}
          className="absolute inset-0 z-0 rounded-3xl"
        />
        <div className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${category.colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="relative z-10 min-w-0 flex-1 pointer-events-none">
          <p className="truncate text-[15px] font-bold leading-snug text-[#1F2937]">{tool.title}</p>
          <p className="truncate text-[13px] font-light text-neutral-500">{category.name}</p>
        </div>
        {opts?.showStar !== false && (
          <button
            type="button"
            onClick={() => toggleFavourite(tool.slug)}
            aria-label={isFav ? `Remove ${tool.title} from favourites` : `Save ${tool.title} to favourites`}
            aria-pressed={isFav}
            className="relative z-20 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform active:scale-90"
          >
            <Star
              className={`h-5 w-5 ${isFav ? 'fill-[#D97706] text-[#D97706]' : 'text-neutral-300'}`}
            />
          </button>
        )}
        <ChevronRight className="relative z-10 h-5 w-5 shrink-0 text-neutral-300 pointer-events-none" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] pb-8">
      {/* ── 1 · Hero ─────────────────────────────────────────── */}
      <header className="bg-white px-5 pb-6 pt-5">
        <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#1F2937]">
          100+ free <span className="text-[#064E3B]">financial calculators</span>
        </h1>
        <p className="mt-2.5 text-[15px] font-light leading-relaxed text-neutral-500">
          Mortgages, paychecks, taxes, loans and savings — worked out in seconds. No sign-up to calculate.
        </p>

        {/* Search */}
        <div className="relative z-30 mt-5">
          <div
            className={`flex items-center rounded-2xl border-2 bg-white transition-all ${
              searchFocused ? 'border-[#064E3B] shadow-[0_12px_32px_-12px_rgba(6,78,59,0.35)]' : 'border-neutral-200/70 shadow-sm'
            }`}
          >
            <span className="flex items-center justify-center pl-4 pr-2">
              <Search className={`h-5 w-5 ${searchFocused ? 'text-[#064E3B]' : 'text-neutral-400'}`} />
            </span>
            <input
              type="text"
              inputMode="search"
              placeholder="Search calculators — try “mortgage”"
              className="w-full bg-transparent py-3.5 pr-4 text-base font-medium text-foreground outline-none placeholder:text-neutral-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              aria-label="Search calculators"
            />
          </div>

          {query.trim().length > 0 && searchFocused && (
            <div className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)]">
              {searchResults.length > 0 ? (
                <div className="max-h-[60vh] overflow-y-auto py-1.5">
                  {searchResults.map(({ tool, category }) => {
                    const Icon = tool.icon || Calculator
                    return (
                      <Link
                        key={tool.slug}
                        href={getToolUrl(tool.slug)}
                        onClick={() => recordRecent(tool.slug)}
                        className="flex items-center gap-3 px-4 py-3 transition-colors active:bg-neutral-50"
                      >
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${category.colorClass}`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-bold text-[#1F2937]">{tool.title}</span>
                          <span className="block truncate text-[13px] font-light text-neutral-500">{category.name}</span>
                        </span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-neutral-300" />
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <p className="px-4 py-5 text-center text-sm font-light text-neutral-500">
                  No calculators match “{query.trim()}”. Try “tax”, “loan” or “ROI”.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Quick chips */}
        <div className="-mx-5 mt-4 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2">
            {quickChips.map((chip) => (
              <Link
                key={chip.slug + chip.label}
                href={chip.href}
                onClick={() => recordRecent(chip.slug)}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-[#1F2937] shadow-sm transition-transform active:scale-95"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* ── 2 · Popular tools ────────────────────────────────── */}
      <section className="px-5 pt-7">
        <h2 className="mb-3.5 text-lg font-extrabold tracking-tight text-[#1F2937]">Popular tools</h2>
        <div className="grid grid-cols-2 gap-3">
          {popularTools.map(({ tool, category }) => {
            const Icon = tool.icon || Calculator
            const isFav = favourites.includes(tool.slug)
            return (
              <div
                key={tool.slug}
                className="relative flex min-h-[132px] flex-col rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm transition-transform active:scale-[0.98]"
              >
                <Link
                  href={getToolUrl(tool.slug)}
                  onClick={() => recordRecent(tool.slug)}
                  aria-label={tool.title}
                  className="absolute inset-0 z-0 rounded-3xl"
                />
                <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl ${category.colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="relative z-10 mt-3 pr-6 text-[14px] font-bold leading-snug text-[#1F2937] pointer-events-none">
                  {tool.title}
                </p>
                <button
                  type="button"
                  onClick={() => toggleFavourite(tool.slug)}
                  aria-label={isFav ? `Remove ${tool.title} from favourites` : `Save ${tool.title} to favourites`}
                  aria-pressed={isFav}
                  className="absolute right-2.5 top-2.5 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-transform active:scale-90"
                >
                  <Star className={`h-5 w-5 ${isFav ? 'fill-[#D97706] text-[#D97706]' : 'text-neutral-300'}`} />
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 3 · Your tools (favourites + recents) ────────────── */}
      {mounted && (
        <section className="px-5 pt-8">
          <h2 className="mb-3.5 text-lg font-extrabold tracking-tight text-[#1F2937]">Your tools</h2>
          {hasYourTools ? (
            <div className="flex flex-col gap-5">
              {favouriteTools.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-neutral-400">
                    <Star className="h-3.5 w-3.5 fill-[#D97706] text-[#D97706]" /> Pinned
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {favouriteTools.map((entry) => renderToolRow(entry))}
                  </div>
                </div>
              )}
              {recentTools.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-neutral-400">
                    <Clock className="h-3.5 w-3.5" /> Recently used
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {recentTools.map((entry) => renderToolRow(entry))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="flex items-center gap-2 rounded-3xl border border-dashed border-neutral-200 bg-white/60 px-4 py-3.5 text-sm font-light text-neutral-500">
              <Star className="h-4 w-4 shrink-0 text-neutral-300" />
              Star a tool to pin it here — your pins and recent tools stay on this device.
            </p>
          )}
        </section>
      )}

      {/* ── 4 · Categories ───────────────────────────────────── */}
      <section className="px-5 pt-8">
        <h2 className="mb-3.5 text-lg font-extrabold tracking-tight text-[#1F2937]">Categories</h2>
        <div className="flex flex-col gap-2.5">
          {navigationCategories.map((category) => {
            const Icon = category.icon || Calculator
            return (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="flex items-center gap-3.5 rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm transition-transform active:scale-[0.98]"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${category.colorClass}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="truncate text-[15px] font-bold text-[#1F2937]">{category.name}</span>
                    <span className="shrink-0 text-[12px] font-semibold text-neutral-400">
                      {category.calculators.length} tools
                    </span>
                  </span>
                  <span className="block truncate text-[13px] font-light text-neutral-500">{category.description}</span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-neutral-300" />
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── 5 · Pro banner ───────────────────────────────────── */}
      <section className="px-5 pt-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#0B7A5C] p-6 text-white shadow-lg">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
              <Crown className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-extrabold tracking-tight">DailyFinance Pro</h2>
            <span className="ml-auto rounded-full bg-[#D97706] px-2.5 py-1 text-[12px] font-extrabold">$2.99/mo</span>
          </div>
          <p className="text-sm font-light leading-relaxed text-white/85">
            Save unlimited calculations in the Scenario Vault, unlock cross-data analytics, CSV and PDF exports — with zero ads.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#064E3B] shadow transition-transform active:scale-95"
          >
            See what Pro includes <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── 6 · Guides strip ─────────────────────────────────── */}
      <section className="pt-8">
        <div className="mb-3.5 flex items-baseline justify-between px-5">
          <h2 className="text-lg font-extrabold tracking-tight text-[#1F2937]">Guides</h2>
          <Link href="/guides" className="text-sm font-bold text-[#064E3B]">
            All guides
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GUIDES.slice(0, 6).map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="flex w-[238px] shrink-0 snap-start flex-col rounded-3xl border border-neutral-100 bg-white p-5 shadow-sm transition-transform active:scale-[0.98]"
            >
              <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#064E3B]">{guide.hub}</span>
              <span className="text-[15px] font-bold leading-snug text-[#1F2937]">{guide.title}</span>
              <span className="mt-2 line-clamp-3 text-[13px] font-light leading-relaxed text-neutral-500">{guide.description}</span>
            </Link>
          ))}
          <Link
            href="/guides/states"
            className="flex w-[238px] shrink-0 snap-start flex-col rounded-3xl bg-[#064E3B] p-5 text-white shadow-sm transition-transform active:scale-[0.98]"
          >
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
              <MapPin className="h-5 w-5" />
            </span>
            <span className="text-[15px] font-bold leading-snug">State tax guides</span>
            <span className="mt-2 text-[13px] font-light leading-relaxed text-white/85">
              Sales, income and property tax explained for every state and the 30 largest cities.
            </span>
          </Link>
        </div>
      </section>

      {/* ── 7 · Trust row ────────────────────────────────────── */}
      <section className="px-5 pt-8">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: Calculator, label: '100+ free tools' },
            { icon: Zap, label: 'No sign-up to calculate' },
            { icon: ShieldCheck, label: 'Your data stays private' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-3xl border border-neutral-100 bg-white px-2 py-4 text-center shadow-sm"
              >
                <Icon className="h-5 w-5 text-[#064E3B]" />
                <span className="text-[12px] font-bold leading-tight text-[#1F2937]">{item.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 8 · Add to home screen ───────────────────────────── */}
      {mounted && showA2hs && (
        <section className="px-5 pt-6">
          <div className="relative rounded-3xl border border-[#064E3B]/15 bg-[#064E3B]/[0.04] p-5">
            <button
              type="button"
              onClick={dismissA2hs}
              aria-label="Dismiss home screen tip"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-transform active:scale-90"
            >
              <X className="h-4.5 w-4.5" />
            </button>
            <div className="flex items-start gap-3.5 pr-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#064E3B] text-white">
                <Smartphone className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-[15px] font-bold text-[#1F2937]">Add DailyFinance to your home screen</h2>
                <p className="mt-1 text-[13px] font-light leading-relaxed text-neutral-500">
                  App-like access, one tap away: open your browser menu and tap “Add to Home Screen”.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
