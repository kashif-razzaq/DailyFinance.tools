import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Net Worth Calculator: Assets Minus Liabilities, Broken Down',
  description: 'Calculate your net worth from all your assets and liabilities, see a breakdown of where it lives, your debt-to-asset ratio and your liquid net worth. Free tracker.',
  keywords: ['net worth calculator', 'how to calculate net worth', 'net worth tracker', 'liquid net worth calculator'],
  slug: "personal-wealth/net-worth-tracker",
  category: "Personal Wealth",
});

const faqs: FAQ[] = [
  {
    "answer": "Add up everything you own at realistic current values \u2014 home, vehicles, bank balances, investments, valuables \u2014 and subtract everything you owe: mortgage, loans, card balances and any other debts. The remainder is your net worth. Use resale values for possessions, not what you paid for them.",
    "question": "How do I calculate my net worth?"
  },
  {
    "answer": "Broad US survey data puts median net worth roughly in the tens of thousands for under-thirty-fives, rising to the low-to-mid hundreds of thousands by the late fifties \u2014 but medians blend very different lives. Your trend matters more than any benchmark: a net worth rising steadily year after year is a healthy one at almost any level.",
    "question": "What is a good net worth for my age?"
  },
  {
    "answer": "Net worth is the total picture including your home and vehicles. Liquid net worth counts only assets you could turn into cash quickly \u2014 bank and investment accounts \u2014 minus your debts. Both matter: total net worth tracks lifetime progress; liquid net worth tells you how resilient you are to a shock this year.",
    "question": "What is the difference between net worth and liquid net worth?"
  },
  {
    "answer": "At its realistic resale value (what a dealer or quick sale would fetch), not its purchase price, and with the full remaining loan counted as a liability. Cars are the asset most people flatter themselves on; honest, slightly pessimistic values keep the whole calculation trustworthy.",
    "question": "Should I include my car in net worth at its purchase price?"
  },
  {
    "answer": "Once or twice a year is ideal for most households, plus after major events like buying a home or clearing a large debt. More often invites obsession with market noise; less often lets drift go unnoticed. Use the same categories and the same valuation rules each time so the trend is comparable.",
    "question": "How often should I recalculate my net worth?"
  }
]

export default function Page() {
  const softwareApplicationSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": 'Net Worth Calculator', "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const webPageSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": "https://dailyfinance.tools/personal-wealth/net-worth-tracker", "url": "https://dailyfinance.tools/personal-wealth/net-worth-tracker", "name": 'Net Worth Calculator: Assets Minus Liabilities, Broken Down', "description": 'Calculate your net worth from all your assets and liabilities, see a breakdown of where it lives, your debt-to-asset ratio and your liquid net worth. Free tracker.' }, { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" }, { "@type": "ListItem", "position": 2, "name": "Personal Wealth", "item": "https://dailyfinance.tools/personal-wealth" }, { "@type": "ListItem", "position": 3, "name": 'Net Worth Calculator', "item": "https://dailyfinance.tools/personal-wealth/net-worth-tracker" }] }] };
  return (
    <>
      <Script id="schema-software-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ToolLayout title='Net Worth Calculator' description='Calculate your net worth from all your assets and liabilities, see a breakdown of where it lives, your debt-to-asset ratio and your liquid net worth. Free tracker.' slug="net-worth-tracker" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" />Quick Answer: How Net Worth Is Calculated</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Net worth is everything you own minus everything you owe. Add your assets at realistic current values — home, cash, investments, vehicles — then subtract every debt at today's balance. This calculator also shows your debt-to-asset ratio and the liquid portion you could actually reach in an emergency.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Net Worth: The Only Score That Cannot Be Faked</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Ask most people how their finances are doing and they will answer with their income — a number that, on its own, says almost nothing. Surgeons die in debt; janitors retire as millionaires. The figure that actually summarises a financial life is net worth: everything you own, minus everything you owe. It is the bottom line of your personal balance sheet, the one number that rises when you make genuinely good decisions and refuses to rise when you merely look successful.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">This calculator builds that number properly. It separates assets into the home, cash, investments, vehicles and other possessions, each at a realistic current value, and liabilities into mortgage, vehicle, student, card and other debts at today's balances. Alongside the headline it shows the two views professionals check next: your debt-to-asset ratio, and your liquid net worth — cash and investments minus non-mortgage debts — which is the part of your wealth that could actually rescue you in a crisis.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">One calculation is a snapshot; the habit is the strategy. Record your net worth on the same date each year, with the same categories and the same honest valuation rules, and the series of numbers becomes the most motivating document in your financial life. It absorbs every other goal on this site — the emergency fund raises it, the debt payoff raises it faster, the investing compounds it — into a single trend you can watch bend upward, year after year.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">One Number to Rule Your Plan</h3>
              <p className="text-sm text-neutral-500 font-light">Every financial goal — debt payoff, saving, investing, retirement — either raises your net worth or is noise. Tracking it quarterly turns a dozen scattered balances into one honest trend line you can actually manage.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Home Equity Is Real but Illiquid</h3>
              <p className="text-sm text-neutral-500 font-light">Your home's equity usually dominates the picture and cannot pay a bill. That is why this calculator also separates liquid net worth: the cash and investments you could actually reach, minus your non-mortgage debts.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Debts Count at Full Value</h3>
              <p className="text-sm text-neutral-500 font-light">A liability is what you owe today, not what you will pay with interest. Enter today's balances for every debt — mortgage, cards, loans — and let the trend, not creative accounting, tell the story.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">There is no trick to the net worth equation, which is its virtue: it is the one summary that cannot be flattered by a high income, a new car or a large gross salary. Everything you own at a realistic current value goes on one side; everything you owe today goes on the other; the difference is the score. The two derived figures matter almost as much — the debt-to-asset ratio shows how leveraged the picture is, and liquid net worth strips out the house and cars to show what you could actually reach in a bad month.</p>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Net Worth Equation</h3>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Net Worth = Total Assets - Total Liabilities  ·  Liquid Net Worth = (Bank + Investments) - Non-Mortgage Debts  ·  Debt-to-Asset Ratio = Liabilities / Assets</div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: List Assets at Today's Values</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Work through what you own: your home at a realistic sale price, vehicles at resale value, every bank and savings balance, investments and retirement accounts at today's value, and any other possessions only if they could genuinely be sold for a meaningful sum. Most households overstate this side, so adopt a rule: if a value would embarrass you in front of a sceptical buyer, trim it.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: List Every Liability at Today's Balance</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Mortgage, vehicle finance, student loans, every card, personal loans, tax owed, money owed to family — if you owe it, it counts, at the balance outstanding today rather than the total you will eventually pay with interest. Completeness matters more on this side than precision: a missed five-thousand-dollar debt distorts the picture more than any rounding elsewhere.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Subtract — Then Read the Breakdown</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">The subtraction is the headline, but the insight is in the composition. How much of your worth is home equity you cannot spend? How much is liquid? How large are the expensive debts relative to the investments supposedly outgrowing them? Each imbalance in the table suggests its own next move, which is why the calculator charts the components rather than showing a single lonely number.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: A Homeowner in Their Thirties</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">Using this page's starting figures: a $350,000 home, $25,000 in the bank, $90,000 invested, $28,000 of vehicles and $5,000 of other assets make $498,000 of assets. Against them sit a $265,000 mortgage, a $14,000 car loan, $18,000 of student loans and $4,500 of card balances — $301,500 of liabilities. Net worth: $196,500. Look closer and the breakdown warns as much as it reassures: only about $110,500 of that is liquid once non-mortgage debts are netted off, and home equity is $85,000 of the total — real wealth, but wealth that cannot help in a cash emergency.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: A Renter With Negative Net Worth</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">A twenty-six-year-old renter holds $6,000 in the bank and $4,000 in a starter investment account, against $28,000 of student loans and $3,000 on cards: net worth minus twenty-one thousand dollars. The number is negative and the situation is entirely normal — the point of measuring it now is the trajectory. Clear the cards, then watch the same calculation improve by roughly her full saving rate plus debt reduction each year. Many households cross zero in their late twenties or early thirties; knowing your exact distance from zero turns a vague anxiety into a finish line with a date.</p>
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
              <div><strong className="text-[#1F2937] block text-lg mb-1">Valuing Possessions at What You Paid</strong><span className="text-neutral-600 font-light leading-relaxed">A car bought for forty thousand is worth what it would sell for now; furniture and electronics are worth a fraction of their receipts. Purchase-price accounting can inflate net worth by tens of thousands and makes the year-on-year trend meaningless. Be a pessimistic auctioneer: if you would not get the money this month, do not count it.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Forgetting a Liability</strong><span className="text-neutral-600 font-light leading-relaxed">The forgotten debts are legion: the buy-now-pay-later balances, the loan from family, the tax bill coming in April, the second card in a drawer. A net worth calculation is only as honest as its liability list. If a stranger could demand the money from you, it belongs on the right-hand side of the equation.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Counting the House at a Fantasy Price</strong><span className="text-neutral-600 font-light leading-relaxed">Use a realistic sale estimate minus selling costs, not the highest valuation a website has ever shown you or the price the neighbour claims they could get. Home equity is most people's largest net-worth component, which makes it the largest source of self-deception in the entire calculation.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Checking Too Often and Trading on Feelings</strong><span className="text-neutral-600 font-light leading-relaxed">Net worth that includes investments will fall in every market correction, sometimes sharply. Checking monthly turns those falls into anxiety and bad decisions; the measure exists to track years, not weeks. Annual or twice-yearly reviews, in the same month each year, keep the signal and discard the noise.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Comparing Against Other People's Numbers</strong><span className="text-neutral-600 font-light leading-relaxed">Age-based medians blend renters with owners of paid-off homes in expensive cities, and inheritances with first-generation savers. They are context, not a verdict. The comparison that predicts your future is against your own last measurement: direction and speed, not rank.</span></div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Making Net Worth a Habit, Not a Judgement</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Resist two temptations when you review your number. The first is comparison: published median net worth figures by age are useful context, but they blend homeowners and renters, high- and low-cost regions, and people a decade into inheritances. Your household's own slope — the change since your last measurement — contains almost all the actionable information. The second temptation is optimisation theatre: moving money between accounts, chasing small rate differences, refinancing for marginal gains. Net worth grows from exactly three levers: earn more, spend less than you earn, and let the difference compound. If a financial activity does not move one of those levers, it is entertainment.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use the breakdown tactically once a year. Too much of your worth trapped in a depreciating car argues for a cheaper one at replacement time. Investments stalled while cash piles up far beyond your emergency fund argues for investing the surplus. Credit-card balances visible in the same table as your investments make the absurdity of holding both impossible to unsee — money invested at hoped-for 7 percent while a balance rots at 25 percent. The table is a mirror: look at it annually, act on the one imbalance that matters most, and then go and live your life for another year.</p>
          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-base text-[#1F2937] font-medium m-0 leading-relaxed"><strong>Important note:</strong> Values are the estimates you enter — use realistic resale and settlement figures rather than optimistic ones. This calculator stores nothing and provides educational information, not financial advice.</p>
          </div>
        </>
      )}
      </ToolLayout>
    </>
  )
}
