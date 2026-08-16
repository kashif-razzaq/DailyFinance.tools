import { create } from 'zustand'

export interface LTVCACState {
  // Inputs
  averageOrderValue: number
  grossMarginPercent: number
  averagePurchasesPerYear: number
  averageLifespanYears: number
  customerAcquisitionCost: number // Blended CAC

  // Actions
  setAverageOrderValue: (val: number) => void
  setGrossMarginPercent: (val: number) => void
  setAveragePurchasesPerYear: (val: number) => void
  setAverageLifespanYears: (val: number) => void
  setCustomerAcquisitionCost: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    grossProfitPerOrder: number
    lifetimeRevenue: number
    lifetimeValue: number // LTV is based on Gross Profit, not Revenue!
    ltvToCacRatio: number
    paybackPurchases: number // How many purchases to cover the CAC
    isHealthy: boolean
    ratioStatus: string
  }
}

export const useLTVCACStore = create<LTVCACState>((set, get) => ({
  averageOrderValue: 75,
  grossMarginPercent: 60,
  averagePurchasesPerYear: 2,
  averageLifespanYears: 3,
  customerAcquisitionCost: 45,

  setAverageOrderValue: (val) => set({ averageOrderValue: val }),
  setGrossMarginPercent: (val) => set({ grossMarginPercent: val }),
  setAveragePurchasesPerYear: (val) => set({ averagePurchasesPerYear: val }),
  setAverageLifespanYears: (val) => set({ averageLifespanYears: val }),
  setCustomerAcquisitionCost: (val) => set({ customerAcquisitionCost: val }),

  getDerivedMetrics: () => {
    const state = get()

    const grossProfitPerOrder = state.averageOrderValue * (state.grossMarginPercent / 100)
    const totalPurchases = state.averagePurchasesPerYear * state.averageLifespanYears

    const lifetimeRevenue = state.averageOrderValue * totalPurchases

    // IMPORTANT: LTV must be calculated on Gross Margin, not gross revenue.
    const lifetimeValue = grossProfitPerOrder * totalPurchases

    const ltvToCacRatio = state.customerAcquisitionCost > 0 ? lifetimeValue / state.customerAcquisitionCost : 0

    const paybackPurchases = grossProfitPerOrder > 0 ? state.customerAcquisitionCost / grossProfitPerOrder : 0

    let isHealthy = false
    let ratioStatus = "Critical"

    if (ltvToCacRatio >= 3) {
      isHealthy = true
      ratioStatus = "Excellent"
    } else if (ltvToCacRatio >= 1.5) {
      isHealthy = true
      ratioStatus = "Acceptable"
    } else if (ltvToCacRatio > 1) {
      isHealthy = false
      ratioStatus = "Danger (Breaking Even)"
    } else {
      isHealthy = false
      ratioStatus = "Losing Money"
    }

    // Exception for very high ratios (you might be under-spending)
    if (ltvToCacRatio > 6) {
      isHealthy = true
      ratioStatus = "Too High (Scale Spend)"
    }

    return {
      grossProfitPerOrder,
      lifetimeRevenue,
      lifetimeValue,
      ltvToCacRatio,
      paybackPurchases,
      isHealthy,
      ratioStatus
    }
  }
}))
