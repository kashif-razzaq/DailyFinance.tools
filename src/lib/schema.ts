/**
 * Shared Schema.org builders — the single source of truth for every JSON-LD
 * block on the site. All schema is rendered as PLAIN <script
 * type="application/ld+json"> elements (never next/script, which only
 * injects after hydration and is invisible to Google's initial parse).
 *
 * Graph: every block links to the Organization via its @id
 * (https://www.dailyfinance.tools/#organization). Publisher objects are the full
 * object (name, url, logo) with the same @id.
 *
 * CONTENT_REVIEWED is the date the site's content was last reviewed as a
 * whole (the November 2026 content round). Tool and location pages use it
 * for datePublished/dateModified until per-page review dates exist — it
 * matches the "data reviewed Nov 2026" line shown on location pages.
 *
 * Deliberately NOT emitted anywhere: aggregateRating/review (no real
 * ratings exist), VideoObject (no videos). SearchAction IS emitted by
 * webSite(): /tools consumes ?q= and returns matching tools, so the
 * sitelinks search box target is a real search route.
 */

export const SITE_URL = "https://www.dailyfinance.tools"
export const ORG_ID = "https://www.dailyfinance.tools/#organization"
export const WEBSITE_ID = "https://www.dailyfinance.tools/#website"
export const LOGO_URL = "https://www.dailyfinance.tools/logo.svg"
export const CONTENT_REVIEWED = "2026-11-12"

export interface FaqItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface HowToStepInput {
  name?: string
  text: string
}

/**
 * JSON.stringify with "<" escaped as \u003c, so a stray "</script>" inside
 * content can never break out of the script element. \u003c is valid JSON
 * and decodes back to "<" for any JSON parser (including Google's).
 */
export function stringifyJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

/** Full publisher object, used inside Article/WebPage blocks. */
export function publisherObject() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "DailyFinance.tools",
    url: SITE_URL,
    logo: LOGO_URL,
  }
}

/** Bare @id reference, used where a full object would duplicate the graph. */
export function publisherRef() {
  return { "@id": ORG_ID }
}

export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "DailyFinance.tools",
    url: SITE_URL,
    logo: LOGO_URL,
    description:
      "100+ free financial calculators for personal finance, mortgages, loans, taxes, retirement, freelancers, creators and e-commerce sellers.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "momintechltd@gmail.com",
      contactType: "customer support",
    },
  }
}

export function webSite() {
  // SearchAction: /tools consumes ?q= and returns matching tools, so the
  // sitelinks search box target is a real search route (this claim is
  // honest only because the route exists — see src/app/tools/page.tsx).
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "DailyFinance.tools",
    url: SITE_URL,
    publisher: publisherRef(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.dailyfinance.tools/tools?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function siteNavigation() {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Freelance Tools",
      "Creator Economy Tools",
      "E-Commerce Tools",
      "Real Estate Tools",
      "Personal Wealth Tools",
      "Loans & Debt Tools",
      "Tax & Salary Tools",
      "Guides",
    ],
    url: [
      `${SITE_URL}/freelance`,
      `${SITE_URL}/creator`,
      `${SITE_URL}/ecommerce`,
      `${SITE_URL}/real-estate`,
      `${SITE_URL}/personal-wealth`,
      `${SITE_URL}/loans`,
      `${SITE_URL}/tax`,
      `${SITE_URL}/guides`,
    ],
  }
}

export function breadcrumb(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function faq(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

export function article(opts: {
  headline: string
  description?: string
  url: string
  dateModified: string
  datePublished?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    ...(opts.description ? { description: opts.description } : {}),
    author: { "@type": "Person", name: "Tahir Shehzad", jobTitle: "ACMA" },
    publisher: publisherObject(),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    dateModified: opts.dateModified,
    mainEntityOfPage: opts.url,
  }
}

export function howTo(opts: { name: string; steps: HowToStepInput[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    step: opts.steps.map((s) => ({
      "@type": "HowToStep",
      ...(s.name ? { name: s.name } : {}),
      text: s.text,
    })),
  }
}

export function webApp(opts: { name: string; url: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    url: opts.url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: opts.description,
    publisher: publisherRef(),
  }
}

export function itemList(opts: { name: string; items: { name: string; url: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    itemListElement: opts.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  }
}

export function webPage(opts: {
  name: string
  url: string
  datePublished?: string
  dateModified?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    url: opts.url,
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    publisher: publisherRef(),
  }
}

export interface OfferInput {
  name: string
  price: string
  priceCurrency?: string
  /** ISO 8601 duration, e.g. "P1M" for monthly billing. Adds a UnitPriceSpecification. */
  billingDuration?: string
}

export function offer(input: OfferInput) {
  return {
    "@type": "Offer",
    name: input.name,
    price: input.price,
    priceCurrency: input.priceCurrency ?? "USD",
    availability: "https://schema.org/InStock",
    ...(input.billingDuration
      ? {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: input.price,
            priceCurrency: input.priceCurrency ?? "USD",
            billingDuration: input.billingDuration,
          },
        }
      : {}),
  }
}

export function product(opts: {
  name: string
  url: string
  description?: string
  offers: ReturnType<typeof offer>[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    url: opts.url,
    ...(opts.description ? { description: opts.description } : {}),
    brand: publisherRef(),
    offers: opts.offers,
  }
}
