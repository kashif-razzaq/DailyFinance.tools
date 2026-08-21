import { create } from 'zustand'

export interface HouseHackingState {
  purchasePrice: number
  downPaymentPercent: number
  interestRate: number
  loanTermYears: number
  propertyTaxesAnnual: number
  homeInsuranceAnnual: number
  pmiMonthly: number

  rentalIncomeMonthly: number
  vacancyRate: number // %
  maintenanceReserve: number // % of rent
  utilitiesPaidByOwner: number // monthly

  currentRent: number

  setPurchasePrice: (val: number) => void
  setDownPaymentPercent: (val: number) => void
  setInterestRate: (val: number) => void
  setLoanTermYears: (val: number) => void
  setPropertyTaxesAnnual: (val: number) => void
  setHomeInsuranceAnnual: (val: number) => void
  setPmiMonthly: (val: number) => void
  setRentalIncomeMonthly: (val: number) => void
  setVacancyRate: (val: number) => void
  setMaintenanceReserve: (val: number) => void
  setUtilitiesPaidByOwner: (val: number) => void
  setCurrentRent: (val: number) => void

  getDerivedMetrics: () => {
    downPaymentAmount: number
    loanAmount: number
    monthlyPrincipalInterest: number
    totalMonthlyPITI: number
    effectiveMonthlyCost: number // PITI + expenses - rental income
    monthlySavingsVsRenting: number
    annualSavings: number
    cashFlowIfMovedOut: number
  }
}

export const useHouseHackingStore = create<HouseHackingState>((set, get) => ({
  purchasePrice: 400000,
  downPaymentPercent: 3.5, // Standard FHA
  interestRate: 6.5,
  loanTermYears: 30,
  propertyTaxesAnnual: 4800,
  homeInsuranceAnnual: 1200,
  pmiMonthly: 150,

  rentalIncomeMonthly: 1800,
  vacancyRate: 5,
  maintenanceReserve: 10,
  utilitiesPaidByOwner: 200,

  currentRent: 2000,

  setPurchasePrice: (val) => set({ purchasePrice: val }),
  setDownPaymentPercent: (val) => set({ downPaymentPercent: val }),
  setInterestRate: (val) => set({ interestRate: val }),
  setLoanTermYears: (val) => set({ loanTermYears: val }),
  setPropertyTaxesAnnual: (val) => set({ propertyTaxesAnnual: val }),
  setHomeInsuranceAnnual: (val) => set({ homeInsuranceAnnual: val }),
  setPmiMonthly: (val) => set({ pmiMonthly: val }),
  setRentalIncomeMonthly: (val) => set({ rentalIncomeMonthly: val }),
  setVacancyRate: (val) => set({ vacancyRate: val }),
  setMaintenanceReserve: (val) => set({ maintenanceReserve: val }),
  setUtilitiesPaidByOwner: (val) => set({ utilitiesPaidByOwner: val }),
  setCurrentRent: (val) => set({ currentRent: val }),

  getDerivedMetrics: () => {
    const state = get()

    const downPaymentAmount = state.purchasePrice * (state.downPaymentPercent / 100)
    const loanAmount = state.purchasePrice - downPaymentAmount

    // Monthly P&I
    let monthlyPrincipalInterest = 0
    if (state.interestRate > 0 && state.loanTermYears > 0 && loanAmount > 0) {
      const r = (state.interestRate / 100) / 12
      const n = state.loanTermYears * 12
      monthlyPrincipalInterest = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    }

    const totalMonthlyPITI = monthlyPrincipalInterest + (state.propertyTaxesAnnual / 12) + (state.homeInsuranceAnnual / 12) + state.pmiMonthly

    // Operating expenses
    const vacancyCost = state.rentalIncomeMonthly * (state.vacancyRate / 100)
    const maintenanceCost = state.rentalIncomeMonthly * (state.maintenanceReserve / 100)
    const totalOpEx = vacancyCost + maintenanceCost + state.utilitiesPaidByOwner

    const netRentalIncome = state.rentalIncomeMonthly - totalOpEx

    // Cost to live there
    const effectiveMonthlyCost = totalMonthlyPITI - netRentalIncome

    const monthlySavingsVsRenting = state.currentRent - effectiveMonthlyCost
    const annualSavings = monthlySavingsVsRenting * 12

    // Cash flow if moved out (assume they rent their unit for the same amount)
    const cashFlowIfMovedOut = (netRentalIncome * 2) - totalMonthlyPITI

    return {
      downPaymentAmount,
      loanAmount,
      monthlyPrincipalInterest,
      totalMonthlyPITI,
      effectiveMonthlyCost,
      monthlySavingsVsRenting,
      annualSavings,
      cashFlowIfMovedOut
    }
  }
}))
