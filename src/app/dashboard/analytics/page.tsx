import { getSavedCalculatorsAction } from "@/actions/calculator.actions"
import { CrossDataAnalytics } from "@/components/dashboard/AnalyticsCharts"
import { AnalyticsActions } from "@/components/dashboard/AnalyticsActions"
import { buildFinancialPicture } from "@/lib/financial-picture"
import { Logo } from "@/components/layout/Logo"
import { Crown } from "lucide-react"
import { BarChart3 } from "lucide-react"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { safeGetUser } from "@/utils/supabase/safe-user"

export default async function AnalyticsPage() {
  // Free users get the basic snapshot; Pro gets the full picture
  // (the split is rendered inside CrossDataAnalytics).
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() } } }
  )
  const user = await safeGetUser(supabase)
  let isPro = false
  if (user) {
    const { data: profile } = await supabase.from("users").select("subscription_status").eq("id", user.id).single()
    isPro = profile?.subscription_status === "active"
  }
  const savedCalculators = await getSavedCalculatorsAction()
  const generatedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-10">
      {/* Print-only branded header — the PDF shows this, not the dashboard chrome. */}
      <div className="hidden print:block print-keep-color">
        <div className="flex items-start justify-between border-b-2 border-[#064E3B] pb-4">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9 text-[#064E3B]" />
            <div>
              <p className="text-xl font-extrabold tracking-tight text-[#064E3B]">DailyFinance.tools</p>
              <p className="text-xs font-medium text-neutral-500">Cross-Data Analytics — your saved scenarios, combined</p>
            </div>
          </div>
          {isPro ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D97706] px-3 py-1 text-xs font-extrabold tracking-wide text-white">
              <Crown className="h-3.5 w-3.5" /> PRO
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full border border-neutral-300 px-3 py-1 text-xs font-bold text-neutral-500">
              Free snapshot
            </span>
          )}
        </div>
        <p className="mt-3 text-xs text-neutral-500">
          Generated {generatedDate} from {savedCalculators.length} saved scenario{savedCalculators.length === 1 ? '' : 's'} · dailyfinance.tools
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">Cross-Data Analytics</h1>
          <p className="text-muted-foreground mt-1">Your saved scenarios, combined: balance sheet, debt costs, cash flow and savings — from your own numbers.</p>
        </div>
        {savedCalculators.length > 0 && (
          <AnalyticsActions pic={buildFinancialPicture(savedCalculators)} isPro={isPro} />
        )}
      </div>

      {savedCalculators.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-32 h-32 mb-6 rounded-3xl bg-muted border flex items-center justify-center shadow-sm">
             <BarChart3 className="w-12 h-12 text-muted-foreground opacity-50" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Not enough data</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Save some scenarios in the Vault to unlock aggregated charts and trajectory mapping.
          </p>
        </div>
      ) : (
        <CrossDataAnalytics calculators={savedCalculators} isPro={isPro} />
      )}

      {/* Print-only footer note */}
      <p className="hidden print:block border-t border-neutral-200 pt-3 text-[11px] leading-relaxed text-neutral-500">
        Estimates, not advice. Figures are calculated from the scenarios you saved on DailyFinance.tools and are estimates only — not financial, tax or investment advice. Verify figures with official sources or a qualified professional before acting on them.
      </p>
    </div>
  )
}
