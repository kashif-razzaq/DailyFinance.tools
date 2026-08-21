import { create } from 'zustand'

export interface ShippingZoneState {
  // Inputs
  averageItemWeight: number
  monthlyOrderVolume: number
  percentZone1to4: number // local/regional
  percentZone5to8: number // cross-country
  flatRateChargeToCustomer: number
  avgCostZone1to4: number
  avgCostZone5to8: number

  // Actions
  setAverageItemWeight: (val: number) => void
  setMonthlyOrderVolume: (val: number) => void
  setPercentZone1to4: (val: number) => void
  setFlatRateChargeToCustomer: (val: number) => void
  setAvgCostZone1to4: (val: number) => void
  setAvgCostZone5to8: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    percentZone5to8: number
    ordersZone1to4: number
    ordersZone5to8: number
    shippingRevenue: number
    shippingCostZone1to4: number
    shippingCostZone5to8: number
    totalShippingCost: number
    netShippingProfit: number
    blendedShippingCostPerOrder: number
  }
}

export const useShippingZoneStore = create<ShippingZoneState>((set, get) => ({
  averageItemWeight: 2.5,
  monthlyOrderVolume: 500,
  percentZone1to4: 60,
  percentZone5to8: 40,
  flatRateChargeToCustomer: 7.99,
  avgCostZone1to4: 6.50,
  avgCostZone5to8: 11.20,

  setAverageItemWeight: (val) => set({ averageItemWeight: val }),
  setMonthlyOrderVolume: (val) => set({ monthlyOrderVolume: val }),
  setPercentZone1to4: (val) => set({ percentZone1to4: val, percentZone5to8: 100 - val }),
  setFlatRateChargeToCustomer: (val) => set({ flatRateChargeToCustomer: val }),
  setAvgCostZone1to4: (val) => set({ avgCostZone1to4: val }),
  setAvgCostZone5to8: (val) => set({ avgCostZone5to8: val }),

  getDerivedMetrics: () => {
    const state = get()

    const ordersZone1to4 = state.monthlyOrderVolume * (state.percentZone1to4 / 100)
    const ordersZone5to8 = state.monthlyOrderVolume * (state.percentZone5to8 / 100)

    const shippingRevenue = state.monthlyOrderVolume * state.flatRateChargeToCustomer

    const shippingCostZone1to4 = ordersZone1to4 * state.avgCostZone1to4
    const shippingCostZone5to8 = ordersZone5to8 * state.avgCostZone5to8
    const totalShippingCost = shippingCostZone1to4 + shippingCostZone5to8

    const netShippingProfit = shippingRevenue - totalShippingCost

    const blendedShippingCostPerOrder = state.monthlyOrderVolume > 0 ? totalShippingCost / state.monthlyOrderVolume : 0

    return {
      percentZone5to8: state.percentZone5to8,
      ordersZone1to4,
      ordersZone5to8,
      shippingRevenue,
      shippingCostZone1to4,
      shippingCostZone5to8,
      totalShippingCost,
      netShippingProfit,
      blendedShippingCostPerOrder
    }
  }
}))
