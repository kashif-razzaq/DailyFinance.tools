import { getSavedCalculatorsAction } from "@/actions/calculator.actions"
import { CrossDataAnalytics } from "@/components/dashboard/AnalyticsCharts"
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

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cross-Data Analytics</h1>
          <p className="text-muted-foreground mt-1">Your saved scenarios, combined: balance sheet, debt costs, cash flow and savings — from your own numbers.</p>
        </div>
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
    </div>
  )
}
