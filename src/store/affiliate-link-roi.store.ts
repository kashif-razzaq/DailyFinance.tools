import { create } from 'zustand'

export interface AffiliateROIState {
  // Inputs
  monthlyTraffic: number
  clickThroughRate: number // % of traffic that clicks affiliate link
  conversionRate: number // % of clicks that buy
  averageOrderValue: number
  commissionRate: number // % commission

  // Actions
  setMonthlyTraffic: (val: number) => void
  setClickThroughRate: (val: number) => void
  setConversionRate: (val: number) => void
  setAverageOrderValue: (val: number) => void
  setCommissionRate: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    monthlyClicks: number
    monthlyConversions: number
    grossSalesGenerated: number
    monthlyCommission: number
    annualCommission: number
    earningsPerClick: number // (EPC)
    earningsPerVisitor: number // (EPV)
  }
}

export const useAffiliateStore = create<AffiliateROIState>((set, get) => ({
  // Default values
  monthlyTraffic: 50000,
  clickThroughRate: 5,
  conversionRate: 2,
  averageOrderValue: 150,
  commissionRate: 15,

  setMonthlyTraffic: (val) => set({ monthlyTraffic: val }),
  setClickThroughRate: (val) => set({ clickThroughRate: val }),
  setConversionRate: (val) => set({ conversionRate: val }),
  setAverageOrderValue: (val) => set({ averageOrderValue: val }),
  setCommissionRate: (val) => set({ commissionRate: val }),

  getDerivedMetrics: () => {
    const state = get()

    const monthlyClicks = state.monthlyTraffic * (state.clickThroughRate / 100)
    const monthlyConversions = monthlyClicks * (state.conversionRate / 100)

    const grossSalesGenerated = monthlyConversions * state.averageOrderValue
    const monthlyCommission = grossSalesGenerated * (state.commissionRate / 100)
    const annualCommission = monthlyCommission * 12

    const earningsPerClick = monthlyClicks > 0 ? monthlyCommission / monthlyClicks : 0
    const earningsPerVisitor = state.monthlyTraffic > 0 ? monthlyCommission / state.monthlyTraffic : 0

    return {
      monthlyClicks,
      monthlyConversions,
      grossSalesGenerated,
      monthlyCommission,
      annualCommission,
      earningsPerClick,
      earningsPerVisitor
    }
  }
}))
