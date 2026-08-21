import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { DollarSign, Percent, Shield, Zap, Target, BarChart, FileText, Briefcase } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Sponsorship Calculator | Value & Price Estimator",
  description: "Free sponsorship valuation calculator. Determine your exact sponsorship price for YouTube, Instagram, TikTok, and Newsletter brand deals based on your average reach and CPM.",
  keywords: ["sponsorship calculator", "sponsorship valuation calculator", "sponsorship value calculator", "sponsorship price calculator", "instagram sponsorship calculator", "sponsorship rate calculator", "how much to charge for brand deals"],
  slug: "creator/sponsorship-pricing-calculator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
  {
    question: "How do you calculate a sponsorship rate?",
    answer: "A standard sponsorship rate is calculated using a baseline CPM (Cost Per Mille) multiplied by your average views or reach. For example, a $20 CPM on 50,000 views yields a $1,000 baseline. You then add premiums for high engagement, content integration types, exclusivity, and usage rights."
  },
  {
    question: "What is a good CPM for YouTube sponsorships?",
    answer: "YouTube sponsorship CPMs typically range from $15 to $30+. Dedicated videos (where the entire video is about the sponsor) can command $40 to $50+ CPMs. Niches like finance and B2B software always command the highest CPMs."
  },
  {
    question: "Should I charge extra for usage rights?",
    answer: "Absolutely. When a brand asks for 'usage rights' or 'whitelisting', they want to use your face and content as a paid ad. You should charge an additional 15-30% of the base rate per month they intend to run the ad."
  },
  {
    question: "How much should I charge for exclusivity?",
    answer: "If a brand requires that you do not work with their competitors for 3 months, you are losing out on potential revenue. Charge a 15-25% premium on the base rate for every month of exclusivity requested."
  },
  {
    question: "Do smaller creators have higher engagement rates?",
    answer: "Yes, micro-influencers (10k - 50k followers) typically boast engagement rates of 4-8%, whereas macro-influencers (1M+ followers) often see engagement drop to 1-2%. Brands will pay a premium for a smaller, highly engaged audience that converts."
  }
]

export default function SponsorshipPricingPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sponsorship Rate Calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Price Your Brand Deals and Sponsorships",
    "description": "A step-by-step guide to calculating fair sponsorship rates using our creator rate calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Determine Your Baseline CPM",
        "text": "Start by establishing a base Cost Per Mille (CPM) for your specific platform. YouTube and Newsletters typically command $20-$30 CPMs, while TikTok and Instagram Reels hover around $5-$10."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate Average Reach",
        "text": "Do not use your total follower count. Use the average views, impressions, or opens you receive over a 30-day period."
      },
      {
        "@type": "HowToStep",
        "name": "Factor in Deliverable Effort",
        "text": "A 60-second integrated mid-roll read should cost significantly less than a fully dedicated 10-minute video."
      },
      {
        "@type": "HowToStep",
        "name": "Add Licensing and Rights Premiums",
        "text": "Always add 15-30% for usage rights (if they plan to run your content as ads) and exclusivity (if you cannot work with competitors)."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://dailyfinance.tools/creator/sponsorship-pricing-calculator",
        "url": "https://dailyfinance.tools/creator/sponsorship-pricing-calculator",
        "name": "Sponsorship Rate Calculator | Creator Pricing Tool",
        "description": "Calculate how much to charge for brand deals and sponsorships based on audience size, engagement, and platform."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://dailyfinance.tools/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Creator Economy",
            "item": "https://dailyfinance.tools/creator"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Sponsorship Rate Calculator",
            "item": "https://dailyfinance.tools/creator/sponsorship-pricing-calculator"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="schema-software-application"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <Script
        id="schema-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="schema-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <ToolLayout
        title="Sponsorship Calculator"
        description="Calculate exactly what to charge for brand deals and sponsorships. Our sponsorship valuation calculator factors in platform CPMs, engagement rates, usage rights, and exclusivity to generate data-driven pricing for YouTube, Instagram, TikTok, and Newsletters."
        slug="sponsorship-pricing-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Answer: How Do You Calculate Sponsorship Value?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To use a <strong>sponsorship price calculator</strong> accurately, start with a <strong>baseline CPM of $15 to $25</strong> (Cost Per 1,000 Views). If you average 50,000 views on YouTube or Instagram, your base rate is $1,000. However, a true <strong>sponsorship valuation calculator</strong> must then add premiums: <strong>+20% for high engagement</strong>, <strong>+20% for exclusivity</strong>, and <strong>+30% if the brand wants usage rights</strong> to run the post as an ad. Never base your pricing solely on follower count.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Factors That Determine Your Sponsorship Valuation
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Whether you are pricing a dedicated YouTube video or using an <strong>instagram sponsorship calculator</strong>, treating your brand deals like a data-driven business is critical. Brands and agencies run their own internal <strong>sponsorship valuation calculator</strong> tools to estimate your worth before they even email you. If you reply with a number that lacks justification, you risk leaving thousands of dollars on the table or getting ghosted entirely.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            A reliable <strong>sponsorship price calculator</strong> relies on multiple dynamic inputs—not just a static follower count. To maximize your earning potential, you must understand the core metrics that advertisers use to evaluate your channel and convert your metrics into a realistic quote.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Reach vs. Followers</h3>
              <p className="text-sm text-neutral-500 font-light">Advertisers pay for guaranteed eyeballs, not inflated follower counts. Always base your pricing on your 30-day average views or impressions, a core metric in any accurate <strong>sponsorship value calculator</strong>.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <BarChart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Engagement Multipliers</h3>
              <p className="text-sm text-neutral-500 font-light">A 5% engagement rate on Instagram signals a highly active community. Brands pay premium rates (often a 20%+ markup) for creators who can actually drive clicks and conversions.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Niche & Industry CPMs</h3>
              <p className="text-sm text-neutral-500 font-light">Not all views are equal. A finance or tech integration commands a much higher baseline CPM than general lifestyle content, drastically altering your final sponsorship valuation.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How the Sponsorship Rate Formula Works
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Our creator rate calculator uses a progressive formula. It starts by establishing a baseline floor using CPM (Cost Per Mille), and then stacks multipliers based on the specific constraints and requests of the brand deal.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: The Baseline CPM</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Different platforms yield different levels of attention. A viewer watching a 20-minute YouTube video is highly engaged. A viewer swiping through TikTok is barely paying attention. Therefore, the baseline CPM varies drastically by platform:
          </p>

          <ul className="space-y-4 mb-12">
            <li className="flex items-center gap-4 bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
              <div className="font-bold text-primary w-24">$20 - $30</div>
              <div className="text-neutral-600"><strong>YouTube & Newsletters:</strong> High intent, long-form attention, high conversion rates.</div>
            </li>
            <li className="flex items-center gap-4 bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
              <div className="font-bold text-primary w-24">$10 - $15</div>
              <div className="text-neutral-600"><strong>Instagram (In-Feed/Stories):</strong> Moderate intent, visually driven, good click-through on stories.</div>
            </li>
            <li className="flex items-center gap-4 bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
              <div className="font-bold text-primary w-24">$5 - $10</div>
              <div className="text-neutral-600"><strong>TikTok & Shorts:</strong> High volume, extremely low intent, poor conversion rates.</div>
            </li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Niche and Deliverable Multipliers</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Once you have your base rate `(Average Reach / 1,000 * CPM)`, you multiply it by your niche factor. If you talk about personal finance, your audience has disposable income, meaning advertisers will pay a 1.5x premium. If you make gaming montages, advertisers pay a 0.8x discount due to the younger demographic.
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            You must also price based on effort. An <strong>Integrated Mid-Roll</strong> (a 60-second read in the middle of a video) is the standard 1.0x rate. A <strong>Dedicated Video</strong> (where the entire 10 minutes is about the brand's software) should be multiplied by 2.0x to 3.0x.
          </p>

          {/* AdSense Placeholder */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Hidden Goldmines: Usage Rights and Exclusivity
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The most common mistake creators make is giving away their likeness for free. If a brand asks for a video, they are paying for access to <em>your</em> audience on <em>your</em> organic feed.
          </p>

          <div className="bg-[#FAFAFA] border-l-4 border-primary p-6 mb-8 rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-2">What are Usage Rights (Whitelisting)?</h4>
            <p className="text-lg text-neutral-600 m-0 leading-relaxed font-light">
              Usage rights allow the brand to take your video file, put it on their own Facebook Ads manager, and spend $50,000 pushing it to strangers. You are no longer just an influencer; you are a commercial actor and a production studio. <strong>You must charge 15-30% of your base rate per month they intend to run the ad.</strong>
            </p>
          </div>

          <div className="bg-[#FAFAFA] border-l-4 border-primary p-6 mb-16 rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-2">What is Exclusivity?</h4>
            <p className="text-lg text-neutral-600 m-0 leading-relaxed font-light">
              If Sony pays you for a video, they might include a clause stating you cannot talk about Microsoft or Nintendo for 3 months. By signing this, you are locking yourself out of potential revenue from those competitors. <strong>You must charge a 15-25% premium per month of exclusivity to cover your opportunity cost.</strong>
            </p>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Negotiation Tactics: How to Present Your Rate Card
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Never send a brand a single number. If you say "My rate is $3,000," the answer is either Yes or No. Instead, provide a tiered rate card using the <strong>Anchor Pricing</strong> strategy.
          </p>

          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <FileText className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Tier 1: The Basic (The Decoy)</strong>
                <span className="text-neutral-600 font-light leading-relaxed">A 30-second shoutout at the end of the video. No usage rights. Price: $1,500. (The brand will likely reject this because it offers low value).</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <Target className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Tier 2: The Standard (What you actually want to sell)</strong>
                <span className="text-neutral-600 font-light leading-relaxed">A 60-second mid-roll integration, top link in description. Price: $3,000. (This looks like a great deal compared to the other tiers).</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <Briefcase className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Tier 3: The Premium (The Anchor)</strong>
                <span className="text-neutral-600 font-light leading-relaxed">A dedicated video, 3 months exclusivity, 3 months usage rights, and a dedicated newsletter blast. Price: $8,500. (This makes the $3,000 tier look cheap and accessible).</span>
              </div>
            </li>
          </ul>

        </>
      )}
      </ToolLayout>
    </>
  )
}
