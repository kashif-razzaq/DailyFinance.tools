import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { AlertTriangle, Calculator, TrendingUp } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Affiliate Link ROI Calculator: EPC, Revenue & Profit per Click",
  description: "Calculate affiliate earnings properly: clicks times conversion times commission gives revenue and EPC. Add your traffic costs to see true profit and ROI, and compare programs on the only metric that matters.",
  keywords: ["affiliate roi calculator", "affiliate earnings calculator", "epc calculator", "earnings per click calculator", "affiliate marketing calculator", "affiliate commission calculator"],
  slug: "creator/affiliate-link-roi-calculator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
{"question": "What is EPC in affiliate marketing?", "answer": "EPC means earnings per click: total commission revenue divided by total affiliate link clicks. It combines commission size and conversion rate into one number, making it the standard way to compare programs, networks and individual pieces of content on equal terms."},
{"question": "What is a good EPC for a creator?", "answer": "It varies by niche and traffic warmth, but $0.50 to $2.00 per click is a healthy range for warm review and tutorial traffic, with high-intent software and finance content sometimes exceeding it. Cold social traffic often falls under $0.20. Judge your EPC against your own alternatives, not an absolute standard."},
{"question": "How do I calculate affiliate conversion rate correctly?", "answer": "Divide orders by link clicks in your affiliate dashboard for the same period. Do not use the merchant's landing-page conversion rate, which excludes clicks that never converted into page engagement and overstates what your traffic actually produces."},
{"question": "Should a higher commission program always be promoted?", "answer": "No. Revenue per click decides. A $120 commission converting at 0.5 percent earns $0.60 per click, while a $30 commission converting at 4 percent earns $1.20. On identical traffic the lower commission produces double the income, which is why EPC outranks headline payouts."},
{"question": "How do refunds affect affiliate ROI?", "answer": "Networks typically report orders immediately but settle after refund and cancellation windows, clawing back commissions on returned or cancelled sales. For accurate ROI, compute EPC and profit from settled reports over a full settlement cycle, especially in high-refund categories like fashion and travel."}
]

export default function Page() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Affiliate Earnings and EPC",
    "description": "Calculate affiliate earnings properly: clicks times conversion times commission gives revenue and EPC. Add your traffic costs to see true profit and ROI, and compare programs on the only metric that matters.",
    "step": [
{"@type": "HowToStep", "name": "Enter clicks for a defined period", "text": "Pull link clicks from your affiliate dashboard for one program and one period, ideally 30 days. Mixing programs or periods produces an EPC that describes nothing."},
{"@type": "HowToStep", "name": "Enter the real conversion rate and commission", "text": "Use orders divided by clicks from the same report, and the average commission actually paid per order, including tier effects, not the advertised maximum rate."},
{"@type": "HowToStep", "name": "Add what the traffic cost", "text": "Enter ad spend, content costs or a fair value for your production time. Enter zero only if you truly want the organic-only view, and know that is what you are looking at."},
{"@type": "HowToStep", "name": "Read EPC first, then profit and ROI", "text": "EPC ranks the program against your alternatives. Profit and ROI tell you whether the effort or spend behind those clicks was worth repeating at larger scale."}
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
        "@id": "https://dailyfinance.tools/creator/affiliate-link-roi-calculator",
        "url": "https://dailyfinance.tools/creator/affiliate-link-roi-calculator",
        "name": "Affiliate Link ROI Calculator: EPC, Revenue & Profit per Click",
        "description": "Calculate affiliate earnings properly: clicks times conversion times commission gives revenue and EPC. Add your traffic costs to see true profit and ROI, and compare programs on the only metric that matters."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" },
          { "@type": "ListItem", "position": 2, "name": "Creator Economy", "item": "https://dailyfinance.tools/creator" },
          { "@type": "ListItem", "position": 3, "name": "Affiliate Earnings Calculator", "item": "https://dailyfinance.tools/creator/affiliate-link-roi-calculator" }
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
        title="Affiliate Earnings Calculator"
        description="Calculate affiliate earnings properly: clicks times conversion times commission gives revenue and EPC. Add your traffic costs to see true profit and ROI, and compare programs on the only metric that matters."
        slug="affiliate-link-roi-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: What Is a Good EPC in Affiliate Marketing?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">EPC, earnings per click, equals total commission revenue divided by total affiliate link clicks. A healthy EPC for warm review traffic is often $0.50 to $2.00 or more. EPC, not the headline commission rate, is the only fair way to compare two affiliate programs or two pieces of content.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Commission Rate Is Marketing. EPC Is Accounting.</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Every affiliate program advertises the number that flatters it: a 40 percent commission, a $120 payout, a cookie window measured in months. None of those numbers tells you what a click on your link is worth, because none of them includes the probability that a click becomes a sale. That probability is where affiliate fortunes actually live. A $30 commission converting at 4 percent earns $1.20 per click. A $120 commission converting at 0.4 percent earns $0.48. The smaller program pays two and a half times more for the same audience, and creators who choose on headline rates never find out.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">EPC collapses the whole funnel into one comparable figure: revenue divided by clicks. With EPC you can compare programs, platforms, videos and articles on equal terms, price your traffic if you buy it, and spot the quiet killers, a program whose conversion decayed, a merchant whose checkout got worse, a video sending curious but unqualified clicks. This calculator computes EPC, revenue, sales and, once you add what the traffic cost you, true profit and ROI. That last step matters more than it sounds: organic creators call everything profit, then wonder why scaling paid traffic loses money. The funnel did not change. The accounting did.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use EPC as your promotion filter. Set a floor, for many creators somewhere around $0.30 to $0.50 per click for scalable promotion, and anything under it must justify itself strategically or be replaced. Above the floor, the question flips: how do I send this link more qualified clicks? That is a content strategy question, comparison videos, tutorials, deal coverage, and it is answerable precisely because the unit economics are known. A link with a proven $1.50 EPC is an asset. Treat it like one: update the content, protect the ranking, and negotiate a better rate with the EPC data in hand.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Compare EPC, Never Commission Alone</h3>
              <p className="text-sm text-neutral-500 font-light">Commission times conversion is the program. A high payout with a weak checkout loses to a modest payout on a product your audience already wants. Your dashboard's click-to-order rate settles every argument.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Qualified Clicks Convert, Curious Clicks Cost</h3>
              <p className="text-sm text-neutral-500 font-light">A tutorial viewer searching for the product converts at multiples of a casual scroller. The same link can show a $2 EPC in a review video and $0.10 in a viral short. Measure EPC per content piece, not just per program.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Costs Turn Revenue Into ROI</h3>
              <p className="text-sm text-neutral-500 font-light">Ads, production time, tools and sponsorship fees spent to generate clicks are real. ROI equals profit divided by cost, and it is the number that decides whether a funnel can scale or only survives while the traffic is free.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Affiliate ROI and EPC Formula</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Affiliate Earnings Equation</h3>
            <div className="font-mono text-lg md:text-2xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Sales = Clicks x Conversion %  ·  Revenue = Sales x Commission  ·  EPC = Revenue / Clicks  ·  ROI = (Revenue - Cost) / Cost</div>
          </div>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The chain starts with clicks, the only traffic unit every network measures the same way. Conversion rate must be clicks-to-orders from your affiliate dashboard, not the merchant's landing page conversion, which flatters by excluding everyone who never reached the page. Multiply out to sales and revenue, divide revenue back by clicks for EPC, then subtract everything the traffic cost to produce profit and ROI. Each step is simple; skipping any one of them is how creators misjudge programs by multiples.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">One refinement protects you from a common reporting trap: attribution windows and returns. Networks report gross orders first; refunds, cancelled subscriptions and clawbacks settle later, sometimes 30 to 60 days out. If a program shows a suspiciously wonderful EPC in week one, wait for the settlement report before scaling it. Similarly, recurring-commission programs, common in software, have an EPC that grows as cohorts age. Model month-one EPC for cash decisions, but judge software programs on their 6-month EPC before abandoning them.</p>

          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">How to Use This Calculator, Step by Step</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Enter clicks for a defined period</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Pull link clicks from your affiliate dashboard for one program and one period, ideally 30 days. Mixing programs or periods produces an EPC that describes nothing.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Enter the real conversion rate and commission</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Use orders divided by clicks from the same report, and the average commission actually paid per order, including tier effects, not the advertised maximum rate.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Add what the traffic cost</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Enter ad spend, content costs or a fair value for your production time. Enter zero only if you truly want the organic-only view, and know that is what you are looking at.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 4: Read EPC first, then profit and ROI</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">EPC ranks the program against your alternatives. Profit and ROI tell you whether the effort or spend behind those clicks was worth repeating at larger scale.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Worked Examples With Real Numbers</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: A Review Channel Sending 12,000 Clicks at 3 Percent</h3>
            <p className="text-neutral-600 font-light leading-relaxed">A tech review channel sends 12,000 affiliate clicks in a month to a tool that pays a $45 average commission and converts clicks to orders at 3 percent. Sales are 360 and commission revenue is $16,200, giving an EPC of $1.35. The content cost $800 to produce across the videos involved, so profit is $15,400 and ROI on that cost is over 1,900 percent. More usefully, the $1.35 EPC prices the channel's traffic: any sponsor, program or paid campaign must beat $1.35 per click to deserve those viewers more than this link does.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: The $120 Commission That Loses to a $30 Commission</h3>
            <p className="text-neutral-600 font-light leading-relaxed">A creator must choose one program to feature. Program A pays $120 per sale, the exciting headline, and converts at 0.5 percent, producing $0.60 of EPC. Program B pays $30 and converts at 4 percent, producing $1.20 of EPC. On 10,000 clicks, A earns $6,000 and B earns $12,000. The audience, the content and the effort are identical; only the choice differs, and it is worth $6,000 a month. This is not a rare edge case. High-ticket offers routinely convert weakly in creator traffic, which is why EPC, computed in this calculator in seconds, is the industry's standard comparison.</p>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Affiliate Mistakes That EPC Would Have Caught</h2>
          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Choosing programs by commission rate or payout size</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Payout without conversion is a lottery ticket. Two minutes with your click and order data replaces every program review you will ever read, because EPC is measured on your audience, not someone else's.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Blending all content into one EPC</strong>
                <span className="text-neutral-600 font-light leading-relaxed">A program-level average hides the truth that one tutorial earns $2 per click while ten casual mentions earn pennies. Track EPC per video or article and promote the winners, fix or drop the rest.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Calling gross commission profit</strong>
                <span className="text-neutral-600 font-light leading-relaxed">If clicks came from ads, sponsored placements or expensive production, those costs belong in the model. ROI on free traffic is infinite and meaningless; ROI on your real costs decides what scales.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Ignoring refunds and clawbacks</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Networks settle later. Fashion, travel and subscription offers can claw back a meaningful share of early-reported commissions. Judge programs on settled revenue over a full cycle, not the exciting first-week dashboard.</span>
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Bottom Line</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Affiliate income becomes a business the moment you can state, for each link, what a click is worth. Compute EPC per program and per content piece, retire what falls under your floor, and negotiate or scale what clears it. The calculator takes a minute; the habit of using it is worth more than any single program you will ever join.</p>
          <p className="text-lg text-neutral-600 mb-16 leading-relaxed font-light flex items-start gap-3"><TrendingUp className="h-6 w-6 text-[#064E3B] shrink-0 mt-1" />EPC also prices your audience for every other negotiation. A channel that can prove $1.35 of affiliate earnings per click walks into sponsorship talks with a floor no brand can argue below, and into platform decisions knowing exactly what its traffic must earn elsewhere to justify a move.</p>
        </>
      )}
      </ToolLayout>
    </>
  )
}
