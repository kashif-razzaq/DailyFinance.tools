import { create } from 'zustand'

export interface InventoryReorderState {
  // Inputs
  averageDailySales: number
  leadTimeDays: number // How long it takes supplier to deliver
  safetyStockDays: number // Buffer days
  maxLeadTimeDays: number // Worst case supplier delay
  maxDailySales: number // Worst case peak sales

  // Actions
  setAverageDailySales: (val: number) => void
  setLeadTimeDays: (val: number) => void
  setSafetyStockDays: (val: number) => void
  setMaxLeadTimeDays: (val: number) => void
  setMaxDailySales: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    leadTimeDemand: number
    safetyStockUnits: number
    reorderPoint: number
    daysOfInventoryAtReorder: number
  }
}

export const useInventoryStore = create<InventoryReorderState>((set, get) => ({
  // Default values
  averageDailySales: 20,
  leadTimeDays: 30, // 1 month sea freight
  safetyStockDays: 14, // 2 weeks buffer
  maxLeadTimeDays: 45, // Delays
  maxDailySales: 35, // BFCM peak

  setAverageDailySales: (val) => set({ averageDailySales: val }),
  setLeadTimeDays: (val) => set({ leadTimeDays: val }),
  setSafetyStockDays: (val) => set({ safetyStockDays: val }),
  setMaxLeadTimeDays: (val) => set({ maxLeadTimeDays: val }),
  setMaxDailySales: (val) => set({ maxDailySales: val }),

  getDerivedMetrics: () => {
    const state = get()

    // Base demand during standard lead time
    const leadTimeDemand = state.averageDailySales * state.leadTimeDays

    // Safety stock using the standard formula: (Max Daily Sales x Max Lead Time) - (Avg Daily Sales x Avg Lead Time)
    // We provide a simpler alternative if they just want a flat days buffer.
    // If they input max values > average, we use the formula. Otherwise, we use the simple buffer.
    let safetyStockUnits = state.safetyStockDays * state.averageDailySales
    if (state.maxDailySales > state.averageDailySales && state.maxLeadTimeDays > state.leadTimeDays) {
      safetyStockUnits = (state.maxDailySales * state.maxLeadTimeDays) - leadTimeDemand
    }

    // ROP = Lead Time Demand + Safety Stock
    const reorderPoint = leadTimeDemand + safetyStockUnits

    const daysOfInventoryAtReorder = state.averageDailySales > 0 ? reorderPoint / state.averageDailySales : 0

    return {
      leadTimeDemand,
      safetyStockUnits,
      reorderPoint,
      daysOfInventoryAtReorder
    }
  }
}))
