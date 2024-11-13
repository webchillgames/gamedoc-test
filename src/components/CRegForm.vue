<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
import { auth } from '@/services/auth'
import { ref, defineEmits } from 'vue'
import { required, email, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

defineEmits(['showLoginForm'])

const _email = ref('')
const _password = ref('')
const _password_repeat = ref('')

const state = ref({
  email: _email.value,
  password: _password.value,
  password_repeat: _password_repeat.value,
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(4) },
  password_repeat: { required, minLength: minLength(4) },
}

const v$ = useVuelidate(rules, state)

function onSubmit() {
  if (v$.value.$invalid || _password.value !== _password_repeat.value) {
    return
  }

  auth.register(_email.value, _password.value, _password_repeat.value)
}
</script>

<template>
  <form @submit="onSubmit">
    <label>Email</label>
    <input type="email" placeholder="Введите значение" v-model="v$.email.$model" />

    <label>Пароль</label>
    <input type="text" placeholder="Введите пароль" v-model="v$.password.$model" />

    <label>Пароль ещё раз</label>
    <input type="text" placeholder="Введите пароль" v-model="v$.password_repeat.$model" />

    <div class="auth__controls">
      <div class="auth__form-changer">
        <span> У вас есть аккаунт?</span>
        <AppButton @click="$emit('showLoginForm')">Войдите</AppButton>
      </div>
      <AppButton type="submit" class="accent-button">Зарегистрироваться</AppButton>
    </div>
  </form>
</template>

<style lang="css"></style>
