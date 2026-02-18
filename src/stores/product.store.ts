import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/product'
import { fetchProducts, fetchProductById } from '@/api/product.api'

const STORAGE_KEY = 'products-cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastFetch = ref<number | null>(null)

  // ── Persistance localStorage ──

  const saveToStorage = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data: products.value,
        timestamp: lastFetch.value,
      }),
    )
  }

  const loadFromStorage = (): { data: Product[]; timestamp: number | null } => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return { data: [], timestamp: null }

    try {
      return JSON.parse(stored)
    } catch {
      return { data: [], timestamp: null }
    }
  }

  // Charger le cache au démarrage
  const cached = loadFromStorage()
  if (cached.data.length > 0) {
    products.value = cached.data
    lastFetch.value = cached.timestamp
  }

  // ── Actions ──

  async function loadProducts(forceRefresh = false) {
    const now = Date.now()
    const cacheIsValid = lastFetch.value && now - lastFetch.value < CACHE_DURATION

    if (cacheIsValid && !forceRefresh && products.value.length > 0) {
      return products.value
    }

    loading.value = true
    error.value = null
    try {
      products.value = await fetchProducts()
      lastFetch.value = now
      saveToStorage()
    } catch (e) {
      error.value = 'Failed to load products'
      console.error(e)
    } finally {
      loading.value = false
    }

    return products.value
  }

  async function loadProduct(id: number) {
    // Vérifier si le produit est déjà en cache dans la liste
    const cachedProduct = products.value.find((p) => p.id === id)
    if (cachedProduct) {
      currentProduct.value = cachedProduct
      return currentProduct.value
    }

    loading.value = true
    error.value = null
    currentProduct.value = null
    try {
      currentProduct.value = await fetchProductById(id)
    } catch (e) {
      error.value = `Failed to load product ${id}`
      console.error(e)
    } finally {
      loading.value = false
    }

    return currentProduct.value
  }

  return {
    products,
    currentProduct,
    loading,
    error,
    loadProducts,
    loadProduct,
  }
})
