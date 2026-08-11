import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SCorpOptimizerState {
  netBusinessIncome: number
  salaryRatio: number
  
  // Setters
  setNetBusinessIncome: (val: number) => void
  setSalaryRatio: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    solePropSelfEmploymentTax: number
    sCorpW2Salary: number
    sCorpFicaTax: number
    sCorpDistribution: number
    sCorpUnemploymentTax: number // FUTA approx
    totalSCorpPayrollTaxes: number
    annualTaxSavings: number
    isWorthIt: boolean
  }
}

export const useSCorpOptimizerStore = create<SCorpOptimizerState>()(
  persist(
    (set, get) => ({
      netBusinessIncome: 120000,
      salaryRatio: 40,

      setNetBusinessIncome: (val) => set({ netBusinessIncome: val }),
      setSalaryRatio: (val) => set({ salaryRatio: val }),

      getDerivedMetrics: () => {
        const s = get()
        
        // 1. Sole Prop Baseline (LLC Default)
        // 15.3% on 92.35% of net income
        // Note: Social Security cap for 2024 is $168,600. For simplicity, we apply standard logic up to cap.
        const ssCap = 168600
        const taxableEarnings = s.netBusinessIncome * 0.9235
        const ssTaxable = Math.min(taxableEarnings, ssCap)
        const medTaxable = taxableEarnings
        
        const solePropSSTax = ssTaxable * 0.124
        const solePropMedTax = medTaxable * 0.029
        const solePropSelfEmploymentTax = solePropSSTax + solePropMedTax

        // 2. S-Corp Scenario
        const sCorpW2Salary = s.netBusinessIncome * (s.salaryRatio / 100)
        const sCorpDistribution = s.netBusinessIncome - sCorpW2Salary
        
        const sCorpSSTaxable = Math.min(sCorpW2Salary, ssCap)
        const sCorpMedTaxable = sCorpW2Salary
        
        // FICA is 15.3% (7.65% employer + 7.65% employee)
        const sCorpSSTax = sCorpSSTaxable * 0.124
        const sCorpMedTax = sCorpMedTaxable * 0.029
        const sCorpFicaTax = sCorpSSTax + sCorpMedTax
        
        // S-Corps must pay FUTA (Federal Unemployment) and State Unemployment.
        // Approx FUTA is 0.6% on first $7,000 = $42. State varies, let's estimate $300 total average.
        const sCorpUnemploymentTax = 342
        
        const totalSCorpPayrollTaxes = sCorpFicaTax + sCorpUnemploymentTax

        // Annual Savings
        // Note: S-Corps have extra admin costs (tax prep, payroll software), usually ~$1,500/year.
        // We will show raw tax savings, and in UI flag if savings > $2,000 to say "worth it".
        const annualTaxSavings = Math.max(0, solePropSelfEmploymentTax - totalSCorpPayrollTaxes)
        
        const isWorthIt = annualTaxSavings > 2000

        return {
          solePropSelfEmploymentTax,
          sCorpW2Salary,
          sCorpFicaTax,
          sCorpDistribution,
          sCorpUnemploymentTax,
          totalSCorpPayrollTaxes,
          annualTaxSavings,
          isWorthIt
        }
      }
    }),
    {
      name: 'scorp-optimizer-storage',
      skipHydration: true,
    }
  )
)
