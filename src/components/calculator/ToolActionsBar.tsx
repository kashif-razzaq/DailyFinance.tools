'use client'

import { useEffect, useRef, useState } from 'react'
import { CalculatorActions } from './CalculatorActions'
import { ProUpgradeModal } from '@/components/shared/ProUpgradeModal'
import { AdSlot } from '@/components/shared/AdSlot'
import { saveCalculatorAction } from '@/actions/calculator.actions'
import { unwrapSaveResult } from '@/lib/save-result'
import { openLoginModal } from '@/lib/auth-modal'
import { navigationCategories, getToolUrl } from '@/config/navigation'
import { SaveToast } from '@/components/shared/SaveToast'

/**
 * ToolActionsBar — the standard actions block for every calculator:
 * Save to Vault, Export (CSV/Excel) and Share, wired exactly like the
 * original freelance tools, with the freemium gates from /pricing:
 *
 * - Free accounts can save up to 3 scenarios (enforced server-side by
 *   saveCalculatorAction); hitting the limit opens the Pro modal.
 * - Exports are Pro-only (ExportEngine gates them via onRequirePro).
 * - Logged-out saves route to /login and back.
 *
 * Below the actions sits an AdSlot placeholder: it renders nothing in
 * production until an AdSense publisher ID is configured, then lights up
 * with no further code changes.
 */
export function ToolActionsBar({
  slug,
  isPro,
  inputs,
}: {
  slug: string
  isPro: boolean
  inputs: Record<string, unknown>
}) {
  const [isSaving, setIsSaving] = useState(false)
  const [showProModal, setShowProModal] = useState(false)
  const [toast, setToast] = useState<{ variant: 'success' | 'error' } | null>(null)
  // Last live link, keyed by the inputs it was saved from: reopening the
  // share modal with unchanged inputs reuses the link instead of saving
  // a duplicate scenario.
  const liveLinkCache = useRef<{ hash: string; url: string } | null>(null)

  const tool = (() => {
    for (const category of navigationCategories) {
      const hit = category.calculators.find((c) => c.slug === slug)
      if (hit) return { title: hit.title, categoryName: category.name, url: getToolUrl(slug) }
    }
    return { title: slug.replace(/-/g, ' '), categoryName: 'Tools', url: `/${slug}` }
  })()

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 5000)
    return () => clearTimeout(t)
  }, [toast])

  // One export row: the scenario's inputs with human-readable labels.
  const exportData = [
    Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [
        key
          .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
          .replace(/^./, (c) => c.toUpperCase()),
        value !== null && typeof value === 'object' ? JSON.stringify(value) : value,
      ]),
    ),
  ]

  const handleSave = async () => {
    setIsSaving(true)
    try {
      unwrapSaveResult(await saveCalculatorAction({
        calculator_slug: slug,
        category: tool.categoryName,
        saved_name: `${tool.title} scenario`,
        input_state: inputs,
      }))
      setToast({ variant: 'success' })
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      if (message.includes('Free accounts can save')) {
        setShowProModal(true)
      } else if (message.includes('Unauthorized')) {
        // Logged out: show the login popup right here and retry the save
        // automatically once they are signed in — no page bounce.
        openLoginModal(() => {
          void handleSave()
        })
        return
      } else {
        setToast({ variant: 'error' })
      }
    } finally {
      setIsSaving(false)
    }
  }

  /**
   * Live sharing (Pro only): auto-saves the current inputs as a PUBLIC
   * scenario in the background and returns its link. The user never
   * presses Save — opening the share modal is what creates the link.
   * The row is flagged is_share_link, so it never appears in the Vault.
   * Returns null when the link could not be created (the modal then
   * falls back to the plain tool link); Pro is enforced server-side
   * inside saveCalculatorAction, so a forged call cannot publish.
   */
  const handleGenerateLiveLink = async (): Promise<string | null> => {
    const hash = JSON.stringify(inputs)
    if (liveLinkCache.current?.hash === hash) return liveLinkCache.current.url
    const result = await saveCalculatorAction({
      calculator_slug: slug,
      category: tool.categoryName,
      saved_name: `${tool.title} scenario`,
      input_state: inputs,
      is_public: true,
      is_share_link: true,
    })
    if (!result.ok) return null
    const liveUrl = `https://www.dailyfinance.tools${tool.url}?savedId=${result.data.id}`
    liveLinkCache.current = { hash, url: liveUrl }
    return liveUrl
  }

  return (
    <div className="mt-10">
      <CalculatorActions
        slug={slug}
        onSave={handleSave}
        isSaving={isSaving}
        isPro={isPro}
        exportData={exportData}
        exportFilename={slug}
        onRequirePro={() => setShowProModal(true)}
        shareUrl={`https://www.dailyfinance.tools${tool.url}`}
        onGenerateLiveLink={handleGenerateLiveLink}
      />

      {/* Ad placeholder — invisible in production until AdSense is configured. */}
      <AdSlot label="Tool page — below actions" className="mt-6 min-h-[90px] w-full" />

      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />

      <SaveToast show={!!toast} variant={toast?.variant ?? 'success'} onClose={() => setToast(null)} />
    </div>
  )
}
