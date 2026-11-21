/**
 * Editorial guides — long-form, researched content written in the site voice
 * (see TONE-OF-VOICE.md: professional, direct, concrete numbers, no filler).
 * Each guide links to the calculators that act on it (internal linking is
 * deliberate: guide → tool → related guide). State and city guides live in
 * the programmatic routes under /guides/states and reuse the location data.
 *
 * Data lives in per-hub files under src/data/guides/ (one file per editorial
 * category, 20 guides each = the 100-article framework set). This module is
 * the merge point: interfaces, the combined GUIDES array, and lookups.
 */

import { GUIDES_PERSONAL_FINANCE } from "./guides/personal-finance"
import { GUIDES_MORTGAGE_REAL_ESTATE } from "./guides/mortgage-real-estate"
import { GUIDES_LOANS_DEBT } from "./guides/loans-debt"
import { GUIDES_TAX_SALARY_RETIREMENT } from "./guides/tax-salary-retirement"
import { GUIDES_FREELANCE_CREATOR_BUSINESS } from "./guides/freelance-creator-business"

export interface GuideSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  table?: { head: string[]; rows: string[][] }
}

/** Framework article type — the variety rule audits recorded types. */
export type GuideType = "What" | "How-to" | "Comparison" | "Best-List" | "Mistakes" | "Troubleshooting" | "FAQ"

export interface GuideSource {
  label: string
  url: string
}

export interface Guide {
  slug: string
  title: string
  /** Search-result title tag (SEL 3C rules, approved 2026-11-11). The on-page H1 stays `title`. */
  seoTitle: string
  description: string
  /** Featured image (public path) + its alt text — every guide carries one. */
  image: string
  imageAlt: string
  /** Second branded illustration, rendered mid-article (framework: 2+ per article). */
  inlineImage?: string
  inlineImageAlt?: string
  hub: string
  /** First publish date (ISO). Spread across the domain's first two months. */
  published: string
  /** Last content update (ISO). Equals `published` until a real update lands. */
  updated: string
  readMinutes: number
  /** Framework article type (variety rule). */
  type: GuideType
  /** 1–4 verified primary-source URLs. Dead-link sweep must read zero. */
  sources: GuideSource[]
  /** One cornerstone per hub (3,500 words); siblings link to it. */
  cornerstone: boolean
  relatedTools: { name: string; url: string }[]
  intro: string
  sections: GuideSection[]
  faqs: { question: string; answer: string }[]
}

export const GUIDES: Guide[] = [
  ...GUIDES_PERSONAL_FINANCE,
  ...GUIDES_MORTGAGE_REAL_ESTATE,
  ...GUIDES_LOANS_DEBT,
  ...GUIDES_TAX_SALARY_RETIREMENT,
  ...GUIDES_FREELANCE_CREATOR_BUSINESS,
]

export const GUIDE_HUBS = [...new Set(GUIDES.map((g) => g.hub))]

/**
 * One-line description per hub, shown in the Guides menus instead of the
 * guide count. The counts were honestly 20 in every hub (the 5×20
 * framework), but a uniform "20 guides" on every row looked templated
 * (Kashif, 2026-11-21) — a description says what the hub is actually about.
 */
export const HUB_DESCRIPTIONS: Record<string, string> = {
  "Personal Finance": "Budgets, savings, credit and everyday money",
  "Mortgage & Real Estate": "Buying, selling and paying off a home",
  "Loans & Debt": "Borrowing, payoff plans and interest",
  "Salary, Tax, Retirement & Investing": "Pay, taxes, retirement and growing wealth",
  "Freelance, Creator & Business": "Rates, invoicing and running your own work",
}

/**
 * Intro copy for the hub category pages (/guides/category/[hub]). Two
 * paragraphs per hub, written as real editorial introductions — category
 * pages must carry genuine unique content, not a bare list, to be worth
 * indexing (Google's helpful-content guidance; AdSense's thin-content
 * rules). Keep the claims generic: specific figures live in the guides.
 */
export const HUB_INTRO: Record<string, string[]> = {
  "Personal Finance": [
    "Personal finance is a system, not a set of tips. These guides cover the parts that compound: how to build a budget you can actually keep, how much emergency fund is enough, how to get out of debt in the cheapest order, and how to measure whether you are getting richer — net worth, savings rate, and the numbers behind them.",
    "Every guide works a real example with real figures and links to the calculator that runs the same math on your numbers. Start with the cornerstone guide below if you are building the system from scratch.",
  ],
  "Mortgage & Real Estate": [
    "A home is the largest purchase most people ever make, and the most expensive place to guess. These guides cover the full arc: how much house you can afford, how mortgages actually work, what a down payment changes, whether to refinance, and how to pay a mortgage off years early.",
    "Each guide states the rule, works the numbers on a real example, and links to the calculator behind it — so you can rerun the same math with your own price, rate and timeline.",
  ],
  "Loans & Debt": [
    "Borrowing is a tool with a price tag: the interest. These guides explain what loans really cost, how to compare them honestly, and how to get out of debt in the cheapest order — avalanche versus snowball, minimum payments versus fixed payments, and when consolidation helps or hurts.",
    "Every guide works a real example with real figures and links to the calculator that runs the same math on your numbers.",
  ],
  "Salary, Tax, Retirement & Investing": [
    "Your paycheck, your tax bill and your retirement are one connected system. These guides cover what your salary is actually worth after tax, how the federal brackets work, which retirement accounts to use and in what order, and how investing compounds over decades.",
    "All figures are checked against the IRS, SSA and Treasury sources listed on each guide, and every guide links to the calculator that runs the same math on your own numbers.",
  ],
  "Freelance, Creator & Business": [
    "Working for yourself means you are the payroll department, the tax department and the pricing department. These guides cover setting rates that cover your real costs, invoicing and getting paid, quarterly taxes, retirement accounts for the self-employed, and the platform fees that eat creator income.",
    "Every guide works a real example with real figures and links to the calculator that runs the same math on your numbers — your rate, your expenses, your tax year.",
  ],
}

/** "2026-11-06" -> "Nov 6, 2026". Shared by guide cards and hub pages. */
const GUIDE_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export function formatGuideDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  if (!y || !m || !d) return iso
  return `${GUIDE_MONTHS[m - 1]} ${d}, ${y}`
}
/** Anchor id for a hub's section on /guides — powers the Guides submenu category links. */
export const hubAnchor = (hub: string) =>
  hub.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-")
export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug)
/** Reverse lookup: guides that link to a given tool page — powers the tool → guide card in ToolLayout. */
export const getGuidesForTool = (toolUrl: string) =>
  GUIDES.filter((g) => g.relatedTools.some((t) => t.url === toolUrl))
export const guidesByHub = (hub: string) => GUIDES.filter((g) => g.hub === hub)
/** The hub cornerstone — every guide in the hub links to it. */
export const getHubCornerstone = (hub: string) => GUIDES.find((g) => g.hub === hub && g.cornerstone)
