/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { CalcWord } from '@/components/home/CalcWord'
import { GuideImage } from "@/components/shared/GuideImage"
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { navigationCategories, getToolUrl } from '@/config/navigation'
import { useMyTools, type ToolWithCategory } from '@/components/home/useMyTools'
import { GUIDES } from '@/data/guides'

/**
 * Mobile-only homepage (rendered below the md breakpoint by src/app/page.tsx).
 * App-style layout: search-first hero, popular tools, localStorage-powered
 * favourites + recents ("Your tools"), category list, Pro banner, guides
 * strip, trust row and an add-to-home-screen tip. The desktop homepage is a
 * separate tree and is untouched by this component.
 */

const A2HS_KEY = 'df-a2hs-dismissed'

export function MobileHome() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [showA2hs, setShowA2hs] = useState(false)
  const {
    mounted,
    favourites,
    toggleFavourite,
    recordRecent,
    popularTools,
    quickChips,
    favouriteTools,
    recentTools,
    hasYourTools,
    searchTools,
  } = useMyTools()

  const searchResults = searchTools(query)
  const trimmedQuery = query.trim()
  const showDropdown = trimmedQuery.length > 0 && searchFocused
  const resultsHref = `/tools?q=${encodeURIComponent(trimmedQuery)}`
  // Full count for the "See all results" row (the dropdown shows the top 8).
  const totalResults = showDropdown ? searchTools(query, Number.MAX_SAFE_INTEGER).length : 0

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
        recordRecent(hit.tool.slug)
        router.push(getToolUrl(hit.tool.slug))
      } else if (trimmedQuery) {
        router.push(resultsHref)
      }
    } else if (e.key === 'Escape') {
      setSearchFocused(false)
      setHighlighted(-1)
      searchInputRef.current?.blur()
    }
  }

  useEffect(() => {
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
  }, [])

  const dismissA2hs = () => {
    setShowA2hs(false)
    try {
      window.localStorage.setItem(A2HS_KEY, '1')
    } catch {
      // Ignore: the card simply returns next visit.
    }
  }

  const renderToolRow = (entry: ToolWithCategory, opts?: { showStar?: boolean }) => {
    const { tool, category } = entry
    const Icon = tool.icon || Calculator
    const isFav = favourites.includes(tool.slug)
    return (
      <div
        key={tool.slug}
        className="relative flex items-center gap-3 rounded-3xl border border-border bg-card p-4 shadow-sm transition-transform active:scale-[0.98]"
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
          <p className="truncate text-[15px] font-bold leading-snug text-foreground">{tool.title}</p>
          <p className="truncate text-[13px] font-light text-muted-foreground">{category.name}</p>
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
              className={`h-5 w-5 ${isFav ? 'fill-[#D97706] text-[#D97706]' : 'text-muted-foreground/60'}`}
            />
          </button>
        )}
        <ChevronRight className="relative z-10 h-5 w-5 shrink-0 text-muted-foreground/60 pointer-events-none" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-8">
      {/* ── 1 · Hero ─────────────────────────────────────────── */}
      <header className="bg-card px-5 pb-6 pt-5">
        <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-foreground">
          100+ free <span className="text-[#064E3B]">financial</span> <CalcWord />
        </h1>
        <p className="mt-2.5 text-[15px] font-light leading-relaxed text-muted-foreground">
          Mortgages, paychecks, taxes, loans and savings — worked out in seconds. No sign-up to calculate.
        </p>

        {/* Search */}
        <div className="relative z-30 mt-5">
          <div
            className={`flex items-center rounded-2xl border-2 bg-card transition-all ${
              searchFocused ? 'border-[#064E3B] shadow-[0_12px_32px_-12px_rgba(6,78,59,0.35)]' : 'border-border/70 shadow-sm'
            }`}
          >
            <span className="flex items-center justify-center pl-4 pr-2">
              <Search className={`h-5 w-5 ${searchFocused ? 'text-[#064E3B]' : 'text-muted-foreground'}`} />
            </span>
            <input
              ref={searchInputRef}
              type="text"
              inputMode="search"
              placeholder="Search calculators…"
              className="w-full bg-transparent py-3.5 pr-4 text-base font-medium text-foreground outline-none placeholder:text-muted-foreground"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setHighlighted(-1)
              }}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              aria-label="Search calculators"
              aria-expanded={showDropdown}
              aria-activedescendant={
                highlighted >= 0 && searchResults[highlighted]
                  ? `mobile-search-result-${searchResults[highlighted].tool.slug}`
                  : undefined
              }
            />
          </div>

          {showDropdown && (
            <div
              role="listbox"
              aria-label="Search results"
              className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)]"
            >
              {searchResults.length > 0 ? (
                <>
                  <div className="max-h-[60vh] overflow-y-auto py-1.5">
                    {searchResults.map(({ tool, category }, i) => {
                      const Icon = tool.icon || Calculator
                      return (
                        <Link
                          key={tool.slug}
                          id={`mobile-search-result-${tool.slug}`}
                          role="option"
                          aria-selected={i === highlighted}
                          href={getToolUrl(tool.slug)}
                          onClick={() => recordRecent(tool.slug)}
                          onMouseEnter={() => setHighlighted(i)}
                          className={`flex items-center gap-3 px-4 py-3 transition-colors active:bg-muted ${i === highlighted ? 'bg-muted' : ''}`}
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
                  </div>
                  <Link
                    href={resultsHref}
                    className="flex items-center gap-3 border-t border-border px-4 py-3.5 transition-colors active:bg-muted"
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
                <p className="px-4 py-5 text-center text-sm font-light text-muted-foreground">
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
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-transform active:scale-95"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* ── 2 · Popular tools ────────────────────────────────── */}
      <section className="px-5 pt-7">
        <h2 className="mb-3.5 text-lg font-extrabold tracking-tight text-foreground">Popular tools</h2>
        <div className="grid grid-cols-2 gap-3">
          {popularTools.map(({ tool, category }) => {
            const Icon = tool.icon || Calculator
            const isFav = favourites.includes(tool.slug)
            return (
              <div
                key={tool.slug}
                className="relative flex min-h-[132px] flex-col rounded-3xl border border-border bg-card p-4 shadow-sm transition-transform active:scale-[0.98]"
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
                <p className="relative z-10 mt-3 pr-6 text-[14px] font-bold leading-snug text-foreground pointer-events-none">
                  {tool.title}
                </p>
                <button
                  type="button"
                  onClick={() => toggleFavourite(tool.slug)}
                  aria-label={isFav ? `Remove ${tool.title} from favourites` : `Save ${tool.title} to favourites`}
                  aria-pressed={isFav}
                  className="absolute right-2.5 top-2.5 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-transform active:scale-90"
                >
                  <Star className={`h-5 w-5 ${isFav ? 'fill-[#D97706] text-[#D97706]' : 'text-muted-foreground/60'}`} />
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 3 · Your tools (favourites + recents) ────────────── */}
      {mounted && (
        <section className="px-5 pt-8">
          <h2 className="mb-3.5 text-lg font-extrabold tracking-tight text-foreground">Your tools</h2>
          {hasYourTools ? (
            <div className="flex flex-col gap-5">
              {favouriteTools.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-[#D97706] text-[#D97706]" /> Pinned
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {favouriteTools.map((entry) => renderToolRow(entry))}
                  </div>
                </div>
              )}
              {recentTools.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Recently used
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {recentTools.map((entry) => renderToolRow(entry))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="flex items-center gap-2 rounded-3xl border border-dashed border-border bg-white/60 px-4 py-3.5 text-sm font-light text-muted-foreground">
              <Star className="h-4 w-4 shrink-0 text-muted-foreground/60" />
              Star a tool to pin it here — your pins and recent tools stay on this device.
            </p>
          )}
        </section>
      )}

      {/* ── 4 · Categories ───────────────────────────────────── */}
      <section className="px-5 pt-8">
        <h2 className="mb-3.5 text-lg font-extrabold tracking-tight text-foreground">Categories</h2>
        <div className="flex flex-col gap-2.5">
          {navigationCategories.map((category) => {
            const Icon = category.icon || Calculator
            return (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="flex items-center gap-3.5 rounded-3xl border border-border bg-card p-4 shadow-sm transition-transform active:scale-[0.98]"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${category.colorClass}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="truncate text-[15px] font-bold text-foreground">{category.name}</span>
                    <span className="shrink-0 text-[12px] font-semibold text-muted-foreground">
                      {category.calculators.length} tools
                    </span>
                  </span>
                  <span className="block truncate text-[13px] font-light text-muted-foreground">{category.description}</span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60" />
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
          <h2 className="text-lg font-extrabold tracking-tight text-foreground">Guides</h2>
          <Link href="/guides" className="text-sm font-bold text-[#064E3B]">
            All guides
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GUIDES.slice(0, 6).map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="flex w-[238px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-transform active:scale-[0.98]"
            >
              <GuideImage src={guide.image} alt={guide.imageAlt} imgClassName="h-[104px] w-full object-cover" />
              <span className="flex flex-col p-5">
                <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#064E3B]">{guide.hub}</span>
                <span className="text-[15px] font-bold leading-snug text-foreground">{guide.title}</span>
                <span className="mt-2 line-clamp-3 text-[13px] font-light leading-relaxed text-muted-foreground">{guide.description}</span>
              </span>
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
                className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-card px-2 py-4 text-center shadow-sm"
              >
                <Icon className="h-5 w-5 text-[#064E3B]" />
                <span className="text-[12px] font-bold leading-tight text-foreground">{item.label}</span>
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
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-transform active:scale-90"
            >
              <X className="h-4.5 w-4.5" />
            </button>
            <div className="flex items-start gap-3.5 pr-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#064E3B] text-white">
                <Smartphone className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-[15px] font-bold text-foreground">Add DailyFinance to your home screen</h2>
                <p className="mt-1 text-[13px] font-light leading-relaxed text-muted-foreground">
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
