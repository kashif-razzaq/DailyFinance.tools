import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EmergencyFundVisualizerState {
  monthlyHousing: number;
  monthlyUtilities: number;
  monthlyFood: number;
  monthlyDebt: number;
  currentSavings: number;
  setMonthlyHousing: (val: number) => void;
  setMonthlyUtilities: (val: number) => void;
  setMonthlyFood: (val: number) => void;
  setMonthlyDebt: (val: number) => void;
  setCurrentSavings: (val: number) => void;
}

export const useEmergencyFundVisualizerStore = create<EmergencyFundVisualizerState>()(
  persist(
    (set) => ({
      monthlyHousing: 2000,
      monthlyUtilities: 500,
      monthlyFood: 800,
      monthlyDebt: 400,
      currentSavings: 10000,
      setMonthlyHousing: (val) => set({ monthlyHousing: val }),
      setMonthlyUtilities: (val) => set({ monthlyUtilities: val }),
      setMonthlyFood: (val) => set({ monthlyFood: val }),
      setMonthlyDebt: (val) => set({ monthlyDebt: val }),
      setCurrentSavings: (val) => set({ currentSavings: val })
    }),
    { name: 'emergency-fund-visualizer-storage' }
  )
)
