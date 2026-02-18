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
          {{ isAdded ? '✓ Added!' : 'Add to Cart' }}
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
  background: var(--lg-surface);
  backdrop-filter: blur(var(--lg-blur));
  -webkit-backdrop-filter: blur(var(--lg-blur));
  padding: 3rem;
  border-radius: var(--lg-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--lg-border);
  box-shadow: var(--lg-inset-shadow), var(--lg-shadow-sm);
}

img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4));
}

.info-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8rem;
  color: var(--lg-text-tertiary);
  font-weight: 500;
  margin-bottom: 0.75rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  color: var(--lg-text-primary);
  letter-spacing: -0.02em;
}

.price {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--lg-accent);
  margin-bottom: 1.5rem;
}

.description {
  line-height: 1.7;
  margin-bottom: 2.5rem;
  color: var(--lg-text-secondary);
  font-size: 0.95rem;
}

.add-to-cart-btn {
  background: var(--lg-accent-soft);
  color: var(--lg-accent);
  border: 1px solid rgba(100, 210, 255, 0.2);
  padding: 1rem 2.5rem;
  border-radius: var(--lg-radius-pill);
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: start;
  min-width: 180px;
  backdrop-filter: blur(10px);
}

.add-to-cart-btn:hover:not(:disabled) {
  background: rgba(100, 210, 255, 0.25);
  border-color: var(--lg-accent);
  box-shadow: 0 0 30px var(--lg-accent-glow);
  transform: translateY(-2px);
}

.add-to-cart-btn.added {
  background: var(--lg-success-soft);
  color: var(--lg-success);
  border-color: rgba(48, 209, 88, 0.3);
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
