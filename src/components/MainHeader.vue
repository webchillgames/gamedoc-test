<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storage } from '@/services/storage'

import AppButton from '@/elements/AppButton.vue'
import AppLogo from '@/elements/AppLogo.vue'
import CAuth from './CAuth.vue'
import CExitModal from './CExitModal.vue'
import { auth } from '@/services/auth'

const router = useRouter()
const route = useRoute()

const isModalIntranceVisible = ref(!!route.query.auth)
const isModalExitVisible = ref(false)

const user = ref(storage.get('userProfile'))

function onEntranceClick() {
  router.push({ query: { auth: 'login' } })
  // isModalIntranceVisible.value = true
}

async function onExitClick() {
  try {
    await auth.exit()
    isModalExitVisible.value = false
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="main-header">
    <AppLogo />

    <div v-if="user" class="main-header__exit-modal-wrapper">
      <AppButton
        @click="isModalExitVisible = !isModalExitVisible"
        class="main-header__profile-button"
      >
        {{ user.email }}
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

    <CAuth v-model="isModalIntranceVisible" @close="isModalIntranceVisible = false" />
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
</style>
