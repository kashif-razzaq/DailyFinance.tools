/**
 * Lightweight guide metadata for CLIENT components — hub names, hub
 * descriptions, the hub slugifier and the date formatter. This module has
 * ZERO imports from ./guides/* on purpose: the full guide dataset is
 * ~2.1 MB of source, and importing the @/data/guides barrel from a client
 * component ships all 100 guides in a JS chunk on every page (ARB round 2,
 * issue 1: one 1.85 MB chunk, 61% of the home page's JS). Client code must
 * import hub/date helpers from here, never from @/data/guides.
 *
 * The values below are the same data the barrel used to derive — the five
 * hub names are fixed by the 5×20 framework, in GUIDES order.
 */

export const GUIDE_HUBS: string[] = [
  "Personal Finance",
  "Mortgage & Real Estate",
  "Loans & Debt",
  "Salary, Tax, Retirement & Investing",
  "Freelance, Creator & Business",
]

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

/**
 * The only guide fields the home-page cards render. The server home page
 * computes these from GUIDES and passes them as props — the full Guide
 * (sections, FAQs, sources) never crosses to the client.
 */
export interface GuideSummary {
  slug: string
  title: string
  description: string
  image: string
  imageAlt: string
  hub: string
}
