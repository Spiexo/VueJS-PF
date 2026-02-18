<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid var(--lg-border);
  border-top: 3px solid var(--lg-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  box-shadow: 0 0 16px var(--lg-accent-glow);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
