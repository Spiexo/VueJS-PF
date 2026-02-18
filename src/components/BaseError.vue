<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="error-alert">
    <h3>⚠ Error</h3>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.error-alert {
  background: var(--lg-error-soft);
  border: 1px solid rgba(255, 69, 58, 0.3);
  color: var(--lg-error);
  padding: 1.2rem 1.5rem;
  border-radius: var(--lg-radius-sm);
  margin: 1rem 0;
  backdrop-filter: blur(var(--lg-blur));
}

h3 {
  margin-top: 0;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

p {
  opacity: 0.85;
  margin: 0;
  font-size: 0.95rem;
}
</style>
