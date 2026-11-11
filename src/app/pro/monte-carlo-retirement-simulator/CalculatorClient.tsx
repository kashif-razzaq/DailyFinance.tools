/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useMemo, useState } from 'react'
import { ComposedChart, Area, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { useCurrencySymbol } from '@/lib/currency'
import { ToolActionsBar } from '@/components/calculator/ToolActionsBar'
import { useSavedScenarioRestore } from '@/lib/use-saved-scenario'
import { ProGuard } from '@/components/calculator/ProGuard'
import { MoneyInput, PctSlider, NumSlider, ResultCard, Stat, fmt } from '@/components/calculator/ProInputs'

/**
 * Monte Carlo Retirement Simulator (Pro).
 *
 * Runs 1,000 simulated lifetimes in today's dollars (returns are deflated
 * by inflation, spending is held constant in real terms). A fixed-seed PRNG
 * keeps the results stable between renders for the same inputs. A path
 * "succeeds" if the portfolio never runs dry before the plan ends.
 */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeGaussian(rand: () => number) {
  let spare: number | null = null
  return () => {
    if (spare !== null) {
      const v = spare
      spare = null
      return v
    }
    let u = 0
    let v = 0
    let s = 0
    do {
      u = rand() * 2 - 1
      v = rand() * 2 - 1
      s = u * u + v * v
    } while (s >= 1 || s === 0)
    const mul = Math.sqrt((-2 * Math.log(s)) / s)
    spare = v * mul
    return u * mul
  }
}

type SimResult = {
  successRate: number
  medianAtRetirement: number
  medianFinal: number
  p10Final: number
  p90Final: number
  band: { year: number; band: [number, number]; p50: number }[]
}

function simulate(
  start: number,
  monthlyContribution: number,
  yearsToRetirement: number,
  expectedReturnPct: number,
  volatilityPct: number,
  inflationPct: number,
  retirementYears: number,
  annualSpending: number
): SimResult {
  const PATHS = 1000
  const rand = mulberry32(20261109)
  const gauss = makeGaussian(rand)
  const realAnnual = (1 + expectedReturnPct / 100) / (1 + inflationPct / 100) - 1
  const monthlyMean = realAnnual / 12
  const monthlyVol = volatilityPct / 100 / Math.sqrt(12)
  const totalYears = yearsToRetirement + retirementYears
  const monthlySpending = annualSpending / 12

  // yearEnd[year][path]
  const yearEnds: number[][] = Array.from({ length: totalYears + 1 }, () => new Array(PATHS).fill(0))
  let successes = 0

  for (let p = 0; p < PATHS; p++) {
    let balance = start
    yearEnds[0][p] = balance
    let depleted = false
    for (let y = 1; y <= totalYears; y++) {
      for (let m = 0; m < 12; m++) {
        if (depleted) break
        balance *= 1 + monthlyMean + monthlyVol * gauss()
        if (y <= yearsToRetirement) {
          balance += monthlyContribution
        } else {
          balance -= monthlySpending
        }
        if (balance <= 0) {
          balance = 0
          depleted = true
        }
      }
      yearEnds[y][p] = balance
    }
    if (!depleted) successes++
  }

  const pct = (values: number[], q: number) => {
    const sorted = [...values].sort((a, b) => a - b)
    return sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))]
  }

  const band = yearEnds.map((values, year) => ({
    year,
    band: [Math.round(pct(values, 0.1)), Math.round(pct(values, 0.9))] as [number, number],
    p50: Math.round(pct(values, 0.5)),
  }))

  const atRetirement = yearEnds[yearsToRetirement]
  const final = yearEnds[totalYears]
  return {
    successRate: Math.round((successes / PATHS) * 1000) / 10,
    medianAtRetirement: pct(atRetirement, 0.5),
    medianFinal: pct(final, 0.5),
    p10Final: pct(final, 0.1),
    p90Final: pct(final, 0.9),
    band,
  }
}

export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {
  useCurrencySymbol()
  const [currentSavings, setCurrentSavings] = useState(150000)
  const [monthlyContribution, setMonthlyContribution] = useState(1500)
  const [yearsToRetirement, setYearsToRetirement] = useState(30)
  const [expectedReturn, setExpectedReturn] = useState(7)
  const [volatility, setVolatility] = useState(12)
  const [inflation, setInflation] = useState(2.5)
  const [retirementYears, setRetirementYears] = useState(30)
  const [annualSpending, setAnnualSpending] = useState(50000)

  // Restore a saved scenario opened from the Vault (?savedId=…).
  useSavedScenarioRestore((s) => {
    if (s.currentSavings !== undefined) setCurrentSavings(s.currentSavings as any)
    if (s.monthlyContribution !== undefined) setMonthlyContribution(s.monthlyContribution as any)
    if (s.yearsToRetirement !== undefined) setYearsToRetirement(s.yearsToRetirement as any)
    if (s.expectedReturn !== undefined) setExpectedReturn(s.expectedReturn as any)
    if (s.volatility !== undefined) setVolatility(s.volatility as any)
    if (s.inflation !== undefined) setInflation(s.inflation as any)
    if (s.retirementYears !== undefined) setRetirementYears(s.retirementYears as any)
    if (s.annualSpending !== undefined) setAnnualSpending(s.annualSpending as any)
  })


  const sim = useMemo(
    () =>
      simulate(
        currentSavings,
        monthlyContribution,
        yearsToRetirement,
        expectedReturn,
        volatility,
        inflation,
        retirementYears,
        annualSpending
      ),
    [currentSavings, monthlyContribution, yearsToRetirement, expectedReturn, volatility, inflation, retirementYears, annualSpending]
  )

  const verdict =
    sim.successRate >= 90
      ? 'A robust plan — it survives almost every market sequence simulated.'
      : sim.successRate >= 75
        ? 'A workable plan with real sequence risk — a small change (save a little more, spend a little less, or retire a year later) buys a lot of safety.'
        : sim.successRate >= 50
          ? 'A coin flip. The plan needs a structural change: higher contributions, lower spending, or a later retirement date.'
          : 'The plan runs dry in most futures. Treat the inputs as the problem, not the market — change the savings rate or the spending target first.'

  const calculator = (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <MoneyInput label="Current retirement savings" value={currentSavings} onChange={setCurrentSavings} />
          <MoneyInput label="Monthly contribution" value={monthlyContribution} onChange={setMonthlyContribution} />
          <NumSlider label="Years until retirement" value={yearsToRetirement} onChange={setYearsToRetirement} min={1} max={45} />
          <PctSlider label="Expected annual return" value={expectedReturn} onChange={setExpectedReturn} min={0} max={14} step={0.25} />
          <PctSlider label="Annual volatility (risk)" value={volatility} onChange={setVolatility} min={0} max={30} step={0.5} />
          <PctSlider label="Inflation" value={inflation} onChange={setInflation} min={0} max={8} step={0.25} />
          <NumSlider label="Years in retirement" value={retirementYears} onChange={setRetirementYears} min={5} max={45} />
          <MoneyInput
            label="Annual spending in retirement"
            value={annualSpending}
            onChange={setAnnualSpending}
            hint="In today's dollars — the simulator deflates returns by inflation, so spending stays in real terms."
          />
        </div>

        <div className="space-y-6">
          <ResultCard title="Simulation results — 1,000 futures">
            <div className="grid grid-cols-2 gap-6">
              <Stat label="Plan success rate" value={`${sim.successRate}%`} sub="of simulated lifetimes never ran dry" />
              <Stat label="Median at retirement" value={fmt(sim.medianAtRetirement)} sub="in today's dollars" />
              <Stat label="Median final balance" value={fmt(sim.medianFinal)} sub="at the end of the plan" />
              <Stat
                label="Bad-luck outcome (p10)"
                value={fmt(sim.p10Final)}
                sub={`Good-luck outcome (p90): ${fmt(sim.p90Final)}`}
              />
            </div>
            <p className="mt-6 border-t border-white/15 pt-4 text-sm font-light leading-relaxed text-white/85">{verdict}</p>
          </ResultCard>

          <div className="rounded-2xl border bg-card p-5">
            <p className="mb-3 text-sm font-bold">Portfolio balance by year — pessimistic to optimistic band</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={sim.band} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} label={{ value: 'Years from now', position: 'insideBottom', offset: -2, fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `${Math.round(v / 1000)}k`} width={45} />
                  <Tooltip formatter={(value: any, name: any) => (name === 'Median' ? fmt(Number(value)) : value)} />
                  <Area dataKey="band" name="10th–90th percentile" stroke="none" fill="#064E3B" fillOpacity={0.15} />
                  <Line type="monotone" dataKey="p50" name="Median" stroke="#064E3B" strokeWidth={2.5} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs font-light text-muted-foreground">
              The shaded band holds the middle 80% of simulated outcomes. Averages hide sequence risk; the band shows it.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <ProGuard
        isPro={isPro}
        toolTitle="Monte Carlo Retirement Simulator"
        features={[
          '1,000 simulated market futures for your exact plan',
          'Success rate, not just an average projection',
          'Percentile band chart — see the bad-luck paths, not only the median',
          'Inflation-adjusted (today\u2019s dollars) throughout',
        ]}
      >
        {calculator}
      </ProGuard>
      <ToolActionsBar
        slug="monte-carlo-retirement-simulator"
        isPro={isPro}
        inputs={{ currentSavings, monthlyContribution, yearsToRetirement, expectedReturn, volatility, inflation, retirementYears, annualSpending }}
      />
    </>
  )
}
