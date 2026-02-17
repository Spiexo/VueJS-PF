<script setup lang="ts"></script>

<template>
  <div class="home">
    <div class="hero">
      <h1>Welcome to Vue Shop</h1>
      <p>The best place to find everything you need.</p>
      <RouterLink to="/products" class="cta-button">Shop Now</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.cta-button {
  display: inline-block;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition:
    transform 0.2s,
    background-color 0.2s;
}

.cta-button:hover {
  background-color: hsla(160, 100%, 30%, 1);
  transform: translateY(-2px);
}
</style>
