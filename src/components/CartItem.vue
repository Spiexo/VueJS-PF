<script setup lang="ts">
import type { CartItem } from '@/stores/cart.store'
import { useCartStore } from '@/stores/cart.store'

defineProps<{
  item: CartItem
}>()

const cartStore = useCartStore()
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
      <p class="unit-price">${{ item.price.toFixed(2) }}</p>
    </div>

    <div class="actions">
      <div class="quantity-controls">
        <button
          @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
          :disabled="item.quantity <= 1"
          class="qty-btn"
        >
          -
        </button>
        <span class="qty">{{ item.quantity }}</span>
        <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="qty-btn">
          +
        </button>
      </div>
      <div class="total">${{ (item.price * item.quantity).toFixed(2) }}</div>
      <button
        @click="cartStore.removeFromCart(item.id)"
        class="remove-btn"
        aria-label="Remove item"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  gap: 1.5rem;
}

.image-wrapper {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  padding: 0.5rem;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.details {
  flex-grow: 1;
}

.details h3 {
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}

.details h3 a {
  color: var(--color-heading);
  text-decoration: none;
}

.unit-price {
  color: var(--color-text);
  opacity: 0.8;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  overflow: hidden;
}

.qty-btn {
  background: var(--color-background-mute);
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--color-text);
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-btn:hover:not(:disabled) {
  background: var(--color-background-soft);
}

.qty {
  width: 40px;
  text-align: center;
  font-weight: 500;
}

.total {
  font-weight: bold;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-text);
  cursor: pointer;
  opacity: 0.5;
  padding: 0 0.5rem;
}

.remove-btn:hover {
  opacity: 1;
  color: #ef4444;
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
