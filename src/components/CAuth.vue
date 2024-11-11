<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
import { ref } from 'vue'
import CModal from './CModal.vue'

// type InputType = 'login' || 'registration' -- как писать?
const state = ref('registration')

const open = ref(true) //где хранить?
</script>

<template>
  <Teleport to="body">
    <!-- <Transition name="modal"> -->
    <CModal v-if="open" class="auth">
      <template v-slot:title>Вход в ваш аккаунт</template>
      <template v-slot:form>
        <form v-show="state === 'login'">
          <label>Email</label>
          <input type="email" placeholder="Введите значение" />

          <label>Пароль</label>
          <input type="text" placeholder="Введите пароль" />

          <div class="auth__controls">
            <div class="auth__form-changer">
              <span> У вас нет аккаунта?</span>
              <AppButton>Зарегистрируйтесь</AppButton>
            </div>
            <AppButton class="accent-button">Войти</AppButton>
          </div>
          <div class="auth__error-msg">Пользователь с таким логином не найден</div>
        </form>

        <form v-show="state === 'registration'">
          <label>Email</label>
          <input type="email" placeholder="Введите значение" />

          <label>Пароль</label>
          <input type="text" placeholder="Введите пароль" />

          <label>Пароль ещё раз</label>
          <input type="text" placeholder="Введите пароль" />

          <div class="auth__controls">
            <div class="auth__form-changer">
              <span> У вас есть аккаунт?</span>
              <AppButton>Войдите</AppButton>
            </div>
            <AppButton class="accent-button">Зарегистрироваться</AppButton>
          </div>
        </form>
      </template>
    </CModal>
    <!-- </Transition> -->
  </Teleport>
</template>

<style lang="css">
.auth__controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: gray;
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
