<script setup lang="ts">
import { useCartStore } from '@/stores/cart.store'
import { useCurrencyStore } from '@/stores/currency.store'
import CartItem from '@/components/CartItem.vue'

const cartStore = useCartStore()
const currencyStore = useCurrencyStore()
</script>

<template>
  <div class="cart-view">
    <h1>Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <p>Your cart is empty.</p>
      <RouterLink to="/products" class="continue-shopping">Start Shopping →</RouterLink>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <CartItem
          v-for="item in cartStore.items"
          :key="item.id"
          :item="item"
          @update-quantity="cartStore.updateQuantity"
          @remove="cartStore.removeFromCart"
        />
      </div>

      <div class="cart-summary">
        <h2>Summary</h2>
        <div class="summary-row">
          <span>Items ({{ cartStore.totalItems }})</span>
          <span
            >{{ currencyStore.currentSymbol
            }}{{ currencyStore.convertPrice(cartStore.totalPrice) }}</span
          >
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span
            >{{ currencyStore.currentSymbol
            }}{{ currencyStore.convertPrice(cartStore.totalPrice) }}</span
          >
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  padding: 1rem 0;
}

h1 {
  margin-bottom: 2rem;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--lg-text-primary);
  letter-spacing: -0.02em;
}

.empty-cart {
  text-align: center;
  padding: 5rem 0;
  color: var(--lg-text-secondary);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.4;
}

.continue-shopping {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
  color: var(--lg-accent);
  text-decoration: none;
  font-weight: 600;
  padding: 0.7rem 1.5rem;
  border-radius: var(--lg-radius-pill);
  background: var(--lg-accent-soft);
  border: 1px solid rgba(100, 210, 255, 0.2);
  transition: all 0.3s ease;
}

.continue-shopping:hover {
  background: rgba(100, 210, 255, 0.25);
  box-shadow: 0 0 20px var(--lg-accent-glow);
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  background: var(--lg-surface);
  backdrop-filter: blur(var(--lg-blur));
  -webkit-backdrop-filter: blur(var(--lg-blur));
  border: 1px solid var(--lg-border);
  border-radius: var(--lg-radius);
  overflow: hidden;
  box-shadow: var(--lg-inset-shadow), var(--lg-shadow-sm);
}

.cart-summary {
  background: var(--lg-surface);
  backdrop-filter: blur(var(--lg-blur));
  -webkit-backdrop-filter: blur(var(--lg-blur));
  padding: 1.5rem;
  border-radius: var(--lg-radius);
  height: fit-content;
  border: 1px solid var(--lg-border);
  box-shadow: var(--lg-inset-shadow), var(--lg-shadow-sm);
}

.cart-summary h2 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--lg-text-primary);
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: var(--lg-text-secondary);
}

.total {
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--lg-text-primary);
  border-top: 1px solid var(--lg-border);
  padding-top: 1rem;
  margin-top: 1rem;
}

.total span:last-child {
  color: var(--lg-accent);
}

.checkout-btn {
  width: 100%;
  background: var(--lg-accent-soft);
  color: var(--lg-accent);
  border: 1px solid rgba(100, 210, 255, 0.2);
  padding: 1rem;
  border-radius: var(--lg-radius-pill);
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.checkout-btn:hover {
  background: rgba(100, 210, 255, 0.25);
  border-color: var(--lg-accent);
  box-shadow: 0 0 30px var(--lg-accent-glow);
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}
</style>
