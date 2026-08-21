import { create } from 'zustand'

export interface CourseLaunchState {
  // Inputs
  emailListSize: number
  openRate: number
  clickThroughRate: number
  salesConversionRate: number // of the people who click the link, what % buy?
  coursePrice: number
  refundRate: number // % of buyers who refund

  // Actions
  setEmailListSize: (val: number) => void
  setOpenRate: (val: number) => void
  setClickThroughRate: (val: number) => void
  setSalesConversionRate: (val: number) => void
  setCoursePrice: (val: number) => void
  setRefundRate: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    totalOpens: number
    totalClicks: number
    grossSales: number
    grossRevenue: number
    totalRefunds: number
    refundCost: number
    netRevenue: number
    earningsPerSubscriber: number
  }
}

export const useCourseLaunchStore = create<CourseLaunchState>((set, get) => ({
  // Default values
  emailListSize: 5000,
  openRate: 35,
  clickThroughRate: 5,
  salesConversionRate: 2,
  coursePrice: 299,
  refundRate: 5,

  setEmailListSize: (val) => set({ emailListSize: val }),
  setOpenRate: (val) => set({ openRate: val }),
  setClickThroughRate: (val) => set({ clickThroughRate: val }),
  setSalesConversionRate: (val) => set({ salesConversionRate: val }),
  setCoursePrice: (val) => set({ coursePrice: val }),
  setRefundRate: (val) => set({ refundRate: val }),

  getDerivedMetrics: () => {
    const state = get()

    const totalOpens = state.emailListSize * (state.openRate / 100)
    const totalClicks = totalOpens * (state.clickThroughRate / 100)

    const grossSales = Math.floor(totalClicks * (state.salesConversionRate / 100))
    const grossRevenue = grossSales * state.coursePrice

    const totalRefunds = Math.floor(grossSales * (state.refundRate / 100))
    const refundCost = totalRefunds * state.coursePrice

    const netRevenue = grossRevenue - refundCost

    const earningsPerSubscriber = state.emailListSize > 0 ? netRevenue / state.emailListSize : 0

    return {
      totalOpens,
      totalClicks,
      grossSales,
      grossRevenue,
      totalRefunds,
      refundCost,
      netRevenue,
      earningsPerSubscriber
    }
  }
}))
