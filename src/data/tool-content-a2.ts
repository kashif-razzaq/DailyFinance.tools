import type { ToolContentEntry } from "./tool-content";

export const TOOL_CONTENT_A2: Record<string, ToolContentEntry> = {
  "personal-wealth/credit-card-payoff-calculator": {
    quickAnswer:
      "A credit card payoff calculator turns a balance, an APR and a fixed monthly payment into a payoff date and total interest. A $6,500 balance at 24.99% APR paid at $250 a month clears in 38 months with $2,957 of interest. Paying only the issuer minimum on the same balance takes 262 months and costs $12,402 of interest.",
    howItWorks: [
      "Enter the balance, the APR and the fixed amount you can pay each month. The calculator charges a month of interest, subtracts your payment, and repeats on the smaller balance until it reaches zero, counting months and adding up interest. It also runs the minimum-payment path alongside, modelling the minimum as one month's interest plus 1% of the balance, with a $25 floor — the formula most large issuers use.",
      "A minimum payment shrinks as the balance shrinks, so most of it keeps going to interest. On this balance the first minimum is about $200, but it falls every month. Freezing the payment at $250 — only $50 above that first minimum — clears the debt in 38 months instead of 262. The discipline is not paying more; it is refusing to pay less as the balance falls.",
      "Check the warning case first. If your payment is smaller than one month's interest, the balance grows while you pay. On $6,500 at 24.99%, one month of interest is about $135 — a $125 payment leaves you $10 deeper in debt every month, and the calculator shows the debt never clearing. Any workable plan starts above that line, and the further above it, the faster the principal share of each payment grows.",
      "Put your APR in context. The Federal Reserve's G.19 release put the average rate on card accounts actually charged interest at 22.36% in the third quarter of 2026. A 24.99% card sits above that average but well inside the normal range for store and rewards cards. Card APRs are usually variable, tied to the prime rate, so the rate on your statement can move — the calculator's answer assumes today's rate holds.",
      "Use the saving figure to judge extra payments. Raising the payment from $250 to $350 clears this balance in 24 months instead of 38 and cuts interest from $2,957 to $1,804 — the extra $100 a month buys $1,153 of avoided interest and 14 months of freedom. That is the return on every spare dollar at a 24.99% APR: a guaranteed 24.99%, which no savings account or investment matches with certainty.",
    ],
    formula: "Each month: interest = balance × APR ÷ 12; new balance = balance + interest − payment. Minimum payment (modelled) = the larger of $25 and interest + 1% of the balance. Total interest is the sum of the monthly interest charges.",
    example: {
      title: "Worked example: $6,500 at 24.99% APR, $250 a month",
      body: "Month one: interest is $6,500 × 24.99% ÷ 12, about $135, so $115 of the $250 reduces the balance. As the balance falls, the interest share shrinks and the principal share grows. The debt clears in month 38, and total interest is $2,957 — about 46 cents of interest per dollar borrowed. The minimum-payment path on the same balance takes 262 months, nearly 22 years, and costs $12,402 of interest. Raise the payment to $350 and the debt clears in about 24 months with roughly $1,804 of interest, saving $1,153 for $100 more a month. The calculator also shows the debt-free date, so the 38 months become a calendar month you can plan around.",
    },
    faqs: [
      {
        question: "How are credit card minimum payments calculated?",
        answer:
          "Most issuers charge the greater of a flat floor (often $25) or the month's interest plus 1% of the balance, sometimes plus fees. Because the payment falls as the balance falls, minimum-only repayment of a large balance can take over 20 years — your statement must show how long, and what a fixed higher payment would save.",
      },
      {
        question: "Does a 0% balance transfer help?",
        answer:
          "It can: moving a balance to a 0% promotional APR (typically 12 to 21 months) stops interest entirely, so every dollar of payment cuts principal. Count the transfer fee — usually 3% to 5% of the balance — and have a plan for the end of the promotion, when the remaining balance reverts to a high standard APR.",
      },
      {
        question: "Should I pay off the card with the highest APR or the smallest balance first?",
        answer:
          "Highest APR first (the avalanche method) always costs less interest. Smallest balance first (the snowball method) costs more but clears individual cards sooner, which some people find keeps them going. The interest difference on moderate balances is often a few hundred dollars — the method you will actually stick to is the better one.",
      },
      {
        question: "Will paying off my cards improve my credit score?",
        answer:
          "Usually, yes, mainly through utilisation: balances relative to credit limits are a major scoring factor, and keeping reported utilisation below about 30% — lower is better — helps. Keep paid-off cards open unless there is an annual fee problem, because closing them cuts your total limit and raises utilisation on the rest.",
      },
    ],
  },

  "personal-wealth/debt-avalanche-vs-snowball-calculator": {
    quickAnswer:
      "This calculator compares the two standard debt repayment orders on your actual debts. On a $2,400 store card at 12% and a $4,800 credit card at 28%, paid with $400 a month, the avalanche method (highest rate first) clears everything in 24 months for $1,511 of interest; the snowball (smallest balance first) takes 27 months and $2,182 — the order alone costs $671.",
    howItWorks: [
      "List up to three debts, each with its balance, APR and minimum payment, then enter the extra money available each month on top of all the minimums. The calculator simulates both strategies month by month on the same debts and the same budget, so the only difference between the two results is the order in which debts are attacked.",
      "Both methods pay every minimum first. They differ only in where the leftover money goes: avalanche aims it at the highest APR; snowball aims it at the smallest balance to score an early win. When a debt clears under either method, its minimum payment rolls into the attack payment for the next debt — the roll-up that makes the payoff accelerate sharply in the later months.",
      "Sometimes the two methods are identical, and the calculator will tell you so. If your smallest debt is also your highest-rate debt, both orders attack the same card first. That is the case with the tool's default example: the $2,200 store card is both the smallest balance and the highest APR at 29.99%, so avalanche and snowball agree exactly — 44 months and $5,621 of interest either way.",
      "The real trade-off is the date of the first cleared debt. In the worked example, snowball clears the store card in month 9, while avalanche does not clear its first debt — the credit card — until month 18. That nine-month gap is what snowball buys you: a closed account, one fewer payment, and visible progress while the expensive debt is still being worked down.",
      "Read the interest gap alongside the size of the debts. The gap grows with the spread between the APRs and with the size of the high-rate balance. On small balances with similar rates it is often under $100 and the choice barely matters; on a large balance at 28% against a small one at 12%, it runs to hundreds of dollars and several months — the case for avalanche strengthens as the numbers get bigger.",
    ],
    formula: "Both methods simulate month by month: interest = balance × APR ÷ 12 on each debt; minimums are paid first; surplus goes to the target debt (highest APR or smallest balance). Total cost = sum of all interest charged until every balance is zero.",
    example: {
      title: "Worked example: two cards, $400 a month total",
      body: "Store card: $2,400 at 12% APR, $60 minimum. Credit card: $4,800 at 28% APR, $110 minimum. Minimums total $170, leaving $230 of attack money on a $400 monthly budget. Avalanche sends the $230 to the 28% card: all debt gone in 24 months, interest $1,511. Snowball sends it to the store card, clearing it in month 9 for motivation: debt-free in 27 months, interest $2,182. Same payments, same debts — the order costs $671 and three extra months, and the price of the early win is exactly $671.",
    },
    faqs: [
      {
        question: "Is the avalanche method always cheaper?",
        answer:
          "Yes, mathematically, whenever the APR order differs from the balance order. Interest accrues fastest on the highest-rate balance, so killing it first minimises total interest. When the smallest debt is also the highest-rate one — common with store cards — both methods are identical, as the tool's default example shows.",
      },
      {
        question: "Why do people choose snowball if it costs more?",
        answer:
          "Behaviour. Clearing a debt entirely removes a payment and produces visible progress early, and researchers have found small-debt wins can improve follow-through. A plan abandoned in month three costs more than either method. The worked example prices the trade-off precisely: here, momentum costs $671.",
      },
      {
        question: "What if I have a 0% promotional balance?",
        answer:
          "Treat its APR as 0% until the promotion ends, then as the full go-to rate — avalanche logic handles it automatically if you update the rate at expiry. Watch for deferred-interest retail promotions, which are different: miss the deadline and interest is charged back to the purchase date.",
      },
      {
        question: "Should I stop investing while paying off debt?",
        answer:
          "Capture any employer 401(k) match first — that is an immediate 50% to 100% return no debt can beat. Beyond the match, paying a 28% APR is a guaranteed 28% return, which no investment reliably offers. Once expensive debt is gone, redirect the entire payoff budget into investing.",
      },
    ],
  },

  "personal-wealth/student-loan-payoff-calculator": {
    quickAnswer:
      "This calculator shows how extra payments change a student loan's payoff date and total interest. A $37,000 loan at 6.5% paid at $400 a month clears in 129 months with $14,479 of interest. Adding $100 a month clears it in 95 months instead and saves $4,070 of interest — 34 fewer payments for $9,500 of extra contributions.",
    howItWorks: [
      "Enter your balance, interest rate, current monthly payment and any extra amount you can add. The calculator amortises the loan month by month: interest on the balance first, the rest of the payment to principal, then repeats on the smaller balance. It runs the base payment and the payment-plus-extra side by side, so the months and dollars saved are exact, not estimated.",
      "Know your rate's context. Federal Direct Loans first disbursed between July 1, 2026 and June 30, 2027 carry a fixed 6.52% for undergraduates, 8.07% for graduate and professional students, and 9.07% for PLUS loans, per Federal Student Aid. The rate is fixed for the life of each loan and set annually from the May 10-year Treasury auction — the tool's 6.5% default sits almost exactly on the current undergraduate rate.",
      "Extra payments go entirely to principal, which is why they punch above their weight: each extra dollar removes the interest that dollar would have attracted for the rest of the term. Confirm your servicer applies extra payments to principal rather than as advance payments on future bills — the two treatments look identical on a statement but only the first shortens the loan.",
      "Check your payment against the standard plan. The standard 10-year payment on $37,000 at 6.5% is $420.13 a month, with $13,415 of interest over the term. A $400 payment is below that standard figure, which is why the base case runs 129 months instead of 120 — the calculator exposes a payment that is quietly too small, as well as one that is generous.",
      "Compare the saving against your alternatives honestly. At 6.5%, an extra dollar earns a guaranteed 6.5% by avoiding interest. That beats a savings account and carries no market risk, but it is below the long-run return investors hope for from equities — and unlike an investment, a paid-off loan cannot be re-borrowed in an emergency, so keep your cash buffer intact first.",
    ],
    formula: "Monthly payment = Balance × (r ÷ 12) ÷ [1 − (1 + r ÷ 12)^(−months)]. Total interest = (payment × months) − balance. Extra payments shorten the month count in the month-by-month simulation.",
    example: {
      title: "Worked example: $37,000 at 6.5%, $400 a month plus $100 extra",
      body: "Month one: interest is $37,000 × 6.5% ÷ 12, about $200, so $200 of the $400 payment reduces principal. At $400 a month the balance clears in month 129 — 10 years and 9 months — with total interest of $14,479. Pay $500 instead and the balance clears in month 95, just under 8 years, with $10,410 of interest. The extra $100 a month, $9,500 in total, removes $4,070 of interest and 34 payments. The standard 10-year payment on this loan would be $420.13, so even the $500 payment is only $80 above standard — a modest overpayment with a large effect.",
    },
    faqs: [
      {
        question: "What is the standard federal student loan repayment term?",
        answer:
          "10 years on the Standard Repayment Plan, with a minimum payment of $50. Federal undergraduate loans disbursed in 2026-27 carry a fixed 6.52% rate; graduate loans 8.07% and PLUS loans 9.07%. Rates are set each year from the Treasury auction and fixed for the life of each loan.",
      },
      {
        question: "Should I pay extra or use an income-driven plan?",
        answer:
          "They solve different problems. Income-driven repayment caps payments at a share of income and forgives any balance after a set period, but total interest paid is usually higher. If you can afford the standard payment comfortably, extra payments cost less overall. Federal repayment options changed under the 2025 tax law — verify the current plans at studentaid.gov before choosing.",
      },
      {
        question: "Does paying extra on student loans affect my taxes?",
        answer:
          "Up to $2,500 of student loan interest a year is deductible as an adjustment to income, without itemising. For 2026 it phases out between $85,000 and $100,000 of modified AGI for single filers ($175,000 to $205,000 joint). Paying the loan off faster reduces the interest you can deduct, but a dollar of interest saved beats the roughly 22 cents of tax it might have saved in the 22% bracket.",
      },
      {
        question: "Should I pay off student loans before investing?",
        answer:
          "After capturing any employer retirement match and holding a starter emergency fund, compare rates. Above roughly 7%, paying the loan down is hard to beat on a risk-adjusted basis. At 4% to 5%, investing the surplus is defensible, especially inside tax-advantaged accounts whose annual contribution room expires.",
      },
    ],
  },

  "personal-wealth/401k-vs-solo-401k-calculator": {
    quickAnswer:
      "This calculator compares retirement saving as a W-2 employee with a 401(k) against self-employment with a Solo 401(k). On $120,000 of compensation with a $15,000 employee contribution, the W-2 side adds a 4% match ($4,800) for $19,800 a year; the Solo side adds $15,000 of profit-sharing for $30,000. Over 30 years at 7%, that gap compounds to $3,138,314 versus $2,174,814.",
    howItWorks: [
      "Enter your current balance, compensation, employee contribution, the employer match in the W-2 scenario, and the profit-sharing contribution in the Solo scenario, plus your ages and expected return. The calculator projects both accounts to retirement age at the same return, from the same starting balance, so the only difference between the two lines is how much goes in each year.",
      "The Solo 401(k) advantage is structural: as your own employer, you make both sides of the contribution. The employee side follows the same elective deferral limit as any 401(k). The employer side allows profit-sharing of up to 25% of compensation, subject to the overall annual additions limit — on $120,000 of compensation that is up to $30,000, against a 4% match of $4,800 on the W-2 side.",
      "For tax year 2026 the IRS limits are $24,500 of employee deferral, plus an $8,000 catch-up at age 50 or older ($32,500 total) and an $11,250 catch-up for ages 60 to 63 ($35,750 total), with a combined employee-plus-employer limit of $72,000 (IRS Notice 2025-67). The calculator caps your employee contribution at the limit for your age and caps the Solo employer side at the $72,000 combined ceiling.",
      "For the self-employed, 'compensation' has a specific meaning: net earnings after the deductible half of self-employment tax and after the employer contribution itself, which makes the effective maximum about 20% of net self-employment income for a sole proprietor. S-corps calculate it from W-2 wages instead, where the full 25% applies. The calculator's profit-sharing input takes your figure as given — your tax adviser computes the exact one.",
      "Two sharing rules matter. The employee deferral limit is shared across all your 401(k)s combined — a W-2 employee with freelance income cannot defer $24,500 in each plan. And from 2026, catch-up contributions must be Roth for participants whose prior-year FICA wages from that employer exceeded $150,000, under SECURE 2.0. The projection itself is an estimate at a constant return; real markets vary year to year.",
    ],
    formula: "W-2 total = Employee contribution + (Match % × Salary). Solo total = Employee contribution + Profit-sharing, capped at the IRS overall limit ($72,000 for 2026, plus catch-ups if eligible). Projected value = Balance × (1 + r)^years + Annual × [((1 + r)^years − 1) ÷ r].",
    example: {
      title: "Worked example: $120,000 of income, $15,000 employee contribution, age 35 to 65",
      body: "Starting balance $40,000, return 7%, 30 years. W-2 scenario: you defer $15,000 and your employer matches 4% of salary — $4,800 — for $19,800 a year going in, projecting to $2,174,814 at 65. Solo scenario: you defer the same $15,000 as employee, then your business adds $15,000 of profit-sharing, for $30,000 a year, projecting to $3,138,314. The $10,200 annual contribution gap becomes a $963,500 gap at retirement. Maxing the Solo side — a $24,500 deferral plus $30,000 of profit-sharing — puts $54,500 a year in, still inside the $72,000 combined limit.",
    },
    faqs: [
      {
        question: "What is the 401(k) contribution limit for 2026?",
        answer:
          "The employee elective deferral limit is $24,500 for 2026 if under 50, with an $8,000 catch-up at 50-plus ($32,500 total) and an $11,250 catch-up for ages 60 to 63 ($35,750 total). The combined employee-plus-employer limit is $72,000, with catch-ups on top. These figures are published by the IRS each autumn in its cost-of-living notice.",
      },
      {
        question: "Who can open a Solo 401(k)?",
        answer:
          "A self-employed person or business owner with no employees other than a spouse. If you hire other staff, you generally must move to a regular 401(k) or another plan. Side income counts: many W-2 employees with freelance income open a Solo 401(k) for that business, but the employee deferral limit is shared across all your 401(k)s combined.",
      },
      {
        question: "What is the deadline for Solo 401(k) contributions?",
        answer:
          "The plan must be established by the end of the tax year (31 December) for the employee deferral to count for that year, and the deferral election is made by year-end. Employer profit-sharing contributions can typically be funded up to the business tax filing deadline, including extensions. Check the current rules with your plan provider, as SECURE 2.0 changed some deadlines.",
      },
      {
        question: "Solo 401(k) or SEP IRA — which allows more?",
        answer:
          "At the same income, the Solo 401(k) usually allows more, because the SEP only has the employer side (up to 25% of compensation). At $60,000 of self-employment compensation, a SEP allows about $12,000 (the effective 20% for sole proprietors), while a Solo 401(k) allows that plus the full employee deferral. The Solo 401(k) also permits Roth contributions and loans, which a SEP does not.",
      },
    ],
  },

  "personal-wealth/coast-fire-calculator": {
    quickAnswer:
      "Coast FIRE is the point where your invested savings, left untouched, will grow into a full retirement pot by retirement age without another contribution. If you need $50,000 a year in retirement and expect a 7% return, the full pot is $1,250,000 and the coast number at 30 is about $117,000 — invest that by 30 and compounding does the rest.",
    howItWorks: [
      "Enter your expected annual spending in retirement, your current age, retirement age and expected return. The calculator first sizes the full retirement pot using the 25× spending rule (spending divided by a 4% withdrawal rate), then discounts it back to today at your return to find the coast number — the amount that, invested now, reaches the full pot on its own.",
      "Add what you have already invested and a monthly contribution to find your coast date: the number of months of contributing until your balance crosses the coast number. On the default figures — $50,000 invested, $500 a month — the gap to the $117,079 coast number is $67,079, closed in about 70 months, or just under six years. Your $50,000 alone, left untouched, would reach only about $533,829 by 65.",
      "Respect the assumptions. The coast number is acutely sensitive to the return: at 5% instead of 7%, the 30-year-old's target rises from about $117,000 to about $227,000; at 6% it is about $163,000. A coast plan built on an optimistic return is a plan to return to full saving later, so test the 5% case before treating the coast number as a promise.",
      "Use a real (after-inflation) return to keep the maths in today's money. A 7% nominal return with 2% to 3% inflation is roughly a 4% to 5% real return — and at 5% the coast number nearly doubles. The calculator takes the return you enter at face value, so enter the after-inflation figure if your spending target is stated in today's dollars, as it is here.",
      "Social Security shrinks the target. The average retired-worker benefit was about $2,071 a month in 2026 after the 2.8% cost-of-living adjustment — roughly $24,850 a year. If benefits cover $25,000 of your $50,000 spending, the portfolio only needs to supply $25,000 and the full pot falls from $1,250,000 to $625,000. Conservative planners discount the benefit rather than ignoring it entirely.",
    ],
    formula: "Full retirement pot = Annual retirement spending × 25. Coast number = Full pot ÷ (1 + return)^(years until retirement). Months to coast are simulated: balance grows monthly at return ÷ 12 plus the monthly contribution until it reaches the coast number.",
    example: {
      title: "Worked example: coast number at 30 for retirement at 65",
      body: "Planned retirement spending: $50,000 a year, so the full pot target is $50,000 × 25 = $1,250,000. Discount at 7% over 35 years: $1,250,000 ÷ 1.07^35 = $117,079. Invest roughly $117,000 by age 30 and, if 7% materialises, the pot reaches $1,250,000 at 65 with no further contributions. Already holding $50,000 at 30 leaves a gap of about $67,000 — at $500 a month, roughly 70 months of contributing before you can coast. Already past the number? The calculator reports 'Already Coasting' and the gap shows as zero.",
    },
    faqs: [
      {
        question: "Where does the 25× spending figure come from?",
        answer:
          "It is the inverse of the 4% withdrawal guideline: a pot of 25 times annual spending can pay out 4% in the first year and adjust for inflation, and historically that has usually lasted 30 years. It is a planning heuristic from US market data, not a guarantee — lower expected returns argue for 28× to 33× (a 3% to 3.5% withdrawal rate).",
      },
      {
        question: "Does Coast FIRE mean I can stop working?",
        answer:
          "No — it means you can stop saving for retirement. You still need income to cover living costs between now and retirement age. What changes is the type of work you can accept: a lower-paid, less stressful or part-time job that covers expenses becomes viable because retirement is already funded in the background.",
      },
      {
        question: "Should Social Security change my coast number?",
        answer:
          "It reduces the pot you need. If Social Security will cover $25,000 of your $50,000 spending, the portfolio only needs to supply $25,000, and the target falls from $1,250,000 to $625,000. Conservative planners discount the benefit (for example by 25%) rather than ignoring it entirely, given the programme's projected funding shortfall.",
      },
      {
        question: "What return should I use for the coast calculation?",
        answer:
          "A real (after-inflation) return keeps the maths in today's money: roughly 4% to 5% for a stock-heavy portfolio if you expect 7% nominal returns and 2% to 3% inflation. Using the nominal return against today's spending target overstates your progress — the most common Coast FIRE error.",
      },
    ],
  },

  "personal-wealth/fat-fire-vs-lean-fire-calculator": {
    quickAnswer:
      "This calculator sizes two versions of financial independence: lean FIRE on a frugal budget and fat FIRE on a generous one. At $3,000 a month of spending, lean FIRE needs a pot of $900,000. At $10,000 a month, fat FIRE needs $3,000,000. With $80,000 invested and $1,500 a month saved at 7%, lean arrives in about 17.8 years and fat in about 32.5 — a 14.8-year gap.",
    howItWorks: [
      "Enter your lean and fat monthly spending figures, what you have invested and your monthly saving. The calculator multiplies each spending level by 12 and then by 25 to get the two target pots (the 4% withdrawal guideline), then simulates month by month — balance compounding at your return plus the monthly contribution — until each target is crossed.",
      "The useful output is the gap in years, not just the gap in dollars. On the default figures the fat target is $2,100,000 larger but takes 14.8 extra years, because the pot is bigger and your contributions are a smaller share of its growth. The last stretch to fat FIRE is disproportionately long: by then the portfolio's own growth rivals your contributions, so each additional year of work buys more than it did at the start.",
      "Most people land between the poles. Planning on $6,000 a month sets a $1,800,000 target and lands in about 25.9 years on these inputs — roughly 8 years after lean and 6.6 years before fat. The calculator's amber panel states the gap explicitly so you can see what the middle ground costs in years, not just in dollars.",
      "Test the spending inputs before anything else. The difference between $6,000 and $7,000 a month of planned retirement spending is $300,000 of required pot — several years of saving for most households. Knowing which expenses actually drive your quality of life is worth more than any return assumption, and it is the input only you can set.",
      "Remember what the 25× rule assumes. It is the inverse of the 4% withdrawal guideline, derived for roughly 30-year retirements from US market data. For a retirement starting at 40 that may last 50 years, a 3.25% to 3.5% withdrawal rate — a 29× to 31× pot — is a more common planning choice, and it pushes both targets and both dates further out.",
    ],
    formula: "Target pot = Monthly spending × 12 × 25. Time to target is simulated month by month: balance grows at return ÷ 12 and the monthly saving is added until the balance reaches the target.",
    example: {
      title: "Worked example: $80,000 invested, $1,500 a month saved, 7% return",
      body: "Lean FIRE at $3,000 a month: target $900,000, reached in about 17.8 years. Fat FIRE at $10,000 a month: target $3,000,000, reached in about 32.5 years. The fat lifestyle costs roughly 14.8 extra years of saving on this plan. The middle ground — $6,000 a month, a $1,800,000 target — lands in about 25.9 years. Raising the monthly saving from $1,500 to $3,000 would cut the fat timeline from 32.5 years to about 25.5, which is why income growth directed entirely to saving is the lever that moves these dates most.",
    },
    faqs: [
      {
        question: "What spending levels count as lean and fat FIRE?",
        answer:
          "The community usage is loose: lean FIRE usually means under about $40,000 to $45,000 a year of spending, fat FIRE above $100,000 a year, with regular FIRE between. The labels matter less than your own two numbers — price the life you would accept and the life you would choose, and look at the years between them.",
      },
      {
        question: "Is the 4% rule safe for a 40- or 50-year retirement?",
        answer:
          "It was derived for roughly 30-year retirements. For very early retirees, a 3.25% to 3.5% withdrawal rate (a 29× to 31× pot) is a more common planning choice, because the portfolio must survive more market cycles and there is less room to return to work. Building the target with 25× and retiring at 35 leaves thin margins.",
      },
      {
        question: "Does fat FIRE require a higher income, or just more time?",
        answer:
          "Either. In the worked example, the fat target takes about 32.5 years on $1,500 a month of saving. Raising saving to $3,000 a month cuts it to roughly 25.5 years. The mathematics is indifferent: more saved per month, or more months. Income growth directed entirely to saving is the lever that moves it most.",
      },
      {
        question: "Should my FIRE spending include housing and healthcare?",
        answer:
          "Yes — the target must cover all spending the portfolio will fund, including housing (or rent), health insurance premiums before Medicare at 65 (a major early-retirement cost in the US), and taxes on withdrawals. Paid-off housing lowers the spending figure substantially, which is why many early retirees treat the mortgage payoff as part of the plan.",
      },
    ],
  },

  "personal-wealth/hsa-triple-tax-advantage-calculator": {
    quickAnswer:
      "An HSA is the only US account that is tax-free going in, growing and coming out for medical costs. Contributing the 2026 self-only maximum of $4,400 a year for 20 years at a 7% return, from a $5,000 starting balance, builds about $199,729 — and a 22% bracket saver avoids roughly $49,572 of tax across the contributions, the payroll tax and the growth.",
    howItWorks: [
      "Enter your annual contribution, current balance, expected return, years and marginal tax bracket. The calculator compounds the account annually at your return, then quantifies the tax you avoided in three separate lines: income tax on the contributions, payroll tax on contributions made through an employer plan, and income tax on the investment growth.",
      "The 'triple' advantage is literal. Contributions through payroll also escape Social Security and Medicare tax (7.65%), which even a 401(k) contribution does not. Growth is untaxed. Withdrawals for qualified medical expenses — dental, vision, prescriptions, most care, and Medicare premiums after 65 — are untaxed. On a $4,400 annual contribution in the 22% bracket, the payroll route saves about $1,305 of tax in the first year alone.",
      "For 2026 the IRS limits are $4,400 for self-only coverage and $8,750 for family coverage, plus a $1,000 catch-up at age 55 or older (IRS Revenue Procedure 2025-19). The qualifying high-deductible plan must have a minimum deductible of $1,700 self-only or $3,400 family, and an out-of-pocket maximum no higher than $8,500 self-only or $17,000 family. Employer contributions count toward the same limit.",
      "The strategy the calculator prices is paying current medical bills from cash flow, saving the receipts, and letting the HSA invest for decades. There is no deadline for reimbursing yourself for an expense incurred while the HSA existed, so the account can be tapped tax-free in retirement against a drawer of old receipts — the growth then compounds on money that was never taxed at any stage.",
      "The advantage depends on investing, not just saving. Most providers require a minimum cash balance (often $1,000 to $2,000) and let you invest the rest in mutual funds or ETFs. An HSA left in a low-interest sweep account for 20 years forfeits most of the growth the calculator shows, and the growth line is where the largest single tax saving sits — $23,480 of the $49,572 total in the worked example.",
    ],
    formula: "Projected value = Balance × (1 + r)^years + Annual contribution × [((1 + r)^years − 1) ÷ r]. Tax saved = contributions × bracket + contributions × 7.65% (payroll) + growth × bracket.",
    example: {
      title: "Worked example: $4,400 a year for 20 years at 7%, 22% bracket",
      body: "Starting balance $5,000. Contributions total $88,000 over 20 years, so $93,000 goes in. Compounded annually at 7%, the account reaches about $199,729 — growth of roughly $106,729. Tax saved: $19,360 of income tax on the contributions, $6,732 of payroll tax (7.65% on $88,000), and $23,480 of income tax on the growth, for a total of about $49,572. The same growth in a brokerage account would owe capital gains tax, and in a traditional 401(k) full income tax on withdrawal. A family contributing the $8,750 maximum on the same terms reaches about $378,059.",
    },
    faqs: [
      {
        question: "What are the HSA contribution limits for 2026?",
        answer:
          "For 2026: $4,400 for self-only coverage and $8,750 for family coverage, plus a $1,000 catch-up at 55 or older, per IRS Revenue Procedure 2025-19. You must be enrolled in an HSA-qualifying high-deductible health plan and have no other disqualifying coverage. Employer contributions count toward the same limit.",
      },
      {
        question: "Can I invest HSA money or must it sit in cash?",
        answer:
          "You can invest it. Most providers require a minimum cash balance (often $1,000 to $2,000) and let you invest the rest in mutual funds or ETFs. The long-horizon strategy only works if the money is invested; an HSA left in a low-interest sweep account for 20 years forfeits most of the advantage the calculator shows.",
      },
      {
        question: "What happens to an HSA at age 65?",
        answer:
          "It becomes more flexible: withdrawals for non-medical expenses are taxed as ordinary income — like a traditional IRA — with no penalty after 65. Medicare premiums can be paid from an HSA tax-free. You can no longer contribute once enrolled in Medicare.",
      },
      {
        question: "Do HSA balances expire or get forfeited?",
        answer:
          "No. Unlike a flexible spending account, an HSA is yours permanently, rolls over every year, and moves with you between employers. There is no use-it-or-lose-it rule and no deadline on reimbursing eligible expenses you paid out of pocket, provided the expense came after the HSA was established.",
      },
    ],
  },

  "real-estate/mortgage-payment-calculator": {
    quickAnswer:
      "A mortgage payment calculator builds your full monthly payment — principal, interest, tax and insurance (PITI) — not just the loan part. A $340,000 loan at 6.75% over 30 years costs $2,205 a month in principal and interest; add $4,675 a year of tax and $1,800 of insurance on a $425,000 home and the real payment is $2,745, with $453,884 of interest over the term.",
    howItWorks: [
      "Enter the home price, down payment percentage, interest rate and term. The calculator computes the fixed principal-and-interest payment that amortises the loan to zero on schedule, then adds property tax (as a yearly dollar amount) and homeowners insurance to reach the payment you will actually make. HOA dues and mortgage insurance are added as separate lines when they apply.",
      "Most lenders collect tax and insurance monthly into an escrow account and pay the bills for you, so the PITI figure is the cheque you write. Two parts of it move over time: tax follows your local assessment and insurance premiums have risen sharply in many states, so a payment quoted at purchase is not fixed for 30 years even on a fixed-rate loan.",
      "Below 20% down, the calculator adds private mortgage insurance at the rate you enter — 0.5% of the loan a year by default. On this home with 10% down, the loan is $382,500, the principal-and-interest payment rises to $2,481 and PMI adds about $159 a month. PMI typically costs 0.3% to 1.5% of the loan per year, priced by credit score and loan-to-value.",
      "Compare loans on the interest rate and fees, but budget on PITI. The gap between the two in the example — about $540 a month — is where buyers who shop on the loan payment alone get caught out, along with HOA dues and, below 20% down, PMI. The tool's breakdown chart shows each component's share of the monthly payment so the non-loan costs are visible.",
      "The term choice is the biggest lever on total cost. The same $340,000 loan over 15 years at 6.75% costs $3,009 a month but total interest falls from $453,884 to about $201,565. In practice 15-year rates are usually lower than 30-year rates, widening the saving further. The trade is flexibility: the 30-year's lower required payment can be voluntarily overpaid, while the 15-year's higher payment is compulsory in a bad month too.",
    ],
    formula: "Monthly principal and interest = Loan × [r(1 + r)^n] ÷ [(1 + r)^n − 1], where r is the monthly rate (annual rate ÷ 12) and n the number of payments. PITI = principal and interest + (annual tax ÷ 12) + (annual insurance ÷ 12) + HOA + PMI, where PMI applies below 20% down.",
    example: {
      title: "Worked example: $425,000 home, $340,000 loan at 6.75%",
      body: "Principal and interest on $340,000 at 6.75% over 360 payments: $2,205.23. Property tax of $4,675 a year: $389.58 a month. Insurance of $1,800 a year: $150 a month. Total PITI = $2,744.82. Over the full term, the loan part alone totals $793,884 — $453,884 of interest on top of the $340,000 borrowed, which is the real price of a 30-year term. In month one, $1,912.50 of the $2,205.23 payment is interest and only $292.73 is principal.",
    },
    faqs: [
      {
        question: "How much of my first payment is interest?",
        answer:
          "Most of it. On the worked example, month one's interest is $340,000 × 6.75% ÷ 12 = $1,912.50 of the $2,205.23 payment — 87%. The split improves every month as the balance falls; by year 20 of a 30-year loan at this rate, roughly half the payment is principal. This front-loading is just the arithmetic of interest on a large starting balance, not a lender trick.",
      },
      {
        question: "What is PMI and when does it apply?",
        answer:
          "Private mortgage insurance protects the lender when you put down less than 20% on a conventional loan. It typically costs 0.3% to 1.5% of the loan amount per year — about $159 a month on a $382,500 loan at 0.5%. Under the Homeowners Protection Act you can request cancellation at 80% of the original value, and it must end automatically at 78% on the original schedule.",
      },
      {
        question: "15-year or 30-year mortgage — how big is the difference?",
        answer:
          "On $340,000 at the same 6.75%, a 15-year payment is about $3,009 but total interest falls from $453,884 to about $201,565. In practice 15-year rates are usually lower than 30-year rates, widening the saving further. The trade is flexibility: the 30-year's lower required payment can be voluntarily overpaid, while the 15-year's higher payment is compulsory in a bad month too.",
      },
      {
        question: "Are taxes and insurance the same everywhere?",
        answer:
          "No — this is the biggest regional variable in housing cost. Effective property tax rates run from about 0.27% of value in Hawaii to about 2.23% in New Jersey, per the Tax Foundation's 2025 analysis, and insurance varies several-fold between low-risk inland areas and hurricane or wildfire zones. Always model with your actual local figures, not national averages.",
      },
    ],
  },

  "real-estate/mortgage-amortization-calculator": {
    quickAnswer:
      "An amortization calculator lays out a loan month by month: payment, interest, principal and remaining balance. A $360,000 mortgage at 6.85% over 30 years has a payment of $2,358.93 — and a total interest bill of $489,216, more than the loan itself. In year one you pay $24,543 of interest and reduce the debt by only $3,764.",
    howItWorks: [
      "Enter the home price, down payment, rate and term. The calculator fixes the payment that clears the loan exactly on schedule, then builds the full table: each month, interest is charged on the outstanding balance, the remainder of the payment reduces principal, and the balance steps down. The yearly view rolls the same schedule up by year, with the balance at each year-end.",
      "Early payments are mostly interest because the balance is at its largest; the principal share grows every month as the balance falls. In month one, $2,055 of the $2,358.93 payment is interest and $303.93 is principal. Halfway through the loan you have not repaid half the money — after 15 years the balance is still about $264,911 of the original $360,000, and principal does not exceed interest in a monthly payment until month 240.",
      "The calculator also runs the schedule with an extra monthly payment, so the saving is exact. Adding $200 a month to this loan clears it in 286 months instead of 360 and cuts total interest from $489,216 to $370,490 — a saving of $118,726 for $57,200 of extra payments. Extra paid early is worth most, because it avoids interest for the longest time.",
      "Use the yearly view to plan. The schedule shows your balance at any future date (what you would owe if you sold or refinanced), the interest you will pay in any year (the figure your lender reports on Form 1098), and how extra payments rewrite the end of the schedule. The balance column is the payoff figure a sale or refinance has to clear.",
      "The interest column also settles the tax question. Mortgage interest is deductible if you itemise, on acquisition debt up to $750,000 for loans taken out after December 2017 — a cap the 2025 tax law made permanent. But for 2026 the standard deduction is $16,100 single and $32,200 married filing jointly, so most households still take the standard deduction and get no benefit from the interest they pay.",
    ],
    formula: "Payment = Loan × [r(1 + r)^n] ÷ [(1 + r)^n − 1]. Each period: interest = balance × r; principal = payment − interest; new balance = balance − principal, where r is the monthly rate and n the total payments. Extra payments add directly to principal.",
    example: {
      title: "Worked example: $360,000 at 6.85% for 30 years",
      body: "Payment: $2,358.93. Month one: interest $2,055, principal $303.93, balance $359,696.07. In year one you pay $28,307 and reduce the debt by only about $3,764, while $24,543 goes to interest. Total paid over 360 months: $849,216, of which $489,216 is interest. Add $200 a month and the loan clears in month 286 — 74 months early — with $370,490 of interest, saving $118,726. The crossover point where principal first exceeds interest in a monthly payment arrives in month 240 — 20 years in.",
    },
    faqs: [
      {
        question: "Why is so much interest charged at the start?",
        answer:
          "Because interest is charged on what you owe, and you owe the most at the start. The rate never changes; the balance it applies to does. There is no front-loading rule to negotiate away — any loan at 6.85% on a $360,000 balance costs $2,055 in its first month, whatever the payment schedule.",
      },
      {
        question: "What does an extra payment do to the schedule?",
        answer:
          "It removes principal immediately, so every subsequent month's interest charge falls. Extra paid early is worth most, because it avoids interest for the longest time. Adding $200 a month to the example loan saves about $118,726 of interest and shortens the loan by 74 months — the calculator's with-extra column shows the exact new schedule.",
      },
      {
        question: "Does amortization apply to interest-only loans?",
        answer:
          "No — interest-only payments do not amortise at all; the balance is unchanged until the interest-only period ends, when payments jump to amortise the full amount over the remaining term. The calculator's schedule assumes a fully amortising loan, which covers most fixed-rate mortgages.",
      },
      {
        question: "Can I see how much interest I will pay this tax year?",
        answer:
          "Yes — sum the interest column for the 12 payments falling in the calendar year. That is the figure your lender reports on Form 1098. Mortgage interest is deductible if you itemise, on acquisition debt up to $750,000 for loans taken out after December 2017, but for 2026 the standard deduction is $16,100 single and $32,200 married filing jointly, so most households take the standard deduction instead.",
      },
    ],
  },

  "real-estate/mortgage-payoff-calculator": {
    quickAnswer:
      "A mortgage payoff calculator shows what extra payments buy you. On a $340,000 balance at 6.5% over 30 years, the standard payment of $2,149 runs to month 360 and $433,651 of interest. Adding $200 a month ends the loan in 284 months — 76 months early — and saves $107,244 of interest, for $56,800 of extra payments.",
    howItWorks: [
      "Enter your current balance, rate, remaining term and any extra amount you can add monthly or as a lump sum. The calculator re-amortises the loan: the required payment stays the same, the extra goes entirely to principal, and the loan ends when the balance hits zero instead of at the scheduled date. The baseline and accelerated schedules are simulated side by side, so the months and dollars saved are exact.",
      "Every extra dollar has a double effect — it removes that dollar of debt and all the interest that dollar would have attracted for the rest of the term. That is why the $200-a-month example saves $107,244 on $56,800 of extra payments: each extra dollar returned almost $1.89. Extra payments made early, with decades of interest ahead of them, are worth several times their face value by the end.",
      "A lump sum works the same way, only sooner. Paying $10,000 once, today, on this loan clears it in 330 months instead of 360 and saves $54,571 of interest — more than five dollars saved per dollar paid, because the money removes principal for the entire remaining term. If the money is available now and your emergency fund is intact, the lump sum beats the same total dribbled in over years.",
      "Compare the guaranteed return honestly. Paying extra on a 6.5% mortgage earns a certain 6.5%. If your rate is 3%, the same logic makes extra payments a poor use of money next to almost any alternative. The calculator gives you the interest saved; whether to chase it depends on your rate, your liquidity and your other debts — a 24% credit card balance always comes first.",
      "One extra payment a year is the classic version of the same idea. Paying half the monthly amount every two weeks yields 26 half-payments — 13 monthly payments a year — which on this loan is equivalent to about $179 extra a month. Tell your servicer explicitly that extra funds go to principal, otherwise they may be applied to future payments, which does not reduce interest the same way.",
    ],
    formula: "Simulated month by month: interest = balance × rate ÷ 12; principal = (scheduled payment + extra) − interest; balance falls by principal until it reaches zero. A lump sum reduces the balance before the simulation starts. Interest saved = interest on the original schedule − interest on the accelerated schedule.",
    example: {
      title: "Worked example: $340,000 at 6.5%, 30 years, plus $200 a month",
      body: "Scheduled payment on $340,000 at 6.5% over 360 months: $2,149.03, with $433,651 of interest over the term. Add $200 a month (total $2,349.03) and the loan clears in 284 months — 76 payments early — with $326,407 of interest. Saving: $107,244. The extra contributions total $56,800 over the period, so each extra dollar saved about $1.89 of interest. A single $10,000 lump sum instead would clear the loan in 330 months and save $54,571 — the same money, earlier, works harder.",
    },
    faqs: [
      {
        question: "Is one extra payment a year as good as it sounds?",
        answer:
          "It is a real effect. Making 13 payments' worth per year — commonly done by paying half the monthly amount every two weeks, which yields 26 half-payments — on a 30-year loan at typical rates cuts roughly 4 to 6 years off the term. Monthly extra payments of the same annual total do slightly better, because the money reduces the balance sooner on average.",
      },
      {
        question: "Should I pay off my mortgage or invest?",
        answer:
          "Compare your mortgage rate with an after-tax, risk-adjusted investment return. At a 6.5% mortgage rate, payoff is a guaranteed 6.5% — hard to beat. At 3%, investing has historically won comfortably, though it is never guaranteed. Also weigh liquidity: home equity is hard to access in a crisis, while an investment account can be sold in days. Many households split the difference.",
      },
      {
        question: "Does my mortgage have a prepayment penalty?",
        answer:
          "Most modern US residential mortgages do not, and federal rules restrict prepayment penalties on most loans made after 2014. Check your closing disclosure to be sure, and tell your servicer explicitly that extra funds go to principal — otherwise they may be applied to future payments, which does not reduce interest the same way.",
      },
      {
        question: "Is a lump sum or monthly extra better?",
        answer:
          "For the same total money, earlier is better: a lump sum today removes principal for the entire remaining term. $10,000 paid today on the example loan saves $54,571 of interest, more than five dollars per dollar paid. If the money is available now and your emergency fund is intact, the lump sum wins mathematically.",
      },
    ],
  },

  "real-estate/home-affordability-calculator": {
    quickAnswer:
      "A home affordability calculator works from your income and debts to a maximum home price, using the lender's 28/36 rule: housing costs under 28% of gross income, all debts under 36%. On an income of $95,000 with $450 a month of other debts and $60,000 down, the housing budget is $2,217 a month — roughly a $331,750 home at 6.75%.",
    howItWorks: [
      "Enter your gross annual income, monthly debts (car, cards, student loans — minimum payments as a lender counts them), your down payment and a mortgage rate. The calculator applies the front-end ratio (28% of gross monthly income for housing, including tax and insurance) and the back-end ratio (36% for housing plus all other debts) and takes the lower of the two as your payment budget.",
      "On the default figures the front-end ratio binds. Gross monthly income is $7,916.67, so the front-end limit is 28% = $2,216.67 for housing, while the back-end limit is 36% = $2,850 minus $450 of debts = $2,400. The calculator uses $2,216.67, and the result panel names the binding rule so you can see which side of your finances is doing the limiting.",
      "It then converts the payment budget into a loan amount at your rate and term, subtracting estimated tax and insurance, and adds your down payment to reach a price. The tax and insurance assumptions move the answer a lot — the same income supports a much cheaper house in a 2% property-tax state than in a 0.5% one, which is why the tool takes your local figures rather than a national average.",
      "Check the loan-to-value the answer implies. The default result is a $271,750 loan on a $331,750 home — an LTV of about 82%, above the 80% line where private mortgage insurance applies on a conventional loan. The tool does not add PMI to the payment, so the real monthly cost at this price would be higher than the $2,217 budget by the PMI premium — roughly $113 a month at 0.5% of the loan.",
      "Treat the result as a lender's ceiling, not a target. Lenders approve against gross income and ignore childcare, savings goals and the rest of your actual life. Many buyers are comfortable only at 80% or so of the maximum a lender would allow; your own budget, run on take-home pay, is the binding test. A rate half a point higher would cut about $91 a month from the same payment — worth roughly $14,000 of price.",
    ],
    formula: "Max housing payment = min(28% × gross monthly income, 36% × gross monthly income − monthly debts). Max loan = payment available for principal and interest ÷ mortgage payment factor at the given rate and term. Max price = max loan + down payment.",
    example: {
      title: "Worked example: $95,000 income, $450 a month of debts, $60,000 down",
      body: "Gross monthly income is $7,916.67. Front-end limit: 28% = $2,216.67 for housing. Back-end limit: 36% = $2,850, minus $450 of debts = $2,400 — so the front-end figure binds at $2,216.67. Assuming tax at 1.1% of value and insurance of $1,800 a year, that payment supports a price of about $331,750 with $60,000 down and a loan near $271,750 at 6.75%. The principal-and-interest share is $1,762.56 and tax is $304.10 a month. Total debt-to-income at this price is 33.7%, inside the 36% back-end cap.",
    },
    faqs: [
      {
        question: "What do lenders actually count as debts in the back-end ratio?",
        answer:
          "The minimum monthly payments on revolving and installment debts as they appear on your credit report: car loans, student loans, credit card minimums, personal loans. Utilities, insurance premiums, rent and subscriptions do not count. For student loans in income-driven repayment, lenders use specific rules (often the actual payment, or 0.5% to 1% of the balance) that vary by loan programme.",
      },
      {
        question: "How much do I need for a down payment?",
        answer:
          "Less than the traditional 20%: conventional loans start at 3% down for eligible buyers, FHA at 3.5%, and VA and USDA loans at 0% for eligible borrowers. But a smaller down payment means a bigger loan, a higher payment and mortgage insurance — on the example income, dropping from 20% to 5% down cuts the affordable price because the payment budget must cover a larger loan plus PMI.",
      },
      {
        question: "Why do different calculators give me different prices?",
        answer:
          "Different ratio assumptions (some lenders stretch to 45% or higher on the back-end ratio with strong credit), different tax and insurance estimates, and whether HOA dues and PMI are included. A $200-a-month difference in assumed tax and insurance is worth roughly $25,000 to $30,000 of price at current rates.",
      },
      {
        question: "Does a higher credit score change affordability?",
        answer:
          "Yes, through the rate. Mortgage pricing is tiered by credit score and down payment; a borrower at 780 typically pays a rate half a point or more below a borrower at 660 for the same loan. On a $271,750 loan, half a point is about $91 a month — which is itself worth roughly $14,000 of additional price at the same payment.",
      },
    ],
  },

  "real-estate/refinance-calculator": {
    quickAnswer:
      "A refinance calculator compares your current loan with a new one and finds the break-even point. Refinancing a $320,000 balance from 7.5% with 27 years left to 6.0% over 30 years cuts the payment from $2,306 to $1,919 — saving $388 a month — so $6,000 of closing costs are recovered in 16 months. Stay longer than that and the refinance pays; move sooner and it loses money.",
    howItWorks: [
      "Enter your current balance, current rate and remaining term, then the new rate, new term and the closing costs of the new loan. The calculator computes both payments, the monthly saving, and divides the costs by the saving to get break-even in months. It also totals the remaining interest on each loan, so you can see the lifetime picture alongside the monthly one.",
      "Watch the term reset. Refinancing 27 remaining years into a new 30-year loan lowers the payment partly by stretching the debt, not only by cutting the rate. The new loan's total interest is about $370,682 against $427,257 remaining on the current loan — a genuine lifetime saving here of $50,575 after costs, but smaller than the monthly saving suggests. Refinance into 27 years instead (payment $1,996.75) and total interest falls to $326,948, a lifetime saving of $94,309.",
      "Costs can be quoted three ways: paid in cash, rolled into the loan (raising the balance), or covered by a higher rate in a 'no-cost' refinance. The maths only works if you count them. Rolling $6,000 into the example loan raises the balance to $326,000 and the payment to about $1,955 — the saving shrinks to $352 a month, and the lifetime cost rises because you pay interest on the costs too.",
      "The old rule that a refinance needs a 1% rate drop is too crude — what matters is the dollar saving against the costs and how long you will keep the loan. On a $320,000 balance, even 0.5% saves about $105 a month and can break even in under five years. On a $120,000 balance the same half point saves about $40 a month and may never repay $6,000 of costs. Run your own numbers.",
      "The refinance also restarts the amortisation clock on interest. In the first year of the new 30-year loan, most of each payment is interest again — the same front-loading you escaped by paying down the old loan for three years. That is the hidden cost of the term reset, and it is why matching the remaining term, or shorter, is usually the better refinance even when the payment saving is smaller.",
    ],
    formula: "Monthly saving = current payment − new payment. Break-even months = total closing costs ÷ monthly saving. Payments from: Payment = Balance × [r(1 + r)^n] ÷ [(1 + r)^n − 1]. Lifetime saving = remaining interest on the current loan − (interest on the new loan + closing costs).",
    example: {
      title: "Worked example: $320,000 from 7.5% to 6.0%",
      body: "Current: $320,000 at 7.5% with 27 years (324 payments) left — payment $2,306.35, remaining interest about $427,257. New: $320,000 at 6.0% over 30 years — payment $1,918.56. Monthly saving $387.79; closing costs of $6,000 break even at 16 months. Lifetime saving after costs: $50,575. Refinance instead into 27 years at 6.0% (payment $1,996.75) and total interest falls to about $326,948 — a lifetime saving of $94,309 on a smaller monthly saving of $309.60, with break-even at 20 months.",
    },
    faqs: [
      {
        question: "How much rate drop justifies a refinance?",
        answer:
          "The old rule of 1% is too crude — what matters is the dollar saving against the costs and how long you will keep the loan. On a $320,000 balance, even 0.5% saves about $105 a month and can break even in under five years. On a $120,000 balance the same half point saves about $40 a month and may never repay $6,000 of costs. Run your own numbers.",
      },
      {
        question: "What do refinance closing costs typically include?",
        answer:
          "Lender fees (origination, underwriting), appraisal, title insurance and search, recording fees, and prepaid escrows for tax and insurance. Total costs commonly run 2% to 5% of the loan amount, though competition and state title costs move this widely. You receive a Loan Estimate within three business days of applying — compare the 'services you cannot shop for' and lender fees between lenders.",
      },
      {
        question: "Does refinancing hurt my credit score?",
        answer:
          "Briefly, by a small amount: a hard inquiry and a new account typically cost a few points, recovering within months. Rate-shopping for a mortgage within a 14- to 45-day window counts as a single inquiry under FICO and VantageScore models, so gather quotes together. The far larger score factor is continuing to pay every existing account on time.",
      },
      {
        question: "What is a cash-out refinance and when does it make sense?",
        answer:
          "You borrow more than the current balance and take the difference in cash. It can be rational for consolidating much more expensive debt or funding home improvements, because mortgage rates are usually the cheapest borrowing available. It converts unsecured debt into debt secured on your home, however, and cash-out pricing is slightly worse than rate-and-term pricing — the discipline to not re-run the cards is the real cost.",
      },
    ],
  },

  "real-estate/rent-vs-buy-calculator": {
    quickAnswer:
      "Rent vs buy is decided mainly by how long you will stay. On a $425,000 home with 20% down at 6.75%, buying's net cost over 7 years is about $171,157, versus about $166,769 of rent starting at $1,800 a month — renting ahead by $4,388. At 3 years renting wins by $29,570; at 12 years buying wins by $63,223. There is no universal answer, only a break-even horizon.",
    howItWorks: [
      "Enter the home price, down payment, mortgage rate, expected years in the home, and the rent of a comparable place. The calculator totals the true cost of each path over that horizon — not the payments, the costs: for buying, the down payment, 2% buying costs, all monthly payments, tax, insurance and maintenance, and 6% selling costs, minus the equity you keep when you sell; for renting, the rent paid with annual increases plus renters insurance.",
      "The result flips with the horizon because buying's heavy fixed costs — about 2% to buy and 6% to sell — are paid once, while its running costs are partly offset by principal repayment and appreciation. Short stays cannot amortise the transaction costs. On these figures the break-even year is year 8: renting is ahead through year 7, and buying pulls ahead by $5,714 in year 8, widening every year after.",
      "Read the monthly figures alongside the net cost. Buying costs $3,098.98 a month all-in on these figures — $2,205.23 of principal and interest plus $389.58 of tax, $150 of insurance and $354.17 of maintenance — against $1,800 of rent. The monthly cash outflow of buying is far higher even when the net cost is close, because much of the mortgage payment builds equity you recover at sale.",
      "Appreciation is the swing input. The comparison assumes 3% a year, which lifts the home from $425,000 to $522,696 over 7 years — $97,696 of gain that buying keeps. At 0% appreciation that gain vanishes and buying's net cost rises by roughly that amount, making renting the clear winner; at 5% buying wins comfortably. Appreciation is the one input nobody can forecast, so run the 0% case before deciding.",
      "Know what the tool does not count. It does not assign an opportunity cost to the $85,000 down payment sitting in the house instead of invested, and it does not count mortgage interest tax deductions — for 2026 the standard deduction is $16,100 single and $32,200 joint, so most buyers get no deduction benefit anyway. Both omissions tilt the comparison slightly toward buying; the break-even year is an estimate, not a promise.",
    ],
    formula: "Net cost of buying = down payment + buying costs (2% of price) + all monthly payments + tax, insurance and maintenance + selling costs (6% of sale price) − (sale price − remaining loan balance). Net cost of renting = sum of rent over the horizon with annual increases, plus renters insurance.",
    example: {
      title: "Worked example: $425,000 home vs $1,800 a month rent, 7 years",
      body: "Buy: $85,000 down, $340,000 loan at 6.75% (payment $2,205.23), $8,500 of buying costs, and $3,098.98 a month all-in. Over 7 years you pay $260,314 in monthly costs; the home appreciates to $522,696 at 3% a year, and after 6% selling costs and clearing the $308,677 remaining balance you recover $182,657. Net cost of buying: $171,157. Rent at $1,800 a month rising 3% a year, plus $15 a month of renters insurance, totals $166,769. Verdict for this horizon: effectively even, with renting ahead by $4,388 — extend the stay to 8 years and buying takes the lead.",
    },
    faqs: [
      {
        question: "What is the 5% rule for rent vs buy?",
        answer:
          "A shortcut from Canadian planner Ben Felix: estimate the annual unrecoverable cost of owning as about 5% of the home's value (roughly 1% tax, 1% maintenance, 3% cost of capital). If you can rent a comparable home for less than that per year — $21,250 on a $425,000 home, or $1,771 a month — renting is financially competitive. It is a screening rule, not a substitute for the full calculation.",
      },
      {
        question: "Isn't rent just throwing money away?",
        answer:
          "No — rent buys housing, exactly as the interest, tax, insurance and maintenance portions of a mortgage payment do. Only the principal portion of a mortgage payment builds wealth, and early in a loan that portion is small: on the example loan, about $293 of the first $2,205 payment. The honest comparison is unrecoverable cost versus unrecoverable cost, which is what this calculator does.",
      },
      {
        question: "How much does home price appreciation change the answer?",
        answer:
          "More than any other assumption. At 3% a year the example home gains about $97,700 over 7 years; at 0% it gains nothing and buying's net cost rises by roughly that amount, making renting the clear winner; at 5% buying wins comfortably. Appreciation is the one input nobody can forecast, so run the 0% case before deciding.",
      },
      {
        question: "How long do I need to stay for buying to pay off?",
        answer:
          "At current rates and typical transaction costs, the break-even horizon is commonly 5 to 7 years, longer when rates are high or rent is cheap relative to prices, shorter when rent is high. On these figures it is year 8. If there is a realistic chance of moving within 3 years — job, family, city — renting is usually the financially safer choice.",
      },
    ],
  },

  "real-estate/down-payment-calculator": {
    quickAnswer:
      "A down payment calculator converts a home price into the cash you need at each percentage level, and how long saving takes. On a $425,000 home: 20% down is $85,000, 10% is $42,500, and the FHA minimum of 3.5% is $14,875. With $15,000 already saved and $600 a month at 3%, the 20% target takes about 98 months.",
    howItWorks: [
      "Enter the target home price and the down payment percentage, or enter a savings amount and monthly contribution to see the timeline. The calculator shows the cash required, the resulting loan amount, and — because the loan shrinks as the deposit grows — the monthly payment at each level. A comparison panel lists the four common levels side by side: 3.5%, 5%, 10% and 20%.",
      "The percentage matters in three places at once. It sets the loan size and therefore the payment. It decides whether you pay mortgage insurance: below 20% on a conventional loan, PMI applies until you reach roughly 20% equity, typically costing 0.3% to 1.5% of the loan a year. And it affects the rate you are offered, because lenders price loans in tiers by loan-to-value.",
      "The minimums are lower than most buyers assume. Conventional loans start at 3% down for eligible buyers, FHA at 3.5% with a 580 credit score (10% down with a score of 500 to 579), and VA and USDA loans at 0% for eligible borrowers. For 2026 the FHA loan limit runs from $541,287 in most counties to $1,249,125 in high-cost areas, and the conforming loan limit is $832,750.",
      "Do not empty yourself to reach 20%. Closing costs add 2% to 5% of the price on top of the deposit, and moving into a home with no cash reserve left is how a routine repair becomes credit card debt. For many buyers, 10% down with a plan to remove PMI beats 20% down with empty accounts — the 10% target on this home is reachable in 42 months, against 98 for 20%.",
      "Weigh the cost of waiting. If prices rise 3% a year, a $425,000 home costs about $12,750 more per year of waiting, while rent keeps being paid. The 98-month timeline to 20% down means the target itself is moving: the home you are saving for may cost more by the time you get there. The calculator's date output makes the trade-off concrete — a calendar month, not a vague 'someday'.",
    ],
    formula: "Down payment = Home price × down payment %. Loan amount = price − down payment. Months to save are simulated: savings grow monthly at return ÷ 12 plus the monthly contribution until the goal is reached.",
    example: {
      title: "Worked example: $425,000 home, $15,000 saved, $600 a month at 3%",
      body: "20% down: $85,000 deposit, loan $340,000, payment at 6.75% about $2,205 a month, no PMI. 10% down: $42,500, loan $382,500, payment about $2,481 plus PMI until equity builds. 3.5% down (FHA): $14,875, loan $410,125, payment about $2,660 plus FHA mortgage insurance — 1.75% upfront and 0.55% a year on most 30-year loans. Saving for the 20% target at $600 a month earning 3% takes about 98 months — 8 years and 2 months — with $58,800 contributed and $11,200 of growth. The 10% target takes 42 months.",
    },
    faqs: [
      {
        question: "What is the minimum down payment in the US?",
        answer:
          "3% for many conventional loans (for eligible first-time and lower-income buyers), 3.5% for FHA loans with a 580 credit score, and 0% for VA loans and USDA loans in eligible rural areas. Low-deposit loans carry mortgage insurance and higher payments, but they let buyers purchase years earlier — often the better trade in a rising market.",
      },
      {
        question: "How does PMI removal work?",
        answer:
          "On a conventional loan, you can request PMI cancellation when the balance reaches 80% of the home's original value, and it must terminate automatically at 78% on the original amortisation schedule. If the home has appreciated, a new appraisal (at your cost) can establish 20% equity sooner. FHA mortgage insurance on low-deposit loans generally lasts the life of the loan, removable only by refinancing into a conventional loan.",
      },
      {
        question: "Can my down payment be a gift?",
        answer:
          "Usually yes, from a family member, with a signed gift letter stating the money is not a loan, and a paper trail of the transfer. Lenders scrutinise large deposits: expect to document the source of any deposit larger than about half the monthly income. Seasoned funds — in your account for at least two statement cycles — attract fewer questions.",
      },
      {
        question: "Should I keep saving for 20% or buy sooner with less?",
        answer:
          "Compare the cost of waiting: PMI and a higher rate for a period, versus house price growth and rent paid while you save. If prices rise 3% a year, a $425,000 home costs about $12,750 more per year of waiting. Buying at 10% down and cancelling PMI within a few years is often the cheaper path — run both timelines rather than following the 20% rule by default.",
      },
    ],
  },

  "real-estate/closing-cost-calculator": {
    quickAnswer:
      "Closing costs are the fees and prepayments due on top of your down payment when you buy — typically 2% to 5% of the purchase price. On a $425,000 purchase with a $340,000 loan, the itemised total is $10,547: about $7,278 of lender, title and government fees plus about $3,269 of prepaid tax and insurance. Cash to close with 20% down is $95,547.",
    howItWorks: [
      "Work through the list line by line: lender charges (origination, application, underwriting), third-party services (appraisal, credit report, title search, title insurance, settlement), government charges (recording fees, transfer taxes where they apply), and prepaids (a year of homeowners insurance, several months of property tax, and the initial escrow deposit). Every line is editable — replace an estimate with your lender's actual quote and the total updates.",
      "The calculator separates true fees from prepaids, which matters for judgement. Prepaids are your own future bills collected early — they would be paid anyway. Fees are the transaction's real friction, and they are the part worth negotiating and comparing between lenders on the Loan Estimate form. On these figures the fees are $7,278 and the prepaids and escrow reserves are $3,269.",
      "Some costs scale with the loan, some with the price, and many are flat. Origination is modelled at 0.5% of the loan ($1,700 here) and title insurance at 0.5% of the price ($2,125), while the appraisal ($450) and recording charges ($275) are flat. Prepaid interest covers 15 days at the loan's per-diem rate — $943 on this loan at 6.75%. That mix is why the total lands in a 2% to 5% band rather than at a single percentage.",
      "Your state and city move the total more than any other factor. Transfer taxes range from zero in many states to several percent of the price in some cities, and title insurance is rate-regulated in some states and shopped in others. The calculator's estimates are national typicals; a purchase in a high-transfer-tax city can total twice the figure shown here, and your Loan Estimate is the authoritative number.",
      "The total is also a negotiating lever. Lender credits can cover part of the costs in exchange for a slightly higher rate, and a seller concession — the seller crediting part of your closing costs — is effectively a price adjustment, capped by loan programme rules. Compare the lender-credit option's rate increase against the fee it covers: on a long-held loan, a quarter-point higher rate usually costs far more than the fee.",
    ],
    formula: "Total closing costs = lender fees + third-party fees + government charges + prepaid items and escrow deposits. As a rule of thumb: 2% to 5% of purchase price for a purchase; refinances typically run lower, around 2% to 3% of the loan amount.",
    example: {
      title: "Worked example: $425,000 purchase, $340,000 loan",
      body: "Lender and third-party fees: origination 0.5% of the loan $1,700, application and processing $500, appraisal $450, credit report and flood certificate $85, title search and settlement $1,200, title insurance 0.5% of the price $2,125, recording and transfer charges $275, prepaid interest for 15 days $943 — subtotal $7,278. Prepaids and escrow: 12 months of homeowners insurance $1,800, a 2-month insurance reserve $300, and 3 months of property tax at 1.1% of the price ($1,169) — subtotal $3,269. Total: $10,547, about 2.5% of the price. Add the $85,000 down payment and cash to close is $95,547.",
    },
    faqs: [
      {
        question: "Who pays closing costs — buyer or seller?",
        answer:
          "The buyer pays most, but the split is negotiable and custom varies by market. Sellers pay their own costs, dominated by agent commissions (historically 5% to 6% of price, now negotiable since the 2024 NAR settlement changes). Buyers can also ask for a seller concession — the seller credits part of the buyer's closing costs — effectively a price adjustment, capped by loan programme rules.",
      },
      {
        question: "Can closing costs be rolled into the loan?",
        answer:
          "Effectively, in three ways: a larger loan amount (needs sufficient equity and appraisal value), a lender credit in exchange for a slightly higher rate, or a seller concession. All three trade a higher ongoing cost for lower cash today. Compare the lender-credit option's rate increase against the fee it covers — on a long-held loan, a quarter-point higher rate usually costs far more than the fee.",
      },
      {
        question: "What is the Loan Estimate and why does it matter?",
        answer:
          "It is the standardised three-page form a lender must give you within three business days of application, itemising the rate, payment and every closing cost, and marking which services you may shop for. Federal rules limit how much final costs can exceed the estimate for most categories: lender fees and transfer taxes cannot increase, and many third-party fees are capped at a 10% cumulative tolerance.",
      },
      {
        question: "Are closing costs tax-deductible?",
        answer:
          "Mostly no for a purchase — they are added to your cost basis in the home instead, which reduces taxable gain when you sell. Points paid to buy down the rate on a primary-home purchase are generally deductible in the year paid if you itemise. Keep the Closing Disclosure; it is the document your basis calculation will rely on.",
      },
    ],
  },

  "real-estate/home-equity-calculator": {
    quickAnswer:
      "Home equity is your home's value minus what you owe on it. A $450,000 home with a $285,000 mortgage holds $165,000 of equity — 36.7% of the value. Lenders typically let you borrow against part of it: at an 80% combined loan-to-value cap, accessible equity on this home is $75,000; at 90% it is $120,000.",
    howItWorks: [
      "Enter your home's current market value and the balances of every loan secured on it — first mortgage, HELOC, home equity loan. The calculator subtracts total debt from value and expresses the result in dollars and as a percentage of the home's value (your equity position; one minus the combined loan-to-value). On the default figures the loan-to-value is 63.3%.",
      "Then it applies a lender cap. Most lenders cap combined loan-to-value at 80% to 90% for equity products, so the full equity figure is not borrowable. The accessible amount is (cap × value) − existing balances, which the calculator shows at three caps: 80%, 85% and 90%. The higher the cap, the more you can borrow — and the higher the rate a lender usually charges for the privilege.",
      "Equity changes from three directions: principal repayment (slow, reliable), appreciation (fast, unreliable) and new borrowing (instant, negative). Track which one moved your number. Equity built by appreciation can vanish in a downturn, which is why borrowing against the full appraised value at a market peak is how households end up owing more than the home is worth.",
      "Principal repayment is slower than most borrowers expect. On a new $285,000 loan at 6.5% over 30 years, only about $258 of the first payment is principal — the rest is interest. Equity from repayment builds meaningfully only in the later years of a loan, which is why extra principal payments are the fastest lever you control: they move the balance down on a schedule you choose.",
      "Borrowing against equity is borrowing against your home, with the home as collateral. A home equity loan is a fixed lump sum with a fixed rate and payment; a HELOC is a revolving line, usually with a variable rate, a draw period (often 10 years, interest-only) and then a repayment period. HELOC rates move with the prime rate, so a line opened at 8% can be at 10% within a year; the loan's fixed rate cannot.",
    ],
    formula: "Equity = Home value − total mortgage balances. Equity % = equity ÷ home value. Accessible equity at a lender cap = (CLTV cap × home value) − existing balances.",
    example: {
      title: "Worked example: $450,000 home, $285,000 mortgage",
      body: "Equity = $450,000 − $285,000 = $165,000, which is 36.7% of the value (combined LTV 63.3%). At an 80% CLTV cap, total borrowing against the home may reach $360,000, so accessible equity is $360,000 − $285,000 = $75,000. At an 85% cap the accessible figure is $97,500, and at a 90% cap — offered by some lenders at higher rates — it rises to $120,000, but the payment and risk rise with it. None of these figures is the full $165,000: lenders keep a buffer between what you owe and what the home is worth.",
    },
    faqs: [
      {
        question: "How can I build equity faster?",
        answer:
          "Principal payments are the lever you control: extra monthly payments, a lump sum, or a shorter loan term all move the balance down faster than the standard schedule. Appreciation may help but cannot be scheduled. Note that in the early years of a 30-year mortgage, scheduled principal is small — on a $285,000 balance at 6.5%, only about $258 of the first payment is principal.",
      },
      {
        question: "HELOC or home equity loan — what is the difference?",
        answer:
          "A home equity loan is a fixed lump sum with a fixed rate and payment, disbursed once. A HELOC is a revolving credit line, usually with a variable rate, a draw period (often 10 years, interest-only) and then a repayment period. HELOC rates move with the prime rate, so a line opened at 8% can be at 10% within a year; the loan's fixed rate cannot.",
      },
      {
        question: "Is home equity loan interest tax-deductible?",
        answer:
          "Only when the borrowed money is used to buy, build or substantially improve the home securing the loan, and only if you itemise deductions, within the overall $750,000 acquisition-debt cap for newer loans. Interest on equity borrowed for other purposes — debt consolidation, a car, tuition — has not been deductible since 2018.",
      },
      {
        question: "How is my home's value determined for an equity loan?",
        answer:
          "The lender orders an appraisal or an automated valuation. The number that matters is the lender's value, which may come in below your estimate; a low appraisal shrinks accessible equity directly. If you disagree, you can pay for a full appraisal or apply elsewhere, but the same valuation data drives most lenders' models.",
      },
    ],
  },

  "real-estate/cap-rate-calculator": {
    quickAnswer:
      "The capitalization rate measures a rental property's return independent of financing: annual net operating income divided by price. A property renting for $2,200 a month with $9,132 of yearly operating expenses produces NOI of $15,948; at a $350,000 price, that is a cap rate of 4.56%. At a 7% mortgage rate, financing it loses money in year one.",
    howItWorks: [
      "Enter the annual rent and the operating expenses: property tax, insurance, maintenance, vacancy allowance, management and HOA. The calculator subtracts the vacancy loss from gross rent to get effective gross income, subtracts expenses to get net operating income (NOI), then divides by the purchase price (or current value) to give the cap rate. It also shows the gross rent multiplier — price divided by gross annual rent, 13.26 here.",
      "Two things are deliberately excluded from NOI: the mortgage payment and depreciation. That is the point of the measure — it prices the building, not your loan, so two investors with different financing can compare the same property, and one investor can compare properties across cities. Financing is handled separately, in the cash-flow section below the cap rate.",
      "The financing overlay is where this property's story turns. With 25% down at 7% over 30 years, the loan is $262,500 and annual debt service is $20,957 — more than the $15,948 of NOI. Cash flow is negative $5,009 a year and cash-on-cash return is −5.3% on $94,500 invested. When the mortgage rate (7%) exceeds the cap rate (4.56%), leverage works against you — negative leverage, made visible rather than hidden.",
      "Judge the result against local norms and the risk-free alternative. Cap rates run roughly 4% to 5% in expensive coastal markets and 7% to 10% in cheaper, slower-growing ones. A cap rate far above the local norm is usually compensation for something — deferred maintenance, a weak tenant base, or a declining area — not a bargain. A 4.56% cap rate prices this property for appreciation, not income.",
      "Rebuild NOI from your own expense estimates before trusting any advertised figure. Sellers routinely leave out vacancy, management (even if you self-manage — your time has a value and a buyer will charge it), and realistic maintenance and capital reserves. A listing showing a 7% cap rate on rent minus tax and insurance alone can be a 4.5% cap rate once the missing lines are restored, which is roughly what happens here.",
    ],
    formula: "Cap rate = Net operating income ÷ Property value. NOI = Gross rental income − vacancy loss − operating expenses (excluding mortgage payments and depreciation). Cash-on-cash = (NOI − annual debt service) ÷ (down payment + closing costs).",
    example: {
      title: "Worked example: $2,200 a month rent, $350,000 price",
      body: "Gross rent: $26,400 a year. Vacancy at 5%: $1,320, leaving effective gross income of $25,080. Expenses: property tax $4,200, insurance $1,500, maintenance at 5% of rent $1,320, management at 8% $2,112 — total $9,132. NOI = $25,080 − $9,132 = $15,948. Cap rate = $15,948 ÷ $350,000 = 4.56%. Finance it with 25% down at 7% and the mortgage payment is $1,746.42 a month — $20,957 a year, more than the NOI — so the property loses $5,009 a year of cash flow despite a positive cap rate.",
    },
    faqs: [
      {
        question: "What is a good cap rate?",
        answer:
          "There is no universal figure; it prices risk and growth expectations in a specific market. Compare the property's cap rate with recent sales of similar local properties and with the yield on a 10-year Treasury. A rental returning barely more than a government bond, with far more work and risk, is priced for appreciation, not income.",
      },
      {
        question: "What expenses do sellers leave out of advertised cap rates?",
        answer:
          "Vacancy, management (even if you self-manage — your time has a value and a buyer will charge it), and realistic maintenance and capital reserves are the usual omissions. A listing showing a 7% cap rate on rent minus tax and insurance alone can be a 4.5% cap rate once the missing lines are restored. Rebuild NOI from your own expense estimates before trusting any advertised figure.",
      },
      {
        question: "Is a higher cap rate always better?",
        answer:
          "No. A high cap rate means the price is low relative to current income, which the market usually sets because it expects income to fall, expenses to rise, or the area to decline — or because the building needs work the income statement doesn't show yet. It is a starting question ('why is this cheap?'), not an answer.",
      },
      {
        question: "How do I use cap rate to estimate a property's value?",
        answer:
          "Rearrange the formula: value = NOI ÷ market cap rate. If a building produces $15,948 of NOI and comparable properties trade at a 6.5% cap rate, the income-based value is about $245,354 — well below the $350,000 asking price in the example, which tells you the seller is pricing in either lower expenses or expected rent growth.",
      },
    ],
  },

  "real-estate/rental-cash-flow-calculator": {
    quickAnswer:
      "A rental cash flow calculator subtracts every monthly cost — mortgage, tax, insurance, maintenance, management — from the rent. A $325,000 property renting for $2,950 a month with 25% down at 7% produces about $247 a month of cash flow after all expenses: positive but thin, and typical when rates are high. The calculator exists to find that out before you buy, not after.",
    howItWorks: [
      "Enter the price, down payment, loan rate and term, the expected rent, and each operating expense: property tax, insurance, HOA, a maintenance reserve and a management fee, both commonly set as percentages of rent. The calculator computes the mortgage payment, totals the expenses and shows the monthly and annual cash flow. Vacancy is a line item too, at 5% of rent by default.",
      "It also returns the two companion measures. Cap rate (NOI ÷ price) judges the building unleveraged — 6.90% here, on NOI of $22,428. Cash-on-cash return (annual cash flow ÷ total cash invested, including closing costs) judges your actual deal: $2,968 a year on $87,750 invested is 3.38%. At high interest rates the two diverge sharply, and cash-on-cash is the one that pays your bills.",
      "Stress the inputs before believing the output. The $247 monthly margin absorbs a 5% vacancy allowance already, but a rent drop of 5% would remove about $148 a month, and a single $8,000 roof erases more than two years of this property's cash flow. A deal that only works with full occupancy and zero repairs is not a deal; it is a hope. The vacancy, maintenance and management sliders are there to be moved.",
      "The 1% rule is a quick screen for the same question: monthly rent should be at least 1% of the total purchase price for a property to have a chance of cash-flowing. This property rents at 0.91% of price ($2,950 ÷ $325,000) and indeed produces only thin cash flow. In high-price coastal markets few properties pass 0.7%; in parts of the Midwest 1% or better is achievable.",
      "Watch the leverage arithmetic. The mortgage rate is 7% and the cap rate is 6.90% — borrowing costs slightly more than the property yields, so leverage drags rather than lifts the return, and the 3.38% cash-on-cash return sits below the 6.90% cap rate. Cash flow then depends on rent growth and appreciation rather than current income, which is a speculation the calculator makes visible rather than hiding.",
    ],
    formula: "Monthly cash flow = Rent − mortgage payment (P&I) − tax − insurance − HOA − maintenance reserve − management fee − vacancy reserve − other costs. NOI = annual rent − annual operating expenses (excluding the mortgage). Cash-on-cash = annual cash flow ÷ (down payment + closing costs).",
    example: {
      title: "Worked example: $325,000 purchase, $2,950 monthly rent",
      body: "25% down is $81,250; the $243,750 loan at 7% over 30 years costs $1,621.67 a month. Expenses: tax $325, insurance $125, vacancy at 5% of rent $147.50, maintenance at 5% $147.50, management at 8% $236, other costs $100 — total $1,081. Cash flow = $2,950 − $1,621.67 − $1,081 = $247.33 a month, $2,968 a year. NOI is $22,428 (rent minus operating expenses), a cap rate of 6.90%. Cash invested is $87,750 including 2% closing costs, so cash-on-cash return is about 3.38% — the honest summary of leverage at a 7% mortgage rate.",
    },
    faqs: [
      {
        question: "What is the 1% rule in rental property?",
        answer:
          "A screening heuristic: monthly rent should be at least 1% of the purchase price for a property to have a chance of cash-flowing. The example property rents at 0.91% of price ($2,950 ÷ $325,000) and produces only thin cash flow. In high-price coastal markets few properties pass 0.7%; in parts of the Midwest 1% or better is achievable. It screens deals in seconds and replaces none of the detailed maths.",
      },
      {
        question: "How much should I reserve for maintenance and capital expenses?",
        answer:
          "A common provision is 5% of rent for routine maintenance plus a separate capital reserve for big items — roof, HVAC, water heater — based on their remaining life. Older properties need more. Properties shown with zero maintenance are being marketed, not analysed; a single $8,000 roof erases over two years of the example's cash flow.",
      },
      {
        question: "Should I include vacancy in cash flow?",
        answer:
          "Yes — budget 5% to 8% of rent even in a strong market. A property that is empty for one month in twelve, plus turnover costs, roughly matches an 8% to 10% economic vacancy. This calculator includes a 5% vacancy line by default ($147.50 a month here); raising it to 8% removes a further $88.50 a month and cuts cash flow to about $159.",
      },
      {
        question: "Why is cash flow low when the cap rate looks decent?",
        answer:
          "Because the mortgage rate (7%) exceeds the cap rate (6.90%). When borrowing costs more than the property yields, leverage works against you — negative leverage. Cash flow then depends on rent growth and appreciation rather than current income, which is a speculation the calculator makes visible rather than hiding.",
      },
    ],
  },

};
