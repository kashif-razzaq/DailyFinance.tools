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
