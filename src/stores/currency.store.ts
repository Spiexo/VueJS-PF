import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchExchangeRates } from '@/api/currency.api'

const STORAGE_KEY = 'currency-cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const useCurrencyStore = defineStore('currency', () => {
  const currency = ref('USD')
  const rates = ref<Record<string, number>>({ USD: 1 })
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastFetch = ref<number | null>(null)

  // ── Persistance localStorage ──

  const saveToStorage = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data: rates.value,
        currency: currency.value,
        timestamp: lastFetch.value,
      }),
    )
  }

  const loadFromStorage = (): {
    data: Record<string, number>
    currency: string
    timestamp: number | null
  } => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return { data: { USD: 1 }, currency: 'USD', timestamp: null }

    try {
      return JSON.parse(stored)
    } catch {
      return { data: { USD: 1 }, currency: 'USD', timestamp: null }
    }
  }

  // Charger le cache au démarrage
  const cached = loadFromStorage()
  if (Object.keys(cached.data).length > 1) {
    rates.value = cached.data
    currency.value = cached.currency
    lastFetch.value = cached.timestamp
  }

  // ── Computed ──

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

  const currentRate = computed(() => rates.value[currency.value] || 1)

  // ── Actions ──

  async function fetchRates(forceRefresh = false) {
    const now = Date.now()
    const cacheIsValid = lastFetch.value && now - lastFetch.value < CACHE_DURATION

    if (cacheIsValid && !forceRefresh && Object.keys(rates.value).length > 1) {
      return rates.value
    }

    loading.value = true
    error.value = null
    try {
      const data = await fetchExchangeRates()
      rates.value = data.rates
      lastFetch.value = now
      saveToStorage()
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }

    return rates.value
  }

  function setCurrency(newCurrency: string) {
    if (rates.value[newCurrency]) {
      currency.value = newCurrency
      saveToStorage()
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
