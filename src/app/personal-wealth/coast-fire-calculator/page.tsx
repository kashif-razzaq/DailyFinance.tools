import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Coast FIRE Calculator: Find Your Coast Number & Coast Age',
  description: 'Use our free Coast FIRE calculator to find the exact amount you need invested today so compounding carries you to full retirement — with no further contributions.',
  keywords: ['coast fire calculator', 'coast fi number', 'when can i stop saving for retirement', 'fire calculator'],
  slug: "personal-wealth/coast-fire-calculator",
  category: "Personal Wealth",
});

const faqs: FAQ[] = [
  {
    "answer": "Your Coast FIRE number is the amount you need invested at your current age so that, with no further contributions, compound growth alone carries it to your full FIRE number by your retirement date. It is calculated by dividing your FIRE number by (1 + expected return) raised to the years until retirement.",
    "question": "What is a Coast FIRE number?"
  },
  {
    "answer": "Regular FIRE means having twenty-five times your annual spending invested, enough to stop working entirely. Coast FIRE is reached much earlier: you have enough invested that growth will get you to full FIRE by retirement age without more contributions, but you still work to cover your current living costs until then.",
    "question": "What is the difference between Coast FIRE and regular FIRE?"
  },
  {
    "answer": "Most people use 6 to 8 percent nominal for a diversified stock-heavy portfolio, or 4 to 5 percent if they want the calculation in inflation-adjusted (real) terms against today's spending. Using an optimistic return shrinks your coast number on paper but increases the risk of falling short in reality.",
    "question": "What return should I assume in a Coast FIRE calculator?"
  },
  {
    "answer": "This calculator does not subtract future pension or Social Security income, which makes it conservative. If you expect meaningful guaranteed income in retirement, you can lower your annual spending target by that amount, which lowers both your FIRE number and your coast number.",
    "question": "Does Coast FIRE include pensions or Social Security?"
  },
  {
    "answer": "Yes. A market fall, higher retirement spending, or retiring earlier than planned can push you back below your coast number. That is why you should recalculate annually and keep a buffer above the line rather than treating the exact number as a finish line.",
    "question": "Can I lose my Coast FIRE status?"
  }
]

export default function Page() {
  const softwareApplicationSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": 'Coast FIRE Calculator', "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const webPageSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": "https://dailyfinance.tools/personal-wealth/coast-fire-calculator", "url": "https://dailyfinance.tools/personal-wealth/coast-fire-calculator", "name": 'Coast FIRE Calculator: Find Your Coast Number & Coast Age', "description": 'Use our free Coast FIRE calculator to find the exact amount you need invested today so compounding carries you to full retirement — with no further contributions.' }, { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" }, { "@type": "ListItem", "position": 2, "name": "Personal Wealth", "item": "https://dailyfinance.tools/personal-wealth" }, { "@type": "ListItem", "position": 3, "name": 'Coast FIRE Calculator', "item": "https://dailyfinance.tools/personal-wealth/coast-fire-calculator" }] }] };
  return (
    <>
      <Script id="schema-software-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ToolLayout title='Coast FIRE Calculator' description='Use our free Coast FIRE calculator to find the exact amount you need invested today so compounding carries you to full retirement — with no further contributions.' slug="coast-fire-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" />Quick Answer: How Coast FIRE Works</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Coast FIRE is the amount you need invested today so that, with no further contributions, compounding alone grows it to your full FIRE number by retirement. Divide your FIRE number (annual spending times twenty-five) by one plus your expected return, raised to the years remaining.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Coast FIRE: The Moment Your Retirement Funds Itself</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Most retirement advice treats saving as a treadmill you can never step off: contribute every month, for forty years, or fail. Coast FIRE breaks that idea. It asks a far more useful question — at what point has your portfolio become large enough that compound growth, entirely on its own, will finish the job by your retirement date? That amount is your Coast FIRE number, and the day your investments cross it, every further contribution becomes a choice rather than a necessity.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The psychology matters as much as the mathematics. People who know their coast number make calmer career decisions: they can downshift to part-time work, take a lower-paid but more enjoyable job, start a business, or take a sabbatical, because the largest financial engine of their retirement is already running. People who do not know it often keep sprinting at full intensity for years after they could safely have eased off — or, worse, assume they are on track when their portfolio is actually far too small to coast anywhere.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">This calculator works in both directions. Enter what you have already invested and it shows your coast number, the gap you still need to close, and — using your current monthly contribution — roughly when you will cross the line. Because the coast number falls rapidly as your time horizon lengthens, the tool also makes the single most important variable in the whole equation impossible to miss: time. Every year earlier you reach your coast number, the number itself gets dramatically smaller.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Time Does the Heavy Lifting</h3>
              <p className="text-sm text-neutral-500 font-light">At a 7 percent return, money doubles roughly every ten years. A 30-year-old needs only about one dollar invested for every ten dollars a 55-year-old needs to reach the same retirement portfolio.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Freedom Before Retirement</h3>
              <p className="text-sm text-neutral-500 font-light">Coast FIRE is not retirement. It is the point where work becomes optional in its current form — you still cover living costs, but you no longer need to save for retirement from your income.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Your FIRE Number Is the Anchor</h3>
              <p className="text-sm text-neutral-500 font-light">Everything starts from annual spending times twenty-five. Spend less in retirement and both your FIRE number and your coast number fall together — spending is the most powerful lever you control.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The Coast FIRE formula is a present-value calculation. Your full FIRE number is a future target; the coast number is simply what that target is worth in today's invested dollars, discounted by the growth you can expect between now and retirement. The longer the runway and the higher the return, the smaller the amount you need today — which is why the calculator reacts so strongly to your age.</p>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Coast FIRE Equation</h3>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Coast Number = FIRE Number / (1 + r)^n  ·  where FIRE Number = Annual Retirement Spending x 25, r = expected annual return, n = years until retirement</div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Set Your FIRE Number</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Start with the annual spending you want in retirement — not your current salary. Multiply it by twenty-five, the inverse of the 4 percent withdrawal guideline. Spending fifty thousand dollars a year in retirement means a FIRE number of one and a quarter million dollars. Be honest here: an inflated lifestyle assumption inflates every number that follows.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Discount It Back to Today</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Divide the FIRE number by your expected growth over the years remaining. At 7 percent over thirty-five years, money grows about 10.7 times, so a one-and-a-quarter-million target needs only about one hundred and seventeen thousand dollars invested today. That is your coast number — the entire insight of Coast FIRE in one division.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Close the Gap, Then Coast</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Compare the coast number with what you have invested now. The difference is the last saving sprint you actually need to make. Once you cross it, your required retirement saving drops to zero and your income only needs to cover your current living costs — which is exactly the freedom the strategy is designed to buy.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: A 30-Year-Old With $50,000 Invested</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">Maya is thirty, has fifty thousand dollars invested, and wants to spend fifty thousand a year in retirement from age sixty-five. Her FIRE number is $1,250,000 and, at a 7 percent return over thirty-five years, her coast number is about $117,000. She is not there yet — but the gap is only about $67,000. Saving five hundred dollars a month, she crosses her coast number in roughly eight years, before she turns forty. From that birthday onward, her retirement is mathematically funded even if she never invests another dollar.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: A 45-Year-Old Starting Later</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">Daniel is forty-five, has $180,000 invested, and targets forty thousand a year of retirement spending from sixty-five. His FIRE number is $1,000,000, but with only twenty years of compounding at 7 percent (a growth factor of about 3.9), his coast number is about $258,000. He still needs roughly $78,000 more invested before he can coast — a clear, finite target instead of a vague feeling of being behind, and a powerful argument for a focused five-year push now rather than decades of anxiety.</p>
          </div>
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes to Avoid</h2>
          <ul className="space-y-6 mb-16">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Using a Return You Cannot Count On</strong><span className="text-neutral-600 font-light leading-relaxed">Assuming 10 or 11 percent because a stock index once delivered it makes your coast number look deceptively small. Most planners model 6 to 8 percent nominal for a diversified portfolio, and some subtract inflation to work in real terms. Pick a return you can defend, then test one percent lower.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Forgetting Inflation in the Spending Target</strong><span className="text-neutral-600 font-light leading-relaxed">Your FIRE number is built from spending in today's money, while the growth rate you enter is usually nominal. Mixing the two without thought quietly overstates your position. A common fix is to use a real (after-inflation) return of around 4 to 5 percent against today's spending — more conservative and more honest.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Counting Money That Is Not Invested</strong><span className="text-neutral-600 font-light leading-relaxed">Cash in a current account, home equity, and a car do not compound at market returns and do not belong in the invested total. Only assets actually invested for retirement count toward the coast number. Including your house is the fastest way to believe you are coasting when you are not.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Treating Coast FIRE as Permission to Stop Earning</strong><span className="text-neutral-600 font-light leading-relaxed">Coasting removes the need to save for retirement; it does not remove the need to eat for the next thirty years. You still need income covering current expenses until retirement age. People who quit entirely at their coast number and then raid the portfolio destroy the compounding the whole plan depends on.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Never Recalculating</strong><span className="text-neutral-600 font-light leading-relaxed">Your coast number moves with markets, spending, and your retirement date. A crash at the wrong moment or a spending increase can put you back below the line. Recalculate once a year — it takes two minutes and turns a one-off insight into a reliable compass.</span></div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">What to Do Once You Reach Your Coast Number</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Reaching your coast number is a genuine financial milestone, and it deserves a deliberate decision rather than a shrug. The most common move is downshifting: reducing hours, changing to less stressful work, or negotiating a four-day week, because your income now only needs to cover current spending. Others redirect the freed-up monthly contribution toward nearer goals — paying off a mortgage, building a business, funding travel while they are young enough to enjoy it most, or helping children — knowing retirement is already handled.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Two cautions belong with the celebration. First, protect the coasting portfolio: it must stay invested and untouched, because the entire strategy is a bet on uninterrupted compounding. Second, remember the gap years problem — if you retire or downshift well before pension and state benefits begin, your spending in those bridge years needs its own plan. Coast FIRE funds your retirement from your chosen date; it does not automatically fund an earlier exit. Model both dates before you make the leap, and revisit the numbers annually as markets and life change.</p>
          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-base text-[#1F2937] font-medium m-0 leading-relaxed"><strong>Important note:</strong> All figures on this page are estimates based on the returns and assumptions you enter, not financial advice. Investment returns vary and are never guaranteed, and the 25-times-spending guideline is a planning heuristic based on historical US data. Check current tax and pension rules for your country and consider regulated advice for major life decisions.</p>
          </div>
        </>
      )}
      </ToolLayout>
    </>
  )
}
