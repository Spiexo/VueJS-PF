<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/product.store'
import ProductCard from '@/components/ProductCard.vue'
import BaseLoader from '@/components/BaseLoader.vue'
import BaseError from '@/components/BaseError.vue'

const productStore = useProductStore()

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.loadProducts()
  }
})
</script>

<template>
  <div class="products-view">
    <h1>Our Products</h1>

    <BaseLoader v-if="productStore.loading" />
    <BaseError v-else-if="productStore.error" :message="productStore.error" />

    <div v-else class="product-grid">
      <ProductCard v-for="product in productStore.products" :key="product.id" :product="product" />
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

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}
</style>
