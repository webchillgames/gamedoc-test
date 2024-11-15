<script lang="ts" setup>
import { ref } from 'vue'
import { auth } from '../services/auth'
import { useVuelidate } from '@vuelidate/core'

import { useUser } from '@/composables/user'
import { PASSWORD_MIN_LENGTH, validations } from '@/utils/validations'
import { useAuth } from '@/composables/auth'

import AppButton from '@/elements/AppButton.vue'
import CErrors from './CErrors.vue'

defineEmits(['showRegForm'])

const _email = ref('rtyu@ghj.cow')
const _password = ref('1234')
const _error_messages = ref<string[]>([])
const _password_is_visible = ref(false)

const { updateUserInfo } = useUser()
const { getErrorMsg } = useAuth()

const rules = {
  email: { required: validations.required, email: validations.email },
  password: {
    required: validations.required,
    minLength: validations.minLength(PASSWORD_MIN_LENGTH),
  },
}

const v$ = useVuelidate(rules, {
  email: _email,
  password: _password,
})

async function onSubmit() {
  if (v$.value.$invalid) {
    return
  }

  try {
    await auth.login(_email.value, _password.value)
    await updateUserInfo()
  } catch (error) {
    _error_messages.value = getErrorMsg(error)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div :class="{ 'error-visible': v$.email.$error }">
      <label>Email</label>

      <input type="email" placeholder="Введите значение" v-model="v$.email.$model" />

      <div class="error-message">
        <p v-for="(er, i) in v$.email.$errors" :key="i">{{ er.$message }}</p>
      </div>
    </div>
    <div :class="{ 'error-visible': v$.password.$error }">
      <label>Пароль</label>
      <div
        class="custom-input custom-input--password"
        :class="{ 'custom-input--password-visible': _password_is_visible }"
      >
        <input
          :type="_password_is_visible ? 'text' : 'password'"
          placeholder="Введите пароль"
          v-model="v$.password.$model"
        />
        <AppButton @click="_password_is_visible = !_password_is_visible"></AppButton>
      </div>
      <div class="error-message">
        <p v-for="(er, i) in v$.password.$errors" :key="i">{{ er.$message }}</p>
      </div>
    </div>
    <div class="auth__controls">
      <div class="auth__form-changer">
        <span> У вас нет аккаунта?</span>
        <AppButton @click="$emit('showRegForm')">Зарегистрируйтесь</AppButton>
      </div>
      <AppButton type="submit" class="accent-button" :disabled="v$.$invalid">Войти</AppButton>
    </div>
    <CErrors :errors-messages="_error_messages" />
  </form>
</template>

<style lang="css"></style>
