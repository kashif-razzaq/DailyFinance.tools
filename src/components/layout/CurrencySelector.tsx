'use client'

import React, { useEffect, useState } from 'react'
import { useGlobalSettingsStore } from '@/store/global-settings.store'
import { Globe } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CurrencySelector({ variant = 'header' }: { variant?: 'header' | 'menu' } = {}) {
  const { currency, setCurrency } = useGlobalSettingsStore()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    // SSR placeholder — dimensions MUST match the hydrated trigger exactly
    // (fixed widths + min-h-44), or the header cluster shifts on hydration.
    return (
      <div className={variant === 'menu' ? "w-full h-10 bg-muted/50 rounded-lg animate-pulse" : "w-[92px] md:w-[104px] min-h-[44px] bg-muted/50 rounded-md animate-pulse"}></div>
    )
  }

  return (
    <Select value={currency} onValueChange={(v: string | null) => {
          if (v) setCurrency(v as any)
        }}>
      {/* Header trigger: fixed width (content is always a 3-letter code) and
          min-h-44 touch target. min-h is used deliberately — the base
          SelectTrigger's data-[size=default]:h-8 outranks a plain h-9. */}
      <SelectTrigger className={variant === 'menu' ? "w-full h-10 justify-between gap-2 px-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors" : "w-[92px] md:w-[104px] min-h-[44px] gap-1 md:gap-1.5 px-2 md:px-3 border-transparent bg-transparent focus:ring-0 focus:ring-offset-0 hover:bg-muted/50 transition-colors"}>
        <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
        <SelectValue placeholder="USD" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="USD">USD</SelectItem>
        <SelectItem value="EUR">EUR</SelectItem>
        <SelectItem value="GBP">GBP</SelectItem>
        <SelectItem value="CAD">CAD</SelectItem>
        <SelectItem value="AUD">AUD</SelectItem>
        <SelectItem value="INR">INR</SelectItem>
      </SelectContent>
    </Select>
  )
}
