import { create } from 'zustand'

export interface RentalCashFlowState {
  purchasePrice: number
  downPaymentPercent: number
  interestRate: number
  loanTermYears: number
  closingCosts: number
  repairCosts: number

  monthlyRent: number
  propertyTaxesAnnual: number
  insuranceAnnual: number
  hoaMonthly: number
  vacancyRate: number
  maintenanceRate: number
  propertyManagementRate: number

  setPurchasePrice: (val: number) => void
  setDownPaymentPercent: (val: number) => void
  setInterestRate: (val: number) => void
  setLoanTermYears: (val: number) => void
  setClosingCosts: (val: number) => void
  setRepairCosts: (val: number) => void

  setMonthlyRent: (val: number) => void
  setPropertyTaxesAnnual: (val: number) => void
  setInsuranceAnnual: (val: number) => void
  setHoaMonthly: (val: number) => void
  setVacancyRate: (val: number) => void
  setMaintenanceRate: (val: number) => void
  setPropertyManagementRate: (val: number) => void

  getDerivedMetrics: () => {
    totalInitialInvestment: number
    monthlyMortgagePayment: number
    totalMonthlyExpenses: number
    netOperatingIncomeMonthly: number
    monthlyCashFlow: number
    cashOnCashReturn: number
    capRate: number
  }
}

export const useRentalStore = create<RentalCashFlowState>((set, get) => ({
  purchasePrice: 250000,
  downPaymentPercent: 20,
  interestRate: 6.5,
  loanTermYears: 30,
  closingCosts: 5000,
  repairCosts: 10000,

  monthlyRent: 2200,
  propertyTaxesAnnual: 3600,
  insuranceAnnual: 1200,
  hoaMonthly: 0,
  vacancyRate: 5,
  maintenanceRate: 10,
  propertyManagementRate: 8,

  setPurchasePrice: (val) => set({ purchasePrice: val }),
  setDownPaymentPercent: (val) => set({ downPaymentPercent: val }),
  setInterestRate: (val) => set({ interestRate: val }),
  setLoanTermYears: (val) => set({ loanTermYears: val }),
  setClosingCosts: (val) => set({ closingCosts: val }),
  setRepairCosts: (val) => set({ repairCosts: val }),

  setMonthlyRent: (val) => set({ monthlyRent: val }),
  setPropertyTaxesAnnual: (val) => set({ propertyTaxesAnnual: val }),
  setInsuranceAnnual: (val) => set({ insuranceAnnual: val }),
  setHoaMonthly: (val) => set({ hoaMonthly: val }),
  setVacancyRate: (val) => set({ vacancyRate: val }),
  setMaintenanceRate: (val) => set({ maintenanceRate: val }),
  setPropertyManagementRate: (val) => set({ propertyManagementRate: val }),

  getDerivedMetrics: () => {
    const state = get()

    const downPayment = state.purchasePrice * (state.downPaymentPercent / 100)
    const loanAmount = state.purchasePrice - downPayment
    const totalInitialInvestment = downPayment + state.closingCosts + state.repairCosts

    let monthlyMortgagePayment = 0
    if (state.interestRate > 0 && state.loanTermYears > 0 && loanAmount > 0) {
      const r = (state.interestRate / 100) / 12
      const n = state.loanTermYears * 12
      monthlyMortgagePayment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    }

    const monthlyTaxes = state.propertyTaxesAnnual / 12
    const monthlyInsurance = state.insuranceAnnual / 12
    const monthlyVacancy = state.monthlyRent * (state.vacancyRate / 100)
    const monthlyMaintenance = state.monthlyRent * (state.maintenanceRate / 100)
    const monthlyManagement = state.monthlyRent * (state.propertyManagementRate / 100)

    const totalMonthlyExpensesWithoutMortgage = monthlyTaxes + monthlyInsurance + state.hoaMonthly + monthlyVacancy + monthlyMaintenance + monthlyManagement
    const netOperatingIncomeMonthly = state.monthlyRent - totalMonthlyExpensesWithoutMortgage

    const monthlyCashFlow = netOperatingIncomeMonthly - monthlyMortgagePayment
    const annualCashFlow = monthlyCashFlow * 12

    const cashOnCashReturn = totalInitialInvestment > 0 ? (annualCashFlow / totalInitialInvestment) * 100 : 0
    const capRate = state.purchasePrice > 0 ? ((netOperatingIncomeMonthly * 12) / state.purchasePrice) * 100 : 0

    return {
      totalInitialInvestment,
      monthlyMortgagePayment,
      totalMonthlyExpenses: totalMonthlyExpensesWithoutMortgage + monthlyMortgagePayment,
      netOperatingIncomeMonthly,
      monthlyCashFlow,
      cashOnCashReturn,
      capRate
    }
  }
}))
