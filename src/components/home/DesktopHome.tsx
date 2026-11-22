'use client'

import React, { useRef, useState } from 'react'
import { GuideImage } from "@/components/shared/GuideImage"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  ChevronRight,
  Clock,
  Code2,
  Crown,
  Globe2,
  Lock,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { navigationCategories, getToolUrl, TOOL_COUNTS } from '@/config/navigation'
import { GUIDES } from '@/data/guides'
import { CalcWord } from '@/components/home/CalcWord'
import { useMyTools, type SearchHit, type ToolWithCategory } from '@/components/home/useMyTools'

/**
 * DesktopHome — the desktop homepage (md+), rebuilt to the same standard as
 * the mobile app-style homepage: search-first hero with the animated
 * "calculators" word, Your Tools retention (shared localStorage state with
 * mobile via useMyTools), popular tools with pin-to-favorite, category
 * cards, Pro banner, embed band, hubs, guides and the trust row. All counts and links
 * come from the live navigation/guide data — nothing is hard-coded.
 */
export function DesktopHome() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const {
    mounted,
    favourites,
    toggleFavourite,
    recordRecent,
    allTools,
    popularTools,
    quickChips,
    favouriteTools,
    recentTools,
    hasYourTools,
    searchTools,
    searchGuides,
    ensureGuideIndex,
  } = useMyTools()

  // Search covers calculators AND guides (Kashif, 2026-11-21): up to 5
  // tools, then up to 3 guides, in one keyboard-navigable list.
  const toolResults = searchTools(query, 5)
  const guideResults = searchGuides(query, 3)
  const searchResults: SearchHit[] = [
    ...toolResults.map((t): SearchHit => ({ kind: 'tool', ...t })),
    ...guideResults.map((g): SearchHit => ({ kind: 'guide', guide: g })),
  ]
  const trimmedQuery = query.trim()
  const showDropdown = trimmedQuery.length > 0 && searchFocused
  const resultsHref = `/search?q=${encodeURIComponent(trimmedQuery)}`
  // Full count for the "See all results" row (the dropdown shows the top 8).
  const totalResults = showDropdown
    ? searchTools(query, Number.MAX_SAFE_INTEGER).length + searchGuides(query, Number.MAX_SAFE_INTEGER).length
    : 0

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (searchResults.length === 0) return
      setHighlighted((h) =>
        e.key === 'ArrowDown'
          ? (h + 1) % searchResults.length
          : (h - 1 + searchResults.length) % searchResults.length
      )
    } else if (e.key === 'Enter') {
      const hit = highlighted >= 0 ? searchResults[highlighted] : undefined
      if (hit) {
        if (hit.kind === 'tool') {
          recordRecent(hit.tool.slug)
          router.push(getToolUrl(hit.tool.slug))
        } else {
          router.push(`/guides/${hit.guide.slug}`)
        }
      } else if (trimmedQuery) {
        router.push(resultsHref)
      }
    } else if (e.key === 'Escape') {
      setSearchFocused(false)
      setHighlighted(-1)
      searchInputRef.current?.blur()
    }
  }

  // The id of the currently highlighted result, for aria-activedescendant.
  const activeHitId =
    highlighted >= 0 && searchResults[highlighted]
      ? searchResults[highlighted].kind === 'tool'
        ? `desktop-search-result-${searchResults[highlighted].tool.slug}`
        : `desktop-search-result-guide-${searchResults[highlighted].guide.slug}`
      : undefined

  const renderToolCard = (entry: ToolWithCategory) => {
    const { tool, category } = entry
    const Icon = tool.icon || Calculator
    const isFav = favourites.includes(tool.slug)
    return (
      <div
        key={tool.slug}
        className="group relative flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#064E3B]/40 hover:shadow-[0_20px_40px_-16px_rgba(6,78,59,0.18)]"
      >
        <Link
          href={getToolUrl(tool.slug)}
          onClick={() => recordRecent(tool.slug)}
          aria-label={tool.title}
          className="absolute inset-0 z-0 rounded-3xl"
        />
        <div className="relative z-10 flex items-start justify-between">
          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category.colorClass}`}>
            <Icon className="h-6 w-6" />
          </span>
          <button
            type="button"
            onClick={() => toggleFavourite(tool.slug)}
            aria-label={isFav ? `Remove ${tool.title} from favorites` : `Save ${tool.title} to favorites`}
            aria-pressed={isFav}
            className="relative z-20 flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:scale-110"
          >
            <Star className={`h-5 w-5 ${isFav ? 'fill-[#D97706] text-[#D97706]' : 'text-muted-foreground/60'}`} />
          </button>
        </div>
        <h3 className="relative z-10 mt-4 text-lg font-bold leading-snug tracking-tight text-foreground pointer-events-none">
          {tool.title}
        </h3>
        <p className="relative z-10 mt-1.5 line-clamp-2 text-sm font-light leading-relaxed text-muted-foreground pointer-events-none">
          {tool.description}
        </p>
        <span className="relative z-10 mt-auto inline-flex items-center pt-4 text-sm font-bold text-foreground transition-colors group-hover:text-[#064E3B] pointer-events-none">
          Open tool
          <ArrowRight className="ml-1.5 h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ── 1 · Hero ─────────────────────────────────────────── */}
      {/* overflow-x-clip (not overflow-hidden): the search dropdown is
          absolutely positioned inside this section and must be allowed to
          extend below it — overflow-hidden clipped the results on desktop. */}
      <section className="relative overflow-x-clip bg-card">
        {/* Lightly blended artistic finance background (Kashif, 2026-11-21):
            flat-vector motifs at the edges, empty centre, faded out toward
            the bottom so it melts into the section below. Light mode only —
            dark mode keeps the glow blobs. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 dark:hidden">
          <img
            src="/images/hero-bg.jpg"
            alt=""
            className="h-full w-full object-cover opacity-40 [mask-image:linear-gradient(to_bottom,black_45%,transparent_96%)]"
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-24 h-72 w-72 rounded-full bg-amber-500/[0.08] blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-20 pt-24 text-center lg:px-8">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#064E3B]/[0.06] px-4 py-2 text-sm font-semibold text-[#064E3B]">
            <span className="h-2 w-2 rounded-full bg-[#D97706]" />
            {TOOL_COUNTS.free} free calculators — no sign-up to calculate
          </span>
          {/* div, not h1: MobileHome carries the page's single H1 (mobile-first indexing); this desktop hero is the visual twin. */}
          <div className="text-6xl font-extrabold leading-[1.04] tracking-tight text-foreground lg:text-7xl">
            {TOOL_COUNTS.free} free <span className="text-[#064E3B]">financial</span> <CalcWord />
          </div>
          <p className="mt-6 max-w-2xl text-xl font-light leading-relaxed text-muted-foreground">
            Mortgages, paychecks, taxes, loans and savings — worked out in seconds, with the formula and a
            worked example on every page.
          </p>

          {/* Search */}
          <div className="relative z-40 mt-10 w-full max-w-2xl">
            <div
              className={`flex items-center rounded-2xl border-2 bg-card transition-all ${
                searchFocused
                  ? 'border-[#064E3B] shadow-[0_16px_40px_-12px_rgba(6,78,59,0.35)]'
                  : 'border-border/70 shadow-sm hover:border-[#064E3B]/40'
              }`}
            >
              <span className="flex items-center justify-center pl-5 pr-2">
                <Search className={`h-6 w-6 ${searchFocused ? 'text-[#064E3B]' : 'text-muted-foreground'}`} />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search calculators and guides — try “mortgage”, “paycheck”, “ROI”…"
                className="w-full bg-transparent py-[18px] pr-4 text-lg font-medium text-foreground outline-none placeholder:text-muted-foreground"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setHighlighted(-1)
                  ensureGuideIndex()
                }}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => {
                  setSearchFocused(true)
                  ensureGuideIndex()
                }}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                aria-label="Search calculators and guides"
                aria-expanded={showDropdown}
                aria-activedescendant={activeHitId}
              />
              <span className="mr-4 hidden items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground lg:flex">
                {allTools.length} tools
              </span>
            </div>

            {showDropdown && (
              <div
                role="listbox"
                aria-label="Search results"
                className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)]"
              >
                {searchResults.length > 0 ? (
                  <>
                    <div className="max-h-[55vh] overflow-y-auto py-1.5">
                      {toolResults.length > 0 && (
                        <p className="px-5 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Calculators
                        </p>
                      )}
                      {toolResults.map(({ tool, category }, i) => {
                        const Icon = tool.icon || Calculator
                        return (
                          <Link
                            key={tool.slug}
                            id={`desktop-search-result-${tool.slug}`}
                            role="option"
                            aria-selected={i === highlighted}
                            href={getToolUrl(tool.slug)}
                            onClick={() => recordRecent(tool.slug)}
                            onMouseEnter={() => setHighlighted(i)}
                            className={`flex items-center gap-4 px-5 py-3 transition-colors hover:bg-muted ${i === highlighted ? 'bg-muted' : ''}`}
                          >
                            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${category.colorClass}`}>
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[15px] font-bold text-foreground">{tool.title}</span>
                              <span className="block truncate text-[13px] font-light text-muted-foreground">{category.name}</span>
                            </span>
                            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60" />
                          </Link>
                        )
                      })}
                      {guideResults.length > 0 && (
                        <p className="px-5 pb-1 pt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Guides
                        </p>
                      )}
                      {guideResults.map((g, j) => {
                        const i = toolResults.length + j
                        return (
                          <Link
                            key={g.slug}
                            id={`desktop-search-result-guide-${g.slug}`}
                            role="option"
                            aria-selected={i === highlighted}
                            href={`/guides/${g.slug}`}
                            onMouseEnter={() => setHighlighted(i)}
                            className={`flex items-center gap-4 px-5 py-3 transition-colors hover:bg-muted ${i === highlighted ? 'bg-muted' : ''}`}
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#064E3B]/[0.06] text-[#064E3B] dark:text-emerald-400">
                              <BookOpen className="h-5 w-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[15px] font-bold text-foreground">{g.title}</span>
                              <span className="block truncate text-[13px] font-light text-muted-foreground">{g.hub} · {g.readMinutes} min read</span>
                            </span>
                            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60" />
                          </Link>
                        )
                      })}
                    </div>
                    <Link
                      href={resultsHref}
                      className="flex items-center gap-4 border-t border-border px-5 py-3.5 transition-colors hover:bg-muted"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#064E3B]/[0.06] text-[#064E3B]">
                        <Search className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1 text-[15px] font-bold text-foreground">
                        See all {totalResults} result{totalResults === 1 ? '' : 's'} for “{trimmedQuery}”
                      </span>
                      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60" />
                    </Link>
                  </>
                ) : (
                  <p className="px-5 py-6 text-center text-sm font-light text-muted-foreground">
                    Nothing matches “{query.trim()}”. Try “tax”, “loan” or “ROI”.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Quick chips */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <span className="mr-1 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <TrendingUp className="h-4 w-4" /> Trending:
            </span>
            {quickChips.map((chip) => (
              <Link
                key={chip.slug + chip.label}
                href={chip.href}
                onClick={() => recordRecent(chip.slug)}
                className="inline-flex min-h-12 items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#064E3B]/50 hover:text-[#064E3B]"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2 · Your tools ───────────────────────────────────── */}
      {mounted && hasYourTools && (
        <section className="bg-background pt-16">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-foreground">Your tools</h2>
            {favouriteTools.length > 0 && (
              <div className="mb-8">
                <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-[#D97706] text-[#D97706]" /> Pinned
                </p>
                <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                  {favouriteTools.slice(0, 4).map((entry) => renderToolCard(entry))}
                </div>
              </div>
            )}
            {recentTools.length > 0 && (
              <div>
                <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> Recently used
                </p>
                <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                  {recentTools.slice(0, 4).map((entry) => renderToolCard(entry))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 3 · Popular tools ────────────────────────────────── */}
      <section className="bg-background pt-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Popular tools</h2>
              <p className="mt-2 font-light text-muted-foreground">The calculators people reach for every day. Star one to pin it to Your tools.</p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#064E3B] px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#043327]"
            >
              View all {allTools.length} tools <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {popularTools.map((entry) => renderToolCard(entry))}
          </div>
        </div>
      </section>

      {/* ── 4 · Categories ───────────────────────────────────── */}
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground">Browse by category</h2>
          <p className="mb-8 font-light text-muted-foreground">{navigationCategories.length} families of tools, organized by the decision you are making.</p>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
            {navigationCategories.map((category) => {
              const Icon = category.icon || Calculator
              return (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="group flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#064E3B]/40 hover:shadow-[0_20px_40px_-16px_rgba(6,78,59,0.18)]"
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${category.colorClass}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-2">
                      <span className="truncate text-lg font-bold text-foreground transition-colors group-hover:text-[#064E3B]">{category.name}</span>
                      <span className="shrink-0 text-xs font-semibold text-muted-foreground">{category.calculators.length} tools</span>
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm font-light leading-relaxed text-muted-foreground">{category.description}</span>
                  </span>
                </Link>
              )
            })}
            <Link
              href="/locations"
              className="group flex items-start gap-4 rounded-3xl bg-[#064E3B] p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(6,78,59,0.4)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <MapPin className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="text-lg font-bold">Sales tax by state</span>
                <span className="mt-1 line-clamp-2 block text-sm font-light leading-relaxed text-white/85">
                  Combined rates, worked examples and guides for all 50 states and the 30 largest cities.
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5 · Pro banner ───────────────────────────────────── */}
      <section className="bg-card py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#0B7A5C] text-white shadow-xl">
            <div className="grid items-center gap-10 p-10 lg:grid-cols-[1.4fr_1fr] lg:p-14">
              <div>
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                    <Crown className="h-5 w-5" />
                  </span>
                  <h2 className="text-2xl font-extrabold tracking-tight">DailyFinance Pro</h2>
                </div>
                <p className="max-w-xl font-light leading-relaxed text-white/85">
                  {TOOL_COUNTS.free} calculators stay free forever. Pro turns DailyFinance into your personal financial drive:
                  unlimited Scenario Vault, CSV and Excel exports, premium PDF reports and cross-data
                  analytics.
                </p>
                <ul className="mt-6 grid max-w-xl grid-cols-2 gap-x-6 gap-y-2.5 text-sm font-medium text-white/90">
                  {['Unlimited Vault saves', 'CSV & Excel exports', 'Premium PDF reports', 'Cross-data analytics', 'Live sharing', 'Priority support'].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-amber-300" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-white/10 p-8 text-center backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/70">From</p>
                <p className="mt-1 text-5xl font-extrabold tracking-tight">
                  $2.99<span className="text-xl font-semibold text-white/70">/mo</span>
                </p>
                <p className="mt-2 text-sm font-light text-white/75">Free plan includes 3 Vault saves — no card required.</p>
                <Link
                  href="/pricing"
                  className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#064E3B] shadow transition-transform hover:scale-[1.02]"
                >
                  See what Pro includes <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 · Embed band (with Pro) ──────────────────────────── */}
      <section className="bg-card pb-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-primary/20 bg-primary/5">
            <div className="grid items-center gap-10 p-10 lg:grid-cols-[1.4fr_1fr] lg:p-14">
              <div>
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#064E3B] text-white">
                    <Code2 className="h-5 w-5" />
                  </span>
                  <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Put our calculators on your site</h2>
                </div>
                <p className="max-w-xl font-light leading-relaxed text-muted-foreground">
                  Embed any of the {TOOL_COUNTS.free} free calculators on your own website — free. One line of code,
                  auto-sizing to fit, with DailyFinance branding and a link back. No account needed.
                </p>
                <Link
                  href="/embed"
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#064E3B] px-6 py-3 text-sm font-bold text-white shadow transition-transform hover:scale-[1.02]"
                >
                  See how embeds work <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="rounded-2xl bg-[#0B1F17] p-5 shadow-inner">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-300/70">One line of code</p>
                <code className="block break-all font-mono text-[13px] leading-relaxed text-emerald-100">
                  &lt;script src=&quot;https://www.dailyfinance.tools/embed.js&quot; data-calculator=&quot;mortgage-payment-calculator&quot;&gt;&lt;/script&gt;
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 · Guides ───────────────────────────────────────── */}
      <section className="bg-card py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground">Guides with the numbers left in</h2>
              <p className="font-light leading-relaxed text-muted-foreground">
                Plain-language explanations of how the money math works — plus a tax guide for every state
                and the 30 largest cities.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/guides" className="inline-flex items-center gap-2 rounded-full bg-[#064E3B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#053f30]">
                All guides <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/guides/states" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-[#064E3B] hover:text-[#064E3B]">
                State guides
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {GUIDES.slice(0, 8).map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#064E3B]/40 hover:shadow-[0_20px_40px_-16px_rgba(6,78,59,0.18)]"
              >
                <GuideImage src={g.image} alt={g.imageAlt} imgClassName="aspect-video w-full object-cover" />
                <span className="block p-6">
                  <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-[#064E3B]">{g.hub}</span>
                  <span className="mb-2 block font-bold leading-snug text-foreground transition-colors group-hover:text-[#064E3B]">{g.title}</span>
                  <span className="line-clamp-3 block text-sm font-light leading-relaxed text-muted-foreground">{g.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8 · Trust / philosophy ─────────────────────────────
          Compact crafted band (Kashif, 2026-11-21): a deep-emerald panel,
          deliberately a different colour from the footer below it. */}
      <section className="bg-background py-12">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-[#064E3B] px-6 py-8 text-white md:px-10 md:py-10">
            <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D97706]">The way we build</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-[28px]">Every formula shown. Every figure sourced.</h2>
              </div>
              <p className="max-w-sm text-sm font-light leading-relaxed text-white/70">
                No black boxes. Open any calculator and the maths is on the page, reviewed by Tahir Shehzad, ACMA.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-7 xl:grid-cols-4">
              {[
                { icon: Zap, title: 'Instant in your browser', text: 'Every calculation runs on your device. No server round-trips, no loading spinners.' },
                { icon: Globe2, title: 'Six currencies', text: 'Switch currency in the header. Nomad costs and localized scenarios included.' },
                { icon: Lock, title: 'Private by design', text: 'Only scenarios you choose to save ever leave your device.' },
                { icon: Crown, title: 'Pro when you need it', text: 'Unlock the Vault, comparisons and PDF reports at $2.99 a month.' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex flex-col items-start">
                    <span className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#D97706]/15 text-[#D97706]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mb-1.5 text-[15px] font-bold tracking-tight text-white">{item.title}</h3>
                    <p className="text-sm font-light leading-relaxed text-white/70">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
