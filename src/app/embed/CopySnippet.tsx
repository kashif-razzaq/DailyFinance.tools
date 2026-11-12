'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * Copy button for the embed snippet on the /embed landing page.
 * Client component — the page itself stays a server component.
 * Falls back to a textarea + execCommand copy where the Clipboard
 * API is unavailable (older browsers, non-secure contexts).
 */
export function CopySnippet({ snippet, label = 'Copy snippet' }: { snippet: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = snippet
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
      aria-label={copied ? 'Copied to clipboard' : label}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : label}
    </button>
  )
}
