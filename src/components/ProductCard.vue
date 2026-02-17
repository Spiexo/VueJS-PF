<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import type { Product } from '@/types/product'
import { useCurrencyStore } from '@/stores/currency.store'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>()

const router = useRouter()
const currencyStore = useCurrencyStore()

const isAdded = ref(false)

const navigateToProduct = () => {
  router.push(`/product/${props.product.id}`)
}

const handleAddToCart = () => {
  emit('add-to-cart', props.product)
  isAdded.value = true
  setTimeout(() => {
    isAdded.value = false
  }, 1000)
}
</script>

<template>
  <div class="product-card" @click="navigateToProduct">
    <div class="image-container">
      <img :src="product.image" :alt="product.title" loading="lazy" />
    </div>
    <div class="content">
      <h3 class="title" :title="product.title">
        {{ product.title }}
      </h3>
      <p class="category">{{ product.category }}</p>
      <div class="footer">
        <span class="price"
          >{{ currencyStore.currentSymbol }}{{ currencyStore.convertPrice(product.price) }}</span
        >
        <button
          @click.stop="handleAddToCart"
          class="add-btn"
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
  cursor: pointer;
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
  transition: all 0.3s ease;
  min-width: 100px;
}

.add-btn:hover:not(:disabled) {
  background-color: hsla(160, 100%, 30%, 1);
}

.add-btn.added {
  background-color: #4ade80; /* Green check color */
  transform: scale(1.05);
}

.add-btn:disabled {
  cursor: default;
}
</style>
