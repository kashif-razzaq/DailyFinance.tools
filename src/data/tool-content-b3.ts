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
  }
}
