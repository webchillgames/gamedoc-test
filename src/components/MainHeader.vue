<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
import AppLogo from '@/elements/AppLogo.vue'
import CAuth from './CAuth.vue'
</script>

<template>
  <div class="main-header">
    <AppLogo />
    <AppButton class="main-header__exit-button accent-button">
      <span class="main-header__exit-icon"></span>
      Вход
    </AppButton>
    <CAuth />
  </div>
</template>

<style lang="css">
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
}

.main-header__exit-icon {
  width: 32px;
  height: 32px;
  display: block;
  background-image: url('@/assets/exit-icon.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 0 0;
  margin-right: 12px;
}

.main-header__exit-button {
  margin-left: 22px;
}

@media (max-width: 1366px) {
  .main-header {
    padding: 20px 0;
  }
}
</style>
