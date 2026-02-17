import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchExchangeRates } from '@/api/currency.api'

export const useCurrencyStore = defineStore('currency', () => {
  const currency = ref('USD')
  const rates = ref<Record<string, number>>({ USD: 1 })
  const loading = ref(false)
  const error = ref<string | null>(null)

  const availableCurrencies = computed(() => Object.keys(rates.value))

  const currentSymbol = computed(() => {
    switch (currency.value) {
      case 'EUR':
        return '€'
      case 'GBP':
        return '£'
      case 'JPY':
        return '¥'
      case 'USD':
      default:
        return '$'
    }
  })

  // Conversion rate based on selected currency
  const currentRate = computed(() => rates.value[currency.value] || 1)

  async function fetchRates() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchExchangeRates()
      rates.value = data.rates
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  function setCurrency(newCurrency: string) {
    if (rates.value[newCurrency]) {
      currency.value = newCurrency
    }
  }

  function convertPrice(priceInUSD: number): string {
    const converted = priceInUSD * currentRate.value
    return converted.toFixed(2)
  }

  return {
    currency,
    rates,
    loading,
    error,
    availableCurrencies,
    currentSymbol,
    fetchRates,
    setCurrency,
    convertPrice,
  }
})
