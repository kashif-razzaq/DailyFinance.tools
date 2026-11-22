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
 * Three short paragraphs on what a state's sales tax means in practice.
 * Rule-based on the dataset values; every figure is computed.
 * Paragraphs vary by rank tier and by the size of the local layer, so
 * states in different positions read differently, not just with
 * different numbers in the same sentences.
 */
export function salesTaxMeaning(s: USState): string[] {
  const tax10k = taxOn(10000, s.salesTaxAvgCombined)
  const avgTax10k = taxOn(10000, AVG_COMBINED)
  const gap10k = Math.abs(tax10k - avgTax10k)
  const rank = combinedRank(s)
  const localGap = round2(s.salesTaxAvgCombined - s.salesTaxBase)
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
      `At ${s.salesTaxAvgCombined}% average combined, ${s.name} sits near the top of the national table — rank ${rank} of 51, ${pointsDiff(s.salesTaxAvgCombined, AVG_COMBINED)} points above the all-state average of ${AVG_COMBINED}%. On a $10,000 purchase the tax is about ${money(tax10k)}, roughly ${money(gap10k)} more than the same purchase at the average state's rate. ${rank <= 10 ? `At a top-ten rate, a single point of local tax is $100 on a $10,000 purchase — confirming the exact local rate before you buy is worth real money.` : `For big-ticket items, confirming the exact local rate before you buy is worth real money.`}`,
    )
  } else if (s.salesTaxAvgCombined <= AVG_COMBINED - 1) {
    paras.push(
      `At ${s.salesTaxAvgCombined}% average combined, ${s.name} is a low-sales-tax state — rank ${rank} of 51, ${Math.abs(pointsDiff(s.salesTaxAvgCombined, AVG_COMBINED))} points below the all-state average of ${AVG_COMBINED}%. On a $10,000 purchase the tax is about ${money(tax10k)}, roughly ${money(gap10k)} less than at the average state's rate. ${rank >= 42 ? `The saving is modest on weekly shopping and material on vehicles, appliances and building materials — and at one of the lowest rates in the country, the gap to the average state is widest exactly on the biggest purchases.` : `The saving is modest on weekly shopping and material on vehicles, appliances and building materials.`}`,
    )
  } else {
    paras.push(
      `${s.name}'s average combined rate of ${s.salesTaxAvgCombined}% sits close to the all-state average of ${AVG_COMBINED}% (rank ${rank} of 51). Sales tax here is neither a reason to cross a border nor a penalty for staying — on a $10,000 purchase the tax is about ${money(tax10k)}, within ${money(gap10k)} of what the average state would charge. ${localGap >= 1.5 ? `Local variation inside ${s.name} matters more than the state figure: with about ${localGap} points of local tax on average, city and district layers move the rate more than the state ranking does.` : `Local variation inside ${s.name} matters more than the state figure: city and district layers move the rate more than the state ranking does.`}`,
    )
  }

  const weeklyBasket = 150
  const yearlyIfTaxed = taxOn(weeklyBasket * 52, s.salesTaxAvgCombined)
  if (s.groceries === "exempt") {
    if (rank <= 10) {
      paras.push(
        `Groceries for home consumption are exempt, so the weekly food shop is largely outside this tax. At one of the highest combined rates in the country, that exemption is worth about ${money(yearlyIfTaxed)} a year on a $150 weekly basket — the saving is largest exactly where the rate is highest. Sellers should still check category rules — the exemption covers food, not everything in a supermarket.`,
      )
    } else if (rank <= 20) {
      paras.push(
        `The weekly food shop is largely outside this tax: groceries for home consumption are exempt in ${s.name}. A state that taxed a $150 weekly basket at ${s.name}'s combined rate would collect about ${money(yearlyIfTaxed)} a year from it; in ${s.name} that charge falls only on non-food items and prepared food. At a combined rate above the national average, the exemption is worth more here than in most states. Sellers should still check category rules — the exemption covers food, not everything in a supermarket.`,
      )
    } else {
      paras.push(
        `Groceries for home consumption are exempt in ${s.name}, so the weekly food shop is largely outside this tax. A state that taxed a $150 weekly basket at ${s.name}'s combined rate would collect about ${money(yearlyIfTaxed)} a year from it; in ${s.name} that charge falls only on non-food items and prepared food. Sellers should still check category rules — the exemption covers food, not everything in a supermarket.`,
      )
    }
  } else if (s.groceries === "full") {
    paras.push(
      `${s.name} taxes groceries at the full rate — one of the few states that do. A $150 weekly food shop at the average combined rate of ${s.salesTaxAvgCombined}% carries about ${money(taxOn(weeklyBasket, s.salesTaxAvgCombined))} of tax a week, roughly ${money(yearlyIfTaxed)} a year, before any credits the state offers residents on their income tax return. ${rank <= 10 ? `Households comparing states on cost of living should count this: at one of the highest rates in the country, the food-shop tax is a recurring charge, not a one-off.` : rank >= 42 ? `Households comparing states on cost of living should count this: the rate is near the bottom nationally, but the charge still recurs every week.` : `Households comparing states on cost of living should count this: it is a recurring charge, not a one-off.`}`,
    )
  } else {
    paras.push(
      `Groceries are taxed at a reduced rate in ${s.name}, so the food shop carries some tax but less than the full ${s.salesTaxAvgCombined}% combined rate applied to other goods. ${rank <= 10 ? `The reduced rate and any local add-ons are set out in the groceries note above; at a combined rate near the top of the table, even the reduced food rate adds up over a year.` : `The reduced rate and any local add-ons are set out in the groceries note above; the exact figure varies by locality, so check it before treating a food budget as tax-free.`}`,
    )
  }

  // Third paragraph: the local layer — how much of the combined rate is
  // set below the state, which is the part shoppers most often miss.
  if (s.salesTaxAvgCombined === 0) {
    paras.push(
      `There is no sales tax to layer in ${s.name}: none is levied at state or local level, so the shelf price is the till price everywhere in the state. The comparison that matters for shoppers here is with neighboring states, not between towns inside ${s.name}.`,
    )
  } else if (s.salesTaxBase === 0) {
    paras.push(
      `Every point of the ${s.salesTaxAvgCombined}% average combined rate in ${s.name} is local — there is no state sales tax at all. Some areas charge nothing; others stack city and local taxes. The address decides everything here, so a statewide average is only a starting point.`,
    )
  } else if (localGap === 0) {
    paras.push(
      `There is no local layer in ${s.name}: the ${s.salesTaxBase}% state rate is the rate everywhere in the state, so pricing is the same in every town. ${rank <= 20 ? `That uniformity is the exception nationally — most states add county and city layers on top of the base, so shoppers there face a different rate in every town.` : `That uniformity is the exception nationally — most states add county and city layers on top of the base.`}`,
    )
  } else if (localGap >= 2) {
    paras.push(
      `Local layers do heavy lifting in ${s.name}: on top of the ${s.salesTaxBase}% state base, county, city and district taxes add about ${localGap} points on average, taking the average combined rate to ${s.salesTaxAvgCombined}%. Two addresses in the same state can therefore sit a point or more apart — the rate that matters is the one at the delivery address, not the state headline${rank <= 10 ? `, and at a top-ten rate the difference is worth real money` : ``}.`,
    )
  } else {
    paras.push(
      `The local layer in ${s.name} adds about ${localGap} points on average to the ${s.salesTaxBase}% state base, taking the average combined rate to ${s.salesTaxAvgCombined}%. ${rank <= 10 ? `At a top-ten combined rate, the state rate alone understates what you pay — check the rate for the exact address on a large purchase.` : rank <= 20 ? `The state rate is therefore a reasonable first guess at what you will pay, but city and district taxes still move the total — check the rate for the exact address on a large purchase.` : `The state rate is a reasonable first guess at what you will pay here — the local add-on is modest — though city and district taxes still move the total.`}`,
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

  const cRank = combinedRank(s)
  const pRank = propertyRank(s)
  const incomeLine =
    s.incomeTax === "none"
      ? "no state tax on wages"
      : s.incomeTax === "flat"
        ? "a flat state income tax"
        : "progressive income tax brackets"
  // Second paragraph varies by the state's profile, so the read-together
  // summary is framed around the tax that actually dominates here.
  if (s.incomeTax === "none" && s.propertyTaxAvg >= 1.5) {
    paras.push(
      `With no state income tax, ${s.name} has to be judged on the other two taxes — and the property tax carries much of the weight: an average effective rate of ${s.propertyTaxAvg}% (rank ${pRank} of 51) against an average combined sales tax of ${s.salesTaxAvgCombined}% (rank ${cRank} of 51). The no-income-tax headline flatters high earners most; a homeowner here can easily pay more in property tax than a wage-earner saves on income tax.`,
    )
  } else if (s.incomeTax === "none") {
    paras.push(
      `With no state income tax, ${s.name} has to be judged on the other two taxes: an average combined sales tax of ${s.salesTaxAvgCombined}% (rank ${cRank} of 51) and an average effective property tax of ${s.propertyTaxAvg}% (rank ${pRank} of 51). The no-income-tax headline flatters high earners most; a household that spends heavily or owns an expensive home can still pay more here than in a state that taxes wages but charges less at the register and on property.`,
    )
  } else if (s.propertyTaxAvg >= 1.5) {
    paras.push(
      `The property tax is what sets ${s.name} apart: ${s.propertyTaxAvg}% on average (rank ${pRank} of 51), against an average combined sales tax of ${s.salesTaxAvgCombined}% (rank ${cRank} of 51) and ${incomeLine}. For a homeowner the property line is the one to price first — it is fixed, annual and hard to avoid, while the other two move with spending and earnings.`,
    )
  } else if (cRank <= 10) {
    paras.push(
      `The register is where ${s.name} costs most: its average combined sales tax of ${s.salesTaxAvgCombined}% ranks ${cRank} of 51, well above the ${AVG_COMBINED}% all-state average, while property tax is ${s.propertyTaxAvg}% (rank ${pRank} of 51) and the state has ${incomeLine}. The gap shows up most on big-ticket purchases — vehicles, appliances, building materials — where a point or two of rate is real money.`,
    )
  } else {
    paras.push(
      `Read together: ${s.name} combines an average combined sales tax of ${s.salesTaxAvgCombined}% (rank ${cRank} of 51), an average effective property tax of ${s.propertyTaxAvg}% (rank ${pRank} of 51) and ${incomeLine}. No single levy dominates, so the right comparison is personal: weigh the tax that falls on what you actually do most — earn, spend or own — rather than the headline rate.`,
    )
  }
  return paras
}
