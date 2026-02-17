<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product.store'
import { useCartStore } from '@/stores/cart.store'
import { useCurrencyStore } from '@/stores/currency.store'
import BaseLoader from '@/components/BaseLoader.vue'
import BaseError from '@/components/BaseError.vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const currencyStore = useCurrencyStore()

const isAdded = ref(false)

const handleAddToCart = () => {
  if (productStore.currentProduct) {
    cartStore.addToCart(productStore.currentProduct)
    isAdded.value = true
    setTimeout(() => {
      isAdded.value = false
    }, 1000)
  }
}

const loadData = () => {
  const id = Number(route.params.id)
  if (id) {
    productStore.loadProduct(id)
  }
}

onMounted(loadData)
watch(() => route.params.id, loadData)
</script>

<template>
  <div class="product-detail">
    <BaseLoader v-if="productStore.loading" />
    <BaseError v-else-if="productStore.error" :message="productStore.error" />

    <div v-else-if="productStore.currentProduct" class="product-container">
      <div class="image-section">
        <img :src="productStore.currentProduct.image" :alt="productStore.currentProduct.title" />
      </div>

      <div class="info-section">
        <span class="category">{{ productStore.currentProduct.category }}</span>
        <h1>{{ productStore.currentProduct.title }}</h1>
        <p class="price">
          {{ currencyStore.currentSymbol
          }}{{ currencyStore.convertPrice(productStore.currentProduct.price) }}
        </p>

        <p class="description">{{ productStore.currentProduct.description }}</p>

        <button
          @click="handleAddToCart"
          class="add-to-cart-btn"
          :class="{ added: isAdded }"
          :disabled="isAdded"
        >
          {{ isAdded ? 'Added!' : 'Add to Cart' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 2rem;
}

.image-section {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
}

img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.info-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: hsla(160, 100%, 37%, 1);
  margin-bottom: 1.5rem;
}

.description {
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.add-to-cart-btn {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: start;
  min-width: 160px;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: hsla(160, 100%, 30%, 1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.add-to-cart-btn.added {
  background-color: #4ade80; /* Green check color */
  transform: scale(1.05);
}

.add-to-cart-btn:disabled {
  cursor: default;
  transform: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
