import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'INR'

interface GlobalSettingsState {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
}

export const useGlobalSettingsStore = create<GlobalSettingsState>()(
  persist(
    (set) => ({
      currency: 'USD',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'daily-finance-global-settings',
    }
  )
)

export const formatCurrency = (amount: number, currency: CurrencyCode = 'USD', compact: boolean = false) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: compact || amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: compact ? 0 : 2,
    notation: compact ? 'compact' : 'standard'
  }).format(amount)
}
