<script setup lang="ts">
import { ref } from 'vue'
import type { CartItem } from '@/stores/cart.store'
import { useCurrencyStore } from '@/stores/currency.store'

defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  (e: 'update-quantity', id: number, quantity: number): void
  (e: 'remove', id: number): void
}>()

const currencyStore = useCurrencyStore()
</script>

<template>
  <div class="cart-item">
    <div class="image-wrapper">
      <img :src="item.image" :alt="item.title" />
    </div>

    <div class="details">
      <h3>
        <RouterLink :to="'/product/' + item.id">{{ item.title }}</RouterLink>
      </h3>
      <p class="unit-price">
        {{ currencyStore.currentSymbol }}{{ currencyStore.convertPrice(item.price) }}
      </p>
    </div>

    <div class="actions">
      <div class="quantity-controls">
        <button
          @click="emit('update-quantity', item.id, item.quantity - 1)"
          :disabled="item.quantity <= 1"
          class="qty-btn"
        >
          −
        </button>
        <span class="qty">{{ item.quantity }}</span>
        <button @click="emit('update-quantity', item.id, item.quantity + 1)" class="qty-btn">
          +
        </button>
      </div>
      <div class="total">
        {{ currencyStore.currentSymbol
        }}{{ currencyStore.convertPrice(item.price * item.quantity) }}
      </div>
      <button @click="emit('remove', item.id)" class="remove-btn" aria-label="Remove item">
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 1.2rem;
  border-bottom: 1px solid var(--lg-border);
  gap: 1.5rem;
  transition: background 0.3s ease;
}

.cart-item:hover {
  background: var(--lg-surface);
}

.image-wrapper {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--lg-radius-sm);
  border: 1px solid var(--lg-border);
  padding: 0.5rem;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
}

.details {
  flex-grow: 1;
}

.details h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.4rem 0;
}

.details h3 a {
  color: var(--lg-text-primary);
  text-decoration: none;
  transition: color 0.2s;
}

.details h3 a:hover {
  color: var(--lg-accent);
}

.unit-price {
  color: var(--lg-text-tertiary);
  font-size: 0.85rem;
}

.actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  background: var(--lg-surface);
  border: 1px solid var(--lg-border);
  border-radius: var(--lg-radius-pill);
  overflow: hidden;
}

.qty-btn {
  background: transparent;
  border: none;
  width: 34px;
  height: 34px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--lg-text-secondary);
  transition: all 0.2s;
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-btn:hover:not(:disabled) {
  background: var(--lg-surface-hover);
  color: var(--lg-accent);
}

.qty {
  width: 36px;
  text-align: center;
  font-weight: 600;
  color: var(--lg-text-primary);
  font-size: 0.95rem;
}

.total {
  font-weight: 700;
  min-width: 80px;
  text-align: right;
  color: var(--lg-accent);
  font-size: 1.05rem;
}

.remove-btn {
  background: var(--lg-error-soft);
  border: 1px solid rgba(255, 69, 58, 0.2);
  font-size: 1.2rem;
  color: var(--lg-error);
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: rgba(255, 69, 58, 0.25);
  border-color: var(--lg-error);
  box-shadow: 0 0 12px rgba(255, 69, 58, 0.3);
}

@media (max-width: 640px) {
  .cart-item {
    flex-wrap: wrap;
  }

  .actions {
    width: 100%;
    justify-content: space-between;
    margin-top: 1rem;
  }
}
</style>
