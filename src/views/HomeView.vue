<script setup lang="ts"></script>

<template>
  <div class="home">
    <div class="hero">
      <div class="hero-glow"></div>
      <h1>Welcome to Vue Shop</h1>
      <p>The best place to find everything you need.</p>
      <RouterLink to="/products" class="cta-button">
        <span>Shop Now</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  position: relative;
}

.hero {
  position: relative;
  z-index: 1;
}

.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(100, 210, 255, 0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, var(--lg-accent) 50%, #a78bfa 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: var(--lg-text-secondary);
  font-weight: 400;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--lg-accent-soft);
  color: var(--lg-accent);
  padding: 0.9rem 2rem;
  border-radius: var(--lg-radius-pill);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  border: 1px solid rgba(100, 210, 255, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.cta-button:hover {
  background: rgba(100, 210, 255, 0.25);
  border-color: var(--lg-accent);
  box-shadow: 0 0 30px var(--lg-accent-glow);
  transform: translateY(-2px);
}
</style>
