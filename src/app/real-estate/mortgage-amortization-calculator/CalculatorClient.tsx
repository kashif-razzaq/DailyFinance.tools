'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useMortgageAmortizationStore } from '@/store/mortgage-amortization.store'
import { formatCurrency } from '@/lib/utils'

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  const store = useMortgageAmortizationStore()
  const result = store.calculateResult()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Enter your mortgage terms and simulate extra payments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="loanAmount"
                    type="number"
                    className="pl-7"
                    value={store.loanAmount}
                    onChange={(e) => store.setLoanAmount(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">%</span>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    className="pl-7"
                    value={store.interestRate}
                    onChange={(e) => store.setInterestRate(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Loan Term (Years): {store.loanTerm}</Label>
              </div>
              <Slider
                value={[store.loanTerm]}
                onValueChange={(val) => store.setLoanTerm((val as number[])[0])}
                min={1}
                max={40}
                step={1}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-blue-600 font-medium">Extra Monthly Payment: {formatCurrency(store.extraMonthlyPayment)}</Label>
              </div>
              <Slider
                value={[store.extraMonthlyPayment]}
                onValueChange={(val) => store.setExtraMonthlyPayment((val as number[])[0])}
                min={0}
                max={2000}
                step={50}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Impact of Extra Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Base Monthly P&I</span>
              <span className="font-medium text-lg">{formatCurrency(result.monthlyPayment)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">New Total Monthly</span>
              <span className="font-medium text-lg">{formatCurrency(result.totalPaymentWithExtra)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground font-semibold">Interest Saved</span>
              <span className="font-bold text-xl text-blue-600">{formatCurrency(result.interestSaved)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Time Saved</span>
              <span className="font-medium text-lg text-blue-600">
                {Math.floor(result.monthsSaved / 12)} yrs {result.monthsSaved % 12} mos
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
