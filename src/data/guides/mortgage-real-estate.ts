import type { Guide } from "../guides"

/** Editorial guides — Mortgage & Real Estate hub. Part of the 100-article framework set. */
export const GUIDES_MORTGAGE_REAL_ESTATE: Guide[] = [
  {
    "cornerstone": false,
    "description": "Mortgage amortization explained: why early payments are mostly interest, how the split shifts over 30 years, and what extra payments and refinancing change.",
    "faqs": [
      {
        "answer": "A 15-year term usually carries a lower rate and forces faster payoff, saving the most interest — but it commits you to the higher payment. Extra payments on a 30-year loan save slightly less yet stay optional in a hard month.",
        "question": "Does a shorter term or extra payments save more?"
      },
      {
        "answer": "The payoff figure is what it costs to close the loan on a given date: the remaining principal plus interest accrued since your last payment, plus any fees for the payoff statement or recording the release. The balance on your statement is principal only, as of the statement date — it does not include the interest that has accrued since.",
        "question": "Why is my payoff amount higher than my balance?"
      },
      {
        "answer": "Your lender or servicer can provide it — most show the full schedule in the online account portal, and the Mortgage Amortization Calculator builds one for any loan. The schedule lists every payment's interest and principal split and the balance after each payment. Your monthly statement shows only the current payment's split, so use the full schedule when planning extra payments or a payoff date.",
        "question": "Where can I see my amortization schedule?"
      },
      {
        "answer": "No. Extra principal payments shorten the loan and cut total interest, but the scheduled payment stays the same until the loan is paid off. If you want a lower payment, the options are a recast — a lump sum plus a re-amortized payment — or a refinance. The payment only changes when the loan is rewritten, not when you pay ahead.",
        "question": "Does paying extra lower my monthly payment?"
      },
      {
        "answer": "Interest keeps accruing on the unpaid balance, and a late fee is added after the grace period. The missed principal stays on the balance, so the schedule does not simply shift by a month — the servicer will expect the missed amount repaid through a catch-up payment, a repayment plan, or a modification. Call the servicer before the due date if you cannot pay.",
        "question": "What happens to the schedule if I miss a payment?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/how-mortgage-amortization-works.jpg",
    "imageAlt": "Illustration of mortgage amortization: payment blocks shifting color over time in front of a house",
    "inlineImage": "/images/how-mortgage-amortization-works-inline.jpg",
    "inlineImageAlt": "Flat illustration of a house beside a bar chart shifting from orange to green, showing how mortgage payments move from interest to principal over time",
    "intro": "A mortgage payment looks level, but its composition is not. In the first years most of each payment is interest; in the last years most is principal. The amortization schedule decides how fast you build equity and how much interest you pay, and it is why extra payments early in the loan are worth more than the same payments later.",
    "published": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Mortgage Calculator",
        "url": "/real-estate/mortgage-amortization-calculator"
      },
      {
        "name": "Mortgage Payoff Calculator",
        "url": "/real-estate/mortgage-payoff-calculator"
      },
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      },
      {
        "name": "Refinance Calculator",
        "url": "/real-estate/refinance-calculator"
      }
    ],
    "sections": [
      {
        "heading": "The schedule, in numbers",
        "paragraphs": [
          "Take a $400,000 loan at 6.5% for 30 years. The payment is $2,528 a month. The first payment sends $2,167 to interest and $362 to principal. After 10 years the balance is still about $339,000 — you have paid $303,000 and reduced the debt by $61,000. Half the loan is repaid only around year 22. Total interest over the full term: roughly $510,000, more than the house cost.",
          "This is not a trick by the lender; it is arithmetic. Interest each month is the current balance times the monthly rate. A large balance charges large interest, leaving little of a fixed payment for principal. As the balance falls, the interest share falls with it, and the same payment retires more debt. The schedule is front-loaded because the balance is."
        ]
      },
      {
        "bullets": [
          "Biweekly half-payments equal one extra payment a year — worth about 4–5 years off a 30-year loan at typical rates.",
          "A lump sum (bonus, tax refund) applied to principal has the same effect as many small extras.",
          "Check for prepayment penalties before sending large extras; they are uncommon on modern US mortgages but exist."
        ],
        "heading": "What extra payments change",
        "paragraphs": [
          "An extra $200 a month on that loan pays it off about 5 years early and saves roughly $113,000 of interest. Extra payments work because every dollar goes entirely to principal, and a dollar of principal removed in year 2 would otherwise have charged interest for the remaining 28 years. The same $200 started in year 20 saves a fraction as much. If you plan to prepay, earlier is worth more — but keep the emergency fund and higher-interest debt ahead of the mortgage in the queue."
        ]
      },
      {
        "heading": "How the payment is calculated",
        "paragraphs": [
          "The payment comes from one formula, and the formula has only three inputs: the loan amount, the monthly interest rate, and the number of payments. The monthly rate is the annual rate divided by 12 — 6.5% becomes 0.5417% a month. The formula sets the payment so that, if you pay it every month for the full term, the balance reaches exactly zero on the last payment. Nothing else enters the calculation: not your income, not the home's value, not the tax bill.",
          "On the $400,000 loan, the formula gives $2,528.27 a month. The first month's interest is the balance times the monthly rate: $400,000 times 0.5417% is $2,166.67. The payment minus that interest — $361.61 — is the principal for month one, and the balance falls to $399,638.39. Month two charges interest on that smaller balance, $2,164.71, leaving $363.56 for principal. The payment never changes; the split changes because the balance does.",
          "Two things people expect to be in the formula are not. Property tax and homeowners insurance are not part of amortization — they are collected through escrow and added to your monthly check on top of principal and interest, and they can rise while the loan payment stays fixed. And the rate in the formula is the note rate, not the APR: the APR folds in fees and is a comparison tool, not the number that builds your schedule."
        ]
      },
      {
        "heading": "The schedule year by year",
        "paragraphs": [
          "The table shows the same $400,000 loan at five-year intervals. Read the balance column first: after five years you still owe $374,444 — 94% of what you borrowed. After ten years, $339,105. The halfway point on the balance does not arrive until year 22. The interest column explains why: in the first ten years you pay $242,497 of interest and only $60,895 of principal, roughly four dollars of interest for every dollar of debt retired.",
          "The crossover — the month the principal portion first exceeds the interest portion — comes around month 240, in year 20. In month one, interest is 86% of the payment. In month 120 it is still 73%. In month 240 the two halves are about even, $1,213 of interest against $1,315 of principal. By month 348, near the end, interest is 7% of the payment and principal is 93%.",
          "That shape is why the first decade of a mortgage feels like standing still. It is also why the loan's total interest, $510,178, exceeds the amount borrowed: most of the money you send in the early years buys nothing but time."
        ],
        "table": {
          "head": [
            "Year",
            "Balance",
            "Interest paid so far",
            "Interest share of payment"
          ],
          "rows": [
            [
              "0",
              "$400,000",
              "$0",
              "86%"
            ],
            [
              "5",
              "$374,444",
              "$126,140",
              "80%"
            ],
            [
              "10",
              "$339,105",
              "$242,497",
              "73%"
            ],
            [
              "15",
              "$290,237",
              "$345,326",
              "62%"
            ],
            [
              "20",
              "$222,661",
              "$429,446",
              "48%"
            ],
            [
              "25",
              "$129,217",
              "$487,698",
              "28%"
            ],
            [
              "30",
              "$0",
              "$510,178",
              "—"
            ]
          ]
        }
      },
      {
        "heading": "15-year vs 30-year: the same loan, two schedules",
        "paragraphs": [
          "Shortening the term is the single biggest lever on total interest, and it works through the same arithmetic: fewer months for interest to compound, and a payment large enough that principal takes a bigger share from month one.",
          "On the same $400,000 at 6.5%, a 15-year term sets the payment at $3,484.43 — $956.16 more a month than the 30-year payment. Total interest falls from $510,178 to $227,197, a saving of $282,981. The loan is half repaid in year 10 instead of year 22, and after five years the balance is $306,868 instead of $374,444 — $67,576 more equity from the same house. In practice, 15-year loans usually price below 30-year loans, so a real 15-year term saves a little more than this same-rate comparison shows.",
          "The cost is commitment. The 15-year payment is not optional in a hard month, and it is $956 a month that cannot go to retirement savings, an emergency fund, or a child's education. A 30-year loan with a voluntary extra of $956 a month pays off in the same 15 years and saves the same $282,981 — the arithmetic is identical, because the payment is identical. The difference is only that the extra is optional. The 15-year term wins when the higher payment fits comfortably and you want the discipline built in; the 30-year with extras wins when flexibility matters more."
        ],
        "table": {
          "head": [
            "",
            "30-year",
            "15-year"
          ],
          "rows": [
            [
              "Monthly payment",
              "$2,528.27",
              "$3,484.43"
            ],
            [
              "Total interest",
              "$510,178",
              "$227,197"
            ],
            [
              "Half repaid",
              "Year 22",
              "Year 10"
            ],
            [
              "Balance after 5 years",
              "$374,444",
              "$306,868"
            ]
          ]
        }
      },
      {
        "heading": "Why the first years build almost no equity",
        "paragraphs": [
          "Equity is the home's value minus the balance, and in the first years the balance barely moves. In year one of the $400,000 loan, you pay $30,339 and the balance falls by $4,471. The other $25,868 is interest. Your equity grows by $4,471 plus whatever the home appreciates — and if the home's value is flat, a year of payments buys you about 1% of the house.",
          "That is why selling early is expensive. After three years the balance is $385,669 — you have paid $91,018 and retired $14,331 of debt. Selling costs of 5–6% on a $400,000 home run $20,000–$24,000, more than the principal you have paid. Unless the home has appreciated, you leave the closing table with less than you put in. The down payment is your starting equity, and it is the only equity most new owners have for years.",
          "The practical consequence: a mortgage is a long-horizon tool. The equity curve bends upward only after the crossover in year 20, when most of each payment finally goes to principal. Buyers who expect to move within five years should run the rent-vs-buy comparison honestly — the first five years of a mortgage build $25,556 of equity on this loan, while the transaction costs of buying and selling run roughly $28,000–$44,000 on a $400,000 home."
        ]
      },
      {
        "heading": "Fixed vs adjustable: when the schedule changes",
        "paragraphs": [
          "On a fixed-rate loan the schedule is set at closing and never changes. The payment, the split, and the payoff date are all fixed — the only things that move the schedule are extra principal payments, a recast, or a refinance. That certainty is what you pay for with a fixed rate.",
          "An adjustable-rate mortgage (ARM) keeps the schedule fixed only for its initial period — five, seven, or ten years. When the fixed period ends, the rate adjusts to the market, and the lender recalculates the payment on the remaining balance over the remaining term. The new payment can rise or fall with the rate, and the interest-principal split resets around the new payment. Caps limit how far the rate can move at each adjustment and over the life of the loan, but the payment after adjustment is not knowable in advance.",
          "Two variations change the schedule more sharply. An interest-only period means the payment covers interest and nothing else, so the balance does not fall at all — when the interest-only period ends, the full balance must amortize over the remaining term, and the payment jumps. Negative amortization, rare in modern mortgages, sets the payment below the interest due, so the unpaid interest is added to the balance and the debt grows. If your loan has either feature, the schedule in your closing documents shows exactly when the payment changes — read that page before you sign."
        ]
      },
      {
        "heading": "Recasting: the middle path between extra payments and refinancing",
        "paragraphs": [
          "Recasting — also called re-amortization — sits between extra payments and a refinance. You make a large lump-sum payment toward principal, and the lender recalculates your monthly payment on the new, lower balance over the remaining term. The rate and the payoff date stay the same; the payment falls.",
          "Take the $400,000 loan five years in, with a balance of $374,444 and 25 years left. A $50,000 lump sum cuts the balance to $324,444. Re-amortized over the remaining 25 years at 6.5%, the payment falls from $2,528.27 to $2,190.67 — $337.60 a month less, for the rest of the loan. The lump sum also removes the interest that $50,000 would have generated over 25 years.",
          "Recasting costs far less than refinancing — lenders usually charge a modest fee, with no appraisal and no new closing costs — but it has limits. Not every lender or loan type allows it, and most lenders set a minimum lump sum. FHA loans generally do not permit recasting. And unlike extra payments, a recast does not shorten the term — it lowers the payment instead. Choose extra payments when you want the loan gone sooner; choose a recast when you want the monthly payment down and the term can stay."
        ]
      },
      {
        "heading": "Amortization and your taxes",
        "paragraphs": [
          "Mortgage interest is deductible on federal tax, within limits — and the amortization schedule decides how large that deduction is each year. You can deduct interest on up to $750,000 of acquisition debt for loans taken out after December 15, 2017 ($1 million for older loans), and only if you itemize deductions rather than taking the standard deduction. Your lender reports the interest you paid on Form 1098 each January.",
          "Because interest is front-loaded, the deduction is largest in the early years and shrinks as the loan ages. On the $400,000 loan, year-one interest is $25,868 — the deductible amount, if you itemize and the loan is under the cap. By year 25, annual interest is under $10,000. A buyer counting on the deduction to make a payment affordable should know it fades: the tax benefit of a mortgage is biggest exactly when the payment hurts most, and smallest when the loan is nearly gone.",
          "One common mistake is treating the deduction as a reason not to prepay. A deduction returns only your marginal tax rate on each dollar of interest — 22 cents on the dollar at a 22% marginal rate — while a dollar of interest avoided by prepayment is a dollar kept in full. Prepaying is still the better deal; the deduction only softens the cost of the interest you do pay.",
          "And many homeowners get no benefit at all: if your total itemized deductions do not exceed the standard deduction, the mortgage interest deduction changes nothing on your return. Run the comparison on your actual tax situation before counting the deduction in your affordability math."
        ]
      },
      {
        "heading": "Refinancing restarts the clock",
        "paragraphs": [
          "Refinancing replaces your loan with a new one — and a new amortization schedule that starts over at month one, mostly interest. That reset is the hidden cost of refinancing into a fresh 30-year term, and it can outweigh a lower payment.",
          "Take the $400,000 loan ten years in, with a balance of $339,105 and $267,681 of interest still to pay. Refinancing that balance into a new 30-year loan at the same 6.5% cuts the payment from $2,528.27 to $2,143.37 — but the new loan's total interest is $432,510, or $164,829 more than the remaining interest on the old loan. The lower payment is real; so is the extra decade of interest.",
          "The fix is to match the remaining term. Refinancing $339,105 into a 20-year loan at 6.5% keeps the payment at $2,528.28 and the remaining interest at $267,681 — identical to staying put. Only a lower rate then saves money, and the saving is the rate difference applied over the remaining term, minus closing costs. When you compare refinance offers, compare total interest over the remaining term, not just the monthly payment — and run the numbers in the refinance calculator before you decide."
        ]
      },
      {
        "heading": "What does not change the schedule",
        "paragraphs": [
          "Several things that feel like they should change the schedule do not. An escrow change — higher property tax or insurance — raises your total monthly check but leaves the principal-and-interest split untouched, because escrow is not part of the loan. A change in your home's value changes your equity, not your balance or your payment. And on a fixed-rate loan, a change in market rates changes nothing at all about your schedule — your rate is locked until you refinance.",
          "What does change it, besides extra principal, is a missed payment. Interest keeps accruing on the unpaid balance, a late fee is added after the grace period, and the missed principal stays on the balance. The schedule does not forgive the gap: the servicer will expect the missed amount repaid, through a catch-up payment, a repayment plan, or a modification. If you cannot make a payment, call the servicer before the due date — the options are better before a payment is missed than after."
        ]
      },
      {
        "heading": "Extra payments vs investing the difference",
        "paragraphs": [
          "Every extra principal payment is also an investment decision, because the money could go elsewhere. Prepaying earns a guaranteed return equal to your mortgage rate: every dollar of principal removed at 6.5% saves 6.5 cents of interest a year, every year, with no risk and no tax bill on the saving. An investment has to beat 6.5% after tax and after risk to come out ahead — and it might not.",
          "That comparison flips with the rate. On a 3% mortgage, prepaying earns a guaranteed 3%, and a diversified investment portfolio has historically done better over long horizons — so investing usually wins. On a 6.5% or 7% mortgage, the guaranteed return is high enough that prepaying competes with expected market returns while taking no market risk. The higher your rate, the stronger the case for prepaying; the lower your rate, the stronger the case for investing.",
          "Two rules come before either choice. First, the emergency fund: prepaid mortgage money is locked in the house until you sell or refinance, and a borrower with no cash reserve who prepays the mortgage is one broken furnace away from a credit card at 20%. Second, the employer 401(k) match: a dollar matched is a 100% return, and no mortgage rate competes with it. Fund the emergency reserve, capture the full match, pay off higher-interest debt — then choose between extra principal and investing on the rate comparison above."
        ]
      }
    ],
    "seoTitle": "Mortgage Amortization Explained: How Your Payments Are Split",
    "slug": "how-mortgage-amortization-works",
    "sources": [
      {
        "label": "CFPB — Mortgages",
        "url": "https://www.consumerfinance.gov/consumer-tools/mortgages/"
      },
      {
        "label": "CFPB — What Is Amortization?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-auto-loan-en-771/"
      },
      {
        "label": "IRS — Publication 936, Home Mortgage Interest Deduction",
        "url": "https://www.irs.gov/publications/p936"
      }
    ],
    "title": "Mortgage Amortization Explained: How Your Payments Are Split",
    "type": "What",
    "updated": "2026-11-06"
  },
  {
    "cornerstone": false,
    "description": "How much house can you afford? The 28/36 rule, DTI limits by loan type, the down payment's effect on your payment, and the hidden costs listings never show.",
    "faqs": [
      {
        "answer": "Treat it as a ceiling set by the lender's risk model, not a target. The approval is based on your gross income and debts, not on your savings goals, your childcare costs, or your comfort with risk. Buy at the price where the total monthly cost — payment, tax, insurance, PMI, and HOA — still leaves room for a savings rate of at least 10% and a maintenance reserve.",
        "question": "Should I use my full pre-approval amount?"
      },
      {
        "answer": "Yes: it shrinks the loan, the payment, and total interest, and removes PMI at 20%. On a $400,000 home at 6.5%, moving from 3.5% down to 20% down cuts the monthly payment by about $610. It does not change the maintenance, tax, and insurance costs of the same house, and it ties up cash you may need for emergencies.",
        "question": "Does a bigger down payment change affordability?"
      },
      {
        "answer": "Most lenders want a back-end DTI of 36% to 45%, depending on the loan type: Fannie Mae targets 36% and accepts up to 45%, FHA caps at 43%, and VA uses 41% with a residual income test. Higher ratios can be approved with compensating strengths such as a high credit score or large cash reserves, but a ratio near the maximum leaves little room in your budget.",
        "question": "What debt-to-income ratio do lenders want?"
      },
      {
        "answer": "The 28% rule allows $2,333 a month for housing, which supports roughly a $369,000 loan in principal and interest alone at 6.5%. After property tax and insurance, the realistic loan is closer to $290,000–$310,000, or a home near $320,000–$380,000 with 10–20% down. Existing debts reduce it further — $800 a month of debts cuts the housing budget by the same $800.",
        "question": "How much house can I afford on $100,000 a year?"
      },
      {
        "answer": "Yes, dollar for dollar against your back-end DTI. A $400 car payment is $400 a month the lender subtracts from your housing budget, which removes roughly $63,000 of loan capacity at 6.5%. Paying off a car loan before you apply is one of the fastest ways to raise your approved amount — and it lowers your real monthly obligations too.",
        "question": "Does a car payment reduce how much house I can afford?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/how-much-house-can-i-afford.jpg",
    "imageAlt": "Illustration of home affordability: a house with a price tag and magnifier",
    "inlineImage": "/images/how-much-house-can-i-afford-inline.jpg",
    "inlineImageAlt": "Flat illustration of a house and a stack of coins balanced on a scale, showing the trade-off in home affordability",
    "intro": "Lenders approve a payment, not a lifestyle. The maximum a bank will offer is set by its risk rules, and it routinely exceeds what a household can carry while still saving, eating out occasionally and sleeping well. Affordability has two answers — the lender's and yours — and the smaller one is the right one.",
    "published": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Home Affordability Calculator",
        "url": "/real-estate/home-affordability-calculator"
      },
      {
        "name": "Down Payment Calculator",
        "url": "/real-estate/down-payment-calculator"
      },
      {
        "name": "Closing Cost Calculator",
        "url": "/real-estate/closing-cost-calculator"
      },
      {
        "name": "Debt-to-Income Ratio Calculator",
        "url": "/loans/debt-to-income-ratio-calculator"
      }
    ],
    "sections": [
      {
        "heading": "The lender's arithmetic: 28/36",
        "paragraphs": [
          "Most lenders cap housing costs (principal, interest, property tax, insurance, HOA) at about 28% of gross monthly income, and total debt payments at about 36–43%. On $110,000 a year, 28% is $2,567 a month for housing. At 6.5% with typical tax and insurance, that supports a loan near $330,000 — a home around $390,000–$410,000 with 15–20% down. Existing car and card payments eat the same 36% bucket and reduce the house budget directly."
        ]
      },
      {
        "bullets": [
          "Keep total housing cost (PITI + HOA) under roughly 25–28% of gross income to leave savings room.",
          "Budget 1% of value per year for maintenance from day one, in a separate account.",
          "Under 20% down usually means PMI — about 0.5–1% of the loan per year until you reach 20% equity."
        ],
        "heading": "Your arithmetic: the costs the listing hides",
        "paragraphs": [
          "Ownership adds costs renters never see: maintenance and repairs run about 1% of the home's value per year on average — $4,000 on a $400,000 home, arriving in lumps (a roof, a furnace). Property tax and insurance rise over time. Buying itself costs 2–5% in closing costs, and selling costs 5–6% in commissions, which is why moving within three years usually loses money. A payment that leaves no room for a savings rate of at least 10% and a maintenance reserve is not affordable, whatever the approval letter says."
        ]
      },
      {
        "heading": "Front-end and back-end DTI, worked",
        "paragraphs": [
          "Lenders measure affordability with two ratios, not one. The front-end ratio — housing costs divided by gross monthly income — covers principal, interest, property tax, insurance, and HOA dues. The back-end ratio, the debt-to-income ratio (DTI), adds every other monthly debt payment on top of housing: car loans, student loans, credit card minimums, child support, and any other loan that shows on your credit report.",
          "Take the $110,000 household from the first section: gross monthly income of $9,167. Housing of $2,567 a month is a 28% front-end ratio. Add a $400 car payment, a $250 student loan, and $150 of card minimums — $800 of other debts — and the back-end ratio is $3,367 divided by $9,167, or 36.7%. That passes most lenders' tests.",
          "Now change one number. If other debts total $1,500 instead of $800, the back-end ratio is 44.4% — over FHA's 43% limit, and close enough to Fannie Mae's 45% guidepost that the lender will want compensating strengths, such as a large cash reserve or a high credit score. The house did not change. The debts did, and they decide the budget as surely as the price does.",
          "The lesson: paying off a $400 car loan can raise your buying power more than a raise does, because the lender counts the debt at its full monthly payment while a raise is taxed and only partly counts as income."
        ]
      },
      {
        "heading": "DTI limits by loan type",
        "paragraphs": [
          "The limits differ by loan type, and they are guideposts rather than hard walls — lenders can stretch them for strong files and tighten them for weak ones. Fannie Mae looks for a 36% back-end ratio, accepts up to 45%, and allows 50% with strong compensating factors such as a high credit score and large reserves. FHA uses 31% front-end and 43% back-end. VA uses a single 41% back-end ratio, but pairs it with a residual income test — money left after all debts and living costs — which can approve borrowers the ratio alone would reject. USDA uses 29% front-end and 41% back-end.",
          "One rule that no longer applies: the 43% cap on Qualified Mortgages. The CFPB removed it in 2021, replacing the DTI cap with a price-based test — a loan is a Qualified Mortgage if its rate is not too far above the average prime offer rate. Lenders still use DTI heavily in underwriting; the change means a high-DTI loan is no longer automatically disqualified from QM status.",
          "Ratios are the lender's view of risk, not yours. A 50% back-end ratio means half your gross income — before tax — is committed to debt payments. That can be approved and still be unlivable, which is why your own budget, not the lender's maximum, should set the price."
        ],
        "table": {
          "head": [
            "Loan type",
            "Front-end limit",
            "Back-end limit"
          ],
          "rows": [
            [
              "Conventional (Fannie Mae)",
              "28% guidepost",
              "36% target, up to 45%, 50% with compensating factors"
            ],
            [
              "FHA",
              "31%",
              "43%"
            ],
            [
              "VA",
              "—",
              "41%, plus a residual income test"
            ],
            [
              "USDA",
              "29%",
              "41%"
            ]
          ]
        }
      },
      {
        "heading": "What the down payment does to the payment",
        "paragraphs": [
          "The down payment moves the payment twice: it shrinks the loan, and at 20% it removes PMI. On a $400,000 home at 6.5%, the difference between no down payment and 20% down is $705.65 a month — $8,468 a year — for the same house.",
          "PMI is the smaller half of that gap. At an example 0.6% of the loan per year, PMI costs $200 a month on a $400,000 loan and $180 on a $360,000 loan, and it ends once you reach 20% equity. The larger half is the loan itself: every $10,000 of down payment removes about $63 a month of principal and interest at 6.5%.",
          "The trade is liquidity. The $80,000 that buys 20% down is $80,000 that cannot cover a roof, a job loss, or a medical bill. A buyer who empties every account to reach 20% has bought a lower payment with no safety net — and the first emergency goes on a credit card at a far higher rate than the mortgage. Keep three to six months of expenses in reserve after closing, even if it means a smaller down payment and a few years of PMI."
        ],
        "table": {
          "head": [
            "Down payment",
            "Loan",
            "Principal & interest",
            "PMI (0.6%/yr)",
            "Total"
          ],
          "rows": [
            [
              "0%",
              "$400,000",
              "$2,528.27",
              "$200.00",
              "$2,728.27"
            ],
            [
              "3.5%",
              "$386,000",
              "$2,439.78",
              "$193.00",
              "$2,632.78"
            ],
            [
              "10%",
              "$360,000",
              "$2,275.44",
              "$180.00",
              "$2,455.44"
            ],
            [
              "20%",
              "$320,000",
              "$2,022.62",
              "$0",
              "$2,022.62"
            ]
          ]
        }
      },
      {
        "heading": "What lenders count as income — and what they ignore",
        "paragraphs": [
          "Lenders count income they can document and expect to continue. Base salary is the simplest case: pay stubs and a verification of employment. Bonuses, overtime, and commissions count if you have a two-year history of receiving them — a first-year bonus does not. Rental income usually counts at 75% of the lease amount, with the 25% haircut covering vacancies and upkeep. Child support and alimony count if they are documented and expected to continue for at least three years, and you are not required to disclose them if you do not want them counted.",
          "Self-employment is where affordability surprises people. Lenders use your tax returns, usually a two-year average of net income after business write-offs — not your gross revenue. A freelancer who earns $120,000 and writes off $40,000 qualifies on $80,000. Every deduction that saved tax also shrinks the mortgage you can get, which is why the two years before a home purchase are the wrong time to maximize write-offs.",
          "What lenders do not count: cash income you cannot document, a raise that has not started yet, a spouse's income if the spouse is not on the loan, and one-time windfalls. Gig income counts, but only with a two-year history. If your income is variable, the lender's number — the documented, averaged, after-write-off figure — is the one your budget should use too."
        ]
      },
      {
        "heading": "Rate sensitivity: what one point costs you",
        "paragraphs": [
          "A single point of rate moves affordability more than most buyers expect. On a $330,000 loan, the payment at 6.5% is $2,085.82 a month. At 7.5% it is $2,307.41 — $221.58 more every month, $2,659 a year, for the same house and the same loan. Over 30 years the difference is $79,769 of interest.",
          "Turn it around: the same $2,085.82 payment supports a $330,000 loan at 6.5% but only a $298,309 loan at 7.5%. One point of rate costs roughly 10% of your buying power. That is why rate shopping matters as much as price negotiation — a quarter point saved on the rate is worth about $50 a month on this loan, every month for 30 years, and it costs nothing but a few extra applications.",
          "Rate locks matter here too. A pre-approval is priced at today's rate; if rates rise a point while you shop, the house you were approved for may no longer fit. Some lenders offer a rate lock while you search, and some offer a float-down if rates fall. Ask what the lock costs and how long it lasts before you assume the pre-approval number will hold."
        ]
      },
      {
        "heading": "How much house at three incomes",
        "paragraphs": [
          "The 28% rule gives a quick read at any income. The table shows the housing budget the rule allows and the loan that budget supports in principal and interest alone, at 6.5% over 30 years. Treat the loan figures as ceilings, not targets: tax and insurance come out of the same 28%, so the loan you can actually carry is smaller — on a $400,000 home, tax and insurance typically add $400–$600 a month, which removes roughly $63,000–$95,000 of loan capacity.",
          "Read the table against your own debts. A household earning $100,000 with $800 of monthly debts has a 36% back-end cap of $3,000 — housing plus debts — which leaves $2,200 for housing, below the $2,333 the 28% rule allows. The tighter of the two ratios always governs, and for most buyers with car or student debt, the back-end ratio is the binding one."
        ],
        "table": {
          "head": [
            "Gross income",
            "28% housing budget",
            "Loan it supports (P&I only)"
          ],
          "rows": [
            [
              "$75,000",
              "$1,750 a month",
              "$276,869"
            ],
            [
              "$100,000",
              "$2,333 a month",
              "$369,159"
            ],
            [
              "$150,000",
              "$3,500 a month",
              "$553,738"
            ]
          ]
        }
      },
      {
        "heading": "Stress-test the payment before you buy",
        "paragraphs": [
          "Before you commit to a payment, live with it. Take the target monthly payment — principal, interest, tax, insurance, PMI, and HOA — subtract your current rent, and save the difference every month for three to six months. If the saving is painless, the payment fits. If it means cutting into retirement savings or carrying a card balance, the price is too high, whatever the approval letter says. The trial run also builds your down payment while it tests your budget.",
          "Then check the reserves. After the down payment and closing costs, you should still hold three to six months of expenses — including the new, higher housing payment — in an accessible account. A home with no reserve is one broken furnace away from high-interest debt, and the first year of ownership is when expensive surprises are most likely: the inspection cannot see inside walls or predict a water heater's last month.",
          "Finally, budget the maintenance from day one. One percent of the home's value per year — $333 a month on a $400,000 home — in a separate account, untouched until something breaks. It will not feel like enough when the roof goes, and it will feel like too much in the quiet years. Both feelings are wrong; the average is what matters, and the average is about 1%."
        ]
      },
      {
        "heading": "When the bank says yes and you should say no",
        "paragraphs": [
          "The approval letter is the lender's maximum, not your budget, and there are situations where the right answer is to buy well below it — or not at all. A single income supporting the household, a job change or a move on the horizon, a variable income that the lender averaged upward, or a payment that leaves no room for retirement savings are all reasons to stop short of the maximum.",
          "Watch for the quiet budget-killers. An adjustable rate that can rise, an HOA with a history of special assessments, a home at the top of its price range in a neighborhood with rising tax assessments, and a commute that adds hundreds a month in fuel or tolls all make the same payment harder to live with. None of them appear in the lender's ratios.",
          "The test that matters is not whether the lender will approve the loan. It is whether you can pay it, save at least 10% of your income, handle a $5,000 repair without borrowing, and still live the life you want in the house. If the payment fails any part of that test, the house is too expensive — even with the approval letter in hand."
        ]
      },
      {
        "heading": "The pre-approval process, step by step",
        "paragraphs": [
          "Pre-approval is where the lender's arithmetic becomes a number you can shop with, and it is worth understanding what it is and is not. A pre-qualification is a rough estimate from self-reported numbers; a pre-approval is a conditional commitment based on verified documents — pay stubs, W-2s, tax returns, bank statements, and a credit pull. Sellers take pre-approval seriously; pre-qualification carries little weight.",
          "The letter states a maximum loan amount, and it usually lasts 60 to 90 days. It is conditional: a new car loan, a job change, a large undocumented deposit, or a missed payment between pre-approval and closing can change or void it. The lender re-verifies employment and pulls a final credit check before closing, so the quiet period between approval and keys is the wrong time for any financial change.",
          "Get pre-approved by more than one lender. Rates and fees vary by lender, and a quarter point is worth about $50 a month on a $330,000 loan. Rate-shopping within a short window — 14 days on older credit scoring models, 45 days on newer ones — counts as a single inquiry for scoring purposes, so multiple applications in the same two weeks do not multiply the damage to your score. Compare the Loan Estimates side by side: the rate, the fees, and the cash to close, not just the monthly payment."
        ]
      },
      {
        "heading": "Buying with less than 20% down: the full cost",
        "paragraphs": [
          "Less than 20% down is normal — most first-time buyers do it — but the cost is larger than the PMI line suggests, because PMI lasts for years. On the $400,000 home with 10% down, the $360,000 loan carries PMI of about $180 a month at an example 0.6% a year. The balance reaches $320,000 — 80% of the home's value, the point where you can request PMI removal — in month 95, nearly eight years in. PMI is usually charged on the original loan amount, so that is about $17,100 of PMI over the life of the loan if you wait for amortization alone to remove it.",
          "Appreciation can shorten that wait. If the home's value rises, a new appraisal showing 20% equity can support an earlier PMI removal — but lenders set their own seasoning rules for appraisal-based removal, so ask yours before counting on it. And PMI ends automatically at 78% of the original value on most conventional loans, whether you ask or not.",
          "The comparison that matters is PMI against rent. The buyer with 10% down pays $180 a month of PMI and builds equity from month one; the buyer who waits two years to save 20% pays two years of rent and misses two years of amortization and appreciation. PMI is a cost, but waiting has a cost too — run both timelines before deciding that 20% down is worth the delay."
        ]
      },
      {
        "heading": "The payment is not the price",
        "paragraphs": [
          "Buyers shop by price, but the budget feels the payment — and two homes at the same price can have very different payments. A $400,000 home with $300 a month of HOA dues costs the same each month as a $450,000 home with no HOA: $300 a month is roughly $47,000 of loan capacity at 6.5%. Property tax rates vary by county and school district, insurance varies by flood zone and roof age, and an older home's maintenance runs higher than a new one's.",
          "Compare homes by all-in monthly cost, not by listing price. The Home Affordability Calculator turns any home into its monthly parts, and the honest comparison is the total — principal, interest, tax, insurance, PMI, and HOA — against the 28% budget. A cheaper home with high dues and high taxes can be less affordable than a pricier home with neither. The listing price is the headline; the monthly cost is the decision."
        ]
      }
    ],
    "seoTitle": "How Much House Can You Afford? (28/36 Rule Explained)",
    "slug": "how-much-house-can-i-afford",
    "sources": [
      {
        "label": "CFPB — Owning a Home",
        "url": "https://www.consumerfinance.gov/owning-a-home/"
      },
      {
        "label": "CFPB — What is a debt-to-income ratio?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/"
      }
    ],
    "title": "How Much House Can You Actually Afford? (28/36 Rule Explained)",
    "type": "What",
    "updated": "2026-11-06"
  },
  {
    "cornerstone": false,
    "description": "Renting vs buying a home: the real unrecoverable costs on both sides, the 5–7 year break-even, the price-to-rent test, and how to tell which wins for you.",
    "faqs": [
      {
        "answer": "Over long horizons, usually, because the mortgage forces saving and the asset is leveraged — a small down payment controls a large asset, so price gains are magnified. Over short horizons, transaction costs and front-loaded interest routinely make buying the worse choice, and a price fall in the first years can wipe out the entire down payment.",
        "question": "Does buying always build wealth faster?"
      },
      {
        "answer": "Refinancing can capture lower rates, at a cost of roughly 0.5–1.5% of the loan. Renters capture falling rents only at lease renewal, and rents historically fall far less than rates. The refinance only pays if you stay past its break-even point — the closing costs divided by the monthly saving — so a short remaining stay can make refinancing a loss even at a lower rate.",
        "question": "What if rates fall after I buy?"
      },
      {
        "answer": "Usually five to seven years. Buying costs 2–5% of the price to close and 5–6% to sell, and the first years of a mortgage are mostly interest, so the early years build little equity. Stay two years and renting wins almost everywhere; stay twelve and buying usually wins by a wide margin. The exact point depends on your market's price-to-rent ratio and how fast rents rise.",
        "question": "How long do I need to stay for buying to pay off?"
      },
      {
        "answer": "Yes — it is a real cost of buying. A $90,000 down payment invested instead of spent on a house earns a return; at an assumed 7% that is $6,300 a year the buyer gives up. Honest comparisons charge the buyer for it. The return is not guaranteed, which is why the comparison should show a range of outcomes rather than a single assumed rate.",
        "question": "Does the down payment's investment return belong in the comparison?"
      },
      {
        "answer": "It can still win, but only if you stay long enough for the price to recover. Leverage cuts both ways: a 10% fall on a $450,000 home wipes out $45,000 — half of a $90,000 down payment. The loss is only paper until you sell, so the danger is a forced sale — a job loss or a move — while the home is underwater. Renting avoids that risk entirely.",
        "question": "Is buying still better if home prices fall?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/rent-vs-buy-guide.jpg",
    "imageAlt": "Illustration of renting vs buying: two doors, one with a key and one with a house roof, on a scale",
    "inlineImage": "/images/rent-vs-buy-guide-inline.jpg",
    "inlineImageAlt": "Flat illustration of two houses on a balance scale, one with a key and one with a signpost, comparing renting and buying",
    "intro": "\"Rent is throwing money away\" is a slogan, not an analysis. Both renting and owning have unrecoverable costs — money that buys no equity. Rent is one. On the ownership side: interest, property tax, insurance and maintenance are equally gone. The honest comparison lines those up, then asks how long you will stay.",
    "published": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Rent vs Buy Calculator",
        "url": "/real-estate/rent-vs-buy-calculator"
      },
      {
        "name": "Home Affordability Calculator",
        "url": "/real-estate/home-affordability-calculator"
      },
      {
        "name": "Home Equity Calculator",
        "url": "/real-estate/home-equity-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "A useful shortcut: if the home's price is more than ~20x its annual rent, renting is usually cheaper; under ~15x, buying usually is.",
          "The down payment has an opportunity cost — it could have been invested. Honest comparisons charge the buyer for it.",
          "Job mobility has value. Buying sells flexibility; price that in if your career moves cities."
        ],
        "heading": "Unrecoverable costs, side by side",
        "paragraphs": [
          "On a $450,000 home bought with 20% down at 6.5%, the first year's unrecoverable ownership costs are roughly: $23,000 interest, $5,400 property tax, $2,200 insurance, $4,500 maintenance — about $35,000 that builds no equity. In year one only about $4,000 of the payments is principal — the recoverable part. Compare renting the same home at $2,400 a month: $28,800 unrecoverable. In year one, renting is often cheaper than owning on a pure cost basis.",
          "Time reverses it. Rent rises with the market; a fixed mortgage payment does not, and its interest share shrinks every year while the principal share grows. Buying also carries roughly 2–5% in purchase costs and 5–6% in selling costs, which is why the break-even against renting usually sits between five and seven years. Stay two years and renting wins almost everywhere. Stay twelve and buying usually wins by a wide margin. The calculator exists because the answer is arithmetic, not ideology."
        ]
      },
      {
        "heading": "The break-even horizon, in numbers",
        "paragraphs": [
          "The break-even is set by two forces pulling in opposite directions: transaction costs, which punish short stays, and equity building, which rewards long ones. On the $450,000 home, buying costs $9,000–$22,500 to close and $22,500–$27,000 to sell — a round trip of $31,500–$49,500 before a single mortgage payment is counted.",
          "Against that, equity builds slowly. On the $360,000 loan, the principal paid is $4,024 after one year, $12,898 after three, $23,000 after five, $34,502 after seven, and $54,806 after ten. After five years you have built $23,000 of equity from payments but paid at least $31,500 in transaction costs — still underwater on costs alone. Appreciation is what tips the balance, and appreciation is the one number nobody can promise.",
          "That is why the five-to-seven-year rule exists. It is the horizon over which the rising principal share, the flat payment against rising rents, and a normal rate of price growth together outweigh the round-trip costs. Shorter than that, you are betting on appreciation to bail out the transaction costs. Longer than that, the arithmetic starts working for the buyer even if prices only keep pace with inflation."
        ],
        "table": {
          "head": [
            "Years owned",
            "Principal paid",
            "Transaction costs (round trip)"
          ],
          "rows": [
            [
              "1",
              "$4,024",
              "$31,500–$49,500"
            ],
            [
              "3",
              "$12,898",
              "$31,500–$49,500"
            ],
            [
              "5",
              "$23,000",
              "$31,500–$49,500"
            ],
            [
              "7",
              "$34,502",
              "$31,500–$49,500"
            ],
            [
              "10",
              "$54,806",
              "$31,500–$49,500"
            ]
          ]
        }
      },
      {
        "heading": "The price-to-rent ratio, worked",
        "paragraphs": [
          "The price-to-rent ratio compresses the comparison into one number: the home's price divided by its annual rent. On the example, $450,000 divided by $28,800 of annual rent is 15.6 — in the gray zone between 15 and 20, where the time horizon decides. Below 15, buying usually wins; above 20, renting usually wins.",
          "Two more cases show the range. A $300,000 home renting for $2,000 a month has a ratio of 12.5 — buying is favored, because the rent is high relative to the price. A $600,000 home renting for $2,200 a month has a ratio of 22.7 — renting is favored, because the price is high relative to the rent. Same country, same year, opposite answers; the ratio is local, and so is the decision.",
          "The ratio has a blind spot: interest rates. It compares price to rent without asking what the mortgage costs, so at high rates the buying threshold rises — a ratio of 14 can still favor renting when the loan costs 8%. Use the ratio as a first filter, then run the full comparison with your actual rate."
        ]
      },
      {
        "heading": "The 5% rule: a faster test",
        "paragraphs": [
          "The 5% rule, popularized by portfolio manager Ben Felix, asks a different question: what does owning cost each year, unrecoverable, as a share of the home's price? Roughly 1% property tax, 1% maintenance, and 3% cost of capital — the mortgage interest plus the return the down payment could have earned. That totals about 5% of the price per year.",
          "On the $450,000 home, 5% is $22,500 a year, or $1,875 a month. If you can rent the same home for less than $1,875, renting is likely cheaper; if rent is more, buying starts to win. Our example rent of $2,400 is well above $1,875, so the 5% rule favors buying — even though the year-one comparison favored renting. The two tests disagree because the 5% rule uses long-run averages, including the years when the mortgage is mostly principal, while the year-one comparison catches owning at its worst.",
          "Treat the 5% rule as a filter, not a verdict. It assumes average tax rates, average maintenance, and an average cost of capital — all three vary by place and by loan. In a high-tax state the unrecoverable share is higher; on a low-rate loan it is lower. Adjust the 5% to your numbers before you trust it."
        ]
      },
      {
        "heading": "What buying gets you that renting does not",
        "paragraphs": [
          "The strongest case for buying is not the monthly cost — it is the structure. A mortgage is forced saving: every principal payment converts cash into equity, whether you feel disciplined or not. Renters can invest the difference, but most do not, and the mortgage does not ask for willpower. Over 30 years the forced saving alone retires the entire loan.",
          "The second advantage is a fixed payment in a rising market. Rent rises with the market; a fixed mortgage payment does not. The $2,275 monthly principal-and-interest payment on the $360,000 loan is the same in year 20 as in year one, while rent has had two decades to climb. Tax and insurance rise, but they are a smaller share of the payment, and the largest part is frozen.",
          "The third is leverage. A 20% down payment controls an asset five times its size, so a 3% rise in the home's value is a 15% return on the cash invested — $13,500 of gain on a $90,000 down payment. Leverage is also the risk: the same math magnifies losses, which is why the stay-duration rule matters more than any price forecast.",
          "The costs are concentration and illiquidity. Most of your net worth sits in one asset in one neighborhood, and turning it back into cash takes months and 5–6% in selling costs. A renter's wealth can be spread across investments and moved in a day. Buying trades diversification for leverage and control — a good trade over a long horizon, a dangerous one over a short horizon."
        ]
      },
      {
        "heading": "What renting gets you",
        "paragraphs": [
          "Renting's first advantage is mobility. A job change, a relationship change, or a neighborhood that stops suiting you costs a lease break, not a sale. For careers that move cities — and for anyone unsure where they will be in three years — that flexibility has a price, and buying pays it in transaction costs.",
          "The second is predictable costs. The landlord pays for the roof, the furnace, the property tax, and the insurance. Your housing cost is the rent, and the surprises belong to someone else. Owners budget 1% of the home's value a year for maintenance and still get blindsided; renters budget zero.",
          "The third is the invested down payment. The $90,000 that would have gone into the $450,000 home can be invested instead — at an assumed 7% return, that is $6,300 a year the buyer gives up. The return is not guaranteed, and the comparison should show a range, but the opportunity cost is real and most buy-vs-rent arguments ignore it.",
          "The catch is that rent rises and builds nothing. Every rent payment is unrecoverable by definition, and the landlord sets the next year's price. Renting wins when the horizon is short, the market is expensive relative to rents, or flexibility matters more than equity. It loses when the horizon is long and the rent on a comparable home keeps climbing past the fixed cost of owning."
        ]
      },
      {
        "heading": "The costs buyers forget",
        "paragraphs": [
          "The mortgage payment is the most visible cost of owning and rarely the whole story. Closing costs run 2–5% of the price and are due in cash at the start. Moving costs, furnishing an empty house, and the first round of repairs — the things the inspection flagged and the things it missed — typically add thousands more in the first year, when the budget is already stretched thinnest.",
          "Then come the recurring costs renters never see. Utilities usually rise with a larger space. HOA dues rise too, and special assessments — a new roof for the building, a repaved parking lot — can arrive as a four-figure bill with 30 days' notice. Property tax reassessments follow home values up, and homeowners insurance has risen sharply in disaster-prone areas. None of these appear in the listing price, and all of them come out of the same monthly budget as the mortgage.",
          "The honest way to compare is to price the first year in full: down payment, closing costs, moving, furnishing, immediate repairs, and twelve months of the all-in payment — then compare that against twelve months of rent plus the invested down payment. Buyers who skip that exercise are comparing a mortgage payment to a rent check, and that is not the comparison."
        ]
      },
      {
        "heading": "When renting wins even long term",
        "paragraphs": [
          "Most rent-vs-buy advice assumes buying wins eventually. Sometimes it does not. In markets where the price-to-rent ratio sits above 20 — expensive coastal cities, for example — the unrecoverable cost of owning can exceed rent for decades, not just for the first few years. The break-even horizon stretches past ten years, and a buyer who moves at year eight loses to the renter who invested the down payment.",
          "High rates extend the same effect. At 8%, the interest share of the ownership cost is so large that the first decade builds almost no equity, and the break-even pushes further out. The rate environment at purchase matters as much as the price: the same home at the same price can favor buying at 5% and renting at 8%.",
          "Uncertain income is the third case. A mortgage is a fixed obligation that does not care about a bad year; rent can be renegotiated downward by moving to a cheaper place. If your income is variable or your industry is unstable, the flexibility of renting is worth more than the equity of owning — and the worst outcome in housing is not renting too long, it is buying and then being forced to sell at the wrong time."
        ]
      },
      {
        "heading": "What if home prices fall?",
        "paragraphs": [
          "Leverage cuts both ways, and a falling market shows the other edge. A 10% fall on the $450,000 home wipes out $45,000 — half of a $90,000 down payment. A 20% fall wipes out the down payment entirely and leaves the owner owing more than the home is worth. The renter in the same market loses nothing and may even see rents soften.",
          "The loss is only paper until you sell. If you stay, keep paying, and the market recovers, the fall costs you nothing but sleep — the mortgage amortizes on schedule regardless of the home's value. The danger is a forced sale: a job loss, a divorce, or a move that requires selling while the home is underwater. An underwater sale means bringing cash to closing, or a short sale with the lender's permission, or foreclosure.",
          "That is why the stay-duration rule and the emergency fund matter more than any price forecast. A buyer who can stay ten years and survive a job loss without selling can ride out a fall. A buyer with no reserves and a shaky job cannot — and for that buyer, renting is not the cautious choice, it is the only choice that does not risk the down payment."
        ]
      },
      {
        "heading": "The tax angle, honestly",
        "paragraphs": [
          "Taxes favor owners, but less than the folklore suggests. Mortgage interest is deductible on up to $750,000 of acquisition debt for loans taken out after December 15, 2017 — but only if you itemize deductions, and only the interest above the standard deduction saves you anything. Many homeowners take the standard deduction and get no benefit at all from the mortgage interest deduction. Property tax is deductible too, but the state and local tax deduction is capped, so high-tax states do not deliver the full benefit either.",
          "The bigger tax advantage comes at sale, not during ownership. When you sell a primary residence, up to $250,000 of gain — $500,000 for married couples filing jointly — is excluded from federal tax, as long as you owned and lived in the home for two of the previous five years. A renter's investment gains get no equivalent exclusion. Over a long stay, that exclusion can be worth tens of thousands of dollars — but it only pays if the home gains value and you stay long enough to qualify.",
          "Run the tax comparison on your actual return, not on rules of thumb. A buyer in a high tax bracket who itemizes gets real value from the interest deduction; a buyer taking the standard deduction gets none. The deduction should never be the reason a payment fits — it is a bonus, and it shrinks every year as the interest share of the payment falls."
        ]
      },
      {
        "heading": "Renting while you save: the hybrid path",
        "paragraphs": [
          "There is a third option between renting forever and buying now: rent deliberately while saving for a bigger down payment. The trade is concrete. Renting two more years at $2,400 a month costs $57,600 of rent — but saving $1,500 a month over those two years adds $36,000 to the down payment, moving a buyer on the $450,000 home from 12% down to 20% down. That removes PMI of roughly $180 a month and cuts the loan by $36,000, saving about $228 a month of principal and interest at 6.5% — a total monthly saving near $410, every month, for the life of the loan.",
          "The hybrid wins when rent is cheap relative to the mortgage and the savings rate is high. It loses when home prices rise faster than savings — two years of 4% price growth adds $36,700 to the $450,000 home, wiping out the entire $36,000 saved. It also loses two years of amortization and two years of the fixed payment's protection against rising rents.",
          "The decision rule is the same as the rest of this guide: compare the rent you will pay against the PMI and interest you will avoid, and be honest about whether the savings will actually happen. A hybrid plan that spends the savings is just renting with a story attached."
        ]
      },
      {
        "bullets": [
          "Will you stay at least seven years? If not, rent.",
          "After the down payment and closing costs, will you still hold three to six months of expenses?",
          "Is the all-in payment — PITI, PMI, HOA — under 28% of gross income with room to save?",
          "Is the price-to-rent ratio under 20 in your market?",
          "Could you handle a $10,000 repair without borrowing?",
          "Is your income stable enough to carry a fixed payment through a bad year?"
        ],
        "heading": "A decision checklist",
        "paragraphs": [
          "If the stay question is no, the rest does not matter — rent. If you can answer yes to the stay question and to most of the rest, buying is viable, and the calculator will tell you by how much. If you answer yes to the stay question but no to the reserves or the repair question, the answer is not to rent forever — it is to wait, save, and buy when the checklist passes."
        ]
      }
    ],
    "seoTitle": "Renting vs Buying a Home: The Real Costs Compared (2026)",
    "slug": "rent-vs-buy-guide",
    "sources": [
      {
        "label": "CFPB — Owning a Home",
        "url": "https://www.consumerfinance.gov/owning-a-home/"
      },
      {
        "label": "CFPB — Consider whether it's the right time for you to buy",
        "url": "https://www.consumerfinance.gov/owning-a-home/prepare/consider-whether-its-the-right-time-for-you-to-buy/"
      }
    ],
    "title": "Renting vs Buying a Home: The Real Costs Compared (2026)",
    "type": "Comparison",
    "updated": "2026-11-06"
  },
  {
    "cornerstone": false,
    "description": "How VA loans work: eligibility and the COE, the funding fee table, entitlement and loan limits, the IRRRL streamline refinance, and VA vs FHA vs conventional.",
    "faqs": [
      {
        "answer": "Yes — there is no limit on how many times you can use the benefit. Once a VA loan is paid off, usually by selling the home, your full entitlement is restored. The cost of reuse is the subsequent-use funding fee: 3.3% with less than 5% down, versus 2.15% on first use. At 5% down both are 1.5%, and at 10% down both are 1.25%.",
        "question": "Can I use a VA loan more than once?"
      },
      {
        "answer": "The VA sets no maximum loan amount for borrowers with full entitlement. In practice, lenders cap no-down-payment VA loans at the conforming loan limit — $832,750 for a single-family home in most counties in 2026. Above that, the lender typically asks for a down payment on the amount over the limit.",
        "question": "Is there a maximum loan amount on a VA loan?"
      },
      {
        "answer": "Usually minutes. Most lenders can pull your COE from the VA's system while you apply. If the VA needs more documentation, applying online at VA.gov or by mailing VA Form 26-1880 takes longer — days to weeks — so it is worth requesting the COE before you start house hunting.",
        "question": "How long does it take to get a Certificate of Eligibility?"
      },
      {
        "answer": "Yes, within limits. The VA allows sellers to offer credits toward closing costs, and a credit for the funding fee counts as a seller concession. Concessions are capped at 4% of the home's reasonable value, so on a $375,000 home the seller can contribute up to $15,000 toward your funding fee and other closing costs.",
        "question": "Can the seller pay my VA funding fee?"
      },
      {
        "answer": "Yes, with conditions. A condo must be in a VA-approved project — check the VA's approved condo list before you offer, because a condo outside it cannot be financed with a VA loan. A multi-unit property of up to four units is eligible if you live in one of the units as your primary residence, and the rental income from the other units can help you qualify.",
        "question": "Can I use a VA loan for a condo or a multi-unit home?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/how-va-loans-work.jpg",
    "imageAlt": "Illustration of a veteran receiving house keys in front of a home, with a VA loan document and a funding fee chart",
    "inlineImage": "/images/how-va-loans-work-inline.jpg",
    "inlineImageAlt": "Flat illustration of a service member receiving a large key in front of a house with a shield emblem",
    "intro": "A VA loan is a mortgage guaranteed by the Department of Veterans Affairs for eligible service members, veterans, and surviving spouses. The VA guarantee lets private lenders offer no down payment and no monthly mortgage insurance. Instead, most borrowers pay a one-time funding fee of 1.25% to 3.3% of the loan, which can be financed into the balance.",
    "published": "2026-11-12",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "VA Loan Calculator",
        "url": "/real-estate/va-loan-calculator"
      },
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      },
      {
        "name": "Home Affordability Calculator",
        "url": "/real-estate/home-affordability-calculator"
      },
      {
        "name": "Refinance Calculator",
        "url": "/real-estate/refinance-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Eligibility and the Certificate of Eligibility",
        "paragraphs": [
          "You qualify through service: 90 consecutive days of active duty during wartime, 181 days during peacetime, or six years in the National Guard or Reserves. Surviving spouses of service members who died in service, or from a service-connected disability, also qualify. There is no minimum credit score set by the VA itself, though most lenders require around 620.",
          "Before you apply, you need a Certificate of Eligibility (COE), which confirms your service record and how much entitlement you have. Your lender can usually pull it from the VA's system in minutes; you can also apply on VA.gov or by mailing VA Form 26-1880. Entitlement is reusable: once a VA loan is paid off, usually by selling the home, your full entitlement is restored and you can use the benefit again."
        ]
      },
      {
        "heading": "The funding fee, tier by tier",
        "paragraphs": [
          "The funding fee is the VA's one-time charge for guaranteeing the loan, and it replaces monthly mortgage insurance. The rate depends on your down payment and whether you have used a VA loan before. It is charged on the base loan amount — the price minus your down payment — not on the purchase price. These rates come from the VA funding fee table on VA.gov, effective April 7, 2023.",
          "Some borrowers pay nothing: you are exempt if you receive VA compensation for a service-connected disability, or would receive it but take retirement or active-duty pay instead; if you are a surviving spouse receiving Dependency and Indemnity Compensation (DIC); or if you are an active-duty service member who received a Purple Heart before closing. Everyone else can finance the fee into the loan — the only closing cost VA rules allow you to finance on a purchase — or pay it in cash at closing. A streamline refinance (IRRRL) carries a flat 0.5% fee."
        ],
        "table": {
          "head": [
            "Down payment",
            "First use",
            "Subsequent use"
          ],
          "rows": [
            [
              "Less than 5%",
              "2.15%",
              "3.3%"
            ],
            [
              "5% or more",
              "1.5%",
              "1.5%"
            ],
            [
              "10% or more",
              "1.25%",
              "1.25%"
            ]
          ]
        }
      },
      {
        "heading": "What the monthly payment includes",
        "paragraphs": [
          "A VA loan payment is principal and interest plus property tax and homeowners insurance, with HOA dues on top when they apply. There is no PMI line — VA loans never charge private mortgage insurance, and the funding fee is what takes its place. If you finance the fee, it joins the loan balance and adds to principal and interest every month for the whole term.",
          "The numbers show the trade. On a $375,000 home with no down payment, first use, 6.5% over 30 years, the 2.15% fee is $8,062.50 and the financed loan is $383,062.50. Principal and interest is $2,421.22 a month; with $4,125 a year of tax and $1,875 of insurance, the total payment is $2,921.22. Paying the fee in cash instead would cut the payment to $2,370.26 and save $10,283.10 of interest over the term."
        ]
      },
      {
        "heading": "VA vs FHA vs conventional",
        "paragraphs": [
          "For eligible borrowers, VA usually wins on monthly cost: no down payment required, no monthly insurance premium, and rates that typically price below conventional. The main cost is the funding fee, and it is a one-time charge — unlike FHA's annual mortgage insurance premium of 0.55%, which lasts the life of the loan when you put less than 10% down, or conventional PMI at 0.3% to 1.5% a year until you reach 80% loan-to-value.",
          "VA is not always the cheapest route. A subsequent-use borrower putting nothing down pays a 3.3% fee — $12,375 on a $375,000 loan — while a conventional borrower with 20% down pays no PMI and no funding fee at all. And VA loans are for primary residences only, with a VA appraisal that can slow a purchase in a competitive market. If you have a large down payment and strong credit, run both options through the calculators before deciding."
        ],
        "table": {
          "head": [
            "",
            "VA loan",
            "FHA loan",
            "Conventional loan"
          ],
          "rows": [
            [
              "Minimum down payment",
              "0%",
              "3.5% (580+ credit)",
              "3%"
            ],
            [
              "Upfront fee",
              "1.25–3.3% funding fee",
              "1.75% upfront MIP",
              "None"
            ],
            [
              "Monthly insurance",
              "None — no PMI, ever",
              "0.55%/yr MIP, life of loan below 10% down",
              "PMI 0.3–1.5%/yr below 20% down, cancellable at 80% LTV"
            ],
            [
              "Who qualifies",
              "Veterans, service members, surviving spouses",
              "Any buyer meeting credit and DTI rules",
              "Any buyer meeting credit and DTI rules"
            ]
          ]
        }
      },
      {
        "heading": "Entitlement: basic, bonus, and remaining",
        "paragraphs": [
          "Entitlement is the amount the VA guarantees to your lender, and it decides how much you can borrow with no down payment. It comes in two tiers. Basic entitlement — also called first-tier or tier 1 — is $36,000, and it covers the VA guaranty on loans of $144,000 or less. Above $144,000, bonus entitlement — tier 2 — applies, and the VA guarantees 25% of the loan amount.",
          "With full entitlement — no VA loan outstanding and none charged against your record — the VA sets no loan limit at all. Your lender decides how much you can afford based on income, debts, and credit, and the loan is capped at the lower of the appraised value or the purchase price. The conforming loan limit of $832,750 for 2026 matters only when your entitlement is partial.",
          "Partial entitlement is the common case for a second VA loan: you still own a home bought with a VA loan, or you sold one without restoring entitlement. Your remaining bonus entitlement is 25% of your county's conforming loan limit, minus the entitlement already used. The VA's own example: a borrower who has used $50,000 of entitlement in a county with a $900,000 limit has $225,000 minus $50,000 — $175,000 — of remaining bonus entitlement. Multiply by four, and the maximum loan with no down payment is $700,000.",
          "If you want to borrow more than that, the lender will ask for a down payment covering the shortfall in the guaranty: 25% of the loan amount minus your remaining entitlement. On an $800,000 loan with $175,000 of remaining entitlement, the guaranty needs to cover $200,000 — so the down payment is $25,000. Your Certificate of Eligibility shows the entitlement already charged, so the calculation starts there."
        ]
      },
      {
        "heading": "The VA appraisal and minimum property requirements",
        "paragraphs": [
          "Every VA purchase needs a VA appraisal, and it does two jobs: it sets the home's reasonable value, and it checks the home against the VA's minimum property requirements. The loan cannot exceed the lower of the appraised value or the purchase price — if the appraisal comes in below the price, the gap has to be closed by renegotiating the price, paying the difference in cash, or walking away.",
          "The minimum property requirements are a health-and-safety standard, not a cosmetic one. The home must be safe, sound, and sanitary: a roof with reasonable remaining life, working heat, water, and electricity, no major structural defects, and no hazards such as exposed wiring or broken windows. Peeling paint on a home built before 1978 is flagged because of lead. The appraiser is not a home inspector — the requirements are a floor, not a full inspection — and a separate home inspection is still worth paying for.",
          "If the appraisal looks like it will come in below the price, the VA's Tidewater process gives the lender a short window to submit additional comparable sales before the value is finalized. If the value still comes in low, the Notice of Value — the VA's official statement of reasonable value — is the number the loan is sized from, and the seller's concessions cap of 4% of reasonable value is measured against it."
        ]
      },
      {
        "heading": "The IRRRL: refinancing without the paperwork",
        "paragraphs": [
          "The Interest Rate Reduction Refinance Loan — IRRRL, usually called the VA streamline — refinances an existing VA loan into a new VA loan on the same home, with far less paperwork than a standard refinance. The VA does not require a new appraisal, a credit underwriting package, or a new Certificate of Eligibility. Your lender can confirm your prior use of entitlement with the VA directly.",
          "The purpose is narrow: a lower rate, a lower payment, or a move from an adjustable rate to a fixed rate. You cannot take cash out. Congress added three tests to stop serial refinancing. First, seasoning: the loan being refinanced must be at least 210 days past its first payment due date, and you must have made at least six consecutive monthly payments. Second, net tangible benefit: on a fixed-rate loan refinanced into another fixed-rate loan, the new rate must be at least 0.50 percentage points lower; on a fixed-rate loan refinanced into an adjustable-rate loan, at least 2 points lower. Third, recoupment: the fees and closing costs must be recovered through the lower payment within 36 months.",
          "The funding fee on an IRRRL is a flat 0.5% of the loan, first use or subsequent — $2,000 on a $400,000 loan — and it can be financed into the new balance. Up to two discount points can also be financed. Because there is no appraisal, an IRRRL works even if your home's value has fallen since you bought it, which is exactly when a standard refinance would fail. Run the recoupment math before you sign: a lower rate that takes four years to repay its costs is not a bargain if you plan to move in three."
        ]
      },
      {
        "heading": "VA cash-out refinance",
        "paragraphs": [
          "The VA cash-out refinance is the other refinance path, and it does the opposite job: it turns home equity into cash. It can refinance any first mortgage — VA or not — into a VA loan, and the new loan can go up to 100% of the home's reasonable value. The cash can pay for home improvements, education, or other debts, and the loan still carries no monthly mortgage insurance.",
          "The funding fee is higher than on a streamline: 2.15% of the loan on first use, 3.3% on subsequent use, with no reduction for a down payment — the fee does not change with loan-to-value on a cash-out refinance. A new VA appraisal is required, and the loan must pass a net tangible benefit test. One way to pass is a new loan-to-value of 90% or less; other routes include a lower rate, a lower payment, a shorter term, or eliminating monthly mortgage insurance.",
          "The warning is structural: a cash-out refinance converts unsecured debt into debt secured by your home. Using it to pay off credit cards can make sense at a much lower rate, but it puts the house behind spending that was previously unsecured — and if the spending continues, the equity is gone and the cards fill up again. A cash-out refinance should follow a budget change, not substitute for one."
        ]
      },
      {
        "heading": "The funding fee exemption and refunds",
        "paragraphs": [
          "The funding fee exemption is worth more than it looks, because it removes the VA loan's main cost entirely. You pay no funding fee if you receive VA compensation for a service-connected disability, or would receive it but take retirement or active-duty pay instead; if you receive Dependency and Indemnity Compensation as a surviving spouse; if you are an active-duty service member who received a Purple Heart before closing; or if you have a proposed or memorandum rating from a pre-discharge claim before the closing date.",
          "The refund rule matters for borrowers whose disability claim is still pending at closing. If you are later awarded VA compensation with an effective date retroactive to before your loan closing, the funding fee is refunded — on a $375,000 loan, that is $8,062.50 back. But a proposed or memorandum rating issued after closing does not qualify for a refund. The effective date of the compensation is what counts, not the date of the decision.",
          "If you think you qualify for a refund, contact your VA regional loan center — the VA's own guidance is to call, not to wait. And if your claim is pending when you close, keep the paperwork: the refund claim runs on dates, and the closing date against the compensation effective date is the whole case."
        ]
      },
      {
        "heading": "When a VA loan is not the best choice",
        "paragraphs": [
          "A VA loan is usually the cheapest route for eligible borrowers, but there are cases where it is not. The clearest is the subsequent-use borrower with a large down payment: a 3.3% funding fee on a $375,000 loan is $12,375, while a conventional borrower with 20% down pays no PMI and no funding fee at all. If you have the down payment and strong credit, run both options before assuming VA wins.",
          "Property type can rule VA out. Condos must be in a VA-approved project — the VA maintains a list, and a condo outside it cannot be financed with a VA loan. Manufactured homes are eligible, but a manufactured home not permanently affixed to land carries a 1% funding fee and tighter rules. Multi-unit properties up to four units are eligible if you live in one unit, but the VA appraisal and the rental-income rules add complexity.",
          "VA loans are also assumable: a buyer can take over your VA loan, including your rate, with the VA's approval and a 0.5% funding fee. In a high-rate market, an assumable loan at a low rate is a genuine selling advantage — it can make your home more attractive than a comparable home whose buyer must finance at current rates. It is a benefit worth mentioning when you sell, and a reason to keep the loan in good standing."
        ]
      },
      {
        "heading": "The VA residual income test",
        "paragraphs": [
          "The VA underwrites differently from other lenders: alongside the 41% debt-to-income ratio, it runs a residual income test. After the mortgage payment and all other debts, the VA checks that enough income remains for the family's living costs — food, utilities, transport, and everything else. The required amount varies by region and family size, and the tables are published in the VA Lender's Handbook.",
          "The test cuts both ways. A borrower with a DTI above 41% can still be approved if the residual income is strong — the VA explicitly allows compensating factors, and residual income is the main one. A borrower inside the 41% ratio can be declined if the residual income is too thin, which happens most often with large families in high-cost regions. It is a second gate, not a formality.",
          "For the borrower, the test is genuinely useful: it answers the question the ratios do not — not whether the lender is protected, but whether the household can live on what is left. A loan that passes the residual income test with room to spare is a loan the family can carry through a bad month. Ask your lender to show you the residual income calculation, not just the DTI."
        ]
      },
      {
        "heading": "Closing costs on a VA loan: who pays what",
        "paragraphs": [
          "VA rules limit what a lender can charge the veteran. The lender may charge a flat origination fee of up to 1% of the loan — the one fee that covers the lender's work — plus a short list of itemized charges such as the appraisal, the credit report, title insurance, and recording fees. Charges outside that list cannot be passed to the veteran, and VA loans carry no prepayment penalty.",
          "The seller's side is capped too. Seller concessions — credits toward the buyer's costs, including the funding fee — are limited to 4% of the home's reasonable value. Closing costs themselves are not capped the same way, so a seller can pay a large share of the buyer's costs within the concession limit. And only the funding fee can be financed into the loan on a purchase; every other closing cost is due in cash at closing."
        ],
        "bullets": [
          "The veteran can pay: origination up to 1%, discount points, appraisal, credit report, title insurance, recording fees.",
          "The seller can pay: concessions up to 4% of reasonable value, including a credit for the funding fee.",
          "Nobody can charge the veteran: broker fees, prepayment penalties, or lender fees outside the VA's allowed list.",
          "Only the funding fee can be financed into the loan — all other closing costs are due in cash."
        ]
      }
    ],
    "seoTitle": "How VA Loans Work (Funding Fee, Eligibility & Payments)",
    "slug": "how-va-loans-work",
    "sources": [
      {
        "label": "VA.gov — VA Home Loans",
        "url": "https://www.va.gov/housing-assistance/home-loans/"
      },
      {
        "label": "VA.gov — Funding Fee and Closing Costs",
        "url": "https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/"
      },
      {
        "label": "VA.gov — Home Loan Entitlement and Limits",
        "url": "https://www.va.gov/housing-assistance/home-loans/loan-limits/"
      }
    ],
    "title": "How VA Loans Work (Funding Fee, Eligibility & Payments)",
    "type": "What",
    "updated": "2026-11-12"
  },
  {
    "cornerstone": false,
    "description": "How FHA loans work: the 3.5% down payment, the two MIP charges and how long they last, 2026 loan limits by county, and how to refinance out of MIP for good.",
    "faqs": [
      {
        "answer": "It depends on your county. The 2026 FHA limit for a one-unit home runs from $541,287 in low-cost counties to $1,249,125 in high-cost counties, and the limit applies to the base loan, not the price — so in a floor county you can buy a more expensive home if your down payment brings the base loan under $541,287. Your income and debts still have to support the payment under the lender's debt-to-income limits.",
        "question": "How much house can I buy with an FHA loan?"
      },
      {
        "answer": "No — there is no down payment that avoids FHA mortgage insurance. UFMIP of 1.75% and annual MIP apply to every FHA loan, even at 20% down. What a bigger down payment changes is the rate and the duration: at 10% or more down, the annual rate on a 30-year loan is 0.50% and MIP ends after 11 years, instead of 0.55% for the life of the loan at 3.5% down.",
        "question": "Do I need 20% down to avoid FHA mortgage insurance?"
      },
      {
        "answer": "No. FHA loans are for primary residences only — you must move in within 60 days of closing and live in the home for at least a year. Buying a property you do not intend to live in with an FHA loan is occupancy fraud. One exception buyers use legitimately is a two- to four-unit property: you live in one unit and rent the others, and FHA allows that with higher loan limits for multi-unit homes.",
        "question": "Can I use an FHA loan for an investment property?"
      },
      {
        "answer": "HUD's minimum is 580 for the 3.5% down payment, or 500 to 579 with 10% down. In practice most lenders add their own overlays — a 620 minimum is common — so a score between 500 and 620 may qualify on paper but find few lenders willing to write the loan. A higher score does not change the MIP rate, which is set by term, loan-to-value and loan size, but it usually earns a lower interest rate.",
        "question": "What credit score do I need for an FHA loan?"
      },
      {
        "answer": "Generally no — FHA insures one primary-residence loan per borrower at a time. HUD allows exceptions: a job relocation that makes commuting unreasonable, a growing family that has outgrown the home, a divorce that leaves one borrower with the home, or a non-occupying co-borrower on a second loan. Outside those exceptions, the first FHA loan must be paid off before a second one closes.",
        "question": "Can I have two FHA loans at the same time?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/how-fha-loans-work.jpg",
    "imageAlt": "Illustration of a first-time buyer receiving the keys to a modest house, with a small FHA shield emblem",
    "inlineImage": "/images/how-fha-loans-work-inline.jpg",
    "inlineImageAlt": "Flat illustration of a young couple holding a large key in front of a modest house with a shield emblem above the roof",
    "intro": "An FHA loan is a mortgage insured by the Federal Housing Administration, which lets lenders accept a 3.5% down payment and credit scores from 580. In exchange, every borrower pays two mortgage insurance premiums: 1.75% of the loan upfront and an annual premium of 0.15% to 0.75%, which can run for the life of the loan.",
    "published": "2026-11-12",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "FHA Loan Calculator",
        "url": "/real-estate/fha-loan-calculator"
      },
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      },
      {
        "name": "Down Payment Calculator",
        "url": "/real-estate/down-payment-calculator"
      },
      {
        "name": "Refinance Calculator",
        "url": "/real-estate/refinance-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Who FHA loans are for, and the down payment rules",
        "paragraphs": [
          "The FHA does not lend money itself. A private lender makes the loan, and the Federal Housing Administration — part of HUD — insures it, which is what lets the lender accept a small down payment and a lower credit score than a conventional loan would allow. The trade is mortgage insurance on every loan, with no exceptions.",
          "The minimum down payment is 3.5% with a credit score of 580 or higher, or 10% with a score of 500 to 579. Below 500, FHA-insured financing is not available. These are HUD's floors, not guarantees: individual lenders can set stricter minimums, and many do — a 620 score is a common lender overlay even though HUD allows 580.",
          "The home must be your primary residence. You have to move in within 60 days of closing and live there for at least a year, so FHA loans do not work for investment properties or second homes. The loan also has to fit your county's FHA limit, covered below."
        ]
      },
      {
        "heading": "The two MIP charges, and what they cost",
        "paragraphs": [
          "Every FHA loan carries two separate insurance charges. The upfront mortgage insurance premium (UFMIP) is a one-time 1.75% of the base loan amount, charged at closing. Most buyers finance it into the loan, which raises the amount they pay interest on for the whole term: on a $337,750 base loan the UFMIP is $5,911, making the total loan $343,661.",
          "The monthly amount is not a flat rate times the original balance. HUD charges each year's premium on the average outstanding balance for that year, so the payment falls as the balance amortizes. On a $350,000 home with 3.5% down at 6.5% over 30 years, year-1 monthly MIP is $157 at 0.55%, and total MIP over the loan is $37,000. With 10% down instead, the rate drops to 0.50%, MIP ends after 11 years, and the total is $16,277.",
          "Base loans above the $832,750 conforming limit pay higher rates: 0.70% or 0.75% on terms over 15 years, and 0.15% to 0.65% on terms of 15 years or less. The duration rule is the same either way — the dividing line is the down payment. Under 10% down, annual MIP runs for the life of the loan; at 10% or more, it ends after 11 years.",
          "The annual MIP is the ongoing charge, paid monthly. Its rate comes from HUD Mortgagee Letter 2023-05 and depends on the loan term, the loan-to-value ratio and whether the base loan is above the national conforming limit ($832,750 for 2026). For base loans at or below that limit, the rates are:"
        ],
        "table": {
          "head": [
            "Term",
            "Loan-to-value",
            "Annual MIP",
            "How long it lasts"
          ],
          "rows": [
            [
              "Over 15 years",
              "90% or less",
              "0.50%",
              "11 years"
            ],
            [
              "Over 15 years",
              "90% to 95%",
              "0.50%",
              "Life of the loan"
            ],
            [
              "Over 15 years",
              "Over 95%",
              "0.55%",
              "Life of the loan"
            ],
            [
              "15 years or less",
              "90% or less",
              "0.15%",
              "11 years"
            ],
            [
              "15 years or less",
              "Over 90%",
              "0.40%",
              "Life of the loan"
            ]
          ]
        }
      },
      {
        "heading": "Loan limits in 2026",
        "paragraphs": [
          "FHA caps the base loan by county, and the cap moves with local home prices. For 2026 the national floor is $541,287 for a one-unit home in low-cost counties, and the ceiling is $1,249,125 in the highest-cost counties, set by HUD Mortgagee Letter 2025-23. Most counties sit at the floor; a smaller number sit at the ceiling, and some land in between.",
          "The limit applies to the base loan — price minus down payment — before any financed upfront MIP, not to the home price. A $600,000 home in a floor county still qualifies if the base loan is $541,287 or less, which means a down payment of about $58,700. Alaska, Hawaii, Guam and the U.S. Virgin Islands have a higher special-exception ceiling of $1,873,625 for a one-unit home."
        ]
      },
      {
        "heading": "FHA vs conventional: when each wins",
        "paragraphs": [
          "FHA wins when the down payment or the credit score is the constraint. A buyer with 3.5% down and a 620 score can usually get an FHA loan where a conventional lender would decline or price the loan punitively, and FHA interest rates are often slightly lower than conventional rates for the same borrower.",
          "Conventional wins once you have 20% down or strong credit. Private mortgage insurance on a conventional loan can be canceled — you can request it at 80% of the original value, and it must end automatically at 78% — while FHA annual MIP with less than 10% down never ends on its own. A borrower who can put 20% down and has a 720 score will almost always pay less with a conventional loan.",
          "The common middle path is to buy with FHA, then refinance into a conventional loan once the home has gained enough equity — usually 20% — to drop mortgage insurance entirely. That refinance is also the only way to escape FHA annual MIP early when it runs for the life of the loan; an FHA streamline refinance keeps MIP in place."
        ]
      },
      {
        "heading": "Loan limits by county: how to check yours",
        "paragraphs": [
          "The national floor and ceiling are only the edges of the map. Most counties sit at the floor, a smaller number sit at the ceiling, and the rest land in between, set by the median home price in the county's metropolitan area. The limit that matters is your county's, and it changes every year — check it before you shop, not after you offer.",
          "HUD publishes the limits in its FHA Mortgage Limits search, which returns the limit for any county and property size. The limits also rise with the number of units: a two-unit property has a higher limit than a one-unit home in the same county, which is what makes the house-hack — living in one unit and renting the others — workable with an FHA loan. The table shows the 2026 floor and ceiling for each property size.",
          "Two details catch buyers out. First, the limit applies to the base loan, not the price — the financed upfront MIP sits on top of the limit, not inside it. Second, the limit that applies is the one in force when your FHA case number is assigned, which is usually early in the process. If limits rise on January 1 and your case number was assigned in December, the old limit governs."
        ],
        "table": {
          "head": [
            "Property size",
            "Low-cost floor",
            "High-cost ceiling"
          ],
          "rows": [
            [
              "One-unit",
              "$541,287",
              "$1,249,125"
            ],
            [
              "Two-unit",
              "$693,050",
              "$1,599,375"
            ],
            [
              "Three-unit",
              "$837,700",
              "$1,933,200"
            ],
            [
              "Four-unit",
              "$1,041,125",
              "$2,402,625"
            ]
          ]
        }
      },
      {
        "heading": "The FHA appraisal and property standards",
        "paragraphs": [
          "An FHA loan requires an FHA appraisal, and the appraisal checks more than value. HUD's minimum property standards require the home to be safe, sound, and secure: a roof with at least two years of remaining life, working heating, plumbing, and electricity, no major structural problems, and safe access to the home. Peeling paint in a home built before 1978 is flagged for lead; a missing handrail on a staircase is flagged for safety.",
          "Problems the appraiser finds must be repaired before closing, or the loan does not close. That makes FHA a poor fit for homes in visibly poor condition — the seller has to fix the roof or the loan dies, and in a competitive market sellers often choose the buyer whose loan has no repair conditions. If the home needs work, the 203(k) loan below is the FHA route built for it.",
          "The appraisal is tied to the property's FHA case number, not to the buyer. If one FHA buyer's deal falls through, the next FHA buyer on the same property gets the same appraisal and the same list of required repairs. A low appraisal or a long repair list follows the house, not the borrower — which is why sellers in hot markets sometimes prefer conventional buyers, and why an FHA offer on a fixer-upper needs the seller's cooperation from the start."
        ]
      },
      {
        "heading": "The FHA streamline refinance",
        "paragraphs": [
          "The FHA streamline refinance replaces an existing FHA loan with a new FHA loan, with less paperwork than a standard refinance. HUD does not require an appraisal, and on the non-credit-qualifying version the lender does not have to verify income or calculate a debt-to-income ratio. The new loan is sized from the existing loan balance, not from a new valuation — which means an underwater homeowner can still refinance.",
          "The tests are firm. Seasoning: on the date the new FHA case number is assigned, at least 210 days must have passed since the current loan closed, at least six payments must have been made, and at least six full months must have passed since the first payment due date. Net tangible benefit: for a fixed-rate loan refinanced into another fixed-rate loan, the combined rate — interest rate plus annual MIP rate — must fall by at least 0.5 percentage points. Cash back is capped at $500, and closing costs cannot be rolled into the new loan amount.",
          "The streamline's limit is that it does not escape MIP: the new loan carries its own upfront premium of 1.75% and a new annual MIP schedule. Whether the new MIP runs for life or ends after 11 years depends on the new loan's loan-to-value — under 10% equity, it runs for life, just like the loan it replaced. The streamline is a rate tool, not an exit from mortgage insurance."
        ]
      },
      {
        "heading": "FHA 203(k): buying a fixer-upper",
        "paragraphs": [
          "The 203(k) loan is FHA's answer to the fixer-upper: one mortgage that finances the purchase and the renovation together, with one monthly payment and the same 3.5% minimum down payment. The loan amount is based on the home's value after the improvements, which is what makes it possible to buy a home that would fail the standard FHA appraisal.",
          "There are two versions. The Limited 203(k) covers non-structural work — kitchens, bathrooms, flooring, roofing, HVAC — up to $75,000 in total rehabilitation costs, with no minimum, and the work must be finished within nine months. HUD raised that cap from $35,000 for case numbers assigned on or after November 4, 2024. A consultant is optional on the Limited version. The Standard 203(k) handles structural work and larger projects: a $5,000 minimum, no cap beyond the county FHA loan limit, twelve months to finish, and a HUD-approved 203(k) consultant is required.",
          "The trade is paperwork and time. The renovation budget, the contractor bids, and the after-improved appraisal all have to be approved before closing, and the repair funds are held in escrow and released as work is completed and inspected. A 203(k) closing takes longer than a standard FHA closing, and not every lender offers the program. But for a buyer who can see past a dated kitchen to the home underneath, it is the only low-down-payment route to a house that needs work."
        ],
        "table": {
          "head": [
            "",
            "Limited 203(k)",
            "Standard 203(k)"
          ],
          "rows": [
            [
              "Repair cap",
              "Up to $75,000",
              "No cap beyond county limit"
            ],
            [
              "Minimum",
              "None",
              "$5,000"
            ],
            [
              "Structural work",
              "No",
              "Yes"
            ],
            [
              "Consultant",
              "Optional",
              "Required"
            ],
            [
              "Time to complete",
              "9 months",
              "12 months"
            ]
          ]
        }
      },
      {
        "heading": "Getting out of MIP: the refinance path",
        "paragraphs": [
          "For borrowers who put less than 10% down, annual MIP runs for the life of the loan — and the only exit is refinancing into a conventional loan. The streamline refinance cannot do it: a new FHA loan carries new MIP. The exit needs 20% equity, either from paying the loan down, from the home gaining value, or from both.",
          "Take the $350,000 home from the MIP section: a $343,661 total loan after the financed upfront premium. After five years the balance is $321,704. If the home is still worth $350,000, equity is $28,296 — 8.1%, nowhere near 20%. The home would need to be worth about $402,000, or the balance paid down to $280,000, before a conventional refinance drops mortgage insurance entirely.",
          "The math still favors refinancing early in many cases. At 0.55% on a $322,000 balance, annual MIP costs about $148 a month. Refinancing costs roughly 0.5–1.5% of the loan — $1,610 to $4,830 here — so the MIP saving alone repays the closing costs in 11 to 33 months, before any rate improvement. If the new conventional loan carries PMI instead, because equity is between 10% and 20%, the PMI is cancellable at 80% loan-to-value — a finish line FHA MIP does not offer. Check your equity once a year: the month it crosses 20% is the month the refinance pays."
        ]
      },
      {
        "heading": "FHA and condos",
        "paragraphs": [
          "Condos need a separate approval. FHA insures loans only in condo projects that are FHA-approved, or on single units that receive FHA's single-unit approval in a project that is not approved. The project approval looks at the condo association's finances, the share of owner-occupied units, and the share of units behind on dues — factors that protect the FHA insurance fund from weak associations.",
          "Check approval before you offer. HUD publishes the approved condo list, and your lender can confirm a project's status in minutes. An offer on an unapproved condo with an FHA loan will fail at underwriting, and the single-unit approval route takes time the seller may not give you. In a market where most condos are approved, this is a non-issue; in a building with rental-heavy ownership or shaky reserves, it is the first thing to check."
        ]
      },
      {
        "heading": "FHA loan assumption: a hidden benefit",
        "paragraphs": [
          "FHA loans are assumable: when you sell, a qualified buyer can take over your FHA loan — including your interest rate — with the lender's approval. In a high-rate market, an assumable loan at a low rate is a genuine selling advantage. A buyer who assumes a 3.5% FHA loan while new loans price at 6.5% saves hundreds of dollars a month, and that saving makes your home more attractive than a comparable home whose buyer must finance at current rates.",
          "The buyer must still qualify — the lender runs the same credit and income checks as a new application — and the buyer needs cash or a second loan for the difference between the loan balance and the sale price. The seller should ask for a release of liability, which frees the seller from responsibility for the loan and restores the seller's FHA eligibility. Without the release, the loan stays on the seller's record and can block a second FHA loan.",
          "Assumption is not automatic and not fast — the lender's approval process takes weeks, and some servicers are slower than others. But it is a benefit worth mentioning in the listing when rates have risen since you bought, and a reason to keep the loan in good standing: a loan in default cannot be assumed."
        ]
      },
      {
        "heading": "FHA gift funds and down payment assistance",
        "paragraphs": [
          "The 3.5% down payment does not have to come from your own savings. FHA allows the entire down payment to be a gift from a family member, an employer, a labor union, a charitable organization, or a government agency — with a paper trail. The donor signs a gift letter stating the money is a gift with no expectation of repayment, and the lender traces the funds from the donor's account to yours. Undocumented cash does not qualify, and a loan disguised as a gift is fraud.",
          "Down payment assistance programs fill the same gap for buyers without a family gift. Most states and many cities run programs — grants that never have to be repaid, or deferred second loans that come due when you sell or refinance. The amounts are usually a few thousand dollars, enough to cover part of the down payment or closing costs, and the programs often have income limits and first-time-buyer requirements. A HUD-approved housing counselor can walk you through the programs in your area free of charge.",
          "One source is closed: the seller cannot fund your down payment. Seller-funded down payment assistance was banned in 2008, and any arrangement that routes the seller's money into your down payment — directly or through a third party — will fail underwriting and can kill the deal. If a seller offers to help with the down payment, the answer is no; the seller can help with closing costs instead, within FHA's 6% seller-concession limit."
        ],
        "bullets": [
          "Gift funds: allowed from family and approved sources, with a signed gift letter and a paper trail — no repayment expected.",
          "Down payment assistance: state and local grants or deferred second loans, usually a few thousand dollars, often with income limits.",
          "Not allowed: seller-funded down payment assistance, undocumented cash, or a loan disguised as a gift.",
          "Sellers can contribute to closing costs instead, up to FHA's 6% seller-concession limit."
        ]
      }
    ],
    "seoTitle": "How FHA Loans Work (MIP, Down Payment & Limits)",
    "slug": "how-fha-loans-work",
    "sources": [
      {
        "label": "HUD — FHA Single Family Housing",
        "url": "https://www.hud.gov/program_offices/housing/sfh"
      },
      {
        "label": "HUD — FHA Announces 2026 Loan Limits",
        "url": "https://www.hud.gov/news/hud-no-25-145"
      },
      {
        "label": "HUD — Mortgagee Letter 2024-13, 203(k) Program Updates",
        "url": "https://www.hud.gov/sites/dfiles/OCHCO/documents/2024-13hsgml.pdf"
      }
    ],
    "title": "How FHA Loans Work (MIP, Down Payment & Limits)",
    "type": "What",
    "updated": "2026-11-12"
  },
  {
    "cornerstone": false,
    "description": "Biweekly mortgage payments add one extra payment a year: $300,000 at 6.5% saves $88,122 and clears 5 years 10 months early. Fees to avoid and the DIY version.",
    "faqs": [
      {
        "answer": "On a $300,000 loan at 6.5% over 30 years, $88,122 of interest and 5 years 10 months. The saving rises with your rate and balance — $138,895 at 8%, $20,637 at 3% — and falls to almost nothing on a small or nearly paid-off loan. Enter your own balance, rate and term in the calculator for the exact figure.",
        "question": "How much can biweekly payments save me?"
      },
      {
        "answer": "No. No law requires a program, and no servicer can require you to use a third-party company. If your servicer offers biweekly directly and free, that is fine. Otherwise, add one-twelfth of your payment to each monthly payment as extra principal — the same result, free.",
        "question": "Do I have to enroll in a program to pay biweekly?"
      },
      {
        "answer": "Some servicers collect half-payments every two weeks but apply them only when a full monthly payment has accumulated. That delivers the once-a-year extra payment at best and no compounding benefit — the exact practice the CFPB sued over in 2015. Ask in writing how half-payments are applied, and switch to the monthly extra-principal method if the answer is anything but immediately.",
        "question": "What happens if my servicer holds my half-payments?"
      },
      {
        "answer": "Barely. On the $300,000 example, true biweekly saves $88,122 and one extra monthly payment a year saves $87,256, because the biweekly version applies the extra principal a few weeks earlier. Pick whichever you will keep doing for years — consistency matters far more than the $866 gap.",
        "question": "Is biweekly better than one extra payment a year?"
      },
      {
        "answer": "Not directly: scoring models do not reward payment frequency. What helps is never missing a payment, and a debit timed to payday can make that easier. What can hurt is a program that holds your money and pays late — another reason to confirm, in writing, exactly when each half-payment reaches your lender.",
        "question": "Will biweekly payments affect my credit score?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/guides/how-biweekly-mortgage-payments-work.jpg",
    "imageAlt": "Illustration of biweekly mortgage payments: a house, a calendar with two payments marked each month, and a shrinking loan balance",
    "inlineImage": "/images/how-biweekly-mortgage-payments-work-inline.jpg",
    "inlineImageAlt": "Flat illustration of a house beside a large calendar with two highlighted days each week and a shrinking stack of coins",
    "intro": "Paying half your mortgage every two weeks adds up to 13 monthly payments a year instead of 12. On a $300,000 loan at 6.5% over 30 years, that one extra payment a year clears the loan in 24 years 2 months and saves $88,122 of interest — and you can copy the schedule free, without enrolling in a servicer's program.",
    "published": "2026-11-19",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Biweekly Mortgage Calculator",
        "url": "/real-estate/biweekly-mortgage-calculator"
      },
      {
        "name": "Mortgage Payoff Calculator",
        "url": "/real-estate/mortgage-payoff-calculator"
      },
      {
        "name": "Mortgage Amortization Calculator",
        "url": "/real-estate/mortgage-amortization-calculator"
      },
      {
        "name": "Refinance Calculator",
        "url": "/real-estate/refinance-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Where the thirteenth payment comes from",
        "paragraphs": [
          "A month is not four weeks. A year has 52 weeks, so paying half your monthly payment every two weeks means 26 half-payments — and 26 halves equal 13 whole payments, one more than the 12 a monthly schedule makes. That is the whole trick: nothing about the rate changes, nothing about the loan changes, you simply pay one extra monthly payment a year. The Consumer Financial Protection Bureau describes the same mechanic in its guidance on biweekly plans: 26 half-payments a year, or one extra monthly payment.",
          "The extra payment matters because it goes straight to principal. Your scheduled payment already covers the interest due, so the thirteenth payment buys down the balance directly — and because every future interest charge is calculated on that balance, the saving compounds. An extra dollar of principal in year one removes the interest that dollar would have generated for the next 29 years. That is why the same extra payment is worth far more early in the loan than late, when most of each payment is already principal."
        ]
      },
      {
        "heading": "Worked example: $300,000 at 6.5% over 30 years",
        "paragraphs": [
          "Take the loan the calculator opens with: $300,000, 6.5% fixed, 30 years. The monthly principal-and-interest payment is $1,896.20. Pay half of it — $948.10 — every two weeks, and the loan takes 628 biweekly payments to clear. That is 24 years 2 months, not 30, and the last payment is only $51.71 because the balance runs out mid-payment.",
          "The saving scales with the rate. At the same balance but 3%, biweekly saves $20,637 and about 3 years 6 months; at 8% it saves $138,895 and clears the loan in about 22 years 10 months. The pattern is the point: the more interest your loan generates, the more each extra payment removes."
        ],
        "table": {
          "head": [
            "",
            "Monthly",
            "Biweekly"
          ],
          "rows": [
            [
              "Payment",
              "$1,896.20 a month",
              "$948.10 every two weeks"
            ],
            [
              "Payments a year",
              "12",
              "26 half-payments (13 monthly)"
            ],
            [
              "Payoff",
              "30 years",
              "24 years 2 months"
            ],
            [
              "Total interest",
              "$382,633",
              "$294,512"
            ],
            [
              "Total paid",
              "$682,633",
              "$594,512"
            ],
            [
              "Interest saved",
              "—",
              "$88,122"
            ]
          ]
        }
      },
      {
        "heading": "The fee trap: what the CFPB found",
        "paragraphs": [
          "The saving is real. The programs sold to deliver it often are not worth buying. Many servicers charge $200–$500 to enroll in a biweekly program, and third-party companies have charged far more. In 2015 the Consumer Financial Protection Bureau sued two of the largest, Nationwide Biweekly Administration and Loan Payment Administration, alleging they misrepresented the savings, hid the costs, and falsely claimed affiliation with lenders. Between 2011 and 2014 the companies had collected about $49 million in setup fees — up to $995 per borrower — plus $84 to $101 a year in processing fees.",
          "The worse detail was how the money moved. The companies collected half-payments every two weeks but held the funds and paid the lender on the original monthly schedule, so borrowers got the once-a-year extra payment minus the fees, not the biweekly compounding the marketing promised. The lesson is not that biweekly is a scam — the arithmetic is genuine — but that paying someone to run the schedule for you is usually paying for nothing. If a program charges a setup fee, an annual fee, or a per-payment fee, walk away: the same result is free, as the next section shows.",
          "Two checks before you enroll anywhere: first, does the servicer apply half-payments the day they arrive, or hold them until a full payment accumulates? Held payments wipe out the benefit entirely, because the extra principal never lands early. Second, does your loan note carry a prepayment penalty? Federal rules limit them tightly and most modern mortgages have none, but the note is the authority — check the prepayment section before you commit to extra payments of any kind."
        ]
      },
      {
        "bullets": [
          "Divide your monthly principal-and-interest payment by 12 and add it to each payment as extra principal.",
          "Or make one extra full monthly payment a year — the same total, if your budget prefers a lump sum.",
          "Tell the servicer in writing that the extra is principal-only, and check the next statement to confirm it was applied that way.",
          "Set it as an automatic transfer on payday so the habit survives the months when money is tight."
        ],
        "heading": "The free DIY version",
        "paragraphs": [
          "You do not need a program to get 13 payments a year. The simplest copy: divide your monthly principal-and-interest payment by 12 and add that amount to every monthly payment, marked as extra principal. On the $300,000 example that is $158.02 a month. The loan clears in 290 months and saves $87,256 — within $866 of the true biweekly result, with no enrollment, no fee, and no third party holding your money.",
          "The monthly version trails the true biweekly schedule by a few hundred dollars because the extra principal lands once a month instead of every two weeks. That gap is the entire price of doing it yourself — and it is negative, since the program version costs fees. The only thing the DIY version cannot copy is the discipline of an automatic debit every payday; if that is what keeps you on schedule, automate the monthly extra instead."
        ]
      },
      {
        "heading": "When biweekly does not pay",
        "paragraphs": [
          "Biweekly is not always the best use of the money. With a rate below 4%, the saving is small — $20,637 on the $300,000 loan at 3% — and the same cash in retirement savings or an emergency fund may be worth more. If your servicer holds half-payments, the schedule does nothing at all. If you plan to sell or refinance within a few years, the extra principal still builds equity, but the big prize — decades of avoided interest — is one you will not stay to collect. And if the extra payment stretches your budget so thin that a single emergency lands on a credit card at 20%, the cheap mortgage is not the debt to attack first.",
          "The rule of thumb: biweekly pays when your rate is high, your horizon is long, and the extra payment fits comfortably. Otherwise, keep the monthly schedule and put the same money where it earns or saves more. Run the numbers both ways in the calculator before you decide — the saving is specific to your loan, and a guess is not a plan."
        ]
      },
      {
        "heading": "Biweekly vs monthly extra principal: the $866 gap, explained",
        "paragraphs": [
          "The DIY version trails the true biweekly schedule by $866 over the life of the loan — $87,256 saved against $88,122. The entire gap is timing. A true biweekly plan applies extra principal every two weeks, so each extra dollar starts saving interest up to two weeks sooner than the monthly version's extra dollar. Over 24 years, those two-week head starts add up to $866.",
          "That gap is the whole price of doing it yourself, and it is negative: the program version costs fees, the DIY version costs nothing. The gap also grows with the rate and the balance — on a larger loan at a higher rate, the timing advantage is worth more — but it never grows large enough to justify paying for a program. A $300 setup fee wipes out a third of the timing advantage on the example loan before the first payment is made.",
          "The practical conclusion: pick the method you will keep doing. A true biweekly debit suits people paid every two weeks, because the payment lands on payday. A monthly extra suits people paid monthly. The $866 difference over 24 years is $36 a year — less than the cost of a single missed payment's late fee. Consistency is the saving; the schedule is just the delivery mechanism."
        ],
        "table": {
          "head": [
            "Method",
            "Payoff",
            "Interest saved"
          ],
          "rows": [
            [
              "Monthly, no extra",
              "30 years",
              "$0"
            ],
            [
              "One extra payment a year (DIY monthly)",
              "24 years 2 months",
              "$87,256"
            ],
            [
              "True biweekly",
              "24 years 2 months",
              "$88,122"
            ]
          ]
        }
      },
      {
        "heading": "What biweekly does to your equity timeline",
        "paragraphs": [
          "Biweekly's other payoff is equity, and it arrives sooner than the interest saving suggests. After five years on the $300,000 loan, the monthly schedule leaves a balance of $280,833; the biweekly schedule leaves $269,614 — $11,219 more equity from the same house. After ten years the gap is $26,753: $254,328 against $227,575.",
          "That equity has uses before the loan is paid off. On a conventional loan, PMI can be requested off at 80% loan-to-value and must end automatically at 78% — biweekly reaches those marks years sooner. On a $350,000 home with a $300,000 loan, 80% loan-to-value is a $280,000 balance: the monthly schedule reaches it in month 63, the biweekly schedule in month 42 — almost two years sooner, and every month of PMI saved is money back.",
          "Equity also matters when life changes the plan. A job move, a divorce, or a growing family can force a sale years before the loan would have been paid off, and the biweekly borrower's extra equity is cash at closing. The interest saving is the headline; the equity is the insurance."
        ],
        "table": {
          "head": [
            "",
            "Monthly",
            "Biweekly"
          ],
          "rows": [
            [
              "Balance after 5 years",
              "$280,833",
              "$269,614"
            ],
            [
              "Balance after 10 years",
              "$254,328",
              "$227,575"
            ],
            [
              "Months to a $280,000 balance",
              "63",
              "42"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Ask whether half-payments are applied immediately or held — held payments wipe out the benefit.",
          "Ask whether the plan is free — any setup, annual, or per-payment fee means walk away.",
          "Get the answers in writing, and check the next statement to confirm the half-payment reduced the balance.",
          "If the servicer holds payments or charges a fee, use the DIY monthly extra instead."
        ],
        "heading": "Setting it up with your servicer",
        "paragraphs": [
          "Setting up biweekly takes one phone call — but the call has to ask the right questions. First: does your servicer offer a biweekly plan, and is it free? Some do, at no charge. Second: are half-payments applied to the loan the day they arrive, or held until a full payment accumulates? Held payments deliver only the once-a-year extra payment and none of the biweekly timing benefit — the exact practice the CFPB sued over in 2015. Third: is there a prepayment penalty on your loan? Federal rules limit them tightly and most modern mortgages have none, but the note is the authority.",
          "Get the answers in writing — an email from the servicer, or a note of the call with the representative's name and the date. Then check the first statement after you start: the balance should fall by the half-payment minus that period's interest, and the next statement should show the same. If the half-payments sit in a suspense or unapplied-funds account instead, the servicer is holding them, and the DIY monthly version is the better route.",
          "If your servicer charges for biweekly, or does not offer it at all, the DIY version needs no permission: add one-twelfth of your principal-and-interest payment to each monthly payment, marked as extra principal. That is a right you already have on any mortgage without a prepayment penalty, and no program can add anything to it."
        ]
      },
      {
        "heading": "Biweekly vs refinancing to a 15-year term",
        "paragraphs": [
          "The other way to cut a 30-year loan down is refinancing into a 15-year term, and the comparison shows what biweekly is really worth. On the $300,000 loan at 6.5%, a 15-year refinance sets the payment at $2,613.32 and total interest at $170,398 — $124,114 less interest than the biweekly schedule's $294,512. The 15-year term wins on total cost by a wide margin.",
          "But the 15-year payment is $717.12 more every month than the biweekly average of $1,896.20, and it is not optional. A job loss, a medical bill, or a broken furnace does not pause a 15-year payment; a biweekly borrower in the same spot can drop back to the regular monthly payment and lose nothing but the extra principal for those months. Biweekly's saving is smaller because its commitment is smaller — that is the trade, and for many households it is the right one.",
          "Refinancing also costs money: roughly 0.5–1.5% of the loan in closing costs, $1,500 to $4,500 on a $300,000 loan, which has to be repaid by the interest saving before the refinance pays. And refinancing restarts the amortization clock — the new loan's first years are mostly interest again. The 15-year refinance wins when the higher payment fits comfortably and you will stay put; biweekly wins when flexibility matters more than the last $124,000 of interest. Run both in the refinance calculator before you choose."
        ]
      },
      {
        "heading": "The two three-paycheck months",
        "paragraphs": [
          "Biweekly fits one pay schedule especially well: workers paid every two weeks. A biweekly paycheck means two months a year have three paychecks instead of two — and those are the months the third half-payment lands. The extra payment comes out of a month with extra income, which is why biweekly feels painless for biweekly-paid workers and why the habit survives.",
          "That alignment is the real reason biweekly programs sell. The arithmetic — one extra payment a year — can be copied monthly for free, as this guide shows. What the monthly copy cannot reproduce is the cash-flow fit: a monthly extra comes out of every month equally, including the tight ones, while the biweekly extra lands in the two months with a third paycheck.",
          "If you are paid monthly, the fit reverses: the DIY monthly extra matches your pay cycle, and a biweekly debit can land awkwardly against a monthly budget. Match the method to the paycheck, not to the marketing. The saving is in the extra payment, and the extra payment is worth nothing if the schedule that delivers it is one you abandon in month three."
        ]
      },
      {
        "heading": "Biweekly on an adjustable-rate mortgage",
        "paragraphs": [
          "Biweekly works on an adjustable-rate mortgage too, and it does a second job there. The extra principal reduces the balance just as it does on a fixed-rate loan — and when the rate adjusts, the lender recalculates the payment on the remaining balance over the remaining term. A lower balance means a lower payment after the adjustment, so biweekly softens the payment shock of a rate rise as well as saving interest.",
          "The saving itself moves with the rate. If the rate falls after adjustment, there is less interest for the extra principal to remove, and the biweekly saving shrinks. If the rate rises, the saving grows — the same extra dollar removes more interest at 8% than at 5%. That makes biweekly more valuable on an ARM in a rising-rate environment and less valuable in a falling one, though the payment-softening effect applies either way.",
          "One caution: on an ARM, the extra principal does not change the adjustment caps or the adjustment dates. It lowers the balance the new rate applies to, nothing more. If the rate jumps to the cap, the payment still jumps — just from a smaller balance. Biweekly is a cushion against adjustment shock, not protection from it."
        ]
      },
      {
        "heading": "What to do instead if biweekly does not fit",
        "paragraphs": [
          "Biweekly is a good use of spare cash, but it is not the first use. The order that matters: an emergency fund of three to six months of expenses comes first, because prepaid mortgage money is locked in the house until you sell or refinance, and a borrower with no cash reserve who prepays the mortgage is one broken furnace away from a credit card at 20%.",
          "High-interest debt comes second. A dollar against a credit card at 20% saves three times the interest of a dollar against a 6.5% mortgage, and it frees up monthly cash flow immediately. An employer 401(k) match comes before extra mortgage payments too — a dollar matched is a 100% return, and no mortgage rate competes with it.",
          "Only after those three does the choice narrow to extra mortgage principal versus investing. Prepaying earns a guaranteed return equal to your mortgage rate; investing offers a higher expected return with real risk. At 6.5% or above, the guaranteed return is strong enough that prepaying is a reasonable choice. Below 4%, investing usually wins. Either way, the extra payment should come from money left over after the fund, the match, and the expensive debt — not from money those three still need."
        ]
      }
    ],
    "seoTitle": "How Biweekly Mortgage Payments Work: Savings & Fees",
    "slug": "how-biweekly-mortgage-payments-work",
    "sources": [
      {
        "label": "CFPB — Enforcement Action: Nationwide Biweekly Administration",
        "url": "https://www.consumerfinance.gov/enforcement/actions/nationwide-biweekly-administration/"
      },
      {
        "label": "CFPB — Mortgage key terms (bi-weekly payment)",
        "url": "https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms/"
      }
    ],
    "title": "How Biweekly Mortgage Payments Work (and the Free Way to Copy Them)",
    "type": "How-to",
    "updated": "2026-11-19"
  },
  {
    "cornerstone": true,
    "description": "Buy your first home step by step: affordability, down payment, pre-approval, offers, inspection, and closing — with worked examples on a $350,000 home.",
    "faqs": [
      {
        "answer": "More than the down payment. On a $350,000 home with 10% down, expect $35,000 for the down payment plus closing costs of roughly $6,300 to $15,750 (the CFPB's typical 2% to 5% of the loan), plus moving costs and an emergency reserve. A realistic cash target is $45,000 to $55,000, and you should still have savings left over after closing.",
        "question": "How much money do I need to buy my first home?"
      },
      {
        "answer": "There is no single minimum. FHA loans accept a 580 score with 3.5% down, or 500 to 579 with 10% down. Conventional lenders commonly look for 620 or higher. Scores in the mid-700s and above get the best rates. Whatever your score, check your credit reports for errors months before you apply — a correction can change your rate.",
        "question": "What credit score do I need to buy a house?"
      },
      {
        "answer": "It depends on the loan: 3% is $10,500 on many conventional first-time buyer programs, 3.5% is $12,250 on an FHA loan, 10% is $35,000, and 20% is $70,000. VA and USDA loans offer 0% down for eligible buyers. Less than 20% down on a conventional loan adds PMI; on FHA it adds MIP.",
        "question": "How much is the down payment on a $350,000 house?"
      },
      {
        "answer": "The search is the variable part — weeks or months depending on your market. Once your offer is accepted, closing usually takes 30 to 45 days while the inspection, appraisal, and underwriting run. The full timeline from first pre-approval to keys is often two to four months for a first-time buyer.",
        "question": "How long does it take to buy a house?"
      },
      {
        "answer": "Neither is always right. Buying with 3% down gets you in sooner but adds PMI and a larger loan balance, so the monthly payment is higher. Waiting for 20% means years of rent while you save, and home prices may rise meanwhile. Compare the PMI cost against your rent and timeline, and run both scenarios through a mortgage payment calculator before deciding.",
        "question": "Should I buy with 3% down or wait until I have 20%?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/how-to-buy-your-first-home.jpg",
    "imageAlt": "Flat illustration of a small house with a large key and a path of stepping stones leading to the front door",
    "inlineImage": "/images/how-to-buy-your-first-home-inline.jpg",
    "inlineImageAlt": "Flat illustration of a house under a magnifying glass beside stacks of coins and a checklist",
    "intro": "Buying your first home follows a clear sequence: work out what you can afford, save the down payment and closing costs, get your credit and debts in order, get pre-approved, then shop, offer, inspect, and close. This guide walks through each step with real numbers, using a $350,000 home as the running example.",
    "published": "2026-09-19",
    "readMinutes": 18,
    "relatedTools": [
      {
        "name": "Home Affordability Calculator",
        "url": "/real-estate/home-affordability-calculator"
      },
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      },
      {
        "name": "Down Payment Calculator",
        "url": "/real-estate/down-payment-calculator"
      },
      {
        "name": "Closing Cost Calculator",
        "url": "/real-estate/closing-cost-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "Principal and interest — the loan itself, fixed for the life of a fixed-rate mortgage.",
          "Property taxes — set by your county, reassessed over time, and usually paid through escrow.",
          "Homeowners insurance — required by your lender and paid through escrow.",
          "Mortgage insurance — PMI on a conventional loan under 20% down, or MIP on an FHA loan.",
          "HOA dues — separate from the mortgage, and they count toward your DTI."
        ],
        "heading": "Work out what you can afford first",
        "paragraphs": [
          "Start with the monthly payment, not the listing price. Lenders size your loan from your gross monthly income and your existing debts, and the number they approve is a ceiling, not a recommendation. Your own budget decides what is comfortable.",
          "Two rules of thumb frame the answer. The 28/36 rule says housing costs should stay under 28% of gross monthly income, and all debts including housing under 36%. Lenders also use the debt-to-income ratio (DTI): your total monthly debt payments divided by gross monthly income. The guideposts differ by loan type — Fannie Mae looks for 36%, accepts up to 45%, and allows 50% with strong compensating factors; FHA uses 31% front-end and 43% back-end; VA uses 41%.",
          "Take a household earning $90,000 a year, or $7,500 a month before tax. The 28% rule caps housing at $2,100 a month; the 36% rule caps all debts at $2,700. That is the budget frame — now see what a real payment looks like.",
          "That $2,619 is 34.9% of the $7,500 gross income — above the 28% rule of thumb, which is a warning sign, not a verdict. Add a $400 car payment and a $200 student loan and total debts reach $3,219 a month, a 42.9% back-end DTI — inside Fannie Mae's 45% guidepost but with little slack. This is why the payment, not the price, is the real affordability test.",
          "Run your own numbers before you browse listings. The Home Affordability Calculator turns your income and debts into a price range, and the Mortgage Payment Calculator breaks any home into its monthly parts. Both are estimates for planning, not loan approval — your lender's underwriting decides the final number."
        ],
        "table": {
          "head": [
            "Monthly cost",
            "How it is figured",
            "Amount"
          ],
          "rows": [
            [
              "Principal and interest",
              "$315,000 loan at an example 6.5% fixed rate, 30 years",
              "$1,991"
            ],
            [
              "Private mortgage insurance",
              "Example 0.6% of the loan per year, because the down payment is under 20%",
              "$158"
            ],
            [
              "Property taxes",
              "Example 1.1% of the home value per year",
              "$321"
            ],
            [
              "Homeowners insurance",
              "Example $1,800 per year",
              "$150"
            ],
            [
              "Total monthly payment",
              "On a $350,000 home with 10% down",
              "$2,619"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Down payment — due at closing, minus any earnest money already paid.",
          "Closing costs — lender fees, title, appraisal, recording, and prepaid taxes and insurance.",
          "Earnest money — typically 1% to 2% of the price, paid when your offer is accepted and credited at closing.",
          "Reserves — some lenders ask to see one or two months of payments left in the bank after closing; even when they don't, keep an emergency fund.",
          "Moving and setup — movers, utility deposits, locks, and the first repairs."
        ],
        "heading": "Save the down payment — and the cash to close",
        "paragraphs": [
          "The down payment is the largest single check most first-time buyers write, but it is not the only cash you need. Budget for the down payment, the closing costs, and a reserve that stays in your account after closing.",
          "A 20% down payment — $70,000 on a $350,000 home — avoids private mortgage insurance on a conventional loan, but it is not required. Most first-time buyers put down far less and pay PMI for a few years instead. The trade-off is real: less cash up front against a higher monthly payment.",
          "Closing costs sit on top of the down payment. The CFPB puts them typically at 2% to 5% of the loan amount. On the $315,000 loan in our example, that is $6,300 to $15,750; at a 3% midpoint the bill is $9,450. Add that to a 10% down payment and the cash to close is $44,450 — before moving costs and the first month of ownership.",
          "Work backward from that number. Saving $1,500 a month reaches $44,450 in about 30 months; $2,000 a month reaches it in about 22 months. Keep the fund in a high-yield savings account, not the stock market: you need the money on a fixed date, and a market dip the month before closing is a problem you cannot wait out.",
          "Check for help before you assume you are on your own. Most states run down payment assistance programs — grants or low-interest second loans for first-time buyers — and HUD-approved housing counselors can walk you through them free of charge. A grant worth a few thousand dollars is common; it rarely covers the whole down payment, so treat it as a boost, not a plan."
        ],
        "table": {
          "head": [
            "Loan type",
            "Minimum down payment",
            "Cash on a $350,000 home"
          ],
          "rows": [
            [
              "Conventional",
              "3% for many first-time buyer programs",
              "$10,500"
            ],
            [
              "FHA",
              "3.5% with a 580+ credit score; 10% at 500–579",
              "$12,250"
            ],
            [
              "VA",
              "0% for eligible veterans and servicemembers",
              "$0"
            ],
            [
              "USDA",
              "0% in eligible rural areas, with income limits",
              "$0"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Check all three credit reports and dispute any errors.",
          "Pay down revolving balances; aim below 30% utilization.",
          "Do not open new credit cards or loans.",
          "Keep every pay stub, bank statement, and tax return where you can find it.",
          "Avoid large, undocumented cash deposits — underwriters ask about them."
        ],
        "heading": "Get your credit and debt-to-income ratio in shape",
        "paragraphs": [
          "Your credit score sets the interest rate you are offered and, in some cases, whether you qualify at all. FHA loans require a 580 score for the 3.5% down payment; scores of 500 to 579 can still qualify with 10% down. Conventional lenders commonly look for 620 or higher, and the best rates go to scores in the mid-700s and above.",
          "Pull your reports from the three bureaus at annualcreditreport.com — the federally authorized source — and read them line by line. A wrong balance, an account that is not yours, or a late payment that was actually on time can cost you real money every month. Dispute errors with the bureau in writing; corrections typically take about 30 days, so start months before you apply.",
          "The fastest legitimate improvements are boring: pay every bill on time, pay down credit card balances below 30% of their limits, and do not open new credit or close old cards while you are preparing to buy. A new car loan in the month before your application raises your DTI and can change your approval.",
          "DTI is the second gate. Lenders compare your monthly debts to your gross monthly income, and the limits depend on the loan. Fannie Mae's guideposts run 36% to 45%, reaching 50% with compensating factors such as strong reserves or a high credit score. FHA uses 31% for housing and 43% overall. VA uses a single 41% back-end guidepost, with flexibility for residual income.",
          "On our example household — $7,500 gross monthly income, a $2,619 housing payment, $400 car payment, $200 student loan — the front-end ratio is 34.9% and the back-end ratio is 42.9%. That passes Fannie Mae's 45% guidepost and FHA's 43% ceiling, and sits just above VA's 41% guidepost. One paid-off car loan would drop the back-end ratio to 37.6% and widen the margin considerably."
        ]
      },
      {
        "heading": "Choose the loan type that fits",
        "paragraphs": [
          "Four loan types cover nearly every first-time buyer. They differ in down payment, mortgage insurance, and who qualifies — and the cheapest headline rate is not always the cheapest loan once insurance is counted.",
          "Conventional loans follow Fannie Mae and Freddie Mac guidelines. In 2026 the conforming loan limit is $832,750 for a one-unit home in most counties, rising to $1,249,125 in high-cost areas. PMI applies below 20% down, but federal law lets you request cancellation at 80% loan-to-value and requires automatic cancellation at 78%.",
          "FHA loans are insured by the Federal Housing Administration and accept lower credit scores. The 2026 FHA loan-limit floor is $541,287, with a $1,249,125 ceiling in high-cost counties. The cost is mortgage insurance: 1.75% upfront — $5,911 on the $337,750 base loan of a $350,000 home with 3.5% down, usually financed into the loan — plus 0.55% a year when the down payment is under 5% (0.50% at 5% or more). With less than 10% down, that annual premium lasts the life of the loan; with 10% or more, it ends after 11 years.",
          "VA loans, for eligible veterans, active-duty servicemembers, and surviving spouses, need no down payment and charge no monthly mortgage insurance. They carry a one-time funding fee instead: 2.15% of the loan for first-time use with less than 5% down, 1.5% with 5% to under 10% down, and 1.25% at 10% or more. On a $350,000 home with no down payment, the first-use fee is $7,525, usually financed into the loan. Veterans with a service-connected disability are exempt from the fee.",
          "USDA loans offer 0% down in eligible rural and suburban areas, for households under the county income limit. They charge a guarantee fee instead of mortgage insurance: 1% upfront, usually financed into the loan, plus 0.35% a year paid monthly, for the life of the loan. The fees are lower than FHA's, but the address must fall inside USDA's eligibility map.",
          "The same $350,000 home costs a different amount each month under each loan. At an example 6.5% fixed rate over 30 years, with the same example taxes and insurance: the conventional loan with 10% down totals about $2,619 a month; the FHA loan with 3.5% down totals about $2,798 a month, because the financed upfront premium raises the loan balance and the annual MIP adds about $155; the VA loan with no money down totals about $2,731 a month, with no mortgage insurance but a larger loan balance. The right choice depends on your cash, your credit, and how long you plan to stay — not on the monthly payment alone."
        ],
        "table": {
          "head": [
            "Loan type",
            "Minimum down",
            "Mortgage insurance",
            "Best for"
          ],
          "rows": [
            [
              "Conventional",
              "3%",
              "PMI until 20% equity; drops automatically at 78% loan-to-value",
              "Buyers with good credit who want PMI to end"
            ],
            [
              "FHA",
              "3.5% (580+ score)",
              "1.75% upfront plus 0.55% a year; lasts the life of the loan under 10% down",
              "Buyers with lower scores or small down payments"
            ],
            [
              "VA",
              "0%",
              "None; one-time funding fee of 2.15% with less than 5% down",
              "Eligible veterans, servicemembers, and surviving spouses"
            ],
            [
              "USDA",
              "0%",
              "1% upfront guarantee fee plus 0.35% a year",
              "Buyers in eligible rural areas with modest incomes"
            ]
          ]
        }
      },
      {
        "heading": "Get pre-approved, then shop lenders",
        "paragraphs": [
          "Pre-approval is a lender's conditional commitment, based on verified income, assets, credit, and debts. It is stronger than pre-qualification, which is an estimate from numbers you state yourself. Sellers and agents take pre-approval seriously; in a competitive market, offers without one are often ignored.",
          "Expect the lender to ask for pay stubs, W-2s or tax returns, bank statements, and identification. Self-employed buyers should expect two years of tax returns and possibly profit-and-loss statements. Gather the documents before you apply — a complete file moves faster and the pre-approval letter is more reliable.",
          "Apply with at least three lenders and compare the Loan Estimates side by side. Federal rules require each lender to send a Loan Estimate within three business days of your application, in a standard format that makes comparison straightforward. Compare the interest rate, the lender fees in Section A, and the estimated cash to close — not just the monthly payment.",
          "Rate shopping does not damage your credit the way people fear. Credit scoring models treat multiple mortgage inquiries within a short window — typically 14 to 45 days — as a single inquiry, so you can compare lenders without a penalty for each application. Keep the shopping inside one two-week stretch to be safe.",
          "A pre-approval letter is usually good for 60 to 90 days and states a maximum loan amount. Treat that maximum as a ceiling, not a target: the lender does not know your childcare costs, your savings goals, or what a comfortable payment feels like. And once you are pre-approved, freeze your finances — no new debt, no job change, no large purchases until after closing."
        ]
      },
      {
        "bullets": [
          "Roof, HVAC, and water heater ages — replacements run into the thousands.",
          "Water pressure, drainage, and any signs of water damage or mold.",
          "Natural light, storage, and whether the layout fits your daily life.",
          "The street, the commute, and the neighborhood at different times of day.",
          "Flood risk, wildfire risk, and any HOA rules or fees."
        ],
        "heading": "Find a buyer's agent and start looking",
        "paragraphs": [
          "A buyer's agent represents you, not the seller. They pull comparable sales, write the offer, negotiate, and coordinate the inspection, appraisal, and closing. Interview two or three agents; ask how many first-time buyers they have represented in your price range and how they handle multiple-offer situations.",
          "Since 2024, buyer-agent compensation is negotiated between you and your agent rather than set by the listing, and you will typically sign a written buyer agreement before touring homes. Ask directly how your agent is paid and what happens if the seller offers no compensation — the answer should be in writing before you start.",
          "Tour with a checklist, not just your feelings. A home that photographs well can hide a 25-year-old roof, a failing water heater, or a basement that floods in spring. Ask the age of the roof, HVAC system, and water heater; run the taps; open the windows; visit the street at rush hour and again at night.",
          "Check the property's history too: how long it has been listed, whether the price has dropped, and what comparable homes nearby actually sold for. Days on market and price cuts are negotiating information, and your agent should bring them to every showing."
        ]
      },
      {
        "heading": "Make an offer that can win without overpaying",
        "paragraphs": [
          "An offer is a contract proposal, not just a price. Your agent drafts it with the price, the earnest money deposit, the contingencies, the closing date, and anything you ask the seller to include or cover. Every term is negotiable; the price is only the most visible one.",
          "Earnest money — typically 1% to 2% of the price — shows the seller you are serious. It is held in escrow and credited toward your down payment and closing costs if the deal closes. If you walk away for a reason your contingencies cover, you get it back; if you walk away outside them, you may lose it.",
          "Contingencies are your exit ramps. The inspection contingency lets you renegotiate or withdraw after the inspection. The appraisal contingency protects you if the home appraises below the price. The financing contingency covers you if the loan falls through. Waiving a contingency strengthens an offer in a bidding war — and removes a protection you may need. Never waive the inspection contingency on a home you have not had inspected.",
          "Price from comparable sales, not from the listing price. Your agent should show you recent sales of similar homes nearby, adjusted for size, condition, and features. In a multiple-offer situation, an escalation clause — offering to beat the highest competing bid by a set amount up to a cap — can win without paying more than the cap you chose in advance.",
          "Set your walk-away price before you offer, in writing, and hold it. The most expensive mistake first-time buyers make is falling in love with a house and chasing it past what the numbers support. Another house will come on the market; an overpayment stays in your mortgage for 30 years."
        ]
      },
      {
        "heading": "Inspection, appraisal, and underwriting",
        "paragraphs": [
          "Once your offer is accepted, three processes run in parallel: the inspection, the appraisal, and the lender's underwriting. The period between contract and closing is usually 30 to 45 days, and most of the delays come from paperwork, not problems.",
          "Hire your own home inspector — one you choose, not one the seller recommends. A standard inspection typically costs a few hundred dollars and covers the roof, structure, plumbing, electrical, HVAC, and appliances. Attend it if you can: the inspector's running commentary tells you more than the written report, and you will learn where the shutoff valves and breaker panel are.",
          "No inspection comes back clean. Every home has a list of minor issues; what matters is the expensive kind — roof, foundation, sewer line, electrical panel. For major findings, you can ask the seller to repair, ask for a credit at closing, or walk away if your inspection contingency allows it. Get a contractor's estimate before you negotiate a credit, so you know what the fix actually costs.",
          "The appraisal protects the lender: an independent appraiser confirms the home is worth at least the loan amount. If it appraises below the agreed price, you have options — renegotiate the price, pay the difference in cash, or walk away under the appraisal contingency. A low appraisal is unwelcome news, but it also stops you from borrowing more than the home is worth.",
          "Underwriting is the lender verifying everything: employment, income, assets, debts, and the property itself. Expect requests for documents you already sent, and answer them the same day. Do not open new credit, close accounts, change jobs, or move large sums between accounts during underwriting — any of those can restart the review or change your approval."
        ]
      },
      {
        "heading": "Closing day: what happens and what it costs",
        "paragraphs": [
          "At least three business days before closing, your lender must send the Closing Disclosure — the final, itemized statement of your loan terms and costs. Compare it line by line with the Loan Estimate you received when you applied. Most fees cannot change; if a number moved, ask why before you sign anything.",
          "Those figures are an illustrative example, not a quote: your actual costs depend on your lender, your state, and the loan. Title insurance and transfer taxes vary widely by state, and some lenders charge no origination fee at all. Your Loan Estimate is the only reliable preview of your own costs.",
          "Add the closing costs to the down payment, then subtract the earnest money you already paid. On our example: $35,000 down plus $9,450 in closing costs is $44,450 in total cash; with $3,500 of earnest money already in escrow, $40,950 is due at closing. The Closing Disclosure shows the exact figure — bring it as a cashier's check or a wire transfer, never as a personal check.",
          "Protect the wire. Real estate wire fraud starts with a spoofed email carrying fake wiring instructions. Call your title company at a number you already have — not one from an email — to confirm the instructions before you send money. A five-minute phone call is the entire defense.",
          "At the signing table you will initial and sign a thick stack of documents: the promissory note, the mortgage or deed of trust, and the settlement statement. Read the Closing Disclosure figures once more before you sign, confirm the loan amount, rate, and monthly payment match what you agreed, and then collect the keys. The deed records with the county, usually within days, and the home is yours."
        ],
        "table": {
          "head": [
            "Closing cost",
            "What it covers",
            "Example amount"
          ],
          "rows": [
            [
              "Origination fee",
              "The lender's charge for making the loan (example 1% of the loan)",
              "$3,150"
            ],
            [
              "Appraisal",
              "Independent valuation ordered by the lender",
              "$500"
            ],
            [
              "Title and settlement",
              "Title search, title insurance, and the closing agent's fee",
              "$1,800"
            ],
            [
              "Recording and transfer",
              "Government fees to record the deed",
              "$250"
            ],
            [
              "Prepaids and escrow",
              "Prepaid interest, taxes, and insurance to fund escrow",
              "$3,750"
            ],
            [
              "Total closing costs",
              "About 3% of the loan — inside the CFPB's typical 2% to 5% range",
              "$9,450"
            ]
          ]
        }
      },
      {
        "heading": "The first year of ownership",
        "paragraphs": [
          "The first mortgage payment is usually due the month after closing, and it goes into escrow for taxes and insurance as well as principal and interest. Expect the escrow portion to adjust after the first year as the county reassesses taxes and the insurer reprices the policy — a higher payment in year two is usually escrow catching up, not a rate change.",
          "Budget for maintenance from month one. A common rule of thumb is 1% of the home's value per year — $3,500 a year, or about $292 a month, on a $350,000 home. Older homes and harsh climates run higher. The first year is also when deferred problems surface: the roof leak that only shows in heavy rain, the appliance that was already on its last legs.",
          "Track your equity for the PMI decision. On a conventional loan you can ask your lender to cancel PMI once your loan balance falls to 80% of the home's original value, and the lender must cancel it automatically at 78%. Rising home values help: a new appraisal showing 20% equity can also support a cancellation request, though your lender's rules and any waiting period apply.",
          "File for any homestead exemption your state offers — it can lower your property tax bill — and review your homeowners insurance every year, not just at renewal. Keep your closing documents, inspection report, and receipts for major improvements in one place; improvement records matter when you eventually sell.",
          "A payment that leaves no margin turns every repair into a crisis. If the numbers in this guide feel tight on your income, a smaller home or a longer savings runway is a better answer than a stretched payment. These figures are estimates for planning, not lending advice; your lender and a HUD-approved counselor can check them against your real file."
        ]
      }
    ],
    "seoTitle": "How to Buy Your First Home, Step by Step",
    "slug": "how-to-buy-your-first-home",
    "sources": [
      {
        "label": "Consumer Financial Protection Bureau — Buying a house",
        "url": "https://www.consumerfinance.gov/owning-a-home/"
      },
      {
        "label": "U.S. Department of Housing and Urban Development — Buying a home",
        "url": "https://www.hud.gov/topics/buying_a_home"
      },
      {
        "label": "U.S. Department of Veterans Affairs — VA home loans",
        "url": "https://www.va.gov/housing-assistance/home-loans/"
      },
      {
        "label": "Federal Housing Finance Agency — Conforming loan limit values for 2026",
        "url": "https://www.fhfa.gov/news/news-release/fhfa-announces-conforming-loan-limit-values-for-2026"
      }
    ],
    "title": "How to Buy Your First Home, Step by Step",
    "type": "How-to",
    "updated": "2026-09-19"
  },
  {
    "cornerstone": false,
    "description": "Fixed vs adjustable-rate mortgages compared with real numbers: how ARMs adjust, what the caps allow, and a $300,000 worked example of both options side by side.",
    "faqs": [
      {
        "answer": "The first number is the years the starting rate stays fixed: five. The second is how often the rate can change after that, in months: every six months. So a 5/6 ARM holds its rate for five years, then adjusts every six months for the rest of the term. Older ARMs used a second number in years, so a 5/1 ARM adjusted once a year, but conforming ARMs today use the six-month schedule.",
        "question": "What does 5/6 ARM mean?"
      },
      {
        "answer": "Yes, if the index falls. At each adjustment the new rate is the index plus your margin, so a lower index means a lower rate and a lower payment. There is a floor, though: on a standard conforming ARM the rate can never fall below the margin. And the payment is recalculated on the remaining balance and term, so a small rate drop late in the loan moves the payment only slightly.",
        "question": "Can my ARM payment go down?"
      },
      {
        "answer": "No higher than the lifetime cap in your loan agreement. On Fannie Mae's standard plans the lifetime cap is 5 percentage points above your starting rate, so a 5/6 ARM starting at 6% can never exceed 11%. The first-change and later-change caps slow the climb: a 5/6 ARM can rise at most 2 points at the first adjustment and 1 point at each later one.",
        "question": "How high can my ARM rate go?"
      },
      {
        "answer": "It is the more predictable choice, not always the cheaper one. A fixed rate guarantees your payment for the full term, which is safer if you will keep the loan for many years. But if you will sell or refinance before an ARM's first adjustment, the ARM's lower starting rate saves real money with no adjustment risk. Safety depends on your timeline, not on the loan type alone.",
        "question": "Is a fixed-rate mortgage always the safer choice?"
      },
      {
        "answer": "Usually, yes, and many ARM borrowers plan to. But refinancing is a new loan application: it depends on your income, credit score, and home value at the time, and on market rates being attractive. If rates have risen or your home has lost value, the refinance may cost more than the ARM's adjusted rate or may not be available. Never take an ARM you can only afford if the refinance works out.",
        "question": "Can I refinance out of an ARM before it adjusts?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/fixed-vs-adjustable-rate-mortgages.jpg",
    "imageAlt": "Flat vector illustration of a house with two diverging paths, one straight and one winding, on a cream background",
    "inlineImage": "/images/fixed-vs-adjustable-rate-mortgages-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a line chart rising and falling over a house silhouette on a cream background",
    "intro": "A fixed-rate mortgage keeps the same interest rate and principal-and-interest payment for the term. An adjustable-rate mortgage (ARM) starts lower, stays fixed for a few years, then adjusts with the market, and your payment can rise or fall. The choice turns on how long you will keep the loan and whether you could afford the ARM at its highest payment.",
    "published": "2026-09-23",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      },
      {
        "name": "Mortgage Amortization",
        "url": "/real-estate/mortgage-amortization-calculator"
      }
    ],
    "sections": [
      {
        "heading": "How a fixed-rate mortgage works",
        "paragraphs": [
          "A fixed-rate mortgage sets the interest rate at closing and never changes it. On a 30-year loan, the principal-and-interest payment in month 360 is the same as in month 1. That certainty is the whole point of the product: your largest monthly bill becomes a known number you can plan around for decades.",
          "The most common term is 30 years, and 15 years is the main alternative. A 15-year loan carries a much higher monthly payment but far less total interest, because the balance falls faster and the rate is usually lower. Either way, the mechanics are the same: each payment covers that month's interest plus a slice of principal, and the interest slice shrinks as the balance falls.",
          "The term choice is a second decision inside the fixed-rate option, and the numbers are stark. On the same $300,000 loan at an illustrative 7.00%, a 15-year term costs $2,696.48 a month and $185,367 in total interest; the 30-year term costs $1,995.91 a month and $418,527 in interest. The shorter term saves $233,159 in interest for a payment $700.58 higher. That trade only works if the higher payment still leaves room in the budget.",
          "Fixed applies to principal and interest only. Your total monthly payment can still change, because property taxes, homeowners insurance, and any homeowners association dues sit outside the rate lock. If your lender collects those costs in escrow, the escrow part of your payment rises or falls with the tax bill and the insurance premium. The principal-and-interest line is the part that never moves.",
          "The trade-off is that a fixed rate cuts both ways. If market rates fall after you close, your rate stays where it is; the only way to capture a lower rate is to refinance, which means a new application, new closing costs, and no guarantee of approval. If rates rise, you keep the lower rate while new borrowers pay more. You are buying certainty, and the price is giving up the chance of a lower rate without refinancing."
        ]
      },
      {
        "heading": "How an adjustable-rate mortgage works",
        "paragraphs": [
          "An adjustable-rate mortgage starts with a fixed rate for a set number of years, then adjusts at regular intervals for the rest of the term. The name tells you the schedule: in a 5/6 ARM, the rate is fixed for the first five years and can then change every six months. Common initial periods are 3, 5, 7, and 10 years. Older ARMs adjusted once a year and were written as 5/1 or 7/1; the conforming ARMs Fannie Mae buys today adjust every six months.",
          "Once the fixed period ends, each new rate follows the same formula: index plus margin, subject to the loan's caps. The index is a published market rate that moves with the economy. For conforming ARMs, Fannie Mae's standard plans use the 30-day average of SOFR, the Secured Overnight Financing Rate published by the Federal Reserve Bank of New York. The margin is a fixed number of percentage points the lender adds to the index, set when you take out the loan and unchanged for its life.",
          "Add the two together and you get the fully indexed rate: what your rate would be if it adjusted today. If the 30-day average SOFR is 4% and your margin is 2.75 percentage points, the fully indexed rate is 6.75%. Your starting rate is often lower than the fully indexed rate, which is why the first adjustment can raise your payment even if market rates have not moved.",
          "At each adjustment, the lender recalculates your payment over the remaining term at the new rate. A higher rate means a higher payment; a lower rate means a lower one, though the rate can never fall below the margin on a standard conforming ARM. Many ARMs start below the comparable fixed rate, so the early years cost less. The question the rest of this guide answers is what happens after that."
        ]
      },
      {
        "heading": "Caps: the limits on how far an ARM can move",
        "paragraphs": [
          "Caps are the guardrails. Every ARM sets three limits: how much the rate can change at the first adjustment, how much it can change at each later adjustment, and how far it can rise above the starting rate over the life of the loan. They are written as three numbers, such as 2/1/5: up to 2 percentage points at the first change, up to 1 point at each later change, and up to 5 points above the starting rate in total.",
          "Fannie Mae's standard plans set the caps by fixed period. The 3/6 and 5/6 ARMs use 2/1/5 caps; the 7/6 and 10/6 ARMs allow a 5-point jump at the first adjustment, with the same 1-point later cap and the same 5-point lifetime cap. The longer fixed periods get the bigger first-change cap because the lender has carried the rate risk longer. On every standard plan, the lifetime ceiling is 5 points above your starting rate, and the rate can never fall below the margin.",
          "Caps limit the rate, not the payment. Your payment is recalculated from the remaining balance and the remaining term at each adjustment, so a rate rise near the end of the loan moves the payment less than the same rise early on. Caps also do not limit how fast the rate can rise across several adjustments: a 5/6 ARM can reach its lifetime cap within two years of the fixed period ending if the index stays high. The worked example below shows exactly that path."
        ],
        "table": {
          "head": [
            "ARM plan",
            "Fixed period",
            "Adjusts",
            "Caps (first / later / lifetime)"
          ],
          "rows": [
            [
              "3/6 ARM",
              "3 years",
              "Every 6 months",
              "2 / 1 / 5"
            ],
            [
              "5/6 ARM",
              "5 years",
              "Every 6 months",
              "2 / 1 / 5"
            ],
            [
              "7/6 ARM",
              "7 years",
              "Every 6 months",
              "5 / 1 / 5"
            ],
            [
              "10/6 ARM",
              "10 years",
              "Every 6 months",
              "5 / 1 / 5"
            ]
          ]
        }
      },
      {
        "heading": "Fixed vs ARM at a glance",
        "paragraphs": [
          "The table below puts the two structures side by side. The fixed-rate column is one unchanging number; the ARM column is a range, and the width of that range is the decision. An ARM's starting payment is lower, its maximum payment is higher, and everything between depends on an index no one controls.",
          "Notice what the table does not settle: which one costs less. That depends on the path of rates and on how long you keep the loan, and neither is knowable in advance. The worked example in the next section runs both loans on the same numbers so you can see the trade in dollars.",
          "One more factor belongs in the comparison: the size of the rate gap. When the ARM's starting rate sits well below the fixed rate, the early saving is large enough to matter. When the gap is narrow, the ARM offers little in exchange for its risk. The gap changes with the market, so compare the actual quotes in front of you rather than assuming an ARM is always cheaper at the start."
        ],
        "table": {
          "head": [
            "",
            "Fixed-rate mortgage",
            "Adjustable-rate mortgage (ARM)"
          ],
          "rows": [
            [
              "Interest rate",
              "Set at closing, never changes",
              "Fixed for 3-10 years, then adjusts every 6 months"
            ],
            [
              "Principal-and-interest payment",
              "Same every month",
              "Can rise or fall at each adjustment, within caps"
            ],
            [
              "Starting rate",
              "Higher than a comparable ARM",
              "Lower than a comparable fixed rate"
            ],
            [
              "Highest possible rate",
              "The rate you locked",
              "Starting rate + 5 points (standard conforming caps)"
            ],
            [
              "Total interest",
              "Known at closing",
              "Depends on future rates"
            ],
            [
              "Best for",
              "Staying put for many years",
              "Selling or refinancing before the first adjustment"
            ]
          ]
        }
      },
      {
        "heading": "Worked example: the same $300,000 loan both ways",
        "paragraphs": [
          "The comparison below uses one loan, $300,000 over 30 years, priced two ways: a fixed rate of 7.00% and a 5/6 ARM starting at 6.00% with 2/1/5 caps. These are illustrative rates chosen to show the math, not current market rates. To see what rates lenders are actually quoting, check Freddie Mac's weekly Primary Mortgage Market Survey.",
          "The fixed loan costs $1,995.91 a month in principal and interest, and that payment never changes. Over 30 years it pays $418,527 in interest on top of the $300,000 borrowed, for a total of $718,527. Those numbers are fixed at closing: the only way they change is if you pay the loan off early or refinance.",
          "The ARM starts at $1,798.65 a month, $197.26 less than the fixed loan. Over the five-year fixed period that saves $11,835 in cash, and because more of each early payment goes to principal at the lower rate, the ARM also pays the balance down faster: after five years the ARM balance is $279,163 against $282,395 on the fixed loan. Interest paid in the first five years is $87,082 on the ARM and $102,149 on the fixed loan, a $15,067 difference.",
          "So far the ARM wins by $11,835 in cash and $3,232 in extra principal paid down. That head start is real money, and it is the entire case for the ARM. Everything after year five depends on where the index goes, and the next section runs the worst case."
        ],
        "table": {
          "head": [
            "",
            "30-year fixed at 7.00%",
            "5/6 ARM starting at 6.00%"
          ],
          "rows": [
            [
              "Monthly principal and interest",
              "$1,995.91",
              "$1,798.65"
            ],
            [
              "Interest paid, first 5 years",
              "$102,149",
              "$87,082"
            ],
            [
              "Balance after 5 years",
              "$282,395",
              "$279,163"
            ],
            [
              "Total paid, first 5 years",
              "$119,754",
              "$107,919"
            ],
            [
              "Total interest if held 30 years",
              "$418,527",
              "Depends on future rates"
            ]
          ]
        }
      },
      {
        "heading": "What an ARM costs if rates rise",
        "paragraphs": [
          "Now assume rates stay high and the ARM adjusts to its cap at every step. At month 61, the first adjustment, the rate can rise at most 2 points, from 6% to 8%, and the payment is recalculated on the $279,163 balance over the remaining 25 years: $2,154.63 a month. That is already $158.72 above the fixed payment the borrower gave up.",
          "Six months later the rate can rise another point, to 9%, and the payment becomes $2,340.46. Six months after that, 10% takes it to $2,529.99. At month 79, two years into the adjustable period, the rate hits the lifetime cap of 11%, the starting rate plus 5 points, and the payment reaches $2,722.69. It can go no higher, but it can stay there: the cap limits the rate, not how long you pay it.",
          "That maximum payment is $924.04 a month above the ARM's starting payment, a 51% increase, and $726.78 above the fixed payment. Add up the first ten years and the worst-case ARM has cost $264,423 against $239,509 for the fixed loan: the $11,835 head start is gone, and the ARM is $24,914 behind. The crossover happens because the higher rate applies to a large balance for a long time.",
          "This is the worst case, not a forecast. The index could fall, and the payment with it, down to the margin floor. But a borrower who takes an ARM must be able to afford the worst case, because it is allowed by the contract. The CFPB's own checklist for ARM borrowers asks exactly this: whether you could still afford the loan if the rate and payment rose to the maximums allowed. If the answer is no, the ARM is the wrong loan no matter how attractive the starting rate looks. Refinancing out before the adjustments is a plan, not a guarantee: it depends on your income, credit, and home value at the time, and on rates being lower than your adjusted rate."
        ]
      },
      {
        "bullets": [
          "You plan to stay in the home well past the ARM's fixed period.",
          "Your budget has no room for a payment several hundred dollars higher.",
          "The gap between the fixed rate and the ARM's starting rate is small.",
          "You value knowing your exact payment for the full term over a lower payment now."
        ],
        "heading": "When a fixed rate is the better choice",
        "paragraphs": [
          "A fixed rate is the default choice for most borrowers, and it is the right one whenever the loan is likely to outlast the ARM's fixed period. If you plan to stay in the home for a decade or more, the ARM's early savings are a small prize against years of adjustment risk. The fixed rate also wins when the gap between fixed and ARM starting rates is small: a thin early saving is not worth a payment that could rise by hundreds of dollars.",
          "Budget room matters as much as horizon. A household whose budget has no slack for a much higher payment should not carry a loan that can produce one. The fixed payment also makes long-term planning simple: the housing cost in year 15 is the same number as in year 1, in dollars that inflation has made smaller.",
          "A fixed rate also suits anyone buying at the edge of what they can afford. First-time buyers who have stretched to the maximum loan their income supports have no cushion for an adjustment, and a payment that rises by hundreds of dollars can force cuts elsewhere or missed payments. Certainty is worth more when the margin for error is thin."
        ]
      },
      {
        "bullets": [
          "You expect to sell or refinance before the first adjustment date.",
          "Your income is likely to rise well before the fixed period ends.",
          "You could afford the maximum payment under the caps without strain.",
          "You have savings to pay the balance down if rates rise sharply."
        ],
        "heading": "When an ARM can make sense",
        "paragraphs": [
          "An ARM earns its place when the loan will be gone before the adjustments start. A borrower who expects to relocate for work in four years, or who is buying a starter home they plan to sell within five, can take the lower rate for the years they actually hold the loan and never face an adjustment. The saving is real: in the worked example it is $11,835 over five years.",
          "An ARM can also fit a borrower whose income is likely to rise well before the first adjustment, or who has savings large enough to absorb the maximum payment or pay the loan down. What it never fits is a borrower who can only afford the starting payment. If the loan only works at the starting rate, it does not work.",
          "The ARM case weakens the moment the timeline is uncertain. If the move might happen in three years or in eight, the loan could still be there when the adjustments begin. An ARM taken on a maybe is a fixed-rate loan you declined for a discount that may not last. Only take one when the exit before the first adjustment is a plan with a date, not a hope."
        ]
      },
      {
        "bullets": [
          "Read the Loan Estimate for the ARM: index, margin, caps, and first adjustment date.",
          "Calculate the payment at the first cap and at the lifetime cap.",
          "Compare total cost over your expected holding period, not month one.",
          "Check for a prepayment penalty and a fixed-rate conversion option.",
          "Confirm you can afford the maximum payment, not just the starting one."
        ],
        "heading": "How to compare two offers side by side",
        "paragraphs": [
          "Compare offers on the same loan amount and term, using the Loan Estimate each lender must send you. The Loan Estimate shows the rate, the monthly payment, and, for an ARM, the index, the margin, the caps, and the first adjustment date. Do not compare a fixed quote on one loan amount with an ARM quote on another; the numbers will mislead you.",
          "For the ARM, work out three numbers before you sign: the starting payment, the payment at the first adjustment if the rate rises to its first cap, and the payment at the lifetime cap. Then compare total cost over the years you realistically expect to keep the loan, not just the first month. A lower starting payment that becomes the highest payment in year seven is not a bargain if you will still be there in year seven.",
          "Ask the lender the questions the CFPB lists for ARM borrowers: how high and how low the rate and payment can go at each adjustment, how often the rate adjusts, how soon the payment could rise, and whether there is a cap on the rate. Check too whether the loan has a prepayment penalty and whether it can convert to a fixed rate later; some ARMs offer a conversion option, and it is worth knowing the terms before you need it.",
          "Finally, compare the full cost of each offer, not just the rate. Discount points, lender fees, and closing costs differ between quotes, and a lower rate bought with points can cost more than a higher rate with no points if you sell early. The Loan Estimate's total cost figures make this comparison straightforward: use them, and run the same holding period through both offers."
        ]
      }
    ],
    "seoTitle": "Fixed vs Adjustable-Rate Mortgages",
    "slug": "fixed-vs-adjustable-rate-mortgages",
    "sources": [
      {
        "label": "CFPB — What is the difference between a fixed-rate and adjustable-rate mortgage (ARM) loan?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-fixed-rate-and-adjustable-rate-mortgage-arm-loan-en-100/"
      },
      {
        "label": "CFPB — For an adjustable-rate mortgage (ARM), what are the index and margin, and how do they work?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/for-an-adjustable-rate-mortgage-arm-what-are-the-index-and-margin-and-how-do-they-work-en-1949/"
      },
      {
        "label": "CFPB — Consumer Handbook on Adjustable Rate Mortgages (CHARM booklet)",
        "url": "https://files.consumerfinance.gov/f/documents/cfpb_charm-booklet-web.pdf_202610.pdf"
      },
      {
        "label": "Fannie Mae — Standard ARM Plan Matrix",
        "url": "https://singlefamily.fanniemae.com/media/document/pdf/standard-arm-plan-matrix"
      }
    ],
    "title": "Fixed vs Adjustable-Rate Mortgages",
    "type": "Comparison",
    "updated": "2026-09-23"
  },
  {
    "cornerstone": false,
    "description": "PMI protects your lender, not you — and it adds $90–$210 a month on a $300,000 loan. Learn what it costs, when it ends, and the three ways to remove it.",
    "faqs": [
      {
        "answer": "Freddie Mac puts typical PMI at $30 to $70 a month for every $100,000 borrowed. On a $300,000 loan, that is $90 to $210 a month. The exact premium depends on your credit score and your loan-to-value ratio, and your lender states it on your Loan Estimate. At an illustrative 0.5% annual rate, a $300,000 loan costs $125 a month ($300,000 x 0.5% / 12).",
        "question": "How much does PMI cost per month?"
      },
      {
        "answer": "Yes. Under the Homeowners Protection Act, you can ask your servicer in writing to cancel PMI once your balance reaches 80% of the home's original value, and it ends automatically at 78% if you are current. If your home has gained value, Fannie Mae's guidelines may allow cancellation based on a new valuation at 75% to 80% loan-to-value, depending on how long you have had the loan.",
        "question": "Can I remove PMI without refinancing?"
      },
      {
        "answer": "Yes, in two ways. Your servicer must end PMI on the date your balance is scheduled to reach 78% of the home's original value, as long as you are current on payments. If that has not happened by the midpoint of your loan term — 15 years on a 30-year loan — PMI must end the following month. Do not rely on the automatic dates alone: asking at 80% can end PMI years sooner.",
        "question": "Does PMI go away automatically?"
      },
      {
        "answer": "PMI is private insurance on a conventional loan, priced by your credit score and loan-to-value ratio, and it ends when you reach 20% equity. FHA mortgage insurance (MIP) is set by HUD: an upfront premium of 1.75% of the loan plus an annual premium of 0.50% to 0.55% on most loans. With less than 10% down, FHA MIP lasts for the life of the loan.",
        "question": "How is PMI different from FHA mortgage insurance?"
      },
      {
        "answer": "Possibly, under your loan investor's guidelines rather than federal law. For a Fannie Mae loan on a one-unit home, you can request cancellation based on a new valuation if your loan-to-value is 75% or less when the loan is two to five years old, or 80% or less after five years. You pay for the valuation, which must include an interior and exterior inspection.",
        "question": "What if my home value went up — can I drop PMI sooner?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/what-is-pmi.jpg",
    "imageAlt": "Flat vector illustration of a house with a large orange shield above it, coins, and a small potted plant on a cream background",
    "inlineImage": "/images/what-is-pmi-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a house beside rising bars with coins at the base and a sprout on the tallest bar",
    "intro": "Private mortgage insurance (PMI) is insurance you pay on a conventional mortgage when your down payment is under 20%. It protects your lender, not you, if you stop making payments. On a $300,000 loan it adds $90 to $210 a month, and three routes end it: ask at 80%, automatic at 78%, or the loan midpoint.",
    "published": "2026-09-27",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      },
      {
        "name": "Home Equity Calculator",
        "url": "/real-estate/home-equity-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What PMI is and who it protects",
        "paragraphs": [
          "Private mortgage insurance, or PMI, is a policy that pays your lender if you default on a conventional mortgage. You pay the premiums; the lender is the one covered. If you fall behind on payments, PMI does not protect you, and you can still lose your home through foreclosure. The Consumer Financial Protection Bureau puts it plainly: PMI protects the lender, not you.",
          "PMI is arranged by your lender and issued by a private insurance company. It covers part of the lender's loss if a foreclosure sale does not repay the full loan balance. That is why lenders require it on low-down-payment loans: with less of your own money in the home, the lender carries more risk.",
          "PMI is not homeowners insurance. Homeowners insurance protects you and the home itself against fire, storms, and other damage, and it stays in place for as long as you own the home. PMI protects only the lender's loan, and it can be removed once you build enough equity. The two appear on the same monthly statement, but they do different jobs and end on different terms.",
          "The trade-off is straightforward. PMI lets you buy before you have saved a 20% down payment, which can mean buying years sooner. In exchange, you pay a monthly premium for coverage that benefits the lender. Whether that trade is worth it depends on how long you will pay the premium and what waiting costs."
        ]
      },
      {
        "heading": "When lenders require PMI",
        "paragraphs": [
          "Lenders generally require PMI on a conventional loan when your down payment is less than 20% of the purchase price. In loan-to-value terms, that means PMI applies when your LTV is above 80%. LTV is your loan balance divided by the home's value: a $300,000 loan on a $350,000 home is an LTV of 85.7% ($300,000 / $350,000), so PMI applies.",
          "The same rule applies when you refinance a conventional loan. If your equity is less than 20% of the home's value at refinancing, the lender will generally require PMI on the new loan. A refinance that drops your interest rate can still add PMI if your equity has not reached 20%.",
          "PMI applies to conventional loans only. Loans backed by the Federal Housing Administration (FHA) carry their own mortgage insurance premium, set by the Department of Housing and Urban Development. VA-backed loans for servicemembers, veterans, and their families have no monthly mortgage insurance premium at all, though they charge an upfront funding fee. USDA loans have their own guarantee fee structure. The cancellation rules in this guide cover conventional PMI; FHA, VA, and USDA loans follow different rules.",
          "Not every low-down-payment conventional loan carries borrower-paid PMI. Some lenders offer loans with lender-paid mortgage insurance, where the lender covers the premium and charges a higher interest rate instead. That version follows different rules: the cancellation rights in this guide do not apply to it, so ask your servicer how that coverage ends."
        ]
      },
      {
        "heading": "How much PMI costs",
        "paragraphs": [
          "PMI is priced as an annual rate applied to your loan amount, then billed monthly. The rate depends mainly on your credit score and your loan-to-value ratio: a higher score and a larger down payment mean a lower rate. Freddie Mac puts the typical cost at $30 to $70 a month for every $100,000 borrowed, which works out to roughly 0.36% to 0.84% of the loan per year.",
          "The worked example below uses a $300,000 loan — a $350,000 home with $50,000 down. At Freddie Mac's low end, PMI costs $90 a month. At the high end, $210 a month. The middle column uses an illustrative rate of 0.5% a year, which costs $125 a month ($300,000 x 0.5% / 12). Your actual rate comes from your lender's quote, shown on your Loan Estimate, and it depends on your credit score and down payment.",
          "Your monthly premium is set at origination and does not shrink as your balance falls; it stops only when the coverage ends. Over the years it takes to reach 20% equity, the total adds up: at $125 a month, five years of PMI costs $7,500.",
          "Credit score is the lever you control before you buy. Insurers price the premium on the risk of default, so a higher score means a lower rate on the same loan. If your score is close to a better pricing tier, improving it before you apply cuts the premium every month until the PMI comes off."
        ],
        "table": {
          "head": [
            "Annual PMI rate",
            "Cost per year",
            "Cost per month"
          ],
          "rows": [
            [
              "0.36% (Freddie Mac low end)",
              "$1,080",
              "$90"
            ],
            [
              "0.50% (illustrative example)",
              "$1,500",
              "$125"
            ],
            [
              "0.84% (Freddie Mac high end)",
              "$2,520",
              "$210"
            ]
          ]
        }
      },
      {
        "heading": "How PMI shows up in your monthly payment",
        "paragraphs": [
          "Most borrowers pay PMI as a monthly premium added to the mortgage payment. The premium goes into your escrow account along with property taxes and homeowners insurance, and your lender pays the insurer from it. You see one combined payment; the PMI is one line inside it.",
          "Your exact premium appears on your Loan Estimate and your Closing Disclosure, the two documents that itemize your loan costs before closing. Check the Projected Payments section on page 1 of each. When comparing lenders, compare the PMI premium alongside the interest rate: two lenders can quote the same rate and different PMI.",
          "Use the same $300,000 loan to see the full picture. At an illustrative 7% fixed rate over 30 years, principal and interest come to $1,995.91 a month. Add PMI at the illustrative 0.5% rate — $125 a month — and the payment is $2,120.91 before taxes and homeowners insurance. PMI is about 6% of that payment, and it is the one part of the payment that protects someone else.",
          "When PMI ends, your payment drops by the premium amount. Your servicer runs a new escrow analysis or adjusts at the next scheduled one, and the premium falls out of your monthly payment. Every month you pay PMI after you qualify to cancel it is money you did not need to spend."
        ]
      },
      {
        "bullets": [
          "Request in writing: a phone call is not enough under the law, so send the request in writing and keep a copy.",
          "Current payments with a good payment history: Fannie Mae's standard is no payment 30 or more days late in the last 12 months and none 60 or more days late in the last 24 months.",
          "No junior liens: certify there is no second mortgage or home equity line secured by the home.",
          "Value has not fallen: be ready to provide evidence, such as an appraisal, that the home is still worth at least its original value."
        ],
        "heading": "Ask for cancellation at 80%",
        "paragraphs": [
          "The Homeowners Protection Act of 1998 gives you the right to ask your servicer to cancel PMI once your principal balance reaches 80% of your home's original value. Original value generally means the lower of the price you paid and the appraised value when you bought the home. On a $350,000 purchase, 80% is $280,000: once your balance hits that number, you can ask.",
          "You can ask on the date your balance is scheduled to reach 80% under your original amortization schedule, or earlier if extra payments get you there sooner. In the worked example — a $300,000 loan at an illustrative 7% over 30 years — the balance is scheduled to reach $280,000 with the 67th payment, 5 years and 7 months in. By then you will have paid $8,375 in PMI at $125 a month, which is why asking promptly matters.",
          "Your servicer must grant a request that meets the conditions. The CFPB lists them: the request must be in writing, you must be current on payments with a good payment history, you must certify there are no junior liens such as a second mortgage on the home, and you must provide evidence — for example, an appraisal — that the home's value has not fallen below its original value.",
          "These rights apply to mortgages on single-family principal residences that closed on or after July 29, 1999. They do not cover FHA or VA loans, which follow different rules, or lender-paid mortgage insurance. Some servicers allow cancellation under their own, more lenient standards, so ask yours what it offers."
        ]
      },
      {
        "heading": "Automatic termination at 78% and the midpoint backstop",
        "paragraphs": [
          "If you never ask, PMI still ends on its own. Your servicer must automatically terminate PMI on the date your balance is scheduled to reach 78% of the home's original value, as long as you are current on payments. On the $350,000 example, 78% is $273,000, reached with the 86th payment — 7 years and 2 months in, 19 months after you could first have asked.",
          "The automatic date follows your original amortization schedule, not your actual balance. Extra principal payments do not move it: even if you pay the balance down to 78% early, the servicer is not required to end PMI early on this route. That is the trap in doing nothing. The 80% request is the route that rewards extra payments; the 78% date is the safety net for borrowers who never ask.",
          "There is a second backstop. Your servicer must end PMI the month after you reach the midpoint of your loan's amortization schedule, even if the balance has not reached 78%. On a 30-year loan the midpoint is after 15 years, so PMI ends in the first month of year 16 at the latest, provided you are current. With a standard amortizing loan the 78% date usually arrives first, so the midpoint matters mainly for loans with interest-only periods or other non-standard schedules.",
          "Being current is a condition of both automatic routes. If you are behind on payments when the 78% date or the midpoint arrives, the servicer does not terminate PMI then; it ends shortly after you catch up. If your servicer fails to cancel PMI when the law requires it, you can file a complaint with the CFPB."
        ]
      },
      {
        "heading": "Get rid of PMI faster",
        "paragraphs": [
          "The fastest lever is extra principal payments. Every extra dollar goes straight to the balance, which pulls the 80% date forward. In the worked example, adding $100 a month in extra principal moves the 80% date from the 67th payment to the 50th — 4 years and 2 months in, 17 months sooner. Those 17 months of PMI you no longer pay save $2,125 at $125 a month, and the $5,000 of extra principal is not spent: it is equity in your home.",
          "Make sure the extra money is applied to principal: tell your servicer in writing that it is principal-only, and check your statements to confirm it. An extra payment treated as an early regular payment does not cut the balance faster.",
          "Rising home values open a second route. The federal rules run on original value, so appreciation alone does not move the 80% or 78% dates. But Fannie Mae's servicing guide lets borrowers request cancellation based on the home's current value, supported by a valuation with an interior and exterior inspection that you pay for. The equity bar is stricter than the federal test and depends on how long the loan has been open.",
          "In the worked example, suppose the home is worth $400,000 after three years and the balance is about $290,000. That is an LTV of 72.5% on current value ($290,000 / $400,000), under Fannie Mae's 75% line for a loan two to five years old — so a cancellation request based on current value could succeed years before the 80%-of-original-value date. Freddie Mac has its own guidelines, so ask your servicer which investor owns your loan and what its rules require.",
          "Refinancing is a third route. If your home has gained value or rates have fallen, a new loan at 80% LTV or below carries no PMI at all. Compare the closing costs against the PMI you would save: a refinance that costs $4,000 to close makes little sense if you would reach 80% on your own within a year, since a year of PMI at $125 a month is only $1,500."
        ],
        "table": {
          "head": [
            "Time since closing",
            "LTV needed on current value"
          ],
          "rows": [
            [
              "2 to 5 years",
              "75% or less"
            ],
            [
              "More than 5 years",
              "80% or less"
            ],
            [
              "Under 2 years, with value-adding improvements",
              "80% or less"
            ]
          ]
        }
      },
      {
        "heading": "PMI vs FHA mortgage insurance",
        "paragraphs": [
          "FHA loans do not use PMI. They carry a mortgage insurance premium, or MIP, set by the Department of Housing and Urban Development. Every FHA loan pays an upfront premium of 1.75% of the base loan amount, usually financed into the loan, plus an annual premium paid monthly. Unlike PMI, the annual MIP does not depend on your credit score.",
          "The annual premium depends on the loan term, the base loan amount, and the loan-to-value ratio. For a mortgage term over 15 years with a base loan at or below the national conforming loan limit — $832,750 in 2026 — the annual MIP is 0.50% at an LTV of 95% or less and 0.55% above 95%. Above the conforming limit, the rates are 0.70% and 0.75%. These rates come from HUD Mortgagee Letter 2023-05, effective for case numbers endorsed on or after March 20, 2023.",
          "Duration is where FHA differs most. If your down payment is 10% or more, the annual MIP lasts 11 years. If it is under 10%, the annual MIP lasts for the life of the loan — there is no 80% request and no automatic termination. The only way out is to refinance into a conventional loan once you have 20% equity.",
          "The comparison below uses the same $350,000 home. The conventional loan assumes about 14% down and PMI at the illustrative 0.5% rate; the FHA loan assumes 3.5% down. The FHA borrower pays $5,910.63 upfront ($337,750 x 1.75%) and about $155 a month in annual MIP ($337,750 x 0.55% / 12 = $154.80) for as long as the loan lasts, while the conventional borrower's $125 a month ends at 80% equity."
        ],
        "table": {
          "head": [
            "",
            "Conventional PMI",
            "FHA MIP"
          ],
          "rows": [
            [
              "Upfront charge",
              "None with monthly PMI",
              "1.75% of base loan ($5,910.63)"
            ],
            [
              "Annual cost in this example",
              "0.50% illustrative ($125/month)",
              "0.55% ($154.80/month)"
            ],
            [
              "How long it lasts",
              "Until 80% equity (by request) or 78% (automatic)",
              "Life of the loan with under 10% down; 11 years with 10% or more"
            ],
            [
              "Based on credit score?",
              "Yes — rate varies with score and LTV",
              "No — same rate regardless of score"
            ]
          ]
        }
      },
      {
        "bullets": [
          "20% down: no PMI, a lower balance, and usually a lower rate — but $70,000 in cash on a $350,000 home.",
          "Piggyback loan: a first mortgage at 80% plus a second loan — compare the combined cost against PMI before choosing.",
          "VA loan: no monthly premium for eligible borrowers; a one-time funding fee instead.",
          "Lender-paid PMI: no monthly premium, but a higher interest rate for the life of the loan — and the cancellation rules in this guide do not apply to it."
        ],
        "heading": "Ways to avoid PMI when you buy",
        "paragraphs": [
          "The simplest way to avoid PMI is a 20% down payment. On a $350,000 home that is $70,000, which also buys a lower loan balance and usually a lower interest rate. Waiting to save it has its own cost: rent in the meantime, and home prices that may rise while you save.",
          "A piggyback loan is another route. You take a first mortgage for 80% of the price and a second loan for part of the remaining 20%, so the first mortgage never triggers PMI. The CFPB warns that this option may be marketed as cheaper without necessarily being so: the second loan usually carries a higher rate, and you must compare the total cost of both loans against a single loan with PMI before deciding.",
          "VA-backed loans avoid monthly mortgage insurance entirely for eligible servicemembers, veterans, and their families, replacing it with a one-time funding fee that varies with your service, down payment, and whether it is your first VA loan. If you are eligible, it is usually the cheapest way to buy with little or no down payment.",
          "Whatever route you choose, compare the full cost over the time you expect to stay in the home. A 20% down payment, a piggyback structure, lender-paid insurance, and borrower-paid PMI each move the cost to a different place: cash at closing, a second loan payment, a higher rate, or a monthly premium. The cheapest option is the one with the lowest total cost over your expected stay, not the one with the lowest payment in month one."
        ]
      }
    ],
    "seoTitle": "What Is PMI and How to Get Rid of It",
    "slug": "what-is-pmi",
    "sources": [
      {
        "label": "CFPB — When can I remove private mortgage insurance (PMI) from my loan?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/"
      },
      {
        "label": "Freddie Mac — What Is Private Mortgage Insurance?",
        "url": "https://myhome.freddiemac.com/blog/homeownership/20190913-private-mortgage-insurance"
      },
      {
        "label": "HUD — Mortgagee Letter 2023-05: Reduction of FHA Annual MIP Rates",
        "url": "https://www.hud.gov/sites/dfiles/OCHCO/documents/2023-05hsgml.pdf"
      },
      {
        "label": "Fannie Mae — Servicing Guide B-8.1-04, Termination of Conventional Mortgage Insurance",
        "url": "https://servicing-guide.fanniemae.com/svc/b-8.1-04/termination-conventional-mortgage-insurance?touchpoint=guide"
      }
    ],
    "title": "What Is PMI and How to Get Rid of It",
    "type": "What",
    "updated": "2026-09-27"
  },
  {
    "cornerstone": false,
    "description": "Ten mistakes first-time buyers make — from skipping pre-approval to waiving inspection — with the dollar cost of each and how to avoid it on a $350,000 home.",
    "faqs": [
      {
        "answer": "Shopping for homes before knowing what you can actually afford. Buyers fall for a house, stretch the budget to reach it, and end up with a payment that leaves no margin for repairs, saving, or life. Work out the monthly payment first — principal, interest, taxes, insurance, PMI, and HOA — and shop inside that number.",
        "question": "What is the biggest mistake first-time home buyers make?"
      },
      {
        "answer": "More than the down payment. On a $350,000 home with 10% down, expect $35,000 for the down payment plus closing costs of roughly $6,300 to $15,750 (the CFPB's typical 2% to 5% of the loan), plus moving costs and an emergency reserve. A realistic cash target is $45,000 to $55,000, with savings still left over after closing.",
        "question": "How much should I save before buying my first home?"
      },
      {
        "answer": "It is a gamble, and the stakes are the repair bills you cannot see. An inspection typically costs a few hundred dollars; the roof, sewer line, or electrical panel it can catch costs thousands. If competition forces a choice, consider a pre-offer inspection or an informational inspection instead of waiving entirely. Never waive on a home you have not had inspected.",
        "question": "Is it OK to waive the inspection in a competitive market?"
      },
      {
        "answer": "Decide on the payment, not the forecast. Freddie Mac's weekly survey put the 30-year average at 7.03% in the week published September 24, 2026. If the payment works at today's rates and you plan to stay for years, waiting costs rent meanwhile — and you can refinance later if rates fall, though a future refinance is never guaranteed.",
        "question": "Should I wait for mortgage rates to fall before buying?"
      },
      {
        "answer": "There is no single minimum. FHA loans accept a 580 score with 3.5% down, or 500 to 579 with 10% down. Conventional lenders commonly look for 620 or higher. Scores in the mid-700s and above get the best rates. Whatever your score, check your credit reports for errors months before you apply — a correction can change your rate.",
        "question": "What credit score do I need as a first-time buyer?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/first-time-home-buyer-mistakes.jpg",
    "imageAlt": "Flat vector illustration of a winding orange path leading to a small emerald house among trees, on a cream background",
    "inlineImage": "/images/first-time-home-buyer-mistakes-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a checklist with check marks beside a small house on a cream background",
    "intro": "Buying your first home is the largest financial transaction most people ever make, and the mistakes are expensive — tens of thousands over the life of a loan, or a payment that strains every month. The ten below are the most common, each with its dollar cost and how to avoid it, using a $350,000 home as the example.",
    "published": "2026-10-04",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Home Affordability Calculator",
        "url": "/real-estate/home-affordability-calculator"
      },
      {
        "name": "Closing Cost Calculator",
        "url": "/real-estate/closing-cost-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Shopping for homes before you know your budget",
        "paragraphs": [
          "The first mistake happens before the first showing: touring homes with no clear budget. Listings are priced to attract, and without your own number you will fall for homes whose payments you cannot afford — or waste weeks on homes below what you could buy. Start with the monthly payment, not the listing price. Lenders size your loan from gross monthly income and existing debts, and the number they approve is a ceiling, not a recommendation.",
          "Two rules of thumb frame the answer. The 28/36 rule says housing costs should stay under 28% of gross monthly income, and all debts including housing under 36%. Lenders also use the debt-to-income ratio (DTI): total monthly debt payments divided by gross monthly income. Fannie Mae looks for 36%, accepts up to 45%, and allows 50% with strong compensating factors; FHA uses 31% front-end and 43% back-end; VA uses 41%.",
          "Take a household earning $90,000 a year, or $7,500 a month before tax. The 28% rule caps housing at $2,100 a month; the 36% rule caps all debts at $2,700. A $350,000 home with 10% down costs about $2,619 a month all-in at an example 6.5% rate — 34.9% of gross income, above the 28% guidepost. That is a warning sign, not a verdict, but it is the kind of arithmetic to do before you browse. The Home Affordability Calculator turns your income and debts into a price range."
        ]
      },
      {
        "heading": "Assuming you need 20% down",
        "paragraphs": [
          "Many first-time buyers wait years to save 20%, renting all the while, because they believe it is required. It is not. Most first-time buyers put down far less: many conventional programs accept 3%, FHA loans accept 3.5% with a 580 credit score, and VA and USDA loans offer 0% down to eligible buyers. On a $350,000 home, 3% is $10,500 — a very different savings target from $70,000.",
          "The trade-off is mortgage insurance. Less than 20% down on a conventional loan adds PMI; on an FHA loan it adds MIP. On a $315,000 loan, PMI at an example 0.6% a year costs about $158 a month. Compare that with the cost of waiting: two more years of renting at $1,800 a month is $43,200 in rent, while PMI at $158 a month costs $3,792 over the same two years — and PMI ends once you reach 20% equity.",
          "The right down payment depends on your cash, your credit, and how long you will stay — not on a round number. Run both scenarios through a mortgage payment calculator before deciding: the payment with PMI against the payment without it, and the months of rent each savings target costs you."
        ],
        "table": {
          "head": [
            "Loan type",
            "Minimum down payment",
            "Cash on a $350,000 home"
          ],
          "rows": [
            [
              "Conventional",
              "3% for many first-time buyer programs",
              "$10,500"
            ],
            [
              "FHA",
              "3.5% with a 580+ credit score; 10% at 500–579",
              "$12,250"
            ],
            [
              "VA",
              "0% for eligible veterans and servicemembers",
              "$0"
            ],
            [
              "USDA",
              "0% in eligible rural areas, with income limits",
              "$0"
            ]
          ]
        }
      },
      {
        "heading": "Getting a quote from only one lender",
        "paragraphs": [
          "Accepting the first lender's offer is the most expensive lazy mistake in home buying. Rates and fees vary between lenders on the same day for the same borrower, and the difference compounds for 30 years. Your bank, an online lender, and a local mortgage broker will rarely quote the same rate. Get Loan Estimates from at least three lenders and compare them side by side.",
          "The arithmetic is stark. On a $315,000 loan over 30 years, an example rate of 6.75% costs $2,043 a month in principal and interest; at 6.5% it costs $1,991. That 0.25-point difference is $52 a month — $18,745 over the life of the loan. A single afternoon of comparison shopping can be worth more than a year of careful budgeting.",
          "Rate shopping does not damage your credit the way people fear. Scoring models treat multiple mortgage inquiries within a short window — typically 14 to 45 days — as a single inquiry. Keep the shopping inside one two-week stretch, compare the rate, the lender fees in Section A of the Loan Estimate, and the estimated cash to close, and ask the cheapest lender to match a better offer — many will. A lender who will not put the offer in a Loan Estimate is a lender to skip."
        ]
      },
      {
        "heading": "Spending every dollar on the down payment",
        "paragraphs": [
          "Buyers who pour every saved dollar into the down payment arrive at closing with nothing left — and closing still has a bill. The CFPB puts closing costs typically at 2% to 5% of the loan amount. On a $315,000 loan, that is $6,300 to $15,750; at a 3% midpoint the bill is $9,450, on top of the down payment.",
          "Add the rest of the cash you need. Earnest money — typically 1% to 2% of the price, paid when your offer is accepted — is credited at closing, so it is not extra, but it leaves your account weeks before closing day. Moving, utility deposits, locks, and the first repairs all land in the same month. And some lenders want to see one or two months of payments left in the bank after closing; even when they don't, an empty account turns the first broken appliance into a credit card balance.",
          "Set the cash target before you set the down payment. On our $350,000 example with 10% down: $35,000 down plus $9,450 in closing costs is $44,450, before moving costs and the first month of ownership. A realistic target is $45,000 to $55,000, with savings still left over after closing. If reaching that number means a smaller down payment and a few years of PMI, that trade usually beats arriving at closing broke. The Closing Cost Calculator itemizes the closing side for your price and loan."
        ]
      },
      {
        "bullets": [
          "Roof, HVAC, and water heater ages — replacements run into the thousands.",
          "Water pressure, drainage, and any signs of water damage or mold.",
          "The electrical panel and wiring — an outdated panel is a common expensive finding.",
          "Foundation cracks, grading, and whether water drains away from the house."
        ],
        "heading": "Waiving the inspection to win the bid",
        "paragraphs": [
          "In a competitive market, waiving the inspection contingency makes an offer stronger — and removes the one protection that tells you what you are actually buying. A standard inspection typically costs a few hundred dollars and covers the roof, structure, plumbing, electrical, HVAC, and appliances. The problems it finds run into the thousands: a roof at the end of its life, a failing sewer line, an electrical panel that needs replacing. Attend it if you can: the inspector's running commentary tells you more than the written report.",
          "No inspection comes back clean, and that is not the point. Every home has minor issues; what matters is the expensive kind, and the inspection gives you options: ask the seller to repair, ask for a credit at closing, or walk away under the contingency. Without it, you discover the problems after you own them — and pay for them yourself.",
          "If competition forces a choice, there are middle options: a pre-offer inspection, an inspection contingency with a repair cap, or an informational inspection that lets you walk away only for major defects. Never waive the inspection entirely on a home you have not had inspected. A house that photographs well can hide a 25-year-old roof and a basement that floods in spring."
        ]
      },
      {
        "heading": "Making big money moves before closing",
        "paragraphs": [
          "Between offer acceptance and closing, your finances are under a microscope — and lenders re-check before they fund the loan. Underwriters pull a final credit check and verify employment, often days before closing. A new car loan, a job change, a new credit card, or a large undocumented deposit can restart underwriting or change your approval. The rule is simple: freeze your finances from pre-approval until after closing.",
          "The car loan is the classic case. Take the household from the budget example: $7,500 gross monthly income, a $2,619 housing payment, a $400 car payment, and a $200 student loan — a 42.9% back-end DTI, inside Fannie Mae's 45% guidepost. Trade the car in for one with a $700 payment and DTI jumps to 46.9%, past the guidepost. The lender can reprice the loan, demand a larger down payment, or deny it.",
          "The same applies to job changes, even good ones: a move to a new employer or to self-employment can require a new round of income verification. Large cash deposits draw questions too — underwriters ask where the money came from, and undocumented cash can stall the file. And do not close old credit cards: it can shorten your credit history and raise your utilization. If a big purchase or a job move cannot wait, talk to your lender first; a five-minute call beats a delayed closing."
        ]
      },
      {
        "heading": "Falling in love with a house and overpaying",
        "paragraphs": [
          "The most expensive mistake first-time buyers make is falling in love with a house and chasing it past what the numbers support. An overpayment stays in your mortgage for 30 years; another house will come on the market. Price from comparable sales, not from the listing price: your agent should show you recent sales of similar homes nearby, adjusted for size, condition, and features. Days on market and price cuts are negotiating information — ask your agent for them at every showing.",
          "In a multiple-offer situation, an escalation clause can win without overpaying blindly: you offer to beat the highest competing bid by a set amount up to a cap you chose in advance. Set your walk-away price before you offer, in writing, and hold it. The cap is decided when you are calm, not in the middle of a bidding war.",
          "The appraisal is your backstop — if it comes in below the agreed price, the lender will not lend on the difference. Offer $360,000 on a home that appraises at $350,000 and you must bring the extra $10,000 in cash, renegotiate the price, or walk away under the appraisal contingency. Buyers who waived that contingency to win the bid face the gap with no exit. A low appraisal is unwelcome news, but it also stops you from borrowing more than the home is worth."
        ]
      },
      {
        "heading": "Forgetting the costs beyond principal and interest",
        "paragraphs": [
          "First-time buyers often budget for principal and interest and forget everything else in the payment. On a $350,000 home with 10% down at an example 6.5% rate, principal and interest is $1,991 a month — but the full payment is about $2,619. The $628 difference is taxes, insurance, and mortgage insurance, and it is due every month from day one.",
          "Then come the costs outside the mortgage entirely. HOA dues are separate from the payment and count toward your DTI; $350 a month in dues is $4,200 a year. Maintenance is the other forgotten line: a common rule of thumb is 1% of the home's value per year — $3,500 a year, or about $292 a month, on a $350,000 home. Older homes and harsh climates run higher.",
          "Add it all up before you offer. The table below shows the full monthly cost of the example home. If the total leaves no margin, a smaller home or a longer savings runway is a better answer than a stretched payment — a payment that leaves no room turns every repair into a crisis."
        ],
        "table": {
          "head": [
            "Monthly cost",
            "How it is figured",
            "Amount"
          ],
          "rows": [
            [
              "Principal and interest",
              "$315,000 loan at an example 6.5% fixed rate, 30 years",
              "$1,991"
            ],
            [
              "Private mortgage insurance",
              "Example 0.6% of the loan per year, because the down payment is under 20%",
              "$158"
            ],
            [
              "Property taxes",
              "Example 1.1% of the home value per year",
              "$321"
            ],
            [
              "Homeowners insurance",
              "Example $1,800 per year",
              "$150"
            ],
            [
              "Mortgage payment",
              "Principal, interest, taxes, insurance, and PMI (rounded)",
              "About $2,619"
            ],
            [
              "HOA dues",
              "Example monthly dues for the community",
              "$350"
            ],
            [
              "Maintenance reserve",
              "1% of the home value per year",
              "$292"
            ],
            [
              "All-in monthly cost",
              "Mortgage payment plus HOA and maintenance",
              "About $3,261"
            ]
          ]
        }
      },
      {
        "heading": "Skimming the closing paperwork",
        "paragraphs": [
          "At least three business days before closing, your lender must send the Closing Disclosure — the final, itemized statement of your loan terms and costs. Too many buyers skim it or skip it entirely. Compare it line by line with the Loan Estimate you received when you applied. Most fees cannot change; if a number moved, ask why before you sign anything. It also shows the exact cash due at closing — bring it as a cashier's check or a wire transfer, never as a personal check.",
          "The three-day window exists for exactly this review, and it is your last cheap chance to catch an error: a wrong loan amount, a rate that is not what you locked, a fee that appeared from nowhere. Once you sign, fixing a mistake means a fight, not a phone call. Read the loan amount, rate, and monthly payment once more at the signing table before you pick up the pen. If the lender sends a revised disclosure with a higher APR or a different loan product, the three-day clock restarts.",
          "Protect the wire, too. Real estate wire fraud starts with a spoofed email carrying fake wiring instructions. Call your title company at a number you already have — not one from an email — to confirm the instructions before you send money. A five-minute phone call is the entire defense, and a misdirected wire is rarely recovered."
        ]
      },
      {
        "bullets": [
          "Childcare and school costs, which can rival the mortgage itself.",
          "Retirement and college saving — the lender does not ask about your goals.",
          "Car replacement and maintenance, and every other bill that is not a debt payment.",
          "Travel and the life you want to keep living after you buy."
        ],
        "heading": "Buying at the top of your pre-approval",
        "paragraphs": [
          "A pre-approval letter states a maximum loan amount, and it is usually good for 60 to 90 days. Too many buyers treat the maximum as a target. The lender does not know your childcare costs, your savings goals, or what a comfortable payment feels like — it knows your income and debts. The maximum is a ceiling, not a recommendation, and buying at the ceiling leaves no room for the life that happens after closing.",
          "The lender's math also misses costs that are real to you. A household that qualifies at 45% DTI has 55% of gross income left — before tax. After income tax, retirement saving, and the costs below, the margin is thin. Buyers who stretch to the maximum often discover the payment is technically affordable and practically miserable.",
          "Decide your own ceiling before you shop: the payment that leaves your savings plan intact and your emergency fund untouched. A home $25,000 cheaper saves about $158 a month in principal and interest at an example 6.5% rate — money that funds the rest of your life. The right house is the one whose payment you can live with for years, not the biggest one a lender will approve."
        ]
      }
    ],
    "seoTitle": "10 First-Time Home Buyer Mistakes to Avoid",
    "slug": "first-time-home-buyer-mistakes",
    "sources": [
      {
        "label": "Consumer Financial Protection Bureau — Buying a house",
        "url": "https://www.consumerfinance.gov/owning-a-home/"
      },
      {
        "label": "U.S. Department of Housing and Urban Development — Buying a home",
        "url": "https://www.hud.gov/topics/buying_a_home"
      },
      {
        "label": "Freddie Mac — My Home: Buying",
        "url": "https://myhome.freddiemac.com/buying/"
      },
      {
        "label": "U.S. Department of Veterans Affairs — VA home loans",
        "url": "https://www.va.gov/housing-assistance/home-loans/"
      }
    ],
    "title": "10 First-Time Home Buyer Mistakes",
    "type": "Mistakes",
    "updated": "2026-10-04"
  },
  {
    "cornerstone": false,
    "description": "Refinance the right way: break-even math on a $300,000 loan, rate-and-term vs cash-out, FHA streamline and VA IRRRL rules, costs, and the right to cancel.",
    "faqs": [
      {
        "answer": "Expect 2% to 5% of the loan amount, the CFPB's typical range for closing costs. On a $300,000 refinance that is $6,000 to $15,000. A common midpoint example is $7,500, covering a 1% origination fee, appraisal, title work, recording, and prepaid interest. Your Loan Estimate shows your exact figure.",
        "question": "How much does it cost to refinance a $300,000 mortgage?"
      },
      {
        "answer": "Plan on 30 to 45 days from application to closing, the same window as a purchase loan. Appraisal scheduling, document requests, and underwriting cause most delays. Streamline refinances for FHA and VA loans can close faster because they skip the appraisal and much of the paperwork. A rate lock of 45 to 60 days covers most timelines.",
        "question": "How long does refinancing take?"
      },
      {
        "answer": "It depends on the loan type. Conventional lenders commonly look for a 620 score or higher, and the best rates go to scores in the mid-700s and above. FHA refinances accept lower scores, and VA IRRRLs and FHA streamline refinances can work with limited credit review. A lower score means a higher rate, so the break-even math matters even more.",
        "question": "Can I refinance with bad credit?"
      },
      {
        "answer": "Briefly and slightly. Each lender pulls your credit, but scoring models treat multiple mortgage inquiries within a short window — typically 14 to 45 days — as a single inquiry, so shopping with three lenders in one two-week stretch costs little. The new loan also lowers your average account age. The effect is small compared with the savings from a better rate.",
        "question": "Does refinancing hurt my credit score?"
      },
      {
        "answer": "Usually, yes. Federal law gives you three business days after closing to cancel a refinance on your primary residence, for any reason. Saturdays count as business days; Sundays and federal holidays do not. The notice must be in writing. The right does not apply to purchase loans, or to a rate-and-term refinance with your current lender that adds no new money.",
        "question": "Can I cancel a refinance after closing?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/how-to-refinance-your-mortgage.jpg",
    "imageAlt": "Flat vector illustration of a house with a large circular arrow above it and a downward-sloping line, on a cream background",
    "inlineImage": "/images/how-to-refinance-your-mortgage-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a balance scale weighing a house against a stack of coins on a cream background",
    "intro": "Refinancing replaces your current mortgage with a new one — a different rate, term, or loan balance. It pays off only when the savings beat the closing costs before you move or pay off the loan. This guide works through that break-even test with real numbers, then covers refinance types, costs, and the process.",
    "published": "2026-10-01",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Refinance Calculator",
        "url": "/real-estate/refinance-calculator"
      },
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What refinancing actually does",
        "paragraphs": [
          "A refinance is a new loan that pays off the old one. You apply, the lender underwrites you again, an appraisal usually values the home, and the new lender pays off the old balance at closing. Your monthly payment, interest rate, and remaining term all reset to the new loan's terms. The house, the deed, and your ownership do not change.",
          "Three kinds of refinance cover nearly every situation. A rate-and-term refinance changes the interest rate, the loan term, or both, without borrowing extra money. A cash-out refinance replaces the loan with a larger one and pays you the difference at closing. A streamline refinance — offered for FHA and VA loans — swaps one government-backed loan for another with less paperwork and no appraisal.",
          "Some things do not change. Your property taxes and homeowners insurance stay the same — they are set by your county and your insurer, not your lender. And the clock restarts: a new 30-year loan means 30 more years of payments, even if you have already paid the old loan for five years. That reset is the most misunderstood part of refinancing.",
          "Lenders judge a refinance like a purchase loan: credit score, income, debts, and home value. Approval is not automatic because you already have a mortgage. If your credit has fallen, your income has dropped, or your home has lost value, the refinance may come back with a worse rate than you expect — or not at all. Check all three before you apply."
        ]
      },
      {
        "heading": "Run the break-even test first",
        "paragraphs": [
          "Every refinance decision starts with one calculation: divide total closing costs by monthly savings. The answer is the break-even point in months. Stay past it and the refinance saves money; sell or refinance again before it and the refinance loses money, however good the rate looks.",
          "Take a concrete example. You owe $300,000 at 7.5%, with 25 years left. Your principal-and-interest payment is $2,217 a month, and you will pay $365,092 in interest over the remaining 25 years. A new 30-year loan at an example rate of 6.5% — illustrative, not a quote — cuts the payment to $1,896, saving $321 a month. With $7,500 in closing costs, break-even is $7,500 divided by $321, or about 24 months.",
          "That looks like a clear win until you count total interest. The new 30-year loan costs $382,633 in interest — $17,541 more than keeping the old loan — because you stretched 25 years of payments back out to 30. Break-even alone is not enough: it answers the monthly question, not the total-cost question.",
          "The fix is to match the term to what remains. The same $300,000 at the same example 6.5%, over 25 years instead of 30, costs $2,026 a month — still $191 less than now — and total interest falls to $307,686, saving $57,406. Break-even stretches to about 39 months, because the monthly saving is smaller. Ask your lender to quote your remaining term, not just 30 years.",
          "Run your own numbers in the Refinance Calculator: enter your current balance, rate, and remaining term, then the new rate, term, and closing costs from your Loan Estimate. It returns the break-even month and lifetime savings."
        ],
        "table": {
          "head": [
            "Loan",
            "Monthly payment",
            "Total interest",
            "Monthly saving",
            "Break-even on $7,500 costs"
          ],
          "rows": [
            [
              "Current: $300,000 at 7.5%, 25 years left",
              "$2,217",
              "$365,092",
              "—",
              "—"
            ],
            [
              "Refinance: $300,000 at example 6.5%, 30 years",
              "$1,896",
              "$382,633",
              "$321",
              "About 24 months"
            ],
            [
              "Refinance: $300,000 at example 6.5%, 25 years",
              "$2,026",
              "$307,686",
              "$191",
              "About 39 months"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Your rate can fall at least 0.5 to 1 percentage point.",
          "Your adjustable-rate mortgage is about to reset, and you want a fixed rate before the payment jumps.",
          "Your home has gained enough value to drop mortgage insurance — 80% loan-to-value or below removes PMI on a conventional loan.",
          "You want a shorter term and can afford the higher payment, cutting years of interest.",
          "You need cash for a high-value purpose, and cash-out terms beat a home equity loan."
        ],
        "heading": "When refinancing makes sense",
        "paragraphs": [
          "The most common reason is a lower rate: a drop of 0.5 to 1 percentage point is the usual threshold where savings outweigh costs on a typical balance. The larger your balance, the smaller the drop you need.",
          "Context helps. Freddie Mac's weekly survey put the average 30-year fixed rate at 7.03% in the week published September 24, 2026, up from 6.95% the week before and 6.30% a year earlier. That average describes a specific borrower — strong credit, 20% down, a conforming purchase loan — so your quote will differ. Homeowners who borrowed near the October 2023 peak, when the survey reached 7.79%, are most likely to clear the rate-drop bar.",
          "Switching from an adjustable-rate mortgage to a fixed rate is the second strong reason. If your ARM is near its first adjustment, refinancing locks in a payment you can plan around instead of gambling on the index. The reverse — fixed to ARM — rarely makes sense unless you are certain you will sell before the first adjustment.",
          "Dropping mortgage insurance is the third. If your home's value has risen or your balance has fallen to 80% of the value, a refinance into a conventional loan without PMI cuts the payment even if the rate barely moves. On a $300,000 loan, PMI at an example 0.6% a year costs $150 a month — real money a refinance removes in one step."
        ]
      },
      {
        "heading": "When refinancing loses money",
        "paragraphs": [
          "The most common way a refinance loses money is a short timeline. If you move in two years and your break-even is 39 months, you pay $7,500 in closing costs to save about $4,600 in payments — a net loss of roughly $2,900. The rate can look excellent and the refinance can still be a bad decision. How long you will stay matters more than the rate quote.",
          "The restarted clock is the second trap: the 30-year refinance at a lower rate cost $17,541 more in total interest than keeping the old loan, because five extra years of payments outweigh a 1-point rate cut. Any refinance that extends your term needs the total-interest comparison, not just the monthly saving.",
          "Small balances make refinancing harder to justify. Closing costs are largely fixed — appraisal, title work, and lender fees cost roughly the same on a $120,000 loan as on a $300,000 one — but the monthly saving shrinks with the balance. On a $120,000 loan, a 1-point rate cut saves about $80 a month; against $5,000 in costs, break-even is over five years. The same cut on a $300,000 loan saves about $200 a month and breaks even in about three years.",
          "Check for a prepayment penalty on your current loan before you apply. Most modern mortgages have none, but if yours does, the penalty belongs in the break-even calculation. Also check your credit: if your score has fallen since you bought the home, the rate you are offered may be higher than the averages you read about, and the savings may not clear the bar."
        ]
      },
      {
        "heading": "Rate-and-term vs cash-out",
        "paragraphs": [
          "A rate-and-term refinance keeps the loan balance the same and changes the rate, the term, or both. It is the simplest refinance, and the break-even test fits it best: the only question is whether the lower payment or shorter term is worth the closing costs.",
          "A cash-out refinance replaces the loan with a larger one and pays you the difference. How much you can borrow depends on the program. On a one-unit primary residence, conventional loans cap the new loan at 80% of the home's value, FHA loans also cap at 80%, and VA loans go up to 100% of the home's reasonable value, including any financed funding fee. USDA loans offer no cash-out option. Individual lenders may set lower caps.",
          "On a $400,000 home with a $300,000 balance, a conventional cash-out at 80% allows a new loan of $320,000 — $20,000 in cash before closing costs. A VA cash-out at 100% allows $400,000, or $100,000 before costs. That extra borrowing power is also extra risk: a VA borrower who takes the full amount owns no equity, and a small fall in home values leaves the loan underwater.",
          "Cash-out refinances carry seasoning rules. A conventional cash-out generally requires the mortgage being paid off to be at least 12 months old, measured from note date to note date, and the borrower to have held title for at least six months. Cash-out rates also run higher than rate-and-term rates, so run the break-even test on the cash-out quote, not the advertised rate.",
          "Use cash-out proceeds for purposes that improve your finances: a renovation that adds value, consolidating high-interest debt you will not re-accumulate, or education. Clearing credit cards with home equity works only if the spending that built the balances stops; otherwise the cards fill up again and the larger mortgage stays."
        ],
        "table": {
          "head": [
            "Loan program",
            "Maximum new loan, one-unit primary home",
            "Cash from a $400,000 home with a $300,000 balance"
          ],
          "rows": [
            [
              "Conventional",
              "80% of appraised value",
              "$20,000 before closing costs"
            ],
            [
              "FHA",
              "80% of appraised value",
              "$20,000 before closing costs"
            ],
            [
              "VA",
              "100% of reasonable value, including financed funding fee",
              "$100,000 before closing costs"
            ],
            [
              "USDA",
              "No cash-out option",
              "Not available"
            ]
          ]
        }
      },
      {
        "heading": "Streamline refinances: FHA and VA",
        "paragraphs": [
          "If your current loan is FHA-insured or VA-backed, a streamline refinance can be faster and cheaper than a standard refinance. Both programs cut the paperwork — no new appraisal, limited credit review — because the loan is already government-backed. Both exist to lower your rate or stabilize your payment, not to take cash out.",
          "The FHA streamline replaces one FHA loan with another. HUD requires seasoning: at least 210 days since the closing date of the loan being refinanced, at least six monthly payments made, and at least six full months since the first payment due date, all measured when the new case number is assigned. Recent payments must be on time. The new loan must also pass a net tangible benefit test: for fixed-to-fixed, the combined rate — interest rate plus annual mortgage insurance premium rate — must fall at least 0.5 percentage points. Cash back is capped at $500, and the new loan carries its own upfront premium of 1.75% of the base loan amount, usually financed in.",
          "The VA's version is the Interest Rate Reduction Refinance Loan, or IRRRL. You must already have a VA-backed loan and certify that you live in the home or used to. The IRRRL must lower your payment with a lower rate, or move you from an adjustable rate to a fixed rate. The VA funding fee is 0.5% — $1,500 on a $300,000 loan — and it can be financed into the loan, as can closing costs. No cash back is allowed beyond a small amount for minor adjustments.",
          "Neither streamline is automatic. FHA streamline borrowers still need on-time payment history, and VA borrowers should still compare lenders: the VA warns that refinance offers promising skipped payments or unusually low rates can be misleading. Run the same break-even test as any refinance — the lower paperwork does not change the arithmetic."
        ]
      },
      {
        "heading": "What refinancing costs",
        "paragraphs": [
          "Refinance closing costs run 2% to 5% of the loan amount, the CFPB's typical range for mortgage closing costs. On a $300,000 refinance, that is $6,000 to $15,000. The line items resemble a purchase closing, minus the costs tied to buying a home: no real estate commission and no transfer tax in most cases, but the lender, appraisal, and title charges still apply.",
          "The table itemizes a $7,500 example — 2.5% of a $300,000 loan, the figure used in the break-even example above. Your costs will differ by lender and state. The origination fee is the most negotiable line: some lenders charge none and recover the cost through a higher rate. Your old escrow balance is refunded after the old loan is paid off, which partly offsets the escrow funding line.",
          "A no-closing-cost refinance is not free. The lender rolls the costs into the loan balance — you borrow $307,500 instead of $300,000 — or charges a higher rate and uses the extra yield to cover them. Financing $7,500 of costs into a 30-year loan at 6.5% costs about $17,000 over the loan's life. The trade can still be right if you plan to move before the standard break-even point; it is the wrong choice if you will keep the loan for many years.",
          "Ask every lender for the same breakdown and compare Section A of the Loan Estimate — the lender's own fees — across quotes. Third-party fees are similar everywhere; lender fees are where quotes diverge and negotiation pays."
        ],
        "table": {
          "head": [
            "Cost",
            "What it covers",
            "Example amount"
          ],
          "rows": [
            [
              "Origination fee",
              "The lender's charge for making the loan (example 1% of the loan)",
              "$3,000"
            ],
            [
              "Appraisal",
              "Independent valuation of the home ordered by the lender",
              "$500"
            ],
            [
              "Title and settlement",
              "Title search, title insurance, and the closing agent's fee",
              "$1,800"
            ],
            [
              "Recording",
              "Government fee to record the new mortgage",
              "$200"
            ],
            [
              "Prepaid interest and escrow",
              "Interest to the first payment date plus escrow funding",
              "$2,000"
            ],
            [
              "Total closing costs",
              "2.5% of the loan — inside the CFPB's typical 2% to 5% range",
              "$7,500"
            ]
          ]
        }
      },
      {
        "heading": "The refinance process, step by step",
        "paragraphs": [
          "Start by checking the three things that decide your rate: credit score, home equity, and debt-to-income ratio. Pull your credit reports at annualcreditreport.com — the federally authorized source — and dispute errors, since corrections take about 30 days. Estimate equity from recent comparable sales, not an automated estimate. The DTI guideposts match a purchase: Fannie Mae 36% to 45%, FHA 31% front-end and 43% back-end, VA 41%.",
          "Gather documents before you apply: recent pay stubs, W-2s or tax returns, bank statements, your current mortgage statement, and your homeowners insurance declarations page. Self-employed borrowers should expect two years of tax returns.",
          "Apply with at least three lenders and compare the Loan Estimates side by side. Federal rules require each lender to send one within three business days of your application, in a standard format. Compare the rate, the lender fees in Section A, and the estimated cash to close — not just the monthly payment. Scoring models treat multiple mortgage inquiries within a short window — typically 14 to 45 days — as a single inquiry, so keep the shopping inside one two-week stretch.",
          "Once you choose a lender, decide on a rate lock. A lock holds your rate, usually 30 to 60 days; if it expires before closing, you pay to extend it or accept the current rate. A 45-day lock on a 30-day timeline leaves room for appraisal delays. Then the appraisal is ordered, underwriting verifies your file, and the lender sends the Closing Disclosure at least three business days before closing. Compare it line by line with the Loan Estimate; most fees cannot change, and if a number moved, ask why before you sign.",
          "At closing you sign the new note and mortgage, and the new lender pays off the old loan. Federal law then gives you three business days to cancel the refinance on your primary residence, for any reason — the right of rescission. Saturdays count as business days; Sundays and federal holidays do not, and the cancellation must be in writing. The right does not apply to purchase loans, or to a rate-and-term refinance with your current lender that adds no new money. The loan funds after the rescission period ends, and your first payment on the new loan is usually due the following month."
        ]
      }
    ],
    "seoTitle": "How to Refinance Your Mortgage: Break-Even Guide",
    "slug": "how-to-refinance-your-mortgage",
    "sources": [
      {
        "label": "Consumer Financial Protection Bureau — Buying a house",
        "url": "https://www.consumerfinance.gov/owning-a-home/"
      },
      {
        "label": "Freddie Mac — Primary Mortgage Market Survey",
        "url": "https://www.freddiemac.com/pmms"
      },
      {
        "label": "U.S. Department of Veterans Affairs — Interest rate reduction refinance loan",
        "url": "https://www.va.gov/housing-assistance/home-loans/loan-types/interest-rate-reduction-loan/"
      },
      {
        "label": "U.S. Department of Housing and Urban Development — Single Family Housing Policy Handbook 4000.1",
        "url": "https://www.hud.gov/sites/default/files/OCHCO/documents/40001-hsgh-Update-17.pdf"
      }
    ],
    "title": "How to Refinance Your Mortgage",
    "type": "How-to",
    "updated": "2026-10-01"
  },
  {
    "cornerstone": false,
    "description": "Closing costs typically run 2% to 5% of your loan amount. Learn what each fee covers, who pays it, and how the Closing Disclosure protects you at the table.",
    "faqs": [
      {
        "question": "Are closing costs part of the down payment?",
        "answer": "No. The down payment buys equity in the home, and closing costs pay for the services and prepaid obligations that complete the purchase. Both are due at settlement, and the Closing Disclosure lists them separately. On the $300,000 example in this guide, the buyer pays $60,000 down plus $7,751 in closing costs, for $67,751 in total cash to close before credits."
      },
      {
        "question": "Can closing costs be rolled into the mortgage?",
        "answer": "On a purchase, a buyer generally cannot add closing costs to the loan amount, because the loan is sized against the home's value. The usual ways to cut the cash due are a seller credit, a lender credit in exchange for a higher rate, or a grant. On a refinance, closing costs can often be added to the new loan balance if the loan-to-value ratio allows it."
      },
      {
        "question": "How much are closing costs on a $300,000 home?",
        "answer": "With 20% down, the loan is $240,000, and the usual 2% to 5% range puts closing costs at $4,800 to $12,000. The worked example in this guide totals $7,751, or 3.23% of the loan. The exact figure depends on the state, the lender, and the services required, so only a Loan Estimate gives a firm number."
      },
      {
        "question": "Can you negotiate closing costs?",
        "answer": "Yes, some of them. Origination charges are negotiable, and the services in section C of the Loan Estimate, such as title insurance and settlement fees, can be shopped. A seller credit is negotiated in the purchase contract. Government charges such as recording fees and transfer taxes are set by law and do not move."
      },
      {
        "question": "What happens if the Closing Disclosure shows higher costs than the Loan Estimate?",
        "answer": "Federal tolerance rules set the limits. Some costs cannot rise at all, some can rise up to 10% in total, and prepaids and independently shopped services can rise by any amount. If costs rise past the limits without a valid change in circumstances, the lender owes a refund of the excess. Raise any error with the lender before signing."
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/how-closing-costs-work.jpg",
    "imageAlt": "Flat-vector illustration of a green house, a large orange key, and sage document shapes on a cream background",
    "inlineImage": "/images/how-closing-costs-work-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of stacked closing documents, an orange checklist clipboard, and a green pen on a cream background",
    "intro": "Closing costs are the fees and prepaid expenses you pay to finalize a mortgage and take ownership of a home. They sit on top of your down payment and typically run 2% to 5% of the loan amount, according to Fannie Mae. On a $240,000 loan, that is $4,800 to $12,000.",
    "published": "2026-10-08",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Closing Cost Calculator",
        "url": "/real-estate/closing-cost-calculator"
      },
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What closing costs are",
        "paragraphs": [
          "Closing costs are the charges a buyer pays to complete a home purchase and set up a mortgage. They pay for the work that makes the sale legal and the loan possible: the lender's underwriting, the appraisal, the title search, the recording of the deed, and the prepaid taxes and insurance that fund the escrow account. The charges appear on two federal disclosure forms, the Loan Estimate and the Closing Disclosure, so the buyer sees every line item before signing.",
          "Closing costs are separate from the down payment. The down payment buys equity in the home. Closing costs buy services and cover obligations that come due at settlement. A buyer who budgets only for the down payment will be short at the closing table. The Consumer Financial Protection Bureau (CFPB) groups the charges into origination and lender charges, discount points, third-party closing costs, government fees, and prepaid expenses and deposits.",
          "Most closing costs are paid once, at settlement. Prepaid items are different. They are costs of owning the home, such as property taxes and homeowner's insurance, that the buyer pays early and the lender holds in escrow. The buyer would pay those bills anyway. Closing simply collects the first installments up front, so the lender knows the taxes and insurance will be paid on time."
        ]
      },
      {
        "heading": "How much closing costs usually run",
        "paragraphs": [
          "Fannie Mae puts the usual range at 2% to 5% of the value of the mortgage, paid in addition to the down payment. The range is wide because the charges depend on the loan size, the state and county, the lender, and the services the transaction needs. A buyer in a state with high transfer taxes pays more than a buyer with the same loan in a state with none.",
          "The percentage is a planning guide, not a quote. Only the Loan Estimate shows the actual charges for a specific loan. Treat a quote that lands far outside the 2% to 5% band as a prompt to ask questions, not as proof of a bad deal. A small loan can carry a higher percentage because several fees are flat amounts, and a large loan in a low-tax state can land near the bottom of the range.",
          "Three factors move the total most. Location sets transfer taxes, recording fees, and title insurance rates, which vary by state. Loan type adds program-specific charges, such as mortgage insurance premiums on some government-backed loans. Timing changes the prepaid interest: closing early in the month means more days of prepaid interest than closing near month-end."
        ],
        "table": {
          "head": [
            "Loan amount",
            "At 2%",
            "At 5%"
          ],
          "rows": [
            [
              "$200,000",
              "$4,000",
              "$10,000"
            ],
            [
              "$240,000",
              "$4,800",
              "$12,000"
            ],
            [
              "$300,000",
              "$6,000",
              "$15,000"
            ],
            [
              "$400,000",
              "$8,000",
              "$20,000"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Owner's title insurance is optional and separate from the lender's policy. It protects the buyer's equity, not the lender's loan.",
          "A survey is not required in every transaction. When the lender requires one, the buyer pays for it.",
          "Home inspection fees are usually paid before closing and do not appear in closing costs.",
          "Real estate agent commissions are negotiated in the purchase contract and are not part of the lender's closing costs."
        ],
        "heading": "The line items on your bill",
        "paragraphs": [
          "Every closing cost falls into one of five groups. The Loan Estimate and Closing Disclosure organize them the same way, so learning the groups once makes both forms readable.",
          "Origination charges pay the lender for making the loan. The CFPB notes that lenders itemize these charges under different names, so the total matters more than any single label. Discount points are optional: one point costs 1% of the loan amount and buys a lower interest rate. Points only pay off if the buyer keeps the loan long enough for the lower payment to recover the upfront cost.",
          "Third-party charges pay for services the lender requires but does not perform. The appraisal confirms the home's value supports the loan. The title search and title insurance protect the lender against ownership claims. Recording fees pay the county to file the deed and mortgage. Prepaid items and escrow deposits are not fees at all: they are the buyer's own taxes and insurance, collected early."
        ],
        "table": {
          "head": [
            "Group",
            "What it covers",
            "Who charges it"
          ],
          "rows": [
            [
              "Origination charges",
              "Application, underwriting, processing, discount points",
              "Lender"
            ],
            [
              "Services you cannot shop for",
              "Appraisal, credit report, flood determination, tax service",
              "Lender's providers"
            ],
            [
              "Services you can shop for",
              "Title search, title insurance, settlement fee, survey",
              "Providers you choose"
            ],
            [
              "Taxes and government fees",
              "Recording fees, transfer taxes",
              "State and local government"
            ],
            [
              "Prepaids and initial escrow",
              "Prepaid interest, insurance premium, tax and insurance deposits",
              "Lender and insurers"
            ]
          ]
        }
      },
      {
        "heading": "A worked example: buying a $300,000 home",
        "paragraphs": [
          "Take a $300,000 purchase with 20% down. The down payment is $60,000 and the loan is $240,000. The example below uses a 6.50% interest rate, property taxes of $3,600 a year, and a homeowner's insurance premium of $1,500 a year. These are assumptions for illustration, not quotes. Every figure in the table follows from them.",
          "The prepaid interest is $240,000 at 6.50% for one year, which is $15,600, divided by 365 days, which is $42.74 a day, times 15 days, which is $641. The escrow deposit is two months of property taxes at $300 a month, which is $600, plus two months of insurance at $125 a month, which is $250, for a total of $850. The nine lines add to $7,751.",
          "That total is 3.23% of the $240,000 loan, inside the usual 2% to 5% range. Cash to close is the $60,000 down payment plus $7,751 in closing costs, which is $67,751. A $3,000 earnest money deposit already paid reduces the amount due at the table to $64,751."
        ],
        "table": {
          "head": [
            "Item",
            "Amount"
          ],
          "rows": [
            [
              "Origination fee (1% of loan)",
              "$2,400"
            ],
            [
              "Appraisal",
              "$450"
            ],
            [
              "Credit report",
              "$60"
            ],
            [
              "Title search and lender's title insurance",
              "$1,100"
            ],
            [
              "Settlement fee",
              "$600"
            ],
            [
              "Recording fees",
              "$150"
            ],
            [
              "Prepaid interest (15 days)",
              "$641"
            ],
            [
              "Homeowner's insurance premium (12 months)",
              "$1,500"
            ],
            [
              "Initial escrow deposit (2 months taxes and insurance)",
              "$850"
            ],
            [
              "Total closing costs",
              "$7,751"
            ]
          ]
        }
      },
      {
        "heading": "Cash to close is not the same as closing costs",
        "paragraphs": [
          "Closing costs are one part of cash to close. Cash to close is the total amount the buyer must bring to settlement: the down payment plus closing costs, minus the earnest money deposit and any seller or lender credits, plus or minus prorated items such as property taxes and HOA dues. The Closing Disclosure shows it on page 3 as a single figure.",
          "Prorations adjust for bills that span the closing date. If the seller prepaid property taxes for the year, the buyer reimburses the seller for the months after closing. If taxes are due but unpaid, the seller credits the buyer for the months before closing. The same logic applies to HOA dues and, in some transactions, to heating oil or other prepaid supplies.",
          "The buyer pays cash to close by cashier's check or wire transfer. Personal checks are not accepted for large sums. A buyer wiring funds should confirm the wiring instructions by phone using a number from a trusted source, not from an email, because criminals send fake instructions that redirect the payment. The lender and settlement agent confirm the final figure before the transfer."
        ]
      },
      {
        "heading": "Who pays what",
        "paragraphs": [
          "The buyer pays most closing costs. The CFPB states that a buyer generally pays all of the costs of the transaction, although the seller may pay for some of them depending on the contract or state law. The seller's own costs, such as the remaining mortgage payoff and any agent commission the seller agreed to, are separate and appear on the seller's side of the settlement statement.",
          "Three parties can reduce what the buyer brings to the table. The seller can offer a credit toward the buyer's closing costs, negotiated into the purchase contract. The lender can offer a credit in exchange for a higher interest rate. A grant or gift from a family member, employer, or assistance program can cover specific fees. Fannie Mae notes that seller concessions, grants, and family gifts are all possible sources of help.",
          "None of these credits is free money. A seller who grants a credit usually expects a higher sale price. A lender credit trades lower cash today for higher payments over the life of the loan. A buyer should compare the total cost of each option, not just the cash due at closing. The Closing Disclosure shows every credit on page 3, so the buyer can see exactly who paid for what.",
          "Loan programs also cap seller contributions. For a conventional loan sold to Fannie Mae, the maximum seller contribution for a primary residence or second home depends on the loan-to-value ratio: 3% of the lower of the sale price or appraised value when the ratio is above 90%, 6% when it is 75.01% to 90%, and 9% when it is 75% or lower. A credit above the cap cannot be applied to the buyer's costs."
        ]
      },
      {
        "heading": "The Closing Disclosure and the three-business-day rule",
        "paragraphs": [
          "The Closing Disclosure is a five-page form that gives the final details of the mortgage: the loan terms, the projected monthly payments, and the closing costs. The lender must give it to the borrower at least three business days before closing. The CFPB created the form under the TILA-RESPA Integrated Disclosure rule, known as TRID, which took effect in October 2015 and replaced the HUD-1 settlement statement.",
          "The three-day window is a review period, not a formality. The borrower compares the final terms and costs against the Loan Estimate received earlier, checks the cash-to-close figure on page 3, and raises questions before signing. Sundays and federal holidays do not count as business days for this deadline, so a disclosure received on a Thursday cannot support a closing the following Monday, because only Friday and Saturday count as business days in between.",
          "Three changes restart the clock. If the annual percentage rate becomes inaccurate, the loan product changes, or a prepayment penalty is added, the lender must issue a corrected Closing Disclosure and the borrower gets a new three-business-day review period. Smaller corrections, such as a corrected fee, do not restart the wait.",
          "The rule has limits. A borrower does not receive a Closing Disclosure for a reverse mortgage, a home equity line of credit, or a manufactured housing loan not secured by real estate. Those loans use other disclosures. A cash purchase has no lender and no Closing Disclosure at all."
        ]
      },
      {
        "bullets": [
          "Page 1, loan terms: the loan amount, interest rate, and monthly principal and interest payment. A lower rate with higher closing costs is not automatically the better loan.",
          "Page 1, estimated cash to close: the total the buyer brings to settlement. It combines the down payment, closing costs, and credits.",
          "Page 2, section A, origination charges: the lender's own fees and the most direct measure of what the lender charges.",
          "Page 2, section J, total closing costs: the headline number for comparing lenders, but check which lines drive it.",
          "Page 3, comparisons: the total paid in five years and the annual percentage rate. The APR rolls the rate and most closing costs into one yearly figure."
        ],
        "heading": "How to compare Loan Estimates",
        "paragraphs": [
          "The lender must deliver a Loan Estimate within three business days of receiving the application. The form uses the same layout for every lender, which makes comparison a matter of reading the same boxes on each form rather than decoding different formats. Fannie Mae recommends comparing estimates from at least three lenders and requesting the same loan type from each so the comparison is direct.",
          "Rate shopping has a limited effect on the credit score. Fannie Mae notes that credit checks from multiple lenders within a 45-day period count as a single inquiry. A buyer who shops within that window does not take a separate score hit from each lender.",
          "A Loan Estimate is not a loan approval and not a commitment from either side. It is an estimate the lender must stand behind within the tolerance limits described below. The estimate becomes binding in practice when the borrower locks the rate and the lender issues the Closing Disclosure."
        ]
      },
      {
        "heading": "What can change between the estimate and closing",
        "paragraphs": [
          "Federal tolerance rules limit how much costs can rise between the Loan Estimate and the Closing Disclosure. The CFPB divides closing costs into three groups. A lender that exceeds the limits without a valid change in circumstances owes the borrower a refund of the excess.",
          "A change in circumstances lifts the limits. The CFPB gives examples: the borrower changes the loan type or down payment, the appraisal comes in higher or lower than expected, the borrower's credit changes, or the lender cannot document stated income. When that happens, the lender issues a revised Loan Estimate and the new figures become the baseline.",
          "An unlocked interest rate can change at any time, and even a locked rate can change if the application information changes or the borrower misses the lock window. The Loan Estimate shows on page 1 whether the rate is locked and until when. A borrower who finds an error on the Closing Disclosure should contact the lender before closing rather than signing and disputing later."
        ],
        "table": {
          "head": [
            "Category",
            "Limit",
            "Examples"
          ],
          "rows": [
            [
              "Cannot increase at all",
              "0%",
              "Lender and broker fees, transfer taxes"
            ],
            [
              "Can increase up to 10% in total",
              "10%",
              "Recording fees, services from the lender's provider list"
            ],
            [
              "Can increase by any amount",
              "No limit",
              "Prepaid interest, insurance premiums, escrow deposits, services shopped independently"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Get Loan Estimates from at least three lenders and ask each to match the best origination charges.",
          "Shop for the services in section C of the Loan Estimate: title insurance, settlement services, and the survey. The lender must provide a list of providers, and the buyer may choose a company off the list with the lender's agreement.",
          "Ask the seller for a closing cost credit in the offer, and check the program cap on seller contributions before agreeing on an amount.",
          "Consider a lender credit only after comparing the higher monthly payment against the cash saved. On a $240,000 loan at 6.50%, a 0.25-point higher rate adds about $40 a month, or about $14,282 over 30 years.",
          "Close near the end of the month to cut prepaid interest. Closing on the 28th instead of the 5th saves 23 days of prepaid interest, about $983 on the example loan.",
          "Ask whether any fee can be waived. Application and processing fees are sometimes negotiable, and some lenders waive them to win the loan.",
          "Check for grants and assistance programs. Fannie Mae points to grants from municipalities, nonprofits, employers, and churches, and to family gifts, as sources that can cover fees."
        ],
        "heading": "How to lower your closing costs",
        "paragraphs": [
          "Some closing costs are fixed by law or by the transaction. Transfer taxes and recording fees do not move. The rest respond to shopping, negotiation, and timing.",
          "The cheapest closing is not always the cheapest loan. A no-closing-cost loan rolls the costs into a higher rate or a larger loan balance, and the borrower pays for them over years. Compare the total cost over the time the buyer expects to keep the loan, not just the cash due at the table."
        ]
      }
    ],
    "seoTitle": "How Closing Costs Work: Fees, Examples & Savings",
    "slug": "how-closing-costs-work",
    "sources": [
      {
        "label": "CFPB: What is a Closing Disclosure?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-closing-disclosure-en-1983/"
      },
      {
        "label": "CFPB: What costs come with taking out a mortgage?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-costs-come-with-taking-out-a-mortgage-en-153/"
      },
      {
        "label": "CFPB: Can my final mortgage costs increase from what was on my Loan Estimate?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/can-my-final-mortgage-costs-increase-from-what-was-on-my-loan-estimate-en-172/"
      },
      {
        "label": "Fannie Mae: Closing Costs Calculator",
        "url": "https://yourhome.fanniemae.com/calculators-tools/closing-costs-calculator"
      }
    ],
    "title": "How Closing Costs Work",
    "type": "What",
    "updated": "2026-10-08"
  },
  {
    "cornerstone": false,
    "description": "A home equity loan turns your home's value into a lump sum at a fixed rate. Learn how much you can borrow, what it costs, and how it compares to a HELOC.",
    "faqs": [
      {
        "answer": "Multiply your home's value by the lender's maximum combined loan-to-value ratio, usually 80% to 85%, then subtract your mortgage balance. On a $400,000 home with a $250,000 mortgage, an 80% cap allows a $70,000 loan. Your income, debts, and credit score can lower that figure, and the appraisal sets the value.",
        "question": "How much can I borrow with a home equity loan?"
      },
      {
        "answer": "It depends on the expense. A home equity loan fits a one-time cost with a known price, because you get a lump sum at a fixed rate with equal payments and a set payoff date. A HELOC fits costs that arrive in stages, because you draw only what you need — but the rate is usually variable and the payment rises when the repayment period starts.",
        "question": "Is a home equity loan better than a HELOC?"
      },
      {
        "answer": "Typically two to six weeks from application to funding. The lender needs time for the appraisal, income and credit checks, and underwriting, and federal law adds a three-business-day waiting period after closing before the money is released. Having your pay stubs, tax returns, and mortgage statement ready speeds the process.",
        "question": "How long does it take to get a home equity loan?"
      },
      {
        "answer": "Possibly, but it costs more. Each lender sets its own credit minimums, and a low score usually means a higher rate, a smaller loan, or a denial. Lenders weigh your equity, income, and debts alongside your score. Paying down other debts and correcting errors on your credit report before you apply can improve the terms you are offered.",
        "question": "Can I get a home equity loan with bad credit?"
      },
      {
        "answer": "Only when you use the loan to buy, build, or substantially improve the home that secures it. Interest on money used for debt consolidation, tuition, or a vacation is not deductible. The deduction covers only the first $750,000 of total mortgage debt, and only if you itemize deductions instead of taking the standard deduction.",
        "question": "Is the interest on a home equity loan tax deductible?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/what-is-a-home-equity-loan.jpg",
    "imageAlt": "Flat vector illustration of an emerald house beside rising bars in sage green and burnt orange on a cream background",
    "inlineImage": "/images/what-is-a-home-equity-loan-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a large emerald key leaning against stacks of burnt orange coins with a sage house behind, on a cream background",
    "intro": "A home equity loan lets you borrow a lump sum against the value you have built up in your home, and repay it in fixed monthly payments over a set term. Your home secures the loan, so the rate is usually lower than an unsecured loan — but missed payments put the house at risk.",
    "published": "2026-10-12",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Home Equity Calculator",
        "url": "/real-estate/home-equity-calculator"
      },
      {
        "name": "HELOC Drawdown",
        "url": "/real-estate/heloc-drawdown-simulator"
      }
    ],
    "sections": [
      {
        "heading": "What a home equity loan is",
        "paragraphs": [
          "A home equity loan is a loan secured by your home that pays out a single lump sum. The Consumer Financial Protection Bureau (CFPB) describes it as a specific amount of money borrowed against the equity of your home. If you already have a mortgage, the home equity loan becomes a second mortgage: a separate loan with its own rate, payment, and payoff date, paid in addition to your first mortgage.",
          "Equity is the part of your home you own outright: the home's value minus what you still owe on the mortgage. A home worth $400,000 with a $250,000 mortgage balance holds $150,000 of equity. You build equity by paying down the mortgage and when the home's value rises. A home equity loan lets you borrow against that equity without selling the home or refinancing the first mortgage.",
          "Most home equity loans carry a fixed interest rate and equal monthly payments that repay the loan in full over a set term. Terms commonly run 5 to 30 years, with 10, 15, and 20 years the most common choices. Because the rate is fixed, your payment never changes, and you know the exact payoff date from the day you sign. A few loans carry adjustable rates, so check the rate type on your Loan Estimate before you commit."
        ]
      },
      {
        "heading": "How much you can borrow",
        "paragraphs": [
          "Lenders size a home equity loan with the combined loan-to-value ratio, or CLTV: your first mortgage balance plus the new loan, divided by the home's value. The formula is simple: multiply your home's value by the lender's maximum CLTV, then subtract your mortgage balance. What is left is the most you can borrow. Each lender sets its own maximum, and most cap CLTV at 80% to 85%. Some lenders go to 90% for strong credit on a primary home, and Fannie Mae permits subordinate financing up to 90% CLTV on a primary residence.",
          "The home's value comes from an appraisal or the lender's valuation, not your estimate. A low appraisal shrinks the loan even if your math looked good. Your income, debts, and credit score can lower the amount further: the CLTV figure is a ceiling, and the lender's underwriting decides how much of it you actually get. Any other liens on the home, including an existing HELOC, count against the same limit.",
          "The table shows what the same home supports at three common caps. The home is worth $400,000 and the mortgage balance is $250,000.",
          "Treat the maximum as a ceiling, not a target. Borrow the amount the project needs and the payment your budget can carry every month for the full term, not the largest check the lender will write."
        ],
        "table": {
          "head": [
            "Lender's CLTV cap",
            "Total debt allowed",
            "Minus mortgage",
            "Most you could borrow"
          ],
          "rows": [
            [
              "80%",
              "$320,000",
              "$250,000",
              "$70,000"
            ],
            [
              "85%",
              "$340,000",
              "$250,000",
              "$90,000"
            ],
            [
              "90%",
              "$360,000",
              "$250,000",
              "$110,000"
            ]
          ]
        }
      },
      {
        "heading": "Worked example: a $70,000 loan on a $400,000 home",
        "paragraphs": [
          "Take a home worth $400,000 with a $250,000 mortgage balance. Equity is $150,000. At an 80% CLTV cap, total debt on the home cannot exceed $320,000, so the largest home equity loan is $70,000 ($320,000 minus $250,000). The borrower still owes $250,000 on the first mortgage and now owes $70,000 on the second, for $320,000 of total debt against a $400,000 home.",
          "Assume the $70,000 loan carries an example fixed rate of 8.00% — an illustration, not a market quote — over 15 years. The monthly principal-and-interest payment is $668.96. Over 180 payments the borrower pays $120,412 in total, including $50,412 of interest. The payment covers only the home equity loan: the first mortgage payment, property taxes, and insurance are separate bills that continue unchanged.",
          "The term changes the cost sharply. The table below prices the same $70,000 loan at the same example 8.00% rate over 10, 15, and 20 years. A shorter term raises the payment but cuts total interest by thousands. A longer term lowers the payment but costs far more interest over the life of the loan.",
          "Closing costs add to the bill. At the CFPB's typical 2% to 5% of the loan amount, this $70,000 loan costs $1,400 to $3,500 to close. Some lenders waive some fees, and some roll them into the loan balance — which raises the amount you pay interest on."
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
              "10 years",
              "$849.29",
              "$31,915",
              "$101,915"
            ],
            [
              "15 years",
              "$668.96",
              "$50,412",
              "$120,412"
            ],
            [
              "20 years",
              "$585.51",
              "$70,522",
              "$140,522"
            ]
          ]
        }
      },
      {
        "heading": "Home equity loan vs HELOC",
        "paragraphs": [
          "The CFPB draws the line plainly. With a home equity loan, you receive the money in one lump sum. With a HELOC, you draw money multiple times from an available maximum, and repaying frees up credit to borrow again. Both are second mortgages secured by your home, and both leave your first mortgage untouched.",
          "A HELOC runs in two phases. During the draw period — the CFPB gives 10 years as an example — you borrow as needed and often pay interest only on what you owe. Then the repayment period starts, often 10 or 20 years, and you repay principal and interest with no more draws. That switch can raise the payment sharply, because principal repayment starts.",
          "Rates split the two products. Home equity loans usually carry a fixed rate; HELOCs usually carry a variable rate built from an index, often the U.S. prime rate, plus a margin the lender adds. When the index moves, the HELOC rate and payment move with it. A HELOC lender can also freeze or reduce your line if your home's value falls sharply or your finances worsen. A funded home equity loan has no line to freeze.",
          "Choose the loan when the cost is known and one payment fits the budget. Choose the HELOC when costs arrive in stages or the total is uncertain — and only if you can carry the higher repayment-period payment."
        ],
        "table": {
          "head": [
            "Feature",
            "Home equity loan",
            "HELOC"
          ],
          "rows": [
            [
              "How you get the money",
              "One lump sum at closing",
              "Draw as needed, up to your limit"
            ],
            [
              "Interest rate",
              "Usually fixed",
              "Usually variable: index plus margin"
            ],
            [
              "Monthly payment",
              "Equal payments from month one",
              "Interest-only in draw, higher later"
            ],
            [
              "Best for",
              "One-time cost with a known price",
              "Costs that arrive in stages"
            ],
            [
              "Access after closing",
              "Fixed amount; a new loan for more",
              "Repaying frees up credit again"
            ]
          ]
        }
      },
      {
        "heading": "Home equity loan vs cash-out refinance",
        "paragraphs": [
          "A cash-out refinance replaces your entire first mortgage with a new, larger one and pays you the difference in cash. If you owe $250,000 on a $400,000 home, a $320,000 cash-out refinance pays off the $250,000 mortgage and hands you $70,000 — the same cash as the home equity loan in the example above, but through one new first mortgage instead of two loans.",
          "Cash-out refinances cap borrowing too. Fannie Mae limits a cash-out refinance to 80% of the home's value for a one-unit primary residence, and 75% for two- to four-unit homes. Fannie Mae also requires the existing first mortgage to be at least 12 months old before a cash-out refinance. A home equity loan has no such seasoning rule, and some lenders allow a higher combined loan-to-value than a cash-out refinance permits.",
          "The deciding factor is usually your first mortgage rate. If that rate is low, a home equity loan leaves it alone and borrows only what you need. A cash-out refinance reprices the whole balance at today's rate, which can raise the payment on money you already owed. Closing costs point the same way: costs apply to the full new loan on a cash-out refinance, but only to the smaller second loan on a home equity loan.",
          "A cash-out refinance fits when your first mortgage rate is high and you would refinance anyway, or when you want a single payment. Otherwise, the home equity loan usually costs less to set up and disturbs less of your existing debt."
        ]
      },
      {
        "heading": "Fixed rate vs variable rate: why the rate type matters",
        "paragraphs": [
          "A fixed rate locks your payment for the life of the loan. You know the payment in month one and in the final month, and you know the total interest before you sign. That certainty is the main reason borrowers pick a home equity loan over a HELOC: the payment cannot rise because rates moved. The trade-off is that a fixed rate does not fall if market rates drop — you would need to refinance to capture a lower rate.",
          "A variable rate moves with an index. The CFPB explains that a HELOC rate is typically an index, such as the U.S. prime rate, plus a margin the lender adds. When the index rises, your rate rises, and your payment rises with it. On a $70,000 balance, a 2-point rate rise adds about $1,400 of interest a year. Lenders cap how far some variable rates can move, but the cap sits well above the starting rate, so budget for the payment at the cap, not at today's rate.",
          "Some HELOCs let you convert part of the balance to a fixed rate during the draw period. That option blunts the risk but does not remove it: the unconverted balance still floats. If payment certainty matters more than flexibility, the fixed-rate loan is the simpler choice."
        ]
      },
      {
        "bullets": [
          "Origination fee: the lender's charge for processing the loan, often a percentage of the loan amount.",
          "Appraisal: the valuation of your home, which sets the equity the lender will lend against.",
          "Title search and insurance: confirms no other claims stand against the property.",
          "Recording fees: the county charge for filing the new lien on your home.",
          "Credit report fee: a small charge for pulling your credit history."
        ],
        "heading": "What a home equity loan costs",
        "paragraphs": [
          "A home equity loan costs more than its interest rate. The CFPB puts typical mortgage closing costs at 2% to 5% of the loan amount, and home equity loans fall in the same range. On a $70,000 loan, that is $1,400 to $3,500 due at closing. Because the loan is smaller than a first mortgage, the dollar total is usually lower — but the percentage is not.",
          "Some lenders waive closing costs or offer a lender credit that covers them. The CFPB notes that lender credits lower your closing costs up front in exchange for a higher interest rate, so a 'no closing cost' loan is not free — you pay for it in the rate over the life of the loan. Ask whether the loan carries a prepayment penalty before you sign: some lenders charge a fee if you pay the loan off early, which punishes exactly the behavior that saves interest.",
          "Compare lenders on the APR and the Loan Estimate, not the headline rate. The APR folds in most fees, and the Loan Estimate lists every charge line by line, so two loans with the same rate can still cost different amounts."
        ]
      },
      {
        "heading": "Is the interest tax deductible?",
        "paragraphs": [
          "Sometimes — and the use of the money decides, not the type of loan. The IRS allows a deduction for home mortgage interest only when the loan is used to buy, build, or substantially improve the home that secures the loan. A kitchen remodel or a new roof qualifies. Debt consolidation, college tuition, a vacation, or a car does not. The rule applies the same way to a home equity loan and a HELOC.",
          "Two limits apply. First, you can deduct interest only on the first $750,000 of total acquisition debt across your main home and second home combined — $375,000 if you are married filing separately. That cap covers your first mortgage plus the home equity loan together. Second, you must itemize deductions on Schedule A. If you take the standard deduction, the interest gives you no tax benefit even when the use qualifies.",
          "The rule changed in 2018. Before then, you could deduct interest on up to $100,000 of home equity debt regardless of how you spent it. The Tax Cuts and Jobs Act suspended that deduction and tied deductibility to home use. The One Big Beautiful Bill Act, signed July 4, 2025, made those rules permanent, with no sunset date. A 'substantial improvement' means work that adds value, extends the home's useful life, or adapts it to a new use — routine repairs and maintenance do not count.",
          "Keep receipts and contracts for any improvement the loan funds. If the IRS asks, those records prove the money went into the home that secures the loan."
        ]
      },
      {
        "bullets": [
          "Check your equity and credit. Work out your home's value minus your mortgage balance, and review your credit report for errors before a lender sees it.",
          "Gather documents: recent pay stubs, tax returns, bank statements, your mortgage statement, and homeowners insurance details.",
          "Compare at least three lenders. The CFPB suggests getting three estimates and comparing them side by side.",
          "Apply and receive a Loan Estimate within three business days, showing the rate, payment, and closing costs.",
          "Complete the appraisal and underwriting. The lender verifies your income, debts, credit, and the home's value.",
          "Review the Closing Disclosure at least three business days before closing, and compare it line by line with the Loan Estimate."
        ],
        "heading": "How to apply",
        "paragraphs": [
          "Applying for a home equity loan looks much like applying for a first mortgage, with the same documents and the same underwriting. Expect the process to take two to six weeks from application to funding, depending on the lender and how fast the appraisal and your paperwork move.",
          "At closing you sign the promissory note and the mortgage or deed of trust that gives the lender its lien on your home. Federal law then gives you three business days to cancel the loan for any reason — the right of rescission. If you cancel in writing within that window, you owe nothing and the lender returns any money you paid. After the window closes, the lender disburses the lump sum."
        ]
      },
      {
        "heading": "The risks: your home is the collateral",
        "paragraphs": [
          "The central risk is simple. Your home secures the loan, so missed payments can lead to foreclosure. The CFPB puts it plainly: if you fall behind or cannot repay on schedule, you could lose your home. A home equity loan turns home value into debt, and the lender collects from the house itself if you stop paying.",
          "Borrowing also shrinks your cushion. A $70,000 loan on a $400,000 home leaves $80,000 of equity untouched at an 80% cap. If home values fall, that cushion shrinks with them, and you can end up owing more than the home is worth. Selling or moving then means paying off both loans from the sale price — and a shortfall comes out of your pocket.",
          "Debt consolidation is the riskiest common use. It swaps unsecured debts, such as credit cards, for a loan secured by your home. The lower rate saves money only if the spending that built the card balances stops. If it does not, the card balances return and the house now carries the old debt too. Before borrowing for any purpose, check that the new payment still fits if your income dips or an emergency hits — and confirm the loan amortizes fully, with no balloon payment due at the end.",
          "A home equity loan is a tool, not a windfall. It works best for a single, defined purpose you can price in advance — a renovation with a firm quote, for example — funded at a payment your budget carries comfortably for the full term."
        ]
      }
    ],
    "seoTitle": "What Is a Home Equity Loan? How It Works & Costs",
    "slug": "what-is-a-home-equity-loan",
    "sources": [
      {
        "label": "Consumer Financial Protection Bureau — What is the difference between a Home Equity Loan and a Home Equity Line of Credit (HELOC)?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-home-equity-loan-and-a-home-equity-line-of-credit-heloc-en-247/"
      },
      {
        "label": "Consumer Financial Protection Bureau — What You Should Know About Home Equity Lines of Credit",
        "url": "https://files.consumerfinance.gov/f/documents/cfpb_heloc-brochure_print.pdf"
      },
      {
        "label": "Internal Revenue Service — Publication 936, Home Mortgage Interest Deduction",
        "url": "https://www.irs.gov/publications/p936"
      },
      {
        "label": "Fannie Mae — Eligibility Matrix (April 1, 2026)",
        "url": "https://singlefamily.fanniemae.com/media/document/pdf/eligibility-matrix-april-1-2026"
      }
    ],
    "title": "What Is a Home Equity Loan?",
    "type": "What",
    "updated": "2026-10-12"
  },
  {
    "cornerstone": false,
    "description": "Paying off your mortgage early can save tens of thousands in interest. We compare extra payments, biweekly plans, lump sums, recasting, and refinancing.",
    "faqs": [
      {
        "answer": "No. On a fixed-rate mortgage, extra principal payments shorten the loan and reduce total interest, but the required monthly payment stays the same until the loan is paid off. If you want a lower payment, ask your servicer about recasting after a lump sum, which recalculates the payment on the lower balance over the remaining term.",
        "question": "Does paying extra on my mortgage lower my monthly payment?"
      },
      {
        "answer": "Usually not. Federal rules under Regulation Z allow a prepayment penalty only on certain fixed-rate qualified mortgages, capped at 2% of the amount prepaid in years one and two and 1% in year three, with nothing allowed after 36 months. FHA and VA loans cannot carry one at all. Check your promissory note or Closing Disclosure to confirm.",
        "question": "Is there a penalty for paying off my mortgage early?"
      },
      {
        "answer": "They are nearly identical. A biweekly plan makes 26 half-payments a year, which equals 13 monthly payments, so the extra payment goes to principal. On a $300,000 loan at 6.5%, biweekly payments save $88,122 while one extra annual payment saves $87,256. You can copy either one free by adding one-twelfth of your payment to each monthly payment as extra principal.",
        "question": "Is a biweekly plan better than one extra payment a year?"
      },
      {
        "answer": "Paying off the mortgage earns a guaranteed return equal to your interest rate: 6.5% on a 6.5% loan. Investing might earn more over decades, but with risk and no guarantee. Pay the mortgage first if your rate is high or you value certainty. Invest first if your rate is low and you can leave the money alone for 10 years or more.",
        "question": "Should I pay off my mortgage or invest the extra money?"
      },
      {
        "answer": "Request a payoff statement from your servicer before the last payment so the amount includes interest through the payoff date. After the payment clears, the servicer releases the lien, closes the escrow account, and refunds any escrow balance, usually within 30 days. Confirm the lien release is recorded with your county, and keep the payoff letter with your house records.",
        "question": "What happens when I make my final mortgage payment?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/how-to-pay-off-your-mortgage-early.jpg",
    "imageAlt": "Flat-vector illustration of a green house beside shrinking orange and sage bars, with house keys hanging from the roof",
    "inlineImage": "/images/how-to-pay-off-your-mortgage-early-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a wall calendar with orange milestone markers, a sage flag on the final date, and a pencil",
    "intro": "You pay off a mortgage by sending extra money to principal, which shrinks the balance interest is charged on. On a $300,000 loan at 6.5%, $200 extra a month saves about $103,000 in interest and ends it almost seven years early. Extra payments, biweekly plans, lump sums, recasting, and refinancing all work the same way, and you can combine them.",
    "published": "2026-10-16",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Mortgage Payoff Calculator",
        "url": "/real-estate/mortgage-payoff-calculator"
      },
      {
        "name": "Biweekly Mortgage Calculator",
        "url": "/real-estate/biweekly-mortgage-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Why extra principal saves so much interest",
        "paragraphs": [
          "A fixed-rate mortgage is amortized, which means your payment stays the same while the split between interest and principal changes every month. Early on, almost all of each payment goes to interest, because interest is charged on the full balance. As the balance falls, the interest portion shrinks and more of each payment reaches principal.",
          "Take a $300,000 loan at 6.5% over 30 years. The principal and interest payment is $1,896.20 a month. The first payment sends $1,625.00 to interest and only $271.20 to principal. Over the full term you pay $382,633 in interest, more than the amount you borrowed. That front-loaded interest is why early extra payments are so powerful: every dollar of principal you pay in year one removes interest charges for up to 29 years.",
          "Every method in this guide works the same way. It either sends more money to principal, or it restructures the loan so principal falls faster. The differences are cost, flexibility, and how much cash you need up front. The rest of this guide uses the same $300,000, 6.5%, 30-year loan for every example, so the savings figures are directly comparable. Your own numbers will differ, but the ranking of the methods holds at any loan size."
        ]
      },
      {
        "heading": "Add extra principal to your monthly payment",
        "paragraphs": [
          "The simplest method is also the most flexible: pay more than the required amount each month and mark the extra as principal. Your required payment never changes, so you can start, stop, or change the amount at any time with no paperwork and no fee. Rounding up is an easy version of this. If your payment is $1,896.20, paying $2,000 sends $103.80 extra to principal every month.",
          "The savings grow fast because extra principal compounds. Each extra dollar lowers the balance, which lowers next month's interest charge, which means more of the following payment goes to principal. The table below shows what happens on the example loan at three extra amounts. An extra $100 a month saves $60,995 and ends the loan four years early. An extra $300 a month saves $135,115 and ends it more than nine years early.",
          "One instruction matters more than the amount: tell your servicer the extra money is for principal. Most online payment portals have a principal-only field or checkbox. If you send extra money without that instruction, some servicers apply it to future payments instead, which earns you nothing. Check your next statement to confirm the extra amount reduced the balance, not the next due date.",
          "A more aggressive version is paying the loan as if it were a 15-year mortgage. On the example loan, the 15-year payment at the same 6.5% rate is $2,613.32 a month. Paying that amount clears the loan in 15 years and cuts total interest to $170,398, a saving of $212,235. Unlike a real refinance, this costs nothing to set up, and you can drop back to the required $1,896.20 in any month you need the cash."
        ],
        "table": {
          "head": [
            "Extra per month",
            "Payoff time",
            "Total interest saved"
          ],
          "rows": [
            [
              "$0",
              "30 years",
              "$0"
            ],
            [
              "$100",
              "26 years",
              "$60,995"
            ],
            [
              "$200",
              "23 years 1 month",
              "$103,449"
            ],
            [
              "$300",
              "20 years 10 months",
              "$135,115"
            ]
          ]
        }
      },
      {
        "heading": "Switch to biweekly payments, or copy them for free",
        "paragraphs": [
          "A biweekly plan splits your monthly payment in half and charges it every two weeks. Because there are 52 weeks in a year, you make 26 half-payments, which equals 13 full monthly payments instead of 12. That one extra payment a year goes entirely to principal, and it arrives steadily through the year rather than in one lump.",
          "On the example loan, biweekly payments of $948.10 finish the loan in 628 payments instead of 360 monthly ones. Total interest falls by $88,122, and the loan ends about 5 years and 10 months early. The mechanism is identical to sending one extra monthly payment a year, which saves $87,256 and ends the loan 5 years and 10 months early. The two approaches differ by about $866 over three decades.",
          "You do not need your servicer's biweekly program to get this result, and you should check what the program costs before signing up. Some servicers charge a setup or monthly fee, and some hold your half-payments and apply them only once a month, which removes the timing benefit. The free alternative is to divide your monthly payment by 12 and add that amount to each monthly payment as extra principal. On the example loan that is $158.02 a month, and it produces nearly the same saving as a biweekly plan with no fees and no enrollment."
        ]
      },
      {
        "heading": "Put lump sums straight to principal",
        "paragraphs": [
          "A bonus, tax refund, inheritance, or the proceeds from selling a car can make a large dent when sent to principal in one payment. A lump sum works best early in the loan, when the balance is highest and the most interest is still ahead of you. The same $20,000 saves far more in year five than it saves in year 25.",
          "On the example loan, a $20,000 lump sum sent to principal after five years of regular payments saves $69,075 in interest and ends the loan 3 years and 10 months early. The balance at that point is $280,833, so the lump sum cuts it to $260,833 in one move. From then on, every monthly payment is calculated against a smaller balance, which is where the saving comes from.",
          "A lump sum is also the least reversible way to pay early. Once the money is in the house, getting it back means selling, refinancing, or borrowing against the home. Before sending a large lump sum, confirm your emergency fund is intact and no higher-interest debt is outstanding. A lump sum is a good use of money you do not need for at least a year. It is a poor use of money you might need next month.",
          "As with monthly extras, mark the payment as principal-only and confirm on your next statement that the balance fell by the full amount. If your loan has a prepayment penalty clause, a large lump sum is the payment most likely to trigger it, so check the terms first. The penalty section below explains how rare those clauses are on modern loans."
        ]
      },
      {
        "heading": "Recast the loan after a lump sum",
        "paragraphs": [
          "Recasting, also called re-amortization, is a different way to use a lump sum. Instead of keeping your payment and shortening the loan, you ask the servicer to recalculate the payment on the lower balance over the remaining term. Your interest rate and your payoff date stay the same. Only the required monthly payment falls.",
          "The Fannie Mae Servicing Guide describes the process: after a borrower makes a substantial principal curtailment and asks for re-amortization, the servicer recalculates the payment using the current balance, the existing rate, and the remaining term, and documents the change on Form 181. Servicers typically charge a fee of $150 to $500 and require a minimum lump sum, often $5,000 to $10,000. The process commonly takes 45 to 60 days.",
          "On the example loan, a $20,000 lump sum after five years followed by a recast cuts the payment from $1,896.20 to $1,761.16, a drop of $135.04 a month for the remaining 25 years. Total interest saved is $20,512. That is far less than the $69,075 saved by keeping the old payment, because the loan still runs to its original end date. A recast trades interest savings for monthly breathing room.",
          "Recasting fits when your rate is already good and your goal is a lower required payment, for example after a drop in income or before retirement. It is not available on every loan. Conventional loans backed by Fannie Mae or Freddie Mac usually allow it, while FHA, VA, and USDA loans generally do not, because those loans are pooled into Ginnie Mae securities that prohibit re-amortization. Ask your servicer whether your loan is eligible, what the minimum lump sum is, and what the fee will be, before you send the money."
        ]
      },
      {
        "heading": "Refinance to a shorter term",
        "paragraphs": [
          "Refinancing replaces your current loan with a new one, and choosing a shorter term is the most direct way to force an early payoff. A 15-year loan has a higher payment but a lower rate than a 30-year loan, and the shorter term means far less total interest. Freddie Mac's Primary Mortgage Market Survey put the average 30-year fixed rate at 7.40% and the average 15-year fixed rate at 6.71% in the week of October 15, 2026.",
          "Take the example loan five years in, with a balance of $280,833. Refinancing that balance into a 15-year loan at 6.71% sets the payment at $2,478.89 a month, which is $582.69 more than the current payment. Remaining interest totals $165,368, compared with $288,028 if the loan stays on its 30-year schedule. The refinance saves $122,660 in interest before closing costs.",
          "Closing costs are the catch. A refinance is a new loan, so it carries application, appraisal, title, and origination charges, and the lender may charge discount points to reach the quoted rate. Divide the total closing costs by your monthly interest saving to find the break-even point. If the costs are $6,000 and the refinance saves $350 a month in interest, you need about 17 months in the home to come out ahead. If you plan to move sooner than that, the refinance loses money.",
          "Refinancing also only works when the new rate is attractive. If your current rate is below today's market rate, refinancing raises your rate and wipes out the benefit of the shorter term. In that case, the pay-as-if-15-years method from the extra-principal section gives you the same payoff date with no closing costs and no rate change. Compare the refinance against simply paying more on the loan you already have before you apply."
        ]
      },
      {
        "heading": "Check for a prepayment penalty first",
        "paragraphs": [
          "A prepayment penalty is a fee for paying off part or all of a loan early. Before 2008 these penalties were common and often lasted five years or more. Federal rules now make them rare. Under Regulation Z, section 1026.43(g), a mortgage can carry a prepayment penalty only if the loan is a fixed-rate qualified mortgage that is not higher-priced, and even then the penalty is capped at 2% of the amount prepaid in the first two years and 1% in the third year. After 36 months, no penalty is allowed at all.",
          "Several loan types cannot carry a penalty under any circumstances. FHA loans allow prepayment in whole or in part at any time with no charge, and VA loans allow prepayment without premium or fee. Adjustable-rate mortgages and higher-priced loans are also excluded by the rule. That leaves a narrow slice of fixed-rate qualified mortgages originated in the last three years as the only loans that might have one, and many lenders do not include the clause even when they could.",
          "Checking takes two minutes. Look at the promissory note you signed at closing, or find the prepayment penalty line in the Loan Terms table on your Loan Estimate or Closing Disclosure, which answers yes or no. If you cannot find the paperwork, call your servicer and ask directly whether your loan has a prepayment penalty and when it expires. A penalty that applies only to a full payoff does not stop you from making small extra principal payments, but a large lump sum can trigger one, so confirm before sending it."
        ]
      },
      {
        "bullets": [
          "Pay off higher-interest debt first: credit cards and personal loans almost always cost more than a mortgage.",
          "Keep a cash emergency fund before sending extra principal; money in the house is hard to reach quickly.",
          "Collect the full employer 401(k) match before prepaying; the match is an immediate return no prepayment matches.",
          "Weigh a low mortgage rate against investing: a 3% loan earns only 3% guaranteed when prepaid.",
          "Check the tax picture: deductible mortgage interest lowers the loan's effective cost if you itemize."
        ],
        "heading": "When not to pay off your mortgage early",
        "paragraphs": [
          "Paying off a mortgage early is a guaranteed return equal to your interest rate. On a 6.5% loan, every extra dollar of principal earns a certain 6.5% by avoiding interest you would otherwise pay. That is a strong return, but it is not always the best use of spare cash. Three situations come first, every time.",
          "First, higher-interest debt. Credit card balances and most personal loans charge far more than a mortgage. Paying those off first earns a higher guaranteed return and frees up monthly cash flow faster. Second, your emergency fund. Money sent to principal is locked in the house. If you lose your job or face a large bill, you cannot pay for it with home equity. Keep a cash reserve you can reach in days before you send extra money to the mortgage.",
          "Third, an employer retirement match you are not collecting. If your employer matches 401(k) contributions, turning down the match means refusing free money. A typical match returns 50% to 100% on the contribution immediately, which no mortgage prepayment can beat. Collect the full match first, then decide how much extra goes to the mortgage.",
          "Beyond those three, the choice is a judgment call. Paying down a low-rate mortgage, for example a 3% loan from 2021, earns only 3% guaranteed, while investing the same money might earn more over decades, with risk. There is also the tax side: mortgage interest may be deductible if you itemize, which lowers the effective cost of the loan. And some borrowers simply value being debt-free more than the last point of return. None of those is wrong. What is wrong is paying extra on the mortgage while a credit card balance grows, while the emergency fund sits empty, or while a 401(k) match goes unclaimed."
        ]
      },
      {
        "heading": "A simple plan to start this month",
        "paragraphs": [
          "Start with the two checks that cost nothing. Confirm your loan has no prepayment penalty, using the note or your Closing Disclosure. Then confirm your emergency fund and higher-interest debts are handled. If either check fails, fix that first and come back to the mortgage later.",
          "Next, pick an amount you can sustain every month. An extra $100 is enough to cut four years off the example loan. Set it up as an automatic extra principal payment through your servicer's portal, or add the amount to your monthly payment and mark it principal-only. Automation matters more than the amount. A $100 payment that happens every month beats a $500 payment that happens twice a year.",
          "After the first extra payment, check your statement. The balance should fall by the extra amount on top of the normal principal portion. If it did not, call the servicer and ask how the payment was applied, then correct the instruction. Servicers sometimes apply unlabeled extra money to future payments, which saves nothing.",
          "Revisit the plan once a year. When income rises, raise the extra amount. When a bonus or tax refund arrives, send part of it to principal. When rates fall enough to make refinancing worthwhile, run the numbers again. The goal is not to pay the mortgage off as fast as physically possible. It is to pay it off as fast as your budget allows without starving the rest of your finances."
        ]
      }
    ],
    "seoTitle": "How to Pay Off Your Mortgage Early (7 Proven Ways)",
    "slug": "how-to-pay-off-your-mortgage-early",
    "sources": [
      {
        "label": "Consumer Financial Protection Bureau — What is a prepayment penalty?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-prepayment-penalty-en-1957/"
      },
      {
        "label": "Freddie Mac — Primary Mortgage Market Survey",
        "url": "https://www.freddiemac.com/pmms"
      },
      {
        "label": "Consumer Financial Protection Bureau — Regulation Z, 12 CFR 1026.43",
        "url": "https://www.consumerfinance.gov/rules-policy/regulations/1026/43/"
      }
    ],
    "title": "How to Pay Off Your Mortgage Early",
    "type": "How-to",
    "updated": "2026-10-16"
  },
  {
    "cornerstone": false,
    "description": "A mortgage denial is usually fixable. Learn the seven most common reasons lenders say no — DTI, credit, appraisal, income — and the exact steps to reapply.",
    "faqs": [
      {
        "answer": "There is no mandatory waiting period after a denial, but reapplying with unchanged numbers usually produces the same result. Reapply once the reason on your adverse action notice is fixed: corrected credit report errors can clear in about 30 days, a paid-down debt changes your DTI as soon as the lender reports the new balance, and credit history problems need months of on-time payments. Ask your lender what changed figure it needs to see before you submit a new application.",
        "question": "How soon can I reapply after a mortgage denial?"
      },
      {
        "answer": "The denial itself does not appear on your credit report and does not lower your score. What does affect your score is the hard inquiry from the application, which typically costs a few points and stays on your report for two years. Multiple mortgage inquiries within a short shopping window are generally treated as a single inquiry for scoring purposes, so comparing lenders in the same period does less damage than spreading applications across months.",
        "question": "Does a mortgage denial hurt my credit score?"
      },
      {
        "answer": "There is no formal appeal process, but you can ask the lender to reconsider when the denial rests on something correctable. If a credit report error caused the denial, send the corrected report and ask for re-underwriting. If income was undercounted, supply the missing documentation. If the appraisal was wrong, request a reconsideration of value with comparable sales. If the lender will not reconsider, a different lender may underwrite the same file differently.",
        "question": "Can I appeal a mortgage denial?"
      },
      {
        "answer": "Sometimes. Lenders add their own overlays — stricter minimums on top of program rules — so a file that fails at one lender can pass at another that underwrites to the program standard. A different loan program can also change the answer: FHA allows higher DTI ratios than conventional loans for some borrowers. But no lender can approve a file that fails the program's own limits, so fix the underlying reason rather than shopping for a lender that ignores it.",
        "question": "Will another lender approve me after a denial?"
      },
      {
        "answer": "Under 36% back-end DTI clears Fannie Mae's manual underwriting ceiling and is a strong position for any program. Between 36% and 45%, conventional approval usually needs compensating factors such as a high credit score and cash reserves. FHA's standard is 43% back-end, rising to 50% with two compensating factors for borrowers with a 580 or higher score. Above 50%, mainstream conventional and FHA options narrow sharply, and paying down debt becomes the priority.",
        "question": "What is a good debt-to-income ratio for a mortgage?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/why-was-my-mortgage-application-denied.jpg",
    "imageAlt": "Flat vector illustration of a house beside a document under a large magnifying glass",
    "inlineImage": "/images/why-was-my-mortgage-application-denied-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a checklist beside a large house key",
    "intro": "A mortgage denial is rarely a final verdict. It means one part of your application — debts, credit, income, assets, or the property — failed that loan program's rules. Your lender must tell you the specific reasons in writing, and most have a concrete fix. This guide covers the seven most common denial reasons and what to do about each.",
    "published": "2026-10-19",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Debt-to-Income Ratio Calculator",
        "url": "/loans/debt-to-income-ratio-calculator"
      },
      {
        "name": "Home Affordability Calculator",
        "url": "/real-estate/home-affordability-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Start with the denial letter",
        "paragraphs": [
          "Your first step is not to guess. It is to read the adverse action notice your lender is legally required to send you. Under the Equal Credit Opportunity Act (ECOA) and its implementing rule, Regulation B, a lender that denies a completed mortgage application must notify you of the decision within 30 days of receiving that completed application, and the notice must state the specific reasons for the denial — or tell you that you can request those reasons in writing within 60 days of the notice. If you ask, the lender must supply the reasons within 30 days.",
          "The reasons must be specific. A letter that says only that you did not meet the lender's standards does not satisfy the rule. The regulation's own sample forms list reasons such as excessive obligations in relation to income and inability to verify income. If your notice is vague, request the specific reasons in writing before the 60-day window closes, and keep a copy of your request.",
          "If the decision relied on your credit report, the Fair Credit Reporting Act adds a second set of disclosures. The lender must give you the numerical credit score it used, the key factors that lowered that score, and the name, address, and phone number of the credit reporting company that supplied the report. It must also tell you that you can get a free copy of that report if you ask the company within 60 days of the notice. That free report is your working document: it shows exactly what the underwriter saw."
        ]
      },
      {
        "heading": "Your debt-to-income ratio was too high",
        "paragraphs": [
          "Debt-to-income ratio (DTI) is the most common reason a mortgage application fails, and it is also the most mechanical. Your back-end DTI divides your total monthly debts — including the proposed mortgage payment — by your gross monthly income. Take a borrower with $7,000 in gross monthly income whose monthly debts total $2,500: a proposed mortgage payment of $1,800, a $400 car payment, and $300 in student loan payments. Her back-end DTI is $2,500 ÷ $7,000 = 0.357, or 35.7%. Add a $500 monthly payment and the math becomes $3,000 ÷ $7,000 = 0.429, or 42.9% — a different underwriting outcome from the same income.",
          "The limits depend on the loan program, and they are published rules, not lender folklore. Fannie Mae's Selling Guide sets a 36% maximum total DTI for manually underwritten loans, extendable to 45% when the borrower meets the credit score and reserve requirements in its Eligibility Matrix, and a 50% maximum for loans underwritten through its Desktop Underwriter system. FHA publishes a matrix in HUD Handbook 4000.1: borrowers with a minimum decision credit score below 580 may not exceed 31% front-end and 43% back-end DTI, while borrowers at 580 or above can reach 37/47 with one compensating factor and 40/50 with two. FHA's automated TOTAL Scorecard can approve ratios above the manual matrix when the rest of the file is strong, but HUD publishes no guaranteed ceiling for those approvals.",
          "If DTI sank your application, you have four levers, and they work in combination. Pay down or pay off a monthly debt: eliminating a $300 student loan payment from the example above drops DTI from 35.7% to 31.4%. Borrow less, which shrinks the mortgage payment in the numerator. Add a co-borrower whose income counts. Or document income the lender did not count — a second job, rental income, or regular overtime — provided you can show the history and paper trail the program requires. Run the numbers before you reapply so the next application lands under the limit with room to spare."
        ],
        "table": {
          "head": [
            "Loan program",
            "Standard limit",
            "With compensating factors"
          ],
          "rows": [
            [
              "Conventional, manual underwriting",
              "36% back-end DTI",
              "Up to 45% with credit score and reserves"
            ],
            [
              "Conventional, Desktop Underwriter",
              "50% back-end DTI",
              "50% is the ceiling"
            ],
            [
              "FHA, score below 580",
              "31% front-end / 43% back-end",
              "No higher ratios available"
            ],
            [
              "FHA, score 580 or above",
              "31% front-end / 43% back-end",
              "37/47 with one factor; 40/50 with two"
            ]
          ]
        }
      },
      {
        "heading": "Your credit score or history fell short",
        "paragraphs": [
          "A denial tied to credit usually names one of three problems: your score was below the program or lender minimum, your history showed recent late payments, collections, or a bankruptcy, or your file was too thin for the lender to judge. Each has a different fix, so read the key factors on your adverse action notice before you act. A score lowered by high balances on revolving accounts is a different problem from a score lowered by a missed payment six months ago.",
          "High credit card balances are the fastest fix. Utilization — the share of your available credit you are using — is a major scoring input, and paying a card from 80% utilized to under 30% can move a score within one or two billing cycles, because lenders report balances monthly. Late payments are slower: a missed payment stays on your report for up to seven years, but its effect fades as it ages and as on-time payments pile up after it. A thin file, where the bureau cannot generate a score at all, needs time and at least one account reporting on-time payments.",
          "Do not open a batch of new credit cards to fix a thin file the month before you reapply. New accounts lower your average account age and add hard inquiries, and a lender will ask you to explain every new account opened during underwriting. The steadier route is to pay every account on time, keep balances low, leave old cards open, and let the file age. If the denial letter cites a specific account — a collection you do not recognize, for example — treat it as a possible error and dispute it, as described later in this guide."
        ]
      },
      {
        "heading": "Your income did not qualify",
        "paragraphs": [
          "Lenders count only income they can verify and expect to continue. That distinction trips up borrowers whose real earnings are higher than their qualifying income. Cash tips without a paper trail, a new side business with one year of returns, and a salary that started last month all fall into this gap. Underwriters generally want a two-year history for variable income such as bonuses, overtime, and commissions, and self-employed borrowers qualify on net income after expenses, not gross revenue — a freelancer who earns $120,000 and deducts $45,000 in expenses qualifies on roughly $75,000, or $6,250 a month.",
          "A recent job change can also stall an application, even when the new job pays more. Lenders look for stability: a move to the same field at equal or higher pay is usually fine once you have a pay stub or two, but a switch to a new industry, a move from salary to commission, or a gap between jobs raises questions the underwriter must resolve with documentation. If you changed jobs during the application and did not tell your lender, the verification of employment at closing can surface the change and stop the loan.",
          "The fix depends on which problem you have. If income is simply too low for the price, the honest options are a cheaper home, a larger down payment to shrink the loan, or a co-borrower. If income exists but was not counted, gather the documentation: two years of tax returns and W-2s, year-to-date pay stubs, a written verification of employment, and for rental income, leases and tax returns showing the rent. Do not inflate figures on a new application. Stated income that the lender cannot verify is a denial reason by itself, and a pattern of it can kill the file permanently."
        ]
      },
      {
        "heading": "The appraisal came in below the price",
        "paragraphs": [
          "A low appraisal is a denial about the property, not about you — but it blocks the loan all the same. The lender bases the loan on the lower of the purchase price or the appraised value. Suppose you offer $350,000 with 20% down: a $70,000 down payment and a $280,000 loan. If the home appraises at $330,000, the lender sees a $20,000 gap, and your loan-to-value ratio becomes $280,000 ÷ $330,000 = 0.848, or 84.8%. To hold an 80% loan-to-value ratio on the appraised value, the largest loan is 0.80 × $330,000 = $264,000, which means $350,000 − $264,000 = $86,000 in cash — $16,000 more than you planned.",
          "You have five options when this happens. Renegotiate the price down to the appraised value, which is the cleanest outcome and common when the seller has no better offer. Pay the difference in cash, if you have it and still want the home at that price. Challenge the appraisal through a reconsideration of value, supplying comparable sales the appraiser missed — this works best when you can point to specific, recent, nearby sales. Switch lenders and get a second appraisal, though you pay for another appraisal and the result may not change. Or walk away, if your contract has an appraisal contingency that lets you cancel and recover your earnest money.",
          "A low appraisal can also be a warning worth heeding. If two appraisals agree the home is worth less than the contract price, you may be overpaying, and the extra cash you bring to closing is money you will not recover if you sell soon. Weigh the gap against how long you plan to stay and whether the home's value is likely to catch up to the price."
        ]
      },
      {
        "heading": "You did not have enough assets or reserves",
        "paragraphs": [
          "Underwriters check two different pots of money: the cash you need to close, and the reserves left over after closing. The first covers the down payment, closing costs, and prepaid items such as insurance and property taxes. The second — reserves — is what remains in your accounts after you pay all of that, and it matters because it shows you can keep paying the mortgage if your income is interrupted. FHA counts reserves as a compensating factor when verified funds after closing equal at least three total monthly mortgage payments on a one- or two-unit property, or six payments on a three- or four-unit property.",
          "Large, unexplained deposits are a separate trap. A $9,000 cash deposit the week before closing will draw a question the underwriter must answer with a paper trail, and money the lender cannot source may be excluded from your qualifying assets entirely. Gift funds are allowed on most programs, but they need a gift letter stating the money is not a loan, plus a paper trail from the donor's account to yours. Borrowed down payment funds are not allowed as a gift, and undisclosed loans discovered late in the process can end the application.",
          "If assets were the reason, the fix is time and documentation rather than a new lender. Save until your verified funds cover closing plus reserves, keep the money in one account for at least two statement cycles so the paper trail is clean, and document every deposit over the lender's threshold as it happens. Moving money between accounts during underwriting creates more questions than it answers."
        ]
      },
      {
        "heading": "The property itself failed underwriting",
        "paragraphs": [
          "Some denials have nothing to do with the borrower. Lenders will not finance a home they cannot resell if you default, so condition, legal status, and marketability all get reviewed. Common property problems include a roof at the end of its life, foundation damage, an unpermitted addition the appraiser cannot count as living space, a septic system that fails inspection, or a home in a flood zone where the required flood insurance pushes the monthly payment past your DTI limit.",
          "Condominiums carry their own checklist. The lender reviews the association's budget, reserves, pending litigation, and the share of units that are owner-occupied versus rented. A building in litigation over construction defects, or one with a high share of investor-owned units, can fail a conventional program's project review even when your finances are strong. FHA has a separate condo approval list, and a building that is not on it cannot be financed with an FHA loan at all.",
          "Your options depend on the problem. Repairs the seller completes before closing can clear a condition issue, and a seller credit can fund repairs in some programs. An unpermitted addition may need retroactive permits, which take time the contract may not allow. If the property cannot be fixed within your timeline, the right move is to release the contract under its inspection or financing contingency and apply the same preapproval to a different home."
        ]
      },
      {
        "heading": "Errors on the application or your credit report",
        "paragraphs": [
          "Mistakes cause denials more often than borrowers expect, and they are the most satisfying to fix because nothing about your finances needs to change. Application errors include transposed income figures, a debt listed twice, a co-borrower's account attributed to you, or an employer name the verification service cannot match. Credit report errors include accounts that are not yours, a paid collection still showing as open, a wrong balance, or a mixed file where another person's accounts appear on your report.",
          "Start with your free reports from annualcreditreport.com, the only federally authorized source for free credit reports. The CFPB notes that you can check all three reports — Equifax, Experian, and TransUnion — for free every week through that site. Pull all three, because the lender's tri-merge report combines them and an error on one bureau's file is enough to change the outcome. Compare every account, balance, and payment status against your own records, and flag anything you do not recognize.",
          "Dispute each error with the credit reporting company and with the company that furnished the information, in writing, with copies of supporting documents. Under the Fair Credit Reporting Act, the bureau generally has 30 days to investigate. Keep copies of everything you send and every response you receive. Once an error is corrected, ask your lender whether it will re-run underwriting with the corrected report — some lenders will do this without a new application, and a rapid rescore through the lender can update the file faster than waiting for the next reporting cycle."
        ]
      },
      {
        "bullets": [
          "Request the specific denial reasons in writing if your notice does not list them — you have 60 days.",
          "Pull all three credit reports free at annualcreditreport.com and dispute every error with the bureau and the furnisher.",
          "Recalculate your back-end DTI with the real numbers, and confirm it clears the limit for your loan program.",
          "Fix the named problem before reapplying: pay down debt, document income, save for reserves, or repair the property issue.",
          "Get a fresh preapproval after the fix, and compare Loan Estimates from at least two lenders before you sign a new contract."
        ],
        "heading": "Your plan to reapply",
        "paragraphs": [
          "A denial is a diagnosis, not a sentence, but reapplying immediately with the same numbers wastes a hard inquiry and usually produces the same answer. Work the fix first, then reapply when the numbers have actually changed. The order matters: disputes and documentation fixes can clear in weeks, DTI fixes depend on how fast you can pay down debt or document income, and credit history fixes take months of on-time payments. Match your timeline to the reason on your notice, not to your impatience to close.",
          "When you are ready, consider whether a different loan program or lender fits better. A borrower denied on a conventional loan at 48% DTI may qualify for an FHA loan, and a borrower denied by one lender's overlays — stricter rules the lender adds on top of program minimums — may pass at a lender that underwrites to the program standard. Shopping lenders is legitimate: compare Loan Estimates on the same day for the same loan amount and terms, and ask each lender to confirm in writing which program rule your file failed last time."
        ]
      }
    ],
    "seoTitle": "Why Was My Mortgage Application Denied? 7 Reasons",
    "slug": "why-was-my-mortgage-application-denied",
    "sources": [
      {
        "label": "Fannie Mae Selling Guide B3-6-02, Debt-to-Income Ratios",
        "url": "https://selling-guide.fanniemae.com/sel/b3-6-02/debt-income-ratios"
      },
      {
        "label": "HUD Handbook 4000.1, FHA Single Family Housing Policy Handbook",
        "url": "https://www.hud.gov/hud-partners/single-family-handbook-4000-1"
      },
      {
        "label": "CFPB: What can I do if my credit application was denied because of my credit report?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/my-credit-application-was-denied-because-of-my-credit-report-what-can-i-do-en-1253/"
      },
      {
        "label": "CFPB: How do I dispute an error on my credit report?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-an-error-on-my-credit-report-en-314/"
      }
    ],
    "title": "Why Was My Mortgage Application Denied?",
    "type": "Troubleshooting",
    "updated": "2026-10-19"
  },
  {
    "cornerstone": false,
    "description": "Compare FHA and conventional loans for 2026: down payments, credit scores, MIP vs PMI costs, loan limits, and a side-by-side payment example on a $350,000 home.",
    "faqs": [
      {
        "answer": "No. FHA is usually cheaper to get into, with a 3.5% minimum down payment at a 580 credit score, but more expensive to hold. Its 1.75% upfront premium is financed into the loan, and at less than 10% down the annual mortgage insurance lasts the life of the loan. A conventional loan with the same down payment has no upfront premium, and its PMI cancels at 80% loan-to-value on request or 78% automatically.",
        "question": "Is an FHA loan always cheaper than a conventional loan?"
      },
      {
        "answer": "Probably not. Fannie Mae no longer sets a minimum score for loans approved through its automated system, but manually underwritten loans still need 620 for a fixed rate, and most lenders apply a 620 minimum of their own. A 580 score qualifies for an FHA loan with 3.5% down, which is the mainstream option at that score. Improving your score to 620 opens conventional loans and their cancellable PMI.",
        "question": "Can I get a conventional loan with a 580 credit score?"
      },
      {
        "answer": "It depends on your down payment. With less than 10% down, annual MIP lasts for the life of the loan and never cancels on its own. With 10% or more down, it lasts 11 years. The 1.75% upfront premium is a one-time charge, usually financed into the loan. The only way to end lifetime MIP early is to refinance into a conventional loan once you have enough equity and a qualifying credit score.",
        "question": "How long does FHA mortgage insurance last?"
      },
      {
        "answer": "Under the Homeowners Protection Act, you can ask your servicer in writing to cancel PMI once your balance is scheduled to reach 80% of the home's original value, if you are current with a good payment history, have no junior liens, and can show the value has not fallen. If you do nothing, the servicer must end it automatically at 78% of original value, or at the loan's midpoint at the latest.",
        "question": "How do I cancel PMI on a conventional loan?"
      },
      {
        "answer": "For a one-unit home in 2026, the FHA limit is $541,287 in most counties and up to $1,249,125 in high-cost areas, with $1,873,625 in Alaska, Hawaii, Guam, and the U.S. Virgin Islands. Your county's limit is what matters, and it applies to the base loan amount before the financed upfront premium. The conforming limit for conventional loans is higher in most counties at $832,750.",
        "question": "What is the maximum FHA loan amount in 2026?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/fha-vs-conventional-loans.jpg",
    "imageAlt": "Flat-vector illustration of two houses side by side, one emerald green with a government seal motif and one burnt orange",
    "inlineImage": "/images/fha-vs-conventional-loans-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a balance scale holding a small house on each pan",
    "intro": "An FHA loan is usually the cheaper way in and the more expensive way to stay. It accepts a 580 credit score and 3.5% down, but its mortgage insurance lasts the life of the loan at that down payment. A conventional loan demands stronger credit, yet its insurance cancels — and with 20% down, there is none at all.",
    "published": "2026-10-23",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "FHA Loan Calculator",
        "url": "/real-estate/fha-loan-calculator"
      },
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What an FHA loan is",
        "paragraphs": [
          "An FHA loan is a mortgage insured by the Federal Housing Administration, part of the U.S. Department of Housing and Urban Development. The government does not lend the money: a private lender makes the loan, and FHA insurance protects that lender if you default. That insurance lets lenders accept smaller down payments and lower credit scores than a conventional loan allows.",
          "Every FHA loan carries mortgage insurance, in two parts: an upfront premium of 1.75% of the base loan amount, usually financed into the loan, plus an annual premium collected monthly. No down payment avoids FHA mortgage insurance entirely — the single biggest structural difference from a conventional loan.",
          "FHA loans are for a primary residence only; FHA does not finance second homes or investment properties. The home must also pass an FHA appraisal checking minimum property standards for safety, soundness, and security, so a fixer-upper with a failing roof can fail to qualify even if you do. Condominiums must be in FHA-approved projects, which rules out some buildings.",
          "FHA sets no income limit, and it is more forgiving on debt. Its standard debt-to-income limits are 31% for the housing payment and 43% for all debts, but manually underwritten files can reach 37% and 47% with one compensating factor, or 40% and 50% with two, and automated approvals can go higher still. That room matters when student loans or car payments push total debt past what conventional underwriting accepts."
        ]
      },
      {
        "heading": "What a conventional loan is",
        "paragraphs": [
          "A conventional loan is any mortgage not insured or guaranteed by a government agency. Most are conforming loans, meaning they meet the underwriting rules of Fannie Mae and Freddie Mac, the two government-sponsored companies that buy mortgages from lenders. A loan that exceeds the conforming limit, or breaks another of their rules, is non-conforming and usually costs more.",
          "With no government agency insuring the loan, the lender carries the risk, and the terms reflect it. Conventional underwriting weighs your credit score heavily: it sets your rate, decides whether you qualify, and prices your mortgage insurance. A borrower with a 760 score gets materially better pricing than one with a 660 score. FHA pricing, by contrast, barely moves with credit score.",
          "Conventional loans work for primary residences, second homes, and investment properties, though the down payment minimum rises for the last two. They also offer more ways to structure the deal: 3% down as a first-time buyer, 20% down to skip mortgage insurance entirely, or lender-paid mortgage insurance, where the lender covers the insurance for a higher rate. That flexibility is the main reason conventional loans win for borrowers who qualify.",
          "One more difference: conventional loans have no upfront insurance premium. FHA charges 1.75% of the loan before you make a single payment — $5,910.63 on a $337,750 loan — and because most borrowers finance it, it adds to the balance you pay interest on for 30 years."
        ]
      },
      {
        "heading": "Down payment and credit score minimums",
        "paragraphs": [
          "FHA's minimums are fixed by HUD. With a credit score of 580 or higher, the minimum down payment is 3.5%. With a score of 500 to 579, you can still qualify, but the minimum down payment rises to 10%. Below 500, FHA will not insure the loan. Lenders may set stricter minimums of their own, but these are the program floors.",
          "Conventional minimums are less absolute. Since a rule change in late 2025, Fannie Mae sets no minimum credit score for loans approved through its automated system, Desktop Underwriter; the system weighs the score against the rest of the file. Manually underwritten loans still need at least 620 for a fixed rate and 640 for an adjustable rate. In practice, most lenders still apply a 620 minimum of their own, so treat 620 as the realistic floor.",
          "On down payment, conventional loans go as low as 3% for eligible first-time buyers and for Fannie Mae's HomeReady and Freddie Mac's Home Possible programs, which cap qualifying income at 80% of the area median income for the property's location. The standard minimum for other buyers on a one-unit primary residence is 5%; second homes need 10%, and one-unit investment properties 15%.",
          "The practical gap is narrower than it looks. A first-time buyer with a 620 score can put 3% down on a conventional loan, half a point less than FHA's 3.5%. FHA's real advantage is not the down payment; it is the credit score floor. A buyer at 580 to 619 has no conventional path at most lenders."
        ],
        "table": {
          "head": [
            "Requirement",
            "FHA",
            "Conventional"
          ],
          "rows": [
            [
              "Minimum credit score",
              "580 (3.5% down); 500 with 10% down",
              "620 in practice; none set for automated approvals"
            ],
            [
              "Minimum down payment",
              "3.5% at 580+; 10% at 500-579",
              "3% first-time buyers and HomeReady/Home Possible; 5% standard"
            ],
            [
              "Occupancy",
              "Primary residence only",
              "Primary, second home, or investment property"
            ],
            [
              "Maximum debt-to-income",
              "31/43 standard; up to 40/50 manual with compensating factors",
              "Up to 50% through automated underwriting"
            ]
          ]
        }
      },
      {
        "heading": "Mortgage insurance: MIP vs PMI",
        "paragraphs": [
          "Mortgage insurance is where the two loans diverge most, and where most of the lifetime cost difference sits. Both types protect the lender, not you; neither protects your equity or pays your mortgage if you lose your job. The difference is what you pay, how long you pay it, and whether you can stop.",
          "FHA mortgage insurance, called MIP, has two parts. The upfront premium is 1.75% of the base loan amount on almost every FHA loan, and most borrowers finance it. The annual premium is charged monthly on the outstanding balance. HUD set the current annual rates in Mortgagee Letter 2023-05, effective March 20, 2023; the base-loan breakpoint in that schedule is the national conforming loan limit, $832,750 in 2026.",
          "For a 30-year loan at or below that breakpoint, the annual premium is 0.55% if your loan-to-value ratio is above 95%, and 0.50% at 95% or below. Above the breakpoint, the rates are 0.75% and 0.70%. How long you pay depends on your down payment: under 10% down, annual MIP lasts the life of the loan; with 10% or more down, it lasts 11 years. Note the gap in the middle: 5% to 9.99% down earns the lower 0.50% rate but still pays it for life.",
          "Conventional private mortgage insurance, or PMI, works differently. Lenders require it when the loan is more than 80% of the home's value, and the premium is set by the insurer and the lender, not by a federal table. It typically runs 0.5% to 1.5% of the loan a year, priced mainly by credit score and down payment. Unlike FHA, there is no upfront premium and no insurance at all once you reach 20% equity.",
          "PMI also ends, by law. Under the Homeowners Protection Act, you can ask your servicer in writing to cancel PMI once your balance is scheduled to reach 80% of the home's original value, provided you are current, have a good payment history, certify there are no junior liens, and can show the value has not fallen. If you never ask, the servicer must end it automatically at 78% of original value, and no later than the month after the loan's midpoint, 15 years on a 30-year loan. These rules cover single-family principal residences closed on or after July 29, 1999, and do not apply to FHA loans."
        ],
        "table": {
          "head": [
            "",
            "Annual MIP (30-year, loan up to $832,750)",
            "Duration"
          ],
          "rows": [
            [
              "Under 5% down (LTV above 95%)",
              "0.55% a year",
              "Life of the loan"
            ],
            [
              "5% to under 10% down (LTV 90-95%)",
              "0.50% a year",
              "Life of the loan"
            ],
            [
              "10% or more down (LTV 90% or less)",
              "0.50% a year",
              "11 years"
            ]
          ]
        }
      },
      {
        "heading": "Loan limits in 2026",
        "paragraphs": [
          "Both programs cap how much you can borrow by county. The conforming loan limit, set by the Federal Housing Finance Agency, is $832,750 for a one-unit property in most of the country in 2026, rising to $1,249,125 in designated high-cost areas. A conventional loan above your county's limit is a jumbo loan, with stricter underwriting and usually a higher rate.",
          "FHA limits work differently. HUD sets a floor and a ceiling, and each county lands between them based on local home prices. For 2026 the one-unit floor is $541,287 and the ceiling is $1,249,125, effective for FHA case numbers assigned on or after January 1, 2026. Special-exception areas — Alaska, Hawaii, Guam, and the U.S. Virgin Islands — go to $1,873,625. The floor is 65% of the conforming limit and the ceiling 150% of it, so the two programs move together each year.",
          "The gap between the FHA floor and the conforming limit is the number that catches buyers. In most counties, FHA will insure at most $541,287, while a conventional loan can reach $832,750. A buyer needing a $600,000 loan in a standard-cost county cannot use FHA at all. Check both limits for your county before you shop: the county figure, not the national one, decides which loans are open to you.",
          "One detail helps FHA borrowers: the limit applies to the base loan amount, before the financed upfront premium. A $541,287 base loan plus a financed 1.75% upfront premium is still within the limit, even though the total balance is higher."
        ],
        "table": {
          "head": [
            "2026 one-unit limit",
            "FHA",
            "Conventional (conforming)"
          ],
          "rows": [
            [
              "Most counties",
              "$541,287",
              "$832,750"
            ],
            [
              "High-cost areas",
              "Up to $1,249,125",
              "Up to $1,249,125"
            ],
            [
              "Alaska, Hawaii, Guam, U.S. Virgin Islands",
              "$1,873,625",
              "$1,249,125 baseline; $1,873,675 ceiling"
            ]
          ]
        }
      },
      {
        "heading": "Side-by-side cost on a $350,000 home",
        "paragraphs": [
          "Take a $350,000 home with 3.5% down, $12,250, on a 30-year fixed loan. Both loans start from the same $337,750 base loan. Assume a 6.50% fixed rate for both and PMI at 0.50% a year, the low end of the typical range. These are round assumptions for comparison, not quotes; the structure holds at any rate.",
          "The FHA loan adds the 1.75% upfront premium to the balance: $337,750 times 1.75% is $5,910.63, so the loan you repay is $343,660.63. Principal and interest on that balance at 6.50% is $2,172.17 a month. Annual MIP at 0.55%, because the loan-to-value ratio is 96.5%, adds $157.51 in the first month. Total: $2,329.68 a month, before taxes and homeowners insurance.",
          "The conventional loan has no upfront premium, so principal and interest on $337,750 at the same rate is $2,134.81. PMI at 0.50% a year adds $140.73 a month. Total: $2,275.54. The FHA loan costs $54.14 more per month from day one, and the gap is understated: the PMI rate used here is the low end of its range, while the MIP rate is fixed.",
          "The gap widens over time because PMI ends and MIP does not. On the original schedule, the conventional balance reaches 80% of the home's $350,000 original value, $280,000, in month 131, when you can ask for cancellation, and 78%, $273,000, in month 142, when the servicer must end it automatically. PMI paid to that point totals $19,984. FHA's MIP over the same 142 months totals $20,501 and keeps charging: $17,629 in the first 10 years, $37,089 over the full 30-year term. Extra payments can end PMI sooner; nothing short of a refinance ends MIP at 3.5% down.",
          "Putting 10% down changes the FHA math but does not close the gap: a $315,000 base loan, a $5,512.50 upfront premium, and a $320,512.50 total loan. Principal and interest is $2,025.86, and MIP at 0.50% starts at $133.55 a month and runs for 11 years, totaling about $16,290. A conventional loan at 10% down pays PMI only until 80% of original value, with no upfront premium."
        ],
        "table": {
          "head": [
            "$350,000 home, 3.5% down, 6.50%, 30 years",
            "FHA",
            "Conventional"
          ],
          "rows": [
            [
              "Base loan",
              "$337,750",
              "$337,750"
            ],
            [
              "Upfront premium (1.75%)",
              "$5,910.63, financed",
              "None"
            ],
            [
              "Loan balance repaid",
              "$343,660.63",
              "$337,750"
            ],
            [
              "Principal and interest",
              "$2,172.17 / month",
              "$2,134.81 / month"
            ],
            [
              "Mortgage insurance",
              "$157.51 / month (0.55% MIP)",
              "$140.73 / month (0.50% PMI)"
            ],
            [
              "Total monthly payment",
              "$2,329.68",
              "$2,275.54"
            ],
            [
              "Insurance ends",
              "Never at 3.5% down",
              "By request at 80% LTV; automatic at 78%"
            ],
            [
              "Insurance paid over 30 years",
              "$37,089 MIP",
              "$19,984 PMI"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Credit score 580 to 619, where most lenders will not write a conventional loan",
          "Debt-to-income ratio above 50%, past conventional limits",
          "Down payment is exactly 3.5% and savings are thin",
          "You need FHA's looser treatment of gift funds and seller contributions",
          "You plan to refinance into a conventional loan once your score and equity improve"
        ],
        "heading": "When FHA wins",
        "paragraphs": [
          "FHA wins when the barrier is getting a loan at all. A score between 580 and 619 closes the conventional door at most lenders, and FHA's 3.5% minimum down payment at that score is the lowest-cost path to a purchase. It also wins when your debt-to-income ratio runs past 50%, where conventional underwriting stops but FHA's compensating-factor tiers keep going.",
          "FHA can also win on rate for a lower-score borrower. FHA rates barely move with credit score, while conventional rates and PMI both punish a low score. A 620-score borrower may find the FHA rate lower than the conventional rate offered, even after MIP — the one case where FHA's monthly cost can beat conventional's, and worth pricing both before deciding.",
          "FHA's assumability is a real asset: a qualified buyer can take over your loan when you sell, keeping your rate. In a high-rate market, an assumable loan is a selling point a conventional loan cannot match."
        ]
      },
      {
        "bullets": [
          "Credit score 680 or higher, where conventional pricing and PMI are both cheap",
          "Down payment of 20%, which removes mortgage insurance entirely",
          "Loan amount above your county's FHA limit but within the conforming limit",
          "Buying a second home, an investment property, or a condo without FHA approval",
          "Buying a home that would fail FHA's minimum property standards"
        ],
        "heading": "When conventional wins",
        "paragraphs": [
          "Conventional wins whenever you qualify comfortably. With a 680 score or better and 5% or more down, a competitive rate, cheaper PMI, and no upfront premium usually beat FHA on monthly cost, and the margin grows every year as PMI shrinks toward cancellation while MIP stays flat. With 20% down there is no contest: no mortgage insurance, no upfront premium, and the lowest rates.",
          "Conventional also wins on flexibility. It finances second homes and investment properties, has no property-standards appraisal beyond the lender's own requirements, and imposes no FHA approval requirement on condominiums. For a condo in a building without FHA approval, or a home that needs work, conventional may be the only loan that closes.",
          "The loan limit gap decides some purchases outright. In a standard-cost county, a loan between $541,287 and $832,750 is conventional or nothing. If your price range sits in that band, FHA is off the table."
        ]
      },
      {
        "heading": "Refinancing out of FHA mortgage insurance",
        "paragraphs": [
          "If you already have an FHA loan with lifetime MIP, refinancing into a conventional loan is the only way to end it. If your new loan is at or below 80% of the home's current appraised value, there is no PMI on the new loan either. That is the exit most FHA borrowers plan from the start.",
          "The exit is not automatic. You must requalify when you refinance: credit score, income, debt-to-income ratio, and an appraisal that supports the value you need. A borrower who bought at 580 with 3.5% down needs a score of at least 620 in practice, and enough equity to reach 80% loan-to-value, from paying the balance down, from the home rising in value, or from cash at closing.",
          "Run the numbers before you refinance. A new loan means new closing costs and a new 30-year clock if you take another 30-year term. If your current FHA rate is well below the rate you would get today, the higher rate can cost more than the MIP you save. Refinance when the monthly saving covers the closing costs within a few years and you plan to stay past that break-even point.",
          "One timing note: FHA's streamline refinance, which moves you into a new FHA loan with reduced paperwork, does not remove MIP. It only helps if your goal is a lower rate on the FHA loan you already have. Ending mortgage insurance requires leaving FHA for a conventional loan."
        ]
      }
    ],
    "seoTitle": "FHA vs Conventional Loans: Which Costs Less in 2026?",
    "slug": "fha-vs-conventional-loans",
    "sources": [
      {
        "label": "HUD Mortgagee Letter 2023-05 — FHA annual MIP rates and upfront premium",
        "url": "https://www.hud.gov/sites/dfiles/OCHCO/documents/2023-05hsgml.pdf"
      },
      {
        "label": "HUD — FHA announces 2026 loan limits (HUD No. 25-145)",
        "url": "https://www.hud.gov/news/hud-no-25-145"
      },
      {
        "label": "FHFA — Conforming loan limit values for 2026",
        "url": "https://www.fhfa.gov/news/news-release/fhfa-announces-conforming-loan-limit-values-for-2026"
      },
      {
        "label": "CFPB — When can I remove private mortgage insurance (PMI) from my loan?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/"
      }
    ],
    "title": "FHA vs Conventional Loans",
    "type": "Comparison",
    "updated": "2026-10-23"
  },
  {
    "cornerstone": false,
    "description": "Property tax equals assessed value times the mill rate, minus exemptions. See the formula, a worked $400,000 example, escrow math, and the 2026 SALT cap.",
    "faqs": [
      {
        "answer": "It depends on where you live. Some jurisdictions reassess every year; others run on two-, three-, or five-year cycles, and a few go longer. A reassessment usually follows a notice with the new value and an appeal deadline. Renovations, additions, and sales can also trigger a revaluation between scheduled cycles. Your assessor's office publishes the schedule.",
        "question": "How often is my home reassessed?"
      },
      {
        "answer": "Not automatically. Taxing districts set rates from their budgets, so if all values in town rise together, the rate can fall and bills stay flat. Your bill rises when your home gains value faster than your neighbors' homes, when a district raises its budget, or when voters approve new levies such as a school bond.",
        "question": "Do my property taxes go up when my home value rises?"
      },
      {
        "answer": "A mill is $1 of tax per $1,000 of assessed value, or 0.1 percent. A rate of 15 mills means $15 per $1,000 of assessed value, or 1.5 percent. To convert mills to a percentage, divide by 10. Your total mill rate is the sum of every district taxing your property: county, city, school district, and any special districts.",
        "question": "What is a mill rate?"
      },
      {
        "answer": "Yes, if you itemize. Property taxes count toward the federal SALT deduction, capped at $40,400 for 2026 ($20,200 if married filing separately), covering property tax plus state income or sales tax combined. The cap phases down above $505,000 of modified adjusted gross income. You deduct the tax in the year you pay it.",
        "question": "Can I deduct my property taxes?"
      },
      {
        "answer": "Contact your tax collector before the bill goes delinquent. Many jurisdictions offer payment plans, and some offer deferrals for seniors or homeowners with disabilities. If the bill goes unpaid, penalties and interest accrue, a tax lien attaches to the property, and the taxing authority can eventually foreclose and sell the home.",
        "question": "What happens if I can't pay my property taxes?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/how-property-taxes-are-calculated.jpg",
    "imageAlt": "Flat-vector illustration of a house with a magnifying glass and a tax bill",
    "inlineImage": "/images/how-property-taxes-are-calculated-inline.jpg",
    "inlineImageAlt": "Flat-vector pie chart showing the local services property taxes fund, with school, road, fire truck, and police badge icons",
    "intro": "Your property tax bill is the product of three numbers: your home's assessed value, any exemptions you qualify for, and the tax rate your local governments set. The assessor values the property, the taxing districts set the rate, and the bill is the result. This guide works through each step with real arithmetic, so you can check your own bill.",
    "published": "2026-10-27",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Property Tax Assessor",
        "url": "/real-estate/property-tax-assessor-calculator"
      },
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What property tax is and who sets it",
        "paragraphs": [
          "Property tax is a local tax on real estate, levied almost entirely by counties, cities, school districts, and special districts such as fire and water authorities. State law sets the framework — what can be taxed, how assessments work, which exemptions exist — but the state itself rarely collects the tax. Your bill usually combines levies from several of these bodies, each with its own rate, printed as separate lines on one statement.",
          "The money pays for services tied to where you live: public schools, roads, police and fire departments, parks, and libraries. Property taxes are the largest single source of revenue for local government. In fiscal year 2023 they made up 28.9 percent of all state and local tax collections and 70.0 percent of local tax collections alone, according to the Tax Foundation's analysis of Census Bureau data.",
          "Because the tax is local, there is no national rate and no national bill. Two identical houses in different counties can owe very different amounts, and two neighbors can owe different amounts if their assessments or exemptions differ. Everything in this guide is therefore a method, not a quote: the formula is the same everywhere, but the inputs are set where you live."
        ]
      },
      {
        "heading": "Assessed value vs market value",
        "paragraphs": [
          "Your tax bill starts with the assessed value, the dollar figure your county assessor assigns to the property. It is not the same as market value — the price your home would fetch in a sale. Assessors usually estimate market value first, from recent sales of comparable homes, then apply the jurisdiction's assessment ratio to get the assessed value.",
          "The assessment ratio is the share of market value that gets taxed. Some jurisdictions tax 100 percent of market value; others tax a fraction, such as 80 percent, 40 percent, or 10 percent. The ratio is set by state law or local rule, and it is one reason a high mill rate in one state can produce a lower bill than a low mill rate in another: the rate applies to a different base.",
          "Assessors value property three ways, depending on the property type. Comparable sales — what similar homes nearby sold for — dominate for houses. The cost approach estimates what it would cost to rebuild, minus depreciation. The income approach, used mainly for rentals and commercial property, values the property from the rent it can generate. For a typical homeowner, the sales comparison is the one that matters.",
          "The assessor's record matters too: the square footage, number of bedrooms and bathrooms, lot size, and condition on file. An error there — a finished basement you don't have, a bedroom count from before a remodel — raises the value and the bill. Check the record when you get a new assessment."
        ]
      },
      {
        "heading": "Mill rates: how to read them",
        "paragraphs": [
          "Most taxing districts express their rate in mills. One mill is $1 of tax for every $1,000 of assessed value — one-tenth of one percent. A rate of 15 mills means $15 per $1,000, or 1.5 percent of assessed value. To convert mills to a percentage, divide by 10; to convert a percentage to mills, multiply by 10.",
          "Your total rate is the sum of every district that taxes your property. If the county levies 6 mills, the school district 8 mills, and the city 4 mills, your combined rate is 18 mills, or 1.8 percent of assessed value. That combined rate is the number that goes into the formula.",
          "Mill rates are set backwards from budgets. Each district decides how much revenue it needs, divides by the total assessed value in its area, and sets the rate that raises that amount. When property values rise across a whole town, the rate can fall and still raise the same revenue — which is why a higher assessment does not always mean a higher bill."
        ],
        "table": {
          "head": [
            "Mill rate",
            "As a percentage",
            "Tax per $1,000",
            "Tax on $320,000 assessed"
          ],
          "rows": [
            [
              "10 mills",
              "1.0%",
              "$10",
              "$3,200"
            ],
            [
              "15 mills",
              "1.5%",
              "$15",
              "$4,800"
            ],
            [
              "20 mills",
              "2.0%",
              "$20",
              "$6,400"
            ],
            [
              "25 mills",
              "2.5%",
              "$25",
              "$8,000"
            ]
          ]
        }
      },
      {
        "heading": "How the bill is computed: a worked example",
        "paragraphs": [
          "The formula has four steps: value the home, apply the assessment ratio, subtract exemptions, then apply the rate. Take a home with a market value of $400,000 in a jurisdiction with an 80 percent assessment ratio and a combined rate of 15 mills.",
          "The effective rate — the tax as a share of market value — is $4,800 divided by $400,000, or 1.2 percent. The effective rate is the only figure that compares fairly across jurisdictions, because it folds the assessment ratio and the mill rate into one number. A 15-mill rate sounds high next to a 10-mill rate elsewhere, but if the 15-mill town assesses at 50 percent and the 10-mill town at 100 percent, the 15-mill home pays less on the same house: 0.75 percent of market value against 1.0 percent.",
          "Now add an exemption. Suppose this homeowner qualifies for a homestead exemption that removes $50,000 from the assessed value — an illustrative figure; real exemption amounts vary widely. Taxable value falls to $270,000, and the tax becomes 270 times $15, or $4,050 a year, saving $750 a year, or $62.50 a month. The same arithmetic applies to any exemption: it cuts the taxable value before the rate is applied, so its dollar value depends on the local rate."
        ],
        "table": {
          "head": [
            "Step",
            "Calculation",
            "Result"
          ],
          "rows": [
            [
              "1. Market value",
              "Assessor's estimate",
              "$400,000"
            ],
            [
              "2. Assessed value",
              "$400,000 × 80%",
              "$320,000"
            ],
            [
              "3. Less exemptions",
              "No exemptions claimed",
              "$320,000 taxable"
            ],
            [
              "4. Annual tax",
              "$320,000 ÷ $1,000 × 15 mills",
              "$4,800"
            ],
            [
              "5. Monthly cost",
              "$4,800 ÷ 12",
              "$400"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Homestead exemption: reduces the taxable value of a primary residence. Available in most states, with amounts and rules set locally. Some states apply it automatically; others require a one-time application.",
          "Senior exemption: many jurisdictions offer an additional reduction, a freeze on assessed value, or a tax deferral for homeowners over a qualifying age, often 65.",
          "Veteran and disability exemptions: additional reductions for veterans, disabled veterans, and homeowners with disabilities. Several states exempt disabled veterans entirely.",
          "Agricultural and land-use exemptions: land used for farming, timber, or open space may be assessed on its use value rather than its market value, which is usually much lower."
        ],
        "heading": "Exemptions that lower the bill",
        "paragraphs": [
          "Most states let some homeowners subtract part of their home's value before the tax is computed. Exemptions are the most common way to cut a bill without moving, and they are easy to miss: in many places you must apply for them — they are not automatic.",
          "Exemptions stack in some places and not in others, and eligibility rules — age thresholds, income limits, residency requirements — are set by state and county. Your assessor's website lists what your jurisdiction offers; if you have never applied, check before assuming you get nothing."
        ]
      },
      {
        "heading": "How rates vary across the country",
        "paragraphs": [
          "Effective rates — tax paid as a share of home value — differ far more by place than by anything else. In calendar year 2023, the Tax Foundation's state comparison put New Jersey highest at 2.23 percent of owner-occupied home value, followed by Illinois at 2.07 percent and Connecticut at 1.92 percent. Hawaii was lowest at 0.27 percent, followed by Alabama at 0.38 percent.",
          "The gap is even wider at the county level. The five counties with the highest burdens all had effective rates above 2.95 percent — Allegany and Orleans counties in New York, Camden and Salem counties in New Jersey, and Menominee County in Wisconsin — while the five lowest were all below 0.18 percent. Within a single state the range can be enormous: in Alabama, median property taxes ran from under $200 in Choctaw County to $1,343 in Shelby County; in Virginia, from $404 in Buchanan County to more than $10,000 in Falls Church City. Sixteen counties — eight in New Jersey, six in New York, plus Marin County, California, and Falls Church City, Virginia — had median bills above $10,000. The average countywide median bill across the country was $1,889.",
          "High rates do not always mean high bills, and low rates do not always mean low ones. Hawaii's rate is the lowest in the country, but its home values are among the highest, so its bills are not the lowest. What the rate tells you is the share of your home's value the tax consumes each year — the right way to compare places with different prices. The table below applies the Tax Foundation's 2023 effective rates to a $400,000 home; an actual bill depends on local assessments and exemptions."
        ],
        "table": {
          "head": [
            "State",
            "Effective rate (2023)",
            "Annual tax on a $400,000 home"
          ],
          "rows": [
            [
              "New Jersey",
              "2.23%",
              "$8,920"
            ],
            [
              "Illinois",
              "2.07%",
              "$8,280"
            ],
            [
              "Connecticut",
              "1.92%",
              "$7,680"
            ],
            [
              "Alabama",
              "0.38%",
              "$1,520"
            ],
            [
              "Hawaii",
              "0.27%",
              "$1,080"
            ]
          ]
        }
      },
      {
        "heading": "Escrow and your monthly payment",
        "paragraphs": [
          "If you have a mortgage, you probably pay property tax through escrow. Your lender collects one-twelfth of the estimated annual bill with each monthly payment, holds it in an escrow account, and pays the taxing authority when the bill comes due. The Consumer Financial Protection Bureau notes that many lenders require escrow so the bill is certain to be paid, and some loans require it by law.",
          "Using the worked example: $4,800 a year in tax plus, say, $1,800 a year in homeowners insurance means $6,600 a year through escrow, or $550 a month on top of principal and interest. That is why a tax increase shows up as a higher mortgage payment even on a fixed-rate loan — the principal and interest never change, but the escrow portion does.",
          "Federal rules under Regulation X cap how much extra your servicer can hold. The cushion — the reserve above the year's expected bills — cannot exceed one-sixth of the estimated annual disbursements, about two months of escrow payments. On $6,600 of annual bills, the maximum cushion is $1,100. Your servicer must review the account once a year and send you a statement; if the analysis finds a surplus of $50 or more and your loan is current, the servicer must refund it within 30 days.",
          "If your loan has no escrow, the bill is yours to pay directly — usually once or twice a year, depending on the jurisdiction. Budget for it monthly anyway: divide the annual bill by 12 and set that amount aside, so a $4,800 bill never arrives as a surprise."
        ]
      },
      {
        "bullets": [
          "The property record: square footage, bedrooms, bathrooms, lot size, age, and condition.",
          "Comparable sales: similar homes, nearby, sold recently, for less than your assessed value.",
          "The assessment ratio: confirm the ratio was applied correctly to the market value.",
          "Your exemptions: confirm every exemption you qualify for is on the bill."
        ],
        "heading": "Reassessment and appeals",
        "paragraphs": [
          "Assessors revalue property on a schedule set by state or local law — every year in some places, every two to five years in others, and longer in a few. A reassessment updates your home's value to reflect the market, renovations, and changes in the neighborhood. You will usually get a notice with the new value and a deadline to object.",
          "A higher assessment does not automatically mean a higher bill. Taxing districts set their rates from their budgets, so if values rise across the board, rates often fall to compensate. Your bill rises when your home's value rises faster than your neighbors' — or when the districts raise their budgets.",
          "If you think the assessment is wrong, appeal it. The process is local, but the shape is similar everywhere: file an objection with the assessor or review board by the stated deadline, and bring evidence. The strongest evidence is usually recent sales of comparable homes that sold for less than your assessed market value, or errors in the property record — wrong square footage, a bathroom that doesn't exist, a condition rating that ignores real damage.",
          "An appeal costs little — usually nothing but your time — and a successful one lowers the bill every year until the next reassessment. In some jurisdictions a review can also raise an assessment that turns out to be too low, so appeal when the evidence is on your side, not on a guess."
        ]
      },
      {
        "heading": "What happens if you don't pay",
        "paragraphs": [
          "Property tax is a secured debt against the property itself. If you don't pay, the taxing authority adds penalties and interest, and — as the Consumer Financial Protection Bureau puts it — may impose fines and penalties or place a tax lien on your home. A lien is a legal claim on the property that must be cleared before you can sell or refinance.",
          "The lien usually takes priority over other claims, including the mortgage. That is why lenders insist on escrow: an unpaid tax bill threatens their collateral. If the debt stays unpaid, the taxing authority can eventually ask a court to foreclose the lien and sell the property at auction to recover the taxes. Timelines, redemption rights, and sale procedures are set by state law and vary widely.",
          "If you cannot pay, contact the tax collector before the bill goes delinquent. Many jurisdictions offer payment plans that spread the bill over months, and some offer deferrals for seniors or homeowners with disabilities. Ignoring the bill is the most expensive option: penalties and interest compound, and the lien does not go away on its own."
        ]
      },
      {
        "heading": "The federal SALT deduction",
        "paragraphs": [
          "Property taxes you pay are deductible on your federal return — but only if you itemize, and only up to the federal cap on state and local taxes (SALT). The cap covers your property taxes plus your state and local income taxes (or sales taxes, if you elect those instead) combined, not each separately. The IRS requires the tax to be levied uniformly on property in the jurisdiction, and you deduct it in the year you pay it, not the year it covers.",
          "The cap changed in 2025. The One Big Beautiful Bill Act (P.L. 119-21) replaced the flat $10,000 cap with a higher limit written into 26 U.S.C. § 164(b)(7): $40,000 for 2025 and $40,400 for 2026, rising 1 percent a year through 2029, then reverting to $10,000 in 2030 unless Congress acts. Married couples filing separately get half: $20,200 for 2026.",
          "The higher cap phases down for high earners. For 2026, once modified adjusted gross income passes $505,000, the cap shrinks by 30 percent of the excess, but never below $10,000. At a MAGI of $555,000, for example, the excess is $50,000, the reduction is $15,000, and the cap is $25,400. The floor of $10,000 is reached at a MAGI of about $606,333.",
          "Whether the deduction helps you depends on itemizing. For 2026 the standard deduction is $32,200 for married couples filing jointly and $16,100 for single filers (IRS, IR-2025-103). Take a couple who pays $9,000 in property tax and $8,000 in state income tax: their $17,000 of SALT fits entirely under the $40,400 cap, but they only benefit if their total itemized deductions — SALT plus mortgage interest, charitable gifts, and the rest — beat $32,200. Under the old $10,000 cap, $7,000 of that $17,000 would have been lost; under the 2026 cap, none of it is."
        ]
      }
    ],
    "seoTitle": "How Property Taxes Are Calculated (2026 Guide)",
    "slug": "how-property-taxes-are-calculated",
    "sources": [
      {
        "label": "26 U.S.C. § 164 — Taxes (SALT deduction cap)",
        "url": "https://uscode.house.gov/us/usc/t26/s164/"
      },
      {
        "label": "IRS Topic No. 503 — Deductible Taxes",
        "url": "https://www.irs.gov/taxtopics/tc503"
      },
      {
        "label": "Tax Foundation — Property Taxes by State and County, 2026",
        "url": "https://taxfoundation.org/data/all/state/property-taxes-by-state-county/"
      },
      {
        "label": "CFPB — What is an escrow or impound account?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-an-escrow-or-impound-account-en-140/"
      }
    ],
    "title": "How Property Taxes Are Calculated",
    "type": "What",
    "updated": "2026-10-27"
  },
  {
    "cornerstone": false,
    "description": "Find your home's value with online estimates, comparable sales, and appraisals — explained with a worked example and the latest FHFA price data for 2026.",
    "faqs": [
      {
        "answer": "They are a reasonable starting range for a standard home in an area with frequent sales, and unreliable for unusual homes or thin markets. The model has never been inside your home, so it cannot see renovations, damage, or condition. Treat the number as the middle of a range several percent wide in either direction, and check it against recent comparable sales before making any decision.",
        "question": "How accurate are online home value estimates?"
      },
      {
        "answer": "No. The assessed value exists to calculate property tax, and assessors update it on their own schedule — often once a year or less — using mass-appraisal methods, not a visit to your home. It can sit well above or below market value, especially in a fast-moving market. Use it for tax questions only; use comparable sales and an appraisal for market value.",
        "question": "Is my tax assessment the same as my home's value?"
      },
      {
        "answer": "Once or twice a year is enough if you are staying put — enough to track your equity and spot the right moment to refinance or drop mortgage insurance. Check more often if you are planning to sell, refinance, or borrow against the home within the next few months, since a value more than a few months old may not reflect current local sales.",
        "question": "How often should I check my home's value?"
      },
      {
        "answer": "Yes. You can hire a licensed appraiser directly for a private appraisal, which follows the same process — inspection, comparable sales, written report — without a lender involved. Homeowners do this before listing, during a divorce or estate settlement, or to challenge a tax assessment. A private appraisal is not a substitute for the lender's appraisal if you later borrow.",
        "question": "Can I get my home appraised without selling or refinancing?"
      },
      {
        "answer": "Location and comparable sales set the ceiling — no renovation makes a home worth far more than its neighbors. Within that ceiling, living space, bedroom and bathroom count, and overall condition matter most, because appraisers adjust directly for them. Renovations help when they bring a dated home up to neighborhood standards; over-improving beyond the neighborhood rarely pays back at sale.",
        "question": "What raises a home's value the most?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/how-much-is-my-house-worth.jpg",
    "imageAlt": "Flat-vector illustration of a house under a magnifying glass",
    "inlineImage": "/images/how-much-is-my-house-worth-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of three houses with a rising bar chart behind them",
    "intro": "Your home is worth what a buyer will pay for it — and the best estimate of that number comes from recent sales of similar homes nearby. Online estimates give a fast range, an appraisal gives the number a lender will use, and comparable sales let you check both. This guide shows how each method works.",
    "published": "2026-10-31",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Home Equity Calculator",
        "url": "/real-estate/home-equity-calculator"
      },
      {
        "name": "Cap Rate Calculator",
        "url": "/real-estate/cap-rate-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "Market value: what a buyer will pay. Set by comparable sales; used for selling, refinancing, and home equity borrowing.",
          "Assessed value: what the county uses for property tax. Updated on the assessor’s schedule and often behind the market.",
          "Online estimate: a model’s guess from public records. Fast and free, but it has never been inside your home.",
          "Replacement cost: what rebuilding would cost. Relevant to insurance, not to a sale price."
        ],
        "heading": "Market value is not the only number",
        "paragraphs": [
          "Four different numbers all claim to describe what your home is worth, and they answer different questions. Market value is the price a willing buyer and a willing seller agree on, with neither under pressure. It is the number that matters when you sell, refinance, or borrow against the home, and it is the only one set by actual transactions.",
          "The other numbers serve narrower purposes. Your tax assessment exists to calculate property tax, and assessors update it on their own schedule — often annually or less — so it can lag the market by months or years. Replacement cost is what an insurer would pay to rebuild the house.",
          "Confusing these numbers costs money. Listing at your tax-assessed value in a rising market leaves cash on the table; listing at replacement cost in a soft market leaves the home sitting unsold. Start with market value, and treat the rest as supporting evidence."
        ]
      },
      {
        "heading": "Four ways to value a home",
        "paragraphs": [
          "Every valuation method trades speed for accuracy. An online estimate takes seconds and costs nothing, but it leans on public records that may be out of date or wrong about your home’s condition. A full appraisal takes days and costs money, but it is the only estimate a lender will underwrite a loan against.",
          "Most homeowners should use at least two methods and compare. If the online estimate and your own comparable-sales check land within a few percent of each other, you have a usable range. If they disagree by 10% or more, something is off — usually stale data, a renovation the model cannot see, or a thin market with few recent sales.",
          "The table below compares the four common methods on cost, accuracy, and when each one is the right tool."
        ],
        "table": {
          "head": [
            "Method",
            "Cost",
            "Accuracy",
            "Best for"
          ],
          "rows": [
            [
              "Online estimate (AVM)",
              "Free",
              "Rough range",
              "A quick starting point"
            ],
            [
              "Comparable sales (DIY)",
              "Free",
              "Good, if comps are close",
              "Checking any other estimate"
            ],
            [
              "Agent price opinion (CMA)",
              "Free, from an agent",
              "Good, with local judgment",
              "Setting a listing price"
            ],
            [
              "Full appraisal",
              "Paid by the borrower; shown on the Loan Estimate",
              "Highest; the lender’s number",
              "A purchase or refinance"
            ]
          ]
        }
      },
      {
        "heading": "How to read comparable sales",
        "paragraphs": [
          "Comparable sales — comps — are the backbone of every serious valuation, including the appraiser’s. A comp is a home similar to yours, near yours, that sold recently. Similarity matters more than proximity: a 1,800-square-foot three-bedroom a mile away is a better comp than a 3,000-square-foot five-bedroom next door.",
          "The standard rules are simple. Use sales from the last three to six months, within about a mile in a suburb or a few blocks in a city, and similar in size, age, bedrooms, and condition. Adjust for differences: a comp with a renovated kitchen sold for more than your unrenovated home would, and a comp on a busy road sold for less than yours on a quiet street.",
          "Here is a worked example. Your home has 1,800 square feet. Three nearby homes sold in the last four months: Comp A, 1,750 square feet, sold for $402,000 ($229.71 per square foot); Comp B, 1,900 square feet, sold for $438,000 ($230.53 per square foot); Comp C, 1,820 square feet, sold for $415,000 ($228.02 per square foot). The average is $229.42 per square foot. Multiply by your 1,800 square feet and the estimate is $412,958 — about $413,000.",
          "That number is a starting point, not a verdict. If your kitchen is ten years older than the comps’, subtract something; if you added a bathroom they lack, add something. Adjust from there for condition and features."
        ]
      },
      {
        "heading": "What online estimates get wrong",
        "paragraphs": [
          "Online estimates come from automated valuation models, or AVMs. They combine public records, recent sales, tax data, and listing history, then produce a number in seconds. For a standard home in a subdivision full of similar houses with frequent sales, they can be close. Anywhere else, they drift.",
          "The core weakness is that a model has never been inside your home. It does not know whether the kitchen was remodeled last year or last decade, whether the basement floods, or whether the roof is five years old or twenty-five. It also struggles with unusual homes — a converted barn, a home on five acres, a house with an addition the county never recorded — because there are few similar sales to learn from.",
          "Thin markets make it worse. In a neighborhood with two sales a year, the model leans on older sales or homes farther away, and its confidence drops. Treat an online estimate as a range, not a price: if it says $410,000, read it as roughly $390,000 to $430,000 until the comps say otherwise.",
          "Use online estimates for what they are good at — tracking the direction of your market over months. Do not set a listing price or make an offer on one alone."
        ]
      },
      {
        "heading": "What the market is doing now",
        "paragraphs": [
          "National price data sets the backdrop, not the price of your home. According to the Federal Housing Finance Agency’s House Price Index, U.S. house prices rose 2.1% between the second quarter of 2025 and the second quarter of 2026, and 0.3% from the first quarter of 2026 to the second. The monthly index for June 2026 was unchanged from May — growth had slowed to a crawl by mid-year.",
          "The national figure hides wide local differences. Prices rose over the year in 46 states and the District of Columbia, but Alaska led at 8.3% while some states declined. Your metro area’s number can sit far from the national average in either direction, which is why local comps matter more than any headline index.",
          "A separate Census Bureau and HUD series tracks new homes only: the median sales price of a new house sold in the third quarter of 2026 was $393,300, down from $410,100 in the third quarter of 2025. New-home prices and existing-home prices move together over time but not month to month, so do not apply a new-home median to an existing home.",
          "You can use the FHFA index to sanity-check your own home’s value over time. A home bought for $350,000 in the second quarter of 2025, appreciating at the national 2.1% rate, would be worth about $357,350 a year later ($350,000 × 1.021). That is a national-average estimate only — your local market, and your home’s condition, decide the real number."
        ]
      },
      {
        "heading": "How an appraisal works, and when the lender skips it",
        "paragraphs": [
          "When you borrow to buy or refinance, the lender usually orders an appraisal — a licensed appraiser’s written opinion of the property’s value. The Consumer Financial Protection Bureau describes an appraisal as an independent assessment: the appraiser inspects the home, compares it with recent nearby sales, and delivers a report. The lender may require you to pay for it, and the fee appears on your Loan Estimate.",
          "You have a right to see the result. Under federal rules, your lender must give you a free copy of any appraisal or other written valuation it obtains — and cannot charge you a fee for those copies. Read it: it shows the comps used and the adjustments made.",
          "If the appraisal comes in below the sale price, the lender will only lend against the appraised value. The CFPB calls it very risky to pay more than the appraised value, and for good reason — the gap comes out of your cash, and you start ownership underwater on the loan. Your options are to renegotiate the price, bring extra cash, or walk away if your contract allows it.",
          "Some loans skip the traditional appraisal entirely. Fannie Mae’s automated underwriting system can offer value acceptance, which lets an eligible loan close without an appraisal when its models are confident in the value. Fannie Mae retired the older term “appraisal waiver” in September 2025 in favor of “value acceptance.” You cannot request it — the system offers it or it does not — and it never replaces a home inspection."
        ]
      },
      {
        "heading": "Turning a value into a decision",
        "paragraphs": [
          "A home value is only useful once it drives a decision. The most common one is equity: value minus what you owe. A home worth $410,000 with a $285,000 mortgage balance holds $125,000 of equity, and the loan-to-value ratio is 69.5% ($285,000 ÷ $410,000). That ratio decides what you can borrow against the home and on what terms.",
          "If you are selling, the value sets your listing strategy. Price at the top of your comp range and you may sit; price at the middle and you may sell faster, sometimes for more after competing offers. If you are refinancing, the value decides whether the new loan works at all — a low appraisal can kill a refinance or shrink the cash you can take out.",
          "If you are staying put, check your value once or twice a year. A rising value builds equity you can tap later through a home equity loan or line of credit, and it may let you drop mortgage insurance once your loan-to-value falls far enough.",
          "Run the numbers before you act. Our Home Equity Calculator turns your estimated value and mortgage balance into equity and loan-to-value, and the Cap Rate Calculator shows what the home would earn as a rental — the two figures that decide whether selling, refinancing, or holding is the better move."
        ]
      }
    ],
    "seoTitle": "How Much Is My House Worth? 4 Ways to Find Out",
    "slug": "how-much-is-my-house-worth",
    "sources": [
      {
        "label": "FHFA — House Price Index report, 2026Q2 (released August 25, 2026)",
        "url": "https://www.fhfa.gov/document/d/hpi/fhfa-house-price-index-report-2026q2"
      },
      {
        "label": "U.S. Census Bureau and HUD — Median Sales Price of New Houses Sold (FRED series MSPUS)",
        "url": "https://fred.stlouisfed.org/series/MSPUS"
      },
      {
        "label": "CFPB — What are appraisals and why do I need to look at them?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-are-appraisals-and-why-do-i-need-to-look-at-them-en-167/"
      },
      {
        "label": "Fannie Mae — Selling Guide Announcement SEL-2025-07 (retirement of the term “appraisal waiver”)",
        "url": "https://singlefamily.fanniemae.com/media/document/pdf/announcement-sel-2025-07-selling-guide-updates"
      }
    ],
    "title": "How Much Is My House Worth?",
    "type": "What",
    "updated": "2026-10-31"
  },
  {
    "cornerstone": false,
    "description": "Pre-qualification is an unverified estimate; pre-approval is a lender-checked letter sellers trust. See the documents, credit checks, and validity of each.",
    "faqs": [
      {
        "answer": "A little, and only once if you shop efficiently. A mortgage lender's credit check is recorded as an inquiry, which the CFPB says typically has a small negative effect on your scores. Multiple mortgage checks within a 45-day window count as a single inquiry, so comparing three lenders in three weeks costs the same as applying to one. Checking your own credit never affects your score.",
        "question": "Does getting pre-approved hurt my credit score?"
      },
      {
        "answer": "The CFPB describes 30 to 60 days as typical, but the expiration date printed on your letter is what counts — lenders set their own windows. If it expires while you are still shopping, your lender can renew it with fresh pay stubs, bank statements, and usually a new credit check. A job change or new debt can also make a letter stale before its printed date.",
        "question": "How long is a pre-approval letter good for?"
      },
      {
        "answer": "Yes, and the CFPB encourages it. Getting pre-approved does not commit you to that lender, and multiple mortgage credit checks within a 45-day window are recorded as a single inquiry. Compare letters from two or three lenders, then wait until you have a property address and official Loan Estimates before choosing — a pre-approval alone does not show you the best deal.",
        "question": "Can I get pre-approved by more than one lender?"
      },
      {
        "answer": "No. Both pre-qualification and pre-approval letters are based on assumptions and are not guaranteed loan offers, as the CFPB states plainly. Final approval depends on underwriting, the appraisal, the property itself, and your finances staying steady through closing. A low appraisal, a job change, or new debt can still reduce the amount or stop the loan.",
        "question": "Does pre-approval guarantee I will get the loan?"
      },
      {
        "answer": "Not before browsing, but before making offers. Sellers frequently require a pre-approval letter before accepting an offer, and in a competitive market an offer without one is often passed over. Start with a pre-qualification to set your price range, then get pre-approved when you are ready to tour homes seriously — inside the letter's 30-to-60-day window.",
        "question": "Do I need a pre-approval before I start looking at houses?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/mortgage-pre-approval-vs-pre-qualification.jpg",
    "imageAlt": "Flat-vector illustration of a deep emerald house with a large burnt orange key leaning against it and a sage document sheet with a checkmark seal beside the door",
    "inlineImage": "/images/mortgage-pre-approval-vs-pre-qualification-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of two diverging paths from a single starting point, one sage path to a small outlined house and one emerald path with an orange flag to a solid filled house",
    "intro": "Pre-qualification tells you what you might borrow, based on numbers you report yourself. Pre-approval tells you what a lender will lend, after checking your credit, income, assets, and debts. Sellers treat the two very differently: a pre-approval letter carries weight in an offer; a pre-qualification usually does not. Get the first early, the second when you are ready to shop.",
    "published": "2026-11-03",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Home Affordability Calculator",
        "url": "/real-estate/home-affordability-calculator"
      }
    ],
    "sections": [
      {
        "heading": "The core difference: verified vs reported",
        "paragraphs": [
          "Pre-qualification and pre-approval answer the same question — how much house can you afford — with different amounts of proof behind the answer. A pre-qualification takes the income, debts, and savings you report at face value and returns a rough borrowing estimate, usually in minutes and often online. A pre-approval checks those numbers against documents and a credit report before the lender puts a dollar figure in writing.",
          "The Consumer Financial Protection Bureau (CFPB) notes that lenders use the two terms differently: some issue a pre-qualification on unverified information and reserve pre-approval for verified information, while others use only one of the two words. The label matters less than what the lender actually checked, so ask.",
          "One thing the two share: neither is a guaranteed loan offer. Both letters say a lender is generally willing to lend up to a certain amount, based on certain assumptions. The final decision comes later, after underwriting, an appraisal, and a specific property."
        ]
      },
      {
        "heading": "Side-by-side comparison",
        "paragraphs": [
          "The table below compares a typical pre-qualification with a typical pre-approval. Individual lenders vary, so treat any row as a question to confirm, not a promise."
        ],
        "table": {
          "head": [
            "",
            "Pre-qualification",
            "Pre-approval"
          ],
          "rows": [
            [
              "What it is",
              "Rough estimate from numbers you report",
              "Conditional letter for a specific loan amount"
            ],
            [
              "Verification",
              "Usually none; your word is the source",
              "Income, assets, debts, and credit checked against documents"
            ],
            [
              "Credit check",
              "Often none, or a soft check — ask the lender",
              "Credit check, typically a hard inquiry"
            ],
            [
              "Documents",
              "None required",
              "Pay stubs, W-2s, tax returns, bank statements"
            ],
            [
              "How long it takes",
              "Minutes, often online",
              "Hours to a few days, once documents are in"
            ],
            [
              "How long it lasts",
              "No expiration date; goes stale as your numbers change",
              "Typically 30 to 60 days (CFPB)"
            ],
            [
              "Weight with sellers",
              "Little; most listing agents ignore it",
              "Real; sellers frequently require it with an offer"
            ],
            [
              "Cost",
              "Free",
              "Usually free"
            ]
          ]
        }
      },
      {
        "heading": "What pre-qualification actually gives you",
        "paragraphs": [
          "Pre-qualification is a budgeting tool, not a buying tool. It answers the first question a new buyer has — roughly what price range should I be looking in — without paperwork or a credit check. That makes it the right first step when you are months from buying and want to know whether the goal is realistic.",
          "Its weakness is exactly its speed. Because nothing is verified, the estimate is only as good as the numbers you typed in. Forget a car payment, overstate your income, or guess at your debts, and the estimate moves with the error. A pre-qualification that says $400,000 means nothing if the lender later finds debts you left out.",
          "Sellers know this. A pre-qualification letter tells a listing agent you talked to a lender; it does not tell them a lender checked anything. In a competitive market, an offer backed only by a pre-qualification is often treated the same as an offer with no letter at all. Use pre-qualification to set your search budget, then upgrade before you make offers."
        ]
      },
      {
        "bullets": [
          "Government-issued photo ID",
          "Recent pay stubs showing year-to-date earnings",
          "W-2s and federal tax returns",
          "Bank and investment statements for the accounts holding your down payment",
          "A list of your monthly debts: car loans, student loans, credit cards, and any other recurring payments",
          "Documentation for any gift money going toward the down payment"
        ],
        "heading": "What pre-approval checks: the four C's",
        "paragraphs": [
          "Freddie Mac describes the pre-approval review as four C's: capacity, capital, collateral, and credit. Capacity is your ability to make the payments, judged from your income and debts. Capital is the cash and savings you can draw on for the down payment, closing costs, and reserves. Collateral is the home itself, or the type of home you plan to buy. Credit is your history of paying bills and other debts on time.",
          "To judge those four, the lender needs documents. A typical package includes recent pay stubs, W-2s, federal tax returns, and statements for the bank and investment accounts holding your down payment funds. Self-employed buyers should expect tax returns to carry more weight, since there are no pay stubs to confirm income.",
          "If the lender declines your pre-approval, ask why. The CFPB notes that a lender that evaluates your creditworthiness and tells you that you do not qualify must provide an adverse action notice, and if your credit score played a part, the lender must send you the score it used and how to get a free copy of your credit report."
        ]
      },
      {
        "heading": "How lenders size your loan: a worked example",
        "paragraphs": [
          "Lenders size a loan from your monthly income and debts, not your annual salary. A common guideline is the 28/36 rule: housing costs should stay within 28% of gross monthly income, and all monthly debt payments including housing within 36%.",
          "Take a household earning $96,000 a year — $8,000 a month before tax — with $400 a month in other debt payments. The front-end limit is 28% of $8,000, or $2,240 a month for housing. The back-end limit is 36% of $8,000, or $2,880 a month for all debts; subtract the $400 of other debts and housing can take at most $2,480. The lower number governs, so the lender's ceiling for the monthly housing payment is $2,240.",
          "That ceiling covers the full housing payment — principal, interest, taxes, insurance, and any mortgage insurance — not just principal and interest. Run your own numbers with the Home Affordability Calculator linked below before you talk to a lender.",
          "Loan type changes the math. With an FHA loan, a borrower with a credit score of 580 or higher can put down 3.5%; below 580, the minimum down payment is 10%. On a $300,000 home at 3.5% down, the down payment is $10,500 and the base loan is $289,500. FHA adds an upfront mortgage insurance premium of 1.75% of the base loan — $5,066.25, usually financed into the loan — bringing the total loan to $294,566.25. Annual mortgage insurance of 0.55% adds $1,620.11 a year, or about $135 a month.",
          "FHA loan limits also cap what you can borrow: for 2026, the floor is $541,287 in most counties and the ceiling is $1,249,125 in high-cost areas. A pre-approval for an FHA loan cannot exceed the limit for the county where the home sits."
        ],
        "table": {
          "head": [
            "FHA example: $300,000 home",
            "Amount"
          ],
          "rows": [
            [
              "Down payment (3.5%)",
              "$10,500"
            ],
            [
              "Base loan",
              "$289,500"
            ],
            [
              "Upfront mortgage insurance premium (1.75%)",
              "$5,066.25"
            ],
            [
              "Total loan amount",
              "$294,566.25"
            ],
            [
              "Annual mortgage insurance (0.55%)",
              "$1,620.11 per year, about $135 a month"
            ]
          ]
        }
      },
      {
        "heading": "Credit checks and the 45-day shopping window",
        "paragraphs": [
          "The credit check is the part buyers worry about most, and the rules are kinder than most people expect. The CFPB says a mortgage lender's credit check is recorded as an inquiry, which typically has a small negative effect on your credit scores. Checking your own credit is different: it never affects your scores, so pull your own reports and fix errors before you apply.",
          "Shopping around does not multiply the damage. Within a 45-day window, the CFPB says multiple credit checks from mortgage lenders are recorded on your credit report as a single inquiry, and the impact is the same no matter how many lenders you consult, as long as the last check falls within 45 days of the first. Three pre-approvals in three weeks cost the same, in score terms, as one.",
          "Use that window deliberately. Apply to two or three lenders inside the same few weeks, compare their letters, and hold the final choice until you have a property address and official Loan Estimates — the CFPB advises waiting until then to pick a lender. Avoid opening other credit — a car loan, a new card — just before or during the mortgage process: each one adds its own inquiry and monthly payment to your debt-to-income ratio."
        ]
      },
      {
        "heading": "How long a pre-approval lasts",
        "paragraphs": [
          "A pre-approval letter carries an expiration date. The CFPB describes 30 to 60 days as typical, and Freddie Mac advises asking your lender how long your letter will remain valid — the date printed on your letter is the one that counts, not any general range.",
          "The letter is a snapshot: it reflects your income, assets, debts, and credit on the day the lender reviewed them. A job change, a new debt, or a large deposit can make it stale before the printed date. If the letter expires while you are still shopping, the lender re-verifies your finances — usually fresh pay stubs, fresh statements, and often a new credit check — and issues a new letter.",
          "Apply too early and the letter lapses before you find a home; apply too late and you are writing offers without one. If you are still months from shopping, a pre-qualification holds your place without starting the clock."
        ]
      },
      {
        "bullets": [
          "Months from buying, testing a budget: pre-qualification.",
          "Ready to tour homes and make offers: pre-approval.",
          "Comparing lenders: apply to two or three inside the same 45-day window.",
          "Letter about to expire and still shopping: ask your lender to renew it with fresh documents.",
          "Declined for pre-approval: ask for the reason in writing, fix what you can, and reapply."
        ],
        "heading": "When to get each one",
        "paragraphs": [
          "The two steps fit different moments. Pre-qualification belongs at the start, when you are testing whether buying is realistic and what price range to watch. Pre-approval belongs when you are ready to tour homes seriously and make offers — close enough to buying that the letter's 30-to-60-day window covers your search.",
          "One last check before you shop: the amount on a pre-approval letter is the lender's maximum, not a recommendation. Freddie Mac puts it plainly — it is a maximum, and not necessarily the amount you should borrow. The CFPB makes the same point from the other side: only you can decide how much you are comfortable paying each month. Set your own budget first, then use the letter to prove you can fund it."
        ]
      }
    ],
    "seoTitle": "Pre-Approval vs Pre-Qualification: What Each Really Means",
    "slug": "mortgage-pre-approval-vs-pre-qualification",
    "sources": [
      {
        "label": "CFPB — What's the difference between a prequalification letter and a preapproval letter?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/whats-the-difference-between-a-prequalification-letter-and-a-preapproval-letter-en-127/"
      },
      {
        "label": "CFPB — Get a preapproval letter",
        "url": "https://www.consumerfinance.gov/owning-a-home/explore/get-a-preapproval-letter/"
      },
      {
        "label": "CFPB — What happens when a mortgage lender checks my credit?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-exactly-happens-when-a-mortgage-lender-checks-my-credit-en-2005/"
      },
      {
        "label": "Freddie Mac My Home — Applying for a home loan",
        "url": "https://myhome.freddiemac.com/buying/applying-for-a-home-loan"
      }
    ],
    "title": "Mortgage Pre-Approval vs Pre-Qualification",
    "type": "Comparison",
    "updated": "2026-11-03"
  },
  {
    "cornerstone": false,
    "description": "Twenty mortgage questions first-time buyers ask, answered with 2026 figures: down payments, credit scores, PMI, FHA and VA loans, rates, and closing costs.",
    "faqs": [
      {
        "answer": "You can buy with 3% down on a conventional loan through Fannie Mae's HomeReady or Freddie Mac's Home Possible programs, or a standard 97% loan-to-value loan. FHA loans need 3.5% down with a 580 credit score, and VA loans need nothing down. On a $400,000 home, 3% is $12,000. A 20% down payment avoids mortgage insurance, but waiting to save it can cost more than the insurance does.",
        "question": "How much down payment do I need as a first-time buyer?"
      },
      {
        "answer": "It depends on the loan. Since November 2025, Fannie Mae's automated system sets no fixed minimum score for conventional loans, though manually underwritten loans still need 620 and most lenders keep 620 as their own floor. FHA loans need 580 for 3.5% down or 500 for 10% down. The VA sets no minimum, but lenders usually do. A higher score also means a lower rate, whatever the program.",
        "question": "What credit score do I need to buy a house?"
      },
      {
        "answer": "Use the 28/36 rule as a starting point: housing costs within 28% of gross monthly income, total debt payments within 36%. On $8,000 a month gross, that is $2,240 for housing and $2,880 for all debts. Lenders may approve more — Fannie Mae's system allows total debt-to-income up to 50% — but the approval maximum is rarely the comfortable maximum. Run the numbers on your own budget before you shop.",
        "question": "How much house can I afford?"
      },
      {
        "answer": "Private mortgage insurance protects your lender — not you — if you stop paying, and conventional lenders require it when your down payment is below 20%. Freddie Mac estimates roughly $30 to $70 a month for every $100,000 borrowed, so a $380,000 loan costs about $114 to $266 a month. Your credit score and down payment set where you land in that range. The premium is added to your monthly payment.",
        "question": "What is PMI and how much does it cost?"
      },
      {
        "answer": "Under the Homeowners Protection Act, you can ask your servicer to cancel PMI once your loan balance reaches 80% of the home's original value, as long as your payments are current. The lender must cancel it automatically when the balance hits 78% of the original value. Home improvements and rising values can get you to 20% equity sooner, but the servicer may require a new appraisal to confirm the current value.",
        "question": "How do I get rid of PMI?"
      },
      {
        "answer": "Prequalification is a rough estimate based on figures you state, with no verification. Preapproval is a lender's conditional commitment after it checks your credit, income, debts, and assets, and states a loan amount. Sellers take preapproval seriously and largely ignore prequalification. Get preapproved before you start touring homes — it sets your price range and speeds up the offer.",
        "question": "What is the difference between prequalification and preapproval?"
      },
      {
        "answer": "Most preapproval letters last 60 to 90 days, depending on the lender. If your home search runs longer, the lender will refresh it — usually by rechecking your credit and asking for updated pay stubs and bank statements. A refreshed preapproval can change if your income, debts, or credit score moved. Avoid large purchases and new credit accounts while you shop, since both can change the answer.",
        "question": "How long does preapproval last?"
      },
      {
        "answer": "Closing costs are the fees to finalize your purchase and set up the loan: lender charges, appraisal, title insurance and settlement services, government recording fees, and prepaid taxes and insurance. They typically run 2% to 5% of the loan amount — $7,200 to $18,000 on a $360,000 loan — and are due in cash at closing on top of the down payment. Your Loan Estimate lists them line by line.",
        "question": "What are closing costs?"
      },
      {
        "answer": "The 30-year loan has the lower payment; the 15-year loan has far lower total interest. On a $360,000 loan at November 2026 average rates, the 30-year at 7.18% costs $2,439 a month and $517,956 in total interest. The 15-year at 6.57% costs $3,150 a month and $206,974 in interest — $310,981 less. Choose the 15-year only if the higher payment still leaves room for savings and emergencies.",
        "question": "Should I choose a 30-year or a 15-year mortgage?"
      },
      {
        "answer": "A fixed-rate mortgage keeps the same interest rate — and the same principal-and-interest payment — for the life of the loan. An adjustable-rate mortgage (ARM) starts with a fixed rate for an initial period, often 5, 7, or 10 years, then adjusts with market rates. ARMs usually start lower than fixed rates, which can suit a buyer who expects to move or refinance before the first adjustment.",
        "question": "What is the difference between a fixed-rate and an adjustable-rate mortgage?"
      },
      {
        "answer": "An FHA loan is insured by the Federal Housing Administration and designed for buyers with smaller down payments or weaker credit. You need 3.5% down with a 580 credit score, or 10% down with a score of 500 to 579. Every FHA loan carries mortgage insurance: 1.75% upfront plus an annual premium. The 2026 loan limit runs from $541,287 in most counties to $1,249,125 in high-cost areas.",
        "question": "What is an FHA loan and who is it for?"
      },
      {
        "answer": "VA loans are guaranteed by the Department of Veterans Affairs for eligible veterans, active-duty service members, National Guard and Reserve members, and some surviving spouses. They require no down payment and no monthly mortgage insurance. Borrowers pay a one-time funding fee instead — 2.15% of the loan on first use with less than 5% down. Veterans receiving VA disability compensation are exempt from the fee.",
        "question": "What is a VA loan and who qualifies?"
      },
      {
        "answer": "Yes, through two federal programs. VA loans offer 0% down to eligible veterans, service members, and surviving spouses. USDA loans offer 0% down in eligible rural areas to buyers within the program's income limits. Both charge fees instead of a down payment — the VA funding fee or the USDA guarantee fee — and both can be financed into the loan. Conventional and FHA loans always require some money down.",
        "question": "Can I buy a house with no down payment?"
      },
      {
        "answer": "A rate lock fixes your interest rate between the offer and closing, so market moves cannot raise it. The CFPB says locks are typically available for 30, 45, or 60 days. Your lock should run past your expected closing date, because extending one can be expensive. A lock can still change if your application changes — for example, if your loan amount, credit score, or verified income moves.",
        "question": "What is a rate lock and how long does it last?"
      },
      {
        "answer": "A discount point is prepaid interest: one point costs 1% of the loan — $3,600 on a $360,000 loan — and buys a lower interest rate. Whether it pays depends on how long you keep the loan. Divide the point cost by the monthly saving to find the breakeven: $3,600 divided by $50 a month is 72 months. If you move or refinance before then, the point loses money.",
        "question": "What are discount points and are they worth it?"
      },
      {
        "answer": "Escrow is an account your lender uses to pay your property taxes and homeowners insurance. Each month you pay one-twelfth of the annual bills with your mortgage payment, and the lender pays the county and insurer when the bills come due. Lenders usually require escrow when your down payment is below 20%. With 20% equity or more, many lenders let you pay taxes and insurance yourself.",
        "question": "What is escrow and do I need it?"
      },
      {
        "answer": "At closing you sign the loan documents and the deed, pay the cash to close — your down payment plus closing costs, minus your earnest money deposit — and receive the keys. By law you get the Closing Disclosure at least three business days before closing: compare it line by line with your Loan Estimate and question any fee that moved. Bring a cashier's check or arrange a wire for the funds.",
        "question": "What happens at closing?"
      },
      {
        "answer": "Yes. Lenders accept gift funds from family members for a down payment, but the money must be documented: the donor signs a gift letter stating the money does not have to be repaid, and the lender traces the transfer into your account. A gift that must be repaid is a loan, and lenders count it as debt. Rules vary by loan type, so confirm the paperwork with your lender before the money moves.",
        "question": "Can I use gift money for a down payment?"
      },
      {
        "answer": "Yes, if you itemize. You can deduct interest on up to $750,000 of mortgage debt on a first or second home. But itemizing only helps if your total deductions beat the 2026 standard deduction — $16,100 for single filers and $32,200 for married couples filing jointly. Many first-time buyers take the standard deduction, which means the mortgage interest deduction gives them no benefit.",
        "question": "Is mortgage interest tax-deductible?"
      },
      {
        "answer": "The appraisal protects the lender, which will not lend more than the home is worth. If the appraisal comes in low, you have three options: renegotiate the price with the seller, pay the difference in cash, or walk away if your contract has an appraisal contingency. Without a contingency, walking away can cost your earnest money. Never waive the appraisal contingency unless you can cover a gap.",
        "question": "What if the appraisal comes in below the purchase price?"
      }
    ],
    "hub": "Mortgage & Real Estate",
    "image": "/images/mortgage-faqs-first-time-buyers.jpg",
    "imageAlt": "Flat-vector illustration of a house with a large key by the front door and speech bubbles above the roof",
    "inlineImage": "/images/mortgage-faqs-first-time-buyers-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of mortgage documents, a magnifying glass, a checklist, a small house, and a piggy bank",
    "intro": "Buying your first home raises the same questions for almost everyone: how much you need for a down payment, what credit score qualifies, what the monthly payment covers, and what happens at closing. This guide answers twenty of them with 2026 figures — the November 5 Freddie Mac rate survey, FHA and VA program rules, and CFPB guidance.",
    "published": "2026-11-07",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Mortgage Payment Calculator",
        "url": "/real-estate/mortgage-payment-calculator"
      },
      {
        "name": "Home Affordability Calculator",
        "url": "/real-estate/home-affordability-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Who counts as a first-time buyer",
        "paragraphs": [
          "You do not have to have never owned a home. Under the Department of Housing and Urban Development's definition, a first-time homebuyer is someone who has not owned a principal residence in the past three years. Buy again after a gap of three years or more and you count as a first-time buyer. Single parents who owned a home only with a former spouse, and displaced homemakers, also qualify under the HUD definition.",
          "The label matters because it unlocks programs: conventional loans with 3% down, state and local down-payment assistance, and first-time buyer education courses that some lenders require. It also opens a tax break — you can withdraw up to $10,000 from an IRA penalty-free for a first home purchase, a once-in-a-lifetime exception under IRS rules. Check the fine print of each program, since some define first-time buyer differently."
        ]
      },
      {
        "heading": "How much house can you afford",
        "paragraphs": [
          "Start with two ratios. The 28/36 rule of thumb says housing costs should stay within 28% of gross monthly income and total debt payments within 36%. On a $96,000 salary — $8,000 a month before tax — that means a housing payment up to $2,240 and total debts up to $2,880. The rule is a budgeting guide, not a lender's limit, and it ignores your other spending.",
          "Lenders apply their own ceiling, the debt-to-income (DTI) ratio. Fannie Mae's automated system generally approves total DTI up to 50%, which is $4,000 a month on $8,000 of income. FHA loans start at 31% for housing and 43% for all debts — $2,480 and $3,440 on the same income — with higher tiers available when compensating factors such as cash reserves are documented.",
          "Approval is not the same as comfort. A lender's maximum assumes you spend every spare dollar on housing, so run your own budget first. The Home Affordability Calculator applies the 28/36 rule to your income and debts and shows the price range that fits."
        ]
      },
      {
        "heading": "Down payments and loan types",
        "paragraphs": [
          "The 20% down payment is a myth for first-time buyers. Conventional loans go as low as 3% down through Fannie Mae's HomeReady and Freddie Mac's Home Possible programs, and first-time buyers can use a standard 97% loan-to-value conventional loan. FHA loans ask 3.5% down with a credit score of 580 or higher, or 10% with a score of 500 to 579. VA loans need no down payment at all for eligible veterans, active-duty service members, and surviving spouses, and USDA loans offer 0% down in eligible rural areas with income limits.",
          "On a $400,000 home, those minimums mean $12,000 down for a 3% conventional loan, $14,000 for FHA at 3.5%, and $0 for VA. A 10% down payment is $40,000; 20% is $80,000 and removes the need for private mortgage insurance on a conventional loan. A smaller down payment buys sooner but means a larger loan, a higher payment, and mortgage insurance.",
          "Loan limits cap the size of the loan, not the price of the house. The 2026 conforming limit is $832,750 for a one-unit home in most counties and $1,249,125 in high-cost areas; a loan above the local limit is a jumbo loan with stricter requirements. FHA limits run from a $541,287 floor to a $1,249,125 ceiling, with $1,873,625 in special-exception areas."
        ],
        "table": {
          "head": [
            "Loan type",
            "Minimum down payment",
            "Credit score",
            "Mortgage insurance",
            "2026 loan limit"
          ],
          "rows": [
            [
              "Conventional",
              "3%",
              "No fixed minimum in automated underwriting; 620 if manually underwritten",
              "PMI below 20% down",
              "$832,750 in most counties; $1,249,125 in high-cost areas"
            ],
            [
              "FHA",
              "3.5% (580+); 10% (500-579)",
              "580 for 3.5% down; 500 for 10% down",
              "Upfront 1.75% plus annual premium",
              "$541,287 floor; $1,249,125 ceiling"
            ],
            [
              "VA",
              "0%",
              "No minimum set by the VA; lenders set their own",
              "One-time funding fee; no monthly premium",
              "No VA loan limit; entitlement governs"
            ],
            [
              "USDA",
              "0%",
              "Lenders typically require 620 or higher",
              "Guarantee fee applies",
              "Income and rural-area limits apply"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Principal: the part of the payment that reduces your loan balance.",
          "Interest: the lender's charge, highest early in the loan when the balance is largest.",
          "Taxes and insurance: set by your county and insurer, collected through escrow.",
          "Mortgage insurance: protects the lender, and ends once you reach enough equity — see the next section."
        ],
        "heading": "What your monthly payment actually covers",
        "paragraphs": [
          "Your mortgage payment is four costs bundled together, known as PITI: principal, interest, property taxes, and homeowners insurance. Mortgage insurance joins the bundle when your down payment is below 20% on a conventional loan, or on every FHA loan. Principal and interest stay fixed on a fixed-rate loan; taxes and insurance change over time, so the total payment can move even when the rate does not.",
          "The principal-and-interest figure is exact math at Freddie Mac's November 5, 2026 average rate of 7.18%. Taxes and insurance are illustrative — they vary widely by location — and the PMI figure sits inside Freddie Mac's estimated range of $30 to $70 a month for every $100,000 borrowed, which works out to $108 to $252 on a $360,000 loan."
        ],
        "table": {
          "head": [
            "Monthly cost",
            "$400,000 home, 10% down, $360,000 loan, 30-year fixed at 7.18%"
          ],
          "rows": [
            [
              "Principal and interest",
              "$2,439"
            ],
            [
              "Property taxes (illustrative, $4,400 a year)",
              "$367"
            ],
            [
              "Homeowners insurance (illustrative, $1,800 a year)",
              "$150"
            ],
            [
              "PMI (illustrative; Freddie Mac range is $108-$252)",
              "$180"
            ],
            [
              "Total monthly payment",
              "$3,136"
            ]
          ]
        }
      },
      {
        "heading": "Mortgage insurance: PMI, MIP, and the VA funding fee",
        "paragraphs": [
          "Mortgage insurance protects the lender, not you. On a conventional loan with less than 20% down, private mortgage insurance (PMI) is usually a monthly premium added to your payment. Freddie Mac estimates roughly $30 to $70 a month for every $100,000 borrowed, so a $380,000 loan costs about $114 to $266 a month. The good news: under the Homeowners Protection Act you can ask your servicer to cancel PMI once your balance reaches 80% of the home's original value, and the lender must cancel it automatically at 78%.",
          "FHA loans charge their own insurance on every loan. The upfront premium is 1.75% of the base loan — $6,755 on a $386,000 loan — and it can be financed into the loan. The annual premium is 0.50% or 0.55% on base loans up to $832,750 (0.70% or 0.75% above that), paid monthly; on a $386,000 loan at 0.55% that is about $177 a month. The annual premium lasts the life of the loan when your down payment is below 10%, and 11 years when it is 10% or more.",
          "VA loans charge no monthly mortgage insurance. Instead, most borrowers pay a one-time funding fee, a percentage of the loan that can be financed. Veterans receiving VA compensation for a service-connected disability are exempt.",
          "On a $400,000 loan with no down payment, a first-time VA borrower pays $8,600 (2.15%). An interest rate reduction refinance loan (IRRRL) carries a 0.5% fee."
        ],
        "table": {
          "head": [
            "VA funding fee, purchase loans",
            "First use",
            "Subsequent use"
          ],
          "rows": [
            [
              "Less than 5% down",
              "2.15%",
              "3.30%"
            ],
            [
              "5% to less than 10% down",
              "1.50%",
              "1.50%"
            ],
            [
              "10% or more down",
              "1.25%",
              "1.25%"
            ]
          ]
        }
      },
      {
        "heading": "Rates, locks, and points in November 2026",
        "paragraphs": [
          "Freddie Mac's Primary Mortgage Market Survey put the average 30-year fixed rate at 7.18% for the week of November 5, 2026, down from 7.24% the week before — the third straight weekly decline — and up from 6.22% a year earlier. The 15-year fixed averaged 6.57%. These are national averages for conventional conforming loans, not quotes: your rate depends on your credit score, down payment, loan type, and whether you pay points.",
          "The 15-year loan costs $711 more a month but saves $310,981 in interest over the life of the loan. The trade is cash flow against total cost: the shorter term builds equity far faster, but the higher payment leaves less room for other goals.",
          "Once you have a rate you like, a rate lock holds it while your loan closes. The CFPB says locks are typically available for 30, 45, or 60 days, and extending one can be expensive — so the lock should run past your expected closing date. A lock can still change if your application changes, for example if your loan amount or credit score moves. Discount points are the other lever: one point costs 1% of the loan — $3,600 on a $360,000 loan — and buys a lower rate. Divide the point cost by the monthly saving to find how many months it takes to break even."
        ],
        "table": {
          "head": [
            "$360,000 loan",
            "Rate (Nov 5, 2026)",
            "Monthly principal and interest",
            "Total interest"
          ],
          "rows": [
            [
              "30-year fixed",
              "7.18%",
              "$2,439",
              "$517,956"
            ],
            [
              "15-year fixed",
              "6.57%",
              "$3,150",
              "$206,974"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Check your credit reports and fix errors before you apply.",
          "Get preapproved, then shop lenders on the same day so rate quotes are comparable.",
          "Make an offer with inspection, appraisal, and financing contingencies.",
          "Lock your rate, then let the lender order the appraisal and verify your file.",
          "Review the Closing Disclosure at least three business days before closing and compare it with the Loan Estimate.",
          "At closing, sign the loan documents, pay the cash to close, and get the keys."
        ],
        "heading": "From preapproval to closing",
        "paragraphs": [
          "Preapproval comes first: the lender verifies your income, debts, and credit and states how much it will lend, which tells sellers your offer is serious. Shop at least three lenders and compare their Loan Estimates side by side — the CFPB requires lenders to send a Loan Estimate within three business days of your application, and the standard form makes comparison straightforward.",
          "Budget for closing costs of 2% to 5% of the loan amount — $7,200 to $18,000 on a $360,000 loan — covering lender fees, title and settlement services, government charges, and prepaid taxes and insurance. Cash to close is the down payment plus closing costs: on a $400,000 home with 10% down and closing costs at 3% of the loan, that is $40,000 plus $10,800, or $50,800. Earnest money, the good-faith deposit you pay with your offer, is held in escrow and credited toward that total at closing."
        ]
      }
    ],
    "seoTitle": "Mortgage FAQs: 20 First-Time Buyer Questions Answered",
    "slug": "mortgage-faqs-first-time-buyers",
    "sources": [
      {
        "label": "Consumer Financial Protection Bureau — What is private mortgage insurance?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-private-mortgage-insurance-en-122/"
      },
      {
        "label": "Freddie Mac — Primary Mortgage Market Survey",
        "url": "https://www.freddiemac.com/pmms"
      },
      {
        "label": "U.S. Department of Housing and Urban Development — FHA mortgage limits",
        "url": "https://www.hud.gov/program_offices/housing/sfh/lender/origination/mortgage_limits"
      },
      {
        "label": "U.S. Department of Veterans Affairs — VA funding fee and closing costs",
        "url": "https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/"
      }
    ],
    "title": "Mortgage FAQs: 20 Questions First-Time Buyers Ask",
    "type": "FAQ",
    "updated": "2026-11-07"
  }
]
