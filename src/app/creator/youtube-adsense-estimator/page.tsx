import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Video, TrendingUp, DollarSign, Eye, AlertTriangle, Target, Zap } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "YouTube Money Calculator: Estimate Your Channel Earnings & Revenue",
  description: "Use our free YouTube Money Calculator to estimate your channel's potential AdSense revenue. Factor in CPM, RPM, and Shorts views to calculate daily and monthly earnings.",
  keywords: ["youtube money calculator", "youtube earnings calculator", "youtube revenue calculator", "youtube monetization calculator", "estimate youtube earnings", "youtube rpm calculator", "how much do youtubers make"],
  slug: "creator/youtube-adsense-estimator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
  {
    question: "How do you calculate YouTube AdSense revenue?",
    answer: "YouTube revenue is calculated using RPM (Revenue Per Mille, or per 1,000 views). You divide your total monthly views by 1,000, and then multiply that number by your channel's average RPM. For example, 100,000 views at a $4.50 RPM equals $450 in estimated revenue."
  },
  {
    question: "What is the difference between CPM and RPM?",
    answer: "CPM (Cost Per Mille) is what advertisers pay YouTube for every 1,000 ad impressions. RPM (Revenue Per Mille) is the actual amount you, the creator, earn per 1,000 views after YouTube takes its 45% cut. Always use RPM to calculate your personal earnings."
  },
  {
    question: "Why is YouTube Shorts RPM so low?",
    answer: "Shorts RPM is significantly lower than long-form RPM because ads are not shown directly on the video. Instead, ads are placed between videos in the Shorts Feed, and revenue is pooled and distributed based on viewership share. Typical Shorts RPM ranges from $0.04 to $0.15."
  },
  {
    question: "How does audience retention affect YouTube earnings?",
    answer: "High audience retention allows you to place more mid-roll ads on videos over 8 minutes long. If viewers drop off before the mid-roll ads trigger, your effective RPM drops. Higher retention directly correlates to more monetized playbacks per view."
  },
  {
    question: "What niches have the highest YouTube RPM?",
    answer: "Finance, investing, software engineering, and business typically have the highest RPMs (often $15 to $30+). This is because advertisers in these industries sell high-ticket products and are willing to pay a premium for leads. Gaming and vlog channels typically have lower RPMs ($1 to $4)."
  }
]

export default function YouTubeAdSensePage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YouTube Money Calculator",
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
    "name": "How to Calculate Your YouTube Earnings",
    "description": "A step-by-step guide to estimating your expected monthly and annual YouTube revenue using our YouTube money calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Long-Form Views",
        "text": "Input the total number of views your long-form videos generate in a typical month."
      },
      {
        "@type": "HowToStep",
        "name": "Determine Your RPM",
        "text": "Find your average RPM in YouTube Studio. This is what you earn per 1,000 views after YouTube's cut."
      },
      {
        "@type": "HowToStep",
        "name": "Factor in Shorts Views",
        "text": "If you post Shorts, enter your monthly Shorts views and the estimated Shorts RPM (usually $0.05 - $0.20)."
      },
      {
        "@type": "HowToStep",
        "name": "Review Projected Revenue",
        "text": "Analyze your estimated monthly and annual revenue to set realistic content production goals."
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
        "@id": "https://dailyfinance.tools/creator/youtube-adsense-estimator",
        "url": "https://dailyfinance.tools/creator/youtube-adsense-estimator",
        "name": "YouTube Money Calculator: Estimate Your Channel Earnings & Revenue",
        "description": "Use our free YouTube Money Calculator to estimate your channel's potential AdSense revenue. Factor in CPM, RPM, and Shorts views."
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
            "name": "YouTube Money Calculator",
            "item": "https://dailyfinance.tools/creator/youtube-adsense-estimator"
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
        title="YouTube Money Calculator"
        description="Calculate your potential YouTube earnings by factoring in your niche RPM, monthly views, and YouTube Shorts. Instantly estimate your daily, monthly, and yearly AdSense revenue."
        slug="youtube-adsense-estimator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Quick Answer: How Much Does YouTube Pay per 1,000 Views?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              YouTube pays creators an average of <strong>$1.50 to $5.00 per 1,000 views</strong> (RPM) for long-form content. However, this varies drastically by niche. A gaming channel might earn $2.00 per 1,000 views, while a personal finance channel could earn $20.00+. For YouTube Shorts, the payout is significantly lower, averaging <strong>$0.05 to $0.15 per 1,000 views</strong>.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Demystifying YouTube Revenue: CPM vs RPM
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you want to treat YouTube as a legitimate business, you need to understand the underlying mathematics of the platform. The biggest mistake new creators make is confusing CPM with RPM, leading to wildly inaccurate revenue projections that can skew financial planning.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">CPM (Cost Per Mille)</h3>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">This is an advertiser-centric metric. It represents how much an advertiser pays YouTube to show 1,000 ads on your channel. You do not receive this full amount. It is purely a metric of advertiser demand for your audience.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">RPM (Revenue Per Mille)</h3>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">This is the creator-centric metric. RPM is your actual take-home pay per 1,000 views after YouTube takes its standard 45% revenue cut. When calculating your monthly income, RPM is the only metric that matters.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Three Levers of YouTube Monetization
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Your total AdSense revenue is not just a straightforward calculation of Views × RPM. It is influenced by three major levers that you, as the creator, can actively optimize.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">1. Niche Selection (The RPM Ceiling)</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Your niche determines your baseline RPM. Advertisers bid on keywords based on the expected return on investment (ROI). Companies selling $5,000 SaaS software or credit cards will bid significantly more than companies selling $20 video games or $15 t-shirts. Because YouTube shares 55% of the ad revenue with you, higher advertiser bids mean higher pay for you. This is why a finance channel with 50,000 views can often out-earn a gaming channel with 500,000 views.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">2. Audience Retention (Mid-Roll Optimization)</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            YouTube allows creators to place mid-roll ads on videos that are 8 minutes or longer. However, placing a mid-roll ad at the 5-minute mark does nothing if the average viewer clicks off at 3 minutes. High audience retention ensures that viewers actually reach the mid-roll ads, effectively doubling or tripling your RPM on a per-video basis.
          </p>

          <div className="bg-primary/5 border-l-4 border-primary p-6 mb-12 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">
              <strong>Pro Tip:</strong> Pushing a video from 7:59 to 8:01 allows for mid-roll ads, but simply adding filler will destroy retention. Focus on tight editing and narrative pacing to keep viewers engaged past the mid-roll markers.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">3. The Shorts vs. Long-Form Divide</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            With the introduction of YouTube Shorts revenue sharing, creators must now calculate two entirely separate income streams. Shorts generate massive viewership volume but suffer from incredibly low RPMs (often $0.05 to $0.15). Long-form videos generate less volume but yield high RPMs ($3 to $20+). A sustainable channel strategy usually leverages Shorts for top-of-funnel audience growth and long-form videos for deep monetization.
          </p>

          {/* AdSense Placeholder */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Why AdSense Should Not Be Your Only Income
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            While it is exciting to watch AdSense revenue grow, relying on it as a sole source of income is incredibly risky. Ad rates fluctuate violently based on the time of year (Q4 yields the highest pay, January the lowest) and broader macroeconomic conditions. Furthermore, algorithm changes can instantly slash your viewership.
          </p>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            Smart creators use AdSense as baseline cash flow while building more stable, lucrative revenue streams:
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Brand Sponsorships:</strong> Dedicated integrations can pay 10x your monthly AdSense.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Digital Products:</strong> Selling courses or templates yields 100% margin.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Affiliate Marketing:</strong> Earning a commission on tools and software you recommend.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <Eye className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Memberships:</strong> Patreon or YouTube Memberships provide recurring, predictable MRR.</span>
            </li>
          </ul>

        </>
      )}
      </ToolLayout>
    </>
  )
}
