import { create } from 'zustand'

export interface FBAFeeState {
  // Inputs
  retailPrice: number
  manufacturingCost: number
  inboundShippingCost: number
  itemWeightLbs: number
  isApparel: boolean
  isDangerousGoods: boolean
  storageMonths: number
  tier: 'small_standard' | 'large_standard' | 'large_bulky'

  // Actions
  setRetailPrice: (val: number) => void
  setManufacturingCost: (val: number) => void
  setInboundShippingCost: (val: number) => void
  setItemWeightLbs: (val: number) => void
  setIsApparel: (val: boolean) => void
  setIsDangerousGoods: (val: boolean) => void
  setStorageMonths: (val: number) => void
  setTier: (val: FBAFeeState['tier']) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    referralFee: number
    fulfillmentFee: number
    storageFee: number
    totalFBAFees: number
    totalCost: number
    netProfit: number
    roiPercent: number
    marginPercent: number
  }
}

export const useFBAStore = create<FBAFeeState>((set, get) => ({
  retailPrice: 45,
  manufacturingCost: 8,
  inboundShippingCost: 2,
  itemWeightLbs: 1,
  isApparel: false,
  isDangerousGoods: false,
  storageMonths: 2,
  tier: 'large_standard',

  setRetailPrice: (val) => set({ retailPrice: val }),
  setManufacturingCost: (val) => set({ manufacturingCost: val }),
  setInboundShippingCost: (val) => set({ inboundShippingCost: val }),
  setItemWeightLbs: (val) => set({ itemWeightLbs: val }),
  setIsApparel: (val) => set({ isApparel: val }),
  setIsDangerousGoods: (val) => set({ isDangerousGoods: val }),
  setStorageMonths: (val) => set({ storageMonths: val }),
  setTier: (val) => set({ tier: val }),

  getDerivedMetrics: () => {
    const state = get()

    // Referral Fee (Generally 15%, apparel is sometimes 17%, dangerous goods varies. Standardizing 15% for simplicity, 17% for apparel)
    const referralFeePercent = state.isApparel ? 0.17 : 0.15
    const referralFee = state.retailPrice * referralFeePercent

    // FBA Fulfillment Fee (highly simplified mock logic based on weight and tier for 2024 averages)
    let fulfillmentFee = 0
    if (state.tier === 'small_standard') {
      fulfillmentFee = 3.22 + (state.itemWeightLbs * 0.10)
    } else if (state.tier === 'large_standard') {
      fulfillmentFee = 4.75 + (state.itemWeightLbs * 0.20)
    } else {
      fulfillmentFee = 9.73 + (state.itemWeightLbs * 0.40)
    }

    if (state.isApparel) fulfillmentFee += 0.40
    if (state.isDangerousGoods) fulfillmentFee += 1.00

    // Storage fee (approx $0.87 per cubic foot standard, simplifying based on tier)
    let monthlyStorage = 0.50
    if (state.tier === 'large_standard') monthlyStorage = 1.20
    if (state.tier === 'large_bulky') monthlyStorage = 4.00

    const storageFee = monthlyStorage * state.storageMonths

    const totalFBAFees = referralFee + fulfillmentFee + storageFee

    const totalCost = state.manufacturingCost + state.inboundShippingCost + totalFBAFees

    const netProfit = state.retailPrice - totalCost

    const marginPercent = state.retailPrice > 0 ? (netProfit / state.retailPrice) * 100 : 0
    const investedCapital = state.manufacturingCost + state.inboundShippingCost
    const roiPercent = investedCapital > 0 ? (netProfit / investedCapital) * 100 : 0

    return {
      referralFee,
      fulfillmentFee,
      storageFee,
      totalFBAFees,
      totalCost,
      netProfit,
      roiPercent,
      marginPercent
    }
  }
}))
