"use client"

import React, { useEffect } from "react"

declare global {
  interface Window { adsbygoogle?: Record<string, unknown>[] }
}

interface AdSlotProps {
  /** AdSense slot id; falls back to Auto Ads only when unset */
  slot?: string
  className?: string
  label: string
}

/**
 * One ad placement, three honest states:
 * - Publisher ID configured  → renders a real responsive AdSense unit.
 * - Development             → dashed placeholder so layout can be designed.
 * - Production, unconfigured → renders nothing (no empty "Advertisement" boxes
 *   shown to visitors or AdSense reviewers).
 */
export function AdSlot({ slot, className = "", label }: AdSlotProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID

  useEffect(() => {
    if (publisherId && slot) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch {
        /* adsense not loaded yet */
      }
    }
  }, [publisherId, slot])

  if (!publisherId) {
    if (process.env.NODE_ENV !== "development") return null
    return (
      <aside className={`bg-muted/10 border border-dashed border-border/40 rounded-2xl flex flex-col items-center justify-center text-center ${className}`} aria-hidden="true">
        <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-[0.2em] mb-1">Advertisement (dev placeholder)</span>
        <span className="text-xs font-semibold text-foreground/40">{label}</span>
      </aside>
    )
  }

  if (!slot) return null
  return (
    <aside className={`overflow-hidden ${className}`} aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}
