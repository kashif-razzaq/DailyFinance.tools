import { notFound } from 'next/navigation'
import React from 'react'
import { Calculator } from 'lucide-react'
import { getToolUrl } from '@/config/navigation'
import { EMBED_CALCULATORS } from './registry'
import { EmbedShell } from './EmbedShell'

/**
 * Embeddable calculator — rendered bare (no site chrome) for iframes on
 * third-party sites. The page itself carries zero outer spacing and a
 * transparent background so the widget hugs its content; EmbedShell
 * reports the live height to the parent for auto-sized iframes.
 * Attribution + backlink bar is part of the widget and always renders.
 */

// Closed param set: every embed slug is a key of the static registry.
// Without this, every embed hit rendered server-side on every request
// with no caching — the main Fluid CPU burn on the site. The page
// content is fully static, so pre-render all 114 at build time; an
// unknown slug 404s at the routing level instead of rendering.
export function generateStaticParams() {
  return Object.keys(EMBED_CALCULATORS).map((slug) => ({ slug }))
}

export const dynamicParams = false

export default async function EmbeddedCalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const CalculatorClient = EMBED_CALCULATORS[slug as keyof typeof EMBED_CALCULATORS]

  if (!CalculatorClient) {
    notFound()
  }

  const toolUrl = `https://www.dailyfinance.tools${getToolUrl(slug)}`

  return (
    <EmbedShell>
      <CalculatorClient isPro={false} />
      <footer className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-border/40 px-2 pb-1 pt-3 text-center">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#064E3B] text-white">
            <Calculator className="h-3 w-3" />
          </span>
          Powered by
          <a href="https://www.dailyfinance.tools" target="_blank" rel="noopener" className="font-bold text-[#064E3B] hover:underline dark:text-emerald-400">
            DailyFinance.tools
          </a>
        </span>
        <span aria-hidden="true" className="text-xs text-muted-foreground/60">·</span>
        <a href={toolUrl} target="_blank" rel="noopener" className="text-xs font-semibold text-primary hover:underline">
          Open the full calculator
        </a>
      </footer>
    </EmbedShell>
  )
}
