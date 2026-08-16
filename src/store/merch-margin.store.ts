import { create } from 'zustand'

export interface MerchMarginState {
  // Inputs
  baseCost: number // Cost of the blank item
  printCost: number // Cost to print/embroider
  shippingCost: number // Cost to ship to customer
  packagingCost: number // Bags, stickers, inserts
  retailPrice: number
  monthlyVolume: number
  platformFeePercent: number // Shopify, Etsy, etc.

  // Actions
  setBaseCost: (val: number) => void
  setPrintCost: (val: number) => void
  setShippingCost: (val: number) => void
  setPackagingCost: (val: number) => void
  setRetailPrice: (val: number) => void
  setMonthlyVolume: (val: number) => void
  setPlatformFeePercent: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    cogs: number // Cost of Goods Sold per item
    platformFeeAmount: number
    totalCostPerItem: number
    profitPerItem: number
    grossMarginPercent: number
    monthlyRevenue: number
    monthlyProfit: number
  }
}

export const useMerchStore = create<MerchMarginState>((set, get) => ({
  // Default values based on a typical print-on-demand hoodie
  baseCost: 15.00,
  printCost: 5.50,
  shippingCost: 6.50,
  packagingCost: 1.00,
  retailPrice: 45.00,
  monthlyVolume: 100,
  platformFeePercent: 2.9, // Standard Shopify/Stripe

  setBaseCost: (val) => set({ baseCost: val }),
  setPrintCost: (val) => set({ printCost: val }),
  setShippingCost: (val) => set({ shippingCost: val }),
  setPackagingCost: (val) => set({ packagingCost: val }),
  setRetailPrice: (val) => set({ retailPrice: val }),
  setMonthlyVolume: (val) => set({ monthlyVolume: val }),
  setPlatformFeePercent: (val) => set({ platformFeePercent: val }),

  getDerivedMetrics: () => {
    const state = get()

    const cogs = state.baseCost + state.printCost + state.shippingCost + state.packagingCost
    const platformFeeAmount = state.retailPrice * (state.platformFeePercent / 100)

    const totalCostPerItem = cogs + platformFeeAmount
    const profitPerItem = state.retailPrice - totalCostPerItem
    const grossMarginPercent = state.retailPrice > 0 ? (profitPerItem / state.retailPrice) * 100 : 0

    const monthlyRevenue = state.retailPrice * state.monthlyVolume
    const monthlyProfit = profitPerItem * state.monthlyVolume

    return {
      cogs,
      platformFeeAmount,
      totalCostPerItem,
      profitPerItem,
      grossMarginPercent,
      monthlyRevenue,
      monthlyProfit
    }
  }
}))
