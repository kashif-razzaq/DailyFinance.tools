'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Calculator } from 'lucide-react'
import { navigationCategories, getToolUrl } from '@/config/navigation'

// Master list of all tools flattened from navigation categories
const ALL_TOOLS = navigationCategories.flatMap(category => category.calculators)

export function RelatedToolsWidget({ currentSlug }: { currentSlug: string }) {
  // Deterministically select 3 related tools to prevent SSR hydration errors
  const relatedTools = useMemo(() => {
    const currentIndex = ALL_TOOLS.findIndex(t => t.slug === currentSlug)
    const startIndex = currentIndex !== -1 ? currentIndex : 0
    
    const available = []
    // Pick the next 3 tools, wrapping around if necessary
    for (let i = 1; i <= 3; i++) {
      const nextIndex = (startIndex + i) % ALL_TOOLS.length
      available.push(ALL_TOOLS[nextIndex])
    }
    
    return available
  }, [currentSlug])

  return (
    <div className="bg-card border rounded-3xl p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-foreground">
        <Calculator className="h-5 w-5 text-accent" />
        Explore More Tools
      </h3>
      
      <div className="space-y-4">
        {relatedTools.map((tool) => {
          const Icon = tool.icon || Calculator
          return (
            <Link 
              key={tool.slug} 
              href={getToolUrl(tool.slug)}
              className="group block p-4 rounded-2xl bg-muted/30 hover:bg-muted/80 border border-border/40 hover:border-border transition-all"
            >
              <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                  {tool.title}
                </span>
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent shrink-0" />
              </h4>
              <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 pl-6">
                {tool.description}
              </p>
            </Link>
          )
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/40 text-center">
        <Link href="/tools" className="text-xs font-semibold uppercase tracking-wider text-accent hover:text-accent transition-colors">
          View All Calculators →
        </Link>
      </div>
    </div>
  )
}
