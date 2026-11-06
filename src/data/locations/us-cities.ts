/**
 * Major-city combined sales tax data for programmatic city pages.
 * Anchor source: Tax Foundation "Sales Tax Rates by City" (2024, rates as of
 * 1 July 2024), cross-checked Nov 2026 against Avalara / state DOR tables.
 * Combined rates are approximations for a typical in-city-limits address and
 * are labelled as such on every page. See /methodology.
 */

export interface USCity {
  name: string
  slug: string
  stateSlug: string
  /** Approx combined sales tax rate (%) inside city limits */
  combinedRate: number
  fact: string
}

export const US_CITIES: USCity[] = [
  { name: "New York City", slug: "new-york-city", stateSlug: "new-york", combinedRate: 8.875, fact: "4.00% state + 4.50% city + 0.375% Metropolitan Commuter Transportation District. Groceries are exempt, and clothing and footwear under $110 per item are exempt from the state and city tax." },
  { name: "Los Angeles", slug: "los-angeles", stateSlug: "california", combinedRate: 9.5, fact: "District taxes in Los Angeles County vary block by block — parts of LA County reach 10.25% or more, and some 2026 tables list central LA at 9.75%. Groceries are exempt statewide in California; prepared food is taxed." },
  { name: "Chicago", slug: "chicago", stateSlug: "illinois", combinedRate: 10.25, fact: "6.25% state + 1.75% Cook County + 1.25% city + 1.00% RTA transit tax — for years the highest combined rate of any major US city. Illinois eliminated its 1% state grocery tax in 2026, though many municipalities adopted their own." },
  { name: "Houston", slug: "houston", stateSlug: "texas", combinedRate: 8.25, fact: "At the Texas statutory cap: 6.25% state + 1.00% City of Houston + 1.00% METRO transit. Harris County itself levies no sales tax. Groceries are exempt in Texas." },
  { name: "Phoenix", slug: "phoenix", stateSlug: "arizona", combinedRate: 8.6, fact: "Arizona levies a Transaction Privilege Tax (TPT) rather than a classic sales tax: 5.60% state + 0.70% Maricopa County + city tax. Groceries are exempt at the state level and Phoenix does not tax groceries, though some Arizona cities do." },
  { name: "Philadelphia", slug: "philadelphia", stateSlug: "pennsylvania", combinedRate: 8.0, fact: "Pennsylvania has only two local sales taxes — Philadelphia adds 2% (Allegheny County adds 1%). Most clothing and footwear are fully exempt statewide with no price cap, and groceries are exempt." },
  { name: "San Antonio", slug: "san-antonio", stateSlug: "texas", combinedRate: 8.25, fact: "At the Texas cap: 6.25% state + 1.125% city + 0.50% VIA transit + 0.375% Advanced Transportation District. Groceries are exempt." },
  { name: "San Diego", slug: "san-diego", stateSlug: "california", combinedRate: 7.75, fact: "The lowest combined rate of any large California city — only about 0.50% of district tax (TransNet) above the 7.25% statewide base. Groceries are exempt." },
  { name: "Dallas", slug: "dallas", stateSlug: "texas", combinedRate: 8.25, fact: "At the Texas cap: 6.25% state + 1.00% city + 1.00% DART transit. Groceries are exempt." },
  { name: "Austin", slug: "austin", stateSlug: "texas", combinedRate: 8.25, fact: "At the Texas cap: 6.25% state + 1.00% city + 1.00% CapMetro transit. Groceries are exempt." },
  { name: "Jacksonville", slug: "jacksonville", stateSlug: "florida", combinedRate: 7.5, fact: "Florida has no city sales tax — local variation is the county discretionary surtax only (Duval County 1.50%). The surtax applies only to the first $5,000 of a single taxable item. Groceries are exempt." },
  { name: "Fort Worth", slug: "fort-worth", stateSlug: "texas", combinedRate: 8.25, fact: "At the Texas cap: 6.25% state + 1.00% city + 0.50% Trinity Metro + 0.50% Crime Control and Prevention District. Groceries are exempt." },
  { name: "San Jose", slug: "san-jose", stateSlug: "california", combinedRate: 9.375, fact: "Santa Clara County transit (VTA) and county district taxes drive the add-on above the 7.25% base. Groceries are exempt." },
  { name: "Columbus", slug: "columbus", stateSlug: "ohio", combinedRate: 7.5, fact: "5.75% state + 1.75% Franklin County including COTA transit. Groceries for home consumption are exempt in Ohio; prepared food is taxed." },
  { name: "Charlotte", slug: "charlotte", stateSlug: "north-carolina", combinedRate: 7.25, fact: "4.75% state + 2.50% Mecklenburg County including its transit tax. Groceries are exempt from the state tax but pay a local food tax of roughly 2% in North Carolina." },
  { name: "Indianapolis", slug: "indianapolis", stateSlug: "indiana", combinedRate: 7.0, fact: "Indiana has no local sales tax at all — a flat 7.00% everywhere in the state. Most groceries for home consumption are exempt." },
  { name: "San Francisco", slug: "san-francisco", stateSlug: "california", combinedRate: 8.625, fact: "A consolidated city-and-county: the rate includes BART and city district taxes above the 7.25% statewide base. Groceries are exempt." },
  { name: "Seattle", slug: "seattle", stateSlug: "washington", combinedRate: 10.35, fact: "Includes Sound Transit (RTA) at about 1.40% plus King County and city taxes — among the highest big-city rates in the US. Groceries are exempt in Washington, and the state has no income tax: the high sales tax is the trade-off." },
  { name: "Denver", slug: "denver", stateSlug: "colorado", combinedRate: 8.81, fact: "Colorado's 2.90% state base is the lowest in the US, but Denver is a home-rule, self-collected city: 4.81% city + 1.00% RTD + 0.10% cultural district — sellers file separately with the city and the state." },
  { name: "Oklahoma City", slug: "oklahoma-city", stateSlug: "oklahoma", combinedRate: 8.625, fact: "4.50% state + 4.125% city (including the 1% MAPS 4 penny). The city spans four counties, so edges of the city can differ slightly. Oklahoma eliminated its state grocery tax in August 2024; local grocery taxes still apply." },
  { name: "Nashville", slug: "nashville", stateSlug: "tennessee", combinedRate: 9.25, fact: "7.00% state + 2.25% Davidson County local tax. Groceries are taxed at a reduced 4.00% state rate plus local tax — Tennessee has no income tax on wages, funded instead by high sales taxes." },
  { name: "Washington", slug: "washington", stateSlug: "district-of-columbia", combinedRate: 6.0, fact: "A single district-wide rate with no local add-on — but special rates apply: restaurant meals and rental cars 10%, hotels 14.95%, commercial parking 18%. Groceries are exempt." },
  { name: "Las Vegas", slug: "las-vegas", stateSlug: "nevada", combinedRate: 8.375, fact: "Clark County has Nevada's highest rate: the 6.85% combined statutory base plus 1.525% county local tax. Groceries for home consumption are exempt." },
  { name: "Louisville", slug: "louisville", stateSlug: "kentucky", combinedRate: 6.0, fact: "Kentucky has no local sales tax — a flat 6.00% statewide. Groceries are exempt." },
  { name: "Milwaukee", slug: "milwaukee", stateSlug: "wisconsin", combinedRate: 7.9, fact: "Changed on 1 January 2024: 5.00% state + 0.90% Milwaukee County + 2.00% City of Milwaukee — the only city sales tax in Wisconsin, created under WI Act 12. Groceries are exempt." },
  { name: "Portland", slug: "portland", stateSlug: "oregon", combinedRate: 0, fact: "No state or local sales tax at all — a $0 line on every receipt. Oregon funds services through a high state income tax (top rate 9.9%) instead, so 'no sales tax' does not mean low-tax overall." },
  { name: "Atlanta", slug: "atlanta", stateSlug: "georgia", combinedRate: 8.9, fact: "Most of the city (Fulton and DeKalb) totals 4.00% state + 4.90% local including MARTA transit; a small Cobb County slice is about 6.00% — the exact address matters. Groceries are exempt from the 4% state tax but local taxes still apply." },
  { name: "Miami", slug: "miami", stateSlug: "florida", combinedRate: 7.0, fact: "No city tax in Florida: 6.00% state + 1.00% Miami-Dade County surtax for transit and infrastructure. The surtax applies only to the first $5,000 of an item. Groceries are exempt." },
  { name: "Boston", slug: "boston", stateSlug: "massachusetts", combinedRate: 6.25, fact: "No local sales tax — a flat statewide rate. Groceries are exempt, and clothing is exempt up to $175 per item (only the amount above $175 is taxed)." },
  { name: "Minneapolis", slug: "minneapolis", stateSlug: "minnesota", combinedRate: 9.025, fact: "Rose by a full point in October 2023 for Twin Cities metro transport and housing taxes, on top of Hennepin County and city layers. Minnesota fully exempts groceries and most clothing — one of only a handful of full clothing-exemption states." },
]

export function getCitiesByState(stateSlug: string): USCity[] {
  return US_CITIES.filter((c) => c.stateSlug === stateSlug)
}

export function getCity(stateSlug: string, citySlug: string): USCity | undefined {
  return US_CITIES.find((c) => c.stateSlug === stateSlug && c.slug === citySlug)
}
