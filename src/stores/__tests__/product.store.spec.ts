import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductStore } from '../product.store'

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 10,
    description: 'Description 1',
    category: 'cat1',
    image: 'https://example.com/1.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 20,
    description: 'Description 2',
    category: 'cat2',
    image: 'https://example.com/2.jpg',
  },
]

// Mock de l'API
vi.mock('@/api/product.api', () => ({
  fetchProducts: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      description: 'Description 1',
      category: 'cat1',
      image: 'https://example.com/1.jpg',
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20,
      description: 'Description 2',
      category: 'cat2',
      image: 'https://example.com/2.jpg',
    },
  ]),
  fetchProductById: vi.fn().mockImplementation((id: number) =>
    Promise.resolve({
      id,
      title: `Product ${id}`,
      price: id * 10,
      description: `Description ${id}`,
      category: `cat${id}`,
      image: `https://example.com/${id}.jpg`,
    }),
  ),
}))

describe('Product Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should start with empty products', () => {
    const store = useProductStore()
    expect(store.products).toHaveLength(0)
    expect(store.currentProduct).toBeNull()
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should load products', async () => {
    const store = useProductStore()
    await store.loadProducts()

    expect(store.products).toHaveLength(2)
    expect(store.products[0]!.title).toBe('Product 1')
    expect(store.loading).toBe(false)
  })

  it('should load a single product by id', async () => {
    const store = useProductStore()
    await store.loadProduct(3)

    expect(store.currentProduct).not.toBeNull()
    expect(store.currentProduct!.id).toBe(3)
    expect(store.currentProduct!.title).toBe('Product 3')
  })

  it('should use cached product from products list', async () => {
    const store = useProductStore()
    const { fetchProductById } = await import('@/api/product.api')

    await store.loadProducts()
    vi.clearAllMocks() // Reset mock call counts after loadProducts

    await store.loadProduct(1)

    // Should NOT have called fetchProductById since product is already in the list
    expect(fetchProductById).not.toHaveBeenCalled()
    expect(store.currentProduct!.id).toBe(1)
  })

  it('should use cache when data is fresh', async () => {
    const store = useProductStore()
    const { fetchProducts } = await import('@/api/product.api')

    await store.loadProducts()
    vi.clearAllMocks()

    await store.loadProducts() // second call should use cache

    expect(fetchProducts).not.toHaveBeenCalled()
  })

  it('should force refresh when requested', async () => {
    const store = useProductStore()
    const { fetchProducts } = await import('@/api/product.api')

    await store.loadProducts()
    vi.clearAllMocks()

    await store.loadProducts(true) // force refresh

    expect(fetchProducts).toHaveBeenCalledTimes(1)
  })

  it('should persist to localStorage', async () => {
    const store = useProductStore()
    await store.loadProducts()

    const stored = localStorage.getItem('products-cache')
    expect(stored).not.toBeNull()

    const parsed = JSON.parse(stored!)
    expect(parsed.data).toHaveLength(2)
    expect(parsed.timestamp).toBeDefined()
  })

  it('should restore from localStorage', () => {
    localStorage.setItem(
      'products-cache',
      JSON.stringify({
        data: mockProducts,
        timestamp: Date.now(),
      }),
    )

    const store = useProductStore()
    expect(store.products).toHaveLength(2)
    expect(store.products[0]!.title).toBe('Product 1')
  })
})
