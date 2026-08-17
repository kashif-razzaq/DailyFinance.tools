import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NetWorthTrackerState {
  cashAndEquivalents: number;
  investments: number;
  realEstateValue: number;
  mortgageBalance: number;
  studentLoans: number;
  creditCardDebt: number;
  setCashAndEquivalents: (val: number) => void;
  setInvestments: (val: number) => void;
  setRealEstateValue: (val: number) => void;
  setMortgageBalance: (val: number) => void;
  setStudentLoans: (val: number) => void;
  setCreditCardDebt: (val: number) => void;
}

export const useNetWorthTrackerStore = create<NetWorthTrackerState>()(
  persist(
    (set) => ({
      cashAndEquivalents: 15000,
      investments: 150000,
      realEstateValue: 400000,
      mortgageBalance: 320000,
      studentLoans: 35000,
      creditCardDebt: 5000,
      setCashAndEquivalents: (val) => set({ cashAndEquivalents: val }),
      setInvestments: (val) => set({ investments: val }),
      setRealEstateValue: (val) => set({ realEstateValue: val }),
      setMortgageBalance: (val) => set({ mortgageBalance: val }),
      setStudentLoans: (val) => set({ studentLoans: val }),
      setCreditCardDebt: (val) => set({ creditCardDebt: val })
    }),
    { name: 'net-worth-tracker-storage' }
  )
)
