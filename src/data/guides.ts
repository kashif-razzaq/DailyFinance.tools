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
export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug)
/** Reverse lookup: guides that link to a given tool page — powers the tool → guide card in ToolLayout. */
export const getGuidesForTool = (toolUrl: string) =>
  GUIDES.filter((g) => g.relatedTools.some((t) => t.url === toolUrl))
export const guidesByHub = (hub: string) => GUIDES.filter((g) => g.hub === hub)
/** The hub cornerstone — every guide in the hub links to it. */
export const getHubCornerstone = (hub: string) => GUIDES.find((g) => g.hub === hub && g.cornerstone)
