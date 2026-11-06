import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { AlertTriangle, Calculator, TrendingUp } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Sponsorship Pricing Calculator: Price Brand Deals by Views & Engagement",
  description: "Calculate what to charge for sponsored videos, posts and brand deals from your average views, niche CPM and engagement rate. Includes usage rights and exclusivity uplifts and a negotiation range.",
  keywords: ["sponsorship pricing calculator", "brand deal calculator", "how much to charge for sponsorship", "influencer rate calculator", "sponsored video price", "creator brand deal pricing"],
  slug: "creator/sponsorship-pricing-calculator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
{"question": "How much should I charge per 1,000 views for a sponsorship?", "answer": "Sponsorship CPMs typically run from about $18 for entertainment to $50 or more for finance and B2B, with most consumer niches between $20 and $35. That is the price per 1,000 average views for a dedicated placement before engagement adjustments, usage rights and exclusivity."},
{"question": "Should I price sponsorships on followers or views?", "answer": "Views. Followers include inactive and uninterested accounts, while brands pay for expected attentive views. Quote on the average views of your recent comparable posts, and support the number with engagement rate and audience demographics."},
{"question": "How much extra should I charge for usage rights?", "answer": "A common market range is 20 to 50 percent of the base fee for a defined period such as 30 to 90 days of paid usage, rising for longer terms. Perpetual or buyout usage should cost substantially more and be agreed explicitly in writing."},
{"question": "What is a fair price for category exclusivity?", "answer": "Exclusivity, agreeing not to promote competitors for a period, is typically priced at 25 to 100 percent on top of the base fee depending on the length of the window and how many rival brands it blocks. The broader and longer the exclusivity, the higher the uplift."},
{"question": "How do I price a sponsorship when my views are inconsistent?", "answer": "Use a median or trimmed average of your last 10 to 20 posts rather than the mean, so one viral outlier does not set the price. Some creators offer a view guarantee with a make-good clause, which protects the brand and justifies holding a firmer rate."}
]

export default function Page() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Price a Creator Sponsorship or Brand Deal",
    "description": "Calculate what to charge for sponsored videos, posts and brand deals from your average views, niche CPM and engagement rate. Includes usage rights and exclusivity uplifts and a negotiation range.",
    "step": [
{"@type": "HowToStep", "name": "Enter average views, not subscribers", "text": "Average your last 10 to 20 comparable posts. For a dedicated video, use long-form averages. For an integration, a common convention is 60 to 75 percent of the dedicated rate."},
{"@type": "HowToStep", "name": "Select your niche CPM", "text": "Pick the band your audience's purchasing power justifies. If sponsors in your niche sell high-ticket products, you are at the top of the table, not the middle."},
{"@type": "HowToStep", "name": "Set engagement and deliverables", "text": "Engagement is likes plus comments divided by views or followers, consistently measured. Add every deliverable the brief contains: each video, story set, short and community post is a line item."},
{"@type": "HowToStep", "name": "Add rights and exclusivity last", "text": "Only include usage and exclusivity the brand actually requested, and state the period in writing. Then quote the total, with the range in reserve for negotiation."}
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://dailyfinance.tools/creator/sponsorship-pricing-calculator",
        "url": "https://dailyfinance.tools/creator/sponsorship-pricing-calculator",
        "name": "Sponsorship Pricing Calculator: Price Brand Deals by Views & Engagement",
        "description": "Calculate what to charge for sponsored videos, posts and brand deals from your average views, niche CPM and engagement rate. Includes usage rights and exclusivity uplifts and a negotiation range."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" },
          { "@type": "ListItem", "position": 2, "name": "Creator Economy", "item": "https://dailyfinance.tools/creator" },
          { "@type": "ListItem", "position": 3, "name": "Sponsorship Pricing Calculator", "item": "https://dailyfinance.tools/creator/sponsorship-pricing-calculator" }
        ]
      }
    ]
  };

  return (
    <>
      <Script id="schema-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ToolLayout
        title="Sponsorship Pricing Calculator"
        description="Calculate what to charge for sponsored videos, posts and brand deals from your average views, niche CPM and engagement rate. Includes usage rights and exclusivity uplifts and a negotiation range."
        slug="sponsorship-pricing-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How Much Should You Charge for a Sponsorship?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Price a sponsorship from views, not followers: take your average views per post, divide by 1,000 and multiply by a niche CPM of roughly $18 to $50. Adjust for engagement above or below 3 percent, then add 20 to 50 percent for usage rights and 25 percent or more for exclusivity.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Followers Do Not Pay Rent. Views and Trust Do.</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The most common pricing error in the creator economy is quoting from follower count. Brands stopped buying followers years ago, because followers do not watch, click or buy in predictable numbers. What a brand is actually purchasing is expected attentive views from a specific audience, plus the trust you have built with that audience, plus the right to reuse your work. Price those three things and your rate card suddenly makes sense to a media buyer, because it is written in the language they already use: CPM.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">CPM, the cost per thousand views, varies by niche for the same reason YouTube RPM does. A finance or B2B creator reaching founders and high earners can command $40 to $50 CPM, because one customer is worth a fortune to the sponsor. An entertainment creator with the same views might get $18, because the sponsor is buying reach, not purchasing power. Neither rate is unfair. They are different products, and this calculator makes you name which one you are selling before it produces a number.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Engagement is the second lever, and it is the one smaller creators win on. A 4 to 6 percent engagement rate signals an audience that comments, shares and acts, which is exactly what a sponsor cannot buy from a television ad. This calculator rewards engagement above the 3 percent benchmark and discounts below it, then layers on the two uplifts creators most often give away free: usage rights, when a brand turns your video into its own paid ad, and exclusivity, when you agree to refuse the brand's competitors. Both have real market prices. Charge them.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Views Beat Followers</h3>
              <p className="text-sm text-neutral-500 font-light">A channel with 50,000 subscribers averaging 80,000 views per video outsells a channel with 500,000 subscribers averaging 20,000 views. Quote on the rolling average of your last 10 to 20 posts, and show the brand that data.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Usage Rights Are a Second Product</h3>
              <p className="text-sm text-neutral-500 font-light">When a brand whitelists or reposts your content as advertising, it is buying media, not just content. Market practice is an extra 20 to 50 percent per period of usage. Never bundle perpetual usage into a base rate.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Exclusivity Has a Price Tag</h3>
              <p className="text-sm text-neutral-500 font-light">Agreeing not to work with competing brands removes future income. Category exclusivity for 30 to 90 days is typically priced at 25 to 100 percent on top of the base fee, depending on how crowded the category is.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Sponsorship Pricing Formula Brands Respect</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Brand Deal Pricing Equation</h3>
            <div className="font-mono text-lg md:text-2xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Price = (Avg Views / 1,000) x Niche CPM x Engagement Factor x (1 + Usage %) x (1 + Exclusivity %) x Deliverables</div>
          </div>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Each term in the equation defends itself in a negotiation. Views times CPM is the media value, the same maths a brand runs when it buys YouTube or podcast ads. The engagement factor, modelled here as roughly 8 percent per point above a 3 percent benchmark, prices the difference between an audience that scrolls past and an audience that acts. Usage and exclusivity are multiplicative because they apply to the whole value of the work, not to a slice of it.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The output is deliberately a range as well as a number. Quote the recommended price, know that the low end, about 80 percent, is your walk-away floor, and treat the high end, about 130 percent, as your anchor when the brand asks for revisions, extra deliverables or faster turnaround. Creators who quote a single brittle number negotiate against themselves. Creators who quote a priced structure, base plus itemised rights, almost always close higher.</p>

          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">How to Use This Calculator, Step by Step</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Enter average views, not subscribers</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Average your last 10 to 20 comparable posts. For a dedicated video, use long-form averages. For an integration, a common convention is 60 to 75 percent of the dedicated rate.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Select your niche CPM</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Pick the band your audience's purchasing power justifies. If sponsors in your niche sell high-ticket products, you are at the top of the table, not the middle.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Set engagement and deliverables</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Engagement is likes plus comments divided by views or followers, consistently measured. Add every deliverable the brief contains: each video, story set, short and community post is a line item.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 4: Add rights and exclusivity last</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Only include usage and exclusivity the brand actually requested, and state the period in writing. Then quote the total, with the range in reserve for negotiation.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Worked Examples With Real Numbers</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: A Finance Creator With 80,000 Average Views</h3>
            <p className="text-neutral-600 font-light leading-relaxed">A finance creator averages 80,000 views per video, has a 4.5 percent engagement rate, and is asked for one dedicated video with 30 days of paid usage rights at 30 percent, and no exclusivity. Base media value is 80 times the $50 finance CPM, which is $4,000. Engagement at 1.5 points above benchmark lifts that by about 12 percent to roughly $4,480. Usage rights add 30 percent, giving a recommended price of about $5,825 for the deal, with a negotiation range of roughly $4,660 to $7,570. Notice what did the work here: niche and rights, not audience size.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: A Lifestyle Creator With 300,000 Average Views</h3>
            <p className="text-neutral-600 font-light leading-relaxed">A lifestyle creator averages 300,000 views, far more than the finance creator, with 2.5 percent engagement and a two-video package, no usage, no exclusivity. Base value is 300 times the $22 lifestyle CPM, which is $6,600. Engagement half a point below benchmark trims about 4 percent, to roughly $6,340 per video, or about $12,670 for the two-video package. The comparison is the lesson: nearly four times the views produced only about twice the per-video price, because purchasing power and engagement, not raw reach, set the rate.</p>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Sponsorship Pricing Mistakes That Cost Creators Thousands</h2>
          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Quoting from follower count</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Brands will quietly re-price you on views even if you quote on followers, and you will lose. Lead with average views and engagement, the metrics in the brand's own spreadsheet.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Giving usage rights away free</strong>
                <span className="text-neutral-600 font-light leading-relaxed">A perpetual, paid-media usage grant can be worth more than the original video. Always separate content creation from media usage, price the usage period, and let perpetual rights be a deliberate, expensive choice.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Charging the same for integrations and dedicated videos</strong>
                <span className="text-neutral-600 font-light leading-relaxed">A 60-second integration inside your own content and a full dedicated video are different products with different view patterns and effort. Price integrations at a clear fraction of your dedicated rate instead of improvising per email.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Discounting before the brand pushes back</strong>
                <span className="text-neutral-600 font-light leading-relaxed">An instant discount teaches the buyer your first price was fiction. Hold the structured quote, and trade, do not concede: fewer deliverables or shorter exclusivity in exchange for a lower total.</span>
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Bottom Line</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">A defensible rate card is built, not vibes: average views, a niche CPM you can justify, an engagement adjustment, and itemised rights. Build yours once with this calculator, save the structure, and reuse it for every inbound brief, adjusting only the deliverables and rights. Consistency is what turns sponsorships from occasional windfalls into a forecastable revenue line.</p>
          <p className="text-lg text-neutral-600 mb-16 leading-relaxed font-light flex items-start gap-3"><TrendingUp className="h-6 w-6 text-[#064E3B] shrink-0 mt-1" />Pressure-test any deal against your other income before you sign. If a sponsorship pays less per hour of work than the AdSense, affiliate revenue and audience growth it displaces, the brand is buying your channel at a discount. The platform fee and affiliate tools on this site help you run that comparison in minutes.</p>
        </>
      )}
      </ToolLayout>
    </>
  )
}
