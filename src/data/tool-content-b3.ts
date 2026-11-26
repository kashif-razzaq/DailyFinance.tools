/**
 * Tool content — part B: tax, ecommerce, creator and the two new freelance tools.
 * Written in the TONE-OF-VOICE.md voice (professional, direct, concrete numbers).
 * Keyed by URL path without the leading slash, e.g. "tax/paycheck-calculator".
 * Tax figures use the same projected 2026 federal brackets and standard
 * deduction as the calculators themselves, and are labeled estimates.
 */
import type { ToolContentEntry } from "./tool-content";

export const TOOL_CONTENT_B3: Record<string, ToolContentEntry> = {
  "creator/substack-growth-predictor-simulator": {
    "quickAnswer": "A newsletter with 5,000 free subscribers growing 8% a month, converting 5% to paid at $8, reaches about 630 paid subscribers and $4,163 of net monthly revenue in a year — $33,879 of cumulative net revenue. Growth compounds: every new free reader adds paid subscribers without any change in price.",
    "howItWorks": [
      "Enter your current free subscribers, monthly growth rate, paid conversion rate, monthly price and paid churn rate, plus the projection horizon. The simulator grows the free list month by month, converts a share of it to paid, applies churn, and returns the free and paid subscriber counts and net monthly recurring revenue for each month.",
      "The fee stack has three layers: Substack takes 10% of paid subscription revenue, Stripe processing takes 2.9% plus $0.30 per charge, and Stripe Billing adds 0.7% on recurring charges — 13.6% plus $0.30 per paid subscriber in total. On an $8 subscription that is $0.80 to Substack, $0.53 to Stripe processing and $0.06 to the billing fee, leaving about $6.61.",
      "Conversion is the lever the simulator exists to test. Substack's own benchmark is 5 to 10% of free subscribers converting to paid, while most publications land at 2 to 5%. At 3% conversion the example below reaches about $2,498 of net monthly revenue by month 12; at 8% it reaches about $6,660. The difference between the bottom and top of the realistic range is nearly threefold.",
      "Churn works against you exactly as growth works for you. The simulator applies your churn rate to paid subscribers each month, then tops paid back up from conversions of new free readers — so while the list grows, paid subscribers track your conversion rate applied to the free list. Churn bites when growth stalls: a list that stops growing sees paid subscribers shrink by the churn rate every month.",
      "Annual plans change the arithmetic in three ways: priced at roughly ten times the monthly rate (two months free), they bring cash forward, pay the $0.30 fixed fee once instead of twelve times, and reduce churn decisions to one a year. Most publications offer both monthly and annual. Substack's minimum price is $5 a month or $30 a year, so the model cannot price below that floor."
    ],
    "formula": "Paid subscribers = free subscribers x conversion rate, adjusted monthly for growth and churn. Net monthly revenue = paid x price x (1 - 10% Substack fee - 2.9% Stripe - 0.7% billing fee) - paid x $0.30.",
    "example": {
      "title": "Worked example: 12-month projection for a growing newsletter",
      "body": "Start: 5,000 free subscribers, growing 8% a month; conversion 5%; price $8 a month; paid churn 3% a month. Month 1: the free list reaches 5,400 and paid subscribers reach 270, grossing $2,160 and netting about $1,785 after Substack's $216, Stripe's $62.64, a $15.12 billing fee and $81 of fixed per-charge fees. By month 12 the free list reaches 12,591, paid subscribers reach about 630 and net monthly revenue is about $4,163. Cumulative net revenue across the year totals about $33,879, against about $19,800 if the list had not grown at all."
    },
    "assumptions": [
      "Growth, conversion and churn all stay constant for the whole projection: the free list compounds at the same monthly rate with no saturation, and paid subscribers are always topped back up to the conversion share of the free list.",
      "Annual plans are modeled at their monthly equivalent, so the cash-timing advantage of annual billing and the single $0.30 fee are not reflected in the projection.",
      "Free-list unsubscribes are not modeled separately — enter a net growth rate that already subtracts them — and the figures are before income tax."
    ],
    "faqs": [
      {
        "question": "How much does Substack take from paid subscriptions?",
        "answer": "10% of the subscription price, plus Stripe's processing of about 2.9% + $0.30 per charge, plus a 0.7% Stripe Billing fee on recurring charges. On an $8 monthly subscription the creator nets about $6.61; on an $80 annual plan, about $68.82 — the single $0.30 fixed fee is why annual plans net a slightly higher share."
      },
      {
        "question": "What paid conversion rate is realistic?",
        "answer": "Substack's own guidance puts typical free-to-paid conversion at 5 to 10%, while most publications land at 2 to 5%, with around 5% a serviceable planning figure. Publications converting below 3% usually have a free tier that gives away the core value; above 8% usually means the paid tier carries something scarce — data, community access, professional necessity — rather than more posts."
      },
      {
        "question": "How many subscribers do I need to earn $5,000 a month?",
        "answer": "At $8 a month netting about $6.61, $5,000 needs about 756 paying subscribers. At a 5% conversion rate that is a free list of roughly 15,100; at 8% conversion, about 9,450. Raising price to $12 cuts the requirement to about 497 paid subscribers. The three levers — list size, conversion, price — are interchangeable in the arithmetic and very different in effort."
      },
      {
        "question": "Monthly or annual pricing — which earns more?",
        "answer": "Annual plans (usually priced at 10x monthly, giving two months free) bring cash forward, cut processing fees and reduce churn decisions to one a year; monthly plans convert more subscribers because the entry price is lower. Most publications offer both. In projections, model annual subscribers at a lower churn rate and monthly ones at a higher conversion rate."
      },
      {
        "answer": "Churn bites. While the list grows, conversions of new free readers top paid subscribers back up; when growth stalls, paid subscribers shrink by the churn rate every month. At 3% monthly churn, a stalled list loses about a third of its paid subscribers in a year. Growth is what keeps the paid base up — the model only works while the list grows.",
        "question": "What happens when my list stops growing?"
      },
      {
        "answer": "A higher share, but a lower total per subscriber-year. An $80 annual plan nets about $68.82 — 86% — because the $0.30 fixed fee is paid once instead of twelve times. Twelve monthly payments of $8 net $6.61 each, or $79.32 a year. Annual plans win on cash timing and fewer churn decisions, not on total revenue per subscriber.",
        "question": "Do annual plans net more than monthly plans?"
      },
      {
        "answer": "More than it looks. The fee stack is 13.6% plus $0.30 per paid subscriber, so on an $8 subscription the fixed fee is $0.30 of $1.39 in total fees. At Substack's $5 minimum price it is a larger share still, which is why the net share rises with price. Annual plans pay it once a year instead of twelve times, which is part of their advantage.",
        "question": "How much does the $0.30 fixed fee matter?"
      },
      {
        "answer": "Your actual trailing average for free subscribers — the example uses 8% a month, which takes 5,000 free subscribers to 12,591 in a year. Growth compounds, so small differences widen fast: the same list at 4% a month reaches only about 8,000. If free readers also unsubscribe, enter a net growth rate that already subtracts them.",
        "question": "What monthly growth rate should I enter?"
      }
    ],
    "sources": [
      {
        "label": "Substack Support: How Much Does Substack Cost?",
        "url": "https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost"
      },
      {
        "label": "Stripe Billing Pricing",
        "url": "https://stripe.com/billing/pricing"
      }
    ]
  },
  "real-estate/biweekly-mortgage-calculator": {
    "quickAnswer": "Paying half your mortgage every two weeks adds up to 13 monthly payments a year instead of 12. On a $300,000 loan at 6.5% over 30 years, the $1,896.20 monthly payment becomes $948.10 every two weeks, the loan clears in about 24 years 2 months, and you save $88,122 of interest — free, if your servicer applies each half-payment immediately.",
    "howItWorks": [
      "A year has 52 weeks, so paying half your monthly payment every two weeks means 26 half-payments — 13 full monthly payments instead of 12. The scheduled payment is already covered by the first 12, so the thirteenth goes straight to principal. Because interest is charged on the balance, extra principal early in the loan removes years of interest that would have compounded on it.",
      "The calculator starts from your standard monthly principal-and-interest payment, then halves it. Each 14-day period charges interest at your annual rate divided by 26, applies the half-payment, and repeats on the new balance until it reaches zero. The payoff date comes from simulating every period, which is also why the last payment is smaller than the rest.",
      "What you save depends on your rate and balance. At 6.5% on $300,000 the saving is $88,122 and 5 years 10 months; at the same balance but 3%, the saving is $20,637 — less than a quarter of the 6.5% figure, because there is less interest to remove. The first years matter most, when the balance — and the interest on it — is highest.",
      "The fee is where biweekly plans go wrong. Many servicers charge $200–$500 to enroll, and third-party programs have charged far more: in 2015 the Consumer Financial Protection Bureau took action against companies that collected $49 million in setup fees of up to $995, plus $84–$101 a year, while holding payments instead of applying them. You can copy it free by adding one-twelfth of your payment to each monthly payment as extra principal — on the $300,000 example that saves $87,256, within $866 of the true biweekly result.",
      "Before switching, confirm in writing that your servicer applies half-payments the day they arrive. Some hold them until a full payment accumulates, which wipes out the benefit entirely. Check your loan note for a prepayment penalty, and remember the calculator covers principal and interest only — property tax, insurance, HOA dues and PMI stay on your monthly escrow schedule and do not change."
    ],
    "formula": "Monthly principal and interest M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1], where P is the loan balance, r is the annual rate ÷ 12, and n is the number of monthly payments. Biweekly payment = M ÷ 2, paid every 14 days. Each biweekly period charges interest of balance × (annual rate ÷ 26), then the payment is applied. 26 × (M ÷ 2) = 13 × M a year: one extra monthly payment, all of it to principal. The 26-payment mechanic is documented by the Consumer Financial Protection Bureau (CFPB).",
    "example": {
      "title": "Worked example: $300,000 at 6.5% over 30 years",
      "body": "The monthly principal-and-interest payment is $1,896.20. Paying $948.10 every two weeks, the loan takes 628 biweekly payments to clear — 24 years 2 months instead of 30 — because 26 half-payments a year equal 13 monthly payments. Total interest on the monthly schedule is $382,633; on the biweekly schedule it is $294,512, a saving of $88,122, and the final payment is only $51.71. Adding one-twelfth of the payment ($158.02) to each monthly payment instead clears the loan in 290 months and saves $87,256 — nearly the same result, with no biweekly program fee."
    },
    "assumptions": [
      "The rate stays fixed for the life of the loan, and interest is charged at the annual rate divided by 26 for each 14-day period.",
      "Every half-payment is applied to the balance the day it arrives — servicers that hold half-payments until a full payment accumulates wipe out the benefit the calculator shows.",
      "The figures cover principal and interest only: property tax, insurance, HOA dues and PMI are excluded, and no enrollment fee or prepayment penalty is modeled."
    ],
    "faqs": [
      {
        "question": "How much does a biweekly mortgage payment save?",
        "answer": "It depends on your balance and rate. On a $300,000 loan at 6.5% over 30 years, paying $948.10 every two weeks instead of $1,896.20 a month saves $88,122 of interest and clears the loan 5 years 10 months early. At the same balance but 3%, the saving is $20,637; at 8% it is $138,895. The higher your rate, the more each extra payment is worth."
      },
      {
        "question": "Is a biweekly mortgage plan worth the fee?",
        "answer": "Usually not. Servicers commonly charge $200–$500 to enroll, and third-party programs have charged up to $995 to set up plus $84–$101 a year — the Consumer Financial Protection Bureau took enforcement action against two such companies in 2015 after they collected $49 million in fees. The schedule itself is free to copy: add one-twelfth of your payment to each monthly payment as extra principal and you save nearly as much, with no enrollment at all."
      },
      {
        "question": "Will my servicer let me pay biweekly?",
        "answer": "Not all servicers offer a biweekly program, and offering one is optional. If yours does, ask in writing whether half-payments are applied the day they arrive: some servicers hold them until a full payment accumulates, which wipes out the benefit. If your servicer does not offer it, or charges a fee, use the free alternative — add one-twelfth of your monthly payment to each payment as extra principal."
      },
      {
        "question": "Biweekly payments or one extra monthly payment a year — which is better?",
        "answer": "They are nearly identical. On a $300,000 loan at 6.5%, true biweekly payments save $88,122 and one extra monthly payment a year saves $87,256, because the biweekly version applies the extra principal a few weeks earlier. Choose whichever you will actually keep doing: the automatic biweekly debit suits people who want it handled, while the monthly extra suits people who want control without enrolling in a program."
      },
      {
        "question": "Does paying biweekly change my taxes, insurance or escrow?",
        "answer": "No. Biweekly payments change only the principal-and-interest part of your loan. Property tax, homeowners insurance, HOA dues and PMI stay on your monthly escrow schedule, and the amounts do not change. If your servicer quotes a biweekly figure that includes escrow, check what it covers — this calculator shows principal and interest only, so the two figures will differ."
      },
      {
        "question": "My rate is below 4%. Is biweekly still worth it?",
        "answer": "The saving shrinks fast as the rate falls: on $300,000 at 3% over 30 years, biweekly saves $20,637 and about 3 years 6 months, against $88,122 at 6.5%. With a cheap loan, putting the extra money into retirement savings or an emergency fund may be worth more than paying down a 3% debt. There is no wrong answer — it depends on whether you value a paid-off home or a larger investment balance more."
      },
      {
        "question": "Can I pay biweekly on an adjustable-rate mortgage?",
        "answer": "Yes, but the saving moves when the rate resets. The biweekly mechanic still works — 26 half-payments still equal 13 monthly payments — but the monthly payment itself is recalculated at each adjustment, so the half-payment changes too. Re-run the calculator after every rate adjustment, and confirm with your servicer that the biweekly arrangement survives the reset rather than reverting to monthly."
      },
      {
        "question": "Does biweekly help if I plan to sell or refinance soon?",
        "answer": "Somewhat. The extra principal still builds equity faster from the first payment, so you owe less whenever you sell or refinance — but the big saving is interest avoided over decades, and a short horizon captures little of it. The extra payments are not refundable, so do not stretch your cash flow for a benefit you will not stay to collect; keep an emergency fund first."
      }
    ],
    "sources": [
      {
        "label": "CFPB — Mortgage key terms (bi-weekly payment)",
        "url": "https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms/"
      },
      {
        "label": "CFPB — Enforcement Action: Nationwide Biweekly Administration",
        "url": "https://www.consumerfinance.gov/enforcement/actions/nationwide-biweekly-administration/"
      }
    ]
  },
  "real-estate/mortgage-recast-calculator": {
    "quickAnswer": "A $50,000 lump sum on a $300,000 mortgage at 6.5% with 27 years left cuts the payment from $1,966.66 to $1,638.89 a month — $327.78 less — and saves $56,200 of interest over the remaining term, after a $250 recast fee. The rate and payoff date stay the same; only the payment changes.",
    "howItWorks": [
      "A recast — also called re-amortization — starts with a lump sum paid toward your principal: home-sale proceeds, a bonus, an inheritance. Your servicer recalculates your monthly payment on the smaller balance over the months left. The rate and payoff date never change, and there is no new loan: no credit check, no appraisal, no closing costs, a small fee.",
      "The calculator works out your current payment from the amortization formula, then subtracts the lump sum and runs the same formula again on the smaller balance over the same term. The payment is proportional to the balance when rate and term are fixed, so a $50,000 payment on a $300,000 balance cuts the payment by exactly one-sixth. Interest is simulated month by month, so the final partial payment is exact.",
      "The same lump sum buys two different things. Recasting lowers the payment and keeps the payoff date. Keeping the old payment on the smaller balance pays the loan off years early instead — on the example loan, 18 years rather than 27 — and saves far more interest, $162,507 against $56,200. The calculator shows both: the cheaper payment is not always the better deal.",
      "Recasting is not a right: your servicer decides, and the rules come from whoever owns the loan. Fannie Mae's guide lets the servicer cut the payment after a substantial principal curtailment; Freddie Mac's allows the same on a current loan with rate and maturity unchanged. Most servicers want $5,000 to $10,000 minimum, charge $150 to $500 ($250 is typical), and take 30 to 60 days. FHA, VA and USDA loans are generally ineligible — their loans sit in Ginnie Mae pools that bar re-amortization.",
      "A recast pays when you want a lower bill and will stay put — the saving is spread over the remaining term, so a short horizon captures little of it. Before sending money, get the minimum, fee and new payment in writing, then check your next statement to confirm the lump sum went to principal. If your servicer will not recast, the lump sum still helps: keep paying the old amount and the loan clears years early, fee-free."
    ],
    "formula": "Monthly principal and interest M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1], where P is the balance, r is the annual rate ÷ 12, and n is the months left. After the lump sum the balance is P′ = P − lump sum, and the recast payment is the same formula with P′ and the same r and n. Interest saved = (old payment × n − P) − (new payment × n − P′), minus the recast fee.",
    "example": {
      "title": "Worked example: $300,000 at 6.5%, 27 years left",
      "body": "The current payment is $1,966.66 a month. A $50,000 lump sum cuts the balance to $250,000, and re-amortizing that balance over the same 324 months at 6.5% gives a new payment of $1,638.89 — $327.78 less each month, 16.7% lower. Interest over the remaining term falls from $337,199 to $281,000, a saving of $56,200, or $55,950 after the $250 fee, which the lower payment covers in under a month. Keeping the $1,966.66 payment on the $250,000 balance instead clears the loan in 216 months — 18 years, nine years early — and saves $162,507, $106,307 more than recasting."
    },
    "assumptions": [
      "The rate stays fixed for the life of the loan, and the remaining term does not change — a recast re-amortizes the balance over the months left, nothing else.",
      "The lump sum is applied to principal in full on the day it is paid, and the recast fee is paid separately, never added to the balance.",
      "The figures cover principal and interest only: property tax, insurance, HOA dues and PMI are excluded, and no prepayment penalty is modeled."
    ],
    "faqs": [
      {
        "question": "How much does a mortgage recast lower my payment?",
        "answer": "It depends on the lump sum relative to the balance: the payment falls by the same proportion as the balance. A $50,000 payment on a $300,000 loan at 6.5% with 27 years left cuts the payment from $1,966.66 to $1,638.89, $327.78 less a month. A $25,000 payment on the same loan would cut it by half that, about $163.89. Enter your own numbers in the calculator — the drop scales exactly with the lump sum."
      },
      {
        "question": "Is a mortgage recast worth it?",
        "answer": "It is worth it when you want a permanently lower monthly payment and will stay in the home long enough to collect the saving. On the example loan the recast saves $56,200 of interest, $55,950 after the $250 fee, and the fee is covered in under a month of lower payments. It is not worth it if you plan to sell or refinance soon — the saving is spread over the remaining term — or if the same lump sum kept at the old payment would serve you better: that path saves $162,507 and clears the loan nine years early."
      },
      {
        "question": "Can I recast an FHA, VA or USDA loan?",
        "answer": "Generally no. Government-backed loans sit in Ginnie Mae mortgage-backed securities pools, and the Ginnie Mae guide bars re-amortization while a loan is in a pool. Recasting is a conventional-loan option: Fannie Mae and Freddie Mac both have servicing procedures for it, and most servicers offer it on conventional loans. If your loan is FHA, VA or USDA, the lump sum still helps — keep paying the old amount and the balance falls faster — but the payment itself will not drop."
      },
      {
        "question": "How much does a recast cost?",
        "answer": "Most servicers charge $150 to $500, and $250 is the most common figure: PennyMac, U.S. Bank and Rocket Mortgage all list $250. Some charge nothing — Wells Fargo lists no fee on its jumbo recast option. There is no appraisal, no credit check and no closing costs, which is the whole point against refinancing. Get the fee in writing before you send the lump sum, and check it against the monthly saving: on the example loan the $250 fee is covered in under a month."
      },
      {
        "question": "How much lump sum do I need to recast?",
        "answer": "There is no regulator-set minimum: Fannie Mae's guide speaks of a 'substantial' curtailment and sets no dollar figure. Servicers set their own, commonly $5,000 to $10,000; Chase lists no minimum. The minimum is only the entry ticket — the payment cut scales with the lump sum, so a $10,000 payment on a $300,000 loan cuts the payment by about $65.56 a month, while $50,000 cuts it by $327.78."
      },
      {
        "question": "Recast vs refinance — which is better?",
        "answer": "Recast when you like your rate and only want a lower payment: it costs $250, keeps your rate and payoff date, and needs no appraisal or credit check. Refinance when your rate is the problem — a lower rate cuts both the payment and the total interest, but closing costs run 0.5% to 1.5% of the loan and the clock restarts. If you refinance, the same lump sum can go toward the new loan instead. Run both in the refinance calculator before you choose."
      },
      {
        "question": "Recast or keep paying the same amount — which saves more?",
        "answer": "Keeping the payment saves far more. On the $300,000 example, recasting saves $56,200 of interest and keeps the 27-year payoff date; keeping the $1,966.66 payment on the $250,000 balance clears the loan in 18 years and saves $162,507 — $106,307 more. Recasting buys a smaller monthly bill; keeping the payment buys nine years of freedom. Choose the lower payment if cash flow is the problem, and the old payment if the total cost is."
      },
      {
        "question": "How long does a recast take?",
        "answer": "Most servicers take 30 to 60 days from request to the new payment, and PennyMac quotes up to six weeks. The lump sum is applied to principal first, then the servicer re-amortizes and sends a new payment schedule — on a Fannie Mae loan the agreement is Form 181. Do not expect the lower payment on the next statement: budget for at least one more payment at the old amount, and check the statement after that to confirm the new figure."
      }
    ],
    "sources": [
      {
        "label": "Fannie Mae — Servicing Guide (re-amortization, C-1.2-01 / F-1-09)",
        "url": "https://servicing-guide.fanniemae.com/"
      },
      {
        "label": "Freddie Mac — Is There a Faster Way to Be Mortgage-Free?",
        "url": "https://myhome.freddiemac.com/blog/homeownership/pay-off-mortgage-faster"
      },
      {
        "label": "CFPB — Mortgage key terms",
        "url": "https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms/"
      }
    ]
  },
  "personal-wealth/i-bond-calculator": {
    "quickAnswer": "A $10,000 I bond bought at the November 2026 rate of 5.51% is worth $10,275.50 after six months and $13,122.89 after five years — $3,122.89 of interest, with no penalty at five years. The rate combines a 1.40% fixed rate, locked for the bond's 30-year life, with a 2.04% semiannual inflation rate that resets every six months.",
    "howItWorks": [
      "Enter your purchase amount, fixed rate, current semiannual inflation rate, assumed future inflation rate, and holding period. The defaults are TreasuryDirect's November 1, 2026 rates — 1.40% fixed, 2.04% inflation — and a $10,000 purchase, the most one person can buy electronically in a year.",
      "Treasury builds the composite rate from two parts: fixed rate plus twice the semiannual inflation rate plus the fixed rate times the inflation rate. With the November 2026 figures that is 1.40% + (2 × 2.04%) + (1.40% × 2.04%) = 5.51%. The fixed rate never changes; the inflation part resets every May 1 and November 1 from the CPI-U, so only the first six months are certain.",
      "Interest compounds semiannually: every six months Treasury adds the interest earned to the bond's value, and the next period earns interest on that larger balance. A $10,000 bond earns $275.50 in its first six months at 5.51%; in the second six months it earns interest on $10,275.50, not $10,000. That is why the effective annual return, 5.59%, is slightly higher than the 5.51% headline rate.",
      "Two rules shape the result: you cannot cash an I bond at all in its first 12 months, and cashing in before five years forfeits the last three months of interest — on a $10,000 bond held one year, that penalty is $141.55, leaving $10,417.05 instead of $10,558.59. The calculator shows both the bond value and the cash-in value, which meet at five years when the penalty disappears. Purchases cap at $10,000 of electronic bonds per person per year, with a $25 minimum.",
      "I bond interest is exempt from state and local income tax, and federal tax is deferred until you cash in — or excluded entirely if the bond pays for qualified higher-education expenses. The projection holds your future inflation rate steady; in reality Treasury resets it every six months, so treat any figure past the first year as a scenario, not a promise. Verify the current rate on TreasuryDirect before buying."
    ],
    "formula": "Composite rate = fixed rate + (2 × semiannual inflation rate) + (fixed rate × semiannual inflation rate), rounded to the nearest 0.01%. Each six-month period adds value × composite rate ÷ 2 to the bond. Cash-in value before 5 years = bond value − (balance at the start of the final six-month period × composite rate ÷ 4). Source: TreasuryDirect, 31 CFR 359.14.",
    "example": {
      "title": "Worked example: $10,000 at the November 2026 rate for 5 years",
      "body": "Buy a $10,000 I bond at the November 1, 2026 rates: 1.40% fixed, 2.04% semiannual inflation. The composite rate is 1.40% + 4.08% + 0.02856% = 5.51%. After six months the bond is worth $10,000 × (1 + 5.51% ÷ 2) = $10,275.50. After one year it is worth $10,558.59, and after five years — ten semiannual periods at the same composite rate — it is worth $13,122.89, a gain of $3,122.89. Because five years have passed, there is no early-redemption penalty. Held one year instead, the same bond would be worth $10,558.59 but cash in at $10,417.05 after the $141.55 penalty. At 30 years the bond stops earning interest, worth $51,071.41 if the 5.51% composite held the whole time — it will not, because the inflation part resets every six months."
    },
    "assumptions": [
      "The fixed rate and the first six months' inflation rate are the TreasuryDirect rates announced November 1, 2026; later periods use your assumed inflation rate, which Treasury will replace with actual CPI-U figures every May and November.",
      "The composite rate is rounded to the nearest 0.01% exactly as Treasury publishes it, and interest is applied as composite ÷ 2 each six-month period.",
      "The projection ignores tax: federal tax is deferred until redemption and state and local tax do not apply. The $10,000 annual purchase limit is not enforced in the calculator — enter any amount to model a household or multi-year purchase."
    ],
    "faqs": [
      {
        "question": "What is the current I bond rate?",
        "answer": "5.51% for I bonds issued November 1, 2026 to April 30, 2027: a 1.40% fixed rate plus a 2.04% semiannual inflation rate. The fixed rate is the highest Treasury has set since November 2006 and stays with the bond for its 30-year life; the inflation part resets every May 1 and November 1. Treasury announces the next rates on May 1, 2027."
      },
      {
        "question": "How is the I bond rate calculated?",
        "answer": "Composite rate = fixed rate + (2 × semiannual inflation rate) + (fixed rate × semiannual inflation rate). With the November 2026 figures: 1.40% + 4.08% + 0.02856% = 5.51%. The formula checks out against TreasuryDirect's own table: a bond with a 0.90% fixed rate earns 5.00% with the same 2.04% inflation rate, and a 0.00% fixed rate earns 4.08%."
      },
      {
        "question": "How much can I buy in I bonds each year?",
        "answer": "$10,000 of electronic I bonds per person per calendar year through TreasuryDirect, with a $25 minimum and purchases to the penny above that. The limit applies per Social Security number, so a couple can buy $20,000 a year between them. Since January 1, 2025, I bonds are sold electronically only."
      },
      {
        "question": "When can I cash in an I bond?",
        "answer": "Not at all in the first 12 months — the money is locked for a year. After that you can redeem any time, but cashing in before five years forfeits the last three months of interest: on a $10,000 bond held one year, that is $141.55. After five years there is no penalty, and the bond stops earning interest at 30 years."
      },
      {
        "question": "Are I bonds taxed?",
        "answer": "Federal income tax applies, but it is deferred until you cash in — you choose whether to report the interest each year or all at once at redemption. I bond interest is exempt from state and local income tax entirely. If the bond pays for qualified higher-education expenses, the interest may be excluded from federal tax too, subject to income limits."
      },
      {
        "question": "I bond or high-yield savings account — which is better?",
        "answer": "It depends on when you need the money. An I bond at 5.51% currently pays far more than the national average savings rate, and the rate adjusts with inflation — but the money is locked for 12 months, penalised before five years, and capped at $10,000 a year per person. A high-yield savings account pays less but lets you withdraw any time with no cap. Money you might need within a year belongs in savings; money you can lock away for years can earn more in I bonds."
      },
      {
        "question": "What happens to my I bond's rate after six months?",
        "answer": "The fixed rate never changes — a bond bought at 1.40% keeps 1.40% for 30 years. The inflation part changes every six months, on dates keyed to your issue month rather than Treasury's May and November announcements. A bond issued in November gets its new rate each May 1 and November 1; a bond issued in March gets its new rate each September 1 and March 1. Your bond's next rate is its own fixed rate combined with the newest inflation rate."
      },
      {
        "question": "Do I bonds keep up with inflation?",
        "answer": "By design, yes. The inflation part of the rate tracks the CPI-U, so when inflation rises the composite rate rises with it, and the composite never falls below zero even in deflation. The fixed rate is your real return above inflation: at 1.40% fixed, the bond beats inflation by about 1.40% a year before tax, whatever inflation does. That is the point of the bond — it protects purchasing power rather than chasing the highest yield."
      }
    ],
    "sources": [
      {
        "label": "TreasuryDirect — I bonds interest rates",
        "url": "https://www.treasurydirect.gov/savings-bonds/i-bonds/i-bonds-interest-rates/"
      },
      {
        "label": "TreasuryDirect — I bonds",
        "url": "https://www.treasurydirect.gov/savings-bonds/i-bonds/"
      }
    ]
  }
}
