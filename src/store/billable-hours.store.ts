import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BillableHoursState {
  hourlyRate: number
  billableHours: number
  totalHoursWorked: number
  discount: number
  expenses: number
  
  // Setters
  setHourlyRate: (val: number) => void
  setBillableHours: (val: number) => void
  setTotalHoursWorked: (val: number) => void
  setDiscount: (val: number) => void
  setExpenses: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    totalBillableAmount: number
    utilizationRate: number
    effectiveHourlyRate: number
    lostRevenue: number
  }
}

export const useBillableHoursStore = create<BillableHoursState>()(
  persist(
    (set, get) => ({
      hourlyRate: 150,
      billableHours: 25,
      totalHoursWorked: 40,
      discount: 0,
      expenses: 250,

      setHourlyRate: (val) => set({ hourlyRate: val }),
      setBillableHours: (val) => set({ billableHours: val }),
      setTotalHoursWorked: (val) => set({ totalHoursWorked: val }),
      setDiscount: (val) => set({ discount: val }),
      setExpenses: (val) => set({ expenses: val }),

      getDerivedMetrics: () => {
        const s = get()
        
        const baseRevenue = s.billableHours * s.hourlyRate
        const totalBillableAmount = Math.max(0, baseRevenue - s.discount) + s.expenses
        
        const utilizationRate = s.totalHoursWorked > 0 ? (s.billableHours / s.totalHoursWorked) * 100 : 0
        const effectiveHourlyRate = s.totalHoursWorked > 0 ? (totalBillableAmount / s.totalHoursWorked) : 0
        
        // Lost revenue is hours worked but not billed (assuming they should have been billed at hourly rate)
        const nonBillableHours = Math.max(0, s.totalHoursWorked - s.billableHours)
        const lostRevenue = nonBillableHours * s.hourlyRate

        return {
          totalBillableAmount,
          utilizationRate,
          effectiveHourlyRate,
          lostRevenue
        }
      }
    }),
    {
      name: 'billable-hours-storage',
      skipHydration: true,
    }
  )
)
