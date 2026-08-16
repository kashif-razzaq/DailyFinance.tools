import { create } from 'zustand'

export interface SubstackState {
  // Inputs
  currentFreeSubscribers: number
  monthlyGrowthRate: number // % free list grows each month
  freeToPaidConversionRate: number // % of free list that becomes paid
  monthlySubscriptionPrice: number
  annualSubscriptionPrice: number
  percentChoosingAnnual: number // % of paid subscribers that choose annual
  monthlyChurnRate: number // % of paid subscribers who cancel each month

  // Actions
  setCurrentFreeSubscribers: (val: number) => void
  setMonthlyGrowthRate: (val: number) => void
  setFreeToPaidConversionRate: (val: number) => void
  setMonthlySubscriptionPrice: (val: number) => void
  setAnnualSubscriptionPrice: (val: number) => void
  setPercentChoosingAnnual: (val: number) => void
  setMonthlyChurnRate: (val: number) => void

  // Derived
  getDerivedMetrics: () => {
    months: Array<{
      month: number
      freeSubscribers: number
      paidSubscribers: number
      newPaidThisMonth: number
      churnedThisMonth: number
      monthlyRevenue: number
      annualRevenueAmortized: number
      totalNetRevenue: number
    }>
    yearOneRevenue: number
    yearOneTotalSubscribers: number
    yearOnePaidSubscribers: number
  }
}

export const useSubstackStore = create<SubstackState>((set, get) => ({
  currentFreeSubscribers: 1000,
  monthlyGrowthRate: 5,
  freeToPaidConversionRate: 4,
  monthlySubscriptionPrice: 8,
  annualSubscriptionPrice: 80,
  percentChoosingAnnual: 30,
  monthlyChurnRate: 4,

  setCurrentFreeSubscribers: (val) => set({ currentFreeSubscribers: val }),
  setMonthlyGrowthRate: (val) => set({ monthlyGrowthRate: val }),
  setFreeToPaidConversionRate: (val) => set({ freeToPaidConversionRate: val }),
  setMonthlySubscriptionPrice: (val) => set({ monthlySubscriptionPrice: val }),
  setAnnualSubscriptionPrice: (val) => set({ annualSubscriptionPrice: val }),
  setPercentChoosingAnnual: (val) => set({ percentChoosingAnnual: val }),
  setMonthlyChurnRate: (val) => set({ monthlyChurnRate: val }),

  getDerivedMetrics: () => {
    const state = get()

    let currentFree = state.currentFreeSubscribers
    let currentPaid = currentFree * (state.freeToPaidConversionRate / 100)

    // Substack fee is 10% + Stripe processing (~3%). We calculate net revenue.
    const effectiveCut = 0.87

    const months = []
    let yearOneRevenue = 0

    for (let i = 1; i <= 12; i++) {
      // 1. Churn existing paid
      const churnedThisMonth = currentPaid * (state.monthlyChurnRate / 100)
      currentPaid -= churnedThisMonth

      // 2. Grow free list
      const newFreeThisMonth = currentFree * (state.monthlyGrowthRate / 100)
      currentFree += newFreeThisMonth

      // 3. Convert some new free to paid (assuming new signups convert at the target rate)
      const newPaidThisMonth = newFreeThisMonth * (state.freeToPaidConversionRate / 100)
      currentPaid += newPaidThisMonth

      // 4. Calculate Revenue
      // Break down paid subs into monthly vs annual
      const monthlySubsCount = currentPaid * (1 - (state.percentChoosingAnnual / 100))
      const annualSubsCount = currentPaid * (state.percentChoosingAnnual / 100)

      const monthlyRevenue = (monthlySubsCount * state.monthlySubscriptionPrice) * effectiveCut
      // Annual revenue is usually paid upfront, but for growth models, we amortize it to show MRR
      const annualRevenueAmortized = (annualSubsCount * (state.annualSubscriptionPrice / 12)) * effectiveCut

      const totalNetRevenue = monthlyRevenue + annualRevenueAmortized
      yearOneRevenue += totalNetRevenue

      months.push({
        month: i,
        freeSubscribers: Math.round(currentFree),
        paidSubscribers: Math.round(currentPaid),
        newPaidThisMonth: Math.round(newPaidThisMonth),
        churnedThisMonth: Math.round(churnedThisMonth),
        monthlyRevenue,
        annualRevenueAmortized,
        totalNetRevenue
      })
    }

    return {
      months,
      yearOneRevenue,
      yearOneTotalSubscribers: Math.round(currentFree),
      yearOnePaidSubscribers: Math.round(currentPaid)
    }
  }
}))
