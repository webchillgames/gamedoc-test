<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
</script>

<template>
  <AppButton class="exit-modal">
    <p>Выйти</p>
  </AppButton>
</template>

<style lang="css">
.exit-modal {
  font-weight: 700;
  color: var(--green-light);
  box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  padding: 40px;
  background-color: var(--dark-middle);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 9px;
  position: absolute;
  cursor: pointer;
  z-index: 100;
}

.exit-modal::after {
  content: '';
  position: absolute;
  top: 0;
  right: 20px;
  transform: translate(0, -100%);
  border: 9px solid transparent;
  border-bottom: 9px solid var(--dark-middle);
}
</style>
