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
          {{ isAdded ? 'Added' : 'Add to Cart' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: var(--lg-surface);
  backdrop-filter: blur(var(--lg-blur));
  -webkit-backdrop-filter: blur(var(--lg-blur));
  border: 1px solid var(--lg-border);
  border-radius: var(--lg-radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  height: 100%;
  cursor: pointer;
  box-shadow: var(--lg-inset-shadow), var(--lg-shadow-sm);
}

.product-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: var(--lg-border-strong);
  box-shadow:
    var(--lg-inset-shadow),
    var(--lg-shadow),
    0 0 40px rgba(100, 210, 255, 0.06);
  background: var(--lg-surface-hover);
}

.image-container {
  height: 200px;
  background: rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--lg-border);
}

img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  color: var(--lg-text-primary);
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 0.4rem 0;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.category {
  font-size: 0.75rem;
  color: var(--lg-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 1rem;
}

.footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--lg-accent);
}

.add-btn {
  background: var(--lg-accent-soft);
  color: var(--lg-accent);
  border: 1px solid rgba(100, 210, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: var(--lg-radius-pill);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  min-width: 100px;
  backdrop-filter: blur(10px);
}

.add-btn:hover:not(:disabled) {
  background: rgba(100, 210, 255, 0.25);
  border-color: var(--lg-accent);
  box-shadow: 0 0 16px var(--lg-accent-glow);
}

.add-btn.added {
  background: var(--lg-success-soft);
  color: var(--lg-success);
  border-color: rgba(48, 209, 88, 0.3);
  transform: scale(1.05);
}

.add-btn:disabled {
  cursor: default;
}
</style>
