import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HouseHackingRoiState {
  purchasePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  rentalIncome: number;
  monthlyExpenses: number;
  setPurchasePrice: (val: number) => void;
  setDownPaymentPercent: (val: number) => void;
  setInterestRate: (val: number) => void;
  setRentalIncome: (val: number) => void;
  setMonthlyExpenses: (val: number) => void;
}

export const useHouseHackingRoiStore = create<HouseHackingRoiState>()(
  persist(
    (set) => ({
      purchasePrice: 400000,
      downPaymentPercent: 5,
      interestRate: 6.5,
      rentalIncome: 2000,
      monthlyExpenses: 800,
      setPurchasePrice: (val) => set({ purchasePrice: val }),
      setDownPaymentPercent: (val) => set({ downPaymentPercent: val }),
      setInterestRate: (val) => set({ interestRate: val }),
      setRentalIncome: (val) => set({ rentalIncome: val }),
      setMonthlyExpenses: (val) => set({ monthlyExpenses: val })
    }),
    { name: 'house-hacking-roi-calculator-storage' }
  )
)
