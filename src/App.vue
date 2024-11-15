<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import { ModalsContainer } from 'vue-final-modal'
import { useUser } from './composables/user'
import { onMounted, ref } from 'vue'

const isLoading = ref(true)

const { updateUserInfo } = useUser()

onMounted(async () => {
  try {
    isLoading.value = true
    await updateUserInfo()
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="app">
    <template v-if="!isLoading">
      <MainHeader />
      <RouterView />
    </template>

    <ModalsContainer />
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

button,
a {
  cursor: pointer;
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

* {
  box-sizing: border-box;
}

.app {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;
}

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
  transition: all 0.2s;
}

.accent-button svg {
  flex-shrink: 0;
}

.accent-button:hover {
  background-color: var(--green-middle);
}

.accent-button:active {
  background-color: var(--green-dark);
}

.accent-button:disabled {
  background-color: var(--grey);
}

.error-message {
  color: #ff7461;
}

.error-visible .error-message {
  padding: 8px 24px;
  margin-bottom: 16px;
}

.error-message p {
  margin: 0;
}

.error-visible input,
.error-visible .custom-input input {
  margin-bottom: 0;
}

.custom-input {
  position: relative;
}

.custom-input button {
  position: absolute;
  background-size: 18px 14px;
  background-position: center;
  height: 100%;
  background-repeat: no-repeat;
  top: 0;
  right: 0;
  z-index: 1;
  width: 80px;
  padding: 0;
  transition: all 0.2s;
}

.custom-input--password button {
  background-image: url('@/assets/closed-eye.svg');
}

.custom-input--password-visible button {
  background-image: url('@/assets/opened-eye.svg');
}

@media (max-width: 1366px) {
  .app {
    max-width: 1205px;
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .app {
    max-width: 688px;
    width: 100%;
  }
}

@media (max-width: 360px) {
  .app {
    max-width: 320px;
    width: 100%;
  }
}
</style>
