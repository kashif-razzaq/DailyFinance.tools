'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useAirbnbArbitrageStore } from '@/store/airbnb-arbitrage.store'
import { formatCurrency, formatPercent } from '@/lib/utils'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useAirbnbArbitrageStore()
  const result = store.calculateResult()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Inputs Section */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Arbitrage Variables</CardTitle>
            <CardDescription>Enter the costs and projected revenue for the property.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Base Rent</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="monthlyRent"
                    type="number"
                    className="pl-7"
                    value={store.monthlyRent}
                    onChange={(e) => store.setMonthlyRent(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses">Other Monthly Expenses (Utilities, Internet)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    className="pl-7"
                    value={store.monthlyExpenses}
                    onChange={(e) => store.setMonthlyExpenses(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Occupancy Rate: {store.occupancyRate}%</Label>
              </div>
              <Slider
                value={[store.occupancyRate]}
                onValueChange={(val) => store.setOccupancyRate((val as number[])[0])}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="averageNightlyRate">Average Nightly Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="averageNightlyRate"
                    type="number"
                    className="pl-7"
                    value={store.averageNightlyRate}
                    onChange={(e) => store.setAverageNightlyRate(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="staysPerMonth">Est. Stays Per Month</Label>
                <Input
                  id="staysPerMonth"
                  type="number"
                  value={store.staysPerMonth}
                  onChange={(e) => store.setStaysPerMonth(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="furnitureCost">Furniture Cost</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="furnitureCost"
                    type="number"
                    className="pl-7"
                    value={store.furnitureCost}
                    onChange={(e) => store.setFurnitureCost(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startupCosts">Other Startup Costs (Deposit, LLC)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="startupCosts"
                    type="number"
                    className="pl-7"
                    value={store.startupCosts}
                    onChange={(e) => store.setStartupCosts(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="cleaningFee">Cleaning Fee (Charged & Paid Out)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="cleaningFee"
                    type="number"
                    className="pl-7"
                    value={store.cleaningFee}
                    onChange={(e) => store.setCleaningFee(Number(e.target.value))}
                  />
                </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Arbitrage Returns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Monthly Revenue</span>
              <span className="font-medium text-lg">{formatCurrency(result.monthlyRevenue)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Monthly Expenses</span>
              <span className="font-medium text-lg text-rose-500">-{formatCurrency(result.monthlyOperatingExpenses)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground font-semibold">Monthly Profit</span>
              <span className="font-bold text-xl text-blue-600">{formatCurrency(result.monthlyProfit)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Profit Margin</span>
              <span className="font-medium text-lg">{formatPercent(result.profitMargin)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Total Initial Investment</span>
              <span className="font-medium text-lg">{formatCurrency(result.initialInvestment)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Months to Recoup</span>
              <span className="font-medium text-lg">{result.monthsToRecoup === Infinity ? "Never" : result.monthsToRecoup.toFixed(1)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
