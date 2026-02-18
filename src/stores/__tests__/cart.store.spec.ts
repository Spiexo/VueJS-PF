import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../cart.store'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    description: 'A test product',
    category: 'test',
    image: 'https://example.com/test.jpg',
  }

  it('should start with an empty cart', () => {
    const cart = useCartStore()
    expect(cart.items).toHaveLength(0)
    expect(cart.totalItems).toBe(0)
    expect(cart.totalPrice).toBe(0)
  })

  it('should add a product to the cart', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)

    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]!.id).toBe(1)
    expect(cart.items[0]!.quantity).toBe(1)
    expect(cart.totalItems).toBe(1)
  })

  it('should increment quantity if product already in cart', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)
    cart.addToCart(mockProduct)

    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]!.quantity).toBe(2)
    expect(cart.totalItems).toBe(2)
  })

  it('should calculate total price correctly', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)
    cart.addToCart(mockProduct)

    expect(cart.totalPrice).toBeCloseTo(59.98, 2)
  })

  it('should remove a product from the cart', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)
    cart.removeFromCart(1)

    expect(cart.items).toHaveLength(0)
    expect(cart.totalItems).toBe(0)
  })

  it('should update quantity', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)
    cart.updateQuantity(1, 5)

    expect(cart.items[0]!.quantity).toBe(5)
    expect(cart.totalItems).toBe(5)
  })

  it('should remove item when quantity is set to 0', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)
    cart.updateQuantity(1, 0)

    expect(cart.items).toHaveLength(0)
  })

  it('should clear all items', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)
    cart.addToCart({ ...mockProduct, id: 2, title: 'Product 2' })
    cart.clearCart()

    expect(cart.items).toHaveLength(0)
    expect(cart.totalItems).toBe(0)
    expect(cart.totalPrice).toBe(0)
  })

  it('should persist to localStorage', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)

    const stored = localStorage.getItem('cart-cache')
    expect(stored).not.toBeNull()

    const parsed = JSON.parse(stored!)
    expect(parsed.data).toHaveLength(1)
    expect(parsed.data[0]!.id).toBe(1)
    expect(parsed.timestamp).toBeDefined()
  })

  it('should restore from localStorage', () => {
    localStorage.setItem(
      'cart-cache',
      JSON.stringify({
        data: [{ ...mockProduct, quantity: 3 }],
        timestamp: Date.now(),
      }),
    )

    const cart = useCartStore()
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]!.quantity).toBe(3)
  })
})
