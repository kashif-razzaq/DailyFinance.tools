import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RentalCashFlowState {
  propertyValue: number;
  grossRent: number;
  vacancyRate: number;
  operatingExpenses: number;
  monthlyDebtService: number;
  setPropertyValue: (val: number) => void;
  setGrossRent: (val: number) => void;
  setVacancyRate: (val: number) => void;
  setOperatingExpenses: (val: number) => void;
  setMonthlyDebtService: (val: number) => void;
}

export const useRentalCashFlowStore = create<RentalCashFlowState>()(
  persist(
    (set) => ({
      propertyValue: 350000,
      grossRent: 3000,
      vacancyRate: 5,
      operatingExpenses: 1000,
      monthlyDebtService: 1200,
      setPropertyValue: (val) => set({ propertyValue: val }),
      setGrossRent: (val) => set({ grossRent: val }),
      setVacancyRate: (val) => set({ vacancyRate: val }),
      setOperatingExpenses: (val) => set({ operatingExpenses: val }),
      setMonthlyDebtService: (val) => set({ monthlyDebtService: val })
    }),
    { name: 'rental-cash-flow-calculator-storage' }
  )
)
