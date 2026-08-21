import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Video, TrendingUp, DollarSign, Eye, AlertTriangle, Target, Zap, Banknote } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "YouTube Money Calculator | Views to Money & Earnings Estimate",
  description: "Free YouTube Money Calculator. Instantly convert your views to money, estimate your channel earnings, and calculate your YouTube income using exact RPM metrics.",
  keywords: ["youtube money calculator", "youtube views to money calculator", "youtube earnings calculator", "youtube income calculator", "youtube revenue calculator", "estimated earnings youtube", "money from youtube calculator", "youtube cash calculator"],
  slug: "creator/youtube-adsense-estimator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
  {
    question: "How do I calculate my YouTube earnings?",
    answer: "To use a YouTube earnings calculator effectively, you need your RPM (Revenue Per Mille, or per 1,000 views). Divide your total monthly views by 1,000, and multiply that number by your average RPM. For example, 100,000 views at a $4.50 RPM equals $450 in estimated YouTube revenue."
  },
  {
    question: "What is the difference between CPM and RPM?",
    answer: "CPM (Cost Per Mille) is what advertisers pay YouTube for every 1,000 ad impressions. RPM (Revenue Per Mille) is the actual income you earn per 1,000 views after YouTube takes its 45% cut. Always use RPM when using a YouTube income calculator."
  },
  {
    question: "How do views convert to money on YouTube Shorts?",
    answer: "A YouTube views to money calculator handles Shorts differently because Shorts RPM is much lower. Ads are placed between videos in the Shorts Feed, and revenue is pooled. Typical Shorts RPM ranges from $0.04 to $0.15 per 1,000 views."
  },
  {
    question: "How does audience retention affect my YouTube income?",
    answer: "High audience retention allows you to place more mid-roll ads on videos over 8 minutes long. If viewers drop off before the mid-roll ads trigger, your effective RPM drops, lowering your overall estimated earnings on YouTube."
  },
  {
    question: "What niches have the highest YouTube RPM?",
    answer: "Finance, investing, software engineering, and business typically have the highest RPMs (often $15 to $30+). Advertisers in these industries sell high-ticket products. Gaming and vlog channels typically have lower RPMs ($1 to $4)."
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
    "name": "How to Convert YouTube Views to Money",
    "description": "A step-by-step guide to estimating your expected monthly and annual YouTube revenue using our YouTube income calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Long-Form Views",
        "text": "Input the total number of views your long-form videos generate in a typical month."
      },
      {
        "@type": "HowToStep",
        "name": "Determine Your RPM",
        "text": "Find your average RPM in YouTube Studio. This is the exact metric needed to calculate your estimated earnings on YouTube."
      },
      {
        "@type": "HowToStep",
        "name": "Factor in Shorts Views",
        "text": "If you post Shorts, enter your monthly Shorts views and the estimated Shorts RPM (usually $0.05 - $0.20) into the cash calculator."
      },
      {
        "@type": "HowToStep",
        "name": "Review Projected Income",
        "text": "The YouTube money calculator will instantly output your daily, monthly, and annual estimated revenue."
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
      <ToolLayout
        title="YouTube Money Calculator"
        description="Convert YouTube views to money instantly. Estimate your channel's exact daily, monthly, and yearly AdSense earnings using our YouTube Income Calculator."
        slug="youtube-adsense-estimator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Banknote className="h-5 w-5 text-red-600" />
              Quick Answer: How Much Money is 1 Million YouTube Views?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Using a standard <strong>YouTube views to money calculator</strong>, 1 million views on a long-form video generates an average of <strong>$1,500 to $5,000</strong>. However, the exact income depends entirely on your niche's RPM. A gaming channel might earn $2,000 for 1 million views, while a personal finance channel could earn over $20,000 for the exact same viewership. 1 million views on YouTube Shorts generates significantly less, usually between $50 and $150.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Use the YouTube Earnings Calculator
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you want to treat YouTube as a legitimate business, you need an accurate <strong>YouTube income calculator</strong> to forecast your cash flow. The biggest mistake new creators make is trying to calculate their YouTube revenue using CPM rather than RPM, which leads to wildly inaccurate financial projections.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">CPM (Advertiser Cost)</h3>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">This represents how much an advertiser pays YouTube to show 1,000 ads on your channel. You do not receive this full amount. Never use CPM to estimate YouTube earnings.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">RPM (Creator Income)</h3>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">RPM (Revenue Per Mille) is your actual take-home pay per 1,000 views after YouTube takes its 45% cut. Our YouTube money calculator uses RPM to ensure 100% accuracy.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Three Levers of Estimated Earnings on YouTube
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Your total revenue is not just a straightforward calculation of Views × RPM. To maximize the output of your YouTube cash calculator, you must optimize these three levers:
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">1. Niche Selection (The Income Ceiling)</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Your niche determines your baseline RPM. Advertisers bid on keywords based on their expected return on investment. Companies selling $5,000 SaaS software will bid significantly more than companies selling $20 video games. Because YouTube shares 55% of the ad revenue with you, higher advertiser bids mean higher pay for you. 
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">2. Audience Retention</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            YouTube allows creators to place mid-roll ads on videos that are 8 minutes or longer. However, placing a mid-roll ad at the 5-minute mark does nothing if the average viewer clicks off at 3 minutes. High audience retention ensures that viewers actually reach the mid-roll ads, effectively doubling your estimated earnings on YouTube per video.
          </p>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-12 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">
              <strong>Pro Tip:</strong> Pushing a video from 7:59 to 8:01 allows for mid-roll ads, but adding filler will destroy retention. Focus on tight editing to keep viewers engaged past the mid-roll markers.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">3. The YouTube Shorts Revenue Calculator</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            With the introduction of YouTube Shorts revenue sharing, creators must now calculate two entirely separate income streams. Shorts generate massive viewership volume but suffer from incredibly low RPMs. Our comprehensive YouTube revenue calculator handles both long-form and Shorts inputs simultaneously.
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
            While it is exciting to watch the numbers in the YouTube money estimator grow, relying on AdSense as a sole source of income is incredibly risky. Ad rates fluctuate violently based on the time of year (Q4 yields the highest pay, January the lowest).
          </p>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            Smart creators use AdSense as baseline cash flow while building more stable, lucrative revenue streams:
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <Zap className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Brand Sponsorships:</strong> Dedicated integrations can pay 10x your monthly estimated earnings on YouTube.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <TrendingUp className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Digital Products:</strong> Selling courses or templates yields 100% margin.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <Target className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Affiliate Marketing:</strong> Earning a commission on tools and software you recommend.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <Eye className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Memberships:</strong> Patreon or YouTube Memberships provide recurring, predictable income.</span>
            </li>
          </ul>

        </>
      )}
      </ToolLayout>
    </>
  )
}
