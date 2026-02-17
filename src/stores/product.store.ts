import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/product'
import { fetchProducts, fetchProductById } from '@/api/product.api'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadProducts() {
    loading.value = true
    error.value = null
    try {
      products.value = await fetchProducts()
    } catch (e) {
      error.value = 'Failed to load products'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function loadProduct(id: number) {
    loading.value = true
    error.value = null
    currentProduct.value = null // Reset current product
    try {
      currentProduct.value = await fetchProductById(id)
    } catch (e) {
      error.value = `Failed to load product ${id}`
      console.error(e)
    } finally {
      loading.value = false
    }
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
