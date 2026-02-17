<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cart.store'

const cartStore = useCartStore()
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
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 2rem;
}

.wrapper {
  display: flex;
  justify-content: center;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
  font-weight: bold;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
  color: var(--color-text);
  transition: color 0.2s;
}

nav a:first-of-type {
  border: 0;
}

nav a:hover {
  color: hsla(160, 100%, 37%, 1);
}

.cart-badge {
  font-weight: bold;
  color: hsla(160, 100%, 37%, 1);
}

main {
  min-height: 80vh;
}
</style>
