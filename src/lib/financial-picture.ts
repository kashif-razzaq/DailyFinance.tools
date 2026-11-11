import type { SavedCalculator } from '@/types/database'
import { SCENARIO_SLUG_ALIASES, getScenarioUrl } from '@/config/navigation'

/**
 * financial-picture — Cross-Data Analytics core.
 *
 * Combines the money inside a user's saved scenarios into one financial
 * picture: balance sheet (assets vs debts), monthly debt payments,
 * weighted APR, debt-to-income, cash flow and an emergency-fund read.
 *
 * Rules that keep the numbers honest:
 * - One scenario per tool counts toward totals: the LATEST save of each
 *   tool (saving the same tool twice must not double the money).
 * - If a Net Worth Tracker scenario exists, it is the balance sheet of
 *   record (its own asset/liability categories); loan tools then only
 *   contribute payments and APR detail, never second copies of balances.
 * - Income comes from ONE source (the most direct one saved), never a
 *   sum across tools — the same salary appears in many calculators.
 * - Payments marked as estimates use the standard amortization formula
 *   on the saved inputs, the same maths the tools themselves run.
 */

export interface MoneyLine {
  label: string
  source: string
  /** Asset class for composition charts. */
  kind?: string
  /** Deep link back to the exact saved scenario this line came from. */
  href?: string
  value: number
  apr?: number | null
  monthlyPayment?: number | null
  interestCost?: number | null
}

export interface BusinessMetric {
  label: string
  value: string
  detail?: string
  href?: string
}

export interface BusinessPicture {
  metrics: BusinessMetric[]
  estMonthlyEarnings: number | null
  taxSetAsideMonthly: number | null
  runwayMonths: number | null
  toolsUsed: number
}

export interface FinancialPicture {
  business: BusinessPicture | null
  snapshots: { label: string; value: string; href?: string }[]
  basis: 'net-worth' | 'combined' | 'empty'
  assets: MoneyLine[]
  debts: MoneyLine[]
  totalAssets: number
  totalDebts: number
  netPosition: number
  monthlyDebtPayments: number | null
  weightedApr: number | null
  totalInterestCost: number | null
  highestAprDebt: MoneyLine | null
  monthlyIncome: number | null
  incomeSource: string | null
  dti: number | null
  cashFlow: {
    source: string
    href?: string
    income: number
    outgo: { label: string; value: number }[]
    totalOutgo: number
    savings: number
    leftover: number
    savingsRate: number
  } | null
  emergency: { monthsCovered: number; saved: number; monthlyExpenses: number; href?: string } | null
  monthlyInvesting: number | null
  toolsUsed: number
}

const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

const num = (state: Record<string, unknown> | undefined, key: string): number | null => {
  const v = state?.[key]
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}

const pageSlug = (calc: SavedCalculator) =>
  SCENARIO_SLUG_ALIASES[calc.calculator_slug] ?? calc.calculator_slug

function latestPerTool(calculators: SavedCalculator[]): Map<string, SavedCalculator> {
  const map = new Map<string, SavedCalculator>()
  for (const calc of calculators) {
    const slug = pageSlug(calc)
    const prev = map.get(slug)
    if (!prev || new Date(calc.last_updated) > new Date(prev.last_updated)) map.set(slug, calc)
  }
  return map
}

/** Standard amortizing monthly payment; null when it cannot be derived. */
function amortize(balance: number, aprPct: number, months: number): number | null {
  if (balance <= 0 || months <= 0) return null
  const r = aprPct / 100 / 12
  if (r === 0) return balance / months
  const f = Math.pow(1 + r, months)
  return (balance * r * f) / (f - 1)
}

function withInterest(line: MoneyLine, months: number | null): MoneyLine {
  if (line.monthlyPayment != null && months) {
    const cost = line.monthlyPayment * months - line.value
    if (cost > 0) line.interestCost = Math.round(cost)
  }
  return line
}

const hrefOf = (calc: SavedCalculator) => `${getScenarioUrl(calc.calculator_slug)}?savedId=${calc.id}`

function recordLines(
  state: Record<string, unknown> | undefined,
  key: string,
  source: string,
  labels: Record<string, string>,
): MoneyLine[] {
  const rec = state?.[key]
  if (!rec || typeof rec !== 'object' || Array.isArray(rec)) return []
  return Object.entries(rec as Record<string, unknown>)
    .filter(([, v]) => typeof v === 'number' && (v as number) > 0)
    .map(([k, v]) => ({
      label: labels[k] ?? k.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase()),
      source,
      value: v as number,
    }))

}

interface DebtSpec {
  slug: string
  build: (s: Record<string, unknown>) => MoneyLine[] | null
}

/** Debts that carry a balance (used for totals outside Net-Worth mode). */
const DEBT_SPECS: DebtSpec[] = [
  {
    slug: 'personal-loan-calculator',
    build: (s) => {
      const amount = num(s, 'amount'); if (!amount) return null
      const rate = num(s, 'rate') ?? 0; const months = num(s, 'months') ?? 36
      return [withInterest({ label: 'Personal loan', source: 'Personal Loan Calculator', value: amount, apr: rate, monthlyPayment: amortize(amount, rate, months) }, months)]
    },
  },
  {
    slug: 'loan-calculator',
    build: (s) => {
      const amount = num(s, 'amount'); if (!amount) return null
      const rate = num(s, 'rate') ?? 0; const months = (num(s, 'years') ?? 5) * 12
      return [withInterest({ label: 'Loan', source: 'Loan Calculator', value: amount, apr: rate, monthlyPayment: amortize(amount, rate, months) }, months)]
    },
  },
  {
    slug: 'apr-calculator',
    build: (s) => {
      const amount = num(s, 'amount'); if (!amount) return null
      const rate = num(s, 'rate') ?? 0; const months = num(s, 'months') ?? 60
      return [withInterest({ label: 'Loan (APR)', source: 'APR Calculator', value: amount, apr: rate, monthlyPayment: amortize(amount, rate, months) }, months)]
    },
  },
  {
    slug: 'auto-loan-calculator',
    build: (s) => {
      const price = num(s, 'price'); if (!price) return null
      const financed = price * (1 + (num(s, 'taxPct') ?? 0) / 100) - (num(s, 'tradeIn') ?? 0) - (num(s, 'down') ?? 0)
      if (financed <= 0) return null
      const rate = num(s, 'rate') ?? 0; const months = num(s, 'term') ?? 60
      return [withInterest({ label: 'Auto loan', source: 'Auto Loan Calculator', value: Math.round(financed), apr: rate, monthlyPayment: amortize(financed, rate, months) }, months)]
    },
  },
  {
    slug: 'student-loan-calculator',
    build: (s) => {
      const balance = num(s, 'balance'); if (!balance) return null
      const rate = num(s, 'rate') ?? 0
      const byTerm = amortize(balance, rate, (num(s, 'termYears') ?? 10) * 12)
      const payment = s.mode === 'payment' ? (num(s, 'paymentInput') ?? byTerm) : byTerm
      return [{ label: 'Student loan', source: 'Student Loan Calculator', value: balance, apr: rate, monthlyPayment: payment }]
    },
  },
  {
    slug: 'student-loan-payoff-calculator',
    build: (s) => {
      const balance = num(s, 'balance'); if (!balance) return null
      const payment = (num(s, 'payment') ?? 0) + (num(s, 'extra') ?? 0)
      return [{ label: 'Student loan', source: 'Student Loan Payoff Calculator', value: balance, apr: num(s, 'rate'), monthlyPayment: payment > 0 ? payment : null }]
    },
  },
  {
    slug: 'debt-consolidation-calculator',
    build: (s) => {
      const balance = num(s, 'balance'); if (!balance) return null
      return [{ label: 'Consolidated debts', source: 'Debt Consolidation Calculator', value: balance, apr: num(s, 'currentApr'), monthlyPayment: num(s, 'currentPayment') }]
    },
  },
  {
    slug: 'rental-cash-flow-calculator',
    build: (s) => {
      const price = num(s, 'price'); if (!price) return null
      const loan = price * (1 - (num(s, 'downPct') ?? 25) / 100)
      return [{ label: 'Rental property loan', source: 'Rental Cash Flow Calculator', value: Math.round(loan), apr: num(s, 'rate'), monthlyPayment: null }]
    },
  },
]

function cardDebts(byTool: Map<string, SavedCalculator>): MoneyLine[] {
  const payoff = byTool.get('credit-card-payoff-calculator')
  const generic = byTool.get('credit-card-calculator')
  const pick = payoff ?? generic
  if (!pick) return []
  const s = pick.input_state
  const balance = num(s, 'balance'); if (!balance) return []
  let payment: number | null = null
  if (payoff) payment = num(s, 'payment')
  else if (s.mode === 'fixed') payment = num(s, 'fixedPayment')
  else payment = Math.max((balance * (num(s, 'pct') ?? 3)) / 100, 25)
  return [{ label: 'Credit cards', source: payoff ? 'Credit Card Payoff Calculator' : 'Credit Card Calculator', value: balance, apr: num(s, 'apr'), monthlyPayment: payment }]
}

function listDebts(
  calc: SavedCalculator | undefined,
  source: string,
): MoneyLine[] {
  const arr = calc?.input_state?.debts
  if (!Array.isArray(arr)) return []
  return arr
    .filter((d): d is Record<string, unknown> => !!d && typeof d === 'object')
    .filter((d) => typeof d.balance === 'number' && (d.balance as number) > 0)
    .map((d) => ({
      label: typeof d.name === 'string' ? d.name : 'Debt',
      source,
      value: d.balance as number,
      apr: typeof d.apr === 'number' ? d.apr : null,
      monthlyPayment: typeof d.min === 'number' ? d.min : null,
    }))
}

function mortgageDebt(byTool: Map<string, SavedCalculator>): MoneyLine | null {
  const payoff = byTool.get('mortgage-payoff-calculator')
  if (payoff) {
    const s = payoff.input_state; const loan = num(s, 'loan'); const rate = num(s, 'rate') ?? 0
    const months = (num(s, 'term') ?? 30) * 12
    if (loan) {
      const base = amortize(loan, rate, months)
      return withInterest({ label: 'Mortgage', source: 'Mortgage Payoff Calculator', value: loan, apr: rate, monthlyPayment: base != null ? base + (num(s, 'extra') ?? 0) : null }, months)
    }
  }
  const refi = byTool.get('refinance-calculator')
  if (refi) {
    const s = refi.input_state; const bal = num(s, 'balance'); const rate = num(s, 'curRate') ?? 0
    const months = (num(s, 'yearsLeft') ?? 27) * 12
    if (bal) return withInterest({ label: 'Mortgage', source: 'Refinance Calculator', value: bal, apr: rate, monthlyPayment: amortize(bal, rate, months) }, months)
  }
  const amort = byTool.get('mortgage-amortization-calculator')
  if (amort) {
    const s = amort.input_state; const price = num(s, 'price'); const rate = num(s, 'rate') ?? 0
    const months = (num(s, 'term') ?? 30) * 12
    const loan = price != null ? price - (num(s, 'down') ?? 0) : null
    if (loan && loan > 0) return withInterest({ label: 'Mortgage', source: 'Mortgage Amortization Calculator', value: loan, apr: rate, monthlyPayment: amortize(loan, rate, months) }, months)
  }
  const payment = byTool.get('mortgage-payment-calculator')
  if (payment) {
    const s = payment.input_state; const price = num(s, 'price'); const rate = num(s, 'rate') ?? 0
    const months = (num(s, 'term') ?? 30) * 12
    const loan = price != null ? price * (1 - (num(s, 'downPct') ?? 20) / 100) : null
    if (loan && loan > 0) return withInterest({ label: 'Mortgage', source: 'Mortgage Payment Calculator', value: Math.round(loan), apr: rate, monthlyPayment: amortize(loan, rate, months) }, months)
  }
  const equity = byTool.get('home-equity-calculator')
  if (equity) {
    const s = equity.input_state
    const total = (num(s, 'first') ?? 0) + (num(s, 'second') ?? 0)
    if (total > 0) return { label: 'Mortgage', source: 'Home Equity Calculator', value: total, apr: null, monthlyPayment: null }
  }
  return null
}

const ASSET_SPECS: { slug: string; label: string; source: string; key: string; kind: string }[] = [
  { slug: 'savings-calculator', label: 'Savings', source: 'Savings Calculator', key: 'starting', kind: 'Cash & savings' },
  { slug: 'high-yield-savings-cd-calculator', label: 'High-yield savings', source: 'High-Yield Savings Calculator', key: 'deposit', kind: 'Cash & savings' },
  { slug: 'compound-interest-scaler-calculator', label: 'Investments (compound plan)', source: 'Compound Interest Calculator', key: 'principal', kind: 'Investments' },
  { slug: 'investment-calculator', label: 'Investments', source: 'Investment Calculator', key: 'initial', kind: 'Investments' },
  { slug: 'retirement-calculator', label: 'Retirement savings', source: 'Retirement Calculator', key: 'savings', kind: 'Investments' },
  { slug: 'ira-calculator', label: 'IRA', source: 'IRA Calculator', key: 'balance', kind: 'Investments' },
  { slug: 'roth-ira-calculator', label: 'Roth IRA', source: 'Roth IRA Calculator', key: 'balance', kind: 'Investments' },
  { slug: '401k-vs-solo-401k-calculator', label: '401(k)', source: '401(k) Calculator', key: 'balance', kind: 'Investments' },
  { slug: 'hsa-triple-tax-advantage-calculator', label: 'HSA', source: 'HSA Calculator', key: 'balance', kind: 'Investments' },
  { slug: 'future-value-calculator', label: 'Future-value plan', source: 'Future Value Calculator', key: 'pv', kind: 'Investments' },
  { slug: 'coast-fire-calculator', label: 'Invested (Coast FIRE)', source: 'Coast FIRE Calculator', key: 'invested', kind: 'Investments' },
  { slug: 'emergency-fund-visualizer', label: 'Emergency fund', source: 'Emergency Fund Visualizer', key: 'saved', kind: 'Cash & savings' },
  { slug: 'savings-goal-calculator', label: 'Savings goal', source: 'Savings Goal Calculator', key: 'current', kind: 'Cash & savings' },
  { slug: 'interest-calculator', label: 'Interest plan', source: 'Interest Calculator', key: 'principal', kind: 'Investments' },
  { slug: 'fat-fire-vs-lean-fire-calculator', label: 'Invested (FIRE plan)', source: 'Fat FIRE vs Lean FIRE', key: 'saved', kind: 'Investments' },
  { slug: 'rmd-calculator', label: 'Retirement (RMD)', source: 'RMD Calculator', key: 'balance', kind: 'Investments' },
  { slug: 'down-payment-calculator', label: 'Down-payment fund', source: 'Down Payment Calculator', key: 'saved', kind: 'Cash & savings' },
  { slug: 'simple-interest-calculator', label: 'Simple interest account', source: 'Simple Interest Calculator', key: 'principal', kind: 'Cash & savings' },
  { slug: 'apy-calculator', label: 'APY account', source: 'APY Calculator', key: 'deposit', kind: 'Cash & savings' },
]
function buildBusiness(byTool: Map<string, SavedCalculator>, hrefOf: (c: SavedCalculator) => string | undefined): BusinessPicture | null {
  const metrics: BusinessMetric[] = []
  const used = new Set<string>()
  let earnings = 0
  let taxSetAside: number | null = null
  let runway: number | null = null
  const push = (slug: string, label: string, value: string, detail?: string) => {
    const calc = byTool.get(slug)
    if (!calc || used.has(slug)) return
    used.add(slug)
    metrics.push({ label, value, detail, href: hrefOf(calc) })
  }
  const earn = (slug: string, label: string, amount: number | null, detail: string) => {
    if (amount && amount > 0) { earnings += amount; push(slug, label, money(amount) + '/mo', detail) }
  }
  const g = (slug: string) => byTool.get(slug)

  // Creator earnings — estimates computed from the user's own saved assumptions.
  const tt = g('tiktok-creator-fund-calculator')
  if (tt) { const v = num(tt.input_state, 'views'); const r = num(tt.input_state, 'rpm'); earn('tiktok-creator-fund-calculator', 'TikTok earnings (est.)', v != null && r != null ? v / 1000 * r : null, 'Saved views × RPM') }
  const yt = g('youtube-adsense-estimator')
  if (yt) { const v = num(yt.input_state, 'views'); const r = num(yt.input_state, 'rpm'); earn('youtube-adsense-estimator', 'YouTube AdSense (est.)', v != null && r != null ? v / 1000 * r : null, 'Saved views × RPM') }
  const yc = g('youtube-cpm-calculator')
  if (yc) { const v = num(yc.input_state, 'viewsPerDay'); const r = num(yc.input_state, 'rate'); earn('youtube-cpm-calculator', 'YouTube CPM earnings (est.)', v != null && r != null ? v * 30 * r / 1000 * 0.55 : null, 'Daily views × CPM × 55% creator share') }
  const tw = g('twitch-earnings-calculator')
  if (tw) { const s = tw.input_state; const subs = ((num(s, 't1') ?? 0) * 4.99 + (num(s, 't2') ?? 0) * 9.99 + (num(s, 't3') ?? 0) * 24.99) * ((num(s, 'sharePct') ?? 50) / 100); earn('twitch-earnings-calculator', 'Twitch earnings (est.)', subs + (num(s, 'bits') ?? 0) * 0.01 + (num(s, 'ads') ?? 0) + (num(s, 'donations') ?? 0), 'Subs, bits, ads and donations from your saved scenario') }
  const pa = g('patreon-tier-optimization')
  if (pa) { const s = pa.input_state; const gross = (num(s, 'patrons') ?? 0) * (num(s, 'pledge') ?? 0); const net = (gross * (1 - (num(s, 'planPct') ?? 0) / 100) - (num(s, 'patrons') ?? 0) * (num(s, 'perTxn') ?? 0)) * (1 - (num(s, 'payoutPct') ?? 0) / 100); earn('patreon-tier-optimization', 'Patreon payouts (est.)', net, 'Patrons × pledge after platform fees') }
  const ss = g('substack-growth-predictor-simulator')
  if (ss) { const s = ss.input_state; earn('substack-growth-predictor-simulator', 'Substack paid MRR (est.)', (num(s, 'freeSubs') ?? 0) * ((num(s, 'conversion') ?? 0) / 100) * (num(s, 'price') ?? 0), 'Free subscribers × conversion × price') }

  // Commerce and freelance metrics.
  const sh = g('shopify-margin-calculator')
  if (sh) { const s = sh.input_state; const price = num(s, 'price') ?? 0; const per = price + (num(s, 'shipCharged') ?? 0) - (num(s, 'cogs') ?? 0) - (num(s, 'shipCost') ?? 0) - (num(s, 'other') ?? 0) - price * 0.029 - 0.30; const monthly = per * (num(s, 'orders') ?? 0); if (monthly > 0) push('shopify-margin-calculator', 'Shopify profit (est.)', money(monthly) + '/mo', money(per) + ' profit per order × saved monthly orders') }
  const cl = g('course-launch-revenue-calculator')
  if (cl) { const s = cl.input_state; const rev = (num(s, 'listSize') ?? 0) * ((num(s, 'conversion') ?? 0) / 100) * (num(s, 'price') ?? 0) * (1 - (num(s, 'refundPct') ?? 0) / 100) * (1 - ((num(s, 'platformPct') ?? 0) + (num(s, 'affiliatePct') ?? 0)) / 100); if (rev > 0) push('course-launch-revenue-calculator', 'Course launch revenue (est.)', money(rev), 'List × conversion × price after refunds and platform fees') }
  const et = g('etsy-fee-calculator')
  if (et) { const s = et.input_state; const price = num(s, 'price') ?? 0; const ship = num(s, 'shippingCharged') ?? 0; const profit = price + ship - (price + ship) * 0.065 - price * ((num(s, 'regPct') ?? 0) / 100) - (price * 0.03 + 0.25) - 0.20 - (num(s, 'itemCost') ?? 0) - (num(s, 'shippingCost') ?? 0); push('etsy-fee-calculator', 'Etsy profit per sale (est.)', money(profit), 'After Etsy transaction, payment and listing fees') }
  const eb = g('ebay-fee-calculator')
  if (eb) { const s = eb.input_state; const price = num(s, 'price') ?? 0; const ship = num(s, 'shippingCharged') ?? 0; const profit = price + ship - (price + ship) * ((num(s, 'fvfPct') ?? 0) / 100) - (num(s, 'perOrder') ?? 0) - price * ((num(s, 'promotedPct') ?? 0) / 100) - (num(s, 'itemCost') ?? 0) - (num(s, 'shippingCost') ?? 0); push('ebay-fee-calculator', 'eBay profit per sale (est.)', money(profit), 'After final-value and promoted-listing fees') }
  const pf = g('platform-fee-visualizer')
  if (pf) { const s = pf.input_state; const gross = num(s, 'gross') ?? 0; if (gross > 0) push('platform-fee-visualizer', 'Payment fees on saved revenue (Stripe est.)', money(gross * 0.029 + (num(s, 'txns') ?? 0) * 0.30), 'On ' + money(gross) + ' of saved sales volume') }
  const br = g('business-loan-runway-calculator')
  if (br) { const s = br.input_state; const burn = num(s, 'burn') ?? 0; if (burn > 0) { runway = Math.round((((num(s, 'cash') ?? 0) + (num(s, 'loan') ?? 0)) / burn) * 10) / 10; push('business-loan-runway-calculator', 'Business runway', runway + ' months', 'Cash + loan against your saved monthly burn') } }
  const tx = g('1099-tax-calculator')
  if (tx) { const s = tx.input_state; const net = (num(s, 'income') ?? 0) - (num(s, 'expenses') ?? 0); if (net > 0) { push('1099-tax-calculator', '1099 net income', money(net) + '/yr', 'Saved income minus expenses'); taxSetAside = net * 0.9235 * 0.153 / 12 } }
  const q = g('quarterly-estimated-tax-calculator')
  if (q && q.core_metric && q.core_metric > 0) { taxSetAside = q.core_metric / 3; push('quarterly-estimated-tax-calculator', 'Quarterly estimated tax', money(q.core_metric), 'Your saved quarterly payment — set aside ' + money(q.core_metric / 3) + '/mo') }
  const hr = g('freelance-hourly-rate-calculator')
  if (hr && hr.core_metric && hr.core_metric > 0) push('freelance-hourly-rate-calculator', 'Target hourly rate', money(hr.core_metric) + '/hr', 'The rate your saved plan needs to hit its income goal')
  const bh = g('billable-hours-calculator')
  if (bh && bh.core_metric && bh.core_metric > 0) push('billable-hours-calculator', 'Time-tracking ROI (saved result)', money(bh.core_metric), 'Headline result from your saved scenario')

  // Remaining business tools: surface the headline result the tool itself saved.
  const fallback: [string, string][] = [
    ['s-corp-tax-savings-calculator', 'S-corp tax savings (saved result)'],
    ['client-lifetime-value-calculator', 'Client lifetime value (saved result)'],
    ['freelance-project-pricing-calculator', 'Project price (saved result)'],
    ['digital-nomad-cost-of-living-calculator', 'Nomad living cost (saved result)'],
    ['stripe-paypal-fee-calculator', 'Fee impact (saved result)'],
    ['business-vehicle-tax-deduction-calculator', 'Vehicle deduction (saved result)'],
    ['freelance-emergency-fund-calculator', 'Freelance safety net (saved result)'],
    ['self-employment-tax-calculator', 'Self-employment tax (saved result)'],
    ['w2-vs-1099-calculator', 'W2 vs 1099 result (saved result)'],
  ]
  for (const [slug, label] of fallback) {
    const calc = g(slug)
    if (calc && calc.core_metric && calc.core_metric > 0) push(slug, label, money(calc.core_metric), 'Headline result from your saved scenario')
  }

  if (!metrics.length && !earnings) return null
  return {
    metrics: metrics.slice(0, 12),
    estMonthlyEarnings: earnings > 0 ? Math.round(earnings) : null,
    taxSetAsideMonthly: taxSetAside ? Math.round(taxSetAside) : null,
    runwayMonths: runway,
    toolsUsed: used.size,
  }
}

export function buildFinancialPicture(calculators: SavedCalculator[]): FinancialPicture {
  const byTool = latestPerTool(calculators)
  const nw = byTool.get('net-worth-tracker')

  // ── Debts with full detail (payments/APR) from the loan tools ──
  const detailDebts: MoneyLine[] = []
  const mortgage = mortgageDebt(byTool)
  if (mortgage) detailDebts.push(mortgage)
  detailDebts.push(...cardDebts(byTool))
  for (const spec of DEBT_SPECS) {
    // The two student-loan tools describe the same loan — the payoff
    // planner (explicit payment + extra) wins when both are saved.
    if (spec.slug === 'student-loan-calculator' && byTool.has('student-loan-payoff-calculator')) continue
    if (spec.slug === 'rental-cash-flow-calculator' && byTool.has('rental-property-analyzer')) continue
    const calc = byTool.get(spec.slug)
    if (calc) {
      const built = spec.build(calc.input_state) ?? []
      built.forEach((l) => { l.href = hrefOf(calc) })
      detailDebts.push(...built)
    }
  }
  const payoffCalc = byTool.get('debt-payoff-calculator')
  const avalancheCalc = byTool.get('debt-avalanche-vs-snowball-calculator')
  const listCalc = payoffCalc ?? avalancheCalc
  if (listCalc) {
    const listed = listDebts(listCalc, payoffCalc ? 'Debt Payoff Calculator' : 'Debt Avalanche vs Snowball')
    listed.forEach((l) => { l.href = hrefOf(listCalc) })
    detailDebts.push(...listed)
  }
  // hrefs for the mortgage and card lines (built from their own scenarios)
  if (mortgage) {
    const src = ['mortgage-payoff-calculator', 'refinance-calculator', 'mortgage-amortization-calculator', 'mortgage-payment-calculator', 'home-equity-calculator']
      .map((s) => byTool.get(s)).find(Boolean)
    if (src) mortgage.href = hrefOf(src)
  }
  const cardCalc = byTool.get('credit-card-payoff-calculator') ?? byTool.get('credit-card-calculator')
  if (cardCalc) detailDebts.forEach((l) => { if (l.label === 'Credit cards') l.href = hrefOf(cardCalc) })

  // ── Balance sheet ──
  let assets: MoneyLine[] = []
  let debts: MoneyLine[] = []
  let basis: FinancialPicture['basis'] = 'empty'

  if (nw) {
    basis = 'net-worth'
    assets = recordLines(nw.input_state, 'assets', 'Net Worth Tracker', {
      home: 'Home', bank: 'Bank accounts', investments: 'Investments', vehicles: 'Vehicles', other: 'Other assets',
    })
    assets.forEach((l) => { l.href = hrefOf(nw); l.kind = l.label === 'Investments' ? 'Investments' : (l.label === 'Home' || l.label === 'Vehicles') ? 'Property' : 'Cash & savings' })
    debts = recordLines(nw.input_state, 'liabs', 'Net Worth Tracker', {
      mortgage: 'Mortgage', auto: 'Auto loan', student: 'Student loan', cards: 'Credit cards', other: 'Other debts',
    })
    debts.forEach((l) => { l.href = hrefOf(nw) })
  } else if (detailDebts.length || byTool.size) {
    debts = detailDebts
    for (const spec of ASSET_SPECS) {
      const calc = byTool.get(spec.slug)
      const v = calc ? num(calc.input_state, spec.key) : null
      if (calc && v && v > 0) assets.push({ label: spec.label, source: spec.source, value: v, href: hrefOf(calc), kind: spec.kind })
    }
    if (!byTool.has('retirement-calculator')) {
      const mc = byTool.get('monte-carlo-retirement-simulator')
      const v = mc ? num(mc.input_state, 'currentSavings') : null
      if (mc && v && v > 0) assets.push({ label: 'Retirement (Monte Carlo plan)', source: 'Monte Carlo Retirement Simulator', value: v, href: hrefOf(mc), kind: 'Investments' })
    }
    if (!byTool.has('investment-calculator')) {
      const pr = byTool.get('portfolio-rebalancer')
      const raw = pr?.input_state?.holdings
      if (pr && typeof raw === 'string') {
        const total = [...raw.matchAll(/:\s*([\d.]+)\s*@/g)].reduce((a, m) => a + Number(m[1]), 0)
        if (total > 0) assets.push({ label: 'Portfolio (rebalancer)', source: 'Portfolio Rebalancer', value: Math.round(total), href: hrefOf(pr), kind: 'Investments' })
      }
    }
    const analyzer = byTool.get('rental-property-analyzer')
    if (analyzer) {
      const s = analyzer.input_state
      const price = num(s, 'price'); const downPct = num(s, 'downPct') ?? 20
      const rate = num(s, 'rate') ?? 0; const months = (num(s, 'termYears') ?? 30) * 12
      if (price) {
        const loan = Math.round(price * (1 - downPct / 100))
        const pay = amortize(loan, rate, months)
        debts.push({ label: 'Rental property loan', source: 'Rental Property Analyzer', value: loan, apr: rate, monthlyPayment: pay, interestCost: pay ? Math.max(0, Math.round(pay * months - loan)) : null, href: hrefOf(analyzer) })
        const eqv = Math.round(price * downPct / 100)
        if (eqv > 0) assets.push({ label: 'Rental property equity', source: 'Rental Property Analyzer', value: eqv, href: hrefOf(analyzer), kind: 'Property' })
      }
    }
    const equity = byTool.get('home-equity-calculator')
    if (equity) {
      const s = equity.input_state
      const eq = (num(s, 'value') ?? 0) - (num(s, 'first') ?? 0) - (num(s, 'second') ?? 0)
      if (eq > 0) assets.push({ label: 'Home equity', source: 'Home Equity Calculator', value: eq, href: hrefOf(equity), kind: 'Property' })
    }
    const rental = byTool.get('rental-cash-flow-calculator')
    if (rental) {
      const s = rental.input_state
      const price = num(s, 'price')
      if (price) assets.push({ label: 'Rental property equity', source: 'Rental Cash Flow Calculator', value: Math.round(price * ((num(s, 'downPct') ?? 25) / 100)), href: hrefOf(rental), kind: 'Property' })
    }
    if (assets.length || debts.length) basis = 'combined'
  }

  const totalAssets = assets.reduce((a, l) => a + l.value, 0)
  const totalDebts = debts.reduce((a, l) => a + l.value, 0)

  // Payments/APR aggregates come from the detailed loan-tool debts in both
  // modes (in Net-Worth mode they describe the same debts' payments).
  const paymentSource = basis === 'net-worth' ? detailDebts : debts
  const payments = paymentSource.map((d) => d.monthlyPayment).filter((p): p is number => p != null)
  const monthlyDebtPayments = payments.length ? payments.reduce((a, b) => a + b, 0) : null

  const aprDebts = paymentSource.filter((d) => d.apr != null && d.value > 0)
  const weightedApr = aprDebts.length
    ? aprDebts.reduce((a, d) => a + (d.apr as number) * d.value, 0) / aprDebts.reduce((a, d) => a + d.value, 0)
    : null
  const interestLines = paymentSource.filter((d) => d.interestCost != null)
  const totalInterestCost = interestLines.length ? interestLines.reduce((a, d) => a + (d.interestCost as number), 0) : null
  const highestAprDebt = aprDebts.length
    ? aprDebts.reduce((a, b) => ((a.apr as number) >= (b.apr as number) ? a : b))
    : null

  // ── Income: ONE source, most direct first ──
  let monthlyIncome: number | null = null
  let incomeSource: string | null = null
  const incomeCandidates: { slug: string; source: string; get: (s: Record<string, unknown>) => number | null }[] = [
    { slug: 'budget-calculator', source: 'Budget Calculator', get: (s) => num(s, 'income') },
    { slug: '50-30-20-budget-calculator', source: '50/30/20 Budget Calculator', get: (s) => num(s, 'income') },
    { slug: 'debt-to-income-ratio-calculator', source: 'Debt-to-Income Calculator', get: (s) => num(s, 'income') },
    { slug: 'paycheck-calculator', source: 'Paycheck Calculator', get: (s) => { const v = num(s, 'salary'); return v ? v / 12 : null } },
    { slug: 'take-home-pay-calculator', source: 'Take-Home Pay Calculator', get: (s) => { const v = num(s, 'gross'); return v ? v / 12 : null } },
    { slug: 'income-tax-calculator', source: 'Income Tax Calculator', get: (s) => { const v = num(s, 'income'); return v ? v / 12 : null } },
    {
      slug: 'salary-calculator', source: 'Salary Calculator',
      get: (s) => {
        const amount = num(s, 'amount'); if (!amount) return null
        if (s.period === 'monthly') return amount
        if (s.period === 'hourly') return (amount * (num(s, 'hoursPerWeek') ?? 40) * (num(s, 'weeksPerYear') ?? 52)) / 12
        return amount / 12
      },
    },
    { slug: 'home-affordability-calculator', source: 'Home Affordability Calculator', get: (s) => { const v = num(s, 'income'); return v ? v / 12 : null } },
  ]
  for (const cand of incomeCandidates) {
    const calc = byTool.get(cand.slug)
    if (!calc) continue
    const v = cand.get(calc.input_state)
    if (v && v > 0) { monthlyIncome = v; incomeSource = cand.source; break }
  }

  // Fallback: a saved Debt-to-Income scenario itemizes monthly payments —
  // use its total when no loan scenario supplied payments directly.
  let monthlyDebtPaymentsFinal = monthlyDebtPayments
  if (monthlyDebtPaymentsFinal == null) {
    const dtiCalc = byTool.get('debt-to-income-ratio-calculator')
    if (dtiCalc) {
      const s = dtiCalc.input_state
      const sum = ['housing', 'auto', 'student', 'cards', 'other'].reduce((a, k) => a + (num(s, k) ?? 0), 0)
      if (sum > 0) monthlyDebtPaymentsFinal = sum
    }
  }

  const dti = monthlyIncome && monthlyDebtPaymentsFinal ? (monthlyDebtPaymentsFinal / monthlyIncome) * 100 : null

  // ── Cash flow: budget scenario wins over 50/30/20 ──
  let cashFlow: FinancialPicture['cashFlow'] = null
  const budget = byTool.get('budget-calculator')
  const rule = byTool.get('50-30-20-budget-calculator')
  if (budget) {
    const s = budget.input_state
    const income = num(s, 'income') ?? 0
    const cats: [string, string][] = [
      ['Housing', 'housing'], ['Transport', 'transport'], ['Food', 'food'], ['Utilities', 'utilities'],
      ['Insurance', 'insurance'], ['Entertainment', 'entertainment'], ['Dining', 'dining'],
      ['Subscriptions', 'subscriptions'], ['Other', 'other'],
    ]
    const outgo = cats.map(([label, key]) => ({ label, value: num(s, key) ?? 0 })).filter((o) => o.value > 0)
    const totalOutgo = outgo.reduce((a, o) => a + o.value, 0)
    const savings = num(s, 'savings') ?? 0
    cashFlow = {
      source: 'Budget Calculator', href: hrefOf(budget), income, outgo, totalOutgo, savings,
      leftover: income - totalOutgo - savings,
      savingsRate: income > 0 ? (savings / income) * 100 : 0,
    }
  } else if (rule) {
    const s = rule.input_state
    const income = num(s, 'income') ?? 0
    const needs = num(s, 'needs') ?? 0; const wants = num(s, 'wants') ?? 0; const savings = num(s, 'savings') ?? 0
    cashFlow = {
      source: '50/30/20 Budget Calculator', href: hrefOf(rule), income,
      outgo: [{ label: 'Needs', value: needs }, { label: 'Wants', value: wants }].filter((o) => o.value > 0),
      totalOutgo: needs + wants, savings,
      leftover: income - needs - wants - savings,
      savingsRate: income > 0 ? (savings / income) * 100 : 0,
    }
  }

  // ── Emergency fund ──
  let emergency: FinancialPicture['emergency'] = null
  const ef = byTool.get('emergency-fund-visualizer')
  if (ef) {
    const s = ef.input_state
    const monthlyExpenses = ['rent', 'food', 'transport', 'insurance', 'other'].reduce((a, k) => a + (num(s, k) ?? 0), 0)
    const saved = num(s, 'saved') ?? 0
    if (monthlyExpenses > 0) emergency = { monthsCovered: saved / monthlyExpenses, saved, monthlyExpenses, href: hrefOf(ef) }
  }

  // ── Monthly saving & investing across saved plans ──
  const investingParts: [string, string][] = [
    ['ira-calculator', 'contribution'], ['roth-ira-calculator', 'annual'],
    ['401k-vs-solo-401k-calculator', 'employee'],
  ]
  let monthlyInvesting = 0
  let anyInvesting = false
  for (const [slug, key] of investingParts) {
    const calc = byTool.get(slug)
    const v = calc ? num(calc.input_state, key) : null
    if (v) { monthlyInvesting += v / 12; anyInvesting = true }
  }
  for (const [slug, key] of [['investment-calculator', 'monthly'], ['savings-calculator', 'monthly'], ['compound-interest-scaler-calculator', 'monthly'], ['retirement-calculator', 'monthly'], ['interest-calculator', 'monthly'], ['fat-fire-vs-lean-fire-calculator', 'monthlySave'], ['down-payment-calculator', 'monthly'], ['savings-goal-calculator', 'monthlyAmount']] as [string, string][]) {
    const calc = byTool.get(slug)
    const v = calc ? num(calc.input_state, key) : null
    if (v) { monthlyInvesting += v; anyInvesting = true }
  }

  const snapshots: FinancialPicture['snapshots'] = []
  const rvb = byTool.get('rent-vs-buy-calculator')
  const rentAmt = rvb ? num(rvb.input_state, 'rent') : null
  if (rvb && rentAmt) snapshots.push({ label: 'Current rent', value: money(rentAmt) + '/mo', href: hrefOf(rvb) })
  const cg = byTool.get('capital-gains-tax-calculator')
  if (cg) {
    const gain = (num(cg.input_state, 'sale') ?? 0) - (num(cg.input_state, 'cost') ?? 0)
    if (gain > 0) snapshots.push({ label: 'Capital gain modeled', value: money(gain) + ((num(cg.input_state, 'months') ?? 0) >= 12 ? ' · long-term' : ' · short-term'), href: hrefOf(cg) })
  }
  const ot = byTool.get('overtime-calculator')
  if (ot) {
    const s = ot.input_state
    const otPay = (num(s, 'rate') ?? 0) * ((num(s, 'otHours') ?? 0) * 1.5 + (num(s, 'dtHours') ?? 0) * 2) * 52 / 12
    if (otPay > 0) snapshots.push({ label: 'Overtime pay modeled', value: money(otPay) + '/mo', href: hrefOf(ot) })
  }
  const pta = byTool.get('property-tax-assessor-calculator')
  if (pta) {
    const s = pta.input_state
    const assessed = (num(s, 'market') ?? 0) * ((num(s, 'ratio') ?? 100) / 100) - (num(s, 'exemption') ?? 0)
    const tax = assessed * ((num(s, 'ratePct') ?? 0) / 100)
    if (tax > 0) snapshots.push({ label: 'Property tax modeled', value: money(tax) + '/yr', href: hrefOf(pta) })
  }
  const business = buildBusiness(byTool, hrefOf)

  return {
    business,
    snapshots,
    basis,
    assets, debts,
    totalAssets, totalDebts,
    netPosition: totalAssets - totalDebts,
    monthlyDebtPayments: monthlyDebtPaymentsFinal,
    weightedApr,
    totalInterestCost,
    highestAprDebt,
    monthlyIncome, incomeSource,
    dti,
    cashFlow,
    emergency,
    monthlyInvesting: anyInvesting ? monthlyInvesting : null,
    toolsUsed: byTool.size,
  }
}
