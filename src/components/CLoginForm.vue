<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'

import { ref } from 'vue'
import { auth } from '../services/auth'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { AxiosError } from 'axios'
import { useUser } from '@/composables/user'

defineEmits(['showRegForm'])

const _email = ref('rtyu@ghj.cow')
const _password = ref('1234')
const _error_messages = ref<string[]>([])

const { updateUserInfo } = useUser()

const state = ref({
  email: _email.value,
  password: _password.value,
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(4) },
}

const v$ = useVuelidate(rules, state)

async function onSubmit() {
  if (v$.value.$invalid) {
    return
  }

  try {
    await auth.login(v$.value.email.$model, v$.value.password.$model)
    await updateUserInfo()
  } catch (error) {
    let message = ['Неизвестная ошибка']

    if (error instanceof AxiosError) {
      if (error.response) {
        message = error.response.data.message as string[]
      }
    }

    _error_messages.value = message
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div :class="{ 'error-visible': v$.email.$error }">
      <label>Email</label>

      <input type="email" placeholder="Введите значение" v-model="v$.email.$model" />

      <div class="error-message">
        <span v-for="(er, i) in v$.email.$errors" :key="i">{{ er.$message }}</span>
      </div>
    </div>
    <div :class="{ 'error-visible': v$.password.$error }">
      <label>Пароль</label>
      <input type="text" placeholder="Введите пароль" v-model="v$.password.$model" />
      <div class="error-message">
        <span v-for="(er, i) in v$.password.$errors" :key="i">{{ er.$message }}</span>
      </div>
    </div>
    <div class="auth__controls">
      <div class="auth__form-changer">
        <span> У вас нет аккаунта?</span>
        <AppButton @click="$emit('showRegForm')">Зарегистрируйтесь</AppButton>
      </div>
      <AppButton type="submit" class="accent-button" :disabled="v$.$invalid">Войти</AppButton>
    </div>
    <Transition>
      <div v-show="_error_messages.length" class="auth__error-msg">
        {{ _error_messages }}
      </div>
    </Transition>
  </form>
</template>

<style lang="css"></style>
