'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationCategories, Category, getToolUrl, TOOL_COUNTS } from '@/config/navigation'
import { ChevronDown, ArrowRight, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Featured tools per category — the eight flagships a visitor is most likely
 * looking for, shown 2 columns × 4 rows. The menu shows these and links to
 * the category page for the rest, so the panel stays the same compact height
 * no matter how many tools a category holds (Personal Wealth has 29). Slugs
 * resolve against the registry; a missing slug is skipped, never rendered
 * broken. A category with no entry here falls back to its first eight
 * registry tools. Categories with fewer than eight tools (Tax has 7, Pro
 * has 5) simply show what they have — Pro fills its sixth cell with the
 * launching-soon card.
 */
const FEATURED: Record<string, string[]> = {
  freelance: [
    'freelance-hourly-rate-calculator',
    'quarterly-estimated-tax-calculator',
    'self-employment-tax-calculator',
    '1099-tax-calculator',
    'w2-vs-1099-calculator',
    'stripe-paypal-fee-calculator',
    'freelance-emergency-fund-calculator',
    'freelance-project-pricing-calculator',
  ],
  creator: [
    'youtube-adsense-estimator',
    'sponsorship-pricing-calculator',
    'instagram-money-calculator',
    'youtube-cpm-calculator',
    'tiktok-creator-fund-calculator',
    'platform-fee-visualizer',
    'patreon-tier-optimization',
    'course-launch-revenue-calculator',
  ],
  ecommerce: [
    'profit-margin-calculator',
    'roi-calculator',
    'amazon-fba-fee-calculator',
    'shopify-margin-calculator',
    'ebay-fee-calculator',
    'etsy-fee-calculator',
    'target-roas-break-even-calculator',
    'customer-acquisition-cost-calculator',
  ],
  'real-estate': [
    'mortgage-payment-calculator',
    'home-affordability-calculator',
    'refinance-calculator',
    'rent-vs-buy-calculator',
    'mortgage-payoff-calculator',
    'down-payment-calculator',
    'closing-cost-calculator',
    'home-equity-calculator',
  ],
  'personal-wealth': [
    'compound-interest-scaler-calculator',
    'retirement-calculator',
    'budget-calculator',
    'savings-calculator',
    'social-security-calculator',
    'investment-calculator',
    'credit-card-payoff-calculator',
    'emergency-fund-visualizer',
  ],
  loans: [
    'loan-calculator',
    'auto-loan-calculator',
    'debt-payoff-calculator',
    'credit-card-calculator',
    'debt-to-income-ratio-calculator',
    'apr-calculator',
    'personal-loan-calculator',
    'student-loan-calculator',
  ],
  tax: [
    'paycheck-calculator',
    'tax-calculator',
    'income-tax-calculator',
    'salary-calculator',
    'take-home-pay-calculator',
    'overtime-calculator',
    'capital-gains-tax-calculator',
  ],
  pro: [
    'monte-carlo-retirement-simulator',
    'rental-property-analyzer',
    'business-valuation-calculator',
    'irr-npv-analyzer',
    'portfolio-rebalancer',
  ],
}

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>(navigationCategories[0])
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  // Active on any tool category, hub or directory page — the pill's label
  // underlines in the pill's own (primary) colour, matching the hover colour.
  const toolPrefixes = [...navigationCategories.map((c) => `/${c.slug}`), '/tools', '/hubs']
  const isActive = toolPrefixes.some((p) => pathname === p || pathname.startsWith(p + '/'))

  // Featured tools for the active category, resolved against the registry.
  const bySlug = new Map(activeCategory.calculators.map((c) => [c.slug, c]))
  const featuredSlugs = FEATURED[activeCategory.slug] ?? activeCategory.calculators.slice(0, 8).map((c) => c.slug)
  const featured = featuredSlugs
    .map((slug) => bySlug.get(slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined)
  const toolCount = activeCategory.calculators.length

  // Handle entry/exit animations
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen])

  return (
    <div className="hidden lg:block" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out",
          isOpen ? "bg-primary text-primary-foreground shadow-md" : "bg-primary/5 text-primary hover:bg-primary/10",
          isActive && "underline underline-offset-4 decoration-2"
        )}
      >
        Tools & Calculators
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      {/* Full-width brand panel: emerald rail + eight featured tools.
          Fixed height for every category — the full list lives on the
          category page, linked from the header. */}
      {isRendered && (
        <div className={cn(
          "absolute top-16 left-4 right-4 md:left-8 md:right-8 bg-background border border-border/60 shadow-[0_24px_48px_-16px_rgba(6,78,59,0.18)] rounded-2xl overflow-hidden duration-100 z-50 flex min-h-[636px] origin-top",
          isOpen
            ? "animate-in fade-in-0 zoom-in-95"
            : "animate-out fade-out-0 zoom-out-95 fill-mode-forwards"
        )}>

          {/* Left rail: categories with honest counts */}
          <div className="w-[300px] shrink-0 bg-[#064E3B]/[0.04] dark:bg-[#064E3B]/10 border-r border-[#064E3B]/10 p-6 flex flex-col">
            <div className="mb-5 px-2">
              <h3 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">Explore tools</h3>
              <p className="mt-1 text-xs text-muted-foreground">{TOOL_COUNTS.free} free calculators · {TOOL_COUNTS.pro} Pro tools</p>
            </div>
            <div className="flex flex-col gap-1">
              {navigationCategories.map((cat) => {
                const Icon = cat.icon
                const isCatActive = activeCategory.slug === cat.slug
                return (
                  <button
                    key={cat.slug}
                    onMouseEnter={() => setActiveCategory(cat)}
                    onClick={() => setActiveCategory(cat)}
                    aria-current={isCatActive ? 'true' : undefined}
                    className={cn(
                      "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left w-full group",
                      isCatActive
                        ? "bg-background shadow-sm ring-1 ring-border/60 text-foreground"
                        : "hover:bg-background/70 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isCatActive && (
                      <span aria-hidden="true" className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-full bg-[#D97706]" />
                    )}
                    <span className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                      isCatActive ? "bg-[#064E3B]/10 text-[#064E3B] dark:text-emerald-400" : "bg-muted/60 text-muted-foreground group-hover:text-foreground"
                    )}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-sm font-medium">{cat.name}</span>
                    <span className="text-xs tabular-nums text-muted-foreground">{cat.calculators.length}</span>
                  </button>
                )
              })}
            </div>

            <div className="mt-auto pt-6">
              <Link href="/tools" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#064E3B] hover:text-[#064E3B]/80 dark:text-emerald-400 transition-colors group">
                Browse all {TOOL_COUNTS.total} tools
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right content: eight featured tools + view-all link */}
          <div className="flex-1 p-8 flex flex-col bg-background">
            <div className="mb-7 flex items-start justify-between gap-6">
              <div>
                <Link href={`/${activeCategory.slug}`} onClick={() => setIsOpen(false)} className="group/cat inline-block">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover/cat:text-[#064E3B] dark:group-hover/cat:text-emerald-400 transition-colors">{activeCategory.slug === 'pro' ? 'Pro Tools' : `${activeCategory.name} Calculators`}</h2>
                  <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded bg-[#D97706]" />
                </Link>
                <p className="text-sm text-muted-foreground mt-3 max-w-xl leading-relaxed">{activeCategory.description}</p>
              </div>
              <Link href={`/${activeCategory.slug}`} onClick={() => setIsOpen(false)} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#064E3B]/20 bg-[#064E3B]/5 px-3.5 py-2 text-[13px] font-semibold text-[#064E3B] hover:bg-[#064E3B]/10 dark:text-emerald-400 transition-colors">
                View all {toolCount} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Grid is vertically centred in the remaining space so the panel
                never shows a void under the two rows. */}
            <div className="flex flex-1 flex-col justify-center">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {featured.map((calc) => {
                const CalcIcon = calc.icon
                return (
                  <Link
                    key={calc.slug}
                    href={getToolUrl(calc.slug)}
                    onClick={() => setIsOpen(false)}
                    className="group rounded-xl border border-transparent p-4 transition-colors duration-200 hover:border-[#064E3B]/15 hover:bg-[#064E3B]/[0.04] dark:hover:bg-[#064E3B]/10"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#064E3B]/[0.07] text-[#064E3B] transition-colors group-hover:bg-[#064E3B]/15 dark:text-emerald-400">
                        <CalcIcon className="h-4 w-4" />
                      </span>
                      <h4 className="text-[15px] font-semibold text-foreground group-hover:text-[#064E3B] dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {calc.title}
                        {calc.isPremium && (
                          <span className="ml-1.5 align-middle text-[10px] font-bold tracking-wide text-[#D97706]">PRO</span>
                        )}
                      </h4>
                    </div>
                    <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
                      {calc.description}
                    </p>
                  </Link>
                )
              })}

              {/* Pro has five tools — the launching-soon card takes the sixth
                  cell, beside the fifth tool. */}
              {activeCategory.slug === 'pro' && (
                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="group rounded-xl bg-[#064E3B] p-4 text-white transition-colors hover:bg-[#064E3B]/90"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#F5C97B]">
                      <Crown className="h-4 w-4" />
                    </span>
                    <h4 className="text-[15px] font-semibold leading-snug">Pro — launching soon</h4>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/80">
                    Five advanced tools, one subscription. See what&apos;s coming.
                  </p>
                </Link>
              )}
            </div>
            </div>

            <div className="mt-auto pt-7">
              <p className="border-t border-border/50 pt-4 text-xs text-muted-foreground">
                Every calculator shows its formula. Every figure sourced.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
