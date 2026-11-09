'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { navigationCategories, getToolUrl } from '@/config/navigation'

/**
 * Mobile footer: the 7 calculator categories as a stacked accordion
 * (Kashif's request, 2026-11-09 — "Categories to stacked drop down accordion
 * nicely crafted for SEO"). Every tool link stays in the DOM when collapsed
 * (grid-rows animation, not unmounting) so the internal links keep their SEO
 * value; only one category is open at a time. Desktop uses the multi-column
 * grid in Footer.tsx instead (this component is md:hidden).
 */
export function FooterAccordion() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  return (
    <nav aria-label="Calculator categories" className="md:hidden mb-16 border-t border-b divide-y divide-border">
      {navigationCategories.map((category) => {
        const open = openSlug === category.slug
        const panelId = `footer-cat-${category.slug}`
        const buttonId = `footer-cat-btn-${category.slug}`
        return (
          <div key={category.slug}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenSlug(open ? null : category.slug)}
                className="flex w-full items-center gap-3 py-4 text-left"
              >
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold text-sm text-foreground">
                    {category.name} Tools
                  </span>
                  <span className="block text-xs text-muted-foreground truncate">
                    {category.description}
                  </span>
                </span>
                <span className="shrink-0 rounded-full bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5">
                  {category.calculators.length}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180 text-primary' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!open}
              className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 pb-5 pt-1">
                  {category.calculators.map((calc) => (
                    <li key={calc.slug}>
                      <Link
                        href={getToolUrl(calc.slug)}
                        tabIndex={open ? undefined : -1}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors leading-tight line-clamp-2"
                      >
                        {calc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${category.slug}`}
                  tabIndex={open ? undefined : -1}
                  className="inline-flex items-center gap-1.5 pb-5 text-xs font-semibold text-primary hover:underline underline-offset-2"
                >
                  All {category.name} tools
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )
}
