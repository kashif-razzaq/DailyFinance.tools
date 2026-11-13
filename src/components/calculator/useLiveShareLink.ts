'use client'

import { useRef } from 'react'
import { saveCalculatorAction } from '@/actions/calculator.actions'
import { getScenarioUrl } from '@/config/navigation'

/**
 * useLiveShareLink — Pro-only live sharing for one calculator.
 *
 * Returns a handler that auto-saves the current inputs as a PUBLIC
 * scenario in the background and returns its link. The user never
 * presses Save — opening the share modal is what creates the link.
 * The row is flagged is_share_link, so it never appears in the Vault.
 * Returns null when the link could not be created (the modal then
 * falls back to the plain tool link); Pro is enforced server-side
 * inside saveCalculatorAction, so a forged call cannot publish.
 *
 * Reopening the share modal with unchanged inputs reuses the cached
 * link instead of saving a duplicate scenario.
 *
 * `slug` is the calculator_slug used for the save row — the legacy
 * freelance save-slugs are fine: getScenarioUrl resolves them to the
 * real page URL for the link.
 */
export function useLiveShareLink(args: {
  slug: string
  category: string
  savedName: string
  inputs: Record<string, unknown>
}): () => Promise<string | null> {
  const liveLinkCache = useRef<{ hash: string; url: string } | null>(null)
  const { slug, category, savedName, inputs } = args

  return async () => {
    const hash = JSON.stringify(inputs)
    if (liveLinkCache.current?.hash === hash) return liveLinkCache.current.url
    const result = await saveCalculatorAction({
      calculator_slug: slug,
      category,
      saved_name: savedName,
      input_state: inputs,
      is_public: true,
      is_share_link: true,
    })
    if (!result.ok) return null
    const liveUrl = `https://www.dailyfinance.tools${getScenarioUrl(slug)}?savedId=${result.data.id}`
    liveLinkCache.current = { hash, url: liveUrl }
    return liveUrl
  }
}
