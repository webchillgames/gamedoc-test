<script lang="ts" setup>
import { auth } from '@/services/auth'
import { ref } from 'vue'
import { validations } from '@/utils/validations'

import { useAuth } from '@/composables/auth'

import AppButton from '@/elements/AppButton.vue'
import useVuelidate from '@vuelidate/core'

const { getErrorMsg } = useAuth()

defineEmits(['showLoginForm'])

const _email = ref('')
const _password = ref('')
const _password_repeat = ref('')
const _error_messages = ref<string[]>([])

const rules = {
  email: { required: validations.required, email: validations.email },
  password: { required: validations.required, minLength: validations.minLength(4) },
  password_repeat: {
    required: validations.required,
    minLength: validations.minLength(4),
    sameAs: validations.sameAsPassword(_password),
  },
}

const v$ = useVuelidate(rules, {
  email: _email,
  password: _password,
  password_repeat: _password_repeat,
})

async function onSubmit() {
  if (v$.value.$invalid) {
    return
  }
  try {
    await auth.register(_email.value, _password.value, _password_repeat.value)
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
      <input type="text" placeholder="Введите пароль" v-model="v$.password.$model" />
      <div class="error-message">
        <p v-for="(er, i) in v$.password.$errors" :key="i">{{ er.$message }}</p>
      </div>
    </div>

    <div :class="{ 'error-visible': v$.password_repeat.$error }">
      <label>Пароль ещё раз</label>
      <input type="text" placeholder="Введите пароль" v-model="v$.password_repeat.$model" />
      <div class="error-message">
        <p v-for="(er, i) in v$.password_repeat.$errors" :key="i">{{ er.$message }}</p>
      </div>
    </div>

    <div class="auth__controls">
      <div class="auth__form-changer">
        <span> У вас есть аккаунт?</span>
        <AppButton @click="$emit('showLoginForm')">Войдите</AppButton>
      </div>
      <AppButton :disable="v$.$invalid" type="submit" class="accent-button"
        >Зарегистрироваться</AppButton
      >
    </div>

    <Transition>
      <div v-show="_error_messages.length" class="auth__error-msg">
        <p v-for="(er, i) in _error_messages" :key="i">{{ er }}</p>
      </div>
    </Transition>
  </form>
</template>

<style lang="css"></style>
