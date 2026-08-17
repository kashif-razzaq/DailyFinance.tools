import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AirbnbArbitrageMarginState {
  monthlyRent: number;
  furnishingCost: number;
  nightlyRate: number;
  occupancyRate: number;
  monthlyCleaning: number;
  setMonthlyRent: (val: number) => void;
  setFurnishingCost: (val: number) => void;
  setNightlyRate: (val: number) => void;
  setOccupancyRate: (val: number) => void;
  setMonthlyCleaning: (val: number) => void;
}

export const useAirbnbArbitrageMarginStore = create<AirbnbArbitrageMarginState>()(
  persist(
    (set) => ({
      monthlyRent: 2000,
      furnishingCost: 5000,
      nightlyRate: 150,
      occupancyRate: 70,
      monthlyCleaning: 600,
      setMonthlyRent: (val) => set({ monthlyRent: val }),
      setFurnishingCost: (val) => set({ furnishingCost: val }),
      setNightlyRate: (val) => set({ nightlyRate: val }),
      setOccupancyRate: (val) => set({ occupancyRate: val }),
      setMonthlyCleaning: (val) => set({ monthlyCleaning: val })
    }),
    { name: 'airbnb-arbitrage-margin-calculator-storage' }
  )
)
