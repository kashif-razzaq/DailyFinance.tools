import { create } from 'zustand'

export interface ShopifyMarginState {
  // Inputs
  retailPrice: number
  cogs: number
  shippingCostToCustomer: number
  customerPaysShipping: boolean
  shopifyPlan: 'basic' | 'shopify' | 'advanced'
  percentInternational: number
  customAppFees: number // monthly

  // Actions
  setRetailPrice: (val: number) => void
  setCogs: (val: number) => void
  setShippingCostToCustomer: (val: number) => void
  setCustomerPaysShipping: (val: boolean) => void
  setShopifyPlan: (val: ShopifyMarginState['shopifyPlan']) => void
  setPercentInternational: (val: number) => void
  setCustomAppFees: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    paymentProcessingFee: number
    totalCostPerOrder: number
    grossProfitPerOrder: number
    grossMarginPercent: number
    breakEvenMonthlyOrders: number // Orders needed to cover Shopify fixed costs
  }
}

export const useShopifyMarginStore = create<ShopifyMarginState>((set, get) => ({
  retailPrice: 50,
  cogs: 15,
  shippingCostToCustomer: 7,
  customerPaysShipping: false,
  shopifyPlan: 'basic',
  percentInternational: 10,
  customAppFees: 50, // Typical stack: Reviews, Upsells, Email

  setRetailPrice: (val) => set({ retailPrice: val }),
  setCogs: (val) => set({ cogs: val }),
  setShippingCostToCustomer: (val) => set({ shippingCostToCustomer: val }),
  setCustomerPaysShipping: (val) => set({ customerPaysShipping: val }),
  setShopifyPlan: (val) => set({ shopifyPlan: val }),
  setPercentInternational: (val) => set({ percentInternational: val }),
  setCustomAppFees: (val) => set({ customAppFees: val }),

  getDerivedMetrics: () => {
    const state = get()

    // Processing fees logic (Domestic vs Intl)
    // Basic: 2.9% + 30c (Domestic), 3.9% + 30c (Amex/Intl + 1%)
    // Shopify: 2.6% + 30c
    // Advanced: 2.4% + 30c
    let domesticRate = 2.9
    let fixedFee = 0.30
    let monthlyPlanCost = 39

    if (state.shopifyPlan === 'shopify') {
      domesticRate = 2.6
      monthlyPlanCost = 105
    } else if (state.shopifyPlan === 'advanced') {
      domesticRate = 2.4
      monthlyPlanCost = 399
    }

    const intlRatio = state.percentInternational / 100
    const blendedProcessingRate = (domesticRate * (1 - intlRatio)) + ((domesticRate + 1.0) * intlRatio)

    // Note: Payment processing is charged on the TOTAL amount charged to customer (Price + Shipping if they pay it)
    const cartTotalForFees = state.customerPaysShipping ? (state.retailPrice + state.shippingCostToCustomer) : state.retailPrice

    const paymentProcessingFee = (cartTotalForFees * (blendedProcessingRate / 100)) + fixedFee

    // Calculate actual shipping cost burden on seller
    const sellerShippingBurden = state.customerPaysShipping ? 0 : state.shippingCostToCustomer

    const totalCostPerOrder = state.cogs + sellerShippingBurden + paymentProcessingFee

    const grossProfitPerOrder = state.retailPrice - totalCostPerOrder
    const grossMarginPercent = state.retailPrice > 0 ? (grossProfitPerOrder / state.retailPrice) * 100 : 0

    const totalFixedMonthlyCosts = monthlyPlanCost + state.customAppFees
    const breakEvenMonthlyOrders = grossProfitPerOrder > 0 ? totalFixedMonthlyCosts / grossProfitPerOrder : 0

    return {
      paymentProcessingFee,
      totalCostPerOrder,
      grossProfitPerOrder,
      grossMarginPercent,
      breakEvenMonthlyOrders
    }
  }
}))
