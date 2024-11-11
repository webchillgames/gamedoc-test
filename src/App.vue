<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
</script>

<template>
  <div class="app">
    <MainHeader />
    <RouterView />
  </div>
</template>

<style lang="css">
@import '@/styles/variables.css';

#app,
body,
html,
.app {
  height: 100%;
}

body {
  background-color: var(--dark);
  font-family: var(--font-family);
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 156%;
  margin: 0;
  color: var(--white);
}

.app {
  max-width: 1600px;
  margin: 0 auto;
}

/* где хранить? */
.accent-button {
  border-radius: 32px;
  padding: 12px 24px;
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  display: flex;
  align-items: center;
  background-color: var(--green-light);
  border: 0;
  color: var(--white);
}
</style>
