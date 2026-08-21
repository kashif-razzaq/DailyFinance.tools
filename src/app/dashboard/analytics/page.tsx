import { getSavedCalculatorsAction } from "@/actions/calculator.actions"
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts"
import { BarChart3, TrendingUp, Target } from "lucide-react"

export default async function AnalyticsPage() {
  const savedCalculators = await getSavedCalculatorsAction()

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cross-Data Analytics</h1>
          <p className="text-muted-foreground mt-1">Unified insights across all your saved scenarios.</p>
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
        <div className="space-y-8">
          
          {/* Top KPI Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 text-muted-foreground mb-4">
                <Target className="w-5 h-5" />
                <h3 className="font-semibold text-sm uppercase tracking-wider">Total Scenarios</h3>
              </div>
              <p className="text-4xl font-bold font-mono">{savedCalculators.length}</p>
            </div>
            
            <div className="bg-card border rounded-2xl p-6 shadow-sm md:col-span-2 bg-gradient-to-br from-primary to-blue-800 text-primary-foreground border-none">
              <div className="flex items-center gap-3 text-blue-100 mb-4">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-semibold text-sm uppercase tracking-wider">Net Worth Velocity Status</h3>
              </div>
              <p className="text-2xl font-semibold leading-tight max-w-lg">
                Your Vault data indicates a healthy upward trajectory. Review the consolidated waterfalls below.
              </p>
            </div>
          </div>

          {/* Client-Side Recharts */}
          <AnalyticsCharts calculators={savedCalculators} />

        </div>
      )}
    </div>
  )
}
