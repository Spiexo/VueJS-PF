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
}

.controls-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-container {
  flex-grow: 1;
  max-width: 400px;
}

.search-input {
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  border: 1px solid var(--color-border);
  width: 100%;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  background-color: var(--color-background);
  color: var(--color-text);
}

.search-input:focus {
  border-color: hsla(160, 100%, 37%, 1);
}

.currency-select {
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  border: 1px solid var(--color-border);
  font-size: 1rem;
  outline: none;
  background-color: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  transition: border-color 0.2s;
  appearance: none; /* Remove default arrow */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  padding-right: 2.5rem;
}

.currency-select:focus {
  border-color: hsla(160, 100%, 37%, 1);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}
</style>
