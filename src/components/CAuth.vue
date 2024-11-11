<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
import { ref } from 'vue'

const open = ref(true)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="auth">
        <div class="auth__content">
          <AppButton class="auth__modal-closer"></AppButton>
          <h2>Вход в ваш аккаунт</h2>

          <form>
            <label>Email</label>

            <input type="email" placeholder="Введите значение" />

            <label>Пароль</label>

            <input type="text" placeholder="Введите пароль" />

            <div class="auth__controls">
              <div class="auth__form-changer">
                <span> У вас нет аккаунта?</span>
                <AppButton>Зарегистрируйтесь</AppButton>
              </div>
              <AppButton class="accent-button">Войдите</AppButton>
            </div>

            <div class="auth__controls">
              <div class="auth__form-changer">
                <span> У вас есть аккаунт?</span>
                <AppButton>Войдите</AppButton>
              </div>
              <AppButton class="accent-button">Зарегистрироваться</AppButton>
            </div>
            <div class="auth__error-msg">Пользователь с таким логином не найден</div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="css">
.auth {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.auth__modal-closer {
  border-radius: 32px;
  padding: 0px 24px;
  width: 56px;
  height: 56px;
  background-color: var(--green-light);
  display: block;
  background-image: url('@/assets/cross-icon.svg');
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: center;
  position: absolute;
  top: 20px;
  right: 20px;
}

.auth__content {
  background-color: var(--dark-middle);
  padding: 80px;
  border-radius: 40px;
  position: relative;
}

.auth h2 {
  font-weight: 600;
  font-size: 48px;
  line-height: 150%;
  margin: 0;
  margin-bottom: 40px;
}

.auth input {
  border-radius: 36px;
  padding: 0px 16px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 72px;
  margin-top: 8px;
  margin-bottom: 24px;
}

.auth label {
  color: var(--gray);
  padding-left: 24px;
}

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

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
