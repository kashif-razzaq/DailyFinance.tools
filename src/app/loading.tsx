/**
 * Branded route loader — shown by Next.js while a route segment loads.
 * Visually identical to the click-driven NavigationLoader (light backdrop,
 * animated bar-chart tile, emerald progress shimmer) so the two never
 * clash. Pure CSS; no client JS, so it paints instantly and stays light.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="df-loader fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#FAFAF8]"
    >
      <div aria-hidden="true" className="absolute -top-40 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-48 -right-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative flex h-24 w-24 items-end justify-center gap-[6px] df-loader-tile rounded-[1.75rem] border border-neutral-200/70 bg-white pb-6 shadow-[0_24px_50px_-16px_rgba(6,78,59,0.25)]">
        <span className="df-eq-bar h-4 w-[7px] rounded-full bg-[#064E3B]" />
        <span className="df-eq-bar h-7 w-[7px] rounded-full bg-[#064E3B]" style={{ animationDelay: '0.12s' }} />
        <span className="df-eq-bar h-10 w-[7px] rounded-full bg-[#D97706]" style={{ animationDelay: '0.24s' }} />
      </div>

      <p className="df-loader-word relative mt-6 text-[1.7rem] font-bold leading-none tracking-tight text-[#1F2937]">
DailyFinance
      </p>
      <p className="df-loader-caption relative mt-2.5 text-sm text-neutral-500">Loading your money toolkit&hellip;</p>

      <div className="relative mt-7 h-1 w-48 overflow-hidden rounded-full bg-[#064E3B]/10" aria-hidden="true">
        <div className="animate-df-progress h-full w-16 rounded-full bg-[#064E3B]" />
      </div>
    </div>
  )
}
