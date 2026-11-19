// One-time migration: split src/data/guides.ts into per-hub files under
// src/data/guides/, adding the framework fields (published, type, sources,
// cornerstone) to the 20 existing guides. Run from the repo root:
//   node scripts/migrate-guides.mjs
// Emits the 5 hub files; guides.ts itself is rewritten separately as the
// thin merge module. Existing guides keep their true publish dates
// (published = current updated) and are all non-cornerstone.
import { execSync } from "child_process"
import { writeFileSync, mkdirSync } from "fs"

execSync(
  "npx esbuild src/data/guides.ts --bundle --platform=node --format=cjs --outfile=/tmp/guides-mig.cjs --log-level=error",
  { stdio: "inherit" }
)
const { GUIDES } = await import("/tmp/guides-mig.cjs")

const TYPE = {
  "how-compound-interest-works": "What",
  "how-to-build-an-emergency-fund": "How-to",
  "50-30-20-rule-explained": "What",
  "how-mortgage-amortization-works": "What",
  "how-much-house-can-i-afford": "What",
  "rent-vs-buy-guide": "Comparison",
  "how-va-loans-work": "What",
  "how-fha-loans-work": "What",
  "how-biweekly-mortgage-payments-work": "How-to",
  "avalanche-vs-snowball-debt-payoff": "Comparison",
  "how-credit-card-interest-works": "What",
  "what-is-debt-to-income-ratio": "What",
  "how-federal-income-tax-brackets-work": "What",
  "how-to-read-your-paycheck": "How-to",
  "roth-vs-traditional-ira": "Comparison",
  "social-security-benefits-explained": "What",
  "self-employment-tax-explained": "What",
  "how-to-price-freelance-work": "How-to",
  "how-youtube-pays-creators": "What",
  "etsy-and-ebay-fees-explained": "What",
}

const SOURCES = {
  "how-compound-interest-works": [
    { label: "Investor.gov — Compound Interest Calculator", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
  ],
  "how-to-build-an-emergency-fund": [
    { label: "CFPB — Start Small, Save Up", url: "https://www.consumerfinance.gov/start-small-save-up/" },
  ],
  "50-30-20-rule-explained": [
    { label: "CFPB — Consumer Tools", url: "https://www.consumerfinance.gov/consumer-tools/" },
  ],
  "how-mortgage-amortization-works": [
    { label: "CFPB — Mortgages", url: "https://www.consumerfinance.gov/consumer-tools/mortgages/" },
  ],
  "how-much-house-can-i-afford": [
    { label: "CFPB — Owning a Home", url: "https://www.consumerfinance.gov/owning-a-home/" },
  ],
  "rent-vs-buy-guide": [
    { label: "CFPB — Owning a Home", url: "https://www.consumerfinance.gov/owning-a-home/" },
  ],
  "how-va-loans-work": [
    { label: "VA.gov — VA Home Loans", url: "https://www.va.gov/housing-assistance/home-loans/" },
  ],
  "how-fha-loans-work": [
    { label: "HUD — FHA Single Family Housing", url: "https://www.hud.gov/program_offices/housing/sfh" },
  ],
  "how-biweekly-mortgage-payments-work": [
    { label: "CFPB — Enforcement Action: Nationwide Biweekly Administration", url: "https://www.consumerfinance.gov/enforcement/actions/nationwide-biweekly-administration/" },
  ],
  "avalanche-vs-snowball-debt-payoff": [
    { label: "CFPB — Debt Collection", url: "https://www.consumerfinance.gov/consumer-tools/debt-collection/" },
  ],
  "how-credit-card-interest-works": [
    { label: "CFPB — Credit Cards", url: "https://www.consumerfinance.gov/consumer-tools/credit-cards/" },
  ],
  "what-is-debt-to-income-ratio": [
    { label: "CFPB — What Is a Debt-to-Income Ratio?", url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/" },
  ],
  "how-federal-income-tax-brackets-work": [
    { label: "IRS — Revenue Procedure 2025-32 (2026 figures)", url: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  ],
  "how-to-read-your-paycheck": [
    { label: "IRS — Tax Withholding Estimator", url: "https://www.irs.gov/individuals/tax-withholding-estimator" },
  ],
  "roth-vs-traditional-ira": [
    { label: "IRS — Roth IRAs", url: "https://www.irs.gov/retirement-plans/roth-iras" },
    { label: "IRS — Traditional IRAs", url: "https://www.irs.gov/retirement-plans/traditional-iras" },
  ],
  "social-security-benefits-explained": [
    { label: "SSA — Retirement Benefits", url: "https://www.ssa.gov/benefits/retirement" },
  ],
  "self-employment-tax-explained": [
    { label: "IRS — Self-Employment Tax", url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes" },
  ],
  "how-to-price-freelance-work": [
    { label: "BLS — Occupational Employment and Wage Statistics", url: "https://www.bls.gov/oes/" },
    { label: "IRS — Self-Employment Tax", url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes" },
  ],
  "how-youtube-pays-creators": [
    { label: "YouTube Creators — Monetization", url: "https://www.youtube.com/creators/" },
  ],
  "etsy-and-ebay-fees-explained": [
    { label: "Etsy — Fees & Payments Policy", url: "https://www.etsy.com/legal/fees/" },
    { label: "eBay — Selling Fees", url: "https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822" },
  ],
}

const HUB_FILE = {
  "Personal Finance": ["personal-finance", "GUIDES_PERSONAL_FINANCE"],
  "Mortgage & Real Estate": ["mortgage-real-estate", "GUIDES_MORTGAGE_REAL_ESTATE"],
  "Loans & Debt": ["loans-debt", "GUIDES_LOANS_DEBT"],
  "Salary, Tax, Retirement & Investing": ["tax-salary-retirement", "GUIDES_TAX_SALARY_RETIREMENT"],
  "Freelance & Business": ["freelance-creator-business", "GUIDES_FREELANCE_CREATOR_BUSINESS"],
  "Creator & E-Commerce": ["freelance-creator-business", "GUIDES_FREELANCE_CREATOR_BUSINESS"],
}

const HUB_RENAME = {
  "Freelance & Business": "Freelance, Creator & Business",
  "Creator & E-Commerce": "Freelance, Creator & Business",
}

const groups = {}
for (const g of GUIDES) {
  const hub = HUB_RENAME[g.hub] || g.hub
  const out = {
    ...g,
    hub,
    published: g.updated,
    type: TYPE[g.slug],
    sources: SOURCES[g.slug] || [],
    cornerstone: false,
  }
  // stable key order: keep the original field order, new fields appended by spread
  ;(groups[hub] = groups[hub] || []).push(out)
}

mkdirSync("src/data/guides", { recursive: true })
for (const [hub, list] of Object.entries(groups)) {
  const [file, varName] = HUB_FILE[Object.keys(HUB_FILE).find((k) => (HUB_RENAME[k] || k) === hub)]
  const body =
    `import type { Guide } from "../guides"\n\n` +
    `/** Editorial guides — ${hub} hub. Part of the 100-article framework set. */\n` +
    `export const ${varName}: Guide[] = ${JSON.stringify(list, null, 2)}\n`
  writeFileSync(`src/data/guides/${file}.ts`, body)
  console.log(`${file}.ts: ${list.length} guides`)
}
console.log("total:", GUIDES.length)
