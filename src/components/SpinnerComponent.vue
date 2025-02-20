<template>
  <div class="loading-ring"></div>
</template>

<script setup>
/* No JavaScript logic is needed here. */
</script>

<style scoped lang="scss">
.loading-container {
  width: 100%;
}

.loading-ring {
  width: 80px;
  height: 80px;
  margin: 0 auto;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #000;
    border-color: #000 transparent #000 transparent;
    animation: loading-ring 1.2s linear infinite;
  }
}

@keyframes loading-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
