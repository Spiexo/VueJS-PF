<script setup lang="ts">
import type { Product } from '@/types/product'
import { useCartStore } from '@/stores/cart.store'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="product-card">
    <RouterLink :to="'/product/' + product.id" style="padding: 0">
      <div class="image-container">
        <img :src="product.image" :alt="product.title" loading="lazy" />
      </div>
      <div class="content">
        <h3 class="title" :title="product.title">
          {{ product.title }}
        </h3>
        <p class="category">{{ product.category }}</p>
        <div class="footer">
          <span class="price">${{ product.price.toFixed(2) }}</span>
          <button @click="cartStore.addToCart(product)" class="add-btn">Add to Cart</button>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  background-color: var(--color-background-soft);
  height: 100%;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-container {
  height: 200px;
  background-color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  color: black;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  height: 2.8em; /* 2 lines */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.title a {
  color: var(--color-heading);
  text-decoration: none;
}

.title a:hover {
  color: hsla(160, 100%, 37%, 1);
}

.category {
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.8;
  text-transform: capitalize;
  margin-bottom: 1rem;
}

.footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: bold;
  font-size: 1.1rem;
}

.add-btn {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: hsla(160, 100%, 30%, 1);
}
</style>
