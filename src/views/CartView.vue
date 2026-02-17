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
      <p>Your cart is empty.</p>
      <RouterLink to="/products" class="continue-shopping">Start Shopping</RouterLink>
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
}

.empty-cart {
  text-align: center;
  padding: 4rem 0;
  color: var(--color-text);
}

.continue-shopping {
  display: inline-block;
  margin-top: 1rem;
  color: hsla(160, 100%, 37%, 1);
  text-decoration: none;
  font-weight: bold;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-summary {
  background: var(--color-background-soft);
  padding: 1.5rem;
  border-radius: 12px;
  height: fit-content;
  border: 1px solid var(--color-border);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.total {
  font-weight: bold;
  font-size: 1.3rem;
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
  margin-top: 1rem;
}

.checkout-btn {
  width: 100%;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: background-color 0.2s;
}

.checkout-btn:hover {
  background-color: hsla(160, 100%, 30%, 1);
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}
</style>
