import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'High-Yield Savings & CD Calculator: HYSA vs CD Earnings Compared',
  description: 'Compare a high-yield savings account vs a CD on the same deposit: earnings, after-tax returns and total value side by side, with any compounding frequency. Free tool.',
  keywords: ['high yield savings calculator', 'cd calculator', 'hysa vs cd', 'savings interest calculator'],
  slug: "personal-wealth/high-yield-savings-cd-calculator",
  category: "Personal Wealth",
});

const faqs: FAQ[] = [
  {
    "answer": "If you are certain you will not need the money during the term, a CD usually wins when its APY is higher, because the rate is locked. If there is any chance you will need the money early, an HYSA usually wins despite a lower rate, because it has no early-withdrawal penalty and its rate, while variable, applies to money you can actually reach.",
    "question": "Is a CD or a high-yield savings account better?"
  },
  {
    "answer": "APY already includes the effect of compounding within the year, so APYs from different banks can be compared directly even if one compounds daily and another monthly. The interest rate (APR on deposits) does not include that effect. This calculator lets you test compounding frequencies to see how small that difference really is.",
    "question": "What is the difference between APY and interest rate?"
  },
  {
    "answer": "Typically three to twelve months of interest, depending on the term and the bank \u2014 enough to erase much or all of the interest earned if you exit early in the term. Some no-penalty CDs exist at slightly lower rates. Always read the specific penalty before opening a CD with money that has any chance of being needed.",
    "question": "What is the penalty for taking money out of a CD early?"
  },
  {
    "answer": "Yes \u2014 interest from both HYSAs and CDs is taxed as ordinary income in the year it is credited, whether or not you withdraw it. The calculator's after-tax view applies your marginal rate to the total interest so you can compare the figures that actually land in your pocket.",
    "question": "Is savings and CD interest taxed?"
  },
  {
    "answer": "Up to $250,000 per depositor, per insured bank, per ownership category, by the FDIC (or the NCUA for credit unions). Balances above the limit at a single bank are uninsured \u2014 a practical reason larger savers spread cash across institutions.",
    "question": "How much cash is insured in a savings account or CD?"
  }
]

export default function Page() {
  const softwareApplicationSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": 'High-Yield Savings & CD Calculator', "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const webPageSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": "https://dailyfinance.tools/personal-wealth/high-yield-savings-cd-calculator", "url": "https://dailyfinance.tools/personal-wealth/high-yield-savings-cd-calculator", "name": 'High-Yield Savings & CD Calculator: HYSA vs CD Earnings Compared', "description": 'Compare a high-yield savings account vs a CD on the same deposit: earnings, after-tax returns and total value side by side, with any compounding frequency. Free tool.' }, { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" }, { "@type": "ListItem", "position": 2, "name": "Personal Wealth", "item": "https://dailyfinance.tools/personal-wealth" }, { "@type": "ListItem", "position": 3, "name": 'High-Yield Savings & CD Calculator', "item": "https://dailyfinance.tools/personal-wealth/high-yield-savings-cd-calculator" }] }] };
  return (
    <>
      <Script id="schema-software-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ToolLayout title='High-Yield Savings & CD Calculator' description='Compare a high-yield savings account vs a CD on the same deposit: earnings, after-tax returns and total value side by side, with any compounding frequency. Free tool.' slug="high-yield-savings-cd-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" />Quick Answer: HYSA vs CD, In One Minute</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">A CD locks a fixed APY for its term but penalises early withdrawal. A high-yield savings account pays a variable APY with full access. On the same deposit, the higher locked rate usually wins if the money is truly spare — this calculator compares earnings and after-tax value for both.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">High-Yield Savings vs CDs: Where Should Your Cash Actually Sit?</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Somewhere in your financial life there is probably money sitting in an account paying close to nothing — a standard savings account at half a percent or less, quietly losing to inflation while its owner debates investments. For money that must stay safe and available, the modern choice is between two insured vehicles that pay ten times that rate: the high-yield savings account, flexible and variable, and the certificate of deposit, locked and certain. This calculator settles that choice for your deposit, your horizon and your tax rate — with actual dollar figures.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The debate matters less than the decision to have it. On twenty thousand dollars over three years, the gap between a half-percent account and either modern option is measured in thousands of dollars, while the gap between the two modern options is usually a few hundred. Savers who agonise for months over HYSA versus CD while their cash sits at the old rate are polishing the small end of the problem. Pick the vehicle that matches the money's job — reachable or locked — take the modern rate either way, and move on.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">What follows explains how each account really works beneath its advertised APY: why the HYSA's rate can vanish the month after you deposit, what a CD's early-withdrawal penalty actually costs in the scenarios where people pay it, how interest from both is taxed, and the ladder strategy savers use to combine the two. Run your deposit through the tool first — the right answer depends on when the money is for, and no general article knows your date.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">HYSA: Flexible, Variable, Yours to Leave</h3>
              <p className="text-sm text-neutral-500 font-light">A high-yield savings account pays a strong rate with no lock-in — but the bank can cut that rate the week after you deposit. It suits money you might need: deposits, emergency funds, near-term goals.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">CD: Locked, Certain, Penalised If Touched</h3>
              <p className="text-sm text-neutral-500 font-light">A certificate of deposit fixes its rate for the whole term, which is valuable when rates are falling. The trade is access: early withdrawal usually costs months of interest, so only genuinely spare money belongs here.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Real Enemy Is the 0.5 Percent Account</h3>
              <p className="text-sm text-neutral-500 font-light">HYSA versus CD is a debate about a fraction of a percent. Both crush a standard savings account paying near half a percent — on twenty thousand dollars over three years, that gap is worth well over two thousand dollars.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Both accounts compound the same way: the deposit grows by its periodic rate every compounding period across the term, which the APY already summarises into one comparable number. The real comparison is therefore not the formula but the conditions attached to the rate — variable versus locked, reachable versus penalised — plus the tax both accounts share, since interest is taxed as ordinary income in the year it is earned. The calculator holds deposit, term and tax constant so only those real differences move the result.</p>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">How HYSA and CD Earnings Are Calculated</h3>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Future Value = Deposit x (1 + APY/n)^(n x Term)  ·  Interest earned = Future Value - Deposit  ·  After-tax interest = Interest x (1 - your tax rate)  ·  APY already reflects compounding; n lets you test it</div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Compound Both Deposits Identically</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Apply each account's APY to the same deposit for the same term, compounding at the frequency you select. Because APY already bakes compounding in, the frequency choice moves results only slightly — a useful discovery in itself, since marketing often presents daily compounding as a headline benefit worth real money. It is worth pennies; the rate and the term are worth pounds and dollars.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Price the Conditions, Not Just the Rate</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">The CD's figure is guaranteed only if the money stays; model an early exit and months of interest vanish. The HYSA's figure is reachable in full at any moment but assumes today's variable rate persists, which it may not. The honest comparison is scenario-based: CD held to term versus HYSA at today's rate, then HYSA at a cut rate, then CD broken early. The calculator's inputs let you run all three in under a minute.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Tax the Interest, Because the Tax Authority Does</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Interest on both accounts is ordinary income in the year credited, so multiply the interest by one minus your marginal tax rate to see what you keep. On identical pre-tax interest the tax is identical too — but where a penalty or a rate cut changes the interest, the after-tax view is what decides which account actually left you better off.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: $20,000 for Three Years</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">Deposit twenty thousand dollars for three years. At a 4.75 percent CD rate compounded monthly, the certificate matures at roughly $23,050 — about $3,050 of interest. At a 4.2 percent HYSA rate, the same money reaches about $22,680 if the rate holds — roughly $2,680. The CD wins this run by a few hundred dollars, in exchange for locking the money away. Both humiliate a standard half-percent savings account, which returns the same saver to about $20,300: choosing either modern option is worth around ten times more than choosing perfectly between them.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: When the HYSA Wins Despite a Lower Rate</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">Now suppose rates fall during year one: the bank trims the HYSA to 3.5 percent, but the saver needs the money at month twenty for a house deposit. The CD holder faces an early-withdrawal penalty — say six months of interest, over seven hundred dollars — which can erase the CD's entire rate advantage and more, while the HYSA holder simply withdraws. The lesson generalises: the CD's edge is real only for money whose date is certain. Any chance of needing it early flips the recommendation, whatever the headline rates say.</p>
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
              <div><strong className="text-[#1F2937] block text-lg mb-1">Parking Long-Term Cash at a Near-Zero Rate</strong><span className="text-neutral-600 font-light leading-relaxed">The costliest cash mistake is not choosing the wrong modern account — it is staying in a legacy one. Half a percent against four-plus percent, compounded across every idle balance for years, is a five-figure decision for many households. Moving cash is an afternoon of admin that pays like a part-time job.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Locking Money You Might Need Into a CD</strong><span className="text-neutral-600 font-light leading-relaxed">A CD's higher rate is compensation for surrendering access. Deposit money with any real chance of being called early — a house fund with a flexible date, a thin emergency reserve — and the early-withdrawal penalty can consume the entire rate advantage in one stroke. Match the lock to money whose date is genuinely fixed.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Assuming the HYSA Rate You Signed Up For Will Last</strong><span className="text-neutral-600 font-light leading-relaxed">HYSA rates are variable and fall with the market, often quietly and quickly. A comparison made at today's teaser rate overstates the HYSA over a long horizon if rates drop — one reason the calculator lets you test a lower HYSA rate against the CD's guaranteed one before deciding.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Forgetting the Tax on Interest</strong><span className="text-neutral-600 font-light leading-relaxed">Interest from savings and CDs is taxed as ordinary income each year, so a saver in a higher bracket keeps materially less of the headline APY. Comparing accounts on pre-tax interest alone can even flip which looks better once penalties and taxes interact. The calculator's after-tax view exists because the pocket, not the brochure, is the scoreboard.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Missing the CD Maturity Window</strong><span className="text-neutral-600 font-light leading-relaxed">Most CDs auto-renew at maturity into a new term — frequently at a much lower rate — unless you act inside a short grace period. Savers have lost a year of good rates to a ten-day window they never calendared. The day you open a CD, put its maturity date and grace deadline in your diary.</span></div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Ladders and Splits: Using Both Accounts Deliberately</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Sophisticated savers often refuse the either/or and ladder instead: money split across CDs maturing at staggered dates, capturing locked rates while a portion frees up every few months. A simpler household version covers most needs — emergency fund and any money with a date inside a year in the HYSA, where it stays reachable, and only genuinely surplus cash with a certain horizon in CDs. Revisit the split whenever rates move sharply: falling-rate environments reward locking in; rising-rate environments reward staying flexible, and the difference between acting and not acting is rarely more than a few tenths of a percent a year.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Whichever vehicle you choose, automate the boring parts and verify the safety basics. Confirm the institution is FDIC- or NCUA-insured, check whether the advertised APY is a teaser requiring balances or direct deposits, and note the CD's exact penalty and grace-period rules in your calendar before you need them. Cash management is the least glamorous corner of personal finance and the one where small, certain percentages — repeated across every idle balance you own, every year — quietly add up to real money.</p>
          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-base text-[#1F2937] font-medium m-0 leading-relaxed"><strong>Important note:</strong> APYs change, CD terms and early-withdrawal penalties vary by bank, and the after-tax view here applies the single rate you enter to all interest. Figures are estimates for comparison, not financial advice; check a bank's current terms and FDIC status before depositing.</p>
          </div>
        </>
      )}
      </ToolLayout>
    </>
  )
}
