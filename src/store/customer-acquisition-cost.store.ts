import { create } from 'zustand'

export interface CACState {
  // Inputs
  totalAdSpend: number
  totalAgencyFees: number
  totalSoftwareCosts: number
  totalNewCustomers: number
  totalOrganicCustomers: number

  // Actions
  setTotalAdSpend: (val: number) => void
  setTotalAgencyFees: (val: number) => void
  setTotalSoftwareCosts: (val: number) => void
  setTotalNewCustomers: (val: number) => void
  setTotalOrganicCustomers: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    totalMarketingCost: number
    paidCAC: number // Total Cost / Paid Customers
    blendedCAC: number // Total Cost / Total Customers (Paid + Organic)
    organicRatio: number // % of total
  }
}

export const useCACStore = create<CACState>((set, get) => ({
  // Default values
  totalAdSpend: 10000,
  totalAgencyFees: 2500,
  totalSoftwareCosts: 500,
  totalNewCustomers: 600, // Total customers generated from paid ads
  totalOrganicCustomers: 400,

  setTotalAdSpend: (val) => set({ totalAdSpend: val }),
  setTotalAgencyFees: (val) => set({ totalAgencyFees: val }),
  setTotalSoftwareCosts: (val) => set({ totalSoftwareCosts: val }),
  setTotalNewCustomers: (val) => set({ totalNewCustomers: val }),
  setTotalOrganicCustomers: (val) => set({ totalOrganicCustomers: val }),

  getDerivedMetrics: () => {
    const state = get()

    const totalMarketingCost = state.totalAdSpend + state.totalAgencyFees + state.totalSoftwareCosts

    // Paid CAC only looks at the customers attributed to ads.
    const paidCAC = state.totalNewCustomers > 0 ? totalMarketingCost / state.totalNewCustomers : 0

    // Blended CAC looks at the business as a whole.
    const totalCustomers = state.totalNewCustomers + state.totalOrganicCustomers
    const blendedCAC = totalCustomers > 0 ? totalMarketingCost / totalCustomers : 0

    const organicRatio = totalCustomers > 0 ? (state.totalOrganicCustomers / totalCustomers) * 100 : 0

    return {
      totalMarketingCost,
      paidCAC,
      blendedCAC,
      organicRatio
    }
  }
}))
