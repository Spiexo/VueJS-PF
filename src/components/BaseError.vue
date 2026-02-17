<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="error-alert">
    <h3>Error</h3>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.error-alert {
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

h3 {
  margin-top: 0;
  font-size: 1.1rem;
}
</style>
