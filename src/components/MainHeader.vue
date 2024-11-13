<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
import AppLogo from '@/elements/AppLogo.vue'
import CAuth from './CAuth.vue'
import { ref } from 'vue'
const showModal = ref(true)
</script>

<template>
  <div class="main-header">
    <AppLogo />
    <AppButton @click="showModal = true" class="main-header__auth-button accent-button">
      <span class="main-header__auth-icon"></span>
      Вход
    </AppButton>

    <AppButton class="main-header__profile-button">
      e-mail@mail.mail
      <span></span>
    </AppButton>

    <CAuth v-model="showModal" @close="showModal = false" />
  </div>
</template>

<style lang="css">
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
}

.main-header__auth-icon {
  width: 32px;
  height: 32px;
  display: block;
  background-image: url('@/assets/auth-icon.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 0 0;
  margin-right: 12px;
}

.main-header__profile-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 0;
  color: var(--white);
}

.main-header__profile-button span {
  margin-left: 12px;
  width: 56px;
  height: 56px;
  display: block;
  background-image: url('@/assets/user-icon.svg');
  background-repeat: no-repeat;
  background-size: 20px 28px;
  background-position: center;
  border-radius: 50%;
  background-color: var(--dark-middle);
}

.main-header__auth-button {
  margin-left: 22px;
}

@media (max-width: 1366px) {
  .main-header {
    padding: 20px 0;
  }
}
</style>
