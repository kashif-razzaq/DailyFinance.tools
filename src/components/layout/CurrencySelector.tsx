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

export function CurrencySelector() {
  const { currency, setCurrency } = useGlobalSettingsStore()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-[70px] md:w-[85px] h-9 bg-muted/50 rounded-md animate-pulse"></div>
    )
  }

  return (
    <Select value={currency} onValueChange={(v: string | null) => {
          if (v) setCurrency(v as any)
        }}>
      <SelectTrigger className="min-w-[70px] md:min-w-[100px] w-auto h-9 gap-1 md:gap-1.5 px-2 md:px-3 border-transparent bg-transparent focus:ring-0 focus:ring-offset-0 hover:bg-muted/50 transition-colors">
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
