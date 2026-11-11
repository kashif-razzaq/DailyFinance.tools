'use client'

import React, { useMemo, useState } from 'react'
import { useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
import { ProGuard } from '@/components/calculator/ProGuard'
import { MoneyInput, PctSlider, NumSlider, ResultCard, Stat, fmt, fmt2 } from '@/components/calculator/ProInputs'

/**
 * Rental Property Analyzer (Pro).
 *
 * Full first-year deal analysis: financing, every operating expense line,
 * NOI, cash flow, cap rate, cash-on-cash return, DSCR and GRM — the numbers
 * a lender and an investor actually judge a deal by.
 */
function monthlyPayment(principal: number, ratePct: number, months: number) {
  const r = ratePct / 100 / 12
  if (months <= 0 || principal <= 0) return 0
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return (principal * r * f) / (f - 1)
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  useCurrencySymbol()
  const [price, setPrice] = useState(320000)
  const [downPct, setDownPct] = useState(25)
  const [rate, setRate] = useState(6)
  const [termYears, setTermYears] = useState(30)
  const [closingPct, setClosingPct] = useState(2)
  const [rent, setRent] = useState(2600)
  const [taxPct, setTaxPct] = useState(1.1)
  const [insurance, setInsurance] = useState(150)
  const [hoa, setHoa] = useState(0)
  const [maintenancePct, setMaintenancePct] = useState(5)
  const [vacancyPct, setVacancyPct] = useState(5)
  const [managementPct, setManagementPct] = useState(8)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.price !== undefined) setPrice(s.price as any)
    if (s.downPct !== undefined) setDownPct(s.downPct as any)
    if (s.rate !== undefined) setRate(s.rate as any)
    if (s.termYears !== undefined) setTermYears(s.termYears as any)
    if (s.closingPct !== undefined) setClosingPct(s.closingPct as any)
    if (s.rent !== undefined) setRent(s.rent as any)
    if (s.taxPct !== undefined) setTaxPct(s.taxPct as any)
    if (s.insurance !== undefined) setInsurance(s.insurance as any)
    if (s.hoa !== undefined) setHoa(s.hoa as any)
    if (s.maintenancePct !== undefined) setMaintenancePct(s.maintenancePct as any)
    if (s.vacancyPct !== undefined) setVacancyPct(s.vacancyPct as any)
    if (s.managementPct !== undefined) setManagementPct(s.managementPct as any)
  })


  const r = useMemo(() => {
    const down = (price * downPct) / 100
    const closing = (price * closingPct) / 100
    const loan = price - down
    const pi = monthlyPayment(loan, rate, termYears * 12)
    const tax = (price * taxPct) / 100 / 12
    const maintenance = (rent * maintenancePct) / 100
    const vacancy = (rent * vacancyPct) / 100
    const management = (rent * managementPct) / 100
    const operating = tax + insurance + hoa + maintenance + vacancy + management
    const noiMonthly = rent - operating
    const noi = noiMonthly * 12
    const cashFlowMonthly = noiMonthly - pi
    const cashInvested = down + closing
    return {
      down,
      closing,
      loan,
      pi,
      tax,
      maintenance,
      vacancy,
      management,
      operating,
      noi,
      cashFlowMonthly,
      cashFlowAnnual: cashFlowMonthly * 12,
      cashInvested,
      capRate: price > 0 ? (noi / price) * 100 : 0,
      cashOnCash: cashInvested > 0 ? ((cashFlowMonthly * 12) / cashInvested) * 100 : 0,
      dscr: pi > 0 ? noi / (pi * 12) : 0,
      grm: rent > 0 ? price / (rent * 12) : 0,
      totalMonthlyOut: operating + pi,
    }
  }, [price, downPct, rate, termYears, closingPct, rent, taxPct, insurance, hoa, maintenancePct, vacancyPct, managementPct])

  const verdict =
    r.cashFlowMonthly < 0
      ? 'Negative cash flow: this deal pays you to own it only if appreciation or rent growth bails it out. At these numbers, it is a speculation, not an investment.'
      : r.dscr < 1.25
        ? 'Positive but thin. Lenders like a DSCR of 1.25 or more; one vacancy or repair can flip this deal negative.'
        : 'A sound deal on the standard tests: positive cash flow with a lender-grade debt coverage ratio.'

  const lines: { label: string; value: number; bold?: boolean }[] = [
    { label: 'Mortgage (principal & interest)', value: r.pi },
    { label: 'Property tax', value: r.tax },
    { label: 'Insurance', value: insurance },
    { label: 'HOA', value: hoa },
    { label: 'Maintenance reserve', value: r.maintenance },
    { label: 'Vacancy allowance', value: r.vacancy },
    { label: 'Management', value: r.management },
    { label: 'Total monthly cost', value: r.totalMonthlyOut, bold: true },
    { label: 'Monthly cash flow', value: r.cashFlowMonthly, bold: true },
  ]

  const calculator = (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-6">
        <MoneyInput label="Purchase price" value={price} onChange={setPrice} />
        <PctSlider label="Down payment" value={downPct} onChange={setDownPct} min={0} max={60} step={1} />
        <PctSlider label="Mortgage rate" value={rate} onChange={setRate} min={0} max={15} step={0.125} />
        <NumSlider label="Loan term" value={termYears} onChange={setTermYears} min={5} max={30} suffix=" yrs" />
        <PctSlider label="Closing costs" value={closingPct} onChange={setClosingPct} min={0} max={6} step={0.25} />
        <MoneyInput label="Monthly rent" value={rent} onChange={setRent} />
        <PctSlider label="Property tax (of price, yearly)" value={taxPct} onChange={setTaxPct} min={0} max={3} step={0.05} />
        <MoneyInput label="Insurance (monthly)" value={insurance} onChange={setInsurance} />
        <MoneyInput label="HOA (monthly)" value={hoa} onChange={setHoa} />
        <PctSlider label="Maintenance (of rent)" value={maintenancePct} onChange={setMaintenancePct} min={0} max={15} step={0.5} />
        <PctSlider label="Vacancy allowance (of rent)" value={vacancyPct} onChange={setVacancyPct} min={0} max={15} step={0.5} />
        <PctSlider label="Management (of rent)" value={managementPct} onChange={setManagementPct} min={0} max={15} step={0.5} />
      </div>

      <div className="space-y-6">
        <ResultCard title="Deal analysis — year one">
          <div className="grid grid-cols-2 gap-6">
            <Stat
              label="Monthly cash flow"
              value={fmt(r.cashFlowMonthly)}
              sub={`${fmt(r.cashFlowAnnual)} per year, after every cost`}
            />
            <Stat label="Cap rate" value={`${r.capRate.toFixed(2)}%`} sub={`NOI of ${fmt(r.noi)} a year`} />
            <Stat
              label="Cash-on-cash return"
              value={`${r.cashOnCash.toFixed(2)}%`}
              sub={`on ${fmt(r.cashInvested)} cash invested`}
            />
            <Stat label="DSCR" value={r.dscr.toFixed(2)} sub={`GRM ${r.grm.toFixed(1)} · loan ${fmt(r.loan)}`} />
          </div>
          <p className="mt-6 border-t border-white/15 pt-4 text-sm font-light leading-relaxed text-white/85">{verdict}</p>
        </ResultCard>

        <div className="rounded-2xl border bg-card p-5">
          <p className="mb-3 text-sm font-bold">Where the rent goes each month</p>
          <div className="divide-y">
            {lines.map((line) => (
              <div key={line.label} className="flex items-center justify-between py-2 text-sm">
                <span className={line.bold ? 'font-bold' : 'font-light text-muted-foreground'}>{line.label}</span>
                <span className={`font-mono ${line.bold ? 'font-extrabold' : 'font-semibold'}`}>{fmt2(line.value)}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs font-light text-muted-foreground">
            Cash needed at closing: {fmt(r.down)} down + {fmt(r.closing)} closing costs = {fmt(r.cashInvested)}.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <ProGuard
        isPro={isPro}
        toolTitle="Rental Property Analyzer"
        features={[
          'Cash flow, cap rate, cash-on-cash, DSCR and GRM in one pass',
          'Every expense line modelled — tax, vacancy, maintenance, management',
          'A plain-English verdict on whether the deal actually works',
          'Full monthly cost breakdown, line by line',
        ]}
      >
        {calculator}
      </ProGuard>
      <ToolActionsBar
        slug="rental-property-analyzer"
        isPro={isPro}
        inputs={{ price, downPct, rate, termYears, closingPct, rent, taxPct, insurance, hoa, maintenancePct, vacancyPct, managementPct }}
      />
    </>
  )
}
