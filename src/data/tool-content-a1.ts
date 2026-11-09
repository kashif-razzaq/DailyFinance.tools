import type { ToolContentEntry } from "./tool-content";

export const TOOL_CONTENT_A1: Record<string, ToolContentEntry> = {
  "personal-wealth/savings-calculator": {
    quickAnswer:
      "A savings calculator shows what a starting balance plus regular deposits grows to at a given APY. Deposit $10,000, add $300 a month at 4.5% APY, and after 10 years you hold about $61,029 — $46,000 of deposits and roughly $15,029 of interest.",
    howItWorks: [
      "Enter your starting balance, monthly deposit, APY and the number of years. APY is the annual percentage yield: the rate you actually earn over a year once compounding is included, so it is the right rate to use for a savings account.",
      "The calculator compounds monthly. Each month it credits interest on the balance, adds your deposit, and uses that larger balance for the next month's interest. That is why the growth curve bends upward over time instead of rising in a straight line.",
      "Read the split between deposits and interest, not just the final balance. If most of the end value is deposits, a higher rate matters less than a higher deposit. If interest is a large share, the account rate is doing real work and shopping for a better APY pays off.",
    ],
    formula: "Future value = P × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) − 1) / (r/n)], where P is the starting balance, PMT the deposit per period, r the annual rate, n the compounding periods per year and t the years.",
    example: {
      title: "Worked example: $10,000 plus $300 a month for 10 years",
      body: "Start with $10,000 and deposit $300 a month into an account paying 4.5% APY, compounded monthly, for 10 years. Your deposits total $46,000 ($10,000 + 120 × $300). The end balance is $61,029, so interest contributes about $15,029 — roughly a quarter of the final amount, earned without any extra deposits.",
    },
    faqs: [
      {
        question: "What APY should I enter?",
        answer:
          "Use the APY your bank quotes, not the nominal interest rate. APY already includes compounding, so a 4.5% APY account grows slightly faster than a 4.5% nominal rate compounded monthly. High-yield savings accounts paid roughly 4% to 5% APY in recent years; rates are variable and change with the Federal Reserve rate.",
      },
      {
        question: "Is the interest on savings taxed?",
        answer:
          "Yes. Interest earned in a regular savings account is taxed as ordinary income in the year it is credited, and your bank reports it on Form 1099-INT if it exceeds $10. The calculator shows pre-tax growth.",
      },
      {
        question: "How much faster does monthly compounding grow money than annual?",
        answer:
          "By a small amount. At 4.5%, monthly compounding turns a nominal 4.5% into a 4.59% effective yield. Compounding frequency matters far less than the rate itself and the size of your deposits.",
      },
      {
        question: "Does this calculator account for inflation?",
        answer:
          "No. It shows nominal dollars. At 3% inflation, money loses about 26% of its purchasing power over 10 years, so a balance that grows at 4.5% is gaining roughly 1.5% a year in real terms.",
      },
    ],
  },

  "personal-wealth/compound-interest-scaler-calculator": {
    quickAnswer:
      "This calculator scales compound growth: it shows how a starting amount plus monthly contributions multiplies over long horizons. $5,000 invested with $250 a month at a 7% annual return becomes about $150,425 in 20 years — $65,000 contributed and $85,425 of growth.",
    howItWorks: [
      "Enter a starting amount, a monthly contribution, an annual return and a time horizon. The calculator compounds monthly, so contributions start earning returns from the month after they land.",
      "The point of the tool is the scaling effect. In the first years, contributions do most of the work. Later, returns on the accumulated balance overtake contributions: in the example below, growth ends up larger than everything paid in.",
      "Test the horizon before you test the rate. Extending the period by five years usually adds more than raising the assumed return by a point, and the return is the one input you cannot control.",
    ],
    formula: "Future value = P × (1 + r/12)^(12t) + PMT × [((1 + r/12)^(12t) − 1) / (r/12)], with P the starting amount, PMT the monthly contribution, r the annual return and t the years.",
    example: {
      title: "Worked example: $5,000 and $250 a month at 7% for 20 years",
      body: "Invest $5,000, add $250 a month, and earn a steady 7% a year for 20 years. Total contributions are $65,000. The final value is about $150,425, which means compounding added $85,425 — more than you put in. Stop after 10 years instead and the balance is only about $56,000, which is why the second decade matters so much.",
    },
    faqs: [
      {
        question: "What return should I assume for investments?",
        answer:
          "Use a cautious planning figure, not a best case. US stocks have returned roughly 10% a year before inflation over very long periods, but with deep falls along the way. Many planners model 6% to 8% for a diversified portfolio. This calculator assumes a smooth return; real returns arrive unevenly.",
      },
      {
        question: "Why does the last decade add so much more than the first?",
        answer:
          "Because interest earns interest on a bigger base. In the worked example, the first 10 years build about $56,000; the next 10 add about $94,000, even though contributions are identical. The base, not the deposit, drives late growth.",
      },
      {
        question: "Is compound interest taxed every year?",
        answer:
          "In a taxable brokerage account, dividends and realised gains are taxed as they occur. In a 401(k) or IRA, tax is deferred or, for a Roth account, not charged on qualified withdrawals — which is why the same return compounds faster inside a retirement account.",
      },
      {
        question: "What is the difference between compounding monthly and annually?",
        answer:
          "Monthly compounding credits returns 12 times a year, so each credit starts earning sooner. At 7%, monthly compounding produces an effective annual yield of about 7.23%. The gap grows with the rate and the horizon.",
      },
    ],
  },

  "personal-wealth/interest-calculator": {
    quickAnswer:
      "An interest calculator computes both simple and compound interest on the same principal so you can compare them. On $20,000 at 6% for 5 years, simple interest pays $6,000; compound interest paid annually pays $6,765 — the $765 gap is interest earned on interest.",
    howItWorks: [
      "Enter the principal, the annual rate, the term and, for compound interest, how often interest is credited. The calculator returns the interest earned and the final amount under both methods.",
      "Simple interest is charged or paid only on the original principal, so it grows in a straight line. Compound interest is calculated on principal plus accumulated interest, so it accelerates. Loans and deposits state in their terms which method applies.",
      "Use the comparison to judge offers. A deposit quoted with monthly compounding beats the same rate compounded annually. A loan quote means little until you know whether interest is simple, compound, and what fees sit on top — fees are captured by APR, not the interest rate.",
    ],
    formula: "Simple: A = P × (1 + r × t). Compound: A = P × (1 + r/n)^(n×t), where P is principal, r the annual rate, t the years and n the compounding periods per year.",
    example: {
      title: "Worked example: $20,000 at 6% for 5 years",
      body: "Simple interest: $20,000 × 6% × 5 = $6,000 of interest, final amount $26,000. Compound interest, credited annually: $20,000 × 1.06^5 = $26,765, so interest is $6,765. Over 5 years the methods differ by $765. Stretch the term to 20 years and simple interest pays $24,000 while compounding pays about $44,142 — the gap widens with time.",
    },
    faqs: [
      {
        question: "Which bank accounts pay compound interest?",
        answer:
          "Almost all of them. Savings accounts, money market accounts and CDs credit interest to the balance, and later interest is calculated on the higher balance. Banks quote APY, which is the compounded rate, so you can compare accounts directly.",
      },
      {
        question: "Do loans use simple or compound interest?",
        answer:
          "Most consumer loans — mortgages, auto loans, personal loans — use simple interest calculated on the outstanding balance, which falls as you pay. Credit cards effectively compound because unpaid interest is added to the balance each cycle.",
      },
      {
        question: "What does compounding daily versus monthly change?",
        answer:
          "Very little at normal rates. A 6% nominal rate becomes about 6.17% effective with monthly compounding and about 6.18% with daily compounding. Rate and term matter far more than frequency.",
      },
      {
        question: "Why do two calculators give different answers for the same inputs?",
        answer:
          "Usually the compounding frequency or the timing of deposits differs. Check whether interest is credited monthly or annually and whether a deposit is assumed at the start or the end of each period. Both change the result by small, explainable amounts.",
      },
    ],
  },

  "personal-wealth/simple-interest-calculator": {
    quickAnswer:
      "Simple interest is calculated only on the original principal: interest = principal × rate × time. Borrow or deposit $8,000 at 5% for 3 years and the interest is exactly $1,200, for a total of $9,200.",
    howItWorks: [
      "Enter the principal, the annual interest rate and the term. The calculator multiplies the three together — there is no compounding step, so interest never earns interest.",
      "Because growth is linear, each year adds the same amount of interest: in the example, $400 a year, every year. Doubling the term exactly doubles the interest, which makes simple interest easy to check by hand.",
      "Simple interest shows up in short-term lending, some auto loans, and as the building block inside other formulas. If a product compounds, this calculator understates the true growth or cost, so confirm the method in the product terms first.",
    ],
    formula: "Interest = P × r × t; Amount = P × (1 + r × t), where P is principal, r the annual rate as a decimal and t the time in years.",
    example: {
      title: "Worked example: $8,000 at 5% for 3 years",
      body: "Interest = $8,000 × 0.05 × 3 = $1,200. The final amount is $8,000 + $1,200 = $9,200. If the same money compounded annually, the final amount would be $9,261 — only $61 more over 3 years, which is why the two methods look similar over short terms and very different over long ones.",
    },
    faqs: [
      {
        question: "Where is simple interest actually used?",
        answer:
          "Short-term loans, many auto loans, and some personal loans calculate interest on the outstanding balance without compounding. US Treasury bills and some short-term notes are also priced on a simple basis. Most savings products compound instead.",
      },
      {
        question: "How do I calculate simple interest for months instead of years?",
        answer:
          "Convert the term to years: 18 months is 1.5 years. Interest = principal × rate × 1.5. The same works for days — divide the number of days by 365 (some lenders use 360; check the loan terms).",
      },
      {
        question: "Is simple interest better for borrowers or lenders?",
        answer:
          "For borrowers, when the alternative is compounding at the same rate, because unpaid interest does not itself accrue interest. For savers it is worse. In practice, the rate and fees usually matter more than the method.",
      },
      {
        question: "Does a mortgage use simple interest?",
        answer:
          "Effectively yes, in a specific way: each month's interest is charged on the current balance only, and the payment is set so the balance reaches zero at the end of the term. That schedule is called amortization, and interest is never charged on past interest as long as you pay on time.",
      },
    ],
  },

  "personal-wealth/apy-calculator": {
    quickAnswer:
      "This calculator converts a nominal interest rate and compounding frequency into APY — the effective annual yield. A 4.8% nominal rate compounded monthly is a 4.91% APY; compounded daily it is about 4.92%. Banks must quote APY on deposit accounts so you can compare them on equal terms.",
    howItWorks: [
      "Enter the nominal (stated) annual rate and choose how often interest compounds: monthly, daily, quarterly or annually. The calculator raises the per-period rate to the number of periods in a year.",
      "APY answers the question that matters for a deposit: if I leave $100 here for a year, what rate describes my actual earnings? Two accounts with the same nominal rate but different compounding have different APYs, and the higher APY pays more.",
      "Use APY only for comparing deposit accounts with each other. For loans, the equivalent comparison figure is APR, which goes further and folds in fees. An APY is always equal to or higher than the nominal rate behind it.",
    ],
    formula: "APY = (1 + r/n)^n − 1, where r is the nominal annual rate and n the number of compounding periods per year.",
    example: {
      title: "Worked example: 4.8% nominal, compounded monthly",
      body: "Divide 4.8% by 12 to get 0.4% per month. Compound it 12 times: (1.004)^12 − 1 = 4.907%, so the APY is 4.91%. On a $25,000 balance held a full year, that is about $1,227 of interest rather than the $1,200 the nominal rate suggests.",
    },
    faqs: [
      {
        question: "What is the difference between APR and APY?",
        answer:
          "APY describes what a deposit earns, including compounding. APR describes what a loan costs, including most fees, but it does not compound. Comparing a loan's APR with a savings account's APY is a common and misleading shortcut.",
      },
      {
        question: "Can APY change after I open the account?",
        answer:
          "On a variable-rate savings account, yes — the bank can change the rate at any time, and the APY follows. On a CD, the APY is fixed for the term. The APY quoted at opening is a snapshot, not a promise, for variable accounts.",
      },
      {
        question: "Why is my interest payment lower than the APY suggests?",
        answer:
          "APY assumes the balance stays in the account for a full year and that all interest stays and compounds. Withdrawals, a balance that was present for only part of the period, or a tiered rate on part of the balance all reduce what you actually receive.",
      },
      {
        question: "Do all banks have to disclose APY?",
        answer:
          "In the US, yes. The Truth in Savings Act requires banks to disclose the APY for deposit accounts in a standard format, which is what makes cross-bank comparison possible. Credit unions follow the same rule through the NCUA.",
      },
    ],
  },

  "personal-wealth/high-yield-savings-cd-calculator": {
    quickAnswer:
      "This calculator compares a high-yield savings account with a CD on the same deposit. On $25,000 over 3 years, a 5.0% CD grows to $28,941 and a 4.6% high-yield savings account to $28,611 — the CD pays about $330 more, in exchange for locking the money up.",
    howItWorks: [
      "Enter the deposit, the CD's APY, the savings account's APY, the term and your marginal tax rate. The CD rate is fixed for the term; the savings rate is treated as constant too, although in practice it moves with market rates.",
      "Interest on both products is taxed as ordinary income in the year it is credited, including inside a CD you cannot touch yet. The calculator applies your tax rate to interest each year so you compare after-tax outcomes, which is what you actually keep.",
      "The decision is rarely the headline rate. A CD wins when its rate premium is real and you will not need the money early — early-withdrawal penalties, commonly 3 to 12 months of interest, erase the advantage quickly. Savings wins when the money is an emergency fund or a near-term purchase.",
    ],
    formula: "Value = Deposit × (1 + APY)^t, with tax on each year's interest deducted annually at your marginal rate. CD early-withdrawal penalty is typically a set number of months of interest, stated in the account terms.",
    example: {
      title: "Worked example: $25,000 for 3 years, CD at 5.0% vs savings at 4.6%",
      body: "Before tax, the CD reaches $25,000 × 1.05^3 = $28,941 and the savings account reaches $25,000 × 1.046^3 = $28,611. The CD's edge is $330 over 3 years. At a 22% marginal tax rate, both balances shrink — you pay roughly $867 of tax on the CD's $3,941 of interest as it accrues — but the ranking does not change.",
    },
    faqs: [
      {
        question: "What is the penalty for breaking a CD early?",
        answer:
          "It is set by the bank: commonly 90 days of interest on terms under a year, and 6 to 12 months of interest on longer terms. The penalty can eat into principal if you withdraw very early. Brokered CDs work differently — you sell them on a market, possibly at a loss.",
      },
      {
        question: "Are CDs and high-yield savings accounts insured?",
        answer:
          "Yes, both are deposit accounts. FDIC insurance covers up to $250,000 per depositor, per bank, per ownership category; credit union accounts carry the same limit through the NCUA. Balances above the limit at one bank are uninsured.",
      },
      {
        question: "When does a high-yield savings account beat a CD?",
        answer:
          "When rates are rising (the savings rate follows the market up while the CD is stuck), when you may need the money, or when the CD's rate premium is small. A premium under about half a percentage point rarely compensates for losing access for years.",
      },
      {
        question: "What is a CD ladder?",
        answer:
          "Splitting a deposit across CDs of different terms — for example 1, 2, 3, 4 and 5 years — so one matures every year. It averages the rates on offer and restores regular access to part of the money, reducing both lock-in and reinvestment risk.",
      },
    ],
  },

  "personal-wealth/high-yield-savings-calculator": {
    quickAnswer:
      "A high-yield savings calculator shows what a deposit earns at an online-bank APY versus a low branch rate. $15,000 held 3 years grows to $17,117 at 4.5% APY but only $15,455 at 1.0% — a $1,663 difference for the same money and the same federal insurance.",
    howItWorks: [
      "Enter your deposit, the APY and the time period. The calculator compounds the balance — most high-yield accounts compound daily and pay monthly — and shows the interest earned.",
      "Compare two rates side by side to price the decision to switch banks. The cost of staying at a low rate is not abstract: it is the gap between the two end balances, and it repeats every year you leave the money where it is.",
      "Remember the rate is variable. The APY you see today follows the federal funds rate with a lag, so the calculator projects today's rate forward. Re-run it when rates move rather than treating the first projection as a forecast.",
    ],
    formula: "Future value = Deposit × (1 + APY)^t. Interest earned = future value − deposit.",
    example: {
      title: "Worked example: $15,000 for 3 years at 4.5% vs 1.0%",
      body: "At 4.5% APY: $15,000 × 1.045^3 = $17,117, so interest is $2,117. At 1.0%: $15,000 × 1.01^3 = $15,455, so interest is $455. Same deposit, same insurance, same access — the higher APY pays $1,663 more over the 3 years.",
    },
    faqs: [
      {
        question: "Why can online banks pay higher APYs?",
        answer:
          "They have no branch network to fund, and they compete nationally for deposits. The accounts carry the same FDIC insurance (up to $250,000 per depositor, per bank) as a branch account. The trade-offs are usually no cash deposits and transfers that take 1 to 3 business days.",
      },
      {
        question: "Is interest from a high-yield savings account taxed?",
        answer:
          "Yes, as ordinary income in the year it is paid, at your marginal rate. On $2,117 of interest, a saver in the 22% bracket owes about $466. The calculator shows pre-tax growth.",
      },
      {
        question: "How many withdrawals can I make each month?",
        answer:
          "Federal rules that once capped savings withdrawals at six per month were suspended in 2020, but many banks keep their own limits or excess-withdrawal fees in the account terms. Check the fee schedule if you plan to use the account like a current account.",
      },
      {
        question: "Should my emergency fund sit in a high-yield account?",
        answer:
          "Yes — it is the standard place for one. The money stays liquid and insured while earning a market rate. Keep one month of expenses in your everyday account for instant access and the rest in the high-yield account, since transfers out can take a few days.",
      },
    ],
  },

  "personal-wealth/savings-goal-calculator": {
    quickAnswer:
      "A savings goal calculator works backwards: it tells you the monthly deposit needed to reach a target by a deadline. To reach $30,000 in 5 years starting from $5,000 at a 4% return, you need to save about $360 a month.",
    howItWorks: [
      "Enter the target amount, what you have already saved, the expected return and the deadline. The calculator grows your existing savings forward, subtracts that from the target, and solves for the monthly deposit that covers the rest.",
      "The return assumption should match where the money will sit. For a goal under 3 years away, that is a savings account rate — 4% to 5% in a high-yield account recently. Investing a short-term goal in stocks can leave you short exactly when the money is due.",
      "Read the output as a budget line, not a wish. If the required deposit does not fit your budget, the honest levers are a later deadline, a smaller target, or a lump sum added now — each month of delay raises the required deposit because there is less time for both deposits and growth.",
    ],
    formula: "Monthly deposit = [Target − Saved × (1 + r/12)^(12t)] × (r/12) / [((1 + r/12)^(12t)) − 1], where r is the annual return and t the years to the deadline.",
    example: {
      title: "Worked example: $30,000 house deposit in 5 years",
      body: "You have $5,000 saved and the money earns 4% a year. The $5,000 grows to about $6,105 in 5 years, leaving $23,895 to come from deposits and their earnings. The required deposit is $360.41 a month — call it $361. Total deposits are $21,625, and interest supplies the remaining roughly $3,270 of the target.",
    },
    faqs: [
      {
        question: "What if I save weekly or every payday instead of monthly?",
        answer:
          "Convert to a monthly equivalent: a deposit every two weeks happens 26 times a year, so multiply it by 26 and divide by 12. Saving $167 every payday is about $362 a month. More frequent deposits earn marginally more because the money arrives sooner on average.",
      },
      {
        question: "Should I include inflation in my target?",
        answer:
          "For goals priced in today's money — a house deposit, a car, a wedding — yes, if the price is likely to rise. Either raise the target by roughly 3% per year of waiting, or use a return net of inflation in the calculator. House deposits are the classic case: the target moves while you save.",
      },
      {
        question: "What return should I use for a goal 10 or more years away?",
        answer:
          "A balanced portfolio assumption of 5% to 7% is common for long horizons, but the result is an estimate, not a promise. Run the calculation at a lower return as well; if the plan only works at the optimistic rate, the deposit is too small.",
      },
      {
        question: "Is it better to add a lump sum or raise the monthly deposit?",
        answer:
          "Mathematically, money added earlier is worth more because it compounds for the whole period. $2,000 added today at 4% is worth about $2,443 in 5 years; the same $2,000 spread as extra deposits arrives later and grows less. If a bonus or tax refund is available, front-loading wins.",
      },
    ],
  },

  "personal-wealth/future-value-calculator": {
    quickAnswer:
      "A future value calculator projects what a sum of money will be worth at a future date given a growth rate. $12,000 growing at 8% a year for 15 years has a future value of about $38,066 — the original sum plus $26,066 of growth.",
    howItWorks: [
      "Enter the present amount, the annual growth rate and the number of years. The calculator compounds the amount once per period for the whole horizon. Add regular contributions if the tool offers them, and they compound from when each is made.",
      "Future value is the base calculation behind retirement projections, savings goals and loan pricing. Its mirror image is present value: discounting a future amount back to today at the same rate reverses the maths exactly.",
      "Treat the rate as the whole story. At 15 years, the difference between 6% and 8% on $12,000 is about $9,300 — a third more growth from two extra points. Small rate differences compound into large outcome differences, which is why fees that shave a point off returns matter so much.",
    ],
    formula: "Future value = Present value × (1 + r)^t. With regular contributions: FV = PV × (1 + r)^t + PMT × [((1 + r)^t − 1) / r].",
    example: {
      title: "Worked example: $12,000 at 8% for 15 years",
      body: "FV = $12,000 × 1.08^15 = $12,000 × 3.172 = $38,066. The growth of $26,066 is more than double the amount invested. At 6% instead, the result is $28,759 — a reminder that the assumed rate, which you cannot guarantee, moves the answer more than most other inputs.",
    },
    faqs: [
      {
        question: "What is the difference between future value and present value?",
        answer:
          "They are the same calculation run in opposite directions. Future value grows today's money forward at a rate; present value discounts a future amount back at the same rate. $38,066 in 15 years at 8% and $12,000 today are the same value expressed at different dates.",
      },
      {
        question: "Should the growth rate be before or after inflation?",
        answer:
          "Either works, but be consistent. Use a nominal rate (for example 8%) to see the nominal future balance. Use a real rate (nominal minus inflation, roughly 5% if inflation is 3%) to see the answer in today's purchasing power.",
      },
      {
        question: "How do fees change future value?",
        answer:
          "Fees reduce the effective rate. An investment earning 8% with a 1% annual fee compounds at about 7%. Over 15 years on $12,000 that cuts the future value from $38,066 to roughly $33,100 — the fee consumes about $5,000 of growth.",
      },
      {
        question: "Does future value work for a single deposit only?",
        answer:
          "No. The formula extends to a series of deposits (an annuity) by compounding each deposit for the time it is invested. Most savings and retirement calculators are future-value calculations with a deposit stream added.",
      },
    ],
  },

  "personal-wealth/budget-calculator": {
    quickAnswer:
      "A budget calculator totals your income and spending by category and shows what is left. On take-home pay of $6,200 a month with $5,200 of expenses, the leftover is $1,000 — a 16% savings rate, which is the single number that decides how fast your finances improve.",
    howItWorks: [
      "Enter your monthly take-home pay, then your spending by category: housing, utilities, food, transport, insurance, debt payments, and discretionary spending. Use bank and card statements for a real month rather than estimating — most people underestimate food and discretionary spending by a wide margin.",
      "The calculator sums the categories and subtracts them from income. A positive leftover is money available for savings goals and extra debt payments. A negative leftover means the budget is funded by borrowing, and the shortfall amount is the size of the problem to fix.",
      "Work through the output in order: the largest categories first. Housing and transport are usually 40% to 55% of spending between them, so a 10% cut there beats eliminating small subscriptions many times over. Then set the leftover to move automatically on payday, or it will be spent.",
    ],
    formula: "Leftover = Total monthly income − total monthly expenses. Savings rate = leftover ÷ income × 100.",
    example: {
      title: "Worked example: $6,200 take-home pay",
      body: "Monthly spending: housing $1,850, utilities $320, groceries $780, transport $540, insurance $460, debt payments $380, dining out $350, subscriptions $90, personal spending $430. The categories total $5,200. Income of $6,200 minus $5,200 leaves $1,000 a month — $12,000 a year available for an emergency fund, investing or extra debt payments.",
    },
    faqs: [
      {
        question: "What savings rate should I aim for?",
        answer:
          "A common planning target is 15% to 20% of gross income directed to retirement and savings combined, including any employer match. Below 10%, retirement at a conventional age usually requires a long career or a high income. The right rate depends on when you start: starting at 25 needs far less per month than starting at 45.",
      },
      {
        question: "Should I budget on gross or take-home pay?",
        answer:
          "Take-home pay — the amount that actually reaches your account. Gross pay includes taxes and payroll deductions you never control. Budgeting on gross overstates your capacity by 20% to 30% for most employees.",
      },
      {
        question: "How do I budget for irregular expenses like car repairs?",
        answer:
          "Convert them to a monthly amount and save it in advance (a sinking fund). Insurance premiums, annual subscriptions, holidays and car maintenance are predictable in total even if the timing is not. Add up a full year of them and divide by 12.",
      },
      {
        question: "What if my income varies month to month?",
        answer:
          "Budget fixed costs against your lowest typical month, not your average. Save the surplus in good months to a buffer account and pay yourself a steady amount from it. Freelancers commonly hold one to two months of expenses as this buffer.",
      },
    ],
  },

  "personal-wealth/50-30-20-budget-calculator": {
    quickAnswer:
      "The 50/30/20 rule splits take-home pay into 50% needs, 30% wants and 20% savings and debt repayment. On $5,400 a month of take-home pay, that is $2,700 for needs, $1,620 for wants and $1,080 for savings.",
    howItWorks: [
      "Enter your monthly take-home pay. The calculator applies the three percentages and gives you a target ceiling for needs and wants and a floor for savings.",
      "Needs are the bills you must pay to live and work: rent or mortgage, utilities, basic groceries, transport, insurance and minimum debt payments. Wants are everything that improves life but is optional: eating out, travel, streaming, gym memberships, upgraded groceries. Savings covers emergency funds, investing and debt payments above the minimum.",
      "Compare the targets with your actual spending, category by category. The rule's value is diagnostic: most people who break it break the needs line, usually because housing costs more than 30% of take-home pay in expensive cities. If needs run at 65%, the realistic fix is a different split — for example 60/25/15 — while housing cost is addressed, not pretending the 30% wants line can go negative.",
    ],
    formula: "Needs target = 0.50 × take-home pay; Wants target = 0.30 × take-home pay; Savings target = 0.20 × take-home pay.",
    example: {
      title: "Worked example: $5,400 monthly take-home pay",
      body: "Needs: $5,400 × 50% = $2,700. Wants: $5,400 × 30% = $1,620. Savings and extra debt payments: $5,400 × 20% = $1,080. If your actual needs are $3,100 (57%) and wants are $1,500 (28%), the gap to close is the $400 of needs overspend — savings are being squeezed to $800 (15%) even though wants are inside their limit.",
    },
    faqs: [
      {
        question: "Is a mortgage payment a need or a want?",
        answer:
          "The payment itself is a need, including principal, interest, tax and insurance. The rule was popularised by Senator Elizabeth Warren's book All Your Worth. Note that only minimum payments on other debts count as needs; anything above the minimum counts toward the 20% savings and debt line.",
      },
      {
        question: "What if housing alone exceeds 50% of my pay?",
        answer:
          "Then the textbook split cannot apply yet, and you are not alone — in high-cost cities rent alone can take 40% or more of take-home pay. Use a modified split that protects some savings (even 10%) and treat the needs percentage as the problem to work on over time, through income growth or a housing change, rather than abandoning the savings line entirely.",
      },
      {
        question: "Do employer retirement contributions count toward the 20%?",
        answer:
          "They should. If your employer matches 4% of pay into a 401(k) and you contribute 6%, your total saving is 10% before any other saving. Count both sides to judge whether you are on track, but note the rule is usually applied to take-home pay while contributions come out of gross pay.",
      },
      {
        question: "Is 50/30/20 right for high earners?",
        answer:
          "It is a floor, not an optimum. Needs rarely scale with income, so a high earner following the rule loosely can often save 30% to 50%. Conversely, at low incomes needs can consume 70% or more no matter how carefully money is managed, and the rule offers little guidance beyond prioritising essentials.",
      },
    ],
  },

  "personal-wealth/net-worth-tracker": {
    quickAnswer:
      "Net worth is everything you own minus everything you owe. A household with $545,000 of assets and $339,000 of debts has a net worth of $206,000. It is the single figure that shows whether your finances are moving forward, regardless of income.",
    howItWorks: [
      "List assets at realistic current values: bank balances, investments and retirement accounts at today's value, your home at an honest market estimate, vehicles at resale value rather than what you paid. Then list every debt: mortgage, auto loan, student loans, credit cards and anything else.",
      "The calculator subtracts total debts from total assets. Update it on a fixed schedule — quarterly works — using the same valuation rules each time, or the changes will reflect your mood about house prices rather than your actual progress.",
      "Read the change, not the level. Net worth rises from three sources: saving and investing, debt principal paid down, and asset appreciation. Only the first two are under your control. A rising net worth driven purely by house prices can reverse; one driven by contributions compounds reliably.",
    ],
    formula: "Net worth = Total assets − Total liabilities.",
    example: {
      title: "Worked example: a household balance sheet",
      body: "Assets: home $420,000, investments and retirement accounts $85,000, bank and cash $18,000, vehicles $22,000 — total $545,000. Debts: mortgage $298,000, auto loan $14,000, credit cards $6,000, student loans $21,000 — total $339,000. Net worth = $545,000 − $339,000 = $206,000. Note the mortgage is 88% of all debt, which is normal for a homeowner.",
    },
    faqs: [
      {
        question: "Should I include my home in net worth?",
        answer:
          "Yes — it is an asset, and the mortgage is the matching liability, so excluding one without the other distorts the figure. Some people also track a separate liquid net worth (financial assets minus debts) because home equity cannot pay a bill without selling or borrowing.",
      },
      {
        question: "Do I include retirement accounts at full value?",
        answer:
          "The standard approach is yes, at current balance. A stricter approach discounts pre-tax accounts like a traditional 401(k) by the tax you will pay on withdrawal — at a 20% assumed rate, a $100,000 balance counts as $80,000. Either is defensible; be consistent between updates.",
      },
      {
        question: "What is a good net worth by age?",
        answer:
          "There is no official benchmark, and surveys (such as the Federal Reserve's Survey of Consumer Finances) show wide spreads at every age because income and housing costs differ. A more useful test is direction and savings rate: net worth growing faster than inflation, year after year, puts you ahead of most households regardless of the level.",
      },
      {
        question: "Can net worth be negative?",
        answer:
          "Yes, and it is common early in working life when student loans and car finance exceed assets. It is a starting point, not a verdict. Every debt payment and contribution moves it up; tracking it quarterly makes the progress visible while it still feels slow.",
      },
    ],
  },

  "personal-wealth/emergency-fund-visualizer": {
    quickAnswer:
      "An emergency fund covers essential spending when income stops. Add up essentials — here $3,300 a month — and the standard target is 3 to 6 months of them: $9,900 to $19,800. Job loss, not car repairs, is the event the fund is sized for.",
    howItWorks: [
      "Enter your essential monthly costs only: rent or mortgage, basic food, utilities, transport, insurance and minimum debt payments. Leave out dining out, subscriptions and travel — those stop when income stops. The visualizer stacks these into your true monthly burn rate.",
      "Choose your cover in months. Three months suits a dual-income household with secure jobs; six months suits a single earner, a freelancer, or anyone whose job would take long to replace. The calculator multiplies essentials by months to give the target, then compares it with what you have saved and how fast you are adding to it.",
      "Keep the finished fund in a high-yield savings account: separate from everyday money, insured, and reachable within a few days. Money invested in stocks is not an emergency fund — the emergency and the market fall tend to arrive together.",
    ],
    formula: "Target fund = Monthly essential spending × Months of cover. Months covered now = Current savings ÷ Monthly essential spending.",
    example: {
      title: "Worked example: $3,300 a month of essentials",
      body: "Essentials: rent $1,650, food $620, utilities $280, transport $340, insurance and minimum payments $410 — total $3,300 a month. Three months of cover is $9,900; six months is $19,800. With $7,500 already saved, you hold 2.3 months of cover. Saving $500 a month closes the gap to the six-month target in about 25 months.",
    },
    faqs: [
      {
        question: "How many months of expenses do I really need?",
        answer:
          "Three to six months of essential spending is the standard range. Push toward six if you are the only earner, self-employed, work in a cyclical industry, or have dependants. Two earners in unrelated industries can reasonably hold less, because both incomes rarely stop at once.",
      },
      {
        question: "Should I build the fund before paying off credit cards?",
        answer:
          "Build a small starter fund first — around one month of essentials or $1,000 to $2,000 — then attack high-interest debt, then finish the fund. Without any buffer, the next unexpected bill goes straight back onto the card you just cleared.",
      },
      {
        question: "Does the fund need to cover my full salary?",
        answer:
          "No, it covers essential spending, which is normally well below salary because taxes, saving and discretionary spending pause during an emergency. In the worked example, essentials of $3,300 might sit under take-home pay of $5,000 — that gap is why the fund is smaller than people expect.",
      },
      {
        question: "Where should I keep an emergency fund?",
        answer:
          "In an insured savings account, ideally a high-yield one earning around 4% to 5% APY recently, at a different bank if that helps you leave it alone. Avoid CDs with early penalties for the core fund and avoid anything whose value can fall.",
      },
    ],
  },

  "personal-wealth/inflation-purchasing-power-calculator": {
    quickAnswer:
      "This calculator shows what inflation does to money over time. At 3% annual inflation, $50,000 kept in cash for 20 years buys what $27,684 buys today — and you would need $90,306 in 20 years to match today's $50,000 of purchasing power.",
    howItWorks: [
      "Enter an amount, an inflation rate and a number of years. The calculator discounts the amount by inflation each year, which is the same compounding formula as investment growth run in reverse.",
      "Use it in both directions. The forward answer — what a future price or salary is worth in today's money — tells you whether a future amount is actually progress. The reverse answer — what today's amount becomes in future prices — tells you how much a goal like a house deposit or retirement income really needs to be.",
      "Pick the inflation rate deliberately. US inflation averaged roughly 3% over the very long run, ran above 8% in 2022, and the Federal Reserve targets 2%. Your personal inflation also depends on your spending mix: housing, healthcare and education have often risen faster than the headline rate.",
    ],
    formula: "Purchasing power = Amount ÷ (1 + inflation rate)^years. Future nominal equivalent = Amount × (1 + inflation rate)^years.",
    example: {
      title: "Worked example: $50,000 over 20 years at 3% inflation",
      body: "Purchasing power in today's terms: $50,000 ÷ 1.03^20 = $50,000 ÷ 1.806 = $27,684. Working the other way, matching today's $50,000 in 20 years takes $50,000 × 1.03^20 = $90,306. Cash under the mattress therefore loses about 45% of its value over the period; a savings account must earn at least 3% just to stand still in real terms.",
    },
    faqs: [
      {
        question: "What inflation rate should I use for planning?",
        answer:
          "2.5% to 3% is a reasonable long-term planning assumption for the US — above the Federal Reserve's 2% target, below the spikes of 2021–2023. For a conservative plan, test 3.5% as well and check the plan still works.",
      },
      {
        question: "How does inflation affect my savings account?",
        answer:
          "Compare the account's APY with inflation. At 4.5% APY and 3% inflation, your real return is roughly 1.5% before tax — and interest is taxed, so after tax at the 22% bracket the real return falls to about 0.5%. Cash in a 0.5% account loses close to 2.5% of value a year at 3% inflation.",
      },
      {
        question: "What is the rule of 72 for inflation?",
        answer:
          "Divide 72 by the inflation rate to get the years for purchasing power to halve. At 3% inflation, money halves in value in about 24 years. At 6%, about 12 years. It is the same rule used for investment doubling, run in reverse.",
      },
      {
        question: "Does inflation change how much I need to retire?",
        answer:
          "Directly. Spending of $60,000 a year today needs to be about $108,000 a year in 20 years at 3% inflation to buy the same life. Retirement calculators that show a large future balance are usually showing nominal dollars; divide by the inflation factor to see the figure in today's terms.",
      },
    ],
  },

  "personal-wealth/rule-of-72-calculator": {
    quickAnswer:
      "The rule of 72 estimates doubling time: divide 72 by your annual return. At 8%, money doubles in about 9 years (the exact answer is 9.01 years). At 4%, it takes about 18 years. It also works in reverse for inflation and debt.",
    howItWorks: [
      "Enter an annual rate of return. The calculator divides 72 by the rate and shows the approximate years to double, alongside the exact logarithmic answer so you can see how close the shortcut lands.",
      "The rule works because 72 is close to 100 × ln(2) adjusted for typical rates, and because 72 divides cleanly by 2, 3, 4, 6, 8, 9 and 12. It is most accurate between about 5% and 12%; at very low or very high rates the error grows, which the exact figure exposes.",
      "Apply it beyond investments. At 3% inflation, purchasing power halves in about 24 years. A credit card balance at 24% APR, left unpaid and ignoring minimum-payment rules, would double in about 3 years. The same three-second calculation frames all three decisions.",
    ],
    formula: "Years to double ≈ 72 ÷ annual rate (%). Exact: years = ln(2) ÷ ln(1 + r).",
    example: {
      title: "Worked example: doubling at 8%",
      body: "72 ÷ 8 = 9 years. The exact calculation, ln(2) ÷ ln(1.08), gives 9.01 years — the rule is off by about four days. Invest $10,000 at a steady 8% and it becomes roughly $20,000 in year 9, $40,000 in year 18 and $80,000 in year 27: three doublings, which is why starting a decade earlier matters more than most contribution increases.",
    },
    faqs: [
      {
        question: "Why 72 and not 70 or 69?",
        answer:
          "69.3 is the mathematically exact constant for continuous compounding, and 70 is a common alternative. 72 is used because it divides evenly by most rates people actually meet and it slightly corrects for annual compounding at mid-range rates, landing closer than 69.3 does between 5% and 12%.",
      },
      {
        question: "How accurate is the rule of 72?",
        answer:
          "Very close in its sweet spot: at 8% it gives 9 years against an exact 9.01. At 2% it gives 36 years against an exact 35.0 — about a year out. At 20% it gives 3.6 years against an exact 3.8. For planning estimates, the error is acceptable; for contracts, use the exact formula.",
      },
      {
        question: "Can I use the rule for monthly contributions?",
        answer:
          "Not directly — the rule describes a single sum compounding. With monthly contributions your balance doubles faster than the rule suggests because new money keeps arriving. Use it to judge the growth engine, and a savings or investment calculator for the contribution plan itself.",
      },
      {
        question: "What return makes money double in 10 years?",
        answer:
          "72 ÷ 10 = 7.2% a year (the exact figure is 7.18%). That is a useful benchmark: a portfolio returning about 7% doubles each decade, before inflation. Against 3% inflation, the real doubling takes roughly 17 years because the real return is about 4%.",
      },
    ],
  },

  "personal-wealth/retirement-calculator": {
    quickAnswer:
      "A retirement calculator projects the pot you will have at retirement from your current savings, monthly contributions and an assumed return. $80,000 saved by age 35, plus $800 a month at a 7% return, grows to about $1,625,000 by 65 — roughly $670,000 in today's purchasing power after 3% inflation.",
    howItWorks: [
      "Enter your current age, retirement age, current savings, monthly contribution and expected return. The calculator compounds the existing pot for the full period and each monthly contribution for the time it is invested.",
      "Then judge the result against spending, not against the headline number. A common yardstick is that a sustainable withdrawal is around 4% of the pot in the first year of retirement, adjusted for inflation after that. On $1,625,000 that implies roughly $65,000 a year of portfolio income, before Social Security and taxes.",
      "Run the pessimistic case before trusting the plan. Drop the return to 5% and the same saver reaches roughly $1,020,000 — the plan should still work, or the contribution needs to rise. Contribution and retirement age are the levers you control; the return is not.",
    ],
    formula: "Projected pot = Current savings × (1 + r/12)^(12 × years) + Monthly contribution × [((1 + r/12)^(12 × years) − 1) / (r/12)].",
    example: {
      title: "Worked example: saving from 35 to 65 at 7%",
      body: "Current savings $80,000, contributions $800 a month, return 7%, horizon 30 years. The existing pot grows to about $649,000 and the contributions — $288,000 paid in — grow to about $976,000. Total: roughly $1,625,000. Discounted at 3% inflation, that is about $670,000 in today's money, which is the figure to compare with the retirement spending you have in mind.",
    },
    faqs: [
      {
        question: "How much should I have saved by each age?",
        answer:
          "A widely used guideline (Fidelity's) suggests about 1× your salary saved by 30, 3× by 40, 6× by 50 and 10× by 67, assuming retirement at 67 and a conventional lifestyle. It is a checkpoint, not a rule — a late start can be offset by higher contributions, later retirement, or lower planned spending.",
      },
      {
        question: "What return should I assume before retirement?",
        answer:
          "Many planners use 6% to 7% nominal for a diversified stock-heavy portfolio and 5% for a balanced one, then test 2 points lower. Using 10% because it is the long-run US stock average leaves no margin for a bad decade near retirement, when the damage is hardest to repair.",
      },
      {
        question: "Does the calculator include Social Security?",
        answer:
          "This projection covers your own savings only. Social Security is a separate income stream: benefits replace roughly 40% of pre-retirement income for a medium earner, claimed between 62 and 70. Add your estimated benefit on top of what the portfolio can sustainably pay.",
      },
      {
        question: "How does retiring five years earlier change the result?",
        answer:
          "Twice over: five fewer years of contributions and growth, and five more years of spending. In the worked example, retiring at 60 instead of 65 cuts the pot from about $1,625,000 to about $1,110,000 — roughly a third less, from a change that feels like a sixth of the timeline.",
      },
    ],
  },

  "personal-wealth/roth-ira-calculator": {
    quickAnswer:
      "A Roth IRA calculator projects tax-free retirement savings: you contribute after-tax money and withdraw it tax-free in retirement. $500 a month for 30 years at a 7% return grows to about $610,000, of which $180,000 is contributions and roughly $430,000 is growth you never pay tax on if withdrawals are qualified.",
    howItWorks: [
      "Enter your monthly or annual contribution, years until retirement and expected return. The calculator compounds contributions exactly like a regular investment account — the Roth difference is tax treatment, not maths.",
      "Contributions are made from taxed income, so there is no deduction now. In exchange, qualified withdrawals after age 59½ are completely tax-free, including decades of growth. The 5-year rule must also be met: the account must have been open at least five tax years before earnings come out tax-free.",
      "Compare the Roth with a traditional IRA on one question: is your tax rate higher now or in retirement? Paying 12% now to avoid 22% later makes the Roth the clear winner. Paying 24% now to avoid 12% later favours the traditional account. Near-equal rates make the Roth's flexibility — contributions can be withdrawn any time without tax or penalty — the tiebreaker.",
    ],
    formula: "Projected value = Contribution per month × [((1 + r/12)^(12t) − 1) / (r/12)]. Tax-free growth = projected value − total contributions.",
    example: {
      title: "Worked example: $500 a month for 30 years at 7%",
      body: "Contributions total $500 × 360 = $180,000. Compounded monthly at 7%, they reach about $609,986. The growth of roughly $429,986 is tax-free on a qualified withdrawal. In a taxable account, that same growth, taxed at a 15% capital gains rate, would cost about $64,500 — the Roth wrapper is what you are buying with the tax you paid up front.",
    },
    faqs: [
      {
        question: "What is the Roth IRA contribution limit for 2026?",
        answer:
          "For 2026 the limit is $7,500 if you are under 50, and $8,600 at 50 or older (the $7,500 plus a $1,100 catch-up). You also need earned income at least equal to your contribution, and high incomes phase the limit out — for 2026 the phase-out starts around $153,000 for single filers and $242,000 for married couples filing jointly. Verify current figures with the IRS before contributing.",
      },
      {
        question: "Can I withdraw my Roth IRA contributions early?",
        answer:
          "Yes. Your own contributions (not earnings) can be withdrawn at any age, at any time, with no tax and no penalty, because the tax was already paid. Earnings withdrawn before 59½ and before the account is five years old are taxed and usually hit with a 10% penalty, with exceptions such as up to $10,000 for a first home.",
      },
      {
        question: "Is there an income limit for a Roth IRA?",
        answer:
          "Yes for direct contributions — see the phase-out ranges above. There is no income limit on converting traditional IRA money to a Roth, which is the basis of the so-called backdoor Roth: contribute to a traditional IRA without a deduction, then convert. The conversion is a taxable event on any pre-tax money involved, and the pro-rata rule applies if you hold other IRA balances.",
      },
      {
        question: "Do Roth IRAs have required minimum distributions?",
        answer:
          "No — not for the original owner. Since 2024, Roth 401(k)s are also exempt. This is a real planning advantage: the account can keep compounding for life and pass to heirs, who generally must empty an inherited Roth within 10 years but owe no income tax on it.",
      },
    ],
  },

  "personal-wealth/ira-calculator": {
    quickAnswer:
      "An IRA calculator projects retirement savings in an individual retirement account and, where it compares account types, shows the after-tax difference. $7,000 a year for 25 years at 7% grows to about $472,500 before tax — worth $472,500 in a Roth, or about $415,800 in a traditional IRA if withdrawn at a 12% tax rate.",
    howItWorks: [
      "Enter your annual contribution, years to retirement, expected return and, for the comparison, your tax rate now and in retirement. Contributions compound monthly in this calculator, matching how most people actually invest — a set amount each month.",
      "A traditional IRA defers tax: contributions may be deductible now, growth is untaxed along the way, and withdrawals in retirement are taxed as ordinary income. A Roth IRA inverts it: no deduction now, no tax later. The pre-tax projection is identical; the after-tax result is where they separate.",
      "Two constraints shape real IRA saving. Contributions are capped each year, and you need earned income to contribute. Required minimum distributions apply to traditional IRAs from age 73 (75 if you were born in 1960 or later), whether you need the money or not.",
    ],
    formula: "Projected value = Annual contribution ÷ 12 × [((1 + r/12)^(12t) − 1) / (r/12)]. Traditional after-tax value = projected value × (1 − retirement tax rate).",
    example: {
      title: "Worked example: $7,000 a year for 25 years at 7%",
      body: "Contributing $7,000 a year ($583 a month) for 25 years at a 7% return produces a pot of about $472,542, from $175,000 of contributions. As a Roth, the full amount is yours. As a traditional IRA withdrawn at 12%, you keep about $415,837; withdrawn at 22%, about $368,583. The traditional account also gave you deductions along the way — the honest comparison invests that tax saving too, which narrows the Roth's lead.",
    },
    faqs: [
      {
        question: "What is the IRA contribution limit for 2026?",
        answer:
          "An estimated $7,500 for 2026 if under 50, $8,600 at 50-plus, across all your IRAs combined (traditional and Roth together). The limit is per person, so a married couple can contribute up to double, provided household earned income covers it. Confirm the final IRS figures for the year before contributing the maximum.",
      },
      {
        question: "Can I contribute to both a 401(k) and an IRA?",
        answer:
          "Yes. Having a workplace plan does not stop IRA contributions, but it can limit the traditional IRA deduction at higher incomes. Roth IRA contributions have their own income phase-outs. The limits for each account type are separate.",
      },
      {
        question: "When can I withdraw IRA money without penalty?",
        answer:
          "From age 59½, for both types. Traditional withdrawals are taxed as income whenever they happen. Earlier withdrawals are usually taxed plus a 10% penalty, with exceptions including certain education costs, up to $10,000 for a first home, and substantially equal periodic payments under rule 72(t).",
      },
      {
        question: "What happens if I contribute too much to an IRA?",
        answer:
          "The excess is taxed at 6% for every year it stays in the account. You can avoid the penalty by withdrawing the excess and its earnings before the tax filing deadline for that year. Contribution room is use-it-or-lose-it each year, but over-contributing is worse than missing a year.",
      },
    ],
  },

  "personal-wealth/roth-ira-conversion-simulator": {
    quickAnswer:
      "A Roth conversion moves money from a traditional IRA or 401(k) into a Roth IRA, triggering tax now in exchange for tax-free growth and withdrawals later. Converting $40,000 in the 22% bracket costs $8,800 in tax; left to grow 20 years at 7%, that money becomes about $154,787 of tax-free value versus about $136,213 kept if a traditional withdrawal is taxed at 12%.",
    howItWorks: [
      "Enter the conversion amount, your tax rate today, your expected tax rate in retirement, the growth rate and the years until you spend the money. The simulator grows the converted amount tax-free and grows the unconverted amount, then taxes it at withdrawal.",
      "The conversion itself is a taxable event: the amount converted is added to your ordinary income for that year. Converting in a low-income year — after retiring, before Social Security and required distributions begin — can fill a low bracket cheaply. Converting on top of a full salary usually cannot.",
      "The comparison assumes the conversion tax is paid from money outside the IRA. Paying the tax out of the converted amount shrinks what lands in the Roth and weakens the case, especially under age 59½, when the withheld portion can also count as an early distribution.",
    ],
    formula: "Roth outcome = Converted amount × (1 + r)^t, with tax of (converted amount × today's rate) paid separately. Traditional outcome = Converted amount × (1 + r)^t × (1 − retirement rate).",
    example: {
      title: "Worked example: converting $40,000 with 20 years to grow",
      body: "Convert $40,000 at a 22% rate today: the tax bill is $8,800, paid from savings. At 7% for 20 years, the Roth holds $40,000 × 1.07^20 ≈ $154,787, all withdrawable tax-free. Left in the traditional IRA, the same growth gives $154,787 before tax: keep $136,213 if taxed at 12% in retirement, or $120,734 if taxed at 22%. The conversion wins whenever your retirement rate turns out higher than the rate you convert at — and loses when it is lower.",
    },
    faqs: [
      {
        question: "When is the best time to do a Roth conversion?",
        answer:
          "In years when your taxable income is unusually low: early retirement before Social Security starts, a career break, or a year with large deductions. The window between retiring and required minimum distributions at 73 is the classic opportunity, because you control how much income to create, bracket by bracket.",
      },
      {
        question: "Can I undo a Roth conversion?",
        answer:
          "No. Recharacterisation of conversions was removed by the Tax Cuts and Jobs Act — since 2018 a conversion is permanent. Convert in tranches across the year if you want to manage the tax bill against income you can only estimate.",
      },
      {
        question: "Does a conversion affect Medicare premiums or other thresholds?",
        answer:
          "It can. Converted amounts count in modified adjusted gross income, which drives Medicare IRMAA premium surcharges two years later, the taxation of Social Security benefits, and eligibility for various credits. A conversion that is cheap on the income tax line can still be expensive overall — model the full picture, not just the bracket.",
      },
      {
        question: "What is the pro-rata rule?",
        answer:
          "If you hold any pre-tax IRA money, a conversion is taxed in proportion to your pre-tax share across all traditional IRAs, not just the account you convert from. Holding a large pre-tax IRA makes 'convert only the after-tax part' impossible. Rolling pre-tax IRA money into a 401(k) first is the standard workaround.",
      },
    ],
  },

  "personal-wealth/rmd-calculator": {
    quickAnswer:
      "An RMD calculator divides your prior year-end retirement account balance by an IRS life-expectancy factor. At age 75 with a $480,000 traditional IRA balance, the factor is 24.6 and the required minimum distribution is $19,512 — money that must come out and be taxed that year whether you need it or not.",
    howItWorks: [
      "Enter your age at the end of the distribution year and the account balance on the previous 31 December. The calculator looks up your factor in the IRS Uniform Lifetime Table and divides. That specific balance date — not today's balance — is what the IRS uses, and it surprises people every year.",
      "RMDs apply to traditional IRAs, SEP and SIMPLE IRAs, and workplace plans like 401(k)s and 403(b)s. Roth IRAs have none for the owner, and Roth 401(k)s have been exempt since 2024. You can withdraw more than the RMD; you cannot withdraw less without a penalty, and extra taken one year does not reduce next year's requirement.",
      "If you have several traditional IRAs, the total RMD is calculated across all of them but can be taken from any one or combination. Workplace plans are stricter: each 401(k) generally requires its own distribution, unless you still work for that employer.",
    ],
    formula: "RMD = Account balance on 31 December of the prior year ÷ Uniform Lifetime Table factor for your age. Selected factors: age 73 → 26.5, age 75 → 24.6, age 80 → 20.2, age 85 → 16.0, age 90 → 12.2.",
    example: {
      title: "Worked example: age 75 with a $480,000 IRA",
      body: "Your traditional IRA held $480,000 on 31 December last year and you turn 75 this year. The Uniform Lifetime Table factor for 75 is 24.6. RMD = $480,000 ÷ 24.6 = $19,512.20. That amount is added to your taxable income for the year. At age 80 the same $480,000 balance would require $480,000 ÷ 20.2 = $23,762 — the required share rises every year even if the balance does not.",
    },
    faqs: [
      {
        question: "At what age do RMDs start?",
        answer:
          "Age 73 if you were born between 1951 and 1959, and age 75 if you were born in 1960 or later, under the SECURE 2.0 Act. Your first RMD can be delayed until 1 April of the following year, but that forces two distributions into one tax year, which can push you into a higher bracket.",
      },
      {
        question: "What is the penalty for missing an RMD?",
        answer:
          "25% of the amount you failed to withdraw, reduced to 10% if the shortfall is corrected promptly and a return is filed. It was 50% before 2023. The IRS can also waive the penalty for reasonable error if you take the missed distribution and file Form 5329 with an explanation.",
      },
      {
        question: "Can I satisfy my RMD with a charitable donation?",
        answer:
          "Yes, from age 70½, through a qualified charitable distribution (QCD): a direct transfer from an IRA to a charity counts toward your RMD and is excluded from taxable income entirely, up to an indexed annual limit ($111,000 for 2025; check the current-year figure). For charitably inclined retirees it usually beats withdrawing, paying tax and then donating.",
      },
      {
        question: "Do I owe an RMD on an inherited IRA?",
        answer:
          "Usually yes, under different rules. Most non-spouse beneficiaries must empty an inherited IRA within 10 years, and if the original owner had reached RMD age, annual distributions are generally required in years 1 to 9 as well. Spouses have more options, including treating the account as their own.",
      },
    ],
  },

  "personal-wealth/social-security-calculator": {
    quickAnswer:
      "This calculator estimates your Social Security retirement benefit from your earnings record and claiming age. A worker with average indexed monthly earnings of $5,000 has a full-retirement-age benefit of about $2,281 a month — cut to roughly $1,597 if claimed at 62, or raised to about $2,828 if delayed to 70.",
    howItWorks: [
      "Social Security averages your highest 35 years of earnings, indexed for wage growth, into an average indexed monthly earnings figure (AIME). The benefit formula then replaces 90% of the first slice of AIME, 32% of the next slice and 15% above that — the bend points — producing your primary insurance amount, payable at full retirement age.",
      "Claiming age then adjusts that amount permanently. Claiming at 62 with a full retirement age of 67 cuts the benefit by 30%. Each year of delay past full retirement age adds 8% in delayed retirement credits, up to age 70. There is no advantage to waiting beyond 70.",
      "This is a simplified estimate built on the inputs you give. Your actual benefit depends on your full earnings record, which only the Social Security Administration holds. Get your real figures from your statement at ssa.gov before making a claiming decision — for most households it is the largest retirement decision they make.",
    ],
    formula: "PIA = 90% of AIME up to the first bend point + 32% of AIME between the bend points + 15% above the second bend point. Recent bend points: $1,174 and $7,078 (2025 figures, indexed yearly). Claiming adjustment: −30% at 62 (FRA 67) to +24% at 70.",
    example: {
      title: "Worked example: AIME of $5,000, full retirement age 67",
      body: "PIA = 0.90 × $1,174 + 0.32 × ($5,000 − $1,174) = $1,056.60 + $1,224.32 = $2,280.92, so about $2,281 a month at 67. Claim at 62 and it falls by 30% to about $1,597. Delay to 70 and it rises by 24% to about $2,828. Over a retirement to age 90, the delay trades five fewer years of payments for a permanently higher, inflation-indexed income.",
    },
    faqs: [
      {
        question: "What is full retirement age?",
        answer:
          "67 for anyone born in 1960 or later; between 66 and 67 for those born from 1943 to 1959. Benefits can start at 62 with a permanent reduction, or be delayed to 70 for the maximum. The reduction for claiming 60 months early, with a full retirement age of 67, is 30%.",
      },
      {
        question: "How many years of work do I need to qualify?",
        answer:
          "You need 40 credits — roughly 10 years of covered work. The benefit amount, though, is based on your highest 35 years of earnings. Fewer than 35 years means zeros are averaged in, which is why extra years of work late in a career can still raise the benefit by replacing a zero or low year.",
      },
      {
        question: "Is Social Security taxed?",
        answer:
          "For most retirees with other income, yes: up to 85% of benefits can be included in taxable income, depending on combined income. Below $25,000 of combined income for single filers ($32,000 married), benefits are not taxed federally. Some states also tax benefits, though most do not.",
      },
      {
        question: "Can I work while claiming Social Security?",
        answer:
          "Yes, but before full retirement age the earnings test temporarily withholds $1 of benefits for every $2 earned above an annual limit ($23,400 for 2025; the limit is indexed). Withheld amounts are not lost — your benefit is recalculated upward at full retirement age. From full retirement age on, you can earn any amount with no reduction.",
      },
    ],
  },

  "personal-wealth/investment-calculator": {
    quickAnswer:
      "An investment calculator projects portfolio growth from an initial investment plus regular contributions. $25,000 invested with $400 a month at an 8% average annual return grows to about $358,778 in 20 years — $121,000 contributed and roughly $237,778 of growth.",
    howItWorks: [
      "Enter the initial amount, monthly contribution, expected annual return and horizon. The calculator compounds monthly, so each contribution starts growing the month after it is invested and the existing balance compounds throughout.",
      "The assumed return is the input to interrogate. US equities have averaged roughly 10% a year nominally over long periods, bonds far less, and any real portfolio's sequence of returns will be uneven — including falls of 30% or more. Planning on 6% to 8% for a diversified portfolio leaves room for disappointment; the calculator's smooth line will never match a real account statement.",
      "Compare the contribution total with the growth total in the results. Early in the horizon, contributions dominate — your saving rate is the engine. Later, growth dominates — the portfolio's return is the engine. That crossover is the point at which investment decisions start to matter more than budget decisions.",
    ],
    formula: "Future value = Initial × (1 + r/12)^(12t) + Monthly × [((1 + r/12)^(12t) − 1) / (r/12)], where r is the annual return and t the years.",
    example: {
      title: "Worked example: $25,000 plus $400 a month at 8% for 20 years",
      body: "The initial $25,000 compounds to about $123,000. The 240 contributions of $400 — $96,000 paid in — grow to about $235,800. Combined future value: roughly $358,778. Growth supplies about two-thirds of the end value. Cut the return to 6% and the same plan ends near $286,000, which is the sensitivity to keep in mind before treating any projection as a promise.",
    },
    faqs: [
      {
        question: "Should I use pre-tax or after-tax returns?",
        answer:
          "For money in an IRA or 401(k), project the account balance with pre-tax returns and remember withdrawals may be taxed (traditional) or not (Roth). In a taxable account, dividends, interest and realised gains are taxed along the way, so an 8% gross return might compound at closer to 7% after tax depending on the investments and your bracket.",
      },
      {
        question: "How do investment fees affect the projection?",
        answer:
          "Subtract them from the return. A fund charging 1% a year against one charging 0.1% turns an 8% market return into 7% versus 7.9%. On the worked example, compounding at 7% instead of 8% cuts the 20-year result from about $358,778 to about $321,000 — roughly $38,000 paid for the fee difference.",
      },
      {
        question: "What return should I enter for a 60/40 portfolio?",
        answer:
          "Historical nominal returns for a 60% stock / 40% bond mix have been around 8% over very long periods, but forward-looking planner assumptions are often 5% to 7% because bond yields and valuations change the outlook. Model the lower figure for decisions you cannot afford to get wrong, like a retirement date.",
      },
      {
        question: "Does the calculator include inflation?",
        answer:
          "No — results are nominal. At 3% inflation, divide the result by about 1.81 for a 20-year horizon to see today's purchasing power: the $358,778 example is roughly $198,600 in today's money. Decisions about whether a plan is 'enough' should always be made in real terms.",
      },
    ],
  },

};
