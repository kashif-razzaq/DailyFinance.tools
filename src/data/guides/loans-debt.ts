import type { Guide } from "../guides"

/** Editorial guides — Loans & Debt hub. Part of the 100-article framework set. */
export const GUIDES_LOANS_DEBT: Guide[] = [
  {
    "slug": "avalanche-vs-snowball-debt-payoff",
    "title": "Debt Avalanche vs Snowball: Which Payoff Method Saves More?",
    "seoTitle": "Debt Avalanche vs Snowball: Which Payoff Method Saves More?",
    "description": "Debt avalanche vs snowball: which payoff method wins? The math, the research on finishing, worked comparisons, and how to choose yours with confidence.",
    "image": "/images/avalanche-vs-snowball-debt-payoff.jpg",
    "imageAlt": "Illustration of debt payoff methods: an avalanche slope and a rolling snowball clearing debt blocks",
    "hub": "Loans & Debt",
    "updated": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Debt Payoff Calculator",
        "url": "/loans/debt-payoff-calculator"
      },
      {
        "name": "Debt Avalanche vs Snowball Calculator",
        "url": "/personal-wealth/debt-avalanche-vs-snowball-calculator"
      },
      {
        "name": "Credit Card Calculator",
        "url": "/loans/credit-card-calculator"
      },
      {
        "name": "Debt Consolidation Calculator",
        "url": "/loans/debt-consolidation-calculator"
      }
    ],
    "intro": "Once minimums are covered, any extra money can attack debts in two orders. The avalanche pays the highest interest rate first. The snowball pays the smallest balance first. One is better arithmetic; the other is better psychology. The difference in cost is usually smaller than people expect — and far smaller than the cost of quitting.",
    "sections": [
      {
        "heading": "A worked comparison",
        "paragraphs": [
          "Three debts: a $900 card at 26%, a $4,000 card at 21%, and a $9,500 loan at 9%, with $650 a month total to pay them. Snowball clears the $900 card in about two months — a quick win — then rolls its payment into the next. Avalanche starts on the same $900 card here (it is also the most expensive), then takes the 21% card before the 9% loan. In this example the two methods attack in the same order, so they cost the same and finish together. When the smallest debt is also the cheapest, the gap widens; when rates are close, it nearly vanishes.",
          "The real variable is adherence. A plan followed for 18 months beats a theoretically better plan abandoned in month four. If quick wins keep you going, the snowball's modest extra interest is a fair price for finishing. If you are motivated by the numbers themselves, avalanche is strictly better. Either way, the plan fails without a small emergency buffer — one surprise expense on a cleared card restarts the cycle."
        ],
        "bullets": [
          "Always pay every minimum first; missed payments cost more than any ordering saves.",
          "Automate the extra payment for payday so the plan does not depend on willpower.",
          "Stop adding to the cards while paying them off — new charges refill the hole."
        ]
      },
      {
        "heading": "How the avalanche works",
        "paragraphs": [
          "List your debts by APR, highest first. Pay the minimum on every account, and send every extra dollar to the debt with the highest rate. When that debt clears, its payment rolls into the next-highest rate, and so on until nothing is left. The order never changes unless a rate changes.",
          "The method wins on arithmetic. Interest accrues as a percentage of the balance, so a dollar of principal removed from a 26% card saves 26 cents a year, while the same dollar on a 9% loan saves 9 cents. The gap compounds monthly: the high-rate balance shrinks fastest, so the total interest shrinks fastest too.",
          "The cost of the method is time to the first win. The highest-rate debt is often a large card balance, so the first cleared account can be months away. If the top-rate debt is $8,000 and the extra payment is $200 a month, the first win is more than a year out. That is the avalanche's only weakness, and it is psychological, not mathematical."
        ]
      },
      {
        "heading": "How the snowball works",
        "paragraphs": [
          "List your debts by balance, smallest first. Pay the minimum on every account, and send every extra dollar to the smallest balance. When it clears, roll its payment into the next-smallest balance. The order follows size, not rate.",
          "The mechanism is behavioral. Each cleared account is a finished task: the number of monthly payments shrinks, the list gets shorter, and the plan produces visible proof that it is working. For someone who has quit payoff plans before, that proof is worth more than the interest the other order would have saved.",
          "The cost is measurable. The snowball leaves high-rate balances standing longer, so more interest accrues while the small debts clear. How much more depends on the spread between your rates. When rates are close — say 19% and 22% — the gap is small. When one card charges 29.99% and a loan charges 7%, the gap is at its largest."
        ]
      },
      {
        "heading": "The rule both methods share",
        "paragraphs": [
          "Both methods agree on the structure: minimums on everything, extra money to one target, and the freed payment rolled forward when a debt clears. The rollover is the engine. Without it, clearing a debt just frees money for spending, and the plan stalls exactly when it should accelerate.",
          "Both also need the same guardrails. Stop adding charges to the cards being paid off, and hold a small emergency buffer — $500 to $1,000 — so one car repair does not land back on a cleared card. A plan that ignores either fails the same way under both methods.",
          "And both assume the minimums are paid on time, every month. A missed payment costs a late fee, can trigger a penalty APR, and damages the credit score the plan is quietly repairing. Automate the minimums, and automate the extra payment for payday, so the plan does not depend on remembering."
        ]
      },
      {
        "heading": "When the methods disagree: a second example",
        "paragraphs": [
          "The two methods only diverge when the smallest debt is not the most expensive. Take three debts: a $600 store card at 18%, a $5,000 card at 26%, and a $2,000 loan at 8% with a $90 monthly payment. Total: $7,600, with $600 a month to pay them. Card minimums are interest plus 1% of the balance, and no new charges are added.",
          "Avalanche attacks the 26% card first and clears it in month 12. Snowball clears the $600 card in month 2, then the loan, then the big card. Both methods finish in 15 months. Avalanche costs $955 in interest; snowball costs $1,209. The gap is $254 — about $17 a month — and snowball's first win comes ten months sooner.",
          "That is the typical shape of the trade-off: the same finish line, a modest interest gap, and a large difference in when the first debt disappears. The gap grows when the rate spread widens and the high-rate balance is large; it shrinks to nothing when the smallest debt is also the most expensive, as in the first example above."
        ],
        "table": {
          "head": [
            "Method",
            "Payoff order",
            "First debt cleared",
            "Months to debt-free",
            "Total interest"
          ],
          "rows": [
            [
              "Avalanche (highest APR first)",
              "Big card, small card, loan",
              "Big card, month 12",
              "15",
              "$955"
            ],
            [
              "Snowball (smallest balance first)",
              "Small card, loan, big card",
              "Small card, month 2",
              "15",
              "$1,209"
            ]
          ]
        }
      },
      {
        "heading": "Why the payment size matters more than the method",
        "paragraphs": [
          "In the example above, switching from snowball to avalanche saves $254. Raising the monthly payment from $600 to $750 — same debts, same avalanche order — saves $220 and cuts three months off the plan. A $150 increase in the payment is worth almost as much as the entire method choice.",
          "The reason is arithmetic. Interest is charged on the outstanding balance every month, so every extra dollar of principal paid now removes interest from every month that follows. Early extra payments are the most valuable ones a borrower can make, and the payment is the part of the plan you control directly.",
          "The practical conclusion: spend the optimization effort on the payment, not the order. An extra $100 a month beats the perfect method at the old payment. Cancel subscriptions you have not used in a month, cook the five most frequent takeout meals at home, and route windfalls — tax refunds, bonuses, rebates — straight to the target debt."
        ]
      },
      {
        "heading": "What the research says about finishing",
        "paragraphs": [
          "The snowball's case rests on behavior, and it has evidence behind it. In 2012, researchers David Gal and Blakeley McShane at Northwestern University's Kellogg School of Management analyzed repayment records for about 6,000 people in a debt settlement program. They found that closing individual accounts — regardless of the dollar amount closed — predicted whether a person eliminated their entire debt. The share of accounts closed was a better predictor of finishing than the share of dollars repaid.",
          "A 2011 experiment by Amar and colleagues, published in the same journal, found the same instinct in controlled settings: people tend to focus on closing small balances even when a larger balance carries a higher rate. The preference for small wins is not a failure of reasoning; it is how motivation works on long goals.",
          "Read the limits with the finding. The 6,000 people in the Gal and McShane study were in a debt settlement program — they could not meet their minimum payments — so the result describes people in serious difficulty, not every borrower. And neither study says the snowball is cheaper. It says the snowball helps some people finish, and finishing is what saves the money.",
          "The honest summary: avalanche wins the arithmetic, snowball has evidence for adherence, and the gap between them is usually small enough that the method you will finish is the right one."
        ]
      },
      {
        "heading": "The hybrid: one quick win, then avalanche",
        "paragraphs": [
          "The two methods are not exclusive. A common hybrid: clear one small debt first for the win, then switch to avalanche for the rest. The cost is the interest that accrues on the high-rate balance during the month or two the small debt takes — usually tens of dollars.",
          "The hybrid fits when the smallest debt is small enough to clear in one or two payments and the highest-rate debt is large. If the smallest debt would take six months to clear, the hybrid is just the snowball with extra steps, and the interest cost grows with every month the expensive balance waits.",
          "Set the switch in advance — 'after the store card, avalanche' — and automate it. A hybrid decided month by month drifts into paying whichever balance feels worst, which is no method at all."
        ]
      },
      {
        "heading": "How to choose in five minutes",
        "paragraphs": [
          "Run both orders through a debt payoff calculator with your real balances and rates. The output — months and total interest for each — turns a philosophy question into a price: the snowball costs $X more and delivers the first win Y months sooner. Then decide whether that price is worth it.",
          "Whatever you choose, write the order down and automate the payments. A method chosen once and automated beats a method reconsidered every month."
        ],
        "bullets": [
          "Rates within a few points of each other: the gap is small — pick the method you prefer and move on.",
          "One rate far above the rest, such as a 29.99% store card next to a 9% loan: avalanche saves real money, and snowball's win costs more.",
          "You have quit a payoff plan before: snowball's early wins are worth paying for.",
          "The smallest debt is also the most expensive: the methods agree, and there is no choice to make.",
          "Many small debts: snowball clears accounts fast and shrinks the number of monthly payments, which simplifies the budget."
        ]
      },
      {
        "heading": "Mistakes that undo either method",
        "paragraphs": [
          "Most payoff plans fail on execution, not on method choice. The errors below cost more than the gap between avalanche and snowball.",
          "One more: comparing your plan to someone else's. The right comparison is your plan against your own minimums-only baseline, not against a stranger's payoff story."
        ],
        "bullets": [
          "Paying only minimums while deciding: every month of minimums-only payments is a month of full interest on the whole balance.",
          "Not rolling payments forward: when a debt clears, its payment must move to the next target the same month, or the plan loses its compounding.",
          "Adding new charges to a card being paid off: new spending refills the balance as fast as payments empty it.",
          "Skipping the emergency buffer: without $500 to $1,000 set aside, the first surprise expense goes back on a card.",
          "Closing the oldest card after paying it off: it can shorten your credit history and raise utilization on the cards that remain. Keep it open with a zero balance.",
          "Ignoring a rate change: a promo expiry or penalty APR can reorder which debt is most expensive. Check rates every few months."
        ]
      },
      {
        "heading": "After the last debt is gone",
        "paragraphs": [
          "The month the final debt clears, redirect the payment — in the second example above, $600 a month — into savings before spending absorbs it. That single redirect builds $7,200 in a year, which is a three-month emergency fund for many households, and the fund is what keeps the next surprise from becoming the next balance.",
          "Keep the budget that got you out. The spending plan that funded the extra payments is the same plan that funds savings now. Loosen it slightly if it felt punishing — a plan you keep beats a plan you abandon — but keep the automatic transfer to savings in place.",
          "Use credit deliberately from here on. Pay statement balances in full, keep utilization low, and keep the oldest card open. If debt creeps back, one month of carrying a balance is a warning, not a failure — return to the list and the method that worked before."
        ]
      },
      {
        "heading": "What changes the gap between the methods",
        "paragraphs": [
          "Three factors decide how much the method choice costs. The first is the rate spread: the wider the gap between your highest and lowest rate, the more the avalanche saves. A 29.99% store card next to a 7% loan is the widest common spread, and the gap there is the largest it gets. When every rate sits within a few points, the methods cost nearly the same.",
          "The second is balance distribution. Avalanche gains most when the high-rate debt is large, because that is where the interest accrues. A $200 balance at 29.99% costs about $5 a month in interest; the order barely matters for it. A $9,000 balance at 26% costs about $195 a month — that is the balance the order is really about.",
          "The third is promo rates. A 0% balance transfer sits at the bottom of the avalanche order while the promo lasts — but only until it expires. Order by the rate that will apply when you reach the debt, not today's rate. A transfer with three months left at 0% and a 24% rate after is a high-rate debt wearing a low-rate label, and it should be attacked before the window closes.",
          "The payment size cuts the other way: the larger the extra payment, the smaller the gap in months, because both methods finish sooner and less interest accrues overall. The dollar gap shrinks too, though it rarely vanishes entirely."
        ]
      },
      {
        "heading": "When neither method is the answer",
        "paragraphs": [
          "Both methods assume the minimums fit the budget with something left over. When they do not — when minimum payments already exceed what is left after essentials — no payoff order fixes the problem. The plan has to change shape.",
          "The first call is to the creditors. Most have hardship programs they do not advertise: reduced payments for six to twelve months, waived late fees, or a fixed payoff plan with a set end date. Call before missing a payment — the negotiating position is strongest while the account is current — and ask for the hardship or retention department.",
          "A nonprofit credit counseling agency can build a debt management plan: one monthly deposit to the agency, which pays creditors at reduced rates it has negotiated. Plans typically take 48 months or more, and you may have to agree not to open or use new credit while enrolled. Look for an agency affiliated with the National Foundation for Credit Counseling or the Financial Counseling Association of America, and get any fees in writing before signing.",
          "Bankruptcy is the last resort, for when debts exceed what can realistically be repaid even with a plan. Chapter 7 and Chapter 13 are the two main types for individuals; some debts, including child support and most student loans, generally are not discharged. Filing requires credit counseling first. This is general information only; a bankruptcy attorney can advise on a specific situation.",
          "Avoid the middle options that make things worse: for-profit debt settlement companies that tell you to stop paying creditors while they negotiate, and payday loans to cover minimums. The CFPB has found that four out of five payday loans are rolled over or renewed rather than repaid."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Can I mix both methods?",
        "answer": "Yes. A common hybrid is to clear one small debt for momentum, then switch to avalanche for the rest. The math cost is small — usually tens of dollars of extra interest while the small debt clears — and the motivation is real. Set the switch point in advance and automate it, so the hybrid does not drift into paying whichever balance feels worst that month."
      },
      {
        "question": "Does the order affect my credit score?",
        "answer": "Barely. Credit scores respond to balances falling, utilization dropping, and payments arriving on time — not to the order you chose. The snowball can improve utilization slightly faster on individual cards by zeroing one out, but the effect is small. Either method raises your score the same way: lower balances and an unbroken run of on-time payments."
      },
      {
        "question": "Which method pays off debt fastest?",
        "answer": "Usually the avalanche, by a small margin — it removes the most expensive debt first, so less interest accrues along the way. But the difference is often a month or nothing: in the worked example in this guide both methods finish in 15 months. The payment size moves the finish line far more than the order does."
      },
      {
        "question": "What if my smallest debt is also my most expensive?",
        "answer": "Then the two methods agree and there is no choice to make — both attack the same debt first. That is common: small store cards and retail balances often carry the highest rates. Check whether your smallest and most expensive debts are the same account before spending time choosing a method."
      },
      {
        "question": "Should I build an emergency fund before paying off debt?",
        "answer": "Build a small one first: $500 to $1,000 in a separate savings account, before attacking the debts aggressively. Without it, the first car repair or medical bill goes straight back onto a card and undoes months of progress. The full emergency fund — three to six months of expenses — comes after the expensive debt is gone."
      }
    ],
    "published": "2026-11-06",
    "type": "Comparison",
    "sources": [
      {
        "label": "CFPB — Debt Collection",
        "url": "https://www.consumerfinance.gov/consumer-tools/debt-collection/"
      },
      {
        "label": "Federal Reserve — Consumer Credit (G.19)",
        "url": "https://www.federalreserve.gov/releases/g19/current/"
      },
      {
        "label": "Kellogg School of Management — The 'snowball approach' to debt",
        "url": "https://www.kellogg.northwestern.edu/News_Articles/2012/snowball-approach.aspx"
      }
    ],
    "cornerstone": false,
    "inlineImage": "/images/avalanche-vs-snowball-debt-payoff-inline.jpg",
    "inlineImageAlt": "Flat illustration of snowballs rolling down emerald slopes past shrinking stacks of orange debt blocks"
  },
  {
    "cornerstone": false,
    "description": "How credit card interest is calculated: average daily balance, grace periods, and why minimum payments keep you in debt — with the numbers statements hide.",
    "faqs": [
      {
        "answer": "Trailing interest: interest accrued between the statement date and the day your payment posted. It appears on the next statement even after the balance is cleared. It is usually a few dollars, and it is not an error — pay it, and pay the next statement in full as well, and the cycle closes.",
        "question": "Why did I pay interest in a month I paid the statement balance?"
      },
      {
        "answer": "It pauses interest for the promo window — usually 12 to 21 months — minus a 3–5% transfer fee. It helps if the balance is gone before the window closes; whatever remains then reverts to the standard APR. Divide the transferred balance by the promo months first: if your budget cannot cover that payment, transfer only the portion you can clear in time.",
        "question": "Does a 0% balance transfer help?"
      },
      {
        "answer": "Daily, in effect. The issuer divides the APR by 365 to get a daily rate and applies it to each day's balance; the charges are then totaled and billed once a month. That is why the timing of payments matters: a payment early in the cycle lowers the balance for more days than the same payment on the due date.",
        "question": "Is credit card interest charged daily or monthly?"
      },
      {
        "answer": "Yes, in a narrow sense. Unpaid interest is added to your balance, and next month's interest is charged on that larger total. At 24% APR the effect is about 2% a month — small in one month, material over a year of minimum payments. It is why a balance left alone grows even with no new spending.",
        "question": "Can interest be charged on interest?"
      },
      {
        "answer": "Below the national average: the Federal Reserve's G.19 release puts the average at 21.19% across all card accounts and 22.36% on accounts that paid interest, in August 2026. A purchase APR under 21% is good by that measure. The best rates go to strong credit profiles; if yours is well above the average, ask your issuer for a lower rate.",
        "question": "What is a good APR for a credit card?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/how-credit-card-interest-works.jpg",
    "imageAlt": "Illustration of credit card interest: a card with a circular percentage motif",
    "inlineImage": "/images/how-credit-card-interest-works-inline.jpg",
    "inlineImageAlt": "Flat illustration of a deep-emerald credit card with burnt-orange arrows circling it and a tall stack of sage coins",
    "intro": "Credit card interest is not charged on what you spent. It is charged on your average daily balance, at a daily rate derived from an APR that now averages above 20% — and the grace period that protects new purchases disappears the moment you carry any balance at all.",
    "published": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Credit Card Calculator",
        "url": "/loans/credit-card-calculator"
      },
      {
        "name": "Credit Card Payoff Calculator",
        "url": "/personal-wealth/credit-card-payoff-calculator"
      },
      {
        "name": "APR Calculator",
        "url": "/loans/apr-calculator"
      },
      {
        "name": "Interest Calculator",
        "url": "/personal-wealth/interest-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "Interest is calculated on average daily balance, not the statement balance.",
          "Cash advances and balance transfers often have separate, higher APRs and no grace period.",
          "Two payments a month (splitting payday) slightly reduces the average daily balance."
        ],
        "heading": "The mechanics",
        "paragraphs": [
          "Issuers divide the APR by 365 to get a daily rate — 24% APR becomes 0.0658% per day — and apply it to the average of each day's balance across the cycle. On a steady $5,000 balance that is about $100 a month, $1,200 a year, for borrowing money you already spent. Pay in full every month and the grace period means you pay none of it. Carry even $50 past the due date and interest accrues on new purchases from the day they post, on most cards.",
          "Minimum payments are typically the interest plus about 1% of the balance, or a small fixed floor. On that $5,000 balance at 24%, paying only the minimum takes roughly 18 years and costs about $6,800 in interest — more than the original spending. A fixed $200 payment instead clears it in about 32 months with roughly $1,750 of interest. Same card, same balance; the payment rule is the whole difference."
        ]
      },
      {
        "heading": "What the average APR actually is",
        "paragraphs": [
          "The Federal Reserve publishes two averages, and they answer different questions. Its G.19 release puts the average APR at 21.19% across all credit card accounts, and 22.36% on accounts assessed interest — cards that actually paid a finance charge — in August 2026. If you carry a balance, the second number is the one that describes you.",
          "The gap exists because the all-accounts average includes people who pay in full and never see a finance charge. The assessed-interest figure is computed backwards from what was actually billed: total finance charges divided by the balances they were charged on. It is the better yardstick for the cost of carrying debt.",
          "The scale is large: revolving credit — mostly credit card balances — stood at $1,368.5 billion in September 2026, per the same release. At the assessed-interest average, a $5,000 balance costs about $93 a month in interest. Your own card's rate is printed in your cardholder agreement and on your statement; the average tells you whether yours is high or low, not what you pay.",
          "Most card APRs are variable: the prime rate plus a margin the issuer sets from your credit profile. When the Federal Reserve moves rates, variable card APRs follow, usually within one or two billing cycles. A card that cost 19% two years ago can cost 24% now without the issuer changing anything about you."
        ]
      },
      {
        "heading": "How your issuer picks the balance",
        "paragraphs": [
          "The average daily balance method is the standard. The issuer adds up your balance at the end of each day in the cycle and divides by the number of days. Every day a charge posts, the balance — and the interest — rises from that day onward. A $1,000 purchase made on day 2 of a 30-day cycle costs roughly twice the interest of the same purchase made on day 16, because it sits in the balance for twice as many days.",
          "A few issuers use the adjusted balance method instead: they subtract payments made during the cycle before calculating interest, which slightly favors the cardholder. Others use the previous balance method, charging on the balance at the start of the cycle and ignoring payments made since. Your cardholder agreement names the method; most large issuers use average daily balance.",
          "One method is now illegal. Before the CARD Act of 2009, some issuers used two-cycle (double-cycle) billing: interest calculated on the average daily balance across the current and previous cycles. Pay off 90% of a $1,000 balance and you could still be charged interest on the full $1,000 the next month. The CARD Act banned charging interest on balances from cycles before the most recent one.",
          "The practical consequence: the timing of payments matters. Paying early in the cycle lowers the average daily balance more than paying the same amount on the due date, because the lower balance counts for more days."
        ]
      },
      {
        "heading": "The grace period, and how you lose it",
        "paragraphs": [
          "A grace period is the window between the end of a billing cycle and the payment due date — at least 21 days, because the CARD Act requires issuers to deliver statements at least 21 days before the due date. Pay the full statement balance within it and new purchases accrue no interest at all. That is the only free borrowing a credit card offers.",
          "The protection is conditional. Carry any balance past the due date and the grace period disappears: on most cards, new purchases start accruing interest from the day they post, not from the next statement. A cardholder who revolves even $50 pays interest on every new purchase from day one.",
          "Getting the grace period back takes more than one good month. Issuers generally restore it only after the statement balance is paid in full, and some require two consecutive full payments before the grace period returns. Your cardholder agreement states the exact rule for your card — the CFPB's guidance is the same: the rules vary by issuer, and the agreement governs.",
          "Note that no law requires every card to offer a grace period at all. Most do, but the terms are in the agreement, and cards designed for rebuilding credit sometimes offer none. If your card has no grace period, every purchase accrues interest from the day it posts, and paying in full is the only way to stop it."
        ]
      },
      {
        "heading": "Why minimum payments take so long",
        "paragraphs": [
          "A minimum payment typically covers that month's interest plus about 1% of the balance, or a small fixed floor. Most of the money services the debt; the balance barely moves. And as the balance falls, the minimum falls with it, so the payment shrinks exactly when it should stay fixed.",
          "The CARD Act forces issuers to show the consequence on every statement: how long the balance takes to clear on minimum payments alone, how much interest that costs, and the monthly payment that would clear it in three years. That disclosure is the most honest number your issuer gives you.",
          "The table below shows the same $5,000 balance at 24% APR under four fixed monthly payments, with no new charges and interest applied monthly on the outstanding balance. Raising the payment from $150 to $300 cuts the payoff time from 56 months to 21 and saves $2,179 in interest. The payment size, not the rate, is the lever the cardholder controls."
        ],
        "table": {
          "head": [
            "Fixed monthly payment",
            "Months to pay off",
            "Total interest"
          ],
          "rows": [
            [
              "$150",
              "56",
              "$3,322"
            ],
            [
              "$250",
              "26",
              "$1,449"
            ],
            [
              "$300",
              "21",
              "$1,143"
            ],
            [
              "$400",
              "15",
              "$812"
            ]
          ]
        }
      },
      {
        "heading": "Cash advances and balance transfers: different rules",
        "paragraphs": [
          "Not all balances on one card share one rate. Cash advances usually carry a separate, higher APR — and no grace period. Interest starts the day the cash is withdrawn, plus a fee, usually a percentage of the amount advanced. A cash advance is the most expensive way to use a card, and it should be the last resort it is priced as.",
          "Balance transfers work the other way: a 0% promotional APR for 12 to 21 months, minus a transfer fee of 3% to 5% of the amount moved. During the window, every dollar of payment reduces principal. Whatever remains when the window closes reverts to the card's standard APR — often higher than the rate you left.",
          "The transfer only pays if the math works: divide the transferred balance by the promo months. A $4,000 balance moved to an 18-month 0% offer with a 3% fee becomes $4,120, which needs $229 a month to clear in time. If your budget cannot cover that, transfer only the portion you can clear inside the window.",
          "Payments on a card with multiple balances are allocated by law in a specific way: the CARD Act requires issuers to apply payments above the minimum to the highest-rate balance first. The minimum itself can go anywhere. That rule is why paying more than the minimum matters twice over on a card carrying both a transfer and new purchases.",
          "One promo deserves a separate warning: deferred interest. Some store cards offer 'no interest if paid in full within 12 months,' but the interest is deferred, not waived — if any of the promotional balance remains when the window closes, interest is charged retroactively on the full original purchase amount, back to day one. The CFPB's own example: a $4,500 purchase paid down to $180, with $1,439.55 of retroactive interest at 31.99% APR when the deadline was missed. About one in five deferred-interest promotional balances end up charged retroactive interest, per CFPB research. A true 0% APR offer charges interest only on the remaining balance after the window; a deferred-interest offer charges it on everything, from the start. The agreement names which kind the offer is — read that line before signing."
        ]
      },
      {
        "heading": "When your rate can go up",
        "paragraphs": [
          "The CARD Act limits rate increases. During the first year after you open an account, the issuer generally cannot raise your APR at all, with limited exceptions. After that, most increases require 45 days' advance written notice — and the notice must explain your right to cancel the account before the increase takes effect.",
          "Increases generally cannot apply to a balance you already carry. The exceptions: a promotional rate expires, a variable rate moves with its index, you complete or fail a hardship program, or you fall more than 60 days behind. In that last case the issuer may apply a penalty APR to the existing balance — but must restore the original rate after six consecutive on-time payments.",
          "Variable-rate changes need no 45-day notice: when the prime rate moves, your APR moves with it. That is how most cardholders' rates rise — not by issuer decision, but by index. A fixed-rate card is not fixed forever either; the issuer can change it with the required notice. Either way, the rate on your statement is the rate that matters, and it can move in both directions."
        ]
      },
      {
        "heading": "Trailing interest and other statement surprises",
        "paragraphs": [
          "Trailing (residual) interest is the most common surprise: interest accrues between the statement date and the day your payment posts. Pay the full statement balance and a small interest charge can still appear on the next statement — the interest on the days between. It is usually a few dollars, and it is not an error.",
          "Fees accrue interest too. A late fee or annual fee added to a revolving balance becomes part of the balance the daily rate applies to. An annual fee on a card you carry a balance on costs its face value plus a year's interest on it.",
          "Interest also compounds in a narrow sense: unpaid interest is added to the balance, and next month's interest is charged on the new total. The effect is small month to month — at 24% APR, unpaid interest adds about 2% to the balance each month — but it is why a balance left alone grows even with no new spending.",
          "The fix for all three is the same: pay the statement balance in full, and when you do, check the next statement for a trailing charge and pay that too. Two consecutive full payments close the loop."
        ]
      },
      {
        "heading": "Fixed vs variable APR",
        "paragraphs": [
          "Most credit cards carry a variable APR: the prime rate plus a margin. The margin reflects your credit profile when you applied — better credit, smaller margin — and it stays fixed while the prime rate moves. When the Federal Reserve raises rates, variable card APRs rise; when it cuts, they fall, usually within one or two billing cycles.",
          "A fixed APR does not move with the prime rate, but 'fixed' is a term of art: the issuer can still change it with 45 days' notice, and penalty and promo rules still apply. Truly fixed-rate cards are rare now; most of the market is variable.",
          "The distinction matters less than the margin. Two cards can share the same prime rate and differ by ten points on margin alone. When comparing cards, compare the margin and the current APR together — and check whether the advertised rate is a range. An offer of '19.99% to 28.99%' assigns your rate from your credit profile; the low end is not the rate most applicants get.",
          "If your rate is well above the 22.36% assessed-interest average, a phone call can help: ask the issuer for a lower APR. Issuers reprice quietly for customers who ask, and a 5-point cut on a $5,000 balance saves about $21 a month in interest."
        ]
      },
      {
        "bullets": [
          "Pay the statement balance in full every month. The grace period makes the card free; nothing else on this list comes close.",
          "Pay early, or twice a month. An early payment lowers the average daily balance for the rest of the cycle.",
          "Pay more than the minimum — a fixed amount, not a percentage. A fixed $300 beats a shrinking minimum by years.",
          "Ask for a lower APR. A 5-point cut on a $5,000 balance saves about $21 a month.",
          "Move a balance to a 0% transfer only if the promo window is long enough to clear it; divide the balance by the months first.",
          "Stop using a card you are paying off. New charges on a revolving card accrue interest from the day they post.",
          "Automate at least the minimum. A missed payment costs a late fee and can trigger a penalty APR."
        ],
        "heading": "How to pay less interest",
        "paragraphs": [
          "Every method below attacks the same two variables: the balance the daily rate applies to, and the number of days it applies.",
          "The order matters: pay in full first if you can; if you cannot, pay as much as possible as early as possible, and attack the highest-rate card first. The interest formula rewards exactly two behaviors — lower balances, sooner payments — and everything else is commentary."
        ]
      },
      {
        "heading": "Reading your statement's interest charge",
        "paragraphs": [
          "Your statement shows the interest charge for the cycle, the APRs that apply to each balance type, and the average daily balance the charge was based on. Those three numbers let you check the math yourself.",
          "The check: average daily balance × APR ÷ 365 × days in the cycle. A $5,000 average daily balance at 24% APR over 30 days is $5,000 × 0.24 ÷ 365 × 30 = $98.63. If your statement's charge is close to that, the math is right; small differences come from the exact daily balances and the number of days in the cycle.",
          "Look for more than one APR. A statement often lists separate rates for purchases, cash advances, and balance transfers, with a separate interest charge for each. The purchase APR is the headline number; the cash advance APR is usually higher, and its interest starts immediately.",
          "The statement also carries the CARD Act disclosure: how long the balance takes to clear on minimum payments, the total interest, and the payment that clears it in three years. Read it every month. If the minimum-payment timeline runs into years, the issuer is telling you, in its own required disclosure, that the minimum is not a plan.",
          "If a charge looks wrong, call the issuer first — most errors are billing-date misunderstandings, not mistakes. If the issuer cannot explain it, you can dispute the charge in writing and file a complaint with the CFPB. Keep the statement; the average daily balance and the APR are the evidence."
        ]
      }
    ],
    "seoTitle": "How Credit Card Interest Is Calculated (APR Explained)",
    "slug": "how-credit-card-interest-works",
    "sources": [
      {
        "label": "CFPB — Credit Cards",
        "url": "https://www.consumerfinance.gov/consumer-tools/credit-cards/"
      },
      {
        "label": "Federal Reserve — Consumer Credit (G.19)",
        "url": "https://www.federalreserve.gov/releases/g19/current/"
      },
      {
        "label": "CFPB — What is a grace period?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/if-i-pay-off-my-credit-card-balance-when-it-is-due-is-the-company-allowed-to-charge-me-interest-for-that-month-en-48/"
      }
    ],
    "title": "How Credit Card Interest Is Calculated (APR Explained)",
    "type": "What",
    "updated": "2026-11-06"
  },
  {
    "slug": "what-is-debt-to-income-ratio",
    "title": "What Is Debt-to-Income Ratio (DTI)? How Lenders Use It in 2026",
    "seoTitle": "What Is Debt-to-Income Ratio (DTI)? Lender Limits 2026",
    "description": "What debt-to-income ratio means, how lenders calculate front-end and back-end DTI, the 2026 limits by loan type, and how to lower yours before applying.",
    "image": "/images/what-is-debt-to-income-ratio.jpg",
    "imageAlt": "Illustration of debt-to-income ratio: a balance scale weighing monthly debt payments against gross income",
    "hub": "Loans & Debt",
    "updated": "2026-11-17",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Debt-to-Income Ratio Calculator",
        "url": "/loans/debt-to-income-ratio-calculator"
      },
      {
        "name": "Home Affordability Calculator",
        "url": "/real-estate/home-affordability-calculator"
      },
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      },
      {
        "name": "FHA Loan Calculator",
        "url": "/real-estate/fha-loan-calculator"
      }
    ],
    "intro": "Your debt-to-income ratio, or DTI, is your total monthly debt payments divided by your gross monthly income. Lenders check it before anything else on a mortgage application, because it measures whether your income can carry another payment. A DTI of 36% or less is comfortable; most loan programs accept up to 43–50%.",
    "sections": [
      {
        "heading": "The two ratios lenders actually check",
        "paragraphs": [
          "Lenders calculate two versions. The front-end ratio counts housing only — mortgage payment, property tax, homeowners insurance and any HOA dues — divided by gross monthly income. The back-end ratio adds every other recurring debt: car loans, student loans, minimum card payments, personal loans and court-ordered payments. The back-end ratio decides most applications.",
          "Both ratios use gross income, before tax — that is the underwriting convention, and tax is not a debt. On a $7,200 monthly salary with $1,850 of housing and $880 of other debts, the front-end ratio is 25.7% and the back-end ratio is 37.9%. Against take-home pay the same debts look far worse: 37.9% of gross is roughly half of a typical pay check after tax.",
          "Only debts on your credit report and your application count. Utilities, groceries, subscriptions, insurance premiums outside the housing payment and childcare do not — which is why a $160 card minimum can matter more to your approval than a $400 grocery bill. Lenders verify debts from the credit report, so a paid-off loan still counts until the next statement cycle updates it."
        ]
      },
      {
        "heading": "Worked example: $86,400 salary, applying for a mortgage",
        "paragraphs": [
          "Take a $86,400 salary — $7,200 a month before tax. Monthly debts: housing $1,850, car loan $430, student loan $290, card minimums $160. Total: $2,730. Back-end DTI is $2,730 ÷ $7,200 = 37.9%; front-end is $1,850 ÷ $7,200 = 25.7%. The calculator bands 37.9% as acceptable but above the 36% comfort line — $138 a month over it, with $366 of headroom before the 43% planning line.",
          "Now pay off the car before applying. Removing $430 of monthly payments drops the back-end ratio to 31.9% — comfortably inside the zone most lenders prefer — and raises the loan amount the ratio allows, because every dollar of debt removed frees a dollar of income against the cap. The same cash added to the down payment would shrink the loan but leave the ratio untouched."
        ]
      },
      {
        "heading": "DTI limits by loan type in 2026",
        "paragraphs": [
          "Limits vary by program, and they are published. Two things are worth noticing. First, the familiar 28/36 figures are guidelines, not law — a lender can approve above them when the rest of the file is strong. Second, every program has a manual number and an automated number, and the automated number is the one most borrowers actually meet.",
          "A 50% DTI approval is real, but it usually needs excellent credit, large cash reserves or a big down payment. The table shows back-end (total) limits unless stated otherwise."
        ],
        "table": {
          "head": [
            "Loan type",
            "Front-end (housing)",
            "Back-end (total)",
            "Notes"
          ],
          "rows": [
            [
              "Conventional (Fannie Mae)",
              "28% guideline",
              "36% manual; up to 45% with strong credit and reserves; up to 50% via Desktop Underwriter",
              "Most common route"
            ],
            [
              "FHA",
              "31%",
              "43% manual underwriting",
              "Up to 40% / 50% with compensating factors; higher with an automated approval"
            ],
            [
              "VA",
              "No fixed limit",
              "41% benchmark",
              "Residual income is the real test"
            ],
            [
              "USDA",
              "29%",
              "41%",
              "Income limits also apply"
            ]
          ]
        }
      },
      {
        "heading": "The 43% rule is gone — what replaced it",
        "paragraphs": [
          "For years, 43% was quoted as a legal ceiling under the original Qualified Mortgage rule. The Consumer Financial Protection Bureau removed that cap in a final rule issued in December 2020, replacing it with a price-based test: a loan generally qualifies if its APR sits within 2.25 percentage points of the average prime offer rate. Lenders have had to use the new definition since October 1, 2022.",
          "The change did not make DTI irrelevant. Lenders must still consider your DTI or residual income, verify your income and debts, and make a reasonable determination that you can repay. The program limits above still apply in practice. What changed is that no single federal number now blocks a mortgage: 43% survives as a planning line — the line this site's calculator uses — but it is a guideline, not a law."
        ]
      },
      {
        "heading": "How to lower your DTI before you apply",
        "paragraphs": [
          "Timing matters: debts leave the ratio only when the credit report updates, usually after the next statement cycle, so pay a loan off at least a month before you apply. And run the ratio on take-home pay as well as gross — lenders use gross, your household lives on net. The worked example's 37.9% of gross is about 50.6% of a typical take-home figure."
        ],
        "bullets": [
          "Pay off small installment loans outright — removing a whole payment beats shrinking a balance whose minimum barely moves.",
          "Pay card balances down, then keep the accounts open; the minimum payment, not the balance, enters the ratio.",
          "Do not open new credit or take on a car loan in the months before applying; every new payment counts, and the inquiry can cost points.",
          "Document every income a lender can count — a second job held two years, rental income, bonuses with a two-year history.",
          "Ask the lender to exclude an installment debt with fewer than 10 payments left; many will."
        ]
      },
      {
        "heading": "What counts as income",
        "paragraphs": [
          "Lenders use gross monthly income — before tax — and only income they can document. Salary and hourly wages are the base. Bonuses, commission, and overtime count when there is a two-year history of receiving them; a first-year bonus usually does not.",
          "A second job counts after two years in it. Rental income counts, usually at 75% of the gross rent to allow for vacancies and maintenance, minus the property's own housing payment — and a negative result counts against you as a debt. Self-employment income is averaged from two years of tax returns, which means a strong recent year does not outweigh a weak one.",
          "Alimony and child support you receive count, but only if you choose to disclose them — a lender cannot require it. Social Security, VA disability, and other government benefits count as income, documented by award letters rather than pay stubs.",
          "What does not count: income you cannot document, a raise that has not started, and a roommate's contribution unless they are on the loan. If the money does not appear on pay stubs, tax returns, or benefit letters, the underwriter cannot use it.",
          "The practical move is to gather the documents before you apply: two years of W-2s and tax returns, recent pay stubs, and award letters for any benefits. A lender can only count what the file proves, and a missing document delays the answer more than a low number does."
        ]
      },
      {
        "heading": "How the cap sets your housing budget",
        "paragraphs": [
          "The back-end cap works backwards into a maximum housing payment. Take the worked-example household: $7,200 gross monthly income, $880 in non-housing debts. At the 43% planning line, total monthly debts cannot exceed $3,096 — so the maximum housing payment is $3,096 minus $880, or $2,216.",
          "At the 36% comfort line, the maximum total is $2,592 and the housing ceiling falls to $1,712. At Fannie Mae's 50% automated ceiling, the total reaches $3,600 and housing $2,720 — but that approval needs excellent credit and reserves, and the payment would consume half of gross income.",
          "Remember that 'housing' in the front-end ratio means the full payment: principal and interest, property tax, homeowners insurance, and HOA dues. A $2,216 housing ceiling does not mean a $2,216 mortgage payment — taxes and insurance come out of it first, and in a high-tax area they take a large share of the allowance.",
          "The leverage runs both ways. Every dollar of non-housing debt removed raises the housing ceiling by a dollar. Paying off the $430 car loan in the example lifts the 43% housing ceiling from $2,216 to $2,646 — which is why paying down debt before applying can matter more than saving a larger down payment."
        ]
      },
      {
        "heading": "DTI for loans other than mortgages",
        "paragraphs": [
          "Mortgages publish their DTI limits; most other lending does not. Auto lenders weigh DTI alongside credit score and loan-to-value, but there is no published cap — approvals happen across a wide range, and a high DTI more often shows up as a higher rate than as a denial.",
          "Personal loan lenders do the same: DTI is one input among several, and a low score plus a high DTI is the combination that draws denials. There is no standard cap; each lender sets its own, and most keep the cutoff private.",
          "Credit card issuers rarely calculate a formal DTI. They ask for income on the application and check the debts on your credit report, but approval turns more on score and utilization. A high DTI can still cost you: it often means high utilization, which lowers the score the issuer actually reads.",
          "Student loans are the exception that proves the rule. Federal income-driven repayment plans do not use DTI at all — they use discretionary income, a formula based on your income and the federal poverty line. That is a different test for a different question: what you can pay, not what you already owe."
        ]
      },
      {
        "heading": "Why your lender's DTI differs from yours",
        "paragraphs": [
          "Borrowers often calculate a lower DTI than their lender does. The most common reason is student loans: when a credit report shows a $0 payment — deferment, forbearance, or an income-driven plan — lenders substitute a calculated payment instead of counting zero.",
          "The substitute depends on the program. Fannie Mae uses 1% of the outstanding balance for deferred or forborne loans, or a fully amortizing payment based on the loan's terms. FHA and Freddie Mac use 0.5% of the balance when the report shows $0. On a $45,000 deferred balance, that is $450 a month under Fannie Mae's rule and $225 under FHA's — a $225 difference that moves the worked-example household's back-end DTI from 41.0% to 44.2%.",
          "One exception: Fannie Mae may accept a documented $0 income-driven payment as $0, which removes the loan from the ratio entirely. The documentation must come from the servicer — the credit report alone is not enough.",
          "Other surprises: co-signed loans count as yours unless you can prove someone else paid them for 12 months; debts in deferment still count; and an installment debt with fewer than 10 payments left can often be excluded, as noted above. The lender's number is the one that decides the application, so calculate with the lender's rules, not yours."
        ]
      },
      {
        "heading": "DTI vs credit score: which matters more",
        "paragraphs": [
          "They answer different questions. The credit score asks whether you pay debts on time; DTI asks whether your income can carry another payment. A lender needs both answers, and a strong score does not excuse a DTI over the cap — or the reverse.",
          "The score mostly sets the price: the rate and the terms. DTI mostly sets the capacity: the loan amount and whether the application is approved at all. A borrower with a 780 score and a 52% DTI is likely to be denied; a borrower with a 680 score and a 30% DTI is likely to be approved at a higher rate.",
          "The two overlap in one place: credit card balances. High balances raise utilization, which lowers the score, and raise minimum payments, which raise DTI. Paying balances down is the only move that improves both numbers at once — which is why it is usually the best pre-application step a borrower can take."
        ]
      },
      {
        "heading": "How lenders verify your numbers",
        "paragraphs": [
          "The DTI on your application is a claim; underwriting verifies it. Income comes from recent pay stubs, two years of W-2s, and tax returns for anyone self-employed or with variable income. The lender may call your employer to confirm the job and the pay — a verification of employment — sometimes days before closing.",
          "Debts come from the credit report, pulled at application and often again before closing. A loan you paid off counts until the next statement cycle updates the report, which is why the timing advice in this guide matters: pay debts off at least a month before applying.",
          "Two behaviors cause problems mid-process. Opening new credit adds a payment to the ratio and an inquiry to the report. Large unexplained deposits draw questions, because the lender must confirm the money is yours and not a loan. Between application and closing, keep your finances boring: no new accounts, no big moves, no surprises."
        ]
      },
      {
        "heading": "DTI on a joint application",
        "paragraphs": [
          "On a joint application, the lender combines both applicants' gross monthly income and both applicants' monthly debts. Adding a second borrower helps when their income is large relative to their debts, and hurts when the reverse is true. The ratio is what matters, not the headcount.",
          "Worked example: one applicant earns $5,000 a month with $1,500 in debts — a 30% DTI. Their partner earns $3,000 with $1,200 in debts — 40% alone. Together: $8,000 of income and $2,700 of debts, a 33.75% DTI. The joint ratio sits between the two, weighted by income. A partner with high debts and low income can push the joint ratio above the solo one.",
          "Leaving a spouse off the loan removes their income and usually their debts — except in community property states. Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, and Wisconsin treat debts acquired during marriage as shared, and on FHA, VA, and USDA loans the lender must count a non-borrowing spouse's debts in the ratio even though their income cannot be used. Conventional loans generally do not apply this rule. VA loans soften it: the spouse's income can be used to offset those debts.",
          "The decision is a calculation, not a default. Run the ratio both ways — solo and joint — before applying, and ask the loan officer how your state and program treat a non-borrowing spouse."
        ]
      },
      {
        "heading": "Common DTI mistakes",
        "paragraphs": [
          "Most DTI errors are avoidable, and most of them make the ratio look better than the lender will calculate it.",
          "The pattern: the lender's ratio is almost always less generous than the borrower's. Calculate with the lender's rules, leave a margin, and re-check the number after every change to debts or income."
        ],
        "bullets": [
          "Using take-home pay: lenders use gross income, so a ratio computed on net pay comes out higher than the lender's number — and the lender's number is the one that decides.",
          "Forgetting co-signed loans: a loan you co-signed counts as yours unless you can prove someone else paid it for 12 months.",
          "Counting a debt you are about to pay off: it counts until the credit report updates, usually after the next statement cycle.",
          "Ignoring deferred student loans: a $0 payment on the report becomes 1% or 0.5% of the balance, depending on the program.",
          "Opening new credit before closing: every new payment counts, and the lender often pulls credit again before closing.",
          "Assuming the ratio is fixed: paying down a card the month before applying can move the number, but only after the statement cycle updates."
        ]
      },
      {
        "heading": "DTI bands at a glance",
        "paragraphs": [
          "The table below shows how lenders generally read the back-end ratio. These are rules of thumb, not published limits — the program limits in the table above govern actual approvals — but they are a useful way to read your own number before you apply.",
          "The line that matters most is 36%: below it, most programs approve comfortably. Between 36% and 43%, approval is routine but the file needs to be clean elsewhere. Above 43%, you are relying on automated approval or compensating factors — and above 50%, on an exception."
        ],
        "table": {
          "head": [
            "Back-end DTI",
            "How lenders read it"
          ],
          "rows": [
            [
              "Under 20%",
              "Excellent — ample room for a new payment"
            ],
            [
              "20–35%",
              "Good — comfortable for most programs"
            ],
            [
              "36–43%",
              "Acceptable — the standard approval range"
            ],
            [
              "44–50%",
              "Tight — needs strong credit, reserves, or automated approval"
            ],
            [
              "Over 50%",
              "Difficult — exceptions only"
            ]
          ]
        }
      }
    ],
    "faqs": [
      {
        "question": "What DTI do I need to qualify for a mortgage?",
        "answer": "It depends on the program. Fannie Mae allows up to 50% back-end DTI through Desktop Underwriter, 36% on manual underwriting and up to 45% with strong credit and reserves. FHA's standard is 31% housing and 43% total for manual underwriting; VA and USDA use 41% as a benchmark. Lenders may add their own caps."
      },
      {
        "question": "Is 43% still the legal DTI limit for a qualified mortgage?",
        "answer": "No. The CFPB removed the 43% cap from the Qualified Mortgage rule in December 2020 and replaced it with a price-based test, with mandatory compliance from October 1, 2022. The 43% figure survives as a lender guideline and as a planning line, but it is no longer a federal limit."
      },
      {
        "question": "Does DTI affect my credit score?",
        "answer": "Not directly. Income is not part of a credit report, so the ratio never appears in scoring. But the ingredients overlap: high card balances raise utilisation (lowering your score) and raise minimum payments (raising your DTI). Paying balances down improves both numbers at once."
      },
      {
        "question": "What counts as debt in my DTI?",
        "answer": "Recurring monthly obligations: housing, car and student loans, card minimums, personal loans, child support and alimony. Utilities, groceries, subscriptions, insurance premiums outside the housing payment and childcare do not count — lenders use the debts on your credit report, not your full cost of living."
      },
      {
        "question": "Can I get a mortgage with a 50% DTI?",
        "answer": "Yes, through some programs: Fannie Mae's automated system accepts up to 50% back-end DTI, and FHA approvals can reach 50% with compensating factors. But approval at that level usually needs excellent credit, substantial cash reserves or a large down payment — and the payment will consume half your gross income, so check it against take-home pay first."
      }
    ],
    "published": "2026-11-17",
    "type": "What",
    "sources": [
      {
        "label": "CFPB — What Is a Debt-to-Income Ratio?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/"
      },
      {
        "label": "CFPB — What Is a Qualified Mortgage?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-qualified-mortgage-en-1789/"
      },
      {
        "label": "eCFR — 38 CFR § 36.4340, VA underwriting standards (41% DTI and residual income)",
        "url": "https://www.ecfr.gov/current/title-38/section-36.4340"
      }
    ],
    "cornerstone": false,
    "inlineImage": "/images/what-is-debt-to-income-ratio-inline.jpg",
    "inlineImageAlt": "Flat illustration of a balance scale weighing a house against a stack of coins"
  },
  {
    "cornerstone": true,
    "description": "How to get out of debt: list every balance, choose avalanche or snowball, find extra money, and use balance transfers and consolidation the right way.",
    "faqs": [
      {
        "answer": "Do both in order: build a small emergency buffer of $500 to $1,000 first, so one surprise bill does not land back on a card. Then attack high-interest debt with every spare dollar. If your employer offers a 401(k) match, contribute enough to get the full match first — that is an immediate return no debt payoff beats — then return to the debts.",
        "question": "Should I pay off debt or save first?"
      },
      {
        "answer": "Avalanche costs less interest because it targets the highest rate first; snowball clears the first debt sooner, which keeps motivation up. In the worked example in this guide, avalanche saved $226 over 21 months while snowball cleared its first debt five months sooner. Pick the method you will actually finish — the difference is small compared with the cost of quitting.",
        "question": "Is the avalanche or snowball method better?"
      },
      {
        "answer": "Paying down revolving balances usually helps your score, because credit utilization — the share of available credit you use — falls as balances drop. Closing your oldest card can shorten your credit history, so keep it open with a zero balance. Your score may dip briefly when an installment loan closes, but the long-term trend from lower balances and on-time payments is positive.",
        "question": "Will paying off debt hurt my credit score?"
      },
      {
        "answer": "Yes. A consolidation loan is optional. The core plan — pay minimums on everything, throw every extra dollar at one target debt, and roll each freed payment into the next — clears debt without any new borrowing. In the worked example, the avalanche method alone cleared $11,400 in 21 months. Consolidation helps mainly when it cuts your rate or simplifies many payments into one.",
        "question": "Can I get out of debt without a consolidation loan?"
      },
      {
        "answer": "Bankruptcy is a last resort, for when debts exceed what you can realistically repay even with a plan — not a shortcut around a budget. The two main types for individuals are Chapter 7 and Chapter 13, and some debts, including child support and most student loans, generally are not discharged. Filing requires credit counseling first. This is general information only; a bankruptcy attorney can advise on your situation.",
        "question": "When should I consider bankruptcy?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/how-to-get-out-of-debt.jpg",
    "imageAlt": "Flat illustration of a chain breaking apart above a wallet with a rising bar chart",
    "inlineImage": "/images/how-to-get-out-of-debt-inline.jpg",
    "inlineImageAlt": "Flat illustration of a snowball rolling downhill past shrinking stacks of coins",
    "intro": "Getting out of debt comes down to three moves: list every balance with its rate and minimum, pay minimums on all of them, and throw every spare dollar at one target debt until it is gone. The order you attack them in matters less than the size of the extra payment. This guide works through the whole plan with numbers.",
    "published": "2026-09-20",
    "readMinutes": 18,
    "relatedTools": [
      {
        "name": "Debt Payoff Calculator",
        "url": "/loans/debt-payoff-calculator"
      },
      {
        "name": "Debt Avalanche vs Snowball Calculator",
        "url": "/personal-wealth/debt-avalanche-vs-snowball-calculator"
      },
      {
        "name": "Debt Consolidation Calculator",
        "url": "/loans/debt-consolidation-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Start with the full picture",
        "paragraphs": [
          "You cannot plan a payoff without knowing exactly what you owe. Pull your three credit reports from AnnualCreditReport.com, the federally authorized source, and match them against your latest statements. Anything on a report that is not on your list still counts: a forgotten store card or a medical bill in collections accrues interest and fees whether you think about it or not.",
          "For each debt, record four numbers: balance, APR, minimum payment, and due date. The APR decides how fast the balance grows; the minimum decides how much of your budget is already spoken for. A $200 balance at 29.99% costs more per month in interest than a $2,000 balance at 9%, so the order of attack follows the rate, not the size — unless you deliberately choose otherwise for motivation, covered below.",
          "Then add up the totals: total balance, total minimums, and the weighted average APR — each balance times its rate, added together, divided by the total balance. Those three numbers define the problem. Everything in this guide is a method for shrinking them. This guide follows one example household throughout, so every claim below can be checked against the same numbers. The figures are worked examples to show how the methods behave, not advice about your situation; your rates, balances, and options will differ.",
          "The example household owes $11,400 across three debts, with $335 a month in minimum payments and $700 a month available in total for debt. The extra $365 above the minimums is what makes the plan work — and the rest of this guide is about choosing where it goes."
        ],
        "table": {
          "head": [
            "Debt",
            "Balance",
            "APR",
            "Minimum payment"
          ],
          "rows": [
            [
              "Personal loan",
              "$1,800",
              "9.99%",
              "$95"
            ],
            [
              "Credit card A",
              "$3,400",
              "27.99%",
              "$85"
            ],
            [
              "Credit card B",
              "$6,200",
              "22.99%",
              "$155"
            ],
            [
              "Total",
              "$11,400",
              "22.43% weighted average",
              "$335"
            ]
          ]
        }
      },
      {
        "heading": "Why minimum payments keep you in debt",
        "paragraphs": [
          "A minimum payment is designed to keep the account current, not to clear it. On a credit card it typically covers that month's interest plus a small slice of principal — often around 1% of the balance plus the interest charge. Most of your money services the debt instead of shrinking it, and the balance barely moves.",
          "Take the example household: $11,400 owed, $335 a month in minimums. Pay only those minimums — and assume the minimums never fall as balances drop, which is generous, because card minimums usually shrink with the balance — and the debts take 118 months, nearly ten years, to clear. Total interest: $12,407, more than the original $11,400 borrowed. The household would pay back $23,807 for $11,400 of debt.",
          "The warning is printed on your statement. Since the CARD Act of 2009, card issuers must show how long it takes to pay off the balance by making only minimum payments, and how much interest that costs, next to the monthly payment that would clear the balance in three years. That disclosure is the most honest number your issuer ever gives you. If the minimum-payment timeline on your statement runs into years, that is the issuer telling you, in its own required disclosure, that the minimum is not a plan.",
          "The same household, paying $700 a month with a plan, clears everything in 21 months and pays about $2,277 in interest. The difference is $10,130 and eight years of payments. The extra $365 a month does almost all of the work — which is why finding extra money matters more than picking the perfect payoff order.",
          "The mechanism is simple: interest is charged monthly on the outstanding balance, so every extra dollar paid this month reduces next month's interest charge. Early extra payments are worth more than late ones. A dollar of principal paid off in month one saves roughly the APR divided by 12 in interest every month until the debt is gone — on a 27.99% card, about 2.3 cents a month, every month, for each dollar. Small amounts compound in your favor once the direction reverses."
        ]
      },
      {
        "bullets": [
          "Audit subscriptions: streaming, apps, gym, cloud storage. Cancel anything unused in the last 30 days.",
          "Set a grocery ceiling and plan meals for the week; food is usually the largest flexible category.",
          "Ask your insurer, phone carrier, and internet provider for a lower rate or a retention offer.",
          "Sell one unused item a week until the extra payment is funded.",
          "Route windfalls — tax refunds, bonuses, rebates — straight to the target debt, not to spending."
        ],
        "heading": "Find money for extra payments",
        "paragraphs": [
          "The payoff plan needs one number: how much above the minimums can you pay each month? Start from take-home pay, subtract essentials — housing, utilities, food, transport, insurance, and the minimum debt payments — and what remains is the raw material. If the answer is zero or negative, the plan starts with the budget, not the debts, and the sections on negotiating and counseling below matter more than the payoff order.",
          "Finding $365 a month, the amount in our example, usually means several small cuts rather than one dramatic one. Cancel subscriptions you have not used in a month. Cook the five most frequent takeout meals at home. Call your insurer and your phone provider and ask for a lower rate — both industries reprice quietly for customers who ask. Sell what you no longer use; a one-time $400 from a spare television or a bicycle is a full month of extra payments.",
          "Before attacking the debts aggressively, build a small starter emergency fund — $500 to $1,000 in a separate savings account. Without it, the first car repair or medical bill goes straight back onto a card and undoes months of progress. This buffer is not the full emergency fund; that comes later, once the expensive debt is gone. It is insurance for the plan itself.",
          "Then automate the plan. Set minimum payments to autopay on every account, and schedule the extra payment to the target debt on payday. A plan that depends on willpower every month fails in the month you are tired, busy, or distracted. Autopay also protects your credit: a single missed payment can stay on your credit report for years, and the late fee alone can wipe out a month of extra payments."
        ]
      },
      {
        "heading": "Avalanche vs snowball: the worked comparison",
        "paragraphs": [
          "With minimums covered, every extra dollar goes to one target debt. The avalanche targets the highest APR first. The snowball targets the smallest balance first. Both roll the freed payment into the next debt when one is cleared — that rollover is what makes either method work, and it is the step people most often skip.",
          "Run the example household's three debts through both methods at $700 a month. Avalanche attacks Card A first (27.99%), then Card B (22.99%), then the loan (9.99%). Snowball attacks the loan first ($1,800), then Card A ($3,400), then Card B ($6,200). The results are close — and the differences are instructive.",
          "Avalanche saves $226 and finishes in the same 21 months. Snowball clears its first debt in month 4 instead of month 9 — five months sooner — which is the whole point of the method: an early win keeps people going. In this example the cost of that motivation is $226, about $11 a month over the life of the plan. When the smallest debt is also the most expensive, the two methods agree and the choice disappears entirely.",
          "Which should you choose? If you trust yourself to stick with a plan for two years without early wins, avalanche is the cheaper arithmetic. If you have quit payoff plans before, snowball's early wins are worth more than $226. A hybrid works too: clear one small debt for momentum, then switch to avalanche for the rest. The expensive mistake is not picking the wrong method — it is picking neither and paying minimums for another decade. Run your own balances through a debt payoff calculator before committing; the gap between methods depends entirely on your rates and balances.",
          "One rule applies to both methods: stop adding to the cards while you pay them off. New charges on a card you are attacking refill the hole as fast as you empty it. If a card must stay in use for a recurring bill, pay that bill's amount off the same week so the balance still falls every month."
        ],
        "table": {
          "head": [
            "Method",
            "First debt cleared",
            "Payoff order",
            "Months to debt-free",
            "Total interest"
          ],
          "rows": [
            [
              "Avalanche (highest APR first)",
              "Card A, month 9",
              "Card A, Card B, loan",
              "21",
              "$2,277"
            ],
            [
              "Snowball (smallest balance first)",
              "Loan, month 4",
              "Loan, Card A, Card B",
              "21",
              "$2,503"
            ],
            [
              "Minimums only",
              "Loan, month 21",
              "Loan, Card A, Card B",
              "118",
              "$12,407"
            ]
          ]
        }
      },
      {
        "heading": "Balance transfers: when a 0% offer pays",
        "paragraphs": [
          "A balance transfer moves card debt to a new card with a 0% introductory APR, usually for 12 to 21 months. During the promo period, every dollar of your payment reduces principal instead of servicing interest. The catch is the transfer fee, typically 3% to 5% of the amount moved, charged up front and added to the balance.",
          "Take Card A from the example: $3,400 at 27.99%, paying $250 a month. Left alone, it takes 17 months and $738 of interest — $4,138 in total. Moved to a 0% card for 15 months with a 3% fee, the balance becomes $3,502 and the same $250 a month clears it in 15 months with no interest — $3,502 in total. The transfer saves $636 and two months.",
          "The transfer only pays if the math works and the discipline holds. Divide the transferred balance by the promo months: $3,502 over 15 months needs $234 a month to clear in time. If your budget cannot cover that, the leftover balance reverts to the card's standard APR — often higher than the rate you left — and the fee is already spent. A transfer that does not get paid off inside the window can cost more than doing nothing.",
          "Three rules keep transfers safe. Do not use the new card for purchases: the promo rate usually covers the transferred balance only, and new spending complicates the payoff. Do not close the old card immediately if it is your oldest account — the length of your credit history affects your score, and closing it can shorten the average age of your accounts. And do not transfer a balance you cannot clear within the promo window; transfer only the portion you can realistically pay off in time.",
          "Approval is not guaranteed. Balance transfer offers and credit limits depend on your credit profile, and the limit may cover only part of a balance. Check the offer's terms — promo length, transfer fee, and the APR that applies afterward — before moving anything, and confirm whether the fee counts against the credit limit."
        ]
      },
      {
        "heading": "Consolidation loans: what they fix and what they don't",
        "paragraphs": [
          "A debt consolidation loan replaces several debts with one fixed-rate personal loan: one payment, one rate, one end date. It helps when the new rate beats your weighted average rate and the payment is one you can actually make every month. It does not reduce what you owe — it reorganizes it.",
          "The example household's three debts carry a weighted average APR of 22.43%. A $11,400 consolidation loan at 12% over 36 months costs $378.64 a month and $2,231 in total interest — about the same interest as the avalanche plan's $2,277, because the lower rate is offset by the longer term. The monthly payment drops from $700 to $379, which is real relief if cash flow is the problem, but it is not a saving.",
          "The saving appears when you keep paying $700. The same 12% loan at $700 a month clears in 18 months with $1,106 of interest — $1,171 less than the avalanche plan and three months sooner. The loan did not save the money; the payment did. Consolidation lowers the rate; only the payment size shortens the timeline.",
          "The risk is behavioral. Consolidation frees up the old cards, and if spending refills them, you end up with the loan and the cards — more debt than you started with. Cut up or freeze the paid-off cards, keep one for genuine emergencies, and do not consolidate until the budget that caused the debt is fixed. A consolidation loan without a fixed budget is a reset button on a problem that will return.",
          "Compare offers on APR and total cost, not the monthly payment — a longer term always lowers the payment while raising total interest. Watch origination fees, which add to the cost before interest starts: a 5% origination fee on $11,400 is $570. And never secure a consolidation loan against your home unless you have weighed the risk directly: it converts unsecured debt into debt that can cost you the house."
        ]
      },
      {
        "bullets": [
          "Call the number on the back of the card and ask for the hardship or retention department.",
          "State the facts: your balance, your rate, what you can pay, and what you are asking for.",
          "Ask for a lower APR first — a 5-point cut on a $3,400 balance saves about $14 a month in interest.",
          "Get any agreement in writing before you change your payments.",
          "If the first representative says no, ask for a supervisor; authority varies by role."
        ],
        "heading": "Negotiate with your creditors",
        "paragraphs": [
          "Creditors would rather be paid slowly than not at all, and most have hardship programs they do not advertise. Call before you miss a payment — your negotiating position is strongest while the account is current. The Federal Trade Commission gives the same advice: contact creditors early, explain the situation, and ask for a payment plan you can manage.",
          "A lower APR is the most valuable thing to ask for, because it reduces every future interest charge. A 5-point cut on a $3,400 balance saves about $14 a month in interest — $170 over a year — for the price of one phone call. If a rate cut is not available, ask about a hardship program: reduced payments for six to twelve months, waived late fees, or a fixed payoff plan with a set end date.",
          "If you are already behind, the same call still helps. Creditors may accept a lump-sum settlement for less than the balance, or a payment plan that stops further fees. Settling for less than you owe can affect your credit report, and the forgiven amount may count as taxable income — the FTC flags both. Get any agreement in writing before you change your payments, and never give a collector electronic access to your bank account.",
          "If an account has gone to collections, you have rights under the Fair Debt Collection Practices Act: collectors cannot call at unreasonable hours, misrepresent the debt, or threaten action they cannot take. Ask for written validation of the debt before paying anything, and check the Consumer Financial Protection Bureau's guidance on debt collection before you engage. A debt you do not recognize, or one past your state's statute of limitations, needs a different response than a debt you know is yours."
        ]
      },
      {
        "heading": "Debt management plans and credit counseling",
        "paragraphs": [
          "A nonprofit credit counseling agency can build a debt management plan, or DMP: you make one monthly deposit to the agency, and it pays your unsecured creditors — usually at reduced rates the agency has negotiated. Creditors may lower your interest rates or waive certain fees, and the agency handles the distribution, so you deal with one payment instead of many.",
          "DMPs typically take 48 months or more to complete, according to the FTC, and you may have to agree not to open or use new credit while enrolled. That makes a DMP a poor fit for someone who can clear debts in under two years with avalanche or snowball, and a good fit for someone whose minimums already exceed what their budget can carry. The plan trades speed for structure: a fixed timeline, negotiated rates, and someone else managing the payments.",
          "Choosing an agency matters more than choosing the plan. Look for a nonprofit affiliated with the National Foundation for Credit Counseling or the Financial Counseling Association of America. A reputable counselor reviews your full finances before recommending anything, sends free information about its services first, and gives a specific written quote for any fees. The FTC warns that any organization promising to fix all your problems, or charging large fees before doing anything, is a red flag — and if a counselor says a debt management plan is your only option without a detailed review of your finances, find a different counselor.",
          "Expect modest setup and monthly fees; ask for the exact amounts in writing and confirm the agency will help you even if you cannot afford them. Before signing, check the agency with your state attorney general and your local consumer protection agency. A DMP is a multi-year commitment, and the agency you pick will hold your payments for all of it."
        ]
      },
      {
        "bullets": [
          "Payday loans: a typical two-week loan charging $15 per $100 borrowed works out to an APR of almost 400%, according to the CFPB. Borrow $300 and you repay $345 in two weeks — and the CFPB has found that four out of five payday loans are rolled over or renewed rather than repaid.",
          "Debt settlement companies: for-profit firms that tell you to stop paying creditors while they negotiate. They cannot legally collect fees before settling a debt, and the process can take years while late fees, interest, and credit damage pile up. You can negotiate a settlement yourself, for free.",
          "401(k) loans: borrowing from retirement to pay cards trades tax-advantaged growth for a short-term fix. If you leave your job, the outstanding balance usually must be repaid quickly or it is treated as a distribution, with taxes and possibly a 10% early-withdrawal penalty.",
          "Home equity loans and HELOCs to pay off cards: they convert unsecured debt into debt secured by your house. A missed payment then risks foreclosure, not just a credit score hit."
        ],
        "heading": "What to avoid",
        "paragraphs": [
          "The fastest way to make debt worse is to borrow at a higher rate to service a lower one. Several products do exactly that, and one trades an unsecured problem for a secured one. All of them are marketed to people under pressure, which is when they are hardest to refuse.",
          "The test for any debt product is simple: does it lower your total cost and shorten your timeline, with terms you can read and a payment you can make? If the answer depends on a fee you pay today for a promise about tomorrow, walk away. Legitimate help — a nonprofit counselor, your own creditor's hardship program, a plain consolidation loan — never requires payment before it delivers anything.",
          "Also avoid credit repair companies that promise to remove accurate negative information from your credit report. No company can legally remove accurate items; only time does that, and most negative items fall off after seven years. You can dispute genuine errors yourself, for free, with the credit bureaus — paying a company to do it buys nothing you cannot do with a letter."
        ]
      },
      {
        "heading": "Staying debt-free after the last payment",
        "paragraphs": [
          "The last payment is not the finish line; it is the start of the habits that keep you there. The month the final debt clears, redirect the payment — in our example, $700 a month — into savings before lifestyle spending absorbs it. That single redirect builds $8,400 in a year, which is three months of essential spending for many households. The emergency fund you build now is what keeps the next surprise from becoming the next balance.",
          "Keep the budget that got you out. The spending plan that funded $365 of extra payments a month is the same plan that funds savings now. Review it quarterly, not daily; the goal is a system that runs without constant attention. If the budget felt punishing, loosen it slightly — a plan you keep beats a plan you abandon — but keep the automatic transfer to savings in place.",
          "Use credit deliberately from here on. Pay statement balances in full, keep utilization low, and keep your oldest card open. A paid-off card with a zero balance helps your credit utilization ratio — the share of available credit you use — which is a major factor in credit scores. The cards that trapped you can now work for you, but only while the balance is zero at the end of every month.",
          "Check your credit reports as balances fall. You are entitled to free weekly reports from the three bureaus through AnnualCreditReport.com, and watching utilization drop is a concrete reward for the work. Dispute any error you find — a balance that never updates, an account that is not yours — with the bureau in writing; errors are common, and correcting them costs nothing.",
          "If debt creeps back, catch it early. One month of carrying a balance is a warning, not a failure. Return to the list, the budget, and the target-debt method that worked before. Getting out of debt twice is harder than staying out once, and the plan in this guide still works the second time — it just costs more the longer you wait to restart it."
        ]
      }
    ],
    "seoTitle": "How to Get Out of Debt: The Complete Guide for 2026",
    "slug": "how-to-get-out-of-debt",
    "sources": [
      {
        "label": "Federal Trade Commission — How To Get Out of Debt",
        "url": "https://consumer.ftc.gov/articles/how-get-out-debt"
      },
      {
        "label": "Consumer Financial Protection Bureau — Debt Collection",
        "url": "https://www.consumerfinance.gov/consumer-tools/debt-collection/"
      },
      {
        "label": "Federal Reserve — Consumer Credit (G.19)",
        "url": "https://www.federalreserve.gov/releases/g19/current/"
      },
      {
        "label": "National Foundation for Credit Counseling",
        "url": "https://www.nfcc.org/"
      }
    ],
    "title": "How to Get Out of Debt: The Complete Guide",
    "type": "How-to",
    "updated": "2026-09-20"
  },
  {
    "cornerstone": false,
    "description": "How credit scores are calculated, what the five FICO factors mean, why your score differs by lender, and what a higher score saves you — with worked examples.",
    "faqs": [
      {
        "answer": "FICO considers a score of 670 or above to be good. Scores of 740 and above are very good, and 800 or above is exceptional. Below 670, you can still borrow, but expect higher rates and fewer choices. The band you sit in matters more than the exact number, because lenders price loans by band. Moving from below 670 to above it is often the single most valuable step.",
        "question": "What is a good credit score?"
      },
      {
        "answer": "No. Checking your own report or score is a soft inquiry, and soft inquiries never affect your score. You can check as often as you like. Only hard inquiries — the checks a lender runs when you apply for credit — can lower your score, and then only by a small amount. The free weekly reports at AnnualCreditReport.com are soft inquiries too.",
        "question": "Does checking my own credit score hurt it?"
      },
      {
        "answer": "It depends on what is holding the score down. Utilization moves fastest: paying down a card balance usually shows up in your score within one billing cycle, once the issuer reports the new balance. Payment history moves slowly, because the model needs months of on-time payments to outweigh a late mark. There is no legitimate way to raise a score overnight.",
        "question": "How fast can I improve my credit score?"
      },
      {
        "answer": "Because the number depends on three things that change: which bureau supplied the data, which scoring model was used, and the day it was calculated. Your card app may show a VantageScore from one bureau while a mortgage lender pulls a FICO Score from another. Differences of 20 or 30 points between sources are normal. Follow the trend from one source rather than comparing numbers across them.",
        "question": "Why is my credit score different on different sites?"
      },
      {
        "answer": "No. FICO Scores do not consider income, age, or where you live. The model looks only at how you have handled borrowed money: whether you pay on time, how much of your available credit you use, and how long you have had accounts. Lenders do consider income separately when deciding how much you can afford to borrow, but it never enters the score itself.",
        "question": "Does my income affect my credit score?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/how-credit-scores-work.jpg",
    "imageAlt": "Flat vector illustration of a semicircular gauge with an orange needle pointing high, beside a sage checkmark badge, on a cream background",
    "inlineImage": "/images/how-credit-scores-work-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a report card with checkmarks beside an orange magnifying glass on a cream background",
    "intro": "A credit score is a three-digit number, usually from 300 to 850, that predicts how likely you are to repay borrowed money on time. Lenders use it to decide whether to approve you and what interest rate to charge. It is calculated from the information in your credit reports, and it changes as that information changes.",
    "published": "2026-09-28",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Credit Card Calculator",
        "url": "/loans/credit-card-calculator"
      },
      {
        "name": "Debt-to-Income Ratio Calculator",
        "url": "/loans/debt-to-income-ratio-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What a credit score actually is",
        "paragraphs": [
          "A credit score is a prediction, not a judgment on your character. It takes the information in your credit report — your payment history, your balances, how long you have had credit — and turns it into a single number that estimates the risk of lending to you. A higher number means the model expects you to repay on time; a lower number means it expects more risk.",
          "Most scores run from 300 to 850. Lenders use the number to decide whether to approve an application, and to set the price of the credit they offer. The same loan can carry a very different rate depending on your score band, which is why a few dozen points can be worth thousands of dollars over the life of a loan.",
          "The score is not fixed. It is recalculated every time a lender requests it, from the data on your report at that moment. Pay down a balance, and the next calculation sees less debt. Miss a payment, and it sees a late mark. The score is a snapshot of your report, and the report changes every month as lenders send in new information.",
          "What the score does not measure matters too. Your income, your age, and where you live play no part in a FICO Score. The model looks only at how borrowed money has been handled, not at how much money comes in — which is why a high earner with a thin credit history can score lower than a modest earner with a long record of on-time payments."
        ]
      },
      {
        "heading": "Where the number comes from: your credit report",
        "paragraphs": [
          "Before a score exists, there is a report. Three companies — Equifax, Experian, and TransUnion — collect information about your borrowing from lenders and card issuers, and each keeps its own file on you. When you open an account, miss a payment, or pay off a loan, the lender usually reports that event to one or more of them.",
          "A credit report is a record of accounts and payments. It lists each credit account you hold, the balance and limit on each, whether payments arrived on time, and any collections, judgments, or bankruptcies. It also lists who has recently asked to see the report. It does not include your income, your savings, or your spending outside of credit accounts.",
          "The three bureaus do not always hold identical information. A lender may report to only one or two of them, and the timing of updates can differ by days or weeks. That is one reason the same person can have a different score at each bureau: the score is calculated from the data in that bureau's file, and the files are not exact copies of each other.",
          "Because the report is the raw material, errors in it become errors in your score. An account that is not yours, a balance that was paid off but still shows as owed, or a late payment you never made can all drag the number down until corrected. You can get a copy from each bureau once a week, free, at AnnualCreditReport.com."
        ]
      },
      {
        "heading": "The five factors behind a FICO Score",
        "paragraphs": [
          "The most widely used scoring model is the FICO Score, and FICO publishes the five categories that go into it, with the weight each carries. The weights are averages for the general population; the exact mix varies with your own file. Someone with a short history, for example, is judged more on payment behavior than on the length of that history.",
          "Payment history is the largest factor at 35%. It asks the simplest question: do you pay on time? Late payments, missed payments, accounts sent to collections, and bankruptcies all count against you here, and recent problems count more than old ones. Paying at least the minimum on every account, every month, is the single highest-value habit in credit.",
          "Amounts owed is 30%, and it is mostly about credit utilization: how much of your available credit you are using. The balance itself matters less than the balance relative to the limit. Owing $2,000 on a card with a $2,500 limit reads very differently from owing $2,000 on a card with a $20,000 limit, even though the debt is the same. The next section works through the arithmetic.",
          "The remaining three factors share 35% between them. Length of credit history, at 15%, rewards older accounts and a longer track record; it is why closing your oldest card can lower your score. New credit, at 10%, looks at recent account openings and hard inquiries. Credit mix, at 10%, looks at whether you handle more than one type of credit, such as a card and an installment loan. Mix is the smallest factor, and opening an account you do not need just to improve it is a bad trade."
        ],
        "table": {
          "head": [
            "FICO factor",
            "Share of the score"
          ],
          "rows": [
            [
              "Payment history",
              "35%"
            ],
            [
              "Amounts owed",
              "30%"
            ],
            [
              "Length of credit history",
              "15%"
            ],
            [
              "New credit",
              "10%"
            ],
            [
              "Credit mix",
              "10%"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Utilization = total card balances / total card limits. $2,000 owed on $5,000 of limits = 40%.",
          "It is counted per card and overall. One card near its limit hurts even if your total ratio is low.",
          "It updates monthly. A payment that cuts your balance usually shows in your score within one billing cycle.",
          "Paying the statement balance in full each month keeps utilization low and avoids interest entirely."
        ],
        "heading": "Credit utilization, worked out",
        "paragraphs": [
          "Credit utilization is the share of your available credit that you are using, and it is the part of your score you can change fastest. The formula is simple: divide your total card balances by your total card limits. If you owe $2,000 across cards with $5,000 of total limits, your utilization is 40% ($2,000 / $5,000 = 0.40).",
          "Utilization is calculated both per card and across all your cards, so a single maxed-out card can hurt even if your overall ratio looks fine. In the example above, paying the balance down to $1,000 cuts utilization to 20% ($1,000 / $5,000 = 0.20), and the improvement shows up as soon as the card issuer reports the new balance, usually at the next statement date. No other factor moves this quickly: payment history takes months to rebuild, but utilization changes with a single payment.",
          "A common rule of thumb is to keep utilization below 30%, and lower is generally better. That 30% figure is a guideline, not a cutoff in the scoring formula: the model does not treat everything below 30 the same. The practical takeaway is to keep balances low relative to limits, and to pay more than the minimum whenever you can.",
          "Two other ways to lower utilization are asking for a higher limit or opening a new card. Both add available credit, which lowers the ratio on paper. But either can trigger a hard inquiry, and a new card shortens your average account age, so the net effect can go either way in the short term. Paying down the balance is cleaner: it lowers utilization and cuts the interest you pay."
        ]
      },
      {
        "heading": "Why you have more than one score",
        "paragraphs": [
          "There is no single credit score with your name on it. The number a lender sees depends on three things: which bureau supplied the data, which scoring model the lender uses, and the day the score was calculated. Change any one of those, and the number changes.",
          "The two main scoring brands are FICO and VantageScore. FICO is the older model and the one most lenders use for mortgages, auto loans, and credit cards. VantageScore was built jointly by the three bureaus and is the model behind many free score services. Both run on the same 300-to-850 scale and use the same raw material, but they weigh it differently, so the same report can produce scores tens of points apart.",
          "Even within FICO there are versions. FICO 8 is the most widely used general-purpose version, but mortgage lenders typically use older versions, and auto lenders and card issuers have industry-specific versions. A mortgage lender may pull a score 20 or 30 points different from the one your card app shows, and both numbers are correct: they answer different questions.",
          "Stop chasing one exact number. Check the same score from the same source over time to see the trend, and treat small differences between sources as normal. What matters is the direction and the band you sit in, because lenders price loans by band, not by the single point."
        ]
      },
      {
        "heading": "What a score band is worth in dollars",
        "paragraphs": [
          "A credit score matters because lenders price risk. A borrower the model expects to repay on time gets a lower interest rate; a borrower the model sees as riskier gets a higher one. The difference shows up in the monthly payment, and it compounds over the life of the loan.",
          "Take a $20,000 auto loan repaid over five years. The rates below are illustrative, chosen to show the arithmetic, not quoted from any lender. At 6% APR, the monthly payment is $386.66 and the total interest over five years is $3,199. At 11% APR, the same loan costs $434.85 a month and $6,091 in interest. The difference is $48.19 a month and $2,892 over the life of the loan, for the same car, the same term, and the same amount borrowed.",
          "The gap widens on larger loans. A mortgage runs for 30 years and involves hundreds of thousands of dollars, so even half a percentage point in rate is worth tens of thousands over the term. That is why the months before a mortgage application are the worst time to open new accounts or carry high balances.",
          "A low score can also mean no offer at all. Some lenders set a minimum score for approval, and below that line the application is declined regardless of income. The score's reach goes beyond lending too: landlords use it in tenant screening, and insurers use a credit-based score when pricing some policies."
        ],
        "table": {
          "head": [
            "Illustrative APR",
            "Monthly payment",
            "Total interest over 5 years"
          ],
          "rows": [
            [
              "6%",
              "$386.66",
              "$3,199"
            ],
            [
              "11%",
              "$434.85",
              "$6,091"
            ],
            [
              "Difference",
              "$48.19",
              "$2,892"
            ]
          ]
        }
      },
      {
        "heading": "How long information stays on your report",
        "paragraphs": [
          "Negative information does not stay on your report forever. Federal law sets limits on how long the bureaus can report it, and the clock runs from the event itself, not from when you notice it. Knowing the limits matters because it tells you whether a problem is still costing you points or is about to fall off on its own.",
          "Most negative information — late payments, accounts sent to collections, charge-offs — can be reported for seven years. A lawsuit or judgment can be reported for seven years or until the statute of limitations runs out, whichever is longer. Bankruptcies can stay for up to ten years. Positive information, by contrast, can be reported for longer: a closed account in good standing can remain on your report for years after it is closed, which is one reason a long, clean history is valuable.",
          "The limits are maximums, and the bureaus remove items on their own schedules as the limits expire. Nothing you pay a company to do removes accurate negative information early: the only information that can be removed is information that is wrong, and you can dispute that yourself for free.",
          "Time also softens the damage before the item disappears. Scoring models weigh recent behavior more heavily than old behavior, so a late payment from five years ago costs fewer points than one from five months ago. The best response to a past mistake is a long run of on-time payments afterward."
        ],
        "table": {
          "head": [
            "Item",
            "How long it can be reported"
          ],
          "rows": [
            [
              "Most negative information (late payments, collections, charge-offs)",
              "7 years"
            ],
            [
              "Lawsuit or judgment",
              "7 years, or until the statute of limitations runs out, whichever is longer"
            ],
            [
              "Bankruptcy",
              "Up to 10 years"
            ],
            [
              "Positive information",
              "Can be reported longer than negative information"
            ]
          ]
        }
      },
      {
        "heading": "Hard inquiries and rate shopping",
        "paragraphs": [
          "When you apply for credit, the lender checks your report. That check is a hard inquiry, and it can lower your score by a small amount. FICO says one additional inquiry usually costs most people fewer than five points, though the effect can be larger if you have few accounts or a short history.",
          "A hard inquiry stays on your report for up to two years, but FICO Scores only count inquiries from the last 12 months. After a year, the inquiry is still visible to lenders who pull your report, but it no longer affects your FICO Score. A single application is a small, temporary dip.",
          "Checking your own credit is different. When you pull your own report at AnnualCreditReport.com, or check your score through a bank or card app, that is a soft inquiry, and it never affects your score. You can check as often as you like. The same applies to pre-approved offers and most employment background checks.",
          "Rate shopping gets special treatment. If you apply for a mortgage, auto loan, or student loan with several lenders in a short window, FICO treats those inquiries as a single inquiry, because you are shopping for one loan. The window is 45 days under newer FICO versions and 14 days under older ones, so keeping your comparison shopping inside two weeks is safe under any version."
        ]
      },
      {
        "heading": "How to check your reports and fix errors",
        "paragraphs": [
          "You can get a free copy of your credit report from each of the three bureaus once a week at AnnualCreditReport.com. That is the official site set up under federal law; other sites that advertise free reports may charge you or sign you up for paid services. You can also request by phone at (877) 322-8228 or by mail.",
          "When you open a report, check four things: that every account listed is yours, that balances and limits are right, that no payment is marked late when you paid on time, and that no old negative item is still listed past its reporting limit. A wrong balance or a stranger's account can cost real points.",
          "If you find an error, dispute it with the bureau that issued the report. You can file a dispute online, by phone, or by mail, and it costs nothing. The bureau generally has 30 days to investigate. Send the same dispute to the lender that supplied the wrong information as well: fixing it at the source stops it coming back on the next update.",
          "While you are there, consider a credit freeze. A freeze blocks new lenders from seeing your report, which stops anyone from opening an account in your name. It is free to place and lift at each bureau, and it does not affect your score. Lift it temporarily when you apply for credit yourself."
        ]
      },
      {
        "bullets": [
          "Pay at least the minimum on every account, on time, every month. Automate minimum payments so a busy week never creates a late mark.",
          "Keep card balances low relative to their limits. Paying the statement balance in full each month keeps utilization low and avoids interest.",
          "Keep old accounts open. Closing your oldest card shortens your history and cuts your total available credit, which raises utilization.",
          "Apply for new credit only when you need it. Each application adds a hard inquiry and a new, young account.",
          "Check your reports at AnnualCreditReport.com at least once a year, and dispute anything wrong.",
          "Do not pay a company to fix your credit. Everything a credit repair company can legally do, you can do yourself for free."
        ],
        "heading": "Building and protecting a good score",
        "paragraphs": [
          "There is no shortcut to a good score, but the habits that build one are simple, and they are the same habits that keep debt affordable. The order below follows the weights: payment history first, because it is 35% of the score, then utilization, then everything else.",
          "Building a score from nothing takes time. If you have no credit history, a secured credit card — one backed by a deposit — or becoming an authorized user on a family member's well-managed card can start the record. Use the card for a small regular purchase, pay it in full each month, and the history builds itself.",
          "Expect the number to move slowly. A score built over years does not jump in a month, and a damaged score does not heal in one either. The pattern that works is unglamorous: on-time payments, low balances, few new accounts, and a regular check of the reports underneath it all."
        ]
      }
    ],
    "seoTitle": "How Credit Scores Work: What Builds and Hurts Yours",
    "slug": "how-credit-scores-work",
    "sources": [
      {
        "label": "myFICO — What's in your FICO Score",
        "url": "https://www.myfico.com/credit-education/whats-in-your-credit-score"
      },
      {
        "label": "CFPB — What is a credit score?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-score-en-315/"
      },
      {
        "label": "CFPB — How long does information stay on my credit report?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/how-long-does-information-stay-on-my-credit-report-en-323/"
      },
      {
        "label": "CFPB — How do I get a copy of my credit report?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-a-copy-of-my-credit-report-en-5/"
      }
    ],
    "title": "How Credit Scores Work",
    "type": "What",
    "updated": "2026-09-28"
  },
  {
    "cornerstone": false,
    "description": "What is a personal loan? Learn how fixed installments, APR, fees, and terms work — with a $10,000 worked example and the latest Federal Reserve rate data.",
    "faqs": [
      {
        "answer": "The CFPB says personal installment loans can range from several hundred dollars to several thousand dollars or more. The amount a lender offers you depends on your credit score, income, existing debts, and the lender's own limits. Borrow only what you need: a larger loan means a larger payment and more interest, even at the same rate.",
        "question": "How much can I borrow with a personal loan?"
      },
      {
        "answer": "There is no single minimum score, and each lender sets its own standards. The CFPB notes that lenders consider your credit score and reports alongside your income and debts, and that a higher score generally means a lower rate. With a weaker credit file you may still qualify, but expect a higher rate or a smaller loan, and consider a secured loan if you have collateral to offer.",
        "question": "Do I need good credit to get a personal loan?"
      },
      {
        "answer": "Many personal loans let you pay extra or pay the balance off early with no penalty, and doing so saves interest because interest is charged on the remaining balance. Some lenders charge a prepayment fee, so check the loan agreement before you sign. If there is no fee, extra payments are one of the simplest ways to cut the total cost.",
        "question": "Can I pay off a personal loan early?"
      },
      {
        "answer": "Applying triggers a hard credit inquiry, which can lower your score slightly. After that, the effect depends on your payments: on-time payments build a positive history, while missed payments can have a significant negative impact, according to the CFPB. A personal loan also adds an installment account to your credit file, which shows lenders you can handle fixed monthly payments.",
        "question": "Does a personal loan affect my credit score?"
      },
      {
        "answer": "A personal loan gives you a lump sum repaid in fixed installments over a set term, with a known payoff date. A credit card is a revolving line: you borrow, repay, and borrow again, with no fixed end date. Personal loans also usually cost less than carrying a card balance: the Federal Reserve's August 2026 G.19 release puts the average personal loan rate at 11.90% against 22.36% on card accounts assessed interest.",
        "question": "What is the difference between a personal loan and a credit card?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/what-is-a-personal-loan.jpg",
    "imageAlt": "Flat vector illustration of a hand holding a stack of coins beside a shield on a cream background",
    "inlineImage": "/images/what-is-a-personal-loan-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a calendar with monthly payment blocks and a large coin on top",
    "intro": "A personal loan is a lump sum you borrow from a bank, credit union, or lender and repay in fixed monthly payments over a set term. The lender gives you the amount up front, and you pay back the principal plus interest until the balance reaches zero. Here is how they work, what they cost, and how to compare offers.",
    "published": "2026-10-12",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Personal Loan Calculator",
        "url": "/loans/personal-loan-calculator"
      },
      {
        "name": "Loan Calculator",
        "url": "/loans/loan-calculator"
      },
      {
        "name": "APR Calculator",
        "url": "/loans/apr-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What a personal loan is",
        "paragraphs": [
          "A personal loan is a type of installment loan. The Consumer Financial Protection Bureau (CFPB) defines a personal installment loan as a loan where you borrow a sum of money and pay it back in fixed amounts, called installments. It is a closed-end loan, which means the lender gives you all the money at the beginning and you repay it over a specific period of time.",
          "People use personal loans for large purchases, unexpected expenses, or consolidating existing debt. The CFPB notes these loans can range in size from several hundred dollars to several thousand dollars or more, and their length can range from a few months to several years. The payments are generally the same throughout the life of the loan, so you know the exact amount due each month and the date the loan ends.",
          "That fixed structure is the main difference from a credit card. A credit card is revolving credit: you borrow, repay, and borrow again, with no set end date, and the minimum payment changes as the balance changes. A personal loan has a defined payoff date from day one. Once the last installment is paid, the loan is closed and the debt is gone.",
          "Interest rates on personal loans can be fixed or adjustable. A fixed rate keeps your payment the same for the whole term. An adjustable rate can move up or down with the market, which changes your payment. Check the agreement to see which type your loan carries, because an adjustable rate can change what you owe each month."
        ]
      },
      {
        "heading": "How a personal loan works",
        "paragraphs": [
          "The process has four steps. You apply with a bank, credit union, or online lender, stating how much you want to borrow and for how long. The lender reviews your credit, income, and existing debts, then approves or declines the application. If approved, the lender sends you the full amount, usually as a direct deposit to your bank account. You then repay it in equal monthly installments until the balance reaches zero.",
          "Each payment covers two things: the interest charged that month and part of the principal. This is called amortization. In the early months, most of the payment goes to interest because the balance is at its highest. As the balance falls, more of each payment goes to principal, and the loan pays off faster toward the end.",
          "Take a $10,000 loan at an illustrative 12% APR over three years. The monthly rate is 1% (12% divided by 12), so the first month's interest is $100 ($10,000 x 1%). The monthly payment is $332.14, so $100 goes to interest and $232.14 reduces the balance to $9,767.86. By the final month, almost the entire payment goes to principal.",
          "Lenders usually place few restrictions on how you spend the money. Common uses include consolidating credit card debt, paying for a home repair, covering a medical bill, or funding a large purchase. The loan is unsecured in most cases, which means you do not pledge any property to get it. That distinction is covered in the section on secured and unsecured loans below."
        ]
      },
      {
        "heading": "Worked example: a $10,000 loan over three years",
        "paragraphs": [
          "The numbers make the trade-offs concrete. Borrow $10,000 at an illustrative 12% APR and repay it over 36 months, and the monthly payment is $332.14. Over three years you pay $11,957.15 in total, which means $1,957.15 of interest on top of the $10,000 you borrowed. The 12% rate here is an example to show the arithmetic, not a quote: your actual rate depends on your credit, income, and the lender.",
          "The term you choose changes both numbers. The table below shows the same $10,000 at the same 12% APR over two, three, and five years. Stretching from two years to five cuts the monthly payment by $248.29, from $470.73 to $222.44, but adds $2,049.04 in interest, from $1,297.63 to $3,346.67. A longer term buys a smaller payment at a real price.",
          "The practical rule is to pick the shortest term whose payment fits your budget comfortably. If $470.73 a month is too much but $332.14 works, the three-year term is the better choice, even though it costs $659.52 more in interest than the two-year term ($1,957.15 minus $1,297.63). A payment you cannot afford is worse than extra interest, because missed payments damage your credit and add fees."
        ],
        "table": {
          "head": [
            "Term",
            "Monthly payment",
            "Total interest"
          ],
          "rows": [
            [
              "24 months",
              "$470.73",
              "$1,297.63"
            ],
            [
              "36 months",
              "$332.14",
              "$1,957.15"
            ],
            [
              "60 months",
              "$222.44",
              "$3,346.67"
            ]
          ]
        }
      },
      {
        "heading": "Interest rate vs APR: the number that matters",
        "paragraphs": [
          "Two percentages describe what a loan costs, and they are not the same. The CFPB explains that a loan's interest rate is the cost you pay the lender for borrowing money, while the Annual Percentage Rate (APR) is the interest rate plus the additional fees charged with the loan. Both are expressed as percentages, but the APR is the fuller measure because it includes origination charges and other fees.",
          "That makes the APR the number to compare when you shop. The federal Truth in Lending Act requires lenders to disclose the APR before you finalize a loan, so every lender must show it in the same format. Compare APR to APR, never an APR to an interest rate: a loan with a lower interest rate can still cost more once its fees are counted.",
          "For a sense of the market, the Federal Reserve's G.19 release puts the average rate on a 24-month personal loan at commercial banks at 11.90% in August 2026. That is an average across banks, not an offer: your rate depends on your credit score, income, and the lender. The same release puts the average rate on credit card accounts assessed interest at 22.36%, which is why a personal loan is often the cheaper way to carry a balance you cannot pay off at once.",
          "Small rate differences add up over three years. The table below shows the same $10,000 loan over 36 months at three illustrative APRs. At 8% the payment is $313.36 and the interest totals $1,281.09. At 18% the payment is $361.52 and the interest totals $3,014.86. The gap between the cheapest and the most expensive is $1,733.77 in interest on the same $10,000, which is why shopping around matters."
        ],
        "table": {
          "head": [
            "Illustrative APR",
            "Monthly payment",
            "Total interest"
          ],
          "rows": [
            [
              "8%",
              "$313.36",
              "$1,281.09"
            ],
            [
              "12%",
              "$332.14",
              "$1,957.15"
            ],
            [
              "18%",
              "$361.52",
              "$3,014.86"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Origination fee: a charge for processing the loan, often calculated as a percentage of the amount borrowed.",
          "Documentation fee: a fee for processing the paperwork.",
          "Late fees: charged when a payment arrives after its due date.",
          "Credit insurance and disability insurance: generally optional, and you can decline them.",
          "Non-filing insurance: applies only if your loan is secured by collateral."
        ],
        "heading": "Fees to check before you sign",
        "paragraphs": [
          "The interest rate is not the whole cost. The CFPB warns that fees and charges are often added to the total cost of a personal installment loan, and it advises checking the loan disclosure to understand every fee you may be responsible for. The common ones are listed below.",
          "The origination fee deserves a close look because it changes how much money you actually get. For example, a 5% origination fee on a $10,000 loan is $500. Ask the lender whether that $500 is taken out of the amount you receive or added to the amount you owe, because either way it is part of what the loan costs. The APR includes origination charges, so comparing APRs across lenders captures the fee automatically.",
          "Optional insurance is the other item to question. Credit and disability insurance are generally optional, according to the CFPB, so ask whether they are required or whether you can decline them. Also check whether the loan charges a fee for paying it off early: some lenders do, and that fee changes the math of an early payoff."
        ]
      },
      {
        "heading": "Secured vs unsecured personal loans",
        "paragraphs": [
          "Most personal loans are unsecured, which means you borrow on the strength of your credit history and income, with no property pledged as security. A secured personal loan is backed by collateral, such as money in a savings account or a vehicle, that the lender can take if you do not repay. Both types are repaid in fixed installments; the difference is what stands behind the promise to pay.",
          "Collateral changes the lender's risk, and the rate follows it. The CFPB explains that lenders consider unsecured loans riskier than secured loans, so they may charge a higher rate of interest for them. A secured loan can therefore carry a lower rate, and it can also be easier to qualify for with a thinner credit file, because the collateral gives the lender a way to recover its money.",
          "The trade-off is the asset. If you cannot repay a secured loan, the lender can take the collateral and sell it to recover the balance, and it can still pursue any shortfall through debt collection or the courts. With an unsecured loan there is no asset to seize, but the lender can still send the debt to collections, report it to the credit bureaus, and sue for the balance. Either way, default damages your credit.",
          "Choose unsecured when your credit is strong enough to qualify and you do not want to put property at risk. Consider secured only when the lower rate is worth the risk to the asset, and only if you are confident the payment fits your budget for the whole term. Never pledge an asset you cannot afford to lose, such as the car you need to get to work."
        ],
        "table": {
          "head": [
            "",
            "Secured",
            "Unsecured"
          ],
          "rows": [
            [
              "Collateral",
              "Yes, an asset such as savings or a vehicle",
              "No"
            ],
            [
              "Rate tendency",
              "Often lower, because the lender's risk is lower",
              "Often higher, because the lender has no collateral"
            ],
            [
              "Approval",
              "Can be easier with a thinner credit file",
              "Depends heavily on credit score and income"
            ],
            [
              "If you cannot repay",
              "Lender can take and sell the collateral",
              "Collections, credit damage, possible lawsuit"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Your credit score and credit reports",
          "Your income",
          "Your existing debts",
          "The amount and length of the loan",
          "Interest rates permitted by state law",
          "Other factors, such as your bank account transactions"
        ],
        "heading": "What lenders look at when you apply",
        "paragraphs": [
          "The CFPB lists the factors most lenders consider when setting the interest rate and terms of a personal installment loan:",
          "Your credit score carries the most weight in the rate you are offered. The CFPB notes that, in general, the higher your credit score, the lower your rates will be. Before you apply, check your credit reports for errors: you can get a free copy from each of the three major bureaus, Equifax, Experian, and TransUnion, once a week at AnnualCreditReport.com, and disputing a genuine error with the bureau is free.",
          "Lenders also measure your debt-to-income ratio, or DTI. The CFPB defines it as all your monthly debt payments divided by your gross monthly income. If your monthly debt payments total $1,500 and your gross monthly income is $5,000, your DTI is 30% ($1,500 / $5,000). A lower DTI tells the lender you have room for another payment; a high one suggests the new loan would strain your budget.",
          "Income verification is part of the process too. Expect to provide pay stubs or bank statements, and self-employed borrowers may need to supply tax returns or additional records. A lender that does not check your ability to repay at all is a warning sign: legitimate lenders underwrite, and a loan approved with no questions attached usually comes with terms that reflect the risk."
        ]
      },
      {
        "bullets": [
          "The money covers routine spending, such as groceries or rent. A loan cannot fix a budget gap; it only moves it.",
          "The payment leaves no room for saving or for the next surprise. One emergency on top of the loan pushes you back to a card.",
          "You are borrowing to invest. Investment returns are uncertain; loan interest is not.",
          "The rate on offer is barely better than the debt you would replace. Run the numbers first; a small rate improvement may not cover the fees."
        ],
        "heading": "When a personal loan makes sense",
        "paragraphs": [
          "The strongest case for a personal loan is consolidating expensive debt. Suppose you carry $8,000 across credit cards. At the 22.36% average rate on card accounts assessed interest in the Federal Reserve's August 2026 G.19 release, repaying that $8,000 in fixed payments over 36 months costs $307.02 a month and $3,052.56 in interest. The same $8,000 borrowed as a personal loan at an illustrative 12% APR over the same 36 months costs $265.71 a month and $1,565.72 in interest. The loan saves $1,486.84 in interest and $41.31 a month.",
          "The saving is real, but only if the cards stay paid off. Consolidation moves the debt; it does not remove the spending that created it. If the cards fill up again, you end up with the loan and the card balances together, which is worse than where you started. The loan works when it is paired with a plan to keep card spending within the budget.",
          "Other sensible uses share one feature: a single cost with a clear payoff date. A home repair, a medical bill, or a large purchase you would otherwise put on a card all fit that shape. The fixed end date is the advantage: you know the month the debt disappears.",
          "A personal loan is usually the wrong tool when:"
        ]
      },
      {
        "bullets": [
          "Government-issued photo ID",
          "Proof of income, such as recent pay stubs",
          "Employment details, including your employer's name and how long you have worked there",
          "Bank account details for funding",
          "A list of your current debts and monthly payments"
        ],
        "heading": "How to compare offers and apply",
        "paragraphs": [
          "Compare offers on four numbers, not one: the APR, the monthly payment, the total amount you will repay, and the fees. A low monthly payment can hide a long term and a large total cost, and a low interest rate can hide a large origination fee. The APR and the total repayment together give the honest picture.",
          "Get quotes from more than one lender. Many lenders offer a rate check that uses a soft credit inquiry, which the CFPB says does not affect your credit scores. A formal application triggers a hard inquiry, which can lower your score slightly, so do your rate checks first and submit formal applications only to the lenders whose terms you would actually accept.",
          "Have the paperwork ready before you apply:",
          "Before you sign, read the Truth in Lending disclosure. It states the APR, the finance charge, the total of payments, and the payment schedule. Confirm whether the rate is fixed or adjustable, what the late fee is, and whether there is a fee for paying the loan off early. If any number differs from the quote you were given, ask why before you sign."
        ]
      },
      {
        "heading": "What happens if you miss a payment",
        "paragraphs": [
          "Contact your lender as soon as you know a payment will be late. The CFPB advises this directly, and the options a lender can offer include deferment, forbearance, or a payment plan, which could let you postpone payments, make partial payments, or pay a lower interest rate for a time. These options are easiest to get before the payment is missed, not after.",
          "If the payment goes unpaid, three things follow. The lender charges a late fee. It may report the missed payment to one or more of the three major credit reporting companies, and the CFPB warns that failing to make payments on time can have a significant impact on your credit scores and report. And the lender may use third-party debt collectors to try to collect the amount you agreed to repay.",
          "The cost of a missed payment is therefore larger than the payment itself: a fee, a damaged credit record that raises the price of future borrowing, and the stress of collections. If the loan has become unaffordable, talk to the lender before the next due date and review the budget for spending that can move. A nonprofit credit counselor can also help you build a repayment plan if the debts are larger than one loan."
        ]
      }
    ],
    "seoTitle": "What Is a Personal Loan? Rates, Terms and How It Works",
    "slug": "what-is-a-personal-loan",
    "sources": [
      {
        "label": "CFPB — What is a personal installment loan?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-personal-installment-loan-en-2114/"
      },
      {
        "label": "CFPB — Do personal installment loans have fees?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/do-personal-installment-loans-have-fees-en-2120/"
      },
      {
        "label": "CFPB — What is the difference between a loan interest rate and the APR?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/"
      },
      {
        "label": "Federal Reserve — G.19 Consumer Credit",
        "url": "https://www.federalreserve.gov/releases/g19/current/"
      }
    ],
    "title": "What Is a Personal Loan?",
    "type": "What",
    "updated": "2026-10-12"
  },
  {
    "cornerstone": false,
    "description": "How debt consolidation loans work, when they save money, and when they cost more — a worked $12,000 example at real average rates, plus fees and alternatives.",
    "faqs": [
      {
        "answer": "Applying triggers a hard inquiry, which usually causes a small, temporary dip. Paying off your cards then lowers your credit utilization, which helps your score. Opening the new loan lowers the average age of your accounts slightly. The net effect is usually positive within a few months if you pay the new loan on time — and negative if you miss payments or refill the cards.",
        "question": "Does a debt consolidation loan hurt your credit score?"
      },
      {
        "answer": "You can apply, but the rate you are offered may be close to your card rates, which removes the point of consolidating. The CFPB warns that if debt problems have already damaged your credit score, you probably will not get low rates. In that case a nonprofit credit counselor and a debt management plan may help more than a loan, because the counselor negotiates rates with your existing creditors instead of lending you new money.",
        "question": "Can I consolidate debt with bad credit?"
      },
      {
        "answer": "It depends on the balance and your budget. A transfer wins when you can clear the full balance — fee included — inside the 0% window, because the interest cost is zero. A loan wins for larger balances or longer timelines, because its fixed term gives you years instead of months. Compare the total cost of each option on your own numbers, including the transfer fee and any origination fee.",
        "question": "Is a balance transfer better than a consolidation loan?"
      },
      {
        "answer": "The consequences are the same as missing payments on any loan: late fees, a mark on your credit report once the payment is 30 days past due, and eventually collection action. Contact the lender as soon as you see trouble coming — creditors may accept lower payments, waive fees, or change your due date. If the payment is unaffordable even with help, talk to a nonprofit credit counselor before you stop paying.",
        "question": "What happens if I can't keep up with the consolidation loan payments?"
      },
      {
        "answer": "No, and closing them usually hurts. A closed card's limit no longer counts toward your available credit, so your utilization rises on the same balances, and closing your oldest card can shorten your credit history. Keep the cards open with zero balances and stop using them. If temptation is the problem, remove them from your wallet and delete them from online checkouts instead of closing the accounts.",
        "question": "Do I need to close my credit cards after consolidating?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/debt-consolidation-loans-explained.jpg",
    "imageAlt": "Flat illustration of several small debt piles merging into one single organized stack",
    "inlineImage": "/images/debt-consolidation-loans-explained-inline.jpg",
    "inlineImageAlt": "Flat illustration of a balance scale comparing a high card rate with a lower loan rate",
    "intro": "A debt consolidation loan replaces several debts with one fixed-rate loan: one payment, one rate, one end date. It saves money only when the new loan's total cost — rate plus fees, over its full term — beats what you would pay on the old debts. Fees and term length decide whether you keep the saving.",
    "published": "2026-10-05",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Debt Consolidation Calculator",
        "url": "/loans/debt-consolidation-calculator"
      },
      {
        "name": "Loan Calculator",
        "url": "/loans/loan-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What a debt consolidation loan is",
        "paragraphs": [
          "A debt consolidation loan is money you borrow to repay your separate loans so you pay back just one amount, in the CFPB's words. A bank, credit union, or installment lender lends you a lump sum, you use it to pay off your credit cards or other debts, and from then on you owe one loan instead of several bills. The new loan is an installment loan: a fixed interest rate, a fixed monthly payment, and a fixed end date.",
          "The key fact is what consolidation does not do: it does not reduce what you owe. The CFPB puts it plainly — consolidation rolls your debts into a new loan with one monthly payment, but it does not erase your debt. Your $12,000 of card balances becomes a $12,000 loan. What changes is the price of carrying that debt and the shape of the payments, not the principal.",
          "This guide follows one example throughout: $12,000 of credit card debt. The rates used are the Federal Reserve's published averages for the second quarter of 2026, so the arithmetic reflects real market rates rather than an invented scenario. Your own rates will differ — run your balances through a debt consolidation calculator before deciding anything."
        ]
      },
      {
        "heading": "The rate gap that makes consolidation pay",
        "paragraphs": [
          "Consolidation pays when the new loan is cheaper than the debts it replaces, and the gap between card rates and personal loan rates is wide. The Federal Reserve's G.19 release of September 8, 2026 reported that credit card accounts assessed interest carried an average APR of 22.15% in the second quarter of 2026. The same release put the average rate on 24-month personal loans at commercial banks at 11.86%. That is a gap of more than ten percentage points — the raw material a consolidation loan works with.",
          "\"Accounts assessed interest\" is the right number to compare against, and it is worth understanding what it means. The Fed publishes two card rates: one across all accounts, 20.94%, which includes cards paid in full every month and never charged interest, and one across only the accounts that were actually charged interest, 22.15%. If you carry a balance, you are in the second group, and 22.15% is the average price you are paying.",
          "Averages are not offers. The 11.86% personal loan rate is an average across commercial banks, and the rate any lender offers you depends on your credit score, your income, and your existing debts. The CFPB warns that if problems with debt have already affected your credit score, you probably will not be able to get low interest rates on a consolidation loan — and a loan at 20% saves almost nothing against cards at 22%. Check your credit before you apply: the better your score, the lower your rate, and the CFPB's advice is to shop around and compare offers between lenders."
        ]
      },
      {
        "heading": "The worked comparison",
        "paragraphs": [
          "Take the example household: $12,000 of card debt at 22.15%, paying $400 a month. At that rate, the cards take about 44 months to clear and cost $5,646 in interest — $17,646 in total for $12,000 of debt. Every month, $221.50 of the first payment goes to interest alone ($12,000 × 22.15% ÷ 12), leaving $178.50 to reduce the balance.",
          "Now replace the cards with a $12,000 consolidation loan at 11.86% over 36 months. The monthly payment is $397.77 — almost exactly the $400 the household was already paying. Total interest is $2,320, and the total repaid is $14,320. Same monthly effort, $3,326 less paid overall, and debt-free eight months sooner. That is what the rate gap is worth when the term stays short.",
          "Stretch the same loan to 60 months and the picture changes. The payment falls to $266.09 a month — about $132 less — but total interest rises to $3,965 and the total repaid is $15,965. The saving against the cards shrinks to $1,681, and the loan costs $1,645 more than the 36-month version. The lower payment is real relief if cash flow is the problem, but it is bought with $1,645 of extra interest.",
          "The comparison assumes the household stops using the cards once they are paid off. That assumption does most of the work in the arithmetic: if spending refills the cards, the household ends up with the loan and the cards, paying more than it started with. The CFPB's warning is direct — taking on new debt to pay off old debt may just be kicking the can down the road unless spending changes."
        ],
        "table": {
          "head": [
            "Option",
            "Monthly payment",
            "Months to debt-free",
            "Total interest",
            "Total repaid"
          ],
          "rows": [
            [
              "Cards at 22.15%, $400 a month",
              "$400.00",
              "44",
              "$5,646",
              "$17,646"
            ],
            [
              "Consolidation loan at 11.86%, 36 months",
              "$397.77",
              "36",
              "$2,320",
              "$14,320"
            ],
            [
              "Consolidation loan at 11.86%, 60 months",
              "$266.09",
              "60",
              "$3,965",
              "$15,965"
            ]
          ]
        }
      },
      {
        "heading": "Why the longer term is the trap",
        "paragraphs": [
          "The 60-month loan looks generous: a payment about $132 lower than the 36-month loan for the same debt. But the payment is lower for one reason only — the lender spreads the same principal over more months, and interest accrues in every one of them. The CFPB's warning is the rule: although your monthly payment might be lower, it may be because you are paying over a longer time, and you could pay more overall, including fees you would not have paid otherwise.",
          "The arithmetic is unforgiving because interest is charged on the outstanding balance every month. On the 60-month loan, the balance falls slowly in the early years — after 36 payments of $266.09, the household still owes about $5,660, while the 36-month loan would be finished. Those extra two years of interest on a shrinking-but-still-large balance are where the $1,645 goes.",
          "The rule for comparing offers is to compare total cost, not the monthly payment. A longer term always lowers the payment and always raises total interest at the same rate. If the 36-month payment is genuinely unaffordable, the 60-month loan is still better than the cards — it saves $1,681 in the example — but treat the lower payment as a ceiling, not a target: pay extra in any month you can, and check the loan documents for a prepayment penalty before you do."
        ]
      },
      {
        "heading": "Fees that eat the saving",
        "paragraphs": [
          "The interest rate is only part of a loan's price. The CFPB lists the fees commonly added to personal installment loans: an origination fee, a documentation fee, late fees, and optional credit or disability insurance. The origination fee is the one that matters most for consolidation, because it is charged up front on the full loan amount.",
          "Suppose the 36-month loan charges a 5% origination fee — $600 on $12,000, used here as an example; the actual fee is printed in the loan disclosure. That $600 comes straight out of the saving: the loan's $3,326 advantage over the cards drops to $2,726. The loan still pays, but a bigger fee or a longer term can close the gap entirely. A fee is also why the interest rate alone misleads: the APR includes the interest rate plus additional fees charged by the lender, including origination charges, so comparing APRs across offers captures the fees and comparing interest rates does not.",
          "Watch for teaser rates too. The CFPB warns that many low rates on consolidation loans last only for a certain time, after which the lender may increase the rate you have to pay. A loan advertised at a low rate that rises after a year can cost more than the cards it replaced. The disclosure shows whether the rate is fixed for the full term — read it before signing, and compare the APR, which lenders must disclose under the Truth in Lending Act."
        ]
      },
      {
        "heading": "Balance transfers: the 0% alternative",
        "paragraphs": [
          "A balance transfer moves card debt onto a new card offering a zero-percent or low introductory rate, usually for a limited time. During the promo period, no interest accrues on the transferred balance, so every dollar of your payment reduces principal. For a balance you can clear inside the window, it is the cheapest form of consolidation there is — cheaper than any loan, because the interest rate is zero.",
          "The transfer is not free. The CFPB says you will probably have to pay a balance transfer fee, usually a certain percentage of the amount you transfer or a fixed amount, whichever is more — and a fee can be charged even on a zero-percent offer. The fee is added to your new balance, so it becomes part of what you must pay off inside the window.",
          "Worked example: a $6,000 balance at 22.15% moved to a card offering 0% for 18 months. Suppose the offer charges a 3% fee — $180, used here as an example; your offer's fee is in its terms. The new balance is $6,180, and $343.33 a month clears it exactly in 18 months with no interest. The same $343.33 a month left on the old card takes about 21 months and costs $1,311 in interest. The transfer saves $1,131 and finishes about three months sooner.",
          "Three rules keep a transfer safe. First, divide the transferred balance — fee included — by the promo months, and make sure your budget covers that payment; any balance left when the window closes reverts to the card's standard APR. Second, do not use the new card for purchases: the CFPB warns that new purchases on the same card do not get a grace period, and you pay interest on them until the entire balance, including the transfer, is paid in full. Third, never pay more than 60 days late: the CFPB says the issuer can then increase your interest rate on all balances, including the transferred one."
        ]
      },
      {
        "heading": "Home equity: the risky route",
        "paragraphs": [
          "A home equity loan borrows against the equity in your home: you use the loan to pay off your creditors, then repay the home equity loan. Rates are usually lower than personal loan rates because the loan is secured by the house — and that security is exactly the risk. The CFPB is blunt: using a home equity loan to consolidate credit card debt is risky, and if you do not pay it back, you could lose your home in foreclosure.",
          "The costs go beyond the rate. Home equity loans may come with closing costs of hundreds or thousands of dollars, which the CFPB flags as part of the price. Using your equity also puts it out of reach: it may not be available in an emergency or for expenses like home repairs, and if your home's value falls you could end up owing more than the house is worth — \"underwater,\" which makes selling or refinancing harder."
        ]
      },
      {
        "heading": "Consolidation vs settlement vs a debt management plan",
        "paragraphs": [
          "Three different services all promise to deal with multiple debts, and confusing them is expensive. A consolidation loan is new borrowing that pays your debts in full. A debt management plan, or DMP, is a repayment schedule arranged by a nonprofit credit counselor — no new loan. Debt settlement is something else again: a company negotiates to pay less than you owe. The CFPB's comparison page draws the lines clearly, and the differences matter.",
          "Under a DMP, you make a single monthly payment to the counseling organization, which pays your creditors. The counselor may negotiate lower interest rates or a longer repayment period, and may get creditors to stop collection efforts and late fees while you are on the plan. A DMP does not reduce what you owe, and the agency is permitted to charge fees for its services. It suits someone whose minimum payments already exceed what the budget can carry — the plan trades a longer timeline for structure and negotiated rates.",
          "Debt settlement works differently, and the CFPB's warnings are extensive. Settlement companies typically tell you to stop paying your creditors while you save up a lump sum for them to negotiate with — and while you are not paying, fees and interest keep adding up, your credit is further damaged, and you are open to more collection efforts and lawsuits. Many lenders will not negotiate with settlement companies at all, and the companies usually cannot get better terms than you could get by negotiating yourself. Forgiven debt may also count as taxable income.",
          "The law also limits what settlement companies can charge: they cannot collect a fee before they have actually settled at least one debt, you have agreed to the settlement, and you have made a payment under it. A company demanding payment up front is breaking the law. If you cannot afford to pay what you owe even with a plan, the CFPB suggests consulting a bankruptcy attorney — settlement is not the only last resort, and it is rarely the best one."
        ],
        "table": {
          "head": [
            "Option",
            "What it is",
            "What you pay",
            "Main risk"
          ],
          "rows": [
            [
              "Consolidation loan",
              "New loan pays debts in full",
              "Full principal plus loan interest and fees",
              "Refilling the paid-off cards"
            ],
            [
              "Debt management plan",
              "Nonprofit counselor negotiates payments",
              "Full principal, usually at lower rates, plus agency fees",
              "Long commitment; results depend on creditors agreeing"
            ],
            [
              "Debt settlement",
              "For-profit company negotiates less than owed",
              "Settled amounts plus company fees",
              "Credit damage, lawsuits, tax on forgiven debt"
            ]
          ]
        }
      },
      {
        "bullets": [
          "List every debt with its balance, APR, and minimum payment, and work out your weighted average APR — each balance times its rate, added together, divided by the total balance. That is the rate the loan has to beat.",
          "Get real offers and compare APRs, not interest rates, and total cost, not monthly payments. The APR includes origination and other fees, so it is the only fair comparison.",
          "Add every fee to the cost: origination, documentation, and any charges for paying the loan early. A fee can erase the saving on a short loan.",
          "Check the term: a payment you can afford matters, but every extra year costs interest. Pick the shortest term whose payment fits your budget with room to spare.",
          "Fix the budget first. The CFPB's first warning is that a consolidation loan probably will not help unless spending falls or income rises. If the cards refill, you will owe the loan and the cards.",
          "Keep the paid-off cards open but unused. Closing them raises your credit utilization and can shorten your credit history; cutting them up or freezing them in a drawer achieves the same spending control without the credit damage.",
          "Check your credit before you apply, and compare offers from several lenders — banks, credit unions, and online lenders price the same borrower differently."
        ],
        "heading": "How to decide",
        "paragraphs": [
          "Consolidation pays for a specific household: one with high-rate card debt, a credit score good enough to earn a materially lower rate, a budget that covers the new payment every month, and the discipline to leave the paid-off cards alone. Run through the checklist before you apply — it takes an hour and it is the difference between a consolidation that saves thousands and one that costs more than the debt it replaced.",
          "Run your own balances through a debt consolidation calculator and a loan calculator before you commit. The worked examples in this guide use national average rates; your rate, your fees, and your balances decide whether consolidation pays for you."
        ]
      }
    ],
    "seoTitle": "Debt Consolidation Loans Explained: When They Pay Off",
    "slug": "debt-consolidation-loans-explained",
    "sources": [
      {
        "label": "CFPB — What do I need to know about consolidating my credit card debt?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-do-i-need-to-know-if-im-thinking-about-consolidating-my-credit-card-debt-en-1861/"
      },
      {
        "label": "Federal Reserve — Consumer Credit (G.19), released September 8, 2026",
        "url": "https://www.federalreserve.gov/releases/g19/20260908/"
      },
      {
        "label": "CFPB — Credit counseling vs. debt settlement, consolidation, or credit repair",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-credit-counseling-and-debt-settlement-debt-consolidation-or-credit-repair-en-1449/"
      },
      {
        "label": "National Foundation for Credit Counseling",
        "url": "https://www.nfcc.org/"
      }
    ],
    "title": "Debt Consolidation Loans Explained",
    "type": "What",
    "updated": "2026-10-05"
  },
  {
    "cornerstone": false,
    "description": "Pay down balances, fix errors, and build on-time history — the honest timeline for raising your credit score fast, with worked examples and no shortcuts.",
    "faqs": [
      {
        "answer": "It depends on what is holding it down. If high card balances are the problem, paying them below 30% of your limits can move your score within one to two billing cycles, because issuers report new balances monthly. If missed payments are the problem, improvement takes months: on-time payments help, but the late marks stay on your report for seven years. Nobody can promise a number of points: myFICO says the impact of any factor depends on your whole report.",
        "question": "How fast can my credit score go up?"
      },
      {
        "answer": "Paying your cards off lowers your utilization, which helps your score. Keep the cards open afterward: closing them removes their limits from your available credit and raises your utilization. You do not need to carry a balance to keep the benefit — the CFPB says paying in full each month is the best way to maintain a good score. Check unused cards occasionally; the CFPB advises keeping an eye on old accounts you are not using.",
        "question": "Will paying off all my credit cards raise my score?"
      },
      {
        "answer": "No. Checking your own report or score is a soft inquiry, and soft inquiries do not affect your FICO Scores. Only hard inquiries — the checks a lender runs when you apply for credit — can lower your score, and one usually costs most people fewer than five points. You can check your reports free once a week at AnnualCreditReport.com, and checking often is how you catch errors early.",
        "question": "Does checking my own credit hurt my score?"
      },
      {
        "answer": "No. Your debt-to-income ratio — your monthly debt payments compared with your gross monthly income — is not part of your FICO Score, because FICO does not use your income at all. Lenders check it separately when you apply for a loan, alongside your score. Paying down balances helps both numbers at once: it lowers your utilization, which raises your score, and it lowers your monthly payments, which lowers your ratio.",
        "question": "Does my debt-to-income ratio affect my credit score?"
      },
      {
        "answer": "Only if it is inaccurate. If a payment was reported late by mistake, dispute it with the credit bureau and with the lender, and the bureau has 30 days to investigate. If the late payment is accurate, it stays on your report for seven years, and no company can legally remove it. What helps is time plus a run of on-time payments: scoring models weigh recent behavior more heavily, so the mark matters less as it ages.",
        "question": "Can I remove a late payment from my credit report?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/how-to-improve-your-credit-score.jpg",
    "imageAlt": "Flat illustration of a credit score gauge climbing upward beside a shrinking stack of bills",
    "inlineImage": "/images/how-to-improve-your-credit-score-inline.jpg",
    "inlineImageAlt": "Flat illustration of a hand paying down a credit card balance as a bar chart rises",
    "intro": "You can move your credit score in weeks, not years — but only by changing what your credit reports show. Paying down card balances is the fastest lever, because utilization updates every billing cycle. On-time payments, error disputes, and leaving old accounts open do the rest. There are no shortcuts. Here is the timeline, and the steps in order.",
    "published": "2026-10-01",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Credit Card Payoff",
        "url": "/personal-wealth/credit-card-payoff-calculator"
      },
      {
        "name": "Debt-to-Income Ratio Calculator",
        "url": "/loans/debt-to-income-ratio-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What \"fast\" actually means",
        "paragraphs": [
          "A credit score is a snapshot of your credit report at a single moment. When the report changes, the score changes — myFICO puts it plainly: as the information in your credit report changes, so does your score. That is the whole mechanism behind \"fast\" improvement. Nothing you do raises the number directly. Everything works by changing what the bureaus have on file, and each kind of change reaches your file on its own schedule.",
          "Utilization is the quickest lever because card issuers typically report your balance once a month. Pay a balance down this week and the lower figure usually appears on your reports at the next reporting cycle, roughly a month later. Payment history moves more slowly: each on-time payment adds one more good month to a record that is judged over years. Errors you dispute take about 30 days to investigate.",
          "So \"fast\" means visible movement in one to three months if high balances are your main problem, and six to twelve months if you are rebuilding from missed payments or starting with a thin file. It does not mean days, and nobody can promise you a specific number of points. MyFICO says the exact impact of a single factor cannot be measured without looking at your entire report. The CFPB says the same thing more bluntly: rebuilding takes time, and there are no shortcuts or secrets. Any company promising a quick jump is selling something the CFPB warns against, covered in the last section."
        ]
      },
      {
        "heading": "Know your starting point",
        "paragraphs": [
          "You cannot fix what you have not seen. Pull your three credit reports — Equifax, Experian, and TransUnion — from AnnualCreditReport.com, the only site authorized by federal law for free reports. You can view each report free once a week, and you also have the right to one free report from each bureau every 12 months. Check all three: creditors do not always report to every bureau, so an error or a late payment can appear on one report and not the others.",
          "Read each report looking for four things: late payments and collections, balances close to their limits, accounts you do not recognize, and plain errors — a wrong balance, an account shown as open when it is closed, a debt listed twice. Note which factor is doing the most damage, because the fix follows the diagnosis. A file dragged down by 90% utilization needs a different plan than a file dragged down by two old late payments.",
          "Then check your score itself. Many banks and card issuers show you a FICO Score free, and you can get your scores from myFICO. Remember the scale runs from 300 to 850, and myFICO groups scores into five bands."
        ],
        "table": {
          "head": [
            "FICO Score",
            "Rating"
          ],
          "rows": [
            [
              "Below 580",
              "Poor"
            ],
            [
              "580–669",
              "Fair"
            ],
            [
              "670–739",
              "Good"
            ],
            [
              "740–799",
              "Very good"
            ],
            [
              "800 and above",
              "Exceptional"
            ]
          ]
        }
      },
      {
        "heading": "Pay on time, every time",
        "paragraphs": [
          "Payment history is the largest single factor in a FICO Score at about 35%, and myFICO calls it the strongest predictor of whether you will pay debts as agreed. One missed payment can undo months of progress on every other factor, so this step comes before everything else: never miss a payment again, starting this month.",
          "Set every account to autopay at least the minimum payment. Autopay is the CFPB's own first suggestion for keeping payments on time, and it removes the failure mode that sinks most plans — a busy month, a forgotten due date, a bill that arrived while you were traveling.",
          "If you are already behind, get current and stay current. A payment generally is not reported late to the bureaus until it is 30 days past due, so a payment a few days late usually costs you a fee but not a mark on your report — pay it now, before the 30-day mark. Once a payment is 60 days late, the issuer can raise your rate on the balance. If you have missed payments in the past, the damage is done and cannot be undone by paying the account off; what helps is a growing run of on-time payments after it."
        ]
      },
      {
        "heading": "Cut utilization below 30%",
        "paragraphs": [
          "Amounts owed is about 30% of a FICO Score, and the part of it you can move fastest is credit utilization: your total card balances divided by your total card limits. The CFPB's guidance is that many experts recommend using less than 30% of your total limit, and that consumers with the highest scores often use less than 10%. You do not need to carry a balance at all — the CFPB is explicit that paying in full each month is best.",
          "Worked example: one card with a $5,000 limit and a $4,500 balance is at 90% utilization. Pay $3,000 and the balance falls to $1,500 — 30%. The same payment also cuts the interest: at 22.15% APR, the average rate on card accounts actually charged interest in the second quarter of 2026 according to the Federal Reserve's G.19 release of September 8, 2026, a $4,500 balance costs $83.06 a month in interest. A $1,500 balance costs $27.69. The paydown saves $55.37 a month and moves your score at the same time.",
          "Utilization is measured both per card and across all your cards, so a single maxed-out card hurts even if your overall ratio looks fine. If you have several cards, pay down the one closest to its limit first. And watch the timing: issuers typically report the balance on your statement closing date, not the balance on the day you pay. Paying a few days before the statement closes — not on the due date three weeks later — is what gets the lower balance onto your reports sooner. Schedules vary by issuer.",
          "Do not close a card to \"simplify\" while you are improving your score. Closing a card removes its limit from your total available credit, which raises your utilization on the same balances. A $1,500 balance against $10,000 of limits is 15%; close a $5,000-limit card and the same balance against $5,000 of limits is 30%. Keep the card open with a zero balance — it is helping you.",
          "Run your own numbers through a credit card payoff calculator before you start: it shows how fast a given monthly payment clears each balance, so you can aim the money where it cuts utilization fastest."
        ]
      },
      {
        "heading": "Raise your limit, or pay twice a month",
        "paragraphs": [
          "Paying balances down is the direct route to lower utilization. Raising your limits is the indirect one: the same balance against a bigger limit is a smaller ratio. A $1,500 balance on a $5,000 limit is 30%; if the issuer raises the limit to $7,500, the same balance is 20%. Nothing about your debt changed, but the ratio the scoring model sees fell by a third.",
          "Ask your issuer for a limit increase, ideally after several months of on-time payments. Some issuers grant increases without a hard inquiry on your report; others treat the request as an application. Ask before you accept — a hard inquiry costs a few points temporarily, which partly offsets the gain, though the utilization improvement usually matters more. And the new room only helps if you do not spend it. A higher limit that becomes a higher balance leaves you worse off than before.",
          "A second tactic costs nothing: pay more than once a month. If you are paid biweekly, send half your card payment with each paycheck instead of one payment on the due date. The balance your issuer reports is a snapshot, and a mid-cycle payment lowers the snapshot. This matters most on a card you use heavily — one that runs up near its limit every month and gets paid off on the due date still reports a high balance, because the statement closed before you paid."
        ]
      },
      {
        "bullets": [
          "Your complete name, address, and telephone number, plus the report confirmation number if you have it",
          "Each error you want fixed, including the account number, and a clear explanation of why it is wrong",
          "A copy of the portion of your report with the disputed items circled or highlighted",
          "Copies of documents that support your position, such as a statement showing the payment was made",
          "A request that the information be removed or corrected"
        ],
        "heading": "Fix errors on your reports",
        "paragraphs": [
          "Errors on credit reports are common, and a single wrong item — a late payment that was on time, a balance that never updated after you paid it, an account that is not yours — can hold your score down for as long as it sits there. Disputing errors is free, and it is the one part of improving your score where someone else does the work once you file.",
          "Dispute with both the credit bureau that shows the error and the business that supplied the information, which the CFPB and FTC both recommend. Explain in writing what is wrong and why, and include copies — never originals — of documents that support you. A dispute letter should include:",
          "Send the letter by certified mail and ask for a return receipt, so you have proof it arrived. The bureau has 30 days to investigate, must forward your evidence to the business that reported the information, and must send you the results in writing. If the dispute leads to a change, you get a free copy of your corrected report. If the bureau decides your dispute is frivolous — for example, it does not say what is being disputed — it must tell you why within five business days.",
          "Disputes fix errors, not history. Accurate negative information — a late payment you really did miss — cannot be removed by disputing it, no matter who files the dispute. It stays on your report for seven years."
        ]
      },
      {
        "heading": "Stop applying for new credit",
        "paragraphs": [
          "New credit is 10% of a FICO Score, and every application leaves a hard inquiry on your report. One inquiry usually costs most people fewer than five points, according to myFICO, and FICO Scores only count inquiries from the last 12 months, though they stay visible on your report for two years. A single application is a small, short-lived dip. Several in a short period look like financial trouble and cost more.",
          "While you are improving your score, do not apply for credit you do not need. That includes the store card offered for a discount at checkout — the CFPB specifically names opening a store card for a discount as the kind of application that can lower your score. Each new account also lowers the average age of your accounts, which feeds the length-of-history factor worth 15%.",
          "If you do need a loan — a mortgage, an auto loan, a student loan — do your rate shopping inside a focused window. FICO groups multiple inquiries for the same type of loan made within a short span into a single inquiry: 14 days for older versions of the scoring formula, 45 days for the newest versions. Shopping within 14 days is safe under every version. For these loan types, FICO also ignores inquiries made in the 30 days before scoring, so shopping does not hurt you while you are still comparing."
        ]
      },
      {
        "heading": "Build history if you have little or none",
        "paragraphs": [
          "Length of credit history is 15% of a FICO Score, and credit mix — the variety of account types — is 10%. Both reward time, which is the one factor you cannot rush. What you can do is stop the clock from resetting: keep your oldest card open, even if you barely use it. Closing it can shorten your history and cut your total available credit at the same time, which hurts two factors at once.",
          "If you have no credit history, or a very thin one, the CFPB suggests products designed for building credit. A secured credit card requires a deposit equal to your credit limit — the deposit is collateral, not a payment — and using it for small purchases and paying in full each month builds a record of on-time payments.",
          "A credit-builder loan works the other way around: the lender holds the loan amount in an account while you make fixed monthly payments, and you receive the money when the loan is paid off. Each on-time payment is reported to the bureaus. Either product builds history only if the lender reports to all three bureaus — ask before you sign, because a lender that does not report builds nothing."
        ]
      },
      {
        "bullets": [
          "Credit repair companies: they dispute negative items on your behalf, including accurate ones. An accurate item that cannot be verified in time may disappear briefly, then reappear once it is verified — and your score moves down again. They cannot legally remove accurate, timely information, and many charge monthly fees for repeating the same disputes. You can dispute real errors yourself, for free.",
          "Carrying a balance: paying interest does not build credit. The CFPB says you do not need outstanding debt at all, and paying the balance in full each month gets the best scores and the lowest interest costs.",
          "Debit cards, prepaid cards, and payday loans: none of them prove you can repay borrowed money, so none of them build your credit record. The CFPB lists all three as things that do not help rebuild credit.",
          "Closing old cards: it raises your utilization and can shorten your history. Keep the oldest cards open with a zero balance.",
          "Paying someone to \"fix\" your credit before you have checked your own reports: the free dispute process is the same one they use, and the bureaus must investigate your dispute whether you file it or a company does."
        ],
        "heading": "What won't help — and what to avoid",
        "paragraphs": [
          "Some of the most heavily advertised routes to a better score do nothing, and a few make things worse. The CFPB's warning is the frame for all of them: there are no shortcuts to a strong credit history, and companies that promise a quick increase in your scores are usually selling services you can do yourself for free."
        ]
      },
      {
        "heading": "Your 90-day plan",
        "paragraphs": [
          "Put the steps on a calendar. The work is front-loaded: most of it happens in the first two weeks, and the rest is waiting for reporting cycles while you keep paying on time.",
          "After 90 days, pull your reports again and compare them with your starting scores and balances. Utilization should be visibly lower, disputes should be resolved, and three more months of on-time payments should be on file. If the main problem was high balances, you should see real movement by now. If the main problem was missed payments, the movement is slower — but every month of on-time payments pushes the old marks further into the past, and that is the mechanism that rebuilds a score."
        ],
        "table": {
          "head": [
            "When",
            "Do this",
            "When it shows up"
          ],
          "rows": [
            [
              "Week 1",
              "Pull all three reports; set every account to autopay; list late payments, balances, and errors",
              "Immediately"
            ],
            [
              "Week 1",
              "Dispute every error with the bureau and the furnisher",
              "About 30 days"
            ],
            [
              "Weeks 2–4",
              "Pay the highest-utilization card below 30%; pay before statement closing dates",
              "Next reporting cycle, about a month"
            ],
            [
              "Weeks 2–4",
              "Ask for a limit increase on your oldest card, if you can do it without a hard inquiry",
              "Next reporting cycle"
            ],
            [
              "Months 2–3",
              "Keep paying on time; check your reports for updates; do not apply for new credit",
              "Monthly"
            ],
            [
              "Ongoing",
              "Keep utilization low, keep old accounts open, recheck your reports every few months",
              "Compounds over time"
            ]
          ]
        }
      }
    ],
    "seoTitle": "How to Improve Your Credit Score Fast: A Realistic Plan",
    "slug": "how-to-improve-your-credit-score",
    "sources": [
      {
        "label": "myFICO — What's in your FICO Score",
        "url": "https://www.myfico.com/credit-education/whats-in-your-credit-score"
      },
      {
        "label": "CFPB — How do I get and keep a good credit score?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-and-keep-a-good-credit-score-en-318/"
      },
      {
        "label": "Federal Trade Commission — Disputing Errors on Your Credit Reports",
        "url": "https://consumer.ftc.gov/articles/disputing-errors-your-credit-reports"
      },
      {
        "label": "Federal Reserve — Consumer Credit (G.19), released September 8, 2026",
        "url": "https://www.federalreserve.gov/releases/g19/20260908/"
      }
    ],
    "title": "How to Improve Your Credit Score Fast",
    "type": "How-to",
    "updated": "2026-10-01"
  },
  {
    "cornerstone": false,
    "description": "Compare federal student loan repayment plans — Standard, Graduated, Extended, IBR, PAYE, ICR, RAP — with a worked $30,000 example at the 6.52% 2026-27 rate.",
    "faqs": [
      {
        "answer": "RAP can go as low as $10 a month, and income-driven payments generally fall as income falls. But the lowest payment is rarely the cheapest plan: payments below the monthly interest let the balance grow, stretch repayment to 20 or 30 years, and can end in a taxable discharge. Compare the total cost of each plan on your own numbers, not just the monthly figure.",
        "question": "Which repayment plan has the lowest monthly payment?"
      },
      {
        "answer": "Yes, you can switch at any time. Apply for an income-driven plan at StudentAid.gov/idr, or ask your loan servicer to move you to a fixed plan. Switching does not erase qualifying payments you already made toward PSLF or IDR discharge. Consolidating is different: it creates a new loan, and your payment counts carry over as a weighted average of the loans you consolidated.",
        "question": "Can I switch repayment plans?"
      },
      {
        "answer": "Your servicer gives you 90 days from the notice to choose a plan, then a final 30-day notice. If you still do not choose, the servicer enrolls you automatically in the Standard plan — or the Tiered Standard Plan if any of your loans were disbursed on or after July 1, 2026. The automatic payment is usually higher than an income-driven payment, and Tiered Standard payments do not count toward PSLF.",
        "question": "What happens if I do nothing after my SAVE notice?"
      },
      {
        "answer": "No. Federal Student Aid states plainly that Tiered Standard payments do not qualify for Public Service Loan Forgiveness. Qualifying plans are the income-driven plans — IBR, PAYE, ICR, and RAP — and the 10-year Standard plan. If you work in public service and land on Tiered Standard, switch to a qualifying plan as soon as you can, because months on Tiered Standard earn no PSLF credit.",
        "question": "Do payments on the Tiered Standard Plan count toward PSLF?"
      },
      {
        "answer": "It depends on the program. Forgiveness under an income-driven plan counts as taxable federal income for discharges in 2026 and later, because the exclusion that covered 2021 through 2025 expired on December 31, 2025. Public Service Loan Forgiveness stays tax-free — its exemption is permanent and separate. State tax treatment varies, so check your state's rules too.",
        "question": "Is forgiven student loan debt taxed?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/student-loan-repayment-plans-compared.jpg",
    "imageAlt": "Flat-vector illustration of a graduation cap above a road splitting into two paths",
    "inlineImage": "/images/student-loan-repayment-plans-compared-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a balance scale weighing stacked coins against a calendar",
    "intro": "The cheapest federal repayment plan is usually the 10-year Standard plan, because it clears the loan fastest and charges the least interest. But the right plan depends on your income, your loan dates, and whether you work in public service. Since July 1, 2026, borrowers with newer loans have only two options, and the SAVE plan no longer exists.",
    "published": "2026-10-09",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Student Loan Calculator",
        "url": "/loans/student-loan-calculator"
      },
      {
        "name": "Student Loan Payoff",
        "url": "/personal-wealth/student-loan-payoff-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "All loans before July 1, 2026, no new borrowing: Standard, Graduated, Extended, IBR, PAYE, ICR, RAP.",
          "Any loan on or after July 1, 2026: RAP and Tiered Standard only.",
          "Parent PLUS loans are not eligible for any income-driven plan on their own. Consolidated, they can use ICR — and IBR only after at least one ICR payment before July 1, 2028. RAP never accepts them."
        ],
        "heading": "Which plans you can choose depends on your loan dates",
        "paragraphs": [
          "One date decides which plans you can use: July 1, 2026. Federal Student Aid sorts borrowers by the first disbursement date of each loan — the date the money was first paid out. If every Direct Loan you hold was first disbursed before July 1, 2026, and you take no new loan after that date, you keep the older menu: Standard, Graduated, Extended, Income-Based Repayment (IBR), Pay As You Earn (PAYE), and Income-Contingent Repayment (ICR), plus the new Repayment Assistance Plan (RAP).",
          "If any Direct Loan — including a new Direct Consolidation Loan — was first disbursed on or after July 1, 2026, your options narrow to two: RAP and the Tiered Standard Plan, applying to all your Direct Loans, including older ones. Taking a consolidation loan after the cutoff moves your whole balance onto the new menu, so check the effect on your payment and forgiveness progress before you consolidate.",
          "Log in to StudentAid.gov and open your Dashboard to confirm each loan's type and first disbursement date before you apply. The dates decide your menu, and a borrower with a mix of older and newer loans may find different plans available for different loans."
        ]
      },
      {
        "heading": "Fixed-payment plans: Standard, Graduated, Extended, and Tiered Standard",
        "paragraphs": [
          "Fixed-payment plans set your payment from your balance and interest rate, not your income. The payment stays the same — or, on Graduated, rises on a set schedule — until the loan is paid off. There is no forgiveness at the end, because nothing is left to forgive.",
          "The Standard plan is the default for loans disbursed before July 1, 2026, and the cheapest in total cost: a fixed payment that clears the loan in 10 years, or 10 to 30 years for consolidation loans. Graduated starts lower and rises, usually every two years, over the same term. It helps borrowers whose income is low now and should rise, but it costs more interest than Standard because early payments barely touch the principal.",
          "Extended stretches fixed payments to 25 years, but only borrowers with more than $30,000 in outstanding Direct Loans — or more than $30,000 in FFEL Program loans — qualify. A balance of exactly $30,000 does not qualify. Payments can be fixed or graduated, and the extra 15 years of interest roughly triples the total interest cost on a typical balance.",
          "The Tiered Standard Plan is the only fixed option for loans disbursed on or after July 1, 2026, and the default if you do not choose a plan. Its term depends on the balance when you enter — 10, 15, 20, or 25 years — and its payments do not count toward Public Service Loan Forgiveness."
        ],
        "table": {
          "head": [
            "Plan",
            "How the payment is set",
            "Term"
          ],
          "rows": [
            [
              "Standard",
              "Fixed; clears the loan in 10 years",
              "10 years (10–30 consolidation)"
            ],
            [
              "Graduated",
              "Starts lower, rises usually every two years",
              "10 years (10–30 consolidation)"
            ],
            [
              "Extended",
              "Fixed or graduated; needs over $30,000 outstanding",
              "Up to 25 years"
            ],
            [
              "Tiered Standard",
              "Fixed; term set by balance at entry",
              "10–25 years by balance"
            ]
          ]
        }
      },
      {
        "heading": "Income-driven plans: IBR, PAYE, ICR, and RAP",
        "paragraphs": [
          "Income-driven repayment (IDR) plans set your payment from your income and family size, and forgive the remaining balance after a set number of years. Your servicer recalculates the payment every year, so it rises and falls with your earnings. If your payment does not cover the monthly interest, the balance grows — except on RAP, where full, on-time payments earn an interest subsidy that covers unpaid interest, plus a possible matching principal payment.",
          "IBR is the oldest IDR plan still open, and the only older one with no scheduled end date. New borrowers — first loan on or after July 1, 2014 — pay 10% of discretionary income and reach forgiveness after 20 years. Earlier borrowers pay 15% and wait 25 years. Either way the payment never exceeds the 10-year Standard amount.",
          "PAYE and ICR both end no later than July 1, 2028, so borrowers on either plan must pick a new one before then. ICR remains the only IDR plan open to consolidated parent PLUS loans.",
          "RAP is the income-driven plan for the new menu, and the only IDR option for loans disbursed on or after July 1, 2026. It charges 1% to 10% of adjusted gross income (AGI), divided by 12, minus $50 a month for each dependent on your federal tax return, with a $10 monthly minimum. Forgiveness comes after 30 years — 360 qualifying payments — and RAP payments count toward PSLF when made in full and on time."
        ],
        "table": {
          "head": [
            "Plan",
            "Monthly payment",
            "Forgiveness after"
          ],
          "rows": [
            [
              "IBR",
              "10% of discretionary income (15% for pre-2014 borrowers), capped at the 10-year Standard amount",
              "20 years (25 for pre-2014 borrowers)"
            ],
            [
              "PAYE",
              "10% of discretionary income, capped at the 10-year Standard amount",
              "20 years"
            ],
            [
              "ICR",
              "Lesser of 20% of discretionary income or an income-adjusted 12-year payment",
              "25 years"
            ],
            [
              "RAP",
              "1–10% of AGI, divided by 12, minus $50 per dependent; minimum $10",
              "30 years (360 qualifying payments)"
            ]
          ]
        }
      },
      {
        "heading": "What happened to the SAVE plan",
        "paragraphs": [
          "A court order ended the Saving on a Valuable Education (SAVE) Plan in March 2026. The plan had been blocked by court injunctions through 2024 and 2025, and borrowers were placed in forbearance while the cases moved through the courts. No borrower can enroll in SAVE now, and no pending SAVE application will be approved — servicers deny them.",
          "Servicers started sending notices to SAVE borrowers on July 1, 2026, in groups, and each notice starts a 90-day window to choose a different plan — a borrower notified on July 1 had until September 29, 2026. Borrowers who miss the window get a final 30-day notice, then automatic enrollment in a fixed-payment plan: Standard if none of their loans were disbursed on or after July 1, 2026, or Tiered Standard if any were. Federal Student Aid says every SAVE borrower will be notified before the end of 2026.",
          "The switch has two consequences worth knowing. First, time spent in the SAVE forbearance does not count toward PSLF or IDR discharge, although borrowers who already have 120 months of qualifying employment may buy back certain forbearance months. Second, payments made before the forbearance still count — changing plans does not remove qualifying payments already earned. If you were on SAVE and have not chosen a new plan, check your deadline with your servicer and apply before the automatic placement puts you on a plan with a higher payment."
        ]
      },
      {
        "heading": "Worked example: one $30,000 loan across the plans",
        "paragraphs": [
          "Take one borrower: a $30,000 Direct Unsubsidized Loan at 6.52% fixed — the 2026–27 undergraduate rate — held by a single borrower with $45,000 of adjusted gross income and no dependents. The loan accrues $163.00 of interest in the first month ($30,000 × 6.52% ÷ 12), so any payment below $163 leaves the balance growing. The fixed-plan figures below are exact amortization; the income-driven figures are first-year payments at the stated income, recalculated each year as income changes.",
          "The Standard plan costs $340.95 a month and $10,914 in total interest. The Tiered Standard Plan puts this balance in the 15-year band ($25,000 to under $50,000): $261.66 a month and $17,099 in interest — $6,185 more than Standard for a payment $79 lower. Stretching the same balance over 25 years would cut the payment to $202.94 but cost $30,881 in interest, $19,967 more than Standard. A $30,000 balance does not qualify for the Extended plan, which requires more than $30,000 outstanding; the 25-year row shows what stretching costs, not a plan this borrower can pick.",
          "On the income-driven side, discretionary income is $45,000 minus $23,940 — 150% of the 2026 poverty guideline of $15,960 for one person — leaving $21,060. IBR and PAYE charge 10% of that, $2,106 a year: $175.50 a month, covering the $163 monthly interest with $12.50 left for principal in month one. ICR charges the lesser of 20% of discretionary income ($351 a month) or a 12-year fixed payment adjusted for income — about $301 a month before adjustment.",
          "RAP puts $45,000 of AGI in the 4% band ($40,001 to $50,000), so the payment is $1,800 a year, or $150 a month — $13 short of the monthly interest, so the balance would grow without RAP's interest subsidy, which covers unpaid interest for borrowers who pay in full and on time. The trade is time: 20 years to forgiveness on IBR or PAYE, 25 on ICR, 30 on RAP, against 10 years to payoff on Standard."
        ],
        "table": {
          "head": [
            "Plan",
            "Monthly payment",
            "Term",
            "Total interest"
          ],
          "rows": [
            [
              "Standard",
              "$340.95",
              "10 years",
              "$10,914"
            ],
            [
              "Tiered Standard",
              "$261.66",
              "15 years",
              "$17,099"
            ],
            [
              "25-year fixed schedule",
              "$202.94",
              "25 years",
              "$30,881"
            ],
            [
              "IBR (new borrower)",
              "$175.50",
              "20 years, then forgiveness",
              "Depends on income"
            ],
            [
              "PAYE",
              "$175.50",
              "20 years, then forgiveness",
              "Depends on income"
            ],
            [
              "ICR",
              "Up to $301",
              "25 years, then forgiveness",
              "Depends on income"
            ],
            [
              "RAP",
              "$150.00",
              "30 years, then forgiveness",
              "Depends on income"
            ]
          ]
        }
      },
      {
        "heading": "How income-driven payments are calculated",
        "paragraphs": [
          "IBR, PAYE, and ICR all start from discretionary income: your adjusted gross income minus 150% of the federal poverty guideline for your family size and state. For 2026, the guideline for one person in the 48 contiguous states and D.C. is $15,960, so 150% is $23,940 — a single borrower earning $45,000 has $21,060 of discretionary income. Alaska and Hawaii use higher guidelines, and a larger family raises the threshold, which lowers the payment.",
          "RAP uses a different formula. It applies a percentage to your whole AGI — no poverty-guideline subtraction — rising one point for each $10,000 of income, from 1% to a 10% cap. The percentage applies to all of your AGI, not just the slice inside the band. Divide by 12, subtract $50 a month for each dependent on your federal tax return, and the payment cannot fall below $10 a month. A borrower with $45,000 of AGI and two dependents would pay $150 minus $100, or $50 a month.",
          "Your servicer recalculates an IDR payment every year from your income. The simplest way to keep it current is to give consent in the IDR application for the Department of Education to pull your tax information from the IRS — that also lets the Department recertify your plan automatically each year. Without consent, you submit proof of income yourself, such as your most recent tax return, or pay stubs or an employer letter if you did not file taxes."
        ],
        "table": {
          "head": [
            "Adjusted gross income",
            "RAP annual payment"
          ],
          "rows": [
            [
              "$10,000 or less",
              "$120 a year"
            ],
            [
              "$10,001–$20,000",
              "1% of AGI"
            ],
            [
              "$20,001–$30,000",
              "2% of AGI"
            ],
            [
              "$30,001–$40,000",
              "3% of AGI"
            ],
            [
              "$40,001–$50,000",
              "4% of AGI"
            ],
            [
              "$50,001–$60,000",
              "5% of AGI"
            ],
            [
              "$60,001–$70,000",
              "6% of AGI"
            ],
            [
              "$70,001–$80,000",
              "7% of AGI"
            ],
            [
              "$80,001–$90,000",
              "8% of AGI"
            ],
            [
              "$90,001–$100,000",
              "9% of AGI"
            ],
            [
              "More than $100,000",
              "10% of AGI"
            ]
          ]
        }
      },
      {
        "heading": "Forgiveness: what each plan offers, and the tax bill",
        "paragraphs": [
          "Only income-driven plans forgive a remaining balance: IBR after 20 years for new borrowers and 25 for pre-2014 borrowers, PAYE after 20, ICR after 25, and RAP after 30 years — 360 qualifying payments. A qualifying payment is a full, on-time monthly payment made while enrolled in the plan. Months in forbearance or deferment generally do not count.",
          "Forgiveness under an IDR plan is taxable federal income for discharges in 2026 and later. The exclusion that kept forgiven student debt off the federal tax return covered discharges from 2021 through 2025 and expired on December 31, 2025; Congress did not extend it. A borrower who reaches forgiveness with a large remaining balance can face a large tax bill in a single year — plan for it early rather than at the finish line.",
          "Fixed-payment plans have no forgiveness because the loan is paid off by the end of the term. That is the core trade: fixed plans cost more each month and less overall, while income-driven plans cost less each month, take two to three times as long, and can end with a taxable discharge. Run your own numbers in the Repayment Calculator on StudentAid.gov before you choose, and re-run them when your income changes."
        ]
      },
      {
        "heading": "Public Service Loan Forgiveness: which plans count",
        "paragraphs": [
          "Public Service Loan Forgiveness (PSLF) forgives the remaining balance on Direct Loans after 120 qualifying monthly payments — at least 10 years — made while working full time for a qualifying employer: a U.S. government organization at any level, including the military, a 501(c)(3) nonprofit, or certain other nonprofits that provide qualifying public services. FFEL and Perkins loans count only after consolidation into a Direct Consolidation Loan.",
          "The plan you are on decides whether each payment counts. Qualifying plans are all income-driven plans — IBR, PAYE, ICR, and RAP — and the 10-year Standard plan. Payments on the Graduated, Extended, and Tiered Standard plans do not count. That makes the default placement dangerous for public-service workers: a SAVE borrower who misses the switch deadline and lands on Tiered Standard stops earning PSLF credit until they move to a qualifying plan.",
          "Each qualifying payment must be the full billed amount, paid on or before the due date, and the 120 payments do not need to be consecutive. You must still work for a qualifying employer when you submit your form for forgiveness. Use the PSLF Help Tool to generate the form, have your employer certify it, and submit it every year and whenever you change jobs — your count updates only when you submit a form. PSLF forgiveness is tax-free and has no cap."
        ]
      },
      {
        "bullets": [
          "You can afford the Standard payment: take it — lowest total cost, done in 10 years.",
          "Your income is low now and should rise: Graduated or an IDR plan, then switch to Standard later.",
          "You work in public service: pick an IDR plan or the 10-year Standard plan, so every payment counts.",
          "Your balance is large and your income is modest: compare IBR against RAP — RAP's interest subsidy can beat IBR's shorter clock.",
          "You were on SAVE: act inside your 90-day window — the automatic placement is likely the most expensive option."
        ],
        "heading": "How to choose and switch plans",
        "paragraphs": [
          "Start from your budget and your loan dates, not from the plan with the lowest payment. The lowest payment usually means the longest term, the most interest, and a taxable discharge at the end. If you can afford the Standard payment, take it — it is the cheapest route out of debt. If you cannot, pick the income-driven plan with the shortest forgiveness clock you qualify for, and switch to a faster plan when your income rises.",
          "To switch, log in to StudentAid.gov and use the Repayment Calculator to compare each plan you qualify for. Then apply for an income-driven plan at StudentAid.gov/idr, or ask your servicer to move you to a fixed plan. Help from your servicer is free — you never have to pay a company to apply for a repayment plan. Enroll in auto pay once you switch: eligible borrowers enrolled by December 31, 2026, get a 1% interest rate reduction through June 30, 2028, and auto pay keeps every payment on time, which is what makes a payment count toward forgiveness.",
          "Re-check your plan every year. Your income changes, the poverty guidelines update each January, and the rules moved in 2026: PAYE and ICR end no later than July 1, 2028, and any new loan — including a consolidation — moves you onto the RAP and Tiered Standard menu."
        ]
      }
    ],
    "seoTitle": "Student Loan Repayment Plans Compared (2026 Guide)",
    "slug": "student-loan-repayment-plans-compared",
    "sources": [
      {
        "label": "Federal Student Aid — Repayment Plans",
        "url": "https://studentaid.gov/manage-loans/repayment/plans"
      },
      {
        "label": "Federal Student Aid — SAVE Plan Borrowers: FAQs About Choosing a Different Repayment Plan",
        "url": "https://studentaid.gov/articles/save/"
      },
      {
        "label": "Federal Student Aid — Federal Interest Rates and Fees",
        "url": "https://studentaid.gov/understand-aid/types/loans/interest-rates"
      },
      {
        "label": "Federal Student Aid — Public Service Loan Forgiveness",
        "url": "https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service"
      }
    ],
    "title": "Student Loans: Repayment Plans Compared",
    "type": "Comparison",
    "updated": "2026-10-09"
  },
  {
    "cornerstone": false,
    "description": "Defaulting on a loan brings collections, seven years of credit damage, and possible wage garnishment. Here is the timeline by loan type and the ways out.",
    "faqs": [
      {
        "answer": "Negative payment history can generally be reported for up to seven years, counted from the first missed payment that started the delinquency, according to the CFPB. For a defaulted federal student loan that you consolidate, the default record may remain for up to 10 years. Rehabilitation is the exception: after your ninth payment, the Department of Education asks the bureaus to remove the default record.",
        "question": "How long does a default stay on my credit report?"
      },
      {
        "answer": "For a defaulted federal student loan, yes. The Department of Education can order your employer to withhold up to 15% of your disposable pay through administrative wage garnishment, with no lawsuit required. Private creditors must sue you and win a judgment first, and federal law then caps ordinary garnishment at 25% of disposable earnings.",
        "question": "Can my wages be garnished without a court order?"
      },
      {
        "answer": "Not automatically. Federal student loans survive bankruptcy unless you file a separate adversary proceeding and prove to the court that repaying would cause undue hardship for you and your dependents. Other debts, such as credit card balances, can generally be discharged in bankruptcy. Bankruptcy itself can stay on your credit report for up to 10 years.",
        "question": "Does bankruptcy erase a defaulted student loan?"
      },
      {
        "answer": "Delinquency starts the day after you miss a payment: the account is past due, late fees apply, and the servicer reports it after 90 days. Default is the later, more serious stage: the lender treats the loan as broken and can pursue collections, lawsuits, or garnishment. For federal student loans, default arrives after 270 days without a payment.",
        "question": "What is the difference between delinquency and default?"
      },
      {
        "answer": "Yes. A co-signer is equally responsible for the debt, and the lender can collect from the co-signer without first trying the borrower. The default appears on the co-signer's credit report too, and the lender can sue both borrower and co-signer. Some contracts offer co-signer release; ask the lender about its terms.",
        "question": "Can a co-signer be forced to pay a defaulted loan?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/what-happens-if-you-default-on-a-loan.jpg",
    "imageAlt": "Flat illustration of an overdue notice letter beside a calendar, a clock, and a burnt-orange warning triangle",
    "inlineImage": "/images/what-happens-if-you-default-on-a-loan-inline.jpg",
    "inlineImageAlt": "Flat illustration of a winding path splitting toward a rising sun and a small house, suggesting recovery",
    "intro": "Defaulting on a loan means you have failed to repay it under the terms you agreed to. The consequences arrive in stages: late fees and credit damage first, then collections, then — for some loans — lawsuits, wage garnishment, or loss of the property securing the loan. Federal student loans carry the harshest collection powers of all.",
    "published": "2026-10-13",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Loan Calculator",
        "url": "/loans/loan-calculator"
      },
      {
        "name": "Debt Payoff Calculator",
        "url": "/loans/debt-payoff-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Default vs delinquency: two different stages",
        "paragraphs": [
          "Delinquency begins the day after a missed payment. For federal student loans, StudentAid.gov puts it plainly: the first day after you miss a payment, the loan is past due, or delinquent. The same logic applies to other loans — a missed due date makes the account delinquent, and late fees start under the terms of the contract.",
          "Default is the next stage, and it is a legal status, not just a longer delay. A loan is in default when the borrower has failed to repay it as agreed and the lender treats the debt as broken: the full balance can become due at once, and the lender can start the collection remedies in the contract. The line between the two stages is set by the loan contract and, for federal student loans, by federal regulation.",
          "The practical difference is what the lender can do next. A delinquent account gets reminders, late fees, and eventually a negative mark on the credit report. A defaulted account gets sent to collections, sued over, or collected through garnishment — and for secured loans, the collateral can be taken. Act during delinquency: the options narrow once the default label attaches."
        ]
      },
      {
        "heading": "When a loan goes into default",
        "paragraphs": [
          "There is no single default timeline for all loans. Federal student loans have a fixed federal rule; every other loan type follows the contract you signed and the law in your state. That is why two borrowers who stop paying in the same month can reach default months apart.",
          "For most federal student loans, including Direct Loans and FFEL Program loans, default arrives after 270 days — about nine months — without a payment. The loan then transfers to the Department of Education's Default Resolution Group, or to a guaranty agency for older FFEL loans. Before that point, the servicer reports the delinquency to the credit bureaus once the payment is 90 days past due.",
          "Mortgages, auto loans, personal loans, and private student loans set their own default points in the loan agreement. Some contracts declare default after a single missed payment plus a cure period; others wait several months. State law adds another layer: foreclosure and repossession follow state procedures, so the same missed payments can play out differently in different states. Read the default clause in your own agreement — it decides when your loan defaults."
        ],
        "table": {
          "head": [
            "Loan type",
            "When default happens"
          ],
          "rows": [
            [
              "Federal student loans (Direct and FFEL)",
              "270 days without a payment"
            ],
            [
              "Mortgages",
              "Set by the loan contract and state law — no fixed federal timeline"
            ],
            [
              "Auto loans",
              "Set by the loan contract; repossession rules vary by state"
            ],
            [
              "Private student loans",
              "Set by the loan contract"
            ],
            [
              "Personal loans and credit cards",
              "Set by the contract; the lender may charge off the account and sell it to a collector"
            ]
          ]
        }
      },
      {
        "heading": "What default does to your credit",
        "paragraphs": [
          "Default damages your credit in two ways: the missed payments that led up to it, and the default mark itself. Your servicer reports the delinquency once the payment is 90 days past due, so the damage starts months before the default date. For defaulted federal student loans, the Default Resolution Group reports the default to Equifax, Experian, Innovis, and TransUnion if you take no action within 65 days — and that report sits alongside the servicer's earlier entries, so the same loan can appear more than once.",
          "The mark lasts. The Consumer Financial Protection Bureau says credit reporting companies can generally report negative information about your payment history for up to seven years. The clock runs from the original delinquency — the first missed payment that started the slide — not from the default date or the date a collector bought the debt. Paying the debt does not erase the history: an accurate negative item stays until its time runs out.",
          "Federal student loans have one exception worth knowing. If you consolidate a defaulted federal loan, StudentAid.gov says the record of the default — and the late payments before it — may remain on your credit history for up to 10 years. Rehabilitation is the only route that removes the default record: after your ninth rehabilitation payment, the Department of Education asks the credit bureaus to remove it, though the earlier late payments stay."
        ]
      },
      {
        "bullets": [
          "Ask for validation information and check the amount and the creditor before paying anything.",
          "Dispute in writing within 30 days if the debt is not yours or the amount is wrong.",
          "Tell the collector in writing to stop contacting you — it must then contact you only to confirm it will stop or to say it plans a specific action, such as filing a lawsuit.",
          "Never ignore court papers; respond by the date given or get legal help."
        ],
        "heading": "Collections and lawsuits",
        "paragraphs": [
          "Once a loan defaults, the lender usually stops collecting it directly. The account may go to an in-house collections team, to a third-party collector, or be sold outright to a debt buyer, who then owns it and keeps whatever it collects. Either way, the calls and letters begin, and the collector can report the account to the credit bureaus.",
          "Collectors have legal limits. Under the Fair Debt Collection Practices Act, enforced by the Federal Trade Commission, a collector cannot contact you before 8 a.m. or after 9 p.m., cannot call more than seven times in seven days about a particular debt, and cannot lie, threaten, or harass you. A collector must send validation information about the debt — the amount, the creditor, and your rights — when it first contacts you or within five days. If you dispute the debt in writing within 30 days, the collector must stop collecting until it sends you written verification.",
          "A collector can sue. If it does, respond by the date on the court papers — ignoring a lawsuit can produce a judgment against you without your side being heard. With a judgment, a creditor can get a court order to garnish wages or take money from a bank account. The FTC notes that many federal benefits, including Social Security, are generally exempt from court-ordered garnishment — except for delinquent taxes, child or spousal support, and student loans.",
          "There is also a time limit on lawsuits. Each state sets a statute of limitations for collecting a debt, and it usually starts when you miss a payment. After it runs out, the debt is time-barred: a collector cannot lawfully sue you for it, though in some states it can still contact you about it. In some states, making a payment — or acknowledging the debt in writing — restarts the clock. A time-barred debt can still stay on your credit report for seven years."
        ]
      },
      {
        "heading": "Wage garnishment and Treasury offset",
        "paragraphs": [
          "Federal student loans give the government collection powers no private creditor has. If you have not made a payment for more than 360 days and have not acted to resolve the default, the government can start involuntary collections: administrative wage garnishment and Treasury offset. Neither requires a lawsuit or a court order.",
          "Administrative wage garnishment lets the Department of Education order your employer to withhold up to 15% of your disposable pay — pay left after legally required deductions such as taxes and Social Security. On $3,000 of monthly disposable pay, that is up to $450 a month. The withholding continues until the debt is paid in full or the default is resolved.",
          "Treasury offset works through the Treasury Offset Program. The government can withhold your federal tax refund and apply it to the defaulted loan, and it can also reduce certain federal benefit payments, including Social Security benefits. Before offset begins, the Treasury sends a written notice to your last-known address; offset and negative credit reporting are scheduled to begin 65 days later.",
          "Private creditors follow a different path. A collector or lender must sue you and win a court judgment before it can garnish your wages. Federal law then caps an ordinary garnishment at the lesser of 25% of your disposable earnings or the amount above 30 times the federal minimum wage — $217.50 a week at the $7.25 minimum wage — according to the Department of Labor's Fact Sheet #30. If your weekly disposable earnings are $217.50 or less, no ordinary garnishment is allowed, and state law can protect more of your pay."
        ]
      },
      {
        "heading": "How the balance keeps growing: a worked example",
        "paragraphs": [
          "Take a $10,000 loan balance at 6% APR, with no payments for 12 months. Assume the contract charges a $25 late fee for each missed monthly payment — late fees vary by contract, so treat $25 as an assumption, not a standard rate. Assume simple interest on the original balance, with no collection costs added yet.",
          "Interest for the year is $10,000 × 6% = $600. Late fees are $25 × 12 = $300. The balance after 12 months is $10,000 + $600 + $300 = $10,900 — before any collection costs, which the lender or collector adds on top. A year of silence has added $900, or 9%, to what you owe.",
          "The order payments are applied makes the hole deeper. On defaulted federal student loans, StudentAid.gov says payments go to fees first, then to interest, and finally to principal. A partial payment that only covers fees and interest leaves the principal untouched, so the next month's interest accrues on the same balance. That is why small, irregular payments can feel like no progress — and why a structured plan that reduces principal matters more than the size of any single payment.",
          "Garnishment shows the same math from the other side. At 15% of $3,000 in monthly disposable pay, the government withholds $450 a month. Paying off a $10,900 balance at $450 a month takes about 24 months even if no further interest accrued ($10,900 ÷ $450 = 24.2). In reality, interest keeps accruing, so the real payoff takes longer — another reason to resolve a default with a plan rather than let garnishment run."
        ]
      },
      {
        "heading": "What happens to co-signers",
        "paragraphs": [
          "A co-signer is equally responsible for the loan. The Consumer Financial Protection Bureau puts it plainly for private student loans: a co-signer has an equal financial responsibility and legal obligation to make sure the loan is repaid. That obligation does not depend on who used the money or who was supposed to pay.",
          "When the loan defaults, the default goes on the co-signer's credit report as well as the borrower's, and the lender can sue both of them to collect. Collection against a co-signer can include wage garnishment and offset of tax refunds and Social Security payments. The FTC's Notice to Cosigner — the warning lenders must give before signing — states that the creditor can collect from the co-signer without first trying to collect from the borrower, and that the co-signer may have to pay the full amount plus late fees or collection costs. Some states require the creditor to try the borrower first; in those states that sentence can be struck from the notice.",
          "The co-signer's exposure starts before default. Missed payments can appear on the co-signer's credit report, and the loan counts in their debt-to-income ratio when they apply for credit of their own. A co-signer who learns the borrower has stopped paying should act fast: contact the lender, ask about a co-signer release, and consider making payments to protect their own credit. Paying does not end the obligation unless the lender agrees to release them."
        ]
      },
      {
        "heading": "The ways out",
        "paragraphs": [
          "Default is not a permanent state, but the exits differ by loan type. For federal student loans, the Department of Education offers three main routes: rehabilitation, consolidation, and a repayment agreement. For other loans, the exits are negotiation with the lender, settlement, or bankruptcy.",
          "Rehabilitation is the strongest option for a defaulted federal student loan. You sign an agreement with the Default Resolution Group and make nine on-time, voluntary monthly payments — Direct and FFEL borrowers must complete the nine within 10 consecutive months, so one missed month is allowed. The standard payment is 15% of your annual discretionary income divided by 12: on $20,000 of annual discretionary income, that is $250 a month. If you cannot afford that amount, you can submit an income and expense form for a lower payment. After the ninth payment, the Department of Education asks the credit bureaus to remove the default record, and you regain eligibility for federal student aid and income-driven repayment. Involuntary collections may continue until you have made at least five rehabilitation payments.",
          "Consolidation is faster: you apply online for a Direct Consolidation Loan that pays off the defaulted loan. The trade-off is that interest capitalization and collection costs are added to the new balance, and the record of the default stays on your credit history — for up to 10 years, according to StudentAid.gov. Choose consolidation when speed matters more than the credit record; choose rehabilitation when clearing the record matters more.",
          "A repayment agreement with the Default Resolution Group can stop Treasury offset if the first payment arrives within 65 days of the notice, and stop wage garnishment if it arrives within 30 days — but the default record stays. For mortgages, auto loans, and private loans, ask the lender about hardship programs before the account is charged off: forbearance, a modified payment plan, or a temporary rate reduction. The earlier you ask, the more options remain.",
          "Settlement means paying less than the full balance in exchange for the account being closed; some collectors will accept less than what you owe. Before paying anything, get a signed letter from the collector stating the amount settles the entire debt and you owe nothing more — the FTC recommends exactly this — and keep a record of every payment. A settled account is usually reported as settled for less than the full balance.",
          "Bankruptcy does not automatically discharge student loans. Federal student loans are discharged only if you file a separate action — an adversary proceeding — and convince the bankruptcy court that repaying would impose undue hardship on you and your dependents. Other debts, such as credit card balances, can generally be discharged. Bankruptcy also stays on your credit report for up to 10 years, so weigh it as a last resort, not a shortcut. The Fresh Start program, which once let borrowers exit federal student loan default without payments, ended on October 2, 2024."
        ]
      },
      {
        "bullets": [
          "Contact the servicer or lender before the default date — options shrink once the loan transfers to collections.",
          "Answer every letter and court paper; ignoring a lawsuit risks a judgment entered without you.",
          "Keep copies of every agreement, payment, and letter, and get settlement terms in writing before paying.",
          "Check your credit reports and dispute anything inaccurate; accurate negative items stay, but errors can be removed.",
          "If a collector breaks the rules, report it to your state attorney general, the FTC, or the CFPB."
        ],
        "heading": "What to do first",
        "paragraphs": [
          "The cheapest moment to act is before the default date. For federal student loans, that means contacting your servicer before 270 days pass: ask about lowering your monthly payment, an income-driven repayment plan, deferment, or forbearance. Once the loan transfers to the Default Resolution Group, the servicer can no longer help.",
          "If you are already in default, start with the facts: log in to StudentAid.gov to confirm the status of each federal loan, and check your credit reports. Then pick an exit and start it — rehabilitation if you can manage nine payments, consolidation if you need speed, or a repayment agreement to stop garnishment and offset. Every month without a plan adds interest, fees, and collection costs."
        ]
      }
    ],
    "seoTitle": "What Happens If You Default on a Loan? The Full Cost",
    "slug": "what-happens-if-you-default-on-a-loan",
    "sources": [
      {
        "label": "Federal Student Aid — Student Loan Default and Collections: FAQs",
        "url": "https://studentaid.gov/articles/default/"
      },
      {
        "label": "CFPB — How long does information stay on my credit report?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/how-long-does-information-stay-on-my-credit-report-en-323/"
      },
      {
        "label": "FTC — Debt Collection FAQs",
        "url": "https://consumer.ftc.gov/articles/debt-collection-faqs"
      },
      {
        "label": "CFPB — Tips for student loan co-signers",
        "url": "https://www.consumerfinance.gov/paying-for-college/repay-student-debt/student-loan-cosigners/"
      }
    ],
    "title": "What Happens If You Default on a Loan?",
    "type": "What",
    "updated": "2026-10-13"
  },
  {
    "cornerstone": false,
    "description": "Auto loans explained: how rates, terms and dealer financing work, what a 72-month loan really costs, and the add-ons, markups and traps to watch out for.",
    "faqs": [
      {
        "answer": "It depends on your credit and the term, but the Federal Reserve's G.19 release gives a benchmark: in August 2026, commercial banks averaged 7.54% on 60-month new-car loans and 7.17% on 72-month loans. A rate below that average is good; a rate well above it means you should get more quotes or improve your credit before borrowing.",
        "question": "What is a good APR on a car loan?"
      },
      {
        "answer": "Not always, but it costs more and carries more risk. On a $30,000 loan at 7.54%, a 72-month term costs $7,388.49 in interest against $3,614.56 over 36 months, and keeps you in debt longer while the car loses value. It can make sense if the payment is otherwise unaffordable, but a shorter term or a cheaper car is usually the better fix.",
        "question": "Is a 72-month car loan a bad idea?"
      },
      {
        "answer": "In most cases, yes. Auto loans charge simple interest on the daily balance, so extra payments cut interest directly: adding $100 a month to a $30,000, 60-month loan at 7.54% pays it off ten months early and saves $1,055.97. Check your contract for a prepayment penalty clause first, and tell the lender in writing to apply extra payments to principal.",
        "question": "Can I pay off my car loan early?"
      },
      {
        "answer": "It depends on the gap between your loan balance and the car's value. GAP insurance pays the difference if the car is totaled and insurance pays less than you owe. It is worth considering with a small down payment, a long term, or rolled-in negative equity. With a large down payment and a short term, the gap closes quickly and GAP adds little. Compare prices outside the dealer.",
        "question": "Do I need GAP insurance?"
      },
      {
        "answer": "Whichever has the lower APR and total cost. Get pre-approved by a bank or credit union first, then let the dealer try to beat it; manufacturer promotional rates sometimes win. Compare the APR, the term and the total of payments, not the monthly payment alone, and ask whether the dealer's rate includes a markup over the lender's buy rate.",
        "question": "Is dealer financing or a bank loan better?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/auto-loans-explained.jpg",
    "imageAlt": "Flat-vector illustration of a green car beside a road sign with a large orange key",
    "inlineImage": "/images/auto-loans-explained-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a balance scale weighing a car against a stack of coins",
    "intro": "An auto loan is a secured installment loan: a lender pays for the car, you repay it in fixed monthly payments, and the car itself is the collateral. Rates, term length and where you borrow matter more than the monthly payment. This guide explains how auto loans work, what they cost, and the traps that add thousands to the price.",
    "published": "2026-10-16",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Auto Loan Calculator",
        "url": "/loans/auto-loan-calculator"
      },
      {
        "name": "Loan Calculator",
        "url": "/loans/loan-calculator"
      }
    ],
    "sections": [
      {
        "heading": "How an auto loan works",
        "paragraphs": [
          "An auto loan is an installment loan secured by the vehicle. The lender pays the seller, you repay in equal monthly payments over a fixed term, and the lender holds a lien on the title until the loan is paid off. Miss payments and the lender can repossess the car, because the car is the collateral. That security is the main reason auto loan rates run lower than unsecured borrowing such as credit cards.",
          "Most auto loans charge simple interest, which accrues daily on the outstanding balance. On a $30,000 loan at 7.54% APR, interest accrues at about $6.20 a day ($30,000 x 7.54% / 365). Every payment first covers the interest accrued since the last payment; the rest reduces principal. Early in the loan, when the balance is high, most of each payment goes to interest; later, more goes to principal.",
          "Two numbers define the loan: the amount financed and the annual percentage rate (APR). The amount financed is the price plus sales tax and fees, minus your down payment and any trade-in credit. The APR is the cost of credit as a yearly rate, including interest plus lender fees, and every lender must disclose it, so it is the number to use when comparing offers. A lower interest rate with high fees can cost more than a slightly higher rate with no fees.",
          "Before you sign, the lender must disclose the APR, the finance charge (the total dollar cost of credit), the amount financed and the total of all payments. Read the total of payments, not just the monthly figure. A $460 monthly payment sounds manageable; $38,702 over seven years is the number that matters."
        ]
      },
      {
        "heading": "What auto loan rates look like now",
        "paragraphs": [
          "The Federal Reserve publishes average auto loan rates in its G.19 consumer credit release. In August 2026, commercial banks charged an average of 7.54% on 60-month new-car loans and 7.17% on 72-month new-car loans. Finance companies, which include the manufacturers' own lending arms, averaged 6.3% on new-car loans in the second quarter of 2026. These are averages, not offers: your rate depends on your credit history, the term, the vehicle and the down payment.",
          "Auto loans are cheap relative to other consumer credit because the lender can repossess the car. The same G.19 release puts the average rate on credit card accounts assessed interest at 22.36% and on 24-month personal loans at 11.90%. Financing a car on a credit card or with a personal loan costs far more than a standard auto loan, even at a below-average credit score.",
          "The G.19 also shows how much Americans borrow and for how long: finance companies reported an average amount financed of $41,705 and an average maturity of 67 months in the second quarter of 2026. Longer terms have become normal, which makes the term-length math in this guide matter more. Rates move with the broader market, so check the current G.19 release before you shop."
        ]
      },
      {
        "heading": "New vs used: what changes",
        "paragraphs": [
          "Used-car loans usually carry higher rates and shorter maximum terms than new-car loans. The collateral is older and worth less, so the lender takes more risk. A lender that offers 72 or 84 months on a new car may cap a used-car loan at 60 months, and may decline to finance a car above a certain age or mileage at all. Compare the total cost, not the rate alone.",
          "A cheaper car at a higher rate often costs less overall. Take a $20,000 used car financed at 9.5% over 60 months: the payment is $420.04 a month and total interest is $5,202.23, for a total cost of $25,202.23. A $30,000 new car at 7.54% over the same term costs $601.71 a month and $6,102.53 in interest, for a total of $36,102.53. The used car costs $10,900 less in total despite the higher rate. The rates are illustrative; the point stands at any realistic pair, because the principal gap dominates.",
          "New cars have one financing advantage used cars do not: manufacturer promotional rates. A carmaker's finance arm sometimes offers below-market rates to move inventory, and those can beat any bank or credit union quote. They usually require strong credit and a shorter term, and may replace a cash rebate, so compare the promotion against the rebate plus an outside loan.",
          "Buying used adds homework. The Federal Trade Commission advises an independent mechanic's inspection before you buy, even on a certified car, and reading the Buyers Guide the dealer must display in every used car. A cheap loan on a car that needs a $3,000 repair in the first month is not a bargain."
        ]
      },
      {
        "heading": "Term length: the real cost of a lower payment",
        "paragraphs": [
          "Stretching the term is the easiest way to cut a monthly payment, and the most expensive way to buy a car. The table below shows the same $30,000 loan at 7.54% APR across four common terms. Every extra year lowers the payment and raises the total interest.",
          "The 84-month loan saves $473 a month against the 36-month loan but costs $5,087.66 more in interest: $8,702.22 against $3,614.56. The 72-month loan costs $3,773.93 more in interest than the 36-month loan, and the payment gap between 60 and 72 months is only $82.43 a month, yet it buys $1,285.96 of extra interest.",
          "Long terms carry a second cost the table does not show: you owe money on the car for longer than it stays reliable and valuable. A seven-year loan can leave you paying for repairs on a vehicle you still owe thousands on. A common guideline is 20/4/10: put 20% down, finance for no more than 4 years, and keep total monthly car costs under 10% of take-home pay. It is a guideline, not a rule, but it keeps the term from doing quiet damage."
        ],
        "table": {
          "head": [
            "Term",
            "Monthly payment",
            "Total interest",
            "Total paid"
          ],
          "rows": [
            [
              "36 months",
              "$933.74",
              "$3,614.56",
              "$33,614.56"
            ],
            [
              "60 months",
              "$601.71",
              "$6,102.53",
              "$36,102.53"
            ],
            [
              "72 months",
              "$519.28",
              "$7,388.49",
              "$37,388.49"
            ],
            [
              "84 months",
              "$460.74",
              "$8,702.22",
              "$38,702.22"
            ]
          ]
        }
      },
      {
        "heading": "Down payment and negative equity",
        "paragraphs": [
          "A down payment reduces the amount you finance, which cuts the payment and the interest at the same time. On a $30,000 car at 7.54% over 60 months, borrowing the full $30,000 costs $601.71 a month and $6,102.53 in interest. Put $6,000 down and borrow $24,000 instead: the payment falls to $481.37 and total interest to $4,882.03. The $6,000 down payment saves $1,220.50 in interest on top of the $120.34 a month.",
          "The down payment also protects against negative equity: owing more than the car is worth, often called being underwater. Cars lose value fastest in the first years, while a long loan pays principal slowest in the first years. The gap matters when you sell or trade in the car, because you pay it out of pocket, and when the car is totaled, because insurance pays market value, not your loan balance.",
          "The arithmetic shows how slow long loans pay down. Borrow $35,000 over 84 months at 7.54% and after three years you still owe $22,214.25: only $12,785.75 of principal repaid in 36 payments. The same $35,000 over 60 months leaves a balance of $15,593.70 after three years. The longer loan leaves you $6,620.55 deeper in debt at the same point, with four years of payments still to go.",
          "The worst version is rolling negative equity from an old loan into a new one: the dealer pays off your old loan, but the unpaid balance is added to the new one, so you start the next car already underwater. Each roll makes the next bigger. If you owe more than the car is worth, the cheapest move is usually to keep the car and pay the loan down, not to trade it."
        ]
      },
      {
        "heading": "Dealer financing vs pre-approval",
        "paragraphs": [
          "There are two ways to borrow. Direct lending means you arrange the loan yourself with a bank, credit union or online lender, usually before you shop. Dealer financing means the dealer arranges the loan: the finance office sends your application to several lenders and presents an offer, then typically sells the contract to one of those lenders. The dealer is a middleman, not the lender.",
          "Pre-approval is the stronger position. You walk in knowing your APR, your term and the maximum you can borrow, which turns the financing conversation into a comparison instead of a sales pitch. If the dealer beats your pre-approved rate, take the dealer's offer; if not, use your own. The Consumer Financial Protection Bureau recommends shopping for financing before you shop for a car, and credit scoring models generally treat multiple auto-loan inquiries made within a short window as a single inquiry, so do your rate shopping within about two weeks.",
          "Dealer financing has one real advantage: convenience, plus access to manufacturer promotional rates only the finance office can offer. It has one serious trap: spot delivery, sometimes called yo-yo financing, where the dealer lets you drive the car home before financing is final, then calls days later to say the terms changed, usually for the worse. Get written confirmation that financing is final before you take the car, and check that the APR, payment and term in the contract match what you agreed."
        ],
        "table": {
          "head": [
            "",
            "Direct lending",
            "Dealer financing"
          ],
          "rows": [
            [
              "Who arranges it",
              "You, with a bank, credit union or online lender",
              "The dealer's finance office"
            ],
            [
              "When you know the rate",
              "Before you visit the lot",
              "At the finance desk, after you have picked a car"
            ],
            [
              "Main strength",
              "A firm rate to compare against",
              "Convenient; access to manufacturer promotional rates"
            ],
            [
              "Main risk",
              "Takes an application before you shop",
              "Rate may include a dealer markup; spot-delivery risk"
            ]
          ]
        }
      },
      {
        "heading": "The dealer markup on your rate",
        "paragraphs": [
          "When a dealer arranges financing, the lender approves a buy rate: the lowest rate it will accept for your credit. The dealer may then present a higher contract rate and keep a share of the extra interest as compensation. The Consumer Financial Protection Bureau calls this increase the dealer markup, and the lender shares part of the revenue from the higher rate with the dealer. The markup is discretionary: it reflects the dealer's pricing, not your credit risk.",
          "One percentage point of markup is not a rounding error. On a $30,000 loan over 60 months, 7.54% costs $601.71 a month and $6,102.53 in total interest. At 8.54%, the same loan costs $616.07 a month and $6,964.47 in interest. The single point of markup adds $14.36 a month and $861.94 over the life of the loan, and you get nothing for it.",
          "The markup is negotiable, and a pre-approval caps it. Ask the finance manager whether the rate is the lender's buy rate, and whether the dealer can match your pre-approved APR. If the dealer can beat your pre-approval, the markup question answers itself. If it cannot, use your own loan.",
          "The markup also carries a fair-lending history. The CFPB has explained that indirect auto lenders may be held responsible when dealer markup policies produce discriminatory pricing, because the Equal Credit Opportunity Act bars discrimination in any part of a credit transaction. and has urged lenders to control markups or replace them with flat per-transaction fees. A rate that includes a large discretionary markup is a rate you can push back on."
        ]
      },
      {
        "heading": "Add-ons: what they are and when to decline",
        "paragraphs": [
          "The finance office sells more than the loan. Add-ons arrive at the end of a long day at the dealership and can cost thousands of dollars. The Federal Trade Commission notes that you can usually buy the vehicle without any add-ons, and can buy most of them from independent retailers. Add-ons are optional, and any that are financed also accrue interest: a $2,000 add-on rolled into a 60-month loan at 7.54% costs $2,406.84 by the time it is paid off, $406.84 of it interest.",
          "GAP insurance covers the gap between what you owe and what your auto insurer pays if the car is totaled or stolen. It makes sense when the gap is real: a small down payment, a long term, or negative equity rolled in from a previous loan. It makes little sense with a large down payment and a short term, where the gap closes within months. Compare the dealer's price with your auto insurer or credit union before you buy it at the finance desk.",
          "A service contract, often sold as an extended warranty, is a promise to pay for certain repairs. The FTC is explicit that a service contract is not a warranty. Before buying one, check whether it duplicates the manufacturer's warranty, when it starts, what it excludes, the deductible, whether repairs must be done at the dealer, and whether it can be canceled for a refund. A contract that starts after the factory warranty ends can be worth it; one that overlaps coverage you already have is money for nothing.",
          "Other common add-ons are harder to justify. Credit life and disability insurance pays off the loan if you die or cannot work, but term life insurance and an emergency fund usually cover the same risk more cheaply. VIN etching, paint protection, fabric guard and rustproofing are low-cost items sold at high markups. Ask the price of each add-on separately, in writing, and decline anything you did not ask for."
        ]
      },
      {
        "heading": "Refinancing and paying off early",
        "paragraphs": [
          "Refinancing replaces your current loan with a new one at a better rate. It makes sense when rates have fallen since you bought the car, or when your credit has improved enough to qualify for a better tier. Compare total interest on the remaining balance and term at the old rate against the new rate, minus any fees the new lender charges.",
          "A worked example: you owe $20,000 with 36 payments left at 9.5%. The payment is $640.66 a month and the remaining interest is $3,063.72. Refinance the same $20,000 over 36 months at 6.5% and the payment falls to $612.98, with total interest of $2,067.28: a saving of $996.44. The trap is extending the term to chase a lower payment: a fresh 60-month loan may cut the monthly figure while raising total interest. Keep the new term at or below the remaining term on the old loan.",
          "Paying off early works the same way, without a new lender. Because auto loans charge simple interest on the daily balance, every extra dollar of principal cuts the interest on every remaining day. Add $100 a month to a $30,000, 60-month loan at 7.54% and it pays off in 50 months instead of 60, with total interest of $5,046.56 instead of $6,102.53: a saving of $1,055.97 and ten months of payments gone.",
          "Two details matter. First, tell the lender in writing to apply extra payments to principal, not to future payments; otherwise the extra money may just advance your due date. Second, check the contract for a prepayment penalty clause before you pay extra. Most standard auto loans do not charge one, but the clause is the authority, not the assumption."
        ]
      },
      {
        "bullets": [
          "APR, finance charge, amount financed and total of payments: all four disclosed, and the total matches your own math.",
          "Term in months: the term you negotiated, not a longer one slipped in to lower the payment.",
          "Down payment and trade-in credit: both shown, at the values you agreed.",
          "Add-ons itemized: each one priced separately, nothing included that you did not ask for.",
          "Financing is final: written confirmation the rate and terms will not change after you drive away.",
          "No blank spaces: every blank filled in or crossed out before you sign.",
          "Prepayment clause: confirm whether an early-payoff penalty applies.",
          "Monthly payment against your budget: payment plus insurance, fuel and maintenance, not the payment alone."
        ],
        "heading": "Before you sign: a short checklist",
        "paragraphs": [
          "Most auto loan problems are agreed to in the finance office, not discovered later. Work through this list before you sign anything, and take the contract home overnight if the dealer resists. A legitimate deal survives a night of reading."
        ]
      }
    ],
    "seoTitle": "Auto Loans Explained: Rates, Terms and Traps (2026 Guide)",
    "slug": "auto-loans-explained",
    "sources": [
      {
        "label": "Federal Reserve, Consumer Credit — G.19 (August 2026)",
        "url": "https://www.federalreserve.gov/releases/g19/current/"
      },
      {
        "label": "Consumer Financial Protection Bureau, Auto loans",
        "url": "https://www.consumerfinance.gov/consumer-tools/auto-loans/"
      },
      {
        "label": "Consumer Financial Protection Bureau, CFPB to Hold Auto Lenders Accountable for Illegal Discriminatory Markup",
        "url": "https://www.consumerfinance.gov/archive/newsroom/consumer-financial-protection-bureau-to-hold-auto-lenders-accountable-for-illegal-discriminatory-markup/"
      },
      {
        "label": "Federal Trade Commission, Buying a Used Car From a Dealer",
        "url": "https://consumer.ftc.gov/articles/buying-used-car-dealer"
      }
    ],
    "title": "Auto Loans Explained: Rates, Terms and Traps",
    "type": "What",
    "updated": "2026-10-16"
  },
  {
    "cornerstone": false,
    "description": "Paying only the minimum on $5,000 at 22.36% APR takes 19 years and $8,241 in interest. These 8 payoff mistakes cost money — here is the math and the fix.",
    "faqs": [
      {
        "answer": "On a $5,000 balance at 22.36% APR, minimum-only payments — the month's interest plus 1% of the balance — take 231 months, over 19 years, and cost $8,241.21 in interest, for a total of $13,241.21. A fixed $200 monthly payment clears the same balance in 34 months with $1,792.96 in interest. The difference is $6,448.25, and more than 16 years of your life.",
        "question": "How much does paying only the minimum really cost?"
      },
      {
        "answer": "Yes — a small one first. A $1,000 starter cushion keeps a car repair or medical bill off your credit card, where it would accrue interest at 22.36% APR. Without it, one surprise can undo months of payoff progress. Build the cushion, then attack the highest-APR debt; grow the fund to several months of expenses once the expensive debt is gone.",
        "question": "Should I build an emergency fund before paying off debt?"
      },
      {
        "answer": "Yes, when the card charges an annual fee you no longer get value from, or when keeping it open makes overspending likely. But closing a card removes its limit from your total available credit, which can raise your credit utilization ratio and lower your score — the CFPB warns against assuming closure helps your score. Pay the card off first, and check the utilization math before closing.",
        "question": "Is it ever OK to close a credit card?"
      },
      {
        "answer": "The avalanche, highest APR first, always costs less in interest. On an $8,000 card at 22.36% and a $3,000 loan at 11.90%, with $600 a month, the avalanche costs $2,146.18 in interest over 22 months versus $2,404.96 over 23 months for the snowball — a $258.78 difference. Choose the snowball only if quick wins keep you going, and know the price.",
        "question": "Snowball or avalanche — which should I choose?"
      },
      {
        "answer": "Yes. The FTC notes that when a creditor settles for less than you owe, the forgiven amount can count as taxable income. That tax bill can arrive months after the settlement, so set money aside for it. Settlement also usually requires stopping payments first, which damages your credit, and settlement companies cannot legally charge fees before they settle a debt.",
        "question": "Can forgiven debt really be taxed?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/debt-payoff-mistakes-to-avoid.jpg",
    "imageAlt": "Flat-vector illustration of a winding path with warning markers and pitfalls, and a person sidestepping around them",
    "inlineImage": "/images/debt-payoff-mistakes-to-avoid-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a credit card cut in two halves beside a growing potted plant",
    "intro": "Debt payoff plans usually fail on avoidable errors, not low income: minimum-only payments, no emergency fund, closing paid-off cards, picking a payoff method blind, raiding retirement, balance-transfer traps, ignoring the highest APR, and re-spending freed credit. Each has a measurable cost. This guide runs the numbers on all eight, and shows what to do instead.",
    "published": "2026-10-20",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Debt Payoff Calculator",
        "url": "/loans/debt-payoff-calculator"
      },
      {
        "name": "Debt Avalanche vs Snowball",
        "url": "/personal-wealth/debt-avalanche-vs-snowball-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Why payoff plans fail",
        "paragraphs": [
          "Paying off debt is mostly a math problem with a behavior problem wrapped around it. The math is unforgiving: the Federal Reserve's G.19 release for August 2026 puts the average interest rate assessed on credit card accounts at 22.36%. At that rate, a $5,000 balance accrues about $93 in interest in a single month — before you buy anything else.",
          "The behavior side is where the eight mistakes in this guide live. None of them looks like a mistake at the time. Paying the minimum feels responsible. Closing a paid-off card feels like a fresh start. A consolidation loan feels like a solution. Each one is understandable, and each one has a cost you can calculate. The point of this guide is to show the calculation, so the decision is informed rather than instinctive.",
          "One warning before the list: falling behind has consequences beyond interest. The Federal Trade Commission notes that missing minimum payments for four to six months can lead your creditor to charge off the debt as a loss, which damages your credit further — and you still owe the money. If you are already behind, call your creditors before the account reaches that point; the FTC's advice is to negotiate directly rather than pay a company to do it for you.",
          "Every number in this guide comes from one of two places: a published figure from the Federal Reserve, the Federal Trade Commission, the Consumer Financial Protection Bureau, or the IRS — or arithmetic worked out from those figures on stated assumptions. Where an example uses an assumption, the assumption is named. Nothing here is an average pulled from memory, and no rate is invented. If your own rates differ, the same arithmetic applies; only the totals change."
        ]
      },
      {
        "heading": "1. Paying only the minimum",
        "paragraphs": [
          "The minimum payment is designed to keep your account current, not to get you out of debt. A common formula is the month's interest plus 1% of the balance, with a floor of around $25. Because the payment shrinks as the balance shrinks, most of each payment goes to interest in the early years, and the balance barely moves.",
          "Take a $5,000 balance at 22.36% APR, the rate the Federal Reserve reported for credit cards assessed interest in August 2026. The first month's interest is $93.17, so the first minimum payment is $143.17 — and only $50 of it reduces the balance. Paying only the minimum every month, with no new charges, takes 231 months — 19 years and 3 months — and costs $8,241.21 in interest. You repay $13,241.21 for $5,000 of spending.",
          "A fixed payment changes the picture completely. Paying $200 every month clears the same balance in 34 months, with $1,792.96 in interest — $6,448.25 less than the minimums-only route, and more than 16 years sooner. Even $150 a month finishes in 53 months and saves $5,355.59. The lesson is simple: pick a fixed monthly amount you can sustain, pay it every month, and let the payment stay fixed as the balance falls."
        ],
        "table": {
          "head": [
            "Payment strategy",
            "Time to debt-free",
            "Interest paid",
            "Total repaid"
          ],
          "rows": [
            [
              "Minimum only (interest + 1%)",
              "19 years 3 months",
              "$8,241.21",
              "$13,241.21"
            ],
            [
              "Fixed $150 a month",
              "4 years 5 months",
              "$2,885.61",
              "$7,885.61"
            ],
            [
              "Fixed $200 a month",
              "2 years 10 months",
              "$1,792.96",
              "$6,792.96"
            ]
          ]
        }
      },
      {
        "heading": "2. Starting without an emergency fund",
        "paragraphs": [
          "A payoff plan with no cash buffer is one surprise away from collapse. The car needs a repair, a tooth needs a filling, the water heater fails — and with no savings, the expense goes straight back onto the card you are trying to pay off. The balance climbs again, the interest clock restarts, and the months of progress evaporate.",
          "This is the most common reason payoff plans stall: not a lack of discipline, but a lack of shock absorption. A $600 emergency left on a card at 22.36% APR costs about $134 in interest over the following year if the balance stays outstanding — on top of the $600 itself. Every unplanned expense that lands on the card works against the plan in two directions at once: it adds principal, and it adds interest on that principal.",
          "The fix is to build a small cushion before attacking the debt aggressively. A starter fund of $1,000 in a separate savings account covers many common surprises without new borrowing. It feels slow — that $1,000 could have gone to the card — but it protects the plan from the first unexpected bill. Once the high-interest debt is gone, build the fund up to cover several months of expenses.",
          "Keep the cushion in a separate savings account, not in checking where daily spending can absorb it — and not invested, where a market dip can shrink it the week you need it. The point is access within a day or two, without a card swipe. If $1,000 feels out of reach, start with $250 and add to it each payday; a small buffer still beats none."
        ]
      },
      {
        "bullets": [
          "The card charges an annual fee that outweighs any benefit you get from it",
          "Keeping the card open makes overspending likely",
          "You are simplifying to one or two cards you actually use, and the utilization math still works"
        ],
        "heading": "3. Closing cards after paying them off",
        "paragraphs": [
          "Paying off a card feels like a finish line, and closing the account feels like the ceremony. It can cost you. Part of your credit score reflects your credit utilization ratio — your balances divided by your total available credit. Closing a card removes its credit limit from that calculation while your other balances stay exactly where they are.",
          "The Consumer Financial Protection Bureau puts it plainly: closing an existing card can increase your credit utilization ratio and lower your score. The arithmetic is immediate. Suppose you carry a $4,000 balance across your cards with $12,000 in total limits — utilization of 33%. Close a card with a $3,000 limit and your total available credit falls to $9,000, pushing utilization to 44% overnight, without spending a dollar.",
          "Closing your oldest card can also shorten the average age of your accounts over time, another factor in credit scoring — though the utilization jump is the bigger, faster effect. None of this means you must keep every card forever. The usual advice is to pay the card off, keep it open, and put one small recurring charge on it that you pay in full each month. Close a card only when there is a concrete reason to do so."
        ]
      },
      {
        "heading": "4. Choosing snowball or avalanche without knowing the cost",
        "paragraphs": [
          "The two standard payoff methods differ only in order. The avalanche pays the highest APR first, which minimizes total interest. The snowball pays the smallest balance first, which delivers quick wins and motivation. Both work. The mistake is choosing without knowing what the choice costs — or worse, drifting between the two without ever committing to either.",
          "Here is the cost on a concrete example, using the Federal Reserve's August 2026 rates: an $8,000 credit card balance at 22.36% APR and a $3,000 personal loan at 11.90%, with $600 a month available for debt payoff and minimum payments maintained on both. The avalanche clears both in 22 months with $2,146.18 in interest. The snowball takes 23 months and $2,404.96 in interest — $258.78 more, for the same debts and the same monthly budget.",
          "That gap is the price of motivation, and it can be worth paying: a method you stick with beats a method you abandon. But know the price before you pay it. Run your own numbers with a debt payoff calculator, compare the two orders on your actual balances and rates, and then choose deliberately. The gap grows with larger balances and longer payoffs, so the bigger your debt, the more the choice matters."
        ],
        "table": {
          "head": [
            "Method",
            "Payoff order",
            "Months",
            "Interest paid"
          ],
          "rows": [
            [
              "Avalanche",
              "Highest APR first",
              "22",
              "$2,146.18"
            ],
            [
              "Snowball",
              "Smallest balance first",
              "23",
              "$2,404.96"
            ],
            [
              "Difference",
              "—",
              "1 month longer",
              "$258.78 more"
            ]
          ]
        }
      },
      {
        "heading": "5. Raiding retirement savings to pay debt",
        "paragraphs": [
          "A 401(k) or IRA balance looks like a solution to a debt problem: a lump sum sitting there while interest accrues. Cashing it out early is one of the most expensive ways to pay debt, because the withdrawal is taxed twice over — once as income, once as a penalty.",
          "The IRS charges an additional 10% tax on most withdrawals from a retirement plan or IRA before age 59½, on top of ordinary income tax. Take a $10,000 withdrawal at age 40. The penalty alone is $1,000. If your marginal federal rate is 22% — used here as an illustration, not a prediction — income tax takes another $2,200. You lose $3,200 of the $10,000 before a dollar reaches your creditors, and you receive $6,800.",
          "The second cost is invisible: the money you withdrew stops growing. That $10,000 would have kept compounding tax-deferred for decades, and an early withdrawal ends that growth. Exceptions to the 10% penalty exist for specific situations, and a 401(k) loan is a different tool with its own risks — but as a debt payoff strategy, an early withdrawal trades a short-term problem for a long-term one. Pay the debt from cash flow instead.",
          "The IRS lists exceptions to the 10% additional tax — disability, certain medical expenses, a first-home purchase from an IRA, and a few others — but paying off credit card debt is not among them. A hardship withdrawal from a 401(k) still faces the penalty unless an exception applies; hardship only waives the plan's own restrictions, not the tax. Before touching retirement money, check whether your plan offers a loan instead, and price the payoff against the tax cost first."
        ]
      },
      {
        "bullets": [
          "The transfer fee, and whether the interest saved exceeds it",
          "How many months the promotional rate lasts",
          "The regular APR that applies when the promotion ends",
          "Whether new purchases get the promotional rate"
        ],
        "heading": "6. Falling for balance-transfer traps",
        "paragraphs": [
          "A balance transfer moves card debt to a new card with a low introductory rate, usually 0% for a promotional period. Used carefully, it can save real money: every payment during the promotional period goes to principal instead of interest. The traps are in the terms, and they catch people who transfer without a payoff plan.",
          "First, the transfer itself costs money. Issuers typically charge a fee calculated as a percentage of the amount transferred, added to the new balance — so a transfer only saves money if the interest you avoid exceeds the fee. Second, the low rate expires. Any balance remaining when the promotional period ends starts accruing interest at the card's regular APR, which on the Federal Reserve's August 2026 figures averages 22.36% for accounts assessed interest. Third, new purchases on the transfer card often do not get the promotional rate, and payments may be applied to the transferred balance first, leaving new purchases to accrue interest.",
          "A transfer works when the math works. Before moving a balance, check the fee, the length of the promotional period, and the rate that applies afterward — then divide the transferred balance by the number of promotional months. If you cannot afford that monthly payment, the transfer is a delay, not a solution."
        ]
      },
      {
        "heading": "7. Ignoring the highest APR",
        "paragraphs": [
          "When money is tight, it feels natural to pay the debt that bothers you most — the smallest one, the newest one, or the one whose statement just arrived. But interest does not care about feelings. Every dollar of extra payment should go where it saves the most interest, and that is always the highest APR.",
          "The gap between rates is large. On the Federal Reserve's August 2026 figures, credit card balances assessed interest carry 22.36% APR, while a 24-month personal loan carries 11.90%. Each $1,000 left on the card costs about $223.60 in interest over a year; the same $1,000 on the loan costs $119.00. Paying down $1,000 of card debt instead of $1,000 of loan debt saves about $104.60 in interest over a year.",
          "This mistake often hides inside sensible-sounding habits: rounding up the car payment, overpaying the mortgage, or chipping away at a low-rate student loan while a card balance compounds at more than 20%. Minimums on everything, then every spare dollar to the highest APR — that is the order that minimizes what you pay. The only exception is a debt in collections or at risk of charge-off, where the damage goes beyond interest: the FTC notes creditors may charge off a debt after four to six months of missed minimums."
        ]
      },
      {
        "heading": "8. Consolidating debt, then re-spending the freed credit",
        "paragraphs": [
          "A consolidation loan can be a genuinely good move. It replaces high-rate card debt with a single fixed-rate loan and a fixed payoff date. On the Federal Reserve's August 2026 figures, a 24-month personal loan carries an 11.90% rate against 22.36% on credit cards assessed interest. A $5,000 loan at 11.90% over 24 months costs $235.13 a month and $643.21 in total interest. Paying that same $235.13 a month directly against the card takes 28 months and costs $1,426.64 in interest. Consolidation saves $783.43 on the same monthly payment.",
          "The trap opens the day the loan lands. The card balances drop to zero, the credit limits are free again, and the spending that created the debt is still there. If the freed credit gets used — a vacation, holiday spending, the same monthly overspending that built the balances — you end up with the loan payment and a growing card balance. That is worse than where you started: two payments instead of one, and the card interest clock running again.",
          "Consolidation only works as part of a spending change. Before taking the loan, fix the gap between income and spending that created the debt — a written budget, automatic transfers on payday, and the cards out of your wallet. Some borrowers close the paid-off cards or cut them up; that trades a small credit-score cost for removing the temptation entirely. The loan is the tool. The budget is the fix."
        ]
      },
      {
        "bullets": [
          "Build a $1,000 starter emergency fund before making extra debt payments",
          "List every debt: balance, APR, and minimum payment",
          "Pay minimums on all debts; send spare cash to the highest APR",
          "Set a fixed monthly payment and automate it",
          "Keep paid-off cards open unless the fee or the temptation says otherwise"
        ],
        "heading": "How to avoid all eight",
        "paragraphs": [
          "The eight mistakes share one root cause: paying debt without a plan that accounts for real life. The fix is a short sequence, done in order. Build a small emergency cushion first, so surprises do not go back on the card. List every debt with its balance, APR, and minimum payment. Pay minimums on everything, then send every spare dollar to the highest APR — or to the smallest balance, if you have run the numbers and decided the motivation is worth the extra interest.",
          "If the numbers do not work — if minimums alone exceed what you can pay — get help before accounts fall behind. The FTC advises talking to creditors directly and, if you want guidance, choosing a nonprofit credit counselor; a debt management plan through a counselor typically takes 48 months or more to complete. Avoid settlement companies that charge fees before settling anything: the FTC notes they cannot legally collect fees before they settle your debt. The plan matters less than starting it. Pick a fixed payment, automate it, and let the arithmetic do the rest."
        ]
      }
    ],
    "seoTitle": "8 Debt Payoff Mistakes to Avoid, With Real Costs in 2026",
    "slug": "debt-payoff-mistakes-to-avoid",
    "sources": [
      {
        "label": "Federal Reserve — G.19 Consumer Credit, August 2026 (released October 7, 2026)",
        "url": "https://www.federalreserve.gov/releases/g19/20261007/"
      },
      {
        "label": "Federal Trade Commission — How To Get Out of Debt",
        "url": "https://consumer.ftc.gov/articles/how-get-out-debt"
      },
      {
        "label": "Consumer Financial Protection Bureau — Does it hurt my credit to close a credit card?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/does-it-hurt-my-credit-to-close-a-credit-card-en-1231/"
      },
      {
        "label": "Internal Revenue Service — Tax on Early Distributions",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-tax-on-early-distributions"
      }
    ],
    "title": "8 Debt Payoff Mistakes to Avoid",
    "type": "Mistakes",
    "updated": "2026-10-20"
  },
  {
    "cornerstone": false,
    "description": "A 0% balance transfer can save $893 on a $5,000 balance — or cost you if the timing slips. How the promo window, fee, and traps work, with the math shown.",
    "faqs": [
      {
        "answer": "It depends on your balance, your current APR, the fee, and your monthly payment. On a $5,000 balance at 22.36% APR with $300 a month, a transfer with an illustrative 3% fee saves $893.11 — $1,043.11 in interest avoided, minus the $150 fee — and clears the debt three months sooner. The saving shrinks if the balance is small, the old rate is low, or the payment is small, so run the comparison on your own numbers first.",
        "question": "How much can a balance transfer actually save?"
      },
      {
        "answer": "Whatever remains starts accruing interest at the card's regular APR from the day the promotion ends. On the worked example, $300 a month for an illustrative 12-month window leaves $1,550, which takes 6 more months to clear at 22.36% and adds $95.60 in interest. The transfer still saves money in that case, but the saving is smaller — which is why the monthly payment test matters before you transfer.",
        "question": "What happens to the balance left when the 0% period ends?"
      },
      {
        "answer": "Usually not. Most issuers will not let you move a balance between two of their own cards, so the new card has to come from a different issuer. The rule varies by offer, so check the terms before you apply rather than assuming. Also check whether the offer honors the promotional rate only for transfers requested within a set window after the account opens.",
        "question": "Can I transfer a balance between two cards from the same bank?"
      },
      {
        "answer": "It can dip your score at first: the application triggers a hard inquiry, and the new account lowers your average account age. The new card also raises your total available credit, which can lower your utilization ratio — though the transferred balance may sit near the new card's limit. As you pay the balance down during the window, utilization falls, and a transfer that ends at zero usually leaves your score better than it found it.",
        "question": "Does a balance transfer hurt my credit score?"
      },
      {
        "answer": "It depends on how fast you can pay. On a $5,000 balance, a transfer cleared inside the window costs a $150 illustrative fee, while a 24-month personal loan at 11.90% costs $643.21 in interest — so the transfer wins if you can clear it in time. The loan wins if you need more time than the window gives, or want a fixed payment and a fixed end date without watching a deadline.",
        "question": "Is a personal loan better than a balance transfer?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/balance-transfer-cards-explained.jpg",
    "imageAlt": "Flat-vector illustration of one credit card passing a glowing orange balance to a second card along a curved sage arrow",
    "inlineImage": "/images/balance-transfer-cards-explained-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of an hourglass standing over a credit card beside a calendar page",
    "intro": "A balance transfer moves credit card debt from one card to another, usually to a card offering a 0% promotional rate for a limited time. The new issuer pays off your old card, and you owe the new one instead — plus a transfer fee. With a payoff plan, it saves real interest. Without one, it moves the problem.",
    "published": "2026-10-24",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Credit Card Payoff",
        "url": "/personal-wealth/credit-card-payoff-calculator"
      },
      {
        "name": "Credit Card Calculator",
        "url": "/loans/credit-card-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What a balance transfer is",
        "paragraphs": [
          "A balance transfer moves an outstanding balance from one credit card to another, sometimes for a fee. That is the Consumer Financial Protection Bureau's definition: nothing is paid off, nothing is forgiven — the debt changes address. You give the new issuer your old account details and the amount to move; it pays the old card directly. Your old balance drops to zero, and the transferred amount appears on the new card, plus the transfer fee.",
          "People transfer for one reason: the new card charges a lower rate, often 0%, for a promotional period. While it applies, every dollar you pay goes to the balance instead of interest. On a card charging the Federal Reserve's August 2026 average — 22.36% on accounts assessed interest — a $5,000 balance accrues $93.17 of interest in a single month. A 0% rate stops that clock.",
          "The amount you can transfer is limited by the credit limit on the new card, and the fee counts against it too: with a $6,000 limit and a $150 fee, the largest balance you can move is $5,850. A transfer is not a payoff plan by itself. It buys time at a lower rate, and whether that time is worth the fee depends on the monthly payment you can sustain while the promotional rate lasts — a calculation, not a feeling."
        ]
      },
      {
        "heading": "How the 0% window works",
        "paragraphs": [
          "The promotional rate applies to the transferred balance for a set period, then ends. Federal rules set a floor on that period: under Regulation Z, an issuer may raise a promotional rate when it expires only if the rate was provided for a specified period of at least six months. In practice, promotional windows run longer than that floor, but the floor guarantees a real stretch of low-rate time.",
          "During the window, a 0% rate means no interest accrues on the transferred balance. If the offer is a low rate rather than 0%, interest accrues at that rate — slower than before, but not stopped. Either way, the minimum payment is still due every month. The window is a cheaper period, not a payment holiday.",
          "When the window ends, any balance that remains starts accruing interest at the card's regular APR. That rate is set by the issuer and depends on your creditworthiness; it is printed in the offer terms, and you should know it before you transfer. As a benchmark, the Federal Reserve's G.19 release for August 2026 puts the average APR on credit card accounts assessed interest at 22.36%. The assessed-interest figure is the right comparison point: it measures only accounts actually charged interest. One more detail to pin down: when the clock starts. On some offers the promotional period runs from the day the account opens; on others, from the date the transfer posts. The difference can cost you a month of the window."
        ]
      },
      {
        "heading": "The transfer fee",
        "paragraphs": [
          "The fee is the price of the transfer, and it applies even at 0% interest. The Consumer Financial Protection Bureau states that a card company can charge a balance transfer fee on a zero-percent offer, and that the fee is usually a percentage of the amount you transfer or a fixed amount, whichever is more. Zero percent describes the rate, not the cost of moving the money.",
          "The fee is added to your new balance the moment the transfer posts, not billed separately, and it counts against your credit limit from day one. It shrinks the amount you can move, and if any balance remains when the promotion ends, you pay interest on the fee as well as on the transferred amount.",
          "Your offer states the exact fee, and it varies by card — check it before you apply. For the worked examples in this guide, assume a 3% fee: $150 on a $5,000 transfer, making the starting balance $5,150. The 3% figure is an illustrative assumption for the math, not a claim about what any card charges.",
          "The fee is the whole cost of a transfer done right: clear the balance inside the window and you pay the fee and nothing else. So the decision is one comparison — the fee against the interest you would otherwise pay. If the interest you avoid is larger than the fee, the transfer saves money. If not, it is an expensive way to rearrange your debt."
        ]
      },
      {
        "heading": "Does a transfer save money? A worked example",
        "paragraphs": [
          "Take a $5,000 balance at 22.36% APR — the Federal Reserve's August 2026 average for accounts assessed interest — and a fixed payment of $300 a month, with no new charges. Left on the card, that balance takes 21 months to clear and costs $1,043.11 in interest, for a total repaid of $6,043.11. The first month alone adds $93.17 in interest, so only $206.83 of the first $300 payment reduces the balance.",
          "Now transfer it. Assume a 3% fee — $150 — so the new card starts at $5,150 at 0%. Paying the same $300 a month, the balance clears in 18 months: seventeen payments of $300 and a final $50, with zero interest. The transfer costs $150 total, saving $893.11 against leaving the balance where it was, and finishing three months sooner.",
          "The breakeven logic matters more than the specific numbers: a transfer saves money whenever the interest you avoid exceeds the fee. Here the margin is wide — $1,043.11 against a $150 fee — so even at an illustrative 5% fee ($250), the transfer would still save $793.11. The margin narrows when the balance is small, the old rate is low, or the payment is small. Run the same comparison on your own numbers before deciding.",
          "For contrast, paying only the minimum each month — the month's interest plus 1% of the balance — on that same $5,000 at 22.36% takes 231 months, over 19 years, and costs $8,241.21 in interest. A fixed $300 payment on the original card already cuts that by more than $7,000. The transfer is the cheapest of the three routes, by a clear margin."
        ],
        "table": {
          "head": [
            "Route",
            "Months to debt-free",
            "Interest and fees",
            "Total repaid"
          ],
          "rows": [
            [
              "Minimum payments only",
              "231 months",
              "$8,241.21 interest",
              "$13,241.21"
            ],
            [
              "$300 a month, same card",
              "21",
              "$1,043.11 interest",
              "$6,043.11"
            ],
            [
              "Transfer, $300 a month",
              "18",
              "$150.00 fee, $0 interest",
              "$5,150.00"
            ]
          ]
        }
      },
      {
        "heading": "What happens if you don't clear it in time",
        "paragraphs": [
          "A transfer that runs past its window is a smaller win, not a disaster. Whatever remains when the promotion ends accrues interest at the card's regular APR. The examples below use the Federal Reserve's 22.36% average as the example regular rate; your card's actual rate is in its terms, and the arithmetic works the same at any rate.",
          "Say the window is 12 months — an illustrative length — and you pay $300 a month. Twelve payments total $3,600, leaving $1,550 when the window closes. At 22.36% and $300 a month, that remainder takes 6 more months and adds $95.60 in interest. Total transfer cost: $245.60 over 18 months — still $797.51 less than the $1,043.11 the balance would have cost on the old card.",
          "At $200 a month instead, twelve payments total $2,400, leaving $2,750 when the window closes. At 22.36%, that remainder takes 17 more months and adds $456.61 in interest — $606.61 total over 29 months. Paying $200 a month directly on the original card takes 34 months and costs $1,792.96 in interest. The transfer still saves $1,186.35 and finishes five months sooner, even though more than half the balance missed the window.",
          "The pattern is consistent: missing the window shrinks the saving but rarely erases it, because the fee is small next to a year of interest at 22.36%. The real failure mode is paying only the minimum during the window, then carrying most of the balance at the full rate afterward. The guard is a payment test, done before you transfer: add the fee to the balance and divide by the promotional months. Here, $5,150 divided by 12 months is $429.17 a month. If that payment does not fit, find an offer with a longer window or choose a different route."
        ]
      },
      {
        "heading": "The traps",
        "paragraphs": [
          "The first trap is new purchases. A 0% transfer rate covers the transferred balance, not the card: spending on the same card accrues interest from the date of the transaction, even while the transferred balance sits at 0%. The Consumer Financial Protection Bureau is explicit — you will be charged interest on purchases unless you pay the entire balance off in full by the due date, including the transferred balance. Federal rules send any payment above the minimum to the highest-APR balance first, so extra payments attack purchases before the 0% balance, but interest still accrues on them meanwhile. The fix is simple: do not use the transfer card for purchases. Spend on a different card you pay in full, or pay with debit, until the transfer is cleared.",
          "The second trap is a late payment. If you are more than 60 days late, the card company can increase your interest rate on all balances, including the transferred balance — the Consumer Financial Protection Bureau states this directly. One missed stretch can end the promotion that justified the fee. Set up autopay for at least the minimum the day the account opens, and treat the promotional payment as a fixed bill.",
          "The third trap is the transfer being refused or repriced. Most issuers will not let you transfer a balance between two cards from the same issuer — the new card has to come from a different bank. And many offers honor the promotional rate only for transfers requested within a set window after the account opens; miss it and the transfer may post at the regular APR. Both rules vary by offer, so check them before you apply.",
          "The last trap opens the day the transfer lands: the old card is at zero, its limit is free again, and the spending that built the balance is still there. If the freed credit gets used, you end up with a payment on the new card and a growing balance on the old one — worse than where you started. Keep the old card open, since closing it removes available credit and raises your utilization ratio, but take it out of your wallet until the transfer is paid off."
        ]
      },
      {
        "heading": "How a transfer affects your credit score",
        "paragraphs": [
          "A balance transfer touches your credit score in four ways, and they do not all point in the same direction. The first two are small and short-lived. Applying triggers a hard inquiry, which can lower your score slightly for a short time, and opening the account lowers the average age of your accounts. Both fade as the account ages — but applying for several cards at once multiplies the inquiries, so apply for one offer, not several.",
          "The third effect is utilization, and it cuts both ways. Your utilization ratio is your balances divided by your total available credit, and a lower ratio generally helps your score. Suppose you carry a $5,000 balance with $10,000 in total limits — 50% utilization. A new card with a $6,000 limit raises your total available credit to $16,000, dropping overall utilization to about 31%. But the $5,150 transferred balance sits on a $6,000-limit card, so that one card is 86% utilized — and high utilization on a single card can weigh on your score even when the overall ratio improves.",
          "The fourth effect matters most, and it is positive: paying the balance down. Every payment during the window reduces the balance and the utilization ratio, with no interest working against you. By the time the transfer is cleared, the inquiry has faded and the utilization is lower. A transfer that ends at zero usually leaves your score better than it found it.",
          "One caution on the old card: do not close it after the transfer. Closing removes its limit from your total available credit, pushing your utilization ratio back up overnight without you spending a dollar. Keep it open, keep it at zero, and let it age. If it charges an annual fee you no longer get value from, weigh the fee against the utilization effect before closing."
        ]
      },
      {
        "heading": "Alternatives to a balance transfer",
        "paragraphs": [
          "A personal loan is the closest alternative, and the better choice when you need more time than a promotional window gives. A loan replaces the card balance with a fixed rate, a fixed payment, and a fixed end date. On the Federal Reserve's August 2026 figures, a 24-month personal loan carries an 11.90% rate against 22.36% on credit cards assessed interest. A $5,000 loan at 11.90% over 24 months costs $235.13 a month and $643.21 in total interest. Paying that same $235.13 a month directly against the card takes 28 months and costs $1,426.67 in interest. The loan saves $783.46 on the same monthly payment — but it costs more than the transfer done right, where the total cost was a $150 fee. Check whether the loan charges an origination fee, and count it in the comparison.",
          "The second alternative needs no new credit: pay the balance down where it sits, using the avalanche or the snowball method. The avalanche sends every spare dollar to the highest APR first, minimizing total interest; the snowball pays the smallest balance first, for quick wins. On a single $5,000 card at 22.36% with $300 a month, both are the same arithmetic — 21 months and $1,043.11 in interest. They diverge when you hold several debts at different rates. Either way, you pay no fee and take no hard inquiry; you simply pay more interest than the transfer route. A third option costs nothing: call your current issuer and ask for a lower rate before you apply anywhere.",
          "If the minimum payments alone exceed what you can pay, none of these routes fits — the right next step is help rather than a new product. A nonprofit credit counselor can review your budget and set up a structured repayment plan with your creditors. The Consumer Financial Protection Bureau's consolidation guidance starts in the same place: work out why the debt built up before choosing a tool to move it."
        ],
        "table": {
          "head": [
            "Option",
            "Cost on a $5,000 balance",
            "Time",
            "Best when"
          ],
          "rows": [
            [
              "Balance transfer (cleared in window)",
              "$150 fee",
              "18 months",
              "You can pay $300 a month"
            ],
            [
              "Personal loan at 11.90%",
              "$643.21 interest",
              "24 months",
              "You need a fixed payment and more time"
            ],
            [
              "Pay down where it is",
              "$1,043.11 interest",
              "21 months",
              "You can't get approved"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Add the fee to the balance: $5,000 with an illustrative 3% fee starts at $5,150",
          "Divide by the promotional months: $5,150 over 12 months needs $429.17 a month",
          "Read the regular APR and end date, and price what a leftover balance would cost",
          "Commit to no new purchases on the transfer card until the transferred balance is gone",
          "Set autopay for at least the minimum, and a reminder a month before the rate ends"
        ],
        "heading": "Decide in five steps",
        "paragraphs": [
          "A balance transfer is a tool with a deadline. It does its best work for a borrower who knows the monthly payment, has a plan for the leftover, and can leave the new card alone until the balance is gone. If that is you, the fee is a small price for a year or more without interest. If the payment does not fit, or the card will keep getting used, the transfer only postpones the problem.",
          "Work through the five steps before you apply. They take ten minutes, and they answer the only question that matters: will this transfer leave you with less debt, sooner, than staying put?"
        ]
      }
    ],
    "seoTitle": "Balance Transfer Cards Explained: Costs, Math, Traps",
    "slug": "balance-transfer-cards-explained",
    "sources": [
      {
        "label": "Federal Reserve — G.19 Consumer Credit, August 2026 (released October 7, 2026)",
        "url": "https://www.federalreserve.gov/releases/g19/20261007/"
      },
      {
        "label": "Consumer Financial Protection Bureau — What do I need to know about consolidating my credit card debt?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-do-i-need-to-know-if-im-thinking-about-consolidating-my-credit-card-debt-en-1861/"
      },
      {
        "label": "Consumer Financial Protection Bureau — Do I pay interest on new purchases after I get a zero or low rate balance transfer?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/do-i-pay-interest-on-new-purchases-after-i-get-a-zero-or-low-rate-balance-transfer-en-49/"
      },
      {
        "label": "Consumer Financial Protection Bureau — Regulation Z, §1026.55 (limitations on increasing APRs)",
        "url": "https://www.consumerfinance.gov/rules-policy/regulations/1026/55/"
      }
    ],
    "title": "Balance Transfer Cards: How They Work",
    "type": "What",
    "updated": "2026-10-24"
  },
  {
    "cornerstone": false,
    "description": "The Fed sets one short-term rate and everything else follows. How the federal funds rate, prime, and the 10-year Treasury decide what you pay to borrow.",
    "faqs": [
      {
        "answer": "No. The Fed sets a target range for the federal funds rate, the overnight rate banks charge each other. Mortgage rates are set by lenders and investors, and they track the 10-year Treasury yield much more closely than the Fed's rate. In October 2026 the 10-year yield was 5.13 percent and the average 30-year fixed mortgage was 7.32 percent, a gap of about 2.2 percentage points for credit risk, prepayment risk, and servicing costs.",
        "question": "Does the Federal Reserve set mortgage rates?"
      },
      {
        "answer": "Usually within one or two billing cycles. Most card APRs are defined as the prime rate plus a margin, and prime moves the same day the Fed moves its target range. When the Fed raised the range on September 16, 2026, prime rose from 6.75 to 7.00 percent the next day, and prime-linked card APRs followed by a quarter point. Your margin, the part set by the issuer, does not change with a Fed move.",
        "question": "How fast does a Fed rate change reach my credit card?"
      },
      {
        "answer": "Prime is the rate banks charge their most creditworthy business customers. The Fed's H.15 release defines it as the rate posted by a majority of the top 25 U.S. banks by assets. By long-standing convention it sits 3 percentage points above the top of the federal funds target range, so when the range rose to 3.75-4.00 percent in September 2026, prime rose to 7.00 percent. It is the base rate for most variable-rate consumer borrowing.",
        "question": "What is the prime rate, and how is it set?"
      },
      {
        "answer": "Because inflation was still running well above its 2 percent goal. The September consumer price report showed prices up 3.7 percent over 12 months, up from 3.4 percent in August, with core inflation at 2.6 percent. The FOMC's statement said plainly that inflation remains elevated and that the quarter-point increase, approved 12-0, would support a timelier return to the 2 percent goal. It was the first rate increase since July 2023.",
        "question": "Why did the Fed raise rates in September 2026?"
      },
      {
        "answer": "The federal funds rate is the overnight rate banks charge each other for reserve loans, and it is the floor of the system. The rate you pay adds the lender's costs and risks on top: the term of the loan, your credit profile, whether the loan is secured, and the lender's margin. That is why the average card APR was 22.36 percent in August 2026 while the federal funds target range was 3.75-4.00 percent.",
        "question": "What is the difference between the federal funds rate and the rate I pay?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/how-interest-rates-are-set.jpg",
    "imageAlt": "Flat-vector illustration of a central-bank building beside a rising and falling orange rate line on a cream background",
    "inlineImage": "/images/how-interest-rates-are-set-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of three interlocking gears linking a bank building to a house and a credit card",
    "intro": "Interest rates are set in layers. The Federal Reserve sets one short-term rate, the federal funds rate, and banks, bond markets, and lenders build every other rate on top of it. This guide traces that chain, from the Fed's September 2026 decision to the rate on your credit card and your mortgage.",
    "published": "2026-10-28",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Interest Calculator",
        "url": "/personal-wealth/interest-calculator"
      },
      {
        "name": "APR Calculator",
        "url": "/loans/apr-calculator"
      }
    ],
    "sections": [
      {
        "heading": "The one rate everything else is built on",
        "paragraphs": [
          "The federal funds rate is the interest rate banks charge each other for overnight loans of the reserves they hold at the Federal Reserve. Banks that end the day short of reserves borrow from banks that have a surplus, and the price of that overnight loan is the federal funds rate. It is the shortest, safest lending in the American financial system, which is why it anchors everything else.",
          "The Federal Reserve does not set this rate by decree. The Federal Open Market Committee, the Fed's policy-setting body, sets a target range, and the Fed then uses its own lending and borrowing operations to steer the market rate inside it. The range matters more than any single number: the actual rate, called the effective federal funds rate, is a market outcome that moves within the range day to day. In late October 2026 it printed at 3.88 percent, inside a range of 3.75 to 4.00 percent, according to the Fed's H.15 release.",
          "As of this writing, the target range is 3.75 to 4.00 percent. The Committee raised it by a quarter of a percentage point on September 16, 2026, the first increase since July 2023, and the change took effect the next day. Before that move the range had stood at 3.50 to 3.75 percent since the July 29 meeting. One quarter point sounds small. Across an economy that runs on borrowed money, it is not: it reprices trillions of dollars of variable-rate debt within weeks."
        ]
      },
      {
        "heading": "Who sets the rate, and when",
        "paragraphs": [
          "The decision belongs to the Federal Open Market Committee, or FOMC. It has 12 voting members: the seven governors of the Federal Reserve Board, the president of the Federal Reserve Bank of New York, and four of the other eleven regional Reserve Bank presidents, who rotate through one-year voting terms. The Committee meets eight times a year, and each decision is announced in a short written statement at 2:00 p.m. Eastern time on the final day of the meeting.",
          "The September 15-16, 2026 meeting ended with a unanimous 12-0 vote to raise the target range by a quarter point. The statement was blunt about the reason: \"Inflation remains elevated. Today's policy action will support a timelier return to the Committee's 2 percent goal.\" The contrast with the previous meeting is instructive. On July 29 the Committee had held the range at 3.50 to 3.75 percent by a 9-3 vote, with three members dissenting because they preferred to raise then. By September, the holdouts had won the argument.",
          "The Committee's mandate comes from Congress: maximum employment and stable prices, which the Fed defines as 2 percent inflation over the longer run, measured by the personal consumption expenditures price index. Every rate decision is a judgment about those two goals. When inflation runs above target, the Committee raises rates to cool spending; when the labor market weakens, it cuts them to support jobs.",
          "The Committee meets again on October 27-28, with its decision due at 2:00 p.m. Eastern on October 28, the day this guide is published. That decision is not reflected here: everything in this guide is anchored on the September 16 decision and the data published before it."
        ]
      },
      {
        "heading": "How the Fed actually makes the rate stick",
        "paragraphs": [
          "Setting a target is one thing. Making thousands of banks lend to each other inside it is another. The Fed does it with administered rates, prices it sets directly, that bracket the market rate from above and below.",
          "The main tool is interest on reserve balances, known as IORB. The Fed pays banks interest on the reserves they hold at the central bank, and the rate was set at 3.90 percent effective September 17, 2026. No bank will lend reserves overnight to another bank for less than the 3.90 percent it can earn risk-free by leaving the money at the Fed, so IORB acts as a soft floor that pulls the market rate up toward it.",
          "The floor below that is the overnight reverse repurchase agreement facility, or ON RRP, set at 3.75 percent. It lets a wide set of financial firms, not just banks, lend cash to the Fed overnight in exchange for Treasury securities. Nobody lends in the market below 3.75 percent when the Fed itself offers 3.75 percent. At the top of the range sits the standing repo facility at 4.0 percent, where banks can borrow cash from the Fed against Treasury collateral, and the primary credit rate, the rate the Fed charges banks that borrow directly from its discount window, also 4.0 percent. Nobody borrows in the market above 4.0 percent when the Fed lends at 4.0 percent.",
          "These four rates, published in the Fed's implementation note alongside each decision, form a corridor: 3.75 percent at the bottom, 4.0 percent at the top, and IORB at 3.90 percent guiding the market rate toward the middle. The Fed also keeps the banking system supplied with ample reserves, so the rate is governed by these administered prices rather than by any shortage of cash. That is the machinery behind the headline number."
        ]
      },
      {
        "heading": "From the policy rate to prime",
        "paragraphs": [
          "The first rate most borrowers ever meet is prime. The prime rate is the rate banks charge their most creditworthy business customers, and the Fed's H.15 release defines it as the rate posted by a majority of the top 25 insured U.S. banks, ranked by assets. In practice it moves in lockstep with the Fed: prime typically sits 3 percentage points above the top of the federal funds target range, and banks adjust it the same day the Fed moves.",
          "The September hike shows the pattern exactly. When the top of the target range rose from 3.75 to 4.00 percent on September 17, prime rose from 6.75 to 7.00 percent the same day, and it has stood at 7.00 percent since. That 3-point gap is a convention, not a law, but every major bank follows it.",
          "Prime matters because it is the base for most variable-rate borrowing in the United States. A credit card agreement usually defines your APR as prime plus a margin set by the issuer based on your credit. A home equity line of credit works the same way. When the Fed raises its target by a quarter point, prime rises by a quarter point, and every prime-linked APR rises by a quarter point with it, usually within one or two billing cycles. The Fed never touches your card directly. Prime is the transmission belt."
        ]
      },
      {
        "heading": "Which of your rates move with the Fed, and which do not",
        "paragraphs": [
          "Not every rate follows the Fed. The dividing line is fixed versus variable. Variable-rate debt reprices when prime moves: credit cards, home equity lines of credit, some private student loans, and adjustable-rate mortgages when their reset date arrives. Fixed-rate debt does not: a fixed mortgage, a fixed auto loan, and a fixed personal loan keep the rate you locked in, no matter what the Fed does next. The Fed's decision affects your next loan, not your current one, unless your current one is variable.",
          "The table below shows where the main rates stood in late October 2026, using the latest published figures. Note the gaps between them. The Fed's target range is the floor of the system; every other rate adds a markup for time, risk, and the lender's costs.",
          "The credit card figure deserves a closer look. The Fed's G.19 release for August 2026 put the average APR at 22.36 percent on card accounts that were actually assessed interest, and 21.19 percent across all accounts. That is roughly 15 percentage points above prime. The gap is not a mistake: card lending is unsecured, losses are high, and the issuer funds rewards programs and operations from the same spread. The Fed sets the floor. Your credit profile and the lender's risk set the markup."
        ],
        "table": {
          "head": [
            "Rate",
            "Level",
            "As of",
            "Source"
          ],
          "rows": [
            [
              "Federal funds target range",
              "3.75-4.00%",
              "Sep 17, 2026",
              "FOMC statement"
            ],
            [
              "Interest on reserve balances",
              "3.90%",
              "Sep 17, 2026",
              "Implementation note"
            ],
            [
              "Prime rate",
              "7.00%",
              "Sep 17, 2026",
              "Fed H.15"
            ],
            [
              "30-year fixed mortgage",
              "7.32%",
              "Oct 22, 2026",
              "Freddie Mac PMMS"
            ],
            [
              "10-year Treasury yield",
              "5.13%",
              "Oct 21, 2026",
              "U.S. Treasury"
            ],
            [
              "Credit cards, accounts assessed interest",
              "22.36%",
              "Aug 2026",
              "Fed G.19"
            ],
            [
              "24-month personal loan",
              "11.90%",
              "Aug 2026",
              "Fed G.19"
            ],
            [
              "60-month new car loan",
              "7.54%",
              "Aug 2026",
              "Fed G.19"
            ]
          ]
        }
      },
      {
        "heading": "Why mortgage rates follow the 10-year Treasury, not the Fed",
        "paragraphs": [
          "If the Fed sets rates, why did the average 30-year fixed mortgage fall to 7.32 percent in Freddie Mac's October 22 survey, down from 7.40 percent the week before, a month after the Fed raised rates? Because a 30-year mortgage is long-term lending, and long-term lending is priced off long-term benchmarks, above all the 10-year Treasury note.",
          "Investors who fund mortgages compare them with the safest long-term alternative: lending to the U.S. government for ten years. On October 21, 2026, the 10-year Treasury yield stood at 5.13 percent, according to the Treasury's daily par yield curve. The 30-year mortgage averaged 7.32 percent the next day. The gap of about 2.2 percentage points covers the extra risk of mortgage lending: borrowers can default, they can refinance or sell early and repay ahead of schedule, and servicing the loan costs money. When the 10-year yield moves, mortgage rates usually follow within days. When the Fed moves the overnight rate, mortgage rates often barely react.",
          "This is why mortgage rates and the Fed's rate can move in opposite directions. The 10-year yield reflects what investors expect inflation and growth to average over the next decade, not what the Fed did this month. A rate hike that convinces investors inflation will fall can push long-term yields down, and mortgage rates with them. Conversely, a Fed cut that looks like it will overheat the economy can push long-term yields up.",
          "The practical rule is simple. For a credit card or a home equity line, watch the Fed and prime. For a mortgage, watch the 10-year Treasury yield. And remember that 7.32 percent is a national average for a specific borrower: a buyer with a credit score of 740 or higher, a loan-to-value ratio between 75 and 80 percent, and a conventional loan within the conforming limit. Your own quote depends on your credit, your down payment, and your lender."
        ]
      },
      {
        "bullets": [
          "Rising inflation, especially core inflation that persists month after month, pushes the Fed toward higher rates.",
          "A strong labor market and resilient consumer spending give the Fed room to keep rates high without fearing a recession.",
          "Falling inflation, rising unemployment, or signs of financial stress push the Fed toward cuts.",
          "Expectations matter as much as data: if investors believe inflation will stay high, long-term rates rise even before the Fed acts."
        ],
        "heading": "Inflation is the reason rates move",
        "paragraphs": [
          "The Fed raises rates for one main reason: inflation above its 2 percent goal. Higher rates make borrowing more expensive, which cools spending, which takes pressure off prices.",
          "The data behind the September hike arrived in two waves. The Fed acted on August figures showing inflation still elevated; then the September consumer price report, published October 14, confirmed the direction. The consumer price index rose 3.7 percent over the 12 months ending in September, up from 3.4 percent in August, the Bureau of Labor Statistics reported. Core inflation, which strips out food and energy, rose 2.6 percent over the year, up from 2.4 percent. Gasoline drove much of the monthly increase, up 9.1 percent in September alone, while shelter rose 3.2 percent over the year and food 2.5 percent.",
          "The recent history shows how far the Fed will go. From March 2022 to July 2023, the Committee raised its target range eleven times, by a total of 5.25 percentage points, from 0.00-0.25 percent to 5.25-5.50 percent, the highest level in 22 years. It was the fastest tightening cycle in modern history, and it was a response to the inflation surge of 2021-2022. The range then held at that peak for over a year before the Fed began cutting in September 2024. The September 2026 increase was the first hike since that cycle ended, and it came because inflation, at 3.7 percent, is still nearly double the Fed's 2 percent goal.",
          "What pushes rates up or down comes down to a short list:"
        ]
      },
      {
        "heading": "A quarter point, worked out in dollars",
        "paragraphs": [
          "A quarter of a percentage point sounds trivial until it is multiplied by a balance and a term. Start with a credit card. Take a $5,000 balance at the Fed's August 2026 average APR on accounts assessed interest, 22.36 percent. The monthly interest on that balance is $5,000 times 22.36 percent divided by 12, which is $93.17. Add a quarter point, to 22.61 percent, and the monthly interest becomes $94.21. The difference is $1.04 a month, or $12.50 a year, on one card. Small for one borrower; across the $1.35 trillion of revolving credit Americans carry, a quarter point moves billions.",
          "Now take a mortgage, where the same quarter point is amplified by a large balance and a 30-year term. A $400,000 loan at the October 22 average 30-year fixed rate of 7.32 percent costs $2,747.72 a month in principal and interest. At 7.57 percent, a quarter point higher, the payment is $2,816.06 a month. The difference is $68.33 a month, $820 a year, and $24,600 over the life of the loan. Total interest rises from $589,180 to $613,780. That is the real cost of a quarter point on a mortgage: roughly the price of a car, spread over 30 years.",
          "The September hike also shows up directly in prime-linked borrowing. A $10,000 home equity line balance priced at prime cost $675 a year in interest when prime was 6.75 percent; at 7.00 percent it costs $700 a year, a $25 increase for each $10,000 borrowed. The arithmetic is the same everywhere: the rate change times the balance times the time you carry it."
        ],
        "table": {
          "head": [
            "Example",
            "Before",
            "After a 0.25-point rise",
            "Extra cost"
          ],
          "rows": [
            [
              "$5,000 card balance",
              "$93.17 / month interest",
              "$94.21 / month interest",
              "$1.04 / month"
            ],
            [
              "$400,000 mortgage, 30 years",
              "$2,747.72 / month",
              "$2,816.06 / month",
              "$68.33 / month"
            ],
            [
              "$10,000 balance at prime",
              "$675 / year interest",
              "$700 / year interest",
              "$25 / year"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Know which of your rates are variable. Card and home equity rates reprice within a billing cycle or two of a Fed move; fixed loans do not.",
          "Run the numbers before you borrow or refinance. A quarter point is $24,600 on a $400,000 mortgage, so the rate you lock matters more than the timing of the next Fed meeting.",
          "Do not try to time the Fed. Mortgage rates move on the 10-year Treasury and on expectations, and they have moved against the Fed's decision in both directions."
        ],
        "heading": "What to watch next",
        "paragraphs": [
          "Rates are set meeting by meeting, and the calendar gives you the dates that matter. The October 27-28 decision is announced at 2:00 p.m. Eastern on October 28. The next consumer price report, covering October, is scheduled for November 10. The Committee meets again on December 8-9. Between meetings, the most useful numbers are the monthly inflation reports and the 10-year Treasury yield, which moves every day and leads mortgage rates.",
          "The Fed also publishes its own expectations four times a year. In the Summary of Economic Projections released with the September decision, the median FOMC participant put the appropriate federal funds rate at 4.1 percent at the end of both 2026 and 2027. That is a projection, not a promise: it is the median of eighteen individual forecasts, and it will move with the data. But it tells you the direction the Committee itself expects.",
          "For your own money, three things matter more than guessing the next decision:"
        ]
      }
    ],
    "seoTitle": "How Interest Rates Are Set: The Fed, Prime & Your Loans",
    "slug": "how-interest-rates-are-set",
    "sources": [
      {
        "label": "Federal Reserve — FOMC statement, September 16, 2026",
        "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm"
      },
      {
        "label": "Federal Reserve — Implementation Note issued September 16, 2026",
        "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a1.htm"
      },
      {
        "label": "U.S. Bureau of Labor Statistics — Consumer Price Index, September 2026",
        "url": "https://www.bls.gov/news.release/archives/cpi_10142026.htm"
      },
      {
        "label": "Federal Reserve — Consumer Credit, G.19",
        "url": "https://www.federalreserve.gov/releases/g19/"
      }
    ],
    "title": "How Interest Rates Are Set",
    "type": "What",
    "updated": "2026-10-28"
  },
  {
    "cornerstone": false,
    "description": "Call before you miss a payment. A rate cut on a $6,000 card at 22.36% APR saves $1,700 in interest — what to ask for, what to say, and what to get in writing.",
    "faqs": [
      {
        "answer": "Yes — and that is the best time to call. The FTC advises contacting creditors before a debt collector gets involved, and creditors are more flexible with accounts in good standing. A rate reduction or a hardship plan is far easier to get while you are current. Settlements are different: creditors rarely discount a balance that is being paid on time.",
        "question": "Can I negotiate with a creditor before I miss a payment?"
      },
      {
        "answer": "The negotiation itself does not hurt your score. What hurts it is what often comes with it: missed payments, a charge-off after 4–6 months of nonpayment, or an account marked settled for less than the full balance. A rate reduction on a current account avoids all three, which is another reason to call early.",
        "question": "Will negotiating with creditors hurt my credit score?"
      },
      {
        "answer": "There is no set percentage. The amount depends on how old the debt is, whether it has been charged off, whether a collector now owns it, and how much cash you can offer in one payment. Anyone quoting a fixed range is selling a service, not stating a fact. Decide the most you can pay, offer it, and let the creditor counter.",
        "question": "How much will a creditor accept to settle a debt?"
      },
      {
        "answer": "Generally, yes. The IRS treats canceled debt as taxable income, and the creditor may send you Form 1099-C. On a $3,000 forgiven balance, a 22% marginal tax rate adds $660 to your tax bill. Two main exclusions apply: debt canceled in bankruptcy, and debt canceled while you are insolvent. Both require filing Form 982 with your return.",
        "question": "Is forgiven debt taxable?"
      },
      {
        "answer": "You can negotiate yourself for free, and the FTC says you do not need to pay a company to talk to your creditors for you. If you do hire one, know the law: a settlement company cannot charge fees before it settles a debt. These programs often tell you to stop paying your creditors, which damages your credit and adds late fees and interest while you wait.",
        "question": "Should I hire a debt settlement company?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/how-to-negotiate-with-creditors.jpg",
    "imageAlt": "Flat-vector illustration of two people shaking hands across a table with a credit card and documents between them",
    "inlineImage": "/images/how-to-negotiate-with-creditors-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a person on the phone beside a stack of coins and a downward arrow",
    "intro": "Call your creditor before you miss a payment, not after. Creditors can cut your rate, waive fees, set up a hardship plan, or accept a lump sum for less than you owe — but nothing is automatic. Here is how to prepare, what to say, and what to get in writing.",
    "published": "2026-11-04",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Debt Payoff Calculator",
        "url": "/loans/debt-payoff-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What creditors can actually agree to",
        "paragraphs": [
          "A creditor is not required to negotiate. The FTC notes that a creditor might be willing to work with you — and might even accept less than you owe — but no rule forces it to. Your leverage is simple: a creditor would rather collect something on a schedule than chase a balance that goes unpaid. That is why the call works best before the account is seriously behind.",
          "The concessions worth asking for fall into five groups. A rate reduction lowers the interest charged each month. A hardship plan temporarily lowers or suspends payments. A fee waiver removes late or over-limit fees already charged. A longer repayment term spreads the balance over more months at a lower payment. A settlement closes the account for a lump sum below the balance. Most creditors offer the first three readily; settlements usually require the account to be delinquent."
        ]
      },
      {
        "heading": "Before you call: know your numbers",
        "paragraphs": [
          "Never open a negotiation without your numbers in front of you. The representative will ask what you can pay, and not knowing ends the conversation. Gather every statement, list each balance, APR, and minimum payment, and work out the most you can pay each month after rent, food, transport, and utilities. The table below shows the list for a borrower with three cards.",
          "Minimum payments here use the common formula of that month's interest plus 1% of the balance. Write down the single number that matters most: the monthly amount you can reliably pay. If that number covers the minimums on every account, you are negotiating for a better rate or a faster payoff. If it does not, you are negotiating for a hardship plan — and you need to say so plainly."
        ],
        "table": {
          "head": [
            "Debt",
            "Balance",
            "APR",
            "Minimum payment"
          ],
          "rows": [
            [
              "Credit card A",
              "$6,000",
              "22.36%",
              "$172"
            ],
            [
              "Credit card B",
              "$2,400",
              "22.36%",
              "$69"
            ],
            [
              "Store card",
              "$900",
              "22.36%",
              "$26"
            ]
          ]
        }
      },
      {
        "bullets": [
          "State the situation in one sentence: a job loss, a medical bill, or hours cut — no long story.",
          "Name the number you can pay each month, and ask what the creditor can do to fit it.",
          "Ask for a rate reduction first. It costs the creditor nothing today and saves you the most over time.",
          "If the answer is no, ask what would change it: a smaller balance, a lump sum, or a different department.",
          "Write down the representative's name, the date, and every term agreed — before you hang up."
        ],
        "heading": "How to make the call",
        "paragraphs": [
          "Call the number on your statement and ask for the hardship department. Front-line representatives follow a script; hardship teams have the authority to change terms. Have your account number, balance, and the payment you can afford in front of you before you dial.",
          "Stay calm and specific. Threatening to stop paying, or to file for bankruptcy, can push the account toward collections instead of a deal. If the representative cannot help, ask for a supervisor or a callback from the hardship team — and call again another day if needed. Different representatives have different authority."
        ]
      },
      {
        "heading": "What a lower rate is worth",
        "paragraphs": [
          "A rate cut is the cheapest win in debt negotiation, and the math shows why. Credit cards assessed interest at 22.36% in August 2026, according to the Federal Reserve's G.19 release. At that rate, a $6,000 balance accrues $111.80 of interest in a single month — before you pay a dollar of principal.",
          "The same $200 a month clears the debt nine months sooner and saves $1,700.39 in interest — from one phone call. The 12% rate is an example, not a promise: your creditor may offer more, less, or nothing. But the comparison shows what is at stake, and why the rate is the first thing to ask about.",
          "The alternative is worse. Paying only the minimum on that same $6,000 balance — the month's interest plus 1% of the balance — takes 246 months, more than 20 years, and costs $9,929.56 in interest. Every month at the minimum is a month the balance barely moves."
        ],
        "table": {
          "head": [
            "",
            "At 22.36% APR",
            "At 12% APR"
          ],
          "rows": [
            [
              "Monthly payment",
              "$200",
              "$200"
            ],
            [
              "Months to pay off",
              "45",
              "36"
            ],
            [
              "Total interest",
              "$2,869.63",
              "$1,169.24"
            ],
            [
              "Total paid",
              "$8,869.63",
              "$7,169.24"
            ]
          ]
        }
      },
      {
        "heading": "Lump-sum settlement: how it works",
        "paragraphs": [
          "A settlement means the creditor accepts one payment below the balance and closes the account. Creditors usually consider it only when the account is already delinquent — they have little reason to discount a balance you are paying on time. The FTC notes that creditors may be willing to negotiate even after they charge off a debt, which typically happens after 4–6 months of missed minimum payments.",
          "There is no standard settlement percentage. The amount depends on how old the debt is, whether it has been charged off, and how much cash you can offer in one payment. Treat any figure a company quotes as a sales pitch, not a fact. Work out what you can offer, make the offer, and let the creditor counter.",
          "Suppose a creditor accepts $5,000 on an $8,000 balance. The $3,000 forgiven is generally taxable income, and the creditor may send you Form 1099-C. At a 22% marginal tax rate, that adds $660 to your tax bill — so the real saving is $2,340, not $3,000. The IRS excludes canceled debt in bankruptcy and to the extent you are insolvent, but those exceptions have their own rules and forms.",
          "Settlement also costs you on your credit report. An account settled for less than the full balance is marked as settled, and the missed payments that led to it stay on the report. Weigh that against the alternative: a balance you cannot pay grows with interest and fees either way."
        ]
      },
      {
        "heading": "Hardship plans and debt management plans",
        "paragraphs": [
          "If you cannot pay the minimums at all, ask for a hardship plan: the creditor temporarily lowers or suspends payments, often for a few months, while you get back on your feet. The FTC describes the same options for mortgages — lower or suspended payments, or a longer repayment period — and credit card issuers run similar programs. Ask what happens to interest and fees during the pause before you agree.",
          "A debt management plan is the structured version, run through a nonprofit credit counseling organization. The counselor negotiates lower rates or waived fees with your creditors, you make one monthly deposit, and the organization pays each creditor. The FTC says a successful plan requires regular, timely payments and can take 48 months or more to complete. Plans cover unsecured debts such as credit cards — not mortgages or car loans.",
          "Do not confuse a debt management plan with debt settlement. A management plan repays the full balance, usually at a lower rate; settlement pays less than the balance and damages your credit more. A legitimate counselor reviews your full finances before recommending either — if a plan is pushed as your only option without that review, find a different counselor."
        ]
      },
      {
        "heading": "When negotiation fails",
        "paragraphs": [
          "Some creditors will not deal, and some debts have already moved on. After a charge-off, the creditor may sell the debt to a collector, who then has the authority to negotiate — the FTC advises talking to the collector at least once, to confirm the debt is really yours, without sharing personal or financial information. Do not ignore a lawsuit: if a collector sues and you do not appear in court, it can win a judgment against you.",
          "If no creditor will negotiate and no plan fits your income, the remaining options are a consolidation loan or bankruptcy. A consolidation loan only helps if its rate beats the rates you already pay — the average 24-month personal loan rate was 11.90% in August 2026, roughly half the card rate. Bankruptcy is a legal process with lasting consequences; a nonprofit credit counselor or legal aid office can walk through it for free."
        ]
      },
      {
        "heading": "Get it in writing and follow through",
        "paragraphs": [
          "Nothing counts until it is in writing. The FTC warns to get a written version of any agreement and save it until all payments are made. Before you pay a dollar under a new deal, confirm the letter or email states the new rate or payment, the length of the arrangement, and what happens if you miss a payment.",
          "Then check that the creditor kept its side. Read the next two statements line by line: the rate, the payment, and any fees should match the agreement. If they do not, call with the written agreement in hand. After the final payment, check your credit reports to confirm the account shows the agreed status — settled, paid, or current — and dispute anything that does not match.",
          "Finally, run the numbers forward. A negotiated rate only helps if the payment fits your budget every month. Use the Debt Payoff Calculator to compare the payoff date and total interest under the new terms against the old ones — the difference is the value of the call you made."
        ]
      }
    ],
    "seoTitle": "How to Negotiate With Creditors: Rates, Plans, Settlements",
    "slug": "how-to-negotiate-with-creditors",
    "sources": [
      {
        "label": "Federal Reserve — G.19 Consumer Credit, August 2026 (released October 7, 2026)",
        "url": "https://www.federalreserve.gov/releases/g19/20261007/"
      },
      {
        "label": "Federal Trade Commission — How To Get Out of Debt",
        "url": "https://consumer.ftc.gov/articles/how-get-out-debt"
      },
      {
        "label": "Consumer Financial Protection Bureau — Credit counseling vs. debt settlement, consolidation, and credit repair",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-credit-counseling-and-debt-settlement-debt-consolidation-or-credit-repair-en-1449/"
      },
      {
        "label": "Internal Revenue Service — Topic No. 431, Canceled Debt – Is It Taxable or Not?",
        "url": "https://www.irs.gov/taxtopics/tc431"
      }
    ],
    "title": "How to Negotiate With Creditors",
    "type": "How-to",
    "updated": "2026-11-04"
  },
  {
    "cornerstone": false,
    "description": "A $10,000 balance at 22.36% APR costs $17,558 in interest on minimum payments alone. This plan clears it in about two years for a fraction of that cost.",
    "faqs": [
      {
        "answer": "At 22.36% APR with a fixed $500 monthly payment, it takes 26 months. A $400 payment takes 34 months, and $300 takes 53 months. Paying only the minimum takes 300 months, or 25 years, because the minimum shrinks as the balance falls. The payment amount, not the balance alone, sets the timeline.",
        "question": "How long does it take to pay off $10,000 in credit card debt?"
      },
      {
        "answer": "Yes, by a wide margin. On a $10,000 balance at 22.36%, minimum payments cost $17,558 in interest over 25 years. A fixed $500 payment costs $2,629 in interest over 26 months. The extra $214 a month in the early months saves nearly $15,000. Even $50 above the minimum shortens the payoff measurably.",
        "question": "Is it better to pay more than the minimum on a credit card?"
      },
      {
        "answer": "It can be, if you clear the balance inside the 0% intro window. With a 3% transfer fee ($300) and a 15-month window, paying $687 a month clears the $10,300 balance with no interest. At $500 a month, the balance is gone in 21 months for $485 in fees and interest, against $2,629 at 22.36%.",
        "question": "Is a balance transfer card worth it for $10,000?"
      },
      {
        "answer": "The avalanche, highest APR first, always costs less interest. The snowball, smallest balance first, closes accounts sooner and can keep motivation up. On a $6,000 card at 24% and a $4,000 card at 19.99% with $500 a month, the avalanche saves $282 and one month. Pick the method you will actually follow.",
        "question": "Should I use the avalanche or snowball method?"
      },
      {
        "answer": "Usually, yes, because paying the balance down lowers your credit utilization, the share of available credit you use. A $10,000 balance on a $12,000 limit is 83% utilization. Clearing it also builds a record of on-time payments. Keep the card open after payoff so its limit continues to count toward your available credit.",
        "question": "Will paying off $10,000 in credit card debt improve my credit score?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/how-to-pay-off-10000-credit-card-debt.jpg",
    "imageAlt": "Flat-vector illustration of orange scissors cutting a deep emerald credit card, with geometric coins around it",
    "inlineImage": "/images/how-to-pay-off-10000-credit-card-debt-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a staircase of emerald and sage steps with coins shrinking as they climb toward an orange flag",
    "intro": "Pay a fixed $500 a month on a $10,000 balance at 22.36% APR and the debt is gone in 26 months for $2,629 in interest. Pay only the minimum and the same balance takes 25 years and costs $17,558 in interest. This guide shows the math, the payment to pick, and the order to pay multiple cards in.",
    "published": "2026-10-31",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Credit Card Payoff",
        "url": "/personal-wealth/credit-card-payoff-calculator"
      },
      {
        "name": "Debt Payoff Calculator",
        "url": "/loans/debt-payoff-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What $10,000 at 22.36% actually costs",
        "paragraphs": [
          "The average rate on credit card accounts assessed interest was 22.36% in August 2026, per the Federal Reserve's G.19 consumer credit release. At that rate, a $10,000 balance generates $186.33 of interest in the first month: $10,000 x 22.36% / 12. Any payment below $186.33 does not reduce the balance at all.",
          "The minimum payment makes the problem worse because it shrinks as the balance shrinks. Most issuers set the minimum at 1% of the balance plus that month's interest, with a $25 floor; this guide uses that formula for every minimum-payment figure below. In month one, the minimum on $10,000 is $286.33: $100 of principal plus $186.33 of interest.",
          "Pay only the minimum, every month, and the balance takes 300 months to clear: 25 years. Total interest comes to $17,558, so $10,000 of spending ends up costing $27,558. The minimum keeps the account current; it is not a plan to get out of debt. The fix is a fixed payment that stays the same as the balance falls, so more of each payment goes to principal every month.",
          "The table below shows four fixed payment levels, all at 22.36% APR with no new charges, from a month-by-month simulation. The gap between the $300 and $600 rows is the whole story: doubling the payment cuts the payoff from 53 months to 21 and saves $3,685 in interest."
        ],
        "table": {
          "head": [
            "Monthly payment",
            "Months to pay off",
            "Interest paid",
            "Total paid"
          ],
          "rows": [
            [
              "Minimum only",
              "300 (25 years)",
              "$17,558",
              "$27,558"
            ],
            [
              "$300 fixed",
              "53",
              "$5,771",
              "$15,771"
            ],
            [
              "$400 fixed",
              "34",
              "$3,586",
              "$13,586"
            ],
            [
              "$500 fixed",
              "26",
              "$2,629",
              "$12,629"
            ],
            [
              "$600 fixed",
              "21",
              "$2,086",
              "$12,086"
            ]
          ]
        }
      },
      {
        "heading": "Pick your monthly payment before anything else",
        "paragraphs": [
          "A payoff plan starts with one decision: the fixed monthly amount. The order of the cards and the choice between a balance transfer and a loan follow from it. The payment must be high enough to make real progress and low enough to survive a bad month without a missed payment, which costs a late fee and, if 30 days past due, a mark on your credit report.",
          "Work out the number from your budget, not the statement. Add up take-home pay, subtract rent or mortgage, utilities, food, transport, insurance, and the minimums on every other debt. What remains is the ceiling. If it is $500, the debt is gone in 26 months. If it is $400, the payoff takes 34 months and costs $957 more in interest. That $100 a month buys eight months of freedom.",
          "If the ceiling is under $300, do not force a bigger payment by cutting essentials. A plan that fails in month three is worse than a slower plan that holds. Pay the fixed amount you can sustain, then revisit it whenever income changes. A one-time $500 lump sum in month two saves $264 in interest and cuts two months off the payoff.",
          "Set the payment as a fixed dollar amount, not a percentage of the balance. A percentage payment falls as the balance falls, recreating the minimum-payment trap in a milder form. A fixed $500 payment starts at $186.33 interest and $313.67 principal in month one, and by the final months nearly all of it goes to principal. That is why it clears the debt in 26 months while the minimum takes 300."
        ]
      },
      {
        "heading": "Avalanche or snowball: choose your order",
        "paragraphs": [
          "If the $10,000 sits on more than one card, the order matters. The Consumer Financial Protection Bureau describes two methods. The highest interest rate method, usually called the avalanche, sends every extra dollar to the card with the highest APR while you pay the minimum on the rest. The snowball sends every extra dollar to the smallest balance first, then rolls that payment into the next smallest.",
          "The avalanche always costs less interest, because the highest-rate balance is the most expensive dollar you owe. The snowball closes accounts sooner, which some people need to stay motivated. The CFPB's framing is practical: pick the method that fits your situation, then put it into action. A plan you follow beats a perfect plan you abandon.",
          "The difference is usually smaller than people expect. Take $10,000 split across two cards: $6,000 at 24% APR and $4,000 at 19.99% APR, with $500 a month to pay them. These rates are illustrative, not market data. Under the avalanche, the 24% card gets the extra money first: the debt clears in 25 months with $2,500 of interest. Under the snowball, the $4,000 card goes first: 26 months and $2,782. The avalanche saves $282 and one month.",
          "That $282 is the price of the snowball's early win. If clearing the $4,000 card in about eight months is what keeps you paying, it is money well spent. Either way, never skip a minimum payment on any card to fund the target card: a missed minimum triggers a late fee, and at some issuers a penalty APR on the whole balance."
        ]
      },
      {
        "heading": "Lower the rate first if you can",
        "paragraphs": [
          "Every point of APR you remove goes straight to the payoff. Three routes exist, in this order: ask your issuer, transfer the balance, or take a consolidation loan. None reduces what you owe. They reduce the price of carrying it.",
          "Start with a phone call. The Federal Trade Commission's advice is direct: talk to your credit card company, ask to negotiate a lower interest rate, and suggest a payment plan you can afford. You do not need to be behind on payments to ask. Get any agreed terms in writing and keep the letter until the balance is paid. A five-point reduction, from 22.36% to 17.36%, on a $500-a-month plan cuts the payoff from 26 months to 24 and saves $738 in interest.",
          "A balance transfer card moves the debt to a card with a 0% introductory APR, usually for 12 to 21 months, for a transfer fee. Assume a 3% fee and a 15-month 0% window for the example below; check the actual offer before applying, because fees and windows vary. The $10,000 transfer costs $300, making the starting balance $10,300. At $500 a month, the balance is gone in 21 months, with $185 of interest on the small amount left after the intro period. Total cost: $485, against $2,629 at 22.36%.",
          "The transfer only pays off if you finish the job. Pay $687 a month and the $10,300 clears inside the 15-month window: $10,300 / 15 = $686.67. Pay only the minimum and the balance is still there when the intro rate ends, accruing interest at the regular APR. Do not put new purchases on the card either: many issuers apply payments to the transferred balance first, leaving new purchases at the full rate.",
          "A personal loan is the third option. The average rate on a 24-month personal loan was 11.90% in August 2026, per the same G.19 release, roughly half the card rate. A $10,000 loan at 11.90% over 36 months costs $331.67 a month and $1,940 in total interest: $689 less interest than $500 a month on the card, at a lower payment, with a fixed end date. The risk is behavioral: a loan frees up the card's limit, and if new spending fills it, you end up with the loan and a new card balance."
        ],
        "table": {
          "head": [
            "Route",
            "Monthly payment",
            "Months",
            "Interest and fees"
          ],
          "rows": [
            [
              "Minimum only, 22.36%",
              "$286.33, falling",
              "300",
              "$17,558"
            ],
            [
              "Fixed payment, 22.36%",
              "$500",
              "26",
              "$2,629"
            ],
            [
              "Balance transfer, 0% for 15 mo",
              "$500",
              "21",
              "$485"
            ],
            [
              "Personal loan, 11.90%",
              "$331.67",
              "36",
              "$1,940"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Cancel every subscription unused in the last 30 days, then check again in three months.",
          "Cap restaurant and delivery spending at one order a week until the balance is gone.",
          "Route windfalls, refunds, bonuses, and sale proceeds to the highest-rate card the day they arrive.",
          "Ask about overtime or an extra shift before cutting groceries or transport.",
          "Revisit the payment amount after any raise, refund, or paid-off loan."
        ],
        "heading": "Find the money in your budget",
        "paragraphs": [
          "The payment has to come from somewhere, usually a mix of spending cuts and extra income rather than one big sacrifice. List every recurring charge for one month: subscriptions, streaming, gym, apps, delivery services. Cancel anything unused in the last 30 days. The point is not austerity. It is finding $100 to $200 a month that was leaving without you noticing.",
          "Food is the largest flexible category for most households. Cooking at home instead of buying out, and cutting delivery-app orders to one a week, commonly frees $150 to $300 a month. That range is an estimate based on typical takeout spending, not a cited figure; add up the restaurant and delivery lines on your last two statements for your real number.",
          "One-time cash helps too, applied as a lump sum against the highest-rate balance. A tax refund, a sold item, a work bonus, or a month of overtime all shorten the payoff. Extra money applied in month two saves more interest than the same amount in month twelve, because it stops interest accruing for longer.",
          "If the budget genuinely has no room, the answer is income, not a smaller payment. Overtime, a second shift, freelance work, or selling unused items can bridge a $10,000 payoff in a way cuts alone cannot. Treat extra income as earmarked: it goes to the card the day it arrives, before other spending absorbs it."
        ]
      },
      {
        "heading": "Automate the plan so willpower is not required",
        "paragraphs": [
          "A plan that depends on remembering to pay fails in a busy month. Set up automatic payments for the fixed amount, two or three days after payday so the money is there. If cash flow is uneven, set autopay for the minimum as a safety net and make the extra payment manually on payday. The minimum autopay guarantees you never miss a payment; the manual top-up keeps the plan on schedule.",
          "Stop adding to the balance while you pay it down. That does not mean closing the card. It means taking it out of your wallet and deleting it from shopping apps and browsers. Use a debit card or cash for daily spending. Every new purchase adds interest at 22.36% and extends the payoff, and a few large charges can undo months of progress.",
          "Check the statement every month, even with autopay running. Confirm the payment posted, the interest charge matches the APR, and no charge you do not recognize appeared. A fraudulent charge caught in month one is a phone call; caught in month six, it is a dispute. Your statement also shows the minimum-payment warning box: how long the balance takes to clear on minimums alone, and what it costs.",
          "Keep the card open after the balance hits zero. Closing it removes its limit from your total available credit, raising utilization and possibly lowering your score. Put one small recurring charge on it, a streaming subscription, and pay it in full each month."
        ]
      },
      {
        "heading": "When the minimum is all you can pay",
        "paragraphs": [
          "Some months, the fixed payment is not possible. If the choice is between the minimum and nothing, pay the minimum. The FTC is clear about the stakes: miss the minimum for several months and your credit score takes a hit; miss it for four to six months and the creditor may charge off the debt as a loss, which damages your score further. A charge-off does not erase the debt, and the creditor can sell it to a collector.",
          "Call the issuer before you miss a payment, not after. Issuers have hardship programs that can lower the rate, waive fees, or set a reduced payment for a fixed period. The FTC advises asking for a lower rate and a plan you can afford, keeping records of who you spoke to, and getting any agreement in writing. You do not need to pay a company to negotiate for you.",
          "If the issuer's offer does not fit, a nonprofit credit counseling agency is the next step. A counselor reviews your full financial picture and may recommend a debt management plan: one monthly payment to the agency, which pays your creditors, who may agree to lower rates or waive fees. The FTC notes a successful plan requires regular, timely payments and can take 48 months or more. Check any agency with your state attorney general and local consumer protection office before signing, and get every fee in writing.",
          "Debt settlement is a different product and a riskier one. For-profit settlement companies typically ask you to stop paying creditors while you save toward a lump-sum offer. The FTC warns that stopping payments damages your credit, can lead to lawsuits, and can leave you owing more in late fees and interest if creditors refuse to settle. By law, a settlement company cannot collect fees before it settles a debt. Any company demanding payment up front, or guaranteeing the debt will disappear, is one to walk away from."
        ]
      },
      {
        "heading": "Protect your credit score while you pay down",
        "paragraphs": [
          "Paying off $10,000 improves your credit profile, but the path matters as much as the destination. Two factors dominate: payment history and credit utilization, the share of your available credit in use. A $10,000 balance on a $12,000 limit is 83% utilization, which weighs heavily on a score. The same balance on a $30,000 total limit across several cards is 33%. Paying the balance down lowers utilization month by month, and the score typically follows.",
          "On-time payments are the single most important habit in the plan. One payment 30 days late can stay on a credit report for up to seven years. Autopay for at least the minimum removes that risk. If a late payment happens, pay it immediately and ask the issuer for a goodwill removal of the late fee.",
          "Avoid opening new credit during the payoff unless it is part of the plan, such as the balance transfer card. Each application can cause a small, temporary dip from the hard inquiry, and a new account lowers the average age of your accounts. A new card with a fresh limit is also a temptation to spend while you are trying to do the opposite. The balance transfer is the exception, where the interest savings outweigh the inquiry.",
          "Do not close cards as you pay them off, and do not consolidate all balances onto one card if it ends up near its limit. Utilization is measured both per card and in total: a single maxed-out card hurts even when total utilization looks reasonable."
        ]
      },
      {
        "heading": "After the last payment: stay at zero",
        "paragraphs": [
          "The month the balance hits zero, redirect the payment before it disappears into spending. The $500 a month that went to the card becomes the first deposit into an emergency fund, then into retirement savings or the next goal. Keeping the habit is easier than rebuilding it, and the money is already missing from your budget.",
          "An emergency fund is what keeps the next $10,000 balance from happening. The card became the emergency fund last time: a car repair, a medical bill, a gap between jobs. A cash cushion, even a modest one, breaks that cycle. The CFPB's guidance on emergency funds frames the point plainly: a small reserve kept separate from daily spending covers the unexpected without borrowing at 22%.",
          "Keep one card and one rule: pay the statement balance in full every month. Interest is only charged on balances carried past the due date. A card paid in full each month costs nothing and builds the payment history that supports your score. If full payment is not possible in a given month, pay as much as you can above the minimum and treat the shortfall as a signal to check spending.",
          "Review the plan once a year, not once a week. Check the rate on each card, confirm autopay is still set, and look at whether a balance transfer or lower-rate offer would help. The work is mostly done in the first three months: the budget, the fixed payment, the automation. After that, the plan runs itself."
        ]
      }
    ],
    "seoTitle": "How to Pay Off $10,000 in Credit Card Debt Fast in 2026",
    "slug": "how-to-pay-off-10000-credit-card-debt",
    "sources": [
      {
        "label": "Federal Reserve, Consumer Credit (G.19), August 2026 release",
        "url": "https://www.federalreserve.gov/releases/g19/current/"
      },
      {
        "label": "Consumer Financial Protection Bureau, How to reduce your debt",
        "url": "https://www.consumerfinance.gov/archive/blog/how-reduce-your-debt/"
      },
      {
        "label": "Federal Trade Commission, How To Get Out of Debt",
        "url": "https://consumer.ftc.gov/articles/how-get-out-debt"
      }
    ],
    "title": "How to Pay Off $10,000 in Credit Card Debt",
    "type": "How-to",
    "updated": "2026-10-31"
  },
  {
    "cornerstone": false,
    "description": "A $300 payday loan costs $45 for two weeks — about 391% APR. Most borrowers roll it over again and again, paying more in fees than they borrowed. Here is why.",
    "faqs": [
      {
        "answer": "About 391%. A typical two-week payday loan charges $15 per $100 borrowed. That is 15% for 14 days, and there are about 26 two-week periods in a year, so 15% times 26.07 works out to about 391% APR. Fees range from $10 to $30 per $100 depending on state law, which works out to roughly 261% to 782% APR for a two-week loan.",
        "question": "What is the APR on a typical payday loan?"
      },
      {
        "answer": "$45 in fees if you repay on time, for a total of $345 two weeks later. If you roll it over once, you pay another $45 and still owe the $300 — $90 in fees for four weeks. Roll it over nine times and you have paid $450 in fees on a $300 loan. The CFPB found the median borrower pays $458 in fees over a year.",
        "question": "How much does a $300 payday loan cost?"
      },
      {
        "answer": "Yes. The lender debits the full balance on payday, and if the funds are not there, your bank may charge a non-sufficient funds fee for each failed attempt. The CFPB found that half of online payday borrowers were charged an average of $185 in bank penalties. After two consecutive failed attempts, the lender needs a new authorization from you before trying again.",
        "question": "Can a payday loan hurt my bank account?"
      },
      {
        "answer": "It depends on your state. Some states ban payday lending or cap rates at levels that make the traditional model unworkable; others allow fees of up to $30 per $100. There is no federal fee cap. Active-duty servicemembers and their dependents are protected by the Military Lending Act, which caps the rate at 36% MAPR. Check your state regulator for the rules where you live.",
        "question": "Are payday loans legal?"
      },
      {
        "answer": "A payday alternative loan (PAL) from a federal credit union. PALs cap APR at 28% and the application fee at $20, and you repay in installments over one to 12 months instead of all at once. A $300 PAL repaid over three months at 28% APR costs about $14 in interest. Asking the biller for a payment plan costs nothing and is worth trying first.",
        "question": "What is the cheapest alternative to a payday loan?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/payday-loans-why-theyre-a-trap.jpg",
    "imageAlt": "Flat-vector illustration of a wallet caught in a mousetrap, in deep emerald, burnt orange, and sage on a cream background",
    "inlineImage": "/images/payday-loans-why-theyre-a-trap-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of two diverging paths: a staircase of coins descending into a pit and a steady road leading to a growing plant",
    "intro": "A payday loan is a short-term, high-cost loan, usually $500 or less, due in full on your next payday. A typical $300 loan costs $45 for two weeks — about 391% APR. Most borrowers cannot repay on time, so they roll the loan over and pay fee after fee until the fees exceed the amount borrowed.",
    "published": "2026-11-08",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "APR Calculator",
        "url": "/loans/apr-calculator"
      },
      {
        "name": "Loan Calculator",
        "url": "/loans/loan-calculator"
      }
    ],
    "sections": [
      {
        "heading": "How a payday loan works",
        "paragraphs": [
          "A payday loan is a small, single-payment loan you take out against your next paycheck. The Consumer Financial Protection Bureau (CFPB) describes it as a short-term, high-cost loan, generally for $500 or less, typically due on your next payday — usually two to four weeks after you borrow. Storefront lenders hand you cash or load the money onto a prepaid card; online lenders deposit it into your bank account.",
          "To get one, you usually show proof of income and a bank account. The lender rarely checks whether you can afford to repay the loan and still cover your other bills — the CFPB notes that payday lenders generally do not assess ability to repay. Instead, the lender secures repayment directly: you write a post-dated check for the full balance, including the fee, or you authorize the lender to debit your bank account on the due date.",
          "That automatic access is what makes the loan dangerous. On payday, the lender takes the full amount — principal plus fee — in one withdrawal, whether or not the money is there. If your account is short, the debit bounces, the bank charges a non-sufficient funds fee, and the lender can try again."
        ]
      },
      {
        "heading": "What a $300 payday loan really costs",
        "paragraphs": [
          "Payday lenders do not quote an interest rate. They charge a flat fee per $100 borrowed, and state law sets the maximum — usually $10 to $30 per $100. A $15 fee per $100 is common, according to the CFPB. On a $300 loan, that is a $45 fee, so you repay $345 two weeks later.",
          "The fee looks small because the term is short. Annualized, it is not small at all. A $15 fee on $100 for 14 days is 15% for two weeks. There are about 26 two-week periods in a year (365 divided by 14), so 15% times 26.07 works out to about 391% APR. The CFPB puts it the same way: a typical two-week loan at $15 per $100 equates to an APR of almost 400%.",
          "The APR does not depend on how much you borrow — a $100 loan and a $500 loan at the same fee carry the same APR. It depends only on the fee and the term. A longer term lowers the APR, which is why installment payday loans can look cheaper while still charging the same fee per $100."
        ],
        "table": {
          "head": [
            "Fee per $100",
            "Fee on $300",
            "Total due in 14 days",
            "APR"
          ],
          "rows": [
            [
              "$10",
              "$30",
              "$330",
              "About 261%"
            ],
            [
              "$15",
              "$45",
              "$345",
              "About 391%"
            ],
            [
              "$20",
              "$60",
              "$360",
              "About 521%"
            ],
            [
              "$30",
              "$90",
              "$390",
              "About 782%"
            ]
          ]
        }
      },
      {
        "heading": "The rollover trap",
        "paragraphs": [
          "The trap is not the first fee. It is what happens on payday, when $345 leaves your account in one withdrawal. If you needed $300 to get through two weeks, losing $345 on payday usually leaves the same gap you started with — so you borrow again. The CFPB studied more than 12 million payday loans in 30 states and found that over 80% are rolled over or followed by another loan within 14 days.",
          "A rollover, where state law allows it, means you pay only the fee and the lender extends the due date. You still owe the full principal, and the next due date brings another fee. The CFPB's example: roll a $300 loan over once and you have paid $90 in fees for four weeks of borrowing — and you still owe the original $300.",
          "This is the normal outcome, not the exception. The CFPB found that half of all payday loans are part of a sequence at least 10 loans long. The median borrower takes out 10 payday loans in a year and pays $458 in fees; one in four pays $781 or more. Borrowers stay in debt a median of 199 days a year — more than half the year — on a product sold as a two-week bridge."
        ],
        "table": {
          "head": [
            "Fee payments made",
            "Total fees paid",
            "Principal still owed"
          ],
          "rows": [
            [
              "1 — repaid on time",
              "$45",
              "$0"
            ],
            [
              "2 — one rollover",
              "$90",
              "$300"
            ],
            [
              "6 — five rollovers",
              "$270",
              "$300"
            ],
            [
              "10 — nine rollovers",
              "$450",
              "$300"
            ]
          ]
        }
      },
      {
        "heading": "What happens when you cannot pay",
        "paragraphs": [
          "If the money is not in your account on the due date, the lender's debit fails and your bank may charge a non-sufficient funds fee. The lender can then try to debit your account again. The CFPB found that half of online payday borrowers were charged an average of $185 in bank penalties from repeated debit attempts.",
          "Federal rules limit the damage: after two consecutive failed payment attempts, a lender may not try to debit your account again without a new authorization from you. That payment rule took effect in March 2025, although the CFPB announced at the same time that it would not prioritize enforcing it. Your bank can still charge its own fees for each failed attempt.",
          "Some states require lenders to offer an extended repayment plan — extra time to pay off the loan in installments, sometimes with no additional fees. The CFPB advises borrowers to ask the lender about this option before rolling the loan over again. If your state does not require one, some lenders still offer a plan voluntarily. You can also revoke the lender's authorization to debit your account by notifying the lender in writing and telling your bank."
        ]
      },
      {
        "heading": "How payday loans compare with other borrowing",
        "paragraphs": [
          "The same $300 borrowed another way costs a fraction of the payday fee. Federal Reserve data for August 2026 put the average rate on credit card accounts assessed interest at 22.36% and on personal loans at 11.90%. At those rates, borrowing $300 for 14 days costs about $2.57 on a card and about $1.37 on a personal loan — against $45 for the payday loan.",
          "The comparison understates the gap, because a card or personal loan lets you repay over time while a payday loan demands the full $345 in one payment. A payday alternative loan (PAL) from a federal credit union is the closest like-for-like product: it is repaid in installments over months, and the rate is capped at 28%. A $300 PAL repaid over three months at 28% APR costs about $14 in interest, plus an application fee of no more than $20."
        ],
        "table": {
          "head": [
            "Way to borrow $300",
            "Cost for 14 days",
            "APR"
          ],
          "rows": [
            [
              "Payday loan ($15 per $100)",
              "$45.00",
              "About 391%"
            ],
            [
              "Credit card (average assessed rate, Aug 2026)",
              "$2.57",
              "22.36%"
            ],
            [
              "Personal loan (average, Aug 2026)",
              "$1.37",
              "11.90%"
            ],
            [
              "Credit union PAL (28% cap)",
              "$3.22",
              "Up to 28%"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Ask the biller first. Utility companies, landlords, and medical providers often offer payment plans or a short extension at no cost — cheaper than any loan.",
          "Ask your employer about a pay advance or a shift in your pay date. Many employers offer advances with no fee. Earned-wage-access apps are another option, but check the total cost of fees and tips before using one.",
          "Try a federal credit union PAL. PAL I loans run $200 to $1,000 over one to six months; PAL II loans go up to $2,000 over one to 12 months. Both cap APR at 28% and the application fee at $20, and neither can be rolled over.",
          "Use a credit card if you have one and can pay the balance off quickly — at the August 2026 average assessed rate of 22.36%, two weeks of interest on $300 is about $2.57.",
          "Call 211 or a local nonprofit credit counselor for help with the underlying shortfall. A counselor can negotiate payment plans with creditors and help build a budget that keeps the gap from recurring."
        ],
        "heading": "Cheaper ways to cover the same $300",
        "paragraphs": [
          "Most payday borrowing covers ordinary bills, not one-off emergencies — which is why the first step is usually to shrink the bill itself rather than borrow for it."
        ]
      },
      {
        "bullets": [
          "Ask for an extended repayment plan. Some states require lenders to offer one, sometimes with no added fees. Ask before the due date, not after.",
          "Revoke the debit authorization. Tell the lender in writing that it may no longer debit your account, and give your bank a copy so it blocks further attempts.",
          "Do not take a second payday loan to pay the first. That is the rollover cycle by another name, and it doubles the fees without reducing what you owe.",
          "Talk to a nonprofit credit counselor about a debt management plan. Counselors can often negotiate lower payments and stop collection calls while you repay.",
          "Report problems to your state regulator or the CFPB. You can submit a complaint at consumerfinance.gov or by calling (855) 411-2372."
        ],
        "heading": "If you already have a payday loan",
        "paragraphs": [
          "If a payday loan is already outstanding, the goal is to stop the fee cycle before the fees pass the amount you borrowed."
        ]
      },
      {
        "heading": "The rules that are supposed to protect you",
        "paragraphs": [
          "There is no federal cap on payday loan fees. Regulation is mostly left to the states: some ban payday lending outright or cap rates low enough that the traditional model cannot operate, while others allow fees up to $30 per $100. The lender must disclose the APR and finance charge before you sign, under the Truth in Lending Act — that disclosure is your clearest view of the cost.",
          "Active-duty servicemembers and their dependents have stronger protection: the Military Lending Act caps the Military Annual Percentage Rate at 36% on payday and other consumer loans. The CFPB's 2017 payday rule would have required lenders to check that borrowers could repay before lending; those underwriting provisions were rescinded in 2020, leaving only the payment provisions, which took effect in March 2025. In practice, the main protection is the one you give yourself: knowing the APR before you borrow, and having a cheaper plan for the next shortfall."
        ]
      }
    ],
    "seoTitle": "Payday Loans: Why They Are a Trap and What to Do Instead",
    "slug": "payday-loans-why-theyre-a-trap",
    "sources": [
      {
        "label": "CFPB — What is a payday loan?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-payday-loan-en-1567/"
      },
      {
        "label": "CFPB — What are the costs and fees for a payday loan?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-are-the-costs-and-fees-for-a-payday-loan-en-1589/"
      },
      {
        "label": "CFPB — Data Point: Payday Lending (March 2014)",
        "url": "https://files.consumerfinance.gov/f/201403_cfpb_report_payday-lending.pdf"
      },
      {
        "label": "eCFR — 12 CFR 701.21, payday alternative loans",
        "url": "https://www.ecfr.gov/current/title-12/chapter-VII/subchapter-A/part-701/section-701.21"
      }
    ],
    "title": "Payday Loans: Why They're a Trap",
    "type": "What",
    "updated": "2026-11-08"
  },
  {
    "cornerstone": false,
    "description": "Secured vs unsecured loans compared: how collateral changes your rate, what you risk if you default, and a worked $15,000 example showing the true cost gap.",
    "faqs": [
      {
        "answer": "Usually, but not always. Collateral lowers the lender's risk, so secured rates average well below unsecured rates — 7.54% for a 60-month new-car loan against 11.90% for a 24-month personal loan in August 2026. But a secured loan with a long term, high fees, or a borrower with excellent credit can still cost more than a well-priced unsecured loan. Compare APR and total interest, not the label.",
        "question": "Is a secured loan always cheaper than an unsecured loan?"
      },
      {
        "answer": "Not directly. An unsecured lender has no lien on your home, so it cannot foreclose. It can sue you, and if it wins a judgment, state law may allow it to place a judgment lien on property or garnish wages — but that takes a court case, notice, and a chance to respond. A home equity loan is different: the house is the collateral, and the lender can foreclose without suing first.",
        "question": "Can a lender take my house over an unsecured loan?"
      },
      {
        "answer": "Often, yes. The lender sells the car, and if the sale price does not cover your balance, the shortfall is a deficiency balance you still owe — the CFPB's example is $10,000 owed on a car sold for $7,500, leaving a $2,500 deficiency plus repossession fees. If the sale brings in more than you owe, the surplus is yours.",
        "question": "Do I still owe money after my car is repossessed?"
      },
      {
        "answer": "A secured loan. The CFPB notes that collateral reduces the lender's risk, so secured credit may be easier to get with a low score or no credit history. An unsecured lender has only your credit record to judge you by, so a low score means a higher rate, a smaller limit, or a denial. A savings-secured loan is a common starting point for building credit.",
        "question": "Which is easier to get with a low credit score?"
      },
      {
        "answer": "Yes, by refinancing — for example, paying off credit cards with a home equity loan, or replacing a personal loan with a savings-secured loan at a lower rate. The trade is real: you swap a higher rate for a lower one and put an asset at risk in the process. Run the numbers first, and do not secure a debt with your home unless the saving is large and your income is stable.",
        "question": "Can I turn an unsecured loan into a secured one?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/secured-vs-unsecured-loans.jpg",
    "imageAlt": "Flat-vector illustration of secured versus unsecured loans: a padlock over a house and car on one side, a credit card and document on the other",
    "inlineImage": "/images/secured-vs-unsecured-loans-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a balance scale weighing a house against a stack of coins, with a shield behind it",
    "intro": "A secured loan is backed by property the lender can take if you stop paying: a car or a house. An unsecured loan has no collateral; the lender relies on your credit and income. That difference sets the rate, the amount you can borrow, and what you stand to lose. Secured is cheaper. Unsecured risks less of what you own.",
    "published": "2026-11-18",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Loan Calculator",
        "url": "/loans/loan-calculator"
      },
      {
        "name": "Personal Loan Calculator",
        "url": "/loans/personal-loan-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What makes a loan secured",
        "paragraphs": [
          "A secured loan is tied to an asset you pledge as collateral: a house for a mortgage, a car for an auto loan, savings for a savings-secured loan, or home equity for a home equity loan or line of credit. The lender records a lien — a legal claim — on that asset. If you stop paying, the lender can take the asset and sell it to recover the balance.",
          "Collateral lowers the lender's risk, so secured loans usually carry lower rates and larger limits than unsecured loans for the same borrower. The lender is not betting only on your promise to pay; it has a second way to get its money back. That is also why secured loans can be easier to qualify for with a thin credit file or a low score: the asset does part of the persuading.",
          "The trade is straightforward. You get cheaper money, and in exchange you put a specific piece of property on the line. The property is usually the thing the loan buys — the car, the house — but it does not have to be. A home equity loan puts your house behind money you spend on something else entirely, which is why the risk deserves a hard look before you sign."
        ]
      },
      {
        "heading": "What makes a loan unsecured",
        "paragraphs": [
          "An unsecured loan has no collateral. The lender approves it on your credit history, income, and debt load, and its only protection is your signed promise to repay. Most personal loans, credit cards, and student loans — federal and private — are unsecured.",
          "Because the lender has no asset to seize, it prices the risk into the rate. Unsecured rates run higher than secured rates for comparable borrowers, and approval standards are stricter: a weak credit history that a secured lender might overlook can mean a denial, a smaller limit, or a much higher rate from an unsecured lender.",
          "The advantage is that no single asset is at stake. Default still has consequences — collections, a damaged credit report, and a possible lawsuit — but the lender cannot simply tow your car or foreclose on your house. It must pursue you through collections or the courts instead, which takes time and gives you a chance to respond before anything is taken."
        ]
      },
      {
        "heading": "The rate gap, in dollars",
        "paragraphs": [
          "The Federal Reserve's G.19 release for August 2026, published October 7, 2026, puts the average rate on a 60-month new-car loan at 7.54% and on a 24-month personal loan at 11.90%. The 72-month new-car rate was 7.17%. Credit cards, the most common unsecured borrowing, carried an average assessed interest rate of 22.36%.",
          "Take a $15,000 loan repaid over 60 months. At 7.54%, the payment is $300.85 a month and total interest comes to $3,051.27. At 11.90%, the payment is $332.91 a month and total interest is $4,974.55. The unsecured rate costs $32.05 more every month and $1,923.29 more over the life of the loan — about 13% of the amount borrowed, paid for nothing but the absence of collateral.",
          "The example holds amount and term constant and changes only the rate, so the gap is the rate's doing alone. In practice the G.19 personal-loan figure covers 24-month loans, and a 60-month unsecured loan would price differently — but the direction is consistent: collateral buys a lower rate, and the saving grows with the amount borrowed and the length of the term."
        ]
      },
      {
        "heading": "Secured vs unsecured at a glance",
        "paragraphs": [
          "The pattern holds across lenders: the more the lender can recover without suing you, the less it charges. The exception is the credit card, where the rate reflects not just the lack of collateral but revolving terms and the option to pay only a minimum each month."
        ],
        "table": {
          "head": [
            "",
            "Secured loan",
            "Unsecured loan"
          ],
          "rows": [
            [
              "Backed by",
              "Collateral: a car, house, or savings",
              "Your credit history and income"
            ],
            [
              "Typical rate",
              "Lower — 7.54% average for a 60-month new-car loan (Aug 2026)",
              "Higher — 11.90% average for a 24-month personal loan (Aug 2026)"
            ],
            [
              "Approval",
              "Easier with a thin file or low score",
              "Stricter; score and income decide"
            ],
            [
              "Loan size",
              "Larger, tied to the collateral's value",
              "Smaller, tied to income and credit"
            ],
            [
              "If you default",
              "Lender can take the collateral, then collect any shortfall",
              "Collections, credit damage, and a possible lawsuit"
            ],
            [
              "Common examples",
              "Mortgages, auto loans, home equity loans, HELOCs",
              "Personal loans, credit cards, student loans"
            ]
          ]
        }
      },
      {
        "heading": "What happens if you stop paying",
        "paragraphs": [
          "With a secured loan, the lender's first move is against the asset. An auto lender can repossess the car — in many states without a court order — and a mortgage lender can foreclose on the house. The loss of the asset does not end the debt. The lender sells the collateral, and if the sale does not cover what you owe, the shortfall is still yours.",
          "The Consumer Financial Protection Bureau gives the arithmetic: owe $10,000 on a car the lender sells for $7,500, and you owe the $2,500 deficiency plus repossession fees. The lender must sell in a commercially reasonable manner, and if the sale brings in more than you owe, the surplus is yours. The repossession fee itself must be reasonable, and you can ask the lender for a list of the costs. State law sets the details, including any additional rights you have.",
          "With an unsecured loan, there is nothing to repossess, so the lender's route runs through collections and, if that fails, a lawsuit. A judgment can lead to wage garnishment or a bank levy in many states — the money is still taken, but only after a court process, and you get notice and a chance to respond first. Either way, missed payments are reported to the credit bureaus, and the damage to your credit is the same on both sides of the table."
        ]
      },
      {
        "heading": "How each type affects your credit",
        "paragraphs": [
          "Both types report to the credit bureaus, and the same rule governs both: on-time payments build your record, missed payments damage it. A secured loan and an unsecured loan in good standing count the same way in that respect — the bureaus record the payment history, the balance, and the account's age, not whether collateral backs it.",
          "The differences show up at the edges. A credit card balance close to its limit raises your utilization — the share of available credit you are using — which weighs on scores more than an installment balance of the same size. A repossession or foreclosure is a serious negative mark, and a charged-off unsecured balance sent to collections is one too. Neither type is safer for your credit score; the payment behavior is what matters, and the collateral changes what the lender can take, not what the bureaus record."
        ]
      },
      {
        "bullets": [
          "Choose secured when the loan buys the collateral itself — a car or a home — and the rate saving is large. A mortgage or auto loan at a secured rate is the normal way to buy either.",
          "Choose secured when your credit is thin and an unsecured lender would charge a punitive rate or decline you outright. The collateral can be the difference between borrowing and not borrowing.",
          "Choose unsecured when the collateral would be something you cannot afford to lose. A home equity loan that puts your house behind a vacation or a business idea risks the roof over a want.",
          "Choose unsecured when your income is uncertain. If a job loss could interrupt payments, the lender that can only sue you is less dangerous than the lender that can take the car you need to reach the next job.",
          "Choose unsecured for smaller amounts and shorter terms, where the rate gap costs little in dollars. On a $2,000 loan repaid in a year, the difference between 8% and 12% is about $45 in interest."
        ],
        "heading": "Which one fits your situation",
        "paragraphs": [
          "The choice is a trade between price and exposure. There is no universally better loan — only a better fit for the amount, the purpose, and how steady your income is."
        ]
      },
      {
        "heading": "Before you sign either one",
        "paragraphs": [
          "Compare APR, not just the interest rate. APR folds in certain fees, so it is the honest number when one loan carries an origination fee and another does not. A personal loan at 10% with a 5% origination fee costs more than its rate suggests; a secured loan with appraisal or closing costs does the same.",
          "Check the term as well as the rate. A lower monthly payment on a longer term usually means more total interest, even at a lower rate: on a $15,000 loan, a 72-month term at 7.17% costs $3,501.22 in interest, against $3,051.27 for a 60-month term at 7.54% — $449.95 more, because the balance stands for an extra year.",
          "Run your own numbers before you choose. Put the amount, rate, and term into the Loan Calculator and the Personal Loan Calculator and compare the monthly payment and total interest side by side — then ask whether the cheaper loan's collateral is something you can afford to lose."
        ]
      }
    ],
    "seoTitle": "Secured vs Unsecured Loans: Rates, Risks, and Costs",
    "slug": "secured-vs-unsecured-loans",
    "sources": [
      {
        "label": "Federal Reserve — Consumer Credit (G.19)",
        "url": "https://www.federalreserve.gov/releases/g19/current/"
      },
      {
        "label": "Consumer Financial Protection Bureau — Differentiating between secured and unsecured loans",
        "url": "https://files.consumerfinance.gov/f/documents/cfpb_building_block_activities_differentiating-secured-unsecured-loans_guide.pdf"
      },
      {
        "label": "Consumer Financial Protection Bureau — What happens if my car is repossessed?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-happens-if-my-car-is-repossessed-en-865/"
      }
    ],
    "title": "Secured vs Unsecured Loans",
    "type": "Comparison",
    "updated": "2026-11-18"
  },
  {
    "cornerstone": false,
    "description": "A debt management plan combines unsecured debts into one monthly payment through a credit counselor, often at lower rates. See how DMPs work and their cost.",
    "faqs": [
      {
        "answer": "It can dip your score at first, because enrolled accounts are usually closed, which lowers your available credit. But a DMP replaces missed or minimum-only payments with one on-time payment each month, and payment history carries the most weight in credit scores. Over the life of a 48-month plan, that steady record usually rebuilds more than the closed accounts cost. The net effect depends on where you start.",
        "question": "Does a debt management plan hurt your credit score?"
      },
      {
        "answer": "Usually not. Creditors generally require enrolled accounts to be closed, and the FTC notes you may have to agree not to apply for or use additional credit while on the plan. That is deliberate: new charges would undo the payoff schedule. Keep a card out of the plan only if your counselor agrees it is necessary, and use it for emergencies only.",
        "question": "Can I use my credit cards while on a debt management plan?"
      },
      {
        "answer": "Fees vary by agency and state, and typically include a one-time setup fee plus a monthly fee. Get both in writing before enrolling, and ask what happens if you cannot afford them — a reputable nonprofit will work with you. Weigh the fees against the interest saved: in our example, a negotiated rate cut from 22.36% to 8% saved $4,198.42 over 48 months.",
        "question": "How much does a debt management plan cost?"
      },
      {
        "answer": "No. A DMP repays your full balance, usually at a lower interest rate, through one monthly payment to a counseling agency. Debt settlement asks creditors to accept less than you owe, usually requires you to stop paying while you save a lump sum, and the forgiven amount is generally taxable income. Settlement companies also may not charge fees before they settle a debt.",
        "question": "Is a debt management plan the same as debt settlement?"
      },
      {
        "answer": "Yes. You can leave a DMP at any time. If you cancel, you lose the negotiated rate reductions and fee waivers, and you go back to paying each creditor directly under the original terms. Before quitting, tell your counselor — a temporary hardship may allow a reduced payment instead of dropping out.",
        "question": "Can I cancel a debt management plan?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/what-is-a-debt-management-plan.jpg",
    "imageAlt": "Flat-vector illustration of several credit cards and bills merging into a single large payment arrow",
    "inlineImage": "/images/what-is-a-debt-management-plan-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of calendar pages with a debt block shrinking step by step",
    "intro": "A debt management plan (DMP) is a repayment program run by a nonprofit credit counseling agency. You make one monthly payment to the agency, and it pays your creditors. Creditors may lower your interest rates or waive fees, and plans take 48 months or more. A DMP repays what you owe in full; it does not reduce your balances.",
    "published": "2026-11-11",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Debt Payoff Calculator",
        "url": "/loans/debt-payoff-calculator"
      },
      {
        "name": "Credit Card Payoff",
        "url": "/personal-wealth/credit-card-payoff-calculator"
      }
    ],
    "sections": [
      {
        "heading": "How a debt management plan works",
        "paragraphs": [
          "A DMP starts with a counseling session, not a signup form. A certified counselor reviews your income, expenses, and debts — the Consumer Financial Protection Bureau (CFPB) says an initial session typically lasts about an hour — and helps you build a budget. Only then does the counselor decide whether a plan fits, and what your single monthly payment should be.",
          "If you enroll, the agency contacts each creditor and proposes the plan. Creditors that accept agree to the payment schedule, and many agree to lower your interest rate or waive late fees. You then deposit one payment with the agency each month, and the agency distributes it to your creditors on the agreed schedule. The agency is the middleman, not a lender: it does not lend you money or pay off your debts for you.",
          "The arrangement only works if every payment is on time. The Federal Trade Commission (FTC) warns that a missed payment can cost you the concessions — the lower rate, the waived fees — and set the plan back. Check your statements each month to confirm each creditor was paid on time and in the right billing cycle."
        ]
      },
      {
        "heading": "What a DMP covers — and what it does not",
        "paragraphs": [
          "DMPs cover unsecured debts: obligations with no collateral behind them. Credit cards are the most common, but medical bills, personal loans, and some other unsecured balances can be included. Your counselor reviews each debt and tells you which creditors have agreed to participate before you commit.",
          "Secured debts stay outside the plan. Your mortgage and auto loan are not enrolled, and you keep paying them directly. Federal student loans have their own repayment programs, such as income-driven repayment, so a counselor will usually handle them separately rather than folding them into the plan. Debts already in collections or subject to a court judgment may not be accepted either; that depends on the creditor."
        ],
        "table": {
          "head": [
            "Debt",
            "Usually included in a DMP?"
          ],
          "rows": [
            [
              "Credit cards",
              "Yes"
            ],
            [
              "Store cards",
              "Yes"
            ],
            [
              "Medical bills",
              "Yes"
            ],
            [
              "Personal loans",
              "Usually"
            ],
            [
              "Mortgage",
              "No — secured debt"
            ],
            [
              "Auto loan",
              "No — secured debt"
            ],
            [
              "Federal student loans",
              "Sometimes — separate programs often fit better"
            ],
            [
              "Debts in collections",
              "Depends on the creditor"
            ]
          ]
        }
      },
      {
        "heading": "What a DMP costs: a worked example",
        "paragraphs": [
          "Two costs matter: the agency's fees and the interest you still pay. Agencies are permitted to charge a setup fee and a monthly fee, and the amounts vary by agency and by state. The FTC advises getting a specific price quote in writing before you enroll, and asking what happens if you cannot afford the fees — a reputable agency will still help you.",
          "The interest saving is where a DMP earns its keep. Take $12,000 of credit card debt at 22.36%, the average rate the Federal Reserve measured on accounts assessed interest in August 2026. Paid off over 48 months at that rate, the payment is $380.42 a month and total interest comes to $6,260.26. Now suppose the counselor negotiates the rate down to 8%: the same 48-month payoff costs $292.96 a month, with $2,061.84 of interest. That is $87.47 less each month and $4,198.42 less in total interest — far more than the agency's fees in most cases.",
          "Compare that with paying only minimums. On the same $12,000 balance at 22.36%, the first month's interest alone is $223.60. A minimum payment set at 2% of the balance is $240, so just $16.40 of that payment reduces the balance. That is why minimum-only payments can stretch for years without visible progress, and why a fixed 48-month schedule changes the math."
        ],
        "table": {
          "head": [
            "Scenario",
            "Monthly payment",
            "Total interest",
            "Total paid"
          ],
          "rows": [
            [
              "48 months at 22.36%",
              "$380.42",
              "$6,260.26",
              "$18,260.26"
            ],
            [
              "48 months at 8% (negotiated)",
              "$292.96",
              "$2,061.84",
              "$14,061.84"
            ],
            [
              "Saving from the lower rate",
              "$87.47",
              "$4,198.42",
              "$4,198.42"
            ]
          ]
        }
      },
      {
        "heading": "How long a DMP takes",
        "paragraphs": [
          "Plan on four years or more. The FTC says a DMP could take 48 months or more to complete, and the exact timeline depends on how much you owe and what you can pay each month. Your counselor should estimate your timeline before you enroll — ask for it in writing, with the monthly payment and the total you will pay over the life of the plan.",
          "The length is the tradeoff. A DMP is not a quick fix; it is a fixed schedule that ends with the enrolled debts paid in full. If the monthly payment the counselor proposes is more than you can afford, do not sign up — the FTC's advice is blunt on this point. A plan you cannot sustain costs you the concessions and leaves you where you started, minus the fees you paid."
        ]
      },
      {
        "heading": "Who a DMP fits — and who it does not",
        "paragraphs": [
          "A DMP fits when you have steady income, mostly unsecured debt, and a payment you can sustain for four years or more. If your balances are mainly credit cards at high rates and you can afford a fixed monthly payment, the negotiated rate cut does the heavy lifting. The structure also helps if juggling several due dates is the reason payments slip — one payment, one date, no decisions to make each month.",
          "It fits less well when the problem is income, not rates. If your budget has no room for the payment the counselor proposes, the plan will fail, and the FTC advises against signing up in that case. It is also the wrong tool if your debts are mostly secured — a mortgage or auto loan in trouble needs its lender's own hardship program, not a DMP — or if you need the balances themselves reduced, which is settlement or bankruptcy territory, each with its own costs.",
          "Before enrolling, run your own numbers. Add up the minimum payments on the debts you would enroll, and compare that total with the DMP payment the counselor quotes. If the DMP payment is lower and the timeline is fixed at 48 months, the plan is doing real work. If it is higher than what you pay now, ask why — the answer may be a shorter timeline, or it may be a plan you do not need."
        ]
      },
      {
        "heading": "DMP vs. debt settlement vs. a consolidation loan",
        "paragraphs": [
          "A DMP is one of three common ways to deal with unsecured debt, and they work very differently. A DMP repays the full balance at a lower rate. Debt settlement asks creditors to accept less than you owe, usually as a lump sum — but settlement programs typically require you to stop paying creditors while you save up, which damages your credit and can add late fees and interest. A consolidation loan replaces several debts with one new loan, which only helps if the new rate beats the rates you already pay.",
          "The tax treatment differs too. A DMP usually does not affect your taxes, because you repay the full amount. With settlement, the IRS treats forgiven debt as taxable income in general — if a creditor forgives $5,000, that $5,000 is ordinarily income, reported on Form 1099-C, unless an exception such as insolvency or bankruptcy applies. And under the FTC's Telemarketing Sales Rule, a company selling debt relief by phone may not charge you a fee before it settles or reduces a debt."
        ],
        "table": {
          "head": [
            "Option",
            "What you repay",
            "Effect on credit",
            "Tax"
          ],
          "rows": [
            [
              "Debt management plan",
              "Full balance, lower rate",
              "Accounts usually closed; on-time payments help over time",
              "Usually none"
            ],
            [
              "Debt settlement",
              "Less than owed, lump sum",
              "Missed payments hurt; settled-for-less noted",
              "Forgiven amount generally taxable"
            ],
            [
              "Consolidation loan",
              "Full balance, new rate",
              "New inquiry; old accounts stay open",
              "None"
            ]
          ]
        }
      },
      {
        "heading": "How a DMP affects your credit",
        "paragraphs": [
          "Enrolling has a mixed effect. Creditors usually require enrolled accounts to be closed, which can lower your available credit and shorten your average account age — both factors in credit scores. A notation that the account is in a debt management plan may appear on your credit report.",
          "The other side of the ledger is payment history, which carries the most weight in the FICO score. A DMP replaces scattered, possibly late payments with one on-time payment each month. Over a 48-month plan, that steady record can rebuild what the closed accounts cost — but the improvement is gradual, and there is no shortcut. Anyone promising a fast score increase from a DMP is selling something else."
        ]
      },
      {
        "bullets": [
          "What are the setup and monthly fees, in writing — and what if I cannot afford them?",
          "Which of my creditors have agreed to the plan, and what rate and fee concessions did each one offer?",
          "How long will the plan take, and what is the total I will pay over its full term?",
          "Are your counselors certified by an outside organization?",
          "Will you help me even if I do not enroll in a DMP?"
        ],
        "heading": "How to choose a credit counseling agency",
        "paragraphs": [
          "Start with a nonprofit agency, but treat nonprofit status as a starting point, not a guarantee — the FTC warns that some nonprofits charge high fees or push DMPs before reviewing your finances. The CFPB suggests starting with the National Foundation for Credit Counseling (NFCC) or the Financial Counseling Association of America to find legitimate agencies. Interview more than one, and get every promise in writing before you sign anything.",
          "Walk away from any company that charges a fee before doing anything, guarantees it can settle your debts or erase your credit history, or refuses to put its fees in writing. Those are the marks of a debt relief scam, not a counseling agency."
        ]
      }
    ],
    "seoTitle": "What Is a Debt Management Plan? How DMPs Work in 2026",
    "slug": "what-is-a-debt-management-plan",
    "sources": [
      {
        "label": "CFPB: Credit counseling vs. debt settlement, consolidation, or credit repair",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-credit-counseling-and-debt-settlement-debt-consolidation-or-credit-repair-en-1449/"
      },
      {
        "label": "IRS Topic No. 431: Canceled debt — is it taxable or not?",
        "url": "https://www.irs.gov/taxtopics/tc431"
      },
      {
        "label": "NFCC: Debt Management Plan (DMP)",
        "url": "https://www.nfcc.org/debt-management-plan/"
      }
    ],
    "title": "What Is a Debt Management Plan?",
    "type": "What",
    "updated": "2026-11-11"
  },
  {
    "cornerstone": false,
    "description": "A loan denial is not a dead end. Learn the most common rejection reasons, your rights under ECOA, how to dispute errors, and what to fix before you reapply.",
    "faqs": [
      {
        "answer": "The rejection itself does not appear on your credit report — only the hard inquiry from the application does. One inquiry usually has a small, temporary effect. The damage comes from reapplying repeatedly: each new application adds another inquiry, and a cluster of them can lower your score and make lenders wary. Fix the reason for the denial before you apply again.",
        "question": "Does a rejected loan application hurt my credit score?"
      },
      {
        "answer": "No law sets a waiting period, so the answer depends on what caused the denial. If the problem was an error on your report, wait for the dispute to finish — the bureau has 30 days to investigate. If the problem was your DTI or your score, reapply once the numbers have actually changed. Applying again with the same facts usually produces the same answer.",
        "question": "How soon can I reapply after a rejection?"
      },
      {
        "answer": "Yes. Call the lender and ask for a reconsideration, and bring new information: proof of income you did not include, a corrected credit report, or a smaller loan amount. Lenders are not required to reverse a decision, and a reconsideration is not a formal appeal — but a denial based on incomplete information is the easiest kind to overturn.",
        "question": "Can I ask the lender to reconsider a denial?"
      },
      {
        "answer": "Often, yes. A co-signer with a stronger credit history and enough income lowers the lender's risk, and some lenders will approve an application with a co-signer that they would deny alone. The co-signer becomes equally responsible for the debt: missed payments damage both credit reports, and the lender can collect from the co-signer if you stop paying.",
        "question": "Will a co-signer help me get approved?"
      },
      {
        "answer": "ECOA makes it illegal for a lender to deny credit because of your race, color, religion, national origin, sex, marital status, age, or because your income comes from public assistance. If you believe discrimination played a part, you can submit a complaint to the CFPB. Keep your adverse action notice and any other documents from the lender — they are the evidence for any complaint.",
        "question": "What if I think the lender discriminated against me?"
      }
    ],
    "hub": "Loans & Debt",
    "image": "/images/why-your-loan-application-was-rejected.jpg",
    "imageAlt": "Flat-vector illustration of a loan application document marked with a burnt-orange declined symbol, beside a falling bar chart",
    "inlineImage": "/images/why-your-loan-application-was-rejected-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a magnifying glass over a stack of credit report documents, with a checkmark badge and balance scale",
    "intro": "A loan rejection is a decision about one application, not a verdict on your finances. Lenders deny applications for specific, fixable reasons: a low credit score, too much existing debt, income that does not cover the payment, or an error on your credit report. Federal law gives you the right to know why — and a path to fix it.",
    "published": "2026-11-14",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Debt-to-Income Ratio Calculator",
        "url": "/loans/debt-to-income-ratio-calculator"
      },
      {
        "name": "Loan Calculator",
        "url": "/loans/loan-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Start with the adverse action notice",
        "paragraphs": [
          "When a lender denies your application, federal law requires it to explain why. Under the Equal Credit Opportunity Act (ECOA) and Regulation B, the lender must send you an adverse action notice with the specific reasons for the denial — or tell you that you can request those reasons within 60 days.",
          "If the decision was based on your credit report, the notice must go further. It must give you the numerical credit score the lender used and the key factors that lowered it, name the credit reporting company that supplied the report, and tell you that you can get a free copy of that report if you ask within 60 days of the notice.",
          "Read the notice before you do anything else. It tells you which problem to fix first. A denial for insufficient income needs a different response than one for too many recent inquiries, and guessing wastes the weeks you could spend fixing the real issue. If the notice only offers reasons on request, ask for them in writing and keep a copy."
        ]
      },
      {
        "heading": "The most common reasons lenders say no",
        "paragraphs": [
          "Most denials come down to a short list of causes. Match the reasons on your notice to the list below to see what the lender actually measured — and what changes the outcome.",
          "One reason may hide another. A low score caused by a single wrongly reported late payment is a dispute problem, not a borrowing problem — which is why the next step is always your credit report."
        ],
        "table": {
          "head": [
            "Reason on the notice",
            "What it means",
            "What fixes it"
          ],
          "rows": [
            [
              "Credit score too low",
              "Your score fell below the lender's cutoff for this product.",
              "Pay down balances, pay every bill on time, and check for report errors."
            ],
            [
              "Debt-to-income ratio too high",
              "Your monthly debt payments take too much of your gross income.",
              "Pay off a debt, or apply for a smaller loan with a lower payment."
            ],
            [
              "Insufficient income",
              "The lender could not verify enough income to cover the payment.",
              "Document all income, or apply for a smaller amount."
            ],
            [
              "Limited credit history",
              "Your file is too thin for the lender to judge your repayment record.",
              "Build history with a secured card or credit-builder loan before reapplying."
            ],
            [
              "Too many recent applications",
              "Several hard inquiries in a short window suggest financial strain.",
              "Wait several months before applying again."
            ],
            [
              "Delinquent accounts or collections",
              "Late payments or unpaid debts appear on your report.",
              "Bring accounts current; negotiate payment on collections."
            ],
            [
              "Information could not be verified",
              "Employment, income, or identity details did not check out.",
              "Reapply with complete, matching documentation."
            ]
          ]
        }
      },
      {
        "heading": "Check your credit reports for errors",
        "paragraphs": [
          "Pull all three of your credit reports — Equifax, Experian, and TransUnion — and read them line by line. The three bureaus keep separate files, so an error can appear on one report and not the others, and the lender may have pulled the one with the mistake.",
          "You can check each report once a week for free at AnnualCreditReport.com, the only site federal law authorizes for free reports. The bureaus made weekly access permanent in 2023; the legal minimum is one free report per bureau every 12 months. Checking your own report never affects your score.",
          "Look for accounts you do not recognize, payments marked late that you made on time, balances that are wrong, and debts that belong to someone with a similar name. If you find an error, dispute it with the credit bureau that shows it and with the business that reported it. The bureau has 30 days to investigate, must forward your evidence to the business, and must send you the results in writing.",
          "Errors are the fastest fix in this guide. A corrected balance or a removed late payment can change your score within one reporting cycle, and a dispute costs nothing. Accurate negative information is different: most of it can stay on your report for seven years, and bankruptcy information for 10 years. You cannot dispute accurate information away — you can only outlast it and outweigh it with on-time payments."
        ]
      },
      {
        "heading": "Work out whether your debt-to-income ratio sank the application",
        "paragraphs": [
          "Your debt-to-income ratio (DTI) is your monthly debt payments divided by your gross monthly income, before taxes. The Consumer Financial Protection Bureau (CFPB) defines it that way, and every lender uses some version of it. Different lenders and loan products set different limits, but the math is the same everywhere — and the lender counts the payment on the loan you applied for.",
          "Suppose you earn $4,000 a month before taxes and already pay $1,100 on a mortgage, $350 on a car loan, and $250 on a student loan — $1,700 in total. Your DTI is 42.5% ($1,700 divided by $4,000). Now add a $10,000 personal loan. At the August 2026 average personal loan rate of 11.90%, a 36-month term costs $331.67 a month. Your DTI becomes 50.8% ($2,031.67 divided by $4,000) — more than half your gross income going to debt before taxes, food, or anything else. That is the number that got the application declined.",
          "The same loan costs $1,939.96 in interest over three years ($331.67 times 36, minus the $10,000 borrowed), which is worth knowing before you reapply for the same amount. Use the Debt-to-Income Ratio Calculator to run your own numbers, and the Loan Calculator to test what a smaller loan would cost each month. Paying off the $250 student loan first would cut the DTI in the example above to 44.5% ($1,781.67 divided by $4,000) — the same loan, a different answer."
        ]
      },
      {
        "heading": "Income and employment problems",
        "paragraphs": [
          "Lenders verify income, and a number on an application is not proof. Expect to provide recent pay stubs, tax returns, or bank statements, and expect the lender to contact your employer. If you are self-employed, expect to document your income with tax returns and bank statements rather than pay stubs.",
          "Short job tenure is a separate problem. A lender weighing an applicant with three months at a job sees income that may not last. There is no form you can file to fix this — time on the job is the fix, or a smaller loan that the same income covers comfortably.",
          "One common mistake is understating income. Lenders count more than salary: part-time work and rental income can count if you document them. If the denial says insufficient income, check whether you left income off the application before you accept the verdict."
        ]
      },
      {
        "bullets": [
          "Pay down credit card balances. A $4,200 balance on a $5,000 limit uses 84% of the available credit; paying $1,700 brings it to $2,500, or 50%. Lower balances help your score and your DTI at the same time.",
          "Bring any past-due account current. A late payment stays on your report, but a current account stops the damage from growing.",
          "Ask for a smaller loan or a longer term. Borrowing $6,000 instead of $10,000 at 11.90% over 36 months cuts the payment from $331.67 to $199.00 a month — and in the example above, the DTI from 50.8% to 47.5%.",
          "Consider a secured loan or a co-signer. Collateral or a co-signer with stronger credit lowers the lender's risk, but a co-signer becomes equally responsible for the debt.",
          "Wait for disputes to finish. A bureau has 30 days to investigate, so reapplying before the result lands means applying with the error still on your file."
        ],
        "heading": "Fix the problem before you reapply",
        "paragraphs": [
          "Reapplying with nothing changed usually produces the same answer — and adds another hard inquiry to your file. Work through the fixes that match your denial reasons first.",
          "Do not close old credit cards to clean up your file. Closing a card removes its credit limit from your available credit, which can raise your utilization and lower your score. Leave old cards open with a zero balance."
        ]
      },
      {
        "heading": "When to reapply — and when to stop applying",
        "paragraphs": [
          "There is no minimum waiting period after a denial. The right time to reapply is when the reason on your notice is fixed: the error is corrected, the balance is paid down, or the smaller loan amount fits your DTI. Reapplying on the same facts is the one move guaranteed to waste an inquiry.",
          "Each application typically adds a hard inquiry to your credit report, and hard inquiries stay visible for two years. One inquiry costs little on its own; a cluster of them in a short window can lower your score and, as the CFPB notes, may make lenders think you are dealing with financial setbacks. Space applications out, and use prequalification — which usually involves only a soft inquiry that does not affect your score — to test your chances before a full application.",
          "If three or more lenders decline the same application, stop and reassess rather than applying to a fourth. At that point the problem is usually the loan itself: too large for your income, or the wrong product for your credit history. A nonprofit credit counselor can review your full picture and help you build a plan."
        ]
      }
    ],
    "seoTitle": "Why Your Loan Application Was Rejected | DailyFinance",
    "slug": "why-your-loan-application-was-rejected",
    "sources": [
      {
        "label": "CFPB: What can I do if my credit application was denied because of my credit report?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/my-credit-application-was-denied-because-of-my-credit-report-what-can-i-do-en-1253/"
      },
      {
        "label": "CFPB: What is a debt-to-income ratio?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-why-is-the-43-debt-to-income-ratio-important-en-1791/"
      },
      {
        "label": "FTC: Disputing Errors on Your Credit Reports",
        "url": "https://consumer.ftc.gov/articles/disputing-errors-your-credit-reports"
      },
      {
        "label": "CFPB: How do I get a free copy of my credit reports?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-a-free-copy-of-my-credit-reports-en-5/"
      }
    ],
    "title": "Why Your Loan Application Was Rejected",
    "type": "Troubleshooting",
    "updated": "2026-11-14"
  }
]
