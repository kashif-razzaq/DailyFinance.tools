/**
 * Derived statistics for the programmatic location pages.
 *
 * Every number here is computed from us-states.ts / us-cities.ts at build
 * time — nothing is hand-written per state, so rankings, averages and
 * comparisons can never drift from the rates the pages display.
 * "National average" = the mean across the 51 dataset entries
 * (50 states + District of Columbia).
 */
import { US_STATES, taxOn, type USState } from "./us-states"
import { US_CITIES, type USCity } from "./us-cities"

export const round2 = (n: number) => Math.round(n * 100) / 100
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
const money = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 })

/** Mean average-combined sales tax rate across all 51 entries (%) */
export const AVG_COMBINED = round2(mean(US_STATES.map((s) => s.salesTaxAvgCombined)))
/** Mean state base sales tax rate across all 51 entries (%) */
export const AVG_BASE = round2(mean(US_STATES.map((s) => s.salesTaxBase)))
/** Mean average effective property tax rate across all 51 entries (%) */
export const AVG_PROPERTY = round2(mean(US_STATES.map((s) => s.propertyTaxAvg)))
/** Mean combined rate across the 30 dataset cities (%) */
export const AVG_CITY_COMBINED = round2(mean(US_CITIES.map((c) => c.combinedRate)))

const byCombinedDesc = [...US_STATES].sort((a, b) => b.salesTaxAvgCombined - a.salesTaxAvgCombined)
const byPropertyDesc = [...US_STATES].sort((a, b) => b.propertyTaxAvg - a.propertyTaxAvg)
const citiesByCombinedDesc = [...US_CITIES].sort((a, b) => b.combinedRate - a.combinedRate)

/** Rank by average combined sales tax, 1 = highest of 51 */
export function combinedRank(s: USState): number {
  return byCombinedDesc.findIndex((o) => o.slug === s.slug) + 1
}

/** Rank by average effective property tax, 1 = highest of 51 */
export function propertyRank(s: USState): number {
  return byPropertyDesc.findIndex((o) => o.slug === s.slug) + 1
}

/** The n states with the highest average combined sales tax rates */
export function highestCombined(n = 3): USState[] {
  return byCombinedDesc.slice(0, n)
}

/** The n states with the lowest average combined sales tax rates */
export function lowestCombined(n = 3): USState[] {
  return byCombinedDesc.slice(-n).reverse()
}

/** The states whose combined rate sits closest to this state's — its peer group */
export function closestByCombined(s: USState, count = 4): USState[] {
  return US_STATES.filter((o) => o.slug !== s.slug)
    .sort(
      (a, b) =>
        Math.abs(a.salesTaxAvgCombined - s.salesTaxAvgCombined) - Math.abs(b.salesTaxAvgCombined - s.salesTaxAvgCombined) ||
        b.salesTaxAvgCombined - a.salesTaxAvgCombined,
    )
    .slice(0, count)
    .sort((a, b) => b.salesTaxAvgCombined - a.salesTaxAvgCombined)
}

/** Rank of a city by combined rate among the 30 dataset cities, 1 = highest */
export function cityRank(c: USCity): number {
  return citiesByCombinedDesc.findIndex((o) => o.slug === c.slug && o.stateSlug === c.stateSlug) + 1
}

export function highestCities(n = 2): USCity[] {
  return citiesByCombinedDesc.slice(0, n)
}

export function lowestCities(n = 2): USCity[] {
  return citiesByCombinedDesc.slice(-n).reverse()
}

/** Signed difference in percentage points, rounded for display */
export function pointsDiff(a: number, b: number): number {
  return round2(a - b)
}

/**
 * Two short paragraphs on what a state's sales tax means in practice.
 * Rule-based on the dataset values; every figure is computed.
 */
export function salesTaxMeaning(s: USState): string[] {
  const tax10k = taxOn(10000, s.salesTaxAvgCombined)
  const avgTax10k = taxOn(10000, AVG_COMBINED)
  const gap10k = Math.abs(tax10k - avgTax10k)
  const paras: string[] = []

  if (s.salesTaxAvgCombined === 0) {
    paras.push(
      `${s.name} charges no sales tax at the state or local level. A $10,000 purchase that carries about ${money(avgTax10k)} of tax at the all-state average combined rate of ${AVG_COMBINED}% carries $0 here. That arithmetic is why no-sales-tax states draw cross-border shoppers for cars, appliances and electronics — and why the saving is largest exactly on the purchases households plan in advance.`,
    )
  } else if (s.salesTaxBase === 0) {
    paras.push(
      `${s.name} levies no state sales tax, so the ${s.salesTaxAvgCombined}% average combined figure comes entirely from local jurisdictions — some areas charge nothing at all. Where you buy inside ${s.name} decides whether tax applies at all, which makes the address, not the state, the number to check before a large purchase.`,
    )
  } else if (s.salesTaxAvgCombined >= AVG_COMBINED + 1) {
    paras.push(
      `At ${s.salesTaxAvgCombined}% average combined, ${s.name} sits near the top of the national table — rank ${combinedRank(s)} of 51, ${pointsDiff(s.salesTaxAvgCombined, AVG_COMBINED)} points above the all-state average of ${AVG_COMBINED}%. On a $10,000 purchase the tax is about ${money(tax10k)}, roughly ${money(gap10k)} more than the same purchase at the average state's rate. For big-ticket items, confirming the exact local rate before you buy is worth real money.`,
    )
  } else if (s.salesTaxAvgCombined <= AVG_COMBINED - 1) {
    paras.push(
      `At ${s.salesTaxAvgCombined}% average combined, ${s.name} is a low-sales-tax state — rank ${combinedRank(s)} of 51, ${Math.abs(pointsDiff(s.salesTaxAvgCombined, AVG_COMBINED))} points below the all-state average of ${AVG_COMBINED}%. On a $10,000 purchase the tax is about ${money(tax10k)}, roughly ${money(gap10k)} less than at the average state's rate. The saving is modest on weekly shopping and material on vehicles, appliances and building materials.`,
    )
  } else {
    paras.push(
      `${s.name}'s average combined rate of ${s.salesTaxAvgCombined}% sits close to the all-state average of ${AVG_COMBINED}% (rank ${combinedRank(s)} of 51). Sales tax here is neither a reason to cross a border nor a penalty for staying — on a $10,000 purchase the tax is about ${money(tax10k)}, within ${money(gap10k)} of what the average state would charge. Local variation inside ${s.name} matters more than the state figure: city and district layers move the rate more than the state ranking does.`,
    )
  }

  const weeklyBasket = 150
  const yearlyIfTaxed = taxOn(weeklyBasket * 52, s.salesTaxAvgCombined)
  if (s.groceries === "exempt") {
    paras.push(
      `Groceries for home consumption are exempt, so the weekly food shop is largely outside this tax. A state that taxed a $150 weekly basket at ${s.name}'s combined rate would collect about ${money(yearlyIfTaxed)} a year from it; in ${s.name} that charge falls only on non-food items and prepared food. Sellers should still check category rules — the exemption covers food, not everything in a supermarket.`,
    )
  } else if (s.groceries === "full") {
    paras.push(
      `${s.name} taxes groceries at the full rate — one of the few states that do. A $150 weekly food shop at the average combined rate of ${s.salesTaxAvgCombined}% carries about ${money(taxOn(weeklyBasket, s.salesTaxAvgCombined))} of tax a week, roughly ${money(yearlyIfTaxed)} a year, before any credits the state offers residents on their income tax return. Households comparing states on cost of living should count this: it is a recurring charge, not a one-off.`,
    )
  } else {
    paras.push(
      `Groceries are taxed at a reduced rate in ${s.name}, so the food shop carries some tax but less than the full ${s.salesTaxAvgCombined}% combined rate applied to other goods. The reduced rate and any local add-ons are set out in the groceries note above; the exact figure varies by locality, so check it before treating a food budget as tax-free.`,
    )
  }
  return paras
}

/**
 * Two to three short paragraphs on a state's overall tax position —
 * sales, property and income read together. Rule-based, all figures computed.
 */
export function overallMeaning(s: USState): string[] {
  const homeValue = 400000
  const propertyYear = Math.round((homeValue * s.propertyTaxAvg) / 100)
  const paras: string[] = []

  if (s.incomeTax === "none" && s.propertyTaxAvg >= AVG_PROPERTY) {
    paras.push(
      `${s.name} does not tax wages, but the revenue is recovered elsewhere. Property tax is the main lever: at an average effective rate of ${s.propertyTaxAvg}% (rank ${propertyRank(s)} of 51, against an all-state average of ${AVG_PROPERTY}%), a ${money(homeValue)} home carries about ${money(propertyYear)} a year — collected monthly through mortgage escrow, so it shows up as a higher monthly payment rather than an annual bill. Renters feel it indirectly through rent.`,
    )
  } else if (s.incomeTax === "none") {
    paras.push(
      `${s.name} does not tax wages, and its property tax is not carrying the load either: the average effective rate of ${s.propertyTaxAvg}% ranks ${propertyRank(s)} of 51, below the all-state average of ${AVG_PROPERTY}%. On a ${money(homeValue)} home that is about ${money(propertyYear)} a year. Read with the sales tax above, ${s.name} is a genuinely low-tax state on the three taxes most households pay.`,
    )
  } else if (s.propertyTaxAvg >= 1.5) {
    paras.push(
      `Property tax is the heavy line in ${s.name}. At an average effective rate of ${s.propertyTaxAvg}% — rank ${propertyRank(s)} of 51, against an all-state average of ${AVG_PROPERTY}% — a ${money(homeValue)} home carries about ${money(propertyYear)} a year, roughly ${money(propertyYear / 12)} a month. Because lenders collect property tax through escrow, it raises the monthly mortgage payment directly; affordability calculations that use only principal and interest understate the cost of owning here.`,
    )
  } else if (s.propertyTaxAvg <= 0.6) {
    paras.push(
      `Property tax is light in ${s.name}: an average effective rate of ${s.propertyTaxAvg}% ranks ${propertyRank(s)} of 51, well below the all-state average of ${AVG_PROPERTY}%. A ${money(homeValue)} home carries about ${money(propertyYear)} a year. Low property tax lowers the fixed cost of owning, which partly offsets whatever the state's income and sales taxes take.`,
    )
  } else {
    paras.push(
      `Property tax in ${s.name} sits near the middle nationally: an average effective rate of ${s.propertyTaxAvg}% (rank ${propertyRank(s)} of 51; all-state average ${AVG_PROPERTY}%). On a ${money(homeValue)} home that is about ${money(propertyYear)} a year, or ${money(propertyYear / 12)} a month through escrow. No single tax dominates the picture here — the state's overall position is the sum of three middling taxes rather than one extreme one.`,
    )
  }

  const incomeLine =
    s.incomeTax === "none"
      ? "no state tax on wages"
      : s.incomeTax === "flat"
        ? "a flat state income tax"
        : "progressive income tax brackets"
  paras.push(
    `Read together: ${s.name} combines an average combined sales tax of ${s.salesTaxAvgCombined}% (rank ${combinedRank(s)} of 51), an average effective property tax of ${s.propertyTaxAvg}% (rank ${propertyRank(s)} of 51) and ${incomeLine}. A household comparing states should compare all three against its own pattern — a high earner who rents weighs the income tax most; a homeowner on a fixed income weighs the property tax most.`,
  )
  return paras
}
