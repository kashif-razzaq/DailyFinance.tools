import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Smartphone, DollarSign, TrendingUp, AlertTriangle, Eye, Video, Sparkles, Clock } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "TikTok Money Calculator | Estimate Creator Fund Earnings",
  description: "Calculate your estimated TikTok earnings with our free TikTok Money Calculator. Factor in qualified views, RPM, and the new Creator Rewards Program requirements.",
  keywords: ["tiktok money calculator", "tiktok creator fund calculator", "tiktok earnings calculator", "how much does tiktok pay", "tiktok rpm calculator", "creator rewards program calculator", "estimate tiktok income"],
  slug: "creator/tiktok-creator-fund-calculator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
  {
    question: "How much does TikTok pay per 1,000 views?",
    answer: "Under the new Creator Rewards Program (which replaced the old Creator Fund), TikTok pays between $0.20 to $1.50+ per 1,000 qualified views (RPM). However, the old, now-defunct Creator Fund only paid $0.02 to $0.04 per 1,000 views."
  },
  {
    question: "What is a 'Qualified View' on TikTok?",
    answer: "A qualified view is a legitimate view from a unique user who watches the video for more than 5 seconds without swiping away. If a user swipes past your video immediately, it counts as a view on your profile but does not count toward your monetization earnings."
  },
  {
    question: "What are the requirements for the TikTok Creator Rewards Program?",
    answer: "To be eligible for the Creator Rewards Program, you must be 18 years or older, have at least 10,000 authentic followers, have at least 100,000 authentic video views in the last 30 days, and crucially, you must post original videos that are longer than 1 minute."
  },
  {
    question: "Why am I making no money on my short TikToks?",
    answer: "TikTok intentionally phased out monetization for videos under 1 minute long. The platform wants to compete with YouTube by incentivizing long-form, high-retention content. If you only post 15-second dancing or lip-sync videos, you will earn $0 from the Creator Rewards program."
  },
  {
    question: "How can I increase my TikTok RPM?",
    answer: "RPM is heavily influenced by the viewer's location (U.S. audiences pay more than global audiences), the viewer's age (older demographics appeal to higher-paying advertisers), and the video's search value (videos optimized for TikTok search engines often command a higher RPM than purely feed-based entertainment)."
  }
]

export default function TikTokFundPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TikTok Money Calculator",
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
    "name": "How to Calculate Your TikTok Creator Rewards",
    "description": "A step-by-step guide to estimating your monthly TikTok income based on the new Creator Rewards Program.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Determine Your Video Length",
        "text": "First, ensure your videos are longer than 1 minute. If they are shorter, they are not eligible for the Creator Rewards program."
      },
      {
        "@type": "HowToStep",
        "name": "Input Total Views",
        "text": "Enter the total number of views your account generates in a standard 30-day period."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Qualified View Percentage",
        "text": "Only views lasting longer than 5 seconds count. Estimate your qualified view percentage (typically 30% to 60%)."
      },
      {
        "@type": "HowToStep",
        "name": "Input Your RPM",
        "text": "Check your Creator Dashboard for your exact RPM, or estimate using the industry average of $0.50 to $1.00."
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
        "@id": "https://dailyfinance.tools/creator/tiktok-creator-fund-calculator",
        "url": "https://dailyfinance.tools/creator/tiktok-creator-fund-calculator",
        "name": "TikTok Money Calculator | Estimate Creator Fund Earnings",
        "description": "Calculate your estimated TikTok earnings with our free TikTok Money Calculator. Factor in qualified views, RPM, and the new Creator Rewards Program requirements."
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
            "name": "TikTok Money Calculator",
            "item": "https://dailyfinance.tools/creator/tiktok-creator-fund-calculator"
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
        title="TikTok Money Calculator"
        description="Estimate your monthly earnings with the TikTok Creator Rewards Program. Understand how qualified views and RPM impact your actual take-home pay."
        slug="tiktok-creator-fund-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#000000]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-[#000000]" />
              Quick Answer: How Much Do TikTokers Make?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Under the new Creator Rewards Program, eligible TikTokers make an average of <strong>$0.50 to $1.00 per 1,000 qualified views</strong> (RPM). To qualify for this higher pay, the video <strong>must be longer than one minute</strong>. If a video is less than 60 seconds long, it will earn $0 in ad revenue. Furthermore, only "qualified views" (views lasting longer than 5 seconds from the For You Page) count toward your payout.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Death of the Original Creator Fund
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you are researching how much TikTok pays, you must ensure you are looking at up-to-date information. In 2020, TikTok launched the original "Creator Fund," which paid notoriously low rates—often ranging from $0.02 to $0.04 per 1,000 views. A creator could go viral, generate 10 million views, and receive a payout of $200.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Due to massive backlash from top creators, TikTok phased out the original fund and replaced it with the <strong>Creator Rewards Program</strong> (initially tested as the Creativity Program Beta). This new program completely changed the financial landscape of the app by drastically increasing the RPM (Revenue Per Mille)—but it came with a massive catch that fundamentally changed how creators make content.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Clock className="h-5 w-5 text-[#000000]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The 1-Minute Rule</h3>
              <p className="text-sm text-neutral-500 font-light">Only videos longer than 60 seconds are eligible for monetization. 15-second trending dances no longer generate ad revenue.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Eye className="h-5 w-5 text-[#000000]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Qualified Views</h3>
              <p className="text-sm text-neutral-500 font-light">A view only pays out if the user watches for more than 5 seconds and finds the video on the "For You" page.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-5 w-5 text-[#000000]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Search Value</h3>
              <p className="text-sm text-neutral-500 font-light">TikTok now rewards videos that provide "high search value" (tutorials, reviews, educational content) with significantly higher RPMs.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Calculate Your TikTok Income
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Because of the strict rules surrounding the new Creator Rewards Program, calculating your income is slightly more complex than just multiplying your total views by a dollar amount. Our TikTok money calculator does the heavy lifting, but here is the exact math behind the scenes.
          </p>

          <div className="bg-[#000000] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2fe]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The TikTok Earnings Formula</h3>
            <div className="font-mono text-lg md:text-xl bg-white/10 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">
              Earnings = [ ( Total Views × Qualified View % ) / 1000 ] × RPM
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Understanding Qualified Views</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you post a 2-minute video that gets 1,000,000 views on your profile, you will not get paid for 1,000,000 views. TikTok aggressively filters views to ensure advertisers are paying for genuine human attention.
          </p>
          <ul className="space-y-4 mb-12">
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-neutral-200">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light">Views under 5 seconds are discarded.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-neutral-200">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light">Views from the "Following" feed or your profile page do not count. They must originate from the FYP (For You Page).</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-neutral-200">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light">Multiple views from the same user only count once.</span>
            </li>
          </ul>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            For most creators, the <strong>Qualified View Rate</strong> hovers between 30% and 60%. Therefore, your 1,000,000 total views might only result in 450,000 <em>qualified</em> views.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">What Dictates Your RPM?</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Your RPM (Revenue Per Mille) is the amount you are paid for every 1,000 qualified views. TikTok's algorithm determines your RPM based on four main pillars:
          </p>
          <ol className="list-decimal pl-6 space-y-4 text-lg text-neutral-600 font-light mb-16">
            <li><strong>Originality & Quality:</strong> The video must be native to TikTok. Re-uploading movie clips, podcasts, or heavily watermarked content will result in disqualification or a $0.01 RPM.</li>
            <li><strong>Audience Demographics:</strong> Advertisers pay more to reach users in the United States, UK, and Australia with high purchasing power. If your videos go viral in lower-GDP regions, your RPM will crash.</li>
            <li><strong>Search Value:</strong> TikTok is positioning itself as a search engine. Videos that answer questions, provide tutorials, or review products are given a premium RPM modifier compared to simple entertainment.</li>
            <li><strong>Retention:</strong> If viewers watch the entire 1-minute video, you are rewarded heavily. If they drop off right at the 6-second mark, your RPM suffers.</li>
          </ol>

          {/* AdSense Placeholder */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Is the TikTok Creator Rewards Program Worth It?
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The pivot to 1-minute content was highly controversial, but mathematically, it has been a massive win for dedicated creators. Earning $1.00 per 1,000 views on a platform where going viral is relatively easy compared to YouTube has resulted in life-changing payouts for storytellers, educators, and commentators.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            However, it is crucial to remember that TikTok ad revenue is notoriously volatile. A single community guideline strike can temporarily suspend your access to the rewards program, and algorithmic shifts can halve your viewership overnight. Therefore, smart creators use their TikTok ad revenue as seed money to fund more stable monetization paths:
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>TikTok Shop:</strong> Selling products directly in-feed via affiliate commissions.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <DollarSign className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Brand Deals:</strong> Charging a flat rate for dedicated sponsorships (Use our Sponsorship Pricing Calculator).</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <Video className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Funneling to YouTube:</strong> Using short-form hooks to drive traffic to high-RPM YouTube long-form content.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
              <Smartphone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Digital Products:</strong> Driving Link-in-Bio traffic to courses, templates, or consulting.</span>
            </li>
          </ul>

        </>
      )}
      </ToolLayout>
    </>
  )
}
