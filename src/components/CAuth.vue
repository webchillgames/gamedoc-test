<script lang="ts" setup>
import CModal from './CModal.vue'
import CLoginForm from './CLoginForm.vue'
import CRegForm from './CRegForm.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const _title = computed(() => {
  if (!route.query.auth) {
    return ''
  }

  return route.query.auth === 'login' ? 'Вход в ваш аккаунт' : 'Регистрация'
})
</script>

<template>
  <CModal class="auth">
    <template v-slot:title>
      {{ _title }}
    </template>

    <template v-slot:form>
      <CLoginForm
        v-show="$route.query.auth === 'login'"
        @showRegForm="$router.replace({ query: { auth: 'registration' } })"
      />
      <CRegForm
        v-show="$route.query.auth === 'registration'"
        @showLoginForm="$router.replace({ query: { auth: 'login' } })"
      />
    </template>
  </CModal>
</template>

<style lang="css">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.auth__controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: grey;
  margin-top: 40px;
}

.auth__form-changer {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-gap: 4px;
  padding: 14px 0;
}

.auth__form-changer button {
  color: var(--green-light);
  background-color: transparent;
  border: 0;
  font-weight: 700;
  font-size: inherit;
  line-height: inherit;
  padding: 0;
  transition: all 0.2s;
}

.auth__form-changer button:hover {
  color: var(--white);
}

@media (max-width: 1366px) {
  .auth__form-changer {
    grid-template-columns: 1fr;
    grid-gap: 2px;
    padding: 0;
  }
}

@media (max-width: 768px) {
  .auth__form-changer {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 4px;
    padding: 14px 0;
    font-weight: 400;
    font-size: 18px;
    line-height: 156%;
    margin-right: 4px;
  }
}

@media (max-width: 360px) {
  .auth__form-changer {
    font-weight: 400;
    font-size: 14px;
    line-height: 171%;
  }

  .auth__controls {
    margin-top: 28px;
    flex-direction: column-reverse;
  }

  .auth__controls button[type='submit'] {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
