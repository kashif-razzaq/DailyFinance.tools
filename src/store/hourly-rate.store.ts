import { create } from 'zustand'

export interface HourlyRateState {
  // Inputs
  targetAnnualIncome: number
  annualBusinessExpenses: number
  
  // Advanced Expenses
  isAdvancedExpenses: boolean
  softwareExpenses: number
  hardwareExpenses: number
  internetExpenses: number
  marketingExpenses: number
  legalExpenses: number
  officeExpenses: number
  
  taxRate: number
  weeksOff: number
  weeklyHours: number
  billableUtilization: number
  profitBuffer: number

  // Actions
  setTargetAnnualIncome: (val: number) => void
  setAnnualBusinessExpenses: (val: number) => void
  setIsAdvancedExpenses: (val: boolean) => void
  setSoftwareExpenses: (val: number) => void
  setHardwareExpenses: (val: number) => void
  setInternetExpenses: (val: number) => void
  setMarketingExpenses: (val: number) => void
  setLegalExpenses: (val: number) => void
  setOfficeExpenses: (val: number) => void
  
  setTaxRate: (val: number) => void
  setWeeksOff: (val: number) => void
  setWeeklyHours: (val: number) => void
  setBillableUtilization: (val: number) => void
  setProfitBuffer: (val: number) => void
  
  // Getters / Derived State
  getDerivedMetrics: () => {
    totalExpenses: number
    preTaxRequired: number
    grossRevenueRequired: number
    grossWithProfit: number
    weeksWorked: number
    totalHoursWorked: number
    billableHours: number
    hourlyRateMAR: number
    dailyRate: number
    monthlyRetainer: number
    taxAmount: number
    profitAmount: number
  }
}

export const useHourlyRateStore = create<HourlyRateState>((set, get) => ({
  // Default values based on realistic freelance averages
  targetAnnualIncome: 75000,
  annualBusinessExpenses: 5000,
  
  isAdvancedExpenses: true,
  softwareExpenses: 1200,
  hardwareExpenses: 1000,
  internetExpenses: 800,
  marketingExpenses: 500,
  legalExpenses: 300,
  officeExpenses: 1200,

  taxRate: 25, // 15.3% SE + Income Tax approx
  weeksOff: 4, // 2 weeks vacay, 2 weeks holidays/sick
  weeklyHours: 40,
  billableUtilization: 60, // 60% client work, 40% admin/marketing
  profitBuffer: 10, // 10% reinvestment buffer

  setTargetAnnualIncome: (val) => set({ targetAnnualIncome: val }),
  setAnnualBusinessExpenses: (val) => set({ annualBusinessExpenses: val }),
  setIsAdvancedExpenses: (val) => set({ isAdvancedExpenses: val }),
  setSoftwareExpenses: (val) => set({ softwareExpenses: val }),
  setHardwareExpenses: (val) => set({ hardwareExpenses: val }),
  setInternetExpenses: (val) => set({ internetExpenses: val }),
  setMarketingExpenses: (val) => set({ marketingExpenses: val }),
  setLegalExpenses: (val) => set({ legalExpenses: val }),
  setOfficeExpenses: (val) => set({ officeExpenses: val }),

  setTaxRate: (val) => set({ taxRate: val }),
  setWeeksOff: (val) => set({ weeksOff: val }),
  setWeeklyHours: (val) => set({ weeklyHours: val }),
  setBillableUtilization: (val) => set({ billableUtilization: val }),
  setProfitBuffer: (val) => set({ profitBuffer: val }),

  getDerivedMetrics: () => {
    const state = get()
    
    // Calculate total expenses based on mode
    const totalExpenses = state.isAdvancedExpenses 
      ? (state.softwareExpenses + state.hardwareExpenses + state.internetExpenses + state.marketingExpenses + state.legalExpenses + state.officeExpenses)
      : state.annualBusinessExpenses
    
    // 1. Calculate how much we need before taxes to hit the net income goal
    const preTaxRequired = state.targetAnnualIncome / (1 - (state.taxRate / 100))
    const taxAmount = preTaxRequired - state.targetAnnualIncome

    // 2. Add fixed business expenses to get the base gross revenue
    const grossRevenueRequired = preTaxRequired + totalExpenses

    // 3. Add the profit/reinvestment buffer
    const grossWithProfit = grossRevenueRequired * (1 + (state.profitBuffer / 100))
    const profitAmount = grossWithProfit - grossRevenueRequired

    // 4. Calculate actual time available to work
    const weeksWorked = 52 - state.weeksOff
    const totalHoursWorked = weeksWorked * state.weeklyHours

    // 5. Calculate BILLABLE hours (the only hours that generate revenue)
    const billableHours = totalHoursWorked * (state.billableUtilization / 100)

    // 6. Final Rates
    const hourlyRateMAR = billableHours > 0 ? grossWithProfit / billableHours : 0
    const dailyRate = hourlyRateMAR * (state.weeklyHours / 5) // Avg hours per day
    const monthlyRetainer = grossWithProfit / 12

    return {
      totalExpenses,
      preTaxRequired,
      grossRevenueRequired,
      grossWithProfit,
      weeksWorked,
      totalHoursWorked,
      billableHours,
      hourlyRateMAR,
      dailyRate,
      monthlyRetainer,
      taxAmount,
      profitAmount
    }
  }
}))
