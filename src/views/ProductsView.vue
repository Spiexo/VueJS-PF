<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart.store'
import { useProductStore } from '@/stores/product.store'
import { useCurrencyStore } from '@/stores/currency.store'
import ProductCard from '@/components/ProductCard.vue'
import BaseLoader from '@/components/BaseLoader.vue'
import BaseError from '@/components/BaseError.vue'

const productStore = useProductStore()
const cartStore = useCartStore()
const currencyStore = useCurrencyStore()

const searchQuery = ref('')

const filteredProducts = computed(() => {
  return productStore.products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.loadProducts()
  }
})
</script>

<template>
  <div class="products-view">
    <h1>Our Products</h1>

    <div class="controls-container">
      <div class="search-container">
        <svg
          class="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="search-input"
        />
      </div>

      <div class="currency-container">
        <select
          :value="currencyStore.currency"
          @change="(e) => currencyStore.setCurrency((e.target as HTMLSelectElement).value)"
          class="currency-select"
        >
          <option v-for="curr in ['USD', 'EUR', 'GBP', 'JPY']" :key="curr" :value="curr">
            {{ curr }}
          </option>
        </select>
      </div>
    </div>

    <BaseLoader v-if="productStore.loading" />
    <BaseError v-else-if="productStore.error" :message="productStore.error" />

    <div v-else class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="cartStore.addToCart"
      />
    </div>
  </div>
</template>

<style scoped>
.products-view {
  padding: 1rem 0;
}

h1 {
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--lg-text-primary);
}

.controls-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.search-container {
  flex-grow: 1;
  max-width: 420px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--lg-text-tertiary);
  pointer-events: none;
}

.search-input {
  padding: 0.8rem 1.2rem 0.8rem 2.8rem;
  border-radius: var(--lg-radius-pill);
  border: 1px solid var(--lg-border);
  width: 100%;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
  background: var(--lg-surface);
  color: var(--lg-text-primary);
  backdrop-filter: blur(var(--lg-blur));
}

.search-input::placeholder {
  color: var(--lg-text-tertiary);
}

.search-input:focus {
  border-color: var(--lg-accent);
  box-shadow: 0 0 20px var(--lg-accent-glow);
  background: var(--lg-surface-hover);
}

.currency-select {
  padding: 0.8rem 2.5rem 0.8rem 1.2rem;
  border-radius: var(--lg-radius-pill);
  border: 1px solid var(--lg-border);
  font-size: 0.95rem;
  outline: none;
  background: var(--lg-surface);
  color: var(--lg-text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 1em;
  backdrop-filter: blur(var(--lg-blur));
}

.currency-select option {
  background: #1a1a2e;
  color: var(--lg-text-primary);
}

.currency-select:focus {
  border-color: var(--lg-accent);
  box-shadow: 0 0 20px var(--lg-accent-glow);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
}
</style>
