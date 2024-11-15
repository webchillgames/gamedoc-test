<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth } from '@/services/auth'

import AppButton from '@/elements/AppButton.vue'
import AppLogo from '@/elements/AppLogo.vue'
import CAuth from './CAuth.vue'

import CExitModal from './CExitModal.vue'
import { useUser } from '@/composables/user'

const router = useRouter()
const route = useRoute()
const { user } = useUser()

const isModalIntranceVisible = ref(false)
const isModalExitVisible = ref(false)

watchEffect(() => (isModalIntranceVisible.value = route.query.auth !== undefined))

function onEntranceClick() {
  router.push({ query: { auth: 'login' } })
}

function onCloseAuthModal() {
  router.replace({ query: undefined })
}

async function onExitClick() {
  try {
    await auth.logout()
    user.value = null
    isModalExitVisible.value = false
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="main-header">
    <router-link :to="user ? '/profile' : '/'">
      <AppLogo />
    </router-link>

    <div v-if="user" class="main-header__exit-modal-wrapper">
      <AppButton
        @click="isModalExitVisible = !isModalExitVisible"
        class="main-header__profile-button"
      >
        <span>{{ user.email }}</span>
        <span></span>
      </AppButton>
      <Transition>
        <CExitModal
          v-show="isModalExitVisible"
          @click="onExitClick"
          class="main-header__exit-modal"
        />
      </Transition>
    </div>

    <AppButton v-else @click="onEntranceClick" class="main-header__auth-button accent-button">
      <span class="main-header__auth-icon"></span>
      Вход
    </AppButton>

    <CAuth v-model="isModalIntranceVisible" @close="onCloseAuthModal" />
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

  background-image: url('@/assets/icons-sprite.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  margin-right: 12px;

  background-image: url('@/assets/auth-icon.svg');
  background-size: contain;
}

.main-header__profile-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 0;
  color: var(--white);
}

.main-header__profile-button span:nth-child(2) {
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

.main-header__exit-modal-wrapper {
  position: relative;
}

.main-header__exit-modal {
  bottom: -20px;
  right: 0;
  transform: translate(0, 100%);
}

@media (max-width: 1366px) {
  .main-header {
    padding: 20px 0;
  }
}

@media (max-width: 768px) {
  .main-header__profile-button {
    justify-content: flex-end;
  }
  .main-header__profile-button span:nth-child(1) {
    display: none;
  }
}
</style>
