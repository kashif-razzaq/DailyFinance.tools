import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { AlertTriangle, Calculator, TrendingUp } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "YouTube Money Calculator: Estimate AdSense Earnings by Views & RPM",
  description: "Estimate your YouTube AdSense earnings from views and RPM by niche. Compare long-form and Shorts income, see per-video, daily and yearly revenue, and learn the formula top creators use.",
  keywords: ["youtube money calculator", "youtube adsense estimator", "youtube earnings calculator", "youtube rpm calculator", "how much do youtubers make", "youtube cpm by niche", "youtube shorts money calculator"],
  slug: "creator/youtube-adsense-estimator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
{"question": "How much does YouTube pay per 1,000 views?", "answer": "It depends on niche and format. Long-form RPM typically ranges from about $1.50 for music to $15 or more for finance in high-income markets, with many channels between $3 and $8. Shorts RPM is far lower, usually $0.03 to $0.12 per 1,000 views, because Shorts revenue comes from a shared pool."},
{"question": "What is the difference between CPM and RPM on YouTube?", "answer": "CPM is what advertisers pay per 1,000 ad impressions before YouTube takes its share. RPM is what you actually earn per 1,000 views across your channel, after the 55 percent long-form revenue share and after including views that showed no ad. RPM is always the smaller, and the only planning-grade, number."},
{"question": "How many views do you need to make $1,000 a month on YouTube?", "answer": "Divide 1,000 by your RPM and multiply by 1,000 views. At a $5 RPM you need about 200,000 views a month. At a $15 finance RPM you need about 67,000. At a $0.06 Shorts RPM you would need roughly 16.7 million views, which is why Shorts alone rarely fund a business."},
{"question": "Do subscribers affect how much YouTube pays?", "answer": "Not directly. YouTube pays on monetised views and watch behaviour, not subscriber count. Subscribers matter indirectly because they produce reliable early views, watch time and click-through, which raise both your view volume and, often, your RPM."},
{"question": "Why is my actual RPM lower than this calculator's default?", "answer": "The defaults assume a mainly US, UK, Canada and Australia audience and healthy watch time. A global audience, short average view duration, ad-unfriendly topics or a high share of Premium and ad-blocked views will all pull real RPM below the preset. Replace the default with your measured Studio RPM for an accurate estimate."}
]

export default function Page() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Estimate Your YouTube AdSense Earnings",
    "description": "Estimate your YouTube AdSense earnings from views and RPM by niche. Compare long-form and Shorts income, see per-video, daily and yearly revenue, and learn the formula top creators use.",
    "step": [
{"@type": "HowToStep", "name": "Choose your format", "text": "Select long-form or Shorts first, because the revenue model is completely different. Mixing Shorts views into a long-form estimate is the fastest way to produce a fantasy number."},
{"@type": "HowToStep", "name": "Pick your niche honestly", "text": "Choose the niche your viewers and advertisers actually see, not the one you aspire to. A finance-titled channel with entertainment watch patterns earns entertainment RPM."},
{"@type": "HowToStep", "name": "Enter monthly views and adjust RPM", "text": "Use your trailing 90-day average views, not your best month. Then nudge the RPM slider to your measured Studio RPM if you have one."},
{"@type": "HowToStep", "name": "Read the per-video and yearly figures", "text": "Per-video earnings tell you which formats deserve your production time. The yearly figure, not the monthly spike, is the number to plan a business around."}
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
        "@id": "https://dailyfinance.tools/creator/youtube-adsense-estimator",
        "url": "https://dailyfinance.tools/creator/youtube-adsense-estimator",
        "name": "YouTube Money Calculator: Estimate AdSense Earnings by Views & RPM",
        "description": "Estimate your YouTube AdSense earnings from views and RPM by niche. Compare long-form and Shorts income, see per-video, daily and yearly revenue, and learn the formula top creators use."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" },
          { "@type": "ListItem", "position": 2, "name": "Creator Economy", "item": "https://dailyfinance.tools/creator" },
          { "@type": "ListItem", "position": 3, "name": "YouTube Money Calculator", "item": "https://dailyfinance.tools/creator/youtube-adsense-estimator" }
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
        title="YouTube Money Calculator"
        description="Estimate your YouTube AdSense earnings from views and RPM by niche. Compare long-form and Shorts income, see per-video, daily and yearly revenue, and learn the formula top creators use."
        slug="youtube-adsense-estimator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How Much Does YouTube Pay Per 1,000 Views?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">YouTube pays creators through RPM: the revenue you keep per 1,000 views after YouTube takes its share. Earnings equal views divided by 1,000, multiplied by your RPM. Long-form RPM ranges from about $1.50 in music to $15 or more in finance, while Shorts RPM is typically only $0.03 to $0.12.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Why Views Alone Tell You Almost Nothing About YouTube Income</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Two channels can both get a million views in a month and earn wildly different amounts of money. One, in personal finance, might take home $15,000. The other, posting music clips, might take home $1,500. The difference is not effort, luck or subscriber count. It is RPM, and RPM is set by who your viewers are, what advertisers will pay to reach them, how long they watch, and where in the world they live. Any earnings estimate that starts and ends with a view count is a guess dressed up as a number.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">This calculator fixes that by making you choose a niche first. The niche presets are not decorative: advertiser demand in finance, insurance, software and B2B is structurally higher because a single converted viewer can be worth hundreds of dollars to the advertiser. Entertainment and gaming audiences are younger, more global and far less likely to buy high-ticket products, so advertisers bid less, CPM falls, and your RPM falls with it. Geography compounds the effect, because a view from the United States, Canada, Australia or the UK is routinely worth several times a view from a lower-income market.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use the estimate the right way round. Do not ask what a viral video might make in your best month. Ask what your channel earns at its normal view level, in its actual niche, across a full year. That is the number you can budget against, hire against and negotiate sponsorships against. Everything else in this guide, the formula, the worked examples and the mistakes section, exists to make that one number trustworthy.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">CPM Is Not RPM</h3>
              <p className="text-sm text-neutral-500 font-light">CPM is what advertisers pay for 1,000 ad impressions. RPM is what lands in your account per 1,000 views, after the revenue share and after counting views with no ads at all. Confusing the two inflates every estimate by roughly half.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Niche Sets the Ceiling</h3>
              <p className="text-sm text-neutral-500 font-light">Finance, business and software channels routinely see RPM three to ten times higher than entertainment or music. Choosing a niche is the single biggest earnings decision a creator makes, bigger than upload frequency.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Shorts Play a Different Game</h3>
              <p className="text-sm text-neutral-500 font-light">Shorts revenue comes from a shared pool and pays a small fraction per view. Shorts are a discovery engine that feeds your long-form catalogue, not a replacement income stream for most channels.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The YouTube Earnings Formula, Explained Properly</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The RPM Earnings Equation</h3>
            <div className="font-mono text-lg md:text-2xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Earnings = (Views / 1,000) x RPM  ·  RPM = (Total Revenue / Total Views) x 1,000</div>
          </div>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Start from the definition YouTube itself uses in Studio analytics. RPM is your total revenue, from ads, Premium watch time and other monetised sources, divided by every view in the period, multiplied by 1,000. Because the denominator is all views, including unmonetised ones, RPM is always lower than the CPM on any individual video. For long-form, you keep 55 percent of advertising revenue. For Shorts, creators receive 45 percent of the allocated pool for their geography, which is why Shorts RPM collapses to a few cents.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Work backwards from your own channel whenever you can. Open YouTube Studio, take last month's revenue and views, and compute your real RPM. Then use this calculator only to model what happens when views change. A model anchored to your measured RPM is accurate. A model anchored to a stranger's screenshot is entertainment. The niche defaults here are sensible starting points for channels without data yet, and the worked examples below show how sensitive the result is to getting the niche right.</p>

          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">How to Use This Calculator, Step by Step</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Choose your format</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Select long-form or Shorts first, because the revenue model is completely different. Mixing Shorts views into a long-form estimate is the fastest way to produce a fantasy number.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Pick your niche honestly</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Choose the niche your viewers and advertisers actually see, not the one you aspire to. A finance-titled channel with entertainment watch patterns earns entertainment RPM.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Enter monthly views and adjust RPM</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Use your trailing 90-day average views, not your best month. Then nudge the RPM slider to your measured Studio RPM if you have one.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 4: Read the per-video and yearly figures</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Per-video earnings tell you which formats deserve your production time. The yearly figure, not the monthly spike, is the number to plan a business around.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Worked Examples With Real Numbers</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: A Finance Channel at 250,000 Monthly Views</h3>
            <p className="text-neutral-600 font-light leading-relaxed">A personal finance channel averages 250,000 long-form views a month and publishes 12 videos. At the finance default RPM of $15, monthly earnings are 250,000 divided by 1,000, multiplied by 15, which is $3,750 a month, $45,000 a year, and about $313 per video. Now change only the niche. The identical channel, with identical views, in entertainment at $2.50 RPM earns $625 a month. Same work, same audience size, one sixth of the money. This is why experienced creators choose topics with advertiser demand and treat view growth as the second lever, not the first.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: A Shorts Channel at 5,000,000 Monthly Views</h3>
            <p className="text-neutral-600 font-light leading-relaxed">A comedy creator posts Shorts that collect 5,000,000 views a month. At a representative Shorts RPM of $0.06, earnings are 5,000,000 divided by 1,000, multiplied by 0.06, which is just $300 a month. The same creator funnels even 2 percent of that audience, 100,000 views, to long-form videos at a modest $3 RPM and adds another $300, doubling income from a fiftieth of the views. The lesson is not that Shorts are worthless. It is that Shorts are top-of-funnel: their financial job is to manufacture long-form viewers and sponsorship reach, and this calculator now lets you model both halves of that strategy separately.</p>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Common YouTube Money Mistakes That Inflate Every Estimate</h2>
          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Using CPM as if it were RPM</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Blog posts love quoting a $30 finance CPM. After the 45 percent platform share and unmonetised views, the creator might see $12 to $15 RPM. Every estimate built on raw CPM overstates income by 50 to 100 percent.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Counting Shorts views at long-form rates</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Five million Shorts views sounds like a fortune until you apply a $0.03 to $0.12 RPM. Always split your view count by format before you estimate anything.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Projecting from your best video</strong>
                <span className="text-neutral-600 font-light leading-relaxed">One outlier video can be ten times your median. Advertisers, landlords and lenders all know this, which is why serious planning uses trailing averages and medians, never peaks.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Ignoring viewer geography</strong>
                <span className="text-neutral-600 font-light leading-relaxed">A channel whose audience is mostly in high-income countries can earn several times more than an identical channel elsewhere. Check the geography tab in Studio before trusting any preset, including ours.</span>
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Bottom Line</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">YouTube income is views times RPM, and of those two variables, RPM is the one most creators can actually move: by choosing advertiser-friendly topics, holding attention longer, and building an audience in markets advertisers value. Run this calculator with your real Studio RPM, model conservative, base and optimistic view levels, and plan your spending against the conservative case.</p>
          <p className="text-lg text-neutral-600 mb-16 leading-relaxed font-light flex items-start gap-3"><TrendingUp className="h-6 w-6 text-[#064E3B] shrink-0 mt-1" />Once your AdSense baseline is honest, price the rest of the business on top of it: sponsorships are usually worth several times the ad revenue on the same views, and affiliate income follows the same niche logic. Use the sponsorship pricing and platform fee tools alongside this one to see the full stack.</p>
        </>
      )}
      </ToolLayout>
    </>
  )
}
