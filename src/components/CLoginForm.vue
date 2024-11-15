<script lang="ts" setup>
import { ref } from 'vue'
import { auth } from '../services/auth'
import { useVuelidate } from '@vuelidate/core'

import { useUser } from '@/composables/user'
import { PASSWORD_MIN_LENGTH, validations } from '@/utils/validations'
import { useAuth } from '@/composables/auth'

import AppButton from '@/elements/AppButton.vue'
import InputEmail from '@/elements/InputEmail.vue'
import InputPrivatePassword from '@/elements/InputPrivatePassword.vue'
import FormErrorsMessages from '@/elements/FormErrorsMessages.vue'

defineEmits(['showRegForm'])

const _email = ref('rtyu@ghj.cow')
const _password = ref('1234')
const _error_messages = ref<string[]>([])

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
    <InputEmail v-model="v$.email.$model" :errors="v$.email.$errors" />
    <InputPrivatePassword v-model="v$.password.$model" :errors="v$.password.$errors" />

    <div class="auth__controls">
      <div class="auth__form-changer">
        <span> У вас нет аккаунта?</span>
        <AppButton @click="$emit('showRegForm')">Зарегистрируйтесь</AppButton>
      </div>
      <AppButton type="submit" class="accent-button" :disabled="v$.$invalid">Войти</AppButton>
    </div>
    <FormErrorsMessages :errors-messages="_error_messages" class="errors-msgs--form" />
  </form>
</template>
