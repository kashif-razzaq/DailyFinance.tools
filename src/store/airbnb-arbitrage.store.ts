import { create } from 'zustand'

interface AirbnbArbitrageState {
  monthlyRent: number
  furnitureCost: number
  startupCosts: number
  averageNightlyRate: number
  occupancyRate: number
  cleaningFee: number
  staysPerMonth: number
  monthlyExpenses: number

  setMonthlyRent: (val: number) => void
  setFurnitureCost: (val: number) => void
  setStartupCosts: (val: number) => void
  setAverageNightlyRate: (val: number) => void
  setOccupancyRate: (val: number) => void
  setCleaningFee: (val: number) => void
  setStaysPerMonth: (val: number) => void
  setMonthlyExpenses: (val: number) => void

  calculateResult: () => {
    monthlyRevenue: number
    monthlyOperatingExpenses: number
    monthlyProfit: number
    profitMargin: number
    initialInvestment: number
    monthsToRecoup: number
  }
}

export const useAirbnbArbitrageStore = create<AirbnbArbitrageState>((set, get) => ({
  monthlyRent: 1500,
  furnitureCost: 5000,
  startupCosts: 1000,
  averageNightlyRate: 150,
  occupancyRate: 70, // percent
  cleaningFee: 80,
  staysPerMonth: 5,
  monthlyExpenses: 300,

  setMonthlyRent: (val) => set({ monthlyRent: val }),
  setFurnitureCost: (val) => set({ furnitureCost: val }),
  setStartupCosts: (val) => set({ startupCosts: val }),
  setAverageNightlyRate: (val) => set({ averageNightlyRate: val }),
  setOccupancyRate: (val) => set({ occupancyRate: val }),
  setCleaningFee: (val) => set({ cleaningFee: val }),
  setStaysPerMonth: (val) => set({ staysPerMonth: val }),
  setMonthlyExpenses: (val) => set({ monthlyExpenses: val }),

  calculateResult: () => {
    const state = get()

    // Revenue
    const daysInMonth = 30
    const bookedDays = daysInMonth * (state.occupancyRate / 100)
    const nightlyRevenue = bookedDays * state.averageNightlyRate
    const cleaningRevenue = state.staysPerMonth * state.cleaningFee
    const monthlyRevenue = nightlyRevenue + cleaningRevenue

    // Expenses
    const platformFee = monthlyRevenue * 0.03 // Assuming 3% host fee
    const cleaningCosts = state.staysPerMonth * state.cleaningFee // Assuming it's a wash
    const monthlyOperatingExpenses = state.monthlyRent + state.monthlyExpenses + platformFee + cleaningCosts

    const monthlyProfit = monthlyRevenue - monthlyOperatingExpenses
    const profitMargin = monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0

    const initialInvestment = state.furnitureCost + state.startupCosts + state.monthlyRent // first month rent usually required upfront

    const monthsToRecoup = monthlyProfit > 0 ? initialInvestment / monthlyProfit : Infinity

    return {
      monthlyRevenue,
      monthlyOperatingExpenses,
      monthlyProfit,
      profitMargin,
      initialInvestment,
      monthsToRecoup
    }
  }
}))
