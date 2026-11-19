// Generates the 100-article content plan (JSON + Markdown) for the
// DailyFinance framework build. 5 hubs x 20 guides. The 20 existing guides
// keep their true publish dates; the 80 new ones get round-robin spread
// dates across 19 Sep - 18 Nov 2026 (max 2/day), interleaved by hub so no
// hub clusters in one part of the window.
// Run: node scripts/generate-content-plan.mjs
import { writeFileSync } from "fs"

const DATES = "2026-09-19,2026-09-19,2026-09-20,2026-09-21,2026-09-22,2026-09-22,2026-09-23,2026-09-24,2026-09-25,2026-09-25,2026-09-26,2026-09-27,2026-09-28,2026-09-28,2026-09-29,2026-09-30,2026-10-01,2026-10-01,2026-10-02,2026-10-03,2026-10-04,2026-10-04,2026-10-05,2026-10-06,2026-10-07,2026-10-07,2026-10-08,2026-10-09,2026-10-10,2026-10-10,2026-10-11,2026-10-12,2026-10-13,2026-10-13,2026-10-14,2026-10-15,2026-10-16,2026-10-16,2026-10-17,2026-10-18,2026-10-19,2026-10-19,2026-10-20,2026-10-21,2026-10-22,2026-10-22,2026-10-23,2026-10-24,2026-10-25,2026-10-25,2026-10-26,2026-10-27,2026-10-28,2026-10-28,2026-10-29,2026-10-30,2026-10-31,2026-10-31,2026-11-01,2026-11-02,2026-11-03,2026-11-03,2026-11-04,2026-11-05,2026-11-06,2026-11-06,2026-11-07,2026-11-08,2026-11-09,2026-11-09,2026-11-10,2026-11-11,2026-11-12,2026-11-12,2026-11-13,2026-11-14,2026-11-15,2026-11-16,2026-11-17,2026-11-18".split(",")

// [slug, title, type, words, cornerstone?, related tool slugs (category/slug)]
const NEW = {
  "Personal Finance": [
    ["personal-finance-basics-complete-guide", "Personal Finance Basics: The Complete Beginner's Guide", "What", 3500, true, ["personal-wealth/budget-calculator", "personal-wealth/net-worth-tracker", "personal-wealth/savings-calculator"]],
    ["how-to-build-a-budget-that-works", "How to Build a Budget That Actually Works", "How-to", 2500, false, ["personal-wealth/budget-calculator", "personal-wealth/50-30-20-budget-calculator", "personal-wealth/savings-goal-calculator"]],
    ["what-is-net-worth", "What Is Net Worth and How to Calculate It", "What", 2500, false, ["personal-wealth/net-worth-tracker", "personal-wealth/compound-interest-scaler-calculator"]],
    ["how-much-should-i-save-each-month", "How Much Should I Save Each Month?", "What", 2500, false, ["personal-wealth/savings-calculator", "personal-wealth/savings-goal-calculator", "personal-wealth/emergency-fund-visualizer"]],
    ["high-yield-savings-accounts-explained", "High-Yield Savings Accounts Explained", "What", 2500, false, ["personal-wealth/high-yield-savings-calculator", "personal-wealth/apy-calculator", "personal-wealth/high-yield-savings-cd-calculator"]],
    ["best-budgeting-methods-compared", "The Best Budgeting Methods Compared", "Comparison", 2500, false, ["personal-wealth/budget-calculator", "personal-wealth/50-30-20-budget-calculator"]],
    ["money-mistakes-that-keep-you-broke", "7 Money Mistakes That Keep You Broke", "Mistakes", 2500, false, ["personal-wealth/budget-calculator", "loans/debt-payoff-calculator"]],
    ["what-is-fire-movement", "What Is the FIRE Movement?", "What", 2500, false, ["personal-wealth/coast-fire-calculator", "personal-wealth/fat-fire-vs-lean-fire-calculator", "personal-wealth/retirement-calculator"]],
    ["how-to-save-for-a-house-deposit", "How to Save for a House Deposit", "How-to", 2500, false, ["personal-wealth/savings-goal-calculator", "real-estate/down-payment-calculator", "personal-wealth/high-yield-savings-calculator"]],
    ["how-inflation-eats-your-savings", "How Inflation Quietly Eats Your Savings", "What", 2500, false, ["personal-wealth/inflation-purchasing-power-calculator", "personal-wealth/apy-calculator"]],
    ["what-to-do-with-a-windfall", "What to Do With a Windfall", "What", 2500, false, ["personal-wealth/investment-calculator", "loans/debt-payoff-calculator", "personal-wealth/emergency-fund-visualizer"]],
    ["how-to-build-wealth-on-a-low-income", "How to Build Wealth on a Low Income", "How-to", 2500, false, ["personal-wealth/compound-interest-scaler-calculator", "personal-wealth/savings-calculator", "personal-wealth/budget-calculator"]],
    ["how-to-start-an-emergency-fund-from-zero", "How to Start an Emergency Fund From $0", "How-to", 1500, false, ["personal-wealth/emergency-fund-visualizer", "personal-wealth/savings-goal-calculator"]],
    ["sinking-funds-vs-emergency-funds", "Sinking Funds vs Emergency Funds", "Comparison", 1500, false, ["personal-wealth/savings-goal-calculator", "personal-wealth/emergency-fund-visualizer"]],
    ["52-week-savings-challenge", "The 52-Week Savings Challenge (and Why It Fails)", "How-to", 1500, false, ["personal-wealth/savings-calculator", "personal-wealth/savings-goal-calculator"]],
    ["how-to-teach-kids-about-money", "How to Teach Your Kids About Money", "How-to", 1500, false, ["personal-wealth/compound-interest-scaler-calculator", "personal-wealth/savings-calculator"]],
    ["why-your-savings-account-pays-nothing", "Why Your Savings Account Pays Almost Nothing", "Troubleshooting", 1500, false, ["personal-wealth/apy-calculator", "personal-wealth/high-yield-savings-calculator"]],
  ],
  "Mortgage & Real Estate": [
    ["how-to-buy-your-first-home", "How to Buy Your First Home, Step by Step", "How-to", 3500, true, ["real-estate/home-affordability-calculator", "real-estate/mortgage-payment-calculator", "real-estate/closing-cost-calculator", "real-estate/down-payment-calculator"]],
    ["fixed-vs-adjustable-rate-mortgages", "Fixed vs Adjustable-Rate Mortgages", "Comparison", 2500, false, ["real-estate/mortgage-payment-calculator", "real-estate/mortgage-amortization-calculator"]],
    ["what-is-pmi", "What Is PMI and How to Get Rid of It", "What", 2500, false, ["real-estate/mortgage-payment-calculator", "real-estate/home-equity-calculator"]],
    ["how-to-refinance-your-mortgage", "How to Refinance Your Mortgage", "How-to", 2500, false, ["real-estate/refinance-calculator", "real-estate/mortgage-payment-calculator"]],
    ["first-time-home-buyer-mistakes", "10 First-Time Home Buyer Mistakes", "Mistakes", 2500, false, ["real-estate/home-affordability-calculator", "real-estate/closing-cost-calculator"]],
    ["how-closing-costs-work", "How Closing Costs Work", "What", 2500, false, ["real-estate/closing-cost-calculator", "real-estate/mortgage-payment-calculator"]],
    ["what-is-a-home-equity-loan", "What Is a Home Equity Loan?", "What", 2500, false, ["real-estate/home-equity-calculator", "real-estate/heloc-drawdown-simulator"]],
    ["how-to-pay-off-your-mortgage-early", "How to Pay Off Your Mortgage Early", "How-to", 2500, false, ["real-estate/mortgage-payoff-calculator", "real-estate/biweekly-mortgage-calculator"]],
    ["why-was-my-mortgage-application-denied", "Why Was My Mortgage Application Denied?", "Troubleshooting", 2500, false, ["loans/debt-to-income-ratio-calculator", "real-estate/home-affordability-calculator"]],
    ["fha-vs-conventional-loans", "FHA vs Conventional Loans", "Comparison", 2500, false, ["real-estate/fha-loan-calculator", "real-estate/mortgage-payment-calculator"]],
    ["how-property-taxes-are-calculated", "How Property Taxes Are Calculated", "What", 2500, false, ["real-estate/property-tax-assessor-calculator", "real-estate/mortgage-payment-calculator"]],
    ["how-much-is-my-house-worth", "How Much Is My House Worth?", "What", 1500, false, ["real-estate/home-equity-calculator", "real-estate/cap-rate-calculator"]],
    ["mortgage-pre-approval-vs-pre-qualification", "Mortgage Pre-Approval vs Pre-Qualification", "Comparison", 1500, false, ["real-estate/home-affordability-calculator"]],
    ["mortgage-faqs-first-time-buyers", "Mortgage FAQs: 20 Questions First-Time Buyers Ask", "FAQ", 1500, false, ["real-estate/mortgage-payment-calculator", "real-estate/home-affordability-calculator"]],
  ],
  "Loans & Debt": [
    ["how-to-get-out-of-debt", "How to Get Out of Debt: The Complete Guide", "How-to", 3500, true, ["loans/debt-payoff-calculator", "personal-wealth/debt-avalanche-vs-snowball-calculator", "loans/debt-consolidation-calculator"]],
    ["what-is-a-personal-loan", "What Is a Personal Loan?", "What", 2500, false, ["loans/personal-loan-calculator", "loans/loan-calculator", "loans/apr-calculator"]],
    ["how-credit-scores-work", "How Credit Scores Work", "What", 2500, false, ["loans/credit-card-calculator", "loans/debt-to-income-ratio-calculator"]],
    ["how-to-improve-your-credit-score", "How to Improve Your Credit Score Fast", "How-to", 2500, false, ["personal-wealth/credit-card-payoff-calculator", "loans/debt-to-income-ratio-calculator"]],
    ["debt-consolidation-loans-explained", "Debt Consolidation Loans Explained", "What", 2500, false, ["loans/debt-consolidation-calculator", "loans/loan-calculator"]],
    ["student-loan-repayment-plans-compared", "Student Loans: Repayment Plans Compared", "Comparison", 2500, false, ["loans/student-loan-calculator", "personal-wealth/student-loan-payoff-calculator"]],
    ["what-happens-if-you-default-on-a-loan", "What Happens If You Default on a Loan?", "What", 2500, false, ["loans/loan-calculator", "loans/debt-payoff-calculator"]],
    ["auto-loans-explained", "Auto Loans Explained: Rates, Terms and Traps", "What", 2500, false, ["loans/auto-loan-calculator", "loans/loan-calculator"]],
    ["debt-payoff-mistakes-to-avoid", "8 Debt Payoff Mistakes to Avoid", "Mistakes", 2500, false, ["loans/debt-payoff-calculator", "personal-wealth/debt-avalanche-vs-snowball-calculator"]],
    ["balance-transfer-cards-explained", "Balance Transfer Cards: How They Work", "What", 2500, false, ["personal-wealth/credit-card-payoff-calculator", "loans/credit-card-calculator"]],
    ["how-interest-rates-are-set", "How Interest Rates Are Set", "What", 2500, false, ["personal-wealth/interest-calculator", "loans/apr-calculator"]],
    ["how-to-pay-off-10000-credit-card-debt", "How to Pay Off $10,000 in Credit Card Debt", "How-to", 2500, false, ["personal-wealth/credit-card-payoff-calculator", "loans/debt-payoff-calculator"]],
    ["how-to-negotiate-with-creditors", "How to Negotiate With Creditors", "How-to", 1500, false, ["loans/debt-payoff-calculator"]],
    ["payday-loans-why-theyre-a-trap", "Payday Loans: Why They're a Trap", "What", 1500, false, ["loans/apr-calculator", "loans/loan-calculator"]],
    ["what-is-a-debt-management-plan", "What Is a Debt Management Plan?", "What", 1500, false, ["loans/debt-payoff-calculator", "personal-wealth/credit-card-payoff-calculator"]],
    ["why-your-loan-application-was-rejected", "Why Your Loan Application Was Rejected", "Troubleshooting", 1500, false, ["loans/debt-to-income-ratio-calculator", "loans/loan-calculator"]],
    ["secured-vs-unsecured-loans", "Secured vs Unsecured Loans", "Comparison", 1500, false, ["loans/loan-calculator", "loans/personal-loan-calculator"]],
  ],
  "Salary, Tax, Retirement & Investing": [
    ["complete-guide-to-retirement-planning", "The Complete Guide to Retirement Planning", "What", 3500, true, ["personal-wealth/retirement-calculator", "personal-wealth/ira-calculator", "personal-wealth/roth-ira-calculator", "personal-wealth/social-security-calculator"]],
    ["how-does-a-401k-work", "How Does a 401(k) Work?", "What", 2500, false, ["personal-wealth/401k-vs-solo-401k-calculator", "personal-wealth/retirement-calculator"]],
    ["how-to-do-your-own-taxes", "How to Do Your Own Taxes", "How-to", 2500, false, ["tax/tax-calculator", "tax/income-tax-calculator"]],
    ["roth-ira-vs-401k", "Roth IRA vs 401(k)", "Comparison", 2500, false, ["personal-wealth/roth-ira-calculator", "personal-wealth/401k-vs-solo-401k-calculator"]],
    ["how-capital-gains-tax-works", "How Capital Gains Tax Works", "What", 2500, false, ["tax/capital-gains-tax-calculator", "personal-wealth/investment-calculator"]],
    ["what-is-tax-withholding", "What Is Tax Withholding and How to Fix It", "What", 2500, false, ["tax/paycheck-calculator", "tax/take-home-pay-calculator"]],
    ["how-much-do-i-need-to-retire", "How Much Do I Need to Retire?", "What", 2500, false, ["personal-wealth/retirement-calculator", "personal-wealth/rmd-calculator"]],
    ["tax-mistakes-that-cost-you-money", "7 Tax Mistakes That Cost You Money", "Mistakes", 2500, false, ["tax/tax-calculator", "tax/income-tax-calculator"]],
    ["hsa-vs-fsa", "HSA vs FSA: Which Is Better?", "Comparison", 2500, false, ["personal-wealth/hsa-triple-tax-advantage-calculator", "tax/paycheck-calculator"]],
    ["when-should-you-claim-social-security", "When Should You Claim Social Security?", "What", 2500, false, ["personal-wealth/social-security-calculator", "personal-wealth/retirement-calculator"]],
    ["how-to-negotiate-a-higher-salary", "How to Negotiate a Higher Salary", "How-to", 2500, false, ["tax/salary-calculator", "freelance/salary-to-hourly-calculator"]],
    ["what-is-the-standard-deduction", "What Is the Standard Deduction?", "What", 1500, false, ["tax/income-tax-calculator", "tax/tax-calculator"]],
    ["the-4-percent-rule-explained", "The 4% Rule Explained", "What", 1500, false, ["personal-wealth/retirement-calculator", "personal-wealth/rmd-calculator"]],
    ["how-overtime-pay-is-calculated", "How Overtime Pay Is Calculated", "What", 1500, false, ["tax/overtime-calculator", "tax/paycheck-calculator"]],
    ["what-is-fica-tax", "What Is FICA Tax?", "What", 1500, false, ["tax/paycheck-calculator", "tax/take-home-pay-calculator"]],
    ["why-is-my-tax-refund-so-small", "Why Is My Tax Refund So Small?", "Troubleshooting", 1500, false, ["tax/paycheck-calculator", "tax/income-tax-calculator"]],
  ],
  "Freelance, Creator & Business": [
    ["how-to-start-freelancing", "How to Start Freelancing: The Complete Guide", "How-to", 3500, true, ["freelance/freelance-hourly-rate-calculator", "freelance/freelance-project-pricing-calculator", "freelance/self-employment-tax-calculator"]],
    ["how-to-set-your-freelance-rate", "How to Set Your Freelance Rate", "How-to", 2500, false, ["freelance/freelance-hourly-rate-calculator", "freelance/salary-to-hourly-calculator"]],
    ["llc-vs-sole-proprietorship", "LLC vs Sole Proprietorship", "Comparison", 2500, false, ["freelance/self-employment-tax-calculator", "freelance/s-corp-tax-savings-calculator"]],
    ["how-self-employment-tax-works-2026", "How Self-Employment Tax Works in 2026", "What", 2500, false, ["freelance/self-employment-tax-calculator", "freelance/quarterly-estimated-tax-calculator"]],
    ["quarterly-estimated-taxes-explained", "Quarterly Estimated Taxes Explained", "What", 2500, false, ["freelance/quarterly-estimated-tax-calculator", "freelance/1099-tax-calculator"]],
    ["best-side-hustles-2026", "The Best Side Hustles in 2026", "Best-List", 2500, false, ["freelance/freelance-hourly-rate-calculator", "freelance/salary-to-hourly-calculator"]],
    ["how-much-do-youtubers-make", "How Much Do YouTubers Make?", "What", 2500, false, ["creator/youtube-adsense-estimator", "creator/youtube-cpm-calculator"]],
    ["how-to-price-products-on-etsy", "How to Price Products on Etsy", "How-to", 2500, false, ["ecommerce/etsy-fee-calculator", "ecommerce/profit-margin-calculator", "ecommerce/markup-calculator"]],
    ["freelancing-mistakes-beginners-make", "9 Freelancing Mistakes Beginners Make", "Mistakes", 2500, false, ["freelance/freelance-project-pricing-calculator", "freelance/billable-hours-calculator"]],
    ["what-is-an-s-corp", "What Is an S Corp and Should You Elect One?", "What", 2500, false, ["freelance/s-corp-tax-savings-calculator", "freelance/w2-vs-1099-calculator"]],
    ["shopify-vs-etsy-for-sellers", "Shopify vs Etsy for Sellers", "Comparison", 2500, false, ["ecommerce/shopify-margin-calculator", "ecommerce/etsy-fee-calculator"]],
    ["how-to-make-money-on-substack", "How to Make Money on Substack", "What", 2500, false, ["creator/substack-growth-predictor-simulator", "creator/patreon-tier-optimization"]],
    ["how-to-invoice-clients", "How to Invoice Clients (and Get Paid on Time)", "How-to", 1500, false, ["freelance/freelance-project-pricing-calculator", "freelance/stripe-paypal-fee-calculator"]],
    ["how-to-write-a-freelance-contract", "How to Write a Freelance Contract", "How-to", 1500, false, ["freelance/client-lifetime-value-calculator"]],
    ["how-to-track-business-expenses", "How to Track Business Expenses", "How-to", 1500, false, ["freelance/business-vehicle-tax-deduction-calculator", "ecommerce/profit-margin-calculator"]],
    ["why-your-etsy-shop-isnt-selling", "Why Your Etsy Shop Isn't Selling", "Troubleshooting", 1500, false, ["ecommerce/etsy-fee-calculator", "ecommerce/customer-acquisition-cost-calculator"]],
  ],
}

// Existing guides: [slug, title, hub, type, tier words, published (true date)]
const EXISTING = [
  ["how-compound-interest-works", "How Compound Interest Works (With Real Number Examples)", "Personal Finance", "What", 2500, "2026-11-06"],
  ["how-to-build-an-emergency-fund", "How to Build an Emergency Fund", "Personal Finance", "How-to", 2500, "2026-11-06"],
  ["50-30-20-rule-explained", "The 50/30/20 Rule Explained", "Personal Finance", "What", 2500, "2026-11-06"],
  ["how-mortgage-amortization-works", "How Mortgage Amortization Works", "Mortgage & Real Estate", "What", 2500, "2026-11-06"],
  ["how-much-house-can-i-afford", "How Much House Can I Afford?", "Mortgage & Real Estate", "What", 2500, "2026-11-06"],
  ["rent-vs-buy-guide", "Rent vs Buy: The Honest Comparison", "Mortgage & Real Estate", "Comparison", 2500, "2026-11-06"],
  ["how-va-loans-work", "How VA Loans Work", "Mortgage & Real Estate", "What", 2500, "2026-11-13"],
  ["how-fha-loans-work", "How FHA Loans Work", "Mortgage & Real Estate", "What", 2500, "2026-11-13"],
  ["how-biweekly-mortgage-payments-work", "How Biweekly Mortgage Payments Work", "Mortgage & Real Estate", "How-to", 2500, "2026-11-19"],
  ["avalanche-vs-snowball-debt-payoff", "Avalanche vs Snowball: Which Debt Payoff Method Wins?", "Loans & Debt", "Comparison", 2500, "2026-11-06"],
  ["how-credit-card-interest-works", "How Credit Card Interest Works", "Loans & Debt", "What", 2500, "2026-11-06"],
  ["what-is-debt-to-income-ratio", "What Is Debt-to-Income Ratio (DTI)? How Lenders Use It in 2026", "Loans & Debt", "What", 2500, "2026-11-17"],
  ["how-federal-income-tax-brackets-work", "How Federal Income Tax Brackets Work", "Salary, Tax, Retirement & Investing", "What", 2500, "2026-11-06"],
  ["how-to-read-your-paycheck", "How to Read Your Paycheck", "Salary, Tax, Retirement & Investing", "How-to", 2500, "2026-11-06"],
  ["roth-vs-traditional-ira", "Roth vs Traditional IRA", "Salary, Tax, Retirement & Investing", "Comparison", 2500, "2026-11-06"],
  ["social-security-benefits-explained", "Social Security Benefits Explained", "Salary, Tax, Retirement & Investing", "What", 2500, "2026-11-06"],
  ["self-employment-tax-explained", "Self-Employment Tax Explained", "Freelance, Creator & Business", "What", 2500, "2026-11-06"],
  ["how-to-price-freelance-work", "How to Price Freelance Work", "Freelance, Creator & Business", "How-to", 2500, "2026-11-06"],
  ["how-youtube-pays-creators", "How YouTube Pays Creators", "Freelance, Creator & Business", "What", 2500, "2026-11-06"],
  ["etsy-and-ebay-fees-explained", "Etsy and eBay Fees Explained", "Freelance, Creator & Business", "What", 2500, "2026-11-06"],
]

// Round-robin the new articles across hubs, assigning spread dates in order.
const hubs = Object.keys(NEW)
const queues = hubs.map((h) => NEW[h].map((a) => ({ hub: h, slug: a[0], title: a[1], type: a[2], words: a[3], cornerstone: a[4], tools: a[5] })))
const plan = []
let di = 0
let any = true
while (any) {
  any = false
  for (const q of queues) {
    if (q.length) {
      any = true
      plan.push({ ...q.shift(), status: "NEW", published: DATES[di++] })
    }
  }
}
for (const [slug, title, hub, type, words, published] of EXISTING) {
  plan.push({ slug, title, hub, type, words, cornerstone: false, tools: [], status: "EXPAND", published })
}

const totalWords = plan.reduce((s, a) => s + a.words, 0)
const byHub = {}
const byType = {}
for (const a of plan) {
  byHub[a.hub] = (byHub[a.hub] || 0) + 1
  byType[a.type] = (byType[a.type] || 0) + 1
}
console.log("articles:", plan.length, "| total words:", totalWords, "| median tier: 2500")
console.log("by hub:", JSON.stringify(byHub))
console.log("by type:", JSON.stringify(byType))
console.log("dates used:", di, "| max/day:", Math.max(...DATES.slice(0, di).map((d) => DATES.slice(0, di).filter((x) => x === d).length)))

writeFileSync(
  "/home/hatch/workspace/goals/dailyfinance-tools-earning-5-000-month/hidden_files/content-plan-100.json",
  JSON.stringify({ generated: "2026-11-19", totalWords, articles: plan }, null, 2)
)

let md = `# DailyFinance 100-Article Content Plan\n\nGenerated 2026-11-19. 5 hubs x 20 guides = 100 articles, ~${totalWords.toLocaleString()} words, median tier 2,500. 20 existing guides expand to 2,500w; 80 new guides written to tier. New publish dates spread 19 Sep - 18 Nov 2026 (max 2/day, round-robin by hub). Existing guides keep their true dates.\n\n## Variety check\n\n`
for (const h of hubs) {
  const types = [...new Set(plan.filter((a) => a.hub === h).map((a) => a.type))]
  md += `- ${h}: ${types.join(", ")} (${types.length} types)\n`
}
md += `\nSite-wide types: ${Object.keys(byType).join(", ")} — all 7 present.\n\n`
for (const h of [...hubs]) {
  md += `\n## ${h} (20)\n\n| # | Slug | Type | Words | Published | Status |\n|---|------|------|-------|-----------|--------|\n`
  plan.filter((a) => a.hub === h).sort((a, b) => a.published.localeCompare(b.published)).forEach((a, i) => {
    md += `| ${i + 1} | ${a.slug} | ${a.type} | ${a.words}${a.cornerstone ? " ★" : ""} | ${a.published} | ${a.status} |\n`
  })
}
writeFileSync(
  "/home/hatch/workspace/goals/dailyfinance-tools-earning-5-000-month/hidden_files/content-plan-100.md",
  md
)
console.log("plan files written")
