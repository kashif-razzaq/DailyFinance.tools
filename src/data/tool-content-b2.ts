/**
 * Tool content — part B: tax, ecommerce, creator and the two new freelance tools.
 * Written in the TONE-OF-VOICE.md voice (professional, direct, concrete numbers).
 * Keyed by URL path without the leading slash, e.g. "tax/paycheck-calculator".
 * Tax figures use the same projected 2026 federal brackets and standard
 * deduction as the calculators themselves, and are labelled estimates.
 */
export interface ToolContentEntry {
  quickAnswer: string
  howItWorks: string[]
  formula?: string
  example: { title: string; body: string }
  faqs: { question: string; answer: string }[]
}

export const TOOL_CONTENT_B2: Record<string, ToolContentEntry> = {
  "ecommerce/inventory-reorder-point-calculator": {
    quickAnswer:
      "Selling 20 units a day with a 14-day lead time and 7 days of safety cover, reorder at 420 units: 280 to cover the lead time plus 140 of safety stock. With 500 units on hand, you reach that point in 4 days, so the order goes in this week.",
    howItWorks: [
      "Enter average daily unit sales, current stock on hand, supplier lead time in days, safety stock cover in days, and how many days of cover each order should buy. The calculator returns the reorder point, the days of stock you have left, the days until you hit the reorder point, and a suggested order quantity. At the defaults — 20 units a day, a 14-day lead time, 7 days of safety cover and 500 units on hand — the reorder point is 420 and the suggested order is 520 units.",
      "The reorder point has two parts. Lead-time demand is daily sales multiplied by lead time: the stock you will sell while the next order is on its way. Safety stock is daily sales multiplied by your safety days: the buffer for demand spikes and late deliveries. Add the two together and you have the stock level that triggers an order.",
      "Safety days are the judgement input. A product with steady sales and a reliable supplier runs fine on 3 to 5 days of cover. A product with spiky demand, a long or variable lead time, or a supplier who misses dates needs 10 to 14 days. Too much safety stock ties cash up on shelves; too little turns a late delivery into a stockout.",
      "Lead time means order to shelf-ready, not shipping alone: supplier processing, production, transit, customs, receiving and inspection all count. A product with 5-day shipping and 9 days of production has a 14-day lead time. Underestimating lead time is the most common reason reorder points fail in practice.",
      "The suggested order quantity covers your chosen days of cover on top of the reorder point, minus what you already hold. Recalculate whenever demand or supply changes: a promotion, a viral mention, a new supplier, a port delay. A reorder point built on last quarter's daily sales will stock you out in a growth month and overstock you in a decline.",
    ],
    formula:
      "Reorder point = (daily sales x lead time) + (daily sales x safety days). Days of stock left = current stock / daily sales. Suggested order = (daily sales x cover days) + reorder point - current stock.",
    example: {
      title: "Worked example: 20 units a day, 14-day lead time",
      body: "Daily sales of 20 units and a 14-day lead time give lead-time demand of 280 units. Seven days of safety cover adds 140 units, so the reorder point is 420. With 500 units on hand you have 25 days of stock and reach the reorder point in 4 days, so the order goes in this week. For 30 days of cover per order, the suggested quantity is 600 + 420 - 500 = 520 units. Cut safety cover to 3 days and the reorder point falls to 340, freeing 80 units of cash — a fair trade only if demand is steady and the supplier delivers on time.",
    },
    faqs: [
      {
        question: "What is safety stock and how much do I need?",
        answer:
          "Safety stock is inventory held beyond expected lead-time demand to absorb surprises: demand spikes and late deliveries. This calculator sizes it in days of cover rather than units, so it scales with sales. Start at 3 to 5 days for steady products with reliable suppliers and 10 to 14 days for volatile ones, then adjust from your stockout history: every stockout argues for more, every overstock for less.",
      },
      {
        question: "Does lead time include production and processing?",
        answer:
          "It must include everything between deciding to order and the goods being sellable: supplier processing, production, transit, customs, receiving and inspection. Quoted '5-day shipping' on a product with 10 days of production is a 15-day lead time. Underestimating lead time is the most common cause of reorder points that fail in practice.",
      },
      {
        question: "How often should reorder points be reviewed?",
        answer:
          "Monthly for active products, and immediately when demand or supply changes materially: a promotion, a viral mention, a supplier change, a port delay. Seasonal products need seasonal points: the correct reorder point for November is wrong for February. The calculator's days-until-reorder output is the number to watch between reviews.",
      },
      {
        question: "What is the difference between reorder point and reorder quantity?",
        answer:
          "The reorder point is a level of stock that triggers an order. The reorder quantity is how much the order contains, set here by the days of cover you want each order to buy. Confusing the two — ordering the reorder point amount, for example — is a frequent spreadsheet error. This calculator keeps them separate: the point says when, the suggested order says how much.",
      },
    ],
  },

  "ecommerce/aov-upsell-simulator": {
    quickAnswer:
      "A $19 upsell accepted by 25% of buyers adds $4.75 to a $55 average order — $59.75 — worth $9,500 of extra revenue on 2,000 orders a month. At a 70% margin on the upsell, that is $6,650 of extra profit. The take rate matters more than the price: doubling acceptance beats doubling price.",
    howItWorks: [
      "Enter your monthly order count, current average order value, the upsell's price, the share of customers you expect to accept it, and the upsell's margin. The simulator computes the new average order value, the extra revenue across your order volume, and the extra profit after the upsell's cost.",
      "The mechanism is simple: extra revenue per order equals the upsell price multiplied by the take rate. A $19 upsell at a 25% take rate adds $4.75 to every order on average, whether or not a given customer accepts it. Multiply by monthly orders and you have the revenue line; multiply again by margin and you have the profit line. At the defaults, the uplift is $4.75 per order, so a store doing 2,000 orders a month adds $9,500 of revenue before costs.",
      "Net the result against the upsell's cost. An upsell with a 70% margin contributes 70% of its headline uplift to profit; a discount-funded upsell can add revenue while subtracting profit. Service upsells such as warranties and installation carry the highest margins, often 80 to 90%, because there is no physical product to buy.",
      "Post-purchase upsells, shown after payment, behave differently from cart add-ons: they cannot lose the original sale. Model them separately, because take rates and refund rates differ between the two placements. A cart add-on that lifts average order value by $3 while costing 2% of checkouts is a loss on most stores.",
      "Test sensitivity before building anything. The simulator's point is the range: at a 10% take rate the example adds $1.90 per order; at 40% it adds $7.60. If the feature only pays at the optimistic end of the range, it should not be built yet — and if it pays at the pessimistic end, it should be built now. A take rate that only appears in the best week of the year is not a planning input.",
    ],
    formula:
      "Extra revenue per order = upsell price x take rate. New AOV = current AOV + extra revenue per order. Extra profit = orders x extra revenue per order x upsell margin.",
    example: {
      title: "Worked example: warranty upsell on an electronics store",
      body: "Average order value is $120. A $15 extended-warranty upsell carries a 90% margin because it is a service. At a 12% take rate, uplift per order = $15 x 12% = $1.80, of which $1.62 is profit. On 25,000 orders a year that is $40,500 of profit from a single checkout element. Moving the take rate to 18% with clearer copy raises it to $60,750 — a bigger gain than raising the warranty price to $20 at the old take rate, which returns $54,000. The same store testing a $29 bundle instead, at a 15% take rate and 65% margin, would add $4.35 per order and $2.83 of profit — $70,688 a year on 25,000 orders, beating the warranty on profit despite the lower take rate.",
    },
    faqs: [
      {
        question: "What is a realistic upsell take rate?",
        answer:
          "Post-purchase one-click upsells commonly convert at 5 to 15% of orders; well-matched cart add-ons such as consumables, warranties and gift wrap can reach 15 to 30%. Anything above that is usually a pricing artefact — the 'upsell' was part of the product customers expected. Model your first test at the bottom of the range and treat upside as a bonus.",
      },
      {
        question: "Do upsells hurt conversion?",
        answer:
          "Cart-stage offers can: an extra decision before payment costs some checkouts, which is why the main offer belongs behind the payment step where possible. Post-purchase upsells cannot lose the original sale. If you test a cart add-on, measure completed orders, not just average order value — a $3 gain per order that costs 2% of checkouts is a loss on most stores.",
      },
      {
        question: "What makes a good upsell offer?",
        answer:
          "Related to the purchase, priced well below it (a common ceiling is 25 to 30% of the main item's price), and easy to decline. Consumables for a device, protection for something fragile, and a quantity upgrade on something used up all qualify. Unrelated products at high prices are the pattern that trains customers to ignore the step.",
      },
      {
        question: "Should the upsell be discounted?",
        answer:
          "A modest discount of 10 to 20% can lift take rate enough to raise total profit, but check the maths: at a 60% margin, discounting 20% removes a third of the profit per acceptance, so the take rate must rise by 50% to break even on the change. Test it as a numbers question, not a copywriting one.",
      },
    ],
  },

  "ecommerce/black-friday-discount-roi-calculator": {
    quickAnswer:
      "A 30% discount on a $100 item with a $55 cost cuts profit per unit from $45 to $15 — unit sales must triple just to match a normal week. A 50% sales lift, which looks like a successful event, still leaves profit $22,500 down on a 1,000-unit baseline.",
    howItWorks: [
      "Enter the normal price, unit cost, baseline sales volume and the discount you are planning, plus the volume increase you expect. The calculator compares total profit before and during the promotion — total profit, not revenue and not units — and tells you whether the event clears its own bar. At the defaults — a $100 price, $55 cost, 1,000 baseline units and a 30% discount — normal profit is $45,000 and the sale must triple volume to match it.",
      "The mechanism is margin compression. Discounts come entirely out of margin: at a 45% margin, a 30% discount removes two-thirds of the profit per unit. The required volume multiplier, old unit profit divided by new unit profit, grows sharply as the starting margin gets thinner.",
      "Add the costs the discount itself creates: extra ad spend to promote the sale, marketplace deal fees, and the margin given up on units that would have sold at full price anyway. That last one, subsidising existing demand, is the hidden cost of store-wide sales, and it is why narrow offers usually beat blanket ones.",
      "The calculator's verdict has two conditions: the discounted unit profit must stay positive, and the expected uplift must meet the required uplift. If the discount equals or exceeds the margin, profit per unit is zero or negative and no volume can save the event — at a 30% margin, a 30% discount cannot break even at any volume.",
      "Use the result to design the offer, not just judge it. A narrower discount on slow lines, a threshold offer (spend $150, save 20%), or a gift-with-purchase can deliver the traffic effect with a fraction of the margin cost. Run each candidate offer through the same profit comparison before committing to it.",
    ],
    formula:
      "Discounted unit profit = price x (1 - discount) - cost. Units needed to match normal profit = normal profit / discounted unit profit. Promotion profit = discounted unit profit x units x (1 + uplift).",
    example: {
      title: "Worked example: 30% off at a 45% margin",
      body: "Normal: price $100, cost $55, profit $45 per unit, 1,000 units = $45,000 profit. Sale: price $70, profit $15 per unit. Required volume to match: $45,000 / $15 = 3,000 units — a 200% increase. If the event lifts volume 50% to 1,500 units, profit = 1,500 x $15 = $22,500. Revenue rises from $100,000 to $105,000 and the event still destroys $22,500 of profit. A 20% discount leaves $25 per unit and needs 1,800 units; at an 80% uplift it exactly matches the normal week, while the 30% discount at the same uplift returns only $27,000. The break-even formula tells the same story another way: at a 45% margin, the required extra volume is 0.45 / (0.45 - 0.30) - 1 = 200%. A store that cannot plausibly triple its volume in a week should not run a 30% store-wide discount at this margin.",
    },
    faqs: [
      {
        question: "How much extra volume does a discount need to break even?",
        answer:
          "Required extra volume = margin / (margin - discount) - 1, with both as decimals. At a 45% margin: a 10% discount needs 29% more units, 20% needs 80%, and 30% needs 200%. At a 30% margin a 30% discount cannot break even at any volume, because profit per unit is zero. The thinner the starting margin, the steeper the requirement.",
      },
      {
        question: "Why do big sale events often reduce profit?",
        answer:
          "Three reasons: the discount compresses margin on every unit, including those that would have sold anyway; ad costs rise because every competitor bids on the same shoppers; and demand is often pulled forward rather than created, so December slumps after November spikes. Revenue records and profit records are different events.",
      },
      {
        question: "Is a discount ever the right Black Friday strategy?",
        answer:
          "Yes — for clearing stock that will cost more to hold (seasonal goods, ageing inventory with storage fees), for acquiring customers whose lifetime value repays the loss, and where competitors' offers would otherwise take the sale entirely. The calculator's job is to make sure the reason is one of those, with numbers attached, rather than momentum.",
      },
      {
        question: "What alternatives preserve margin?",
        answer:
          "Threshold discounts (20% over $150) raise basket size instead of cutting every price; bundles move slow lines with fast ones at a blended discount smaller than it looks; gifts with purchase cost wholesale but are valued at retail by the customer; and early-access or limited-stock framing creates urgency with no discount at all. Each can be run through the same profit comparison.",
      },
    ],
  },

  "ecommerce/business-loan-runway-calculator": {
    quickAnswer:
      "A business holding $150,000 of cash with a net burn of $18,000 a month has 8.3 months of runway. A $100,000 loan at 9% over 36 months extends that to 11.8 months — it buys 3.5 months at the price of $14,479 of interest and a $3,180 monthly payment.",
    howItWorks: [
      "Enter the loan amount, APR and term you are considering, plus current cash and monthly net burn. The calculator shows the loan's monthly payment and total interest, runway without the loan, runway with both the cash and the payment included, and the extra months the loan buys.",
      "Runway is cash divided by net burn. The loan changes both sides of that division: it adds cash now and subtracts a payment every month. A loan always extends runway when its term is long enough, but by less than the headline amount suggests, because repayments start immediately and the payment raises burn from day one.",
      "The monthly payment is an amortising payment: each instalment covers that month's interest plus part of the principal. At 9% APR over 36 months, $100,000 costs $3,179.97 a month and $14,479 of interest over the term. Total interest is payment multiplied by term minus principal. Stretching the same loan to 60 months cuts the payment to about $2,076 but raises total interest to about $24,550 — longer terms buy runway at a higher total price.",
      "The useful output is the deadline, not the balance. Runway tells you the date by which revenue must rise or costs must fall. Financing decisions should be made against that date — raising money takes months, so the work starts while runway is still long, not when it is nearly gone.",
      "Model the downside case. If revenue falls 20%, how many months remain? A plan that only works at current revenue is not a plan the loan makes safe. And compare the loan against cutting burn: on $150,000 of cash, cutting $5,000 of monthly burn extends runway from 8.3 to 11.5 months permanently, with no interest and no fixed obligation.",
    ],
    formula:
      "Monthly payment = P x r / (1 - (1 + r)^-n), where P is principal, r the monthly rate and n the number of payments. Runway = cash / monthly net burn; with the loan, (cash + loan) / (burn + payment).",
    example: {
      title: "Worked example: $100,000 loan at 9% over 36 months",
      body: "The monthly payment on $100,000 at 9% APR over 36 months is $3,179.97, with total interest of $14,479 over the term. Cash rises to $250,000 but monthly burn rises to $21,179.97. Runway = $250,000 / $21,179.97 = 11.8 months, versus 8.3 months without the loan. The loan buys 3.5 months of runway, not the 5.6 months the cash alone implies. Cutting $5,000 of monthly burn instead would extend runway to 11.5 months with no interest — nearly the same time, bought without debt. If revenue fell and burn rose to $21,600, runway without the loan would be 6.9 months and with the loan 10.1 months: the loan still helps, but the deadline moves closer either way.",
    },
    faqs: [
      {
        question: "How much runway should a business keep?",
        answer:
          "Six months is a common minimum comfort level for a stable small business; 12 to 18 months is the target most lenders and investors look for in a growth-stage company. Below three months, options narrow sharply: loan approvals, hiring and supplier terms all get worse precisely when the business is weakest.",
      },
      {
        question: "Does a loan always extend runway?",
        answer:
          "Not if the term is short. A 12-month loan repaid faster than the business can use the cash can shorten effective runway: the payment raises burn immediately while the cash is spent over time. Lines of credit drawn only when needed, and longer amortisation, extend runway more reliably per dollar borrowed.",
      },
      {
        question: "What is net burn and how is it different from expenses?",
        answer:
          "Net burn is expenses minus revenue for the month — the amount cash actually falls. A business spending $60,000 and earning $45,000 burns $15,000. Runway calculated on gross expenses ($180,000 / $60,000 = 3 months) understates the position fourfold in that example. Always divide by net burn.",
      },
      {
        question: "Should I take a loan to extend runway or cut costs?",
        answer:
          "Compare what each buys. Cutting $5,000 of monthly burn on $150,000 of cash extends runway from 8.3 to 11.5 months permanently and costs no interest; the example loan buys 3.5 months and adds a fixed obligation. Loans make sense when the time bought will be used to reach a specific, plausible revenue milestone — not to postpone a cost decision.",
      },
    ],
  },

  "ecommerce/shipping-zone-optimizer": {
    quickAnswer:
      "Charging a $5.99 flat shipping rate while your zone mix costs $9.25 a parcel on average loses $3.26 on every order — $2,608 a month on 800 orders. The farthest zone loses $7.51 a parcel. A flat rate only works when it covers your weighted average carrier cost.",
    howItWorks: [
      "Enter your monthly order count, the flat shipping charge, and a free-shipping threshold if you offer one. Then enter the carrier cost per parcel for each zone — local, regional and national — and the share of your orders that falls in the local and regional zones; the national share is the remainder.",
      "The calculator's first output is your weighted average carrier cost: each zone's cost multiplied by its share of orders, added together. With local at $5.50 on 25% of orders, regional at $8.50 on 45% and national at $13.50 on 30%, the average is $9.25 a parcel. The zone mix, not the carrier's headline rate, is what decides your real cost.",
      "The flat-rate net per order is the flat charge minus that weighted average. At $5.99 against a $9.25 average, every order loses $3.26, and the monthly figure is the per-order net multiplied by order volume. A flat rate that looks generous to customers can quietly subsidise shipping out of your product margin. Raising the flat rate to $9.95 flips the defaults to +$0.70 per order, or +$560 a month — a $3.96 change in the charge moves the monthly result by $3,168.",
      "The second output is the far-zone check: the flat charge minus the national cost. A flat rate that breaks even on average can still lose money on every cross-country parcel, and those are the orders that grow when a post goes viral in a region far from your warehouse. Options are a far-zone surcharge, a higher flat rate, or a free-shipping threshold set where order margin absorbs the shipping.",
      "Calculated shipping, where the customer pays the actual carrier cost, nets zero by definition — the tool models it as a zero baseline. It protects margin but can cost conversions at checkout, which is why most stores choose between flat and calculated rather than treating either as obviously right. Recheck the zone mix whenever your customer geography shifts.",
    ],
    formula:
      "Weighted average carrier cost = (local cost x local share) + (regional cost x regional share) + (national cost x national share). Flat-rate net per order = flat charge - weighted average cost. Monthly net = flat-rate net x orders.",
    example: {
      title: "Worked example: a $5.99 flat rate against a $9.25 average cost",
      body: "A store ships 800 parcels a month: 25% local at $5.50, 45% regional at $8.50, 30% national at $13.50. Weighted average cost = $1.38 + $3.83 + $4.05 = $9.25 a parcel. The $5.99 flat rate loses $3.26 per order, or $2,608 a month, and each national parcel loses $7.51. Raising the flat rate to $9.95 flips the result to +$0.70 per order, or +$560 a month. If the national share rises to 50%, the average cost becomes $10.25 and the $5.99 rate loses $4.26 per order — the mix moves the answer more than any single rate does.",
    },
    faqs: [
      {
        question: "What are shipping zones and why do they decide cost?",
        answer:
          "Zones measure distance from the shipping origin, not a fixed geography — Zone 2 from Los Angeles is a different map from Zone 2 from Chicago. Carriers price each weight-and-zone cell separately, so the same 3 lb parcel might cost $5.50 regionally and $13.50 cross-country. Your zone distribution, set by where your customers are relative to your stock, is the lever.",
      },
      {
        question: "When does flat-rate shipping work?",
        answer:
          "When the flat charge covers your weighted average carrier cost with room for mix shifts. That usually means either a genuinely national customer base with a charge set near the average, or a product whose margin absorbs the shipping loss as a marketing cost. A flat rate set below the weighted average is a subsidy, and the monthly figure in the calculator shows exactly how large.",
      },
      {
        question: "What is the free-shipping threshold for?",
        answer:
          "It is the order value above which you absorb shipping entirely, betting that the larger basket's margin covers it. Set it where the average order above the threshold earns enough margin to pay the shipping on that order — typically just above your current average order value, so it pulls baskets up rather than giving free shipping to orders that already qualified.",
      },
      {
        question: "Can I cut zone costs without a second location?",
        answer:
          "Partly: negotiate carrier rates on your heaviest zone cells, use regional carriers for their home zones, compare dimensional-weight pricing (a smaller box can drop a parcel a full price band), and set free-shipping thresholds that reflect your real zone mix. These shave percentages; only inventory placement changes the zone distribution itself.",
      },
    ],
  },

  "ecommerce/subscription-churn-impact-simulator": {
    quickAnswer:
      "For a business with 1,000 subscribers at $49 a month adding 80 a month, cutting churn from 6% to 4% leaves 213 more subscribers after a year and $10,417 more monthly revenue — $60,236 of extra revenue across the year, with no change to acquisition spend.",
    howItWorks: [
      "Enter your subscriber count, average revenue per user, current monthly churn rate, the reduced rate you want to model, new subscribers added each month, and the projection horizon. The simulator projects the subscriber base month by month under both rates and compares the two paths.",
      "Each month the base loses its churn percentage and gains the new subscribers you add: subscribers next month = subscribers x (1 - churn) + new subscribers. Monthly revenue is the base multiplied by average revenue per user, summed across the horizon, so the comparison shows both the end-of-period revenue gap and the cumulative revenue gap. At the defaults — 1,000 subscribers, $49 average revenue, 80 new subscribers a month over 12 months — the 6% path ends at about 1,175 subscribers and the 4% path at about 1,387.",
      "Churn compounds, which is why small differences dominate over time. At 6% monthly churn the average customer stays about 17 months; at 4%, 25 months; at 3%, 33 months. Lifetime value is monthly profit per customer divided by churn, so every point of churn moves lifetime value by double-digit percentages.",
      "Read the 12-month revenue gap, not the first month. One point of churn is worth a few hundred dollars of monthly revenue in month one of the example — noticeable but not dramatic. The gap widens every month because retained customers are retained again the next month, and the cumulative figure is where the real money sits.",
      "Separate voluntary churn (customers who cancel — fix with product and value) from involuntary churn (failed payments — fix with dunning, card updaters and retry logic). Involuntary churn is typically 20 to 40% of the total in subscription businesses and is usually cheaper to reduce than voluntary churn, which makes payment recovery the highest-return churn work for most businesses. Start there: it needs no product change and no price change, only retry logic and expiry emails.",
    ],
    formula:
      "Subscribers next month = subscribers x (1 - churn) + new subscribers. Customer lifetime (months) = 1 / monthly churn rate. LTV = monthly profit per customer / churn rate.",
    example: {
      title: "Worked example: 12 months at 6% versus 4% churn",
      body: "Start: 1,000 subscribers, $49 a month, adding 80 new subscribers a month. At 6% churn the base after 12 months is about 1,175 subscribers and monthly revenue about $57,560. At 4% churn the base reaches about 1,387 and monthly revenue about $67,977. The two points of churn are worth $10,417 a month by month 12 — about $60,236 of cumulative revenue across the year — with no change to acquisition spend. Lifetime value tells the same story from the customer's side: at $49 a month, a customer at 6% churn is worth $49 / 0.06 = $817 over their lifetime, while at 4% churn the same customer is worth $49 / 0.04 = $1,225 — a 50% increase from two points of churn.",
    },
    faqs: [
      {
        question: "What is a good monthly churn rate for subscriptions?",
        answer:
          "Consumer subscription products commonly run 5 to 10% monthly churn; established services with strong fit get below 5%. B2B software runs lower: 3 to 7% annually for enterprise accounts, while 5 to 7% monthly for small-business tools is considered poor but common. Judge your rate against your segment and price point — a $10 entertainment app and a $200 business tool should not share a target.",
      },
      {
        question: "How much of churn is failed payments?",
        answer:
          "Typically 20 to 40%. Cards expire, get replaced or hit limits, and a subscription with no retry process loses those customers silently. Card-account updater services, smart retries spread over days, and pre-expiry emails recover a large share — recovery rates of 30 to 50% of failed payments are achievable, making dunning the highest-return churn work for most businesses.",
      },
      {
        question: "Why does churn matter more than growth at scale?",
        answer:
          "Growth adds a fixed number of customers; churn removes a percentage of a growing base. At 10,000 subscribers and 6% churn you must add 600 customers a month to stand still — four times the acquisition needed at 2,000 subscribers. Businesses that ignore churn eventually spend all their growth budget refilling the bucket.",
      },
      {
        question: "Does lowering price reduce churn enough to pay?",
        answer:
          "Rarely, on its own. A 10% price cut needs churn to fall enough that lifetime value rises by more than 10% — from 5% to under 4.5% — just to keep lifetime value flat, before counting the revenue lost on every remaining customer. Price is a weak churn lever compared with onboarding, usage and payment recovery; test it only after those are working.",
      },
    ],
  },

  "creator/youtube-adsense-estimator": {
    quickAnswer:
      "A finance channel with 250,000 monthly long-form views at a $15 RPM earns about $3,750 a month from ads. The same views in gaming, at a $3 RPM, earn $750 — niche decides income more than view count, and the same views as Shorts would earn about $30.",
    howItWorks: [
      "Enter your monthly views, pick a niche to set a typical RPM or enter your own RPM from YouTube Studio, choose long-form or Shorts, and set how many videos you publish a month. The calculator returns monthly, yearly and daily earnings, plus earnings per video, so you can compare channels, niches and upload schedules.",
      "RPM — revenue per 1,000 views — is what you actually keep after YouTube's share and after views that carried no ad are counted. The calculator's niche presets run from $15 for finance and investing, through $12 for business and marketing and $8 for technology, down to $3 for gaming and $1.50 for music. Your own Studio RPM is always the more accurate number, and it is the figure to enter once you have one.",
      "YouTube pays creators 55% of the ad revenue on long-form videos; YouTube keeps 45%. Shorts are paid differently: revenue is pooled across Shorts and allocated by view share, with creators keeping 45% of their allocated share after music licensing costs. That is why the calculator caps Shorts RPM at $0.12 — Shorts earnings are measured in cents per 1,000 views, not dollars.",
      "Treat the output as a range, not a forecast. Advertiser demand peaks in the fourth quarter and drops in January, and CPMs routinely fall 30 to 50% from December to January across most niches. A single video's topic can pay several times your channel average, and annual planning should use the full-year average RPM, not the holiday peak.",
      "Ad revenue is only part of the picture. Memberships, Supers, affiliate income and sponsorships sit outside this number, and for most mid-size channels ads are 40 to 70% of total income. Ad revenue sharing starts at the full Partner Program threshold: 1,000 subscribers plus either 4,000 valid public watch hours in 12 months or 10 million Shorts views in 90 days. From 1 February 2027, new applicants will need 8,000 watch hours or 20 million Shorts views.",
    ],
    formula:
      "Monthly earnings = (monthly views / 1,000) x RPM. RPM = total revenue / total views x 1,000. Shorts earnings use the same formula with an RPM capped at $0.12 in this calculator.",
    example: {
      title: "Worked example: two channels, same views, different niches",
      body: "Channel A (gaming) gets 1,000,000 views a month at a $3.50 RPM: earnings = 1,000 x $3.50 = $3,500. Channel B (personal finance) gets 250,000 views at a $22 RPM: earnings = 250 x $22 = $5,500. Channel B earns 57% more from a quarter of the views, because finance advertisers pay for viewers with money decisions to make. View counts rank channels; RPM explains their income. At the calculator's finance preset of $15, Channel B would earn $3,750 — still more than Channel A on a quarter of the views.",
    },
    faqs: [
      {
        question: "How much does YouTube pay per 1,000 views?",
        answer:
          "There is no fixed rate. Creators keep 55% of ad revenue on long-form video, and the resulting RPM typically runs from about $1 to $5 for entertainment and gaming, $5 to $15 for tech and education, and $15 to $40 for finance, insurance and B2B topics. Geography matters too: views from the US, UK, Canada and Australia pay several times the rate of views from lower-ad-spend regions.",
      },
      {
        question: "What is the difference between CPM and RPM?",
        answer:
          "CPM is what advertisers pay per 1,000 ad impressions, before YouTube's 45% share. RPM is what the creator receives per 1,000 views, after the share and including views where no ad ran. RPM is always the smaller and more honest number for income planning, and it is the figure YouTube Studio reports.",
      },
      {
        question: "How many views do I need to join the YouTube Partner Program?",
        answer:
          "The standard threshold is 1,000 subscribers plus either 4,000 valid public watch hours in the last 12 months or 10 million Shorts views in 90 days. An earlier tier (500 subscribers, 3,000 watch hours or 3 million Shorts views) unlocks fan funding such as memberships and Supers, but ad revenue starts at the main threshold. From 1 February 2027, applicants will need 8,000 watch hours or 20 million Shorts views.",
      },
      {
        question: "Why did my earnings drop in January?",
        answer:
          "Advertisers spend heavily in the run-up to Christmas and cut budgets in January, so CPMs routinely fall 30 to 50% from December to January across most niches. It is a market pattern, not a penalty on your channel. Annual planning should use the full-year average RPM, not the fourth-quarter peak.",
      },
    ],
  },

  "creator/youtube-cpm-calculator": {
    quickAnswer:
      "A $25 CPM converts to a $13.75 RPM at YouTube's 55% creator share — and at 8,500 views a day that is about $117 a day, or $3,506 a month. Real RPM lands lower, because not every view shows an ad. Use RPM for income decisions; CPM only measures advertiser demand.",
    howItWorks: [
      "The calculator works in two directions: enter a CPM to see the RPM it implies, or enter your RPM from YouTube Studio to see the CPM it implies. Add your daily views and it returns daily, monthly and yearly earnings, plus earnings per 10,000 views — the figure that makes one video's value easy to judge. At the defaults — a $25 CPM and 8,500 views a day — the implied RPM is $13.75, daily earnings about $117, monthly about $3,506 and yearly about $42,659.",
      "The conversion applies YouTube's standard 55% creator share for long-form video: RPM equals CPM multiplied by 0.55. That is an upper bound, not a promise. CPM counts ad impressions; RPM counts views, and a video can carry several ad impressions per view while many viewers see no ad at all.",
      "The gap between 55% of CPM and real RPM is the unmonetized-view effect: YouTube Premium views (paid from a subscription pool instead), ad-blocked views, and views in regions or on content where ads do not run. A monetized-view share of 70 to 85% is typical, so a channel whose CPM implies a $13.75 RPM often banks closer to $10.",
      "The niche chart shows typical advertiser CPMs for US-heavy audiences: finance and investing at $42, business and SaaS at $36, tech reviews at $26, education at $20, health and fitness at $18, gaming at $11, entertainment at $9, vlogs and lifestyle at $8, and music at $7. Viewer country moves these figures more than channel size does.",
      "For Shorts, neither figure maps directly: Shorts revenue comes from a pooled model with a 45% creator share allocated by view share, and is best tracked as its own RPM in Studio. Videos over 8 minutes can carry mid-roll ads, which raise ad impressions per view — one of the few levers a creator has on the CPM side of the equation.",
    ],
    formula:
      "RPM (upper bound) = CPM x 55%. Implied CPM = RPM / 55%. Estimated earnings = views / 1,000 x RPM. Actual RPM = revenue / views x 1,000, measured in YouTube Studio.",
    example: {
      title: "Worked example: $24 CPM channel, 800,000 views",
      body: "Upper-bound RPM: $24 x 55% = $13.20, implying earnings of 800 x $13.20 = $10,560. The channel's Studio shows actual revenue of $8,000, so actual RPM is $8,000 / 800 = $10.00. The $3.20 gap is the unmonetized-view effect: roughly a quarter of views carried no paid ad. Planning a hire against the $10,560 figure would overcommit by $2,560 a month. The same channel posting a video that reaches 10,000 views earns $137.50 at the upper-bound RPM and $100 at the actual RPM — the per-video figure the calculator reports, and the one that makes a single video's value easy to judge. The finance niche in the calculator's chart, at a $42 CPM, implies a $23.10 RPM — and a music channel at a $7 CPM implies just $3.85.",
    },
    faqs: [
      {
        question: "What CPM do advertisers pay on YouTube?",
        answer:
          "Broadly $5 to $15 for general entertainment audiences in English-speaking markets, $15 to $30 for tech, education and business, and $30 to $50 or more for finance, insurance, legal and high-value B2B topics. CPMs are auction prices: they rise in the fourth quarter, fall in January, and vary by viewer country more than by channel size.",
      },
      {
        question: "Why is my RPM less than 55% of my CPM?",
        answer:
          "Because the denominators differ. CPM divides ad revenue by ad impressions; RPM divides your revenue by all views, including views with no ad — YouTube Premium views (paid from a subscription pool instead), ad-blocked views, and views in regions or on content where ads do not run. A monetized-view share of 70 to 85% is typical.",
      },
      {
        question: "Does a higher CPM mean a better channel?",
        answer:
          "It means a more valuable audience to advertisers, not a bigger income. Income is views multiplied by RPM, and a low-CPM channel with ten times the views out-earns a high-CPM niche channel. CPM matters when choosing topics at the margin — among video ideas with similar view potential, pick the one advertisers pay more for.",
      },
      {
        question: "How do I raise my RPM?",
        answer:
          "Shift topic mix toward advertiser-valued subjects, lengthen videos past 8 minutes to allow mid-roll ads, and build audience share in high-CPM countries. Also check for limited-ad flags on individual videos — a video marked as showing limited or no ads earns near zero regardless of its CPM niche.",
      },
    ],
  },

  "creator/tiktok-creator-fund-calculator": {
    quickAnswer:
      "Under TikTok's Creator Rewards Program, 1 million views with 70% qualifying at $0.70 per 1,000 qualified views pays about $490. The same views under the old Creator Fund paid $30. Only original videos longer than one minute earn, and TikTok publishes no fixed rate.",
    howItWorks: [
      "Enter your total views in the period, the share of those views you expect to qualify, an RPM in the typical range, and the number of videos. The calculator returns your qualified views, estimated Creator Rewards earnings, what the same views would have paid under the old Creator Fund, and earnings per video. At the defaults — 1 million views, 70% qualifying, a $0.70 RPM and 20 videos — the month pays $490, or $24.50 per video.",
      "The old Creator Fund, which paid roughly $0.02 to $0.04 per 1,000 views, closed in December 2023. Its replacement, the Creator Rewards Program (launched as the Creativity Program in 2023 and renamed in March 2024), pays materially higher rates — creators commonly report $0.40 to $1.00 per 1,000 qualified views — but TikTok publishes no fixed rate, so every estimate here is built on creator-reported figures.",
      "Eligibility is strict: you must be 18 or older, have at least 10,000 followers and 100,000 video views in the last 30 days, hold a personal account in good standing, and be based in one of eight countries — the United States, United Kingdom, Germany, France, Japan, South Korea, Brazil or Mexico. Canada, Spain and Italy are not included.",
      "Not every view is a qualified view. A qualified view is a unique For You feed view lasting at least 5 seconds, or a search view lasting at least 30 seconds, on an original video longer than one minute — not a duet, stitch, reupload or photo post — and a video earns nothing until it passes 1,000 qualified For You views. Only videos posted after you join the program can earn.",
      "Rewards are paid once the balance passes $50, on the 15th of the month. Compare the result with what the same content earns elsewhere: a one-minute-plus video that earns Rewards revenue can also be posted to YouTube, where long-form RPM logic applies. The two programmes reward different formats, and many creators run both from one production process.",
    ],
    formula:
      "Creator Rewards earnings = (qualified views / 1,000) x RPM. Qualified views = total views x qualified share. Old Creator Fund comparison = (total views / 1,000) x $0.03.",
    example: {
      title: "Worked example: 1 million views at a $0.70 RPM",
      body: "A creator's videos collect 1,000,000 views in a month, of which 70% qualify: 700,000 qualified views. At $0.70 per 1,000 qualified views, earnings = 700 x $0.70 = $490, or $24.50 per video across 20 videos. Under the old Creator Fund at $0.03 per 1,000, the same views paid $30 — the Rewards Program pays about 16 times more. The range matters: at a $0.40 RPM the month pays $280, and at $1.00 it pays $700, so the rate assumption moves the answer more than the view count. Raising the qualified share from 70% to 85% at the same RPM would pay $595 instead of $490, which is why longer videos with strong watch time matter more than raw view counts.",
    },
    faqs: [
      {
        question: "How much does TikTok pay per 1,000 views now?",
        answer:
          "Under Creator Rewards, creators commonly report $0.40 to $1.00 per 1,000 qualified views, depending on video length, watch time, search value and region. The program does not publish a fixed rate. Anyone quoting the old $0.02 to $0.04 figure is describing the Creator Fund, which ended in December 2023.",
      },
      {
        question: "What makes a view 'qualified'?",
        answer:
          "The view must be on an eligible video: over one minute long, original content filmed and produced by the creator, not a duet, stitch, reupload or photo post, and watched genuinely — a For You feed view of at least 5 seconds, or a search view of at least 30 seconds. The video must also pass 1,000 qualified For You views before it starts earning at all.",
      },
      {
        question: "Why do two videos with the same views earn different amounts?",
        answer:
          "Rewards weight more than raw views: average watch time, completion, whether the video is found through search, and audience region all feed the rate. A 3-minute video watched to the end can earn several times more per view than a 61-second video people skip. Total earnings per video reflect quality signals as well as reach.",
      },
      {
        question: "Is TikTok or YouTube better paid for long videos?",
        answer:
          "For videos over a minute, YouTube's long-form RPM in most niches exceeds TikTok Rewards at comparable views, and YouTube income is more predictable. TikTok's advantage is discovery speed. Most full-time creators treat TikTok as the growth engine and YouTube as the income engine, publishing to both.",
      },
    ],
  },

  "creator/instagram-money-calculator": {
    quickAnswer:
      "A 100,000-follower fitness account at 3% engagement prices a sponsored post at about $2,400 — $24 per 1,000 followers — with reels at $2,760 and stories at $840. Brands pay for buying intent, not follower counts, so niche and engagement move the rate more than size.",
    howItWorks: [
      "Enter your followers, average engagement rate, niche, and how many sponsored posts, reels and stories you expect to sell in a month. The calculator builds a per-format rate from reach and engagement rather than followers alone, then totals the month.",
      "The baseline model multiplies followers by a per-1,000-follower rate set by niche: finance and investing at $38, business and marketing at $32, beauty at $26, fitness and health at $24, tech and gadgets at $24, travel at $21, fashion at $20, food at $19, comedy and entertainment at $12, and gaming at $10. Finance audiences command more because the products sold to them carry more margin. At the calculator's defaults — 85,000 followers, 3.2% engagement, beauty niche — the post rate is $2,357, the reel $2,711 and the story $825, for a $33,946 month across four posts, six reels and ten stories.",
      "Engagement adjusts the baseline. The factor is your engagement rate divided by 3, clamped between 0.4 and 2: 3% engagement leaves the rate unchanged, 6% doubles it, and 1.2% cuts it to 0.4 times. Weak engagement moves the price down regardless of follower count, because reach is what the brand is buying.",
      "Formats price differently. A reel costs 1.15 times a feed post in this calculator, reflecting reels' reach advantage; a story costs 0.35 times a post, and stories are usually sold in sequences. Bundling formats into a package raises the total while giving the brand a discount per piece — the structure most mid-size creators actually sell.",
      "These are negotiation ranges built on industry norms, not guarantees — Instagram publishes no rate card. Usage rights and exclusivity are priced separately from the post itself, and cross-check your rate against reach: brands buying on CPM typically pay $10 to $30 per 1,000 accounts reached, so a rate your reach cannot justify will not survive the first renewal.",
    ],
    formula:
      "Post rate = (followers / 1,000) x niche rate per 1,000 x engagement factor, where the factor is engagement / 3, clamped between 0.4 and 2. Reel rate = post rate x 1.15; story rate = post rate x 0.35.",
    example: {
      title: "Worked example: 100,000 followers, 3% engagement, fitness niche",
      body: "Baseline: 100 x $24 per 1,000 followers = $2,400 per post. Engagement at 3% gives a factor of exactly 1.0, so no adjustment. A reel prices at $2,400 x 1.15 = $2,760 and a story at $2,400 x 0.35 = $840. A typical monthly package — two posts, two reels and six stories — totals $4,800 + $5,520 + $5,040 = $15,360, usually offered at a round $14,000 to $15,000 as a bundle. The same account at 6% engagement would price the post at $4,800, because the engagement factor doubles. The same account in finance, at $38 per 1,000 followers, would price the post at $3,800 and the package at $24,320 — niche alone moves the month by nearly $9,000.",
    },
    faqs: [
      {
        question: "How much should I charge for a sponsored post?",
        answer:
          "Start from $10 per 1,000 followers for a feed post at average engagement — the rough industry baseline — then adjust: add for engagement above 3%, a high-value niche (finance, B2B, tech), usage rights or exclusivity; accept less for a long-term ambassador deal with guaranteed volume. Cross-check against your reach: brands buying on CPM typically pay $10 to $30 per 1,000 accounts reached.",
      },
      {
        question: "How many followers do you need to make money on Instagram?",
        answer:
          "Brand deals in the nano and micro tiers (1,000 to 50,000 followers) are routine in focused niches — a 5,000-follower account reviewing local restaurants or specific software can charge $50 to $250 per post. Affiliate income and digital products can start at any size. What sponsors buy is an audience that acts, which a small engaged niche provides better than a large passive one.",
      },
      {
        question: "What are usage rights and why do they cost extra?",
        answer:
          "Usage rights let the brand reuse your content in its own ads. They are priced separately from the post itself — commonly 30 to 100% of the base rate per period of use, with paid-ad (whitelisting) rights at the top of the range. Granting unlimited usage in perpetuity for free is the most common way creators undercharge; always time-limit rights in writing.",
      },
      {
        question: "Do reels pay more than posts?",
        answer:
          "Usually, yes, where reels deliver more reach — brands follow the views. This calculator prices reels at 1.15 times a feed post, and rates of 1.2 to 1.5 times a static post are common for reels from accounts whose reels outperform. If your reels underperform your posts, price to your own data: sponsors renew on reported reach, so rates anchored to your insights screenshots are the ones that hold.",
      },
    ],
  },

  "creator/instagram-engagement-rate-calculator": {
    quickAnswer:
      "A post with 1,150 likes and 86 comments on a 42,000-follower account has a core engagement rate of 2.94% — about average for a micro account, whose tier benchmark is 3.5%. Adding shares and saves lifts it to 3.78%. Engagement rate, not follower count, is the number brands use to compare accounts.",
    howItWorks: [
      "Enter followers and the likes, comments, shares and saves on a post — or average them across your last 10 to 20 posts for a stable figure — plus the post's reach. The calculator returns three rates: the core rate (likes plus comments, per follower), the full rate (adding shares and saves), and the reach-based rate, plus a grade against your account tier. At the defaults — 42,000 followers, 1,150 likes, 86 comments, 140 shares, 210 saves and 18,000 reach — the core rate is 2.94%, the full rate 3.78% and the reach-based rate 8.81%.",
      "There are two conventions and they answer different questions. Engagement by followers (used here) measures how active your audience is relative to its size, and it is the public comparison metric brands use to screen accounts. Engagement by reach divides by accounts that actually saw the post and runs several points higher — use it to judge content, use the follower version to judge the account.",
      "Benchmarks fall as accounts grow, so the calculator grades you against your own tier: nano accounts (up to 10,000 followers) average 4.8%, micro (10,000 to 100,000) 3.5%, mid (100,000 to 500,000) 2.4%, macro (500,000 to 1 million) 1.9%, and mega (over 1 million) 1.5%. A rate at 1.5 times your tier average grades Exceptional; at 0.8 times, Average; below 0.45 times, Low.",
      "Shares and saves are interactions, and for distribution they are stronger signals than likes. The classic public formula uses likes plus comments because those are visible on other people's accounts. For your own account, include saves and shares from your insights: a post with modest likes but heavy saves is performing better than the public formula shows.",
      "Benchmarks vary by study and method — brand-account studies report much lower averages than creator studies — so treat the tier figures as a guide, not a verdict. Judge a rate against accounts of your size in your niche, and against your own trend over time, before concluding anything from a single post.",
    ],
    formula:
      "Core engagement rate = (likes + comments) / followers x 100. Full engagement rate = (likes + comments + shares + saves) / followers x 100. Reach-based rate = full interactions / reach x 100.",
    example: {
      title: "Worked example: comparing two accounts for a brand deal",
      body: "Account A: 200,000 followers, posts average 3,000 likes and 150 comments. Rate = 3,150 / 200,000 = 1.58% — below the 2.4% mid-tier average. Account B: 60,000 followers, posts average 2,400 likes and 300 comments. Rate = 2,700 / 60,000 = 4.5% — above the 3.5% micro-tier average. Account B delivers nearly the same interactions per post with under a third of the audience, so a brand paying A a follower-based premium is buying reach A does not actually produce. B can justify rates close to A's with this arithmetic. B is above average, not exceptional: the Exceptional bar for its tier is 1.5 times the 3.5% micro average, or 5.25%.",
    },
    faqs: [
      {
        question: "What is a good engagement rate on Instagram?",
        answer:
          "As rough bands: above 3% is strong for most account sizes, 1 to 3% is typical, and below 1% signals a passive, purchased or mismatched audience. Smaller accounts naturally run higher — a 4% rate at 5,000 followers and a 2% rate at 500,000 are both healthy for their tier. Compare within your size band and niche before concluding anything.",
      },
      {
        question: "Should engagement be calculated on followers or reach?",
        answer:
          "Both, for different decisions. Followers-based rate is the public comparison metric brands use to screen accounts. Reach-based rate (interactions divided by accounts reached) strips out the algorithm's distribution and tells you how the content itself performed; it commonly runs 5 to 15% on feed posts. Reporting a reach-based figure as if it were follower-based inflates comparisons and sponsors notice.",
      },
      {
        question: "Do shares and saves count as engagement?",
        answer:
          "Yes — they are interactions, and for distribution they are stronger signals than likes. The classic public formula uses likes plus comments because those are visible on other people's accounts. For your own account, include saves and shares from your insights: a post with modest likes but heavy saves is performing better than the public formula shows.",
      },
      {
        question: "How can I raise my engagement rate?",
        answer:
          "The rate rises when interactions grow faster than followers: prompts that ask a specific question, content worth saving (checklists, tutorials, price breakdowns), replying to comments early while the post is being distributed, and removing inactive or bot followers who dilute the denominator. Buying followers does the opposite — it lowers the rate and is visible in exactly this calculation.",
      },
    ],
  },

  "creator/twitch-earnings-calculator": {
    quickAnswer:
      "320 Tier 1, 45 Tier 2 and 12 Tier 3 subscribers are worth about $1,173 a month at the standard 50% share, and 25,000 Bits add $250 — Bits always pay exactly one cent each. With $180 of ads and $120 of donations, the month totals $1,723 before tax.",
    howItWorks: [
      "Enter your subscriber counts by tier, your revenue share percentage, monthly Bits, and any ad or donation income you want included. The calculator applies the share to subscription revenue, pays Bits at their fixed rate, and totals the month with a breakdown by source.",
      "Subscriptions use the tool's tier prices: Tier 1 at $4.99, Tier 2 at $9.99 and Tier 3 at $24.99. Most Affiliates and Partners receive 50% of net subscription revenue. The Plus Program raises the share: 60% for channels holding 100 Plus Points a month for three consecutive months, and 70% at 300 Plus Points — one point per Tier 1 recurring sub, two per Tier 2, six per Tier 3. At the defaults — 320 Tier 1, 45 Tier 2 and 12 Tier 3 subscribers — gross subscription revenue is $2,346.23 a month, so the share slider alone moves sub income from $1,173 at 50% to $1,642 at 70%.",
      "Bits are fixed: viewers buy them at a markup, but the streamer always receives $0.01 per Bit cheered, whatever the revenue share. Cheers of 25,000 Bits in a month are $250, with no share calculation involved. Channel-point redemptions and hype-train bonuses do not pay cash.",
      "Ads pay by impressions and region and vary widely, so the calculator treats them as an input rather than a rate. Twitch pays 55% of net ad revenue to streamers running at least 3 minutes of ads per hour. The split applies to net revenue — after taxes and payment fees — and local sub prices vary by country, so the calculator's figure is an estimate, not a payout promise.",
      "Affiliate status, which unlocks subscriptions, Bits and ads, needs 50 followers, 8 hours streamed across 7 different days, and an average of 3 concurrent viewers over a rolling 30-day window. Twitch pays monthly on a net-15 schedule once the balance passes the $50 payout threshold ($100 for wire transfer); earnings below the threshold roll forward.",
    ],
    formula:
      "Monthly earnings = (subs by tier x tier price x revenue share) + (Bits x $0.01) + ad revenue + donations. Sub income uses Tier 1 $4.99, Tier 2 $9.99 and Tier 3 $24.99. Bits always pay $0.01 each, whatever your share.",
    example: {
      title: "Worked example: a mid-size Affiliate's month",
      body: "Subscribers: 320 Tier 1, 45 Tier 2, 12 Tier 3. Subscription revenue at 50% share: (320 x $4.99 + 45 x $9.99 + 12 x $24.99) x 50% = ($1,596.80 + $449.55 + $299.88) x 50% = $2,346.23 x 50% = $1,173.12. Bits: 25,000 Bits = $250. Ads: $180. Donations: $120. Total for the month: $1,723.12 before tax. The same subscriber counts at a 70% Plus Program share would pay $1,642.36 from subs and $2,192.36 in total — $469.24 more a month for the same audience. Gifted subs pay the same share as regular subs, and a Prime sub pays a fixed $2.25 in the US rather than a share of the tier price.",
    },
    faqs: [
      {
        question: "How much does a Twitch streamer get per sub?",
        answer:
          "At the standard 50% share: about $2.50 per Tier 1 sub ($4.99), $5.00 per Tier 2 ($9.99) and $12.50 per Tier 3 ($24.99). Twitch raised the US Tier 1 price to $5.99 in July 2024, so a US Tier 1 sub pays about $3.00 at 50% and $4.19 at 70% — before taxes and fees, since the split applies to net revenue. Prime subs pay $2.25 in the US.",
      },
      {
        question: "How many viewers do you need to make $1,000 a month on Twitch?",
        answer:
          "Income tracks subscribers and regulars more than raw viewers. Roughly 400 Tier 1 subscribers at the standard 50% share reach $1,000 from subs alone, and most channels convert 2 to 5% of their regular audience into subs. In viewer terms that usually means averaging 75 to 150 concurrent viewers with an engaged community — though a small, generous audience can out-earn a large passive one.",
      },
      {
        question: "How do you become a Twitch Affiliate and start earning?",
        answer:
          "Reach 50 followers, stream at least 8 hours across 7 different days, and average 3 concurrent viewers over a rolling 30-day window. Affiliate unlocks subscriptions, Bits and ads. Partner status (around 75 average concurrent viewers and consistent schedule metrics) adds more emote slots and access to the same Plus Program shares Affiliates can now reach.",
      },
      {
        question: "When and how does Twitch pay out?",
        answer:
          "Monthly, on a net-15 schedule — about 15 days after month-end — once your balance passes the $50 payout threshold ($100 for wire transfer) for most payment methods. Earnings below the threshold roll forward. Payouts are reported gross: streamers are self-employed for tax purposes and should set aside income tax and, in the US, self-employment tax on the total.",
      },
    ],
  },

  "creator/patreon-tier-optimization": {
    quickAnswer:
      "350 patrons paying an average of $8 a month generate $2,800 gross. On the legacy 8% Pro plan, after platform fees, payment processing and a 1% payout fee, the creator keeps $2,365.90 — about 84.5%. Small pledges lose the most to the fixed $0.30 processing charge.",
    howItWorks: [
      "Enter your patron count and average pledge, your platform plan's fee percentage, the per-transaction processing fee, and your payout fee percentage. The calculator applies the platform fee, then payment processing per pledge, then the payout fee, and returns your net monthly income and effective take rate. At the defaults — 350 patrons at an $8 average pledge on the 8% plan — gross is $2,800, fees total $434.10 and net is $2,365.90.",
      "Patreon's platform fee depends on when the page was published. Pages published after 4 August 2025 pay a flat 10% standard fee. Pages published on or before that date keep legacy pricing — 5% (Lite), 8% (Pro) or 12% (Premium) — for as long as the page stays continuously published; unpublishing and republishing moves the page to the 10% plan.",
      "Payment processing is separate: 2.9% plus $0.30 per successful pledge for standard card processing in US dollars. The fixed $0.30 is what punishes small pledges — it takes 10% of a $3 pledge by itself. On legacy plans, pledges of $3 or less use a micropayment rate of 5% plus $0.10 instead, which softens the damage.",
      "The payout fee comes last and depends on method: US direct deposit costs a flat $0.25 per payout, while PayPal costs 1% (minimum $0.25, capped at $20). The calculator models the payout fee as a percentage of the after-fee balance. A 2.5% currency-conversion fee applies when a patron pays in a different currency from your payout currency.",
      "Memberships bought inside the Patreon iOS app run through Apple's in-app purchase system, which takes 30% in the first year and 15% after a year of continuous billing — the calculator models web and Android pledges, so a large iOS share lowers net income further. Annual memberships reduce processing costs by charging once a year, and the income is self-employment income for tax purposes.",
    ],
    formula:
      "Net = gross - platform fee - processing - payout fee, where processing = gross x 2.9% + patrons x $0.30 and the payout fee is a percentage of the after-fee balance. Gross = patrons x average pledge.",
    example: {
      title: "Worked example: 350 patrons at an average $8 pledge, 8% plan",
      body: "Gross: 350 x $8 = $2,800. Platform fee at 8%: $224. Processing per pledge: 2.9% of $8 = $0.232 plus $0.30 = $0.532; across 350 pledges = $186.20. After fees: $2,800 - $224 - $186.20 = $2,389.80. Payout fee at 1%: $23.90. Net: $2,365.90, an effective take rate of 84.5%. On the standard 10% plan for new pages, the same 350 patrons would net $2,310.46 — $55.44 less a month — because the platform fee rises from $224 to $280. The same page with 350 patrons on a $3 tier would gross $1,050 and keep only about $822 (78.3%) at the standard processing rate — or about $870 with the legacy micropayment rate — because the fixed fee takes a far larger share of each small pledge.",
    },
    faqs: [
      {
        question: "How much does Patreon take from creators?",
        answer:
          "A platform fee of 5%, 8% or 12% on legacy plans or a flat 10% for pages published after 4 August 2025, plus payment processing of roughly 2.9% + $0.30 per pledge, plus a payout fee when you withdraw ($0.25 for US direct deposit, or 1% via PayPal, capped at $20). All-in, most creators keep 80 to 88% of gross pledges; the share falls as average pledge size falls.",
      },
      {
        question: "What is the best price for a Patreon tier?",
        answer:
          "The tiers that perform are anchored at $5, $10 and $25 for most niches: $5 as the accessible support tier (below $5, fixed processing fees eat a disproportionate share), $10 for the core benefits tier, and $25 for superfans with limited extras. Pages with more than five or six tiers usually fragment patrons and add fulfilment work without adding income.",
      },
      {
        question: "How many patrons do I need to earn $1,000 a month?",
        answer:
          "At a net take of about 84.5%, you need roughly $1,183 of gross pledges: 148 patrons at $8, 237 at $5, or 118 at $10. Mixed pages average out — the worked example's page earns $2,365.90 from 350 patrons at an $8 average. Audience conversion of 1 to 5% of engaged followers to patrons is the realistic planning range.",
      },
      {
        question: "Patreon or Substack or YouTube memberships?",
        answer:
          "Compare the fee stack and the format. Patreon keeps roughly 80 to 88% and suits mixed media and community benefits. Substack takes 10% plus processing and suits writing. YouTube channel memberships give YouTube a 30% share but sit where the audience already is. The deciding factor is usually where your audience will actually pay, not the few points of fee difference.",
      },
    ],
  },

  "creator/sponsorship-pricing-calculator": {
    quickAnswer:
      "A video averaging 80,000 views in finance, priced at a $50 CPM, gives a $4,000 base rate. Engagement of 4.5% lifts it to $4,480, and 30% for usage rights brings the package to $5,824 — with a negotiating range of $4,659 to $7,571. Usage rights and exclusivity move the final price more than the base rate.",
    howItWorks: [
      "Enter your average views per video or post, your engagement rate, your niche, the number of deliverables, and the percentages you want for usage rights and exclusivity. The calculator converts reach into a base rate, adjusts it for engagement, layers the commercial terms, and returns a total plus a negotiating range from 80% to 130% of that total.",
      "The base rate prices one thing: the audience delivered by the content itself. It is average views divided by 1,000, multiplied by a niche CPM. The calculator's CPMs run from $50 for finance and B2B, through $40 for business and marketing and $35 for technology, down to $22 for lifestyle and vlogs, $20 for gaming and $18 for entertainment.",
      "The engagement adjustment rewards audiences that act: the factor is 1 + (engagement - 3) x 0.08, floored at 0.6. At 4.5% engagement the factor is 1.12; at 8% it is 1.40; at 1% it is 0.84. Two channels with identical views can price 40% apart on engagement alone, which is why sponsors ask for insights screenshots before they agree a rate.",
      "Everything the brand gets beyond the content itself is a separate line. Usage rights — the brand running your content as its ad — commonly add 30 to 50% for 30 days of paid use and 50 to 100% for 90 days. Category exclusivity, where you refuse competitor deals for a period, adds roughly 25 to 50% per month of lockout. A dedicated video costs more than a 60-second integration because it carries the whole video's performance risk.",
      "Deliverables multiply the per-deliverable price, and the range gives you room to negotiate: open near the top, settle near the middle. A series discount of 10 to 20% for three or more committed deliverables is standard and usually worth it, but do not discount the usage and exclusivity lines at the same rate — those are costs you bear per campaign regardless of volume.",
    ],
    formula:
      "Base rate = (average views / 1,000) x niche CPM. Adjusted rate = base x (1 + (engagement - 3) x 0.08). Final price = adjusted x (1 + usage %) x (1 + exclusivity %) x deliverables.",
    example: {
      title: "Worked example: tech channel, 250,000 average views",
      body: "Base: 250 x $35 CPM = $8,750 for a 60 to 90 second integration. Engagement of 5% gives a factor of 1.16, so the adjusted rate is $10,150. The brand wants 90 days of paid usage rights: +50% = $15,225. Category exclusivity for 60 days: +40% = $21,315 per deliverable. Two deliverables bring the package to $42,630. The integration itself is barely a fifth of the invoice — creators who quote the base rate alone leave the rest uncharged, and brands negotiate against line items they can see.",
    },
    faqs: [
      {
        question: "What CPM should I use to price sponsorships?",
        answer:
          "The calculator's niche CPMs run from $18 for entertainment and $20 for gaming, through $25 to $35 for beauty, health, education and technology, to $40 for business and marketing and $50 for finance and B2B. Podcast sponsorships run $15 to $25 per 1,000 downloads at mid-roll. Price from your average views over recent comparable content, not your best video.",
      },
      {
        question: "How much extra are usage rights worth?",
        answer:
          "A practical scale: organic reposting rights included or cheap; paid usage for 30 days adds about 30 to 50% of the base rate; 90 days, 50 to 100%; a year or perpetual rights should be a multiple of the base rate, and perpetual buyouts are rarely in the creator's interest. Always specify the channels the usage covers (their socials, their paid ads, their website) in the agreement.",
      },
      {
        question: "Should I offer discounts for multiple videos?",
        answer:
          "A series discount of 10 to 20% for three or more committed deliverables is standard and usually worth it: it removes your selling time for the next slots and gives the brand performance data to renew. Do not discount the usage and exclusivity lines at the same rate — those are costs you bear per campaign regardless of volume.",
      },
      {
        question: "How do I price when my channel is small?",
        answer:
          "Price the audience quality, not the size: a 20,000-view average in a narrow B2B niche at a $40 CPM is an $800 integration, and brands in that niche often cannot buy the same audience anywhere else. Offer a first-campaign rate with a review clause rather than a permanently low rate, and document results so the renewal is priced on evidence.",
      },
    ],
  },

  "creator/course-launch-revenue-calculator": {
    quickAnswer:
      "An email list of 8,000 converting at 2.5% produces 200 buyers; at $299 that is $59,800 gross, and $52,265 after a 5% refund rate, 5% platform fees and payment processing. List size and conversion rate matter equally — doubling either one doubles the launch.",
    howItWorks: [
      "Enter your audience size (email list is the reliable input; social followers convert at a fraction of email rates), expected conversion rate, course price, refund rate, platform fee percentage and the share of kept sales going to affiliates. The calculator returns buyers, gross revenue, each deduction, and net revenue — plus net revenue per subscriber and per buyer.",
      "Deductions apply in order. Refunds come off gross first, because refunded sales never reach you. Platform fees, payment processing and affiliate commissions then apply to kept sales only. Processing is 2.9% of kept sales plus $0.30 per kept buyer, which is why a launch with many low-priced buyers pays proportionally more in processing than one with fewer high-priced buyers. At the defaults — 8,000 subscribers, 2.5% conversion, a $299 price and a 5% refund rate — kept sales are $56,810 of the $59,800 gross.",
      "Conversion benchmarks: a warm email list typically converts at 1 to 3% for a mid-priced course during a launch window; cold traffic converts well under 1%. Webinar launches convert attendees at higher rates (10 to 25% of live attendees is common) but attendees are a small subset of the list. If you have run a launch before, your own last conversion rate beats any benchmark — enter it.",
      "Payment plans change the timing, not the total: a 3-payment plan usually raises conversion but spreads cash across months and adds failed-payment losses. Offering instalments commonly lifts conversion by 20 to 40% for courses above about $200, while 5 to 15% of instalment payments typically fail or default before completion. Model the plan by lowering net revenue slightly rather than counting full price on day one.",
      "The affiliates view matters for larger launches: partners commonly take 30 to 50% of the sale price. Revenue through affiliates is still profitable when the course margin is high, but the calculator separates affiliate commissions so the fee cost is visible. On a $50,000-plus launch, the affiliate line is often larger than refunds and processing combined.",
    ],
    formula:
      "Buyers = audience x conversion rate. Gross revenue = buyers x price. Net revenue = (gross - refunds) - platform fees - processing - affiliate commissions, where processing = 2.9% of kept sales + $0.30 per kept buyer.",
    example: {
      title: "Worked example: 8,000-subscriber list, $299 course",
      body: "At a 2.5% conversion rate, buyers = 8,000 x 2.5% = 200. Gross revenue = 200 x $299 = $59,800. Refunds at 5% remove $2,990, leaving kept sales of $56,810. Platform fees at 5% remove $2,840.50. Processing is 2.9% of $56,810 ($1,647.49) plus $0.30 for each of the 190 kept buyers ($57), totalling $1,704.49. Net launch revenue = $52,265.01 — $6.53 per subscriber and $261.33 per buyer. If affiliates drove sales worth 10% of kept revenue, subtract a further $5,681 and the launch nets $46,584. Raising conversion to 3.5% would produce 280 buyers and $73,171 of net revenue — a 40% increase from one point of conversion, which is why list quality beats list size.",
    },
    faqs: [
      {
        question: "What conversion rate should I expect from a course launch?",
        answer:
          "For an email list and a course priced $100 to $500, 1 to 3% of the list buying at launch is a realistic planning range; creators with practised sequences reach 3 to 5%. Webinar launches convert attendees at higher rates (10 to 25% of live attendees is common) but attendees are a small subset of the list. Never plan a first launch above 2% without evidence from your own audience.",
      },
      {
        question: "What refund rate is normal for online courses?",
        answer:
          "Around 5% is a workable planning figure for courses sold with a money-back guarantee; high-ticket courses sold with aggressive marketing can see 10 to 15%. Refund rates fall when the first module delivers a quick result and when the guarantee conditions are clear. Every point of refunds on a $100,000 launch is $1,000 — worth modelling, not ignoring.",
      },
      {
        question: "How big an audience do I need for a $10,000 launch?",
        answer:
          "At a 2% conversion rate: $10,000 needs 50 buyers at $200, which means a list of 2,500; at $500 per course, 20 buyers from a list of 1,000. At a 1% conversion rate, double those list sizes. This arithmetic is why creators grow the list before building the course — the audience size decides the launch more than the content does.",
      },
      {
        question: "Do payment plans increase total revenue?",
        answer:
          "Usually, for courses above about $200: offering instalments commonly lifts conversion by 20 to 40%. Offsetting that, 5 to 15% of instalment payments typically fail or default before completion. Net effect is positive for most sellers, but cash arrives over months — do not spend launch-week projections that depend on month-three instalments.",
      },
    ],
  },

  "creator/affiliate-link-roi-calculator": {
    quickAnswer:
      "12,000 clicks converting at 3% on a $45 commission produce 360 sales and $16,200 of affiliate income — an EPC (earnings per click) of $1.35. Against $800 of spend, profit is $15,400 and cost per sale is $2.22. EPC is the number that lets you compare programmes.",
    howItWorks: [
      "Enter clicks (or traffic and click-through rate), conversion rate, average commission per sale, and what you spent to get the traffic. The calculator returns sales, total earnings, profit after spend, EPC (earnings per click), return on spend, and cost per sale. At the defaults — 12,000 clicks, a 3% conversion rate, a $45 commission and $800 of spend — the month produces 360 sales, $16,200 of revenue and $15,400 of profit.",
      "EPC compresses commission rate, product price and conversion rate into one number: earnings divided by clicks, which equals commission multiplied by conversion rate. If you are evaluating paid traffic, compare EPC against your cost per click — a programme with a $1.35 EPC supports ad clicks up to roughly that figure before margin. If you are evaluating content, compare EPC between programmes on the same page.",
      "Commission structure matters as much as the headline percentage. A 40% commission on a $30 product ($12) converts worse but pays less per sale than a 10% commission on a $300 product ($30); the calculator works in dollars per sale so the comparison is honest. Percentage commissions cannot be compared across price points.",
      "Cookie duration is the hidden variable. Amazon Associates pays on purchases made within 24 hours of the click (or within 89 days for items added to the cart during that visit), while specialist programmes commonly allow 30 to 90 days. A programme that credits sales within 24 hours earns materially less than one with a 30 to 90 day window at the same rate, because considered purchases take days.",
      "Amazon's fixed commission rates run from 0% to 10% by category: Luxury Beauty pays 10%, physical books, kitchen and automotive 4.5%, home, toys and furniture 3%, and grocery and health and personal care 1%. Amazon converts unusually well on warm traffic but pays low percentages, which is why its EPC often trails specialist programmes despite the conversion advantage.",
    ],
    formula:
      "Sales = clicks x conversion rate. Earnings = sales x average commission. EPC = earnings / clicks = commission x conversion rate. Profit = earnings - spend; ROI = profit / spend x 100.",
    example: {
      title: "Worked example: two programmes on the same review page",
      body: "Programme A pays 8% on a $250 product = $20 per sale, converting at 4%: EPC = $20 x 4% = $0.80. Programme B pays 30% on a $60 product = $18 per sale, converting at 6%: EPC = $18 x 6% = $1.08. On 10,000 clicks, A earns $8,000 and B earns $10,800. The lower commission percentage wins because conversion and basket size beat the headline rate — the standard outcome when programmes are compared on EPC instead of percentage. If the page cost $800 to promote, B's profit is $10,000 against A's $7,200. The break-even cost per click for Programme B is its $1.08 EPC: paying $1.00 a click for 10,000 clicks would cost $10,000 and return $10,800, a thin $800 profit before tracking loss.",
    },
    faqs: [
      {
        question: "What is EPC and why does it matter?",
        answer:
          "Earnings per click: total commission divided by total clicks. It compresses commission rate, product price and conversion rate into the single number that decides which programme to promote and whether paid traffic can work. Programmes and networks quote EPC precisely because percentage commissions cannot be compared across price points.",
      },
      {
        question: "What conversion rate is typical for affiliate links?",
        answer:
          "Warm review and comparison traffic converts at roughly 2 to 6%; broad content traffic at 0.5 to 2%; email traffic often higher. Amazon's programme converts unusually well (frequently 5 to 10% on warm traffic) but pays low percentages (1 to 4.5% in most categories) and runs a 24-hour cookie, which is why its EPC often trails specialist programmes despite the conversion advantage.",
      },
      {
        question: "How much traffic do I need to earn $1,000 a month?",
        answer:
          "Divide $1,000 by your EPC. At an EPC of $0.50, you need 2,000 clicks a month; at $1.20, about 835; at $0.10 (low-ticket, cold traffic), 10,000. Clicks are not visitors — at a 20% click-through from article to merchant, multiply the visitor target by five. This arithmetic sets realistic content volume goals.",
      },
      {
        question: "Can affiliate marketing be profitable with paid ads?",
        answer:
          "Only when EPC comfortably exceeds cost per click, with room for the share of clicks that never convert and for tracking loss. Most affiliate programmes' EPCs ($0.10 to $1.00) sit below competitive CPCs in the same niche, which is why affiliates rely on search content, email and social reach rather than buying the traffic outright.",
      },
    ],
  },

  "creator/agency-vs-solo-margin-calculator": {
    quickAnswer:
      "On $12,000 of monthly creator revenue, working solo with $400 of overhead keeps $11,600 — a 96.7% margin. Hiring an editor ($2,500) and support ($800) with $900 of overhead keeps $7,800, a 65% margin — but frees 75 hours a month, lifting your effective hourly rate from $97 to $173.",
    howItWorks: [
      "Enter monthly creator revenue, then the team costs: editor cost, other team cost, and the overheads of each model. Add your own hours in each model and the capacity gain you expect from freed time. The calculator compares profit, margin and effective hourly rate for the solo and agency models side by side.",
      "The trade is visible in the first two numbers. The team costs $4,200 a month — $2,500 for the editor, $800 for other support, $500 of extra overhead — and cuts profit by $3,800 at today's revenue. The question the calculator answers is what the freed time produces: at the same revenue the team loses money, and only growth repays it.",
      "The effective hourly rate is the comparison that matters most. Solo: $11,600 of profit over 120 hours is $97 an hour. Agency: $7,800 over 45 hours is $173 an hour. The calculator favours the agency model when agency hourly exceeds solo hourly, because the hours you buy back are the asset — they are worth your best use of them, not zero.",
      "The capacity-gain input models the growth case. If freed time grows revenue 40%, to $16,800, agency profit rises to $12,600 — above the solo $11,600, while you work 75 fewer hours. The crossover is lower than it looks: the agency model matches solo profit at $15,800 of revenue, a 31.7% increase, because the team costs are fixed while revenue scales. At the defaults the crossover sits at $15,800 of revenue; every $1,000 of revenue above it adds $1,000 to agency profit, because the team costs do not rise with it.",
      "Run the model before hiring, with only the revenue you are confident the hire unlocks — not the revenue you hope for. If the hire only works at hoped-for revenue, the hire is the risk. And watch utilisation: a hire paid for 160 hours a month who is billable for 90 is being carried at nearly double the planned cost per delivered hour.",
    ],
    formula:
      "Solo profit = revenue - solo overhead. Agency profit = revenue - editor cost - other team cost - agency overhead. Effective hourly rate = profit / your hours. Scaled agency profit = revenue x (1 + capacity gain) - team and overhead costs.",
    example: {
      title: "Worked example: a creator hiring an editor",
      body: "Solo today: $12,000 revenue, $400 overhead, profit $11,600 (96.7% margin), 120 hours a month — $97 an hour. Hiring an editor at $2,500 plus $800 of other support and $900 of overhead cuts profit to $7,800 (65% margin) but drops your hours to 45, lifting your effective rate to $173 an hour. If the freed time grows revenue 40% to $16,800, agency profit becomes $12,600 — $1,000 more than solo, in 75 fewer hours. Below $15,800 of revenue the team costs more than it returns; above it, the hire pays.",
    },
    faqs: [
      {
        question: "What margin should a creator business target?",
        answer:
          "Solo creators commonly run 70 to 90% margins before paying themselves. A small team operation targets 50 to 65% gross margin on delivery and 15 to 25% net margin after overheads; below about 40% gross margin, one lost client or one bad month erases a month's profit. Judge your margin against your model — a team at a solo operator's margin target would never hire.",
      },
      {
        question: "Why do creators accept lower margins when they hire?",
        answer:
          "Because the business's revenue is no longer capped by one person's hours. A solo creator at 96.7% margin on $12,000 earns $11,600; a team at 65% on $16,800 earns $12,600 and can survive the owner taking a holiday. Margin percentage falls as scale rises; absolute profit, free time and resilience are what the trade buys.",
      },
      {
        question: "What costs do solo creators usually forget?",
        answer:
          "Their own non-billable time (editing, admin, invoicing, outreach — often 30 to 40% of hours), self-employment tax, software, professional insurance, training, and the income gaps between brand deals. Valuing unpaid time at even a modest hourly rate is the correction that changes the solo column most.",
      },
      {
        question: "When does hiring stop being worth it?",
        answer:
          "When utilisation drops. A hire paid for 160 hours a month who is billable for 90 is being carried at nearly double the planned cost per delivered hour. Track utilisation per role; if a role sits below roughly 65 to 70% billable for two consecutive months, the model says pause hiring and fix sales or scope before adding the next seat.",
      },
    ],
  },

  "creator/merch-margin-calculator": {
    quickAnswer:
      "A $35 tee with a $13 blank, $4 printing and $1.32 of card fees keeps $17.17 a unit before returns — a 49.1% margin. After a 2% return rate, 300 units a month net about $5,049. The margin, not the price, decides whether a design is worth promoting.",
    howItWorks: [
      "Enter the retail price, the per-unit base cost (the blank garment or product), the print cost, the platform fee percentage, the transaction percentage and fixed fee, shipping charged versus shipping cost, monthly units, and the expected return rate. The calculator returns profit per unit, margin, return-adjusted profit, monthly profit and markup.",
      "The stack is: price minus base cost minus print cost minus platform fee minus transaction fee, plus the shipping net (shipping charged minus shipping cost). At the defaults, a $35 tee loses $13 to the blank, $4 to printing and $1.32 to card fees, and gains $0.49 from shipping, leaving $17.17. The transaction fee is 2.9% of the price plus $0.30 — Stripe's standard US card rate.",
      "The platform percentage is the swing input. On your own store it is 0% and only card processing applies. On a marketplace storefront it can be 10% or more: at $35, a 10% platform fee removes $3.50 a unit, cutting profit to $13.68 and margin to 39.1%. The same design can be a good product on one channel and a bad one on another.",
      "Returns are modelled as a reduction in profit: the return-adjusted profit per unit is the base profit multiplied by (1 - return rate). At a 2% return rate, $17.17 becomes $16.83 — about $0.34 a unit across the range. Defects and print errors are the provider's cost on print-on-demand, but size exchanges and buyer's-remorse returns are typically yours.",
      "Use the per-design numbers, not the store average. Merch lines typically have one or two designs carrying the range; the calculator identifies which designs clear your target margin at their real volumes and which are catalogue decoration. Print-on-demand costs bundle garment, printing and fulfilment into the base price, which is why the unit cost looks high next to bulk buying — the fair comparison adds bulk's printing, storage, unsold sizes and packing time to the blank price.",
    ],
    formula:
      "Profit per unit = price - base cost - print cost - platform fee - transaction fee + (shipping charged - shipping cost). Margin = profit per unit / price x 100. Return-adjusted profit = profit per unit x (1 - return rate).",
    example: {
      title: "Worked example: a $35 tee, 300 units a month",
      body: "Price $35, blank $13, printing $4, no platform fee, transaction fee $35 x 2.9% + $0.30 = $1.32, shipping charged $4.99 against a $4.50 cost = +$0.49. Profit per unit = $35 - $13 - $4 - $1.32 + $0.49 = $17.17, a 49.1% margin and a 105.9% markup on the $17 production cost. After a 2% return rate, adjusted profit is $16.83 a unit and 300 units net $5,049.45 a month. Add a 10% platform fee and profit per unit falls to $13.68 — the monthly total drops to $4,020.45 on identical sales.",
    },
    faqs: [
      {
        question: "What margin should merch aim for?",
        answer:
          "Print-on-demand merch commonly targets 30 to 50% margins because the provider's base price includes production and fulfilment. Bulk-owned inventory targets 55 to 70% to compensate for the capital and unsold-stock risk. Below a 25% print-on-demand margin, small fee or shipping changes turn designs unprofitable — raise price or change the product before spending on promotion.",
      },
      {
        question: "Is print on demand or bulk printing better?",
        answer:
          "Print on demand wins at low and uncertain volume, for testing designs, and where sizes multiply inventory risk. Bulk wins once a design's volume is proven — typically a few hundred units — because the per-unit cost advantage compounds. Most established creator stores run both: print on demand for the long tail of designs, bulk for the two or three proven sellers.",
      },
      {
        question: "Who pays for returns on print-on-demand merch?",
        answer:
          "Defects and print errors are the provider's cost. Size exchanges and buyer's-remorse returns are typically yours: you refund the customer, and the returned item usually cannot be restocked through the provider. Price with a returns allowance (3 to 8% of units for apparel) so a normal return rate does not erase the margin.",
      },
      {
        question: "How should I price a first merch drop?",
        answer:
          "Start from the margin, not from what feels affordable: set the price that returns your target margin at the print-on-demand base cost, then check it against comparable creator stores (hoodies commonly sit at $45 to $65). If the price looks unreasonable for the product, the product or provider is wrong — discounting into a thin margin at launch leaves no room for the sales and offers you will want later.",
      },
    ],
  },

  "creator/platform-fee-visualizer": {
    quickAnswer:
      "The same $5,000 of audience income is worth $4,780 through Stripe alone, $4,500 on Gumroad, $4,380 on Patreon Pro and $4,280 on Substack — but only $2,750 from YouTube long-form ads and $2,250 from Shorts. Platform choice alone can more than double what a creator keeps.",
    howItWorks: [
      "Enter a gross income figure and the number of transactions it came in as. The visualizer ranks eight platforms by what each leaves after its share: YouTube long-form (45% to YouTube), YouTube Shorts (55% total deductions on pool revenue), Patreon Pro (8% platform plus 2.9% plus $0.30 per pledge), Substack (10% plus Stripe 2.9% plus $0.30), Twitch subscriptions (50%), Gumroad (10% flat), Etsy (6.5% transaction plus 3% plus $0.45 per sale) and Stripe alone (2.9% plus $0.30).",
      "Payment processing sits underneath several of these numbers. Where it is separate (Patreon, Substack, Stripe alone), a processing line of 2.9% plus $0.30 per transaction is shown, because on small transactions it exceeds the platform fee itself. At 250 transactions on $5,000 — a $20 average — the fixed $0.30 costs $75; at a $5 average across 1,000 transactions it costs $300. At the defaults the average transaction is $20, so the fixed $0.30 fee is a small line and the percentage fees dominate the ranking.",
      "The point of the comparison is not that one platform is 'best'. Each fee buys something: YouTube's 45% buys the audience and the ad sales operation; a marketplace's fee buys traffic and trust; Patreon's smaller cut assumes you bring the audience yourself. The right comparison is net income per unit of your effort, including audience building.",
      "The model simplifies some fine print. Gumroad's published rate is 10% plus $0.50 per sale plus card processing, so the visualizer's 10%-flat Gumroad row is a low estimate of its real cost; Gumroad Discover sales cost a flat 30% with processing included. Etsy Offsite Ads add 12 to 15% on some orders, and Substack also carries a 0.7% Stripe Billing fee on recurring charges that this model does not include.",
      "Re-run the comparison at your actual transaction size, because fixed per-transaction fees punish small payments and the ranking of platforms changes with the amount. The common pattern is layering: keep discovery on the high-fee platforms, and offer the committed audience a lower-fee home (memberships, your own store) as an additional option.",
    ],
    formula:
      "Net kept = gross - platform fee - processing fees where charged separately. Percentage fees scale with gross; fixed per-transaction fees scale with transaction count, so the ranking changes with average transaction size.",
    example: {
      title: "Worked example: $5,000 of monthly audience income, eight ways",
      body: "Stripe alone: $220 of fees, net $4,780. Gumroad at 10% flat: $500, net $4,500. Etsy: $587.50, net $4,412.50. Patreon Pro: $620, net $4,380. Substack: $720, net $4,280. YouTube long-form ads at 45%: $2,250, net $2,750. Twitch subscriptions at 50%: $2,500, net $2,500. YouTube Shorts at 55% deductions: $2,750, net $2,250. The spread between the best and worst is $2,530 a month on identical gross audience spending — the audience's $5,000 does not change; the toll does. Cut the average transaction to $5, with 1,000 transactions for the same $5,000, and Stripe's fee rises to $445 while Patreon's rises to $845 — the fixed fee reshuffles the middle of the ranking.",
    },
    faqs: [
      {
        question: "Which platform takes the smallest cut?",
        answer:
          "Of the major creator platforms, direct payment links and your own store take the least (payment processing only, about 2.9% + $0.30). Among audience platforms, Patreon's 5 to 12% and Substack's 10% are the lowest headline shares, but both assume you supply the audience. YouTube's 45% and Twitch's roughly 50% fund discovery and ad sales. Gumroad takes 10% plus $0.50 per sale, plus card processing.",
      },
      {
        question: "Why does YouTube take 45%?",
        answer:
          "The share funds the ad marketplace, hosting and delivery of video at scale, and the recommendation system that supplies most views. Whether it is fair depends on the counterfactual: the same videos self-hosted would reach a fraction of the audience. Creators keep 55% of long-form ad revenue and 45% of the pooled Shorts revenue.",
      },
      {
        question: "Are platform fees tax-deductible?",
        answer:
          "Yes, for creators filing as self-employed or through a business: platform shares and processing fees are ordinary business expenses. Report gross income and deduct the fees (or report the net your platform statement shows, consistently). This is general information, not tax advice — keep the platform's annual summary with your records.",
      },
      {
        question: "Should I move my audience to the cheapest platform?",
        answer:
          "Only the part that will actually move. A 35-point fee saving on the 20% of your audience willing to follow you to a new platform loses money against staying. The common pattern is layering: keep discovery on the high-fee platforms, and offer the committed audience a lower-fee home (memberships, your own store) as an additional option.",
      },
    ],
  },

};
