'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SavedCalculator } from "@/types/database"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

export function AnalyticsCharts({ calculators }: { calculators: SavedCalculator[] }) {
  
  // Mock aggregation based on the raw calculators for the sake of the dashboard UI.
  // In a real scenario, this would parse `input_state` specific to debt or assets.
  const debtData = calculators
    .filter(c => c.category === 'debt-payoff' || c.category === 'loans')
    .map((c, i) => ({
      name: c.saved_name,
      total: c.core_metric || 0,
      year1: (c.core_metric || 0) * 0.8,
      year2: (c.core_metric || 0) * 0.5,
      year3: (c.core_metric || 0) * 0.1,
    }))

  const mockNetWorth = [
    { year: '2024', assets: 100000, liabilities: 80000 },
    { year: '2025', assets: 150000, liabilities: 65000 },
    { year: '2026', assets: 220000, liabilities: 50000 },
    { year: '2027', assets: 340000, liabilities: 30000 },
    { year: '2028', assets: 500000, liabilities: 0 },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      
      {/* Debt Payoff Waterfall */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Debt Payoff Waterfall</CardTitle>
          <CardDescription>Consolidated timeline for your saved liability scenarios.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {debtData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={debtData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  {/* Sovereign Gold */}
                  <Bar dataKey="total" name="Current Debt" fill="#d97706" radius={[4, 4, 0, 0]} barSize={40} />
                  {/* Mint Green */}
                  <Bar dataKey="year2" name="Projected (Year 2)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground border-2 border-dashed rounded-xl">
                No debt scenarios saved in Vault.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Net Worth Velocity */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Net Worth Velocity</CardTitle>
          <CardDescription>Aggregated trajectory of assets vs. liabilities.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockNetWorth} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLiabs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="assets" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAssets)" />
                <Area type="monotone" dataKey="liabilities" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorLiabs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
