import { create } from 'zustand'

export interface SalesTaxState {
  // Inputs
  retailPrice: number
  taxRatePercent: number
  pricingModel: 'exclusive' | 'inclusive'

  // Actions
  setRetailPrice: (val: number) => void
  setTaxRatePercent: (val: number) => void
  setPricingModel: (val: SalesTaxState['pricingModel']) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    priceWithoutTax: number
    taxAmount: number
    finalPriceToCustomer: number
    effectiveTaxRate: number
  }
}

export const useSalesTaxStore = create<SalesTaxState>((set, get) => ({
  retailPrice: 100,
  taxRatePercent: 20, // Common European VAT rate
  pricingModel: 'inclusive',

  setRetailPrice: (val) => set({ retailPrice: val }),
  setTaxRatePercent: (val) => set({ taxRatePercent: val }),
  setPricingModel: (val) => set({ pricingModel: val }),

  getDerivedMetrics: () => {
    const state = get()

    let priceWithoutTax = 0
    let taxAmount = 0
    let finalPriceToCustomer = 0

    if (state.pricingModel === 'exclusive') {
      // Price entered is BEFORE tax (US Model)
      priceWithoutTax = state.retailPrice
      taxAmount = priceWithoutTax * (state.taxRatePercent / 100)
      finalPriceToCustomer = priceWithoutTax + taxAmount
    } else {
      // Price entered is AFTER tax (UK/EU Model)
      finalPriceToCustomer = state.retailPrice
      // Formula: Price / (1 + Tax Rate)
      priceWithoutTax = finalPriceToCustomer / (1 + (state.taxRatePercent / 100))
      taxAmount = finalPriceToCustomer - priceWithoutTax
    }

    const effectiveTaxRate = priceWithoutTax > 0 ? (taxAmount / priceWithoutTax) * 100 : 0

    return {
      priceWithoutTax,
      taxAmount,
      finalPriceToCustomer,
      effectiveTaxRate
    }
  }
}))
