import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CrossBorderFXState {
  invoiceAmount: number
  sourceCurrency: string
  targetCurrency: string
  midMarketRate: number
  annualInvoices: number
  
  // Setters
  setInvoiceAmount: (val: number) => void
  setSourceCurrency: (val: string) => void
  setTargetCurrency: (val: string) => void
  setMidMarketRate: (val: number) => void
  setAnnualInvoices: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    trueValue: number
    
    stripeBaseFee: number
    stripeGross: number
    stripeNetPayout: number
    stripeDragPct: number
    
    paypalBaseFee: number
    paypalGross: number
    paypalNetPayout: number
    paypalDragPct: number
    
    wiseVariableFee: number
    wiseFixedFee: number
    wiseGross: number
    wiseNetPayout: number
    wiseDragPct: number
    
    annualSavingsWiseVsStripe: number
    annualSavingsWiseVsPaypal: number
  }
}

export const useCrossBorderFXStore = create<CrossBorderFXState>()(
  persist(
    (set, get) => ({
      invoiceAmount: 2500,
      sourceCurrency: 'USD',
      targetCurrency: 'EUR',
      midMarketRate: 0.92,
      annualInvoices: 12,

      setInvoiceAmount: (val) => set({ invoiceAmount: val }),
      setSourceCurrency: (val) => set({ sourceCurrency: val }),
      setTargetCurrency: (val) => set({ targetCurrency: val }),
      setMidMarketRate: (val) => set({ midMarketRate: val }),
      setAnnualInvoices: (val) => set({ annualInvoices: val }),

      getDerivedMetrics: () => {
        const s = get()
        const i = s.invoiceAmount
        const r = s.midMarketRate

        const trueValue = i * r

        // Stripe
        // Assuming 4.4% + $0.30 base fee for international card + 1.0% FX spread
        const stripeBaseFee = (i * 0.044) + 0.30
        const stripeGross = i - stripeBaseFee
        const rStripe = r * (1 - 0.010)
        const stripeNetPayout = stripeGross * rStripe
        const stripeDragPct = trueValue > 0 ? (1 - (stripeNetPayout / trueValue)) * 100 : 0

        // PayPal
        // Assuming 4.49% + $0.49 base fee + 3.5% FX spread
        const paypalBaseFee = (i * 0.0449) + 0.49
        const paypalGross = i - paypalBaseFee
        const rPaypal = r * (1 - 0.0350)
        const paypalNetPayout = paypalGross * rPaypal
        const paypalDragPct = trueValue > 0 ? (1 - (paypalNetPayout / trueValue)) * 100 : 0

        // Wise
        // Assuming 0.43% variable fee + $0.45 fixed fee + 0.0% FX spread
        const wiseVariableFee = i * 0.0043
        const wiseFixedFee = 0.45
        const wiseGross = i - wiseVariableFee - wiseFixedFee
        const wiseNetPayout = wiseGross * r // true mid-market rate
        const wiseDragPct = trueValue > 0 ? (1 - (wiseNetPayout / trueValue)) * 100 : 0

        const annualSavingsWiseVsStripe = (wiseNetPayout - stripeNetPayout) * s.annualInvoices
        const annualSavingsWiseVsPaypal = (wiseNetPayout - paypalNetPayout) * s.annualInvoices

        return {
          trueValue,
          stripeBaseFee,
          stripeGross,
          stripeNetPayout,
          stripeDragPct,
          paypalBaseFee,
          paypalGross,
          paypalNetPayout,
          paypalDragPct,
          wiseVariableFee,
          wiseFixedFee,
          wiseGross,
          wiseNetPayout,
          wiseDragPct,
          annualSavingsWiseVsStripe,
          annualSavingsWiseVsPaypal
        }
      }
    }),
    {
      name: 'cross-border-fx-storage',
      skipHydration: true,
    }
  )
)
