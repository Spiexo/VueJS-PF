const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'

export interface ExchangeRatesResponse {
  base: string
  date: string
  time_last_updated: number
  rates: Record<string, number>
}

export async function fetchExchangeRates(): Promise<ExchangeRatesResponse> {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch rates')
  }
  return response.json()
}
