import { ArrowUpRight } from 'lucide-react'

/**
 * PreferredSourceButton — Google's "Preferred Sources" ask, using the
 * official deeplink format from Google Search Central:
 * https://www.google.com/preferences/source?q=<domain>
 * Readers who add DailyFinance see its pages prioritised in their Top
 * Stories, Discover and AI results. Rendered on tool pages directly under
 * the title, description and Reviewed-by trust block.
 */
export function PreferredSourceButton() {
  return (
    <a
      href="https://www.google.com/preferences/source?q=dailyfinance.tools"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white py-2 pl-2.5 pr-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.25)]"
      aria-label="Add DailyFinance as a preferred source on Google"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-neutral-100">
        <svg className="h-[18px] w-[18px]" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
          <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
          <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
          <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
        </svg>
      </span>
      <span className="text-left leading-tight">
        <span className="block text-[13px] font-bold text-[#1F2937]">Add as a Preferred Source</span>
        <span className="block text-[11px] font-medium text-neutral-500">See DailyFinance first on Google</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-300 transition-colors group-hover:text-[#064E3B]" />
    </a>
  )
}
