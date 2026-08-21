import { create } from 'zustand'

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'freelance'
export type JobSecurity = 'high' | 'medium' | 'low'
export type IncomeStability = 'stable' | 'seasonal' | 'variable'
export type ComfortLevel = 3 | 6 | 9 | 12

interface EmergencyFundState {
  // Inputs
  monthlyExpenses: number
  currentFund: number
  monthlySaving: number
  interestRate: number

  // Risk Assessment
  employmentType: EmploymentType
  jobSecurity: JobSecurity
  incomeStability: IncomeStability
  hasDependents: boolean
  hasHealthCosts: boolean
  hasIncomeProtection: boolean

  // Comfort Level
  comfortLevel: ComfortLevel

  // Actions
  setMonthlyExpenses: (val: number) => void
  setCurrentFund: (val: number) => void
  setMonthlySaving: (val: number) => void
  setInterestRate: (val: number) => void
  setEmploymentType: (val: EmploymentType) => void
  setJobSecurity: (val: JobSecurity) => void
  setIncomeStability: (val: IncomeStability) => void
  setHasDependents: (val: boolean) => void
  setHasHealthCosts: (val: boolean) => void
  setHasIncomeProtection: (val: boolean) => void
  setComfortLevel: (val: ComfortLevel) => void
}

export const useEmergencyFundStore = create<EmergencyFundState>((set) => ({
  monthlyExpenses: 4000,
  currentFund: 2000,
  monthlySaving: 500,
  interestRate: 2.5,

  employmentType: 'full-time',
  jobSecurity: 'high',
  incomeStability: 'stable',
  hasDependents: false,
  hasHealthCosts: false,
  hasIncomeProtection: true,

  comfortLevel: 6,

  setMonthlyExpenses: (val) => set({ monthlyExpenses: val }),
  setCurrentFund: (val) => set({ currentFund: val }),
  setMonthlySaving: (val) => set({ monthlySaving: val }),
  setInterestRate: (val) => set({ interestRate: val }),
  setEmploymentType: (val) => set({ employmentType: val }),
  setJobSecurity: (val) => set({ jobSecurity: val }),
  setIncomeStability: (val) => set({ incomeStability: val }),
  setHasDependents: (val) => set({ hasDependents: val }),
  setHasHealthCosts: (val) => set({ hasHealthCosts: val }),
  setHasIncomeProtection: (val) => set({ hasIncomeProtection: val }),
  setComfortLevel: (val) => set({ comfortLevel: val }),
}))

export const calculateEmergencyFundMetrics = (state: EmergencyFundState) => {
  // 1. Calculate Risk Score
  let riskScore = 0

  switch (state.employmentType) {
    case 'part-time': riskScore += 1; break;
    case 'contract': riskScore += 2; break;
    case 'freelance': riskScore += 3; break;
    case 'full-time': default: break;
  }

  switch (state.jobSecurity) {
    case 'medium': riskScore += 1; break;
    case 'low': riskScore += 2; break;
    case 'high': default: break;
  }

  switch (state.incomeStability) {
    case 'seasonal': riskScore += 1; break;
    case 'variable': riskScore += 2; break;
    case 'stable': default: break;
  }

  if (state.hasDependents) riskScore += 1
  if (state.hasHealthCosts) riskScore += 1
  if (state.hasIncomeProtection) riskScore -= 1

  // Base 3 months. +1 month for every 2 risk points, capped at 12.
  const recommendedMonths = Math.min(12, Math.max(3, 3 + Math.floor(riskScore / 2)))
  
  const activeTargetAmount = recommendedMonths * state.monthlyExpenses
  const activeRemainingAmount = Math.max(0, activeTargetAmount - state.currentFund)

  const currentCoverageMonths = state.monthlyExpenses > 0 ? state.currentFund / state.monthlyExpenses : 0

  // Calculate Time to Goal
  const monthlyRate = (state.interestRate / 100) / 12
  
  let balance = state.currentFund
  let monthsToTarget = 0
  
  const MAX_MONTHS = 600 // 50 years max
  const chartData = []
  
  // Path to target calculation (generate 26 data points max)
  const chartMonths = 26
  for (let m = 0; m <= chartMonths; m++) {
    chartData.push({
        month: m,
        balance: Math.round(balance),
        label: m === 0 ? 'Now' : `${m}mo`
    })
    balance = balance * (1 + monthlyRate) + state.monthlySaving
  }

  // Exact time to goal
  balance = state.currentFund
  if (state.monthlySaving > 0 || (monthlyRate > 0 && balance > 0)) {
    while (balance < activeTargetAmount && monthsToTarget < MAX_MONTHS) {
      balance = balance * (1 + monthlyRate) + state.monthlySaving
      monthsToTarget++
    }
  } else if (balance < activeTargetAmount) {
    monthsToTarget = Infinity
  }

  // Savings required to hit target in 6 and 12 months (PMT formula)
  const calculatePMT = (months: number) => {
      if (monthlyRate === 0) return Math.max(0, activeRemainingAmount / months)
      const pv = state.currentFund
      const fv = activeTargetAmount
      const rn = Math.pow(1 + monthlyRate, months)
      const pmt = (fv - pv * rn) / ((rn - 1) / monthlyRate)
      return Math.max(0, pmt)
  }

  const sixMonthTarget = calculatePMT(6)
  const twelveMonthTarget = calculatePMT(12)

  let riskLevelLabel = 'Low risk'
  if (riskScore >= 4) riskLevelLabel = 'High risk'
  else if (riskScore >= 2) riskLevelLabel = 'Medium risk'

  return {
    riskScore,
    recommendedMonths,
    recommendedAmount: activeTargetAmount,
    comfortAmount: state.comfortLevel * state.monthlyExpenses,
    remainingAmount: activeRemainingAmount,
    currentCoverageMonths,
    monthsToTarget,
    sixMonthTarget,
    twelveMonthTarget,
    riskLevelLabel,
    chartData
  }
}
