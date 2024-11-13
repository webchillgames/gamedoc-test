<script lang="ts" setup>
import CModal from './CModal.vue'
import CLoginForm from './CLoginForm.vue'
import CRegForm from './CRegForm.vue'
</script>

<template>
  <CModal class="auth">
    <template v-slot:title>
      {{
        $route.query.auth && $route.query.auth === 'login' ? 'Вход в ваш аккаунт' : 'Регистрация'
      }}
    </template>

    <template v-slot:form>
      <CLoginForm
        v-show="$route.query.auth === 'login'"
        @showRegForm="$router.replace({ query: { auth: 'registration' } })"
      />
      <CRegForm
        v-show="$route.query.auth === 'registration'"
        @showLoginForm="$router.push({ query: { auth: 'login' } })"
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
}

.auth__form-changer {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-gap: 4px;
}

.auth__form-changer button {
  color: var(--green-light);
  background-color: transparent;
  border: 0;
  font-weight: 700;
}

.auth__error-msg {
  margin-top: 20px;
  background-color: rgba(255, 116, 97, 0.1);
  color: var(--error);
  border-radius: 24px;
  padding: 8px 20px;
}

/* .modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} */
</style>
