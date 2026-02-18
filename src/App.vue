<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cart.store'
import { useCurrencyStore } from '@/stores/currency.store'

const cartStore = useCartStore()
const currencyStore = useCurrencyStore()

onMounted(() => {
  currencyStore.fetchRates()
})
</script>

<template>
  <div class="app-container">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/products">Products</RouterLink>
          <RouterLink to="/cart">
            Cart
            <span v-if="cartStore.totalItems > 0" class="cart-badge">
              ({{ cartStore.totalItems }})
            </span>
          </RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <RouterView v-slot="{ Component }">
        <KeepAlive include="ContactView">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  padding: 1rem 0;
  border-bottom: 1px solid var(--lg-border);
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 15, 0.6);
  backdrop-filter: blur(var(--lg-blur-heavy));
  -webkit-backdrop-filter: blur(var(--lg-blur-heavy));
}

.wrapper {
  display: flex;
  justify-content: center;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}

nav a.router-link-exact-active {
  color: var(--lg-accent);
  font-weight: 600;
  background: var(--lg-accent-soft);
}

nav a {
  display: inline-block;
  padding: 0.5rem 1.2rem;
  border-radius: var(--lg-radius-pill);
  text-decoration: none;
  color: var(--lg-text-secondary);
  transition: all 0.3s ease;
  font-weight: 500;
  border: none;
}

nav a:hover {
  color: var(--lg-text-primary);
  background: var(--lg-surface-hover);
}

.cart-badge {
  font-weight: 700;
  color: var(--lg-accent);
}

main {
  min-height: 80vh;
}
</style>
