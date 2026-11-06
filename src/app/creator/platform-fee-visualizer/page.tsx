import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { AlertTriangle, Calculator, TrendingUp } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Platform Fee Calculator: Compare What You Keep on YouTube, Patreon, Substack & More",
  description: "Compare creator platform fees side by side. Enter gross revenue and see what you actually keep on YouTube, Patreon, Substack, Twitch, Gumroad, Etsy and your own Stripe checkout.",
  keywords: ["platform fee calculator", "creator platform fees compared", "patreon vs substack fees", "youtube revenue share", "twitch sub split", "how much do platforms take"],
  slug: "creator/platform-fee-visualizer",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
{"question": "Which creator platform has the lowest fees?", "answer": "For selling your own products, your own website with Stripe is lowest at about 2.9 percent plus $0.30 per transaction. Among hosted platforms, flat-fee models like Gumroad at 10 percent can beat percentage-plus-processing stacks on small transactions, while the ranking reverses at larger ticket sizes."},
{"question": "Why does YouTube keep 45 percent but Patreon only 8 percent?", "answer": "Because they sell different things. YouTube supplies the advertisers, the audience and the revenue itself, and shares it 55/45 in the creator's favour for long-form. Patreon supplies membership infrastructure for an audience you bring, so its platform fee is much smaller, with processing charged on top."},
{"question": "Do platform fees include payment processing?", "answer": "Sometimes. Gumroad's 10 percent is presented as a flat platform fee per sale, while Patreon and Substack charge processing separately through their payment partners. Always model platform fee, processing percentage and fixed per-transaction fees together, as this calculator does."},
{"question": "How do app-store fees affect creator earnings?", "answer": "When a fan subscribes or buys inside an iOS or Android app, the app store may take a commission of up to 30 percent, which some platforms pass through in whole or part. This can dwarf the platform's own fee, which is why many creators steer subscribers to web checkout where platform rules allow it."},
{"question": "Should I move platforms purely to save fees?", "answer": "Only when the monthly saving is large relative to the risk. Add up the annual dollar saving, then weigh it against lost discovery, migration friction and subscriber drop-off during the move. Fee savings on an audience you own, such as an email list, are usually safe to capture; savings that require abandoning a discovery engine usually are not."}
]

export default function Page() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Compare Creator Platform Fees",
    "description": "Compare creator platform fees side by side. Enter gross revenue and see what you actually keep on YouTube, Patreon, Substack, Twitch, Gumroad, Etsy and your own Stripe checkout.",
    "step": [
{"@type": "HowToStep", "name": "Enter a realistic monthly gross", "text": "Use the gross you actually expect on the platform you are evaluating, ideally from a recent month or a conservative projection, not your best ever month."},
{"@type": "HowToStep", "name": "Set the transaction count that produces it", "text": "Count pledges, subscriptions, orders or sales, whichever the platform bills per event. This single input is what makes fixed fees visible."},
{"@type": "HowToStep", "name": "Read the ranking, then question it", "text": "The sorted bars show net today. Then ask what each fee buys: discovery, fulfilment, audience trust, or nothing but processing."},
{"@type": "HowToStep", "name": "Re-run at your next scale", "text": "Model the same comparison at three and ten times the gross. Platforms that win at $500 a month often lose at $20,000, and migration gets harder as you grow."}
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
        "@id": "https://dailyfinance.tools/creator/platform-fee-visualizer",
        "url": "https://dailyfinance.tools/creator/platform-fee-visualizer",
        "name": "Platform Fee Calculator: Compare What You Keep on YouTube, Patreon, Substack & More",
        "description": "Compare creator platform fees side by side. Enter gross revenue and see what you actually keep on YouTube, Patreon, Substack, Twitch, Gumroad, Etsy and your own Stripe checkout."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" },
          { "@type": "ListItem", "position": 2, "name": "Creator Economy", "item": "https://dailyfinance.tools/creator" },
          { "@type": "ListItem", "position": 3, "name": "Platform Fee Calculator", "item": "https://dailyfinance.tools/creator/platform-fee-visualizer" }
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
        title="Platform Fee Calculator"
        description="Compare creator platform fees side by side. Enter gross revenue and see what you actually keep on YouTube, Patreon, Substack, Twitch, Gumroad, Etsy and your own Stripe checkout."
        slug="platform-fee-visualizer"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: Which Creator Platform Takes the Biggest Cut?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">It depends on the model: YouTube keeps 45 percent of long-form ad revenue, Twitch keeps about 50 percent of a standard Partner subscription, Patreon keeps 5 to 12 percent plus processing, Substack keeps 10 percent plus Stripe fees, and Gumroad keeps a flat 10 percent. Transaction count changes every ranking.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Headline Percentages Lie. Your Transaction Size Tells the Truth.</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Every platform advertises a simple number, and every simple number is incomplete. Ten percent sounds bigger than 8 percent, until the 8 percent platform adds 2.9 percent plus $0.30 per transaction and the 10 percent platform bundles its processing differently. A $0.30 fixed charge is a rounding error on a $100 sale and a catastrophe on a $3 pledge. That is why this visualiser asks for two inputs, gross revenue and transaction count, and why rankings genuinely flip as you move the second one.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">It also matters what the fee buys. YouTube's 45 percent purchases the largest video discovery engine on earth, an ads marketplace and global payment handling. A marketplace fee on Etsy buys search traffic with buying intent. Your own Stripe checkout keeps the highest share of every sale, 97.1 percent minus $0.30, but buys you nothing else: no audience, no discovery, no trust infrastructure, and the support and chargeback burden lands on you. Comparing platforms on fee alone is like comparing rent without asking what city the shop is in.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use this tool as a decision filter, not a verdict. Find the two or three platforms where your content and audience actually fit, model your real gross and typical transaction size on each, and then ask what the fee difference is worth in dollars per month. If moving saves $40 a month but costs you your main discovery channel, it is a bad trade. If it saves $900 a month on an audience you already own through email, it is an excellent one. The bars below make that trade-off visible in seconds.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Fixed Fees Punish Small Tickets</h3>
              <p className="text-sm text-neutral-500 font-light">Any fee with a per-transaction component grows as your average sale shrinks. Memberships and micro-products must be modelled at their real transaction size, never at a flattering average order value.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Revenue Share Is Not a Tax</h3>
              <p className="text-sm text-neutral-500 font-light">Ad platforms like YouTube and Twitch take large shares because they supply the revenue itself. Membership and storefront platforms take smaller shares because you supply the customer. Compare within model types first.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Your Own Checkout Is the Benchmark</h3>
              <p className="text-sm text-neutral-500 font-light">Stripe at 2.9 percent plus $0.30 is the floor every platform must justify against. The gap between a platform's net and the Stripe net is the price you pay for its audience, tools and trust. Make it earn that gap.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">How Each Platform Fee Is Modelled Here</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Net Revenue Comparison</h3>
            <div className="font-mono text-lg md:text-2xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Net per Platform = Gross - (Platform % x Gross) - (Processing % x Gross) - (Fixed Fee x Transactions)</div>
          </div>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The models are deliberately transparent. YouTube long-form is a straight 45 percent revenue share with no per-transaction element. Patreon Pro is 8 percent platform plus 2.9 percent and $0.30 per pledge. Substack is 10 percent plus the same Stripe structure per paid subscription. Twitch is modelled at the standard 50 percent Partner subscription split, noting that some partners hold legacy or promotional 70/30 terms. Gumroad is a flat 10 percent. Etsy combines its transaction, payment and listing components approximately, and Stripe stands alone as the direct benchmark.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Two cautions keep this honest. First, fee schedules change, and several platforms layer extras the headline model excludes: currency conversion around 2.5 percent, chargeback fees, promoted listing costs, or app-store commissions when fans subscribe inside mobile apps, which can add a very large extra cut on iOS purchases. Second, gross is not portable. The same creator rarely generates identical gross on every platform, because each audience behaves differently. Model the fee on the gross you realistically expect there, not on a single number copied across every row.</p>

          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">How to Use This Calculator, Step by Step</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Enter a realistic monthly gross</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Use the gross you actually expect on the platform you are evaluating, ideally from a recent month or a conservative projection, not your best ever month.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Set the transaction count that produces it</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Count pledges, subscriptions, orders or sales, whichever the platform bills per event. This single input is what makes fixed fees visible.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Read the ranking, then question it</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">The sorted bars show net today. Then ask what each fee buys: discovery, fulfilment, audience trust, or nothing but processing.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 4: Re-run at your next scale</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Model the same comparison at three and ten times the gross. Platforms that win at $500 a month often lose at $20,000, and migration gets harder as you grow.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Worked Examples With Real Numbers</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: $5,000 Gross From 250 Transactions of $20</h3>
            <p className="text-neutral-600 font-light leading-relaxed">At $5,000 gross across 250 transactions, your own Stripe checkout keeps about $4,780 after 2.9 percent plus $0.30 per charge. Gumroad keeps $4,500 after its flat 10 percent. Substack keeps roughly $4,280 after 10 percent plus Stripe. Patreon Pro keeps roughly $4,180 after 8 percent plus processing on 250 pledges. YouTube long-form, on the same gross, keeps $2,750, and a standard Twitch split keeps $2,500, but remember those two supplied the revenue through ads and subscriptions on their platforms rather than charging you for selling your own product. The ranking is about models, not morality.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: The Same $5,000 From 2,500 Transactions of $2</h3>
            <p className="text-neutral-600 font-light leading-relaxed">Now shrink the ticket. $5,000 arrives as 2,500 micro-transactions of $2, typical of tiny tiers and cheap digital products. Stripe's fixed fees alone are now $750 plus 2.9 percent, cutting the net to about $4,105. Substack and Patreon, which stack a platform percentage on top of the same per-transaction structure, fall to roughly $3,600 to $3,800 depending on plan and micro-transaction rates. Gumroad's flat 10 percent, with no fixed per-sale sting in this model, keeps $4,500 and jumps up the ranking. Nothing about the platforms changed. Only the transaction size did, and it rewrote the answer.</p>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Platform Comparison Mistakes Almost Every Creator Makes</h2>
          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Comparing headline percentages only</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Ten percent flat can be cheaper than 8 percent plus processing at small ticket sizes, and more expensive at large ones. Never choose a platform from a percentage you read in a headline.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Forgetting app-store commissions</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Subscriptions bought inside mobile apps can carry an additional app-store cut of up to 30 percent on some platforms and plans. Directing fans to web checkout, where allowed, is one of the largest fee savings available.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Treating gross as portable</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Your audience will not spend identically everywhere. A platform with a higher fee but built-in discovery can produce more net dollars than a cheap platform where nobody finds you.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Ignoring what the fee replaces</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Marketplace and membership platforms bundle hosting, payments, tax handling in some cases, support tooling and trust. Price those honestly before counting a migration as pure saving.</span>
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Bottom Line</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">There is no universally cheapest platform, only the cheapest platform for your revenue model, ticket size and stage. Run this comparison with your real numbers twice a year and whenever a platform changes its fees, because they do, and the right answer at $1,000 a month is often the wrong answer at $20,000. Keep the Stripe benchmark in view: every point above it must be bought back in audience, conversion or saved work.</p>
          <p className="text-lg text-neutral-600 mb-16 leading-relaxed font-light flex items-start gap-3"><TrendingUp className="h-6 w-6 text-[#064E3B] shrink-0 mt-1" />Once you know where you keep the most, optimise the inputs on that platform: your Patreon tier floor, your Substack conversion, or your YouTube RPM. The dedicated calculators for each platform on this site take the winning row from this comparison and turn it into a growth plan.</p>
        </>
      )}
      </ToolLayout>
    </>
  )
}
