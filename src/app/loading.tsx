/**
 * Branded route loader — shown by Next.js while a route segment loads.
 * Visually identical to the click-driven NavigationLoader (deep emerald,
 * animated bar-chart mark, gold progress shimmer) so the two never clash.
 * Pure CSS; no client JS, so it paints instantly and stays light.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#04382A]"
    >
      <div aria-hidden="true" className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative flex h-24 w-24 items-end justify-center gap-[6px] rounded-[1.75rem] border border-white/10 bg-white/5 pb-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur">
        <span className="df-eq-bar h-4 w-[7px] rounded-full bg-emerald-300" />
        <span className="df-eq-bar h-7 w-[7px] rounded-full bg-white" style={{ animationDelay: '0.12s' }} />
        <span className="df-eq-bar h-10 w-[7px] rounded-full bg-amber-400" style={{ animationDelay: '0.24s' }} />
        <span className="df-eq-bar h-6 w-[7px] rounded-full bg-white" style={{ animationDelay: '0.36s' }} />
      </div>

      <p className="relative mt-6 text-[1.7rem] font-bold leading-none tracking-tight text-white">
        Daily<span className="text-amber-400">Finance</span>
      </p>
      <p className="relative mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-100/60">
        Crunching the numbers
      </p>

      <div className="relative mt-8 h-[3px] w-44 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
        <div className="animate-df-progress h-full w-16 rounded-full bg-amber-400" />
      </div>
    </div>
  )
}
