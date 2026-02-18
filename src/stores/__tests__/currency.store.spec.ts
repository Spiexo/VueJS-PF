import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCurrencyStore } from '../currency.store'

// Mock de l'API
vi.mock('@/api/currency.api', () => ({
  fetchExchangeRates: vi.fn().mockResolvedValue({
    base: 'USD',
    date: '2024-01-01',
    time_last_updated: 1704067200,
    rates: {
      USD: 1,
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.0,
    },
  }),
}))

describe('Currency Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should have USD as default currency', () => {
    const store = useCurrencyStore()
    expect(store.currency).toBe('USD')
    expect(store.currentSymbol).toBe('$')
  })

  it('should return correct symbols', async () => {
    const store = useCurrencyStore()
    await store.fetchRates()

    store.setCurrency('EUR')
    expect(store.currentSymbol).toBe('€')

    store.setCurrency('GBP')
    expect(store.currentSymbol).toBe('£')

    store.setCurrency('JPY')
    expect(store.currentSymbol).toBe('¥')

    store.setCurrency('USD')
    expect(store.currentSymbol).toBe('$')
  })

  it('should fetch exchange rates', async () => {
    const store = useCurrencyStore()
    await store.fetchRates()

    expect(store.rates.EUR).toBe(0.85)
    expect(store.rates.GBP).toBe(0.73)
    expect(store.rates.JPY).toBe(110.0)
    expect(store.loading).toBe(false)
  })

  it('should convert prices correctly', async () => {
    const store = useCurrencyStore()
    await store.fetchRates()

    store.setCurrency('EUR')
    const converted = store.convertPrice(100)
    expect(converted).toBe('85.00')
  })

  it('should not set invalid currency', async () => {
    const store = useCurrencyStore()
    await store.fetchRates()

    store.setCurrency('INVALID')
    expect(store.currency).toBe('USD')
  })

  it('should use cache when data is fresh', async () => {
    const store = useCurrencyStore()
    const { fetchExchangeRates } = await import('@/api/currency.api')

    await store.fetchRates()
    vi.clearAllMocks()

    await store.fetchRates() // second call should use cache

    expect(fetchExchangeRates).not.toHaveBeenCalled()
  })

  it('should persist to localStorage', async () => {
    const store = useCurrencyStore()
    await store.fetchRates()
    store.setCurrency('EUR')

    const stored = localStorage.getItem('currency-cache')
    expect(stored).not.toBeNull()

    const parsed = JSON.parse(stored!)
    expect(parsed.currency).toBe('EUR')
    expect(parsed.data.EUR).toBe(0.85)
    expect(parsed.timestamp).toBeDefined()
  })

  it('should restore from localStorage', () => {
    localStorage.setItem(
      'currency-cache',
      JSON.stringify({
        data: { USD: 1, EUR: 0.9, GBP: 0.75 },
        currency: 'GBP',
        timestamp: Date.now(),
      }),
    )

    const store = useCurrencyStore()
    expect(store.currency).toBe('GBP')
    expect(store.currentSymbol).toBe('£')
    expect(store.rates.EUR).toBe(0.9)
  })
})
