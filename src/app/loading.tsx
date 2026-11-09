import { Logo } from '@/components/layout/Logo'

/**
 * Branded route loader — shown by Next.js while a route segment loads.
 * Pure CSS (the bar uses the `animate-df-progress` utility defined in
 * globals.css); no client JS, so it paints instantly and stays light.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex flex-1 flex-col items-center justify-center gap-5 px-4 py-24"
    >
      <div className="flex items-center gap-2.5 animate-pulse">
        <span className="bg-primary/10 p-2 rounded-xl">
          <Logo className="h-8 w-8" />
        </span>
        <span className="font-bold text-2xl tracking-tight text-foreground">
          Daily<span className="text-primary">Finance</span>
        </span>
      </div>

      <div className="w-48 h-1 rounded-full bg-primary/15 overflow-hidden" aria-hidden="true">
        <div className="h-full w-16 rounded-full bg-primary animate-df-progress" />
      </div>

      <p className="text-sm text-muted-foreground">Loading your calculators&hellip;</p>
    </div>
  )
}
