<script lang="ts" setup>
import { auth } from '@/services/auth'
import { ref } from 'vue'
import { PASSWORD_MIN_LENGTH, validations } from '@/utils/validations'

import { useAuth } from '@/composables/auth'

import AppButton from '@/elements/AppButton.vue'
import useVuelidate from '@vuelidate/core'
import FormErrorsMessages from '@/elements/FormErrorsMessages.vue'
import InputEmail from '@/elements/InputEmail.vue'
import InputPassword from '@/elements/InputPassword.vue'
import { useUser } from '@/composables/user'

const { getErrorMsg } = useAuth()
const { updateUserInfo } = useUser()

defineEmits(['showLoginForm'])

const _email = ref('')
const _password = ref('')
const _password_repeat = ref('')
const _error_messages = ref<string[]>([])

const rules = {
  email: { required: validations.required, email: validations.email },
  password: {
    required: validations.required,
    minLength: validations.minLength(PASSWORD_MIN_LENGTH),
  },
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
    <InputPassword v-model="v$.password.$model" :errors="v$.password.$errors" label="Пароль" />
    <InputPassword
      v-model="v$.password_repeat.$model"
      :errors="v$.password_repeat.$errors"
      label="Пароль ещё раз"
    />

    <div class="auth__controls">
      <div class="auth__form-changer">
        <span> У вас есть аккаунт?</span>
        <AppButton @click="$emit('showLoginForm')">Войдите</AppButton>
      </div>

      <AppButton :disabled="v$.$invalid" type="submit" class="accent-button"
        >Зарегистрироваться</AppButton
      >
    </div>

    <FormErrorsMessages :errors-messages="_error_messages" />
  </form>
</template>

<style lang="css"></style>
