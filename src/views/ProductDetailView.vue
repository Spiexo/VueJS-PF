<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product.store'
import { useCartStore } from '@/stores/cart.store'
import BaseLoader from '@/components/BaseLoader.vue'
import BaseError from '@/components/BaseError.vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

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
        <p class="price">${{ productStore.currentProduct.price.toFixed(2) }}</p>

        <p class="description">{{ productStore.currentProduct.description }}</p>

        <button @click="cartStore.addToCart(productStore.currentProduct!)" class="add-to-cart-btn">
          Add to Cart
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
  transition: all 0.2s;
  align-self: start;
}

.add-to-cart-btn:hover {
  background-color: hsla(160, 100%, 30%, 1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
