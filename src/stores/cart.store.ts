import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'

export interface CartItem extends Product {
  quantity: number
}

const STORAGE_KEY = 'cart-cache'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  // ── Persistance localStorage ──

  const saveToStorage = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data: items.value,
        timestamp: Date.now(),
      }),
    )
  }

  const loadFromStorage = (): { data: CartItem[]; timestamp: number | null } => {
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
    items.value = cached.data
  }

  // ── Computed ──

  const totalItems = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))
  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0),
  )

  // ── Actions ──

  function addToCart(product: Product) {
    const existingItem = items.value.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    saveToStorage()
  }

  function removeFromCart(id: number) {
    const index = items.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
    saveToStorage()
  }

  function updateQuantity(id: number, quantity: number) {
    const item = items.value.find((item) => item.id === id)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeFromCart(id)
        return
      }
    }
    saveToStorage()
  }

  function clearCart() {
    items.value = []
    saveToStorage()
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
})
