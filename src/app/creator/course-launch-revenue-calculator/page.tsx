import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Users, MailOpen, MousePointerClick, ShoppingCart, Activity, Target, Zap, BarChart } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Course Launch Revenue Calculator | Email Funnel Simulator",
  description: "Calculate projected revenue for your online course launch. Simulate email open rates, click-through rates, and sales conversions to optimize your earnings.",
  keywords: ["course launch revenue calculator", "email funnel calculator", "online course revenue estimator", "earnings per subscriber calculator", "creator economy course sales"],
  slug: "creator/course-launch-revenue-calculator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
  {
    question: "What is Earnings Per Subscriber (EPS)?",
    answer: "Earnings Per Subscriber (EPS) is a critical metric that divides your total net launch revenue by the total number of people on your email list. A healthy EPS for an online course launch is typically between $1.00 and $3.00. Knowing this number helps you determine exactly how much you can spend to acquire a new email lead."
  },
  {
    question: "What is a good email open rate for a course launch?",
    answer: "A healthy open rate during a launch sequence is between 25% and 35%. If your open rate drops below 20%, you either have deliverability issues (going to spam) or your subject lines are not compelling enough to capture attention."
  },
  {
    question: "What is a good sales page conversion rate?",
    answer: "Of the people who click the link in your email and land on your sales page, a standard conversion rate is 1% to 3%. If your sales page converts higher than 5%, you have exceptional copy and a highly targeted offer."
  },
  {
    question: "Why do I need to factor in refunds?",
    answer: "Almost every legitimate online course offers a 14-day or 30-day money-back guarantee. It is standard industry practice to anticipate a 5% to 10% refund rate. If you spend your entire gross revenue immediately, you will not have cash on hand to process inevitable refunds."
  },
  {
    question: "How do I increase my Click-Through Rate (CTR)?",
    answer: "To increase your CTR, ensure your emails have a single, clear Call To Action (CTA). Avoid cluttering the email with multiple links to different platforms. Keep the email focused entirely on driving the reader to click the link to your sales page."
  }
]

export default function CourseLaunchPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Course Launch Revenue Calculator",
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
    "name": "How to Calculate Online Course Revenue",
    "description": "A step-by-step guide to modeling your email funnel to project course sales.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input Your List Size",
        "text": "Start by entering the total number of subscribers on your email list."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Open and Click Rates",
        "text": "Input your average email open rate (typically 30%) and click-through rate (typically 2-5%)."
      },
      {
        "@type": "HowToStep",
        "name": "Set Course Price and Conversion",
        "text": "Enter your course price and estimate how many people who click the link will actually purchase (typically 1-3%)."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate Net Revenue",
        "text": "Review your projected gross sales, subtract the estimated refund rate, and analyze your final net launch revenue."
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
        "@id": "https://dailyfinance.tools/creator/course-launch-revenue-calculator",
        "url": "https://dailyfinance.tools/creator/course-launch-revenue-calculator",
        "name": "Course Launch Revenue Calculator | Email Funnel Simulator",
        "description": "Calculate projected revenue for your online course launch. Simulate email open rates, click-through rates, and sales conversions."
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
            "name": "Course Launch Revenue Calculator",
            "item": "https://dailyfinance.tools/creator/course-launch-revenue-calculator"
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
        title="Course Launch Revenue Calculator"
        description="Stop guessing how much money your online course will make. Use our email funnel simulator to calculate projected gross sales, net revenue, and Earnings Per Subscriber (EPS) based on real-world conversion rates."
        slug="course-launch-revenue-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
              Quick Answer: How Much Money Can a Course Launch Make?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              A standard online course launch generates an <strong>Earnings Per Subscriber (EPS) of $1.00 to $3.00</strong>. If you have an email list of 5,000 subscribers, you can expect to generate between $5,000 and $15,000 in gross revenue. This math is based on a standard funnel: a 30% open rate, a 5% click-through rate, and a 2% sales page conversion rate.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Mathematics of an Email Funnel
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Launching a digital product or online course is heavily romanticized on social media. Creators see screenshots of $100,000 Stripe dashboards and assume it requires magic, luck, or an impossibly massive audience. In reality, a successful launch is nothing more than basic high school mathematics applied to an email funnel.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            By breaking your launch down into micro-conversions (Opens, Clicks, and Sales), you remove the emotion and anxiety from the process. If your launch underperforms, you don't need to panic; you simply look at the metrics to diagnose the leak in your funnel.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <MailOpen className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Open Rate</h3>
              <p className="text-sm text-neutral-500 font-light">The percentage of people who actually open your email. Driven entirely by deliverability (staying out of spam) and compelling subject lines.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <MousePointerClick className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Click Rate</h3>
              <p className="text-sm text-neutral-500 font-light">Of the people who opened, how many clicked the link? Driven by the persuasiveness of your email body copy and clear Calls to Action (CTAs).</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Sales Rate</h3>
              <p className="text-sm text-neutral-500 font-light">Of the people who landed on the sales page, how many bought the course? Driven by the offer, the price, and the sales page copy.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Diagnose a Failing Funnel
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you run a launch and make $0, it is incredibly discouraging. But by looking at the specific metrics in our course launch revenue calculator, you can instantly identify what went wrong and fix it for the next launch.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Scenario A: Low Open Rates (&lt; 15%)</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If your open rate is abysmal, nobody even saw your pitch. Your product might be amazing, but the marketing failed at step one. <strong>The Fix:</strong> Clean your email list (remove inactive subscribers to improve domain reputation) and spend 80% of your time writing curiosity-driven subject lines.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Scenario B: High Opens, Low Clicks (&lt; 1%)</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            People are opening your emails, but they aren't clicking the link to your sales page. <strong>The Fix:</strong> Your email copy is likely too long, too boring, or lacks a clear Call to Action. Ensure there is a large, highly visible button or link near the top and bottom of the email.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Scenario C: High Clicks, Zero Sales</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            This is the most painful scenario. You drove 1,000 people to your sales page, but nobody bought. This means your marketing worked perfectly, but the offer itself failed. <strong>The Fix:</strong> Your course is either priced too high for your audience, the sales page copy is confusing, or the product simply doesn't solve a painful enough problem.
          </p>

          {/* AdSense Placeholder */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Magic Metric: Earnings Per Subscriber (EPS)
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you want to scale your digital product business using paid advertising, you must intimately understand your <strong>Earnings Per Subscriber (EPS)</strong>.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-xl">
            <p className="text-lg text-[#1F2937] m-0 leading-relaxed font-medium">
              If your course launch generates $10,000 from an email list of 5,000 people, your EPS is $2.00.
            </p>
          </div>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            Why does this matter? Because if you know that every email subscriber is worth $2.00 to your business, you can safely spend up to $1.99 on Facebook or Instagram Ads to acquire a new email lead, knowing that you will remain profitable. If you do not know your EPS, running paid ads is essentially gambling.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
